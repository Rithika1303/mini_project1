import React from 'react';
import { Row, Col, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { userRegister } from "../redux/actions/userActions"
function Register() {
    const dispatch = useDispatch()
    function onFinish(values) {
        values.phoneno = null
        values.email = ''
        values.license_no = null
        values.license_approved = "no"
        dispatch(userRegister(values))
        console.log(values)
    }
    return (
        <div className='login'>
            <Row gutter={16} className="d-flex align-items-center">
                <Col lg={4}></Col>
                <Col lg={16} className="text-left">
                    <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
                        <h1 className='text-center'>FastandFuriousRides</h1>
                        <hr style={{ backgroundColor: "white" }} />
                        <h1> Sign up</h1>
                        <Form.Item name='username' label='Username' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='password' label='Password' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='cpassword' label='Confirm Password' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <button className='btn1 mt-2 mb-3'>Register</button>
                        <br></br>
                        <Link to='/Login'>Click Here To Login</Link>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Register;
