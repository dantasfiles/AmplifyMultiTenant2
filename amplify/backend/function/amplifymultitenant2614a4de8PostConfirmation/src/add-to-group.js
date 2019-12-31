/* eslint-disable-line */ const aws = require('aws-sdk');
exports.handler = async (event, context, callback) => {
  const cisp = new aws.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
  });
  const tenant = ''; // ADD TENANT LOGIC HERE
  const groupParams = {
    GroupName: tenant,
    UserPoolId: event.userPoolId,
  };
  const addUserParams = {
    GroupName: tenant,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
  try {
    await cisp.getGroup(groupParams).promise();
  } catch (e) {
    await cisp.createGroup(groupParams).promise();
  }
  try {
    await cisp.adminAddUserToGroup(addUserParams).promise();
    callback(null, event);
  } catch (e) {
    callback(e);
  }
};
