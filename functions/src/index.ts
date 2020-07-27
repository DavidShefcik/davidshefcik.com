/* eslint-disable import/prefer-default-export */

import * as functions from "firebase-functions";
import { config } from "dotenv";
import axios from "axios";

config();

export const captchaCheck = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  const { code } = req.query;

  axios
    .post(
      `https://recaptcha.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${code}`
    )
    .then((result: any) => {
      const { data } = result;
      if (data.success === true) {
        return res.status(200).json({
          message: "ok",
        });
      }
      return res.status(403).json({
        message: "failed",
      });
    })
    .catch((error: any) => {
      if (process.env.NODE_ENV === "dev") {
        console.log(error);
      }
      res.status(500).json({
        message: "error",
      });
    });
});
