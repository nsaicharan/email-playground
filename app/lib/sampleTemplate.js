/**
 * Default sample HTML email template.
 * Pre-loaded into the editor so users have something to start with.
 */
export const sampleEmailTemplate = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
  <meta name="x-apple-disable-message-reformatting">

  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->

  <style>    
    body { 
      margin: 0; 
      padding: 0; 
      -webkit-text-size-adjust: 100%; 
      -ms-text-size-adjust: 100%; 
    }
    
    table { border-collapse: collapse; }

    td { mso-line-height-rule: exactly; }
   
    img { 
      display: block; 
      border: 0; 
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
    }

    @media screen and (max-width: 600px) {
      .m-100p { width: 100% !important; }

      .m-px-20px {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
    }
  </style>
</head>

<body vlink="#1E1C1D" style="background-color: #F7F5F4;">
  <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
    <!-- Logo -->
    <tr>
      <td align="center" style="padding: 40px 0 30px;">
        <a href="https://example.com">
          <img src="https://i.imgur.com/95auNLp.png" alt="wow logo" width="154" />
        </a>
      </td>
    </tr>

    <!-- Begin Main Content -->
    <tr>
      <td>
        <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" class="m-100p" style="width: 600px; background-color: #FFFFFF;">
          <tr>
            <td align="center">
              <a href="https://example.com">
                <img src="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjAwNTU0NTR8&ixlib=rb-4.1.0&q=80&w=1200" alt="" width="600" style="max-width: 100%;" />
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding: 44px 50px 50px;" class="m-px-20px">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-family: system-ui, arial, sans-serif; font-weight: bold; font-size: 22px; line-height: 28px; letter-spacing: 0.25px; text-transform: uppercase; color: #1E1C1D;">This is a sample HTML email template rendered in real&nbsp;time.</h1>
                  </td>
                </tr>

                <tr>
                  <td>
                    <p style="margin: 20px 0 32px; font-family: system-ui, arial, sans-serif; font-size: 18px; line-height: 28px; color: #1E1C1D;">You can edit this code on the left, and see the live preview on the right. When you are ready, you can send a test email to yourself or your&nbsp;team.</p>
                  </td>
                </tr>

                <!-- Begin CTA -->
                <tr>
                  <td>
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background-color: #1E1C1D; border-radius: 4px;">
                          <a href="https://example.com" style="padding: 18px 18px; font-size: 14px; line-height: 14px; letter-spacing: 1.5px; font-family: system-ui, arial, sans-serif; color: #FFFFFF; text-align: center; text-decoration: none; display: block; background-color: #1E1C1D; border: 1px solid white; border-radius: 4px;">
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
    <!-- End Main Content -->

    <!-- Legal Text -->
    <tr>
      <td align="center" style="font-family: system-ui, arial, sans-serif; font-size: 13px; line-height: 20px; color: #797979; padding: 40px 10px;">
        WOW! Labs Ltd.
        <br>
        742 Lakeswing, Mireford Street, Azalore&nbsp;98210
      </td>
    </tr>
  </table>
</body>
</html>`;
