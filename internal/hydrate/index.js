var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var getAssetPath = (path) => {
  const assetUrl = new URL(path, plt.$resourcesUrl$);
  return assetUrl.origin !== win.location.origin
    ? assetUrl.href
    : assetUrl.pathname;
};
var setAssetPath = (path) => (plt.$resourcesUrl$ = path);
import { BUILD as BUILD18 } from "@stencil/core/internal/app-data";
var EMPTY_OBJ = {};
var SVG_NS = "http://www.w3.org/2000/svg";
var HTML_NS = "http://www.w3.org/1999/xhtml";
var isDef = (v) => v != null;
var isComplexType = (o) => {
  o = typeof o;
  return o === "object" || o === "function";
};
var isPromise = (v) =>
  !!v &&
  (typeof v === "object" || typeof v === "function") &&
  typeof v.then === "function";
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
import { BUILD as BUILD15 } from "@stencil/core/internal/app-data";
import { BUILD as BUILD3 } from "@stencil/core/internal/app-data";
import { BUILD } from "@stencil/core/internal/app-data";
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
import { BUILD as BUILD2 } from "@stencil/core/internal/app-data";
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
          BUILD2.isDev &&
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
    if (BUILD2.isDev && nodeName === "input") {
      validateInputProperties(vnodeData);
    }
    if (BUILD2.vdomKey && vnodeData.key) {
      key = vnodeData.key;
    }
    if (BUILD2.slotRelocation && vnodeData.name) {
      slotName = vnodeData.name;
    }
    if (BUILD2.vdomClass) {
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
  if (BUILD2.isDev && vNodeChildren.some(isHost)) {
    consoleDevError(
      `The <Host> must be the single root component. Make sure:\n- You are NOT using hostData() and <Host> in the same component.\n- <Host> is used once, and it's the single root component of the render() function.`,
    );
  }
  if (BUILD2.vdomFunctional && typeof nodeName === "function") {
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
  if (BUILD2.vdomKey) {
    vnode.$key$ = key;
  }
  if (BUILD2.slotRelocation) {
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
  if (BUILD2.vdomAttribute) {
    vnode.$attrs$ = null;
  }
  if (BUILD2.vdomKey) {
    vnode.$key$ = null;
  }
  if (BUILD2.slotRelocation) {
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
  const shadowRootNodes = BUILD3.shadowDom && shadowRoot ? [] : null;
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
  if (BUILD3.shadowDom && shadowRoot) {
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
          if (BUILD3.shadowDom && shadowRootNodes) {
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
          if (BUILD3.shadowDom && shadowRootNodes) {
            node.remove();
          } else if (BUILD3.slotRelocation) {
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
import { BUILD as BUILD14 } from "@stencil/core/internal/app-data";
var computeMode = (elm) =>
  modeResolutionChain.map((h2) => h2(elm)).find((m) => !!m);
var setMode = (handler) => modeResolutionChain.push(handler);
var getMode = (ref) => getHostRef(ref).$modeName$;
import { BUILD as BUILD13 } from "@stencil/core/internal/app-data";
import { BUILD as BUILD12 } from "@stencil/core/internal/app-data";
import { BUILD as BUILD4 } from "@stencil/core/internal/app-data";
var parsePropertyValue = (propValue, propType) => {
  if (propValue != null && !isComplexType(propValue)) {
    if (BUILD4.propBoolean && propType & 4) {
      return propValue === "false" ? false : propValue === "" || !!propValue;
    }
    if (BUILD4.propNumber && propType & 2) {
      return parseFloat(propValue);
    }
    if (BUILD4.propString && propType & 1) {
      return String(propValue);
    }
    return propValue;
  }
  return propValue;
};
import { BUILD as BUILD11, NAMESPACE } from "@stencil/core/internal/app-data";
import { BUILD as BUILD6 } from "@stencil/core/internal/app-data";
import { BUILD as BUILD5 } from "@stencil/core/internal/app-data";
var getElement = (ref) =>
  BUILD5.lazyLoad ? getHostRef(ref).$hostElement$ : ref;
var createEvent = (ref, name, flags) => {
  const elm = getElement(ref);
  return {
    emit: (detail) => {
      if (BUILD6.isDev && !elm.isConnected) {
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
import { BUILD as BUILD7 } from "@stencil/core/internal/app-data";
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
  if (!BUILD7.attachStyles) {
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
          BUILD7.hydrateClientSide &&
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
          if (BUILD7.hydrateServerSide || BUILD7.hotModuleReplacement) {
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
      BUILD7.constructableCSS &&
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
    BUILD7.shadowDom && supportsShadow && elm.shadowRoot
      ? elm.shadowRoot
      : elm.getRootNode(),
    cmpMeta,
    hostRef.$modeName$,
  );
  if (
    (BUILD7.shadowDom || BUILD7.scoped) &&
    BUILD7.cssAnnotations &&
    flags & 10
  ) {
    elm["s-sc"] = scopeId2;
    elm.classList.add(scopeId2 + "-h");
    if (BUILD7.scoped && flags & 2) {
      elm.classList.add(scopeId2 + "-s");
    }
  }
  endAttachStyles();
};
var getScopeId = (cmp, mode) =>
  "sc-" +
  (BUILD7.mode && mode && cmp.$flags$ & 32
    ? cmp.$tagName$ + "-" + mode
    : cmp.$tagName$);
var convertScopedToShadow = (css) =>
  css.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g, "$1{");
import { BUILD as BUILD10 } from "@stencil/core/internal/app-data";
import { BUILD as BUILD9 } from "@stencil/core/internal/app-data";
import { BUILD as BUILD8 } from "@stencil/core/internal/app-data";
var setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
  if (oldValue !== newValue) {
    let isProp = isMemberInElement(elm, memberName);
    let ln = memberName.toLowerCase();
    if (BUILD8.vdomClass && memberName === "class") {
      const classList = elm.classList;
      const oldClasses = parseClassList(oldValue);
      const newClasses = parseClassList(newValue);
      classList.remove(
        ...oldClasses.filter((c) => c && !newClasses.includes(c)),
      );
      classList.add(...newClasses.filter((c) => c && !oldClasses.includes(c)));
    } else if (BUILD8.vdomStyle && memberName === "style") {
      if (BUILD8.updatable) {
        for (const prop in oldValue) {
          if (!newValue || newValue[prop] == null) {
            if (!BUILD8.hydrateServerSide && prop.includes("-")) {
              elm.style.removeProperty(prop);
            } else {
              elm.style[prop] = "";
            }
          }
        }
      }
      for (const prop in newValue) {
        if (!oldValue || newValue[prop] !== oldValue[prop]) {
          if (!BUILD8.hydrateServerSide && prop.includes("-")) {
            elm.style.setProperty(prop, newValue[prop]);
          } else {
            elm.style[prop] = newValue[prop];
          }
        }
      }
    } else if (BUILD8.vdomKey && memberName === "key") {
    } else if (BUILD8.vdomRef && memberName === "ref") {
      if (newValue) {
        newValue(elm);
      }
    } else if (
      BUILD8.vdomListener &&
      (BUILD8.lazyLoad ? !isProp : !elm.__lookupSetter__(memberName)) &&
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
    } else if (BUILD8.vdomPropOrAttr) {
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
      if (BUILD8.vdomXlink) {
        if (ln !== (ln = ln.replace(/^xlink\:?/, ""))) {
          memberName = ln;
          xlink = true;
        }
      }
      if (newValue == null || newValue === false) {
        if (newValue !== false || elm.getAttribute(memberName) === "") {
          if (BUILD8.vdomXlink && xlink) {
            elm.removeAttributeNS(XLINK_NS, memberName);
          } else {
            elm.removeAttribute(memberName);
          }
        }
      } else if ((!isProp || flags & 4 || isSvg) && !isComplex) {
        newValue = newValue === true ? "" : newValue;
        if (BUILD8.vdomXlink && xlink) {
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
  if (BUILD9.updatable) {
    for (memberName of sortedAttrNames(Object.keys(oldVnodeAttrs))) {
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
  for (memberName of sortedAttrNames(Object.keys(newVnodeAttrs))) {
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
function sortedAttrNames(attrNames) {
  return attrNames.includes("ref")
    ? [...attrNames.filter((attr) => attr !== "ref"), "ref"]
    : attrNames;
}
var scopeId;
var contentRef;
var hostTagName;
var useNativeShadowDom = false;
var checkSlotFallbackVisibility = false;
var checkSlotRelocate = false;
var isSvgMode = false;
var createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
  var _a;
  const newVNode2 = newParentVNode.$children$[childIndex];
  let i2 = 0;
  let elm;
  let childNode;
  let oldVNode;
  if (BUILD10.slotRelocation && !useNativeShadowDom) {
    checkSlotRelocate = true;
    if (newVNode2.$tag$ === "slot") {
      if (scopeId) {
        parentElm.classList.add(scopeId + "-s");
      }
      newVNode2.$flags$ |= newVNode2.$children$ ? 2 : 1;
    }
  }
  if (BUILD10.isDev && newVNode2.$elm$) {
    consoleDevError(
      `The JSX ${newVNode2.$text$ !== null ? `"${newVNode2.$text$}" text` : `"${newVNode2.$tag$}" element`} node should not be shared within the same renderer. The renderer caches element lookups in order to improve performance. However, a side effect from this is that the exact same JSX node should not be reused. For more information please see https://stenciljs.com/docs/templating-jsx#avoid-shared-jsx-nodes`,
    );
  }
  if (BUILD10.vdomText && newVNode2.$text$ !== null) {
    elm = newVNode2.$elm$ = doc.createTextNode(newVNode2.$text$);
  } else if (BUILD10.slotRelocation && newVNode2.$flags$ & 1) {
    elm = newVNode2.$elm$ =
      BUILD10.isDebug || BUILD10.hydrateServerSide
        ? slotReferenceDebugNode(newVNode2)
        : doc.createTextNode("");
  } else {
    if (BUILD10.svg && !isSvgMode) {
      isSvgMode = newVNode2.$tag$ === "svg";
    }
    elm = newVNode2.$elm$ = BUILD10.svg
      ? doc.createElementNS(
          isSvgMode ? SVG_NS : HTML_NS,
          BUILD10.slotRelocation && newVNode2.$flags$ & 2
            ? "slot-fb"
            : newVNode2.$tag$,
        )
      : doc.createElement(
          BUILD10.slotRelocation && newVNode2.$flags$ & 2
            ? "slot-fb"
            : newVNode2.$tag$,
        );
    if (BUILD10.svg && isSvgMode && newVNode2.$tag$ === "foreignObject") {
      isSvgMode = false;
    }
    if (BUILD10.vdomAttribute) {
      updateElement(null, newVNode2, isSvgMode);
    }
    if (
      (BUILD10.shadowDom || BUILD10.scoped) &&
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
    if (BUILD10.svg) {
      if (newVNode2.$tag$ === "svg") {
        isSvgMode = false;
      } else if (elm.tagName === "foreignObject") {
        isSvgMode = true;
      }
    }
  }
  elm["s-hn"] = hostTagName;
  if (BUILD10.slotRelocation) {
    if (newVNode2.$flags$ & (2 | 1)) {
      elm["s-sr"] = true;
      elm["s-cr"] = contentRef;
      elm["s-sn"] = newVNode2.$name$ || "";
      elm["s-rf"] = (_a = newVNode2.$attrs$) == null ? void 0 : _a.ref;
      oldVNode =
        oldParentVNode &&
        oldParentVNode.$children$ &&
        oldParentVNode.$children$[childIndex];
      if (
        oldVNode &&
        oldVNode.$tag$ === newVNode2.$tag$ &&
        oldParentVNode.$elm$
      ) {
        if (BUILD10.experimentalSlotFixes) {
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
  const oldSlotChildNodes = Array.from(parentElm.childNodes);
  if (parentElm["s-sr"] && BUILD10.experimentalSlotFixes) {
    let node = parentElm;
    while ((node = node.nextSibling)) {
      if (
        node &&
        node["s-sn"] === parentElm["s-sn"] &&
        node["s-sh"] === hostTagName
      ) {
        oldSlotChildNodes.push(node);
      }
    }
  }
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
    (BUILD10.slotRelocation &&
      parentElm["s-cr"] &&
      parentElm["s-cr"].parentNode) ||
    parentElm;
  let childNode;
  if (
    BUILD10.shadowDom &&
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
          BUILD10.slotRelocation ? referenceNode(before) : before,
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
        if (BUILD10.slotRelocation) {
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
        BUILD10.slotRelocation &&
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
        BUILD10.slotRelocation &&
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
      if (BUILD10.vdomKey) {
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
      if (BUILD10.vdomKey && idxInOld >= 0) {
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
        if (BUILD10.slotRelocation) {
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
  } else if (BUILD10.updatable && newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
};
var isSameVnode = (leftVNode, rightVNode, isInitialRender = false) => {
  if (leftVNode.$tag$ === rightVNode.$tag$) {
    if (BUILD10.slotRelocation && leftVNode.$tag$ === "slot") {
      return leftVNode.$name$ === rightVNode.$name$;
    }
    if (BUILD10.vdomKey && !isInitialRender) {
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
  if (!BUILD10.vdomText || text === null) {
    if (BUILD10.svg) {
      isSvgMode =
        tag === "svg" ? true : tag === "foreignObject" ? false : isSvgMode;
    }
    if (BUILD10.vdomAttribute || BUILD10.reflect) {
      if (BUILD10.slot && tag === "slot" && !useNativeShadowDom) {
        if (
          BUILD10.experimentalSlotFixes &&
          oldVNode.$name$ !== newVNode2.$name$
        ) {
          newVNode2.$elm$["s-sn"] = newVNode2.$name$ || "";
          relocateToHostRoot(newVNode2.$elm$.parentElement);
        }
      } else {
        updateElement(oldVNode, newVNode2, isSvgMode);
      }
    }
    if (BUILD10.updatable && oldChildren !== null && newChildren !== null) {
      updateChildren(elm, oldChildren, newVNode2, newChildren, isInitialRender);
    } else if (newChildren !== null) {
      if (BUILD10.updatable && BUILD10.vdomText && oldVNode.$text$ !== null) {
        elm.textContent = "";
      }
      addVnodes(elm, null, newVNode2, newChildren, 0, newChildren.length - 1);
    } else if (BUILD10.updatable && oldChildren !== null) {
      removeVnodes(oldChildren, 0, oldChildren.length - 1);
    }
    if (BUILD10.svg && isSvgMode && tag === "svg") {
      isSvgMode = false;
    }
  } else if (
    BUILD10.vdomText &&
    BUILD10.slotRelocation &&
    (defaultHolder = elm["s-cr"])
  ) {
    defaultHolder.parentNode.textContent = text;
  } else if (BUILD10.vdomText && oldVNode.$text$ !== text) {
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
          (!BUILD10.experimentalSlotFixes ||
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
  if (BUILD10.vdomRef) {
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
    BUILD10.isDev &&
    Array.isArray(renderFnResults) &&
    renderFnResults.some(isHost)
  ) {
    throw new Error(
      `The <Host> must be the single root component.\nLooks like the render() function of "${hostTagName.toLowerCase()}" is returning an array that contains the <Host>.\n\nThe render() function should look like this instead:\n\nrender() {\n  // Do not return an array\n  return (\n    <Host>{content}</Host>\n  );\n}\n  `,
    );
  }
  if (BUILD10.reflect && cmpMeta.$attrsToReflect$) {
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
  rootVnode.$elm$ = oldVNode.$elm$ = BUILD10.shadowDom
    ? hostElm.shadowRoot || hostElm
    : hostElm;
  if (BUILD10.scoped || BUILD10.shadowDom) {
    scopeId = hostElm["s-sc"];
  }
  useNativeShadowDom = supportsShadow && (cmpMeta.$flags$ & 1) !== 0;
  if (BUILD10.slotRelocation) {
    contentRef = hostElm["s-cr"];
    checkSlotFallbackVisibility = false;
  }
  patch(oldVNode, rootVnode, isInitialLoad);
  if (BUILD10.slotRelocation) {
    plt.$flags$ |= 1;
    if (checkSlotRelocate) {
      markSlotContentForRelocation(rootVnode.$elm$);
      for (const relocateData of relocateNodes) {
        const nodeToRelocate = relocateData.$nodeToRelocate$;
        if (!nodeToRelocate["s-ol"]) {
          const orgLocationNode =
            BUILD10.isDebug || BUILD10.hydrateServerSide
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
            !BUILD10.experimentalSlotFixes ||
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
                while (
                  refNode === nodeToRelocate ||
                  (refNode == null ? void 0 : refNode["s-sr"])
                ) {
                  refNode = refNode == null ? void 0 : refNode.nextSibling;
                }
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
                !BUILD10.experimentalSlotFixes &&
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
          nodeToRelocate &&
            typeof slotRefNode["s-rf"] === "function" &&
            slotRefNode["s-rf"](nodeToRelocate);
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
  if (BUILD10.experimentalScopedSlotChanges && cmpMeta.$flags$ & 2) {
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
    BUILD11.asyncLoading &&
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
  if (BUILD11.taskQueue && BUILD11.updatable) {
    hostRef.$flags$ |= 16;
  }
  if (BUILD11.asyncLoading && hostRef.$flags$ & 4) {
    hostRef.$flags$ |= 512;
    return;
  }
  attachToAncestor(hostRef, hostRef.$ancestorComponent$);
  const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
  return BUILD11.taskQueue ? writeTask(dispatch) : dispatch();
};
var dispatchHooks = (hostRef, isInitialLoad) => {
  const elm = hostRef.$hostElement$;
  const endSchedule = createTime("scheduleUpdate", hostRef.$cmpMeta$.$tagName$);
  const instance = BUILD11.lazyLoad ? hostRef.$lazyInstance$ : elm;
  let maybePromise;
  if (isInitialLoad) {
    if (BUILD11.lazyLoad && BUILD11.hostListener) {
      hostRef.$flags$ |= 256;
      if (hostRef.$queuedListeners$) {
        hostRef.$queuedListeners$.map(([methodName, event]) =>
          safeCall(instance, methodName, event),
        );
        hostRef.$queuedListeners$ = void 0;
      }
    }
    emitLifecycleEvent(elm, "componentWillLoad");
    if (BUILD11.cmpWillLoad) {
      maybePromise = safeCall(instance, "componentWillLoad");
    }
  } else {
    emitLifecycleEvent(elm, "componentWillUpdate");
    if (BUILD11.cmpWillUpdate) {
      maybePromise = safeCall(instance, "componentWillUpdate");
    }
  }
  emitLifecycleEvent(elm, "componentWillRender");
  if (BUILD11.cmpWillRender) {
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
  if (BUILD11.style && isInitialLoad) {
    attachStyles(hostRef);
  }
  const endRender = createTime("render", hostRef.$cmpMeta$.$tagName$);
  if (BUILD11.isDev) {
    hostRef.$flags$ |= 1024;
  }
  if (BUILD11.hydrateServerSide) {
    await callRender(hostRef, instance, elm, isInitialLoad);
  } else {
    callRender(hostRef, instance, elm, isInitialLoad);
  }
  if (BUILD11.isDev) {
    hostRef.$renderCount$ =
      hostRef.$renderCount$ === void 0 ? 1 : hostRef.$renderCount$ + 1;
    hostRef.$flags$ &= ~1024;
  }
  if (BUILD11.hydrateServerSide) {
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
  if (BUILD11.asyncLoading && rc) {
    rc.map((cb) => cb());
    elm["s-rc"] = void 0;
  }
  endRender();
  endUpdate();
  if (BUILD11.asyncLoading) {
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
  const allRenderFn = BUILD11.allRenderFn ? true : false;
  const lazyLoad = BUILD11.lazyLoad ? true : false;
  const taskQueue = BUILD11.taskQueue ? true : false;
  const updatable = BUILD11.updatable ? true : false;
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
    if (BUILD11.hasRenderFn || BUILD11.reflect) {
      if (BUILD11.vdomRender || BUILD11.reflect) {
        if (BUILD11.hydrateServerSide) {
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
  const instance = BUILD11.lazyLoad ? hostRef.$lazyInstance$ : elm;
  const ancestorComponent = hostRef.$ancestorComponent$;
  if (BUILD11.cmpDidRender) {
    if (BUILD11.isDev) {
      hostRef.$flags$ |= 1024;
    }
    safeCall(instance, "componentDidRender");
    if (BUILD11.isDev) {
      hostRef.$flags$ &= ~1024;
    }
  }
  emitLifecycleEvent(elm, "componentDidRender");
  if (!(hostRef.$flags$ & 64)) {
    hostRef.$flags$ |= 64;
    if (BUILD11.asyncLoading && BUILD11.cssAnnotations) {
      addHydratedFlag(elm);
    }
    if (BUILD11.cmpDidLoad) {
      if (BUILD11.isDev) {
        hostRef.$flags$ |= 2048;
      }
      safeCall(instance, "componentDidLoad");
      if (BUILD11.isDev) {
        hostRef.$flags$ &= ~2048;
      }
    }
    emitLifecycleEvent(elm, "componentDidLoad");
    endPostUpdate();
    if (BUILD11.asyncLoading) {
      hostRef.$onReadyResolve$(elm);
      if (!ancestorComponent) {
        appDidLoad(tagName);
      }
    }
  } else {
    if (BUILD11.cmpDidUpdate) {
      if (BUILD11.isDev) {
        hostRef.$flags$ |= 1024;
      }
      safeCall(instance, "componentDidUpdate");
      if (BUILD11.isDev) {
        hostRef.$flags$ &= ~1024;
      }
    }
    emitLifecycleEvent(elm, "componentDidUpdate");
    endPostUpdate();
  }
  if (BUILD11.method && BUILD11.lazyLoad) {
    hostRef.$onInstanceResolve$(elm);
  }
  if (BUILD11.asyncLoading) {
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
  if (BUILD11.updatable && (Build.isBrowser || Build.isTesting)) {
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
  if (BUILD11.cssAnnotations) {
    addHydratedFlag(doc.documentElement);
  }
  if (BUILD11.asyncQueue) {
    plt.$flags$ |= 2;
  }
  nextTick(() =>
    emitEvent(win, "appload", { detail: { namespace: NAMESPACE } }),
  );
  if (BUILD11.profile && performance.measure) {
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
  if (BUILD11.lifecycleDOMEvents) {
    emitEvent(elm, "stencil_" + lifecycleName, {
      bubbles: true,
      composed: true,
      detail: { namespace: NAMESPACE },
    });
  }
};
var addHydratedFlag = (elm) =>
  BUILD11.hydratedClass
    ? elm.classList.add("hydrated")
    : BUILD11.hydratedAttribute
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
  const elm = BUILD12.lazyLoad ? hostRef.$hostElement$ : ref;
  const oldVal = hostRef.$instanceValues$.get(propName);
  const flags = hostRef.$flags$;
  const instance = BUILD12.lazyLoad ? hostRef.$lazyInstance$ : elm;
  newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
  const areBothNaN = Number.isNaN(oldVal) && Number.isNaN(newVal);
  const didValueChange = newVal !== oldVal && !areBothNaN;
  if (
    (!BUILD12.lazyLoad || !(flags & 8) || oldVal === void 0) &&
    didValueChange
  ) {
    hostRef.$instanceValues$.set(propName, newVal);
    if (BUILD12.isDev) {
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
    if (!BUILD12.lazyLoad || instance) {
      if (BUILD12.watchCallback && cmpMeta.$watchers$ && flags & 128) {
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
      if (BUILD12.updatable && (flags & (2 | 16)) === 2) {
        if (BUILD12.cmpShouldUpdate && instance.componentShouldUpdate) {
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
  if (BUILD13.formAssociated && cmpMeta.$flags$ & 64 && flags & 1) {
    FORM_ASSOCIATED_CUSTOM_ELEMENT_CALLBACKS.forEach((cbName) =>
      Object.defineProperty(prototype, cbName, {
        value(...args) {
          const hostRef = getHostRef(this);
          const elm = BUILD13.lazyLoad ? hostRef.$hostElement$ : this;
          const instance = BUILD13.lazyLoad ? hostRef.$lazyInstance$ : elm;
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
  if (BUILD13.member && cmpMeta.$members$) {
    if (BUILD13.watchCallback && Cstr.watchers) {
      cmpMeta.$watchers$ = Cstr.watchers;
    }
    const members = Object.entries(cmpMeta.$members$);
    members.map(([memberName, [memberFlags]]) => {
      if (
        (BUILD13.prop || BUILD13.state) &&
        (memberFlags & 31 ||
          ((!BUILD13.lazyLoad || flags & 2) && memberFlags & 32))
      ) {
        Object.defineProperty(prototype, memberName, {
          get() {
            return getValue(this, memberName);
          },
          set(newValue) {
            if (BUILD13.isDev) {
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
        BUILD13.lazyLoad &&
        BUILD13.method &&
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
    if (BUILD13.observeAttribute && (!BUILD13.lazyLoad || flags & 1)) {
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
              const elm = BUILD13.lazyLoad ? hostRef.$hostElement$ : this;
              const instance = BUILD13.lazyLoad ? hostRef.$lazyInstance$ : elm;
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
              if (BUILD13.reflect && m[0] & 512) {
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
    const bundleId = cmpMeta.$lazyBundleId$;
    if ((BUILD14.lazyLoad || BUILD14.hydrateClientSide) && bundleId) {
      Cstr = loadModule(cmpMeta, hostRef, hmrVersionId);
      if (Cstr.then) {
        const endLoad = uniqueTime(
          `st:load:${cmpMeta.$tagName$}:${hostRef.$modeName$}`,
          `[Stencil] Load module for <${cmpMeta.$tagName$}>`,
        );
        Cstr = await Cstr;
        endLoad();
      }
      if ((BUILD14.isDev || BUILD14.isDebug) && !Cstr) {
        throw new Error(
          `Constructor for "${cmpMeta.$tagName$}#${hostRef.$modeName$}" was not found`,
        );
      }
      if (BUILD14.member && !Cstr.isProxied) {
        if (BUILD14.watchCallback) {
          cmpMeta.$watchers$ = Cstr.watchers;
        }
        proxyComponent(Cstr, cmpMeta, 2);
        Cstr.isProxied = true;
      }
      const endNewInstance = createTime("createInstance", cmpMeta.$tagName$);
      if (BUILD14.member) {
        hostRef.$flags$ |= 8;
      }
      try {
        new Cstr(hostRef);
      } catch (e) {
        consoleError(e);
      }
      if (BUILD14.member) {
        hostRef.$flags$ &= ~8;
      }
      if (BUILD14.watchCallback) {
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
    if (BUILD14.style && Cstr.style) {
      let style = Cstr.style;
      if (BUILD14.mode && typeof style !== "string") {
        style = style[(hostRef.$modeName$ = computeMode(elm))];
        if (BUILD14.hydrateServerSide && hostRef.$modeName$) {
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
          !BUILD14.hydrateServerSide &&
          BUILD14.shadowDom &&
          BUILD14.shadowDomShim &&
          cmpMeta.$flags$ & 8
        ) {
          style = await import("../client/shadow-css.js").then((m) =>
            m.scopeCss(style, scopeId2, false),
          );
        }
        registerStyle(scopeId2, style, !!(cmpMeta.$flags$ & 1));
        endRegisterStyles();
      }
    }
  }
  const ancestorComponent = hostRef.$ancestorComponent$;
  const schedule = () => scheduleUpdate(hostRef, true);
  if (BUILD14.asyncLoading && ancestorComponent && ancestorComponent["s-rc"]) {
    ancestorComponent["s-rc"].push(schedule);
  } else {
    schedule();
  }
};
var fireConnectedCallback = (instance) => {
  if (BUILD14.lazyLoad && BUILD14.connectedCallback) {
    safeCall(instance, "connectedCallback");
  }
};
var connectedCallback = (elm) => {
  if ((plt.$flags$ & 1) === 0) {
    const hostRef = getHostRef(elm);
    const cmpMeta = hostRef.$cmpMeta$;
    const endConnected = createTime("connectedCallback", cmpMeta.$tagName$);
    if (BUILD15.hostListenerTargetParent) {
      addHostEventListeners(elm, hostRef, cmpMeta.$listeners$, true);
    }
    if (!(hostRef.$flags$ & 1)) {
      hostRef.$flags$ |= 1;
      let hostId;
      if (BUILD15.hydrateClientSide) {
        hostId = elm.getAttribute(HYDRATE_ID);
        if (hostId) {
          if (BUILD15.shadowDom && supportsShadow && cmpMeta.$flags$ & 1) {
            const scopeId2 = BUILD15.mode
              ? addStyle(elm.shadowRoot, cmpMeta, elm.getAttribute("s-mode"))
              : addStyle(elm.shadowRoot, cmpMeta);
            elm.classList.remove(scopeId2 + "-h", scopeId2 + "-s");
          }
          initializeClientHydrate(elm, cmpMeta.$tagName$, hostId, hostRef);
        }
      }
      if (BUILD15.slotRelocation && !hostId) {
        if (
          BUILD15.hydrateServerSide ||
          ((BUILD15.slot || BUILD15.shadowDom) && cmpMeta.$flags$ & (4 | 8))
        ) {
          setContentReference(elm);
        }
      }
      if (BUILD15.asyncLoading) {
        let ancestorComponent = elm;
        while (
          (ancestorComponent =
            ancestorComponent.parentNode || ancestorComponent.host)
        ) {
          if (
            (BUILD15.hydrateClientSide &&
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
      if (BUILD15.prop && !BUILD15.hydrateServerSide && cmpMeta.$members$) {
        Object.entries(cmpMeta.$members$).map(([memberName, [memberFlags]]) => {
          if (memberFlags & 31 && elm.hasOwnProperty(memberName)) {
            const value = elm[memberName];
            delete elm[memberName];
            elm[memberName] = value;
          }
        });
      }
      if (BUILD15.initializeNextTick) {
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
    BUILD15.isDebug ? `content-ref (host=${elm.localName})` : "",
  ));
  contentRefElm["s-cn"] = true;
  elm.insertBefore(contentRefElm, elm.firstChild);
};
import { BUILD as BUILD16 } from "@stencil/core/internal/app-data";
var disconnectInstance = (instance) => {
  if (BUILD16.lazyLoad && BUILD16.disconnectedCallback) {
    safeCall(instance, "disconnectedCallback");
  }
  if (BUILD16.cmpDidUnload) {
    safeCall(instance, "componentDidUnload");
  }
};
var disconnectedCallback = async (elm) => {
  if ((plt.$flags$ & 1) === 0) {
    const hostRef = getHostRef(elm);
    if (BUILD16.hostListener) {
      if (hostRef.$rmListeners$) {
        hostRef.$rmListeners$.map((rmListener) => rmListener());
        hostRef.$rmListeners$ = void 0;
      }
    }
    if (!BUILD16.lazyLoad) {
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
import { BUILD as BUILD17 } from "@stencil/core/internal/app-data";
import { NODE_TYPES } from "../../mock-doc/index.js";
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
    const isShadowDom = BUILD17.shadowDom
      ? srcNode.shadowRoot && supportsShadow
      : false;
    const clonedNode = orgCloneNode.call(srcNode, isShadowDom ? deep : false);
    if (BUILD17.slot && !isShadowDom && deep) {
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
        "s-rf",
      ];
      for (; i2 < srcNode.childNodes.length; i2++) {
        slotted = srcNode.childNodes[i2]["s-nr"];
        nonStencilNode = stencilPrivates.every(
          (privateField) => !srcNode.childNodes[i2][privateField],
        );
        if (slotted) {
          if (BUILD17.appendChildSlotFix && clonedNode.__appendChild) {
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
    const slotNode = getHostSlotNode(this.childNodes, slotName, this.tagName);
    if (slotNode) {
      const slotChildNodes = getHostSlotChildNodes(slotNode, slotName);
      const appendAfter = slotChildNodes[slotChildNodes.length - 1];
      const insertedNode = appendAfter.parentNode.insertBefore(
        newChild,
        appendAfter.nextSibling,
      );
      updateFallbackSlotVisibility(this);
      return insertedNode;
    }
    return this.__appendChild(newChild);
  };
};
var patchSlotRemoveChild = (ElementPrototype) => {
  ElementPrototype.__removeChild = ElementPrototype.removeChild;
  ElementPrototype.removeChild = function (toRemove) {
    if (toRemove && typeof toRemove["s-sn"] !== "undefined") {
      const slotNode = getHostSlotNode(
        this.childNodes,
        toRemove["s-sn"],
        this.tagName,
      );
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
      const slotNode = getHostSlotNode(this.childNodes, slotName, this.tagName);
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
  if (BUILD17.experimentalScopedSlotChanges) {
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
                slotContent.nodeType === NODE_TYPES.TEXT_NODE ||
                slotContent.nodeType === NODE_TYPES.ELEMENT_NODE
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
        const slotNode = getHostSlotNode(this.childNodes, "", this.tagName);
        if (
          ((_a = slotNode == null ? void 0 : slotNode.nextSibling) == null
            ? void 0
            : _a.nodeType) === NODE_TYPES.TEXT_NODE
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
        const slotNode = getHostSlotNode(this.childNodes, "", this.tagName);
        if (
          ((_a = slotNode == null ? void 0 : slotNode.nextSibling) == null
            ? void 0
            : _a.nodeType) === NODE_TYPES.TEXT_NODE
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
var getHostSlotNode = (childNodes, slotName, hostName) => {
  let i2 = 0;
  let childNode;
  for (; i2 < childNodes.length; i2++) {
    childNode = childNodes[i2];
    if (
      childNode["s-sr"] &&
      childNode["s-sn"] === slotName &&
      childNode["s-hn"] === hostName
    ) {
      return childNode;
    }
    childNode = getHostSlotNode(childNode.childNodes, slotName, hostName);
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
  if (BUILD18.member) {
    cmpMeta.$members$ = compactMeta[2];
  }
  if (BUILD18.hostListener) {
    cmpMeta.$listeners$ = compactMeta[3];
  }
  if (BUILD18.watchCallback) {
    cmpMeta.$watchers$ = Cstr.$watchers$;
  }
  if (BUILD18.reflect) {
    cmpMeta.$attrsToReflect$ = [];
  }
  if (BUILD18.shadowDom && !supportsShadow && cmpMeta.$flags$ & 1) {
    cmpMeta.$flags$ |= 8;
  }
  if (BUILD18.experimentalSlotFixes) {
    if (BUILD18.scoped && cmpMeta.$flags$ & 2) {
      patchPseudoShadowDom(Cstr.prototype, cmpMeta);
    }
  } else {
    if (BUILD18.slotChildNodesFix) {
      patchChildSlotNodes(Cstr.prototype, cmpMeta);
    }
    if (BUILD18.cloneNodeFix) {
      patchCloneNode(Cstr.prototype);
    }
    if (BUILD18.appendChildSlotFix) {
      patchSlotAppendChild(Cstr.prototype);
    }
    if (BUILD18.scopedSlotTextContentFix && cmpMeta.$flags$ & 2) {
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
      if (BUILD18.connectedCallback && originalConnectedCallback) {
        originalConnectedCallback.call(this);
      }
    },
    disconnectedCallback() {
      disconnectedCallback(this);
      if (BUILD18.disconnectedCallback && originalDisconnectedCallback) {
        originalDisconnectedCallback.call(this);
      }
    },
    __attachShadow() {
      if (supportsShadow) {
        if (BUILD18.shadowDelegatesFocus) {
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
  if (BUILD18.style && BUILD18.mode && !BUILD18.lazyLoad) {
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
import { BUILD as BUILD19 } from "@stencil/core/internal/app-data";
var hmrStart = (hostElement, cmpMeta, hmrVersionId) => {
  const hostRef = getHostRef(hostElement);
  hostRef.$flags$ = 1;
  initializeComponent(hostElement, hostRef, cmpMeta, hmrVersionId);
};
var bootstrapLazy = (lazyBundles, options = {}) => {
  var _a;
  if (BUILD19.profile && performance.mark) {
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
  if (BUILD19.asyncQueue) {
    if (options.syncQueue) {
      plt.$flags$ |= 4;
    }
  }
  if (BUILD19.hydrateClientSide) {
    plt.$flags$ |= 2;
  }
  if (BUILD19.hydrateClientSide && BUILD19.shadowDom) {
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
      if (BUILD19.member) {
        cmpMeta.$members$ = compactMeta[2];
      }
      if (BUILD19.hostListener) {
        cmpMeta.$listeners$ = compactMeta[3];
      }
      if (BUILD19.reflect) {
        cmpMeta.$attrsToReflect$ = [];
      }
      if (BUILD19.watchCallback) {
        cmpMeta.$watchers$ = (_a2 = compactMeta[4]) != null ? _a2 : {};
      }
      if (BUILD19.shadowDom && !supportsShadow && cmpMeta.$flags$ & 1) {
        cmpMeta.$flags$ |= 8;
      }
      const tagName =
        BUILD19.transformTagName && options.transformTagName
          ? options.transformTagName(cmpMeta.$tagName$)
          : cmpMeta.$tagName$;
      const HostElement = class extends HTMLElement {
        constructor(self) {
          super(self);
          self = this;
          registerHost(self, cmpMeta);
          if (BUILD19.shadowDom && cmpMeta.$flags$ & 1) {
            if (supportsShadow) {
              if (BUILD19.shadowDelegatesFocus) {
                self.attachShadow({
                  mode: "open",
                  delegatesFocus: !!(cmpMeta.$flags$ & 16),
                });
              } else {
                self.attachShadow({ mode: "open" });
              }
            } else if (!BUILD19.hydrateServerSide && !("shadowRoot" in self)) {
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
      if (BUILD19.experimentalSlotFixes) {
        if (BUILD19.scoped && cmpMeta.$flags$ & 2) {
          patchPseudoShadowDom(HostElement.prototype, cmpMeta);
        }
      } else {
        if (BUILD19.slotChildNodesFix) {
          patchChildSlotNodes(HostElement.prototype, cmpMeta);
        }
        if (BUILD19.cloneNodeFix) {
          patchCloneNode(HostElement.prototype);
        }
        if (BUILD19.appendChildSlotFix) {
          patchSlotAppendChild(HostElement.prototype);
        }
        if (BUILD19.scopedSlotTextContentFix && cmpMeta.$flags$ & 2) {
          patchTextContent(HostElement.prototype);
        }
      }
      if (BUILD19.formAssociated && cmpMeta.$flags$ & 64) {
        HostElement.formAssociated = true;
      }
      if (BUILD19.hotModuleReplacement) {
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
      dataStyles.textContent += SLOT_FB_CSS;
    }
    if (
      BUILD19.invisiblePrehydration &&
      (BUILD19.hydratedClass || BUILD19.hydratedAttribute)
    ) {
      dataStyles.textContent += cmpTags + HYDRATED_CSS;
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
    if (BUILD19.profile) {
      plt.jmp(() => (appLoadFallback = setTimeout(appDidLoad, 30, "timeout")));
    } else {
      plt.jmp(() => (appLoadFallback = setTimeout(appDidLoad, 30)));
    }
  }
  endBootstrap();
};
var Fragment = (_, children) => children;
import { BUILD as BUILD20 } from "@stencil/core/internal/app-data";
var addHostEventListeners = (
  elm,
  hostRef,
  listeners,
  attachParentListeners,
) => {
  if (BUILD20.hostListener && listeners) {
    if (BUILD20.hostListenerTargetParent) {
      if (attachParentListeners) {
        listeners = listeners.filter(([flags]) => flags & 32);
      } else {
        listeners = listeners.filter(([flags]) => !(flags & 32));
      }
    }
    listeners.map(([flags, name, method]) => {
      const target = BUILD20.hostListenerTarget
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
    if (BUILD20.lazyLoad) {
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
  if (BUILD20.hostListenerTargetDocument && flags & 4) return doc;
  if (BUILD20.hostListenerTargetWindow && flags & 8) return win;
  if (BUILD20.hostListenerTargetBody && flags & 16) return doc.body;
  if (BUILD20.hostListenerTargetParent && flags & 32) return elm.parentElement;
  return elm;
};
var hostListenerOpts = (flags) =>
  supportsListenerOptions
    ? { passive: (flags & 1) !== 0, capture: (flags & 2) !== 0 }
    : (flags & 2) !== 0;
var setNonce = (nonce) => (plt.$nonce$ = nonce);
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
var hAsync = (nodeName, vnodeData, ...children) => {
  if (Array.isArray(children) && children.length > 0) {
    const flatChildren = children.flat(Infinity);
    if (flatChildren.some(isPromise)) {
      return Promise.all(flatChildren)
        .then((resolvedChildren) => h(nodeName, vnodeData, ...resolvedChildren))
        .catch((err2) => {
          consoleDevError(err2);
          return h(nodeName, vnodeData);
        });
    }
    return h(nodeName, vnodeData, ...children);
  }
  return h(nodeName, vnodeData);
};
var globalScripts = () => {};
function proxyHostElement(elm, cmpMeta) {
  if (typeof elm.componentOnReady !== "function") {
    elm.componentOnReady = componentOnReady;
  }
  if (typeof elm.forceUpdate !== "function") {
    elm.forceUpdate = forceUpdate2;
  }
  if (cmpMeta.$flags$ & 1) {
    elm.shadowRoot = elm;
  }
  if (cmpMeta.$members$ != null) {
    const hostRef = getHostRef(elm);
    const members = Object.entries(cmpMeta.$members$);
    members.forEach(([memberName, m]) => {
      const memberFlags = m[0];
      if (memberFlags & 31) {
        const attributeName = m[1] || memberName;
        const attrValue = elm.getAttribute(attributeName);
        if (attrValue != null) {
          const parsedAttrValue = parsePropertyValue(attrValue, memberFlags);
          hostRef.$instanceValues$.set(memberName, parsedAttrValue);
        }
        const ownValue = elm[memberName];
        if (ownValue !== void 0) {
          hostRef.$instanceValues$.set(memberName, ownValue);
          delete elm[memberName];
        }
        Object.defineProperty(elm, memberName, {
          get() {
            return getValue(this, memberName);
          },
          set(newValue) {
            setValue(this, memberName, newValue, cmpMeta);
          },
          configurable: true,
          enumerable: true,
        });
      } else if (memberFlags & 64) {
        Object.defineProperty(elm, memberName, {
          value(...args) {
            const ref = getHostRef(this);
            return ref.$onInstancePromise$
              .then(() => ref.$lazyInstance$[memberName](...args))
              .catch(consoleError);
          },
        });
      }
    });
  }
}
function componentOnReady() {
  return getHostRef(this).$onReadyPromise$;
}
function forceUpdate2() {}
function hydrateApp(win2, opts, results, afterHydrate, resolve) {
  const connectedElements = new Set();
  const createdElements = new Set();
  const waitingElements = new Set();
  const orgDocumentCreateElement = win2.document.createElement;
  const orgDocumentCreateElementNS = win2.document.createElementNS;
  const resolved2 = Promise.resolve();
  let tmrId;
  let ranCompleted = false;
  function hydratedComplete() {
    global.clearTimeout(tmrId);
    createdElements.clear();
    connectedElements.clear();
    if (!ranCompleted) {
      ranCompleted = true;
      try {
        if (opts.clientHydrateAnnotations) {
          insertVdomAnnotations(win2.document, opts.staticComponents);
        }
        win2.dispatchEvent(new win2.Event("DOMContentLoaded"));
        win2.document.createElement = orgDocumentCreateElement;
        win2.document.createElementNS = orgDocumentCreateElementNS;
      } catch (e) {
        renderCatchError(opts, results, e);
      }
    }
    afterHydrate(win2, opts, results, resolve);
  }
  function hydratedError(err2) {
    renderCatchError(opts, results, err2);
    hydratedComplete();
  }
  function timeoutExceeded() {
    hydratedError(
      `Hydrate exceeded timeout${waitingOnElementsMsg(waitingElements)}`,
    );
  }
  try {
    let patchedConnectedCallback2 = function () {
        return connectElement2(this);
      },
      patchElement2 = function (elm) {
        if (isValidComponent(elm, opts)) {
          const hostRef = getHostRef(elm);
          if (!hostRef) {
            const Cstr = loadModule(
              { $tagName$: elm.nodeName.toLowerCase(), $flags$: null },
              null,
            );
            if (Cstr != null && Cstr.cmpMeta != null) {
              createdElements.add(elm);
              elm.connectedCallback = patchedConnectedCallback2;
              registerHost(elm, Cstr.cmpMeta);
              proxyHostElement(elm, Cstr.cmpMeta);
            }
          }
        }
      },
      patchChild2 = function (elm) {
        if (elm != null && elm.nodeType === 1) {
          patchElement2(elm);
          const children = elm.children;
          for (let i2 = 0, ii = children.length; i2 < ii; i2++) {
            patchChild2(children[i2]);
          }
        }
      },
      connectElement2 = function (elm) {
        createdElements.delete(elm);
        if (
          isValidComponent(elm, opts) &&
          results.hydratedCount < opts.maxHydrateCount
        ) {
          if (!connectedElements.has(elm) && shouldHydrate(elm)) {
            connectedElements.add(elm);
            return hydrateComponent(
              win2,
              results,
              elm.nodeName,
              elm,
              waitingElements,
            );
          }
        }
        return resolved2;
      },
      waitLoop2 = function () {
        const toConnect = Array.from(createdElements).filter(
          (elm) => elm.parentElement,
        );
        if (toConnect.length > 0) {
          return Promise.all(toConnect.map(connectElement2)).then(waitLoop2);
        }
        return resolved2;
      };
    var patchedConnectedCallback = patchedConnectedCallback2,
      patchElement = patchElement2,
      patchChild = patchChild2,
      connectElement = connectElement2,
      waitLoop = waitLoop2;
    win2.document.createElement = function patchedCreateElement(tagName) {
      const elm = orgDocumentCreateElement.call(win2.document, tagName);
      patchElement2(elm);
      return elm;
    };
    win2.document.createElementNS = function patchedCreateElement(
      namespaceURI,
      tagName,
    ) {
      const elm = orgDocumentCreateElementNS.call(
        win2.document,
        namespaceURI,
        tagName,
      );
      patchElement2(elm);
      return elm;
    };
    tmrId = global.setTimeout(timeoutExceeded, opts.timeout);
    plt.$resourcesUrl$ = new URL(opts.resourcesUrl || "./", doc.baseURI).href;
    globalScripts();
    patchChild2(win2.document.body);
    waitLoop2().then(hydratedComplete).catch(hydratedError);
  } catch (e) {
    hydratedError(e);
  }
}
async function hydrateComponent(win2, results, tagName, elm, waitingElements) {
  tagName = tagName.toLowerCase();
  const Cstr = loadModule({ $tagName$: tagName, $flags$: null }, null);
  if (Cstr != null) {
    const cmpMeta = Cstr.cmpMeta;
    if (cmpMeta != null) {
      waitingElements.add(elm);
      try {
        connectedCallback(elm);
        await elm.componentOnReady();
        results.hydratedCount++;
        const ref = getHostRef(elm);
        const modeName = !ref.$modeName$ ? "$" : ref.$modeName$;
        if (
          !results.components.some(
            (c) => c.tag === tagName && c.mode === modeName,
          )
        ) {
          results.components.push({
            tag: tagName,
            mode: modeName,
            count: 0,
            depth: -1,
          });
        }
      } catch (e) {
        win2.console.error(e);
      }
      waitingElements.delete(elm);
    }
  }
}
function isValidComponent(elm, opts) {
  if (elm != null && elm.nodeType === 1) {
    const tagName = elm.nodeName;
    if (typeof tagName === "string" && tagName.includes("-")) {
      if (opts.excludeComponents.includes(tagName.toLowerCase())) {
        return false;
      }
      return true;
    }
  }
  return false;
}
function shouldHydrate(elm) {
  if (elm.nodeType === 9) {
    return true;
  }
  if (NO_HYDRATE_TAGS.has(elm.nodeName)) {
    return false;
  }
  if (elm.hasAttribute("no-prerender")) {
    return false;
  }
  const parentNode = elm.parentNode;
  if (parentNode == null) {
    return true;
  }
  return shouldHydrate(parentNode);
}
var NO_HYDRATE_TAGS = new Set([
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
function renderCatchError(opts, results, err2) {
  const diagnostic = {
    level: "error",
    type: "build",
    header: "Hydrate Error",
    messageText: "",
    relFilePath: void 0,
    absFilePath: void 0,
    lines: [],
  };
  if (opts.url) {
    try {
      const u = new URL(opts.url);
      if (u.pathname !== "/") {
        diagnostic.header += ": " + u.pathname;
      }
    } catch (e) {}
  }
  if (err2 != null) {
    if (err2.stack != null) {
      diagnostic.messageText = err2.stack.toString();
    } else if (err2.message != null) {
      diagnostic.messageText = err2.message.toString();
    } else {
      diagnostic.messageText = err2.toString();
    }
  }
  results.diagnostics.push(diagnostic);
}
function printTag(elm) {
  let tag = `<${elm.nodeName.toLowerCase()}`;
  if (Array.isArray(elm.attributes)) {
    for (let i2 = 0; i2 < elm.attributes.length; i2++) {
      const attr = elm.attributes[i2];
      tag += ` ${attr.name}`;
      if (attr.value !== "") {
        tag += `="${attr.value}"`;
      }
    }
  }
  tag += `>`;
  return tag;
}
function waitingOnElementMsg(waitingElement) {
  let msg = "";
  if (waitingElement) {
    const lines = [];
    msg = " - waiting on:";
    let elm = waitingElement;
    while (elm && elm.nodeType !== 9 && elm.nodeName !== "BODY") {
      lines.unshift(printTag(elm));
      elm = elm.parentElement;
    }
    let indent = "";
    for (const ln of lines) {
      indent += "  ";
      msg += `\n${indent}${ln}`;
    }
  }
  return msg;
}
function waitingOnElementsMsg(waitingElements) {
  return Array.from(waitingElements).map(waitingOnElementMsg);
}
import {
  BUILD as BUILD21,
  Env,
  NAMESPACE as NAMESPACE2,
} from "@stencil/core/internal/app-data";
var customError;
var cmpModules = new Map();
var getModule = (tagName) => {
  if (typeof tagName === "string") {
    tagName = tagName.toLowerCase();
    const cmpModule = cmpModules.get(tagName);
    if (cmpModule != null) {
      return cmpModule[tagName];
    }
  }
  return null;
};
var loadModule = (cmpMeta, _hostRef, _hmrVersionId) =>
  getModule(cmpMeta.$tagName$);
var isMemberInElement = (elm, memberName) => {
  if (elm != null) {
    if (memberName in elm) {
      return true;
    }
    const cstr = getModule(elm.nodeName);
    if (cstr != null) {
      const hostRef = cstr;
      if (
        hostRef != null &&
        hostRef.cmpMeta != null &&
        hostRef.cmpMeta.$members$ != null
      ) {
        return memberName in hostRef.cmpMeta.$members$;
      }
    }
  }
  return false;
};
var registerComponents = (Cstrs) => {
  for (const Cstr of Cstrs) {
    const exportName = Cstr.cmpMeta.$tagName$;
    cmpModules.set(exportName, { [exportName]: Cstr });
  }
};
var win = window;
var doc = win.document;
var readTask = (cb) => {
  process.nextTick(() => {
    try {
      cb();
    } catch (e) {
      consoleError(e);
    }
  });
};
var writeTask = (cb) => {
  process.nextTick(() => {
    try {
      cb();
    } catch (e) {
      consoleError(e);
    }
  });
};
var resolved = Promise.resolve();
var nextTick = (cb) => resolved.then(cb);
var defaultConsoleError = (e) => {
  if (e != null) {
    console.error(e.stack || e.message || e);
  }
};
var consoleError = (e, el) => (customError || defaultConsoleError)(e, el);
var consoleDevError = (..._) => {};
var consoleDevWarn = (..._) => {};
var consoleDevInfo = (..._) => {};
var setErrorHandler = (handler) => (customError = handler);
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
var supportsShadow = false;
var supportsListenerOptions = false;
var supportsConstructableStylesheets = false;
var hostRefs = new WeakMap();
var getHostRef = (ref) => hostRefs.get(ref);
var registerInstance = (lazyInstance, hostRef) =>
  hostRefs.set((hostRef.$lazyInstance$ = lazyInstance), hostRef);
var registerHost = (elm, cmpMeta) => {
  const hostRef = {
    $flags$: 0,
    $cmpMeta$: cmpMeta,
    $hostElement$: elm,
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
  return hostRefs.set(elm, hostRef);
};
var Build = {
  isDev: false,
  isBrowser: false,
  isServer: true,
  isTesting: false,
};
var styles = new Map();
var modeResolutionChain = [];
export {
  BUILD21 as BUILD,
  Build,
  Env,
  Fragment,
  Host,
  NAMESPACE2 as NAMESPACE,
  addHostEventListeners,
  bootstrapLazy,
  cmpModules,
  connectedCallback,
  consoleDevError,
  consoleDevInfo,
  consoleDevWarn,
  consoleError,
  createEvent,
  defineCustomElement,
  disconnectedCallback,
  doc,
  forceModeUpdate,
  forceUpdate,
  getAssetPath,
  getElement,
  getHostRef,
  getMode,
  getRenderingRef,
  getValue,
  hAsync as h,
  hydrateApp,
  insertVdomAnnotations,
  isMemberInElement,
  loadModule,
  modeResolutionChain,
  nextTick,
  parsePropertyValue,
  plt,
  postUpdateComponent,
  proxyComponent,
  proxyCustomElement,
  readTask,
  registerComponents,
  registerHost,
  registerInstance,
  renderVdom,
  setAssetPath,
  setErrorHandler,
  setMode,
  setNonce,
  setPlatformHelpers,
  setValue,
  styles,
  supportsConstructableStylesheets,
  supportsListenerOptions,
  supportsShadow,
  win,
  writeTask,
};
