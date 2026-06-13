import { Children as e, createContext as t, createElement as n, isValidElement as r, useCallback as i, useContext as a, useEffect as o, useMemo as s, useRef as c, useState as l } from "react";
import { Link as u, Navigate as d, Outlet as f, RouterProvider as p, createBrowserRouter as m, useLocation as h, useNavigate as g, useParams as _, useSearchParams as v } from "react-router-dom";
import { App as y, Avatar as b, Button as x, Card as S, ConfigProvider as C, DatePicker as w, Drawer as T, Dropdown as ee, Flex as E, Form as D, Grid as O, Input as k, InputNumber as A, Layout as j, Menu as te, Modal as M, Popover as N, Segmented as P, Select as F, Space as I, Spin as ne, Steps as L, Switch as re, Table as ie, Tabs as ae, Typography as R, theme as z } from "antd";
import { Fragment as B, jsx as V, jsxs as H } from "react/jsx-runtime";
import { ArrowLeftOutlined as U, CaretDownOutlined as oe, CaretUpOutlined as se, ColumnHeightOutlined as W, DesktopOutlined as ce, LayoutOutlined as le, LogoutOutlined as ue, MenuOutlined as de, MoonOutlined as fe, SettingOutlined as pe, SunOutlined as me, UserOutlined as he } from "@ant-design/icons";
import { Controller as ge, FormProvider as _e, useFieldArray as ve, useForm as ye, useFormContext as be, useWatch as G } from "react-hook-form";
import K from "dayjs";
//#region src/context/AppThemeProvider.tsx
var xe = t(null);
function Se(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "light" || t === "dark" || t === "system") return t;
	} catch {}
	return "system";
}
function Ce() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function we(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "comfortable" || t === "compact") return t;
	} catch {}
	return "comfortable";
}
var Te = "ding-react-admin-theme-mode", Ee = "ding-react-admin-theme-density";
function De({ children: e, modeStorageKey: t = Te, densityStorageKey: n = Ee }) {
	let [r, i] = l(() => Se(t)), [a, c] = l(() => we(n)), [u, d] = l(Ce);
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
	return /* @__PURE__ */ V(xe.Provider, {
		value: g,
		children: /* @__PURE__ */ V(C, {
			theme: h,
			children: e
		})
	});
}
function Oe() {
	let e = a(xe);
	if (!e) throw Error("useThemeMode must be used within AppThemeProvider");
	return e;
}
//#endregion
//#region src/components/DensitySwitch.tsx
var ke = [{
	label: "Comfortable",
	value: "comfortable",
	icon: /* @__PURE__ */ V(le, {})
}, {
	label: "Compact",
	value: "compact",
	icon: /* @__PURE__ */ V(W, {})
}];
function Ae() {
	let { density: e, setDensity: t } = Oe();
	return /* @__PURE__ */ V(P, {
		size: "small",
		value: e,
		options: ke,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeSwitch.tsx
var je = [
	{
		label: "Light",
		value: "light",
		icon: /* @__PURE__ */ V(me, {})
	},
	{
		label: "Dark",
		value: "dark",
		icon: /* @__PURE__ */ V(fe, {})
	},
	{
		label: "Auto",
		value: "system",
		icon: /* @__PURE__ */ V(ce, {})
	}
];
function Me() {
	let { mode: e, setMode: t } = Oe();
	return /* @__PURE__ */ V(P, {
		size: "small",
		value: e,
		options: je,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeToolbar.tsx
function Ne() {
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
			children: [/* @__PURE__ */ V(Me, {}), /* @__PURE__ */ V(Ae, {})]
		}),
		styles: { content: { padding: e.paddingSM } },
		children: /* @__PURE__ */ V(x, {
			type: "default",
			icon: /* @__PURE__ */ V(pe, {}),
			"aria-label": "Display and theme settings"
		})
	});
}
//#endregion
//#region src/context/AuthProvider.tsx
var Pe = t(null);
function Fe({ children: e, adapter: t }) {
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
	return /* @__PURE__ */ V(Pe.Provider, {
		value: c,
		children: e
	});
}
function Ie() {
	let e = a(Pe);
	if (!e) throw Error("useAuth must be used within AuthProvider");
	return e;
}
var Le = "ding-react-admin-auth";
function Re(e = Le) {
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
var ze = t(null);
function Be({ children: e, can: t }) {
	let n = s(() => t, [t]);
	return /* @__PURE__ */ V(ze.Provider, {
		value: n,
		children: e
	});
}
function q() {
	let e = a(ze);
	if (!e) throw Error("usePermissions must be used within PermissionsProvider");
	return e;
}
function Ve(e) {
	return (t) => e()?.includes(t) ?? !1;
}
function He(e) {
	let t = q();
	return i(() => t(e), [t, e]);
}
//#endregion
//#region src/permissions/resourcePermissions.ts
function J(e, t, n) {
	if (!t) return !0;
	let r = t[n];
	return n === "read" && !r && (r = t.list), r ? e(r) : !1;
}
function Ue(e, t) {
	return e.map((e) => {
		if (e.children?.length) {
			let n = Ue(e.children, t);
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
var We = "#001529", Ge = "ding-react-admin-sider-collapsed";
function Ke(e) {
	try {
		return localStorage.getItem(e) === "1";
	} catch {
		return !1;
	}
}
function qe() {
	return O.useBreakpoint().lg !== !0;
}
function Je(e) {
	let t = /* @__PURE__ */ new Set();
	function n(e) {
		for (let r of e) r.children?.length ? n(r.children) : t.add(r.path);
	}
	return n(e), t;
}
function Ye(e, t) {
	function n(e) {
		for (let r of e) if (r.children?.length) {
			let e = n(r.children);
			if (e !== null) return [r.path, ...e];
		} else if (r.path === t) return [];
		return null;
	}
	return n(e) ?? [];
}
function Xe(e) {
	return e.map((e) => {
		let t = e.Icon, n = t ? /* @__PURE__ */ V(t, {}) : void 0;
		return e.children?.length ? {
			key: e.path,
			icon: n,
			label: e.label,
			children: Xe(e.children)
		} : {
			key: e.path,
			icon: n,
			label: e.label
		};
	});
}
function Ze({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a }) {
	return /* @__PURE__ */ V(te, {
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
function Qe({ navItems: e, brand: t = "Admin", collapsedBrand: n = "A", mobileDrawerTitle: r, headerExtras: a, userMenuItems: c, onUserMenuClick: u, loginPath: d = "/login", siderCollapsedStorageKey: p = Ge }) {
	let m = g(), _ = h(), { resolved: v } = Oe(), y = v === "dark", { logout: S } = Ie(), C = q(), [w, E] = l(() => Ke(p)), [D, O] = l(!1), k = qe(), { token: A } = z.useToken(), te = r ?? t, M = () => {
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
	let P = s(() => Ue(e, C), [e, C]), F = s(() => Je(P), [P]), I = s(() => Xe(P), [P]), ne = s(() => Ye(P, _.pathname), [P, _.pathname]), [L, re] = l(() => Ye(P, _.pathname));
	o(() => {
		re((e) => [...new Set([...e, ...ne])]);
	}, [ne]);
	let ie = i((e) => {
		re(e);
	}, []), ae = s(() => [{
		key: "logout",
		icon: /* @__PURE__ */ V(ue, {}),
		label: "Log out",
		danger: !0
	}], []), B = c ?? ae, U = (e) => {
		if (u) {
			u(e);
			return;
		}
		e.key === "logout" && M();
	}, oe = y ? A.colorBgContainer : We, se = [_.pathname], W = (e) => {
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
					background: oe,
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
				}), /* @__PURE__ */ V(Ze, {
					menuItems: I,
					selectedKeys: se,
					inlineCollapsed: w,
					openKeys: L,
					onOpenChange: ie,
					onNavigate: W
				})]
			}),
			k && /* @__PURE__ */ V(T, {
				title: /* @__PURE__ */ V(R.Text, {
					strong: !0,
					style: { color: A.colorTextLightSolid },
					children: te
				}),
				placement: "left",
				size: 280,
				onClose: () => O(!1),
				open: D,
				styles: {
					header: {
						background: oe,
						borderBottom: `1px solid ${A.colorSplit}`
					},
					body: {
						padding: 0,
						background: oe
					}
				},
				destroyOnHidden: !0,
				children: /* @__PURE__ */ V(Ze, {
					menuItems: I,
					selectedKeys: se,
					inlineCollapsed: !1,
					openKeys: L,
					onOpenChange: ie,
					onNavigate: W
				})
			}),
			/* @__PURE__ */ H(j, { children: [/* @__PURE__ */ H(j.Header, {
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
						icon: /* @__PURE__ */ V(de, {}),
						onClick: () => O(!0),
						"aria-label": "Open navigation"
					}),
					/* @__PURE__ */ V("div", { style: {
						flex: 1,
						minWidth: 0
					} }),
					a,
					/* @__PURE__ */ V(Ne, {}),
					/* @__PURE__ */ V(ee, {
						menu: {
							items: B,
							onClick: U
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
								icon: /* @__PURE__ */ V(he, {})
							}), !k && /* @__PURE__ */ V(R.Text, {
								type: "secondary",
								children: "User"
							})]
						})
					})
				]
			}), /* @__PURE__ */ V(j.Content, {
				style: { margin: k ? A.marginSM : A.marginLG },
				children: /* @__PURE__ */ V(f, {})
			})] })
		]
	});
}
//#endregion
//#region src/router/guards.tsx
function $e({ when: e, redirect: t, children: n }) {
	return e ? n : /* @__PURE__ */ V(d, {
		to: t,
		replace: !0
	});
}
function et({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = Ie();
	return /* @__PURE__ */ V($e, {
		when: n,
		redirect: t,
		children: e
	});
}
function tt({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = Ie();
	return /* @__PURE__ */ V($e, {
		when: !n,
		redirect: t,
		children: e
	});
}
function nt({ permission: e, redirect: t, children: n }) {
	return /* @__PURE__ */ V($e, {
		when: q()(e),
		redirect: t,
		children: n
	});
}
//#endregion
//#region src/router/routeAccess.ts
function rt(e) {
	return e.access ?? "protected";
}
function it(e) {
	let t = [], n = [], r = [];
	for (let i of e) {
		let e = rt(i);
		e === "guest" ? t.push(i) : e === "public" ? n.push(i) : r.push(i);
	}
	return {
		guest: t,
		public: n,
		protected: r
	};
}
function at(e) {
	return e.replace(/^\/+/, "");
}
function ot(e) {
	return `/${at(e)}`;
}
function st(e, t) {
	let { guest: n, protected: r } = it(e), i = n.find((e) => "path" in e && e.path), a = r.find((e) => "index" in e && e.index), o = r.find((e) => "path" in e && e.path), s = t?.unauthenticated;
	!s && i && "path" in i && i.path && (s = ot(i.path));
	let c = t?.afterLogin;
	if (c || (a ? c = "/" : o && "path" in o && o.path && (c = ot(o.path))), r.length > 0 && !s) throw Error("createAdminRouter: protected routes require redirects.unauthenticated or a guest route (access: \"guest\").");
	if (n.length > 0 && !c) throw Error("createAdminRouter: guest routes require redirects.afterLogin or a protected route (index or path).");
	return {
		loginPath: s ?? "/",
		homePath: c ?? "/"
	};
}
function ct(e) {
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
function lt({ navItems: e, children: t, layoutProps: n, redirects: r }) {
	let { loginPath: i, homePath: a } = st(t, r), { guest: o, public: s, protected: c } = it(t), l = [];
	for (let e of o) !("path" in e) || !e.path || l.push({
		path: at(e.path),
		element: /* @__PURE__ */ V(tt, {
			redirectTo: a,
			children: e.element
		})
	});
	for (let e of s) !("path" in e) || !e.path || l.push({
		path: at(e.path),
		element: e.element
	});
	return c.length > 0 && l.push({
		path: "/",
		element: /* @__PURE__ */ V(et, {
			redirectTo: i,
			children: /* @__PURE__ */ V(Qe, {
				navItems: e,
				loginPath: i,
				...n
			})
		}),
		children: c.map(ct)
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
function ut({ navItems: e, routes: t, authRedirects: n, layoutProps: r, theme: i }) {
	let a = s(() => lt({
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
	return /* @__PURE__ */ V(De, {
		...i,
		children: /* @__PURE__ */ V(p, { router: a })
	});
}
//#endregion
//#region src/context/DataProvider.tsx
var dt = t(null);
function ft({ children: e, value: t }) {
	let n = s(() => t, [t]);
	return /* @__PURE__ */ V(dt.Provider, {
		value: n,
		children: e
	});
}
function pt() {
	let e = a(dt);
	if (!e) throw Error("useDataProvider must be used within DataProvider");
	return e;
}
//#endregion
//#region src/data/resourceHandlers.ts
function mt(e) {
	return "handlers" in e ? e : { handlers: e };
}
function ht(e, t, n) {
	if (!(!e || !t) && !J(e, t, n)) throw Error("Forbidden");
}
function gt(e, t) {
	let { can: n, guard: r, parseFormError: i } = t ?? {}, a = (t) => {
		let n = e[t];
		if (!n) throw Error(`Unknown resource: ${t}`);
		return mt(n);
	};
	return {
		async getList(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "list"), ht(n, o, "list"), i.getList(t);
		},
		async getOne(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "read"), ht(n, o, "read"), i.getOne(t);
		},
		async create(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "add"), ht(n, o, "add"), i.create(t);
		},
		async update(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "change"), ht(n, o, "change"), i.update(t);
		},
		async delete(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "delete"), ht(n, o, "delete"), i.delete(t);
		},
		parseFormError: i
	};
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
function _t(e) {
	return e.length === 1 ? e[0] : e;
}
function vt(e) {
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
function yt(e, t) {
	if (t.inlineArrayName == null || t.rowIndex == null) return e;
	let n = `${t.inlineArrayName}.${t.rowIndex}.`, r = {};
	for (let [t, i] of Object.entries(e)) r[n + t] = i;
	return r;
}
function bt(e, t, n) {
	let r = yt(e, n);
	return {
		fields: Object.keys(r).length ? r : void 0,
		global: t.length ? t : void 0
	};
}
var xt = new Set(["non_field_errors", "detail"]);
function St(e, t) {
	let n = vt(e);
	if (!n) return null;
	let r = {}, i = [];
	for (let [e, t] of Object.entries(n)) {
		if (xt.has(e)) {
			i.push(...Y(t));
			continue;
		}
		let n = Y(t);
		n.length && (r[e] = _t(n));
	}
	return !Object.keys(r).length && !i.length ? null : bt(r, i, t);
}
function Ct(e, t, n) {
	let r = vt(e);
	if (!r) return null;
	let i = n?.camelCase ?? !0, a = n?.fieldMap, o = {}, s = [];
	n?.includeSummary && (s.push(...Y(r.title)), s.push(...Y(r.message)));
	let c = r.errors;
	if (c && typeof c == "object" && !Array.isArray(c)) for (let [e, t] of Object.entries(c)) {
		let n = a?.[e] ?? (i ? Et(e) : e), r = Y(t);
		r.length && (o[n] = _t(r));
	}
	return !Object.keys(o).length && !s.length ? null : bt(o, s, t);
}
function wt(e, t, n) {
	let r = vt(e);
	if (!r) return null;
	let i = {}, a = [], o = n?.fieldMap, s = r.errors;
	if (Array.isArray(s)) for (let e of s) {
		if (!e || typeof e != "object") continue;
		let t = e, n = typeof t.path == "string" && t.path || typeof t.param == "string" && t.param || typeof t.field == "string" && t.field, r = Y(t.msg)[0] ?? Y(t.message)[0];
		r && (n ? Tt(i, o?.[n] ?? n, r) : a.push(r));
	}
	else if (s && typeof s == "object") for (let [e, t] of Object.entries(s)) {
		let n = o?.[e] ?? e, r = Y(t);
		r.length && (i[n] = _t(r));
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
	return a.push(...Y(r.error)), !Object.keys(i).length && !a.length ? null : bt(i, a, t);
}
function Tt(e, t, n) {
	let r = e[t];
	if (!r) {
		e[t] = n;
		return;
	}
	e[t] = Array.isArray(r) ? [...r, n] : [r, n];
}
function Et(e) {
	return e && e.charAt(0).toLowerCase() + e.slice(1);
}
//#endregion
//#region src/data/inMemoryList.ts
function Dt(e, t) {
	return e === t || String(e) === String(t);
}
function Ot(e, t) {
	let n = e.find((e) => Dt(e.id, t));
	if (!n) throw Error("Not found");
	return n;
}
function kt(e, t) {
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
function At(e, t) {
	return t == null || t === "" ? !0 : Array.isArray(t) ? t.length === 0 ? !0 : Array.isArray(e) ? t.some((t) => e.includes(t)) : t.includes(e) : Array.isArray(e) ? e.includes(t) : typeof t == "string" && typeof e == "string" ? e.toLowerCase().includes(t.toLowerCase()) : e === t;
}
function jt(e, t) {
	return t ? e.filter((e) => Object.entries(t).every(([t, n]) => At(e[t], n))) : e;
}
function Mt(e, t, n) {
	let r = (t - 1) * n;
	return {
		data: e.slice(r, r + n),
		total: e.length
	};
}
function Nt(e, t) {
	let { pagination: n, sort: r, filter: i } = t, a = jt(e, i);
	if (r) {
		let e = Array.isArray(r) ? r : [r];
		e.length > 0 && e[0]?.field && (a = kt(a, e));
	}
	return n ? Mt(a, n.page, n.perPage) : {
		data: a,
		total: a.length
	};
}
//#endregion
//#region src/data/createMemoryResourceHandlers.ts
function Pt(e) {
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
			return Nt(t(e.scopeList ? e.scopeList(e.getRows(), n) : e.getRows()), n);
		},
		async getOne(t) {
			return { data: Ot(e.getRows(), t) };
		},
		async create(t) {
			let r = n(t, e.nextId());
			return e.getRows().push(r), { data: r };
		},
		async update({ id: t, data: n }) {
			let i = Ot(e.getRows(), t), a = r(i, n);
			return Object.assign(i, a), { data: i };
		},
		async delete(t) {
			let n = e.getRows(), r = n.findIndex((e) => Dt(e.id, t));
			if (r < 0) return { data: null };
			let [i] = n.splice(r, 1);
			return e.afterDelete?.(i), { data: i };
		}
	};
}
//#endregion
//#region src/data/createRestResourceHandlers.ts
function Ft(e) {
	return {
		async getList(t) {
			return e.list(t);
		},
		async getOne(t) {
			return { data: await e.retrieve(t) };
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
function It(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function Lt(e) {
	let t = It(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function Rt(e) {
	let t = It(e);
	if (t.length !== 0) return t.map((e) => `${e.field} ${e.order === "DESC" ? "desc" : "asc"}`).join(",");
}
function zt(e) {
	let t = It(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
//#endregion
//#region src/components/AuthAlternateLink.tsx
function Bt({ prompt: e, linkText: t, to: n }) {
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
function Vt({ children: e, brand: t, footer: n, showThemeToolbar: r = !0 }) {
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
				children: /* @__PURE__ */ V(Ne, {})
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
function Ht({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, brand: r, extraFields: i, showThemeToolbar: a = !0, afterLoginPath: o = "/", alternateAuth: s, footer: c }) {
	let { login: l } = Ie(), u = g();
	return /* @__PURE__ */ V(Vt, {
		brand: r ?? n,
		footer: c ?? (s ? /* @__PURE__ */ V(Bt, {
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
function Ut({ title: e }) {
	return /* @__PURE__ */ V(R.Title, {
		level: 3,
		style: { marginTop: 0 },
		children: e
	});
}
//#endregion
//#region src/crud/utils/sortQueryParam.ts
function Wt(e) {
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
function Gt(e) {
	return e.length === 0 ? null : e.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function Kt(e) {
	return new Map(e.map((e, t) => [e.field, t + 1]));
}
//#endregion
//#region src/crud/context/ListContext.tsx
var qt = t(null);
function Jt({ children: e, toggleSort: t, sort: n }) {
	let [r, a] = l([]), o = s(() => new Set(n.map((e) => e.field)), [n]), c = s(() => new Map(n.map((e) => [e.field, e.order])), [n]), u = s(() => Kt(n), [n]), d = i((e) => (a((t) => {
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
	return /* @__PURE__ */ V(qt.Provider, {
		value: f,
		children: e
	});
}
function Yt() {
	let e = a(qt);
	if (!e) throw Error("Column components must be used within ResourceList");
	return e;
}
function X(e) {
	let { registerColumn: t } = Yt();
	o(() => t(e), [t, e]);
}
//#endregion
//#region src/crud/context/FilterContext.tsx
var Xt = t(null);
function Zt({ children: e, values: t, setFilterValue: n }) {
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
	return /* @__PURE__ */ V(Xt.Provider, {
		value: c,
		children: e
	});
}
function Qt() {
	return a(Xt);
}
function Z(e) {
	let t = Qt()?.registerFilter;
	o(() => {
		if (t) return t(e);
	}, [t, e]);
}
//#endregion
//#region src/crud/context/FormContext.tsx
var $t = t(null);
function en({ children: e, resource: t, isNew: n, disabled: r }) {
	return /* @__PURE__ */ V($t.Provider, {
		value: {
			resource: t,
			isNew: n,
			disabled: r
		},
		children: e
	});
}
function tn() {
	return a($t);
}
//#endregion
//#region src/crud/context/FormFieldsContext.tsx
var nn = t(null);
function rn({ children: e, sourcesRef: t }) {
	let n = c(/* @__PURE__ */ new Set()), r = t ?? n, a = i((e) => (r.current.add(e), () => {
		r.current.delete(e);
	}), [r]), o = i(() => Array.from(r.current), [r]), l = s(() => ({
		registerSource: a,
		getSources: o
	}), [a, o]);
	return /* @__PURE__ */ V(nn.Provider, {
		value: l,
		children: e
	});
}
function an() {
	return a(nn);
}
function on(e) {
	let t = an()?.registerSource;
	o(() => {
		if (t) return t(e);
	}, [t, e]);
}
//#endregion
//#region src/crud/utils/getByPath.ts
function sn(e, t) {
	let n = t.split("."), r = e;
	for (let e of n) {
		if (typeof r != "object" || !r) return;
		r = r[e];
	}
	return r;
}
//#endregion
//#region src/crud/utils/setByPath.ts
function cn(e, t, n) {
	let r = t.split("."), i = e;
	for (let e = 0; e < r.length - 1; e++) {
		let t = r[e], n = i[t];
		(typeof n != "object" || !n || Array.isArray(n)) && (i[t] = {}), i = i[t];
	}
	i[r[r.length - 1]] = n;
}
//#endregion
//#region src/crud/utils/pickBySources.ts
function ln(e, t) {
	if (t.length === 0) return { ...e };
	let n = {};
	for (let r of t) {
		let t = sn(e, r);
		t !== void 0 && cn(n, r, t);
	}
	return n;
}
//#endregion
//#region src/crud/utils/formErrors.ts
function un(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function dn(e, t, n) {
	for (let e of un(t.global)) n.error(e);
	for (let [n, r] of Object.entries(t.fields ?? {})) {
		let t = Array.isArray(r) ? r.join(", ") : r;
		e.setError(n, {
			type: "server",
			message: t
		});
	}
}
function fn(e, t, n, r, i) {
	let a = e.parseFormError?.(r, i);
	if (!a) return !1;
	let o = Object.keys(a.fields ?? {}).length > 0, s = un(a.global).length > 0;
	return !o && !s ? !1 : (dn(t, a, n), !0);
}
//#endregion
//#region src/crud/ResourceFormModal.tsx
function pn({ resource: e, editId: t, onClose: n, children: r, title: a }) {
	let s = t === "new" || t == null, u = t != null, d = pt(), { message: f } = y.useApp(), [p, m] = l(!s), h = ye(), g = c(/* @__PURE__ */ new Set()), _ = i(async () => {
		if (s || !t) {
			h.reset({}), m(!1);
			return;
		}
		m(!0);
		try {
			let n = await d.getOne(e, t);
			h.reset(n.data);
		} catch (e) {
			f.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			m(!1);
		}
	}, [
		d,
		e,
		t,
		s,
		h,
		f
	]);
	o(() => {
		u && _();
	}, [u, _]);
	async function v(r) {
		try {
			let i = ln(r, Array.from(g.current));
			s ? (await d.create(e, i), f.success("Created")) : t && (await d.update(e, {
				id: t,
				data: i
			}), f.success("Updated")), n();
		} catch (t) {
			fn(d, h, f, t, {
				resource: e,
				mutation: s ? "create" : "update"
			}) || f.error(t instanceof Error ? t.message : "Save failed");
		}
	}
	return /* @__PURE__ */ V(M, {
		open: u,
		title: a ?? (s ? `New ${e}` : `Edit ${e}`),
		onCancel: n,
		footer: null,
		destroyOnHidden: !0,
		width: 560,
		children: p ? /* @__PURE__ */ V(ne, {}) : /* @__PURE__ */ V(en, {
			resource: e,
			isNew: s,
			children: /* @__PURE__ */ V(rn, {
				sourcesRef: g,
				children: /* @__PURE__ */ V(_e, {
					...h,
					children: /* @__PURE__ */ H(D, {
						layout: "vertical",
						onFinish: () => void h.handleSubmit(v)(),
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
function mn({ selectedCount: e, total: t, allPageSelected: n, allMatchingSelected: r, onSelectAllMatching: a, onClearSelection: o, actions: c, onExecute: u, selectedIds: d, running: f = !1 }) {
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
var hn = new Set([
	"page",
	"perPage",
	"sort",
	"create",
	"edit"
]), gn = 1, _n = 10;
function vn(e) {
	if (e.includes(",")) {
		let t = e.split(",").map((e) => e.trim()), n = t.map(Number);
		return n.every((e) => Number.isFinite(e)) ? n : t;
	}
	let t = Number(e);
	return e !== "" && Number.isFinite(t) && String(t) === e ? t : e === "true" ? !0 : e === "false" ? !1 : e;
}
function yn(e) {
	return e == null || e === "" ? null : Array.isArray(e) ? e.length === 0 ? null : e.map(String).join(",") : String(e);
}
function bn(e) {
	let [t, n] = v(), r = s(() => {
		let n = t.get("page"), r = t.get("perPage"), i = n ? Math.max(1, Number(n) || gn) : gn, a = r ? Math.max(1, Number(r) || _n) : _n, o = t.getAll("sort"), s = o.length > 0 ? o.flatMap((e) => Wt(e)) : Wt(t.get("sort")), c = { ...e };
		return t.forEach((e, n) => {
			if (hn.has(n)) return;
			let r = c[n];
			r === void 0 ? t.getAll(n).length > 1 ? c[n] = t.getAll(n).map(vn) : c[n] = vn(e) : c[n] = [...Array.isArray(r) ? r : [r], vn(e)];
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
				e === _n ? t.delete("perPage") : t.set("perPage", String(e)), t.delete("page");
			});
		},
		setSort: (e) => {
			a((t) => {
				t.delete("sort");
				let n = Gt(e);
				n && t.set("sort", n);
			});
		},
		toggleSort: (e) => {
			a((t) => {
				let n = t.getAll("sort").flatMap((e) => Wt(e)), r = n.findIndex((t) => t.field === e), i;
				i = r < 0 ? [...n, {
					field: e,
					order: "ASC"
				}] : n[r].order === "ASC" ? n.map((e, t) => t === r ? {
					...e,
					order: "DESC"
				} : e) : n.filter((e, t) => t !== r), t.delete("sort");
				let a = Gt(i);
				a && t.set("sort", a);
			});
		},
		setFilter: (e, t) => {
			a((n) => {
				n.delete(e);
				let r = yn(t);
				r != null && n.set(e, r), n.delete("page");
			});
		},
		setFilters: (e) => {
			a((t) => {
				for (let e of [...t.keys()]) hn.has(e) || t.delete(e);
				for (let [n, r] of Object.entries(e)) {
					let e = yn(r);
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
var xn = t(null);
function Sn() {
	return a(xn);
}
function Cn({ resource: e, title: t, pathPrefix: n, newPath: r, editMode: a = "page", formChildren: c, actions: d, rowActions: f, headerExtra: p, bulkActions: m, bulkDelete: h = !0, bulkActionsEnabled: g = !0, permissions: _, queryState: v, queryActions: b }) {
	let C = pt(), w = q(), { message: T, modal: ee } = y.useApp(), { columns: E, sortOrders: D, sortPriorities: O } = Yt(), [k, A] = l(!1), [j, te] = l([]), [M, N] = l(0), [P, F] = l(() => /* @__PURE__ */ new Set()), [ne, L] = l(!1), re = r ?? `${n}/new`, ae = J(w, _, "add"), z = J(w, _, "change"), U = J(w, _, "delete"), W = z && (a === "page" || a === "both") && d?.edit !== !1, ce = z && (a === "modal" || a === "both") && d?.quickEdit !== !1, le = U && d?.delete !== !1, ue = W || ce || le || f, de = i(() => {
		F(/* @__PURE__ */ new Set());
	}, []), fe = s(() => {
		if (!g) return [];
		let t = [];
		return h && U && t.push({
			key: "__delete",
			label: "Delete selected",
			confirm: (e) => `Delete ${e.length} selected item(s)? This cannot be undone.`,
			execute: async (t, { reload: n, clearSelection: r }) => {
				await Promise.all(t.map((t) => C.delete(e, t))), r(), n(), T.success(`Deleted ${t.length} item(s)`);
			}
		}), [...t, ...m ?? []];
	}, [
		g,
		h,
		U,
		m,
		C,
		e,
		T
	]), pe = fe.length > 0, me = P.size, he = j.length > 0 && j.every((e) => P.has(e.id)), ge = M > 0 && me >= M, _e = s(() => j.filter((e) => P.has(e.id)).map((e) => e.id), [j, P]), ve = i((e) => {
		F((t) => {
			let n = new Set(t), r = j.map((e) => e.id);
			for (let t of r) e.includes(t) || n.delete(t);
			for (let t of e) n.add(t);
			return n;
		});
	}, [j]), ye = i(async () => {
		if (!(M <= 0)) {
			L(!0);
			try {
				let t = v.sort.length === 0 ? void 0 : v.sort.length === 1 ? v.sort[0] : v.sort, n = await C.getList(e, {
					pagination: {
						page: 1,
						perPage: M
					},
					sort: t,
					filter: v.filter
				});
				F(new Set(n.data.map((e) => e.id)));
			} catch (e) {
				T.error(e instanceof Error ? e.message : "Load failed");
			} finally {
				L(!1);
			}
		}
	}, [
		C,
		e,
		M,
		v.sort,
		v.filter,
		T
	]), be = i((e) => {
		let t = (e) => {
			let t = e?.columnKey ?? e?.field;
			return t == null ? null : String(Array.isArray(t) ? t[0] : t);
		};
		if (Array.isArray(e)) {
			let n = e.find((e) => e?.order);
			if (n) {
				let e = t(n);
				e && b.toggleSort(e);
				return;
			}
			v.sort.length > 0 && b.setSort([]);
			return;
		}
		let n = t(e);
		if (n) {
			b.toggleSort(n);
			return;
		}
		!e?.order && v.sort.length > 0 && b.setSort([]);
	}, [b, v.sort.length]), G = i(async () => {
		A(!0);
		try {
			let t = v.sort.length === 0 ? void 0 : v.sort.length === 1 ? v.sort[0] : v.sort, n = await C.getList(e, {
				pagination: {
					page: v.page,
					perPage: v.perPage
				},
				sort: t,
				filter: v.filter
			});
			te(n.data), N(n.total);
		} catch (e) {
			T.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			A(!1);
		}
	}, [
		C,
		e,
		v,
		T
	]);
	o(() => {
		G();
	}, [G]);
	let K = s(() => ({
		reload: () => void G(),
		clearSelection: de
	}), [G, de]), xe = i(async (e, t) => {
		if (e.confirm) {
			let n = typeof e.confirm == "function" ? await e.confirm(t, K) : e.confirm;
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
			await e.execute(t, K);
		} catch (e) {
			T.error(e instanceof Error ? e.message : "Action failed");
		} finally {
			L(!1);
		}
	}, [
		K,
		ee,
		T
	]), Se = i(async (t) => {
		if (U) try {
			await C.delete(e, t.id), T.success("Deleted"), G();
		} catch (e) {
			T.error(e instanceof Error ? e.message : "Delete failed");
		}
	}, [
		U,
		C,
		e,
		G,
		T
	]), Ce = s(() => {
		let e = E.map((e) => {
			let t = e.buildColumn();
			if (e.sortable) {
				let n = D.get(e.source), r = O.get(e.source), i = n === "ASC" ? "ascend" : n === "DESC" ? "descend" : void 0, a = i == null ? void 0 : /* @__PURE__ */ H("span", {
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
					}), V(i === "ascend" ? se : oe, { style: { fontSize: 11 } })]
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
			openEditModal: b.openEditModal
		}, r = {
			title: "Actions",
			key: "__actions",
			width: a === "both" ? 200 : 160,
			render: (e, r) => /* @__PURE__ */ H(I, {
				size: "small",
				wrap: !0,
				children: [
					W ? /* @__PURE__ */ V(u, {
						to: `${n}/${String(r.id)}`,
						children: "Edit"
					}) : null,
					ce ? /* @__PURE__ */ V(x, {
						type: "link",
						size: "small",
						style: { padding: 0 },
						onClick: () => b.openEditModal(r.id),
						children: a === "both" ? "Quick edit" : "Edit"
					}) : null,
					le ? /* @__PURE__ */ V(x, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => void Se(r),
						style: { padding: 0 },
						children: "Delete"
					}) : null,
					f?.(r, t)
				]
			})
		};
		return [...e, r];
	}, [
		E,
		ue,
		W,
		ce,
		le,
		a,
		n,
		Se,
		D,
		O,
		b,
		f,
		G
	]), we = c && (v.createModal || v.editId != null) && (a === "modal" || a === "both");
	return /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ H(S, {
		title: /* @__PURE__ */ V(R.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		}),
		extra: p || ae ? /* @__PURE__ */ H(I, { children: [p, ae ? a === "modal" || a === "both" ? /* @__PURE__ */ H(B, { children: [a === "both" ? /* @__PURE__ */ V(u, {
			to: re,
			children: /* @__PURE__ */ V(x, { children: "New page" })
		}) : null, /* @__PURE__ */ V(x, {
			type: "primary",
			onClick: () => b.openCreateModal(),
			children: "New"
		})] }) : /* @__PURE__ */ V(u, {
			to: re,
			children: /* @__PURE__ */ V(x, {
				type: "primary",
				children: "New"
			})
		}) : null] }) : null,
		children: [pe ? /* @__PURE__ */ V(mn, {
			selectedCount: me,
			total: M,
			allPageSelected: he,
			allMatchingSelected: ge,
			onSelectAllMatching: () => void ye(),
			onClearSelection: de,
			actions: fe,
			onExecute: xe,
			selectedIds: [...P],
			running: ne || k
		}) : null, /* @__PURE__ */ V(ie, {
			rowKey: "id",
			loading: k,
			columns: Ce,
			dataSource: j,
			rowSelection: pe ? {
				selectedRowKeys: _e,
				onChange: ve,
				preserveSelectedRowKeys: !0
			} : void 0,
			pagination: {
				current: v.page,
				pageSize: v.perPage,
				total: M,
				showSizeChanger: !0,
				onChange: (e, t) => {
					b.setPage(e), t && b.setPerPage(t);
				}
			},
			onChange: (e, t, n) => {
				be(n);
			}
		})]
	}), we ? /* @__PURE__ */ V(pn, {
		resource: e,
		editId: v.createModal ? "new" : v.editId,
		onClose: () => {
			b.closeModal(), G();
		},
		children: c
	}) : null] });
}
function wn({ resource: e, title: t, pathPrefix: n, newPath: r, staticFilter: a, editMode: o = "page", syncQueryParams: c = !0, children: l, formChildren: u, actions: d, rowActions: f, headerExtra: p, bulkActions: m, bulkDelete: h, bulkActionsEnabled: g, permissions: _ }) {
	let [v, y] = bn(a), b = s(() => {
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
	return /* @__PURE__ */ V(xn.Provider, {
		value: S,
		children: /* @__PURE__ */ V(Zt, {
			values: b,
			setFilterValue: x,
			children: /* @__PURE__ */ H(Jt, {
				toggleSort: y.toggleSort,
				sort: v.sort,
				children: [l, /* @__PURE__ */ V(Cn, {
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
function Tn() {
	let e = Qt();
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
function En({ children: e }) {
	return /* @__PURE__ */ H(B, { children: [e, /* @__PURE__ */ V(Tn, {})] });
}
//#endregion
//#region src/crud/context/InlineFormContext.tsx
var Dn = t(null), On = t([]);
function kn({ children: e, arrayName: t, layout: n = "tabular" }) {
	let [r, a] = l([]), o = i((e) => (a((t) => t.some((t) => t.key === e.key) ? t : [...t, e]), () => {
		a((t) => t.filter((t) => t.key !== e.key));
	}), []), c = s(() => ({
		arrayName: t,
		registerField: o,
		layout: n
	}), [
		t,
		o,
		n
	]);
	return /* @__PURE__ */ V(Dn.Provider, {
		value: c,
		children: /* @__PURE__ */ V(On.Provider, {
			value: r,
			children: e
		})
	});
}
function An() {
	let e = a(Dn), t = a(On);
	return e ? {
		...e,
		fields: t
	} : null;
}
//#endregion
//#region src/crud/utils/inlineArrayName.ts
function jn(e, t) {
	return t ?? `__inline_${e.replace(/[^a-z0-9]/gi, "_")}`;
}
//#endregion
//#region src/crud/InlineFormSet.tsx
function Mn(e) {
	let t = An(), { control: n } = be(), { fields: r, append: i, remove: a } = ve({
		control: n,
		name: e
	});
	return {
		ctx: t,
		fields: r,
		remove: a,
		appendEmpty: () => {
			if (!t) return;
			let e = {};
			for (let n of t.fields) e[n.source] = void 0;
			i(e);
		}
	};
}
function Nn({ arrayName: e, label: t }) {
	let { ctx: n, fields: r, remove: i, appendEmpty: a } = Mn(e), o = s(() => n ? n.fields.map((t) => ({
		title: t.label ?? t.source,
		key: t.source,
		width: t.width,
		onHeaderCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		onCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		render: (n, r, i) => t.render({
			name: `${e}.${i}.${t.source}`,
			index: i
		})
	})) : [], [n, e]);
	return n ? /* @__PURE__ */ H("div", {
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
				dataSource: r.map((e) => ({
					...e,
					key: e.id
				})),
				columns: [...o, {
					title: "",
					key: "__remove",
					width: 80,
					render: (e, t, n) => /* @__PURE__ */ V(x, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => i(n),
						children: "Remove"
					})
				}]
			}),
			/* @__PURE__ */ V(x, {
				type: "dashed",
				style: { marginTop: 8 },
				onClick: a,
				children: "Add row"
			})
		]
	}) : null;
}
function Pn({ arrayName: e, label: t }) {
	let { ctx: n, fields: r, remove: i, appendEmpty: a } = Mn(e);
	return n ? /* @__PURE__ */ H("div", {
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
				children: r.map((t, r) => /* @__PURE__ */ V(S, {
					size: "small",
					title: `Item ${r + 1}`,
					extra: /* @__PURE__ */ V(x, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => i(r),
						children: "Remove"
					}),
					children: n.fields.map((t) => /* @__PURE__ */ V("div", { children: t.render({
						name: `${e}.${r}.${t.source}`,
						index: r
					}) }, t.source))
				}, t.id))
			}),
			/* @__PURE__ */ V(x, {
				type: "dashed",
				style: { marginTop: 8 },
				onClick: a,
				children: "Add item"
			})
		]
	}) : null;
}
function Fn({ resource: e, label: t, children: n, name: r, layout: i = "tabular" }) {
	let a = jn(e, r);
	return /* @__PURE__ */ H(kn, {
		arrayName: a,
		layout: i,
		children: [n, V(i === "stacked" ? Pn : Nn, {
			arrayName: a,
			label: t
		})]
	});
}
async function In(e, t) {
	let { resource: n, foreignKey: r, parentId: i, rows: a, existingIds: o = [], onRowError: s } = t, c = [];
	for (let t = 0; t < a.length; t++) {
		let l = a[t];
		try {
			let { id: t, ...a } = l, s = {
				...a,
				[r]: i
			}, u = l.id;
			if (u != null && o.some((e) => e === u)) await e.update(n, {
				id: u,
				data: s
			}), c.push(u);
			else {
				let t = (await e.create(n, s)).data;
				c.push(t.id);
			}
		} catch (e) {
			if (s?.(e, t)) return !1;
			throw e;
		}
	}
	for (let t of o) c.some((e) => e === t) || await e.delete(n, t);
	return !0;
}
async function Ln(e, t, n, r) {
	let i = await e.getList(t, {
		filter: { [n]: Number(r) || r },
		pagination: {
			page: 1,
			perPage: 500
		}
	});
	return {
		rows: i.data,
		ids: i.data.map((e) => e.id)
	};
}
//#endregion
//#region src/crud/ResourceForm.tsx
function Rn(e) {
	return jn(e.resource, e.name);
}
function zn({ resource: e, title: t, listPath: r, children: a, defaultValues: s, onSaved: d, stayOnPage: f, inlines: p, permissions: m }) {
	let { id: h } = _(), v = h === "new" || !h, b = pt(), C = q(), w = g(), { message: T } = y.useApp(), { token: ee } = z.useToken(), [E, O] = l(!v), [k, A] = l(0), [j, te] = l({}), M = ye({ defaultValues: s }), N = c(/* @__PURE__ */ new Set()), P = i(async () => {
		if (v || !h) {
			s && M.reset({ ...s }), O(!1);
			return;
		}
		O(!0);
		try {
			let t = (await b.getOne(e, h)).data;
			if (p?.length) {
				let e = { ...t }, n = {};
				for (let t of p) {
					let r = Rn(t), { rows: i, ids: a } = await Ln(b, t.resource, t.foreignKey, h);
					e[r] = i, n[r] = a;
				}
				M.reset(e), te(n), A((e) => e + 1);
			} else M.reset(t), A((e) => e + 1);
		} catch (e) {
			T.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			O(!1);
		}
	}, [
		b,
		e,
		h,
		v,
		M,
		T,
		s,
		i(async (e) => {
			if (!p?.length) return;
			let t = {};
			for (let n of p) {
				let r = Rn(n), { rows: i, ids: a } = await Ln(b, n.resource, n.foreignKey, e);
				M.setValue(r, i), t[r] = a;
			}
			te(t);
		}, [
			b,
			p,
			M
		])
	]);
	o(() => {
		P();
	}, [P]), o(() => {
		m && (J(C, m, v ? "add" : "change") || w(r, { replace: !0 }));
	}, [
		m,
		v,
		C,
		w,
		r
	]);
	let F = m ? J(C, m, v ? "add" : "change") : !0;
	async function L(t) {
		try {
			let n = ln(t, Array.from(N.current));
			if (p?.length) for (let e of p) delete n[Rn(e)];
			let i;
			if (v) i = (await b.create(e, n)).data, T.success("Created");
			else if (h) i = (await b.update(e, {
				id: h,
				data: n
			})).data, T.success("Updated");
			else return;
			let a = i.id;
			if (p?.length && a != null) for (let e of p) {
				let t = Rn(e), n = M.getValues(t) ?? [];
				if (!await In(b, {
					resource: e.resource,
					foreignKey: e.foreignKey,
					parentId: a,
					rows: n,
					existingIds: j[t] ?? [],
					onRowError: (r, i) => {
						let a = n[i]?.id;
						return fn(b, M, T, r, {
							resource: e.resource,
							mutation: a != null && (j[t] ?? []).some((e) => e === a) ? "update" : "create",
							inlineArrayName: t,
							rowIndex: i
						});
					}
				})) return;
			}
			d?.(i), f || w(r);
		} catch (t) {
			fn(b, M, T, t, {
				resource: e,
				mutation: v ? "create" : "update"
			}) || T.error(t instanceof Error ? t.message : "Save failed");
		}
	}
	return /* @__PURE__ */ V(S, {
		title: /* @__PURE__ */ H(I, { children: [/* @__PURE__ */ H(u, {
			to: r,
			style: { color: ee.colorText },
			children: [/* @__PURE__ */ V(U, {}), " Back"]
		}), /* @__PURE__ */ V(R.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		})] }),
		children: /* @__PURE__ */ V(en, {
			resource: e,
			isNew: v,
			children: /* @__PURE__ */ V(rn, {
				sourcesRef: N,
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
						children: /* @__PURE__ */ V(ne, {})
					}) : null, /* @__PURE__ */ n(_e, {
						...M,
						key: k
					}, /* @__PURE__ */ H(D, {
						layout: "vertical",
						onFinish: () => void M.handleSubmit(L)(),
						style: {
							opacity: E ? .4 : 1,
							pointerEvents: E ? "none" : void 0
						},
						children: [a, /* @__PURE__ */ V(D.Item, {
							style: { marginTop: 16 },
							children: /* @__PURE__ */ H(I, { children: [/* @__PURE__ */ V(x, {
								type: "primary",
								htmlType: "submit",
								disabled: E || !F,
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
	});
}
//#endregion
//#region src/crud/FormTabs.tsx
function Bn(e) {
	return null;
}
function Vn(e) {
	return r(e) && e.type === Bn;
}
function Hn({ children: t, ...n }) {
	return /* @__PURE__ */ V(ae, {
		destroyOnHidden: !1,
		items: s(() => e.toArray(t).filter(Vn).map((e, t) => ({
			key: e.key ?? String(t),
			label: e.props.label,
			disabled: e.props.disabled,
			children: e.props.children
		})), [t]),
		...n
	});
}
//#endregion
//#region src/crud/FormSteps.tsx
function Un(e) {
	return null;
}
function Wn(e) {
	return r(e) && e.type === Un;
}
function Gn({ children: t, initialStep: n = 0, showNavigation: r = !0, allowStepSelect: i = !1, stepsStyle: a, navigationStyle: o, size: c, direction: u, type: d, status: f }) {
	let p = s(() => e.toArray(t).filter(Wn), [t]), [m, h] = l(n), g = p.length - 1;
	return /* @__PURE__ */ H(B, { children: [
		/* @__PURE__ */ V(L, {
			current: m,
			items: s(() => p.map((e) => ({
				title: e.props.title,
				description: e.props.description
			})), [p]),
			style: {
				marginBottom: 24,
				...a
			},
			onChange: i ? h : void 0,
			size: c,
			direction: u,
			type: d,
			status: f
		}),
		p.map((e, t) => /* @__PURE__ */ V("div", {
			style: { display: m === t ? void 0 : "none" },
			children: e.props.children
		}, e.key ?? String(t))),
		r && p.length > 1 ? /* @__PURE__ */ H(I, {
			style: {
				marginTop: 16,
				...o
			},
			children: [/* @__PURE__ */ V(x, {
				disabled: m === 0,
				onClick: () => h((e) => e - 1),
				children: "Previous"
			}), /* @__PURE__ */ V(x, {
				type: "primary",
				disabled: m === g,
				onClick: () => h((e) => e + 1),
				children: "Next"
			})]
		}) : null
	] });
}
//#endregion
//#region src/crud/fields/FieldWrapper.tsx
function Kn({ source: e, label: t, required: n, rules: r, children: i }) {
	let { control: a } = be(), o = tn(), s = t ?? e;
	return on(e), /* @__PURE__ */ V(ge, {
		name: e,
		control: a,
		rules: {
			required: n ? `${s} is required` : !1,
			...r
		},
		render: ({ field: e, fieldState: t }) => /* @__PURE__ */ V(D.Item, {
			label: s,
			validateStatus: t.error ? "error" : void 0,
			help: t.error?.message,
			required: n,
			children: i({
				value: e.value,
				onChange: e.onChange,
				onBlur: e.onBlur,
				disabled: o?.disabled
			})
		})
	});
}
function qn({ name: e, label: t, required: n, rules: r, hideLabel: i, children: a }) {
	let { control: o } = be(), s = i ? void 0 : t;
	return /* @__PURE__ */ V(ge, {
		name: e,
		control: o,
		rules: {
			required: n ? `${t ?? "This field"} is required` : !1,
			...r
		},
		render: ({ field: e, fieldState: t }) => /* @__PURE__ */ V(D.Item, {
			label: s,
			validateStatus: t.error ? "error" : void 0,
			help: t.error?.message,
			required: n && !i,
			style: { marginBottom: 0 },
			children: a({
				value: e.value,
				onChange: e.onChange,
				onBlur: e.onBlur
			})
		})
	});
}
//#endregion
//#region src/crud/fields/useInlineOrFormField.tsx
function Q(e, t, n, r, i, a) {
	let l = An(), u = l?.registerField, d = u != null, f = c(i);
	f.current = i;
	let p = s(() => u ? {
		key: e,
		source: e,
		label: t,
		width: a?.width,
		minWidth: a?.minWidth,
		render: ({ name: e, index: i }) => /* @__PURE__ */ V(qn, {
			name: e,
			label: t,
			required: n,
			rules: r,
			hideLabel: l?.layout !== "stacked",
			children: ({ value: t, onChange: n, onBlur: r }) => f.current({
				value: t,
				onChange: n,
				onBlur: r,
				name: e,
				index: i
			})
		})
	} : null, [
		u,
		e,
		t,
		n,
		r,
		l?.layout,
		a?.width,
		a?.minWidth
	]), m = c(p);
	return m.current = p, o(() => {
		if (!u) return;
		let e = m.current;
		if (e) return u(e);
	}, [u, e]), d ? { mode: "inline" } : {
		mode: "form",
		element: /* @__PURE__ */ V(Kn, {
			source: e,
			label: t,
			required: n,
			rules: r,
			children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => i({
				value: e,
				onChange: t,
				onBlur: n,
				disabled: r
			})
		})
	};
}
//#endregion
//#region src/crud/fields/TextField.tsx
function Jn({ source: e, label: t, required: n, rules: r, placeholder: i, width: a, minWidth: o, inputStyle: s }) {
	let c = Q(e, t, n, r, ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ V(k, {
		value: e,
		onChange: (e) => t(e.target.value),
		onBlur: n,
		placeholder: i,
		disabled: r,
		style: s
	}), {
		width: a,
		minWidth: o
	});
	return c.mode === "inline" ? null : c.element;
}
//#endregion
//#region src/crud/fields/NumberField.tsx
function Yn({ source: e, label: t, required: n, rules: r, min: i, max: a, step: o, width: s, minWidth: c, inputStyle: l }) {
	let u = Q(e, t, n, r, ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ V(A, {
		value: e,
		onChange: (e) => t(e),
		onBlur: n,
		min: i,
		max: a,
		step: o,
		disabled: r,
		style: {
			width: "100%",
			...l
		}
	}), {
		width: s,
		minWidth: c
	});
	return u.mode === "inline" ? null : u.element;
}
//#endregion
//#region src/crud/fields/BooleanField.tsx
function Xn({ source: e, label: t, required: n, rules: r }) {
	let i = Q(e, t, n, r, ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ V(re, {
		checked: !!e,
		onChange: t,
		disabled: n
	}));
	return i.mode === "inline" ? null : i.element;
}
//#endregion
//#region src/crud/fields/DateField.tsx
var Zn = "YYYY-MM-DD";
function Qn({ source: e, label: t, required: n, rules: r, showTime: i }) {
	let a = Q(e, t, n, r, ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ V(w, {
		value: e ? K(String(e)) : null,
		onChange: (e) => t(e ? e.format(i ? `${Zn} HH:mm:ss` : Zn) : null),
		onBlur: n,
		showTime: i,
		disabled: r,
		format: i ? `${Zn} HH:mm:ss` : Zn,
		style: { width: "100%" }
	}));
	return a.mode === "inline" ? null : a.element;
}
//#endregion
//#region src/crud/fields/SelectField.tsx
function $n({ source: e, label: t, required: n, rules: r, choices: i, mode: a, allowClear: o }) {
	return /* @__PURE__ */ V(Kn, {
		source: e,
		label: t,
		required: n,
		rules: r,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ V(F, {
			value: e,
			onChange: t,
			options: i,
			mode: a,
			allowClear: o,
			disabled: n,
			style: { width: "100%" }
		})
	});
}
//#endregion
//#region src/crud/fields/PasswordField.tsx
function er({ source: e, label: t, required: n, rules: r, autoComplete: i, width: a, minWidth: o }) {
	let s = Q(e, t, n, r, ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ V(k.Password, {
		value: e,
		onChange: (e) => t(e.target.value),
		onBlur: n,
		disabled: r,
		autoComplete: i
	}), {
		width: a,
		minWidth: o
	});
	return s.mode === "inline" ? null : s.element;
}
function tr({ source: e, label: t, required: n, rules: r, confirmSource: i, confirmLabel: a = "Confirm password", autoComplete: o = "new-password", width: s, minWidth: c }) {
	let l = G({
		name: e,
		disabled: !i
	});
	return i ? /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V(er, {
		source: e,
		label: t,
		required: n,
		rules: r,
		autoComplete: o,
		width: s,
		minWidth: c
	}), /* @__PURE__ */ V(er, {
		source: i,
		label: a,
		required: n,
		autoComplete: o,
		width: s,
		minWidth: c,
		rules: { validate: (e) => !l || e === l || "Passwords do not match" }
	})] }) : /* @__PURE__ */ V(er, {
		source: e,
		label: t,
		required: n,
		rules: r,
		autoComplete: o,
		width: s,
		minWidth: c
	});
}
//#endregion
//#region src/crud/utils/useChoices.ts
var nr = /* @__PURE__ */ new Map(), rr = /* @__PURE__ */ new Map();
function ir(e, t) {
	return typeof e == "function" ? `fn:${t ?? ""}` : Array.isArray(e) ? `static:${e.length}` : `res:${e.resource}:${JSON.stringify(e.filter ?? {})}:${t ?? ""}`;
}
function ar(e, t) {
	return typeof t == "function" ? t(e) : String(e[t] ?? "");
}
async function or(e, t, n, r, i) {
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
		label: ar(e, n),
		value: e[r],
		record: e
	}));
}
function sr(e, t, n, r, i) {
	let a = ir(e, i), o = nr.get(a);
	if (o && !i) return Promise.resolve(o);
	let s = rr.get(a);
	if (s) return s;
	let c = or(e, t, n, r, i).then((e) => (i || nr.set(a, e), e)).finally(() => {
		rr.delete(a);
	});
	return rr.set(a, c), c;
}
function $(e, t, n = "name", r = "id", a) {
	let c = pt(), u = s(() => {
		if (e) return e;
		if (t) return {
			resource: t,
			filter: a ? { q: a } : void 0
		};
	}, [
		e,
		t,
		a
	]), d = u ? ir(u, a) : void 0, [f, p] = l(() => !d || a ? [] : nr.get(d) ?? []), [m, h] = l(() => !d || a ? !!u : !nr.has(d)), g = i(async () => {
		if (!u) {
			p([]), h(!1);
			return;
		}
		let e = ir(u, a), t = nr.get(e);
		if (t && !a) {
			p(t), h(!1);
			return;
		}
		h(!0);
		try {
			p(await sr(u, c, n, r, a));
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
function cr({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", required: o, rules: c, search: u, allowClear: d, disabled: f, width: p, minWidth: m, inputStyle: h, onValueChange: g }) {
	let [_, v] = l(), { options: y, loading: b, optionForValue: x } = $(r, n, i, a, u ? _ : void 0), S = s(() => y.map((e) => ({
		label: e.label,
		value: e.value
	})), [y]), C = Q(e, t, o, c, ({ value: e, onChange: t, disabled: n, name: r, index: i }) => /* @__PURE__ */ V(F, {
		value: e,
		onChange: (e) => {
			t(e), g?.(e, x(e), {
				name: r,
				index: i
			});
		},
		options: S,
		loading: b && y.length === 0,
		showSearch: u,
		filterOption: u ? !1 : void 0,
		onSearch: u ? v : void 0,
		allowClear: d,
		disabled: n || f,
		optionFilterProp: "label",
		style: {
			width: "100%",
			minWidth: 160,
			...h
		}
	}), {
		width: p,
		minWidth: m
	});
	return C.mode === "inline" ? null : C.element;
}
//#endregion
//#region src/crud/fields/ReferenceManyField.tsx
function lr({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", required: o, rules: c, search: u, allowClear: d = !0 }) {
	let [f, p] = l(), { options: m, loading: h } = $(r, n, i, a, u ? f : void 0), g = s(() => m.map((e) => ({
		label: e.label,
		value: e.value
	})), [m]), _ = Q(e, t, o, c, ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ V(F, {
		mode: "multiple",
		value: e ?? [],
		onChange: t,
		options: g,
		loading: h,
		showSearch: u,
		filterOption: u ? !1 : void 0,
		onSearch: u ? p : void 0,
		allowClear: d,
		disabled: n,
		optionFilterProp: "label",
		style: { width: "100%" }
	}));
	return _.mode === "inline" ? null : _.element;
}
//#endregion
//#region src/crud/columns/TextColumn.tsx
function ur({ source: e, label: t, sortable: n = !0 }) {
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
function dr(e, t, n) {
	return typeof n == "function" ? n(e) : n ? sn(e, n) : e[t];
}
//#endregion
//#region src/crud/columns/NumberColumn.tsx
function fr({ source: e, label: t, sortable: n = !0 }) {
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
function pr({ source: e, label: t, sortable: n = !0 }) {
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
function mr({ source: e, label: t, sortable: n = !0 }) {
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
function hr({ record: e, source: t, display: n, reference: r, choices: i, optionLabel: a, optionValue: o }) {
	let { labelForValue: s } = $(i, r, a, o), c = e[t];
	if (typeof n == "function") return /* @__PURE__ */ V(B, { children: n(e) });
	if (n && n !== t) {
		let r = dr(e, t, n);
		return /* @__PURE__ */ V(B, { children: r == null ? "—" : String(r) });
	}
	return /* @__PURE__ */ V(B, { children: s(c) });
}
function gr({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", display: o, sortable: c = !0 }) {
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
			render: (s, c) => /* @__PURE__ */ V(hr, {
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
function _r({ record: e, source: t, reference: n, choices: r, optionLabel: i, optionValue: a }) {
	let { labelsForValues: o } = $(r, n, i, a), s = e[t];
	return /* @__PURE__ */ V(B, { children: o(Array.isArray(s) ? s : []) });
}
function vr({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", sortable: o = !1 }) {
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
			render: (t, o) => /* @__PURE__ */ V(_r, {
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
function yr({ source: e, label: t, sortable: n = !1, render: r }) {
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
function br({ source: e, label: t, placeholder: n }) {
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
function xr({ source: e, label: t }) {
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
function Sr({ source: e, label: t }) {
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
function Cr({ source: e, label: t }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ V(w, {
			allowClear: !0,
			placeholder: t ?? e,
			value: n ? K(String(n)) : null,
			onChange: (e) => r(e ? e.format("YYYY-MM-DD") : void 0),
			style: { minWidth: 160 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/SelectFilter.tsx
function wr({ source: e, label: t, choices: n, multiple: r }) {
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
function Tr({ source: e, label: t, reference: n, choices: r, optionLabel: i, optionValue: a, multiple: o, search: s, value: c, onChange: u }) {
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
function Er({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", multiple: o, search: c }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: s, onChange: l }) => /* @__PURE__ */ V(Tr, {
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
function Dr(e) {
	return /* @__PURE__ */ V(Er, {
		...e,
		multiple: !0
	});
}
//#endregion
export { ut as AdminApp, Qe as AdminLayout, De as AppThemeProvider, Bt as AuthAlternateLink, Vt as AuthPageLayout, Fe as AuthProvider, pr as BooleanColumn, Xn as BooleanField, Sr as BooleanFilter, yr as CustomColumn, ft as DataProvider, mr as DateColumn, Qn as DateField, Cr as DateFilter, Ae as DensitySwitch, En as FilterBar, Un as FormStep, Gn as FormSteps, Bn as FormTab, Hn as FormTabs, $e as Guard, tt as GuestOnly, Fn as InlineFormSet, Ht as LoginPage, fr as NumberColumn, Yn as NumberField, xr as NumberFilter, tr as PasswordField, Be as PermissionsProvider, Ut as PlaceholderPage, et as Protected, gr as ReferenceColumn, cr as ReferenceField, Er as ReferenceFilter, vr as ReferenceManyColumn, lr as ReferenceManyField, Dr as ReferenceManyFilter, nt as RequirePermission, zn as ResourceForm, pn as ResourceFormModal, wn as ResourceList, $n as SelectField, wr as SelectFilter, ur as TextColumn, Jn as TextField, br as TextFilter, Me as ThemeSwitch, Ne as ThemeToolbar, Nt as applyInMemoryListParams, yt as applyInlineFieldPaths, Y as asStringMessages, gt as combineResourceHandlers, lt as createAdminRouter, Pt as createMemoryResourceHandlers, Ve as createPermissionsChecker, Ft as createRestResourceHandlers, Re as createSessionStorageAuthAdapter, st as deriveAuthPaths, Ue as filterNavByPermission, jt as filterRows, bt as finalizeFormErrors, sn as getByPath, vt as getErrorBody, rt as getRouteAccess, Ot as getRowById, jn as inlineArrayName, Ln as loadInlineRows, St as parseDjangoDRFFormErrors, Ct as parseDotNetFormErrors, wt as parseNodeFormErrors, it as partitionAdminRoutes, ln as pickBySources, In as saveInlineRows, Lt as toDjangoRestOrdering, zt as toJsonApiSort, Rt as toODataOrderBy, Ie as useAuth, He as useCan, $ as useChoices, pt as useDataProvider, bn as useListQueryState, q as usePermissions, on as useRegisterFormSource, Sn as useResourceListContext, Oe as useThemeMode };
