export {};

declare global {
  interface Window {
    MSStream?: any; // Добавление типа MSStream
  }

  interface Navigator {
    standalone?: boolean; // Для поддержки проверки `navigator.standalone`
  }

  interface BeforeInstallPromptEvent extends Event {
    // Расширение события beforeinstallprompt
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  }
}
