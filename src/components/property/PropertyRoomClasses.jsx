import { useState, useEffect } from "react";
import client from "../../api/client";
import {Box, Typography, TextField, Grid, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, Stack, List, ListItem, Divider, ListItemText, Tooltip, IconButton,
    ListItemAvatar, ListItemButton, Avatar} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon       from '@mui/icons-material/Check';
import CloseIcon       from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function PropertyRoomClasses({property_id, onClose, action}) {
    const [classes, setClasses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [editRow, setEditRow] = useState(null);
    const [draft, setDraft] = useState({ code: '', name: '' });
    const [newClass, setNewClass] = useState({ code: '', name: '' });

    useEffect(() => {
        if (!property_id) return;
            let cancelled = false;
            client
            .get(`/properties/${encodeURIComponent(property_id)}/room-classes`)
            .then(({ data }) => { if (!cancelled) 
                data.length > 0 ? setClasses(data) : setClasses(null); 
                console.log(data);
            })
            .catch((e) => { if (!cancelled) setErr(e.message); })
            .finally(() => { if (!cancelled) setLoading(false); });
    
          return () => { cancelled = true; };
    
    }, [property_id]);

    const startEdit = (row) => {
        setEditRow(row.id);
        setDraft({ code: row.code ?? '', name: row.name ?? '' });
    };
    const save = () => {
        return null
    }

    const cancel = () => {
      setEditRow(null);
    }

    const deleteRow = (row) => {
        return null
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(draft);
    client
    .post(`/properties/${encodeURIComponent(property_id)}/room-classes`, newClass)
    .then(({ data }) => { 
                if(data) setClasses(prev => [data, ...prev]); 
                console.log(data);
            })
    .catch((e) => { setErr(e.message); })
    .finally(() => { setLoading(false); });
    onClose();
    }

    if (loading) return <>Загрузка…</>;
    if (err) return <>Ошибка: {err}</>;
    if (!classes) return <>No Room Categories</>;
    return (
        <>
        {action === 'add_category' && (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 0 }} mb={3}>
      <Paper sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={2}>
          <TextField
            label="Code"
            value= {newClass.code}
            onChange={e => setNewClass({ ...newClass, code: e.target.value })}
            fullWidth
            />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Title"
            value= {newClass.name}
            onChange={e => setNewClass({ ...newClass, name: e.target.value })}
            fullWidth
            />
        </Grid>
        <Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" type="submit">Create</Button>
          </Box>
        </Grid>
      </Grid>
      </Paper>
    </Box>
    )}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="right" width={80}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {classes.map((c) => (
                <TableRow
              key={c.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: c.id != editRow? 'white':'grey.50' }}>
                {c.id != editRow? (<>
                <TableCell align="left"><Chip label={c.code} size="small" /></TableCell>
                <TableCell align="left">{c.name}</TableCell>
                <TableCell align="right">
                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                  <IconButton
                    size="small"
                    aria-label={`edit ${c.name}`}
                    onClick={() => startEdit(c)}>
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label={`edit ${c.name}`}
                    onClick={() => deleteRow(c)}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell></>
              ):(<>
                <TableCell align="left">
                    <TextField
                      size="small"
                      value={draft.code}
                      onChange={e => setDraft(d => ({ ...d, code: e.target.value }))}
                    />
                </TableCell>
                <TableCell align="left">
                    <TextField
                     size="small"
                     value={draft.name}
                     onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
                     fullWidth
                    />
                </TableCell>
                <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                      <IconButton onClick={save}><CheckIcon/></IconButton>
                      <IconButton onClick={cancel}><CloseIcon/></IconButton>
                    </Box>
                </TableCell>
                </>
              )}
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
    )
};