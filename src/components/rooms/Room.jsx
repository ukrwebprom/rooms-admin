import "./Room.css";
import { STATUS, ROOM_TYPE } from '../../constants/constants';

function Room({status, num, size}) {

    const roomClass = `room ${STATUS[status]} ${size}`;
    return (
        <div className={roomClass}>
            <p>{num}</p>
        </div>
    );
}

export default Room;