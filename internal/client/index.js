let scopeId;
let contentRef;
let hostTagName;
let customError;
let i = 0;
let useNativeShadowDom = false;
let checkSlotFallbackVisibility = false;
let checkSlotRelocate = false;
let isSvgMode = false;
let renderingRef = null;
let queueCongestion = 0;
let queuePending = false;
import { BUILD, NAMESPACE } from "@stencil/core/internal/app-data";
const Build = {
  isDev: BUILD.isDev ? true : false,
  isBrowser: true,
  isServer: false,
  isTesting: BUILD.isTesting ? true : false,
};
const getAssetPath = (path) => {
  const assetUrl = new URL(path, plt.$resourcesUrl$);
  return assetUrl.origin !== win.location.origin
    ? assetUrl.href
    : assetUrl.pathname;
};
const setAssetPath = (path) => (plt.$resourcesUrl$ = path);
const createTime = (fnName, tagName = "") => {
  if (BUILD.profile && performance.mark) {
    const key = `st:${fnName}:${tagName}:${i++}`;
    performance.mark(key);
    return () => performance.measure(`[Stencil] ${fnName}() <${tagName}>`, key);
  } else {
    return () => {};
  }
};
const uniqueTime = (key, measureText) => {
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
          BUILD.isDev &&
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
const newVNode = (tag, text) => {
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
    const vnodeData = Object.assign({}, node.vattrs);
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
const getElement = (ref) =>
  BUILD.lazyLoad ? getHostRef(ref).$hostElement$ : ref;
const createEvent = (ref, name, flags) => {
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
const emitEvent = (elm, name, opts) => {
  const ev = plt.ce(name, opts);
  elm.dispatchEvent(ev);
  return ev;
};
const rootAppliedStyles = new WeakMap();
const registerStyle = (scopeId, cssText, allowCS) => {
  let style = styles.get(scopeId);
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
  styles.set(scopeId, style);
};
const addStyle = (styleContainerNode, cmpMeta, mode) => {
  var _a;
  const scopeId = getScopeId(cmpMeta, mode);
  const style = styles.get(scopeId);
  if (!BUILD.attachStyles) {
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
          BUILD.hydrateClientSide &&
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
          if (BUILD.hydrateServerSide || BUILD.hotModuleReplacement) {
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
      BUILD.constructableCSS &&
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
    BUILD.shadowDom && supportsShadow && elm.shadowRoot
      ? elm.shadowRoot
      : elm.getRootNode(),
    cmpMeta,
    hostRef.$modeName$,
  );
  if ((BUILD.shadowDom || BUILD.scoped) && BUILD.cssAnnotations && flags & 10) {
    elm["s-sc"] = scopeId;
    elm.classList.add(scopeId + "-h");
    if (BUILD.scoped && flags & 2) {
      elm.classList.add(scopeId + "-s");
    }
  }
  endAttachStyles();
};
const getScopeId = (cmp, mode) =>
  "sc-" +
  (BUILD.mode && mode && cmp.$flags$ & 32
    ? cmp.$tagName$ + "-" + mode
    : cmp.$tagName$);
const convertScopedToShadow = (css) =>
  css.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g, "$1{");
const setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
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
    } else if (BUILD.vdomKey && memberName === "key");
    else if (BUILD.vdomRef && memberName === "ref") {
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
  if (BUILD.updatable) {
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
const createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
  const newVNode = newParentVNode.$children$[childIndex];
  let i = 0;
  let elm;
  let childNode;
  let oldVNode;
  if (BUILD.slotRelocation && !useNativeShadowDom) {
    checkSlotRelocate = true;
    if (newVNode.$tag$ === "slot") {
      if (scopeId) {
        parentElm.classList.add(scopeId + "-s");
      }
      newVNode.$flags$ |= newVNode.$children$ ? 2 : 1;
    }
  }
  if (BUILD.isDev && newVNode.$elm$) {
    consoleDevError(
      `The JSX ${newVNode.$text$ !== null ? `"${newVNode.$text$}" text` : `"${newVNode.$tag$}" element`} node should not be shared within the same renderer. The renderer caches element lookups in order to improve performance. However, a side effect from this is that the exact same JSX node should not be reused. For more information please see https://stenciljs.com/docs/templating-jsx#avoid-shared-jsx-nodes`,
    );
  }
  if (BUILD.vdomText && newVNode.$text$ !== null) {
    elm = newVNode.$elm$ = doc.createTextNode(newVNode.$text$);
  } else if (BUILD.slotRelocation && newVNode.$flags$ & 1) {
    elm = newVNode.$elm$ =
      BUILD.isDebug || BUILD.hydrateServerSide
        ? slotReferenceDebugNode(newVNode)
        : doc.createTextNode("");
  } else {
    if (BUILD.svg && !isSvgMode) {
      isSvgMode = newVNode.$tag$ === "svg";
    }
    elm = newVNode.$elm$ = BUILD.svg
      ? doc.createElementNS(
          isSvgMode ? SVG_NS : HTML_NS,
          BUILD.slotRelocation && newVNode.$flags$ & 2
            ? "slot-fb"
            : newVNode.$tag$,
        )
      : doc.createElement(
          BUILD.slotRelocation && newVNode.$flags$ & 2
            ? "slot-fb"
            : newVNode.$tag$,
        );
    if (BUILD.svg && isSvgMode && newVNode.$tag$ === "foreignObject") {
      isSvgMode = false;
    }
    if (BUILD.vdomAttribute) {
      updateElement(null, newVNode, isSvgMode);
    }
    if (
      (BUILD.shadowDom || BUILD.scoped) &&
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
    if (BUILD.svg) {
      if (newVNode.$tag$ === "svg") {
        isSvgMode = false;
      } else if (elm.tagName === "foreignObject") {
        isSvgMode = true;
      }
    }
  }
  elm["s-hn"] = hostTagName;
  if (BUILD.slotRelocation) {
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
const removeVnodes = (vnodes, startIdx, endIdx) => {
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
      if (BUILD.vdomKey && idxInOld >= 0) {
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
      newVNode,
      newCh,
      newStartIdx,
      newEndIdx,
    );
  } else if (BUILD.updatable && newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
};
const isSameVnode = (leftVNode, rightVNode, isInitialRender = false) => {
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
  if (!BUILD.vdomText || text === null) {
    if (BUILD.svg) {
      isSvgMode =
        tag === "svg" ? true : tag === "foreignObject" ? false : isSvgMode;
    }
    if (BUILD.vdomAttribute || BUILD.reflect) {
      if (BUILD.slot && tag === "slot" && !useNativeShadowDom) {
        if (
          BUILD.experimentalSlotFixes &&
          oldVNode.$name$ !== newVNode.$name$
        ) {
          newVNode.$elm$["s-sn"] = newVNode.$name$ || "";
          relocateToHostRoot(newVNode.$elm$.parentElement);
        }
      } else {
        updateElement(oldVNode, newVNode, isSvgMode);
      }
    }
    if (BUILD.updatable && oldChildren !== null && newChildren !== null) {
      updateChildren(elm, oldChildren, newVNode, newChildren, isInitialRender);
    } else if (newChildren !== null) {
      if (BUILD.updatable && BUILD.vdomText && oldVNode.$text$ !== null) {
        elm.textContent = "";
      }
      addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
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
  if (BUILD.vdomRef) {
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
  if (BUILD.experimentalScopedSlotChanges && cmpMeta.$flags$ & 2) {
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
const scheduleUpdate = (hostRef, isInitialLoad) => {
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
const dispatchHooks = (hostRef, isInitialLoad) => {
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
        hostRef.$queuedListeners$ = undefined;
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
      hostRef.$renderCount$ === undefined ? 1 : hostRef.$renderCount$ + 1;
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
    elm["s-rc"] = undefined;
  }
  endRender();
  endUpdate();
  if (BUILD.asyncLoading) {
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
const callRender = (hostRef, instance, elm, isInitialLoad) => {
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
const getRenderingRef = () => renderingRef;
const postUpdateComponent = (hostRef) => {
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
      hostRef.$onRenderResolve$ = undefined;
    }
    if (hostRef.$flags$ & 512) {
      nextTick(() => scheduleUpdate(hostRef, false));
    }
    hostRef.$flags$ &= ~(4 | 512);
  }
};
const forceUpdate = (ref) => {
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
const appDidLoad = (who) => {
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
  if (BUILD.lifecycleDOMEvents) {
    emitEvent(elm, "stencil_" + lifecycleName, {
      bubbles: true,
      composed: true,
      detail: { namespace: NAMESPACE },
    });
  }
};
const addHydratedFlag = (elm) =>
  BUILD.hydratedClass
    ? elm.classList.add("hydrated")
    : BUILD.hydratedAttribute
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
  const elm = BUILD.lazyLoad ? hostRef.$hostElement$ : ref;
  const oldVal = hostRef.$instanceValues$.get(propName);
  const flags = hostRef.$flags$;
  const instance = BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
  newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
  const areBothNaN = Number.isNaN(oldVal) && Number.isNaN(newVal);
  const didValueChange = newVal !== oldVal && !areBothNaN;
  if (
    (!BUILD.lazyLoad || !(flags & 8) || oldVal === undefined) &&
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
const proxyComponent = (Cstr, cmpMeta, flags) => {
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
    if (BUILD.observeAttribute && (!BUILD.lazyLoad || flags & 1)) {
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
              const elm = BUILD.lazyLoad ? hostRef.$hostElement$ : this;
              const instance = BUILD.lazyLoad ? hostRef.$lazyInstance$ : elm;
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
              if (BUILD.reflect && m[0] & 512) {
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
      const scopeId = getScopeId(cmpMeta, hostRef.$modeName$);
      if (!styles.has(scopeId)) {
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
          style = await import("./shadow-css.js").then((m) =>
            m.scopeCss(style, scopeId, false),
          );
        }
        registerStyle(scopeId, style, !!(cmpMeta.$flags$ & 1));
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
const fireConnectedCallback = (instance) => {
  if (BUILD.lazyLoad && BUILD.connectedCallback) {
    safeCall(instance, "connectedCallback");
  }
};
const connectedCallback = (elm) => {
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
            const scopeId = BUILD.mode
              ? addStyle(elm.shadowRoot, cmpMeta, elm.getAttribute("s-mode"))
              : addStyle(elm.shadowRoot, cmpMeta);
            elm.classList.remove(scopeId + "-h", scopeId + "-s");
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
    BUILD.isDebug ? `content-ref (host=${elm.localName})` : "",
  ));
  contentRefElm["s-cn"] = true;
  elm.insertBefore(contentRefElm, elm.firstChild);
};
const disconnectInstance = (instance) => {
  if (BUILD.lazyLoad && BUILD.disconnectedCallback) {
    safeCall(instance, "disconnectedCallback");
  }
  if (BUILD.cmpDidUnload) {
    safeCall(instance, "componentDidUnload");
  }
};
const disconnectedCallback = async (elm) => {
  if ((plt.$flags$ & 1) === 0) {
    const hostRef = getHostRef(elm);
    if (BUILD.hostListener) {
      if (hostRef.$rmListeners$) {
        hostRef.$rmListeners$.map((rmListener) => rmListener());
        hostRef.$rmListeners$ = undefined;
      }
    }
    if (!BUILD.lazyLoad) {
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
    const isShadowDom = BUILD.shadowDom
      ? srcNode.shadowRoot && supportsShadow
      : false;
    const clonedNode = orgCloneNode.call(srcNode, isShadowDom ? deep : false);
    if (BUILD.slot && !isShadowDom && deep) {
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
          if (BUILD.appendChildSlotFix && clonedNode.__appendChild) {
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
const forceModeUpdate = (elm) => {
  if (BUILD.style && BUILD.mode && !BUILD.lazyLoad) {
    const mode = computeMode(elm);
    const hostRef = getHostRef(elm);
    if (hostRef.$modeName$ !== mode) {
      const cmpMeta = hostRef.$cmpMeta$;
      const oldScopeId = elm["s-sc"];
      const scopeId = getScopeId(cmpMeta, mode);
      const style = elm.constructor.style[mode];
      const flags = cmpMeta.$flags$;
      if (style) {
        if (!styles.has(scopeId)) {
          registerStyle(scopeId, style, !!(flags & 1));
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
  initializeComponent(hostElement, hostRef, cmpMeta, hmrVersionId);
};
const bootstrapLazy = (lazyBundles, options = {}) => {
  var _a;
  if (BUILD.profile && performance.mark) {
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
  if (BUILD.asyncQueue) {
    if (options.syncQueue) {
      plt.$flags$ |= 4;
    }
  }
  if (BUILD.hydrateClientSide) {
    plt.$flags$ |= 2;
  }
  if (BUILD.hydrateClientSide && BUILD.shadowDom) {
    for (; i < styles.length; i++) {
      registerStyle(
        styles[i].getAttribute(HYDRATED_STYLE_ID),
        convertScopedToShadow(styles[i].innerHTML),
        true,
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
        cmpMeta.$watchers$ =
          (_a = compactMeta[4]) !== null && _a !== void 0 ? _a : {};
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
      BUILD.invisiblePrehydration &&
      (BUILD.hydratedClass || BUILD.hydratedAttribute)
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
    if (BUILD.profile) {
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
const hostListenerProxy = (hostRef, methodName) => (ev) => {
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
const getHostListenerTarget = (elm, flags) => {
  if (BUILD.hostListenerTargetDocument && flags & 4) return doc;
  if (BUILD.hostListenerTargetWindow && flags & 8) return win;
  if (BUILD.hostListenerTargetBody && flags & 16) return doc.body;
  if (BUILD.hostListenerTargetParent && flags & 32) return elm.parentElement;
  return elm;
};
const hostListenerOpts = (flags) =>
  supportsListenerOptions
    ? { passive: (flags & 1) !== 0, capture: (flags & 2) !== 0 }
    : (flags & 2) !== 0;
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
var _a;
const hostRefs = BUILD.hotModuleReplacement
  ? (_a = window).__STENCIL_HOSTREFS__ ||
    (_a.__STENCIL_HOSTREFS__ = new WeakMap())
  : new WeakMap();
const getHostRef = (ref) => hostRefs.get(ref);
const registerInstance = (lazyInstance, hostRef) =>
  hostRefs.set((hostRef.$lazyInstance$ = lazyInstance), hostRef);
const registerHost = (hostElement, cmpMeta) => {
  const hostRef = {
    $flags$: 0,
    $hostElement$: hostElement,
    $cmpMeta$: cmpMeta,
    $instanceValues$: new Map(),
  };
  if (BUILD.isDev) {
    hostRef.$renderCount$ = 0;
  }
  if (BUILD.method && BUILD.lazyLoad) {
    hostRef.$onInstancePromise$ = new Promise(
      (r) => (hostRef.$onInstanceResolve$ = r),
    );
  }
  if (BUILD.asyncLoading) {
    hostRef.$onReadyPromise$ = new Promise(
      (r) => (hostRef.$onReadyResolve$ = r),
    );
    hostElement["s-p"] = [];
    hostElement["s-rc"] = [];
  }
  addHostEventListeners(hostElement, hostRef, cmpMeta.$listeners$, false);
  return hostRefs.set(hostElement, hostRef);
};
const isMemberInElement = (elm, memberName) => memberName in elm;
const consoleError = (e, el) => (customError || console.error)(e, el);
const STENCIL_DEV_MODE = BUILD.isTesting
  ? ["STENCIL:"]
  : [
      "%cstencil",
      "color: white;background:#4c47ff;font-weight: bold; font-size:10px; padding:2px 6px; border-radius: 5px",
    ];
const consoleDevError = (...m) => console.error(...STENCIL_DEV_MODE, ...m);
const consoleDevWarn = (...m) => console.warn(...STENCIL_DEV_MODE, ...m);
const consoleDevInfo = (...m) => console.info(...STENCIL_DEV_MODE, ...m);
const setErrorHandler = (handler) => (customError = handler);
const cmpModules = new Map();
const loadModule = (cmpMeta, hostRef, hmrVersionId) => {
  const exportName = cmpMeta.$tagName$.replace(/-/g, "_");
  const bundleId = cmpMeta.$lazyBundleId$;
  if (BUILD.isDev && typeof bundleId !== "string") {
    consoleDevError(
      `Trying to lazily load component <${cmpMeta.$tagName$}> with style mode "${hostRef.$modeName$}", but it does not exist.`,
    );
    return undefined;
  }
  const module = !BUILD.hotModuleReplacement ? cmpModules.get(bundleId) : false;
  if (module) {
    return module[exportName];
  }
  return import(
    `./${bundleId}.entry.js${BUILD.hotModuleReplacement && hmrVersionId ? "?s-hmr=" + hmrVersionId : ""}`
  ).then((importedModule) => {
    if (!BUILD.hotModuleReplacement) {
      cmpModules.set(bundleId, importedModule);
    }
    return importedModule[exportName];
  }, consoleError);
};
const styles = new Map();
const modeResolutionChain = [];
const win = typeof window !== "undefined" ? window : {};
const doc = win.document || { head: {} };
const H = win.HTMLElement || class {};
const plt = {
  $flags$: 0,
  $resourcesUrl$: "",
  jmp: (h) => h(),
  raf: (h) => requestAnimationFrame(h),
  ael: (el, eventName, listener, opts) =>
    el.addEventListener(eventName, listener, opts),
  rel: (el, eventName, listener, opts) =>
    el.removeEventListener(eventName, listener, opts),
  ce: (eventName, opts) => new CustomEvent(eventName, opts),
};
const setPlatformHelpers = (helpers) => {
  Object.assign(plt, helpers);
};
const supportsShadow =
  BUILD.shadowDomShim && BUILD.shadowDom
    ? (() => (doc.head.attachShadow + "").indexOf("[native") > -1)()
    : true;
const supportsListenerOptions = (() => {
  let supportsListenerOptions = false;
  try {
    doc.addEventListener(
      "e",
      null,
      Object.defineProperty({}, "passive", {
        get() {
          supportsListenerOptions = true;
        },
      }),
    );
  } catch (e) {}
  return supportsListenerOptions;
})();
const promiseResolve = (v) => Promise.resolve(v);
const supportsConstructableStylesheets = BUILD.constructableCSS
  ? (() => {
      try {
        new CSSStyleSheet();
        return typeof new CSSStyleSheet().replaceSync === "function";
      } catch (e) {}
      return false;
    })()
  : false;
const queueDomReads = [];
const queueDomWrites = [];
const queueDomWritesLow = [];
const queueTask = (queue, write) => (cb) => {
  queue.push(cb);
  if (!queuePending) {
    queuePending = true;
    if (write && plt.$flags$ & 4) {
      nextTick(flush);
    } else {
      plt.raf(flush);
    }
  }
};
const consume = (queue) => {
  for (let i = 0; i < queue.length; i++) {
    try {
      queue[i](performance.now());
    } catch (e) {
      consoleError(e);
    }
  }
  queue.length = 0;
};
const consumeTimeout = (queue, timeout) => {
  let i = 0;
  let ts = 0;
  while (i < queue.length && (ts = performance.now()) < timeout) {
    try {
      queue[i++](ts);
    } catch (e) {
      consoleError(e);
    }
  }
  if (i === queue.length) {
    queue.length = 0;
  } else if (i !== 0) {
    queue.splice(0, i);
  }
};
const flush = () => {
  if (BUILD.asyncQueue) {
    queueCongestion++;
  }
  consume(queueDomReads);
  if (BUILD.asyncQueue) {
    const timeout =
      (plt.$flags$ & 6) === 2
        ? performance.now() + 14 * Math.ceil(queueCongestion * (1 / 10))
        : Infinity;
    consumeTimeout(queueDomWrites, timeout);
    consumeTimeout(queueDomWritesLow, timeout);
    if (queueDomWrites.length > 0) {
      queueDomWritesLow.push(...queueDomWrites);
      queueDomWrites.length = 0;
    }
    if (
      (queuePending =
        queueDomReads.length +
          queueDomWrites.length +
          queueDomWritesLow.length >
        0)
    ) {
      plt.raf(flush);
    } else {
      queueCongestion = 0;
    }
  } else {
    consume(queueDomWrites);
    if ((queuePending = queueDomReads.length > 0)) {
      plt.raf(flush);
    }
  }
};
const nextTick = (cb) => promiseResolve().then(cb);
const readTask = queueTask(queueDomReads, false);
const writeTask = queueTask(queueDomWrites, true);
export { BUILD, Env, NAMESPACE } from "@stencil/core/internal/app-data";
export {
  Build,
  Fragment,
  H,
  H as HTMLElement,
  Host,
  STENCIL_DEV_MODE,
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
  h,
  insertVdomAnnotations,
  isMemberInElement,
  loadModule,
  modeResolutionChain,
  nextTick,
  parsePropertyValue,
  plt,
  postUpdateComponent,
  promiseResolve,
  proxyComponent,
  proxyCustomElement,
  readTask,
  registerHost,
  registerInstance,
  renderVdom,
  setAssetPath,
  setErrorHandler,
  setMode,
  setNonce,
  setPlatformHelpers,
  setPlatformOptions,
  setValue,
  styles,
  supportsConstructableStylesheets,
  supportsListenerOptions,
  supportsShadow,
  win,
  writeTask,
};
