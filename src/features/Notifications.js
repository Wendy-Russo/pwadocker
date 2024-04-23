import React, { useEffect, useState } from 'react';
import { FaBell, FaBellSlash } from 'react-icons/fa';

const Notifications = () => {
  const [intervalId, setIntervalId] = useState(null);
  const [notifEnabled, setNotifEnabled] = useState(false);

  const handleClick = () => {
    if (!("Notification" in window)) {
      console.log("Ce navigateur ne supporte pas les notifications");
      return;
    }

    if (Notification.permission === "granted") {
      const firstNotif = new Notification("Don't forget your physical activity and hydrate yourself !");
      setTimeout(() => {
        firstNotif.close();
      }, 3000);

      const id = setInterval(() => {
        const notif = new Notification("Don't forget your physical activity and hydrate yourself !");
        setTimeout(() => {
          notif.close();
        }, 3000);
      }, 10000); 

      setIntervalId(id);
      setNotifEnabled(true);
    } 
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(perm => {
        if (perm === "granted") {
          handleClick();
        }
      });
    }
  };

  const handleClose = () => {
    clearInterval(intervalId);
    setNotifEnabled(false);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div>
      <h2>Notifications</h2>
      {notifEnabled ? (
        <FaBell onClick={handleClose} 
        title='disable notifications'
        style={{ fontSize: '40px' }}/>
      ) : (
        <FaBellSlash onClick={handleClick} 
        title='enable notifications'
        style={{ fontSize: '40px' }}/>
      )}
    </div>
  );
};

export default Notifications;