import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual } from 'typeorm';
import { AnalyticsEvent } from './entities/analytics-event.entity';

interface TrackEventDto {
  type: string;
  sessionId: string;
  data?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
}

interface AnalyticsSummary {
  totalEvents: number;
  eventsByType: Record<string, number>;
  dailyEvents: Record<string, number>;
  topPages: Record<string, number>;
  topFeatures: Record<string, number>;
  uniqueSessions: number;
  lastActivity: Date | null;
}

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsEvent)
    private readonly repo: Repository<AnalyticsEvent>,
  ) {}

  async trackEvent(dto: TrackEventDto): Promise<AnalyticsEvent> {
    const event = this.repo.create({
      type: dto.type,
      sessionId: dto.sessionId,
      page: dto.data?.page as string | undefined,
      feature: dto.data?.feature as string | undefined,
      data: dto.data,
      ip: dto.ip,
      userAgent: dto.userAgent,
    });
    return this.repo.save(event);
  }

  async trackBatch(events: TrackEventDto[]): Promise<{ inserted: number }> {
    const entities = events.map((dto) =>
      this.repo.create({
        type: dto.type,
        sessionId: dto.sessionId,
        page: dto.data?.page as string | undefined,
        feature: dto.data?.feature as string | undefined,
        data: dto.data,
        ip: dto.ip,
        userAgent: dto.userAgent,
      }),
    );
    await this.repo.save(entities);
    return { inserted: entities.length };
  }

  async getSummary(days = 30): Promise<AnalyticsSummary> {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const events = await this.repo.find({
      where: { createdAt: LessThanOrEqual(new Date()) },
      order: { createdAt: 'DESC' },
      take: 50000,
    });

    const recentEvents = events.filter((e) => e.createdAt >= since);

    const eventsByType: Record<string, number> = {};
    const dailyEvents: Record<string, number> = {};
    const topPages: Record<string, number> = {};
    const topFeatures: Record<string, number> = {};
    const sessions = new Set<string>();

    for (const event of recentEvents) {
      eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
      sessions.add(event.sessionId);

      const date = event.createdAt.toISOString().slice(0, 10);
      dailyEvents[date] = (dailyEvents[date] || 0) + 1;

      if (event.page) {
        topPages[event.page] = (topPages[event.page] || 0) + 1;
      }
      if (event.feature) {
        topFeatures[event.feature] = (topFeatures[event.feature] || 0) + 1;
      }
    }

    return {
      totalEvents: recentEvents.length,
      eventsByType,
      dailyEvents,
      topPages,
      topFeatures,
      uniqueSessions: sessions.size,
      lastActivity: recentEvents[0]?.createdAt || null,
    };
  }

  async getRecentEvents(limit = 100): Promise<AnalyticsEvent[]> {
    return this.repo.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}
