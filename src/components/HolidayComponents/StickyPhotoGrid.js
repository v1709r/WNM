export default function StickyPhotoGrid({ photos = [], onPhotoClick }) {
  console.log("StickyPhotoGrid photos: ", photos);

  return (
    <aside className="photo-grid" aria-label="Photo grid">
      <ul>
        {photos.map((photo) => (
          <li key={photo._key}>
            <button
              type="button"
              onClick={() => onPhotoClick(photo)}
              aria-label={`View photo: ${photo.caption}`}
            >
              <img src={photo.url} alt={photo.alt} />
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
