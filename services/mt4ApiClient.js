const axios = require('axios');


async function createNewUser(userDetails, programId) {
    // Fetch the program details using the provided programId
    const program = await Program.findById(programId);
    if (!program) {
        throw new Error('Program not found');
    }

    // Prepare the data for the MT4/MT5 API call
    const mt4RequestData = {
        group: program.tradeServerGroup,
        name: userDetails.name,
        email: userDetails.email, // Assuming you want to pass the email
        leverage: program.leverage,
        balance: program.initialBalance,
        comment: program.programName, // You might use the program name as a comment
        // ... map other necessary fields
    };;

    // Construct the full URL for creating a new MT4 user
    const url = `https://mt4api.com/api/MT4/${process.env.TRADE_PLATFORM_ID}/UserRecordNew`;
    
    // Use the token generator to get a fresh token
    const accessToken = await getAccessToken()
    // Setup the headers required by your MT4 server API
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.BEARER_TOKEN}`, // Assuming the API uses bearer token authentication
        }
    };

    try {
        // Send the POST request to the MT4 API
        const response = await axios.post(url, data, config);
        // Return the response data which should include the newly created user details
        return response.data;
    } catch (error) {
        // Log the error
        console.error('Error creating user on MT4 server:', error);

        // Depending on the nature of the error, you might want to handle it differently
        // For example, if it's an AxiosError, you can inspect `error.response` for details
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
        }

        // Rethrow the error or handle it as per your application's error handling policy
        throw error;
    }
}

module.exports = { MT4Users: createNewUser };

