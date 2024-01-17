import { nanoid } from "nanoid";
import URL from "../models/url.js";

export async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({error: 'url is required'});
    }
    const shortId = nanoid(10);
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitedHistory: []
    })

    return res.json({id: shortId});
}

export async function handleGetRedirectUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId: shortId}, { $push: { visitHistory: { timestamp: Date.now() } } });
    res.redirect(entry.redirectUrl);
}

export async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({shortId: shortId});
    return res.json({
        totlClicks: entry.visitHistory.length,
        analytics: entry.visitHistory
    });
}