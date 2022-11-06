import React, { useState } from "react";
import DefaultLayout from "../compounds/DefaultLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getallcars } from "../redux/actions/carsActions";
import { bookCar} from "../redux/actions/bookingActions";
import { Checkbox, Modal } from "antd";
import {  Row, Col, Divider, DatePicker} from "antd";
import Spinner from "../compounds/Spinner";
import moment from "moment";
// import StripeCheckout from "react-stripe-checkout";
const { RangePicker } = DatePicker;
function BookingCar({ match }) {
    const { carid } = useParams();
    const user = JSON.parse(localStorage.getItem('user'))
    const { cars } = useSelector((state) => state.carReducer);
    const { loading } = useSelector((state) => state.alertsReducer);
    const [car, setcar] = useState({});
    const dispatch = useDispatch();
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [totalHours, setTotalHours] = useState(0);
    const [driver, setdriver] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    console.log(user);
    useEffect(() => {
        if (cars.length === 0) {
            dispatch(getallcars());
        } else {
            setcar(cars.find((o) => o._id === carid));
        }
    }, [cars]);
    useEffect(() => {
        setTotalAmount(totalHours * car.rentPerHour);
        if (driver) {
            setTotalAmount(totalAmount + 30 * totalHours);
        }
    }, [driver, totalHours]);
    function selectTimeSlots(values) {
        console.log(moment(values[0]).format("MMM DD yyyy HH:mm"));
        console.log(moment(values[1]).format("MMM DD yyyy HH:mm"));
        setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
        setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));
        setTotalHours(values[1].diff(values[0], "hours"));
    }
    function onToken(carid,userid) {
        if (user.license_no !== null && user.license_approved === "yes") {
            console.log("license there")
            const reqObj = {
                user: JSON.parse(localStorage.getItem("user"))._id,
                host: userid,
                request: "pending",
                car: carid,
                totalHours,
                totalAmount,
                driverRequired: driver,
                bookedTimeSlots: {
                    from,
                    to,
                },
            };
            dispatch(bookCar(reqObj));
        }
        else {
            console.log("not there license");
        }
    }
    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <Row
                justify="center"
                className="d-flex align-items-center"
                style={{ minHeight: "90vh" }}
            >
                <Col lg={10} sm={24} xs={24}>
                    <img src={car.image} className="carimg2 bs1" alt="car image"/>
                </Col>
                <Col lg={10} sm={24} xs={24} className="text-right">
                    <Divider type="horizontal" dashed>
                        car info
                    </Divider>
                    <div style={{ textAlign: "right" }}>
                        <p>{car.name}</p>
                        <p>{car.rentPerHour} Rent Per Hour /-</p>
                        <p>fuel:{car.fuelType}</p>
                        <p>capacity:{car.capacity}</p>
                    </div>
                    <Divider type="horizontal" dashed>
                        Time slots
                    </Divider>
                    <RangePicker
                        showTime={{ format: "HH:mm" }}
                        format="MMM DD yyyy HH:mm"
                        onChange={selectTimeSlots}
                    ></RangePicker>
                    <br />
                    <button className="btn1 mt-2" onClick={() => { setShowModal(true); }}>see booked slots</button>
                    <div>
                        <p>Total Hours : {totalHours}</p>
                        <p>
                            Rent Per Hour : <b>{car.rentPerHour}</b>
                        </p>
                        <Checkbox
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setdriver(true);
                                } else {
                                    setdriver(false);
                                }
                            }}
                        >
                            Driver Required
                        </Checkbox>
                        <h3>Total Amount :{totalAmount}</h3>
                        {user.license_no === null && (
                            <button className="btn1 mt-2" onClick={() => { setShowModal1(true); }}>book Now</button>
                        )}
                        {user.license_no !== null && user.license_approved === 'no' && (
                            <button className="btn1 mt-2" onClick={() => { setShowModal2(true); }}>book Now</button>
                        )}
                        {user.license_approved === 'yes' && (
                            <button className="btn1 mt-2" onClick={() => { onToken(car._id, car.userid) }}>book Now</button>
                        )}
                    </div>
                </Col>
                <Modal
                    visible={showModal1}
                    closable={false}
                    footer={false}
                    title="Upload your license"
                >
                    <div className="p-2">
                        <div>
                            <p>Please upload your license....</p>
                            <li>
                                <ul>go to profile page </ul>
                                <ul>click of edit profile</ul>
                                <ul>enter your license detials </ul>
                            </li>  
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
                <Modal
                    visible={showModal2}
                    closable={false}
                    footer={false}
                    title="Not yet verified"
                >
                    <div className="p-2">
                        <div>
                            <p>Please wait for next 24 hours to get yourr license license_approved....</p> 
                        </div>
                        <div className="text-right mt-5">
                            <button
                                className="btn1"
                                onClick={() => {
                                    setShowModal2(false);
                                }}
                            >
                                CLOSE
                            </button>
                        </div>
                    </div>
                </Modal>
                {car.name && (
                    <Modal
                        visible={showModal}
                        closable={false}
                        footer={false}
                        title="Booked time slots"
                    >
                        <div className="p-2">
                            {car.bookedTimeSlots.map((slot) => {
                                return (
                                    <button className="btn1 mt-2">
                                        {slot.from} - {slot.to}
                                    </button>
                                );
                            })}

                            <div className="text-right mt-5">
                                <button
                                    className="btn1"
                                    onClick={() => {
                                        setShowModal(false);
                                    }}
                                >
                                    CLOSE
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}
            </Row>
        </DefaultLayout >
    );
}

export default BookingCar;