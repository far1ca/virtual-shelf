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
  if (req.user)
    res.redirect(`https://virtual-shelf-xi.vercel.app?id=${req.user.id}`);
  else res.redirect("https://virtual-shelf-xi.vercel.app");
});

export default router;
