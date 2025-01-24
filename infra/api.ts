import { queue, dlq, paymentTbl, walletTbl } from "./storage";

dlq.subscribe("packages/functions/src/payment-queue-dlq.handler");

export const processorForQueue = new sst.aws.Function("queueProcessor", {
  handler: "packages/functions/src/payment-processor.handler",
  link: [paymentTbl, queue],
  url: true,
  permissions: [{
    actions: ["dynamodb:PutItem"],
    resources: [paymentTbl.arn]
  }],
  environment: {
    PaymentTable: paymentTbl.name
  }
});

processorForQueue.getSSTLink()

export const processorForStream = new sst.aws.Function("streamProcessor", {
  handler: "packages/functions/src/payment-stream.handler",
  link: [walletTbl, paymentTbl],
  url: true,
  environment: {
    WalletTable: walletTbl.name
  }
});



export const api = new sst.aws.ApiGatewayV2("WalletApi", {});
api.route("GET /wallet/:id", { handler: "packages/core/src/api/wallet.handler" }, {});
api.route("GET /payment/:id", { handler: "packages/core/src/api/payment.handler" }, {});


export const webhook = new sst.aws.ApiGatewayV2("WalletWebhook", { link:[queue] });
webhook.route("POST /webhook/payment.create", { handler: "packages/core/src/webhook.handler" });

queue.subscribe(processorForQueue.arn);
paymentTbl.subscribe("PaymentStreamSubcriber", processorForStream.arn, {});
