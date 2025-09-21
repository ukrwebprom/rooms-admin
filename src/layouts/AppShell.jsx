import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AppShell() {
  return (
    <div className="main">
      <Navbar />
      <div className="mainarea"><Outlet /></div>
      <Footer />
    </div>
  );
}