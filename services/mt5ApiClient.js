const axios = require('axios'); // Axios for HTTP requests

async function createUser(userData, mt4Details) {
    const data = {
        group: groupData.name,
        name: userData.name,
        // Include relevant MT5 details from the program
    };
    // URL for the MT5 server endpoint
    const url = 'MT5_SERVER_ENDPOINT';

    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error sending data to MT5:', error);
        throw error;
    }
}

module.exports = { createUser };