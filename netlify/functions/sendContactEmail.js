const sgMail = require('@sendgrid/mail');

// The API key and verified sender email must be set in Netlify's environment variables
// for this function to work in production.
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL;

const RECIPIENTS = [
    'k.laohasiri@gmail.com',
    'info.vkamber@gmail.com',
    'vkamber91@gmail.com'
];

exports.handler = async function(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    if (!SENDER_EMAIL || !process.env.SENDGRID_API_KEY) {
        console.error('SendGrid environment variables not set.');
        return { statusCode: 500, body: JSON.stringify({ error: 'Email service is not configured.' }) };
    }

    try {
        const { name, email, subject, message } = JSON.parse(event.body);

        if (!name || !email || !subject || !message) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing required form fields.' }) };
        }

        const msg = {
            to: RECIPIENTS,
            from: SENDER_EMAIL,
            replyTo: email,
            subject: `New VLG Contact Form: ${subject}`,
            text: `You have a new message from ${name} (${email}):\n\n${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6;">
                    <h2 style="color: #904a21;">New Vicky LuxGems Contact Submission</h2>
                    <hr style="border: 0; border-top: 1px solid #eee;">
                    <p><strong>From:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #904a21;">${email}</a></p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <div style="background-color: #f9f9f9; border-left: 4px solid #904a21; padding: 15px; margin-top: 20px;">
                        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
                </div>
            `,
        };

        await sgMail.send(msg);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Email sent successfully.' }),
        };

    } catch (error) {
        console.error('Error sending email:', error.response ? error.response.body : error);
        return {
            statusCode: error.code || 500,
            body: JSON.stringify({ error: 'Failed to send email.' })
        };
    }
};