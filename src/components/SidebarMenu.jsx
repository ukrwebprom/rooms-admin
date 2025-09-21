
import {
  List, ListItemButton, ListItemIcon, ListItemText, Box
} from "@mui/material";
import {
  HomeOutlined,
  ApartmentOutlined,
  BedOutlined,
  CalendarMonthOutlined,
  PeopleAltOutlined,
  BarChartOutlined,
} from "@mui/icons-material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const items = [
  { label: "Дашборд",   to: "/dashboard",   icon: <HomeOutlined /> },
  { label: "Отели",     to: "/properties",  icon: <ApartmentOutlined /> },
  { label: "Номера",    to: "/rooms",       icon: <BedOutlined /> },
  { label: "Бронирования", to: "/bookings", icon: <CalendarMonthOutlined /> },
  { label: "Клиенты",   to: "/customers",   icon: <PeopleAltOutlined /> },
  { label: "Отчёты",    to: "/reports",     icon: <BarChartOutlined /> },
];

export default function SidebarMenu() {
    const { pathname } = useLocation();

    return(
        <Box sx={{ p: 1, mt:2 }}>
      <List disablePadding>
        {items.map((it) => {
          const selected = pathname.startsWith(it.to);
          return (
            <ListItemButton
              key={it.to}
              component={RouterLink}
              to={it.to}
              selected={selected}
              sx={{
                mb: 0.5,
                borderRadius: 2,               // скругление как на макете
                "&.Mui-selected": {
                  bgcolor: "action.selected",  // светлый фон
                },
                "&.Mui-selected:hover": {
                  bgcolor: "action.selected",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "text.primary" }}>
                {it.icon}
              </ListItemIcon>
              <ListItemText primary={it.label} primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
    )

}