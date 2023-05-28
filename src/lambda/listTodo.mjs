import { ddbDocClient, tableName } from "../config/ddbDocClient.mjs";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async (event, context) => {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };
  const params = {
    TableName: tableName,
  };

  try {
    body = await ddbDocClient.send(new ScanCommand(params));
    body = body.Items;
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
