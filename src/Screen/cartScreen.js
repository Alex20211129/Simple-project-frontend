import React, { useContext, useRef } from 'react'
import { Store } from '../components/store';
import { Helmet } from 'react-helmet-async';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Row } from 'reactstrap';
import MessageBox from '../components/MessageBox';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CartScreen = () => {
    const navigation = useNavigate()
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems }, userInfo } = state;
    const nameRef = useRef()
    const emailRef = useRef()
    const countRef = useRef()
    
    const deleteHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === item._id);
        if (existItem) {
        ctxDispatch({
            type: 'CART_REMOVE_ITEM',
            payload: item,
        });
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (countRef.current.value === "") {
            return toast.error("還未輸入任何數量!")
        } else {
            if (cartItems.length > 1) { 
                toast.info(<div>
                    <p>歡迎{nameRef.current.value},這是您的信箱{emailRef.current.value }</p>
                    <h5>你總共詢價以下物品</h5>
                    <br />
                    {cartItems.map((item) => {
                    return (<div key={item._id}><p>品名:{item.name}  /數量:{item.quantity}件</p></div> )
                    })}
                    <p> 感謝您的詢價，我們會盡快回覆您</p>
                </div>)
                ctxDispatch({
                    type: 'CART_CLEAR',
                });
                localStorage.setItem('cartItems', [])
                navigation('/Simple-project-frontend')
            } else {
                const submitItem = { name: cartItems[0].name, quantity: cartItems[0].quantity }
                toast.info(<div>
                    <h5>你總共詢價以下物品</h5>
                    <br />
                    <p>品名:{submitItem.name}</p>
                    <p>數量:{submitItem.quantity}件</p>
                    <p> 感謝您的詢價，我們會盡快回覆您</p>
                </div>)
                ctxDispatch({
                    type: 'CART_CLEAR',
                });
                localStorage.setItem('cartItems', [])
                navigation('/Simple-project-frontend')
            }
        }
    }

    return (
        <div>
            <Helmet>
                <title>
                    詢價單
                </title>
            </Helmet>
                <h1>詢價單</h1>
                <Row >
                    <Col md={8}>
                        {cartItems.length === 0 ? (
                            <MessageBox>
                                無任何商品 <Link to="/Simple-project-frontend">返回</Link>
                            </MessageBox>
                        ) : (
                                <ListGroup>
                                    {cartItems.map((item) => 
                                        <ListGroupItem key={item._id}>
                                            <Row className="align-items-center">
                                                <Col md={2} style={{display: 'flex', justifyContent: 'center'}}>
                                                    <img
                                                        src={item.image.imageURL}
                                                        alt={item.name}
                                                        className="img-fluid rounded img-thumbnail"
                                                    ></img>{' '}
                                                </Col>
                                                <Col md={8}>
                                                    <h2><Link to={`/Simple-project-frontend/categories/${item.category}/${item._id}`}>{item.name}</Link></h2>
                                                    <h3>{item.chname}</h3>
                                                </Col>
                                                <Col md={2}>
                                                    <Label for="count">
                                                        需求數量:
                                                    </Label>
                                                    <Input
                                                    id="count"
                                                    name="count"
                                                    placeholder="請輸入需要數量"
                                                    required = {true}
                                                    innerRef={countRef}
                                                    onChange={e => {ctxDispatch({
                                                        type: 'ADD_COUNT',
                                                        payload: [item, e.target.value]
                                                    }) }}    
                                                    
                                                    />
                                                    <Button color="danger" style={{ "margin": "0.5rem" }} onClick={e => deleteHandler(item)}>刪除</Button>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )}
                            </ListGroup>
                        )}
                    </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <h4>
                                寄信詢價
                            </h4>
                            <Form onSubmit={submitHandler}>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="name">
                                                姓名/公司
                                            </Label>
                                            <Input
                                            id="Name"
                                            name="name"
                                            placeholder="請輸入姓名或公司名稱"
                                            type="name"
                                            required = {true}
                                            innerRef={nameRef}
                                            defaultValue={userInfo.name}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col >
                                        <FormGroup>
                                            <Label for="Email">
                                            Email
                                            </Label>
                                            <Input
                                            id="Email"
                                            name="email"
                                            required = {true}
                                            placeholder="請輸入您的信箱"
                                            type="email"
                                            innerRef={emailRef}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Button disabled = {cartItems.length === 0 ? true : false}>
                                        送出
                                    </Button>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
            
        </div>
    )
}

export default CartScreen