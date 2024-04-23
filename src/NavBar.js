import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import mdsIcon from "./images/mds.png";
import Location from './features/Location';
import Voice from './features/Voice';
import { FaBell, FaBellSlash } from 'react-icons/fa';

const pages = ['Location', 'Voice'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
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
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
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
      <AppBar position="static" style={{ backgroundColor: '#8b8b8b' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={mdsIcon} alt="mds" style={{ width: "120px", height: "120px" }} />
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-label="menu" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton>
                {notifEnabled ? (
                  <FaBell onClick={handleClose}
                    title='disable notifications'
                    style={{ fontSize: '40px', color: 'black' }} />
                ) : (
                  <FaBellSlash onClick={handleClick}
                    title='enable notifications'
                    style={{ fontSize: '40px', color: 'black' }} />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div style={{ display: 'flex', gap: '5px', justifyContent: "space-between", margin: "20px" }}>
        <div style={{
          flex: '0 1 47%',
          height: '65vh',
          backgroundColor: '#a0a0a0',
          borderRadius: '25px',
          boxShadow: '11px 11px 22px #303030, -11px -11px 22px #969696;',
          padding: '20px',
        }}>
          <Location />
        </div>
        <div style={{
          flex: '0 1 47%',
          height: '65vh',
          backgroundColor: '#a0a0a0',
          borderRadius: '25px',
          boxShadow: '11px 11px 22px #303030, -11px -11px 22px #969696;',
          padding: '20px'
        }}>
          <Voice />
        </div>
      </div>
    </div>
  );
}

export default ResponsiveAppBar;