'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

const STORAGE_KEY = 'ssb_study_rooms';
const CHANNEL_PREFIX = 'ssb-collab-';

export interface VerseShared {
  id: string;
  verse: string;
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  participantId: string;
  timestamp: number;
  message?: string;
}

export interface StudyRoom {
  id: string;
  code: string;
  createdAt: number;
  participants: string[];
  verses: VerseShared[];
}

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getParticipantId(): string {
  const stored = localStorage.getItem('ssb_collab_participant_id');
  if (stored) return stored;
  const id = `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  localStorage.setItem('ssb_collab_participant_id', id);
  return id;
}

function loadRooms(): Record<string, StudyRoom> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveRooms(rooms: Record<string, StudyRoom>) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms)); } catch {}
}

function getChannel(code: string): BroadcastChannel | null {
  try {
    return new BroadcastChannel(`${CHANNEL_PREFIX}${code}`);
  } catch {
    return null;
  }
}

export function createStudyRoom(): StudyRoom {
  const rooms = loadRooms();
  const code = generateCode();
  const participantId = getParticipantId();
  const room: StudyRoom = {
    id: `room-${Date.now()}`,
    code,
    createdAt: Date.now(),
    participants: [participantId],
    verses: [],
  };
  rooms[code] = room;
  saveRooms(rooms);
  return room;
}

export function joinStudyRoom(code: string): StudyRoom | null {
  const rooms = loadRooms();
  const room = rooms[code];
  if (!room) return null;
  const participantId = getParticipantId();
  if (!room.participants.includes(participantId)) {
    room.participants.push(participantId);
    rooms[code] = room;
    saveRooms(rooms);
  }
  return room;
}

export function shareVerse(
  code: string,
  verse: {
    livro: string;
    capitulo: number;
    versiculo: number;
    texto: string;
    message?: string;
  }
): VerseShared | null {
  const rooms = loadRooms();
  const room = rooms[code];
  if (!room) return null;

  const participantId = getParticipantId();
  const shared: VerseShared = {
    id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    verse: `${verse.livro} ${verse.capitulo}:${verse.versiculo}`,
    ...verse,
    participantId,
    timestamp: Date.now(),
  };

  room.verses.push(shared);
  rooms[code] = room;
  saveRooms(rooms);

  const channel = getChannel(code);
  if (channel) {
    channel.postMessage({
      type: 'verse_shared',
      payload: shared,
    });
  }

  return shared;
}

export function sendMessage(
  code: string,
  verseId: string,
  message: string
): VerseShared | null {
  const rooms = loadRooms();
  const room = rooms[code];
  if (!room) return null;

  const participantId = getParticipantId();
  const shared: VerseShared = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    verse: verseId,
    livro: '',
    capitulo: 0,
    versiculo: 0,
    texto: '',
    participantId,
    timestamp: Date.now(),
    message,
  };

  room.verses.push(shared);
  rooms[code] = room;
  saveRooms(rooms);

  const channel = getChannel(code);
  if (channel) {
    channel.postMessage({
      type: 'verse_shared',
      payload: shared,
    });
  }

  return shared;
}

export function onVerseShared(
  code: string,
  callback: (verse: VerseShared) => void
): () => void {
  const channel = getChannel(code);
  if (!channel) return () => {};

  const handler = (event: MessageEvent) => {
    if (event.data?.type === 'verse_shared') {
      callback(event.data.payload);
    }
  };

  channel.addEventListener('message', handler);
  return () => channel.removeEventListener('message', handler);
}

export function getRoom(code: string): StudyRoom | null {
  const rooms = loadRooms();
  return rooms[code] || null;
}

export function getParticipantColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6',
    '#EC4899', '#EF4444', '#06B6D4', '#F97316',
  ];
  return colors[Math.abs(hash) % colors.length];
}

export function getParticipantLabel(id: string): string {
  const parts = id.split('-');
  if (parts.length >= 3) {
    return `Participante ${parts[2].slice(0, 4).toUpperCase()}`;
  }
  return id.slice(0, 8);
}
