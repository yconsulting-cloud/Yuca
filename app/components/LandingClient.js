"use client";
import { useEffect } from 'react';

export default function LandingClient() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.__yucaLandingInit) return;
    window.__yucaLandingInit = true;

    const debounce = (fn, wait) => {
      let t;
      return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
    };

    const nav = document.getElementById('nav');
    const burger = document.getElementById('navBurger');
    const mobile = document.getElementById('navMobile');
    const overlay = document.getElementById('navOverlay');
    const mobileLinks = mobile ? mobile.querySelectorAll('a') : [];

    function handleScroll() { if (nav) nav.dataset.scrolled = window.scrollY > 50; }
    function toggleMenu() {
      if (!mobile || !overlay || !burger) return;
      const open = mobile.dataset.open === 'true';
      const next = !open;
      mobile.dataset.open = String(next);
      overlay.dataset.visible = String(next);
      burger.setAttribute('aria-expanded', String(next));
      document.body.style.overflow = next ? 'hidden' : '';
    }
    function closeMenu() { if (!mobile || !overlay || !burger) return; mobile.dataset.open = 'false'; overlay.dataset.visible = 'false'; burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }

    const onScroll = debounce(handleScroll, 10);
    const onBurgerClick = () => toggleMenu();
    const onOverlayClick = () => closeMenu();
    const onKeyDown = (e) => { if (e.key === 'Escape' && mobile && mobile.dataset.open === 'true') { closeMenu(); burger && burger.focus(); } };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    if (burger) burger.addEventListener('click', onBurgerClick);
    if (overlay) overlay.addEventListener('click', onOverlayClick);
    const mobileLinkHandlers = [];
    mobileLinks.forEach(l => {
      const fn = () => closeMenu();
      mobileLinkHandlers.push({ el: l, fn });
      l.addEventListener('click', fn);
    });
    document.addEventListener('keydown', onKeyDown);

    // Smooth internal anchor scrolling
    const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
    const anchorHandlers = [];
    anchorLinks.forEach(a => {
      const handler = function (e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
        }
      };
      anchorHandlers.push({ el: a, fn: handler });
      a.addEventListener('click', handler);
    });

    // Reveal animations
    const reveals = document.querySelectorAll('[data-reveal]');
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    let obs = null;
    if (!reduced && 'IntersectionObserver' in window) {
      obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-revealed'); obs.unobserve(e.target); } }); }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      reveals.forEach(el => obs.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('is-revealed'));
    }

    // Contact form handler (simple)
    const contactForm = document.getElementById('contactForm');
    let contactSubmitHandler = null;
    if (contactForm) {
      contactSubmitHandler = (e) => {
        e.preventDefault();
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const biz = document.getElementById('business')?.value || '';
        const offer = document.getElementById('offer')?.value || '';
        const project = document.getElementById('project')?.value || '';
        fetch('/api/lead', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, business: biz, offer, project, source: 'form' })
        }).catch(() => {});
        alert('Merci ! Je vous recontacte sous 24h.');
        contactForm.reset();
      };
      contactForm.addEventListener('submit', contactSubmitHandler);
    }

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    return () => {
      // cleanup listeners
      window.__yucaLandingInit = false;
      window.removeEventListener('scroll', onScroll);
      if (burger) burger.removeEventListener('click', onBurgerClick);
      if (overlay) overlay.removeEventListener('click', onOverlayClick);
      mobileLinkHandlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
      document.removeEventListener('keydown', onKeyDown);
      anchorHandlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
      if (obs) obs.disconnect();
      if (contactForm && contactSubmitHandler) contactForm.removeEventListener('submit', contactSubmitHandler);
      document.body.style.overflow = '';
    };
  }, []);

  return null;
}
