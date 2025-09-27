import { useEffect, useState } from "react";
import client from "../api/client";
import "./PropertiesList.css";
import { useProperty } from "../context/PropertyContext";

export default function PropertiesList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const {currentPropertyId, setCurrentPropertyId, getPropertyName} = useProperty();


    // useEffect(() => {
    //     const controller = new AbortController();

    // (async () => {
    // try {
    //   const res = await client.get("/properties", { signal: controller.signal });
    //   setItems(res.data);
    // } catch (e) {
    //   if (e.name === "CanceledError" || e.name === "AbortError") {
    //     console.log("Запрос отменён");
    //   } else {
    //     setErr("Не удалось загрузить отели");
    //   }
    // } finally {
    //   setLoading(false);
    // }
    // })();

    // return () => {
    //     controller.abort();
    // };
    // }, []);


    return (
        <>
        {/* {currentPropertyId != null && (<p>{getPropertyName(currentPropertyId)}</p>)} */}
        </>
    )

}