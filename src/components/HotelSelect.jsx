import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useProperty } from "../context/PropertyContext";
import { useAuth } from "../context/AuthContext";

let hotel1;
export default function HotelSelect() {
    const {session} = useAuth();
    const {currentPropertyId, setCurrentPropertyId, getPropertyName} = useProperty();
    const [hotels, setHotels] = useState(null);
    const [singleHotel, setSingleHotel] = useState(null);

    useEffect(() => {
        if(!session || !session.properties.length) return;
        if(session.properties.length === 1) {
            setSingleHotel(session.properties[0].property_name);
        } else {
            setHotels(session.properties);
        }

    }, [session]);

  return (
<>
        {singleHotel != null && 
        (<Typography variant="h5">
            {singleHotel}
        </Typography>)}

        {hotels !=null && (

    <FormControl variant="standard" sx={{ minWidth: 220 }}>
      {/* <InputLabel id="hotel-select-label">Отель</InputLabel> */}
      <Select
        value={currentPropertyId}
        onChange={(e) => setCurrentPropertyId(e.target.value)}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {hotels.map((h) => (
          <MenuItem key={h.property_id} value={h.property_id}>
            {h.property_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

        )}
</>
    );
}