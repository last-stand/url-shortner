import express from "express";
import { handleGenerateShortUrl, handleGetAnalytics, handleGetRedirectUrl } from "../handlers/urlHandler.js";
const router = express.Router();

router.post('/', handleGenerateShortUrl);
router.get('/:shortId', handleGetRedirectUrl);
router.get('/analytics/:shortId', handleGetAnalytics);


export default router;