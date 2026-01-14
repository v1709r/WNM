import styles from "./page.module.css";
import ManifestDetailClient from "@/components/ManifestComponents/ManiDetailClient";
import { sanity } from "@/lib/sanity";
// params = parameters. Is this like a Java function and a parameter (params) is being passed into the function? If yes, then what is being passed here, cause then link only had a href with the url of manifest/${slug}? If not then why 'await params'
export default async function ManifestDetailsPage({ params }) {
  const { slug } = await params;
  console.log("Deets of place:", slug);

  // Why the [0] at the end of first line of the fetch '*[_type == "manifestations" && slug.current == $slug][0]'
  // If calling arrays, we call the whole in intro[] but in attractions it is with {label, url} (Same for photos)
  // Why the {slug} at the end of the fetch?
  const manifest = await sanity.fetch(
    `*[_type == "manifestation" && slug.current == $slug][0] {
      _id,
      title,
      location,
      description,
      "slug" : slug.current,
      intro[],
      attractions[],
      referenceLinks[]{_key,label,url},
      photos[]{
        _key,
        "url": asset->url,
        caption,
        alt
        }
      }`,
    { slug }
  );

  if (!manifest) {
    return <h1>Page not found</h1>;
  }

  return (
    <main className={styles.maniDeetsPage}>
      <header>
        <h1 className={styles.heading}>{manifest.title}</h1>
        <p className={styles.subtitle}>{manifest.location}</p>
      </header>

      {/* Main Section */}
      <ManifestDetailClient manifest={manifest} />
    </main>
  );
}
