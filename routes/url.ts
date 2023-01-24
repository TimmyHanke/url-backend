import express from "express";
const router = express.Router();
import { Url, validateUrl } from "Models/Url";
import validUrl from "valid-url";
import shortid from "shortid";

const baseUrl = "http://localhost:4000";

router.post("/", async (req, res) => {
  const { error } = validateUrl(req.body);
  if (error) return res.status(400).send(error.message);

  const { original } = req.body;

  const addon = shortid.generate();

  // Checks if the sent Url is a valid url
  if (validUrl.isUri(original)) {
    // Searches in the Database if the same Url exists.
    try {
      let url = await Url.findOne({
        original,
      });

      if (url) {
        // If found send url.
        res.send(url);
      } else {
        //url is not found , make a new one.
        const newUrl = baseUrl + "/" + addon;

        url = new Url({
          original,
          newUrl,
          addon,
          validTo: req.body.validTo,
        });
        await url.save();

        return res.send(url);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401).json("Invalid Url");
  }
});
router.get("/", async (req, res) => {
  const url = await Url.find();
  return res.send(url);
});

router.delete("/:id", async (req, res) => {
  const url = await Url.findByIdAndDelete(req.params.id);
  if (!url)
    return res.status(404).send("The order DOES NOT exist in the database");

  return res.send(url);
});

export default router;
