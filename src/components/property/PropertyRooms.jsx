import { useState, useEffect, useMemo, useCallback } from "react";
import client from "../../api/client";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocationsTree from './LocationsTree';
import {
    Box, Paper, Stack, Divider, Grid, TextField, MenuItem, Typography,
    Autocomplete, Button, Tabs, Tab, Toolbar
  } from "@mui/material";

export default function PropertyRooms ({property_id, onClose, action}) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [path, setPath] = useState(null);

  useEffect(() => {
    if (!property_id) return;
      let cancelled = false;
      client
        .get(`/properties/${encodeURIComponent(property_id)}/locations`)
        .then(({ data }) => { if (!cancelled) {
        data.length > 0 ? setLocation(data) : setLocation(null); 
        // console.log('Raw data', data);
        // console.log('Sorted data', sortTreePreorder(data, {idKey: 'id', parentKey: 'parent_id'}))
        }})
        .catch((e) => { if (!cancelled) setErr(e.message); })
        .finally(() => { if (!cancelled) setLoading(false); });
      return () => { cancelled = true; };
    }, [property_id]);

  if (loading) return <>Загрузка…</>;
  if (err) return <>Ошибка: {err}</>;

  const changeLocation = (l) => {
    const selected = location.find((n) => n.id === l);
    setSelectedLocation(selected);
    setPath(getLocationPath(selected));
  };


  const getLocationPath = (sel) =>  {
    console.log(sel);
    if(!sel) return '';
    if(!sel.parent_id) return sel.name;

    const path = [sel.name];
    let parent = sel.parent_id;
    let nextNode = null;
    do {
      nextNode = location.find(n => n.id === parent)
      path.push(nextNode.name);
      parent = nextNode.parent_id;
    } while (parent);
    console.log(path);
    return path.slice().reverse().join(' / ');
  };

  return (
      <Box
        sx={{
        display: 'flex',
        minHeight: 420,          // при желании: '60vh'
        width: '100%',
        gap: 0,
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
        }}>
    
      <Box
        sx={{
          flexBasis: '15%',
          flexShrink: 0,
          maxWidth: '15%',
          minWidth: 240,          // чтобы не схлопывалась
          p: 2,
          overflow: 'auto',
        }}>
          {!location? <p>No locations</p>: (
            <LocationsTree locations={location} onSelect={changeLocation} />
          )}
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box sx={{flex: 1, p: 2, overflow: 'auto' }}>
        <Typography variant="h5" mb={2}>{path}</Typography>
      </Box>
    </Box>
  );
}