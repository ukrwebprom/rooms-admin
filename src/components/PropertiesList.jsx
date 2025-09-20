import { useEffect, useState } from "react";
import client from "../api/client";
import "./PropertiesList.css";

export default function PropertiesList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");


    useEffect(() => {
        const controller = new AbortController();

    (async () => {
    try {
      const res = await client.get("/properties", { signal: controller.signal });
      setItems(res.data);
    } catch (e) {
      if (e.name === "CanceledError" || e.name === "AbortError") {
        console.log("Запрос отменён");
      } else {
        setErr("Не удалось загрузить отели");
      }
    } finally {
      setLoading(false);
    }
    })();

    return () => {
        controller.abort();
    };
    }, []);


    return (
        <>
        <ul>
            {items.map((hotel) => (
            <li key={hotel.id}>
                <strong>{hotel.name}</strong>
            </li>
            ))}
            <li key={'nemo'}>
                <p>NEMO Resort & SPA</p>
            </li>
            <li key={'add'}>
                <p>add</p>
            </li>
        </ul>
        </>
    )

}