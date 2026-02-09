import { handleRedirect } from "../services/redirect.service.js";

export const redirectToOriginalUrl = async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    const originalUrl = await handleRedirect({
      shortCode,
      req
    });

    return res.redirect(originalUrl);
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
};
