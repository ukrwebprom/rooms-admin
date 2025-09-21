import './App.css'
import { useAuth } from "./context/AuthContext";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Init from './components/Init';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from './components/AuthForms'
import Blank from './layouts/Blank';
import AppShell from './layouts/AppShell';
import ProtectedRoute from "./components/ProtectedRoute";
import PropertiesList from './components/PropertiesList';

function App() {

  const { isAuthenticated } = useAuth();
  
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Blank/>}>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/properties" replace /> : <AuthForm />}
          />
        </Route>
        
        <Route element={<ProtectedRoute><AppShell/></ProtectedRoute>}>
          <Route path="/properties" element={<PropertiesList/>} />
        </Route>

        <Route path="/" 
        element={isAuthenticated ? <Navigate to="/properties" replace /> : <Navigate to="/login" replace />} />
        <Route path="*" 
        element={isAuthenticated ? <Navigate to="/properties" replace /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>  
  )
}

export default App
