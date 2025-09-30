import { useEffect, useState } from "react";
import { useProperty } from "../context/PropertyContext";
import client from "../api/client";
import Toolbar from "@mui/material/Toolbar";
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, Typography
} from "@mui/material";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(); // можно заменить на toLocaleString()
}

export default function Clients () {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const { currentPropertyId: propertyId = null } = useProperty();

    useEffect(() => {
        if (!propertyId) return;
        let cancelled = false;

        client
      .get("/clients", { params: { propertyId, limit: 100, offset: 0 } })
      .then(({ data }) => { if (!cancelled) setItems(data.items || []); })
      .catch((e) => { if (!cancelled) setErr(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

      return () => { cancelled = true; };

    }, [propertyId]);

    if (!propertyId) return <>Нет propertyId</>;
    if (loading) return <>Загрузка…</>;
    if (err) return <>Ошибка: {err}</>;

    return (
    <Toolbar
      disableGutters
      sx={{
        mb: 5,
        mt: 2,
        px: 0,
        minHeight: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
        <Typography variant="h4" mb={2}>Clients</Typography>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell align="left">E-mail</TableCell>
            <TableCell align="left">Тел.</TableCell>
            <TableCell align="left">Дата / время</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {items.map((c) => (
                <TableRow
              key={c.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                <TableCell component="th" scope="row">
                {[c.lastName, c.firstName].filter(Boolean).join(" ")}
              </TableCell>
              <TableCell align="left">{c.email ? `${c.email}` : ""}</TableCell>
              <TableCell align="left">{c.phone ? `${c.phone}` : ""}</TableCell>
              <TableCell align="left">{formatDate(c.createdAt)}</TableCell>
              
            
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
        
    </Toolbar>
    )

}