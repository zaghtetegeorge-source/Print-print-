/**
 * Infinity Graphic — special-offer & wholesale lead log (Google Sheets)
 * Paste into Extensions → Apps Script of a Google Sheet, then
 * Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone.
 */
const TZ = 'Asia/Dubai';

const SHEETS = {
  offers: ['الوقت', 'رمز العرض', 'الحالة', 'النشاط', 'جديد/قائم', 'التصاميم', 'الميزانية', 'الباقة', 'المنتجات',
           'السعر الأصلي', 'الخصم %', 'سعر العرض', 'ينتهي', 'ضغط واتساب', 'وقت الضغط', 'اللغة', 'الجهاز', 'المصدر', 'الصفحة'],
  wholesale: ['الوقت', 'الشركة', 'المنتجات', 'الكمية لكل طلب', 'التكرار', 'الإمارة', 'اللغة', 'الجهاز', 'المصدر'],
};

function sheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const title = name === 'offers' ? 'العروض الخاصة' : 'طلبات الجملة';
  let sh = ss.getSheetByName(title);
  if (!sh) {
    sh = ss.insertSheet(title);
    sh.appendRow(SHEETS[name]);
    sh.setFrozenRows(1);
    sh.setRightToLeft(true);
    sh.getRange(1, 1, 1, SHEETS[name].length).setFontWeight('bold').setBackground('#111111').setFontColor('#ffffff');
  }
  return sh;
}

function t_(ms) { return Utilities.formatDate(ms ? new Date(ms) : new Date(), TZ, 'yyyy-MM-dd HH:mm'); }
function s_(v, n) { return String(v == null ? '' : v).slice(0, n || 300); }

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const b = JSON.parse((e.postData && e.postData.contents) || '{}');

    if (b.type === 'offer' && b.code) {
      sheet_('offers').appendRow([
        t_(), s_(b.code, 12), 'عرض جديد', s_(b.biz, 40), s_(b.stage, 20), s_(b.design, 30), s_(b.budget, 30),
        s_(b.name, 80), s_(b.items, 400), Number(b.sum) || 0, Number(b.d) || 0, Number(b.total) || 0,
        t_(b.exp), 'لا', '', s_(b.lang, 4), s_(b.device, 20), s_(b.src, 120), s_(b.page, 120)
      ]);
      return out_({ ok: true });
    }

    if (b.type === 'offer_click' && b.code) {
      const sh = sheet_('offers');
      const codes = sh.getRange(1, 2, sh.getLastRow(), 1).getValues();
      for (let i = codes.length - 1; i >= 1; i--) {
        if (String(codes[i][0]) === String(b.code)) {
          sh.getRange(i + 1, 3).setValue('أرسل على واتساب');
          sh.getRange(i + 1, 14).setValue('نعم');
          sh.getRange(i + 1, 15).setValue(t_());
          sh.getRange(i + 1, 1, 1, SHEETS.offers.length).setBackground('#e6f7ec');
          break;
        }
      }
      return out_({ ok: true });
    }

    if (b.type === 'wholesale') {
      sheet_('wholesale').appendRow([
        t_(), s_(b.company, 80), s_(b.products, 300), s_(b.qty, 40), s_(b.freq, 40), s_(b.emirate, 30),
        s_(b.lang, 4), s_(b.device, 20), s_(b.src, 120)
      ]);
      return out_({ ok: true });
    }
    return out_({ ok: false, error: 'bad_request' });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return out_({ ok: true, service: 'infinity-offers-log' }); }
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
