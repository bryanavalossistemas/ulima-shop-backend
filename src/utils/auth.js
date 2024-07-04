import bcrypt from "bcrypt";

export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
    throw Error;
  }
}

export async function checkPassword(enteredPassword, storedHash) {
  try {
    return await bcrypt.compare(enteredPassword, storedHash);
  } catch (error) {
    console.log(error);
    throw Error;
  }
}