/**
 * Email utility module
 * Handles SMTP transport creation and email sending via Nodemailer.
 */
import nodemailer from 'nodemailer';

/**
 * Creates and returns a reusable Nodemailer transport instance.
 * Reads SMTP configuration from environment variables.
 */
function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: parseInt(process.env.SMTP_PORT, 10) === 465, // true for port 465 (SSL), false for others (STARTTLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * Sends an HTML email to one or more recipients.
 *
 * @param {Object} options
 * @param {string|string[]} options.to - Recipient email(s)
 * @param {string} options.subject - Email subject line
 * @param {string} options.html - HTML content of the email
 * @returns {Promise<Object>} Nodemailer send result
 * @throws {Error} If sending fails
 */
export async function sendEmail({ to, subject, html }) {
  const transporter = createTransport();

  // Nodemailer accepts comma-separated string or array for multiple recipients
  const recipients = Array.isArray(to) ? to.join(', ') : to;

  const mailOptions = {
    from: {
      name: process.env.EMAIL_FROM_NAME || process.env.SMTP_USER,
      address: process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_USER,
    },
    to: recipients,
    subject,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}
