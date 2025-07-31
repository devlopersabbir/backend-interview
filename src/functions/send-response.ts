import { JwtUserPayload } from "@/@types";
import env from "@/app/env";
import { AuthService } from "@/modules/auth/auth.service";
import { Response } from "express";

export const sendResponseWithJwt = <U>(
  res: Response,
  payload: JwtUserPayload,
  user: U,
  message: string
) => {
  const accessToken = AuthService.generateAccessToken(payload);

  res.cookie(env.REFRESH_TOKEN_COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "strict", // Prevent CSRF
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });

  return res.status(200).json({
    statusCode: 200,
    message,
    accessToken,
    user,
  });
};
export const sendResponseWithClearCookie = (
  cookieName: string,
  res: Response
) => {
  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};
/**
 * Send a response with various formats.
 */
export const send_response: {
  <D>(res: Response, data: D): Response; // Overload 1: res, data
  (res: Response, status: number): Response; // Overload 2: res, status
  <D>(res: Response, message: string, data?: D): Response; // Overload 3: res, message, data
  (res: Response, status: number, message: string): Response; // Overload 4: res, status, message
  <D>(res: Response, status: number, message: string, data?: D): Response; // Overload 5: res, status, message, data
} = <D extends unknown>(
  res: Response,
  statusOrMessageOrData?: number | string | object,
  messageOrData?: string | D,
  data?: D
) => {
  // Initialize status, message, and responseData
  let status: number;
  let message: string;
  let responseData: D | undefined;

  if (typeof statusOrMessageOrData === "number") {
    // Overload 2: send_response(res, status)
    status = statusOrMessageOrData;
    message = "Ok";
  } else if (typeof statusOrMessageOrData === "string") {
    // Overload 3: send_response(res, message, data)
    status = 200;
    message = statusOrMessageOrData;
    responseData = messageOrData as D;
  } else if (typeof statusOrMessageOrData === "object") {
    // Overload 1: send_response(res, data)
    status = 500;
    message = "Ok";
    responseData = statusOrMessageOrData as D;
  } else {
    // Default case
    status = 200;
    message = "Ok";
  }

  // If status and message are provided
  if (typeof messageOrData === "string") {
    // Overload 4: send_response(res, status, message)
    message = messageOrData;
    responseData = data;
  }

  // If status, message, and data are provided
  if (typeof data !== "undefined") {
    // Overload 5: send_response(res, status, message, data)
    responseData = data;
  }

  // Return the response
  return res
    .status(status)
    .json({ message, ...(responseData && { data: responseData }) });
};
