import {Box, Typography, TextField, Grid, Button} from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import client from "../../api/client";

export default function PropertyForm({id, mode}) {
    const [hotelData, setHotelData] = useState();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const handleSubmit = async (e) => {
    e.preventDefault();
    client
    .post('/properties/', hotelData)
    .then(({data}) => {
        console.log(data);
    })
    .catch((e) => {setErr(e.message);})
    .finally()
    };


    useEffect(() => {
    if (!id) return;
        setLoading(true);
        let cancelled = false;
        client
        .get(`/properties/${encodeURIComponent(id)}`)
        .then(({ data }) => { if (!cancelled) 
            setHotelData(data); })
        .catch((e) => { if (!cancelled) setErr(e.message); })
        .finally(() => { if (!cancelled) setLoading(false); });

      return () => { cancelled = true; };

    }, [id]);

    useEffect(() => {
        if(mode === 'create') setHotelData({
            name:'',
            country:'',
            city:'',
            address:'',
            email:'',
            phone:'',
            description:''
        });
    }, [mode])

    if (loading) return <>Загрузка…</>;
    if (err) return <>Ошибка: {err}</>;
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
                {mode==='create' && <Button  component={Link} to="/properties/">Cancel</Button>}
                <Button variant="contained" type="submit">{mode==='create' ? 'Create' : 'Update'}</Button>
            </Box>
        </Box>
    )
}