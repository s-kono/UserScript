// ==UserScript==
// @name           xVSC
// @description    Video Speed Controller
// @author         github.com/s-kono
// @namespace      https://github.com/s-kono/UserScript
// @updateURL      https://github.com/s-kono/UserScript/raw/main/xVSC.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/xVSC.user.js
// @version        0.20261011.0
// @match          *://*/*
// @grant          none
// @run-at         document-idle
// @icon           data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAD/794AAAAAAGNCHwDKvq8Ael0rAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREREREREREREREREREREREREREREREURERERERBEUREQiREREQRRERDMkRERBFEREMAJEREEUREQwAzREQRRERDAANERBFEREMAM0REEUREQzM0REQRRERDNERERBFEREREREREERREREREREERERERERERERERERERERERH//wAA//8AAP//AADAAwAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAwAMAAP//AAD//wAA
// ==/UserScript==

// AI-assisted

(function() {
    'use strict';

    const log_flag = true;
    const us_name = 'xVSC';
    const DEFAULT_SPEED = 2.2;
    const HIDE_DELAY_MS = 3400;
    const LEAVE_HIDE_DELAY_MS = 800;
    const STORAGE_KEY = `${us_name}-speed`;

    const GAIN_MIN = 1 / 3;
    const GAIN_MAX = 5.0;
    const GAIN_SLIDER_STEPS = 100;
    const LOG_GAIN_MIN = Math.log(GAIN_MIN);
    const LOG_GAIN_MAX = Math.log(GAIN_MAX);

    const VOLUME_MIN = 0.0;
    const VOLUME_MAX = 1.0;
    const VOLUME_SLIDER_STEPS = 100;

    const WEB_AUDIO_DELAY_MS = 5000;

    function output_console(...args) {
        if (log_flag) console.log(...args);
    }

    output_console(`[${us_name}] initialized`);

    // ---------------------------------------------------------------- persisted settings
    let persistedSpeed = DEFAULT_SPEED;
    try {
        const s = localStorage.getItem(STORAGE_KEY);
        if (s !== null) {
            const v = parseFloat(s);
            if (!Number.isNaN(v)) persistedSpeed = v;
        }
    } catch (e) {
        output_console(`[${us_name}] localStorage read failed`, e);
    }

    function persistSpeed(speed) {
        try { localStorage.setItem(STORAGE_KEY, String(speed)); } catch (e) {}
    }

    function clampGain(g) {
        if (!Number.isFinite(g)) return 1.0;
        return Math.max(GAIN_MIN, Math.min(GAIN_MAX, g));
    }

    function clampVolume(v) {
        if (!Number.isFinite(v)) return 1.0;
        return Math.max(VOLUME_MIN, Math.min(VOLUME_MAX, v));
    }

    function gainToSlider(g) {
        return Math.round((Math.log(clampGain(g)) - LOG_GAIN_MIN) / (LOG_GAIN_MAX - LOG_GAIN_MIN) * GAIN_SLIDER_STEPS);
    }

    function sliderToGain(v) {
        let g = Math.exp(LOG_GAIN_MIN + (v / GAIN_SLIDER_STEPS) * (LOG_GAIN_MAX - LOG_GAIN_MIN));
        if (Math.abs(g - 1.0) < 0.01) g = 1.0;
        return clampGain(g);
    }

    function volumeToSlider(v) {
        return Math.round(clampVolume(v) * VOLUME_SLIDER_STEPS);
    }

    function sliderToVolume(v) {
        const x = clampVolume(v / VOLUME_SLIDER_STEPS);
        if (Math.abs(x - 1.0) < 0.01) return 1.0;
        return x;
    }

    // ---------------------------------------------------------------- state
    const videoData = new WeakMap();
    const audioNodes = new WeakMap();
    const controllersMap = new Map();

    let activeVideo = null;
    let keyboardHandlerRegistered = false;

    // ---------------------------------------------------------------- Web Audio
    let sharedAudioContext = null;

    function getAudioContext() {
        if (sharedAudioContext) return sharedAudioContext;
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) {
            output_console(`[${us_name}] AudioContext not available`);
            return null;
        }
        try {
            sharedAudioContext = new AC();
            sharedAudioContext.addEventListener('statechange', () => {
                output_console(`[${us_name}] AudioContext state: ${sharedAudioContext.state}`);
            });
            output_console(`[${us_name}] AudioContext created (state: ${sharedAudioContext.state})`);
        } catch (e) {
            output_console(`[${us_name}] AudioContext creation failed`, e);
            sharedAudioContext = null;
        }
        return sharedAudioContext;
    }

    function resumeAudioContext() {
        if (sharedAudioContext && sharedAudioContext.state === 'suspended') {
            sharedAudioContext.resume().catch(() => {});
        }
    }

    ['pointerdown', 'keydown', 'touchstart'].forEach(t => {
        document.addEventListener(t, resumeAudioContext, { capture: true, passive: true });
    });

    function ensureCorsForWebAudio(video) {
        const src = video.currentSrc || video.src || '';
        if (!src || /^(blob|data|mediastream):/i.test(src)) return;
        let origin;
        try { origin = new URL(src, location.href).origin; } catch (e) { return; }
        if (origin === location.origin || video.crossOrigin) return;

        output_console(`[${us_name}] Cross-origin media without CORS; reloading with crossorigin=anonymous`);
        const t = video.currentTime;
        const rate = video.playbackRate;
        const wasPlaying = !video.paused && !video.ended;

        const restore = () => {
            const once = () => {
                video.removeEventListener('loadedmetadata', once);
                try {
                    video.currentTime = t;
                    video.playbackRate = rate;
                    if (wasPlaying) video.play().catch(() => {});
                } catch (e) {}
            };
            video.addEventListener('loadedmetadata', once);
        };

        const onError = () => {
            output_console(`[${us_name}] CORS reload failed; reverting crossorigin`);
            video.crossOrigin = null;
            restore();
            video.load();
        };

        video.addEventListener('error', onError, { once: true });
        video.addEventListener('loadeddata', () => video.removeEventListener('error', onError), { once: true });

        video.crossOrigin = 'anonymous';
        restore();
        video.load();
    }

    function connectAudio(video, data) {
        if (data.gainNode) return true;
        if (data.audioFailed) return false;

        const existing = audioNodes.get(video);
        if (existing) {
            data.gainNode = existing.gainNode;
            data.gainNode.gain.value = data.currentGain;
            return true;
        }

        const ctx = getAudioContext();
        if (!ctx) { data.audioFailed = true; return false; }

        try {
            ensureCorsForWebAudio(video);
            const source = ctx.createMediaElementSource(video);
            const gainNode = ctx.createGain();
            gainNode.gain.value = data.currentGain;
            source.connect(gainNode);
            gainNode.connect(ctx.destination);
            audioNodes.set(video, { source, gainNode });
            data.gainNode = gainNode;
            resumeAudioContext();
            output_console(`[${us_name}] Web Audio connected (gain x${data.currentGain.toFixed(2)})`);
            return true;
        } catch (e) {
            output_console(`[${us_name}] Web Audio connection failed (likely already owned by another script): ${e.message}`);
            data.audioFailed = true;
            return false;
        }
    }

    function applyGain(data, gain) {
        if (data.audioFailed) {
            // Another script owns the MediaElementSource; use video.volume instead.
            data.currentVolume = clampVolume(gain);
            try { data.video.volume = data.currentVolume; } catch (e) {}
        } else {
            data.currentGain = clampGain(gain);
            if (data.gainNode) {
                try { data.gainNode.gain.value = data.currentGain; } catch (e) {}
            }
        }
        if (data.updateGainDisplay) data.updateGainDisplay();
    }

    // ---------------------------------------------------------------- keyboard
    function keyboardHandler(e) {
        const target = (e.composedPath && e.composedPath()[0]) || e.target;
        const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
        if (isInput) return;

        const video = activeVideo;
        if (!video) return;
        const data = videoData.get(video);
        if (!data) return;

        const key = e.key;
        let handled = false;
        const prevSpeed = data.currentSpeed;

        if (key === 'ArrowUp' || key === 'd' || key === 'D' || key === '+') {
            data.currentSpeed = Math.min(4.0, +(data.currentSpeed + 0.1).toFixed(1));
            handled = true;
        } else if (key === 'ArrowDown' || key === 's' || key === 'S' || key === '-') {
            data.currentSpeed = Math.max(0.1, +(data.currentSpeed - 0.1).toFixed(1));
            handled = true;
        } else if (key === '1' || key === 'r' || key === 'R') {
            if (Math.abs(data.currentSpeed - 1.0) < 0.0001) {
                data.currentSpeed = data.defaultSpeed;
            } else {
                data.currentSpeed = 1.0;
            }
            data.currentSpeed = +data.currentSpeed.toFixed(1);
            handled = true;
        }

        if (handled) {
            try { video.playbackRate = data.currentSpeed; } catch (err) {}
            updateDisplayFor(data);
            persistSpeed(data.currentSpeed);
            output_console(`[${us_name}] Playback speed changed (keyboard): x${prevSpeed.toFixed(1)} → x${data.currentSpeed.toFixed(1)}`);
            showUIFor(data);
            hideUIFor(data);
            e.preventDefault();
        }
    }

    function ensureKeyboardHandlerRegistered() {
        if (!keyboardHandlerRegistered) {
            document.addEventListener('keydown', keyboardHandler);
            keyboardHandlerRegistered = true;
        }
    }

    // ---------------------------------------------------------------- setup
    function findAndSetupVideos() {
        const allVideos = Array.from(document.querySelectorAll('video'));
        if (allVideos.length === 0) return;

        if (allVideos.length >= 2) {
            output_console(`[${us_name}] Multiple video elements detected (${allVideos.length})`);
        }

        allVideos.forEach(v => {
            if (!videoData.has(v)) setupControllerForVideo(v);
        });
    }

    function setupControllerForVideo(video) {
        const initialSpeed = persistedSpeed;
        output_console(`[${us_name}] Setting up controller for video`, video);

        const initialVolume = Number.isFinite(video.volume) ? clampVolume(video.volume) : 1.0;

        const data = {
            video,
            parent: null,
            currentSpeed: (typeof video.playbackRate === 'number' ? (video.playbackRate || initialSpeed) : initialSpeed),
            defaultSpeed: initialSpeed,
            currentGain: 1.0,
            currentVolume: initialVolume,
            gainNode: null,
            audioFailed: false,
            container: null,
            hideTimer: null,
            hovering: false,
            dragging: false,
            visible: false,
            videoHover: false,
            handlers: {},
            webAudioTimer: null
        };
        videoData.set(video, data);

        createSpeedController(video, data);

        try { video.playbackRate = data.currentSpeed; } catch (e) {
            output_console(`[${us_name}] Failed to set initial playbackRate`, e);
        }

        const scheduleAudioConnection = () => {
            if (data.webAudioTimer) clearTimeout(data.webAudioTimer);
            if (data.audioFailed) return;

            data.webAudioTimer = setTimeout(() => {
                data.webAudioTimer = null;
                if (!data.audioFailed) {
                    connectAudio(video, data);
                }
                if (data.audioFailed) {
                    // Preserve the last native volume
                    try { video.volume = clampVolume(data.currentVolume); } catch (e) {}
                } else if (data.gainNode) {
                    try { data.gainNode.gain.value = data.currentGain; } catch (e) {}
                }
            }, WEB_AUDIO_DELAY_MS);
        };

        const onPlay = () => {
            activeVideo = video;
            try { video.playbackRate = data.currentSpeed; } catch (e) {}
            resumeAudioContext();
            output_console(`[${us_name}] Video playback started`);
            scheduleAudioConnection();
        };
        video.addEventListener('play', onPlay, { passive: true });
        data.handlers.onPlay = onPlay;

        const onRateChange = () => {
            const prev = data.currentSpeed;
            data.currentSpeed = +(video.playbackRate || data.currentSpeed).toFixed(1);
            updateDisplayFor(data);
            persistSpeed(data.currentSpeed);
            output_console(`[${us_name}] Playback speed changed: x${prev.toFixed(1)} → x${data.currentSpeed.toFixed(1)} (ratechange)`);
        };
        video.addEventListener('ratechange', onRateChange, { passive: true });
        data.handlers.onRateChange = onRateChange;

        const onEnded = () => { output_console(`[${us_name}] Video ended`); };
        video.addEventListener('ended', onEnded, { passive: true });
        data.handlers.onEnded = onEnded;

        const onPause = () => { output_console(`[${us_name}] Video paused`); };
        video.addEventListener('pause', onPause, { passive: true });
        data.handlers.onPause = onPause;

        ensureKeyboardHandlerRegistered();
        output_console(`[${us_name}] Controller setup complete for one video`);
    }

    function createSpeedController(video, data) {
        output_console(`[${us_name}] Creating UI controller...`);
        const parent = video.parentElement || document.body;
        data.parent = parent;

        try {
            const parentStyle = window.getComputedStyle(parent);
            if (parent !== document.body && parentStyle && parentStyle.position === 'static') {
                parent.style.position = 'relative';
            }
        } catch (e) {}

        const host = document.createElement('div');
        host.classList.add(us_name);
        host.setAttribute(`${us_name}-data-controller`, String(Date.now()) + Math.random().toString(36).slice(2));
        function setImp(el, prop, value) { el.style.setProperty(prop, value, 'important'); }
        [
            ['position', 'absolute'], ['display', 'block'], ['box-sizing', 'border-box'],
            ['width', 'auto'], ['height', 'auto'], ['min-width', '0'], ['min-height', '0'],
            ['max-width', 'none'], ['max-height', 'none'], ['inset', 'auto'],
            ['margin', '0'], ['padding', '0'], ['border', '0'], ['background', 'transparent'],
            ['box-shadow', 'none'], ['transform', 'none'], ['flex', 'none'], ['float', 'none'],
            ['overflow', 'visible'], ['z-index', '2147483000'], ['line-height', 'normal'],
            ['font-size', '13px'], ['font-family', 'Arial, sans-serif'], ['color', '#fff'],
            ['opacity', '0'], ['pointer-events', 'none'], ['transition', 'opacity 0.35s ease-in-out'],
            ['user-select', 'none'], ['touch-action', 'none'], ['visibility', 'visible']
        ].forEach(([k, v]) => setImp(host, k, v));
        host.draggable = false;

        const shadow = host.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = `
            :host { all: initial; }
            * { box-sizing: border-box; }
            button { font: inherit; }
        `;
        shadow.appendChild(style);

        const container = document.createElement('div');
        container.setAttribute('role', 'region');
        container.setAttribute('aria-label', 'Playback speed and volume controller');
        container.style.position = 'relative';
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.72)';
        container.style.color = '#fff';
        container.style.padding = '12px 5px 10px 5px';
        container.style.borderRadius = '8px';
        container.style.fontFamily = 'Arial, sans-serif';
        container.style.fontSize = '12px';
        container.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        container.style.userSelect = 'none';
        container.style.boxSizing = 'border-box';
        container.style.minWidth = '140px';
        container.style.width = 'max-content';
        shadow.appendChild(container);

        ['click', 'mousedown', 'mouseup', 'mousemove', 'dblclick',
         'pointerdown', 'pointerup', 'pointermove', 'pointercancel',
         'touchstart', 'touchend', 'touchmove', 'touchcancel',
         'keydown', 'keyup', 'keypress', 'wheel', 'contextmenu'].forEach(eventType => {
            container.addEventListener(eventType, (e) => { e.stopPropagation(); });
        });
        container.draggable = false;
        ['dragstart', 'selectstart'].forEach(eventType => {
            container.addEventListener(eventType, (e) => { e.preventDefault(); e.stopPropagation(); });
        });

        function showUI() {
            if (data.hideTimer) { clearTimeout(data.hideTimer); data.hideTimer = null; }
            data.visible = true;
            setImp(host, 'opacity', '1');
            setImp(host, 'pointer-events', 'auto');
        }
        function hideUI(delay = HIDE_DELAY_MS) {
            if (data.hideTimer) { clearTimeout(data.hideTimer); data.hideTimer = null; }
            if (data.hovering || data.dragging) return;
            data.hideTimer = setTimeout(() => {
                data.hideTimer = null;
                if (data.hovering || data.dragging) return;
                data.visible = false;
                setImp(host, 'opacity', '0');
                setImp(host, 'pointer-events', 'none');
            }, delay);
        }
        function revealUI() {
            if (data.visible) return;
            showUI();
            hideUI();
        }
        data.showUI = showUI;
        data.hideUI = hideUI;
        data.revealUI = revealUI;

        function createSquareBtn(cssPosition, targetPosKey) {
            const btn = document.createElement('button');
            btn.className = `${us_name}-pos-btn`;
            btn.setAttribute('aria-label', `Move controller to ${targetPosKey}`);
            btn.style.position = 'absolute';
            btn.style.cssText += cssPosition;
            btn.style.width = '5px';
            btn.style.height = '5px';
            btn.style.backgroundColor = 'rgba(255,255,255,0.35)';
            btn.style.border = 'none';
            btn.style.borderRadius = '1px';
            btn.style.cursor = 'pointer';
            btn.style.padding = '0';
            btn.style.zIndex = '10001';
            btn.addEventListener('mouseover', () => { btn.style.backgroundColor = 'rgba(255,255,255,0.9)'; });
            btn.addEventListener('mouseout', () => { btn.style.backgroundColor = 'rgba(255,255,255,0.35)'; });
            btn.addEventListener('click', (e) => { e.stopPropagation(); applyPosition(targetPosKey); });
            return btn;
        }

        function updateCornerButtons(currentKey) {
            container.querySelectorAll(`.${us_name}-pos-btn`).forEach(el => el.remove());
            const corners = [
                { key: 'top-left',     css: 'top: 3px; left: 3px;' },
                { key: 'top-right',    css: 'top: 3px; right: 3px;' },
                { key: 'bottom-left',  css: 'bottom: 3px; left: 3px;' },
                { key: 'bottom-right', css: 'bottom: 3px; right: 3px;' }
            ];
            corners.forEach(corner => {
                if (corner.key !== currentKey) container.appendChild(createSquareBtn(corner.css, corner.key));
            });
        }

        function applyPosition(posKey) {
            requestAnimationFrame(() => {
                const hostHeight = host.offsetHeight || host.getBoundingClientRect().height || 48;
                const videoRect = video.getBoundingClientRect();
                const videoHeight = (video.clientHeight && video.clientHeight > 0) ? video.clientHeight : (videoRect.height || 0);
                const parentRect = parent.getBoundingClientRect();

                setImp(host, 'top', 'auto');
                setImp(host, 'bottom', 'auto');
                setImp(host, 'left', 'auto');
                setImp(host, 'right', 'auto');

                const refHeight = videoHeight || parentRect.height || 0;
                const bottomTop = `${Math.max(3, Math.round(refHeight - hostHeight - 6))}px`;
                switch (posKey) {
                    case 'top-left':     setImp(host, 'top', '3px');     setImp(host, 'left', '3px');  break;
                    case 'top-right':    setImp(host, 'top', '3px');     setImp(host, 'right', '3px'); break;
                    case 'bottom-left':  setImp(host, 'top', bottomTop); setImp(host, 'left', '3px');  break;
                    case 'bottom-right': setImp(host, 'top', bottomTop); setImp(host, 'right', '3px'); break;
                }
                updateCornerButtons(posKey);
                output_console(`[${us_name}] Position changed to: ${posKey} (hostH=${hostHeight}, videoH=${videoHeight})`);
            });
        }

        const speedDisplay = document.createElement('div');
        speedDisplay.style.textAlign = 'center';
        speedDisplay.style.fontSize = '13px';
        speedDisplay.style.fontWeight = '700';
        speedDisplay.style.marginBottom = '10px';
        speedDisplay.textContent = `Speed: x${data.currentSpeed.toFixed(1)}`;

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '6px';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.margin = '0 4px';

        function makeActionButton(text, bgColor, ariaLabel, onClick) {
            const btn = document.createElement('button');
            btn.textContent = text;
            btn.setAttribute('aria-label', ariaLabel);
            btn.style.display = 'inline-flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
            btn.style.lineHeight = '2';
            btn.style.boxSizing = 'border-box';
            btn.style.padding = '4px 6px';
            btn.style.color = '#fff';
            btn.style.border = 'none';
            btn.style.borderRadius = '6px';
            btn.style.cursor = 'pointer';
            btn.style.fontSize = '13px';
            btn.style.minWidth = '56px';
            btn.style.backgroundColor = bgColor;
            btn.addEventListener('click', (e) => { e.stopPropagation(); onClick(e); });
            btn.addEventListener('mouseover', () => { btn.style.filter = 'brightness(1.05)'; });
            btn.addEventListener('mouseout', () => { btn.style.filter = 'none'; });
            return btn;
        }

        function changeSpeed(delta) {
            const prev = data.currentSpeed;
            data.currentSpeed = Math.max(0.1, Math.min(4.0, +(data.currentSpeed + delta).toFixed(1)));
            try { video.playbackRate = data.currentSpeed; } catch (err) {}
            updateDisplayFor(data);
            persistSpeed(data.currentSpeed);
            output_console(`[${us_name}] Playback speed changed: x${prev.toFixed(1)} → x${data.currentSpeed.toFixed(1)}`);
            showUIFor(data);
            hideUIFor(data);
        }

        buttonContainer.appendChild(makeActionButton('-0.1', '#ff6b6b', 'Decrease speed by 0.1', () => changeSpeed(-0.1)));
        buttonContainer.appendChild(makeActionButton('+0.1', '#51cf66', 'Increase speed by 0.1', () => changeSpeed(+0.1)));

        container.appendChild(speedDisplay);
        container.appendChild(buttonContainer);

        const gainContainer = document.createElement('div');
        gainContainer.style.marginTop = '8px';
        gainContainer.style.paddingTop = '6px';
        gainContainer.style.borderTop = '1px solid rgba(255,255,255,0.2)';

        const gainLabel = document.createElement('div');
        gainLabel.style.textAlign = 'center';
        gainLabel.style.fontSize = '10px';
        gainLabel.style.marginBottom = '10px';
        gainLabel.style.opacity = '0.9';
        gainLabel.style.cursor = 'pointer';
        gainLabel.title = 'Click to reset to x1.00';

        const range = document.createElement('input');
        range.type = 'range';
        range.setAttribute('min', '0');
        range.setAttribute('max', String(GAIN_SLIDER_STEPS));
        range.setAttribute('step', '1');
        range.setAttribute('value', String(gainToSlider(data.currentGain)));
        range.value = String(gainToSlider(data.currentGain));
        if (parseInt(range.value, 10) !== gainToSlider(data.currentGain)) {
            output_console(`[${us_name}] WARNING: range value was sanitized (${range.value} != ${gainToSlider(data.currentGain)})`);
        }
        range.setAttribute('aria-label', `Gain (x${GAIN_MIN.toFixed(2)} - x${GAIN_MAX.toFixed(2)})`);
        range.style.display = 'block';
        range.style.width = '120px';
        range.style.margin = '0 auto';
        range.style.height = '4px';
        range.style.cursor = 'pointer';
        range.style.accentColor = '#4dabf7';
        range.style.touchAction = 'none';
        range.draggable = false;

        function syncSliderRangeForMode() {
            if (data.audioFailed) {
                range.min = '0';
                range.max = String(VOLUME_SLIDER_STEPS);
                range.step = '1';
                const s = String(volumeToSlider(data.currentVolume));
                if (range.value !== s) range.value = s;
                range.setAttribute('aria-label', 'Volume (x0.00 - x1.00)');
                return;
            }

            range.min = '0';
            range.max = String(GAIN_SLIDER_STEPS);
            range.step = '1';
            const s = String(gainToSlider(data.currentGain));
            if (range.value !== s) range.value = s;
            range.setAttribute('aria-label', `Gain (x${GAIN_MIN.toFixed(2)} - x${GAIN_MAX.toFixed(2)})`);
        }

        function updateGainDisplay() {
            if (data.audioFailed) {
                gainLabel.textContent = `Volume: x${data.currentVolume.toFixed(2)}`;
                gainLabel.title = 'Web Audio is already in use by another script; adjusting video.volume instead (x0.00 - x1.00)';
            } else {
                gainLabel.textContent = `Gain: x${data.currentGain.toFixed(2)}`;
                gainLabel.title = 'Click to reset to x1.00';
            }
            syncSliderRangeForMode();
        }
        data.updateGainDisplay = updateGainDisplay;

        function onSliderValue(v) {
            activeVideo = video;

            if (data.audioFailed) {
                applyGain(data, sliderToVolume(v));
            } else {
                connectAudio(video, data);
                if (data.audioFailed) {
                    applyGain(data, sliderToVolume(v));
                } else {
                    applyGain(data, sliderToGain(v));
                }
            }

            output_console(`[${us_name}] ${data.audioFailed ? 'Volume' : 'Gain'}: x${data.currentVolume.toFixed(2)}`);
            showUIFor(data);
            hideUIFor(data);
        }

        range.addEventListener('input', (e) => { onSliderValue(parseFloat(e.target.value)); });

        const THUMB_HALF = 8;
        function sliderValueFromPointer(e) {
            const r = range.getBoundingClientRect();
            const max = Number(range.max) || VOLUME_SLIDER_STEPS;
            const usable = Math.max(1, r.width - THUMB_HALF * 2);
            const ratio = Math.min(1, Math.max(0, (e.clientX - r.left - THUMB_HALF) / usable));
            return Math.round(ratio * max);
        }

        function setFromPointer(e) {
            const max = Number(range.max) || VOLUME_SLIDER_STEPS;
            const v = sliderValueFromPointer(e);
            const clamped = Math.max(0, Math.min(max, v));
            if (String(clamped) !== range.value) range.value = String(clamped);
            onSliderValue(clamped);
        }
        range.addEventListener('pointerdown', (e) => {
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            e.preventDefault();
            e.stopPropagation();
            data.dragging = true;
            try { range.setPointerCapture(e.pointerId); } catch (err) {}
            setFromPointer(e);
        });
        range.addEventListener('pointermove', (e) => {
            if (!data.dragging) return;
            e.preventDefault();
            e.stopPropagation();
            setFromPointer(e);
        });
        const endDrag = (e) => {
            if (!data.dragging) return;
            data.dragging = false;
            e.stopPropagation();
            try { range.releasePointerCapture(e.pointerId); } catch (err) {}
            hideUIFor(data);
        };
        range.addEventListener('pointerup', endDrag);
        range.addEventListener('pointercancel', endDrag);
        range.addEventListener('lostpointercapture', () => { if (data.dragging) { data.dragging = false; hideUIFor(data); } });

        gainLabel.addEventListener('click', (e) => {
            e.stopPropagation();
            connectAudio(video, data);
            applyGain(data, 1.0);
            output_console(`[${us_name}] ${data.audioFailed ? 'Volume' : 'Gain'} reset to x1.00`);
            showUIFor(data);
            hideUIFor(data);
        });

        gainContainer.appendChild(gainLabel);
        gainContainer.appendChild(range);
        container.appendChild(gainContainer);
        updateGainDisplay();

        parent.appendChild(host);
        data.container = host;
        controllersMap.set(host, video);
        updateGainDisplay();
        output_console(`[${us_name}] gain slider: value=${range.value} min=${range.min} max=${range.max} (gain x${data.currentGain.toFixed(2)})`);

        requestAnimationFrame(() => applyPosition('top-left'));

        container.addEventListener('mouseenter', () => { data.hovering = true; activeVideo = video; showUI(); });
        container.addEventListener('mousemove', () => { if (!data.hovering) { data.hovering = true; activeVideo = video; } showUI(); });
        container.addEventListener('mouseleave', () => { data.hovering = false; hideUI(); });

        function updateDisplay() { speedDisplay.textContent = `Speed: x${data.currentSpeed.toFixed(1)}`; }
        data.updateDisplay = updateDisplay;

        updateDisplay();
        ensureKeyboardHandlerRegistered();

        output_console(`[${us_name}] UI controller added to DOM`);
    }

    function updateDisplayFor(data) { if (data && data.updateDisplay) data.updateDisplay(); }
    function showUIFor(data) { if (data && data.showUI) data.showUI(); }
    function hideUIFor(data) { if (data && data.hideUI) data.hideUI(); }

    // ---------------------------------------------------------------- video hover tracker
    let pointerX = -1, pointerY = -1, hoverRafPending = false;

    function updateVideoHoverStates() {
        hoverRafPending = false;
        for (const video of controllersMap.values()) {
            const data = videoData.get(video);
            if (!data || !video.isConnected) continue;
            let inside = false;
            if (pointerX >= 0) {
                const r = video.getBoundingClientRect();
                inside = r.width > 1 && r.height > 1 &&
                         pointerX >= r.left && pointerX <= r.right &&
                         pointerY >= r.top && pointerY <= r.bottom;
            }
            if (inside) {
                if (!data.videoHover) { data.videoHover = true; activeVideo = video; }
                data.revealUI();
            } else if (data.videoHover) {
                data.videoHover = false;
                if (!data.hovering && !data.dragging && data.visible) data.hideUI(LEAVE_HIDE_DELAY_MS);
            }
        }
    }

    function scheduleHoverUpdate() {
        if (hoverRafPending) return;
        hoverRafPending = true;
        requestAnimationFrame(updateVideoHoverStates);
    }

    document.addEventListener('mousemove', (e) => {
        pointerX = e.clientX; pointerY = e.clientY;
        scheduleHoverUpdate();
    }, { capture: true, passive: true });

    document.addEventListener('mouseleave', () => { pointerX = -1; pointerY = -1; scheduleHoverUpdate(); }, { capture: true, passive: true });
    window.addEventListener('scroll', scheduleHoverUpdate, { capture: true, passive: true });
    window.addEventListener('resize', scheduleHoverUpdate, { passive: true });

    // ---------------------------------------------------------------- cleanup
    function cleanupVideoData(video) {
        const data = videoData.get(video);
        if (!data) return;
        output_console(`[${us_name}] Cleaning up controller for video`, video);

        if (data.hideTimer) { clearTimeout(data.hideTimer); data.hideTimer = null; }
        if (data.webAudioTimer) { clearTimeout(data.webAudioTimer); data.webAudioTimer = null; }

        try {
            if (data.container && data.container.parentElement) data.container.parentElement.removeChild(data.container);
            if (data.container) controllersMap.delete(data.container);
        } catch (e) {}

        try {
            if (data.handlers.onPlay) video.removeEventListener('play', data.handlers.onPlay);
            if (data.handlers.onRateChange) video.removeEventListener('ratechange', data.handlers.onRateChange);
            if (data.handlers.onEnded) video.removeEventListener('ended', data.handlers.onEnded);
            if (data.handlers.onPause) video.removeEventListener('pause', data.handlers.onPause);
        } catch (e) {}

        try { videoData.delete(video); } catch (e) {}
        if (activeVideo === video) activeVideo = null;
    }

    function cleanupDetachedControllers() {
        try {
            for (const [container, video] of Array.from(controllersMap.entries())) {
                if (!video || !video.isConnected) {
                    output_console(`[${us_name}] Removing controller for detached video`);
                    if (video) cleanupVideoData(video);
                    if (container && container.parentElement) container.parentElement.removeChild(container);
                    controllersMap.delete(container);
                } else if (!container.isConnected) {
                    cleanupVideoData(video);
                    controllersMap.delete(container);
                }
            }
        } catch (e) {}
    }

    window.addEventListener('beforeunload', () => {
        for (const video of Array.from(controllersMap.values())) cleanupVideoData(video);
    });

    // ---------------------------------------------------------------- observe
    const observer = new MutationObserver((mutations) => {
        let needFind = false;
        cleanupDetachedControllers();

        for (const m of mutations) {
            if (m.addedNodes && m.addedNodes.length) {
                for (const n of m.addedNodes) {
                    if (n.nodeType === 1 && (n.tagName === 'VIDEO' || (n.querySelector && n.querySelector('video')))) {
                        needFind = true;
                        break;
                    }
                }
            }
            if (needFind) break;
        }

        if (needFind || controllersMap.size < document.querySelectorAll('video').length) findAndSetupVideos();
    });

    function startObserver() {
        if (document.body) observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        output_console(`[${us_name}] Loading page... Waiting for DOMContentLoaded`);
        document.addEventListener('DOMContentLoaded', () => { output_console(`[${us_name}] DOMContentLoaded`); startObserver(); findAndSetupVideos(); });
        window.addEventListener('load', () => { output_console(`[${us_name}] load event fired`); findAndSetupVideos(); });
    } else {
        output_console(`[${us_name}] Page already loaded — searching for videos`);
        startObserver();
        findAndSetupVideos();
    }

    output_console(`[${us_name}] MutationObserver started (multiple video support)`);
})();

