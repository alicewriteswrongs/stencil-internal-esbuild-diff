/*
 Stencil Hydrate Runner v4.12.0-dev.1706552484.8760468 | MIT Licensed | https://stenciljs.com
 */
var La = Object.defineProperty;
var cr = (t, e) => {
  for (var r in e) La(t, r, { get: e[r], enumerable: !0 });
};
var Ls = "r",
  Os = "o",
  Ds = "s",
  Ms = "t";
var lr = "http://www.w3.org/1999/xlink";
var Oa = {
    get(t, e) {
      if (e in t) return t[e];
      if (typeof e != "symbol" && !isNaN(e)) return t.__items[e];
    },
  },
  pn = (t) => new Proxy(new pt(t), Oa),
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
        (e = Ps(e)),
        this.__items.find((n) => n.name === r && Ps(n.namespaceURI) === e) ||
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
function Ps(t) {
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
      u.sort(Da).forEach((o) => {
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
function Da(t, e) {
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
      (u = String(u)), ks(u), r.includes(u) === !1 && (r.push(u), (n = !0));
    }),
      n && this.elm.setAttributeNS(null, "class", r.join(" "));
  }
  remove(...e) {
    let r = Ze(this.elm),
      n = !1;
    e.forEach((u) => {
      (u = String(u)), ks(u);
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
function ks(t) {
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
  return new Proxy(new gn(), Ma);
}
var Ma = {
  get(t, e) {
    return e in t ? t[e] : ((e = Pa(e)), t.getPropertyValue(e));
  },
  set(t, e, r) {
    return e in t ? (t[e] = r) : t.setProperty(e, r), !0;
  },
};
function Pa(t) {
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
        if (Hs.has(h) === !1) {
          mr.add(u);
          let T = _n(this, u, e);
          for (let A = 0; A < h.childNodes.length; A++) {
            let y = h.childNodes[A];
            y.remove(), T.appendChild(y);
          }
          mr.delete(u), et.has(h) && et.set(h, T);
        }
        ws(h);
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
    return (h.nodeName = r.toUpperCase()), Hs.add(h), h;
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
  Hs = new WeakSet();
function gt(t, e) {
  if (((e.ownerDocument = t), e.nodeType === 1)) {
    if (t != null && e.nodeName.includes("-")) {
      t.defaultView != null &&
        typeof e.connectedCallback == "function" &&
        e.isConnected &&
        ws(e);
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
function ws(t) {
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
function Bs(t) {
  let e = {},
    r = t.attributes,
    n = r.length;
  for (let u = 0; u < n; u++) {
    let o = r.item(u),
      h = o.nodeName;
    h.startsWith("data-") && (e[Ha(h)] = o.nodeValue);
  }
  return new Proxy(e, {
    get(u, o) {
      return e[o];
    },
    set(u, o, h) {
      let T = ka(o);
      return t.setAttribute(T, h), !0;
    },
  });
}
function ka(t) {
  return (
    "data-" +
    String(t)
      .replace(/([A-Z0-9])/g, (e) => " " + e[0])
      .trim()
      .replace(/ /g, "-")
      .toLowerCase()
  );
}
function Ha(t) {
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
var wa = new Set([
    65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678,
    327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823,
    655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502,
    917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111,
  ]),
  q = "\uFFFD",
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
function Us(t) {
  return t >= 56320 && t <= 57343;
}
function vs(t, e) {
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
  return (t >= 64976 && t <= 65007) || wa.has(t);
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
var Ua = 65536,
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
        (this.bufferWaterline = Ua),
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
        if (Us(r)) return this.pos++, this._addGap(), vs(e, r);
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
  '\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'
    .split("")
    .map((t) => t.charCodeAt(0)),
);
var Fs = new Uint16Array(
  "\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022"
    .split("")
    .map((t) => t.charCodeAt(0)),
);
var yn,
  va = new Map([
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
    : (e = va.get(t)) !== null && e !== void 0
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
var Fa = 32,
  pe;
(function (t) {
  (t[(t.VALUE_LENGTH = 49152)] = "VALUE_LENGTH"),
    (t[(t.BRANCH_LENGTH = 16256)] = "BRANCH_LENGTH"),
    (t[(t.JUMP_TABLE = 127)] = "JUMP_TABLE");
})(pe || (pe = {}));
function Ln(t) {
  return t >= j.ZERO && t <= j.NINE;
}
function Wa(t) {
  return (
    (t >= j.UPPER_A && t <= j.UPPER_F) || (t >= j.LOWER_A && t <= j.LOWER_F)
  );
}
function Ya(t) {
  return (
    (t >= j.UPPER_A && t <= j.UPPER_Z) ||
    (t >= j.LOWER_A && t <= j.LOWER_Z) ||
    Ln(t)
  );
}
function Va(t) {
  return t === j.EQUALS || Ya(t);
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
      : (e.charCodeAt(r) | Fa) === j.LOWER_X
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
      if (Ln(u) || Wa(u)) r += 1;
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
          (this.decodeMode === Ve.Attribute && (o === 0 || Va(h)))
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
function Ws(t) {
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
var Al = Ws(Ne),
  Cl = Ws(Fs);
var Pn = {};
cr(Pn, {
  ATTRS: () => ge,
  DOCUMENT_MODE: () => J,
  NS: () => p,
  SPECIAL_ELEMENTS: () => Mn,
  TAG_ID: () => s,
  TAG_NAMES: () => m,
  getTagID: () => He,
  hasUnescapedText: () => Ys,
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
var qa = new Map([
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
  return (e = qa.get(t)) !== null && e !== void 0 ? e : s.UNKNOWN;
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
var Xa = new Set([
  m.STYLE,
  m.SCRIPT,
  m.XMP,
  m.IFRAME,
  m.NOEMBED,
  m.NOFRAMES,
  m.PLAINTEXT,
]);
function Ys(t, e) {
  return Xa.has(t) || (e && t === m.NOSCRIPT);
}
var Qa = new Map([
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
function Ka(t) {
  return t >= i.LATIN_SMALL_A && t <= i.LATIN_SMALL_Z;
}
function we(t) {
  return Ka(t) || yt(t);
}
function kn(t) {
  return we(t) || Rt(t);
}
function qs(t) {
  return t >= i.LATIN_CAPITAL_A && t <= i.LATIN_CAPITAL_F;
}
function Xs(t) {
  return t >= i.LATIN_SMALL_A && t <= i.LATIN_SMALL_F;
}
function za(t) {
  return Rt(t) || qs(t) || Xs(t);
}
function Ar(t) {
  return t + 32;
}
function Qs(t) {
  return (
    t === i.SPACE ||
    t === i.LINE_FEED ||
    t === i.TABULATION ||
    t === i.FORM_FEED
  );
}
function ja(t) {
  return t === i.EQUALS_SIGN || kn(t);
}
function Vs(t) {
  return Qs(t) || t === i.SOLIDUS || t === i.GREATER_THAN_SIGN;
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
    let r = Qs(e)
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
          ja(this.preprocessor.peek(1))
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
      Vs(this.preprocessor.peek(se.SCRIPT.length))
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
      Vs(this.preprocessor.peek(se.SCRIPT.length))
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
    za(e)
      ? ((this.state = c.HEXADEMICAL_CHARACTER_REFERENCE),
        this._stateHexademicalCharacterReference(e))
      : (this._err(E.absenceOfDigitsInNumericCharacterReference),
        this._flushCodePointConsumedAsCharacterReference(i.AMPERSAND),
        this._flushCodePointConsumedAsCharacterReference(i.NUMBER_SIGN),
        this._unconsume(2),
        (this.state = this.returnState));
  }
  _stateHexademicalCharacterReference(e) {
    qs(e)
      ? (this.charRefCode = this.charRefCode * 16 + e - 55)
      : Xs(e)
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
      let r = Qa.get(this.charRefCode);
      r !== void 0 && (this.charRefCode = r);
    }
    this._flushCodePointConsumedAsCharacterReference(this.charRefCode),
      this._reconsumeInState(this.returnState, e);
  }
};
var zs = new Set([
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
  Ks = new Set([
    ...zs,
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
  Ga = [s.H1, s.H2, s.H3, s.H4, s.H5, s.H6],
  $a = [s.TR, s.TEMPLATE, s.HTML],
  Ja = [s.TBODY, s.TFOOT, s.THEAD, s.TEMPLATE, s.HTML],
  Za = [s.TABLE, s.TEMPLATE, s.HTML],
  ei = [s.TD, s.TH],
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
      do r = this.tagIDs.lastIndexOf(e, r - 1);
      while (
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
      this.popUntilPopped(Ga, p.HTML);
    }
    popUntilTableCellPopped() {
      this.popUntilPopped(ei, p.HTML);
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
      this.clearBackTo(Za, p.HTML);
    }
    clearBackToTableBodyContext() {
      this.clearBackTo(Ja, p.HTML);
    }
    clearBackToTableRowContext() {
      this.clearBackTo($a, p.HTML);
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
      for (; zs.has(this.currentTagId); ) this.pop();
    }
    generateImpliedEndTagsThoroughly() {
      for (; Ks.has(this.currentTagId); ) this.pop();
    }
    generateImpliedEndTagsWithExclusion(e) {
      for (; this.currentTagId !== e && Ks.has(this.currentTagId); ) this.pop();
    }
  };
var he;
(function (t) {
  (t[(t.Marker = 0)] = "Marker"), (t[(t.Element = 1)] = "Element");
})((he = he || (he = {})));
var js = { type: he.Marker },
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
      this.entries.unshift(js);
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
      let e = this.entries.indexOf(js);
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
function Gs(t) {
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
    Le.appendChild(t, Gs(e));
  },
  insertTextBefore(t, e, r) {
    let n = t.childNodes[t.childNodes.indexOf(r) - 1];
    n && Le.isTextNode(n) ? (n.value += e) : Le.insertBefore(t, Gs(e), r);
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
var Js = "html",
  ti = "about:legacy-compat",
  ri = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd",
  Zs = [
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
  ni = [
    ...Zs,
    "-//w3c//dtd html 4.01 frameset//",
    "-//w3c//dtd html 4.01 transitional//",
  ],
  si = new Set([
    "-//w3o//dtd w3 html strict 3.0//en//",
    "-/w3c/dtd html 4.0 transitional/en",
    "html",
  ]),
  eu = [
    "-//w3c//dtd xhtml 1.0 frameset//",
    "-//w3c//dtd xhtml 1.0 transitional//",
  ],
  ui = [
    ...eu,
    "-//w3c//dtd html 4.01 frameset//",
    "-//w3c//dtd html 4.01 transitional//",
  ];
function $s(t, e) {
  return e.some((r) => t.startsWith(r));
}
function tu(t) {
  return (
    t.name === Js &&
    t.publicId === null &&
    (t.systemId === null || t.systemId === ti)
  );
}
function ru(t) {
  if (t.name !== Js) return J.QUIRKS;
  let { systemId: e } = t;
  if (e && e.toLowerCase() === ri) return J.QUIRKS;
  let { publicId: r } = t;
  if (r !== null) {
    if (((r = r.toLowerCase()), si.has(r))) return J.QUIRKS;
    let n = e === null ? ni : Zs;
    if ($s(r, n)) return J.QUIRKS;
    if (((n = e === null ? eu : ui), $s(r, n))) return J.LIMITED_QUIRKS;
  }
  return J.NO_QUIRKS;
}
var Rr = {};
cr(Rr, {
  SVG_TAG_NAMES_ADJUSTMENT_MAP: () => su,
  adjustTokenMathMLAttrs: () => Sr,
  adjustTokenSVGAttrs: () => yr,
  adjustTokenSVGTagName: () => wn,
  adjustTokenXMLAttrs: () => Lt,
  causesExit: () => Hn,
  isIntegrationPoint: () => Bn,
});
var nu = { TEXT_HTML: "text/html", APPLICATION_XML: "application/xhtml+xml" },
  ii = "definitionurl",
  oi = "definitionURL",
  ci = new Map(
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
  li = new Map([
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
  su = new Map(
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
  di = new Set([
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
    di.has(e)
  );
}
function Sr(t) {
  for (let e = 0; e < t.attrs.length; e++)
    if (t.attrs[e].name === ii) {
      t.attrs[e].name = oi;
      break;
    }
}
function yr(t) {
  for (let e = 0; e < t.attrs.length; e++) {
    let r = ci.get(t.attrs[e].name);
    r != null && (t.attrs[e].name = r);
  }
}
function Lt(t) {
  for (let e = 0; e < t.attrs.length; e++) {
    let r = li.get(t.attrs[e].name);
    r &&
      ((t.attrs[e].prefix = r.prefix),
      (t.attrs[e].name = r.name),
      (t.attrs[e].namespace = r.namespace));
  }
}
function wn(t) {
  let e = su.get(t.tagName);
  e != null && ((t.tagName = e), (t.tagID = He(t.tagName)));
}
function hi(t, e) {
  return (
    e === p.MATHML &&
    (t === s.MI || t === s.MO || t === s.MN || t === s.MS || t === s.MTEXT)
  );
}
function fi(t, e, r) {
  if (e === p.MATHML && t === s.ANNOTATION_XML) {
    for (let n = 0; n < r.length; n++)
      if (r[n].name === ge.ENCODING) {
        let u = r[n].value.toLowerCase();
        return u === nu.TEXT_HTML || u === nu.APPLICATION_XML;
      }
  }
  return (
    e === p.SVG && (t === s.FOREIGN_OBJECT || t === s.DESC || t === s.TITLE)
  );
}
function Bn(t, e, r, n) {
  return (
    ((!n || n === p.HTML) && fi(t, e, r)) ||
    ((!n || n === p.MATHML) && hi(t, e))
  );
}
var mi = "hidden",
  Ei = 8,
  Ti = 3,
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
var pi = {
    startLine: -1,
    startCol: -1,
    startOffset: -1,
    endLine: -1,
    endCol: -1,
    endOffset: -1,
  },
  ou = new Set([s.TABLE, s.TBODY, s.TFOOT, s.THEAD, s.TR]),
  uu = {
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
        (this.options = { ...uu, ...e }),
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
      let n = { ...uu, ...r };
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
      let o = (u = e.location) !== null && u !== void 0 ? u : pi,
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
      return ou.has(e);
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
        case d.IN_BODY:
        case d.IN_CAPTION:
        case d.IN_CELL:
        case d.IN_TEMPLATE: {
          lu(this, e);
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
          Tu(this, e);
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
        Ko(this, e);
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
          Ii(this, e);
          break;
        }
        case d.AFTER_AFTER_BODY:
        case d.AFTER_AFTER_FRAMESET: {
          Si(this, e);
          break;
        }
        default:
      }
    }
    onDoctype(e) {
      switch (((this.skipNextNewLine = !1), this.insertionMode)) {
        case d.INITIAL: {
          yi(this, e);
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
        ? jo(this, e)
        : this._startTagOutsideForeignContent(e);
    }
    _startTagOutsideForeignContent(e) {
      switch (this.insertionMode) {
        case d.INITIAL: {
          Ot(this, e);
          break;
        }
        case d.BEFORE_HTML: {
          Ri(this, e);
          break;
        }
        case d.BEFORE_HEAD: {
          Li(this, e);
          break;
        }
        case d.IN_HEAD: {
          be(this, e);
          break;
        }
        case d.IN_HEAD_NO_SCRIPT: {
          Mi(this, e);
          break;
        }
        case d.AFTER_HEAD: {
          ki(this, e);
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
          Do(this, e);
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
          ko(this, e);
          break;
        }
        case d.IN_SELECT: {
          bu(this, e);
          break;
        }
        case d.IN_SELECT_IN_TABLE: {
          wo(this, e);
          break;
        }
        case d.IN_TEMPLATE: {
          Uo(this, e);
          break;
        }
        case d.AFTER_BODY: {
          Fo(this, e);
          break;
        }
        case d.IN_FRAMESET: {
          Wo(this, e);
          break;
        }
        case d.AFTER_FRAMESET: {
          Vo(this, e);
          break;
        }
        case d.AFTER_AFTER_BODY: {
          Xo(this, e);
          break;
        }
        case d.AFTER_AFTER_FRAMESET: {
          Qo(this, e);
          break;
        }
        default:
      }
    }
    onEndTag(e) {
      (this.skipNextNewLine = !1),
        (this.currentToken = e),
        this.currentNotInHTML
          ? Go(this, e)
          : this._endTagOutsideForeignContent(e);
    }
    _endTagOutsideForeignContent(e) {
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
          Di(this, e);
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
          Mr(this, e);
          break;
        }
        case d.TEXT: {
          Ao(this, e);
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
          Mo(this, e);
          break;
        }
        case d.IN_COLUMN_GROUP: {
          Po(this, e);
          break;
        }
        case d.IN_TABLE_BODY: {
          Fn(this, e);
          break;
        }
        case d.IN_ROW: {
          gu(this, e);
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
          Cu(this, e);
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
          mu(this, e);
          break;
        }
        case d.TEXT: {
          Co(this, e);
          break;
        }
        case d.IN_TABLE_TEXT: {
          Dt(this, e);
          break;
        }
        case d.IN_TEMPLATE: {
          Au(this, e);
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
          cu(this, e);
          break;
        }
        case d.IN_TABLE:
        case d.IN_TABLE_BODY:
        case d.IN_ROW: {
          Un(this, e);
          break;
        }
        case d.IN_TABLE_TEXT: {
          Eu(this, e);
          break;
        }
        default:
      }
    }
  };
function gi(t, e) {
  let r = t.activeFormattingElements.getElementEntryInScopeWithTagName(
    e.tagName,
  );
  return (
    r
      ? t.openElements.contains(r.element)
        ? t.openElements.hasInScope(e.tagID) || (r = null)
        : (t.activeFormattingElements.removeEntry(r), (r = null))
      : fu(t, e),
    r
  );
}
function bi(t, e) {
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
function _i(t, e, r) {
  let n = e,
    u = t.openElements.getCommonAncestor(e);
  for (let o = 0, h = u; h !== r; o++, h = u) {
    u = t.openElements.getCommonAncestor(h);
    let T = t.activeFormattingElements.getElementEntry(h),
      A = T && o >= Ti;
    !T || A
      ? (A && t.activeFormattingElements.removeEntry(T),
        t.openElements.remove(h))
      : ((h = Ai(t, T)),
        n === e && (t.activeFormattingElements.bookmark = T),
        t.treeAdapter.detachNode(n),
        t.treeAdapter.appendChild(h, n),
        (n = h));
  }
  return n;
}
function Ai(t, e) {
  let r = t.treeAdapter.getNamespaceURI(e.element),
    n = t.treeAdapter.createElement(e.token.tagName, r, e.token.attrs);
  return t.openElements.replace(e.element, n), (e.element = n), n;
}
function Ci(t, e, r) {
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
function Ni(t, e, r) {
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
  for (let r = 0; r < Ei; r++) {
    let n = gi(t, e);
    if (!n) break;
    let u = bi(t, n);
    if (!u) break;
    t.activeFormattingElements.bookmark = n;
    let o = _i(t, u, n.element),
      h = t.openElements.getCommonAncestor(n.element);
    t.treeAdapter.detachNode(o), h && Ci(t, h, o), Ni(t, u, n);
  }
}
function vn(t, e) {
  t._appendCommentNode(e, t.openElements.currentTmplContentOrNode);
}
function Ii(t, e) {
  t._appendCommentNode(e, t.openElements.items[0]);
}
function Si(t, e) {
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
function yi(t, e) {
  t._setDocumentType(e);
  let r = e.forceQuirks ? J.QUIRKS : ru(e);
  tu(e) || t._err(e, E.nonConformingDoctype),
    t.treeAdapter.setDocumentMode(t.document, r),
    (t.insertionMode = d.BEFORE_HTML);
}
function Ot(t, e) {
  t._err(e, E.missingDoctype, !0),
    t.treeAdapter.setDocumentMode(t.document, J.QUIRKS),
    (t.insertionMode = d.BEFORE_HTML),
    t._processToken(e);
}
function Ri(t, e) {
  e.tagID === s.HTML
    ? (t._insertElement(e, p.HTML), (t.insertionMode = d.BEFORE_HEAD))
    : Mt(t, e);
}
function xi(t, e) {
  let r = e.tagID;
  (r === s.HTML || r === s.HEAD || r === s.BODY || r === s.BR) && Mt(t, e);
}
function Mt(t, e) {
  t._insertFakeRootElement(),
    (t.insertionMode = d.BEFORE_HEAD),
    t._processToken(e);
}
function Li(t, e) {
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
function Oi(t, e) {
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
function Di(t, e) {
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
function Mi(t, e) {
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
function Pi(t, e) {
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
function ki(t, e) {
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
function Hi(t, e) {
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
      lu(t, e);
      break;
    }
    case B.WHITESPACE_CHARACTER: {
      cu(t, e);
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
      mu(t, e);
      break;
    }
    default:
  }
}
function cu(t, e) {
  t._reconstructActiveFormattingElements(), t._insertCharacters(e);
}
function lu(t, e) {
  t._reconstructActiveFormattingElements(),
    t._insertCharacters(e),
    (t.framesetOk = !1);
}
function wi(t, e) {
  t.openElements.tmplCount === 0 &&
    t.treeAdapter.adoptAttributes(t.openElements.items[0], e.attrs);
}
function Bi(t, e) {
  let r = t.openElements.tryPeekProperlyNestedBodyElement();
  r &&
    t.openElements.tmplCount === 0 &&
    ((t.framesetOk = !1), t.treeAdapter.adoptAttributes(r, e.attrs));
}
function Ui(t, e) {
  let r = t.openElements.tryPeekProperlyNestedBodyElement();
  t.framesetOk &&
    r &&
    (t.treeAdapter.detachNode(r),
    t.openElements.popAllUpToHtmlElement(),
    t._insertElement(e, p.HTML),
    (t.insertionMode = d.IN_FRAMESET));
}
function vi(t, e) {
  t.openElements.hasInButtonScope(s.P) && t._closePElement(),
    t._insertElement(e, p.HTML);
}
function Fi(t, e) {
  t.openElements.hasInButtonScope(s.P) && t._closePElement(),
    St(t.openElements.currentTagId) && t.openElements.pop(),
    t._insertElement(e, p.HTML);
}
function Wi(t, e) {
  t.openElements.hasInButtonScope(s.P) && t._closePElement(),
    t._insertElement(e, p.HTML),
    (t.skipNextNewLine = !0),
    (t.framesetOk = !1);
}
function Yi(t, e) {
  let r = t.openElements.tmplCount > 0;
  (!t.formElement || r) &&
    (t.openElements.hasInButtonScope(s.P) && t._closePElement(),
    t._insertElement(e, p.HTML),
    r || (t.formElement = t.openElements.current));
}
function Vi(t, e) {
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
function qi(t, e) {
  t.openElements.hasInButtonScope(s.P) && t._closePElement(),
    t._insertElement(e, p.HTML),
    (t.tokenizer.state = te.PLAINTEXT);
}
function Xi(t, e) {
  t.openElements.hasInScope(s.BUTTON) &&
    (t.openElements.generateImpliedEndTags(),
    t.openElements.popUntilTagNamePopped(s.BUTTON)),
    t._reconstructActiveFormattingElements(),
    t._insertElement(e, p.HTML),
    (t.framesetOk = !1);
}
function Qi(t, e) {
  let r = t.activeFormattingElements.getElementEntryInScopeWithTagName(m.A);
  r &&
    (Wn(t, e),
    t.openElements.remove(r.element),
    t.activeFormattingElements.removeEntry(r)),
    t._reconstructActiveFormattingElements(),
    t._insertElement(e, p.HTML),
    t.activeFormattingElements.pushElement(t.openElements.current, e);
}
function Ki(t, e) {
  t._reconstructActiveFormattingElements(),
    t._insertElement(e, p.HTML),
    t.activeFormattingElements.pushElement(t.openElements.current, e);
}
function zi(t, e) {
  t._reconstructActiveFormattingElements(),
    t.openElements.hasInScope(s.NOBR) &&
      (Wn(t, e), t._reconstructActiveFormattingElements()),
    t._insertElement(e, p.HTML),
    t.activeFormattingElements.pushElement(t.openElements.current, e);
}
function ji(t, e) {
  t._reconstructActiveFormattingElements(),
    t._insertElement(e, p.HTML),
    t.activeFormattingElements.insertMarker(),
    (t.framesetOk = !1);
}
function Gi(t, e) {
  t.treeAdapter.getDocumentMode(t.document) !== J.QUIRKS &&
    t.openElements.hasInButtonScope(s.P) &&
    t._closePElement(),
    t._insertElement(e, p.HTML),
    (t.framesetOk = !1),
    (t.insertionMode = d.IN_TABLE);
}
function du(t, e) {
  t._reconstructActiveFormattingElements(),
    t._appendElement(e, p.HTML),
    (t.framesetOk = !1),
    (e.ackSelfClosing = !0);
}
function hu(t) {
  let e = It(t, ge.TYPE);
  return e != null && e.toLowerCase() === mi;
}
function $i(t, e) {
  t._reconstructActiveFormattingElements(),
    t._appendElement(e, p.HTML),
    hu(e) || (t.framesetOk = !1),
    (e.ackSelfClosing = !0);
}
function Ji(t, e) {
  t._appendElement(e, p.HTML), (e.ackSelfClosing = !0);
}
function Zi(t, e) {
  t.openElements.hasInButtonScope(s.P) && t._closePElement(),
    t._appendElement(e, p.HTML),
    (t.framesetOk = !1),
    (e.ackSelfClosing = !0);
}
function eo(t, e) {
  (e.tagName = m.IMG), (e.tagID = s.IMG), du(t, e);
}
function to(t, e) {
  t._insertElement(e, p.HTML),
    (t.skipNextNewLine = !0),
    (t.tokenizer.state = te.RCDATA),
    (t.originalInsertionMode = t.insertionMode),
    (t.framesetOk = !1),
    (t.insertionMode = d.TEXT);
}
function ro(t, e) {
  t.openElements.hasInButtonScope(s.P) && t._closePElement(),
    t._reconstructActiveFormattingElements(),
    (t.framesetOk = !1),
    t._switchToTextParsing(e, te.RAWTEXT);
}
function no(t, e) {
  (t.framesetOk = !1), t._switchToTextParsing(e, te.RAWTEXT);
}
function au(t, e) {
  t._switchToTextParsing(e, te.RAWTEXT);
}
function so(t, e) {
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
function uo(t, e) {
  t.openElements.currentTagId === s.OPTION && t.openElements.pop(),
    t._reconstructActiveFormattingElements(),
    t._insertElement(e, p.HTML);
}
function ao(t, e) {
  t.openElements.hasInScope(s.RUBY) && t.openElements.generateImpliedEndTags(),
    t._insertElement(e, p.HTML);
}
function io(t, e) {
  t.openElements.hasInScope(s.RUBY) &&
    t.openElements.generateImpliedEndTagsWithExclusion(s.RTC),
    t._insertElement(e, p.HTML);
}
function oo(t, e) {
  t._reconstructActiveFormattingElements(),
    Sr(e),
    Lt(e),
    e.selfClosing
      ? t._appendElement(e, p.MATHML)
      : t._insertElement(e, p.MATHML),
    (e.ackSelfClosing = !0);
}
function co(t, e) {
  t._reconstructActiveFormattingElements(),
    yr(e),
    Lt(e),
    e.selfClosing ? t._appendElement(e, p.SVG) : t._insertElement(e, p.SVG),
    (e.ackSelfClosing = !0);
}
function iu(t, e) {
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
      Ki(t, e);
      break;
    }
    case s.A: {
      Qi(t, e);
      break;
    }
    case s.H1:
    case s.H2:
    case s.H3:
    case s.H4:
    case s.H5:
    case s.H6: {
      Fi(t, e);
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
      vi(t, e);
      break;
    }
    case s.LI:
    case s.DD:
    case s.DT: {
      Vi(t, e);
      break;
    }
    case s.BR:
    case s.IMG:
    case s.WBR:
    case s.AREA:
    case s.EMBED:
    case s.KEYGEN: {
      du(t, e);
      break;
    }
    case s.HR: {
      Zi(t, e);
      break;
    }
    case s.RB:
    case s.RTC: {
      ao(t, e);
      break;
    }
    case s.RT:
    case s.RP: {
      io(t, e);
      break;
    }
    case s.PRE:
    case s.LISTING: {
      Wi(t, e);
      break;
    }
    case s.XMP: {
      ro(t, e);
      break;
    }
    case s.SVG: {
      co(t, e);
      break;
    }
    case s.HTML: {
      wi(t, e);
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
      Bi(t, e);
      break;
    }
    case s.FORM: {
      Yi(t, e);
      break;
    }
    case s.NOBR: {
      zi(t, e);
      break;
    }
    case s.MATH: {
      oo(t, e);
      break;
    }
    case s.TABLE: {
      Gi(t, e);
      break;
    }
    case s.INPUT: {
      $i(t, e);
      break;
    }
    case s.PARAM:
    case s.TRACK:
    case s.SOURCE: {
      Ji(t, e);
      break;
    }
    case s.IMAGE: {
      eo(t, e);
      break;
    }
    case s.BUTTON: {
      Xi(t, e);
      break;
    }
    case s.APPLET:
    case s.OBJECT:
    case s.MARQUEE: {
      ji(t, e);
      break;
    }
    case s.IFRAME: {
      no(t, e);
      break;
    }
    case s.SELECT: {
      so(t, e);
      break;
    }
    case s.OPTION:
    case s.OPTGROUP: {
      uo(t, e);
      break;
    }
    case s.NOEMBED: {
      au(t, e);
      break;
    }
    case s.FRAMESET: {
      Ui(t, e);
      break;
    }
    case s.TEXTAREA: {
      to(t, e);
      break;
    }
    case s.NOSCRIPT: {
      t.options.scriptingEnabled ? au(t, e) : iu(t, e);
      break;
    }
    case s.PLAINTEXT: {
      qi(t, e);
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
      iu(t, e);
  }
}
function lo(t, e) {
  if (
    t.openElements.hasInScope(s.BODY) &&
    ((t.insertionMode = d.AFTER_BODY), t.options.sourceCodeLocationInfo)
  ) {
    let r = t.openElements.tryPeekProperlyNestedBodyElement();
    r && t._setEndLocation(r, e);
  }
}
function ho(t, e) {
  t.openElements.hasInScope(s.BODY) &&
    ((t.insertionMode = d.AFTER_BODY), Cu(t, e));
}
function fo(t, e) {
  let r = e.tagID;
  t.openElements.hasInScope(r) &&
    (t.openElements.generateImpliedEndTags(),
    t.openElements.popUntilTagNamePopped(r));
}
function mo(t) {
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
function Eo(t) {
  t.openElements.hasInButtonScope(s.P) || t._insertFakeElement(m.P, s.P),
    t._closePElement();
}
function To(t) {
  t.openElements.hasInListItemScope(s.LI) &&
    (t.openElements.generateImpliedEndTagsWithExclusion(s.LI),
    t.openElements.popUntilTagNamePopped(s.LI));
}
function po(t, e) {
  let r = e.tagID;
  t.openElements.hasInScope(r) &&
    (t.openElements.generateImpliedEndTagsWithExclusion(r),
    t.openElements.popUntilTagNamePopped(r));
}
function go(t) {
  t.openElements.hasNumberedHeaderInScope() &&
    (t.openElements.generateImpliedEndTags(),
    t.openElements.popUntilNumberedHeaderPopped());
}
function bo(t, e) {
  let r = e.tagID;
  t.openElements.hasInScope(r) &&
    (t.openElements.generateImpliedEndTags(),
    t.openElements.popUntilTagNamePopped(r),
    t.activeFormattingElements.clearToLastMarker());
}
function _o(t) {
  t._reconstructActiveFormattingElements(),
    t._insertFakeElement(m.BR, s.BR),
    t.openElements.pop(),
    (t.framesetOk = !1);
}
function fu(t, e) {
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
      Eo(t);
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
      fo(t, e);
      break;
    }
    case s.LI: {
      To(t);
      break;
    }
    case s.DD:
    case s.DT: {
      po(t, e);
      break;
    }
    case s.H1:
    case s.H2:
    case s.H3:
    case s.H4:
    case s.H5:
    case s.H6: {
      go(t);
      break;
    }
    case s.BR: {
      _o(t);
      break;
    }
    case s.BODY: {
      lo(t, e);
      break;
    }
    case s.HTML: {
      ho(t, e);
      break;
    }
    case s.FORM: {
      mo(t);
      break;
    }
    case s.APPLET:
    case s.OBJECT:
    case s.MARQUEE: {
      bo(t, e);
      break;
    }
    case s.TEMPLATE: {
      qe(t, e);
      break;
    }
    default:
      fu(t, e);
  }
}
function mu(t, e) {
  t.tmplInsertionModeStack.length > 0 ? Au(t, e) : Yn(t, e);
}
function Ao(t, e) {
  var r;
  e.tagID === s.SCRIPT &&
    ((r = t.scriptHandler) === null ||
      r === void 0 ||
      r.call(t, t.openElements.current)),
    t.openElements.pop(),
    (t.insertionMode = t.originalInsertionMode);
}
function Co(t, e) {
  t._err(e, E.eofInElementThatCanContainOnlyText),
    t.openElements.pop(),
    (t.insertionMode = t.originalInsertionMode),
    t.onEof(e);
}
function Un(t, e) {
  if (ou.has(t.openElements.currentTagId))
    switch (
      ((t.pendingCharacterTokens.length = 0),
      (t.hasNonWhitespacePendingCharacterToken = !1),
      (t.originalInsertionMode = t.insertionMode),
      (t.insertionMode = d.IN_TABLE_TEXT),
      e.type)
    ) {
      case B.CHARACTER: {
        Tu(t, e);
        break;
      }
      case B.WHITESPACE_CHARACTER: {
        Eu(t, e);
        break;
      }
    }
  else Ut(t, e);
}
function No(t, e) {
  t.openElements.clearBackToTableContext(),
    t.activeFormattingElements.insertMarker(),
    t._insertElement(e, p.HTML),
    (t.insertionMode = d.IN_CAPTION);
}
function Io(t, e) {
  t.openElements.clearBackToTableContext(),
    t._insertElement(e, p.HTML),
    (t.insertionMode = d.IN_COLUMN_GROUP);
}
function So(t, e) {
  t.openElements.clearBackToTableContext(),
    t._insertFakeElement(m.COLGROUP, s.COLGROUP),
    (t.insertionMode = d.IN_COLUMN_GROUP),
    Vn(t, e);
}
function yo(t, e) {
  t.openElements.clearBackToTableContext(),
    t._insertElement(e, p.HTML),
    (t.insertionMode = d.IN_TABLE_BODY);
}
function Ro(t, e) {
  t.openElements.clearBackToTableContext(),
    t._insertFakeElement(m.TBODY, s.TBODY),
    (t.insertionMode = d.IN_TABLE_BODY),
    Pr(t, e);
}
function xo(t, e) {
  t.openElements.hasInTableScope(s.TABLE) &&
    (t.openElements.popUntilTagNamePopped(s.TABLE),
    t._resetInsertionMode(),
    t._processStartTag(e));
}
function Lo(t, e) {
  hu(e) ? t._appendElement(e, p.HTML) : Ut(t, e), (e.ackSelfClosing = !0);
}
function Oo(t, e) {
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
      Ro(t, e);
      break;
    }
    case s.STYLE:
    case s.SCRIPT:
    case s.TEMPLATE: {
      be(t, e);
      break;
    }
    case s.COL: {
      So(t, e);
      break;
    }
    case s.FORM: {
      Oo(t, e);
      break;
    }
    case s.TABLE: {
      xo(t, e);
      break;
    }
    case s.TBODY:
    case s.TFOOT:
    case s.THEAD: {
      yo(t, e);
      break;
    }
    case s.INPUT: {
      Lo(t, e);
      break;
    }
    case s.CAPTION: {
      No(t, e);
      break;
    }
    case s.COLGROUP: {
      Io(t, e);
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
function Eu(t, e) {
  t.pendingCharacterTokens.push(e);
}
function Tu(t, e) {
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
var pu = new Set([
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
function Do(t, e) {
  let r = e.tagID;
  pu.has(r)
    ? t.openElements.hasInTableScope(s.CAPTION) &&
      (t.openElements.generateImpliedEndTags(),
      t.openElements.popUntilTagNamePopped(s.CAPTION),
      t.activeFormattingElements.clearToLastMarker(),
      (t.insertionMode = d.IN_TABLE),
      nt(t, e))
    : re(t, e);
}
function Mo(t, e) {
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
function Po(t, e) {
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
function gu(t, e) {
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
function ko(t, e) {
  let r = e.tagID;
  pu.has(r)
    ? (t.openElements.hasInTableScope(s.TD) ||
        t.openElements.hasInTableScope(s.TH)) &&
      (t._closeTableCell(), kr(t, e))
    : re(t, e);
}
function Ho(t, e) {
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
      t.openElements.hasInTableScope(r) && (t._closeTableCell(), gu(t, e));
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
function bu(t, e) {
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
function _u(t, e) {
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
function wo(t, e) {
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
    : bu(t, e);
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
    ? t.openElements.hasInTableScope(r) &&
      (t.openElements.popUntilTagNamePopped(s.SELECT),
      t._resetInsertionMode(),
      t.onEndTag(e))
    : _u(t, e);
}
function Uo(t, e) {
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
function vo(t, e) {
  e.tagID === s.TEMPLATE && qe(t, e);
}
function Au(t, e) {
  t.openElements.tmplCount > 0
    ? (t.openElements.popUntilTagNamePopped(s.TEMPLATE),
      t.activeFormattingElements.clearToLastMarker(),
      t.tmplInsertionModeStack.shift(),
      t._resetInsertionMode(),
      t.onEof(e))
    : Yn(t, e);
}
function Fo(t, e) {
  e.tagID === s.HTML ? re(t, e) : Or(t, e);
}
function Cu(t, e) {
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
function Wo(t, e) {
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
function Yo(t, e) {
  e.tagID === s.FRAMESET &&
    !t.openElements.isRootHtmlElementCurrent() &&
    (t.openElements.pop(),
    !t.fragmentContext &&
      t.openElements.currentTagId !== s.FRAMESET &&
      (t.insertionMode = d.AFTER_FRAMESET));
}
function Vo(t, e) {
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
function qo(t, e) {
  e.tagID === s.HTML && (t.insertionMode = d.AFTER_AFTER_FRAMESET);
}
function Xo(t, e) {
  e.tagID === s.HTML ? re(t, e) : xr(t, e);
}
function xr(t, e) {
  (t.insertionMode = d.IN_BODY), Dr(t, e);
}
function Qo(t, e) {
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
function Ko(t, e) {
  (e.chars = q), t._insertCharacters(e);
}
function zo(t, e) {
  t._insertCharacters(e), (t.framesetOk = !1);
}
function Nu(t) {
  for (
    ;
    t.treeAdapter.getNamespaceURI(t.openElements.current) !== p.HTML &&
    !t._isIntegrationPoint(t.openElements.currentTagId, t.openElements.current);

  )
    t.openElements.pop();
}
function jo(t, e) {
  if (Hn(e)) Nu(t), t._startTagOutsideForeignContent(e);
  else {
    let r = t._getAdjustedCurrentElement(),
      n = t.treeAdapter.getNamespaceURI(r);
    n === p.MATHML ? Sr(e) : n === p.SVG && (wn(e), yr(e)),
      Lt(e),
      e.selfClosing ? t._appendElement(e, n) : t._insertElement(e, n),
      (e.ackSelfClosing = !0);
  }
}
function Go(t, e) {
  if (e.tagID === s.P || e.tagID === s.BR) {
    Nu(t), t._endTagOutsideForeignContent(e);
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
var $o = new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"],
  ]),
  Kl =
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
var zl = qn(/[&<>'"]/g, $o),
  Jo = qn(
    /["&\u00A0]/g,
    new Map([
      [34, "&quot;"],
      [38, "&amp;"],
      [160, "&nbsp;"],
    ]),
  ),
  Zo = qn(
    /[&<>\u00A0]/g,
    new Map([
      [38, "&amp;"],
      [60, "&lt;"],
      [62, "&gt;"],
      [160, "&nbsp;"],
    ]),
  );
var Zl = new Set([
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
function Iu(t, e) {
  return rt.parse(t, e);
}
function Su(t, e, r) {
  typeof t == "string" && ((r = e), (e = t), (t = null));
  let n = rt.getFragmentParser(t, r);
  return n.tokenizer.write(e, !0), n.getFragment();
}
var yu = new WeakMap();
function Hr(t, e) {
  let r = Iu(e.trim(), Ru(t));
  return (
    (r.documentElement = r.firstElementChild),
    (r.head = r.documentElement.firstElementChild),
    (r.body = r.head.nextElementSibling),
    r
  );
}
function wr(t, e) {
  return typeof e == "string" ? (e = e.trim()) : (e = ""), Su(e, Ru(t));
}
function Ru(t) {
  let e = yu.get(t);
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
      yu.set(t, e)),
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
      gs = function (a, l) {
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
      bs = new RegExp(W + "|>"),
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
      oa = new RegExp(_e),
      ca = new RegExp("\\\\[\\da-fA-F]{1,6}" + W + "?|\\\\([^\\r\\n\\f])", "g"),
      la = function (a, l) {
        var f = "0x" + a.slice(1) - 65536;
        return (
          l ||
          (f < 0
            ? String.fromCharCode(f + 65536)
            : String.fromCharCode((f >> 10) | 55296, (f & 1023) | 56320))
        );
      };
    function Me(a) {
      return a.replace(ca, la);
    }
    function Et(a) {
      I.error("Syntax error, unrecognized expression: " + a);
    }
    var da = new RegExp("^" + W + "*," + W + "*"),
      _s = k();
    function ur(a, l) {
      var f,
        g,
        b,
        N,
        S,
        O,
        L,
        U = _s[a + " "];
      if (U) return l ? 0 : U.slice(0);
      for (S = a, O = [], L = I.expr.preFilter; S; ) {
        (!f || (g = da.exec(S))) &&
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
      return l ? S.length : S ? Et(a) : _s(a, O).slice(0);
    }
    var ha = {
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
                oa.test(f) &&
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
    var fa = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
    function ma(a, l) {
      return l
        ? a === "\0"
          ? "\uFFFD"
          : a.slice(0, -1) +
            "\\" +
            a.charCodeAt(a.length - 1).toString(16) +
            " "
        : "\\" + a;
    }
    I.escapeSelector = function (a) {
      return (a + "").replace(fa, ma);
    };
    var Ea = r.sort,
      Ta = r.splice,
      hn;
    function pa(a, l) {
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
      if (((hn = !1), Ea.call(a, pa), hn)) {
        for (; (l = a[b++]); ) l === a[b] && (g = f.push(b));
        for (; g--; ) Ta.call(a, f[g], 1);
      }
      return a;
    }),
      (I.fn.uniqueSort = function () {
        return this.pushStack(I.uniqueSort(u.apply(this)));
      });
    var Ge,
      ar,
      ce,
      As,
      Pe,
      Re = 0,
      ga = 0,
      Cs = k(),
      Ns = k(),
      Is = k(),
      ba = new RegExp(W + "+", "g"),
      _a = new RegExp("^" + ye + "$"),
      Ss = I.extend(
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
      Aa = /^(?:input|select|textarea|button)$/i,
      Ca = /^h\d$/i,
      jc = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      Na = function () {
        Tt();
      },
      Ia = ir(
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
      if (0 && Pe && !Is[a + " "] && (!Ee || !Ee.test(a)))
        try {
        } catch (D) {
        } finally {
        }
      return xs(a.replace(je, "$1"), l, f, g);
    }
    function Ae(a) {
      return (a[I.expando] = !0), a;
    }
    function Sa(a) {
      return function (l) {
        return ne(l, "input") && l.type === a;
      };
    }
    function ya(a) {
      return function (l) {
        return (ne(l, "input") || ne(l, "button")) && l.type === a;
      };
    }
    function ys(a) {
      return function (l) {
        return "form" in l
          ? l.parentNode && l.disabled === !1
            ? "label" in l
              ? "label" in l.parentNode
                ? l.parentNode.disabled === a
                : l.disabled === a
              : l.isDisabled === a || (l.isDisabled !== !a && Ia(l) === a)
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
        (As = ce.documentElement),
        (Pe = !I.isXMLDoc(ce)),
        ft &&
          Z != ce &&
          (l = ce.defaultView) &&
          l.top !== l &&
          l.addEventListener("unload", Na));
    }
    (Te.matches = function (a, l) {
      return Te(a, null, null, l);
    }),
      (Te.matchesSelector = function (a, l) {
        if ((Tt(a), Pe && !Is[l + " "] && (!Ee || !Ee.test(l))))
          try {
            return C.call(a, l);
          } catch {
            Is(l, !0);
          }
        return Te(l, ce, null, [a]).length > 0;
      }),
      (I.expr = {
        cacheLength: 50,
        createPseudo: Ae,
        match: Ss,
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
        preFilter: ha,
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
            var l = Cs[a + " "];
            return (
              l ||
              ((l = new RegExp("(^|" + W + ")" + a + "(" + W + "|$)")) &&
                Cs(a, function (f) {
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
                                ? (" " + b.replace(ba, " ") + " ").indexOf(f) >
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
              _a.test(a || "") || Et("unsupported lang: " + a),
              (a = Me(a).toLowerCase()),
              function (l) {
                var f;
                do
                  if (
                    (f = Pe
                      ? l.lang
                      : l.getAttribute("xml:lang") || l.getAttribute("lang"))
                  )
                    return (
                      (f = f.toLowerCase()), f === a || f.indexOf(a + "-") === 0
                    );
                while ((l = l.parentNode) && l.nodeType === 1);
                return !1;
              }
            );
          }),
          target: function (a) {
            var l = t.location && t.location.hash;
            return l && l.slice(1) === a.id;
          },
          root: function (a) {
            return a === As;
          },
          focus: function (a) {
            return (
              a === ce.activeElement &&
              ce.hasFocus() &&
              !!(a.type || a.href || ~a.tabIndex)
            );
          },
          enabled: ys(!1),
          disabled: ys(!0),
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
            return Ca.test(a.nodeName);
          },
          input: function (a) {
            return Aa.test(a.nodeName);
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
      I.expr.pseudos[Ge] = Sa(Ge);
    for (Ge in { submit: !0, reset: !0 }) I.expr.pseudos[Ge] = ya(Ge);
    function Rs() {}
    (Rs.prototype = I.expr.filters = I.expr.pseudos),
      (I.expr.setFilters = new Rs());
    function ir(a, l, f) {
      var g = l.dir,
        b = l.next,
        N = b || g,
        S = f && N === "parentNode",
        O = ga++;
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
    function Ra(a, l, f) {
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
            le = S || Ra(l || "*", L.nodeType ? [L] : L, []),
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
    function xa(a, l) {
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
        N = Ns[a + " "];
      if (!N) {
        for (l || (l = ur(a)), f = l.length; f--; )
          (N = En(l[f])), N[I.expando] ? g.push(N) : b.push(N);
        (N = Ns(a, xa(b, g))), (N.selector = a);
      }
      return N;
    }
    function xs(a, l, f, g) {
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
          b = Ss.needsContext.test(a) ? 0 : N.length;
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
      (Te.select = xs),
      (Te.setDocument = Tt),
      (Te.tokenize = ur),
      I
    );
  },
);
function xu(t, e) {
  return Br.find(t, void 0, void 0, [e]).length > 0;
}
function Lu(t, e) {
  return Br.find(t, e, void 0, void 0)[0] || null;
}
function Ou(t, e) {
  return Br.find(t, e, void 0, void 0);
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
    r.text[0] ===
      `
` && r.text.shift(),
    r.text[r.text.length - 1] ===
      `
` && r.text.pop(),
    r.text.join("")
  );
}
function vr(t, e, r, n) {
  if (t.nodeType === 1 || n) {
    let u = n ? "mock:shadow-root" : ac(t);
    u === "body" && (r.isWithinBody = !0);
    let o = e.excludeTags != null && e.excludeTags.includes(u);
    if (o === !1) {
      let h = e.newLines || e.indentSpaces > 0 ? Xe(t) : !1;
      if (
        (e.newLines &&
          !h &&
          (r.text.push(`
`),
          (r.currentLineWidth = 0)),
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
        if (e.removeEmptyAttributes && w === "" && cc.has(R)) continue;
        let Y = M.namespaceURI;
        Y == null
          ? ((r.currentLineWidth += R.length + 1),
            e.approximateLineWidth > 0 &&
            r.currentLineWidth > e.approximateLineWidth
              ? (r.text.push(
                  `
` + R,
                ),
                (r.currentLineWidth = 0))
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
            ((e.removeBooleanAttributeQuotes && lc.has(R)) ||
              (e.removeEmptyAttributes && R.startsWith("data-")))
          ) &&
            (e.removeAttributeQuotes && uc.test(w)
              ? (r.text.push("=" + Ur(w, !0)),
                (r.currentLineWidth += w.length + 1))
              : (r.text.push('="' + Ur(w, !0) + '"'),
                (r.currentLineWidth += w.length + 3)));
      }
      if (t.hasAttribute("style")) {
        let y = t.style.cssText;
        e.approximateLineWidth > 0 &&
        r.currentLineWidth + y.length + 10 > e.approximateLineWidth
          ? (r.text.push(`
style="${y}">`),
            (r.currentLineWidth = 0))
          : (r.text.push(` style="${y}">`),
            (r.currentLineWidth += y.length + 10));
      } else r.text.push(">"), (r.currentLineWidth += 1);
    }
    if (oc.has(u) === !1) {
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
        r.text.push(`
`),
          (r.currentLineWidth = 0);
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
            (e.newLines &&
              !A &&
              (r.text.push(`
`),
              (r.currentLineWidth = 0)),
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
      dc.has(u) &&
      (r.text.push(`
`),
      (r.currentLineWidth = 0)),
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
              ? (r.text.push(`
`),
                (r.currentLineWidth = 0))
              : r.text.push(" "));
      else {
        let h = e.newLines || e.indentSpaces > 0 || e.prettyHtml ? Xe(t) : !1;
        if (
          (e.newLines &&
            !h &&
            (r.text.push(`
`),
            (r.currentLineWidth = 0)),
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
          Xn.has(A)
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
                      ? ((u =
                          u.trimRight() +
                          `
`),
                        (r.currentLineWidth = 0))
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
        u.startsWith(Ls + ".") ||
        u.startsWith(Os + ".") ||
        u.startsWith(Ds + ".") ||
        u.startsWith(Ms + ".")
      )
    )
      return;
    let o = e.newLines || e.indentSpaces > 0 ? Xe(t) : !1;
    if (
      (e.newLines &&
        !o &&
        (r.text.push(`
`),
        (r.currentLineWidth = 0)),
      e.indentSpaces > 0 && !o)
    ) {
      for (let h = 0; h < r.indent; h++) r.text.push(" ");
      r.currentLineWidth += r.indent;
    }
    r.text.push("<!--" + u + "-->"), (r.currentLineWidth += u.length + 7);
  } else t.nodeType === 10 && r.text.push("<!doctype html>");
}
var ec = /&/g,
  tc = /\u00a0/g,
  rc = /"/g,
  nc = /</g,
  sc = />/g,
  uc = /^[^ \t\n\f\r"'`=<>\/\\-]+$/;
function ac(t) {
  return t.namespaceURI === "http://www.w3.org/1999/xhtml"
    ? t.nodeName.toLowerCase()
    : t.nodeName;
}
function Ur(t, e) {
  return (
    (t = t.replace(ec, "&amp;").replace(tc, "&nbsp;")),
    e ? t.replace(rc, "&quot;") : t.replace(nc, "&lt;").replace(sc, "&gt;")
  );
}
function Xe(t) {
  for (; t != null; ) {
    if (ic.has(t.nodeName)) return !0;
    t = t.parentNode;
  }
  return !1;
}
var Xn = new Set([
    "STYLE",
    "SCRIPT",
    "IFRAME",
    "NOSCRIPT",
    "XMP",
    "NOEMBED",
    "NOFRAMES",
    "PLAINTEXT",
  ]),
  ic = new Set([
    "CODE",
    "OUTPUT",
    "PLAINTEXT",
    "PRE",
    "SCRIPT",
    "TEMPLATE",
    "TEXTAREA",
  ]),
  oc = new Set([
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
  cc = new Set(["class", "dir", "id", "lang", "name", "title"]),
  lc = new Set([
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
  dc = new Set([
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
            console.error(`NOTE: Property ${String(r)} was accessed on ElementInternals, but this property is not implemented.
Testing components with ElementInternals is fully supported in e2e tests.`);
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
      return Bs(this);
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
      if (Xn.has((r = this.nodeName) != null ? r : "") === !0) Qn(this, e);
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
      return Kn(this.childNodes, e), e.join("");
    }
    set innerText(e) {
      Qn(this, e);
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
      return xu(e, this);
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
      return Du(this, r, n), n;
    }
    getElementsByTagName(e) {
      let r = [];
      return Mu(this, e.toLowerCase(), r), r;
    }
    querySelector(e) {
      return Lu(e, this);
    }
    querySelectorAll(e) {
      return Ou(e, this);
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
      return Kn(this.childNodes, e), e.join("");
    }
    set textContent(e) {
      Qn(this, e);
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
function Du(t, e, r) {
  let n = t.children;
  for (let u = 0, o = n.length; u < o; u++) {
    let h = n[u];
    for (let T = 0, A = e.length; T < A; T++)
      h.classList.contains(e[T]) && r.push(h);
    Du(h, e, r);
  }
}
function Mu(t, e, r) {
  var u;
  let n = t.children;
  for (let o = 0, h = n.length; o < h; o++) {
    let T = n[o];
    (e === "*" || ((u = T.nodeName) != null ? u : "").toLowerCase() === e) &&
      r.push(T),
      Mu(T, e, r);
  }
}
function zn(t) {
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
function Kn(t, e) {
  for (let r = 0, n = t.length; r < n; r++) {
    let u = t[r];
    u.nodeType === 3
      ? e.push(u.nodeValue)
      : u.nodeType === 1 && Kn(u.childNodes, e);
  }
}
function Qn(t, e) {
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
var jn = class {
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
        (this.cssRules.splice(e, 1), Gn(this.ownerNode));
    }
    insertRule(e, r = 0) {
      typeof r != "number" && (r = 0),
        r < 0 && (r = 0),
        r > this.cssRules.length && (r = this.cssRules.length);
      let n = new jn(this);
      return (
        (n.cssText = e), this.cssRules.splice(r, 0, n), Gn(this.ownerNode), r
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
  (r.cssRules.length = 0), r.insertRule(e), Gn(t);
}
function Gn(t) {
  let e = t.childNodes.length;
  if (e > 1) for (let n = e - 1; n >= 1; n--) t.removeChild(t.childNodes[n]);
  else e < 1 && t.appendChild(t.ownerDocument.createTextNode(""));
  let r = t.childNodes[0];
  r.nodeValue = t.sheet.cssRules.map((n) => n.cssText).join(`
`);
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
function Pu(t, e, r) {
  if (e === "http://www.w3.org/1999/xhtml") return zr(t, r);
  if (e === "http://www.w3.org/2000/svg")
    switch (r.toLowerCase()) {
      case "text":
      case "tspan":
      case "tref":
      case "altglyph":
      case "textpath":
        return new Zn(t, r);
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
        return new Jn(t, r);
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
  $n = class {
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
      return new $n();
    }
    getCTM() {
      return new Wt();
    }
    getScreenCTM() {
      return new Wt();
    }
  },
  Jn = class extends Vt {
    createSVGPoint() {
      return new Qr();
    }
  },
  Zn = class extends Vt {
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
var es;
function ts(t, e = null) {
  return e == null && (es == null && (es = new Se()), (e = es)), Hr(e, t);
}
var Q = () => {};
function ku() {
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
      ts(e)
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
function rs(t) {
  let e = new ue(!1);
  hc.forEach((r) => {
    typeof t[r] != "function" && (t[r] = e[r].bind(e));
  }),
    fc.forEach((r) => {
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
function Hu(t) {
  mc.forEach(([e, r]) => {
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
var hc = [
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
  fc = [
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
  mc = [
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
function wu(t) {
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
var Bu = clearInterval,
  Uu = clearTimeout,
  Ec = setInterval,
  Tc = setTimeout,
  pc = URL,
  ue = class {
    constructor(e = null) {
      e !== !1 ? (this.document = new Se(e, this)) : (this.document = null),
        (this.performance = new Zr()),
        (this.customElements = new fr(this)),
        (this.console = ku()),
        vu(this),
        Fu(this);
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
      gc(this);
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
Hu(ue.prototype);
function vu(t) {
  (t.__clearInterval = Bu),
    (t.__clearTimeout = Uu),
    (t.__setInterval = Ec),
    (t.__setTimeout = Tc),
    (t.__maxTimeout = 3e4),
    (t.__allowInterval = !0),
    (t.URL = pc);
}
function ns(t, e = {}) {
  if (t == null) return null;
  let r = new ue(!1);
  if ((e.customElementProxy || (t.customElements = null), t.document != null)) {
    let n = new Se(!1, r);
    (r.document = n),
      (n.documentElement = t.document.documentElement.cloneNode(!0));
  } else r.document = new Se(null, r);
  return r;
}
function ss(t) {
  (t.__allowInterval = !1), (t.__maxTimeout = 0);
}
function gc(t) {
  if (t != null) {
    t.__timeouts &&
      (t.__timeouts.forEach((e) => {
        Bu(e), Uu(e);
      }),
      t.__timeouts.clear()),
      t.customElements && t.customElements.clear && t.customElements.clear(),
      us(t.document),
      wu(t.performance);
    for (let e in t)
      t.hasOwnProperty(e) &&
        e !== "document" &&
        e !== "performance" &&
        e !== "customElements" &&
        delete t[e];
    if ((vu(t), Fu(t), tt(t), t.document != null))
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
function Fu(t) {
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
    return Pu(this, e, r);
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
    return Wu(this, e.toLowerCase());
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
function us(t) {
  if (t != null) {
    tt(t);
    let e = t.documentElement;
    if (e != null) {
      zn(e);
      for (let r = 0, n = e.childNodes.length; r < n; r++) {
        let u = e.childNodes[r];
        zn(u), (u.childNodes.length = 0);
      }
    }
    for (let r in t) t.hasOwnProperty(r) && !_c.has(r) && delete t[r];
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
var _c = new Set([
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
function Wu(t, e, r = []) {
  let n = t.children;
  for (let u = 0, o = n.length; u < o; u++) {
    let h = n[u];
    h.name && h.name.toLowerCase() === e && r.push(h), Wu(h, e, r);
  }
  return r;
}
function er(t, e) {
  for (let r = 0, n = t.childNodes.length; r < n; r++)
    (t.childNodes[r].ownerDocument = e),
      t.childNodes[r].nodeType === 1 && er(t.childNodes[r], e);
}
var Yu = new Map();
function Ac(t, e) {
  let r = Yu.get(e);
  return r == null && ((r = new ue(t)), Yu.set(e, r)), ns(r);
}
var tr = (t) => typeof t == "string";
var as = (t) =>
  !!t &&
  (typeof t == "object" || typeof t == "function") &&
  typeof t.then == "function";
var Vu = (t, e, r) => {
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
      t != null && !Cc(n.messageText) && t.push(n),
      n
    );
  },
  ht = (t) =>
    t == null || t.length === 0
      ? !1
      : t.some((e) => e.level === "error" && e.type !== "runtime");
var Cc = (t) => t === Nc,
  Nc = "task canceled";
var os = {};
cr(os, {
  err: () => qu,
  map: () => yc,
  ok: () => is,
  unwrap: () => Rc,
  unwrapErr: () => xc,
});
var is = (t) => ({ isOk: !0, isErr: !1, value: t }),
  qu = (t) => ({ isOk: !1, isErr: !0, value: t });
function yc(t, e) {
  if (t.isOk) {
    let r = e(t.value);
    return r instanceof Promise ? r.then((n) => is(n)) : is(r);
  }
  if (t.isErr) {
    let r = t.value;
    return qu(r);
  }
  throw "should never get here";
}
var Rc = (t) => {
    if (t.isOk) return t.value;
    throw t.value;
  },
  xc = (t) => {
    if (t.isErr) return t.value;
    throw t.value;
  };
var Xu = (t, e) => {
  let r = t.head.querySelector('link[rel="canonical"]');
  typeof e == "string"
    ? (r == null &&
        ((r = t.createElement("link")),
        r.setAttribute("rel", "canonical"),
        t.head.appendChild(r)),
      r.setAttribute("href", e))
    : r != null && (r.getAttribute("href") || r.parentNode.removeChild(r));
};
var Qu = (t) => {
  let e = t.head,
    r = e.querySelector("meta[charset]");
  r == null
    ? ((r = t.createElement("meta")), r.setAttribute("charset", "utf-8"))
    : r.remove(),
    e.insertBefore(r, e.firstChild);
};
var zu = (t, e) => {
    let r = 1,
      n = 1,
      u = [],
      o = (x) => {
        let C = x.match(/\n/g);
        C && (r += C.length);
        let k = x.lastIndexOf(`
`);
        n = ~k ? x.length - k : n + x.length;
      },
      h = () => {
        let x = { line: r, column: n };
        return (C) => ((C.position = new mt(x)), Y(), C);
      },
      T = (x) => {
        let C = t.split(`
`),
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
        for (Y(), K(C); t.length && t.charAt(0) !== "}" && (x = cn() || bs()); )
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
                return C.replace(/,/g, "\u200C");
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
            property: C.replace(Ku, ""),
            value: k ? Oe(k[0]).replace(Ku, "") : "",
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
      gs = () => {
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
            gs() ||
            ne() ||
            sr() ||
            je() ||
            ye() ||
            on() ||
            W() ||
            an() ||
            un() ||
            ft(),
      bs = () => {
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
    return (mt.prototype.content = t), { diagnostics: u, ...cs(A()) };
  },
  Oe = (t) => (t ? t.trim() : ""),
  cs = (t, e) => {
    let r = t && typeof t.type == "string",
      n = r ? t : e;
    for (let u in t) {
      let o = t[u];
      Array.isArray(o)
        ? o.forEach(function (h) {
            cs(h, n);
          })
        : o && typeof o == "object" && cs(o, n);
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
  Ku = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
var ju = (t) => {
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
var Gu = (t, e) => {
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
    for (let T = 0; T < o; T++) h.push($u(n, u[T], T, o));
    return h.join("");
  },
  $u = (t, e, r, n) => {
    var o;
    let u = e.type;
    return u === 4
      ? Dc(e, r, n)
      : u === 13
        ? Oc(t, e)
        : u === 1
          ? ((o = e.comment) == null ? void 0 : o[0]) === "!"
            ? `/*${e.comment}*/`
            : ""
          : u === 10
            ? Mc(t, e)
            : u === 8
              ? Pc(t, e)
              : u === 9
                ? kc(t, e)
                : u === 5
                  ? Hc(t, e)
                  : u === 15
                    ? wc(t, e)
                    : u === 7
                      ? "@import " + e.import + ";"
                      : u === 0
                        ? "@charset " + e.charset + ";"
                        : u === 12
                          ? Bc(t, e)
                          : u === 6
                            ? "@host{" + De(t, e.rules) + "}"
                            : u === 2
                              ? "@custom-media " + e.name + " " + e.media + ";"
                              : u === 3
                                ? Uc(t, e)
                                : u === 11
                                  ? "@namespace " + e.namespace + ";"
                                  : "";
  },
  Oc = (t, e) => {
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
        let w = ju(u[y]);
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
      for (let y of e.selectors) (h = vc(y)), o.includes(h) || o.push(h);
    return `${o}{${De(t, r)}}`;
  },
  Dc = (t, e, r) =>
    t.value === ""
      ? ""
      : r - 1 === e
        ? t.property + ":" + t.value
        : t.property + ":" + t.value + ";",
  Mc = (t, e) => {
    let r = De(t, e.rules);
    return r === "" ? "" : "@media " + Fc(e.media) + "{" + r + "}";
  },
  Pc = (t, e) => {
    let r = De(t, e.keyframes);
    return r === ""
      ? ""
      : "@" + (e.vendor || "") + "keyframes " + e.name + "{" + r + "}";
  },
  kc = (t, e) => {
    var r, n;
    return (
      ((n = (r = e.values) == null ? void 0 : r.join(",")) != null ? n : "") +
      "{" +
      De(t, e.declarations) +
      "}"
    );
  },
  Hc = (t, e) => {
    let r = De(t, e.declarations);
    return r === "" ? "" : "@font-face{" + r + "}";
  },
  wc = (t, e) => {
    let r = De(t, e.rules);
    return r === "" ? "" : "@supports " + e.supports + "{" + r + "}";
  },
  Bc = (t, e) => {
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
  Uc = (t, e) => {
    let r = De(t, e.rules),
      n = "@" + (e.vendor || "") + "document " + e.document;
    return r === "" ? "" : n + "{" + r + "}";
  },
  De = (t, e) => {
    let r = "";
    if (e) for (let n = 0, u = e.length; n < u; n++) r += $u(t, e[n], n, u);
    return r;
  },
  vc = (t) => {
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
        !n && ls.test(r))
      ) {
        if (Wc.test(t[u + 1]) || Yc.test(e[e.length - 1])) continue;
        e += " ";
      } else e += r;
    return e;
  },
  Fc = (t) => {
    var n;
    let e = "",
      r = "";
    t = (n = t == null ? void 0 : t.trim()) != null ? n : "";
    for (let u = 0, o = t.length; u < o; u++)
      if (((r = t[u]), ls.test(r))) {
        if (ls.test(e[e.length - 1])) continue;
        e += " ";
      } else e += r;
    return e;
  },
  ls = /\s/,
  Wc = /[>\(\)\~\,\+\s]/,
  Yc = /[>\(\~\,\+]/;
var Ju = (t) => {
    let e = {
      attrs: new Set(),
      classNames: new Set(),
      ids: new Set(),
      tags: new Set(),
    };
    return Zu(e, t), e;
  },
  Zu = (t, e) => {
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
      if (r) for (let o = 0, h = r.length; o < h; o++) Zu(t, r[o]);
    }
  };
var ea = (t, e) => {
    try {
      let r = t.head.querySelectorAll("style[data-styles]"),
        n = r.length;
      if (n > 0) {
        let u = Ju(t.documentElement);
        for (let o = 0; o < n; o++) Vc(u, e, r[o]);
      }
    } catch (r) {
      Vu(e, r);
    }
  },
  Vc = (t, e, r) => {
    try {
      let n = zu(r.innerHTML);
      if ((e.push(...n.diagnostics), ht(e))) return;
      try {
        r.innerHTML = Gu(n.stylesheet, { usedSelectors: t });
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
function ds(t, e, r) {
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
    r++, ds(t, h, r);
  }
}
function en(t) {
  let e = {},
    r = t.attributes;
  for (let n = 0, u = r.length; n < u; n++) {
    let o = r.item(n),
      h = o.nodeName.toLowerCase();
    if (qc.has(h)) continue;
    let T = o.nodeValue;
    (h === "class" && T === "") || (e[h] = T);
  }
  return e;
}
var qc = new Set(["s-id", "c-id"]);
function hs(t, e) {
  let r;
  if (
    (t.defaultView != null
      ? ((e.destroyWindow = !0), rs(t.defaultView), (r = t.defaultView))
      : ((e.destroyWindow = !0), (e.destroyDocument = !1), (r = new ue(!1))),
    r.document !== t && (r.document = t),
    t.defaultView !== r && (t.defaultView = r),
    typeof t.documentElement.constructor.prototype.getRootNode != "function")
  ) {
    let o = t.createElement("unknown-element").constructor.prototype;
    o.getRootNode = Xc;
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
function Xc(t) {
  let e = t != null && t.composed === !0,
    r = this;
  for (; r.parentNode != null; )
    (r = r.parentNode),
      e === !0 && r.parentNode == null && r.host != null && (r = r.host);
  return r;
}
function fs(t) {
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
      ? (e.excludeComponents = e.excludeComponents.filter(ta).map(ra))
      : (e.excludeComponents = []),
    Array.isArray(e.staticComponents)
      ? (e.staticComponents = e.staticComponents.filter(ta).map(ra))
      : (e.staticComponents = []),
    e
  );
}
function ta(t) {
  return typeof t == "string" && t.includes("-");
}
function ra(t) {
  return t.trim().toLowerCase();
}
function ms(t) {
  typeof t.url != "string" && (t.url = "https://hydrate.stenciljs.com/"),
    typeof t.buildId != "string" && (t.buildId = Qc());
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
var Qc = () => {
  let t = "abcdefghijklmnopqrstuvwxyz",
    e = "";
  for (; e.length < 8; ) {
    let r = t[Math.floor(Math.random() * t.length)];
    (e += r), e.length === 1 && (t += "0123456789");
  }
  return e;
};
function Es(t, e, r, n) {
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
  return Es(t, "error", "Hydrate Error", e);
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
function na(t, e, r) {
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
      o !== "" && ($(r, o), e.runtimeLogging && Ts(n, "error", [o]));
    }),
      (t.console.debug = (...u) => {
        Es(r, "debug", "Hydrate Debug", [...u].join(", ")),
          e.runtimeLogging && Ts(n, "debug", u);
      }),
      e.runtimeLogging &&
        ["log", "warn", "assert", "info", "trace"].forEach((u) => {
          t.console[u] = (...o) => {
            Ts(n, u, o);
          };
        });
  } catch (n) {
    $(r, n);
  }
}
function Ts(t, e, r) {
  global.console[e].apply(global.console, [`[ ${t}  ${e} ] `, ...r]);
}
function sa(t, e, r, n) {
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
  return r.constrainTimeouts && ss(t), na(t, r, n), t;
}
function Kc(t, e) {
  let r = fs(e);
  return (
    (r.serializeToHtml = !0),
    new Promise((n) => {
      let u,
        o = ms(r);
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
      else if (aa(t))
        try {
          (r.destroyDocument = !1), (u = hs(t, r)), rn(u, r, o, n);
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
function zc(t, e) {
  let r = fs(e);
  return (
    (r.serializeToHtml = !1),
    new Promise((n) => {
      let u,
        o = ms(r);
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
      else if (aa(t))
        try {
          (r.destroyDocument = !1), (u = hs(t, r)), rn(u, r, o, n);
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
    sa(t, t.document, e, r),
    typeof e.beforeHydrate == "function")
  )
    try {
      let u = e.beforeHydrate(t.document);
      as(u) ? u.then(() => {}) : void 0;
    } catch (u) {
      $(r, u), rr(t, t.document, e, r, n);
    }
}
function ps(t, e, r, n) {
  if (typeof e.afterHydrate == "function")
    try {
      let u = e.afterHydrate(t.document);
      as(u)
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
    if ((ds(n, e.documentElement, 0), r.removeUnusedStyles !== !1))
      try {
        ea(e, n.diagnostics);
      } catch (o) {
        $(n, o);
      }
    if (typeof r.title == "string")
      try {
        e.title = r.title;
      } catch (o) {
        $(n, o);
      }
    (n.title = e.title), r.removeScripts && ia(e.documentElement);
    try {
      Xu(e, r.canonicalUrl);
    } catch (o) {
      $(n, o);
    }
    try {
      Qu(e);
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
      r.serializeToHtml && (n.html = ua(e, r));
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
function ua(t, e) {
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
function aa(t) {
  return (
    t != null &&
    t.nodeType === 9 &&
    t.documentElement != null &&
    t.documentElement.nodeType === 1 &&
    t.body != null &&
    t.body.nodeType === 1
  );
}
function ia(t) {
  let e = t.children;
  for (let r = e.length - 1; r >= 0; r--) {
    let n = e[r];
    ia(n),
      (n.nodeName === "SCRIPT" ||
        (n.nodeName === "LINK" && n.getAttribute("rel") === "modulepreload")) &&
        n.remove();
  }
}
export {
  Ac as createWindowFromHtml,
  zc as hydrateDocument,
  Kc as renderToString,
  ua as serializeDocumentToString,
};
