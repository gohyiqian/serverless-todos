// Create service client module using ES6 syntax.
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const REGION = process.env.REGION;

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({
  region: REGION,
});

export { ddbClient };