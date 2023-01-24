import express from "express";
import { Url } from "Models/Url";
const router = express.Router();

router.get("/:id", async (req, res) => {
  // Checks if the params exists in the Database

  try {
    const url: any = await Url.findOne({ addon: req.params.id });
    if (url) {
      // The params exists in the database , redirecting to the Original Url.

      const date =
        new Date().getFullYear() +
        "-" +
        -new Date().getMonth() +
        1 +
        "-" +
        new Date().getDate();

      if (url.original) {
        if (url.validTo) {
          if (date < url.validTo) {
            return res.redirect(url.original);
            // The date is expired redirect to main site.
          } else return res.redirect("back");

          // if Valid is null (not used) it will redirect to the url
        } else return res.redirect(url.original);
      }

      // The params dosn't exist in the database , send error.
    } else return res.send(404).send("Invalid Url");
  } catch (error) {}
});

export default router;
