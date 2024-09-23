import CryptoJS from 'crypto-js';

// Certifique-se de que a chave secreta está definida
const secretKey: string = process.env.REACT_APP_SECRET_KEY || '';

export const encryptData = (data: any) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encryptedData;
};

export const decryptData = (encryptedData: any) => {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};
