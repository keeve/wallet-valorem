import { WebEvent } from "../types";
import { PaymentService } from "./service/payment-service";

export const handler = async (event: WebEvent) => {
    console.log(event);
   
    const path = event.rawPath.split("/")
    const userID = path[path.length-1];

    const payments = await PaymentService.findByUserID(userID)
    
    if (!payments.length) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "transactions not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(payments),
    }
    
  };