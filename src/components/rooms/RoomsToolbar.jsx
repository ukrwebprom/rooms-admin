import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";


export default function RoomsToolbar({ mode, onModeChange, size, onSizeChange }) {
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
      <FormControl variant="outlined" sx={{ minWidth: 260 }}>
        <InputLabel id="rooms-mode-label">Режим отображения</InputLabel>
        <Select
          labelId="rooms-mode-label"
          label="Режим отображения"
          value={mode}
          onChange={(e) => onModeChange(e.target.value)}
        >
          <MenuItem value="number">Все номера</MenuItem>
          <MenuItem value="floor">По этажам</MenuItem>
          <MenuItem value="type">По типам</MenuItem>
          <MenuItem value="status">По статусу</MenuItem>
        </Select>
      </FormControl>

      <ToggleButtonGroup
        value={size}
        exclusive
        onChange={(_, v) => v && onSizeChange(v)}
        sx={{
            "& .MuiToggleButton-root": {
            fontSize: 16,        // px или rem: "1rem"
            fontWeight: 600,
            px: 2.25,
            py: 1.1,
            },
        }}
      >
        <ToggleButton value="s">S</ToggleButton>
        <ToggleButton value="m">M</ToggleButton>
        <ToggleButton value="l">L</ToggleButton>
      </ToggleButtonGroup>
    </Toolbar>
  );
}