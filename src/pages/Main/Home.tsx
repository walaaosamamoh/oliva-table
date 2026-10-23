import FeaturedDishes from "../../components/home/FeaturedDishes";
import Hero from "../../components/home/Hero";
import OurStory from "../../components/home/OurStory";
import VisitInfo from "../../components/home/VisitInfo";

export default function Home() {
  return (
    <div>
      <Hero/>
      <OurStory/>
      <FeaturedDishes/>
      <VisitInfo/>
    </div>
  )
}
