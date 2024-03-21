import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

export const sendMail = (
  to: string,
  subject: string,
  message: string
): Promise<{ message: string; messageId?: string; error?: string }> => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const options = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text: message
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      transporter
        .sendMail(options)
        .then((res) => resolve({ message: 'Email sent', messageId: res.messageId }))
        .catch((err) => resolve({ message: 'Email sending failed', error: err }));
    }, 500);
  });
};
