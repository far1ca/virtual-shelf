import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

// middleware to check if the user is logged in
const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.redirect("/auth/google");
  } else {
    next();
  }
};

router.get("/", checkAuth, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;
