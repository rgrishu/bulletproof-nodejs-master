import { randomBytes,createCipheriv,createDecipheriv } from 'crypto';
const algorithm = 'aes-256-cbc';
const key = randomBytes(32);
const iv = randomBytes(16);

export function encrypt(text) {
  let cipher = createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
 }
 export function  decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
 }
 export function  removeEmptyObjectFromJson(jsonData:any) {
  const filteredData = Object.entries(jsonData).reduce((x, [k, v]) => {
    if (v && k!=='action') { // not ( null, undefined, empty string)
        x[k] = v;
    }
    return x;
  }, {} as any);
  return filteredData.toString();
 }

