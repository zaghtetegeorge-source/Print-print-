/* Infinity Graphic – personalised 30-minute offer */
(function () {
  var L = window.IGL || 'ar', CAT = window.IGCAT || {}, WA = '971542503114';
  var KEY = 'igOffer', DIS = 'igOfferDismissed', MIN = 30;
  var AR = L === 'ar';
  var X = AR ? {
    tag: 'عرض خاص لك', t0: 'هل ترغب بتخصيص عرض خاص لنشاطك التجاري؟',
    s0: 'أجب عن أربعة أسئلة سريعة، ونجهّز لك باقة طباعة بسعر خاص صالح لمدة 30 دقيقة.',
    yes: 'نعم، خصّص لي عرضاً', no: 'لا، شكراً', step: 'السؤال',
    q: ['ما نوع نشاطك التجاري؟', 'هل نشاطك جديد أم قائم؟', 'هل لديك تصاميم جاهزة؟', 'ما الميزانية التقريبية للطباعة؟'],
    o: [
      [['restaurant', '🍽️', 'مطعم أو مقهى'], ['realestate', '🏢', 'عقارات'], ['clinic', '🩺', 'عيادة أو صالون'], ['shop', '🛍️', 'متجر أو تجارة'], ['services', '💼', 'شركة خدمات'], ['other', '✨', 'نشاط آخر']],
      [['new', '🚀', 'نشاط جديد / افتتاح قريب'], ['existing', '📈', 'نشاط قائم']],
      [['ready', '✅', 'نعم، لديّ تصاميم جاهزة'], ['design', '🎨', 'أحتاج إلى تصميم']],
      [['low', '💵', 'أقل من 300 درهم'], ['mid', '💰', '300 – 800 درهم'], ['high', '🏆', 'أكثر من 800 درهم'], ['unsure', '🤔', 'غير متأكد']]
    ],
    loading: 'نجهّز باقتك الخاصة…', your: 'باقتك الخاصة', code: 'رمز العرض',
    orig: 'السعر الأصلي', aed: 'درهم', off: 'خصم', left: 'ينتهي العرض خلال',
    book: 'احجز العرض عبر واتساب', later: 'متابعة التصفح',
    expired: 'انتهت صلاحية هذا العرض', expiredS: 'يسعدنا مساعدتك عبر واتساب في اختيار الباقة المناسبة لنشاطك.',
    contact: 'تواصل عبر واتساب', badge: 'عرضك الخاص ينتهي خلال',
    design: 'تصميم احترافي مجاني لجميع منتجات الباقة', review: 'مراجعة فنية مجانية لملفاتك قبل الطباعة',
    freeDel: 'توصيل مجاني إلى أي إمارة', del: 'التوصيل 25 درهماً أو استلام مجاني من عجمان',
    opening: 'خصم إضافي بمناسبة الافتتاح', payAfter: 'الدفع بعد اعتماد التصميم',
    names: { restaurant: 'المطاعم والمقاهي', realestate: 'العقارات', clinic: 'العيادات والصالونات', shop: 'المتاجر', services: 'شركات الخدمات', other: 'الأعمال' },
    pkg: function (n, isNew) { return (isNew ? 'باقة الانطلاقة لـ' : 'باقة النمو لـ') + n; },
    tz: 'بتوقيت الإمارات', valid: 'صالح حتى',
    msg: function (o) {
      return 'مرحباً، أرغب في حجز عرضي الخاص.\nرمز العرض: ' + o.code + '\n' + o.name + ':\n' +
        o.items.map(function (i) { return '• ' + CAT[i].n + ' (' + fmt(CAT[i].p) + ' درهم)'; }).join('\n') +
        '\nالسعر الأصلي: ' + fmt(o.sum) + ' درهم\nسعر العرض: ' + fmt(o.total) + ' درهم (خصم ' + o.d + '%)\nالمزايا: ' + o.perks.join('، ') +
        '\nصالح حتى: ' + clock(o.exp) + ' بتوقيت الإمارات';
    }
  } : {
    tag: 'Your special offer', t0: 'Would you like a special offer tailored to your business?',
    s0: 'Answer four quick questions and we will prepare a printing package at a special price, valid for 30 minutes.',
    yes: 'Yes, tailor my offer', no: 'No, thank you', step: 'Question',
    q: ['What type of business do you run?', 'Is your business new or established?', 'Do you have ready designs?', 'What is your approximate printing budget?'],
    o: [
      [['restaurant', '🍽️', 'Restaurant or café'], ['realestate', '🏢', 'Real estate'], ['clinic', '🩺', 'Clinic or salon'], ['shop', '🛍️', 'Shop or retail'], ['services', '💼', 'Services company'], ['other', '✨', 'Other business']],
      [['new', '🚀', 'New / opening soon'], ['existing', '📈', 'Established business']],
      [['ready', '✅', 'Yes, my designs are ready'], ['design', '🎨', 'I need a design']],
      [['low', '💵', 'Under AED 300'], ['mid', '💰', 'AED 300 – 800'], ['high', '🏆', 'Over AED 800'], ['unsure', '🤔', 'Not sure yet']]
    ],
    loading: 'Preparing your package…', your: 'Your package', code: 'Offer code',
    orig: 'Regular price', aed: 'AED', off: 'off', left: 'Offer ends in',
    book: 'Book this offer on WhatsApp', later: 'Continue browsing',
    expired: 'This offer has expired', expiredS: 'We would be glad to help you choose the right package on WhatsApp.',
    contact: 'Chat on WhatsApp', badge: 'Your offer ends in',
    design: 'Free professional design for all package items', review: 'Free pre-press check of your files',
    freeDel: 'Free delivery to any Emirate', del: 'AED 25 delivery or free pickup in Ajman',
    opening: 'Extra grand-opening discount', payAfter: 'Pay after design approval',
    names: { restaurant: 'Restaurants & Cafés', realestate: 'Real Estate', clinic: 'Clinics & Salons', shop: 'Retail', services: 'Service Companies', other: 'Businesses' },
    pkg: function (n, isNew) { return (isNew ? 'Launch Package for ' : 'Growth Package for ') + n; },
    tz: 'UAE time', valid: 'Valid until',
    msg: function (o) {
      return 'Hello, I would like to book my special offer.\nOffer code: ' + o.code + '\n' + o.name + ':\n' +
        o.items.map(function (i) { return '• ' + CAT[i].n + ' (AED ' + fmt(CAT[i].p) + ')'; }).join('\n') +
        '\nRegular price: AED ' + fmt(o.sum) + '\nOffer price: AED ' + fmt(o.total) + ' (' + o.d + '% off)\nIncludes: ' + o.perks.join(', ') +
        '\nValid until: ' + clock(o.exp) + ' UAE time';
    }
  };

  var MAP = {
    restaurant: ['business-cards', 'flyers', 'table-mats', 'stickers', 'roll-up', 'kraft-bags'],
    realestate: ['premium-cards', 'brochures', 'roll-up', 'flyers', 'letterhead', 'envelopes'],
    clinic: ['business-cards', 'roll-up', 'bill-books', 'flyers', 'stickers', 'letterhead'],
    shop: ['business-cards', 'stickers', 'flyers', 'roll-up', 'bill-books', 'kraft-bags'],
    services: ['business-cards', 'letterhead', 'roll-up', 'bill-books', 'flyers', 'envelopes'],
    other: ['business-cards', 'flyers', 'stickers', 'roll-up', 'letterhead', 'bill-books']
  };
  var CAP = { low: 320, mid: 850, high: 2300, unsure: 600 };

  function rnd(n) { var a = new Uint32Array(1); (window.crypto || window.msCrypto).getRandomValues(a); return a[0] % n; }
  function fmt(n) { var s = (Math.round(n * 100) / 100).toFixed(2); s = s.replace(/\.00$/, ''); return s.replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function clock(t) { try { return new Date(t).toLocaleTimeString(AR ? 'ar-AE' : 'en-AE', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dubai' }); } catch (e) { return new Date(t).toTimeString().slice(0, 5); } }
  function load() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function active() { var o = load(); return o && o.exp > Date.now() ? o : null; }
  function waLink(t) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t); }

  function build(a) {
    var list = MAP[a[0]].slice(), head = list.shift();
    for (var i = list.length - 1; i > 0; i--) { var j = rnd(i + 1), t = list[i]; list[i] = list[j]; list[j] = t; }
    list.unshift(head);
    var cap = CAP[a[3]], items = [], sum = 0;
    list.forEach(function (id) { if (items.length < 4 && sum + CAT[id].p <= cap) { items.push(id); sum += CAT[id].p; } });
    if (items.length < 2) {
      var cheap = list.slice().sort(function (x, y) { return CAT[x].p - CAT[y].p; });
      items = []; sum = 0;
      cheap.slice(0, 2).forEach(function (id) { items.push(id); sum += CAT[id].p; });
    }
    var isNew = a[1] === 'new';
    var d = 5 + rnd(6) + (isNew ? 2 : 0);          // 5–10%, +2% for new businesses
    var total = Math.floor(sum * (1 - d / 100));
    var perks = [a[2] === 'design' ? X.design : X.review, total >= 300 ? X.freeDel : X.del];
    if (isNew) perks.push(X.opening);
    perks.push(X.payAfter);
    var abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', code = 'IG-';
    for (var k = 0; k < 4; k++) code += abc[rnd(abc.length)];
    return { code: code, name: X.pkg(X.names[a[0]], isNew), items: items, sum: sum, total: total, d: d, perks: perks, exp: Date.now() + MIN * 60000, lang: L };
  }

  var om, ob, badge, timer, ans = [];
  function close() { om.classList.remove('show'); document.body.style.overflow = ''; try { sessionStorage.setItem(DIS, '1'); } catch (e) {} paintBadge(); }
  function open() {
    var o = load();
    if (o && o.exp > Date.now()) showOffer(o);
    else if (o) showExpired();
    else intro();
    om.classList.add('show'); document.body.style.overflow = 'hidden'; badge.style.display = 'none';
  }
  function hdr() { return '<button class="ox" aria-label="close" data-x>×</button><span class="otag">' + X.tag + '</span>'; }
  function intro() {
    ob.innerHTML = hdr() + '<h3>' + X.t0 + '</h3><p class="os">' + X.s0 + '</p><button class="obtn dark" data-go>' + X.yes + '</button><button class="obtn light" data-x>' + X.no + '</button>';
    ob.querySelector('[data-go]').onclick = function () { ans = []; ask(0); };
  }
  function ask(i) {
    var opts = X.o[i].map(function (o) { return '<button data-v="' + o[0] + '"><span>' + o[1] + '</span>' + o[2] + '</button>'; }).join('');
    ob.innerHTML = hdr() + '<div class="obar"><i style="width:' + ((i + 1) * 25) + '%"></i></div><div class="os" style="color:var(--muted);font-size:13px">' + X.step + ' ' + (i + 1) + ' / 4</div><div class="oq">' + X.q[i] + '</div><div class="oo">' + opts + '</div>';
    [].forEach.call(ob.querySelectorAll('[data-v]'), function (b) {
      b.onclick = function () { ans[i] = b.getAttribute('data-v'); if (i < 3) ask(i + 1); else generate(); };
    });
  }
  function generate() {
    ob.innerHTML = hdr() + '<div class="oload"><i></i><p class="os" style="margin-top:12px">' + X.loading + '</p></div>';
    setTimeout(function () { var o = build(ans); save(o); showOffer(o); try { gtag('event', 'offer_generated', { offer_code: o.code, value: o.total, currency: 'AED' }); } catch (e) {} }, 1400);
  }
  function left(o) { var s = Math.max(0, Math.round((o.exp - Date.now()) / 1000)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }
  function showOffer(o) {
    var li = o.items.map(function (i) { return '<li><span>' + CAT[i].n + '</span><em>' + (AR ? fmt(CAT[i].p) + ' ' + X.aed : X.aed + ' ' + fmt(CAT[i].p)) + '</em></li>'; }).join('');
    var pk = o.perks.map(function (p) { return '<div class="perk">✓ ' + p + '</div>'; }).join('');
    var price = AR ? fmt(o.total) + ' <small style="font-size:14px">' + X.aed + '</small>' : '<small style="font-size:14px">' + X.aed + '</small> ' + fmt(o.total);
    ob.innerHTML = hdr() + '<h3>' + X.your + '</h3><div class="opk"><div class="on">' + o.name + '</div><div class="oc">' + X.code + ': <b dir="ltr">' + o.code + '</b> · ' + X.valid + ' ' + clock(o.exp) + ' (' + X.tz + ')</div><ul>' + li + '</ul>' + pk +
      '<div class="tot"><span><s>' + X.orig + ': ' + fmt(o.sum) + '</s><br><span style="color:var(--price);font-weight:700;font-size:13.5px">' + X.off + ' ' + o.d + '%</span></span><b>' + price + '</b></div></div>' +
      '<div class="otimer">⏳ ' + X.left + ' <b id="otl">' + left(o) + '</b></div>' +
      '<a class="obtn green" href="' + waLink(X.msg(o)) + '">' + X.book + '</a><button class="obtn light" data-x>' + X.later + '</button>';
    tick();
  }
  function showExpired() {
    ob.innerHTML = hdr() + '<h3>' + X.expired + '</h3><p class="os">' + X.expiredS + '</p><a class="obtn green" href="' + waLink(AR ? 'مرحباً، أرغب في الاستفسار عن باقات الطباعة.' : 'Hello, I would like to enquire about printing packages.') + '">' + X.contact + '</a><button class="obtn light" data-x>' + X.later + '</button>';
  }
  function paintBadge() {
    var o = active();
    if (!o || om.classList.contains('show')) { badge.style.display = 'none'; return; }
    badge.innerHTML = '🎁 ' + X.badge + ' <b>' + left(o) + '</b>'; badge.style.display = 'block';
  }
  function tick() {
    clearInterval(timer);
    timer = setInterval(function () {
      var o = load(), el = document.getElementById('otl');
      if (o && el) { el.textContent = left(o); if (o.exp <= Date.now()) showExpired(); }
      paintBadge();
    }, 1000);
  }

  function init() {
    om = document.getElementById('om'); ob = document.getElementById('ob'); badge = document.getElementById('obadge');
    if (!om) return;
    om.addEventListener('click', function (e) { if (e.target === om || (e.target.closest && e.target.closest('[data-x]'))) close(); });
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-offer]');
      if (t) { e.preventDefault(); document.body.classList.remove('xopen'); open(); }
    });
    badge.onclick = open;
    tick(); paintBadge();
    var seen; try { seen = sessionStorage.getItem(DIS); } catch (e) {}
    if (!load() && !seen) setTimeout(function () { if (!om.classList.contains('show')) open(); }, 6000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
