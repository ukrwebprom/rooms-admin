import { useState } from "react";
import logo from "../assets/rooms.svg";
import { useAuth } from "../context/AuthContext";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Avatar, Menu, MenuItem } from "@mui/material";

function Navbar() {
    const {user, logout, isAuthenticated} = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    console.log('isAuthenticated navbar', isAuthenticated);

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);
  return (
    <AppBar position="static" sx={{ bgcolor: "#fff", color: "#333", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Box
            component="img"
            src={logo}
            alt="Rooms Admin"
            sx={{ height: 32 }}
          />
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
