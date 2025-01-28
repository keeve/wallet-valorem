import { Resource } from "sst";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { Handler } from "aws-lambda";
import {  WebEvent } from "./types";
import crypto from 'crypto'

const client = new SQSClient();
const secretKey = "4e8ed8cb73ab6a502d02825a2912e2313a3ea7b3a9e88336083d28984de2605d"; // should not be here in prod (test purposes only)

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
  const digest = isHmacValid(event.body)

  //Compare HMACs
  if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: `Invalid key, not authorised` }),
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

export const isHmacValid = (body: any): Buffer<ArrayBuffer> => {
  const msg = body || ""
  const key = process.env.HMAC_SECRET_KEY || secretKey;

  //Calculate HMAC
  const digest = Buffer.from(
    crypto.createHmac("sha256", key).update(msg).digest("hex"),
    "utf8",
  );
  
  return digest
}