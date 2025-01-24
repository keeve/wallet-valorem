import AWS from 'aws-sdk'
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb"
import { Service } from 'typedi'
import { Payment } from '../types';


@Service()
export class PaymentRepository {

    private readonly tableName: string
        private readonly dbClient
    
        constructor() {
            this.tableName = process.env.DYNAMODB_WALLET_TABLE || 'rawPaymentNotifications'
            this.dbClient =  new DynamoDB();
        }
    
        async findByID(id: string): Promise<Payment[]> {
            const record = await this.dbClient.send( new GetCommand({
                TableName: this.tableName,
                Key: {
                    id: id
                }
            }))
            
            if (record && record.Item) {
               return record.Item.payments
            }
            return [];
        }
    
    }