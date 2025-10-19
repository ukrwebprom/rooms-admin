import { useState } from "react";
import { useLocation, useParams, useMatch, NavLink } from 'react-router-dom';
import logo from "../assets/rooms.svg";
import { useAuth } from "../context/AuthContext";
import { useProperty } from "../context/PropertyContext";
import HotelSelect from "./HotelSelect";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Avatar, Menu, MenuItem } from "@mui/material";
import Dashboard from "./Dashboard";

const Titles = {
  properties: 'Hotels',
  users: 'Users', 
  dashboard: 'Dashboard'
}
const CurrentLocation = () => {
  const { pathname } = useLocation();
  return Titles[pathname.slice(1)];
}

function Navbar() {
    const {logout, isAuthenticated, session} = useAuth();
    const {currentPropertyId, setCurrentPropertyId} = useProperty();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const properties = session?.properties ?? [];

    const user = session.user;
    
  return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: "center",
        justifyContent: "space-between", 
        p: 0, 
        mb: 2 }}>
        <Typography variant="h4" mb={2} sx={{ flexGrow: 1 }}>{CurrentLocation()}</Typography>
        {/* <HotelSelect sx={{ flexGrow: 1 }}/> */}
        
        <IconButton  onClick={handleOpenMenu} sx={{ ml: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ textAlign: 'right', lineHeight: 0.5 }}>
              <Typography variant="subtitle2" fontWeight={600} noWrap>
                {user?.name || 'User'}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {user?.role || 'Guest'}
              </Typography>
            </Box>
          <Avatar alt={user?.name} src={user?.picture || ""} />
          </Box>
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}

        >
              <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  logout();
                }}
              >
                Logout
              </MenuItem>
        </Menu>
      </Box>
  );
}

export default Navbar;
