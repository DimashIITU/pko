import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PushNotificationModal } from './PushNotificationModal';



export const Casino = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const isSubscribedPush = localStorage.getItem('isSubscribedPush');
    if (!isSubscribedPush) {
      setIsModalOpen(true);
    }else{
      router.push('https://ping-partners.g2afse.com/click?pid=1566&offer_id=300')
    }
  }, []);

  return (
    <PushNotificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  );
};
