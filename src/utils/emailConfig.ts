// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create an account and verify your email
// 3. Create a new service (Gmail, Outlook, etc.)
// 4. Create an email template with the following variables:
//    - {{user_name}} - sender's name
//    - {{user_email}} - sender's email
//    - {{subject}} - email subject
//    - {{message}} - email message
// 5. Get your Service ID, Template ID, and Public Key
// 6. Replace the values below with your actual EmailJS credentials

export const emailConfig = {
  serviceId: 'service_your_service_id', // Replace with your EmailJS service ID
  templateId: 'template_your_template_id', // Replace with your EmailJS template ID
  publicKey: 'your_public_key', // Replace with your EmailJS public key
};

// Example EmailJS template content:
/*
Subject: New Contact Form Submission from {{user_name}}

Hello,

You have received a new message from your portfolio contact form:

Name: {{user_name}}
Email: {{user_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio website contact form.
*/