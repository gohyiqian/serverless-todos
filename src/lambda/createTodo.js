"use strict";
const uuid = require("uuid");
const AWS = require("aws-sdk");
// import { PutCommand } from "@aws-sdk/lib-dynamodb";
// import { ddbDocClient } from "../../config/ddbDocClient";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if (typeof data.text !== "string") {
    console.error("Validation Failed");
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't create the todo item.",
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      text: data.text,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the todo to the database
  // ddbDocClient.send(new PutCommand(params), (error) => {
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Could not create the todo item.",
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
