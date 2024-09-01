// middlewares/authentication.mjs
import { validateToken } from "../services/authentication.mjs";

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      console.error("Token validation error:", error);
    }

    return next();
  };
}

export { checkForAuthenticationCookie };
