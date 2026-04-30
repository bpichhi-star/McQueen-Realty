import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Strip HTML to keep email body safe
const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const {
    formType = 'contact',     // 'contact' | 'sell' | 'rent'
    name = '',
    firstName = '',
    lastName = '',
    email = '',
    phone = '',
    address = '',
    timeline = '',
    area = '',
    beds = '',
    message = '',
    // honeypot — bots fill any field they see
    website = '',
  } = body;

  // Honeypot tripped → silently accept
  if (website) return Response.json({ ok: true });

  // Minimum requirements: a name + valid-looking email
  const fullName = name || `${firstName} ${lastName}`.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!fullName || !emailOk) {
    return Response.json({ ok: false, error: 'Name and valid email required' }, { status: 400 });
  }

  const SMTP_USER = process.env.NEO_SMTP_USER;
  const SMTP_PASS = process.env.NEO_SMTP_PASSWORD;
  const SMTP_HOST = process.env.NEO_SMTP_HOST || 'smtp0001.neo.space';
  const SMTP_PORT = Number(process.env.NEO_SMTP_PORT || 465);
  const TO = process.env.LEAD_TO_EMAIL || 'info@mcqueenrealty.com';

  if (!SMTP_USER || !SMTP_PASS) {
    console.error('[contact] SMTP env vars not configured');
    return Response.json({ ok: false, error: 'Server email not configured' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const subject =
    formType === 'sell'
      ? `New Seller Inquiry — ${fullName}`
      : formType === 'rent'
      ? `New Rental Inquiry — ${fullName}`
      : `New Website Inquiry — ${fullName}`;

  // Build a plain readable email body, only including fields that have values
  const rows = [
    ['Form', formType.toUpperCase()],
    ['Name', fullName],
    ['Email', email],
    ['Phone', phone],
    ['Address', address],
    ['Timeline', timeline],
    ['Preferred Area', area],
    ['Bedrooms', beds],
    ['Message', message],
  ].filter(([, v]) => v && String(v).trim());

  const textBody = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  const htmlBody = `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 640px;">
      <h2 style="font-family: 'Barlow Condensed', sans-serif; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #000; border-bottom: 2px solid #C4A35A; padding-bottom: 0.5rem;">${esc(subject)}</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding: 0.5rem 0.8rem 0.5rem 0; vertical-align: top; color: #999; font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase; white-space: nowrap; border-bottom: 1px solid #eee;">${esc(k)}</td>
            <td style="padding: 0.5rem 0; vertical-align: top; color: #111; font-size: 0.95rem; border-bottom: 1px solid #eee;">${esc(v).replace(/\n/g, '<br>')}</td>
          </tr>`
          )
          .join('')}
      </table>
      <p style="color: #999; font-size: 0.75rem; margin-top: 1.5rem;">Submitted via mcqueenrealty.com · Reply directly to this email to respond to ${esc(fullName)}.</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"McQueen Realty Website" <${SMTP_USER}>`,
      to: TO,
      replyTo: `"${fullName}" <${email}>`,
      subject,
      text: textBody,
      html: htmlBody,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[contact] SMTP send failed:', err?.message || err);
    return Response.json({ ok: false, error: 'Could not send message' }, { status: 502 });
  }
}
