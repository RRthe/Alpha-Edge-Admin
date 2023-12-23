require('dotenv').config(); // Only if this hasn't been called in your entry file
const axios = require('axios');
const qs = require('qs');

async function getAccessToken() {
  if (!process.env.AUTH_CPLUGIN_METATRADER_APP_API_CLIENT_ID_CEORR || !process.env.AUTH_CPLUGIN_METATRADER_APP_API_CLIENT_SECRET_CEORR) {
    throw new Error('Missing required environment variables for authentication');
  }

  const tokenUrl = 'https://auth.clplugin.net/connect/token';
  const data = qs.stringify({
    grant_type: 'client_credentials',
    scope: 'webapi',
    client_id: process.env.AUTH_CPLUGIN_METATRADER_APP_API_CLIENT_ID_CEORR,
    client_secret: process.env.AUTH_CPLUGIN_METATRADER_APP_API_CLIENT_SECRET_CEORR
  });

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  try {
    const response = await axios.post(tokenUrl, data, config);
    console.log('Access Token:', response.data.access_token); // You might want to remove this line in production
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to retrieve access token:', error);
    throw error;
  }
}

module.exports = {
  getAccessToken
};
