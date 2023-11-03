
import { Col, Row, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeroImage from '../../assets/images/home/hero-img.png';


function HeaderHome() {
  return (
    <section className="bg-custom">
        <Container>
            {/*  Hero Section  */}
            <Row className="align-items-center g-0">
                <Col xl={5} lg={6} md={12}>
                    <div className="py-5 py-lg-0">
                        <h1 className="text-white display-4 fw-bold">
                            Olá
                        </h1>
                        <p className="text-white-50 mb-4 lead">
                            Hand-picked Instructor and expertly crafted courses, designed
                            for the modern students and entrepreneur.
                        </p>
                        <Link
                            to="/marketing/courses/course-filter-page/"
                            className="btn btn-dark"
                        >
                            Browse Courses
                        </Link>{' '}
                        <Link to="/authentication/sign-in/" className="btn btn-white">
                            Are You Instructor?
                        </Link>
                    </div>
                </Col>
                <Col xl={7} lg={6} md={12} className="text-lg-end text-center">
                    <Image src={HeroImage} alt="" className="img-fluid" />
                </Col>
            </Row>
        </Container>
    </section>  
  )
}

export default HeaderHome