"use server";

import axios from "axios";

export async function verifyCaptcha(token) {
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
  );
  if (res.data.success) {
    return "success!";
  } else {
    throw new Error("Failed Captcha");
  }
}
export async function getPackageID() {
  return process.env.FREE_PACKAGE_ID;
}
export async function getStripeKey() {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
}
export async function getWebsiteUrl() {
  return process.env.NEXTAUTH_URL;
}
export async function getGHLApi() {
  return process.env.NEXT_PUBLIC_GHL_API_URL;
}
export async function getGHLApiKey() {
  return process.env.NEXT_PUBLIC_GHL_API_KEY;
}
export async function verifyInvisibleCaptcha(token) {
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_INVISIBLE_SECRET_KEY}&response=${token}`
  );
  if (res.data.success) {
    return "success!";
  } else {
    throw new Error("Failed Captcha");
  }
}
