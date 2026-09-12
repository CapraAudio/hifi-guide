import { COMPONENTS, LESSONS, REFERENCES, SETUPS, SOURCES } from "./content.js";

const state = {
  source: "computer",
  output: "jack",
  setup: "builtin",
  selected: "source",
};

const els = {
  sourceControls: document.querySelector("#source-controls"),
  outputControls: document.querySelector("#output-controls"),
  setupOptions: document.querySelector("#setup-options"),
  changeNotice: document.querySelector("#change-notice"),
  removeExternal: document.querySelector("#remove-external"),
  reset: document.querySelector("#reset"),
  themeToggle: document.querySelector("#theme-toggle"),
  themeColor: document.querySelector('meta[name="theme-color"]'),
  sourceLayer: document.querySelector("#source-layer"),
  gearLayer: document.querySelector("#gear-layer"),
  headphonesLayer: document.querySelector("#headphones-layer"),
  cables: document.querySelector("#cables"),
  sceneDescription: document.querySelector("#scene-description"),
  signalPath: document.querySelector("#signal-path"),
  signalDescription: document.querySelector("#signal-description"),
  componentRole: document.querySelector("#component-role"),
  inspectorTitle: document.querySelector("#inspector-title"),
  componentBody: document.querySelector("#component-body"),
  componentConnects: document.querySelector("#component-connects"),
  componentFunctions: document.querySelector("#component-functions"),
  needTitle: document.querySelector("#need-title"),
  needItems: document.querySelector("#need-items"),
  lessonList: document.querySelector("#lesson-list"),
  referenceList: document.querySelector("#reference-list"),
};

function setTheme(theme, remember = true) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === "dark";
  els.themeToggle.setAttribute("aria-pressed", String(dark));
  els.themeToggle.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
  els.themeToggle.querySelector(".theme-label").textContent = dark ? "LIGHT" : "DARK";
  els.themeColor.setAttribute("content", dark ? "#11110f" : "#f4f1ea");
  if (remember) {
    try { localStorage.setItem("capra-theme", theme); } catch (_) {}
  }
}

const functionLabels = {
  source: () => state.setup === "builtin" ? "Source · DAC · amplifier" : "Source",
  dongle: () => "DAC · amplifier · volume control",
  combo: () => "DAC · amplifier · volume control",
  dac: () => "Digital-to-analog conversion",
  amp: () => "Amplification · volume control",
  headphones: () => "Electrical signal to sound",
};

function deviceLabel(x, y, width, name, role) {
  return `<g class="device-label" transform="translate(${x} ${y})" aria-hidden="true">
    <rect width="${width}" height="42" rx="8"/>
    <text x="10" y="17">${name}</text>
    <text class="role-text" x="10" y="32">${role}</text>
  </g>`;
}

function computerGraphic() {
  return `<g class="device" data-component="source" role="button" tabindex="0" aria-label="Computer, source device" transform="translate(104 184)">
    <rect class="focus-ring" x="-12" y="-14" width="240" height="204" rx="18"/>
    <g filter="url(#shadow)">
      <rect x="10" y="0" width="190" height="122" rx="9" fill="#1a181d" stroke="#77717d" stroke-width="4"/>
      <rect x="20" y="10" width="170" height="99" rx="4" fill="url(#screen)"/>
      <circle cx="105" cy="5" r="2" fill="#8d8790"/>
      <path d="M-3 128h216l17 43H-20Z" fill="url(#metal)" stroke="#77717d" stroke-width="2"/>
      <path d="M60 136h91l8 23H52Z" fill="#141217" stroke="#4a4650"/>
      <path d="M-20 171h250c-2 7-9 10-18 10H-1c-9 0-16-3-19-10Z" fill="#918b96"/>
      <path d="M63 74c24-35 51-35 82 0" fill="none" stroke="#a874ef" stroke-width="5" opacity=".65"/>
      <circle cx="82" cy="75" r="8" fill="#d4bcfb" opacity=".8"/><circle cx="126" cy="75" r="8" fill="#d4bcfb" opacity=".8"/>
    </g>
    ${deviceLabel(24, -58, 162, "Computer", "Source")}
  </g>`;
}

function phoneGraphic() {
  return `<g class="device" data-component="source" role="button" tabindex="0" aria-label="Phone, source device" transform="translate(155 177)">
    <rect class="focus-ring" x="-12" y="-12" width="128" height="214" rx="22"/>
    <g filter="url(#shadow)">
      <rect x="0" y="0" width="104" height="188" rx="19" fill="#111014" stroke="#77717d" stroke-width="4"/>
      <rect x="8" y="12" width="88" height="157" rx="12" fill="url(#screen)"/>
      <rect x="36" y="6" width="32" height="5" rx="3" fill="#3e3a43"/>
      <circle cx="52" cy="178" r="4" fill="#48434d"/>
      <circle cx="35" cy="73" r="14" fill="#b887ff" opacity=".75"/>
      <path d="M55 60h28M55 70h20M25 101h58M25 112h40" stroke="#dfcef9" stroke-width="4" stroke-linecap="round" opacity=".7"/>
    </g>
    ${deviceLabel(-10, -52, 124, "Phone", "Source")}
  </g>`;
}

function dongleGraphic() {
  return `<g class="device" data-component="dongle" role="button" tabindex="0" aria-label="USB dongle, DAC and headphone amplifier" transform="translate(410 306)">
    <rect class="focus-ring" x="-12" y="-15" width="158" height="82" rx="18"/>
    <g filter="url(#shadow)">
      <path d="M0 15h28" stroke="#17151b" stroke-width="8" stroke-linecap="round"/>
      <rect x="26" y="0" width="105" height="48" rx="13" fill="url(#purpleMetal)" stroke="#c6a5f5"/>
      <rect x="130" y="15" width="18" height="18" rx="3" fill="#17151b" stroke="#79717d"/>
      <circle class="led" cx="45" cy="24" r="3"/>
      <text x="61" y="28" fill="#f3eaff" font-size="10" font-weight="700" letter-spacing="1">USB DAC</text>
    </g>
    ${deviceLabel(18, -62, 119, "USB dongle", "DAC + amp")}
  </g>`;
}

function comboGraphic() {
  return `<g class="device" data-component="combo" role="button" tabindex="0" aria-label="Desktop DAC and headphone amplifier combination" transform="translate(405 240)">
    <rect class="focus-ring" x="-13" y="-14" width="196" height="146" rx="18"/>
    <g filter="url(#shadow)">
      <path d="M10 105h154l-8 15H18Z" fill="#111015"/>
      <rect x="0" y="0" width="174" height="108" rx="12" fill="url(#metal)" stroke="#77717d" stroke-width="2"/>
      <rect x="12" y="16" width="63" height="31" rx="4" fill="#100e14" stroke="#4b4350"/>
      <text x="23" y="36" fill="#c899ff" font-size="13" font-family="monospace">48.0</text>
      <circle cx="129" cy="49" r="30" fill="url(#knob)" stroke="#928c97" stroke-width="2"/>
      <path d="M129 25v10" stroke="#cdb9df" stroke-width="2"/>
      <circle class="led" cx="22" cy="82" r="4"/>
      <circle cx="55" cy="82" r="8" fill="#0e0d10" stroke="#837b88" stroke-width="2"/>
      <text x="84" y="88" fill="#b7b0bb" font-size="9" letter-spacing="1">DAC / AMP</text>
    </g>
    ${deviceLabel(8, -58, 160, "Desktop DAC/amp", "Two jobs · one box")}
  </g>`;
}

function separatesGraphic() {
  return `<g>
    <g class="device" data-component="dac" role="button" tabindex="0" aria-label="Separate digital-to-analog converter" transform="translate(350 257)">
      <rect class="focus-ring" x="-11" y="-13" width="140" height="125" rx="17"/>
      <g filter="url(#shadow)">
        <rect width="118" height="94" rx="10" fill="url(#metal)" stroke="#77717d" stroke-width="2"/>
        <rect x="12" y="17" width="54" height="27" rx="4" fill="#100e14" stroke="#4b4350"/>
        <text x="19" y="35" fill="#c899ff" font-size="11" font-family="monospace">96k</text>
        <circle class="led" cx="18" cy="71" r="4"/>
        <text x="38" y="75" fill="#b7b0bb" font-size="10" letter-spacing="1">DAC</text>
      </g>
      ${deviceLabel(0, -55, 118, "DAC", "Conversion")}
    </g>
    <g class="device" data-component="amp" role="button" tabindex="0" aria-label="Separate headphone amplifier" transform="translate(515 257)">
      <rect class="focus-ring" x="-11" y="-13" width="150" height="125" rx="17"/>
      <g filter="url(#shadow)">
        <rect width="128" height="94" rx="10" fill="url(#metal)" stroke="#77717d" stroke-width="2"/>
        <circle cx="88" cy="46" r="27" fill="url(#knob)" stroke="#928c97" stroke-width="2"/>
        <path d="M88 23v9" stroke="#cdb9df" stroke-width="2"/>
        <circle class="led" cx="17" cy="25" r="4"/>
        <circle cx="25" cy="67" r="8" fill="#0e0d10" stroke="#837b88" stroke-width="2"/>
        <text x="43" y="72" fill="#b7b0bb" font-size="10" letter-spacing="1">AMP</text>
      </g>
      ${deviceLabel(4, -55, 120, "Amplifier", "Volume + power")}
    </g>
  </g>`;
}

function headphonesGraphic() {
  return `<g class="device" data-component="headphones" role="button" tabindex="0" aria-label="Wired over-ear headphones" transform="translate(710 163)">
    <rect class="focus-ring" x="-20" y="-20" width="186" height="210" rx="25"/>
    <g filter="url(#shadow)">
      <path d="M19 86C19 18 46 0 76 0s57 18 57 86" fill="none" stroke="#131116" stroke-width="21" stroke-linecap="round"/>
      <path d="M22 77C25 27 46 11 76 11s51 16 54 66" fill="none" stroke="#837b88" stroke-width="4"/>
      <path d="M10 85c0-13 10-23 23-23h13v82H33c-13 0-23-10-23-23Z" fill="url(#metal)" stroke="#77717d" stroke-width="3"/>
      <rect x="26" y="76" width="29" height="55" rx="13" fill="#17151b" stroke="#9d94a2"/>
      <path d="M142 85c0-13-10-23-23-23h-13v82h13c13 0 23-10 23-23Z" fill="url(#metal)" stroke="#77717d" stroke-width="3"/>
      <rect x="97" y="76" width="29" height="55" rx="13" fill="#17151b" stroke="#9d94a2"/>
      <path d="M28 144v27m96-27v27M13 171h126" stroke="#2d2931" stroke-width="7" stroke-linecap="round"/>
    </g>
    ${deviceLabel(6, -65, 140, "Headphones", "Sound output")}
  </g>`;
}

function labelGraphic(x, y, width, text, kind) {
  return `<g class="cable-label ${kind}" transform="translate(${x} ${y})"><rect width="${width}" height="24" rx="7"/><text x="10" y="16">${text}</text></g>`;
}

function cable(path, kind, from, to) {
  return `<path class="cable-under" d="${path}"/><path class="cable-${kind}" data-from="${from}" data-to="${to}" d="${path}"/>`;
}

function renderScene() {
  const setup = SETUPS[state.setup];
  const sourceStart = state.source === "computer" ? 314 : 259;
  els.sourceLayer.innerHTML = state.source === "computer" ? computerGraphic() : phoneGraphic();
  els.headphonesLayer.innerHTML = headphonesGraphic();

  if (state.setup === "dongle") els.gearLayer.innerHTML = dongleGraphic();
  else if (state.setup === "combo") els.gearLayer.innerHTML = comboGraphic();
  else if (state.setup === "separates") els.gearLayer.innerHTML = separatesGraphic();
  else els.gearLayer.innerHTML = "";

  if (state.setup === "builtin") {
    const p = `M${sourceStart} 351 C440 412 602 412 716 342`;
    els.cables.innerHTML = cable(p, "analog", "source", "headphones") + labelGraphic(449, 391, 154, "ANALOG · HEADPHONE", "analog");
  } else if (state.setup === "dongle") {
    const p1 = `M${sourceStart} 344 C352 344 384 329 410 329`;
    const p2 = "M558 329 C620 344 667 363 716 342";
    els.cables.innerHTML = cable(p1, "digital", "source", "dongle") + cable(p2, "analog", "dongle", "headphones") + labelGraphic(334, 355, 104, "DIGITAL · USB", "digital") + labelGraphic(573, 373, 147, "ANALOG · HEADPHONE", "analog");
  } else if (state.setup === "combo") {
    const p1 = `M${sourceStart} 344 C350 384 370 359 405 331`;
    const p2 = "M579 332 C637 337 670 359 716 342";
    els.cables.innerHTML = cable(p1, "digital", "source", "combo") + cable(p2, "analog", "combo", "headphones") + labelGraphic(326, 374, 104, "DIGITAL · USB", "digital") + labelGraphic(585, 367, 147, "ANALOG · HEADPHONE", "analog");
  } else {
    const p1 = `M${sourceStart} 344 C330 387 337 362 350 332`;
    const p2 = "M468 330 C488 347 496 347 515 330";
    const p3 = "M643 330 C669 345 693 353 716 342";
    els.cables.innerHTML = cable(p1, "digital", "source", "dac") + cable(p2, "analog", "dac", "amp") + cable(p3, "analog", "amp", "headphones") + labelGraphic(305, 378, 104, "DIGITAL · USB", "digital") + labelGraphic(470, 359, 92, "ANALOG · LINE", "analog") + labelGraphic(644, 374, 147, "ANALOG · HEADPHONE", "analog");
  }

  document.querySelectorAll(".device").forEach((device) => {
    const component = device.dataset.component;
    device.classList.toggle("selected", component === state.selected);
    device.addEventListener("click", () => selectComponent(component));
    device.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectComponent(component);
      }
    });
  });

  highlightConnections();
}

function highlightConnections() {
  document.querySelectorAll("[data-from][data-to]").forEach((path) => {
    const related = path.dataset.from === state.selected || path.dataset.to === state.selected;
    path.style.opacity = related ? "1" : ".32";
    path.style.strokeWidth = related ? "7" : "5";
  });
}

function renderControls() {
  els.sourceControls.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.source === state.source));
  });
  els.outputControls.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.output === state.output));
  });

  els.setupOptions.innerHTML = Object.entries(SETUPS).map(([key, setup]) => {
    const current = key === state.setup;
    const action = current ? "Current setup" : state.setup === "builtin" ? "Add" : key === "builtin" ? "Remove gear" : "Replace";
    return `<button type="button" class="setup-card" data-setup="${key}" aria-pressed="${current}">
      <span class="setup-action">${action}</span>
      <strong>${setup.shortLabel}</strong>
      <small>${setup.badge} · ${setup.output === "jack" ? "Headphone jack" : "USB-C"}</small>
    </button>`;
  }).join("");
  els.removeExternal.hidden = state.setup === "builtin";
}

function selectComponent(component) {
  if (!SETUPS[state.setup].components.includes(component)) return;
  state.selected = component;
  renderScene();
  renderInspector();
}

function renderInspector() {
  const data = COMPONENTS[state.selected];
  const context = { source: state.source, setup: state.setup, output: state.output };
  els.componentRole.textContent = data.role;
  els.inspectorTitle.textContent = data.title(context);
  els.componentBody.textContent = data.body(context);
  els.componentConnects.textContent = data.connects(context);
  els.componentFunctions.textContent = functionLabels[state.selected]();
}

function renderSummary() {
  const setup = SETUPS[state.setup];
  const sourceName = SOURCES[state.source].label;
  const names = setup.chain.map((component) => component === "source" ? sourceName : COMPONENTS[component].title({ source: state.source, setup: state.setup }));
  const path = names.join(" → ");
  const description = `${path}. ${setup.digitalLabel}. ${setup.analogLabel}.`;
  els.signalPath.textContent = path;
  els.signalDescription.textContent = description;
  els.sceneDescription.textContent = description;
  els.needTitle.textContent = `${setup.label} setup`;
  els.needItems.innerHTML = setup.needs.map((item) => `<li>${item}</li>`).join("");
}

function hideNotice() {
  els.changeNotice.hidden = true;
  els.changeNotice.innerHTML = "";
}

function showNotice(message, actions) {
  els.changeNotice.hidden = false;
  els.changeNotice.innerHTML = `<p>${message}</p><div class="notice-actions"></div>`;
  const actionArea = els.changeNotice.querySelector(".notice-actions");
  actions.forEach(({ label, apply, run }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    if (apply) button.classList.add("apply");
    button.addEventListener("click", () => {
      hideNotice();
      run();
    });
    actionArea.append(button);
  });
  els.changeNotice.querySelector("button")?.focus();
}

function applySetup(setupKey) {
  state.setup = setupKey;
  state.output = SETUPS[setupKey].output;
  state.selected = SETUPS[setupKey].components.includes(state.selected) ? state.selected : (setupKey === "builtin" ? "source" : SETUPS[setupKey].components[1]);
  render();
}

function requestSetup(setupKey) {
  if (setupKey === state.setup) return;
  const target = SETUPS[setupKey];
  if (target.output !== state.output) {
    const outputName = target.output === "usb" ? "USB-C" : "the headphone jack";
    showNotice(
      `${target.label} uses ${outputName}. Applying it will also change the source output and replace the current path.`,
      [
        { label: "Cancel", run: hideNotice },
        { label: `Use ${target.shortLabel}`, apply: true, run: () => applySetup(setupKey) },
      ],
    );
    return;
  }
  applySetup(setupKey);
}

function requestOutput(output) {
  if (output === state.output) return;
  if (output === "jack") {
    if (state.setup === "builtin") {
      state.output = "jack";
      render();
      return;
    }
    showNotice(
      "Using the headphone jack removes the external digital chain and returns conversion and amplification to the source.",
      [
        { label: "Cancel", run: hideNotice },
        { label: "Use built-in output", apply: true, run: () => applySetup("builtin") },
      ],
    );
    return;
  }

  if (state.setup !== "builtin") {
    state.output = "usb";
    render();
    return;
  }
  showNotice(
    "USB-C carries digital audio, so this guide adds a device that converts and amplifies it before the headphones.",
    [
      { label: "Cancel", run: hideNotice },
      { label: "Add dongle", apply: true, run: () => applySetup("dongle") },
      { label: "Add desktop box", apply: true, run: () => applySetup("combo") },
    ],
  );
}

function reset() {
  Object.assign(state, { source: "computer", output: "jack", setup: "builtin", selected: "source" });
  hideNotice();
  render();
}

function render() {
  renderControls();
  renderScene();
  renderInspector();
  renderSummary();
}

function renderReading() {
  els.lessonList.innerHTML = LESSONS.map((lesson, index) => `<details class="lesson" ${index === 0 ? "open" : ""}>
    <summary><span>${lesson.kicker}</span><strong>${lesson.title}</strong></summary>
    <div class="lesson-body">${lesson.body}</div>
  </details>`).join("");
  els.referenceList.innerHTML = REFERENCES.map((reference) => `<li><a href="${reference.url}" target="_blank" rel="noreferrer">${reference.label}<span class="sr-only"> (opens in a new tab)</span></a></li>`).join("");
}

els.sourceControls.addEventListener("click", (event) => {
  const button = event.target.closest("[data-source]");
  if (!button) return;
  state.source = button.dataset.source;
  state.selected = "source";
  hideNotice();
  render();
});

els.outputControls.addEventListener("click", (event) => {
  const button = event.target.closest("[data-output]");
  if (button) requestOutput(button.dataset.output);
});

els.setupOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-setup]");
  if (button) requestSetup(button.dataset.setup);
});

els.removeExternal.addEventListener("click", () => {
  showNotice(
    "Removing the external gear returns to the source’s headphone jack. The source will handle conversion, volume, and amplification.",
    [
      { label: "Cancel", run: hideNotice },
      { label: "Remove external gear", apply: true, run: () => applySetup("builtin") },
    ],
  );
});

els.reset.addEventListener("click", reset);
els.themeToggle.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

renderReading();
setTheme(document.documentElement.dataset.theme || "light", false);
render();
