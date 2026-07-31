import { Controller, Post, Get, Body, Query, Req } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Request } from 'express';

interface TrackEventDto {
  type: string;
  sessionId: string;
  data?: Record<string, unknown>;
}

interface TrackBatchDto {
  events: TrackEventDto[];
}

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('events')
  async trackEvent(@Body() dto: TrackEventDto, @Req() req: Request) {
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      req.socket.remoteAddress ||
      'unknown';
    const userAgent = req.headers['user-agent'] || '';

    return this.analyticsService.trackEvent({
      ...dto,
      ip,
      userAgent,
    });
  }

  @Post('events/batch')
  async trackBatch(@Body() dto: TrackBatchDto, @Req() req: Request) {
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      req.socket.remoteAddress ||
      'unknown';
    const userAgent = req.headers['user-agent'] || '';

    const events = dto.events.map((e) => ({
      ...e,
      ip,
      userAgent,
    }));

    return this.analyticsService.trackBatch(events);
  }

  @Get('summary')
  async getSummary(@Query('days') days?: string) {
    const d = days ? parseInt(days, 10) : 30;
    return this.analyticsService.getSummary(d);
  }

  @Get('events')
  async getRecentEvents(@Query('limit') limit?: string) {
    const l = limit ? parseInt(limit, 10) : 100;
    return this.analyticsService.getRecentEvents(l);
  }
}
