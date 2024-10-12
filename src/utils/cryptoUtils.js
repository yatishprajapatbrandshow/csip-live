import CryptoJS from 'crypto-js';

const SECRET_KEY = 'gfF5-!jd78gH38$sb73'; // Replace with your actual secret key

export const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};
