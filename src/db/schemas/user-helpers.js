// User helper functions for API endpoints
import User from "./User";

export async function getUserByEmail(email) {
  return await User.findOne({ email });
}

export async function createUser({ email, password, name }) {
  // You may want to split name into firstName and lastName if needed
  const [firstName, ...lastNameArr] = name.split(" ");
  const lastName = lastNameArr.join(" ");
  return await User.create({
    email,
    password,
    firstName,
    lastName,
    status: true,
  });
}
