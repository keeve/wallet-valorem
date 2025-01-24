
export interface Wallet {
    userID: string;
    balance: number;
}

export interface Payment {
    userID: string;
    userName: string;
    type: string;
    amount: number;
    currency: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}