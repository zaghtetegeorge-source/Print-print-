/* Infinity Graphic – Meta Pixel (dataset 1526991388919694) */
(function () {
  var PIXEL = '1526991388919694';
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', PIXEL);
  fbq('track', 'PageView');

  // Product pages → ViewContent
  var p = location.pathname.replace(/\/$/, '');
  var m = p.match(/^\/(?:print|business-cards)\/([^/.]+)/);
  if (m) fbq('track', 'ViewContent', { content_name: m[1], content_category: 'print', currency: 'AED' });

  // WhatsApp / call clicks → Contact
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (/wa\.me|whatsapp\.com/i.test(h)) fbq('track', 'Contact', { method: 'whatsapp', page: p || '/' });
    else if (/^tel:/i.test(h)) fbq('track', 'Contact', { method: 'call', page: p || '/' });
  }, true);
})();
