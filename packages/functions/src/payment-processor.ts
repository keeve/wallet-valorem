

import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { Handler } from "aws-lambda";


const dynamoClient = new DynamoDB();

export const handler: Handler = async (event) => {
    const tableName = process.env.PaymentTable;

    console.log('Received event:', JSON.stringify(event, null, 2));
    console.log(`tableName - ${tableName}`)
    for (const { messageId, body } of event.Records) {
        console.log('SQS message %s: %j', messageId, body);
        const task = JSON.parse(body)

        await dynamoClient.send(new PutCommand({
            TableName: tableName,
            Item: task
        }));
    }
    return `Successfully processed ${event.Records.length} messages.`; 
};
