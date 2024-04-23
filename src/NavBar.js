import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import mdsIcon from "./images/mds.png";
import Location from './features/Location';
import Notifications from './features/Notifications';
import Voice from './features/Voice';

const pages = ['Location', 'Voice', 'Notifications']; // Assurez-vous que ces noms correspondent aux noms des importations pour les composants

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [currentComponent, setCurrentComponent] = React.useState('Location');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

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
      case 'Notifications':
        return <Notifications />;
      default:
        return <Typography variant="h6" color="inherit">Select a feature from the navbar</Typography>; // Un message par défaut ou autre chose peut aller ici
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={mdsIcon} alt="mds" style={{ width: "70px", height: "70px", marginRight: "10px" }} />
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
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button key={page} onClick={() => handleMenuItemClick(page)} sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderComponent()}
    </div>
  );
}

export default ResponsiveAppBar;
