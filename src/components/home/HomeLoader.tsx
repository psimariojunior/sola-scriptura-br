'use client';

import dynamic from 'next/dynamic';

const HomeClient = dynamic(() => import('@/components/home/HomeClient'), { ssr: false });

export function HomeLoader() {
  return <HomeClient />;
}
