import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function Blank() {
  return (
    <Box sx={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      backgroundImage: 'linear-gradient(30deg, #0ea5e9 0%, #6366f1 50%, #22c55e 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }}>
        <Outlet />
    </Box>
  )
  
}