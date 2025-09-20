import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from './components/AuthForms'

import ProtectedRoute from "./components/ProtectedRoute";
import PropertiesList from './components/PropertiesList';

function App() {

  return (
    <BrowserRouter>
    <div className='main'>
      <Navbar />
      <div className="mainarea">
        <Routes>
        <Route path="/login" element={<AuthForm />} />

        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <PropertiesList />
            </ProtectedRoute>
          }
        />

        </Routes>
      </div>
      <Footer />
    </div>
    </BrowserRouter>  
  )
}

export default App
