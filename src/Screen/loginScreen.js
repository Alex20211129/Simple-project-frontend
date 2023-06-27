import React, { useContext, useEffect, useRef } from 'react'
import { Form, Button, FormGroup, Label, Input , Container } from 'reactstrap'
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { toast } from "react-toastify";
import { getError } from "../utils";
import { useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../components/store';

const LoginScreen = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const { search } = useLocation()
    const redirectUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectUrl ? redirectUrl : '/'

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const email = emailRef.current.value
            const password = passwordRef.current.value 
            const { data } = await axios.post(`https://simple-demo.onrender.com/api/auth/login`, {email,password });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data.user })
            localStorage.setItem('userInfo', JSON.stringify(data.user))
            localStorage.setItem('Token', JSON.stringify(data.token))
            toast.success("登入成功");
            navigate(redirect || '/');
        } catch (err) {
            toast.error(getError(err));
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])
    
    return (
        <Container className="small-container">
            <Helmet>
                <title>登入</title>
            </Helmet>
            <Form onSubmit={submitHandler}>
                <FormGroup className="mb-3">
                    <Label>Email</Label>
                    <Input  type="email" required innerRef={emailRef}/>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label>Password</Label>
                    <Input type="password" required innerRef={passwordRef}/>
                </FormGroup>
                <div className="mb-3">
                    <Button type="submit">登入</Button>
                </div>
            </Form>
        </Container>
        );
}

export default LoginScreen