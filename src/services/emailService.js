// Email service for sending trial download emails
// This service formats the email HTML and sends it via API

/**
 * Generates the HTML email template for trial download
 * @param {Object} params - Email parameters
 * @param {string} params.customerName - Customer's name
 * @param {string} params.customerEmail - Customer's email
 * @param {string} params.productName - Full product name (e.g., "3D PDF Exporter for AutoCAD")
 * @param {string} params.downloadUrl - Download URL for the installer
 * @param {string} params.categoryName - Category name (e.g., "AutoCAD")
 * @param {string} params.userId - Optional user ID for personalization
 * @returns {string} HTML email content
 */
export const generateTrialDownloadEmail = ({
  customerName,
  customerEmail,
  productName,
  downloadUrl,
  categoryName,
  userId = ''
}) => {
  const displayName = customerName || `[${userId}]`;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trial Download - ${productName}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #00A5BF, #008BA3); padding: 32px 24px; color: #ffffff;">
      <h2 style="margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">Hi ${displayName},</h2>
    </div>
    <div style="padding: 32px 24px;">
      <p style="font-family: 'Inter', sans-serif; font-size: 16px; color: #1f2937; margin-bottom: 24px;">Thank you for choosing <strong>ProtoTech's ${productName}</strong>.</p>
      
      <div style="text-align: center; margin: 32px 0;">
        <a href="${downloadUrl}" style="display: inline-block; background: linear-gradient(135deg, #00A5BF, #008BA3); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: transform 0.2s;">Click Here to Download The Installer</a>
      </div>
      
      <p style="font-family: 'Inter', sans-serif; margin-top: -10px; margin-bottom: 0; font-size: 14px;"><strong><span style="color: red;">*</span>Activation Key is Not Required. Trial is Automatically Activated.</strong></p>
      
      <div style="background: #f3f4f6; border-radius: 12px; padding: 24px; margin: 24px 0;">
        <h3 style="font-family: 'Inter', sans-serif; color: #1f2937; font-size: 18px; font-weight: 600; margin-top: 0; margin-bottom: 16px;">How to Activate Your Trial</h3>
        <ol style="font-family: 'Inter', sans-serif; padding-left: 24px; margin: 0; color: #374151; font-size: 16px;">
          <li style="margin-bottom: 12px;"><strong>Download the Installer:</strong> Click the <a href="${downloadUrl}" style="color: #00a5bf; text-decoration: none;">download link</a> provided.</li>
          <li style="margin-bottom: 12px;"><strong>Locate the Installer:</strong> Find the Plugin Installer in your Downloads folder (or the location you saved it).</li>
          <li style="margin-bottom: 12px;"><strong>Run the Installer:</strong> Double-click the Plugin Installer file to launch the installation window.</li>
          <li style="margin-bottom: 12px;"><strong>Install the Plugin:</strong> Click the 'Install Now' button on the installer pop-up.</li>
          <li style="margin-bottom: 12px;"><strong>Complete Installation:</strong> Wait for the setup to finish, then click 'Close'.</li>
          <li style="margin-bottom: 12px;"><strong>Open ${categoryName}:</strong> You'll find ${productName.split(' for ')[0]} under the Ribbon or Add-Ins tab.</li>
        </ol>
      </div>
      
      <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0;">
        <p style="font-family: 'Inter', sans-serif; margin: 0; color: #991b1b; font-size: 16px;"><strong>NOTE:</strong> Please ensure you are connected to the internet during Step 6. An internet connection is required only once for activation.</p>
      </div>
      
      <p style="font-family: 'Inter', sans-serif; color: #4b5563; margin-bottom: 24px; font-size: 16px;">Having trouble? Our support team is here to help. Contact us at <a href="mailto:support@staging8.prototechsolutions.com" style="color: #00a5bf; text-decoration: none; font-weight: 500;">support@staging8.prototechsolutions.com</a>.</p>
      
      <div style="border-top: 1px solid #e5e7eb; padding-top: 12px;"></div>
      
      <p style="font-family: 'Inter', sans-serif; color: #1f2937; font-size: 16px; margin-bottom: -6px;">Thanks and Regards,</p>
      <a href="https://staging8.prototechsolutions.com" target="_blank" rel="noopener"><img src="https://staging8.prototechsolutions.com/wp-content/uploads/2021/04/Keka_Logo___1_-removebg-preview.png" alt="ProtoTech Solutions Logo" width="148" height="50" /></a>
      
      <div style="background: linear-gradient(90deg, #34DCE5 0%, #64F100 50%, #34DCE5 100%); height: 2px;"></div>
      
      <div style="font-family: 'Inter', sans-serif; font-size: 11px; color: #666666; font-style: italic; line-height: 1.4; padding: 8px; background: #f8fafc; border-radius: 8px; margin-top: 10px;">DISCLAIMER: This e-mail may contain privileged and confidential information which is the property of ProtoTech Solutions. It is intended only for the use of the individual or entity to which it is addressed. If you are not the intended recipient, you are not authorized to read, retain, copy, print, distribute or use this message. If you have received this communication in error, please notify the sender and delete all copies of this message. E-mail transmission cannot be guaranteed to be secure or error-free as information could be intercepted, corrupted, lost, destroyed, arrive late or incomplete, or contain viruses. The sender, therefore, does not accept liability for any errors or omissions in the contents or attachments (if any) of this message, which arises as a result of e-mail transmission.</div>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
        <tbody>
          <tr>
            <td style="text-align: center;">
              <table style="margin: 0 auto; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="padding: 0 8px;"><a href="https://www.linkedin.com/company/prototech-solutions-&-services" style="text-decoration: none;"><img style="width: 24px; height: 24px;" src="https://staging8.prototechsolutions.com/5F7CA4F1-5B85-9763-1D33-35131362B4D1/email-sign-icons/linkedin.png" alt="LinkedIn" /></a></td>
                    <td style="padding: 0 8px;"><a href="https://twitter.com/ProtoTechSoln" style="text-decoration: none;"><img style="width: 24px; height: 24px;" src="https://staging8.prototechsolutions.com/5F7CA4F1-5B85-9763-1D33-35131362B4D1/email-sign-icons/twitter.png" alt="Twitter" /></a></td>
                    <td style="padding: 0 8px;"><a href="https://www.facebook.com/PrototechSolutions?fref=ts" style="text-decoration: none;"><img style="width: 24px; height: 24px;" src="https://staging8.prototechsolutions.com/5F7CA4F1-5B85-9763-1D33-35131362B4D1/email-sign-icons/facebook.png" alt="Facebook" /></a></td>
                    <td style="padding: 0 8px;"><a href="https://www.youtube.com/user/PrototechChannel" style="text-decoration: none;"><img style="width: 24px; height: 24px;" src="https://staging8.prototechsolutions.com/5F7CA4F1-5B85-9763-1D33-35131362B4D1/email-sign-icons/youtube.png" alt="YouTube" /></a></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>
  `.trim();
};

/**
 * Sends trial download email to customer
 * @param {Object} params - Email parameters
 * @param {string} params.customerName - Customer's name
 * @param {string} params.customerEmail - Customer's email
 * @param {string} params.productName - Full product name
 * @param {string} params.downloadUrl - Download URL
 * @param {string} params.categoryName - Category name
 * @param {string} params.userId - Optional user ID
 * @returns {Promise<Object>} Response from email service
 */
export const sendTrialDownloadEmail = async ({
  customerName,
  customerEmail,
  productName,
  downloadUrl,
  categoryName,
  userId = ''
}) => {
  // Generate email HTML
  const emailHtml = generateTrialDownloadEmail({
    customerName,
    customerEmail,
    productName,
    downloadUrl,
    categoryName,
    userId
  });

  // TODO: Replace this with your actual email API endpoint
  // Example implementations:
  // 1. Using a backend API:
  //    const response = await fetch('/api/send-email', {
  //      method: 'POST',
  //      headers: { 'Content-Type': 'application/json' },
  //      body: JSON.stringify({
  //        to: customerEmail,
  //        subject: `Download Your Free Trial - ${productName}`,
  //        html: emailHtml
  //      })
  //    });
  //    return await response.json();
  //
  // 2. Using EmailJS:
  //    import emailjs from '@emailjs/browser';
  //    return await emailjs.send('service_id', 'template_id', {
  //      to_email: customerEmail,
  //      to_name: customerName,
  //      message: emailHtml,
  //      subject: `Download Your Free Trial - ${productName}`
  //    });
  //
  // 3. Using SendGrid, Mailgun, or similar service:
  //    Follow their SDK documentation

  // API endpoint URL - adjust based on your backend server location
  // For development: http://localhost:5000/api/send-trial-email
  // For production: https://your-api-domain.com/api/send-trial-email
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const endpoint = `${API_URL}/api/send-trial-email`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: customerEmail,
        toName: customerName,
        subject: `Download Your Free Trial - ${productName}`,
        html: emailHtml,
        productName,
        downloadUrl
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || 'Failed to send email');
    }

    return await response.json();
  } catch (error) {
    // Enhanced error handling
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to email server. Please ensure the backend server is running.');
    }
    
    throw error;
  }
};

