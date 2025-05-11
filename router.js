/* router.js  ────────────────────────────────────────────────────────────── */
(() => {
    /* ===== 1. Registry ==================================================== */
    /*  Put template filenames here (omit “.html”) or fetch them from JSON.   */
    const templates = [
      '1_auction_payment_remainder',
      '2_return_refund',
      '3_testimonial',
      '4_referral_bonus',
      '5_autobid_activation',
      '6_newsletter',
      '7_contact_form_submission',
      '8_auction_won_notif',
      '9_referral_program',
      '10_account_activation',
      '11_bid_expiry_reminder',
      '12_bid_expired',
      '13_registration_confirmation',
      '14_Password_reset',
      '15_Payment_confirm',
      '16_Shipping_confirm',
      '17_Bonus_Bid',
      '18_Account_Suspension'
    ];
 
  
    const BASE_PATH = 'mails/';   // ↔ adjust if your folder lives elsewhere
  
    /* ===== 2. Helpers ===================================================== */
    const prettyName = f =>
      f.replace(/^\d+_?/, '')        // drop leading digits + underscore
       .replace(/_/g, ' ')           // snake_case → words
       .replace(/\b\w/g, c => c.toUpperCase());
  
    const buildSidebar = (ul) => {
      templates.forEach((name,index) => {
        const li = document.createElement('li');
        const a  = document.createElement('a');
        a.href      = `#${name}`;
        a.textContent = `${index + 1}. ${prettyName(name)}`;
        li.appendChild(a);
        ul.appendChild(li);
      });
    };
  
    const highlightActive = (route) => {
      document.querySelectorAll('#mailList a').forEach(a =>
        a.classList.toggle('active', a.hash === `#${route}`)
      );
    };
  
    /* ===== 3. Router ====================================================== */
    const loadRoute = (previewEl) => {
      const route = location.hash.slice(1) || templates[0];  // default 1st
      previewEl.src = `${BASE_PATH}${route}.html`;
      highlightActive(route);
    };
  
    /* ===== 4. Bootstrapping after DOM ready ============================== */
    document.addEventListener('DOMContentLoaded', () => {
      const mailListEl = document.getElementById('mailList');
      const previewEl  = document.getElementById('preview');
  
      if (!mailListEl || !previewEl) {
        console.error('Sidebar <ul id="mailList"> or <iframe id="preview"> missing.');
        return;
      }
  
      buildSidebar(mailListEl);   // sidebar now exists, safe to populate
      loadRoute(previewEl);       // display initial template
  
      /* React to hash changes (= clicks or manual typing) */
      window.addEventListener('hashchange', () => loadRoute(previewEl));
    });
  })();
  