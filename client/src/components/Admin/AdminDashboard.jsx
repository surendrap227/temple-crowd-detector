import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Card, Button, Badge, Row, Col, Table, Alert } from 'react-bootstrap';

const AdminDashboard = () => {
    const [zones, setZones] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        fetchZones();
        fetchAlerts();
        const interval = setInterval(() => {
            fetchZones();
            fetchAlerts();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchZones = async () => {
        try {
            const res = await api.get('/admin/zones');
            setZones(res.data);
        } catch (error) {
            console.error('Error fetching zones:', error);
        }
    };

    const fetchAlerts = async () => {
        try {
            const res = await api.get('/admin/alerts');
            setAlerts(res.data);
        } catch (error) {
            console.error('Error fetching alerts:', error);
        }
    };

    const updateCrowdLevel = async (id, level) => {
        try {
            await api.post(`/admin/zones/${id}/update`, { crowdLevel: level });
            fetchZones();
            fetchAlerts();
        } catch (error) {
            console.error('Error updating zone:', error);
        }
    };

    const getVariant = (level) => {
        if (level === 'High') return 'danger';
        if (level === 'Medium') return 'warning';
        return 'success';
    };

    return (
        <div>
            <h2 className="mb-4">Admin Dashboard - Crowd Monitoring</h2>

            {alerts.length > 0 && (
                <Alert variant="danger">
                    <Alert.Heading>Active Congestion Alerts!</Alert.Heading>
                    {alerts.map(alert => (
                        <p key={alert.id}>
                            {alert.severity}: {alert.alertType} at Zone ID {alert.zoneId} ({new Date(alert.timestamp).toLocaleTimeString()})
                        </p>
                    ))}
                </Alert>
            )}

            <Row xs={1} md={2} lg={3} className="g-4 mb-5">
                {zones.map(zone => (
                    <Col key={zone.id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <Card.Title>{zone.zoneName}</Card.Title>
                                <Card.Text>
                                    Current Density: <Badge bg={getVariant(zone.crowdLevel)}>{zone.crowdLevel}</Badge>
                                </Card.Text>
                                <div className="d-grid gap-2">
                                    <Button variant="outline-success" size="sm" onClick={() => updateCrowdLevel(zone.id, 'Low')}>Set Low</Button>
                                    <Button variant="outline-warning" size="sm" onClick={() => updateCrowdLevel(zone.id, 'Medium')}>Set Medium</Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => updateCrowdLevel(zone.id, 'High')}>Set High</Button>
                                </div>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                Last updated: {new Date(zone.lastUpdated).toLocaleTimeString()}
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            <h3>Recent Alerts Log</h3>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Zone ID</th>
                        <th>Type</th>
                        <th>Severity</th>
                    </tr>
                </thead>
                <tbody>
                    {alerts.map(alert => (
                        <tr key={alert.id}>
                            <td>{new Date(alert.timestamp).toLocaleString()}</td>
                            <td>{alert.zoneId}</td>
                            <td>{alert.alertType}</td>
                            <td><Badge bg="danger">{alert.severity}</Badge></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminDashboard;
