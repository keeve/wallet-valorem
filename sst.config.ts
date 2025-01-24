/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "wallet-valorem",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    // Create a permission boundary
    /*
    const permissionsBoundary = new aws.iam.Policy("WalletPermissionsBoundary", {
      policy: aws.iam.getPolicyDocumentOutput({
        statements: [
          {
            actions: ["dynamodb:*"],
            resources: ["*"],
          },
        ],
      }).json,
    });

    // Apply the boundary to all roles
    $transform(aws.iam.Role, (args) => {
      args.permissionsBoundary = permissionsBoundary.arn;
    });
    */

    const storage = await import("./infra/storage");
    await import("./infra/api");
    
    return {
      PaymentTable: storage.paymentTbl.name,
      WalletTable: storage.walletTbl.name,
      PaymentQueue: storage.queue.url,
    };
  },
});
