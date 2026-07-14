'use client';

import { Suspense, lazy } from 'react';
import type { useAudioNatural } from '@/hooks/useAudioNatural';
import type { useVerseAudio } from '@/hooks/useVerseAudio';
import type { CapituloComparado } from '@/data/biblia';

const AudioMiniPlayer = lazy(() => import('@/components/VerseAudio').then(m => ({ default: m.AudioMiniPlayer })));
const AudioNaturalPlayer = lazy(() => import('@/components/AudioNaturalPlayer'));

interface AudioPlayersProps {
  audioNatural: ReturnType<typeof useAudioNatural>;
  audio: ReturnType<typeof useVerseAudio>;
  data: CapituloComparado[];
  livroNome: string;
  capitulo: number;
}

export function AudioPlayers({ audioNatural, audio, data, livroNome, capitulo }: AudioPlayersProps) {
  return (
    <>
      <Suspense fallback={null}>
        {audioNatural.state.isPlaying && (
          <AudioNaturalPlayer
            isPlaying={audioNatural.state.isPlaying}
            isLoading={audioNatural.state.isLoading}
            currentTime={audioNatural.state.currentTime}
            duration={audioNatural.state.duration}
            currentVerse={audio.playingVerse ?? undefined}
            totalVerses={data[0]?.versiculos?.length}
            verseText={data[0]?.versiculos?.find(v => v.numero === audio.playingVerse)?.texto}
            bookName={livroNome}
            chapter={capitulo}
            engine={audioNatural.state.engine}
            onPlay={() => {
              const verseText = data[0]?.versiculos?.find(v => v.numero === (audio.playingVerse ?? 1))?.texto ?? '';
              if (verseText) audioNatural.play(verseText);
            }}
            onPause={audioNatural.pause}
            onStop={() => { audioNatural.stop(); audio.stop(); }}
            onSeek={audioNatural.seek}
            onSkipForward={() => audioNatural.seek(Math.min(audioNatural.state.currentTime + 15, audioNatural.state.duration))}
            onSkipBackward={() => audioNatural.seek(Math.max(audioNatural.state.currentTime - 15, 0))}
            volume={audioNatural.state.volume}
            speed={audioNatural.state.speed}
            isMuted={audioNatural.state.isMuted}
            onSetVolume={audioNatural.setVolume}
            onSetSpeed={audioNatural.setSpeed}
            onToggleMute={audioNatural.toggleMute}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {!audioNatural.state.isPlaying && (
          <AudioMiniPlayer
            isPlaying={audio.isPlaying}
            currentVerse={audio.playingVerse ?? -1}
            totalVerses={data[0]?.versiculos?.length ?? 0}
            verseText={data[0]?.versiculos?.find(v => v.numero === audio.playingVerse)?.texto ?? ''}
            onStop={audio.stop}
          />
        )}
      </Suspense>
    </>
  );
}
