import React,{useRef } from 'react'
import { Form, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const ContactUsScreen = () => {
    const navigation = useNavigate();
    const nameRef = useRef();
    const emailRef = useRef();
    const titleRef = useRef();
    const textRef = useRef();
    
    const ContactUsHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } =await axios.post('https://simple-demo.onrender.com/api/email', {
                name: nameRef.current.value,
                email: emailRef.current.value,
                title: titleRef.current.value,
                text: textRef.current.value,
            })
            if (data === 'success') {
                toast.success('寄送成功，將返回首頁');
                setTimeout(() => { navigation("/"); }, 2000);
            } else {
                toast.warning('寄送失敗，將返回首頁');
                setTimeout(() => { navigation("/"); }, 2000);
            }
        } catch (error) {
            console.log(error);
            navigation("/")
        }
    }
    return (
    <div className='container'>
    <Form className='col-8' onSubmit={ContactUsHandler}>
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
                innerRef={nameRef}
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
                placeholder="請輸入您的信箱"
                type="email"
                innerRef={emailRef}
                />
            </FormGroup>
        </Col>
    </Row>
    <Col >
    <FormGroup >
        <Label for="Title">
            主旨
        </Label>
        <Input 
        id="Title"
        name="title"
        placeholder="主旨"
        innerRef={titleRef}
        />
          </FormGroup>
    </Col>
    <FormGroup >
        <Label
        for="Text"
        >
        訊息
        </Label>
        <Col >
        <Input
            id="Text"
            name="text"
            type="textarea"
            innerRef={textRef}
        />
        </Col>
    </FormGroup>
    <Button>
        送出
    </Button>
    </Form>
    </div>
  )
}

export default ContactUsScreen