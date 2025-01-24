// create dead letter queue
export const dlq = new sst.aws.Queue("PaymentQueueDLQ");

export const queue = new sst.aws.Queue("PaymentQueue", {
  dlq: dlq.arn,
});

export const paymentTbl = new sst.aws.Dynamo("payments", {
    fields: {
      id: "string",
    },
    primaryIndex: { hashKey: "id" },
    stream: "new-and-old-images",
});

export const walletTbl = new sst.aws.Dynamo("wallet", {
    fields: {
      id: "string",
    },
    primaryIndex: { hashKey: "id" }
  });