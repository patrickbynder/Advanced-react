import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string): string {
  return `
       <div style="border: 1px solid black; padding: 20px; font-family: sans-serif; line-height: 2; font-size: 20px;">
            <h2>Hello There!</h2>
            <p>${text}</p>
            <p>😘, The Team</p>
       </div>
    `;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // email the user a token
  const info = await transport.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Your Password Reset Token',
    html: makeANiceEmail(
      `Your Password Reset Token is here! \n\n <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset</a>`
    ),
  });
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`message sent! preview it at ${getTestMessageUrl(info)}`);
  }
}
