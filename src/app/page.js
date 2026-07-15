import BannerSection from '@/components/Banner';
import React from 'react';
import FeaturedPets from '../components/FeaturedPets';
import WhyAdopt from '@/components/WhyAdopt';
import SuccessStories from '@/components/SuccessStories';
import PetCare from '@/components/PetCare';
import HelpsAnimals from '@/components/HelpsAnimals';

import FamilyAdoption from '@/components/FamilyAdoption';

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <BannerSection/>
      <FeaturedPets/>
      <WhyAdopt/>
      <SuccessStories/>
      <PetCare/>
      <HelpsAnimals/>
      <FamilyAdoption/>
    </div>
  );
};

export default HomePage;