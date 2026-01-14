"use client";

// import { useState, useRef, useEffect } from "react";
import { useRef, useState } from "react";
import ManiMenu from "./ManiMenu";
import ManiPicGrid from "./ManiPicGrid";

export default function ManifestDetailClient({ manifest }) {
  // For active photo
  const [activePhoto, setActivePhoto] = useState(null);
  // Section anchors:
  const introRef = useRef(null);
  const attractionsRef = useRef(null);
  const refsRef = useRef(null);

  function scrollTo(ref) {
    ref.current?.scrollIntoView({ behaviour: "smooth" });
    ref.current?.focus({ preventScroll: true });
  }

  function openPhotos() {
    if (manifest.photos?.length) {
      setActivePhoto(manifest.photos[0]);
    } else {
      return <h2>No photos found</h2>;
    }
  }

  return (
    <div className="manifestLayout">
      {/* Left - PicsGrid */}
      <aside>
        <ManiMenu
          onIntro={() => setActivePhoto(null) && scrollTo(introRef)}
          onAttractions={() => setActivePhoto(null) && scrollTo(attractionsRef)}
          onRefs={() => setActivePhoto(null) && scrollTo(refsRef)}
          onPhotos={() => {
            openPhotos;
          }}
        />

        <ManiPicGrid
          photos={manifest.photos}
          onPhotoClick={(photo) => {
            setActivePhoto(photo);
          }}
        />
      </aside>

      {/* Right - Content */}
      {activePhoto ? (
        <figure
          tabIndex={-1} // What is tabIndex?
          aria-live="polite"
          className="photoFocus"
        >
          <button
            onClick={() => setActivePhoto(null)}
            aria-label="Close image view"
          >
            Close
          </button>
          <img src={activePhoto.url} alt={activePhoto.alt || ""} />
          {activePhoto.caption && (
            <figcaption>{activePhoto.caption}</figcaption>
          )}
        </figure>
      ) : (
        <article>
          <section ref={introRef} tabIndex="-1" aria-live="polite">
            <h3>Introduction</h3>
            {manifest.intro.map((text) => (
              <p key={text._key}>{text.text}</p>
            ))}
          </section>

          <section ref={attractionsRef} tabIndex={-1}>
            <h3>Suggested Attractions</h3>
            {manifest.attractions.map((text) => (
              <p key={text._key}>{text.text}</p>
            ))}
          </section>

          <section ref={refsRef} tabIndex={-1}>
            <h3>Refrences</h3>
            <ul>
              {manifest.referenceLinks.map((li) => (
                <li key={li._key}>
                  <a href={li.url}>{li.label}</a>
                </li>
              ))}
            </ul>
          </section>
        </article>
      )}

      {/* How will the picture enlarge on click */}
      {/* {view === "photo" && activePhoto && (
        <figure>
          <img src={activePhoto.src} alt={activePhoto.alt} />
          <figcaption>{activePhoto.caption}</figcaption>
        </figure>
      )} */}
    </div>
  );
}
// How does ManifestDetailClient know which view has the user choosen from?
