"use client";

import { useState, useEffect } from "react";

export default function Carousel({ data }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!data?.slides?.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.slides.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [data]);

  if (!data?.slides?.length) return null;

  const currentPlace = data.slides[index];

  return (
    <>
      <section className="right">
        <div
          className="placeImg fade"
          style={{ backgroundImage: `url(${currentPlace.url})` }}
          role="img"
          aria-label={currentPlace.title}
        />
        <span className="sr-only">Image showing {currentPlace.title}</span>
      </section>

      <div aria-live="polite" aria-atomic="true">
        <div className="placeBar">{currentPlace.title}</div>
        <p className="description fade">{currentPlace.description}</p>
      </div>
    </>
  );
}
