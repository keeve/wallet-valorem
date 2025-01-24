import { PaymentRepository } from "../store/payment-repository";
import { Payment } from "../types";

export class PaymentService {

    public static async findByUserID(id: string): Promise<Payment[]> {
        const paymentRepo = new PaymentRepository()
        return await paymentRepo.findByID(id)
    }
}