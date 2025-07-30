import express from "express";
import passport from "passport";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  if (req.user) res.redirect(`http://localhost:4200?id=${req.user.id}`);
  else res.redirect("http://localhost:4200");
});

export default router;
