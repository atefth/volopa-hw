import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/Auth';
import { history } from '../../helpers';

function Login() {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const { auth } = useSelector(x => x);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     // redirect to wallet dashboard if already logged in
    //     if (auth.token) {
    //         history.navigate('/wallet');
    //     }
    // }, []);

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
                                    <Button type="primary" htmlType="submit" className="right-align-text"
                                        onClick={() => {
                                            return dispatch(authActions.login(credentials))
                                            .unwrap()
                                            .then(() => {
                                                history.navigate('/wallet');
                                            });
                                        }}
                                    >Login</Button>
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
