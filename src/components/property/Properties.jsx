import { useEffect, useState } from "react";
import { useProperty } from "../../context/PropertyContext";
import { useAuth } from "../../context/AuthContext";
import { useCan } from '../../api/can';
import { Link } from "react-router-dom";
import PropertyForm from "./PropertyForm";
import PropertyUsers from "./PropertyUsers";
import {PropertyRoomClasses, PropertyRoomClassesAdd} from "./PropertyRoomClasses";
import {
    Box, Paper, Stack, Divider, Grid, TextField, MenuItem, Typography,
    Autocomplete, Button, Tabs, Tab, Toolbar
  } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
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
    const [action, setAction] = useState(null);
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, borderBottom: 1, borderColor: 'divider', pr: 4 }}>
        <Tabs value={currentTab} onChange={handleChangeTab} sx={{p:2, flexGrow: 1}}>
            <Tab label='Main' value={0}/>
            <Tab label='Room categories' value={2} disabled={mode==='create'}/>
            <Tab label='Locations / Floors' value={3} disabled={mode==='create'}/>
            <Tab label='Rooms' value={4} disabled={mode==='create'}/>
            {can('user_watch') && <Tab label='Users' value={1} disabled={mode==='create'}/>}
        </Tabs>
        {(currentTab === 2 && !action) && (
            <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => setAction('add_category')}
            sx={{ ml: 2 }}
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
        </Box>
        <CustomTabPanel value={currentTab} index={0}>
            <PropertyForm id={mode==='create'? null : currentPropertyId} mode={mode}/>
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={1}>
            <PropertyUsers property_id={currentPropertyId} action={action} />
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={2}>
            {action === 'add_category' && <PropertyRoomClassesAdd />}
            <PropertyRoomClasses property_id={currentPropertyId} action={action} />
        </CustomTabPanel>
        
        </Paper>
        </Box>
    </>
    )

}