import * as React from 'react';
import { useAuth } from "../context/AuthContext";
import { styled } from '@mui/material/styles';
import DrawerBase from '@mui/material/Drawer';
import { List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import BedIcon from '@mui/icons-material/Bed';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Link as RouterLink, useLocation } from "react-router-dom";
import {useCan }from '../api/can';

const COLLAPSED = 55;
const EXPANDED = 240;

const openedMixin = (theme) => ({
  width: EXPANDED,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  width: COLLAPSED,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
});

const Drawer = styled(DrawerBase, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open ? openedMixin(theme) : closedMixin(theme)),
    '& .MuiDrawer-paper': {
      ...(open ? openedMixin(theme) : closedMixin(theme)),
      backgroundColor: 'transparent',   // ← ПРОЗРАЧНЫЙ
      boxShadow: 'none',                // без тени
      borderRight: 'none',              // без бордера
      color: theme.palette.common.white // белые иконки/текст
    },
  })
);

export default function Sidebar({ onNavigate }) {

  const [open, setOpen] = React.useState(false);
  const { can } = useCan();

  return (
    <Drawer
      variant="permanent"
      open={open}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{ '& .MuiDrawer-paper': { borderRight: 'none' } }}
    >
      <List
        sx={{
          pt: 1,
    '& .MuiListItemText-root': {
      opacity: open ? 1 : 0,
      transition: 'opacity .2s',
    },
    // полупрозрачная плашка под ховером
    '& .MuiListItemButton-root:hover': {
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    // выбранный пункт (если используешь selected)
    '& .Mui-selected': {
      backgroundColor: 'rgba(255,255,255,0.16) !important',
    },
    // иконки/текст белые
    '& .MuiListItemIcon-root': { color: 'inherit', minWidth: 48 },
    '& .MuiListItemText-primary': { color: 'inherit' },
  }}
      >
        
        <Tooltip title={!open ? 'Dashboard' : ''} placement="right">
          <ListItemButton onClick={() => onNavigate && onNavigate('dashboard')}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Tooltip>

        <Tooltip title={!open ? 'Dashboard' : ''} placement="right">
          <ListItemButton component={RouterLink} to={'/rooms'}>
            <ListItemIcon><MeetingRoomIcon /></ListItemIcon>
            <ListItemText primary="Rooms" />
          </ListItemButton>
        </Tooltip>

        {can('hotel_watch') && <Tooltip title={!open ? 'Hotels' : ''} placement="right">
          <ListItemButton component={RouterLink} to={'/properties'}>
            <ListItemIcon><ApartmentIcon /></ListItemIcon>
            <ListItemText primary="Hotels" />
          </ListItemButton>
        </Tooltip>}

        {can('user_watch') && <Tooltip title={!open ? 'Users' : ''} placement="right">
          <ListItemButton component={RouterLink} to={'/users'}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </Tooltip>}

        <Divider sx={{ my: 1, bgcolor: 'rgba(255,255,255,0.7)' }} />

        <Tooltip title={!open ? 'Settings' : ''} placement="right">
          <ListItemButton onClick={() => onNavigate && onNavigate('settings')}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </Tooltip>
      </List>
    </Drawer>
  );
}
