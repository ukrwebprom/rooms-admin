import { useMemo, useState, useCallback } from "react";
import Room from './rooms/Room';
import rooms from './rooms/rooms_linked.json';
import roomTypes from './rooms/room_types_5.json';
import Grid from "@mui/material/Grid";
import RoomsToolbar from './rooms/RoomsToolbar';
import Divider from "@mui/material/Divider";
import { STATUS, ROOM_TYPE } from '../constants/room';


const roomsByType = (type) => {
    return rooms.filter((i) => i.type === type)
}

const roomsByStatus = (status) => {
    return rooms.filter((i) => i.status === status)
}


export default function Rooms() {
    const [mode, setMode] = useState("number"); // number | floor | type | status
    const [size, setSize] = useState("m");      // s | m | l

    const renderRooms = useCallback(
    (rooms) =>
    rooms.map((room) => (
      <Grid key={room.id}>
        <Room
          num={room.id}
          status={room.status}
          floor={room.floor}
          type={room.type}
          size={size}
        />
      </Grid>
    )),
    [size] 
    );


    return (
        <>
        <RoomsToolbar
        mode={mode}
        onModeChange={setMode}
        size={size}
        onSizeChange={setSize}
        />

        
        {mode==="number" && (
            <>
        <Divider textAlign="center" sx={{ mb: 4 }}>
        Все номера
        </Divider>
        <Grid container spacing={1}>
            {rooms.map((room) => (
            <Grid key={room.id}>
            <Room 
                key={room.id}
                num={room.id}
                status={room.status}
                floor={room.floor}
                type={room.type}
                size={size}
            />
            </Grid>
            ) )}
        </Grid></>
        )}
            

        {mode==="type" &&
            roomTypes.items.map((val) => (
                <div key = {val.id}>
                <Divider textAlign="center" sx={{ mb: 4, mt: 4 }}>
                    {val.name}
                </Divider>
                <Grid container spacing={1}>
                {renderRooms(roomsByType(val.id))}
                </Grid>
                </div>
            ))
        }

        {mode==="status" &&
            Object.keys(STATUS).map((val) => (
                <div key={val}>
                <Divider textAlign="center" sx={{ mb: 4, mt: 4 }}>
                    {val}
                </Divider>
                <Grid container spacing={1}>
                {renderRooms(roomsByStatus(val))}
                </Grid>
                </div>
            ))
        } 

        </>
    )
}