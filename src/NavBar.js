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
  const [currentComponent, setCurrentComponent] = React.useState('Location');
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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuItemClick = (componentName) => {
    setCurrentComponent(componentName);
    handleCloseNavMenu();
  };

  // Cette fonction détermine quel composant rendre
  const renderComponent = () => {
    switch (currentComponent) {
      case 'Location':
        return <Location />;
      case 'Voice':
        return <Voice />;
      default:
        return <Typography variant="h6" color="inherit">Select a feature from the navbar</Typography>; 
        // Un message par défaut ou autre chose peut aller ici
    }
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#9e9e9e' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={mdsIcon} alt="mds" style={{ width: "90px", height: "90px" }} />
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-label="menu" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu id="menu-appbar" anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleMenuItemClick(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', marginLeft: '-40px' }}>
              {pages.map((page, index) => (
                <Button key={page} onClick={() => handleMenuItemClick(page)} 
                sx={{ my: 2, mx: 3, color: 'white', display: 'block' }}>
                  {page}
                </Button>
              ))}
              <IconButton>
                {notifEnabled ? (
                  <FaBell onClick={handleClose} 
                  title='disable notifications'
                  style={{ fontSize: '40px' }}/>
                ) : (
                  <FaBellSlash onClick={handleClick} 
                  title='enable notifications'
                  style={{ fontSize: '40px' }}/>
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderComponent()}
    </div>
  );
}

export default ResponsiveAppBar;