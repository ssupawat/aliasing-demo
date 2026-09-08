// Bilingual (English / Thai) string table and language switching.
// Loaded before script.js so the drawing code can read translations.
(function (global) {
  var STORAGE_KEY = 'aliasing-demo-lang';
  var SUPPORTED = ['en', 'th'];
  var DEFAULT_LANG = 'en';

  var strings = {
    en: {
      'page.title': 'Aliasing in sampling — interactive Nyquist demo',
      'page.description': 'Interactive demonstration of the sampling theorem and the aliasing effect. Adjust the signal frequency and sample rate to see exactly when a wave folds into a lower, false frequency.',
      'hero.kicker': 'signal processing',
      'hero.title': 'Aliasing in sampling',
      'hero.lede': 'When the sampling rate falls below twice the signal frequency &mdash; the Nyquist rate &mdash; the resulting samples are indistinguishable from those of a different, lower-frequency wave. This page demonstrates that effect directly.',
      'lang.group': 'Language',
      'lang.en': 'EN',
      'lang.th': 'ไทย',
      'lang.en.title': 'Read this page in English',
      'lang.th.title': 'อ่านหน้านี้เป็นภาษาไทย',
      'demo.aria': 'Interactive sampling demonstration',
      'control.signalFrequency': 'Signal frequency',
      'control.sampleRate': 'Sample rate',
      'scope.label': 'time domain',
      'status.nyquist': 'Nyquist frequency',
      'status.ok': 'No aliasing — signal is reconstructed correctly',
      'status.aliased': 'Aliasing — appears as {alias} Hz instead of {signal} Hz',
      'legend.signal': 'True signal',
      'legend.samples': 'Samples',
      'legend.alias': 'Perceived signal',
      'canvas.aria.state': 'Oscilloscope view: a {signal} hertz signal sampled at {sample} hertz, {verdict}',
      'canvas.aria.aliased': 'aliased to {alias} hertz',
      'canvas.aria.clean': 'no aliasing',
      'ref.nyquist.title': 'The Nyquist condition',
      'ref.nyquist.p1': 'For a signal band-limited to a maximum frequency <span class="mono">f_max</span>, exact reconstruction from its samples requires a sampling rate <span class="mono">f_s &gt; 2&middot;f_max</span>. Half the sampling rate, <span class="mono">f_s / 2</span>, is the Nyquist frequency: the highest frequency that can be represented without ambiguity.',
      'ref.nyquist.p2': 'A component above the Nyquist frequency does not disappear &mdash; it reappears at a lower, folded frequency. For a signal frequency <span class="mono">f</span> sampled at <span class="mono">f_s</span>:',
      'formula.if': 'if r ≤ f_s / 2',
      'formula.otherwise': 'otherwise',
      'ref.examples.title': 'Where it shows up',
      'ex.audio.term': 'Audio',
      'ex.audio.body': 'a digital-to-analog converter samples above the audible range, but frequencies above its Nyquist limit fold into audible artifacts unless removed first by an analog anti-aliasing filter.',
      'ex.video.term': 'Video',
      'ex.video.body': 'the wagon-wheel effect: a wheel’s spokes appear to slow, stop, or reverse when their rotation frequency approaches the frame rate.',
      'ex.imaging.term': 'Imaging',
      'ex.imaging.body': 'a camera sensor sampling a fine repeating pattern, such as a woven fabric, can produce moiré interference that isn’t present in the original scene.',
      'footer.text': 'Static page — sampling and aliasing logic runs entirely in the browser.'
    },
    th: {
      'page.title': 'เอเลียซิง (Aliasing) ในการสุ่มตัวอย่าง — เดโมทฤษฎีบทไนควิสต์',
      'page.description': 'เดโมแบบโต้ตอบของทฤษฎีบทการสุ่มตัวอย่างและปรากฏการณ์เอเลียซิง (aliasing) ปรับความถี่สัญญาณและอัตราการสุ่มตัวอย่าง เพื่อดูว่าคลื่นพับกลับกลายเป็นความถี่ต่ำที่ผิดไปจากความจริงเมื่อใด',
      'hero.kicker': 'การประมวลผลสัญญาณ',
      'hero.title': 'เอเลียซิงในการสุ่มตัวอย่าง',
      'hero.lede': 'เมื่ออัตราการสุ่มตัวอย่างต่ำกว่าสองเท่าของความถี่สัญญาณ &mdash; ซึ่งก็คืออัตราไนควิสต์ &mdash; แซมเปิลที่ได้จะแยกไม่ออกจากแซมเปิลของคลื่นอีกลูกหนึ่งที่มีความถี่ต่ำกว่า หน้านี้สาธิตปรากฏการณ์ดังกล่าวโดยตรง',
      'lang.group': 'ภาษา',
      'lang.en': 'EN',
      'lang.th': 'ไทย',
      'lang.en.title': 'Read this page in English',
      'lang.th.title': 'อ่านหน้านี้เป็นภาษาไทย',
      'demo.aria': 'การสาธิตการสุ่มตัวอย่างแบบโต้ตอบ',
      'control.signalFrequency': 'ความถี่สัญญาณ',
      'control.sampleRate': 'อัตราการสุ่มตัวอย่าง',
      'scope.label': 'โดเมนเวลา',
      'status.nyquist': 'ความถี่ไนควิสต์',
      'status.ok': 'ไม่เกิดเอเลียซิง — สร้างสัญญาณกลับคืนได้ถูกต้อง',
      'status.aliased': 'เกิดเอเลียซิง — ปรากฏเป็น {alias} Hz แทนที่จะเป็น {signal} Hz',
      'legend.signal': 'สัญญาณจริง',
      'legend.samples': 'แซมเปิล',
      'legend.alias': 'สัญญาณที่รับรู้',
      'canvas.aria.state': 'ภาพออสซิลโลสโคป: สัญญาณ {signal} เฮิรตซ์ สุ่มตัวอย่างที่ {sample} เฮิรตซ์ {verdict}',
      'canvas.aria.aliased': 'เกิดเอเลียซิงที่ {alias} เฮิรตซ์',
      'canvas.aria.clean': 'ไม่เกิดเอเลียซิง',
      'ref.nyquist.title': 'เงื่อนไขไนควิสต์',
      'ref.nyquist.p1': 'สำหรับสัญญาณที่จำกัดแถบความถี่ไว้ที่ความถี่สูงสุด <span class="mono">f_max</span> การสร้างสัญญาณกลับคืนจากแซมเปิลได้อย่างถูกต้องต้องใช้อัตราการสุ่มตัวอย่าง <span class="mono">f_s &gt; 2&middot;f_max</span> ครึ่งหนึ่งของอัตราการสุ่มตัวอย่าง คือ <span class="mono">f_s / 2</span> เรียกว่าความถี่ไนควิสต์ ซึ่งเป็นความถี่สูงสุดที่แทนค่าได้โดยไม่กำกวม',
      'ref.nyquist.p2': 'องค์ประกอบที่มีความถี่สูงกว่าความถี่ไนควิสต์จะไม่หายไป &mdash; แต่จะปรากฏกลับมาที่ความถี่ต่ำกว่าโดยพับกลับเข้ามา สำหรับสัญญาณความถี่ <span class="mono">f</span> ที่สุ่มตัวอย่างด้วยอัตรา <span class="mono">f_s</span>:',
      'formula.if': 'เมื่อ r ≤ f_s / 2',
      'formula.otherwise': 'กรณีอื่น',
      'ref.examples.title': 'พบได้ที่ไหนบ้าง',
      'ex.audio.term': 'เสียง',
      'ex.audio.body': 'ตัวแปลงดิจิทัลเป็นแอนะล็อก (DAC) สุ่มตัวอย่างที่อัตราสูงกว่าย่านที่หูได้ยิน แต่ความถี่ที่สูงเกินขีดจำกัดไนควิสต์จะพับกลับลงมาเป็นสิ่งแปลกปลอมที่ได้ยินได้ หากไม่ถูกกรองออกก่อนด้วยฟิลเตอร์แอนติเอเลียซิง (anti-aliasing filter) แบบแอนะล็อก',
      'ex.video.term': 'วิดีโอ',
      'ex.video.body': 'ปรากฏการณ์ล้อเกวียน: ซี่ล้อดูเหมือนหมุนช้าลง หยุดนิ่ง หรือหมุนกลับทาง เมื่อความถี่การหมุนเข้าใกล้เฟรมเรตของภาพ',
      'ex.imaging.term': 'ภาพถ่าย',
      'ex.imaging.body': 'เซนเซอร์กล้องที่สุ่มตัวอย่างลวดลายซ้ำ ๆ ที่ละเอียด เช่น เนื้อผ้าทอ อาจทำให้เกิดลายแทรกสอดมัวเร (moiré) ซึ่งไม่มีอยู่จริงในฉากต้นฉบับ',
      'footer.text': 'หน้าเว็บแบบสแตติก — การคำนวณการสุ่มตัวอย่างและเอเลียซิงทั้งหมดทำงานในเบราว์เซอร์'
    }
  };

  var current = DEFAULT_LANG;
  var listeners = [];

  function isSupported(lang) {
    return SUPPORTED.indexOf(lang) !== -1;
  }

  // Precedence: ?lang= in the URL, then a previous choice, then the browser's
  // preferred languages, then English.
  function detect() {
    var fromQuery = new URLSearchParams(global.location.search).get('lang');
    if (isSupported(fromQuery)) return fromQuery;

    var stored = null;
    try {
      stored = global.localStorage.getItem(STORAGE_KEY);
    } catch (e) { /* storage blocked — fall through */ }
    if (isSupported(stored)) return stored;

    var prefs = global.navigator.languages || [global.navigator.language || ''];
    for (var i = 0; i < prefs.length; i++) {
      var tag = String(prefs[i]).toLowerCase().split('-')[0];
      if (isSupported(tag)) return tag;
    }
    return DEFAULT_LANG;
  }

  function t(key, params) {
    var table = strings[current] || strings[DEFAULT_LANG];
    var value = table[key];
    if (value === undefined) value = strings[DEFAULT_LANG][key];
    if (value === undefined) return key;
    if (!params) return value;
    return value.replace(/\{(\w+)\}/g, function (match, name) {
      return Object.prototype.hasOwnProperty.call(params, name) ? params[name] : match;
    });
  }

  // Text nodes go through textContent; the few strings carrying inline markup
  // are marked data-i18n-html and are literals from the table above.
  function applyToDom() {
    document.documentElement.lang = current;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria-label')));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
    });

    document.title = t('page.title');
    setMeta('name', 'description', t('page.description'));
    setMeta('property', 'og:title', t('page.title'));
    setMeta('property', 'og:description', t('page.description'));
    setMeta('property', 'og:locale', current === 'th' ? 'th_TH' : 'en_US');
    setMeta('property', 'og:locale:alternate', current === 'th' ? 'en_US' : 'th_TH');
    setMeta('name', 'twitter:title', t('page.title'));
    setMeta('name', 'twitter:description', t('page.description'));

    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      var base = canonical.href.split('?')[0];
      canonical.href = current === DEFAULT_LANG ? base : base + '?lang=' + current;
    }

    document.querySelectorAll('[data-lang-option]').forEach(function (el) {
      var active = el.getAttribute('data-lang-option') === current;
      el.setAttribute('aria-current', active ? 'true' : 'false');
      el.classList.toggle('is-active', active);
    });
  }

  function setMeta(attr, name, value) {
    var el = document.head.querySelector('meta[' + attr + '="' + name + '"]');
    if (el) el.setAttribute('content', value);
  }

  function setLang(lang, options) {
    if (!isSupported(lang) || lang === current) return;
    current = lang;
    try {
      global.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* storage blocked — the URL still carries the choice */ }

    if (!options || options.updateUrl !== false) {
      var url = new URL(global.location.href);
      if (lang === DEFAULT_LANG) url.searchParams.delete('lang');
      else url.searchParams.set('lang', lang);
      global.history.replaceState(null, '', url);
    }

    applyToDom();
    listeners.forEach(function (fn) { fn(current); });
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  function init() {
    current = detect();
    applyToDom();

    document.querySelectorAll('[data-lang-option]').forEach(function (el) {
      el.addEventListener('click', function (event) {
        event.preventDefault();
        setLang(el.getAttribute('data-lang-option'));
      });
    });
  }

  global.I18N = {
    t: t,
    setLang: setLang,
    onChange: onChange,
    init: init,
    get lang() { return current; }
  };
})(window);
