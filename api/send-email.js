const nodemailer = require('nodemailer');

const recipients = [
  'orders@neeracakesandmore.com',
  'bookings@neeracakesandmore.com'
];
const brandedSender = 'info@neeracakesandmore.com';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inquiryRecipient = 'info@neeracakesandmore.com';
const inquirySubject = 'New Website Inquiry - NeeraCakesAndMore';
const inquiryEventTypes = ['Wedding', 'Birthday', 'Baby Shower', 'Corporate Event', 'Graduation', 'Anniversary', 'Other'];
const inquiryInterests = ['Small Chops', 'Catering', 'Mocktails', 'Cakes/Cupcakes', 'Luxe Setup'];

module.exports = async function sendEmail(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const isInquiry = body.workflow === 'inquiry';
  let mailOptions;

  if (isInquiry) {
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const eventDate = typeof body.eventDate === 'string' ? body.eventDate : '';
    const eventType = typeof body.eventType === 'string' ? body.eventType : '';
    const eventLocation = typeof body.eventLocation === 'string' ? body.eventLocation.trim() : '';
    const guestCount = typeof body.guestCount === 'string' || typeof body.guestCount === 'number'
      ? String(body.guestCount)
      : '';
    const interests = body.interests;
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const dateValue = /^\d{4}-\d{2}-\d{2}$/.test(eventDate) ? new Date(eventDate + 'T00:00:00Z') : null;
    const dateIsValid = dateValue && !Number.isNaN(dateValue.getTime()) &&
      dateValue.toISOString().slice(0, 10) === eventDate;

    if (!fullName || fullName.length > 150 || /[\u0000-\u001f\u007f]/.test(fullName) ||
        !/^[+()\d .-]{7,30}$/.test(phone) ||
        !emailPattern.test(email) || email.length > 254 ||
        !dateIsValid ||
        !inquiryEventTypes.includes(eventType) ||
        !eventLocation || eventLocation.length > 300 || /[\u0000-\u001f\u007f]/.test(eventLocation) ||
        !/^\d{1,6}$/.test(guestCount) || Number(guestCount) < 1 || Number(guestCount) > 100000 ||
        !Array.isArray(interests) || interests.length < 1 || interests.length > inquiryInterests.length ||
        interests.some(function (interest) { return typeof interest !== 'string' || !inquiryInterests.includes(interest); }) ||
        new Set(interests).size !== interests.length ||
        message.length > 5000) {
      return res.status(400).json({ error: 'Invalid inquiry' });
    }

    const inquiryMessage = [
      'New website inquiry',
      '',
      'Full Name: ' + fullName,
      'Phone Number: ' + phone,
      'Email: ' + email,
      'Event Date: ' + eventDate,
      'Event Type: ' + eventType,
      'Event Location: ' + eventLocation,
      'Number of Guests: ' + guestCount,
      'Selected Interests: ' + interests.join(', '),
      'Customer Message: ' + (message || 'Not provided')
    ].join('\n');

    mailOptions = {
      from: brandedSender,
      to: inquiryRecipient,
      replyTo: email,
      subject: inquirySubject,
      text: inquiryMessage
    };
  } else {
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

    mailOptions = {
      from: brandedSender,
      to: recipients,
      replyTo: replyTo,
      subject: 'NeeraCakesAndMore order and event request ' + requestCode,
      text: message
    };
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

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ sent: true });
  } catch (error) {
    console.error(isInquiry ? 'Inquiry email notification failed.' : 'Order email notification failed.');
    return res.status(502).json({ error: 'Email notification unavailable' });
  }
};