const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const brandedDomain = 'neeracakesandmore.com';
const submissionRecipient = 'oluwafunmilayo_bello@yahoo.com';
const eventTypes = ['Wedding', 'Birthday', 'Baby Shower', 'Corporate Event', 'Graduation', 'Anniversary', 'Other'];
const interestsAllowed = ['Small Chops', 'Catering', 'Mocktails', 'Cakes/Cupcakes', 'Luxe Setup'];

function response(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
}

function validInquiry(body) {
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
  const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(eventDate)
    ? new Date(eventDate + 'T00:00:00Z')
    : null;
  const dateIsValid = parsedDate && !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === eventDate;

  if (!fullName || fullName.length > 150 || /[\u0000-\u001f\u007f]/.test(fullName) ||
      !/^[+()\d .-]{7,30}$/.test(phone) ||
      !emailPattern.test(email) || email.length > 254 ||
      !dateIsValid ||
      !eventTypes.includes(eventType) ||
      !eventLocation || eventLocation.length > 300 || /[\u0000-\u001f\u007f]/.test(eventLocation) ||
      !/^\d{1,6}$/.test(guestCount) || Number(guestCount) < 1 || Number(guestCount) > 100000 ||
      !Array.isArray(interests) || interests.length < 1 || interests.length > interestsAllowed.length ||
      interests.some(function (interest) {
        return typeof interest !== 'string' || !interestsAllowed.includes(interest);
      }) ||
      new Set(interests).size !== interests.length ||
      message.length > 5000) {
    return null;
  }

  return {
    replyTo: email,
    text: [
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
    ].join('\n'),
    from: 'info@' + brandedDomain,
    to: submissionRecipient,
    subject: 'New Website Inquiry - NeeraCakesAndMore'
  };
}

function validOrder(body, workflow) {
  const requestCode = typeof body.requestCode === 'string' ? body.requestCode : '';
  const replyTo = typeof body.replyTo === 'string' ? body.replyTo.trim() : '';
  const text = typeof body.message === 'string' ? body.message : '';

  if (!/^NC-\d{4}$/.test(requestCode) ||
      !emailPattern.test(replyTo) ||
      text.length < 50 ||
      text.length > 20000 ||
      text.indexOf('New order request ' + requestCode) !== 0) {
    return null;
  }

  const mailbox = workflow === 'booking' ? 'bookings' : 'orders';
  return {
    from: mailbox + '@' + brandedDomain,
    to: submissionRecipient,
    replyTo: replyTo,
    subject: workflow === 'booking'
      ? 'NeeraCakesAndMore booking request ' + requestCode
      : 'NeeraCakesAndMore order request ' + requestCode,
    text: text
  };
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      ...response(405, { error: 'Method not allowed' }),
      headers: { 'Content-Type': 'application/json', Allow: 'POST' }
    };
  }

  let body;
  try {
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || '', 'base64').toString('utf8')
      : event.body;
    body = JSON.parse(rawBody || '');
  } catch (error) {
    return response(400, { error: 'Invalid request' });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return response(400, { error: 'Invalid request' });
  }

  const workflow = body.workflow;
  let email;
  if (workflow === 'inquiry') {
    email = validInquiry(body);
  } else if (workflow === 'order' || workflow === 'booking') {
    email = validOrder(body, workflow);
  } else {
    return response(400, { error: 'Invalid request' });
  }

  if (!email) return response(400, { error: 'Invalid request' });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return response(503, { error: 'Email notification unavailable' });

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'NeeraCakesAndMore <' + email.from + '>',
        to: [email.to],
        reply_to: email.replyTo,
        subject: email.subject,
        text: email.text
      })
    });

    if (!resendResponse.ok) {
      console.error('Resend email delivery failed with status ' + resendResponse.status + '.');
      return response(502, { error: 'Email notification unavailable' });
    }

    return response(200, { sent: true });
  } catch (error) {
    console.error('Resend email delivery request failed.');
    return response(502, { error: 'Email notification unavailable' });
  }
};
