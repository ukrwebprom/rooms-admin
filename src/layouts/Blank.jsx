import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function Blank() {
  return (
    <Box sx={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Outlet />;
    </Box>
  )
  
}