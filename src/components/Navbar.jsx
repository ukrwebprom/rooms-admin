import { useState } from "react";
import logo from "../assets/rooms.svg";
import { useAuth } from "../context/AuthContext";
import { useProperty } from "../context/PropertyContext";
import HotelSelect from "./HotelSelect";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Avatar, Menu, MenuItem } from "@mui/material";

function Navbar() {
    const {user, logout, isAuthenticated, session} = useAuth();
    const {currentPropertyId, setCurrentPropertyId} = useProperty();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const properties = session?.properties ?? [];
    
  return (
    <AppBar position="static" sx={{ bgcolor: "#fff", color: "#333", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Box
            component="img"
            src={logo}
            alt="Rooms Admin"
            sx={{ height: 32, mr: 4 }}
          />
        <HotelSelect />
        
        <Box sx={{ flexGrow: 1 }} />
        
        <IconButton  onClick={handleOpenMenu} sx={{ ml: 2 }}>
          <Avatar alt={user?.name} src={user?.avatarUrl || ""} />
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}

        >
              <MenuItem onClick={handleCloseMenu}>Профиль</MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  logout();
                }}
              >
                Выйти
              </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
