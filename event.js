const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
app.use(express.json());

let users = [];
let events = [];

// Register
function registerUser(username, email, password) 
{
    if (users.some(user => user.email === email)) 
    {
        return 'User already exists';
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ username, email, password: hashedPassword });
    return 'User registered';
}

// Login
function loginUser(email, password) 
{
    const user = users.find(user => user.email === email);
    if (!user || !bcrypt.compareSync(password, user.password)) 
    {
        return 'Invalid credentials';
    }
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Event creation
function createEvent(email, name, description, date, category, reminderTime) 
{
    const newEvent = { 
        id: events.length + 1, 
        email, name, description, date, category, reminderTime 
    };
    events.push(newEvent);
    return newEvent;
}


function getUserEvents(email) {
    return events.filter(event => event.email === email).sort((a, b) => new Date(a.date) - new Date(b.date));
}


console.log(registerUser('Kisa', 'kisa@example.com', 'password123'));
console.log(registerUser('Hania', 'hania@example.com', 'password123'));
console.log(registerUser('Maham', 'maham@example.com', 'password123'));
console.log(registerUser('Areeba', 'areeba@example.com', 'password123'));
console.log(registerUser('Sumera', 'sumera@example.com', 'password123'));

console.log(loginUser('kisa@example.com', 'password123'));
console.log(createEvent('hania@example.com', 'Meeting', 'Team meeting', '2024-10-15', 'Work', '2024-10-14'));
console.log(createEvent('maham@example.com', 'Birthday Party', 'Celebrating birthday', '2024-11-20', 'Personal', '2024-11-19'));
console.log(createEvent('areeba@example.com', 'Doctor Appointment', 'Annual checkup', '2024-12-05', 'Health', '2024-12-04'));
console.log(createEvent('sumera@example.com', 'Conference', 'Tech conference', '2025-01-10', 'Work', '2025-01-09'));

console.log(getUserEvents('hania@example.com'));
console.log(getUserEvents('maham@example.com'));
console.log(getUserEvents('areeba@example.com'));
console.log(getUserEvents('sumera@example.com'));

// Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { registerUser, loginUser, createEvent, getUserEvents, app };