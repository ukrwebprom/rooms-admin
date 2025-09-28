import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import { Typography} from "@mui/material";

export default function ReservationToolbar({mode}) {

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
        { mode === "show" && (
            <>
            <Typography variant="h4" mb={2}>Bookings</Typography>
            <Button component={Link} to="/bookings/new" size="large" variant="contained" color="primary">
                ADD BOOKING
            </Button>
            </>
            )}
        { mode === "create" && (
            <>
            <Typography variant="h4" mb={2}>New booking</Typography>
            <Button component={Link} to="/bookings" size="large" variant="contained" color="primary">
                BOOKINGS
            </Button>
            </>
            )}

    </Toolbar>
    )

}