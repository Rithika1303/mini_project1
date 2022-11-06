import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../compounds/DefaultLayout';
import { getallcars } from '../redux/actions/carsActions';
import { getallusers } from '../redux/actions/userActions';
import { getallbookings } from '../redux/actions/bookingActions';
import { Button, Row, Col, DatePicker, Tabs, Modal } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../compounds/Spinner';
import moment from 'moment';
// import { request } from 'express';
const { RangePicker } = DatePicker
function Home() {
    const { cars } = useSelector(state => state.carReducer)
    const { users } = useSelector(state => state.userReducer)
    const { bookings } = useSelector(state => state.bookingsReducer)
    const user = JSON.parse(localStorage.getItem('user'))
    // const { requests } = useSelector(state => state.requestReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const [totalCars, setTotalcars] = useState([])
    // const user_request = requests.filter(obj => { return obj.userid === user._id });
    const [showModal1, setShowModal1] = useState(false);
    const dispatch = useDispatch()
    const onChange = (key) => {
        console.log(key);
    };
    const { TabPlane } = Tabs;
    useEffect(() => {
        dispatch(getallcars())
    }, [])
    useEffect(() => {
        dispatch(getallbookings())
    }, [])
    console.log("bookings", bookings)
    // useEffect(() => {
    //     dispatch(getallrequests())
    // }, [])
    useEffect(() => {
        dispatch(getallusers())
    }, [])
    console.log("host", users)
    useEffect(() => {
        setTotalcars(cars)
    }, [cars])
    function setFilter(values) {
        console.log(values);
        var selectedFrom = moment(values[0], 'MMM DD yyyy HH:mm')
        var selectedTo = moment(values[1], 'MMM DD yyyy HH:mm')
        var temp = []
        for (var car of cars) {
            if (car.bookedTimeSlots.length === 0) {
                temp.push(car)
            }
            else {
                for (var booking of car.bookedTimeSlots) {
                    if (selectedFrom.isBetween(booking.from, booking.to) ||
                        selectedTo.isBetween(booking.from, booking.to) ||
                        moment(booking.from).isBetween(selectedFrom, selectedTo) ||
                        moment(booking.to).isBetween(selectedFrom, selectedTo)
                    ) { }
                    else {
                        temp.push(car)
                    }
                }
            }
        }
        setTotalcars(temp)
    }
    return (
        <DefaultLayout>
            <Tabs centered
                defaultActiveKey="1"
                onChange={onChange}>
                <TabPlane tab='Home' key='1'>
                    <Row>
                        <Col lg={20} sm={24}>
                            <RangePicker showTime={{ format: "HH:mm" }}
                                format="MMM DD yyyy HH:mm" onChange={setFilter} />
                        </Col>
                    </Row>
                    {loading === true && (<Spinner />)}
                    <Row justify='center' gutter={16} className='mt-4'>
                        {totalCars.filter(o => o.rcVerify === "yes").map(car => {
                            return <Col lg={5} sm={24} xs={24}>
                                <div className='car p-2 bs1'>
                                    <img src={car.image} className="caring" alt="image of a car" />
                                    <div className='car-content d-flex align-items-center justify-content-between'>
                                        <div>
                                            <p>{car.name}</p>
                                            <p>{car.rentPerHour}rent Per Hour/-</p>
                                        </div>
                                        <div>
                                            <Button className='btn1 mr-2'><Link to={`/booking/${car._id}`}>Book Now</Link></Button>
                                        </div>
                                    </div>

                                </div>
                            </Col>
                        })}
                    </Row>
                </TabPlane>
                {/* <TabPlane tab='Requests' key='2'>
                    {user_request.map(detials => {
                        {
                            const car_request = cars.filter(obj => { return obj._id === detials.carid });
                            const host_details = users.filter(obj => { return obj._id === car_request[0].userid });
                            console.log("car_request", car_request);
                            console.log("host_details", host_details[0]._id);
                            return <Row justify='center' gutter={16} className='mt-4'>
                                <Col>
                                    <img src={car_request[0].image} className="caring" alt="car_image" />
                                </Col>
                                <Col>
                                    <div>
                                        <p>{car_request[0].name}</p>
                                        <p>{car_request[0].rentPerHour}rent Per Hour/-</p>
                                    </div> */}
                {/* <div>
                                        <h3>host details</h3>
                                        <div>
                                            <p>host name:{host_details[0].username}</p>
                                            <p>contact number: {host_details[0].phoneno}</p>
                                        </div>
                                    </div> */}
                {/* <div> */}
                {/* {request.request != "yes" && (<StripeCheckout
                                                    shippingAddress
                                                    token={onToken}
                                                    currency='inr'
                                                    amount={totalAmount * 100}
                                                    stripeKey="pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ"
                                                >
                                                    <button className="btn1" onClick={onToken()}>
                                                        Book Now
                                                    </button>
                                                </StripeCheckout>)} */}
                {/* {detials.request === "no" && (
                                            <button className="btn1 mt-2" onClick={() => { setShowModal1(true); }}>get approved</button>
                                        )}
                                    </div>
                                </Col> */}
                {/* <Modal
                                    open={showModal1}
                                    closable={false}
                                    footer={false}
                                    title="Still not got approved"
                                >
                                    <div className="p-2">
                                        <div>
                                            <p>wait till you get approved</p>
                                        </div>
                                        <div className="text-right mt-5">
                                            <button
                                                className="btn1"
                                                onClick={() => {
                                                    setShowModal1(false);
                                                }}
                                            >
                                                CLOSE
                                            </button>
                                        </div>
                                    </div>
                                </Modal> */}
                {/* </Row>

                        }
                    })}
                </TabPlane> */}
                <TabPlane tab='My bookings' key='2'>
                    <Row justify='center' gutter={16}>
                        <Col lg={20} sm={24}>
                            {bookings.filter(o => o.user === user._id).map(booking => {
                                return <Row gutter={16} className="bs1 m-2 text-left">
                                    <Col lg={5} sm={24}>
                                        <img style={{ borderRadius: 5 }} src={booking.car.image} height="140" className='p-2' />
                                    </Col>
                                    <Col lg={4} sm={24}>
                                        <p><b>{booking.car.name}</b></p>
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
                                        <p>Owner name: <b>{booking.host.username}</b></p>
                                        <p>Contact number:<b>{booking.host.phoneno}</b></p>
                                   </Col>
                                    <Col lg={4} sm={24} className="mt-4">
                                        {booking.request === "pending" &&
                                            <button className="btn1 mt-2" onClick={() => { setShowModal1(true); }}>still needs to get approved</button>}

                                        {booking.request === "yes" &&
                                            <button className="btn1 mt-2">payment</button>}
                                        {booking.request === "no" &&
                                            <button className="btn1 mt-2">request rejected</button>}
                                    </Col >
                                    <Modal
                                        open={showModal1}
                                        closable={false}
                                        footer={false}
                                        title="Still not got approved"
                                    >
                                        <div className="p-2">
                                            <div>
                                                <p>wait till you get approved</p>
                                            </div>
                                            <div className="text-right mt-5">
                                                <button
                                                    className="btn1"
                                                    onClick={() => {
                                                        setShowModal1(false);
                                                    }}
                                                >
                                                    CLOSE
                                                </button>
                                            </div>
                                        </div>
                                    </Modal>
                                </Row>;
                            })}
                        </Col>
                    </Row>
                </TabPlane>
            </Tabs>
        </DefaultLayout>
    )
}

export default Home
