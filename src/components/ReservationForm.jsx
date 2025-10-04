import { useState } from "react";
import {
    Box, Paper, Stack, Divider, Grid, TextField, MenuItem, Typography,
    Autocomplete, Button, Tabs, Tab
  } from "@mui/material";


export default function ReservationForm() {

    const [clientValue, setClientValue] = useState(null);
    const [clientInput, setClientInput] = useState("");
    const [roomType, setRoomType] = useState(0);
    const handleChangeRoomType = (event, newValue) => {
      setRoomType(newValue);
    };

    const handleSubmit = (e) => e.preventDefault();

   return (
      <>
  <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
  <Paper elevation={1} sx={{ p: 2.5, borderRadius: 3 }}>
      <Stack
          direction='column'
          spacing={3}
          >

            {/* ---------------------------------- Source / dates section ---------------- */}
      
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={4}>
                <TextField select label="Booking source" defaultValue="" fullWidth>
                <MenuItem value="" disabled>Не выбран</MenuItem>
                <MenuItem value="DIRECT">Direct</MenuItem>
                <MenuItem value="WALK_IN">Walk-in</MenuItem>
                <MenuItem value="BOOKING">Booking</MenuItem>
                <MenuItem value="EXPEDIA">Expedia</MenuItem>
                </TextField>
              </Grid>
              <Grid size={4}>
                <TextField
                  label="Сheck-in (UTC)" type="datetime-local" InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label="Check-out (UTC)" type="datetime-local" InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
            </Grid>
            {/* ---------------------------------- end of Source / dates section ---------------- */}
            
            {/* ---------------------------------- Client section ------------------------------- */}
            <Box sx={{ flex: 1, minWidth: 0 }}>

            <Autocomplete
              options={[]}
              value={clientValue}
              onChange={(_, v) => setClientValue(v)}
              inputValue={clientInput}
              onInputChange={(_, v) => setClientInput(v)}
              renderInput={(p) => <TextField {...p} label="Client" required fullWidth />}
              noOptionsText="Start typing"
              fullWidth
            />
            
            <Box component="fieldset"
              disabled={true}
              sx={{
                p: 0, m: 0, border: 0, mt:2,
                opacity: false ? 1 : 0.5, // визуально «неактивно»
              }}>

              <Grid container spacing={2}>
              <Grid size={6}>
                <TextField label="First name"  fullWidth/>
              </Grid>
              <Grid size={6}>
                <TextField label="Last name"  fullWidth/>
              </Grid>
              <Grid size={6}>
                <TextField label="Email" type="email" fullWidth />
              </Grid>
              <Grid size={6}>
                <TextField label="Phone"  fullWidth/>
              </Grid>
              <Grid size={12}>
                <TextField label="Notes" multiline minRows={3}  fullWidth/>
              </Grid>
              </Grid>
            </Box>
            </Box>
            {/* ---------------------------------- end of Client section ---------------- */}
            {/* ---------------------------------- Rooms section ---------------- */}
            <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={roomType} onChange={handleChangeRoomType} aria-label="basic tabs example">
                <Tab label="Item One" value={0}/>
                <Tab label="Item Two" value={1} />
                <Tab label="Item Three" value={2} />
              </Tabs>
            </Box>
              <p value={roomType}>{roomType}</p>
            </>
            {/* ---------------------------------- end of Rooms section ---------------- */}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
          <Button>Cancel</Button>
          <Button variant="contained">Create booking</Button>
      </Box>
  </Paper>
  </Box>
  </>
    );
}