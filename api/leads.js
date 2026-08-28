import { Resend } from 'resend';
import { initializeApp, getApps } from 'firebase/app';
import { initializeFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CHECKLIST_APP_URL = 'https://checklistvendedor.vercel.app';

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
    const { name, email, optIn = true, phone, sector, source, productName } = req.body || {};

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
          phone: phone ? String(phone).trim() : null,
          sector: sector ? String(sector).trim() : null,
          productName: productName || null,
          source: source || 'checklist_vendedor',
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
        const rawFromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
        const fromAddress = rawFromEmail.includes('<')
          ? rawFromEmail.replace(/^[^<]+</, 'Guilherme R. Paranhos <')
          : `Guilherme R. Paranhos <${rawFromEmail}>`;

        if (source && String(source).startsWith('waitlist_')) {
          const targetProduct = productName || (source === 'waitlist_vx-leads' ? 'VX Leads' : 'VX Sales');
          const betaDate = source === 'waitlist_vx-leads' ? '01 de agosto' : '10 de agosto';
          const sectorInfo = sector ? `<p style="color: #a1a1aa; font-size: 13px; margin: 6px 0 0 0;">Setor cadastrado: <strong style="color: #ffffff;">${sector}</strong></p>` : '';

          await resend.emails.send({
            from: fromAddress,
            to: trimmedEmail,
            subject: `Vaga confirmada na lista de espera do ${targetProduct}!`,
            html: `
              <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0c0c0e; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #27272a; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <div style="width: 100%; background-color: #000000; text-align: center; border-bottom: 1px solid #27272a;">
                  <img 
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&h=500&q=80" 
                    alt="${targetProduct} - Estande em Feira Empresarial" 
                    width="600"
                    style="width: 100%; max-width: 600px; height: auto; max-height: 240px; object-fit: cover; display: block; border: 0; outline: none;"
                  />
                </div>
                <div style="padding: 28px 32px 32px 32px;">
                  <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 16px 0;">
                    Olá, ${trimmedName}!
                  </h1>
                  <p style="color: #e4e4e7; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                    Sua vaga na lista de espera prioritária para o <strong>${targetProduct}</strong> foi confirmada com sucesso!
                  </p>
                  <div style="background-color: rgba(255,255,255,0.04); border: 1px solid #27272a; border-radius: 10px; padding: 16px; margin: 20px 0;">
                    <p style="color: #f59e0b; font-weight: bold; margin: 0; font-size: 14px;">Previsão de Acesso Beta: ${betaDate}</p>
                    ${sectorInfo}
                  </div>
                  <p style="color: #a1a1aa; font-size: 14px; line-height: 1.5; margin: 0 0 24px 0;">
                    Você receberá em primeira mão o link de acesso exclusivo para testar antes da abertura oficial para o mercado.
                  </p>
                  <p style="color: #71717a; font-size: 13px; border-top: 1px solid #27272a; padding-top: 20px; margin-top: 24px;">
                    <strong style="color: #d4d4d8;">Guilherme R. Paranhos</strong><br/>
                    <a href="https://instagram.com/paranhos.vx" style="color: #f59e0b; text-decoration: none; font-weight: 500;">@paranhos.vx</a>
                  </p>
                </div>
              </div>
            `,
          });
        } else {
          await resend.emails.send({
            from: fromAddress,
            to: trimmedEmail,
            subject: 'Seu acesso ao App Checklist do Vendedor está pronto!',
            html: `
              <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0c0c0e; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #27272a; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <!-- Header Banner Image -->
                <div style="width: 100%; background-color: #000000; text-align: center; border-bottom: 1px solid #27272a;">
                  <img 
                    src="https://i.postimg.cc/66V8h7Bd/Gemini-Generated-Image-h9e51dh9e51dh9e5.jpg" 
                    alt="Checklist do Vendedor no Estande" 
                    width="600"
                    style="width: 100%; max-width: 600px; height: auto; max-height: 300px; object-fit: cover; object-position: top center; display: block; border: 0; outline: none;"
                  />
                </div>

                <!-- Content Area -->
                <div style="padding: 28px 32px 32px 32px;">
                  <h1 style="color: #f59e0b; margin: 0 0 16px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                    Olá, ${trimmedName}!
                  </h1>
                  
                  <p style="color: #e4e4e7; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                    Obrigado pelo seu interesse! O seu acesso ao aplicativo gratuito <strong>Checklist do Vendedor no Estande</strong> já está liberado.
                  </p>
                  
                  <p style="color: #a1a1aa; font-size: 14px; line-height: 1.5; margin: 0 0 20px 0;">
                    Use a ferramenta interativa para preparar seu time e não perder leads qualificados durante feiras e eventos empresariais.
                  </p>

                  <div style="background-color: rgba(255,255,255,0.04); border: 1px solid #27272a; border-radius: 10px; padding: 14px 16px; margin: 0 0 24px 0;">
                    <p style="color: #f59e0b; font-weight: 700; font-size: 13px; margin: 0 0 4px 0;">⚡ 100% Offline & Seguro</p>
                    <p style="color: #a1a1aa; font-size: 12px; line-height: 1.4; margin: 0;">O aplicativo funciona mesmo sem sinal de internet no pavilhão e todas as suas anotações ficam salvas apenas no dispositivo que você está usando.</p>
                  </div>
                  
                  <div style="margin: 28px 0; text-align: center;">
                    <a href="${CHECKLIST_APP_URL}" target="_blank" style="display: inline-block; padding: 15px 36px; background-color: #f59e0b; color: #09090b; text-decoration: none; border-radius: 12px; font-weight: 800; font-size: 15px; letter-spacing: 0.3px; box-shadow: 0 6px 20px rgba(245, 158, 11, 0.35);">
                      Acessar App Checklist do Vendedor →
                    </a>
                  </div>
                  
                  <p style="color: #71717a; font-size: 13px; line-height: 1.6; border-top: 1px solid #27272a; padding-top: 24px; margin-top: 32px;">
                    Se você quiser atrair mais visitantes e qualificar clientes no seu estande com Inteligência Artificial e automação, entre em contato comigo.<br/><br/>
                    <strong style="color: #d4d4d8;">Guilherme R. Paranhos</strong><br/>
                    <a href="https://instagram.com/paranhos.vx" style="color: #f59e0b; text-decoration: none; font-weight: 500;">@paranhos.vx</a>
                  </p>
                </div>
              </div>
            `,
          });
        }
      } catch (emailErr) {
        console.error('Erro ao enviar e-mail via Resend:', emailErr);
      }
    }

    return res.status(200).json({
      success: true,
      accessUrl: CHECKLIST_APP_URL,
    });
  } catch (err) {
    console.error('Erro ao processar handler:', err);
    return res.status(500).json({ error: 'Erro interno ao processar formulário.' });
  }
}
