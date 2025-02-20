import ForbiddenError from "../../domain/errors/forbidden-error.js";


function AuthorizationMiddleware(req, res, next) {
  if (req.auth.claims.metadata.role !== "admin") {
    throw new ForbiddenError("You are not authorized");
  }

  next();
}

export default AuthorizationMiddleware;
