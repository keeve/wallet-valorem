import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb"
import { Payment } from '../types';

export class PaymentRepository {

    private readonly tableName: string
        private readonly dbClient
    
        constructor() {
            this.tableName = process.env.WalletTable || ''
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