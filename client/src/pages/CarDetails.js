import React, { useEffect, useState } from 'react';
import DefaultLayout from '../compounds/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getallcars, editCar, deleteCar } from '../redux/actions/carsActions';
import {Row, Col, Form, Input, Popconfirm,Tabs } from 'antd';
import Spinner from '../compounds/Spinner';
import { DeleteOutlined } from "@ant-design/icons";
function CarDetails({ match }) {
    const { carid } = useParams();
    const { cars } = useSelector(state => state.carReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const [car, setcar] = useState({})
    const [totalcars , settotalcars]= useState([])
    // const [index, setIndex] = useState(0);
    const dispatch = useDispatch()
    const onChange = (key) => {
        console.log(key);
    };
    const {TabPlane} = Tabs;
    useEffect(() => {
        if (cars.length === 0) {
            dispatch(getallcars())
        }
        else {
            settotalcars(cars)
            setcar(cars.find(o => o._id === carid))
            console.log("car",car);
        }
    }, [cars])
    function onFinish(values) {
        values._id = car._id
        dispatch(editCar(values))
        console.log("values",values)
    }
    return (
        <DefaultLayout>
            {loading === true && (<Spinner />)}    
                <Tabs centered
                defaultActiveKey="1"
                onChange={onChange}>
                <TabPlane tab='Your Cars' key='1'>
                    <Row justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh' }}>
                        <Col lg={10} sm={24} xs={24}>
                            <img src={car.image} className='caring2 bs1' alt="car image"/>
                        </Col>
                        <Col lg={10} sm={24} xs={24} className='test-right'>
                            <h5>car info</h5>
                            <hr></hr>
                            <div style={{ textAlign: 'right' }}>
                                <p>{car.name}</p>
                                <p>{car.rentPerHour} Rent Per Hour /-</p>
                                <p>Fuel: {car.fuelType}</p>
                                <p>max person : {car.capacity}</p>
                            </div>
                        </Col>
                    </Row>
                </TabPlane>
                <TabPlane tab='Edit car' key='2'>
                    <Row justify='center mt-5'>
                        <Col lg={12} sm={24}>
                            {totalcars.length>0 && (<Form initialValues={car} className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                                <h1>Edit a car</h1>
                                {car.name}
                                <hr />
                                <Form.Item name='name' label='car name' rules={[{ required: false }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name='image' label='image url' rules={[{ required: false }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name='carrc' label='car rc number' rules={[{ required: false }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name='rentPerHour' label='rent per hour' rules={[{ required: false }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name='capacity' label='capacity' rules={[{ required: false }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name='fuelType' label='fueltype' rules={[{ required: false }]}>
                                    <Input />
                                </Form.Item>
                                <button className='btn1 mt-2 mb-3'>edit a car</button>
                                <br />
                            </Form>
                            )}
                        </Col>
                    </Row>
                </TabPlane>
                <TabPlane tab='delete car' key='3'>
                    <Row justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh' }}>
                        <Col lg={10} sm={24} xs={24}>
                            <img src={car.image} className='caring2 bs1' alt="car image"/>
                        </Col>
                        <Col lg={10} sm={24} xs={24} className='test-right'>
                            <h5>car info</h5>
                            <hr></hr>
                            <div style={{ textAlign: 'right' }}>
                                <p>{car.name}</p>
                                <p>{car.rentPerHour} Rent Per Hour /-</p>
                                <p>Fuel: {car.fuelType}</p>
                                <p>max person : {car.capacity}</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Popconfirm
                                    title="Are you sure to delete this car:"
                                    onConfirm={() => { dispatch(deleteCar({carid : car._id}))}}
                                    okTest="Yes"
                                    cancelText="No"
                                >
                                    <button className='deletebutton'>delete <DeleteOutlined style={{ color: "black", cursor: "pointer", height: "70%" }}
                                    /></button>
                                </Popconfirm>
                            </div>
                        </Col>
                    </Row>
                </TabPlane>
                
                <TabPlane tab='Payment History' key='4'></TabPlane>
            </Tabs>
            
        </DefaultLayout>
    )
}
export default CarDetails;

