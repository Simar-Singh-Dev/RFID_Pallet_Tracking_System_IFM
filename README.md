# RFID_Pallet_Tracking_System_IFM
Overview

This project is an industrial-grade RFID-based pallet tracking system developed in collaboration with IFM. The system is designed to track the location, movement, and storage duration of pallets in a warehouse environment, providing real-time insights and recommendations for optimal pallet removal.

The primary goal was to create a cost-effective, accurate, and scalable solution for warehouses, improving operational efficiency and reducing losses, particularly in perishable goods sectors such as New Zealand’s kiwifruit industry.

Background

Traditional warehouse tracking systems rely heavily on manual processes, such as barcode scanning and paperwork, which are prone to errors and inefficiencies. Problems include:

Misplaced pallets

Spoiled or over-stored goods

Lack of real-time visibility

For perishable goods, these challenges can lead to significant operational losses. The IFM project aimed to overcome these limitations with an automated RFID tracking solution integrated with a PLC system, database, and web dashboard.

Project Objectives

Implement an RFID-based tracking system for warehouse pallets.

Timestamp pallet arrivals and movements for accurate storage tracking.

Recommend pallets for removal using a First-In, First-Out (FIFO) approach.

Develop a simple user interface for warehouse workers.

Ensure the system is low-cost, scalable, and maintainable.

Scope
Included

RFID tags attached to pallets

RFID readers at key warehouse entry and storage points

Real-time pallet location tracking within defined zones

Timestamping of pallet movements

Dashboard showing pallet status and recommended removals

Integration with CODESYS PLC programming

Excluded

Full warehouse automation (e.g., robotic forklifts)

Integration with external enterprise management systems

Hardware and Software
Hardware

RFID Tags

RFID Readers

Industrial PLC Controller (Ethernet/IP compatible)

Networking equipment (router/switch)

Optional temperature and humidity sensors for perishable goods

Software

CODESYS – PLC programming and logic design

OPC UA Server/Client – for real-time data extraction

Python – for connecting OPC UA client data to SQL database

SQL Database – storage of pallet movement data

Web Dashboard (HTML/JS) – visualization of pallet location and storage status

Methods and Development

The development process involved a multi-layered approach, integrating hardware, PLC logic, data extraction, and visualization.

1. RFID Tagging and Detection

RFID tags were attached to each pallet.

RFID readers were strategically placed at warehouse entry/exit points and storage zones.

Readers detect pallet presence, capture unique IDs, and send signals to the PLC.

2. PLC Programming with CODESYS

CODESYS was used to program the PLC for:

Continuous reading of RFID data from multiple readers.

Timestamping pallet arrivals, exits, and movements between zones.

Applying rules for First-In, First-Out (FIFO) recommendations based on storage duration.

Monitoring optional sensor data such as temperature and humidity.

Anti-collision logic was implemented to handle simultaneous reads of multiple pallets.

3. OPC UA Data Extraction

OPC UA Server runs on the PLC, exposing the pallet data in a standardized communication protocol.

OPC UA Client connects to the server to extract data such as:

Pallet ID

Timestamp of movements

Current location zone

Sensor readings (if applicable)

OPC UA ensures real-time, secure, and scalable data transfer without altering the PLC logic.

4. Data Storage via Python Script

A Python script continuously retrieves data from the OPC UA client.

Extracted data is stored in an SQL database for further analysis and retrieval.

The Python script handles:

Connection retries in case of network issues

Data integrity checks

Logging of errors for debugging

5. Web Dashboard Visualization

A web-based dashboard was developed using HTML, CSS, and JavaScript.

Dashboard displays:

Pallet ID and current location

Storage duration

Recommended removal list (FIFO-based)

Optional environmental data like temperature and humidity

Provides warehouse operators with a clear and actionable interface to monitor pallet status in real-time.

6. System Integration

The system integrates hardware, PLC logic, data extraction, database storage, and visualization into a seamless workflow:

RFID readers detect pallet events.

PLC logs and processes the data.

OPC UA server exposes data to external systems.

Python extracts and stores data in SQL.

Dashboard visualizes the current state of all pallets.

This layered architecture ensures robustness, scalability, and maintainability, allowing future expansion to additional sensors or warehouse zones.

Risk Management
Risk	Mitigation
RFID read interference	Optimize antenna placement and shielding
Signal collision with multiple pallets	Implement anti-collision logic in CODESYS
Hardware compatibility issues	Conduct thorough compatibility testing before deployment
Project delays	Follow phased project plan and maintain regular progress checks
Expected Outcomes

Real-time tracking of all pallets in the warehouse.

Accurate storage duration logging and FIFO-based removal recommendations.

Improved warehouse efficiency and reduced spoilage of perishable goods.

Scalable system architecture for future expansion with additional sensors or zones.

Usage

Deploy RFID tags on pallets.

Install RFID readers at warehouse entry/exit points.

Run CODESYS PLC program to capture pallet movements and sensor readings.

Connect OPC UA client to extract data to SQL database via Python script.

Access web dashboard to monitor pallet locations, storage durations, and removal suggestions.

Contribution

Designed the end-to-end RFID tracking system.

Programmed PLC logic in CODESYS for timestamping and pallet movement analysis.

Developed Python script to connect OPC UA client data to SQL.

Created web dashboard for real-time visualization of warehouse data.

License

This project is for educational and industrial research purposes. Commercial use may require consultation with IFM.
