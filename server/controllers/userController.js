const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get Route Suggestions
exports.getRoutes = async (req, res) => {
    const { start, end } = req.query;
    try {
        let where = {};
        if (start) where.startPoint = start;
        if (end) where.endPoint = end;

        const routes = await prisma.route.findMany({ where });

        // In a real app, we would calculate dynamic routing here based on zone crowd levels
        // For now, we return static routes with their congestion level
        res.json(routes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch routes' });
    }
};

// Get Emergency Alerts
exports.getEmergencyAlerts = async (req, res) => {
    try {
        const alerts = await prisma.alert.findMany({
            where: { severity: 'Critical' },
            orderBy: { timestamp: 'desc' },
            take: 5
        });
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch emergency alerts' });
    }
};

// Get Temple Info
exports.getTempleInfo = async (req, res) => {
    try {
        const info = await prisma.templeInfo.findMany();
        res.json(info);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch temple info' });
    }
};

// Get Medical Info
exports.getMedicalInfo = async (req, res) => {
    try {
        const medical = await prisma.medicalCenter.findMany();
        res.json(medical);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch medical info' });
    }
};
