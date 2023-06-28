import React, { useContext, useEffect, useReducer} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {Row, Col ,Card, CardBody, CardTitle, CardText, Container, ListGroupItem, Button} from 'reactstrap'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {ToChineseName, getError} from '../utils'
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { Store } from '../components/store';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const CategoryScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart: { cartItems } } = state
  const { userInfo } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    if (!existItem) {
      ctxDispatch({
          type: 'CART_ADD_ITEM',
          payload: item ,
      });
    }
  }

  const removeToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    if (existItem) {
      ctxDispatch({
          type: 'CART_REMOVE_ITEM',
          payload: item,
      });
    }
  }

  const navitation = useNavigate()
  const params = useParams();
  let { categoryProduct } = params
  const token = JSON.parse(localStorage.getItem('Token')) || null
  
  //"修改"按鈕
  const goEditHandler = (id) => {
    navitation(`/Simple-project-frontend/product/admin/${id}/edit`)
  }
  //"刪除"按鈕
  const goDeleteHandler = async(id) => {
    await axios.delete(`https://simple-demo.onrender.com/api/products/admin/${id}`,{headers: {
      Authorization: token,}
    }).then(res => {
      toast.success(`已經刪除`);
      setTimeout(navitation(`/Simple-project-frontend`),1000)
    }).catch((error) => {
      if(error.response.data === "Unauthorized"){
        toast.error("無操作此功能的權限")
      } else {
        toast.error(getError(error));
      }
    })
  }
  
  
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products:[],
    loading: true,
    error:''
  })
  

  useEffect(() => {
    const fetchCategoryProduct = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
          const { data } = await axios.get(`https://simple-demo.onrender.com/api/products/${categoryProduct}`)
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
        } catch (error) {
          dispatch({type:'FETCH_FAIL',payload: getError(error)})
        }
      }
      fetchCategoryProduct()
    }, [userInfo, categoryProduct]);
    
  
  return (
    <div>
      <Helmet>
        <title>{ToChineseName(categoryProduct)}</title>
      </Helmet>
      <h1>{ToChineseName(categoryProduct)}</h1>
      {loading ? (<LoadingBox />)
        : error ? (<MessageBox >{error}</MessageBox>)
          : products.length === 0 ? (<MessageBox >還沒新增產品</MessageBox>)
            :
          (<Container>
            <Row style={{ width: '100%' }}>
              {products.map((item) => (
                <Col key={item._id} sm={6} md={4} lg={3} className='mb-3'>
                  <Card style={{ width: '13rem' }}>
                    <Link to={`/Simple-project-frontend/categories/${categoryProduct}/${item._id}`}>
                      <img
                        className='productImg'
                        alt="Card"
                        src={item.image.imageURL}
                      />
                    </Link>
                    <CardBody>
                      <CardTitle tag="h5">
                        <Link to={`/Simple-project-frontend/categories/${categoryProduct}/${item._id}`}>
                          <strong>{item.name}</strong>
                        </Link>
                      </CardTitle>
                      <CardText>
                        {item.chname}
                      </CardText>
                      {userInfo && userInfo.role === "Admin"  && (
                        <ListGroupItem style={{ "margin": "auto" }}>
                          <Button color="success" style={{ "margin": "0.5rem" }} onClick={e => goEditHandler(item._id)}>修改</Button>
                          <Button color="danger" style={{ "margin": "0.5rem" }} onClick={e => goDeleteHandler(item._id)}>刪除</Button>
                        </ListGroupItem>)}
                      {userInfo && userInfo.role === "customer" &&
                        (
                          <ListGroupItem style={{ "margin": "auto" }}>
                            <Button color="primary" disabled={cartItems.find(x => x._id === item._id) ? true : false}  style={{ "margin": "0.5rem" }} onClick={e => addToCartHandler(item)}>詢價</Button>
                            <Button color="danger" disabled={cartItems.find(x => x._id === item._id) ? false : true} style={{ "margin": "0.5rem" }} onClick={e => removeToCartHandler(item)}>剔除</Button>
                          </ListGroupItem>
                        ) }
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>)}
    </div>
    
  )
}

export default CategoryScreen