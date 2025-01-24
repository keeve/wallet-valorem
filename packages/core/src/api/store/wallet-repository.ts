import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { GetCommand, NativeAttributeValue } from "@aws-sdk/lib-dynamodb"

import { Service } from 'typedi'
import { Wallet } from '../types';


@Service()
export class WalletRepository {

    private readonly tableName: string
    private readonly dbClient

    constructor() {
        this.tableName = process.env.DYNAMODB_WALLET_TABLE || 'wallet'
        this.dbClient =  new DynamoDB();
    }

    async findByID(id: string): Promise<Wallet | undefined> {
        const record = await this.dbClient.send( new GetCommand({
            TableName: this.tableName,
            Key: {
              id: id
            }
          }))

        if (record && record.Item) {
            return convertToWallet(record.Item)
        }
        return undefined;
    }

    
}

const convertToWallet = (item: Record<string, NativeAttributeValue>): Wallet => {
    const wallet: Wallet = {
        userID: item.id,
        balance: item.balance
    }
    return wallet
}