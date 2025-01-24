import { WebEvent } from "../types";
import { WalletService } from "./service/wallet-service";

export const handler = async (event: WebEvent) => {
    console.log(event);

    const path = event.rawPath.split("/")
    console.log(`path len - ${path.length}`);
    
    const userID = path[path.length-1];
    const wallet = await WalletService.findByUserID(userID)
        

    if (!wallet) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "wallet not found" }),
        };
    }
    

    return {
        statusCode: 200,
        body: JSON.stringify(wallet),
    };
  };