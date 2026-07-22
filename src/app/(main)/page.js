import BannerSection from '@/components/home/Banner';
import React from 'react';
import FeaturedPets from '../../components/home/FeaturedPets';
import WhyAdopt from '@/components/home/WhyAdopt';
import SuccessStories from '@/components/home/SuccessStories';
import PetCare from '@/components/home/PetCare';
import HelpsAnimals from '@/components/home/HelpsAnimals';

import FamilyAdoption from '@/components/home/FamilyAdoption';

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