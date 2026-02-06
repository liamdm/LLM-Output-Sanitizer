javascript:(function () {
    var HOST_ID = "riftASCIICleaner";

    function destroyExistingUI() {
        var old = document.getElementById(HOST_ID);
        if (old) old.remove();
    }

    destroyExistingUI();

    function codepointString(s) {
        var out = [];
        for (var i = 0; i < s.length; i++) {
            var cp = s.codePointAt(i);
            out.push("U+" + cp.toString(16).toUpperCase());
            if (cp > 0xFFFF) i++;
        }
        return out.join("+");
    }

    var ALLOW = [
        "\n", "\t", " ",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+",
        ",", "-", ".", "/", ":", ";", "<", "=", ">", "?",
        "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"
    ];

    var ALLOW_SET = Object.create(null);
    for (var i = 0; i < ALLOW.length; i++) {
        ALLOW_SET[ALLOW[i]] = true;
    }

    var EMOJI_ALLOW = [
        "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊",
        "🙂", "🙃", "😐", "😑", "😶", "😍", "😘", "😗", "😙", "😚",
        "👍", "👎", "👌", "✌", "🤞", "🤟", "🤘", "👏", "🙌",
        "🔥", "💯", "❤️", "💔", "✨", "⚠️", "❗", "❓"
    ];

    var EMOJI_SET = Object.create(null);
    for (var i = 0; i < EMOJI_ALLOW.length; i++) {
        EMOJI_SET[codepointString(EMOJI_ALLOW[i])] = EMOJI_ALLOW[i];
    }

    var TABLE = [
        {"v": "‐", "c": "U+2010", "r": "-"},
        {"v": "-", "c": "U+2011", "r": "-"},
        {"v": "‒", "c": "U+2012", "r": "-"},
        {"v": "–", "c": "U+2013", "r": "-"},
        {"v": "—", "c": "U+2014", "r": "--"},
        {"v": "―", "c": "U+2015", "r": "--"},
        {"v": "−", "c": "U+2212", "r": "-"},

        {"v": "‘", "c": "U+2018", "r": "'"},
        {"v": "’", "c": "U+2019", "r": "'"},
        {"v": "‚", "c": "U+201A", "r": "'"},
        {"v": "‛", "c": "U+201B", "r": "'"},
        {"v": "“", "c": "U+201C", "r": "\""},
        {"v": "”", "c": "U+201D", "r": "\""},
        {"v": "„", "c": "U+201E", "r": "\""},
        {"v": "«", "c": "U+00AB", "r": "<<"},
        {"v": "»", "c": "U+00BB", "r": ">>"},

        {"v": "…", "c": "U+2026", "r": "..."},
        {"v": "·", "c": "U+00B7", "r": "."},
        {"v": "∙", "c": "U+2219", "r": "."},

        {"v": "•", "c": "U+2022", "r": "*"},
        {"v": "◦", "c": "U+25E6", "r": "o"},
        {"v": "●", "c": "U+25CF", "r": "o"},
        {"v": "▪", "c": "U+25AA", "r": "*"},
        {"v": "▫", "c": "U+25AB", "r": "*"},
        {"v": "✓", "c": "U+2713", "r": "v"},
        {"v": "✔", "c": "U+2714", "r": "v"},
        {"v": "✗", "c": "U+2717", "r": "x"},
        {"v": "✘", "c": "U+2718", "r": "x"},

        {"v": "←", "c": "U+2190", "r": "<-"},
        {"v": "→", "c": "U+2192", "r": "->"},
        {"v": "↑", "c": "U+2191", "r": "^"},
        {"v": "↓", "c": "U+2193", "r": "v"},
        {"v": "↔", "c": "U+2194", "r": "<->"},
        {"v": "⇐", "c": "U+21D0", "r": "<="},
        {"v": "⇒", "c": "U+21D2", "r": "=>"},
        {"v": "⇔", "c": "U+21D4", "r": "<=>"},
        {"v": "⟵", "c": "U+27F5", "r": "<-"},
        {"v": "⟶", "c": "U+27F6", "r": "->"},
        {"v": "↳", "c": "U+21B3", "r": "->"},
        {"v": "↪", "c": "U+21AA", "r": "->"},

        {"v": "≠", "c": "U+2260", "r": "!="},
        {"v": "≈", "c": "U+2248", "r": "~="},
        {"v": "≤", "c": "U+2264", "r": "<="},
        {"v": "≥", "c": "U+2265", "r": ">="},
        {"v": "±", "c": "U+00B1", "r": "+-"},
        {"v": "∞", "c": "U+221E", "r": "inf"},
        {"v": "∑", "c": "U+2211", "r": "sum"},
        {"v": "∫", "c": "U+222B", "r": "int"},
        {"v": "√", "c": "U+221A", "r": "sqrt"},
        {"v": "∝", "c": "U+221D", "r": "~"},
        {"v": "∧", "c": "U+2227", "r": "and"},
        {"v": "∨", "c": "U+2228", "r": "or"},
        {"v": "∴", "c": "U+2234", "r": "therefore"},
        {"v": "∵", "c": "U+2235", "r": "because"},

        {"v": "½", "c": "U+00BD", "r": "1/2"},
        {"v": "¼", "c": "U+00BC", "r": "1/4"},
        {"v": "¾", "c": "U+00BE", "r": "3/4"},

        {"v": "²", "c": "U+00B2", "r": "^2"},
        {"v": "³", "c": "U+00B3", "r": "^3"},
        {"v": "ⁿ", "c": "U+207F", "r": "^n"},

        {"v": "₀", "c": "U+2080", "r": "_0"},
        {"v": "₁", "c": "U+2081", "r": "_1"},
        {"v": "₂", "c": "U+2082", "r": "_2"},
        {"v": "₃", "c": "U+2083", "r": "_3"},

        {"v": "€", "c": "U+20AC", "r": "EUR"},
        {"v": "£", "c": "U+00A3", "r": "GBP"},
        {"v": "¥", "c": "U+00A5", "r": "JPY"},
        {"v": "₩", "c": "U+20A9", "r": "KRW"},
        {"v": "₹", "c": "U+20B9", "r": "INR"},
        {"v": "₿", "c": "U+20BF", "r": "BTC"},

        {"v": "\u00A0", "c": "U+00A0", "r": " "},
        {"v": "\u202F", "c": "U+202F", "r": " "},
        {"v": "\u2009", "c": "U+2009", "r": " "},
        {"v": "\u200B", "c": "U+200B", "r": ""},
        {"v": "\u200D", "c": "U+200D", "r": ""},

        {"v": "é", "c": "U+00E9", "r": "e"},
        {"v": "è", "c": "U+00E8", "r": "e"},
        {"v": "ê", "c": "U+00EA", "r": "e"},
        {"v": "ë", "c": "U+00EB", "r": "e"},
        {"v": "á", "c": "U+00E1", "r": "a"},
        {"v": "à", "c": "U+00E0", "r": "a"},
        {"v": "â", "c": "U+00E2", "r": "a"},
        {"v": "ä", "c": "U+00E4", "r": "a"},
        {"v": "ñ", "c": "U+00F1", "r": "n"},
        {"v": "ü", "c": "U+00FC", "r": "u"},
        {"v": "ö", "c": "U+00F6", "r": "o"},
        {"v": "ç", "c": "U+00E7", "r": "c"},
        {"v": "ø", "c": "U+00F8", "r": "o"},
        {"v": "å", "c": "U+00E5", "r": "a"},
        {"v": "æ", "c": "U+00E6", "r": "ae"},
        {"v": "œ", "c": "U+0153", "r": "oe"},

        {"v": "─", "c": "U+2500", "r": "-"},
        {"v": "│", "c": "U+2502", "r": "|"},
        {"v": "┌", "c": "U+250C", "r": "+"},
        {"v": "┐", "c": "U+2510", "r": "+"},
        {"v": "└", "c": "U+2514", "r": "+"},
        {"v": "┘", "c": "U+2518", "r": "+"},
        {"v": "═", "c": "U+2550", "r": "="},
        {"v": "║", "c": "U+2551", "r": "|"},
        {"v": "█", "c": "U+2588", "r": "#"},
        {"v": "░", "c": "U+2591", "r": "."},
        {"v": "▒", "c": "U+2592", "r": ":"},
        {"v": "▓", "c": "U+2593", "r": "#"},

        {"v": "§", "c": "U+00A7", "r": "section"},
        {"v": "°", "c": "U+00B0", "r": "deg"},
        {"v": "™", "c": "U+2122", "r": "TM"},
        {"v": "®", "c": "U+00AE", "r": "R"},
        {"v": "©", "c": "U+00A9", "r": "C"},
        {"v": "†", "c": "U+2020", "r": "+"},
        {"v": "‡", "c": "U+2021", "r": "++"},

        {"v": "0️⃣", "c": "U+0030+FE0F+20E3", "r": "0"},
        {"v": "1️⃣", "c": "U+0031+FE0F+20E3", "r": "1"},
        {"v": "2️⃣", "c": "U+0032+FE0F+20E3", "r": "2"},
        {"v": "3️⃣", "c": "U+0033+FE0F+20E3", "r": "3"},
        {"v": "4️⃣", "c": "U+0034+FE0F+20E3", "r": "4"},
        {"v": "5️⃣", "c": "U+0035+FE0F+20E3", "r": "5"},
        {"v": "6️⃣", "c": "U+0036+FE0F+20E3", "r": "6"},
        {"v": "7️⃣", "c": "U+0037+FE0F+20E3", "r": "7"},
        {"v": "8️⃣", "c": "U+0038+FE0F+20E3", "r": "8"},
        {"v": "9️⃣", "c": "U+0039+FE0F+20E3", "r": "9"}
];

    TABLE.sort(function (a, b) {
        return b.v.length - a.v.length;
    });

    function clean(input, keepEmojis) {
        var out = "";
        var i = 0;

        while (i < input.length) {
            var matched = false;

            for (var j = 0; j < TABLE.length; j++) {
                var entry = TABLE[j];
                var len = entry.v.length;
                var slice = input.substr(i, len);
                if (codepointString(slice) === entry.c) {
                    out += entry.r;
                    i += len;
                    matched = true;
                    break;
                }
            }

            if (matched) continue;

            var cp = input.codePointAt(i);
            var ch = String.fromCodePoint(cp);
            var cps = codepointString(ch);

            if (ALLOW_SET[ch]) {
                out += ch;
            } else if (keepEmojis && EMOJI_SET[cps]) {
                out += EMOJI_SET[cps];
            }

            i += cp > 0xFFFF ? 2 : 1;
        }

        return out;
    }

    var host = document.createElement("div");
    host.id = HOST_ID;
    host.style.position = "fixed";
    host.style.inset = "0";
    host.style.zIndex = "2147483647";

    var shadow = host.attachShadow({mode: "open"});

    shadow.innerHTML = `
<style>
    :host, :host * {
        box-sizing: border-box;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        color: #111111;
    }

    .backdrop {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal {
        background-color: #ffffff;
        width: 420px;
        max-width: calc(100vw - 32px);
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        overflow: hidden;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background-color: #f3f4f6;
        border-bottom: 1px solid #d1d5db;
        font-weight: 600;
    }

    .header-actions {
        display: flex;
        gap: 8px;
    }

    .btn {
        all: unset;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 12px;
        background-color: #e5e7eb;
    }

    .btn:hover {
        background-color: #d1d5db;
    }

    .btn-close {
        font-size: 18px;
        line-height: 1;
    }

    .body {
        padding: 16px;
        background-color: #ffffff;
    }

    textarea {
        width: 100%;
        min-height: 96px;
        resize: vertical;
        padding: 8px;
        border-radius: 6px;
        border: 1px solid #9ca3af;
        background-color: #ffffff;
        color: #111111;
        font-family: monospace;
        font-size: 13px;
        margin-bottom: 10px;
    }

    textarea[readonly] {
        background-color: #f9fafb;
    }

    label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        margin-bottom: 10px;
        user-select: none;
    }

    input[type="checkbox"] {
        appearance: none;
        width: 14px;
        height: 14px;
        border: 1px solid #6b7280;
        border-radius: 3px;
        background-color: #ffffff;
        position: relative;
    }

    input[type="checkbox"]:checked {
        background-color: #2563eb;
        border-color: #2563eb;
    }

    input[type="checkbox"]:checked::after {
        content: "";
        position: absolute;
        left: 3px;
        top: 1px;
        width: 4px;
        height: 8px;
        border: solid #ffffff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
</style>

<div class="backdrop">
    <div class="modal">
        <div class="header">
            <div>ASCII Cleaner</div>
            <div class="header-actions">
                <button class="btn btn-copy" type="button">Copy</button>
                <button class="btn btn-close" type="button">×</button>
            </div>
        </div>

        <div class="body">
            <textarea class="input"></textarea>

            <label>
                <input type="checkbox" class="keep" />
                Keep allowed emojis
            </label>

            <textarea class="output" readonly></textarea>
        </div>
    </div>
</div>
`;

    document.body.appendChild(host);

    var input = shadow.querySelector(".input");
    var output = shadow.querySelector(".output");
    var keepBox = shadow.querySelector(".keep");
    var copyBtn = shadow.querySelector(".btn-copy");
    var closeBtn = shadow.querySelector(".btn-close");
    var backdrop = shadow.querySelector(".backdrop");

    function update() {
        output.value = clean(input.value, keepBox.checked);
    }

    input.addEventListener("input", update);
    keepBox.addEventListener("change", update);

    copyBtn.addEventListener("click", function () {
        var text = output.value;
        if (!text) return;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {closeUI()}).catch(function () {
                alert("Failed to copy!");
            });
        } else {
            output.focus();
            output.select();
            document.execCommand("copy");
        }
    });

    function closeUI() {
        document.removeEventListener("keydown", onKey);
        host.remove();
    }

    function onKey(e) {
        if (e.key === "Escape") closeUI();
    }

    closeBtn.addEventListener("click", closeUI);
    backdrop.addEventListener("click", function (e) {
        if (e.target === backdrop) closeUI();
    });

    document.addEventListener("keydown", onKey);

    setTimeout(function () {
        input.focus();
        input.select();
    }, 0);

    if (navigator.clipboard && navigator.clipboard.readText) {
        navigator.clipboard.readText().then(function (text) {
            if (text) {
                input.value = text;
                update();
                input.select();
            }
        }).catch(function () {
            /* ignore */
        });
    }

})();
