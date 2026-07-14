import BannerSection from '@/components/Banner';
import React from 'react';
import FeaturedPets from '../components/FeaturedPets';
import WhyAdopt from '@/components/WhyAdopt';
import SuccessStoriesPage from '@/components/SuccessStories';

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <BannerSection/>
      <FeaturedPets/>
      <WhyAdopt/>
      <SuccessStoriesPage/>
    </div>
  );
};

export default HomePage;