"use client";
import { useEffect } from 'react';

export default function LandingClient() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.__yucaLandingInit) return;
    window.__yucaLandingInit = true;

    // Capture UTM source from URL and persist in sessionStorage
    function getLeadSource() {
      try {
        const params = new URLSearchParams(window.location.search);
        const utmSource = params.get('utm_source') || params.get('ref');
        if (utmSource) sessionStorage.setItem('yuca_utm_source', utmSource);
        return sessionStorage.getItem('yuca_utm_source') || 'form';
      } catch { return 'form'; }
    }

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
    function closeMenu() {
      if (!mobile || !overlay || !burger) return;
      mobile.dataset.open = 'false';
      overlay.dataset.visible = 'false';
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    const onScroll = debounce(handleScroll, 10);
    const onBurgerClick = () => toggleMenu();
    const onOverlayClick = () => closeMenu();
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && mobile && mobile.dataset.open === 'true') {
        closeMenu();
        burger && burger.focus();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    if (burger) burger.addEventListener('click', onBurgerClick);
    if (overlay) overlay.addEventListener('click', onOverlayClick);
    const mobileClose = document.getElementById('navMobileClose');
    if (mobileClose) mobileClose.addEventListener('click', () => closeMenu());
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
      obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('is-revealed'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      reveals.forEach(el => obs.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('is-revealed'));
    }

    // ── COUNTER ANIMATION ────────────────────────────────────────
    // Fires after the hero fadeUp animation completes (~1.8s)
    let counterTimeout = null;
    if (!reduced) {
      counterTimeout = setTimeout(() => {
        document.querySelectorAll('.hero__stat-value').forEach(el => {
          const textNode = el.childNodes[0];
          if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;
          const target = parseInt(textNode.nodeValue.trim(), 10);
          if (isNaN(target) || target <= 1) return;
          const duration = 1400;
          const startTime = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            textNode.nodeValue = String(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      }, 1800);
    }

    // ── MAGNETIC BUTTONS (desktop / pointer device only) ─────────
    const magnetHandlers = [];
    const isPointer = window.matchMedia('(hover: hover) and (min-width: 768px)').matches;
    if (!reduced && isPointer) {
      const magnetBtns = document.querySelectorAll(
        '.hero__cta--primary, .nav__cta, .cta-section__btn, .form__submit, .service-card__cta--primary'
      );
      magnetBtns.forEach(btn => {
        const onMove = (e) => {
          const rect = btn.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
          btn.style.transform = `translate(${x}px, ${y}px)`;
        };
        const onLeave = () => { btn.style.transform = ''; };
        btn.addEventListener('mousemove', onMove);
        btn.addEventListener('mouseleave', onLeave);
        magnetHandlers.push({ el: btn, onMove, onLeave });
      });
    }

    // ── HERO PARALLAX (large desktop only) ───────────────────────
    let heroMoveHandler = null;
    let heroLeaveHandler = null;
    const isLargeDesktop = window.matchMedia('(hover: hover) and (min-width: 1024px)').matches;
    if (!reduced && isLargeDesktop) {
      const heroVisual = document.querySelector('.hero__visual');
      const hero = document.querySelector('.hero');
      if (heroVisual && hero) {
        heroMoveHandler = (e) => {
          const rect = hero.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
          const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
          heroVisual.style.transform = `perspective(1200px) rotateY(${x * 5}deg) rotateX(${y * -3}deg) scale3d(1.02,1.02,1.02)`;
        };
        heroLeaveHandler = () => {
          heroVisual.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
          heroVisual.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
          setTimeout(() => { if (heroVisual) heroVisual.style.transition = ''; }, 650);
        };
        hero.addEventListener('mousemove', heroMoveHandler);
        hero.addEventListener('mouseleave', heroLeaveHandler);
      }
    }

    // ── CONTACT FORM ─────────────────────────────────────────────
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
          body: JSON.stringify({ name, email, phone, business: biz, offer, project, source: getLeadSource() })
        }).catch(() => {});
        alert(contactForm.dataset.successMsg || 'Merci !');
        contactForm.reset();
      };
      contactForm.addEventListener('submit', contactSubmitHandler);
    }

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    return () => {
      window.__yucaLandingInit = false;
      window.removeEventListener('scroll', onScroll);
      if (burger) burger.removeEventListener('click', onBurgerClick);
      if (overlay) overlay.removeEventListener('click', onOverlayClick);
      mobileLinkHandlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
      document.removeEventListener('keydown', onKeyDown);
      anchorHandlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
      if (obs) obs.disconnect();
      if (contactForm && contactSubmitHandler) contactForm.removeEventListener('submit', contactSubmitHandler);
      if (counterTimeout) clearTimeout(counterTimeout);
      magnetHandlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      });
      const hero = document.querySelector('.hero');
      if (hero && heroMoveHandler) hero.removeEventListener('mousemove', heroMoveHandler);
      if (hero && heroLeaveHandler) hero.removeEventListener('mouseleave', heroLeaveHandler);
      document.body.style.overflow = '';
    };
  }, []);

  return null;
}
