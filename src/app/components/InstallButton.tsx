/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';

export const  InstallPWAButton = () =>  {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const [isIOS, setIsIOS] = useState(false); // Для iOS
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Проверка для iOS: приложение открыто в Safari и не установлено
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isInStandaloneMode = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    setIsIOS(isIOSDevice);
    setIsStandalone(isInStandaloneMode);

    // Обработка события `beforeinstallprompt` (для Android)
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault(); // Отключить стандартное поведение
      setDeferredPrompt(event); // Сохранить событие
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      (deferredPrompt as any).prompt(); // Показать диалог установки
      const { outcome } = await (deferredPrompt as any).userChoice;
      if (outcome === 'accepted') {
        console.log('PWA was installed');
      } else {
        console.log('PWA installation was dismissed');
      }
      setDeferredPrompt(null); // Очистить
    }
  };

  return (
    <div>
      {/* Для Android */}
        <button onClick={handleInstallPWA} className="install-button">
          Установить приложение
        </button>

      {/* Для iOS */}
      {isIOS && !isStandalone && (
        <div className="ios-install-prompt">
          <p>
            Добавьте это приложение на экран Домой для удобного доступа:
            <br />
            <strong>Нажмите Поделиться&ldquo;</strong> (внизу экрана) и выберите{' '}
            <strong>На экран Домой</strong>.          </p>
        </div>
      )}

      <style jsx>{`
        .install-button {
          background-color: #007bff;
          color: white;
          padding: 20px 30px;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-size: 16px;
        }
        .ios-install-prompt {
          background-color: #007bff;
          padding: 20 30px;
          border-radius: 50px;
          margin-top: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
