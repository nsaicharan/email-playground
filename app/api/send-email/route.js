/**
 * POST /api/send-email
 *
 * Accepts JSON body with:
 *   - html: string (the HTML email content)
 *   - recipients: string[] (array of email addresses)
 *   - subject: string (optional, defaults to "Test Email")
 *
 * Returns:
 *   - 200: { success: true, messageId, accepted }
 *   - 400: { success: false, error } for validation errors
 *   - 500: { success: false, error } for server/SMTP errors
 */
import { sendEmail } from "@/app/lib/email";
import { validateSendRequest } from "@/app/lib/validators";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = validateSendRequest(body);
    if (!validation.valid) {
      return Response.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const { html, recipients, subject = "Test Email" } = body;

    // Send the email
    const result = await sendEmail({
      to: recipients,
      subject,
      html,
    });

    return Response.json({
      success: true,
      messageId: result.messageId,
      accepted: result.accepted,
    });
  } catch (error) {
    console.error("Email sending failed:", error);

    // Provide user-friendly error messages for common SMTP failures
    let errorMessage = "Failed to send email. Please check your SMTP configuration.";

    if (error.code === "EAUTH") {
      errorMessage = "Authentication failed. Please verify your SMTP username and password.";
    } else if (error.code === "ECONNREFUSED") {
      errorMessage = "Could not connect to the SMTP server. Please check your host and port settings.";
    } else if (error.code === "ESOCKET") {
      errorMessage = "Network error. Please check your SMTP host and port configuration.";
    }

    return Response.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
