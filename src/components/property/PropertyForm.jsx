import {Box, Typography, TextField, Grid, Button} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import client from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import { useProperty } from "../../context/PropertyContext";
import { useNavigate } from 'react-router-dom';

export default function PropertyForm({id, onCancel}) {
    const [hotelData, setHotelData] = useState();
    const [originalData, setOriginalData] = useState();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
    const {updatePropertyList} = useAuth();
    const {setCurrentPropertyId} = useProperty();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    if(!id) {
        client.post('/properties/', hotelData)
        .then(({data}) => {
            updatePropertyList(data.id);
            navigate(`/properties/`);
        })
        .catch((e) => {setErr(e.message);})
        .finally()
    } else {
        client.patch(`/properties/${encodeURIComponent(id)}`, hotelData)
        .then(({data}) => {
            setHotelData(data); 
            setOriginalData(data);
        })
        .catch((e) => {setErr(e.message);})
        .finally()
    }
    };


    useEffect(() => {
    if (id)
        {
        setLoading(true);
        client
        .get(`/properties/${encodeURIComponent(id)}`)
        .then(({ data }) => {  
            setHotelData(data); 
            setOriginalData(data);
        })
        .catch((e) => { setErr(e.message); })
        .finally(() => { setLoading(false); });
    } else {
        setHotelData({
            name:'',
            country:'',
            city:'',
            address:'',
            email:'',
            phone:'',
            description:''
        });
        setOriginalData({
            name:'',
            country:'',
            city:'',
            address:'',
            email:'',
            phone:'',
            description:''
        });
    }

    }, [id]);

    const normalize = (o={}) => {
        const n = {};
        for (const k of Object.keys(o)) {
          const v = o[k];
          n[k] = v == null ? '' : String(v).trim();
        }
        return n;
      };
    const stable = (o={}) => JSON.stringify(normalize(o), Object.keys(o).sort());
    const isModified= useMemo(() => stable(hotelData) !== stable(originalData), [hotelData, originalData]);

    if (loading) return <>Загрузка…</>;
    if (err) return <Typography color="error">{err}</Typography>;
    if (!hotelData) return <>No data</>;
    return(
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 0 }} mt={3}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <TextField
                    label="Hotel name"
                    value= {hotelData.name}
                    onChange={e => setHotelData({ ...hotelData, name: e.target.value })}
                    fullWidth
                    />
                </Grid>
                <Grid size={4}>
                    <TextField label="Country"  value= {hotelData.country} fullWidth
                    onChange={e => setHotelData({ ...hotelData, country: e.target.value })}
                    />
                </Grid>
                <Grid size={4}>
                    <TextField label="City" value= {hotelData.city} fullWidth
                    onChange={e => setHotelData({ ...hotelData, city: e.target.value })}
                    />
                </Grid>
                <Grid size={4}>
                    <TextField label="Address" value= {hotelData.address} fullWidth
                    onChange={e => setHotelData({ ...hotelData, address: e.target.value })}
                    />
                </Grid>
                <Grid size={6}>
                    <TextField label="Email"  value= {hotelData.email} fullWidth
                    onChange={e => setHotelData({ ...hotelData, email: e.target.value })}
                    />
                </Grid>
                <Grid size={6}>
                    <TextField label="Phone" value= {hotelData.phone} fullWidth
                    onChange={e => setHotelData({ ...hotelData, phone: e.target.value })}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                    label="Description"
                    multiline
                    minRows={3}     // или rows={4}
                    maxRows={10}    // с autosize
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={hotelData.description ? hotelData.description : ''}
                    onChange={e => setHotelData({ ...hotelData, description: e.target.value })}
                    />
                </Grid>

            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
                {!id && <Button onClick={onCancel}>Cancel</Button>}
                <Button variant="contained" type="submit" disabled={!isModified}>{!id ? 'Create' : 'Update'}</Button>
            </Box>
        </Box>
    )
}