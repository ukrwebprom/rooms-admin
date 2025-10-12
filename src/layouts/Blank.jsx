import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import bg from '../assets/bg.jpg';

export default function Blank() {
  return (
    <Box sx={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      backgroundImage: `url(${bg})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }}>
        <Outlet />
    </Box>
  )
  
}