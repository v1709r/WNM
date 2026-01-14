import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navBar" aria-label="Primary navigation">
      <Link href="/about">About</Link>
      <Link href="/holidays">Holiday Hopping</Link>
      <Link href="/manifest">Manny's Manifestations</Link>
    </nav>
  );
}
