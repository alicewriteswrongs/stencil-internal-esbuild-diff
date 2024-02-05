var Cn = Object.defineProperty;
var Tn = (e, t) => {
  for (var n in t) Cn(e, n, { get: t[n], enumerable: !0 });
};
var bt = (e) => {
    let t = new URL(e, $.$resourcesUrl$);
    return t.origin !== E.location.origin ? t.href : t.pathname;
  },
  St = (e) => ($.$resourcesUrl$ = e);
var s = {
    allRenderFn: !1,
    cmpDidLoad: !0,
    cmpDidUnload: !1,
    cmpDidUpdate: !0,
    cmpDidRender: !0,
    cmpWillLoad: !0,
    cmpWillUpdate: !0,
    cmpWillRender: !0,
    connectedCallback: !0,
    disconnectedCallback: !0,
    element: !0,
    event: !0,
    hasRenderFn: !0,
    lifecycle: !0,
    hostListener: !0,
    hostListenerTargetWindow: !0,
    hostListenerTargetDocument: !0,
    hostListenerTargetBody: !0,
    hostListenerTargetParent: !1,
    hostListenerTarget: !0,
    member: !0,
    method: !0,
    mode: !0,
    observeAttribute: !0,
    prop: !0,
    propMutable: !0,
    reflect: !0,
    scoped: !0,
    shadowDom: !0,
    slot: !0,
    cssAnnotations: !0,
    state: !0,
    style: !0,
    formAssociated: !1,
    svg: !0,
    updatable: !0,
    vdomAttribute: !0,
    vdomXlink: !0,
    vdomClass: !0,
    vdomFunctional: !0,
    vdomKey: !0,
    vdomListener: !0,
    vdomRef: !0,
    vdomPropOrAttr: !0,
    vdomRender: !0,
    vdomStyle: !0,
    vdomText: !0,
    watchCallback: !0,
    taskQueue: !0,
    hotModuleReplacement: !1,
    isDebug: !1,
    isDev: !1,
    isTesting: !1,
    hydrateServerSide: !1,
    hydrateClientSide: !1,
    lifecycleDOMEvents: !1,
    lazyLoad: !1,
    profile: !1,
    slotRelocation: !0,
    appendChildSlotFix: !1,
    cloneNodeFix: !1,
    hydratedAttribute: !1,
    hydratedClass: !0,
    scriptDataOpts: !1,
    scopedSlotTextContentFix: !1,
    shadowDomShim: !1,
    slotChildNodesFix: !1,
    invisiblePrehydration: !0,
    propBoolean: !0,
    propNumber: !0,
    propString: !0,
    constructableCSS: !0,
    cmpShouldUpdate: !0,
    devTools: !1,
    shadowDelegatesFocus: !0,
    initializeNextTick: !1,
    asyncLoading: !1,
    asyncQueue: !1,
    transformTagName: !1,
    attachStyles: !0,
    experimentalSlotFixes: !1,
  },
  bn = {},
  ce = "app";
var Ve = {},
  Dt = "http://www.w3.org/2000/svg",
  Rt = "http://www.w3.org/1999/xhtml";
var Nt = (e) => e != null;
var K = (e) => ((e = typeof e), e === "object" || e === "function");
var Et = (e) =>
  !!e &&
  (typeof e == "object" || typeof e == "function") &&
  typeof e.then == "function";
function Ee(e) {
  var t, n, o;
  return (o =
    (n =
      (t = e.head) == null
        ? void 0
        : t.querySelector('meta[name="csp-nonce"]')) == null
      ? void 0
      : n.getAttribute("content")) != null
    ? o
    : void 0;
}
var et = {};
Tn(et, {
  err: () => vt,
  map: () => Nn,
  ok: () => Ge,
  unwrap: () => En,
  unwrapErr: () => vn,
});
var Ge = (e) => ({ isOk: !0, isErr: !1, value: e }),
  vt = (e) => ({ isOk: !1, isErr: !0, value: e });
function Nn(e, t) {
  if (e.isOk) {
    let n = t(e.value);
    return n instanceof Promise ? n.then((o) => Ge(o)) : Ge(n);
  }
  if (e.isErr) {
    let n = e.value;
    return vt(n);
  }
  throw "should never get here";
}
var En = (e) => {
    if (e.isOk) return e.value;
    throw e.value;
  },
  vn = (e) => {
    if (e.isErr) return e.value;
    throw e.value;
  };
var Ln = 0,
  D = (e, t = "") => {
    if (s.profile && performance.mark) {
      let n = `st:${e}:${t}:${Ln++}`;
      return (
        performance.mark(n),
        () => performance.measure(`[Stencil] ${e}() <${t}>`, n)
      );
    } else return () => {};
  },
  Lt = (e, t) =>
    s.profile && performance.mark
      ? (performance.getEntriesByName(e, "mark").length === 0 &&
          performance.mark(e),
        () => {
          performance.getEntriesByName(t, "measure").length === 0 &&
            performance.measure(t, e);
        })
      : () => {},
  On = (e) => {
    let t = g(e);
    if (!t) return;
    let n = t.$flags$,
      o = t.$hostElement$;
    return {
      renderCount: t.$renderCount$,
      flags: {
        hasRendered: !!(n & 2),
        hasConnected: !!(n & 1),
        isWaitingForChildren: !!(n & 4),
        isConstructingInstance: !!(n & 8),
        isQueuedForUpdate: !!(n & 16),
        hasInitializedComponent: !!(n & 32),
        hasLoadedComponent: !!(n & 64),
        isWatchReady: !!(n & 128),
        isListenReady: !!(n & 256),
        needsRerender: !!(n & 512),
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
  },
  Ot = () => {
    if (s.devTools) {
      let e = (E.stencil = E.stencil || {}),
        t = e.inspect;
      e.inspect = (n) => {
        let o = On(n);
        return !o && typeof t == "function" && (o = t(n)), o;
      };
    }
  };
var ve = "r",
  Le = "o",
  Oe = "s",
  pe = "t",
  Y = "s-id",
  Q = "sty-id",
  z = "c-id",
  It = "{visibility:hidden}.hydrated{visibility:inherit}",
  Ie = "slot-fb{display:contents}slot-fb[hidden]{display:none}",
  tt = "http://www.w3.org/1999/xlink",
  kt = [
    "formAssociatedCallback",
    "formResetCallback",
    "formDisabledCallback",
    "formStateRestoreCallback",
  ];
var A = (e, t, ...n) => {
    let o = null,
      r = null,
      i = null,
      a = !1,
      d = !1,
      l = [],
      c = (f) => {
        for (let m = 0; m < f.length; m++)
          (o = f[m]),
            Array.isArray(o)
              ? c(o)
              : o != null &&
                typeof o != "boolean" &&
                ((a = typeof e != "function" && !K(o))
                  ? (o = String(o))
                  : s.isDev &&
                    typeof e != "function" &&
                    o.$flags$ === void 0 &&
                    q(
                      `vNode passed as children has unexpected type.\nMake sure it's using the correct h() function.\nEmpty objects can also be the cause, look for JSX comments that became objects.`,
                    ),
                a && d
                  ? (l[l.length - 1].$text$ += o)
                  : l.push(a ? B(null, o) : o),
                (d = a));
      };
    if (
      (c(n),
      t &&
        (s.isDev && e === "input" && Pn(t),
        s.vdomKey && t.key && (r = t.key),
        s.slotRelocation && t.name && (i = t.name),
        s.vdomClass))
    ) {
      let f = t.className || t.class;
      f &&
        (t.class =
          typeof f != "object"
            ? f
            : Object.keys(f)
                .filter((m) => f[m])
                .join(" "));
    }
    if (
      (s.isDev &&
        l.some(ke) &&
        q(
          `The <Host> must be the single root component. Make sure:\n- You are NOT using hostData() and <Host> in the same component.\n- <Host> is used once, and it's the single root component of the render() function.`,
        ),
      s.vdomFunctional && typeof e == "function")
    )
      return e(t === null ? {} : t, l, In);
    let p = B(e, null);
    return (
      (p.$attrs$ = t),
      l.length > 0 && (p.$children$ = l),
      s.vdomKey && (p.$key$ = r),
      s.slotRelocation && (p.$name$ = i),
      p
    );
  },
  B = (e, t) => {
    let n = { $flags$: 0, $tag$: e, $text$: t, $elm$: null, $children$: null };
    return (
      s.vdomAttribute && (n.$attrs$ = null),
      s.vdomKey && (n.$key$ = null),
      s.slotRelocation && (n.$name$ = null),
      n
    );
  },
  nt = {},
  ke = (e) => e && e.$tag$ === nt,
  In = {
    forEach: (e, t) => e.map(Pt).forEach(t),
    map: (e, t) => e.map(Pt).map(t).map(kn),
  },
  Pt = (e) => ({
    vattrs: e.$attrs$,
    vchildren: e.$children$,
    vkey: e.$key$,
    vname: e.$name$,
    vtag: e.$tag$,
    vtext: e.$text$,
  }),
  kn = (e) => {
    if (typeof e.vtag == "function") {
      let n = { ...e.vattrs };
      return (
        e.vkey && (n.key = e.vkey),
        e.vname && (n.name = e.vname),
        A(e.vtag, n, ...(e.vchildren || []))
      );
    }
    let t = B(e.vtag, e.vtext);
    return (
      (t.$attrs$ = e.vattrs),
      (t.$children$ = e.vchildren),
      (t.$key$ = e.vkey),
      (t.$name$ = e.vname),
      t
    );
  },
  Pn = (e) => {
    let t = Object.keys(e),
      n = t.indexOf("value");
    if (n === -1) return;
    let o = t.indexOf("type"),
      r = t.indexOf("min"),
      i = t.indexOf("max"),
      a = t.indexOf("step");
    (n < o || n < r || n < i || n < a) &&
      U(
        'The "value" prop of <input> should be set after "min", "max", "type" and "step"',
      );
  };
var wt = (e, t, n, o) => {
    let r = D("hydrateClient", t),
      i = e.shadowRoot,
      a = [],
      d = [],
      l = s.shadowDom && i ? [] : null,
      c = (o.$vnode$ = B(t, null));
    $.$orgLocNodes$ || st(y.body, ($.$orgLocNodes$ = new Map())),
      (e[Y] = n),
      e.removeAttribute(Y),
      ot(c, a, d, l, e, e, n),
      a.map((p) => {
        let f = p.$hostId$ + "." + p.$nodeId$,
          m = $.$orgLocNodes$.get(f),
          u = p.$elm$;
        m &&
          R &&
          m["s-en"] === "" &&
          m.parentNode.insertBefore(u, m.nextSibling),
          i ||
            ((u["s-hn"] = t), m && ((u["s-ol"] = m), (u["s-ol"]["s-nr"] = u))),
          $.$orgLocNodes$.delete(f);
      }),
      s.shadowDom &&
        i &&
        l.map((p) => {
          p && i.appendChild(p);
        }),
      r();
  },
  ot = (e, t, n, o, r, i, a) => {
    let d, l, c, p;
    if (i.nodeType === 1) {
      for (
        d = i.getAttribute(z),
          d &&
            ((l = d.split(".")),
            (l[0] === a || l[0] === "0") &&
              ((c = {
                $flags$: 0,
                $hostId$: l[0],
                $nodeId$: l[1],
                $depth$: l[2],
                $index$: l[3],
                $tag$: i.tagName.toLowerCase(),
                $elm$: i,
                $attrs$: null,
                $children$: null,
                $key$: null,
                $name$: null,
                $text$: null,
              }),
              t.push(c),
              i.removeAttribute(z),
              e.$children$ || (e.$children$ = []),
              (e.$children$[c.$index$] = c),
              (e = c),
              o && c.$depth$ === "0" && (o[c.$index$] = c.$elm$))),
          p = i.childNodes.length - 1;
        p >= 0;
        p--
      )
        ot(e, t, n, o, r, i.childNodes[p], a);
      if (i.shadowRoot)
        for (p = i.shadowRoot.childNodes.length - 1; p >= 0; p--)
          ot(e, t, n, o, r, i.shadowRoot.childNodes[p], a);
    } else if (i.nodeType === 8)
      (l = i.nodeValue.split(".")),
        (l[1] === a || l[1] === "0") &&
          ((d = l[0]),
          (c = {
            $flags$: 0,
            $hostId$: l[1],
            $nodeId$: l[2],
            $depth$: l[3],
            $index$: l[4],
            $elm$: i,
            $attrs$: null,
            $children$: null,
            $key$: null,
            $name$: null,
            $tag$: null,
            $text$: null,
          }),
          d === pe
            ? ((c.$elm$ = i.nextSibling),
              c.$elm$ &&
                c.$elm$.nodeType === 3 &&
                ((c.$text$ = c.$elm$.textContent),
                t.push(c),
                i.remove(),
                e.$children$ || (e.$children$ = []),
                (e.$children$[c.$index$] = c),
                o && c.$depth$ === "0" && (o[c.$index$] = c.$elm$)))
            : c.$hostId$ === a &&
              (d === Oe
                ? ((c.$tag$ = "slot"),
                  l[5] ? (i["s-sn"] = c.$name$ = l[5]) : (i["s-sn"] = ""),
                  (i["s-sr"] = !0),
                  s.shadowDom &&
                    o &&
                    ((c.$elm$ = y.createElement(c.$tag$)),
                    c.$name$ && c.$elm$.setAttribute("name", c.$name$),
                    i.parentNode.insertBefore(c.$elm$, i),
                    i.remove(),
                    c.$depth$ === "0" && (o[c.$index$] = c.$elm$)),
                  n.push(c),
                  e.$children$ || (e.$children$ = []),
                  (e.$children$[c.$index$] = c))
                : d === ve &&
                  (s.shadowDom && o
                    ? i.remove()
                    : s.slotRelocation &&
                      ((r["s-cr"] = i), (i["s-cn"] = !0)))));
    else if (e && e.$tag$ === "style") {
      let f = B(null, i.textContent);
      (f.$elm$ = i), (f.$index$ = "0"), (e.$children$ = [f]);
    }
  },
  st = (e, t) => {
    if (e.nodeType === 1) {
      let n = 0;
      for (; n < e.childNodes.length; n++) st(e.childNodes[n], t);
      if (e.shadowRoot)
        for (n = 0; n < e.shadowRoot.childNodes.length; n++)
          st(e.shadowRoot.childNodes[n], t);
    } else if (e.nodeType === 8) {
      let n = e.nodeValue.split(".");
      n[0] === Le &&
        (t.set(n[1] + "." + n[2], e), (e.nodeValue = ""), (e["s-en"] = n[3]));
    }
  };
var Pe = (e) => rt.map((t) => t(e)).find((t) => !!t),
  Ht = (e) => rt.push(e),
  At = (e) => g(e).$modeName$;
var V = (e, t) =>
  e != null && !K(e)
    ? s.propBoolean && t & 4
      ? e === "false"
        ? !1
        : e === "" || !!e
      : s.propNumber && t & 2
        ? parseFloat(e)
        : s.propString && t & 1
          ? String(e)
          : e
    : e;
var we = (e) => (s.lazyLoad ? g(e).$hostElement$ : e);
var Ut = (e, t, n) => {
    let o = we(e);
    return {
      emit: (r) => (
        s.isDev &&
          !o.isConnected &&
          U(
            `The "${t}" event was emitted, but the dispatcher node is no longer connected to the dom.`,
          ),
        He(o, t, {
          bubbles: !!(n & 4),
          composed: !!(n & 2),
          cancelable: !!(n & 1),
          detail: r,
        })
      ),
    };
  },
  He = (e, t, n) => {
    let o = $.ce(t, n);
    return e.dispatchEvent(o), o;
  };
var Mt = new WeakMap(),
  Z = (e, t, n) => {
    let o = j.get(e);
    zt && n
      ? ((o = o || new CSSStyleSheet()),
        typeof o == "string" ? (o = t) : o.replaceSync(t))
      : (o = t),
      j.set(e, o);
  },
  Ae = (e, t, n) => {
    var i;
    let o = ue(t, n),
      r = j.get(o);
    if (!s.attachStyles) return o;
    if (((e = e.nodeType === 11 ? e : y), r))
      if (typeof r == "string") {
        e = e.head || e;
        let a = Mt.get(e),
          d;
        if ((a || Mt.set(e, (a = new Set())), !a.has(o))) {
          if (
            s.hydrateClientSide &&
            e.host &&
            (d = e.querySelector(`[${Q}="${o}"]`))
          )
            d.innerHTML = r;
          else {
            (d = y.createElement("style")), (d.innerHTML = r);
            let l = (i = $.$nonce$) != null ? i : Ee(y);
            l != null && d.setAttribute("nonce", l),
              (s.hydrateServerSide || s.hotModuleReplacement) &&
                d.setAttribute(Q, o),
              e.insertBefore(d, e.querySelector("link"));
          }
          t.$flags$ & 4 && (d.innerHTML += Ie), a && a.add(o);
        }
      } else
        s.constructableCSS &&
          !e.adoptedStyleSheets.includes(r) &&
          (e.adoptedStyleSheets = [...e.adoptedStyleSheets, r]);
    return o;
  },
  Ue = (e) => {
    let t = e.$cmpMeta$,
      n = e.$hostElement$,
      o = t.$flags$,
      r = D("attachStyles", t.$tagName$),
      i = Ae(
        s.shadowDom && R && n.shadowRoot ? n.shadowRoot : n.getRootNode(),
        t,
        e.$modeName$,
      );
    (s.shadowDom || s.scoped) &&
      s.cssAnnotations &&
      o & 10 &&
      ((n["s-sc"] = i),
      n.classList.add(i + "-h"),
      s.scoped && o & 2 && n.classList.add(i + "-s")),
      r();
  },
  ue = (e, t) =>
    "sc-" +
    (s.mode && t && e.$flags$ & 32 ? e.$tagName$ + "-" + t : e.$tagName$),
  _t = (e) => e.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g, "$1{");
var at = (e, t, n, o, r, i) => {
    if (n !== o) {
      let a = it(e, t),
        d = t.toLowerCase();
      if (s.vdomClass && t === "class") {
        let l = e.classList,
          c = Bt(n),
          p = Bt(o);
        l.remove(...c.filter((f) => f && !p.includes(f))),
          l.add(...p.filter((f) => f && !c.includes(f)));
      } else if (s.vdomStyle && t === "style") {
        if (s.updatable)
          for (let l in n)
            (!o || o[l] == null) &&
              (!s.hydrateServerSide && l.includes("-")
                ? e.style.removeProperty(l)
                : (e.style[l] = ""));
        for (let l in o)
          (!n || o[l] !== n[l]) &&
            (!s.hydrateServerSide && l.includes("-")
              ? e.style.setProperty(l, o[l])
              : (e.style[l] = o[l]));
      } else if (!(s.vdomKey && t === "key")) {
        if (s.vdomRef && t === "ref") o && o(e);
        else if (
          s.vdomListener &&
          (s.lazyLoad ? !a : !e.__lookupSetter__(t)) &&
          t[0] === "o" &&
          t[1] === "n"
        ) {
          if (
            (t[2] === "-"
              ? (t = t.slice(3))
              : it(E, d)
                ? (t = d.slice(2))
                : (t = d[2] + t.slice(3)),
            n || o)
          ) {
            let l = t.endsWith(jt);
            (t = t.replace(An, "")),
              n && $.rel(e, t, n, l),
              o && $.ael(e, t, o, l);
          }
        } else if (s.vdomPropOrAttr) {
          let l = K(o);
          if ((a || (l && o !== null)) && !r)
            try {
              if (e.tagName.includes("-")) e[t] = o;
              else {
                let p = o == null ? "" : o;
                t === "list"
                  ? (a = !1)
                  : (n == null || e[t] != p) && (e[t] = p);
              }
            } catch {}
          let c = !1;
          s.vdomXlink &&
            d !== (d = d.replace(/^xlink\:?/, "")) &&
            ((t = d), (c = !0)),
            o == null || o === !1
              ? (o !== !1 || e.getAttribute(t) === "") &&
                (s.vdomXlink && c
                  ? e.removeAttributeNS(tt, t)
                  : e.removeAttribute(t))
              : (!a || i & 4 || r) &&
                !l &&
                ((o = o === !0 ? "" : o),
                s.vdomXlink && c
                  ? e.setAttributeNS(tt, t, o)
                  : e.setAttribute(t, o));
        }
      }
    }
  },
  Hn = /\s/,
  Bt = (e) => (e ? e.split(Hn) : []),
  jt = "Capture",
  An = new RegExp(jt + "$");
var lt = (e, t, n, o) => {
  let r = t.$elm$.nodeType === 11 && t.$elm$.host ? t.$elm$.host : t.$elm$,
    i = (e && e.$attrs$) || Ve,
    a = t.$attrs$ || Ve;
  if (s.updatable) for (o in i) o in a || at(r, o, i[o], void 0, n, t.$flags$);
  for (o in a) at(r, o, i[o], a[o], n, t.$flags$);
};
var G,
  dt,
  W,
  ct = !1,
  _e = !1,
  Be = !1,
  O = !1,
  ze = (e, t, n, o) => {
    let r = t.$children$[n],
      i = 0,
      a,
      d,
      l;
    if (
      (s.slotRelocation &&
        !ct &&
        ((Be = !0),
        r.$tag$ === "slot" &&
          (G && o.classList.add(G + "-s"),
          (r.$flags$ |= r.$children$ ? 2 : 1))),
      s.isDev &&
        r.$elm$ &&
        q(
          `The JSX ${r.$text$ !== null ? `"${r.$text$}" text` : `"${r.$tag$}" element`} node should not be shared within the same renderer. The renderer caches element lookups in order to improve performance. However, a side effect from this is that the exact same JSX node should not be reused. For more information please see https://stenciljs.com/docs/templating-jsx#avoid-shared-jsx-nodes`,
        ),
      s.vdomText && r.$text$ !== null)
    )
      a = r.$elm$ = y.createTextNode(r.$text$);
    else if (s.slotRelocation && r.$flags$ & 1)
      a = r.$elm$ =
        s.isDebug || s.hydrateServerSide ? Mn(r) : y.createTextNode("");
    else {
      if (
        (s.svg && !O && (O = r.$tag$ === "svg"),
        (a = r.$elm$ =
          s.svg
            ? y.createElementNS(
                O ? Dt : Rt,
                s.slotRelocation && r.$flags$ & 2 ? "slot-fb" : r.$tag$,
              )
            : y.createElement(
                s.slotRelocation && r.$flags$ & 2 ? "slot-fb" : r.$tag$,
              )),
        s.svg && O && r.$tag$ === "foreignObject" && (O = !1),
        s.vdomAttribute && lt(null, r, O),
        (s.shadowDom || s.scoped) &&
          Nt(G) &&
          a["s-si"] !== G &&
          a.classList.add((a["s-si"] = G)),
        r.$children$)
      )
        for (i = 0; i < r.$children$.length; ++i)
          (d = ze(e, r, i, a)), d && a.appendChild(d);
      s.svg &&
        (r.$tag$ === "svg"
          ? (O = !1)
          : a.tagName === "foreignObject" && (O = !0));
    }
    return (
      (a["s-hn"] = W),
      s.slotRelocation &&
        r.$flags$ & 3 &&
        ((a["s-sr"] = !0),
        (a["s-cr"] = dt),
        (a["s-sn"] = r.$name$ || ""),
        (l = e && e.$children$ && e.$children$[n]),
        l &&
          l.$tag$ === r.$tag$ &&
          e.$elm$ &&
          (s.experimentalSlotFixes ? Ft(e.$elm$) : me(e.$elm$, !1))),
      a
    );
  },
  Ft = (e) => {
    $.$flags$ |= 1;
    let t = e.closest(W.toLowerCase());
    if (t != null) {
      let n = Array.from(t.childNodes).find((r) => r["s-cr"]),
        o = Array.from(e.childNodes);
      for (let r of n ? o.reverse() : o)
        r["s-sh"] != null &&
          (t.insertBefore(r, n != null ? n : null),
          (r["s-sh"] = void 0),
          (Be = !0));
    }
    $.$flags$ &= -2;
  },
  me = (e, t) => {
    $.$flags$ |= 1;
    let n = e.childNodes;
    for (let o = n.length - 1; o >= 0; o--) {
      let r = n[o];
      r["s-hn"] !== W &&
        r["s-ol"] &&
        (qt(r).insertBefore(r, pt(r)),
        r["s-ol"].remove(),
        (r["s-ol"] = void 0),
        (r["s-sh"] = void 0),
        (Be = !0)),
        t && me(r, t);
    }
    $.$flags$ &= -2;
  },
  Jt = (e, t, n, o, r, i) => {
    let a = (s.slotRelocation && e["s-cr"] && e["s-cr"].parentNode) || e,
      d;
    for (
      s.shadowDom && a.shadowRoot && a.tagName === W && (a = a.shadowRoot);
      r <= i;
      ++r
    )
      o[r] &&
        ((d = ze(null, n, r, e)),
        d &&
          ((o[r].$elm$ = d), a.insertBefore(d, s.slotRelocation ? pt(t) : t)));
  },
  Yt = (e, t, n) => {
    for (let o = t; o <= n; ++o) {
      let r = e[o];
      if (r) {
        let i = r.$elm$;
        Kt(r),
          i &&
            (s.slotRelocation &&
              ((_e = !0), i["s-ol"] ? i["s-ol"].remove() : me(i, !0)),
            i.remove());
      }
    }
  },
  Un = (e, t, n, o, r = !1) => {
    let i = 0,
      a = 0,
      d = 0,
      l = 0,
      c = t.length - 1,
      p = t[0],
      f = t[c],
      m = o.length - 1,
      u = o[0],
      x = o[m],
      b,
      C;
    for (; i <= c && a <= m; )
      if (p == null) p = t[++i];
      else if (f == null) f = t[--c];
      else if (u == null) u = o[++a];
      else if (x == null) x = o[--m];
      else if (Me(p, u, r)) ee(p, u, r), (p = t[++i]), (u = o[++a]);
      else if (Me(f, x, r)) ee(f, x, r), (f = t[--c]), (x = o[--m]);
      else if (Me(p, x, r))
        s.slotRelocation &&
          (p.$tag$ === "slot" || x.$tag$ === "slot") &&
          me(p.$elm$.parentNode, !1),
          ee(p, x, r),
          e.insertBefore(p.$elm$, f.$elm$.nextSibling),
          (p = t[++i]),
          (x = o[--m]);
      else if (Me(f, u, r))
        s.slotRelocation &&
          (p.$tag$ === "slot" || x.$tag$ === "slot") &&
          me(f.$elm$.parentNode, !1),
          ee(f, u, r),
          e.insertBefore(f.$elm$, p.$elm$),
          (f = t[--c]),
          (u = o[++a]);
      else {
        if (((d = -1), s.vdomKey)) {
          for (l = i; l <= c; ++l)
            if (t[l] && t[l].$key$ !== null && t[l].$key$ === u.$key$) {
              d = l;
              break;
            }
        }
        s.vdomKey && d >= 0
          ? ((C = t[d]),
            C.$tag$ !== u.$tag$
              ? (b = ze(t && t[a], n, d, e))
              : (ee(C, u, r), (t[d] = void 0), (b = C.$elm$)),
            (u = o[++a]))
          : ((b = ze(t && t[a], n, a, e)), (u = o[++a])),
          b &&
            (s.slotRelocation
              ? qt(p.$elm$).insertBefore(b, pt(p.$elm$))
              : p.$elm$.parentNode.insertBefore(b, p.$elm$));
      }
    i > c
      ? Jt(e, o[m + 1] == null ? null : o[m + 1].$elm$, n, o, a, m)
      : s.updatable && a > m && Yt(t, i, c);
  },
  Me = (e, t, n = !1) =>
    e.$tag$ === t.$tag$
      ? s.slotRelocation && e.$tag$ === "slot"
        ? e.$name$ === t.$name$
        : s.vdomKey && !n
          ? e.$key$ === t.$key$
          : !0
      : !1,
  pt = (e) => (e && e["s-ol"]) || e,
  qt = (e) => (e["s-ol"] ? e["s-ol"] : e).parentNode,
  ee = (e, t, n = !1) => {
    let o = (t.$elm$ = e.$elm$),
      r = e.$children$,
      i = t.$children$,
      a = t.$tag$,
      d = t.$text$,
      l;
    !s.vdomText || d === null
      ? (s.svg && (O = a === "svg" ? !0 : a === "foreignObject" ? !1 : O),
        (s.vdomAttribute || s.reflect) &&
          (s.slot && a === "slot" && !ct
            ? s.experimentalSlotFixes &&
              e.$name$ !== t.$name$ &&
              ((t.$elm$["s-sn"] = t.$name$ || ""), Ft(t.$elm$.parentElement))
            : lt(e, t, O)),
        s.updatable && r !== null && i !== null
          ? Un(o, r, t, i, n)
          : i !== null
            ? (s.updatable &&
                s.vdomText &&
                e.$text$ !== null &&
                (o.textContent = ""),
              Jt(o, null, t, i, 0, i.length - 1))
            : s.updatable && r !== null && Yt(r, 0, r.length - 1),
        s.svg && O && a === "svg" && (O = !1))
      : s.vdomText && s.slotRelocation && (l = o["s-cr"])
        ? (l.parentNode.textContent = d)
        : s.vdomText && e.$text$ !== d && (o.data = d);
  },
  ge = (e) => {
    let t = e.childNodes;
    for (let n of t)
      if (n.nodeType === 1) {
        if (n["s-sr"]) {
          let o = n["s-sn"];
          n.hidden = !1;
          for (let r of t)
            if (r !== n) {
              if (r["s-hn"] !== n["s-hn"] || o !== "") {
                if (
                  r.nodeType === 1 &&
                  (o === r.getAttribute("slot") || o === r["s-sn"])
                ) {
                  n.hidden = !0;
                  break;
                }
              } else if (
                r.nodeType === 1 ||
                (r.nodeType === 3 && r.textContent.trim() !== "")
              ) {
                n.hidden = !0;
                break;
              }
            }
        }
        ge(n);
      }
  },
  M = [],
  Xt = (e) => {
    let t, n, o;
    for (let r of e.childNodes) {
      if (r["s-sr"] && (t = r["s-cr"]) && t.parentNode) {
        n = t.parentNode.childNodes;
        let i = r["s-sn"];
        for (o = n.length - 1; o >= 0; o--)
          if (
            ((t = n[o]),
            !t["s-cn"] &&
              !t["s-nr"] &&
              t["s-hn"] !== r["s-hn"] &&
              (!s.experimentalSlotFixes ||
                !t["s-sh"] ||
                t["s-sh"] !== r["s-hn"]))
          )
            if (Wt(t, i)) {
              let a = M.find((d) => d.$nodeToRelocate$ === t);
              (_e = !0),
                (t["s-sn"] = t["s-sn"] || i),
                a
                  ? ((a.$nodeToRelocate$["s-sh"] = r["s-hn"]),
                    (a.$slotRefNode$ = r))
                  : ((t["s-sh"] = r["s-hn"]),
                    M.push({ $slotRefNode$: r, $nodeToRelocate$: t })),
                t["s-sr"] &&
                  M.map((d) => {
                    Wt(d.$nodeToRelocate$, t["s-sn"]) &&
                      ((a = M.find((l) => l.$nodeToRelocate$ === t)),
                      a &&
                        !d.$slotRefNode$ &&
                        (d.$slotRefNode$ = a.$slotRefNode$));
                  });
            } else
              M.some((a) => a.$nodeToRelocate$ === t) ||
                M.push({ $nodeToRelocate$: t });
      }
      r.nodeType === 1 && Xt(r);
    }
  },
  Wt = (e, t) =>
    e.nodeType === 1
      ? (e.getAttribute("slot") === null && t === "") ||
        e.getAttribute("slot") === t
      : e["s-sn"] === t
        ? !0
        : t === "",
  Kt = (e) => {
    s.vdomRef &&
      (e.$attrs$ && e.$attrs$.ref && e.$attrs$.ref(null),
      e.$children$ && e.$children$.map(Kt));
  },
  he = (e, t, n = !1) => {
    var d, l, c, p, f;
    let o = e.$hostElement$,
      r = e.$cmpMeta$,
      i = e.$vnode$ || B(null, null),
      a = ke(t) ? t : A(null, null, t);
    if (((W = o.tagName), s.isDev && Array.isArray(t) && t.some(ke)))
      throw new Error(
        `The <Host> must be the single root component.\nLooks like the render() function of "${W.toLowerCase()}" is returning an array that contains the <Host>.\n\nThe render() function should look like this instead:\n\nrender() {\n  // Do not return an array\n  return (\n    <Host>{content}</Host>\n  );\n}\n  `,
      );
    if (
      (s.reflect &&
        r.$attrsToReflect$ &&
        ((a.$attrs$ = a.$attrs$ || {}),
        r.$attrsToReflect$.map(([m, u]) => (a.$attrs$[u] = o[m]))),
      n && a.$attrs$)
    )
      for (let m of Object.keys(a.$attrs$))
        o.hasAttribute(m) &&
          !["key", "ref", "style", "class"].includes(m) &&
          (a.$attrs$[m] = o[m]);
    if (
      ((a.$tag$ = null),
      (a.$flags$ |= 4),
      (e.$vnode$ = a),
      (a.$elm$ = i.$elm$ = (s.shadowDom && o.shadowRoot) || o),
      (s.scoped || s.shadowDom) && (G = o["s-sc"]),
      (ct = R && (r.$flags$ & 1) !== 0),
      s.slotRelocation && ((dt = o["s-cr"]), (_e = !1)),
      ee(i, a, n),
      s.slotRelocation)
    ) {
      if ((($.$flags$ |= 1), Be)) {
        Xt(a.$elm$);
        for (let m of M) {
          let u = m.$nodeToRelocate$;
          if (!u["s-ol"]) {
            let x =
              s.isDebug || s.hydrateServerSide ? _n(u) : y.createTextNode("");
            (x["s-nr"] = u), u.parentNode.insertBefore((u["s-ol"] = x), u);
          }
        }
        for (let m of M) {
          let u = m.$nodeToRelocate$,
            x = m.$slotRefNode$;
          if (x) {
            let b = x.parentNode,
              C = x.nextSibling;
            if (!s.experimentalSlotFixes || (C && C.nodeType === 1)) {
              let S = (d = u["s-ol"]) == null ? void 0 : d.previousSibling;
              for (; S; ) {
                let h = (l = S["s-nr"]) != null ? l : null;
                if (
                  h &&
                  h["s-sn"] === u["s-sn"] &&
                  b === h.parentNode &&
                  ((h = h.nextSibling), !h || !h["s-nr"])
                ) {
                  C = h;
                  break;
                }
                S = S.previousSibling;
              }
            }
            ((!C && b !== u.parentNode) || u.nextSibling !== C) &&
              u !== C &&
              (!s.experimentalSlotFixes &&
                !u["s-hn"] &&
                u["s-ol"] &&
                (u["s-hn"] = u["s-ol"].parentNode.nodeName),
              b.insertBefore(u, C),
              u.nodeType === 1 &&
                (u.hidden = (c = u["s-ih"]) != null ? c : !1));
          } else
            u.nodeType === 1 &&
              (n && (u["s-ih"] = (p = u.hidden) != null ? p : !1),
              (u.hidden = !0));
        }
      }
      _e && ge(a.$elm$), ($.$flags$ &= -2), (M.length = 0);
    }
    if (s.experimentalScopedSlotChanges && r.$flags$ & 2)
      for (let m of a.$elm$.childNodes)
        m["s-hn"] !== W &&
          !m["s-sh"] &&
          (n &&
            m["s-ih"] == null &&
            (m["s-ih"] = (f = m.hidden) != null ? f : !1),
          (m.hidden = !0));
    dt = void 0;
  },
  Mn = (e) =>
    y.createComment(
      `<slot${e.$name$ ? ' name="' + e.$name$ + '"' : ""}> (host=${W.toLowerCase()})`,
    ),
  _n = (e) =>
    y.createComment(
      "org-location for " +
        (e.localName
          ? `<${e.localName}> (host=${e["s-hn"]})`
          : `[${e.textContent}]`),
    );
var mt = (e, t) => {
    s.asyncLoading &&
      t &&
      !e.$onRenderResolve$ &&
      t["s-p"] &&
      t["s-p"].push(new Promise((n) => (e.$onRenderResolve$ = n)));
  },
  ne = (e, t) => {
    if (
      (s.taskQueue && s.updatable && (e.$flags$ |= 16),
      s.asyncLoading && e.$flags$ & 4)
    ) {
      e.$flags$ |= 512;
      return;
    }
    mt(e, e.$ancestorComponent$);
    let n = () => zn(e, t);
    return s.taskQueue ? tn(n) : n();
  },
  zn = (e, t) => {
    let n = e.$hostElement$,
      o = D("scheduleUpdate", e.$cmpMeta$.$tagName$),
      r = s.lazyLoad ? e.$lazyInstance$ : n,
      i;
    return (
      t
        ? (s.lazyLoad &&
            s.hostListener &&
            ((e.$flags$ |= 256),
            e.$queuedListeners$ &&
              (e.$queuedListeners$.map(([a, d]) => I(r, a, d)),
              (e.$queuedListeners$ = void 0))),
          te(n, "componentWillLoad"),
          s.cmpWillLoad && (i = I(r, "componentWillLoad")))
        : (te(n, "componentWillUpdate"),
          s.cmpWillUpdate && (i = I(r, "componentWillUpdate"))),
      te(n, "componentWillRender"),
      s.cmpWillRender && (i = Qt(i, () => I(r, "componentWillRender"))),
      o(),
      Qt(i, () => jn(e, r, t))
    );
  },
  Qt = (e, t) => (Bn(e) ? e.then(t) : t()),
  Bn = (e) =>
    e instanceof Promise || (e && e.then && typeof e.then == "function"),
  jn = async (e, t, n) => {
    var d;
    let o = e.$hostElement$,
      r = D("update", e.$cmpMeta$.$tagName$),
      i = o["s-rc"];
    s.style && n && Ue(e);
    let a = D("render", e.$cmpMeta$.$tagName$);
    if (
      (s.isDev && (e.$flags$ |= 1024),
      s.hydrateServerSide ? await Vt(e, t, o, n) : Vt(e, t, o, n),
      s.isDev &&
        ((e.$renderCount$ =
          e.$renderCount$ === void 0 ? 1 : e.$renderCount$ + 1),
        (e.$flags$ &= -1025)),
      s.hydrateServerSide)
    )
      try {
        en(o),
          n &&
            (e.$cmpMeta$.$flags$ & 1
              ? (o["s-en"] = "")
              : e.$cmpMeta$.$flags$ & 2 && (o["s-en"] = "c"));
      } catch (l) {
        v(l, o);
      }
    if (
      (s.asyncLoading && i && (i.map((l) => l()), (o["s-rc"] = void 0)),
      a(),
      r(),
      s.asyncLoading)
    ) {
      let l = (d = o["s-p"]) != null ? d : [],
        c = () => je(e);
      l.length === 0
        ? c()
        : (Promise.all(l).then(c), (e.$flags$ |= 4), (l.length = 0));
    } else je(e);
  },
  ft = null,
  Vt = (e, t, n, o) => {
    let r = !!s.allRenderFn,
      i = !!s.lazyLoad,
      a = !!s.taskQueue,
      d = !!s.updatable;
    try {
      if (
        ((ft = t),
        (t = (r || t.render) && t.render()),
        d && a && (e.$flags$ &= -17),
        (d || i) && (e.$flags$ |= 2),
        s.hasRenderFn || s.reflect)
      )
        if (s.vdomRender || s.reflect) {
          if (s.hydrateServerSide)
            return Promise.resolve(t).then((l) => he(e, l, o));
          he(e, t, o);
        } else {
          let l = n.shadowRoot;
          e.$cmpMeta$.$flags$ & 1 ? (l.textContent = t) : (n.textContent = t);
        }
    } catch (l) {
      v(l, e.$hostElement$);
    }
    return (ft = null), null;
  },
  Zt = () => ft,
  je = (e) => {
    let t = e.$cmpMeta$.$tagName$,
      n = e.$hostElement$,
      o = D("postUpdate", t),
      r = s.lazyLoad ? e.$lazyInstance$ : n,
      i = e.$ancestorComponent$;
    s.cmpDidRender &&
      (s.isDev && (e.$flags$ |= 1024),
      I(r, "componentDidRender"),
      s.isDev && (e.$flags$ &= -1025)),
      te(n, "componentDidRender"),
      e.$flags$ & 64
        ? (s.cmpDidUpdate &&
            (s.isDev && (e.$flags$ |= 1024),
            I(r, "componentDidUpdate"),
            s.isDev && (e.$flags$ &= -1025)),
          te(n, "componentDidUpdate"),
          o())
        : ((e.$flags$ |= 64),
          s.asyncLoading && s.cssAnnotations && Gt(n),
          s.cmpDidLoad &&
            (s.isDev && (e.$flags$ |= 2048),
            I(r, "componentDidLoad"),
            s.isDev && (e.$flags$ &= -2049)),
          te(n, "componentDidLoad"),
          o(),
          s.asyncLoading && (e.$onReadyResolve$(n), i || We(t))),
      s.method && s.lazyLoad && e.$onInstanceResolve$(n),
      s.asyncLoading &&
        (e.$onRenderResolve$ &&
          (e.$onRenderResolve$(), (e.$onRenderResolve$ = void 0)),
        e.$flags$ & 512 && ye(() => ne(e, !1)),
        (e.$flags$ &= -517));
  },
  oe = (e) => {
    if (s.updatable && (ut.isBrowser || ut.isTesting)) {
      let t = g(e),
        n = t.$hostElement$.isConnected;
      return n && (t.$flags$ & 18) === 2 && ne(t, !1), n;
    }
    return !1;
  },
  We = (e) => {
    s.cssAnnotations && Gt(y.documentElement),
      s.asyncQueue && ($.$flags$ |= 2),
      ye(() => He(E, "appload", { detail: { namespace: ce } })),
      s.profile &&
        performance.measure &&
        performance.measure(
          `[Stencil] ${ce} initial load (by ${e})`,
          "st:app:start",
        );
  },
  I = (e, t, n) => {
    if (e && e[t])
      try {
        return e[t](n);
      } catch (o) {
        v(o);
      }
  },
  te = (e, t) => {
    s.lifecycleDOMEvents &&
      He(e, "stencil_" + t, {
        bubbles: !0,
        composed: !0,
        detail: { namespace: ce },
      });
  },
  Gt = (e) =>
    s.hydratedClass
      ? e.classList.add("hydrated")
      : s.hydratedAttribute
        ? e.setAttribute("hydrated", "")
        : void 0,
  en = (e) => {
    let t = e.children;
    if (t != null)
      for (let n = 0, o = t.length; n < o; n++) {
        let r = t[n];
        typeof r.connectedCallback == "function" && r.connectedCallback(),
          en(r);
      }
  };
var se = (e, t) => g(e).$instanceValues$.get(t),
  re = (e, t, n, o) => {
    let r = g(e),
      i = s.lazyLoad ? r.$hostElement$ : e,
      a = r.$instanceValues$.get(t),
      d = r.$flags$,
      l = s.lazyLoad ? r.$lazyInstance$ : i;
    n = V(n, o.$members$[t][0]);
    let c = Number.isNaN(a) && Number.isNaN(n),
      p = n !== a && !c;
    if (
      (!s.lazyLoad || !(d & 8) || a === void 0) &&
      p &&
      (r.$instanceValues$.set(t, n),
      s.isDev &&
        (r.$flags$ & 1024
          ? U(
              `The state/prop "${t}" changed during rendering. This can potentially lead to infinite-loops and other bugs.`,
              `\nElement`,
              i,
              `\nNew value`,
              n,
              `\nOld value`,
              a,
            )
          : r.$flags$ & 2048 &&
            U(
              `The state/prop "${t}" changed during "componentDidLoad()", this triggers extra re-renders, try to setup on "componentWillLoad()"`,
              `\nElement`,
              i,
              `\nNew value`,
              n,
              `\nOld value`,
              a,
            )),
      !s.lazyLoad || l)
    ) {
      if (s.watchCallback && o.$watchers$ && d & 128) {
        let f = o.$watchers$[t];
        f &&
          f.map((m) => {
            try {
              l[m](n, a, t);
            } catch (u) {
              v(u, i);
            }
          });
      }
      if (s.updatable && (d & 18) === 2) {
        if (
          s.cmpShouldUpdate &&
          l.componentShouldUpdate &&
          l.componentShouldUpdate(n, a, t) === !1
        )
          return;
        ne(r, !1);
      }
    }
  };
var F = (e, t, n) => {
  var r;
  let o = e.prototype;
  if (
    (s.formAssociated &&
      t.$flags$ & 64 &&
      n & 1 &&
      kt.forEach((i) =>
        Object.defineProperty(o, i, {
          value(...a) {
            let d = g(this),
              l = s.lazyLoad ? d.$hostElement$ : this,
              c = s.lazyLoad ? d.$lazyInstance$ : l;
            if (!c)
              d.$onReadyPromise$.then((p) => {
                let f = p[i];
                typeof f == "function" && f.call(p, ...a);
              });
            else {
              let p = c[i];
              typeof p == "function" && p.call(c, ...a);
            }
          },
        }),
      ),
    s.member && t.$members$)
  ) {
    s.watchCallback && e.watchers && (t.$watchers$ = e.watchers);
    let i = Object.entries(t.$members$);
    if (
      (i.map(([a, [d]]) => {
        (s.prop || s.state) && (d & 31 || ((!s.lazyLoad || n & 2) && d & 32))
          ? Object.defineProperty(o, a, {
              get() {
                return se(this, a);
              },
              set(l) {
                if (s.isDev) {
                  let c = g(this);
                  !(n & 1) &&
                    (c && c.$flags$ & 8) === 0 &&
                    d & 31 &&
                    !(d & 1024) &&
                    U(
                      `@Prop() "${a}" on <${t.$tagName$}> is immutable but was modified from within the component.\nMore information: https://stenciljs.com/docs/properties#prop-mutability`,
                    );
                }
                re(this, a, l, t);
              },
              configurable: !0,
              enumerable: !0,
            })
          : s.lazyLoad &&
            s.method &&
            n & 1 &&
            d & 64 &&
            Object.defineProperty(o, a, {
              value(...l) {
                var p;
                let c = g(this);
                return (p = c == null ? void 0 : c.$onInstancePromise$) == null
                  ? void 0
                  : p.then(() => {
                      var f;
                      return (f = c.$lazyInstance$) == null
                        ? void 0
                        : f[a](...l);
                    });
              },
            });
      }),
      s.observeAttribute && (!s.lazyLoad || n & 1))
    ) {
      let a = new Map();
      (o.attributeChangedCallback = function (d, l, c) {
        $.jmp(() => {
          var f;
          let p = a.get(d);
          if (this.hasOwnProperty(p)) (c = this[p]), delete this[p];
          else {
            if (
              o.hasOwnProperty(p) &&
              typeof this[p] == "number" &&
              this[p] == c
            )
              return;
            if (p == null) {
              let m = g(this),
                u = m == null ? void 0 : m.$flags$;
              if (u && !(u & 8) && u & 128 && c !== l) {
                let x = s.lazyLoad ? m.$hostElement$ : this,
                  b = s.lazyLoad ? m.$lazyInstance$ : x,
                  C = (f = t.$watchers$) == null ? void 0 : f[d];
                C == null ||
                  C.forEach((S) => {
                    b[S] != null && b[S].call(b, c, l, d);
                  });
              }
              return;
            }
          }
          this[p] = c === null && typeof this[p] == "boolean" ? !1 : c;
        });
      }),
        (e.observedAttributes = Array.from(
          new Set([
            ...Object.keys((r = t.$watchers$) != null ? r : {}),
            ...i
              .filter(([d, l]) => l[0] & 15)
              .map(([d, l]) => {
                var p;
                let c = l[1] || d;
                return (
                  a.set(c, d),
                  s.reflect &&
                    l[0] & 512 &&
                    ((p = t.$attrsToReflect$) == null || p.push([d, c])),
                  c
                );
              }),
          ]),
        ));
    }
  }
  return e;
};
var xe = async (e, t, n, o) => {
    let r;
    if (!(t.$flags$ & 32)) {
      if (((t.$flags$ |= 32), s.lazyLoad || s.hydrateClientSide)) {
        if (((r = Ce(n, t, o)), r.then)) {
          let l = Lt(
            `st:load:${n.$tagName$}:${t.$modeName$}`,
            `[Stencil] Load module for <${n.$tagName$}>`,
          );
          (r = await r), l();
        }
        if ((s.isDev || s.isDebug) && !r)
          throw new Error(
            `Constructor for "${n.$tagName$}#${t.$modeName$}" was not found`,
          );
        s.member &&
          !r.isProxied &&
          (s.watchCallback && (n.$watchers$ = r.watchers),
          F(r, n, 2),
          (r.isProxied = !0));
        let d = D("createInstance", n.$tagName$);
        s.member && (t.$flags$ |= 8);
        try {
          new r(t);
        } catch (l) {
          v(l);
        }
        s.member && (t.$flags$ &= -9),
          s.watchCallback && (t.$flags$ |= 128),
          d(),
          Fe(t.$lazyInstance$);
      } else
        (r = e.constructor),
          customElements
            .whenDefined(n.$tagName$)
            .then(() => (t.$flags$ |= 128));
      if (s.style && r.style) {
        let d = r.style;
        s.mode &&
          typeof d != "string" &&
          ((d = d[(t.$modeName$ = Pe(e))]),
          s.hydrateServerSide &&
            t.$modeName$ &&
            e.setAttribute("s-mode", t.$modeName$));
        let l = ue(n, t.$modeName$);
        if (!j.has(l)) {
          let c = D("registerStyles", n.$tagName$);
          !s.hydrateServerSide &&
            s.shadowDom &&
            s.shadowDomShim &&
            n.$flags$ & 8 &&
            (d = await import("./internal/client/shadow-css.js").then((p) =>
              p.scopeCss(d, l, !1),
            )),
            Z(l, d, !!(n.$flags$ & 1)),
            c();
        }
      }
    }
    let i = t.$ancestorComponent$,
      a = () => ne(t, !0);
    s.asyncLoading && i && i["s-rc"] ? i["s-rc"].push(a) : a();
  },
  Fe = (e) => {
    s.lazyLoad && s.connectedCallback && I(e, "connectedCallback");
  };
var J = (e) => {
    if (!($.$flags$ & 1)) {
      let t = g(e),
        n = t.$cmpMeta$,
        o = D("connectedCallback", n.$tagName$);
      if (
        (s.hostListenerTargetParent && X(e, t, n.$listeners$, !0),
        t.$flags$ & 1)
      )
        X(e, t, n.$listeners$, !1),
          t != null && t.$lazyInstance$
            ? Fe(t.$lazyInstance$)
            : t != null &&
              t.$onReadyPromise$ &&
              t.$onReadyPromise$.then(() => Fe(t.$lazyInstance$));
      else {
        t.$flags$ |= 1;
        let r;
        if (s.hydrateClientSide && ((r = e.getAttribute(Y)), r)) {
          if (s.shadowDom && R && n.$flags$ & 1) {
            let i = s.mode
              ? Ae(e.shadowRoot, n, e.getAttribute("s-mode"))
              : Ae(e.shadowRoot, n);
            e.classList.remove(i + "-h", i + "-s");
          }
          wt(e, n.$tagName$, r, t);
        }
        if (
          (s.slotRelocation &&
            !r &&
            (s.hydrateServerSide ||
              ((s.slot || s.shadowDom) && n.$flags$ & 12)) &&
            Wn(e),
          s.asyncLoading)
        ) {
          let i = e;
          for (; (i = i.parentNode || i.host); )
            if (
              (s.hydrateClientSide &&
                i.nodeType === 1 &&
                i.hasAttribute("s-id") &&
                i["s-p"]) ||
              i["s-p"]
            ) {
              mt(t, (t.$ancestorComponent$ = i));
              break;
            }
        }
        s.prop &&
          !s.hydrateServerSide &&
          n.$members$ &&
          Object.entries(n.$members$).map(([i, [a]]) => {
            if (a & 31 && e.hasOwnProperty(i)) {
              let d = e[i];
              delete e[i], (e[i] = d);
            }
          }),
          s.initializeNextTick ? ye(() => xe(e, t, n)) : xe(e, t, n);
      }
      o();
    }
  },
  Wn = (e) => {
    let t = (e["s-cr"] = y.createComment(
      s.isDebug ? `content-ref (host=${e.localName})` : "",
    ));
    (t["s-cn"] = !0), e.insertBefore(t, e.firstChild);
  };
var gt = (e) => {
    s.lazyLoad && s.disconnectedCallback && I(e, "disconnectedCallback"),
      s.cmpDidUnload && I(e, "componentDidUnload");
  },
  ie = async (e) => {
    if (!($.$flags$ & 1)) {
      let t = g(e);
      s.hostListener &&
        t.$rmListeners$ &&
        (t.$rmListeners$.map((n) => n()), (t.$rmListeners$ = void 0)),
        s.lazyLoad
          ? t != null && t.$lazyInstance$
            ? gt(t.$lazyInstance$)
            : t != null &&
              t.$onReadyPromise$ &&
              t.$onReadyPromise$.then(() => gt(t.$lazyInstance$))
          : gt(e);
    }
  };
import { NODE_TYPES as Je } from "../../mock-doc/index.js";
var Ye = (e, t) => {
    Te(e), be(e), Yn(e), Jn(e), Kn(e), qn(e), Xn(e), Se(e), De(e, t), Fn(e);
  },
  Te = (e) => {
    let t = e.cloneNode;
    e.cloneNode = function (n) {
      let o = this,
        r = s.shadowDom ? o.shadowRoot && R : !1,
        i = t.call(o, r ? n : !1);
      if (s.slot && !r && n) {
        let a = 0,
          d,
          l,
          c = [
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
          ];
        for (; a < o.childNodes.length; a++)
          (d = o.childNodes[a]["s-nr"]),
            (l = c.every((p) => !o.childNodes[a][p])),
            d &&
              (s.appendChildSlotFix && i.__appendChild
                ? i.__appendChild(d.cloneNode(!0))
                : i.appendChild(d.cloneNode(!0))),
            l && i.appendChild(o.childNodes[a].cloneNode(!0));
      }
      return i;
    };
  },
  be = (e) => {
    (e.__appendChild = e.appendChild),
      (e.appendChild = function (t) {
        let n = (t["s-sn"] = nn(t)),
          o = ae(this.childNodes, n);
        if (o) {
          let r = yt(o, n),
            i = r[r.length - 1],
            a = i.parentNode.insertBefore(t, i.nextSibling);
          return ge(this), oe(this), a;
        }
        return this.__appendChild(t);
      });
  },
  Fn = (e) => {
    (e.__removeChild = e.removeChild),
      (e.removeChild = function (t) {
        if (t && typeof t["s-sn"] < "u") {
          let n = ae(this.childNodes, t["s-sn"]);
          if (n) {
            let r = yt(n, t["s-sn"]).find((i) => i === t);
            if (r) {
              r.remove(), ge(this);
              return;
            }
          }
        }
        return this.__removeChild(t);
      });
  },
  Jn = (e) => {
    let t = e.prepend;
    e.prepend = function (...n) {
      n.forEach((o) => {
        typeof o == "string" && (o = this.ownerDocument.createTextNode(o));
        let r = (o["s-sn"] = nn(o)),
          i = ae(this.childNodes, r);
        if (i) {
          let a = document.createTextNode("");
          (a["s-nr"] = o),
            i["s-cr"].parentNode.__appendChild(a),
            (o["s-ol"] = a);
          let l = yt(i, r)[0];
          return l.parentNode.insertBefore(o, l.nextSibling);
        }
        return (
          o.nodeType === 1 && o.getAttribute("slot") && (o.hidden = !0),
          t.call(this, o)
        );
      });
    };
  },
  Yn = (e) => {
    e.append = function (...t) {
      t.forEach((n) => {
        typeof n == "string" && (n = this.ownerDocument.createTextNode(n)),
          this.appendChild(n);
      });
    };
  },
  qn = (e) => {
    let t = e.insertAdjacentHTML;
    e.insertAdjacentHTML = function (n, o) {
      if (n !== "afterbegin" && n !== "beforeend") return t.call(this, n, o);
      let r = this.ownerDocument.createElement("_"),
        i;
      if (((r.innerHTML = o), n === "afterbegin"))
        for (; (i = r.firstChild); ) this.prepend(i);
      else if (n === "beforeend") for (; (i = r.firstChild); ) this.append(i);
    };
  },
  Xn = (e) => {
    e.insertAdjacentText = function (t, n) {
      this.insertAdjacentHTML(t, n);
    };
  },
  Kn = (e) => {
    let t = e.insertAdjacentElement;
    e.insertAdjacentElement = function (n, o) {
      return n !== "afterbegin" && n !== "beforeend"
        ? t.call(this, n, o)
        : n === "afterbegin"
          ? (this.prepend(o), o)
          : (n === "beforeend" && this.append(o), o);
    };
  },
  Se = (e) => {
    let t = Object.getOwnPropertyDescriptor(Node.prototype, "textContent");
    Object.defineProperty(e, "__textContent", t),
      s.experimentalScopedSlotChanges
        ? Object.defineProperty(e, "textContent", {
            get() {
              return (
                " " +
                ht(this.childNodes)
                  .map((r) => {
                    var d, l;
                    let i = [],
                      a = r.nextSibling;
                    for (; a && a["s-sn"] === r["s-sn"]; )
                      (a.nodeType === Je.TEXT_NODE ||
                        a.nodeType === Je.ELEMENT_NODE) &&
                        i.push(
                          (l =
                            (d = a.textContent) == null ? void 0 : d.trim()) !=
                            null
                            ? l
                            : "",
                        ),
                        (a = a.nextSibling);
                    return i.filter((c) => c !== "").join(" ");
                  })
                  .filter((r) => r !== "")
                  .join(" ") +
                " "
              );
            },
            set(n) {
              ht(this.childNodes).forEach((r) => {
                let i = r.nextSibling;
                for (; i && i["s-sn"] === r["s-sn"]; ) {
                  let a = i;
                  (i = i.nextSibling), a.remove();
                }
                if (r["s-sn"] === "") {
                  let a = this.ownerDocument.createTextNode(n);
                  (a["s-sn"] = ""),
                    r.parentElement.insertBefore(a, r.nextSibling);
                } else r.remove();
              });
            },
          })
        : Object.defineProperty(e, "textContent", {
            get() {
              var o;
              let n = ae(this.childNodes, "");
              return ((o = n == null ? void 0 : n.nextSibling) == null
                ? void 0
                : o.nodeType) === Je.TEXT_NODE
                ? n.nextSibling.textContent
                : n
                  ? n.textContent
                  : this.__textContent;
            },
            set(n) {
              var r;
              let o = ae(this.childNodes, "");
              if (
                ((r = o == null ? void 0 : o.nextSibling) == null
                  ? void 0
                  : r.nodeType) === Je.TEXT_NODE
              )
                o.nextSibling.textContent = n;
              else if (o) o.textContent = n;
              else {
                this.__textContent = n;
                let i = this["s-cr"];
                i && this.insertBefore(i, this.firstChild);
              }
            },
          });
  },
  De = (e, t) => {
    class n extends Array {
      item(r) {
        return this[r];
      }
    }
    if (t.$flags$ & 8) {
      let o = e.__lookupGetter__("childNodes");
      Object.defineProperty(e, "children", {
        get() {
          return this.childNodes.map((r) => r.nodeType === 1);
        },
      }),
        Object.defineProperty(e, "childElementCount", {
          get() {
            return e.children.length;
          },
        }),
        Object.defineProperty(e, "childNodes", {
          get() {
            let r = o.call(this);
            if (!($.$flags$ & 1) && g(this).$flags$ & 2) {
              let i = new n();
              for (let a = 0; a < r.length; a++) {
                let d = r[a]["s-nr"];
                d && i.push(d);
              }
              return i;
            }
            return n.from(r);
          },
        });
    }
  },
  ht = (e) => {
    let t = [];
    for (let n of Array.from(e))
      n["s-sr"] && t.push(n), t.push(...ht(n.childNodes));
    return t;
  },
  nn = (e) => e["s-sn"] || (e.nodeType === 1 && e.getAttribute("slot")) || "",
  ae = (e, t) => {
    let n = 0,
      o;
    for (; n < e.length; n++)
      if (
        ((o = e[n]),
        (o["s-sr"] && o["s-sn"] === t) || ((o = ae(o.childNodes, t)), o))
      )
        return o;
    return null;
  },
  yt = (e, t) => {
    let n = [e];
    for (; (e = e.nextSibling) && e["s-sn"] === t; ) n.push(e);
    return n;
  };
var on = (e, t) => {
    customElements.define(t[1], xt(e, t));
  },
  xt = (e, t) => {
    let n = { $flags$: t[0], $tagName$: t[1] };
    s.member && (n.$members$ = t[2]),
      s.hostListener && (n.$listeners$ = t[3]),
      s.watchCallback && (n.$watchers$ = e.$watchers$),
      s.reflect && (n.$attrsToReflect$ = []),
      s.shadowDom && !R && n.$flags$ & 1 && (n.$flags$ |= 8),
      s.experimentalSlotFixes
        ? s.scoped && n.$flags$ & 2 && Ye(e.prototype, n)
        : (s.slotChildNodesFix && De(e.prototype, n),
          s.cloneNodeFix && Te(e.prototype),
          s.appendChildSlotFix && be(e.prototype),
          s.scopedSlotTextContentFix && n.$flags$ & 2 && Se(e.prototype));
    let o = e.prototype.connectedCallback,
      r = e.prototype.disconnectedCallback;
    return (
      Object.assign(e.prototype, {
        __registerHost() {
          le(this, n);
        },
        connectedCallback() {
          J(this), s.connectedCallback && o && o.call(this);
        },
        disconnectedCallback() {
          ie(this), s.disconnectedCallback && r && r.call(this);
        },
        __attachShadow() {
          R
            ? s.shadowDelegatesFocus
              ? this.attachShadow({
                  mode: "open",
                  delegatesFocus: !!(n.$flags$ & 16),
                })
              : this.attachShadow({ mode: "open" })
            : (this.shadowRoot = this);
        },
      }),
      (e.is = n.$tagName$),
      F(e, n, 3)
    );
  },
  sn = (e) => {
    if (s.style && s.mode && !s.lazyLoad) {
      let t = Pe(e),
        n = g(e);
      if (n.$modeName$ !== t) {
        let o = n.$cmpMeta$,
          r = e["s-sc"],
          i = ue(o, t),
          a = e.constructor.style[t],
          d = o.$flags$;
        a &&
          (j.has(i) || Z(i, a, !!(d & 1)),
          (n.$modeName$ = t),
          e.classList.remove(r + "-h", r + "-s"),
          Ue(n),
          oe(e));
      }
    }
  };
var rn = (e, t, n) => {
  let o = g(e);
  (o.$flags$ = 1), xe(e, o, t, n);
};
var an = (e, t = {}) => {
  var b;
  s.profile && performance.mark && performance.mark("st:app:start"), Ot();
  let n = D("bootstrapLazy"),
    o = [],
    r = t.exclude || [],
    i = E.customElements,
    a = y.head,
    d = a.querySelector("meta[charset]"),
    l = y.createElement("style"),
    c = [],
    p = y.querySelectorAll(`[${Q}]`),
    f,
    m = !0,
    u = 0;
  if (
    (Object.assign($, t),
    ($.$resourcesUrl$ = new URL(t.resourcesUrl || "./", y.baseURI).href),
    s.asyncQueue && t.syncQueue && ($.$flags$ |= 4),
    s.hydrateClientSide && ($.$flags$ |= 2),
    s.hydrateClientSide && s.shadowDom)
  )
    for (; u < p.length; u++) Z(p[u].getAttribute(Q), _t(p[u].innerHTML), !0);
  let x = !1;
  if (
    (e.map((C) => {
      C[1].map((S) => {
        var k;
        let h = {
          $flags$: S[0],
          $tagName$: S[1],
          $members$: S[2],
          $listeners$: S[3],
        };
        h.$flags$ & 4 && (x = !0),
          s.member && (h.$members$ = S[2]),
          s.hostListener && (h.$listeners$ = S[3]),
          s.reflect && (h.$attrsToReflect$ = []),
          s.watchCallback && (h.$watchers$ = (k = S[4]) != null ? k : {}),
          s.shadowDom && !R && h.$flags$ & 1 && (h.$flags$ |= 8);
        let de =
            s.transformTagName && t.transformTagName
              ? t.transformTagName(h.$tagName$)
              : h.$tagName$,
          w = class extends HTMLElement {
            constructor(N) {
              super(N),
                (N = this),
                le(N, h),
                s.shadowDom &&
                  h.$flags$ & 1 &&
                  (R
                    ? s.shadowDelegatesFocus
                      ? N.attachShadow({
                          mode: "open",
                          delegatesFocus: !!(h.$flags$ & 16),
                        })
                      : N.attachShadow({ mode: "open" })
                    : !s.hydrateServerSide &&
                      !("shadowRoot" in N) &&
                      (N.shadowRoot = N));
            }
            connectedCallback() {
              f && (clearTimeout(f), (f = null)),
                m ? c.push(this) : $.jmp(() => J(this));
            }
            disconnectedCallback() {
              $.jmp(() => ie(this));
            }
            componentOnReady() {
              return g(this).$onReadyPromise$;
            }
          };
        s.experimentalSlotFixes
          ? s.scoped && h.$flags$ & 2 && Ye(w.prototype, h)
          : (s.slotChildNodesFix && De(w.prototype, h),
            s.cloneNodeFix && Te(w.prototype),
            s.appendChildSlotFix && be(w.prototype),
            s.scopedSlotTextContentFix && h.$flags$ & 2 && Se(w.prototype)),
          s.formAssociated && h.$flags$ & 64 && (w.formAssociated = !0),
          s.hotModuleReplacement &&
            (w.prototype["s-hmr"] = function (N) {
              rn(this, h, N);
            }),
          (h.$lazyBundleId$ = C[0]),
          !r.includes(de) &&
            !i.get(de) &&
            (o.push(de), i.define(de, F(w, h, 1)));
      });
    }),
    o.length > 0 &&
      (x && (l.innerHTML += Ie),
      s.invisiblePrehydration &&
        (s.hydratedClass || s.hydratedAttribute) &&
        (l.innerHTML += o + It),
      l.innerHTML.length))
  ) {
    l.setAttribute("data-styles", "");
    let C = (b = $.$nonce$) != null ? b : Ee(y);
    C != null && l.setAttribute("nonce", C),
      a.insertBefore(l, d ? d.nextSibling : a.firstChild);
  }
  (m = !1),
    c.length
      ? c.map((C) => C.connectedCallback())
      : s.profile
        ? $.jmp(() => (f = setTimeout(We, 30, "timeout")))
        : $.jmp(() => (f = setTimeout(We, 30))),
    n();
};
var ln = (e, t) => t;
var X = (e, t, n, o) => {
    s.hostListener &&
      n &&
      (s.hostListenerTargetParent &&
        (o
          ? (n = n.filter(([r]) => r & 32))
          : (n = n.filter(([r]) => !(r & 32)))),
      n.map(([r, i, a]) => {
        let d = s.hostListenerTarget ? Vn(e, r) : e,
          l = Qn(t, a),
          c = Zn(r);
        $.ael(d, i, l, c),
          (t.$rmListeners$ = t.$rmListeners$ || []).push(() =>
            $.rel(d, i, l, c),
          );
      }));
  },
  Qn = (e, t) => (n) => {
    try {
      s.lazyLoad
        ? e.$flags$ & 256
          ? e.$lazyInstance$[t](n)
          : (e.$queuedListeners$ = e.$queuedListeners$ || []).push([t, n])
        : e.$hostElement$[t](n);
    } catch (o) {
      v(o);
    }
  },
  Vn = (e, t) =>
    s.hostListenerTargetDocument && t & 4
      ? y
      : s.hostListenerTargetWindow && t & 8
        ? E
        : s.hostListenerTargetBody && t & 16
          ? y.body
          : s.hostListenerTargetParent && t & 32
            ? e.parentElement
            : e,
  Zn = (e) =>
    dn ? { passive: (e & 1) !== 0, capture: (e & 2) !== 0 } : (e & 2) !== 0;
var Ct = (e) => ($.$nonce$ = e);
var qe = (e, t) => {
    if (e != null) {
      let n = { hostIds: 0, rootLevelIds: 0, staticComponents: new Set(t) },
        o = [];
      cn(e, e.body, n, o),
        o.forEach((r) => {
          var i, a;
          if (r != null && r["s-nr"]) {
            let d = r["s-nr"],
              l = d["s-host-id"],
              c = d["s-node-id"],
              p = `${l}.${c}`;
            if (l == null) {
              if (
                ((l = 0),
                n.rootLevelIds++,
                (c = n.rootLevelIds),
                (p = `${l}.${c}`),
                d.nodeType === 1)
              )
                d.setAttribute(z, p);
              else if (d.nodeType === 3) {
                if (
                  l === 0 &&
                  ((i = d.nodeValue) == null ? void 0 : i.trim()) === ""
                ) {
                  r.remove();
                  return;
                }
                let u = e.createComment(p);
                (u.nodeValue = `${pe}.${p}`),
                  (a = d.parentNode) == null || a.insertBefore(u, d);
              }
            }
            let f = `${Le}.${p}`,
              m = r.parentElement;
            m &&
              (m["s-en"] === ""
                ? (f += ".")
                : m["s-en"] === "c" && (f += ".c")),
              (r.nodeValue = f);
          }
        });
    }
  },
  cn = (e, t, n, o) => {
    t != null &&
      (t["s-nr"] != null && o.push(t),
      t.nodeType === 1 &&
        t.childNodes.forEach((r) => {
          let i = g(r);
          if (i != null && !n.staticComponents.has(r.nodeName.toLowerCase())) {
            let a = { nodeIds: 0 };
            Gn(e, r, i.$vnode$, n, a);
          }
          cn(e, r, n, o);
        }));
  },
  Gn = (e, t, n, o, r) => {
    if (n != null) {
      let i = ++o.hostIds;
      if (
        (t.setAttribute(Y, i),
        t["s-cr"] != null && (t["s-cr"].nodeValue = `${ve}.${i}`),
        n.$children$ != null &&
          n.$children$.forEach((d, l) => {
            pn(e, d, r, i, 0, l);
          }),
        t && n && n.$elm$ && !t.hasAttribute(z))
      ) {
        let a = t.parentElement;
        if (a && a.childNodes) {
          let d = Array.from(a.childNodes),
            l = d.find((c) => c.nodeType === 8 && c["s-sr"]);
          if (l) {
            let c = d.indexOf(t) - 1;
            n.$elm$.setAttribute(
              z,
              `${l["s-host-id"]}.${l["s-node-id"]}.0.${c}`,
            );
          }
        }
      }
    }
  },
  pn = (e, t, n, o, r, i) => {
    let a = t.$elm$;
    if (a == null) return;
    let d = n.nodeIds++,
      l = `${o}.${d}.${r}.${i}`;
    if (((a["s-host-id"] = o), (a["s-node-id"] = d), a.nodeType === 1))
      a.setAttribute(z, l);
    else if (a.nodeType === 3) {
      let c = a.parentNode,
        p = c == null ? void 0 : c.nodeName;
      if (p !== "STYLE" && p !== "SCRIPT") {
        let f = `${pe}.${l}`,
          m = e.createComment(f);
        c == null || c.insertBefore(m, a);
      }
    } else if (a.nodeType === 8 && a["s-sr"]) {
      let c = a["s-sn"] || "",
        p = `${Oe}.${l}.${c}`;
      a.nodeValue = p;
    }
    if (t.$children$ != null) {
      let c = r + 1;
      t.$children$.forEach((p, f) => {
        pn(e, p, n, o, c, f);
      });
    }
  };
var eo = (e, t, ...n) => {
  if (Array.isArray(n) && n.length > 0) {
    let o = n.flat(1 / 0);
    return o.some(Et)
      ? Promise.all(o)
          .then((r) => A(e, t, ...r))
          .catch((r) => (q(r), A(e, t)))
      : A(e, t, ...n);
  }
  return A(e, t);
};
var fn = () => {};
function un(e, t) {
  if (
    (typeof e.componentOnReady != "function" && (e.componentOnReady = to),
    typeof e.forceUpdate != "function" && (e.forceUpdate = no),
    t.$flags$ & 1 && (e.shadowRoot = e),
    t.$members$ != null)
  ) {
    let n = g(e);
    Object.entries(t.$members$).forEach(([r, i]) => {
      let a = i[0];
      if (a & 31) {
        let d = i[1] || r,
          l = e.getAttribute(d);
        if (l != null) {
          let p = V(l, a);
          n.$instanceValues$.set(r, p);
        }
        let c = e[r];
        c !== void 0 && (n.$instanceValues$.set(r, c), delete e[r]),
          Object.defineProperty(e, r, {
            get() {
              return se(this, r);
            },
            set(p) {
              re(this, r, p, t);
            },
            configurable: !0,
            enumerable: !0,
          });
      } else
        a & 64 &&
          Object.defineProperty(e, r, {
            value(...d) {
              let l = g(this);
              return l.$onInstancePromise$
                .then(() => l.$lazyInstance$[r](...d))
                .catch(v);
            },
          });
    });
  }
}
function to() {
  return g(this).$onReadyPromise$;
}
function no() {}
function oo(e, t, n, o, r) {
  let i = new Set(),
    a = new Set(),
    d = new Set(),
    l = e.document.createElement,
    c = e.document.createElementNS,
    p = Promise.resolve(),
    f,
    m = !1;
  function u() {
    if ((global.clearTimeout(f), a.clear(), i.clear(), !m)) {
      m = !0;
      try {
        t.clientHydrateAnnotations && qe(e.document, t.staticComponents),
          e.dispatchEvent(new e.Event("DOMContentLoaded")),
          (e.document.createElement = l),
          (e.document.createElementNS = c);
      } catch (k) {
        $n(t, n, k);
      }
    }
    o(e, t, n, r);
  }
  function x(k) {
    $n(t, n, k), u();
  }
  function b() {
    x(`Hydrate exceeded timeout${lo(d)}`);
  }
  try {
    let k = function () {
        return Ke(this);
      },
      N = function (T) {
        if (mn(T, t) && !g(T)) {
          let L = Ce(
            { $tagName$: T.nodeName.toLowerCase(), $flags$: null },
            null,
          );
          L != null &&
            L.cmpMeta != null &&
            (a.add(T),
            (T.connectedCallback = k),
            le(T, L.cmpMeta),
            un(T, L.cmpMeta));
        }
      },
      Xe = function (T) {
        if (T != null && T.nodeType === 1) {
          N(T);
          let H = T.children;
          for (let L = 0, Re = H.length; L < Re; L++) Xe(H[L]);
        }
      },
      Ke = function (T) {
        return (
          a.delete(T),
          mn(T, t) && n.hydratedCount < t.maxHydrateCount && !i.has(T) && gn(T)
            ? (i.add(T), so(e, n, T.nodeName, T, d))
            : p
        );
      },
      Qe = function () {
        let T = Array.from(a).filter((H) => H.parentElement);
        return T.length > 0 ? Promise.all(T.map(Ke)).then(Qe) : p;
      };
    var C = k,
      S = N,
      h = Xe,
      de = Ke,
      w = Qe;
    (e.document.createElement = function (H) {
      let L = l.call(e.document, H);
      return N(L), L;
    }),
      (e.document.createElementNS = function (H, L) {
        let Re = c.call(e.document, H, L);
        return N(Re), Re;
      }),
      (f = global.setTimeout(b, t.timeout)),
      ($.$resourcesUrl$ = new URL(t.resourcesUrl || "./", y.baseURI).href),
      fn(),
      Xe(e.document.body),
      Qe().then(u).catch(x);
  } catch (k) {
    x(k);
  }
}
async function so(e, t, n, o, r) {
  n = n.toLowerCase();
  let i = Ce({ $tagName$: n, $flags$: null }, null);
  if (i != null && i.cmpMeta != null) {
    r.add(o);
    try {
      J(o), await o.componentOnReady(), t.hydratedCount++;
      let d = g(o),
        l = d.$modeName$ ? d.$modeName$ : "$";
      t.components.some((c) => c.tag === n && c.mode === l) ||
        t.components.push({ tag: n, mode: l, count: 0, depth: -1 });
    } catch (d) {
      e.console.error(d);
    }
    r.delete(o);
  }
}
function mn(e, t) {
  if (e != null && e.nodeType === 1) {
    let n = e.nodeName;
    if (typeof n == "string" && n.includes("-"))
      return !t.excludeComponents.includes(n.toLowerCase());
  }
  return !1;
}
function gn(e) {
  if (e.nodeType === 9) return !0;
  if (ro.has(e.nodeName) || e.hasAttribute("no-prerender")) return !1;
  let t = e.parentNode;
  return t == null ? !0 : gn(t);
}
var ro = new Set([
  "CODE",
  "HEAD",
  "IFRAME",
  "INPUT",
  "OBJECT",
  "OUTPUT",
  "NOSCRIPT",
  "PRE",
  "SCRIPT",
  "SELECT",
  "STYLE",
  "TEMPLATE",
  "TEXTAREA",
]);
function $n(e, t, n) {
  let o = {
    level: "error",
    type: "build",
    header: "Hydrate Error",
    messageText: "",
    relFilePath: void 0,
    absFilePath: void 0,
    lines: [],
  };
  if (e.url)
    try {
      let r = new URL(e.url);
      r.pathname !== "/" && (o.header += ": " + r.pathname);
    } catch {}
  n != null &&
    (n.stack != null
      ? (o.messageText = n.stack.toString())
      : n.message != null
        ? (o.messageText = n.message.toString())
        : (o.messageText = n.toString())),
    t.diagnostics.push(o);
}
function io(e) {
  let t = `<${e.nodeName.toLowerCase()}`;
  if (Array.isArray(e.attributes))
    for (let n = 0; n < e.attributes.length; n++) {
      let o = e.attributes[n];
      (t += ` ${o.name}`), o.value !== "" && (t += `="${o.value}"`);
    }
  return (t += ">"), t;
}
function ao(e) {
  let t = "";
  if (e) {
    let n = [];
    t = " - waiting on:";
    let o = e;
    for (; o && o.nodeType !== 9 && o.nodeName !== "BODY"; )
      n.unshift(io(o)), (o = o.parentElement);
    let r = "";
    for (let i of n) (r += "  "), (t += `\n${r}${i}`);
  }
  return t;
}
function lo(e) {
  return Array.from(e).map(ao);
}
var hn,
  yn = new Map(),
  xn = (e) => {
    if (typeof e == "string") {
      e = e.toLowerCase();
      let t = yn.get(e);
      if (t != null) return t[e];
    }
    return null;
  },
  Ce = (e, t, n) => xn(e.$tagName$),
  it = (e, t) => {
    if (e != null) {
      if (t in e) return !0;
      let n = xn(e.nodeName);
      if (n != null) {
        let o = n;
        if (o != null && o.cmpMeta != null && o.cmpMeta.$members$ != null)
          return t in o.cmpMeta.$members$;
      }
    }
    return !1;
  },
  ll = (e) => {
    for (let t of e) {
      let n = t.cmpMeta.$tagName$;
      yn.set(n, { [n]: t });
    }
  },
  E = window,
  y = E.document,
  dl = (e) => {
    process.nextTick(() => {
      try {
        e();
      } catch (t) {
        v(t);
      }
    });
  },
  tn = (e) => {
    process.nextTick(() => {
      try {
        e();
      } catch (t) {
        v(t);
      }
    });
  },
  co = Promise.resolve(),
  ye = (e) => co.then(e),
  po = (e) => {
    e != null && console.error(e.stack || e.message || e);
  },
  v = (e, t) => (hn || po)(e, t),
  q = (...e) => {},
  U = (...e) => {},
  cl = (...e) => {},
  pl = (e) => (hn = e),
  $ = {
    $flags$: 0,
    $resourcesUrl$: "",
    jmp: (e) => e(),
    raf: (e) => requestAnimationFrame(e),
    ael: (e, t, n, o) => e.addEventListener(t, n, o),
    rel: (e, t, n, o) => e.removeEventListener(t, n, o),
    ce: (e, t) => new E.CustomEvent(e, t),
  },
  fl = (e) => {
    Object.assign($, e);
  },
  R = !1,
  dn = !1,
  zt = !1,
  Tt = new WeakMap(),
  g = (e) => Tt.get(e),
  ul = (e, t) => Tt.set((t.$lazyInstance$ = e), t),
  le = (e, t) => {
    let n = {
      $flags$: 0,
      $cmpMeta$: t,
      $hostElement$: e,
      $instanceValues$: new Map(),
      $renderCount$: 0,
    };
    return (
      (n.$onInstancePromise$ = new Promise((o) => (n.$onInstanceResolve$ = o))),
      (n.$onReadyPromise$ = new Promise((o) => (n.$onReadyResolve$ = o))),
      (e["s-p"] = []),
      (e["s-rc"] = []),
      X(e, n, t.$listeners$, !1),
      Tt.set(e, n)
    );
  },
  ut = { isDev: !1, isBrowser: !1, isServer: !0, isTesting: !1 },
  j = new Map(),
  rt = [];
export {
  s as BUILD,
  ut as Build,
  bn as Env,
  ln as Fragment,
  nt as Host,
  ce as NAMESPACE,
  X as addHostEventListeners,
  an as bootstrapLazy,
  yn as cmpModules,
  J as connectedCallback,
  q as consoleDevError,
  cl as consoleDevInfo,
  U as consoleDevWarn,
  v as consoleError,
  Ut as createEvent,
  on as defineCustomElement,
  ie as disconnectedCallback,
  y as doc,
  sn as forceModeUpdate,
  oe as forceUpdate,
  bt as getAssetPath,
  we as getElement,
  g as getHostRef,
  At as getMode,
  Zt as getRenderingRef,
  se as getValue,
  eo as h,
  oo as hydrateApp,
  qe as insertVdomAnnotations,
  it as isMemberInElement,
  Ce as loadModule,
  rt as modeResolutionChain,
  ye as nextTick,
  V as parsePropertyValue,
  $ as plt,
  je as postUpdateComponent,
  F as proxyComponent,
  xt as proxyCustomElement,
  dl as readTask,
  ll as registerComponents,
  le as registerHost,
  ul as registerInstance,
  he as renderVdom,
  St as setAssetPath,
  pl as setErrorHandler,
  Ht as setMode,
  Ct as setNonce,
  fl as setPlatformHelpers,
  re as setValue,
  j as styles,
  zt as supportsConstructableStylesheets,
  dn as supportsListenerOptions,
  R as supportsShadow,
  E as win,
  tn as writeTask,
};
