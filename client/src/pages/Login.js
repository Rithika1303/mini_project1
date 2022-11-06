import React from 'react';
import { Row, Col, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import { admincheck } from '../redux/actions/adminActions';
function Login() {
    const dispatch = useDispatch()
    function onFinish(values) {
        dispatch(admincheck(values))
        dispatch(userLogin(values))
        console.log(values)
    }
    return (
            <div className='login'>
                <Row gutter={16} className="d-flex align-items-center">
                    <Col lg={4} md={4}></Col>
                    <Col lg={16} md={16} sm={10} className="text-left">
                        <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
                            <h1 className='text-center'>FastandFuriousRides</h1>
                            <hr style={{backgroundColor: "white"}}/>
                            <h1> Login</h1>
                            <Form.Item name='username' label='Username' rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name='password' label='Password' rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>

                            <button className='btn1 mt-2 mb-3'>Login</button>
                            <br />
                            <Link to='/Register'>Click here to Register</Link>
                        </Form>
                    </Col>
                </Row>
            </div>
    )
}

export default Login;
