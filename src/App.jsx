import { useAuth } from "./context/AuthContext";
import {useCan }from './api/can';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from './components/AuthForms'
import Blank from './layouts/Blank';
import AppShell from './layouts/AppShell';
import ProtectedRoute from "./components/ProtectedRoute";
import PropertyForm from './components/property/PropertyForm';
import Properties from "./components/property/Properties";
import Rooms from './components/Rooms';
import Reservations from './components/Reservations';
import Clients from "./components/Clients";
import Dashboard from "./components/Dashboard";
import Users from "./components/users/Users";

function App() {

  const { isAuthenticated } = useAuth();
  const { can } = useCan();
  
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Blank/>}>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthForm />}
          />
        </Route>
        
        <Route element={<ProtectedRoute><AppShell/></ProtectedRoute>}>
          <Route path='/dashboard' element={<Dashboard />} />
          {can('hotel_watch') && (
            <Route path="/properties" element={<Properties/>} />
          )}
          <Route path="/rooms" element={<Rooms/>} />
          <Route path="/bookings" element={<Reservations />} />
          <Route path="/bookings/new" element={<Reservations mode="create" />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/users" element={<Users />} />
        </Route>

        <Route path="/" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
        <Route path="*" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>  
  )
}

export default App
