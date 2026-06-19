import { Children as e, createContext as t, createElement as n, isValidElement as r, useCallback as i, useContext as a, useEffect as o, useMemo as s, useRef as c, useState as l } from "react";
import { Link as u, Navigate as d, Outlet as f, RouterProvider as p, createBrowserRouter as m, useLocation as h, useNavigate as g, useParams as _, useSearchParams as v } from "react-router-dom";
import { App as y, Avatar as b, Button as x, Card as S, ConfigProvider as C, DatePicker as w, Drawer as ee, Dropdown as T, Flex as E, Form as D, Grid as O, Image as k, Input as A, InputNumber as te, Layout as j, Menu as ne, Modal as M, Popover as N, Segmented as re, Select as P, Space as F, Spin as I, Steps as ie, Switch as ae, Table as oe, Tabs as L, Typography as R, theme as z } from "antd";
import { Fragment as B, jsx as V, jsxs as H } from "react/jsx-runtime";
import { ArrowLeftOutlined as U, CaretDownOutlined as se, CaretUpOutlined as ce, ColumnHeightOutlined as le, DeleteOutlined as ue, DesktopOutlined as de, LayoutOutlined as fe, LogoutOutlined as pe, MenuOutlined as me, MoonOutlined as he, PaperClipOutlined as ge, SettingOutlined as _e, SunOutlined as ve, UploadOutlined as ye, UserOutlined as be } from "@ant-design/icons";
import { Controller as xe, FormProvider as W, useFieldArray as Se, useForm as Ce, useFormContext as G, useFormState as we, useWatch as Te } from "react-hook-form";
import Ee from "dayjs";
//#region src/context/AppThemeProvider.tsx
var De = t(null);
function Oe(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "light" || t === "dark" || t === "system") return t;
	} catch {}
	return "system";
}
function ke() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function Ae(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "comfortable" || t === "compact") return t;
	} catch {}
	return "comfortable";
}
var je = "ding-react-admin-theme-mode", Me = "ding-react-admin-theme-density";
function Ne({ children: e, modeStorageKey: t = je, densityStorageKey: n = Me }) {
	let [r, i] = l(() => Oe(t)), [a, c] = l(() => Ae(n)), [u, d] = l(ke);
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
	return /* @__PURE__ */ V(De.Provider, {
		value: g,
		children: /* @__PURE__ */ V(C, {
			theme: h,
			children: e
		})
	});
}
function Pe() {
	let e = a(De);
	if (!e) throw Error("useThemeMode must be used within AppThemeProvider");
	return e;
}
//#endregion
//#region src/components/DensitySwitch.tsx
var Fe = [{
	label: "Comfortable",
	value: "comfortable",
	icon: /* @__PURE__ */ V(fe, {})
}, {
	label: "Compact",
	value: "compact",
	icon: /* @__PURE__ */ V(le, {})
}];
function Ie() {
	let { density: e, setDensity: t } = Pe();
	return /* @__PURE__ */ V(re, {
		size: "small",
		value: e,
		options: Fe,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeSwitch.tsx
var Le = [
	{
		label: "Light",
		value: "light",
		icon: /* @__PURE__ */ V(ve, {})
	},
	{
		label: "Dark",
		value: "dark",
		icon: /* @__PURE__ */ V(he, {})
	},
	{
		label: "Auto",
		value: "system",
		icon: /* @__PURE__ */ V(de, {})
	}
];
function Re() {
	let { mode: e, setMode: t } = Pe();
	return /* @__PURE__ */ V(re, {
		size: "small",
		value: e,
		options: Le,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeToolbar.tsx
function ze() {
	let { token: e } = z.useToken();
	return /* @__PURE__ */ V(N, {
		placement: O.useBreakpoint().lg ? "bottomRight" : "bottom",
		trigger: "click",
		content: /* @__PURE__ */ H(F, {
			orientation: "vertical",
			size: "middle",
			style: {
				minWidth: 240,
				maxWidth: "min(92vw, 320px)"
			},
			children: [/* @__PURE__ */ V(Re, {}), /* @__PURE__ */ V(Ie, {})]
		}),
		styles: { content: { padding: e.paddingSM } },
		children: /* @__PURE__ */ V(x, {
			type: "default",
			icon: /* @__PURE__ */ V(_e, {}),
			"aria-label": "Display and theme settings"
		})
	});
}
//#endregion
//#region src/context/AuthProvider.tsx
var Be = t(null);
function Ve({ children: e, adapter: t }) {
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
	return /* @__PURE__ */ V(Be.Provider, {
		value: c,
		children: e
	});
}
function He() {
	let e = a(Be);
	if (!e) throw Error("useAuth must be used within AuthProvider");
	return e;
}
var Ue = "ding-react-admin-auth";
function We(e = Ue) {
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
var Ge = t(null);
function Ke({ children: e, can: t }) {
	let n = s(() => t, [t]);
	return /* @__PURE__ */ V(Ge.Provider, {
		value: n,
		children: e
	});
}
function K() {
	let e = a(Ge);
	if (!e) throw Error("usePermissions must be used within PermissionsProvider");
	return e;
}
function qe(e) {
	return (t) => e()?.includes(t) ?? !1;
}
function Je(e) {
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
function Ye(e, t) {
	return e.map((e) => {
		if (e.children?.length) {
			let n = Ye(e.children, t);
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
var Xe = "#001529", Ze = "ding-react-admin-sider-collapsed";
function Qe(e) {
	try {
		return localStorage.getItem(e) === "1";
	} catch {
		return !1;
	}
}
function $e() {
	return O.useBreakpoint().lg !== !0;
}
function et(e) {
	let t = /* @__PURE__ */ new Set();
	function n(e) {
		for (let r of e) r.children?.length ? n(r.children) : t.add(r.path);
	}
	return n(e), t;
}
function tt(e, t) {
	function n(e) {
		for (let r of e) if (r.children?.length) {
			let e = n(r.children);
			if (e !== null) return [r.path, ...e];
		} else if (r.path === t) return [];
		return null;
	}
	return n(e) ?? [];
}
function nt(e) {
	return e.map((e) => {
		let t = e.Icon, n = t ? /* @__PURE__ */ V(t, {}) : void 0;
		return e.children?.length ? {
			key: e.path,
			icon: n,
			label: e.label,
			children: nt(e.children)
		} : {
			key: e.path,
			icon: n,
			label: e.label
		};
	});
}
function rt({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a }) {
	return /* @__PURE__ */ V(ne, {
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
function it({ navItems: e, brand: t = "Admin", collapsedBrand: n = "A", mobileDrawerTitle: r, headerExtras: a, userMenuItems: c, onUserMenuClick: u, loginPath: d = "/login", siderCollapsedStorageKey: p = Ze }) {
	let m = g(), _ = h(), { resolved: v } = Pe(), y = v === "dark", { logout: S } = He(), C = K(), [w, E] = l(() => Qe(p)), [D, O] = l(!1), k = $e(), { token: A } = z.useToken(), te = r ?? t, ne = () => {
		S(), m(d, { replace: !0 });
	}, M = i((e) => {
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
	let N = s(() => Ye(e, C), [e, C]), re = s(() => et(N), [N]), P = s(() => nt(N), [N]), F = s(() => tt(N, _.pathname), [N, _.pathname]), [I, ie] = l(() => tt(N, _.pathname));
	o(() => {
		ie((e) => [...new Set([...e, ...F])]);
	}, [F]);
	let ae = i((e) => {
		ie(e);
	}, []), oe = s(() => [{
		key: "logout",
		icon: /* @__PURE__ */ V(pe, {}),
		label: "Log out",
		danger: !0
	}], []), L = c ?? oe, B = (e) => {
		if (u) {
			u(e);
			return;
		}
		e.key === "logout" && ne();
	}, U = y ? A.colorBgContainer : Xe, se = [_.pathname], ce = (e) => {
		re.has(e) && (m(e), k && O(!1));
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
				onCollapse: M,
				collapsedWidth: 64,
				style: {
					background: U,
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
				}), /* @__PURE__ */ V(rt, {
					menuItems: P,
					selectedKeys: se,
					inlineCollapsed: w,
					openKeys: I,
					onOpenChange: ae,
					onNavigate: ce
				})]
			}),
			k && /* @__PURE__ */ V(ee, {
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
						background: U,
						borderBottom: `1px solid ${A.colorSplit}`
					},
					body: {
						padding: 0,
						background: U
					}
				},
				destroyOnHidden: !0,
				children: /* @__PURE__ */ V(rt, {
					menuItems: P,
					selectedKeys: se,
					inlineCollapsed: !1,
					openKeys: I,
					onOpenChange: ae,
					onNavigate: ce
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
							icon: /* @__PURE__ */ V(me, {}),
							onClick: () => O(!0),
							"aria-label": "Open navigation"
						}),
						/* @__PURE__ */ V("div", { style: {
							flex: 1,
							minWidth: 0
						} }),
						a,
						/* @__PURE__ */ V(ze, {}),
						/* @__PURE__ */ V(T, {
							menu: {
								items: L,
								onClick: B
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
									icon: /* @__PURE__ */ V(be, {})
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
function at({ when: e, redirect: t, children: n }) {
	return e ? n : /* @__PURE__ */ V(d, {
		to: t,
		replace: !0
	});
}
function ot({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = He();
	return /* @__PURE__ */ V(at, {
		when: n,
		redirect: t,
		children: e
	});
}
function st({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = He();
	return /* @__PURE__ */ V(at, {
		when: !n,
		redirect: t,
		children: e
	});
}
function ct({ permission: e, redirect: t, children: n }) {
	return /* @__PURE__ */ V(at, {
		when: K()(e),
		redirect: t,
		children: n
	});
}
//#endregion
//#region src/router/routeAccess.ts
function lt(e) {
	return e.access ?? "protected";
}
function ut(e) {
	let t = [], n = [], r = [];
	for (let i of e) {
		let e = lt(i);
		e === "guest" ? t.push(i) : e === "public" ? n.push(i) : r.push(i);
	}
	return {
		guest: t,
		public: n,
		protected: r
	};
}
function dt(e) {
	return e.replace(/^\/+/, "");
}
function ft(e) {
	return `/${dt(e)}`;
}
function pt(e, t) {
	let { guest: n, protected: r } = ut(e), i = n.find((e) => "path" in e && e.path), a = r.find((e) => "index" in e && e.index), o = r.find((e) => "path" in e && e.path), s = t?.unauthenticated;
	!s && i && "path" in i && i.path && (s = ft(i.path));
	let c = t?.afterLogin;
	if (c || (a ? c = "/" : o && "path" in o && o.path && (c = ft(o.path))), r.length > 0 && !s) throw Error("createAdminRouter: protected routes require redirects.unauthenticated or a guest route (access: \"guest\").");
	if (n.length > 0 && !c) throw Error("createAdminRouter: guest routes require redirects.afterLogin or a protected route (index or path).");
	return {
		loginPath: s ?? "/",
		homePath: c ?? "/"
	};
}
function mt(e) {
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
function ht({ navItems: e, children: t, layoutProps: n, redirects: r }) {
	let { loginPath: i, homePath: a } = pt(t, r), { guest: o, public: s, protected: c } = ut(t), l = [];
	for (let e of o) !("path" in e) || !e.path || l.push({
		path: dt(e.path),
		element: /* @__PURE__ */ V(st, {
			redirectTo: a,
			children: e.element
		})
	});
	for (let e of s) !("path" in e) || !e.path || l.push({
		path: dt(e.path),
		element: e.element
	});
	return c.length > 0 && l.push({
		path: "/",
		element: /* @__PURE__ */ V(ot, {
			redirectTo: i,
			children: /* @__PURE__ */ V(it, {
				navItems: e,
				loginPath: i,
				...n
			})
		}),
		children: c.map(mt)
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
function gt({ navItems: e, routes: t, authRedirects: n, layoutProps: r, theme: i }) {
	let a = s(() => ht({
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
	return /* @__PURE__ */ V(Ne, {
		...i,
		children: /* @__PURE__ */ V(p, { router: a })
	});
}
//#endregion
//#region src/context/DataProvider.tsx
var _t = t(null);
function vt({ children: e, value: t }) {
	let n = s(() => t, [t]);
	return /* @__PURE__ */ V(_t.Provider, {
		value: n,
		children: e
	});
}
function yt() {
	let e = a(_t);
	if (!e) throw Error("useDataProvider must be used within DataProvider");
	return e;
}
//#endregion
//#region src/data/resourceHandlers.ts
function bt(e) {
	return "handlers" in e ? e : { handlers: e };
}
function J(e, t, n) {
	if (!(!e || !t) && !q(e, t, n)) throw Error("Forbidden");
}
function xt(e, t) {
	let { can: n, guard: r, parseFormError: i } = t ?? {}, a = (t) => {
		let n = e[t];
		if (!n) throw Error(`Unknown resource: ${t}`);
		return bt(n);
	};
	return {
		async getList(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "list"), J(n, o, "list"), i.getList(t);
		},
		async getOne(e, t, i) {
			let { handlers: o, permissions: s } = a(e);
			return r?.(e, "read"), J(n, s, "read"), o.getOne(t, i);
		},
		async create(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "add"), J(n, o, "add"), i.create(t);
		},
		async update(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "change"), J(n, o, "change"), i.update(t);
		},
		async delete(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "delete"), J(n, o, "delete"), i.delete(t);
		},
		parseFormError: i
	};
}
//#endregion
//#region src/data/abortError.ts
function St(e) {
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
function Ct(e) {
	return e.length === 1 ? e[0] : e;
}
function wt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Tt(e) {
	return typeof Response < "u" && e instanceof Response ? !0 : typeof e == "object" && !!e && typeof e.json == "function" && typeof e.status == "number" && e.headers != null;
}
function Et(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (wt(t.body)) return t.body;
	if (wt(t.data)) return t.data;
	let n = t.response;
	if (n && typeof n == "object" && !Array.isArray(n)) {
		let e = n.data;
		if (wt(e)) return e;
	}
	return null;
}
async function Dt(e) {
	let t = Et(e);
	if (t) return t;
	if (!e || typeof e != "object") return null;
	let n = e.response;
	if (!Tt(n)) return null;
	let r = n.headers.get("content-type");
	if (!r || !/application\/json/i.test(r)) return null;
	try {
		let e = await n.clone().json();
		return wt(e) ? e : null;
	} catch {
		return null;
	}
}
function Ot(e) {
	return Array.isArray(e) ? e.some((e) => e && typeof e == "object" && !Array.isArray(e) && Object.values(e).some((e) => Y(e).length > 0)) : !1;
}
function kt(e, t, n) {
	t.forEach((t, r) => {
		if (!(!t || typeof t != "object" || Array.isArray(t))) for (let [i, a] of Object.entries(t)) {
			let t = Y(a);
			t.length && (n[`${e}.${r}.${i}`] = Ct(t));
		}
	});
}
function At(e, t) {
	return {
		fields: Object.keys(e).length ? e : void 0,
		global: t.length ? t : void 0
	};
}
var jt = new Set(["non_field_errors", "detail"]);
function Mt(e) {
	let t = {}, n = [];
	for (let [r, i] of Object.entries(e)) {
		if (jt.has(r)) {
			n.push(...Y(i));
			continue;
		}
		if (Ot(i)) {
			kt(r, i, t);
			continue;
		}
		let e = Y(i);
		e.length && (t[r] = Ct(e));
	}
	return !Object.keys(t).length && !n.length ? null : At(t, n);
}
function Nt(e, t) {
	let n = Et(e);
	return n ? Mt(n) : null;
}
function Pt(e, t, n) {
	let r = Et(e);
	if (!r) return null;
	let i = n?.camelCase ?? !0, a = n?.fieldMap, o = {}, s = [];
	n?.includeSummary && (s.push(...Y(r.title)), s.push(...Y(r.message)));
	let c = r.errors;
	if (c && typeof c == "object" && !Array.isArray(c)) for (let [e, t] of Object.entries(c)) {
		let n = a?.[e] ?? (i ? Lt(e) : e), r = Y(t);
		r.length && (o[n] = Ct(r));
	}
	return !Object.keys(o).length && !s.length ? null : At(o, s);
}
function Ft(e, t, n) {
	let r = Et(e);
	if (!r) return null;
	let i = {}, a = [], o = n?.fieldMap, s = r.errors;
	if (Array.isArray(s)) for (let e of s) {
		if (!e || typeof e != "object") continue;
		let t = e, n = typeof t.path == "string" && t.path || typeof t.param == "string" && t.param || typeof t.field == "string" && t.field, r = Y(t.msg)[0] ?? Y(t.message)[0];
		r && (n ? It(i, o?.[n] ?? n, r) : a.push(r));
	}
	else if (s && typeof s == "object") for (let [e, t] of Object.entries(s)) {
		let n = o?.[e] ?? e, r = Y(t);
		r.length && (i[n] = Ct(r));
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
	return a.push(...Y(r.error)), !Object.keys(i).length && !a.length ? null : At(i, a);
}
function It(e, t, n) {
	let r = e[t];
	if (!r) {
		e[t] = n;
		return;
	}
	e[t] = Array.isArray(r) ? [...r, n] : [r, n];
}
function Lt(e) {
	return e && e.charAt(0).toLowerCase() + e.slice(1);
}
//#endregion
//#region src/data/inMemoryList.ts
function Rt(e, t) {
	return e === t || String(e) === String(t);
}
function zt(e, t) {
	let n = e.find((e) => Rt(e.id, t));
	if (!n) throw Error("Not found");
	return n;
}
function Bt(e, t) {
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
function Vt(e, t) {
	return t == null || t === "" ? !0 : Array.isArray(t) ? t.length === 0 ? !0 : Array.isArray(e) ? t.some((t) => e.includes(t)) : t.includes(e) : Array.isArray(e) ? e.includes(t) : typeof t == "string" && typeof e == "string" ? e.toLowerCase().includes(t.toLowerCase()) : e === t;
}
function Ht(e, t) {
	return t ? e.filter((e) => Object.entries(t).every(([t, n]) => Vt(e[t], n))) : e;
}
function Ut(e, t, n) {
	let r = (t - 1) * n;
	return {
		data: e.slice(r, r + n),
		total: e.length
	};
}
function Wt(e, t) {
	let { pagination: n, sort: r, filter: i } = t, a = Ht(e, i);
	if (r) {
		let e = Array.isArray(r) ? r : [r];
		e.length > 0 && e[0]?.field && (a = Bt(a, e));
	}
	return n ? Ut(a, n.page, n.perPage) : {
		data: a,
		total: a.length
	};
}
//#endregion
//#region src/data/createMemoryResourceHandlers.ts
function Gt(e) {
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
			return Wt(t(e.scopeList ? e.scopeList(e.getRows(), n) : e.getRows()), n);
		},
		async getOne(t, n) {
			return { data: zt(e.getRows(), t) };
		},
		async create(t) {
			let r = n(t, e.nextId());
			return e.getRows().push(r), { data: r };
		},
		async update({ id: t, data: n }) {
			let i = zt(e.getRows(), t), a = r(i, n);
			return Object.assign(i, a), { data: i };
		},
		async delete(t) {
			let n = e.getRows(), r = n.findIndex((e) => Rt(e.id, t));
			if (r < 0) return { data: null };
			let [i] = n.splice(r, 1);
			return e.afterDelete?.(i), { data: i };
		}
	};
}
//#endregion
//#region src/data/createRestResourceHandlers.ts
function Kt(e) {
	return {
		async getList(t) {
			return e.list(t);
		},
		async getOne(t, n) {
			return { data: await e.retrieve(t, n) };
		},
		async create(t) {
			let n = t instanceof FormData ? t : e.transformCreate ? e.transformCreate(t) : t;
			return { data: await e.create(n) };
		},
		async update({ id: t, data: n }) {
			let r = n instanceof FormData ? n : e.transformUpdate ? e.transformUpdate(n) : n;
			return { data: await e.update(t, r) };
		},
		async delete(t) {
			return await e.destroy(t), { data: null };
		}
	};
}
//#endregion
//#region src/data/sortHelpers.ts
function qt(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function Jt(e) {
	let t = qt(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function Yt(e) {
	let t = qt(e);
	if (t.length !== 0) return t.map((e) => `${e.field} ${e.order === "DESC" ? "desc" : "asc"}`).join(",");
}
function Xt(e) {
	let t = qt(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
//#endregion
//#region src/components/AuthAlternateLink.tsx
function Zt({ prompt: e, linkText: t, to: n }) {
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
function Qt({ children: e, brand: t, footer: n, showThemeToolbar: r = !0 }) {
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
				children: /* @__PURE__ */ V(ze, {})
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
function $t({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, brand: r, extraFields: i, showThemeToolbar: a = !0, afterLoginPath: o = "/", alternateAuth: s, footer: c }) {
	let { login: l } = He(), u = g();
	return /* @__PURE__ */ V(Qt, {
		brand: r ?? n,
		footer: c ?? (s ? /* @__PURE__ */ V(Zt, {
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
						children: /* @__PURE__ */ V(A, { autoComplete: "username" })
					}),
					/* @__PURE__ */ V(D.Item, {
						name: "password",
						label: "Password",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ V(A.Password, { autoComplete: "current-password" })
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
function en({ title: e }) {
	return /* @__PURE__ */ V(R.Title, {
		level: 3,
		style: { marginTop: 0 },
		children: e
	});
}
//#endregion
//#region src/crud/utils/sortQueryParam.ts
function tn(e) {
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
function nn(e) {
	return e.length === 0 ? null : e.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function rn(e) {
	return new Map(e.map((e, t) => [e.field, t + 1]));
}
//#endregion
//#region src/crud/context/ListContext.tsx
var an = t(null);
function on({ children: e, toggleSort: t, sort: n }) {
	let [r, a] = l([]), o = s(() => new Set(n.map((e) => e.field)), [n]), c = s(() => new Map(n.map((e) => [e.field, e.order])), [n]), u = s(() => rn(n), [n]), d = i((e) => (a((t) => {
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
	return /* @__PURE__ */ V(an.Provider, {
		value: f,
		children: e
	});
}
function sn() {
	let e = a(an);
	if (!e) throw Error("Column components must be used within ResourceList");
	return e;
}
function X(e) {
	let { registerColumn: t } = sn();
	o(() => t(e), [t, e]);
}
//#endregion
//#region src/crud/context/FilterContext.tsx
var cn = t(null);
function ln({ children: e, values: t, setFilterValue: n }) {
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
	return /* @__PURE__ */ V(cn.Provider, {
		value: c,
		children: e
	});
}
function un() {
	return a(cn);
}
function Z(e) {
	let t = un()?.registerFilter;
	o(() => {
		if (t) return t(e);
	}, [t, e]);
}
//#endregion
//#region src/crud/context/FormContext.tsx
var dn = t(null);
function fn({ children: e, resource: t, isNew: n, disabled: r }) {
	return /* @__PURE__ */ V(dn.Provider, {
		value: {
			resource: t,
			isNew: n,
			disabled: r
		},
		children: e
	});
}
function pn() {
	return a(dn);
}
//#endregion
//#region src/crud/context/FormSectionContext.tsx
var mn = t(null);
function hn({ sourcesRef: e, children: t }) {
	return /* @__PURE__ */ V(mn.Provider, {
		value: e,
		children: t
	});
}
function gn() {
	return a(mn);
}
//#endregion
//#region src/crud/context/PayloadFieldsContext.tsx
var _n = t(null);
function vn({ children: e, fieldsRef: t }) {
	return /* @__PURE__ */ V(_n.Provider, {
		value: t,
		children: e
	});
}
function yn() {
	return a(_n);
}
function bn(e, t = !0) {
	let n = yn();
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
function xn(e, t = !0) {
	let n = gn();
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
function Sn(e, t) {
	let n = t.split("."), r = e;
	for (let e of n) {
		if (typeof r != "object" || !r) return;
		r = r[e];
	}
	return r;
}
//#endregion
//#region src/crud/utils/setFormValue.ts
function Cn(e, t, n) {
	let r = t.split("."), i = e;
	for (let e = 0; e < r.length - 1; e++) {
		let t = r[e], n = i[t];
		(typeof n != "object" || !n || Array.isArray(n)) && (i[t] = {}), i = i[t];
	}
	i[r[r.length - 1]] = n;
}
//#endregion
//#region src/crud/utils/buildFormPayload.ts
function wn(e, t) {
	if (t.length === 0) return { ...e };
	let n = {};
	for (let r of t) {
		let t = Sn(e, r);
		t !== void 0 && Cn(n, r, t);
	}
	return n;
}
//#endregion
//#region src/crud/utils/buildInlineRowsPayload.ts
function Tn(e, t, n) {
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
//#region src/crud/utils/hasUploadValues.ts
function En(e) {
	return e instanceof Blob ? !0 : Array.isArray(e) ? e.some(En) : e && typeof e == "object" ? Object.values(e).some(En) : !1;
}
//#endregion
//#region src/crud/utils/toFormData.ts
function Dn(e) {
	return /^https?:\/\//i.test(e);
}
function On(e, t, n, r) {
	if (n !== void 0) {
		if (n === null) {
			e.append(t, "");
			return;
		}
		if (n instanceof Blob) {
			e.append(t, n);
			return;
		}
		if (typeof n == "boolean" || typeof n == "number") {
			e.append(t, String(n));
			return;
		}
		if (typeof n == "string") {
			if (r.skipExistingUploadUrls && Dn(n)) return;
			e.append(t, n);
			return;
		}
		if (Array.isArray(n)) {
			n.forEach((n, i) => {
				On(e, `${t}[${i}]`, n, r);
			});
			return;
		}
		if (typeof n == "object") {
			for (let [i, a] of Object.entries(n)) On(e, `${t}[${i}]`, a, r);
			return;
		}
		e.append(t, String(n));
	}
}
function kn(e, t) {
	let n = { skipExistingUploadUrls: t?.skipExistingUploadUrls ?? !0 }, r = new FormData();
	for (let [t, i] of Object.entries(e)) On(r, t, i, n);
	return r;
}
//#endregion
//#region src/crud/utils/prepareFormSubmitBody.ts
function An(e, t) {
	return En(e) ? kn(e, t) : e;
}
//#endregion
//#region src/crud/utils/buildResourceFormSubmitBody.ts
function jn(e, t, n, r) {
	let i = wn(e, t);
	if (n) for (let t of n) {
		let n = e[t.field], r = t.payloadKey ?? t.field;
		i[r] = Tn(n, t.sources, { transformRows: t.transformRows });
	}
	return An(i, r);
}
//#endregion
//#region src/crud/utils/formErrors.ts
function Mn(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function Nn(e, t, n) {
	for (let e of Mn(t.global)) n.error(e);
	for (let [n, r] of Object.entries(t.fields ?? {})) {
		let t = Array.isArray(r) ? r.join(", ") : r;
		e.setError(n, {
			type: "server",
			message: t
		});
	}
}
async function Pn(e, t, n, r, i) {
	let a = await Dt(r), o = a == null ? r : { body: a }, s = e.parseFormError?.(o, i);
	if (!s) return !1;
	let c = Object.keys(s.fields ?? {}).length > 0, l = Mn(s.global).length > 0;
	return !c && !l ? !1 : (Nn(t, s, n), !0);
}
//#endregion
//#region src/crud/utils/useAbortableEffect.ts
function Fn(e, t) {
	o(() => {
		let t = new AbortController();
		return e(t.signal), () => t.abort();
	}, t);
}
//#endregion
//#region src/crud/ResourceFormModal.tsx
function In({ resource: e, editId: t, onClose: n, children: r, title: a }) {
	let o = t === "new" || t == null, s = t != null, u = yt(), { message: d } = y.useApp(), [f, p] = l(!o), m = Ce(), h = c(/* @__PURE__ */ new Set()), g = i(async (n) => {
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
			St(e) || d.error(e instanceof Error ? e.message : "Load failed");
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
	Fn((e) => {
		if (s) return g(e);
	}, [s, g]);
	async function _(r) {
		try {
			let i = jn(r, Array.from(h.current));
			o ? (await u.create(e, i), d.success("Created")) : t && (await u.update(e, {
				id: t,
				data: i
			}), d.success("Updated")), n();
		} catch (t) {
			await Pn(u, m, d, t, {
				resource: e,
				mutation: o ? "create" : "update"
			}) || d.error(t instanceof Error ? t.message : "Save failed");
		}
	}
	return /* @__PURE__ */ V(M, {
		open: s,
		title: a ?? (o ? `New ${e}` : `Edit ${e}`),
		onCancel: n,
		footer: null,
		destroyOnHidden: !0,
		width: 560,
		children: f ? /* @__PURE__ */ V(I, {}) : /* @__PURE__ */ V(fn, {
			resource: e,
			isNew: o,
			children: /* @__PURE__ */ V(vn, {
				fieldsRef: h,
				children: /* @__PURE__ */ V(W, {
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
function Ln({ selectedCount: e, total: t, allPageSelected: n, allMatchingSelected: r, onSelectAllMatching: a, onClearSelection: o, actions: c, onExecute: u, selectedIds: d, running: f = !1 }) {
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
	return /* @__PURE__ */ H(F, {
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
			/* @__PURE__ */ V(P, {
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
var Rn = new Set([
	"page",
	"perPage",
	"sort",
	"create",
	"edit"
]), zn = 1, Bn = 10;
function Vn(e) {
	if (e.includes(",")) {
		let t = e.split(",").map((e) => e.trim()), n = t.map(Number);
		return n.every((e) => Number.isFinite(e)) ? n : t;
	}
	let t = Number(e);
	return e !== "" && Number.isFinite(t) && String(t) === e ? t : e === "true" ? !0 : e === "false" ? !1 : e;
}
function Hn(e) {
	return e == null || e === "" ? null : Array.isArray(e) ? e.length === 0 ? null : e.map(String).join(",") : String(e);
}
function Un(e) {
	let [t, n] = v(), r = s(() => {
		let n = t.get("page"), r = t.get("perPage"), i = n ? Math.max(1, Number(n) || zn) : zn, a = r ? Math.max(1, Number(r) || Bn) : Bn, o = t.getAll("sort"), s = o.length > 0 ? o.flatMap((e) => tn(e)) : tn(t.get("sort")), c = { ...e };
		return t.forEach((e, n) => {
			if (Rn.has(n)) return;
			let r = c[n];
			r === void 0 ? t.getAll(n).length > 1 ? c[n] = t.getAll(n).map(Vn) : c[n] = Vn(e) : c[n] = [...Array.isArray(r) ? r : [r], Vn(e)];
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
				e === Bn ? t.delete("perPage") : t.set("perPage", String(e)), t.delete("page");
			});
		},
		setSort: (e) => {
			a((t) => {
				t.delete("sort");
				let n = nn(e);
				n && t.set("sort", n);
			});
		},
		toggleSort: (e) => {
			a((t) => {
				let n = t.getAll("sort").flatMap((e) => tn(e)), r = n.findIndex((t) => t.field === e), i;
				i = r < 0 ? [...n, {
					field: e,
					order: "ASC"
				}] : n[r].order === "ASC" ? n.map((e, t) => t === r ? {
					...e,
					order: "DESC"
				} : e) : n.filter((e, t) => t !== r), t.delete("sort");
				let a = nn(i);
				a && t.set("sort", a);
			});
		},
		setFilter: (e, t) => {
			a((n) => {
				n.delete(e);
				let r = Hn(t);
				r != null && n.set(e, r), n.delete("page");
			});
		},
		setFilters: (e) => {
			a((t) => {
				for (let e of [...t.keys()]) Rn.has(e) || t.delete(e);
				for (let [n, r] of Object.entries(e)) {
					let e = Hn(r);
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
var Wn = t(null);
function Gn() {
	return a(Wn);
}
function Kn({ resource: e, title: t, pathPrefix: n, newPath: r, editMode: a = "page", formChildren: o, actions: c, rowActions: d, headerExtra: f, bulkActions: p, bulkDelete: m = !0, bulkActionsEnabled: h = !0, permissions: g, queryState: _, queryActions: v }) {
	let b = yt(), C = K(), { message: w, modal: ee } = y.useApp(), { columns: T, sortOrders: E, sortPriorities: D } = sn(), [O, k] = l(!1), [A, te] = l([]), [j, ne] = l(0), [M, N] = l(() => /* @__PURE__ */ new Set()), [re, P] = l(!1), I = r ?? `${n}/new`, ie = q(C, g, "add"), ae = q(C, g, "change"), L = q(C, g, "delete"), z = ae && (a === "page" || a === "both") && c?.edit !== !1, U = ae && (a === "modal" || a === "both") && c?.quickEdit !== !1, le = L && c?.delete !== !1, ue = z || U || le || d, de = i(() => {
		N(/* @__PURE__ */ new Set());
	}, []), fe = s(() => {
		if (!h) return [];
		let t = [];
		return m && L && t.push({
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
		L,
		p,
		b,
		e,
		w
	]), pe = fe.length > 0, me = M.size, he = A.length > 0 && A.every((e) => M.has(e.id)), ge = j > 0 && me >= j, _e = s(() => A.filter((e) => M.has(e.id)).map((e) => e.id), [A, M]), ve = i((e) => {
		N((t) => {
			let n = new Set(t), r = A.map((e) => e.id);
			for (let t of r) e.includes(t) || n.delete(t);
			for (let t of e) n.add(t);
			return n;
		});
	}, [A]), ye = i(async () => {
		if (!(j <= 0)) {
			P(!0);
			try {
				let t = _.sort.length === 0 ? void 0 : _.sort.length === 1 ? _.sort[0] : _.sort, n = await b.getList(e, {
					pagination: {
						page: 1,
						perPage: j
					},
					sort: t,
					filter: _.filter
				});
				N(new Set(n.data.map((e) => e.id)));
			} catch (e) {
				w.error(e instanceof Error ? e.message : "Load failed");
			} finally {
				P(!1);
			}
		}
	}, [
		b,
		e,
		j,
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
	}, [v, _.sort.length]), xe = s(() => {
		let e = _.sort.length === 0 ? void 0 : _.sort.length === 1 ? _.sort[0] : _.sort;
		return {
			pagination: {
				page: _.page,
				perPage: _.perPage
			},
			sort: e,
			filter: _.filter
		};
	}, [_]), W = i(async (t) => {
		k(!0);
		try {
			let n = await b.getList(e, {
				...xe,
				signal: t
			});
			if (t?.aborted) return;
			te(n.data), ne(n.total);
		} catch (e) {
			St(e) || w.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			t?.aborted || k(!1);
		}
	}, [
		b,
		e,
		xe,
		w
	]);
	Fn((e) => W(e), [W]);
	let Se = s(() => ({
		reload: () => void W(),
		clearSelection: de
	}), [W, de]), Ce = i(async (e, t) => {
		if (e.confirm) {
			let n = typeof e.confirm == "function" ? await e.confirm(t, Se) : e.confirm;
			if (n === !1 || !await new Promise((t) => {
				ee.confirm({
					title: n,
					okType: e.key === "__delete" ? "danger" : "primary",
					onOk: () => t(!0),
					onCancel: () => t(!1)
				});
			})) return;
		}
		P(!0);
		try {
			await e.execute(t, Se);
		} catch (e) {
			w.error(e instanceof Error ? e.message : "Action failed");
		} finally {
			P(!1);
		}
	}, [
		Se,
		ee,
		w
	]), G = i(async (t) => {
		if (L) try {
			await b.delete(e, t.id), w.success("Deleted"), W();
		} catch (e) {
			w.error(e instanceof Error ? e.message : "Delete failed");
		}
	}, [
		L,
		b,
		e,
		W,
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
			reload: () => void W(),
			openEditModal: v.openEditModal
		}, r = {
			title: "Actions",
			key: "__actions",
			width: a === "both" ? 200 : 160,
			render: (e, r) => /* @__PURE__ */ H(F, {
				size: "small",
				wrap: !0,
				children: [
					z ? /* @__PURE__ */ V(u, {
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
						onClick: () => void G(r),
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
		z,
		U,
		le,
		a,
		n,
		G,
		E,
		D,
		v,
		d,
		W
	]), Te = o && (_.createModal || _.editId != null) && (a === "modal" || a === "both");
	return /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ H(S, {
		title: /* @__PURE__ */ V(R.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		}),
		extra: f || ie ? /* @__PURE__ */ H(F, { children: [f, ie ? a === "modal" || a === "both" ? /* @__PURE__ */ H(B, { children: [a === "both" ? /* @__PURE__ */ V(u, {
			to: I,
			children: /* @__PURE__ */ V(x, { children: "New page" })
		}) : null, /* @__PURE__ */ V(x, {
			type: "primary",
			onClick: () => v.openCreateModal(),
			children: "New"
		})] }) : /* @__PURE__ */ V(u, {
			to: I,
			children: /* @__PURE__ */ V(x, {
				type: "primary",
				children: "New"
			})
		}) : null] }) : null,
		children: [pe ? /* @__PURE__ */ V(Ln, {
			selectedCount: me,
			total: j,
			allPageSelected: he,
			allMatchingSelected: ge,
			onSelectAllMatching: () => void ye(),
			onClearSelection: de,
			actions: fe,
			onExecute: Ce,
			selectedIds: [...M],
			running: re || O
		}) : null, /* @__PURE__ */ V(oe, {
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
				total: j,
				showSizeChanger: !0,
				onChange: (e, t) => {
					v.setPage(e), t && v.setPerPage(t);
				}
			},
			onChange: (e, t, n) => {
				be(n);
			}
		})]
	}), Te ? /* @__PURE__ */ V(In, {
		resource: e,
		editId: _.createModal ? "new" : _.editId,
		onClose: () => {
			v.closeModal(), W();
		},
		children: o
	}) : null] });
}
function qn({ resource: e, title: t, pathPrefix: n, newPath: r, staticFilter: a, editMode: o = "page", syncQueryParams: c = !0, children: l, formChildren: u, actions: d, rowActions: f, headerExtra: p, bulkActions: m, bulkDelete: h, bulkActionsEnabled: g, permissions: _ }) {
	let [v, y] = Un(a), b = s(() => {
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
	return /* @__PURE__ */ V(Wn.Provider, {
		value: S,
		children: /* @__PURE__ */ V(ln, {
			values: b,
			setFilterValue: x,
			children: /* @__PURE__ */ H(on, {
				toggleSort: y.toggleSort,
				sort: v.sort,
				children: [l, /* @__PURE__ */ V(Kn, {
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
function Jn() {
	let e = un();
	return !e || e.filters.length === 0 ? null : /* @__PURE__ */ V(F, {
		wrap: !0,
		size: "middle",
		style: { marginBottom: 16 },
		children: e.filters.map((t) => /* @__PURE__ */ H(F, {
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
function Yn({ children: e }) {
	return /* @__PURE__ */ H(B, { children: [e, /* @__PURE__ */ V(Jn, {})] });
}
//#endregion
//#region src/crud/context/InlineFieldsRegistry.tsx
var Xn = t(null);
function Zn({ children: e, registryRef: t }) {
	return /* @__PURE__ */ V(Xn.Provider, {
		value: t,
		children: e
	});
}
function Qn() {
	return a(Xn);
}
function $n(e, t, n, r, i = !0) {
	let a = Qn();
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
//#region src/crud/utils/useFormRecord.ts
function er({ dp: e, resource: t, id: n, isNew: r, form: a, message: o, defaultValues: s }) {
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
			St(e) || o.error(e instanceof Error ? e.message : "Load failed");
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
	return Fn((e) => p(e), [p]), {
		loading: c,
		formVersion: d
	};
}
function tr({ dp: e, resource: t, id: n, isNew: r, form: a, message: o, navigate: s, listPath: c, payloadFieldsRef: l, inlineRegistryRef: u, onSaved: d, stayOnPage: f }) {
	return i(async (i) => {
		try {
			let a = jn(i, Array.from(l.current), u.current.values()), p;
			if (r) p = (await e.create(t, a)).data, o.success("Created");
			else if (n) p = (await e.update(t, {
				id: n,
				data: a
			})).data, o.success("Updated");
			else return;
			d?.(p), f || s(c);
		} catch (n) {
			let i = Array.from(u.current.keys());
			await Pn(e, a, o, n, {
				resource: t,
				mutation: r ? "create" : "update",
				inlineFieldPaths: i
			}) || o.error(n instanceof Error ? n.message : "Save failed");
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
function nr({ resource: e, title: t, listPath: r, children: i, defaultValues: a, onSaved: s, stayOnPage: l, permissions: d }) {
	let { id: f } = _(), p = f === "new" || !f, m = yt(), h = K(), v = g(), { message: b } = y.useApp(), { token: C } = z.useToken(), w = c(/* @__PURE__ */ new Set()), ee = c(/* @__PURE__ */ new Map()), T = Ce({ defaultValues: a }), { loading: E, formVersion: O } = er({
		dp: m,
		resource: e,
		id: f,
		isNew: p,
		form: T,
		message: b,
		defaultValues: a
	}), k = tr({
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
		title: /* @__PURE__ */ H(F, { children: [/* @__PURE__ */ H(u, {
			to: r,
			style: { color: C.colorText },
			children: [/* @__PURE__ */ V(U, {}), " Back"]
		}), /* @__PURE__ */ V(R.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		})] }),
		children: /* @__PURE__ */ V(fn, {
			resource: e,
			isNew: p,
			children: /* @__PURE__ */ V(vn, {
				fieldsRef: w,
				children: /* @__PURE__ */ V(Zn, {
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
							children: /* @__PURE__ */ V(I, {})
						}) : null, /* @__PURE__ */ n(W, {
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
								children: /* @__PURE__ */ H(F, { children: [/* @__PURE__ */ V(x, {
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
function rr(e, t, n) {
	return `${e}.${t}.${n}`;
}
//#endregion
//#region src/crud/InlineFormSet.tsx
function ir(e) {
	let t = {};
	for (let n of e) t[n] = void 0;
	return t;
}
function ar(e, t) {
	let { control: n } = G(), { fields: r, append: i, remove: a } = Se({
		control: n,
		name: e,
		keyName: "rowKey"
	});
	return {
		fields: r,
		remove: a,
		appendEmpty: () => i(ir(t))
	};
}
function or({ field: e, label: t, payloadKey: n, transformRows: r, columns: i }) {
	let a = s(() => i.map((e) => e.source), [i]), { fields: o, remove: c, appendEmpty: l } = ar(e, a);
	bn(e), $n(e, a, n, r);
	let u = s(() => i.map((t) => ({
		title: t.label ?? t.source,
		key: t.source,
		width: t.width,
		onHeaderCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		onCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		render: (n, r, i) => t.cell({
			name: rr(e, i, t.source),
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
			/* @__PURE__ */ V(oe, {
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
function sr({ field: e, label: t, payloadKey: n, transformRows: r, sources: i, renderRow: a }) {
	let { fields: o, remove: s, appendEmpty: c } = ar(e, i);
	return bn(e), $n(e, i, n, r), /* @__PURE__ */ H("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ V(R.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ V(F, {
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
						name: (t) => rr(e, n, t)
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
function cr(e, t, n) {
	for (let r of e) if (t(r, n).invalid) return !0;
	return !1;
}
function lr(e) {
	let t = c([]);
	for (; t.current.length < e;) t.current.push({ current: /* @__PURE__ */ new Set() });
	return t.current.length > e && (t.current.length = e), t.current;
}
function ur(e, t) {
	let { control: n, getFieldState: r, setFocus: i } = G(), a = we({ control: n }), s = c(0), l = c(0);
	o(() => {
		if (a.submitCount === 0) return;
		let n = Object.keys(a.errors).length, o = a.submitCount !== s.current, c = !o && n > 0 && l.current === 0;
		if (s.current = a.submitCount, l.current = n, !o && !c || n === 0) return;
		let u = e.findIndex((e) => cr(e.current, r, a));
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
function dr(e) {
	return null;
}
function fr(e) {
	return r(e) && e.type === dr;
}
function pr({ children: t, defaultActiveKey: n, activeKey: r, onChange: a, ...o }) {
	let { token: c } = z.useToken(), u = s(() => e.toArray(t).filter(fr).map((e, t) => ({
		key: e.key ?? String(t),
		label: e.props.label,
		disabled: e.props.disabled,
		children: e.props.children
	})), [t]), d = lr(u.length), f = r !== void 0, [p, m] = l(() => n ?? u[0]?.key ?? "0"), h = f ? r : p, g = i((e) => {
		f || m(e), a?.(e);
	}, [f, a]);
	ur(d, i((e) => {
		let t = u[e]?.key;
		t != null && g(t);
	}, [g, u]));
	let { control: _, getFieldState: v } = G(), y = we({ control: _ });
	return /* @__PURE__ */ V(L, {
		destroyOnHidden: !1,
		items: s(() => u.map((e, t) => {
			let n = cr(d[t].current, v, y);
			return {
				key: e.key,
				label: n ? /* @__PURE__ */ V("span", {
					style: { color: c.colorError },
					children: e.label
				}) : e.label,
				disabled: e.disabled,
				children: /* @__PURE__ */ V(hn, {
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
function mr(e) {
	return null;
}
function hr(e) {
	return r(e) && e.type === mr;
}
function gr({ children: t, initialStep: n = 0, showNavigation: r = !0, allowStepSelect: a = !1, stepsStyle: o, navigationStyle: c, size: u, direction: d, type: f, status: p }) {
	let m = s(() => e.toArray(t).filter(hr), [t]), h = lr(m.length), [g, _] = l(n), v = m.length - 1;
	ur(h, _);
	let { control: y, getFieldState: b } = G(), S = we({ control: y }), C = s(() => m.map((e, t) => {
		let n = cr(h[t].current, b, S);
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
		/* @__PURE__ */ V(ie, {
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
			children: /* @__PURE__ */ V(hn, {
				sourcesRef: h[t],
				children: e.props.children
			})
		}, e.key ?? String(t))),
		r && m.length > 1 ? /* @__PURE__ */ H(F, {
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
	let s = t ?? e, c = !s.includes("."), { control: l } = G(), u = pn(), d = a ? void 0 : n ?? e, f = n ?? e;
	return bn(e, c), xn(e, c), /* @__PURE__ */ V(xe, {
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
function _r({ source: e, name: t, label: n, required: r, rules: i, placeholder: a, inputStyle: o, hideLabel: s }) {
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: s,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ V(A, {
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
function vr({ source: e, name: t, label: n, required: r, rules: i, min: a, max: o, step: s, inputStyle: c, hideLabel: l }) {
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: l,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ V(te, {
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
function yr({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a }) {
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ V(ae, {
			checked: !!e,
			onChange: t,
			disabled: n
		})
	});
}
//#endregion
//#region src/crud/fields/DateField.tsx
var br = "YYYY-MM-DD";
function xr({ source: e, name: t, label: n, required: r, rules: i, showTime: a, hideLabel: o }) {
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ V(w, {
			value: e ? Ee(String(e)) : null,
			onChange: (e) => t(e ? e.format(a ? `${br} HH:mm:ss` : br) : null),
			onBlur: n,
			showTime: a,
			disabled: r,
			format: a ? `${br} HH:mm:ss` : br,
			style: { width: "100%" }
		})
	});
}
//#endregion
//#region src/crud/fields/SelectField.tsx
function Sr({ source: e, name: t, label: n, required: r, rules: i, choices: a, mode: o, allowClear: s, hideLabel: c }) {
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: c,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ V(P, {
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
function Cr({ source: e, name: t, label: n, required: r, rules: i, autoComplete: a, hideLabel: o }) {
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ V(A.Password, {
			value: e,
			onChange: (e) => t(e.target.value),
			onBlur: n,
			disabled: r,
			autoComplete: a
		})
	});
}
function wr({ source: e, name: t, label: n, required: r, rules: i, confirmSource: a, confirmLabel: o = "Confirm password", autoComplete: s = "new-password", hideLabel: c }) {
	let l = Te({
		name: t ?? e,
		disabled: !a
	});
	return a ? /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V(Cr, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		autoComplete: s,
		hideLabel: c
	}), /* @__PURE__ */ V(Cr, {
		source: a,
		label: o,
		required: r,
		autoComplete: s,
		hideLabel: c,
		rules: { validate: (e) => !l || e === l || "Passwords do not match" }
	})] }) : /* @__PURE__ */ V(Cr, {
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
var Tr = /* @__PURE__ */ new Map(), Er = /* @__PURE__ */ new Map();
function Dr(e, t) {
	return typeof e == "function" ? `fn:${t ?? ""}` : Array.isArray(e) ? `static:${e.length}` : `res:${e.resource}:${JSON.stringify(e.filter ?? {})}:${t ?? ""}`;
}
function Or(e, t) {
	return typeof t == "function" ? t(e) : String(e[t] ?? "");
}
async function kr(e, t, n, r, i) {
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
		label: Or(e, n),
		value: e[r],
		record: e
	}));
}
function Ar(e, t, n, r, i) {
	let a = Dr(e, i), o = Tr.get(a);
	if (o && !i) return Promise.resolve(o);
	let s = Er.get(a);
	if (s) return s;
	let c = kr(e, t, n, r, i).then((e) => (i || Tr.set(a, e), e)).finally(() => {
		Er.delete(a);
	});
	return Er.set(a, c), c;
}
function $(e, t, n = "name", r = "id", a) {
	let c = yt(), u = s(() => {
		if (e) return e;
		if (t) return {
			resource: t,
			filter: a ? { q: a } : void 0
		};
	}, [
		e,
		t,
		a
	]), d = u ? Dr(u, a) : void 0, [f, p] = l(() => !d || a ? [] : Tr.get(d) ?? []), [m, h] = l(() => !d || a ? !!u : !Tr.has(d)), g = i(async () => {
		if (!u) {
			p([]), h(!1);
			return;
		}
		let e = Dr(u, a), t = Tr.get(e);
		if (t && !a) {
			p(t), h(!1);
			return;
		}
		h(!0);
		try {
			p(await Ar(u, c, n, r, a));
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
function jr({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: c, rules: u, search: d, allowClear: f, disabled: p, hideLabel: m, inputStyle: h, onValueChange: g }) {
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
		children: ({ value: e, onChange: t, disabled: n, name: r }) => /* @__PURE__ */ V(P, {
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
function Mr({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: c, rules: u, search: d, allowClear: f = !0, hideLabel: p }) {
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
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ V(P, {
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
//#region src/crud/fields/uploadFieldUtils.ts
function Nr(e) {
	return e instanceof File ? !0 : typeof e == "string" && e.length > 0;
}
function Pr(e) {
	if (e instanceof File) return e.name;
	if (typeof e == "string" && e.length > 0) try {
		return new URL(e, "http://local").pathname.split("/").filter(Boolean).pop() || e;
	} catch {
		return e.split("/").filter(Boolean).pop() || e;
	}
}
//#endregion
//#region src/crud/fields/useUploadPreviewUrl.ts
function Fr(e) {
	let [t, n] = l();
	if (o(() => {
		if (e instanceof File) {
			let t = URL.createObjectURL(e);
			return n(t), () => URL.revokeObjectURL(t);
		}
		n(void 0);
	}, [e]), e instanceof File) return t;
	if (typeof e == "string" && e.length > 0) return e;
}
//#endregion
//#region src/crud/fields/ImageField.tsx
function Ir({ value: e, onChange: t, disabled: n, clearable: r, accept: i = "image/*", previewWidth: a = 200 }) {
	let o = c(null), s = Fr(e), l = r && Nr(e);
	return /* @__PURE__ */ H(F, {
		direction: "vertical",
		size: "middle",
		style: { width: "100%" },
		children: [
			s ? /* @__PURE__ */ V(k, {
				src: s,
				alt: "",
				style: {
					maxWidth: a,
					maxHeight: a,
					objectFit: "contain"
				}
			}) : null,
			/* @__PURE__ */ H(F, {
				wrap: !0,
				children: [/* @__PURE__ */ V(x, {
					icon: /* @__PURE__ */ V(ye, {}),
					disabled: n,
					onClick: () => o.current?.click(),
					children: "Choose image"
				}), l ? /* @__PURE__ */ V(x, {
					icon: /* @__PURE__ */ V(ue, {}),
					disabled: n,
					onClick: () => {
						t(null), o.current && (o.current.value = "");
					},
					children: "Clear"
				}) : null]
			}),
			/* @__PURE__ */ V("input", {
				ref: o,
				type: "file",
				accept: i,
				disabled: n,
				tabIndex: -1,
				"aria-hidden": !0,
				style: { display: "none" },
				onChange: (e) => {
					let n = e.target.files?.[0];
					t(n ?? null), e.target.value = "";
				}
			})
		]
	});
}
function Lr({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, clearable: o, accept: s, previewWidth: c }) {
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ V(Ir, {
			value: e,
			onChange: t,
			disabled: n,
			clearable: o,
			accept: s,
			previewWidth: c
		})
	});
}
//#endregion
//#region src/crud/fields/FileField.tsx
function Rr({ value: e, onChange: t, disabled: n, clearable: r, accept: i }) {
	let a = c(null), o = Pr(e), s = typeof e == "string" && e.length > 0 ? e : void 0, l = r && Nr(e);
	return /* @__PURE__ */ H(F, {
		direction: "vertical",
		size: "middle",
		style: { width: "100%" },
		children: [
			o ? /* @__PURE__ */ H(F, { children: [/* @__PURE__ */ V(ge, {}), s ? /* @__PURE__ */ V(R.Link, {
				href: s,
				target: "_blank",
				rel: "noopener noreferrer",
				children: o
			}) : /* @__PURE__ */ V(R.Text, { children: o })] }) : null,
			/* @__PURE__ */ H(F, {
				wrap: !0,
				children: [/* @__PURE__ */ V(x, {
					icon: /* @__PURE__ */ V(ye, {}),
					disabled: n,
					onClick: () => a.current?.click(),
					children: "Choose file"
				}), l ? /* @__PURE__ */ V(x, {
					icon: /* @__PURE__ */ V(ue, {}),
					disabled: n,
					onClick: () => {
						t(null), a.current && (a.current.value = "");
					},
					children: "Clear"
				}) : null]
			}),
			/* @__PURE__ */ V("input", {
				ref: a,
				type: "file",
				accept: i,
				disabled: n,
				tabIndex: -1,
				"aria-hidden": !0,
				style: { display: "none" },
				onChange: (e) => {
					let n = e.target.files?.[0];
					t(n ?? null), e.target.value = "";
				}
			})
		]
	});
}
function zr({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, clearable: o, accept: s }) {
	return /* @__PURE__ */ V(Q, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ V(Rr, {
			value: e,
			onChange: t,
			disabled: n,
			clearable: o,
			accept: s
		})
	});
}
//#endregion
//#region src/crud/columns/TextColumn.tsx
function Br({ source: e, label: t, sortable: n = !0 }) {
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
function Vr(e, t, n) {
	return typeof n == "function" ? n(e) : n ? Sn(e, n) : e[t];
}
//#endregion
//#region src/crud/columns/NumberColumn.tsx
function Hr({ source: e, label: t, sortable: n = !0 }) {
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
function Ur({ source: e, label: t, sortable: n = !0 }) {
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
function Wr({ source: e, label: t, sortable: n = !0 }) {
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
function Gr({ record: e, source: t, display: n, reference: r, choices: i, optionLabel: a, optionValue: o }) {
	let { labelForValue: s } = $(i, r, a, o), c = e[t];
	if (typeof n == "function") return /* @__PURE__ */ V(B, { children: n(e) });
	if (n && n !== t) {
		let r = Vr(e, t, n);
		return /* @__PURE__ */ V(B, { children: r == null ? "—" : String(r) });
	}
	return /* @__PURE__ */ V(B, { children: s(c) });
}
function Kr({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", display: o, sortable: c = !0 }) {
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
			render: (s, c) => /* @__PURE__ */ V(Gr, {
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
function qr({ record: e, source: t, reference: n, choices: r, optionLabel: i, optionValue: a }) {
	let { labelsForValues: o } = $(r, n, i, a), s = e[t];
	return /* @__PURE__ */ V(B, { children: o(Array.isArray(s) ? s : []) });
}
function Jr({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", sortable: o = !1 }) {
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
			render: (t, o) => /* @__PURE__ */ V(qr, {
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
//#region src/crud/columns/ImageColumn.tsx
function Yr({ source: e, label: t, sortable: n = !1, width: r = 40, height: i = 40, objectFit: a = "cover", borderRadius: o = 4, alt: c = "" }) {
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
			render: (e) => e == null || e === "" ? null : /* @__PURE__ */ V("img", {
				src: String(e),
				alt: c,
				style: {
					width: r,
					height: i,
					objectFit: a,
					borderRadius: o
				}
			})
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
//#endregion
//#region src/crud/columns/CustomColumn.tsx
function Xr({ source: e, label: t, sortable: n = !1, render: r }) {
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
function Zr({ source: e, label: t, placeholder: n }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: r, onChange: i }) => /* @__PURE__ */ V(A, {
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
function Qr({ source: e, label: t }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ V(te, {
			placeholder: t ?? e,
			value: n,
			onChange: (e) => r(e ?? void 0),
			style: { minWidth: 120 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/BooleanFilter.tsx
function $r({ source: e, label: t }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ V(P, {
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
function ei({ source: e, label: t }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ V(w, {
			allowClear: !0,
			placeholder: t ?? e,
			value: n ? Ee(String(n)) : null,
			onChange: (e) => r(e ? e.format("YYYY-MM-DD") : void 0),
			style: { minWidth: 160 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/SelectFilter.tsx
function ti({ source: e, label: t, choices: n, multiple: r }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: i, onChange: a }) => /* @__PURE__ */ V(P, {
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
function ni({ source: e, label: t, reference: n, choices: r, optionLabel: i, optionValue: a, multiple: o, search: s, value: c, onChange: u }) {
	let [d, f] = l(), { options: p, loading: m } = $(r, n, i, a, s ? d : void 0);
	return /* @__PURE__ */ V(P, {
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
function ri({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", multiple: o, search: c }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: s, onChange: l }) => /* @__PURE__ */ V(ni, {
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
function ii(e) {
	return /* @__PURE__ */ V(ri, {
		...e,
		multiple: !0
	});
}
//#endregion
export { gt as AdminApp, it as AdminLayout, Ne as AppThemeProvider, Zt as AuthAlternateLink, Qt as AuthPageLayout, Ve as AuthProvider, Ur as BooleanColumn, yr as BooleanField, $r as BooleanFilter, Xr as CustomColumn, vt as DataProvider, Wr as DateColumn, xr as DateField, ei as DateFilter, Ie as DensitySwitch, Q as FieldWrapper, zr as FileField, Yn as FilterBar, mr as FormStep, gr as FormSteps, dr as FormTab, pr as FormTabs, at as Guard, st as GuestOnly, Yr as ImageColumn, Lr as ImageField, or as InlineFormSet, sr as InlineFormSetStacked, $t as LoginPage, Hr as NumberColumn, vr as NumberField, Qr as NumberFilter, wr as PasswordField, Ke as PermissionsProvider, en as PlaceholderPage, ot as Protected, Kr as ReferenceColumn, jr as ReferenceField, ri as ReferenceFilter, Jr as ReferenceManyColumn, Mr as ReferenceManyField, ii as ReferenceManyFilter, ct as RequirePermission, nr as ResourceForm, In as ResourceFormModal, qn as ResourceList, Sr as SelectField, ti as SelectFilter, Br as TextColumn, _r as TextField, Zr as TextFilter, Re as ThemeSwitch, ze as ThemeToolbar, Wt as applyInMemoryListParams, Y as asStringMessages, wn as buildFormPayload, Tn as buildInlineRowsPayload, jn as buildResourceFormSubmitBody, xt as combineResourceHandlers, ht as createAdminRouter, Gt as createMemoryResourceHandlers, qe as createPermissionsChecker, Kt as createRestResourceHandlers, We as createSessionStorageAuthAdapter, pt as deriveAuthPaths, Ye as filterNavByPermission, Ht as filterRows, At as finalizeFormErrors, kt as flattenNestedArrayErrors, Et as getErrorBody, Sn as getFormValue, lt as getRouteAccess, zt as getRowById, En as hasUploadValues, St as isAbortError, rr as nestedFieldPath, Nt as parseDjangoDRFFormErrors, Pt as parseDotNetFormErrors, Ft as parseNodeFormErrors, ut as partitionAdminRoutes, An as prepareFormSubmitBody, Dt as resolveErrorBody, Cn as setFormValue, Jt as toDjangoRestOrdering, kn as toFormData, Xt as toJsonApiSort, Yt as toODataOrderBy, Fn as useAbortableEffect, He as useAuth, Je as useCan, $ as useChoices, yt as useDataProvider, Un as useListQueryState, K as usePermissions, bn as useRegisterPayloadField, xn as useRegisterSectionField, Gn as useResourceListContext, Pe as useThemeMode };
