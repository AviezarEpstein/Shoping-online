const usersDao = require("../dao/users-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const crypto = require("crypto");

const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";

async function addUser(registrationData) {
  await vaidateRegistrationDetails(registrationData);
  registrationData.password = crypto
    .createHash("md5")
    .update(saltLeft + registrationData.password + saltRight)
    .digest("hex");
  registrationData.userType = "Customer";
  await usersDao.addUser(registrationData);
}

async function getAlluserDetails(userId){
  let userData = await usersDao.getAlluserDetails(userId);
  return userData;
}

function validateLoginDetails(userData) {
  if (!userData.userName) {
    throw new ServerError(ErrorType.EMPTY_INPUT);
  }

  if (!userData.password) {
    throw new ServerError(ErrorType.EMPTY_INPUT);
  }
}

async function login(user) {
  validateLoginDetails(user);
  user.password = crypto
    .createHash("md5")
    .update(saltLeft + user.password + saltRight)
    .digest("hex");
  let userLoginData = await usersDao.login(user);
  console.log(userLoginData.userId);
  const token = jwt.sign(
    {
      id: userLoginData.userId,
      role: userLoginData.userType,
      name: user.userName,
    },
    config.secret,
    { expiresIn: "7d" }
  );
  console.log(token);
  return token;
}

async function editUserDetails(userData, userId) {
  firstLastNameValidation(userData.firstName, userData.lastName);
  let isExistById = await usersDao.isUserExistById(userId);
  if (isExistById) {
    await usersDao.editUserDetails(userData, userId);
  } else {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }
}

async function editPassword(passwordData, userId) {
  passwordData.oldPassword = crypto
    .createHash("md5")
    .update(saltLeft + passwordData.oldPassword + saltRight)
    .digest("hex");
  passwordData.newPassword = crypto
    .createHash("md5")
    .update(saltLeft + passwordData.newPassword + saltRight)
    .digest("hex");
  let isOldPasswordValid = await usersDao.isOldPasswordValid(
    passwordData.oldPassword,
    userId
  );
  console.log(isOldPasswordValid);
  if (isOldPasswordValid) {
    await usersDao.changePassword(passwordData.newPassword, userId);
  } else {
    throw new ServerError(ErrorType.INCORRECT_PASSWORD);
  }
}

async function vaidateRegistrationDetails(registrationData) {
  if (await usersDao.isUserExistByName(registrationData.email)) {
    throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
  }

  if (!isValidIsraeliID(registrationData.id)) {
    throw new ServerError(ErrorType.INCORRECT_ISRAELI_ID);
  }

  if (!registrationData.email) {
    throw new ServerError(ErrorType.EMPTY_INPUT);
  }

  if (!registrationData.password) {
    throw new ServerError(ErrorType.EMPTY_INPUT);
  }

  if (registrationData.email.length > 100) {
    throw new ServerError(ErrorType.TOO_LONG_TEXT);
  }

  if (registrationData.password.length > 15) {
    throw new ServerError(ErrorType.TOO_LONG_TEXT);
  }

  // had to seperate the firstName and last name from this function because of the edit firstLastName function
  firstLastNameValidation(
    registrationData.firstName,
    registrationData.lastName
  );
}

function isValidIsraeliID(id) {
  var id = String(id).trim();
  if (id.length > 9 || id.length < 5) return false;

  // Pad string with zeros up to 9 digits
  id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

  return (
    Array.from(id, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }) %
      10 ===
    0
  );
}

function firstLastNameValidation(firstName, lastName) {
  if (!firstName) {
    throw new ServerError(ErrorType.EMPTY_INPUT);
  }

  if (!lastName) {
    throw new ServerError(ErrorType.EMPTY_INPUT);
  }
  if (firstName.length > 15) {
    throw new ServerError(ErrorType.TOO_LONG_TEXT);
  }

  if (lastName.length > 15) {
    throw new ServerError(ErrorType.TOO_LONG_TEXT);
  }
}

module.exports = {
  addUser,
  login,
  editUserDetails,
  editPassword,
  getAlluserDetails
};
