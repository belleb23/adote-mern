import React from 'react'
import { Fragment } from 'react';
import HeroImage from '../../assets/images/home/hero-img.png';
import CourseCard from './CourseCard';


function CourseSlider() {
    const allCourses = [
        {
            id: 1,
            category: 'gatsby',
            image: HeroImage,
            title: 'Revolutionize how you build the web',
            date_added: 'Added on 7 July, 2020',
            instructor_name: 'Jenny Wilson',
            instructor_image: HeroImage,
            status: 'Pending',
            level: 'Intermediate',
            duration: '1h 46m',
            price: 850,
            discount: 50,
            rating: 2.0,
            ratingby: 16500,
            recommended: false,
            popular: false,
            trending: true,
            progress: 45
        },
        {
            id: 2,
            category: 'graphql',
            image: HeroImage,
            title: 'GraphQL: introduction to graphQL for beginners',
            date_added: 'Added on 6 July, 2021',
            instructor_name: 'Brooklyn Simmons',
            instructor_image: HeroImage,
            status: 'Pending',
            level: 'Advance',
            duration: '2h 40m',
            price: 600,
            discount: 100,
            rating: 2.5,
            ratingby: 1500,
            recommended: true,
            popular: false,
            trending: false,
            progress: 95
        },
	];


  return (
    <Fragment>
        <div className="pb-sm-5 mb-5 slick-slider-wrapper">
        {allCourses.map((item, index) => (
            <div className="item px-md-1" key={item.id}>
            <CourseCard key={index} item={item} extraclass="mx-2" />
            </div>
        ))}
        </div>
    </Fragment>
  )
}

export default CourseSlider