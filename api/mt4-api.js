const axios = require('axios');

// Define your MetaTrader server details
const server = '147.160.254.62:443'; // Replace with your MetaTrader server IP and port
const login = '110'; // Replace with your MetaTrader manager login
const password = 'rpN3xgc'; // Replace with your MetaTrader manager password
const pingSeconds = 3.14; // Replace with your desired ping interval (optional)

// Make the API request to /init/
axios
  .get(`http://mt4-api.dev4traders.com/v1/init/?server=${server}&login=${login}&password=${password}&ping_seconds=${pingSeconds}`)
  .then((response) => {
    // Handle the response here
    console.log('Response:', response.data);
  })
  .catch((error) => {
    // Handle errors here
    console.error('Error:', error.message);
  });
