import crpto from "crypto";

/**
 * Generate 6 digit random code for short url which a-z, A-Z, 0-9
 */


export const generateCode = () => {
  
    const mainString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let shortCode = "";

    for (let i = 0; i < 6; i++) {
        shortCode += mainString.charAt(Math.floor(Math.random() * mainString.length));
    }
    console.log("shortCode", shortCode);
    return shortCode;
};

generateCode();
export default generateCode;