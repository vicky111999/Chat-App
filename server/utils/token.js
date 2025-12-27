import jwt from "jsonwebtoken";

export const createAccesstoken = (userid) => {
  const token = jwt.sign({ userid }, process.env.AccessToken, {
    expiresIn: "15m",
  });

  return token;
};

export const createrefreshToken = (userid) => {
  const token = jwt.sign({ userid }, process.env.RefreshToken, {
    expiresIn: "7d",
  });
  return token;
};
