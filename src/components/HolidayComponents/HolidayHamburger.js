"use client";

import { useEffect, useState, useRef } from "react";

export default function Hamburger({ view, setView, menuOpen, setMenuOpen }) {
  const navRef = useRef(null);

  // Close on escape
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, setMenuOpen]);

  // move focus into menu when opened
  useEffect(() => {
    if (menuOpen) navRef.current?.focus();
  }, [menuOpen]);

  // const [view, setView] = useState("article");
  return (
    <>
      {/* Hamburger button */}
      <button
        className="hamburgerBtn"
        aria-label="Nagivation for photos, article and reference links"
        aria-expanded={menuOpen}
        aria-controls="holiday-menu"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      {/* Expanded Menu */}
      {menuOpen && (
        <nav
          className="hhNav"
          id="holidayHopping-menu"
          ref={navRef}
          tabIndex={-1}
          aria-label="Holiday hopping's content navigation"
        >
          <button
            aria-current={view === "article" ? "true" : undefined}
            onClick={() => {
              setView("article");
              setMenuOpen(false);
            }}
          >
            Travel Article
          </button>
          <button
            onClick={() => {
              setView("references");
              setMenuOpen(false);
            }}
            aria-current={view === "references" ? "true" : undefined}
          >
            Reference links
          </button>
          <button
            onClick={() => {
              setView("photos");
              setMenuOpen(false);
            }}
            aria-current={view === "photos" ? "true" : undefined}
          >
            Photo grid
          </button>
        </nav>
      )}
    </>

    // <section aria-live="polite">
    //   {/* Article */}
    //   {view === "article" && (
    //     <div aria-label="Travel article and reference links">
    //       <article>
    //         {/* <h2>Travel article</h2> */}
    //         {article.map((block) => (
    //           <p key={block.id}>{block.text}</p>
    //         ))}
    //       </article>
    //       {/* Reference links */}
    //       <h2>Reference links</h2>
    //       <ol>
    //         {referenceLinks.map((link) => (
    //           <li key={link.id}>
    //             <a
    //               // className="referenceLinks"
    //               href={link.url}
    //               target="_blank"
    //               rel="noopener noreferrer"
    //             >
    //               {link.label}
    //             </a>
    //           </li>
    //         ))}
    //       </ol>
    //     </div>
    //   )}

    //   {view === "references" && (
    //     <section>
    //       <h2>Reference links</h2>
    //       <ol>
    //         {referenceLinks.map((link) => (
    //           <li key={link.id}>
    //             <a href={link.url} target="_blank" rel="noopener noreferrer">
    //               {link.label}
    //             </a>
    //           </li>
    //         ))}
    //       </ol>
    //       <article>
    //         <h2>Travel article</h2>
    //         {article.map((block) => (
    //           <p key={block.id}>{block.text}</p>
    //         ))}
    //       </article>
    //     </section>
    //   )}
    //   {view === "photos" && (
    //     <section>
    //       <figure>
    //         <img src={photos[0].src} alt={photos[0].alt} />
    //         <figcaption>{photos[0].caption}</figcaption>
    //       </figure>
    //     </section>
    //   )}
    // </section>
  );
}
