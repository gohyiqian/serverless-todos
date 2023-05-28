import { ddbDocClient, tableName } from "../config/ddbDocClient.mjs";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async (event, context) => {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };
  const timestamp = new Date().getTime();
  let requestJSON = JSON.parse(event.body);

  const params = {
    TableName: tableName,
    Item: {
      id: requestJSON.id,
      text: requestJSON.text,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  try {
    await ddbDocClient.send(new PutCommand(params));
    body = `Put item ${requestJSON.id}`;
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
