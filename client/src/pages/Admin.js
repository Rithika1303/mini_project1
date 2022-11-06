import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../compounds/DefaultLayout';
import { getallusers ,licensedVerified} from '../redux/actions/userActions';
import { getallcars, rcVerified } from '../redux/actions/carsActions';
import { Button, Row, Col , Tabs,Badge} from 'antd';
import Spinner from '../compounds/Spinner';
function Admin() {
    const { cars } = useSelector(state => state.carReducer)
    const { users } = useSelector(state => state.userReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const { loading1 } = useSelector(state => state.alertsReducer1)
    const filtered_cars = cars.filter(obj => { return obj.rcVerify === "no" });
    console.log('filtered_Cars', filtered_cars);
    // const [index, setIndex] = useState(0);
    const { TabPlane } = Tabs;
    const onChange = (key) => {
        console.log(key);
    };
    // const [carid, setcar] = useState(0);
    // const [car, setcar] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getallcars())
    }, [])
    useEffect(() => {
        dispatch(getallusers())
    }, [])
    console.log('users', users)
    function onFinish(carid) {
        console.log(carid);
        const car = cars.find(o => o._id === carid);
        console.log('car:', car);
        car.rcVerify = "yes";
        car._id = carid;
        dispatch(rcVerified(car))
    }
    function onFinish1(userid) {
        console.log(userid);
        const user = users.find(o => o._id === userid);
        console.log('user:', user);
        user.license_approved = "yes";
        user._id = userid;
        console.log(user);
        dispatch(licensedVerified(user))
    }
    return (
        <DefaultLayout>
            <Tabs centered
                defaultActiveKey="1"
                onChange={onChange}>
            
            <TabPlane tab='verify car' key='1'>
            <Badge size="default" count={5}><p>hello</p></Badge>
            {loading === true && (<Spinner />)}
                    {cars.map(car => {
                        if (car.rcVerify === "no") {
                            return <Row justify='center' gutter={16} className='mt-4'>
                                <Col>
                                    <img src={car.image} className='caring2 bs1' />
                                </Col>
                                <Col lg={10} sm={24} xs={24} className='test-right'>
                                    <h5>car info</h5>
                                    <hr></hr>
                                    <div style={{ textAlign: 'right' }}>
                                        <p>{car.name}</p>
                                        <p>{car.rentPerHour} Rent Per Hour /-</p>
                                        <p>Fuel: {car.fuelType}</p>
                                        <p>max person : {car.capacity}</p>
                                        <p>RC Number: {car.rc}</p>
                                    </div>
                                    <div>
                                        <Button className='btn1 mr-2' onClick={() => { onFinish(car._id) }} >Approved</Button>
                                    </div>
                                </Col>
                            </Row>
                        }
                    })}
            </TabPlane>
            <TabPlane tab='license verify' key='2'>
            {loading1 === true && (<Spinner />)}
                {users.map(user => {
                    if (user.license_approved === "no") {
                        return <Row justify='center' gutter={16} className='mt-4'>
                        <Col lg={10} sm={24} xs={24}>
                            <div className='car p-2 bs1'>
                                <div className='car-content d-flex align-items-center justify-content-between'>
                                    <div>
                                        <p>username:{user.username}</p>
                                        <p>contact no:{user.phoneno}</p>
                                        <p>email:{user.email}</p>
                                        <p>license no:{user.license_no}</p>
                                    </div>
                                    <div>
                                        <Button className='btn1 mr-2' onClick={() => { onFinish1(user._id) }} >Approved</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        </Row>
                    }
                })}
            </TabPlane>
            </Tabs>
        </DefaultLayout >
    )
}

export default Admin