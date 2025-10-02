import { useState } from "react";
import {
    Box, Paper, Stack, Divider, Grid, TextField, MenuItem, Typography,
    Autocomplete, Button
  } from "@mui/material";

export default function ReservationList() {
    const [clientValue, setClientValue] = useState(null);
    const [clientInput, setClientInput] = useState("");
  
    const handleSubmit = (e) => e.preventDefault();
  
    return (
      <>
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
        <Paper elevation={1} sx={{ p: 2.5, borderRadius: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {/* Левая половина */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle1" gutterBottom>Период и номер</Typography>

            {/* Заезд/Выезд в одну строку */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Заезд (UTC)" type="datetime-local" InputLabelProps={{ shrink: true }}
                  fullWidth required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Выезд (UTC)" type="datetime-local" InputLabelProps={{ shrink: true }}
                  fullWidth required
                />
              </Grid>
            </Grid>

            {/* Ниже — столбиком */}
            <Stack spacing={2}>
              <TextField select label="Комната" defaultValue="" fullWidth required>
                <MenuItem value="" disabled>Выберите комнату</MenuItem>
                <MenuItem value="101">Комната 101</MenuItem>
                <MenuItem value="102">Комната 102</MenuItem>
              </TextField>

              <TextField select label="Статус" defaultValue="CONFIRMED" fullWidth>
                <MenuItem value="CONFIRMED">Подтверждена</MenuItem>
                <MenuItem value="CHECKED_IN">Заселён</MenuItem>
                <MenuItem value="CHECKED_OUT">Выезд</MenuItem>
                <MenuItem value="CANCELLED">Отменена</MenuItem>
                <MenuItem value="NO_SHOW">No-show</MenuItem>
              </TextField>

              <TextField select label="Источник" defaultValue="" fullWidth>
                <MenuItem value="" disabled>Не выбран</MenuItem>
                <MenuItem value="DIRECT">Direct</MenuItem>
                <MenuItem value="WALK_IN">Walk-in</MenuItem>
                <MenuItem value="BOOKING">Booking</MenuItem>
                <MenuItem value="EXPEDIA">Expedia</MenuItem>
              </TextField>
            </Stack>
          </Box>

          {/* Правая половина */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle1" gutterBottom>Клиент</Typography>

            <Autocomplete
              options={[]}
              value={clientValue}
              onChange={(_, v) => setClientValue(v)}
              inputValue={clientInput}
              onInputChange={(_, v) => setClientInput(v)}
              renderInput={(p) => <TextField {...p} label="Клиент" required fullWidth />}
              noOptionsText="Начните вводить для поиска"
              fullWidth
            />

            <Divider sx={{ my: 2 }} />

            <Box
        component="fieldset"
        disabled={true}
        sx={{
          p: 0, m: 0, border: 0,
          opacity: false ? 1 : 0.5, // визуально «неактивно»
        }}
            >

            <Typography variant="subtitle2" gutterBottom>Новый клиент</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Имя" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Фамилия" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email" type="email" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Телефон" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Примечания" multiline minRows={3} fullWidth />
              </Grid>
            </Grid>
            </Box>
          </Box>
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
          <Button>Отмена</Button>
          <Button variant="contained">Сохранить</Button>
        </Box>

        </Paper>
      </Box>


  <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
  <Paper elevation={1} sx={{ p: 2.5, borderRadius: 3 }}>
      <Stack
          direction='column'
          spacing={3}
          divider={<Divider orientation="horizontal" flexItem />}
      >
      
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={4}>
                <TextField
                  label="Заезд (UTC)" type="datetime-local" InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  label="Выезд (UTC)" type="datetime-local" InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid size={4}>
                <TextField select label="Номер" defaultValue="" fullWidth>
                <MenuItem value="" disabled>Выберите номер</MenuItem>
                <MenuItem value="101">Комната 101</MenuItem>
                <MenuItem value="102">Комната 102</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Box sx={{ flex: 1, minWidth: 0 }}>

            <Autocomplete
              options={[]}
              value={clientValue}
              onChange={(_, v) => setClientValue(v)}
              inputValue={clientInput}
              onInputChange={(_, v) => setClientInput(v)}
              renderInput={(p) => <TextField {...p} label="Клиент" required fullWidth />}
              noOptionsText="Начните вводить для поиска"
              fullWidth
            />
            
            <Box
        component="fieldset"
        disabled={true}
        sx={{
          p: 0, m: 0, border: 0, mt:2,
          opacity: false ? 1 : 0.5, // визуально «неактивно»
        }}
            >

            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField label="Имя"  fullWidth/>
              </Grid>
              <Grid size={6}>
                <TextField label="Фамилия"  fullWidth/>
              </Grid>
              <Grid size={6}>
                <TextField label="Email" type="email" fullWidth />
              </Grid>
              <Grid size={6}>
                <TextField label="Телефон"  fullWidth/>
              </Grid>
              <Grid size={12}>
                <TextField label="Примечания" multiline minRows={3}  fullWidth/>
              </Grid>
            </Grid>

            </Box>
          </Box>
            
      </Stack>
  </Paper>
  </Box>
  </>
    );
}