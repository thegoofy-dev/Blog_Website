import { validateToken } from "../services/authentication.mjs";

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (tokenCookieValue) {
      try {
        req.user = validateToken(tokenCookieValue);
      } catch (error) {
        console.error("Token validation error:", error);
      }
    }
    next();
  };
}

export { checkForAuthenticationCookie };
