import { useState, useEffect } from "react";
import { PushNotificationModal } from "./PushNotificationModal";
import Image from "next/image";


export const Fake = () => {
     const [isModalOpen, setIsModalOpen] = useState(false);
      useEffect(() => {
        const isSubscribedPush = localStorage.getItem('isSubscribedPush');
        if (!isSubscribedPush) {
          setIsModalOpen(true);
        }
      }, []);

    return <>
    <Image src={"/account.jpg"} alt='account' width={390} height={844} />
    <PushNotificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </> 
}

