import {Box, Typography, TextField, Grid, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Stack, List, ListItem, Divider, ListItemText, 
  ListItemAvatar, ListItemButton, Avatar} from "@mui/material";
import { useState, useEffect } from "react";
import * as React from 'react';
import client from "../../api/client";
import { ABILITIES } from "../../constants/constants";

export default function PropertyUsers({property_id}) {

    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
    if (!property_id) return;
        let cancelled = false;
        client
        .get(`/properties/${encodeURIComponent(property_id)}/users`)
        .then(({ data }) => { if (!cancelled) 
            setUsers(data); })
        .catch((e) => { if (!cancelled) setErr(e.message); })
        .finally(() => { if (!cancelled) setLoading(false); });

      return () => { cancelled = true; };

    }, [property_id]);

    if (loading) return <>Загрузка…</>;
    if (err) return <>Ошибка: {err}</>;
    if (!users) return <>No users</>;

    return (
        <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Permissions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {users.map((c) => (
                <TableRow
              key={c.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{c.name}</TableCell>
                <TableCell align="left">{c.role}</TableCell>
                <TableCell align="left">{c.status}</TableCell>
                <TableCell align="left">
                    <Stack direction="row" spacing={1}>
                    {c.abilities.map((a) => (
                        <Chip label={ABILITIES[a]} size="small" key={a} />
                    ))}
                    </Stack>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>


    </>
    )
};