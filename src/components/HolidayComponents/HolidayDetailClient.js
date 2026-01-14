"use client";

import { useState, useRef, useEffect } from "react";

import Hamburger from "./HolidayHamburger";
import StickyPhotoGrid from "./StickyPhotoGrid";

import "../../styles/Holiday/holidayDetailClient.css";

export default function HolidayDetailClient({
  article,
  referenceLinks,
  photos,
}) {
  const isFirstRender = useRef(true);
  const [view, setView] = useState("article");
  //view is what the user is currently looking at
  // useState- storing UI state
  const [activePhoto, setActivePhoto] = useState(null);
  //selected item state (here it's an image)
  const contentRef = useRef(null);
  // remembering a DOM element
  // So why not use useState? For no re-renders, just want to access the element (Which here becomes the Left Section, see 'ref' attribute of the Left <Section>)

  // Move focus (of keyboard and screen) when the an item is selected from the HamburgerMenu (Accessibility)
  // Why this matters (accessibility)
  // Without this:
  // Screen reader users stay focused on the button
  // They don’t know content changed
  // Keyboard users must tab manually
  // With this:
  // Focus moves automatically
  // Screen reader announces new content
  // Keyboard flow feels natural
  // This is focus management.
  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }
  //   contentRef.current?.focus();
  // }, [view, activePhoto]);
  // Works for both views and activePhotos

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Hamburger
        view={view}
        setView={(v) => {
          setView(v);

          if (v === "photos") {
            setActivePhoto(photos[0]);
          } else setActivePhoto(null);
        }}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      {/* Applies 'shared control'
        What’s happening here
          You are passing control downward.
          Hamburger:
          Does NOT own state
          Only requests changes
          HolidayDetailClient:
          Owns the state
          Decides what happens
          This is called lifting state up.  
          How clicking a menu works (step-by-step)
            User clicks “Reference links”
            Hamburger runs:
            setView("references")
            That function actually lives in HolidayDetailClient
            State updates
            React re-renders
            view === "references" becomes true
            New content appears
            Hamburger controls without owning.
            That’s shared control.    
      */}

      <div className="holidaylayout">
        <div className="leftSection">
          {/* Left pannel */}
          <section
            className="articleSection"
            ref={contentRef}
            tabIndex={-1}
            aria-live="polite"
          >
            {/* aria-live="polite" — announcing changes */}
            {view === "article" && (
              <div aria-label="Travel deets and reference links">
                <article>
                  {/* <h2>Travel article</h2> */}
                  {article.map((block, i) => (
                    <p key={i}>{block}</p>
                  ))}
                </article>
                {/* Reference links */}
                <section className="refSection">
                  <h2>Reference links</h2>
                  <ol>
                    {referenceLinks.map((link, i) => (
                      <li key={i}>
                        <a
                          className="referenceLinks"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            )}

            {view === "references" && (
              <section>
                <h2>Reference links</h2>
                <ol>
                  {referenceLinks.map((link, i) => (
                    <li key={i}>
                      <a
                        className="referenceLinks"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ol>
                <article>
                  {article.map((block, i) => (
                    <p key={i}>{block.text}</p>
                  ))}
                </article>
              </section>
            )}

            {view === "photos" && activePhoto && (
              <figure>
                <img
                  className="activeImage"
                  src={activePhoto.url}
                  alt={activePhoto.alt}
                />
                <figcaption>{`This is,${activePhoto.alt}`}</figcaption>
              </figure>
            )}
          </section>
        </div>

        <div className="rightSection">
          {/* Right pannel */}
          <StickyPhotoGrid
            photos={photos}
            onPhotoClick={(photo) => {
              setActivePhoto(photo);
              setView("photos");
            }}
          />
        </div>
      </div>
    </>
    // Conditional rendering — controlled UI transitions
    // {view === "article" && (...)}
    // {view === "references" && (...)}
    // {view === "photos" && activePhoto && (...)}
    // What this means
    // “Only show what matches the current view.”
    // This avoids:
    // Hidden elements
    // CSS hacks
    // Unnecessary DOM
    // React simply does not render unused sections.
    // This is controlled UI transition.
  );
}

// Explain what are these and how I learned:- (from the above)
// Lifting state up
// Shared control
// Focus management
// ARIA live regions
// Controlled UI transitions
// How does view logic come from the Hamburger to the HolidayDetailClient? When clicked on a menu.

// Logic and explanation of the following structure
// page.js (server)
//    ↓
// HolidayDetailClient (state + logic)
//    ↓
// Hamburger (navigation only)
//    ↓
// StickyPhotoGrid (selection only)
// Explained:
// page.js
// Loads data
// No interactivity
// Server-rendered
// HolidayDetailClient
// Owns all UI state
// Coordinates components
// Accessibility logic lives here
// Hamburger
// Stateless
// Just buttons
// Triggers changes
// StickyPhotoGrid
// Stateless
// Just thumbnails
// Triggers selection
// This is unidirectional data flow.
