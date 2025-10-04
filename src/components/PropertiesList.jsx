import { useEffect, useState } from "react";
import { useProperty } from "../context/PropertyContext";
import { useAuth } from "../context/AuthContext";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import { Typography} from "@mui/material";
import PropertyForm from "./property/PropertyForm";


export default function PropertiesList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const {currentPropertyId, setCurrentPropertyId, getPropertyName} = useProperty();

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
        <Button component={Link} to="/properties/new" size="large" variant="contained" color="primary">
            Add hotel
        </Button>
        </Toolbar>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
            {properties.map((i, index) => (
                <Tab label={i.property_name} key={i.property_id} value={index}/>
            ))}
        </Tabs>
        </Box>
        {properties[value] && (
        <PropertyForm label={getPropertyName(currentPropertyId)} id={currentPropertyId}/>
        )}
    </>
    )

}