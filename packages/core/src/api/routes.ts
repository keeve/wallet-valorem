import { Router, Request, Response } from "express";
import { WalletService } from "./service/wallet-service";
import { PaymentService } from "./service/payment-service";

const router = Router();

// Get wallet by userID
router.get("/wallet/:id", async (req: Request, res: Response) => {
    const userID = req.params.id;
    
    const wallet = await WalletService.findByUserID(userID)
    
    if (wallet) {
      res.json(wallet);
    } else {
      res.status(404).json({ message: "wallet not found" });
    }
});


// Get payments by userID
router.get("/payment/:id", async (req: Request, res: Response) => {
    const userID = req.params.id;
    
    const payment = await PaymentService.findByUserID(userID)
    
    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ message: "payment transactions not found" });
    }
});

export default router;