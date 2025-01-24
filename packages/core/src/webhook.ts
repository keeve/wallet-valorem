import { Resource } from "sst";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { Handler } from "aws-lambda";
import {  WebEvent } from "./types";
import crypto from 'crypto'

const client = new SQSClient();

export const handler: Handler = async (event: WebEvent) => {

    console.log(event);

    if (!(event.headers.authorization)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required header: authorisation" }, null, 2),
      }
    }

  const hmacValue = event.headers.authorization.replace("HMAC_SHA256 ","")
  const sig = Buffer.from(hmacValue || "", "utf8");

  //Calculate HMAC
  const hmac = crypto.createHmac("sha256", process.env.HMAC_SECRET_KEY);
  const digest = Buffer.from(
     hmac.update(event.body).digest("hex"),
    "utf8",
  );

  //Compare HMACs
  if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
     return {
      statusCode: 401,
      body: JSON.stringify({ message: `Request body digest (${digest}) did not match (${sig})` }),
    };
  }

    // send a message
    await client.send(
      new SendMessageCommand({
        QueueUrl: Resource.PaymentQueue.url,
        MessageBody: event.body
      })
    );

 
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "payment receipt", requestId: event.requestId }, null, 2),
  };
};