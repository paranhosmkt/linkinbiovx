import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Send Thank You Email using Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: email,
          subject: 'Obrigado pelo seu cadastro!',
          html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h1>Olá, ${name}!</h1>
              <p>Obrigado por se cadastrar. Seu checklist do vendedor no estande foi liberado.</p>
              <p>Você pode acessar e baixar o arquivo clicando no link abaixo:</p>
              <p><a href="https://drive.google.com/file/d/1vkyfMHsalPkigcefVudKL3bj2ghQtPRK/view?usp=sharing" style="display: inline-block; padding: 10px 20px; background-color: #f59e0b; color: #000; text-decoration: none; border-radius: 5px; font-weight: bold;">Acessar Checklist</a></p>
              <br/>
              <p>Atenciosamente,<br/>Nossa Equipe</p>
            </div>
          `
        });
        console.log(`Thank you email sent to ${email}`);
      } catch (emailError) {
        console.error("Failed to send email with Resend:", emailError);
        // Don't fail the request if email fails, it was already saved
      }
    } else {
      console.warn("RESEND_API_KEY not set. Email was not sent.");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
