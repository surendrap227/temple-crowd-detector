import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Container, Tabs, Tab, Form, Button, Card, Alert, ListGroup, Row, Col, Badge } from 'react-bootstrap';

const UserApp = () => {
    const [key, setKey] = useState('routes');
    const [routes, setRoutes] = useState([]);
    const [medical, setMedical] = useState([]);
    const [templeInfo, setTempleInfo] = useState([]);
    const [emergencyAlerts, setEmergencyAlerts] = useState([]);
    const [zones, setZones] = useState([]); // needed for route selection

    const [startPoint, setStartPoint] = useState('');
    const [endPoint, setEndPoint] = useState('');

    useEffect(() => {
        fetchEmergencyAlerts();
        fetchTempleInfo();
        fetchMedicalInfo();
        fetchZones(); // reusing admin API or generic public API if available. 
        // In real app, user might use a public endpoint. admin/zones is fine for demo unless secured.
        // Actually admin/zones is "view crowd", maybe user needs "view zones list"?
        // using admin endpoint for demo simplicity (no auth yet).
    }, []);

    const fetchZones = async () => {
        try {
            const res = await api.get('/admin/zones');
            setZones(res.data);
        } catch (error) {
            console.error('Error fetching zones', error);
        }
    };

    const fetchEmergencyAlerts = async () => {
        try {
            const res = await api.get('/user/alerts/emergency');
            setEmergencyAlerts(res.data);
        } catch (error) {
            console.error('Error fetching alerts', error);
        }
    };

    const fetchTempleInfo = async () => {
        try {
            const res = await api.get('/user/temple-info');
            setTempleInfo(res.data);
        } catch (error) {
            console.error('Error fetching temple info', error);
        }
    };

    const fetchMedicalInfo = async () => {
        try {
            const res = await api.get('/user/medical');
            setMedical(res.data);
        } catch (error) {
            console.error('Error fetching medical info', error);
        }
    };

    const handleRouteSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await api.get(`/user/routes?start=${startPoint}&end=${endPoint}`);
            setRoutes(res.data);
        } catch (error) {
            console.error('Error fetching routes', error);
        }
    };

    return (
        <Container className="mb-5">
            <h2 className="text-center mb-3">Pilgrim Assistant</h2>

            {emergencyAlerts.length > 0 && (
                <Alert variant="danger" className="mb-3">
                    <Alert.Heading>Critical Alerts</Alert.Heading>
                    {emergencyAlerts.map(alert => (
                        <div key={alert.id}>
                            <strong>{alert.alertType}:</strong> {alert.zone ? alert.zone.zoneName : 'General'} (Time: {new Date(alert.timestamp).toLocaleTimeString()})
                        </div>
                    ))}
                </Alert>
            )}

            <Tabs
                id="user-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                fill
            >
                <Tab eventKey="routes" title="Find Route">
                    <Card>
                        <Card.Body>
                            <Card.Title>Safe Route Finder</Card.Title>
                            <Form onSubmit={handleRouteSearch}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Start Point</Form.Label>
                                    <Form.Select value={startPoint} onChange={(e) => setStartPoint(e.target.value)}>
                                        <option>Select Start Point</option>
                                        {zones.map(z => <option key={z.id} value={z.zoneName}>{z.zoneName}</option>)}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Destination</Form.Label>
                                    <Form.Select value={endPoint} onChange={(e) => setEndPoint(e.target.value)}>
                                        <option>Select Destination</option>
                                        {zones.map(z => <option key={z.id} value={z.zoneName}>{z.zoneName}</option>)}
                                    </Form.Select>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">Find Route</Button>
                            </Form>

                            {routes.length > 0 && (
                                <div className="mt-4">
                                    <h5>Suggested Routes:</h5>
                                    <ListGroup>
                                        {routes.map(route => (
                                            <ListGroup.Item key={route.id} variant={route.congestionLevel === 'High' ? 'danger' : 'success'}>
                                                {route.startPoint} ➔ {route.endPoint}
                                                <Badge bg={route.congestionLevel === 'High' ? 'danger' : 'success'} className="float-end">
                                                    {route.congestionLevel} Congestion
                                                </Badge>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="info" title="Temple Info">
                    <Row xs={1} md={2} className="g-4">
                        {templeInfo.map(info => (
                            <Col key={info.id}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{info.title}</Card.Title>
                                        <Card.Text>{info.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Tab>

                <Tab eventKey="medical" title="Medical Help">
                    <ListGroup>
                        {medical.map(m => (
                            <ListGroup.Item key={m.id}>
                                <h5>{m.name}</h5>
                                <p className="mb-1"><strong>Location:</strong> {m.location}</p>
                                <p className="mb-1 text-danger"><strong>Emergency:</strong> {m.contactNumber}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default UserApp;
