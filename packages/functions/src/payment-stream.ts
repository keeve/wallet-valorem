
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb"
import { Handler } from "aws-lambda";

const dynamoClient = new DynamoDB();
const WALLET_TABLE = process.env.WalletTable;

interface Payment {
    id: string;
    userID: string;
    userName: string;
    type: string;
    amount: number;
    currency: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export const handler: Handler = async (event) => {
  console.log('event stream', event);
  
  const stream = event.Records[0].dynamodb

  
  const streamPayment: Payment = {
    id: stream.NewImage.id.S,
    userID: stream.NewImage.user_id.S,
    userName: stream.NewImage.user_name.S,
    type: stream.NewImage.type.S,
    amount: stream.NewImage.amount.S,
    currency: stream.NewImage.currency.S,
    description: stream.NewImage.description.S,
    createdAt: stream.NewImage.created_at.S,
    updatedAt: stream.NewImage.updated_at.S,
  }

  const streamAmount = toCents(Number(stream.NewImage.amount.S))

  const res = await upSertWallet(stream.NewImage.user_id.S, streamAmount, streamPayment)
  
  const response = {
    statusCode: 200,
   body: res,
  };
  return response;
};


const upSertWallet = async(id: string, amount: number, payment: Payment) => {
    console.log('upsert wallet', id, amount);

    const record = await dynamoClient.send( new GetCommand({
        TableName: WALLET_TABLE,
        Key: {
        id: id
        }
    }))

    console.log('record - ', record)

    if (record && record.Item) {
        const newBalance = Number(record.Item.balance) + toCents(amount)
        const payments = record.Item.payments || []
        payments.push(payment)
        const res = await dynamoClient.send( new UpdateCommand({
        TableName: WALLET_TABLE,
        Key: {
            id: id
        },
        UpdateExpression: "set balance = :balance, payments = :payments",
        ExpressionAttributeValues: {
            ":balance": newBalance,
            ":payments": payments
        },
        ReturnValues: "UPDATED_NEW"
        }));

        return "update successful"
    }

    // insert new record
    const newWallet = {
        id: id,
        balance: toCents(amount),
        payments: [payment]
    }
    const res = await dynamoClient.send(new PutCommand({
        TableName: WALLET_TABLE,
        Item: newWallet
    }));

    console.log('res - ', res)

    return "create successful"
    
} 

const toCents = (amount: number) => {
    return Math.round((Math.abs(amount) / 100) * 10000)
}

