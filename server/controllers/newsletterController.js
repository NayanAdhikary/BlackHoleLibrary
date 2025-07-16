const Newsletter = require("../model/newsletterModel");
const sendEmail = require("../config/email"); // updated path

exports.subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Email is required" });
  }

  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({ msg: "Email already subscribed" });
    }

    await Newsletter.create({ email });

    // ✅ Define email body content
    const htmlContent = `
      <h2>🎉 Thank You for Subscribing!</h2>
      <p>You've successfully joined our newsletter! Expect book updates, events, and special offers.</p>
      <p>Happy Reading!</p>
      <p>– Library Team</p>
    `;

    await sendEmail(email, "🎉 Thanks for Subscribing!", htmlContent);

    res.status(200).json({ msg: "Subscribed successfully and thank you email sent" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
