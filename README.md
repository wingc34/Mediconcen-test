# Mediconcen-Code-Test

## How to run Frontend
Type these command in terminal of the project:

    cd client
    npm install
    npm start
    
The Frontend application is using expo to test. when user type 'npm start' in terminal, it will popup a browser tab that contain expo web page. 
You can download 'Expo Go' App in play store or app store and scan the QR code with this app. Then you can test the Frontend!

### caution!
If the frontend have network error pop in terminal, just replace the localhost of api call into local ip address!

## How to run Backend
Type these command in terminal of the project:

    cd server
    npm install
    npm start
    
### caution!
Please replace username and password in server/configs/mysql.js when testing backend.

## Create MySQL Database
Please run all sql file in sql folder in MySQL workbrench to create database in MySQL server. Also import csv/json file in database.
