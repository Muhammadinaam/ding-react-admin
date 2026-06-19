import { Children as e, createContext as t, createElement as n, isValidElement as r, useCallback as i, useContext as a, useEffect as o, useMemo as s, useRef as c, useState as l } from "react";
import { Link as u, Navigate as d, Outlet as f, RouterProvider as p, createBrowserRouter as m, useLocation as h, useNavigate as g, useParams as _, useSearchParams as v } from "react-router-dom";
import { App as y, Avatar as b, Button as x, Card as S, ConfigProvider as C, DatePicker as w, Drawer as ee, Dropdown as T, Flex as E, Form as D, Grid as O, Input as k, InputNumber as A, Layout as j, Menu as M, Modal as te, Popover as N, Segmented as P, Select as F, Space as I, Spin as L, Steps as ne, Switch as re, Table as ie, Tabs as ae, Typography as R, theme as z } from "antd";
import { Fragment as B, jsx as V, jsxs as H } from "react/jsx-runtime";
import { ArrowLeftOutlined as oe, CaretDownOutlined as se, CaretUpOutlined as ce, ColumnHeightOutlined as U, DesktopOutlined as le, LayoutOutlined as ue, LogoutOutlined as de, MenuOutlined as fe, MoonOutlined as pe, SettingOutlined as me, SunOutlined as he, UserOutlined as ge } from "@ant-design/icons";
import { Controller as _e, FormProvider as ve, useFieldArray as ye, useForm as be, useFormContext as W, useFormState as G, useWatch as xe } from "react-hook-form";
import Se from "dayjs";
//#region src/context/AppThemeProvider.tsx
var Ce = t(null);
function we(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "light" || t === "dark" || t === "system") return t;
	} catch {}
	return "system";
}
function Te() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function Ee(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "comfortable" || t === "compact") return t;
	} catch {}
	return "comfortable";
}
var De = "ding-react-admin-theme-mode", Oe = "ding-react-admin-theme-density";
function ke({ children: e, modeStorageKey: t = De, densityStorageKey: n = Oe }) {
	let [r, i] = l(() => we(t)), [a, c] = l(() => Ee(n)), [u, d] = l(Te);
	o(() => {
		if (r !== "system") return;
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = () => d(e.matches);
		return t(), e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, [r]);
	let f = (e) => {
		i(e);
		try {
			localStorage.setItem(t, e);
		} catch {}
	}, p = (e) => {
		c(e);
		try {
			localStorage.setItem(n, e);
		} catch {}
	}, m = r === "system" ? u ? "dark" : "light" : r, h = s(() => {
		let e = m === "dark" ? z.darkAlgorithm : z.defaultAlgorithm;
		return { algorithm: a === "compact" ? [e, z.compactAlgorithm] : e };
	}, [m, a]), g = s(() => ({
		mode: r,
		setMode: f,
		resolved: m,
		density: a,
		setDensity: p
	}), [
		r,
		m,
		a,
		f,
		p
	]);
	return /* @__PURE__ */ V(Ce.Provider, {
		value: g,
		children: /* @__PURE__ */ V(C, {
			theme: h,
			children: e
		})
	});
}
function Ae() {
	let e = a(Ce);
	if (!e) throw Error("useThemeMode must be used within AppThemeProvider");
	return e;
}
//#endregion
//#region src/components/DensitySwitch.tsx
var je = [{
	label: "Comfortable",
	value: "comfortable",
	icon: /* @__PURE__ */ V(ue, {})
}, {
	label: "Compact",
	value: "compact",
	icon: /* @__PURE__ */ V(U, {})
}];
function Me() {
	let { density: e, setDensity: t } = Ae();
	return /* @__PURE__ */ V(P, {
		size: "small",
		value: e,
		options: je,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeSwitch.tsx
var Ne = [
	{
		label: "Light",
		value: "light",
		icon: /* @__PURE__ */ V(he, {})
	},
	{
		label: "Dark",
		value: "dark",
		icon: /* @__PURE__ */ V(pe, {})
	},
	{
		label: "Auto",
		value: "system",
		icon: /* @__PURE__ */ V(le, {})
	}
];
function Pe() {
	let { mode: e, setMode: t } = Ae();
	return /* @__PURE__ */ V(P, {
		size: "small",
		value: e,
		options: Ne,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeToolbar.tsx
function Fe() {
	let { token: e } = z.useToken();
	return /* @__PURE__ */ V(N, {
		placement: O.useBreakpoint().lg ? "bottomRight" : "bottom",
		trigger: "click",
		content: /* @__PURE__ */ H(I, {
			orientation: "vertical",
			size: "middle",
			style: {
				minWidth: 240,
				maxWidth: "min(92vw, 320px)"
			},
			children: [/* @__PURE__ */ V(Pe, {}), /* @__PURE__ */ V(Me, {})]
		}),
		styles: { content: { padding: e.paddingSM } },
		children: /* @__PURE__ */ V(x, {
			type: "default",
			icon: /* @__PURE__ */ V(me, {}),
			"aria-label": "Display and theme settings"
		})
	});
}
//#endregion
//#region src/context/AuthProvider.tsx
var Ie = t(null);
function Le({ children: e, adapter: t }) {
	let [n, r] = l(() => t.getToken()), a = i(async (e) => {
		await t.login(e), r(t.getToken());
	}, [t]), o = i(() => {
		t.logout(), r(t.getToken());
	}, [t]), c = s(() => ({
		isAuthenticated: !!n,
		login: a,
		logout: o
	}), [
		n,
		a,
		o
	]);
	return /* @__PURE__ */ V(Ie.Provider, {
		value: c,
		children: e
	});
}
function Re() {
	let e = a(Ie);
	if (!e) throw Error("useAuth must be used within AuthProvider");
	return e;
}
var ze = "ding-react-admin-auth";
function Be(e = ze) {
	return {
		async login({ username: t, password: n }) {
			if (!t.trim() || !n) throw Error("Invalid credentials");
			sessionStorage.setItem(e, "1");
		},
		logout() {
			sessionStorage.removeItem(e);
		},
		getToken() {
			return sessionStorage.getItem(e);
		}
	};
}
//#endregion
//#region src/context/PermissionsProvider.tsx
var Ve = t(null);
function He({ children: e, can: t }) {
	let n = s(() => t, [t]);
	return /* @__PURE__ */ V(Ve.Provider, {
		value: n,
		children: e
	});
}
function K() {
	let e = a(Ve);
	if (!e) throw Error("usePermissions must be used within PermissionsProvider");
	return e;
}
function Ue(e) {
	return (t) => e()?.includes(t) ?? !1;
}
function We(e) {
	let t = K();
	return i(() => t(e), [t, e]);
}
//#endregion
//#region src/permissions/resourcePermissions.ts
function q(e, t, n) {
	if (!t) return !0;
	let r = t[n];
	return n === "read" && !r && (r = t.list), r ? e(r) : !1;
}
function Ge(e, t) {
	return e.map((e) => {
		if (e.children?.length) {
			let n = Ge(e.children, t);
			return n.length === 0 ? null : {
				...e,
				children: n
			};
		}
		return e.permission && !t(e.permission) ? null : e;
	}).filter((e) => e !== null);
}
//#endregion
//#region src/layouts/AdminLayout.tsx
var Ke = "#001529", qe = "ding-react-admin-sider-collapsed";
function Je(e) {
	try {
		return localStorage.getItem(e) === "1";
	} catch {
		return !1;
	}
}
function Ye() {
	return O.useBreakpoint().lg !== !0;
}
function Xe(e) {
	let t = /* @__PURE__ */ new Set();
	function n(e) {
		for (let r of e) r.children?.length ? n(r.children) : t.add(r.path);
	}
	return n(e), t;
}
function Ze(e, t) {
	function n(e) {
		for (let r of e) if (r.children?.length) {
			let e = n(r.children);
			if (e !== null) return [r.path, ...e];
		} else if (r.path === t) return [];
		return null;
	}
	return n(e) ?? [];
}
function Qe(e) {
	return e.map((e) => {
		let t = e.Icon, n = t ? /* @__PURE__ */ V(t, {}) : void 0;
		return e.children?.length ? {
			key: e.path,
			icon: n,
			label: e.label,
			children: Qe(e.children)
		} : {
			key: e.path,
			icon: n,
			label: e.label
		};
	});
}
function $e({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a }) {
	return /* @__PURE__ */ V(M, {
		mode: "inline",
		theme: "dark",
		inlineCollapsed: n,
		selectedKeys: t,
		...!n && r !== void 0 && i ? {
			openKeys: r,
			onOpenChange: i
		} : {},
		items: e,
		onClick: ({ key: e }) => a(e),
		style: {
			background: "transparent",
			borderInlineEnd: "none"
		}
	});
}
function et({ navItems: e, brand: t = "Admin", collapsedBrand: n = "A", mobileDrawerTitle: r, headerExtras: a, userMenuItems: c, onUserMenuClick: u, loginPath: d = "/login", siderCollapsedStorageKey: p = qe }) {
	let m = g(), _ = h(), { resolved: v } = Ae(), y = v === "dark", { logout: S } = Re(), C = K(), [w, E] = l(() => Je(p)), [D, O] = l(!1), k = Ye(), { token: A } = z.useToken(), M = r ?? t, te = () => {
		S(), m(d, { replace: !0 });
	}, N = i((e) => {
		E(e);
		try {
			localStorage.setItem(p, e ? "1" : "0");
		} catch {}
	}, [p]);
	o(() => {
		k || O(!1);
	}, [k]), o(() => {
		O(!1);
	}, [_.pathname]);
	let P = s(() => Ge(e, C), [e, C]), F = s(() => Xe(P), [P]), I = s(() => Qe(P), [P]), L = s(() => Ze(P, _.pathname), [P, _.pathname]), [ne, re] = l(() => Ze(P, _.pathname));
	o(() => {
		re((e) => [...new Set([...e, ...L])]);
	}, [L]);
	let ie = i((e) => {
		re(e);
	}, []), ae = s(() => [{
		key: "logout",
		icon: /* @__PURE__ */ V(de, {}),
		label: "Log out",
		danger: !0
	}], []), B = c ?? ae, oe = (e) => {
		if (u) {
			u(e);
			return;
		}
		e.key === "logout" && te();
	}, se = y ? A.colorBgContainer : Ke, ce = [_.pathname], U = (e) => {
		F.has(e) && (m(e), k && O(!1));
	};
	return /* @__PURE__ */ H(j, {
		style: {
			minHeight: "100vh",
			width: "100%",
			background: A.colorBgLayout
		},
		children: [
			!k && /* @__PURE__ */ H(j.Sider, {
				collapsible: !0,
				collapsed: w,
				onCollapse: N,
				collapsedWidth: 64,
				style: {
					background: se,
					borderInlineEnd: y ? `1px solid ${A.colorSplit}` : void 0
				},
				children: [/* @__PURE__ */ V("div", {
					style: {
						height: 64,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontWeight: 600
					},
					children: /* @__PURE__ */ V(R.Text, {
						strong: !0,
						style: { color: A.colorTextLightSolid },
						children: w ? n : t
					})
				}), /* @__PURE__ */ V($e, {
					menuItems: I,
					selectedKeys: ce,
					inlineCollapsed: w,
					openKeys: ne,
					onOpenChange: ie,
					onNavigate: U
				})]
			}),
			k && /* @__PURE__ */ V(ee, {
				title: /* @__PURE__ */ V(R.Text, {
					strong: !0,
					style: { color: A.colorTextLightSolid },
					children: M
				}),
				placement: "left",
				size: 280,
				onClose: () => O(!1),
				open: D,
				styles: {
					header: {
						background: se,
						borderBottom: `1px solid ${A.colorSplit}`
					},
					body: {
						padding: 0,
						background: se
					}
				},
				destroyOnHidden: !0,
				children: /* @__PURE__ */ V($e, {
					menuItems: I,
					selectedKeys: ce,
					inlineCollapsed: !1,
					openKeys: ne,
					onOpenChange: ie,
					onNavigate: U
				})
			}),
			/* @__PURE__ */ H(j, {
				style: { minWidth: 0 },
				children: [/* @__PURE__ */ H(j.Header, {
					style: {
						background: A.colorBgContainer,
						paddingInline: A.paddingLG,
						display: "flex",
						alignItems: "center",
						gap: A.marginSM,
						lineHeight: "normal"
					},
					children: [
						k && /* @__PURE__ */ V(x, {
							type: "text",
							icon: /* @__PURE__ */ V(fe, {}),
							onClick: () => O(!0),
							"aria-label": "Open navigation"
						}),
						/* @__PURE__ */ V("div", { style: {
							flex: 1,
							minWidth: 0
						} }),
						a,
						/* @__PURE__ */ V(Fe, {}),
						/* @__PURE__ */ V(T, {
							menu: {
								items: B,
								onClick: oe
							},
							trigger: ["click"],
							children: /* @__PURE__ */ H(x, {
								type: "text",
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: A.marginXS,
									maxWidth: k ? 44 : void 0,
									paddingInline: k ? A.paddingXS : void 0
								},
								"aria-label": "Account menu",
								children: [/* @__PURE__ */ V(b, {
									size: "small",
									icon: /* @__PURE__ */ V(ge, {})
								}), !k && /* @__PURE__ */ V(R.Text, {
									type: "secondary",
									children: "User"
								})]
							})
						})
					]
				}), /* @__PURE__ */ V(j.Content, {
					style: {
						margin: k ? A.marginSM : A.marginLG,
						minWidth: 0
					},
					children: /* @__PURE__ */ V(f, {})
				})]
			})
		]
	});
}
//#endregion
//#region src/router/guards.tsx
function tt({ when: e, redirect: t, children: n }) {
	return e ? n : /* @__PURE__ */ V(d, {
		to: t,
		replace: !0
	});
}
function nt({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = Re();
	return /* @__PURE__ */ V(tt, {
		when: n,
		redirect: t,
		children: e
	});
}
function rt({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = Re();
	return /* @__PURE__ */ V(tt, {
		when: !n,
		redirect: t,
		children: e
	});
}
function it({ permission: e, redirect: t, children: n }) {
	return /* @__PURE__ */ V(tt, {
		when: K()(e),
		redirect: t,
		children: n
	});
}
//#endregion
//#region src/router/routeAccess.ts
function at(e) {
	return e.access ?? "protected";
}
function ot(e) {
	let t = [], n = [], r = [];
	for (let i of e) {
		let e = at(i);
		e === "guest" ? t.push(i) : e === "public" ? n.push(i) : r.push(i);
	}
	return {
		guest: t,
		public: n,
		protected: r
	};
}
function st(e) {
	return e.replace(/^\/+/, "");
}
function ct(e) {
	return `/${st(e)}`;
}
function lt(e, t) {
	let { guest: n, protected: r } = ot(e), i = n.find((e) => "path" in e && e.path), a = r.find((e) => "index" in e && e.index), o = r.find((e) => "path" in e && e.path), s = t?.unauthenticated;
	!s && i && "path" in i && i.path && (s = ct(i.path));
	let c = t?.afterLogin;
	if (c || (a ? c = "/" : o && "path" in o && o.path && (c = ct(o.path))), r.length > 0 && !s) throw Error("createAdminRouter: protected routes require redirects.unauthenticated or a guest route (access: \"guest\").");
	if (n.length > 0 && !c) throw Error("createAdminRouter: guest routes require redirects.afterLogin or a protected route (index or path).");
	return {
		loginPath: s ?? "/",
		homePath: c ?? "/"
	};
}
function ut(e) {
	return "index" in e && e.index ? {
		index: !0,
		element: e.element
	} : {
		path: e.path,
		element: e.element
	};
}
//#endregion
//#region src/router/createAdminRouter.tsx
function dt({ navItems: e, children: t, layoutProps: n, redirects: r }) {
	let { loginPath: i, homePath: a } = lt(t, r), { guest: o, public: s, protected: c } = ot(t), l = [];
	for (let e of o) !("path" in e) || !e.path || l.push({
		path: st(e.path),
		element: /* @__PURE__ */ V(rt, {
			redirectTo: a,
			children: e.element
		})
	});
	for (let e of s) !("path" in e) || !e.path || l.push({
		path: st(e.path),
		element: e.element
	});
	return c.length > 0 && l.push({
		path: "/",
		element: /* @__PURE__ */ V(nt, {
			redirectTo: i,
			children: /* @__PURE__ */ V(et, {
				navItems: e,
				loginPath: i,
				...n
			})
		}),
		children: c.map(ut)
	}), l.push({
		path: "*",
		element: /* @__PURE__ */ V(d, {
			to: a,
			replace: !0
		})
	}), m(l);
}
//#endregion
//#region src/app/AdminApp.tsx
function ft({ navItems: e, routes: t, authRedirects: n, layoutProps: r, theme: i }) {
	let a = s(() => dt({
		navItems: e,
		children: t,
		layoutProps: r,
		redirects: n
	}), [
		e,
		t,
		r,
		n
	]);
	return /* @__PURE__ */ V(ke, {
		...i,
		children: /* @__PURE__ */ V(p, { router: a })
	});
}
//#endregion
//#region src/context/DataProvider.tsx
var pt = t(null);
function mt({ children: e, value: t }) {
	let n = s(() => t, [t]);
	return /* @__PURE__ */ V(pt.Provider, {
		value: n,
		children: e
	});
}
function J() {
	let e = a(pt);
	if (!e) throw Error("useDataProvider must be used within DataProvider");
	return e;
}
//#endregion
//#region src/data/resourceHandlers.ts
function ht(e) {
	return "handlers" in e ? e : { handlers: e };
}
function gt(e, t, n) {
	if (!(!e || !t) && !q(e, t, n)) throw Error("Forbidden");
}
function _t(e, t) {
	let { can: n, guard: r, parseFormError: i } = t ?? {}, a = (t) => {
		let n = e[t];
		if (!n) throw Error(`Unknown resource: ${t}`);
		return ht(n);
	};
	return {
		async getList(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "list"), gt(n, o, "list"), i.getList(t);
		},
		async getOne(e, t, i) {
			let { handlers: o, permissions: s } = a(e);
			return r?.(e, "read"), gt(n, s, "read"), o.getOne(t, i);
		},
		async create(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "add"), gt(n, o, "add"), i.create(t);
		},
		async update(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "change"), gt(n, o, "change"), i.update(t);
		},
		async delete(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "delete"), gt(n, o, "delete"), i.delete(t);
		},
		parseFormError: i
	};
}
//#endregion
//#region src/data/abortError.ts
function vt(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return t.name === "AbortError" || t.name === "CanceledError" || t.code === "ERR_CANCELED";
}
//#endregion
//#region src/data/parseFormErrorHelpers.ts
function Y(e) {
	if (typeof e == "string") return [e];
	if (Array.isArray(e)) {
		let t = e.filter((e) => typeof e == "string");
		if (t.length) return t;
	}
	return [];
}
function yt(e) {
	return e.length === 1 ? e[0] : e;
}
function bt(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (t.body && typeof t.body == "object" && !Array.isArray(t.body)) return t.body;
	let n = t.response;
	if (n && typeof n == "object" && !Array.isArray(n)) {
		let e = n.data;
		if (e && typeof e == "object" && !Array.isArray(e)) return e;
	}
	return null;
}
function xt(e) {
	return Array.isArray(e) ? e.some((e) => e && typeof e == "object" && !Array.isArray(e) && Object.values(e).some((e) => Y(e).length > 0)) : !1;
}
function St(e, t, n) {
	t.forEach((t, r) => {
		if (!(!t || typeof t != "object" || Array.isArray(t))) for (let [i, a] of Object.entries(t)) {
			let t = Y(a);
			t.length && (n[`${e}.${r}.${i}`] = yt(t));
		}
	});
}
function Ct(e, t) {
	return {
		fields: Object.keys(e).length ? e : void 0,
		global: t.length ? t : void 0
	};
}
var wt = new Set(["non_field_errors", "detail"]);
function Tt(e, t) {
	let n = bt(e);
	if (!n) return null;
	let r = {}, i = [];
	for (let [e, t] of Object.entries(n)) {
		if (wt.has(e)) {
			i.push(...Y(t));
			continue;
		}
		if (xt(t)) {
			St(e, t, r);
			continue;
		}
		let n = Y(t);
		n.length && (r[e] = yt(n));
	}
	return !Object.keys(r).length && !i.length ? null : Ct(r, i);
}
function Et(e, t, n) {
	let r = bt(e);
	if (!r) return null;
	let i = n?.camelCase ?? !0, a = n?.fieldMap, o = {}, s = [];
	n?.includeSummary && (s.push(...Y(r.title)), s.push(...Y(r.message)));
	let c = r.errors;
	if (c && typeof c == "object" && !Array.isArray(c)) for (let [e, t] of Object.entries(c)) {
		let n = a?.[e] ?? (i ? kt(e) : e), r = Y(t);
		r.length && (o[n] = yt(r));
	}
	return !Object.keys(o).length && !s.length ? null : Ct(o, s);
}
function Dt(e, t, n) {
	let r = bt(e);
	if (!r) return null;
	let i = {}, a = [], o = n?.fieldMap, s = r.errors;
	if (Array.isArray(s)) for (let e of s) {
		if (!e || typeof e != "object") continue;
		let t = e, n = typeof t.path == "string" && t.path || typeof t.param == "string" && t.param || typeof t.field == "string" && t.field, r = Y(t.msg)[0] ?? Y(t.message)[0];
		r && (n ? Ot(i, o?.[n] ?? n, r) : a.push(r));
	}
	else if (s && typeof s == "object") for (let [e, t] of Object.entries(s)) {
		let n = o?.[e] ?? e, r = Y(t);
		r.length && (i[n] = yt(r));
	}
	let c = r.details;
	if (Array.isArray(c)) for (let e of c) {
		if (!e || typeof e != "object") continue;
		let t = e, n = (Array.isArray(t.path) ? t.path : []).map((e) => String(e)).join("."), r = Y(t.message)[0];
		if (r) if (n) {
			let e = o?.[n] ?? n;
			i[e] = r;
		} else a.push(r);
	}
	return a.push(...Y(r.error)), !Object.keys(i).length && !a.length ? null : Ct(i, a);
}
function Ot(e, t, n) {
	let r = e[t];
	if (!r) {
		e[t] = n;
		return;
	}
	e[t] = Array.isArray(r) ? [...r, n] : [r, n];
}
function kt(e) {
	return e && e.charAt(0).toLowerCase() + e.slice(1);
}
//#endregion
//#region src/data/inMemoryList.ts
function At(e, t) {
	return e === t || String(e) === String(t);
}
function jt(e, t) {
	let n = e.find((e) => At(e.id, t));
	if (!n) throw Error("Not found");
	return n;
}
function Mt(e, t) {
	if (t.length === 0) return e;
	let n = (e) => e === "DESC" ? -1 : 1;
	return [...e].sort((e, r) => {
		for (let { field: i, order: a } of t) {
			let t = e[i], o = r[i];
			if (t === o) continue;
			if (t == null) return -1 * n(a);
			if (o == null) return 1 * n(a);
			if (typeof t == "number" && typeof o == "number") return t < o ? -n(a) : n(a);
			let s = String(t).localeCompare(String(o));
			if (s !== 0) return s * n(a);
		}
		return 0;
	});
}
function Nt(e, t) {
	return t == null || t === "" ? !0 : Array.isArray(t) ? t.length === 0 ? !0 : Array.isArray(e) ? t.some((t) => e.includes(t)) : t.includes(e) : Array.isArray(e) ? e.includes(t) : typeof t == "string" && typeof e == "string" ? e.toLowerCase().includes(t.toLowerCase()) : e === t;
}
function Pt(e, t) {
	return t ? e.filter((e) => Object.entries(t).every(([t, n]) => Nt(e[t], n))) : e;
}
function Ft(e, t, n) {
	let r = (t - 1) * n;
	return {
		data: e.slice(r, r + n),
		total: e.length
	};
}
function It(e, t) {
	let { pagination: n, sort: r, filter: i } = t, a = Pt(e, i);
	if (r) {
		let e = Array.isArray(r) ? r : [r];
		e.length > 0 && e[0]?.field && (a = Mt(a, e));
	}
	return n ? Ft(a, n.page, n.perPage) : {
		data: a,
		total: a.length
	};
}
//#endregion
//#region src/data/createMemoryResourceHandlers.ts
function Lt(e) {
	let t = (e) => e, n = e.mapCreate ?? ((e, t) => ({
		...e,
		id: t
	})), r = e.applyUpdate ?? ((e, t) => ({
		...e,
		...t,
		id: e.id
	}));
	return {
		async getList(n) {
			return It(t(e.scopeList ? e.scopeList(e.getRows(), n) : e.getRows()), n);
		},
		async getOne(t, n) {
			return { data: jt(e.getRows(), t) };
		},
		async create(t) {
			let r = n(t, e.nextId());
			return e.getRows().push(r), { data: r };
		},
		async update({ id: t, data: n }) {
			let i = jt(e.getRows(), t), a = r(i, n);
			return Object.assign(i, a), { data: i };
		},
		async delete(t) {
			let n = e.getRows(), r = n.findIndex((e) => At(e.id, t));
			if (r < 0) return { data: null };
			let [i] = n.splice(r, 1);
			return e.afterDelete?.(i), { data: i };
		}
	};
}
//#endregion
//#region src/data/createRestResourceHandlers.ts
function Rt(e) {
	return {
		async getList(t) {
			return e.list(t);
		},
		async getOne(t, n) {
			return { data: await e.retrieve(t, n) };
		},
		async create(t) {
			let n = e.transformCreate ? e.transformCreate(t) : t;
			return { data: await e.create(n) };
		},
		async update({ id: t, data: n }) {
			let r = e.transformUpdate ? e.transformUpdate(n) : n;
			return { data: await e.update(t, r) };
		},
		async delete(t) {
			return await e.destroy(t), { data: null };
		}
	};
}
//#endregion
//#region src/data/sortHelpers.ts
function zt(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function Bt(e) {
	let t = zt(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function Vt(e) {
	let t = zt(e);
	if (t.length !== 0) return t.map((e) => `${e.field} ${e.order === "DESC" ? "desc" : "asc"}`).join(",");
}
function Ht(e) {
	let t = zt(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
//#endregion
//#region src/components/AuthAlternateLink.tsx
function Ut({ prompt: e, linkText: t, to: n }) {
	return /* @__PURE__ */ H(R.Paragraph, {
		type: "secondary",
		style: {
			textAlign: "center",
			marginBottom: 0
		},
		children: [
			e,
			" ",
			/* @__PURE__ */ V(u, {
				to: n,
				children: t
			})
		]
	});
}
//#endregion
//#region src/layouts/AuthPageLayout.tsx
function Wt({ children: e, brand: t, footer: n, showThemeToolbar: r = !0 }) {
	let { token: i } = z.useToken();
	return /* @__PURE__ */ H(E, {
		vertical: !0,
		align: "stretch",
		style: {
			height: "100dvh",
			maxHeight: "100dvh",
			width: "100%",
			overflow: "hidden",
			background: i.colorBgLayout
		},
		children: [
			r ? /* @__PURE__ */ V(E, {
				justify: "flex-end",
				style: {
					flexShrink: 0,
					width: "100%",
					padding: 16,
					background: i.colorBgLayout
				},
				children: /* @__PURE__ */ V(Fe, {})
			}) : null,
			t ? /* @__PURE__ */ V("div", {
				style: {
					flexShrink: 0,
					textAlign: "center",
					padding: "0 24px 16px"
				},
				children: t
			}) : null,
			/* @__PURE__ */ H(E, {
				flex: 1,
				vertical: !0,
				align: "center",
				justify: "flex-start",
				style: {
					width: "100%",
					minHeight: 0,
					padding: "0 24px 24px",
					overflow: "auto",
					overflowX: "hidden",
					background: i.colorBgLayout
				},
				children: [e, n ? /* @__PURE__ */ V("div", {
					style: {
						marginTop: 16,
						width: "100%",
						maxWidth: 520
					},
					children: n
				}) : null]
			})
		]
	});
}
//#endregion
//#region src/pages/LoginPage.tsx
function Gt({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, brand: r, extraFields: i, showThemeToolbar: a = !0, afterLoginPath: o = "/", alternateAuth: s, footer: c }) {
	let { login: l } = Re(), u = g();
	return /* @__PURE__ */ V(Wt, {
		brand: r ?? n,
		footer: c ?? (s ? /* @__PURE__ */ V(Ut, {
			prompt: s.prompt ?? "Don't have an account?",
			linkText: s.linkText,
			to: s.to
		}) : null),
		showThemeToolbar: a,
		children: /* @__PURE__ */ H(S, {
			style: {
				width: "100%",
				maxWidth: 360
			},
			title: e,
			children: [t ? /* @__PURE__ */ V(R.Paragraph, {
				type: "secondary",
				style: { marginTop: 0 },
				children: t
			}) : null, /* @__PURE__ */ H(D, {
				layout: "vertical",
				onFinish: async (e) => {
					await l({
						username: String(e.username ?? ""),
						password: String(e.password ?? ""),
						...e
					}), u(o, { replace: !0 });
				},
				children: [
					/* @__PURE__ */ V(D.Item, {
						name: "username",
						label: "Username",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ V(k, { autoComplete: "username" })
					}),
					/* @__PURE__ */ V(D.Item, {
						name: "password",
						label: "Password",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ V(k.Password, { autoComplete: "current-password" })
					}),
					i,
					/* @__PURE__ */ V(D.Item, {
						style: { marginBottom: 0 },
						children: /* @__PURE__ */ V(x, {
							type: "primary",
							htmlType: "submit",
							block: !0,
							children: "Log in"
						})
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/pages/PlaceholderPage.tsx
function Kt({ title: e }) {
	return /* @__PURE__ */ V(R.Title, {
		level: 3,
		style: { marginTop: 0 },
		children: e
	});
}
//#endregion
//#region src/crud/utils/sortQueryParam.ts
function qt(e) {
	if (!e) return [];
	let t = [];
	for (let n of e.split(",").map((e) => e.trim()).filter(Boolean)) {
		if (n.includes(":")) {
			let [e, r] = n.split(":");
			if (!e) continue;
			let i = r?.toLowerCase() === "desc" ? "DESC" : "ASC";
			t.push({
				field: e,
				order: i
			});
			continue;
		}
		n.startsWith("-") && n.length > 1 ? t.push({
			field: n.slice(1),
			order: "DESC"
		}) : t.push({
			field: n,
			order: "ASC"
		});
	}
	return t;
}
function Jt(e) {
	return e.length === 0 ? null : e.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function Yt(e) {
	return new Map(e.map((e, t) => [e.field, t + 1]));
}
//#endregion
//#region src/crud/context/ListContext.tsx
var Xt = t(null);
function Zt({ children: e, toggleSort: t, sort: n }) {
	let [r, a] = l([]), o = s(() => new Set(n.map((e) => e.field)), [n]), c = s(() => new Map(n.map((e) => [e.field, e.order])), [n]), u = s(() => Yt(n), [n]), d = i((e) => (a((t) => {
		let n = t.findIndex((t) => t.key === e.key);
		if (n < 0) return [...t, e];
		if (t[n] === e) return t;
		let r = [...t];
		return r[n] = e, r;
	}), () => {
		a((t) => t.filter((t) => t.key !== e.key));
	}), []), f = s(() => ({
		columns: r,
		toggleSort: t,
		sortFields: o,
		sortOrders: c,
		sortPriorities: u,
		registerColumn: d
	}), [
		r,
		t,
		o,
		c,
		u,
		d
	]);
	return /* @__PURE__ */ V(Xt.Provider, {
		value: f,
		children: e
	});
}
function Qt() {
	let e = a(Xt);
	if (!e) throw Error("Column components must be used within ResourceList");
	return e;
}
function X(e) {
	let { registerColumn: t } = Qt();
	o(() => t(e), [t, e]);
}
//#endregion
//#region src/crud/context/FilterContext.tsx
var $t = t(null);
function en({ children: e, values: t, setFilterValue: n }) {
	let [r, a] = l([]), o = i((e) => (a((t) => {
		let n = t.findIndex((t) => t.key === e.key);
		if (n < 0) return [...t, e];
		if (t[n] === e) return t;
		let r = [...t];
		return r[n] = e, r;
	}), () => {
		a((t) => t.filter((t) => t.key !== e.key));
	}), []), c = s(() => ({
		filters: r,
		values: t,
		setFilterValue: n,
		registerFilter: o
	}), [
		r,
		t,
		n,
		o
	]);
	return /* @__PURE__ */ V($t.Provider, {
		value: c,
		children: e
	});
}
function tn() {
	return a($t);
}
function Z(e) {
	let t = tn()?.registerFilter;
	o(() => {
		if (t) return t(e);
	}, [t, e]);
}
//#endregion
//#region src/crud/context/FormContext.tsx
var nn = t(null);
function rn({ children: e, resource: t, isNew: n, disabled: r }) {
	return /* @__PURE__ */ V(nn.Provider, {
		value: {
			resource: t,
			isNew: n,
			disabled: r
		},
		children: e
	});
}
function an() {
	return a(nn);
}
//#endregion
//#region src/crud/context/FormSectionContext.tsx
var on = t(null);
function sn({ sourcesRef: e, children: t }) {
	return /* @__PURE__ */ V(on.Provider, {
		value: e,
		children: t
	});
}
function cn() {
	return a(on);
}
//#endregion
//#region src/crud/context/PayloadFieldsContext.tsx
var ln = t(null);
function un({ children: e, fieldsRef: t }) {
	return /* @__PURE__ */ V(ln.Provider, {
		value: t,
		children: e
	});
}
function dn() {
	return a(ln);
}
function fn(e, t = !0) {
	let n = dn();
	o(() => {
		if (!(!t || !n)) return n.current.add(e), () => {
			n.current.delete(e);
		};
	}, [
		n,
		e,
		t
	]);
}
function pn(e, t = !0) {
	let n = cn();
	o(() => {
		if (!(!t || !n)) return n.current.add(e), () => {
			n.current.delete(e);
		};
	}, [
		n,
		e,
		t
	]);
}
//#endregion
//#region src/crud/utils/getFormValue.ts
function mn(e, t) {
	let n = t.split("."), r = e;
	for (let e of n) {
		if (typeof r != "object" || !r) return;
		r = r[e];
	}
	return r;
}
//#endregion
//#region src/crud/utils/setFormValue.ts
function hn(e, t, n) {
	let r = t.split("."), i = e;
	for (let e = 0; e < r.length - 1; e++) {
		let t = r[e], n = i[t];
		(typeof n != "object" || !n || Array.isArray(n)) && (i[t] = {}), i = i[t];
	}
	i[r[r.length - 1]] = n;
}
//#endregion
//#region src/crud/utils/buildFormPayload.ts
function gn(e, t) {
	if (t.length === 0) return { ...e };
	let n = {};
	for (let r of t) {
		let t = mn(e, r);
		t !== void 0 && hn(n, r, t);
	}
	return n;
}
//#endregion
//#region src/crud/utils/formErrors.ts
function _n(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function vn(e, t, n) {
	for (let e of _n(t.global)) n.error(e);
	for (let [n, r] of Object.entries(t.fields ?? {})) {
		let t = Array.isArray(r) ? r.join(", ") : r;
		e.setError(n, {
			type: "server",
			message: t
		});
	}
}
function yn(e, t, n, r, i) {
	let a = e.parseFormError?.(r, i);
	if (!a) return !1;
	let o = Object.keys(a.fields ?? {}).length > 0, s = _n(a.global).length > 0;
	return !o && !s ? !1 : (vn(t, a, n), !0);
}
//#endregion
//#region src/crud/utils/useAbortableEffect.ts
function bn(e, t) {
	o(() => {
		let t = new AbortController();
		return e(t.signal), () => t.abort();
	}, t);
}
//#endregion
//#region src/crud/ResourceFormModal.tsx
function xn({ resource: e, editId: t, onClose: n, children: r, title: a }) {
	let o = t === "new" || t == null, s = t != null, u = J(), { message: d } = y.useApp(), [f, p] = l(!o), m = be(), h = c(/* @__PURE__ */ new Set()), g = i(async (n) => {
		if (o || !t) {
			m.reset({}), p(!1);
			return;
		}
		p(!0);
		try {
			let r = await u.getOne(e, t, { signal: n });
			if (n?.aborted) return;
			m.reset(r.data);
		} catch (e) {
			vt(e) || d.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			n?.aborted || p(!1);
		}
	}, [
		u,
		e,
		t,
		o,
		m,
		d
	]);
	bn((e) => {
		if (s) return g(e);
	}, [s, g]);
	async function _(r) {
		try {
			let i = gn(r, Array.from(h.current));
			o ? (await u.create(e, i), d.success("Created")) : t && (await u.update(e, {
				id: t,
				data: i
			}), d.success("Updated")), n();
		} catch (t) {
			yn(u, m, d, t, {
				resource: e,
				mutation: o ? "create" : "update"
			}) || d.error(t instanceof Error ? t.message : "Save failed");
		}
	}
	return /* @__PURE__ */ V(te, {
		open: s,
		title: a ?? (o ? `New ${e}` : `Edit ${e}`),
		onCancel: n,
		footer: null,
		destroyOnHidden: !0,
		width: 560,
		children: f ? /* @__PURE__ */ V(L, {}) : /* @__PURE__ */ V(rn, {
			resource: e,
			isNew: o,
			children: /* @__PURE__ */ V(un, {
				fieldsRef: h,
				children: /* @__PURE__ */ V(ve, {
					...m,
					children: /* @__PURE__ */ H(D, {
						layout: "vertical",
						onFinish: () => void m.handleSubmit(_)(),
						children: [r, /* @__PURE__ */ H(D.Item, {
							style: {
								marginTop: 16,
								marginBottom: 0
							},
							children: [/* @__PURE__ */ V(x, {
								type: "primary",
								htmlType: "submit",
								style: { marginRight: 8 },
								children: "Save"
							}), /* @__PURE__ */ V(x, {
								onClick: n,
								children: "Cancel"
							})]
						})]
					})
				})
			})
		})
	});
}
//#endregion
//#region src/crud/ListActionsBar.tsx
function Sn({ selectedCount: e, total: t, allPageSelected: n, allMatchingSelected: r, onSelectAllMatching: a, onClearSelection: o, actions: c, onExecute: u, selectedIds: d, running: f = !1 }) {
	let [p, m] = l(), h = s(() => c.map((e) => ({
		value: e.key,
		label: e.label
	})), [c]), g = i(async () => {
		let t = c.find((e) => e.key === p);
		!t || e === 0 || (await u(t, d), m(void 0));
	}, [
		c,
		p,
		u,
		e,
		d
	]), _ = n && !r && t > e;
	return /* @__PURE__ */ H(I, {
		wrap: !0,
		style: {
			marginBottom: 16,
			width: "100%"
		},
		align: "center",
		children: [
			/* @__PURE__ */ H(R.Text, {
				type: "secondary",
				children: [
					e,
					" of ",
					t,
					" selected"
				]
			}),
			e > 0 ? /* @__PURE__ */ V(x, {
				type: "link",
				size: "small",
				onClick: o,
				style: { padding: 0 },
				children: "Clear selection"
			}) : null,
			_ ? /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V(R.Text, {
				type: "secondary",
				children: "·"
			}), /* @__PURE__ */ H(x, {
				type: "link",
				size: "small",
				onClick: a,
				style: { padding: 0 },
				children: [
					"Select all ",
					t,
					" items matching filter"
				]
			})] }) : null,
			r && t > 0 ? /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V(R.Text, {
				type: "secondary",
				children: "·"
			}), /* @__PURE__ */ H(R.Text, {
				type: "success",
				children: [
					"All ",
					t,
					" items selected"
				]
			})] }) : null,
			/* @__PURE__ */ V(F, {
				placeholder: "Action",
				style: { minWidth: 200 },
				options: h,
				value: p,
				onChange: m,
				disabled: e === 0 || f,
				allowClear: !0
			}),
			/* @__PURE__ */ V(x, {
				type: "primary",
				onClick: () => void g(),
				disabled: !p || e === 0 || f,
				loading: f,
				children: "Go"
			})
		]
	});
}
//#endregion
//#region src/crud/types.ts
var Cn = new Set([
	"page",
	"perPage",
	"sort",
	"create",
	"edit"
]), wn = 1, Tn = 10;
function En(e) {
	if (e.includes(",")) {
		let t = e.split(",").map((e) => e.trim()), n = t.map(Number);
		return n.every((e) => Number.isFinite(e)) ? n : t;
	}
	let t = Number(e);
	return e !== "" && Number.isFinite(t) && String(t) === e ? t : e === "true" ? !0 : e === "false" ? !1 : e;
}
function Dn(e) {
	return e == null || e === "" ? null : Array.isArray(e) ? e.length === 0 ? null : e.map(String).join(",") : String(e);
}
function On(e) {
	let [t, n] = v(), r = s(() => {
		let n = t.get("page"), r = t.get("perPage"), i = n ? Math.max(1, Number(n) || wn) : wn, a = r ? Math.max(1, Number(r) || Tn) : Tn, o = t.getAll("sort"), s = o.length > 0 ? o.flatMap((e) => qt(e)) : qt(t.get("sort")), c = { ...e };
		return t.forEach((e, n) => {
			if (Cn.has(n)) return;
			let r = c[n];
			r === void 0 ? t.getAll(n).length > 1 ? c[n] = t.getAll(n).map(En) : c[n] = En(e) : c[n] = [...Array.isArray(r) ? r : [r], En(e)];
		}), {
			page: i,
			perPage: a,
			sort: s,
			filter: c,
			createModal: t.has("create"),
			editId: t.get("edit")
		};
	}, [t, e]), a = i((e) => {
		n((t) => {
			let n = new URLSearchParams(t);
			return e(n), n;
		}, { replace: !0 });
	}, [n]);
	return [r, s(() => ({
		setPage: (e) => {
			a((t) => {
				e <= 1 ? t.delete("page") : t.set("page", String(e));
			});
		},
		setPerPage: (e) => {
			a((t) => {
				e === Tn ? t.delete("perPage") : t.set("perPage", String(e)), t.delete("page");
			});
		},
		setSort: (e) => {
			a((t) => {
				t.delete("sort");
				let n = Jt(e);
				n && t.set("sort", n);
			});
		},
		toggleSort: (e) => {
			a((t) => {
				let n = t.getAll("sort").flatMap((e) => qt(e)), r = n.findIndex((t) => t.field === e), i;
				i = r < 0 ? [...n, {
					field: e,
					order: "ASC"
				}] : n[r].order === "ASC" ? n.map((e, t) => t === r ? {
					...e,
					order: "DESC"
				} : e) : n.filter((e, t) => t !== r), t.delete("sort");
				let a = Jt(i);
				a && t.set("sort", a);
			});
		},
		setFilter: (e, t) => {
			a((n) => {
				n.delete(e);
				let r = Dn(t);
				r != null && n.set(e, r), n.delete("page");
			});
		},
		setFilters: (e) => {
			a((t) => {
				for (let e of [...t.keys()]) Cn.has(e) || t.delete(e);
				for (let [n, r] of Object.entries(e)) {
					let e = Dn(r);
					e != null && t.set(n, e);
				}
				t.delete("page");
			});
		},
		openCreateModal: () => {
			a((e) => {
				e.set("create", "1"), e.delete("edit");
			});
		},
		openEditModal: (e) => {
			a((t) => {
				t.set("edit", String(e)), t.delete("create");
			});
		},
		closeModal: () => {
			a((e) => {
				e.delete("create"), e.delete("edit");
			});
		}
	}), [a])];
}
//#endregion
//#region src/crud/ResourceList.tsx
var kn = t(null);
function An() {
	return a(kn);
}
function jn({ resource: e, title: t, pathPrefix: n, newPath: r, editMode: a = "page", formChildren: o, actions: c, rowActions: d, headerExtra: f, bulkActions: p, bulkDelete: m = !0, bulkActionsEnabled: h = !0, permissions: g, queryState: _, queryActions: v }) {
	let b = J(), C = K(), { message: w, modal: ee } = y.useApp(), { columns: T, sortOrders: E, sortPriorities: D } = Qt(), [O, k] = l(!1), [A, j] = l([]), [M, te] = l(0), [N, P] = l(() => /* @__PURE__ */ new Set()), [F, L] = l(!1), ne = r ?? `${n}/new`, re = q(C, g, "add"), ae = q(C, g, "change"), z = q(C, g, "delete"), oe = ae && (a === "page" || a === "both") && c?.edit !== !1, U = ae && (a === "modal" || a === "both") && c?.quickEdit !== !1, le = z && c?.delete !== !1, ue = oe || U || le || d, de = i(() => {
		P(/* @__PURE__ */ new Set());
	}, []), fe = s(() => {
		if (!h) return [];
		let t = [];
		return m && z && t.push({
			key: "__delete",
			label: "Delete selected",
			confirm: (e) => `Delete ${e.length} selected item(s)? This cannot be undone.`,
			execute: async (t, { reload: n, clearSelection: r }) => {
				await Promise.all(t.map((t) => b.delete(e, t))), r(), n(), w.success(`Deleted ${t.length} item(s)`);
			}
		}), [...t, ...p ?? []];
	}, [
		h,
		m,
		z,
		p,
		b,
		e,
		w
	]), pe = fe.length > 0, me = N.size, he = A.length > 0 && A.every((e) => N.has(e.id)), ge = M > 0 && me >= M, _e = s(() => A.filter((e) => N.has(e.id)).map((e) => e.id), [A, N]), ve = i((e) => {
		P((t) => {
			let n = new Set(t), r = A.map((e) => e.id);
			for (let t of r) e.includes(t) || n.delete(t);
			for (let t of e) n.add(t);
			return n;
		});
	}, [A]), ye = i(async () => {
		if (!(M <= 0)) {
			L(!0);
			try {
				let t = _.sort.length === 0 ? void 0 : _.sort.length === 1 ? _.sort[0] : _.sort, n = await b.getList(e, {
					pagination: {
						page: 1,
						perPage: M
					},
					sort: t,
					filter: _.filter
				});
				P(new Set(n.data.map((e) => e.id)));
			} catch (e) {
				w.error(e instanceof Error ? e.message : "Load failed");
			} finally {
				L(!1);
			}
		}
	}, [
		b,
		e,
		M,
		_.sort,
		_.filter,
		w
	]), be = i((e) => {
		let t = (e) => {
			let t = e?.columnKey ?? e?.field;
			return t == null ? null : String(Array.isArray(t) ? t[0] : t);
		};
		if (Array.isArray(e)) {
			let n = e.find((e) => e?.order);
			if (n) {
				let e = t(n);
				e && v.toggleSort(e);
				return;
			}
			_.sort.length > 0 && v.setSort([]);
			return;
		}
		let n = t(e);
		if (n) {
			v.toggleSort(n);
			return;
		}
		!e?.order && _.sort.length > 0 && v.setSort([]);
	}, [v, _.sort.length]), W = s(() => {
		let e = _.sort.length === 0 ? void 0 : _.sort.length === 1 ? _.sort[0] : _.sort;
		return {
			pagination: {
				page: _.page,
				perPage: _.perPage
			},
			sort: e,
			filter: _.filter
		};
	}, [_]), G = i(async (t) => {
		k(!0);
		try {
			let n = await b.getList(e, {
				...W,
				signal: t
			});
			if (t?.aborted) return;
			j(n.data), te(n.total);
		} catch (e) {
			vt(e) || w.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			t?.aborted || k(!1);
		}
	}, [
		b,
		e,
		W,
		w
	]);
	bn((e) => G(e), [G]);
	let xe = s(() => ({
		reload: () => void G(),
		clearSelection: de
	}), [G, de]), Se = i(async (e, t) => {
		if (e.confirm) {
			let n = typeof e.confirm == "function" ? await e.confirm(t, xe) : e.confirm;
			if (n === !1 || !await new Promise((t) => {
				ee.confirm({
					title: n,
					okType: e.key === "__delete" ? "danger" : "primary",
					onOk: () => t(!0),
					onCancel: () => t(!1)
				});
			})) return;
		}
		L(!0);
		try {
			await e.execute(t, xe);
		} catch (e) {
			w.error(e instanceof Error ? e.message : "Action failed");
		} finally {
			L(!1);
		}
	}, [
		xe,
		ee,
		w
	]), Ce = i(async (t) => {
		if (z) try {
			await b.delete(e, t.id), w.success("Deleted"), G();
		} catch (e) {
			w.error(e instanceof Error ? e.message : "Delete failed");
		}
	}, [
		z,
		b,
		e,
		G,
		w
	]), we = s(() => {
		let e = T.map((e) => {
			let t = e.buildColumn();
			if (e.sortable) {
				let n = E.get(e.source), r = D.get(e.source), i = n === "ASC" ? "ascend" : n === "DESC" ? "descend" : void 0, a = i == null ? void 0 : /* @__PURE__ */ H("span", {
					style: {
						display: "inline-flex",
						alignItems: "center",
						gap: 2,
						marginInlineStart: 4,
						color: "var(--ant-color-primary)"
					},
					children: [r == null ? null : /* @__PURE__ */ V("span", {
						style: {
							fontSize: 11,
							fontWeight: 600,
							lineHeight: 1,
							minWidth: 10,
							textAlign: "center"
						},
						children: r
					}), V(i === "ascend" ? ce : se, { style: { fontSize: 11 } })]
				});
				return {
					...t,
					sorter: !0,
					sortOrder: i,
					...a ? { sortIcon: () => a } : {}
				};
			}
			return t;
		});
		if (!ue) return e;
		let t = {
			reload: () => void G(),
			openEditModal: v.openEditModal
		}, r = {
			title: "Actions",
			key: "__actions",
			width: a === "both" ? 200 : 160,
			render: (e, r) => /* @__PURE__ */ H(I, {
				size: "small",
				wrap: !0,
				children: [
					oe ? /* @__PURE__ */ V(u, {
						to: `${n}/${String(r.id)}`,
						children: "Edit"
					}) : null,
					U ? /* @__PURE__ */ V(x, {
						type: "link",
						size: "small",
						style: { padding: 0 },
						onClick: () => v.openEditModal(r.id),
						children: a === "both" ? "Quick edit" : "Edit"
					}) : null,
					le ? /* @__PURE__ */ V(x, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => void Ce(r),
						style: { padding: 0 },
						children: "Delete"
					}) : null,
					d?.(r, t)
				]
			})
		};
		return [...e, r];
	}, [
		T,
		ue,
		oe,
		U,
		le,
		a,
		n,
		Ce,
		E,
		D,
		v,
		d,
		G
	]), Te = o && (_.createModal || _.editId != null) && (a === "modal" || a === "both");
	return /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ H(S, {
		title: /* @__PURE__ */ V(R.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		}),
		extra: f || re ? /* @__PURE__ */ H(I, { children: [f, re ? a === "modal" || a === "both" ? /* @__PURE__ */ H(B, { children: [a === "both" ? /* @__PURE__ */ V(u, {
			to: ne,
			children: /* @__PURE__ */ V(x, { children: "New page" })
		}) : null, /* @__PURE__ */ V(x, {
			type: "primary",
			onClick: () => v.openCreateModal(),
			children: "New"
		})] }) : /* @__PURE__ */ V(u, {
			to: ne,
			children: /* @__PURE__ */ V(x, {
				type: "primary",
				children: "New"
			})
		}) : null] }) : null,
		children: [pe ? /* @__PURE__ */ V(Sn, {
			selectedCount: me,
			total: M,
			allPageSelected: he,
			allMatchingSelected: ge,
			onSelectAllMatching: () => void ye(),
			onClearSelection: de,
			actions: fe,
			onExecute: Se,
			selectedIds: [...N],
			running: F || O
		}) : null, /* @__PURE__ */ V(ie, {
			rowKey: "id",
			loading: O,
			columns: we,
			dataSource: A,
			scroll: { x: "max-content" },
			rowSelection: pe ? {
				selectedRowKeys: _e,
				onChange: ve,
				preserveSelectedRowKeys: !0
			} : void 0,
			pagination: {
				current: _.page,
				pageSize: _.perPage,
				total: M,
				showSizeChanger: !0,
				onChange: (e, t) => {
					v.setPage(e), t && v.setPerPage(t);
				}
			},
			onChange: (e, t, n) => {
				be(n);
			}
		})]
	}), Te ? /* @__PURE__ */ V(xn, {
		resource: e,
		editId: _.createModal ? "new" : _.editId,
		onClose: () => {
			v.closeModal(), G();
		},
		children: o
	}) : null] });
}
function Mn({ resource: e, title: t, pathPrefix: n, newPath: r, staticFilter: a, editMode: o = "page", syncQueryParams: c = !0, children: l, formChildren: u, actions: d, rowActions: f, headerExtra: p, bulkActions: m, bulkDelete: h, bulkActionsEnabled: g, permissions: _ }) {
	let [v, y] = On(a), b = s(() => {
		if (!c) return a ?? {};
		let e = {};
		for (let [t, n] of Object.entries(v.filter)) a && t in a || (e[t] = n);
		return e;
	}, [
		v.filter,
		a,
		c
	]), x = i((e, t) => {
		c && y.setFilter(e, t);
	}, [c, y]), S = s(() => ({
		filterValues: b,
		setFilterValue: x
	}), [b, x]);
	return /* @__PURE__ */ V(kn.Provider, {
		value: S,
		children: /* @__PURE__ */ V(en, {
			values: b,
			setFilterValue: x,
			children: /* @__PURE__ */ H(Zt, {
				toggleSort: y.toggleSort,
				sort: v.sort,
				children: [l, /* @__PURE__ */ V(jn, {
					resource: e,
					title: t,
					pathPrefix: n,
					newPath: r,
					editMode: o,
					formChildren: u,
					actions: d,
					rowActions: f,
					headerExtra: p,
					bulkActions: m,
					bulkDelete: h,
					bulkActionsEnabled: g,
					permissions: _,
					queryState: v,
					queryActions: y
				})]
			})
		})
	});
}
//#endregion
//#region src/crud/FilterBar.tsx
function Nn() {
	let e = tn();
	return !e || e.filters.length === 0 ? null : /* @__PURE__ */ V(I, {
		wrap: !0,
		size: "middle",
		style: { marginBottom: 16 },
		children: e.filters.map((t) => /* @__PURE__ */ H(I, {
			orientation: "vertical",
			size: 2,
			children: [t.label ? /* @__PURE__ */ V(R.Text, {
				type: "secondary",
				style: { fontSize: 12 },
				children: t.label
			}) : null, t.render({
				value: e.values[t.source],
				onChange: (n) => e.setFilterValue(t.source, n)
			})]
		}, t.key))
	});
}
function Pn({ children: e }) {
	return /* @__PURE__ */ H(B, { children: [e, /* @__PURE__ */ V(Nn, {})] });
}
//#endregion
//#region src/crud/context/InlineFieldsRegistry.tsx
var Fn = t(null);
function In({ children: e, registryRef: t }) {
	return /* @__PURE__ */ V(Fn.Provider, {
		value: t,
		children: e
	});
}
function Ln() {
	return a(Fn);
}
function Rn(e, t, n, r, i = !0) {
	let a = Ln();
	o(() => {
		if (!(!i || !a)) return a.current.set(e, {
			field: e,
			sources: t,
			payloadKey: n,
			transformRows: r
		}), () => {
			a.current.delete(e);
		};
	}, [
		a,
		e,
		t,
		n,
		r,
		i
	]);
}
//#endregion
//#region src/crud/utils/buildInlineRowsPayload.ts
function zn(e, t, n) {
	if (!Array.isArray(e)) return [];
	let r = e.map((e) => {
		if (!e || typeof e != "object") return {};
		let n = e, r = {};
		for (let e of t) {
			let t = n[e];
			t !== void 0 && (r[e] = t);
		}
		let i = n.id;
		return i != null && (r.id = i), r;
	});
	return n?.transformRows ? n.transformRows(r) : r;
}
//#endregion
//#region src/crud/utils/useFormRecord.ts
function Bn({ dp: e, resource: t, id: n, isNew: r, form: a, message: o, defaultValues: s }) {
	let [c, u] = l(!r), [d, f] = l(0), p = i(async (i) => {
		if (r || !n) {
			s && a.reset({ ...s }), u(!1);
			return;
		}
		u(!0);
		try {
			let r = await e.getOne(t, n, { signal: i });
			if (i?.aborted) return;
			a.reset(r.data), f((e) => e + 1);
		} catch (e) {
			vt(e) || o.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			i?.aborted || u(!1);
		}
	}, [
		e,
		t,
		n,
		r,
		a,
		o,
		s
	]);
	return bn((e) => p(e), [p]), {
		loading: c,
		formVersion: d
	};
}
function Vn({ dp: e, resource: t, id: n, isNew: r, form: a, message: o, navigate: s, listPath: c, payloadFieldsRef: l, inlineRegistryRef: u, onSaved: d, stayOnPage: f }) {
	return i(async (i) => {
		try {
			let a = i, p = gn(a, Array.from(l.current));
			for (let e of u.current.values()) {
				let t = a[e.field], n = e.payloadKey ?? e.field;
				p[n] = zn(t, e.sources, { transformRows: e.transformRows });
			}
			let m;
			if (r) m = (await e.create(t, p)).data, o.success("Created");
			else if (n) m = (await e.update(t, {
				id: n,
				data: p
			})).data, o.success("Updated");
			else return;
			d?.(m), f || s(c);
		} catch (n) {
			let i = Array.from(u.current.keys());
			yn(e, a, o, n, {
				resource: t,
				mutation: r ? "create" : "update",
				inlineFieldPaths: i
			}), o.error(n instanceof Error ? n.message : "Save failed");
		}
	}, [
		e,
		t,
		n,
		r,
		a,
		o,
		s,
		c,
		l,
		u,
		d,
		f
	]);
}
//#endregion
//#region src/crud/ResourceForm.tsx
function Hn({ resource: e, title: t, listPath: r, children: i, defaultValues: a, onSaved: s, stayOnPage: l, permissions: d }) {
	let { id: f } = _(), p = f === "new" || !f, m = J(), h = K(), v = g(), { message: b } = y.useApp(), { token: C } = z.useToken(), w = c(/* @__PURE__ */ new Set()), ee = c(/* @__PURE__ */ new Map()), T = be({ defaultValues: a }), { loading: E, formVersion: O } = Bn({
		dp: m,
		resource: e,
		id: f,
		isNew: p,
		form: T,
		message: b,
		defaultValues: a
	}), k = Vn({
		dp: m,
		resource: e,
		id: f,
		isNew: p,
		form: T,
		message: b,
		navigate: v,
		listPath: r,
		payloadFieldsRef: w,
		inlineRegistryRef: ee,
		onSaved: s,
		stayOnPage: l
	});
	o(() => {
		d && (q(h, d, p ? "add" : "change") || v(r, { replace: !0 }));
	}, [
		d,
		p,
		h,
		v,
		r
	]);
	let A = d ? q(h, d, p ? "add" : "change") : !0;
	return /* @__PURE__ */ V(S, {
		title: /* @__PURE__ */ H(I, { children: [/* @__PURE__ */ H(u, {
			to: r,
			style: { color: C.colorText },
			children: [/* @__PURE__ */ V(oe, {}), " Back"]
		}), /* @__PURE__ */ V(R.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		})] }),
		children: /* @__PURE__ */ V(rn, {
			resource: e,
			isNew: p,
			children: /* @__PURE__ */ V(un, {
				fieldsRef: w,
				children: /* @__PURE__ */ V(In, {
					registryRef: ee,
					children: /* @__PURE__ */ H("div", {
						style: { position: "relative" },
						children: [E ? /* @__PURE__ */ V("div", {
							style: {
								position: "absolute",
								inset: 0,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								zIndex: 1
							},
							children: /* @__PURE__ */ V(L, {})
						}) : null, /* @__PURE__ */ n(ve, {
							...T,
							key: O
						}, /* @__PURE__ */ H(D, {
							layout: "vertical",
							onFinish: () => void T.handleSubmit(k)(),
							style: {
								opacity: E ? .4 : 1,
								pointerEvents: E ? "none" : void 0
							},
							children: [i, /* @__PURE__ */ V(D.Item, {
								style: { marginTop: 16 },
								children: /* @__PURE__ */ H(I, { children: [/* @__PURE__ */ V(x, {
									type: "primary",
									htmlType: "submit",
									disabled: E || !A,
									children: "Save"
								}), /* @__PURE__ */ V(u, {
									to: r,
									children: /* @__PURE__ */ V(x, {
										disabled: E,
										children: "Cancel"
									})
								})] })
							})]
						}))]
					})
				})
			})
		})
	});
}
//#endregion
//#region src/crud/utils/nestedFieldPath.ts
function Un(e, t, n) {
	return `${e}.${t}.${n}`;
}
//#endregion
//#region src/crud/InlineFormSet.tsx
function Wn(e) {
	let t = {};
	for (let n of e) t[n] = void 0;
	return t;
}
function Gn(e, t) {
	let { control: n } = W(), { fields: r, append: i, remove: a } = ye({
		control: n,
		name: e,
		keyName: "rowKey"
	});
	return {
		fields: r,
		remove: a,
		appendEmpty: () => i(Wn(t))
	};
}
function Kn({ field: e, label: t, payloadKey: n, transformRows: r, columns: i }) {
	let a = s(() => i.map((e) => e.source), [i]), { fields: o, remove: c, appendEmpty: l } = Gn(e, a);
	fn(e), Rn(e, a, n, r);
	let u = s(() => i.map((t) => ({
		title: t.label ?? t.source,
		key: t.source,
		width: t.width,
		onHeaderCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		onCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		render: (n, r, i) => t.cell({
			name: Un(e, i, t.source),
			index: i,
			field: e
		})
	})), [i, e]);
	return /* @__PURE__ */ H("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ V(R.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ V(ie, {
				size: "small",
				pagination: !1,
				scroll: { x: "max-content" },
				dataSource: o.map((e) => ({
					...e,
					key: e.rowKey
				})),
				columns: [...u, {
					title: "",
					key: "__remove",
					width: 80,
					render: (e, t, n) => /* @__PURE__ */ V(x, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => c(n),
						children: "Remove"
					})
				}]
			}),
			/* @__PURE__ */ V(x, {
				type: "dashed",
				style: { marginTop: 8 },
				onClick: l,
				children: "Add row"
			})
		]
	});
}
function qn({ field: e, label: t, payloadKey: n, transformRows: r, sources: i, renderRow: a }) {
	let { fields: o, remove: s, appendEmpty: c } = Gn(e, i);
	return fn(e), Rn(e, i, n, r), /* @__PURE__ */ H("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ V(R.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ V(I, {
				orientation: "vertical",
				size: "middle",
				style: { width: "100%" },
				children: o.map((t, n) => /* @__PURE__ */ V(S, {
					size: "small",
					title: `Item ${n + 1}`,
					extra: /* @__PURE__ */ V(x, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => s(n),
						children: "Remove"
					}),
					children: a({
						field: e,
						index: n,
						name: (t) => Un(e, n, t)
					})
				}, t.rowKey))
			}),
			/* @__PURE__ */ V(x, {
				type: "dashed",
				style: { marginTop: 8 },
				onClick: c,
				children: "Add item"
			})
		]
	});
}
//#endregion
//#region src/crud/utils/formSectionErrors.ts
function Jn(e, t, n) {
	for (let r of e) if (t(r, n).invalid) return !0;
	return !1;
}
function Yn(e) {
	let t = c([]);
	for (; t.current.length < e;) t.current.push({ current: /* @__PURE__ */ new Set() });
	return t.current.length > e && (t.current.length = e), t.current;
}
function Xn(e, t) {
	let { control: n, getFieldState: r, setFocus: i } = W(), a = G({ control: n }), s = c(0), l = c(0);
	o(() => {
		if (a.submitCount === 0) return;
		let n = Object.keys(a.errors).length, o = a.submitCount !== s.current, c = !o && n > 0 && l.current === 0;
		if (s.current = a.submitCount, l.current = n, !o && !c || n === 0) return;
		let u = e.findIndex((e) => Jn(e.current, r, a));
		if (u < 0) return;
		t(u);
		let d = [...e[u].current].find((e) => r(e, a).invalid);
		d && requestAnimationFrame(() => {
			i(d);
		});
	}, [
		t,
		a,
		a.errors,
		a.submitCount,
		r,
		e,
		i
	]);
}
//#endregion
//#region src/crud/FormTabs.tsx
function Zn(e) {
	return null;
}
function Qn(e) {
	return r(e) && e.type === Zn;
}
function $n({ children: t, defaultActiveKey: n, activeKey: r, onChange: a, ...o }) {
	let { token: c } = z.useToken(), u = s(() => e.toArray(t).filter(Qn).map((e, t) => ({
		key: e.key ?? String(t),
		label: e.props.label,
		disabled: e.props.disabled,
		children: e.props.children
	})), [t]), d = Yn(u.length), f = r !== void 0, [p, m] = l(() => n ?? u[0]?.key ?? "0"), h = f ? r : p, g = i((e) => {
		f || m(e), a?.(e);
	}, [f, a]);
	Xn(d, i((e) => {
		let t = u[e]?.key;
		t != null && g(t);
	}, [g, u]));
	let { control: _, getFieldState: v } = W(), y = G({ control: _ });
	return /* @__PURE__ */ V(ae, {
		destroyOnHidden: !1,
		items: s(() => u.map((e, t) => {
			let n = Jn(d[t].current, v, y);
			return {
				key: e.key,
				label: n ? /* @__PURE__ */ V("span", {
					style: { color: c.colorError },
					children: e.label
				}) : e.label,
				disabled: e.disabled,
				children: /* @__PURE__ */ V(sn, {
					sourcesRef: d[t],
					children: e.children
				})
			};
		}), [
			y,
			v,
			d,
			u,
			c.colorError
		]),
		activeKey: h,
		onChange: g,
		...o
	});
}
//#endregion
//#region src/crud/FormSteps.tsx
function er(e) {
	return null;
}
function tr(e) {
	return r(e) && e.type === er;
}
function nr({ children: t, initialStep: n = 0, showNavigation: r = !0, allowStepSelect: a = !1, stepsStyle: o, navigationStyle: c, size: u, direction: d, type: f, status: p }) {
	let m = s(() => e.toArray(t).filter(tr), [t]), h = Yn(m.length), [g, _] = l(n), v = m.length - 1;
	Xn(h, _);
	let { control: y, getFieldState: b } = W(), S = G({ control: y }), C = s(() => m.map((e, t) => {
		let n = Jn(h[t].current, b, S);
		return {
			title: e.props.title,
			description: e.props.description,
			status: n ? "error" : void 0
		};
	}), [
		S,
		b,
		h,
		m
	]), w = i((e) => {
		_(e);
	}, []);
	return /* @__PURE__ */ H(B, { children: [
		/* @__PURE__ */ V(ne, {
			current: g,
			items: C,
			style: {
				marginBottom: 24,
				...o
			},
			onChange: a ? w : void 0,
			size: u,
			direction: d,
			type: f,
			status: p
		}),
		m.map((e, t) => /* @__PURE__ */ V("div", {
			style: { display: g === t ? void 0 : "none" },
			children: /* @__PURE__ */ V(sn, {
				sourcesRef: h[t],
				children: e.props.children
			})
		}, e.key ?? String(t))),
		r && m.length > 1 ? /* @__PURE__ */ H(I, {
			style: {
				marginTop: 16,
				...c
			},
			children: [/* @__PURE__ */ V(x, {
				disabled: g === 0,
				onClick: () => _((e) => e - 1),
				children: "Previous"
			}), /* @__PURE__ */ V(x, {
				type: "primary",
				disabled: g === v,
				onClick: () => _((e) => e + 1),
				children: "Next"
			})]
		}) : null
	] });
}
//#endregion
//#region src/crud/fields/FieldWrapper.tsx
function Q({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, children: o }) {
	let s = t ?? e, c = !s.includes("."), { control: l } = W(), u = an(), d = a ? void 0 : n ?? e, f = n ?? e;
	return fn(e, c), pn(e, c), /* @__PURE__ */ V(_e, {
		name: s,
		control: l,
		rules: {
			required: r ? `${f} is required` : !1,
			...i
		},
		render: ({ field: e, fieldState: t }) => /* @__PURE__ */ V(D.Item, {
			label: d,
			validateStatus: t.error ? "error" : void 0,
			help: t.error?.message,
			required: r && !a,
			style: a ? { marginBottom: 0 } : void 0,
			children: o({
				value: e.value,
				onChange: e.onChange,
				onBlur: e.onBlur,
				disabled: u?.disabled,
				name: s
			})
		})
	});
}
//#endregion
//#region src/crud/fields/TextField.tsx
function rr({ source: e, name: t, label: n, required: r, rules: i, placeholder: a, inputStyle: o, hideLabel: s }) {
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: s,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ V(k, {
			value: e,
			onChange: (e) => t(e.target.value),
			onBlur: n,
			placeholder: a,
			disabled: r,
			style: o
		})
	});
}
//#endregion
//#region src/crud/fields/NumberField.tsx
function ir({ source: e, name: t, label: n, required: r, rules: i, min: a, max: o, step: s, inputStyle: c, hideLabel: l }) {
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: l,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ V(A, {
			value: e,
			onChange: (e) => t(e),
			onBlur: n,
			min: a,
			max: o,
			step: s,
			disabled: r,
			style: {
				width: "100%",
				...c
			}
		})
	});
}
//#endregion
//#region src/crud/fields/BooleanField.tsx
function ar({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a }) {
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ V(re, {
			checked: !!e,
			onChange: t,
			disabled: n
		})
	});
}
//#endregion
//#region src/crud/fields/DateField.tsx
var or = "YYYY-MM-DD";
function sr({ source: e, name: t, label: n, required: r, rules: i, showTime: a, hideLabel: o }) {
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ V(w, {
			value: e ? Se(String(e)) : null,
			onChange: (e) => t(e ? e.format(a ? `${or} HH:mm:ss` : or) : null),
			onBlur: n,
			showTime: a,
			disabled: r,
			format: a ? `${or} HH:mm:ss` : or,
			style: { width: "100%" }
		})
	});
}
//#endregion
//#region src/crud/fields/SelectField.tsx
function cr({ source: e, name: t, label: n, required: r, rules: i, choices: a, mode: o, allowClear: s, hideLabel: c }) {
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: c,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ V(F, {
			value: e,
			onChange: t,
			options: a,
			mode: o,
			allowClear: s,
			disabled: n,
			style: { width: "100%" }
		})
	});
}
//#endregion
//#region src/crud/fields/PasswordField.tsx
function lr({ source: e, name: t, label: n, required: r, rules: i, autoComplete: a, hideLabel: o }) {
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ V(k.Password, {
			value: e,
			onChange: (e) => t(e.target.value),
			onBlur: n,
			disabled: r,
			autoComplete: a
		})
	});
}
function ur({ source: e, name: t, label: n, required: r, rules: i, confirmSource: a, confirmLabel: o = "Confirm password", autoComplete: s = "new-password", hideLabel: c }) {
	let l = xe({
		name: t ?? e,
		disabled: !a
	});
	return a ? /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V(lr, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		autoComplete: s,
		hideLabel: c
	}), /* @__PURE__ */ V(lr, {
		source: a,
		label: o,
		required: r,
		autoComplete: s,
		hideLabel: c,
		rules: { validate: (e) => !l || e === l || "Passwords do not match" }
	})] }) : /* @__PURE__ */ V(lr, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		autoComplete: s,
		hideLabel: c
	});
}
//#endregion
//#region src/crud/utils/useChoices.ts
var dr = /* @__PURE__ */ new Map(), fr = /* @__PURE__ */ new Map();
function pr(e, t) {
	return typeof e == "function" ? `fn:${t ?? ""}` : Array.isArray(e) ? `static:${e.length}` : `res:${e.resource}:${JSON.stringify(e.filter ?? {})}:${t ?? ""}`;
}
function mr(e, t) {
	return typeof t == "function" ? t(e) : String(e[t] ?? "");
}
async function hr(e, t, n, r, i) {
	return typeof e == "function" ? e({
		dataProvider: t,
		search: i
	}) : Array.isArray(e) ? e : (await t.getList(e.resource, {
		filter: {
			...e.filter,
			...i ? { q: i } : {}
		},
		pagination: {
			page: 1,
			perPage: 500
		}
	})).data.map((e) => ({
		label: mr(e, n),
		value: e[r],
		record: e
	}));
}
function gr(e, t, n, r, i) {
	let a = pr(e, i), o = dr.get(a);
	if (o && !i) return Promise.resolve(o);
	let s = fr.get(a);
	if (s) return s;
	let c = hr(e, t, n, r, i).then((e) => (i || dr.set(a, e), e)).finally(() => {
		fr.delete(a);
	});
	return fr.set(a, c), c;
}
function $(e, t, n = "name", r = "id", a) {
	let c = J(), u = s(() => {
		if (e) return e;
		if (t) return {
			resource: t,
			filter: a ? { q: a } : void 0
		};
	}, [
		e,
		t,
		a
	]), d = u ? pr(u, a) : void 0, [f, p] = l(() => !d || a ? [] : dr.get(d) ?? []), [m, h] = l(() => !d || a ? !!u : !dr.has(d)), g = i(async () => {
		if (!u) {
			p([]), h(!1);
			return;
		}
		let e = pr(u, a), t = dr.get(e);
		if (t && !a) {
			p(t), h(!1);
			return;
		}
		h(!0);
		try {
			p(await gr(u, c, n, r, a));
		} catch {
			p([]);
		} finally {
			h(!1);
		}
	}, [
		u,
		c,
		n,
		r,
		a
	]);
	o(() => {
		g();
	}, [g]);
	let _ = i((e) => f.find((t) => t.value === e)?.label ?? String(e ?? "—"), [f]);
	return {
		options: f,
		loading: m,
		labelForValue: _,
		labelsForValues: i((e) => e?.length ? e.map((e) => _(e)).join(", ") : "—", [_]),
		optionForValue: i((e) => f.find((t) => t.value === e), [f]),
		reload: g
	};
}
//#endregion
//#region src/crud/fields/ReferenceField.tsx
function _r({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: c, rules: u, search: d, allowClear: f, disabled: p, hideLabel: m, inputStyle: h, onValueChange: g }) {
	let [_, v] = l(), { options: y, loading: b, optionForValue: x } = $(i, r, a, o, d ? _ : void 0), S = s(() => y.map((e) => ({
		label: e.label,
		value: e.value
	})), [y]);
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: c,
		rules: u,
		hideLabel: m,
		children: ({ value: e, onChange: t, disabled: n, name: r }) => /* @__PURE__ */ V(F, {
			value: e,
			onChange: (e) => {
				t(e), g?.(e, x(e), { name: r });
			},
			options: S,
			loading: b && y.length === 0,
			showSearch: d,
			filterOption: d ? !1 : void 0,
			onSearch: d ? v : void 0,
			allowClear: f,
			disabled: n || p,
			optionFilterProp: "label",
			style: {
				width: "100%",
				minWidth: 160,
				...h
			}
		})
	});
}
//#endregion
//#region src/crud/fields/ReferenceManyField.tsx
function vr({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: c, rules: u, search: d, allowClear: f = !0, hideLabel: p }) {
	let [m, h] = l(), { options: g, loading: _ } = $(i, r, a, o, d ? m : void 0), v = s(() => g.map((e) => ({
		label: e.label,
		value: e.value
	})), [g]);
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: c,
		rules: u,
		hideLabel: p,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ V(F, {
			mode: "multiple",
			value: e ?? [],
			onChange: t,
			options: v,
			loading: _,
			showSearch: d,
			filterOption: d ? !1 : void 0,
			onSearch: d ? h : void 0,
			allowClear: f,
			disabled: n,
			optionFilterProp: "label",
			style: { width: "100%" }
		})
	});
}
//#endregion
//#region src/crud/columns/TextColumn.tsx
function yr({ source: e, label: t, sortable: n = !0 }) {
	return X(s(() => ({
		key: e,
		source: e,
		label: t,
		sortable: n,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: n ? !0 : void 0
		})
	}), [
		e,
		t,
		n
	])), null;
}
function br(e, t, n) {
	return typeof n == "function" ? n(e) : n ? mn(e, n) : e[t];
}
//#endregion
//#region src/crud/columns/NumberColumn.tsx
function xr({ source: e, label: t, sortable: n = !0 }) {
	return X(s(() => ({
		key: e,
		source: e,
		label: t,
		sortable: n,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: n ? !0 : void 0
		})
	}), [
		e,
		t,
		n
	])), null;
}
//#endregion
//#region src/crud/columns/BooleanColumn.tsx
function Sr({ source: e, label: t, sortable: n = !0 }) {
	return X(s(() => ({
		key: e,
		source: e,
		label: t,
		sortable: n,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: n ? !0 : void 0,
			render: (e) => e ? "Yes" : "No"
		})
	}), [
		e,
		t,
		n
	])), null;
}
//#endregion
//#region src/crud/columns/DateColumn.tsx
function Cr({ source: e, label: t, sortable: n = !0 }) {
	return X(s(() => ({
		key: e,
		source: e,
		label: t,
		sortable: n,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: n ? !0 : void 0,
			render: (e) => e ? String(e).slice(0, 10) : "—"
		})
	}), [
		e,
		t,
		n
	])), null;
}
//#endregion
//#region src/crud/columns/ReferenceColumn.tsx
function wr({ record: e, source: t, display: n, reference: r, choices: i, optionLabel: a, optionValue: o }) {
	let { labelForValue: s } = $(i, r, a, o), c = e[t];
	if (typeof n == "function") return /* @__PURE__ */ V(B, { children: n(e) });
	if (n && n !== t) {
		let r = br(e, t, n);
		return /* @__PURE__ */ V(B, { children: r == null ? "—" : String(r) });
	}
	return /* @__PURE__ */ V(B, { children: s(c) });
}
function Tr({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", display: o, sortable: c = !0 }) {
	return X(s(() => ({
		key: e,
		source: e,
		label: t,
		sortable: c,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: c ? !0 : void 0,
			render: (s, c) => /* @__PURE__ */ V(wr, {
				record: c,
				source: e,
				label: t,
				reference: n,
				choices: r,
				optionLabel: i,
				optionValue: a,
				display: o ?? i
			})
		})
	}), [
		e,
		t,
		c,
		n,
		r,
		i,
		a,
		o
	])), null;
}
//#endregion
//#region src/crud/columns/ReferenceManyColumn.tsx
function Er({ record: e, source: t, reference: n, choices: r, optionLabel: i, optionValue: a }) {
	let { labelsForValues: o } = $(r, n, i, a), s = e[t];
	return /* @__PURE__ */ V(B, { children: o(Array.isArray(s) ? s : []) });
}
function Dr({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", sortable: o = !1 }) {
	return X(s(() => ({
		key: e,
		source: e,
		label: t,
		sortable: o,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: o ? !0 : void 0,
			render: (t, o) => /* @__PURE__ */ V(Er, {
				record: o,
				source: e,
				reference: n,
				choices: r,
				optionLabel: i,
				optionValue: a
			})
		})
	}), [
		e,
		t,
		o,
		n,
		r,
		i,
		a
	])), null;
}
//#endregion
//#region src/crud/columns/CustomColumn.tsx
function Or({ source: e, label: t, sortable: n = !1, render: r }) {
	return X(s(() => ({
		key: e,
		source: e,
		label: t,
		sortable: n,
		buildColumn: () => ({
			title: t ?? e,
			key: e,
			render: (e, t) => r(t)
		})
	}), [
		e,
		t,
		n,
		r
	])), null;
}
//#endregion
//#region src/crud/filters/TextFilter.tsx
function kr({ source: e, label: t, placeholder: n }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: r, onChange: i }) => /* @__PURE__ */ V(k, {
			allowClear: !0,
			placeholder: n ?? t ?? e,
			value: r ?? "",
			onChange: (e) => i(e.target.value || void 0),
			style: { minWidth: 160 }
		})
	}), [
		e,
		t,
		n
	])), null;
}
//#endregion
//#region src/crud/filters/NumberFilter.tsx
function Ar({ source: e, label: t }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ V(A, {
			placeholder: t ?? e,
			value: n,
			onChange: (e) => r(e ?? void 0),
			style: { minWidth: 120 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/BooleanFilter.tsx
function jr({ source: e, label: t }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ V(F, {
			allowClear: !0,
			placeholder: t ?? e,
			value: n,
			onChange: (e) => r(e),
			options: [{
				label: "Yes",
				value: !0
			}, {
				label: "No",
				value: !1
			}],
			style: { minWidth: 100 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/DateFilter.tsx
function Mr({ source: e, label: t }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ V(w, {
			allowClear: !0,
			placeholder: t ?? e,
			value: n ? Se(String(n)) : null,
			onChange: (e) => r(e ? e.format("YYYY-MM-DD") : void 0),
			style: { minWidth: 160 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/SelectFilter.tsx
function Nr({ source: e, label: t, choices: n, multiple: r }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: i, onChange: a }) => /* @__PURE__ */ V(F, {
			allowClear: !0,
			mode: r ? "multiple" : void 0,
			placeholder: t ?? e,
			value: i,
			onChange: a,
			options: n,
			style: { minWidth: 160 }
		})
	}), [
		e,
		t,
		n,
		r
	])), null;
}
//#endregion
//#region src/crud/filters/ReferenceFilter.tsx
function Pr({ source: e, label: t, reference: n, choices: r, optionLabel: i, optionValue: a, multiple: o, search: s, value: c, onChange: u }) {
	let [d, f] = l(), { options: p, loading: m } = $(r, n, i, a, s ? d : void 0);
	return /* @__PURE__ */ V(F, {
		allowClear: !0,
		mode: o ? "multiple" : void 0,
		placeholder: t ?? e,
		value: c,
		onChange: u,
		options: p.map((e) => ({
			label: e.label,
			value: e.value
		})),
		loading: m,
		showSearch: s,
		filterOption: s ? !1 : void 0,
		onSearch: s ? f : void 0,
		optionFilterProp: "label",
		style: { minWidth: 180 }
	});
}
function Fr({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", multiple: o, search: c }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: s, onChange: l }) => /* @__PURE__ */ V(Pr, {
			source: e,
			label: t,
			reference: n,
			choices: r,
			optionLabel: i,
			optionValue: a,
			multiple: o,
			search: c,
			value: s,
			onChange: l
		})
	}), [
		e,
		t,
		n,
		r,
		i,
		a,
		o,
		c
	])), null;
}
function Ir(e) {
	return /* @__PURE__ */ V(Fr, {
		...e,
		multiple: !0
	});
}
//#endregion
export { ft as AdminApp, et as AdminLayout, ke as AppThemeProvider, Ut as AuthAlternateLink, Wt as AuthPageLayout, Le as AuthProvider, Sr as BooleanColumn, ar as BooleanField, jr as BooleanFilter, Or as CustomColumn, mt as DataProvider, Cr as DateColumn, sr as DateField, Mr as DateFilter, Me as DensitySwitch, Q as FieldWrapper, Pn as FilterBar, er as FormStep, nr as FormSteps, Zn as FormTab, $n as FormTabs, tt as Guard, rt as GuestOnly, Kn as InlineFormSet, qn as InlineFormSetStacked, Gt as LoginPage, xr as NumberColumn, ir as NumberField, Ar as NumberFilter, ur as PasswordField, He as PermissionsProvider, Kt as PlaceholderPage, nt as Protected, Tr as ReferenceColumn, _r as ReferenceField, Fr as ReferenceFilter, Dr as ReferenceManyColumn, vr as ReferenceManyField, Ir as ReferenceManyFilter, it as RequirePermission, Hn as ResourceForm, xn as ResourceFormModal, Mn as ResourceList, cr as SelectField, Nr as SelectFilter, yr as TextColumn, rr as TextField, kr as TextFilter, Pe as ThemeSwitch, Fe as ThemeToolbar, It as applyInMemoryListParams, Y as asStringMessages, gn as buildFormPayload, zn as buildInlineRowsPayload, _t as combineResourceHandlers, dt as createAdminRouter, Lt as createMemoryResourceHandlers, Ue as createPermissionsChecker, Rt as createRestResourceHandlers, Be as createSessionStorageAuthAdapter, lt as deriveAuthPaths, Ge as filterNavByPermission, Pt as filterRows, Ct as finalizeFormErrors, St as flattenNestedArrayErrors, bt as getErrorBody, mn as getFormValue, at as getRouteAccess, jt as getRowById, vt as isAbortError, Un as nestedFieldPath, Tt as parseDjangoDRFFormErrors, Et as parseDotNetFormErrors, Dt as parseNodeFormErrors, ot as partitionAdminRoutes, hn as setFormValue, Bt as toDjangoRestOrdering, Ht as toJsonApiSort, Vt as toODataOrderBy, bn as useAbortableEffect, Re as useAuth, We as useCan, $ as useChoices, J as useDataProvider, On as useListQueryState, K as usePermissions, fn as useRegisterPayloadField, pn as useRegisterSectionField, An as useResourceListContext, Ae as useThemeMode };
