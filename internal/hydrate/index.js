/*
 Stencil Hydrate Platform v4.12.0-dev.1706554080.8760468 | MIT Licensed | https://stenciljs.com
 */
var Mn = Object.defineProperty;
var Ot = (e, t) => () => (e && (t = e((e = 0))), t);
var It = (e, t) => {
  for (var n in t) Mn(e, n, { get: t[n], enumerable: !0 });
};
var Ut,
  ot = Ot(() => {
    "use strict";
    Ut = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  });
var Cn = {};
It(Cn, { scopeCss: () => zo });
var lo,
  co,
  Ce,
  mn,
  gn,
  bt,
  po,
  fo,
  uo,
  X,
  mo,
  go,
  $o,
  Ye,
  St,
  ho,
  yo,
  xo,
  Co,
  To,
  bo,
  So,
  Ro,
  Do,
  No,
  Eo,
  vo,
  qe,
  Tt,
  Lo,
  Oo,
  $n,
  hn,
  Io,
  ko,
  wo,
  Po,
  Ho,
  Ao,
  _o,
  yn,
  Uo,
  Mo,
  Bo,
  xn,
  jo,
  Ct,
  zo,
  Tn = Ot(() => {
    "use strict";
    ot();
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     *
     * This file is a port of shadowCSS from `webcomponents.js` to TypeScript.
     * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
     * https://github.com/angular/angular/blob/master/packages/compiler/src/shadow_css.ts
     */ (lo = (e) => {
      let t = [],
        n = 0;
      return (
        (e = e.replace(/(\[[^\]]*\])/g, (i, a) => {
          let c = `__ph-${n}__`;
          return t.push(a), n++, c;
        })),
        {
          content: e.replace(/(:nth-[-\w]+)(\([^)]+\))/g, (i, a, c) => {
            let l = `__ph-${n}__`;
            return t.push(c), n++, a + l;
          }),
          placeholders: t,
        }
      );
    }),
      (co = (e, t) => t.replace(/__ph-(\d+)__/g, (n, o) => e[+o])),
      (Ce = "-shadowcsshost"),
      (mn = "-shadowcssslotted"),
      (gn = "-shadowcsscontext"),
      (bt = ")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)"),
      (po = new RegExp("(" + Ce + bt, "gim")),
      (fo = new RegExp("(" + gn + bt, "gim")),
      (uo = new RegExp("(" + mn + bt, "gim")),
      (X = Ce + "-no-combinator"),
      (mo = /-shadowcsshost-no-combinator([^\s]*)/),
      (go = [/::shadow/g, /::content/g]),
      ($o = "([>\\s~+[.,{:][\\s\\S]*)?$"),
      (Ye = /-shadowcsshost/gim),
      (St = (e) =>
        new RegExp(`((?<!(^@supports(.*)))|(?<={.*))(${e}\\b)`, "gim")),
      (ho = St("::slotted")),
      (yo = St(":host")),
      (xo = St(":host-context")),
      (Co = /\/\*\s*[\s\S]*?\*\//g),
      (To = (e) => e.replace(Co, "")),
      (bo = /\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g),
      (So = (e) => e.match(bo) || []),
      (Ro = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g),
      (Do = /([{}])/g),
      (No = /(^.*?[^\\])??((:+)(.*)|$)/),
      (Eo = "{"),
      (vo = "}"),
      (qe = "%BLOCK%"),
      (Tt = (e, t) => {
        let n = Lo(e),
          o = 0;
        return n.escapedString.replace(Ro, (...s) => {
          let i = s[2],
            a = "",
            c = s[4],
            l = "";
          c &&
            c.startsWith("{" + qe) &&
            ((a = n.blocks[o++]), (c = c.substring(qe.length + 1)), (l = "{"));
          let p = t({ selector: i, content: a });
          return `${s[1]}${p.selector}${s[3]}${l}${p.content}${c}`;
        });
      }),
      (Lo = (e) => {
        let t = e.split(Do),
          n = [],
          o = [],
          s = 0,
          i = [];
        for (let c = 0; c < t.length; c++) {
          let l = t[c];
          l === vo && s--,
            s > 0
              ? i.push(l)
              : (i.length > 0 && (o.push(i.join("")), n.push(qe), (i = [])),
                n.push(l)),
            l === Eo && s++;
        }
        return (
          i.length > 0 && (o.push(i.join("")), n.push(qe)),
          { escapedString: n.join(""), blocks: o }
        );
      }),
      (Oo = (e) => (
        (e = e
          .replace(xo, `$1${gn}`)
          .replace(yo, `$1${Ce}`)
          .replace(ho, `$1${mn}`)),
        e
      )),
      ($n = (e, t, n) =>
        e.replace(t, (...o) => {
          if (o[2]) {
            let s = o[2].split(","),
              i = [];
            for (let a = 0; a < s.length; a++) {
              let c = s[a].trim();
              if (!c) break;
              i.push(n(X, c, o[3]));
            }
            return i.join(",");
          } else return X + o[3];
        })),
      (hn = (e, t, n) => e + t.replace(Ce, "") + n),
      (Io = (e) => $n(e, po, hn)),
      (ko = (e, t, n) =>
        t.indexOf(Ce) > -1 ? hn(e, t, n) : e + t + n + ", " + t + " " + e + n),
      (wo = (e, t) => {
        let n = "." + t + " > ",
          o = [];
        return (
          (e = e.replace(uo, (...s) => {
            if (s[2]) {
              let i = s[2].trim(),
                a = s[3],
                c = n + i + a,
                l = "";
              for (let f = s[4] - 1; f >= 0; f--) {
                let u = s[5][f];
                if (u === "}" || u === ",") break;
                l = u + l;
              }
              let d = (l + c).trim(),
                p = `${l.trimEnd()}${c.trim()}`.trim();
              if (d !== p) {
                let f = `${p}, ${d}`;
                o.push({ orgSelector: d, updatedSelector: f });
              }
              return c;
            } else return X + s[3];
          })),
          { selectors: o, cssText: e }
        );
      }),
      (Po = (e) => $n(e, fo, ko)),
      (Ho = (e) => go.reduce((t, n) => t.replace(n, " "), e)),
      (Ao = (e) => {
        let t = /\[/g,
          n = /\]/g;
        return (
          (e = e.replace(t, "\\[").replace(n, "\\]")),
          new RegExp("^(" + e + ")" + $o, "m")
        );
      }),
      (_o = (e, t) => !Ao(t).test(e)),
      (yn = (e, t) =>
        e.replace(No, (n, o = "", s, i = "", a = "") => o + t + i + a)),
      (Uo = (e, t, n) => {
        if (((Ye.lastIndex = 0), Ye.test(e))) {
          let o = `.${n}`;
          return e.replace(mo, (s, i) => yn(i, o)).replace(Ye, o + " ");
        }
        return t + " " + e;
      }),
      (Mo = (e, t, n) => {
        let o = /\[is=([^\]]*)\]/g;
        t = t.replace(o, (h, ...y) => y[0]);
        let s = "." + t,
          i = (h) => {
            let y = h.trim();
            if (!y) return "";
            if (h.indexOf(X) > -1) y = Uo(h, t, n);
            else {
              let x = h.replace(Ye, "");
              x.length > 0 && (y = yn(x, s));
            }
            return y;
          },
          a = lo(e);
        e = a.content;
        let c = "",
          l = 0,
          d,
          p = /( |>|\+|~(?!=))\s*/g,
          u = !(e.indexOf(X) > -1);
        for (; (d = p.exec(e)) !== null; ) {
          let h = d[1],
            y = e.slice(l, d.index).trim();
          u = u || y.indexOf(X) > -1;
          let x = u ? i(y) : y;
          (c += `${x} ${h} `), (l = p.lastIndex);
        }
        let m = e.substring(l);
        return (
          (u = u || m.indexOf(X) > -1),
          (c += u ? i(m) : m),
          co(a.placeholders, c)
        );
      }),
      (Bo = (e, t, n, o) =>
        e
          .split(",")
          .map((s) =>
            o && s.indexOf("." + o) > -1
              ? s.trim()
              : _o(s, t)
                ? Mo(s, t, n).trim()
                : s.trim(),
          )
          .join(", ")),
      (xn = (e, t, n, o, s) =>
        Tt(e, (i) => {
          let a = i.selector,
            c = i.content;
          return (
            i.selector[0] !== "@"
              ? (a = Bo(i.selector, t, n, o))
              : (i.selector.startsWith("@media") ||
                  i.selector.startsWith("@supports") ||
                  i.selector.startsWith("@page") ||
                  i.selector.startsWith("@document")) &&
                (c = xn(i.content, t, n, o, s)),
            { selector: a.replace(/\s{2,}/g, " ").trim(), content: c }
          );
        })),
      (jo = (e, t, n, o, s) => {
        (e = Oo(e)), (e = Io(e)), (e = Po(e));
        let i = wo(e, o);
        return (
          (e = i.cssText),
          (e = Ho(e)),
          t && (e = xn(e, t, n, o, s)),
          (e = Ct(e, n)),
          (e = e.replace(/>\s*\*\s+([^{, ]+)/gm, " $1 ")),
          {
            cssText: e.trim(),
            slottedSelectors: i.selectors.map((a) => ({
              orgSelector: Ct(a.orgSelector, n),
              updatedSelector: Ct(a.updatedSelector, n),
            })),
          }
        );
      }),
      (Ct = (e, t) => e.replace(/-shadowcsshost-no-combinator/g, `.${t}`)),
      (zo = (e, t, n) => {
        let o = t + "-h",
          s = t + "-s",
          i = So(e);
        e = To(e);
        let a = [];
        if (n) {
          let l = (d) => {
            let p = `/*!@___${a.length}___*/`,
              f = `/*!@${d.selector}*/`;
            return (
              a.push({ placeholder: p, comment: f }),
              (d.selector = p + d.selector),
              d
            );
          };
          e = Tt(e, (d) =>
            d.selector[0] !== "@"
              ? l(d)
              : ((d.selector.startsWith("@media") ||
                  d.selector.startsWith("@supports") ||
                  d.selector.startsWith("@page") ||
                  d.selector.startsWith("@document")) &&
                  (d.content = Tt(d.content, l)),
                d),
          );
        }
        let c = jo(e, t, o, s, n);
        return (
          (e = [c.cssText, ...i].join(`
`)),
          n &&
            a.forEach(({ placeholder: l, comment: d }) => {
              e = e.replace(l, d);
            }),
          c.slottedSelectors.forEach((l) => {
            let d = new RegExp(Ut(l.orgSelector), "g");
            e = e.replace(d, l.updatedSelector);
          }),
          e
        );
      });
  });
var kt = (e) => {
    let t = new URL(e, g.$resourcesUrl$);
    return t.origin !== E.location.origin ? t.href : t.pathname;
  },
  wt = (e) => (g.$resourcesUrl$ = e);
var r = {
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
  Bn = {},
  pe = "app";
var tt = {},
  Pt = "http://www.w3.org/2000/svg",
  Ht = "http://www.w3.org/1999/xhtml";
var At = (e) => e != null;
var V = (e) => ((e = typeof e), e === "object" || e === "function");
var _t = (e) =>
  !!e &&
  (typeof e == "object" || typeof e == "function") &&
  typeof e.then == "function";
function Le(e) {
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
ot();
var rt = {};
It(rt, {
  err: () => Mt,
  map: () => Fn,
  ok: () => st,
  unwrap: () => Jn,
  unwrapErr: () => Yn,
});
var st = (e) => ({ isOk: !0, isErr: !1, value: e }),
  Mt = (e) => ({ isOk: !1, isErr: !0, value: e });
function Fn(e, t) {
  if (e.isOk) {
    let n = t(e.value);
    return n instanceof Promise ? n.then((o) => st(o)) : st(n);
  }
  if (e.isErr) {
    let n = e.value;
    return Mt(n);
  }
  throw "should never get here";
}
var Jn = (e) => {
    if (e.isOk) return e.value;
    throw e.value;
  },
  Yn = (e) => {
    if (e.isErr) return e.value;
    throw e.value;
  };
var qn = 0,
  R = (e, t = "") => {
    if (r.profile && performance.mark) {
      let n = `st:${e}:${t}:${qn++}`;
      return (
        performance.mark(n),
        () => performance.measure(`[Stencil] ${e}() <${t}>`, n)
      );
    } else return () => {};
  },
  Bt = (e, t) =>
    r.profile && performance.mark
      ? (performance.getEntriesByName(e, "mark").length === 0 &&
          performance.mark(e),
        () => {
          performance.getEntriesByName(t, "measure").length === 0 &&
            performance.measure(t, e);
        })
      : () => {},
  Xn = (e) => {
    let t = $(e);
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
  jt = () => {
    if (r.devTools) {
      let e = (E.stencil = E.stencil || {}),
        t = e.inspect;
      e.inspect = (n) => {
        let o = Xn(n);
        return !o && typeof t == "function" && (o = t(n)), o;
      };
    }
  };
var Oe = "r",
  Ie = "o",
  ke = "s",
  fe = "t",
  Y = "s-id",
  Q = "sty-id",
  B = "c-id",
  zt = "{visibility:hidden}.hydrated{visibility:inherit}",
  we = "slot-fb{display:contents}slot-fb[hidden]{display:none}",
  it = "http://www.w3.org/1999/xlink",
  Wt = [
    "formAssociatedCallback",
    "formResetCallback",
    "formDisabledCallback",
    "formStateRestoreCallback",
  ];
var A = (e, t, ...n) => {
    let o = null,
      s = null,
      i = null,
      a = !1,
      c = !1,
      l = [],
      d = (f) => {
        for (let u = 0; u < f.length; u++)
          (o = f[u]),
            Array.isArray(o)
              ? d(o)
              : o != null &&
                typeof o != "boolean" &&
                ((a = typeof e != "function" && !V(o))
                  ? (o = String(o))
                  : r.isDev &&
                    typeof e != "function" &&
                    o.$flags$ === void 0 &&
                    q(`vNode passed as children has unexpected type.
Make sure it's using the correct h() function.
Empty objects can also be the cause, look for JSX comments that became objects.`),
                a && c
                  ? (l[l.length - 1].$text$ += o)
                  : l.push(a ? j(null, o) : o),
                (c = a));
      };
    if (
      (d(n),
      t &&
        (r.isDev && e === "input" && Qn(t),
        r.vdomKey && t.key && (s = t.key),
        r.slotRelocation && t.name && (i = t.name),
        r.vdomClass))
    ) {
      let f = t.className || t.class;
      f &&
        (t.class =
          typeof f != "object"
            ? f
            : Object.keys(f)
                .filter((u) => f[u])
                .join(" "));
    }
    if (
      (r.isDev &&
        l.some(Pe) &&
        q(`The <Host> must be the single root component. Make sure:
- You are NOT using hostData() and <Host> in the same component.
- <Host> is used once, and it's the single root component of the render() function.`),
      r.vdomFunctional && typeof e == "function")
    )
      return e(t === null ? {} : t, l, Kn);
    let p = j(e, null);
    return (
      (p.$attrs$ = t),
      l.length > 0 && (p.$children$ = l),
      r.vdomKey && (p.$key$ = s),
      r.slotRelocation && (p.$name$ = i),
      p
    );
  },
  j = (e, t) => {
    let n = { $flags$: 0, $tag$: e, $text$: t, $elm$: null, $children$: null };
    return (
      r.vdomAttribute && (n.$attrs$ = null),
      r.vdomKey && (n.$key$ = null),
      r.slotRelocation && (n.$name$ = null),
      n
    );
  },
  at = {},
  Pe = (e) => e && e.$tag$ === at,
  Kn = {
    forEach: (e, t) => e.map(Ft).forEach(t),
    map: (e, t) => e.map(Ft).map(t).map(Vn),
  },
  Ft = (e) => ({
    vattrs: e.$attrs$,
    vchildren: e.$children$,
    vkey: e.$key$,
    vname: e.$name$,
    vtag: e.$tag$,
    vtext: e.$text$,
  }),
  Vn = (e) => {
    if (typeof e.vtag == "function") {
      let n = { ...e.vattrs };
      return (
        e.vkey && (n.key = e.vkey),
        e.vname && (n.name = e.vname),
        A(e.vtag, n, ...(e.vchildren || []))
      );
    }
    let t = j(e.vtag, e.vtext);
    return (
      (t.$attrs$ = e.vattrs),
      (t.$children$ = e.vchildren),
      (t.$key$ = e.vkey),
      (t.$name$ = e.vname),
      t
    );
  },
  Qn = (e) => {
    let t = Object.keys(e),
      n = t.indexOf("value");
    if (n === -1) return;
    let o = t.indexOf("type"),
      s = t.indexOf("min"),
      i = t.indexOf("max"),
      a = t.indexOf("step");
    (n < o || n < s || n < i || n < a) &&
      _(
        'The "value" prop of <input> should be set after "min", "max", "type" and "step"',
      );
  };
var Jt = (e, t, n, o) => {
    let s = R("hydrateClient", t),
      i = e.shadowRoot,
      a = [],
      c = [],
      l = r.shadowDom && i ? [] : null,
      d = (o.$vnode$ = j(t, null));
    g.$orgLocNodes$ || ct(T.body, (g.$orgLocNodes$ = new Map())),
      (e[Y] = n),
      e.removeAttribute(Y),
      lt(d, a, c, l, e, e, n),
      a.map((p) => {
        let f = p.$hostId$ + "." + p.$nodeId$,
          u = g.$orgLocNodes$.get(f),
          m = p.$elm$;
        u &&
          D &&
          u["s-en"] === "" &&
          u.parentNode.insertBefore(m, u.nextSibling),
          i ||
            ((m["s-hn"] = t), u && ((m["s-ol"] = u), (m["s-ol"]["s-nr"] = m))),
          g.$orgLocNodes$.delete(f);
      }),
      r.shadowDom &&
        i &&
        l.map((p) => {
          p && i.appendChild(p);
        }),
      s();
  },
  lt = (e, t, n, o, s, i, a) => {
    let c, l, d, p;
    if (i.nodeType === 1) {
      for (
        c = i.getAttribute(B),
          c &&
            ((l = c.split(".")),
            (l[0] === a || l[0] === "0") &&
              ((d = {
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
              t.push(d),
              i.removeAttribute(B),
              e.$children$ || (e.$children$ = []),
              (e.$children$[d.$index$] = d),
              (e = d),
              o && d.$depth$ === "0" && (o[d.$index$] = d.$elm$))),
          p = i.childNodes.length - 1;
        p >= 0;
        p--
      )
        lt(e, t, n, o, s, i.childNodes[p], a);
      if (i.shadowRoot)
        for (p = i.shadowRoot.childNodes.length - 1; p >= 0; p--)
          lt(e, t, n, o, s, i.shadowRoot.childNodes[p], a);
    } else if (i.nodeType === 8)
      (l = i.nodeValue.split(".")),
        (l[1] === a || l[1] === "0") &&
          ((c = l[0]),
          (d = {
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
          c === fe
            ? ((d.$elm$ = i.nextSibling),
              d.$elm$ &&
                d.$elm$.nodeType === 3 &&
                ((d.$text$ = d.$elm$.textContent),
                t.push(d),
                i.remove(),
                e.$children$ || (e.$children$ = []),
                (e.$children$[d.$index$] = d),
                o && d.$depth$ === "0" && (o[d.$index$] = d.$elm$)))
            : d.$hostId$ === a &&
              (c === ke
                ? ((d.$tag$ = "slot"),
                  l[5] ? (i["s-sn"] = d.$name$ = l[5]) : (i["s-sn"] = ""),
                  (i["s-sr"] = !0),
                  r.shadowDom &&
                    o &&
                    ((d.$elm$ = T.createElement(d.$tag$)),
                    d.$name$ && d.$elm$.setAttribute("name", d.$name$),
                    i.parentNode.insertBefore(d.$elm$, i),
                    i.remove(),
                    d.$depth$ === "0" && (o[d.$index$] = d.$elm$)),
                  n.push(d),
                  e.$children$ || (e.$children$ = []),
                  (e.$children$[d.$index$] = d))
                : c === Oe &&
                  (r.shadowDom && o
                    ? i.remove()
                    : r.slotRelocation &&
                      ((s["s-cr"] = i), (i["s-cn"] = !0)))));
    else if (e && e.$tag$ === "style") {
      let f = j(null, i.textContent);
      (f.$elm$ = i), (f.$index$ = "0"), (e.$children$ = [f]);
    }
  },
  ct = (e, t) => {
    if (e.nodeType === 1) {
      let n = 0;
      for (; n < e.childNodes.length; n++) ct(e.childNodes[n], t);
      if (e.shadowRoot)
        for (n = 0; n < e.shadowRoot.childNodes.length; n++)
          ct(e.shadowRoot.childNodes[n], t);
    } else if (e.nodeType === 8) {
      let n = e.nodeValue.split(".");
      n[0] === Ie &&
        (t.set(n[1] + "." + n[2], e), (e.nodeValue = ""), (e["s-en"] = n[3]));
    }
  };
var He = (e) => dt.map((t) => t(e)).find((t) => !!t),
  Yt = (e) => dt.push(e),
  qt = (e) => $(e).$modeName$;
var Z = (e, t) =>
  e != null && !V(e)
    ? r.propBoolean && t & 4
      ? e === "false"
        ? !1
        : e === "" || !!e
      : r.propNumber && t & 2
        ? parseFloat(e)
        : r.propString && t & 1
          ? String(e)
          : e
    : e;
var Ae = (e) => (r.lazyLoad ? $(e).$hostElement$ : e);
var Xt = (e, t, n) => {
    let o = Ae(e);
    return {
      emit: (s) => (
        r.isDev &&
          !o.isConnected &&
          _(
            `The "${t}" event was emitted, but the dispatcher node is no longer connected to the dom.`,
          ),
        _e(o, t, {
          bubbles: !!(n & 4),
          composed: !!(n & 2),
          cancelable: !!(n & 1),
          detail: s,
        })
      ),
    };
  },
  _e = (e, t, n) => {
    let o = g.ce(t, n);
    return e.dispatchEvent(o), o;
  };
var Kt = new WeakMap(),
  G = (e, t, n) => {
    let o = z.get(e);
    Qt && n
      ? ((o = o || new CSSStyleSheet()),
        typeof o == "string" ? (o = t) : o.replaceSync(t))
      : (o = t),
      z.set(e, o);
  },
  Ue = (e, t, n) => {
    var i;
    let o = me(t, n),
      s = z.get(o);
    if (!r.attachStyles) return o;
    if (((e = e.nodeType === 11 ? e : T), s))
      if (typeof s == "string") {
        e = e.head || e;
        let a = Kt.get(e),
          c;
        if ((a || Kt.set(e, (a = new Set())), !a.has(o))) {
          if (
            r.hydrateClientSide &&
            e.host &&
            (c = e.querySelector(`[${Q}="${o}"]`))
          )
            c.innerHTML = s;
          else {
            (c = T.createElement("style")), (c.innerHTML = s);
            let l = (i = g.$nonce$) != null ? i : Le(T);
            l != null && c.setAttribute("nonce", l),
              (r.hydrateServerSide || r.hotModuleReplacement) &&
                c.setAttribute(Q, o),
              e.insertBefore(c, e.querySelector("link"));
          }
          t.$flags$ & 4 && (c.innerHTML += we), a && a.add(o);
        }
      } else
        r.constructableCSS &&
          !e.adoptedStyleSheets.includes(s) &&
          (e.adoptedStyleSheets = [...e.adoptedStyleSheets, s]);
    return o;
  },
  Me = (e) => {
    let t = e.$cmpMeta$,
      n = e.$hostElement$,
      o = t.$flags$,
      s = R("attachStyles", t.$tagName$),
      i = Ue(
        r.shadowDom && D && n.shadowRoot ? n.shadowRoot : n.getRootNode(),
        t,
        e.$modeName$,
      );
    (r.shadowDom || r.scoped) &&
      r.cssAnnotations &&
      o & 10 &&
      ((n["s-sc"] = i),
      n.classList.add(i + "-h"),
      r.scoped && o & 2 && n.classList.add(i + "-s")),
      s();
  },
  me = (e, t) =>
    "sc-" +
    (r.mode && t && e.$flags$ & 32 ? e.$tagName$ + "-" + t : e.$tagName$),
  Vt = (e) => e.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g, "$1{");
var ft = (e, t, n, o, s, i) => {
    if (n !== o) {
      let a = pt(e, t),
        c = t.toLowerCase();
      if (r.vdomClass && t === "class") {
        let l = e.classList,
          d = Zt(n),
          p = Zt(o);
        l.remove(...d.filter((f) => f && !p.includes(f))),
          l.add(...p.filter((f) => f && !d.includes(f)));
      } else if (r.vdomStyle && t === "style") {
        if (r.updatable)
          for (let l in n)
            (!o || o[l] == null) &&
              (!r.hydrateServerSide && l.includes("-")
                ? e.style.removeProperty(l)
                : (e.style[l] = ""));
        for (let l in o)
          (!n || o[l] !== n[l]) &&
            (!r.hydrateServerSide && l.includes("-")
              ? e.style.setProperty(l, o[l])
              : (e.style[l] = o[l]));
      } else if (!(r.vdomKey && t === "key")) {
        if (r.vdomRef && t === "ref") o && o(e);
        else if (
          r.vdomListener &&
          (r.lazyLoad ? !a : !e.__lookupSetter__(t)) &&
          t[0] === "o" &&
          t[1] === "n"
        ) {
          if (
            (t[2] === "-"
              ? (t = t.slice(3))
              : pt(E, c)
                ? (t = c.slice(2))
                : (t = c[2] + t.slice(3)),
            n || o)
          ) {
            let l = t.endsWith(Gt);
            (t = t.replace(eo, "")),
              n && g.rel(e, t, n, l),
              o && g.ael(e, t, o, l);
          }
        } else if (r.vdomPropOrAttr) {
          let l = V(o);
          if ((a || (l && o !== null)) && !s)
            try {
              if (e.tagName.includes("-")) e[t] = o;
              else {
                let p = o == null ? "" : o;
                t === "list"
                  ? (a = !1)
                  : (n == null || e[t] != p) && (e[t] = p);
              }
            } catch {}
          let d = !1;
          r.vdomXlink &&
            c !== (c = c.replace(/^xlink\:?/, "")) &&
            ((t = c), (d = !0)),
            o == null || o === !1
              ? (o !== !1 || e.getAttribute(t) === "") &&
                (r.vdomXlink && d
                  ? e.removeAttributeNS(it, t)
                  : e.removeAttribute(t))
              : (!a || i & 4 || s) &&
                !l &&
                ((o = o === !0 ? "" : o),
                r.vdomXlink && d
                  ? e.setAttributeNS(it, t, o)
                  : e.setAttribute(t, o));
        }
      }
    }
  },
  Gn = /\s/,
  Zt = (e) => (e ? e.split(Gn) : []),
  Gt = "Capture",
  eo = new RegExp(Gt + "$");
var ut = (e, t, n, o) => {
  let s = t.$elm$.nodeType === 11 && t.$elm$.host ? t.$elm$.host : t.$elm$,
    i = (e && e.$attrs$) || tt,
    a = t.$attrs$ || tt;
  if (r.updatable) for (o in i) o in a || ft(s, o, i[o], void 0, n, t.$flags$);
  for (o in a) ft(s, o, i[o], a[o], n, t.$flags$);
};
var ee,
  mt,
  W,
  tn = !1,
  je = !1,
  We = !1,
  O = !1,
  ze = (e, t, n, o) => {
    let s = t.$children$[n],
      i = 0,
      a,
      c,
      l;
    if (
      (r.slotRelocation &&
        !tn &&
        ((We = !0),
        s.$tag$ === "slot" &&
          (ee && o.classList.add(ee + "-s"),
          (s.$flags$ |= s.$children$ ? 2 : 1))),
      r.isDev &&
        s.$elm$ &&
        q(
          `The JSX ${s.$text$ !== null ? `"${s.$text$}" text` : `"${s.$tag$}" element`} node should not be shared within the same renderer. The renderer caches element lookups in order to improve performance. However, a side effect from this is that the exact same JSX node should not be reused. For more information please see https://stenciljs.com/docs/templating-jsx#avoid-shared-jsx-nodes`,
        ),
      r.vdomText && s.$text$ !== null)
    )
      a = s.$elm$ = T.createTextNode(s.$text$);
    else if (r.slotRelocation && s.$flags$ & 1)
      a = s.$elm$ =
        r.isDebug || r.hydrateServerSide ? oo(s) : T.createTextNode("");
    else {
      if (
        (r.svg && !O && (O = s.$tag$ === "svg"),
        (a = s.$elm$ =
          r.svg
            ? T.createElementNS(
                O ? Pt : Ht,
                r.slotRelocation && s.$flags$ & 2 ? "slot-fb" : s.$tag$,
              )
            : T.createElement(
                r.slotRelocation && s.$flags$ & 2 ? "slot-fb" : s.$tag$,
              )),
        r.svg && O && s.$tag$ === "foreignObject" && (O = !1),
        r.vdomAttribute && ut(null, s, O),
        (r.shadowDom || r.scoped) &&
          At(ee) &&
          a["s-si"] !== ee &&
          a.classList.add((a["s-si"] = ee)),
        s.$children$)
      )
        for (i = 0; i < s.$children$.length; ++i)
          (c = ze(e, s, i, a)), c && a.appendChild(c);
      r.svg &&
        (s.$tag$ === "svg"
          ? (O = !1)
          : a.tagName === "foreignObject" && (O = !0));
    }
    return (
      (a["s-hn"] = W),
      r.slotRelocation &&
        s.$flags$ & 3 &&
        ((a["s-sr"] = !0),
        (a["s-cr"] = mt),
        (a["s-sn"] = s.$name$ || ""),
        (l = e && e.$children$ && e.$children$[n]),
        l &&
          l.$tag$ === s.$tag$ &&
          e.$elm$ &&
          (r.experimentalSlotFixes ? to(e.$elm$) : ge(e.$elm$, !1))),
      a
    );
  },
  to = (e) => {
    g.$flags$ |= 1;
    let t = e.closest(W.toLowerCase());
    if (t != null)
      for (let n of Array.from(e.childNodes))
        n["s-sh"] != null &&
          (t.insertBefore(n, null), (n["s-sh"] = void 0), (We = !0));
    g.$flags$ &= -2;
  },
  ge = (e, t) => {
    g.$flags$ |= 1;
    let n = e.childNodes;
    for (let o = n.length - 1; o >= 0; o--) {
      let s = n[o];
      s["s-hn"] !== W &&
        s["s-ol"] &&
        (sn(s).insertBefore(s, gt(s)),
        s["s-ol"].remove(),
        (s["s-ol"] = void 0),
        (s["s-sh"] = void 0),
        (We = !0)),
        t && ge(s, t);
    }
    g.$flags$ &= -2;
  },
  nn = (e, t, n, o, s, i) => {
    let a = (r.slotRelocation && e["s-cr"] && e["s-cr"].parentNode) || e,
      c;
    for (
      r.shadowDom && a.shadowRoot && a.tagName === W && (a = a.shadowRoot);
      s <= i;
      ++s
    )
      o[s] &&
        ((c = ze(null, n, s, e)),
        c &&
          ((o[s].$elm$ = c), a.insertBefore(c, r.slotRelocation ? gt(t) : t)));
  },
  on = (e, t, n) => {
    for (let o = t; o <= n; ++o) {
      let s = e[o];
      if (s) {
        let i = s.$elm$;
        an(s),
          i &&
            (r.slotRelocation &&
              ((je = !0), i["s-ol"] ? i["s-ol"].remove() : ge(i, !0)),
            i.remove());
      }
    }
  },
  no = (e, t, n, o, s = !1) => {
    let i = 0,
      a = 0,
      c = 0,
      l = 0,
      d = t.length - 1,
      p = t[0],
      f = t[d],
      u = o.length - 1,
      m = o[0],
      h = o[u],
      y,
      x;
    for (; i <= d && a <= u; )
      if (p == null) p = t[++i];
      else if (f == null) f = t[--d];
      else if (m == null) m = o[++a];
      else if (h == null) h = o[--u];
      else if (Be(p, m, s)) te(p, m, s), (p = t[++i]), (m = o[++a]);
      else if (Be(f, h, s)) te(f, h, s), (f = t[--d]), (h = o[--u]);
      else if (Be(p, h, s))
        r.slotRelocation &&
          (p.$tag$ === "slot" || h.$tag$ === "slot") &&
          ge(p.$elm$.parentNode, !1),
          te(p, h, s),
          e.insertBefore(p.$elm$, f.$elm$.nextSibling),
          (p = t[++i]),
          (h = o[--u]);
      else if (Be(f, m, s))
        r.slotRelocation &&
          (p.$tag$ === "slot" || h.$tag$ === "slot") &&
          ge(f.$elm$.parentNode, !1),
          te(f, m, s),
          e.insertBefore(f.$elm$, p.$elm$),
          (f = t[--d]),
          (m = o[++a]);
      else {
        if (((c = -1), r.vdomKey)) {
          for (l = i; l <= d; ++l)
            if (t[l] && t[l].$key$ !== null && t[l].$key$ === m.$key$) {
              c = l;
              break;
            }
        }
        r.vdomKey && c >= 0
          ? ((x = t[c]),
            x.$tag$ !== m.$tag$
              ? (y = ze(t && t[a], n, c, e))
              : (te(x, m, s), (t[c] = void 0), (y = x.$elm$)),
            (m = o[++a]))
          : ((y = ze(t && t[a], n, a, e)), (m = o[++a])),
          y &&
            (r.slotRelocation
              ? sn(p.$elm$).insertBefore(y, gt(p.$elm$))
              : p.$elm$.parentNode.insertBefore(y, p.$elm$));
      }
    i > d
      ? nn(e, o[u + 1] == null ? null : o[u + 1].$elm$, n, o, a, u)
      : r.updatable && a > u && on(t, i, d);
  },
  Be = (e, t, n = !1) =>
    e.$tag$ === t.$tag$
      ? r.slotRelocation && e.$tag$ === "slot"
        ? e.$name$ === t.$name$
        : r.vdomKey && !n
          ? e.$key$ === t.$key$
          : !0
      : !1,
  gt = (e) => (e && e["s-ol"]) || e,
  sn = (e) => (e["s-ol"] ? e["s-ol"] : e).parentNode,
  te = (e, t, n = !1) => {
    let o = (t.$elm$ = e.$elm$),
      s = e.$children$,
      i = t.$children$,
      a = t.$tag$,
      c = t.$text$,
      l;
    !r.vdomText || c === null
      ? (r.svg && (O = a === "svg" ? !0 : a === "foreignObject" ? !1 : O),
        (r.vdomAttribute || r.reflect) &&
          ((r.slot && a === "slot") || ut(e, t, O)),
        r.updatable && s !== null && i !== null
          ? no(o, s, t, i, n)
          : i !== null
            ? (r.updatable &&
                r.vdomText &&
                e.$text$ !== null &&
                (o.textContent = ""),
              nn(o, null, t, i, 0, i.length - 1))
            : r.updatable && s !== null && on(s, 0, s.length - 1),
        r.svg && O && a === "svg" && (O = !1))
      : r.vdomText && r.slotRelocation && (l = o["s-cr"])
        ? (l.parentNode.textContent = c)
        : r.vdomText && e.$text$ !== c && (o.data = c);
  },
  he = (e) => {
    let t = e.childNodes;
    for (let n of t)
      if (n.nodeType === 1) {
        if (n["s-sr"]) {
          let o = n["s-sn"];
          n.hidden = !1;
          for (let s of t)
            if (s !== n) {
              if (s["s-hn"] !== n["s-hn"] || o !== "") {
                if (
                  s.nodeType === 1 &&
                  (o === s.getAttribute("slot") || o === s["s-sn"])
                ) {
                  n.hidden = !0;
                  break;
                }
              } else if (
                s.nodeType === 1 ||
                (s.nodeType === 3 && s.textContent.trim() !== "")
              ) {
                n.hidden = !0;
                break;
              }
            }
        }
        he(n);
      }
  },
  U = [],
  rn = (e) => {
    let t, n, o;
    for (let s of e.childNodes) {
      if (s["s-sr"] && (t = s["s-cr"]) && t.parentNode) {
        n = t.parentNode.childNodes;
        let i = s["s-sn"];
        for (o = n.length - 1; o >= 0; o--)
          if (
            ((t = n[o]),
            !t["s-cn"] &&
              !t["s-nr"] &&
              t["s-hn"] !== s["s-hn"] &&
              (!r.experimentalSlotFixes ||
                !t["s-sh"] ||
                t["s-sh"] !== s["s-hn"]))
          )
            if (en(t, i)) {
              let a = U.find((c) => c.$nodeToRelocate$ === t);
              (je = !0),
                (t["s-sn"] = t["s-sn"] || i),
                a
                  ? ((a.$nodeToRelocate$["s-sh"] = s["s-hn"]),
                    (a.$slotRefNode$ = s))
                  : ((t["s-sh"] = s["s-hn"]),
                    U.push({ $slotRefNode$: s, $nodeToRelocate$: t })),
                t["s-sr"] &&
                  U.map((c) => {
                    en(c.$nodeToRelocate$, t["s-sn"]) &&
                      ((a = U.find((l) => l.$nodeToRelocate$ === t)),
                      a &&
                        !c.$slotRefNode$ &&
                        (c.$slotRefNode$ = a.$slotRefNode$));
                  });
            } else
              U.some((a) => a.$nodeToRelocate$ === t) ||
                U.push({ $nodeToRelocate$: t });
      }
      s.nodeType === 1 && rn(s);
    }
  },
  en = (e, t) =>
    e.nodeType === 1
      ? (e.getAttribute("slot") === null && t === "") ||
        e.getAttribute("slot") === t
      : e["s-sn"] === t
        ? !0
        : t === "",
  an = (e) => {
    r.vdomRef &&
      (e.$attrs$ && e.$attrs$.ref && e.$attrs$.ref(null),
      e.$children$ && e.$children$.map(an));
  },
  ye = (e, t, n = !1) => {
    var c, l, d, p, f;
    let o = e.$hostElement$,
      s = e.$cmpMeta$,
      i = e.$vnode$ || j(null, null),
      a = Pe(t) ? t : A(null, null, t);
    if (((W = o.tagName), r.isDev && Array.isArray(t) && t.some(Pe)))
      throw new Error(`The <Host> must be the single root component.
Looks like the render() function of "${W.toLowerCase()}" is returning an array that contains the <Host>.

The render() function should look like this instead:

render() {
  // Do not return an array
  return (
    <Host>{content}</Host>
  );
}
  `);
    if (
      (r.reflect &&
        s.$attrsToReflect$ &&
        ((a.$attrs$ = a.$attrs$ || {}),
        s.$attrsToReflect$.map(([u, m]) => (a.$attrs$[m] = o[u]))),
      n && a.$attrs$)
    )
      for (let u of Object.keys(a.$attrs$))
        o.hasAttribute(u) &&
          !["key", "ref", "style", "class"].includes(u) &&
          (a.$attrs$[u] = o[u]);
    if (
      ((a.$tag$ = null),
      (a.$flags$ |= 4),
      (e.$vnode$ = a),
      (a.$elm$ = i.$elm$ = (r.shadowDom && o.shadowRoot) || o),
      (r.scoped || r.shadowDom) && (ee = o["s-sc"]),
      r.slotRelocation &&
        ((mt = o["s-cr"]), (tn = D && (s.$flags$ & 1) !== 0), (je = !1)),
      te(i, a, n),
      r.slotRelocation)
    ) {
      if (((g.$flags$ |= 1), We)) {
        rn(a.$elm$);
        for (let u of U) {
          let m = u.$nodeToRelocate$;
          if (!m["s-ol"]) {
            let h =
              r.isDebug || r.hydrateServerSide ? so(m) : T.createTextNode("");
            (h["s-nr"] = m), m.parentNode.insertBefore((m["s-ol"] = h), m);
          }
        }
        for (let u of U) {
          let m = u.$nodeToRelocate$,
            h = u.$slotRefNode$;
          if (h) {
            let y = h.parentNode,
              x = h.nextSibling;
            if (!r.experimentalSlotFixes || (x && x.nodeType === 1)) {
              let S = (c = m["s-ol"]) == null ? void 0 : c.previousSibling;
              for (; S; ) {
                let C = (l = S["s-nr"]) != null ? l : null;
                if (
                  C &&
                  C["s-sn"] === m["s-sn"] &&
                  y === C.parentNode &&
                  ((C = C.nextSibling), !C || !C["s-nr"])
                ) {
                  x = C;
                  break;
                }
                S = S.previousSibling;
              }
            }
            ((!x && y !== m.parentNode) || m.nextSibling !== x) &&
              m !== x &&
              (!r.experimentalSlotFixes &&
                !m["s-hn"] &&
                m["s-ol"] &&
                (m["s-hn"] = m["s-ol"].parentNode.nodeName),
              y.insertBefore(m, x),
              m.nodeType === 1 &&
                (m.hidden = (d = m["s-ih"]) != null ? d : !1));
          } else
            m.nodeType === 1 &&
              (n && (m["s-ih"] = (p = m.hidden) != null ? p : !1),
              (m.hidden = !0));
        }
      }
      je && he(a.$elm$), (g.$flags$ &= -2), (U.length = 0);
    }
    if (r.experimentalScopedSlotChanges && s.$flags$ & 2)
      for (let u of a.$elm$.childNodes)
        u["s-hn"] !== W &&
          !u["s-sh"] &&
          (n &&
            u["s-ih"] == null &&
            (u["s-ih"] = (f = u.hidden) != null ? f : !1),
          (u.hidden = !0));
    mt = void 0;
  },
  oo = (e) =>
    T.createComment(
      `<slot${e.$name$ ? ' name="' + e.$name$ + '"' : ""}> (host=${W.toLowerCase()})`,
    ),
  so = (e) =>
    T.createComment(
      "org-location for " +
        (e.localName
          ? `<${e.localName}> (host=${e["s-hn"]})`
          : `[${e.textContent}]`),
    );
var yt = (e, t) => {
    r.asyncLoading &&
      t &&
      !e.$onRenderResolve$ &&
      t["s-p"] &&
      t["s-p"].push(new Promise((n) => (e.$onRenderResolve$ = n)));
  },
  oe = (e, t) => {
    if (
      (r.taskQueue && r.updatable && (e.$flags$ |= 16),
      r.asyncLoading && e.$flags$ & 4)
    ) {
      e.$flags$ |= 512;
      return;
    }
    yt(e, e.$ancestorComponent$);
    let n = () => ro(e, t);
    return r.taskQueue ? un(n) : n();
  },
  ro = (e, t) => {
    let n = e.$hostElement$,
      o = R("scheduleUpdate", e.$cmpMeta$.$tagName$),
      s = r.lazyLoad ? e.$lazyInstance$ : n,
      i;
    return (
      t
        ? (r.lazyLoad &&
            r.hostListener &&
            ((e.$flags$ |= 256),
            e.$queuedListeners$ &&
              (e.$queuedListeners$.map(([a, c]) => I(s, a, c)),
              (e.$queuedListeners$ = void 0))),
          ne(n, "componentWillLoad"),
          r.cmpWillLoad && (i = I(s, "componentWillLoad")))
        : (ne(n, "componentWillUpdate"),
          r.cmpWillUpdate && (i = I(s, "componentWillUpdate"))),
      ne(n, "componentWillRender"),
      r.cmpWillRender && (i = ln(i, () => I(s, "componentWillRender"))),
      o(),
      ln(i, () => ao(e, s, t))
    );
  },
  ln = (e, t) => (io(e) ? e.then(t) : t()),
  io = (e) =>
    e instanceof Promise || (e && e.then && typeof e.then == "function"),
  ao = async (e, t, n) => {
    var c;
    let o = e.$hostElement$,
      s = R("update", e.$cmpMeta$.$tagName$),
      i = o["s-rc"];
    r.style && n && Me(e);
    let a = R("render", e.$cmpMeta$.$tagName$);
    if (
      (r.isDev && (e.$flags$ |= 1024),
      r.hydrateServerSide ? await cn(e, t, o, n) : cn(e, t, o, n),
      r.isDev &&
        ((e.$renderCount$ =
          e.$renderCount$ === void 0 ? 1 : e.$renderCount$ + 1),
        (e.$flags$ &= -1025)),
      r.hydrateServerSide)
    )
      try {
        fn(o),
          n &&
            (e.$cmpMeta$.$flags$ & 1
              ? (o["s-en"] = "")
              : e.$cmpMeta$.$flags$ & 2 && (o["s-en"] = "c"));
      } catch (l) {
        v(l, o);
      }
    if (
      (r.asyncLoading && i && (i.map((l) => l()), (o["s-rc"] = void 0)),
      a(),
      s(),
      r.asyncLoading)
    ) {
      let l = (c = o["s-p"]) != null ? c : [],
        d = () => Fe(e);
      l.length === 0
        ? d()
        : (Promise.all(l).then(d), (e.$flags$ |= 4), (l.length = 0));
    } else Fe(e);
  },
  $t = null,
  cn = (e, t, n, o) => {
    let s = !!r.allRenderFn,
      i = !!r.lazyLoad,
      a = !!r.taskQueue,
      c = !!r.updatable;
    try {
      if (
        (($t = t),
        (t = (s || t.render) && t.render()),
        c && a && (e.$flags$ &= -17),
        (c || i) && (e.$flags$ |= 2),
        r.hasRenderFn || r.reflect)
      )
        if (r.vdomRender || r.reflect) {
          if (r.hydrateServerSide)
            return Promise.resolve(t).then((l) => ye(e, l, o));
          ye(e, t, o);
        } else {
          let l = n.shadowRoot;
          e.$cmpMeta$.$flags$ & 1 ? (l.textContent = t) : (n.textContent = t);
        }
    } catch (l) {
      v(l, e.$hostElement$);
    }
    return ($t = null), null;
  },
  dn = () => $t,
  Fe = (e) => {
    let t = e.$cmpMeta$.$tagName$,
      n = e.$hostElement$,
      o = R("postUpdate", t),
      s = r.lazyLoad ? e.$lazyInstance$ : n,
      i = e.$ancestorComponent$;
    r.cmpDidRender &&
      (r.isDev && (e.$flags$ |= 1024),
      I(s, "componentDidRender"),
      r.isDev && (e.$flags$ &= -1025)),
      ne(n, "componentDidRender"),
      e.$flags$ & 64
        ? (r.cmpDidUpdate &&
            (r.isDev && (e.$flags$ |= 1024),
            I(s, "componentDidUpdate"),
            r.isDev && (e.$flags$ &= -1025)),
          ne(n, "componentDidUpdate"),
          o())
        : ((e.$flags$ |= 64),
          r.asyncLoading && r.cssAnnotations && pn(n),
          r.cmpDidLoad &&
            (r.isDev && (e.$flags$ |= 2048),
            I(s, "componentDidLoad"),
            r.isDev && (e.$flags$ &= -2049)),
          ne(n, "componentDidLoad"),
          o(),
          r.asyncLoading && (e.$onReadyResolve$(n), i || Je(t))),
      r.method && r.lazyLoad && e.$onInstanceResolve$(n),
      r.asyncLoading &&
        (e.$onRenderResolve$ &&
          (e.$onRenderResolve$(), (e.$onRenderResolve$ = void 0)),
        e.$flags$ & 512 && xe(() => oe(e, !1)),
        (e.$flags$ &= -517));
  },
  se = (e) => {
    if (r.updatable && (ht.isBrowser || ht.isTesting)) {
      let t = $(e),
        n = t.$hostElement$.isConnected;
      return n && (t.$flags$ & 18) === 2 && oe(t, !1), n;
    }
    return !1;
  },
  Je = (e) => {
    r.cssAnnotations && pn(T.documentElement),
      r.asyncQueue && (g.$flags$ |= 2),
      xe(() => _e(E, "appload", { detail: { namespace: pe } })),
      r.profile &&
        performance.measure &&
        performance.measure(
          `[Stencil] ${pe} initial load (by ${e})`,
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
  ne = (e, t) => {
    r.lifecycleDOMEvents &&
      _e(e, "stencil_" + t, {
        bubbles: !0,
        composed: !0,
        detail: { namespace: pe },
      });
  },
  pn = (e) =>
    r.hydratedClass
      ? e.classList.add("hydrated")
      : r.hydratedAttribute
        ? e.setAttribute("hydrated", "")
        : void 0,
  fn = (e) => {
    let t = e.children;
    if (t != null)
      for (let n = 0, o = t.length; n < o; n++) {
        let s = t[n];
        typeof s.connectedCallback == "function" && s.connectedCallback(),
          fn(s);
      }
  };
var re = (e, t) => $(e).$instanceValues$.get(t),
  ie = (e, t, n, o) => {
    let s = $(e),
      i = r.lazyLoad ? s.$hostElement$ : e,
      a = s.$instanceValues$.get(t),
      c = s.$flags$,
      l = r.lazyLoad ? s.$lazyInstance$ : i;
    n = Z(n, o.$members$[t][0]);
    let d = Number.isNaN(a) && Number.isNaN(n),
      p = n !== a && !d;
    if (
      (!r.lazyLoad || !(c & 8) || a === void 0) &&
      p &&
      (s.$instanceValues$.set(t, n),
      r.isDev &&
        (s.$flags$ & 1024
          ? _(
              `The state/prop "${t}" changed during rendering. This can potentially lead to infinite-loops and other bugs.`,
              `
Element`,
              i,
              `
New value`,
              n,
              `
Old value`,
              a,
            )
          : s.$flags$ & 2048 &&
            _(
              `The state/prop "${t}" changed during "componentDidLoad()", this triggers extra re-renders, try to setup on "componentWillLoad()"`,
              `
Element`,
              i,
              `
New value`,
              n,
              `
Old value`,
              a,
            )),
      !r.lazyLoad || l)
    ) {
      if (r.watchCallback && o.$watchers$ && c & 128) {
        let f = o.$watchers$[t];
        f &&
          f.map((u) => {
            try {
              l[u](n, a, t);
            } catch (m) {
              v(m, i);
            }
          });
      }
      if (r.updatable && (c & 18) === 2) {
        if (
          r.cmpShouldUpdate &&
          l.componentShouldUpdate &&
          l.componentShouldUpdate(n, a, t) === !1
        )
          return;
        oe(s, !1);
      }
    }
  };
var F = (e, t, n) => {
  var s;
  let o = e.prototype;
  if (
    (r.formAssociated &&
      t.$flags$ & 64 &&
      n & 1 &&
      Wt.forEach((i) =>
        Object.defineProperty(o, i, {
          value(...a) {
            let c = $(this),
              l = r.lazyLoad ? c.$hostElement$ : this,
              d = r.lazyLoad ? c.$lazyInstance$ : l;
            if (!d)
              c.$onReadyPromise$.then((p) => {
                let f = p[i];
                typeof f == "function" && f.call(p, ...a);
              });
            else {
              let p = d[i];
              typeof p == "function" && p.call(d, ...a);
            }
          },
        }),
      ),
    r.member && t.$members$)
  ) {
    r.watchCallback && e.watchers && (t.$watchers$ = e.watchers);
    let i = Object.entries(t.$members$);
    if (
      (i.map(([a, [c]]) => {
        (r.prop || r.state) && (c & 31 || ((!r.lazyLoad || n & 2) && c & 32))
          ? Object.defineProperty(o, a, {
              get() {
                return re(this, a);
              },
              set(l) {
                if (r.isDev) {
                  let d = $(this);
                  !(n & 1) &&
                    (d && d.$flags$ & 8) === 0 &&
                    c & 31 &&
                    !(c & 1024) &&
                    _(`@Prop() "${a}" on <${t.$tagName$}> is immutable but was modified from within the component.
More information: https://stenciljs.com/docs/properties#prop-mutability`);
                }
                ie(this, a, l, t);
              },
              configurable: !0,
              enumerable: !0,
            })
          : r.lazyLoad &&
            r.method &&
            n & 1 &&
            c & 64 &&
            Object.defineProperty(o, a, {
              value(...l) {
                var p;
                let d = $(this);
                return (p = d == null ? void 0 : d.$onInstancePromise$) == null
                  ? void 0
                  : p.then(() => {
                      var f;
                      return (f = d.$lazyInstance$) == null
                        ? void 0
                        : f[a](...l);
                    });
              },
            });
      }),
      r.observeAttribute && (!r.lazyLoad || n & 1))
    ) {
      let a = new Map();
      (o.attributeChangedCallback = function (c, l, d) {
        g.jmp(() => {
          var f;
          let p = a.get(c);
          if (this.hasOwnProperty(p)) (d = this[p]), delete this[p];
          else {
            if (
              o.hasOwnProperty(p) &&
              typeof this[p] == "number" &&
              this[p] == d
            )
              return;
            if (p == null) {
              let u = $(this),
                m = u == null ? void 0 : u.$flags$;
              if (m && !(m & 8) && m & 128 && d !== l) {
                let h = r.lazyLoad ? u.$hostElement$ : this,
                  y = r.lazyLoad ? u.$lazyInstance$ : h,
                  x = (f = t.$watchers$) == null ? void 0 : f[c];
                x == null ||
                  x.forEach((S) => {
                    y[S] != null && y[S].call(y, d, l, c);
                  });
              }
              return;
            }
          }
          this[p] = d === null && typeof this[p] == "boolean" ? !1 : d;
        });
      }),
        (e.observedAttributes = Array.from(
          new Set([
            ...Object.keys((s = t.$watchers$) != null ? s : {}),
            ...i
              .filter(([c, l]) => l[0] & 15)
              .map(([c, l]) => {
                var p;
                let d = l[1] || c;
                return (
                  a.set(d, c),
                  r.reflect &&
                    l[0] & 512 &&
                    ((p = t.$attrsToReflect$) == null || p.push([c, d])),
                  d
                );
              }),
          ]),
        ));
    }
  }
  return e;
};
var Te = async (e, t, n, o) => {
    let s;
    if (!(t.$flags$ & 32)) {
      if (((t.$flags$ |= 32), r.lazyLoad || r.hydrateClientSide)) {
        if (((s = be(n, t, o)), s.then)) {
          let l = Bt(
            `st:load:${n.$tagName$}:${t.$modeName$}`,
            `[Stencil] Load module for <${n.$tagName$}>`,
          );
          (s = await s), l();
        }
        if ((r.isDev || r.isDebug) && !s)
          throw new Error(
            `Constructor for "${n.$tagName$}#${t.$modeName$}" was not found`,
          );
        r.member &&
          !s.isProxied &&
          (r.watchCallback && (n.$watchers$ = s.watchers),
          F(s, n, 2),
          (s.isProxied = !0));
        let c = R("createInstance", n.$tagName$);
        r.member && (t.$flags$ |= 8);
        try {
          new s(t);
        } catch (l) {
          v(l);
        }
        r.member && (t.$flags$ &= -9),
          r.watchCallback && (t.$flags$ |= 128),
          c(),
          Xe(t.$lazyInstance$);
      } else
        (s = e.constructor),
          customElements
            .whenDefined(n.$tagName$)
            .then(() => (t.$flags$ |= 128));
      if (r.style && s.style) {
        let c = s.style;
        r.mode &&
          typeof c != "string" &&
          ((c = c[(t.$modeName$ = He(e))]),
          r.hydrateServerSide &&
            t.$modeName$ &&
            e.setAttribute("s-mode", t.$modeName$));
        let l = me(n, t.$modeName$);
        if (!z.has(l)) {
          let d = R("registerStyles", n.$tagName$);
          !r.hydrateServerSide &&
            r.shadowDom &&
            r.shadowDomShim &&
            n.$flags$ & 8 &&
            (c = await Promise.resolve()
              .then(() => (Tn(), Cn))
              .then((p) => p.scopeCss(c, l, !1))),
            G(l, c, !!(n.$flags$ & 1)),
            d();
        }
      }
    }
    let i = t.$ancestorComponent$,
      a = () => oe(t, !0);
    r.asyncLoading && i && i["s-rc"] ? i["s-rc"].push(a) : a();
  },
  Xe = (e) => {
    r.lazyLoad && r.connectedCallback && I(e, "connectedCallback");
  };
var J = (e) => {
    if (!(g.$flags$ & 1)) {
      let t = $(e),
        n = t.$cmpMeta$,
        o = R("connectedCallback", n.$tagName$);
      if (
        (r.hostListenerTargetParent && K(e, t, n.$listeners$, !0),
        t.$flags$ & 1)
      )
        K(e, t, n.$listeners$, !1),
          t != null && t.$lazyInstance$
            ? Xe(t.$lazyInstance$)
            : t != null &&
              t.$onReadyPromise$ &&
              t.$onReadyPromise$.then(() => Xe(t.$lazyInstance$));
      else {
        t.$flags$ |= 1;
        let s;
        if (r.hydrateClientSide && ((s = e.getAttribute(Y)), s)) {
          if (r.shadowDom && D && n.$flags$ & 1) {
            let i = r.mode
              ? Ue(e.shadowRoot, n, e.getAttribute("s-mode"))
              : Ue(e.shadowRoot, n);
            e.classList.remove(i + "-h", i + "-s");
          }
          Jt(e, n.$tagName$, s, t);
        }
        if (
          (r.slotRelocation &&
            !s &&
            (r.hydrateServerSide ||
              ((r.slot || r.shadowDom) && n.$flags$ & 12)) &&
            Wo(e),
          r.asyncLoading)
        ) {
          let i = e;
          for (; (i = i.parentNode || i.host); )
            if (
              (r.hydrateClientSide &&
                i.nodeType === 1 &&
                i.hasAttribute("s-id") &&
                i["s-p"]) ||
              i["s-p"]
            ) {
              yt(t, (t.$ancestorComponent$ = i));
              break;
            }
        }
        r.prop &&
          !r.hydrateServerSide &&
          n.$members$ &&
          Object.entries(n.$members$).map(([i, [a]]) => {
            if (a & 31 && e.hasOwnProperty(i)) {
              let c = e[i];
              delete e[i], (e[i] = c);
            }
          }),
          r.initializeNextTick ? xe(() => Te(e, t, n)) : Te(e, t, n);
      }
      o();
    }
  },
  Wo = (e) => {
    let t = (e["s-cr"] = T.createComment(
      r.isDebug ? `content-ref (host=${e.localName})` : "",
    ));
    (t["s-cn"] = !0), e.insertBefore(t, e.firstChild);
  };
var Rt = (e) => {
    r.lazyLoad && r.disconnectedCallback && I(e, "disconnectedCallback"),
      r.cmpDidUnload && I(e, "componentDidUnload");
  },
  ae = async (e) => {
    if (!(g.$flags$ & 1)) {
      let t = $(e);
      r.hostListener &&
        t.$rmListeners$ &&
        (t.$rmListeners$.map((n) => n()), (t.$rmListeners$ = void 0)),
        r.lazyLoad
          ? t != null && t.$lazyInstance$
            ? Rt(t.$lazyInstance$)
            : t != null &&
              t.$onReadyPromise$ &&
              t.$onReadyPromise$.then(() => Rt(t.$lazyInstance$))
          : Rt(e);
    }
  };
import { NODE_TYPES as Ke } from "../../mock-doc/index.js";
var Ve = (e, t) => {
    Se(e), Re(e), Yo(e), Jo(e), Ko(e), qo(e), Xo(e), De(e), Ne(e, t), Fo(e);
  },
  Se = (e) => {
    let t = e.cloneNode;
    e.cloneNode = function (n) {
      let o = this,
        s = r.shadowDom ? o.shadowRoot && D : !1,
        i = t.call(o, s ? n : !1);
      if (r.slot && !s && n) {
        let a = 0,
          c,
          l,
          d = [
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
          (c = o.childNodes[a]["s-nr"]),
            (l = d.every((p) => !o.childNodes[a][p])),
            c &&
              (r.appendChildSlotFix && i.__appendChild
                ? i.__appendChild(c.cloneNode(!0))
                : i.appendChild(c.cloneNode(!0))),
            l && i.appendChild(o.childNodes[a].cloneNode(!0));
      }
      return i;
    };
  },
  Re = (e) => {
    (e.__appendChild = e.appendChild),
      (e.appendChild = function (t) {
        let n = (t["s-sn"] = bn(t)),
          o = le(this.childNodes, n);
        if (o) {
          let s = Nt(o, n),
            i = s[s.length - 1],
            a = i.parentNode.insertBefore(t, i.nextSibling);
          return he(this), se(this), a;
        }
        return this.__appendChild(t);
      });
  },
  Fo = (e) => {
    (e.__removeChild = e.removeChild),
      (e.removeChild = function (t) {
        if (t && typeof t["s-sn"] < "u") {
          let n = le(this.childNodes, t["s-sn"]);
          if (n) {
            let s = Nt(n, t["s-sn"]).find((i) => i === t);
            if (s) {
              s.remove(), he(this);
              return;
            }
          }
        }
        return this.__removeChild(t);
      });
  },
  Jo = (e) => {
    let t = e.prepend;
    e.prepend = function (...n) {
      n.forEach((o) => {
        typeof o == "string" && (o = this.ownerDocument.createTextNode(o));
        let s = (o["s-sn"] = bn(o)),
          i = le(this.childNodes, s);
        if (i) {
          let a = document.createTextNode("");
          (a["s-nr"] = o),
            i["s-cr"].parentNode.__appendChild(a),
            (o["s-ol"] = a);
          let l = Nt(i, s)[0];
          return l.parentNode.insertBefore(o, l.nextSibling);
        }
        return (
          o.nodeType === 1 && o.getAttribute("slot") && (o.hidden = !0),
          t.call(this, o)
        );
      });
    };
  },
  Yo = (e) => {
    e.append = function (...t) {
      t.forEach((n) => {
        typeof n == "string" && (n = this.ownerDocument.createTextNode(n)),
          this.appendChild(n);
      });
    };
  },
  qo = (e) => {
    let t = e.insertAdjacentHTML;
    e.insertAdjacentHTML = function (n, o) {
      if (n !== "afterbegin" && n !== "beforeend") return t.call(this, n, o);
      let s = this.ownerDocument.createElement("_"),
        i;
      if (((s.innerHTML = o), n === "afterbegin"))
        for (; (i = s.firstChild); ) this.prepend(i);
      else if (n === "beforeend") for (; (i = s.firstChild); ) this.append(i);
    };
  },
  Xo = (e) => {
    e.insertAdjacentText = function (t, n) {
      this.insertAdjacentHTML(t, n);
    };
  },
  Ko = (e) => {
    let t = e.insertAdjacentElement;
    e.insertAdjacentElement = function (n, o) {
      return n !== "afterbegin" && n !== "beforeend"
        ? t.call(this, n, o)
        : n === "afterbegin"
          ? (this.prepend(o), o)
          : (n === "beforeend" && this.append(o), o);
    };
  },
  De = (e) => {
    let t = Object.getOwnPropertyDescriptor(Node.prototype, "textContent");
    Object.defineProperty(e, "__textContent", t),
      r.experimentalScopedSlotChanges
        ? Object.defineProperty(e, "textContent", {
            get() {
              return (
                " " +
                Dt(this.childNodes)
                  .map((s) => {
                    var c, l;
                    let i = [],
                      a = s.nextSibling;
                    for (; a && a["s-sn"] === s["s-sn"]; )
                      (a.nodeType === Ke.TEXT_NODE ||
                        a.nodeType === Ke.ELEMENT_NODE) &&
                        i.push(
                          (l =
                            (c = a.textContent) == null ? void 0 : c.trim()) !=
                            null
                            ? l
                            : "",
                        ),
                        (a = a.nextSibling);
                    return i.filter((d) => d !== "").join(" ");
                  })
                  .filter((s) => s !== "")
                  .join(" ") +
                " "
              );
            },
            set(n) {
              Dt(this.childNodes).forEach((s) => {
                let i = s.nextSibling;
                for (; i && i["s-sn"] === s["s-sn"]; ) {
                  let a = i;
                  (i = i.nextSibling), a.remove();
                }
                if (s["s-sn"] === "") {
                  let a = this.ownerDocument.createTextNode(n);
                  (a["s-sn"] = ""),
                    s.parentElement.insertBefore(a, s.nextSibling);
                } else s.remove();
              });
            },
          })
        : Object.defineProperty(e, "textContent", {
            get() {
              var o;
              let n = le(this.childNodes, "");
              return ((o = n == null ? void 0 : n.nextSibling) == null
                ? void 0
                : o.nodeType) === Ke.TEXT_NODE
                ? n.nextSibling.textContent
                : n
                  ? n.textContent
                  : this.__textContent;
            },
            set(n) {
              var s;
              let o = le(this.childNodes, "");
              if (
                ((s = o == null ? void 0 : o.nextSibling) == null
                  ? void 0
                  : s.nodeType) === Ke.TEXT_NODE
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
  Ne = (e, t) => {
    class n extends Array {
      item(s) {
        return this[s];
      }
    }
    if (t.$flags$ & 8) {
      let o = e.__lookupGetter__("childNodes");
      Object.defineProperty(e, "children", {
        get() {
          return this.childNodes.map((s) => s.nodeType === 1);
        },
      }),
        Object.defineProperty(e, "childElementCount", {
          get() {
            return e.children.length;
          },
        }),
        Object.defineProperty(e, "childNodes", {
          get() {
            let s = o.call(this);
            if (!(g.$flags$ & 1) && $(this).$flags$ & 2) {
              let i = new n();
              for (let a = 0; a < s.length; a++) {
                let c = s[a]["s-nr"];
                c && i.push(c);
              }
              return i;
            }
            return n.from(s);
          },
        });
    }
  },
  Dt = (e) => {
    let t = [];
    for (let n of Array.from(e))
      n["s-sr"] && t.push(n), t.push(...Dt(n.childNodes));
    return t;
  },
  bn = (e) => e["s-sn"] || (e.nodeType === 1 && e.getAttribute("slot")) || "",
  le = (e, t) => {
    let n = 0,
      o;
    for (; n < e.length; n++)
      if (
        ((o = e[n]),
        (o["s-sr"] && o["s-sn"] === t) || ((o = le(o.childNodes, t)), o))
      )
        return o;
    return null;
  },
  Nt = (e, t) => {
    let n = [e];
    for (; (e = e.nextSibling) && e["s-sn"] === t; ) n.push(e);
    return n;
  };
var Sn = (e, t) => {
    customElements.define(t[1], Et(e, t));
  },
  Et = (e, t) => {
    let n = { $flags$: t[0], $tagName$: t[1] };
    r.member && (n.$members$ = t[2]),
      r.hostListener && (n.$listeners$ = t[3]),
      r.watchCallback && (n.$watchers$ = e.$watchers$),
      r.reflect && (n.$attrsToReflect$ = []),
      r.shadowDom && !D && n.$flags$ & 1 && (n.$flags$ |= 8),
      r.experimentalSlotFixes
        ? r.scoped && n.$flags$ & 2 && Ve(e.prototype, n)
        : (r.slotChildNodesFix && Ne(e.prototype, n),
          r.cloneNodeFix && Se(e.prototype),
          r.appendChildSlotFix && Re(e.prototype),
          r.scopedSlotTextContentFix && n.$flags$ & 2 && De(e.prototype));
    let o = e.prototype.connectedCallback,
      s = e.prototype.disconnectedCallback;
    return (
      Object.assign(e.prototype, {
        __registerHost() {
          ce(this, n);
        },
        connectedCallback() {
          J(this), r.connectedCallback && o && o.call(this);
        },
        disconnectedCallback() {
          ae(this), r.disconnectedCallback && s && s.call(this);
        },
        __attachShadow() {
          D
            ? r.shadowDelegatesFocus
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
  Rn = (e) => {
    if (r.style && r.mode && !r.lazyLoad) {
      let t = He(e),
        n = $(e);
      if (n.$modeName$ !== t) {
        let o = n.$cmpMeta$,
          s = e["s-sc"],
          i = me(o, t),
          a = e.constructor.style[t],
          c = o.$flags$;
        a &&
          (z.has(i) || G(i, a, !!(c & 1)),
          (n.$modeName$ = t),
          e.classList.remove(s + "-h", s + "-s"),
          Me(n),
          se(e));
      }
    }
  };
var Dn = (e, t, n) => {
  let o = $(e);
  (o.$flags$ = 1), Te(e, o, t, n);
};
var Nn = (e, t = {}) => {
  var y;
  r.profile && performance.mark && performance.mark("st:app:start"), jt();
  let n = R("bootstrapLazy"),
    o = [],
    s = t.exclude || [],
    i = E.customElements,
    a = T.head,
    c = a.querySelector("meta[charset]"),
    l = T.createElement("style"),
    d = [],
    p = T.querySelectorAll(`[${Q}]`),
    f,
    u = !0,
    m = 0;
  if (
    (Object.assign(g, t),
    (g.$resourcesUrl$ = new URL(t.resourcesUrl || "./", T.baseURI).href),
    r.asyncQueue && t.syncQueue && (g.$flags$ |= 4),
    r.hydrateClientSide && (g.$flags$ |= 2),
    r.hydrateClientSide && r.shadowDom)
  )
    for (; m < p.length; m++) G(p[m].getAttribute(Q), Vt(p[m].innerHTML), !0);
  let h = !1;
  if (
    (e.map((x) => {
      x[1].map((S) => {
        var k;
        let C = {
          $flags$: S[0],
          $tagName$: S[1],
          $members$: S[2],
          $listeners$: S[3],
        };
        C.$flags$ & 4 && (h = !0),
          r.member && (C.$members$ = S[2]),
          r.hostListener && (C.$listeners$ = S[3]),
          r.reflect && (C.$attrsToReflect$ = []),
          r.watchCallback && (C.$watchers$ = (k = S[4]) != null ? k : {}),
          r.shadowDom && !D && C.$flags$ & 1 && (C.$flags$ |= 8);
        let de =
            r.transformTagName && t.transformTagName
              ? t.transformTagName(C.$tagName$)
              : C.$tagName$,
          P = class extends HTMLElement {
            constructor(N) {
              super(N),
                (N = this),
                ce(N, C),
                r.shadowDom &&
                  C.$flags$ & 1 &&
                  (D
                    ? r.shadowDelegatesFocus
                      ? N.attachShadow({
                          mode: "open",
                          delegatesFocus: !!(C.$flags$ & 16),
                        })
                      : N.attachShadow({ mode: "open" })
                    : !r.hydrateServerSide &&
                      !("shadowRoot" in N) &&
                      (N.shadowRoot = N));
            }
            connectedCallback() {
              f && (clearTimeout(f), (f = null)),
                u ? d.push(this) : g.jmp(() => J(this));
            }
            disconnectedCallback() {
              g.jmp(() => ae(this));
            }
            componentOnReady() {
              return $(this).$onReadyPromise$;
            }
          };
        r.experimentalSlotFixes
          ? r.scoped && C.$flags$ & 2 && Ve(P.prototype, C)
          : (r.slotChildNodesFix && Ne(P.prototype, C),
            r.cloneNodeFix && Se(P.prototype),
            r.appendChildSlotFix && Re(P.prototype),
            r.scopedSlotTextContentFix && C.$flags$ & 2 && De(P.prototype)),
          r.formAssociated && C.$flags$ & 64 && (P.formAssociated = !0),
          r.hotModuleReplacement &&
            (P.prototype["s-hmr"] = function (N) {
              Dn(this, C, N);
            }),
          (C.$lazyBundleId$ = x[0]),
          !s.includes(de) &&
            !i.get(de) &&
            (o.push(de), i.define(de, F(P, C, 1)));
      });
    }),
    h && (l.innerHTML += we),
    r.invisiblePrehydration &&
      (r.hydratedClass || r.hydratedAttribute) &&
      (l.innerHTML += o + zt),
    l.innerHTML.length)
  ) {
    l.setAttribute("data-styles", "");
    let x = (y = g.$nonce$) != null ? y : Le(T);
    x != null && l.setAttribute("nonce", x),
      a.insertBefore(l, c ? c.nextSibling : a.firstChild);
  }
  (u = !1),
    d.length
      ? d.map((x) => x.connectedCallback())
      : r.profile
        ? g.jmp(() => (f = setTimeout(Je, 30, "timeout")))
        : g.jmp(() => (f = setTimeout(Je, 30))),
    n();
};
var En = (e, t) => t;
var K = (e, t, n, o) => {
    r.hostListener &&
      n &&
      (r.hostListenerTargetParent &&
        (o
          ? (n = n.filter(([s]) => s & 32))
          : (n = n.filter(([s]) => !(s & 32)))),
      n.map(([s, i, a]) => {
        let c = r.hostListenerTarget ? Qo(e, s) : e,
          l = Vo(t, a),
          d = Zo(s);
        g.ael(c, i, l, d),
          (t.$rmListeners$ = t.$rmListeners$ || []).push(() =>
            g.rel(c, i, l, d),
          );
      }));
  },
  Vo = (e, t) => (n) => {
    try {
      r.lazyLoad
        ? e.$flags$ & 256
          ? e.$lazyInstance$[t](n)
          : (e.$queuedListeners$ = e.$queuedListeners$ || []).push([t, n])
        : e.$hostElement$[t](n);
    } catch (o) {
      v(o);
    }
  },
  Qo = (e, t) =>
    r.hostListenerTargetDocument && t & 4
      ? T
      : r.hostListenerTargetWindow && t & 8
        ? E
        : r.hostListenerTargetBody && t & 16
          ? T.body
          : r.hostListenerTargetParent && t & 32
            ? e.parentElement
            : e,
  Zo = (e) =>
    vn ? { passive: (e & 1) !== 0, capture: (e & 2) !== 0 } : (e & 2) !== 0;
var vt = (e) => (g.$nonce$ = e);
var Qe = (e, t) => {
    if (e != null) {
      let n = { hostIds: 0, rootLevelIds: 0, staticComponents: new Set(t) },
        o = [];
      Ln(e, e.body, n, o),
        o.forEach((s) => {
          var i, a;
          if (s != null && s["s-nr"]) {
            let c = s["s-nr"],
              l = c["s-host-id"],
              d = c["s-node-id"],
              p = `${l}.${d}`;
            if (l == null) {
              if (
                ((l = 0),
                n.rootLevelIds++,
                (d = n.rootLevelIds),
                (p = `${l}.${d}`),
                c.nodeType === 1)
              )
                c.setAttribute(B, p);
              else if (c.nodeType === 3) {
                if (
                  l === 0 &&
                  ((i = c.nodeValue) == null ? void 0 : i.trim()) === ""
                ) {
                  s.remove();
                  return;
                }
                let m = e.createComment(p);
                (m.nodeValue = `${fe}.${p}`),
                  (a = c.parentNode) == null || a.insertBefore(m, c);
              }
            }
            let f = `${Ie}.${p}`,
              u = s.parentElement;
            u &&
              (u["s-en"] === ""
                ? (f += ".")
                : u["s-en"] === "c" && (f += ".c")),
              (s.nodeValue = f);
          }
        });
    }
  },
  Ln = (e, t, n, o) => {
    t != null &&
      (t["s-nr"] != null && o.push(t),
      t.nodeType === 1 &&
        t.childNodes.forEach((s) => {
          let i = $(s);
          if (i != null && !n.staticComponents.has(s.nodeName.toLowerCase())) {
            let a = { nodeIds: 0 };
            Go(e, s, i.$vnode$, n, a);
          }
          Ln(e, s, n, o);
        }));
  },
  Go = (e, t, n, o, s) => {
    if (n != null) {
      let i = ++o.hostIds;
      if (
        (t.setAttribute(Y, i),
        t["s-cr"] != null && (t["s-cr"].nodeValue = `${Oe}.${i}`),
        n.$children$ != null &&
          n.$children$.forEach((c, l) => {
            On(e, c, s, i, 0, l);
          }),
        t && n && n.$elm$ && !t.hasAttribute(B))
      ) {
        let a = t.parentElement;
        if (a && a.childNodes) {
          let c = Array.from(a.childNodes),
            l = c.find((d) => d.nodeType === 8 && d["s-sr"]);
          if (l) {
            let d = c.indexOf(t) - 1;
            n.$elm$.setAttribute(
              B,
              `${l["s-host-id"]}.${l["s-node-id"]}.0.${d}`,
            );
          }
        }
      }
    }
  },
  On = (e, t, n, o, s, i) => {
    let a = t.$elm$;
    if (a == null) return;
    let c = n.nodeIds++,
      l = `${o}.${c}.${s}.${i}`;
    if (((a["s-host-id"] = o), (a["s-node-id"] = c), a.nodeType === 1))
      a.setAttribute(B, l);
    else if (a.nodeType === 3) {
      let d = a.parentNode,
        p = d == null ? void 0 : d.nodeName;
      if (p !== "STYLE" && p !== "SCRIPT") {
        let f = `${fe}.${l}`,
          u = e.createComment(f);
        d == null || d.insertBefore(u, a);
      }
    } else if (a.nodeType === 8 && a["s-sr"]) {
      let d = a["s-sn"] || "",
        p = `${ke}.${l}.${d}`;
      a.nodeValue = p;
    }
    if (t.$children$ != null) {
      let d = s + 1;
      t.$children$.forEach((p, f) => {
        On(e, p, n, o, d, f);
      });
    }
  };
var es = (e, t, ...n) => {
  if (Array.isArray(n) && n.length > 0) {
    let o = n.flat(1 / 0);
    return o.some(_t)
      ? Promise.all(o)
          .then((s) => A(e, t, ...s))
          .catch((s) => (q(s), A(e, t)))
      : A(e, t, ...n);
  }
  return A(e, t);
};
var In = () => {};
function kn(e, t) {
  if (
    (typeof e.componentOnReady != "function" && (e.componentOnReady = ts),
    typeof e.forceUpdate != "function" && (e.forceUpdate = ns),
    t.$flags$ & 1 && (e.shadowRoot = e),
    t.$members$ != null)
  ) {
    let n = $(e);
    Object.entries(t.$members$).forEach(([s, i]) => {
      let a = i[0];
      if (a & 31) {
        let c = i[1] || s,
          l = e.getAttribute(c);
        if (l != null) {
          let p = Z(l, a);
          n.$instanceValues$.set(s, p);
        }
        let d = e[s];
        d !== void 0 && (n.$instanceValues$.set(s, d), delete e[s]),
          Object.defineProperty(e, s, {
            get() {
              return re(this, s);
            },
            set(p) {
              ie(this, s, p, t);
            },
            configurable: !0,
            enumerable: !0,
          });
      } else
        a & 64 &&
          Object.defineProperty(e, s, {
            value(...c) {
              let l = $(this);
              return l.$onInstancePromise$
                .then(() => l.$lazyInstance$[s](...c))
                .catch(v);
            },
          });
    });
  }
}
function ts() {
  return $(this).$onReadyPromise$;
}
function ns() {}
function os(e, t, n, o, s) {
  let i = new Set(),
    a = new Set(),
    c = new Set(),
    l = e.document.createElement,
    d = e.document.createElementNS,
    p = Promise.resolve(),
    f,
    u = !1;
  function m() {
    if ((global.clearTimeout(f), a.clear(), i.clear(), !u)) {
      u = !0;
      try {
        t.clientHydrateAnnotations && Qe(e.document, t.staticComponents),
          e.dispatchEvent(new e.Event("DOMContentLoaded")),
          (e.document.createElement = l),
          (e.document.createElementNS = d);
      } catch (k) {
        Pn(t, n, k);
      }
    }
    o(e, t, n, s);
  }
  function h(k) {
    Pn(t, n, k), m();
  }
  function y() {
    h(`Hydrate exceeded timeout${ls(c)}`);
  }
  try {
    let k = function () {
        return Ge(this);
      },
      N = function (b) {
        if (wn(b, t) && !$(b)) {
          let L = be(
            { $tagName$: b.nodeName.toLowerCase(), $flags$: null },
            null,
          );
          L != null &&
            L.cmpMeta != null &&
            (a.add(b),
            (b.connectedCallback = k),
            ce(b, L.cmpMeta),
            kn(b, L.cmpMeta));
        }
      },
      Ze = function (b) {
        if (b != null && b.nodeType === 1) {
          N(b);
          let H = b.children;
          for (let L = 0, Ee = H.length; L < Ee; L++) Ze(H[L]);
        }
      },
      Ge = function (b) {
        return (
          a.delete(b),
          wn(b, t) && n.hydratedCount < t.maxHydrateCount && !i.has(b) && Hn(b)
            ? (i.add(b), ss(e, n, b.nodeName, b, c))
            : p
        );
      },
      et = function () {
        let b = Array.from(a).filter((H) => H.parentElement);
        return b.length > 0 ? Promise.all(b.map(Ge)).then(et) : p;
      };
    var x = k,
      S = N,
      C = Ze,
      de = Ge,
      P = et;
    (e.document.createElement = function (H) {
      let L = l.call(e.document, H);
      return N(L), L;
    }),
      (e.document.createElementNS = function (H, L) {
        let Ee = d.call(e.document, H, L);
        return N(Ee), Ee;
      }),
      (f = global.setTimeout(y, t.timeout)),
      (g.$resourcesUrl$ = new URL(t.resourcesUrl || "./", T.baseURI).href),
      In(),
      Ze(e.document.body),
      et().then(m).catch(h);
  } catch (k) {
    h(k);
  }
}
async function ss(e, t, n, o, s) {
  n = n.toLowerCase();
  let i = be({ $tagName$: n, $flags$: null }, null);
  if (i != null && i.cmpMeta != null) {
    s.add(o);
    try {
      J(o), await o.componentOnReady(), t.hydratedCount++;
      let c = $(o),
        l = c.$modeName$ ? c.$modeName$ : "$";
      t.components.some((d) => d.tag === n && d.mode === l) ||
        t.components.push({ tag: n, mode: l, count: 0, depth: -1 });
    } catch (c) {
      e.console.error(c);
    }
    s.delete(o);
  }
}
function wn(e, t) {
  if (e != null && e.nodeType === 1) {
    let n = e.nodeName;
    if (typeof n == "string" && n.includes("-"))
      return !t.excludeComponents.includes(n.toLowerCase());
  }
  return !1;
}
function Hn(e) {
  if (e.nodeType === 9) return !0;
  if (rs.has(e.nodeName) || e.hasAttribute("no-prerender")) return !1;
  let t = e.parentNode;
  return t == null ? !0 : Hn(t);
}
var rs = new Set([
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
function Pn(e, t, n) {
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
      let s = new URL(e.url);
      s.pathname !== "/" && (o.header += ": " + s.pathname);
    } catch {}
  n != null &&
    (n.stack != null
      ? (o.messageText = n.stack.toString())
      : n.message != null
        ? (o.messageText = n.message.toString())
        : (o.messageText = n.toString())),
    t.diagnostics.push(o);
}
function is(e) {
  let t = `<${e.nodeName.toLowerCase()}`;
  if (Array.isArray(e.attributes))
    for (let n = 0; n < e.attributes.length; n++) {
      let o = e.attributes[n];
      (t += ` ${o.name}`), o.value !== "" && (t += `="${o.value}"`);
    }
  return (t += ">"), t;
}
function as(e) {
  let t = "";
  if (e) {
    let n = [];
    t = " - waiting on:";
    let o = e;
    for (; o && o.nodeType !== 9 && o.nodeName !== "BODY"; )
      n.unshift(is(o)), (o = o.parentElement);
    let s = "";
    for (let i of n)
      (s += "  "),
        (t += `
${s}${i}`);
  }
  return t;
}
function ls(e) {
  return Array.from(e).map(as);
}
var An,
  _n = new Map(),
  Un = (e) => {
    if (typeof e == "string") {
      e = e.toLowerCase();
      let t = _n.get(e);
      if (t != null) return t[e];
    }
    return null;
  },
  be = (e, t, n) => Un(e.$tagName$),
  pt = (e, t) => {
    if (e != null) {
      if (t in e) return !0;
      let n = Un(e.nodeName);
      if (n != null) {
        let o = n;
        if (o != null && o.cmpMeta != null && o.cmpMeta.$members$ != null)
          return t in o.cmpMeta.$members$;
      }
    }
    return !1;
  },
  lc = (e) => {
    for (let t of e) {
      let n = t.cmpMeta.$tagName$;
      _n.set(n, { [n]: t });
    }
  },
  E = window,
  T = E.document,
  cc = (e) => {
    process.nextTick(() => {
      try {
        e();
      } catch (t) {
        v(t);
      }
    });
  },
  un = (e) => {
    process.nextTick(() => {
      try {
        e();
      } catch (t) {
        v(t);
      }
    });
  },
  cs = Promise.resolve(),
  xe = (e) => cs.then(e),
  ds = (e) => {
    e != null && console.error(e.stack || e.message || e);
  },
  v = (e, t) => (An || ds)(e, t),
  q = (...e) => {},
  _ = (...e) => {},
  dc = (...e) => {},
  pc = (e) => (An = e),
  g = {
    $flags$: 0,
    $resourcesUrl$: "",
    jmp: (e) => e(),
    raf: (e) => requestAnimationFrame(e),
    ael: (e, t, n, o) => e.addEventListener(t, n, o),
    rel: (e, t, n, o) => e.removeEventListener(t, n, o),
    ce: (e, t) => new E.CustomEvent(e, t),
  },
  fc = (e) => {
    Object.assign(g, e);
  },
  D = !1,
  vn = !1,
  Qt = !1,
  Lt = new WeakMap(),
  $ = (e) => Lt.get(e),
  uc = (e, t) => Lt.set((t.$lazyInstance$ = e), t),
  ce = (e, t) => {
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
      K(e, n, t.$listeners$, !1),
      Lt.set(e, n)
    );
  },
  ht = { isDev: !1, isBrowser: !1, isServer: !0, isTesting: !1 },
  z = new Map(),
  dt = [];
export {
  r as BUILD,
  ht as Build,
  Bn as Env,
  En as Fragment,
  at as Host,
  pe as NAMESPACE,
  K as addHostEventListeners,
  Nn as bootstrapLazy,
  _n as cmpModules,
  J as connectedCallback,
  q as consoleDevError,
  dc as consoleDevInfo,
  _ as consoleDevWarn,
  v as consoleError,
  Xt as createEvent,
  Sn as defineCustomElement,
  ae as disconnectedCallback,
  T as doc,
  Rn as forceModeUpdate,
  se as forceUpdate,
  kt as getAssetPath,
  Ae as getElement,
  $ as getHostRef,
  qt as getMode,
  dn as getRenderingRef,
  re as getValue,
  es as h,
  os as hydrateApp,
  Qe as insertVdomAnnotations,
  pt as isMemberInElement,
  be as loadModule,
  dt as modeResolutionChain,
  xe as nextTick,
  Z as parsePropertyValue,
  g as plt,
  Fe as postUpdateComponent,
  F as proxyComponent,
  Et as proxyCustomElement,
  cc as readTask,
  lc as registerComponents,
  ce as registerHost,
  uc as registerInstance,
  ye as renderVdom,
  wt as setAssetPath,
  pc as setErrorHandler,
  Yt as setMode,
  vt as setNonce,
  fc as setPlatformHelpers,
  ie as setValue,
  z as styles,
  Qt as supportsConstructableStylesheets,
  vn as supportsListenerOptions,
  D as supportsShadow,
  E as win,
  un as writeTask,
};
