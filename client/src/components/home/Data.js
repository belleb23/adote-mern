// import media files

// import avatar media files
import Avatar1 from 'assets/images/avatar/avatar-1.jpg';
import Avatar2 from 'assets/images/avatar/avatar-2.jpg';

// import courses media files

import GatsbyCourse from 'assets/images/course/course-gatsby.jpg';
import GraphQLCourse from 'assets/images/course/course-graphql.jpg';


export const AllCoursesData = [
	{
		id: 1,
		category: 'gatsby',
		image: GatsbyCourse,
		title: 'Revolutionize how you build the web',
		date_added: 'Added on 7 July, 2020',
		instructor_name: 'Jenny Wilson',
		instructor_image: Avatar1,
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
		image: GraphQLCourse,
		title: 'GraphQL: introduction to graphQL for beginners',
		date_added: 'Added on 6 July, 2021',
		instructor_name: 'Brooklyn Simmons',
		instructor_image: Avatar2,
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

export default AllCoursesData;
