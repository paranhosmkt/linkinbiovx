import { Resend } from 'resend';
import { initializeApp, getApps } from 'firebase/app';
import { initializeFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CHECKLIST_DOWNLOAD_URL = 'https://drive.google.com/file/d/1vkyfMHsalPkigcefVudKL3bj2ghQtPRK/view?usp=sharing';

let dbInstance = null;
function getDb() {
  if (dbInstance) return dbInstance;
  try {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID,
    };
    const databaseId = process.env.FIREBASE_DATABASE_ID || process.env.VITE_FIREBASE_DATABASE_ID || '(default)';
    if (firebaseConfig.apiKey && firebaseConfig.projectId) {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      dbInstance = initializeFirestore(app, {}, databaseId);
    }
  } catch (e) {
    console.error('Vercel serverless Firebase init error:', e);
  }
  return dbInstance;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { name, email, optIn = true } = req.body || {};

    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!trimmedName || !trimmedEmail) {
      return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ error: 'Por favor, insira um e-mail válido.' });
    }

    // 1. Save to Firestore
    try {
      const db = getDb();
      if (db) {
        await addDoc(collection(db, 'leads'), {
          name: trimmedName,
          email: trimmedEmail,
          optIn: Boolean(optIn),
          source: 'checklist_vendedor',
          createdAt: serverTimestamp(),
        });
      }
    } catch (dbErr) {
      console.error('Erro ao gravar no Firestore:', dbErr);
    }

    // 2. Send email with Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: trimmedEmail,
          subject: 'Seu Checklist do Vendedor no Estande está pronto!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0e0e0e; color: #ffffff; border-radius: 12px; border: 1px solid #27272a;">
              <div style="margin-bottom: 20px;">
                <span style="background-color: rgba(245, 158, 11, 0.15); color: #f59e0b; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; border: 1px solid rgba(245, 158, 11, 0.3);">
                  Acesso Imediato
                </span>
              </div>
              <h1 style="color: #f59e0b; margin-top: 8px; font-size: 24px;">Olá, ${trimmedName}!</h1>
              <p style="color: #d4d4d8; font-size: 16px; line-height: 1.6; margin: 16px 0;">
                Obrigado pelo seu interesse! O seu <strong>Checklist do Vendedor no Estande</strong> já está liberado.
              </p>
              <p style="color: #a1a1aa; font-size: 14px; line-height: 1.5; margin-bottom: 24px;">
                Ele contém as 10 dicas práticas e essenciais para preparar seu time e não perder leads qualificados durante feiras e eventos empresariais.
              </p>
              <div style="margin: 32px 0; text-align: center;">
                <a href="${CHECKLIST_DOWNLOAD_URL}" target="_blank" style="display: inline-block; padding: 14px 32px; background-color: #f59e0b; color: #09090b; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);">
                  Baixar Checklist do Vendedor
                </a>
              </div>
              <p style="color: #71717a; font-size: 13px; line-height: 1.5; border-top: 1px solid #27272a; padding-top: 20px; margin-top: 32px;">
                Se você quiser atrair mais visitantes e qualificar clientes no seu estande com Inteligência Artificial e automação, entre em contato comigo.<br/><br/>
                <strong>Guilherme R. Paranhos</strong><br/>
                <a href="https://instagram.com/paranhos.vx" style="color: #f59e0b; text-decoration: none;">@paranhos.vx</a>
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Erro ao enviar e-mail via Resend:', emailErr);
      }
    }

    return res.status(200).json({
      success: true,
      downloadUrl: CHECKLIST_DOWNLOAD_URL,
    });
  } catch (err) {
    console.error('Erro ao processar handler:', err);
    return res.status(500).json({ error: 'Erro interno ao processar formulário.' });
  }
}
