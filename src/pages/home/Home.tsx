import React from 'react'
import Carousel from '../carousel/Carousel'
import AboutUs from '../about/AboutUs';
import Contact from '../contact/Contact';
import HomeRegistration from '../registration/HomeRegistration';
import Footer from '../../components/footer/Footer';

const Home: React.FC = () => {

    const images = [
        { src: "/img/carousel-1.jpg", alt: "Image 1" },
        { src: "/img/carousel-2.jpg", alt: "Image 2" },
      
      ];
  return (
   <>

   <Carousel  images={images }/>
   <AboutUs/>
   <HomeRegistration/>
   <Contact/>
   <Footer/>
   
   </>
  )
}

export default Home