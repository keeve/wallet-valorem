export const handler = async (event: any) => {
    console.log(event);
    return {
      statusCode: 200,
      body: JSON.stringify({ route: event.routeKey, status: "ok" }, null, 2),
    };

    /*
    const userID = req.params.id;
        
        const wallet = await WalletService.findByUserID(userID)
        
        if (wallet) {
          res.json(wallet);
        } else {
          res.status(404).json({ message: "wallet not found" });
        }
    */
  };