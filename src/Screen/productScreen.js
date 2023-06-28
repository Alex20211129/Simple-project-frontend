import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {  Breadcrumb, BreadcrumbItem, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import {Helmet} from 'react-helmet-async'
import axios from 'axios';
import {ToChineseName, getError} from '../utils'
import { toast } from 'react-toastify';


const ProductScreen = (props) => {
     
    const navitation = useNavigate()
    const [product, setProduct] = useState({})
    const params = useParams();
    let { id } = params
    useEffect(() => {
        if (id.length < 24) {
            toast.error("產品不存在，或產品ID不正確");
            return navitation("/Simple-project-frontend")
        }
        const fetchCategoryProduct = async () => {
            try {
                const { data } = await axios.get(`https://simple-demo.onrender.com/api/products/category/${id}`)
                setProduct(data)
            } catch (error) {
                toast.error(getError(error));
                navitation("/Simple-project-frontend")
            }
        }
        fetchCategoryProduct()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    let src = ''
    if (product.image) { src = product.image.imageURL}
    return (
        <div>
            
            <Helmet>
                <title>{product.name}</title>
            </Helmet>
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to="/Simple-project-frontend">
                    回首頁
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to={`/Simple-project-frontend/categories/${product.category}`}>
                    目錄
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    {product.name}
                </BreadcrumbItem>
            </Breadcrumb>
            <Row >
                <Col md={4}>
                <img
                    className="img-large"
                    src={src} 
                    alt={product.name}
                    ></img>
                </Col>
                <Col md={7}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                        <h1>{product.name}</h1>
                        </ListGroupItem>
                        <ListGroupItem>{product.chname}</ListGroupItem>
                        <ListGroupItem>分類: {ToChineseName(product.category)}</ListGroupItem>
                        <ListGroupItem>
                            
                        說明:
                            <div dangerouslySetInnerHTML ={{__html: product.description}}></div>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
            
        </div>
        );
}

export default ProductScreen