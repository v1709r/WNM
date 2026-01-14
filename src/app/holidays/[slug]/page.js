import { sanity } from "@/lib/sanity";
import styles from "./page.module.css";
import HolidayDetailClient from "@/components/HolidayComponents/HolidayDetailClient";

export const metadata = {
  title: "Where Next Manny?",
  description: `Manny's adventures and photo journal!`,
};

// Why async and {params}?
export default async function HolidayDetailsPage({ params }) {
  const { slug } = await params;
  console.log("Location: ", slug);

  const holiday = await sanity.fetch(
    `
      *[_type == "holiday" && slug.current == $slug][0] {
        _id,
        "slug" : slug.current,
        title,
        location,
        article[],
        photos[] {
          _key,
          "url":asset-> url,
          caption,
          alt
        },
        referenceLinks[]
      }
    `,
    { slug }
  );

  if (!holiday) {
    return <h1>Holiday not found</h1>;
  }

  return (
    <main className={styles.slugPage}>
      {/* Page Heading */}
      <header>
        <h1 className={styles.heading}>{holiday.title}</h1>
        <p className={styles.subheading}>{holiday.location}</p>
      </header>

      {/* Main section */}
      <HolidayDetailClient
        article={holiday.article}
        referenceLinks={holiday.referenceLinks}
        photos={holiday.photos}
      />
    </main>
  );
}

{
  /* Left Section Content(Article, enlarged photos and reference links) */
}
{
  /* <div className={styles.leftSection}>
        <article>
          {kyotoJapan.article.map((block) => (
            <p key={block.id}>{block.text}</p>
          ))}
          <section>
            <h2>Reference links</h2>
            <ol>
              {kyotoJapan.referenceLinks.map((link) => (
                <li key={link.id}>
                  <a
                    className={styles.referenceLinks}
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
        </article>
      </div> */
}

{
  /* Right Section (Photo grid)
        <aside>
          <h2 className="sr-only">Photo grid</h2>
          <ul className={styles.photoGrid}>
            {kyotoJapan.photos.map((photo) => (
              <li key={photo.id}>
                <img src={photo.src} alt={photo.alt} />
              </li>
            ))}
          </ul>
        </aside> */
}
