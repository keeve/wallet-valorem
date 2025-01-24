import { Resource } from "sst";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { Context, Handler } from "aws-lambda";
import {  WebEvent } from "./types";
const client = new SQSClient();

export const handler: Handler = async (event: WebEvent, context: Context) => {

  console.log(event);
  console.log(context)
  console.log(`Hello from the subscriber ${new Date().toISOString()}`)

    // send a message
    await client.send(
      new SendMessageCommand({
        QueueUrl: Resource.PaymentQueue.url,
        MessageBody: event.body
      })
    );

 
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "sent" }, null, 2),
  };
};
  /*

  import { Webhooks } from "@octokit/webhooks";

const webhooks = new Webhooks({
  secret: process.env.WEBHOOK_SECRET,
});

const handleWebhook = async (req, res) => {
  const signature = req.headers["x-hub-signature-256"];
  const body = await req.text();

  if (!(await webhooks.verify(body, signature))) {
    res.status(401).send("Unauthorized");
    return;
  }

  // The rest of your logic here
};

*/