import { Col, Row, Container } from 'react-bootstrap';

function FeaturesList() {
    const features = [
		{
			id: 1,
			title: '30,000 online courses',
			description: 'Enjoy a variety of fresh topics',
			icon: 'video',
			colorclass: 'warning'
		},
		{
			id: 2,
			title: 'Expert instruction',
			description: 'Find the right instructor for you',
			icon: 'ri-home-line',
			colorclass: 'warning'
		},
		{
			id: 3,
			title: 'Lifetime access',
			description: 'Learn on your schedule',
			icon: 'clock',
			colorclass: 'warning'
		}
	];

  return (
    <section className="bg-white py-4 shadow-sm">
        <Container>
            <Row className="align-items-center g-0">
                {features.map((item, index) => {
                    return (
                        <Col xl={4} lg={4} md={6} className="mb-lg-0 mb-4" key={index}>
                            <div className="d-flex align-items-center">
                                <span className={`icon-sahpe icon-lg bg-light-${item.colorclass} rounded-circle text-center text-dark-${item.colorclass} fs-4`}>
                                    <i className={item.icon}></i>
                                </span>
                                <div className="ms-3">
                                    <h4 className="mb-0 fw-semi-bold">{item.title}</h4>
                                    <p className="mb-0">{item.description}</p>
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    </section>
  )
}

export default FeaturesList