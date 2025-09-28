import ReservationToolbar from "./ReservationToolbar";
import ReservationList from "./ReservationsList";
import ReservationForm from "./ReservationForm";

export default function Reservations({mode = "show"}) { 
    const views = {
        show: <ReservationList />,
        create: <ReservationForm />
    }
    return (
        <>
        <ReservationToolbar mode={mode}/>
        {views[mode]}
        </>
    )
}