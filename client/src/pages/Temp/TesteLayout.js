
import React from 'react';
import { Fragment } from 'react';
import HeaderHome from '../../components/home/HeaderHome';
import FeaturesList from '../../components/home/FeaturesList';
import CourseSlider from '../../components/home/CourseSlider';
import PetCard from '../../components/home/PetCard';
import NavbarTop from '../../components/home/NavbarTop';
import Sidebar from '../../components/home/Sidebar';


function TesteLayout() {
  return (
    <Fragment>
        {/* <NavbarTop/> */}
        <Sidebar/>
        {/* <HeaderHome/>
        <FeaturesList/>
        <CourseSlider/>
        <PetCard/> */}
    </Fragment>
   
  )
}

export default TesteLayout