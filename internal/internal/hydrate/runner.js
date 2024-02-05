var Oa = Object.defineProperty;
var cr = (t, e) => {
  for (var r in e) Oa(t, r, { get: e[r], enumerable: !0 });
};
var Os = "r",
  Ds = "o",
  Ms = "s",
  Ps = "t";
var lr = "http://www.w3.org/1999/xlink";
var Da = {
    get(t, e) {
      if (e in t) return t[e];
      if (typeof e != "symbol" && !isNaN(e)) return t.__items[e];
    },
  },
  pn = (t) => new Proxy(new pt(t), Da),
  pt = class {
    constructor(e = !1) {
      this.caseInsensitive = e;
      this.__items = [];
    }
    get length() {
      return this.__items.length;
    }
    item(e) {
      return this.__items[e] || null;
    }
    setNamedItem(e) {
      (e.namespaceURI = null), this.setNamedItemNS(e);
    }
    setNamedItemNS(e) {
      e != null && e.value != null && (e.value = String(e.value));
      let r = this.__items.find(
        (n) => n.name === e.name && n.namespaceURI === e.namespaceURI,
      );
      r != null ? (r.value = e.value) : this.__items.push(e);
    }
    getNamedItem(e) {
      return (
        this.caseInsensitive && (e = e.toLowerCase()),
        this.getNamedItemNS(null, e)
      );
    }
    getNamedItemNS(e, r) {
      return (
        (e = ks(e)),
        this.__items.find((n) => n.name === r && ks(n.namespaceURI) === e) ||
          null
      );
    }
    removeNamedItem(e) {
      this.removeNamedItemNS(e);
    }
    removeNamedItemNS(e) {
      for (let r = 0, n = this.__items.length; r < n; r++)
        if (
          this.__items[r].name === e.name &&
          this.__items[r].namespaceURI === e.namespaceURI
        ) {
          this.__items.splice(r, 1);
          break;
        }
    }
    [Symbol.iterator]() {
      let e = 0;
      return {
        next: () => ({ done: e === this.length, value: this.item(e++) }),
      };
    }
    get [Symbol.toStringTag]() {
      return "MockAttributeMap";
    }
  };
function ks(t) {
  return t === lr ? null : t;
}
function Je(t, e = !1) {
  let r = new pt(t.caseInsensitive);
  if (t != null) {
    let n = t.length;
    if (e && n > 1) {
      let u = [];
      for (let o = 0; o < n; o++) {
        let h = t.item(o),
          T = new de(h.name, h.value, h.namespaceURI);
        u.push(T);
      }
      u.sort(Ma).forEach((o) => {
        r.setNamedItemNS(o);
      });
    } else
      for (let u = 0; u < n; u++) {
        let o = t.item(u),
          h = new de(o.name, o.value, o.namespaceURI);
        r.setNamedItemNS(h);
      }
  }
  return r;
}
function Ma(t, e) {
  return t.name < e.name ? -1 : t.name > e.name ? 1 : 0;
}
var de = class {
  constructor(e, r, n = null) {
    (this._name = e), (this._value = String(r)), (this._namespaceURI = n);
  }
  get name() {
    return this._name;
  }
  set name(e) {
    this._name = e;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    this._value = String(e);
  }
  get nodeName() {
    return this._name;
  }
  set nodeName(e) {
    this._name = e;
  }
  get nodeValue() {
    return this._value;
  }
  set nodeValue(e) {
    this._value = String(e);
  }
  get namespaceURI() {
    return this._namespaceURI;
  }
  set namespaceURI(e) {
    this._namespaceURI = e;
  }
};
var dr = class {
  constructor(e) {
    this.elm = e;
  }
  add(...e) {
    let r = Ze(this.elm),
      n = !1;
    e.forEach((u) => {
      (u = String(u)), Hs(u), r.includes(u) === !1 && (r.push(u), (n = !0));
    }),
      n && this.elm.setAttributeNS(null, "class", r.join(" "));
  }
  remove(...e) {
    let r = Ze(this.elm),
      n = !1;
    e.forEach((u) => {
      (u = String(u)), Hs(u);
      let o = r.indexOf(u);
      o > -1 && (r.splice(o, 1), (n = !0));
    }),
      n &&
        this.elm.setAttributeNS(
          null,
          "class",
          r.filter((u) => u.length > 0).join(" "),
        );
  }
  contains(e) {
    return (e = String(e)), Ze(this.elm).includes(e);
  }
  toggle(e) {
    (e = String(e)), this.contains(e) === !0 ? this.remove(e) : this.add(e);
  }
  get length() {
    return Ze(this.elm).length;
  }
  item(e) {
    return Ze(this.elm)[e];
  }
  toString() {
    return Ze(this.elm).join(" ");
  }
};
function Hs(t) {
  if (t === "") throw new Error("The token provided must not be empty.");
  if (/\s/.test(t))
    throw new Error(
      `The token provided ('${t}') contains HTML space characters, which are not valid in tokens.`,
    );
}
function Ze(t) {
  let e = t.getAttribute("class");
  return typeof e == "string" && e.length > 0
    ? e
        .trim()
        .split(" ")
        .filter((r) => r.length > 0)
    : [];
}
var gn = class {
  constructor() {
    this._styles = new Map();
  }
  setProperty(e, r) {
    (e = hr(e)),
      r == null || r === ""
        ? this._styles.delete(e)
        : this._styles.set(e, String(r));
  }
  getPropertyValue(e) {
    return (e = hr(e)), String(this._styles.get(e) || "");
  }
  removeProperty(e) {
    (e = hr(e)), this._styles.delete(e);
  }
  get length() {
    return this._styles.size;
  }
  get cssText() {
    let e = [];
    return (
      this._styles.forEach((r, n) => {
        e.push(`${n}: ${r};`);
      }),
      e.join(" ").trim()
    );
  }
  set cssText(e) {
    if (e == null || e === "") {
      this._styles.clear();
      return;
    }
    e.split(";").forEach((r) => {
      if (((r = r.trim()), r.length > 0)) {
        let n = r.split(":");
        if (n.length > 1) {
          let u = n[0].trim(),
            o = n.slice(1).join(":").trim();
          u !== "" && o !== "" && this._styles.set(hr(u), o);
        }
      }
    });
  }
};
function bn() {
  return new Proxy(new gn(), Pa);
}
var Pa = {
  get(t, e) {
    return e in t ? t[e] : ((e = ka(e)), t.getPropertyValue(e));
  },
  set(t, e, r) {
    return e in t ? (t[e] = r) : t.setProperty(e, r), !0;
  },
};
function ka(t) {
  return (
    t.length > 1 &&
      t.includes("-") === !0 &&
      ((t = t
        .toLowerCase()
        .split("-")
        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        .join("")),
      (t = t.slice(0, 1).toLowerCase() + t.slice(1))),
    t
  );
}
function hr(t) {
  return (
    t.length > 1 &&
      t.includes("-") === !1 &&
      /[A-Z]/.test(t) === !0 &&
      (t = t
        .replace(/([A-Z])/g, (e) => " " + e[0])
        .trim()
        .replace(/ /g, "-")
        .toLowerCase()),
    t
  );
}
var fr = class {
  constructor(e) {
    this.win = e;
  }
  define(e, r, n) {
    if (e.toLowerCase() !== e)
      throw new Error(
        `Failed to execute 'define' on 'CustomElementRegistry': "${e}" is not a valid custom element name`,
      );
    if (
      (this.__registry == null && (this.__registry = new Map()),
      this.__registry.set(e, { cstr: r, options: n }),
      this.__whenDefined != null)
    ) {
      let o = this.__whenDefined.get(e);
      o != null &&
        (o.forEach((h) => {
          h();
        }),
        (o.length = 0),
        this.__whenDefined.delete(e));
    }
    let u = this.win.document;
    u != null &&
      u.querySelectorAll(e).forEach((h) => {
        if (ws.has(h) === !1) {
          mr.add(u);
          let T = _n(this, u, e);
          for (let A = 0; A < h.childNodes.length; A++) {
            let y = h.childNodes[A];
            y.remove(), T.appendChild(y);
          }
          mr.delete(u), et.has(h) && et.set(h, T);
        }
        Bs(h);
      });
  }
  get(e) {
    if (this.__registry != null) {
      let r = this.__registry.get(e.toLowerCase());
      if (r != null) return r.cstr;
    }
  }
  upgrade(e) {}
  clear() {
    this.__registry != null && this.__registry.clear(),
      this.__whenDefined != null && this.__whenDefined.clear();
  }
  whenDefined(e) {
    return (
      (e = e.toLowerCase()),
      this.__registry != null && this.__registry.has(e) === !0
        ? Promise.resolve(this.__registry.get(e).cstr)
        : new Promise((r) => {
            this.__whenDefined == null && (this.__whenDefined = new Map());
            let n = this.__whenDefined.get(e);
            n == null && ((n = []), this.__whenDefined.set(e, n)), n.push(r);
          })
    );
  }
};
function _n(t, e, r) {
  let n = t.get(r);
  if (n != null) {
    let h = new n(e);
    return (h.nodeName = r.toUpperCase()), ws.add(h), h;
  }
  let u = new Proxy(
      {},
      {
        get(h, T) {
          let A = et.get(u);
          return A != null ? A[T] : h[T];
        },
        set(h, T, A) {
          let y = et.get(u);
          return y != null ? (y[T] = A) : (h[T] = A), !0;
        },
        has(h, T) {
          let A = et.get(u);
          return T in A || T in h;
        },
      },
    ),
    o = new v(e, r);
  return et.set(u, o), u;
}
var et = new WeakMap(),
  ws = new WeakSet();
function gt(t, e) {
  if (((e.ownerDocument = t), e.nodeType === 1)) {
    if (t != null && e.nodeName.includes("-")) {
      t.defaultView != null &&
        typeof e.connectedCallback == "function" &&
        e.isConnected &&
        Bs(e);
      let n = e.shadowRoot;
      n != null &&
        n.childNodes.forEach((u) => {
          gt(t, u);
        });
    }
    e.childNodes.forEach((r) => {
      gt(t, r);
    });
  } else
    e.childNodes.forEach((r) => {
      r.ownerDocument = t;
    });
}
function Bs(t) {
  if (
    typeof t.connectedCallback == "function" &&
    mr.has(t.ownerDocument) === !1
  )
    try {
      t.connectedCallback();
    } catch (e) {
      console.error(e);
    }
}
function An(t) {
  if (t.nodeType === 1) {
    if (
      t.nodeName.includes("-") === !0 &&
      typeof t.disconnectedCallback == "function" &&
      mr.has(t.ownerDocument) === !1
    )
      try {
        t.disconnectedCallback();
      } catch (e) {
        console.error(e);
      }
    t.childNodes.forEach(An);
  }
}
function Fe(t, e, r, n) {
  e = e.toLowerCase();
  let u = t.constructor.observedAttributes;
  if (Array.isArray(u) === !0 && u.some((o) => o.toLowerCase() === e) === !0)
    try {
      t.attributeChangedCallback(e, r, n);
    } catch (o) {
      console.error(o);
    }
}
function bt(t) {
  return (
    t.nodeName.includes("-") === !0 &&
    typeof t.attributeChangedCallback == "function"
  );
}
var mr = new Set();
function Us(t) {
  let e = {},
    r = t.attributes,
    n = r.length;
  for (let u = 0; u < n; u++) {
    let o = r.item(u),
      h = o.nodeName;
    h.startsWith("data-") && (e[wa(h)] = o.nodeValue);
  }
  return new Proxy(e, {
    get(u, o) {
      return e[o];
    },
    set(u, o, h) {
      let T = Ha(o);
      return t.setAttribute(T, h), !0;
    },
  });
}
function Ha(t) {
  return (
    "data-" +
    String(t)
      .replace(/([A-Z0-9])/g, (e) => " " + e[0])
      .trim()
      .replace(/ /g, "-")
      .toLowerCase()
  );
}
function wa(t) {
  return (
    (t = String(t).slice(5)),
    t
      .split("-")
      .map((e, r) =>
        r === 0
          ? e.charAt(0).toLowerCase() + e.slice(1)
          : e.charAt(0).toUpperCase() + e.slice(1),
      )
      .join("")
  );
}
var Ce = class {
    constructor(e, r) {
      this.bubbles = !1;
      this.cancelBubble = !1;
      this.cancelable = !1;
      this.composed = !1;
      this.currentTarget = null;
      this.defaultPrevented = !1;
      this.srcElement = null;
      this.target = null;
      if (typeof e != "string") throw new Error("Event type required");
      (this.type = e),
        (this.timeStamp = Date.now()),
        r != null && Object.assign(this, r);
    }
    preventDefault() {
      this.defaultPrevented = !0;
    }
    stopPropagation() {
      this.cancelBubble = !0;
    }
    stopImmediatePropagation() {
      this.cancelBubble = !0;
    }
    composedPath() {
      let e = [],
        r = this.target;
      for (; r; ) {
        if ((e.push(r), !r.parentElement && r.nodeName === "#document")) {
          e.push(r.defaultView);
          break;
        }
        r = r.parentElement;
      }
      return e;
    }
  },
  _t = class extends Ce {
    constructor(r, n) {
      super(r);
      this.detail = null;
      n != null && Object.assign(this, n);
    }
  },
  At = class extends Ce {
    constructor(r, n) {
      super(r);
      this.code = "";
      this.key = "";
      this.altKey = !1;
      this.ctrlKey = !1;
      this.metaKey = !1;
      this.shiftKey = !1;
      this.location = 0;
      this.repeat = !1;
      n != null && Object.assign(this, n);
    }
  },
  Ct = class extends Ce {
    constructor(r, n) {
      super(r);
      this.screenX = 0;
      this.screenY = 0;
      this.clientX = 0;
      this.clientY = 0;
      this.ctrlKey = !1;
      this.shiftKey = !1;
      this.altKey = !1;
      this.metaKey = !1;
      this.button = 0;
      this.buttons = 0;
      this.relatedTarget = null;
      n != null && Object.assign(this, n);
    }
  },
  Cn = class extends Ce {
    constructor(r, n) {
      super(r);
      this.detail = null;
      this.view = null;
      n != null && Object.assign(this, n);
    }
  },
  We = class extends Cn {
    constructor(r, n) {
      super(r);
      this.relatedTarget = null;
      n != null && Object.assign(this, n);
    }
  },
  Nn = class {
    constructor(e, r) {
      (this.type = e), (this.handler = r);
    }
  };
function Er(t, e, r) {
  let n = t;
  n.__listeners == null && (n.__listeners = []),
    n.__listeners.push(new Nn(e, r));
}
function Tr(t, e, r) {
  let n = t;
  if (n != null && Array.isArray(n.__listeners) === !0) {
    let u = n.__listeners.find((o) => o.type === e && o.handler === r);
    if (u != null) {
      let o = n.__listeners.indexOf(u);
      n.__listeners.splice(o, 1);
    }
  }
}
function tt(t) {
  t != null && t.__listeners != null && (t.__listeners = null);
}
function In(t, e) {
  if (t == null || e.cancelBubble === !0) return;
  let r = t;
  (e.currentTarget = t),
    Array.isArray(r.__listeners) === !0 &&
      r.__listeners
        .filter((u) => u.type === e.type)
        .forEach((u) => {
          try {
            u.handler.call(r, e);
          } catch (o) {
            console.error(o);
          }
        }),
    e.bubbles !== !1 &&
      (t.nodeName === "#document"
        ? In(t.defaultView, e)
        : In(t.parentElement, e));
}
function Ye(t, e) {
  return (e.target = t), In(t, e), !0;
}
var Ba = new Set([
    65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678,
    327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823,
    655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502,
    917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111,
  ]),
  q = "�",
  i;
(function (t) {
  (t[(t.EOF = -1)] = "EOF"),
    (t[(t.NULL = 0)] = "NULL"),
    (t[(t.TABULATION = 9)] = "TABULATION"),
    (t[(t.CARRIAGE_RETURN = 13)] = "CARRIAGE_RETURN"),
    (t[(t.LINE_FEED = 10)] = "LINE_FEED"),
    (t[(t.FORM_FEED = 12)] = "FORM_FEED"),
    (t[(t.SPACE = 32)] = "SPACE"),
    (t[(t.EXCLAMATION_MARK = 33)] = "EXCLAMATION_MARK"),
    (t[(t.QUOTATION_MARK = 34)] = "QUOTATION_MARK"),
    (t[(t.NUMBER_SIGN = 35)] = "NUMBER_SIGN"),
    (t[(t.AMPERSAND = 38)] = "AMPERSAND"),
    (t[(t.APOSTROPHE = 39)] = "APOSTROPHE"),
    (t[(t.HYPHEN_MINUS = 45)] = "HYPHEN_MINUS"),
    (t[(t.SOLIDUS = 47)] = "SOLIDUS"),
    (t[(t.DIGIT_0 = 48)] = "DIGIT_0"),
    (t[(t.DIGIT_9 = 57)] = "DIGIT_9"),
    (t[(t.SEMICOLON = 59)] = "SEMICOLON"),
    (t[(t.LESS_THAN_SIGN = 60)] = "LESS_THAN_SIGN"),
    (t[(t.EQUALS_SIGN = 61)] = "EQUALS_SIGN"),
    (t[(t.GREATER_THAN_SIGN = 62)] = "GREATER_THAN_SIGN"),
    (t[(t.QUESTION_MARK = 63)] = "QUESTION_MARK"),
    (t[(t.LATIN_CAPITAL_A = 65)] = "LATIN_CAPITAL_A"),
    (t[(t.LATIN_CAPITAL_F = 70)] = "LATIN_CAPITAL_F"),
    (t[(t.LATIN_CAPITAL_X = 88)] = "LATIN_CAPITAL_X"),
    (t[(t.LATIN_CAPITAL_Z = 90)] = "LATIN_CAPITAL_Z"),
    (t[(t.RIGHT_SQUARE_BRACKET = 93)] = "RIGHT_SQUARE_BRACKET"),
    (t[(t.GRAVE_ACCENT = 96)] = "GRAVE_ACCENT"),
    (t[(t.LATIN_SMALL_A = 97)] = "LATIN_SMALL_A"),
    (t[(t.LATIN_SMALL_F = 102)] = "LATIN_SMALL_F"),
    (t[(t.LATIN_SMALL_X = 120)] = "LATIN_SMALL_X"),
    (t[(t.LATIN_SMALL_Z = 122)] = "LATIN_SMALL_Z"),
    (t[(t.REPLACEMENT_CHARACTER = 65533)] = "REPLACEMENT_CHARACTER");
})((i = i || (i = {})));
var se = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system",
};
function pr(t) {
  return t >= 55296 && t <= 57343;
}
function vs(t) {
  return t >= 56320 && t <= 57343;
}
function Fs(t, e) {
  return (t - 55296) * 1024 + 9216 + e;
}
function gr(t) {
  return (
    (t !== 32 &&
      t !== 10 &&
      t !== 13 &&
      t !== 9 &&
      t !== 12 &&
      t >= 1 &&
      t <= 31) ||
    (t >= 127 && t <= 159)
  );
}
function br(t) {
  return (t >= 64976 && t <= 65007) || Ba.has(t);
}
var E;
(function (t) {
  (t.controlCharacterInInputStream = "control-character-in-input-stream"),
    (t.noncharacterInInputStream = "noncharacter-in-input-stream"),
    (t.surrogateInInputStream = "surrogate-in-input-stream"),
    (t.nonVoidHtmlElementStartTagWithTrailingSolidus =
      "non-void-html-element-start-tag-with-trailing-solidus"),
    (t.endTagWithAttributes = "end-tag-with-attributes"),
    (t.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus"),
    (t.unexpectedSolidusInTag = "unexpected-solidus-in-tag"),
    (t.unexpectedNullCharacter = "unexpected-null-character"),
    (t.unexpectedQuestionMarkInsteadOfTagName =
      "unexpected-question-mark-instead-of-tag-name"),
    (t.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name"),
    (t.unexpectedEqualsSignBeforeAttributeName =
      "unexpected-equals-sign-before-attribute-name"),
    (t.missingEndTagName = "missing-end-tag-name"),
    (t.unexpectedCharacterInAttributeName =
      "unexpected-character-in-attribute-name"),
    (t.unknownNamedCharacterReference = "unknown-named-character-reference"),
    (t.missingSemicolonAfterCharacterReference =
      "missing-semicolon-after-character-reference"),
    (t.unexpectedCharacterAfterDoctypeSystemIdentifier =
      "unexpected-character-after-doctype-system-identifier"),
    (t.unexpectedCharacterInUnquotedAttributeValue =
      "unexpected-character-in-unquoted-attribute-value"),
    (t.eofBeforeTagName = "eof-before-tag-name"),
    (t.eofInTag = "eof-in-tag"),
    (t.missingAttributeValue = "missing-attribute-value"),
    (t.missingWhitespaceBetweenAttributes =
      "missing-whitespace-between-attributes"),
    (t.missingWhitespaceAfterDoctypePublicKeyword =
      "missing-whitespace-after-doctype-public-keyword"),
    (t.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers =
      "missing-whitespace-between-doctype-public-and-system-identifiers"),
    (t.missingWhitespaceAfterDoctypeSystemKeyword =
      "missing-whitespace-after-doctype-system-keyword"),
    (t.missingQuoteBeforeDoctypePublicIdentifier =
      "missing-quote-before-doctype-public-identifier"),
    (t.missingQuoteBeforeDoctypeSystemIdentifier =
      "missing-quote-before-doctype-system-identifier"),
    (t.missingDoctypePublicIdentifier = "missing-doctype-public-identifier"),
    (t.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier"),
    (t.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier"),
    (t.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier"),
    (t.cdataInHtmlContent = "cdata-in-html-content"),
    (t.incorrectlyOpenedComment = "incorrectly-opened-comment"),
    (t.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text"),
    (t.eofInDoctype = "eof-in-doctype"),
    (t.nestedComment = "nested-comment"),
    (t.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment"),
    (t.eofInComment = "eof-in-comment"),
    (t.incorrectlyClosedComment = "incorrectly-closed-comment"),
    (t.eofInCdata = "eof-in-cdata"),
    (t.absenceOfDigitsInNumericCharacterReference =
      "absence-of-digits-in-numeric-character-reference"),
    (t.nullCharacterReference = "null-character-reference"),
    (t.surrogateCharacterReference = "surrogate-character-reference"),
    (t.characterReferenceOutsideUnicodeRange =
      "character-reference-outside-unicode-range"),
    (t.controlCharacterReference = "control-character-reference"),
    (t.noncharacterCharacterReference = "noncharacter-character-reference"),
    (t.missingWhitespaceBeforeDoctypeName =
      "missing-whitespace-before-doctype-name"),
    (t.missingDoctypeName = "missing-doctype-name"),
    (t.invalidCharacterSequenceAfterDoctypeName =
      "invalid-character-sequence-after-doctype-name"),
    (t.duplicateAttribute = "duplicate-attribute"),
    (t.nonConformingDoctype = "non-conforming-doctype"),
    (t.missingDoctype = "missing-doctype"),
    (t.misplacedDoctype = "misplaced-doctype"),
    (t.endTagWithoutMatchingOpenElement =
      "end-tag-without-matching-open-element"),
    (t.closingOfElementWithOpenChildElements =
      "closing-of-element-with-open-child-elements"),
    (t.disallowedContentInNoscriptInHead =
      "disallowed-content-in-noscript-in-head"),
    (t.openElementsLeftAfterEof = "open-elements-left-after-eof"),
    (t.abandonedHeadElementChild = "abandoned-head-element-child"),
    (t.misplacedStartTagForHeadElement =
      "misplaced-start-tag-for-head-element"),
    (t.nestedNoscriptInHead = "nested-noscript-in-head"),
    (t.eofInElementThatCanContainOnlyText =
      "eof-in-element-that-can-contain-only-text");
})((E = E || (E = {})));
var va = 65536,
  _r = class {
    constructor(e) {
      (this.handler = e),
        (this.html = ""),
        (this.pos = -1),
        (this.lastGapPos = -2),
        (this.gapStack = []),
        (this.skipNextNewLine = !1),
        (this.lastChunkWritten = !1),
        (this.endOfChunkHit = !1),
        (this.bufferWaterline = va),
        (this.isEol = !1),
        (this.lineStartPos = 0),
        (this.droppedBufferSize = 0),
        (this.line = 1),
        (this.lastErrOffset = -1);
    }
    get col() {
      return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos);
    }
    get offset() {
      return this.droppedBufferSize + this.pos;
    }
    getError(e) {
      let { line: r, col: n, offset: u } = this;
      return {
        code: e,
        startLine: r,
        endLine: r,
        startCol: n,
        endCol: n,
        startOffset: u,
        endOffset: u,
      };
    }
    _err(e) {
      this.handler.onParseError &&
        this.lastErrOffset !== this.offset &&
        ((this.lastErrOffset = this.offset),
        this.handler.onParseError(this.getError(e)));
    }
    _addGap() {
      this.gapStack.push(this.lastGapPos), (this.lastGapPos = this.pos);
    }
    _processSurrogate(e) {
      if (this.pos !== this.html.length - 1) {
        let r = this.html.charCodeAt(this.pos + 1);
        if (vs(r)) return this.pos++, this._addGap(), Fs(e, r);
      } else if (!this.lastChunkWritten)
        return (this.endOfChunkHit = !0), i.EOF;
      return this._err(E.surrogateInInputStream), e;
    }
    willDropParsedChunk() {
      return this.pos > this.bufferWaterline;
    }
    dropParsedChunk() {
      this.willDropParsedChunk() &&
        ((this.html = this.html.substring(this.pos)),
        (this.lineStartPos -= this.pos),
        (this.droppedBufferSize += this.pos),
        (this.pos = 0),
        (this.lastGapPos = -2),
        (this.gapStack.length = 0));
    }
    write(e, r) {
      this.html.length > 0 ? (this.html += e) : (this.html = e),
        (this.endOfChunkHit = !1),
        (this.lastChunkWritten = r);
    }
    insertHtmlAtCurrentPos(e) {
      (this.html =
        this.html.substring(0, this.pos + 1) +
        e +
        this.html.substring(this.pos + 1)),
        (this.endOfChunkHit = !1);
    }
    startsWith(e, r) {
      if (this.pos + e.length > this.html.length)
        return (this.endOfChunkHit = !this.lastChunkWritten), !1;
      if (r) return this.html.startsWith(e, this.pos);
      for (let n = 0; n < e.length; n++)
        if ((this.html.charCodeAt(this.pos + n) | 32) !== e.charCodeAt(n))
          return !1;
      return !0;
    }
    peek(e) {
      let r = this.pos + e;
      if (r >= this.html.length)
        return (this.endOfChunkHit = !this.lastChunkWritten), i.EOF;
      let n = this.html.charCodeAt(r);
      return n === i.CARRIAGE_RETURN ? i.LINE_FEED : n;
    }
    advance() {
      if (
        (this.pos++,
        this.isEol &&
          ((this.isEol = !1), this.line++, (this.lineStartPos = this.pos)),
        this.pos >= this.html.length)
      )
        return (this.endOfChunkHit = !this.lastChunkWritten), i.EOF;
      let e = this.html.charCodeAt(this.pos);
      return e === i.CARRIAGE_RETURN
        ? ((this.isEol = !0), (this.skipNextNewLine = !0), i.LINE_FEED)
        : e === i.LINE_FEED && ((this.isEol = !0), this.skipNextNewLine)
          ? (this.line--,
            (this.skipNextNewLine = !1),
            this._addGap(),
            this.advance())
          : ((this.skipNextNewLine = !1),
            pr(e) && (e = this._processSurrogate(e)),
            this.handler.onParseError === null ||
              (e > 31 && e < 127) ||
              e === i.LINE_FEED ||
              e === i.CARRIAGE_RETURN ||
              (e > 159 && e < 64976) ||
              this._checkForProblematicCharacters(e),
            e);
    }
    _checkForProblematicCharacters(e) {
      gr(e)
        ? this._err(E.controlCharacterInInputStream)
        : br(e) && this._err(E.noncharacterInInputStream);
    }
    retreat(e) {
      for (this.pos -= e; this.pos < this.lastGapPos; )
        (this.lastGapPos = this.gapStack.pop()), this.pos--;
      this.isEol = !1;
    }
  };
var Sn = {};
cr(Sn, { TokenType: () => B, getTokenAttr: () => It });
var B;
(function (t) {
  (t[(t.CHARACTER = 0)] = "CHARACTER"),
    (t[(t.NULL_CHARACTER = 1)] = "NULL_CHARACTER"),
    (t[(t.WHITESPACE_CHARACTER = 2)] = "WHITESPACE_CHARACTER"),
    (t[(t.START_TAG = 3)] = "START_TAG"),
    (t[(t.END_TAG = 4)] = "END_TAG"),
    (t[(t.COMMENT = 5)] = "COMMENT"),
    (t[(t.DOCTYPE = 6)] = "DOCTYPE"),
    (t[(t.EOF = 7)] = "EOF"),
    (t[(t.HIBERNATION = 8)] = "HIBERNATION");
})((B = B || (B = {})));
function It(t, e) {
  for (let r = t.attrs.length - 1; r >= 0; r--)
    if (t.attrs[r].name === e) return t.attrs[r].value;
  return null;
}
var Ne = new Uint16Array(
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'
    .split("")
    .map((t) => t.charCodeAt(0)),
);
var Ws = new Uint16Array(
  "Ȁaglq\tɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((t) => t.charCodeAt(0)),
);
var yn,
  Fa = new Map([
    [0, 65533],
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376],
  ]),
  Rn =
    (yn = String.fromCodePoint) !== null && yn !== void 0
      ? yn
      : function (t) {
          let e = "";
          return (
            t > 65535 &&
              ((t -= 65536),
              (e += String.fromCharCode(((t >>> 10) & 1023) | 55296)),
              (t = 56320 | (t & 1023))),
            (e += String.fromCharCode(t)),
            e
          );
        };
function xn(t) {
  var e;
  return (t >= 55296 && t <= 57343) || t > 1114111
    ? 65533
    : (e = Fa.get(t)) !== null && e !== void 0
      ? e
      : t;
}
var j;
(function (t) {
  (t[(t.NUM = 35)] = "NUM"),
    (t[(t.SEMI = 59)] = "SEMI"),
    (t[(t.EQUALS = 61)] = "EQUALS"),
    (t[(t.ZERO = 48)] = "ZERO"),
    (t[(t.NINE = 57)] = "NINE"),
    (t[(t.LOWER_A = 97)] = "LOWER_A"),
    (t[(t.LOWER_F = 102)] = "LOWER_F"),
    (t[(t.LOWER_X = 120)] = "LOWER_X"),
    (t[(t.LOWER_Z = 122)] = "LOWER_Z"),
    (t[(t.UPPER_A = 65)] = "UPPER_A"),
    (t[(t.UPPER_F = 70)] = "UPPER_F"),
    (t[(t.UPPER_Z = 90)] = "UPPER_Z");
})(j || (j = {}));
var Wa = 32,
  pe;
(function (t) {
  (t[(t.VALUE_LENGTH = 49152)] = "VALUE_LENGTH"),
    (t[(t.BRANCH_LENGTH = 16256)] = "BRANCH_LENGTH"),
    (t[(t.JUMP_TABLE = 127)] = "JUMP_TABLE");
})(pe || (pe = {}));
function Ln(t) {
  return t >= j.ZERO && t <= j.NINE;
}
function Ya(t) {
  return (
    (t >= j.UPPER_A && t <= j.UPPER_F) || (t >= j.LOWER_A && t <= j.LOWER_F)
  );
}
function Va(t) {
  return (
    (t >= j.UPPER_A && t <= j.UPPER_Z) ||
    (t >= j.LOWER_A && t <= j.LOWER_Z) ||
    Ln(t)
  );
}
function qa(t) {
  return t === j.EQUALS || Va(t);
}
var z;
(function (t) {
  (t[(t.EntityStart = 0)] = "EntityStart"),
    (t[(t.NumericStart = 1)] = "NumericStart"),
    (t[(t.NumericDecimal = 2)] = "NumericDecimal"),
    (t[(t.NumericHex = 3)] = "NumericHex"),
    (t[(t.NamedEntity = 4)] = "NamedEntity");
})(z || (z = {}));
var Ve;
(function (t) {
  (t[(t.Legacy = 0)] = "Legacy"),
    (t[(t.Strict = 1)] = "Strict"),
    (t[(t.Attribute = 2)] = "Attribute");
})(Ve || (Ve = {}));
var On = class {
  constructor(e, r, n) {
    (this.decodeTree = e),
      (this.emitCodePoint = r),
      (this.errors = n),
      (this.state = z.EntityStart),
      (this.consumed = 1),
      (this.result = 0),
      (this.treeIndex = 0),
      (this.excess = 1),
      (this.decodeMode = Ve.Strict);
  }
  startEntity(e) {
    (this.decodeMode = e),
      (this.state = z.EntityStart),
      (this.result = 0),
      (this.treeIndex = 0),
      (this.excess = 1),
      (this.consumed = 1);
  }
  write(e, r) {
    switch (this.state) {
      case z.EntityStart:
        return e.charCodeAt(r) === j.NUM
          ? ((this.state = z.NumericStart),
            (this.consumed += 1),
            this.stateNumericStart(e, r + 1))
          : ((this.state = z.NamedEntity), this.stateNamedEntity(e, r));
      case z.NumericStart:
        return this.stateNumericStart(e, r);
      case z.NumericDecimal:
        return this.stateNumericDecimal(e, r);
      case z.NumericHex:
        return this.stateNumericHex(e, r);
      case z.NamedEntity:
        return this.stateNamedEntity(e, r);
    }
  }
  stateNumericStart(e, r) {
    return r >= e.length
      ? -1
      : (e.charCodeAt(r) | Wa) === j.LOWER_X
        ? ((this.state = z.NumericHex),
          (this.consumed += 1),
          this.stateNumericHex(e, r + 1))
        : ((this.state = z.NumericDecimal), this.stateNumericDecimal(e, r));
  }
  addToNumericResult(e, r, n, u) {
    if (r !== n) {
      let o = n - r;
      (this.result =
        this.result * Math.pow(u, o) + parseInt(e.substr(r, o), u)),
        (this.consumed += o);
    }
  }
  stateNumericHex(e, r) {
    let n = r;
    for (; r < e.length; ) {
      let u = e.charCodeAt(r);
      if (Ln(u) || Ya(u)) r += 1;
      else
        return (
          this.addToNumericResult(e, n, r, 16), this.emitNumericEntity(u, 3)
        );
    }
    return this.addToNumericResult(e, n, r, 16), -1;
  }
  stateNumericDecimal(e, r) {
    let n = r;
    for (; r < e.length; ) {
      let u = e.charCodeAt(r);
      if (Ln(u)) r += 1;
      else
        return (
          this.addToNumericResult(e, n, r, 10), this.emitNumericEntity(u, 2)
        );
    }
    return this.addToNumericResult(e, n, r, 10), -1;
  }
  emitNumericEntity(e, r) {
    var n;
    if (this.consumed <= r)
      return (
        (n = this.errors) === null ||
          n === void 0 ||
          n.absenceOfDigitsInNumericCharacterReference(this.consumed),
        0
      );
    if (e === j.SEMI) this.consumed += 1;
    else if (this.decodeMode === Ve.Strict) return 0;
    return (
      this.emitCodePoint(xn(this.result), this.consumed),
      this.errors &&
        (e !== j.SEMI && this.errors.missingSemicolonAfterCharacterReference(),
        this.errors.validateNumericCharacterReference(this.result)),
      this.consumed
    );
  }
  stateNamedEntity(e, r) {
    let { decodeTree: n } = this,
      u = n[this.treeIndex],
      o = (u & pe.VALUE_LENGTH) >> 14;
    for (; r < e.length; r++, this.excess++) {
      let h = e.charCodeAt(r);
      if (
        ((this.treeIndex = Dn(n, u, this.treeIndex + Math.max(1, o), h)),
        this.treeIndex < 0)
      )
        return this.result === 0 ||
          (this.decodeMode === Ve.Attribute && (o === 0 || qa(h)))
          ? 0
          : this.emitNotTerminatedNamedEntity();
      if (
        ((u = n[this.treeIndex]), (o = (u & pe.VALUE_LENGTH) >> 14), o !== 0)
      ) {
        if (h === j.SEMI)
          return this.emitNamedEntityData(
            this.treeIndex,
            o,
            this.consumed + this.excess,
          );
        this.decodeMode !== Ve.Strict &&
          ((this.result = this.treeIndex),
          (this.consumed += this.excess),
          (this.excess = 0));
      }
    }
    return -1;
  }
  emitNotTerminatedNamedEntity() {
    var e;
    let { result: r, decodeTree: n } = this,
      u = (n[r] & pe.VALUE_LENGTH) >> 14;
    return (
      this.emitNamedEntityData(r, u, this.consumed),
      (e = this.errors) === null ||
        e === void 0 ||
        e.missingSemicolonAfterCharacterReference(),
      this.consumed
    );
  }
  emitNamedEntityData(e, r, n) {
    let { decodeTree: u } = this;
    return (
      this.emitCodePoint(r === 1 ? u[e] & ~pe.VALUE_LENGTH : u[e + 1], n),
      r === 3 && this.emitCodePoint(u[e + 2], n),
      n
    );
  }
  end() {
    var e;
    switch (this.state) {
      case z.NamedEntity:
        return this.result !== 0 &&
          (this.decodeMode !== Ve.Attribute || this.result === this.treeIndex)
          ? this.emitNotTerminatedNamedEntity()
          : 0;
      case z.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case z.NumericHex:
        return this.emitNumericEntity(0, 3);
      case z.NumericStart:
        return (
          (e = this.errors) === null ||
            e === void 0 ||
            e.absenceOfDigitsInNumericCharacterReference(this.consumed),
          0
        );
      case z.EntityStart:
        return 0;
    }
  }
};
function Ys(t) {
  let e = "",
    r = new On(t, (n) => (e += Rn(n)));
  return function (u, o) {
    let h = 0,
      T = 0;
    for (; (T = u.indexOf("&", T)) >= 0; ) {
      (e += u.slice(h, T)), r.startEntity(o);
      let y = r.write(u, T + 1);
      if (y < 0) {
        h = T + r.end();
        break;
      }
      (h = T + y), (T = y === 0 ? h + 1 : h);
    }
    let A = e + u.slice(h);
    return (e = ""), A;
  };
}
function Dn(t, e, r, n) {
  let u = (e & pe.BRANCH_LENGTH) >> 7,
    o = e & pe.JUMP_TABLE;
  if (u === 0) return o !== 0 && n === o ? r : -1;
  if (o) {
    let A = n - o;
    return A < 0 || A >= u ? -1 : t[r + A] - 1;
  }
  let h = r,
    T = h + u - 1;
  for (; h <= T; ) {
    let A = (h + T) >>> 1,
      y = t[A];
    if (y < n) h = A + 1;
    else if (y > n) T = A - 1;
    else return t[A + u];
  }
  return -1;
}
var Il = Ys(Ne),
  Sl = Ys(Ws);
var Pn = {};
cr(Pn, {
  ATTRS: () => ge,
  DOCUMENT_MODE: () => J,
  NS: () => p,
  SPECIAL_ELEMENTS: () => Mn,
  TAG_ID: () => s,
  TAG_NAMES: () => m,
  getTagID: () => He,
  hasUnescapedText: () => Vs,
  isNumberedHeader: () => St,
});
var p;
(function (t) {
  (t.HTML = "http://www.w3.org/1999/xhtml"),
    (t.MATHML = "http://www.w3.org/1998/Math/MathML"),
    (t.SVG = "http://www.w3.org/2000/svg"),
    (t.XLINK = "http://www.w3.org/1999/xlink"),
    (t.XML = "http://www.w3.org/XML/1998/namespace"),
    (t.XMLNS = "http://www.w3.org/2000/xmlns/");
})((p = p || (p = {})));
var ge;
(function (t) {
  (t.TYPE = "type"),
    (t.ACTION = "action"),
    (t.ENCODING = "encoding"),
    (t.PROMPT = "prompt"),
    (t.NAME = "name"),
    (t.COLOR = "color"),
    (t.FACE = "face"),
    (t.SIZE = "size");
})((ge = ge || (ge = {})));
var J;
(function (t) {
  (t.NO_QUIRKS = "no-quirks"),
    (t.QUIRKS = "quirks"),
    (t.LIMITED_QUIRKS = "limited-quirks");
})((J = J || (J = {})));
var m;
(function (t) {
  (t.A = "a"),
    (t.ADDRESS = "address"),
    (t.ANNOTATION_XML = "annotation-xml"),
    (t.APPLET = "applet"),
    (t.AREA = "area"),
    (t.ARTICLE = "article"),
    (t.ASIDE = "aside"),
    (t.B = "b"),
    (t.BASE = "base"),
    (t.BASEFONT = "basefont"),
    (t.BGSOUND = "bgsound"),
    (t.BIG = "big"),
    (t.BLOCKQUOTE = "blockquote"),
    (t.BODY = "body"),
    (t.BR = "br"),
    (t.BUTTON = "button"),
    (t.CAPTION = "caption"),
    (t.CENTER = "center"),
    (t.CODE = "code"),
    (t.COL = "col"),
    (t.COLGROUP = "colgroup"),
    (t.DD = "dd"),
    (t.DESC = "desc"),
    (t.DETAILS = "details"),
    (t.DIALOG = "dialog"),
    (t.DIR = "dir"),
    (t.DIV = "div"),
    (t.DL = "dl"),
    (t.DT = "dt"),
    (t.EM = "em"),
    (t.EMBED = "embed"),
    (t.FIELDSET = "fieldset"),
    (t.FIGCAPTION = "figcaption"),
    (t.FIGURE = "figure"),
    (t.FONT = "font"),
    (t.FOOTER = "footer"),
    (t.FOREIGN_OBJECT = "foreignObject"),
    (t.FORM = "form"),
    (t.FRAME = "frame"),
    (t.FRAMESET = "frameset"),
    (t.H1 = "h1"),
    (t.H2 = "h2"),
    (t.H3 = "h3"),
    (t.H4 = "h4"),
    (t.H5 = "h5"),
    (t.H6 = "h6"),
    (t.HEAD = "head"),
    (t.HEADER = "header"),
    (t.HGROUP = "hgroup"),
    (t.HR = "hr"),
    (t.HTML = "html"),
    (t.I = "i"),
    (t.IMG = "img"),
    (t.IMAGE = "image"),
    (t.INPUT = "input"),
    (t.IFRAME = "iframe"),
    (t.KEYGEN = "keygen"),
    (t.LABEL = "label"),
    (t.LI = "li"),
    (t.LINK = "link"),
    (t.LISTING = "listing"),
    (t.MAIN = "main"),
    (t.MALIGNMARK = "malignmark"),
    (t.MARQUEE = "marquee"),
    (t.MATH = "math"),
    (t.MENU = "menu"),
    (t.META = "meta"),
    (t.MGLYPH = "mglyph"),
    (t.MI = "mi"),
    (t.MO = "mo"),
    (t.MN = "mn"),
    (t.MS = "ms"),
    (t.MTEXT = "mtext"),
    (t.NAV = "nav"),
    (t.NOBR = "nobr"),
    (t.NOFRAMES = "noframes"),
    (t.NOEMBED = "noembed"),
    (t.NOSCRIPT = "noscript"),
    (t.OBJECT = "object"),
    (t.OL = "ol"),
    (t.OPTGROUP = "optgroup"),
    (t.OPTION = "option"),
    (t.P = "p"),
    (t.PARAM = "param"),
    (t.PLAINTEXT = "plaintext"),
    (t.PRE = "pre"),
    (t.RB = "rb"),
    (t.RP = "rp"),
    (t.RT = "rt"),
    (t.RTC = "rtc"),
    (t.RUBY = "ruby"),
    (t.S = "s"),
    (t.SCRIPT = "script"),
    (t.SECTION = "section"),
    (t.SELECT = "select"),
    (t.SOURCE = "source"),
    (t.SMALL = "small"),
    (t.SPAN = "span"),
    (t.STRIKE = "strike"),
    (t.STRONG = "strong"),
    (t.STYLE = "style"),
    (t.SUB = "sub"),
    (t.SUMMARY = "summary"),
    (t.SUP = "sup"),
    (t.TABLE = "table"),
    (t.TBODY = "tbody"),
    (t.TEMPLATE = "template"),
    (t.TEXTAREA = "textarea"),
    (t.TFOOT = "tfoot"),
    (t.TD = "td"),
    (t.TH = "th"),
    (t.THEAD = "thead"),
    (t.TITLE = "title"),
    (t.TR = "tr"),
    (t.TRACK = "track"),
    (t.TT = "tt"),
    (t.U = "u"),
    (t.UL = "ul"),
    (t.SVG = "svg"),
    (t.VAR = "var"),
    (t.WBR = "wbr"),
    (t.XMP = "xmp");
})((m = m || (m = {})));
var s;
(function (t) {
  (t[(t.UNKNOWN = 0)] = "UNKNOWN"),
    (t[(t.A = 1)] = "A"),
    (t[(t.ADDRESS = 2)] = "ADDRESS"),
    (t[(t.ANNOTATION_XML = 3)] = "ANNOTATION_XML"),
    (t[(t.APPLET = 4)] = "APPLET"),
    (t[(t.AREA = 5)] = "AREA"),
    (t[(t.ARTICLE = 6)] = "ARTICLE"),
    (t[(t.ASIDE = 7)] = "ASIDE"),
    (t[(t.B = 8)] = "B"),
    (t[(t.BASE = 9)] = "BASE"),
    (t[(t.BASEFONT = 10)] = "BASEFONT"),
    (t[(t.BGSOUND = 11)] = "BGSOUND"),
    (t[(t.BIG = 12)] = "BIG"),
    (t[(t.BLOCKQUOTE = 13)] = "BLOCKQUOTE"),
    (t[(t.BODY = 14)] = "BODY"),
    (t[(t.BR = 15)] = "BR"),
    (t[(t.BUTTON = 16)] = "BUTTON"),
    (t[(t.CAPTION = 17)] = "CAPTION"),
    (t[(t.CENTER = 18)] = "CENTER"),
    (t[(t.CODE = 19)] = "CODE"),
    (t[(t.COL = 20)] = "COL"),
    (t[(t.COLGROUP = 21)] = "COLGROUP"),
    (t[(t.DD = 22)] = "DD"),
    (t[(t.DESC = 23)] = "DESC"),
    (t[(t.DETAILS = 24)] = "DETAILS"),
    (t[(t.DIALOG = 25)] = "DIALOG"),
    (t[(t.DIR = 26)] = "DIR"),
    (t[(t.DIV = 27)] = "DIV"),
    (t[(t.DL = 28)] = "DL"),
    (t[(t.DT = 29)] = "DT"),
    (t[(t.EM = 30)] = "EM"),
    (t[(t.EMBED = 31)] = "EMBED"),
    (t[(t.FIELDSET = 32)] = "FIELDSET"),
    (t[(t.FIGCAPTION = 33)] = "FIGCAPTION"),
    (t[(t.FIGURE = 34)] = "FIGURE"),
    (t[(t.FONT = 35)] = "FONT"),
    (t[(t.FOOTER = 36)] = "FOOTER"),
    (t[(t.FOREIGN_OBJECT = 37)] = "FOREIGN_OBJECT"),
    (t[(t.FORM = 38)] = "FORM"),
    (t[(t.FRAME = 39)] = "FRAME"),
    (t[(t.FRAMESET = 40)] = "FRAMESET"),
    (t[(t.H1 = 41)] = "H1"),
    (t[(t.H2 = 42)] = "H2"),
    (t[(t.H3 = 43)] = "H3"),
    (t[(t.H4 = 44)] = "H4"),
    (t[(t.H5 = 45)] = "H5"),
    (t[(t.H6 = 46)] = "H6"),
    (t[(t.HEAD = 47)] = "HEAD"),
    (t[(t.HEADER = 48)] = "HEADER"),
    (t[(t.HGROUP = 49)] = "HGROUP"),
    (t[(t.HR = 50)] = "HR"),
    (t[(t.HTML = 51)] = "HTML"),
    (t[(t.I = 52)] = "I"),
    (t[(t.IMG = 53)] = "IMG"),
    (t[(t.IMAGE = 54)] = "IMAGE"),
    (t[(t.INPUT = 55)] = "INPUT"),
    (t[(t.IFRAME = 56)] = "IFRAME"),
    (t[(t.KEYGEN = 57)] = "KEYGEN"),
    (t[(t.LABEL = 58)] = "LABEL"),
    (t[(t.LI = 59)] = "LI"),
    (t[(t.LINK = 60)] = "LINK"),
    (t[(t.LISTING = 61)] = "LISTING"),
    (t[(t.MAIN = 62)] = "MAIN"),
    (t[(t.MALIGNMARK = 63)] = "MALIGNMARK"),
    (t[(t.MARQUEE = 64)] = "MARQUEE"),
    (t[(t.MATH = 65)] = "MATH"),
    (t[(t.MENU = 66)] = "MENU"),
    (t[(t.META = 67)] = "META"),
    (t[(t.MGLYPH = 68)] = "MGLYPH"),
    (t[(t.MI = 69)] = "MI"),
    (t[(t.MO = 70)] = "MO"),
    (t[(t.MN = 71)] = "MN"),
    (t[(t.MS = 72)] = "MS"),
    (t[(t.MTEXT = 73)] = "MTEXT"),
    (t[(t.NAV = 74)] = "NAV"),
    (t[(t.NOBR = 75)] = "NOBR"),
    (t[(t.NOFRAMES = 76)] = "NOFRAMES"),
    (t[(t.NOEMBED = 77)] = "NOEMBED"),
    (t[(t.NOSCRIPT = 78)] = "NOSCRIPT"),
    (t[(t.OBJECT = 79)] = "OBJECT"),
    (t[(t.OL = 80)] = "OL"),
    (t[(t.OPTGROUP = 81)] = "OPTGROUP"),
    (t[(t.OPTION = 82)] = "OPTION"),
    (t[(t.P = 83)] = "P"),
    (t[(t.PARAM = 84)] = "PARAM"),
    (t[(t.PLAINTEXT = 85)] = "PLAINTEXT"),
    (t[(t.PRE = 86)] = "PRE"),
    (t[(t.RB = 87)] = "RB"),
    (t[(t.RP = 88)] = "RP"),
    (t[(t.RT = 89)] = "RT"),
    (t[(t.RTC = 90)] = "RTC"),
    (t[(t.RUBY = 91)] = "RUBY"),
    (t[(t.S = 92)] = "S"),
    (t[(t.SCRIPT = 93)] = "SCRIPT"),
    (t[(t.SECTION = 94)] = "SECTION"),
    (t[(t.SELECT = 95)] = "SELECT"),
    (t[(t.SOURCE = 96)] = "SOURCE"),
    (t[(t.SMALL = 97)] = "SMALL"),
    (t[(t.SPAN = 98)] = "SPAN"),
    (t[(t.STRIKE = 99)] = "STRIKE"),
    (t[(t.STRONG = 100)] = "STRONG"),
    (t[(t.STYLE = 101)] = "STYLE"),
    (t[(t.SUB = 102)] = "SUB"),
    (t[(t.SUMMARY = 103)] = "SUMMARY"),
    (t[(t.SUP = 104)] = "SUP"),
    (t[(t.TABLE = 105)] = "TABLE"),
    (t[(t.TBODY = 106)] = "TBODY"),
    (t[(t.TEMPLATE = 107)] = "TEMPLATE"),
    (t[(t.TEXTAREA = 108)] = "TEXTAREA"),
    (t[(t.TFOOT = 109)] = "TFOOT"),
    (t[(t.TD = 110)] = "TD"),
    (t[(t.TH = 111)] = "TH"),
    (t[(t.THEAD = 112)] = "THEAD"),
    (t[(t.TITLE = 113)] = "TITLE"),
    (t[(t.TR = 114)] = "TR"),
    (t[(t.TRACK = 115)] = "TRACK"),
    (t[(t.TT = 116)] = "TT"),
    (t[(t.U = 117)] = "U"),
    (t[(t.UL = 118)] = "UL"),
    (t[(t.SVG = 119)] = "SVG"),
    (t[(t.VAR = 120)] = "VAR"),
    (t[(t.WBR = 121)] = "WBR"),
    (t[(t.XMP = 122)] = "XMP");
})((s = s || (s = {})));
var Xa = new Map([
  [m.A, s.A],
  [m.ADDRESS, s.ADDRESS],
  [m.ANNOTATION_XML, s.ANNOTATION_XML],
  [m.APPLET, s.APPLET],
  [m.AREA, s.AREA],
  [m.ARTICLE, s.ARTICLE],
  [m.ASIDE, s.ASIDE],
  [m.B, s.B],
  [m.BASE, s.BASE],
  [m.BASEFONT, s.BASEFONT],
  [m.BGSOUND, s.BGSOUND],
  [m.BIG, s.BIG],
  [m.BLOCKQUOTE, s.BLOCKQUOTE],
  [m.BODY, s.BODY],
  [m.BR, s.BR],
  [m.BUTTON, s.BUTTON],
  [m.CAPTION, s.CAPTION],
  [m.CENTER, s.CENTER],
  [m.CODE, s.CODE],
  [m.COL, s.COL],
  [m.COLGROUP, s.COLGROUP],
  [m.DD, s.DD],
  [m.DESC, s.DESC],
  [m.DETAILS, s.DETAILS],
  [m.DIALOG, s.DIALOG],
  [m.DIR, s.DIR],
  [m.DIV, s.DIV],
  [m.DL, s.DL],
  [m.DT, s.DT],
  [m.EM, s.EM],
  [m.EMBED, s.EMBED],
  [m.FIELDSET, s.FIELDSET],
  [m.FIGCAPTION, s.FIGCAPTION],
  [m.FIGURE, s.FIGURE],
  [m.FONT, s.FONT],
  [m.FOOTER, s.FOOTER],
  [m.FOREIGN_OBJECT, s.FOREIGN_OBJECT],
  [m.FORM, s.FORM],
  [m.FRAME, s.FRAME],
  [m.FRAMESET, s.FRAMESET],
  [m.H1, s.H1],
  [m.H2, s.H2],
  [m.H3, s.H3],
  [m.H4, s.H4],
  [m.H5, s.H5],
  [m.H6, s.H6],
  [m.HEAD, s.HEAD],
  [m.HEADER, s.HEADER],
  [m.HGROUP, s.HGROUP],
  [m.HR, s.HR],
  [m.HTML, s.HTML],
  [m.I, s.I],
  [m.IMG, s.IMG],
  [m.IMAGE, s.IMAGE],
  [m.INPUT, s.INPUT],
  [m.IFRAME, s.IFRAME],
  [m.KEYGEN, s.KEYGEN],
  [m.LABEL, s.LABEL],
  [m.LI, s.LI],
  [m.LINK, s.LINK],
  [m.LISTING, s.LISTING],
  [m.MAIN, s.MAIN],
  [m.MALIGNMARK, s.MALIGNMARK],
  [m.MARQUEE, s.MARQUEE],
  [m.MATH, s.MATH],
  [m.MENU, s.MENU],
  [m.META, s.META],
  [m.MGLYPH, s.MGLYPH],
  [m.MI, s.MI],
  [m.MO, s.MO],
  [m.MN, s.MN],
  [m.MS, s.MS],
  [m.MTEXT, s.MTEXT],
  [m.NAV, s.NAV],
  [m.NOBR, s.NOBR],
  [m.NOFRAMES, s.NOFRAMES],
  [m.NOEMBED, s.NOEMBED],
  [m.NOSCRIPT, s.NOSCRIPT],
  [m.OBJECT, s.OBJECT],
  [m.OL, s.OL],
  [m.OPTGROUP, s.OPTGROUP],
  [m.OPTION, s.OPTION],
  [m.P, s.P],
  [m.PARAM, s.PARAM],
  [m.PLAINTEXT, s.PLAINTEXT],
  [m.PRE, s.PRE],
  [m.RB, s.RB],
  [m.RP, s.RP],
  [m.RT, s.RT],
  [m.RTC, s.RTC],
  [m.RUBY, s.RUBY],
  [m.S, s.S],
  [m.SCRIPT, s.SCRIPT],
  [m.SECTION, s.SECTION],
  [m.SELECT, s.SELECT],
  [m.SOURCE, s.SOURCE],
  [m.SMALL, s.SMALL],
  [m.SPAN, s.SPAN],
  [m.STRIKE, s.STRIKE],
  [m.STRONG, s.STRONG],
  [m.STYLE, s.STYLE],
  [m.SUB, s.SUB],
  [m.SUMMARY, s.SUMMARY],
  [m.SUP, s.SUP],
  [m.TABLE, s.TABLE],
  [m.TBODY, s.TBODY],
  [m.TEMPLATE, s.TEMPLATE],
  [m.TEXTAREA, s.TEXTAREA],
  [m.TFOOT, s.TFOOT],
  [m.TD, s.TD],
  [m.TH, s.TH],
  [m.THEAD, s.THEAD],
  [m.TITLE, s.TITLE],
  [m.TR, s.TR],
  [m.TRACK, s.TRACK],
  [m.TT, s.TT],
  [m.U, s.U],
  [m.UL, s.UL],
  [m.SVG, s.SVG],
  [m.VAR, s.VAR],
  [m.WBR, s.WBR],
  [m.XMP, s.XMP],
]);
function He(t) {
  var e;
  return (e = Xa.get(t)) !== null && e !== void 0 ? e : s.UNKNOWN;
}
var _ = s,
  Mn = {
    [p.HTML]: new Set([
      _.ADDRESS,
      _.APPLET,
      _.AREA,
      _.ARTICLE,
      _.ASIDE,
      _.BASE,
      _.BASEFONT,
      _.BGSOUND,
      _.BLOCKQUOTE,
      _.BODY,
      _.BR,
      _.BUTTON,
      _.CAPTION,
      _.CENTER,
      _.COL,
      _.COLGROUP,
      _.DD,
      _.DETAILS,
      _.DIR,
      _.DIV,
      _.DL,
      _.DT,
      _.EMBED,
      _.FIELDSET,
      _.FIGCAPTION,
      _.FIGURE,
      _.FOOTER,
      _.FORM,
      _.FRAME,
      _.FRAMESET,
      _.H1,
      _.H2,
      _.H3,
      _.H4,
      _.H5,
      _.H6,
      _.HEAD,
      _.HEADER,
      _.HGROUP,
      _.HR,
      _.HTML,
      _.IFRAME,
      _.IMG,
      _.INPUT,
      _.LI,
      _.LINK,
      _.LISTING,
      _.MAIN,
      _.MARQUEE,
      _.MENU,
      _.META,
      _.NAV,
      _.NOEMBED,
      _.NOFRAMES,
      _.NOSCRIPT,
      _.OBJECT,
      _.OL,
      _.P,
      _.PARAM,
      _.PLAINTEXT,
      _.PRE,
      _.SCRIPT,
      _.SECTION,
      _.SELECT,
      _.SOURCE,
      _.STYLE,
      _.SUMMARY,
      _.TABLE,
      _.TBODY,
      _.TD,
      _.TEMPLATE,
      _.TEXTAREA,
      _.TFOOT,
      _.TH,
      _.THEAD,
      _.TITLE,
      _.TR,
      _.TRACK,
      _.UL,
      _.WBR,
      _.XMP,
    ]),
    [p.MATHML]: new Set([_.MI, _.MO, _.MN, _.MS, _.MTEXT, _.ANNOTATION_XML]),
    [p.SVG]: new Set([_.TITLE, _.FOREIGN_OBJECT, _.DESC]),
    [p.XLINK]: new Set(),
    [p.XML]: new Set(),
    [p.XMLNS]: new Set(),
  };
function St(t) {
  return (
    t === _.H1 ||
    t === _.H2 ||
    t === _.H3 ||
    t === _.H4 ||
    t === _.H5 ||
    t === _.H6
  );
}
var Qa = new Set([
  m.STYLE,
  m.SCRIPT,
  m.XMP,
  m.IFRAME,
  m.NOEMBED,
  m.NOFRAMES,
  m.PLAINTEXT,
]);
function Vs(t, e) {
  return Qa.has(t) || (e && t === m.NOSCRIPT);
}
var Ka = new Map([
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376],
  ]),
  c;
(function (t) {
  (t[(t.DATA = 0)] = "DATA"),
    (t[(t.RCDATA = 1)] = "RCDATA"),
    (t[(t.RAWTEXT = 2)] = "RAWTEXT"),
    (t[(t.SCRIPT_DATA = 3)] = "SCRIPT_DATA"),
    (t[(t.PLAINTEXT = 4)] = "PLAINTEXT"),
    (t[(t.TAG_OPEN = 5)] = "TAG_OPEN"),
    (t[(t.END_TAG_OPEN = 6)] = "END_TAG_OPEN"),
    (t[(t.TAG_NAME = 7)] = "TAG_NAME"),
    (t[(t.RCDATA_LESS_THAN_SIGN = 8)] = "RCDATA_LESS_THAN_SIGN"),
    (t[(t.RCDATA_END_TAG_OPEN = 9)] = "RCDATA_END_TAG_OPEN"),
    (t[(t.RCDATA_END_TAG_NAME = 10)] = "RCDATA_END_TAG_NAME"),
    (t[(t.RAWTEXT_LESS_THAN_SIGN = 11)] = "RAWTEXT_LESS_THAN_SIGN"),
    (t[(t.RAWTEXT_END_TAG_OPEN = 12)] = "RAWTEXT_END_TAG_OPEN"),
    (t[(t.RAWTEXT_END_TAG_NAME = 13)] = "RAWTEXT_END_TAG_NAME"),
    (t[(t.SCRIPT_DATA_LESS_THAN_SIGN = 14)] = "SCRIPT_DATA_LESS_THAN_SIGN"),
    (t[(t.SCRIPT_DATA_END_TAG_OPEN = 15)] = "SCRIPT_DATA_END_TAG_OPEN"),
    (t[(t.SCRIPT_DATA_END_TAG_NAME = 16)] = "SCRIPT_DATA_END_TAG_NAME"),
    (t[(t.SCRIPT_DATA_ESCAPE_START = 17)] = "SCRIPT_DATA_ESCAPE_START"),
    (t[(t.SCRIPT_DATA_ESCAPE_START_DASH = 18)] =
      "SCRIPT_DATA_ESCAPE_START_DASH"),
    (t[(t.SCRIPT_DATA_ESCAPED = 19)] = "SCRIPT_DATA_ESCAPED"),
    (t[(t.SCRIPT_DATA_ESCAPED_DASH = 20)] = "SCRIPT_DATA_ESCAPED_DASH"),
    (t[(t.SCRIPT_DATA_ESCAPED_DASH_DASH = 21)] =
      "SCRIPT_DATA_ESCAPED_DASH_DASH"),
    (t[(t.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22)] =
      "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"),
    (t[(t.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23)] =
      "SCRIPT_DATA_ESCAPED_END_TAG_OPEN"),
    (t[(t.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24)] =
      "SCRIPT_DATA_ESCAPED_END_TAG_NAME"),
    (t[(t.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25)] =
      "SCRIPT_DATA_DOUBLE_ESCAPE_START"),
    (t[(t.SCRIPT_DATA_DOUBLE_ESCAPED = 26)] = "SCRIPT_DATA_DOUBLE_ESCAPED"),
    (t[(t.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27)] =
      "SCRIPT_DATA_DOUBLE_ESCAPED_DASH"),
    (t[(t.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28)] =
      "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"),
    (t[(t.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29)] =
      "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"),
    (t[(t.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30)] =
      "SCRIPT_DATA_DOUBLE_ESCAPE_END"),
    (t[(t.BEFORE_ATTRIBUTE_NAME = 31)] = "BEFORE_ATTRIBUTE_NAME"),
    (t[(t.ATTRIBUTE_NAME = 32)] = "ATTRIBUTE_NAME"),
    (t[(t.AFTER_ATTRIBUTE_NAME = 33)] = "AFTER_ATTRIBUTE_NAME"),
    (t[(t.BEFORE_ATTRIBUTE_VALUE = 34)] = "BEFORE_ATTRIBUTE_VALUE"),
    (t[(t.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35)] =
      "ATTRIBUTE_VALUE_DOUBLE_QUOTED"),
    (t[(t.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36)] =
      "ATTRIBUTE_VALUE_SINGLE_QUOTED"),
    (t[(t.ATTRIBUTE_VALUE_UNQUOTED = 37)] = "ATTRIBUTE_VALUE_UNQUOTED"),
    (t[(t.AFTER_ATTRIBUTE_VALUE_QUOTED = 38)] = "AFTER_ATTRIBUTE_VALUE_QUOTED"),
    (t[(t.SELF_CLOSING_START_TAG = 39)] = "SELF_CLOSING_START_TAG"),
    (t[(t.BOGUS_COMMENT = 40)] = "BOGUS_COMMENT"),
    (t[(t.MARKUP_DECLARATION_OPEN = 41)] = "MARKUP_DECLARATION_OPEN"),
    (t[(t.COMMENT_START = 42)] = "COMMENT_START"),
    (t[(t.COMMENT_START_DASH = 43)] = "COMMENT_START_DASH"),
    (t[(t.COMMENT = 44)] = "COMMENT"),
    (t[(t.COMMENT_LESS_THAN_SIGN = 45)] = "COMMENT_LESS_THAN_SIGN"),
    (t[(t.COMMENT_LESS_THAN_SIGN_BANG = 46)] = "COMMENT_LESS_THAN_SIGN_BANG"),
    (t[(t.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47)] =
      "COMMENT_LESS_THAN_SIGN_BANG_DASH"),
    (t[(t.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48)] =
      "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"),
    (t[(t.COMMENT_END_DASH = 49)] = "COMMENT_END_DASH"),
    (t[(t.COMMENT_END = 50)] = "COMMENT_END"),
    (t[(t.COMMENT_END_BANG = 51)] = "COMMENT_END_BANG"),
    (t[(t.DOCTYPE = 52)] = "DOCTYPE"),
    (t[(t.BEFORE_DOCTYPE_NAME = 53)] = "BEFORE_DOCTYPE_NAME"),
    (t[(t.DOCTYPE_NAME = 54)] = "DOCTYPE_NAME"),
    (t[(t.AFTER_DOCTYPE_NAME = 55)] = "AFTER_DOCTYPE_NAME"),
    (t[(t.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56)] = "AFTER_DOCTYPE_PUBLIC_KEYWORD"),
    (t[(t.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57)] =
      "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"),
    (t[(t.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58)] =
      "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"),
    (t[(t.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59)] =
      "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"),
    (t[(t.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60)] =
      "AFTER_DOCTYPE_PUBLIC_IDENTIFIER"),
    (t[(t.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61)] =
      "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"),
    (t[(t.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62)] = "AFTER_DOCTYPE_SYSTEM_KEYWORD"),
    (t[(t.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63)] =
      "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"),
    (t[(t.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64)] =
      "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"),
    (t[(t.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65)] =
      "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"),
    (t[(t.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66)] =
      "AFTER_DOCTYPE_SYSTEM_IDENTIFIER"),
    (t[(t.BOGUS_DOCTYPE = 67)] = "BOGUS_DOCTYPE"),
    (t[(t.CDATA_SECTION = 68)] = "CDATA_SECTION"),
    (t[(t.CDATA_SECTION_BRACKET = 69)] = "CDATA_SECTION_BRACKET"),
    (t[(t.CDATA_SECTION_END = 70)] = "CDATA_SECTION_END"),
    (t[(t.CHARACTER_REFERENCE = 71)] = "CHARACTER_REFERENCE"),
    (t[(t.NAMED_CHARACTER_REFERENCE = 72)] = "NAMED_CHARACTER_REFERENCE"),
    (t[(t.AMBIGUOUS_AMPERSAND = 73)] = "AMBIGUOUS_AMPERSAND"),
    (t[(t.NUMERIC_CHARACTER_REFERENCE = 74)] = "NUMERIC_CHARACTER_REFERENCE"),
    (t[(t.HEXADEMICAL_CHARACTER_REFERENCE_START = 75)] =
      "HEXADEMICAL_CHARACTER_REFERENCE_START"),
    (t[(t.HEXADEMICAL_CHARACTER_REFERENCE = 76)] =
      "HEXADEMICAL_CHARACTER_REFERENCE"),
    (t[(t.DECIMAL_CHARACTER_REFERENCE = 77)] = "DECIMAL_CHARACTER_REFERENCE"),
    (t[(t.NUMERIC_CHARACTER_REFERENCE_END = 78)] =
      "NUMERIC_CHARACTER_REFERENCE_END");
})(c || (c = {}));
var te = {
  DATA: c.DATA,
  RCDATA: c.RCDATA,
  RAWTEXT: c.RAWTEXT,
  SCRIPT_DATA: c.SCRIPT_DATA,
  PLAINTEXT: c.PLAINTEXT,
  CDATA_SECTION: c.CDATA_SECTION,
};
function Rt(t) {
  return t >= i.DIGIT_0 && t <= i.DIGIT_9;
}
function yt(t) {
  return t >= i.LATIN_CAPITAL_A && t <= i.LATIN_CAPITAL_Z;
}
function za(t) {
  return t >= i.LATIN_SMALL_A && t <= i.LATIN_SMALL_Z;
}
function we(t) {
  return za(t) || yt(t);
}
function kn(t) {
  return we(t) || Rt(t);
}
function Xs(t) {
  return t >= i.LATIN_CAPITAL_A && t <= i.LATIN_CAPITAL_F;
}
function Qs(t) {
  return t >= i.LATIN_SMALL_A && t <= i.LATIN_SMALL_F;
}
function ja(t) {
  return Rt(t) || Xs(t) || Qs(t);
}
function Ar(t) {
  return t + 32;
}
function Ks(t) {
  return (
    t === i.SPACE ||
    t === i.LINE_FEED ||
    t === i.TABULATION ||
    t === i.FORM_FEED
  );
}
function Ga(t) {
  return t === i.EQUALS_SIGN || kn(t);
}
function qs(t) {
  return Ks(t) || t === i.SOLIDUS || t === i.GREATER_THAN_SIGN;
}
var xt = class {
  constructor(e, r) {
    (this.options = e),
      (this.handler = r),
      (this.paused = !1),
      (this.inLoop = !1),
      (this.inForeignNode = !1),
      (this.lastStartTagName = ""),
      (this.active = !1),
      (this.state = c.DATA),
      (this.returnState = c.DATA),
      (this.charRefCode = -1),
      (this.consumedAfterSnapshot = -1),
      (this.currentCharacterToken = null),
      (this.currentToken = null),
      (this.currentAttr = { name: "", value: "" }),
      (this.preprocessor = new _r(r)),
      (this.currentLocation = this.getCurrentLocation(-1));
  }
  _err(e) {
    var r, n;
    (n = (r = this.handler).onParseError) === null ||
      n === void 0 ||
      n.call(r, this.preprocessor.getError(e));
  }
  getCurrentLocation(e) {
    return this.options.sourceCodeLocationInfo
      ? {
          startLine: this.preprocessor.line,
          startCol: this.preprocessor.col - e,
          startOffset: this.preprocessor.offset - e,
          endLine: -1,
          endCol: -1,
          endOffset: -1,
        }
      : null;
  }
  _runParsingLoop() {
    if (!this.inLoop) {
      for (this.inLoop = !0; this.active && !this.paused; ) {
        this.consumedAfterSnapshot = 0;
        let e = this._consume();
        this._ensureHibernation() || this._callState(e);
      }
      this.inLoop = !1;
    }
  }
  pause() {
    this.paused = !0;
  }
  resume(e) {
    if (!this.paused) throw new Error("Parser was already resumed");
    (this.paused = !1),
      !this.inLoop && (this._runParsingLoop(), this.paused || e == null || e());
  }
  write(e, r, n) {
    (this.active = !0),
      this.preprocessor.write(e, r),
      this._runParsingLoop(),
      this.paused || n == null || n();
  }
  insertHtmlAtCurrentPos(e) {
    (this.active = !0),
      this.preprocessor.insertHtmlAtCurrentPos(e),
      this._runParsingLoop();
  }
  _ensureHibernation() {
    return this.preprocessor.endOfChunkHit
      ? (this._unconsume(this.consumedAfterSnapshot), (this.active = !1), !0)
      : !1;
  }
  _consume() {
    return this.consumedAfterSnapshot++, this.preprocessor.advance();
  }
  _unconsume(e) {
    (this.consumedAfterSnapshot -= e), this.preprocessor.retreat(e);
  }
  _reconsumeInState(e, r) {
    (this.state = e), this._callState(r);
  }
  _advanceBy(e) {
    this.consumedAfterSnapshot += e;
    for (let r = 0; r < e; r++) this.preprocessor.advance();
  }
  _consumeSequenceIfMatch(e, r) {
    return this.preprocessor.startsWith(e, r)
      ? (this._advanceBy(e.length - 1), !0)
      : !1;
  }
  _createStartTagToken() {
    this.currentToken = {
      type: B.START_TAG,
      tagName: "",
      tagID: s.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(1),
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: B.END_TAG,
      tagName: "",
      tagID: s.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(2),
    };
  }
  _createCommentToken(e) {
    this.currentToken = {
      type: B.COMMENT,
      data: "",
      location: this.getCurrentLocation(e),
    };
  }
  _createDoctypeToken(e) {
    this.currentToken = {
      type: B.DOCTYPE,
      name: e,
      forceQuirks: !1,
      publicId: null,
      systemId: null,
      location: this.currentLocation,
    };
  }
  _createCharacterToken(e, r) {
    this.currentCharacterToken = {
      type: e,
      chars: r,
      location: this.currentLocation,
    };
  }
  _createAttr(e) {
    (this.currentAttr = { name: e, value: "" }),
      (this.currentLocation = this.getCurrentLocation(0));
  }
  _leaveAttrName() {
    var e, r;
    let n = this.currentToken;
    if (It(n, this.currentAttr.name) === null) {
      if (
        (n.attrs.push(this.currentAttr), n.location && this.currentLocation)
      ) {
        let u =
          (e = (r = n.location).attrs) !== null && e !== void 0
            ? e
            : (r.attrs = Object.create(null));
        (u[this.currentAttr.name] = this.currentLocation),
          this._leaveAttrValue();
      }
    } else this._err(E.duplicateAttribute);
  }
  _leaveAttrValue() {
    this.currentLocation &&
      ((this.currentLocation.endLine = this.preprocessor.line),
      (this.currentLocation.endCol = this.preprocessor.col),
      (this.currentLocation.endOffset = this.preprocessor.offset));
  }
  prepareToken(e) {
    this._emitCurrentCharacterToken(e.location),
      (this.currentToken = null),
      e.location &&
        ((e.location.endLine = this.preprocessor.line),
        (e.location.endCol = this.preprocessor.col + 1),
        (e.location.endOffset = this.preprocessor.offset + 1)),
      (this.currentLocation = this.getCurrentLocation(-1));
  }
  emitCurrentTagToken() {
    let e = this.currentToken;
    this.prepareToken(e),
      (e.tagID = He(e.tagName)),
      e.type === B.START_TAG
        ? ((this.lastStartTagName = e.tagName), this.handler.onStartTag(e))
        : (e.attrs.length > 0 && this._err(E.endTagWithAttributes),
          e.selfClosing && this._err(E.endTagWithTrailingSolidus),
          this.handler.onEndTag(e)),
      this.preprocessor.dropParsedChunk();
  }
  emitCurrentComment(e) {
    this.prepareToken(e),
      this.handler.onComment(e),
      this.preprocessor.dropParsedChunk();
  }
  emitCurrentDoctype(e) {
    this.prepareToken(e),
      this.handler.onDoctype(e),
      this.preprocessor.dropParsedChunk();
  }
  _emitCurrentCharacterToken(e) {
    if (this.currentCharacterToken) {
      switch (
        (e &&
          this.currentCharacterToken.location &&
          ((this.currentCharacterToken.location.endLine = e.startLine),
          (this.currentCharacterToken.location.endCol = e.startCol),
          (this.currentCharacterToken.location.endOffset = e.startOffset)),
        this.currentCharacterToken.type)
      ) {
        case B.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case B.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case B.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    let e = this.getCurrentLocation(0);
    e &&
      ((e.endLine = e.startLine),
      (e.endCol = e.startCol),
      (e.endOffset = e.startOffset)),
      this._emitCurrentCharacterToken(e),
      this.handler.onEof({ type: B.EOF, location: e }),
      (this.active = !1);
  }
  _appendCharToCurrentCharacterToken(e, r) {
    if (this.currentCharacterToken)
      if (this.currentCharacterToken.type !== e)
        (this.currentLocation = this.getCurrentLocation(0)),
          this._emitCurrentCharacterToken(this.currentLocation),
          this.preprocessor.dropParsedChunk();
      else {
        this.currentCharacterToken.chars += r;
        return;
      }
    this._createCharacterToken(e, r);
  }
  _emitCodePoint(e) {
    let r = Ks(e)
      ? B.WHITESPACE_CHARACTER
      : e === i.NULL
        ? B.NULL_CHARACTER
        : B.CHARACTER;
    this._appendCharToCurrentCharacterToken(r, String.fromCodePoint(e));
  }
  _emitChars(e) {
    this._appendCharToCurrentCharacterToken(B.CHARACTER, e);
  }
  _matchNamedCharacterReference(e) {
    let r = null,
      n = 0,
      u = !1;
    for (
      let o = 0, h = Ne[0];
      o >= 0 && ((o = Dn(Ne, h, o + 1, e)), !(o < 0));
      e = this._consume()
    ) {
      (n += 1), (h = Ne[o]);
      let T = h & pe.VALUE_LENGTH;
      if (T) {
        let A = (T >> 14) - 1;
        if (
          (e !== i.SEMICOLON &&
          this._isCharacterReferenceInAttribute() &&
          Ga(this.preprocessor.peek(1))
            ? ((r = [i.AMPERSAND]), (o += A))
            : ((r =
                A === 0
                  ? [Ne[o] & ~pe.VALUE_LENGTH]
                  : A === 1
                    ? [Ne[++o]]
                    : [Ne[++o], Ne[++o]]),
              (n = 0),
              (u = e !== i.SEMICOLON)),
          A === 0)
        ) {
          this._consume();
          break;
        }
      }
    }
    return (
      this._unconsume(n),
      u &&
        !this.preprocessor.endOfChunkHit &&
        this._err(E.missingSemicolonAfterCharacterReference),
      this._unconsume(1),
      r
    );
  }
  _isCharacterReferenceInAttribute() {
    return (
      this.returnState === c.ATTRIBUTE_VALUE_DOUBLE_QUOTED ||
      this.returnState === c.ATTRIBUTE_VALUE_SINGLE_QUOTED ||
      this.returnState === c.ATTRIBUTE_VALUE_UNQUOTED
    );
  }
  _flushCodePointConsumedAsCharacterReference(e) {
    this._isCharacterReferenceInAttribute()
      ? (this.currentAttr.value += String.fromCodePoint(e))
      : this._emitCodePoint(e);
  }
  _callState(e) {
    switch (this.state) {
      case c.DATA: {
        this._stateData(e);
        break;
      }
      case c.RCDATA: {
        this._stateRcdata(e);
        break;
      }
      case c.RAWTEXT: {
        this._stateRawtext(e);
        break;
      }
      case c.SCRIPT_DATA: {
        this._stateScriptData(e);
        break;
      }
      case c.PLAINTEXT: {
        this._statePlaintext(e);
        break;
      }
      case c.TAG_OPEN: {
        this._stateTagOpen(e);
        break;
      }
      case c.END_TAG_OPEN: {
        this._stateEndTagOpen(e);
        break;
      }
      case c.TAG_NAME: {
        this._stateTagName(e);
        break;
      }
      case c.RCDATA_LESS_THAN_SIGN: {
        this._stateRcdataLessThanSign(e);
        break;
      }
      case c.RCDATA_END_TAG_OPEN: {
        this._stateRcdataEndTagOpen(e);
        break;
      }
      case c.RCDATA_END_TAG_NAME: {
        this._stateRcdataEndTagName(e);
        break;
      }
      case c.RAWTEXT_LESS_THAN_SIGN: {
        this._stateRawtextLessThanSign(e);
        break;
      }
      case c.RAWTEXT_END_TAG_OPEN: {
        this._stateRawtextEndTagOpen(e);
        break;
      }
      case c.RAWTEXT_END_TAG_NAME: {
        this._stateRawtextEndTagName(e);
        break;
      }
      case c.SCRIPT_DATA_LESS_THAN_SIGN: {
        this._stateScriptDataLessThanSign(e);
        break;
      }
      case c.SCRIPT_DATA_END_TAG_OPEN: {
        this._stateScriptDataEndTagOpen(e);
        break;
      }
      case c.SCRIPT_DATA_END_TAG_NAME: {
        this._stateScriptDataEndTagName(e);
        break;
      }
      case c.SCRIPT_DATA_ESCAPE_START: {
        this._stateScriptDataEscapeStart(e);
        break;
      }
      case c.SCRIPT_DATA_ESCAPE_START_DASH: {
        this._stateScriptDataEscapeStartDash(e);
        break;
      }
      case c.SCRIPT_DATA_ESCAPED: {
        this._stateScriptDataEscaped(e);
        break;
      }
      case c.SCRIPT_DATA_ESCAPED_DASH: {
        this._stateScriptDataEscapedDash(e);
        break;
      }
      case c.SCRIPT_DATA_ESCAPED_DASH_DASH: {
        this._stateScriptDataEscapedDashDash(e);
        break;
      }
      case c.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataEscapedLessThanSign(e);
        break;
      }
      case c.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
        this._stateScriptDataEscapedEndTagOpen(e);
        break;
      }
      case c.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
        this._stateScriptDataEscapedEndTagName(e);
        break;
      }
      case c.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
        this._stateScriptDataDoubleEscapeStart(e);
        break;
      }
      case c.SCRIPT_DATA_DOUBLE_ESCAPED: {
        this._stateScriptDataDoubleEscaped(e);
        break;
      }
      case c.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
        this._stateScriptDataDoubleEscapedDash(e);
        break;
      }
      case c.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
        this._stateScriptDataDoubleEscapedDashDash(e);
        break;
      }
      case c.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataDoubleEscapedLessThanSign(e);
        break;
      }
      case c.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
        this._stateScriptDataDoubleEscapeEnd(e);
        break;
      }
      case c.BEFORE_ATTRIBUTE_NAME: {
        this._stateBeforeAttributeName(e);
        break;
      }
      case c.ATTRIBUTE_NAME: {
        this._stateAttributeName(e);
        break;
      }
      case c.AFTER_ATTRIBUTE_NAME: {
        this._stateAfterAttributeName(e);
        break;
      }
      case c.BEFORE_ATTRIBUTE_VALUE: {
        this._stateBeforeAttributeValue(e);
        break;
      }
      case c.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
        this._stateAttributeValueDoubleQuoted(e);
        break;
      }
      case c.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
        this._stateAttributeValueSingleQuoted(e);
        break;
      }
      case c.ATTRIBUTE_VALUE_UNQUOTED: {
        this._stateAttributeValueUnquoted(e);
        break;
      }
      case c.AFTER_ATTRIBUTE_VALUE_QUOTED: {
        this._stateAfterAttributeValueQuoted(e);
        break;
      }
      case c.SELF_CLOSING_START_TAG: {
        this._stateSelfClosingStartTag(e);
        break;
      }
      case c.BOGUS_COMMENT: {
        this._stateBogusComment(e);
        break;
      }
      case c.MARKUP_DECLARATION_OPEN: {
        this._stateMarkupDeclarationOpen(e);
        break;
      }
      case c.COMMENT_START: {
        this._stateCommentStart(e);
        break;
      }
      case c.COMMENT_START_DASH: {
        this._stateCommentStartDash(e);
        break;
      }
      case c.COMMENT: {
        this._stateComment(e);
        break;
      }
      case c.COMMENT_LESS_THAN_SIGN: {
        this._stateCommentLessThanSign(e);
        break;
      }
      case c.COMMENT_LESS_THAN_SIGN_BANG: {
        this._stateCommentLessThanSignBang(e);
        break;
      }
      case c.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
        this._stateCommentLessThanSignBangDash(e);
        break;
      }
      case c.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
        this._stateCommentLessThanSignBangDashDash(e);
        break;
      }
      case c.COMMENT_END_DASH: {
        this._stateCommentEndDash(e);
        break;
      }
      case c.COMMENT_END: {
        this._stateCommentEnd(e);
        break;
      }
      case c.COMMENT_END_BANG: {
        this._stateCommentEndBang(e);
        break;
      }
      case c.DOCTYPE: {
        this._stateDoctype(e);
        break;
      }
      case c.BEFORE_DOCTYPE_NAME: {
        this._stateBeforeDoctypeName(e);
        break;
      }
      case c.DOCTYPE_NAME: {
        this._stateDoctypeName(e);
        break;
      }
      case c.AFTER_DOCTYPE_NAME: {
        this._stateAfterDoctypeName(e);
        break;
      }
      case c.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
        this._stateAfterDoctypePublicKeyword(e);
        break;
      }
      case c.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateBeforeDoctypePublicIdentifier(e);
        break;
      }
      case c.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypePublicIdentifierDoubleQuoted(e);
        break;
      }
      case c.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypePublicIdentifierSingleQuoted(e);
        break;
      }
      case c.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateAfterDoctypePublicIdentifier(e);
        break;
      }
      case c.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
        this._stateBetweenDoctypePublicAndSystemIdentifiers(e);
        break;
      }
      case c.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
        this._stateAfterDoctypeSystemKeyword(e);
        break;
      }
      case c.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateBeforeDoctypeSystemIdentifier(e);
        break;
      }
      case c.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypeSystemIdentifierDoubleQuoted(e);
        break;
      }
      case c.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypeSystemIdentifierSingleQuoted(e);
        break;
      }
      case c.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateAfterDoctypeSystemIdentifier(e);
        break;
      }
      case c.BOGUS_DOCTYPE: {
        this._stateBogusDoctype(e);
        break;
      }
      case c.CDATA_SECTION: {
        this._stateCdataSection(e);
        break;
      }
      case c.CDATA_SECTION_BRACKET: {
        this._stateCdataSectionBracket(e);
        break;
      }
      case c.CDATA_SECTION_END: {
        this._stateCdataSectionEnd(e);
        break;
      }
      case c.CHARACTER_REFERENCE: {
        this._stateCharacterReference(e);
        break;
      }
      case c.NAMED_CHARACTER_REFERENCE: {
        this._stateNamedCharacterReference(e);
        break;
      }
      case c.AMBIGUOUS_AMPERSAND: {
        this._stateAmbiguousAmpersand(e);
        break;
      }
      case c.NUMERIC_CHARACTER_REFERENCE: {
        this._stateNumericCharacterReference(e);
        break;
      }
      case c.HEXADEMICAL_CHARACTER_REFERENCE_START: {
        this._stateHexademicalCharacterReferenceStart(e);
        break;
      }
      case c.HEXADEMICAL_CHARACTER_REFERENCE: {
        this._stateHexademicalCharacterReference(e);
        break;
      }
      case c.DECIMAL_CHARACTER_REFERENCE: {
        this._stateDecimalCharacterReference(e);
        break;
      }
      case c.NUMERIC_CHARACTER_REFERENCE_END: {
        this._stateNumericCharacterReferenceEnd(e);
        break;
      }
      default:
        throw new Error("Unknown state");
    }
  }
  _stateData(e) {
    switch (e) {
      case i.LESS_THAN_SIGN: {
        this.state = c.TAG_OPEN;
        break;
      }
      case i.AMPERSAND: {
        (this.returnState = c.DATA), (this.state = c.CHARACTER_REFERENCE);
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), this._emitCodePoint(e);
        break;
      }
      case i.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  _stateRcdata(e) {
    switch (e) {
      case i.AMPERSAND: {
        (this.returnState = c.RCDATA), (this.state = c.CHARACTER_REFERENCE);
        break;
      }
      case i.LESS_THAN_SIGN: {
        this.state = c.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), this._emitChars(q);
        break;
      }
      case i.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  _stateRawtext(e) {
    switch (e) {
      case i.LESS_THAN_SIGN: {
        this.state = c.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), this._emitChars(q);
        break;
      }
      case i.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  _stateScriptData(e) {
    switch (e) {
      case i.LESS_THAN_SIGN: {
        this.state = c.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), this._emitChars(q);
        break;
      }
      case i.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  _statePlaintext(e) {
    switch (e) {
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), this._emitChars(q);
        break;
      }
      case i.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  _stateTagOpen(e) {
    if (we(e))
      this._createStartTagToken(),
        (this.state = c.TAG_NAME),
        this._stateTagName(e);
    else
      switch (e) {
        case i.EXCLAMATION_MARK: {
          this.state = c.MARKUP_DECLARATION_OPEN;
          break;
        }
        case i.SOLIDUS: {
          this.state = c.END_TAG_OPEN;
          break;
        }
        case i.QUESTION_MARK: {
          this._err(E.unexpectedQuestionMarkInsteadOfTagName),
            this._createCommentToken(1),
            (this.state = c.BOGUS_COMMENT),
            this._stateBogusComment(e);
          break;
        }
        case i.EOF: {
          this._err(E.eofBeforeTagName),
            this._emitChars("<"),
            this._emitEOFToken();
          break;
        }
        default:
          this._err(E.invalidFirstCharacterOfTagName),
            this._emitChars("<"),
            (this.state = c.DATA),
            this._stateData(e);
      }
  }
  _stateEndTagOpen(e) {
    if (we(e))
      this._createEndTagToken(),
        (this.state = c.TAG_NAME),
        this._stateTagName(e);
    else
      switch (e) {
        case i.GREATER_THAN_SIGN: {
          this._err(E.missingEndTagName), (this.state = c.DATA);
          break;
        }
        case i.EOF: {
          this._err(E.eofBeforeTagName),
            this._emitChars("</"),
            this._emitEOFToken();
          break;
        }
        default:
          this._err(E.invalidFirstCharacterOfTagName),
            this._createCommentToken(2),
            (this.state = c.BOGUS_COMMENT),
            this._stateBogusComment(e);
      }
  }
  _stateTagName(e) {
    let r = this.currentToken;
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED: {
        this.state = c.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case i.SOLIDUS: {
        this.state = c.SELF_CLOSING_START_TAG;
        break;
      }
      case i.GREATER_THAN_SIGN: {
        (this.state = c.DATA), this.emitCurrentTagToken();
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), (r.tagName += q);
        break;
      }
      case i.EOF: {
        this._err(E.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        r.tagName += String.fromCodePoint(yt(e) ? Ar(e) : e);
    }
  }
  _stateRcdataLessThanSign(e) {
    e === i.SOLIDUS
      ? (this.state = c.RCDATA_END_TAG_OPEN)
      : (this._emitChars("<"), (this.state = c.RCDATA), this._stateRcdata(e));
  }
  _stateRcdataEndTagOpen(e) {
    we(e)
      ? ((this.state = c.RCDATA_END_TAG_NAME), this._stateRcdataEndTagName(e))
      : (this._emitChars("</"), (this.state = c.RCDATA), this._stateRcdata(e));
  }
  handleSpecialEndTag(e) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
      return !this._ensureHibernation();
    this._createEndTagToken();
    let r = this.currentToken;
    switch (
      ((r.tagName = this.lastStartTagName),
      this.preprocessor.peek(this.lastStartTagName.length))
    ) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED:
        return (
          this._advanceBy(this.lastStartTagName.length),
          (this.state = c.BEFORE_ATTRIBUTE_NAME),
          !1
        );
      case i.SOLIDUS:
        return (
          this._advanceBy(this.lastStartTagName.length),
          (this.state = c.SELF_CLOSING_START_TAG),
          !1
        );
      case i.GREATER_THAN_SIGN:
        return (
          this._advanceBy(this.lastStartTagName.length),
          this.emitCurrentTagToken(),
          (this.state = c.DATA),
          !1
        );
      default:
        return !this._ensureHibernation();
    }
  }
  _stateRcdataEndTagName(e) {
    this.handleSpecialEndTag(e) &&
      (this._emitChars("</"), (this.state = c.RCDATA), this._stateRcdata(e));
  }
  _stateRawtextLessThanSign(e) {
    e === i.SOLIDUS
      ? (this.state = c.RAWTEXT_END_TAG_OPEN)
      : (this._emitChars("<"), (this.state = c.RAWTEXT), this._stateRawtext(e));
  }
  _stateRawtextEndTagOpen(e) {
    we(e)
      ? ((this.state = c.RAWTEXT_END_TAG_NAME), this._stateRawtextEndTagName(e))
      : (this._emitChars("</"),
        (this.state = c.RAWTEXT),
        this._stateRawtext(e));
  }
  _stateRawtextEndTagName(e) {
    this.handleSpecialEndTag(e) &&
      (this._emitChars("</"), (this.state = c.RAWTEXT), this._stateRawtext(e));
  }
  _stateScriptDataLessThanSign(e) {
    switch (e) {
      case i.SOLIDUS: {
        this.state = c.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case i.EXCLAMATION_MARK: {
        (this.state = c.SCRIPT_DATA_ESCAPE_START), this._emitChars("<!");
        break;
      }
      default:
        this._emitChars("<"),
          (this.state = c.SCRIPT_DATA),
          this._stateScriptData(e);
    }
  }
  _stateScriptDataEndTagOpen(e) {
    we(e)
      ? ((this.state = c.SCRIPT_DATA_END_TAG_NAME),
        this._stateScriptDataEndTagName(e))
      : (this._emitChars("</"),
        (this.state = c.SCRIPT_DATA),
        this._stateScriptData(e));
  }
  _stateScriptDataEndTagName(e) {
    this.handleSpecialEndTag(e) &&
      (this._emitChars("</"),
      (this.state = c.SCRIPT_DATA),
      this._stateScriptData(e));
  }
  _stateScriptDataEscapeStart(e) {
    e === i.HYPHEN_MINUS
      ? ((this.state = c.SCRIPT_DATA_ESCAPE_START_DASH), this._emitChars("-"))
      : ((this.state = c.SCRIPT_DATA), this._stateScriptData(e));
  }
  _stateScriptDataEscapeStartDash(e) {
    e === i.HYPHEN_MINUS
      ? ((this.state = c.SCRIPT_DATA_ESCAPED_DASH_DASH), this._emitChars("-"))
      : ((this.state = c.SCRIPT_DATA), this._stateScriptData(e));
  }
  _stateScriptDataEscaped(e) {
    switch (e) {
      case i.HYPHEN_MINUS: {
        (this.state = c.SCRIPT_DATA_ESCAPED_DASH), this._emitChars("-");
        break;
      }
      case i.LESS_THAN_SIGN: {
        this.state = c.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), this._emitChars(q);
        break;
      }
      case i.EOF: {
        this._err(E.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  _stateScriptDataEscapedDash(e) {
    switch (e) {
      case i.HYPHEN_MINUS: {
        (this.state = c.SCRIPT_DATA_ESCAPED_DASH_DASH), this._emitChars("-");
        break;
      }
      case i.LESS_THAN_SIGN: {
        this.state = c.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter),
          (this.state = c.SCRIPT_DATA_ESCAPED),
          this._emitChars(q);
        break;
      }
      case i.EOF: {
        this._err(E.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        (this.state = c.SCRIPT_DATA_ESCAPED), this._emitCodePoint(e);
    }
  }
  _stateScriptDataEscapedDashDash(e) {
    switch (e) {
      case i.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case i.LESS_THAN_SIGN: {
        this.state = c.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case i.GREATER_THAN_SIGN: {
        (this.state = c.SCRIPT_DATA), this._emitChars(">");
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter),
          (this.state = c.SCRIPT_DATA_ESCAPED),
          this._emitChars(q);
        break;
      }
      case i.EOF: {
        this._err(E.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        (this.state = c.SCRIPT_DATA_ESCAPED), this._emitCodePoint(e);
    }
  }
  _stateScriptDataEscapedLessThanSign(e) {
    e === i.SOLIDUS
      ? (this.state = c.SCRIPT_DATA_ESCAPED_END_TAG_OPEN)
      : we(e)
        ? (this._emitChars("<"),
          (this.state = c.SCRIPT_DATA_DOUBLE_ESCAPE_START),
          this._stateScriptDataDoubleEscapeStart(e))
        : (this._emitChars("<"),
          (this.state = c.SCRIPT_DATA_ESCAPED),
          this._stateScriptDataEscaped(e));
  }
  _stateScriptDataEscapedEndTagOpen(e) {
    we(e)
      ? ((this.state = c.SCRIPT_DATA_ESCAPED_END_TAG_NAME),
        this._stateScriptDataEscapedEndTagName(e))
      : (this._emitChars("</"),
        (this.state = c.SCRIPT_DATA_ESCAPED),
        this._stateScriptDataEscaped(e));
  }
  _stateScriptDataEscapedEndTagName(e) {
    this.handleSpecialEndTag(e) &&
      (this._emitChars("</"),
      (this.state = c.SCRIPT_DATA_ESCAPED),
      this._stateScriptDataEscaped(e));
  }
  _stateScriptDataDoubleEscapeStart(e) {
    if (
      this.preprocessor.startsWith(se.SCRIPT, !1) &&
      qs(this.preprocessor.peek(se.SCRIPT.length))
    ) {
      this._emitCodePoint(e);
      for (let r = 0; r < se.SCRIPT.length; r++)
        this._emitCodePoint(this._consume());
      this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else
      this._ensureHibernation() ||
        ((this.state = c.SCRIPT_DATA_ESCAPED), this._stateScriptDataEscaped(e));
  }
  _stateScriptDataDoubleEscaped(e) {
    switch (e) {
      case i.HYPHEN_MINUS: {
        (this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED_DASH), this._emitChars("-");
        break;
      }
      case i.LESS_THAN_SIGN: {
        (this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
          this._emitChars("<");
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), this._emitChars(q);
        break;
      }
      case i.EOF: {
        this._err(E.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  _stateScriptDataDoubleEscapedDash(e) {
    switch (e) {
      case i.HYPHEN_MINUS: {
        (this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH),
          this._emitChars("-");
        break;
      }
      case i.LESS_THAN_SIGN: {
        (this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
          this._emitChars("<");
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter),
          (this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED),
          this._emitChars(q);
        break;
      }
      case i.EOF: {
        this._err(E.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        (this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED), this._emitCodePoint(e);
    }
  }
  _stateScriptDataDoubleEscapedDashDash(e) {
    switch (e) {
      case i.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case i.LESS_THAN_SIGN: {
        (this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
          this._emitChars("<");
        break;
      }
      case i.GREATER_THAN_SIGN: {
        (this.state = c.SCRIPT_DATA), this._emitChars(">");
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter),
          (this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED),
          this._emitChars(q);
        break;
      }
      case i.EOF: {
        this._err(E.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        (this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED), this._emitCodePoint(e);
    }
  }
  _stateScriptDataDoubleEscapedLessThanSign(e) {
    e === i.SOLIDUS
      ? ((this.state = c.SCRIPT_DATA_DOUBLE_ESCAPE_END), this._emitChars("/"))
      : ((this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED),
        this._stateScriptDataDoubleEscaped(e));
  }
  _stateScriptDataDoubleEscapeEnd(e) {
    if (
      this.preprocessor.startsWith(se.SCRIPT, !1) &&
      qs(this.preprocessor.peek(se.SCRIPT.length))
    ) {
      this._emitCodePoint(e);
      for (let r = 0; r < se.SCRIPT.length; r++)
        this._emitCodePoint(this._consume());
      this.state = c.SCRIPT_DATA_ESCAPED;
    } else
      this._ensureHibernation() ||
        ((this.state = c.SCRIPT_DATA_DOUBLE_ESCAPED),
        this._stateScriptDataDoubleEscaped(e));
  }
  _stateBeforeAttributeName(e) {
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED:
        break;
      case i.SOLIDUS:
      case i.GREATER_THAN_SIGN:
      case i.EOF: {
        (this.state = c.AFTER_ATTRIBUTE_NAME), this._stateAfterAttributeName(e);
        break;
      }
      case i.EQUALS_SIGN: {
        this._err(E.unexpectedEqualsSignBeforeAttributeName),
          this._createAttr("="),
          (this.state = c.ATTRIBUTE_NAME);
        break;
      }
      default:
        this._createAttr(""),
          (this.state = c.ATTRIBUTE_NAME),
          this._stateAttributeName(e);
    }
  }
  _stateAttributeName(e) {
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED:
      case i.SOLIDUS:
      case i.GREATER_THAN_SIGN:
      case i.EOF: {
        this._leaveAttrName(),
          (this.state = c.AFTER_ATTRIBUTE_NAME),
          this._stateAfterAttributeName(e);
        break;
      }
      case i.EQUALS_SIGN: {
        this._leaveAttrName(), (this.state = c.BEFORE_ATTRIBUTE_VALUE);
        break;
      }
      case i.QUOTATION_MARK:
      case i.APOSTROPHE:
      case i.LESS_THAN_SIGN: {
        this._err(E.unexpectedCharacterInAttributeName),
          (this.currentAttr.name += String.fromCodePoint(e));
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), (this.currentAttr.name += q);
        break;
      }
      default:
        this.currentAttr.name += String.fromCodePoint(yt(e) ? Ar(e) : e);
    }
  }
  _stateAfterAttributeName(e) {
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED:
        break;
      case i.SOLIDUS: {
        this.state = c.SELF_CLOSING_START_TAG;
        break;
      }
      case i.EQUALS_SIGN: {
        this.state = c.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case i.GREATER_THAN_SIGN: {
        (this.state = c.DATA), this.emitCurrentTagToken();
        break;
      }
      case i.EOF: {
        this._err(E.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._createAttr(""),
          (this.state = c.ATTRIBUTE_NAME),
          this._stateAttributeName(e);
    }
  }
  _stateBeforeAttributeValue(e) {
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED:
        break;
      case i.QUOTATION_MARK: {
        this.state = c.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case i.APOSTROPHE: {
        this.state = c.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case i.GREATER_THAN_SIGN: {
        this._err(E.missingAttributeValue),
          (this.state = c.DATA),
          this.emitCurrentTagToken();
        break;
      }
      default:
        (this.state = c.ATTRIBUTE_VALUE_UNQUOTED),
          this._stateAttributeValueUnquoted(e);
    }
  }
  _stateAttributeValueDoubleQuoted(e) {
    switch (e) {
      case i.QUOTATION_MARK: {
        this.state = c.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case i.AMPERSAND: {
        (this.returnState = c.ATTRIBUTE_VALUE_DOUBLE_QUOTED),
          (this.state = c.CHARACTER_REFERENCE);
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), (this.currentAttr.value += q);
        break;
      }
      case i.EOF: {
        this._err(E.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(e);
    }
  }
  _stateAttributeValueSingleQuoted(e) {
    switch (e) {
      case i.APOSTROPHE: {
        this.state = c.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case i.AMPERSAND: {
        (this.returnState = c.ATTRIBUTE_VALUE_SINGLE_QUOTED),
          (this.state = c.CHARACTER_REFERENCE);
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), (this.currentAttr.value += q);
        break;
      }
      case i.EOF: {
        this._err(E.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(e);
    }
  }
  _stateAttributeValueUnquoted(e) {
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED: {
        this._leaveAttrValue(), (this.state = c.BEFORE_ATTRIBUTE_NAME);
        break;
      }
      case i.AMPERSAND: {
        (this.returnState = c.ATTRIBUTE_VALUE_UNQUOTED),
          (this.state = c.CHARACTER_REFERENCE);
        break;
      }
      case i.GREATER_THAN_SIGN: {
        this._leaveAttrValue(),
          (this.state = c.DATA),
          this.emitCurrentTagToken();
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), (this.currentAttr.value += q);
        break;
      }
      case i.QUOTATION_MARK:
      case i.APOSTROPHE:
      case i.LESS_THAN_SIGN:
      case i.EQUALS_SIGN:
      case i.GRAVE_ACCENT: {
        this._err(E.unexpectedCharacterInUnquotedAttributeValue),
          (this.currentAttr.value += String.fromCodePoint(e));
        break;
      }
      case i.EOF: {
        this._err(E.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(e);
    }
  }
  _stateAfterAttributeValueQuoted(e) {
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED: {
        this._leaveAttrValue(), (this.state = c.BEFORE_ATTRIBUTE_NAME);
        break;
      }
      case i.SOLIDUS: {
        this._leaveAttrValue(), (this.state = c.SELF_CLOSING_START_TAG);
        break;
      }
      case i.GREATER_THAN_SIGN: {
        this._leaveAttrValue(),
          (this.state = c.DATA),
          this.emitCurrentTagToken();
        break;
      }
      case i.EOF: {
        this._err(E.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingWhitespaceBetweenAttributes),
          (this.state = c.BEFORE_ATTRIBUTE_NAME),
          this._stateBeforeAttributeName(e);
    }
  }
  _stateSelfClosingStartTag(e) {
    switch (e) {
      case i.GREATER_THAN_SIGN: {
        let r = this.currentToken;
        (r.selfClosing = !0), (this.state = c.DATA), this.emitCurrentTagToken();
        break;
      }
      case i.EOF: {
        this._err(E.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(E.unexpectedSolidusInTag),
          (this.state = c.BEFORE_ATTRIBUTE_NAME),
          this._stateBeforeAttributeName(e);
    }
  }
  _stateBogusComment(e) {
    let r = this.currentToken;
    switch (e) {
      case i.GREATER_THAN_SIGN: {
        (this.state = c.DATA), this.emitCurrentComment(r);
        break;
      }
      case i.EOF: {
        this.emitCurrentComment(r), this._emitEOFToken();
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), (r.data += q);
        break;
      }
      default:
        r.data += String.fromCodePoint(e);
    }
  }
  _stateMarkupDeclarationOpen(e) {
    this._consumeSequenceIfMatch(se.DASH_DASH, !0)
      ? (this._createCommentToken(se.DASH_DASH.length + 1),
        (this.state = c.COMMENT_START))
      : this._consumeSequenceIfMatch(se.DOCTYPE, !1)
        ? ((this.currentLocation = this.getCurrentLocation(
            se.DOCTYPE.length + 1,
          )),
          (this.state = c.DOCTYPE))
        : this._consumeSequenceIfMatch(se.CDATA_START, !0)
          ? this.inForeignNode
            ? (this.state = c.CDATA_SECTION)
            : (this._err(E.cdataInHtmlContent),
              this._createCommentToken(se.CDATA_START.length + 1),
              (this.currentToken.data = "[CDATA["),
              (this.state = c.BOGUS_COMMENT))
          : this._ensureHibernation() ||
            (this._err(E.incorrectlyOpenedComment),
            this._createCommentToken(2),
            (this.state = c.BOGUS_COMMENT),
            this._stateBogusComment(e));
  }
  _stateCommentStart(e) {
    switch (e) {
      case i.HYPHEN_MINUS: {
        this.state = c.COMMENT_START_DASH;
        break;
      }
      case i.GREATER_THAN_SIGN: {
        this._err(E.abruptClosingOfEmptyComment), (this.state = c.DATA);
        let r = this.currentToken;
        this.emitCurrentComment(r);
        break;
      }
      default:
        (this.state = c.COMMENT), this._stateComment(e);
    }
  }
  _stateCommentStartDash(e) {
    let r = this.currentToken;
    switch (e) {
      case i.HYPHEN_MINUS: {
        this.state = c.COMMENT_END;
        break;
      }
      case i.GREATER_THAN_SIGN: {
        this._err(E.abruptClosingOfEmptyComment),
          (this.state = c.DATA),
          this.emitCurrentComment(r);
        break;
      }
      case i.EOF: {
        this._err(E.eofInComment),
          this.emitCurrentComment(r),
          this._emitEOFToken();
        break;
      }
      default:
        (r.data += "-"), (this.state = c.COMMENT), this._stateComment(e);
    }
  }
  _stateComment(e) {
    let r = this.currentToken;
    switch (e) {
      case i.HYPHEN_MINUS: {
        this.state = c.COMMENT_END_DASH;
        break;
      }
      case i.LESS_THAN_SIGN: {
        (r.data += "<"), (this.state = c.COMMENT_LESS_THAN_SIGN);
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), (r.data += q);
        break;
      }
      case i.EOF: {
        this._err(E.eofInComment),
          this.emitCurrentComment(r),
          this._emitEOFToken();
        break;
      }
      default:
        r.data += String.fromCodePoint(e);
    }
  }
  _stateCommentLessThanSign(e) {
    let r = this.currentToken;
    switch (e) {
      case i.EXCLAMATION_MARK: {
        (r.data += "!"), (this.state = c.COMMENT_LESS_THAN_SIGN_BANG);
        break;
      }
      case i.LESS_THAN_SIGN: {
        r.data += "<";
        break;
      }
      default:
        (this.state = c.COMMENT), this._stateComment(e);
    }
  }
  _stateCommentLessThanSignBang(e) {
    e === i.HYPHEN_MINUS
      ? (this.state = c.COMMENT_LESS_THAN_SIGN_BANG_DASH)
      : ((this.state = c.COMMENT), this._stateComment(e));
  }
  _stateCommentLessThanSignBangDash(e) {
    e === i.HYPHEN_MINUS
      ? (this.state = c.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH)
      : ((this.state = c.COMMENT_END_DASH), this._stateCommentEndDash(e));
  }
  _stateCommentLessThanSignBangDashDash(e) {
    e !== i.GREATER_THAN_SIGN && e !== i.EOF && this._err(E.nestedComment),
      (this.state = c.COMMENT_END),
      this._stateCommentEnd(e);
  }
  _stateCommentEndDash(e) {
    let r = this.currentToken;
    switch (e) {
      case i.HYPHEN_MINUS: {
        this.state = c.COMMENT_END;
        break;
      }
      case i.EOF: {
        this._err(E.eofInComment),
          this.emitCurrentComment(r),
          this._emitEOFToken();
        break;
      }
      default:
        (r.data += "-"), (this.state = c.COMMENT), this._stateComment(e);
    }
  }
  _stateCommentEnd(e) {
    let r = this.currentToken;
    switch (e) {
      case i.GREATER_THAN_SIGN: {
        (this.state = c.DATA), this.emitCurrentComment(r);
        break;
      }
      case i.EXCLAMATION_MARK: {
        this.state = c.COMMENT_END_BANG;
        break;
      }
      case i.HYPHEN_MINUS: {
        r.data += "-";
        break;
      }
      case i.EOF: {
        this._err(E.eofInComment),
          this.emitCurrentComment(r),
          this._emitEOFToken();
        break;
      }
      default:
        (r.data += "--"), (this.state = c.COMMENT), this._stateComment(e);
    }
  }
  _stateCommentEndBang(e) {
    let r = this.currentToken;
    switch (e) {
      case i.HYPHEN_MINUS: {
        (r.data += "--!"), (this.state = c.COMMENT_END_DASH);
        break;
      }
      case i.GREATER_THAN_SIGN: {
        this._err(E.incorrectlyClosedComment),
          (this.state = c.DATA),
          this.emitCurrentComment(r);
        break;
      }
      case i.EOF: {
        this._err(E.eofInComment),
          this.emitCurrentComment(r),
          this._emitEOFToken();
        break;
      }
      default:
        (r.data += "--!"), (this.state = c.COMMENT), this._stateComment(e);
    }
  }
  _stateDoctype(e) {
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED: {
        this.state = c.BEFORE_DOCTYPE_NAME;
        break;
      }
      case i.GREATER_THAN_SIGN: {
        (this.state = c.BEFORE_DOCTYPE_NAME), this._stateBeforeDoctypeName(e);
        break;
      }
      case i.EOF: {
        this._err(E.eofInDoctype), this._createDoctypeToken(null);
        let r = this.currentToken;
        (r.forceQuirks = !0), this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingWhitespaceBeforeDoctypeName),
          (this.state = c.BEFORE_DOCTYPE_NAME),
          this._stateBeforeDoctypeName(e);
    }
  }
  _stateBeforeDoctypeName(e) {
    if (yt(e))
      this._createDoctypeToken(String.fromCharCode(Ar(e))),
        (this.state = c.DOCTYPE_NAME);
    else
      switch (e) {
        case i.SPACE:
        case i.LINE_FEED:
        case i.TABULATION:
        case i.FORM_FEED:
          break;
        case i.NULL: {
          this._err(E.unexpectedNullCharacter),
            this._createDoctypeToken(q),
            (this.state = c.DOCTYPE_NAME);
          break;
        }
        case i.GREATER_THAN_SIGN: {
          this._err(E.missingDoctypeName), this._createDoctypeToken(null);
          let r = this.currentToken;
          (r.forceQuirks = !0),
            this.emitCurrentDoctype(r),
            (this.state = c.DATA);
          break;
        }
        case i.EOF: {
          this._err(E.eofInDoctype), this._createDoctypeToken(null);
          let r = this.currentToken;
          (r.forceQuirks = !0),
            this.emitCurrentDoctype(r),
            this._emitEOFToken();
          break;
        }
        default:
          this._createDoctypeToken(String.fromCodePoint(e)),
            (this.state = c.DOCTYPE_NAME);
      }
  }
  _stateDoctypeName(e) {
    let r = this.currentToken;
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED: {
        this.state = c.AFTER_DOCTYPE_NAME;
        break;
      }
      case i.GREATER_THAN_SIGN: {
        (this.state = c.DATA), this.emitCurrentDoctype(r);
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), (r.name += q);
        break;
      }
      case i.EOF: {
        this._err(E.eofInDoctype),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          this._emitEOFToken();
        break;
      }
      default:
        r.name += String.fromCodePoint(yt(e) ? Ar(e) : e);
    }
  }
  _stateAfterDoctypeName(e) {
    let r = this.currentToken;
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED:
        break;
      case i.GREATER_THAN_SIGN: {
        (this.state = c.DATA), this.emitCurrentDoctype(r);
        break;
      }
      case i.EOF: {
        this._err(E.eofInDoctype),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          this._emitEOFToken();
        break;
      }
      default:
        this._consumeSequenceIfMatch(se.PUBLIC, !1)
          ? (this.state = c.AFTER_DOCTYPE_PUBLIC_KEYWORD)
          : this._consumeSequenceIfMatch(se.SYSTEM, !1)
            ? (this.state = c.AFTER_DOCTYPE_SYSTEM_KEYWORD)
            : this._ensureHibernation() ||
              (this._err(E.invalidCharacterSequenceAfterDoctypeName),
              (r.forceQuirks = !0),
              (this.state = c.BOGUS_DOCTYPE),
              this._stateBogusDoctype(e));
    }
  }
  _stateAfterDoctypePublicKeyword(e) {
    let r = this.currentToken;
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED: {
        this.state = c.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case i.QUOTATION_MARK: {
        this._err(E.missingWhitespaceAfterDoctypePublicKeyword),
          (r.publicId = ""),
          (this.state = c.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED);
        break;
      }
      case i.APOSTROPHE: {
        this._err(E.missingWhitespaceAfterDoctypePublicKeyword),
          (r.publicId = ""),
          (this.state = c.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED);
        break;
      }
      case i.GREATER_THAN_SIGN: {
        this._err(E.missingDoctypePublicIdentifier),
          (r.forceQuirks = !0),
          (this.state = c.DATA),
          this.emitCurrentDoctype(r);
        break;
      }
      case i.EOF: {
        this._err(E.eofInDoctype),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingQuoteBeforeDoctypePublicIdentifier),
          (r.forceQuirks = !0),
          (this.state = c.BOGUS_DOCTYPE),
          this._stateBogusDoctype(e);
    }
  }
  _stateBeforeDoctypePublicIdentifier(e) {
    let r = this.currentToken;
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED:
        break;
      case i.QUOTATION_MARK: {
        (r.publicId = ""),
          (this.state = c.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED);
        break;
      }
      case i.APOSTROPHE: {
        (r.publicId = ""),
          (this.state = c.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED);
        break;
      }
      case i.GREATER_THAN_SIGN: {
        this._err(E.missingDoctypePublicIdentifier),
          (r.forceQuirks = !0),
          (this.state = c.DATA),
          this.emitCurrentDoctype(r);
        break;
      }
      case i.EOF: {
        this._err(E.eofInDoctype),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingQuoteBeforeDoctypePublicIdentifier),
          (r.forceQuirks = !0),
          (this.state = c.BOGUS_DOCTYPE),
          this._stateBogusDoctype(e);
    }
  }
  _stateDoctypePublicIdentifierDoubleQuoted(e) {
    let r = this.currentToken;
    switch (e) {
      case i.QUOTATION_MARK: {
        this.state = c.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), (r.publicId += q);
        break;
      }
      case i.GREATER_THAN_SIGN: {
        this._err(E.abruptDoctypePublicIdentifier),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          (this.state = c.DATA);
        break;
      }
      case i.EOF: {
        this._err(E.eofInDoctype),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          this._emitEOFToken();
        break;
      }
      default:
        r.publicId += String.fromCodePoint(e);
    }
  }
  _stateDoctypePublicIdentifierSingleQuoted(e) {
    let r = this.currentToken;
    switch (e) {
      case i.APOSTROPHE: {
        this.state = c.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), (r.publicId += q);
        break;
      }
      case i.GREATER_THAN_SIGN: {
        this._err(E.abruptDoctypePublicIdentifier),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          (this.state = c.DATA);
        break;
      }
      case i.EOF: {
        this._err(E.eofInDoctype),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          this._emitEOFToken();
        break;
      }
      default:
        r.publicId += String.fromCodePoint(e);
    }
  }
  _stateAfterDoctypePublicIdentifier(e) {
    let r = this.currentToken;
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED: {
        this.state = c.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case i.GREATER_THAN_SIGN: {
        (this.state = c.DATA), this.emitCurrentDoctype(r);
        break;
      }
      case i.QUOTATION_MARK: {
        this._err(E.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers),
          (r.systemId = ""),
          (this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
        break;
      }
      case i.APOSTROPHE: {
        this._err(E.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers),
          (r.systemId = ""),
          (this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
        break;
      }
      case i.EOF: {
        this._err(E.eofInDoctype),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingQuoteBeforeDoctypeSystemIdentifier),
          (r.forceQuirks = !0),
          (this.state = c.BOGUS_DOCTYPE),
          this._stateBogusDoctype(e);
    }
  }
  _stateBetweenDoctypePublicAndSystemIdentifiers(e) {
    let r = this.currentToken;
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED:
        break;
      case i.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(r), (this.state = c.DATA);
        break;
      }
      case i.QUOTATION_MARK: {
        (r.systemId = ""),
          (this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
        break;
      }
      case i.APOSTROPHE: {
        (r.systemId = ""),
          (this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
        break;
      }
      case i.EOF: {
        this._err(E.eofInDoctype),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingQuoteBeforeDoctypeSystemIdentifier),
          (r.forceQuirks = !0),
          (this.state = c.BOGUS_DOCTYPE),
          this._stateBogusDoctype(e);
    }
  }
  _stateAfterDoctypeSystemKeyword(e) {
    let r = this.currentToken;
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED: {
        this.state = c.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case i.QUOTATION_MARK: {
        this._err(E.missingWhitespaceAfterDoctypeSystemKeyword),
          (r.systemId = ""),
          (this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
        break;
      }
      case i.APOSTROPHE: {
        this._err(E.missingWhitespaceAfterDoctypeSystemKeyword),
          (r.systemId = ""),
          (this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
        break;
      }
      case i.GREATER_THAN_SIGN: {
        this._err(E.missingDoctypeSystemIdentifier),
          (r.forceQuirks = !0),
          (this.state = c.DATA),
          this.emitCurrentDoctype(r);
        break;
      }
      case i.EOF: {
        this._err(E.eofInDoctype),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingQuoteBeforeDoctypeSystemIdentifier),
          (r.forceQuirks = !0),
          (this.state = c.BOGUS_DOCTYPE),
          this._stateBogusDoctype(e);
    }
  }
  _stateBeforeDoctypeSystemIdentifier(e) {
    let r = this.currentToken;
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED:
        break;
      case i.QUOTATION_MARK: {
        (r.systemId = ""),
          (this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
        break;
      }
      case i.APOSTROPHE: {
        (r.systemId = ""),
          (this.state = c.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
        break;
      }
      case i.GREATER_THAN_SIGN: {
        this._err(E.missingDoctypeSystemIdentifier),
          (r.forceQuirks = !0),
          (this.state = c.DATA),
          this.emitCurrentDoctype(r);
        break;
      }
      case i.EOF: {
        this._err(E.eofInDoctype),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          this._emitEOFToken();
        break;
      }
      default:
        this._err(E.missingQuoteBeforeDoctypeSystemIdentifier),
          (r.forceQuirks = !0),
          (this.state = c.BOGUS_DOCTYPE),
          this._stateBogusDoctype(e);
    }
  }
  _stateDoctypeSystemIdentifierDoubleQuoted(e) {
    let r = this.currentToken;
    switch (e) {
      case i.QUOTATION_MARK: {
        this.state = c.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), (r.systemId += q);
        break;
      }
      case i.GREATER_THAN_SIGN: {
        this._err(E.abruptDoctypeSystemIdentifier),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          (this.state = c.DATA);
        break;
      }
      case i.EOF: {
        this._err(E.eofInDoctype),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          this._emitEOFToken();
        break;
      }
      default:
        r.systemId += String.fromCodePoint(e);
    }
  }
  _stateDoctypeSystemIdentifierSingleQuoted(e) {
    let r = this.currentToken;
    switch (e) {
      case i.APOSTROPHE: {
        this.state = c.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter), (r.systemId += q);
        break;
      }
      case i.GREATER_THAN_SIGN: {
        this._err(E.abruptDoctypeSystemIdentifier),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          (this.state = c.DATA);
        break;
      }
      case i.EOF: {
        this._err(E.eofInDoctype),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          this._emitEOFToken();
        break;
      }
      default:
        r.systemId += String.fromCodePoint(e);
    }
  }
  _stateAfterDoctypeSystemIdentifier(e) {
    let r = this.currentToken;
    switch (e) {
      case i.SPACE:
      case i.LINE_FEED:
      case i.TABULATION:
      case i.FORM_FEED:
        break;
      case i.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(r), (this.state = c.DATA);
        break;
      }
      case i.EOF: {
        this._err(E.eofInDoctype),
          (r.forceQuirks = !0),
          this.emitCurrentDoctype(r),
          this._emitEOFToken();
        break;
      }
      default:
        this._err(E.unexpectedCharacterAfterDoctypeSystemIdentifier),
          (this.state = c.BOGUS_DOCTYPE),
          this._stateBogusDoctype(e);
    }
  }
  _stateBogusDoctype(e) {
    let r = this.currentToken;
    switch (e) {
      case i.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(r), (this.state = c.DATA);
        break;
      }
      case i.NULL: {
        this._err(E.unexpectedNullCharacter);
        break;
      }
      case i.EOF: {
        this.emitCurrentDoctype(r), this._emitEOFToken();
        break;
      }
      default:
    }
  }
  _stateCdataSection(e) {
    switch (e) {
      case i.RIGHT_SQUARE_BRACKET: {
        this.state = c.CDATA_SECTION_BRACKET;
        break;
      }
      case i.EOF: {
        this._err(E.eofInCdata), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  _stateCdataSectionBracket(e) {
    e === i.RIGHT_SQUARE_BRACKET
      ? (this.state = c.CDATA_SECTION_END)
      : (this._emitChars("]"),
        (this.state = c.CDATA_SECTION),
        this._stateCdataSection(e));
  }
  _stateCdataSectionEnd(e) {
    switch (e) {
      case i.GREATER_THAN_SIGN: {
        this.state = c.DATA;
        break;
      }
      case i.RIGHT_SQUARE_BRACKET: {
        this._emitChars("]");
        break;
      }
      default:
        this._emitChars("]]"),
          (this.state = c.CDATA_SECTION),
          this._stateCdataSection(e);
    }
  }
  _stateCharacterReference(e) {
    e === i.NUMBER_SIGN
      ? (this.state = c.NUMERIC_CHARACTER_REFERENCE)
      : kn(e)
        ? ((this.state = c.NAMED_CHARACTER_REFERENCE),
          this._stateNamedCharacterReference(e))
        : (this._flushCodePointConsumedAsCharacterReference(i.AMPERSAND),
          this._reconsumeInState(this.returnState, e));
  }
  _stateNamedCharacterReference(e) {
    let r = this._matchNamedCharacterReference(e);
    if (!this._ensureHibernation())
      if (r) {
        for (let n = 0; n < r.length; n++)
          this._flushCodePointConsumedAsCharacterReference(r[n]);
        this.state = this.returnState;
      } else
        this._flushCodePointConsumedAsCharacterReference(i.AMPERSAND),
          (this.state = c.AMBIGUOUS_AMPERSAND);
  }
  _stateAmbiguousAmpersand(e) {
    kn(e)
      ? this._flushCodePointConsumedAsCharacterReference(e)
      : (e === i.SEMICOLON && this._err(E.unknownNamedCharacterReference),
        this._reconsumeInState(this.returnState, e));
  }
  _stateNumericCharacterReference(e) {
    (this.charRefCode = 0),
      e === i.LATIN_SMALL_X || e === i.LATIN_CAPITAL_X
        ? (this.state = c.HEXADEMICAL_CHARACTER_REFERENCE_START)
        : Rt(e)
          ? ((this.state = c.DECIMAL_CHARACTER_REFERENCE),
            this._stateDecimalCharacterReference(e))
          : (this._err(E.absenceOfDigitsInNumericCharacterReference),
            this._flushCodePointConsumedAsCharacterReference(i.AMPERSAND),
            this._flushCodePointConsumedAsCharacterReference(i.NUMBER_SIGN),
            this._reconsumeInState(this.returnState, e));
  }
  _stateHexademicalCharacterReferenceStart(e) {
    ja(e)
      ? ((this.state = c.HEXADEMICAL_CHARACTER_REFERENCE),
        this._stateHexademicalCharacterReference(e))
      : (this._err(E.absenceOfDigitsInNumericCharacterReference),
        this._flushCodePointConsumedAsCharacterReference(i.AMPERSAND),
        this._flushCodePointConsumedAsCharacterReference(i.NUMBER_SIGN),
        this._unconsume(2),
        (this.state = this.returnState));
  }
  _stateHexademicalCharacterReference(e) {
    Xs(e)
      ? (this.charRefCode = this.charRefCode * 16 + e - 55)
      : Qs(e)
        ? (this.charRefCode = this.charRefCode * 16 + e - 87)
        : Rt(e)
          ? (this.charRefCode = this.charRefCode * 16 + e - 48)
          : e === i.SEMICOLON
            ? (this.state = c.NUMERIC_CHARACTER_REFERENCE_END)
            : (this._err(E.missingSemicolonAfterCharacterReference),
              (this.state = c.NUMERIC_CHARACTER_REFERENCE_END),
              this._stateNumericCharacterReferenceEnd(e));
  }
  _stateDecimalCharacterReference(e) {
    Rt(e)
      ? (this.charRefCode = this.charRefCode * 10 + e - 48)
      : e === i.SEMICOLON
        ? (this.state = c.NUMERIC_CHARACTER_REFERENCE_END)
        : (this._err(E.missingSemicolonAfterCharacterReference),
          (this.state = c.NUMERIC_CHARACTER_REFERENCE_END),
          this._stateNumericCharacterReferenceEnd(e));
  }
  _stateNumericCharacterReferenceEnd(e) {
    if (this.charRefCode === i.NULL)
      this._err(E.nullCharacterReference),
        (this.charRefCode = i.REPLACEMENT_CHARACTER);
    else if (this.charRefCode > 1114111)
      this._err(E.characterReferenceOutsideUnicodeRange),
        (this.charRefCode = i.REPLACEMENT_CHARACTER);
    else if (pr(this.charRefCode))
      this._err(E.surrogateCharacterReference),
        (this.charRefCode = i.REPLACEMENT_CHARACTER);
    else if (br(this.charRefCode)) this._err(E.noncharacterCharacterReference);
    else if (gr(this.charRefCode) || this.charRefCode === i.CARRIAGE_RETURN) {
      this._err(E.controlCharacterReference);
      let r = Ka.get(this.charRefCode);
      r !== void 0 && (this.charRefCode = r);
    }
    this._flushCodePointConsumedAsCharacterReference(this.charRefCode),
      this._reconsumeInState(this.returnState, e);
  }
};
var js = new Set([
    s.DD,
    s.DT,
    s.LI,
    s.OPTGROUP,
    s.OPTION,
    s.P,
    s.RB,
    s.RP,
    s.RT,
    s.RTC,
  ]),
  zs = new Set([
    ...js,
    s.CAPTION,
    s.COLGROUP,
    s.TBODY,
    s.TD,
    s.TFOOT,
    s.TH,
    s.THEAD,
    s.TR,
  ]),
  Cr = new Map([
    [s.APPLET, p.HTML],
    [s.CAPTION, p.HTML],
    [s.HTML, p.HTML],
    [s.MARQUEE, p.HTML],
    [s.OBJECT, p.HTML],
    [s.TABLE, p.HTML],
    [s.TD, p.HTML],
    [s.TEMPLATE, p.HTML],
    [s.TH, p.HTML],
    [s.ANNOTATION_XML, p.MATHML],
    [s.MI, p.MATHML],
    [s.MN, p.MATHML],
    [s.MO, p.MATHML],
    [s.MS, p.MATHML],
    [s.MTEXT, p.MATHML],
    [s.DESC, p.SVG],
    [s.FOREIGN_OBJECT, p.SVG],
    [s.TITLE, p.SVG],
  ]),
  $a = [s.H1, s.H2, s.H3, s.H4, s.H5, s.H6],
  Ja = [s.TR, s.TEMPLATE, s.HTML],
  Za = [s.TBODY, s.TFOOT, s.THEAD, s.TEMPLATE, s.HTML],
  ei = [s.TABLE, s.TEMPLATE, s.HTML],
  ti = [s.TD, s.TH],
  Nr = class {
    get currentTmplContentOrNode() {
      return this._isInTemplate()
        ? this.treeAdapter.getTemplateContent(this.current)
        : this.current;
    }
    constructor(e, r, n) {
      (this.treeAdapter = r),
        (this.handler = n),
        (this.items = []),
        (this.tagIDs = []),
        (this.stackTop = -1),
        (this.tmplCount = 0),
        (this.currentTagId = s.UNKNOWN),
        (this.current = e);
    }
    _indexOf(e) {
      return this.items.lastIndexOf(e, this.stackTop);
    }
    _isInTemplate() {
      return (
        this.currentTagId === s.TEMPLATE &&
        this.treeAdapter.getNamespaceURI(this.current) === p.HTML
      );
    }
    _updateCurrentElement() {
      (this.current = this.items[this.stackTop]),
        (this.currentTagId = this.tagIDs[this.stackTop]);
    }
    push(e, r) {
      this.stackTop++,
        (this.items[this.stackTop] = e),
        (this.current = e),
        (this.tagIDs[this.stackTop] = r),
        (this.currentTagId = r),
        this._isInTemplate() && this.tmplCount++,
        this.handler.onItemPush(e, r, !0);
    }
    pop() {
      let e = this.current;
      this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--,
        this.stackTop--,
        this._updateCurrentElement(),
        this.handler.onItemPop(e, !0);
    }
    replace(e, r) {
      let n = this._indexOf(e);
      (this.items[n] = r), n === this.stackTop && (this.current = r);
    }
    insertAfter(e, r, n) {
      let u = this._indexOf(e) + 1;
      this.items.splice(u, 0, r),
        this.tagIDs.splice(u, 0, n),
        this.stackTop++,
        u === this.stackTop && this._updateCurrentElement(),
        this.handler.onItemPush(
          this.current,
          this.currentTagId,
          u === this.stackTop,
        );
    }
    popUntilTagNamePopped(e) {
      let r = this.stackTop + 1;
      do {
        r = this.tagIDs.lastIndexOf(e, r - 1);
      } while (
        r > 0 &&
        this.treeAdapter.getNamespaceURI(this.items[r]) !== p.HTML
      );
      this.shortenToLength(r < 0 ? 0 : r);
    }
    shortenToLength(e) {
      for (; this.stackTop >= e; ) {
        let r = this.current;
        this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1),
          this.stackTop--,
          this._updateCurrentElement(),
          this.handler.onItemPop(r, this.stackTop < e);
      }
    }
    popUntilElementPopped(e) {
      let r = this._indexOf(e);
      this.shortenToLength(r < 0 ? 0 : r);
    }
    popUntilPopped(e, r) {
      let n = this._indexOfTagNames(e, r);
      this.shortenToLength(n < 0 ? 0 : n);
    }
    popUntilNumberedHeaderPopped() {
      this.popUntilPopped($a, p.HTML);
    }
    popUntilTableCellPopped() {
      this.popUntilPopped(ti, p.HTML);
    }
    popAllUpToHtmlElement() {
      (this.tmplCount = 0), this.shortenToLength(1);
    }
    _indexOfTagNames(e, r) {
      for (let n = this.stackTop; n >= 0; n--)
        if (
          e.includes(this.tagIDs[n]) &&
          this.treeAdapter.getNamespaceURI(this.items[n]) === r
        )
          return n;
      return -1;
    }
    clearBackTo(e, r) {
      let n = this._indexOfTagNames(e, r);
      this.shortenToLength(n + 1);
    }
    clearBackToTableContext() {
      this.clearBackTo(ei, p.HTML);
    }
    clearBackToTableBodyContext() {
      this.clearBackTo(Za, p.HTML);
    }
    clearBackToTableRowContext() {
      this.clearBackTo(Ja, p.HTML);
    }
    remove(e) {
      let r = this._indexOf(e);
      r >= 0 &&
        (r === this.stackTop
          ? this.pop()
          : (this.items.splice(r, 1),
            this.tagIDs.splice(r, 1),
            this.stackTop--,
            this._updateCurrentElement(),
            this.handler.onItemPop(e, !1)));
    }
    tryPeekProperlyNestedBodyElement() {
      return this.stackTop >= 1 && this.tagIDs[1] === s.BODY
        ? this.items[1]
        : null;
    }
    contains(e) {
      return this._indexOf(e) > -1;
    }
    getCommonAncestor(e) {
      let r = this._indexOf(e) - 1;
      return r >= 0 ? this.items[r] : null;
    }
    isRootHtmlElementCurrent() {
      return this.stackTop === 0 && this.tagIDs[0] === s.HTML;
    }
    hasInScope(e) {
      for (let r = this.stackTop; r >= 0; r--) {
        let n = this.tagIDs[r],
          u = this.treeAdapter.getNamespaceURI(this.items[r]);
        if (n === e && u === p.HTML) return !0;
        if (Cr.get(n) === u) return !1;
      }
      return !0;
    }
    hasNumberedHeaderInScope() {
      for (let e = this.stackTop; e >= 0; e--) {
        let r = this.tagIDs[e],
          n = this.treeAdapter.getNamespaceURI(this.items[e]);
        if (St(r) && n === p.HTML) return !0;
        if (Cr.get(r) === n) return !1;
      }
      return !0;
    }
    hasInListItemScope(e) {
      for (let r = this.stackTop; r >= 0; r--) {
        let n = this.tagIDs[r],
          u = this.treeAdapter.getNamespaceURI(this.items[r]);
        if (n === e && u === p.HTML) return !0;
        if (((n === s.UL || n === s.OL) && u === p.HTML) || Cr.get(n) === u)
          return !1;
      }
      return !0;
    }
    hasInButtonScope(e) {
      for (let r = this.stackTop; r >= 0; r--) {
        let n = this.tagIDs[r],
          u = this.treeAdapter.getNamespaceURI(this.items[r]);
        if (n === e && u === p.HTML) return !0;
        if ((n === s.BUTTON && u === p.HTML) || Cr.get(n) === u) return !1;
      }
      return !0;
    }
    hasInTableScope(e) {
      for (let r = this.stackTop; r >= 0; r--) {
        let n = this.tagIDs[r];
        if (this.treeAdapter.getNamespaceURI(this.items[r]) === p.HTML) {
          if (n === e) return !0;
          if (n === s.TABLE || n === s.TEMPLATE || n === s.HTML) return !1;
        }
      }
      return !0;
    }
    hasTableBodyContextInTableScope() {
      for (let e = this.stackTop; e >= 0; e--) {
        let r = this.tagIDs[e];
        if (this.treeAdapter.getNamespaceURI(this.items[e]) === p.HTML) {
          if (r === s.TBODY || r === s.THEAD || r === s.TFOOT) return !0;
          if (r === s.TABLE || r === s.HTML) return !1;
        }
      }
      return !0;
    }
    hasInSelectScope(e) {
      for (let r = this.stackTop; r >= 0; r--) {
        let n = this.tagIDs[r];
        if (this.treeAdapter.getNamespaceURI(this.items[r]) === p.HTML) {
          if (n === e) return !0;
          if (n !== s.OPTION && n !== s.OPTGROUP) return !1;
        }
      }
      return !0;
    }
    generateImpliedEndTags() {
      for (; js.has(this.currentTagId); ) this.pop();
    }
    generateImpliedEndTagsThoroughly() {
      for (; zs.has(this.currentTagId); ) this.pop();
    }
    generateImpliedEndTagsWithExclusion(e) {
      for (; this.currentTagId !== e && zs.has(this.currentTagId); ) this.pop();
    }
  };
var he;
(function (t) {
  (t[(t.Marker = 0)] = "Marker"), (t[(t.Element = 1)] = "Element");
})((he = he || (he = {})));
var Gs = { type: he.Marker },
  Ir = class {
    constructor(e) {
      (this.treeAdapter = e), (this.entries = []), (this.bookmark = null);
    }
    _getNoahArkConditionCandidates(e, r) {
      let n = [],
        u = r.length,
        o = this.treeAdapter.getTagName(e),
        h = this.treeAdapter.getNamespaceURI(e);
      for (let T = 0; T < this.entries.length; T++) {
        let A = this.entries[T];
        if (A.type === he.Marker) break;
        let { element: y } = A;
        if (
          this.treeAdapter.getTagName(y) === o &&
          this.treeAdapter.getNamespaceURI(y) === h
        ) {
          let M = this.treeAdapter.getAttrList(y);
          M.length === u && n.push({ idx: T, attrs: M });
        }
      }
      return n;
    }
    _ensureNoahArkCondition(e) {
      if (this.entries.length < 3) return;
      let r = this.treeAdapter.getAttrList(e),
        n = this._getNoahArkConditionCandidates(e, r);
      if (n.length < 3) return;
      let u = new Map(r.map((h) => [h.name, h.value])),
        o = 0;
      for (let h = 0; h < n.length; h++) {
        let T = n[h];
        T.attrs.every((A) => u.get(A.name) === A.value) &&
          ((o += 1), o >= 3 && this.entries.splice(T.idx, 1));
      }
    }
    insertMarker() {
      this.entries.unshift(Gs);
    }
    pushElement(e, r) {
      this._ensureNoahArkCondition(e),
        this.entries.unshift({ type: he.Element, element: e, token: r });
    }
    insertElementAfterBookmark(e, r) {
      let n = this.entries.indexOf(this.bookmark);
      this.entries.splice(n, 0, { type: he.Element, element: e, token: r });
    }
    removeEntry(e) {
      let r = this.entries.indexOf(e);
      r >= 0 && this.entries.splice(r, 1);
    }
    clearToLastMarker() {
      let e = this.entries.indexOf(Gs);
      e >= 0 ? this.entries.splice(0, e + 1) : (this.entries.length = 0);
    }
    getElementEntryInScopeWithTagName(e) {
      let r = this.entries.find(
        (n) =>
          n.type === he.Marker || this.treeAdapter.getTagName(n.element) === e,
      );
      return r && r.type === he.Element ? r : null;
    }
    getElementEntry(e) {
      return this.entries.find((r) => r.type === he.Element && r.element === e);
    }
  };
function $s(t) {
  return { nodeName: "#text", value: t, parentNode: null };
}
var Le = {
  createDocument() {
    return { nodeName: "#document", mode: J.NO_QUIRKS, childNodes: [] };
  },
  createDocumentFragment() {
    return { nodeName: "#document-fragment", childNodes: [] };
  },
  createElement(t, e, r) {
    return {
      nodeName: t,
      tagName: t,
      attrs: r,
      namespaceURI: e,
      childNodes: [],
      parentNode: null,
    };
  },
  createCommentNode(t) {
    return { nodeName: "#comment", data: t, parentNode: null };
  },
  appendChild(t, e) {
    t.childNodes.push(e), (e.parentNode = t);
  },
  insertBefore(t, e, r) {
    let n = t.childNodes.indexOf(r);
    t.childNodes.splice(n, 0, e), (e.parentNode = t);
  },
  setTemplateContent(t, e) {
    t.content = e;
  },
  getTemplateContent(t) {
    return t.content;
  },
  setDocumentType(t, e, r, n) {
    let u = t.childNodes.find((o) => o.nodeName === "#documentType");
    if (u) (u.name = e), (u.publicId = r), (u.systemId = n);
    else {
      let o = {
        nodeName: "#documentType",
        name: e,
        publicId: r,
        systemId: n,
        parentNode: null,
      };
      Le.appendChild(t, o);
    }
  },
  setDocumentMode(t, e) {
    t.mode = e;
  },
  getDocumentMode(t) {
    return t.mode;
  },
  detachNode(t) {
    if (t.parentNode) {
      let e = t.parentNode.childNodes.indexOf(t);
      t.parentNode.childNodes.splice(e, 1), (t.parentNode = null);
    }
  },
  insertText(t, e) {
    if (t.childNodes.length > 0) {
      let r = t.childNodes[t.childNodes.length - 1];
      if (Le.isTextNode(r)) {
        r.value += e;
        return;
      }
    }
    Le.appendChild(t, $s(e));
  },
  insertTextBefore(t, e, r) {
    let n = t.childNodes[t.childNodes.indexOf(r) - 1];
    n && Le.isTextNode(n) ? (n.value += e) : Le.insertBefore(t, $s(e), r);
  },
  adoptAttributes(t, e) {
    let r = new Set(t.attrs.map((n) => n.name));
    for (let n = 0; n < e.length; n++) r.has(e[n].name) || t.attrs.push(e[n]);
  },
  getFirstChild(t) {
    return t.childNodes[0];
  },
  getChildNodes(t) {
    return t.childNodes;
  },
  getParentNode(t) {
    return t.parentNode;
  },
  getAttrList(t) {
    return t.attrs;
  },
  getTagName(t) {
    return t.tagName;
  },
  getNamespaceURI(t) {
    return t.namespaceURI;
  },
  getTextNodeContent(t) {
    return t.value;
  },
  getCommentNodeContent(t) {
    return t.data;
  },
  getDocumentTypeNodeName(t) {
    return t.name;
  },
  getDocumentTypeNodePublicId(t) {
    return t.publicId;
  },
  getDocumentTypeNodeSystemId(t) {
    return t.systemId;
  },
  isTextNode(t) {
    return t.nodeName === "#text";
  },
  isCommentNode(t) {
    return t.nodeName === "#comment";
  },
  isDocumentTypeNode(t) {
    return t.nodeName === "#documentType";
  },
  isElementNode(t) {
    return Object.prototype.hasOwnProperty.call(t, "tagName");
  },
  setNodeSourceCodeLocation(t, e) {
    t.sourceCodeLocation = e;
  },
  getNodeSourceCodeLocation(t) {
    return t.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(t, e) {
    t.sourceCodeLocation = { ...t.sourceCodeLocation, ...e };
  },
};
var Zs = "html",
  ri = "about:legacy-compat",
  ni = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd",
  eu = [
    "+//silmaril//dtd html pro v0r11 19970101//",
    "-//as//dtd html 3.0 aswedit + extensions//",
    "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
    "-//ietf//dtd html 2.0 level 1//",
    "-//ietf//dtd html 2.0 level 2//",
    "-//ietf//dtd html 2.0 strict level 1//",
    "-//ietf//dtd html 2.0 strict level 2//",
    "-//ietf//dtd html 2.0 strict//",
    "-//ietf//dtd html 2.0//",
    "-//ietf//dtd html 2.1e//",
    "-//ietf//dtd html 3.0//",
    "-//ietf//dtd html 3.2 final//",
    "-//ietf//dtd html 3.2//",
    "-//ietf//dtd html 3//",
    "-//ietf//dtd html level 0//",
    "-//ietf//dtd html level 1//",
    "-//ietf//dtd html level 2//",
    "-//ietf//dtd html level 3//",
    "-//ietf//dtd html strict level 0//",
    "-//ietf//dtd html strict level 1//",
    "-//ietf//dtd html strict level 2//",
    "-//ietf//dtd html strict level 3//",
    "-//ietf//dtd html strict//",
    "-//ietf//dtd html//",
    "-//metrius//dtd metrius presentational//",
    "-//microsoft//dtd internet explorer 2.0 html strict//",
    "-//microsoft//dtd internet explorer 2.0 html//",
    "-//microsoft//dtd internet explorer 2.0 tables//",
    "-//microsoft//dtd internet explorer 3.0 html strict//",
    "-//microsoft//dtd internet explorer 3.0 html//",
    "-//microsoft//dtd internet explorer 3.0 tables//",
    "-//netscape comm. corp.//dtd html//",
    "-//netscape comm. corp.//dtd strict html//",
    "-//o'reilly and associates//dtd html 2.0//",
    "-//o'reilly and associates//dtd html extended 1.0//",
    "-//o'reilly and associates//dtd html extended relaxed 1.0//",
    "-//sq//dtd html 2.0 hotmetal + extensions//",
    "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
    "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
    "-//spyglass//dtd html 2.0 extended//",
    "-//sun microsystems corp.//dtd hotjava html//",
    "-//sun microsystems corp.//dtd hotjava strict html//",
    "-//w3c//dtd html 3 1995-03-24//",
    "-//w3c//dtd html 3.2 draft//",
    "-//w3c//dtd html 3.2 final//",
    "-//w3c//dtd html 3.2//",
    "-//w3c//dtd html 3.2s draft//",
    "-//w3c//dtd html 4.0 frameset//",
    "-//w3c//dtd html 4.0 transitional//",
    "-//w3c//dtd html experimental 19960712//",
    "-//w3c//dtd html experimental 970421//",
    "-//w3c//dtd w3 html//",
    "-//w3o//dtd w3 html 3.0//",
    "-//webtechs//dtd mozilla html 2.0//",
    "-//webtechs//dtd mozilla html//",
  ],
  si = [
    ...eu,
    "-//w3c//dtd html 4.01 frameset//",
    "-//w3c//dtd html 4.01 transitional//",
  ],
  ui = new Set([
    "-//w3o//dtd w3 html strict 3.0//en//",
    "-/w3c/dtd html 4.0 transitional/en",
    "html",
  ]),
  tu = [
    "-//w3c//dtd xhtml 1.0 frameset//",
    "-//w3c//dtd xhtml 1.0 transitional//",
  ],
  ai = [
    ...tu,
    "-//w3c//dtd html 4.01 frameset//",
    "-//w3c//dtd html 4.01 transitional//",
  ];
function Js(t, e) {
  return e.some((r) => t.startsWith(r));
}
function ru(t) {
  return (
    t.name === Zs &&
    t.publicId === null &&
    (t.systemId === null || t.systemId === ri)
  );
}
function nu(t) {
  if (t.name !== Zs) return J.QUIRKS;
  let { systemId: e } = t;
  if (e && e.toLowerCase() === ni) return J.QUIRKS;
  let { publicId: r } = t;
  if (r !== null) {
    if (((r = r.toLowerCase()), ui.has(r))) return J.QUIRKS;
    let n = e === null ? si : eu;
    if (Js(r, n)) return J.QUIRKS;
    if (((n = e === null ? tu : ai), Js(r, n))) return J.LIMITED_QUIRKS;
  }
  return J.NO_QUIRKS;
}
var Rr = {};
cr(Rr, {
  SVG_TAG_NAMES_ADJUSTMENT_MAP: () => uu,
  adjustTokenMathMLAttrs: () => Sr,
  adjustTokenSVGAttrs: () => yr,
  adjustTokenSVGTagName: () => wn,
  adjustTokenXMLAttrs: () => Lt,
  causesExit: () => Hn,
  isIntegrationPoint: () => Bn,
});
var su = { TEXT_HTML: "text/html", APPLICATION_XML: "application/xhtml+xml" },
  oi = "definitionurl",
  ci = "definitionURL",
  li = new Map(
    [
      "attributeName",
      "attributeType",
      "baseFrequency",
      "baseProfile",
      "calcMode",
      "clipPathUnits",
      "diffuseConstant",
      "edgeMode",
      "filterUnits",
      "glyphRef",
      "gradientTransform",
      "gradientUnits",
      "kernelMatrix",
      "kernelUnitLength",
      "keyPoints",
      "keySplines",
      "keyTimes",
      "lengthAdjust",
      "limitingConeAngle",
      "markerHeight",
      "markerUnits",
      "markerWidth",
      "maskContentUnits",
      "maskUnits",
      "numOctaves",
      "pathLength",
      "patternContentUnits",
      "patternTransform",
      "patternUnits",
      "pointsAtX",
      "pointsAtY",
      "pointsAtZ",
      "preserveAlpha",
      "preserveAspectRatio",
      "primitiveUnits",
      "refX",
      "refY",
      "repeatCount",
      "repeatDur",
      "requiredExtensions",
      "requiredFeatures",
      "specularConstant",
      "specularExponent",
      "spreadMethod",
      "startOffset",
      "stdDeviation",
      "stitchTiles",
      "surfaceScale",
      "systemLanguage",
      "tableValues",
      "targetX",
      "targetY",
      "textLength",
      "viewBox",
      "viewTarget",
      "xChannelSelector",
      "yChannelSelector",
      "zoomAndPan",
    ].map((t) => [t.toLowerCase(), t]),
  ),
  di = new Map([
    ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: p.XLINK }],
    ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: p.XLINK }],
    ["xlink:href", { prefix: "xlink", name: "href", namespace: p.XLINK }],
    ["xlink:role", { prefix: "xlink", name: "role", namespace: p.XLINK }],
    ["xlink:show", { prefix: "xlink", name: "show", namespace: p.XLINK }],
    ["xlink:title", { prefix: "xlink", name: "title", namespace: p.XLINK }],
    ["xlink:type", { prefix: "xlink", name: "type", namespace: p.XLINK }],
    ["xml:base", { prefix: "xml", name: "base", namespace: p.XML }],
    ["xml:lang", { prefix: "xml", name: "lang", namespace: p.XML }],
    ["xml:space", { prefix: "xml", name: "space", namespace: p.XML }],
    ["xmlns", { prefix: "", name: "xmlns", namespace: p.XMLNS }],
    ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: p.XMLNS }],
  ]),
  uu = new Map(
    [
      "altGlyph",
      "altGlyphDef",
      "altGlyphItem",
      "animateColor",
      "animateMotion",
      "animateTransform",
      "clipPath",
      "feBlend",
      "feColorMatrix",
      "feComponentTransfer",
      "feComposite",
      "feConvolveMatrix",
      "feDiffuseLighting",
      "feDisplacementMap",
      "feDistantLight",
      "feFlood",
      "feFuncA",
      "feFuncB",
      "feFuncG",
      "feFuncR",
      "feGaussianBlur",
      "feImage",
      "feMerge",
      "feMergeNode",
      "feMorphology",
      "feOffset",
      "fePointLight",
      "feSpecularLighting",
      "feSpotLight",
      "feTile",
      "feTurbulence",
      "foreignObject",
      "glyphRef",
      "linearGradient",
      "radialGradient",
      "textPath",
    ].map((t) => [t.toLowerCase(), t]),
  ),
  hi = new Set([
    s.B,
    s.BIG,
    s.BLOCKQUOTE,
    s.BODY,
    s.BR,
    s.CENTER,
    s.CODE,
    s.DD,
    s.DIV,
    s.DL,
    s.DT,
    s.EM,
    s.EMBED,
    s.H1,
    s.H2,
    s.H3,
    s.H4,
    s.H5,
    s.H6,
    s.HEAD,
    s.HR,
    s.I,
    s.IMG,
    s.LI,
    s.LISTING,
    s.MENU,
    s.META,
    s.NOBR,
    s.OL,
    s.P,
    s.PRE,
    s.RUBY,
    s.S,
    s.SMALL,
    s.SPAN,
    s.STRONG,
    s.STRIKE,
    s.SUB,
    s.SUP,
    s.TABLE,
    s.TT,
    s.U,
    s.UL,
    s.VAR,
  ]);
function Hn(t) {
  let e = t.tagID;
  return (
    (e === s.FONT &&
      t.attrs.some(
        ({ name: n }) => n === ge.COLOR || n === ge.SIZE || n === ge.FACE,
      )) ||
    hi.has(e)
  );
}
function Sr(t) {
  for (let e = 0; e < t.attrs.length; e++)
    if (t.attrs[e].name === oi) {
      t.attrs[e].name = ci;
      break;
    }
}
function yr(t) {
  for (let e = 0; e < t.attrs.length; e++) {
    let r = li.get(t.attrs[e].name);
    r != null && (t.attrs[e].name = r);
  }
}
function Lt(t) {
  for (let e = 0; e < t.attrs.length; e++) {
    let r = di.get(t.attrs[e].name);
    r &&
      ((t.attrs[e].prefix = r.prefix),
      (t.attrs[e].name = r.name),
      (t.attrs[e].namespace = r.namespace));
  }
}
function wn(t) {
  let e = uu.get(t.tagName);
  e != null && ((t.tagName = e), (t.tagID = He(t.tagName)));
}
function fi(t, e) {
  return (
    e === p.MATHML &&
    (t === s.MI || t === s.MO || t === s.MN || t === s.MS || t === s.MTEXT)
  );
}
function mi(t, e, r) {
  if (e === p.MATHML && t === s.ANNOTATION_XML) {
    for (let n = 0; n < r.length; n++)
      if (r[n].name === ge.ENCODING) {
        let u = r[n].value.toLowerCase();
        return u === su.TEXT_HTML || u === su.APPLICATION_XML;
      }
  }
  return (
    e === p.SVG && (t === s.FOREIGN_OBJECT || t === s.DESC || t === s.TITLE)
  );
}
function Bn(t, e, r, n) {
  return (
    ((!n || n === p.HTML) && mi(t, e, r)) ||
    ((!n || n === p.MATHML) && fi(t, e))
  );
}
var Ei = "hidden",
  Ti = 8,
  pi = 3,
  d;
(function (t) {
  (t[(t.INITIAL = 0)] = "INITIAL"),
    (t[(t.BEFORE_HTML = 1)] = "BEFORE_HTML"),
    (t[(t.BEFORE_HEAD = 2)] = "BEFORE_HEAD"),
    (t[(t.IN_HEAD = 3)] = "IN_HEAD"),
    (t[(t.IN_HEAD_NO_SCRIPT = 4)] = "IN_HEAD_NO_SCRIPT"),
    (t[(t.AFTER_HEAD = 5)] = "AFTER_HEAD"),
    (t[(t.IN_BODY = 6)] = "IN_BODY"),
    (t[(t.TEXT = 7)] = "TEXT"),
    (t[(t.IN_TABLE = 8)] = "IN_TABLE"),
    (t[(t.IN_TABLE_TEXT = 9)] = "IN_TABLE_TEXT"),
    (t[(t.IN_CAPTION = 10)] = "IN_CAPTION"),
    (t[(t.IN_COLUMN_GROUP = 11)] = "IN_COLUMN_GROUP"),
    (t[(t.IN_TABLE_BODY = 12)] = "IN_TABLE_BODY"),
    (t[(t.IN_ROW = 13)] = "IN_ROW"),
    (t[(t.IN_CELL = 14)] = "IN_CELL"),
    (t[(t.IN_SELECT = 15)] = "IN_SELECT"),
    (t[(t.IN_SELECT_IN_TABLE = 16)] = "IN_SELECT_IN_TABLE"),
    (t[(t.IN_TEMPLATE = 17)] = "IN_TEMPLATE"),
    (t[(t.AFTER_BODY = 18)] = "AFTER_BODY"),
    (t[(t.IN_FRAMESET = 19)] = "IN_FRAMESET"),
    (t[(t.AFTER_FRAMESET = 20)] = "AFTER_FRAMESET"),
    (t[(t.AFTER_AFTER_BODY = 21)] = "AFTER_AFTER_BODY"),
    (t[(t.AFTER_AFTER_FRAMESET = 22)] = "AFTER_AFTER_FRAMESET");
})(d || (d = {}));
var gi = {
    startLine: -1,
    startCol: -1,
    startOffset: -1,
    endLine: -1,
    endCol: -1,
    endOffset: -1,
  },
  cu = new Set([s.TABLE, s.TBODY, s.TFOOT, s.THEAD, s.TR]),
  au = {
    scriptingEnabled: !0,
    sourceCodeLocationInfo: !1,
    treeAdapter: Le,
    onParseError: null,
  },
  rt = class {
    constructor(e, r, n = null, u = null) {
      (this.fragmentContext = n),
        (this.scriptHandler = u),
        (this.currentToken = null),
        (this.stopped = !1),
        (this.insertionMode = d.INITIAL),
        (this.originalInsertionMode = d.INITIAL),
        (this.headElement = null),
        (this.formElement = null),
        (this.currentNotInHTML = !1),
        (this.tmplInsertionModeStack = []),
        (this.pendingCharacterTokens = []),
        (this.hasNonWhitespacePendingCharacterToken = !1),
        (this.framesetOk = !0),
        (this.skipNextNewLine = !1),
        (this.fosterParentingEnabled = !1),
        (this.options = { ...au, ...e }),
        (this.treeAdapter = this.options.treeAdapter),
        (this.onParseError = this.options.onParseError),
        this.onParseError && (this.options.sourceCodeLocationInfo = !0),
        (this.document = r != null ? r : this.treeAdapter.createDocument()),
        (this.tokenizer = new xt(this.options, this)),
        (this.activeFormattingElements = new Ir(this.treeAdapter)),
        (this.fragmentContextID = n
          ? He(this.treeAdapter.getTagName(n))
          : s.UNKNOWN),
        this._setContextModes(
          n != null ? n : this.document,
          this.fragmentContextID,
        ),
        (this.openElements = new Nr(this.document, this.treeAdapter, this));
    }
    static parse(e, r) {
      let n = new this(r);
      return n.tokenizer.write(e, !0), n.document;
    }
    static getFragmentParser(e, r) {
      let n = { ...au, ...r };
      e != null || (e = n.treeAdapter.createElement(m.TEMPLATE, p.HTML, []));
      let u = n.treeAdapter.createElement("documentmock", p.HTML, []),
        o = new this(n, u, e);
      return (
        o.fragmentContextID === s.TEMPLATE &&
          o.tmplInsertionModeStack.unshift(d.IN_TEMPLATE),
        o._initTokenizerForFragmentParsing(),
        o._insertFakeRootElement(),
        o._resetInsertionMode(),
        o._findFormInFragmentContext(),
        o
      );
    }
    getFragment() {
      let e = this.treeAdapter.getFirstChild(this.document),
        r = this.treeAdapter.createDocumentFragment();
      return this._adoptNodes(e, r), r;
    }
    _err(e, r, n) {
      var u;
      if (!this.onParseError) return;
      let o = (u = e.location) !== null && u !== void 0 ? u : gi,
        h = {
          code: r,
          startLine: o.startLine,
          startCol: o.startCol,
          startOffset: o.startOffset,
          endLine: n ? o.startLine : o.endLine,
          endCol: n ? o.startCol : o.endCol,
          endOffset: n ? o.startOffset : o.endOffset,
        };
      this.onParseError(h);
    }
    onItemPush(e, r, n) {
      var u, o;
      (o = (u = this.treeAdapter).onItemPush) === null ||
        o === void 0 ||
        o.call(u, e),
        n && this.openElements.stackTop > 0 && this._setContextModes(e, r);
    }
    onItemPop(e, r) {
      var n, u;
      if (
        (this.options.sourceCodeLocationInfo &&
          this._setEndLocation(e, this.currentToken),
        (u = (n = this.treeAdapter).onItemPop) === null ||
          u === void 0 ||
          u.call(n, e, this.openElements.current),
        r)
      ) {
        let o, h;
        this.openElements.stackTop === 0 && this.fragmentContext
          ? ((o = this.fragmentContext), (h = this.fragmentContextID))
          : ({ current: o, currentTagId: h } = this.openElements),
          this._setContextModes(o, h);
      }
    }
    _setContextModes(e, r) {
      let n =
        e === this.document || this.treeAdapter.getNamespaceURI(e) === p.HTML;
      (this.currentNotInHTML = !n),
        (this.tokenizer.inForeignNode = !n && !this._isIntegrationPoint(r, e));
    }
    _switchToTextParsing(e, r) {
      this._insertElement(e, p.HTML),
        (this.tokenizer.state = r),
        (this.originalInsertionMode = this.insertionMode),
        (this.insertionMode = d.TEXT);
    }
    switchToPlaintextParsing() {
      (this.insertionMode = d.TEXT),
        (this.originalInsertionMode = d.IN_BODY),
        (this.tokenizer.state = te.PLAINTEXT);
    }
    _getAdjustedCurrentElement() {
      return this.openElements.stackTop === 0 && this.fragmentContext
        ? this.fragmentContext
        : this.openElements.current;
    }
    _findFormInFragmentContext() {
      let e = this.fragmentContext;
      for (; e; ) {
        if (this.treeAdapter.getTagName(e) === m.FORM) {
          this.formElement = e;
          break;
        }
        e = this.treeAdapter.getParentNode(e);
      }
    }
    _initTokenizerForFragmentParsing() {
      if (
        !(
          !this.fragmentContext ||
          this.treeAdapter.getNamespaceURI(this.fragmentContext) !== p.HTML
        )
      )
        switch (this.fragmentContextID) {
          case s.TITLE:
          case s.TEXTAREA: {
            this.tokenizer.state = te.RCDATA;
            break;
          }
          case s.STYLE:
          case s.XMP:
          case s.IFRAME:
          case s.NOEMBED:
          case s.NOFRAMES:
          case s.NOSCRIPT: {
            this.tokenizer.state = te.RAWTEXT;
            break;
          }
          case s.SCRIPT: {
            this.tokenizer.state = te.SCRIPT_DATA;
            break;
          }
          case s.PLAINTEXT: {
            this.tokenizer.state = te.PLAINTEXT;
            break;
          }
          default:
        }
    }
    _setDocumentType(e) {
      let r = e.name || "",
        n = e.publicId || "",
        u = e.systemId || "";
      if (
        (this.treeAdapter.setDocumentType(this.document, r, n, u), e.location)
      ) {
        let h = this.treeAdapter
          .getChildNodes(this.document)
          .find((T) => this.treeAdapter.isDocumentTypeNode(T));
        h && this.treeAdapter.setNodeSourceCodeLocation(h, e.location);
      }
    }
    _attachElementToTree(e, r) {
      if (this.options.sourceCodeLocationInfo) {
        let n = r && { ...r, startTag: r };
        this.treeAdapter.setNodeSourceCodeLocation(e, n);
      }
      if (this._shouldFosterParentOnInsertion()) this._fosterParentElement(e);
      else {
        let n = this.openElements.currentTmplContentOrNode;
        this.treeAdapter.appendChild(n, e);
      }
    }
    _appendElement(e, r) {
      let n = this.treeAdapter.createElement(e.tagName, r, e.attrs);
      this._attachElementToTree(n, e.location);
    }
    _insertElement(e, r) {
      let n = this.treeAdapter.createElement(e.tagName, r, e.attrs);
      this._attachElementToTree(n, e.location),
        this.openElements.push(n, e.tagID);
    }
    _insertFakeElement(e, r) {
      let n = this.treeAdapter.createElement(e, p.HTML, []);
      this._attachElementToTree(n, null), this.openElements.push(n, r);
    }
    _insertTemplate(e) {
      let r = this.treeAdapter.createElement(e.tagName, p.HTML, e.attrs),
        n = this.treeAdapter.createDocumentFragment();
      this.treeAdapter.setTemplateContent(r, n),
        this._attachElementToTree(r, e.location),
        this.openElements.push(r, e.tagID),
        this.options.sourceCodeLocationInfo &&
          this.treeAdapter.setNodeSourceCodeLocation(n, null);
    }
    _insertFakeRootElement() {
      let e = this.treeAdapter.createElement(m.HTML, p.HTML, []);
      this.options.sourceCodeLocationInfo &&
        this.treeAdapter.setNodeSourceCodeLocation(e, null),
        this.treeAdapter.appendChild(this.openElements.current, e),
        this.openElements.push(e, s.HTML);
    }
    _appendCommentNode(e, r) {
      let n = this.treeAdapter.createCommentNode(e.data);
      this.treeAdapter.appendChild(r, n),
        this.options.sourceCodeLocationInfo &&
          this.treeAdapter.setNodeSourceCodeLocation(n, e.location);
    }
    _insertCharacters(e) {
      let r, n;
      if (
        (this._shouldFosterParentOnInsertion()
          ? (({ parent: r, beforeElement: n } =
              this._findFosterParentingLocation()),
            n
              ? this.treeAdapter.insertTextBefore(r, e.chars, n)
              : this.treeAdapter.insertText(r, e.chars))
          : ((r = this.openElements.currentTmplContentOrNode),
            this.treeAdapter.insertText(r, e.chars)),
        !e.location)
      )
        return;
      let u = this.treeAdapter.getChildNodes(r),
        o = n ? u.lastIndexOf(n) : u.length,
        h = u[o - 1];
      if (this.treeAdapter.getNodeSourceCodeLocation(h)) {
        let { endLine: A, endCol: y, endOffset: M } = e.location;
        this.treeAdapter.updateNodeSourceCodeLocation(h, {
          endLine: A,
          endCol: y,
          endOffset: M,
        });
      } else
        this.options.sourceCodeLocationInfo &&
          this.treeAdapter.setNodeSourceCodeLocation(h, e.location);
    }
    _adoptNodes(e, r) {
      for (
        let n = this.treeAdapter.getFirstChild(e);
        n;
        n = this.treeAdapter.getFirstChild(e)
      )
        this.treeAdapter.detachNode(n), this.treeAdapter.appendChild(r, n);
    }
    _setEndLocation(e, r) {
      if (this.treeAdapter.getNodeSourceCodeLocation(e) && r.location) {
        let n = r.location,
          u = this.treeAdapter.getTagName(e),
          o =
            r.type === B.END_TAG && u === r.tagName
              ? {
                  endTag: { ...n },
                  endLine: n.endLine,
                  endCol: n.endCol,
                  endOffset: n.endOffset,
                }
              : {
                  endLine: n.startLine,
                  endCol: n.startCol,
                  endOffset: n.startOffset,
                };
        this.treeAdapter.updateNodeSourceCodeLocation(e, o);
      }
    }
    shouldProcessStartTagTokenInForeignContent(e) {
      if (!this.currentNotInHTML) return !1;
      let r, n;
      return (
        this.openElements.stackTop === 0 && this.fragmentContext
          ? ((r = this.fragmentContext), (n = this.fragmentContextID))
          : ({ current: r, currentTagId: n } = this.openElements),
        e.tagID === s.SVG &&
        this.treeAdapter.getTagName(r) === m.ANNOTATION_XML &&
        this.treeAdapter.getNamespaceURI(r) === p.MATHML
          ? !1
          : this.tokenizer.inForeignNode ||
            ((e.tagID === s.MGLYPH || e.tagID === s.MALIGNMARK) &&
              !this._isIntegrationPoint(n, r, p.HTML))
      );
    }
    _processToken(e) {
      switch (e.type) {
        case B.CHARACTER: {
          this.onCharacter(e);
          break;
        }
        case B.NULL_CHARACTER: {
          this.onNullCharacter(e);
          break;
        }
        case B.COMMENT: {
          this.onComment(e);
          break;
        }
        case B.DOCTYPE: {
          this.onDoctype(e);
          break;
        }
        case B.START_TAG: {
          this._processStartTag(e);
          break;
        }
        case B.END_TAG: {
          this.onEndTag(e);
          break;
        }
        case B.EOF: {
          this.onEof(e);
          break;
        }
        case B.WHITESPACE_CHARACTER: {
          this.onWhitespaceCharacter(e);
          break;
        }
      }
    }
    _isIntegrationPoint(e, r, n) {
      let u = this.treeAdapter.getNamespaceURI(r),
        o = this.treeAdapter.getAttrList(r);
      return Bn(e, u, o, n);
    }
    _reconstructActiveFormattingElements() {
      let e = this.activeFormattingElements.entries.length;
      if (e) {
        let r = this.activeFormattingElements.entries.findIndex(
            (u) =>
              u.type === he.Marker || this.openElements.contains(u.element),
          ),
          n = r < 0 ? e - 1 : r - 1;
        for (let u = n; u >= 0; u--) {
          let o = this.activeFormattingElements.entries[u];
          this._insertElement(
            o.token,
            this.treeAdapter.getNamespaceURI(o.element),
          ),
            (o.element = this.openElements.current);
        }
      }
    }
    _closeTableCell() {
      this.openElements.generateImpliedEndTags(),
        this.openElements.popUntilTableCellPopped(),
        this.activeFormattingElements.clearToLastMarker(),
        (this.insertionMode = d.IN_ROW);
    }
    _closePElement() {
      this.openElements.generateImpliedEndTagsWithExclusion(s.P),
        this.openElements.popUntilTagNamePopped(s.P);
    }
    _resetInsertionMode() {
      for (let e = this.openElements.stackTop; e >= 0; e--)
        switch (
          e === 0 && this.fragmentContext
            ? this.fragmentContextID
            : this.openElements.tagIDs[e]
        ) {
          case s.TR: {
            this.insertionMode = d.IN_ROW;
            return;
          }
          case s.TBODY:
          case s.THEAD:
          case s.TFOOT: {
            this.insertionMode = d.IN_TABLE_BODY;
            return;
          }
          case s.CAPTION: {
            this.insertionMode = d.IN_CAPTION;
            return;
          }
          case s.COLGROUP: {
            this.insertionMode = d.IN_COLUMN_GROUP;
            return;
          }
          case s.TABLE: {
            this.insertionMode = d.IN_TABLE;
            return;
          }
          case s.BODY: {
            this.insertionMode = d.IN_BODY;
            return;
          }
          case s.FRAMESET: {
            this.insertionMode = d.IN_FRAMESET;
            return;
          }
          case s.SELECT: {
            this._resetInsertionModeForSelect(e);
            return;
          }
          case s.TEMPLATE: {
            this.insertionMode = this.tmplInsertionModeStack[0];
            return;
          }
          case s.HTML: {
            this.insertionMode = this.headElement
              ? d.AFTER_HEAD
              : d.BEFORE_HEAD;
            return;
          }
          case s.TD:
          case s.TH: {
            if (e > 0) {
              this.insertionMode = d.IN_CELL;
              return;
            }
            break;
          }
          case s.HEAD: {
            if (e > 0) {
              this.insertionMode = d.IN_HEAD;
              return;
            }
            break;
          }
        }
      this.insertionMode = d.IN_BODY;
    }
    _resetInsertionModeForSelect(e) {
      if (e > 0)
        for (let r = e - 1; r > 0; r--) {
          let n = this.openElements.tagIDs[r];
          if (n === s.TEMPLATE) break;
          if (n === s.TABLE) {
            this.insertionMode = d.IN_SELECT_IN_TABLE;
            return;
          }
        }
      this.insertionMode = d.IN_SELECT;
    }
    _isElementCausesFosterParenting(e) {
      return cu.has(e);
    }
    _shouldFosterParentOnInsertion() {
      return (
        this.fosterParentingEnabled &&
        this._isElementCausesFosterParenting(this.openElements.currentTagId)
      );
    }
    _findFosterParentingLocation() {
      for (let e = this.openElements.stackTop; e >= 0; e--) {
        let r = this.openElements.items[e];
        switch (this.openElements.tagIDs[e]) {
          case s.TEMPLATE: {
            if (this.treeAdapter.getNamespaceURI(r) === p.HTML)
              return {
                parent: this.treeAdapter.getTemplateContent(r),
                beforeElement: null,
              };
            break;
          }
          case s.TABLE: {
            let n = this.treeAdapter.getParentNode(r);
            return n
              ? { parent: n, beforeElement: r }
              : { parent: this.openElements.items[e - 1], beforeElement: null };
          }
          default:
        }
      }
      return { parent: this.openElements.items[0], beforeElement: null };
    }
    _fosterParentElement(e) {
      let r = this._findFosterParentingLocation();
      r.beforeElement
        ? this.treeAdapter.insertBefore(r.parent, e, r.beforeElement)
        : this.treeAdapter.appendChild(r.parent, e);
    }
    _isSpecialElement(e, r) {
      let n = this.treeAdapter.getNamespaceURI(e);
      return Mn[n].has(r);
    }
    onCharacter(e) {
      if (((this.skipNextNewLine = !1), this.tokenizer.inForeignNode)) {
        jo(this, e);
        return;
      }
      switch (this.insertionMode) {
        case d.INITIAL: {
          Ot(this, e);
          break;
        }
        case d.BEFORE_HTML: {
          Mt(this, e);
          break;
        }
        case d.BEFORE_HEAD: {
          Pt(this, e);
          break;
        }
        case d.IN_HEAD: {
          kt(this, e);
          break;
        }
        case d.IN_HEAD_NO_SCRIPT: {
          Ht(this, e);
          break;
        }
        case d.AFTER_HEAD: {
          wt(this, e);
          break;
        }
        case d.IN_BODY:
        case d.IN_CAPTION:
        case d.IN_CELL:
        case d.IN_TEMPLATE: {
          du(this, e);
          break;
        }
        case d.TEXT:
        case d.IN_SELECT:
        case d.IN_SELECT_IN_TABLE: {
          this._insertCharacters(e);
          break;
        }
        case d.IN_TABLE:
        case d.IN_TABLE_BODY:
        case d.IN_ROW: {
          Un(this, e);
          break;
        }
        case d.IN_TABLE_TEXT: {
          pu(this, e);
          break;
        }
        case d.IN_COLUMN_GROUP: {
          Lr(this, e);
          break;
        }
        case d.AFTER_BODY: {
          Or(this, e);
          break;
        }
        case d.AFTER_AFTER_BODY: {
          xr(this, e);
          break;
        }
        default:
      }
    }
    onNullCharacter(e) {
      if (((this.skipNextNewLine = !1), this.tokenizer.inForeignNode)) {
        zo(this, e);
        return;
      }
      switch (this.insertionMode) {
        case d.INITIAL: {
          Ot(this, e);
          break;
        }
        case d.BEFORE_HTML: {
          Mt(this, e);
          break;
        }
        case d.BEFORE_HEAD: {
          Pt(this, e);
          break;
        }
        case d.IN_HEAD: {
          kt(this, e);
          break;
        }
        case d.IN_HEAD_NO_SCRIPT: {
          Ht(this, e);
          break;
        }
        case d.AFTER_HEAD: {
          wt(this, e);
          break;
        }
        case d.TEXT: {
          this._insertCharacters(e);
          break;
        }
        case d.IN_TABLE:
        case d.IN_TABLE_BODY:
        case d.IN_ROW: {
          Un(this, e);
          break;
        }
        case d.IN_COLUMN_GROUP: {
          Lr(this, e);
          break;
        }
        case d.AFTER_BODY: {
          Or(this, e);
          break;
        }
        case d.AFTER_AFTER_BODY: {
          xr(this, e);
          break;
        }
        default:
      }
    }
    onComment(e) {
      if (((this.skipNextNewLine = !1), this.currentNotInHTML)) {
        vn(this, e);
        return;
      }
      switch (this.insertionMode) {
        case d.INITIAL:
        case d.BEFORE_HTML:
        case d.BEFORE_HEAD:
        case d.IN_HEAD:
        case d.IN_HEAD_NO_SCRIPT:
        case d.AFTER_HEAD:
        case d.IN_BODY:
        case d.IN_TABLE:
        case d.IN_CAPTION:
        case d.IN_COLUMN_GROUP:
        case d.IN_TABLE_BODY:
        case d.IN_ROW:
        case d.IN_CELL:
        case d.IN_SELECT:
        case d.IN_SELECT_IN_TABLE:
        case d.IN_TEMPLATE:
        case d.IN_FRAMESET:
        case d.AFTER_FRAMESET: {
          vn(this, e);
          break;
        }
        case d.IN_TABLE_TEXT: {
          Dt(this, e);
          break;
        }
        case d.AFTER_BODY: {
          Si(this, e);
          break;
        }
        case d.AFTER_AFTER_BODY:
        case d.AFTER_AFTER_FRAMESET: {
          yi(this, e);
          break;
        }
        default:
      }
    }
    onDoctype(e) {
      switch (((this.skipNextNewLine = !1), this.insertionMode)) {
        case d.INITIAL: {
          Ri(this, e);
          break;
        }
        case d.BEFORE_HEAD:
        case d.IN_HEAD:
        case d.IN_HEAD_NO_SCRIPT:
        case d.AFTER_HEAD: {
          this._err(e, E.misplacedDoctype);
          break;
        }
        case d.IN_TABLE_TEXT: {
          Dt(this, e);
          break;
        }
        default:
      }
    }
    onStartTag(e) {
      (this.skipNextNewLine = !1),
        (this.currentToken = e),
        this._processStartTag(e),
        e.selfClosing &&
          !e.ackSelfClosing &&
          this._err(e, E.nonVoidHtmlElementStartTagWithTrailingSolidus);
    }
    _processStartTag(e) {
      this.shouldProcessStartTagTokenInForeignContent(e)
        ? Go(this, e)
        : this._startTagOutsideForeignContent(e);
    }
    _startTagOutsideForeignContent(e) {
      switch (this.insertionMode) {
        case d.INITIAL: {
          Ot(this, e);
          break;
        }
        case d.BEFORE_HTML: {
          xi(this, e);
          break;
        }
        case d.BEFORE_HEAD: {
          Oi(this, e);
          break;
        }
        case d.IN_HEAD: {
          be(this, e);
          break;
        }
        case d.IN_HEAD_NO_SCRIPT: {
          Pi(this, e);
          break;
        }
        case d.AFTER_HEAD: {
          Hi(this, e);
          break;
        }
        case d.IN_BODY: {
          re(this, e);
          break;
        }
        case d.IN_TABLE: {
          nt(this, e);
          break;
        }
        case d.IN_TABLE_TEXT: {
          Dt(this, e);
          break;
        }
        case d.IN_CAPTION: {
          Mo(this, e);
          break;
        }
        case d.IN_COLUMN_GROUP: {
          Vn(this, e);
          break;
        }
        case d.IN_TABLE_BODY: {
          Pr(this, e);
          break;
        }
        case d.IN_ROW: {
          kr(this, e);
          break;
        }
        case d.IN_CELL: {
          Ho(this, e);
          break;
        }
        case d.IN_SELECT: {
          _u(this, e);
          break;
        }
        case d.IN_SELECT_IN_TABLE: {
          Bo(this, e);
          break;
        }
        case d.IN_TEMPLATE: {
          vo(this, e);
          break;
        }
        case d.AFTER_BODY: {
          Wo(this, e);
          break;
        }
        case d.IN_FRAMESET: {
          Yo(this, e);
          break;
        }
        case d.AFTER_FRAMESET: {
          qo(this, e);
          break;
        }
        case d.AFTER_AFTER_BODY: {
          Qo(this, e);
          break;
        }
        case d.AFTER_AFTER_FRAMESET: {
          Ko(this, e);
          break;
        }
        default:
      }
    }
    onEndTag(e) {
      (this.skipNextNewLine = !1),
        (this.currentToken = e),
        this.currentNotInHTML
          ? $o(this, e)
          : this._endTagOutsideForeignContent(e);
    }
    _endTagOutsideForeignContent(e) {
      switch (this.insertionMode) {
        case d.INITIAL: {
          Ot(this, e);
          break;
        }
        case d.BEFORE_HTML: {
          Li(this, e);
          break;
        }
        case d.BEFORE_HEAD: {
          Di(this, e);
          break;
        }
        case d.IN_HEAD: {
          Mi(this, e);
          break;
        }
        case d.IN_HEAD_NO_SCRIPT: {
          ki(this, e);
          break;
        }
        case d.AFTER_HEAD: {
          wi(this, e);
          break;
        }
        case d.IN_BODY: {
          Mr(this, e);
          break;
        }
        case d.TEXT: {
          Co(this, e);
          break;
        }
        case d.IN_TABLE: {
          Bt(this, e);
          break;
        }
        case d.IN_TABLE_TEXT: {
          Dt(this, e);
          break;
        }
        case d.IN_CAPTION: {
          Po(this, e);
          break;
        }
        case d.IN_COLUMN_GROUP: {
          ko(this, e);
          break;
        }
        case d.IN_TABLE_BODY: {
          Fn(this, e);
          break;
        }
        case d.IN_ROW: {
          bu(this, e);
          break;
        }
        case d.IN_CELL: {
          wo(this, e);
          break;
        }
        case d.IN_SELECT: {
          Au(this, e);
          break;
        }
        case d.IN_SELECT_IN_TABLE: {
          Uo(this, e);
          break;
        }
        case d.IN_TEMPLATE: {
          Fo(this, e);
          break;
        }
        case d.AFTER_BODY: {
          Nu(this, e);
          break;
        }
        case d.IN_FRAMESET: {
          Vo(this, e);
          break;
        }
        case d.AFTER_FRAMESET: {
          Xo(this, e);
          break;
        }
        case d.AFTER_AFTER_BODY: {
          xr(this, e);
          break;
        }
        default:
      }
    }
    onEof(e) {
      switch (this.insertionMode) {
        case d.INITIAL: {
          Ot(this, e);
          break;
        }
        case d.BEFORE_HTML: {
          Mt(this, e);
          break;
        }
        case d.BEFORE_HEAD: {
          Pt(this, e);
          break;
        }
        case d.IN_HEAD: {
          kt(this, e);
          break;
        }
        case d.IN_HEAD_NO_SCRIPT: {
          Ht(this, e);
          break;
        }
        case d.AFTER_HEAD: {
          wt(this, e);
          break;
        }
        case d.IN_BODY:
        case d.IN_TABLE:
        case d.IN_CAPTION:
        case d.IN_COLUMN_GROUP:
        case d.IN_TABLE_BODY:
        case d.IN_ROW:
        case d.IN_CELL:
        case d.IN_SELECT:
        case d.IN_SELECT_IN_TABLE: {
          Eu(this, e);
          break;
        }
        case d.TEXT: {
          No(this, e);
          break;
        }
        case d.IN_TABLE_TEXT: {
          Dt(this, e);
          break;
        }
        case d.IN_TEMPLATE: {
          Cu(this, e);
          break;
        }
        case d.AFTER_BODY:
        case d.IN_FRAMESET:
        case d.AFTER_FRAMESET:
        case d.AFTER_AFTER_BODY:
        case d.AFTER_AFTER_FRAMESET: {
          Yn(this, e);
          break;
        }
        default:
      }
    }
    onWhitespaceCharacter(e) {
      if (
        this.skipNextNewLine &&
        ((this.skipNextNewLine = !1), e.chars.charCodeAt(0) === i.LINE_FEED)
      ) {
        if (e.chars.length === 1) return;
        e.chars = e.chars.substr(1);
      }
      if (this.tokenizer.inForeignNode) {
        this._insertCharacters(e);
        return;
      }
      switch (this.insertionMode) {
        case d.IN_HEAD:
        case d.IN_HEAD_NO_SCRIPT:
        case d.AFTER_HEAD:
        case d.TEXT:
        case d.IN_COLUMN_GROUP:
        case d.IN_SELECT:
        case d.IN_SELECT_IN_TABLE:
        case d.IN_FRAMESET:
        case d.AFTER_FRAMESET: {
          this._insertCharacters(e);
          break;
        }
        case d.IN_BODY:
        case d.IN_CAPTION:
        case d.IN_CELL:
        case d.IN_TEMPLATE:
        case d.AFTER_BODY:
        case d.AFTER_AFTER_BODY:
        case d.AFTER_AFTER_FRAMESET: {
          lu(this, e);
          break;
        }
        case d.IN_TABLE:
        case d.IN_TABLE_BODY:
        case d.IN_ROW: {
          Un(this, e);
          break;
        }
        case d.IN_TABLE_TEXT: {
          Tu(this, e);
          break;
        }
        default:
      }
    }
  };
function bi(t, e) {
  let r = t.activeFormattingElements.getElementEntryInScopeWithTagName(
    e.tagName,
  );
  return (
    r
      ? t.openElements.contains(r.element)
        ? t.openElements.hasInScope(e.tagID) || (r = null)
        : (t.activeFormattingElements.removeEntry(r), (r = null))
      : mu(t, e),
    r
  );
}
function _i(t, e) {
  let r = null,
    n = t.openElements.stackTop;
  for (; n >= 0; n--) {
    let u = t.openElements.items[n];
    if (u === e.element) break;
    t._isSpecialElement(u, t.openElements.tagIDs[n]) && (r = u);
  }
  return (
    r ||
      (t.openElements.shortenToLength(n < 0 ? 0 : n),
      t.activeFormattingElements.removeEntry(e)),
    r
  );
}
function Ai(t, e, r) {
  let n = e,
    u = t.openElements.getCommonAncestor(e);
  for (let o = 0, h = u; h !== r; o++, h = u) {
    u = t.openElements.getCommonAncestor(h);
    let T = t.activeFormattingElements.getElementEntry(h),
      A = T && o >= pi;
    !T || A
      ? (A && t.activeFormattingElements.removeEntry(T),
        t.openElements.remove(h))
      : ((h = Ci(t, T)),
        n === e && (t.activeFormattingElements.bookmark = T),
        t.treeAdapter.detachNode(n),
        t.treeAdapter.appendChild(h, n),
        (n = h));
  }
  return n;
}
function Ci(t, e) {
  let r = t.treeAdapter.getNamespaceURI(e.element),
    n = t.treeAdapter.createElement(e.token.tagName, r, e.token.attrs);
  return t.openElements.replace(e.element, n), (e.element = n), n;
}
function Ni(t, e, r) {
  let n = t.treeAdapter.getTagName(e),
    u = He(n);
  if (t._isElementCausesFosterParenting(u)) t._fosterParentElement(r);
  else {
    let o = t.treeAdapter.getNamespaceURI(e);
    u === s.TEMPLATE &&
      o === p.HTML &&
      (e = t.treeAdapter.getTemplateContent(e)),
      t.treeAdapter.appendChild(e, r);
  }
}
function Ii(t, e, r) {
  let n = t.treeAdapter.getNamespaceURI(r.element),
    { token: u } = r,
    o = t.treeAdapter.createElement(u.tagName, n, u.attrs);
  t._adoptNodes(e, o),
    t.treeAdapter.appendChild(e, o),
    t.activeFormattingElements.insertElementAfterBookmark(o, u),
    t.activeFormattingElements.removeEntry(r),
    t.openElements.remove(r.element),
    t.openElements.insertAfter(e, o, u.tagID);
}
function Wn(t, e) {
  for (let r = 0; r < Ti; r++) {
    let n = bi(t, e);
    if (!n) break;
    let u = _i(t, n);
    if (!u) break;
    t.activeFormattingElements.bookmark = n;
    let o = Ai(t, u, n.element),
      h = t.openElements.getCommonAncestor(n.element);
    t.treeAdapter.detachNode(o), h && Ni(t, h, o), Ii(t, u, n);
  }
}
function vn(t, e) {
  t._appendCommentNode(e, t.openElements.currentTmplContentOrNode);
}
function Si(t, e) {
  t._appendCommentNode(e, t.openElements.items[0]);
}
function yi(t, e) {
  t._appendCommentNode(e, t.document);
}
function Yn(t, e) {
  if (((t.stopped = !0), e.location)) {
    let r = t.fragmentContext ? 0 : 2;
    for (let n = t.openElements.stackTop; n >= r; n--)
      t._setEndLocation(t.openElements.items[n], e);
    if (!t.fragmentContext && t.openElements.stackTop >= 0) {
      let n = t.openElements.items[0],
        u = t.treeAdapter.getNodeSourceCodeLocation(n);
      if (
        u &&
        !u.endTag &&
        (t._setEndLocation(n, e), t.openElements.stackTop >= 1)
      ) {
        let o = t.openElements.items[1],
          h = t.treeAdapter.getNodeSourceCodeLocation(o);
        h && !h.endTag && t._setEndLocation(o, e);
      }
    }
  }
}
function Ri(t, e) {
  t._setDocumentType(e);
  let r = e.forceQuirks ? J.QUIRKS : nu(e);
  ru(e) || t._err(e, E.nonConformingDoctype),
    t.treeAdapter.setDocumentMode(t.document, r),
    (t.insertionMode = d.BEFORE_HTML);
}
function Ot(t, e) {
  t._err(e, E.missingDoctype, !0),
    t.treeAdapter.setDocumentMode(t.document, J.QUIRKS),
    (t.insertionMode = d.BEFORE_HTML),
    t._processToken(e);
}
function xi(t, e) {
  e.tagID === s.HTML
    ? (t._insertElement(e, p.HTML), (t.insertionMode = d.BEFORE_HEAD))
    : Mt(t, e);
}
function Li(t, e) {
  let r = e.tagID;
  (r === s.HTML || r === s.HEAD || r === s.BODY || r === s.BR) && Mt(t, e);
}
function Mt(t, e) {
  t._insertFakeRootElement(),
    (t.insertionMode = d.BEFORE_HEAD),
    t._processToken(e);
}
function Oi(t, e) {
  switch (e.tagID) {
    case s.HTML: {
      re(t, e);
      break;
    }
    case s.HEAD: {
      t._insertElement(e, p.HTML),
        (t.headElement = t.openElements.current),
        (t.insertionMode = d.IN_HEAD);
      break;
    }
    default:
      Pt(t, e);
  }
}
function Di(t, e) {
  let r = e.tagID;
  r === s.HEAD || r === s.BODY || r === s.HTML || r === s.BR
    ? Pt(t, e)
    : t._err(e, E.endTagWithoutMatchingOpenElement);
}
function Pt(t, e) {
  t._insertFakeElement(m.HEAD, s.HEAD),
    (t.headElement = t.openElements.current),
    (t.insertionMode = d.IN_HEAD),
    t._processToken(e);
}
function be(t, e) {
  switch (e.tagID) {
    case s.HTML: {
      re(t, e);
      break;
    }
    case s.BASE:
    case s.BASEFONT:
    case s.BGSOUND:
    case s.LINK:
    case s.META: {
      t._appendElement(e, p.HTML), (e.ackSelfClosing = !0);
      break;
    }
    case s.TITLE: {
      t._switchToTextParsing(e, te.RCDATA);
      break;
    }
    case s.NOSCRIPT: {
      t.options.scriptingEnabled
        ? t._switchToTextParsing(e, te.RAWTEXT)
        : (t._insertElement(e, p.HTML),
          (t.insertionMode = d.IN_HEAD_NO_SCRIPT));
      break;
    }
    case s.NOFRAMES:
    case s.STYLE: {
      t._switchToTextParsing(e, te.RAWTEXT);
      break;
    }
    case s.SCRIPT: {
      t._switchToTextParsing(e, te.SCRIPT_DATA);
      break;
    }
    case s.TEMPLATE: {
      t._insertTemplate(e),
        t.activeFormattingElements.insertMarker(),
        (t.framesetOk = !1),
        (t.insertionMode = d.IN_TEMPLATE),
        t.tmplInsertionModeStack.unshift(d.IN_TEMPLATE);
      break;
    }
    case s.HEAD: {
      t._err(e, E.misplacedStartTagForHeadElement);
      break;
    }
    default:
      kt(t, e);
  }
}
function Mi(t, e) {
  switch (e.tagID) {
    case s.HEAD: {
      t.openElements.pop(), (t.insertionMode = d.AFTER_HEAD);
      break;
    }
    case s.BODY:
    case s.BR:
    case s.HTML: {
      kt(t, e);
      break;
    }
    case s.TEMPLATE: {
      qe(t, e);
      break;
    }
    default:
      t._err(e, E.endTagWithoutMatchingOpenElement);
  }
}
function qe(t, e) {
  t.openElements.tmplCount > 0
    ? (t.openElements.generateImpliedEndTagsThoroughly(),
      t.openElements.currentTagId !== s.TEMPLATE &&
        t._err(e, E.closingOfElementWithOpenChildElements),
      t.openElements.popUntilTagNamePopped(s.TEMPLATE),
      t.activeFormattingElements.clearToLastMarker(),
      t.tmplInsertionModeStack.shift(),
      t._resetInsertionMode())
    : t._err(e, E.endTagWithoutMatchingOpenElement);
}
function kt(t, e) {
  t.openElements.pop(), (t.insertionMode = d.AFTER_HEAD), t._processToken(e);
}
function Pi(t, e) {
  switch (e.tagID) {
    case s.HTML: {
      re(t, e);
      break;
    }
    case s.BASEFONT:
    case s.BGSOUND:
    case s.HEAD:
    case s.LINK:
    case s.META:
    case s.NOFRAMES:
    case s.STYLE: {
      be(t, e);
      break;
    }
    case s.NOSCRIPT: {
      t._err(e, E.nestedNoscriptInHead);
      break;
    }
    default:
      Ht(t, e);
  }
}
function ki(t, e) {
  switch (e.tagID) {
    case s.NOSCRIPT: {
      t.openElements.pop(), (t.insertionMode = d.IN_HEAD);
      break;
    }
    case s.BR: {
      Ht(t, e);
      break;
    }
    default:
      t._err(e, E.endTagWithoutMatchingOpenElement);
  }
}
function Ht(t, e) {
  let r =
    e.type === B.EOF
      ? E.openElementsLeftAfterEof
      : E.disallowedContentInNoscriptInHead;
  t._err(e, r),
    t.openElements.pop(),
    (t.insertionMode = d.IN_HEAD),
    t._processToken(e);
}
function Hi(t, e) {
  switch (e.tagID) {
    case s.HTML: {
      re(t, e);
      break;
    }
    case s.BODY: {
      t._insertElement(e, p.HTML),
        (t.framesetOk = !1),
        (t.insertionMode = d.IN_BODY);
      break;
    }
    case s.FRAMESET: {
      t._insertElement(e, p.HTML), (t.insertionMode = d.IN_FRAMESET);
      break;
    }
    case s.BASE:
    case s.BASEFONT:
    case s.BGSOUND:
    case s.LINK:
    case s.META:
    case s.NOFRAMES:
    case s.SCRIPT:
    case s.STYLE:
    case s.TEMPLATE:
    case s.TITLE: {
      t._err(e, E.abandonedHeadElementChild),
        t.openElements.push(t.headElement, s.HEAD),
        be(t, e),
        t.openElements.remove(t.headElement);
      break;
    }
    case s.HEAD: {
      t._err(e, E.misplacedStartTagForHeadElement);
      break;
    }
    default:
      wt(t, e);
  }
}
function wi(t, e) {
  switch (e.tagID) {
    case s.BODY:
    case s.HTML:
    case s.BR: {
      wt(t, e);
      break;
    }
    case s.TEMPLATE: {
      qe(t, e);
      break;
    }
    default:
      t._err(e, E.endTagWithoutMatchingOpenElement);
  }
}
function wt(t, e) {
  t._insertFakeElement(m.BODY, s.BODY), (t.insertionMode = d.IN_BODY), Dr(t, e);
}
function Dr(t, e) {
  switch (e.type) {
    case B.CHARACTER: {
      du(t, e);
      break;
    }
    case B.WHITESPACE_CHARACTER: {
      lu(t, e);
      break;
    }
    case B.COMMENT: {
      vn(t, e);
      break;
    }
    case B.START_TAG: {
      re(t, e);
      break;
    }
    case B.END_TAG: {
      Mr(t, e);
      break;
    }
    case B.EOF: {
      Eu(t, e);
      break;
    }
    default:
  }
}
function lu(t, e) {
  t._reconstructActiveFormattingElements(), t._insertCharacters(e);
}
function du(t, e) {
  t._reconstructActiveFormattingElements(),
    t._insertCharacters(e),
    (t.framesetOk = !1);
}
function Bi(t, e) {
  t.openElements.tmplCount === 0 &&
    t.treeAdapter.adoptAttributes(t.openElements.items[0], e.attrs);
}
function Ui(t, e) {
  let r = t.openElements.tryPeekProperlyNestedBodyElement();
  r &&
    t.openElements.tmplCount === 0 &&
    ((t.framesetOk = !1), t.treeAdapter.adoptAttributes(r, e.attrs));
}
function vi(t, e) {
  let r = t.openElements.tryPeekProperlyNestedBodyElement();
  t.framesetOk &&
    r &&
    (t.treeAdapter.detachNode(r),
    t.openElements.popAllUpToHtmlElement(),
    t._insertElement(e, p.HTML),
    (t.insertionMode = d.IN_FRAMESET));
}
function Fi(t, e) {
  t.openElements.hasInButtonScope(s.P) && t._closePElement(),
    t._insertElement(e, p.HTML);
}
function Wi(t, e) {
  t.openElements.hasInButtonScope(s.P) && t._closePElement(),
    St(t.openElements.currentTagId) && t.openElements.pop(),
    t._insertElement(e, p.HTML);
}
function Yi(t, e) {
  t.openElements.hasInButtonScope(s.P) && t._closePElement(),
    t._insertElement(e, p.HTML),
    (t.skipNextNewLine = !0),
    (t.framesetOk = !1);
}
function Vi(t, e) {
  let r = t.openElements.tmplCount > 0;
  (!t.formElement || r) &&
    (t.openElements.hasInButtonScope(s.P) && t._closePElement(),
    t._insertElement(e, p.HTML),
    r || (t.formElement = t.openElements.current));
}
function qi(t, e) {
  t.framesetOk = !1;
  let r = e.tagID;
  for (let n = t.openElements.stackTop; n >= 0; n--) {
    let u = t.openElements.tagIDs[n];
    if (
      (r === s.LI && u === s.LI) ||
      ((r === s.DD || r === s.DT) && (u === s.DD || u === s.DT))
    ) {
      t.openElements.generateImpliedEndTagsWithExclusion(u),
        t.openElements.popUntilTagNamePopped(u);
      break;
    }
    if (
      u !== s.ADDRESS &&
      u !== s.DIV &&
      u !== s.P &&
      t._isSpecialElement(t.openElements.items[n], u)
    )
      break;
  }
  t.openElements.hasInButtonScope(s.P) && t._closePElement(),
    t._insertElement(e, p.HTML);
}
function Xi(t, e) {
  t.openElements.hasInButtonScope(s.P) && t._closePElement(),
    t._insertElement(e, p.HTML),
    (t.tokenizer.state = te.PLAINTEXT);
}
function Qi(t, e) {
  t.openElements.hasInScope(s.BUTTON) &&
    (t.openElements.generateImpliedEndTags(),
    t.openElements.popUntilTagNamePopped(s.BUTTON)),
    t._reconstructActiveFormattingElements(),
    t._insertElement(e, p.HTML),
    (t.framesetOk = !1);
}
function Ki(t, e) {
  let r = t.activeFormattingElements.getElementEntryInScopeWithTagName(m.A);
  r &&
    (Wn(t, e),
    t.openElements.remove(r.element),
    t.activeFormattingElements.removeEntry(r)),
    t._reconstructActiveFormattingElements(),
    t._insertElement(e, p.HTML),
    t.activeFormattingElements.pushElement(t.openElements.current, e);
}
function zi(t, e) {
  t._reconstructActiveFormattingElements(),
    t._insertElement(e, p.HTML),
    t.activeFormattingElements.pushElement(t.openElements.current, e);
}
function ji(t, e) {
  t._reconstructActiveFormattingElements(),
    t.openElements.hasInScope(s.NOBR) &&
      (Wn(t, e), t._reconstructActiveFormattingElements()),
    t._insertElement(e, p.HTML),
    t.activeFormattingElements.pushElement(t.openElements.current, e);
}
function Gi(t, e) {
  t._reconstructActiveFormattingElements(),
    t._insertElement(e, p.HTML),
    t.activeFormattingElements.insertMarker(),
    (t.framesetOk = !1);
}
function $i(t, e) {
  t.treeAdapter.getDocumentMode(t.document) !== J.QUIRKS &&
    t.openElements.hasInButtonScope(s.P) &&
    t._closePElement(),
    t._insertElement(e, p.HTML),
    (t.framesetOk = !1),
    (t.insertionMode = d.IN_TABLE);
}
function hu(t, e) {
  t._reconstructActiveFormattingElements(),
    t._appendElement(e, p.HTML),
    (t.framesetOk = !1),
    (e.ackSelfClosing = !0);
}
function fu(t) {
  let e = It(t, ge.TYPE);
  return e != null && e.toLowerCase() === Ei;
}
function Ji(t, e) {
  t._reconstructActiveFormattingElements(),
    t._appendElement(e, p.HTML),
    fu(e) || (t.framesetOk = !1),
    (e.ackSelfClosing = !0);
}
function Zi(t, e) {
  t._appendElement(e, p.HTML), (e.ackSelfClosing = !0);
}
function eo(t, e) {
  t.openElements.hasInButtonScope(s.P) && t._closePElement(),
    t._appendElement(e, p.HTML),
    (t.framesetOk = !1),
    (e.ackSelfClosing = !0);
}
function to(t, e) {
  (e.tagName = m.IMG), (e.tagID = s.IMG), hu(t, e);
}
function ro(t, e) {
  t._insertElement(e, p.HTML),
    (t.skipNextNewLine = !0),
    (t.tokenizer.state = te.RCDATA),
    (t.originalInsertionMode = t.insertionMode),
    (t.framesetOk = !1),
    (t.insertionMode = d.TEXT);
}
function no(t, e) {
  t.openElements.hasInButtonScope(s.P) && t._closePElement(),
    t._reconstructActiveFormattingElements(),
    (t.framesetOk = !1),
    t._switchToTextParsing(e, te.RAWTEXT);
}
function so(t, e) {
  (t.framesetOk = !1), t._switchToTextParsing(e, te.RAWTEXT);
}
function iu(t, e) {
  t._switchToTextParsing(e, te.RAWTEXT);
}
function uo(t, e) {
  t._reconstructActiveFormattingElements(),
    t._insertElement(e, p.HTML),
    (t.framesetOk = !1),
    (t.insertionMode =
      t.insertionMode === d.IN_TABLE ||
      t.insertionMode === d.IN_CAPTION ||
      t.insertionMode === d.IN_TABLE_BODY ||
      t.insertionMode === d.IN_ROW ||
      t.insertionMode === d.IN_CELL
        ? d.IN_SELECT_IN_TABLE
        : d.IN_SELECT);
}
function ao(t, e) {
  t.openElements.currentTagId === s.OPTION && t.openElements.pop(),
    t._reconstructActiveFormattingElements(),
    t._insertElement(e, p.HTML);
}
function io(t, e) {
  t.openElements.hasInScope(s.RUBY) && t.openElements.generateImpliedEndTags(),
    t._insertElement(e, p.HTML);
}
function oo(t, e) {
  t.openElements.hasInScope(s.RUBY) &&
    t.openElements.generateImpliedEndTagsWithExclusion(s.RTC),
    t._insertElement(e, p.HTML);
}
function co(t, e) {
  t._reconstructActiveFormattingElements(),
    Sr(e),
    Lt(e),
    e.selfClosing
      ? t._appendElement(e, p.MATHML)
      : t._insertElement(e, p.MATHML),
    (e.ackSelfClosing = !0);
}
function lo(t, e) {
  t._reconstructActiveFormattingElements(),
    yr(e),
    Lt(e),
    e.selfClosing ? t._appendElement(e, p.SVG) : t._insertElement(e, p.SVG),
    (e.ackSelfClosing = !0);
}
function ou(t, e) {
  t._reconstructActiveFormattingElements(), t._insertElement(e, p.HTML);
}
function re(t, e) {
  switch (e.tagID) {
    case s.I:
    case s.S:
    case s.B:
    case s.U:
    case s.EM:
    case s.TT:
    case s.BIG:
    case s.CODE:
    case s.FONT:
    case s.SMALL:
    case s.STRIKE:
    case s.STRONG: {
      zi(t, e);
      break;
    }
    case s.A: {
      Ki(t, e);
      break;
    }
    case s.H1:
    case s.H2:
    case s.H3:
    case s.H4:
    case s.H5:
    case s.H6: {
      Wi(t, e);
      break;
    }
    case s.P:
    case s.DL:
    case s.OL:
    case s.UL:
    case s.DIV:
    case s.DIR:
    case s.NAV:
    case s.MAIN:
    case s.MENU:
    case s.ASIDE:
    case s.CENTER:
    case s.FIGURE:
    case s.FOOTER:
    case s.HEADER:
    case s.HGROUP:
    case s.DIALOG:
    case s.DETAILS:
    case s.ADDRESS:
    case s.ARTICLE:
    case s.SECTION:
    case s.SUMMARY:
    case s.FIELDSET:
    case s.BLOCKQUOTE:
    case s.FIGCAPTION: {
      Fi(t, e);
      break;
    }
    case s.LI:
    case s.DD:
    case s.DT: {
      qi(t, e);
      break;
    }
    case s.BR:
    case s.IMG:
    case s.WBR:
    case s.AREA:
    case s.EMBED:
    case s.KEYGEN: {
      hu(t, e);
      break;
    }
    case s.HR: {
      eo(t, e);
      break;
    }
    case s.RB:
    case s.RTC: {
      io(t, e);
      break;
    }
    case s.RT:
    case s.RP: {
      oo(t, e);
      break;
    }
    case s.PRE:
    case s.LISTING: {
      Yi(t, e);
      break;
    }
    case s.XMP: {
      no(t, e);
      break;
    }
    case s.SVG: {
      lo(t, e);
      break;
    }
    case s.HTML: {
      Bi(t, e);
      break;
    }
    case s.BASE:
    case s.LINK:
    case s.META:
    case s.STYLE:
    case s.TITLE:
    case s.SCRIPT:
    case s.BGSOUND:
    case s.BASEFONT:
    case s.TEMPLATE: {
      be(t, e);
      break;
    }
    case s.BODY: {
      Ui(t, e);
      break;
    }
    case s.FORM: {
      Vi(t, e);
      break;
    }
    case s.NOBR: {
      ji(t, e);
      break;
    }
    case s.MATH: {
      co(t, e);
      break;
    }
    case s.TABLE: {
      $i(t, e);
      break;
    }
    case s.INPUT: {
      Ji(t, e);
      break;
    }
    case s.PARAM:
    case s.TRACK:
    case s.SOURCE: {
      Zi(t, e);
      break;
    }
    case s.IMAGE: {
      to(t, e);
      break;
    }
    case s.BUTTON: {
      Qi(t, e);
      break;
    }
    case s.APPLET:
    case s.OBJECT:
    case s.MARQUEE: {
      Gi(t, e);
      break;
    }
    case s.IFRAME: {
      so(t, e);
      break;
    }
    case s.SELECT: {
      uo(t, e);
      break;
    }
    case s.OPTION:
    case s.OPTGROUP: {
      ao(t, e);
      break;
    }
    case s.NOEMBED: {
      iu(t, e);
      break;
    }
    case s.FRAMESET: {
      vi(t, e);
      break;
    }
    case s.TEXTAREA: {
      ro(t, e);
      break;
    }
    case s.NOSCRIPT: {
      t.options.scriptingEnabled ? iu(t, e) : ou(t, e);
      break;
    }
    case s.PLAINTEXT: {
      Xi(t, e);
      break;
    }
    case s.COL:
    case s.TH:
    case s.TD:
    case s.TR:
    case s.HEAD:
    case s.FRAME:
    case s.TBODY:
    case s.TFOOT:
    case s.THEAD:
    case s.CAPTION:
    case s.COLGROUP:
      break;
    default:
      ou(t, e);
  }
}
function ho(t, e) {
  if (
    t.openElements.hasInScope(s.BODY) &&
    ((t.insertionMode = d.AFTER_BODY), t.options.sourceCodeLocationInfo)
  ) {
    let r = t.openElements.tryPeekProperlyNestedBodyElement();
    r && t._setEndLocation(r, e);
  }
}
function fo(t, e) {
  t.openElements.hasInScope(s.BODY) &&
    ((t.insertionMode = d.AFTER_BODY), Nu(t, e));
}
function mo(t, e) {
  let r = e.tagID;
  t.openElements.hasInScope(r) &&
    (t.openElements.generateImpliedEndTags(),
    t.openElements.popUntilTagNamePopped(r));
}
function Eo(t) {
  let e = t.openElements.tmplCount > 0,
    { formElement: r } = t;
  e || (t.formElement = null),
    (r || e) &&
      t.openElements.hasInScope(s.FORM) &&
      (t.openElements.generateImpliedEndTags(),
      e
        ? t.openElements.popUntilTagNamePopped(s.FORM)
        : r && t.openElements.remove(r));
}
function To(t) {
  t.openElements.hasInButtonScope(s.P) || t._insertFakeElement(m.P, s.P),
    t._closePElement();
}
function po(t) {
  t.openElements.hasInListItemScope(s.LI) &&
    (t.openElements.generateImpliedEndTagsWithExclusion(s.LI),
    t.openElements.popUntilTagNamePopped(s.LI));
}
function go(t, e) {
  let r = e.tagID;
  t.openElements.hasInScope(r) &&
    (t.openElements.generateImpliedEndTagsWithExclusion(r),
    t.openElements.popUntilTagNamePopped(r));
}
function bo(t) {
  t.openElements.hasNumberedHeaderInScope() &&
    (t.openElements.generateImpliedEndTags(),
    t.openElements.popUntilNumberedHeaderPopped());
}
function _o(t, e) {
  let r = e.tagID;
  t.openElements.hasInScope(r) &&
    (t.openElements.generateImpliedEndTags(),
    t.openElements.popUntilTagNamePopped(r),
    t.activeFormattingElements.clearToLastMarker());
}
function Ao(t) {
  t._reconstructActiveFormattingElements(),
    t._insertFakeElement(m.BR, s.BR),
    t.openElements.pop(),
    (t.framesetOk = !1);
}
function mu(t, e) {
  let r = e.tagName,
    n = e.tagID;
  for (let u = t.openElements.stackTop; u > 0; u--) {
    let o = t.openElements.items[u],
      h = t.openElements.tagIDs[u];
    if (n === h && (n !== s.UNKNOWN || t.treeAdapter.getTagName(o) === r)) {
      t.openElements.generateImpliedEndTagsWithExclusion(n),
        t.openElements.stackTop >= u && t.openElements.shortenToLength(u);
      break;
    }
    if (t._isSpecialElement(o, h)) break;
  }
}
function Mr(t, e) {
  switch (e.tagID) {
    case s.A:
    case s.B:
    case s.I:
    case s.S:
    case s.U:
    case s.EM:
    case s.TT:
    case s.BIG:
    case s.CODE:
    case s.FONT:
    case s.NOBR:
    case s.SMALL:
    case s.STRIKE:
    case s.STRONG: {
      Wn(t, e);
      break;
    }
    case s.P: {
      To(t);
      break;
    }
    case s.DL:
    case s.UL:
    case s.OL:
    case s.DIR:
    case s.DIV:
    case s.NAV:
    case s.PRE:
    case s.MAIN:
    case s.MENU:
    case s.ASIDE:
    case s.BUTTON:
    case s.CENTER:
    case s.FIGURE:
    case s.FOOTER:
    case s.HEADER:
    case s.HGROUP:
    case s.DIALOG:
    case s.ADDRESS:
    case s.ARTICLE:
    case s.DETAILS:
    case s.SECTION:
    case s.SUMMARY:
    case s.LISTING:
    case s.FIELDSET:
    case s.BLOCKQUOTE:
    case s.FIGCAPTION: {
      mo(t, e);
      break;
    }
    case s.LI: {
      po(t);
      break;
    }
    case s.DD:
    case s.DT: {
      go(t, e);
      break;
    }
    case s.H1:
    case s.H2:
    case s.H3:
    case s.H4:
    case s.H5:
    case s.H6: {
      bo(t);
      break;
    }
    case s.BR: {
      Ao(t);
      break;
    }
    case s.BODY: {
      ho(t, e);
      break;
    }
    case s.HTML: {
      fo(t, e);
      break;
    }
    case s.FORM: {
      Eo(t);
      break;
    }
    case s.APPLET:
    case s.OBJECT:
    case s.MARQUEE: {
      _o(t, e);
      break;
    }
    case s.TEMPLATE: {
      qe(t, e);
      break;
    }
    default:
      mu(t, e);
  }
}
function Eu(t, e) {
  t.tmplInsertionModeStack.length > 0 ? Cu(t, e) : Yn(t, e);
}
function Co(t, e) {
  var r;
  e.tagID === s.SCRIPT &&
    ((r = t.scriptHandler) === null ||
      r === void 0 ||
      r.call(t, t.openElements.current)),
    t.openElements.pop(),
    (t.insertionMode = t.originalInsertionMode);
}
function No(t, e) {
  t._err(e, E.eofInElementThatCanContainOnlyText),
    t.openElements.pop(),
    (t.insertionMode = t.originalInsertionMode),
    t.onEof(e);
}
function Un(t, e) {
  if (cu.has(t.openElements.currentTagId))
    switch (
      ((t.pendingCharacterTokens.length = 0),
      (t.hasNonWhitespacePendingCharacterToken = !1),
      (t.originalInsertionMode = t.insertionMode),
      (t.insertionMode = d.IN_TABLE_TEXT),
      e.type)
    ) {
      case B.CHARACTER: {
        pu(t, e);
        break;
      }
      case B.WHITESPACE_CHARACTER: {
        Tu(t, e);
        break;
      }
    }
  else Ut(t, e);
}
function Io(t, e) {
  t.openElements.clearBackToTableContext(),
    t.activeFormattingElements.insertMarker(),
    t._insertElement(e, p.HTML),
    (t.insertionMode = d.IN_CAPTION);
}
function So(t, e) {
  t.openElements.clearBackToTableContext(),
    t._insertElement(e, p.HTML),
    (t.insertionMode = d.IN_COLUMN_GROUP);
}
function yo(t, e) {
  t.openElements.clearBackToTableContext(),
    t._insertFakeElement(m.COLGROUP, s.COLGROUP),
    (t.insertionMode = d.IN_COLUMN_GROUP),
    Vn(t, e);
}
function Ro(t, e) {
  t.openElements.clearBackToTableContext(),
    t._insertElement(e, p.HTML),
    (t.insertionMode = d.IN_TABLE_BODY);
}
function xo(t, e) {
  t.openElements.clearBackToTableContext(),
    t._insertFakeElement(m.TBODY, s.TBODY),
    (t.insertionMode = d.IN_TABLE_BODY),
    Pr(t, e);
}
function Lo(t, e) {
  t.openElements.hasInTableScope(s.TABLE) &&
    (t.openElements.popUntilTagNamePopped(s.TABLE),
    t._resetInsertionMode(),
    t._processStartTag(e));
}
function Oo(t, e) {
  fu(e) ? t._appendElement(e, p.HTML) : Ut(t, e), (e.ackSelfClosing = !0);
}
function Do(t, e) {
  !t.formElement &&
    t.openElements.tmplCount === 0 &&
    (t._insertElement(e, p.HTML),
    (t.formElement = t.openElements.current),
    t.openElements.pop());
}
function nt(t, e) {
  switch (e.tagID) {
    case s.TD:
    case s.TH:
    case s.TR: {
      xo(t, e);
      break;
    }
    case s.STYLE:
    case s.SCRIPT:
    case s.TEMPLATE: {
      be(t, e);
      break;
    }
    case s.COL: {
      yo(t, e);
      break;
    }
    case s.FORM: {
      Do(t, e);
      break;
    }
    case s.TABLE: {
      Lo(t, e);
      break;
    }
    case s.TBODY:
    case s.TFOOT:
    case s.THEAD: {
      Ro(t, e);
      break;
    }
    case s.INPUT: {
      Oo(t, e);
      break;
    }
    case s.CAPTION: {
      Io(t, e);
      break;
    }
    case s.COLGROUP: {
      So(t, e);
      break;
    }
    default:
      Ut(t, e);
  }
}
function Bt(t, e) {
  switch (e.tagID) {
    case s.TABLE: {
      t.openElements.hasInTableScope(s.TABLE) &&
        (t.openElements.popUntilTagNamePopped(s.TABLE),
        t._resetInsertionMode());
      break;
    }
    case s.TEMPLATE: {
      qe(t, e);
      break;
    }
    case s.BODY:
    case s.CAPTION:
    case s.COL:
    case s.COLGROUP:
    case s.HTML:
    case s.TBODY:
    case s.TD:
    case s.TFOOT:
    case s.TH:
    case s.THEAD:
    case s.TR:
      break;
    default:
      Ut(t, e);
  }
}
function Ut(t, e) {
  let r = t.fosterParentingEnabled;
  (t.fosterParentingEnabled = !0), Dr(t, e), (t.fosterParentingEnabled = r);
}
function Tu(t, e) {
  t.pendingCharacterTokens.push(e);
}
function pu(t, e) {
  t.pendingCharacterTokens.push(e),
    (t.hasNonWhitespacePendingCharacterToken = !0);
}
function Dt(t, e) {
  let r = 0;
  if (t.hasNonWhitespacePendingCharacterToken)
    for (; r < t.pendingCharacterTokens.length; r++)
      Ut(t, t.pendingCharacterTokens[r]);
  else
    for (; r < t.pendingCharacterTokens.length; r++)
      t._insertCharacters(t.pendingCharacterTokens[r]);
  (t.insertionMode = t.originalInsertionMode), t._processToken(e);
}
var gu = new Set([
  s.CAPTION,
  s.COL,
  s.COLGROUP,
  s.TBODY,
  s.TD,
  s.TFOOT,
  s.TH,
  s.THEAD,
  s.TR,
]);
function Mo(t, e) {
  let r = e.tagID;
  gu.has(r)
    ? t.openElements.hasInTableScope(s.CAPTION) &&
      (t.openElements.generateImpliedEndTags(),
      t.openElements.popUntilTagNamePopped(s.CAPTION),
      t.activeFormattingElements.clearToLastMarker(),
      (t.insertionMode = d.IN_TABLE),
      nt(t, e))
    : re(t, e);
}
function Po(t, e) {
  let r = e.tagID;
  switch (r) {
    case s.CAPTION:
    case s.TABLE: {
      t.openElements.hasInTableScope(s.CAPTION) &&
        (t.openElements.generateImpliedEndTags(),
        t.openElements.popUntilTagNamePopped(s.CAPTION),
        t.activeFormattingElements.clearToLastMarker(),
        (t.insertionMode = d.IN_TABLE),
        r === s.TABLE && Bt(t, e));
      break;
    }
    case s.BODY:
    case s.COL:
    case s.COLGROUP:
    case s.HTML:
    case s.TBODY:
    case s.TD:
    case s.TFOOT:
    case s.TH:
    case s.THEAD:
    case s.TR:
      break;
    default:
      Mr(t, e);
  }
}
function Vn(t, e) {
  switch (e.tagID) {
    case s.HTML: {
      re(t, e);
      break;
    }
    case s.COL: {
      t._appendElement(e, p.HTML), (e.ackSelfClosing = !0);
      break;
    }
    case s.TEMPLATE: {
      be(t, e);
      break;
    }
    default:
      Lr(t, e);
  }
}
function ko(t, e) {
  switch (e.tagID) {
    case s.COLGROUP: {
      t.openElements.currentTagId === s.COLGROUP &&
        (t.openElements.pop(), (t.insertionMode = d.IN_TABLE));
      break;
    }
    case s.TEMPLATE: {
      qe(t, e);
      break;
    }
    case s.COL:
      break;
    default:
      Lr(t, e);
  }
}
function Lr(t, e) {
  t.openElements.currentTagId === s.COLGROUP &&
    (t.openElements.pop(), (t.insertionMode = d.IN_TABLE), t._processToken(e));
}
function Pr(t, e) {
  switch (e.tagID) {
    case s.TR: {
      t.openElements.clearBackToTableBodyContext(),
        t._insertElement(e, p.HTML),
        (t.insertionMode = d.IN_ROW);
      break;
    }
    case s.TH:
    case s.TD: {
      t.openElements.clearBackToTableBodyContext(),
        t._insertFakeElement(m.TR, s.TR),
        (t.insertionMode = d.IN_ROW),
        kr(t, e);
      break;
    }
    case s.CAPTION:
    case s.COL:
    case s.COLGROUP:
    case s.TBODY:
    case s.TFOOT:
    case s.THEAD: {
      t.openElements.hasTableBodyContextInTableScope() &&
        (t.openElements.clearBackToTableBodyContext(),
        t.openElements.pop(),
        (t.insertionMode = d.IN_TABLE),
        nt(t, e));
      break;
    }
    default:
      nt(t, e);
  }
}
function Fn(t, e) {
  let r = e.tagID;
  switch (e.tagID) {
    case s.TBODY:
    case s.TFOOT:
    case s.THEAD: {
      t.openElements.hasInTableScope(r) &&
        (t.openElements.clearBackToTableBodyContext(),
        t.openElements.pop(),
        (t.insertionMode = d.IN_TABLE));
      break;
    }
    case s.TABLE: {
      t.openElements.hasTableBodyContextInTableScope() &&
        (t.openElements.clearBackToTableBodyContext(),
        t.openElements.pop(),
        (t.insertionMode = d.IN_TABLE),
        Bt(t, e));
      break;
    }
    case s.BODY:
    case s.CAPTION:
    case s.COL:
    case s.COLGROUP:
    case s.HTML:
    case s.TD:
    case s.TH:
    case s.TR:
      break;
    default:
      Bt(t, e);
  }
}
function kr(t, e) {
  switch (e.tagID) {
    case s.TH:
    case s.TD: {
      t.openElements.clearBackToTableRowContext(),
        t._insertElement(e, p.HTML),
        (t.insertionMode = d.IN_CELL),
        t.activeFormattingElements.insertMarker();
      break;
    }
    case s.CAPTION:
    case s.COL:
    case s.COLGROUP:
    case s.TBODY:
    case s.TFOOT:
    case s.THEAD:
    case s.TR: {
      t.openElements.hasInTableScope(s.TR) &&
        (t.openElements.clearBackToTableRowContext(),
        t.openElements.pop(),
        (t.insertionMode = d.IN_TABLE_BODY),
        Pr(t, e));
      break;
    }
    default:
      nt(t, e);
  }
}
function bu(t, e) {
  switch (e.tagID) {
    case s.TR: {
      t.openElements.hasInTableScope(s.TR) &&
        (t.openElements.clearBackToTableRowContext(),
        t.openElements.pop(),
        (t.insertionMode = d.IN_TABLE_BODY));
      break;
    }
    case s.TABLE: {
      t.openElements.hasInTableScope(s.TR) &&
        (t.openElements.clearBackToTableRowContext(),
        t.openElements.pop(),
        (t.insertionMode = d.IN_TABLE_BODY),
        Fn(t, e));
      break;
    }
    case s.TBODY:
    case s.TFOOT:
    case s.THEAD: {
      (t.openElements.hasInTableScope(e.tagID) ||
        t.openElements.hasInTableScope(s.TR)) &&
        (t.openElements.clearBackToTableRowContext(),
        t.openElements.pop(),
        (t.insertionMode = d.IN_TABLE_BODY),
        Fn(t, e));
      break;
    }
    case s.BODY:
    case s.CAPTION:
    case s.COL:
    case s.COLGROUP:
    case s.HTML:
    case s.TD:
    case s.TH:
      break;
    default:
      Bt(t, e);
  }
}
function Ho(t, e) {
  let r = e.tagID;
  gu.has(r)
    ? (t.openElements.hasInTableScope(s.TD) ||
        t.openElements.hasInTableScope(s.TH)) &&
      (t._closeTableCell(), kr(t, e))
    : re(t, e);
}
function wo(t, e) {
  let r = e.tagID;
  switch (r) {
    case s.TD:
    case s.TH: {
      t.openElements.hasInTableScope(r) &&
        (t.openElements.generateImpliedEndTags(),
        t.openElements.popUntilTagNamePopped(r),
        t.activeFormattingElements.clearToLastMarker(),
        (t.insertionMode = d.IN_ROW));
      break;
    }
    case s.TABLE:
    case s.TBODY:
    case s.TFOOT:
    case s.THEAD:
    case s.TR: {
      t.openElements.hasInTableScope(r) && (t._closeTableCell(), bu(t, e));
      break;
    }
    case s.BODY:
    case s.CAPTION:
    case s.COL:
    case s.COLGROUP:
    case s.HTML:
      break;
    default:
      Mr(t, e);
  }
}
function _u(t, e) {
  switch (e.tagID) {
    case s.HTML: {
      re(t, e);
      break;
    }
    case s.OPTION: {
      t.openElements.currentTagId === s.OPTION && t.openElements.pop(),
        t._insertElement(e, p.HTML);
      break;
    }
    case s.OPTGROUP: {
      t.openElements.currentTagId === s.OPTION && t.openElements.pop(),
        t.openElements.currentTagId === s.OPTGROUP && t.openElements.pop(),
        t._insertElement(e, p.HTML);
      break;
    }
    case s.INPUT:
    case s.KEYGEN:
    case s.TEXTAREA:
    case s.SELECT: {
      t.openElements.hasInSelectScope(s.SELECT) &&
        (t.openElements.popUntilTagNamePopped(s.SELECT),
        t._resetInsertionMode(),
        e.tagID !== s.SELECT && t._processStartTag(e));
      break;
    }
    case s.SCRIPT:
    case s.TEMPLATE: {
      be(t, e);
      break;
    }
    default:
  }
}
function Au(t, e) {
  switch (e.tagID) {
    case s.OPTGROUP: {
      t.openElements.stackTop > 0 &&
        t.openElements.currentTagId === s.OPTION &&
        t.openElements.tagIDs[t.openElements.stackTop - 1] === s.OPTGROUP &&
        t.openElements.pop(),
        t.openElements.currentTagId === s.OPTGROUP && t.openElements.pop();
      break;
    }
    case s.OPTION: {
      t.openElements.currentTagId === s.OPTION && t.openElements.pop();
      break;
    }
    case s.SELECT: {
      t.openElements.hasInSelectScope(s.SELECT) &&
        (t.openElements.popUntilTagNamePopped(s.SELECT),
        t._resetInsertionMode());
      break;
    }
    case s.TEMPLATE: {
      qe(t, e);
      break;
    }
    default:
  }
}
function Bo(t, e) {
  let r = e.tagID;
  r === s.CAPTION ||
  r === s.TABLE ||
  r === s.TBODY ||
  r === s.TFOOT ||
  r === s.THEAD ||
  r === s.TR ||
  r === s.TD ||
  r === s.TH
    ? (t.openElements.popUntilTagNamePopped(s.SELECT),
      t._resetInsertionMode(),
      t._processStartTag(e))
    : _u(t, e);
}
function Uo(t, e) {
  let r = e.tagID;
  r === s.CAPTION ||
  r === s.TABLE ||
  r === s.TBODY ||
  r === s.TFOOT ||
  r === s.THEAD ||
  r === s.TR ||
  r === s.TD ||
  r === s.TH
    ? t.openElements.hasInTableScope(r) &&
      (t.openElements.popUntilTagNamePopped(s.SELECT),
      t._resetInsertionMode(),
      t.onEndTag(e))
    : Au(t, e);
}
function vo(t, e) {
  switch (e.tagID) {
    case s.BASE:
    case s.BASEFONT:
    case s.BGSOUND:
    case s.LINK:
    case s.META:
    case s.NOFRAMES:
    case s.SCRIPT:
    case s.STYLE:
    case s.TEMPLATE:
    case s.TITLE: {
      be(t, e);
      break;
    }
    case s.CAPTION:
    case s.COLGROUP:
    case s.TBODY:
    case s.TFOOT:
    case s.THEAD: {
      (t.tmplInsertionModeStack[0] = d.IN_TABLE),
        (t.insertionMode = d.IN_TABLE),
        nt(t, e);
      break;
    }
    case s.COL: {
      (t.tmplInsertionModeStack[0] = d.IN_COLUMN_GROUP),
        (t.insertionMode = d.IN_COLUMN_GROUP),
        Vn(t, e);
      break;
    }
    case s.TR: {
      (t.tmplInsertionModeStack[0] = d.IN_TABLE_BODY),
        (t.insertionMode = d.IN_TABLE_BODY),
        Pr(t, e);
      break;
    }
    case s.TD:
    case s.TH: {
      (t.tmplInsertionModeStack[0] = d.IN_ROW),
        (t.insertionMode = d.IN_ROW),
        kr(t, e);
      break;
    }
    default:
      (t.tmplInsertionModeStack[0] = d.IN_BODY),
        (t.insertionMode = d.IN_BODY),
        re(t, e);
  }
}
function Fo(t, e) {
  e.tagID === s.TEMPLATE && qe(t, e);
}
function Cu(t, e) {
  t.openElements.tmplCount > 0
    ? (t.openElements.popUntilTagNamePopped(s.TEMPLATE),
      t.activeFormattingElements.clearToLastMarker(),
      t.tmplInsertionModeStack.shift(),
      t._resetInsertionMode(),
      t.onEof(e))
    : Yn(t, e);
}
function Wo(t, e) {
  e.tagID === s.HTML ? re(t, e) : Or(t, e);
}
function Nu(t, e) {
  var r;
  if (e.tagID === s.HTML) {
    if (
      (t.fragmentContext || (t.insertionMode = d.AFTER_AFTER_BODY),
      t.options.sourceCodeLocationInfo && t.openElements.tagIDs[0] === s.HTML)
    ) {
      t._setEndLocation(t.openElements.items[0], e);
      let n = t.openElements.items[1];
      n &&
        !(
          !(
            (r = t.treeAdapter.getNodeSourceCodeLocation(n)) === null ||
            r === void 0
          ) && r.endTag
        ) &&
        t._setEndLocation(n, e);
    }
  } else Or(t, e);
}
function Or(t, e) {
  (t.insertionMode = d.IN_BODY), Dr(t, e);
}
function Yo(t, e) {
  switch (e.tagID) {
    case s.HTML: {
      re(t, e);
      break;
    }
    case s.FRAMESET: {
      t._insertElement(e, p.HTML);
      break;
    }
    case s.FRAME: {
      t._appendElement(e, p.HTML), (e.ackSelfClosing = !0);
      break;
    }
    case s.NOFRAMES: {
      be(t, e);
      break;
    }
    default:
  }
}
function Vo(t, e) {
  e.tagID === s.FRAMESET &&
    !t.openElements.isRootHtmlElementCurrent() &&
    (t.openElements.pop(),
    !t.fragmentContext &&
      t.openElements.currentTagId !== s.FRAMESET &&
      (t.insertionMode = d.AFTER_FRAMESET));
}
function qo(t, e) {
  switch (e.tagID) {
    case s.HTML: {
      re(t, e);
      break;
    }
    case s.NOFRAMES: {
      be(t, e);
      break;
    }
    default:
  }
}
function Xo(t, e) {
  e.tagID === s.HTML && (t.insertionMode = d.AFTER_AFTER_FRAMESET);
}
function Qo(t, e) {
  e.tagID === s.HTML ? re(t, e) : xr(t, e);
}
function xr(t, e) {
  (t.insertionMode = d.IN_BODY), Dr(t, e);
}
function Ko(t, e) {
  switch (e.tagID) {
    case s.HTML: {
      re(t, e);
      break;
    }
    case s.NOFRAMES: {
      be(t, e);
      break;
    }
    default:
  }
}
function zo(t, e) {
  (e.chars = q), t._insertCharacters(e);
}
function jo(t, e) {
  t._insertCharacters(e), (t.framesetOk = !1);
}
function Iu(t) {
  for (
    ;
    t.treeAdapter.getNamespaceURI(t.openElements.current) !== p.HTML &&
    !t._isIntegrationPoint(t.openElements.currentTagId, t.openElements.current);

  )
    t.openElements.pop();
}
function Go(t, e) {
  if (Hn(e)) Iu(t), t._startTagOutsideForeignContent(e);
  else {
    let r = t._getAdjustedCurrentElement(),
      n = t.treeAdapter.getNamespaceURI(r);
    n === p.MATHML ? Sr(e) : n === p.SVG && (wn(e), yr(e)),
      Lt(e),
      e.selfClosing ? t._appendElement(e, n) : t._insertElement(e, n),
      (e.ackSelfClosing = !0);
  }
}
function $o(t, e) {
  if (e.tagID === s.P || e.tagID === s.BR) {
    Iu(t), t._endTagOutsideForeignContent(e);
    return;
  }
  for (let r = t.openElements.stackTop; r > 0; r--) {
    let n = t.openElements.items[r];
    if (t.treeAdapter.getNamespaceURI(n) === p.HTML) {
      t._endTagOutsideForeignContent(e);
      break;
    }
    let u = t.treeAdapter.getTagName(n);
    if (u.toLowerCase() === e.tagName) {
      (e.tagName = u), t.openElements.shortenToLength(r);
      break;
    }
  }
}
var Jo = new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"],
  ]),
  Gl =
    String.prototype.codePointAt != null
      ? (t, e) => t.codePointAt(e)
      : (t, e) =>
          (t.charCodeAt(e) & 64512) === 55296
            ? (t.charCodeAt(e) - 55296) * 1024 +
              t.charCodeAt(e + 1) -
              56320 +
              65536
            : t.charCodeAt(e);
function qn(t, e) {
  return function (n) {
    let u,
      o = 0,
      h = "";
    for (; (u = t.exec(n)); )
      o !== u.index && (h += n.substring(o, u.index)),
        (h += e.get(u[0].charCodeAt(0))),
        (o = u.index + 1);
    return h + n.substring(o);
  };
}
var $l = qn(/[&<>'"]/g, Jo),
  Zo = qn(
    /["&\u00A0]/g,
    new Map([
      [34, "&quot;"],
      [38, "&amp;"],
      [160, "&nbsp;"],
    ]),
  ),
  ec = qn(
    /[&<>\u00A0]/g,
    new Map([
      [38, "&amp;"],
      [60, "&lt;"],
      [62, "&gt;"],
      [160, "&nbsp;"],
    ]),
  );
var r0 = new Set([
  m.AREA,
  m.BASE,
  m.BASEFONT,
  m.BGSOUND,
  m.BR,
  m.COL,
  m.EMBED,
  m.FRAME,
  m.HR,
  m.IMG,
  m.INPUT,
  m.KEYGEN,
  m.LINK,
  m.META,
  m.PARAM,
  m.SOURCE,
  m.TRACK,
  m.WBR,
]);
function Su(t, e) {
  return rt.parse(t, e);
}
function yu(t, e, r) {
  typeof t == "string" && ((r = e), (e = t), (t = null));
  let n = rt.getFragmentParser(t, r);
  return n.tokenizer.write(e, !0), n.getFragment();
}
var Ru = new WeakMap();
function Hr(t, e) {
  let r = Su(e.trim(), xu(t));
  return (
    (r.documentElement = r.firstElementChild),
    (r.head = r.documentElement.firstElementChild),
    (r.body = r.head.nextElementSibling),
    r
  );
}
function wr(t, e) {
  return typeof e == "string" ? (e = e.trim()) : (e = ""), yu(e, xu(t));
}
function xu(t) {
  let e = Ru.get(t);
  return (
    e != null ||
      ((e = {
        treeAdapter: {
          createDocument() {
            let n = t.createElement("#document");
            return (n["x-mode"] = "no-quirks"), n;
          },
          setNodeSourceCodeLocation(n, u) {
            n.sourceCodeLocation = u;
          },
          getNodeSourceCodeLocation(n) {
            return n.sourceCodeLocation;
          },
          createDocumentFragment() {
            return t.createDocumentFragment();
          },
          createElement(n, u, o) {
            let h = t.createElementNS(u, n);
            for (let T = 0; T < o.length; T++) {
              let A = o[T];
              A.namespace == null ||
              A.namespace === "http://www.w3.org/1999/xhtml"
                ? h.setAttribute(A.name, A.value)
                : h.setAttributeNS(A.namespace, A.name, A.value);
            }
            return h;
          },
          createCommentNode(n) {
            return t.createComment(n);
          },
          appendChild(n, u) {
            n.appendChild(u);
          },
          insertBefore(n, u, o) {
            n.insertBefore(u, o);
          },
          setTemplateContent(n, u) {
            n.content = u;
          },
          getTemplateContent(n) {
            return n.content;
          },
          setDocumentType(n, u, o, h) {
            let T = n.childNodes.find((A) => A.nodeType === 10);
            T == null &&
              ((T = t.createDocumentTypeNode()),
              n.insertBefore(T, n.firstChild)),
              (T.nodeValue = "!DOCTYPE"),
              (T["x-name"] = u),
              (T["x-publicId"] = o),
              (T["x-systemId"] = h);
          },
          setDocumentMode(n, u) {
            n["x-mode"] = u;
          },
          getDocumentMode(n) {
            return n["x-mode"];
          },
          detachNode(n) {
            n.remove();
          },
          insertText(n, u) {
            let o = n.lastChild;
            o != null && o.nodeType === 3
              ? (o.nodeValue += u)
              : n.appendChild(t.createTextNode(u));
          },
          insertTextBefore(n, u, o) {
            let h = n.childNodes[n.childNodes.indexOf(o) - 1];
            h != null && h.nodeType === 3
              ? (h.nodeValue += u)
              : n.insertBefore(t.createTextNode(u), o);
          },
          adoptAttributes(n, u) {
            for (let o = 0; o < u.length; o++) {
              let h = u[o];
              n.hasAttributeNS(h.namespace, h.name) === !1 &&
                n.setAttributeNS(h.namespace, h.name, h.value);
            }
          },
          getFirstChild(n) {
            return n.childNodes[0];
          },
          getChildNodes(n) {
            return n.childNodes;
          },
          getParentNode(n) {
            return n.parentNode;
          },
          getAttrList(n) {
            return n.attributes.__items.map((o) => ({
              name: o.name,
              value: o.value,
              namespace: o.namespaceURI,
              prefix: null,
            }));
          },
          getTagName(n) {
            return n.namespaceURI === "http://www.w3.org/1999/xhtml"
              ? n.nodeName.toLowerCase()
              : n.nodeName;
          },
          getNamespaceURI(n) {
            return n.namespaceURI;
          },
          getTextNodeContent(n) {
            return n.nodeValue;
          },
          getCommentNodeContent(n) {
            return n.nodeValue;
          },
          getDocumentTypeNodeName(n) {
            return n["x-name"];
          },
          getDocumentTypeNodePublicId(n) {
            return n["x-publicId"];
          },
          getDocumentTypeNodeSystemId(n) {
            return n["x-systemId"];
          },
          isTextNode(n) {
            return n.nodeType === 3;
          },
          isCommentNode(n) {
            return n.nodeType === 8;
          },
          isDocumentTypeNode(n) {
            return n.nodeType === 10;
          },
          isElementNode(n) {
            return n.nodeType === 1;
          },
        },
      }),
      Ru.set(t, e)),
    e
  );
}
var Br = (function (t, e) {
  "use strict";
  return e(t, !0);
})(
  {
    document: {
      createElement() {
        return {};
      },
      nodeType: 9,
      documentElement: { nodeType: 1, nodeName: "HTML" },
    },
  },
  function (t, e) {
    "use strict";
    if (!t.document)
      throw new Error("jQuery requires a window with a document");
    var r = [],
      n = Object.getPrototypeOf,
      u = r.slice,
      o = r.flat
        ? function (a) {
            return r.flat.call(a);
          }
        : function (a) {
            return r.concat.apply([], a);
          },
      h = r.push,
      T = r.indexOf,
      A = {},
      y = A.toString,
      M = A.hasOwnProperty,
      R = M.toString,
      w = R.call(Object),
      Y = {};
    function K(a) {
      return a == null
        ? a + ""
        : typeof a == "object"
          ? A[y.call(a)] || "object"
          : typeof a;
    }
    function nn(a) {
      return a != null && a === a.window;
    }
    function ze(a) {
      var l = !!a && a.length,
        f = K(a);
      return typeof a == "function" || nn(a)
        ? !1
        : f === "array" ||
            l === 0 ||
            (typeof l == "number" && l > 0 && l - 1 in a);
    }
    var Z = t.document,
      nr = { type: !0, src: !0, nonce: !0, noModule: !0 };
    function sn(a, l, f) {
      f = f || Z;
      var g,
        b = f.createElement("script");
      if (((b.text = a), l)) for (g in nr) l[g] && (b[g] = l[g]);
      f.head.appendChild(b).parentNode.removeChild(b);
    }
    let I = {};
    var sr = "4.0.0-pre+9352011a7.dirty +selector",
      un = /HTML$/i,
      bs = function (a, l) {
        return new I.fn.init(a, l);
      };
    (I.fn = I.prototype =
      {
        jquery: sr,
        constructor: I,
        length: 0,
        toArray: function () {
          return u.call(this);
        },
        get: function (a) {
          return a == null
            ? u.call(this)
            : a < 0
              ? this[a + this.length]
              : this[a];
        },
        pushStack: function (a) {
          var l = I.merge(this.constructor(), a);
          return (l.prevObject = this), l;
        },
        each: function (a) {
          return I.each(this, a);
        },
        map: function (a) {
          return this.pushStack(
            I.map(this, function (l, f) {
              return a.call(l, f, l);
            }),
          );
        },
        slice: function () {
          return this.pushStack(u.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        even: function () {
          return this.pushStack(
            I.grep(this, function (a, l) {
              return (l + 1) % 2;
            }),
          );
        },
        odd: function () {
          return this.pushStack(
            I.grep(this, function (a, l) {
              return l % 2;
            }),
          );
        },
        eq: function (a) {
          var l = this.length,
            f = +a + (a < 0 ? l : 0);
          return this.pushStack(f >= 0 && f < l ? [this[f]] : []);
        },
        end: function () {
          return this.prevObject || this.constructor();
        },
      }),
      (I.extend = I.fn.extend =
        function () {
          var a,
            l,
            f,
            g,
            b,
            N,
            S = arguments[0] || {},
            O = 1,
            L = arguments.length,
            U = !1;
          for (
            typeof S == "boolean" && ((U = S), (S = arguments[O] || {}), O++),
              typeof S != "object" && typeof S != "function" && (S = {}),
              O === L && ((S = this), O--);
            O < L;
            O++
          )
            if ((a = arguments[O]) != null)
              for (l in a)
                (g = a[l]),
                  !(l === "__proto__" || S === g) &&
                    (U && g && (I.isPlainObject(g) || (b = Array.isArray(g)))
                      ? ((f = S[l]),
                        b && !Array.isArray(f)
                          ? (N = [])
                          : !b && !I.isPlainObject(f)
                            ? (N = {})
                            : (N = f),
                        (b = !1),
                        (S[l] = I.extend(U, N, g)))
                      : g !== void 0 && (S[l] = g));
          return S;
        }),
      I.extend({
        expando: "jQuery" + (sr + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (a) {
          throw new Error(a);
        },
        noop: function () {},
        isPlainObject: function (a) {
          var l, f;
          return !a || y.call(a) !== "[object Object]"
            ? !1
            : ((l = n(a)),
              l
                ? ((f = M.call(l, "constructor") && l.constructor),
                  typeof f == "function" && R.call(f) === w)
                : !0);
        },
        isEmptyObject: function (a) {
          var l;
          for (l in a) return !1;
          return !0;
        },
        globalEval: function (a, l, f) {
          sn(a, { nonce: l && l.nonce }, f);
        },
        each: function (a, l) {
          var f,
            g = 0;
          if (ze(a))
            for (f = a.length; g < f && l.call(a[g], g, a[g]) !== !1; g++);
          else for (g in a) if (l.call(a[g], g, a[g]) === !1) break;
          return a;
        },
        text: function (a) {
          var l,
            f = "",
            g = 0,
            b = a.nodeType;
          if (!b) for (; (l = a[g++]); ) f += I.text(l);
          return b === 1 || b === 11
            ? a.textContent
            : b === 9
              ? a.documentElement.textContent
              : b === 3 || b === 4
                ? a.nodeValue
                : f;
        },
        makeArray: function (a, l) {
          var f = l || [];
          return (
            a != null &&
              (ze(Object(a))
                ? I.merge(f, typeof a == "string" ? [a] : a)
                : h.call(f, a)),
            f
          );
        },
        inArray: function (a, l, f) {
          return l == null ? -1 : T.call(l, a, f);
        },
        isXMLDoc: function (a) {
          var l = a && a.namespaceURI,
            f = a && (a.ownerDocument || a).documentElement;
          return !un.test(l || (f && f.nodeName) || "HTML");
        },
        contains: function (a, l) {
          var f = l && l.parentNode;
          return (
            a === f ||
            !!(
              f &&
              f.nodeType === 1 &&
              (a.contains
                ? a.contains(f)
                : a.compareDocumentPosition &&
                  a.compareDocumentPosition(f) & 16)
            )
          );
        },
        merge: function (a, l) {
          for (var f = +l.length, g = 0, b = a.length; g < f; g++)
            a[b++] = l[g];
          return (a.length = b), a;
        },
        grep: function (a, l, f) {
          for (var g, b = [], N = 0, S = a.length, O = !f; N < S; N++)
            (g = !l(a[N], N)), g !== O && b.push(a[N]);
          return b;
        },
        map: function (a, l, f) {
          var g,
            b,
            N = 0,
            S = [];
          if (ze(a))
            for (g = a.length; N < g; N++)
              (b = l(a[N], N, f)), b != null && S.push(b);
          else for (N in a) (b = l(a[N], N, f)), b != null && S.push(b);
          return o(S);
        },
        guid: 1,
        support: Y,
      }),
      typeof Symbol == "function" &&
        (I.fn[Symbol.iterator] = r[Symbol.iterator]),
      I.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
          " ",
        ),
        function (a, l) {
          A["[object " + l + "]"] = l.toLowerCase();
        },
      );
    function ne(a, l) {
      return a.nodeName && a.nodeName.toLowerCase() === l.toLowerCase();
    }
    var an = r.pop,
      W = "[\\x20\\t\\r\\n\\f]",
      ft = Z.documentMode;
    try {
      Z.querySelector(":has(*,:jqfake)"), (Y.cssHas = !1);
    } catch {
      Y.cssHas = !0;
    }
    var Ee = [];
    ft &&
      Ee.push(
        ":enabled",
        ":disabled",
        "\\[" + W + "*name" + W + "*=" + W + `*(?:''|"")`,
      ),
      Y.cssHas || Ee.push(":has"),
      (Ee = Ee.length && new RegExp(Ee.join("|")));
    var je = new RegExp(
        "^" + W + "+|((?:^|[^\\\\])(?:\\\\.)*)" + W + "+$",
        "g",
      ),
      ye =
        "(?:\\\\[\\da-fA-F]{1,6}" +
        W +
        "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
      on =
        "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      cn = new RegExp("^" + W + "*([>+~]|" + W + ")" + W + "*"),
      _s = new RegExp(W + "|>"),
      mt = /[+~]/,
      x = Z.documentElement,
      C = x.matches || x.msMatchesSelector;
    function k() {
      var a = [];
      function l(f, g) {
        return (
          a.push(f + " ") > I.expr.cacheLength && delete l[a.shift()],
          (l[f + " "] = g)
        );
      }
      return l;
    }
    function V(a) {
      return a && typeof a.getElementsByTagName < "u" && a;
    }
    var ie =
        "\\[" +
        W +
        "*(" +
        ye +
        ")(?:" +
        W +
        "*([*^$|!~]?=)" +
        W +
        `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` +
        ye +
        "))|)" +
        W +
        "*\\]",
      _e =
        ":(" +
        ye +
        `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` +
        ie +
        ")*)|.*)\\)|)",
      ln = {
        ID: new RegExp("^#(" + ye + ")"),
        CLASS: new RegExp("^\\.(" + ye + ")"),
        TAG: new RegExp("^(" + ye + "|[*])"),
        ATTR: new RegExp("^" + ie),
        PSEUDO: new RegExp("^" + _e),
        CHILD: new RegExp(
          "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
            W +
            "*(even|odd|(([+-]|)(\\d*)n|)" +
            W +
            "*(?:([+-]|)" +
            W +
            "*(\\d+)|))" +
            W +
            "*\\)|)",
          "i",
        ),
      },
      ca = new RegExp(_e),
      la = new RegExp("\\\\[\\da-fA-F]{1,6}" + W + "?|\\\\([^\\r\\n\\f])", "g"),
      da = function (a, l) {
        var f = "0x" + a.slice(1) - 65536;
        return (
          l ||
          (f < 0
            ? String.fromCharCode(f + 65536)
            : String.fromCharCode((f >> 10) | 55296, (f & 1023) | 56320))
        );
      };
    function Me(a) {
      return a.replace(la, da);
    }
    function Et(a) {
      I.error("Syntax error, unrecognized expression: " + a);
    }
    var ha = new RegExp("^" + W + "*," + W + "*"),
      As = k();
    function ur(a, l) {
      var f,
        g,
        b,
        N,
        S,
        O,
        L,
        U = As[a + " "];
      if (U) return l ? 0 : U.slice(0);
      for (S = a, O = [], L = I.expr.preFilter; S; ) {
        (!f || (g = ha.exec(S))) &&
          (g && (S = S.slice(g[0].length) || S), O.push((b = []))),
          (f = !1),
          (g = cn.exec(S)) &&
            ((f = g.shift()),
            b.push({ value: f, type: g[0].replace(je, " ") }),
            (S = S.slice(f.length)));
        for (N in ln)
          (g = I.expr.match[N].exec(S)) &&
            (!L[N] || (g = L[N](g))) &&
            ((f = g.shift()),
            b.push({ value: f, type: N, matches: g }),
            (S = S.slice(f.length)));
        if (!f) break;
      }
      return l ? S.length : S ? Et(a) : As(a, O).slice(0);
    }
    var fa = {
      ATTR: function (a) {
        return (
          (a[1] = Me(a[1])),
          (a[3] = Me(a[3] || a[4] || a[5] || "")),
          a[2] === "~=" && (a[3] = " " + a[3] + " "),
          a.slice(0, 4)
        );
      },
      CHILD: function (a) {
        return (
          (a[1] = a[1].toLowerCase()),
          a[1].slice(0, 3) === "nth"
            ? (a[3] || Et(a[0]),
              (a[4] = +(a[4]
                ? a[5] + (a[6] || 1)
                : 2 * (a[3] === "even" || a[3] === "odd"))),
              (a[5] = +(a[7] + a[8] || a[3] === "odd")))
            : a[3] && Et(a[0]),
          a
        );
      },
      PSEUDO: function (a) {
        var l,
          f = !a[6] && a[2];
        return ln.CHILD.test(a[0])
          ? null
          : (a[3]
              ? (a[2] = a[4] || a[5] || "")
              : f &&
                ca.test(f) &&
                (l = ur(f, !0)) &&
                (l = f.indexOf(")", f.length - l) - f.length) &&
                ((a[0] = a[0].slice(0, l)), (a[2] = f.slice(0, l))),
            a.slice(0, 3));
      },
    };
    function dn(a) {
      for (var l = 0, f = a.length, g = ""; l < f; l++) g += a[l].value;
      return g;
    }
    var ma = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
    function Ea(a, l) {
      return l
        ? a === "\0"
          ? "�"
          : a.slice(0, -1) +
            "\\" +
            a.charCodeAt(a.length - 1).toString(16) +
            " "
        : "\\" + a;
    }
    I.escapeSelector = function (a) {
      return (a + "").replace(ma, Ea);
    };
    var Ta = r.sort,
      pa = r.splice,
      hn;
    function ga(a, l) {
      if (a === l) return (hn = !0), 0;
      var f = !a.compareDocumentPosition - !l.compareDocumentPosition;
      return (
        f ||
        ((f =
          (a.ownerDocument || a) == (l.ownerDocument || l)
            ? a.compareDocumentPosition(l)
            : 1),
        f & 1
          ? a == Z || (a.ownerDocument == Z && I.contains(Z, a))
            ? -1
            : l == Z || (l.ownerDocument == Z && I.contains(Z, l))
              ? 1
              : 0
          : f & 4
            ? -1
            : 1)
      );
    }
    (I.uniqueSort = function (a) {
      var l,
        f = [],
        g = 0,
        b = 0;
      if (((hn = !1), Ta.call(a, ga), hn)) {
        for (; (l = a[b++]); ) l === a[b] && (g = f.push(b));
        for (; g--; ) pa.call(a, f[g], 1);
      }
      return a;
    }),
      (I.fn.uniqueSort = function () {
        return this.pushStack(I.uniqueSort(u.apply(this)));
      });
    var Ge,
      ar,
      ce,
      Cs,
      Pe,
      Re = 0,
      ba = 0,
      Ns = k(),
      Is = k(),
      Ss = k(),
      _a = new RegExp(W + "+", "g"),
      Aa = new RegExp("^" + ye + "$"),
      ys = I.extend(
        {
          bool: new RegExp("^(?:" + on + ")$", "i"),
          needsContext: new RegExp(
            "^" +
              W +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              W +
              "*((?:-\\d)?\\d*)" +
              W +
              "*\\)|)(?=[^-]|$)",
            "i",
          ),
        },
        ln,
      ),
      Ca = /^(?:input|select|textarea|button)$/i,
      Na = /^h\d$/i,
      Jc = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      Ia = function () {
        Tt();
      },
      Sa = ir(
        function (a) {
          return a.disabled === !0 && ne(a, "fieldset");
        },
        { dir: "parentNode", next: "legend" },
      );
    function Te(a, l, f, g) {
      var b,
        N,
        S,
        O,
        L,
        U,
        P,
        H = l && l.ownerDocument,
        F = l ? l.nodeType : 9;
      if (
        ((f = f || []),
        typeof a != "string" || !a || (F !== 1 && F !== 9 && F !== 11))
      )
        return f;
      if (0 && Pe && !Ss[a + " "] && (!Ee || !Ee.test(a)))
        try {
        } catch (D) {
        } finally {
        }
      return Ls(a.replace(je, "$1"), l, f, g);
    }
    function Ae(a) {
      return (a[I.expando] = !0), a;
    }
    function ya(a) {
      return function (l) {
        return ne(l, "input") && l.type === a;
      };
    }
    function Ra(a) {
      return function (l) {
        return (ne(l, "input") || ne(l, "button")) && l.type === a;
      };
    }
    function Rs(a) {
      return function (l) {
        return "form" in l
          ? l.parentNode && l.disabled === !1
            ? "label" in l
              ? "label" in l.parentNode
                ? l.parentNode.disabled === a
                : l.disabled === a
              : l.isDisabled === a || (l.isDisabled !== !a && Sa(l) === a)
            : l.disabled === a
          : "label" in l
            ? l.disabled === a
            : !1;
      };
    }
    function ve(a) {
      return Ae(function (l) {
        return (
          (l = +l),
          Ae(function (f, g) {
            for (var b, N = a([], f.length, l), S = N.length; S--; )
              f[(b = N[S])] && (f[b] = !(g[b] = f[b]));
          })
        );
      });
    }
    function Tt(a) {
      var l,
        f = a ? a.ownerDocument || a : Z;
      f == ce ||
        f.nodeType !== 9 ||
        ((ce = f),
        (Cs = ce.documentElement),
        (Pe = !I.isXMLDoc(ce)),
        ft &&
          Z != ce &&
          (l = ce.defaultView) &&
          l.top !== l &&
          l.addEventListener("unload", Ia));
    }
    (Te.matches = function (a, l) {
      return Te(a, null, null, l);
    }),
      (Te.matchesSelector = function (a, l) {
        if ((Tt(a), Pe && !Ss[l + " "] && (!Ee || !Ee.test(l))))
          try {
            return C.call(a, l);
          } catch {
            Ss(l, !0);
          }
        return Te(l, ce, null, [a]).length > 0;
      }),
      (I.expr = {
        cacheLength: 50,
        createPseudo: Ae,
        match: ys,
        find: {
          ID: function (a, l) {
            if (typeof l.getElementById < "u" && Pe) {
              var f = l.getElementById(a);
              return f ? [f] : [];
            }
          },
          TAG: function (a, l) {
            return typeof l.getElementsByTagName < "u"
              ? l.getElementsByTagName(a)
              : l.querySelectorAll(a);
          },
          CLASS: function (a, l) {
            if (typeof l.getElementsByClassName < "u" && Pe)
              return l.getElementsByClassName(a);
          },
        },
        relative: {
          ">": { dir: "parentNode", first: !0 },
          " ": { dir: "parentNode" },
          "+": { dir: "previousSibling", first: !0 },
          "~": { dir: "previousSibling" },
        },
        preFilter: fa,
        filter: {
          ID: function (a) {
            var l = Me(a);
            return function (f) {
              return f.getAttribute("id") === l;
            };
          },
          TAG: function (a) {
            var l = Me(a).toLowerCase();
            return a === "*"
              ? function () {
                  return !0;
                }
              : function (f) {
                  return ne(f, l);
                };
          },
          CLASS: function (a) {
            var l = Ns[a + " "];
            return (
              l ||
              ((l = new RegExp("(^|" + W + ")" + a + "(" + W + "|$)")) &&
                Ns(a, function (f) {
                  return l.test(
                    (typeof f.className == "string" && f.className) ||
                      (typeof f.getAttribute < "u" &&
                        f.getAttribute("class")) ||
                      "",
                  );
                }))
            );
          },
          ATTR: function (a, l, f) {
            return function (g) {
              var b = g.getAttribute(a);
              return b == null
                ? l === "!="
                : l
                  ? ((b += ""),
                    l === "="
                      ? b === f
                      : l === "!="
                        ? b !== f
                        : l === "^="
                          ? f && b.indexOf(f) === 0
                          : l === "*="
                            ? f && b.indexOf(f) > -1
                            : l === "$="
                              ? f && b.slice(-f.length) === f
                              : l === "~="
                                ? (" " + b.replace(_a, " ") + " ").indexOf(f) >
                                  -1
                                : l === "|="
                                  ? b === f ||
                                    b.slice(0, f.length + 1) === f + "-"
                                  : !1)
                  : !0;
            };
          },
          CHILD: function (a, l, f, g, b) {
            var N = a.slice(0, 3) !== "nth",
              S = a.slice(-4) !== "last",
              O = l === "of-type";
            return g === 1 && b === 0
              ? function (L) {
                  return !!L.parentNode;
                }
              : function (L, U, P) {
                  var H,
                    F,
                    D,
                    X,
                    ae,
                    ee = N !== S ? "nextSibling" : "previousSibling",
                    le = L.parentNode,
                    xe = O && L.nodeName.toLowerCase(),
                    $e = !P && !O,
                    oe = !1;
                  if (le) {
                    if (N) {
                      for (; ee; ) {
                        for (D = L; (D = D[ee]); )
                          if (O ? ne(D, xe) : D.nodeType === 1) return !1;
                        ae = ee = a === "only" && !ae && "nextSibling";
                      }
                      return !0;
                    }
                    if (((ae = [S ? le.firstChild : le.lastChild]), S && $e)) {
                      for (
                        F = le[I.expando] || (le[I.expando] = {}),
                          H = F[a] || [],
                          X = H[0] === Re && H[1],
                          oe = X && H[2],
                          D = X && le.childNodes[X];
                        (D = (++X && D && D[ee]) || (oe = X = 0) || ae.pop());

                      )
                        if (D.nodeType === 1 && ++oe && D === L) {
                          F[a] = [Re, X, oe];
                          break;
                        }
                    } else if (
                      ($e &&
                        ((F = L[I.expando] || (L[I.expando] = {})),
                        (H = F[a] || []),
                        (X = H[0] === Re && H[1]),
                        (oe = X)),
                      oe === !1)
                    )
                      for (
                        ;
                        (D = (++X && D && D[ee]) || (oe = X = 0) || ae.pop()) &&
                        !(
                          (O ? ne(D, xe) : D.nodeType === 1) &&
                          ++oe &&
                          ($e &&
                            ((F = D[I.expando] || (D[I.expando] = {})),
                            (F[a] = [Re, oe])),
                          D === L)
                        );

                      );
                    return (oe -= b), oe === g || (oe % g === 0 && oe / g >= 0);
                  }
                };
          },
          PSEUDO: function (a, l) {
            var f =
              I.expr.pseudos[a] ||
              I.expr.setFilters[a.toLowerCase()] ||
              Et("unsupported pseudo: " + a);
            return f[I.expando] ? f(l) : f;
          },
        },
        pseudos: {
          not: Ae(function (a) {
            var l = [],
              f = [],
              g = Tn(a.replace(je, "$1"));
            return g[I.expando]
              ? Ae(function (b, N, S, O) {
                  for (var L, U = g(b, null, O, []), P = b.length; P--; )
                    (L = U[P]) && (b[P] = !(N[P] = L));
                })
              : function (b, N, S) {
                  return (l[0] = b), g(l, null, S, f), (l[0] = null), !f.pop();
                };
          }),
          has: Ae(function (a) {
            return function (l) {
              return Te(a, l).length > 0;
            };
          }),
          contains: Ae(function (a) {
            return (
              (a = Me(a)),
              function (l) {
                return (l.textContent || I.text(l)).indexOf(a) > -1;
              }
            );
          }),
          lang: Ae(function (a) {
            return (
              Aa.test(a || "") || Et("unsupported lang: " + a),
              (a = Me(a).toLowerCase()),
              function (l) {
                var f;
                do {
                  if (
                    (f = Pe
                      ? l.lang
                      : l.getAttribute("xml:lang") || l.getAttribute("lang"))
                  )
                    return (
                      (f = f.toLowerCase()), f === a || f.indexOf(a + "-") === 0
                    );
                } while ((l = l.parentNode) && l.nodeType === 1);
                return !1;
              }
            );
          }),
          target: function (a) {
            var l = t.location && t.location.hash;
            return l && l.slice(1) === a.id;
          },
          root: function (a) {
            return a === Cs;
          },
          focus: function (a) {
            return (
              a === ce.activeElement &&
              ce.hasFocus() &&
              !!(a.type || a.href || ~a.tabIndex)
            );
          },
          enabled: Rs(!1),
          disabled: Rs(!0),
          checked: function (a) {
            return (
              (ne(a, "input") && !!a.checked) ||
              (ne(a, "option") && !!a.selected)
            );
          },
          selected: function (a) {
            return (
              ft && a.parentNode && a.parentNode.selectedIndex,
              a.selected === !0
            );
          },
          empty: function (a) {
            for (a = a.firstChild; a; a = a.nextSibling)
              if (a.nodeType < 6) return !1;
            return !0;
          },
          parent: function (a) {
            return !I.expr.pseudos.empty(a);
          },
          header: function (a) {
            return Na.test(a.nodeName);
          },
          input: function (a) {
            return Ca.test(a.nodeName);
          },
          button: function (a) {
            return (ne(a, "input") && a.type === "button") || ne(a, "button");
          },
          text: function (a) {
            return ne(a, "input") && a.type === "text";
          },
          first: ve(function () {
            return [0];
          }),
          last: ve(function (a, l) {
            return [l - 1];
          }),
          eq: ve(function (a, l, f) {
            return [f < 0 ? f + l : f];
          }),
          even: ve(function (a, l) {
            for (var f = 0; f < l; f += 2) a.push(f);
            return a;
          }),
          odd: ve(function (a, l) {
            for (var f = 1; f < l; f += 2) a.push(f);
            return a;
          }),
          lt: ve(function (a, l, f) {
            var g;
            for (f < 0 ? (g = f + l) : f > l ? (g = l) : (g = f); --g >= 0; )
              a.push(g);
            return a;
          }),
          gt: ve(function (a, l, f) {
            for (var g = f < 0 ? f + l : f; ++g < l; ) a.push(g);
            return a;
          }),
        },
      }),
      (I.expr.pseudos.nth = I.expr.pseudos.eq);
    for (Ge in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
      I.expr.pseudos[Ge] = ya(Ge);
    for (Ge in { submit: !0, reset: !0 }) I.expr.pseudos[Ge] = Ra(Ge);
    function xs() {}
    (xs.prototype = I.expr.filters = I.expr.pseudos),
      (I.expr.setFilters = new xs());
    function ir(a, l, f) {
      var g = l.dir,
        b = l.next,
        N = b || g,
        S = f && N === "parentNode",
        O = ba++;
      return l.first
        ? function (L, U, P) {
            for (; (L = L[g]); ) if (L.nodeType === 1 || S) return a(L, U, P);
            return !1;
          }
        : function (L, U, P) {
            var H,
              F,
              D = [Re, O];
            if (P) {
              for (; (L = L[g]); )
                if ((L.nodeType === 1 || S) && a(L, U, P)) return !0;
            } else
              for (; (L = L[g]); )
                if (L.nodeType === 1 || S)
                  if (
                    ((F = L[I.expando] || (L[I.expando] = {})), b && ne(L, b))
                  )
                    L = L[g] || L;
                  else {
                    if ((H = F[N]) && H[0] === Re && H[1] === O)
                      return (D[2] = H[2]);
                    if (((F[N] = D), (D[2] = a(L, U, P)))) return !0;
                  }
            return !1;
          };
    }
    function fn(a) {
      return a.length > 1
        ? function (l, f, g) {
            for (var b = a.length; b--; ) if (!a[b](l, f, g)) return !1;
            return !0;
          }
        : a[0];
    }
    function xa(a, l, f) {
      for (var g = 0, b = l.length; g < b; g++) Te(a, l[g], f);
      return f;
    }
    function or(a, l, f, g, b) {
      for (var N, S = [], O = 0, L = a.length, U = l != null; O < L; O++)
        (N = a[O]) && (!f || f(N, g, b)) && (S.push(N), U && l.push(O));
      return S;
    }
    function mn(a, l, f, g, b, N) {
      return (
        g && !g[I.expando] && (g = mn(g)),
        b && !b[I.expando] && (b = mn(b, N)),
        Ae(function (S, O, L, U) {
          var P,
            H,
            F,
            D,
            X = [],
            ae = [],
            ee = O.length,
            le = S || xa(l || "*", L.nodeType ? [L] : L, []),
            xe = a && (S || !l) ? or(le, X, a, L, U) : le;
          if (
            (f
              ? ((D = b || (S ? a : ee || g) ? [] : O), f(xe, D, L, U))
              : (D = xe),
            g)
          )
            for (P = or(D, ae), g(P, [], L, U), H = P.length; H--; )
              (F = P[H]) && (D[ae[H]] = !(xe[ae[H]] = F));
          if (S) {
            if (b || a) {
              if (b) {
                for (P = [], H = D.length; H--; )
                  (F = D[H]) && P.push((xe[H] = F));
                b(null, (D = []), P, U);
              }
              for (H = D.length; H--; )
                (F = D[H]) &&
                  (P = b ? T.call(S, F) : X[H]) > -1 &&
                  (S[P] = !(O[P] = F));
            }
          } else
            (D = or(D === O ? D.splice(ee, D.length) : D)),
              b ? b(null, O, D, U) : h.apply(O, D);
        })
      );
    }
    function En(a) {
      for (
        var l,
          f,
          g,
          b = a.length,
          N = I.expr.relative[a[0].type],
          S = N || I.expr.relative[" "],
          O = N ? 1 : 0,
          L = ir(
            function (H) {
              return H === l;
            },
            S,
            !0,
          ),
          U = ir(
            function (H) {
              return T.call(l, H) > -1;
            },
            S,
            !0,
          ),
          P = [
            function (H, F, D) {
              var X =
                (!N && (D || F != ar)) ||
                ((l = F).nodeType ? L(H, F, D) : U(H, F, D));
              return (l = null), X;
            },
          ];
        O < b;
        O++
      )
        if ((f = I.expr.relative[a[O].type])) P = [ir(fn(P), f)];
        else {
          if (
            ((f = I.expr.filter[a[O].type].apply(null, a[O].matches)),
            f[I.expando])
          ) {
            for (g = ++O; g < b && !I.expr.relative[a[g].type]; g++);
            return mn(
              O > 1 && fn(P),
              O > 1 &&
                dn(
                  a
                    .slice(0, O - 1)
                    .concat({ value: a[O - 2].type === " " ? "*" : "" }),
                ).replace(je, "$1"),
              f,
              O < g && En(a.slice(O, g)),
              g < b && En((a = a.slice(g))),
              g < b && dn(a),
            );
          }
          P.push(f);
        }
      return fn(P);
    }
    function La(a, l) {
      var f = l.length > 0,
        g = a.length > 0,
        b = function (N, S, O, L, U) {
          var P,
            H,
            F,
            D = 0,
            X = "0",
            ae = N && [],
            ee = [],
            le = ar,
            xe = N || (g && I.expr.find.TAG("*", U)),
            $e = (Re += le == null ? 1 : Math.random() || 0.1);
          for (U && (ar = S == ce || S || U); (P = xe[X]) != null; X++) {
            if (g && P) {
              for (
                H = 0, !S && P.ownerDocument != ce && (Tt(P), (O = !Pe));
                (F = a[H++]);

              )
                if (F(P, S || ce, O)) {
                  h.call(L, P);
                  break;
                }
              U && (Re = $e);
            }
            f && ((P = !F && P) && D--, N && ae.push(P));
          }
          if (((D += X), f && X !== D)) {
            for (H = 0; (F = l[H++]); ) F(ae, ee, S, O);
            if (N) {
              if (D > 0) for (; X--; ) ae[X] || ee[X] || (ee[X] = an.call(L));
              ee = or(ee);
            }
            h.apply(L, ee),
              U && !N && ee.length > 0 && D + l.length > 1 && I.uniqueSort(L);
          }
          return U && ((Re = $e), (ar = le)), ae;
        };
      return f ? Ae(b) : b;
    }
    function Tn(a, l) {
      var f,
        g = [],
        b = [],
        N = Is[a + " "];
      if (!N) {
        for (l || (l = ur(a)), f = l.length; f--; )
          (N = En(l[f])), N[I.expando] ? g.push(N) : b.push(N);
        (N = Is(a, La(b, g))), (N.selector = a);
      }
      return N;
    }
    function Ls(a, l, f, g) {
      var b,
        N,
        S,
        O,
        L,
        U = typeof a == "function" && a,
        P = !g && ur((a = U.selector || a));
      if (((f = f || []), P.length === 1)) {
        if (
          ((N = P[0] = P[0].slice(0)),
          N.length > 2 &&
            (S = N[0]).type === "ID" &&
            l.nodeType === 9 &&
            Pe &&
            I.expr.relative[N[1].type])
        ) {
          if (((l = (I.expr.find.ID(Me(S.matches[0]), l) || [])[0]), l))
            U && (l = l.parentNode);
          else return f;
          a = a.slice(N.shift().value.length);
        }
        for (
          b = ys.needsContext.test(a) ? 0 : N.length;
          b-- && ((S = N[b]), !I.expr.relative[(O = S.type)]);

        )
          if (
            (L = I.expr.find[O]) &&
            (g = L(
              Me(S.matches[0]),
              (mt.test(N[0].type) && V(l.parentNode)) || l,
            ))
          ) {
            if ((N.splice(b, 1), (a = g.length && dn(N)), !a))
              return h.apply(f, g), f;
            break;
          }
      }
      return (
        (U || Tn(a, P))(
          g,
          l,
          !Pe,
          f,
          !l || (mt.test(a) && V(l.parentNode)) || l,
        ),
        f
      );
    }
    return (
      Tt(),
      (I.find = Te),
      (Te.compile = Tn),
      (Te.select = Ls),
      (Te.setDocument = Tt),
      (Te.tokenize = ur),
      I
    );
  },
);
function Lu(t, e) {
  try {
    return Br.find(t, void 0, void 0, [e]).length > 0;
  } catch (r) {
    throw (Xn(t, r), r);
  }
}
function Ou(t, e) {
  try {
    return Br.find(t, e, void 0, void 0)[0] || null;
  } catch (r) {
    throw (Xn(t, r), r);
  }
}
function Du(t, e) {
  try {
    return Br.find(t, e, void 0, void 0);
  } catch (r) {
    throw (Xn(t, r), r);
  }
}
var tc = [":scope", ":where", ":is"];
function Xn(t, e) {
  let r = tc.filter((n) => t.includes(n));
  r.length > 0 &&
    e.message &&
    (e.message =
      `At present jQuery does not support the ${rc(r)} ${r.length === 1 ? "selector" : "selectors"}.\nIf you need this in your test, consider writing an end-to-end test instead.\n` +
      e.message);
}
function rc(t) {
  return t.length <= 1
    ? t.join("")
    : `${t.slice(0, t.length - 1).join(", ")} and ${t[t.length - 1]}`;
}
function Qe(t, e = {}) {
  let r = { currentLineWidth: 0, indent: 0, isWithinBody: !1, text: [] };
  if (
    (e.prettyHtml
      ? (typeof e.indentSpaces != "number" && (e.indentSpaces = 2),
        typeof e.newLines != "boolean" && (e.newLines = !0),
        (e.approximateLineWidth = -1))
      : ((e.prettyHtml = !1),
        typeof e.newLines != "boolean" && (e.newLines = !1),
        typeof e.indentSpaces != "number" && (e.indentSpaces = 0)),
    typeof e.approximateLineWidth != "number" && (e.approximateLineWidth = -1),
    typeof e.removeEmptyAttributes != "boolean" &&
      (e.removeEmptyAttributes = !0),
    typeof e.removeAttributeQuotes != "boolean" &&
      (e.removeAttributeQuotes = !1),
    typeof e.removeBooleanAttributeQuotes != "boolean" &&
      (e.removeBooleanAttributeQuotes = !1),
    typeof e.removeHtmlComments != "boolean" && (e.removeHtmlComments = !1),
    typeof e.serializeShadowRoot != "boolean" && (e.serializeShadowRoot = !1),
    e.outerHtml)
  )
    vr(t, e, r, !1);
  else
    for (let n = 0, u = t.childNodes.length; n < u; n++)
      vr(t.childNodes[n], e, r, !1);
  return (
    r.text[0] === `\n` && r.text.shift(),
    r.text[r.text.length - 1] === `\n` && r.text.pop(),
    r.text.join("")
  );
}
function vr(t, e, r, n) {
  if (t.nodeType === 1 || n) {
    let u = n ? "mock:shadow-root" : cc(t);
    u === "body" && (r.isWithinBody = !0);
    let o = e.excludeTags != null && e.excludeTags.includes(u);
    if (o === !1) {
      let h = e.newLines || e.indentSpaces > 0 ? Xe(t) : !1;
      if (
        (e.newLines && !h && (r.text.push(`\n`), (r.currentLineWidth = 0)),
        e.indentSpaces > 0 && !h)
      ) {
        for (let y = 0; y < r.indent; y++) r.text.push(" ");
        r.currentLineWidth += r.indent;
      }
      r.text.push("<" + u), (r.currentLineWidth += u.length + 1);
      let T = t.attributes.length,
        A = e.prettyHtml && T > 1 ? Je(t.attributes, !0) : t.attributes;
      for (let y = 0; y < T; y++) {
        let M = A.item(y),
          R = M.name;
        if (R === "style") continue;
        let w = M.value;
        if (e.removeEmptyAttributes && w === "" && hc.has(R)) continue;
        let Y = M.namespaceURI;
        Y == null
          ? ((r.currentLineWidth += R.length + 1),
            e.approximateLineWidth > 0 &&
            r.currentLineWidth > e.approximateLineWidth
              ? (r.text.push(`\n` + R), (r.currentLineWidth = 0))
              : r.text.push(" " + R))
          : Y === "http://www.w3.org/XML/1998/namespace"
            ? (r.text.push(" xml:" + R), (r.currentLineWidth += R.length + 5))
            : Y === "http://www.w3.org/2000/xmlns/"
              ? R !== "xmlns"
                ? (r.text.push(" xmlns:" + R),
                  (r.currentLineWidth += R.length + 7))
                : (r.text.push(" " + R), (r.currentLineWidth += R.length + 1))
              : Y === lr
                ? (r.text.push(" xlink:" + R),
                  (r.currentLineWidth += R.length + 7))
                : (r.text.push(" " + Y + ":" + R),
                  (r.currentLineWidth += Y.length + R.length + 2)),
          e.prettyHtml &&
            R === "class" &&
            (w = M.value =
              w
                .split(" ")
                .filter((K) => K !== "")
                .sort()
                .join(" ")
                .trim()),
          !(
            w === "" &&
            ((e.removeBooleanAttributeQuotes && fc.has(R)) ||
              (e.removeEmptyAttributes && R.startsWith("data-")))
          ) &&
            (e.removeAttributeQuotes && oc.test(w)
              ? (r.text.push("=" + Ur(w, !0)),
                (r.currentLineWidth += w.length + 1))
              : (r.text.push('="' + Ur(w, !0) + '"'),
                (r.currentLineWidth += w.length + 3)));
      }
      if (t.hasAttribute("style")) {
        let y = t.style.cssText;
        e.approximateLineWidth > 0 &&
        r.currentLineWidth + y.length + 10 > e.approximateLineWidth
          ? (r.text.push(`\nstyle="${y}">`), (r.currentLineWidth = 0))
          : (r.text.push(` style="${y}">`),
            (r.currentLineWidth += y.length + 10));
      } else r.text.push(">"), (r.currentLineWidth += 1);
    }
    if (dc.has(u) === !1) {
      if (
        e.serializeShadowRoot &&
        t.shadowRoot != null &&
        ((r.indent = r.indent + e.indentSpaces),
        vr(t.shadowRoot, e, r, !0),
        (r.indent = r.indent - e.indentSpaces),
        e.newLines &&
          (t.childNodes.length === 0 ||
            (t.childNodes.length === 1 &&
              t.childNodes[0].nodeType === 3 &&
              t.childNodes[0].nodeValue.trim() === "")))
      ) {
        r.text.push(`\n`), (r.currentLineWidth = 0);
        for (let h = 0; h < r.indent; h++) r.text.push(" ");
        r.currentLineWidth += r.indent;
      }
      if (
        e.excludeTagContent == null ||
        e.excludeTagContent.includes(u) === !1
      ) {
        let h = u === "template" ? t.content.childNodes : t.childNodes,
          T = h.length;
        if (
          T > 0 &&
          !(
            T === 1 &&
            h[0].nodeType === 3 &&
            (typeof h[0].nodeValue != "string" || h[0].nodeValue.trim() === "")
          )
        ) {
          let A = e.newLines || e.indentSpaces > 0 ? Xe(t) : !1;
          !A &&
            e.indentSpaces > 0 &&
            o === !1 &&
            (r.indent = r.indent + e.indentSpaces);
          for (let y = 0; y < T; y++) vr(h[y], e, r, !1);
          if (
            o === !1 &&
            (e.newLines && !A && (r.text.push(`\n`), (r.currentLineWidth = 0)),
            e.indentSpaces > 0 && !A)
          ) {
            r.indent = r.indent - e.indentSpaces;
            for (let y = 0; y < r.indent; y++) r.text.push(" ");
            r.currentLineWidth += r.indent;
          }
        }
        o === !1 &&
          (r.text.push("</" + u + ">"), (r.currentLineWidth += u.length + 3));
      }
    }
    e.approximateLineWidth > 0 &&
      mc.has(u) &&
      (r.text.push(`\n`), (r.currentLineWidth = 0)),
      u === "body" && (r.isWithinBody = !1);
  } else if (t.nodeType === 3) {
    let u = t.nodeValue;
    if (typeof u == "string") {
      let o = u.trim();
      if (o === "")
        Xe(t)
          ? (r.text.push(u), (r.currentLineWidth += u.length))
          : (e.approximateLineWidth > 0 && !r.isWithinBody) ||
            e.prettyHtml ||
            ((r.currentLineWidth += 1),
            e.approximateLineWidth > 0 &&
            r.currentLineWidth > e.approximateLineWidth
              ? (r.text.push(`\n`), (r.currentLineWidth = 0))
              : r.text.push(" "));
      else {
        let h = e.newLines || e.indentSpaces > 0 || e.prettyHtml ? Xe(t) : !1;
        if (
          (e.newLines && !h && (r.text.push(`\n`), (r.currentLineWidth = 0)),
          e.indentSpaces > 0 && !h)
        ) {
          for (let A = 0; A < r.indent; A++) r.text.push(" ");
          r.currentLineWidth += r.indent;
        }
        let T = u.length;
        if (T > 0) {
          let A =
            t.parentNode != null && t.parentNode.nodeType === 1
              ? t.parentNode.nodeName
              : null;
          Qn.has(A)
            ? (Xe(t) ? r.text.push(u) : (r.text.push(o), (T = o.length)),
              (r.currentLineWidth += T))
            : e.prettyHtml && !h
              ? (r.text.push(Ur(u.replace(/\s\s+/g, " ").trim(), !1)),
                (r.currentLineWidth += T))
              : (Xe(t) ||
                  (/\s/.test(u.charAt(0)) && (u = " " + u.trimLeft()),
                  (T = u.length),
                  T > 1 &&
                    /\s/.test(u.charAt(T - 1)) &&
                    (e.approximateLineWidth > 0 &&
                    r.currentLineWidth + T > e.approximateLineWidth
                      ? ((u = u.trimRight() + `\n`), (r.currentLineWidth = 0))
                      : (u = u.trimRight() + " "))),
                (r.currentLineWidth += T),
                r.text.push(Ur(u, !1)));
        }
      }
    }
  } else if (t.nodeType === 8) {
    let u = t.nodeValue;
    if (
      e.removeHtmlComments &&
      !(
        u.startsWith(Os + ".") ||
        u.startsWith(Ds + ".") ||
        u.startsWith(Ms + ".") ||
        u.startsWith(Ps + ".")
      )
    )
      return;
    let o = e.newLines || e.indentSpaces > 0 ? Xe(t) : !1;
    if (
      (e.newLines && !o && (r.text.push(`\n`), (r.currentLineWidth = 0)),
      e.indentSpaces > 0 && !o)
    ) {
      for (let h = 0; h < r.indent; h++) r.text.push(" ");
      r.currentLineWidth += r.indent;
    }
    r.text.push("\x3c!--" + u + "--\x3e"), (r.currentLineWidth += u.length + 7);
  } else t.nodeType === 10 && r.text.push("<!doctype html>");
}
var nc = /&/g,
  sc = /\u00a0/g,
  uc = /"/g,
  ac = /</g,
  ic = />/g,
  oc = /^[^ \t\n\f\r"'`=<>\/\\-]+$/;
function cc(t) {
  return t.namespaceURI === "http://www.w3.org/1999/xhtml"
    ? t.nodeName.toLowerCase()
    : t.nodeName;
}
function Ur(t, e) {
  return (
    (t = t.replace(nc, "&amp;").replace(sc, "&nbsp;")),
    e ? t.replace(uc, "&quot;") : t.replace(ac, "&lt;").replace(ic, "&gt;")
  );
}
function Xe(t) {
  for (; t != null; ) {
    if (lc.has(t.nodeName)) return !0;
    t = t.parentNode;
  }
  return !1;
}
var Qn = new Set([
    "STYLE",
    "SCRIPT",
    "IFRAME",
    "NOSCRIPT",
    "XMP",
    "NOEMBED",
    "NOFRAMES",
    "PLAINTEXT",
  ]),
  lc = new Set([
    "CODE",
    "OUTPUT",
    "PLAINTEXT",
    "PRE",
    "SCRIPT",
    "TEMPLATE",
    "TEXTAREA",
  ]),
  dc = new Set([
    "area",
    "base",
    "basefont",
    "bgsound",
    "br",
    "col",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "trace",
    "wbr",
  ]),
  hc = new Set(["class", "dir", "id", "lang", "name", "title"]),
  fc = new Set([
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "compact",
    "controls",
    "declare",
    "default",
    "defaultchecked",
    "defaultmuted",
    "defaultselected",
    "defer",
    "disabled",
    "enabled",
    "formnovalidate",
    "hidden",
    "indeterminate",
    "inert",
    "ismap",
    "itemscope",
    "loop",
    "multiple",
    "muted",
    "nohref",
    "nomodule",
    "noresize",
    "noshade",
    "novalidate",
    "nowrap",
    "open",
    "pauseonexit",
    "readonly",
    "required",
    "reversed",
    "scoped",
    "seamless",
    "selected",
    "sortable",
    "truespeed",
    "typemustmatch",
    "visible",
  ]),
  mc = new Set([
    "html",
    "body",
    "head",
    "iframe",
    "meta",
    "link",
    "base",
    "title",
    "script",
    "style",
  ]);
var G = class {
  constructor(e, r, n, u) {
    (this.ownerDocument = e),
      (this.nodeType = r),
      (this.nodeName = n),
      (this._nodeValue = u),
      (this.parentNode = null),
      (this.childNodes = []);
  }
  appendChild(e) {
    if (e.nodeType === 11) {
      let r = e.childNodes.slice();
      for (let n of r) this.appendChild(n);
    } else
      e.remove(),
        (e.parentNode = this),
        this.childNodes.push(e),
        gt(this.ownerDocument, e);
    return e;
  }
  append(...e) {
    e.forEach((r) => {
      let n = typeof r == "object" && r !== null && "nodeType" in r;
      this.appendChild(n ? r : this.ownerDocument.createTextNode(String(r)));
    });
  }
  prepend(...e) {
    let r = this.firstChild;
    e.forEach((n) => {
      let u = typeof n == "object" && n !== null && "nodeType" in n;
      r &&
        this.insertBefore(
          u ? n : this.ownerDocument.createTextNode(String(n)),
          r,
        );
    });
  }
  cloneNode(e) {
    throw new Error(`invalid node type to clone: ${this.nodeType}, deep: ${e}`);
  }
  compareDocumentPosition(e) {
    return -1;
  }
  get firstChild() {
    return this.childNodes[0] || null;
  }
  insertBefore(e, r) {
    if (e.nodeType === 11)
      for (let n = 0, u = e.childNodes.length; n < u; n++)
        Be(this, e.childNodes[n], r);
    else Be(this, e, r);
    return e;
  }
  get isConnected() {
    let e = this;
    for (; e != null; ) {
      if (e.nodeType === 9) return !0;
      (e = e.parentNode), e != null && e.nodeType === 11 && (e = e.host);
    }
    return !1;
  }
  isSameNode(e) {
    return this === e;
  }
  get lastChild() {
    return this.childNodes[this.childNodes.length - 1] || null;
  }
  get nextSibling() {
    if (this.parentNode != null) {
      let e = this.parentNode.childNodes.indexOf(this) + 1;
      return this.parentNode.childNodes[e] || null;
    }
    return null;
  }
  get nodeValue() {
    var e;
    return (e = this._nodeValue) != null ? e : "";
  }
  set nodeValue(e) {
    this._nodeValue = e;
  }
  get parentElement() {
    return this.parentNode || null;
  }
  set parentElement(e) {
    this.parentNode = e;
  }
  get previousSibling() {
    if (this.parentNode != null) {
      let e = this.parentNode.childNodes.indexOf(this) - 1;
      return this.parentNode.childNodes[e] || null;
    }
    return null;
  }
  contains(e) {
    if (e === this) return !0;
    let r = Array.from(this.childNodes);
    return r.includes(e) ? !0 : r.some((n) => this.contains.bind(n)(e));
  }
  removeChild(e) {
    let r = this.childNodes.indexOf(e);
    if (r > -1)
      if ((this.childNodes.splice(r, 1), this.nodeType === 1)) {
        let n = this.isConnected;
        (e.parentNode = null), n === !0 && An(e);
      } else e.parentNode = null;
    else throw new Error("node not found within childNodes during removeChild");
    return e;
  }
  remove() {
    this.parentNode != null && this.parentNode.removeChild(this);
  }
  replaceChild(e, r) {
    return r.parentNode === this
      ? (this.insertBefore(e, r), r.remove(), e)
      : null;
  }
  get textContent() {
    var e;
    return (e = this._nodeValue) != null ? e : "";
  }
  set textContent(e) {
    this._nodeValue = String(e);
  }
};
(G.ELEMENT_NODE = 1),
  (G.TEXT_NODE = 3),
  (G.PROCESSING_INSTRUCTION_NODE = 7),
  (G.COMMENT_NODE = 8),
  (G.DOCUMENT_NODE = 9),
  (G.DOCUMENT_TYPE_NODE = 10),
  (G.DOCUMENT_FRAGMENT_NODE = 11);
var Fr = class {
    constructor(e, r, n) {
      (this.ownerDocument = e), (this.childNodes = r), (this.length = n);
    }
  },
  Ie = class extends G {
    attachInternals() {
      return new Proxy(
        {},
        {
          get: function (e, r, n) {
            console.error(
              `NOTE: Property ${String(r)} was accessed on ElementInternals, but this property is not implemented.\nTesting components with ElementInternals is fully supported in e2e tests.`,
            );
          },
        },
      );
    }
    constructor(e, r, n = null) {
      super(e, 1, typeof r == "string" ? r : null, null),
        (this.__namespaceURI = n),
        (this.__shadowRoot = null),
        (this.__attributeMap = null);
    }
    addEventListener(e, r) {
      Er(this, e, r);
    }
    attachShadow(e) {
      let r = this.ownerDocument.createDocumentFragment();
      return (this.shadowRoot = r), r;
    }
    blur() {
      Ye(
        this,
        new We("blur", {
          relatedTarget: null,
          bubbles: !0,
          cancelable: !0,
          composed: !0,
        }),
      );
    }
    get namespaceURI() {
      return this.__namespaceURI;
    }
    get shadowRoot() {
      return this.__shadowRoot || null;
    }
    set shadowRoot(e) {
      e != null
        ? ((e.host = this), (this.__shadowRoot = e))
        : delete this.__shadowRoot;
    }
    get attributes() {
      if (this.__attributeMap == null) {
        let e = pn(!1);
        return (this.__attributeMap = e), e;
      }
      return this.__attributeMap;
    }
    set attributes(e) {
      this.__attributeMap = e;
    }
    get children() {
      return this.childNodes.filter((e) => e.nodeType === 1);
    }
    get childElementCount() {
      return this.childNodes.filter((e) => e.nodeType === 1).length;
    }
    get className() {
      return this.getAttributeNS(null, "class") || "";
    }
    set className(e) {
      this.setAttributeNS(null, "class", e);
    }
    get classList() {
      return new dr(this);
    }
    click() {
      Ye(this, new Ce("click", { bubbles: !0, cancelable: !0, composed: !0 }));
    }
    cloneNode(e) {
      return null;
    }
    closest(e) {
      let r = this;
      for (; r != null; ) {
        if (r.matches(e)) return r;
        r = r.parentNode;
      }
      return null;
    }
    get dataset() {
      return Us(this);
    }
    get dir() {
      return this.getAttributeNS(null, "dir") || "";
    }
    set dir(e) {
      this.setAttributeNS(null, "dir", e);
    }
    dispatchEvent(e) {
      return Ye(this, e);
    }
    get firstElementChild() {
      return this.children[0] || null;
    }
    focus(e) {
      Ye(
        this,
        new We("focus", {
          relatedTarget: null,
          bubbles: !0,
          cancelable: !0,
          composed: !0,
        }),
      );
    }
    getAttribute(e) {
      if (e === "style")
        return this.__style != null && this.__style.length > 0
          ? this.style.cssText
          : null;
      let r = this.attributes.getNamedItem(e);
      return r != null ? r.value : null;
    }
    getAttributeNS(e, r) {
      let n = this.attributes.getNamedItemNS(e, r);
      return n != null ? n.value : null;
    }
    getAttributeNode(e) {
      return this.hasAttribute(e) ? new de(e, this.getAttribute(e)) : null;
    }
    getBoundingClientRect() {
      return {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
      };
    }
    getRootNode(e) {
      let r = e != null && e.composed === !0,
        n = this;
      for (; n.parentNode != null; )
        (n = n.parentNode),
          r === !0 && n.parentNode == null && n.host != null && (n = n.host);
      return n;
    }
    get draggable() {
      return this.getAttributeNS(null, "draggable") === "true";
    }
    set draggable(e) {
      this.setAttributeNS(null, "draggable", e);
    }
    hasChildNodes() {
      return this.childNodes.length > 0;
    }
    get id() {
      return this.getAttributeNS(null, "id") || "";
    }
    set id(e) {
      this.setAttributeNS(null, "id", e);
    }
    get innerHTML() {
      return this.childNodes.length === 0
        ? ""
        : Qe(this, { newLines: !1, indentSpaces: 0 });
    }
    set innerHTML(e) {
      var r;
      if (Qn.has((r = this.nodeName) != null ? r : "") === !0) Kn(this, e);
      else {
        for (let n = this.childNodes.length - 1; n >= 0; n--)
          this.removeChild(this.childNodes[n]);
        if (typeof e == "string") {
          let n = wr(this.ownerDocument, e);
          for (; n.childNodes.length > 0; ) this.appendChild(n.childNodes[0]);
        }
      }
    }
    get innerText() {
      let e = [];
      return zn(this.childNodes, e), e.join("");
    }
    set innerText(e) {
      Kn(this, e);
    }
    insertAdjacentElement(e, r) {
      return (
        e === "beforebegin"
          ? Be(this.parentNode, r, this)
          : e === "afterbegin"
            ? this.prepend(r)
            : e === "beforeend"
              ? this.appendChild(r)
              : e === "afterend" && Be(this.parentNode, r, this.nextSibling),
        r
      );
    }
    insertAdjacentHTML(e, r) {
      let n = wr(this.ownerDocument, r);
      if (e === "beforebegin")
        for (; n.childNodes.length > 0; )
          Be(this.parentNode, n.childNodes[0], this);
      else if (e === "afterbegin")
        for (; n.childNodes.length > 0; )
          this.prepend(n.childNodes[n.childNodes.length - 1]);
      else if (e === "beforeend")
        for (; n.childNodes.length > 0; ) this.appendChild(n.childNodes[0]);
      else if (e === "afterend")
        for (; n.childNodes.length > 0; )
          Be(
            this.parentNode,
            n.childNodes[n.childNodes.length - 1],
            this.nextSibling,
          );
    }
    insertAdjacentText(e, r) {
      let n = this.ownerDocument.createTextNode(r);
      e === "beforebegin"
        ? Be(this.parentNode, n, this)
        : e === "afterbegin"
          ? this.prepend(n)
          : e === "beforeend"
            ? this.appendChild(n)
            : e === "afterend" && Be(this.parentNode, n, this.nextSibling);
    }
    hasAttribute(e) {
      return e === "style"
        ? this.__style != null && this.__style.length > 0
        : this.getAttribute(e) !== null;
    }
    hasAttributeNS(e, r) {
      return this.getAttributeNS(e, r) !== null;
    }
    get hidden() {
      return this.hasAttributeNS(null, "hidden");
    }
    set hidden(e) {
      e === !0
        ? this.setAttributeNS(null, "hidden", "")
        : this.removeAttributeNS(null, "hidden");
    }
    get lang() {
      return this.getAttributeNS(null, "lang") || "";
    }
    set lang(e) {
      this.setAttributeNS(null, "lang", e);
    }
    get lastElementChild() {
      let e = this.children;
      return e[e.length - 1] || null;
    }
    matches(e) {
      return Lu(e, this);
    }
    get nextElementSibling() {
      let e = this.parentElement;
      if (
        e != null &&
        (e.nodeType === 1 || e.nodeType === 11 || e.nodeType === 9)
      ) {
        let n = e.children.indexOf(this) + 1;
        return e.children[n] || null;
      }
      return null;
    }
    get outerHTML() {
      return Qe(this, { newLines: !1, outerHtml: !0, indentSpaces: 0 });
    }
    get previousElementSibling() {
      let e = this.parentElement;
      if (
        e != null &&
        (e.nodeType === 1 || e.nodeType === 11 || e.nodeType === 9)
      ) {
        let n = e.children.indexOf(this) - 1;
        return e.children[n] || null;
      }
      return null;
    }
    getElementsByClassName(e) {
      let r = e
          .trim()
          .split(" ")
          .filter((u) => u.length > 0),
        n = [];
      return Mu(this, r, n), n;
    }
    getElementsByTagName(e) {
      let r = [];
      return Pu(this, e.toLowerCase(), r), r;
    }
    querySelector(e) {
      return Ou(e, this);
    }
    querySelectorAll(e) {
      return Du(e, this);
    }
    removeAttribute(e) {
      if (e === "style") delete this.__style;
      else {
        let r = this.attributes.getNamedItem(e);
        r != null &&
          (this.attributes.removeNamedItemNS(r),
          bt(this) === !0 && Fe(this, e, r.value, null));
      }
    }
    removeAttributeNS(e, r) {
      let n = this.attributes.getNamedItemNS(e, r);
      n != null &&
        (this.attributes.removeNamedItemNS(n),
        bt(this) === !0 && Fe(this, r, n.value, null));
    }
    removeEventListener(e, r) {
      Tr(this, e, r);
    }
    setAttribute(e, r) {
      if (e === "style") this.style = r;
      else {
        let n = this.attributes,
          u = n.getNamedItem(e),
          o = bt(this);
        if (u != null)
          if (o === !0) {
            let h = u.value;
            (u.value = r), h !== u.value && Fe(this, u.name, h, u.value);
          } else u.value = r;
        else
          n.caseInsensitive && (e = e.toLowerCase()),
            (u = new de(e, r)),
            n.__items.push(u),
            o === !0 && Fe(this, e, null, u.value);
      }
    }
    setAttributeNS(e, r, n) {
      let u = this.attributes,
        o = u.getNamedItemNS(e, r),
        h = bt(this);
      if (o != null)
        if (h === !0) {
          let T = o.value;
          (o.value = n), T !== o.value && Fe(this, o.name, T, o.value);
        } else o.value = n;
      else
        (o = new de(r, n, e)),
          u.__items.push(o),
          h === !0 && Fe(this, r, null, o.value);
    }
    get style() {
      return this.__style == null && (this.__style = bn()), this.__style;
    }
    set style(e) {
      typeof e == "string"
        ? (this.__style == null && (this.__style = bn()),
          (this.__style.cssText = e))
        : (this.__style = e);
    }
    get tabIndex() {
      return parseInt(this.getAttributeNS(null, "tabindex") || "-1", 10);
    }
    set tabIndex(e) {
      this.setAttributeNS(null, "tabindex", e);
    }
    get tagName() {
      var e;
      return (e = this.nodeName) != null ? e : "";
    }
    set tagName(e) {
      this.nodeName = e;
    }
    get textContent() {
      let e = [];
      return zn(this.childNodes, e), e.join("");
    }
    set textContent(e) {
      Kn(this, e);
    }
    get title() {
      return this.getAttributeNS(null, "title") || "";
    }
    set title(e) {
      this.setAttributeNS(null, "title", e);
    }
    animate() {}
    onanimationstart() {}
    onanimationend() {}
    onanimationiteration() {}
    onabort() {}
    onauxclick() {}
    onbeforecopy() {}
    onbeforecut() {}
    onbeforepaste() {}
    onblur() {}
    oncancel() {}
    oncanplay() {}
    oncanplaythrough() {}
    onchange() {}
    onclick() {}
    onclose() {}
    oncontextmenu() {}
    oncopy() {}
    oncuechange() {}
    oncut() {}
    ondblclick() {}
    ondrag() {}
    ondragend() {}
    ondragenter() {}
    ondragleave() {}
    ondragover() {}
    ondragstart() {}
    ondrop() {}
    ondurationchange() {}
    onemptied() {}
    onended() {}
    onerror() {}
    onfocus() {}
    onfocusin() {}
    onfocusout() {}
    onformdata() {}
    onfullscreenchange() {}
    onfullscreenerror() {}
    ongotpointercapture() {}
    oninput() {}
    oninvalid() {}
    onkeydown() {}
    onkeypress() {}
    onkeyup() {}
    onload() {}
    onloadeddata() {}
    onloadedmetadata() {}
    onloadstart() {}
    onlostpointercapture() {}
    onmousedown() {}
    onmouseenter() {}
    onmouseleave() {}
    onmousemove() {}
    onmouseout() {}
    onmouseover() {}
    onmouseup() {}
    onmousewheel() {}
    onpaste() {}
    onpause() {}
    onplay() {}
    onplaying() {}
    onpointercancel() {}
    onpointerdown() {}
    onpointerenter() {}
    onpointerleave() {}
    onpointermove() {}
    onpointerout() {}
    onpointerover() {}
    onpointerup() {}
    onprogress() {}
    onratechange() {}
    onreset() {}
    onresize() {}
    onscroll() {}
    onsearch() {}
    onseeked() {}
    onseeking() {}
    onselect() {}
    onselectstart() {}
    onstalled() {}
    onsubmit() {}
    onsuspend() {}
    ontimeupdate() {}
    ontoggle() {}
    onvolumechange() {}
    onwaiting() {}
    onwebkitfullscreenchange() {}
    onwebkitfullscreenerror() {}
    onwheel() {}
    requestFullscreen() {}
    scrollBy() {}
    scrollTo() {}
    scrollIntoView() {}
    toString(e) {
      return Qe(this, e);
    }
  };
function Mu(t, e, r) {
  let n = t.children;
  for (let u = 0, o = n.length; u < o; u++) {
    let h = n[u];
    for (let T = 0, A = e.length; T < A; T++)
      h.classList.contains(e[T]) && r.push(h);
    Mu(h, e, r);
  }
}
function Pu(t, e, r) {
  var u;
  let n = t.children;
  for (let o = 0, h = n.length; o < h; o++) {
    let T = n[o];
    (e === "*" || ((u = T.nodeName) != null ? u : "").toLowerCase() === e) &&
      r.push(T),
      Pu(T, e, r);
  }
}
function jn(t) {
  tt(t), delete t.__attributeMap, delete t.__shadowRoot, delete t.__style;
}
function Be(t, e, r) {
  if (e !== r) {
    if (
      (e.remove(),
      (e.parentNode = t),
      (e.ownerDocument = t.ownerDocument),
      r != null)
    ) {
      let n = t.childNodes.indexOf(r);
      if (n > -1) t.childNodes.splice(n, 0, e);
      else throw new Error("referenceNode not found in parentNode.childNodes");
    } else t.childNodes.push(e);
    gt(t.ownerDocument, e);
  }
  return e;
}
var v = class extends Ie {
    constructor(r, n) {
      super(r, typeof n == "string" ? n.toUpperCase() : null);
      this.__namespaceURI = "http://www.w3.org/1999/xhtml";
    }
    get tagName() {
      var r;
      return (r = this.nodeName) != null ? r : "";
    }
    set tagName(r) {
      this.nodeName = r;
    }
    get attributes() {
      if (this.__attributeMap == null) {
        let r = pn(!0);
        return (this.__attributeMap = r), r;
      }
      return this.__attributeMap;
    }
    set attributes(r) {
      this.__attributeMap = r;
    }
  },
  st = class t extends G {
    constructor(e, r) {
      super(e, 3, "#text", r);
    }
    cloneNode(e) {
      return new t(null, this.nodeValue);
    }
    get textContent() {
      return this.nodeValue;
    }
    set textContent(e) {
      this.nodeValue = e;
    }
    get data() {
      return this.nodeValue;
    }
    set data(e) {
      this.nodeValue = e;
    }
    get wholeText() {
      if (this.parentNode != null) {
        let e = [];
        for (let r = 0, n = this.parentNode.childNodes.length; r < n; r++) {
          let u = this.parentNode.childNodes[r];
          u.nodeType === 3 && e.push(u.nodeValue);
        }
        return e.join("");
      }
      return this.nodeValue;
    }
  };
function zn(t, e) {
  for (let r = 0, n = t.length; r < n; r++) {
    let u = t[r];
    u.nodeType === 3
      ? e.push(u.nodeValue)
      : u.nodeType === 1 && zn(u.childNodes, e);
  }
}
function Kn(t, e) {
  for (let n = t.childNodes.length - 1; n >= 0; n--)
    t.removeChild(t.childNodes[n]);
  let r = new st(t.ownerDocument, e);
  t.appendChild(r);
}
var vt = class t extends G {
  constructor(e, r) {
    super(e, 8, "#comment", r);
  }
  cloneNode(e) {
    return new t(null, this.nodeValue);
  }
  get textContent() {
    return this.nodeValue;
  }
  set textContent(e) {
    this.nodeValue = e;
  }
};
var Ue = class t extends v {
  constructor(e) {
    super(e, null),
      (this.nodeName = "#document-fragment"),
      (this.nodeType = 11);
  }
  getElementById(e) {
    return Wr(this, e);
  }
  cloneNode(e) {
    let r = new t(null);
    if (e)
      for (let n = 0, u = this.childNodes.length; n < u; n++) {
        let o = this.childNodes[n];
        if (o.nodeType === 1 || o.nodeType === 3 || o.nodeType === 8) {
          let h = this.childNodes[n].cloneNode(!0);
          r.appendChild(h);
        }
      }
    return r;
  }
};
var Yr = class extends v {
  constructor(e) {
    super(e, "!DOCTYPE"), (this.nodeType = 10), this.setAttribute("html", "");
  }
};
var Gn = class {
    constructor(e) {
      this.parentStyleSheet = e;
      this.cssText = "";
      this.type = 0;
    }
  },
  Vr = class {
    constructor(e) {
      this.type = "text/css";
      this.parentStyleSheet = null;
      this.cssRules = [];
      this.ownerNode = e;
    }
    get rules() {
      return this.cssRules;
    }
    set rules(e) {
      this.cssRules = e;
    }
    deleteRule(e) {
      e >= 0 &&
        e < this.cssRules.length &&
        (this.cssRules.splice(e, 1), $n(this.ownerNode));
    }
    insertRule(e, r = 0) {
      typeof r != "number" && (r = 0),
        r < 0 && (r = 0),
        r > this.cssRules.length && (r = this.cssRules.length);
      let n = new Gn(this);
      return (
        (n.cssText = e), this.cssRules.splice(r, 0, n), $n(this.ownerNode), r
      );
    }
  };
function qr(t) {
  let e = [];
  for (let r = 0; r < t.childNodes.length; r++)
    e.push(t.childNodes[r].nodeValue);
  return e.join("");
}
function Xr(t, e) {
  let r = t.sheet;
  (r.cssRules.length = 0), r.insertRule(e), $n(t);
}
function $n(t) {
  let e = t.childNodes.length;
  if (e > 1) for (let n = e - 1; n >= 1; n--) t.removeChild(t.childNodes[n]);
  else e < 1 && t.appendChild(t.ownerDocument.createTextNode(""));
  let r = t.childNodes[0];
  r.nodeValue = t.sheet.cssRules.map((n) => n.cssText).join(`\n`);
}
function zr(t, e) {
  if (typeof e != "string" || e === "" || !/^[a-z0-9-_:]+$/i.test(e))
    throw new Error(`The tag name provided (${e}) is not a valid name.`);
  switch (((e = e.toLowerCase()), e)) {
    case "a":
      return new Ft(t);
    case "base":
      return new qt(t);
    case "button":
      return new ut(t);
    case "canvas":
      return new zt(t);
    case "form":
      return new ot(t);
    case "img":
      return new at(t);
    case "input":
      return new it(t);
    case "link":
      return new ct(t);
    case "meta":
      return new lt(t);
    case "script":
      return new dt(t);
    case "style":
      return new Yt(t);
    case "template":
      return new Xt(t);
    case "title":
      return new Qt(t);
    case "ul":
      return new Kt(t);
  }
  if (t != null && e.includes("-")) {
    let r = t.defaultView;
    if (r != null && r.customElements != null)
      return _n(r.customElements, t, e);
  }
  return new v(t, e);
}
function ku(t, e, r) {
  if (e === "http://www.w3.org/1999/xhtml") return zr(t, r);
  if (e === "http://www.w3.org/2000/svg")
    switch (r.toLowerCase()) {
      case "text":
      case "tspan":
      case "tref":
      case "altglyph":
      case "textpath":
        return new es(t, r);
      case "circle":
      case "ellipse":
      case "image":
      case "line":
      case "path":
      case "polygon":
      case "polyline":
      case "rect":
      case "use":
        return new Vt(t, r);
      case "svg":
        return new Zn(t, r);
      default:
        return new Kr(t, r);
    }
  else return new Ie(t, r, e);
}
var Ft = class extends v {
    constructor(e) {
      super(e, "a");
    }
    get href() {
      return jt(this, "href");
    }
    set href(e) {
      this.setAttribute("href", e);
    }
    get pathname() {
      return new URL(this.href).pathname;
    }
  },
  ut = class extends v {
    constructor(e) {
      super(e, "button");
    }
  };
Ke(ut.prototype, { type: String }, { type: "submit" });
var at = class extends v {
  constructor(e) {
    super(e, "img");
  }
  get draggable() {
    return this.getAttributeNS(null, "draggable") !== "false";
  }
  set draggable(e) {
    this.setAttributeNS(null, "draggable", e);
  }
  get src() {
    return jt(this, "src");
  }
  set src(e) {
    this.setAttribute("src", e);
  }
};
Ke(at.prototype, { height: Number, width: Number });
var it = class extends v {
  constructor(e) {
    super(e, "input");
  }
  get list() {
    let e = this.getAttribute("list");
    return e ? this.ownerDocument.getElementById(e) : null;
  }
};
Ke(
  it.prototype,
  {
    accept: String,
    autocomplete: String,
    autofocus: Boolean,
    capture: String,
    checked: Boolean,
    disabled: Boolean,
    form: String,
    formaction: String,
    formenctype: String,
    formmethod: String,
    formnovalidate: String,
    formtarget: String,
    height: Number,
    inputmode: String,
    max: String,
    maxLength: Number,
    min: String,
    minLength: Number,
    multiple: Boolean,
    name: String,
    pattern: String,
    placeholder: String,
    required: Boolean,
    readOnly: Boolean,
    size: Number,
    spellCheck: Boolean,
    src: String,
    step: String,
    type: String,
    value: String,
    width: Number,
  },
  { type: "text" },
);
var ot = class extends v {
  constructor(e) {
    super(e, "form");
  }
};
Ke(ot.prototype, { name: String });
var ct = class extends v {
  constructor(e) {
    super(e, "link");
  }
  get href() {
    return jt(this, "href");
  }
  set href(e) {
    this.setAttribute("href", e);
  }
};
Ke(ct.prototype, {
  crossorigin: String,
  media: String,
  rel: String,
  type: String,
});
var lt = class extends v {
  constructor(e) {
    super(e, "meta");
  }
};
Ke(lt.prototype, { charset: String, content: String, name: String });
var dt = class extends v {
  constructor(e) {
    super(e, "script");
  }
  get src() {
    return jt(this, "src");
  }
  set src(e) {
    this.setAttribute("src", e);
  }
};
Ke(dt.prototype, { type: String });
var Wt = class t {
    constructor() {
      this.a = 1;
      this.b = 0;
      this.c = 0;
      this.d = 1;
      this.e = 0;
      this.f = 0;
      this.m11 = 1;
      this.m12 = 0;
      this.m13 = 0;
      this.m14 = 0;
      this.m21 = 0;
      this.m22 = 1;
      this.m23 = 0;
      this.m24 = 0;
      this.m31 = 0;
      this.m32 = 0;
      this.m33 = 1;
      this.m34 = 0;
      this.m41 = 0;
      this.m42 = 0;
      this.m43 = 0;
      this.m44 = 1;
      this.is2D = !0;
      this.isIdentity = !0;
    }
    static fromMatrix() {
      return new t();
    }
    inverse() {
      return new t();
    }
    flipX() {
      return new t();
    }
    flipY() {
      return new t();
    }
    multiply() {
      return new t();
    }
    rotate() {
      return new t();
    }
    rotateAxisAngle() {
      return new t();
    }
    rotateFromVector() {
      return new t();
    }
    scale() {
      return new t();
    }
    scaleNonUniform() {
      return new t();
    }
    skewX() {
      return new t();
    }
    skewY() {
      return new t();
    }
    toJSON() {}
    toString() {}
    transformPoint() {
      return new Qr();
    }
    translate() {
      return new t();
    }
  },
  Qr = class {
    constructor() {
      this.w = 1;
      this.x = 0;
      this.y = 0;
      this.z = 0;
    }
    toJSON() {}
    matrixTransform() {
      return new Wt();
    }
  },
  Jn = class {
    constructor() {
      this.height = 10;
      this.width = 10;
      this.x = 0;
      this.y = 0;
    }
  },
  Yt = class extends v {
    constructor(e) {
      super(e, "style"), (this.sheet = new Vr(this));
    }
    get innerHTML() {
      return qr(this);
    }
    set innerHTML(e) {
      Xr(this, e);
    }
    get innerText() {
      return qr(this);
    }
    set innerText(e) {
      Xr(this, e);
    }
    get textContent() {
      return qr(this);
    }
    set textContent(e) {
      Xr(this, e);
    }
  },
  Kr = class extends Ie {
    constructor() {
      super(...arguments);
      this.__namespaceURI = "http://www.w3.org/2000/svg";
    }
    get ownerSVGElement() {
      return null;
    }
    get viewportElement() {
      return null;
    }
    onunload() {}
    get pathLength() {
      return 0;
    }
    isPointInFill(r) {
      return !1;
    }
    isPointInStroke(r) {
      return !1;
    }
    getTotalLength() {
      return 0;
    }
  },
  Vt = class extends Kr {
    getBBox(e) {
      return new Jn();
    }
    getCTM() {
      return new Wt();
    }
    getScreenCTM() {
      return new Wt();
    }
  },
  Zn = class extends Vt {
    createSVGPoint() {
      return new Qr();
    }
  },
  es = class extends Vt {
    getComputedTextLength() {
      return 0;
    }
  },
  qt = class extends v {
    constructor(e) {
      super(e, "base");
    }
    get href() {
      return jt(this, "href");
    }
    set href(e) {
      this.setAttribute("href", e);
    }
  },
  Xt = class t extends v {
    constructor(e) {
      super(e, "template"), (this.content = new Ue(e));
    }
    get innerHTML() {
      return this.content.innerHTML;
    }
    set innerHTML(e) {
      this.content.innerHTML = e;
    }
    cloneNode(e) {
      let r = new t(null);
      r.attributes = Je(this.attributes);
      let n = this.getAttribute("style");
      if (
        (n != null && n.length > 0 && r.setAttribute("style", n),
        (r.content = this.content.cloneNode(e)),
        e)
      )
        for (let u = 0, o = this.childNodes.length; u < o; u++) {
          let h = this.childNodes[u].cloneNode(!0);
          r.appendChild(h);
        }
      return r;
    }
  },
  Qt = class extends v {
    constructor(e) {
      super(e, "title");
    }
    get text() {
      return this.textContent;
    }
    set text(e) {
      this.textContent = e;
    }
  },
  Kt = class extends v {
    constructor(e) {
      super(e, "ul");
    }
  },
  zt = class extends v {
    constructor(e) {
      super(e, "canvas");
    }
    getContext() {
      return {
        fillRect() {},
        clearRect() {},
        getImageData: function (e, r, n, u) {
          return { data: new Array(n * u * 4) };
        },
        putImageData() {},
        createImageData: function () {
          return [];
        },
        setTransform() {},
        drawImage() {},
        save() {},
        fillText() {},
        restore() {},
        beginPath() {},
        moveTo() {},
        lineTo() {},
        closePath() {},
        stroke() {},
        translate() {},
        scale() {},
        rotate() {},
        arc() {},
        fill() {},
        measureText() {
          return { width: 0 };
        },
        transform() {},
        rect() {},
        clip() {},
      };
    }
  };
function jt(t, e) {
  let r = t.getAttribute(e) || "";
  if (t.ownerDocument != null) {
    let n = t.ownerDocument.defaultView;
    if (n != null) {
      let u = n.location;
      if (u != null)
        try {
          return new URL(r, u.href).href;
        } catch {}
    }
  }
  return r.replace(/\'|\"/g, "").trim();
}
function Ke(t, e, r = {}) {
  Object.keys(e).forEach((n) => {
    let u = e[n],
      o = r[n];
    u === Boolean
      ? Object.defineProperty(t, n, {
          get() {
            return this.hasAttribute(n);
          },
          set(h) {
            h ? this.setAttribute(n, "") : this.removeAttribute(n);
          },
        })
      : u === Number
        ? Object.defineProperty(t, n, {
            get() {
              let h = this.getAttribute(n);
              return h ? parseInt(h, 10) : o === void 0 ? 0 : o;
            },
            set(h) {
              this.setAttribute(n, h);
            },
          })
        : Object.defineProperty(t, n, {
            get() {
              return this.hasAttribute(n) ? this.getAttribute(n) : o || "";
            },
            set(h) {
              this.setAttribute(n, h);
            },
          });
  });
}
Ie.prototype.cloneNode = function (t) {
  let e = zr(this.ownerDocument, this.nodeName);
  e.attributes = Je(this.attributes);
  let r = this.getAttribute("style");
  if ((r != null && r.length > 0 && e.setAttribute("style", r), t))
    for (let n = 0, u = this.childNodes.length; n < u; n++) {
      let o = this.childNodes[n].cloneNode(!0);
      e.appendChild(o);
    }
  return e;
};
var ts;
function rs(t, e = null) {
  return e == null && (ts == null && (ts = new Se()), (e = ts)), Hr(e, t);
}
var Q = () => {};
function Hu() {
  return {
    debug: Q,
    error: Q,
    info: Q,
    log: Q,
    warn: Q,
    dir: Q,
    dirxml: Q,
    table: Q,
    trace: Q,
    group: Q,
    groupCollapsed: Q,
    groupEnd: Q,
    clear: Q,
    count: Q,
    countReset: Q,
    assert: Q,
    profile: Q,
    profileEnd: Q,
    time: Q,
    timeLog: Q,
    timeEnd: Q,
    timeStamp: Q,
    context: Q,
    memory: Q,
  };
}
var fe = class {
  constructor(e) {
    this._values = [];
    if (typeof e == "object")
      if (typeof e[Symbol.iterator] == "function") {
        let r = [];
        for (let n of e)
          typeof n[Symbol.iterator] == "function" && r.push([...n]);
        for (let n of r) this.append(n[0], n[1]);
      } else for (let r in e) this.append(r, e[r]);
  }
  append(e, r) {
    this._values.push([e, r + ""]);
  }
  delete(e) {
    e = e.toLowerCase();
    for (let r = this._values.length - 1; r >= 0; r--)
      this._values[r][0].toLowerCase() === e && this._values.splice(r, 1);
  }
  entries() {
    let e = [];
    for (let n of this.keys()) e.push([n, this.get(n)]);
    let r = -1;
    return {
      next() {
        return r++, { value: e[r], done: !e[r] };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
  forEach(e) {
    for (let r of this.entries()) e(r[1], r[0]);
  }
  get(e) {
    let r = [];
    e = e.toLowerCase();
    for (let n of this._values) n[0].toLowerCase() === e && r.push(n[1]);
    return r.length > 0 ? r.join(", ") : null;
  }
  has(e) {
    e = e.toLowerCase();
    for (let r of this._values) if (r[0].toLowerCase() === e) return !0;
    return !1;
  }
  keys() {
    let e = [];
    for (let n of this._values) {
      let u = n[0].toLowerCase();
      e.includes(u) || e.push(u);
    }
    let r = -1;
    return {
      next() {
        return r++, { value: e[r], done: !e[r] };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
  set(e, r) {
    for (let n of this._values)
      if (n[0].toLowerCase() === e.toLowerCase()) {
        n[1] = r + "";
        return;
      }
    this.append(e, r);
  }
  values() {
    let e = this._values,
      r = -1;
    return {
      next() {
        r++;
        let n = !e[r];
        return { value: n ? void 0 : e[r][1], done: n };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
  [Symbol.iterator]() {
    return this.entries();
  }
};
var jr = class {
  parseFromString(e, r) {
    return (
      r !== "text/html" &&
        console.error("XML parsing not implemented yet, continuing as html"),
      rs(e)
    );
  }
};
var Gt = class t {
    constructor(e, r = {}) {
      this._method = "GET";
      this._url = "/";
      this.bodyUsed = !1;
      this.cache = "default";
      this.credentials = "same-origin";
      this.integrity = "";
      this.keepalive = !1;
      this.mode = "cors";
      this.redirect = "follow";
      this.referrer = "about:client";
      this.referrerPolicy = "";
      typeof e == "string"
        ? (this.url = e)
        : e && (Object.assign(this, e), (this.headers = new fe(e.headers))),
        Object.assign(this, r),
        r.headers && (this.headers = new fe(r.headers)),
        this.headers || (this.headers = new fe());
    }
    get url() {
      return typeof this._url == "string"
        ? new URL(this._url, location.href).href
        : new URL("/", location.href).href;
    }
    set url(e) {
      this._url = e;
    }
    get method() {
      return typeof this._method == "string"
        ? this._method.toUpperCase()
        : "GET";
    }
    set method(e) {
      this._method = e;
    }
    clone() {
      let e = { ...this };
      return (e.headers = new fe(this.headers)), new t(e);
    }
  },
  $t = class t {
    constructor(e, r = {}) {
      this.ok = !0;
      this.status = 200;
      this.statusText = "";
      this.type = "default";
      this.url = "";
      (this._body = e),
        r && Object.assign(this, r),
        (this.headers = new fe(r.headers));
    }
    async json() {
      return JSON.parse(this._body);
    }
    async text() {
      return this._body;
    }
    clone() {
      let e = { ...this };
      return (e.headers = new fe(this.headers)), new t(this._body, e);
    }
  };
function ns(t) {
  let e = new ue(!1);
  Ec.forEach((r) => {
    typeof t[r] != "function" && (t[r] = e[r].bind(e));
  }),
    Tc.forEach((r) => {
      t === void 0 &&
        Object.defineProperty(t, r, {
          get() {
            return e[r];
          },
          set(n) {
            e[r] = n;
          },
          configurable: !0,
          enumerable: !0,
        });
    });
}
function wu(t) {
  pc.forEach(([e, r]) => {
    Object.defineProperty(t, e, {
      get() {
        return this["__" + e] || r;
      },
      set(n) {
        this["__" + e] = n;
      },
      configurable: !0,
      enumerable: !0,
    });
  });
}
var Ec = [
    "addEventListener",
    "alert",
    "blur",
    "cancelAnimationFrame",
    "cancelIdleCallback",
    "clearInterval",
    "clearTimeout",
    "close",
    "confirm",
    "dispatchEvent",
    "focus",
    "getComputedStyle",
    "matchMedia",
    "open",
    "prompt",
    "removeEventListener",
    "requestAnimationFrame",
    "requestIdleCallback",
    "URL",
  ],
  Tc = [
    "customElements",
    "devicePixelRatio",
    "document",
    "history",
    "innerHeight",
    "innerWidth",
    "localStorage",
    "location",
    "navigator",
    "pageXOffset",
    "pageYOffset",
    "performance",
    "screenLeft",
    "screenTop",
    "screenX",
    "screenY",
    "scrollX",
    "scrollY",
    "sessionStorage",
    "CSS",
    "CustomEvent",
    "Event",
    "Element",
    "HTMLElement",
    "Node",
    "NodeList",
    "FocusEvent",
    "KeyboardEvent",
    "MouseEvent",
  ],
  pc = [
    ["CustomEvent", _t],
    ["Event", Ce],
    ["Headers", fe],
    ["FocusEvent", We],
    ["KeyboardEvent", At],
    ["MouseEvent", Ct],
    ["Request", Gt],
    ["Response", $t],
    ["DOMParser", jr],
    ["HTMLAnchorElement", Ft],
    ["HTMLBaseElement", qt],
    ["HTMLButtonElement", ut],
    ["HTMLCanvasElement", zt],
    ["HTMLFormElement", ot],
    ["HTMLImageElement", at],
    ["HTMLInputElement", it],
    ["HTMLLinkElement", ct],
    ["HTMLMetaElement", lt],
    ["HTMLScriptElement", dt],
    ["HTMLStyleElement", Yt],
    ["HTMLTemplateElement", Xt],
    ["HTMLTitleElement", Qt],
    ["HTMLUListElement", Kt],
  ];
var Gr = class {
  constructor() {
    this.items = [];
  }
  get length() {
    return this.items.length;
  }
  back() {
    this.go(-1);
  }
  forward() {
    this.go(1);
  }
  go(e) {}
  pushState(e, r, n) {}
  replaceState(e, r, n) {}
};
var $r = class {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};
var Jt = class {
  constructor() {
    this.ancestorOrigins = null;
    this.protocol = "";
    this.host = "";
    this.hostname = "";
    this.port = "";
    this.pathname = "";
    this.search = "";
    this.hash = "";
    this.username = "";
    this.password = "";
    this.origin = "";
    this._href = "";
  }
  get href() {
    return this._href;
  }
  set href(e) {
    let r = new URL(e, "http://mockdoc.stenciljs.com");
    (this._href = r.href),
      (this.protocol = r.protocol),
      (this.host = r.host),
      (this.hostname = r.hostname),
      (this.port = r.port),
      (this.pathname = r.pathname),
      (this.search = r.search),
      (this.hash = r.hash),
      (this.username = r.username),
      (this.password = r.password),
      (this.origin = r.origin);
  }
  assign(e) {}
  reload(e) {}
  replace(e) {}
  toString() {
    return this.href;
  }
};
var Jr = class {
  constructor() {
    this.appCodeName = "MockNavigator";
    this.appName = "MockNavigator";
    this.appVersion = "MockNavigator";
    this.platform = "MockNavigator";
    this.userAgent = "MockNavigator";
  }
};
var Zr = class {
  constructor() {
    (this.timeOrigin = Date.now()), (this.eventCounts = new Map());
  }
  addEventListener() {}
  clearMarks() {}
  clearMeasures() {}
  clearResourceTimings() {}
  dispatchEvent() {
    return !0;
  }
  getEntries() {
    return [];
  }
  getEntriesByName() {
    return [];
  }
  getEntriesByType() {
    return [];
  }
  mark() {}
  measure() {}
  get navigation() {
    return {};
  }
  now() {
    return Date.now() - this.timeOrigin;
  }
  get onresourcetimingbufferfull() {
    return null;
  }
  removeEventListener() {}
  setResourceTimingBufferSize() {}
  get timing() {
    return {};
  }
  toJSON() {}
};
function Bu(t) {
  if (t != null)
    try {
      t.timeOrigin = Date.now();
    } catch {}
}
var Zt = class {
  constructor() {
    this.items = new Map();
  }
  key(e) {}
  getItem(e) {
    return (e = String(e)), this.items.has(e) ? this.items.get(e) : null;
  }
  setItem(e, r) {
    r == null && (r = "null"), this.items.set(String(e), String(r));
  }
  removeItem(e) {
    this.items.delete(String(e));
  }
  clear() {
    this.items.clear();
  }
};
var Uu = clearInterval,
  vu = clearTimeout,
  gc = setInterval,
  bc = setTimeout,
  _c = URL,
  ue = class {
    constructor(e = null) {
      e !== !1 ? (this.document = new Se(e, this)) : (this.document = null),
        (this.performance = new Zr()),
        (this.customElements = new fr(this)),
        (this.console = Hu()),
        Fu(this),
        Wu(this);
    }
    addEventListener(e, r) {
      Er(this, e, r);
    }
    alert(e) {
      this.console ? this.console.debug(e) : console.debug(e);
    }
    blur() {}
    cancelAnimationFrame(e) {
      this.__clearTimeout(e);
    }
    cancelIdleCallback(e) {
      this.__clearTimeout(e);
    }
    get CharacterData() {
      if (this.__charDataCstr == null) {
        let e = this.document;
        this.__charDataCstr = class extends G {
          constructor() {
            throw (
              (super(e, 0, "test", ""),
              new Error("Illegal constructor: cannot construct CharacterData"))
            );
          }
        };
      }
      return this.__charDataCstr;
    }
    set CharacterData(e) {
      this.__charDataCstr = e;
    }
    clearInterval(e) {
      this.__clearInterval(e);
    }
    clearTimeout(e) {
      this.__clearTimeout(e);
    }
    close() {
      Ac(this);
    }
    confirm() {
      return !1;
    }
    get CSS() {
      return { supports: () => !0 };
    }
    get Document() {
      if (this.__docCstr == null) {
        let e = this;
        this.__docCstr = class extends Se {
          constructor() {
            throw (
              (super(!1, e),
              new Error("Illegal constructor: cannot construct Document"))
            );
          }
        };
      }
      return this.__docCstr;
    }
    set Document(e) {
      this.__docCstr = e;
    }
    get DocumentFragment() {
      if (this.__docFragCstr == null) {
        let e = this.document;
        this.__docFragCstr = class extends Ue {
          constructor() {
            throw (
              (super(e),
              new Error(
                "Illegal constructor: cannot construct DocumentFragment",
              ))
            );
          }
        };
      }
      return this.__docFragCstr;
    }
    set DocumentFragment(e) {
      this.__docFragCstr = e;
    }
    get DocumentType() {
      if (this.__docTypeCstr == null) {
        let e = this.document;
        this.__docTypeCstr = class extends G {
          constructor() {
            throw (
              (super(e, 0, "test", ""),
              new Error("Illegal constructor: cannot construct DocumentType"))
            );
          }
        };
      }
      return this.__docTypeCstr;
    }
    set DocumentType(e) {
      this.__docTypeCstr = e;
    }
    get DOMTokenList() {
      return (
        this.__domTokenListCstr == null && (this.__domTokenListCstr = class {}),
        this.__domTokenListCstr
      );
    }
    set DOMTokenList(e) {
      this.__domTokenListCstr = e;
    }
    dispatchEvent(e) {
      return Ye(this, e);
    }
    get Element() {
      if (this.__elementCstr == null) {
        let e = this.document;
        this.__elementCstr = class extends Ie {
          constructor() {
            throw (
              (super(e, ""),
              new Error("Illegal constructor: cannot construct Element"))
            );
          }
        };
      }
      return this.__elementCstr;
    }
    fetch(e, r) {
      if (typeof fetch == "function") return fetch(e, r);
      throw new Error("fetch() not implemented");
    }
    focus() {}
    getComputedStyle(e) {
      return {
        cssText: "",
        length: 0,
        parentRule: null,
        getPropertyPriority() {
          return null;
        },
        getPropertyValue() {
          return "";
        },
        item() {
          return null;
        },
        removeProperty() {
          return null;
        },
        setProperty() {
          return null;
        },
      };
    }
    get globalThis() {
      return this;
    }
    get history() {
      return (
        this.__history == null && (this.__history = new Gr()), this.__history
      );
    }
    set history(e) {
      this.__history = e;
    }
    get JSON() {
      return JSON;
    }
    get HTMLElement() {
      if (this.__htmlElementCstr == null) {
        let e = this.document;
        this.__htmlElementCstr = class extends v {
          constructor() {
            super(e, "");
            let r = this.constructor.observedAttributes;
            Array.isArray(r) &&
              typeof this.attributeChangedCallback == "function" &&
              r.forEach((n) => {
                let u = this.getAttribute(n);
                u != null && this.attributeChangedCallback(n, null, u);
              });
          }
        };
      }
      return this.__htmlElementCstr;
    }
    set HTMLElement(e) {
      this.__htmlElementCstr = e;
    }
    get IntersectionObserver() {
      return $r;
    }
    get localStorage() {
      return (
        this.__localStorage == null && (this.__localStorage = new Zt()),
        this.__localStorage
      );
    }
    set localStorage(e) {
      this.__localStorage = e;
    }
    get location() {
      return (
        this.__location == null && (this.__location = new Jt()), this.__location
      );
    }
    set location(e) {
      typeof e == "string"
        ? (this.__location == null && (this.__location = new Jt()),
          (this.__location.href = e))
        : (this.__location = e);
    }
    matchMedia(e) {
      return {
        media: e,
        matches: !1,
        addListener: (r) => {},
        removeListener: (r) => {},
        addEventListener: (r, n) => {},
        removeEventListener: (r, n) => {},
        dispatchEvent: (r) => {},
        onchange: null,
      };
    }
    get Node() {
      if (this.__nodeCstr == null) {
        let e = this.document;
        this.__nodeCstr = class extends G {
          constructor() {
            throw (
              (super(e, 0, "test", ""),
              new Error("Illegal constructor: cannot construct Node"))
            );
          }
        };
      }
      return this.__nodeCstr;
    }
    get NodeList() {
      if (this.__nodeListCstr == null) {
        let e = this.document;
        this.__nodeListCstr = class extends Fr {
          constructor() {
            throw (
              (super(e, [], 0),
              new Error("Illegal constructor: cannot construct NodeList"))
            );
          }
        };
      }
      return this.__nodeListCstr;
    }
    get navigator() {
      return (
        this.__navigator == null && (this.__navigator = new Jr()),
        this.__navigator
      );
    }
    set navigator(e) {
      this.__navigator = e;
    }
    get parent() {
      return null;
    }
    prompt() {
      return "";
    }
    open() {
      return null;
    }
    get origin() {
      return this.location.origin;
    }
    removeEventListener(e, r) {
      Tr(this, e, r);
    }
    requestAnimationFrame(e) {
      return this.setTimeout(() => {
        e(Date.now());
      }, 0);
    }
    requestIdleCallback(e) {
      return this.setTimeout(() => {
        e({ didTimeout: !1, timeRemaining: () => 0 });
      }, 0);
    }
    scroll(e, r) {}
    scrollBy(e, r) {}
    scrollTo(e, r) {}
    get self() {
      return this;
    }
    get sessionStorage() {
      return (
        this.__sessionStorage == null && (this.__sessionStorage = new Zt()),
        this.__sessionStorage
      );
    }
    set sessionStorage(e) {
      this.__sessionStorage = e;
    }
    setInterval(e, r, ...n) {
      if (
        (this.__timeouts == null && (this.__timeouts = new Set()),
        (r = Math.min(r, this.__maxTimeout)),
        this.__allowInterval)
      ) {
        let o = this.__setInterval(() => {
          if (this.__timeouts) {
            this.__timeouts.delete(o);
            try {
              e(...n);
            } catch (h) {
              this.console ? this.console.error(h) : console.error(h);
            }
          }
        }, r);
        return this.__timeouts && this.__timeouts.add(o), o;
      }
      let u = this.__setTimeout(() => {
        if (this.__timeouts) {
          this.__timeouts.delete(u);
          try {
            e(...n);
          } catch (o) {
            this.console ? this.console.error(o) : console.error(o);
          }
        }
      }, r);
      return this.__timeouts && this.__timeouts.add(u), u;
    }
    setTimeout(e, r, ...n) {
      this.__timeouts == null && (this.__timeouts = new Set()),
        (r = Math.min(r, this.__maxTimeout));
      let u = this.__setTimeout(() => {
        if (this.__timeouts) {
          this.__timeouts.delete(u);
          try {
            e(...n);
          } catch (o) {
            this.console ? this.console.error(o) : console.error(o);
          }
        }
      }, r);
      return this.__timeouts && this.__timeouts.add(u), u;
    }
    get top() {
      return this;
    }
    get window() {
      return this;
    }
    onanimationstart() {}
    onanimationend() {}
    onanimationiteration() {}
    onabort() {}
    onauxclick() {}
    onbeforecopy() {}
    onbeforecut() {}
    onbeforepaste() {}
    onblur() {}
    oncancel() {}
    oncanplay() {}
    oncanplaythrough() {}
    onchange() {}
    onclick() {}
    onclose() {}
    oncontextmenu() {}
    oncopy() {}
    oncuechange() {}
    oncut() {}
    ondblclick() {}
    ondrag() {}
    ondragend() {}
    ondragenter() {}
    ondragleave() {}
    ondragover() {}
    ondragstart() {}
    ondrop() {}
    ondurationchange() {}
    onemptied() {}
    onended() {}
    onerror() {}
    onfocus() {}
    onfocusin() {}
    onfocusout() {}
    onformdata() {}
    onfullscreenchange() {}
    onfullscreenerror() {}
    ongotpointercapture() {}
    oninput() {}
    oninvalid() {}
    onkeydown() {}
    onkeypress() {}
    onkeyup() {}
    onload() {}
    onloadeddata() {}
    onloadedmetadata() {}
    onloadstart() {}
    onlostpointercapture() {}
    onmousedown() {}
    onmouseenter() {}
    onmouseleave() {}
    onmousemove() {}
    onmouseout() {}
    onmouseover() {}
    onmouseup() {}
    onmousewheel() {}
    onpaste() {}
    onpause() {}
    onplay() {}
    onplaying() {}
    onpointercancel() {}
    onpointerdown() {}
    onpointerenter() {}
    onpointerleave() {}
    onpointermove() {}
    onpointerout() {}
    onpointerover() {}
    onpointerup() {}
    onprogress() {}
    onratechange() {}
    onreset() {}
    onresize() {}
    onscroll() {}
    onsearch() {}
    onseeked() {}
    onseeking() {}
    onselect() {}
    onselectstart() {}
    onstalled() {}
    onsubmit() {}
    onsuspend() {}
    ontimeupdate() {}
    ontoggle() {}
    onvolumechange() {}
    onwaiting() {}
    onwebkitfullscreenchange() {}
    onwebkitfullscreenerror() {}
    onwheel() {}
  };
wu(ue.prototype);
function Fu(t) {
  (t.__clearInterval = Uu),
    (t.__clearTimeout = vu),
    (t.__setInterval = gc),
    (t.__setTimeout = bc),
    (t.__maxTimeout = 3e4),
    (t.__allowInterval = !0),
    (t.URL = _c);
}
function ss(t, e = {}) {
  if (t == null) return null;
  let r = new ue(!1);
  if ((e.customElementProxy || (t.customElements = null), t.document != null)) {
    let n = new Se(!1, r);
    (r.document = n),
      (n.documentElement = t.document.documentElement.cloneNode(!0));
  } else r.document = new Se(null, r);
  return r;
}
function us(t) {
  (t.__allowInterval = !1), (t.__maxTimeout = 0);
}
function Ac(t) {
  if (t != null) {
    t.__timeouts &&
      (t.__timeouts.forEach((e) => {
        Uu(e), vu(e);
      }),
      t.__timeouts.clear()),
      t.customElements && t.customElements.clear && t.customElements.clear(),
      as(t.document),
      Bu(t.performance);
    for (let e in t)
      t.hasOwnProperty(e) &&
        e !== "document" &&
        e !== "performance" &&
        e !== "customElements" &&
        delete t[e];
    if ((Fu(t), Wu(t), tt(t), t.document != null))
      try {
        t.document.defaultView = t;
      } catch {}
    (t.fetch = null),
      (t.Headers = null),
      (t.Request = null),
      (t.Response = null),
      (t.FetchError = null);
  }
}
function Wu(t) {
  try {
    (t.devicePixelRatio = 1),
      (t.innerHeight = 768),
      (t.innerWidth = 1366),
      (t.pageXOffset = 0),
      (t.pageYOffset = 0),
      (t.screenLeft = 0),
      (t.screenTop = 0),
      (t.screenX = 0),
      (t.screenY = 0),
      (t.scrollX = 0),
      (t.scrollY = 0),
      (t.screen = {
        availHeight: t.innerHeight,
        availLeft: 0,
        availTop: 0,
        availWidth: t.innerWidth,
        colorDepth: 24,
        height: t.innerHeight,
        keepAwake: !1,
        orientation: { angle: 0, type: "portrait-primary" },
        pixelDepth: 24,
        width: t.innerWidth,
      });
  } catch {}
}
var Se = class t extends v {
  constructor(e = null, r = null) {
    if (
      (super(null, null),
      (this.nodeName = "#document"),
      (this.nodeType = 9),
      (this.defaultView = r),
      (this.cookie = ""),
      (this.referrer = ""),
      this.appendChild(this.createDocumentTypeNode()),
      typeof e == "string")
    ) {
      let u = Hr(this, e).children.find((o) => o.nodeName === "HTML");
      u != null && (this.appendChild(u), er(u, this));
    } else if (e !== !1) {
      let n = new v(this, "html");
      this.appendChild(n),
        n.appendChild(new v(this, "head")),
        n.appendChild(new v(this, "body"));
    }
  }
  get dir() {
    return this.documentElement.dir;
  }
  set dir(e) {
    this.documentElement.dir = e;
  }
  get location() {
    return this.defaultView != null ? this.defaultView.location : null;
  }
  set location(e) {
    this.defaultView != null && (this.defaultView.location = e);
  }
  get baseURI() {
    let e = this.head.childNodes.find((r) => r.nodeName === "BASE");
    return e ? e.href : this.URL;
  }
  get URL() {
    return this.location.href;
  }
  get styleSheets() {
    return this.querySelectorAll("style");
  }
  get scripts() {
    return this.querySelectorAll("script");
  }
  get forms() {
    return this.querySelectorAll("form");
  }
  get images() {
    return this.querySelectorAll("img");
  }
  get scrollingElement() {
    return this.documentElement;
  }
  get documentElement() {
    for (let r = this.childNodes.length - 1; r >= 0; r--)
      if (this.childNodes[r].nodeName === "HTML") return this.childNodes[r];
    let e = new v(this, "html");
    return this.appendChild(e), e;
  }
  set documentElement(e) {
    for (let r = this.childNodes.length - 1; r >= 0; r--)
      this.childNodes[r].nodeType !== 10 && this.childNodes[r].remove();
    e != null && (this.appendChild(e), er(e, this));
  }
  get head() {
    let e = this.documentElement;
    for (let n = 0; n < e.childNodes.length; n++)
      if (e.childNodes[n].nodeName === "HEAD") return e.childNodes[n];
    let r = new v(this, "head");
    return e.insertBefore(r, e.firstChild), r;
  }
  set head(e) {
    let r = this.documentElement;
    for (let n = r.childNodes.length - 1; n >= 0; n--)
      r.childNodes[n].nodeName === "HEAD" && r.childNodes[n].remove();
    e != null && (r.insertBefore(e, r.firstChild), er(e, this));
  }
  get body() {
    let e = this.documentElement;
    for (let n = e.childNodes.length - 1; n >= 0; n--)
      if (e.childNodes[n].nodeName === "BODY") return e.childNodes[n];
    let r = new v(this, "body");
    return e.appendChild(r), r;
  }
  set body(e) {
    let r = this.documentElement;
    for (let n = r.childNodes.length - 1; n >= 0; n--)
      r.childNodes[n].nodeName === "BODY" && r.childNodes[n].remove();
    e != null && (r.appendChild(e), er(e, this));
  }
  appendChild(e) {
    return e.remove(), (e.parentNode = this), this.childNodes.push(e), e;
  }
  createComment(e) {
    return new vt(this, e);
  }
  createAttribute(e) {
    return new de(e.toLowerCase(), "");
  }
  createAttributeNS(e, r) {
    return new de(r, "", e);
  }
  createElement(e) {
    if (e === "#document") {
      let r = new t(!1);
      return (r.nodeName = e), (r.parentNode = null), r;
    }
    return zr(this, e);
  }
  createElementNS(e, r) {
    return ku(this, e, r);
  }
  createTextNode(e) {
    return new st(this, e);
  }
  createDocumentFragment() {
    return new Ue(this);
  }
  createDocumentTypeNode() {
    return new Yr(this);
  }
  getElementById(e) {
    return Wr(this, e);
  }
  getElementsByName(e) {
    return Yu(this, e.toLowerCase());
  }
  get title() {
    let e = this.head.childNodes.find((r) => r.nodeName === "TITLE");
    return e != null && typeof e.textContent == "string"
      ? e.textContent.trim()
      : "";
  }
  set title(e) {
    let r = this.head,
      n = r.childNodes.find((u) => u.nodeName === "TITLE");
    n == null && ((n = this.createElement("title")), r.appendChild(n)),
      (n.textContent = e);
  }
};
function as(t) {
  if (t != null) {
    tt(t);
    let e = t.documentElement;
    if (e != null) {
      jn(e);
      for (let r = 0, n = e.childNodes.length; r < n; r++) {
        let u = e.childNodes[r];
        jn(u), (u.childNodes.length = 0);
      }
    }
    for (let r in t) t.hasOwnProperty(r) && !Nc.has(r) && delete t[r];
    try {
      t.nodeName = "#document";
    } catch {}
    try {
      t.nodeType = 9;
    } catch {}
    try {
      t.cookie = "";
    } catch {}
    try {
      t.referrer = "";
    } catch {}
  }
}
var Nc = new Set([
  "nodeName",
  "nodeType",
  "nodeValue",
  "ownerDocument",
  "parentNode",
  "childNodes",
  "_shadowRoot",
]);
function Wr(t, e) {
  let r = t.children;
  for (let n = 0, u = r.length; n < u; n++) {
    let o = r[n];
    if (o.id === e) return o;
    let h = Wr(o, e);
    if (h != null) return h;
  }
  return null;
}
function Yu(t, e, r = []) {
  let n = t.children;
  for (let u = 0, o = n.length; u < o; u++) {
    let h = n[u];
    h.name && h.name.toLowerCase() === e && r.push(h), Yu(h, e, r);
  }
  return r;
}
function er(t, e) {
  for (let r = 0, n = t.childNodes.length; r < n; r++)
    (t.childNodes[r].ownerDocument = e),
      t.childNodes[r].nodeType === 1 && er(t.childNodes[r], e);
}
var Vu = new Map();
function Ic(t, e) {
  let r = Vu.get(e);
  return r == null && ((r = new ue(t)), Vu.set(e, r)), ss(r);
}
var tr = (t) => typeof t == "string";
var is = (t) =>
  !!t &&
  (typeof t == "object" || typeof t == "function") &&
  typeof t.then == "function";
var qu = (t, e, r) => {
    let n = {
      level: "error",
      type: "build",
      header: "Build Error",
      messageText: "build error",
      lines: [],
    };
    return (
      tr(r)
        ? (n.messageText = r.length ? r : "UNKNOWN ERROR")
        : e != null &&
          (e.stack != null
            ? (n.messageText = e.stack.toString())
            : e.message != null
              ? (n.messageText = e.message.length ? e.message : "UNKNOWN ERROR")
              : (n.messageText = e.toString())),
      t != null && !Sc(n.messageText) && t.push(n),
      n
    );
  },
  ht = (t) =>
    t == null || t.length === 0
      ? !1
      : t.some((e) => e.level === "error" && e.type !== "runtime");
var Sc = (t) => t === yc,
  yc = "task canceled";
var cs = {};
cr(cs, {
  err: () => Xu,
  map: () => Lc,
  ok: () => os,
  unwrap: () => Oc,
  unwrapErr: () => Dc,
});
var os = (t) => ({ isOk: !0, isErr: !1, value: t }),
  Xu = (t) => ({ isOk: !1, isErr: !0, value: t });
function Lc(t, e) {
  if (t.isOk) {
    let r = e(t.value);
    return r instanceof Promise ? r.then((n) => os(n)) : os(r);
  }
  if (t.isErr) {
    let r = t.value;
    return Xu(r);
  }
  throw "should never get here";
}
var Oc = (t) => {
    if (t.isOk) return t.value;
    throw t.value;
  },
  Dc = (t) => {
    if (t.isErr) return t.value;
    throw t.value;
  };
var Qu = (t, e) => {
  let r = t.head.querySelector('link[rel="canonical"]');
  typeof e == "string"
    ? (r == null &&
        ((r = t.createElement("link")),
        r.setAttribute("rel", "canonical"),
        t.head.appendChild(r)),
      r.setAttribute("href", e))
    : r != null && (r.getAttribute("href") || r.parentNode.removeChild(r));
};
var Ku = (t) => {
  let e = t.head,
    r = e.querySelector("meta[charset]");
  r == null
    ? ((r = t.createElement("meta")), r.setAttribute("charset", "utf-8"))
    : r.remove(),
    e.insertBefore(r, e.firstChild);
};
var ju = (t, e) => {
    let r = 1,
      n = 1,
      u = [],
      o = (x) => {
        let C = x.match(/\n/g);
        C && (r += C.length);
        let k = x.lastIndexOf(`\n`);
        n = ~k ? x.length - k : n + x.length;
      },
      h = () => {
        let x = { line: r, column: n };
        return (C) => ((C.position = new mt(x)), Y(), C);
      },
      T = (x) => {
        let C = t.split(`\n`),
          k = {
            level: "error",
            type: "css",
            language: "css",
            header: "CSS Parse",
            messageText: x,
            absFilePath: e,
            lines: [
              {
                lineIndex: r - 1,
                lineNumber: r,
                errorCharStart: n,
                text: t[r - 1],
              },
            ],
          };
        if (r > 1) {
          let V = {
            lineIndex: r - 1,
            lineNumber: r - 1,
            text: t[r - 2],
            errorCharStart: -1,
            errorLength: -1,
          };
          k.lines.unshift(V);
        }
        if (r + 2 < C.length) {
          let V = {
            lineIndex: r,
            lineNumber: r + 1,
            text: C[r],
            errorCharStart: -1,
            errorLength: -1,
          };
          k.lines.push(V);
        }
        return u.push(k), null;
      },
      A = () => {
        let x = w();
        return { type: 14, stylesheet: { source: e, rules: x } };
      },
      y = () => R(/^{\s*/),
      M = () => R(/^}/),
      R = (x) => {
        let C = x.exec(t);
        if (!C) return;
        let k = C[0];
        return o(k), (t = t.slice(k.length)), C;
      },
      w = () => {
        let x,
          C = [];
        for (Y(), K(C); t.length && t.charAt(0) !== "}" && (x = cn() || _s()); )
          C.push(x), K(C);
        return C;
      },
      Y = () => R(/^\s*/),
      K = (x) => {
        let C;
        for (x = x || []; (C = nn()); ) x.push(C);
        return x;
      },
      nn = () => {
        let x = h();
        if (t.charAt(0) !== "/" || t.charAt(1) !== "*") return null;
        let C = 2;
        for (
          ;
          t.charAt(C) !== "" &&
          (t.charAt(C) !== "*" || t.charAt(C + 1) !== "/");

        )
          ++C;
        if (((C += 2), t.charAt(C - 1) === ""))
          return T("End of comment missing");
        let k = t.slice(2, C - 2);
        return (
          (n += 2), o(k), (t = t.slice(C)), (n += 2), x({ type: 1, comment: k })
        );
      },
      ze = () => {
        let x = R(/^([^{]+)/);
        return x
          ? Oe(x[0])
              .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, "")
              .replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (C) {
                return C.replace(/,/g, "‌");
              })
              .split(/\s*(?![^(]*\)),\s*/)
              .map(function (C) {
                return C.replace(/\u200C/g, ",");
              })
          : null;
      },
      Z = () => {
        let x = h(),
          C = R(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
        if (!C) return null;
        if (((C = Oe(C[0])), !R(/^:\s*/))) return T("property missing ':'");
        let k = R(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/),
          V = x({
            type: 4,
            property: C.replace(zu, ""),
            value: k ? Oe(k[0]).replace(zu, "") : "",
          });
        return R(/^[;\s]*/), V;
      },
      nr = () => {
        let x = [];
        if (!y()) return T("missing '{'");
        K(x);
        let C;
        for (; (C = Z()); ) x.push(C), K(x);
        return M() ? x : T("missing '}'");
      },
      sn = () => {
        let x,
          C = [],
          k = h();
        for (; (x = R(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)); )
          C.push(x[1]), R(/^,\s*/);
        return C.length ? k({ type: 9, values: C, declarations: nr() }) : null;
      },
      I = () => {
        let x = h(),
          C = R(/^@([-\w]+)?keyframes\s*/);
        if (!C) return null;
        let k = C[1];
        if (((C = R(/^([-\w]+)\s*/)), !C)) return T("@keyframes missing name");
        let V = C[1];
        if (!y()) return T("@keyframes missing '{'");
        let ie,
          _e = K();
        for (; (ie = sn()); ) _e.push(ie), (_e = _e.concat(K()));
        return M()
          ? x({ type: 8, name: V, vendor: k, keyframes: _e })
          : T("@keyframes missing '}'");
      },
      sr = () => {
        let x = h(),
          C = R(/^@supports *([^{]+)/);
        if (!C) return null;
        let k = Oe(C[1]);
        if (!y()) return T("@supports missing '{'");
        let V = K().concat(w());
        return M()
          ? x({ type: 15, supports: k, rules: V })
          : T("@supports missing '}'");
      },
      un = () => {
        let x = h();
        if (!R(/^@host\s*/)) return null;
        if (!y()) return T("@host missing '{'");
        let k = K().concat(w());
        return M() ? x({ type: 6, rules: k }) : T("@host missing '}'");
      },
      bs = () => {
        let x = h(),
          C = R(/^@media *([^{]+)/);
        if (!C) return null;
        let k = Oe(C[1]);
        if (!y()) return T("@media missing '{'");
        let V = K().concat(w());
        return M()
          ? x({ type: 10, media: k, rules: V })
          : T("@media missing '}'");
      },
      ne = () => {
        let x = h(),
          C = R(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
        return C ? x({ type: 2, name: Oe(C[1]), media: Oe(C[2]) }) : null;
      },
      an = () => {
        let x = h();
        if (!R(/^@page */)) return null;
        let k = ze() || [];
        if (!y()) return T("@page missing '{'");
        let V = K(),
          ie;
        for (; (ie = Z()); ) V.push(ie), (V = V.concat(K()));
        return M()
          ? x({ type: 12, selectors: k, declarations: V })
          : T("@page missing '}'");
      },
      W = () => {
        let x = h(),
          C = R(/^@([-\w]+)?document *([^{]+)/);
        if (!C) return null;
        let k = Oe(C[1]),
          V = Oe(C[2]);
        if (!y()) return T("@document missing '{'");
        let ie = K().concat(w());
        return M()
          ? x({ type: 3, document: V, vendor: k, rules: ie })
          : T("@document missing '}'");
      },
      ft = () => {
        let x = h();
        if (!R(/^@font-face\s*/)) return null;
        if (!y()) return T("@font-face missing '{'");
        let k = K(),
          V;
        for (; (V = Z()); ) k.push(V), (k = k.concat(K()));
        return M()
          ? x({ type: 5, declarations: k })
          : T("@font-face missing '}'");
      },
      Ee = (x, C) => {
        let k = new RegExp("^@" + x + "\\s*([^;]+);");
        return () => {
          let V = h(),
            ie = R(k);
          if (!ie) return null;
          let _e = { type: C };
          return (_e[x] = ie[1].trim()), V(_e);
        };
      },
      je = Ee("import", 7),
      ye = Ee("charset", 0),
      on = Ee("namespace", 11),
      cn = () =>
        t[0] !== "@"
          ? null
          : I() ||
            bs() ||
            ne() ||
            sr() ||
            je() ||
            ye() ||
            on() ||
            W() ||
            an() ||
            un() ||
            ft(),
      _s = () => {
        let x = h(),
          C = ze();
        return C
          ? (K(), x({ type: 13, selectors: C, declarations: nr() }))
          : T("selector missing");
      };
    class mt {
      constructor(C) {
        (this.start = C),
          (this.end = { line: r, column: n }),
          (this.source = e);
      }
    }
    return (mt.prototype.content = t), { diagnostics: u, ...ls(A()) };
  },
  Oe = (t) => (t ? t.trim() : ""),
  ls = (t, e) => {
    let r = t && typeof t.type == "string",
      n = r ? t : e;
    for (let u in t) {
      let o = t[u];
      Array.isArray(o)
        ? o.forEach(function (h) {
            ls(h, n);
          })
        : o && typeof o == "object" && ls(o, n);
    }
    return (
      r &&
        Object.defineProperty(t, "parent", {
          configurable: !0,
          writable: !0,
          enumerable: !1,
          value: e || null,
        }),
      t
    );
  },
  zu = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
var Gu = (t) => {
    (me.all.length =
      me.tags.length =
      me.classNames.length =
      me.ids.length =
      me.attrs.length =
        0),
      (t = t
        .replace(/\./g, " .")
        .replace(/\#/g, " #")
        .replace(/\[/g, " [")
        .replace(/\>/g, " > ")
        .replace(/\+/g, " + ")
        .replace(/\~/g, " ~ ")
        .replace(/\*/g, " * ")
        .replace(/\:not\((.*?)\)/g, " "));
    let e = t.split(" ");
    for (let r = 0, n = e.length; r < n; r++)
      (e[r] = e[r].split(":")[0]),
        e[r].length !== 0 &&
          (e[r].charAt(0) === "."
            ? me.classNames.push(e[r].slice(1))
            : e[r].charAt(0) === "#"
              ? me.ids.push(e[r].slice(1))
              : e[r].charAt(0) === "["
                ? ((e[r] = e[r].slice(1).split("=")[0].split("]")[0].trim()),
                  me.attrs.push(e[r].toLowerCase()))
                : /[a-z]/g.test(e[r].charAt(0)) &&
                  me.tags.push(e[r].toLowerCase()));
    return (
      (me.classNames = me.classNames.sort((r, n) =>
        r.length < n.length ? -1 : r.length > n.length ? 1 : 0,
      )),
      me
    );
  },
  me = { all: [], tags: [], classNames: [], ids: [], attrs: [] };
var $u = (t, e) => {
    let r = e.usedSelectors || null,
      n = {
        usedSelectors: r || null,
        hasUsedAttrs: !!r && r.attrs.size > 0,
        hasUsedClassNames: !!r && r.classNames.size > 0,
        hasUsedIds: !!r && r.ids.size > 0,
        hasUsedTags: !!r && r.tags.size > 0,
      },
      u = t.rules;
    if (!u) return "";
    let o = u.length,
      h = [];
    for (let T = 0; T < o; T++) h.push(Ju(n, u[T], T, o));
    return h.join("");
  },
  Ju = (t, e, r, n) => {
    var o;
    let u = e.type;
    return u === 4
      ? kc(e, r, n)
      : u === 13
        ? Pc(t, e)
        : u === 1
          ? ((o = e.comment) == null ? void 0 : o[0]) === "!"
            ? `/*${e.comment}*/`
            : ""
          : u === 10
            ? Hc(t, e)
            : u === 8
              ? wc(t, e)
              : u === 9
                ? Bc(t, e)
                : u === 5
                  ? Uc(t, e)
                  : u === 15
                    ? vc(t, e)
                    : u === 7
                      ? "@import " + e.import + ";"
                      : u === 0
                        ? "@charset " + e.charset + ";"
                        : u === 12
                          ? Fc(t, e)
                          : u === 6
                            ? "@host{" + De(t, e.rules) + "}"
                            : u === 2
                              ? "@custom-media " + e.name + " " + e.media + ";"
                              : u === 3
                                ? Wc(t, e)
                                : u === 11
                                  ? "@namespace " + e.namespace + ";"
                                  : "";
  },
  Pc = (t, e) => {
    var T, A;
    let r = e.declarations,
      n = t.usedSelectors,
      u = (A = (T = e.selectors) == null ? void 0 : T.slice()) != null ? A : [];
    if (r == null || r.length === 0) return "";
    if (n) {
      let y,
        M,
        R = !0;
      for (y = u.length - 1; y >= 0; y--) {
        let w = Gu(u[y]);
        R = !0;
        let Y = w.classNames.length;
        if (Y > 0 && t.hasUsedClassNames) {
          for (M = 0; M < Y; M++)
            if (!n.classNames.has(w.classNames[M])) {
              R = !1;
              break;
            }
        }
        if (R && t.hasUsedTags && ((Y = w.tags.length), Y > 0)) {
          for (M = 0; M < Y; M++)
            if (!n.tags.has(w.tags[M])) {
              R = !1;
              break;
            }
        }
        if (R && t.hasUsedAttrs && ((Y = w.attrs.length), Y > 0)) {
          for (M = 0; M < Y; M++)
            if (!n.attrs.has(w.attrs[M])) {
              R = !1;
              break;
            }
        }
        if (R && t.hasUsedIds && ((Y = w.ids.length), Y > 0)) {
          for (M = 0; M < Y; M++)
            if (!n.ids.has(w.ids[M])) {
              R = !1;
              break;
            }
        }
        R || u.splice(y, 1);
      }
    }
    if (u.length === 0) return "";
    let o = [],
      h = "";
    if (e.selectors)
      for (let y of e.selectors) (h = Yc(y)), o.includes(h) || o.push(h);
    return `${o}{${De(t, r)}}`;
  },
  kc = (t, e, r) =>
    t.value === ""
      ? ""
      : r - 1 === e
        ? t.property + ":" + t.value
        : t.property + ":" + t.value + ";",
  Hc = (t, e) => {
    let r = De(t, e.rules);
    return r === "" ? "" : "@media " + Vc(e.media) + "{" + r + "}";
  },
  wc = (t, e) => {
    let r = De(t, e.keyframes);
    return r === ""
      ? ""
      : "@" + (e.vendor || "") + "keyframes " + e.name + "{" + r + "}";
  },
  Bc = (t, e) => {
    var r, n;
    return (
      ((n = (r = e.values) == null ? void 0 : r.join(",")) != null ? n : "") +
      "{" +
      De(t, e.declarations) +
      "}"
    );
  },
  Uc = (t, e) => {
    let r = De(t, e.declarations);
    return r === "" ? "" : "@font-face{" + r + "}";
  },
  vc = (t, e) => {
    let r = De(t, e.rules);
    return r === "" ? "" : "@supports " + e.supports + "{" + r + "}";
  },
  Fc = (t, e) => {
    var n, u;
    return (
      "@page " +
      ((u = (n = e.selectors) == null ? void 0 : n.join(", ")) != null
        ? u
        : "") +
      "{" +
      De(t, e.declarations) +
      "}"
    );
  },
  Wc = (t, e) => {
    let r = De(t, e.rules),
      n = "@" + (e.vendor || "") + "document " + e.document;
    return r === "" ? "" : n + "{" + r + "}";
  },
  De = (t, e) => {
    let r = "";
    if (e) for (let n = 0, u = e.length; n < u; n++) r += Ju(t, e[n], n, u);
    return r;
  },
  Yc = (t) => {
    let e = "",
      r = "",
      n = !1;
    t = t.trim();
    for (let u = 0, o = t.length; u < o; u++)
      if (
        ((r = t[u]),
        r === "[" && e[e.length - 1] !== "\\"
          ? (n = !0)
          : r === "]" && e[e.length - 1] !== "\\" && (n = !1),
        !n && ds.test(r))
      ) {
        if (qc.test(t[u + 1]) || Xc.test(e[e.length - 1])) continue;
        e += " ";
      } else e += r;
    return e;
  },
  Vc = (t) => {
    var n;
    let e = "",
      r = "";
    t = (n = t == null ? void 0 : t.trim()) != null ? n : "";
    for (let u = 0, o = t.length; u < o; u++)
      if (((r = t[u]), ds.test(r))) {
        if (ds.test(e[e.length - 1])) continue;
        e += " ";
      } else e += r;
    return e;
  },
  ds = /\s/,
  qc = /[>\(\)\~\,\+\s]/,
  Xc = /[>\(\~\,\+]/;
var Zu = (t) => {
    let e = {
      attrs: new Set(),
      classNames: new Set(),
      ids: new Set(),
      tags: new Set(),
    };
    return ea(e, t), e;
  },
  ea = (t, e) => {
    if (e != null && e.nodeType === 1) {
      let r = e.children,
        n = e.nodeName.toLowerCase();
      t.tags.add(n);
      let u = e.attributes;
      for (let o = 0, h = u.length; o < h; o++) {
        let T = u.item(o),
          A = T.name.toLowerCase();
        if ((t.attrs.add(A), A === "class")) {
          let y = e.classList;
          for (let M = 0, R = y.length; M < R; M++) t.classNames.add(y.item(M));
        } else A === "id" && t.ids.add(T.value);
      }
      if (r) for (let o = 0, h = r.length; o < h; o++) ea(t, r[o]);
    }
  };
var ta = (t, e) => {
    try {
      let r = t.head.querySelectorAll("style[data-styles]"),
        n = r.length;
      if (n > 0) {
        let u = Zu(t.documentElement);
        for (let o = 0; o < n; o++) Qc(u, e, r[o]);
      }
    } catch (r) {
      qu(e, r);
    }
  },
  Qc = (t, e, r) => {
    try {
      let n = ju(r.innerHTML);
      if ((e.push(...n.diagnostics), ht(e))) return;
      try {
        r.innerHTML = $u(n.stylesheet, { usedSelectors: t });
      } catch (u) {
        e.push({
          level: "warn",
          type: "css",
          header: "CSS Stringify",
          messageText: u,
          lines: [],
        });
      }
    } catch (n) {
      e.push({
        level: "warn",
        type: "css",
        header: "CSS Parse",
        messageText: n,
        lines: [],
      });
    }
  };
function hs(t, e, r) {
  let n = e.children;
  for (let u = 0, o = n.length; u < o; u++) {
    let h = n[u],
      T = h.nodeName.toLowerCase();
    if (T.includes("-")) {
      let A = t.components.find((y) => y.tag === T);
      A != null && (A.count++, r > A.depth && (A.depth = r));
    } else
      switch (T) {
        case "a":
          let A = en(h);
          (A.href = h.href),
            typeof A.href == "string" &&
              (t.anchors.some((w) => w.href === A.href) || t.anchors.push(A));
          break;
        case "img":
          let y = en(h);
          (y.src = h.src),
            typeof y.src == "string" &&
              (t.imgs.some((w) => w.src === y.src) || t.imgs.push(y));
          break;
        case "link":
          let M = en(h);
          (M.href = h.href),
            typeof M.rel == "string" &&
              M.rel.toLowerCase() === "stylesheet" &&
              typeof M.href == "string" &&
              (t.styles.some((w) => w.link === M.href) ||
                (delete M.rel, delete M.type, t.styles.push(M)));
          break;
        case "script":
          let R = en(h);
          if (h.hasAttribute("src"))
            (R.src = h.src),
              typeof R.src == "string" &&
                (t.scripts.some((w) => w.src === R.src) || t.scripts.push(R));
          else {
            let w = h.getAttribute("data-stencil-static");
            w &&
              t.staticData.push({
                id: w,
                type: h.getAttribute("type"),
                content: h.textContent,
              });
          }
          break;
      }
    r++, hs(t, h, r);
  }
}
function en(t) {
  let e = {},
    r = t.attributes;
  for (let n = 0, u = r.length; n < u; n++) {
    let o = r.item(n),
      h = o.nodeName.toLowerCase();
    if (Kc.has(h)) continue;
    let T = o.nodeValue;
    (h === "class" && T === "") || (e[h] = T);
  }
  return e;
}
var Kc = new Set(["s-id", "c-id"]);
function fs(t, e) {
  let r;
  if (
    (t.defaultView != null
      ? ((e.destroyWindow = !0), ns(t.defaultView), (r = t.defaultView))
      : ((e.destroyWindow = !0), (e.destroyDocument = !1), (r = new ue(!1))),
    r.document !== t && (r.document = t),
    t.defaultView !== r && (t.defaultView = r),
    typeof t.documentElement.constructor.prototype.getRootNode != "function")
  ) {
    let o = t.createElement("unknown-element").constructor.prototype;
    o.getRootNode = zc;
  }
  if (typeof t.createEvent == "function") {
    let u = t.createEvent("CustomEvent").constructor;
    r.CustomEvent !== u && (r.CustomEvent = u);
  }
  try {
    r.__stencil_baseURI = t.baseURI;
  } catch {
    Object.defineProperty(t, "baseURI", {
      get() {
        let o = t.querySelector("base[href]");
        return o
          ? new URL(o.getAttribute("href"), r.location.href).href
          : r.location.href;
      },
    });
  }
  return r;
}
function zc(t) {
  let e = t != null && t.composed === !0,
    r = this;
  for (; r.parentNode != null; )
    (r = r.parentNode),
      e === !0 && r.parentNode == null && r.host != null && (r = r.host);
  return r;
}
function ms(t) {
  let e = Object.assign(
    { serializeToHtml: !1, destroyWindow: !1, destroyDocument: !1 },
    t || {},
  );
  return (
    typeof e.clientHydrateAnnotations != "boolean" &&
      (e.clientHydrateAnnotations = !0),
    typeof e.constrainTimeouts != "boolean" && (e.constrainTimeouts = !0),
    typeof e.maxHydrateCount != "number" && (e.maxHydrateCount = 300),
    typeof e.runtimeLogging != "boolean" && (e.runtimeLogging = !1),
    typeof e.timeout != "number" && (e.timeout = 15e3),
    Array.isArray(e.excludeComponents)
      ? (e.excludeComponents = e.excludeComponents.filter(ra).map(na))
      : (e.excludeComponents = []),
    Array.isArray(e.staticComponents)
      ? (e.staticComponents = e.staticComponents.filter(ra).map(na))
      : (e.staticComponents = []),
    e
  );
}
function ra(t) {
  return typeof t == "string" && t.includes("-");
}
function na(t) {
  return t.trim().toLowerCase();
}
function Es(t) {
  typeof t.url != "string" && (t.url = "https://hydrate.stenciljs.com/"),
    typeof t.buildId != "string" && (t.buildId = jc());
  let e = {
    buildId: t.buildId,
    diagnostics: [],
    url: t.url,
    host: null,
    hostname: null,
    href: null,
    pathname: null,
    port: null,
    search: null,
    hash: null,
    html: null,
    httpStatus: null,
    hydratedCount: 0,
    anchors: [],
    components: [],
    imgs: [],
    scripts: [],
    staticData: [],
    styles: [],
    title: null,
  };
  try {
    let r = new URL(t.url, "https://hydrate.stenciljs.com/");
    (e.url = r.href),
      (e.host = r.host),
      (e.hostname = r.hostname),
      (e.href = r.href),
      (e.port = r.port),
      (e.pathname = r.pathname),
      (e.search = r.search),
      (e.hash = r.hash);
  } catch (r) {
    $(e, r);
  }
  return e;
}
var jc = () => {
  let t = "abcdefghijklmnopqrstuvwxyz",
    e = "";
  for (; e.length < 8; ) {
    let r = t[Math.floor(Math.random() * t.length)];
    (e += r), e.length === 1 && (t += "0123456789");
  }
  return e;
};
function Ts(t, e, r, n) {
  let u = {
    level: e,
    type: "build",
    header: r,
    messageText: n,
    relFilePath: void 0,
    absFilePath: void 0,
    lines: [],
  };
  return (
    t.pathname
      ? t.pathname !== "/" && (u.header += ": " + t.pathname)
      : t.url && (u.header += ": " + t.url),
    t.diagnostics.push(u),
    u
  );
}
function tn(t, e) {
  return Ts(t, "error", "Hydrate Error", e);
}
function $(t, e) {
  let r = tn(t, null);
  return (
    e != null &&
      (e.stack != null
        ? (r.messageText = e.stack.toString())
        : e.message != null
          ? (r.messageText = e.message.toString())
          : (r.messageText = e.toString())),
    r
  );
}
function sa(t, e, r) {
  try {
    let n = t.location.pathname;
    (t.console.error = (...u) => {
      let o = u
        .reduce((h, T) => {
          if (T) {
            if (T.stack != null) return h + " " + String(T.stack);
            if (T.message != null) return h + " " + String(T.message);
          }
          return String(T);
        }, "")
        .trim();
      o !== "" && ($(r, o), e.runtimeLogging && ps(n, "error", [o]));
    }),
      (t.console.debug = (...u) => {
        Ts(r, "debug", "Hydrate Debug", [...u].join(", ")),
          e.runtimeLogging && ps(n, "debug", u);
      }),
      e.runtimeLogging &&
        ["log", "warn", "assert", "info", "trace"].forEach((u) => {
          t.console[u] = (...o) => {
            ps(n, u, o);
          };
        });
  } catch (n) {
    $(r, n);
  }
}
function ps(t, e, r) {
  global.console[e].apply(global.console, [`[ ${t}  ${e} ] `, ...r]);
}
function ua(t, e, r, n) {
  try {
    t.location.href = r.url;
  } catch (u) {
    $(n, u);
  }
  if (typeof r.userAgent == "string")
    try {
      t.navigator.userAgent = r.userAgent;
    } catch {}
  if (typeof r.cookie == "string")
    try {
      e.cookie = r.cookie;
    } catch {}
  if (typeof r.referrer == "string")
    try {
      e.referrer = r.referrer;
    } catch {}
  if (typeof r.direction == "string")
    try {
      e.documentElement.setAttribute("dir", r.direction);
    } catch {}
  if (typeof r.language == "string")
    try {
      e.documentElement.setAttribute("lang", r.language);
    } catch {}
  if (typeof r.buildId == "string")
    try {
      e.documentElement.setAttribute("data-stencil-build", r.buildId);
    } catch {}
  try {
    t.customElements = null;
  } catch {}
  return r.constrainTimeouts && us(t), sa(t, r, n), t;
}
function Gc(t, e) {
  let r = ms(e);
  return (
    (r.serializeToHtml = !0),
    new Promise((n) => {
      let u,
        o = Es(r);
      if (ht(o.diagnostics)) n(o);
      else if (typeof t == "string")
        try {
          (r.destroyWindow = !0),
            (r.destroyDocument = !0),
            (u = new ue(t)),
            rn(u, r, o, n);
        } catch (h) {
          u && u.close && u.close(), (u = null), $(o, h), n(o);
        }
      else if (ia(t))
        try {
          (r.destroyDocument = !1), (u = fs(t, r)), rn(u, r, o, n);
        } catch (h) {
          u && u.close && u.close(), (u = null), $(o, h), n(o);
        }
      else
        tn(
          o,
          'Invalid html or document. Must be either a valid "html" string, or DOM "document".',
        ),
          n(o);
    })
  );
}
function $c(t, e) {
  let r = ms(e);
  return (
    (r.serializeToHtml = !1),
    new Promise((n) => {
      let u,
        o = Es(r);
      if (ht(o.diagnostics)) n(o);
      else if (typeof t == "string")
        try {
          (r.destroyWindow = !0),
            (r.destroyDocument = !0),
            (u = new ue(t)),
            rn(u, r, o, n);
        } catch (h) {
          u && u.close && u.close(), (u = null), $(o, h), n(o);
        }
      else if (ia(t))
        try {
          (r.destroyDocument = !1), (u = fs(t, r)), rn(u, r, o, n);
        } catch (h) {
          u && u.close && u.close(), (u = null), $(o, h), n(o);
        }
      else
        tn(
          o,
          'Invalid html or document. Must be either a valid "html" string, or DOM "document".',
        ),
          n(o);
    })
  );
}
function rn(t, e, r, n) {
  if (
    (process.__stencilErrors ||
      ((process.__stencilErrors = !0),
      process.on("unhandledRejection", (u) => {
        console.log("unhandledRejection", u);
      })),
    ua(t, t.document, e, r),
    typeof e.beforeHydrate == "function")
  )
    try {
      let u = e.beforeHydrate(t.document);
      is(u) ? u.then(() => {}) : void 0;
    } catch (u) {
      $(r, u), rr(t, t.document, e, r, n);
    }
}
function gs(t, e, r, n) {
  if (typeof e.afterHydrate == "function")
    try {
      let u = e.afterHydrate(t.document);
      is(u)
        ? u.then(() => {
            rr(t, t.document, e, r, n);
          })
        : rr(t, t.document, e, r, n);
    } catch (u) {
      $(r, u), rr(t, t.document, e, r, n);
    }
  else rr(t, t.document, e, r, n);
}
function rr(t, e, r, n, u) {
  try {
    if ((hs(n, e.documentElement, 0), r.removeUnusedStyles !== !1))
      try {
        ta(e, n.diagnostics);
      } catch (o) {
        $(n, o);
      }
    if (typeof r.title == "string")
      try {
        e.title = r.title;
      } catch (o) {
        $(n, o);
      }
    (n.title = e.title), r.removeScripts && oa(e.documentElement);
    try {
      Qu(e, r.canonicalUrl);
    } catch (o) {
      $(n, o);
    }
    try {
      Ku(e);
    } catch {}
    ht(n.diagnostics) || (n.httpStatus = 200);
    try {
      let o = e.head.querySelector('meta[http-equiv="status"]');
      if (o != null) {
        let h = o.getAttribute("content");
        h && h.length > 0 && (n.httpStatus = parseInt(h, 10));
      }
    } catch {}
    r.clientHydrateAnnotations && e.documentElement.classList.add("hydrated"),
      r.serializeToHtml && (n.html = aa(e, r));
  } catch (o) {
    $(n, o);
  }
  if (r.destroyWindow)
    try {
      r.destroyDocument || ((t.document = null), (e.defaultView = null)),
        t.close && t.close();
    } catch (o) {
      $(n, o);
    }
  u(n);
}
function aa(t, e) {
  return Qe(t, {
    approximateLineWidth: e.approximateLineWidth,
    outerHtml: !1,
    prettyHtml: e.prettyHtml,
    removeAttributeQuotes: e.removeAttributeQuotes,
    removeBooleanAttributeQuotes: e.removeBooleanAttributeQuotes,
    removeEmptyAttributes: e.removeEmptyAttributes,
    removeHtmlComments: e.removeHtmlComments,
    serializeShadowRoot: !1,
  });
}
function ia(t) {
  return (
    t != null &&
    t.nodeType === 9 &&
    t.documentElement != null &&
    t.documentElement.nodeType === 1 &&
    t.body != null &&
    t.body.nodeType === 1
  );
}
function oa(t) {
  let e = t.children;
  for (let r = e.length - 1; r >= 0; r--) {
    let n = e[r];
    oa(n),
      (n.nodeName === "SCRIPT" ||
        (n.nodeName === "LINK" && n.getAttribute("rel") === "modulepreload")) &&
        n.remove();
  }
}
export {
  Ic as createWindowFromHtml,
  $c as hydrateDocument,
  Gc as renderToString,
  aa as serializeDocumentToString,
};
