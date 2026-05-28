import { r as reactExports, f as functionalUpdate, a as arraysEqual, c as createLRUCache, i as isPromise, b as isRedirect, d as isNotFound, e as invariant, g as createControlledPromise, h as rootRouteId, j as isServer, k as compileDecodeCharMap, t as trimPath, l as rewriteBasepath, m as composeRewrites, p as processRouteTree, n as processRouteMasks, o as resolvePath, q as cleanPath, s as trimPathRight, u as parseHref, v as executeRewriteInput, w as isDangerousProtocol, x as redirect, y as findSingleMatch, z as deepEqual, D as DEFAULT_PROTOCOL_ALLOWLIST, A as interpolatePath, B as nullReplaceEqualDeep, C as replaceEqualDeep, E as last, F as decodePath, G as findFlatMatch, H as findRouteMatch, I as executeRewriteOutput, J as encodePathLikeUrl, K as trimPathLeft, L as joinPaths, M as useRouter, N as dummyMatchContext, O as matchContext, P as requireReactDom, Q as exactPathTest, R as removeTrailingSlash, S as React, T as jsxRuntimeExports, U as isModuleNotFoundError, V as useHydrated, W as escapeHtml, X as getAssetCrossOrigin, Y as resolveManifestAssetLink, Z as Outlet, _ as notFound } from "./worker-entry-CVMFMino.js";
import { c as custom, o as objectType, s as stringType } from "./types-CHm7Zrw6.js";
var reactUse = reactExports.use;
function useForwardedRef(ref) {
  const innerRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => innerRef.current, []);
  return innerRef;
}
function encode(obj, stringify = String) {
  const result = new URLSearchParams();
  for (const key in obj) {
    const val = obj[key];
    if (val !== void 0) result.set(key, stringify(val));
  }
  return result.toString();
}
function toValue(str) {
  if (!str) return "";
  if (str === "false") return false;
  if (str === "true") return true;
  return +str * 0 === 0 && +str + "" === str ? +str : str;
}
function decode(str) {
  const searchParams = new URLSearchParams(str);
  const result = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of searchParams.entries()) {
    const previousValue = result[key];
    if (previousValue == null) result[key] = toValue(value);
    else if (Array.isArray(previousValue)) previousValue.push(toValue(value));
    else result[key] = [previousValue, toValue(value)];
  }
  return result;
}
var defaultParseSearch = parseSearchWith(JSON.parse);
var defaultStringifySearch = stringifySearchWith(JSON.stringify, JSON.parse);
function parseSearchWith(parser) {
  return (searchStr) => {
    if (searchStr[0] === "?") searchStr = searchStr.substring(1);
    const query = decode(searchStr);
    for (const key in query) {
      const value = query[key];
      if (typeof value === "string") try {
        query[key] = parser(value);
      } catch (_err) {
      }
    }
    return query;
  };
}
function stringifySearchWith(stringify, parser) {
  const hasParser = typeof parser === "function";
  function stringifyValue(val) {
    if (typeof val === "object" && val !== null) try {
      return stringify(val);
    } catch (_err) {
    }
    else if (hasParser && typeof val === "string") try {
      parser(val);
      return stringify(val);
    } catch (_err) {
    }
    return val;
  }
  return (search) => {
    const searchStr = encode(search, stringifyValue);
    return searchStr ? `?${searchStr}` : "";
  };
}
function createNonReactiveMutableStore(initialValue) {
  let value = initialValue;
  return {
    get() {
      return value;
    },
    set(nextOrUpdater) {
      value = functionalUpdate(nextOrUpdater, value);
    }
  };
}
function createNonReactiveReadonlyStore(read) {
  return { get() {
    return read();
  } };
}
function createRouterStores(initialState, config) {
  const { createMutableStore, createReadonlyStore, batch, init } = config;
  const matchStores = /* @__PURE__ */ new Map();
  const pendingMatchStores = /* @__PURE__ */ new Map();
  const cachedMatchStores = /* @__PURE__ */ new Map();
  const status = createMutableStore(initialState.status);
  const loadedAt = createMutableStore(initialState.loadedAt);
  const isLoading = createMutableStore(initialState.isLoading);
  const isTransitioning = createMutableStore(initialState.isTransitioning);
  const location = createMutableStore(initialState.location);
  const resolvedLocation = createMutableStore(initialState.resolvedLocation);
  const statusCode = createMutableStore(initialState.statusCode);
  const redirect2 = createMutableStore(initialState.redirect);
  const matchesId = createMutableStore([]);
  const pendingIds = createMutableStore([]);
  const cachedIds = createMutableStore([]);
  const matches = createReadonlyStore(() => readPoolMatches(matchStores, matchesId.get()));
  const pendingMatches = createReadonlyStore(() => readPoolMatches(pendingMatchStores, pendingIds.get()));
  const cachedMatches = createReadonlyStore(() => readPoolMatches(cachedMatchStores, cachedIds.get()));
  const firstId = createReadonlyStore(() => matchesId.get()[0]);
  const hasPending = createReadonlyStore(() => matchesId.get().some((matchId) => {
    return matchStores.get(matchId)?.get().status === "pending";
  }));
  const matchRouteDeps = createReadonlyStore(() => ({
    locationHref: location.get().href,
    resolvedLocationHref: resolvedLocation.get()?.href,
    status: status.get()
  }));
  const __store = createReadonlyStore(() => ({
    status: status.get(),
    loadedAt: loadedAt.get(),
    isLoading: isLoading.get(),
    isTransitioning: isTransitioning.get(),
    matches: matches.get(),
    location: location.get(),
    resolvedLocation: resolvedLocation.get(),
    statusCode: statusCode.get(),
    redirect: redirect2.get()
  }));
  const matchStoreByRouteIdCache = createLRUCache(64);
  function getRouteMatchStore(routeId) {
    let cached = matchStoreByRouteIdCache.get(routeId);
    if (!cached) {
      cached = createReadonlyStore(() => {
        const ids = matchesId.get();
        for (const id of ids) {
          const matchStore = matchStores.get(id);
          if (matchStore && matchStore.routeId === routeId) return matchStore.get();
        }
      });
      matchStoreByRouteIdCache.set(routeId, cached);
    }
    return cached;
  }
  const store = {
    status,
    loadedAt,
    isLoading,
    isTransitioning,
    location,
    resolvedLocation,
    statusCode,
    redirect: redirect2,
    matchesId,
    pendingIds,
    cachedIds,
    matches,
    pendingMatches,
    cachedMatches,
    firstId,
    hasPending,
    matchRouteDeps,
    matchStores,
    pendingMatchStores,
    cachedMatchStores,
    __store,
    getRouteMatchStore,
    setMatches,
    setPending,
    setCached
  };
  setMatches(initialState.matches);
  init?.(store);
  function setMatches(nextMatches) {
    reconcileMatchPool(nextMatches, matchStores, matchesId, createMutableStore, batch);
  }
  function setPending(nextMatches) {
    reconcileMatchPool(nextMatches, pendingMatchStores, pendingIds, createMutableStore, batch);
  }
  function setCached(nextMatches) {
    reconcileMatchPool(nextMatches, cachedMatchStores, cachedIds, createMutableStore, batch);
  }
  return store;
}
function readPoolMatches(pool, ids) {
  const matches = [];
  for (const id of ids) {
    const matchStore = pool.get(id);
    if (matchStore) matches.push(matchStore.get());
  }
  return matches;
}
function reconcileMatchPool(nextMatches, pool, idStore, createMutableStore, batch) {
  const nextIds = nextMatches.map((d) => d.id);
  const nextIdSet = new Set(nextIds);
  batch(() => {
    for (const id of pool.keys()) if (!nextIdSet.has(id)) pool.delete(id);
    for (const nextMatch of nextMatches) {
      const existing = pool.get(nextMatch.id);
      if (!existing) {
        const matchStore = createMutableStore(nextMatch);
        matchStore.routeId = nextMatch.routeId;
        pool.set(nextMatch.id, matchStore);
        continue;
      }
      existing.routeId = nextMatch.routeId;
      if (existing.get() !== nextMatch) existing.set(nextMatch);
    }
    if (!arraysEqual(idStore.get(), nextIds)) idStore.set(nextIds);
  });
}
var triggerOnReady = (inner) => {
  if (!inner.rendered) {
    inner.rendered = true;
    return inner.onReady?.();
  }
};
var resolvePreload = (inner, matchId) => {
  return !!(inner.preload && !inner.router.stores.matchStores.has(matchId));
};
var buildMatchContext = (inner, index, includeCurrentMatch = true) => {
  const context = { ...inner.router.options.context ?? {} };
  const end = includeCurrentMatch ? index : index - 1;
  for (let i = 0; i <= end; i++) {
    const innerMatch = inner.matches[i];
    if (!innerMatch) continue;
    const m = inner.router.getMatch(innerMatch.id);
    if (!m) continue;
    Object.assign(context, m.__routeContext, m.__beforeLoadContext);
  }
  return context;
};
var getNotFoundBoundaryIndex = (inner, err) => {
  if (!inner.matches.length) return;
  const requestedRouteId = err.routeId;
  const matchedRootIndex = inner.matches.findIndex((m) => m.routeId === inner.router.routeTree.id);
  const rootIndex = matchedRootIndex >= 0 ? matchedRootIndex : 0;
  let startIndex = requestedRouteId ? inner.matches.findIndex((match) => match.routeId === requestedRouteId) : inner.firstBadMatchIndex ?? inner.matches.length - 1;
  if (startIndex < 0) startIndex = rootIndex;
  for (let i = startIndex; i >= 0; i--) {
    const match = inner.matches[i];
    if (inner.router.looseRoutesById[match.routeId].options.notFoundComponent) return i;
  }
  return requestedRouteId ? startIndex : rootIndex;
};
var handleRedirectAndNotFound = (inner, match, err) => {
  if (!isRedirect(err) && !isNotFound(err)) return;
  if (isRedirect(err) && err.redirectHandled && !err.options.reloadDocument) throw err;
  if (match) {
    match._nonReactive.beforeLoadPromise?.resolve();
    match._nonReactive.loaderPromise?.resolve();
    match._nonReactive.beforeLoadPromise = void 0;
    match._nonReactive.loaderPromise = void 0;
    match._nonReactive.error = err;
    inner.updateMatch(match.id, (prev) => ({
      ...prev,
      status: isRedirect(err) ? "redirected" : isNotFound(err) ? "notFound" : prev.status === "pending" ? "success" : prev.status,
      context: buildMatchContext(inner, match.index),
      isFetching: false,
      error: err
    }));
    if (isNotFound(err) && !err.routeId) err.routeId = match.routeId;
    match._nonReactive.loadPromise?.resolve();
  }
  if (isRedirect(err)) {
    inner.rendered = true;
    err.options._fromLocation = inner.location;
    err.redirectHandled = true;
    err = inner.router.resolveRedirect(err);
  }
  throw err;
};
var shouldSkipLoader = (inner, matchId) => {
  const match = inner.router.getMatch(matchId);
  if (!match) return true;
  if (match.ssr === false) return true;
  return false;
};
var syncMatchContext = (inner, matchId, index) => {
  const nextContext = buildMatchContext(inner, index);
  inner.updateMatch(matchId, (prev) => {
    return {
      ...prev,
      context: nextContext
    };
  });
};
var handleSerialError = (inner, index, err, routerCode) => {
  const { id: matchId, routeId } = inner.matches[index];
  const route = inner.router.looseRoutesById[routeId];
  if (err instanceof Promise) throw err;
  err.routerCode = routerCode;
  inner.firstBadMatchIndex ??= index;
  handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), err);
  try {
    route.options.onError?.(err);
  } catch (errorHandlerErr) {
    err = errorHandlerErr;
    handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), err);
  }
  inner.updateMatch(matchId, (prev) => {
    prev._nonReactive.beforeLoadPromise?.resolve();
    prev._nonReactive.beforeLoadPromise = void 0;
    prev._nonReactive.loadPromise?.resolve();
    return {
      ...prev,
      error: err,
      status: "error",
      isFetching: false,
      updatedAt: Date.now(),
      abortController: new AbortController()
    };
  });
  if (!inner.preload && !isRedirect(err) && !isNotFound(err)) inner.serialError ??= err;
};
var isBeforeLoadSsr = (inner, matchId, index, route) => {
  const existingMatch = inner.router.getMatch(matchId);
  const parentMatchId = inner.matches[index - 1]?.id;
  const parentMatch = parentMatchId ? inner.router.getMatch(parentMatchId) : void 0;
  if (inner.router.isShell()) {
    existingMatch.ssr = route.id === rootRouteId;
    return;
  }
  if (parentMatch?.ssr === false) {
    existingMatch.ssr = false;
    return;
  }
  const parentOverride = (tempSsr2) => {
    if (tempSsr2 === true && parentMatch?.ssr === "data-only") return "data-only";
    return tempSsr2;
  };
  const defaultSsr = inner.router.options.defaultSsr ?? true;
  if (route.options.ssr === void 0) {
    existingMatch.ssr = parentOverride(defaultSsr);
    return;
  }
  if (typeof route.options.ssr !== "function") {
    existingMatch.ssr = parentOverride(route.options.ssr);
    return;
  }
  const { search, params } = existingMatch;
  const ssrFnContext = {
    search: makeMaybe(search, existingMatch.searchError),
    params: makeMaybe(params, existingMatch.paramsError),
    location: inner.location,
    matches: inner.matches.map((match) => ({
      index: match.index,
      pathname: match.pathname,
      fullPath: match.fullPath,
      staticData: match.staticData,
      id: match.id,
      routeId: match.routeId,
      search: makeMaybe(match.search, match.searchError),
      params: makeMaybe(match.params, match.paramsError),
      ssr: match.ssr
    }))
  };
  const tempSsr = route.options.ssr(ssrFnContext);
  if (isPromise(tempSsr)) return tempSsr.then((ssr) => {
    existingMatch.ssr = parentOverride(ssr ?? defaultSsr);
  });
  existingMatch.ssr = parentOverride(tempSsr ?? defaultSsr);
};
var setupPendingTimeout = (inner, matchId, route, match) => {
  if (match._nonReactive.pendingTimeout !== void 0) return;
  const pendingMs = route.options.pendingMs ?? inner.router.options.defaultPendingMs;
  if (!!(inner.onReady && false)) {
    const pendingTimeout = setTimeout(() => {
      triggerOnReady(inner);
    }, pendingMs);
    match._nonReactive.pendingTimeout = pendingTimeout;
  }
};
var preBeforeLoadSetup = (inner, matchId, route) => {
  const existingMatch = inner.router.getMatch(matchId);
  if (!existingMatch._nonReactive.beforeLoadPromise && !existingMatch._nonReactive.loaderPromise) return;
  setupPendingTimeout(inner, matchId, route, existingMatch);
  const then = () => {
    const match = inner.router.getMatch(matchId);
    if (match.preload && (match.status === "redirected" || match.status === "notFound")) handleRedirectAndNotFound(inner, match, match.error);
  };
  return existingMatch._nonReactive.beforeLoadPromise ? existingMatch._nonReactive.beforeLoadPromise.then(then) : then();
};
var executeBeforeLoad = (inner, matchId, index, route) => {
  const match = inner.router.getMatch(matchId);
  let prevLoadPromise = match._nonReactive.loadPromise;
  match._nonReactive.loadPromise = createControlledPromise(() => {
    prevLoadPromise?.resolve();
    prevLoadPromise = void 0;
  });
  const { paramsError, searchError } = match;
  if (paramsError) handleSerialError(inner, index, paramsError, "PARSE_PARAMS");
  if (searchError) handleSerialError(inner, index, searchError, "VALIDATE_SEARCH");
  setupPendingTimeout(inner, matchId, route, match);
  const abortController = new AbortController();
  let isPending = false;
  const pending = () => {
    if (isPending) return;
    isPending = true;
    inner.updateMatch(matchId, (prev) => ({
      ...prev,
      isFetching: "beforeLoad",
      fetchCount: prev.fetchCount + 1,
      abortController
    }));
  };
  const resolve = () => {
    match._nonReactive.beforeLoadPromise?.resolve();
    match._nonReactive.beforeLoadPromise = void 0;
    inner.updateMatch(matchId, (prev) => ({
      ...prev,
      isFetching: false
    }));
  };
  if (!route.options.beforeLoad) {
    inner.router.batch(() => {
      pending();
      resolve();
    });
    return;
  }
  match._nonReactive.beforeLoadPromise = createControlledPromise();
  const context = {
    ...buildMatchContext(inner, index, false),
    ...match.__routeContext
  };
  const { search, params, cause } = match;
  const preload = resolvePreload(inner, matchId);
  const beforeLoadFnContext = {
    search,
    abortController,
    params,
    preload,
    context,
    location: inner.location,
    navigate: (opts) => inner.router.navigate({
      ...opts,
      _fromLocation: inner.location
    }),
    buildLocation: inner.router.buildLocation,
    cause: preload ? "preload" : cause,
    matches: inner.matches,
    routeId: route.id,
    ...inner.router.options.additionalContext
  };
  const updateContext = (beforeLoadContext2) => {
    if (beforeLoadContext2 === void 0) {
      inner.router.batch(() => {
        pending();
        resolve();
      });
      return;
    }
    if (isRedirect(beforeLoadContext2) || isNotFound(beforeLoadContext2)) {
      pending();
      handleSerialError(inner, index, beforeLoadContext2, "BEFORE_LOAD");
    }
    inner.router.batch(() => {
      pending();
      inner.updateMatch(matchId, (prev) => ({
        ...prev,
        __beforeLoadContext: beforeLoadContext2
      }));
      resolve();
    });
  };
  let beforeLoadContext;
  try {
    beforeLoadContext = route.options.beforeLoad(beforeLoadFnContext);
    if (isPromise(beforeLoadContext)) {
      pending();
      return beforeLoadContext.catch((err) => {
        handleSerialError(inner, index, err, "BEFORE_LOAD");
      }).then(updateContext);
    }
  } catch (err) {
    pending();
    handleSerialError(inner, index, err, "BEFORE_LOAD");
  }
  updateContext(beforeLoadContext);
};
var handleBeforeLoad = (inner, index) => {
  const { id: matchId, routeId } = inner.matches[index];
  const route = inner.router.looseRoutesById[routeId];
  const serverSsr = () => {
    {
      const maybePromise = isBeforeLoadSsr(inner, matchId, index, route);
      if (isPromise(maybePromise)) return maybePromise.then(queueExecution);
    }
    return queueExecution();
  };
  const execute = () => executeBeforeLoad(inner, matchId, index, route);
  const queueExecution = () => {
    if (shouldSkipLoader(inner, matchId)) return;
    const result = preBeforeLoadSetup(inner, matchId, route);
    return isPromise(result) ? result.then(execute) : execute();
  };
  return serverSsr();
};
var executeHead = (inner, matchId, route) => {
  const match = inner.router.getMatch(matchId);
  if (!match) return;
  if (!route.options.head && !route.options.scripts && !route.options.headers) return;
  const assetContext = {
    ssr: inner.router.options.ssr,
    matches: inner.matches,
    match,
    params: match.params,
    loaderData: match.loaderData
  };
  return Promise.all([
    route.options.head?.(assetContext),
    route.options.scripts?.(assetContext),
    route.options.headers?.(assetContext)
  ]).then(([headFnContent, scripts, headers]) => {
    return {
      meta: headFnContent?.meta,
      links: headFnContent?.links,
      headScripts: headFnContent?.scripts,
      headers,
      scripts,
      styles: headFnContent?.styles
    };
  });
};
var getLoaderContext = (inner, matchPromises, matchId, index, route) => {
  const parentMatchPromise = matchPromises[index - 1];
  const { params, loaderDeps, abortController, cause } = inner.router.getMatch(matchId);
  const context = buildMatchContext(inner, index);
  const preload = resolvePreload(inner, matchId);
  return {
    params,
    deps: loaderDeps,
    preload: !!preload,
    parentMatchPromise,
    abortController,
    context,
    location: inner.location,
    navigate: (opts) => inner.router.navigate({
      ...opts,
      _fromLocation: inner.location
    }),
    cause: preload ? "preload" : cause,
    route,
    ...inner.router.options.additionalContext
  };
};
var runLoader = async (inner, matchPromises, matchId, index, route) => {
  try {
    const match = inner.router.getMatch(matchId);
    try {
      if (!(isServer ?? inner.router.isServer) || match.ssr === true) loadRouteChunk(route);
      const routeLoader = route.options.loader;
      const loader = typeof routeLoader === "function" ? routeLoader : routeLoader?.handler;
      const loaderResult = loader?.(getLoaderContext(inner, matchPromises, matchId, index, route));
      const loaderResultIsPromise = !!loader && isPromise(loaderResult);
      if (!!(loaderResultIsPromise || route._lazyPromise || route._componentsPromise || route.options.head || route.options.scripts || route.options.headers || match._nonReactive.minPendingPromise)) inner.updateMatch(matchId, (prev) => ({
        ...prev,
        isFetching: "loader"
      }));
      if (loader) {
        const loaderData = loaderResultIsPromise ? await loaderResult : loaderResult;
        handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), loaderData);
        if (loaderData !== void 0) inner.updateMatch(matchId, (prev) => ({
          ...prev,
          loaderData
        }));
      }
      if (route._lazyPromise) await route._lazyPromise;
      const pendingPromise = match._nonReactive.minPendingPromise;
      if (pendingPromise) await pendingPromise;
      if (route._componentsPromise) await route._componentsPromise;
      inner.updateMatch(matchId, (prev) => ({
        ...prev,
        error: void 0,
        context: buildMatchContext(inner, index),
        status: "success",
        isFetching: false,
        updatedAt: Date.now()
      }));
    } catch (e) {
      let error = e;
      if (error?.name === "AbortError") {
        if (match.abortController.signal.aborted) {
          match._nonReactive.loaderPromise?.resolve();
          match._nonReactive.loaderPromise = void 0;
          return;
        }
        inner.updateMatch(matchId, (prev) => ({
          ...prev,
          status: prev.status === "pending" ? "success" : prev.status,
          isFetching: false,
          context: buildMatchContext(inner, index)
        }));
        return;
      }
      const pendingPromise = match._nonReactive.minPendingPromise;
      if (pendingPromise) await pendingPromise;
      if (isNotFound(e)) await route.options.notFoundComponent?.preload?.();
      handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), e);
      try {
        route.options.onError?.(e);
      } catch (onErrorError) {
        error = onErrorError;
        handleRedirectAndNotFound(inner, inner.router.getMatch(matchId), onErrorError);
      }
      if (!isRedirect(error) && !isNotFound(error)) await loadRouteChunk(route, ["errorComponent"]);
      inner.updateMatch(matchId, (prev) => ({
        ...prev,
        error,
        context: buildMatchContext(inner, index),
        status: "error",
        isFetching: false
      }));
    }
  } catch (err) {
    const match = inner.router.getMatch(matchId);
    if (match) match._nonReactive.loaderPromise = void 0;
    handleRedirectAndNotFound(inner, match, err);
  }
};
var loadRouteMatch = async (inner, matchPromises, index) => {
  async function handleLoader(preload, prevMatch, previousRouteMatchId, match2, route2) {
    const age = Date.now() - prevMatch.updatedAt;
    const staleAge = preload ? route2.options.preloadStaleTime ?? inner.router.options.defaultPreloadStaleTime ?? 3e4 : route2.options.staleTime ?? inner.router.options.defaultStaleTime ?? 0;
    const shouldReloadOption = route2.options.shouldReload;
    const shouldReload = typeof shouldReloadOption === "function" ? shouldReloadOption(getLoaderContext(inner, matchPromises, matchId, index, route2)) : shouldReloadOption;
    const { status, invalid } = match2;
    const staleMatchShouldReload = age >= staleAge && (!!inner.forceStaleReload || match2.cause === "enter" || previousRouteMatchId !== void 0 && previousRouteMatchId !== match2.id);
    loaderShouldRunAsync = status === "success" && (invalid || (shouldReload ?? staleMatchShouldReload));
    if (preload && route2.options.preload === false) ;
    else if (loaderShouldRunAsync && !inner.sync && shouldReloadInBackground) {
      loaderIsRunningAsync = true;
      (async () => {
        try {
          await runLoader(inner, matchPromises, matchId, index, route2);
          const match3 = inner.router.getMatch(matchId);
          match3._nonReactive.loaderPromise?.resolve();
          match3._nonReactive.loadPromise?.resolve();
          match3._nonReactive.loaderPromise = void 0;
          match3._nonReactive.loadPromise = void 0;
        } catch (err) {
          if (isRedirect(err)) await inner.router.navigate(err.options);
        }
      })();
    } else if (status !== "success" || loaderShouldRunAsync) await runLoader(inner, matchPromises, matchId, index, route2);
    else syncMatchContext(inner, matchId, index);
  }
  const { id: matchId, routeId } = inner.matches[index];
  let loaderShouldRunAsync = false;
  let loaderIsRunningAsync = false;
  const route = inner.router.looseRoutesById[routeId];
  const routeLoader = route.options.loader;
  const shouldReloadInBackground = ((typeof routeLoader === "function" ? void 0 : routeLoader?.staleReloadMode) ?? inner.router.options.defaultStaleReloadMode) !== "blocking";
  if (shouldSkipLoader(inner, matchId)) {
    if (!inner.router.getMatch(matchId)) return inner.matches[index];
    syncMatchContext(inner, matchId, index);
    return inner.router.getMatch(matchId);
  } else {
    const prevMatch = inner.router.getMatch(matchId);
    const activeIdAtIndex = inner.router.stores.matchesId.get()[index];
    const previousRouteMatchId = (activeIdAtIndex && inner.router.stores.matchStores.get(activeIdAtIndex) || null)?.routeId === routeId ? activeIdAtIndex : inner.router.stores.matches.get().find((d) => d.routeId === routeId)?.id;
    const preload = resolvePreload(inner, matchId);
    if (prevMatch._nonReactive.loaderPromise) {
      if (prevMatch.status === "success" && !inner.sync && !prevMatch.preload && shouldReloadInBackground) return prevMatch;
      await prevMatch._nonReactive.loaderPromise;
      const match2 = inner.router.getMatch(matchId);
      const error = match2._nonReactive.error || match2.error;
      if (error) handleRedirectAndNotFound(inner, match2, error);
      if (match2.status === "pending") await handleLoader(preload, prevMatch, previousRouteMatchId, match2, route);
    } else {
      const nextPreload = preload && !inner.router.stores.matchStores.has(matchId);
      const match2 = inner.router.getMatch(matchId);
      match2._nonReactive.loaderPromise = createControlledPromise();
      if (nextPreload !== match2.preload) inner.updateMatch(matchId, (prev) => ({
        ...prev,
        preload: nextPreload
      }));
      await handleLoader(preload, prevMatch, previousRouteMatchId, match2, route);
    }
  }
  const match = inner.router.getMatch(matchId);
  if (!loaderIsRunningAsync) {
    match._nonReactive.loaderPromise?.resolve();
    match._nonReactive.loadPromise?.resolve();
    match._nonReactive.loadPromise = void 0;
  }
  clearTimeout(match._nonReactive.pendingTimeout);
  match._nonReactive.pendingTimeout = void 0;
  if (!loaderIsRunningAsync) match._nonReactive.loaderPromise = void 0;
  match._nonReactive.dehydrated = void 0;
  const nextIsFetching = loaderIsRunningAsync ? match.isFetching : false;
  if (nextIsFetching !== match.isFetching || match.invalid !== false) {
    inner.updateMatch(matchId, (prev) => ({
      ...prev,
      isFetching: nextIsFetching,
      invalid: false
    }));
    return inner.router.getMatch(matchId);
  } else return match;
};
async function loadMatches(arg) {
  const inner = arg;
  const matchPromises = [];
  let beforeLoadNotFound;
  for (let i = 0; i < inner.matches.length; i++) {
    try {
      const beforeLoad = handleBeforeLoad(inner, i);
      if (isPromise(beforeLoad)) await beforeLoad;
    } catch (err) {
      if (isRedirect(err)) throw err;
      if (isNotFound(err)) beforeLoadNotFound = err;
      else if (!inner.preload) throw err;
      break;
    }
    if (inner.serialError || inner.firstBadMatchIndex != null) break;
  }
  const baseMaxIndexExclusive = inner.firstBadMatchIndex ?? inner.matches.length;
  const boundaryIndex = beforeLoadNotFound && !inner.preload ? getNotFoundBoundaryIndex(inner, beforeLoadNotFound) : void 0;
  const maxIndexExclusive = beforeLoadNotFound && inner.preload ? 0 : boundaryIndex !== void 0 ? Math.min(boundaryIndex + 1, baseMaxIndexExclusive) : baseMaxIndexExclusive;
  let firstNotFound;
  let firstUnhandledRejection;
  for (let i = 0; i < maxIndexExclusive; i++) matchPromises.push(loadRouteMatch(inner, matchPromises, i));
  try {
    await Promise.all(matchPromises);
  } catch {
    const settled = await Promise.allSettled(matchPromises);
    for (const result of settled) {
      if (result.status !== "rejected") continue;
      const reason = result.reason;
      if (isRedirect(reason)) throw reason;
      if (isNotFound(reason)) firstNotFound ??= reason;
      else firstUnhandledRejection ??= reason;
    }
    if (firstUnhandledRejection !== void 0) throw firstUnhandledRejection;
  }
  const notFoundToThrow = firstNotFound ?? (beforeLoadNotFound && !inner.preload ? beforeLoadNotFound : void 0);
  let headMaxIndex = inner.firstBadMatchIndex !== void 0 ? inner.firstBadMatchIndex : inner.matches.length - 1;
  if (!notFoundToThrow && beforeLoadNotFound && inner.preload) return inner.matches;
  if (notFoundToThrow) {
    const renderedBoundaryIndex = getNotFoundBoundaryIndex(inner, notFoundToThrow);
    if (renderedBoundaryIndex === void 0) {
      invariant();
    }
    const boundaryMatch = inner.matches[renderedBoundaryIndex];
    const boundaryRoute = inner.router.looseRoutesById[boundaryMatch.routeId];
    const defaultNotFoundComponent = inner.router.options?.defaultNotFoundComponent;
    if (!boundaryRoute.options.notFoundComponent && defaultNotFoundComponent) boundaryRoute.options.notFoundComponent = defaultNotFoundComponent;
    notFoundToThrow.routeId = boundaryMatch.routeId;
    const boundaryIsRoot = boundaryMatch.routeId === inner.router.routeTree.id;
    inner.updateMatch(boundaryMatch.id, (prev) => ({
      ...prev,
      ...boundaryIsRoot ? {
        status: "success",
        globalNotFound: true,
        error: void 0
      } : {
        status: "notFound",
        error: notFoundToThrow
      },
      isFetching: false
    }));
    headMaxIndex = renderedBoundaryIndex;
    await loadRouteChunk(boundaryRoute, ["notFoundComponent"]);
  } else if (!inner.preload) {
    const rootMatch = inner.matches[0];
    if (!rootMatch.globalNotFound) {
      if (inner.router.getMatch(rootMatch.id)?.globalNotFound) inner.updateMatch(rootMatch.id, (prev) => ({
        ...prev,
        globalNotFound: false,
        error: void 0
      }));
    }
  }
  if (inner.serialError && inner.firstBadMatchIndex !== void 0) {
    const errorRoute = inner.router.looseRoutesById[inner.matches[inner.firstBadMatchIndex].routeId];
    await loadRouteChunk(errorRoute, ["errorComponent"]);
  }
  for (let i = 0; i <= headMaxIndex; i++) {
    const { id: matchId, routeId } = inner.matches[i];
    const route = inner.router.looseRoutesById[routeId];
    try {
      const headResult = executeHead(inner, matchId, route);
      if (headResult) {
        const head = await headResult;
        inner.updateMatch(matchId, (prev) => ({
          ...prev,
          ...head
        }));
      }
    } catch (err) {
      console.error(`Error executing head for route ${routeId}:`, err);
    }
  }
  const readyPromise = triggerOnReady(inner);
  if (isPromise(readyPromise)) await readyPromise;
  if (notFoundToThrow) throw notFoundToThrow;
  if (inner.serialError && !inner.preload && !inner.onReady) throw inner.serialError;
  return inner.matches;
}
function preloadRouteComponents(route, componentTypesToLoad) {
  const preloads = componentTypesToLoad.map((type) => route.options[type]?.preload?.()).filter(Boolean);
  if (preloads.length === 0) return void 0;
  return Promise.all(preloads);
}
function loadRouteChunk(route, componentTypesToLoad = componentTypes) {
  if (!route._lazyLoaded && route._lazyPromise === void 0) if (route.lazyFn) route._lazyPromise = route.lazyFn().then((lazyRoute) => {
    const { id: _id, ...options } = lazyRoute.options;
    Object.assign(route.options, options);
    route._lazyLoaded = true;
    route._lazyPromise = void 0;
  });
  else route._lazyLoaded = true;
  const runAfterLazy = () => route._componentsLoaded ? void 0 : componentTypesToLoad === componentTypes ? (() => {
    if (route._componentsPromise === void 0) {
      const componentsPromise = preloadRouteComponents(route, componentTypes);
      if (componentsPromise) route._componentsPromise = componentsPromise.then(() => {
        route._componentsLoaded = true;
        route._componentsPromise = void 0;
      });
      else route._componentsLoaded = true;
    }
    return route._componentsPromise;
  })() : preloadRouteComponents(route, componentTypesToLoad);
  return route._lazyPromise ? route._lazyPromise.then(runAfterLazy) : runAfterLazy();
}
function makeMaybe(value, error) {
  if (error) return {
    status: "error",
    error
  };
  return {
    status: "success",
    value
  };
}
function routeNeedsPreload(route) {
  for (const componentType of componentTypes) if (route.options[componentType]?.preload) return true;
  return false;
}
var componentTypes = [
  "component",
  "errorComponent",
  "pendingComponent",
  "notFoundComponent"
];
function getLocationChangeInfo(location, resolvedLocation) {
  const fromLocation = resolvedLocation;
  const toLocation = location;
  return {
    fromLocation,
    toLocation,
    pathChanged: fromLocation?.pathname !== toLocation.pathname,
    hrefChanged: fromLocation?.href !== toLocation.href,
    hashChanged: fromLocation?.hash !== toLocation.hash
  };
}
var RouterCore = class {
  /**
  * @deprecated Use the `createRouter` function instead
  */
  constructor(options, getStoreConfig) {
    this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`;
    this.resetNextScroll = true;
    this.shouldViewTransition = void 0;
    this.isViewTransitionTypesSupported = void 0;
    this.subscribers = /* @__PURE__ */ new Set();
    this.isScrollRestoring = false;
    this.isScrollRestorationSetup = false;
    this.startTransition = (fn) => fn();
    this.update = (newOptions) => {
      const prevOptions = this.options;
      const prevBasepath = this.basepath ?? prevOptions?.basepath ?? "/";
      const basepathWasUnset = this.basepath === void 0;
      const prevRewriteOption = prevOptions?.rewrite;
      this.options = {
        ...prevOptions,
        ...newOptions
      };
      this.isServer = this.options.isServer ?? typeof document === "undefined";
      this.protocolAllowlist = new Set(this.options.protocolAllowlist);
      if (this.options.pathParamsAllowedCharacters) this.pathParamsDecoder = compileDecodeCharMap(this.options.pathParamsAllowedCharacters);
      if (!this.history || this.options.history && this.options.history !== this.history) if (!this.options.history) ;
      else this.history = this.options.history;
      this.origin = this.options.origin;
      if (!this.origin) this.origin = "http://localhost";
      if (this.history) this.updateLatestLocation();
      if (this.options.routeTree !== this.routeTree) {
        this.routeTree = this.options.routeTree;
        let processRouteTreeResult;
        if (globalThis.__TSR_CACHE__ && globalThis.__TSR_CACHE__.routeTree === this.routeTree) {
          const cached = globalThis.__TSR_CACHE__;
          this.resolvePathCache = cached.resolvePathCache;
          processRouteTreeResult = cached.processRouteTreeResult;
        } else {
          this.resolvePathCache = createLRUCache(1e3);
          processRouteTreeResult = this.buildRouteTree();
          if (globalThis.__TSR_CACHE__ === void 0) globalThis.__TSR_CACHE__ = {
            routeTree: this.routeTree,
            processRouteTreeResult,
            resolvePathCache: this.resolvePathCache
          };
        }
        this.setRoutes(processRouteTreeResult);
      }
      if (!this.stores && this.latestLocation) {
        const config = this.getStoreConfig(this);
        this.batch = config.batch;
        this.stores = createRouterStores(getInitialRouterState(this.latestLocation), config);
      }
      let needsLocationUpdate = false;
      const nextBasepath = this.options.basepath ?? "/";
      const nextRewriteOption = this.options.rewrite;
      if (basepathWasUnset || prevBasepath !== nextBasepath || prevRewriteOption !== nextRewriteOption) {
        this.basepath = nextBasepath;
        const rewrites = [];
        const trimmed = trimPath(nextBasepath);
        if (trimmed && trimmed !== "/") rewrites.push(rewriteBasepath({ basepath: nextBasepath }));
        if (nextRewriteOption) rewrites.push(nextRewriteOption);
        this.rewrite = rewrites.length === 0 ? void 0 : rewrites.length === 1 ? rewrites[0] : composeRewrites(rewrites);
        if (this.history) this.updateLatestLocation();
        needsLocationUpdate = true;
      }
      if (needsLocationUpdate && this.stores) this.stores.location.set(this.latestLocation);
      if (typeof window !== "undefined" && "CSS" in window && typeof window.CSS?.supports === "function") this.isViewTransitionTypesSupported = window.CSS.supports("selector(:active-view-transition-type(a)");
    };
    this.updateLatestLocation = () => {
      this.latestLocation = this.parseLocation(this.history.location, this.latestLocation);
    };
    this.buildRouteTree = () => {
      const result = processRouteTree(this.routeTree, this.options.caseSensitive, (route, i) => {
        route.init({ originalIndex: i });
      });
      if (this.options.routeMasks) processRouteMasks(this.options.routeMasks, result.processedTree);
      return result;
    };
    this.subscribe = (eventType, fn) => {
      const listener = {
        eventType,
        fn
      };
      this.subscribers.add(listener);
      return () => {
        this.subscribers.delete(listener);
      };
    };
    this.emit = (routerEvent) => {
      this.subscribers.forEach((listener) => {
        if (listener.eventType === routerEvent.type) listener.fn(routerEvent);
      });
    };
    this.parseLocation = (locationToParse, previousLocation) => {
      const parse = ({ pathname, search, hash, href, state }) => {
        if (!this.rewrite && !/[ \x00-\x1f\x7f\u0080-\uffff]/.test(pathname)) {
          const parsedSearch2 = this.options.parseSearch(search);
          const searchStr2 = this.options.stringifySearch(parsedSearch2);
          return {
            href: pathname + searchStr2 + hash,
            publicHref: pathname + searchStr2 + hash,
            pathname: decodePath(pathname).path,
            external: false,
            searchStr: searchStr2,
            search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch2),
            hash: decodePath(hash.slice(1)).path,
            state: replaceEqualDeep(previousLocation?.state, state)
          };
        }
        const fullUrl = new URL(href, this.origin);
        const url = executeRewriteInput(this.rewrite, fullUrl);
        const parsedSearch = this.options.parseSearch(url.search);
        const searchStr = this.options.stringifySearch(parsedSearch);
        url.search = searchStr;
        return {
          href: url.href.replace(url.origin, ""),
          publicHref: href,
          pathname: decodePath(url.pathname).path,
          external: !!this.rewrite && url.origin !== this.origin,
          searchStr,
          search: nullReplaceEqualDeep(previousLocation?.search, parsedSearch),
          hash: decodePath(url.hash.slice(1)).path,
          state: replaceEqualDeep(previousLocation?.state, state)
        };
      };
      const location = parse(locationToParse);
      const { __tempLocation, __tempKey } = location.state;
      if (__tempLocation && (!__tempKey || __tempKey === this.tempLocationKey)) {
        const parsedTempLocation = parse(__tempLocation);
        parsedTempLocation.state.key = location.state.key;
        parsedTempLocation.state.__TSR_key = location.state.__TSR_key;
        delete parsedTempLocation.state.__tempLocation;
        return {
          ...parsedTempLocation,
          maskedLocation: location
        };
      }
      return location;
    };
    this.resolvePathWithBase = (from, path) => {
      return resolvePath({
        base: from,
        to: cleanPath(path),
        trailingSlash: this.options.trailingSlash,
        cache: this.resolvePathCache
      });
    };
    this.matchRoutes = (pathnameOrNext, locationSearchOrOpts, opts) => {
      if (typeof pathnameOrNext === "string") return this.matchRoutesInternal({
        pathname: pathnameOrNext,
        search: locationSearchOrOpts
      }, opts);
      return this.matchRoutesInternal(pathnameOrNext, locationSearchOrOpts);
    };
    this.getMatchedRoutes = (pathname) => {
      return getMatchedRoutes({
        pathname,
        routesById: this.routesById,
        processedTree: this.processedTree
      });
    };
    this.cancelMatch = (id) => {
      const match = this.getMatch(id);
      if (!match) return;
      match.abortController.abort();
      clearTimeout(match._nonReactive.pendingTimeout);
      match._nonReactive.pendingTimeout = void 0;
    };
    this.cancelMatches = () => {
      this.stores.pendingIds.get().forEach((matchId) => {
        this.cancelMatch(matchId);
      });
      this.stores.matchesId.get().forEach((matchId) => {
        if (this.stores.pendingMatchStores.has(matchId)) return;
        const match = this.stores.matchStores.get(matchId)?.get();
        if (!match) return;
        if (match.status === "pending" || match.isFetching === "loader") this.cancelMatch(matchId);
      });
    };
    this.buildLocation = (opts) => {
      const build = (dest = {}) => {
        const currentLocation = dest._fromLocation || this.pendingBuiltLocation || this.latestLocation;
        const lightweightResult = this.matchRoutesLightweight(currentLocation);
        if (dest.from && false) ;
        const defaultedFromPath = dest.unsafeRelative === "path" ? currentLocation.pathname : dest.from ?? lightweightResult.fullPath;
        const fromPath = this.resolvePathWithBase(defaultedFromPath, ".");
        const fromSearch = lightweightResult.search;
        const fromParams = Object.assign(/* @__PURE__ */ Object.create(null), lightweightResult.params);
        const nextTo = dest.to ? this.resolvePathWithBase(fromPath, `${dest.to}`) : this.resolvePathWithBase(fromPath, ".");
        const nextParams = dest.params === false || dest.params === null ? /* @__PURE__ */ Object.create(null) : (dest.params ?? true) === true ? fromParams : Object.assign(fromParams, functionalUpdate(dest.params, fromParams));
        const destMatchResult = this.getMatchedRoutes(nextTo);
        let destRoutes = destMatchResult.matchedRoutes;
        if ((!destMatchResult.foundRoute || destMatchResult.foundRoute.path !== "/" && destMatchResult.routeParams["**"]) && this.options.notFoundRoute) destRoutes = [...destRoutes, this.options.notFoundRoute];
        if (Object.keys(nextParams).length > 0) for (const route of destRoutes) {
          const fn = route.options.params?.stringify ?? route.options.stringifyParams;
          if (fn) try {
            Object.assign(nextParams, fn(nextParams));
          } catch {
          }
        }
        const nextPathname = opts.leaveParams ? nextTo : decodePath(interpolatePath({
          path: nextTo,
          params: nextParams,
          decoder: this.pathParamsDecoder,
          server: this.isServer
        }).interpolatedPath).path;
        let nextSearch = fromSearch;
        if (opts._includeValidateSearch && this.options.search?.strict) {
          const validatedSearch = {};
          destRoutes.forEach((route) => {
            if (route.options.validateSearch) try {
              Object.assign(validatedSearch, validateSearch(route.options.validateSearch, {
                ...validatedSearch,
                ...nextSearch
              }));
            } catch {
            }
          });
          nextSearch = validatedSearch;
        }
        nextSearch = applySearchMiddleware({
          search: nextSearch,
          dest,
          destRoutes,
          _includeValidateSearch: opts._includeValidateSearch
        });
        nextSearch = nullReplaceEqualDeep(fromSearch, nextSearch);
        const searchStr = this.options.stringifySearch(nextSearch);
        const hash = dest.hash === true ? currentLocation.hash : dest.hash ? functionalUpdate(dest.hash, currentLocation.hash) : void 0;
        const hashStr = hash ? `#${hash}` : "";
        let nextState = dest.state === true ? currentLocation.state : dest.state ? functionalUpdate(dest.state, currentLocation.state) : {};
        nextState = replaceEqualDeep(currentLocation.state, nextState);
        const fullPath = `${nextPathname}${searchStr}${hashStr}`;
        let href;
        let publicHref;
        let external = false;
        if (this.rewrite) {
          const url = new URL(fullPath, this.origin);
          const rewrittenUrl = executeRewriteOutput(this.rewrite, url);
          href = url.href.replace(url.origin, "");
          if (rewrittenUrl.origin !== this.origin) {
            publicHref = rewrittenUrl.href;
            external = true;
          } else publicHref = rewrittenUrl.pathname + rewrittenUrl.search + rewrittenUrl.hash;
        } else {
          href = encodePathLikeUrl(fullPath);
          publicHref = href;
        }
        return {
          publicHref,
          href,
          pathname: nextPathname,
          search: nextSearch,
          searchStr,
          state: nextState,
          hash: hash ?? "",
          external,
          unmaskOnReload: dest.unmaskOnReload
        };
      };
      const buildWithMatches = (dest = {}, maskedDest) => {
        const next = build(dest);
        let maskedNext = maskedDest ? build(maskedDest) : void 0;
        if (!maskedNext) {
          const params = /* @__PURE__ */ Object.create(null);
          if (this.options.routeMasks) {
            const match = findFlatMatch(next.pathname, this.processedTree);
            if (match) {
              Object.assign(params, match.rawParams);
              const { from: _from, params: maskParams, ...maskProps } = match.route;
              const nextParams = maskParams === false || maskParams === null ? /* @__PURE__ */ Object.create(null) : (maskParams ?? true) === true ? params : Object.assign(params, functionalUpdate(maskParams, params));
              maskedDest = {
                from: opts.from,
                ...maskProps,
                params: nextParams
              };
              maskedNext = build(maskedDest);
            }
          }
        }
        if (maskedNext) next.maskedLocation = maskedNext;
        return next;
      };
      if (opts.mask) return buildWithMatches(opts, {
        from: opts.from,
        ...opts.mask
      });
      return buildWithMatches(opts);
    };
    this.commitLocation = async ({ viewTransition, ignoreBlocker, ...next }) => {
      const isSameState = () => {
        const ignoredProps = [
          "key",
          "__TSR_key",
          "__TSR_index",
          "__hashScrollIntoViewOptions"
        ];
        ignoredProps.forEach((prop) => {
          next.state[prop] = this.latestLocation.state[prop];
        });
        const isEqual = deepEqual(next.state, this.latestLocation.state);
        ignoredProps.forEach((prop) => {
          delete next.state[prop];
        });
        return isEqual;
      };
      const isSameUrl = trimPathRight(this.latestLocation.href) === trimPathRight(next.href);
      let previousCommitPromise = this.commitLocationPromise;
      this.commitLocationPromise = createControlledPromise(() => {
        previousCommitPromise?.resolve();
        previousCommitPromise = void 0;
      });
      if (isSameUrl && isSameState()) this.load();
      else {
        let { maskedLocation, hashScrollIntoView, ...nextHistory } = next;
        if (maskedLocation) {
          nextHistory = {
            ...maskedLocation,
            state: {
              ...maskedLocation.state,
              __tempKey: void 0,
              __tempLocation: {
                ...nextHistory,
                search: nextHistory.searchStr,
                state: {
                  ...nextHistory.state,
                  __tempKey: void 0,
                  __tempLocation: void 0,
                  __TSR_key: void 0,
                  key: void 0
                }
              }
            }
          };
          if (nextHistory.unmaskOnReload ?? this.options.unmaskOnReload ?? false) nextHistory.state.__tempKey = this.tempLocationKey;
        }
        nextHistory.state.__hashScrollIntoViewOptions = hashScrollIntoView ?? this.options.defaultHashScrollIntoView ?? true;
        this.shouldViewTransition = viewTransition;
        this.history[next.replace ? "replace" : "push"](nextHistory.publicHref, nextHistory.state, { ignoreBlocker });
      }
      this.resetNextScroll = next.resetScroll ?? true;
      if (!this.history.subscribers.size) this.load();
      return this.commitLocationPromise;
    };
    this.buildAndCommitLocation = ({ replace, resetScroll, hashScrollIntoView, viewTransition, ignoreBlocker, href, ...rest } = {}) => {
      if (href) {
        const currentIndex = this.history.location.state.__TSR_index;
        const parsed = parseHref(href, { __TSR_index: replace ? currentIndex : currentIndex + 1 });
        const hrefUrl = new URL(parsed.pathname, this.origin);
        rest.to = executeRewriteInput(this.rewrite, hrefUrl).pathname;
        rest.search = this.options.parseSearch(parsed.search);
        rest.hash = parsed.hash.slice(1);
      }
      const location = this.buildLocation({
        ...rest,
        _includeValidateSearch: true
      });
      this.pendingBuiltLocation = location;
      const commitPromise = this.commitLocation({
        ...location,
        viewTransition,
        replace,
        resetScroll,
        hashScrollIntoView,
        ignoreBlocker
      });
      Promise.resolve().then(() => {
        if (this.pendingBuiltLocation === location) this.pendingBuiltLocation = void 0;
      });
      return commitPromise;
    };
    this.navigate = async ({ to, reloadDocument, href, publicHref, ...rest }) => {
      let hrefIsUrl = false;
      if (href) try {
        new URL(`${href}`);
        hrefIsUrl = true;
      } catch {
      }
      if (hrefIsUrl && !reloadDocument) reloadDocument = true;
      if (reloadDocument) {
        if (to !== void 0 || !href) {
          const location = this.buildLocation({
            to,
            ...rest
          });
          href = href ?? location.publicHref;
          publicHref = publicHref ?? location.publicHref;
        }
        const reloadHref = !hrefIsUrl && publicHref ? publicHref : href;
        if (isDangerousProtocol(reloadHref, this.protocolAllowlist)) {
          return Promise.resolve();
        }
        if (!rest.ignoreBlocker) {
          const blockers = this.history.getBlockers?.() ?? [];
          for (const blocker of blockers) if (blocker?.blockerFn) {
            if (await blocker.blockerFn({
              currentLocation: this.latestLocation,
              nextLocation: this.latestLocation,
              action: "PUSH"
            })) return Promise.resolve();
          }
        }
        if (rest.replace) window.location.replace(reloadHref);
        else window.location.href = reloadHref;
        return Promise.resolve();
      }
      return this.buildAndCommitLocation({
        ...rest,
        href,
        to,
        _isNavigate: true
      });
    };
    this.beforeLoad = () => {
      this.cancelMatches();
      this.updateLatestLocation();
      {
        const nextLocation = this.buildLocation({
          to: this.latestLocation.pathname,
          search: true,
          params: true,
          hash: true,
          state: true,
          _includeValidateSearch: true
        });
        if (this.latestLocation.publicHref !== nextLocation.publicHref) {
          const href = this.getParsedLocationHref(nextLocation);
          if (nextLocation.external) throw redirect({ href });
          else throw redirect({
            href,
            _builtLocation: nextLocation
          });
        }
      }
      const pendingMatches = this.matchRoutes(this.latestLocation);
      const nextCachedMatches = this.stores.cachedMatches.get().filter((d) => !pendingMatches.some((e) => e.id === d.id));
      this.batch(() => {
        this.stores.status.set("pending");
        this.stores.statusCode.set(200);
        this.stores.isLoading.set(true);
        this.stores.location.set(this.latestLocation);
        this.stores.setPending(pendingMatches);
        this.stores.setCached(nextCachedMatches);
      });
    };
    this.load = async (opts) => {
      let redirect2;
      let notFound2;
      let loadPromise;
      const previousLocation = this.stores.resolvedLocation.get() ?? this.stores.location.get();
      loadPromise = new Promise((resolve) => {
        this.startTransition(async () => {
          try {
            this.beforeLoad();
            const next = this.latestLocation;
            const locationChangeInfo = getLocationChangeInfo(next, this.stores.resolvedLocation.get());
            if (!this.stores.redirect.get()) this.emit({
              type: "onBeforeNavigate",
              ...locationChangeInfo
            });
            this.emit({
              type: "onBeforeLoad",
              ...locationChangeInfo
            });
            await loadMatches({
              router: this,
              sync: opts?.sync,
              forceStaleReload: previousLocation.href === next.href,
              matches: this.stores.pendingMatches.get(),
              location: next,
              updateMatch: this.updateMatch,
              onReady: async () => {
                this.startTransition(() => {
                  this.startViewTransition(async () => {
                    let exitingMatches = null;
                    let hookExitingMatches = null;
                    let hookEnteringMatches = null;
                    let hookStayingMatches = null;
                    this.batch(() => {
                      const pendingMatches = this.stores.pendingMatches.get();
                      const mountPending = pendingMatches.length;
                      const currentMatches = this.stores.matches.get();
                      exitingMatches = mountPending ? currentMatches.filter((match) => !this.stores.pendingMatchStores.has(match.id)) : null;
                      const pendingRouteIds = /* @__PURE__ */ new Set();
                      for (const s of this.stores.pendingMatchStores.values()) if (s.routeId) pendingRouteIds.add(s.routeId);
                      const activeRouteIds = /* @__PURE__ */ new Set();
                      for (const s of this.stores.matchStores.values()) if (s.routeId) activeRouteIds.add(s.routeId);
                      hookExitingMatches = mountPending ? currentMatches.filter((match) => !pendingRouteIds.has(match.routeId)) : null;
                      hookEnteringMatches = mountPending ? pendingMatches.filter((match) => !activeRouteIds.has(match.routeId)) : null;
                      hookStayingMatches = mountPending ? pendingMatches.filter((match) => activeRouteIds.has(match.routeId)) : currentMatches;
                      this.stores.isLoading.set(false);
                      this.stores.loadedAt.set(Date.now());
                      if (mountPending) {
                        this.stores.setMatches(pendingMatches);
                        this.stores.setPending([]);
                        this.stores.setCached([...this.stores.cachedMatches.get(), ...exitingMatches.filter((d) => d.status !== "error" && d.status !== "notFound" && d.status !== "redirected")]);
                        this.clearExpiredCache();
                      }
                    });
                    for (const [matches, hook] of [
                      [hookExitingMatches, "onLeave"],
                      [hookEnteringMatches, "onEnter"],
                      [hookStayingMatches, "onStay"]
                    ]) {
                      if (!matches) continue;
                      for (const match of matches) this.looseRoutesById[match.routeId].options[hook]?.(match);
                    }
                  });
                });
              }
            });
          } catch (err) {
            if (isRedirect(err)) {
              redirect2 = err;
            } else if (isNotFound(err)) notFound2 = err;
            const nextStatusCode = redirect2 ? redirect2.status : notFound2 ? 404 : this.stores.matches.get().some((d) => d.status === "error") ? 500 : 200;
            this.batch(() => {
              this.stores.statusCode.set(nextStatusCode);
              this.stores.redirect.set(redirect2);
            });
          }
          if (this.latestLoadPromise === loadPromise) {
            this.commitLocationPromise?.resolve();
            this.latestLoadPromise = void 0;
            this.commitLocationPromise = void 0;
          }
          resolve();
        });
      });
      this.latestLoadPromise = loadPromise;
      await loadPromise;
      while (this.latestLoadPromise && loadPromise !== this.latestLoadPromise) await this.latestLoadPromise;
      let newStatusCode = void 0;
      if (this.hasNotFoundMatch()) newStatusCode = 404;
      else if (this.stores.matches.get().some((d) => d.status === "error")) newStatusCode = 500;
      if (newStatusCode !== void 0) this.stores.statusCode.set(newStatusCode);
    };
    this.startViewTransition = (fn) => {
      const shouldViewTransition = this.shouldViewTransition ?? this.options.defaultViewTransition;
      this.shouldViewTransition = void 0;
      if (shouldViewTransition && typeof document !== "undefined" && "startViewTransition" in document && typeof document.startViewTransition === "function") {
        let startViewTransitionParams;
        if (typeof shouldViewTransition === "object" && this.isViewTransitionTypesSupported) {
          const next = this.latestLocation;
          const prevLocation = this.stores.resolvedLocation.get();
          const resolvedViewTransitionTypes = typeof shouldViewTransition.types === "function" ? shouldViewTransition.types(getLocationChangeInfo(next, prevLocation)) : shouldViewTransition.types;
          if (resolvedViewTransitionTypes === false) {
            fn();
            return;
          }
          startViewTransitionParams = {
            update: fn,
            types: resolvedViewTransitionTypes
          };
        } else startViewTransitionParams = fn;
        document.startViewTransition(startViewTransitionParams);
      } else fn();
    };
    this.updateMatch = (id, updater) => {
      this.startTransition(() => {
        const pendingMatch = this.stores.pendingMatchStores.get(id);
        if (pendingMatch) {
          pendingMatch.set(updater);
          return;
        }
        const activeMatch = this.stores.matchStores.get(id);
        if (activeMatch) {
          activeMatch.set(updater);
          return;
        }
        const cachedMatch = this.stores.cachedMatchStores.get(id);
        if (cachedMatch) {
          const next = updater(cachedMatch.get());
          if (next.status === "redirected") {
            if (this.stores.cachedMatchStores.delete(id)) this.stores.cachedIds.set((prev) => prev.filter((matchId) => matchId !== id));
          } else cachedMatch.set(next);
        }
      });
    };
    this.getMatch = (matchId) => {
      return this.stores.cachedMatchStores.get(matchId)?.get() ?? this.stores.pendingMatchStores.get(matchId)?.get() ?? this.stores.matchStores.get(matchId)?.get();
    };
    this.invalidate = (opts) => {
      const invalidate = (d) => {
        if (opts?.filter?.(d) ?? true) return {
          ...d,
          invalid: true,
          ...opts?.forcePending || d.status === "error" || d.status === "notFound" ? {
            status: "pending",
            error: void 0
          } : void 0
        };
        return d;
      };
      this.batch(() => {
        this.stores.setMatches(this.stores.matches.get().map(invalidate));
        this.stores.setCached(this.stores.cachedMatches.get().map(invalidate));
        this.stores.setPending(this.stores.pendingMatches.get().map(invalidate));
      });
      this.shouldViewTransition = false;
      return this.load({ sync: opts?.sync });
    };
    this.getParsedLocationHref = (location) => {
      return location.publicHref || "/";
    };
    this.resolveRedirect = (redirect2) => {
      const locationHeader = redirect2.headers.get("Location");
      if (!redirect2.options.href || redirect2.options._builtLocation) {
        const location = redirect2.options._builtLocation ?? this.buildLocation(redirect2.options);
        const href = this.getParsedLocationHref(location);
        redirect2.options.href = href;
        redirect2.headers.set("Location", href);
      } else if (locationHeader) try {
        const url = new URL(locationHeader);
        if (this.origin && url.origin === this.origin) {
          const href = url.pathname + url.search + url.hash;
          redirect2.options.href = href;
          redirect2.headers.set("Location", href);
        }
      } catch {
      }
      if (redirect2.options.href && !redirect2.options._builtLocation && isDangerousProtocol(redirect2.options.href, this.protocolAllowlist)) throw new Error("Redirect blocked: unsafe protocol");
      if (!redirect2.headers.get("Location")) redirect2.headers.set("Location", redirect2.options.href);
      return redirect2;
    };
    this.clearCache = (opts) => {
      const filter = opts?.filter;
      if (filter !== void 0) this.stores.setCached(this.stores.cachedMatches.get().filter((m) => !filter(m)));
      else this.stores.setCached([]);
    };
    this.clearExpiredCache = () => {
      const now = Date.now();
      const filter = (d) => {
        const route = this.looseRoutesById[d.routeId];
        if (!route.options.loader) return true;
        const gcTime = (d.preload ? route.options.preloadGcTime ?? this.options.defaultPreloadGcTime : route.options.gcTime ?? this.options.defaultGcTime) ?? 300 * 1e3;
        if (d.status === "error") return true;
        return now - d.updatedAt >= gcTime;
      };
      this.clearCache({ filter });
    };
    this.loadRouteChunk = loadRouteChunk;
    this.preloadRoute = async (opts) => {
      const next = opts._builtLocation ?? this.buildLocation(opts);
      let matches = this.matchRoutes(next, {
        throwOnError: true,
        preload: true,
        dest: opts
      });
      const activeMatchIds = /* @__PURE__ */ new Set([...this.stores.matchesId.get(), ...this.stores.pendingIds.get()]);
      const loadedMatchIds = /* @__PURE__ */ new Set([...activeMatchIds, ...this.stores.cachedIds.get()]);
      const matchesToCache = matches.filter((match) => !loadedMatchIds.has(match.id));
      if (matchesToCache.length) {
        const cachedMatches = this.stores.cachedMatches.get();
        this.stores.setCached([...cachedMatches, ...matchesToCache]);
      }
      try {
        matches = await loadMatches({
          router: this,
          matches,
          location: next,
          preload: true,
          updateMatch: (id, updater) => {
            if (activeMatchIds.has(id)) matches = matches.map((d) => d.id === id ? updater(d) : d);
            else this.updateMatch(id, updater);
          }
        });
        return matches;
      } catch (err) {
        if (isRedirect(err)) {
          if (err.options.reloadDocument) return;
          return await this.preloadRoute({
            ...err.options,
            _fromLocation: next
          });
        }
        if (!isNotFound(err)) console.error(err);
        return;
      }
    };
    this.matchRoute = (location, opts) => {
      const matchLocation = {
        ...location,
        to: location.to ? this.resolvePathWithBase(location.from || "", location.to) : void 0,
        params: location.params || {},
        leaveParams: true
      };
      const next = this.buildLocation(matchLocation);
      if (opts?.pending && this.stores.status.get() !== "pending") return false;
      const baseLocation = (opts?.pending === void 0 ? !this.stores.isLoading.get() : opts.pending) ? this.latestLocation : this.stores.resolvedLocation.get() || this.stores.location.get();
      const match = findSingleMatch(next.pathname, opts?.caseSensitive ?? false, opts?.fuzzy ?? false, baseLocation.pathname, this.processedTree);
      if (!match) return false;
      if (location.params) {
        if (!deepEqual(match.rawParams, location.params, { partial: true })) return false;
      }
      if (opts?.includeSearch ?? true) return deepEqual(baseLocation.search, next.search, { partial: true }) ? match.rawParams : false;
      return match.rawParams;
    };
    this.hasNotFoundMatch = () => {
      return this.stores.matches.get().some((d) => d.status === "notFound" || d.globalNotFound);
    };
    this.getStoreConfig = getStoreConfig;
    this.update({
      defaultPreloadDelay: 50,
      defaultPendingMs: 1e3,
      defaultPendingMinMs: 500,
      context: void 0,
      ...options,
      caseSensitive: options.caseSensitive ?? false,
      notFoundMode: options.notFoundMode ?? "fuzzy",
      stringifySearch: options.stringifySearch ?? defaultStringifySearch,
      parseSearch: options.parseSearch ?? defaultParseSearch,
      protocolAllowlist: options.protocolAllowlist ?? DEFAULT_PROTOCOL_ALLOWLIST
    });
    if (typeof document !== "undefined") self.__TSR_ROUTER__ = this;
  }
  isShell() {
    return !!this.options.isShell;
  }
  isPrerendering() {
    return !!this.options.isPrerendering;
  }
  get state() {
    return this.stores.__store.get();
  }
  setRoutes({ routesById, routesByPath, processedTree }) {
    this.routesById = routesById;
    this.routesByPath = routesByPath;
    this.processedTree = processedTree;
    const notFoundRoute = this.options.notFoundRoute;
    if (notFoundRoute) {
      notFoundRoute.init({ originalIndex: 99999999999 });
      this.routesById[notFoundRoute.id] = notFoundRoute;
    }
  }
  get looseRoutesById() {
    return this.routesById;
  }
  getParentContext(parentMatch) {
    return !parentMatch?.id ? this.options.context ?? void 0 : parentMatch.context ?? this.options.context ?? void 0;
  }
  matchRoutesInternal(next, opts) {
    const matchedRoutesResult = this.getMatchedRoutes(next.pathname);
    const { foundRoute, routeParams, parsedParams } = matchedRoutesResult;
    let { matchedRoutes } = matchedRoutesResult;
    let isGlobalNotFound = false;
    if (foundRoute ? foundRoute.path !== "/" && routeParams["**"] : trimPathRight(next.pathname)) if (this.options.notFoundRoute) matchedRoutes = [...matchedRoutes, this.options.notFoundRoute];
    else isGlobalNotFound = true;
    const globalNotFoundRouteId = isGlobalNotFound ? findGlobalNotFoundRouteId(this.options.notFoundMode, matchedRoutes) : void 0;
    const matches = new Array(matchedRoutes.length);
    const previousActiveMatchesByRouteId = /* @__PURE__ */ new Map();
    for (const store of this.stores.matchStores.values()) if (store.routeId) previousActiveMatchesByRouteId.set(store.routeId, store.get());
    for (let index = 0; index < matchedRoutes.length; index++) {
      const route = matchedRoutes[index];
      const parentMatch = matches[index - 1];
      let preMatchSearch;
      let strictMatchSearch;
      let searchError;
      {
        const parentSearch = parentMatch?.search ?? next.search;
        const parentStrictSearch = parentMatch?._strictSearch ?? void 0;
        try {
          const strictSearch = validateSearch(route.options.validateSearch, { ...parentSearch }) ?? void 0;
          preMatchSearch = {
            ...parentSearch,
            ...strictSearch
          };
          strictMatchSearch = {
            ...parentStrictSearch,
            ...strictSearch
          };
          searchError = void 0;
        } catch (err) {
          let searchParamError = err;
          if (!(err instanceof SearchParamError)) searchParamError = new SearchParamError(err.message, { cause: err });
          if (opts?.throwOnError) throw searchParamError;
          preMatchSearch = parentSearch;
          strictMatchSearch = {};
          searchError = searchParamError;
        }
      }
      const loaderDeps = route.options.loaderDeps?.({ search: preMatchSearch }) ?? "";
      const loaderDepsHash = loaderDeps ? JSON.stringify(loaderDeps) : "";
      const { interpolatedPath, usedParams } = interpolatePath({
        path: route.fullPath,
        params: routeParams,
        decoder: this.pathParamsDecoder,
        server: this.isServer
      });
      const matchId = route.id + interpolatedPath + loaderDepsHash;
      const existingMatch = this.getMatch(matchId);
      const previousMatch = previousActiveMatchesByRouteId.get(route.id);
      const strictParams = existingMatch?._strictParams ?? usedParams;
      let paramsError = void 0;
      if (!existingMatch) try {
        extractStrictParams(route, usedParams, parsedParams, strictParams);
      } catch (err) {
        if (isNotFound(err) || isRedirect(err)) paramsError = err;
        else paramsError = new PathParamError(err.message, { cause: err });
        if (opts?.throwOnError) throw paramsError;
      }
      Object.assign(routeParams, strictParams);
      const cause = previousMatch ? "stay" : "enter";
      let match;
      if (existingMatch) match = {
        ...existingMatch,
        cause,
        params: previousMatch?.params ?? routeParams,
        _strictParams: strictParams,
        search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : nullReplaceEqualDeep(existingMatch.search, preMatchSearch),
        _strictSearch: strictMatchSearch
      };
      else {
        const status = route.options.loader || route.options.beforeLoad || route.lazyFn || routeNeedsPreload(route) ? "pending" : "success";
        match = {
          id: matchId,
          ssr: void 0,
          index,
          routeId: route.id,
          params: previousMatch?.params ?? routeParams,
          _strictParams: strictParams,
          pathname: interpolatedPath,
          updatedAt: Date.now(),
          search: previousMatch ? nullReplaceEqualDeep(previousMatch.search, preMatchSearch) : preMatchSearch,
          _strictSearch: strictMatchSearch,
          searchError: void 0,
          status,
          isFetching: false,
          error: void 0,
          paramsError,
          __routeContext: void 0,
          _nonReactive: { loadPromise: createControlledPromise() },
          __beforeLoadContext: void 0,
          context: {},
          abortController: new AbortController(),
          fetchCount: 0,
          cause,
          loaderDeps: previousMatch ? replaceEqualDeep(previousMatch.loaderDeps, loaderDeps) : loaderDeps,
          invalid: false,
          preload: false,
          links: void 0,
          scripts: void 0,
          headScripts: void 0,
          meta: void 0,
          staticData: route.options.staticData || {},
          fullPath: route.fullPath
        };
      }
      if (!opts?.preload) match.globalNotFound = globalNotFoundRouteId === route.id;
      match.searchError = searchError;
      const parentContext = this.getParentContext(parentMatch);
      match.context = {
        ...parentContext,
        ...match.__routeContext,
        ...match.__beforeLoadContext
      };
      matches[index] = match;
    }
    for (let index = 0; index < matches.length; index++) {
      const match = matches[index];
      const route = this.looseRoutesById[match.routeId];
      const existingMatch = this.getMatch(match.id);
      const previousMatch = previousActiveMatchesByRouteId.get(match.routeId);
      match.params = previousMatch ? nullReplaceEqualDeep(previousMatch.params, routeParams) : routeParams;
      if (!existingMatch) {
        const parentMatch = matches[index - 1];
        const parentContext = this.getParentContext(parentMatch);
        if (route.options.context) {
          const contextFnContext = {
            deps: match.loaderDeps,
            params: match.params,
            context: parentContext ?? {},
            location: next,
            navigate: (opts2) => this.navigate({
              ...opts2,
              _fromLocation: next
            }),
            buildLocation: this.buildLocation,
            cause: match.cause,
            abortController: match.abortController,
            preload: !!match.preload,
            matches,
            routeId: route.id
          };
          match.__routeContext = route.options.context(contextFnContext) ?? void 0;
        }
        match.context = {
          ...parentContext,
          ...match.__routeContext,
          ...match.__beforeLoadContext
        };
      }
    }
    return matches;
  }
  /**
  * Lightweight route matching for buildLocation.
  * Only computes fullPath, accumulated search, and params - skipping expensive
  * operations like AbortController, ControlledPromise, loaderDeps, and full match objects.
  */
  matchRoutesLightweight(location) {
    const { matchedRoutes, routeParams, parsedParams } = this.getMatchedRoutes(location.pathname);
    const lastRoute = last(matchedRoutes);
    const accumulatedSearch = { ...location.search };
    for (const route of matchedRoutes) try {
      Object.assign(accumulatedSearch, validateSearch(route.options.validateSearch, accumulatedSearch));
    } catch {
    }
    const lastStateMatchId = last(this.stores.matchesId.get());
    const lastStateMatch = lastStateMatchId && this.stores.matchStores.get(lastStateMatchId)?.get();
    const canReuseParams = lastStateMatch && lastStateMatch.routeId === lastRoute.id && lastStateMatch.pathname === location.pathname;
    let params;
    if (canReuseParams) params = lastStateMatch.params;
    else {
      const strictParams = Object.assign(/* @__PURE__ */ Object.create(null), routeParams);
      for (const route of matchedRoutes) try {
        extractStrictParams(route, routeParams, parsedParams ?? {}, strictParams);
      } catch {
      }
      params = strictParams;
    }
    return {
      matchedRoutes,
      fullPath: lastRoute.fullPath,
      search: accumulatedSearch,
      params
    };
  }
};
var SearchParamError = class extends Error {
};
var PathParamError = class extends Error {
};
function getInitialRouterState(location) {
  return {
    loadedAt: 0,
    isLoading: false,
    isTransitioning: false,
    status: "idle",
    resolvedLocation: void 0,
    location,
    matches: [],
    statusCode: 200
  };
}
function validateSearch(validateSearch2, input) {
  if (validateSearch2 == null) return {};
  if ("~standard" in validateSearch2) {
    const result = validateSearch2["~standard"].validate(input);
    if (result instanceof Promise) throw new SearchParamError("Async validation not supported");
    if (result.issues) throw new SearchParamError(JSON.stringify(result.issues, void 0, 2), { cause: result });
    return result.value;
  }
  if ("parse" in validateSearch2) return validateSearch2.parse(input);
  if (typeof validateSearch2 === "function") return validateSearch2(input);
  return {};
}
function getMatchedRoutes({ pathname, routesById, processedTree }) {
  const routeParams = /* @__PURE__ */ Object.create(null);
  const trimmedPath = trimPathRight(pathname);
  let foundRoute = void 0;
  let parsedParams = void 0;
  const match = findRouteMatch(trimmedPath, processedTree, true);
  if (match) {
    foundRoute = match.route;
    Object.assign(routeParams, match.rawParams);
    parsedParams = Object.assign(/* @__PURE__ */ Object.create(null), match.parsedParams);
  }
  return {
    matchedRoutes: match?.branch || [routesById["__root__"]],
    routeParams,
    foundRoute,
    parsedParams
  };
}
function applySearchMiddleware({ search, dest, destRoutes, _includeValidateSearch }) {
  return buildMiddlewareChain(destRoutes)(search, dest, _includeValidateSearch ?? false);
}
function buildMiddlewareChain(destRoutes) {
  const context = {
    dest: null,
    _includeValidateSearch: false,
    middlewares: []
  };
  for (const route of destRoutes) {
    if ("search" in route.options) {
      if (route.options.search?.middlewares) context.middlewares.push(...route.options.search.middlewares);
    } else if (route.options.preSearchFilters || route.options.postSearchFilters) {
      const legacyMiddleware = ({ search, next }) => {
        let nextSearch = search;
        if ("preSearchFilters" in route.options && route.options.preSearchFilters) nextSearch = route.options.preSearchFilters.reduce((prev, next2) => next2(prev), search);
        const result = next(nextSearch);
        if ("postSearchFilters" in route.options && route.options.postSearchFilters) return route.options.postSearchFilters.reduce((prev, next2) => next2(prev), result);
        return result;
      };
      context.middlewares.push(legacyMiddleware);
    }
    if (route.options.validateSearch) {
      const validate = ({ search, next }) => {
        const result = next(search);
        if (!context._includeValidateSearch) return result;
        try {
          return {
            ...result,
            ...validateSearch(route.options.validateSearch, result) ?? void 0
          };
        } catch {
          return result;
        }
      };
      context.middlewares.push(validate);
    }
  }
  const final = ({ search }) => {
    const dest = context.dest;
    if (!dest.search) return {};
    if (dest.search === true) return search;
    return functionalUpdate(dest.search, search);
  };
  context.middlewares.push(final);
  const applyNext = (index, currentSearch, middlewares) => {
    if (index >= middlewares.length) return currentSearch;
    const middleware = middlewares[index];
    const next = (newSearch) => {
      return applyNext(index + 1, newSearch, middlewares);
    };
    return middleware({
      search: currentSearch,
      next
    });
  };
  return function middleware(search, dest, _includeValidateSearch) {
    context.dest = dest;
    context._includeValidateSearch = _includeValidateSearch;
    return applyNext(0, search, context.middlewares);
  };
}
function findGlobalNotFoundRouteId(notFoundMode, routes) {
  if (notFoundMode !== "root") for (let i = routes.length - 1; i >= 0; i--) {
    const route = routes[i];
    if (route.children) return route.id;
  }
  return rootRouteId;
}
function extractStrictParams(route, referenceParams, parsedParams, accumulatedParams) {
  const parseParams = route.options.params?.parse ?? route.options.parseParams;
  if (parseParams) if (route.options.skipRouteOnParseError) {
    for (const key in referenceParams) if (key in parsedParams) accumulatedParams[key] = parsedParams[key];
  } else {
    const result = parseParams(accumulatedParams);
    Object.assign(accumulatedParams, result);
  }
}
var BaseRoute = class {
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
  constructor(options) {
    this.init = (opts) => {
      this.originalIndex = opts.originalIndex;
      const options2 = this.options;
      const isRoot = !options2?.path && !options2?.id;
      this.parentRoute = this.options.getParentRoute?.();
      if (isRoot) this._path = rootRouteId;
      else if (!this.parentRoute) {
        invariant();
      }
      let path = isRoot ? rootRouteId : options2?.path;
      if (path && path !== "/") path = trimPathLeft(path);
      const customId = options2?.id || path;
      let id = isRoot ? rootRouteId : joinPaths([this.parentRoute.id === "__root__" ? "" : this.parentRoute.id, customId]);
      if (path === "__root__") path = "/";
      if (id !== "__root__") id = joinPaths(["/", id]);
      const fullPath = id === "__root__" ? "/" : joinPaths([this.parentRoute.fullPath, path]);
      this._path = path;
      this._id = id;
      this._fullPath = fullPath;
      this._to = trimPathRight(fullPath);
    };
    this.addChildren = (children) => {
      return this._addFileChildren(children);
    };
    this._addFileChildren = (children) => {
      if (Array.isArray(children)) this.children = children;
      if (typeof children === "object" && children !== null) this.children = Object.values(children);
      return this;
    };
    this._addFileTypes = () => {
      return this;
    };
    this.updateLoader = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.update = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.lazy = (lazyFn) => {
      this.lazyFn = lazyFn;
      return this;
    };
    this.redirect = (opts) => redirect({
      from: this.fullPath,
      ...opts
    });
    this.options = options || {};
    this.isRoot = !options?.getParentRoute;
    if (options?.id && options?.path) throw new Error(`Route cannot have both an 'id' and a 'path' option.`);
  }
};
var BaseRootRoute = class extends BaseRoute {
  constructor(options) {
    super(options);
  }
};
function useMatch(opts) {
  const router2 = useRouter();
  const nearestMatchId = reactExports.useContext(opts.from ? dummyMatchContext : matchContext);
  const key = opts.from ?? nearestMatchId;
  const matchStore = key ? opts.from ? router2.stores.getRouteMatchStore(key) : router2.stores.matchStores.get(key) : void 0;
  {
    const match = matchStore?.get();
    if ((opts.shouldThrow ?? true) && !match) {
      invariant();
    }
    if (match === void 0) return;
    return opts.select ? opts.select(match) : match;
  }
}
function useLoaderData(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (s) => {
      return opts.select ? opts.select(s.loaderData) : s.loaderData;
    }
  });
}
function useLoaderDeps(opts) {
  const { select, ...rest } = opts;
  return useMatch({
    ...rest,
    select: (s) => {
      return select ? select(s.loaderDeps) : s.loaderDeps;
    }
  });
}
function useParams(opts) {
  return useMatch({
    from: opts.from,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    strict: opts.strict,
    select: (match) => {
      const params = opts.strict === false ? match.params : match._strictParams;
      return opts.select ? opts.select(params) : params;
    }
  });
}
function useSearch(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}
function useNavigate(_defaultOpts) {
  const router2 = useRouter();
  return reactExports.useCallback((options) => {
    return router2.navigate({
      ...options,
      from: options.from ?? _defaultOpts?.from
    });
  }, [_defaultOpts?.from, router2]);
}
function useRouteContext(opts) {
  return useMatch({
    ...opts,
    select: (match) => opts.select ? opts.select(match.context) : match.context
  });
}
requireReactDom();
function useLinkProps(options, forwardedRef) {
  const router2 = useRouter();
  const innerRef = useForwardedRef(forwardedRef);
  const { activeProps, inactiveProps, activeOptions, to, preload: userPreload, preloadDelay: userPreloadDelay, preloadIntentProximity: _preloadIntentProximity, hashScrollIntoView, replace, startTransition, resetScroll, viewTransition, children, target, disabled, style, className, onClick, onBlur, onFocus, onMouseEnter, onMouseLeave, onTouchStart, ignoreBlocker, params: _params, search: _search, hash: _hash, state: _state, mask: _mask, reloadDocument: _reloadDocument, unsafeRelative: _unsafeRelative, from: _from, _fromLocation, ...propsSafeToSpread } = options;
  {
    const safeInternal = isSafeInternal(to);
    if (typeof to === "string" && !safeInternal && to.indexOf(":") > -1) try {
      new URL(to);
      if (isDangerousProtocol(to, router2.protocolAllowlist)) {
        if (false) ;
        return {
          ...propsSafeToSpread,
          ref: innerRef,
          href: void 0,
          ...children && { children },
          ...target && { target },
          ...disabled && { disabled },
          ...style && { style },
          ...className && { className }
        };
      }
      return {
        ...propsSafeToSpread,
        ref: innerRef,
        href: to,
        ...children && { children },
        ...target && { target },
        ...disabled && { disabled },
        ...style && { style },
        ...className && { className }
      };
    } catch {
    }
    const next2 = router2.buildLocation({
      ...options,
      from: options.from
    });
    const hrefOption2 = getHrefOption(next2.maskedLocation ? next2.maskedLocation.publicHref : next2.publicHref, next2.maskedLocation ? next2.maskedLocation.external : next2.external, router2.history, disabled);
    const externalLink2 = (() => {
      if (hrefOption2?.external) {
        if (isDangerousProtocol(hrefOption2.href, router2.protocolAllowlist)) {
          return;
        }
        return hrefOption2.href;
      }
      if (safeInternal) return void 0;
      if (typeof to === "string" && to.indexOf(":") > -1) try {
        new URL(to);
        if (isDangerousProtocol(to, router2.protocolAllowlist)) {
          if (false) ;
          return;
        }
        return to;
      } catch {
      }
    })();
    const isActive2 = (() => {
      if (externalLink2) return false;
      const currentLocation2 = router2.stores.location.get();
      const exact = activeOptions?.exact ?? false;
      if (exact) {
        if (!exactPathTest(currentLocation2.pathname, next2.pathname, router2.basepath)) return false;
      } else {
        const currentPathSplit = removeTrailingSlash(currentLocation2.pathname, router2.basepath);
        const nextPathSplit = removeTrailingSlash(next2.pathname, router2.basepath);
        if (!(currentPathSplit.startsWith(nextPathSplit) && (currentPathSplit.length === nextPathSplit.length || currentPathSplit[nextPathSplit.length] === "/"))) return false;
      }
      if (activeOptions?.includeSearch ?? true) {
        if (currentLocation2.search !== next2.search) {
          const currentSearchEmpty = !currentLocation2.search || typeof currentLocation2.search === "object" && Object.keys(currentLocation2.search).length === 0;
          const nextSearchEmpty = !next2.search || typeof next2.search === "object" && Object.keys(next2.search).length === 0;
          if (!(currentSearchEmpty && nextSearchEmpty)) {
            if (!deepEqual(currentLocation2.search, next2.search, {
              partial: !exact,
              ignoreUndefined: !activeOptions?.explicitUndefined
            })) return false;
          }
        }
      }
      if (activeOptions?.includeHash) return false;
      return true;
    })();
    if (externalLink2) return {
      ...propsSafeToSpread,
      ref: innerRef,
      href: externalLink2,
      ...children && { children },
      ...target && { target },
      ...disabled && { disabled },
      ...style && { style },
      ...className && { className }
    };
    const resolvedActiveProps2 = isActive2 ? functionalUpdate(activeProps, {}) ?? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT;
    const resolvedInactiveProps2 = isActive2 ? STATIC_EMPTY_OBJECT : functionalUpdate(inactiveProps, {}) ?? STATIC_EMPTY_OBJECT;
    const resolvedStyle2 = (() => {
      const baseStyle = style;
      const activeStyle = resolvedActiveProps2.style;
      const inactiveStyle = resolvedInactiveProps2.style;
      if (!baseStyle && !activeStyle && !inactiveStyle) return;
      if (baseStyle && !activeStyle && !inactiveStyle) return baseStyle;
      if (!baseStyle && activeStyle && !inactiveStyle) return activeStyle;
      if (!baseStyle && !activeStyle && inactiveStyle) return inactiveStyle;
      return {
        ...baseStyle,
        ...activeStyle,
        ...inactiveStyle
      };
    })();
    const resolvedClassName2 = (() => {
      const baseClassName = className;
      const activeClassName = resolvedActiveProps2.className;
      const inactiveClassName = resolvedInactiveProps2.className;
      if (!baseClassName && !activeClassName && !inactiveClassName) return "";
      let out = "";
      if (baseClassName) out = baseClassName;
      if (activeClassName) out = out ? `${out} ${activeClassName}` : activeClassName;
      if (inactiveClassName) out = out ? `${out} ${inactiveClassName}` : inactiveClassName;
      return out;
    })();
    return {
      ...propsSafeToSpread,
      ...resolvedActiveProps2,
      ...resolvedInactiveProps2,
      href: hrefOption2?.href,
      ref: innerRef,
      disabled: !!disabled,
      target,
      ...resolvedStyle2 && { style: resolvedStyle2 },
      ...resolvedClassName2 && { className: resolvedClassName2 },
      ...disabled && STATIC_DISABLED_PROPS,
      ...isActive2 && STATIC_ACTIVE_PROPS
    };
  }
}
var STATIC_EMPTY_OBJECT = {};
var STATIC_ACTIVE_OBJECT = { className: "active" };
var STATIC_DISABLED_PROPS = {
  role: "link",
  "aria-disabled": true
};
var STATIC_ACTIVE_PROPS = {
  "data-status": "active",
  "aria-current": "page"
};
function getHrefOption(publicHref, external, history, disabled) {
  if (disabled) return void 0;
  if (external) return {
    href: publicHref,
    external: true
  };
  return {
    href: history.createHref(publicHref) || "/",
    external: false
  };
}
function isSafeInternal(to) {
  if (typeof to !== "string") return false;
  const zero = to.charCodeAt(0);
  if (zero === 47) return to.charCodeAt(1) !== 47;
  return zero === 46;
}
var Link = reactExports.forwardRef((props, ref) => {
  const { _asChild, ...rest } = props;
  const { type: _type, ...linkProps } = useLinkProps(rest, ref);
  const children = typeof rest.children === "function" ? rest.children({ isActive: linkProps["data-status"] === "active" }) : rest.children;
  if (!_asChild) {
    const { disabled: _, ...rest2 } = linkProps;
    return reactExports.createElement("a", rest2, children);
  }
  return reactExports.createElement(_asChild, linkProps, children);
});
var Route$c = class Route extends BaseRoute {
  /**
  * @deprecated Use the `createRoute` function instead.
  */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useRouteContext({
        ...opts,
        from: this.id
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id
      });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = React.forwardRef((props, ref) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
        ref,
        from: this.fullPath,
        ...props
      });
    });
  }
};
function createRoute(options) {
  return new Route$c(options);
}
var RootRoute = class extends BaseRootRoute {
  /**
  * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
  */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useRouteContext({
        ...opts,
        from: this.id
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({
        ...opts,
        from: this.id
      });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({
        ...opts,
        from: this.id
      });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = React.forwardRef((props, ref) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
        ref,
        from: this.fullPath,
        ...props
      });
    });
  }
};
function createRootRoute(options) {
  return new RootRoute(options);
}
function createFileRoute(path) {
  return new FileRoute(path, { silent: true }).createRoute;
}
var FileRoute = class {
  constructor(path, _opts) {
    this.path = path;
    this.createRoute = (options) => {
      const route = createRoute(options);
      route.isRoot = false;
      return route;
    };
    this.silent = _opts?.silent;
  }
};
function lazyRouteComponent(importer, exportName) {
  let loadPromise;
  let comp;
  let error;
  let reload;
  const load = () => {
    if (!loadPromise) loadPromise = importer().then((res) => {
      loadPromise = void 0;
      comp = res[exportName ?? "default"];
    }).catch((err) => {
      error = err;
      if (isModuleNotFoundError(error)) {
        if (error instanceof Error && typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
          const storageKey = `tanstack_router_reload:${error.message}`;
          if (!sessionStorage.getItem(storageKey)) {
            sessionStorage.setItem(storageKey, "1");
            reload = true;
          }
        }
      }
    });
    return loadPromise;
  };
  const lazyComp = function Lazy(props) {
    if (reload) {
      window.location.reload();
      throw new Promise(() => {
      });
    }
    if (error) throw error;
    if (!comp) if (reactUse) reactUse(load());
    else throw load();
    return reactExports.createElement(comp, props);
  };
  lazyComp.preload = load;
  return lazyComp;
}
var getStoreFactory = (opts) => {
  return {
    createMutableStore: createNonReactiveMutableStore,
    createReadonlyStore: createNonReactiveReadonlyStore,
    batch: (fn) => fn()
  };
};
var createRouter = (options) => {
  return new Router(options);
};
var Router = class extends RouterCore {
  constructor(options) {
    super(options, getStoreFactory);
  }
};
function Asset({ tag, attrs, children, nonce }) {
  switch (tag) {
    case "title":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("title", {
        ...attrs,
        suppressHydrationWarning: true,
        children
      });
    case "meta":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
        ...attrs,
        suppressHydrationWarning: true
      });
    case "link":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("link", {
        ...attrs,
        nonce,
        suppressHydrationWarning: true
      });
    case "style":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("style", {
        ...attrs,
        dangerouslySetInnerHTML: { __html: children },
        nonce
      });
    case "script":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Script, {
        attrs,
        children
      });
    default:
      return null;
  }
}
function Script({ attrs, children }) {
  useRouter();
  useHydrated();
  const dataScript = typeof attrs?.type === "string" && attrs.type !== "" && attrs.type !== "text/javascript" && attrs.type !== "module";
  reactExports.useEffect(() => {
    if (dataScript) return;
    if (attrs?.src) {
      const normSrc = (() => {
        try {
          const base = document.baseURI || window.location.href;
          return new URL(attrs.src, base).href;
        } catch {
          return attrs.src;
        }
      })();
      if (Array.from(document.querySelectorAll("script[src]")).find((el) => el.src === normSrc)) return;
      const script = document.createElement("script");
      for (const [key, value] of Object.entries(attrs)) if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) script.setAttribute(key, typeof value === "boolean" ? "" : String(value));
      document.head.appendChild(script);
      return () => {
        if (script.parentNode) script.parentNode.removeChild(script);
      };
    }
    if (typeof children === "string") {
      const typeAttr = typeof attrs?.type === "string" ? attrs.type : "text/javascript";
      const nonceAttr = typeof attrs?.nonce === "string" ? attrs.nonce : void 0;
      if (Array.from(document.querySelectorAll("script:not([src])")).find((el) => {
        if (!(el instanceof HTMLScriptElement)) return false;
        const sType = el.getAttribute("type") ?? "text/javascript";
        const sNonce = el.getAttribute("nonce") ?? void 0;
        return el.textContent === children && sType === typeAttr && sNonce === nonceAttr;
      })) return;
      const script = document.createElement("script");
      script.textContent = children;
      if (attrs) {
        for (const [key, value] of Object.entries(attrs)) if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) script.setAttribute(key, typeof value === "boolean" ? "" : String(value));
      }
      document.head.appendChild(script);
      return () => {
        if (script.parentNode) script.parentNode.removeChild(script);
      };
    }
  }, [
    attrs,
    children,
    dataScript
  ]);
  {
    if (attrs?.src) return /* @__PURE__ */ jsxRuntimeExports.jsx("script", {
      ...attrs,
      suppressHydrationWarning: true
    });
    if (typeof children === "string") return /* @__PURE__ */ jsxRuntimeExports.jsx("script", {
      ...attrs,
      dangerouslySetInnerHTML: { __html: children },
      suppressHydrationWarning: true
    });
    return null;
  }
}
function buildTagsFromMatches(router2, nonce, matches, assetCrossOrigin) {
  const routeMeta = matches.map((match) => match.meta).filter(Boolean);
  const resultMeta = [];
  const metaByAttribute = {};
  let title;
  for (let i = routeMeta.length - 1; i >= 0; i--) {
    const metas = routeMeta[i];
    for (let j = metas.length - 1; j >= 0; j--) {
      const m = metas[j];
      if (!m) continue;
      if (m.title) {
        if (!title) title = {
          tag: "title",
          children: m.title
        };
      } else if ("script:ld+json" in m) try {
        const json = JSON.stringify(m["script:ld+json"]);
        resultMeta.push({
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: escapeHtml(json)
        });
      } catch {
      }
      else {
        const attribute = m.name ?? m.property;
        if (attribute) if (metaByAttribute[attribute]) continue;
        else metaByAttribute[attribute] = true;
        resultMeta.push({
          tag: "meta",
          attrs: {
            ...m,
            nonce
          }
        });
      }
    }
  }
  if (title) resultMeta.push(title);
  if (nonce) resultMeta.push({
    tag: "meta",
    attrs: {
      property: "csp-nonce",
      content: nonce
    }
  });
  resultMeta.reverse();
  const constructedLinks = matches.map((match) => match.links).filter(Boolean).flat(1).map((link) => ({
    tag: "link",
    attrs: {
      ...link,
      nonce
    }
  }));
  const manifest = router2.ssr?.manifest;
  const assetLinks = matches.map((match) => manifest?.routes[match.routeId]?.assets ?? []).filter(Boolean).flat(1).filter((asset) => asset.tag === "link").map((asset) => ({
    tag: "link",
    attrs: {
      ...asset.attrs,
      crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "stylesheet") ?? asset.attrs?.crossOrigin,
      suppressHydrationWarning: true,
      nonce
    }
  }));
  const preloadLinks = [];
  matches.map((match) => router2.looseRoutesById[match.routeId]).forEach((route) => router2.ssr?.manifest?.routes[route.id]?.preloads?.filter(Boolean).forEach((preload) => {
    const preloadLink = resolveManifestAssetLink(preload);
    preloadLinks.push({
      tag: "link",
      attrs: {
        rel: "modulepreload",
        href: preloadLink.href,
        crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "modulepreload") ?? preloadLink.crossOrigin,
        nonce
      }
    });
  }));
  const styles = matches.map((match) => match.styles).flat(1).filter(Boolean).map(({ children, ...attrs }) => ({
    tag: "style",
    attrs: {
      ...attrs,
      nonce
    },
    children
  }));
  const headScripts = matches.map((match) => match.headScripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
    tag: "script",
    attrs: {
      ...script,
      nonce
    },
    children
  }));
  return uniqBy([
    ...resultMeta,
    ...preloadLinks,
    ...constructedLinks,
    ...assetLinks,
    ...styles,
    ...headScripts
  ], (d) => JSON.stringify(d));
}
var useTags = (assetCrossOrigin) => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  return buildTagsFromMatches(router2, nonce, router2.stores.matches.get(), assetCrossOrigin);
};
function uniqBy(arr, fn) {
  const seen = /* @__PURE__ */ new Set();
  return arr.filter((item) => {
    const key = fn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function HeadContent(props) {
  const tags = useTags(props.assetCrossOrigin);
  const nonce = useRouter().options.ssr?.nonce;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: tags.map((tag) => /* @__PURE__ */ reactExports.createElement(Asset, {
    ...tag,
    key: `tsr-meta-${JSON.stringify(tag)}`,
    nonce
  })) });
}
var Scripts = () => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  const getAssetScripts = (matches) => {
    const assetScripts = [];
    const manifest = router2.ssr?.manifest;
    if (!manifest) return [];
    matches.map((match) => router2.looseRoutesById[match.routeId]).forEach((route) => manifest.routes[route.id]?.assets?.filter((d) => d.tag === "script").forEach((asset) => {
      assetScripts.push({
        tag: "script",
        attrs: {
          ...asset.attrs,
          nonce
        },
        children: asset.children
      });
    }));
    return assetScripts;
  };
  const getScripts = (matches) => matches.map((match) => match.scripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
    tag: "script",
    attrs: {
      ...script,
      suppressHydrationWarning: true,
      nonce
    },
    children
  }));
  {
    const activeMatches = router2.stores.matches.get();
    const assetScripts = getAssetScripts(activeMatches);
    return renderScripts(router2, getScripts(activeMatches), assetScripts);
  }
};
function renderScripts(router2, scripts, assetScripts) {
  let serverBufferedScript = void 0;
  if (router2.serverSsr) serverBufferedScript = router2.serverSsr.takeBufferedScripts();
  const allScripts = [...scripts, ...assetScripts];
  if (serverBufferedScript) allScripts.unshift(serverBufferedScript);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: allScripts.map((asset, i) => /* @__PURE__ */ reactExports.createElement(Asset, {
    ...asset,
    key: `tsr-scripts-${asset.tag}-${i}`
  })) });
}
const appCss = "/assets/styles-DLnOLR8y.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-night px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow mb-6", children: "Off the map" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl font-medium text-gold-gradient", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-medium text-foreground", children: "You've wandered beyond our borders" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist — but plenty of other journeys await." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-medium text-primary-foreground shadow-gold hover:shadow-glow transition-all tracking-wide uppercase",
        children: "Return home"
      }
    ) })
  ] }) });
}
const Route$b = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Wandr — Travel further on less" },
      { name: "description", content: "Discover famous places to visit anywhere in the world and plan unforgettable trips on a tight budget." },
      { name: "author", content: "Wandr" },
      { property: "og:title", content: "Wandr — Travel further on less" },
      { property: "og:description", content: "Discover famous places to visit anywhere in the world and plan unforgettable trips on a tight budget." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Wandr — Travel further on less" },
      { name: "twitter:description", content: "Discover famous places to visit anywhere in the world and plan unforgettable trips on a tight budget." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2ac3a806-f39e-4e4b-8cf5-bf9f7a2790ef/id-preview-55e57e25--479fcfb2-f0e8-49ea-83a6-c696259ac1fe.lovable.app-1776923265760.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2ac3a806-f39e-4e4b-8cf5-bf9f7a2790ef/id-preview-55e57e25--479fcfb2-f0e8-49ea-83a6-c696259ac1fe.lovable.app-1776923265760.png" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const destinations = [
  {
    slug: "bali-indonesia",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    emoji: "🌴",
    tagline: "Rice terraces, temples, and surf — a backpacker paradise.",
    bestTime: "April – October (dry season)",
    currency: "IDR",
    costs: { stay: 12, food: 8, transport: 5, activities: 7 },
    places: [
      { name: "Tegallalang Rice Terraces", category: "Nature", why: "Iconic emerald paddies, free to wander early morning.", free: true },
      { name: "Uluwatu Temple", category: "Culture", why: "Cliffside temple with sunset Kecak fire dance." },
      { name: "Mount Batur Sunrise Hike", category: "Adventure", why: "Active volcano summit at dawn — bucket-list view." },
      { name: "Ubud Monkey Forest", category: "Nature", why: "Sacred sanctuary with hundreds of macaques." },
      { name: "Seminyak Beach", category: "Nature", why: "Long sandy stretch with legendary sunsets.", free: true },
      { name: "Tirta Empul Water Temple", category: "Culture", why: "Holy spring purification ritual." },
      { name: "Warung food crawls", category: "Food", why: "Nasi campur for under $2 — local soul food." },
      { name: "Tanah Lot", category: "Landmark", why: "Sea-temple silhouette at golden hour." }
    ],
    tips: [
      "Rent a scooter (~$5/day) instead of taxis.",
      "Eat at warungs, not tourist cafés — same flavor, 1/4 the price.",
      "Stay in Ubud or Canggu for cheap homestays under $15.",
      "Skip beach-club day passes; sunsets are free."
    ]
  },
  {
    slug: "bangkok-thailand",
    name: "Bangkok",
    country: "Thailand",
    region: "Asia",
    emoji: "🛺",
    tagline: "Street food capital with golden temples and night markets.",
    bestTime: "November – February",
    currency: "THB",
    costs: { stay: 14, food: 7, transport: 4, activities: 6 },
    places: [
      { name: "Grand Palace & Wat Phra Kaew", category: "Landmark", why: "Royal complex of dazzling spires." },
      { name: "Wat Pho (Reclining Buddha)", category: "Culture", why: "46m gold reclining Buddha." },
      { name: "Chatuchak Weekend Market", category: "Food", why: "15,000 stalls — eat your way through.", free: true },
      { name: "Khao San Road", category: "Culture", why: "Backpacker legend, cheap eats and chaos.", free: true },
      { name: "Chao Phraya River boat", category: "Adventure", why: "Local ferry beats any tour, costs cents." },
      { name: "Wat Arun at sunset", category: "Landmark", why: "Temple of Dawn glows at golden hour." },
      { name: "Chinatown (Yaowarat)", category: "Food", why: "Night-time street food heaven.", free: true }
    ],
    tips: [
      "Use the BTS Skytrain and MRT — cheap and fast.",
      "Street food meals cost $1–$3 and beat restaurants.",
      "Temples are free or under $5 — go early to beat heat.",
      "Negotiate tuk-tuk rides; agree on price first."
    ]
  },
  {
    slug: "lisbon-portugal",
    name: "Lisbon",
    country: "Portugal",
    region: "Europe",
    emoji: "🚋",
    tagline: "Pastel hills, custard tarts, and Atlantic light.",
    bestTime: "March – June, September – October",
    currency: "EUR",
    costs: { stay: 28, food: 18, transport: 6, activities: 10 },
    places: [
      { name: "Alfama district walk", category: "Culture", why: "Old Moorish quarter — get lost in the alleys.", free: true },
      { name: "Tram 28 ride", category: "Adventure", why: "Vintage yellow tram through the steepest hills." },
      { name: "Belém Tower & Jerónimos Monastery", category: "Landmark", why: "UNESCO maritime icons." },
      { name: "Pastéis de Belém", category: "Food", why: "The original 1837 custard tart, €1.40 each." },
      { name: "São Jorge Castle viewpoint", category: "Landmark", why: "Best city panorama at sunset." },
      { name: "Time Out Market", category: "Food", why: "Top chefs at counter prices." },
      { name: "LX Factory", category: "Culture", why: "Industrial-chic shops, street art and cafés.", free: true }
    ],
    tips: [
      "Buy a Lisboa Card for unlimited transit + free museums.",
      "Lunch 'menu do dia' = 3 courses for €8–€12.",
      "Most miradouros (viewpoints) are free.",
      "Stay in Graça or Anjos for cheaper rooms close to center."
    ]
  },
  {
    slug: "istanbul-turkey",
    name: "Istanbul",
    country: "Türkiye",
    region: "Middle East",
    emoji: "🕌",
    tagline: "Where two continents meet over tea and bazaars.",
    bestTime: "April – May, September – October",
    currency: "TRY",
    costs: { stay: 18, food: 10, transport: 4, activities: 8 },
    places: [
      { name: "Hagia Sophia", category: "Landmark", why: "1,500 years of empires under one dome." },
      { name: "Blue Mosque", category: "Culture", why: "Six-minaret masterpiece, free to enter.", free: true },
      { name: "Grand Bazaar", category: "Culture", why: "4,000 shops — haggling is the sport.", free: true },
      { name: "Bosphorus ferry", category: "Adventure", why: "Cheap public ferry crosses to Asia in 20 min." },
      { name: "Süleymaniye Mosque view", category: "Landmark", why: "Quiet hilltop with sweeping Golden Horn views.", free: true },
      { name: "Karaköy street food", category: "Food", why: "Balık ekmek (fish sandwich) by the water." },
      { name: "Basilica Cistern", category: "Culture", why: "Underground forest of columns." }
    ],
    tips: [
      "Get an Istanbulkart — works on ferries, trams, buses.",
      "Eat döner and pide from local lokantas, not Sultanahmet tourist row.",
      "Many mosques are free; dress modestly.",
      "Stay in Kadıköy (Asian side) for half the price of Sultanahmet."
    ]
  },
  {
    slug: "tokyo-japan",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    emoji: "🗼",
    tagline: "Neon nights, quiet shrines, and the world's best convenience stores.",
    bestTime: "March – May (cherry blossom), October – November",
    currency: "JPY",
    costs: { stay: 35, food: 18, transport: 10, activities: 12 },
    places: [
      { name: "Shibuya Crossing", category: "Landmark", why: "The world's busiest intersection.", free: true },
      { name: "Senso-ji Temple, Asakusa", category: "Culture", why: "Tokyo's oldest temple with bustling market street.", free: true },
      { name: "Meiji Shrine", category: "Culture", why: "Forested calm minutes from Harajuku.", free: true },
      { name: "Tsukiji Outer Market", category: "Food", why: "Sushi, tamago, fresh tuna at dawn." },
      { name: "TeamLab Planets", category: "Adventure", why: "Immersive digital art you walk through." },
      { name: "Shinjuku Omoide Yokocho", category: "Food", why: "Tiny smoky yakitori alley after dark." },
      { name: "Ueno Park & museums", category: "Nature", why: "Free park, cherry blossoms, world-class museums.", free: true }
    ],
    tips: [
      "Get a Suica/Pasmo IC card for trains and konbini.",
      "Eat at konbini (7-Eleven, Lawson) — meals from $4.",
      "Free observation decks: Tokyo Metropolitan Govt Building.",
      "Stay near a Yamanote Line station; capsule hotels from $25."
    ]
  },
  {
    slug: "marrakech-morocco",
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    emoji: "🐪",
    tagline: "Spice-scented souks and rose-pink walls.",
    bestTime: "March – May, September – November",
    currency: "MAD",
    costs: { stay: 16, food: 10, transport: 4, activities: 8 },
    places: [
      { name: "Jemaa el-Fnaa square", category: "Culture", why: "Storytellers, snake charmers, food carts at dusk.", free: true },
      { name: "Bahia Palace", category: "Landmark", why: "19th-century palace of carved cedar and zellige." },
      { name: "Majorelle Garden", category: "Nature", why: "Cobalt-blue garden once owned by YSL." },
      { name: "Souks of the Medina", category: "Culture", why: "Endless lanes of leather, lanterns, and spice.", free: true },
      { name: "Koutoubia Mosque", category: "Landmark", why: "12th-century minaret, photogenic from gardens.", free: true },
      { name: "Atlas Mountains day trip", category: "Adventure", why: "Berber villages and waterfalls 1 hour away." },
      { name: "Mint tea at a riad rooftop", category: "Food", why: "Sunset over the medina with sweet tea." }
    ],
    tips: [
      "Stay in a riad in the medina — atmospheric and cheap.",
      "Agree taxi prices upfront; petit taxis use meters.",
      "Eat at food stalls 1–32 in Jemaa el-Fnaa; locals know best.",
      "Carry small dirham notes for tips and tiny purchases."
    ]
  },
  {
    slug: "mexico-city-mexico",
    name: "Mexico City",
    country: "Mexico",
    region: "Americas",
    emoji: "🌮",
    tagline: "Aztec ruins, art deco, and tacos al pastor on every corner.",
    bestTime: "March – May",
    currency: "MXN",
    costs: { stay: 20, food: 12, transport: 4, activities: 8 },
    places: [
      { name: "Zócalo & Templo Mayor", category: "Landmark", why: "Aztec ruins beside the cathedral.", free: true },
      { name: "Frida Kahlo's Casa Azul", category: "Culture", why: "Frida's blue house, intimate and powerful." },
      { name: "Teotihuacán pyramids", category: "Adventure", why: "Climb the Pyramid of the Sun, 1 hour outside city." },
      { name: "Chapultepec Park", category: "Nature", why: "Huge park with castle and free museums.", free: true },
      { name: "Coyoacán market", category: "Food", why: "Tostadas, tlacoyos, and esquites." },
      { name: "Roma & Condesa walk", category: "Culture", why: "Tree-lined streets, art deco, indie cafés.", free: true },
      { name: "Lucha libre at Arena México", category: "Adventure", why: "Masked wrestling spectacle — pure joy." }
    ],
    tips: [
      "Metro is $0.30 per ride — use it everywhere.",
      "Tacos al pastor under $1 each; eat where locals queue.",
      "Sunday entry to most museums is free for residents and cheap for visitors.",
      "Stay in Roma Norte or Juárez for safe, walkable neighborhoods."
    ]
  },
  {
    slug: "rome-italy",
    name: "Rome",
    country: "Italy",
    region: "Europe",
    emoji: "🏛️",
    tagline: "An open-air museum where every alley hides 2,000 years.",
    bestTime: "April – June, September – October",
    currency: "EUR",
    costs: { stay: 35, food: 22, transport: 7, activities: 12 },
    places: [
      { name: "Colosseum & Roman Forum", category: "Landmark", why: "Combo ticket covers both — book online." },
      { name: "Pantheon", category: "Landmark", why: "Free entry to the world's best-preserved Roman building.", free: true },
      { name: "Trevi Fountain", category: "Landmark", why: "Toss a coin at sunrise to dodge crowds.", free: true },
      { name: "Vatican Museums & Sistine Chapel", category: "Culture", why: "Free last Sunday of every month." },
      { name: "Trastevere wander", category: "Food", why: "Cobbled lanes, trattorias, real cacio e pepe.", free: true },
      { name: "Borghese Gardens", category: "Nature", why: "Cool green escape with city views.", free: true },
      { name: "Aperitivo at Campo de' Fiori", category: "Food", why: "€8 spritz with free buffet snacks." }
    ],
    tips: [
      "Most churches (incl. masterpiece-filled ones) are free.",
      "Tap water is drinkable from street fountains — save €€.",
      "Eat where the menu has no English — 30% cheaper.",
      "Walk; the historic core is small and traffic is brutal."
    ]
  },
  {
    slug: "barcelona-spain",
    name: "Barcelona",
    country: "Spain",
    region: "Europe",
    emoji: "🎨",
    tagline: "Gaudí's dreamscape on a Mediterranean beach.",
    bestTime: "May – June, September",
    currency: "EUR",
    costs: { stay: 32, food: 20, transport: 6, activities: 11 },
    places: [
      { name: "Sagrada Família", category: "Landmark", why: "Gaudí's still-rising masterpiece." },
      { name: "Park Güell", category: "Nature", why: "Mosaic terraces; free zone outside paid area." },
      { name: "Gothic Quarter", category: "Culture", why: "Medieval lanes, plazas, secret bars.", free: true },
      { name: "Barceloneta Beach", category: "Nature", why: "City beach with chiringuito snacks.", free: true },
      { name: "La Boqueria market", category: "Food", why: "Tapas counters inside Spain's best food market." },
      { name: "Bunkers del Carmel", category: "Adventure", why: "Free 360° city panorama at sunset.", free: true },
      { name: "Casa Batlló exterior", category: "Landmark", why: "Photo Gaudí's facade for free.", free: true }
    ],
    tips: [
      "Get a T-Casual (10 metro rides) for ~€12.",
      "Menú del día at lunch: 3 courses + drink for €12–€15.",
      "Many museums free on Sundays after 3pm.",
      "Stay in Gràcia or Poblenou for cheaper authentic vibe."
    ]
  },
  {
    slug: "kyoto-japan",
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    emoji: "⛩️",
    tagline: "1,600 temples, geisha alleys, and mossy bamboo.",
    bestTime: "March – April, October – November",
    currency: "JPY",
    costs: { stay: 30, food: 16, transport: 8, activities: 10 },
    places: [
      { name: "Fushimi Inari Shrine", category: "Culture", why: "10,000 vermillion gates up a mountain — free.", free: true },
      { name: "Arashiyama Bamboo Grove", category: "Nature", why: "Towering green corridor at dawn.", free: true },
      { name: "Kinkaku-ji (Golden Pavilion)", category: "Landmark", why: "Gold-leaf temple over a mirror pond." },
      { name: "Gion district", category: "Culture", why: "Wooden teahouses; spot a geiko at dusk.", free: true },
      { name: "Philosopher's Path", category: "Nature", why: "Canal walk lined with cherry trees.", free: true },
      { name: "Nishiki Market", category: "Food", why: "'Kyoto's kitchen' — pickles, mochi, matcha." },
      { name: "Kiyomizu-dera Temple", category: "Landmark", why: "Wooden stage with city panorama." }
    ],
    tips: [
      "Buy a 1-day bus pass (¥700) — covers most temples.",
      "Many temples are free or under ¥500.",
      "Stay in a guesthouse near Kyoto Station from ¥3,500.",
      "Convenience-store breakfasts are excellent and ¥400."
    ]
  },
  {
    slug: "hanoi-vietnam",
    name: "Hanoi",
    country: "Vietnam",
    region: "Asia",
    emoji: "🍜",
    tagline: "Old Quarter chaos, lakeside calm, and $2 phở.",
    bestTime: "October – April",
    currency: "VND",
    costs: { stay: 10, food: 6, transport: 3, activities: 5 },
    places: [
      { name: "Old Quarter walk", category: "Culture", why: "36 streets, each named for a craft.", free: true },
      { name: "Hoan Kiem Lake", category: "Nature", why: "Heart of the city; weekend pedestrian zone.", free: true },
      { name: "Train Street", category: "Adventure", why: "Coffee inches from a passing train.", free: true },
      { name: "Temple of Literature", category: "Culture", why: "Vietnam's first university, 1070." },
      { name: "Bun cha lunch", category: "Food", why: "Grilled pork & noodles — Hanoi's signature dish." },
      { name: "Egg coffee at Giang Café", category: "Food", why: "Whipped yolk over strong robusta — invented here." },
      { name: "Halong Bay overnight", category: "Adventure", why: "Karst islands and sleeping on a junk boat." }
    ],
    tips: [
      "Phở and bun cha cost $1.50–$3 from sidewalk stools.",
      "Grab bike (motorbike taxi) is cheaper than cars.",
      "Hostels with breakfast included from $6.",
      "Negotiate everything in markets; first price = double."
    ]
  },
  {
    slug: "prague-czech-republic",
    name: "Prague",
    country: "Czech Republic",
    region: "Europe",
    emoji: "🏰",
    tagline: "Fairytale spires, Gothic bridges, and €2 beer.",
    bestTime: "April – May, September",
    currency: "CZK",
    costs: { stay: 24, food: 14, transport: 5, activities: 8 },
    places: [
      { name: "Charles Bridge at sunrise", category: "Landmark", why: "Statues, towers, no crowds before 8am.", free: true },
      { name: "Old Town Square", category: "Landmark", why: "Astronomical clock chimes hourly.", free: true },
      { name: "Prague Castle", category: "Landmark", why: "Largest ancient castle complex in the world." },
      { name: "Letná Park beer garden", category: "Food", why: "Cheap pints with a postcard view.", free: true },
      { name: "Vyšehrad fortress", category: "Culture", why: "Quieter castle with locals' picnic spot.", free: true },
      { name: "John Lennon Wall", category: "Culture", why: "Ever-changing peace mural.", free: true },
      { name: "Trdelník & street sausages", category: "Food", why: "Cheap warm snacks on every corner." }
    ],
    tips: [
      "Buy a 24-hour transit pass (~120 CZK) for trams + metro.",
      "Beer is cheaper than water — €1.50 a half-liter.",
      "Eat at a hospoda (pub) for hearty meals under €8.",
      "Walk the historic core; it's compact."
    ]
  },
  {
    slug: "cairo-egypt",
    name: "Cairo",
    country: "Egypt",
    region: "Africa",
    emoji: "🐫",
    tagline: "Pyramids at the edge of the city, 5,000 years of stories.",
    bestTime: "October – April",
    currency: "EGP",
    costs: { stay: 14, food: 8, transport: 4, activities: 10 },
    places: [
      { name: "Pyramids of Giza & Sphinx", category: "Landmark", why: "The only ancient wonder still standing." },
      { name: "Egyptian Museum", category: "Culture", why: "Tutankhamun's treasures, Ramses' mummies." },
      { name: "Khan el-Khalili Bazaar", category: "Culture", why: "Ottoman-era market, mint tea, copperware.", free: true },
      { name: "Citadel of Saladin", category: "Landmark", why: "Hilltop fortress with alabaster mosque." },
      { name: "Coptic Cairo", category: "Culture", why: "Hanging Church and Ben Ezra Synagogue." },
      { name: "Felucca on the Nile at sunset", category: "Adventure", why: "Wooden sailboat ride, $5 for an hour." },
      { name: "Koshari at Abou Tarek", category: "Food", why: "Egypt's national bowl, $2." }
    ],
    tips: [
      "Use Uber/Careem; they're cheap and avoid haggling.",
      "Carry small bills for tips (baksheesh) — expected often.",
      "Buy combo tickets at the pyramids to save.",
      "Stay in Zamalek for safer, leafier nights."
    ]
  },
  {
    slug: "cape-town-south-africa",
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    emoji: "⛰️",
    tagline: "Mountain, ocean, vineyards — three worlds in one city.",
    bestTime: "November – March",
    currency: "ZAR",
    costs: { stay: 22, food: 14, transport: 8, activities: 12 },
    places: [
      { name: "Table Mountain hike or cable car", category: "Adventure", why: "Flat-topped icon with city panorama." },
      { name: "Cape of Good Hope", category: "Nature", why: "Where two oceans almost meet." },
      { name: "Boulders Beach penguins", category: "Nature", why: "African penguin colony you can swim near." },
      { name: "Bo-Kaap", category: "Culture", why: "Candy-colored Malay quarter.", free: true },
      { name: "V&A Waterfront", category: "Food", why: "Markets, harbour, free music.", free: true },
      { name: "Lion's Head sunset hike", category: "Adventure", why: "1-hour climb, 360° sundown view.", free: true },
      { name: "Stellenbosch wine day", category: "Food", why: "Tastings $5–$10, vineyards 40 min away." }
    ],
    tips: [
      "Rent a car or use MyCiTi bus; Uber is cheap too.",
      "Many township tours support local guides — pick ethically.",
      "Hike free trails instead of paying for the cable car.",
      "Stay in Sea Point or Observatory for cheap rooms."
    ]
  },
  {
    slug: "new-york-usa",
    name: "New York",
    country: "USA",
    region: "Americas",
    emoji: "🗽",
    tagline: "The city that runs on bagels and ambition.",
    bestTime: "April – June, September – November",
    currency: "USD",
    costs: { stay: 80, food: 35, transport: 10, activities: 15 },
    places: [
      { name: "Central Park", category: "Nature", why: "843 acres of free escape.", free: true },
      { name: "Brooklyn Bridge walk", category: "Landmark", why: "Iconic 1.1-mile crossing at golden hour.", free: true },
      { name: "Staten Island Ferry", category: "Adventure", why: "Free ride past the Statue of Liberty.", free: true },
      { name: "The Met museum", category: "Culture", why: "Pay-what-you-wish for NY/NJ/CT residents." },
      { name: "Times Square at night", category: "Landmark", why: "Sensory overload, totally free.", free: true },
      { name: "High Line", category: "Nature", why: "Elevated park on old rail tracks.", free: true },
      { name: "Pizza by the slice", category: "Food", why: "$3–$4 slices beat any sit-down meal." }
    ],
    tips: [
      "Get a 7-day unlimited MetroCard ($34).",
      "Many top museums are pay-what-you-wish on certain days.",
      "Eat lunch deals (pizza, dumplings, halal carts) for under $10.",
      "Stay in Queens or Brooklyn — cheaper, fast subway access."
    ]
  },
  {
    slug: "paris-france",
    name: "Paris",
    country: "France",
    region: "Europe",
    emoji: "🗼",
    tagline: "Cafés, museums, and bridges that earn their reputation.",
    bestTime: "April – June, September – October",
    currency: "EUR",
    costs: { stay: 45, food: 25, transport: 8, activities: 14 },
    places: [
      { name: "Eiffel Tower from Trocadéro", category: "Landmark", why: "Best free photo angle.", free: true },
      { name: "Louvre", category: "Culture", why: "Free first Friday evening of each month." },
      { name: "Notre-Dame exterior & Île de la Cité", category: "Landmark", why: "Walk the medieval island.", free: true },
      { name: "Montmartre & Sacré-Cœur", category: "Culture", why: "Hilltop village vibes; free basilica.", free: true },
      { name: "Picnic by the Seine", category: "Food", why: "Baguette + cheese + wine = €10 dinner." },
      { name: "Père Lachaise Cemetery", category: "Culture", why: "Tree-lined paths past Wilde and Morrison.", free: true },
      { name: "Musée d'Orsay", category: "Culture", why: "Impressionists in a former train station." }
    ],
    tips: [
      "Carnet of 10 metro tickets is cheaper than singles.",
      "All EU citizens under 26 enter national museums free.",
      "Boulangerie sandwiches: €4–€6 lunch.",
      "Stay in 11th or 19th arrondissement for value."
    ]
  },
  {
    slug: "rio-de-janeiro-brazil",
    name: "Rio de Janeiro",
    country: "Brazil",
    region: "Americas",
    emoji: "🏖️",
    tagline: "Beach, samba, and mountains crashing into the sea.",
    bestTime: "December – March",
    currency: "BRL",
    costs: { stay: 22, food: 14, transport: 5, activities: 10 },
    places: [
      { name: "Christ the Redeemer", category: "Landmark", why: "Iconic statue atop Corcovado." },
      { name: "Sugarloaf Mountain cable car", category: "Adventure", why: "Two-stage ride to legendary views." },
      { name: "Copacabana & Ipanema beaches", category: "Nature", why: "Sand, surf, sunset walks.", free: true },
      { name: "Selarón Steps", category: "Culture", why: "215 mosaic-tiled steps — free art.", free: true },
      { name: "Tijuca Forest hike", category: "Adventure", why: "World's largest urban rainforest.", free: true },
      { name: "Lapa nightlife & samba", category: "Culture", why: "Street parties under the Arches." },
      { name: "Feijoada lunch", category: "Food", why: "Brazil's national bean stew." }
    ],
    tips: [
      "Use the metro for safety and speed.",
      "Beach kiosks sell cheap caipirinhas and snacks.",
      "Avoid jewelry/big cameras on the street.",
      "Stay in Botafogo or Santa Teresa for value."
    ]
  },
  {
    slug: "buenos-aires-argentina",
    name: "Buenos Aires",
    country: "Argentina",
    region: "Americas",
    emoji: "💃",
    tagline: "Steak, tango, and the Paris of South America.",
    bestTime: "March – May, September – November",
    currency: "ARS",
    costs: { stay: 18, food: 12, transport: 3, activities: 7 },
    places: [
      { name: "La Boca & Caminito", category: "Culture", why: "Painted houses, tango on the street.", free: true },
      { name: "Recoleta Cemetery", category: "Culture", why: "Marble mausoleums incl. Eva Perón.", free: true },
      { name: "San Telmo Sunday market", category: "Culture", why: "Antiques, music, choripán.", free: true },
      { name: "Teatro Colón tour", category: "Landmark", why: "World-class opera house tours." },
      { name: "Palermo cafés & parks", category: "Food", why: "Trendy barrio for brunch and bookshops.", free: true },
      { name: "Asado dinner", category: "Food", why: "Argentine grill — beef capital." },
      { name: "Tango show in a milonga", category: "Culture", why: "Real local tango halls beat tourist shows." }
    ],
    tips: [
      "Use 'blue dollar' exchange for much better rates.",
      "Subte (metro) tickets are cents.",
      "Parrillas (steakhouses) outside Palermo: huge cheap meals.",
      "Stay in Palermo or San Telmo."
    ]
  },
  {
    slug: "amsterdam-netherlands",
    name: "Amsterdam",
    country: "Netherlands",
    region: "Europe",
    emoji: "🚲",
    tagline: "Canal rings, bicycles, and Dutch Masters.",
    bestTime: "April – May, September",
    currency: "EUR",
    costs: { stay: 50, food: 22, transport: 8, activities: 14 },
    places: [
      { name: "Canal walk: Jordaan", category: "Culture", why: "Most picturesque neighborhood.", free: true },
      { name: "Rijksmuseum", category: "Culture", why: "Vermeer, Rembrandt, Dutch Golden Age." },
      { name: "Anne Frank House", category: "Culture", why: "Book months ahead — moving and essential." },
      { name: "Vondelpark", category: "Nature", why: "Locals' favorite green escape.", free: true },
      { name: "Albert Cuyp Market", category: "Food", why: "Stroopwafels, herring, cheese.", free: true },
      { name: "NDSM ferry to north", category: "Adventure", why: "Free ferry to street-art district.", free: true },
      { name: "Bike along Amstel river", category: "Nature", why: "€10/day bike, infinite freedom." }
    ],
    tips: [
      "Rent a bike — €10/day beats trams everywhere.",
      "Many museums included in I Amsterdam City Card.",
      "Eat at FEBO, broodjes shops, or markets.",
      "Stay in Amsterdam-Noord or De Pijp for value."
    ]
  },
  {
    slug: "berlin-germany",
    name: "Berlin",
    country: "Germany",
    region: "Europe",
    emoji: "🎶",
    tagline: "History, techno, and the cheapest capital in western Europe.",
    bestTime: "May – September",
    currency: "EUR",
    costs: { stay: 28, food: 16, transport: 7, activities: 9 },
    places: [
      { name: "Brandenburg Gate", category: "Landmark", why: "Symbol of reunification.", free: true },
      { name: "East Side Gallery", category: "Culture", why: "1.3km of Berlin Wall art.", free: true },
      { name: "Reichstag dome", category: "Landmark", why: "Free entry — book in advance.", free: true },
      { name: "Museum Island", category: "Culture", why: "Five museums, one ticket." },
      { name: "Tempelhofer Feld", category: "Nature", why: "Old airport turned vast public park.", free: true },
      { name: "Mauerpark Sunday flea & karaoke", category: "Culture", why: "Berlin at its most Berlin.", free: true },
      { name: "Currywurst & döner stands", category: "Food", why: "€4 meals on every corner." }
    ],
    tips: [
      "AB transit zone day ticket = €9.50.",
      "Free walking tours (tip the guide).",
      "Spätis (corner shops) sell cheap drinks for park hangs.",
      "Stay in Kreuzberg, Neukölln, or Friedrichshain."
    ]
  },
  {
    slug: "chiang-mai-thailand",
    name: "Chiang Mai",
    country: "Thailand",
    region: "Asia",
    emoji: "🐘",
    tagline: "Mountain temples, night markets, and digital nomad cafés.",
    bestTime: "November – February",
    currency: "THB",
    costs: { stay: 12, food: 6, transport: 3, activities: 6 },
    places: [
      { name: "Doi Suthep temple", category: "Culture", why: "Mountain shrine with city views." },
      { name: "Old City temples", category: "Culture", why: "Dozens within walls, mostly free.", free: true },
      { name: "Sunday Walking Street", category: "Food", why: "Best night market in Thailand.", free: true },
      { name: "Elephant Nature Park", category: "Nature", why: "Ethical sanctuary — no riding." },
      { name: "Khao soi lunch", category: "Food", why: "Northern coconut curry noodles, $2." },
      { name: "Sticky Waterfalls", category: "Adventure", why: "Climb-up cascades 1 hour from town.", free: true },
      { name: "Cooking class", category: "Food", why: "$25 for full-day market + 5 dishes." }
    ],
    tips: [
      "Songthaew red trucks: 30 baht flat fare.",
      "Guesthouse rooms from $8 in the Old City.",
      "Eat at the Sunday market: full dinner under $4.",
      "Avoid tiger 'attractions' — stick to ethical sanctuaries."
    ]
  },
  {
    slug: "lima-peru",
    name: "Lima",
    country: "Peru",
    region: "Americas",
    emoji: "🌊",
    tagline: "Cliff-top city with the best food scene in South America.",
    bestTime: "December – April",
    currency: "PEN",
    costs: { stay: 18, food: 12, transport: 4, activities: 8 },
    places: [
      { name: "Miraflores Malecón", category: "Nature", why: "Cliffside parks above the Pacific.", free: true },
      { name: "Barranco bohemian quarter", category: "Culture", why: "Street art, cafés, Bridge of Sighs.", free: true },
      { name: "Plaza Mayor & Cathedral", category: "Landmark", why: "Colonial heart of the city.", free: true },
      { name: "Larco Museum", category: "Culture", why: "Pre-Columbian gold and ceramics." },
      { name: "Ceviche at a cevichería", category: "Food", why: "World's best seafood, $5–$10." },
      { name: "Paragliding over Miraflores", category: "Adventure", why: "10-min tandem flight along the cliffs." },
      { name: "Magic Water Circuit", category: "Culture", why: "Illuminated fountain show at night." }
    ],
    tips: [
      "Use Cabify/Uber — cheap and safe.",
      "Lunch menus (menú del día) S/15 — incredible value.",
      "Most museums under $5; Sundays often free.",
      "Stay in Miraflores or Barranco for safety + walkability."
    ]
  },
  {
    slug: "queenstown-new-zealand",
    name: "Queenstown",
    country: "New Zealand",
    region: "Oceania",
    emoji: "🏔️",
    tagline: "Adventure capital nestled in alpine paradise.",
    bestTime: "December – February (summer), June – August (ski)",
    currency: "NZD",
    costs: { stay: 35, food: 22, transport: 8, activities: 25 },
    places: [
      { name: "Skyline Gondola viewpoint", category: "Landmark", why: "Sweeping view of Lake Wakatipu." },
      { name: "Lake Wakatipu walk", category: "Nature", why: "Free shoreline trails.", free: true },
      { name: "Bungy at Kawarau Bridge", category: "Adventure", why: "Birthplace of commercial bungy." },
      { name: "Glenorchy day trip", category: "Nature", why: "Lord of the Rings landscapes.", free: true },
      { name: "Fergburger", category: "Food", why: "Famous burger worth the queue." },
      { name: "Ben Lomond hike", category: "Adventure", why: "Free 6-hour summit climb.", free: true },
      { name: "Arrowtown", category: "Culture", why: "Historic gold-rush village 20 min away." }
    ],
    tips: [
      "Cook your own food — supermarkets are way cheaper.",
      "Stay in hostels (BBH/YHA) from NZ$40.",
      "Many hikes and lake views are free.",
      "Free shuttle within central Queenstown."
    ]
  },
  {
    slug: "dubai-uae",
    name: "Dubai",
    country: "UAE",
    region: "Middle East",
    emoji: "🌇",
    tagline: "Desert glitz, world's tallest tower, free beaches.",
    bestTime: "November – March",
    currency: "AED",
    costs: { stay: 40, food: 18, transport: 6, activities: 12 },
    places: [
      { name: "Burj Khalifa exterior + fountain show", category: "Landmark", why: "Free fountain show every 30 min after dusk.", free: true },
      { name: "Old Dubai: Al Fahidi & Creek", category: "Culture", why: "Wind-towers and abra boat rides for 1 AED.", free: true },
      { name: "Gold & Spice Souks", category: "Culture", why: "Atmospheric markets in Deira.", free: true },
      { name: "Jumeirah Beach", category: "Nature", why: "Free public stretches with Burj al Arab views.", free: true },
      { name: "Dubai Marina walk", category: "Culture", why: "Skyscrapers and yachts at night.", free: true },
      { name: "Desert sunset safari", category: "Adventure", why: "Dunes, camels, BBQ under stars." },
      { name: "Karama / Al Karama eats", category: "Food", why: "Indian-Pakistani-Arab feasts under $5." }
    ],
    tips: [
      "Metro is fast and very cheap — avoid taxis at peak.",
      "Eat in Karama, Deira or Bur Dubai, not the malls.",
      "Public beaches and parks are free.",
      "Hostels exist (rare in Dubai) from $20 — book early."
    ]
  },
  {
    slug: "reykjavik-iceland",
    name: "Reykjavík",
    country: "Iceland",
    region: "Europe",
    emoji: "🌋",
    tagline: "Northern lights, geysers, and Nordic minimalism.",
    bestTime: "June – August (midnight sun), September – March (auroras)",
    currency: "ISK",
    costs: { stay: 55, food: 28, transport: 10, activities: 18 },
    places: [
      { name: "Hallgrímskirkja church", category: "Landmark", why: "Basalt-inspired tower with city view.", free: true },
      { name: "Golden Circle self-drive", category: "Nature", why: "Geysir, Gullfoss, Thingvellir in one day.", free: true },
      { name: "Sun Voyager sculpture", category: "Landmark", why: "Iconic sea-front photo.", free: true },
      { name: "Harpa concert hall", category: "Culture", why: "Glass honeycomb facade — free to enter.", free: true },
      { name: "Reykjadalur hot river hike", category: "Adventure", why: "Free natural hot bathing river.", free: true },
      { name: "Bæjarins Beztu hot dog", category: "Food", why: "Iceland's beloved $5 hot dog." },
      { name: "Northern lights chasing", category: "Nature", why: "Drive 30 min from city, free show.", free: true }
    ],
    tips: [
      "Skip Blue Lagoon ($80) — try free hot springs.",
      "Cook from Bonus supermarket; restaurants are pricey.",
      "Rent a small car and split with travelers.",
      "Tap water is glacier-pure — never buy bottled."
    ]
  },
  {
    slug: "marrakech-morocco",
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    emoji: "🕌",
    tagline: "Spice-scented souks, riads, and Sahara gateways.",
    bestTime: "March – May, September – November",
    currency: "MAD",
    costs: { stay: 15, food: 10, transport: 4, activities: 8 },
    places: [
      { name: "Jemaa el-Fnaa square", category: "Culture", why: "Snake charmers, storytellers, food stalls at dusk.", free: true },
      { name: "Majorelle Garden", category: "Nature", why: "Cobalt-blue oasis once owned by YSL." },
      { name: "Bahia Palace", category: "Landmark", why: "19th-century courtyards with zellige tilework." },
      { name: "Souks of the Medina", category: "Culture", why: "Endless lanes of leather, lanterns, spices.", free: true },
      { name: "Koutoubia Mosque", category: "Landmark", why: "Twelfth-century minaret skyline anchor.", free: true },
      { name: "Atlas Mountains day trip", category: "Adventure", why: "Berber villages and waterfalls 90 min away." },
      { name: "Tagine + mint tea feast", category: "Food", why: "Slow-cooked clay-pot classics under $5." }
    ],
    tips: [
      "Always agree on taxi price before getting in.",
      "Haggle to ~40% of opening price in souks.",
      "Stay in a riad guesthouse — better value than hotels.",
      "Carry small bills for tips and street food."
    ]
  },
  {
    slug: "cape-town-south-africa",
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    emoji: "🏔️",
    tagline: "Where mountains crash into two oceans.",
    bestTime: "November – March (southern summer)",
    currency: "ZAR",
    costs: { stay: 22, food: 12, transport: 8, activities: 15 },
    places: [
      { name: "Table Mountain hike", category: "Adventure", why: "Platteklip Gorge climb beats the cable-car queue.", free: true },
      { name: "Boulders Beach penguins", category: "Nature", why: "African penguins waddle right past you." },
      { name: "Cape of Good Hope", category: "Nature", why: "Dramatic cliffs at Africa's south-west tip." },
      { name: "Bo-Kaap neighbourhood", category: "Culture", why: "Candy-coloured Cape Malay houses.", free: true },
      { name: "V&A Waterfront", category: "Landmark", why: "Harbour buzz with free street performers.", free: true },
      { name: "Camps Bay sunset", category: "Nature", why: "Twelve Apostles glow over the Atlantic.", free: true },
      { name: "Braai (BBQ) culture", category: "Food", why: "Boerewors and pap — South Africa on a plate." }
    ],
    tips: [
      "Use MyCiti bus, not random cabs.",
      "Hike with company — Lion's Head at sunset is popular and safer.",
      "Wine farms in Stellenbosch tasting from $5.",
      "Buy SIM at the airport — data is cheap."
    ]
  },
  {
    slug: "buenos-aires-argentina",
    name: "Buenos Aires",
    country: "Argentina",
    region: "Americas",
    emoji: "💃",
    tagline: "Tango, steak, and faded European grandeur.",
    bestTime: "March – May, September – November",
    currency: "ARS",
    costs: { stay: 18, food: 12, transport: 4, activities: 6 },
    places: [
      { name: "La Boca & Caminito", category: "Culture", why: "Rainbow tin houses and street tango.", free: true },
      { name: "Recoleta Cemetery", category: "Landmark", why: "Eva Perón rests in this marble city.", free: true },
      { name: "San Telmo Sunday Market", category: "Culture", why: "Antiques, milongas, and choripán.", free: true },
      { name: "Teatro Colón", category: "Culture", why: "One of the world's great opera houses." },
      { name: "Palermo parks", category: "Nature", why: "Rose garden, lakes, and hip cafés.", free: true },
      { name: "Parrilla steak dinner", category: "Food", why: "Bife de chorizo with Malbec under $15." },
      { name: "Milonga tango night", category: "Culture", why: "Dance halls open late — go watch for free.", free: true }
    ],
    tips: [
      "Use the 'blue dollar' rate — exchange cash, not cards.",
      "Subte (metro) costs cents with a SUBE card.",
      "Empanadas + pizza are filling $3 meals.",
      "Free walking tours leave from Plaza de Mayo daily."
    ]
  },
  {
    slug: "cusco-peru",
    name: "Cusco",
    country: "Peru",
    region: "Americas",
    emoji: "🏞️",
    tagline: "Inca capital and gateway to Machu Picchu.",
    bestTime: "May – September (dry season)",
    currency: "PEN",
    costs: { stay: 14, food: 9, transport: 5, activities: 12 },
    places: [
      { name: "Machu Picchu", category: "Landmark", why: "The lost Inca city — book entry months ahead." },
      { name: "Sacred Valley", category: "Nature", why: "Pisac, Ollantaytambo ruins and Andean villages." },
      { name: "Rainbow Mountain", category: "Adventure", why: "Vinicunca's mineral stripes at 5,000 m." },
      { name: "Plaza de Armas", category: "Landmark", why: "Colonial cathedrals on Inca foundations.", free: true },
      { name: "San Pedro Market", category: "Food", why: "$2 lunches and exotic Andean fruits.", free: true },
      { name: "Sacsayhuamán fortress", category: "Culture", why: "Megalithic stones above the city." },
      { name: "Ceviche + lomo saltado", category: "Food", why: "Peru's UNESCO-grade cuisine." }
    ],
    tips: [
      "Acclimatise 2 days before any high-altitude hike.",
      "Coca tea genuinely helps with soroche.",
      "Take the cheaper Expedition train to Aguas Calientes.",
      "Menú del día: 3-course lunch for $3."
    ]
  },
  {
    slug: "havana-cuba",
    name: "Havana",
    country: "Cuba",
    region: "Americas",
    emoji: "🚗",
    tagline: "Vintage cars, salsa, and crumbling pastel facades.",
    bestTime: "November – April",
    currency: "CUP",
    costs: { stay: 20, food: 12, transport: 5, activities: 7 },
    places: [
      { name: "Old Havana (Habana Vieja)", category: "Culture", why: "UNESCO colonial streets and plazas.", free: true },
      { name: "Malecón seawall", category: "Landmark", why: "Sunset stroll where all Havana gathers.", free: true },
      { name: "Classic car ride", category: "Adventure", why: "Pink '57 Chevy along the coast." },
      { name: "Plaza de la Catedral", category: "Landmark", why: "Baroque cathedral and live trova music.", free: true },
      { name: "Fábrica de Arte Cubano", category: "Culture", why: "Warehouse turned art-bar-club." },
      { name: "Buena Vista-style live son", category: "Culture", why: "Casa de la Música nightly jams." },
      { name: "Ropa vieja + mojito", category: "Food", why: "Shredded beef classic with rum-mint chaser." }
    ],
    tips: [
      "Bring euros or USD cash — cards rarely work.",
      "Stay in a casa particular (homestay) for best value.",
      "Collective taxis (almendrones) cost cents.",
      "Wifi only in parks with an ETECSA card."
    ]
  },
  {
    slug: "hanoi-vietnam",
    name: "Hanoi",
    country: "Vietnam",
    region: "Asia",
    emoji: "🍜",
    tagline: "Motorbike chaos, lake mornings, and the world's best pho.",
    bestTime: "October – April",
    currency: "VND",
    costs: { stay: 10, food: 7, transport: 3, activities: 6 },
    places: [
      { name: "Old Quarter", category: "Culture", why: "36 craft streets, each named for its trade.", free: true },
      { name: "Hoan Kiem Lake", category: "Nature", why: "Misty morning tai chi by the red bridge.", free: true },
      { name: "Train Street", category: "Landmark", why: "Trains roar past coffee shops inches away.", free: true },
      { name: "Temple of Literature", category: "Culture", why: "Vietnam's first university (1070)." },
      { name: "Ha Long Bay day cruise", category: "Nature", why: "Limestone karsts in emerald water." },
      { name: "Bun cha lunch", category: "Food", why: "Grilled pork + noodles, Obama-approved." },
      { name: "Egg coffee", category: "Food", why: "Hanoi invention — dessert in a cup." }
    ],
    tips: [
      "Pho costs $2 on the street, $8 in tourist spots.",
      "Use Grab app instead of haggling taxis.",
      "Cross the road slowly and steadily — never stop.",
      "Bia hoi (fresh beer) is 25 cents a glass."
    ]
  },
  {
    slug: "seoul-south-korea",
    name: "Seoul",
    country: "South Korea",
    region: "Asia",
    emoji: "🏯",
    tagline: "Palaces, K-pop, neon nights, and 24/7 BBQ.",
    bestTime: "April – June, September – November",
    currency: "KRW",
    costs: { stay: 28, food: 15, transport: 6, activities: 10 },
    places: [
      { name: "Gyeongbokgung Palace", category: "Landmark", why: "Free if you wear hanbok — and you should." },
      { name: "Bukchon Hanok Village", category: "Culture", why: "Traditional houses between modern skyline.", free: true },
      { name: "N Seoul Tower", category: "Landmark", why: "City lights from Namsan summit." },
      { name: "Myeongdong street food", category: "Food", why: "Tornado potatoes, hotteok, every snack you've seen on TikTok.", free: true },
      { name: "Hongdae nightlife", category: "Culture", why: "Buskers, bars, and indie clubs.", free: true },
      { name: "DMZ tour", category: "Adventure", why: "Step toward North Korea on a guided trip." },
      { name: "Korean BBQ", category: "Food", why: "Samgyeopsal grill-your-own under $12." }
    ],
    tips: [
      "T-money card works on subway, bus, and convenience stores.",
      "Convenience-store meals are surprisingly good and $4.",
      "Many palaces are free on Culture Day (last Wed).",
      "Tap water is safe; skip bottled."
    ]
  },
  {
    slug: "sydney-australia",
    name: "Sydney",
    country: "Australia",
    region: "Oceania",
    emoji: "🏖️",
    tagline: "Harbour icons, surf beaches, and easygoing sunshine.",
    bestTime: "September – November, March – May",
    currency: "AUD",
    costs: { stay: 40, food: 22, transport: 10, activities: 14 },
    places: [
      { name: "Sydney Opera House", category: "Landmark", why: "The shells from every angle — free to walk around.", free: true },
      { name: "Harbour Bridge walk", category: "Adventure", why: "Cross on foot for free; climb if you splurge.", free: true },
      { name: "Bondi to Coogee coastal walk", category: "Nature", why: "6 km of cliffs, beaches, and ocean pools.", free: true },
      { name: "Royal Botanic Garden", category: "Nature", why: "Mrs Macquarie's Chair = postcard view.", free: true },
      { name: "Manly Ferry", category: "Adventure", why: "Cheapest harbour cruise via public ferry." },
      { name: "Queen Victoria Building", category: "Landmark", why: "Romanesque arcade in the CBD.", free: true },
      { name: "Meat pie + flat white", category: "Food", why: "Aussie café staple done right." }
    ],
    tips: [
      "Opal card caps daily and Sunday fares ($8.90).",
      "BYO wine restaurants save heaps.",
      "Free Tuesdays at many museums.",
      "Coles/Woolies meal-deal lunches under $10."
    ]
  },
  {
    slug: "queenstown-new-zealand",
    name: "Queenstown",
    country: "New Zealand",
    region: "Oceania",
    emoji: "🏔️",
    tagline: "Adventure capital of the world — bungee was invented here.",
    bestTime: "December – February (summer), June – August (ski)",
    currency: "NZD",
    costs: { stay: 35, food: 20, transport: 8, activities: 30 },
    places: [
      { name: "Skyline Gondola + luge", category: "Adventure", why: "Panoramic Lake Wakatipu views." },
      { name: "Milford Sound day trip", category: "Nature", why: "Fiordland's waterfall-lined cathedral." },
      { name: "Kawarau Bridge bungee", category: "Adventure", why: "The original 43-metre jump." },
      { name: "Lake Wakatipu shore walk", category: "Nature", why: "Crystal water with mountain mirror.", free: true },
      { name: "Glenorchy drive", category: "Nature", why: "LOTR scenery — 45 min of jaw-drop.", free: true },
      { name: "Fergburger", category: "Food", why: "World-famous burger, worth the queue." },
      { name: "Arrowtown gold-rush village", category: "Culture", why: "Autumn leaves and 1860s cottages.", free: true }
    ],
    tips: [
      "Hostels + cooking your own food saves a fortune.",
      "Hike the Ben Lomond track — free and stunning.",
      "BookMe app slashes activity prices last-minute.",
      "Drive yourself to Milford to skip $200 tours."
    ]
  },
  {
    slug: "petra-jordan",
    name: "Petra",
    country: "Jordan",
    region: "Middle East",
    emoji: "🏜️",
    tagline: "Rose-red city carved into desert cliffs.",
    bestTime: "March – May, September – November",
    currency: "JOD",
    costs: { stay: 25, food: 12, transport: 8, activities: 20 },
    places: [
      { name: "The Treasury (Al-Khazneh)", category: "Landmark", why: "Indiana Jones façade at the end of the Siq." },
      { name: "The Monastery (Ad Deir)", category: "Adventure", why: "850 steps up — fewer crowds, bigger reward." },
      { name: "Wadi Rum desert", category: "Nature", why: "Mars-like sandstone; sleep under stars." },
      { name: "Petra by Night", category: "Culture", why: "1,500 candles light the Siq twice a week." },
      { name: "Little Petra", category: "Landmark", why: "Quieter Nabatean ruins nearby.", free: true },
      { name: "Mansaf feast", category: "Food", why: "Lamb on rice with fermented yogurt — Jordan's national dish." },
      { name: "Dead Sea float", category: "Nature", why: "Lowest point on Earth; saltier than imagination." }
    ],
    tips: [
      "Jordan Pass bundles visa + Petra entry — huge saving.",
      "Enter Petra at 6 am to beat heat and tour buses.",
      "Bedouin tea is offered freely — accept it.",
      "JETT bus from Amman is cheap and reliable."
    ]
  },
  {
    slug: "lisbon-portugal",
    name: "Lisbon",
    country: "Portugal",
    region: "Europe",
    emoji: "🚋",
    tagline: "Hilltop miradouros, fado nights, and pastel de nata.",
    bestTime: "March – May, September – October",
    currency: "EUR",
    costs: { stay: 30, food: 18, transport: 6, activities: 10 },
    places: [
      { name: "Tram 28 ride", category: "Adventure", why: "Yellow tram through Alfama's tight lanes." },
      { name: "Belém Tower & Jerónimos", category: "Landmark", why: "Manueline masterpieces by the river." },
      { name: "Miradouro da Senhora do Monte", category: "Nature", why: "Best free sunset view in town.", free: true },
      { name: "LX Factory", category: "Culture", why: "Industrial complex turned hipster hub.", free: true },
      { name: "Time Out Market", category: "Food", why: "Top chefs under one roof, mains $10." },
      { name: "Pastéis de Belém", category: "Food", why: "Original 1837 custard tart recipe." },
      { name: "Sintra day trip", category: "Culture", why: "Pena Palace fairy-tale on a hill." }
    ],
    tips: [
      "Viva Viagem card: 24h transport for €6.80.",
      "Lunch 'prato do dia' is half dinner price.",
      "Free walking tours from Praça Luís de Camões.",
      "Skip Uber on hills — funiculars cost €1.50."
    ]
  },
  {
    slug: "prague-czech-republic",
    name: "Prague",
    country: "Czech Republic",
    region: "Europe",
    emoji: "🏰",
    tagline: "Gothic spires, cobbled lanes, and €1.50 beer.",
    bestTime: "April – June, September – October",
    currency: "CZK",
    costs: { stay: 25, food: 14, transport: 5, activities: 8 },
    places: [
      { name: "Charles Bridge at dawn", category: "Landmark", why: "Statues, no crowds, golden light.", free: true },
      { name: "Prague Castle", category: "Landmark", why: "Largest ancient castle complex in the world." },
      { name: "Old Town Square clock", category: "Culture", why: "Astronomical clock show every hour.", free: true },
      { name: "Letná Park beer garden", category: "Nature", why: "Skyline view with €2 pint.", free: true },
      { name: "John Lennon Wall", category: "Culture", why: "Ever-changing graffiti tribute.", free: true },
      { name: "Vltava river paddleboat", category: "Adventure", why: "Cheesy fun, postcard angles." },
      { name: "Svíčková + dumplings", category: "Food", why: "Marinated beef in cream sauce, Czech soul." }
    ],
    tips: [
      "Avoid currency-exchange booths — use ATMs.",
      "Trams are faster than Uber in centre.",
      "Lunch menus (polední menu) are 40% cheaper.",
      "Skip Old Town restaurants; walk 5 min for half price."
    ]
  },
  {
    slug: "amsterdam-netherlands",
    name: "Amsterdam",
    country: "Netherlands",
    region: "Europe",
    emoji: "🚲",
    tagline: "Canals, bikes, gabled houses, world-class art.",
    bestTime: "April – May (tulips), June – August",
    currency: "EUR",
    costs: { stay: 45, food: 22, transport: 9, activities: 18 },
    places: [
      { name: "Jordaan canal walk", category: "Culture", why: "Quietest, prettiest canal district.", free: true },
      { name: "Van Gogh Museum", category: "Culture", why: "World's largest Van Gogh collection." },
      { name: "Anne Frank House", category: "Landmark", why: "Powerful — book months ahead." },
      { name: "Vondelpark", category: "Nature", why: "Locals' lungs of the city — picnic here.", free: true },
      { name: "Rijksmuseum", category: "Culture", why: "Rembrandt's Night Watch in the flesh." },
      { name: "Albert Cuyp Market", category: "Food", why: "Stroopwafels straight off the iron.", free: true },
      { name: "NDSM ferry", category: "Adventure", why: "Free ferry to street-art shipyard.", free: true }
    ],
    tips: [
      "Rent a bike — it's 30% faster than transit.",
      "I Amsterdam City Card pays off if 3+ museums.",
      "Supermarket dinner picnic by the canal saves €30.",
      "Tap water is excellent."
    ]
  },
  {
    slug: "edinburgh-scotland",
    name: "Edinburgh",
    country: "Scotland",
    region: "Europe",
    emoji: "🏴",
    tagline: "Volcanic crags, gothic Old Town, whisky on every corner.",
    bestTime: "May – September",
    currency: "GBP",
    costs: { stay: 35, food: 18, transport: 5, activities: 12 },
    places: [
      { name: "Arthur's Seat hike", category: "Adventure", why: "Extinct volcano with 360° city view.", free: true },
      { name: "Royal Mile", category: "Culture", why: "Closes, kilts, and pipers from Castle to Holyrood.", free: true },
      { name: "Edinburgh Castle", category: "Landmark", why: "Crown Jewels and 1 pm cannon." },
      { name: "Dean Village", category: "Nature", why: "Hidden riverside hamlet 5 min from Princes St.", free: true },
      { name: "National Museum of Scotland", category: "Culture", why: "Free, world-class, kids love it.", free: true },
      { name: "Whisky tasting flight", category: "Food", why: "Smoky Islay vs. honeyed Speyside." },
      { name: "Calton Hill sunset", category: "Nature", why: "Acropolis-style monuments at golden hour.", free: true }
    ],
    tips: [
      "Almost all national museums are free.",
      "Fringe Festival = expensive August; come in May.",
      "Bus day-pass £4.80 covers everything.",
      "Wetherspoons breakfast £4 with coffee refill."
    ]
  },
  {
    slug: "santorini-greece",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    emoji: "🏝️",
    tagline: "Whitewashed cliffs over a sunken volcano.",
    bestTime: "May – June, September – October",
    currency: "EUR",
    costs: { stay: 50, food: 22, transport: 8, activities: 15 },
    places: [
      { name: "Oia sunset", category: "Nature", why: "The blue dome shot — arrive 90 min early.", free: true },
      { name: "Fira to Oia hike", category: "Adventure", why: "10 km of caldera-edge paths.", free: true },
      { name: "Red Beach", category: "Nature", why: "Volcanic cliffs in sunset shades.", free: true },
      { name: "Akrotiri ruins", category: "Culture", why: "Minoan Pompeii, frozen in ash." },
      { name: "Catamaran caldera cruise", category: "Adventure", why: "Hot springs + sunset on water." },
      { name: "Ammoudi Bay seafood", category: "Food", why: "Fresh octopus below Oia's cliffs." },
      { name: "Pyrgos village", category: "Culture", why: "Quieter, higher, half the crowds.", free: true }
    ],
    tips: [
      "Stay in Pyrgos or Megalochori — 60% cheaper than Oia.",
      "Local bus €1.80 connects all villages.",
      "Gyros at €4 vs €25 caldera-view dinners.",
      "Visit shoulder season — same sun, no crowds."
    ]
  },
  {
    slug: "berlin-germany",
    name: "Berlin",
    country: "Germany",
    region: "Europe",
    emoji: "🎨",
    tagline: "Edgy history, all-night clubs, kebabs at 4 am.",
    bestTime: "May – September",
    currency: "EUR",
    costs: { stay: 35, food: 18, transport: 7, activities: 10 },
    places: [
      { name: "Brandenburg Gate", category: "Landmark", why: "Symbol of reunification.", free: true },
      { name: "East Side Gallery", category: "Culture", why: "Longest open-air art gallery on the Wall.", free: true },
      { name: "Reichstag dome", category: "Landmark", why: "Free with advance booking; spiral views.", free: true },
      { name: "Museum Island", category: "Culture", why: "Five museums, including the Pergamon." },
      { name: "Mauerpark Sunday", category: "Culture", why: "Karaoke, flea market, all of Berlin shows up.", free: true },
      { name: "Currywurst + döner", category: "Food", why: "Berlin's two great street-food rivals." },
      { name: "Tempelhofer Feld", category: "Nature", why: "Former airport now a giant park.", free: true }
    ],
    tips: [
      "ABC zones day ticket €10.60.",
      "Späti shops have €1 beer to walk with — legal here.",
      "Sundays: museums often discounted.",
      "Berghain is free if you get past the bouncer."
    ]
  },
  {
    slug: "budapest-hungary",
    name: "Budapest",
    country: "Hungary",
    region: "Europe",
    emoji: "♨️",
    tagline: "Thermal baths, ruin bars, and Danube grandeur.",
    bestTime: "April – June, September – October",
    currency: "HUF",
    costs: { stay: 22, food: 13, transport: 5, activities: 10 },
    places: [
      { name: "Széchenyi thermal baths", category: "Adventure", why: "Outdoor pools with locals playing chess." },
      { name: "Fisherman's Bastion", category: "Landmark", why: "Castle-hill fairytale terraces.", free: true },
      { name: "Parliament Building", category: "Landmark", why: "Neo-Gothic riverside icon." },
      { name: "Ruin bars (Szimpla Kert)", category: "Culture", why: "Abandoned buildings turned bohemian bars.", free: true },
      { name: "Chain Bridge night walk", category: "Nature", why: "Buda Castle reflected in the Danube.", free: true },
      { name: "Goulash + langos", category: "Food", why: "Smoky paprika stew + fried bread heaven." },
      { name: "Margaret Island", category: "Nature", why: "Car-free park in the middle of the river.", free: true }
    ],
    tips: [
      "Public transport €1 single, €5 day pass.",
      "Lunch menus 1,500 HUF (~$4) all over town.",
      "Buy bath ticket online — skip 30-min queue.",
      "Avoid taxis from station; use Bolt app."
    ]
  },
  {
    slug: "istanbul-turkey",
    name: "Istanbul",
    country: "Turkey",
    region: "Middle East",
    emoji: "🕌",
    tagline: "Where Europe meets Asia over a cup of çay.",
    bestTime: "April – May, September – November",
    currency: "TRY",
    costs: { stay: 22, food: 12, transport: 4, activities: 10 },
    places: [
      { name: "Hagia Sophia", category: "Landmark", why: "1,500 years of Byzantine + Ottoman layers." },
      { name: "Blue Mosque", category: "Landmark", why: "Six minarets and 20,000 İznik tiles.", free: true },
      { name: "Grand Bazaar", category: "Culture", why: "4,000 shops in a covered labyrinth.", free: true },
      { name: "Bosphorus ferry", category: "Adventure", why: "Cross continents for under $1." },
      { name: "Topkapi Palace", category: "Culture", why: "Sultans' treasury + harem quarters." },
      { name: "Spice Bazaar", category: "Food", why: "Saffron, baklava, Turkish delight.", free: true },
      { name: "Balat neighbourhood", category: "Culture", why: "Rainbow houses and antique cafés.", free: true }
    ],
    tips: [
      "Istanbulkart works on ferries, trams, buses.",
      "Eat where locals eat — lokantas $5 lunches.",
      "Museum Pass Istanbul: 7 days, big saver.",
      "Always say 'no thanks' firmly to carpet touts."
    ]
  },
  {
    slug: "stockholm-sweden",
    name: "Stockholm",
    country: "Sweden",
    region: "Europe",
    emoji: "⛵",
    tagline: "City on 14 islands, designed within an inch of its life.",
    bestTime: "May – August",
    currency: "SEK",
    costs: { stay: 45, food: 25, transport: 10, activities: 15 },
    places: [
      { name: "Gamla Stan old town", category: "Culture", why: "Ochre lanes, royal palace, Nobel Museum.", free: true },
      { name: "Vasa Museum", category: "Culture", why: "Intact 17th-century warship — unmissable." },
      { name: "Skansen open-air museum", category: "Culture", why: "Sweden in miniature with Nordic animals." },
      { name: "Archipelago ferry", category: "Adventure", why: "Hop to Vaxholm or Grinda for the day." },
      { name: "Fotografiska", category: "Culture", why: "Photography museum + rooftop view." },
      { name: "Fika at Vete-Katten", category: "Food", why: "Cinnamon bun + coffee = sacred ritual." },
      { name: "Monteliusvägen viewpoint", category: "Nature", why: "Free postcard panorama.", free: true }
    ],
    tips: [
      "SL travel card 24h: 175 SEK; covers ferries.",
      "Many museums free under 18.",
      "Lunch dagens rätt: $12 vs $30 dinner mains.",
      "Tap water is among the world's best."
    ]
  },
  {
    slug: "dublin-ireland",
    name: "Dublin",
    country: "Ireland",
    region: "Europe",
    emoji: "☘️",
    tagline: "Pub songs, Georgian doors, literary giants.",
    bestTime: "May – September",
    currency: "EUR",
    costs: { stay: 40, food: 20, transport: 7, activities: 12 },
    places: [
      { name: "Trinity College & Book of Kells", category: "Culture", why: "Long Room library is Hogwarts IRL." },
      { name: "Guinness Storehouse", category: "Food", why: "Pint with skyline view at the top." },
      { name: "Temple Bar", category: "Culture", why: "Touristy but trad music nightly.", free: true },
      { name: "St Stephen's Green", category: "Nature", why: "Victorian park lunch spot.", free: true },
      { name: "Kilmainham Gaol", category: "Landmark", why: "Where Irish independence was born." },
      { name: "Cliffs of Moher day trip", category: "Nature", why: "214-m Atlantic cliffs — €30 round-trip bus." },
      { name: "Irish stew + soda bread", category: "Food", why: "Pub classic for €15." }
    ],
    tips: [
      "Leap Visitor Card: 72h transport €19.",
      "Many museums (National Gallery, Archaeology) free.",
      "Eat at carveries — €12 roast lunch.",
      "Trad sessions free in pubs from 9 pm."
    ]
  },
  {
    slug: "split-croatia",
    name: "Split",
    country: "Croatia",
    region: "Europe",
    emoji: "⛴️",
    tagline: "Roman palace by day, island ferries by morning.",
    bestTime: "May – June, September",
    currency: "EUR",
    costs: { stay: 30, food: 18, transport: 7, activities: 12 },
    places: [
      { name: "Diocletian's Palace", category: "Landmark", why: "Live in a 4th-century Roman palace.", free: true },
      { name: "Riva promenade", category: "Culture", why: "Palm-lined sunset stroll with locals.", free: true },
      { name: "Marjan Hill", category: "Nature", why: "Pine-forest hike to Adriatic views.", free: true },
      { name: "Hvar island day trip", category: "Adventure", why: "Lavender fields, hidden coves." },
      { name: "Krka waterfalls", category: "Nature", why: "Swim above cascades (in summer)." },
      { name: "Peka feast", category: "Food", why: "Octopus slow-cooked under iron bell." },
      { name: "Bačvice beach", category: "Nature", why: "Sandy local beach with paddle game.", free: true }
    ],
    tips: [
      "Stay in Veli Varoš — 5 min walk, half the price.",
      "Local ferries cost a fraction of catamarans.",
      "Konobas (taverns) are cheaper than Riva restaurants.",
      "Tap water is drinkable everywhere."
    ]
  },
  {
    slug: "marseille-france",
    name: "Marseille",
    country: "France",
    region: "Europe",
    emoji: "⛵",
    tagline: "Gritty Mediterranean port with calanques on its doorstep.",
    bestTime: "May – June, September – October",
    currency: "EUR",
    costs: { stay: 35, food: 20, transport: 6, activities: 10 },
    places: [
      { name: "Vieux Port", category: "Culture", why: "Fish market on the quay each morning.", free: true },
      { name: "Notre-Dame de la Garde", category: "Landmark", why: "Golden Madonna over the whole city.", free: true },
      { name: "Calanques National Park", category: "Nature", why: "Limestone fjords with turquoise coves.", free: true },
      { name: "Le Panier neighbourhood", category: "Culture", why: "Oldest quarter, street art, soap shops.", free: true },
      { name: "MuCEM", category: "Culture", why: "Striking museum on the harbour entrance." },
      { name: "Bouillabaisse", category: "Food", why: "Five-fish stew invented here." },
      { name: "Frioul islands ferry", category: "Adventure", why: "20-min ride to wild cliffs and beaches." }
    ],
    tips: [
      "RTM day pass €5.20 (metro + tram + bus).",
      "Free swimming at Plage des Catalans.",
      "Lunch formules €13 in Cours Julien.",
      "Calanques: hike from Luminy, free parking."
    ]
  },
  {
    slug: "rio-de-janeiro-brazil",
    name: "Rio de Janeiro",
    country: "Brazil",
    region: "Americas",
    emoji: "🏖️",
    tagline: "Mountains, beaches, samba — the cidade maravilhosa.",
    bestTime: "April – May, September – November",
    currency: "BRL",
    costs: { stay: 25, food: 15, transport: 5, activities: 12 },
    places: [
      { name: "Christ the Redeemer", category: "Landmark", why: "Iconic statue with sweeping panorama." },
      { name: "Sugarloaf cable car", category: "Adventure", why: "Two-stage ride at sunset." },
      { name: "Copacabana & Ipanema", category: "Nature", why: "Mosaic promenade and football on the sand.", free: true },
      { name: "Selarón Steps", category: "Culture", why: "215 steps tiled in flags from 60 countries.", free: true },
      { name: "Tijuca rainforest hike", category: "Nature", why: "Largest urban forest in the world.", free: true },
      { name: "Lapa Friday street party", category: "Culture", why: "Samba and caipirinhas under the arches.", free: true },
      { name: "Feijoada lunch", category: "Food", why: "Black-bean stew, Brazil's Saturday ritual." }
    ],
    tips: [
      "Use Uber — way safer than street taxis.",
      "Skip valuables on the beach; carry copy of ID.",
      "Tijuca trail to Christ is free (vs $25 train).",
      "Per-kilo buffets fill you up for $6."
    ]
  },
  {
    slug: "mexico-city-mexico",
    name: "Mexico City",
    country: "Mexico",
    region: "Americas",
    emoji: "🌮",
    tagline: "Aztec history, Frida murals, taco perfection.",
    bestTime: "March – May, October – November",
    currency: "MXN",
    costs: { stay: 22, food: 12, transport: 3, activities: 8 },
    places: [
      { name: "Teotihuacán pyramids", category: "Landmark", why: "Climb the Pyramid of the Sun at dawn." },
      { name: "Frida Kahlo Museum (Casa Azul)", category: "Culture", why: "Her cobalt-blue home, untouched." },
      { name: "Zócalo + Templo Mayor", category: "Landmark", why: "Aztec ruins beside the cathedral.", free: true },
      { name: "Coyoacán market", category: "Food", why: "Tostadas the size of frisbees.", free: true },
      { name: "Xochimilco trajineras", category: "Adventure", why: "Floating-garden party boats." },
      { name: "Chapultepec Park + Castle", category: "Nature", why: "Bigger than Central Park.", free: true },
      { name: "Taco al pastor crawl", category: "Food", why: "Shepherd-style pork on the trompo for $0.80." }
    ],
    tips: [
      "Metro is 5 pesos (~$0.30) anywhere.",
      "Drink only bottled or filtered water.",
      "Sunday: many museums free for residents + cheap for tourists.",
      "Use Uber after dark."
    ]
  },
  {
    slug: "vancouver-canada",
    name: "Vancouver",
    country: "Canada",
    region: "Americas",
    emoji: "🌲",
    tagline: "Where rainforest, ocean, and mountain meet downtown.",
    bestTime: "June – September",
    currency: "CAD",
    costs: { stay: 40, food: 22, transport: 8, activities: 15 },
    places: [
      { name: "Stanley Park seawall", category: "Nature", why: "10 km loop with totems and ocean views.", free: true },
      { name: "Granville Island Market", category: "Food", why: "Artisan stalls + buskers.", free: true },
      { name: "Capilano Suspension Bridge", category: "Adventure", why: "70 m above the river — or free Lynn Canyon." },
      { name: "Grouse Grind", category: "Adventure", why: "'Mother Nature's StairMaster' — 853 m up.", free: true },
      { name: "Gastown steam clock", category: "Landmark", why: "Cobblestone heritage district.", free: true },
      { name: "Kitsilano Beach", category: "Nature", why: "Mountain backdrop sunset.", free: true },
      { name: "Sushi at Miku or Tojo's", category: "Food", why: "Pacific salmon at its source." }
    ],
    tips: [
      "Compass card: zone-based, day cap $11.",
      "Free Lynn Canyon = same vibe, no $60 entry.",
      "Happy hour 3-6 pm = half price drinks + apps.",
      "Day-trip Squamish on cheap bus instead of Whistler."
    ]
  },
  {
    slug: "kyoto-japan",
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    emoji: "⛩️",
    tagline: "Geisha lanes, Zen gardens, 1,600 temples.",
    bestTime: "March – April (sakura), November (koyo)",
    currency: "JPY",
    costs: { stay: 30, food: 18, transport: 6, activities: 10 },
    places: [
      { name: "Fushimi Inari shrine", category: "Landmark", why: "10,000 vermilion torii up the mountain.", free: true },
      { name: "Arashiyama bamboo grove", category: "Nature", why: "Whispering green cathedral at dawn.", free: true },
      { name: "Kinkaku-ji Golden Pavilion", category: "Landmark", why: "Gilded temple mirrored on a pond." },
      { name: "Gion district", category: "Culture", why: "Spot real geiko gliding to teahouses.", free: true },
      { name: "Philosopher's Path", category: "Nature", why: "Cherry-tree canal walk between temples.", free: true },
      { name: "Nishiki Market", category: "Food", why: "Kyoto's kitchen — pickles to mochi.", free: true },
      { name: "Kaiseki ryokan dinner", category: "Food", why: "Multi-course art on plates." }
    ],
    tips: [
      "Bus day-pass ¥700 covers most temples.",
      "Visit big sights at 7 am — empty.",
      "Konbini meals are great and ¥500.",
      "Kyoto Station coin lockers free your day-pack."
    ]
  },
  {
    slug: "chiang-mai-thailand",
    name: "Chiang Mai",
    country: "Thailand",
    region: "Asia",
    emoji: "🐘",
    tagline: "Mountain temples, night markets, digital-nomad mecca.",
    bestTime: "November – February",
    currency: "THB",
    costs: { stay: 12, food: 6, transport: 3, activities: 8 },
    places: [
      { name: "Doi Suthep temple", category: "Landmark", why: "Golden chedi over the city." },
      { name: "Old City temple loop", category: "Culture", why: "Wat Chedi Luang + Wat Phra Singh on foot.", free: true },
      { name: "Sunday Walking Street", category: "Culture", why: "Crafts + street food, locals everywhere.", free: true },
      { name: "Elephant Nature Park", category: "Nature", why: "Ethical sanctuary — no riding." },
      { name: "Pai loop scooter trip", category: "Adventure", why: "762 curves to a hippie mountain town." },
      { name: "Khao soi", category: "Food", why: "Northern coconut-curry noodles, $2." },
      { name: "Sticky Waterfalls (Bua Tong)", category: "Nature", why: "Climb up the cascade barefoot.", free: true }
    ],
    tips: [
      "Songthaew red trucks: 30 baht flat in old city.",
      "$15/day rooms with pool exist in Nimman.",
      "Cooking class (~$25) includes market tour.",
      "Avoid March-April burning season."
    ]
  },
  {
    slug: "kathmandu-nepal",
    name: "Kathmandu",
    country: "Nepal",
    region: "Asia",
    emoji: "🏔️",
    tagline: "Himalayan trailhead with prayer flags everywhere.",
    bestTime: "October – November, March – April",
    currency: "NPR",
    costs: { stay: 10, food: 6, transport: 3, activities: 7 },
    places: [
      { name: "Boudhanath stupa", category: "Landmark", why: "Largest stupa in Nepal; circumambulate at dusk." },
      { name: "Swayambhunath (Monkey Temple)", category: "Culture", why: "Hilltop view + curious primates." },
      { name: "Durbar Square Patan", category: "Landmark", why: "Newari palace courtyards." },
      { name: "Thamel night bazaar", category: "Culture", why: "Trekking gear and momo dumpling stalls.", free: true },
      { name: "Nagarkot sunrise", category: "Nature", why: "Everest range glimpse from a ridge.", free: true },
      { name: "Dal bhat thali", category: "Food", why: "Endless refills for $3." },
      { name: "Bhaktapur day trip", category: "Culture", why: "Best-preserved medieval city in valley." }
    ],
    tips: [
      "Buy SIM at airport — Ncell works in mountains.",
      "Bargain in Thamel — start at 40%.",
      "Carry cash; ATMs cap withdrawals.",
      "Trekking permits online cheaper than agencies."
    ]
  },
  {
    slug: "tbilisi-georgia",
    name: "Tbilisi",
    country: "Georgia",
    region: "Asia",
    emoji: "🍷",
    tagline: "8,000-year wine country with sulphur baths and warmth.",
    bestTime: "May – June, September – October",
    currency: "GEL",
    costs: { stay: 20, food: 12, transport: 3, activities: 8 },
    places: [
      { name: "Old Town & Narikala fortress", category: "Landmark", why: "Cable-car up, walk down via baths.", free: true },
      { name: "Sulphur bath houses", category: "Adventure", why: "Domed bathhouses since the 5th century." },
      { name: "Mtatsminda Park funicular", category: "Nature", why: "Hilltop ferris wheel + city view." },
      { name: "Dry Bridge Market", category: "Culture", why: "Soviet kitsch, samovars, vinyl.", free: true },
      { name: "Khinkali + khachapuri feast", category: "Food", why: "Soup dumplings + cheese-bread boat." },
      { name: "Kazbegi day trip", category: "Adventure", why: "Snow peaks and Gergeti Trinity church." },
      { name: "Wine in a qvevri", category: "Food", why: "Amber wine fermented in clay pots." }
    ],
    tips: [
      "Marshrutka minibuses to anywhere for $3-8.",
      "Restaurants serve free bread + water — ask.",
      "Bolt rides are $1-2 in town.",
      "Free walking tour from Liberty Square."
    ]
  },
  {
    slug: "siem-reap-cambodia",
    name: "Siem Reap",
    country: "Cambodia",
    region: "Asia",
    emoji: "🛕",
    tagline: "Gateway to Angkor — temples swallowed by jungle.",
    bestTime: "November – February",
    currency: "USD",
    costs: { stay: 12, food: 7, transport: 5, activities: 12 },
    places: [
      { name: "Angkor Wat sunrise", category: "Landmark", why: "Largest religious monument on Earth, glowing pink." },
      { name: "Bayon temple", category: "Landmark", why: "216 serene stone faces stare back at you." },
      { name: "Ta Prohm", category: "Culture", why: "The Tomb Raider temple, strangled by silk-cotton roots." },
      { name: "Banteay Srei", category: "Culture", why: "Pink-sandstone carving so fine it looks woven." },
      { name: "Tonle Sap floating villages", category: "Adventure", why: "Stilt houses on the great lake." },
      { name: "Pub Street + night market", category: "Culture", why: "$0.50 draft beer and lok lak skewers.", free: true },
      { name: "Fish amok", category: "Food", why: "Coconut-curry custard steamed in banana leaf." }
    ],
    tips: [
      "Buy 3-day Angkor pass — beats one rushed day.",
      "Tuk-tuk full-day temple loop ~$20.",
      "Bring cash USD; small dollars preferred.",
      "Cover shoulders + knees to enter temples."
    ]
  },
  {
    slug: "rajasthan-india",
    name: "Rajasthan",
    country: "India",
    region: "Asia",
    emoji: "🐫",
    tagline: "Forts, palaces, and the Thar desert — India's most regal state.",
    bestTime: "October – March (cool & dry)",
    currency: "INR",
    costs: { stay: 10, food: 5, transport: 4, activities: 6 },
    places: [
      { name: "Amber Fort, Jaipur", category: "Landmark", why: "Hilltop sandstone fort with mirror-work palaces." },
      { name: "Mehrangarh Fort, Jodhpur", category: "Landmark", why: "Cliffside fortress over the Blue City." },
      { name: "Jaisalmer Golden Fort", category: "Landmark", why: "Living fort of yellow sandstone in the Thar desert." },
      { name: "Sam Sand Dunes camel safari", category: "Adventure", why: "Sunset camel ride + desert camp under the stars." },
      { name: "Lake Pichola, Udaipur", category: "Nature", why: "Boat ride past floating marble palaces." },
      { name: "Hawa Mahal, Jaipur", category: "Landmark", why: "953 latticed windows on a pink honeycomb façade.", free: true },
      { name: "Junagarh Fort, Bikaner", category: "Culture", why: "Unconquered fort with opulent painted halls." },
      { name: "Pushkar Lake & Brahma Temple", category: "Culture", why: "Sacred lake with one of the world's only Brahma temples.", free: true },
      { name: "Dal Bati Churma", category: "Food", why: "Iconic Rajasthani thali — wheat balls in ghee with lentils." }
    ],
    tips: [
      "Take overnight sleeper trains between cities — cheap and scenic.",
      "Hire a local guide at forts (~₹300) — the stories make it worth it.",
      "Bargain everywhere except fixed-price govt emporiums.",
      "Cover head + remove shoes at temples; carry a scarf.",
      "October–February is peak; book Pushkar Camel Fair months ahead."
    ]
  }
];
const mkState = (slug, name, emoji, tagline, bestTime, costs, places, tips) => ({
  slug,
  name,
  country: "India",
  region: "Asia",
  emoji,
  tagline,
  bestTime,
  currency: "INR",
  costs,
  places,
  tips
});
const indianStates = [
  mkState(
    "andhra-pradesh-india",
    "Andhra Pradesh",
    "🛕",
    "Ancient temples, spicy biryani, and a long sun-baked coast.",
    "November – February",
    { stay: 9, food: 4, transport: 4, activities: 4 },
    [
      { name: "Tirupati (Sri Venkateswara Temple)", category: "Culture", why: "One of the world's most-visited pilgrimage sites." },
      { name: "Araku Valley", category: "Nature", why: "Coffee hills and tribal villages on a scenic train ride." },
      { name: "Borra Caves", category: "Nature", why: "Million-year-old stalactite caverns lit in colour." },
      { name: "Lepakshi Temple", category: "Landmark", why: "Hanging pillar and giant monolithic Nandi.", free: true },
      { name: "Hyderabadi-style biryani in Vijayawada", category: "Food", why: "Andhra spice levels you won't forget." }
    ],
    ["Carry tissues — Andhra meals are fiery.", "Pre-book Tirupati darshan online to skip 8h queues."]
  ),
  mkState(
    "arunachal-pradesh-india",
    "Arunachal Pradesh",
    "🏔️",
    "Sunrise state — Himalayan monasteries and tribal valleys.",
    "October – April",
    { stay: 12, food: 6, transport: 8, activities: 6 },
    [
      { name: "Tawang Monastery", category: "Culture", why: "Largest monastery in India, perched at 3,000m." },
      { name: "Sela Pass", category: "Nature", why: "Snow-rimmed alpine lake at 4,170m." },
      { name: "Ziro Valley", category: "Nature", why: "Apatani rice fields and a beloved music festival." },
      { name: "Namdapha National Park", category: "Adventure", why: "Four big-cat species in dense rainforest." }
    ],
    ["Indians need an Inner Line Permit; foreigners a PAP.", "Roads are slow — plan 6–8 hour drives between towns."]
  ),
  mkState(
    "assam-india",
    "Assam",
    "🍵",
    "Tea gardens, the mighty Brahmaputra, and one-horned rhinos.",
    "November – April",
    { stay: 10, food: 5, transport: 4, activities: 5 },
    [
      { name: "Kaziranga National Park", category: "Nature", why: "World's largest population of one-horned rhinos." },
      { name: "Majuli Island", category: "Culture", why: "World's largest river island and Vaishnavite monasteries." },
      { name: "Kamakhya Temple, Guwahati", category: "Culture", why: "Powerful Shakti pilgrimage site on Nilachal Hill." },
      { name: "Jorhat tea estates", category: "Nature", why: "Stay on a colonial-era tea bungalow." },
      { name: "Assam thali with fish tenga", category: "Food", why: "Tangy tomato fish curry and bamboo shoot." }
    ],
    ["Avoid the monsoon — Brahmaputra floods routinely.", "Book Kaziranga jeep safaris a day ahead."]
  ),
  mkState(
    "bihar-india",
    "Bihar",
    "☸️",
    "Birthplace of Buddhism and ancient seats of learning.",
    "October – March",
    { stay: 8, food: 3, transport: 3, activities: 3 },
    [
      { name: "Mahabodhi Temple, Bodh Gaya", category: "Culture", why: "Where the Buddha attained enlightenment.", free: true },
      { name: "Nalanda ruins", category: "Landmark", why: "5th-century university — UNESCO site." },
      { name: "Vikramshila ruins", category: "Landmark", why: "Once-great Buddhist monastic complex." },
      { name: "Litti chokha street food", category: "Food", why: "Smoky wheat balls with mashed spiced veg." }
    ],
    ["Trains are the easiest way around.", "Dress modestly at religious sites; remove shoes."]
  ),
  mkState(
    "chhattisgarh-india",
    "Chhattisgarh",
    "🌳",
    "Tribal heartland of waterfalls and dense sal forests.",
    "October – March",
    { stay: 8, food: 3, transport: 4, activities: 4 },
    [
      { name: "Chitrakote Falls", category: "Nature", why: "India's widest waterfall — 'Niagara of India'." },
      { name: "Kanger Valley National Park", category: "Adventure", why: "Limestone caves and bison-rich jungle." },
      { name: "Bhoramdeo Temple", category: "Landmark", why: "11th-century 'Khajuraho of Chhattisgarh'." },
      { name: "Bastar tribal markets", category: "Culture", why: "Weekly haats with metal craft and bamboo art." }
    ],
    ["Travel with a local guide in remote tribal areas.", "Carry cash — ATMs are sparse outside Raipur."]
  ),
  mkState(
    "goa-india",
    "Goa",
    "🏖️",
    "Sun-soaked beaches, Portuguese churches, and seafood shacks.",
    "November – February",
    { stay: 14, food: 7, transport: 5, activities: 6 },
    [
      { name: "Palolem Beach", category: "Nature", why: "Crescent of palm-fringed sand in the chilled south.", free: true },
      { name: "Old Goa churches", category: "Landmark", why: "Basilica of Bom Jesus holds St. Francis Xavier's relics." },
      { name: "Anjuna Flea Market", category: "Culture", why: "Wednesdays — hippie-era bargaining ritual." },
      { name: "Dudhsagar Falls", category: "Nature", why: "310m four-tier falls reached by jeep + trek." },
      { name: "Goan fish thali", category: "Food", why: "Coconut-curry mackerel with rice and sol kadhi." }
    ],
    ["Rent a scooter (~₹400/day) — Goa's lifeblood.", "Avoid May–September unless you love rain."]
  ),
  mkState(
    "gujarat-india",
    "Gujarat",
    "🦁",
    "Vibrant textiles, Asiatic lions, and the white salt desert.",
    "November – February",
    { stay: 10, food: 5, transport: 4, activities: 5 },
    [
      { name: "Rann of Kutch (Rann Utsav)", category: "Nature", why: "Endless white salt desert under a full moon." },
      { name: "Gir National Park", category: "Adventure", why: "Only home of wild Asiatic lions." },
      { name: "Statue of Unity", category: "Landmark", why: "World's tallest statue at 182m." },
      { name: "Ahmedabad Old City heritage walk", category: "Culture", why: "UNESCO-listed pols, havelis and stepwells." },
      { name: "Gujarati thali", category: "Food", why: "Sweet-savoury feast with 15+ items." }
    ],
    ["Gujarat is dry — alcohol requires a permit.", "Rann Utsav (Nov–Feb) needs advance tent booking."]
  ),
  mkState(
    "haryana-india",
    "Haryana",
    "🌾",
    "Punjab-style food, Mughal gardens, and fields beside Delhi.",
    "October – March",
    { stay: 12, food: 5, transport: 5, activities: 4 },
    [
      { name: "Kurukshetra", category: "Culture", why: "Battlefield of the Mahabharata, with sacred tanks." },
      { name: "Sultanpur Bird Sanctuary", category: "Nature", why: "Migratory birds an hour from Delhi." },
      { name: "Pinjore Gardens", category: "Landmark", why: "Terraced 17th-century Mughal garden." },
      { name: "Sheikh Chilli's Tomb", category: "Landmark", why: "Persian-style monument near Thanesar." }
    ],
    ["Easy weekend escape from Delhi — combine with Chandigarh.", "Try kadhi-chawal at any roadside dhaba."]
  ),
  mkState(
    "himachal-pradesh-india",
    "Himachal Pradesh",
    "🏔️",
    "Pine forests, snow peaks, and easy-going hill towns.",
    "March – June, September – November",
    { stay: 10, food: 5, transport: 5, activities: 6 },
    [
      { name: "Shimla Mall Road", category: "Landmark", why: "Colonial promenade with toy-train arrival.", free: true },
      { name: "Manali & Solang Valley", category: "Adventure", why: "Paragliding, zorbing, and Rohtang views." },
      { name: "Spiti Valley", category: "Adventure", why: "Cold-desert monasteries above 3,500m." },
      { name: "Dharamshala & McLeod Ganj", category: "Culture", why: "Home of the Dalai Lama and Tibetan cafés." },
      { name: "Kasol & Parvati Valley", category: "Nature", why: "Riverside hippie hamlet and Israeli food." }
    ],
    ["Book buses to Manali / Spiti weeks ahead in summer.", "Spiti roads close Nov–April due to snow."]
  ),
  mkState(
    "jharkhand-india",
    "Jharkhand",
    "🌲",
    "Waterfalls, plateaus, and Adivasi culture off the tourist trail.",
    "October – March",
    { stay: 8, food: 3, transport: 4, activities: 3 },
    [
      { name: "Hundru Falls", category: "Nature", why: "98m drop on the Subarnarekha river." },
      { name: "Betla National Park", category: "Adventure", why: "Tigers, elephants, and a ruined fort inside." },
      { name: "Deoghar (Baidyanath Jyotirlinga)", category: "Culture", why: "One of the 12 Jyotirlingas of Shiva." },
      { name: "Netarhat hill station", category: "Nature", why: "'Queen of Chotanagpur' sunrise point." }
    ],
    ["Ranchi is the best base for road trips.", "Carry warm layers Nov–Jan — plateaus get cold."]
  ),
  mkState(
    "karnataka-india",
    "Karnataka",
    "🏯",
    "Ruined empires, coffee hills, and India's coolest tech capital.",
    "October – March",
    { stay: 12, food: 5, transport: 4, activities: 5 },
    [
      { name: "Hampi ruins", category: "Landmark", why: "UNESCO Vijayanagara empire ruins among boulders." },
      { name: "Mysore Palace", category: "Landmark", why: "Indo-Saracenic palace lit by 100,000 bulbs on Sundays." },
      { name: "Coorg coffee plantations", category: "Nature", why: "Misty homestays in the Western Ghats." },
      { name: "Gokarna beaches", category: "Nature", why: "Quieter, cliff-walled alternative to Goa.", free: true },
      { name: "Bengaluru café & craft-beer trail", category: "Food", why: "Filter coffee by day, microbreweries by night." }
    ],
    ["Hampi: rent a bicycle or scooter — ruins sprawl 25km².", "Coorg roads are tight; hire a driver."]
  ),
  mkState(
    "kerala-india",
    "Kerala",
    "🛶",
    "Backwaters, palm coast, and Ayurveda — God's own country.",
    "September – March",
    { stay: 13, food: 6, transport: 4, activities: 6 },
    [
      { name: "Alleppey backwater houseboat", category: "Nature", why: "Overnight on a kettuvallam through palm canals." },
      { name: "Munnar tea estates", category: "Nature", why: "Rolling green carpets at 1,600m." },
      { name: "Fort Kochi", category: "Culture", why: "Chinese fishing nets, Jew Town, and street art." },
      { name: "Periyar Wildlife Sanctuary", category: "Adventure", why: "Boat safari through elephant country." },
      { name: "Sadya banana-leaf feast", category: "Food", why: "26-dish vegetarian thali eaten with hands." }
    ],
    ["Houseboats are cheaper Mon–Thu and shoulder season.", "Try a 60-min Ayurvedic massage from ₹800."]
  ),
  mkState(
    "madhya-pradesh-india",
    "Madhya Pradesh",
    "🐅",
    "Heart of India — tiger reserves and erotic temple carvings.",
    "October – March",
    { stay: 9, food: 4, transport: 4, activities: 5 },
    [
      { name: "Khajuraho Temples", category: "Landmark", why: "10th-century carvings — UNESCO icon." },
      { name: "Bandhavgarh National Park", category: "Adventure", why: "Highest tiger density in India." },
      { name: "Sanchi Stupa", category: "Culture", why: "2,200-year-old Buddhist monument by Ashoka." },
      { name: "Orchha", category: "Landmark", why: "Forgotten Bundela palaces beside the Betwa river." },
      { name: "Bhimbetka rock shelters", category: "Culture", why: "Prehistoric paintings dating back 30,000 years." }
    ],
    ["Book tiger safari permits 4 months in advance.", "Khajuraho's western group is the must-see."]
  ),
  mkState(
    "maharashtra-india",
    "Maharashtra",
    "🏙️",
    "Mumbai's hustle, Ajanta caves, and Sahyadri trekking.",
    "October – March",
    { stay: 16, food: 6, transport: 5, activities: 6 },
    [
      { name: "Ajanta & Ellora Caves", category: "Landmark", why: "Buddhist, Hindu and Jain rock-cut wonder." },
      { name: "Gateway of India & Colaba", category: "Landmark", why: "Mumbai's iconic harbour arch.", free: true },
      { name: "Lonavala & Bhaja caves", category: "Nature", why: "Monsoon waterfalls 2h from Mumbai." },
      { name: "Tarkarli beaches", category: "Nature", why: "Crystal-clear water and scuba diving." },
      { name: "Vada pav street feast", category: "Food", why: "India's $0.20 sandwich icon." }
    ],
    ["Mumbai locals run everywhere — avoid 8–11am rush.", "Caves close Mondays — plan accordingly."]
  ),
  mkState(
    "manipur-india",
    "Manipur",
    "💃",
    "Floating lakes, classical dance, and lush valleys.",
    "October – March",
    { stay: 10, food: 5, transport: 5, activities: 4 },
    [
      { name: "Loktak Lake & phumdis", category: "Nature", why: "World's only floating national park." },
      { name: "Kangla Fort, Imphal", category: "Landmark", why: "Ancient Meitei royal citadel." },
      { name: "Ima Keithel (Mothers' Market)", category: "Culture", why: "Asia's largest all-women market.", free: true },
      { name: "Shirui Lily trek", category: "Adventure", why: "Endemic flower blooms each May." }
    ],
    ["Indian travellers need an Inner Line Permit.", "Imphal is the only practical base."]
  ),
  mkState(
    "meghalaya-india",
    "Meghalaya",
    "🌧️",
    "Living root bridges in the world's wettest forests.",
    "October – April",
    { stay: 10, food: 5, transport: 6, activities: 6 },
    [
      { name: "Double-decker root bridge, Nongriat", category: "Nature", why: "3,500-step trek to a 200-year-old living bridge." },
      { name: "Mawlynnong", category: "Culture", why: "'Asia's cleanest village' with sky-walk." },
      { name: "Cherrapunji & Nohkalikai Falls", category: "Nature", why: "India's tallest plunge waterfall." },
      { name: "Dawki river", category: "Nature", why: "Glass-clear water on the Bangladesh border." }
    ],
    ["Stay overnight in Nongriat — day trips are exhausting.", "October–April is driest; Sundays are quiet."]
  ),
  mkState(
    "mizoram-india",
    "Mizoram",
    "🎶",
    "Bamboo hills, Christian villages, and Sunday quiet.",
    "October – March",
    { stay: 9, food: 4, transport: 5, activities: 4 },
    [
      { name: "Aizawl viewpoints", category: "Nature", why: "City built along a knife-edge ridge.", free: true },
      { name: "Reiek Tlang trek", category: "Adventure", why: "Day-hike to a sacred peak with valley views." },
      { name: "Phawngpui (Blue Mountain)", category: "Nature", why: "Mizoram's highest peak in a national park." },
      { name: "Champhai vineyards", category: "Food", why: "Northeast India's surprise wine country." }
    ],
    ["Sundays nearly everything closes — plan around it.", "ILP required for Indians; PAP for foreigners."]
  ),
  mkState(
    "nagaland-india",
    "Nagaland",
    "🪶",
    "Tribal warrior heritage and the colourful Hornbill Festival.",
    "October – March",
    { stay: 11, food: 5, transport: 5, activities: 5 },
    [
      { name: "Hornbill Festival, Kisama", category: "Culture", why: "All 17 Naga tribes meet for 10 days each December." },
      { name: "Kohima War Cemetery", category: "Landmark", why: "Moving WWII memorial: 'When you go home…'" },
      { name: "Dzükou Valley trek", category: "Adventure", why: "Lily-carpeted valley straddling Manipur border." },
      { name: "Mon district Konyak villages", category: "Culture", why: "Last living tattooed headhunters." }
    ],
    ["Book Hornbill Festival accommodation by August.", "ILP required to enter Nagaland."]
  ),
  mkState(
    "odisha-india",
    "Odisha",
    "🛕",
    "Sun temples, tribal art, and a long unhurried coast.",
    "October – February",
    { stay: 9, food: 4, transport: 4, activities: 4 },
    [
      { name: "Konark Sun Temple", category: "Landmark", why: "13th-century chariot of the Sun god — UNESCO." },
      { name: "Jagannath Temple, Puri", category: "Culture", why: "One of the four Char Dham pilgrimage sites." },
      { name: "Chilika Lake", category: "Nature", why: "Asia's largest brackish lagoon — flamingos & dolphins." },
      { name: "Udayagiri & Khandagiri caves", category: "Landmark", why: "2nd-century BC Jain rock-cut cells." },
      { name: "Pakhala bhata", category: "Food", why: "Fermented rice in water — cooling summer staple." }
    ],
    ["Puri beach is best at sunrise.", "Combine Konark + Puri + Bhubaneswar in a 'Golden Triangle'."]
  ),
  mkState(
    "punjab-india",
    "Punjab",
    "🌾",
    "Golden Temple, hearty food, and big-hearted hospitality.",
    "October – March",
    { stay: 11, food: 6, transport: 5, activities: 4 },
    [
      { name: "Golden Temple, Amritsar", category: "Culture", why: "Sikhism's holiest shrine — free langar for all.", free: true },
      { name: "Wagah Border Ceremony", category: "Culture", why: "Theatrical India–Pakistan flag-lowering at sunset.", free: true },
      { name: "Jallianwala Bagh", category: "Landmark", why: "1919 massacre memorial beside Golden Temple.", free: true },
      { name: "Amritsari kulcha + lassi", category: "Food", why: "Stuffed flatbread and a sweet yoghurt drink." }
    ],
    ["Cover head and remove shoes at the Golden Temple.", "Reach Wagah by 4pm to grab a seat."]
  ),
  mkState(
    "sikkim-india",
    "Sikkim",
    "🏔️",
    "Kanchenjunga views, monasteries, and India's first organic state.",
    "March – May, October – December",
    { stay: 12, food: 6, transport: 6, activities: 6 },
    [
      { name: "Tsomgo Lake", category: "Nature", why: "Glacial lake at 3,750m — frozen in winter." },
      { name: "Rumtek Monastery", category: "Culture", why: "Seat of the Karmapa, with a golden stupa." },
      { name: "Goecha La trek", category: "Adventure", why: "Classic 10-day trek to a Kanchenjunga viewpoint." },
      { name: "Pelling sunrise on Kanchenjunga", category: "Nature", why: "World's third-highest peak from your balcony.", free: true },
      { name: "Yak cheese & momos in Gangtok", category: "Food", why: "Tibetan-Nepali highland comfort food." }
    ],
    ["Permits needed for Tsomgo and North Sikkim.", "April rhododendrons in Yumthang are unreal."]
  ),
  mkState(
    "tamil-nadu-india",
    "Tamil Nadu",
    "🛕",
    "Towering temples, classical dance, and Coromandel beaches.",
    "November – February",
    { stay: 10, food: 4, transport: 4, activities: 5 },
    [
      { name: "Meenakshi Temple, Madurai", category: "Landmark", why: "14 gopurams covered in 33,000 painted figures." },
      { name: "Mahabalipuram shore temples", category: "Landmark", why: "7th-century rock-cut UNESCO site by the sea." },
      { name: "Ooty & Nilgiri Mountain Railway", category: "Nature", why: "Toy train through eucalyptus and tea." },
      { name: "Pondicherry French Quarter", category: "Culture", why: "Mustard-yellow villas and croissants." },
      { name: "Chettinad mutton curry", category: "Food", why: "Pepper-fennel masterpiece from the south-east." }
    ],
    ["Carry a sarong to cover legs at temples.", "Avoid coastal Tamil Nadu Oct–Nov cyclone window."]
  ),
  mkState(
    "telangana-india",
    "Telangana",
    "🍛",
    "Hyderabadi heritage, biryani, and rocky Deccan landscapes.",
    "October – February",
    { stay: 11, food: 5, transport: 4, activities: 4 },
    [
      { name: "Charminar & Old City", category: "Landmark", why: "16th-century four-arch icon and bangle bazaars." },
      { name: "Golconda Fort", category: "Landmark", why: "Diamond-trade citadel with epic acoustics." },
      { name: "Ramoji Film City", category: "Culture", why: "World's largest film studio complex." },
      { name: "Warangal Thousand Pillar Temple", category: "Landmark", why: "12th-century Kakatiya masterpiece." },
      { name: "Hyderabadi dum biryani", category: "Food", why: "Slow-cooked saffron-rich classic." }
    ],
    ["Eat biryani at Paradise, Bawarchi or Shadab.", "Best biryani is dinner-time fresh."]
  ),
  mkState(
    "tripura-india",
    "Tripura",
    "🏯",
    "Royal palaces and rock-cut sculptures in the deep northeast.",
    "October – March",
    { stay: 8, food: 4, transport: 4, activities: 3 },
    [
      { name: "Ujjayanta Palace, Agartala", category: "Landmark", why: "Indo-Saracenic former royal residence." },
      { name: "Neermahal", category: "Landmark", why: "'Lake palace' on Rudrasagar lake." },
      { name: "Unakoti rock carvings", category: "Culture", why: "7th-century Shaiva rock reliefs in jungle." },
      { name: "Jampui Hills", category: "Nature", why: "Orange orchards and Mizo hill villages." }
    ],
    ["Agartala is well-connected by direct flights from Kolkata.", "Pack mosquito repellent year-round."]
  ),
  mkState(
    "uttar-pradesh-india",
    "Uttar Pradesh",
    "🕌",
    "Taj Mahal, sacred Varanasi ghats, and Mughal grandeur.",
    "October – March",
    { stay: 10, food: 4, transport: 4, activities: 5 },
    [
      { name: "Taj Mahal, Agra", category: "Landmark", why: "Mughal marble mausoleum — bucket-list icon." },
      { name: "Varanasi ghats & Ganga aarti", category: "Culture", why: "World's oldest living city at sunrise.", free: true },
      { name: "Fatehpur Sikri", category: "Landmark", why: "Ghost capital of Akbar — UNESCO red sandstone city." },
      { name: "Bara Imambara, Lucknow", category: "Landmark", why: "Vaulted hall and the famous Bhulbhulaiya maze." },
      { name: "Awadhi tunday kebab", category: "Food", why: "Lucknow's melt-in-mouth minced-meat patty." }
    ],
    ["Visit Taj at sunrise — fewer crowds, soft light.", "Fridays the Taj is closed."]
  ),
  mkState(
    "uttarakhand-india",
    "Uttarakhand",
    "🏔️",
    "Char Dham pilgrimage, Himalayan treks, and yoga capital Rishikesh.",
    "March – June, September – November",
    { stay: 10, food: 5, transport: 5, activities: 6 },
    [
      { name: "Rishikesh & the Ganga", category: "Adventure", why: "Yoga ashrams, white-water rafting and the Beatles Ashram." },
      { name: "Valley of Flowers trek", category: "Nature", why: "UNESCO alpine bloom — open July–September." },
      { name: "Jim Corbett National Park", category: "Adventure", why: "India's oldest tiger reserve." },
      { name: "Kedarnath & Badrinath", category: "Culture", why: "Two of the four Char Dham high-altitude shrines." },
      { name: "Nainital lake town", category: "Nature", why: "Boating beneath pine-clad hills." }
    ],
    ["Char Dham yatra requires advance registration.", "Carry warm layers above 2,500m even in summer."]
  ),
  mkState(
    "west-bengal-india",
    "West Bengal",
    "🎭",
    "Colonial Kolkata, Darjeeling tea, and Sundarbans mangroves.",
    "October – March",
    { stay: 11, food: 5, transport: 4, activities: 5 },
    [
      { name: "Victoria Memorial, Kolkata", category: "Landmark", why: "White-marble British-era monument in green parkland." },
      { name: "Darjeeling Toy Train", category: "Nature", why: "UNESCO narrow-gauge through tea estates." },
      { name: "Sundarbans National Park", category: "Adventure", why: "Mangrove tigers and crocodiles by boat." },
      { name: "Kalighat & Dakshineswar temples", category: "Culture", why: "Two of Bengal's most sacred Kali shrines." },
      { name: "Bengali fish thali", category: "Food", why: "Mustard hilsa, posto, and rosogolla finale." }
    ],
    ["Tiger Hill sunrise needs a 4am start from Darjeeling.", "Sundarbans best Nov–Feb — book a 2-day boat tour."]
  )
];
destinations.push(...indianStates);
const getDestination = (slug) => destinations.find((d) => d.slug === slug);
const blogPosts = [
  {
    slug: "top-10-places-to-visit-in-rajasthan",
    title: "Top 10 Places to Visit in Rajasthan (2026 Guide)",
    description: "Discover the top 10 places to visit in Rajasthan — from Jaipur's pink palaces to Jaisalmer's golden dunes. Budget tips, itineraries & must-see attractions.",
    keywords: [
      "places to visit in Rajasthan",
      "Rajasthan tourism",
      "Jaipur travel guide",
      "Udaipur lake palace",
      "Jaisalmer desert safari",
      "Rajasthan trip plan",
      "best time to visit Rajasthan",
      "Rajasthan budget travel"
    ],
    date: "2026-05-03",
    readMins: 9,
    cover: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80",
    excerpt: "Forts, palaces, dunes and bazaars — here are the 10 unmissable Rajasthan destinations and exactly how to plan your trip on a budget."
  }
];
const SITE$1 = "https://wandr-wisely.lovable.app";
const Route$a = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const staticPaths = ["/", "/explore", "/attractions", "/plan", "/estimate", "/about", "/blog"];
        const destPaths = destinations.map((d) => `/explore?q=${encodeURIComponent(d.slug)}`);
        const blogPaths = blogPosts.map((p) => `/blog/${p.slug}`);
        const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const urls = [...staticPaths, ...destPaths, ...blogPaths].map(
          (p) => `  <url><loc>${SITE$1}${p}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>`
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" }
        });
      }
    }
  }
});
const SITE = "https://wandr-wisely.lovable.app";
const Route$9 = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        const body = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;
        return new Response(body, {
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      }
    }
  }
});
var zodValidator = (options) => {
  const input = "input" in options ? options.input : "input";
  const output = "output" in options ? options.output : "output";
  const _input = "schema" in options ? options.schema._input : options._input;
  const _output = "schema" in options ? options.schema._output : options._output;
  return {
    types: {
      input: input === "output" ? _output : _input,
      output: output === "input" ? _input : _output
    },
    parse: (input2) => "schema" in options ? options.schema.parse(input2) : options.parse(input2)
  };
};
var fallback = (schema, fallback2) => {
  return custom().pipe(schema.catch(fallback2));
};
const $$splitComponentImporter$7 = () => import("./plan-D8lV35Lh.js");
const searchSchema$1 = objectType({
  destination: fallback(stringType(), "").default("")
});
const Route$8 = createFileRoute("/plan")({
  validateSearch: zodValidator(searchSchema$1),
  head: () => ({
    meta: [{
      title: "AI Trip Planner · Wandr"
    }, {
      name: "description",
      content: "Generate a personalized AI itinerary for any destination — tuned to your budget, style, and what you actually love doing."
    }, {
      property: "og:title",
      content: "AI Trip Planner · Wandr"
    }, {
      property: "og:description",
      content: "Generate a day-by-day AI itinerary tuned to your style and budget."
    }],
    links: [{
      rel: "canonical",
      href: "https://wandr-wisely.lovable.app/plan"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [{
          "@type": "Question",
          name: "How quickly will I get my itinerary?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Instantly after payment! Your full day-by-day plan is unlocked the moment your Razorpay checkout completes."
          }
        }, {
          "@type": "Question",
          name: "What if I don't like my itinerary?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "100% money back guarantee — no questions asked. Just email us within 7 days and we'll refund you in full."
          }
        }, {
          "@type": "Question",
          name: "Can I plan trips outside Rajasthan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! We cover all of India — from Kerala backwaters to Ladakh, Goa to the North-East."
          }
        }, {
          "@type": "Question",
          name: "Which plan should I choose?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Standard Plan is our most popular choice — perfect balance of features and price for week-long trips."
          }
        }, {
          "@type": "Question",
          name: "Is my payment secure?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! All payments are securely processed by Razorpay with bank-grade encryption. We never see your card details."
          }
        }, {
          "@type": "Question",
          name: "Can I modify my itinerary?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Standard plan includes 2 free revisions. Premium plan includes 5 revisions plus WhatsApp support."
          }
        }]
      })
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const Route$7 = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () => {
        const blogLinks = blogPosts.map((p) => `- [${p.title}](/blog/${p.slug}): ${p.description}`).join("\n");
        const body = `# Wandr Wisely

> Friendly travel companion for curious travelers — discover famous places worldwide and plan unforgettable trips on a tight budget.

Wandr Wisely curates 25 hand-picked destinations with realistic daily costs, budget-first tips, and an AI trip planner that builds day-by-day itineraries tuned to your style and budget. Paid plans (Basic/Standard/Premium) unlock the full multi-day itinerary, packing list, insider tips and PDF export.

## Pages

- [Home](/): Discover famous places and plan trips on a budget.
- [Explore destinations](/explore): Browse 25 curated cities and countries with budget breakdowns.
- [Attractions](/attractions): Top sights filtered by city, country and category.
- [AI Trip Planner](/plan): Generate a day-by-day itinerary tuned to your style and budget.
- [Estimate cost](/estimate): Realistic daily-cost estimator for any destination.
- [About](/about): Why Wandr exists and how we curate.
- [Blog](/blog): Honest travel guides and budget tips.

## Blog posts

${blogLinks}
`;
        return new Response(body, {
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      }
    }
  }
});
const $$splitComponentImporter$6 = () => import("./explore-UgHeR8Ao.js");
const searchSchema = objectType({
  q: fallback(stringType(), "").default("")
});
const Route$6 = createFileRoute("/explore")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [{
      title: "Explore destinations · Wandr"
    }, {
      name: "description",
      content: "Browse 25 hand-picked destinations across the world. See top places, costs, and travel tips at a glance."
    }, {
      property: "og:title",
      content: "Explore destinations · Wandr"
    }, {
      property: "og:description",
      content: "Browse hand-picked destinations across the world."
    }],
    links: [{
      rel: "canonical",
      href: "https://wandr-wisely.lovable.app/explore"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./estimate-DcoBH1NW.js");
const Route$5 = createFileRoute("/estimate")({
  head: () => ({
    meta: [{
      title: "Trip cost estimator · Wandr"
    }, {
      name: "description",
      content: "Estimate the daily and total cost of your trip with a clear breakdown of stay, food, transport and activities."
    }, {
      property: "og:title",
      content: "Trip cost estimator · Wandr"
    }, {
      property: "og:description",
      content: "See exactly what your trip will cost — and how to spend less."
    }],
    links: [{
      rel: "canonical",
      href: "https://wandr-wisely.lovable.app/estimate"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./attractions-n3EGUHA_.js");
const Route$4 = createFileRoute("/attractions")({
  head: () => ({
    meta: [{
      title: "Top attractions worldwide · Wandr"
    }, {
      name: "description",
      content: "Browse iconic landmarks, museums, food spots, and hidden gems across 30+ cities. Book tours and hotels in one click."
    }, {
      property: "og:title",
      content: "Top attractions worldwide · Wandr"
    }, {
      property: "og:description",
      content: "Iconic landmarks, museums, and food spots across 30+ cities."
    }],
    links: [{
      rel: "canonical",
      href: "https://wandr-wisely.lovable.app/attractions"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./about-BXfoblPn.js");
const Route$3 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About Wandr — travel further on less"
    }, {
      name: "description",
      content: "Wandr is a friendly travel companion that helps curious travelers discover great places and plan trips on a tight budget."
    }, {
      property: "og:title",
      content: "About Wandr — travel further on less"
    }, {
      property: "og:description",
      content: "A friendly travel companion for curious travelers on a tight budget."
    }],
    links: [{
      rel: "canonical",
      href: "https://wandr-wisely.lovable.app/about"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-BGWJ26zD.js");
const Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Wandr — Travel Further. Spend Less."
    }, {
      name: "description",
      content: "Curated journeys, intelligent itineraries, and budgets that breathe. Wandr is your luxury-minded travel companion for the modern explorer."
    }, {
      property: "og:title",
      content: "Wandr — Travel Further. Spend Less."
    }, {
      property: "og:description",
      content: "Curated journeys and intelligent itineraries for the modern explorer."
    }],
    links: [{
      rel: "canonical",
      href: "https://wandr-wisely.lovable.app/"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Wandr",
        url: "https://wandr-wisely.lovable.app",
        description: "Discover famous places and plan trips on a budget.",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://wandr-wisely.lovable.app/explore?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      })
    }, {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Wandr Wisely",
        url: "https://wandr-wisely.lovable.app",
        logo: "https://wandr-wisely.lovable.app/favicon.ico"
      })
    }, {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [{
          "@type": "Question",
          name: "How quickly will I get my itinerary?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Instantly after payment! Your full day-by-day plan is unlocked the moment your Razorpay checkout completes."
          }
        }, {
          "@type": "Question",
          name: "What if I don't like my itinerary?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "100% money back guarantee — no questions asked. Just email us within 7 days and we'll refund you in full."
          }
        }, {
          "@type": "Question",
          name: "Can I plan trips outside Rajasthan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! We cover all of India — from Kerala backwaters to Ladakh, Goa to the North-East."
          }
        }, {
          "@type": "Question",
          name: "Which plan should I choose?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Standard Plan is our most popular choice — perfect balance of features and price for week-long trips."
          }
        }, {
          "@type": "Question",
          name: "Is my payment secure?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! All payments are securely processed by Razorpay with bank-grade encryption. We never see your card details."
          }
        }, {
          "@type": "Question",
          name: "Can I modify my itinerary?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Standard plan includes 2 free revisions. Premium plan includes 5 revisions plus WhatsApp support."
          }
        }]
      })
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./blog.index-BxdD7kFv.js");
const Route$1 = createFileRoute("/blog/")({
  head: () => ({
    meta: [{
      title: "Travel Blog — Wandr Wisely"
    }, {
      name: "description",
      content: "Honest travel guides, budget tips and itineraries from Wandr Wisely. Plan smarter, travel further."
    }, {
      property: "og:title",
      content: "Travel Blog — Wandr Wisely"
    }, {
      property: "og:description",
      content: "Honest travel guides, budget tips and itineraries."
    }, {
      property: "og:url",
      content: "https://wandr-wisely.lovable.app/blog"
    }],
    links: [{
      rel: "canonical",
      href: "https://wandr-wisely.lovable.app/blog"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./blog._slug-Dehbicw0.js");
const $$splitErrorComponentImporter = () => import("./blog._slug-B_sdWJ6L.js");
const $$splitNotFoundComponentImporter = () => import("./blog._slug-BH8YVYjA.js");
const Route2 = createFileRoute("/blog/$slug")({
  loader: ({
    params
  }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return {
      post
    };
  },
  head: ({
    loaderData
  }) => {
    const post = loaderData?.post;
    if (!post) return {
      meta: [{
        title: "Article — Wandr Wisely"
      }]
    };
    const url = `https://wandr-wisely.lovable.app/blog/${post.slug}`;
    return {
      meta: [{
        title: post.title
      }, {
        name: "description",
        content: post.description
      }, {
        name: "keywords",
        content: post.keywords.join(", ")
      }, {
        property: "og:type",
        content: "article"
      }, {
        property: "og:title",
        content: post.title
      }, {
        property: "og:description",
        content: post.description
      }, {
        property: "og:image",
        content: post.cover
      }, {
        property: "og:url",
        content: url
      }, {
        name: "twitter:card",
        content: "summary_large_image"
      }, {
        name: "twitter:title",
        content: post.title
      }, {
        name: "twitter:description",
        content: post.description
      }, {
        name: "twitter:image",
        content: post.cover
      }],
      links: [{
        rel: "canonical",
        href: url
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          image: [post.cover],
          datePublished: post.date,
          author: {
            "@type": "Organization",
            name: "Wandr Wisely"
          },
          publisher: {
            "@type": "Organization",
            name: "Wandr Wisely"
          },
          mainEntityOfPage: url,
          keywords: post.keywords.join(", ")
        })
      }]
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SitemapDotxmlRoute = Route$a.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$b
});
const RobotsDottxtRoute = Route$9.update({
  id: "/robots.txt",
  path: "/robots.txt",
  getParentRoute: () => Route$b
});
const PlanRoute = Route$8.update({
  id: "/plan",
  path: "/plan",
  getParentRoute: () => Route$b
});
const LlmsDottxtRoute = Route$7.update({
  id: "/llms.txt",
  path: "/llms.txt",
  getParentRoute: () => Route$b
});
const ExploreRoute = Route$6.update({
  id: "/explore",
  path: "/explore",
  getParentRoute: () => Route$b
});
const EstimateRoute = Route$5.update({
  id: "/estimate",
  path: "/estimate",
  getParentRoute: () => Route$b
});
const AttractionsRoute = Route$4.update({
  id: "/attractions",
  path: "/attractions",
  getParentRoute: () => Route$b
});
const AboutRoute = Route$3.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const BlogIndexRoute = Route$1.update({
  id: "/blog/",
  path: "/blog/",
  getParentRoute: () => Route$b
});
const BlogSlugRoute = Route2.update({
  id: "/blog/$slug",
  path: "/blog/$slug",
  getParentRoute: () => Route$b
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AttractionsRoute,
  EstimateRoute,
  ExploreRoute,
  LlmsDottxtRoute,
  PlanRoute,
  RobotsDottxtRoute,
  SitemapDotxmlRoute,
  BlogSlugRoute,
  BlogIndexRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Link as L,
  Route$8 as R,
  Route$6 as a,
  blogPosts as b,
  Route2 as c,
  destinations as d,
  getDestination as g,
  router as r
};
