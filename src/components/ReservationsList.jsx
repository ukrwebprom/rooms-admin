import { useState } from "react";
import {
    Box, Paper, Stack, Divider, Grid, TextField, MenuItem, Typography,
    Autocomplete, Button, Tabs, Tab
  } from "@mui/material";

export default function ReservationList() {

  
    return (
      <>
  <Box sx={{ p: 2 }}>
  <Paper elevation={1} sx={{ p: 2.5, borderRadius: 3 }}>
    <Typography variant="h6" mb={2}>Booking list</Typography>
  </Paper>
  </Box>
  </>
    );
}