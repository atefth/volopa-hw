import * as React from "react";
import { useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { login } from '../../services/Auth';
import useAuth from "../../contexts/Auth";


function Login() {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const {refreshToken} = useAuth();

    const loginUser = async () => {
        try {
            const data = await login(credentials);
            if (data.token) {
                refreshToken(data.token);
            }
        } catch (error) {
            const message = error.response.data.errors.reduce((err, msg) => `${msg} \n ${err}`, '')
            alert(message);
        }
    }

    return (
        <Row className="full-height" align="middle" justify="center">
            <Col xxl={6} xl={9} lg={12} md={12} sm={18} xs={22}>
                <Card>
                    <Card.Grid className="full-width rounded">
                        <Row>
                            <Col span={24}>
                                <Typography.Text className="medium fs-28px dark-green">Login</Typography.Text>
                            </Col>
                        </Row>
                        <Row className="m-t-10">
                            <Col span={24}>
                                <Form
                                    layout="vertical"
                                    requiredMark={true}>
                                    <Form.Item
                                        label={<span className="muli semi-bold">Email</span>}
                                        name='email'
                                    >
                                        <Input onChange={($event) => setCredentials({...credentials, email: $event.target.value})}/>
                                    </Form.Item>
                                    <Form.Item
                                        label={<span className="muli semi-bold">Password</span>}
                                        name='password'>
                                        <Input.Password onChange={($event) => setCredentials({...credentials, password: $event.target.value})} />
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit" className="right-align-text" onClick={loginUser}>Login</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Grid>
                </Card>
            </Col>
        </Row>
    );
}

export default Login;
