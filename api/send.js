import { Resend } from 'resend';

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return res.status(400).json({ error: 'Input too long' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'ahmadfachri846@gmail.com',
      subject: `Pesan dari ${safeName}`,
      html: `
        <h3>Pesan Baru dari Portfolio</h3>
        <p><strong>Nama:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Pesan:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (error) {
      return res.status(500).json({ error: 'Failed to send message' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
