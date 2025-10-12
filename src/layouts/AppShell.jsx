import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarMenu from "../components/SidebarMenu";
import { Box, Drawer, Toolbar, List, ListItemButton, ListItemText, Divider } from "@mui/material";

export default function AppShell() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Box sx={{ display: "flex", flex: 1 }}>

          <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
          }}
        >
          <Toolbar />
          <SidebarMenu />
          <Footer />
          </Drawer>

          <Box component="main" sx={{ flex: 1, p: 3, mt:5, backgroundColor: "#f9fafb" }}>
            <Outlet />
          </Box>

      </Box>
      {/* <Footer /> */}
    </Box>
  );
}