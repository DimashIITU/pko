import { useState, useEffect } from 'react';
import { subscribeUser} from '../actions';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function PushNotificationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  async function subscribeToPush() {
    setIsLoading(true);
    try 
    {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      });
      setSubscription(sub);
      const serializedSub = JSON.parse(JSON.stringify(sub));
      await subscribeUser(serializedSub);
      localStorage.setItem("isSubscribedPush", "true")
      onClose()
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Подпишитесь на уведомления</h3>
        {!subscription && (
          <>
            <p>Вы будуте в курсе самых новых новостей и бонусов.</p>
            <button onClick={subscribeToPush} disabled={isLoading}>
              {isLoading ? 'Подписка...' : 'Подписаться'}
            </button>
          </>
        )}
        <button style={{marginLeft: "20px"}} onClick={onClose}>Закрыть</button>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          background-color: #00000090;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background-color: #000000;
          padding: 40px;
          border-radius: 50px;
          max-width: 500px;
          text-align: center;
        }
        button {
          margin: 10px 0;
          padding: 20px 30px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export const Casino = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const isSubscribedPush = localStorage.getItem("isSubscribedPush");
    if (!isSubscribedPush) {
      setIsModalOpen(true)
    }
  }, [])
    return(
      <>
          <PushNotificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <iframe
        src="https://ping-partners.g2afse.com/click?pid=1566&offer_id=300"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="Pokerbet"
        allowFullScreen
      ></iframe>
    </div>
    </>

    )
}