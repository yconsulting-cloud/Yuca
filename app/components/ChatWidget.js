"use client";

import { useEffect } from 'react';

export default function ChatWidget() {
  useEffect(() => {
    // Ported/adapted chat logic from original landing page to keep identical behavior
    const SYSTEM_PROMPT = `Vous êtes l'assistant Yuca, un assistant conversationnel professionnel pour les sites web de petites entreprises (artisans, commerçants, restaurateurs, e‑commerçants).
  Vous connaissez les offres de Yuca (création de site, assistant IA, génération de photos produit/packshots) et vous aidez le visiteur à obtenir un devis, des informations sur les offres et à générer des visuels produits.

  Règles importantes :
  - Toujours demander le maximum d'informations utiles quand on prépare un site ou une génération d'images (nom du produit, description, couleurs, formats, style souhaité, usage: e‑commerce / fiche produit / réseaux sociaux, nombre d'images demandé).
  - Si l'utilisateur demande explicitement des photos produit ou des variantes (packshots, lifestyle), répondez par une sortie qui inclut la balise spéciale [ACTION:GENERATE_PHOTOS: courte description], où courte description est un prompt clair et concis pour la génération (ex: "Bouteille de sauce tomate artisanale, fond blanc, lumière studio, 4 variantes: face, incliné, zoom détail étiquette, lifestyle cuisine").
  - Lorsque vous incluez [ACTION:GENERATE_PHOTOS: ...], complétez aussi la réponse par une explication courte sur ce que l'utilisateur doit envoyer (photo de base ou brief) et proposez d'ouvrir la page Shopshots pour finaliser la génération.
  - Si l'utilisateur souhaite qu'on prenne contact ou laisse ses coordonnées, incluez [ACTION:CONTACT_FORM] pour ouvrir le formulaire de contact.

  Ton ton : professionnel, clair, orienté conversion. Donne des exemples concrets et des suggestions d'amélioration des photos (angles, contraste, accessoires).`;
    const DISPOSABLE_EMAILS = ['mailinator.com','tempmail'];

    const state = { isOpen: false, messages: [], isLoading: false, hasWelcome: false, msgTimestamps: [], isLimited: false, limitEnd: 0, formOpened: null, formSent: false };

    // Query elements with retry because dynamic mounting timing may vary
    let trigger = document.getElementById('chatTrigger');
    let chatWin = document.getElementById('chatWindow');
    let msgBox = document.getElementById('chatMessages');
    let input = document.getElementById('chatInput');
    let sendBtn = document.getElementById('chatSend');
    let badge = document.getElementById('chatBadge');

    let attachAttempts = 0;
    function queryElements(){
      trigger = document.getElementById('chatTrigger') || document.querySelector('.yuca-chat-trigger');
      chatWin = document.getElementById('chatWindow') || document.querySelector('.yuca-chat-window');
      msgBox = document.getElementById('chatMessages') || document.querySelector('.yuca-chat-messages');
      input = document.getElementById('chatInput') || document.querySelector('.yuca-chat-input input');
      sendBtn = document.getElementById('chatSend') || document.querySelector('.yuca-chat-send');
      badge = document.getElementById('chatBadge') || document.querySelector('.yuca-chat-badge');
      attachAttempts++;
      return !!trigger;
    }

    function checkLimit(){
      const now = Date.now();
      if(state.isLimited){ if(now < state.limitEnd) return {ok:false,msg:`Trop de messages. Réessayez plus tard.`}; state.isLimited=false; state.msgTimestamps=[]; }
      state.msgTimestamps = state.msgTimestamps.filter(t => now - t < 60000);
      if(state.msgTimestamps.length >= 20){ state.isLimited=true; state.limitEnd = now + 300000; return {ok:false,msg:'Pause de 5 minutes.'}; }
      state.msgTimestamps.push(now); return {ok:true};
    }

    function alreadySent(){ try { return localStorage.getItem('yuca_sent') === '1'; } catch { return state.formSent; } }
    function markSent(){ state.formSent = true; try{ localStorage.setItem('yuca_sent','1'); } catch{} }
    function esc(t){ const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
    function fmt(t){ return t.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>'); }
    function scroll(){ if(msgBox) msgBox.scrollTop = msgBox.scrollHeight; }

    function addBot(txt, sugg = null){ if(!msgBox) return; const div = document.createElement('div'); div.className='yuca-message yuca-message--bot';
      let h = `<div class="yuca-message-avatar">Y</div><div><div class="yuca-message-content">${fmt(txt)}</div>`;
      if(sugg?.length){ h += '<div class="yuca-quick-replies">'; sugg.forEach(s => { h += `<button class="yuca-quick-reply" data-v="${esc(s)}">${esc(s)}</button>`; }); h += '</div>'; }
      h += '</div>';
      div.innerHTML = h; msgBox.appendChild(div); scroll();
      div.querySelectorAll('.yuca-quick-reply').forEach(b => b.addEventListener('click', () => send(b.dataset.v)));
      state.messages.push({ role: 'assistant', content: txt });
    }

    function addUser(txt){ if(!msgBox) return; const div = document.createElement('div'); div.className='yuca-message yuca-message--user'; div.innerHTML = `<div class="yuca-message-avatar">👤</div><div class="yuca-message-content">${esc(txt)}</div>`; msgBox.appendChild(div); scroll(); state.messages.push({ role: 'user', content: txt }); }

    function addSys(txt, err = false){ if(!msgBox) return; const div = document.createElement('div'); div.className = `yuca-message yuca-message--system ${err ? 'error' : ''}`; div.innerHTML = `<div class="yuca-message-content">${txt}</div>`; msgBox.appendChild(div); scroll(); }

    function showTyping(){ if(!msgBox) return; const div = document.createElement('div'); div.className = 'yuca-message yuca-message--bot'; div.id = 'typing'; div.innerHTML = `<div class="yuca-message-avatar">Y</div><div class="yuca-typing"><span></span><span></span><span></span></div>`; msgBox.appendChild(div); scroll(); }
    function hideTyping(){ document.getElementById('typing')?.remove(); }

    async function callAPI(msg){
      try{
        const msgs = state.messages.map(m => ({ role: m.role, content: m.content }));
        const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, system: SYSTEM_PROMPT, messages: msgs }) });
        if(!res.ok) throw new Error('API error');
        const data = await res.json(); return data.content?.[0]?.text || '';
      }catch(e){ throw e; }
    }

    async function send(txt = null){
      if(!input || !sendBtn) return;
      const content = txt || input.value.trim(); if(!content || state.isLoading) return;
      const limit = checkLimit(); if(!limit.ok){ addSys(limit.msg, true); return; }
      input.value = ''; input.disabled = true; sendBtn.disabled = true; state.isLoading = true;
      addUser(content); showTyping();
      try{
        let resp = await callAPI(content); hideTyping(); let sugg = null, showForm = false, showGenerate = false, genDesc = null;
        if(resp.includes('[ACTION:CONTACT_FORM]')){ showForm = true; resp = resp.replace('[ACTION:CONTACT_FORM]','').trim(); }
        const genMatch = resp.match(/\[ACTION:GENERATE_PHOTOS(?::([^\]]+))?\]/);
        if(genMatch){ showGenerate = true; genDesc = genMatch[1] ? genMatch[1].trim() : null; resp = resp.replace(genMatch[0],'').trim(); }
        const m = resp.match(/\[SUGGESTIONS:(.+?)\]/); if(m){ sugg = m[1].split('|').map(s=>s.trim()); resp = resp.replace(m[0],'').trim(); }
        addBot(resp, sugg);
        if(showForm) setTimeout(addForm, 300);
        if(showGenerate){ // append quick action to last bot message
          setTimeout(()=>{
            if(!msgBox) return; const last = msgBox.lastElementChild; if(!last) return;
            const wrap = document.createElement('div'); wrap.className = 'yuca-generate-photos';
            const q = genDesc ? encodeURIComponent(genDesc) : '';
            const href = '/shopshots' + (q ? `?prompt=${q}` : '');
            wrap.innerHTML = `<div style="margin-top:8px"><a class="yuca-generate-btn" href="${href}">Générer des photos</a></div>`;
            last.appendChild(wrap);
          }, 200);
        }
      }catch(e){ hideTyping(); addBot(`Désolé, problème technique. Contactez-moi via contact@madebyyuca.com`, ['Réessayer','Voir les tarifs']); }
      state.isLoading = false; input.disabled = false; sendBtn.disabled = false; input.focus();
    }

    function addForm(){ if(!msgBox) return; if(alreadySent()){ addBot(`Vous avez déjà envoyé une demande. Je vous recontacte bientôt !`, ['Comment ça marche ?','Voir les tarifs']); return; }
      state.formOpened = Date.now(); const div = document.createElement('div'); div.className = 'yuca-message yuca-message--bot';
      div.innerHTML = `<div class="yuca-message-avatar">Y</div><div><div class="yuca-contact-form" id="cForm"><h4>📞 Demande de contact</h4><div class="yuca-hp"><input type="text" id="cfHp" tabindex="-1" autocomplete="off"></div><div class="yuca-cf-group"><label>Nom *</label><input type="text" id="cfName" placeholder="Votre nom"></div><div class="yuca-cf-group"><label>Email *</label><input type="email" id="cfEmail" placeholder="votre@email.com"><div class="yuca-cf-error" id="cfErr"></div></div><div class="yuca-cf-group"><label>Téléphone</label><input type="tel" id="cfPhone" placeholder="06 XX XX XX XX"></div><div class="yuca-cf-group"><label>Activité</label><select id="cfBiz"><option value="">Sélectionner...</option><option value="restaurant">Restaurant</option><option value="artisan">Artisan</option><option value="commerce">Commerce</option><option value="service">Service</option><option value="autre">Autre</option></select></div><button class="yuca-cf-submit" id="cfSend">Envoyer</button></div></div>`;
      msgBox.appendChild(div); scroll();
      document.getElementById('cfSend')?.addEventListener('click', submitForm);
      document.getElementById('cfEmail')?.addEventListener('blur', function(){ const e = this.value.trim(), err = document.getElementById('cfErr'); if(e && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){ this.classList.add('error'); err.textContent='Email invalide'; err.style.display='block'; } else { this.classList.remove('error'); err.style.display='none'; } });
    }

    function submitForm(){ const hp = document.getElementById('cfHp')?.value, name = document.getElementById('cfName')?.value.trim(), email = document.getElementById('cfEmail')?.value.trim(), phone = document.getElementById('cfPhone')?.value.trim(), biz = document.getElementById('cfBiz')?.value, btn = document.getElementById('cfSend'), form = document.getElementById('cForm');
      if(hp){ btn.textContent='✓ Envoyé !'; btn.classList.add('success'); form.classList.add('disabled'); return; }
      if(state.formOpened && Date.now() - state.formOpened < 3000){ addSys('Prenez le temps de remplir le formulaire.', true); return; }
      if(alreadySent()){ addSys('Vous avez déjà envoyé une demande.', true); return; }
      if(!name || !email){ addSys('Nom et email requis.', true); return; }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ document.getElementById('cfEmail')?.classList.add('error'); document.getElementById('cfErr').textContent='Email invalide'; document.getElementById('cfErr').style.display='block'; return; }
      markSent();
      fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, phone, business: biz, project:'chatbot', source: 'chatbot' }) });
      btn.disabled = true; btn.textContent = '✓ Envoyé !'; btn.classList.add('success'); form.classList.add('disabled'); setTimeout(()=>addBot(`Merci ${name} ! 🎉 Je vous recontacte sous 24h.`, ['Comment ça marche ?','Voir les tarifs']),500);
    }

    function toggleChat(){ state.isOpen = !state.isOpen; if(trigger) trigger.dataset.open = state.isOpen; if(chatWin) chatWin.classList.toggle('open', state.isOpen); badge?.classList.remove('show'); if(state.isOpen && !state.hasWelcome){ state.hasWelcome = true; setTimeout(()=>{ const h = new Date().getHours(); addBot(`${h>=18 ? 'Bonsoir' : 'Bonjour'} ! 👋 Je suis l'assistant Yuca. Comment puis-je vous aider ?`, ['Je veux un site','Voir les tarifs','C\'est quoi Yuca ?']); }, 400); } if(state.isOpen) setTimeout(()=> input?.focus(),300); }

    async function sendWrapper(txt){ await send(txt); }

    // Attach listeners with retries to ensure elements exist after dynamic mount
    function attachListeners(){
      if(!queryElements() && attachAttempts < 10){
        setTimeout(attachListeners, 200);
        return;
      }
      if(!trigger) { console.warn('ChatWidget: trigger not found'); return; }
      try{ trigger.style.cursor = 'pointer'; trigger.tabIndex = 0; } catch(e){}
      trigger.addEventListener('click', toggleChat);
      if(sendBtn) sendBtn.addEventListener('click', () => sendWrapper());
      if(input) input.addEventListener('keypress', (e) => { if(e.key === 'Enter'){ e.preventDefault(); sendWrapper(); } });
    }
    attachListeners();
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && state.isOpen) toggleChat(); });
    setTimeout(()=>{ if(!state.isOpen) badge?.classList.add('show'); }, 3000);

    return () => {
      // cleanup listeners (best-effort)
      try{ trigger?.removeEventListener('click', toggleChat); }catch(e){}
      try{ sendBtn?.removeEventListener('click', () => sendWrapper()); }catch(e){}
      try{ input?.removeEventListener('keypress', () => {}); }catch(e){}
      try{ document.removeEventListener('keydown', () => {}); }catch(e){}
    };
  }, []);

  // Render the original chat DOM structure so CSS matches exactly
  return (
    <>
      <button id="chatTrigger" aria-label="Ouvrir le chat" data-open="false" className="yuca-chat-trigger">
        <svg className="icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        <svg className="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
        <div id="chatBadge" className="yuca-chat-badge">1</div>
      </button>

      <div className="yuca-chat-window" id="chatWindow">
        <div id="chatMessages" className="yuca-chat-messages"></div>
        <div className="yuca-chat-input">
          <input id="chatInput" placeholder="Posez votre question..." />
          <button id="chatSend" className="yuca-chat-send" aria-label="Envoyer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
