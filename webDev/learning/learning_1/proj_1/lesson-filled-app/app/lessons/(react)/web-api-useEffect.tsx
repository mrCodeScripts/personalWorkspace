"use client";

import { useState, useEffect } from "react";

interface ApiResult {
  name: string;
  supported: boolean;
  value: string;
  desc: string;
}

interface ApiCategory {
  cat: string;
  items: ApiResult[];
}

export default function UseEffectMountedPatternLoadingWebAPIs() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [apiData, setApiData] = useState<ApiCategory[]>([]);

  const loadWebAPIs = async (): Promise<ApiCategory[]> => {
    const safe = (fn: () => unknown): boolean => {
      try {
        return !!fn();
      } catch {
        return false;
      }
    };
    const val = (fn: () => string, fallback = "unavailable"): string => {
      try {
        return fn();
      } catch {
        return fallback;
      }
    };

    // Simulate loading state
    await new Promise(res => setTimeout(res, 2000));

    return [
      // ─── 🎨 Graphics & Media ────────────────────────────────────────────
      {
        cat: "🎨 Graphics & Media",
        items: [
          {
            name: "Canvas API",
            supported: safe(() => document.createElement("canvas").getContext),
            value: val(() => "2D / WebGL context"),
            desc: "2D drawing & pixel manipulation",
          },
          {
            name: "WebGL",
            supported: safe(() =>
              document.createElement("canvas").getContext("webgl"),
            ),
            value: val(() => "WebGLRenderingContext"),
            desc: "3D GPU rendering",
          },
          {
            name: "WebGL2",
            supported: safe(() =>
              document.createElement("canvas").getContext("webgl2"),
            ),
            value: val(() => "WebGL2RenderingContext"),
            desc: "Upgraded 3D GPU API",
          },
          {
            name: "WebGPU",
            supported: "gpu" in navigator,
            value: val(() => typeof (navigator as any).gpu),
            desc: "Next-gen GPU compute",
          },
          {
            name: "Web Animations API",
            supported: safe(() => "animate" in document.createElement("div")),
            value: val(() => "Element.animate()"),
            desc: "JS-driven animations",
          },
          {
            name: "OffscreenCanvas",
            supported: "OffscreenCanvas" in window,
            value: val(() => "OffscreenCanvas"),
            desc: "Canvas on worker threads",
          },
          {
            name: "CSS Paint API (Houdini)",
            supported: "paintWorklet" in CSS,
            value: val(() => "CSS.paintWorklet"),
            desc: "Custom CSS paint worklets",
          },
        ],
      },

      // ─── 🎵 Audio & Video ────────────────────────────────────────────────
      {
        cat: "🎵 Audio & Video",
        items: [
          {
            name: "Web Audio API",
            supported:
              "AudioContext" in window || "webkitAudioContext" in window,
            value: val(() => "AudioContext"),
            desc: "Synthesis, analysis, effects",
          },
          {
            name: "MediaStream API",
            supported:
              "mediaDevices" in navigator &&
              "getUserMedia" in navigator.mediaDevices,
            value: val(() => "navigator.mediaDevices"),
            desc: "Camera & mic access",
          },
          {
            name: "MediaRecorder",
            supported: "MediaRecorder" in window,
            value: val(() => "MediaRecorder"),
            desc: "Record audio/video streams",
          },
          {
            name: "HTMLMediaElement",
            supported: "HTMLVideoElement" in window,
            value: val(() => "HTMLVideoElement"),
            desc: "<video> & <audio> control",
          },
          {
            name: "Web Speech API",
            supported:
              "SpeechRecognition" in window ||
              "webkitSpeechRecognition" in window,
            value: val(() => "SpeechRecognition"),
            desc: "Speech recognition & synthesis",
          },
          {
            name: "Screen Capture API",
            supported: "getDisplayMedia" in (navigator.mediaDevices ?? {}),
            value: val(() => "getDisplayMedia()"),
            desc: "Capture screen / tab / window",
          },
          {
            name: "SpeechSynthesis",
            supported: "speechSynthesis" in window,
            value: val(
              () =>
                `${window.speechSynthesis?.getVoices?.()?.length ?? "?"} voices`,
            ),
            desc: "Text-to-speech output",
          },
        ],
      },

      // ─── 🌐 Networking ───────────────────────────────────────────────────
      {
        cat: "🌐 Networking",
        items: [
          {
            name: "Fetch API",
            supported: "fetch" in window,
            value: val(() => "window.fetch"),
            desc: "HTTP requests",
          },
          {
            name: "XMLHttpRequest",
            supported: "XMLHttpRequest" in window,
            value: val(() => "XMLHttpRequest"),
            desc: "Legacy HTTP requests",
          },
          {
            name: "WebSockets",
            supported: "WebSocket" in window,
            value: val(() => "WebSocket"),
            desc: "Real-time bidirectional comms",
          },
          {
            name: "WebRTC",
            supported: "RTCPeerConnection" in window,
            value: val(() => "RTCPeerConnection"),
            desc: "Peer-to-peer audio / video / data",
          },
          {
            name: "Server-Sent Events",
            supported: "EventSource" in window,
            value: val(() => "EventSource"),
            desc: "Server push events",
          },
          {
            name: "Beacon API",
            supported: "sendBeacon" in navigator,
            value: val(() => "navigator.sendBeacon"),
            desc: "Fire-and-forget POST",
          },
          {
            name: "Background Fetch API",
            supported: "BackgroundFetchManager" in window,
            value: val(() => "BackgroundFetchManager"),
            desc: "Large downloads in background",
          },
        ],
      },

      // ─── 💾 Storage ──────────────────────────────────────────────────────
      {
        cat: "💾 Storage",
        items: [
          {
            name: "localStorage",
            supported: safe(() => window.localStorage),
            value: val(() => `${Object.keys(localStorage).length} keys`),
            desc: "Persistent key-value storage",
          },
          {
            name: "sessionStorage",
            supported: safe(() => window.sessionStorage),
            value: val(() => `${Object.keys(sessionStorage).length} keys`),
            desc: "Session-scoped storage",
          },
          {
            name: "IndexedDB",
            supported: "indexedDB" in window,
            value: val(() => "IDBFactory"),
            desc: "Full client-side database",
          },
          {
            name: "Cache API",
            supported: "caches" in window,
            value: val(() => "CacheStorage"),
            desc: "Request / response caching",
          },
          {
            name: "Cookie Store API",
            supported: "cookieStore" in window,
            value: val(() => "CookieStore"),
            desc: "Async cookie access",
          },
          {
            name: "File System Access API",
            supported: "showOpenFilePicker" in window,
            value: val(() => "showOpenFilePicker()"),
            desc: "Read / write local files",
          },
          {
            name: "OPFS",
            supported:
              "storage" in navigator && "getDirectory" in navigator.storage,
            value: val(() => "navigator.storage.getDirectory()"),
            desc: "Origin private file system",
          },
        ],
      },

      // ─── 📍 Device & Sensors ─────────────────────────────────────────────
      {
        cat: "📍 Device & Sensors",
        items: [
          {
            name: "Geolocation API",
            supported: "geolocation" in navigator,
            value: val(() => "navigator.geolocation"),
            desc: "GPS coordinates",
          },
          {
            name: "DeviceOrientation API",
            supported: "DeviceOrientationEvent" in window,
            value: val(() => "DeviceOrientationEvent"),
            desc: "Gyroscope / accelerometer",
          },
          {
            name: "Battery Status API",
            supported: "getBattery" in navigator,
            value: val(() => "navigator.getBattery()"),
            desc: "Battery level & charging state",
          },
          {
            name: "Vibration API",
            supported: "vibrate" in navigator,
            value: val(() => "navigator.vibrate()"),
            desc: "Device haptics",
          },
          {
            name: "Gamepad API",
            supported: "getGamepads" in navigator,
            value: val(
              () =>
                `${(navigator as any).getGamepads?.()?.length ?? 0} pads connected`,
            ),
            desc: "Controller input",
          },
          {
            name: "Pointer Lock API",
            supported: "pointerLockElement" in document,
            value: val(() => "document.pointerLockElement"),
            desc: "Mouse capture for games",
          },
          {
            name: "Ambient Light Sensor",
            supported: "AmbientLightSensor" in window,
            value: val(() => "AmbientLightSensor"),
            desc: "Light level detection",
          },
        ],
      },

      // ─── 🧠 Compute & Workers ────────────────────────────────────────────
      {
        cat: "🧠 Compute & Workers",
        items: [
          {
            name: "Web Workers",
            supported: "Worker" in window,
            value: val(() => "Worker"),
            desc: "Background threads",
          },
          {
            name: "Service Workers",
            supported: "serviceWorker" in navigator,
            value: val(() => "navigator.serviceWorker"),
            desc: "Offline proxy + push notifications",
          },
          {
            name: "Shared Workers",
            supported: "SharedWorker" in window,
            value: val(() => "SharedWorker"),
            desc: "Workers shared across tabs",
          },
          {
            name: "WebAssembly",
            supported: "WebAssembly" in window,
            value: val(() => "WebAssembly"),
            desc: "Run compiled binaries in browser",
          },
          {
            name: "requestAnimationFrame",
            supported: "requestAnimationFrame" in window,
            value: val(() => "rAF"),
            desc: "Sync with display refresh rate",
          },
          {
            name: "requestIdleCallback",
            supported: "requestIdleCallback" in window,
            value: val(() => "rIC"),
            desc: "Run tasks during idle time",
          },
          {
            name: "Performance API",
            supported: "performance" in window,
            value: val(() => `${performance.now().toFixed(1)} ms uptime`),
            desc: "Timing & performance metrics",
          },
        ],
      },

      // ─── 🖱️ UI & Interaction ─────────────────────────────────────────────
      {
        cat: "🖱️ UI & Interaction",
        items: [
          {
            name: "Drag and Drop API",
            supported: safe(
              () => "ondragstart" in document.createElement("div"),
            ),
            value: val(() => "ondragstart / ondrop"),
            desc: "Native drag interactions",
          },
          {
            name: "Clipboard API",
            supported: "clipboard" in navigator,
            value: val(() => "navigator.clipboard"),
            desc: "Read / write clipboard",
          },
          {
            name: "Selection API",
            supported: "getSelection" in window,
            value: val(() => "window.getSelection()"),
            desc: "Text selection control",
          },
          {
            name: "Pointer Events",
            supported: "PointerEvent" in window,
            value: val(() => "PointerEvent"),
            desc: "Unified mouse / touch / pen input",
          },
          {
            name: "Touch Events",
            supported: "ontouchstart" in window,
            value: val(() => "TouchEvent"),
            desc: "Mobile touch gestures",
          },
          {
            name: "ResizeObserver",
            supported: "ResizeObserver" in window,
            value: val(() => "ResizeObserver"),
            desc: "Watch element size changes",
          },
          {
            name: "IntersectionObserver",
            supported: "IntersectionObserver" in window,
            value: val(() => "IntersectionObserver"),
            desc: "Detect element visibility",
          },
          {
            name: "MutationObserver",
            supported: "MutationObserver" in window,
            value: val(() => "MutationObserver"),
            desc: "Watch DOM changes",
          },
        ],
      },

      // ─── 🔔 Notifications & Background ───────────────────────────────────
      {
        cat: "🔔 Notifications & Background",
        items: [
          {
            name: "Notifications API",
            supported: "Notification" in window,
            value: val(() => `permission: ${Notification.permission}`),
            desc: "Desktop push notifications",
          },
          {
            name: "Push API",
            supported: "PushManager" in window,
            value: val(() => "PushManager"),
            desc: "Background push via service worker",
          },
          {
            name: "Background Sync",
            supported: "SyncManager" in window,
            value: val(() => "SyncManager"),
            desc: "Defer tasks until online",
          },
          {
            name: "Page Visibility API",
            supported: "visibilityState" in document,
            value: val(() => document.visibilityState),
            desc: "Detect tab focus / visibility",
          },
          {
            name: "Broadcast Channel",
            supported: "BroadcastChannel" in window,
            value: val(() => "BroadcastChannel"),
            desc: "Cross-tab messaging",
          },
        ],
      },

      // ─── 🔐 Security & Identity ───────────────────────────────────────────
      {
        cat: "🔐 Security & Identity",
        items: [
          {
            name: "Web Crypto API",
            supported: "crypto" in window && "subtle" in crypto,
            value: val(() => "crypto.subtle"),
            desc: "Encryption, hashing, signing",
          },
          {
            name: "Credential Management",
            supported: "credentials" in navigator,
            value: val(() => "navigator.credentials"),
            desc: "Save / retrieve credentials",
          },
          {
            name: "WebAuthn / FIDO2",
            supported: "PublicKeyCredential" in window,
            value: val(() => "PublicKeyCredential"),
            desc: "Passwordless auth (fingerprint, key)",
          },
          {
            name: "Permissions API",
            supported: "permissions" in navigator,
            value: val(() => "navigator.permissions"),
            desc: "Query / request device permissions",
          },
          {
            name: "Trusted Types API",
            supported: "trustedTypes" in window,
            value: val(() => "trustedTypes"),
            desc: "DOM injection XSS protection",
          },
        ],
      },

      // ─── 🗂️ DOM & Document ────────────────────────────────────────────────
      {
        cat: "🗂️ DOM & Document",
        items: [
          {
            name: "History API",
            supported: "pushState" in history,
            value: val(() => `depth: ${history.length}`),
            desc: "Browser navigation control",
          },
          {
            name: "URL API",
            supported: "URL" in window,
            value: val(() => new URL(location.href).hostname),
            desc: "Parse and build URLs",
          },
          {
            name: "URLSearchParams",
            supported: "URLSearchParams" in window,
            value: val(() => "URLSearchParams"),
            desc: "Query string manipulation",
          },
          {
            name: "FormData API",
            supported: "FormData" in window,
            value: val(() => "FormData"),
            desc: "Form data serialization",
          },
          {
            name: "Encoding API",
            supported: "TextEncoder" in window,
            value: val(() => "TextEncoder / TextDecoder"),
            desc: "Encode / decode text",
          },
          {
            name: "Blob & File API",
            supported: "Blob" in window && "File" in window,
            value: val(() => "Blob / File"),
            desc: "Binary data handling",
          },
          {
            name: "Streams API",
            supported: "ReadableStream" in window,
            value: val(() => "ReadableStream / WritableStream"),
            desc: "Readable / Writable / Transform streams",
          },
          {
            name: "AbortController",
            supported: "AbortController" in window,
            value: val(() => "AbortController"),
            desc: "Cancel async operations",
          },
          {
            name: "structuredClone",
            supported: "structuredClone" in window,
            value: val(() => "structuredClone()"),
            desc: "Deep clone any object",
          },
        ],
      },

      // ─── 🖥️ Window & Display ─────────────────────────────────────────────
      {
        cat: "🖥️ Window & Display",
        items: [
          {
            name: "Fullscreen API",
            supported: safe(
              () => "requestFullscreen" in document.createElement("div"),
            ),
            value: val(() =>
              document.fullscreenEnabled ? "enabled" : "disabled",
            ),
            desc: "Go fullscreen programmatically",
          },
          {
            name: "Screen Orientation API",
            supported: "orientation" in screen,
            value: val(() => screen.orientation?.type ?? "unknown"),
            desc: "Lock / detect screen orientation",
          },
          {
            name: "Visual Viewport API",
            supported: "visualViewport" in window,
            value: val(
              () =>
                `${visualViewport?.width?.toFixed(0)}×${visualViewport?.height?.toFixed(0)} px`,
            ),
            desc: "Virtual keyboard & zoom info",
          },
          {
            name: "Picture-in-Picture API",
            supported: "pictureInPictureEnabled" in document,
            value: val(() =>
              document.pictureInPictureEnabled ? "enabled" : "disabled",
            ),
            desc: "Floating video window",
          },
          {
            name: "Window Management API",
            supported: "getScreenDetails" in window,
            value: val(() => "getScreenDetails()"),
            desc: "Multi-screen window placement",
          },
          {
            name: "Screen API",
            supported: "screen" in window,
            value: val(() => `${screen.width}×${screen.height}`),
            desc: "Screen dimensions & color depth",
          },
        ],
      },
    ];
  };

  useEffect(() => {
    loadWebAPIs().then((data) => {
      setApiData(data);
      setMounted(true);
    });
  }, []);

  if (!mounted)
    return (
      <>
        <p>Loading Browser APIs…</p>
      </>
    );

  return (
    <>
      {apiData.map((category) => (
        <section key={category.cat}>
          <h2>{category.cat}</h2>
          {category.items.map((api) => (
            <div key={api.name}>
              <span>{api.supported ? "✅" : "❌"}</span>
              <strong>{api.name}</strong> — {api.desc}
              <code>{api.value}</code>
            </div>
          ))}
        </section>
      ))}
    </>
  );
}
