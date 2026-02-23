const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // Create Admin
    const admin = await prisma.admin.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: 'password123', // In production, hash this!
        },
    });
    console.log('Created Admin:', admin);

    // Create Zones
    const zonesData = [
        { zoneName: 'Main Entrance', crowdLevel: 'Low' },
        { zoneName: 'Sanctum Sanctorum', crowdLevel: 'High' },
        { zoneName: 'East Gate', crowdLevel: 'Medium' },
        { zoneName: 'West Gate', crowdLevel: 'Low' },
        { zoneName: 'Annadhanam Hall', crowdLevel: 'Medium' },
    ];

    for (const z of zonesData) {
        const zone = await prisma.zone.upsert({
            where: { zoneName: z.zoneName },
            update: {},
            create: z,
        });
        console.log(`Created Zone: ${zone.zoneName}`);
    }

    // Create Medical Center
    await prisma.medicalCenter.createMany({
        data: [
            { name: 'Main Medical Room', location: 'Near East Gate', contactNumber: '108' },
            { name: 'First Aid Post 1', location: 'Near Queue Complex', contactNumber: '9998887776' },
        ],
    });
    console.log('Created Medical Centers');

    // Create Routes
    await prisma.route.createMany({
        data: [
            { startPoint: 'Main Entrance', endPoint: 'Sanctum Sanctorum', congestionLevel: 'High' },
            { startPoint: 'East Gate', endPoint: 'Sanctum Sanctorum', congestionLevel: 'Medium' },
        ],
    });
    console.log('Created Routes');

    // Create Temple Info
    await prisma.templeInfo.createMany({
        data: [
            { title: 'Darshan Timings', description: 'Morning: 6 AM - 12 PM, Evening: 4 PM - 9 PM' },
            { title: 'Dress Code', description: 'Traditional attire required.' },
        ],
    });
    console.log('Created Temple Info');

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
