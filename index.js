const ApiBuilder = require("claudia-api-builder"),
  AWS = require("aws-sdk");
var api = new ApiBuilder(),
  dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post(
  "/create",
  function(request) {
    // SAVE your user data
    var params = {
      TableName: "users",
      Item: {
        username: request.body.username,
        schedules: request.body.schedules // save user schedules
      }
    };
    return dynamoDb.put(params).promise(); // returns dynamo result
  },
  { success: 201 }
); // returns HTTP status 201 - Created if successful

api.get(`/{name}`, function(request) {
  // GET user

  return dynamoDb
    .get({
      TableName: "users",
      Key: {
        username: request.pathParams.name
      }
    })
    .promise()
    .then(response => {
      return response.Item;
    });
});

module.exports = api;
