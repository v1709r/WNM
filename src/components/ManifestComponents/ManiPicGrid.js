"use client";

export default function ManifestPhotoGrid({ photos, onPhotoClick }) {
  return (
    <section aria-label="Photo grid">
      <ul>
        {photos.map((photo) => (
          <li key={photo._key}>
            <figure>
              <button
                onClick={() => onPhotoClick(photo)}
                aria-label={`View photo ${photo.caption || ""}`}
              >
                <img src={photo.url} alt={photo.alt || ""} />
              </button>
              {photo.caption && <figcaption>{photo.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
