import express from "express";
import generateShortUrl from "../utils/generateShortUrl.js";
import urlModel from "../models/url.model.js";

const router = express.Router();


router.post("/", async (req, res) => {

    const {url} = req.body;
    if (!url) {
        return res.status(400).json({error: "URL is required"});
    }

    if( url.startsWith("http://") == false && url.startsWith("https://") == false ) {
        return res.status(400).json({error: "Invalid URL format"});
    }

    if( url.length > 2048 ) {
        return res.status(400).json({error: "URL is too long"});
    }

    // Generate a short URL
    const shortUrl = generateShortUrl();

    // Save the URL mapping to the database
    const newUrl = await urlModel.create({
        originalUrl: url,
        shortUrl: shortUrl
    });

    res.status(201).json({
        message: "Short URL generated successfully",
        data: {
            originalUrl: newUrl.originalUrl,
            shortUrl: newUrl.shortUrl
        }
    });

});


router.get("/", async (req, res) => {
    const urls = await urlModel.find();
    res.status(200).json({
        message: "All URLs fetched successfully",
        data: urls
    });
});


router.delete("/:id", async (req, res) => {
    const {id} = req.params;

    const deletedUrl = await urlModel.findByIdAndDelete(id);

    if (!deletedUrl) {
        return res.status(404).json({ error: "URL not found" });
    }

    res.status(200).json({
        message: "URL deleted successfully",
        data: deletedUrl
    });
});

export default router;