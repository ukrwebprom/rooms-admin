import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, authReady } = useAuth();
    
    if (!authReady) {
    return <div>Loading</div>; // или сплэш/прелоадер, пока проверяем токен
    // return <div style={{padding:16}}>Загрузка...</div>;
    }
    return isAuthenticated ? children : <Navigate to="/login" replace />;

  return children;
}
