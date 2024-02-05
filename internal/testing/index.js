"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) =>
  function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res;
  };
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var escapeRegExpSpecialCharacters;
var init_regular_expression = __esm({
  "src/utils/regular-expression.ts"() {
    "use strict";
    escapeRegExpSpecialCharacters = (text) =>
      text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  },
});
var shadow_css_exports = {};
__export(shadow_css_exports, { scopeCss: () => scopeCss });
var safeSelector,
  restoreSafeSelector,
  _polyfillHost,
  _polyfillSlotted,
  _polyfillHostContext,
  _parenSuffix,
  _cssColonHostRe,
  _cssColonHostContextRe,
  _cssColonSlottedRe,
  _polyfillHostNoCombinator,
  _polyfillHostNoCombinatorRe,
  _shadowDOMSelectorsRe,
  _selectorReSuffix,
  _polyfillHostRe,
  createSupportsRuleRe,
  _colonSlottedRe,
  _colonHostRe,
  _colonHostContextRe,
  _commentRe,
  stripComments,
  _commentWithHashRe,
  extractCommentsWithHash,
  _ruleRe,
  _curlyRe,
  _selectorPartsRe,
  OPEN_CURLY,
  CLOSE_CURLY,
  BLOCK_PLACEHOLDER,
  processRules,
  escapeBlocks,
  insertPolyfillHostInCssText,
  convertColonRule,
  colonHostPartReplacer,
  convertColonHost,
  colonHostContextPartReplacer,
  convertColonSlotted,
  convertColonHostContext,
  convertShadowDOMSelectors,
  makeScopeMatcher,
  selectorNeedsScoping,
  injectScopingSelector,
  applySimpleSelectorScope,
  applyStrictSelectorScope,
  scopeSelector,
  scopeSelectors,
  scopeCssText,
  replaceShadowCssHost,
  scopeCss;
var init_shadow_css = __esm({
  "src/utils/shadow-css.ts"() {
    "use strict";
    init_regular_expression();
    safeSelector = (selector) => {
      const placeholders = [];
      let index = 0;
      selector = selector.replace(/(\[[^\]]*\])/g, (_, keep) => {
        const replaceBy = `__ph-${index}__`;
        placeholders.push(keep);
        index++;
        return replaceBy;
      });
      const content = selector.replace(
        /(:nth-[-\w]+)(\([^)]+\))/g,
        (_, pseudo, exp) => {
          const replaceBy = `__ph-${index}__`;
          placeholders.push(exp);
          index++;
          return pseudo + replaceBy;
        },
      );
      const ss = { content: content, placeholders: placeholders };
      return ss;
    };
    restoreSafeSelector = (placeholders, content) =>
      content.replace(/__ph-(\d+)__/g, (_, index) => placeholders[+index]);
    _polyfillHost = "-shadowcsshost";
    _polyfillSlotted = "-shadowcssslotted";
    _polyfillHostContext = "-shadowcsscontext";
    _parenSuffix = ")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)";
    _cssColonHostRe = new RegExp("(" + _polyfillHost + _parenSuffix, "gim");
    _cssColonHostContextRe = new RegExp(
      "(" + _polyfillHostContext + _parenSuffix,
      "gim",
    );
    _cssColonSlottedRe = new RegExp(
      "(" + _polyfillSlotted + _parenSuffix,
      "gim",
    );
    _polyfillHostNoCombinator = _polyfillHost + "-no-combinator";
    _polyfillHostNoCombinatorRe = /-shadowcsshost-no-combinator([^\s]*)/;
    _shadowDOMSelectorsRe = [/::shadow/g, /::content/g];
    _selectorReSuffix = "([>\\s~+[.,{:][\\s\\S]*)?$";
    _polyfillHostRe = /-shadowcsshost/gim;
    createSupportsRuleRe = (selector) =>
      new RegExp(`((?<!(^@supports(.*)))|(?<={.*))(${selector}\\b)`, "gim");
    _colonSlottedRe = createSupportsRuleRe("::slotted");
    _colonHostRe = createSupportsRuleRe(":host");
    _colonHostContextRe = createSupportsRuleRe(":host-context");
    _commentRe = /\/\*\s*[\s\S]*?\*\//g;
    stripComments = (input) => input.replace(_commentRe, "");
    _commentWithHashRe = /\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g;
    extractCommentsWithHash = (input) => input.match(_commentWithHashRe) || [];
    _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g;
    _curlyRe = /([{}])/g;
    _selectorPartsRe = /(^.*?[^\\])??((:+)(.*)|$)/;
    OPEN_CURLY = "{";
    CLOSE_CURLY = "}";
    BLOCK_PLACEHOLDER = "%BLOCK%";
    processRules = (input, ruleCallback) => {
      const inputWithEscapedBlocks = escapeBlocks(input);
      let nextBlockIndex = 0;
      return inputWithEscapedBlocks.escapedString.replace(_ruleRe, (...m) => {
        const selector = m[2];
        let content = "";
        let suffix = m[4];
        let contentPrefix = "";
        if (suffix && suffix.startsWith("{" + BLOCK_PLACEHOLDER)) {
          content = inputWithEscapedBlocks.blocks[nextBlockIndex++];
          suffix = suffix.substring(BLOCK_PLACEHOLDER.length + 1);
          contentPrefix = "{";
        }
        const cssRule = { selector: selector, content: content };
        const rule = ruleCallback(cssRule);
        return `${m[1]}${rule.selector}${m[3]}${contentPrefix}${rule.content}${suffix}`;
      });
    };
    escapeBlocks = (input) => {
      const inputParts = input.split(_curlyRe);
      const resultParts = [];
      const escapedBlocks = [];
      let bracketCount = 0;
      let currentBlockParts = [];
      for (let partIndex = 0; partIndex < inputParts.length; partIndex++) {
        const part = inputParts[partIndex];
        if (part === CLOSE_CURLY) {
          bracketCount--;
        }
        if (bracketCount > 0) {
          currentBlockParts.push(part);
        } else {
          if (currentBlockParts.length > 0) {
            escapedBlocks.push(currentBlockParts.join(""));
            resultParts.push(BLOCK_PLACEHOLDER);
            currentBlockParts = [];
          }
          resultParts.push(part);
        }
        if (part === OPEN_CURLY) {
          bracketCount++;
        }
      }
      if (currentBlockParts.length > 0) {
        escapedBlocks.push(currentBlockParts.join(""));
        resultParts.push(BLOCK_PLACEHOLDER);
      }
      const strEscapedBlocks = {
        escapedString: resultParts.join(""),
        blocks: escapedBlocks,
      };
      return strEscapedBlocks;
    };
    insertPolyfillHostInCssText = (cssText) => {
      cssText = cssText
        .replace(_colonHostContextRe, `$1${_polyfillHostContext}`)
        .replace(_colonHostRe, `$1${_polyfillHost}`)
        .replace(_colonSlottedRe, `$1${_polyfillSlotted}`);
      return cssText;
    };
    convertColonRule = (cssText, regExp, partReplacer) =>
      cssText.replace(regExp, (...m) => {
        if (m[2]) {
          const parts = m[2].split(",");
          const r = [];
          for (let i2 = 0; i2 < parts.length; i2++) {
            const p = parts[i2].trim();
            if (!p) break;
            r.push(partReplacer(_polyfillHostNoCombinator, p, m[3]));
          }
          return r.join(",");
        } else {
          return _polyfillHostNoCombinator + m[3];
        }
      });
    colonHostPartReplacer = (host, part, suffix) =>
      host + part.replace(_polyfillHost, "") + suffix;
    convertColonHost = (cssText) =>
      convertColonRule(cssText, _cssColonHostRe, colonHostPartReplacer);
    colonHostContextPartReplacer = (host, part, suffix) => {
      if (part.indexOf(_polyfillHost) > -1) {
        return colonHostPartReplacer(host, part, suffix);
      } else {
        return host + part + suffix + ", " + part + " " + host + suffix;
      }
    };
    convertColonSlotted = (cssText, slotScopeId) => {
      const slotClass = "." + slotScopeId + " > ";
      const selectors = [];
      cssText = cssText.replace(_cssColonSlottedRe, (...m) => {
        if (m[2]) {
          const compound = m[2].trim();
          const suffix = m[3];
          const slottedSelector = slotClass + compound + suffix;
          let prefixSelector = "";
          for (let i2 = m[4] - 1; i2 >= 0; i2--) {
            const char = m[5][i2];
            if (char === "}" || char === ",") {
              break;
            }
            prefixSelector = char + prefixSelector;
          }
          const orgSelector = (prefixSelector + slottedSelector).trim();
          const addedSelector =
            `${prefixSelector.trimEnd()}${slottedSelector.trim()}`.trim();
          if (orgSelector !== addedSelector) {
            const updatedSelector = `${addedSelector}, ${orgSelector}`;
            selectors.push({
              orgSelector: orgSelector,
              updatedSelector: updatedSelector,
            });
          }
          return slottedSelector;
        } else {
          return _polyfillHostNoCombinator + m[3];
        }
      });
      return { selectors: selectors, cssText: cssText };
    };
    convertColonHostContext = (cssText) =>
      convertColonRule(
        cssText,
        _cssColonHostContextRe,
        colonHostContextPartReplacer,
      );
    convertShadowDOMSelectors = (cssText) =>
      _shadowDOMSelectorsRe.reduce(
        (result, pattern) => result.replace(pattern, " "),
        cssText,
      );
    makeScopeMatcher = (scopeSelector2) => {
      const lre = /\[/g;
      const rre = /\]/g;
      scopeSelector2 = scopeSelector2.replace(lre, "\\[").replace(rre, "\\]");
      return new RegExp("^(" + scopeSelector2 + ")" + _selectorReSuffix, "m");
    };
    selectorNeedsScoping = (selector, scopeSelector2) => {
      const re = makeScopeMatcher(scopeSelector2);
      return !re.test(selector);
    };
    injectScopingSelector = (selector, scopingSelector) =>
      selector.replace(
        _selectorPartsRe,
        (_, before = "", _colonGroup, colon = "", after = "") =>
          before + scopingSelector + colon + after,
      );
    applySimpleSelectorScope = (selector, scopeSelector2, hostSelector) => {
      _polyfillHostRe.lastIndex = 0;
      if (_polyfillHostRe.test(selector)) {
        const replaceBy = `.${hostSelector}`;
        return selector
          .replace(_polyfillHostNoCombinatorRe, (_, selector2) =>
            injectScopingSelector(selector2, replaceBy),
          )
          .replace(_polyfillHostRe, replaceBy + " ");
      }
      return scopeSelector2 + " " + selector;
    };
    applyStrictSelectorScope = (selector, scopeSelector2, hostSelector) => {
      const isRe = /\[is=([^\]]*)\]/g;
      scopeSelector2 = scopeSelector2.replace(isRe, (_, ...parts) => parts[0]);
      const className = "." + scopeSelector2;
      const _scopeSelectorPart = (p) => {
        let scopedP = p.trim();
        if (!scopedP) {
          return "";
        }
        if (p.indexOf(_polyfillHostNoCombinator) > -1) {
          scopedP = applySimpleSelectorScope(p, scopeSelector2, hostSelector);
        } else {
          const t = p.replace(_polyfillHostRe, "");
          if (t.length > 0) {
            scopedP = injectScopingSelector(t, className);
          }
        }
        return scopedP;
      };
      const safeContent = safeSelector(selector);
      selector = safeContent.content;
      let scopedSelector = "";
      let startIndex = 0;
      let res;
      const sep = /( |>|\+|~(?!=))\s*/g;
      const hasHost = selector.indexOf(_polyfillHostNoCombinator) > -1;
      let shouldScope = !hasHost;
      while ((res = sep.exec(selector)) !== null) {
        const separator = res[1];
        const part2 = selector.slice(startIndex, res.index).trim();
        shouldScope =
          shouldScope || part2.indexOf(_polyfillHostNoCombinator) > -1;
        const scopedPart = shouldScope ? _scopeSelectorPart(part2) : part2;
        scopedSelector += `${scopedPart} ${separator} `;
        startIndex = sep.lastIndex;
      }
      const part = selector.substring(startIndex);
      shouldScope = shouldScope || part.indexOf(_polyfillHostNoCombinator) > -1;
      scopedSelector += shouldScope ? _scopeSelectorPart(part) : part;
      return restoreSafeSelector(safeContent.placeholders, scopedSelector);
    };
    scopeSelector = (selector, scopeSelectorText, hostSelector, slotSelector) =>
      selector
        .split(",")
        .map((shallowPart) => {
          if (slotSelector && shallowPart.indexOf("." + slotSelector) > -1) {
            return shallowPart.trim();
          }
          if (selectorNeedsScoping(shallowPart, scopeSelectorText)) {
            return applyStrictSelectorScope(
              shallowPart,
              scopeSelectorText,
              hostSelector,
            ).trim();
          } else {
            return shallowPart.trim();
          }
        })
        .join(", ");
    scopeSelectors = (
      cssText,
      scopeSelectorText,
      hostSelector,
      slotSelector,
      commentOriginalSelector,
    ) =>
      processRules(cssText, (rule) => {
        let selector = rule.selector;
        let content = rule.content;
        if (rule.selector[0] !== "@") {
          selector = scopeSelector(
            rule.selector,
            scopeSelectorText,
            hostSelector,
            slotSelector,
          );
        } else if (
          rule.selector.startsWith("@media") ||
          rule.selector.startsWith("@supports") ||
          rule.selector.startsWith("@page") ||
          rule.selector.startsWith("@document")
        ) {
          content = scopeSelectors(
            rule.content,
            scopeSelectorText,
            hostSelector,
            slotSelector,
            commentOriginalSelector,
          );
        }
        const cssRule = {
          selector: selector.replace(/\s{2,}/g, " ").trim(),
          content: content,
        };
        return cssRule;
      });
    scopeCssText = (
      cssText,
      scopeId2,
      hostScopeId,
      slotScopeId,
      commentOriginalSelector,
    ) => {
      cssText = insertPolyfillHostInCssText(cssText);
      cssText = convertColonHost(cssText);
      cssText = convertColonHostContext(cssText);
      const slotted = convertColonSlotted(cssText, slotScopeId);
      cssText = slotted.cssText;
      cssText = convertShadowDOMSelectors(cssText);
      if (scopeId2) {
        cssText = scopeSelectors(
          cssText,
          scopeId2,
          hostScopeId,
          slotScopeId,
          commentOriginalSelector,
        );
      }
      cssText = replaceShadowCssHost(cssText, hostScopeId);
      cssText = cssText.replace(/>\s*\*\s+([^{, ]+)/gm, " $1 ");
      return {
        cssText: cssText.trim(),
        slottedSelectors: slotted.selectors.map((ref) => ({
          orgSelector: replaceShadowCssHost(ref.orgSelector, hostScopeId),
          updatedSelector: replaceShadowCssHost(
            ref.updatedSelector,
            hostScopeId,
          ),
        })),
      };
    };
    replaceShadowCssHost = (cssText, hostScopeId) =>
      cssText.replace(/-shadowcsshost-no-combinator/g, `.${hostScopeId}`);
    scopeCss = (cssText, scopeId2, commentOriginalSelector) => {
      const hostScopeId = scopeId2 + "-h";
      const slotScopeId = scopeId2 + "-s";
      const commentsWithHash = extractCommentsWithHash(cssText);
      cssText = stripComments(cssText);
      const orgSelectors = [];
      if (commentOriginalSelector) {
        const processCommentedSelector = (rule) => {
          const placeholder = `/*!@___${orgSelectors.length}___*/`;
          const comment = `/*!@${rule.selector}*/`;
          orgSelectors.push({ placeholder: placeholder, comment: comment });
          rule.selector = placeholder + rule.selector;
          return rule;
        };
        cssText = processRules(cssText, (rule) => {
          if (rule.selector[0] !== "@") {
            return processCommentedSelector(rule);
          } else if (
            rule.selector.startsWith("@media") ||
            rule.selector.startsWith("@supports") ||
            rule.selector.startsWith("@page") ||
            rule.selector.startsWith("@document")
          ) {
            rule.content = processRules(rule.content, processCommentedSelector);
            return rule;
          }
          return rule;
        });
      }
      const scoped = scopeCssText(
        cssText,
        scopeId2,
        hostScopeId,
        slotScopeId,
        commentOriginalSelector,
      );
      cssText = [scoped.cssText, ...commentsWithHash].join("\n");
      if (commentOriginalSelector) {
        orgSelectors.forEach(
          ({ placeholder: placeholder, comment: comment }) => {
            cssText = cssText.replace(placeholder, comment);
          },
        );
      }
      scoped.slottedSelectors.forEach((slottedSelector) => {
        const regex = new RegExp(
          escapeRegExpSpecialCharacters(slottedSelector.orgSelector),
          "g",
        );
        cssText = cssText.replace(regex, slottedSelector.updatedSelector);
      });
      return cssText;
    };
  },
});
var platform_exports = {};
__export(platform_exports, {
  Build: () => Build,
  Env: () => Env,
  Fragment: () => Fragment,
  Host: () => Host,
  addHostEventListeners: () => addHostEventListeners,
  bootstrapLazy: () => bootstrapLazy,
  connectedCallback: () => connectedCallback,
  consoleDevError: () => consoleDevError,
  consoleDevInfo: () => consoleDevInfo,
  consoleDevWarn: () => consoleDevWarn,
  consoleError: () => consoleError,
  createEvent: () => createEvent,
  defineCustomElement: () => defineCustomElement,
  disconnectedCallback: () => disconnectedCallback,
  doc: () => doc,
  flushAll: () => flushAll,
  flushLoadModule: () => flushLoadModule,
  flushQueue: () => flushQueue,
  forceModeUpdate: () => forceModeUpdate,
  forceUpdate: () => forceUpdate,
  getAssetPath: () => getAssetPath,
  getElement: () => getElement,
  getHostRef: () => getHostRef,
  getMode: () => getMode,
  getRenderingRef: () => getRenderingRef,
  getValue: () => getValue,
  h: () => h,
  insertVdomAnnotations: () => insertVdomAnnotations,
  isMemberInElement: () => isMemberInElement,
  loadModule: () => loadModule,
  modeResolutionChain: () => modeResolutionChain,
  nextTick: () => nextTick,
  parsePropertyValue: () => parsePropertyValue,
  plt: () => plt,
  postUpdateComponent: () => postUpdateComponent,
  proxyComponent: () => proxyComponent,
  proxyCustomElement: () => proxyCustomElement,
  readTask: () => readTask,
  registerComponents: () => registerComponents,
  registerHost: () => registerHost,
  registerInstance: () => registerInstance,
  registerModule: () => registerModule,
  renderVdom: () => renderVdom,
  resetPlatform: () => resetPlatform,
  setAssetPath: () => setAssetPath,
  setErrorHandler: () => setErrorHandler,
  setMode: () => setMode,
  setNonce: () => setNonce,
  setPlatformHelpers: () => setPlatformHelpers,
  setPlatformOptions: () => setPlatformOptions,
  setSupportsShadowDom: () => setSupportsShadowDom,
  setValue: () => setValue,
  startAutoApplyChanges: () => startAutoApplyChanges,
  stopAutoApplyChanges: () => stopAutoApplyChanges,
  styles: () => styles,
  supportsConstructableStylesheets: () => supportsConstructableStylesheets,
  supportsListenerOptions: () => supportsListenerOptions,
  supportsShadow: () => supportsShadow,
  win: () => win,
  writeTask: () => writeTask,
});
module.exports = __toCommonJS(platform_exports);
var Build = { isDev: true, isBrowser: false, isServer: true, isTesting: true };
var styles = new Map();
var modeResolutionChain = [];
var cstrs = new Map();
var queuedTicks = [];
var queuedWriteTasks = [];
var queuedReadTasks = [];
var moduleLoaded = new Map();
var queuedLoadModules = [];
var caughtErrors = [];
var hostRefs = new Map();
var getAssetPath = (path) => {
  const assetUrl = new URL(path, plt.$resourcesUrl$);
  return assetUrl.origin !== win.location.origin
    ? assetUrl.href
    : assetUrl.pathname;
};
var setAssetPath = (path) => (plt.$resourcesUrl$ = path);
var BUILD = {
  allRenderFn: false,
  cmpDidLoad: true,
  cmpDidUnload: false,
  cmpDidUpdate: true,
  cmpDidRender: true,
  cmpWillLoad: true,
  cmpWillUpdate: true,
  cmpWillRender: true,
  connectedCallback: true,
  disconnectedCallback: true,
  element: true,
  event: true,
  hasRenderFn: true,
  lifecycle: true,
  hostListener: true,
  hostListenerTargetWindow: true,
  hostListenerTargetDocument: true,
  hostListenerTargetBody: true,
  hostListenerTargetParent: false,
  hostListenerTarget: true,
  member: true,
  method: true,
  mode: true,
  observeAttribute: true,
  prop: true,
  propMutable: true,
  reflect: true,
  scoped: true,
  shadowDom: true,
  slot: true,
  cssAnnotations: true,
  state: true,
  style: true,
  formAssociated: false,
  svg: true,
  updatable: true,
  vdomAttribute: true,
  vdomXlink: true,
  vdomClass: true,
  vdomFunctional: true,
  vdomKey: true,
  vdomListener: true,
  vdomRef: true,
  vdomPropOrAttr: true,
  vdomRender: true,
  vdomStyle: true,
  vdomText: true,
  watchCallback: true,
  taskQueue: true,
  hotModuleReplacement: false,
  isDebug: false,
  isDev: false,
  isTesting: false,
  hydrateServerSide: false,
  hydrateClientSide: false,
  lifecycleDOMEvents: false,
  lazyLoad: false,
  profile: false,
  slotRelocation: true,
  appendChildSlotFix: false,
  cloneNodeFix: false,
  hydratedAttribute: false,
  hydratedClass: true,
  scriptDataOpts: false,
  scopedSlotTextContentFix: false,
  shadowDomShim: false,
  slotChildNodesFix: false,
  invisiblePrehydration: true,
  propBoolean: true,
  propNumber: true,
  propString: true,
  constructableCSS: true,
  cmpShouldUpdate: true,
  devTools: false,
  shadowDelegatesFocus: true,
  initializeNextTick: false,
  asyncLoading: false,
  asyncQueue: false,
  transformTagName: false,
  attachStyles: true,
  experimentalSlotFixes: false,
};
var Env = {};
var NAMESPACE = "app";
var EMPTY_OBJ = {};
var SVG_NS = "http://www.w3.org/2000/svg";
var HTML_NS = "http://www.w3.org/1999/xhtml";
var isDef = (v) => v != null;
var isComplexType = (o) => {
  o = typeof o;
  return o === "object" || o === "function";
};
function queryNonceMetaTagContent(doc2) {
  var _a, _b, _c;
  return (_c =
    (_b =
      (_a = doc2.head) == null
        ? void 0
        : _a.querySelector('meta[name="csp-nonce"]')) == null
      ? void 0
      : _b.getAttribute("content")) != null
    ? _c
    : void 0;
}
init_regular_expression();
var result_exports = {};
__export(result_exports, {
  err: () => err,
  map: () => map,
  ok: () => ok,
  unwrap: () => unwrap,
  unwrapErr: () => unwrapErr,
});
var ok = (value) => ({ isOk: true, isErr: false, value: value });
var err = (value) => ({ isOk: false, isErr: true, value: value });
function map(result, fn) {
  if (result.isOk) {
    const val = fn(result.value);
    if (val instanceof Promise) {
      return val.then((newVal) => ok(newVal));
    } else {
      return ok(val);
    }
  }
  if (result.isErr) {
    const value = result.value;
    return err(value);
  }
  throw "should never get here";
}
var unwrap = (result) => {
  if (result.isOk) {
    return result.value;
  } else {
    throw result.value;
  }
};
var unwrapErr = (result) => {
  if (result.isErr) {
    return result.value;
  } else {
    throw result.value;
  }
};
var i = 0;
var createTime = (fnName, tagName = "") => {
  if (BUILD.profile && performance.mark) {
    const key = `st:${fnName}:${tagName}:${i++}`;
    performance.mark(key);
    return () => performance.measure(`[Stencil] ${fnName}() <${tagName}>`, key);
  } else {
    return () => {};
  }
};
var uniqueTime = (key, measureText) => {
  if (BUILD.profile && performance.mark) {
    if (performance.getEntriesByName(key, "mark").length === 0) {
      performance.mark(key);
    }
    return () => {
      if (performance.getEntriesByName(measureText, "measure").length === 0) {
        performance.measure(measureText, key);
      }
    };
  } else {
    return () => {};
  }
};
var inspect = (ref) => {
  const hostRef = getHostRef(ref);
  if (!hostRef) {
    return void 0;
  }
  const flags = hostRef.$flags$;
  const hostElement = hostRef.$hostElement$;
  return {
    renderCount: hostRef.$renderCount$,
    flags: {
      hasRendered: !!(flags & 2),
      hasConnected: !!(flags & 1),
      isWaitingForChildren: !!(flags & 4),
      isConstructingInstance: !!(flags & 8),
      isQueuedForUpdate: !!(flags & 16),
      hasInitializedComponent: !!(flags & 32),
      hasLoadedComponent: !!(flags & 64),
      isWatchReady: !!(flags & 128),
      isListenReady: !!(flags & 256),
      needsRerender: !!(flags & 512),
    },
    instanceValues: hostRef.$instanceValues$,
    ancestorComponent: hostRef.$ancestorComponent$,
    hostElement: hostElement,
    lazyInstance: hostRef.$lazyInstance$,
    vnode: hostRef.$vnode$,
    modeName: hostRef.$modeName$,
    onReadyPromise: hostRef.$onReadyPromise$,
    onReadyResolve: hostRef.$onReadyResolve$,
    onInstancePromise: hostRef.$onInstancePromise$,
    onInstanceResolve: hostRef.$onInstanceResolve$,
    onRenderResolve: hostRef.$onRenderResolve$,
    queuedListeners: hostRef.$queuedListeners$,
    rmListeners: hostRef.$rmListeners$,
    ["s-id"]: hostElement["s-id"],
    ["s-cr"]: hostElement["s-cr"],
    ["s-lr"]: hostElement["s-lr"],
    ["s-p"]: hostElement["s-p"],
    ["s-rc"]: hostElement["s-rc"],
    ["s-sc"]: hostElement["s-sc"],
  };
};
var installDevTools = () => {
  if (BUILD.devTools) {
    const stencil = (win.stencil = win.stencil || {});
    const originalInspect = stencil.inspect;
    stencil.inspect = (ref) => {
      let result = inspect(ref);
      if (!result && typeof originalInspect === "function") {
        result = originalInspect(ref);
      }
      return result;
    };
  }
};
var CONTENT_REF_ID = "r";
var ORG_LOCATION_ID = "o";
var SLOT_NODE_ID = "s";
var TEXT_NODE_ID = "t";
var HYDRATE_ID = "s-id";
var HYDRATED_STYLE_ID = "sty-id";
var HYDRATE_CHILD_ID = "c-id";
var HYDRATED_CSS = "{visibility:hidden}.hydrated{visibility:inherit}";
var SLOT_FB_CSS = "slot-fb{display:contents}slot-fb[hidden]{display:none}";
var XLINK_NS = "http://www.w3.org/1999/xlink";
var FORM_ASSOCIATED_CUSTOM_ELEMENT_CALLBACKS = [
  "formAssociatedCallback",
  "formResetCallback",
  "formDisabledCallback",
  "formStateRestoreCallback",
];
var h = (nodeName, vnodeData, ...children) => {
  let child = null;
  let key = null;
  let slotName = null;
  let simple = false;
  let lastSimple = false;
  const vNodeChildren = [];
  const walk = (c) => {
    for (let i2 = 0; i2 < c.length; i2++) {
      child = c[i2];
      if (Array.isArray(child)) {
        walk(child);
      } else if (child != null && typeof child !== "boolean") {
        if (
          (simple = typeof nodeName !== "function" && !isComplexType(child))
        ) {
          child = String(child);
        } else if (
          BUILD.isDev &&
          typeof nodeName !== "function" &&
          child.$flags$ === void 0
        ) {
          consoleDevError(
            `vNode passed as children has unexpected type.\nMake sure it's using the correct h() function.\nEmpty objects can also be the cause, look for JSX comments that became objects.`,
          );
        }
        if (simple && lastSimple) {
          vNodeChildren[vNodeChildren.length - 1].$text$ += child;
        } else {
          vNodeChildren.push(simple ? newVNode(null, child) : child);
        }
        lastSimple = simple;
      }
    }
  };
  walk(children);
  if (vnodeData) {
    if (BUILD.isDev && nodeName === "input") {
      validateInputProperties(vnodeData);
    }
    if (BUILD.vdomKey && vnodeData.key) {
      key = vnodeData.key;
    }
    if (BUILD.slotRelocation && vnodeData.name) {
      slotName = vnodeData.name;
    }
    if (BUILD.vdomClass) {
      const classData = vnodeData.className || vnodeData.class;
      if (classData) {
        vnodeData.class =
          typeof classData !== "object"
            ? classData
            : Object.keys(classData)
                .filter((k) => classData[k])
                .join(" ");
      }
    }
  }
  if (BUILD.isDev && vNodeChildren.some(isHost)) {
    consoleDevError(
      `The <Host> must be the single root component. Make sure:\n- You are NOT using hostData() and <Host> in the same component.\n- <Host> is used once, and it's the single root component of the render() function.`,
    );
  }
  if (BUILD.vdomFunctional && typeof nodeName === "function") {
    return nodeName(
      vnodeData === null ? {} : vnodeData,
      vNodeChildren,
      vdomFnUtils,
    );
  }
  const vnode = newVNode(nodeName, null);
  vnode.$attrs$ = vnodeData;
  if (vNodeChildren.length > 0) {
    vnode.$children$ = vNodeChildren;
  }
  if (BUILD.vdomKey) {
    vnode.$key$ = key;
  }
  if (BUILD.slotRelocation) {
    vnode.$name$ = slotName;
  }
  return vnode;
};
var newVNode = (tag, text) => {
  const vnode = {
    $flags$: 0,
    $tag$: tag,
    $text$: text,
    $elm$: null,
    $children$: null,
  };
  if (BUILD.vdomAttribute) {
    vnode.$attrs$ = null;
  }
  if (BUILD.vdomKey) {
    vnode.$key$ = null;
  }
  if (BUILD.slotRelocation) {
    vnode.$name$ = null;
  }
  return vnode;
};
var Host = {};
var isHost = (node) => node && node.$tag$ === Host;
var vdomFnUtils = {
  forEach: (children, cb) => children.map(convertToPublic).forEach(cb),
  map: (children, cb) =>
    children.map(convertToPublic).map(cb).map(convertToPrivate),
};
var convertToPublic = (node) => ({
  vattrs: node.$attrs$,
  vchildren: node.$children$,
  vkey: node.$key$,
  vname: node.$name$,
  vtag: node.$tag$,
  vtext: node.$text$,
});
var convertToPrivate = (node) => {
  if (typeof node.vtag === "function") {
    const vnodeData = { ...node.vattrs };
    if (node.vkey) {
      vnodeData.key = node.vkey;
    }
    if (node.vname) {
      vnodeData.name = node.vname;
    }
    return h(node.vtag, vnodeData, ...(node.vchildren || []));
  }
  const vnode = newVNode(node.vtag, node.vtext);
  vnode.$attrs$ = node.vattrs;
  vnode.$children$ = node.vchildren;
  vnode.$key$ = node.vkey;
  vnode.$name$ = node.vname;
  return vnode;
};
var validateInputProperties = (inputElm) => {
  const props = Object.keys(inputElm);
  const value = props.indexOf("value");
  if (value === -1) {
    return;
  }
  const typeIndex = props.indexOf("type");
  const minIndex = props.indexOf("min");
  const maxIndex = props.indexOf("max");
  const stepIndex = props.indexOf("step");
  if (
    value < typeIndex ||
    value < minIndex ||
    value < maxIndex ||
    value < stepIndex
  ) {
    consoleDevWarn(
      `The "value" prop of <input> should be set after "min", "max", "type" and "step"`,
    );
  }
};
var initializeClientHydrate = (hostElm, tagName, hostId, hostRef) => {
  const endHydrate = createTime("hydrateClient", tagName);
  const shadowRoot = hostElm.shadowRoot;
  const childRenderNodes = [];
  const slotNodes = [];
  const shadowRootNodes = BUILD.shadowDom && shadowRoot ? [] : null;
  const vnode = (hostRef.$vnode$ = newVNode(tagName, null));
  if (!plt.$orgLocNodes$) {
    initializeDocumentHydrate(doc.body, (plt.$orgLocNodes$ = new Map()));
  }
  hostElm[HYDRATE_ID] = hostId;
  hostElm.removeAttribute(HYDRATE_ID);
  clientHydrate(
    vnode,
    childRenderNodes,
    slotNodes,
    shadowRootNodes,
    hostElm,
    hostElm,
    hostId,
  );
  childRenderNodes.map((c) => {
    const orgLocationId = c.$hostId$ + "." + c.$nodeId$;
    const orgLocationNode = plt.$orgLocNodes$.get(orgLocationId);
    const node = c.$elm$;
    if (orgLocationNode && supportsShadow && orgLocationNode["s-en"] === "") {
      orgLocationNode.parentNode.insertBefore(
        node,
        orgLocationNode.nextSibling,
      );
    }
    if (!shadowRoot) {
      node["s-hn"] = tagName;
      if (orgLocationNode) {
        node["s-ol"] = orgLocationNode;
        node["s-ol"]["s-nr"] = node;
      }
    }
    plt.$orgLocNodes$.delete(orgLocationId);
  });
  if (BUILD.shadowDom && shadowRoot) {
    shadowRootNodes.map((shadowRootNode) => {
      if (shadowRootNode) {
        shadowRoot.appendChild(shadowRootNode);
      }
    });
  }
  endHydrate();
};
var clientHydrate = (
  parentVNode,
  childRenderNodes,
  slotNodes,
  shadowRootNodes,
  hostElm,
  node,
  hostId,
) => {
  let childNodeType;
  let childIdSplt;
  let childVNode;
  let i2;
  if (node.nodeType === 1) {
    childNodeType = node.getAttribute(HYDRATE_CHILD_ID);
    if (childNodeType) {
      childIdSplt = childNodeType.split(".");
      if (childIdSplt[0] === hostId || childIdSplt[0] === "0") {
        childVNode = {
          $flags$: 0,
          $hostId$: childIdSplt[0],
          $nodeId$: childIdSplt[1],
          $depth$: childIdSplt[2],
          $index$: childIdSplt[3],
          $tag$: node.tagName.toLowerCase(),
          $elm$: node,
          $attrs$: null,
          $children$: null,
          $key$: null,
          $name$: null,
          $text$: null,
        };
        childRenderNodes.push(childVNode);
        node.removeAttribute(HYDRATE_CHILD_ID);
        if (!parentVNode.$children$) {
          parentVNode.$children$ = [];
        }
        parentVNode.$children$[childVNode.$index$] = childVNode;
        parentVNode = childVNode;
        if (shadowRootNodes && childVNode.$depth$ === "0") {
          shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
        }
      }
    }
    for (i2 = node.childNodes.length - 1; i2 >= 0; i2--) {
      clientHydrate(
        parentVNode,
        childRenderNodes,
        slotNodes,
        shadowRootNodes,
        hostElm,
        node.childNodes[i2],
        hostId,
      );
    }
    if (node.shadowRoot) {
      for (i2 = node.shadowRoot.childNodes.length - 1; i2 >= 0; i2--) {
        clientHydrate(
          parentVNode,
          childRenderNodes,
          slotNodes,
          shadowRootNodes,
          hostElm,
          node.shadowRoot.childNodes[i2],
          hostId,
        );
      }
    }
  } else if (node.nodeType === 8) {
    childIdSplt = node.nodeValue.split(".");
    if (childIdSplt[1] === hostId || childIdSplt[1] === "0") {
      childNodeType = childIdSplt[0];
      childVNode = {
        $flags$: 0,
        $hostId$: childIdSplt[1],
        $nodeId$: childIdSplt[2],
        $depth$: childIdSplt[3],
        $index$: childIdSplt[4],
        $elm$: node,
        $attrs$: null,
        $children$: null,
        $key$: null,
        $name$: null,
        $tag$: null,
        $text$: null,
      };
      if (childNodeType === TEXT_NODE_ID) {
        childVNode.$elm$ = node.nextSibling;
        if (childVNode.$elm$ && childVNode.$elm$.nodeType === 3) {
          childVNode.$text$ = childVNode.$elm$.textContent;
          childRenderNodes.push(childVNode);
          node.remove();
          if (!parentVNode.$children$) {
            parentVNode.$children$ = [];
          }
          parentVNode.$children$[childVNode.$index$] = childVNode;
          if (shadowRootNodes && childVNode.$depth$ === "0") {
            shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
          }
        }
      } else if (childVNode.$hostId$ === hostId) {
        if (childNodeType === SLOT_NODE_ID) {
          childVNode.$tag$ = "slot";
          if (childIdSplt[5]) {
            node["s-sn"] = childVNode.$name$ = childIdSplt[5];
          } else {
            node["s-sn"] = "";
          }
          node["s-sr"] = true;
          if (BUILD.shadowDom && shadowRootNodes) {
            childVNode.$elm$ = doc.createElement(childVNode.$tag$);
            if (childVNode.$name$) {
              childVNode.$elm$.setAttribute("name", childVNode.$name$);
            }
            node.parentNode.insertBefore(childVNode.$elm$, node);
            node.remove();
            if (childVNode.$depth$ === "0") {
              shadowRootNodes[childVNode.$index$] = childVNode.$elm$;
            }
          }
          slotNodes.push(childVNode);
          if (!parentVNode.$children$) {
            parentVNode.$children$ = [];
          }
          parentVNode.$children$[childVNode.$index$] = childVNode;
        } else if (childNodeType === CONTENT_REF_ID) {
          if (BUILD.shadowDom && shadowRootNodes) {
            node.remove();
          } else if (BUILD.slotRelocation) {
            hostElm["s-cr"] = node;
            node["s-cn"] = true;
          }
        }
      }
    }
  } else if (parentVNode && parentVNode.$tag$ === "style") {
    const vnode = newVNode(null, node.textContent);
    vnode.$elm$ = node;
    vnode.$index$ = "0";
    parentVNode.$children$ = [vnode];
  }
};
var initializeDocumentHydrate = (node, orgLocNodes) => {
  if (node.nodeType === 1) {
    let i2 = 0;
    for (; i2 < node.childNodes.length; i2++) {
      initializeDocumentHydrate(node.childNodes[i2], orgLocNodes);
    }
    if (node.shadowRoot) {
      for (i2 = 0; i2 < node.shadowRoot.childNodes.length; i2++) {
        initializeDocumentHydrate(node.shadowRoot.childNodes[i2], orgLocNodes);
      }
    }
  } else if (node.nodeType === 8) {
    const childIdSplt = node.nodeValue.split(".");
    if (childIdSplt[0] === ORG_LOCATION_ID) {
      orgLocNodes.set(childIdSplt[1] + "." + childIdSplt[2], node);
      node.nodeValue = "";
      node["s-en"] = childIdSplt[3];
    }
  }
};
var computeMode = (elm) =>
  modeResolutionChain.map((h2) => h2(elm)).find((m) => !!m);
var setMode = (handler) => modeResolutionChain.push(handler);
var getMode = (ref) => getHostRef(ref).$modeName$;
var parsePropertyValue = (propValue, propType) => {
  if (propValue != null && !isComplexType(propValue)) {
    if (BUILD.propBoolean && propType & 4) {
      return propValue === "false" ? false : propValue === "" || !!propValue;
    }
    if (BUILD.propNumber && propType & 2) {
      return parseFloat(propValue);
    }
    if (BUILD.propString && propType & 1) {
      return String(propValue);
    }
    return propValue;
  }
  return propValue;
};
var getElement = (ref) =>
  BUILD.lazyLoad ? getHostRef(ref).$hostElement$ : ref;
var createEvent = (ref, name, flags) => {
  const elm = getElement(ref);
  return {
    emit: (detail) => {
      if (BUILD.isDev && !elm.isConnected) {
        consoleDevWarn(
          `The "${name}" event was emitted, but the dispatcher node is no longer connected to the dom.`,
        );
      }
      return emitEvent(elm, name, {
        bubbles: !!(flags & 4),
        composed: !!(flags & 2),
        cancelable: !!(flags & 1),
        detail: detail,
      });
    },
  };
};
var emitEvent = (elm, name, opts) => {
  const ev = plt.ce(name, opts);
  elm.dispatchEvent(ev);
  return ev;
};
var rootAppliedStyles = new WeakMap();
var registerStyle = (scopeId2, cssText, allowCS) => {
  let style = styles.get(scopeId2);
  if (supportsConstructableStylesheets && allowCS) {
    style = style || new CSSStyleSheet();
    if (typeof style === "string") {
      style = cssText;
    } else {
      style.replaceSync(cssText);
    }
  } else {
    style = cssText;
  }
  styles.set(scopeId2, style);
};
var addStyle = (styleContainerNode, cmpMeta, mode) => {
  var _a;
  const scopeId2 = getScopeId(cmpMeta, mode);
  const style = styles.get(scopeId2);
  if (!BUILD.attachStyles) {
    return scopeId2;
  }
  styleContainerNode =
    styleContainerNode.nodeType === 11 ? styleContainerNode : doc;
  if (style) {
    if (typeof style === "string") {
      styleContainerNode = styleContainerNode.head || styleContainerNode;
      let appliedStyles = rootAppliedStyles.get(styleContainerNode);
      let styleElm;
      if (!appliedStyles) {
        rootAppliedStyles.set(styleContainerNode, (appliedStyles = new Set()));
      }
      if (!appliedStyles.has(scopeId2)) {
        if (
          BUILD.hydrateClientSide &&
          styleContainerNode.host &&
          (styleElm = styleContainerNode.querySelector(
            `[${HYDRATED_STYLE_ID}="${scopeId2}"]`,
          ))
        ) {
          styleElm.innerHTML = style;
        } else {
          styleElm = doc.createElement("style");
          styleElm.innerHTML = style;
          const nonce =
            (_a = plt.$nonce$) != null ? _a : queryNonceMetaTagContent(doc);
          if (nonce != null) {
            styleElm.setAttribute("nonce", nonce);
          }
          if (BUILD.hydrateServerSide || BUILD.hotModuleReplacement) {
            styleElm.setAttribute(HYDRATED_STYLE_ID, scopeId2);
          }
          styleContainerNode.insertBefore(
            styleElm,
            styleContainerNode.querySelector("link"),
          );
        }
        if (cmpMeta.$flags$ & 4) {
          styleElm.innerHTML += SLOT_FB_CSS;
        }
        if (appliedStyles) {
          appliedStyles.add(scopeId2);
        }
      }
    } else if (
      BUILD.constructableCSS &&
      !styleContainerNode.adoptedStyleSheets.includes(style)
    ) {
      styleContainerNode.adoptedStyleSheets = [
        ...styleContainerNode.adoptedStyleSheets,
        style,
      ];
    }
  }
  return scopeId2;
};
var attachStyles = (hostRef) => {
  const cmpMeta = hostRef.$cmpMeta$;
  const elm = hostRef.$hostElement$;
  const flags = cmpMeta.$flags$;
  const endAttachStyles = createTime("attachStyles", cmpMeta.$tagName$);
  const scopeId2 = addStyle(
    BUILD.shadowDom && supportsShadow && elm.shadowRoot
      ? elm.shadowRoot
      : elm.getRootNode(),
    cmpMeta,
    hostRef.$modeName$,
  );
  if ((BUILD.shadowDom || BUILD.scoped) && BUILD.cssAnnotations && flags & 10) {
    elm["s-sc"] = scopeId2;
    elm.classList.add(scopeId2 + "-h");
    if (BUILD.scoped && flags & 2) {
      elm.classList.add(scopeId2 + "-s");
    }
  }
  endAttachStyles();
};
var getScopeId = (cmp, mode) =>
  "sc-" +
  (BUILD.mode && mode && cmp.$flags$ & 32
    ? cmp.$tagName$ + "-" + mode
    : cmp.$tagName$);
var convertScopedToShadow = (css) =>
  css.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g, "$1{");
var setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
  if (oldValue !== newValue) {
    let isProp = isMemberInElement(elm, memberName);
    let ln = memberName.toLowerCase();
    if (BUILD.vdomClass && memberName === "class") {
      const classList = elm.classList;
      const oldClasses = parseClassList(oldValue);
      const newClasses = parseClassList(newValue);
      classList.remove(
        ...oldClasses.filter((c) => c && !newClasses.includes(c)),
      );
      classList.add(...newClasses.filter((c) => c && !oldClasses.includes(c)));
    } else if (BUILD.vdomStyle && memberName === "style") {
      if (BUILD.updatable) {
        for (const prop in oldValue) {
          if (!newValue || newValue[prop] == null) {
            if (!BUILD.hydrateServerSide && prop.includes("-")) {
              elm.style.removeProperty(prop);
            } else {
              elm.style[prop] = "";
            }
          }
        }
      }
      for (const prop in newValue) {
        if (!oldValue || newValue[prop] !== oldValue[prop]) {
          if (!BUILD.hydrateServerSide && prop.includes("-")) {
            elm.style.setProperty(prop, newValue[prop]);
          } else {
            elm.style[prop] = newValue[prop];
          }
        }
      }
    } else if (BUILD.vdomKey && memberName === "key") {
    } else if (BUILD.vdomRef && memberName === "ref") {
      if (newValue) {
        newValue(elm);
      }
    } else if (
      BUILD.vdomListener &&
      (BUILD.lazyLoad ? !isProp : !elm.__lookupSetter__(memberName)) &&
      memberName[0] === "o" &&
      memberName[1] === "n"
    ) {
      if (memberName[2] === "-") {
        memberName = memberName.slice(3);
      } else if (isMemberInElement(win, ln)) {
        memberName = ln.slice(2);
      } else {
        memberName = ln[2] + memberName.slice(3);
      }
      if (oldValue || newValue) {
        const capture = memberName.endsWith(CAPTURE_EVENT_SUFFIX);
        memberName = memberName.replace(CAPTURE_EVENT_REGEX, "");
        if (oldValue) {
          plt.rel(elm, memberName, oldValue, capture);
        }
        if (newValue) {
          plt.ael(elm, memberName, newValue, capture);
        }
      }
    } else if (BUILD.vdomPropOrAttr) {
      const isComplex = isComplexType(newValue);
      if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
        try {
          if (!elm.tagName.includes("-")) {
            const n = newValue == null ? "" : newValue;
            if (memberName === "list") {
              isProp = false;
            } else if (oldValue == null || elm[memberName] != n) {
              elm[memberName] = n;
            }
          } else {
            elm[memberName] = newValue;
          }
        } catch (e) {}
      }
      let xlink = false;
      if (BUILD.vdomXlink) {
        if (ln !== (ln = ln.replace(/^xlink\:?/, ""))) {
          memberName = ln;
          xlink = true;
        }
      }
      if (newValue == null || newValue === false) {
        if (newValue !== false || elm.getAttribute(memberName) === "") {
          if (BUILD.vdomXlink && xlink) {
            elm.removeAttributeNS(XLINK_NS, memberName);
          } else {
            elm.removeAttribute(memberName);
          }
        }
      } else if ((!isProp || flags & 4 || isSvg) && !isComplex) {
        newValue = newValue === true ? "" : newValue;
        if (BUILD.vdomXlink && xlink) {
          elm.setAttributeNS(XLINK_NS, memberName, newValue);
        } else {
          elm.setAttribute(memberName, newValue);
        }
      }
    }
  }
};
var parseClassListRegex = /\s/;
var parseClassList = (value) =>
  !value ? [] : value.split(parseClassListRegex);
var CAPTURE_EVENT_SUFFIX = "Capture";
var CAPTURE_EVENT_REGEX = new RegExp(CAPTURE_EVENT_SUFFIX + "$");
var updateElement = (oldVnode, newVnode, isSvgMode2, memberName) => {
  const elm =
    newVnode.$elm$.nodeType === 11 && newVnode.$elm$.host
      ? newVnode.$elm$.host
      : newVnode.$elm$;
  const oldVnodeAttrs = (oldVnode && oldVnode.$attrs$) || EMPTY_OBJ;
  const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
  if (BUILD.updatable) {
    for (memberName in oldVnodeAttrs) {
      if (!(memberName in newVnodeAttrs)) {
        setAccessor(
          elm,
          memberName,
          oldVnodeAttrs[memberName],
          void 0,
          isSvgMode2,
          newVnode.$flags$,
        );
      }
    }
  }
  for (memberName in newVnodeAttrs) {
    setAccessor(
      elm,
      memberName,
      oldVnodeAttrs[memberName],
      newVnodeAttrs[memberName],
      isSvgMode2,
      newVnode.$flags$,
    );
  }
};
var scopeId;
var contentRef;
var hostTagName;
var useNativeShadowDom = false;
var checkSlotFallbackVisibility = false;
var checkSlotRelocate = false;
var isSvgMode = false;
var createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
  const newVNode2 = newParentVNode.$children$[childIndex];
  let i2 = 0;
  let elm;
  let childNode;
  let oldVNode;
  if (BUILD.slotRelocation && !useNativeShadowDom) {
    checkSlotRelocate = true;
    if (newVNode2.$tag$ === "slot") {
      if (scopeId) {
        parentElm.classList.add(scopeId + "-s");
      }
      newVNode2.$flags$ |= newVNode2.$children$ ? 2 : 1;
    }
  }
  if (BUILD.isDev && newVNode2.$elm$) {
    consoleDevError(
      `The JSX ${newVNode2.$text$ !== null ? `"${newVNode2.$text$}" text` : `"${newVNode2.$tag$}" element`} node should not be shared within the same renderer. The renderer caches element lookups in order to improve performance. However, a side effect from this is that the exact same JSX node should not be reused. For more information please see https://stenciljs.com/docs/templating-jsx#avoid-shared-jsx-nodes`,
    );
  }
  if (BUILD.vdomText && newVNode2.$text$ !== null) {
    elm = newVNode2.$elm$ = doc.createTextNode(newVNode2.$text$);
  } else if (BUILD.slotRelocation && newVNode2.$flags$ & 1) {
    elm = newVNode2.$elm$ =
      BUILD.isDebug || BUILD.hydrateServerSide
        ? slotReferenceDebugNode(newVNode2)
        : doc.createTextNode("");
  } else {
    if (BUILD.svg && !isSvgMode) {
      isSvgMode = newVNode2.$tag$ === "svg";
    }
    elm = newVNode2.$elm$ = BUILD.svg
      ? doc.createElementNS(
          isSvgMode ? SVG_NS : HTML_NS,
          BUILD.slotRelocation && newVNode2.$flags$ & 2
            ? "slot-fb"
            : newVNode2.$tag$,
        )
      : doc.createElement(
          BUILD.slotRelocation && newVNode2.$flags$ & 2
            ? "slot-fb"
            : newVNode2.$tag$,
        );
    if (BUILD.svg && isSvgMode && newVNode2.$tag$ === "foreignObject") {
      isSvgMode = false;
    }
    if (BUILD.vdomAttribute) {
      updateElement(null, newVNode2, isSvgMode);
    }
    if (
      (BUILD.shadowDom || BUILD.scoped) &&
      isDef(scopeId) &&
      elm["s-si"] !== scopeId
    ) {
      elm.classList.add((elm["s-si"] = scopeId));
    }
    if (newVNode2.$children$) {
      for (i2 = 0; i2 < newVNode2.$children$.length; ++i2) {
        childNode = createElm(oldParentVNode, newVNode2, i2, elm);
        if (childNode) {
          elm.appendChild(childNode);
        }
      }
    }
    if (BUILD.svg) {
      if (newVNode2.$tag$ === "svg") {
        isSvgMode = false;
      } else if (elm.tagName === "foreignObject") {
        isSvgMode = true;
      }
    }
  }
  elm["s-hn"] = hostTagName;
  if (BUILD.slotRelocation) {
    if (newVNode2.$flags$ & (2 | 1)) {
      elm["s-sr"] = true;
      elm["s-cr"] = contentRef;
      elm["s-sn"] = newVNode2.$name$ || "";
      oldVNode =
        oldParentVNode &&
        oldParentVNode.$children$ &&
        oldParentVNode.$children$[childIndex];
      if (
        oldVNode &&
        oldVNode.$tag$ === newVNode2.$tag$ &&
        oldParentVNode.$elm$
      ) {
        if (BUILD.experimentalSlotFixes) {
          relocateToHostRoot(oldParentVNode.$elm$);
        } else {
          putBackInOriginalLocation(oldParentVNode.$elm$, false);
        }
      }
    }
  }
  return elm;
};
var relocateToHostRoot = (parentElm) => {
  plt.$flags$ |= 1;
  const host = parentElm.closest(hostTagName.toLowerCase());
  if (host != null) {
    const contentRefNode = Array.from(host.childNodes).find(
      (ref) => ref["s-cr"],
    );
    const childNodeArray = Array.from(parentElm.childNodes);
    for (const childNode of contentRefNode
      ? childNodeArray.reverse()
      : childNodeArray) {
      if (childNode["s-sh"] != null) {
        host.insertBefore(
          childNode,
          contentRefNode != null ? contentRefNode : null,
        );
        childNode["s-sh"] = void 0;
        checkSlotRelocate = true;
      }
    }
  }
  plt.$flags$ &= ~1;
};
var putBackInOriginalLocation = (parentElm, recursive) => {
  plt.$flags$ |= 1;
  const oldSlotChildNodes = parentElm.childNodes;
  for (let i2 = oldSlotChildNodes.length - 1; i2 >= 0; i2--) {
    const childNode = oldSlotChildNodes[i2];
    if (childNode["s-hn"] !== hostTagName && childNode["s-ol"]) {
      parentReferenceNode(childNode).insertBefore(
        childNode,
        referenceNode(childNode),
      );
      childNode["s-ol"].remove();
      childNode["s-ol"] = void 0;
      childNode["s-sh"] = void 0;
      checkSlotRelocate = true;
    }
    if (recursive) {
      putBackInOriginalLocation(childNode, recursive);
    }
  }
  plt.$flags$ &= ~1;
};
var addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
  let containerElm =
    (BUILD.slotRelocation &&
      parentElm["s-cr"] &&
      parentElm["s-cr"].parentNode) ||
    parentElm;
  let childNode;
  if (
    BUILD.shadowDom &&
    containerElm.shadowRoot &&
    containerElm.tagName === hostTagName
  ) {
    containerElm = containerElm.shadowRoot;
  }
  for (; startIdx <= endIdx; ++startIdx) {
    if (vnodes[startIdx]) {
      childNode = createElm(null, parentVNode, startIdx, parentElm);
      if (childNode) {
        vnodes[startIdx].$elm$ = childNode;
        containerElm.insertBefore(
          childNode,
          BUILD.slotRelocation ? referenceNode(before) : before,
        );
      }
    }
  }
};
var removeVnodes = (vnodes, startIdx, endIdx) => {
  for (let index = startIdx; index <= endIdx; ++index) {
    const vnode = vnodes[index];
    if (vnode) {
      const elm = vnode.$elm$;
      nullifyVNodeRefs(vnode);
      if (elm) {
        if (BUILD.slotRelocation) {
          checkSlotFallbackVisibility = true;
          if (elm["s-ol"]) {
            elm["s-ol"].remove();
          } else {
            putBackInOriginalLocation(elm, true);
          }
        }
        elm.remove();
      }
    }
  }
};
var updateChildren = (
  parentElm,
  oldCh,
  newVNode2,
  newCh,
  isInitialRender = false,
) => {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let idxInOld = 0;
  let i2 = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let node;
  let elmToMove;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newStartVnode, isInitialRender)) {
      patch(oldStartVnode, newStartVnode, isInitialRender);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (isSameVnode(oldEndVnode, newEndVnode, isInitialRender)) {
      patch(oldEndVnode, newEndVnode, isInitialRender);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newEndVnode, isInitialRender)) {
      if (
        BUILD.slotRelocation &&
        (oldStartVnode.$tag$ === "slot" || newEndVnode.$tag$ === "slot")
      ) {
        putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
      }
      patch(oldStartVnode, newEndVnode, isInitialRender);
      parentElm.insertBefore(
        oldStartVnode.$elm$,
        oldEndVnode.$elm$.nextSibling,
      );
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldEndVnode, newStartVnode, isInitialRender)) {
      if (
        BUILD.slotRelocation &&
        (oldStartVnode.$tag$ === "slot" || newEndVnode.$tag$ === "slot")
      ) {
        putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false);
      }
      patch(oldEndVnode, newStartVnode, isInitialRender);
      parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      idxInOld = -1;
      if (BUILD.vdomKey) {
        for (i2 = oldStartIdx; i2 <= oldEndIdx; ++i2) {
          if (
            oldCh[i2] &&
            oldCh[i2].$key$ !== null &&
            oldCh[i2].$key$ === newStartVnode.$key$
          ) {
            idxInOld = i2;
            break;
          }
        }
      }
      if (BUILD.vdomKey && idxInOld >= 0) {
        elmToMove = oldCh[idxInOld];
        if (elmToMove.$tag$ !== newStartVnode.$tag$) {
          node = createElm(
            oldCh && oldCh[newStartIdx],
            newVNode2,
            idxInOld,
            parentElm,
          );
        } else {
          patch(elmToMove, newStartVnode, isInitialRender);
          oldCh[idxInOld] = void 0;
          node = elmToMove.$elm$;
        }
        newStartVnode = newCh[++newStartIdx];
      } else {
        node = createElm(
          oldCh && oldCh[newStartIdx],
          newVNode2,
          newStartIdx,
          parentElm,
        );
        newStartVnode = newCh[++newStartIdx];
      }
      if (node) {
        if (BUILD.slotRelocation) {
          parentReferenceNode(oldStartVnode.$elm$).insertBefore(
            node,
            referenceNode(oldStartVnode.$elm$),
          );
        } else {
          oldStartVnode.$elm$.parentNode.insertBefore(
            node,
            oldStartVnode.$elm$,
          );
        }
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    addVnodes(
      parentElm,
      newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$,
      newVNode2,
      newCh,
      newStartIdx,
      newEndIdx,
    );
  } else if (BUILD.updatable && newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
};
var isSameVnode = (leftVNode, rightVNode, isInitialRender = false) => {
  if (leftVNode.$tag$ === rightVNode.$tag$) {
    if (BUILD.slotRelocation && leftVNode.$tag$ === "slot") {
      return leftVNode.$name$ === rightVNode.$name$;
    }
    if (BUILD.vdomKey && !isInitialRender) {
      return leftVNode.$key$ === rightVNode.$key$;
    }
    return true;
  }
  return false;
};
var referenceNode = (node) => (node && node["s-ol"]) || node;
var parentReferenceNode = (node) =>
  (node["s-ol"] ? node["s-ol"] : node).parentNode;
var patch = (oldVNode, newVNode2, isInitialRender = false) => {
  const elm = (newVNode2.$elm$ = oldVNode.$elm$);
  const oldChildren = oldVNode.$children$;
  const newChildren = newVNode2.$children$;
  const tag = newVNode2.$tag$;
  const text = newVNode2.$text$;
  let defaultHolder;
  if (!BUILD.vdomText || text === null) {
    if (BUILD.svg) {
      isSvgMode =
        tag === "svg" ? true : tag === "foreignObject" ? false : isSvgMode;
    }
    if (BUILD.vdomAttribute || BUILD.reflect) {
      if (BUILD.slot && tag === "slot" && !useNativeShadowDom) {
        if (
          BUILD.experimentalSlotFixes &&
          oldVNode.$name$ !== newVNode2.$name$
        ) {
          newVNode2.$elm$["s-sn"] = newVNode2.$name$ || "";
          relocateToHostRoot(newVNode2.$elm$.parentElement);
        }
      } else {
        updateElement(oldVNode, newVNode2, isSvgMode);
      }
    }
    if (BUILD.updatable && oldChildren !== null && newChildren !== null) {
      updateChildren(elm, oldChildren, newVNode2, newChildren, isInitialRender);
    } else if (newChildren !== null) {
      if (BUILD.updatable && BUILD.vdomText && oldVNode.$text$ !== null) {
        elm.textContent = "";
      }
      addVnodes(elm, null, newVNode2, newChildren, 0, newChildren.length - 1);
    } else if (BUILD.updatable && oldChildren !== null) {
      removeVnodes(oldChildren, 0, oldChildren.length - 1);
    }
    if (BUILD.svg && isSvgMode && tag === "svg") {
      isSvgMode = false;
    }
  } else if (
    BUILD.vdomText &&
    BUILD.slotRelocation &&
    (defaultHolder = elm["s-cr"])
  ) {
    defaultHolder.parentNode.textContent = text;
  } else if (BUILD.vdomText && oldVNode.$text$ !== text) {
    elm.data = text;
  }
};
var updateFallbackSlotVisibility = (elm) => {
  const childNodes = elm.childNodes;
  for (const childNode of childNodes) {
    if (childNode.nodeType === 1) {
      if (childNode["s-sr"]) {
        const slotName = childNode["s-sn"];
        childNode.hidden = false;
        for (const siblingNode of childNodes) {
          if (siblingNode !== childNode) {
            if (siblingNode["s-hn"] !== childNode["s-hn"] || slotName !== "") {
              if (
                siblingNode.nodeType === 1 &&
                (slotName === siblingNode.getAttribute("slot") ||
                  slotName === siblingNode["s-sn"])
              ) {
                childNode.hidden = true;
                break;
              }
            } else {
              if (
                siblingNode.nodeType === 1 ||
                (siblingNode.nodeType === 3 &&
                  siblingNode.textContent.trim() !== "")
              ) {
                childNode.hidden = true;
                break;
              }
            }
          }
        }
      }
      updateFallbackSlotVisibility(childNode);
    }
  }
};
var relocateNodes = [];
var markSlotContentForRelocation = (elm) => {
  let node;
  let hostContentNodes;
  let j;
  for (const childNode of elm.childNodes) {
    if (childNode["s-sr"] && (node = childNode["s-cr"]) && node.parentNode) {
      hostContentNodes = node.parentNode.childNodes;
      const slotName = childNode["s-sn"];
      for (j = hostContentNodes.length - 1; j >= 0; j--) {
        node = hostContentNodes[j];
        if (
          !node["s-cn"] &&
          !node["s-nr"] &&
          node["s-hn"] !== childNode["s-hn"] &&
          (!BUILD.experimentalSlotFixes ||
            !node["s-sh"] ||
            node["s-sh"] !== childNode["s-hn"])
        ) {
          if (isNodeLocatedInSlot(node, slotName)) {
            let relocateNodeData = relocateNodes.find(
              (r) => r.$nodeToRelocate$ === node,
            );
            checkSlotFallbackVisibility = true;
            node["s-sn"] = node["s-sn"] || slotName;
            if (relocateNodeData) {
              relocateNodeData.$nodeToRelocate$["s-sh"] = childNode["s-hn"];
              relocateNodeData.$slotRefNode$ = childNode;
            } else {
              node["s-sh"] = childNode["s-hn"];
              relocateNodes.push({
                $slotRefNode$: childNode,
                $nodeToRelocate$: node,
              });
            }
            if (node["s-sr"]) {
              relocateNodes.map((relocateNode) => {
                if (
                  isNodeLocatedInSlot(
                    relocateNode.$nodeToRelocate$,
                    node["s-sn"],
                  )
                ) {
                  relocateNodeData = relocateNodes.find(
                    (r) => r.$nodeToRelocate$ === node,
                  );
                  if (relocateNodeData && !relocateNode.$slotRefNode$) {
                    relocateNode.$slotRefNode$ = relocateNodeData.$slotRefNode$;
                  }
                }
              });
            }
          } else if (!relocateNodes.some((r) => r.$nodeToRelocate$ === node)) {
            relocateNodes.push({ $nodeToRelocate$: node });
          }
        }
      }
    }
    if (childNode.nodeType === 1) {
      markSlotContentForRelocation(childNode);
    }
  }
};
var isNodeLocatedInSlot = (nodeToRelocate, slotName) => {
  if (nodeToRelocate.nodeType === 1) {
    if (nodeToRelocate.getAttribute("slot") === null && slotName === "") {
      return true;
    }
    if (nodeToRelocate.getAttribute("slot") === slotName) {
      return true;
    }
    return false;
  }
  if (nodeToRelocate["s-sn"] === slotName) {
    return true;
  }
  return slotName === "";
};
var nullifyVNodeRefs = (vNode) => {
  if (BUILD.vdomRef) {
    vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(null);
    vNode.$children$ && vNode.$children$.map(nullifyVNodeRefs);
  }
};
var renderVdom = (hostRef, renderFnResults, isInitialLoad = false) => {
  var _a, _b, _c, _d, _e;
  const hostElm = hostRef.$hostElement$;
  const cmpMeta = hostRef.$cmpMeta$;
  const oldVNode = hostRef.$vnode$ || newVNode(null, null);
  const rootVnode = isHost(renderFnResults)
    ? renderFnResults
    : h(null, null, renderFnResults);
  hostTagName = hostElm.tagName;
  if (
    BUILD.isDev &&
    Array.isArray(renderFnResults) &&
    renderFnResults.some(isHost)
  ) {
    throw new Error(
      `The <Host> must be the single root component.\nLooks like the render() function of "${hostTagName.toLowerCase()}" is returning an array that contains the <Host>.\n\nThe render() function should look like this instead:\n\nrender() {\n  // Do not return an array\n  return (\n    <Host>{content}</Host>\n  );\n}\n  `,
    );
  }
  if (BUILD.reflect && cmpMeta.$attrsToReflect$) {
    rootVnode.$attrs$ = rootVnode.$attrs$ || {};
    cmpMeta.$attrsToReflect$.map(
      ([propName, attribute]) =>
        (rootVnode.$attrs$[attribute] = hostElm[propName]),
    );
  }
  if (isInitialLoad && rootVnode.$attrs$) {
    for (const key of Object.keys(rootVnode.$attrs$)) {
      if (
        hostElm.hasAttribute(key) &&
        !["key", "ref", "style", "class"].includes(key)
      ) {
        rootVnode.$attrs$[key] = hostElm[key];
      }
    }
  }
  rootVnode.$tag$ = null;
  rootVnode.$flags$ |= 4;
  hostRef.$vnode$ = rootVnode;
  rootVnode.$elm$ = oldVNode.$elm$ = BUILD.shadowDom
    ? hostElm.shadowRoot || hostElm
    : hostElm;
  if (BUILD.scoped || BUILD.shadowDom) {
    scopeId = hostElm["s-sc"];
  }
  useNativeShadowDom = supportsShadow && (cmpMeta.$flags$ & 1) !== 0;
  if (BUILD.slotRelocation) {
    contentRef = hostElm["s-cr"];
    checkSlotFallbackVisibility = false;
  }
  patch(oldVNode, rootVnode, isInitialLoad);
  if (BUILD.slotRelocation) {
    plt.$flags$ |= 1;
    if (checkSlotRelocate) {
      markSlotContentForRelocation(rootVnode.$elm$);
      for (const relocateData of relocateNodes) {
        const nodeToRelocate = relocateData.$nodeToRelocate$;
        if (!nodeToRelocate["s-ol"]) {
          const orgLocationNode =
            BUILD.isDebug || BUILD.hydrateServerSide
              ? originalLocationDebugNode(nodeToRelocate)
              : doc.createTextNode("");
          orgLocationNode["s-nr"] = nodeToRelocate;
          nodeToRelocate.parentNode.insertBefore(
            (nodeToRelocate["s-ol"] = orgLocationNode),
            nodeToRelocate,
          );
        }
      }
      for (const relocateData of relocateNodes) {
        const nodeToRelocate = relocateData.$nodeToRelocate$;
        const slotRefNode = relocateData.$slotRefNode$;
        if (slotRefNode) {
          const parentNodeRef = slotRefNode.parentNode;
          let insertBeforeNode = slotRefNode.nextSibling;
          if (
            !BUILD.experimentalSlotFixes ||
            (insertBeforeNode && insertBeforeNode.nodeType === 1)
          ) {
            let orgLocationNode =
              (_a = nodeToRelocate["s-ol"]) == null
                ? void 0
                : _a.previousSibling;
            while (orgLocationNode) {
              let refNode = (_b = orgLocationNode["s-nr"]) != null ? _b : null;
              if (
                refNode &&
                refNode["s-sn"] === nodeToRelocate["s-sn"] &&
                parentNodeRef === refNode.parentNode
              ) {
                refNode = refNode.nextSibling;
                if (!refNode || !refNode["s-nr"]) {
                  insertBeforeNode = refNode;
                  break;
                }
              }
              orgLocationNode = orgLocationNode.previousSibling;
            }
          }
          if (
            (!insertBeforeNode &&
              parentNodeRef !== nodeToRelocate.parentNode) ||
            nodeToRelocate.nextSibling !== insertBeforeNode
          ) {
            if (nodeToRelocate !== insertBeforeNode) {
              if (
                !BUILD.experimentalSlotFixes &&
                !nodeToRelocate["s-hn"] &&
                nodeToRelocate["s-ol"]
              ) {
                nodeToRelocate["s-hn"] =
                  nodeToRelocate["s-ol"].parentNode.nodeName;
              }
              parentNodeRef.insertBefore(nodeToRelocate, insertBeforeNode);
              if (nodeToRelocate.nodeType === 1) {
                nodeToRelocate.hidden =
                  (_c = nodeToRelocate["s-ih"]) != null ? _c : false;
              }
            }
          }
        } else {
          if (nodeToRelocate.nodeType === 1) {
            if (isInitialLoad) {
              nodeToRelocate["s-ih"] =
                (_d = nodeToRelocate.hidden) != null ? _d : false;
            }
            nodeToRelocate.hidden = true;
          }
        }
      }
    }
    if (checkSlotFallbackVisibility) {
      updateFallbackSlotVisibility(rootVnode.$elm$);
    }
    plt.$flags$ &= ~1;
    relocateNodes.length = 0;
  }
  if (BUILD.experimentalScopedSlotChanges && cmpMeta.$flags$ & 2) {
    for (const childNode of rootVnode.$elm$.childNodes) {
      if (childNode["s-hn"] !== hostTagName && !childNode["s-sh"]) {
        if (isInitialLoad && childNode["s-ih"] == null) {
          childNode["s-ih"] = (_e = childNode.hidden) != null ? _e : false;
        }
        childNode.hidden = true;
      }
    }
  }
  contentRef = void 0;
};
var slotReferenceDebugNode = (slotVNode) =>
  doc.createComment(
    `<slot${slotVNode.$name$ ? ' name="' + slotVNode.$name$ + '"' : ""}> (host=${hostTagName.toLowerCase()})`,
  );
var originalLocationDebugNode = (nodeToRelocate) =>
  doc.createComment(
    `org-location for ` +
      (nodeToRelocate.localName
        ? `<${nodeToRelocate.localName}> (host=${nodeToRelocate["s-hn"]})`
        : `[${nodeToRelocate.textContent}]`),
  );
var attachToAncestor = (hostRef, ancestorComponent) => {
  if (
    BUILD.asyncLoading &&
    ancestorComponent &&
    !hostRef.$onRenderResolve$ &&
    ancestorComponent["s-p"]
  ) {
    ancestorComponent["s-p"].push(
      new Promise((r) => (hostRef.$onRenderResolve$ = r)),
    );
  }
};
var scheduleUpdate = (hostRef, isInitialLoad) => {
  if (BUILD.taskQueue && BUILD.updatable) {
    hostRef.$flags$ |= 16;
  }
  if (BUILD.asyncLoading && hostRef.$flags$ & 4) {
    hostRef.$flags$ |= 512;
    return;
  }
  attachToAncestor(hostRef, hostRef.$ancestorComponent$);
  const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
  return BUILD.taskQueue ? writeTask(dispatch) : dispatch();
};
var dispatchHooks = (hostRef, isInitialLoad) => {
  const elm = hostRef.$hostElement$;
  const endSchedule = createTime("scheduleUpdate", hostRef.$cmpMeta$.$tagName$);
  const instance = BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
  let maybePromise;
  if (isInitialLoad) {
    if (BUILD.lazyLoad && BUILD.hostListener) {
      hostRef.$flags$ |= 256;
      if (hostRef.$queuedListeners$) {
        hostRef.$queuedListeners$.map(([methodName, event]) =>
          safeCall(instance, methodName, event),
        );
        hostRef.$queuedListeners$ = void 0;
      }
    }
    emitLifecycleEvent(elm, "componentWillLoad");
    if (BUILD.cmpWillLoad) {
      maybePromise = safeCall(instance, "componentWillLoad");
    }
  } else {
    emitLifecycleEvent(elm, "componentWillUpdate");
    if (BUILD.cmpWillUpdate) {
      maybePromise = safeCall(instance, "componentWillUpdate");
    }
  }
  emitLifecycleEvent(elm, "componentWillRender");
  if (BUILD.cmpWillRender) {
    maybePromise = enqueue(maybePromise, () =>
      safeCall(instance, "componentWillRender"),
    );
  }
  endSchedule();
  return enqueue(maybePromise, () =>
    updateComponent(hostRef, instance, isInitialLoad),
  );
};
var enqueue = (maybePromise, fn) =>
  isPromisey(maybePromise) ? maybePromise.then(fn) : fn();
var isPromisey = (maybePromise) =>
  maybePromise instanceof Promise ||
  (maybePromise &&
    maybePromise.then &&
    typeof maybePromise.then === "function");
var updateComponent = async (hostRef, instance, isInitialLoad) => {
  var _a;
  const elm = hostRef.$hostElement$;
  const endUpdate = createTime("update", hostRef.$cmpMeta$.$tagName$);
  const rc = elm["s-rc"];
  if (BUILD.style && isInitialLoad) {
    attachStyles(hostRef);
  }
  const endRender = createTime("render", hostRef.$cmpMeta$.$tagName$);
  if (BUILD.isDev) {
    hostRef.$flags$ |= 1024;
  }
  if (BUILD.hydrateServerSide) {
    await callRender(hostRef, instance, elm, isInitialLoad);
  } else {
    callRender(hostRef, instance, elm, isInitialLoad);
  }
  if (BUILD.isDev) {
    hostRef.$renderCount$ =
      hostRef.$renderCount$ === void 0 ? 1 : hostRef.$renderCount$ + 1;
    hostRef.$flags$ &= ~1024;
  }
  if (BUILD.hydrateServerSide) {
    try {
      serverSideConnected(elm);
      if (isInitialLoad) {
        if (hostRef.$cmpMeta$.$flags$ & 1) {
          elm["s-en"] = "";
        } else if (hostRef.$cmpMeta$.$flags$ & 2) {
          elm["s-en"] = "c";
        }
      }
    } catch (e) {
      consoleError(e, elm);
    }
  }
  if (BUILD.asyncLoading && rc) {
    rc.map((cb) => cb());
    elm["s-rc"] = void 0;
  }
  endRender();
  endUpdate();
  if (BUILD.asyncLoading) {
    const childrenPromises = (_a = elm["s-p"]) != null ? _a : [];
    const postUpdate = () => postUpdateComponent(hostRef);
    if (childrenPromises.length === 0) {
      postUpdate();
    } else {
      Promise.all(childrenPromises).then(postUpdate);
      hostRef.$flags$ |= 4;
      childrenPromises.length = 0;
    }
  } else {
    postUpdateComponent(hostRef);
  }
};
var renderingRef = null;
var callRender = (hostRef, instance, elm, isInitialLoad) => {
  const allRenderFn = BUILD.allRenderFn ? true : false;
  const lazyLoad = BUILD.lazyLoad ? true : false;
  const taskQueue = BUILD.taskQueue ? true : false;
  const updatable = BUILD.updatable ? true : false;
  try {
    renderingRef = instance;
    instance = allRenderFn
      ? instance.render()
      : instance.render && instance.render();
    if (updatable && taskQueue) {
      hostRef.$flags$ &= ~16;
    }
    if (updatable || lazyLoad) {
      hostRef.$flags$ |= 2;
    }
    if (BUILD.hasRenderFn || BUILD.reflect) {
      if (BUILD.vdomRender || BUILD.reflect) {
        if (BUILD.hydrateServerSide) {
          return Promise.resolve(instance).then((value) =>
            renderVdom(hostRef, value, isInitialLoad),
          );
        } else {
          renderVdom(hostRef, instance, isInitialLoad);
        }
      } else {
        const shadowRoot = elm.shadowRoot;
        if (hostRef.$cmpMeta$.$flags$ & 1) {
          shadowRoot.textContent = instance;
        } else {
          elm.textContent = instance;
        }
      }
    }
  } catch (e) {
    consoleError(e, hostRef.$hostElement$);
  }
  renderingRef = null;
  return null;
};
var getRenderingRef = () => renderingRef;
var postUpdateComponent = (hostRef) => {
  const tagName = hostRef.$cmpMeta$.$tagName$;
  const elm = hostRef.$hostElement$;
  const endPostUpdate = createTime("postUpdate", tagName);
  const instance = BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
  const ancestorComponent = hostRef.$ancestorComponent$;
  if (BUILD.cmpDidRender) {
    if (BUILD.isDev) {
      hostRef.$flags$ |= 1024;
    }
    safeCall(instance, "componentDidRender");
    if (BUILD.isDev) {
      hostRef.$flags$ &= ~1024;
    }
  }
  emitLifecycleEvent(elm, "componentDidRender");
  if (!(hostRef.$flags$ & 64)) {
    hostRef.$flags$ |= 64;
    if (BUILD.asyncLoading && BUILD.cssAnnotations) {
      addHydratedFlag(elm);
    }
    if (BUILD.cmpDidLoad) {
      if (BUILD.isDev) {
        hostRef.$flags$ |= 2048;
      }
      safeCall(instance, "componentDidLoad");
      if (BUILD.isDev) {
        hostRef.$flags$ &= ~2048;
      }
    }
    emitLifecycleEvent(elm, "componentDidLoad");
    endPostUpdate();
    if (BUILD.asyncLoading) {
      hostRef.$onReadyResolve$(elm);
      if (!ancestorComponent) {
        appDidLoad(tagName);
      }
    }
  } else {
    if (BUILD.cmpDidUpdate) {
      if (BUILD.isDev) {
        hostRef.$flags$ |= 1024;
      }
      safeCall(instance, "componentDidUpdate");
      if (BUILD.isDev) {
        hostRef.$flags$ &= ~1024;
      }
    }
    emitLifecycleEvent(elm, "componentDidUpdate");
    endPostUpdate();
  }
  if (BUILD.method && BUILD.lazyLoad) {
    hostRef.$onInstanceResolve$(elm);
  }
  if (BUILD.asyncLoading) {
    if (hostRef.$onRenderResolve$) {
      hostRef.$onRenderResolve$();
      hostRef.$onRenderResolve$ = void 0;
    }
    if (hostRef.$flags$ & 512) {
      nextTick(() => scheduleUpdate(hostRef, false));
    }
    hostRef.$flags$ &= ~(4 | 512);
  }
};
var forceUpdate = (ref) => {
  if (BUILD.updatable && (Build.isBrowser || Build.isTesting)) {
    const hostRef = getHostRef(ref);
    const isConnected = hostRef.$hostElement$.isConnected;
    if (isConnected && (hostRef.$flags$ & (2 | 16)) === 2) {
      scheduleUpdate(hostRef, false);
    }
    return isConnected;
  }
  return false;
};
var appDidLoad = (who) => {
  if (BUILD.cssAnnotations) {
    addHydratedFlag(doc.documentElement);
  }
  if (BUILD.asyncQueue) {
    plt.$flags$ |= 2;
  }
  nextTick(() =>
    emitEvent(win, "appload", { detail: { namespace: NAMESPACE } }),
  );
  if (BUILD.profile && performance.measure) {
    performance.measure(
      `[Stencil] ${NAMESPACE} initial load (by ${who})`,
      "st:app:start",
    );
  }
};
var safeCall = (instance, method, arg) => {
  if (instance && instance[method]) {
    try {
      return instance[method](arg);
    } catch (e) {
      consoleError(e);
    }
  }
  return void 0;
};
var emitLifecycleEvent = (elm, lifecycleName) => {
  if (BUILD.lifecycleDOMEvents) {
    emitEvent(elm, "stencil_" + lifecycleName, {
      bubbles: true,
      composed: true,
      detail: { namespace: NAMESPACE },
    });
  }
};
var addHydratedFlag = (elm) =>
  BUILD.hydratedClass
    ? elm.classList.add("hydrated")
    : BUILD.hydratedAttribute
      ? elm.setAttribute("hydrated", "")
      : void 0;
var serverSideConnected = (elm) => {
  const children = elm.children;
  if (children != null) {
    for (let i2 = 0, ii = children.length; i2 < ii; i2++) {
      const childElm = children[i2];
      if (typeof childElm.connectedCallback === "function") {
        childElm.connectedCallback();
      }
      serverSideConnected(childElm);
    }
  }
};
var getValue = (ref, propName) =>
  getHostRef(ref).$instanceValues$.get(propName);
var setValue = (ref, propName, newVal, cmpMeta) => {
  const hostRef = getHostRef(ref);
  const elm = BUILD.lazyLoad ? hostRef.$hostElement$ : ref;
  const oldVal = hostRef.$instanceValues$.get(propName);
  const flags = hostRef.$flags$;
  const instance = BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
  newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
  const areBothNaN = Number.isNaN(oldVal) && Number.isNaN(newVal);
  const didValueChange = newVal !== oldVal && !areBothNaN;
  if (
    (!BUILD.lazyLoad || !(flags & 8) || oldVal === void 0) &&
    didValueChange
  ) {
    hostRef.$instanceValues$.set(propName, newVal);
    if (BUILD.isDev) {
      if (hostRef.$flags$ & 1024) {
        consoleDevWarn(
          `The state/prop "${propName}" changed during rendering. This can potentially lead to infinite-loops and other bugs.`,
          "\nElement",
          elm,
          "\nNew value",
          newVal,
          "\nOld value",
          oldVal,
        );
      } else if (hostRef.$flags$ & 2048) {
        consoleDevWarn(
          `The state/prop "${propName}" changed during "componentDidLoad()", this triggers extra re-renders, try to setup on "componentWillLoad()"`,
          "\nElement",
          elm,
          "\nNew value",
          newVal,
          "\nOld value",
          oldVal,
        );
      }
    }
    if (!BUILD.lazyLoad || instance) {
      if (BUILD.watchCallback && cmpMeta.$watchers$ && flags & 128) {
        const watchMethods = cmpMeta.$watchers$[propName];
        if (watchMethods) {
          watchMethods.map((watchMethodName) => {
            try {
              instance[watchMethodName](newVal, oldVal, propName);
            } catch (e) {
              consoleError(e, elm);
            }
          });
        }
      }
      if (BUILD.updatable && (flags & (2 | 16)) === 2) {
        if (BUILD.cmpShouldUpdate && instance.componentShouldUpdate) {
          if (
            instance.componentShouldUpdate(newVal, oldVal, propName) === false
          ) {
            return;
          }
        }
        scheduleUpdate(hostRef, false);
      }
    }
  }
};
var proxyComponent = (Cstr, cmpMeta, flags) => {
  var _a;
  const prototype = Cstr.prototype;
  if (BUILD.formAssociated && cmpMeta.$flags$ & 64 && flags & 1) {
    FORM_ASSOCIATED_CUSTOM_ELEMENT_CALLBACKS.forEach((cbName) =>
      Object.defineProperty(prototype, cbName, {
        value(...args) {
          const hostRef = getHostRef(this);
          const elm = BUILD.lazyLoad ? hostRef.$hostElement$ : this;
          const instance = BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
          if (!instance) {
            hostRef.$onReadyPromise$.then((instance2) => {
              const cb = instance2[cbName];
              typeof cb === "function" && cb.call(instance2, ...args);
            });
          } else {
            const cb = instance[cbName];
            typeof cb === "function" && cb.call(instance, ...args);
          }
        },
      }),
    );
  }
  if (BUILD.member && cmpMeta.$members$) {
    if (BUILD.watchCallback && Cstr.watchers) {
      cmpMeta.$watchers$ = Cstr.watchers;
    }
    const members = Object.entries(cmpMeta.$members$);
    members.map(([memberName, [memberFlags]]) => {
      if (
        (BUILD.prop || BUILD.state) &&
        (memberFlags & 31 ||
          ((!BUILD.lazyLoad || flags & 2) && memberFlags & 32))
      ) {
        Object.defineProperty(prototype, memberName, {
          get() {
            return getValue(this, memberName);
          },
          set(newValue) {
            if (BUILD.isDev) {
              const ref = getHostRef(this);
              if (
                (flags & 1) === 0 &&
                (ref && ref.$flags$ & 8) === 0 &&
                (memberFlags & 31) !== 0 &&
                (memberFlags & 1024) === 0
              ) {
                consoleDevWarn(
                  `@Prop() "${memberName}" on <${cmpMeta.$tagName$}> is immutable but was modified from within the component.\nMore information: https://stenciljs.com/docs/properties#prop-mutability`,
                );
              }
            }
            setValue(this, memberName, newValue, cmpMeta);
          },
          configurable: true,
          enumerable: true,
        });
      } else if (
        BUILD.lazyLoad &&
        BUILD.method &&
        flags & 1 &&
        memberFlags & 64
      ) {
        Object.defineProperty(prototype, memberName, {
          value(...args) {
            var _a2;
            const ref = getHostRef(this);
            return (_a2 = ref == null ? void 0 : ref.$onInstancePromise$) ==
              null
              ? void 0
              : _a2.then(() => {
                  var _a3;
                  return (_a3 = ref.$lazyInstance$) == null
                    ? void 0
                    : _a3[memberName](...args);
                });
          },
        });
      }
    });
    if (BUILD.observeAttribute && (!BUILD.lazyLoad || flags & 1)) {
      const attrNameToPropName = new Map();
      prototype.attributeChangedCallback = function (
        attrName,
        oldValue,
        newValue,
      ) {
        plt.jmp(() => {
          var _a2;
          const propName = attrNameToPropName.get(attrName);
          if (this.hasOwnProperty(propName)) {
            newValue = this[propName];
            delete this[propName];
          } else if (
            prototype.hasOwnProperty(propName) &&
            typeof this[propName] === "number" &&
            this[propName] == newValue
          ) {
            return;
          } else if (propName == null) {
            const hostRef = getHostRef(this);
            const flags2 = hostRef == null ? void 0 : hostRef.$flags$;
            if (
              flags2 &&
              !(flags2 & 8) &&
              flags2 & 128 &&
              newValue !== oldValue
            ) {
              const elm = BUILD.lazyLoad ? hostRef.$hostElement$ : this;
              const instance = BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
              const entry =
                (_a2 = cmpMeta.$watchers$) == null ? void 0 : _a2[attrName];
              entry == null
                ? void 0
                : entry.forEach((callbackName) => {
                    if (instance[callbackName] != null) {
                      instance[callbackName].call(
                        instance,
                        newValue,
                        oldValue,
                        attrName,
                      );
                    }
                  });
            }
            return;
          }
          this[propName] =
            newValue === null && typeof this[propName] === "boolean"
              ? false
              : newValue;
        });
      };
      Cstr.observedAttributes = Array.from(
        new Set([
          ...Object.keys((_a = cmpMeta.$watchers$) != null ? _a : {}),
          ...members
            .filter(([_, m]) => m[0] & 15)
            .map(([propName, m]) => {
              var _a2;
              const attrName = m[1] || propName;
              attrNameToPropName.set(attrName, propName);
              if (BUILD.reflect && m[0] & 512) {
                (_a2 = cmpMeta.$attrsToReflect$) == null
                  ? void 0
                  : _a2.push([propName, attrName]);
              }
              return attrName;
            }),
        ]),
      );
    }
  }
  return Cstr;
};
var initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId) => {
  let Cstr;
  if ((hostRef.$flags$ & 32) === 0) {
    hostRef.$flags$ |= 32;
    if (BUILD.lazyLoad || BUILD.hydrateClientSide) {
      Cstr = loadModule(cmpMeta, hostRef, hmrVersionId);
      if (Cstr.then) {
        const endLoad = uniqueTime(
          `st:load:${cmpMeta.$tagName$}:${hostRef.$modeName$}`,
          `[Stencil] Load module for <${cmpMeta.$tagName$}>`,
        );
        Cstr = await Cstr;
        endLoad();
      }
      if ((BUILD.isDev || BUILD.isDebug) && !Cstr) {
        throw new Error(
          `Constructor for "${cmpMeta.$tagName$}#${hostRef.$modeName$}" was not found`,
        );
      }
      if (BUILD.member && !Cstr.isProxied) {
        if (BUILD.watchCallback) {
          cmpMeta.$watchers$ = Cstr.watchers;
        }
        proxyComponent(Cstr, cmpMeta, 2);
        Cstr.isProxied = true;
      }
      const endNewInstance = createTime("createInstance", cmpMeta.$tagName$);
      if (BUILD.member) {
        hostRef.$flags$ |= 8;
      }
      try {
        new Cstr(hostRef);
      } catch (e) {
        consoleError(e);
      }
      if (BUILD.member) {
        hostRef.$flags$ &= ~8;
      }
      if (BUILD.watchCallback) {
        hostRef.$flags$ |= 128;
      }
      endNewInstance();
      fireConnectedCallback(hostRef.$lazyInstance$);
    } else {
      Cstr = elm.constructor;
      customElements
        .whenDefined(cmpMeta.$tagName$)
        .then(() => (hostRef.$flags$ |= 128));
    }
    if (BUILD.style && Cstr.style) {
      let style = Cstr.style;
      if (BUILD.mode && typeof style !== "string") {
        style = style[(hostRef.$modeName$ = computeMode(elm))];
        if (BUILD.hydrateServerSide && hostRef.$modeName$) {
          elm.setAttribute("s-mode", hostRef.$modeName$);
        }
      }
      const scopeId2 = getScopeId(cmpMeta, hostRef.$modeName$);
      if (!styles.has(scopeId2)) {
        const endRegisterStyles = createTime(
          "registerStyles",
          cmpMeta.$tagName$,
        );
        if (
          !BUILD.hydrateServerSide &&
          BUILD.shadowDom &&
          BUILD.shadowDomShim &&
          cmpMeta.$flags$ & 8
        ) {
          style = await Promise.resolve()
            .then(() => (init_shadow_css(), shadow_css_exports))
            .then((m) => m.scopeCss(style, scopeId2, false));
        }
        registerStyle(scopeId2, style, !!(cmpMeta.$flags$ & 1));
        endRegisterStyles();
      }
    }
  }
  const ancestorComponent = hostRef.$ancestorComponent$;
  const schedule = () => scheduleUpdate(hostRef, true);
  if (BUILD.asyncLoading && ancestorComponent && ancestorComponent["s-rc"]) {
    ancestorComponent["s-rc"].push(schedule);
  } else {
    schedule();
  }
};
var fireConnectedCallback = (instance) => {
  if (BUILD.lazyLoad && BUILD.connectedCallback) {
    safeCall(instance, "connectedCallback");
  }
};
var connectedCallback = (elm) => {
  if ((plt.$flags$ & 1) === 0) {
    const hostRef = getHostRef(elm);
    const cmpMeta = hostRef.$cmpMeta$;
    const endConnected = createTime("connectedCallback", cmpMeta.$tagName$);
    if (BUILD.hostListenerTargetParent) {
      addHostEventListeners(elm, hostRef, cmpMeta.$listeners$, true);
    }
    if (!(hostRef.$flags$ & 1)) {
      hostRef.$flags$ |= 1;
      let hostId;
      if (BUILD.hydrateClientSide) {
        hostId = elm.getAttribute(HYDRATE_ID);
        if (hostId) {
          if (BUILD.shadowDom && supportsShadow && cmpMeta.$flags$ & 1) {
            const scopeId2 = BUILD.mode
              ? addStyle(elm.shadowRoot, cmpMeta, elm.getAttribute("s-mode"))
              : addStyle(elm.shadowRoot, cmpMeta);
            elm.classList.remove(scopeId2 + "-h", scopeId2 + "-s");
          }
          initializeClientHydrate(elm, cmpMeta.$tagName$, hostId, hostRef);
        }
      }
      if (BUILD.slotRelocation && !hostId) {
        if (
          BUILD.hydrateServerSide ||
          ((BUILD.slot || BUILD.shadowDom) && cmpMeta.$flags$ & (4 | 8))
        ) {
          setContentReference(elm);
        }
      }
      if (BUILD.asyncLoading) {
        let ancestorComponent = elm;
        while (
          (ancestorComponent =
            ancestorComponent.parentNode || ancestorComponent.host)
        ) {
          if (
            (BUILD.hydrateClientSide &&
              ancestorComponent.nodeType === 1 &&
              ancestorComponent.hasAttribute("s-id") &&
              ancestorComponent["s-p"]) ||
            ancestorComponent["s-p"]
          ) {
            attachToAncestor(
              hostRef,
              (hostRef.$ancestorComponent$ = ancestorComponent),
            );
            break;
          }
        }
      }
      if (BUILD.prop && !BUILD.hydrateServerSide && cmpMeta.$members$) {
        Object.entries(cmpMeta.$members$).map(([memberName, [memberFlags]]) => {
          if (memberFlags & 31 && elm.hasOwnProperty(memberName)) {
            const value = elm[memberName];
            delete elm[memberName];
            elm[memberName] = value;
          }
        });
      }
      if (BUILD.initializeNextTick) {
        nextTick(() => initializeComponent(elm, hostRef, cmpMeta));
      } else {
        initializeComponent(elm, hostRef, cmpMeta);
      }
    } else {
      addHostEventListeners(elm, hostRef, cmpMeta.$listeners$, false);
      if (hostRef == null ? void 0 : hostRef.$lazyInstance$) {
        fireConnectedCallback(hostRef.$lazyInstance$);
      } else if (hostRef == null ? void 0 : hostRef.$onReadyPromise$) {
        hostRef.$onReadyPromise$.then(() =>
          fireConnectedCallback(hostRef.$lazyInstance$),
        );
      }
    }
    endConnected();
  }
};
var setContentReference = (elm) => {
  const contentRefElm = (elm["s-cr"] = doc.createComment(
    BUILD.isDebug ? `content-ref (host=${elm.localName})` : "",
  ));
  contentRefElm["s-cn"] = true;
  elm.insertBefore(contentRefElm, elm.firstChild);
};
var disconnectInstance = (instance) => {
  if (BUILD.lazyLoad && BUILD.disconnectedCallback) {
    safeCall(instance, "disconnectedCallback");
  }
  if (BUILD.cmpDidUnload) {
    safeCall(instance, "componentDidUnload");
  }
};
var disconnectedCallback = async (elm) => {
  if ((plt.$flags$ & 1) === 0) {
    const hostRef = getHostRef(elm);
    if (BUILD.hostListener) {
      if (hostRef.$rmListeners$) {
        hostRef.$rmListeners$.map((rmListener) => rmListener());
        hostRef.$rmListeners$ = void 0;
      }
    }
    if (!BUILD.lazyLoad) {
      disconnectInstance(elm);
    } else if (hostRef == null ? void 0 : hostRef.$lazyInstance$) {
      disconnectInstance(hostRef.$lazyInstance$);
    } else if (hostRef == null ? void 0 : hostRef.$onReadyPromise$) {
      hostRef.$onReadyPromise$.then(() =>
        disconnectInstance(hostRef.$lazyInstance$),
      );
    }
  }
};
var import_mock_doc = require("../../mock-doc/index.cjs");
var patchPseudoShadowDom = (hostElementPrototype, descriptorPrototype) => {
  patchCloneNode(hostElementPrototype);
  patchSlotAppendChild(hostElementPrototype);
  patchSlotAppend(hostElementPrototype);
  patchSlotPrepend(hostElementPrototype);
  patchSlotInsertAdjacentElement(hostElementPrototype);
  patchSlotInsertAdjacentHTML(hostElementPrototype);
  patchSlotInsertAdjacentText(hostElementPrototype);
  patchTextContent(hostElementPrototype);
  patchChildSlotNodes(hostElementPrototype, descriptorPrototype);
  patchSlotRemoveChild(hostElementPrototype);
};
var patchCloneNode = (HostElementPrototype) => {
  const orgCloneNode = HostElementPrototype.cloneNode;
  HostElementPrototype.cloneNode = function (deep) {
    const srcNode = this;
    const isShadowDom = BUILD.shadowDom
      ? srcNode.shadowRoot && supportsShadow
      : false;
    const clonedNode = orgCloneNode.call(srcNode, isShadowDom ? deep : false);
    if (BUILD.slot && !isShadowDom && deep) {
      let i2 = 0;
      let slotted, nonStencilNode;
      const stencilPrivates = [
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
      for (; i2 < srcNode.childNodes.length; i2++) {
        slotted = srcNode.childNodes[i2]["s-nr"];
        nonStencilNode = stencilPrivates.every(
          (privateField) => !srcNode.childNodes[i2][privateField],
        );
        if (slotted) {
          if (BUILD.appendChildSlotFix && clonedNode.__appendChild) {
            clonedNode.__appendChild(slotted.cloneNode(true));
          } else {
            clonedNode.appendChild(slotted.cloneNode(true));
          }
        }
        if (nonStencilNode) {
          clonedNode.appendChild(srcNode.childNodes[i2].cloneNode(true));
        }
      }
    }
    return clonedNode;
  };
};
var patchSlotAppendChild = (HostElementPrototype) => {
  HostElementPrototype.__appendChild = HostElementPrototype.appendChild;
  HostElementPrototype.appendChild = function (newChild) {
    const slotName = (newChild["s-sn"] = getSlotName(newChild));
    const slotNode = getHostSlotNode(this.childNodes, slotName);
    if (slotNode) {
      const slotChildNodes = getHostSlotChildNodes(slotNode, slotName);
      const appendAfter = slotChildNodes[slotChildNodes.length - 1];
      const insertedNode = appendAfter.parentNode.insertBefore(
        newChild,
        appendAfter.nextSibling,
      );
      updateFallbackSlotVisibility(this);
      forceUpdate(this);
      return insertedNode;
    }
    return this.__appendChild(newChild);
  };
};
var patchSlotRemoveChild = (ElementPrototype) => {
  ElementPrototype.__removeChild = ElementPrototype.removeChild;
  ElementPrototype.removeChild = function (toRemove) {
    if (toRemove && typeof toRemove["s-sn"] !== "undefined") {
      const slotNode = getHostSlotNode(this.childNodes, toRemove["s-sn"]);
      if (slotNode) {
        const slotChildNodes = getHostSlotChildNodes(
          slotNode,
          toRemove["s-sn"],
        );
        const existingNode = slotChildNodes.find((n) => n === toRemove);
        if (existingNode) {
          existingNode.remove();
          updateFallbackSlotVisibility(this);
          return;
        }
      }
    }
    return this.__removeChild(toRemove);
  };
};
var patchSlotPrepend = (HostElementPrototype) => {
  const originalPrepend = HostElementPrototype.prepend;
  HostElementPrototype.prepend = function (...newChildren) {
    newChildren.forEach((newChild) => {
      if (typeof newChild === "string") {
        newChild = this.ownerDocument.createTextNode(newChild);
      }
      const slotName = (newChild["s-sn"] = getSlotName(newChild));
      const slotNode = getHostSlotNode(this.childNodes, slotName);
      if (slotNode) {
        const slotPlaceholder = document.createTextNode("");
        slotPlaceholder["s-nr"] = newChild;
        slotNode["s-cr"].parentNode.__appendChild(slotPlaceholder);
        newChild["s-ol"] = slotPlaceholder;
        const slotChildNodes = getHostSlotChildNodes(slotNode, slotName);
        const appendAfter = slotChildNodes[0];
        return appendAfter.parentNode.insertBefore(
          newChild,
          appendAfter.nextSibling,
        );
      }
      if (newChild.nodeType === 1 && !!newChild.getAttribute("slot")) {
        newChild.hidden = true;
      }
      return originalPrepend.call(this, newChild);
    });
  };
};
var patchSlotAppend = (HostElementPrototype) => {
  HostElementPrototype.append = function (...newChildren) {
    newChildren.forEach((newChild) => {
      if (typeof newChild === "string") {
        newChild = this.ownerDocument.createTextNode(newChild);
      }
      this.appendChild(newChild);
    });
  };
};
var patchSlotInsertAdjacentHTML = (HostElementPrototype) => {
  const originalInsertAdjacentHtml = HostElementPrototype.insertAdjacentHTML;
  HostElementPrototype.insertAdjacentHTML = function (position, text) {
    if (position !== "afterbegin" && position !== "beforeend") {
      return originalInsertAdjacentHtml.call(this, position, text);
    }
    const container = this.ownerDocument.createElement("_");
    let node;
    container.innerHTML = text;
    if (position === "afterbegin") {
      while ((node = container.firstChild)) {
        this.prepend(node);
      }
    } else if (position === "beforeend") {
      while ((node = container.firstChild)) {
        this.append(node);
      }
    }
  };
};
var patchSlotInsertAdjacentText = (HostElementPrototype) => {
  HostElementPrototype.insertAdjacentText = function (position, text) {
    this.insertAdjacentHTML(position, text);
  };
};
var patchSlotInsertAdjacentElement = (HostElementPrototype) => {
  const originalInsertAdjacentElement =
    HostElementPrototype.insertAdjacentElement;
  HostElementPrototype.insertAdjacentElement = function (position, element) {
    if (position !== "afterbegin" && position !== "beforeend") {
      return originalInsertAdjacentElement.call(this, position, element);
    }
    if (position === "afterbegin") {
      this.prepend(element);
      return element;
    } else if (position === "beforeend") {
      this.append(element);
      return element;
    }
    return element;
  };
};
var patchTextContent = (hostElementPrototype) => {
  const descriptor = Object.getOwnPropertyDescriptor(
    Node.prototype,
    "textContent",
  );
  Object.defineProperty(hostElementPrototype, "__textContent", descriptor);
  if (BUILD.experimentalScopedSlotChanges) {
    Object.defineProperty(hostElementPrototype, "textContent", {
      get() {
        const slotRefNodes = getAllChildSlotNodes(this.childNodes);
        const textContent = slotRefNodes
          .map((node) => {
            var _a, _b;
            const text = [];
            let slotContent = node.nextSibling;
            while (slotContent && slotContent["s-sn"] === node["s-sn"]) {
              if (
                slotContent.nodeType === import_mock_doc.NODE_TYPES.TEXT_NODE ||
                slotContent.nodeType === import_mock_doc.NODE_TYPES.ELEMENT_NODE
              ) {
                text.push(
                  (_b =
                    (_a = slotContent.textContent) == null
                      ? void 0
                      : _a.trim()) != null
                    ? _b
                    : "",
                );
              }
              slotContent = slotContent.nextSibling;
            }
            return text.filter((ref) => ref !== "").join(" ");
          })
          .filter((text) => text !== "")
          .join(" ");
        return " " + textContent + " ";
      },
      set(value) {
        const slotRefNodes = getAllChildSlotNodes(this.childNodes);
        slotRefNodes.forEach((node) => {
          let slotContent = node.nextSibling;
          while (slotContent && slotContent["s-sn"] === node["s-sn"]) {
            const tmp = slotContent;
            slotContent = slotContent.nextSibling;
            tmp.remove();
          }
          if (node["s-sn"] === "") {
            const textNode = this.ownerDocument.createTextNode(value);
            textNode["s-sn"] = "";
            node.parentElement.insertBefore(textNode, node.nextSibling);
          } else {
            node.remove();
          }
        });
      },
    });
  } else {
    Object.defineProperty(hostElementPrototype, "textContent", {
      get() {
        var _a;
        const slotNode = getHostSlotNode(this.childNodes, "");
        if (
          ((_a = slotNode == null ? void 0 : slotNode.nextSibling) == null
            ? void 0
            : _a.nodeType) === import_mock_doc.NODE_TYPES.TEXT_NODE
        ) {
          return slotNode.nextSibling.textContent;
        } else if (slotNode) {
          return slotNode.textContent;
        } else {
          return this.__textContent;
        }
      },
      set(value) {
        var _a;
        const slotNode = getHostSlotNode(this.childNodes, "");
        if (
          ((_a = slotNode == null ? void 0 : slotNode.nextSibling) == null
            ? void 0
            : _a.nodeType) === import_mock_doc.NODE_TYPES.TEXT_NODE
        ) {
          slotNode.nextSibling.textContent = value;
        } else if (slotNode) {
          slotNode.textContent = value;
        } else {
          this.__textContent = value;
          const contentRefElm = this["s-cr"];
          if (contentRefElm) {
            this.insertBefore(contentRefElm, this.firstChild);
          }
        }
      },
    });
  }
};
var patchChildSlotNodes = (elm, cmpMeta) => {
  class FakeNodeList extends Array {
    item(n) {
      return this[n];
    }
  }
  if (cmpMeta.$flags$ & 8) {
    const childNodesFn = elm.__lookupGetter__("childNodes");
    Object.defineProperty(elm, "children", {
      get() {
        return this.childNodes.map((n) => n.nodeType === 1);
      },
    });
    Object.defineProperty(elm, "childElementCount", {
      get() {
        return elm.children.length;
      },
    });
    Object.defineProperty(elm, "childNodes", {
      get() {
        const childNodes = childNodesFn.call(this);
        if ((plt.$flags$ & 1) === 0 && getHostRef(this).$flags$ & 2) {
          const result = new FakeNodeList();
          for (let i2 = 0; i2 < childNodes.length; i2++) {
            const slot = childNodes[i2]["s-nr"];
            if (slot) {
              result.push(slot);
            }
          }
          return result;
        }
        return FakeNodeList.from(childNodes);
      },
    });
  }
};
var getAllChildSlotNodes = (childNodes) => {
  const slotRefNodes = [];
  for (const childNode of Array.from(childNodes)) {
    if (childNode["s-sr"]) {
      slotRefNodes.push(childNode);
    }
    slotRefNodes.push(...getAllChildSlotNodes(childNode.childNodes));
  }
  return slotRefNodes;
};
var getSlotName = (node) =>
  node["s-sn"] || (node.nodeType === 1 && node.getAttribute("slot")) || "";
var getHostSlotNode = (childNodes, slotName) => {
  let i2 = 0;
  let childNode;
  for (; i2 < childNodes.length; i2++) {
    childNode = childNodes[i2];
    if (childNode["s-sr"] && childNode["s-sn"] === slotName) {
      return childNode;
    }
    childNode = getHostSlotNode(childNode.childNodes, slotName);
    if (childNode) {
      return childNode;
    }
  }
  return null;
};
var getHostSlotChildNodes = (n, slotName) => {
  const childNodes = [n];
  while ((n = n.nextSibling) && n["s-sn"] === slotName) {
    childNodes.push(n);
  }
  return childNodes;
};
var defineCustomElement = (Cstr, compactMeta) => {
  customElements.define(compactMeta[1], proxyCustomElement(Cstr, compactMeta));
};
var proxyCustomElement = (Cstr, compactMeta) => {
  const cmpMeta = { $flags$: compactMeta[0], $tagName$: compactMeta[1] };
  if (BUILD.member) {
    cmpMeta.$members$ = compactMeta[2];
  }
  if (BUILD.hostListener) {
    cmpMeta.$listeners$ = compactMeta[3];
  }
  if (BUILD.watchCallback) {
    cmpMeta.$watchers$ = Cstr.$watchers$;
  }
  if (BUILD.reflect) {
    cmpMeta.$attrsToReflect$ = [];
  }
  if (BUILD.shadowDom && !supportsShadow && cmpMeta.$flags$ & 1) {
    cmpMeta.$flags$ |= 8;
  }
  if (BUILD.experimentalSlotFixes) {
    if (BUILD.scoped && cmpMeta.$flags$ & 2) {
      patchPseudoShadowDom(Cstr.prototype, cmpMeta);
    }
  } else {
    if (BUILD.slotChildNodesFix) {
      patchChildSlotNodes(Cstr.prototype, cmpMeta);
    }
    if (BUILD.cloneNodeFix) {
      patchCloneNode(Cstr.prototype);
    }
    if (BUILD.appendChildSlotFix) {
      patchSlotAppendChild(Cstr.prototype);
    }
    if (BUILD.scopedSlotTextContentFix && cmpMeta.$flags$ & 2) {
      patchTextContent(Cstr.prototype);
    }
  }
  const originalConnectedCallback = Cstr.prototype.connectedCallback;
  const originalDisconnectedCallback = Cstr.prototype.disconnectedCallback;
  Object.assign(Cstr.prototype, {
    __registerHost() {
      registerHost(this, cmpMeta);
    },
    connectedCallback() {
      connectedCallback(this);
      if (BUILD.connectedCallback && originalConnectedCallback) {
        originalConnectedCallback.call(this);
      }
    },
    disconnectedCallback() {
      disconnectedCallback(this);
      if (BUILD.disconnectedCallback && originalDisconnectedCallback) {
        originalDisconnectedCallback.call(this);
      }
    },
    __attachShadow() {
      if (supportsShadow) {
        if (BUILD.shadowDelegatesFocus) {
          this.attachShadow({
            mode: "open",
            delegatesFocus: !!(cmpMeta.$flags$ & 16),
          });
        } else {
          this.attachShadow({ mode: "open" });
        }
      } else {
        this.shadowRoot = this;
      }
    },
  });
  Cstr.is = cmpMeta.$tagName$;
  return proxyComponent(Cstr, cmpMeta, 1 | 2);
};
var forceModeUpdate = (elm) => {
  if (BUILD.style && BUILD.mode && !BUILD.lazyLoad) {
    const mode = computeMode(elm);
    const hostRef = getHostRef(elm);
    if (hostRef.$modeName$ !== mode) {
      const cmpMeta = hostRef.$cmpMeta$;
      const oldScopeId = elm["s-sc"];
      const scopeId2 = getScopeId(cmpMeta, mode);
      const style = elm.constructor.style[mode];
      const flags = cmpMeta.$flags$;
      if (style) {
        if (!styles.has(scopeId2)) {
          registerStyle(scopeId2, style, !!(flags & 1));
        }
        hostRef.$modeName$ = mode;
        elm.classList.remove(oldScopeId + "-h", oldScopeId + "-s");
        attachStyles(hostRef);
        forceUpdate(elm);
      }
    }
  }
};
var hmrStart = (hostElement, cmpMeta, hmrVersionId) => {
  const hostRef = getHostRef(hostElement);
  hostRef.$flags$ = 1;
  initializeComponent(hostElement, hostRef, cmpMeta, hmrVersionId);
};
var bootstrapLazy = (lazyBundles, options = {}) => {
  var _a;
  if (BUILD.profile && performance.mark) {
    performance.mark("st:app:start");
  }
  installDevTools();
  const endBootstrap = createTime("bootstrapLazy");
  const cmpTags = [];
  const exclude = options.exclude || [];
  const customElements2 = win.customElements;
  const head = doc.head;
  const metaCharset = head.querySelector("meta[charset]");
  const dataStyles = doc.createElement("style");
  const deferredConnectedCallbacks = [];
  const styles2 = doc.querySelectorAll(`[${HYDRATED_STYLE_ID}]`);
  let appLoadFallback;
  let isBootstrapping = true;
  let i2 = 0;
  Object.assign(plt, options);
  plt.$resourcesUrl$ = new URL(options.resourcesUrl || "./", doc.baseURI).href;
  if (BUILD.asyncQueue) {
    if (options.syncQueue) {
      plt.$flags$ |= 4;
    }
  }
  if (BUILD.hydrateClientSide) {
    plt.$flags$ |= 2;
  }
  if (BUILD.hydrateClientSide && BUILD.shadowDom) {
    for (; i2 < styles2.length; i2++) {
      registerStyle(
        styles2[i2].getAttribute(HYDRATED_STYLE_ID),
        convertScopedToShadow(styles2[i2].innerHTML),
        true,
      );
    }
  }
  let hasSlotRelocation = false;
  lazyBundles.map((lazyBundle) => {
    lazyBundle[1].map((compactMeta) => {
      var _a2;
      const cmpMeta = {
        $flags$: compactMeta[0],
        $tagName$: compactMeta[1],
        $members$: compactMeta[2],
        $listeners$: compactMeta[3],
      };
      if (cmpMeta.$flags$ & 4) {
        hasSlotRelocation = true;
      }
      if (BUILD.member) {
        cmpMeta.$members$ = compactMeta[2];
      }
      if (BUILD.hostListener) {
        cmpMeta.$listeners$ = compactMeta[3];
      }
      if (BUILD.reflect) {
        cmpMeta.$attrsToReflect$ = [];
      }
      if (BUILD.watchCallback) {
        cmpMeta.$watchers$ = (_a2 = compactMeta[4]) != null ? _a2 : {};
      }
      if (BUILD.shadowDom && !supportsShadow && cmpMeta.$flags$ & 1) {
        cmpMeta.$flags$ |= 8;
      }
      const tagName =
        BUILD.transformTagName && options.transformTagName
          ? options.transformTagName(cmpMeta.$tagName$)
          : cmpMeta.$tagName$;
      const HostElement = class extends HTMLElement {
        constructor(self) {
          super(self);
          self = this;
          registerHost(self, cmpMeta);
          if (BUILD.shadowDom && cmpMeta.$flags$ & 1) {
            if (supportsShadow) {
              if (BUILD.shadowDelegatesFocus) {
                self.attachShadow({
                  mode: "open",
                  delegatesFocus: !!(cmpMeta.$flags$ & 16),
                });
              } else {
                self.attachShadow({ mode: "open" });
              }
            } else if (!BUILD.hydrateServerSide && !("shadowRoot" in self)) {
              self.shadowRoot = self;
            }
          }
        }
        connectedCallback() {
          if (appLoadFallback) {
            clearTimeout(appLoadFallback);
            appLoadFallback = null;
          }
          if (isBootstrapping) {
            deferredConnectedCallbacks.push(this);
          } else {
            plt.jmp(() => connectedCallback(this));
          }
        }
        disconnectedCallback() {
          plt.jmp(() => disconnectedCallback(this));
        }
        componentOnReady() {
          return getHostRef(this).$onReadyPromise$;
        }
      };
      if (BUILD.experimentalSlotFixes) {
        if (BUILD.scoped && cmpMeta.$flags$ & 2) {
          patchPseudoShadowDom(HostElement.prototype, cmpMeta);
        }
      } else {
        if (BUILD.slotChildNodesFix) {
          patchChildSlotNodes(HostElement.prototype, cmpMeta);
        }
        if (BUILD.cloneNodeFix) {
          patchCloneNode(HostElement.prototype);
        }
        if (BUILD.appendChildSlotFix) {
          patchSlotAppendChild(HostElement.prototype);
        }
        if (BUILD.scopedSlotTextContentFix && cmpMeta.$flags$ & 2) {
          patchTextContent(HostElement.prototype);
        }
      }
      if (BUILD.formAssociated && cmpMeta.$flags$ & 64) {
        HostElement.formAssociated = true;
      }
      if (BUILD.hotModuleReplacement) {
        HostElement.prototype["s-hmr"] = function (hmrVersionId) {
          hmrStart(this, cmpMeta, hmrVersionId);
        };
      }
      cmpMeta.$lazyBundleId$ = lazyBundle[0];
      if (!exclude.includes(tagName) && !customElements2.get(tagName)) {
        cmpTags.push(tagName);
        customElements2.define(
          tagName,
          proxyComponent(HostElement, cmpMeta, 1),
        );
      }
    });
  });
  if (cmpTags.length > 0) {
    if (hasSlotRelocation) {
      dataStyles.innerHTML += SLOT_FB_CSS;
    }
    if (
      BUILD.invisiblePrehydration &&
      (BUILD.hydratedClass || BUILD.hydratedAttribute)
    ) {
      dataStyles.innerHTML += cmpTags + HYDRATED_CSS;
    }
    if (dataStyles.innerHTML.length) {
      dataStyles.setAttribute("data-styles", "");
      const nonce =
        (_a = plt.$nonce$) != null ? _a : queryNonceMetaTagContent(doc);
      if (nonce != null) {
        dataStyles.setAttribute("nonce", nonce);
      }
      head.insertBefore(
        dataStyles,
        metaCharset ? metaCharset.nextSibling : head.firstChild,
      );
    }
  }
  isBootstrapping = false;
  if (deferredConnectedCallbacks.length) {
    deferredConnectedCallbacks.map((host) => host.connectedCallback());
  } else {
    if (BUILD.profile) {
      plt.jmp(() => (appLoadFallback = setTimeout(appDidLoad, 30, "timeout")));
    } else {
      plt.jmp(() => (appLoadFallback = setTimeout(appDidLoad, 30)));
    }
  }
  endBootstrap();
};
var Fragment = (_, children) => children;
var addHostEventListeners = (
  elm,
  hostRef,
  listeners,
  attachParentListeners,
) => {
  if (BUILD.hostListener && listeners) {
    if (BUILD.hostListenerTargetParent) {
      if (attachParentListeners) {
        listeners = listeners.filter(([flags]) => flags & 32);
      } else {
        listeners = listeners.filter(([flags]) => !(flags & 32));
      }
    }
    listeners.map(([flags, name, method]) => {
      const target = BUILD.hostListenerTarget
        ? getHostListenerTarget(elm, flags)
        : elm;
      const handler = hostListenerProxy(hostRef, method);
      const opts = hostListenerOpts(flags);
      plt.ael(target, name, handler, opts);
      (hostRef.$rmListeners$ = hostRef.$rmListeners$ || []).push(() =>
        plt.rel(target, name, handler, opts),
      );
    });
  }
};
var hostListenerProxy = (hostRef, methodName) => (ev) => {
  try {
    if (BUILD.lazyLoad) {
      if (hostRef.$flags$ & 256) {
        hostRef.$lazyInstance$[methodName](ev);
      } else {
        (hostRef.$queuedListeners$ = hostRef.$queuedListeners$ || []).push([
          methodName,
          ev,
        ]);
      }
    } else {
      hostRef.$hostElement$[methodName](ev);
    }
  } catch (e) {
    consoleError(e);
  }
};
var getHostListenerTarget = (elm, flags) => {
  if (BUILD.hostListenerTargetDocument && flags & 4) return doc;
  if (BUILD.hostListenerTargetWindow && flags & 8) return win;
  if (BUILD.hostListenerTargetBody && flags & 16) return doc.body;
  if (BUILD.hostListenerTargetParent && flags & 32) return elm.parentElement;
  return elm;
};
var hostListenerOpts = (flags) =>
  supportsListenerOptions
    ? { passive: (flags & 1) !== 0, capture: (flags & 2) !== 0 }
    : (flags & 2) !== 0;
var setNonce = (nonce) => (plt.$nonce$ = nonce);
var setPlatformOptions = (opts) => Object.assign(plt, opts);
var insertVdomAnnotations = (doc2, staticComponents) => {
  if (doc2 != null) {
    const docData = {
      hostIds: 0,
      rootLevelIds: 0,
      staticComponents: new Set(staticComponents),
    };
    const orgLocationNodes = [];
    parseVNodeAnnotations(doc2, doc2.body, docData, orgLocationNodes);
    orgLocationNodes.forEach((orgLocationNode) => {
      var _a, _b;
      if (orgLocationNode != null && orgLocationNode["s-nr"]) {
        const nodeRef = orgLocationNode["s-nr"];
        let hostId = nodeRef["s-host-id"];
        let nodeId = nodeRef["s-node-id"];
        let childId = `${hostId}.${nodeId}`;
        if (hostId == null) {
          hostId = 0;
          docData.rootLevelIds++;
          nodeId = docData.rootLevelIds;
          childId = `${hostId}.${nodeId}`;
          if (nodeRef.nodeType === 1) {
            nodeRef.setAttribute(HYDRATE_CHILD_ID, childId);
          } else if (nodeRef.nodeType === 3) {
            if (hostId === 0) {
              const textContent =
                (_a = nodeRef.nodeValue) == null ? void 0 : _a.trim();
              if (textContent === "") {
                orgLocationNode.remove();
                return;
              }
            }
            const commentBeforeTextNode = doc2.createComment(childId);
            commentBeforeTextNode.nodeValue = `${TEXT_NODE_ID}.${childId}`;
            (_b = nodeRef.parentNode) == null
              ? void 0
              : _b.insertBefore(commentBeforeTextNode, nodeRef);
          }
        }
        let orgLocationNodeId = `${ORG_LOCATION_ID}.${childId}`;
        const orgLocationParentNode = orgLocationNode.parentElement;
        if (orgLocationParentNode) {
          if (orgLocationParentNode["s-en"] === "") {
            orgLocationNodeId += `.`;
          } else if (orgLocationParentNode["s-en"] === "c") {
            orgLocationNodeId += `.c`;
          }
        }
        orgLocationNode.nodeValue = orgLocationNodeId;
      }
    });
  }
};
var parseVNodeAnnotations = (doc2, node, docData, orgLocationNodes) => {
  if (node == null) {
    return;
  }
  if (node["s-nr"] != null) {
    orgLocationNodes.push(node);
  }
  if (node.nodeType === 1) {
    node.childNodes.forEach((childNode) => {
      const hostRef = getHostRef(childNode);
      if (
        hostRef != null &&
        !docData.staticComponents.has(childNode.nodeName.toLowerCase())
      ) {
        const cmpData = { nodeIds: 0 };
        insertVNodeAnnotations(
          doc2,
          childNode,
          hostRef.$vnode$,
          docData,
          cmpData,
        );
      }
      parseVNodeAnnotations(doc2, childNode, docData, orgLocationNodes);
    });
  }
};
var insertVNodeAnnotations = (doc2, hostElm, vnode, docData, cmpData) => {
  if (vnode != null) {
    const hostId = ++docData.hostIds;
    hostElm.setAttribute(HYDRATE_ID, hostId);
    if (hostElm["s-cr"] != null) {
      hostElm["s-cr"].nodeValue = `${CONTENT_REF_ID}.${hostId}`;
    }
    if (vnode.$children$ != null) {
      const depth = 0;
      vnode.$children$.forEach((vnodeChild, index) => {
        insertChildVNodeAnnotations(
          doc2,
          vnodeChild,
          cmpData,
          hostId,
          depth,
          index,
        );
      });
    }
    if (
      hostElm &&
      vnode &&
      vnode.$elm$ &&
      !hostElm.hasAttribute(HYDRATE_CHILD_ID)
    ) {
      const parent = hostElm.parentElement;
      if (parent && parent.childNodes) {
        const parentChildNodes = Array.from(parent.childNodes);
        const comment = parentChildNodes.find(
          (node) => node.nodeType === 8 && node["s-sr"],
        );
        if (comment) {
          const index = parentChildNodes.indexOf(hostElm) - 1;
          vnode.$elm$.setAttribute(
            HYDRATE_CHILD_ID,
            `${comment["s-host-id"]}.${comment["s-node-id"]}.0.${index}`,
          );
        }
      }
    }
  }
};
var insertChildVNodeAnnotations = (
  doc2,
  vnodeChild,
  cmpData,
  hostId,
  depth,
  index,
) => {
  const childElm = vnodeChild.$elm$;
  if (childElm == null) {
    return;
  }
  const nodeId = cmpData.nodeIds++;
  const childId = `${hostId}.${nodeId}.${depth}.${index}`;
  childElm["s-host-id"] = hostId;
  childElm["s-node-id"] = nodeId;
  if (childElm.nodeType === 1) {
    childElm.setAttribute(HYDRATE_CHILD_ID, childId);
  } else if (childElm.nodeType === 3) {
    const parentNode = childElm.parentNode;
    const nodeName = parentNode == null ? void 0 : parentNode.nodeName;
    if (nodeName !== "STYLE" && nodeName !== "SCRIPT") {
      const textNodeId = `${TEXT_NODE_ID}.${childId}`;
      const commentBeforeTextNode = doc2.createComment(textNodeId);
      parentNode == null
        ? void 0
        : parentNode.insertBefore(commentBeforeTextNode, childElm);
    }
  } else if (childElm.nodeType === 8) {
    if (childElm["s-sr"]) {
      const slotName = childElm["s-sn"] || "";
      const slotNodeId = `${SLOT_NODE_ID}.${childId}.${slotName}`;
      childElm.nodeValue = slotNodeId;
    }
  }
  if (vnodeChild.$children$ != null) {
    const childDepth = depth + 1;
    vnodeChild.$children$.forEach((vnode, index2) => {
      insertChildVNodeAnnotations(
        doc2,
        vnode,
        cmpData,
        hostId,
        childDepth,
        index2,
      );
    });
  }
};
var getHostRef = (elm) => hostRefs.get(elm);
var registerInstance = (lazyInstance, hostRef) => {
  if (lazyInstance == null || lazyInstance.constructor == null) {
    throw new Error(`Invalid component constructor`);
  }
  if (hostRef == null) {
    const Cstr = lazyInstance.constructor;
    const tagName =
      Cstr.COMPILER_META && Cstr.COMPILER_META.tagName
        ? Cstr.COMPILER_META.tagName
        : "div";
    const elm = document.createElement(tagName);
    registerHost(elm, { $flags$: 0, $tagName$: tagName });
    hostRef = getHostRef(elm);
  }
  hostRef.$lazyInstance$ = lazyInstance;
  return hostRefs.set(lazyInstance, hostRef);
};
var registerHost = (elm, cmpMeta) => {
  const hostRef = {
    $flags$: 0,
    $hostElement$: elm,
    $cmpMeta$: cmpMeta,
    $instanceValues$: new Map(),
    $renderCount$: 0,
  };
  hostRef.$onInstancePromise$ = new Promise(
    (r) => (hostRef.$onInstanceResolve$ = r),
  );
  hostRef.$onReadyPromise$ = new Promise((r) => (hostRef.$onReadyResolve$ = r));
  elm["s-p"] = [];
  elm["s-rc"] = [];
  addHostEventListeners(elm, hostRef, cmpMeta.$listeners$, false);
  hostRefs.set(elm, hostRef);
};
var customError;
var defaultConsoleError = (e) => {
  caughtErrors.push(e);
};
var consoleError = (e, el) => (customError || defaultConsoleError)(e, el);
var consoleDevError = (...e) => {
  caughtErrors.push(new Error(e.join(", ")));
};
var consoleDevWarn = (...args) => {
  const params = args.filter(
    (a) =>
      typeof a === "string" || typeof a === "number" || typeof a === "boolean",
  );
  console.warn(...params);
};
var consoleDevInfo = (..._) => {};
var setErrorHandler = (handler) => (customError = handler);
function resetTaskQueue() {
  queuedTicks.length = 0;
  queuedWriteTasks.length = 0;
  queuedReadTasks.length = 0;
  moduleLoaded.clear();
  queuedLoadModules.length = 0;
  caughtErrors.length = 0;
}
var nextTick = (cb) => {
  queuedTicks.push(cb);
};
function flushTicks() {
  return new Promise((resolve, reject) => {
    function drain() {
      try {
        if (queuedTicks.length > 0) {
          const writeTasks = queuedTicks.slice();
          queuedTicks.length = 0;
          let cb;
          while ((cb = writeTasks.shift())) {
            cb(Date.now());
          }
        }
        if (queuedTicks.length > 0) {
          process.nextTick(drain);
        } else {
          resolve();
        }
      } catch (e) {
        reject(`flushTicks: ${e}`);
      }
    }
    process.nextTick(drain);
  });
}
function writeTask(cb) {
  queuedWriteTasks.push(cb);
}
function readTask(cb) {
  queuedReadTasks.push(cb);
}
function flushQueue() {
  return new Promise((resolve, reject) => {
    async function drain() {
      try {
        if (queuedReadTasks.length > 0) {
          const readTasks = queuedReadTasks.slice();
          queuedReadTasks.length = 0;
          let cb;
          while ((cb = readTasks.shift())) {
            const result = cb(Date.now());
            if (result != null && typeof result.then === "function") {
              await result;
            }
          }
        }
        if (queuedWriteTasks.length > 0) {
          const writeTasks = queuedWriteTasks.slice();
          queuedWriteTasks.length = 0;
          let cb;
          while ((cb = writeTasks.shift())) {
            const result = cb(Date.now());
            if (result != null && typeof result.then === "function") {
              await result;
            }
          }
        }
        if (queuedReadTasks.length + queuedWriteTasks.length > 0) {
          process.nextTick(drain);
        } else {
          resolve();
        }
      } catch (e) {
        reject(`flushQueue: ${e}`);
      }
    }
    process.nextTick(drain);
  });
}
async function flushAll() {
  while (
    queuedTicks.length +
      queuedLoadModules.length +
      queuedWriteTasks.length +
      queuedReadTasks.length >
    0
  ) {
    await flushTicks();
    await flushLoadModule();
    await flushQueue();
  }
  if (caughtErrors.length > 0) {
    const err2 = caughtErrors[0];
    if (err2 == null) {
      throw new Error("Error!");
    }
    if (typeof err2 === "string") {
      throw new Error(err2);
    }
    throw err2;
  }
  return new Promise((resolve) => process.nextTick(resolve));
}
function loadModule(cmpMeta, _hostRef, _hmrVersionId) {
  return new Promise((resolve) => {
    queuedLoadModules.push({
      bundleId: cmpMeta.$lazyBundleId$,
      resolve: () => resolve(moduleLoaded.get(cmpMeta.$lazyBundleId$)),
    });
  });
}
function flushLoadModule(bundleId) {
  return new Promise((resolve, reject) => {
    try {
      process.nextTick(() => {
        if (bundleId != null) {
          for (let i2 = 0; i2 < queuedLoadModules.length; i2++) {
            if (queuedLoadModules[i2].bundleId === bundleId) {
              queuedLoadModules[i2].resolve();
              queuedLoadModules.splice(i2, 1);
              i2--;
            }
          }
        } else {
          let queuedLoadModule;
          while ((queuedLoadModule = queuedLoadModules.shift())) {
            queuedLoadModule.resolve();
          }
        }
        resolve();
      });
    } catch (e) {
      reject(`flushLoadModule: ${e}`);
    }
  });
}
var import_mock_doc2 = require("../../mock-doc/index.cjs");
var win = (0, import_mock_doc2.setupGlobal)(global);
var doc = win.document;
var supportsShadow = true;
var plt = {
  $flags$: 0,
  $resourcesUrl$: "",
  jmp: (h2) => h2(),
  raf: (h2) => requestAnimationFrame(h2),
  ael: (el, eventName, listener, opts) =>
    el.addEventListener(eventName, listener, opts),
  rel: (el, eventName, listener, opts) =>
    el.removeEventListener(eventName, listener, opts),
  ce: (eventName, opts) => new win.CustomEvent(eventName, opts),
};
var setPlatformHelpers = (helpers) => {
  Object.assign(plt, helpers);
};
var supportsListenerOptions = true;
var supportsConstructableStylesheets = false;
var setSupportsShadowDom = (supports) => {
  supportsShadow = supports;
};
function resetPlatform(defaults = {}) {
  if (win && typeof win.close === "function") {
    win.close();
  }
  hostRefs.clear();
  styles.clear();
  plt.$flags$ = 0;
  Object.assign(plt, defaults);
  if (plt.$orgLocNodes$ != null) {
    plt.$orgLocNodes$.clear();
    plt.$orgLocNodes$ = void 0;
  }
  win.location.href = plt.$resourcesUrl$ = `http://testing.stenciljs.com/`;
  resetTaskQueue();
  stopAutoApplyChanges();
  cstrs.clear();
}
var isAutoApplyingChanges = false;
var autoApplyTimer = void 0;
function stopAutoApplyChanges() {
  isAutoApplyingChanges = false;
  if (autoApplyTimer) {
    clearTimeout(autoApplyTimer);
    autoApplyTimer = void 0;
  }
}
async function startAutoApplyChanges() {
  isAutoApplyingChanges = true;
  flushAll().then(() => {
    if (isAutoApplyingChanges) {
      autoApplyTimer = setTimeout(() => {
        startAutoApplyChanges();
      }, 100);
    }
  });
}
var registerComponents = (Cstrs) => {
  Cstrs.forEach((Cstr) => {
    cstrs.set(Cstr.COMPILER_META.tagName, Cstr);
  });
};
function registerModule(bundleId, Cstr) {
  moduleLoaded.set(bundleId, Cstr);
}
var isMemberInElement = (elm, memberName) => {
  if (elm != null) {
    if (memberName in elm) {
      return true;
    }
    const nodeName = elm.nodeName;
    if (nodeName) {
      const cstr = cstrs.get(nodeName.toLowerCase());
      if (
        cstr != null &&
        cstr.COMPILER_META != null &&
        cstr.COMPILER_META.properties != null
      ) {
        return cstr.COMPILER_META.properties.some((p) => p.name === memberName);
      }
    }
  }
  return false;
};
0 &&
  (module.exports = {
    Build: Build,
    Env: Env,
    Fragment: Fragment,
    Host: Host,
    addHostEventListeners: addHostEventListeners,
    bootstrapLazy: bootstrapLazy,
    connectedCallback: connectedCallback,
    consoleDevError: consoleDevError,
    consoleDevInfo: consoleDevInfo,
    consoleDevWarn: consoleDevWarn,
    consoleError: consoleError,
    createEvent: createEvent,
    defineCustomElement: defineCustomElement,
    disconnectedCallback: disconnectedCallback,
    doc: doc,
    flushAll: flushAll,
    flushLoadModule: flushLoadModule,
    flushQueue: flushQueue,
    forceModeUpdate: forceModeUpdate,
    forceUpdate: forceUpdate,
    getAssetPath: getAssetPath,
    getElement: getElement,
    getHostRef: getHostRef,
    getMode: getMode,
    getRenderingRef: getRenderingRef,
    getValue: getValue,
    h: h,
    insertVdomAnnotations: insertVdomAnnotations,
    isMemberInElement: isMemberInElement,
    loadModule: loadModule,
    modeResolutionChain: modeResolutionChain,
    nextTick: nextTick,
    parsePropertyValue: parsePropertyValue,
    plt: plt,
    postUpdateComponent: postUpdateComponent,
    proxyComponent: proxyComponent,
    proxyCustomElement: proxyCustomElement,
    readTask: readTask,
    registerComponents: registerComponents,
    registerHost: registerHost,
    registerInstance: registerInstance,
    registerModule: registerModule,
    renderVdom: renderVdom,
    resetPlatform: resetPlatform,
    setAssetPath: setAssetPath,
    setErrorHandler: setErrorHandler,
    setMode: setMode,
    setNonce: setNonce,
    setPlatformHelpers: setPlatformHelpers,
    setPlatformOptions: setPlatformOptions,
    setSupportsShadowDom: setSupportsShadowDom,
    setValue: setValue,
    startAutoApplyChanges: startAutoApplyChanges,
    stopAutoApplyChanges: stopAutoApplyChanges,
    styles: styles,
    supportsConstructableStylesheets: supportsConstructableStylesheets,
    supportsListenerOptions: supportsListenerOptions,
    supportsShadow: supportsShadow,
    win: win,
    writeTask: writeTask,
  });
