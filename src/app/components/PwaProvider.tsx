'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Тип данных для контекста
interface PWAContextType {
  isPWA: boolean; // Указывает, открыто ли приложение в PWA
}

// Создаем контекст
const PWAContext = createContext<PWAContextType | undefined>(undefined);

// Провайдер контекста
export const PWAProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // Определение, запущено ли приложение в PWA
    const checkIfPWA = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
      setIsPWA(!!isStandalone);
    };

    checkIfPWA();

    // Проверяем при изменении размера окна (например, если display-mode изменяется)
    window.addEventListener('resize', checkIfPWA);

    return () => {
      window.removeEventListener('resize', checkIfPWA);
    };
  }, []);

  return (
    <PWAContext.Provider value={{ isPWA }}>
      {children}
    </PWAContext.Provider>
  );
};

// Хук для использования контекста
export const usePWA = () => {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('usePWA must be used within a PWAProvider');
  }
  return context;
};
