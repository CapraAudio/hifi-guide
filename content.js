export const SOURCES = {
  computer: {
    label: "Computer",
    short: "Your computer runs the player and sends the audio signal onward.",
  },
  phone: {
    label: "Phone",
    short: "Your phone runs the player and sends the audio signal onward.",
  },
};

export const SETUPS = {
  builtin: {
    label: "Built-in output",
    shortLabel: "Headphone jack",
    output: "jack",
    badge: "Fewest parts",
    summary: "The source handles conversion, amplification, and volume control internally.",
    components: ["source", "headphones"],
    chain: ["source", "headphones"],
    needs: ["A source with a working headphone jack", "Wired headphones", "A plug or adapter that fits the jack"],
    digitalLabel: "Audio stays inside the source",
    analogLabel: "Analog headphone signal",
  },
  dongle: {
    label: "USB dongle",
    shortLabel: "Dongle",
    output: "usb",
    badge: "Portable",
    summary: "A small USB device converts the digital signal and powers the headphones.",
    components: ["source", "dongle", "headphones"],
    chain: ["source", "dongle", "headphones"],
    needs: ["A phone or computer with a compatible USB port", "A compatible USB DAC/headphone adapter", "Wired headphones"],
    digitalLabel: "Digital audio over USB",
    analogLabel: "Analog headphone signal",
  },
  combo: {
    label: "Desktop DAC + amp",
    shortLabel: "One desktop box",
    output: "usb",
    badge: "Simple desktop",
    summary: "One desktop unit combines conversion, amplification, and volume control.",
    components: ["source", "combo", "headphones"],
    chain: ["source", "combo", "headphones"],
    needs: ["A phone or computer with compatible digital output", "A combined desktop DAC/headphone amplifier", "A compatible USB cable", "Wired headphones"],
    digitalLabel: "Digital audio over USB",
    analogLabel: "Amplified headphone signal",
  },
  separates: {
    label: "Separate DAC + amp",
    shortLabel: "Two desktop boxes",
    output: "usb",
    badge: "Most flexible",
    summary: "One unit converts the signal; another provides volume control and headphone power.",
    components: ["source", "dac", "amp", "headphones"],
    chain: ["source", "dac", "amp", "headphones"],
    needs: ["A phone or computer with compatible digital output", "A DAC", "A headphone amplifier", "USB and analog interconnect cables", "Wired headphones"],
    digitalLabel: "Digital audio over USB",
    analogLabel: "Line-level, then amplified analog audio",
  },
};

export const COMPONENTS = {
  source: {
    role: "Source",
    title: ({ source }) => SOURCES[source].label,
    body: ({ source, setup }) => `${SOURCES[source].label} runs your music app and starts the chain. In this setup, ${setup === "builtin" ? "it also converts the digital audio and powers the headphones." : "it sends digital audio to the next device."}`,
    connects: ({ setup }) => setup === "builtin" ? "Connects straight to the headphones through its headphone jack." : "Connects to the next device through a compatible USB cable.",
  },
  dongle: {
    role: "DAC + headphone amplifier",
    title: () => "USB dongle",
    body: () => "This small device contains both a DAC and a headphone amplifier. It converts the digital signal, controls the analog output, and provides power for the headphones.",
    connects: () => "USB from the source; headphone plug on the other end.",
  },
  combo: {
    role: "DAC + headphone amplifier",
    title: () => "Desktop DAC/amp",
    body: () => "This desktop unit combines two jobs: the DAC converts digital audio to analog, and the amplifier raises that signal to a useful headphone level.",
    connects: () => "Digital input from the source; amplified headphone output to the headphones.",
  },
  dac: {
    role: "Digital-to-analog converter",
    title: () => "DAC",
    body: () => "The DAC converts digital audio data into an analog signal. Its output is normally line level, so the headphone amplifier handles listening volume and power.",
    connects: () => "Digital input from the source; analog line output to the amplifier.",
  },
  amp: {
    role: "Headphone amplifier",
    title: () => "Amplifier",
    body: () => "The amplifier takes the DAC’s analog signal and supplies adjustable voltage and current to the headphones. More output is useful only when the current source cannot reach a clean, comfortable level or lacks a needed feature.",
    connects: () => "Analog line input from the DAC; amplified headphone output to the headphones.",
  },
  headphones: {
    role: "Transducer",
    title: () => "Headphones",
    body: () => "Headphones turn the changing electrical signal into sound. Fit, comfort, isolation, and tuning usually matter more to daily use than the number of boxes on the desk.",
    connects: ({ setup }) => setup === "builtin" ? "Plugs into the source’s headphone jack." : `Plugs into the ${setup === "separates" ? "headphone amplifier" : setup === "combo" ? "desktop DAC/amp" : "USB dongle"}.`,
  },
};

export const LESSONS = [
  {
    title: "Choosing headphones: open or closed?",
    kicker: "Start with where you listen",
    body: `<p><strong>Open-back</strong> headphones let sound pass through the earcups. They leak sound and let room noise in, so they suit quiet, private spaces.</p><p><strong>Closed-back</strong> headphones reduce leakage and outside noise, making them easier to use near other people. Neither design is universally better.</p><p>Comfort, pad seal, weight, heat, and clamp all matter. A poor seal can also change the bass you hear.</p>`,
  },
  {
    title: "DACs, amplifiers, and cables",
    kicker: "Jobs can share one box",
    body: `<p>A <strong>DAC</strong> turns digital audio into an analog signal. A <strong>headphone amplifier</strong> supplies adjustable voltage and current to the headphones. Phones, computers, dongles, and desktop units may combine both jobs.</p><p>Use a digital cable before the DAC and an analog cable after it. Connector shape alone does not guarantee compatibility, so check the source, device, and cable documentation.</p>`,
  },
  {
    title: "Impedance, sensitivity, and power",
    kicker: "One number cannot answer it",
    body: `<p><strong>Impedance</strong> describes the electrical load. <strong>Sensitivity</strong> describes how much sound a headphone produces for a stated input. Together with your listening level, both affect the output required.</p><p>High impedance can call for more voltage, while low sensitivity can also make a headphone demanding. There is no universal ohm cutoff for needing an amplifier. If your output reaches a clean, comfortable level with room to spare, it may already be sufficient.</p>`,
  },
  {
    title: "Tuning and EQ",
    kicker: "Shape the balance",
    body: `<p>Tuning is the balance of bass, midrange, and treble. Words such as “warm,” “bright,” and “neutral” describe that balance; they do not guarantee quality or personal preference.</p><p>EQ changes the level of frequency ranges and can tailor tonal balance. Use modest adjustments and reduce overall gain when boosting bands to preserve headroom. EQ cannot fix a poor seal, a damaged driver, or an output that is clipping.</p>`,
  },
  {
    title: "Files, formats, and lossless audio",
    kicker: "Labels are not the whole system",
    body: `<p>Lossless compression preserves the encoded audio data; lossy formats discard some data to reduce file size. Converting a lossy file to a lossless format cannot restore what was removed.</p><p>Lossless and high-resolution playback may use more storage or data and can require compatible wired hardware. A format label by itself does not promise an audible improvement.</p>`,
  },
  {
    title: "A sensible upgrade order",
    kicker: "Solve a specific problem",
    body: `<p>Start with the issue you can repeat: uncomfortable fit, unwanted leakage, tonal balance, missing connection support, insufficient volume, audible noise, or distortion.</p><p>A separate DAC or amplifier is useful when it fixes one of those limitations or adds a feature you need. Adding boxes does not automatically improve every setup.</p>`,
  },
  {
    title: "Connect it safely",
    kicker: "Low volume first",
    body: `<ol><li>Turn the listening volume down.</li><li>Connect the source to the DAC or adapter, if present.</li><li>Connect each analog stage, then the headphones.</li><li>Select the correct audio output in the operating system.</li><li>Start playback and raise volume gradually.</li></ol>`,
  },
  {
    title: "Quick troubleshooting",
    kicker: "Check the whole path",
    body: `<p><strong>No sound:</strong> check the selected output, mute state, app routing, cable seating, and each device’s power.</p><p><strong>One side only:</strong> reseat the plug, check balance settings, and try another cable or source.</p><p><strong>Crackling or distortion:</strong> lower volume and EQ boosts, then test another port or cable. One faulty result does not identify which part is responsible.</p>`,
  },
];

export const REFERENCES = [
  { label: "Sennheiser — Open and closed-back headphones", url: "https://support.sennheiser-hearing.com/hc/en-us/articles/34973090006429-What-is-the-difference-between-open-and-closed-backed-headphones" },
  { label: "Focusrite — What is an audio interface?", url: "https://support.focusrite.com/hc/en-gb/articles/21116255488402-What-is-an-audio-interface" },
  { label: "Shure — FP22 headphone amplifier guide", url: "https://pubs.shure.com/view/guide/FP22/en-US.pdf" },
  { label: "Apple — About lossless audio", url: "https://support.apple.com/en-us/118295" },
  { label: "Apple — Convert music file formats", url: "https://support.apple.com/en-us/108961" },
];
