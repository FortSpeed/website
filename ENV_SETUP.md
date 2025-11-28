# Email Configuration Setup

To make the billing system work properly with email notifications, you need to configure SMTP environment variables.

## Create `.env.local` file

Create a file named `.env.local` in your project root with the following variables:

```bash
# SMTP Configuration for Email Sending
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com

# Alternative: Use other SMTP providers
# SMTP_HOST=smtp.resend.com
# SMTP_PORT=587
# SMTP_USER=resend
# SMTP_PASS=re_YourAPIKey
# SMTP_FROM=noreply@yourdomain.com
```

## Gmail Setup (Recommended for testing)

1. Enable 2-factor authentication on your Gmail account
2. Go to: https://myaccount.google.com/apppasswords
3. Create an "App password" for your application
4. Use the app password as `SMTP_PASS`

## Resend Setup (Recommended for production)

1. Sign up at: https://resend.com
2. Get your API key from the dashboard
3. Use the configuration above

## Other SMTP Providers

You can use any SMTP provider like:

- SendGrid
- Mailgun
- AWS SES
- Your own SMTP server

## Testing

After setting up the environment variables:

1. Restart your development server
2. Test the billing flow
3. Check your email for notifications

## Current Status

For now, the system will work without email configuration by logging requests to the console. In production, you should configure proper email sending.
