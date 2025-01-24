export const handler = async (event: any) => {
    console.log(event);
    return {
      statusCode: 200,
      body: JSON.stringify({ route: event.routeKey, status: "ok" }, null, 2),
    };
    /*

    const payment = await PaymentService.findByUserID(userID)
    
    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ message: "payment transactions not found" });
    }
    */
  };