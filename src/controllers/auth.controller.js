const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const nodemailer = require('nodemailer');
const { handleGetContentEmail } = require('../config/contentEmail');
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  const { access, refresh } = tokens;
  const dataUser = user._doc
  delete dataUser.password
  const data = {
    access_token: access.token,
    refresh_token: refresh.token,
    expires: new Date(access.expires) * 1,
    expiresrefresh_token: new Date(refresh.expires) * 1,
    user: dataUser
  }
  // return res.send({ user, tokens });
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'notifications.tikitaka@gmail.com',
      pass: 'kpuw oxra yldr zlcu'
    }
  });

  const mailOptions = {
    from: 'notifications.tikitaka@gmail.com',
    to: dataUser.email,
    subject: 'Chào mừng bạn đến với sàn thương mại điện tử Tiki Taka',
    text: "",
    html: handleGetContentEmail(dataUser.name, 'Tiki Taka', 'http://localhost:3456', 'http://localhost:3456', '')
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  return res.status(httpStatus.CREATED).json({ data });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  const { access, refresh } = tokens;
  const dataUser = user._doc
  const data = {
    access_token: access.token,
    refresh_token: refresh.token,
    expires: new Date(access.expires) * 1,
    expiresrefresh_token: new Date(refresh.expires) * 1,
    user: dataUser
  }

  return res.status(httpStatus.CREATED).json({ data });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send({ message: "Logout successfully" });
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
