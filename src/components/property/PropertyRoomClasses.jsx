import { useState, useEffect } from "react";
import client from "../../api/client";
import {Box, Typography, TextField, Grid, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, Stack, List, ListItem, Divider, ListItemText, Tooltip, IconButton,
    ListItemAvatar, ListItemButton, Avatar} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon       from '@mui/icons-material/Check';
import CloseIcon       from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ConfirmDialog } from "../ConfirmDialog";

export default function PropertyRoomClasses({property_id, onClose, action}) {
    const [classes, setClasses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [editRow, setEditRow] = useState(null);
    const [draft, setDraft] = useState({ code: '', name: '' });
    const [newClass, setNewClass] = useState({ code: '', name: '' });
    const [pendingId, setPendingId] = useState(null);


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
    const isModified = () => {
      if(!editRow) return false;
      if(draft.code.trim().toUpperCase() === classes.find((e) => e.id===editRow).code &&
        draft.name.trim() === classes.find((e) => e.id===editRow).name
      ) return false;
      return true;
    }

    const save = () => {
      console.log('id:', editRow, "data:", draft);
      // PATCH /properties/:propertyId/room-classes/:classId
      client
      .patch(`/properties/${encodeURIComponent(property_id)}/room-classes/${editRow}`, draft )
      .then(({ data }) => {
        if(data) {
          setClasses(prev =>
            prev.map(item =>
              item.id === editRow ? { ...item, code: data.code, name:data.name } : item
            )
          );
          }
        })
      .catch((e) => {setErr(e.message); })
      .finally(() => {
        setLoading(false); 
        setEditRow(null);
      });
    }

    const cancel = () => {
      setEditRow(null);
    }
    const cancelAdd = () => {
      setNewClass({ code: '', name: '' });
      onClose();
    }

    const askDelete = (id) => setPendingId(id);

    const closeDialog = () => !loading && setPendingId(null);

    const confirmDelete = () => {
      client
      .delete(`/properties/${encodeURIComponent(property_id)}/room-classes/${pendingId}`)
      .then(({ data }) => {
        if(data.ok) {
            setClasses(prev => prev.filter(p => p.id !== data.id));
            setPendingId(null);
          }
        })
      .catch((e) => {setErr(e.message); })
      .finally(() => {setLoading(false); });
    }

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
    //if (!classes) return <>No Room Categories</>;
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
                <Button onClick={cancelAdd}>Cancel</Button>
                <Button variant="contained" type="submit">Create</Button>
          </Box>
        </Grid>
      </Grid>
      </Paper>
    </Box>
    )}
    {classes?.length > 0 ? 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow sx={{bgcolor: 'pink'}}>
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
                    onClick={() => askDelete(c.id)}>
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
                      <IconButton onClick={save} disabled={!isModified()} ><CheckIcon/></IconButton>
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
    : <>No Room Categories</>}
    <ConfirmDialog
        open={Boolean(pendingId)}
        title="Delete category?"
        text="This action cannot be undone."
        action_text="Delete"
        onCancel={closeDialog}
        onConfirm={confirmDelete}
      />
        </>
    )
};