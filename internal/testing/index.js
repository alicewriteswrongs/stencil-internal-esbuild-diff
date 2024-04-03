function queryNonceMetaTagContent(e) {
  var t, a, o;
  return null !==
    (o =
      null ===
        (a =
          null === (t = e.head) || void 0 === t
            ? void 0
            : t.querySelector('meta[name="csp-nonce"]')) || void 0 === a
        ? void 0
        : a.getAttribute("content")) && void 0 !== o
    ? o
    : void 0;
}
function sortedAttrNames(e) {
  return e.includes("ref") ? [...e.filter((e) => "ref" !== e), "ref"] : e;
}
function writeTask(e) {
  queuedWriteTasks.push(e);
}
function flushQueue() {
  return new Promise((e, t) => {
    process.nextTick(async function a() {
      try {
        if (queuedReadTasks.length > 0) {
          const e = queuedReadTasks.slice();
          let t;
          for (queuedReadTasks.length = 0; (t = e.shift()); ) {
            const e = t(Date.now());
            null != e && "function" == typeof e.then && (await e);
          }
        }
        if (queuedWriteTasks.length > 0) {
          const e = queuedWriteTasks.slice();
          let t;
          for (queuedWriteTasks.length = 0; (t = e.shift()); ) {
            const e = t(Date.now());
            null != e && "function" == typeof e.then && (await e);
          }
        }
        queuedReadTasks.length + queuedWriteTasks.length > 0
          ? process.nextTick(a)
          : e();
      } catch (e) {
        t(`flushQueue: ${e}`);
      }
    });
  });
}
async function flushAll() {
  for (
    ;
    queuedTicks.length +
      queuedLoadModules.length +
      queuedWriteTasks.length +
      queuedReadTasks.length >
    0;

  )
    await new Promise((e, t) => {
      process.nextTick(function a() {
        try {
          if (queuedTicks.length > 0) {
            const e = queuedTicks.slice();
            let t;
            for (queuedTicks.length = 0; (t = e.shift()); ) t(Date.now());
          }
          queuedTicks.length > 0 ? process.nextTick(a) : e();
        } catch (e) {
          t(`flushTicks: ${e}`);
        }
      });
    }),
      await flushLoadModule(),
      await flushQueue();
  if (caughtErrors.length > 0) {
    const e = caughtErrors[0];
    if (null == e) throw new Error("Error!");
    if ("string" == typeof e) throw new Error(e);
    throw e;
  }
  return new Promise((e) => process.nextTick(e));
}
function loadModule(e, t, a) {
  return new Promise((t) => {
    queuedLoadModules.push({
      bundleId: e.$lazyBundleId$,
      resolve: () => t(moduleLoaded.get(e.$lazyBundleId$)),
    });
  });
}
function flushLoadModule(e) {
  return new Promise((t, a) => {
    try {
      process.nextTick(() => {
        if (null != e)
          for (let t = 0; t < queuedLoadModules.length; t++)
            queuedLoadModules[t].bundleId === e &&
              (queuedLoadModules[t].resolve(),
              queuedLoadModules.splice(t, 1),
              t--);
        else {
          let e;
          for (; (e = queuedLoadModules.shift()); ) e.resolve();
        }
        t();
      });
    } catch (e) {
      a(`flushLoadModule: ${e}`);
    }
  });
}
function stopAutoApplyChanges() {
  (isAutoApplyingChanges = !1),
    autoApplyTimer && (clearTimeout(autoApplyTimer), (autoApplyTimer = void 0));
}
const mockDoc = require("@stencil/core/mock-doc"),
  appData = require("@stencil/core/internal/app-data");
require("path");
const Build = { isDev: !0, isBrowser: !1, isServer: !0, isTesting: !0 },
  styles = new Map(),
  modeResolutionChain = [],
  cstrs = new Map(),
  queuedTicks = [],
  queuedWriteTasks = [],
  queuedReadTasks = [],
  moduleLoaded = new Map(),
  queuedLoadModules = [],
  caughtErrors = [],
  hostRefs = new Map();
let i = 0;
const createTime = (e, t = "") => {
    if (appData.BUILD.profile && performance.mark) {
      const a = `st:${e}:${t}:${i++}`;
      return (
        performance.mark(a),
        () => performance.measure(`[Stencil] ${e}() <${t}>`, a)
      );
    }
    return () => {};
  },
  SLOT_FB_CSS = "slot-fb{display:contents}slot-fb[hidden]{display:none}",
  XLINK_NS = "http://www.w3.org/1999/xlink",
  FORM_ASSOCIATED_CUSTOM_ELEMENT_CALLBACKS = [
    "formAssociatedCallback",
    "formResetCallback",
    "formDisabledCallback",
    "formStateRestoreCallback",
  ],
  EMPTY_OBJ = {},
  isComplexType = (e) => "object" == (e = typeof e) || "function" === e,
  h = (e, t, ...a) => {
    let o = null,
      s = null,
      n = null,
      l = !1,
      r = !1;
    const i = [],
      p = (t) => {
        for (let a = 0; a < t.length; a++)
          (o = t[a]),
            Array.isArray(o)
              ? p(o)
              : null != o &&
                "boolean" != typeof o &&
                ((l = "function" != typeof e && !isComplexType(o))
                  ? (o = String(o))
                  : appData.BUILD.isDev &&
                    "function" != typeof e &&
                    void 0 === o.$flags$ &&
                    consoleDevError(
                      "vNode passed as children has unexpected type.\nMake sure it's using the correct h() function.\nEmpty objects can also be the cause, look for JSX comments that became objects.",
                    ),
                l && r
                  ? (i[i.length - 1].$text$ += o)
                  : i.push(l ? newVNode(null, o) : o),
                (r = l));
      };
    if (
      (p(a),
      t &&
        (appData.BUILD.isDev && "input" === e && validateInputProperties(t),
        appData.BUILD.vdomKey && t.key && (s = t.key),
        appData.BUILD.slotRelocation && t.name && (n = t.name),
        appData.BUILD.vdomClass))
    ) {
      const e = t.className || t.class;
      e &&
        (t.class =
          "object" != typeof e
            ? e
            : Object.keys(e)
                .filter((t) => e[t])
                .join(" "));
    }
    if (
      (appData.BUILD.isDev &&
        i.some(isHost) &&
        consoleDevError(
          "The <Host> must be the single root component. Make sure:\n- You are NOT using hostData() and <Host> in the same component.\n- <Host> is used once, and it's the single root component of the render() function.",
        ),
      appData.BUILD.vdomFunctional && "function" == typeof e)
    )
      return e(null === t ? {} : t, i, vdomFnUtils);
    const d = newVNode(e, null);
    return (
      (d.$attrs$ = t),
      i.length > 0 && (d.$children$ = i),
      appData.BUILD.vdomKey && (d.$key$ = s),
      appData.BUILD.slotRelocation && (d.$name$ = n),
      d
    );
  },
  newVNode = (e, t) => {
    const a = {
      $flags$: 0,
      $tag$: e,
      $text$: t,
      $elm$: null,
      $children$: null,
    };
    return (
      appData.BUILD.vdomAttribute && (a.$attrs$ = null),
      appData.BUILD.vdomKey && (a.$key$ = null),
      appData.BUILD.slotRelocation && (a.$name$ = null),
      a
    );
  },
  Host = {},
  isHost = (e) => e && e.$tag$ === Host,
  vdomFnUtils = {
    forEach: (e, t) => e.map(convertToPublic).forEach(t),
    map: (e, t) => e.map(convertToPublic).map(t).map(convertToPrivate),
  },
  convertToPublic = (e) => ({
    vattrs: e.$attrs$,
    vchildren: e.$children$,
    vkey: e.$key$,
    vname: e.$name$,
    vtag: e.$tag$,
    vtext: e.$text$,
  }),
  convertToPrivate = (e) => {
    if ("function" == typeof e.vtag) {
      const t = { ...e.vattrs };
      return (
        e.vkey && (t.key = e.vkey),
        e.vname && (t.name = e.vname),
        h(e.vtag, t, ...(e.vchildren || []))
      );
    }
    const t = newVNode(e.vtag, e.vtext);
    return (
      (t.$attrs$ = e.vattrs),
      (t.$children$ = e.vchildren),
      (t.$key$ = e.vkey),
      (t.$name$ = e.vname),
      t
    );
  },
  validateInputProperties = (e) => {
    const t = Object.keys(e),
      a = t.indexOf("value");
    if (-1 === a) return;
    const o = t.indexOf("type"),
      s = t.indexOf("min"),
      n = t.indexOf("max"),
      l = t.indexOf("step");
    (a < o || a < s || a < n || a < l) &&
      consoleDevWarn(
        'The "value" prop of <input> should be set after "min", "max", "type" and "step"',
      );
  },
  clientHydrate = (e, t, a, o, s, n, l) => {
    let r, i, p, d;
    if (1 === n.nodeType) {
      for (
        r = n.getAttribute("c-id"),
          r &&
            ((i = r.split(".")),
            (i[0] !== l && "0" !== i[0]) ||
              ((p = {
                $flags$: 0,
                $hostId$: i[0],
                $nodeId$: i[1],
                $depth$: i[2],
                $index$: i[3],
                $tag$: n.tagName.toLowerCase(),
                $elm$: n,
                $attrs$: null,
                $children$: null,
                $key$: null,
                $name$: null,
                $text$: null,
              }),
              t.push(p),
              n.removeAttribute("c-id"),
              e.$children$ || (e.$children$ = []),
              (e.$children$[p.$index$] = p),
              (e = p),
              o && "0" === p.$depth$ && (o[p.$index$] = p.$elm$))),
          d = n.childNodes.length - 1;
        d >= 0;
        d--
      )
        clientHydrate(e, t, a, o, s, n.childNodes[d], l);
      if (n.shadowRoot)
        for (d = n.shadowRoot.childNodes.length - 1; d >= 0; d--)
          clientHydrate(e, t, a, o, s, n.shadowRoot.childNodes[d], l);
    } else if (8 === n.nodeType)
      (i = n.nodeValue.split(".")),
        (i[1] !== l && "0" !== i[1]) ||
          ((r = i[0]),
          (p = {
            $flags$: 0,
            $hostId$: i[1],
            $nodeId$: i[2],
            $depth$: i[3],
            $index$: i[4],
            $elm$: n,
            $attrs$: null,
            $children$: null,
            $key$: null,
            $name$: null,
            $tag$: null,
            $text$: null,
          }),
          "t" === r
            ? ((p.$elm$ = n.nextSibling),
              p.$elm$ &&
                3 === p.$elm$.nodeType &&
                ((p.$text$ = p.$elm$.textContent),
                t.push(p),
                n.remove(),
                e.$children$ || (e.$children$ = []),
                (e.$children$[p.$index$] = p),
                o && "0" === p.$depth$ && (o[p.$index$] = p.$elm$)))
            : p.$hostId$ === l &&
              ("s" === r
                ? ((p.$tag$ = "slot"),
                  i[5] ? (n["s-sn"] = p.$name$ = i[5]) : (n["s-sn"] = ""),
                  (n["s-sr"] = !0),
                  appData.BUILD.shadowDom &&
                    o &&
                    ((p.$elm$ = doc.createElement(p.$tag$)),
                    p.$name$ && p.$elm$.setAttribute("name", p.$name$),
                    n.parentNode.insertBefore(p.$elm$, n),
                    n.remove(),
                    "0" === p.$depth$ && (o[p.$index$] = p.$elm$)),
                  a.push(p),
                  e.$children$ || (e.$children$ = []),
                  (e.$children$[p.$index$] = p))
                : "r" === r &&
                  (appData.BUILD.shadowDom && o
                    ? n.remove()
                    : appData.BUILD.slotRelocation &&
                      ((s["s-cr"] = n), (n["s-cn"] = !0)))));
    else if (e && "style" === e.$tag$) {
      const t = newVNode(null, n.textContent);
      (t.$elm$ = n), (t.$index$ = "0"), (e.$children$ = [t]);
    }
  },
  initializeDocumentHydrate = (e, t) => {
    if (1 === e.nodeType) {
      let a = 0;
      for (; a < e.childNodes.length; a++)
        initializeDocumentHydrate(e.childNodes[a], t);
      if (e.shadowRoot)
        for (a = 0; a < e.shadowRoot.childNodes.length; a++)
          initializeDocumentHydrate(e.shadowRoot.childNodes[a], t);
    } else if (8 === e.nodeType) {
      const a = e.nodeValue.split(".");
      "o" === a[0] &&
        (t.set(a[1] + "." + a[2], e), (e.nodeValue = ""), (e["s-en"] = a[3]));
    }
  },
  computeMode = (e) => modeResolutionChain.map((t) => t(e)).find((e) => !!e),
  parsePropertyValue = (e, t) =>
    null == e || isComplexType(e)
      ? e
      : appData.BUILD.propBoolean && 4 & t
        ? "false" !== e && ("" === e || !!e)
        : appData.BUILD.propNumber && 2 & t
          ? parseFloat(e)
          : appData.BUILD.propString && 1 & t
            ? String(e)
            : e,
  getElement = (e) =>
    appData.BUILD.lazyLoad ? getHostRef(e).$hostElement$ : e,
  emitEvent = (e, t, a) => {
    const o = plt.ce(t, a);
    return e.dispatchEvent(o), o;
  },
  rootAppliedStyles = new WeakMap(),
  registerStyle = (e, t, a) => {
    let o = styles.get(e);
    (o = t), styles.set(e, o);
  },
  addStyle = (e, t, a) => {
    var o;
    const s = getScopeId(t, a),
      n = styles.get(s);
    if (!appData.BUILD.attachStyles) return s;
    if (((e = 11 === e.nodeType ? e : doc), n))
      if ("string" == typeof n) {
        e = e.head || e;
        let a,
          l = rootAppliedStyles.get(e);
        if ((l || rootAppliedStyles.set(e, (l = new Set())), !l.has(s))) {
          if (
            appData.BUILD.hydrateClientSide &&
            e.host &&
            (a = e.querySelector(`[sty-id="${s}"]`))
          )
            a.innerHTML = n;
          else {
            (a = doc.createElement("style")), (a.innerHTML = n);
            const t =
              null !== (o = plt.$nonce$) && void 0 !== o
                ? o
                : queryNonceMetaTagContent(doc);
            null != t && a.setAttribute("nonce", t),
              (appData.BUILD.hydrateServerSide ||
                appData.BUILD.hotModuleReplacement) &&
                a.setAttribute("sty-id", s),
              e.insertBefore(a, e.querySelector("link"));
          }
          4 & t.$flags$ && (a.innerHTML += SLOT_FB_CSS), l && l.add(s);
        }
      } else
        appData.BUILD.constructableCSS &&
          !e.adoptedStyleSheets.includes(n) &&
          (e.adoptedStyleSheets = [...e.adoptedStyleSheets, n]);
    return s;
  },
  attachStyles = (e) => {
    const t = e.$cmpMeta$,
      a = e.$hostElement$,
      o = t.$flags$,
      s = createTime("attachStyles", t.$tagName$),
      n = addStyle(
        appData.BUILD.shadowDom && exports.supportsShadow && a.shadowRoot
          ? a.shadowRoot
          : a.getRootNode(),
        t,
        e.$modeName$,
      );
    (appData.BUILD.shadowDom || appData.BUILD.scoped) &&
      appData.BUILD.cssAnnotations &&
      10 & o &&
      ((a["s-sc"] = n),
      a.classList.add(n + "-h"),
      appData.BUILD.scoped && 2 & o && a.classList.add(n + "-s")),
      s();
  },
  getScopeId = (e, t) =>
    "sc-" +
    (appData.BUILD.mode && t && 32 & e.$flags$
      ? e.$tagName$ + "-" + t
      : e.$tagName$),
  setAccessor = (e, t, a, o, s, n) => {
    if (a !== o) {
      let l = isMemberInElement(e, t),
        r = t.toLowerCase();
      if (appData.BUILD.vdomClass && "class" === t) {
        const t = e.classList,
          s = parseClassList(a),
          n = parseClassList(o);
        t.remove(...s.filter((e) => e && !n.includes(e))),
          t.add(...n.filter((e) => e && !s.includes(e)));
      } else if (appData.BUILD.vdomStyle && "style" === t) {
        if (appData.BUILD.updatable)
          for (const t in a)
            (o && null != o[t]) ||
              (!appData.BUILD.hydrateServerSide && t.includes("-")
                ? e.style.removeProperty(t)
                : (e.style[t] = ""));
        for (const t in o)
          (a && o[t] === a[t]) ||
            (!appData.BUILD.hydrateServerSide && t.includes("-")
              ? e.style.setProperty(t, o[t])
              : (e.style[t] = o[t]));
      } else if (appData.BUILD.vdomKey && "key" === t);
      else if (appData.BUILD.vdomRef && "ref" === t) o && o(e);
      else if (
        !appData.BUILD.vdomListener ||
        (appData.BUILD.lazyLoad ? l : e.__lookupSetter__(t)) ||
        "o" !== t[0] ||
        "n" !== t[1]
      ) {
        if (appData.BUILD.vdomPropOrAttr) {
          const i = isComplexType(o);
          if ((l || (i && null !== o)) && !s)
            try {
              if (e.tagName.includes("-")) e[t] = o;
              else {
                const s = null == o ? "" : o;
                "list" === t
                  ? (l = !1)
                  : (null != a && e[t] == s) || (e[t] = s);
              }
            } catch (e) {}
          let p = !1;
          appData.BUILD.vdomXlink &&
            r !== (r = r.replace(/^xlink\:?/, "")) &&
            ((t = r), (p = !0)),
            null == o || !1 === o
              ? (!1 === o && "" !== e.getAttribute(t)) ||
                (appData.BUILD.vdomXlink && p
                  ? e.removeAttributeNS(XLINK_NS, t)
                  : e.removeAttribute(t))
              : (!l || 4 & n || s) &&
                !i &&
                ((o = !0 === o ? "" : o),
                appData.BUILD.vdomXlink && p
                  ? e.setAttributeNS(XLINK_NS, t, o)
                  : e.setAttribute(t, o));
        }
      } else if (
        ((t =
          "-" === t[2]
            ? t.slice(3)
            : isMemberInElement(win, r)
              ? r.slice(2)
              : r[2] + t.slice(3)),
        a || o)
      ) {
        const s = t.endsWith(CAPTURE_EVENT_SUFFIX);
        (t = t.replace(CAPTURE_EVENT_REGEX, "")),
          a && plt.rel(e, t, a, s),
          o && plt.ael(e, t, o, s);
      }
    }
  },
  parseClassListRegex = /\s/,
  parseClassList = (e) => (e ? e.split(parseClassListRegex) : []),
  CAPTURE_EVENT_SUFFIX = "Capture",
  CAPTURE_EVENT_REGEX = new RegExp(CAPTURE_EVENT_SUFFIX + "$"),
  updateElement = (e, t, a, o) => {
    const s = 11 === t.$elm$.nodeType && t.$elm$.host ? t.$elm$.host : t.$elm$,
      n = (e && e.$attrs$) || EMPTY_OBJ,
      l = t.$attrs$ || EMPTY_OBJ;
    if (appData.BUILD.updatable)
      for (o of sortedAttrNames(Object.keys(n)))
        o in l || setAccessor(s, o, n[o], void 0, a, t.$flags$);
    for (o of sortedAttrNames(Object.keys(l)))
      setAccessor(s, o, n[o], l[o], a, t.$flags$);
  };
let scopeId,
  contentRef,
  hostTagName,
  useNativeShadowDom = !1,
  checkSlotFallbackVisibility = !1,
  checkSlotRelocate = !1,
  isSvgMode = !1;
const createElm = (e, t, a, o) => {
    var s;
    const n = t.$children$[a];
    let l,
      r,
      i,
      p = 0;
    if (
      (appData.BUILD.slotRelocation &&
        !useNativeShadowDom &&
        ((checkSlotRelocate = !0),
        "slot" === n.$tag$ &&
          (scopeId && o.classList.add(scopeId + "-s"),
          (n.$flags$ |= n.$children$ ? 2 : 1))),
      appData.BUILD.isDev &&
        n.$elm$ &&
        consoleDevError(
          `The JSX ${null !== n.$text$ ? `"${n.$text$}" text` : `"${n.$tag$}" element`} node should not be shared within the same renderer. The renderer caches element lookups in order to improve performance. However, a side effect from this is that the exact same JSX node should not be reused. For more information please see https://stenciljs.com/docs/templating-jsx#avoid-shared-jsx-nodes`,
        ),
      appData.BUILD.vdomText && null !== n.$text$)
    )
      l = n.$elm$ = doc.createTextNode(n.$text$);
    else if (appData.BUILD.slotRelocation && 1 & n.$flags$)
      l = n.$elm$ =
        appData.BUILD.isDebug || appData.BUILD.hydrateServerSide
          ? slotReferenceDebugNode(n)
          : doc.createTextNode("");
    else {
      if (
        (appData.BUILD.svg && !isSvgMode && (isSvgMode = "svg" === n.$tag$),
        (l = n.$elm$ =
          appData.BUILD.svg
            ? doc.createElementNS(
                isSvgMode
                  ? "http://www.w3.org/2000/svg"
                  : "http://www.w3.org/1999/xhtml",
                appData.BUILD.slotRelocation && 2 & n.$flags$
                  ? "slot-fb"
                  : n.$tag$,
              )
            : doc.createElement(
                appData.BUILD.slotRelocation && 2 & n.$flags$
                  ? "slot-fb"
                  : n.$tag$,
              )),
        appData.BUILD.svg &&
          isSvgMode &&
          "foreignObject" === n.$tag$ &&
          (isSvgMode = !1),
        appData.BUILD.vdomAttribute && updateElement(null, n, isSvgMode),
        (appData.BUILD.shadowDom || appData.BUILD.scoped) &&
          null != scopeId &&
          l["s-si"] !== scopeId &&
          l.classList.add((l["s-si"] = scopeId)),
        n.$children$)
      )
        for (p = 0; p < n.$children$.length; ++p)
          (r = createElm(e, n, p, l)), r && l.appendChild(r);
      appData.BUILD.svg &&
        ("svg" === n.$tag$
          ? (isSvgMode = !1)
          : "foreignObject" === l.tagName && (isSvgMode = !0));
    }
    return (
      (l["s-hn"] = hostTagName),
      appData.BUILD.slotRelocation &&
        3 & n.$flags$ &&
        ((l["s-sr"] = !0),
        (l["s-cr"] = contentRef),
        (l["s-sn"] = n.$name$ || ""),
        (l["s-rf"] = null === (s = n.$attrs$) || void 0 === s ? void 0 : s.ref),
        (i = e && e.$children$ && e.$children$[a]),
        i &&
          i.$tag$ === n.$tag$ &&
          e.$elm$ &&
          (appData.BUILD.experimentalSlotFixes
            ? relocateToHostRoot(e.$elm$)
            : putBackInOriginalLocation(e.$elm$, !1))),
      l
    );
  },
  relocateToHostRoot = (e) => {
    plt.$flags$ |= 1;
    const t = e.closest(hostTagName.toLowerCase());
    if (null != t) {
      const a = Array.from(t.childNodes).find((e) => e["s-cr"]),
        o = Array.from(e.childNodes);
      for (const e of a ? o.reverse() : o)
        null != e["s-sh"] &&
          (t.insertBefore(e, null != a ? a : null),
          (e["s-sh"] = void 0),
          (checkSlotRelocate = !0));
    }
    plt.$flags$ &= -2;
  },
  putBackInOriginalLocation = (e, t) => {
    plt.$flags$ |= 1;
    const a = Array.from(e.childNodes);
    if (e["s-sr"] && appData.BUILD.experimentalSlotFixes) {
      let t = e;
      for (; (t = t.nextSibling); )
        t && t["s-sn"] === e["s-sn"] && t["s-sh"] === hostTagName && a.push(t);
    }
    for (let e = a.length - 1; e >= 0; e--) {
      const o = a[e];
      o["s-hn"] !== hostTagName &&
        o["s-ol"] &&
        (parentReferenceNode(o).insertBefore(o, referenceNode(o)),
        o["s-ol"].remove(),
        (o["s-ol"] = void 0),
        (o["s-sh"] = void 0),
        (checkSlotRelocate = !0)),
        t && putBackInOriginalLocation(o, t);
    }
    plt.$flags$ &= -2;
  },
  addVnodes = (e, t, a, o, s, n) => {
    let l,
      r =
        (appData.BUILD.slotRelocation && e["s-cr"] && e["s-cr"].parentNode) ||
        e;
    for (
      appData.BUILD.shadowDom &&
      r.shadowRoot &&
      r.tagName === hostTagName &&
      (r = r.shadowRoot);
      s <= n;
      ++s
    )
      o[s] &&
        ((l = createElm(null, a, s, e)),
        l &&
          ((o[s].$elm$ = l),
          r.insertBefore(
            l,
            appData.BUILD.slotRelocation ? referenceNode(t) : t,
          )));
  },
  removeVnodes = (e, t, a) => {
    for (let o = t; o <= a; ++o) {
      const t = e[o];
      if (t) {
        const e = t.$elm$;
        nullifyVNodeRefs(t),
          e &&
            (appData.BUILD.slotRelocation &&
              ((checkSlotFallbackVisibility = !0),
              e["s-ol"]
                ? e["s-ol"].remove()
                : putBackInOriginalLocation(e, !0)),
            e.remove());
      }
    }
  },
  isSameVnode = (e, t, a = !1) =>
    e.$tag$ === t.$tag$ &&
    (appData.BUILD.slotRelocation && "slot" === e.$tag$
      ? e.$name$ === t.$name$
      : !(appData.BUILD.vdomKey && !a) || e.$key$ === t.$key$),
  referenceNode = (e) => (e && e["s-ol"]) || e,
  parentReferenceNode = (e) => (e["s-ol"] ? e["s-ol"] : e).parentNode,
  patch = (e, t, a = !1) => {
    const o = (t.$elm$ = e.$elm$),
      s = e.$children$,
      n = t.$children$,
      l = t.$tag$,
      r = t.$text$;
    let i;
    appData.BUILD.vdomText && null !== r
      ? appData.BUILD.vdomText &&
        appData.BUILD.slotRelocation &&
        (i = o["s-cr"])
        ? (i.parentNode.textContent = r)
        : appData.BUILD.vdomText && e.$text$ !== r && (o.data = r)
      : (appData.BUILD.svg &&
          (isSvgMode = "svg" === l || ("foreignObject" !== l && isSvgMode)),
        (appData.BUILD.vdomAttribute || appData.BUILD.reflect) &&
          (appData.BUILD.slot && "slot" === l && !useNativeShadowDom
            ? appData.BUILD.experimentalSlotFixes &&
              e.$name$ !== t.$name$ &&
              ((t.$elm$["s-sn"] = t.$name$ || ""),
              relocateToHostRoot(t.$elm$.parentElement))
            : updateElement(e, t, isSvgMode)),
        appData.BUILD.updatable && null !== s && null !== n
          ? ((e, t, a, o, s = !1) => {
              let n,
                l,
                r = 0,
                i = 0,
                p = 0,
                d = 0,
                c = t.length - 1,
                $ = t[0],
                u = t[c],
                h = o.length - 1,
                m = o[0],
                f = o[h];
              for (; r <= c && i <= h; )
                if (null == $) $ = t[++r];
                else if (null == u) u = t[--c];
                else if (null == m) m = o[++i];
                else if (null == f) f = o[--h];
                else if (isSameVnode($, m, s))
                  patch($, m, s), ($ = t[++r]), (m = o[++i]);
                else if (isSameVnode(u, f, s))
                  patch(u, f, s), (u = t[--c]), (f = o[--h]);
                else if (isSameVnode($, f, s))
                  !appData.BUILD.slotRelocation ||
                    ("slot" !== $.$tag$ && "slot" !== f.$tag$) ||
                    putBackInOriginalLocation($.$elm$.parentNode, !1),
                    patch($, f, s),
                    e.insertBefore($.$elm$, u.$elm$.nextSibling),
                    ($ = t[++r]),
                    (f = o[--h]);
                else if (isSameVnode(u, m, s))
                  !appData.BUILD.slotRelocation ||
                    ("slot" !== $.$tag$ && "slot" !== f.$tag$) ||
                    putBackInOriginalLocation(u.$elm$.parentNode, !1),
                    patch(u, m, s),
                    e.insertBefore(u.$elm$, $.$elm$),
                    (u = t[--c]),
                    (m = o[++i]);
                else {
                  if (((p = -1), appData.BUILD.vdomKey))
                    for (d = r; d <= c; ++d)
                      if (
                        t[d] &&
                        null !== t[d].$key$ &&
                        t[d].$key$ === m.$key$
                      ) {
                        p = d;
                        break;
                      }
                  appData.BUILD.vdomKey && p >= 0
                    ? ((l = t[p]),
                      l.$tag$ !== m.$tag$
                        ? (n = createElm(t && t[i], a, p, e))
                        : (patch(l, m, s), (t[p] = void 0), (n = l.$elm$)),
                      (m = o[++i]))
                    : ((n = createElm(t && t[i], a, i, e)), (m = o[++i])),
                    n &&
                      (appData.BUILD.slotRelocation
                        ? parentReferenceNode($.$elm$).insertBefore(
                            n,
                            referenceNode($.$elm$),
                          )
                        : $.$elm$.parentNode.insertBefore(n, $.$elm$));
                }
              r > c
                ? addVnodes(
                    e,
                    null == o[h + 1] ? null : o[h + 1].$elm$,
                    a,
                    o,
                    i,
                    h,
                  )
                : appData.BUILD.updatable && i > h && removeVnodes(t, r, c);
            })(o, s, t, n, a)
          : null !== n
            ? (appData.BUILD.updatable &&
                appData.BUILD.vdomText &&
                null !== e.$text$ &&
                (o.textContent = ""),
              addVnodes(o, null, t, n, 0, n.length - 1))
            : appData.BUILD.updatable &&
              null !== s &&
              removeVnodes(s, 0, s.length - 1),
        appData.BUILD.svg && isSvgMode && "svg" === l && (isSvgMode = !1));
  },
  updateFallbackSlotVisibility = (e) => {
    const t = e.childNodes;
    for (const e of t)
      if (1 === e.nodeType) {
        if (e["s-sr"]) {
          const a = e["s-sn"];
          e.hidden = !1;
          for (const o of t)
            if (o !== e)
              if (o["s-hn"] !== e["s-hn"] || "" !== a) {
                if (
                  1 === o.nodeType &&
                  (a === o.getAttribute("slot") || a === o["s-sn"])
                ) {
                  e.hidden = !0;
                  break;
                }
              } else if (
                1 === o.nodeType ||
                (3 === o.nodeType && "" !== o.textContent.trim())
              ) {
                e.hidden = !0;
                break;
              }
        }
        updateFallbackSlotVisibility(e);
      }
  },
  relocateNodes = [],
  markSlotContentForRelocation = (e) => {
    let t, a, o;
    for (const s of e.childNodes) {
      if (s["s-sr"] && (t = s["s-cr"]) && t.parentNode) {
        a = t.parentNode.childNodes;
        const e = s["s-sn"];
        for (o = a.length - 1; o >= 0; o--)
          if (
            ((t = a[o]),
            !(
              t["s-cn"] ||
              t["s-nr"] ||
              t["s-hn"] === s["s-hn"] ||
              (appData.BUILD.experimentalSlotFixes &&
                t["s-sh"] &&
                t["s-sh"] === s["s-hn"])
            ))
          )
            if (isNodeLocatedInSlot(t, e)) {
              let a = relocateNodes.find((e) => e.$nodeToRelocate$ === t);
              (checkSlotFallbackVisibility = !0),
                (t["s-sn"] = t["s-sn"] || e),
                a
                  ? ((a.$nodeToRelocate$["s-sh"] = s["s-hn"]),
                    (a.$slotRefNode$ = s))
                  : ((t["s-sh"] = s["s-hn"]),
                    relocateNodes.push({
                      $slotRefNode$: s,
                      $nodeToRelocate$: t,
                    })),
                t["s-sr"] &&
                  relocateNodes.map((e) => {
                    isNodeLocatedInSlot(e.$nodeToRelocate$, t["s-sn"]) &&
                      ((a = relocateNodes.find(
                        (e) => e.$nodeToRelocate$ === t,
                      )),
                      a &&
                        !e.$slotRefNode$ &&
                        (e.$slotRefNode$ = a.$slotRefNode$));
                  });
            } else
              relocateNodes.some((e) => e.$nodeToRelocate$ === t) ||
                relocateNodes.push({ $nodeToRelocate$: t });
      }
      1 === s.nodeType && markSlotContentForRelocation(s);
    }
  },
  isNodeLocatedInSlot = (e, t) =>
    1 === e.nodeType
      ? (null === e.getAttribute("slot") && "" === t) ||
        e.getAttribute("slot") === t
      : e["s-sn"] === t || "" === t,
  nullifyVNodeRefs = (e) => {
    appData.BUILD.vdomRef &&
      (e.$attrs$ && e.$attrs$.ref && e.$attrs$.ref(null),
      e.$children$ && e.$children$.map(nullifyVNodeRefs));
  },
  renderVdom = (e, t, a = !1) => {
    var o, s, n, l, r;
    const i = e.$hostElement$,
      p = e.$cmpMeta$,
      d = e.$vnode$ || newVNode(null, null),
      c = isHost(t) ? t : h(null, null, t);
    if (
      ((hostTagName = i.tagName),
      appData.BUILD.isDev && Array.isArray(t) && t.some(isHost))
    )
      throw new Error(
        `The <Host> must be the single root component.\nLooks like the render() function of "${hostTagName.toLowerCase()}" is returning an array that contains the <Host>.\n\nThe render() function should look like this instead:\n\nrender() {\n  // Do not return an array\n  return (\n    <Host>{content}</Host>\n  );\n}\n  `,
      );
    if (
      (appData.BUILD.reflect &&
        p.$attrsToReflect$ &&
        ((c.$attrs$ = c.$attrs$ || {}),
        p.$attrsToReflect$.map(([e, t]) => (c.$attrs$[t] = i[e]))),
      a && c.$attrs$)
    )
      for (const e of Object.keys(c.$attrs$))
        i.hasAttribute(e) &&
          !["key", "ref", "style", "class"].includes(e) &&
          (c.$attrs$[e] = i[e]);
    if (
      ((c.$tag$ = null),
      (c.$flags$ |= 4),
      (e.$vnode$ = c),
      (c.$elm$ = d.$elm$ = (appData.BUILD.shadowDom && i.shadowRoot) || i),
      (appData.BUILD.scoped || appData.BUILD.shadowDom) &&
        (scopeId = i["s-sc"]),
      (useNativeShadowDom = exports.supportsShadow && !!(1 & p.$flags$)),
      appData.BUILD.slotRelocation &&
        ((contentRef = i["s-cr"]), (checkSlotFallbackVisibility = !1)),
      patch(d, c, a),
      appData.BUILD.slotRelocation)
    ) {
      if (((plt.$flags$ |= 1), checkSlotRelocate)) {
        markSlotContentForRelocation(c.$elm$);
        for (const e of relocateNodes) {
          const t = e.$nodeToRelocate$;
          if (!t["s-ol"]) {
            const e =
              appData.BUILD.isDebug || appData.BUILD.hydrateServerSide
                ? originalLocationDebugNode(t)
                : doc.createTextNode("");
            (e["s-nr"] = t), t.parentNode.insertBefore((t["s-ol"] = e), t);
          }
        }
        for (const e of relocateNodes) {
          const t = e.$nodeToRelocate$,
            r = e.$slotRefNode$;
          if (r) {
            const e = r.parentNode;
            let a = r.nextSibling;
            if (
              !appData.BUILD.experimentalSlotFixes ||
              (a && 1 === a.nodeType)
            ) {
              let n =
                null === (o = t["s-ol"]) || void 0 === o
                  ? void 0
                  : o.previousSibling;
              for (; n; ) {
                let o = null !== (s = n["s-nr"]) && void 0 !== s ? s : null;
                if (o && o["s-sn"] === t["s-sn"] && e === o.parentNode) {
                  for (
                    o = o.nextSibling;
                    o === t || (null == o ? void 0 : o["s-sr"]);

                  )
                    o = null == o ? void 0 : o.nextSibling;
                  if (!o || !o["s-nr"]) {
                    a = o;
                    break;
                  }
                }
                n = n.previousSibling;
              }
            }
            ((!a && e !== t.parentNode) || t.nextSibling !== a) &&
              t !== a &&
              (appData.BUILD.experimentalSlotFixes ||
                t["s-hn"] ||
                !t["s-ol"] ||
                (t["s-hn"] = t["s-ol"].parentNode.nodeName),
              e.insertBefore(t, a),
              1 === t.nodeType &&
                (t.hidden = null !== (n = t["s-ih"]) && void 0 !== n && n)),
              t && "function" == typeof r["s-rf"] && r["s-rf"](t);
          } else
            1 === t.nodeType &&
              (a && (t["s-ih"] = null !== (l = t.hidden) && void 0 !== l && l),
              (t.hidden = !0));
        }
      }
      checkSlotFallbackVisibility && updateFallbackSlotVisibility(c.$elm$),
        (plt.$flags$ &= -2),
        (relocateNodes.length = 0);
    }
    if (appData.BUILD.experimentalScopedSlotChanges && 2 & p.$flags$)
      for (const e of c.$elm$.childNodes)
        e["s-hn"] === hostTagName ||
          e["s-sh"] ||
          (a &&
            null == e["s-ih"] &&
            (e["s-ih"] = null !== (r = e.hidden) && void 0 !== r && r),
          (e.hidden = !0));
    contentRef = void 0;
  },
  slotReferenceDebugNode = (e) =>
    doc.createComment(
      `<slot${e.$name$ ? ' name="' + e.$name$ + '"' : ""}> (host=${hostTagName.toLowerCase()})`,
    ),
  originalLocationDebugNode = (e) =>
    doc.createComment(
      "org-location for " +
        (e.localName
          ? `<${e.localName}> (host=${e["s-hn"]})`
          : `[${e.textContent}]`),
    ),
  attachToAncestor = (e, t) => {
    appData.BUILD.asyncLoading &&
      t &&
      !e.$onRenderResolve$ &&
      t["s-p"] &&
      t["s-p"].push(new Promise((t) => (e.$onRenderResolve$ = t)));
  },
  scheduleUpdate = (e, t) => {
    if (
      (appData.BUILD.taskQueue && appData.BUILD.updatable && (e.$flags$ |= 16),
      appData.BUILD.asyncLoading && 4 & e.$flags$)
    )
      return void (e.$flags$ |= 512);
    attachToAncestor(e, e.$ancestorComponent$);
    const a = () => dispatchHooks(e, t);
    return appData.BUILD.taskQueue ? writeTask(a) : a();
  },
  dispatchHooks = (e, t) => {
    const a = e.$hostElement$,
      o = createTime("scheduleUpdate", e.$cmpMeta$.$tagName$),
      s = appData.BUILD.lazyLoad ? e.$lazyInstance$ : a;
    let n;
    return (
      t
        ? (appData.BUILD.lazyLoad &&
            appData.BUILD.hostListener &&
            ((e.$flags$ |= 256),
            e.$queuedListeners$ &&
              (e.$queuedListeners$.map(([e, t]) => safeCall(s, e, t)),
              (e.$queuedListeners$ = void 0))),
          emitLifecycleEvent(a, "componentWillLoad"),
          appData.BUILD.cmpWillLoad && (n = safeCall(s, "componentWillLoad")))
        : (emitLifecycleEvent(a, "componentWillUpdate"),
          appData.BUILD.cmpWillUpdate &&
            (n = safeCall(s, "componentWillUpdate"))),
      emitLifecycleEvent(a, "componentWillRender"),
      appData.BUILD.cmpWillRender &&
        (n = enqueue(n, () => safeCall(s, "componentWillRender"))),
      o(),
      enqueue(n, () => updateComponent(e, s, t))
    );
  },
  enqueue = (e, t) => (isPromisey(e) ? e.then(t) : t()),
  isPromisey = (e) =>
    e instanceof Promise || (e && e.then && "function" == typeof e.then),
  updateComponent = async (e, t, a) => {
    var o;
    const s = e.$hostElement$,
      n = createTime("update", e.$cmpMeta$.$tagName$),
      l = s["s-rc"];
    appData.BUILD.style && a && attachStyles(e);
    const r = createTime("render", e.$cmpMeta$.$tagName$);
    if (
      (appData.BUILD.isDev && (e.$flags$ |= 1024),
      appData.BUILD.hydrateServerSide
        ? await callRender(e, t, s, a)
        : callRender(e, t, s, a),
      appData.BUILD.isDev &&
        ((e.$renderCount$ =
          void 0 === e.$renderCount$ ? 1 : e.$renderCount$ + 1),
        (e.$flags$ &= -1025)),
      appData.BUILD.hydrateServerSide)
    )
      try {
        serverSideConnected(s),
          a &&
            (1 & e.$cmpMeta$.$flags$
              ? (s["s-en"] = "")
              : 2 & e.$cmpMeta$.$flags$ && (s["s-en"] = "c"));
      } catch (e) {
        consoleError(e, s);
      }
    if (
      (appData.BUILD.asyncLoading &&
        l &&
        (l.map((e) => e()), (s["s-rc"] = void 0)),
      r(),
      n(),
      appData.BUILD.asyncLoading)
    ) {
      const t = null !== (o = s["s-p"]) && void 0 !== o ? o : [],
        a = () => postUpdateComponent(e);
      0 === t.length
        ? a()
        : (Promise.all(t).then(a), (e.$flags$ |= 4), (t.length = 0));
    } else postUpdateComponent(e);
  };
let renderingRef = null;
const callRender = (e, t, a, o) => {
    const s = !!appData.BUILD.allRenderFn,
      n = !!appData.BUILD.lazyLoad,
      l = !!appData.BUILD.taskQueue,
      r = !!appData.BUILD.updatable;
    try {
      if (
        ((renderingRef = t),
        (t = (s || t.render) && t.render()),
        r && l && (e.$flags$ &= -17),
        (r || n) && (e.$flags$ |= 2),
        appData.BUILD.hasRenderFn || appData.BUILD.reflect)
      )
        if (appData.BUILD.vdomRender || appData.BUILD.reflect) {
          if (appData.BUILD.hydrateServerSide)
            return Promise.resolve(t).then((t) => renderVdom(e, t, o));
          renderVdom(e, t, o);
        } else {
          const o = a.shadowRoot;
          1 & e.$cmpMeta$.$flags$ ? (o.textContent = t) : (a.textContent = t);
        }
    } catch (t) {
      consoleError(t, e.$hostElement$);
    }
    return (renderingRef = null), null;
  },
  postUpdateComponent = (e) => {
    const t = e.$cmpMeta$.$tagName$,
      a = e.$hostElement$,
      o = createTime("postUpdate", t),
      s = appData.BUILD.lazyLoad ? e.$lazyInstance$ : a,
      n = e.$ancestorComponent$;
    appData.BUILD.cmpDidRender &&
      (appData.BUILD.isDev && (e.$flags$ |= 1024),
      safeCall(s, "componentDidRender"),
      appData.BUILD.isDev && (e.$flags$ &= -1025)),
      emitLifecycleEvent(a, "componentDidRender"),
      64 & e.$flags$
        ? (appData.BUILD.cmpDidUpdate &&
            (appData.BUILD.isDev && (e.$flags$ |= 1024),
            safeCall(s, "componentDidUpdate"),
            appData.BUILD.isDev && (e.$flags$ &= -1025)),
          emitLifecycleEvent(a, "componentDidUpdate"),
          o())
        : ((e.$flags$ |= 64),
          appData.BUILD.asyncLoading &&
            appData.BUILD.cssAnnotations &&
            addHydratedFlag(a),
          appData.BUILD.cmpDidLoad &&
            (appData.BUILD.isDev && (e.$flags$ |= 2048),
            safeCall(s, "componentDidLoad"),
            appData.BUILD.isDev && (e.$flags$ &= -2049)),
          emitLifecycleEvent(a, "componentDidLoad"),
          o(),
          appData.BUILD.asyncLoading &&
            (e.$onReadyResolve$(a), n || appDidLoad(t))),
      appData.BUILD.method &&
        appData.BUILD.lazyLoad &&
        e.$onInstanceResolve$(a),
      appData.BUILD.asyncLoading &&
        (e.$onRenderResolve$ &&
          (e.$onRenderResolve$(), (e.$onRenderResolve$ = void 0)),
        512 & e.$flags$ && nextTick(() => scheduleUpdate(e, !1)),
        (e.$flags$ &= -517));
  },
  forceUpdate = (e) => {
    if (appData.BUILD.updatable && (Build.isBrowser || Build.isTesting)) {
      const t = getHostRef(e),
        a = t.$hostElement$.isConnected;
      return a && 2 == (18 & t.$flags$) && scheduleUpdate(t, !1), a;
    }
    return !1;
  },
  appDidLoad = (e) => {
    appData.BUILD.cssAnnotations && addHydratedFlag(doc.documentElement),
      appData.BUILD.asyncQueue && (plt.$flags$ |= 2),
      nextTick(() =>
        emitEvent(win, "appload", { detail: { namespace: appData.NAMESPACE } }),
      ),
      appData.BUILD.profile &&
        performance.measure &&
        performance.measure(
          `[Stencil] ${appData.NAMESPACE} initial load (by ${e})`,
          "st:app:start",
        );
  },
  safeCall = (e, t, a) => {
    if (e && e[t])
      try {
        return e[t](a);
      } catch (e) {
        consoleError(e);
      }
  },
  emitLifecycleEvent = (e, t) => {
    appData.BUILD.lifecycleDOMEvents &&
      emitEvent(e, "stencil_" + t, {
        bubbles: !0,
        composed: !0,
        detail: { namespace: appData.NAMESPACE },
      });
  },
  addHydratedFlag = (e) =>
    appData.BUILD.hydratedClass
      ? e.classList.add("hydrated")
      : appData.BUILD.hydratedAttribute
        ? e.setAttribute("hydrated", "")
        : void 0,
  serverSideConnected = (e) => {
    const t = e.children;
    if (null != t)
      for (let e = 0, a = t.length; e < a; e++) {
        const a = t[e];
        "function" == typeof a.connectedCallback && a.connectedCallback(),
          serverSideConnected(a);
      }
  },
  getValue = (e, t) => getHostRef(e).$instanceValues$.get(t),
  setValue = (e, t, a, o) => {
    const s = getHostRef(e),
      n = appData.BUILD.lazyLoad ? s.$hostElement$ : e,
      l = s.$instanceValues$.get(t),
      r = s.$flags$,
      i = appData.BUILD.lazyLoad ? s.$lazyInstance$ : n;
    a = parsePropertyValue(a, o.$members$[t][0]);
    const p = Number.isNaN(l) && Number.isNaN(a),
      d = a !== l && !p;
    if (
      (!appData.BUILD.lazyLoad || !(8 & r) || void 0 === l) &&
      d &&
      (s.$instanceValues$.set(t, a),
      appData.BUILD.isDev &&
        (1024 & s.$flags$
          ? consoleDevWarn(
              `The state/prop "${t}" changed during rendering. This can potentially lead to infinite-loops and other bugs.`,
              "\nElement",
              n,
              "\nNew value",
              a,
              "\nOld value",
              l,
            )
          : 2048 & s.$flags$ &&
            consoleDevWarn(
              `The state/prop "${t}" changed during "componentDidLoad()", this triggers extra re-renders, try to setup on "componentWillLoad()"`,
              "\nElement",
              n,
              "\nNew value",
              a,
              "\nOld value",
              l,
            )),
      !appData.BUILD.lazyLoad || i)
    ) {
      if (appData.BUILD.watchCallback && o.$watchers$ && 128 & r) {
        const e = o.$watchers$[t];
        e &&
          e.map((e) => {
            try {
              i[e](a, l, t);
            } catch (e) {
              consoleError(e, n);
            }
          });
      }
      if (appData.BUILD.updatable && 2 == (18 & r)) {
        if (
          appData.BUILD.cmpShouldUpdate &&
          i.componentShouldUpdate &&
          !1 === i.componentShouldUpdate(a, l, t)
        )
          return;
        scheduleUpdate(s, !1);
      }
    }
  },
  proxyComponent = (e, t, a) => {
    var o;
    const s = e.prototype;
    if (
      (appData.BUILD.formAssociated &&
        64 & t.$flags$ &&
        1 & a &&
        FORM_ASSOCIATED_CUSTOM_ELEMENT_CALLBACKS.forEach((e) =>
          Object.defineProperty(s, e, {
            value(...t) {
              const a = getHostRef(this),
                o = appData.BUILD.lazyLoad ? a.$hostElement$ : this,
                s = appData.BUILD.lazyLoad ? a.$lazyInstance$ : o;
              if (s) {
                const a = s[e];
                "function" == typeof a && a.call(s, ...t);
              } else
                a.$onReadyPromise$.then((a) => {
                  const o = a[e];
                  "function" == typeof o && o.call(a, ...t);
                });
            },
          }),
        ),
      appData.BUILD.member && t.$members$)
    ) {
      appData.BUILD.watchCallback && e.watchers && (t.$watchers$ = e.watchers);
      const n = Object.entries(t.$members$);
      if (
        (n.map(([e, [o]]) => {
          (appData.BUILD.prop || appData.BUILD.state) &&
          (31 & o || ((!appData.BUILD.lazyLoad || 2 & a) && 32 & o))
            ? Object.defineProperty(s, e, {
                get() {
                  return getValue(this, e);
                },
                set(s) {
                  if (appData.BUILD.isDev) {
                    const s = getHostRef(this);
                    1 & a ||
                      0 !== (s && 8 & s.$flags$) ||
                      !(31 & o) ||
                      1024 & o ||
                      consoleDevWarn(
                        `@Prop() "${e}" on <${t.$tagName$}> is immutable but was modified from within the component.\nMore information: https://stenciljs.com/docs/properties#prop-mutability`,
                      );
                  }
                  setValue(this, e, s, t);
                },
                configurable: !0,
                enumerable: !0,
              })
            : appData.BUILD.lazyLoad &&
              appData.BUILD.method &&
              1 & a &&
              64 & o &&
              Object.defineProperty(s, e, {
                value(...t) {
                  var a;
                  const o = getHostRef(this);
                  return null ===
                    (a = null == o ? void 0 : o.$onInstancePromise$) ||
                    void 0 === a
                    ? void 0
                    : a.then(() => {
                        var a;
                        return null === (a = o.$lazyInstance$) || void 0 === a
                          ? void 0
                          : a[e](...t);
                      });
                },
              });
        }),
        appData.BUILD.observeAttribute && (!appData.BUILD.lazyLoad || 1 & a))
      ) {
        const a = new Map();
        (s.attributeChangedCallback = function (e, o, n) {
          plt.jmp(() => {
            var l;
            const r = a.get(e);
            if (this.hasOwnProperty(r)) (n = this[r]), delete this[r];
            else {
              if (
                s.hasOwnProperty(r) &&
                "number" == typeof this[r] &&
                this[r] == n
              )
                return;
              if (null == r) {
                const a = getHostRef(this),
                  s = null == a ? void 0 : a.$flags$;
                if (s && !(8 & s) && 128 & s && n !== o) {
                  const s = appData.BUILD.lazyLoad ? a.$hostElement$ : this,
                    r = appData.BUILD.lazyLoad ? a.$lazyInstance$ : s,
                    i =
                      null === (l = t.$watchers$) || void 0 === l
                        ? void 0
                        : l[e];
                  null == i ||
                    i.forEach((t) => {
                      null != r[t] && r[t].call(r, n, o, e);
                    });
                }
                return;
              }
            }
            this[r] = (null !== n || "boolean" != typeof this[r]) && n;
          });
        }),
          (e.observedAttributes = Array.from(
            new Set([
              ...Object.keys(
                null !== (o = t.$watchers$) && void 0 !== o ? o : {},
              ),
              ...n
                .filter(([e, t]) => 15 & t[0])
                .map(([e, o]) => {
                  var s;
                  const n = o[1] || e;
                  return (
                    a.set(n, e),
                    appData.BUILD.reflect &&
                      512 & o[0] &&
                      (null === (s = t.$attrsToReflect$) ||
                        void 0 === s ||
                        s.push([e, n])),
                    n
                  );
                }),
            ]),
          ));
      }
    }
    return e;
  },
  initializeComponent = async (e, t, a, o) => {
    let s;
    if (!(32 & t.$flags$)) {
      t.$flags$ |= 32;
      const o = a.$lazyBundleId$;
      if ((appData.BUILD.lazyLoad || appData.BUILD.hydrateClientSide) && o) {
        if (((s = loadModule(a)), s.then)) {
          const e =
            ((n = `st:load:${a.$tagName$}:${t.$modeName$}`),
            (l = `[Stencil] Load module for <${a.$tagName$}>`),
            appData.BUILD.profile && performance.mark
              ? (0 === performance.getEntriesByName(n, "mark").length &&
                  performance.mark(n),
                () => {
                  0 === performance.getEntriesByName(l, "measure").length &&
                    performance.measure(l, n);
                })
              : () => {});
          (s = await s), e();
        }
        if ((appData.BUILD.isDev || appData.BUILD.isDebug) && !s)
          throw new Error(
            `Constructor for "${a.$tagName$}#${t.$modeName$}" was not found`,
          );
        appData.BUILD.member &&
          !s.isProxied &&
          (appData.BUILD.watchCallback && (a.$watchers$ = s.watchers),
          proxyComponent(s, a, 2),
          (s.isProxied = !0));
        const e = createTime("createInstance", a.$tagName$);
        appData.BUILD.member && (t.$flags$ |= 8);
        try {
          new s(t);
        } catch (e) {
          consoleError(e);
        }
        appData.BUILD.member && (t.$flags$ &= -9),
          appData.BUILD.watchCallback && (t.$flags$ |= 128),
          e(),
          fireConnectedCallback(t.$lazyInstance$);
      } else
        (s = e.constructor),
          customElements
            .whenDefined(a.$tagName$)
            .then(() => (t.$flags$ |= 128));
      if (appData.BUILD.style && s.style) {
        let o = s.style;
        appData.BUILD.mode &&
          "string" != typeof o &&
          ((o = o[(t.$modeName$ = computeMode(e))]),
          appData.BUILD.hydrateServerSide &&
            t.$modeName$ &&
            e.setAttribute("s-mode", t.$modeName$));
        const n = getScopeId(a, t.$modeName$);
        if (!styles.has(n)) {
          const e = createTime("registerStyles", a.$tagName$);
          !appData.BUILD.hydrateServerSide &&
            appData.BUILD.shadowDom &&
            appData.BUILD.shadowDomShim &&
            8 & a.$flags$ &&
            (o = await Promise.resolve()
              .then(function () {
                return require("./shadow-css.js");
              })
              .then((e) => e.scopeCss(o, n, !1))),
            registerStyle(n, o, a.$flags$),
            e();
        }
      }
    }
    var n, l;
    const r = t.$ancestorComponent$,
      i = () => scheduleUpdate(t, !0);
    appData.BUILD.asyncLoading && r && r["s-rc"] ? r["s-rc"].push(i) : i();
  },
  fireConnectedCallback = (e) => {
    appData.BUILD.lazyLoad &&
      appData.BUILD.connectedCallback &&
      safeCall(e, "connectedCallback");
  },
  connectedCallback = (e) => {
    if (!(1 & plt.$flags$)) {
      const t = getHostRef(e),
        a = t.$cmpMeta$,
        o = createTime("connectedCallback", a.$tagName$);
      if (
        (appData.BUILD.hostListenerTargetParent &&
          addHostEventListeners(e, t, a.$listeners$, !0),
        1 & t.$flags$)
      )
        addHostEventListeners(e, t, a.$listeners$, !1),
          (null == t ? void 0 : t.$lazyInstance$)
            ? fireConnectedCallback(t.$lazyInstance$)
            : (null == t ? void 0 : t.$onReadyPromise$) &&
              t.$onReadyPromise$.then(() =>
                fireConnectedCallback(t.$lazyInstance$),
              );
      else {
        let o;
        if (
          ((t.$flags$ |= 1),
          appData.BUILD.hydrateClientSide && ((o = e.getAttribute("s-id")), o))
        ) {
          if (
            appData.BUILD.shadowDom &&
            exports.supportsShadow &&
            1 & a.$flags$
          ) {
            const t = appData.BUILD.mode
              ? addStyle(e.shadowRoot, a, e.getAttribute("s-mode"))
              : addStyle(e.shadowRoot, a);
            e.classList.remove(t + "-h", t + "-s");
          }
          ((e, t, a, o) => {
            const s = createTime("hydrateClient", t),
              n = e.shadowRoot,
              l = [],
              r = appData.BUILD.shadowDom && n ? [] : null,
              i = (o.$vnode$ = newVNode(t, null));
            plt.$orgLocNodes$ ||
              initializeDocumentHydrate(
                doc.body,
                (plt.$orgLocNodes$ = new Map()),
              ),
              (e["s-id"] = a),
              e.removeAttribute("s-id"),
              clientHydrate(i, l, [], r, e, e, a),
              l.map((e) => {
                const a = e.$hostId$ + "." + e.$nodeId$,
                  o = plt.$orgLocNodes$.get(a),
                  s = e.$elm$;
                o &&
                  exports.supportsShadow &&
                  "" === o["s-en"] &&
                  o.parentNode.insertBefore(s, o.nextSibling),
                  n ||
                    ((s["s-hn"] = t),
                    o && ((s["s-ol"] = o), (s["s-ol"]["s-nr"] = s))),
                  plt.$orgLocNodes$.delete(a);
              }),
              appData.BUILD.shadowDom &&
                n &&
                r.map((e) => {
                  e && n.appendChild(e);
                }),
              s();
          })(e, a.$tagName$, o, t);
        }
        if (
          (appData.BUILD.slotRelocation &&
            !o &&
            (appData.BUILD.hydrateServerSide ||
              ((appData.BUILD.slot || appData.BUILD.shadowDom) &&
                12 & a.$flags$)) &&
            setContentReference(e),
          appData.BUILD.asyncLoading)
        ) {
          let a = e;
          for (; (a = a.parentNode || a.host); )
            if (
              (appData.BUILD.hydrateClientSide &&
                1 === a.nodeType &&
                a.hasAttribute("s-id") &&
                a["s-p"]) ||
              a["s-p"]
            ) {
              attachToAncestor(t, (t.$ancestorComponent$ = a));
              break;
            }
        }
        appData.BUILD.prop &&
          !appData.BUILD.hydrateServerSide &&
          a.$members$ &&
          Object.entries(a.$members$).map(([t, [a]]) => {
            if (31 & a && e.hasOwnProperty(t)) {
              const a = e[t];
              delete e[t], (e[t] = a);
            }
          }),
          appData.BUILD.initializeNextTick
            ? nextTick(() => initializeComponent(e, t, a))
            : initializeComponent(e, t, a);
      }
      o();
    }
  },
  setContentReference = (e) => {
    const t = (e["s-cr"] = doc.createComment(
      appData.BUILD.isDebug ? `content-ref (host=${e.localName})` : "",
    ));
    (t["s-cn"] = !0), e.insertBefore(t, e.firstChild);
  },
  disconnectInstance = (e) => {
    appData.BUILD.lazyLoad &&
      appData.BUILD.disconnectedCallback &&
      safeCall(e, "disconnectedCallback"),
      appData.BUILD.cmpDidUnload && safeCall(e, "componentDidUnload");
  },
  disconnectedCallback = async (e) => {
    if (!(1 & plt.$flags$)) {
      const t = getHostRef(e);
      appData.BUILD.hostListener &&
        t.$rmListeners$ &&
        (t.$rmListeners$.map((e) => e()), (t.$rmListeners$ = void 0)),
        appData.BUILD.lazyLoad
          ? (null == t ? void 0 : t.$lazyInstance$)
            ? disconnectInstance(t.$lazyInstance$)
            : (null == t ? void 0 : t.$onReadyPromise$) &&
              t.$onReadyPromise$.then(() =>
                disconnectInstance(t.$lazyInstance$),
              )
          : disconnectInstance(e);
    }
  },
  patchPseudoShadowDom = (e, t) => {
    patchCloneNode(e),
      patchSlotAppendChild(e),
      patchSlotAppend(e),
      patchSlotPrepend(e),
      patchSlotInsertAdjacentElement(e),
      patchSlotInsertAdjacentHTML(e),
      patchSlotInsertAdjacentText(e),
      patchTextContent(e),
      patchChildSlotNodes(e, t),
      patchSlotRemoveChild(e);
  },
  patchCloneNode = (e) => {
    const t = e.cloneNode;
    e.cloneNode = function (e) {
      const a = this,
        o = !!appData.BUILD.shadowDom && a.shadowRoot && exports.supportsShadow,
        s = t.call(a, !!o && e);
      if (appData.BUILD.slot && !o && e) {
        let e,
          t,
          o = 0;
        const n = [
          "s-id",
          "s-cr",
          "s-lr",
          "s-rc",
          "s-sc",
          "s-p",
          "s-cn",
          "s-sr",
          "s-sn",
          "s-hn",
          "s-ol",
          "s-nr",
          "s-si",
          "s-rf",
        ];
        for (; o < a.childNodes.length; o++)
          (e = a.childNodes[o]["s-nr"]),
            (t = n.every((e) => !a.childNodes[o][e])),
            e &&
              (appData.BUILD.appendChildSlotFix && s.__appendChild
                ? s.__appendChild(e.cloneNode(!0))
                : s.appendChild(e.cloneNode(!0))),
            t && s.appendChild(a.childNodes[o].cloneNode(!0));
      }
      return s;
    };
  },
  patchSlotAppendChild = (e) => {
    (e.__appendChild = e.appendChild),
      (e.appendChild = function (e) {
        const t = (e["s-sn"] = getSlotName(e)),
          a = getHostSlotNode(this.childNodes, t, this.tagName);
        if (a) {
          const o = getHostSlotChildNodes(a, t),
            s = o[o.length - 1],
            n = s.parentNode.insertBefore(e, s.nextSibling);
          return updateFallbackSlotVisibility(this), n;
        }
        return this.__appendChild(e);
      });
  },
  patchSlotRemoveChild = (e) => {
    (e.__removeChild = e.removeChild),
      (e.removeChild = function (e) {
        if (e && void 0 !== e["s-sn"]) {
          const t = getHostSlotNode(this.childNodes, e["s-sn"], this.tagName);
          if (t) {
            const a = getHostSlotChildNodes(t, e["s-sn"]).find((t) => t === e);
            if (a) return a.remove(), void updateFallbackSlotVisibility(this);
          }
        }
        return this.__removeChild(e);
      });
  },
  patchSlotPrepend = (e) => {
    const t = e.prepend;
    e.prepend = function (...e) {
      e.forEach((e) => {
        "string" == typeof e && (e = this.ownerDocument.createTextNode(e));
        const a = (e["s-sn"] = getSlotName(e)),
          o = getHostSlotNode(this.childNodes, a, this.tagName);
        if (o) {
          const t = document.createTextNode("");
          (t["s-nr"] = e),
            o["s-cr"].parentNode.__appendChild(t),
            (e["s-ol"] = t);
          const s = getHostSlotChildNodes(o, a)[0];
          return s.parentNode.insertBefore(e, s.nextSibling);
        }
        return (
          1 === e.nodeType && e.getAttribute("slot") && (e.hidden = !0),
          t.call(this, e)
        );
      });
    };
  },
  patchSlotAppend = (e) => {
    e.append = function (...e) {
      e.forEach((e) => {
        "string" == typeof e && (e = this.ownerDocument.createTextNode(e)),
          this.appendChild(e);
      });
    };
  },
  patchSlotInsertAdjacentHTML = (e) => {
    const t = e.insertAdjacentHTML;
    e.insertAdjacentHTML = function (e, a) {
      if ("afterbegin" !== e && "beforeend" !== e) return t.call(this, e, a);
      const o = this.ownerDocument.createElement("_");
      let s;
      if (((o.innerHTML = a), "afterbegin" === e))
        for (; (s = o.firstChild); ) this.prepend(s);
      else if ("beforeend" === e) for (; (s = o.firstChild); ) this.append(s);
    };
  },
  patchSlotInsertAdjacentText = (e) => {
    e.insertAdjacentText = function (e, t) {
      this.insertAdjacentHTML(e, t);
    };
  },
  patchSlotInsertAdjacentElement = (e) => {
    const t = e.insertAdjacentElement;
    e.insertAdjacentElement = function (e, a) {
      return "afterbegin" !== e && "beforeend" !== e
        ? t.call(this, e, a)
        : "afterbegin" === e
          ? (this.prepend(a), a)
          : "beforeend" === e
            ? (this.append(a), a)
            : a;
    };
  },
  patchTextContent = (e) => {
    const t = Object.getOwnPropertyDescriptor(Node.prototype, "textContent");
    Object.defineProperty(e, "__textContent", t),
      appData.BUILD.experimentalScopedSlotChanges
        ? Object.defineProperty(e, "textContent", {
            get() {
              return (
                " " +
                getAllChildSlotNodes(this.childNodes)
                  .map((e) => {
                    var t, a;
                    const o = [];
                    let s = e.nextSibling;
                    for (; s && s["s-sn"] === e["s-sn"]; )
                      (3 !== s.nodeType && 1 !== s.nodeType) ||
                        o.push(
                          null !==
                            (a =
                              null === (t = s.textContent) || void 0 === t
                                ? void 0
                                : t.trim()) && void 0 !== a
                            ? a
                            : "",
                        ),
                        (s = s.nextSibling);
                    return o.filter((e) => "" !== e).join(" ");
                  })
                  .filter((e) => "" !== e)
                  .join(" ") +
                " "
              );
            },
            set(e) {
              getAllChildSlotNodes(this.childNodes).forEach((t) => {
                let a = t.nextSibling;
                for (; a && a["s-sn"] === t["s-sn"]; ) {
                  const e = a;
                  (a = a.nextSibling), e.remove();
                }
                if ("" === t["s-sn"]) {
                  const a = this.ownerDocument.createTextNode(e);
                  (a["s-sn"] = ""),
                    t.parentElement.insertBefore(a, t.nextSibling);
                } else t.remove();
              });
            },
          })
        : Object.defineProperty(e, "textContent", {
            get() {
              var e;
              const t = getHostSlotNode(this.childNodes, "", this.tagName);
              return 3 ===
                (null === (e = null == t ? void 0 : t.nextSibling) ||
                void 0 === e
                  ? void 0
                  : e.nodeType)
                ? t.nextSibling.textContent
                : t
                  ? t.textContent
                  : this.__textContent;
            },
            set(e) {
              var t;
              const a = getHostSlotNode(this.childNodes, "", this.tagName);
              if (
                3 ===
                (null === (t = null == a ? void 0 : a.nextSibling) ||
                void 0 === t
                  ? void 0
                  : t.nodeType)
              )
                a.nextSibling.textContent = e;
              else if (a) a.textContent = e;
              else {
                this.__textContent = e;
                const t = this["s-cr"];
                t && this.insertBefore(t, this.firstChild);
              }
            },
          });
  },
  patchChildSlotNodes = (e, t) => {
    class a extends Array {
      item(e) {
        return this[e];
      }
    }
    if (8 & t.$flags$) {
      const t = e.__lookupGetter__("childNodes");
      Object.defineProperty(e, "children", {
        get() {
          return this.childNodes.map((e) => 1 === e.nodeType);
        },
      }),
        Object.defineProperty(e, "childElementCount", {
          get: () => e.children.length,
        }),
        Object.defineProperty(e, "childNodes", {
          get() {
            const e = t.call(this);
            if (!(1 & plt.$flags$) && 2 & getHostRef(this).$flags$) {
              const t = new a();
              for (let a = 0; a < e.length; a++) {
                const o = e[a]["s-nr"];
                o && t.push(o);
              }
              return t;
            }
            return a.from(e);
          },
        });
    }
  },
  getAllChildSlotNodes = (e) => {
    const t = [];
    for (const a of Array.from(e))
      a["s-sr"] && t.push(a), t.push(...getAllChildSlotNodes(a.childNodes));
    return t;
  },
  getSlotName = (e) =>
    e["s-sn"] || (1 === e.nodeType && e.getAttribute("slot")) || "",
  getHostSlotNode = (e, t, a) => {
    let o,
      s = 0;
    for (; s < e.length; s++) {
      if (((o = e[s]), o["s-sr"] && o["s-sn"] === t && o["s-hn"] === a))
        return o;
      if (((o = getHostSlotNode(o.childNodes, t, a)), o)) return o;
    }
    return null;
  },
  getHostSlotChildNodes = (e, t) => {
    const a = [e];
    for (; (e = e.nextSibling) && e["s-sn"] === t; ) a.push(e);
    return a;
  },
  proxyCustomElement = (e, t) => {
    const a = { $flags$: t[0], $tagName$: t[1] };
    appData.BUILD.member && (a.$members$ = t[2]),
      appData.BUILD.hostListener && (a.$listeners$ = t[3]),
      appData.BUILD.watchCallback && (a.$watchers$ = e.$watchers$),
      appData.BUILD.reflect && (a.$attrsToReflect$ = []),
      appData.BUILD.shadowDom &&
        !exports.supportsShadow &&
        1 & a.$flags$ &&
        (a.$flags$ |= 8),
      appData.BUILD.experimentalSlotFixes
        ? appData.BUILD.scoped &&
          2 & a.$flags$ &&
          patchPseudoShadowDom(e.prototype, a)
        : (appData.BUILD.slotChildNodesFix &&
            patchChildSlotNodes(e.prototype, a),
          appData.BUILD.cloneNodeFix && patchCloneNode(e.prototype),
          appData.BUILD.appendChildSlotFix && patchSlotAppendChild(e.prototype),
          appData.BUILD.scopedSlotTextContentFix &&
            2 & a.$flags$ &&
            patchTextContent(e.prototype));
    const o = e.prototype.connectedCallback,
      s = e.prototype.disconnectedCallback;
    return (
      Object.assign(e.prototype, {
        __registerHost() {
          registerHost(this, a);
        },
        connectedCallback() {
          connectedCallback(this),
            appData.BUILD.connectedCallback && o && o.call(this);
        },
        disconnectedCallback() {
          disconnectedCallback(this),
            appData.BUILD.disconnectedCallback && s && s.call(this);
        },
        __attachShadow() {
          exports.supportsShadow
            ? appData.BUILD.shadowDelegatesFocus
              ? this.attachShadow({
                  mode: "open",
                  delegatesFocus: !!(16 & a.$flags$),
                })
              : this.attachShadow({ mode: "open" })
            : (this.shadowRoot = this);
        },
      }),
      (e.is = a.$tagName$),
      proxyComponent(e, a, 3)
    );
  },
  addHostEventListeners = (e, t, a, o) => {
    appData.BUILD.hostListener &&
      a &&
      (appData.BUILD.hostListenerTargetParent &&
        (a = o ? a.filter(([e]) => 32 & e) : a.filter(([e]) => !(32 & e))),
      a.map(([a, o, s]) => {
        const n = appData.BUILD.hostListenerTarget
            ? getHostListenerTarget(e, a)
            : e,
          l = hostListenerProxy(t, s),
          r = hostListenerOpts(a);
        plt.ael(n, o, l, r),
          (t.$rmListeners$ = t.$rmListeners$ || []).push(() =>
            plt.rel(n, o, l, r),
          );
      }));
  },
  hostListenerProxy = (e, t) => (a) => {
    try {
      appData.BUILD.lazyLoad
        ? 256 & e.$flags$
          ? e.$lazyInstance$[t](a)
          : (e.$queuedListeners$ = e.$queuedListeners$ || []).push([t, a])
        : e.$hostElement$[t](a);
    } catch (e) {
      consoleError(e);
    }
  },
  getHostListenerTarget = (e, t) =>
    appData.BUILD.hostListenerTargetDocument && 4 & t
      ? doc
      : appData.BUILD.hostListenerTargetWindow && 8 & t
        ? win
        : appData.BUILD.hostListenerTargetBody && 16 & t
          ? doc.body
          : appData.BUILD.hostListenerTargetParent && 32 & t
            ? e.parentElement
            : e,
  hostListenerOpts = (e) => ({ passive: !!(1 & e), capture: !!(2 & e) }),
  parseVNodeAnnotations = (e, t, a, o) => {
    null != t &&
      (null != t["s-nr"] && o.push(t),
      1 === t.nodeType &&
        t.childNodes.forEach((t) => {
          const s = getHostRef(t);
          if (null != s && !a.staticComponents.has(t.nodeName.toLowerCase())) {
            const o = { nodeIds: 0 };
            insertVNodeAnnotations(e, t, s.$vnode$, a, o);
          }
          parseVNodeAnnotations(e, t, a, o);
        }));
  },
  insertVNodeAnnotations = (e, t, a, o, s) => {
    if (null != a) {
      const n = ++o.hostIds;
      if (
        (t.setAttribute("s-id", n),
        null != t["s-cr"] && (t["s-cr"].nodeValue = `r.${n}`),
        null != a.$children$)
      ) {
        const t = 0;
        a.$children$.forEach((a, o) => {
          insertChildVNodeAnnotations(e, a, s, n, t, o);
        });
      }
      if (t && a && a.$elm$ && !t.hasAttribute("c-id")) {
        const e = t.parentElement;
        if (e && e.childNodes) {
          const o = Array.from(e.childNodes),
            s = o.find((e) => 8 === e.nodeType && e["s-sr"]);
          if (s) {
            const e = o.indexOf(t) - 1;
            a.$elm$.setAttribute(
              "c-id",
              `${s["s-host-id"]}.${s["s-node-id"]}.0.${e}`,
            );
          }
        }
      }
    }
  },
  insertChildVNodeAnnotations = (e, t, a, o, s, n) => {
    const l = t.$elm$;
    if (null == l) return;
    const r = a.nodeIds++,
      i = `${o}.${r}.${s}.${n}`;
    if (((l["s-host-id"] = o), (l["s-node-id"] = r), 1 === l.nodeType))
      l.setAttribute("c-id", i);
    else if (3 === l.nodeType) {
      const t = l.parentNode,
        a = null == t ? void 0 : t.nodeName;
      if ("STYLE" !== a && "SCRIPT" !== a) {
        const a = `t.${i}`,
          o = e.createComment(a);
        null == t || t.insertBefore(o, l);
      }
    } else if (8 === l.nodeType && l["s-sr"]) {
      const e = `s.${i}.${l["s-sn"] || ""}`;
      l.nodeValue = e;
    }
    if (null != t.$children$) {
      const n = s + 1;
      t.$children$.forEach((t, s) => {
        insertChildVNodeAnnotations(e, t, a, o, n, s);
      });
    }
  },
  getHostRef = (e) => hostRefs.get(e),
  registerHost = (e, t) => {
    const a = {
      $flags$: 0,
      $hostElement$: e,
      $cmpMeta$: t,
      $instanceValues$: new Map(),
      $renderCount$: 0,
    };
    (a.$onInstancePromise$ = new Promise((e) => (a.$onInstanceResolve$ = e))),
      (a.$onReadyPromise$ = new Promise((e) => (a.$onReadyResolve$ = e))),
      (e["s-p"] = []),
      (e["s-rc"] = []),
      addHostEventListeners(e, a, t.$listeners$, !1),
      hostRefs.set(e, a);
  };
let customError;
const defaultConsoleError = (e) => {
    caughtErrors.push(e);
  },
  consoleError = (e, t) => (customError || defaultConsoleError)(e, t),
  consoleDevError = (...e) => {
    caughtErrors.push(new Error(e.join(", ")));
  },
  consoleDevWarn = (...e) => {
    const t = e.filter(
      (e) =>
        "string" == typeof e || "number" == typeof e || "boolean" == typeof e,
    );
    console.warn(...t);
  },
  nextTick = (e) => {
    queuedTicks.push(e);
  },
  win = mockDoc.setupGlobal(global),
  doc = win.document;
exports.supportsShadow = !0;
const plt = {
  $flags$: 0,
  $resourcesUrl$: "",
  jmp: (e) => e(),
  raf: (e) => requestAnimationFrame(e),
  ael: (e, t, a, o) => e.addEventListener(t, a, o),
  rel: (e, t, a, o) => e.removeEventListener(t, a, o),
  ce: (e, t) => new win.CustomEvent(e, t),
};
let autoApplyTimer,
  isAutoApplyingChanges = !1;
const isMemberInElement = (e, t) => {
  if (null != e) {
    if (t in e) return !0;
    const a = e.nodeName;
    if (a) {
      const e = cstrs.get(a.toLowerCase());
      if (
        null != e &&
        null != e.COMPILER_META &&
        null != e.COMPILER_META.properties
      )
        return e.COMPILER_META.properties.some((e) => e.name === t);
    }
  }
  return !1;
};
Object.defineProperty(exports, "Env", {
  enumerable: !0,
  get: function () {
    return appData.Env;
  },
}),
  (exports.Build = Build),
  (exports.Fragment = (e, t) => t),
  (exports.Host = Host),
  (exports.addHostEventListeners = addHostEventListeners),
  (exports.bootstrapLazy = (e, t = {}) => {
    var a;
    appData.BUILD.profile &&
      performance.mark &&
      performance.mark("st:app:start"),
      (() => {
        if (appData.BUILD.devTools) {
          const e = (win.stencil = win.stencil || {}),
            t = e.inspect;
          e.inspect = (e) => {
            let a = ((e) => {
              const t = getHostRef(e);
              if (!t) return;
              const a = t.$flags$,
                o = t.$hostElement$;
              return {
                renderCount: t.$renderCount$,
                flags: {
                  hasRendered: !!(2 & a),
                  hasConnected: !!(1 & a),
                  isWaitingForChildren: !!(4 & a),
                  isConstructingInstance: !!(8 & a),
                  isQueuedForUpdate: !!(16 & a),
                  hasInitializedComponent: !!(32 & a),
                  hasLoadedComponent: !!(64 & a),
                  isWatchReady: !!(128 & a),
                  isListenReady: !!(256 & a),
                  needsRerender: !!(512 & a),
                },
                instanceValues: t.$instanceValues$,
                ancestorComponent: t.$ancestorComponent$,
                hostElement: o,
                lazyInstance: t.$lazyInstance$,
                vnode: t.$vnode$,
                modeName: t.$modeName$,
                onReadyPromise: t.$onReadyPromise$,
                onReadyResolve: t.$onReadyResolve$,
                onInstancePromise: t.$onInstancePromise$,
                onInstanceResolve: t.$onInstanceResolve$,
                onRenderResolve: t.$onRenderResolve$,
                queuedListeners: t.$queuedListeners$,
                rmListeners: t.$rmListeners$,
                "s-id": o["s-id"],
                "s-cr": o["s-cr"],
                "s-lr": o["s-lr"],
                "s-p": o["s-p"],
                "s-rc": o["s-rc"],
                "s-sc": o["s-sc"],
              };
            })(e);
            return a || "function" != typeof t || (a = t(e)), a;
          };
        }
      })();
    const o = createTime("bootstrapLazy"),
      s = [],
      n = t.exclude || [],
      l = win.customElements,
      r = doc.head,
      i = r.querySelector("meta[charset]"),
      p = doc.createElement("style"),
      d = [],
      c = doc.querySelectorAll("[sty-id]");
    let $,
      u = !0,
      h = 0;
    if (
      (Object.assign(plt, t),
      (plt.$resourcesUrl$ = new URL(t.resourcesUrl || "./", doc.baseURI).href),
      appData.BUILD.asyncQueue && t.syncQueue && (plt.$flags$ |= 4),
      appData.BUILD.hydrateClientSide && (plt.$flags$ |= 2),
      appData.BUILD.hydrateClientSide && appData.BUILD.shadowDom)
    )
      for (; h < c.length; h++)
        registerStyle(
          c[h].getAttribute("sty-id"),
          c[h].innerHTML.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g, "$1{"),
        );
    let m = !1;
    if (
      (e.map((e) => {
        e[1].map((a) => {
          var o;
          const r = {
            $flags$: a[0],
            $tagName$: a[1],
            $members$: a[2],
            $listeners$: a[3],
          };
          4 & r.$flags$ && (m = !0),
            appData.BUILD.member && (r.$members$ = a[2]),
            appData.BUILD.hostListener && (r.$listeners$ = a[3]),
            appData.BUILD.reflect && (r.$attrsToReflect$ = []),
            appData.BUILD.watchCallback &&
              (r.$watchers$ = null !== (o = a[4]) && void 0 !== o ? o : {}),
            appData.BUILD.shadowDom &&
              !exports.supportsShadow &&
              1 & r.$flags$ &&
              (r.$flags$ |= 8);
          const i =
              appData.BUILD.transformTagName && t.transformTagName
                ? t.transformTagName(r.$tagName$)
                : r.$tagName$,
            p = class extends HTMLElement {
              constructor(e) {
                super(e),
                  registerHost((e = this), r),
                  appData.BUILD.shadowDom &&
                    1 & r.$flags$ &&
                    (exports.supportsShadow
                      ? appData.BUILD.shadowDelegatesFocus
                        ? e.attachShadow({
                            mode: "open",
                            delegatesFocus: !!(16 & r.$flags$),
                          })
                        : e.attachShadow({ mode: "open" })
                      : appData.BUILD.hydrateServerSide ||
                        "shadowRoot" in e ||
                        (e.shadowRoot = e));
              }
              connectedCallback() {
                $ && (clearTimeout($), ($ = null)),
                  u ? d.push(this) : plt.jmp(() => connectedCallback(this));
              }
              disconnectedCallback() {
                plt.jmp(() => disconnectedCallback(this));
              }
              componentOnReady() {
                return getHostRef(this).$onReadyPromise$;
              }
            };
          appData.BUILD.experimentalSlotFixes
            ? appData.BUILD.scoped &&
              2 & r.$flags$ &&
              patchPseudoShadowDom(p.prototype, r)
            : (appData.BUILD.slotChildNodesFix &&
                patchChildSlotNodes(p.prototype, r),
              appData.BUILD.cloneNodeFix && patchCloneNode(p.prototype),
              appData.BUILD.appendChildSlotFix &&
                patchSlotAppendChild(p.prototype),
              appData.BUILD.scopedSlotTextContentFix &&
                2 & r.$flags$ &&
                patchTextContent(p.prototype)),
            appData.BUILD.formAssociated &&
              64 & r.$flags$ &&
              (p.formAssociated = !0),
            appData.BUILD.hotModuleReplacement &&
              (p.prototype["s-hmr"] = function (e) {
                ((e, t, a) => {
                  const o = getHostRef(e);
                  (o.$flags$ = 1), initializeComponent(e, o, t);
                })(this, r);
              }),
            (r.$lazyBundleId$ = e[0]),
            n.includes(i) ||
              l.get(i) ||
              (s.push(i), l.define(i, proxyComponent(p, r, 1)));
        });
      }),
      s.length > 0 &&
        (m && (p.textContent += SLOT_FB_CSS),
        appData.BUILD.invisiblePrehydration &&
          (appData.BUILD.hydratedClass || appData.BUILD.hydratedAttribute) &&
          (p.textContent +=
            s + "{visibility:hidden}.hydrated{visibility:inherit}"),
        p.innerHTML.length))
    ) {
      p.setAttribute("data-styles", "");
      const e =
        null !== (a = plt.$nonce$) && void 0 !== a
          ? a
          : queryNonceMetaTagContent(doc);
      null != e && p.setAttribute("nonce", e),
        r.insertBefore(p, i ? i.nextSibling : r.firstChild);
    }
    (u = !1),
      d.length
        ? d.map((e) => e.connectedCallback())
        : appData.BUILD.profile
          ? plt.jmp(() => ($ = setTimeout(appDidLoad, 30, "timeout")))
          : plt.jmp(() => ($ = setTimeout(appDidLoad, 30))),
      o();
  }),
  (exports.connectedCallback = connectedCallback),
  (exports.consoleDevError = consoleDevError),
  (exports.consoleDevInfo = (...e) => {}),
  (exports.consoleDevWarn = consoleDevWarn),
  (exports.consoleError = consoleError),
  (exports.createEvent = (e, t, a) => {
    const o = getElement(e);
    return {
      emit: (e) => (
        appData.BUILD.isDev &&
          !o.isConnected &&
          consoleDevWarn(
            `The "${t}" event was emitted, but the dispatcher node is no longer connected to the dom.`,
          ),
        emitEvent(o, t, {
          bubbles: !!(4 & a),
          composed: !!(2 & a),
          cancelable: !!(1 & a),
          detail: e,
        })
      ),
    };
  }),
  (exports.defineCustomElement = (e, t) => {
    customElements.define(t[1], proxyCustomElement(e, t));
  }),
  (exports.disconnectedCallback = disconnectedCallback),
  (exports.doc = doc),
  (exports.flushAll = flushAll),
  (exports.flushLoadModule = flushLoadModule),
  (exports.flushQueue = flushQueue),
  (exports.forceModeUpdate = (e) => {
    if (appData.BUILD.style && appData.BUILD.mode && !appData.BUILD.lazyLoad) {
      const t = computeMode(e),
        a = getHostRef(e);
      if (a.$modeName$ !== t) {
        const o = a.$cmpMeta$,
          s = e["s-sc"],
          n = getScopeId(o, t),
          l = e.constructor.style[t];
        o.$flags$,
          l &&
            (styles.has(n) || registerStyle(n, l),
            (a.$modeName$ = t),
            e.classList.remove(s + "-h", s + "-s"),
            attachStyles(a),
            forceUpdate(e));
      }
    }
  }),
  (exports.forceUpdate = forceUpdate),
  (exports.getAssetPath = (e) => {
    const t = new URL(e, plt.$resourcesUrl$);
    return t.origin !== win.location.origin ? t.href : t.pathname;
  }),
  (exports.getElement = getElement),
  (exports.getHostRef = getHostRef),
  (exports.getMode = (e) => getHostRef(e).$modeName$),
  (exports.getRenderingRef = () => renderingRef),
  (exports.getValue = getValue),
  (exports.h = h),
  (exports.insertVdomAnnotations = (e, t) => {
    if (null != e) {
      const a = { hostIds: 0, rootLevelIds: 0, staticComponents: new Set(t) },
        o = [];
      parseVNodeAnnotations(e, e.body, a, o),
        o.forEach((t) => {
          var o, s;
          if (null != t && t["s-nr"]) {
            const n = t["s-nr"];
            let l = n["s-host-id"],
              r = n["s-node-id"],
              i = `${l}.${r}`;
            if (null == l)
              if (
                ((l = 0),
                a.rootLevelIds++,
                (r = a.rootLevelIds),
                (i = `${l}.${r}`),
                1 === n.nodeType)
              )
                n.setAttribute("c-id", i);
              else if (3 === n.nodeType) {
                if (
                  0 === l &&
                  "" ===
                    (null === (o = n.nodeValue) || void 0 === o
                      ? void 0
                      : o.trim())
                )
                  return void t.remove();
                const a = e.createComment(i);
                (a.nodeValue = `t.${i}`),
                  null === (s = n.parentNode) ||
                    void 0 === s ||
                    s.insertBefore(a, n);
              }
            let p = `o.${i}`;
            const d = t.parentElement;
            d &&
              ("" === d["s-en"]
                ? (p += ".")
                : "c" === d["s-en"] && (p += ".c")),
              (t.nodeValue = p);
          }
        });
    }
  }),
  (exports.isMemberInElement = isMemberInElement),
  (exports.loadModule = loadModule),
  (exports.modeResolutionChain = modeResolutionChain),
  (exports.nextTick = nextTick),
  (exports.parsePropertyValue = parsePropertyValue),
  (exports.plt = plt),
  (exports.postUpdateComponent = postUpdateComponent),
  (exports.proxyComponent = proxyComponent),
  (exports.proxyCustomElement = proxyCustomElement),
  (exports.readTask = function readTask(e) {
    queuedReadTasks.push(e);
  }),
  (exports.registerComponents = (e) => {
    e.forEach((e) => {
      cstrs.set(e.COMPILER_META.tagName, e);
    });
  }),
  (exports.registerHost = registerHost),
  (exports.registerInstance = (e, t) => {
    if (null == e || null == e.constructor)
      throw new Error("Invalid component constructor");
    if (null == t) {
      const a = e.constructor,
        o =
          a.COMPILER_META && a.COMPILER_META.tagName
            ? a.COMPILER_META.tagName
            : "div",
        s = document.createElement(o);
      registerHost(s, { $flags$: 0, $tagName$: o }), (t = getHostRef(s));
    }
    return (t.$lazyInstance$ = e), hostRefs.set(e, t);
  }),
  (exports.registerModule = function registerModule(e, t) {
    moduleLoaded.set(e, t);
  }),
  (exports.renderVdom = renderVdom),
  (exports.resetPlatform = function resetPlatform(e = {}) {
    win && "function" == typeof win.close && win.close(),
      hostRefs.clear(),
      styles.clear(),
      (plt.$flags$ = 0),
      Object.assign(plt, e),
      null != plt.$orgLocNodes$ &&
        (plt.$orgLocNodes$.clear(), (plt.$orgLocNodes$ = void 0)),
      (win.location.href = plt.$resourcesUrl$ =
        "http://testing.stenciljs.com/"),
      (function t() {
        (queuedTicks.length = 0),
          (queuedWriteTasks.length = 0),
          (queuedReadTasks.length = 0),
          moduleLoaded.clear(),
          (queuedLoadModules.length = 0),
          (caughtErrors.length = 0);
      })(),
      stopAutoApplyChanges(),
      cstrs.clear();
  }),
  (exports.setAssetPath = (e) => (plt.$resourcesUrl$ = e)),
  (exports.setErrorHandler = (e) => (customError = e)),
  (exports.setMode = (e) => modeResolutionChain.push(e)),
  (exports.setNonce = (e) => (plt.$nonce$ = e)),
  (exports.setPlatformHelpers = (e) => {
    Object.assign(plt, e);
  }),
  (exports.setPlatformOptions = (e) => Object.assign(plt, e)),
  (exports.setSupportsShadowDom = (e) => {
    exports.supportsShadow = e;
  }),
  (exports.setValue = setValue),
  (exports.startAutoApplyChanges = async function e() {
    (isAutoApplyingChanges = !0),
      flushAll().then(() => {
        isAutoApplyingChanges &&
          (autoApplyTimer = setTimeout(() => {
            e();
          }, 100));
      });
  }),
  (exports.stopAutoApplyChanges = stopAutoApplyChanges),
  (exports.styles = styles),
  (exports.supportsConstructableStylesheets = !1),
  (exports.supportsListenerOptions = !0),
  (exports.win = win),
  (exports.writeTask = writeTask);
