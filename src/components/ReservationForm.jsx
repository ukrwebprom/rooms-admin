import { Box, Paper, Typography, Stack, Button, TextField, MenuItem } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useMemo, useState } from "react";


export default function ReservationForm() {

    const [clientOption, setClientOption] = useState(null);
    const [clientInput, setClientInput] = useState("");

  // ВРЕМЕННО: мок-список клиентов (потом заменим запросом к API)
  const allClients = useMemo(
    () => [
      { id: "c1-uuid", label: "Иван Петров · ivan@example.com" },
      { id: "c2-uuid", label: "Мария Сидорова · maria@example.com" },
    ],
    []
  );

 // Фильтрация по введённому тексту
  const filtered = useMemo(() => {
    const q = clientInput.trim().toLowerCase();
    if (!q) return allClients;
    return allClients.filter(c => c.label.toLowerCase().includes(q));
  }, [clientInput, allClients]);

  // Добавим «виртуальную» опцию для создания нового клиента
  const options = useMemo(() => {
    const base = filtered;
    const showCreate = clientInput.trim().length > 1 && !base.length;
    return showCreate
      ? [{ id: "__create__", label: `+ Создать нового клиента “${clientInput}”` }]
          .concat(base)
      : base;
  }, [filtered, clientInput]);


function handleSubmit(e) {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const payload = {
    room_id: Number(fd.get("room_id")),
    start_utc: new Date(fd.get("start_utc")).toISOString(),
    end_utc: new Date(fd.get("end_utc")).toISOString(),
    client: clientOption?.id === "__create__"
        ? { create: true, hint: clientInput.trim() } // на следующем шаге откроем диалог
        : { id: clientOption?.id || null },
  };
  console.log("payload:", payload);
}

    return (
    <Box p={2}>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
  label="Заезд (UTC)"
  type="datetime-local"
  name="start_utc"
  InputLabelProps={{ shrink: true }}
  required
/>
<TextField
  label="Выезд (UTC)"
  type="datetime-local"
  name="end_utc"
  InputLabelProps={{ shrink: true }}
  required
/>
<TextField
  select
  label="Комната"
  name="room_id"
  defaultValue=""
  required
>
  <MenuItem value="" disabled>Выберите комнату</MenuItem>
  <MenuItem value={101}>Комната 101</MenuItem>
  <MenuItem value={102}>Комната 102</MenuItem>
</TextField>

            <Autocomplete
              options={options}
              getOptionLabel={(opt) => opt?.label ?? ""}
              value={clientOption}
              onChange={(_, val) => setClientOption(val)}
              inputValue={clientInput}
              onInputChange={(_, val) => setClientInput(val)}
              renderInput={(params) => (
                <TextField {...params} label="Клиент" placeholder="Имя, email или телефон" required />
              )}
              noOptionsText={
                clientInput.trim().length > 1
                  ? `Нет совпадений. Нажмите на “+ Создать нового клиента…”.`
                  : "Начните вводить имя/email/телефон"
              }
            />
            <Button type="submit" variant="contained">Сохранить</Button>
          </Stack>
        </form>
      </Paper>
    </Box>
    )
}