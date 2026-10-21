// --- SLEDOVÁNÍ NÁVŠTĚVNOSTI WEBU DO TELEGRAMU ---
document.addEventListener("DOMContentLoaded", function() {
  const TRACKING_URL = "https://script.google.com/macros/s/AKfycbyT3G9UlDFUG3klc70Dps6K5Gf_K3FfLT4QYQb4e8XRaIsPy3b3lzJO5pifDENgs5Vlwg/exec"; 
  
  const referrer = document.referrer || "Přímý přístup";
  const page = window.location.hostname + window.location.pathname;

  fetch(`${TRACKING_URL}?page=${encodeURIComponent(page)}&ref=${encodeURIComponent(referrer)}`, {
    method: 'GET',
    mode: 'no-cors' 
  }).catch(err => console.log("Chyba odesílání návštěvy:", err));
});

document.addEventListener('DOMContentLoaded', function() {
  const yearEl = document.getElementById('y');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  calculatePrice();
});

function toggleMenu() {
  const nav = document.getElementById('main-nav');
  if (nav) nav.classList.toggle('open');
}

function closeMenu() {
  const nav = document.getElementById('main-nav');
  if (nav) nav.classList.remove('open');
}

/* REÁLNÁ KALKULAČKA ÚSPORY A PŘÍMĚRŮ */
function calculatePrice() {
  const plocha = parseFloat(document.getElementById('calc-plocha')?.value) || 0;
  const tloustkaCm = parseFloat(document.getElementById('calc-tloustka')?.value) || 0;
  const platby = parseFloat(document.getElementById('calc-platby')?.value) || 0;

  const objemM3 = plocha * (tloustkaCm / 100);

  let cenaPerM3 = 1490;
  if (objemM3 > 100) {
    cenaPerM3 = 1090;
  } else if (objemM3 > 50) {
    cenaPerM3 = 1250;
  } else if (objemM3 > 30) {
    cenaPerM3 = 1350;
  }

  let celkovaCena = 0;
  if (objemM3 > 0 && objemM3 <= 15) {
    celkovaCena = 25000;
  } else {
    celkovaCena = objemM3 * cenaPerM3;
  }

  let usporaPct = 0;
  if (tloustkaCm > 0) {
    if (tloustkaCm <= 10) {
      usporaPct = 0.10 + (tloustkaCm / 10) * 0.08;
    } else if (tloustkaCm <= 20) {
      usporaPct = 0.18 + ((tloustkaCm - 10) / 10) * 0.09;
  } else if (tloustkaCm <= 30) {
      usporaPct = 0.27 + ((tloustkaCm - 20) / 10) * 0.04;
    } else if (tloustkaCm <= 40) {
      usporaPct = 0.31 + ((tloustkaCm - 30) / 10) * 0.03;
    } else {
      usporaPct = 0.34 + Math.min((tloustkaCm - 40) / 20 * 0.04, 0.04);
    }
  }

  const rocniUspora = platby * usporaPct;
  const pctDisplay = Math.round(usporaPct * 100);

  let analogyText = "";
  if (rocniUspora <= 0) {
    analogyText = "Zadejte vaše roční platby za vytápění a požadovanou tloušťku pro výpočet ušetřené částky.";
  } else if (rocniUspora < 3000) {
    analogyText = "Za to si pořídíte např. týdenní rodinný nákup nebo roční dálniční známku.";
  } else if (rocniUspora < 6000) {
    analogyText = "Za to si koupíte např. kvalitní automatický kávovar nebo chytré hodinky.";
  } else if (rocniUspora < 12000) {
    analogyText = "Za to si pořídíte např. nový tablet, kompletní výbavu na lyže nebo prodloužený víkend pro dva.";
  } else if (rocniUspora < 20000) {
    analogyText = "Za to si koupíte např. rodinnou letní dovolenou nebo novou pračku se sušičkou.";
  } else if (rocniUspora < 35000) {
    analogyText = "Za to pořídíte např. nový vlajkový smartphone / notebook nebo zimní dovolenou v Alpách pro celou rodinu.";
  } else if (rocniUspora < 50000) {
    analogyText = "Za to si můžete pořídit např. zánovní městský skútr, novou sedací soupravu nebo 2x rodinnou dovolenou ročně.";
  } else {
    analogyText = "Za to ušetříte ročně na nákup spolehlivého auta z druhé ruky nebo kompletní renovaci interiéru!";
  }

  const m3Out = document.getElementById('calc-m3-output');
  const priceOut = document.getElementById('calc-price-output');
  const pctOut = document.getElementById('calc-saving-pct');
  const savingOut = document.getElementById('calc-saving-output');
  const analogyOut = document.getElementById('calc-analogy-output');
  const unitOut = document.getElementById('calc-unit-output');

  if (m3Out) m3Out.textContent = objemM3.toFixed(1) + ' m³';
  if (priceOut) priceOut.textContent = Math.round(celkovaCena).toLocaleString('cs-CZ') + ' Kč';
  if (pctOut) pctOut.textContent = pctDisplay;
  if (savingOut) savingOut.textContent = Math.round(rocniUspora).toLocaleString('cs-CZ') + ' Kč / rok';
  if (analogyOut) analogyOut.textContent = analogyText;

  if (unitOut) {
    if (objemM3 > 0 && objemM3 <= 15) {
      unitOut.textContent = '(paušální sazba do 15 m³)';
    } else if (objemM3 > 0) {
      unitOut.textContent = '(cca ' + cenaPerM3 + ' Kč / m³)';
    } else {
      unitOut.textContent = '(zadejte platné hodnoty)';
    }
  }
}

function prefillAndScroll() {
  const plochaVal = document.getElementById('calc-plocha')?.value || '';
  const tloustkaVal = document.getElementById('calc-tloustka')?.value || '';
  const platbyVal = document.getElementById('calc-platby')?.value || '';
  const objemVal = (parseFloat(plochaVal) || 0) * ((parseFloat(tloustkaVal) || 0) / 100);

  const formPlocha = document.getElementById('plocha');
  const formTloustka = document.getElementById('tloustka_form');
  const formZprava = document.getElementById('zprava');

  if (formPlocha) formPlocha.value = plochaVal;
  if (formTloustka) formTloustka.value = tloustkaVal + ' cm (vypočteno objemově: ' + objemVal.toFixed(1) + ' m³)';
  if (formZprava) formZprava.value = 'Mám zájem o zateplení. Moje současné platby za vytápění jsou ' + platbyVal + ' Kč/rok.';

  document.getElementById('poptavka')?.scrollIntoView({ behavior: 'smooth' });
}

function selectSvepomoc() {
  const typEl = document.getElementById('typ');
  const zpravaEl = document.getElementById('zprava');
  if (typEl) typEl.value = 'Půjčení stroje & Minerální izolace svépomocí';
  if (zpravaEl) zpravaEl.value = 'Mám zájem o půjčení foukacího stroje a minerální izolaci svépomocí.';
  document.getElementById('poptavka')?.scrollIntoView({ behavior: 'smooth' });
}

function selectGarance() {
  const zpravaEl = document.getElementById('zprava');
  if (zpravaEl) zpravaEl.value = 'Mám levnější nabídku na zateplení od konkurence a chci využít vaši garanci nejlepší ceny.';
  document.getElementById('poptavka')?.scrollIntoView({ behavior: 'smooth' });
}

function setRenovacniPas(hodnota) {
  const pasEl = document.getElementById('renovacni_pas');
  if (pasEl) pasEl.value = hodnota;
  document.getElementById('poptavka')?.scrollIntoView({ behavior: 'smooth' });
}

function odeslatFormular(event) {
  event.preventDefault();
  const btn = document.getElementById('submit-btn');
  const status = document.getElementById('form-status');
  const form = document.getElementById('poptavkovy-formular');

  if (btn) btn.disabled = true;
  if (status) status.textContent = 'Odesílám poptávku...';

  const formData = {
    jmeno: document.getElementById('jmeno')?.value || '',
    telefon: document.getElementById('telefon')?.value || '',
    email: document.getElementById('email')?.value || '',
    obec: document.getElementById('obec')?.value || '',
    plocha: document.getElementById('plocha')?.value || '',
    typ: document.getElementById('typ')?.value || '',
    tloustka: document.getElementById('tloustka_form')?.value || '',
    renovacni_pas: document.getElementById('renovacni_pas')?.value || '',
    zprava: document.getElementById('zprava')?.value || ''
  };

  const scriptURL = 'https://script.google.com/macros/s/AKfycbxZnp5KanT1-EQz9epmBu3_rNlFqYs100crPGbcOYIbrieExY2iBJUbKvb7_BQ18eR_RQ/exec';

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(result => {
    if (result && result.status === 'success') {
      if (status) status.textContent = 'Poptávka byla úspěšně odeslána! Děkujeme.';
      if (form) form.reset();
    } else {
      if (status) status.textContent = 'Chyba při odesílání. Zkuste to prosím telefonicky.';
      console.error('Apps Script vrátil chybu:', result && result.message);
    }
    if (btn) btn.disabled = false;
  })
  .catch(error => {
    if (status) status.textContent = 'Chyba při odesílání. Zkuste to prosím telefonicky.';
    if (btn) btn.disabled = false;
    console.error('Síťová chyba!', error.message);
  });
}
