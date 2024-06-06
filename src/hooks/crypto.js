import { enc, AES } from 'crypto-js';


const secretKey = process.env.REACT_APP_SECREAT_KEY;

export const encrypt = (data) => {
  let dataString;

  if (Number.isInteger(data)) {
    // If input is an integer, convert it to string
    dataString = String(data);
  } else if (typeof data === 'string') {
    // If input is already a string, use it as is
    dataString = data;
  } else {
    // Throw an error for unsupported data types
    throw new Error('Input must be an integer or a string for encryption.');
  }

  const ciphertext = AES.encrypt(dataString, secretKey);
  return ciphertext.toString();
};

export const decrypt = (ciphertext) => {
  const bytes = AES.decrypt(ciphertext, secretKey);

  // Convert decrypted string back to integer or use it as is
  const decryptedDataString = bytes.toString(enc.Utf8);
  const decryptedData = !isNaN(decryptedDataString) ? parseInt(decryptedDataString, 10) : decryptedDataString;

  return decryptedData;
};