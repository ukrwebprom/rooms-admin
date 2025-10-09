import { useEffect, useState } from "react";
import { useProperty } from "../../context/PropertyContext";
import { useAuth } from "../../context/AuthContext";
import { useCan } from '../../api/can';
import { Link } from "react-router-dom";
import PropertyForm from "./PropertyForm";
import PropertyUsers from "./PropertyUsers";
import PropertyRoomClasses from "./PropertyRoomClasses";
import PropertyLocation from "./PropertyLocation";
import PropertyRooms from "./PropertyRooms";
import {
    Box, Paper, Stack, Divider, Grid, TextField, MenuItem, Typography,
    Autocomplete, Button, Tabs, Tab, Toolbar
  } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box sx={{ p: 0 }}>
        {value === index && <Box sx={{ p: 3, pt:0 }}>{children}</Box>}
    </Box>
  );
}


export default function Properties({mode}) {
    const {currentPropertyId, setCurrentPropertyId, getPropertyName} = useProperty();
    const [currentTab, setCurrentTab] = useState(0);
    const [action, setAction] = useState(null);
    const [isNew, setIsNew] = useState(null);
    const { can } = useCan();
    const {session} = useAuth();
    const properties = session? session.properties : [];
    // const [value, setValue] = useState(0);

    // const handleChange = (event, newValue) => {
        
    //     setValue(newValue);
    // };
    const handleChangeTab = (event, newValue) => {
        setAction(null);
        setCurrentTab(newValue);
    };

    const handleCancelNew = () => setIsNew(false);
    const handleNewHotel = () => {
        setCurrentTab(0);
        setIsNew(true);
    }

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
        {(!isNew && can('hotel_create')) && <Button onClick={handleNewHotel} size="large" variant="contained" color="primary">
            Add hotel
        </Button>}
        </Toolbar>
        
        <Box sx={{ p: 0 }}>
        <Paper elevation={1} sx={{ p: 0, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, pr: 4 }}>
        <Tabs value={currentTab} onChange={handleChangeTab} sx={{p:2, flexGrow: 1}}>
            <Tab label='Main' value={0}/>
            <Tab label='Room categories' value={2} disabled={isNew}/>
            <Tab label='Locations / Floors' value={3} disabled={isNew}/>
            <Tab label='Rooms' value={4} disabled={isNew}/>
            {can('user_watch') && <Tab label='Users' value={1} disabled={isNew}/>}
        </Tabs>
        {currentTab === 2 && (
            <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => setAction('add_category')}
            sx={{ ml: 2 }}
            disabled = {!!action}
            >
            Add category
            </Button>  )}
        {currentTab === 1 && (
            <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => setAction('add_client')}
            sx={{ ml: 2 }}
            >
            Add user
            </Button>  )}
        {currentTab === 3 && (
            <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => setAction('add_location')}
            sx={{ ml: 2 }}
            >
            Add location
            </Button>  )}
        </Box>
        <CustomTabPanel value={currentTab} index={0}>
            <PropertyForm id={isNew? null : currentPropertyId} onCancel={handleCancelNew}/>
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={1}>
            <PropertyUsers property_id={currentPropertyId} />
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={2}>
            <PropertyRoomClasses property_id={currentPropertyId} onClose={() => setAction(null)} action={action} />
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={3}>
            <PropertyLocation property_id={currentPropertyId} onClose={() => setAction(null)} action={action} />
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={4}>
            <PropertyRooms property_id={currentPropertyId} onClose={() => setAction(null)} action={action} />
        </CustomTabPanel>
        
        </Paper>
        </Box>
    </>
    )

}