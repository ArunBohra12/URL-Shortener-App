import Router from "express";

import {
  redirectToOriginalUrl,
  deleteUrl,
  getHistory,
  generateShortUrl,
  exportGeneratedUrls,
  generateCustomUrl,
} from "../controllers/url.controller.js";
import { validateUrl } from "../validators/urlValidator.js";

import { isApiAuthenticated } from "../middlewares/authMiddleware.js";
import { validationErrorHandler } from "../middlewares/ValidatorErrorHandler.js";
import {
  getFilteredCategory,
  updateCategory,
} from "../controllers/category.controller.js";

const router = Router();

// old route for backward compatibility
router.get("/url/:short", redirectToOriginalUrl);

router.post(
  "/url",
  isApiAuthenticated,
  validateUrl,
  validationErrorHandler,
  generateCustomUrl,
  generateShortUrl
);

router.get("/history", isApiAuthenticated, getHistory);

router.delete("/delete/:id", isApiAuthenticated, deleteUrl);

router.get("/export", isApiAuthenticated, exportGeneratedUrls);

//adding a new route for category
router.get("/url/filter/:category", isApiAuthenticated, getFilteredCategory);
router.put("/url/filter", isApiAuthenticated, updateCategory);

export default router;
