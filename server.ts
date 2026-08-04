import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post('/api/leads/email', async (req, res) => {
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
                <p>Obrigado por se cadastrar. Seu checklist do vendedor foi liberado.</p>
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
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

