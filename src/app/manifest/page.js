// import manifestations from "@/mockData/manifestation/manifestations";
import { sanity } from "@/lib/sanity";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Manny's Manifestations",
  description: "Manny's manifestations description",
};

// Why after adding sanity we must turn this into a async function?
export default async function Manifest() {
  const manifestations = await sanity.fetch(`
      *[_type == "manifestation"] {
        _id,
        title,
        location,
        description,
        "slug" : slug.current,
        "img" : photos[0].asset -> url
      }
    `);

  console.log("Here- ", manifestations.slug);

  return (
    <main className={styles.maniPage}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Manny's manifestations</h1>
        <p className={styles.subtitle}>
          A growing collection of places visited, memories gathered, and stories
          written along the way.
        </p>
      </header>

      {/* Listings */}
      <div className={styles.listBody}>
        <ul className={styles.mainList}>
          {manifestations.map((loc) => (
            <li
              // data-align={index % 2 === 0 ? "left" : "right"}
              // // Explain, after adding CSS.
              className={styles.listItem}
              key={loc._id}
            >
              {console.log(loc.slug)}
              <Link
                href={`/manifest/${loc.slug}`}
                className={styles.maniBody}
                aria-label={`Manny's manifestation to visit ${loc.location}`}
              >
                <figure>
                  <img
                    className={styles.maniImg}
                    src={loc.img}
                    alt={`Know about ${loc.location}`}
                    aria-label={loc.location}
                  />
                  <figcaption className={styles.maniDeets}>
                    <h3 className={styles.maniLocTitle}>{loc.title}</h3>
                    <h4 className={styles.maniLocName}>{loc.location}</h4>
                    <p className={styles.maniLocDesc}>{loc.description}</p>
                  </figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
