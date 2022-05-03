import bcrypt from "bcryptjs";
import ncrypt from "ncrypt-js";

const pwd = process.env.CRYPTO_PWD
const ncryptObject = new ncrypt(pwd)

export const encryptData = async(data) => {
  return ncryptObject.encrypt(data)
}

export const decryptData = async(data) => {
  return ncryptObject.decrypt(data)
}

export const checkPasswordNCrypt = async(user, password) => {
  const userDecripted = await decryptData(user.password)
  return password === userDecripted
}


export const createPasswordHash = async(password) =>
  bcrypt.hash(password, 8)

export const checkPassword = async(user, password) =>
  bcrypt.compare(password, user.password)