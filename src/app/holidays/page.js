import { sanity } from "@/lib/sanity";
import styles from "./page.module.css";
import Link from "next/link";
// import holidayIndex from "@/mockData/holidays/holidayIndex";

export const metadata = {
  title: "Holidays-Where Next Manny?",
  description:
    "Previously visited destinations, travel articles, and photo stories.",
};

export default async function Holidays() {
  const holidayIndex = await sanity.fetch(`
      *[_type == "holiday"] {
        _id,
        "slug" : slug.current,
        title,
        location,
        date,
        "img" : photos[0].asset -> url
      }
    `);

  return (
    <main className={styles.holidaysPage}>
      {/* Page heading */}
      <header className={styles.header}>
        <h2 className={styles.title}>Holiday Hopping</h2>
        <p className={styles.subtitle}>
          A growing collection of places visited, memories gathered, and stories
          written along the way.
        </p>
      </header>

      {/* Photo grid */}
      <div className={styles.photosGrid}>
        <ul className={styles.grid}>
          {holidayIndex.map((trip) => (
            <li className={styles.gridItem} key={trip._id}>
              <Link
                href={`/holidays/${trip.slug}`}
                className={styles.polaroid}
                aria-label={`Read travel story about ${trip.location}`}
              >
                <figure>
                  <img
                    className={styles.photo}
                    src={trip.img}
                    alt={`A view from ${trip.location}`}
                    aria-label={trip.location}
                  />
                  <figcaption className={styles.polaroidDate}>
                    {trip.date}
                  </figcaption>
                </figure>

                <span className={styles.polaroidLocation}>{trip.location}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
