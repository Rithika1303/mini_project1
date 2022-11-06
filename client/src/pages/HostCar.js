import React, { useEffect, useState } from 'react';
import DefaultLayout from '../compounds/DefaultLayout';
import { Button, Row, Col, Form, Input, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getallcars } from '../redux/actions/carsActions';
import { sendemail } from '../redux/actions/userActions';
import { getallhostreq, changerequest } from '../redux/actions/bookingActions';
import { Link } from 'react-router-dom';
import { HostingCar } from '../redux/actions/carsActions';
import Spinner from '../compounds/Spinner';
import moment from 'moment';
// import axios from "axios";
function HostCar() {
    const user_name = JSON.parse(localStorage.getItem('user'))
    const { loading } = useSelector(state => state.alertsReducer)
    const { cars } = useSelector(state => state.carReducer)
    const { bookings } = useSelector(state => state.bookingsReducer)
    const filtered = cars.filter(obj => { return obj.username === user_name.username });
    const rc_num = filtered.filter(obj => { return obj.rcVerify === 'no' });
    const status_num = filtered.filter(obj => { return obj.status === 'yes' })
    // const [emailid, setEmail] = useState("");
    // console.log(emailid);
    console.log(filtered);
    console.log("rc_num", rc_num.length);
    const onChange = (key) => {
        console.log(key);
    };
    const {TabPlane} = Tabs;
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getallcars())
    }, [])
    useEffect(() => {
        dispatch(getallhostreq())
    }, [])
    console.log("bookings",bookings);
    function setrequest(value,n ,emailid){
        const book = bookings.find(o => o._id === value);
        if(n ===1){
            book.request= "yes";
            const reqObj ={
                email_id : emailid,
            }
            dispatch(sendemail(reqObj));
        }
        else {
            book.request="no";
        }
        book._id = value;
        dispatch(changerequest(book))
    }
    // function sendEmail(emailid) {
    //     const reqObj ={
    //         email_id : emailid,
    //     }
    //     dispatch(sendemail(reqObj));
    // }
    function onFinish(values) {
        values.bookedTimeSlots = []
        values.username = user_name.username;
        values.rcVerify = "no";
        values.status = "no";
        values.userid = user_name._id;
        dispatch(HostingCar(values))
        console.log(values)
    }
    return (
        <DefaultLayout>
            {loading === true && (<Spinner />)}
            <Tabs centered
                defaultActiveKey="1"
                onChange={()=>onChange}>
                <TabPlane tab='Your Cars' key='1'>
                    <Row justify='center' gutter={16} className='mt-4'>
                        {filtered.map(car => {
                            if (car.rcVerify === "yes") {
                                return <Col lg={5} sm={24} xs={24}>
                                    <div className='car p-2 bs1'>
                                        <img src={car.image} className="caring" alt="car image"/>
                                        <div className='car-content d-flex align-items-center justify-content-between'>
                                            <div>
                                                <p>{car.name}</p>
                                                <p>{car.rentPerHour}rent Per Hour/-</p>
                                                <p>rent Per Hour/-</p>
                                            </div>
                                            <div>
                                                <Button className='btn1 mr-2'><Link to={`/CarDetails/${car._id}`}>more info</Link></Button>
                                                {/* <Button className='btn1 mr-2'><Link to={`/EditCar/${car._id}`}>edit car</Link></Button> */}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            }
                        })}
                    </Row>
                    <Row justify='center' className='mt-4'>
                        <h4>Not verified</h4>
                        <hr></hr>
                    </Row>
                    <Row justify='center' gutter={16} className='mt-4'>
                        {rc_num.length > 0 && rc_num.map(car => {
                            return <Col lg={5} sm={24} xs={24}>
                                <div className='car p-2 bs1'>
                                    <img src={car.image} className="caring" alt="car image"/>
                                    <div className='car-content d-flex align-items-center justify-content-between'>
                                        <div>
                                            <p>{car.name}</p>
                                            <p>{car.rentPerHour}rent Per Hour/-</p>
                                            <p>rent Per Hour/-</p>
                                        </div>
                                        <div>
                                            <Button className='btn1 mr-2'><Link to={`/CarDetails/${car._id}`}>more info</Link></Button>
                                            {/* <Button className='btn1 mr-2'><Link to={`/EditCar/${car._id}`}>edit car</Link></Button> */}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        }
                        )}
                        {rc_num.length === 0 && <Col>
                            return <div><h5>No cars for verfication process</h5></div>
                        </Col>
                        }
                    </Row>
                    </TabPlane> 
                    <TabPlane tab='Host a car' key='2'>
                    <Form className='Hostform p-2' onFinish={() => onFinish}>
                        <h1>Host a car</h1>
                        <hr />
                        <Form.Item name='name' label='car name' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='image' label='image url' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='rentPerHour' label='rent per hour' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='capacity' label='capacity' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='fuelType' label='fueltype' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <button className='btn1 mt-2 mb-3'>add car</button>
                        <br />
                    </Form>
                </TabPlane>
                <TabPlane tab='On going cars' key='3'>
                    <Row justify='center' gutter={16} className='mt-4'>
                        {status_num > 0 && filtered.map(car => {
                            if (car.status === "yes") {
                                return <Col lg={5} sm={24} xs={24}>
                                    <div className='car p-2 bs1'>
                                        <img src={car.image} className="caring" alt="car image"/>
                                        <div className='car-content d-flex align-items-center justify-content-between'>
                                            <div>
                                                <p>{car.name}</p>
                                                <p>{car.rentPerHour}rent Per Hour/-</p>
                                            </div>
                                        </div>

                                    </div>
                                </Col>
                            }
                        })}
                        {status_num === 0 &&
                            <Col><div><h5>NO ongoing cars</h5></div></Col>
                        }
                    </Row>
                </TabPlane>
                <TabPlane tab='Ideal cars' key='4'>
                    <Row justify='center' gutter={16} className='mt-4'>
                        {cars.map(car => {
                            if (car.username === user_name.username && car.status === "no" && car.rcVerify === "yes") {
                                return <Col lg={5} sm={24} xs={24}>
                                    <div className='car p-2 bs1'>
                                        <img src={car.image} className="caring" alt="car image"/>
                                        <div className='car-content d-flex align-items-center justify-content-between'>
                                            <div>
                                                <p>{car.name}</p>
                                                <p>{car.rentPerHour}rent Per Hour/-</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            }
                        })}
                    </Row>
                </TabPlane>
                <TabPlane tab='Requests' key='5'>
                <Row justify='center' gutter={16}>
                        <Col lg={20} sm={24}>
                            {bookings.map(booking => {
                                return <Row gutter={16} className="bs1 m-2 text-left">
                                    <Col lg={5} sm={24}>
                                        <img style={{ borderRadius: 5 }} src={booking.car.image} height="140" className='p-2' />
                                    </Col>
                                    <Col lg={4} sm={24}>
                                        <p><b>{booking.car.name}</b></p>
                                        {/* <p><b>{booking.host.username}</b></p> */}
                                        <p>totalHours: <b>{booking.totalHours}</b></p>
                                        <p>Rent per hour : <b>{booking.car.rentPerHour}</b></p>
                                        <p>Total amount: <b>{booking.totalAmount}</b></p>
                                    </Col>
                                    <Col lg={6} sm={24}>
                                    
                                        <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
                                        <p>To: <b>{booking.bookedTimeSlots.to}</b></p>
                                        <p>Date of booking: <b>{moment(booking.createAt).format('MMM DDD YYY')}</b></p>
                                    </Col>
                                    <Col lg={4} sm={24}>
                                        <p>username <b>{booking.user.username}</b></p>
                                        <p>Contact number:<b>{booking.user.phoneno}</b></p>
                                   </Col>

                                    <Col lg={2} sm={24} className="mt-4">
                                            <button className="btn1 mt-2" onClick={() => { setrequest(booking._id,1,booking.user.email);}}>accept</button>
                                            <button className="btn1 mt-2" onClick={() => { setrequest(booking._id,0, booking.user.email);}}>reject</button>
                                         
                                            {/* <button className="btn1 mt-2" onClick={() => {sendEmail(booking.user.email)}}>email</button> */}
                                    </Col >
                                </Row>;
                            })}
                        </Col>
                    </Row>
                </TabPlane>
            </Tabs>
        </DefaultLayout>
    )
}
export default HostCar;
