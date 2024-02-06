"use strict";
const mockDoc = require("@stencil/core/mock-doc");
const appData = require("@stencil/core/internal/app-data");
require("path");
const Build = {
  isDev: true,
  isBrowser: false,
  isServer: true,
  isTesting: true,
};
const styles = new Map();
const modeResolutionChain = [];
const cstrs = new Map();
const queuedTicks = [];
const queuedWriteTasks = [];
const queuedReadTasks = [];
const moduleLoaded = new Map();
const queuedLoadModules = [];
const caughtErrors = [];
const hostRefs = new Map();
const getAssetPath = (path) => {
  const assetUrl = new URL(path, plt.$resourcesUrl$);
  return assetUrl.origin !== win.location.origin
    ? assetUrl.href
    : assetUrl.pathname;
};
const setAssetPath = (path) => (plt.$resourcesUrl$ = path);
let i = 0;
const createTime = (fnName, tagName = "") => {
  if (appData.BUILD.profile && performance.mark) {
    const key = `st:${fnName}:${tagName}:${i++}`;
    performance.mark(key);
    return () => performance.measure(`[Stencil] ${fnName}() <${tagName}>`, key);
  } else {
    return () => {};
  }
};
const uniqueTime = (key, measureText) => {
  if (appData.BUILD.profile && performance.mark) {
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
const inspect = (ref) => {
  const hostRef = getHostRef(ref);
  if (!hostRef) {
    return undefined;
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
const installDevTools = () => {
  if (appData.BUILD.devTools) {
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
const CONTENT_REF_ID = "r";
const ORG_LOCATION_ID = "o";
const SLOT_NODE_ID = "s";
const TEXT_NODE_ID = "t";
const HYDRATE_ID = "s-id";
const HYDRATED_STYLE_ID = "sty-id";
const HYDRATE_CHILD_ID = "c-id";
const HYDRATED_CSS = "{visibility:hidden}.hydrated{visibility:inherit}";
const SLOT_FB_CSS = "slot-fb{display:contents}slot-fb[hidden]{display:none}";
const XLINK_NS = "http://www.w3.org/1999/xlink";
const FORM_ASSOCIATED_CUSTOM_ELEMENT_CALLBACKS = [
  "formAssociatedCallback",
  "formResetCallback",
  "formDisabledCallback",
  "formStateRestoreCallback",
];
const EMPTY_OBJ = {};
const SVG_NS = "http://www.w3.org/2000/svg";
const HTML_NS = "http://www.w3.org/1999/xhtml";
const isDef = (v) => v != null;
const isComplexType = (o) => {
  o = typeof o;
  return o === "object" || o === "function";
};
function queryNonceMetaTagContent(doc) {
  var _a, _b, _c;
  return (_c =
    (_b =
      (_a = doc.head) === null || _a === void 0
        ? void 0
        : _a.querySelector('meta[name="csp-nonce"]')) === null || _b === void 0
      ? void 0
      : _b.getAttribute("content")) !== null && _c !== void 0
    ? _c
    : undefined;
}
const h = (nodeName, vnodeData, ...children) => {
  let child = null;
  let key = null;
  let slotName = null;
  let simple = false;
  let lastSimple = false;
  const vNodeChildren = [];
  const walk = (c) => {
    for (let i = 0; i < c.length; i++) {
      child = c[i];
      if (Array.isArray(child)) {
        walk(child);
      } else if (child != null && typeof child !== "boolean") {
        if (
          (simple = typeof nodeName !== "function" && !isComplexType(child))
        ) {
          child = String(child);
        } else if (
          appData.BUILD.isDev &&
          typeof nodeName !== "function" &&
          child.$flags$ === undefined
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
    if (appData.BUILD.isDev && nodeName === "input") {
      validateInputProperties(vnodeData);
    }
    if (appData.BUILD.vdomKey && vnodeData.key) {
      key = vnodeData.key;
    }
    if (appData.BUILD.slotRelocation && vnodeData.name) {
      slotName = vnodeData.name;
    }
    if (appData.BUILD.vdomClass) {
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
  if (appData.BUILD.isDev && vNodeChildren.some(isHost)) {
    consoleDevError(
      `The <Host> must be the single root component. Make sure:\n- You are NOT using hostData() and <Host> in the same component.\n- <Host> is used once, and it's the single root component of the render() function.`,
    );
  }
  if (appData.BUILD.vdomFunctional && typeof nodeName === "function") {
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
  if (appData.BUILD.vdomKey) {
    vnode.$key$ = key;
  }
  if (appData.BUILD.slotRelocation) {
    vnode.$name$ = slotName;
  }
  return vnode;
};
const newVNode = (tag, text) => {
  const vnode = {
    $flags$: 0,
    $tag$: tag,
    $text$: text,
    $elm$: null,
    $children$: null,
  };
  if (appData.BUILD.vdomAttribute) {
    vnode.$attrs$ = null;
  }
  if (appData.BUILD.vdomKey) {
    vnode.$key$ = null;
  }
  if (appData.BUILD.slotRelocation) {
    vnode.$name$ = null;
  }
  return vnode;
};
const Host = {};
const isHost = (node) => node && node.$tag$ === Host;
const vdomFnUtils = {
  forEach: (children, cb) => children.map(convertToPublic).forEach(cb),
  map: (children, cb) =>
    children.map(convertToPublic).map(cb).map(convertToPrivate),
};
const convertToPublic = (node) => ({
  vattrs: node.$attrs$,
  vchildren: node.$children$,
  vkey: node.$key$,
  vname: node.$name$,
  vtag: node.$tag$,
  vtext: node.$text$,
});
const convertToPrivate = (node) => {
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
const validateInputProperties = (inputElm) => {
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
const initializeClientHydrate = (hostElm, tagName, hostId, hostRef) => {
  const endHydrate = createTime("hydrateClient", tagName);
  const shadowRoot = hostElm.shadowRoot;
  const childRenderNodes = [];
  const slotNodes = [];
  const shadowRootNodes = appData.BUILD.shadowDom && shadowRoot ? [] : null;
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
    if (
      orgLocationNode &&
      exports.supportsShadow &&
      orgLocationNode["s-en"] === ""
    ) {
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
  if (appData.BUILD.shadowDom && shadowRoot) {
    shadowRootNodes.map((shadowRootNode) => {
      if (shadowRootNode) {
        shadowRoot.appendChild(shadowRootNode);
      }
    });
  }
  endHydrate();
};
const clientHydrate = (
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
  let i;
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
    for (i = node.childNodes.length - 1; i >= 0; i--) {
      clientHydrate(
        parentVNode,
        childRenderNodes,
        slotNodes,
        shadowRootNodes,
        hostElm,
        node.childNodes[i],
        hostId,
      );
    }
    if (node.shadowRoot) {
      for (i = node.shadowRoot.childNodes.length - 1; i >= 0; i--) {
        clientHydrate(
          parentVNode,
          childRenderNodes,
          slotNodes,
          shadowRootNodes,
          hostElm,
          node.shadowRoot.childNodes[i],
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
          if (appData.BUILD.shadowDom && shadowRootNodes) {
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
          if (appData.BUILD.shadowDom && shadowRootNodes) {
            node.remove();
          } else if (appData.BUILD.slotRelocation) {
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
const initializeDocumentHydrate = (node, orgLocNodes) => {
  if (node.nodeType === 1) {
    let i = 0;
    for (; i < node.childNodes.length; i++) {
      initializeDocumentHydrate(node.childNodes[i], orgLocNodes);
    }
    if (node.shadowRoot) {
      for (i = 0; i < node.shadowRoot.childNodes.length; i++) {
        initializeDocumentHydrate(node.shadowRoot.childNodes[i], orgLocNodes);
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
const computeMode = (elm) =>
  modeResolutionChain.map((h) => h(elm)).find((m) => !!m);
const setMode = (handler) => modeResolutionChain.push(handler);
const getMode = (ref) => getHostRef(ref).$modeName$;
const parsePropertyValue = (propValue, propType) => {
  if (propValue != null && !isComplexType(propValue)) {
    if (appData.BUILD.propBoolean && propType & 4) {
      return propValue === "false" ? false : propValue === "" || !!propValue;
    }
    if (appData.BUILD.propNumber && propType & 2) {
      return parseFloat(propValue);
    }
    if (appData.BUILD.propString && propType & 1) {
      return String(propValue);
    }
    return propValue;
  }
  return propValue;
};
const getElement = (ref) =>
  appData.BUILD.lazyLoad ? getHostRef(ref).$hostElement$ : ref;
const createEvent = (ref, name, flags) => {
  const elm = getElement(ref);
  return {
    emit: (detail) => {
      if (appData.BUILD.isDev && !elm.isConnected) {
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
const emitEvent = (elm, name, opts) => {
  const ev = plt.ce(name, opts);
  elm.dispatchEvent(ev);
  return ev;
};
const rootAppliedStyles = new WeakMap();
const registerStyle = (scopeId, cssText, allowCS) => {
  let style = styles.get(scopeId);
  {
    style = cssText;
  }
  styles.set(scopeId, style);
};
const addStyle = (styleContainerNode, cmpMeta, mode) => {
  var _a;
  const scopeId = getScopeId(cmpMeta, mode);
  const style = styles.get(scopeId);
  if (!appData.BUILD.attachStyles) {
    return scopeId;
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
      if (!appliedStyles.has(scopeId)) {
        if (
          appData.BUILD.hydrateClientSide &&
          styleContainerNode.host &&
          (styleElm = styleContainerNode.querySelector(
            `[${HYDRATED_STYLE_ID}="${scopeId}"]`,
          ))
        ) {
          styleElm.innerHTML = style;
        } else {
          styleElm = doc.createElement("style");
          styleElm.innerHTML = style;
          const nonce =
            (_a = plt.$nonce$) !== null && _a !== void 0
              ? _a
              : queryNonceMetaTagContent(doc);
          if (nonce != null) {
            styleElm.setAttribute("nonce", nonce);
          }
          if (
            appData.BUILD.hydrateServerSide ||
            appData.BUILD.hotModuleReplacement
          ) {
            styleElm.setAttribute(HYDRATED_STYLE_ID, scopeId);
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
          appliedStyles.add(scopeId);
        }
      }
    } else if (
      appData.BUILD.constructableCSS &&
      !styleContainerNode.adoptedStyleSheets.includes(style)
    ) {
      styleContainerNode.adoptedStyleSheets = [
        ...styleContainerNode.adoptedStyleSheets,
        style,
      ];
    }
  }
  return scopeId;
};
const attachStyles = (hostRef) => {
  const cmpMeta = hostRef.$cmpMeta$;
  const elm = hostRef.$hostElement$;
  const flags = cmpMeta.$flags$;
  const endAttachStyles = createTime("attachStyles", cmpMeta.$tagName$);
  const scopeId = addStyle(
    appData.BUILD.shadowDom && exports.supportsShadow && elm.shadowRoot
      ? elm.shadowRoot
      : elm.getRootNode(),
    cmpMeta,
    hostRef.$modeName$,
  );
  if (
    (appData.BUILD.shadowDom || appData.BUILD.scoped) &&
    appData.BUILD.cssAnnotations &&
    flags & 10
  ) {
    elm["s-sc"] = scopeId;
    elm.classList.add(scopeId + "-h");
    if (appData.BUILD.scoped && flags & 2) {
      elm.classList.add(scopeId + "-s");
    }
  }
  endAttachStyles();
};
const getScopeId = (cmp, mode) =>
  "sc-" +
  (appData.BUILD.mode && mode && cmp.$flags$ & 32
    ? cmp.$tagName$ + "-" + mode
    : cmp.$tagName$);
const convertScopedToShadow = (css) =>
  css.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g, "$1{");
const setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
  if (oldValue !== newValue) {
    let isProp = isMemberInElement(elm, memberName);
    let ln = memberName.toLowerCase();
    if (appData.BUILD.vdomClass && memberName === "class") {
      const classList = elm.classList;
      const oldClasses = parseClassList(oldValue);
      const newClasses = parseClassList(newValue);
      classList.remove(
        ...oldClasses.filter((c) => c && !newClasses.includes(c)),
      );
      classList.add(...newClasses.filter((c) => c && !oldClasses.includes(c)));
    } else if (appData.BUILD.vdomStyle && memberName === "style") {
      if (appData.BUILD.updatable) {
        for (const prop in oldValue) {
          if (!newValue || newValue[prop] == null) {
            if (!appData.BUILD.hydrateServerSide && prop.includes("-")) {
              elm.style.removeProperty(prop);
            } else {
              elm.style[prop] = "";
            }
          }
        }
      }
      for (const prop in newValue) {
        if (!oldValue || newValue[prop] !== oldValue[prop]) {
          if (!appData.BUILD.hydrateServerSide && prop.includes("-")) {
            elm.style.setProperty(prop, newValue[prop]);
          } else {
            elm.style[prop] = newValue[prop];
          }
        }
      }
    } else if (appData.BUILD.vdomKey && memberName === "key");
    else if (appData.BUILD.vdomRef && memberName === "ref") {
      if (newValue) {
        newValue(elm);
      }
    } else if (
      appData.BUILD.vdomListener &&
      (appData.BUILD.lazyLoad ? !isProp : !elm.__lookupSetter__(memberName)) &&
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
    } else if (appData.BUILD.vdomPropOrAttr) {
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
      if (appData.BUILD.vdomXlink) {
        if (ln !== (ln = ln.replace(/^xlink\:?/, ""))) {
          memberName = ln;
          xlink = true;
        }
      }
      if (newValue == null || newValue === false) {
        if (newValue !== false || elm.getAttribute(memberName) === "") {
          if (appData.BUILD.vdomXlink && xlink) {
            elm.removeAttributeNS(XLINK_NS, memberName);
          } else {
            elm.removeAttribute(memberName);
          }
        }
      } else if ((!isProp || flags & 4 || isSvg) && !isComplex) {
        newValue = newValue === true ? "" : newValue;
        if (appData.BUILD.vdomXlink && xlink) {
          elm.setAttributeNS(XLINK_NS, memberName, newValue);
        } else {
          elm.setAttribute(memberName, newValue);
        }
      }
    }
  }
};
const parseClassListRegex = /\s/;
const parseClassList = (value) =>
  !value ? [] : value.split(parseClassListRegex);
const CAPTURE_EVENT_SUFFIX = "Capture";
const CAPTURE_EVENT_REGEX = new RegExp(CAPTURE_EVENT_SUFFIX + "$");
const updateElement = (oldVnode, newVnode, isSvgMode, memberName) => {
  const elm =
    newVnode.$elm$.nodeType === 11 && newVnode.$elm$.host
      ? newVnode.$elm$.host
      : newVnode.$elm$;
  const oldVnodeAttrs = (oldVnode && oldVnode.$attrs$) || EMPTY_OBJ;
  const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
  if (appData.BUILD.updatable) {
    for (memberName in oldVnodeAttrs) {
      if (!(memberName in newVnodeAttrs)) {
        setAccessor(
          elm,
          memberName,
          oldVnodeAttrs[memberName],
          undefined,
          isSvgMode,
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
      isSvgMode,
      newVnode.$flags$,
    );
  }
};
let scopeId;
let contentRef;
let hostTagName;
let useNativeShadowDom = false;
let checkSlotFallbackVisibility = false;
let checkSlotRelocate = false;
let isSvgMode = false;
const createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
  const newVNode = newParentVNode.$children$[childIndex];
  let i = 0;
  let elm;
  let childNode;
  let oldVNode;
  if (appData.BUILD.slotRelocation && !useNativeShadowDom) {
    checkSlotRelocate = true;
    if (newVNode.$tag$ === "slot") {
      if (scopeId) {
        parentElm.classList.add(scopeId + "-s");
      }
      newVNode.$flags$ |= newVNode.$children$ ? 2 : 1;
    }
  }
  if (appData.BUILD.isDev && newVNode.$elm$) {
    consoleDevError(
      `The JSX ${newVNode.$text$ !== null ? `"${newVNode.$text$}" text` : `"${newVNode.$tag$}" element`} node should not be shared within the same renderer. The renderer caches element lookups in order to improve performance. However, a side effect from this is that the exact same JSX node should not be reused. For more information please see https://stenciljs.com/docs/templating-jsx#avoid-shared-jsx-nodes`,
    );
  }
  if (appData.BUILD.vdomText && newVNode.$text$ !== null) {
    elm = newVNode.$elm$ = doc.createTextNode(newVNode.$text$);
  } else if (appData.BUILD.slotRelocation && newVNode.$flags$ & 1) {
    elm = newVNode.$elm$ =
      appData.BUILD.isDebug || appData.BUILD.hydrateServerSide
        ? slotReferenceDebugNode(newVNode)
        : doc.createTextNode("");
  } else {
    if (appData.BUILD.svg && !isSvgMode) {
      isSvgMode = newVNode.$tag$ === "svg";
    }
    elm = newVNode.$elm$ = appData.BUILD.svg
      ? doc.createElementNS(
          isSvgMode ? SVG_NS : HTML_NS,
          appData.BUILD.slotRelocation && newVNode.$flags$ & 2
            ? "slot-fb"
            : newVNode.$tag$,
        )
      : doc.createElement(
          appData.BUILD.slotRelocation && newVNode.$flags$ & 2
            ? "slot-fb"
            : newVNode.$tag$,
        );
    if (appData.BUILD.svg && isSvgMode && newVNode.$tag$ === "foreignObject") {
      isSvgMode = false;
    }
    if (appData.BUILD.vdomAttribute) {
      updateElement(null, newVNode, isSvgMode);
    }
    if (
      (appData.BUILD.shadowDom || appData.BUILD.scoped) &&
      isDef(scopeId) &&
      elm["s-si"] !== scopeId
    ) {
      elm.classList.add((elm["s-si"] = scopeId));
    }
    if (newVNode.$children$) {
      for (i = 0; i < newVNode.$children$.length; ++i) {
        childNode = createElm(oldParentVNode, newVNode, i, elm);
        if (childNode) {
          elm.appendChild(childNode);
        }
      }
    }
    if (appData.BUILD.svg) {
      if (newVNode.$tag$ === "svg") {
        isSvgMode = false;
      } else if (elm.tagName === "foreignObject") {
        isSvgMode = true;
      }
    }
  }
  elm["s-hn"] = hostTagName;
  if (appData.BUILD.slotRelocation) {
    if (newVNode.$flags$ & (2 | 1)) {
      elm["s-sr"] = true;
      elm["s-cr"] = contentRef;
      elm["s-sn"] = newVNode.$name$ || "";
      oldVNode =
        oldParentVNode &&
        oldParentVNode.$children$ &&
        oldParentVNode.$children$[childIndex];
      if (
        oldVNode &&
        oldVNode.$tag$ === newVNode.$tag$ &&
        oldParentVNode.$elm$
      ) {
        if (appData.BUILD.experimentalSlotFixes) {
          relocateToHostRoot(oldParentVNode.$elm$);
        } else {
          putBackInOriginalLocation(oldParentVNode.$elm$, false);
        }
      }
    }
  }
  return elm;
};
const relocateToHostRoot = (parentElm) => {
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
          contentRefNode !== null && contentRefNode !== void 0
            ? contentRefNode
            : null,
        );
        childNode["s-sh"] = undefined;
        checkSlotRelocate = true;
      }
    }
  }
  plt.$flags$ &= ~1;
};
const putBackInOriginalLocation = (parentElm, recursive) => {
  plt.$flags$ |= 1;
  const oldSlotChildNodes = parentElm.childNodes;
  for (let i = oldSlotChildNodes.length - 1; i >= 0; i--) {
    const childNode = oldSlotChildNodes[i];
    if (childNode["s-hn"] !== hostTagName && childNode["s-ol"]) {
      parentReferenceNode(childNode).insertBefore(
        childNode,
        referenceNode(childNode),
      );
      childNode["s-ol"].remove();
      childNode["s-ol"] = undefined;
      childNode["s-sh"] = undefined;
      checkSlotRelocate = true;
    }
    if (recursive) {
      putBackInOriginalLocation(childNode, recursive);
    }
  }
  plt.$flags$ &= ~1;
};
const addVnodes = (
  parentElm,
  before,
  parentVNode,
  vnodes,
  startIdx,
  endIdx,
) => {
  let containerElm =
    (appData.BUILD.slotRelocation &&
      parentElm["s-cr"] &&
      parentElm["s-cr"].parentNode) ||
    parentElm;
  let childNode;
  if (
    appData.BUILD.shadowDom &&
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
          appData.BUILD.slotRelocation ? referenceNode(before) : before,
        );
      }
    }
  }
};
const removeVnodes = (vnodes, startIdx, endIdx) => {
  for (let index = startIdx; index <= endIdx; ++index) {
    const vnode = vnodes[index];
    if (vnode) {
      const elm = vnode.$elm$;
      nullifyVNodeRefs(vnode);
      if (elm) {
        if (appData.BUILD.slotRelocation) {
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
const updateChildren = (
  parentElm,
  oldCh,
  newVNode,
  newCh,
  isInitialRender = false,
) => {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let idxInOld = 0;
  let i = 0;
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
        appData.BUILD.slotRelocation &&
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
        appData.BUILD.slotRelocation &&
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
      if (appData.BUILD.vdomKey) {
        for (i = oldStartIdx; i <= oldEndIdx; ++i) {
          if (
            oldCh[i] &&
            oldCh[i].$key$ !== null &&
            oldCh[i].$key$ === newStartVnode.$key$
          ) {
            idxInOld = i;
            break;
          }
        }
      }
      if (appData.BUILD.vdomKey && idxInOld >= 0) {
        elmToMove = oldCh[idxInOld];
        if (elmToMove.$tag$ !== newStartVnode.$tag$) {
          node = createElm(
            oldCh && oldCh[newStartIdx],
            newVNode,
            idxInOld,
            parentElm,
          );
        } else {
          patch(elmToMove, newStartVnode, isInitialRender);
          oldCh[idxInOld] = undefined;
          node = elmToMove.$elm$;
        }
        newStartVnode = newCh[++newStartIdx];
      } else {
        node = createElm(
          oldCh && oldCh[newStartIdx],
          newVNode,
          newStartIdx,
          parentElm,
        );
        newStartVnode = newCh[++newStartIdx];
      }
      if (node) {
        if (appData.BUILD.slotRelocation) {
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
      newVNode,
      newCh,
      newStartIdx,
      newEndIdx,
    );
  } else if (appData.BUILD.updatable && newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
};
const isSameVnode = (leftVNode, rightVNode, isInitialRender = false) => {
  if (leftVNode.$tag$ === rightVNode.$tag$) {
    if (appData.BUILD.slotRelocation && leftVNode.$tag$ === "slot") {
      return leftVNode.$name$ === rightVNode.$name$;
    }
    if (appData.BUILD.vdomKey && !isInitialRender) {
      return leftVNode.$key$ === rightVNode.$key$;
    }
    return true;
  }
  return false;
};
const referenceNode = (node) => (node && node["s-ol"]) || node;
const parentReferenceNode = (node) =>
  (node["s-ol"] ? node["s-ol"] : node).parentNode;
const patch = (oldVNode, newVNode, isInitialRender = false) => {
  const elm = (newVNode.$elm$ = oldVNode.$elm$);
  const oldChildren = oldVNode.$children$;
  const newChildren = newVNode.$children$;
  const tag = newVNode.$tag$;
  const text = newVNode.$text$;
  let defaultHolder;
  if (!appData.BUILD.vdomText || text === null) {
    if (appData.BUILD.svg) {
      isSvgMode =
        tag === "svg" ? true : tag === "foreignObject" ? false : isSvgMode;
    }
    if (appData.BUILD.vdomAttribute || appData.BUILD.reflect) {
      if (appData.BUILD.slot && tag === "slot" && !useNativeShadowDom) {
        if (
          appData.BUILD.experimentalSlotFixes &&
          oldVNode.$name$ !== newVNode.$name$
        ) {
          newVNode.$elm$["s-sn"] = newVNode.$name$ || "";
          relocateToHostRoot(newVNode.$elm$.parentElement);
        }
      } else {
        updateElement(oldVNode, newVNode, isSvgMode);
      }
    }
    if (
      appData.BUILD.updatable &&
      oldChildren !== null &&
      newChildren !== null
    ) {
      updateChildren(elm, oldChildren, newVNode, newChildren, isInitialRender);
    } else if (newChildren !== null) {
      if (
        appData.BUILD.updatable &&
        appData.BUILD.vdomText &&
        oldVNode.$text$ !== null
      ) {
        elm.textContent = "";
      }
      addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
    } else if (appData.BUILD.updatable && oldChildren !== null) {
      removeVnodes(oldChildren, 0, oldChildren.length - 1);
    }
    if (appData.BUILD.svg && isSvgMode && tag === "svg") {
      isSvgMode = false;
    }
  } else if (
    appData.BUILD.vdomText &&
    appData.BUILD.slotRelocation &&
    (defaultHolder = elm["s-cr"])
  ) {
    defaultHolder.parentNode.textContent = text;
  } else if (appData.BUILD.vdomText && oldVNode.$text$ !== text) {
    elm.data = text;
  }
};
const updateFallbackSlotVisibility = (elm) => {
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
const relocateNodes = [];
const markSlotContentForRelocation = (elm) => {
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
          (!appData.BUILD.experimentalSlotFixes ||
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
const isNodeLocatedInSlot = (nodeToRelocate, slotName) => {
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
const nullifyVNodeRefs = (vNode) => {
  if (appData.BUILD.vdomRef) {
    vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(null);
    vNode.$children$ && vNode.$children$.map(nullifyVNodeRefs);
  }
};
const renderVdom = (hostRef, renderFnResults, isInitialLoad = false) => {
  var _a, _b, _c, _d, _e;
  const hostElm = hostRef.$hostElement$;
  const cmpMeta = hostRef.$cmpMeta$;
  const oldVNode = hostRef.$vnode$ || newVNode(null, null);
  const rootVnode = isHost(renderFnResults)
    ? renderFnResults
    : h(null, null, renderFnResults);
  hostTagName = hostElm.tagName;
  if (
    appData.BUILD.isDev &&
    Array.isArray(renderFnResults) &&
    renderFnResults.some(isHost)
  ) {
    throw new Error(
      `The <Host> must be the single root component.\nLooks like the render() function of "${hostTagName.toLowerCase()}" is returning an array that contains the <Host>.\n\nThe render() function should look like this instead:\n\nrender() {\n  // Do not return an array\n  return (\n    <Host>{content}</Host>\n  );\n}\n  `,
    );
  }
  if (appData.BUILD.reflect && cmpMeta.$attrsToReflect$) {
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
  rootVnode.$elm$ = oldVNode.$elm$ = appData.BUILD.shadowDom
    ? hostElm.shadowRoot || hostElm
    : hostElm;
  if (appData.BUILD.scoped || appData.BUILD.shadowDom) {
    scopeId = hostElm["s-sc"];
  }
  useNativeShadowDom = exports.supportsShadow && (cmpMeta.$flags$ & 1) !== 0;
  if (appData.BUILD.slotRelocation) {
    contentRef = hostElm["s-cr"];
    checkSlotFallbackVisibility = false;
  }
  patch(oldVNode, rootVnode, isInitialLoad);
  if (appData.BUILD.slotRelocation) {
    plt.$flags$ |= 1;
    if (checkSlotRelocate) {
      markSlotContentForRelocation(rootVnode.$elm$);
      for (const relocateData of relocateNodes) {
        const nodeToRelocate = relocateData.$nodeToRelocate$;
        if (!nodeToRelocate["s-ol"]) {
          const orgLocationNode =
            appData.BUILD.isDebug || appData.BUILD.hydrateServerSide
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
            !appData.BUILD.experimentalSlotFixes ||
            (insertBeforeNode && insertBeforeNode.nodeType === 1)
          ) {
            let orgLocationNode =
              (_a = nodeToRelocate["s-ol"]) === null || _a === void 0
                ? void 0
                : _a.previousSibling;
            while (orgLocationNode) {
              let refNode =
                (_b = orgLocationNode["s-nr"]) !== null && _b !== void 0
                  ? _b
                  : null;
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
                !appData.BUILD.experimentalSlotFixes &&
                !nodeToRelocate["s-hn"] &&
                nodeToRelocate["s-ol"]
              ) {
                nodeToRelocate["s-hn"] =
                  nodeToRelocate["s-ol"].parentNode.nodeName;
              }
              parentNodeRef.insertBefore(nodeToRelocate, insertBeforeNode);
              if (nodeToRelocate.nodeType === 1) {
                nodeToRelocate.hidden =
                  (_c = nodeToRelocate["s-ih"]) !== null && _c !== void 0
                    ? _c
                    : false;
              }
            }
          }
        } else {
          if (nodeToRelocate.nodeType === 1) {
            if (isInitialLoad) {
              nodeToRelocate["s-ih"] =
                (_d = nodeToRelocate.hidden) !== null && _d !== void 0
                  ? _d
                  : false;
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
  if (appData.BUILD.experimentalScopedSlotChanges && cmpMeta.$flags$ & 2) {
    for (const childNode of rootVnode.$elm$.childNodes) {
      if (childNode["s-hn"] !== hostTagName && !childNode["s-sh"]) {
        if (isInitialLoad && childNode["s-ih"] == null) {
          childNode["s-ih"] =
            (_e = childNode.hidden) !== null && _e !== void 0 ? _e : false;
        }
        childNode.hidden = true;
      }
    }
  }
  contentRef = undefined;
};
const slotReferenceDebugNode = (slotVNode) =>
  doc.createComment(
    `<slot${slotVNode.$name$ ? ' name="' + slotVNode.$name$ + '"' : ""}> (host=${hostTagName.toLowerCase()})`,
  );
const originalLocationDebugNode = (nodeToRelocate) =>
  doc.createComment(
    `org-location for ` +
      (nodeToRelocate.localName
        ? `<${nodeToRelocate.localName}> (host=${nodeToRelocate["s-hn"]})`
        : `[${nodeToRelocate.textContent}]`),
  );
const attachToAncestor = (hostRef, ancestorComponent) => {
  if (
    appData.BUILD.asyncLoading &&
    ancestorComponent &&
    !hostRef.$onRenderResolve$ &&
    ancestorComponent["s-p"]
  ) {
    ancestorComponent["s-p"].push(
      new Promise((r) => (hostRef.$onRenderResolve$ = r)),
    );
  }
};
const scheduleUpdate = (hostRef, isInitialLoad) => {
  if (appData.BUILD.taskQueue && appData.BUILD.updatable) {
    hostRef.$flags$ |= 16;
  }
  if (appData.BUILD.asyncLoading && hostRef.$flags$ & 4) {
    hostRef.$flags$ |= 512;
    return;
  }
  attachToAncestor(hostRef, hostRef.$ancestorComponent$);
  const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
  return appData.BUILD.taskQueue ? writeTask(dispatch) : dispatch();
};
const dispatchHooks = (hostRef, isInitialLoad) => {
  const elm = hostRef.$hostElement$;
  const endSchedule = createTime("scheduleUpdate", hostRef.$cmpMeta$.$tagName$);
  const instance = appData.BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
  let maybePromise;
  if (isInitialLoad) {
    if (appData.BUILD.lazyLoad && appData.BUILD.hostListener) {
      hostRef.$flags$ |= 256;
      if (hostRef.$queuedListeners$) {
        hostRef.$queuedListeners$.map(([methodName, event]) =>
          safeCall(instance, methodName, event),
        );
        hostRef.$queuedListeners$ = undefined;
      }
    }
    emitLifecycleEvent(elm, "componentWillLoad");
    if (appData.BUILD.cmpWillLoad) {
      maybePromise = safeCall(instance, "componentWillLoad");
    }
  } else {
    emitLifecycleEvent(elm, "componentWillUpdate");
    if (appData.BUILD.cmpWillUpdate) {
      maybePromise = safeCall(instance, "componentWillUpdate");
    }
  }
  emitLifecycleEvent(elm, "componentWillRender");
  if (appData.BUILD.cmpWillRender) {
    maybePromise = enqueue(maybePromise, () =>
      safeCall(instance, "componentWillRender"),
    );
  }
  endSchedule();
  return enqueue(maybePromise, () =>
    updateComponent(hostRef, instance, isInitialLoad),
  );
};
const enqueue = (maybePromise, fn) =>
  isPromisey(maybePromise) ? maybePromise.then(fn) : fn();
const isPromisey = (maybePromise) =>
  maybePromise instanceof Promise ||
  (maybePromise &&
    maybePromise.then &&
    typeof maybePromise.then === "function");
const updateComponent = async (hostRef, instance, isInitialLoad) => {
  var _a;
  const elm = hostRef.$hostElement$;
  const endUpdate = createTime("update", hostRef.$cmpMeta$.$tagName$);
  const rc = elm["s-rc"];
  if (appData.BUILD.style && isInitialLoad) {
    attachStyles(hostRef);
  }
  const endRender = createTime("render", hostRef.$cmpMeta$.$tagName$);
  if (appData.BUILD.isDev) {
    hostRef.$flags$ |= 1024;
  }
  if (appData.BUILD.hydrateServerSide) {
    await callRender(hostRef, instance, elm, isInitialLoad);
  } else {
    callRender(hostRef, instance, elm, isInitialLoad);
  }
  if (appData.BUILD.isDev) {
    hostRef.$renderCount$ =
      hostRef.$renderCount$ === undefined ? 1 : hostRef.$renderCount$ + 1;
    hostRef.$flags$ &= ~1024;
  }
  if (appData.BUILD.hydrateServerSide) {
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
  if (appData.BUILD.asyncLoading && rc) {
    rc.map((cb) => cb());
    elm["s-rc"] = undefined;
  }
  endRender();
  endUpdate();
  if (appData.BUILD.asyncLoading) {
    const childrenPromises =
      (_a = elm["s-p"]) !== null && _a !== void 0 ? _a : [];
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
let renderingRef = null;
const callRender = (hostRef, instance, elm, isInitialLoad) => {
  const allRenderFn = appData.BUILD.allRenderFn ? true : false;
  const lazyLoad = appData.BUILD.lazyLoad ? true : false;
  const taskQueue = appData.BUILD.taskQueue ? true : false;
  const updatable = appData.BUILD.updatable ? true : false;
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
    if (appData.BUILD.hasRenderFn || appData.BUILD.reflect) {
      if (appData.BUILD.vdomRender || appData.BUILD.reflect) {
        if (appData.BUILD.hydrateServerSide) {
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
const getRenderingRef = () => renderingRef;
const postUpdateComponent = (hostRef) => {
  const tagName = hostRef.$cmpMeta$.$tagName$;
  const elm = hostRef.$hostElement$;
  const endPostUpdate = createTime("postUpdate", tagName);
  const instance = appData.BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
  const ancestorComponent = hostRef.$ancestorComponent$;
  if (appData.BUILD.cmpDidRender) {
    if (appData.BUILD.isDev) {
      hostRef.$flags$ |= 1024;
    }
    safeCall(instance, "componentDidRender");
    if (appData.BUILD.isDev) {
      hostRef.$flags$ &= ~1024;
    }
  }
  emitLifecycleEvent(elm, "componentDidRender");
  if (!(hostRef.$flags$ & 64)) {
    hostRef.$flags$ |= 64;
    if (appData.BUILD.asyncLoading && appData.BUILD.cssAnnotations) {
      addHydratedFlag(elm);
    }
    if (appData.BUILD.cmpDidLoad) {
      if (appData.BUILD.isDev) {
        hostRef.$flags$ |= 2048;
      }
      safeCall(instance, "componentDidLoad");
      if (appData.BUILD.isDev) {
        hostRef.$flags$ &= ~2048;
      }
    }
    emitLifecycleEvent(elm, "componentDidLoad");
    endPostUpdate();
    if (appData.BUILD.asyncLoading) {
      hostRef.$onReadyResolve$(elm);
      if (!ancestorComponent) {
        appDidLoad(tagName);
      }
    }
  } else {
    if (appData.BUILD.cmpDidUpdate) {
      if (appData.BUILD.isDev) {
        hostRef.$flags$ |= 1024;
      }
      safeCall(instance, "componentDidUpdate");
      if (appData.BUILD.isDev) {
        hostRef.$flags$ &= ~1024;
      }
    }
    emitLifecycleEvent(elm, "componentDidUpdate");
    endPostUpdate();
  }
  if (appData.BUILD.method && appData.BUILD.lazyLoad) {
    hostRef.$onInstanceResolve$(elm);
  }
  if (appData.BUILD.asyncLoading) {
    if (hostRef.$onRenderResolve$) {
      hostRef.$onRenderResolve$();
      hostRef.$onRenderResolve$ = undefined;
    }
    if (hostRef.$flags$ & 512) {
      nextTick(() => scheduleUpdate(hostRef, false));
    }
    hostRef.$flags$ &= ~(4 | 512);
  }
};
const forceUpdate = (ref) => {
  if (appData.BUILD.updatable && (Build.isBrowser || Build.isTesting)) {
    const hostRef = getHostRef(ref);
    const isConnected = hostRef.$hostElement$.isConnected;
    if (isConnected && (hostRef.$flags$ & (2 | 16)) === 2) {
      scheduleUpdate(hostRef, false);
    }
    return isConnected;
  }
  return false;
};
const appDidLoad = (who) => {
  if (appData.BUILD.cssAnnotations) {
    addHydratedFlag(doc.documentElement);
  }
  if (appData.BUILD.asyncQueue) {
    plt.$flags$ |= 2;
  }
  nextTick(() =>
    emitEvent(win, "appload", { detail: { namespace: appData.NAMESPACE } }),
  );
  if (appData.BUILD.profile && performance.measure) {
    performance.measure(
      `[Stencil] ${appData.NAMESPACE} initial load (by ${who})`,
      "st:app:start",
    );
  }
};
const safeCall = (instance, method, arg) => {
  if (instance && instance[method]) {
    try {
      return instance[method](arg);
    } catch (e) {
      consoleError(e);
    }
  }
  return undefined;
};
const emitLifecycleEvent = (elm, lifecycleName) => {
  if (appData.BUILD.lifecycleDOMEvents) {
    emitEvent(elm, "stencil_" + lifecycleName, {
      bubbles: true,
      composed: true,
      detail: { namespace: appData.NAMESPACE },
    });
  }
};
const addHydratedFlag = (elm) =>
  appData.BUILD.hydratedClass
    ? elm.classList.add("hydrated")
    : appData.BUILD.hydratedAttribute
      ? elm.setAttribute("hydrated", "")
      : undefined;
const serverSideConnected = (elm) => {
  const children = elm.children;
  if (children != null) {
    for (let i = 0, ii = children.length; i < ii; i++) {
      const childElm = children[i];
      if (typeof childElm.connectedCallback === "function") {
        childElm.connectedCallback();
      }
      serverSideConnected(childElm);
    }
  }
};
const getValue = (ref, propName) =>
  getHostRef(ref).$instanceValues$.get(propName);
const setValue = (ref, propName, newVal, cmpMeta) => {
  const hostRef = getHostRef(ref);
  const elm = appData.BUILD.lazyLoad ? hostRef.$hostElement$ : ref;
  const oldVal = hostRef.$instanceValues$.get(propName);
  const flags = hostRef.$flags$;
  const instance = appData.BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
  newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
  const areBothNaN = Number.isNaN(oldVal) && Number.isNaN(newVal);
  const didValueChange = newVal !== oldVal && !areBothNaN;
  if (
    (!appData.BUILD.lazyLoad || !(flags & 8) || oldVal === undefined) &&
    didValueChange
  ) {
    hostRef.$instanceValues$.set(propName, newVal);
    if (appData.BUILD.isDev) {
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
    if (!appData.BUILD.lazyLoad || instance) {
      if (appData.BUILD.watchCallback && cmpMeta.$watchers$ && flags & 128) {
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
      if (appData.BUILD.updatable && (flags & (2 | 16)) === 2) {
        if (appData.BUILD.cmpShouldUpdate && instance.componentShouldUpdate) {
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
const proxyComponent = (Cstr, cmpMeta, flags) => {
  var _a;
  const prototype = Cstr.prototype;
  if (appData.BUILD.formAssociated && cmpMeta.$flags$ & 64 && flags & 1) {
    FORM_ASSOCIATED_CUSTOM_ELEMENT_CALLBACKS.forEach((cbName) =>
      Object.defineProperty(prototype, cbName, {
        value(...args) {
          const hostRef = getHostRef(this);
          const elm = appData.BUILD.lazyLoad ? hostRef.$hostElement$ : this;
          const instance = appData.BUILD.lazyLoad
            ? hostRef.$lazyInstance$
            : elm;
          if (!instance) {
            hostRef.$onReadyPromise$.then((instance) => {
              const cb = instance[cbName];
              typeof cb === "function" && cb.call(instance, ...args);
            });
          } else {
            const cb = instance[cbName];
            typeof cb === "function" && cb.call(instance, ...args);
          }
        },
      }),
    );
  }
  if (appData.BUILD.member && cmpMeta.$members$) {
    if (appData.BUILD.watchCallback && Cstr.watchers) {
      cmpMeta.$watchers$ = Cstr.watchers;
    }
    const members = Object.entries(cmpMeta.$members$);
    members.map(([memberName, [memberFlags]]) => {
      if (
        (appData.BUILD.prop || appData.BUILD.state) &&
        (memberFlags & 31 ||
          ((!appData.BUILD.lazyLoad || flags & 2) && memberFlags & 32))
      ) {
        Object.defineProperty(prototype, memberName, {
          get() {
            return getValue(this, memberName);
          },
          set(newValue) {
            if (appData.BUILD.isDev) {
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
        appData.BUILD.lazyLoad &&
        appData.BUILD.method &&
        flags & 1 &&
        memberFlags & 64
      ) {
        Object.defineProperty(prototype, memberName, {
          value(...args) {
            var _a;
            const ref = getHostRef(this);
            return (_a =
              ref === null || ref === void 0
                ? void 0
                : ref.$onInstancePromise$) === null || _a === void 0
              ? void 0
              : _a.then(() => {
                  var _a;
                  return (_a = ref.$lazyInstance$) === null || _a === void 0
                    ? void 0
                    : _a[memberName](...args);
                });
          },
        });
      }
    });
    if (
      appData.BUILD.observeAttribute &&
      (!appData.BUILD.lazyLoad || flags & 1)
    ) {
      const attrNameToPropName = new Map();
      prototype.attributeChangedCallback = function (
        attrName,
        oldValue,
        newValue,
      ) {
        plt.jmp(() => {
          var _a;
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
            const flags =
              hostRef === null || hostRef === void 0 ? void 0 : hostRef.$flags$;
            if (flags && !(flags & 8) && flags & 128 && newValue !== oldValue) {
              const elm = appData.BUILD.lazyLoad ? hostRef.$hostElement$ : this;
              const instance = appData.BUILD.lazyLoad
                ? hostRef.$lazyInstance$
                : elm;
              const entry =
                (_a = cmpMeta.$watchers$) === null || _a === void 0
                  ? void 0
                  : _a[attrName];
              entry === null || entry === void 0
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
          ...Object.keys(
            (_a = cmpMeta.$watchers$) !== null && _a !== void 0 ? _a : {},
          ),
          ...members
            .filter(([_, m]) => m[0] & 15)
            .map(([propName, m]) => {
              var _a;
              const attrName = m[1] || propName;
              attrNameToPropName.set(attrName, propName);
              if (appData.BUILD.reflect && m[0] & 512) {
                (_a = cmpMeta.$attrsToReflect$) === null || _a === void 0
                  ? void 0
                  : _a.push([propName, attrName]);
              }
              return attrName;
            }),
        ]),
      );
    }
  }
  return Cstr;
};
const initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId) => {
  let Cstr;
  if ((hostRef.$flags$ & 32) === 0) {
    hostRef.$flags$ |= 32;
    if (appData.BUILD.lazyLoad || appData.BUILD.hydrateClientSide) {
      Cstr = loadModule(cmpMeta);
      if (Cstr.then) {
        const endLoad = uniqueTime(
          `st:load:${cmpMeta.$tagName$}:${hostRef.$modeName$}`,
          `[Stencil] Load module for <${cmpMeta.$tagName$}>`,
        );
        Cstr = await Cstr;
        endLoad();
      }
      if ((appData.BUILD.isDev || appData.BUILD.isDebug) && !Cstr) {
        throw new Error(
          `Constructor for "${cmpMeta.$tagName$}#${hostRef.$modeName$}" was not found`,
        );
      }
      if (appData.BUILD.member && !Cstr.isProxied) {
        if (appData.BUILD.watchCallback) {
          cmpMeta.$watchers$ = Cstr.watchers;
        }
        proxyComponent(Cstr, cmpMeta, 2);
        Cstr.isProxied = true;
      }
      const endNewInstance = createTime("createInstance", cmpMeta.$tagName$);
      if (appData.BUILD.member) {
        hostRef.$flags$ |= 8;
      }
      try {
        new Cstr(hostRef);
      } catch (e) {
        consoleError(e);
      }
      if (appData.BUILD.member) {
        hostRef.$flags$ &= ~8;
      }
      if (appData.BUILD.watchCallback) {
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
    if (appData.BUILD.style && Cstr.style) {
      let style = Cstr.style;
      if (appData.BUILD.mode && typeof style !== "string") {
        style = style[(hostRef.$modeName$ = computeMode(elm))];
        if (appData.BUILD.hydrateServerSide && hostRef.$modeName$) {
          elm.setAttribute("s-mode", hostRef.$modeName$);
        }
      }
      const scopeId = getScopeId(cmpMeta, hostRef.$modeName$);
      if (!styles.has(scopeId)) {
        const endRegisterStyles = createTime(
          "registerStyles",
          cmpMeta.$tagName$,
        );
        if (
          !appData.BUILD.hydrateServerSide &&
          appData.BUILD.shadowDom &&
          appData.BUILD.shadowDomShim &&
          cmpMeta.$flags$ & 8
        ) {
          style = await Promise.resolve()
            .then(function () {
              return require("./shadow-css.js");
            })
            .then((m) => m.scopeCss(style, scopeId, false));
        }
        registerStyle(scopeId, style, !!(cmpMeta.$flags$ & 1));
        endRegisterStyles();
      }
    }
  }
  const ancestorComponent = hostRef.$ancestorComponent$;
  const schedule = () => scheduleUpdate(hostRef, true);
  if (
    appData.BUILD.asyncLoading &&
    ancestorComponent &&
    ancestorComponent["s-rc"]
  ) {
    ancestorComponent["s-rc"].push(schedule);
  } else {
    schedule();
  }
};
const fireConnectedCallback = (instance) => {
  if (appData.BUILD.lazyLoad && appData.BUILD.connectedCallback) {
    safeCall(instance, "connectedCallback");
  }
};
const connectedCallback = (elm) => {
  if ((plt.$flags$ & 1) === 0) {
    const hostRef = getHostRef(elm);
    const cmpMeta = hostRef.$cmpMeta$;
    const endConnected = createTime("connectedCallback", cmpMeta.$tagName$);
    if (appData.BUILD.hostListenerTargetParent) {
      addHostEventListeners(elm, hostRef, cmpMeta.$listeners$, true);
    }
    if (!(hostRef.$flags$ & 1)) {
      hostRef.$flags$ |= 1;
      let hostId;
      if (appData.BUILD.hydrateClientSide) {
        hostId = elm.getAttribute(HYDRATE_ID);
        if (hostId) {
          if (
            appData.BUILD.shadowDom &&
            exports.supportsShadow &&
            cmpMeta.$flags$ & 1
          ) {
            const scopeId = appData.BUILD.mode
              ? addStyle(elm.shadowRoot, cmpMeta, elm.getAttribute("s-mode"))
              : addStyle(elm.shadowRoot, cmpMeta);
            elm.classList.remove(scopeId + "-h", scopeId + "-s");
          }
          initializeClientHydrate(elm, cmpMeta.$tagName$, hostId, hostRef);
        }
      }
      if (appData.BUILD.slotRelocation && !hostId) {
        if (
          appData.BUILD.hydrateServerSide ||
          ((appData.BUILD.slot || appData.BUILD.shadowDom) &&
            cmpMeta.$flags$ & (4 | 8))
        ) {
          setContentReference(elm);
        }
      }
      if (appData.BUILD.asyncLoading) {
        let ancestorComponent = elm;
        while (
          (ancestorComponent =
            ancestorComponent.parentNode || ancestorComponent.host)
        ) {
          if (
            (appData.BUILD.hydrateClientSide &&
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
      if (
        appData.BUILD.prop &&
        !appData.BUILD.hydrateServerSide &&
        cmpMeta.$members$
      ) {
        Object.entries(cmpMeta.$members$).map(([memberName, [memberFlags]]) => {
          if (memberFlags & 31 && elm.hasOwnProperty(memberName)) {
            const value = elm[memberName];
            delete elm[memberName];
            elm[memberName] = value;
          }
        });
      }
      if (appData.BUILD.initializeNextTick) {
        nextTick(() => initializeComponent(elm, hostRef, cmpMeta));
      } else {
        initializeComponent(elm, hostRef, cmpMeta);
      }
    } else {
      addHostEventListeners(elm, hostRef, cmpMeta.$listeners$, false);
      if (
        hostRef === null || hostRef === void 0 ? void 0 : hostRef.$lazyInstance$
      ) {
        fireConnectedCallback(hostRef.$lazyInstance$);
      } else if (
        hostRef === null || hostRef === void 0
          ? void 0
          : hostRef.$onReadyPromise$
      ) {
        hostRef.$onReadyPromise$.then(() =>
          fireConnectedCallback(hostRef.$lazyInstance$),
        );
      }
    }
    endConnected();
  }
};
const setContentReference = (elm) => {
  const contentRefElm = (elm["s-cr"] = doc.createComment(
    appData.BUILD.isDebug ? `content-ref (host=${elm.localName})` : "",
  ));
  contentRefElm["s-cn"] = true;
  elm.insertBefore(contentRefElm, elm.firstChild);
};
const disconnectInstance = (instance) => {
  if (appData.BUILD.lazyLoad && appData.BUILD.disconnectedCallback) {
    safeCall(instance, "disconnectedCallback");
  }
  if (appData.BUILD.cmpDidUnload) {
    safeCall(instance, "componentDidUnload");
  }
};
const disconnectedCallback = async (elm) => {
  if ((plt.$flags$ & 1) === 0) {
    const hostRef = getHostRef(elm);
    if (appData.BUILD.hostListener) {
      if (hostRef.$rmListeners$) {
        hostRef.$rmListeners$.map((rmListener) => rmListener());
        hostRef.$rmListeners$ = undefined;
      }
    }
    if (!appData.BUILD.lazyLoad) {
      disconnectInstance(elm);
    } else if (
      hostRef === null || hostRef === void 0 ? void 0 : hostRef.$lazyInstance$
    ) {
      disconnectInstance(hostRef.$lazyInstance$);
    } else if (
      hostRef === null || hostRef === void 0 ? void 0 : hostRef.$onReadyPromise$
    ) {
      hostRef.$onReadyPromise$.then(() =>
        disconnectInstance(hostRef.$lazyInstance$),
      );
    }
  }
};
const patchPseudoShadowDom = (hostElementPrototype, descriptorPrototype) => {
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
const patchCloneNode = (HostElementPrototype) => {
  const orgCloneNode = HostElementPrototype.cloneNode;
  HostElementPrototype.cloneNode = function (deep) {
    const srcNode = this;
    const isShadowDom = appData.BUILD.shadowDom
      ? srcNode.shadowRoot && exports.supportsShadow
      : false;
    const clonedNode = orgCloneNode.call(srcNode, isShadowDom ? deep : false);
    if (appData.BUILD.slot && !isShadowDom && deep) {
      let i = 0;
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
      for (; i < srcNode.childNodes.length; i++) {
        slotted = srcNode.childNodes[i]["s-nr"];
        nonStencilNode = stencilPrivates.every(
          (privateField) => !srcNode.childNodes[i][privateField],
        );
        if (slotted) {
          if (appData.BUILD.appendChildSlotFix && clonedNode.__appendChild) {
            clonedNode.__appendChild(slotted.cloneNode(true));
          } else {
            clonedNode.appendChild(slotted.cloneNode(true));
          }
        }
        if (nonStencilNode) {
          clonedNode.appendChild(srcNode.childNodes[i].cloneNode(true));
        }
      }
    }
    return clonedNode;
  };
};
const patchSlotAppendChild = (HostElementPrototype) => {
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
const patchSlotRemoveChild = (ElementPrototype) => {
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
const patchSlotPrepend = (HostElementPrototype) => {
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
const patchSlotAppend = (HostElementPrototype) => {
  HostElementPrototype.append = function (...newChildren) {
    newChildren.forEach((newChild) => {
      if (typeof newChild === "string") {
        newChild = this.ownerDocument.createTextNode(newChild);
      }
      this.appendChild(newChild);
    });
  };
};
const patchSlotInsertAdjacentHTML = (HostElementPrototype) => {
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
const patchSlotInsertAdjacentText = (HostElementPrototype) => {
  HostElementPrototype.insertAdjacentText = function (position, text) {
    this.insertAdjacentHTML(position, text);
  };
};
const patchSlotInsertAdjacentElement = (HostElementPrototype) => {
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
const patchTextContent = (hostElementPrototype) => {
  const descriptor = Object.getOwnPropertyDescriptor(
    Node.prototype,
    "textContent",
  );
  Object.defineProperty(hostElementPrototype, "__textContent", descriptor);
  if (appData.BUILD.experimentalScopedSlotChanges) {
    Object.defineProperty(hostElementPrototype, "textContent", {
      get() {
        const slotRefNodes = getAllChildSlotNodes(this.childNodes);
        const textContent = slotRefNodes
          .map((node) => {
            var _a, _b;
            const text = [];
            let slotContent = node.nextSibling;
            while (slotContent && slotContent["s-sn"] === node["s-sn"]) {
              if (slotContent.nodeType === 3 || slotContent.nodeType === 1) {
                text.push(
                  (_b =
                    (_a = slotContent.textContent) === null || _a === void 0
                      ? void 0
                      : _a.trim()) !== null && _b !== void 0
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
          ((_a =
            slotNode === null || slotNode === void 0
              ? void 0
              : slotNode.nextSibling) === null || _a === void 0
            ? void 0
            : _a.nodeType) === 3
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
          ((_a =
            slotNode === null || slotNode === void 0
              ? void 0
              : slotNode.nextSibling) === null || _a === void 0
            ? void 0
            : _a.nodeType) === 3
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
const patchChildSlotNodes = (elm, cmpMeta) => {
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
          for (let i = 0; i < childNodes.length; i++) {
            const slot = childNodes[i]["s-nr"];
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
const getAllChildSlotNodes = (childNodes) => {
  const slotRefNodes = [];
  for (const childNode of Array.from(childNodes)) {
    if (childNode["s-sr"]) {
      slotRefNodes.push(childNode);
    }
    slotRefNodes.push(...getAllChildSlotNodes(childNode.childNodes));
  }
  return slotRefNodes;
};
const getSlotName = (node) =>
  node["s-sn"] || (node.nodeType === 1 && node.getAttribute("slot")) || "";
const getHostSlotNode = (childNodes, slotName) => {
  let i = 0;
  let childNode;
  for (; i < childNodes.length; i++) {
    childNode = childNodes[i];
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
const getHostSlotChildNodes = (n, slotName) => {
  const childNodes = [n];
  while ((n = n.nextSibling) && n["s-sn"] === slotName) {
    childNodes.push(n);
  }
  return childNodes;
};
const defineCustomElement = (Cstr, compactMeta) => {
  customElements.define(compactMeta[1], proxyCustomElement(Cstr, compactMeta));
};
const proxyCustomElement = (Cstr, compactMeta) => {
  const cmpMeta = { $flags$: compactMeta[0], $tagName$: compactMeta[1] };
  if (appData.BUILD.member) {
    cmpMeta.$members$ = compactMeta[2];
  }
  if (appData.BUILD.hostListener) {
    cmpMeta.$listeners$ = compactMeta[3];
  }
  if (appData.BUILD.watchCallback) {
    cmpMeta.$watchers$ = Cstr.$watchers$;
  }
  if (appData.BUILD.reflect) {
    cmpMeta.$attrsToReflect$ = [];
  }
  if (
    appData.BUILD.shadowDom &&
    !exports.supportsShadow &&
    cmpMeta.$flags$ & 1
  ) {
    cmpMeta.$flags$ |= 8;
  }
  if (appData.BUILD.experimentalSlotFixes) {
    if (appData.BUILD.scoped && cmpMeta.$flags$ & 2) {
      patchPseudoShadowDom(Cstr.prototype, cmpMeta);
    }
  } else {
    if (appData.BUILD.slotChildNodesFix) {
      patchChildSlotNodes(Cstr.prototype, cmpMeta);
    }
    if (appData.BUILD.cloneNodeFix) {
      patchCloneNode(Cstr.prototype);
    }
    if (appData.BUILD.appendChildSlotFix) {
      patchSlotAppendChild(Cstr.prototype);
    }
    if (appData.BUILD.scopedSlotTextContentFix && cmpMeta.$flags$ & 2) {
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
      if (appData.BUILD.connectedCallback && originalConnectedCallback) {
        originalConnectedCallback.call(this);
      }
    },
    disconnectedCallback() {
      disconnectedCallback(this);
      if (appData.BUILD.disconnectedCallback && originalDisconnectedCallback) {
        originalDisconnectedCallback.call(this);
      }
    },
    __attachShadow() {
      if (exports.supportsShadow) {
        if (appData.BUILD.shadowDelegatesFocus) {
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
const forceModeUpdate = (elm) => {
  if (appData.BUILD.style && appData.BUILD.mode && !appData.BUILD.lazyLoad) {
    const mode = computeMode(elm);
    const hostRef = getHostRef(elm);
    if (hostRef.$modeName$ !== mode) {
      const cmpMeta = hostRef.$cmpMeta$;
      const oldScopeId = elm["s-sc"];
      const scopeId = getScopeId(cmpMeta, mode);
      const style = elm.constructor.style[mode];
      cmpMeta.$flags$;
      if (style) {
        if (!styles.has(scopeId)) {
          registerStyle(scopeId, style);
        }
        hostRef.$modeName$ = mode;
        elm.classList.remove(oldScopeId + "-h", oldScopeId + "-s");
        attachStyles(hostRef);
        forceUpdate(elm);
      }
    }
  }
};
const hmrStart = (hostElement, cmpMeta, hmrVersionId) => {
  const hostRef = getHostRef(hostElement);
  hostRef.$flags$ = 1;
  initializeComponent(hostElement, hostRef, cmpMeta);
};
const bootstrapLazy = (lazyBundles, options = {}) => {
  var _a;
  if (appData.BUILD.profile && performance.mark) {
    performance.mark("st:app:start");
  }
  installDevTools();
  const endBootstrap = createTime("bootstrapLazy");
  const cmpTags = [];
  const exclude = options.exclude || [];
  const customElements = win.customElements;
  const head = doc.head;
  const metaCharset = head.querySelector("meta[charset]");
  const dataStyles = doc.createElement("style");
  const deferredConnectedCallbacks = [];
  const styles = doc.querySelectorAll(`[${HYDRATED_STYLE_ID}]`);
  let appLoadFallback;
  let isBootstrapping = true;
  let i = 0;
  Object.assign(plt, options);
  plt.$resourcesUrl$ = new URL(options.resourcesUrl || "./", doc.baseURI).href;
  if (appData.BUILD.asyncQueue) {
    if (options.syncQueue) {
      plt.$flags$ |= 4;
    }
  }
  if (appData.BUILD.hydrateClientSide) {
    plt.$flags$ |= 2;
  }
  if (appData.BUILD.hydrateClientSide && appData.BUILD.shadowDom) {
    for (; i < styles.length; i++) {
      registerStyle(
        styles[i].getAttribute(HYDRATED_STYLE_ID),
        convertScopedToShadow(styles[i].innerHTML),
      );
    }
  }
  let hasSlotRelocation = false;
  lazyBundles.map((lazyBundle) => {
    lazyBundle[1].map((compactMeta) => {
      var _a;
      const cmpMeta = {
        $flags$: compactMeta[0],
        $tagName$: compactMeta[1],
        $members$: compactMeta[2],
        $listeners$: compactMeta[3],
      };
      if (cmpMeta.$flags$ & 4) {
        hasSlotRelocation = true;
      }
      if (appData.BUILD.member) {
        cmpMeta.$members$ = compactMeta[2];
      }
      if (appData.BUILD.hostListener) {
        cmpMeta.$listeners$ = compactMeta[3];
      }
      if (appData.BUILD.reflect) {
        cmpMeta.$attrsToReflect$ = [];
      }
      if (appData.BUILD.watchCallback) {
        cmpMeta.$watchers$ =
          (_a = compactMeta[4]) !== null && _a !== void 0 ? _a : {};
      }
      if (
        appData.BUILD.shadowDom &&
        !exports.supportsShadow &&
        cmpMeta.$flags$ & 1
      ) {
        cmpMeta.$flags$ |= 8;
      }
      const tagName =
        appData.BUILD.transformTagName && options.transformTagName
          ? options.transformTagName(cmpMeta.$tagName$)
          : cmpMeta.$tagName$;
      const HostElement = class extends HTMLElement {
        constructor(self) {
          super(self);
          self = this;
          registerHost(self, cmpMeta);
          if (appData.BUILD.shadowDom && cmpMeta.$flags$ & 1) {
            if (exports.supportsShadow) {
              if (appData.BUILD.shadowDelegatesFocus) {
                self.attachShadow({
                  mode: "open",
                  delegatesFocus: !!(cmpMeta.$flags$ & 16),
                });
              } else {
                self.attachShadow({ mode: "open" });
              }
            } else if (
              !appData.BUILD.hydrateServerSide &&
              !("shadowRoot" in self)
            ) {
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
      if (appData.BUILD.experimentalSlotFixes) {
        if (appData.BUILD.scoped && cmpMeta.$flags$ & 2) {
          patchPseudoShadowDom(HostElement.prototype, cmpMeta);
        }
      } else {
        if (appData.BUILD.slotChildNodesFix) {
          patchChildSlotNodes(HostElement.prototype, cmpMeta);
        }
        if (appData.BUILD.cloneNodeFix) {
          patchCloneNode(HostElement.prototype);
        }
        if (appData.BUILD.appendChildSlotFix) {
          patchSlotAppendChild(HostElement.prototype);
        }
        if (appData.BUILD.scopedSlotTextContentFix && cmpMeta.$flags$ & 2) {
          patchTextContent(HostElement.prototype);
        }
      }
      if (appData.BUILD.formAssociated && cmpMeta.$flags$ & 64) {
        HostElement.formAssociated = true;
      }
      if (appData.BUILD.hotModuleReplacement) {
        HostElement.prototype["s-hmr"] = function (hmrVersionId) {
          hmrStart(this, cmpMeta);
        };
      }
      cmpMeta.$lazyBundleId$ = lazyBundle[0];
      if (!exclude.includes(tagName) && !customElements.get(tagName)) {
        cmpTags.push(tagName);
        customElements.define(tagName, proxyComponent(HostElement, cmpMeta, 1));
      }
    });
  });
  if (cmpTags.length > 0) {
    if (hasSlotRelocation) {
      dataStyles.innerHTML += SLOT_FB_CSS;
    }
    if (
      appData.BUILD.invisiblePrehydration &&
      (appData.BUILD.hydratedClass || appData.BUILD.hydratedAttribute)
    ) {
      dataStyles.innerHTML += cmpTags + HYDRATED_CSS;
    }
    if (dataStyles.innerHTML.length) {
      dataStyles.setAttribute("data-styles", "");
      const nonce =
        (_a = plt.$nonce$) !== null && _a !== void 0
          ? _a
          : queryNonceMetaTagContent(doc);
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
    if (appData.BUILD.profile) {
      plt.jmp(() => (appLoadFallback = setTimeout(appDidLoad, 30, "timeout")));
    } else {
      plt.jmp(() => (appLoadFallback = setTimeout(appDidLoad, 30)));
    }
  }
  endBootstrap();
};
const Fragment = (_, children) => children;
const addHostEventListeners = (
  elm,
  hostRef,
  listeners,
  attachParentListeners,
) => {
  if (appData.BUILD.hostListener && listeners) {
    if (appData.BUILD.hostListenerTargetParent) {
      if (attachParentListeners) {
        listeners = listeners.filter(([flags]) => flags & 32);
      } else {
        listeners = listeners.filter(([flags]) => !(flags & 32));
      }
    }
    listeners.map(([flags, name, method]) => {
      const target = appData.BUILD.hostListenerTarget
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
const hostListenerProxy = (hostRef, methodName) => (ev) => {
  try {
    if (appData.BUILD.lazyLoad) {
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
const getHostListenerTarget = (elm, flags) => {
  if (appData.BUILD.hostListenerTargetDocument && flags & 4) return doc;
  if (appData.BUILD.hostListenerTargetWindow && flags & 8) return win;
  if (appData.BUILD.hostListenerTargetBody && flags & 16) return doc.body;
  if (appData.BUILD.hostListenerTargetParent && flags & 32)
    return elm.parentElement;
  return elm;
};
const hostListenerOpts = (flags) => ({
  passive: (flags & 1) !== 0,
  capture: (flags & 2) !== 0,
});
const setNonce = (nonce) => (plt.$nonce$ = nonce);
const setPlatformOptions = (opts) => Object.assign(plt, opts);
const insertVdomAnnotations = (doc, staticComponents) => {
  if (doc != null) {
    const docData = {
      hostIds: 0,
      rootLevelIds: 0,
      staticComponents: new Set(staticComponents),
    };
    const orgLocationNodes = [];
    parseVNodeAnnotations(doc, doc.body, docData, orgLocationNodes);
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
                (_a = nodeRef.nodeValue) === null || _a === void 0
                  ? void 0
                  : _a.trim();
              if (textContent === "") {
                orgLocationNode.remove();
                return;
              }
            }
            const commentBeforeTextNode = doc.createComment(childId);
            commentBeforeTextNode.nodeValue = `${TEXT_NODE_ID}.${childId}`;
            (_b = nodeRef.parentNode) === null || _b === void 0
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
const parseVNodeAnnotations = (doc, node, docData, orgLocationNodes) => {
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
          doc,
          childNode,
          hostRef.$vnode$,
          docData,
          cmpData,
        );
      }
      parseVNodeAnnotations(doc, childNode, docData, orgLocationNodes);
    });
  }
};
const insertVNodeAnnotations = (doc, hostElm, vnode, docData, cmpData) => {
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
          doc,
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
const insertChildVNodeAnnotations = (
  doc,
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
    const nodeName =
      parentNode === null || parentNode === void 0
        ? void 0
        : parentNode.nodeName;
    if (nodeName !== "STYLE" && nodeName !== "SCRIPT") {
      const textNodeId = `${TEXT_NODE_ID}.${childId}`;
      const commentBeforeTextNode = doc.createComment(textNodeId);
      parentNode === null || parentNode === void 0
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
    vnodeChild.$children$.forEach((vnode, index) => {
      insertChildVNodeAnnotations(
        doc,
        vnode,
        cmpData,
        hostId,
        childDepth,
        index,
      );
    });
  }
};
const getHostRef = (elm) => hostRefs.get(elm);
const registerInstance = (lazyInstance, hostRef) => {
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
const registerHost = (elm, cmpMeta) => {
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
let customError;
const defaultConsoleError = (e) => {
  caughtErrors.push(e);
};
const consoleError = (e, el) => (customError || defaultConsoleError)(e, el);
const consoleDevError = (...e) => {
  caughtErrors.push(new Error(e.join(", ")));
};
const consoleDevWarn = (...args) => {
  const params = args.filter(
    (a) =>
      typeof a === "string" || typeof a === "number" || typeof a === "boolean",
  );
  console.warn(...params);
};
const consoleDevInfo = (..._) => {};
const setErrorHandler = (handler) => (customError = handler);
function resetTaskQueue() {
  queuedTicks.length = 0;
  queuedWriteTasks.length = 0;
  queuedReadTasks.length = 0;
  moduleLoaded.clear();
  queuedLoadModules.length = 0;
  caughtErrors.length = 0;
}
const nextTick = (cb) => {
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
    const err = caughtErrors[0];
    if (err == null) {
      throw new Error("Error!");
    }
    if (typeof err === "string") {
      throw new Error(err);
    }
    throw err;
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
          for (let i = 0; i < queuedLoadModules.length; i++) {
            if (queuedLoadModules[i].bundleId === bundleId) {
              queuedLoadModules[i].resolve();
              queuedLoadModules.splice(i, 1);
              i--;
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
const win = mockDoc.setupGlobal(global);
const doc = win.document;
exports.supportsShadow = true;
const plt = {
  $flags$: 0,
  $resourcesUrl$: "",
  jmp: (h) => h(),
  raf: (h) => requestAnimationFrame(h),
  ael: (el, eventName, listener, opts) =>
    el.addEventListener(eventName, listener, opts),
  rel: (el, eventName, listener, opts) =>
    el.removeEventListener(eventName, listener, opts),
  ce: (eventName, opts) => new win.CustomEvent(eventName, opts),
};
const setPlatformHelpers = (helpers) => {
  Object.assign(plt, helpers);
};
const supportsListenerOptions = true;
const supportsConstructableStylesheets = false;
const setSupportsShadowDom = (supports) => {
  exports.supportsShadow = supports;
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
    plt.$orgLocNodes$ = undefined;
  }
  win.location.href = plt.$resourcesUrl$ = `http://testing.stenciljs.com/`;
  resetTaskQueue();
  stopAutoApplyChanges();
  cstrs.clear();
}
let isAutoApplyingChanges = false;
let autoApplyTimer = undefined;
function stopAutoApplyChanges() {
  isAutoApplyingChanges = false;
  if (autoApplyTimer) {
    clearTimeout(autoApplyTimer);
    autoApplyTimer = undefined;
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
const registerComponents = (Cstrs) => {
  Cstrs.forEach((Cstr) => {
    cstrs.set(Cstr.COMPILER_META.tagName, Cstr);
  });
};
function registerModule(bundleId, Cstr) {
  moduleLoaded.set(bundleId, Cstr);
}
const isMemberInElement = (elm, memberName) => {
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
Object.defineProperty(exports, "Env", {
  enumerable: true,
  get: function () {
    return appData.Env;
  },
});
exports.Build = Build;
exports.Fragment = Fragment;
exports.Host = Host;
exports.addHostEventListeners = addHostEventListeners;
exports.bootstrapLazy = bootstrapLazy;
exports.connectedCallback = connectedCallback;
exports.consoleDevError = consoleDevError;
exports.consoleDevInfo = consoleDevInfo;
exports.consoleDevWarn = consoleDevWarn;
exports.consoleError = consoleError;
exports.createEvent = createEvent;
exports.defineCustomElement = defineCustomElement;
exports.disconnectedCallback = disconnectedCallback;
exports.doc = doc;
exports.flushAll = flushAll;
exports.flushLoadModule = flushLoadModule;
exports.flushQueue = flushQueue;
exports.forceModeUpdate = forceModeUpdate;
exports.forceUpdate = forceUpdate;
exports.getAssetPath = getAssetPath;
exports.getElement = getElement;
exports.getHostRef = getHostRef;
exports.getMode = getMode;
exports.getRenderingRef = getRenderingRef;
exports.getValue = getValue;
exports.h = h;
exports.insertVdomAnnotations = insertVdomAnnotations;
exports.isMemberInElement = isMemberInElement;
exports.loadModule = loadModule;
exports.modeResolutionChain = modeResolutionChain;
exports.nextTick = nextTick;
exports.parsePropertyValue = parsePropertyValue;
exports.plt = plt;
exports.postUpdateComponent = postUpdateComponent;
exports.proxyComponent = proxyComponent;
exports.proxyCustomElement = proxyCustomElement;
exports.readTask = readTask;
exports.registerComponents = registerComponents;
exports.registerHost = registerHost;
exports.registerInstance = registerInstance;
exports.registerModule = registerModule;
exports.renderVdom = renderVdom;
exports.resetPlatform = resetPlatform;
exports.setAssetPath = setAssetPath;
exports.setErrorHandler = setErrorHandler;
exports.setMode = setMode;
exports.setNonce = setNonce;
exports.setPlatformHelpers = setPlatformHelpers;
exports.setPlatformOptions = setPlatformOptions;
exports.setSupportsShadowDom = setSupportsShadowDom;
exports.setValue = setValue;
exports.startAutoApplyChanges = startAutoApplyChanges;
exports.stopAutoApplyChanges = stopAutoApplyChanges;
exports.styles = styles;
exports.supportsConstructableStylesheets = supportsConstructableStylesheets;
exports.supportsListenerOptions = supportsListenerOptions;
exports.win = win;
exports.writeTask = writeTask;
