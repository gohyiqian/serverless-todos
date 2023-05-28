## Deploy

Deploy to create aws resources

```bash
serverless deploy --verbose
```

## CRUD ApiGateway-Lambda-DynamoDB

You can create, retrieve, update, or delete todos with the following commands:

### Create a Todo

```bash
curl -X POST https://xxxxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/todos --data '{ "text": "Learn Serverless" }'
```

## Local Dev Test

### Invoke Lambda

```bash
serverless invoke local --function functionName
```
