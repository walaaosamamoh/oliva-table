import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}
