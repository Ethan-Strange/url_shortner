//1. redirct short_url
//2. post url_name return short url
//3. modify url_name return short url
//4. delete url_name

import { Router } from "express";
import { redirectUrl,addUrl,deleteUrl,modifyUrl,getAllUrls } from "../controllers/url.controller.js";

export const router = Router();
router.get("/:shortId",redirectUrl)
router.get("/",getAllUrls)
router.post("/",addUrl)
router.put("/",modifyUrl)
router.delete("/",deleteUrl)