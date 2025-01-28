export const main = async (event: any) => {
    console.log(event);
    throw new Error("Manual error");
  };
  
  export const handler = async (event: any) => {
    console.log(event);
    return "ok";
  };