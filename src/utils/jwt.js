import jwt from "jsonwebtoken";

export function generateJWT(payload) {
  const token = jwt.sign(payload, "palabrasupersecreta", {
    expiresIn: "180d",
  });
  return token;
}
