const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all zones with crowd levels
exports.getZones = async (req, res) => {
    try {
        const zones = await prisma.zone.findMany();
        res.json(zones);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch zones' });
    }
};

// Get a single zone by ID
exports.getZoneById = async (req, res) => {
    const { id } = req.params;

    try {
        const zone = await prisma.zone.findUnique({
            where: { id: parseInt(id) },
            include: { alerts: true }
        });

        if (!zone) {
            return res.status(404).json({ error: `Zone with id ${id} not found` });
        }

        res.json(zone);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch zone', details: error.message });
    }
};

// Update crowd level for a zone
exports.updateZoneCrowdLevel = async (req, res) => {
    const { id } = req.params;
    const { crowdLevel } = req.body;

    // Validate crowdLevel input
    if (!crowdLevel) {
        return res.status(400).json({ error: 'crowdLevel is required' });
    }

    const validLevels = ['Low', 'Medium', 'High'];
    if (!validLevels.includes(crowdLevel)) {
        return res.status(400).json({
            error: 'Invalid crowdLevel. Must be one of: Low, Medium, High'
        });
    }

    try {
        const zone = await prisma.zone.update({
            where: { id: parseInt(id) },
            data: {
                crowdLevel,
                lastUpdated: new Date()
            },
        });

        // Check if alert needs to be generated
        if (crowdLevel === 'High') {
            await prisma.alert.create({
                data: {
                    zoneId: zone.id,
                    alertType: 'Congestion',
                    severity: 'Critical',
                },
            });
        }

        res.json(zone);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: `Zone with id ${id} not found` });
        }
        res.status(500).json({ error: 'Failed to update zone', details: error.message });
    }
};

// Get all alerts
exports.getAlerts = async (req, res) => {
    try {
        const alerts = await prisma.alert.findMany({
            include: { zone: true },
            orderBy: { timestamp: 'desc' },
        });
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch alerts' });
    }
};
