// Import existing test libs
const { expect } = require('chai');
const { describe, it } = require('mocha');

// Import function to test  
const { showUsersTemplate } = require('../views/show-users');

describe('showUsersTemplate', () => {

  it('should render no users text when no users passed in', () => {
    const html = showUsersTemplate([]);
    
    expect(html).to.contain('<p>No users found.</p>');
  });

  it('should render user details when users array passed in', () => {
    const users = [{
      userName: 'testUser',
      addedOn: '01/01/2020', 
      email: 'test@example.com'
    }];

    const html = showUsersTemplate(users);

    expect(html).to.contain('testUser');
    expect(html).to.contain('01/01/2020');
    expect(html).to.contain('test@example.com');
  });

});
