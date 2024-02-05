const _parenSuffix = ")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)",
  _cssColonHostRe = new RegExp("(-shadowcsshost" + _parenSuffix, "gim"),
  _cssColonHostContextRe = new RegExp(
    "(-shadowcsscontext" + _parenSuffix,
    "gim",
  ),
  _cssColonSlottedRe = new RegExp("(-shadowcssslotted" + _parenSuffix, "gim"),
  _polyfillHostNoCombinatorRe = /-shadowcsshost-no-combinator([^\s]*)/,
  _shadowDOMSelectorsRe = [/::shadow/g, /::content/g],
  _polyfillHostRe = /-shadowcsshost/gim,
  createSupportsRuleRe = (e) =>
    new RegExp(`((?<!(^@supports(.*)))|(?<={.*))(${e}\\b)`, "gim"),
  _colonSlottedRe = createSupportsRuleRe("::slotted"),
  _colonHostRe = createSupportsRuleRe(":host"),
  _colonHostContextRe = createSupportsRuleRe(":host-context"),
  _commentRe = /\/\*\s*[\s\S]*?\*\//g,
  _commentWithHashRe = /\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g,
  _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g,
  _curlyRe = /([{}])/g,
  _selectorPartsRe = /(^.*?[^\\])??((:+)(.*)|$)/,
  processRules = (e, t) => {
    const o = escapeBlocks(e);
    let s = 0;
    return o.escapedString.replace(_ruleRe, (...e) => {
      const c = e[2];
      let r = "",
        l = e[4],
        n = "";
      l &&
        l.startsWith("{%BLOCK%") &&
        ((r = o.blocks[s++]), (l = l.substring(8)), (n = "{"));
      const a = t({ selector: c, content: r });
      return `${e[1]}${a.selector}${e[3]}${n}${a.content}${l}`;
    });
  },
  escapeBlocks = (e) => {
    const t = e.split(_curlyRe),
      o = [],
      s = [];
    let c = 0,
      r = [];
    for (let e = 0; e < t.length; e++) {
      const l = t[e];
      "}" === l && c--,
        c > 0
          ? r.push(l)
          : (r.length > 0 && (s.push(r.join("")), o.push("%BLOCK%"), (r = [])),
            o.push(l)),
        "{" === l && c++;
    }
    return (
      r.length > 0 && (s.push(r.join("")), o.push("%BLOCK%")),
      { escapedString: o.join(""), blocks: s }
    );
  },
  convertColonRule = (e, t, o) =>
    e.replace(t, (...e) => {
      if (e[2]) {
        const t = e[2].split(","),
          s = [];
        for (let c = 0; c < t.length; c++) {
          const r = t[c].trim();
          if (!r) break;
          s.push(o("-shadowcsshost-no-combinator", r, e[3]));
        }
        return s.join(",");
      }
      return "-shadowcsshost-no-combinator" + e[3];
    }),
  colonHostPartReplacer = (e, t, o) => e + t.replace("-shadowcsshost", "") + o,
  colonHostContextPartReplacer = (e, t, o) =>
    t.indexOf("-shadowcsshost") > -1
      ? colonHostPartReplacer(e, t, o)
      : e + t + o + ", " + t + " " + e + o,
  injectScopingSelector = (e, t) =>
    e.replace(
      _selectorPartsRe,
      (e, o = "", s, c = "", r = "") => o + t + c + r,
    ),
  scopeSelectors = (e, t, o, s, c) =>
    processRules(e, (e) => {
      let c = e.selector,
        r = e.content;
      return (
        "@" !== e.selector[0]
          ? (c = ((e, t, o, s) =>
              e
                .split(",")
                .map((e) =>
                  s && e.indexOf("." + s) > -1
                    ? e.trim()
                    : ((e, t) =>
                          !((e) => (
                            (e = e.replace(/\[/g, "\\[").replace(/\]/g, "\\]")),
                            new RegExp(
                              "^(" + e + ")([>\\s~+[.,{:][\\s\\S]*)?$",
                              "m",
                            )
                          ))(t).test(e))(e, t)
                      ? ((e, t, o) => {
                          const s =
                              "." +
                              (t = t.replace(
                                /\[is=([^\]]*)\]/g,
                                (e, ...t) => t[0],
                              )),
                            c = (e) => {
                              let c = e.trim();
                              if (!c) return "";
                              if (
                                e.indexOf("-shadowcsshost-no-combinator") > -1
                              )
                                c = ((e, t, o) => {
                                  if (
                                    ((_polyfillHostRe.lastIndex = 0),
                                    _polyfillHostRe.test(e))
                                  ) {
                                    const t = `.${o}`;
                                    return e
                                      .replace(
                                        _polyfillHostNoCombinatorRe,
                                        (e, o) => injectScopingSelector(o, t),
                                      )
                                      .replace(_polyfillHostRe, t + " ");
                                  }
                                  return t + " " + e;
                                })(e, t, o);
                              else {
                                const t = e.replace(_polyfillHostRe, "");
                                t.length > 0 &&
                                  (c = injectScopingSelector(t, s));
                              }
                              return c;
                            },
                            r = ((e) => {
                              const t = [];
                              let o = 0;
                              return {
                                content: (e = e.replace(
                                  /(\[[^\]]*\])/g,
                                  (e, s) => {
                                    const c = `__ph-${o}__`;
                                    return t.push(s), o++, c;
                                  },
                                )).replace(
                                  /(:nth-[-\w]+)(\([^)]+\))/g,
                                  (e, s, c) => {
                                    const r = `__ph-${o}__`;
                                    return t.push(c), o++, s + r;
                                  },
                                ),
                                placeholders: t,
                              };
                            })(e);
                          let l,
                            n = "",
                            a = 0;
                          const p = /( |>|\+|~(?!=))\s*/g;
                          let i = !(
                            (e = r.content).indexOf(
                              "-shadowcsshost-no-combinator",
                            ) > -1
                          );
                          for (; null !== (l = p.exec(e)); ) {
                            const t = l[1],
                              o = e.slice(a, l.index).trim();
                            (i =
                              i ||
                              o.indexOf("-shadowcsshost-no-combinator") > -1),
                              (n += `${i ? c(o) : o} ${t} `),
                              (a = p.lastIndex);
                          }
                          const h = e.substring(a);
                          return (
                            (i =
                              i ||
                              h.indexOf("-shadowcsshost-no-combinator") > -1),
                            (n += i ? c(h) : h),
                            (u = r.placeholders),
                            n.replace(/__ph-(\d+)__/g, (e, t) => u[+t])
                          );
                          var u;
                        })(e, t, o).trim()
                      : e.trim(),
                )
                .join(", "))(e.selector, t, o, s))
          : (e.selector.startsWith("@media") ||
              e.selector.startsWith("@supports") ||
              e.selector.startsWith("@page") ||
              e.selector.startsWith("@document")) &&
            (r = scopeSelectors(e.content, t, o, s)),
        { selector: c.replace(/\s{2,}/g, " ").trim(), content: r }
      );
    }),
  replaceShadowCssHost = (e, t) =>
    e.replace(/-shadowcsshost-no-combinator/g, `.${t}`),
  scopeCss = (e, t, o) => {
    const s = t + "-h",
      c = t + "-s",
      r = e.match(_commentWithHashRe) || [];
    e = e.replace(_commentRe, "");
    const l = [];
    if (o) {
      const t = (e) => {
        const t = `/*!@___${l.length}___*/`,
          o = `/*!@${e.selector}*/`;
        return (
          l.push({ placeholder: t, comment: o }),
          (e.selector = t + e.selector),
          e
        );
      };
      e = processRules(e, (e) =>
        "@" !== e.selector[0]
          ? t(e)
          : e.selector.startsWith("@media") ||
              e.selector.startsWith("@supports") ||
              e.selector.startsWith("@page") ||
              e.selector.startsWith("@document")
            ? ((e.content = processRules(e.content, t)), e)
            : e,
      );
    }
    const n = ((e, t, o, s, c) => {
      const r = ((e, t) => {
        const o = "." + t + " > ",
          s = [];
        return (
          (e = e.replace(_cssColonSlottedRe, (...e) => {
            if (e[2]) {
              const t = e[2].trim(),
                c = e[3],
                r = o + t + c;
              let l = "";
              for (let t = e[4] - 1; t >= 0; t--) {
                const o = e[5][t];
                if ("}" === o || "," === o) break;
                l = o + l;
              }
              const n = (l + r).trim(),
                a = `${l.trimEnd()}${r.trim()}`.trim();
              if (n !== a) {
                const e = `${a}, ${n}`;
                s.push({ orgSelector: n, updatedSelector: e });
              }
              return r;
            }
            return "-shadowcsshost-no-combinator" + e[3];
          })),
          { selectors: s, cssText: e }
        );
      })(
        (e = ((e) =>
          convertColonRule(
            e,
            _cssColonHostContextRe,
            colonHostContextPartReplacer,
          ))(
          (e = ((e) =>
            convertColonRule(e, _cssColonHostRe, colonHostPartReplacer))(
            (e = ((e) =>
              e
                .replace(_colonHostContextRe, "$1-shadowcsscontext")
                .replace(_colonHostRe, "$1-shadowcsshost")
                .replace(_colonSlottedRe, "$1-shadowcssslotted"))(e)),
          )),
        )),
        s,
      );
      return (
        (e = ((e) =>
          _shadowDOMSelectorsRe.reduce((e, t) => e.replace(t, " "), e))(
          (e = r.cssText),
        )),
        t && (e = scopeSelectors(e, t, o, s)),
        {
          cssText: (e = (e = replaceShadowCssHost(e, o)).replace(
            />\s*\*\s+([^{, ]+)/gm,
            " $1 ",
          )).trim(),
          slottedSelectors: r.selectors.map((e) => ({
            orgSelector: replaceShadowCssHost(e.orgSelector, o),
            updatedSelector: replaceShadowCssHost(e.updatedSelector, o),
          })),
        }
      );
    })(e, t, s, c);
    return (
      (e = [n.cssText, ...r].join("\n")),
      o &&
        l.forEach(({ placeholder: t, comment: o }) => {
          e = e.replace(t, o);
        }),
      n.slottedSelectors.forEach((t) => {
        const o = new RegExp(
          t.orgSelector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "g",
        );
        e = e.replace(o, t.updatedSelector);
      }),
      e
    );
  };
export { scopeCss };