import { validateBook } from "./book.validator.js";
import { validateTech } from "./tech.validator.js";
import { validateService } from "./service.validator.js";
import { validateProduct } from "./non-tech.validator.js";

export const validatePitch = (req, res, next) => {
  const { title, category, data } = req.body;

  // 🔴 Common checks (all pitches)
  if (!title || title.trim().length < 3) {
    return res.status(400).json({ message: "Title is required" });
  }

  if (!category) {
    return res.status(400).json({ message: "Category is required" });
  }

  if (!data || typeof data !== "object") {
    return res.status(400).json({ message: "Pitch data is required" });
  }

  try {
    switch (category) {
      case "book":
        validateBook(data);
        break;

      case "tech":
        validateTech(data);
        break;

      case "service":
        validateService(data);
        break;

      case "product":
        validateProduct(data);
        break;

      default:
        return res.status(400).json({ message: "Invalid pitch category" });
    }

    next(); // ✅ validation passed
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
