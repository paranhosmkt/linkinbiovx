import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';
import { initializeApp, getApps } from 'firebase/app';
import { initializeFirestore, collection, addDoc, serverTimestamp, getFirestore } from 'firebase/firestore';

const CHECKLIST_APP_URL = 'https://checklistvendedor.vercel.app';

// Lazy initialize Firestore client
let firestoreDb: any = null;
function getDatabaseInstance() {
  if (firestoreDb) return firestoreDb;

  try {
    let firebaseConfig: any = {};
    let databaseId = '(default)';

    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (fs.existsSync(configPath)) {
      const raw = fs.readFileSync(configPath, 'utf-8');
      const parsed = JSON.parse(raw);
      firebaseConfig = {
        apiKey: parsed.apiKey,
        authDomain: parsed.authDomain,
        projectId: parsed.projectId,
        storageBucket: parsed.storageBucket,
        messagingSenderId: parsed.messagingSenderId,
        appId: parsed.appId,
      };
      if (parsed.firestoreDatabaseId) {
        databaseId = parsed.firestoreDatabaseId;
      }
    }

    if (process.env.FIREBASE_API_KEY) {
      firebaseConfig.apiKey = process.env.FIREBASE_API_KEY;
    }
    if (process.env.FIREBASE_PROJECT_ID) {
      firebaseConfig.projectId = process.env.FIREBASE_PROJECT_ID;
    }
    if (process.env.FIREBASE_DATABASE_ID) {
      databaseId = process.env.FIREBASE_DATABASE_ID;
    }

    if (firebaseConfig.apiKey && firebaseConfig.projectId) {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      firestoreDb = initializeFirestore(app, {}, databaseId);
    }
  } catch (err) {
    console.error('Erro ao inicializar Firestore no servidor:', err);
  }

  return firestoreDb;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Healthcheck endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Lead capture endpoint: Saves to Firestore & Sends email via Resend
  app.post('/api/leads', async (req, res) => {
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

      console.log(`[Lead Recebido] Nome: ${trimmedName} | E-mail: ${trimmedEmail} | Opt-in: ${optIn} | Source: ${source || 'checklist_vendedor'}`);

      // 1. Save Lead into Firestore Database
      try {
        const db = getDatabaseInstance();
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
          console.log(`[Firestore] Lead de ${trimmedEmail} gravado com sucesso no banco de dados.`);
        } else {
          console.warn('[Firestore] Instância do banco de dados não disponível.');
        }
      } catch (dbError) {
        console.error('[Firestore] Erro ao gravar lead no banco de dados:', dbError);
      }

      // 2. Send Thank You & Access Email via Resend
      if (process.env.RESEND_API_KEY) {
        try {
          const resend = new Resend(process.env.RESEND_API_KEY);
          const rawFromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
          const fromAddress = rawFromEmail.includes('<')
            ? rawFromEmail.replace(/^[^<]+</, 'Guilherme R. Paranhos <')
            : `Guilherme R. Paranhos <${rawFromEmail}>`;

          if (source && String(source).startsWith('waitlist_')) {
            // E-mail para lista de espera dos produtos Beta
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
                      src="https://i.ibb.co/dwF2gW5k/1.jpg" 
                      alt="${targetProduct} - Lista VIP" 
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
            console.log(`[Resend] E-mail de waitlist enviado para ${trimmedEmail}`);
          } else {
            // E-mail do Checklist do Vendedor
            await resend.emails.send({
              from: fromAddress,
              to: trimmedEmail,
              subject: 'Seu acesso ao App Checklist do Vendedor está pronto!',
              html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0c0c0e; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #27272a; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                  <!-- Header Banner Image -->
                  <div style="width: 100%; background-color: #000000; text-align: center; border-bottom: 1px solid #27272a;">
                    <img 
                      src="https://i.ibb.co/dwF2gW5k/1.jpg" 
                      alt="Checklist do Vendedor - Feiras & Eventos" 
                      width="600"
                      style="width: 100%; max-width: 600px; height: auto; max-height: 250px; object-fit: cover; display: block; border: 0; outline: none;"
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
            console.log(`[Resend] E-mail de confirmação e checklist enviado com sucesso para ${trimmedEmail}`);
          }
        } catch (resendError) {
          console.error('[Resend] Erro ao enviar e-mail:', resendError);
        }
      } else {
        console.warn('[Resend] RESEND_API_KEY não configurada no ambiente. E-mail não disparado.');
      }

      return res.status(200).json({
        success: true,
        accessUrl: CHECKLIST_APP_URL,
      });
    } catch (error) {
      console.error('Erro no processamento do lead:', error);
      return res.status(500).json({ error: 'Erro interno ao processar o formulário.' });
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



