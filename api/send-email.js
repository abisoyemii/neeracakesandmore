const nodemailer = require('nodemailer');

const recipients = [
  'orders@neeracakesandmore.com',
  'bookings@neeracakesandmore.com'
];
const brandedSender = 'info@neeracakesandmore.com';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function sendEmail(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const requestCode = typeof body.requestCode === 'string' ? body.requestCode : '';
  const replyTo = typeof body.replyTo === 'string' ? body.replyTo.trim() : '';
  const message = typeof body.message === 'string' ? body.message : '';

  if (!/^NC-\d{4}$/.test(requestCode) ||
      !emailPattern.test(replyTo) ||
      message.length < 50 ||
      message.length > 20000 ||
      message.indexOf('New order request ' + requestCode) !== 0) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const secureSetting = process.env.SMTP_SECURE;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM;

  if (!host || !Number.isInteger(port) || port < 1 || port > 65535 ||
      !['true', 'false'].includes(secureSetting) || !user || !password ||
      !from || from.toLowerCase() !== brandedSender ||
      /[\r\n]/.test(host + user + from)) {
    return res.status(503).json({ error: 'Email notification unavailable' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: secureSetting === 'true',
      requireTLS: secureSetting === 'false',
      auth: { user: user, pass: password },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000
    });

    await transporter.sendMail({
      from: brandedSender,
      to: recipients,
      replyTo: replyTo,
      subject: 'NeeraCakesAndMore order and event request ' + requestCode,
      text: message
    });

    return res.status(200).json({ sent: true });
  } catch (error) {
    console.error('Order email notification failed.');
    return res.status(502).json({ error: 'Email notification unavailable' });
  }
};