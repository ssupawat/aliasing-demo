// Bilingual (English / Thai) string table and language switching.
// Loaded before script.js so the drawing code can read translations.
(function (global) {
  var STORAGE_KEY = 'aliasing-demo-lang';
  var SUPPORTED = ['en', 'th'];
  var DEFAULT_LANG = 'en';

  var strings = {
    en: {
      'page.title': 'Aliasing in sampling \u2014 interactive Nyquist demo',
      'page.description': 'Interactive demo of the sampling theorem and aliasing: see when a wave folds into a false lower frequency, and why that shapes the hardware ahead of every ADC.',
      'hero.kicker': 'signal processing',
      'hero.title': 'Aliasing in sampling',
      'hero.lede': 'When the sampling rate falls below twice the signal frequency &mdash; the Nyquist rate &mdash; the resulting samples are indistinguishable from those of a different, lower-frequency wave. This page demonstrates that effect directly.',
      'lang.group': 'Language',
      'lang.en': 'EN',
      'lang.th': '\u0e44\u0e17\u0e22',
      'lang.en.title': 'Read this page in English',
      'lang.th.title': '\u0e2d\u0e48\u0e32\u0e19\u0e2b\u0e19\u0e49\u0e32\u0e19\u0e35\u0e49\u0e40\u0e1b\u0e47\u0e19\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22',
      'demo.aria': 'Interactive sampling demonstration',
      'control.signalFrequency': 'Signal frequency',
      'control.sampleRate': 'Sample rate',
      'scope.label': 'time domain',
      'status.nyquist': 'Nyquist frequency',
      'status.ok': 'No aliasing \u2014 signal is reconstructed correctly',
      'status.aliased': 'Aliasing \u2014 appears as {alias} Hz instead of {signal} Hz',
      'legend.signal': 'True signal',
      'legend.samples': 'Samples',
      'legend.alias': 'Perceived signal',
      'canvas.aria.state': 'Oscilloscope view: a {signal} hertz signal sampled at {sample} hertz, {verdict}',
      'canvas.aria.aliased': 'aliased to {alias} hertz',
      'canvas.aria.clean': 'no aliasing',
      'ref.nyquist.title': 'The Nyquist condition',
      'ref.nyquist.p1': 'For a signal band-limited to a maximum frequency <span class="mono">f_max</span>, exact reconstruction from its samples requires a sampling rate <span class="mono">f_s &gt; 2&middot;f_max</span>. Half the sampling rate, <span class="mono">f_s / 2</span>, is the Nyquist frequency: the highest frequency that can be represented without ambiguity.',
      'ref.nyquist.p2': 'A component above the Nyquist frequency does not disappear &mdash; it reappears at a lower, folded frequency. For a signal frequency <span class="mono">f</span> sampled at <span class="mono">f_s</span>:',
      'formula.if': 'if r \u2264 f_s / 2',
      'formula.otherwise': 'otherwise',
      'ref.examples.title': 'Where it shows up',
      'ex.audio.term': 'Audio',
      'ex.audio.body': 'a digital-to-analog converter samples above the audible range, but frequencies above its Nyquist limit fold into audible artifacts unless removed first by an analog anti-aliasing filter.',
      'ex.video.term': 'Video',
      'ex.video.body': 'the wagon-wheel effect: a wheel\u2019s spokes appear to slow, stop, or reverse when their rotation frequency approaches the frame rate.',
      'ex.imaging.term': 'Imaging',
      'ex.imaging.body': 'a camera sensor sampling a fine repeating pattern, such as a woven fabric, can produce moir\u00e9 interference that isn\u2019t present in the original scene.',
      'ref.hardware.title': 'What it forces the hardware to do',
      'ref.hardware.intro': 'Aliasing is not a rounding error to be cleaned up later. Once two frequencies land on the same samples, nothing downstream can tell them apart, so the fix has to sit in front of the converter \u2014 in hardware. That one constraint shapes most of an analog front end.',
      'hw.filter.term': 'The anti-aliasing filter is analog, and it comes first',
      'hw.filter.body': 'No amount of DSP separates a folded frequency from a real one, so the filter has to remove it before the sampler ever sees it. That means a physical low-pass on the board \u2014 op-amps, resistors, capacitors \u2014 costing area, power, and some phase distortion near the band edge. It is also why a 100 Hz control loop still needs one: an ADC\u2019s input bandwidth is usually far wider than its sample rate, so 20 kHz motor PWM noise reaches the sampler and folds straight into the band you are trying to regulate.',
      'hw.rate.term': 'The filter picks the sample rate, not Nyquist',
      'hw.rate.body': 'Nyquist allows 40 kHz for 20 kHz audio; CDs use 44.1 kHz. That extra 4.1 kHz of rate buys 2.05 kHz of transition band, because a real filter cannot fall from passband to stopband instantly. Raise the sample rate and the analog filter gets gentler and cheaper; lower it and the filter gets steep, expensive, and phase-ugly \u2014 or you alias. Every converter datasheet is a point chosen on that trade.',
      'hw.oversampling.term': 'Oversampling moves the hard part into the digital domain',
      'hw.oversampling.body': 'Sigma-delta converters sample at megahertz rates so the analog anti-aliasing filter can be a single resistor and capacitor. The steep filtering then happens digitally, before decimating back down to the output rate, where it is exact, repeatable, and costs only gates. Trading analog precision for digital filtering is the default in modern audio and instrumentation front ends.',
      'hw.undersampling.term': 'Sometimes the fold is the feature',
      'hw.undersampling.body': 'Bandpass sampling aliases on purpose: a 70 MHz IF sampled at 25 MSPS lands at 5 MHz, already down at baseband. Direct-RF receivers and software-defined radios use this to delete an entire mixer stage. The anti-aliasing filter becomes a band-pass admitting exactly one band, so only the wanted signal folds \u2014 and the ADC\u2019s input bandwidth, not its sample rate, becomes the spec that matters.',
      'footer.text': 'Static page \u2014 sampling and aliasing logic runs entirely in the browser.'
    },
    th: {
      'page.title': 'Aliasing \u0e43\u0e19\u0e01\u0e32\u0e23\u0e2a\u0e38\u0e48\u0e21\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07 \u2014 \u0e2a\u0e32\u0e18\u0e34\u0e15\u0e17\u0e24\u0e29\u0e0e\u0e35\u0e1a\u0e17 Nyquist \u0e41\u0e1a\u0e1a\u0e42\u0e15\u0e49\u0e15\u0e2d\u0e1a',
      'page.description': '\u0e2a\u0e32\u0e18\u0e34\u0e15\u0e17\u0e24\u0e29\u0e0e\u0e35\u0e1a\u0e17\u0e01\u0e32\u0e23\u0e2a\u0e38\u0e48\u0e21\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e41\u0e25\u0e30 aliasing \u0e41\u0e1a\u0e1a\u0e42\u0e15\u0e49\u0e15\u0e2d\u0e1a \u0e14\u0e39\u0e27\u0e48\u0e32\u0e04\u0e25\u0e37\u0e48\u0e19\u0e1e\u0e31\u0e1a\u0e01\u0e25\u0e31\u0e1a\u0e40\u0e1b\u0e47\u0e19\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48\u0e15\u0e48\u0e33\u0e17\u0e35\u0e48\u0e1c\u0e34\u0e14\u0e08\u0e32\u0e01\u0e04\u0e27\u0e32\u0e21\u0e08\u0e23\u0e34\u0e07\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e43\u0e14 \u0e41\u0e25\u0e30\u0e17\u0e33\u0e44\u0e21\u0e21\u0e31\u0e19\u0e16\u0e36\u0e07\u0e01\u0e33\u0e2b\u0e19\u0e14\u0e2b\u0e19\u0e49\u0e32\u0e15\u0e32 hardware \u0e17\u0e35\u0e48\u0e2d\u0e22\u0e39\u0e48\u0e2b\u0e19\u0e49\u0e32 ADC',
      'hero.kicker': '\u0e01\u0e32\u0e23\u0e1b\u0e23\u0e30\u0e21\u0e27\u0e25\u0e1c\u0e25\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13',
      'hero.title': 'Aliasing \u0e43\u0e19\u0e01\u0e32\u0e23\u0e2a\u0e38\u0e48\u0e21\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07',
      'hero.lede': '\u0e40\u0e21\u0e37\u0e48\u0e2d sample rate \u0e15\u0e48\u0e33\u0e01\u0e27\u0e48\u0e32\u0e2a\u0e2d\u0e07\u0e40\u0e17\u0e48\u0e32\u0e02\u0e2d\u0e07\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13 &mdash; \u0e0b\u0e36\u0e48\u0e07\u0e01\u0e47\u0e04\u0e37\u0e2d\u0e2d\u0e31\u0e15\u0e23\u0e32 Nyquist &mdash; sample \u0e17\u0e35\u0e48\u0e44\u0e14\u0e49\u0e08\u0e30\u0e41\u0e22\u0e01\u0e44\u0e21\u0e48\u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01 sample \u0e02\u0e2d\u0e07\u0e04\u0e25\u0e37\u0e48\u0e19\u0e2d\u0e35\u0e01\u0e25\u0e39\u0e01\u0e2b\u0e19\u0e36\u0e48\u0e07\u0e17\u0e35\u0e48\u0e21\u0e35\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48\u0e15\u0e48\u0e33\u0e01\u0e27\u0e48\u0e32 \u0e2b\u0e19\u0e49\u0e32\u0e19\u0e35\u0e49\u0e2a\u0e32\u0e18\u0e34\u0e15\u0e1b\u0e23\u0e32\u0e01\u0e0f\u0e01\u0e32\u0e23\u0e13\u0e4c\u0e14\u0e31\u0e07\u0e01\u0e25\u0e48\u0e32\u0e27\u0e42\u0e14\u0e22\u0e15\u0e23\u0e07',
      'lang.group': '\u0e20\u0e32\u0e29\u0e32',
      'lang.en': 'EN',
      'lang.th': '\u0e44\u0e17\u0e22',
      'lang.en.title': 'Read this page in English',
      'lang.th.title': '\u0e2d\u0e48\u0e32\u0e19\u0e2b\u0e19\u0e49\u0e32\u0e19\u0e35\u0e49\u0e40\u0e1b\u0e47\u0e19\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22',
      'demo.aria': '\u0e01\u0e32\u0e23\u0e2a\u0e32\u0e18\u0e34\u0e15\u0e01\u0e32\u0e23\u0e2a\u0e38\u0e48\u0e21\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e41\u0e1a\u0e1a\u0e42\u0e15\u0e49\u0e15\u0e2d\u0e1a',
      'control.signalFrequency': '\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13',
      'control.sampleRate': 'Sample rate',
      'scope.label': 'time domain',
      'status.nyquist': '\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48 Nyquist',
      'status.ok': '\u0e44\u0e21\u0e48\u0e40\u0e01\u0e34\u0e14 aliasing \u2014 \u0e2a\u0e23\u0e49\u0e32\u0e07\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13\u0e01\u0e25\u0e31\u0e1a\u0e04\u0e37\u0e19\u0e44\u0e14\u0e49\u0e16\u0e39\u0e01\u0e15\u0e49\u0e2d\u0e07',
      'status.aliased': '\u0e40\u0e01\u0e34\u0e14 aliasing \u2014 \u0e1b\u0e23\u0e32\u0e01\u0e0f\u0e40\u0e1b\u0e47\u0e19 {alias} Hz \u0e41\u0e17\u0e19\u0e17\u0e35\u0e48\u0e08\u0e30\u0e40\u0e1b\u0e47\u0e19 {signal} Hz',
      'legend.signal': '\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13\u0e08\u0e23\u0e34\u0e07',
      'legend.samples': 'Sample',
      'legend.alias': '\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13\u0e17\u0e35\u0e48\u0e23\u0e31\u0e1a\u0e23\u0e39\u0e49',
      'canvas.aria.state': '\u0e20\u0e32\u0e1e oscilloscope: \u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13 {signal} Hz \u0e2a\u0e38\u0e48\u0e21\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e17\u0e35\u0e48 {sample} Hz {verdict}',
      'canvas.aria.aliased': '\u0e40\u0e01\u0e34\u0e14 aliasing \u0e17\u0e35\u0e48 {alias} Hz',
      'canvas.aria.clean': '\u0e44\u0e21\u0e48\u0e40\u0e01\u0e34\u0e14 aliasing',
      'ref.nyquist.title': '\u0e40\u0e07\u0e37\u0e48\u0e2d\u0e19\u0e44\u0e02 Nyquist',
      'ref.nyquist.p1': '\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13\u0e17\u0e35\u0e48\u0e08\u0e33\u0e01\u0e31\u0e14\u0e41\u0e16\u0e1a\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48\u0e44\u0e27\u0e49\u0e17\u0e35\u0e48\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48\u0e2a\u0e39\u0e07\u0e2a\u0e38\u0e14 <span class="mono">f_max</span> \u0e01\u0e32\u0e23\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13\u0e01\u0e25\u0e31\u0e1a\u0e04\u0e37\u0e19\u0e08\u0e32\u0e01 sample \u0e44\u0e14\u0e49\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e16\u0e39\u0e01\u0e15\u0e49\u0e2d\u0e07\u0e15\u0e49\u0e2d\u0e07\u0e43\u0e0a\u0e49 sample rate <span class="mono">f_s &gt; 2&middot;f_max</span> \u0e04\u0e23\u0e36\u0e48\u0e07\u0e2b\u0e19\u0e36\u0e48\u0e07\u0e02\u0e2d\u0e07 sample rate \u0e04\u0e37\u0e2d <span class="mono">f_s / 2</span> \u0e40\u0e23\u0e35\u0e22\u0e01\u0e27\u0e48\u0e32\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48 Nyquist \u0e0b\u0e36\u0e48\u0e07\u0e40\u0e1b\u0e47\u0e19\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48\u0e2a\u0e39\u0e07\u0e2a\u0e38\u0e14\u0e17\u0e35\u0e48\u0e41\u0e17\u0e19\u0e04\u0e48\u0e32\u0e44\u0e14\u0e49\u0e42\u0e14\u0e22\u0e44\u0e21\u0e48\u0e01\u0e33\u0e01\u0e27\u0e21',
      'ref.nyquist.p2': '\u0e2d\u0e07\u0e04\u0e4c\u0e1b\u0e23\u0e30\u0e01\u0e2d\u0e1a\u0e17\u0e35\u0e48\u0e21\u0e35\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48\u0e2a\u0e39\u0e07\u0e01\u0e27\u0e48\u0e32\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48 Nyquist \u0e08\u0e30\u0e44\u0e21\u0e48\u0e2b\u0e32\u0e22\u0e44\u0e1b &mdash; \u0e41\u0e15\u0e48\u0e08\u0e30\u0e1b\u0e23\u0e32\u0e01\u0e0f\u0e01\u0e25\u0e31\u0e1a\u0e21\u0e32\u0e17\u0e35\u0e48\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48\u0e15\u0e48\u0e33\u0e01\u0e27\u0e48\u0e32\u0e42\u0e14\u0e22\u0e1e\u0e31\u0e1a\u0e01\u0e25\u0e31\u0e1a\u0e40\u0e02\u0e49\u0e32\u0e21\u0e32 \u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48 <span class="mono">f</span> \u0e17\u0e35\u0e48\u0e2a\u0e38\u0e48\u0e21\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e14\u0e49\u0e27\u0e22\u0e2d\u0e31\u0e15\u0e23\u0e32 <span class="mono">f_s</span>:',
      'formula.if': '\u0e40\u0e21\u0e37\u0e48\u0e2d r \u2264 f_s / 2',
      'formula.otherwise': '\u0e01\u0e23\u0e13\u0e35\u0e2d\u0e37\u0e48\u0e19',
      'ref.examples.title': '\u0e1e\u0e1a\u0e44\u0e14\u0e49\u0e17\u0e35\u0e48\u0e44\u0e2b\u0e19\u0e1a\u0e49\u0e32\u0e07',
      'ex.audio.term': '\u0e40\u0e2a\u0e35\u0e22\u0e07',
      'ex.audio.body': 'DAC \u0e2a\u0e38\u0e48\u0e21\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e17\u0e35\u0e48\u0e2d\u0e31\u0e15\u0e23\u0e32\u0e2a\u0e39\u0e07\u0e01\u0e27\u0e48\u0e32\u0e22\u0e48\u0e32\u0e19\u0e17\u0e35\u0e48\u0e2b\u0e39\u0e44\u0e14\u0e49\u0e22\u0e34\u0e19 \u0e41\u0e15\u0e48\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48\u0e17\u0e35\u0e48\u0e2a\u0e39\u0e07\u0e40\u0e01\u0e34\u0e19\u0e02\u0e35\u0e14\u0e08\u0e33\u0e01\u0e31\u0e14 Nyquist \u0e08\u0e30\u0e1e\u0e31\u0e1a\u0e01\u0e25\u0e31\u0e1a\u0e25\u0e07\u0e21\u0e32\u0e40\u0e1b\u0e47\u0e19\u0e2a\u0e34\u0e48\u0e07\u0e41\u0e1b\u0e25\u0e01\u0e1b\u0e25\u0e2d\u0e21\u0e17\u0e35\u0e48\u0e44\u0e14\u0e49\u0e22\u0e34\u0e19\u0e44\u0e14\u0e49 \u0e2b\u0e32\u0e01\u0e44\u0e21\u0e48\u0e16\u0e39\u0e01\u0e01\u0e23\u0e2d\u0e07\u0e2d\u0e2d\u0e01\u0e01\u0e48\u0e2d\u0e19\u0e14\u0e49\u0e27\u0e22 anti-aliasing filter \u0e41\u0e1a\u0e1a analog',
      'ex.video.term': '\u0e27\u0e34\u0e14\u0e35\u0e42\u0e2d',
      'ex.video.body': '\u0e1b\u0e23\u0e32\u0e01\u0e0f\u0e01\u0e32\u0e23\u0e13\u0e4c\u0e25\u0e49\u0e2d\u0e40\u0e01\u0e27\u0e35\u0e22\u0e19: \u0e0b\u0e35\u0e48\u0e25\u0e49\u0e2d\u0e14\u0e39\u0e40\u0e2b\u0e21\u0e37\u0e2d\u0e19\u0e2b\u0e21\u0e38\u0e19\u0e0a\u0e49\u0e32\u0e25\u0e07 \u0e2b\u0e22\u0e38\u0e14\u0e19\u0e34\u0e48\u0e07 \u0e2b\u0e23\u0e37\u0e2d\u0e2b\u0e21\u0e38\u0e19\u0e01\u0e25\u0e31\u0e1a\u0e17\u0e32\u0e07 \u0e40\u0e21\u0e37\u0e48\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48\u0e01\u0e32\u0e23\u0e2b\u0e21\u0e38\u0e19\u0e40\u0e02\u0e49\u0e32\u0e43\u0e01\u0e25\u0e49 frame rate \u0e02\u0e2d\u0e07\u0e20\u0e32\u0e1e',
      'ex.imaging.term': '\u0e20\u0e32\u0e1e\u0e16\u0e48\u0e32\u0e22',
      'ex.imaging.body': 'sensor \u0e02\u0e2d\u0e07\u0e01\u0e25\u0e49\u0e2d\u0e07\u0e17\u0e35\u0e48\u0e2a\u0e38\u0e48\u0e21\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e25\u0e27\u0e14\u0e25\u0e32\u0e22\u0e0b\u0e49\u0e33 \u0e46 \u0e17\u0e35\u0e48\u0e25\u0e30\u0e40\u0e2d\u0e35\u0e22\u0e14 \u0e40\u0e0a\u0e48\u0e19 \u0e40\u0e19\u0e37\u0e49\u0e2d\u0e1c\u0e49\u0e32\u0e17\u0e2d \u0e2d\u0e32\u0e08\u0e17\u0e33\u0e43\u0e2b\u0e49\u0e40\u0e01\u0e34\u0e14\u0e25\u0e32\u0e22\u0e41\u0e17\u0e23\u0e01\u0e2a\u0e2d\u0e14 moir\u00e9 \u0e0b\u0e36\u0e48\u0e07\u0e44\u0e21\u0e48\u0e21\u0e35\u0e2d\u0e22\u0e39\u0e48\u0e08\u0e23\u0e34\u0e07\u0e43\u0e19\u0e09\u0e32\u0e01\u0e15\u0e49\u0e19\u0e09\u0e1a\u0e31\u0e1a',
      'ref.hardware.title': '\u0e41\u0e25\u0e49\u0e27\u0e21\u0e31\u0e19\u0e2a\u0e48\u0e07\u0e1c\u0e25\u0e01\u0e31\u0e1a hardware \u0e2d\u0e22\u0e48\u0e32\u0e07\u0e44\u0e23',
      'ref.hardware.intro': 'Aliasing \u0e44\u0e21\u0e48\u0e43\u0e0a\u0e48\u0e04\u0e27\u0e32\u0e21\u0e04\u0e25\u0e32\u0e14\u0e40\u0e04\u0e25\u0e37\u0e48\u0e2d\u0e19\u0e17\u0e35\u0e48\u0e04\u0e48\u0e2d\u0e22\u0e44\u0e1b\u0e41\u0e01\u0e49\u0e17\u0e35\u0e2b\u0e25\u0e31\u0e07\u0e44\u0e14\u0e49 \u0e40\u0e21\u0e37\u0e48\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48\u0e2a\u0e2d\u0e07\u0e04\u0e48\u0e32\u0e15\u0e01\u0e25\u0e07\u0e1a\u0e19 sample \u0e0a\u0e38\u0e14\u0e40\u0e14\u0e35\u0e22\u0e27\u0e01\u0e31\u0e19\u0e41\u0e25\u0e49\u0e27 \u0e44\u0e21\u0e48\u0e21\u0e35\u0e2d\u0e30\u0e44\u0e23\u0e17\u0e35\u0e48\u0e1b\u0e25\u0e32\u0e22\u0e17\u0e32\u0e07\u0e41\u0e22\u0e01\u0e21\u0e31\u0e19\u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01\u0e01\u0e31\u0e19\u0e44\u0e14\u0e49\u0e2d\u0e35\u0e01 \u0e01\u0e32\u0e23\u0e41\u0e01\u0e49\u0e08\u0e36\u0e07\u0e15\u0e49\u0e2d\u0e07\u0e2d\u0e22\u0e39\u0e48\u0e2b\u0e19\u0e49\u0e32\u0e15\u0e31\u0e27\u0e41\u0e1b\u0e25\u0e07\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13 \u0e19\u0e31\u0e48\u0e19\u0e04\u0e37\u0e2d\u0e15\u0e49\u0e2d\u0e07\u0e41\u0e01\u0e49\u0e17\u0e35\u0e48 hardware \u0e41\u0e25\u0e30\u0e02\u0e49\u0e2d\u0e08\u0e33\u0e01\u0e31\u0e14\u0e02\u0e49\u0e2d\u0e40\u0e14\u0e35\u0e22\u0e27\u0e19\u0e35\u0e49\u0e40\u0e2d\u0e07\u0e17\u0e35\u0e48\u0e01\u0e33\u0e2b\u0e19\u0e14\u0e2b\u0e19\u0e49\u0e32\u0e15\u0e32\u0e02\u0e2d\u0e07 analog front end \u0e40\u0e01\u0e37\u0e2d\u0e1a\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14',
      'hw.filter.term': 'Anti-aliasing filter \u0e40\u0e1b\u0e47\u0e19 analog \u0e41\u0e25\u0e30\u0e15\u0e49\u0e2d\u0e07\u0e21\u0e32\u0e01\u0e48\u0e2d\u0e19\u0e40\u0e2a\u0e21\u0e2d',
      'hw.filter.body': '\u0e44\u0e21\u0e48\u0e27\u0e48\u0e32\u0e08\u0e30\u0e43\u0e0a\u0e49 DSP \u0e40\u0e01\u0e48\u0e07\u0e41\u0e04\u0e48\u0e44\u0e2b\u0e19 \u0e01\u0e47\u0e41\u0e22\u0e01\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48\u0e17\u0e35\u0e48\u0e1e\u0e31\u0e1a\u0e01\u0e25\u0e31\u0e1a\u0e21\u0e32\u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48\u0e08\u0e23\u0e34\u0e07\u0e44\u0e21\u0e48\u0e44\u0e14\u0e49 \u0e15\u0e31\u0e27\u0e01\u0e23\u0e2d\u0e07\u0e08\u0e36\u0e07\u0e15\u0e49\u0e2d\u0e07\u0e15\u0e31\u0e14\u0e21\u0e31\u0e19\u0e17\u0e34\u0e49\u0e07\u0e01\u0e48\u0e2d\u0e19\u0e17\u0e35\u0e48 sampler \u0e08\u0e30\u0e40\u0e2b\u0e47\u0e19 \u0e19\u0e31\u0e48\u0e19\u0e41\u0e1b\u0e25\u0e27\u0e48\u0e32\u0e15\u0e49\u0e2d\u0e07\u0e21\u0e35 low-pass filter \u0e08\u0e23\u0e34\u0e07 \u0e46 \u0e2d\u0e22\u0e39\u0e48\u0e1a\u0e19\u0e1a\u0e2d\u0e23\u0e4c\u0e14 \u0e17\u0e31\u0e49\u0e07 op-amp \u0e15\u0e31\u0e27\u0e15\u0e49\u0e32\u0e19\u0e17\u0e32\u0e19 \u0e41\u0e25\u0e30\u0e15\u0e31\u0e27\u0e40\u0e01\u0e47\u0e1a\u0e1b\u0e23\u0e30\u0e08\u0e38 \u0e0b\u0e36\u0e48\u0e07\u0e01\u0e34\u0e19\u0e1e\u0e37\u0e49\u0e19\u0e17\u0e35\u0e48 \u0e01\u0e34\u0e19\u0e44\u0e1f \u0e41\u0e25\u0e30\u0e17\u0e33\u0e43\u0e2b\u0e49\u0e40\u0e01\u0e34\u0e14 phase distortion \u0e43\u0e01\u0e25\u0e49\u0e02\u0e2d\u0e1a\u0e22\u0e48\u0e32\u0e19\u0e04\u0e27\u0e32\u0e21\u0e16\u0e35\u0e48 \u0e41\u0e25\u0e30\u0e19\u0e35\u0e48\u0e04\u0e37\u0e2d\u0e40\u0e2b\u0e15\u0e38\u0e1c\u0e25\u0e27\u0e48\u0e32\u0e17\u0e33\u0e44\u0e21 control loop \u0e17\u0e35\u0e48\u0e17\u0e33\u0e07\u0e32\u0e19\u0e41\u0e04\u0e48 100 Hz \u0e01\u0e47\u0e22\u0e31\u0e07\u0e15\u0e49\u0e2d\u0e07\u0e21\u0e35 \u0e40\u0e1e\u0e23\u0e32\u0e30 input bandwidth \u0e02\u0e2d\u0e07 ADC \u0e21\u0e31\u0e01\u0e01\u0e27\u0e49\u0e32\u0e07\u0e01\u0e27\u0e48\u0e32 sample rate \u0e02\u0e2d\u0e07\u0e21\u0e31\u0e19\u0e21\u0e32\u0e01 \u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13\u0e23\u0e1a\u0e01\u0e27\u0e19\u0e08\u0e32\u0e01 PWM \u0e02\u0e2d\u0e07\u0e21\u0e2d\u0e40\u0e15\u0e2d\u0e23\u0e4c\u0e17\u0e35\u0e48 20 kHz \u0e08\u0e36\u0e07\u0e40\u0e14\u0e34\u0e19\u0e17\u0e32\u0e07\u0e16\u0e36\u0e07 sampler \u0e44\u0e14\u0e49 \u0e41\u0e25\u0e30\u0e1e\u0e31\u0e1a\u0e25\u0e07\u0e21\u0e32\u0e15\u0e23\u0e07\u0e22\u0e48\u0e32\u0e19\u0e17\u0e35\u0e48\u0e40\u0e23\u0e32\u0e01\u0e33\u0e25\u0e31\u0e07\u0e1e\u0e22\u0e32\u0e22\u0e32\u0e21\u0e04\u0e27\u0e1a\u0e04\u0e38\u0e21\u0e1e\u0e2d\u0e14\u0e35',
      'hw.rate.term': '\u0e04\u0e19\u0e40\u0e25\u0e37\u0e2d\u0e01 sample rate \u0e04\u0e37\u0e2d\u0e15\u0e31\u0e27\u0e01\u0e23\u0e2d\u0e07 \u0e44\u0e21\u0e48\u0e43\u0e0a\u0e48 Nyquist',
      'hw.rate.body': '\u0e15\u0e32\u0e21\u0e17\u0e24\u0e29\u0e0e\u0e35 Nyquist \u0e40\u0e2a\u0e35\u0e22\u0e07 20 kHz \u0e43\u0e0a\u0e49 40 kHz \u0e01\u0e47\u0e1e\u0e2d \u0e41\u0e15\u0e48 CD \u0e43\u0e0a\u0e49 44.1 kHz \u0e2a\u0e48\u0e27\u0e19\u0e17\u0e35\u0e48\u0e40\u0e01\u0e34\u0e19\u0e21\u0e32 4.1 kHz \u0e19\u0e31\u0e49\u0e19\u0e41\u0e25\u0e01\u0e21\u0e32\u0e40\u0e1b\u0e47\u0e19 transition band \u0e01\u0e27\u0e49\u0e32\u0e07 2.05 kHz \u0e40\u0e1e\u0e23\u0e32\u0e30\u0e15\u0e31\u0e27\u0e01\u0e23\u0e2d\u0e07\u0e08\u0e23\u0e34\u0e07\u0e44\u0e21\u0e48\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e15\u0e01\u0e08\u0e32\u0e01 passband \u0e25\u0e07 stopband \u0e44\u0e14\u0e49\u0e17\u0e31\u0e19\u0e17\u0e35 \u0e16\u0e49\u0e32\u0e40\u0e1e\u0e34\u0e48\u0e21 sample rate \u0e15\u0e31\u0e27\u0e01\u0e23\u0e2d\u0e07 analog \u0e01\u0e47\u0e25\u0e32\u0e14\u0e02\u0e36\u0e49\u0e19\u0e41\u0e25\u0e30\u0e16\u0e39\u0e01\u0e25\u0e07 \u0e16\u0e49\u0e32\u0e25\u0e14 sample rate \u0e15\u0e31\u0e27\u0e01\u0e23\u0e2d\u0e07\u0e01\u0e47\u0e15\u0e49\u0e2d\u0e07\u0e0a\u0e31\u0e19\u0e02\u0e36\u0e49\u0e19 \u0e41\u0e1e\u0e07\u0e02\u0e36\u0e49\u0e19 \u0e41\u0e25\u0e30\u0e40\u0e1e\u0e35\u0e49\u0e22\u0e19\u0e40\u0e1f\u0e2a\u0e21\u0e32\u0e01\u0e02\u0e36\u0e49\u0e19 \u0e2b\u0e23\u0e37\u0e2d\u0e44\u0e21\u0e48\u0e01\u0e47\u0e40\u0e01\u0e34\u0e14 aliasing \u0e15\u0e31\u0e27\u0e40\u0e25\u0e02\u0e43\u0e19 datasheet \u0e02\u0e2d\u0e07\u0e15\u0e31\u0e27\u0e41\u0e1b\u0e25\u0e07\u0e17\u0e38\u0e01\u0e15\u0e31\u0e27\u0e04\u0e37\u0e2d\u0e08\u0e38\u0e14\u0e2b\u0e19\u0e36\u0e48\u0e07\u0e17\u0e35\u0e48\u0e16\u0e39\u0e01\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e44\u0e27\u0e49\u0e1a\u0e19\u0e40\u0e2a\u0e49\u0e19\u0e41\u0e25\u0e01\u0e40\u0e1b\u0e25\u0e35\u0e48\u0e22\u0e19\u0e19\u0e35\u0e49',
      'hw.oversampling.term': 'Oversampling \u0e22\u0e49\u0e32\u0e22\u0e07\u0e32\u0e19\u0e22\u0e32\u0e01\u0e44\u0e1b\u0e44\u0e27\u0e49\u0e1d\u0e31\u0e48\u0e07 digital',
      'hw.oversampling.body': '\u0e15\u0e31\u0e27\u0e41\u0e1b\u0e25\u0e07\u0e41\u0e1a\u0e1a sigma-delta \u0e2a\u0e38\u0e48\u0e21\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e17\u0e35\u0e48\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e40\u0e21\u0e01\u0e30\u0e40\u0e2e\u0e34\u0e23\u0e15\u0e0b\u0e4c \u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e43\u0e2b\u0e49 anti-aliasing filter \u0e1d\u0e31\u0e48\u0e07 analog \u0e40\u0e2b\u0e25\u0e37\u0e2d\u0e41\u0e04\u0e48\u0e15\u0e31\u0e27\u0e15\u0e49\u0e32\u0e19\u0e17\u0e32\u0e19\u0e01\u0e31\u0e1a\u0e15\u0e31\u0e27\u0e40\u0e01\u0e47\u0e1a\u0e1b\u0e23\u0e30\u0e08\u0e38\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e25\u0e30\u0e15\u0e31\u0e27 \u0e41\u0e25\u0e49\u0e27\u0e04\u0e48\u0e2d\u0e22\u0e44\u0e1b\u0e01\u0e23\u0e2d\u0e07\u0e0a\u0e31\u0e19 \u0e46 \u0e43\u0e19\u0e1d\u0e31\u0e48\u0e07 digital \u0e01\u0e48\u0e2d\u0e19 decimate \u0e25\u0e07\u0e21\u0e32\u0e17\u0e35\u0e48\u0e2d\u0e31\u0e15\u0e23\u0e32\u0e02\u0e32\u0e2d\u0e2d\u0e01 \u0e0b\u0e36\u0e48\u0e07\u0e15\u0e23\u0e07\u0e19\u0e31\u0e49\u0e19\u0e17\u0e33\u0e44\u0e14\u0e49\u0e41\u0e21\u0e48\u0e19\u0e22\u0e33 \u0e17\u0e33\u0e0b\u0e49\u0e33\u0e44\u0e14\u0e49\u0e40\u0e2b\u0e21\u0e37\u0e2d\u0e19\u0e40\u0e14\u0e34\u0e21\u0e17\u0e38\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07 \u0e41\u0e25\u0e30\u0e08\u0e48\u0e32\u0e22\u0e41\u0e04\u0e48\u0e08\u0e33\u0e19\u0e27\u0e19\u0e40\u0e01\u0e15 \u0e01\u0e32\u0e23\u0e41\u0e25\u0e01\u0e04\u0e27\u0e32\u0e21\u0e41\u0e21\u0e48\u0e19\u0e22\u0e33\u0e1d\u0e31\u0e48\u0e07 analog \u0e21\u0e32\u0e40\u0e1b\u0e47\u0e19\u0e01\u0e32\u0e23\u0e01\u0e23\u0e2d\u0e07\u0e1d\u0e31\u0e48\u0e07 digital \u0e04\u0e37\u0e2d\u0e17\u0e32\u0e07\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e21\u0e32\u0e15\u0e23\u0e10\u0e32\u0e19\u0e02\u0e2d\u0e07 front end \u0e14\u0e49\u0e32\u0e19\u0e40\u0e2a\u0e35\u0e22\u0e07\u0e41\u0e25\u0e30\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e21\u0e37\u0e2d\u0e27\u0e31\u0e14\u0e43\u0e19\u0e1b\u0e31\u0e08\u0e08\u0e38\u0e1a\u0e31\u0e19',
      'hw.undersampling.term': '\u0e1a\u0e32\u0e07\u0e04\u0e23\u0e31\u0e49\u0e07 \u0e01\u0e32\u0e23\u0e1e\u0e31\u0e1a\u0e01\u0e25\u0e31\u0e1a\u0e04\u0e37\u0e2d\u0e2a\u0e34\u0e48\u0e07\u0e17\u0e35\u0e48\u0e40\u0e23\u0e32\u0e15\u0e49\u0e2d\u0e07\u0e01\u0e32\u0e23',
      'hw.undersampling.body': 'Bandpass sampling \u0e04\u0e37\u0e2d\u0e01\u0e32\u0e23\u0e08\u0e07\u0e43\u0e08\u0e43\u0e2b\u0e49\u0e40\u0e01\u0e34\u0e14 aliasing \u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13 IF \u0e17\u0e35\u0e48 70 MHz \u0e40\u0e21\u0e37\u0e48\u0e2d\u0e2a\u0e38\u0e48\u0e21\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e17\u0e35\u0e48 25 MSPS \u0e08\u0e30\u0e44\u0e1b\u0e42\u0e1c\u0e25\u0e48\u0e17\u0e35\u0e48 5 MHz \u0e0b\u0e36\u0e48\u0e07\u0e25\u0e07\u0e21\u0e32\u0e2d\u0e22\u0e39\u0e48\u0e17\u0e35\u0e48 baseband \u0e40\u0e23\u0e35\u0e22\u0e1a\u0e23\u0e49\u0e2d\u0e22\u0e41\u0e25\u0e49\u0e27 \u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e23\u0e31\u0e1a\u0e41\u0e1a\u0e1a direct-RF \u0e41\u0e25\u0e30 software-defined radio \u0e43\u0e0a\u0e49\u0e27\u0e34\u0e18\u0e35\u0e19\u0e35\u0e49\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e15\u0e31\u0e14 mixer \u0e2d\u0e2d\u0e01\u0e44\u0e1b\u0e17\u0e31\u0e49\u0e07\u0e20\u0e32\u0e04 \u0e42\u0e14\u0e22\u0e40\u0e1b\u0e25\u0e35\u0e48\u0e22\u0e19 anti-aliasing filter \u0e43\u0e2b\u0e49\u0e40\u0e1b\u0e47\u0e19 band-pass \u0e17\u0e35\u0e48\u0e22\u0e2d\u0e21\u0e43\u0e2b\u0e49\u0e1c\u0e48\u0e32\u0e19\u0e40\u0e1e\u0e35\u0e22\u0e07\u0e22\u0e48\u0e32\u0e19\u0e40\u0e14\u0e35\u0e22\u0e27 \u0e08\u0e30\u0e44\u0e14\u0e49\u0e21\u0e35\u0e41\u0e15\u0e48\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13\u0e17\u0e35\u0e48\u0e15\u0e49\u0e2d\u0e07\u0e01\u0e32\u0e23\u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19\u0e17\u0e35\u0e48\u0e1e\u0e31\u0e1a\u0e25\u0e07\u0e21\u0e32 \u0e41\u0e25\u0e30\u0e2a\u0e40\u0e1b\u0e01\u0e17\u0e35\u0e48\u0e2a\u0e33\u0e04\u0e31\u0e0d\u0e01\u0e47\u0e01\u0e25\u0e32\u0e22\u0e40\u0e1b\u0e47\u0e19 input bandwidth \u0e02\u0e2d\u0e07 ADC \u0e41\u0e17\u0e19\u0e17\u0e35\u0e48\u0e08\u0e30\u0e40\u0e1b\u0e47\u0e19 sample rate',
      'footer.text': '\u0e2b\u0e19\u0e49\u0e32\u0e40\u0e27\u0e47\u0e1a\u0e41\u0e1a\u0e1a static \u2014 \u0e01\u0e32\u0e23\u0e04\u0e33\u0e19\u0e27\u0e13\u0e01\u0e32\u0e23\u0e2a\u0e38\u0e48\u0e21\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e41\u0e25\u0e30 aliasing \u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14\u0e17\u0e33\u0e07\u0e32\u0e19\u0e43\u0e19 browser'
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
