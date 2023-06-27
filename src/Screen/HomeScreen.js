import data from '../data';
import { Col, Row, UncontrolledCarousel } from 'reactstrap';
import  Category  from '../components/category';
import { Helmet } from 'react-helmet-async';

const HomeScreen = () => {
    return (  
        <div>
            <Helmet>
                <title>信大貿易</title>
            </Helmet>
            <div style={{display:'flex',justifyContent:'center'}}>
                <UncontrolledCarousel style={{width: '90%'}}
                    items={[
                        {
                        altText: '',
                        caption: '',
                        key: 1,
                        src: './images/index_main01.jpg',
                        },
                        {
                        altText: '',
                        caption: '',
                        key: 2,
                        src: './images/index_main02.jpg',
                        },
                        {
                        altText: '',
                        caption: '',
                        key: 3,
                        src: './images/index_main04.jpg',
                        }
                    ]}
                />
            </div>


            <h1>我們的產品</h1>
            
            <div className="categories">
                {
                    (
                    <Row style={{width: '100%'}}>
                        {data.category.map((category) => (
                        <Col key={category.name} xs={12} sm={6} md={4} lg={3} style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginBottom: '20px'}} >
                            <Category category={category}></Category>
                        </Col>
                    ))}
                    </Row>
                    )
                }

            </div>
        </div>
  )
}

export default HomeScreen