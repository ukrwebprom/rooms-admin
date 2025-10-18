import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarMenu from "../components/SidebarMenu";
import Sidebar from "../components/Sidebar";
import { Box, Drawer, Toolbar, List, ListItemButton, ListItemText, Divider } from "@mui/material";

export default function AppShell() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column",
      backgroundImage: 'linear-gradient(30deg, #0ea5e9 0%, #6366f1 50%, #22c55e 100%)',
     }}>
      {/* <Navbar /> */}
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundImage: 'linear-gradient(30deg, #0ea5e9 0%, #6366f1 50%, #22c55e 100%)',
      }}
    >
      <Sidebar onNavigate={(key) => navigate(`/${key}`)} />

      <Box component="main" sx={{ flex: 1, p: 3, bgcolor: '#f9fafb' }}>
        <Navbar />
        <Outlet />
      </Box>
    </Box>
      {/* <Footer /> */}
    </Box>
  );
}