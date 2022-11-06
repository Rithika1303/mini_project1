import React, { useState } from 'react';
import DefaultLayout from '../compounds/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import {  Row, Col, Form, Input,Popconfirm} from 'antd';
import {editProfile} from '../redux/actions/userActions';
import Spinner from '../compounds/Spinner';
function Profile({ match }) {
    // const { username } = useParams();
    const user = JSON.parse(localStorage.getItem('user'))
    const { loading } = useSelector(state => state.alertsReducer)
    // const { cars } = useSelector(state => state.carReducer)
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch()
    function onFinish(values) {
        values._id = user._id;
        values.license_approved = "no";
        dispatch(editProfile(values))
        console.log("values", values)
    }
    return (
        <DefaultLayout>
            {loading === true && (<Spinner />)}
            <div><h1>Profile page</h1></div>
            <div className='Tabs'>
                <div className='tabsList'>
                    <div ClassName={'tabHead active'} id='test1' onClick={() => { setIndex(0) }}>Profile</div>
                    <div ClassName='tabHead' id='test2' onClick={() => { setIndex(1) }}>Edit profile</div>
                </div>
                <div className='tabContent' hidden={index !== 0}>
                <Row className='profile' justify='center mt-5'>
                    <Col lg={12} sm={24} className='bs1 p-2' justify='center'>
                        <div>
                    <p>Username: {user.username}</p>
                    <p>Password: {user.password}</p>
                    <p>Phone Number: {user.phoneno}</p>
                    <p>Email: {user.email}</p>
                    <p>License Number: {user.license_no}</p>
                    </div>
                    {/* <div style={{ textAlign: 'center' }}>
                                <Popconfirm
                                    title="Are you sure to delete this car:"
                                    onConfirm={() => { dispatch(deleteuser({userid : user._id}))}}
                                    okTest="Yes"
                                    cancelText="No"
                                >
                                    <button className='deletebutton'>delete <DeleteOutlined style={{ color: "black", cursor: "pointer", height: "70%" }}
                                    /></button>
                                </Popconfirm>
                            </div> */}
                    </Col>
                    
                    
                    
                </Row>
                </div>
                <div className='tabContent' hidden={index !== 1}>
                <Row justify='center mt-5'>
                    <Col lg={12} sm={24}>
                        <Form initialValues={user} className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                            <h1>edit the profile</h1>
                            <hr />
                            <Form.Item name='username' label='user name' rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name='password' label='password' rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name='phoneno' label='phone number' rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name='email' label='email' rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name='license_no' label='license number' rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <button className='btn1 mt-2 mb-3'>edit the profile</button>
                            <br />
                        </Form>
                    </Col>
                </Row>
                </div>
            </div>
        </DefaultLayout>
    )
}
export default Profile;