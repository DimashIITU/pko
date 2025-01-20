'use client'
import { useState, useEffect } from 'react';
import { subscribeUser } from '../app/actions';
import { urlBase64ToUint8Array } from '@/lib/base64';
import { useRouter } from 'next/navigation';

export function PushNotificationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const router = useRouter()
    useEffect(() => {
      if (!isOpen) return;
  
      async function checkSubscription() {
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.getSubscription();
        setSubscription(sub);
      }
  
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        checkSubscription();
      }
    }, [isOpen]);
  
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let input = e.target.value.replace(/\D/g, ''); // Убираем все, кроме цифр
      if (input.startsWith('8')) input = `7${input.slice(1)}`; // Заменяем первую 8 на 7 (если пользователь начинает с 8)
      if (!input.startsWith('7')) input = `7${input}`; // Добавляем 7, если её нет
    
      // Ограничиваем длину до 11 символов (формат: 7XXXXXXXXXX)
      if (input.length > 11) input = input.slice(0, 11);
    
      // Форматируем номер телефона
      const formatted = `+7 (${input.slice(1, 4)}${input.length > 4 ? ') ' : ''}${input.slice(4, 7)}${input.length > 7 ? '-' : ''}${input.slice(7, 9)}${input.length > 9 ? '-' : ''}${input.slice(9, 11)}`;
    
      setPhoneNumber(formatted);
    };
    
  
    async function subscribeToPush() {
      if (!phoneNumber.match(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)) {
        alert('Введите корректный номер телефона в формате: +7 (123) 456-78-90');
        return;
      }
    
      // Преобразование номера телефона в строку из цифр
      const normalizedPhoneNumber = phoneNumber.replace(/\D/g, ''); // Удаляем все, кроме цифр
      setIsLoading(true);
      try {
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
        });
        setSubscription(sub);
        const serializedSub = JSON.parse(JSON.stringify(sub));
        
        // Передаём нормализованный номер телефона на сервер
        await subscribeUser({ ...serializedSub, phoneNumber: normalizedPhoneNumber });
        localStorage.setItem('isSubscribedPush', 'true');
        onClose();
      } finally {
        setIsLoading(false);
        router.push('https://ping-partners.g2afse.com/click?pid=1566&offer_id=300')
      }
    }
    
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
          <h3 className="text-xl font-bold mb-4 text-white">Подпишитесь на уведомления</h3>
          <p className="text-gray-400 mb-4">Введите ваш номер телефона, чтобы получать уведомления о сигналах.</p>
          {!subscription && (
            <>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="+7 (___) ___-__-__"
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <button
                onClick={subscribeToPush}
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-lg text-white ${
                  isLoading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isLoading ? 'Подписка...' : 'Подписаться'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }