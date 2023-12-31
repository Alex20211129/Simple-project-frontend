import React, { useContext, useEffect, useRef } from 'react'
import { Form, Button, FormGroup, Label, Input , Container } from 'reactstrap'
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { toast } from "react-toastify";
import { getError } from "../utils";
import { useNavigate } from 'react-router-dom';
import { Store } from '../components/store';

const RegisterScreen = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const name = nameRef.current.value
            const email = emailRef.current.value
            const password = passwordRef.current.value 
            const { data } = await axios.post(`https://simple-demo.onrender.com/api/auth/register`, {name,email,password });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data.user })
            localStorage.setItem('userInfo', JSON.stringify(data.user))
            localStorage.setItem('Token', JSON.stringify(data.token))
            if (data) { toast.success("註冊成功，現在返回首頁"); }
            navigate('/Simple-project-frontend/');
        } catch (err) {
            toast.error(getError(err));
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate('/Simple-project-frontend/')
        }
    }, [navigate, userInfo])
    
    return (
        <Container className="small-container">
            <Helmet>
                <title>註冊</title>
            </Helmet>
            <Form onSubmit={submitHandler}>
                <FormGroup className="mb-3">
                    <Label>name</Label>
                    <Input  type="name" required innerRef={nameRef}/>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label>Email</Label>
                    <Input type="email" required innerRef={emailRef} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label>Password</Label>
                    <Input type="password" required innerRef={passwordRef}/>
                </FormGroup>
                <div className="mb-3">
                    <Button type="submit">註冊</Button>
                </div>
            </Form>
        </Container>
        );
}

export default RegisterScreen