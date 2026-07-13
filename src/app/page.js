import BannerSection from '@/components/Banner';
import React from 'react';
import FeaturedPets from '../components/FeaturedPets';

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <BannerSection/>
      <FeaturedPets/>
    </div>
  );
};

export default HomePage;