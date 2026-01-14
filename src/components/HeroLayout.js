import "../styles/hero.css";
import Carousel from "./ImageCarousel";
import { sanity } from "@/lib/sanity";

export default async function HeroLayout() {
  const data = await sanity.fetch(`
      *[_type == "homepage"][0] {
        _id,
        slides[] {
          _key,
          "url":asset->url,
          title,
          description
        }
      }
    `);

  return (
    <main className="hero">
      <Carousel data={data} />
    </main>
  );
}
