import { useState, useEffect } from "react";
import client from "../../api/client";
import {Box, Typography, TextField, Grid, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon       from '@mui/icons-material/Check';
import CloseIcon       from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ConfirmDialog } from "../ConfirmDialog";

export default function PropertyLocation ({property_id, onClose, action}) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [draft, setDraft] = useState({ code: '', kind: '', name: '', parent: '' });
  const [newLocation, setNewLocation] = useState({ code: '', kind: '', name: '', parent: '' });
  const [pendingId, setPendingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    client
    .post(`/properties/${encodeURIComponent(property_id)}/room-classes`, newClass)
    .then(({ data }) => { 
                if(data) classes? setClasses(prev => [data, ...prev]) : setClasses([data]); 
            })
    .catch((e) => { setErr(e.message); })
    .finally(() => { 
      setLoading(false); 
      setNewClass({ code: '', name: '' });
    });
    onClose();
    }

  if (loading) return <>Загрузка…</>;
  if (err) return <>Ошибка: {err}</>;
    return (
      <>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>Specify locations available in your property</Typography>
      {action === 'add_category' && (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 0 }} mb={3}>
      <Paper sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={2}>
          <TextField
            label="Code"
            value= {newLocation.code}
            onChange={e => setNewLocation({ ...newLocation, code: e.target.value })}
            fullWidth
            />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Title"
            value= {newLocation.name}
            onChange={e => setNewLocation({ ...newLocation, name: e.target.value })}
            fullWidth
            />
        </Grid>
        <Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}>
                <Button onClick={cancelAdd}>Cancel</Button>
                <Button variant="contained" type="submit">Create</Button>
          </Box>
        </Grid>
      </Grid>
      </Paper>
    </Box>
    )}
      </>
    )
}