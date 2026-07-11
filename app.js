(() => {
  "use strict";

  const isEnglish = document.documentElement.lang === "en";
  const copy = isEnglish ? {
    colors: { red: "Red", orange: "Orange", yellow: "Yellow", green: "Green", blue: "Blue", purple: "Purple" },
    themes: { blue: "Blue", light: "Light", dark: "Dark", sunset: "Sunset", neon: "Neon", sunrise: "Sunrise" },
    emptyDie: (index) => `Die ${index}: color not rolled yet`,
    resultDie: (index, name) => `Die ${index}: ${name.toLowerCase()}`,
    hiddenDie: (index) => `Die ${index}: result hidden`,
    rollMessages: ["GOOD LUCK!", "ROLLING...", "WHAT WILL YOU GET?", "HERE WE GO!", "PICK A COLOR!"],
    scratchWord: "SCRATCH",
    scratchComplete: "All colors revealed",
    scratchProgress: (revealed, total) => `Revealed ${revealed} of ${total}`,
    scratchPrompt: (index) => `Scratch card ${index}. Scratch to reveal the color.`,
    scratchResult: (index, name) => `Scratch card ${index}: ${name.toLowerCase()}`,
    sound: "Sound",
    muted: "Muted",
    enterCode: "Enter a player code",
    playerNotFound: "Player not found",
    noRolls: "no rolls yet",
    playerStatus: (result) => `You are online. Last result: ${result}`,
    resetResult: "PRESS THE BUTTON TO ROLL"
  } : {
    colors: { red: "Красный", orange: "Оранжевый", yellow: "Жёлтый", green: "Зелёный", blue: "Синий", purple: "Фиолетовый" },
    themes: { blue: "Синий", light: "Светлый", dark: "Тёмный", sunset: "Закат", neon: "Неон", sunrise: "Рассвет" },
    emptyDie: (index) => `Кубик ${index}: цвет ещё не выбран`,
    resultDie: (index, name) => `Кубик ${index}: ${name.toLowerCase()}`,
    hiddenDie: (index) => `Кубик ${index}: результат скрыт`,
    rollMessages: ["УДАЧИ!", "БРОСАЕМ...", "ЧТО ВЫПАДЕТ?", "ПОЕХАЛИ!", "ЛОВИ ЦВЕТ!"],
    scratchWord: "СКРЕТЧ",
    scratchComplete: "Все цвета открыты",
    scratchProgress: (revealed, total) => `Открыто ${revealed} из ${total}`,
    scratchPrompt: (index) => `Скретч-карта ${index}. Сотрите покрытие, чтобы открыть цвет.`,
    scratchResult: (index, name) => `Скретч-карта ${index}: ${name.toLowerCase()}`,
    sound: "Звук",
    muted: "Без звука",
    enterCode: "Введите код игрока",
    playerNotFound: "Игрок не найден",
    noRolls: "бросков пока нет",
    playerStatus: (result) => `Вы онлайн. Последний результат: ${result}`,
    resetResult: "НАЖМИТЕ КНОПКУ, ЧТОБЫ БРОСИТЬ"
  };

  const colorOptions = [
    { id: "red", name: copy.colors.red, hex: "#ff1744", shadow: "rgba(255, 23, 68, 0.72)" },
    { id: "orange", name: copy.colors.orange, hex: "#ff6d00", shadow: "rgba(255, 109, 0, 0.72)" },
    { id: "yellow", name: copy.colors.yellow, hex: "#ffea00", shadow: "rgba(255, 234, 0, 0.68)" },
    { id: "green", name: copy.colors.green, hex: "#00e676", shadow: "rgba(0, 230, 118, 0.72)" },
    { id: "blue", name: copy.colors.blue, hex: "#2979ff", shadow: "rgba(41, 121, 255, 0.75)" },
    { id: "purple", name: copy.colors.purple, hex: "#d500f9", shadow: "rgba(213, 0, 249, 0.72)" }
  ];

  const themeLabels = copy.themes;

  const themeColors = {
    blue: "#1aa8e0",
    light: "#eaf6ff",
    dark: "#111827",
    sunset: "#ff7b54",
    neon: "#10001f",
    sunrise: "#e8845a"
  };

  const themeClasses = Object.keys(themeLabels).map((theme) => `theme-${theme}`);
  const wait = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

  const elements = {
    stage: document.querySelector(".game-stage"),
    startScreen: document.querySelector("#start-screen"),
    startButton: document.querySelector("#start-button"),
    diceCount: document.querySelector("#dice-count"),
    diceArea: document.querySelector("#dice-area"),
    lastResult: document.querySelector("#last-result"),
    rollButton: document.querySelector("#roll-button"),
    megaButton: document.querySelector("#mega-button"),
    scratchButton: document.querySelector("#scratch-button"),
    rollOverlay: document.querySelector("#roll-overlay"),
    rollMessage: document.querySelector("#roll-message"),
    ghostDice: document.querySelector("#ghost-dice"),
    megaOverlay: document.querySelector("#mega-overlay"),
    megaDiceRow: document.querySelector("#mega-dice-row"),
    megaProgress: document.querySelector("#mega-progress"),
    megaClose: document.querySelector("#mega-close"),
    scratchOverlay: document.querySelector("#scratch-overlay"),
    scratchRow: document.querySelector("#scratch-row"),
    scratchProgressFill: document.querySelector("#scratch-progress-fill"),
    scratchProgressLabel: document.querySelector("#scratch-progress-label"),
    scratchClose: document.querySelector("#scratch-close"),
    soundToggle: document.querySelector("#sound-toggle"),
    soundLabel: document.querySelector("#sound-label"),
    themeToggle: document.querySelector("#theme-toggle"),
    themeLabel: document.querySelector("#theme-label"),
    themeMenu: document.querySelector("#theme-menu"),
    themeWrap: document.querySelector("#theme-wrap"),
    playerToggle: document.querySelector("#player-toggle"),
    playerMenu: document.querySelector("#player-menu"),
    playerWrap: document.querySelector("#player-wrap"),
    languageToggle: document.querySelector("#language-toggle"),
    languageMenu: document.querySelector("#language-menu"),
    languageWrap: document.querySelector("#language-wrap"),
    playerCode: document.querySelector("#player-code"),
    playerCodeInput: document.querySelector("#player-code-input"),
    playerCheck: document.querySelector("#player-check"),
    playerResult: document.querySelector("#player-result"),
    rollCount: document.querySelector("#roll-count"),
    backgroundCanvas: document.querySelector("#background-canvas")
  };

  let storedResults = [];
  try {
    storedResults = JSON.parse(localStorage.getItem("kolor_dais_last_result") || "[]")
      .map((savedResult) => colorOptions.find((color) => color.id === savedResult.id))
      .filter(Boolean);
  } catch {
    storedResults = [];
  }

  const state = {
    mode: "start",
    started: false,
    busy: false,
    diceCount: 3,
    currentResults: storedResults,
    rollCount: Number.parseInt(localStorage.getItem("kolor_dais_roll_count") || "0", 10) || 0,
    muted: localStorage.getItem("kolor_dais_sound") === "off",
    theme: localStorage.getItem("kolor_dais_theme") || "blue",
    playerCode: localStorage.getItem("kolor_dais_player_code") || createPlayerCode(),
    scratchRevealed: 0,
    scratchTotal: 0,
    scratchResults: []
  };

  let audioContext;

  function createPlayerCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const values = new Uint8Array(6);
    crypto.getRandomValues(values);
    const code = Array.from(values, (value) => alphabet[value % alphabet.length]).join("");
    localStorage.setItem("kolor_dais_player_code", code);
    return code;
  }

  function randomColors(count) {
    const result = [];
    while (result.length < count) {
      const values = new Uint8Array((count - result.length) * 2);
      crypto.getRandomValues(values);
      values.forEach((value) => {
        if (value < 252 && result.length < count) {
          result.push(colorOptions[value % colorOptions.length]);
        }
      });
    }
    return result;
  }

  function renderDice(animate = false) {
    elements.diceArea.innerHTML = "";
    elements.diceArea.classList.toggle("compact", state.diceCount >= 5);

    for (let index = 0; index < state.diceCount; index += 1) {
      const die = document.createElement("div");
      die.className = "die";
      die.dataset.color = "none";
      die.setAttribute("role", "img");
      die.setAttribute("aria-label", copy.emptyDie(index + 1));
      die.innerHTML = '<span class="die-pip" aria-hidden="true"></span>';
      if (animate) {
        die.classList.add("pop");
      }
      elements.diceArea.appendChild(die);
    }
  }

  function setButtonsDisabled(disabled) {
    elements.rollButton.disabled = disabled;
    elements.megaButton.disabled = disabled;
    elements.scratchButton.disabled = disabled;
  }

  function openOverlay(element) {
    element.classList.add("is-open");
    element.setAttribute("aria-hidden", "false");
  }

  function closeOverlay(element) {
    element.classList.remove("is-open");
    element.setAttribute("aria-hidden", "true");
  }

  function playTone(frequency = 320, duration = 0.08, delay = 0, wave = "sine") {
    if (state.muted) return;
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = audioContext.currentTime + delay;
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.linearRampToValueAtTime(0.16, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.04);
  }

  function playResultSound(results) {
    results.forEach((result, index) => {
      const colorIndex = colorOptions.findIndex((color) => color.id === result.id);
      playTone(240 + colorIndex * 55, 0.12, index * 0.045, index % 2 ? "sine" : "triangle");
    });
  }

  function applyResults(results, countRoll = true) {
    if (elements.diceArea.children.length !== results.length) {
      state.diceCount = results.length;
      elements.diceCount.value = String(results.length);
      renderDice();
    }

    Array.from(elements.diceArea.children).forEach((die, index) => {
      const result = results[index];
      die.dataset.color = result.id;
      die.setAttribute("aria-label", copy.resultDie(index + 1, result.name));
      die.classList.remove("pop");
      void die.offsetWidth;
      die.classList.add("pop");
    });

    state.currentResults = results;
    elements.lastResult.textContent = results.map((result) => result.name.toUpperCase()).join(" • ");
    localStorage.setItem("kolor_dais_last_result", JSON.stringify(results));

    if (countRoll) {
      state.rollCount += 1;
      localStorage.setItem("kolor_dais_roll_count", String(state.rollCount));
    }

    updatePlayerPanel();
  }

  async function rollDice() {
    if (state.busy || !state.started) return;
    state.busy = true;
    state.mode = "rolling";
    setButtonsDisabled(true);

    elements.rollMessage.textContent = copy.rollMessages[Math.floor(Math.random() * copy.rollMessages.length)];
    elements.ghostDice.innerHTML = "";
    for (let index = 0; index < state.diceCount; index += 1) {
      const ghost = document.createElement("span");
      ghost.className = "ghost-die";
      elements.ghostDice.appendChild(ghost);
    }

    openOverlay(elements.rollOverlay);
    playTone(180, 0.1, 0, "square");
    await wait(820);
    const results = randomColors(state.diceCount);
    closeOverlay(elements.rollOverlay);
    applyResults(results);
    playResultSound(results);
    state.busy = false;
    state.mode = "ready";
    setButtonsDisabled(false);
  }

  async function megaRoll() {
    if (state.busy || !state.started) return;
    state.busy = true;
    state.mode = "mega";
    setButtonsDisabled(true);
    const results = randomColors(state.diceCount);
    elements.megaDiceRow.innerHTML = "";
    elements.megaProgress.innerHTML = "";
    elements.megaClose.classList.remove("is-ready");
    elements.megaClose.disabled = true;

    results.forEach((result, index) => {
      const die = document.createElement("div");
      die.className = "mega-die";
      die.id = `mega-die-${index}`;
      die.setAttribute("role", "img");
      die.setAttribute("aria-label", copy.hiddenDie(index + 1));
      die.innerHTML = '<span class="die-pip" aria-hidden="true"></span><span class="die-name"></span>';
      elements.megaDiceRow.appendChild(die);
      elements.megaProgress.appendChild(document.createElement("span"));
    });

    openOverlay(elements.megaOverlay);
    playTone(90, 0.8, 0, "sawtooth");
    await wait(80);
    Array.from(elements.megaDiceRow.children).forEach((die, index) => {
      window.setTimeout(() => die.classList.add("fly-in"), index * 120);
    });
    await wait(900 + results.length * 120);

    for (let index = 0; index < results.length; index += 1) {
      const result = results[index];
      const die = elements.megaDiceRow.children[index];
      die.classList.add("revealed");
      die.style.background = result.hex;
      die.style.boxShadow = `0 0 58px ${result.shadow}, 0 0 110px ${result.shadow}, inset -6px -6px 0 rgba(0, 0, 0, 0.18), inset 6px 6px 0 rgba(255, 255, 255, 0.22)`;
      die.querySelector(".die-name").textContent = result.name;
      die.setAttribute("aria-label", copy.resultDie(index + 1, result.name));
      elements.megaProgress.children[index].classList.add("done");
      playTone(240 + index * 70, 0.16, 0, "triangle");
      await wait(520);
    }

    applyResults(results);
    playResultSound(results);
    elements.megaClose.disabled = false;
    elements.megaClose.classList.add("is-ready");
    elements.megaClose.focus();
  }

  function closeMegaRoll() {
    if (!elements.megaClose.classList.contains("is-ready")) return;
    closeOverlay(elements.megaOverlay);
    elements.megaClose.classList.remove("is-ready");
    elements.megaClose.disabled = true;
    elements.megaDiceRow.innerHTML = "";
    elements.megaProgress.innerHTML = "";
    state.busy = false;
    state.mode = "ready";
    setButtonsDisabled(false);
    elements.megaButton.focus();
  }

  function drawScratchCover(canvas) {
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const width = canvas.width;
    const height = canvas.height;
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#999daa");
    gradient.addColorStop(0.28, "#d6d8df");
    gradient.addColorStop(0.5, "#f0f1f5");
    gradient.addColorStop(0.72, "#b9bdc7");
    gradient.addColorStop(1, "#d3d6de");
    context.fillStyle = gradient;
    context.beginPath();
    context.roundRect(0, 0, width, height, 28);
    context.fill();
    context.strokeStyle = "rgba(255, 255, 255, 0.26)";
    context.lineWidth = 2;
    for (let y = 16; y < height; y += 16) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
    context.fillStyle = "rgba(55, 61, 72, 0.5)";
    context.font = "800 20px Nunito, sans-serif";
    context.textAlign = "center";
    context.fillText(copy.scratchWord, width / 2, height / 2 + 34);
    context.font = "54px serif";
    context.fillText("🪙", width / 2, height / 2 - 16);
    return context;
  }

  function updateScratchProgress() {
    const percentage = state.scratchTotal ? Math.round((state.scratchRevealed / state.scratchTotal) * 100) : 0;
    elements.scratchProgressFill.style.width = `${percentage}%`;
    elements.scratchProgressLabel.textContent = state.scratchRevealed === state.scratchTotal ? copy.scratchComplete : copy.scratchProgress(state.scratchRevealed, state.scratchTotal);
    if (state.scratchRevealed === state.scratchTotal) {
      elements.scratchClose.disabled = false;
      elements.scratchClose.classList.add("is-ready");
      elements.scratchClose.focus();
    }
  }

  function createScratchCard(result, index) {
    const wrapper = document.createElement("div");
    wrapper.className = "scratch-card-wrap";
    const card = document.createElement("div");
    card.className = "scratch-card";
    const resultLayer = document.createElement("div");
    resultLayer.className = `scratch-result ${result.id}`;
    const canvas = document.createElement("canvas");
    canvas.className = "scratch-canvas";
    canvas.width = 220;
    canvas.height = 220;
    canvas.tabIndex = 0;
    canvas.setAttribute("role", "button");
    canvas.setAttribute("aria-label", copy.scratchPrompt(index + 1));
    const percentageLabel = document.createElement("div");
    percentageLabel.className = "scratch-percent";
    percentageLabel.textContent = "0%";
    card.append(resultLayer, canvas);
    wrapper.append(card, percentageLabel);
    const context = drawScratchCover(canvas);
    let scratching = false;
    let revealed = false;

    function reveal() {
      if (revealed) return;
      revealed = true;
      scratching = false;
      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.pointerEvents = "none";
      canvas.setAttribute("aria-label", copy.scratchResult(index + 1, result.name));
      percentageLabel.textContent = "100%";
      card.classList.add("revealed");
      state.scratchRevealed += 1;
      playTone(300 + index * 55, 0.15, 0, "triangle");
      updateScratchProgress();
    }

    function scratchedPercentage() {
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0;
      for (let offset = 3; offset < pixels.length; offset += 4) {
        if (pixels[offset] < 128) transparent += 1;
      }
      return Math.round((transparent / (canvas.width * canvas.height)) * 100);
    }

    function scratch(event) {
      if (!scratching || revealed) return;
      event.preventDefault();
      const bounds = canvas.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * canvas.width;
      const y = ((event.clientY - bounds.top) / bounds.height) * canvas.height;
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(x, y, 42, 0, Math.PI * 2);
      context.fill();
      const percentage = scratchedPercentage();
      percentageLabel.textContent = `${Math.min(percentage, 100)}%`;
      if (percentage >= 18) reveal();
    }

    canvas.addEventListener("pointerdown", (event) => {
      scratching = true;
      canvas.setPointerCapture(event.pointerId);
      scratch(event);
    });
    canvas.addEventListener("pointermove", scratch);
    canvas.addEventListener("pointerup", () => { scratching = false; });
    canvas.addEventListener("pointercancel", () => { scratching = false; });
    canvas.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        reveal();
      }
    });
    return wrapper;
  }

  function scratchRoll() {
    if (state.busy || !state.started) return;
    state.busy = true;
    state.mode = "scratch";
    setButtonsDisabled(true);
    state.scratchResults = randomColors(state.diceCount);
    state.scratchRevealed = 0;
    state.scratchTotal = state.diceCount;
    elements.scratchRow.innerHTML = "";
    elements.scratchClose.classList.remove("is-ready");
    elements.scratchClose.disabled = true;
    elements.scratchProgressFill.style.width = "0%";
    state.scratchResults.forEach((result, index) => elements.scratchRow.appendChild(createScratchCard(result, index)));
    updateScratchProgress();
    applyResults(state.scratchResults);
    openOverlay(elements.scratchOverlay);
    elements.scratchRow.querySelector("canvas")?.focus();
  }

  function closeScratchRoll() {
    if (!elements.scratchClose.classList.contains("is-ready")) return;
    closeOverlay(elements.scratchOverlay);
    elements.scratchClose.classList.remove("is-ready");
    elements.scratchClose.disabled = true;
    elements.scratchRow.innerHTML = "";
    state.busy = false;
    state.mode = "ready";
    setButtonsDisabled(false);
    elements.scratchButton.focus();
  }

  function updateSoundButton() {
    elements.soundToggle.setAttribute("aria-pressed", String(state.muted));
    elements.soundLabel.textContent = state.muted ? copy.muted : copy.sound;
    elements.soundToggle.querySelector(".sound-thumb").textContent = state.muted ? "🔇" : "🔊";
  }

  function toggleSound() {
    state.muted = !state.muted;
    localStorage.setItem("kolor_dais_sound", state.muted ? "off" : "on");
    updateSoundButton();
    if (!state.muted) playTone(420, 0.08);
  }

  function closeMenus() {
    elements.themeMenu.classList.remove("is-open");
    elements.playerMenu.classList.remove("is-open");
    elements.languageMenu.classList.remove("is-open");
    elements.themeToggle.setAttribute("aria-expanded", "false");
    elements.playerToggle.setAttribute("aria-expanded", "false");
    elements.languageToggle.setAttribute("aria-expanded", "false");
  }

  function toggleMenu(menu, toggle) {
    const willOpen = !menu.classList.contains("is-open");
    closeMenus();
    menu.classList.toggle("is-open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
  }

  function applyTheme(theme) {
    if (!themeLabels[theme]) theme = "blue";
    document.body.classList.remove(...themeClasses);
    document.body.classList.add(`theme-${theme}`);
    state.theme = theme;
    elements.themeLabel.textContent = themeLabels[theme];
    document.querySelector('meta[name="theme-color"]').setAttribute("content", themeColors[theme]);
    elements.themeMenu.querySelectorAll("[data-theme]").forEach((button) => {
      button.setAttribute("aria-checked", String(button.dataset.theme === theme));
    });
    localStorage.setItem("kolor_dais_theme", theme);
    closeMenus();
  }

  function updatePlayerPanel() {
    elements.playerCode.textContent = state.playerCode;
    elements.rollCount.textContent = String(state.rollCount);
  }

  function checkPlayerCode() {
    const code = elements.playerCodeInput.value.trim().toUpperCase();
    if (!code) {
      elements.playerResult.textContent = copy.enterCode;
      return;
    }
    if (code !== state.playerCode) {
      elements.playerResult.textContent = copy.playerNotFound;
      return;
    }
    const result = state.currentResults.length ? state.currentResults.map((color) => color.name).join(", ") : copy.noRolls;
    elements.playerResult.textContent = copy.playerStatus(result);
  }

  async function startGame() {
    if (state.started) return;
    state.started = true;
    elements.startButton.disabled = true;
    state.mode = "ready";
    playTone(330, 0.12, 0, "triangle");
    playTone(520, 0.16, 0.12, "triangle");
    elements.startScreen.classList.add("is-hidden");
    document.body.classList.remove("is-gated");
    await wait(340);
    await rollDice();
    await wait(120);
    elements.startScreen.hidden = true;
  }

  const canvasContext = elements.backgroundCanvas.getContext("2d");
  const backgroundSymbols = [];
  const symbolGlyphs = ["🎲", "🎯", "🎰", "🃏", "♟️", "🎮", "🎱", "🎳"];
  let canvasWidth = 0;
  let canvasHeight = 0;
  let canvasScale = 1;
  let previousFrame = performance.now();

  function resizeBackground(width, height) {
    canvasWidth = width;
    canvasHeight = height;
    canvasScale = Math.min(window.devicePixelRatio || 1, 1.5);
    elements.backgroundCanvas.width = Math.round(canvasWidth * canvasScale);
    elements.backgroundCanvas.height = Math.round(canvasHeight * canvasScale);
    canvasContext.setTransform(canvasScale, 0, 0, canvasScale, 0, 0);
    if (!backgroundSymbols.length) {
      for (let index = 0; index < 18; index += 1) {
        backgroundSymbols.push({
          x: Math.random() * canvasWidth,
          y: Math.random() * canvasHeight,
          glyph: symbolGlyphs[Math.floor(Math.random() * symbolGlyphs.length)],
          size: 28 + Math.random() * 32,
          vx: (Math.random() - 0.5) * 0.018,
          vy: (Math.random() - 0.5) * 0.018,
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.00035,
          opacity: 0.07 + Math.random() * 0.1
        });
      }
    }
  }

  function updateBackground(milliseconds) {
    backgroundSymbols.forEach((symbol) => {
      symbol.x += symbol.vx * milliseconds;
      symbol.y += symbol.vy * milliseconds;
      symbol.rotation += symbol.spin * milliseconds;
      if (symbol.x < -60) symbol.x = canvasWidth + 60;
      if (symbol.x > canvasWidth + 60) symbol.x = -60;
      if (symbol.y < -60) symbol.y = canvasHeight + 60;
      if (symbol.y > canvasHeight + 60) symbol.y = -60;
    });
  }

  function drawBackground() {
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
    backgroundSymbols.forEach((symbol) => {
      canvasContext.save();
      canvasContext.globalAlpha = symbol.opacity;
      canvasContext.translate(symbol.x, symbol.y);
      canvasContext.rotate(symbol.rotation);
      canvasContext.font = `${symbol.size}px serif`;
      canvasContext.textAlign = "center";
      canvasContext.textBaseline = "middle";
      canvasContext.fillText(symbol.glyph, 0, 0);
      canvasContext.restore();
    });
  }

  function backgroundFrame(timestamp) {
    const elapsed = timestamp - previousFrame;
    if (elapsed >= 32) {
      previousFrame = timestamp;
      updateBackground(Math.min(elapsed, 50));
      drawBackground();
    }
    window.requestAnimationFrame(backgroundFrame);
  }

  window.advanceTime = (milliseconds) => {
    let remaining = Math.max(0, milliseconds);
    while (remaining > 0) {
      const step = Math.min(remaining, 1000 / 60);
      updateBackground(step);
      remaining -= step;
    }
    drawBackground();
  };

  window.render_game_to_text = () => JSON.stringify({
    coordinateSystem: "DOM interface; background canvas origin is top-left, x increases right, y increases down",
    mode: state.mode,
    started: state.started,
    diceCount: state.diceCount,
    results: state.currentResults.map((result, index) => ({ die: index + 1, color: result.id, name: result.name })),
    rollCount: state.rollCount,
    theme: state.theme,
    soundMuted: state.muted,
    scratch: state.mode === "scratch" ? { revealed: state.scratchRevealed, total: state.scratchTotal } : null
  });

  elements.startButton.addEventListener("click", startGame);
  elements.rollButton.addEventListener("click", rollDice);
  elements.megaButton.addEventListener("click", megaRoll);
  elements.megaClose.addEventListener("click", closeMegaRoll);
  elements.scratchButton.addEventListener("click", scratchRoll);
  elements.scratchClose.addEventListener("click", closeScratchRoll);
  elements.soundToggle.addEventListener("click", toggleSound);
  elements.themeToggle.addEventListener("click", () => toggleMenu(elements.themeMenu, elements.themeToggle));
  elements.playerToggle.addEventListener("click", () => toggleMenu(elements.playerMenu, elements.playerToggle));
  elements.languageToggle.addEventListener("click", () => toggleMenu(elements.languageMenu, elements.languageToggle));
  elements.playerCheck.addEventListener("click", checkPlayerCode);
  elements.playerCodeInput.addEventListener("input", () => {
    elements.playerCodeInput.value = elements.playerCodeInput.value.toUpperCase();
  });
  elements.playerCodeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") checkPlayerCode();
  });
  elements.diceCount.addEventListener("change", () => {
    state.diceCount = Number.parseInt(elements.diceCount.value, 10);
    state.currentResults = [];
    elements.lastResult.textContent = copy.resetResult;
    renderDice(true);
  });
  elements.themeMenu.querySelectorAll("[data-theme]").forEach((button) => {
    button.addEventListener("click", () => applyTheme(button.dataset.theme));
  });

  document.addEventListener("click", (event) => {
    if (!elements.themeWrap.contains(event.target) && !elements.playerWrap.contains(event.target) && !elements.languageWrap.contains(event.target)) closeMenus();
  });

  document.addEventListener("keydown", async (event) => {
    const tagName = event.target.tagName;
    const isFormControl = ["INPUT", "SELECT", "BUTTON", "TEXTAREA", "SUMMARY"].includes(tagName);
    if (event.key.toLowerCase() === "f" && !isFormControl) {
      event.preventDefault();
      if (document.fullscreenElement) await document.exitFullscreen();
      else await elements.stage.requestFullscreen();
      return;
    }
    if (event.key === "Escape") {
      closeMenus();
      return;
    }
    if (!isFormControl && state.started && !state.busy && (event.code === "Space" || event.key === "Enter")) {
      event.preventDefault();
      rollDice();
    }
  });

  const backgroundResizeObserver = new ResizeObserver(([entry]) => {
    resizeBackground(entry.contentRect.width, entry.contentRect.height);
    drawBackground();
  });
  backgroundResizeObserver.observe(elements.stage);

  document.body.classList.add("is-gated");
  applyTheme(state.theme);
  updateSoundButton();
  updatePlayerPanel();
  renderDice();
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.requestAnimationFrame(backgroundFrame);
  }
})();
