import { useEffect, useState } from "react";
import { useProperty } from "../../context/PropertyContext";
import { useAuth } from "../../context/AuthContext";
import { useCan } from '../../api/can';
import { Link } from "react-router-dom";
import PropertyForm from "./PropertyForm";
import PropertyUsers from "./PropertyUsers";
import PropertyRoomClasses from "./PropertyRoomClasses";
import {
    Box, Paper, Stack, Divider, Grid, TextField, MenuItem, Typography,
    Autocomplete, Button, Tabs, Tab, Toolbar
  } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box sx={{ p: 0 }}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}


export default function Properties({mode}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const {currentPropertyId, setCurrentPropertyId, getPropertyName} = useProperty();
    const [currentTab, setCurrentTab] = useState(0);
    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue);
    };
    const { can } = useCan();
    const {session} = useAuth();
    const properties = session? session.properties : [];
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (!properties) return (<p>No hotels</p>);
    return (
        <>

        <Toolbar
        disableGutters
        sx={{
        mb: 5,
        mt: 2,
        px: 0,
        minHeight: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        flexWrap: "wrap",
        }}>
        <Typography variant="h4" mb={2}>Hotels</Typography>
        {(mode!='create' && can('hotel_create')) && <Button component={Link} to="/properties/new" size="large" variant="contained" color="primary">
            Add hotel
        </Button>}
        </Toolbar>
        
        <Box sx={{ p: 0 }}>
        <Paper elevation={1} sx={{ p: 0, borderRadius: 3 }}>
        <Tabs value={currentTab} onChange={handleChangeTab} sx={{p:2}}>
            <Tab label='Main' value={0}/>
            <Tab label='Room categories' value={2} disabled={mode==='create'}/>
            <Tab label='Locations / Floors' value={3} disabled={mode==='create'}/>
            <Tab label='Rooms' value={4} disabled={mode==='create'}/>
            {can('user_watch') && <Tab label='Users' value={1} disabled={mode==='create'}/>}
        </Tabs>
        <CustomTabPanel value={currentTab} index={0}>
            <PropertyForm id={mode==='create'? null : currentPropertyId} mode={mode}/>
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={1}>
            <PropertyUsers property_id={currentPropertyId} />
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={2}>
            <PropertyRoomClasses property_id={currentPropertyId} />
        </CustomTabPanel>
        
        </Paper>
        </Box>
    </>
    )

}