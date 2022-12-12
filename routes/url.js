const express = require("express");
const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");
const Url = require("../models/url");

const router = express.Router();

// @route   POST /api/url/shorten
// @desc    Create short URL

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.baseUrl;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  //   create url code
  const urlCode = shortid.generate();

  //   check longUrl
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid long url");
  }
});

module.exports = router;
