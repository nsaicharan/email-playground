/**
 * Default sample HTML email template.
 * Pre-loaded into the editor so users have something to start with.
 */
export const sampleEmailTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Test Email</title>
  <style>
    @media screen and (max-width: 600px) {
      .m-100p {
        width: 100% !important;
      }
      .m-px-20px { 
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .m-py-20px {
        padding-top: 20px !important;
        padding-bottom: 20px !important;
      }
    }
  </style>
</head>

<body style="margin: 0; padding: 0; background-color: #F7F5F4;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
    <tr>
      <td style="padding: 50px 0;" class="m-px-20px m-py-20px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="m-100p" style="width: 600px; background-color: #FFFFFF;">
          <tr>
            <td style="padding: 45px 50px 50px;" class="m-px-20px">
              <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tr>
                  <td style="font-family: arial, sans-serif; font-weight: bold; font-size: 26px; line-height: 31px;">
                    Hello there!
                  </td>
                </tr>

                <tr>
                  <td style="font-family: arial, sans-serif; font-size: 16px; line-height: 24px; padding: 24px 0 32px;">
                    This is a sample HTML email rendered in real-time.
                    <br><br> 
                    You can edit this code on the left, and see the live preview on the right. When you are ready, you can send a test email to yourself or your team. 
                  </td>
                </tr>

                <!-- Begin CTA -->
                <tr>
                  <td>
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background-color: #000000;">
                          <a href="https://example.com" style="font-size: 12px; line-height: 12px; letter-spacing: 1px; font-family: arial, sans-serif; color: #FFFFFF; text-align: center; text-decoration: none; display: block; background-color: #000000; border: 1px solid white; padding: 18px 18px;" >
                            CALL TO ACTION
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- End CTA -->
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>

</html>`;
