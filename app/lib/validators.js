/**
 * Validation utilities for email-related inputs.
 */

/**
 * Basic email format validation using regex.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates the send-email request body.
 * @param {Object} body - Request body
 * @param {string} body.html - HTML content
 * @param {string[]} body.recipients - Array of email addresses
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateSendRequest(body) {
  if (!body) {
    return { valid: false, error: "Request body is required." };
  }

  const { html, recipients } = body;

  if (!html || typeof html !== "string" || html.trim().length === 0) {
    return { valid: false, error: "HTML content is required and cannot be empty." };
  }

  if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
    return { valid: false, error: "At least one recipient email is required." };
  }

  const invalidEmails = recipients.filter((email) => !isValidEmail(email));
  if (invalidEmails.length > 0) {
    return {
      valid: false,
      error: `Invalid email address(es): ${invalidEmails.join(", ")}`,
    };
  }

  return { valid: true };
}
