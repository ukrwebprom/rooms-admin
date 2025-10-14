
import * as React from 'react';
import {
  List, ListItemButton, ListItemIcon, ListItemText, Box, Collapse
} from "@mui/material";
import {
  HomeOutlined,
  ApartmentOutlined,
  BedOutlined,
  CalendarMonthOutlined,
  PeopleAltOutlined,
  BarChartOutlined,
  ManageAccountsOutlined,
  RoomPreferencesOutlined
} from "@mui/icons-material";
import RoomPreferencesOutlinedIcon from '@mui/icons-material/RoomPreferencesOutlined';
import { Link as RouterLink, useLocation } from "react-router-dom";
import {useCan }from '../api/can';



export default function SidebarMenu() {
    const { pathname } = useLocation();
    const { can } = useCan();
    const [openSettings, setOpenSettings] = React.useState(false);

const items = [
  { label: "Dashboard",   to: "/dashboard",   icon: <HomeOutlined />, enabled:true },
  // { label: "Hotels",     to: "/properties",  icon: <ApartmentOutlined />, enabled: can('hotel_any') },
  { label: "Rooms",    to: "/rooms",       icon: <BedOutlined />, enabled:true },
  { label: "Bookings", to: "/bookings", icon: <CalendarMonthOutlined />, enabled:true },
  { label: "Clients",   to: "/clients",   icon: <PeopleAltOutlined />, enabled:true },
  { label: "Reports",    to: "/reports",     icon: <BarChartOutlined />, enabled:true },
  // { label: "Users",    to: "/users",     icon: <ManageAccountsOutlined />, enabled: can('user_watch') },
];

    return(
        <Box sx={{ p: 1, mt:2 }}>
      <List disablePadding>
        {items.map((it) => {
          const selected = pathname.startsWith(it.to);
          return (it.enabled ? 
            <ListItemButton
              key={it.to}
              component={RouterLink}
              to={it.to}
              selected={selected}
              sx={{
                mb: 0.5,
                borderRadius: 2,               // скругление как на макете
                "&.Mui-selected": {
                  bgcolor: "action.selected",  // светлый фон
                },
                "&.Mui-selected:hover": {
                  bgcolor: "action.selected",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "text.primary" }}>
                {it.icon}
              </ListItemIcon>
              <ListItemText primary={it.label} primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItemButton>
          : '');
        })}
        <ListItemButton onClick={() => setOpenSettings((v) => !v)} sx={{ borderRadius: 1 }}>
        <ListItemIcon sx={{ minWidth: 40, color: "text.primary" }}><RoomPreferencesOutlined /></ListItemIcon>
        <ListItemText primary="Settings" primaryTypographyProps={{ fontWeight: 500 }}/>
        {/* {openSettings ? <ExpandLess /> : <ExpandMore />} */}
        </ListItemButton>

        <Collapse in={openSettings} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/properties"
            sx={{ pl: 6 }}
          >
            {/* <ListItemIcon><ApartmentOutlined /></ListItemIcon> */}
            <ListItemText primary="Hotels" />
          </ListItemButton>

          <ListItemButton
            component={RouterLink}
            to="/users"
            sx={{ pl: 6 }}
          >
            {/* <ListItemIcon><ManageAccountsOutlined /></ListItemIcon> */}
            <ListItemText primary="Users" />
          </ListItemButton>
        </List>
        </Collapse>
      </List>
    </Box>
    )

}