import { Request, Response, NextFunction } from "express";
import config from "../config.js";
import ipRangeCheck from "ip-range-check";
import crypto from "crypto";

const cloudFlareIps = [
  "173.245.48.0/20",
  "103.21.244.0/22",
  "103.22.200.0/22",
  "103.31.4.0/22",
  "141.101.64.0/18",
  "108.162.192.0/18",
  "190.93.240.0/20",
  "188.114.96.0/20",
  "197.234.240.0/22",
  "198.41.128.0/17",
  "162.158.0.0/15",
  "104.16.0.0/12",
  "172.64.0.0/13",
  "131.0.72.0/22"
];

export default (req: Request, res: Response, next: NextFunction) => {
  const userIP = (req.headers["cf-connecting-ip"] ||
  req.headers["x-forwarded-for"] ||
  req.connection.remoteAddress)?.toString();
  if (userIP) {
    // hash the user ip. This hashed ip will be used in every routes as this is a middleware.
    req.userIP = crypto.createHash('sha256').update(userIP).digest('hex');
  }

  if (config.devMode) return next();
  const address = req.connection.remoteAddress;
  // just a fake message when someone finds out the vps IP
  if (!address || !ipRangeCheck(address, cloudFlareIps)) {
    res
      .status(404)
      .send("<div>You have been IP Banned.</div><div>IP: 127.0.0.1</div>");
  } else {
    next();
  }
};
