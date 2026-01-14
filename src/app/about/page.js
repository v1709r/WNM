import styles from "./page.module.css";
import { sanity } from "@/lib/sanity";
import SocialIcons from "@/components/icons";

export const metadata = {
  title: "About | Where Next Manny",
  description:
    "About Manny and the stories behind the travel journal Where Next Manny?",
};

export default async function About() {
  const aboutData = await sanity.fetch(`
      *[_type == "about"][0] {
        _id,
        title,
        content[],
        "image": image.asset->url,
      }
    `);

  console.log(aboutData.image);

  return (
    <main className={styles.aboutPage}>
      <section className={styles.aboutLeft}>
        <h2 className={styles.aboutHeading}>{aboutData.title}</h2>
        <article>
          {aboutData.content.map((para, index) => (
            <p className={styles.aboutMain} key={index}>
              {para}
            </p>
          ))}
          {/* <p className={styles.aboutMain}>
            Hello there! Welcome. I'm Manny, the face behind this travel journal
            blog. As the name suggests, this space is a collection of my travel
            dreams, bucket lists, and memorable adventures I've been fortunate
            enough to check off.
          </p>
          <p className={styles.aboutMain}>
            A creative professional with a passion for curating scrupulous
            itineraries-a love I inherit from my father, who, to this day, dives
            into detailed trip research months in advance. Watching him
            meticulously plan every possible move before a journey has instilled
            in me a profound appreciation for the art of travel-uncovering
            hidden gems, seeking out secret native spots, and crafting immersive
            experiences that go beyond a typical itinerary.
          </p>
          <p className={styles.aboutMain}>
            Every trip I plan is a thoughtful blend of iconic landmarks and
            offbeat, whimsical experiences, often woven around a subtle theme
            inspired by the destination. From exploring natural landscapes to
            wandering through old market squares while indulging in food trails,
            each journey reflects my interests and personal travel style.
          </p>
          <p className={styles.aboutMain}>
            Thank you for stopping by! I hope you feel inspired to add some of
            these attractions to your travel list, just as much as I enjoyed
            discovering and learning about them while curating these blog
            articles. Let's explore the world, one journey at a time!
          </p> */}
        </article>
        <div className={styles.socialIcons}>
          {/* <TwitterEmbed /> */}
          <SocialIcons />
        </div>
      </section>

      <section className={styles.aboutRight}>
        <img
          src={aboutData.image}
          className={styles.proPic}
          alt="Manny's photo"
        />
      </section>
    </main>
  );
}
