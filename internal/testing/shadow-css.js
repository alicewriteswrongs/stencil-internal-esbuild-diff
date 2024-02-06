"use strict";
const escapeRegExpSpecialCharacters = (text) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const safeSelector = (selector) => {
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
const restoreSafeSelector = (placeholders, content) =>
  content.replace(/__ph-(\d+)__/g, (_, index) => placeholders[+index]);
const _polyfillHost = "-shadowcsshost";
const _polyfillSlotted = "-shadowcssslotted";
const _polyfillHostContext = "-shadowcsscontext";
const _parenSuffix =
  ")(?:\\((" + "(?:\\([^)(]*\\)|[^)(]*)+?" + ")\\))?([^,{]*)";
const _cssColonHostRe = new RegExp("(" + _polyfillHost + _parenSuffix, "gim");
const _cssColonHostContextRe = new RegExp(
  "(" + _polyfillHostContext + _parenSuffix,
  "gim",
);
const _cssColonSlottedRe = new RegExp(
  "(" + _polyfillSlotted + _parenSuffix,
  "gim",
);
const _polyfillHostNoCombinator = _polyfillHost + "-no-combinator";
const _polyfillHostNoCombinatorRe = /-shadowcsshost-no-combinator([^\s]*)/;
const _shadowDOMSelectorsRe = [/::shadow/g, /::content/g];
const _selectorReSuffix = "([>\\s~+[.,{:][\\s\\S]*)?$";
const _polyfillHostRe = /-shadowcsshost/gim;
const createSupportsRuleRe = (selector) =>
  new RegExp(`((?<!(^@supports(.*)))|(?<={.*))(${selector}\\b)`, "gim");
const _colonSlottedRe = createSupportsRuleRe("::slotted");
const _colonHostRe = createSupportsRuleRe(":host");
const _colonHostContextRe = createSupportsRuleRe(":host-context");
const _commentRe = /\/\*\s*[\s\S]*?\*\//g;
const stripComments = (input) => input.replace(_commentRe, "");
const _commentWithHashRe = /\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g;
const extractCommentsWithHash = (input) =>
  input.match(_commentWithHashRe) || [];
const _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g;
const _curlyRe = /([{}])/g;
const _selectorPartsRe = /(^.*?[^\\])??((:+)(.*)|$)/;
const OPEN_CURLY = "{";
const CLOSE_CURLY = "}";
const BLOCK_PLACEHOLDER = "%BLOCK%";
const processRules = (input, ruleCallback) => {
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
const escapeBlocks = (input) => {
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
const insertPolyfillHostInCssText = (cssText) => {
  cssText = cssText
    .replace(_colonHostContextRe, `$1${_polyfillHostContext}`)
    .replace(_colonHostRe, `$1${_polyfillHost}`)
    .replace(_colonSlottedRe, `$1${_polyfillSlotted}`);
  return cssText;
};
const convertColonRule = (cssText, regExp, partReplacer) =>
  cssText.replace(regExp, (...m) => {
    if (m[2]) {
      const parts = m[2].split(",");
      const r = [];
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i].trim();
        if (!p) break;
        r.push(partReplacer(_polyfillHostNoCombinator, p, m[3]));
      }
      return r.join(",");
    } else {
      return _polyfillHostNoCombinator + m[3];
    }
  });
const colonHostPartReplacer = (host, part, suffix) =>
  host + part.replace(_polyfillHost, "") + suffix;
const convertColonHost = (cssText) =>
  convertColonRule(cssText, _cssColonHostRe, colonHostPartReplacer);
const colonHostContextPartReplacer = (host, part, suffix) => {
  if (part.indexOf(_polyfillHost) > -1) {
    return colonHostPartReplacer(host, part, suffix);
  } else {
    return host + part + suffix + ", " + part + " " + host + suffix;
  }
};
const convertColonSlotted = (cssText, slotScopeId) => {
  const slotClass = "." + slotScopeId + " > ";
  const selectors = [];
  cssText = cssText.replace(_cssColonSlottedRe, (...m) => {
    if (m[2]) {
      const compound = m[2].trim();
      const suffix = m[3];
      const slottedSelector = slotClass + compound + suffix;
      let prefixSelector = "";
      for (let i = m[4] - 1; i >= 0; i--) {
        const char = m[5][i];
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
const convertColonHostContext = (cssText) =>
  convertColonRule(
    cssText,
    _cssColonHostContextRe,
    colonHostContextPartReplacer,
  );
const convertShadowDOMSelectors = (cssText) =>
  _shadowDOMSelectorsRe.reduce(
    (result, pattern) => result.replace(pattern, " "),
    cssText,
  );
const makeScopeMatcher = (scopeSelector) => {
  const lre = /\[/g;
  const rre = /\]/g;
  scopeSelector = scopeSelector.replace(lre, "\\[").replace(rre, "\\]");
  return new RegExp("^(" + scopeSelector + ")" + _selectorReSuffix, "m");
};
const selectorNeedsScoping = (selector, scopeSelector) => {
  const re = makeScopeMatcher(scopeSelector);
  return !re.test(selector);
};
const injectScopingSelector = (selector, scopingSelector) =>
  selector.replace(
    _selectorPartsRe,
    (_, before = "", _colonGroup, colon = "", after = "") =>
      before + scopingSelector + colon + after,
  );
const applySimpleSelectorScope = (selector, scopeSelector, hostSelector) => {
  _polyfillHostRe.lastIndex = 0;
  if (_polyfillHostRe.test(selector)) {
    const replaceBy = `.${hostSelector}`;
    return selector
      .replace(_polyfillHostNoCombinatorRe, (_, selector) =>
        injectScopingSelector(selector, replaceBy),
      )
      .replace(_polyfillHostRe, replaceBy + " ");
  }
  return scopeSelector + " " + selector;
};
const applyStrictSelectorScope = (selector, scopeSelector, hostSelector) => {
  const isRe = /\[is=([^\]]*)\]/g;
  scopeSelector = scopeSelector.replace(isRe, (_, ...parts) => parts[0]);
  const className = "." + scopeSelector;
  const _scopeSelectorPart = (p) => {
    let scopedP = p.trim();
    if (!scopedP) {
      return "";
    }
    if (p.indexOf(_polyfillHostNoCombinator) > -1) {
      scopedP = applySimpleSelectorScope(p, scopeSelector, hostSelector);
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
    const part = selector.slice(startIndex, res.index).trim();
    shouldScope = shouldScope || part.indexOf(_polyfillHostNoCombinator) > -1;
    const scopedPart = shouldScope ? _scopeSelectorPart(part) : part;
    scopedSelector += `${scopedPart} ${separator} `;
    startIndex = sep.lastIndex;
  }
  const part = selector.substring(startIndex);
  shouldScope = shouldScope || part.indexOf(_polyfillHostNoCombinator) > -1;
  scopedSelector += shouldScope ? _scopeSelectorPart(part) : part;
  return restoreSafeSelector(safeContent.placeholders, scopedSelector);
};
const scopeSelector = (
  selector,
  scopeSelectorText,
  hostSelector,
  slotSelector,
) =>
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
const scopeSelectors = (
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
      );
    }
    const cssRule = {
      selector: selector.replace(/\s{2,}/g, " ").trim(),
      content: content,
    };
    return cssRule;
  });
const scopeCssText = (
  cssText,
  scopeId,
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
  if (scopeId) {
    cssText = scopeSelectors(cssText, scopeId, hostScopeId, slotScopeId);
  }
  cssText = replaceShadowCssHost(cssText, hostScopeId);
  cssText = cssText.replace(/>\s*\*\s+([^{, ]+)/gm, " $1 ");
  return {
    cssText: cssText.trim(),
    slottedSelectors: slotted.selectors.map((ref) => ({
      orgSelector: replaceShadowCssHost(ref.orgSelector, hostScopeId),
      updatedSelector: replaceShadowCssHost(ref.updatedSelector, hostScopeId),
    })),
  };
};
const replaceShadowCssHost = (cssText, hostScopeId) =>
  cssText.replace(/-shadowcsshost-no-combinator/g, `.${hostScopeId}`);
const scopeCss = (cssText, scopeId, commentOriginalSelector) => {
  const hostScopeId = scopeId + "-h";
  const slotScopeId = scopeId + "-s";
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
  const scoped = scopeCssText(cssText, scopeId, hostScopeId, slotScopeId);
  cssText = [scoped.cssText, ...commentsWithHash].join("\n");
  if (commentOriginalSelector) {
    orgSelectors.forEach(({ placeholder: placeholder, comment: comment }) => {
      cssText = cssText.replace(placeholder, comment);
    });
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
exports.scopeCss = scopeCss;