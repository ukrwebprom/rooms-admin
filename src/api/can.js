import { useAuth } from "../context/AuthContext";

export function useCan() {
    const { session } = useAuth();
  
    const can = (ability) => {
      if (!session?.abilities) return false;
      return session.abilities.includes(ability);
    };
  
    return { can };
  }