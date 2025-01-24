import { WalletRepository } from "../store/wallet-repository";
import { Wallet } from "../types";

export class WalletService {

    public static async findByUserID(id: string): Promise<Wallet | undefined> {
        const walletRepo = new WalletRepository()

        return await walletRepo.findByID(id)
    }
}