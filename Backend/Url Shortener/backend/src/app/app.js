import express from "express";
import urlRouter from "../routes/url.routes.js";
import urlModel from "../models/url.model.js";

const app = express();

app.use(express.json());
app.use("/api/urls", urlRouter);

app.get("/:code", async (req, res) => {
  const { code } = req.params;

  const url = await urlModel.findOne({ shortUrl: code });

  if (!url) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(302, url.originalUrl);

  await urlModel.findOneAndUpdate({ shortUrl: code }, { $inc: { clicks: 1 } });
});

export default app;
