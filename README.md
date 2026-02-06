# LLM Output Sanitizer

A zero-install **bookmarklet** for cleaning LLM-generated text. ~before pretending that the AI generated text is something that you created by yourself~.

LLMs often produce text that looks correct but contains smart punctuation, invisible Unicode, emoji joiners, and typographic symbols that break copy/paste workflows. This tool normalizes that output into predictable ASCII in a single click.

<img width="817" height="644" alt="image" src="https://github.com/user-attachments/assets/89b0a036-c853-4150-a714-43f5c1f5361b" />

---

## Why a Bookmarklet

A bookmarklet is a small piece of JavaScript saved as a browser bookmark (or pasted directly into the address bar). When clicked or run, it executes on the current page.

Bookmarklets are ideal for cleaning LLM output because:
- LLMs are typically used in the browser
- Text needs to be cleaned *before* pasting elsewhere
- No installs, extensions, or permissions are required
- The tool runs locally and leaves no footprint

Click, paste, copy, done.

---

## Installation

No build step is required.

### Option 1: Install as a bookmark

1. Open your browser's bookmark manager
2. Create a new bookmark
3. Name it something like:  
   **LLM Output Sanitizer**
4. Set the bookmark's **URL** to the full bookmarklet code from here [bookmarklet.js](bookmarklet.js)

```
javascript:(function () { ... })();
```

Save the bookmark.

<img width="497" height="277" alt="image" src="https://github.com/user-attachments/assets/4df47641-bcba-44a9-bf17-e0eb5443ea9d" />

---

### Option 2: Run from the address bar

You can also run the bookmarklet directly:

1. Copy the full bookmarklet code
2. Paste it into the browser's address bar
3. Press Enter

(Some browsers require typing `javascript:` manually before pasting.)

---

## Usage

1. Open ChatGPT, Claude, Gemini, or any LLM web UI
2. Run the **LLM Output Sanitizer** bookmarklet
3. A modal will appear
4. Paste the LLM output into the input field  
   - Clipboard text may auto-load if supported
5. Optionally enable **Keep allowed emojis**
6. Copy the cleaned ASCII output

Press **Esc** or click outside the modal to close it.

---

## What This Tool Does

- Converts typographic Unicode to ASCII equivalents
- Removes zero-width and invisible characters
- Normalizes quotes, dashes, arrows, bullets, math symbols, and currency symbols
- Optionally preserves a small, explicit emoji allowlist
- Produces predictable, paste-safe text

---

## Privacy & Safety

- Runs entirely in your browser
- No network requests
- No tracking
- No access to page content unless you paste it

---

## Browser Support

Works in all modern browsers that support:
- Bookmarklets
- Shadow DOM
- `String.prototype.codePointAt`

Tested primarily in Firefox.

---

## License

MIT License.

---

## Why This Exists

Because AI-generated text is unmistakeably obvious from all it's non-standard characters that it insists on using.
