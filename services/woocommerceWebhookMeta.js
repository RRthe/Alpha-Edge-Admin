const { createUser } = require('./mt4ApiClient');// Your module that interacts with the MT4 API
const { createUser } = require('./mt5ApiClient');// Your module that interacts with the MT5 API
const Program = require('./models/program'); // Assuming you have a Program model

async function handleNewPurchase(woocommerceOrder) {
  // Extract product ID and user information from the order
  const productId = woocommerceOrder.product_id;
  const userEmail = woocommerceOrder.billing.email;
  
  // Find the program associated with the WooCommerce product ID
  const program = await findProgramByProductId(productId);
  if (!program) {
    throw new Error(`No program found for product ID: ${productId}`);
  }

  // User data you need to create an account on MT4/5
  const userData = {
    name: woocommerceOrder.billing.first_name + ' ' + woocommerceOrder.billing.last_name,
    email: userEmail,
  };

  // MT4/5 details from the purchased program
  const mt4Details = {
    group: program.tradeServerGroup,
    leverage: program.leverage,
    initialBalance: program.initialBalance,
    // ... add other details as required by your createUser function
  };
  // Determine the correct function to create the user on MT4 or MT5
  const createUserFunction = program.accountPlatform === 'MT4' ? createUserMT4 : createUserMT5;

  // Create the user on the MT4/5 platform
  try {
    const mtUser = await createUserFunction(userData, mtDetails);
    // Link the MT4/5 user details in your database and perform post-creation actions
    // ...
    console.log('MT user created successfully:', mtUser);
  } catch (error) {
    console.error('Error creating user on MT platform:', error);
    // Handle the error appropriately
  } 
  // Store the MT4/5 user details in your database
  await linkMtUserToAccount(mtUser, woocommerceOrder.customer_id);

  // Send confirmation email to the user, alert emails to the admin, etc.
  await sendConfirmationEmail(userEmail, program.programName);
}

// Implement these functions based on your application's logic and database
async function findProgramByProductId(productId) {
  // ... fetch program from database using productId ...
}

async function linkMtUserToAccount(mtUser, customerId) {
  // ... link MT4/5 account details with the user's account in your system ...
}

async function sendConfirmationEmail(userEmail, programName) {
  // ... send an email to the user confirming the purchase and account creation ...
}


module.exports = {
  handleNewPurchase
};