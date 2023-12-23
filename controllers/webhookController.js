const ProgramModel = require('../models/program');
const crypto = require('crypto'); // Adjust the path as needed
const User = require('../models/user'); // Adjust the path as needed
const mt4ApiClient = require('../services/mt4ApiClient'); // Adjust the path as needed
const mt5ApiClient = require('../services/mt5ApiClient');

exports.handleOrderCompleted = async (req, res) => {
    // Verify the webhook signature first
    if (!verifyWebhookSignature(req)) {
        return res.status(401).send('Unauthorized: Invalid signature');
    }

    try {
        const orderData = req.body;
        // Extract product IDs and user information from the order
        for (const item of orderData.line_items) {
            const productId = item.product_id;
            const userInformation = {
                name: `${orderData.billing.first_name} ${orderData.billing.last_name}`,
                email: orderData.billing.email,
            };

            // Find the program associated with the productId
            const program = await findProgramByProductId(productId);
            if (!program) {
                console.error(`No program found for product ID: ${productId}`);
                continue; // Skip to the next item if the program is not found
            }

            // Combine user info with program details to prepare for MT4/MT5 account creation
            const mtAccountData = {
                ...userInformation,
                group: program.tradeServerGroup,
                leverage: program.leverage,
                balance: program.initialBalance,
                // ... any other details needed for MT4/MT5 account
            };

            // Decide whether to create an MT4 or MT5 account based on the program details
            const mtApiClient = program.accountPlatform === 'MT4' ? mt4ApiClient : mt5ApiClient;
            const mtAccount = await mtApiClient.createUser(mtAccountData);

            // Store the MT4/5 user details in your database and link it to the user's profile
            // ...
        }

        res.status(200).send('Order processed successfully');
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Function to find the program by the WooCommerce product ID
const findProgramByProductId = async (productId) => {
    try {
        const program = await ProgramModel.findOne({ woocommerceProductId: productId });
        return program;
    } catch (error) {
        console.error('Error finding program by product ID:', error);
        throw error;
    }
};



// Function to verify the webhook signature
const verifyWebhookSignature = (req) => {
    // Retrieve the WooCommerce signature from the request headers
    const signature = req.headers['x-wc-webhook-signature'];
    if (!signature) {
        return false;
    }

    // Use the same secret key as set in your WooCommerce webhook settings
    const secret = process.env.WOO_COMMERCE_WEBHOOK_SECRET;

    // Generate a hash of the request body using HMAC SHA256 and your secret key
    const hash = crypto.createHmac('sha256', secret)
                       .update(JSON.stringify(req.body))
                       .digest('base64');

    // Compare your hash with the signature sent in the request
    return hash === signature;
};

