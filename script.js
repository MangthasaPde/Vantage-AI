// DOM Element References
const btn = document.getElementById('chat-button');
const win = document.getElementById('chat-window');
const closeBtn = document.getElementById('chat-close');
const msgs = document.getElementById('chat-messages');
const input = document.getElementById('chat-input');
const send = document.getElementById('chat-send');
const URL = 'https://mangworkspace.app.n8n.cloud/webhook/155e12e7-9616-4e1f-b2b8-ebf87ef2b446';

// Chat Button Click Handler
btn.onclick = () => { 
  win.style.display = 'flex'; 
  btn.style.display = 'none'; 
};

// Close Button Click Handler
closeBtn.onclick = () => { 
  win.style.display = 'none'; 
  btn.style.display = 'flex'; 
};

// Send Message Handler
send.onclick = () => {
  const text = input.value.trim();
  if (!text) return;
  
  input.value = '';
  append(text, 'user');
  
  // API Call to Webhook
  fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text }),
  })
  .then(response => response.json())
  .then(data => {
    const replyText = data.output || data.reply || data.answer || data.message || 'No response';
    append(replyText, 'bot');
  })
  .catch(err => { 
    console.error('Fetch error', err); 
    append('Sorry, an error occurred.', 'bot'); 
  });
};

// Enter Key Handler
input.addEventListener('keypress', e => { 
  if (e.key === 'Enter') send.click(); 
});

// Message Display Function
function append(txt, cls) {
  const d = document.createElement('div');
  d.className = `message ${cls}`;
  d.textContent = txt;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
} 