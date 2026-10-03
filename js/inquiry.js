(function () {
  var emojiPattern = /(?:\p{Regional_Indicator}{2}|[#*0-9]\uFE0F?\u20E3|\p{Extended_Pictographic}(?:\uFE0E|\uFE0F)?(?:\p{Emoji_Modifier})?(?:\u200D\p{Extended_Pictographic}(?:\uFE0E|\uFE0F)?(?:\p{Emoji_Modifier})?)*(?:[\u{E0020}-\u{E007E}]*\u{E007F})?)/gu;

  function removeEmojis(field) {
    var original = field.value;
    var selectionStart = field.selectionStart;
    var selectionEnd = field.selectionEnd;
    var cleaned = original.replace(emojiPattern, '');
    if (cleaned === original) return;

    if (selectionStart !== null && selectionEnd !== null) {
      var cursorStart = original.slice(0, selectionStart).replace(emojiPattern, '').length;
      var cursorEnd = original.slice(0, selectionEnd).replace(emojiPattern, '').length;
      field.value = cleaned;
      field.setSelectionRange(cursorStart, cursorEnd);
    } else {
      field.value = cleaned;
    }
  }

  function filterTextInput(event) {
    var field = event.target;
    if (event.isComposing || !field.matches('input:not([type]),input[type=""],input[type="text"],input[type="email"],input[type="tel"],input[type="search"],input[type="url"],textarea')) return;
    removeEmojis(field);
  }

  document.addEventListener('input', filterTextInput, true);
  document.addEventListener('compositionend', filterTextInput, true);

  var triggers = [].slice.call(document.querySelectorAll('.inquiry-open'));
  if (!triggers.length) return;

  if (!document.querySelector('link[data-inquiry-styles]')) {
    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'css/inquiry.css';
    stylesheet.setAttribute('data-inquiry-styles', '');
    document.head.appendChild(stylesheet);
  }

  var modal = document.createElement('div');
  modal.className = 'inquiry-modal';
  modal.id = 'inquiry-modal';
  modal.hidden = true;
  modal.innerHTML = '<div class="inquiry-backdrop"></div><section class="inquiry-dialog" role="dialog" aria-modal="true" aria-labelledby="inquiry-title" aria-describedby="inquiry-description" tabindex="-1"><button class="inquiry-close" type="button" aria-label="Close inquiry form">&times;</button><h2 id="inquiry-title">Start Your Inquiry</h2><p id="inquiry-description" class="inquiry-description">Tell us a little about your event and what you&#39;re looking for. We&#39;ll get back to you with the next steps.</p><form id="inquiry-form"><div class="inquiry-fields"><label>Full Name<input name="fullName" type="text" required maxlength="150" autocomplete="name"></label><label>Phone Number<input name="phone" type="tel" required maxlength="30" autocomplete="tel"></label><label>Email<input name="email" type="email" required maxlength="254" autocomplete="email"></label><label>Event Date<input name="eventDate" type="date" required></label><label>Event Type<select name="eventType" required><option value="">Select an event type</option><option>Wedding</option><option>Birthday</option><option>Baby Shower</option><option>Corporate Event</option><option>Graduation</option><option>Anniversary</option><option>Other</option></select></label><label>Event Location<input name="eventLocation" type="text" required maxlength="300" autocomplete="street-address"></label><label>Number of Guests<input name="guestCount" type="number" min="1" max="100000" step="1" required inputmode="numeric"></label></div><fieldset class="inquiry-interests" aria-describedby="inquiry-interests-help"><legend>What are you interested in?</legend><p id="inquiry-interests-help">Select at least one.</p><div class="inquiry-interest-list"><label><input type="checkbox" name="interests" value="Small Chops">Small Chops</label><label><input type="checkbox" name="interests" value="Catering">Catering</label><label><input type="checkbox" name="interests" value="Mocktails">Mocktails</label><label><input type="checkbox" name="interests" value="Cakes/Cupcakes">Cakes/Cupcakes</label><label><input type="checkbox" name="interests" value="Luxe Setup">Luxe Setup</label></div></fieldset><label class="inquiry-message">Tell us what you&#39;d like<textarea name="message" rows="4" maxlength="5000"></textarea></label><p class="inquiry-status" role="status" aria-live="polite" hidden></p><button class="btn inquiry-submit" type="submit">Send Inquiry</button></form></section>';
  document.body.appendChild(modal);

  var dialog = modal.querySelector('.inquiry-dialog');
  var closeButton = modal.querySelector('.inquiry-close');
  var form = modal.querySelector('#inquiry-form');
  var status = modal.querySelector('.inquiry-status');
  var submitButton = modal.querySelector('.inquiry-submit');
  var interestBoxes = [].slice.call(form.querySelectorAll('input[name="interests"]'));
  var lastTrigger = null;
  var oldBodyOverflow = '';
  var oldRootOverflow = '';
  var sending = false;

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.documentElement.classList.remove('inquiry-open');
    document.body.classList.remove('inquiry-open');
    document.body.style.overflow = oldBodyOverflow;
    document.documentElement.style.overflow = oldRootOverflow;
    if (lastTrigger && document.documentElement.contains(lastTrigger)) lastTrigger.focus();
  }

  function openModal(trigger) {
    lastTrigger = trigger;
    oldBodyOverflow = document.body.style.overflow;
    oldRootOverflow = document.documentElement.style.overflow;
    modal.hidden = false;
    document.documentElement.classList.add('inquiry-open');
    document.body.classList.add('inquiry-open');
    closeButton.focus();
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      openModal(trigger);
    });
  });

  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', function (event) {
    if (event.target === modal || event.target.classList.contains('inquiry-backdrop')) closeModal();
  });

  document.addEventListener('keydown', function (event) {
    if (modal.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key === 'Tab') {
      var focusable = [].slice.call(dialog.querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[href],[tabindex]:not([tabindex="-1"])')).filter(function (item) {
        return !item.hidden && item.getClientRects().length;
      });
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  interestBoxes.forEach(function (input) {
    input.addEventListener('change', function () {
      if (interestBoxes.some(function (box) { return box.checked; })) interestBoxes[0].setCustomValidity('');
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (sending) return;
    if (!interestBoxes.some(function (input) { return input.checked; })) {
      interestBoxes[0].setCustomValidity('Select at least one interest.');
      interestBoxes[0].reportValidity();
      return;
    }
    interestBoxes[0].setCustomValidity('');

    var data = new FormData(form);
    var payload = {
      workflow: 'inquiry',
      fullName: data.get('fullName'),
      phone: data.get('phone'),
      email: data.get('email'),
      eventDate: data.get('eventDate'),
      eventType: data.get('eventType'),
      eventLocation: data.get('eventLocation'),
      guestCount: data.get('guestCount'),
      interests: data.getAll('interests'),
      message: data.get('message')
    };

    sending = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    status.hidden = true;
    status.className = 'inquiry-status';

    fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (response) {
      if (!response.ok) throw new Error('Inquiry submission failed');
      return response.json();
    }).then(function (result) {
      if (!result || result.sent !== true) throw new Error('Inquiry submission failed');
      form.hidden = true;
      status.textContent = "Thank you! Your inquiry has been received. We'll get back to you soon.";
      status.classList.add('is-success');
      status.hidden = false;
      closeButton.focus();
    }).catch(function () {
      status.textContent = "We couldn't send your inquiry right now. Please try again or contact us directly.";
      status.classList.add('is-error');
      status.hidden = false;
    }).finally(function () {
      sending = false;
      submitButton.disabled = false;
      submitButton.textContent = 'Send Inquiry';
    });
  });
})();
