/**
 * Debug Console — single-file web app served by the backend at GET /.
 *
 * Vanilla HTML/CSS/JS, zero dependencies. Features:
 *  - 🎙 record mic audio, keep it in memory, replay + download (save)
 *  - STT via /stt/turn (language modes: auto / en / ta → both directions)
 *  - Translation (debug placeholder → /translate, ta↔en)
 *  - TTS via /tts/npc & /tts/reference (auto script detection)
 *  - Verbose running log at the bottom (every request/response)
 *
 * Written without template literals in the page script so the whole HTML
 * can live inside one TS template string safely.
 */

export const DEBUG_PAGE_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tamil RPG — Speech Debug Console</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 16px; background: #0f0f17; color: #e8e8f0;
    font-family: ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace;
  }
  h1 { font-size: 18px; margin: 0 0 12px; color: #a99cff; letter-spacing: 1px; }
  h3 { font-size: 13px; margin: 0 0 8px; color: #8f8fb0; text-transform: uppercase; letter-spacing: 1px; }
  .card {
    background: #171722; border: 1px solid #2a2a3d; border-radius: 10px;
    padding: 14px; margin-bottom: 12px;
  }
  .row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 10px; }
  button {
    background: #2b2b40; color: #e8e8f0; border: 1px solid #3d3d5c;
    border-radius: 8px; padding: 10px 16px; font-size: 14px; cursor: pointer;
    font-family: inherit;
  }
  button:hover:not(:disabled) { background: #3a3a58; }
  button:disabled { opacity: .4; cursor: not-allowed; }
  button.recording { background: #7c2230; border-color: #a03348; animation: pulse 1.2s infinite; }
  button.primary { background: #4a3d9e; border-color: #6a58d8; }
  @keyframes pulse { 50% { opacity: .75; } }
  select, textarea, input[type=text] {
    background: #10101a; color: #e8e8f0; border: 1px solid #2a2a3d;
    border-radius: 6px; padding: 6px 8px; font-family: inherit; font-size: 13px;
  }
  textarea { width: 100%; min-height: 60px; resize: vertical; }
  .tamil { font-family: 'Noto Sans Tamil', 'Latha', sans-serif; font-size: 18px; line-height: 1.5; }
  .muted { color: #8888a8; font-size: 12px; }
  .chip {
    display: inline-block; margin: 2px; padding: 3px 8px; border-radius: 6px;
    font-size: 12px; border: 1px solid;
  }
  .chip.green { color: #6ee7a0; border-color: #2f7a52; background: #12251b; }
  .chip.yellow { color: #f5d76e; border-color: #8a7a2f; background: #262211; }
  .chip.red { color: #ff7a7a; border-color: #8a2f2f; background: #271414; }
  .chip.english { color: #7ab8ff; border-color: #2f5a8a; background: #121b27; }
  .scorebar { display: flex; align-items: center; gap: 8px; margin: 3px 0; font-size: 12px; }
  .scorebar .label { width: 150px; color: #8f8fb0; }
  .scorebar .bar { flex: 1; height: 8px; background: #10101a; border-radius: 4px; overflow: hidden; }
  .scorebar .fill { height: 100%; background: #6a58d8; }
  .scorebar .val { width: 50px; text-align: right; }
  #log {
    background: #0a0a12; border: 1px solid #2a2a3d; border-radius: 10px;
    padding: 10px; height: 260px; overflow-y: auto; font-size: 12px; line-height: 1.6;
  }
  #log .t { color: #55557a; }
  #log .info { color: #9cdcfe; }
  #log .ok { color: #6ee7a0; }
  #log .err { color: #ff7a7a; }
  #log .warn { color: #f5d76e; }
  audio { width: 100%; margin-top: 8px; }
  details { margin-top: 8px; }
  pre { white-space: pre-wrap; word-break: break-all; font-size: 11px; color: #9a9ac0; }
</style>
</head>
<body>
<h1>🎙 TAMIL RPG — SPEECH DEBUG CONSOLE</h1>

<div class="card">
  <div class="row">
    <span class="muted">difficulty</span>
    <select id="difficulty">
      <option value="easy">easy</option>
      <option value="medium">medium</option>
      <option value="hard">hard</option>
    </select>
    <span class="muted">stt language</span>
    <select id="sttLang">
      <option value="auto">auto (ta + en)</option>
      <option value="en">english</option>
      <option value="ta">tamil</option>
    </select>
    <label><input type="checkbox" id="verbose" checked> verbose log</label>
  </div>
  <div class="row">
    <button id="recordBtn" class="primary">🎙 Start Recording</button>
    <button id="playBtn" disabled>🔊 Play Recording</button>
    <button id="saveBtn" disabled>💾 Save Recording</button>
    <span id="recStatus" class="muted"></span>
  </div>
</div>

<div class="card" id="sttCard" hidden>
  <h3>Transcription Result</h3>
  <div id="detected" class="muted"></div>
  <div id="transcript" class="tamil" style="margin:8px 0"></div>
  <div id="translit" class="muted"></div>
  <div id="scores" style="margin-top:10px"></div>
  <div id="words" style="margin-top:10px"></div>
  <div id="mistakes" class="muted" style="margin-top:6px"></div>
  <div style="margin-top:10px" id="translationRow">
    <div id="translation" class="tamil"></div>
    <button id="speakTranslationBtn" hidden style="margin-top:6px">🔊 Speak Translation</button>
  </div>
  <details><summary class="muted">raw JSON response</summary><pre id="raw"></pre></details>
</div>

<div class="card">
  <h3>Text → Speech</h3>
  <textarea id="ttsText" placeholder="Type English or Tamil (தமிழ்) text…"></textarea>
  <div class="row" style="margin-top:8px">
    <span class="muted">voice</span>
    <select id="ttsVoice">
      <option value="narrator">narrator</option>
      <option value="customs_officer">customs officer</option>
      <option value="taxi_driver">taxi driver</option>
      <option value="elder_host">elder host</option>
      <option value="cousin">cousin</option>
      <option value="waiter">waiter</option>
      <option value="shopkeeper">shopkeeper</option>
    </select>
    <span class="muted">mood</span>
    <input type="text" id="ttsMood" placeholder="(optional)" size="10">
    <button id="speakBtn" class="primary">🔊 Speak</button>
  </div>
  <audio id="ttsAudio" controls></audio>
</div>

<div class="card">
  <h3>Running Log</h3>
  <div id="log"></div>
</div>

<script>
(function () {
  var API = "";
  if (location.protocol === "file:") API = "http://localhost:8787";

  var $ = function (id) { return document.getElementById(id); };
  var verbose = $("verbose");

  function ts() {
    var d = new Date();
    return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) +
      ":" + ("0" + d.getSeconds()).slice(-2);
  }
  function log(msg, cls) {
    var el = document.createElement("div");
    var t = document.createElement("span");
    t.className = "t"; t.textContent = "[" + ts() + "] ";
    el.appendChild(t);
    var s = document.createElement("span");
    if (cls) s.className = cls;
    s.textContent = msg;
    el.appendChild(s);
    var box = $("log");
    box.appendChild(el);
    box.scrollTop = box.scrollHeight;
  }
  function vlog(msg, obj, cls) {
    if (!verbose.checked) return;
    var extra = (obj !== undefined) ? " " + JSON.stringify(obj) : "";
    log(msg + extra, cls || "info");
  }

  // ---- mic recording -------------------------------------------------
  var mediaStream = null, recorder = null, chunks = [], recordedBlob = null;

  $("recordBtn").onclick = function () {
    if (recorder && recorder.state === "recording") { recorder.stop(); return; }
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      log("MediaRecorder not available in this browser", "err"); return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      mediaStream = stream;
      var mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus" : "";
      recorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      chunks = [];
      recorder.ondataavailable = function (e) { if (e.data.size > 0) chunks.push(e.data); };
      recorder.onstop = function () {
        recordedBlob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
        stream.getTracks().forEach(function (t) { t.stop(); });
        $("recordBtn").textContent = "🎙 Start Recording";
        $("recordBtn").classList.remove("recording");
        $("recStatus").textContent = "saved " + (recordedBlob.size / 1024).toFixed(1) + " KB";
        $("playBtn").disabled = false;
        $("saveBtn").disabled = false;
        log("🎤 recording saved: " + recordedBlob.type + ", " + (recordedBlob.size / 1024).toFixed(1) + " KB", "ok");
        transcribe(recordedBlob);
      };
      recorder.start();
      $("recordBtn").textContent = "⏹ Stop Recording";
      $("recordBtn").classList.add("recording");
      $("recStatus").textContent = "recording… (click again to stop)";
      log("🎤 recording started — speak now, click Stop when done", "ok");
    }).catch(function (err) {
      log("mic error: " + err.name + " — " + err.message, "err");
    });
  };

  $("playBtn").onclick = function () {
    if (!recordedBlob) return;
    var a = new Audio(URL.createObjectURL(recordedBlob));
    vlog("▶ playing recording", { bytes: recordedBlob.size });
    a.play();
  };

  $("saveBtn").onclick = function () {
    if (!recordedBlob) return;
    var ext = (recordedBlob.type.indexOf("mp4") >= 0) ? "m4a" : "webm";
    var a = document.createElement("a");
    a.href = URL.createObjectURL(recordedBlob);
    a.download = "recording-" + Date.now() + "." + ext;
    a.click();
    log("💾 recording saved to downloads", "ok");
  };

  // ---- STT ------------------------------------------------------------
  function transcribe(blob) {
    var lang = $("sttLang").value;
    var difficulty = $("difficulty").value;
    var form = new FormData();
    var ext = (blob.type.indexOf("mp4") >= 0) ? "m4a" : "webm";
    form.append("file", blob, "turn." + ext);
    form.append("difficulty", difficulty);
    form.append("language", lang);
    log("⏳ transcribing (" + lang + ", " + difficulty + ")…");
    fetch(API + "/stt/turn", { method: "POST", body: form })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, json: j }; }); })
      .then(function (res) {
        if (!res.ok) { log("STT error: " + (res.json.error || "unknown"), "err"); return; }
        renderStt(res.json);
      })
      .catch(function (err) { log("STT fetch failed: " + err.message, "err"); });
  }

  function renderStt(d) {
    $("sttCard").hidden = false;
    var langName = d.language && d.language.code === "tam" ? "Tamil"
      : d.language && d.language.code === "eng" ? "English" : (d.language ? d.language.code : "?");
    $("detected").textContent = "detected: " + langName +
      (d.language && d.language.probability ? " (" + Math.round(d.language.probability * 100) + "% confidence)" : "");
    $("transcript").textContent = d.transcript_tamil_script || "(empty)";
    $("translit").textContent = d.transcript_transliterated || "";
    vlog("STT ok", { language: d.language, scores: d.scores });

    var scores = d.scores || {};
    var rows = [
      ["Tanglish ratio", scores.tanglish_ratio],
      ["Pronunciation", scores.pronunciation],
      ["Politeness (LLM pending)", scores.politeness_register],
      ["Fluency", scores.fluency_pacing],
      ["TOTAL (partial, /75)", scores.total]
    ];
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      var v = rows[i][1];
      var pct = (v === null || v === undefined) ? 0 : Math.min(100, Math.round(v / 25 * 100));
      html += '<div class="scorebar"><span class="label">' + rows[i][0] + '</span>' +
        '<span class="bar"><span class="fill" style="width:' + pct + '%"></span></span>' +
        '<span class="val">' + (v === null || v === undefined ? "—" : v) + '</span></div>';
    }
    $("scores").innerHTML = html;

    var words = d.word_analysis || [];
    var whtml = "";
    for (var w = 0; w < words.length; w++) {
      var word = words[w];
      var tip = word.lang + (word.logprob !== undefined ? " logprob " + word.logprob.toFixed(3) : "");
      whtml += '<span class="chip ' + word.status + '" title="' + tip + '">' +
        word.word + (word.score !== null && word.score !== undefined ? " " + word.score : "") + '</span>';
    }
    $("words").innerHTML = whtml;

    var mistakes = d.mistakes || [];
    $("mistakes").textContent = mistakes.length
      ? "mistake deck (" + mistakes.length + "): " + mistakes.map(function (m) {
          return m.word + " [" + m.type + "]";
        }).join(", ")
      : "no mistakes flagged this turn";

    $("raw").textContent = JSON.stringify(d, null, 2);
    translate(d);
  }

  // ---- translation (debug placeholder → /translate) --------------------
  function translate(d) {
    var text = d.transcript_tamil_script || "";
    if (!text.trim()) { $("translation").textContent = ""; return; }
    var from = d.language && d.language.code === "tam" ? "ta"
      : d.language && d.language.code === "eng" ? "en" : "auto";
    log("⏳ translating (" + (from === "auto" ? "auto" : from + " → " + (from === "ta" ? "en" : "ta")) + ")…");
    fetch(API + "/translate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: text, from: from })
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, json: j }; }); })
      .then(function (res) {
        if (!res.ok) { log("translate error: " + (res.json.error || "unknown"), "err"); return; }
        var t = res.json;
        $("translation").textContent = "🌐 " + t.text + "  (" + t.from + "→" + t.to + ", via " + t.provider + ")";
        $("speakTranslationBtn").hidden = false;
        $("speakTranslationBtn").onclick = function () { speak(t.text, t.to === "en" ? "en" : "ta", "narrator", ""); };
        log("🌐 translation: " + t.text, "ok");
      })
      .catch(function (err) { log("translate fetch failed: " + err.message, "err"); });
  }

  // ---- TTS --------------------------------------------------------------
  function speak(text, language, npc, mood) {
    if (!text.trim()) { log("nothing to speak", "warn"); return; }
    var body = { text: text, npc: npc || "narrator" };
    if (language && language !== "auto") body.language = language;
    if (mood) body.mood = mood;
    log("⏳ synthesizing (" + (npc || "narrator") + (mood ? ", mood " + mood : "") + ")…");
    fetch(API + "/tts/npc", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    }).then(function (r) {
      if (!r.ok) {
        return r.json().then(function (j) { throw new Error(j.error || "tts " + r.status); });
      }
      vlog("TTS ok", { cache: r.headers.get("x-cache") });
      return r.blob();
    }).then(function (b) {
      $("ttsAudio").src = URL.createObjectURL(b);
      $("ttsAudio").play();
      log("🔊 audio ready: " + (b.size / 1024).toFixed(1) + " KB", "ok");
    }).catch(function (err) { log("TTS error: " + err.message, "err"); });
  }

  $("speakBtn").onclick = function () {
    speak($("ttsText").value, $("ttsLangAuto").value || "auto", $("ttsVoice").value, $("ttsMood").value.trim());
  };

  log("console ready — " + (API ? "API: " + API : "same-origin") + ". Record, or type text and Speak.", "ok");
})();
</script>
</body>
</html>`;
