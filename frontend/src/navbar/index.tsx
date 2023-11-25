import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { State, setLogout } from '../state';
import { Avatar } from '@mui/material';
import { SERVER_PORT } from '../constants';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const { pathname } = useLocation();
  const user = useSelector((state: State) => state.user) || {
    role: '',
    username: '',
  };

  const dispatch = useDispatch();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleLogout();
        }}
      >
        Log Out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to={'/application-form-submit'}>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="Link to application form"
            sx={{
              color:
                pathname === '/application-form-submit' ? '#d4c31b' : 'inherit',
            }}
          >
            <WorkIcon />
          </IconButton>
          <p>Application Form</p>
        </MenuItem>
      </Link>
      <Link to={'/'}>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="Link to home"
            sx={{ color: pathname === '/' ? '#d4c31b' : 'inherit' }}
          >
            <HomeIcon />
          </IconButton>
          <p>Home</p>
        </MenuItem>
      </Link>
      {user.role === 'admin' && (
        <Link to={'/admin-dashboard'}>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="Link to admin dashboard"
              sx={{
                color: pathname === '/admin-dashboard' ? '#d4c31b' : 'inherit',
              }}
            >
              <AdminPanelSettingsIcon />
            </IconButton>
            <p>Admin</p>
          </MenuItem>
        </Link>
      )}
      {user && (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar src={`${SERVER_PORT}/images/${user.userImg}`} />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: 'hidden',
        maxHeight: 'calc(100% - 40px)',
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: '#001f3f' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" fontWeight={'700'}>
            <a href="/">
              Manual{' '}
              <span
                style={{
                  color: '#d4c31b',
                }}
              >
                Jobs
              </span>
            </a>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="Link to home"
              sx={{ color: pathname === '/' ? '#d4c31b' : 'inherit' }}
            >
              <Link to={'/'}>
                <HomeIcon />
              </Link>
            </IconButton>
            <IconButton
              size="large"
              aria-label="Link to application form"
              sx={{
                color:
                  pathname === '/application-form-submit'
                    ? '#d4c31b'
                    : 'inherit',
              }}
            >
              <Link to={'/application-form-submit'}>
                <WorkIcon />
              </Link>
            </IconButton>
            {user.role === 'admin' && (
              <IconButton
                size="large"
                aria-label="Link to admin dashboard"
                sx={{
                  color:
                    pathname === '/admin-dashboard' ? '#d4c31b' : 'inherit',
                }}
              >
                <Link to={'/admin-dashboard'}>
                  <AdminPanelSettingsIcon />
                </Link>
              </IconButton>
            )}

            {user && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar src={`${SERVER_PORT}/images/${user.userImg}`} />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
