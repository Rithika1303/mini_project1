import React, { useEffect, useState} from 'react';
import DefaultLayout from '../compounds/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getallcars, editCar } from '../redux/actions/carsActions';
import {Row, Col, Form, Input} from 'antd';
import Spinner from '../compounds/Spinner';
function EditCar({ match }) {
    const { carid } = useParams();
    console.log("carid",carid);
    const { cars } = useSelector(state => state.carReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const [car, setcar] = useState({})
    const [totalcars , settotalcars]= useState([])
    const dispatch = useDispatch()
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
    console.log("testing",car.name);
    function onFinish(values) {
        values._id = car._id
        dispatch(editCar(values))
        console.log(values)
    }
    return (
        <DefaultLayout>
            {loading === true && (<Spinner />)}
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
        </DefaultLayout>
    )
}
export default EditCar;