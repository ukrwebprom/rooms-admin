import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const Ctx = createContext(null);

export function PropertyProvider({ children }) {
  const { session } = useAuth();
  const [currentPropertyId, setCurrentPropertyId] = useState(null);
  const getPropertyName = (id) => {
    if (!session) { return; }
    return session.properties.find((el) => el.property_id === id);
  }

  useEffect(() => {
    if (!session) { setCurrentPropertyId(null); return; }
    setCurrentPropertyId(session.properties[0].property_id);
  }, [session]);

  const value = useMemo(() => ({ currentPropertyId, setCurrentPropertyId, getPropertyName }), [currentPropertyId]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useProperty = () => useContext(Ctx);