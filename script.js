(function () {
  var sigSlider = document.getElementById('sigFreq');
  var sampSlider = document.getElementById('sampRate');
  var sigOut = document.getElementById('sigFreqOut');
  var sampOut = document.getElementById('sampRateOut');
  var nyquistOut = document.getElementById('nyquistOut');
  var statusMsg = document.getElementById('statusMsg');
  var aliasLegend = document.getElementById('aliasLegend');
  var canvas = document.getElementById('waveCanvas');
  var ctx = canvas.getContext('2d');

  function msg(key, params) {
    return window.I18N ? window.I18N.t(key, params) : key;
  }

  var COLOR_SIGNAL = '#37B6A6';
  var COLOR_ALIAS = '#E2574C';
  var COLOR_SAMPLE = '#F2B705';
  var COLOR_AXIS = '#3A3F45';

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return rect;
  }

  // Folds a signal frequency into the [0, f_sample/2] range it will
  // actually appear as once sampled. `sign` flips when the fold reflects
  // the wave (needed to draw the perceived curve through the same samples).
  function computeAlias(fSignal, fSample) {
    var nyquist = fSample / 2;
    var r = fSignal % fSample;
    if (r < 0) r += fSample;
    var alias, sign;
    if (r <= nyquist) {
      alias = r;
      sign = 1;
    } else {
      alias = fSample - r;
      sign = -1;
    }
    return {
      nyquist: nyquist,
      alias: alias,
      sign: sign,
      isAliased: fSignal > nyquist + 1e-9
    };
  }

  function round1(n) {
    return Math.round(n * 10) / 10;
  }

  function draw() {
    var fSignal = parseFloat(sigSlider.value);
    var fSample = parseFloat(sampSlider.value);
    sigOut.textContent = fSignal;
    sampOut.textContent = fSample;

    var res = computeAlias(fSignal, fSample);
    nyquistOut.textContent = round1(res.nyquist) + ' Hz';

    if (res.isAliased) {
      statusMsg.textContent = msg('status.aliased', { alias: round1(res.alias), signal: fSignal });
      statusMsg.classList.remove('ok');
      statusMsg.classList.add('warn');
      aliasLegend.classList.add('show');
    } else {
      statusMsg.textContent = msg('status.ok');
      statusMsg.classList.remove('warn');
      statusMsg.classList.add('ok');
      aliasLegend.classList.remove('show');
    }

    canvas.setAttribute('aria-label', msg('canvas.aria.state', {
      signal: fSignal,
      sample: fSample,
      verdict: res.isAliased
        ? msg('canvas.aria.aliased', { alias: round1(res.alias) })
        : msg('canvas.aria.clean')
    }));

    var rect = resize();
    var w = rect.width, h = rect.height;
    ctx.clearRect(0, 0, w, h);

    var midY = h / 2;
    var amp = h * 0.36;
    var duration = 1;
    var steps = 500;

    ctx.strokeStyle = COLOR_AXIS;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(w, midY);
    ctx.stroke();

    ctx.strokeStyle = COLOR_SIGNAL;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (var i = 0; i <= steps; i++) {
      var t = (i / steps) * duration;
      var x = (i / steps) * w;
      var y = midY - Math.sin(2 * Math.PI * fSignal * t) * amp;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    if (res.isAliased) {
      ctx.strokeStyle = COLOR_ALIAS;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      for (var j = 0; j <= steps; j++) {
        var t2 = (j / steps) * duration;
        var x2 = (j / steps) * w;
        var y2 = midY - res.sign * Math.sin(2 * Math.PI * res.alias * t2) * amp;
        if (j === 0) ctx.moveTo(x2, y2); else ctx.lineTo(x2, y2);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.fillStyle = COLOR_SAMPLE;
    var numSamples = Math.floor(fSample * duration);
    for (var n = 0; n <= numSamples; n++) {
      var ts = n / fSample;
      if (ts > duration) break;
      var xs = (ts / duration) * w;
      var ys = midY - Math.sin(2 * Math.PI * fSignal * ts) * amp;
      ctx.beginPath();
      ctx.arc(xs, ys, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  sigSlider.addEventListener('input', draw);
  sampSlider.addEventListener('input', draw);
  window.addEventListener('resize', draw);

  if (window.I18N) {
    window.I18N.init();
    window.I18N.onChange(draw);
  }
  draw();
})();
