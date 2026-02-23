1. Product Overview
Product Name

Smart Crowd Monitoring & Pilgrim Assistance System

Purpose

The purpose of this system is to monitor crowd density in real time at temples and religious gatherings and to assist pilgrims with navigation, safety alerts, medical help, and information, using a web-based platform.

The system is divided into two major modules:

Admin Side (Crowd Monitoring)

User Side (Pilgrim Assistance)

2. Problem Statement

Large religious events often face challenges such as:

Overcrowding and congestion

Delayed emergency response

Lack of real-time crowd information

Difficulty in guiding pilgrims safely

Limited access to medical and temple-related information

Manual monitoring is inefficient and error-prone. Hence, a digital crowd monitoring and assistance system is required.

3. Objectives

Monitor crowd density in different temple zones

Detect and alert congestion situations

Provide safe route suggestions to pilgrims

Send emergency alerts

Display temple-related information

Provide medical assistance details

4. Target Users
Admin Users

Temple authorities

Event organizers

Security personnel

End Users

Pilgrims

Visitors

5. System Architecture (High-Level)
Frontend (React + Bootstrap)
        |
        | REST APIs
        |
Backend (Node.js + Express)
        |
Prisma ORM
        |
Database (SQLite)
6. Functional Requirements
6.1 Admin Side – Crowd Monitoring
6.1.1 View Crowd Density

Description:
Admins can view real-time or simulated crowd density for different temple zones.

Features:

Zone-wise crowd display (Low / Medium / High)

Color-coded indicators:

Green → Low

Yellow → Moderate

Red → High

Refresh or auto-update data

Data Source:

Manual entry / simulated data

Future scope: camera & sensor integration

6.1.2 View Congestion Alerts

Description:
Automatically alerts admins when crowd density crosses a predefined threshold.

Features:

Alert list with:

Zone name

Crowd level

Time detected

Alert severity levels

Admin acknowledgment option

6.2 User Side – Pilgrim Assistance
6.2.1 Route Suggestions

Description:
Suggests safer and less crowded routes inside the temple premises.

Features:

Start and destination selection

Route based on current crowd density

Alternative route suggestions

Simple map or directional text

6.2.2 Emergency Alerts

Description:
Pilgrims receive alerts during emergencies.

Features:

Notifications for:

Overcrowding

Stampede risk

Fire or medical emergencies

Display emergency instructions

Emergency contact numbers

6.2.3 Temple Information

Description:
Provides general information about the temple.

Features:

Temple timings

Darshan schedules

Entry & exit gates

Important announcements

Rules and guidelines

6.2.4 Medical Assistance Information

Description:
Helps pilgrims find medical support quickly.

Features:

Location of medical camps

Available doctors/first aid

Emergency ambulance numbers

Instructions for basic first aid

7. Non-Functional Requirements

Usability: Simple and easy-to-use UI

Performance: Fast API response time

Scalability: Can be extended to real sensors & multiple temples

Security: Basic authentication for admin

Reliability: Alerts should not fail during high load

8. Technology Stack
Frontend

React.js – Component-based UI

Bootstrap – Responsive design & styling

Axios – API communication

Backend

Node.js – Runtime environment

Express.js – REST API framework

Database

SQLite – Lightweight relational database

ORM

Prisma – Database modeling and query handling

9. Database Design (Using Prisma)
9.1 Tables
Admin

id

username

password

Zones

id

zoneName

crowdLevel

lastUpdated

Alerts

id

zoneId

alertType

severity

timestamp

Routes

id

startPoint

endPoint

congestionLevel

MedicalCenters

id

name

location

contactNumber

TempleInfo

id

title

description

10. API Requirements (Sample)
Admin APIs

GET /api/zones – View crowd density

GET /api/alerts – View congestion alerts

POST /api/zones/update – Update crowd level

User APIs

GET /api/routes – Get route suggestions

GET /api/alerts/emergency – Emergency alerts

GET /api/temple-info – Temple information

GET /api/medical – Medical assistance info

11. UI Requirements
Admin Dashboard

Crowd density cards

Alert table

Zone management panel

User Interface

Home page

Route suggestion page

Emergency alerts page

Temple info page

Medical help page

12. Assumptions & Constraints

Crowd data is simulated or manually entered

Internet connectivity is required

SQLite is used for academic/demo purposes

AI prediction is rule-based, not ML-based (for now)

13. Future Enhancements

AI-based crowd prediction

Camera & IoT sensor integration

Mobile app version

Push notifications

Heat maps

Multi-language support

14. Success Metrics

Reduced congestion incidents

Faster emergency response

Improved pilgrim satisfaction

Accurate crowd visualization