import BannerSection from '@/components/Banner';
import React from 'react';
import FeaturedPets from '../components/FeaturedPets';
import WhyAdopt from '@/components/WhyAdopt';

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <BannerSection/>
      <FeaturedPets/>
      <WhyAdopt/>
    </div>
  );
};

export default HomePage;