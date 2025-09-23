import { useAuth } from "../context/AuthContext";

export function useCan() {
    const { abilities } = useAuth();
  
    const can = (ability) => {
      if (!abilities) return false;
      return abilities.includes(ability);
    };
  
    return { can };
  }