/**
 * Infinity Graphic — orders backend (Google Sheets)
 * 1) Change ADMIN_KEY below to your own secret word (the dashboard password).
 * 2) Deploy > New deployment > Web app > Execute as: Me > Who has access: Anyone.
 * 3) Copy the Web app URL and put it in index.html → const API_URL='...'
 */
const ADMIN_KEY = 'CHANGE-ME-123';
const SHEET_NAME = 'الطلبات';
const HEADERS = ['رقم الفاتورة', 'التاريخ', 'الاسم', 'الموبايل', 'النشاط', 'المجموع', 'الدفع', 'الاستلام', 'الحالة', 'موقّعة', 'البيانات'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.setRightToLeft(true);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const sh = sheet_();

    if (body.action === 'new' && body.order && body.order.no) {
      const o = body.order;
      o.status = 'جديد';
      sh.appendRow([
        o.no, new Date(), o.name || '', "'" + (o.phone || ''), o.biz || '',
        Number(o.t) || 0, o.pay || '', o.shipTxt || '', 'جديد', o.signature ? 'نعم' : 'لا',
        JSON.stringify(o)
      ]);
      return json_({ ok: true });
    }

    if (body.action === 'status') {
      if (body.key !== ADMIN_KEY) return json_({ ok: false, error: 'key' });
      const data = sh.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(body.no)) {
          sh.getRange(i + 1, 9).setValue(body.status);
          return json_({ ok: true });
        }
      }
      return json_({ ok: false, error: 'not_found' });
    }

    return json_({ ok: false, error: 'bad_request' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  if (!e.parameter || e.parameter.key !== ADMIN_KEY) return json_({ ok: false, error: 'key' });
  const data = sheet_().getDataRange().getValues();
  const orders = [];
  for (let i = 1; i < data.length; i++) {
    try {
      const o = JSON.parse(data[i][10]);
      o.status = data[i][8] || 'جديد';
      orders.push(o);
    } catch (_) {}
  }
  return json_({ ok: true, orders: orders });
}
