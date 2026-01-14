"use client";

export default function ManiNaviMenu({
  onIntro,
  onAttractions,
  onRefs,
  onPhotos,
}) {
  return (
    <nav aria-label="Manifestation content navigation">
      <h2>Content</h2>

      <button onClick={onIntro}>Introduction</button>

      <button onClick={onAttractions}>Suggested Attractions</button>

      <button onClick={onRefs}>Reference Links</button>

      <button onClick={onPhotos}>Photos</button>
    </nav>
  );
}
