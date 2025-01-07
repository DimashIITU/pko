'use client';

import { useEffect } from 'react';
import { usePWA } from './components/PwaProvider';
import { Casino } from './components/Casino';
import { WhitePage } from './components/WhitePage';

export default function Page() {
  const { isPWA } = usePWA();
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, [])
  return (
    <>
    {
      isPWA 
      ? <Casino/> 
      : <div>
          <WhitePage />
      </div>
    }
    </>
  )

}
