import React from 'react';
import DefaultLayout from '../compounds/DefaultLayout';
import { Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom'
function FrontPage() {
    return (
        <DefaultLayout>
            <Row justify='space-evenly' gutter={16} className='mt-4 row-8'>
                        <Col>
                            <Button className='btn1'><Link to='/'>Rent a Car</Link></Button>
                        </Col>
                        <Col>
                            <Button className='btn1'><Link to='/HostCar'>Host a Car</Link></Button>
                        </Col>
            </Row> 
        </DefaultLayout>
    )
}

export default FrontPage
