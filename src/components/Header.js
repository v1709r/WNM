import Link from "next/link.js";
import Navbar from "./Navbar.js";
import "../styles/header.css";

export default function Header() {
  return (
    <header className="header">
      <Link href={"/"} className="logo">
        <h1>Where next manny?</h1>
      </Link>
      <Navbar />
    </header>
  );
}
