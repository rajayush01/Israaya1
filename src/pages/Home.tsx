import Hero from '@/components/hero/Hero'
import BrandIntro from '@/components/editorial/BrandIntro'
import FeaturedCollection from '@/components/editorial/FeaturedCollection'
// import ProductGrid from '@/components/products/ProductGrid'
import CraftSection from '@/components/editorial/CraftSection'
// import ParallaxSection from '@/components/editorial/ParallaxSection'
import StorySection from '@/components/editorial/StorySection'
//import InstagramGrid from '@/components/editorial/InstagramGrid'
import CampaignVideo from '@/components/editorial/CampaignVideo'
import PhilosophySection from '@/components/editorial/PhilosophySection'
import Marquee from '@/components/ui/Marquee'
import ReelsSection from '@/components/editorial/ReelsSection'

import {CloserLook,Promises} from '../components/Sections'
import StorefrontBanners from '@/components/editorial/StorefrontBanners'

export default function Home() {
  return (
    <>
      <Hero />
<<<<<<< Updated upstream
      <Marquee text="Made in India, made for the world · A new chapter · A new world · Made in India, made for the world · A new chapter · A new world · Made in India, made for the world · A new chapter · A new world · Made in India, made for the world · A new chapter · A new world · Made in India, made for the world · A new chapter · A new world ·" />
=======
      <StorefrontBanners />
      <Marquee text="Made in India, made for the world · A new chapter. · A new world. · Made in India, made for the world · A new chapter. · A new world. · Made in India, made for the world · A new chapter. · A new world. · Made in India, made for the world · A new chapter. · A new world. ·" />
>>>>>>> Stashed changes
      <BrandIntro />
      <FeaturedCollection />
      {/* <ProductGrid /> */}
      <CraftSection />
      {/* <ParallaxSection /> */}
      <StorySection />
      {/* <InstagramGrid /> */}
      <CampaignVideo />
   
      <PhilosophySection />
         <ReelsSection />
      <Promises/>
      <CloserLook />
    </>
  )
}
