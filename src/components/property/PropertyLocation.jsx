import { useState, useEffect } from "react";
import client from "../../api/client";
import {Box, Typography, TextField, Grid, Button,  MenuItem, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, IconButton} from "@mui/material";
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
  const [draft, setDraft] = useState({ code: '', kind: '', name: '', parent_id: '' });
  const [newLocation, setNewLocation] = useState({ code: '', kind: '', name: '', parent_id: '' });
  const [pendingId, setPendingId] = useState(null);
  const KINDS = [
  { value: 'FLOOR',    label: 'Floor' },
  { value: 'BUILDING', label: 'Building' },
  { value: 'WING',     label: 'Wing' },
  { value: 'ZONE',     label: 'Zone' },
  { value: 'AREA',     label: 'Area' },
  { value: 'OTHER',    label: 'Other' },
  ];
  
  
  
  const startEdit = (row) => {
    setEditRow(row.id);
    setDraft({ code: row.code ?? '', name: row.name ?? '' });
  };

  const askDelete = (id) => setPendingId(id);

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

  const cancelAdd = () => {
      setNewLocation({ code: '', kind: '', name: '', parent_id: null });
      onClose();
    }

  const getParentName = (id) => {
    if(!id) return null;
    return location.find((p) => p.id=== id).name;
  }

  useEffect(() => {
    if (!property_id) return;
      let cancelled = false;
      client
        .get(`/properties/${encodeURIComponent(property_id)}/locations`)
        .then(({ data }) => { if (!cancelled) {
        data.length > 0 ? setLocation(data) : setLocation(null); 
        console.log(data);}
        })
        .catch((e) => { if (!cancelled) setErr(e.message); })
        .finally(() => { if (!cancelled) setLoading(false); });
      return () => { cancelled = true; };
    }, [property_id]);

  if (loading) return <>Загрузка…</>;
  if (err) return <>Ошибка: {err}</>;

    return (
      <>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>Specify locations available in your property</Typography>
      {action === 'add_location' && (
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
        <Grid size={2}>
          <TextField
            label="Kind"
            select
            fullWidth
            required
            value={newLocation.kind}
            onChange={(e) => setNewLocation({ ...newLocation, kind: e.target.value })}>
          {KINDS.map(k => (
          <MenuItem key={k.value} value={k.value}>
            {k.label}
          </MenuItem>
          ))}
          </TextField>
        </Grid>
        <Grid size={3}>
          <TextField
            label="Title"
            value= {newLocation.name}
            onChange={e => setNewLocation({ ...newLocation, name: e.target.value })}
            fullWidth
            />
        </Grid>
        <Grid size={2}>
          <TextField
            label="Parent location"
            select
            fullWidth
            value={newLocation.parent_id}
            onChange={(e) => setNewLocation(l => ({ ...l, parent_id: e.target.value }))}
            InputLabelProps={{ shrink: true }}
            slotProps={{
              select: {
                displayEmpty: true,
                renderValue: (v) => {
                  if (!v) return <em>No parent</em>;
                  const item = getParentName(v);
                  return item ? item : '';
                },
              },
            }}
            
          >
            <MenuItem value=""><em>No parent</em></MenuItem>
          {location.map(k => (
          <MenuItem key={k.id} value={k.id}>
            {k.name}
          </MenuItem>
          ))}
          </TextField>
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

    {location?.length > 0 ? 
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow sx={{bgcolor: '#ebebeb'}}>
            <TableCell>Code</TableCell>
            <TableCell align="left">Kind</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Located in:</TableCell>
            <TableCell align="right" width={80}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {location.map((c) => (
                <TableRow
              key={c.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: c.id != editRow? 'white':'grey.50' }}>
                {c.id != editRow? (<>
                <TableCell align="left"><Chip label={c.code} size="small" /></TableCell>
                <TableCell align="left">{c.kind}</TableCell>
                <TableCell align="left">{c.name}</TableCell>
                <TableCell align="left">{c.parent_id ? getParentName(c.parent_id) : '' }</TableCell>
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
    : <>No Locations</>}
      </>
    )
}