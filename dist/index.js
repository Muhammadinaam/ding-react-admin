import { Children as e, createContext as t, createElement as n, isValidElement as r, useCallback as i, useContext as a, useEffect as o, useMemo as s, useRef as c, useState as l } from "react";
import { Link as u, Navigate as d, Outlet as f, RouterProvider as p, createBrowserRouter as m, useLocation as h, useNavigate as g, useParams as _, useSearchParams as v } from "react-router-dom";
import { Alert as y, App as b, Avatar as x, Button as S, Card as C, ConfigProvider as w, DatePicker as T, Drawer as ee, Dropdown as te, Flex as E, Form as D, Grid as O, Image as k, Input as A, InputNumber as j, Layout as M, Menu as N, Modal as ne, Popover as P, Segmented as F, Select as I, Space as L, Spin as R, Steps as re, Switch as z, Table as ie, Tabs as ae, Typography as B, theme as V } from "antd";
import { Fragment as H, jsx as U, jsxs as W } from "react/jsx-runtime";
import { ArrowLeftOutlined as G, CaretDownOutlined as oe, CaretUpOutlined as se, ColumnHeightOutlined as ce, DeleteOutlined as le, DesktopOutlined as ue, LayoutOutlined as de, LogoutOutlined as fe, MenuOutlined as pe, MoonOutlined as me, PaperClipOutlined as he, SettingOutlined as ge, SunOutlined as _e, UploadOutlined as ve, UserOutlined as ye } from "@ant-design/icons";
import { Controller as K, FormProvider as be, useFieldArray as xe, useForm as Se, useFormContext as q, useFormState as Ce, useWatch as we } from "react-hook-form";
import Te from "dayjs";
//#region src/context/AppThemeProvider.tsx
var Ee = t(null);
function De(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "light" || t === "dark" || t === "system") return t;
	} catch {}
	return "system";
}
function Oe() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function ke(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "comfortable" || t === "compact") return t;
	} catch {}
	return "comfortable";
}
var Ae = "ding-react-admin-theme-mode", je = "ding-react-admin-theme-density";
function Me({ children: e, modeStorageKey: t = Ae, densityStorageKey: n = je }) {
	let [r, i] = l(() => De(t)), [a, c] = l(() => ke(n)), [u, d] = l(Oe);
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
		let e = m === "dark" ? V.darkAlgorithm : V.defaultAlgorithm;
		return { algorithm: a === "compact" ? [e, V.compactAlgorithm] : e };
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
	return /* @__PURE__ */ U(Ee.Provider, {
		value: g,
		children: /* @__PURE__ */ U(w, {
			theme: h,
			children: e
		})
	});
}
function Ne() {
	let e = a(Ee);
	if (!e) throw Error("useThemeMode must be used within AppThemeProvider");
	return e;
}
//#endregion
//#region src/components/DensitySwitch.tsx
var Pe = [{
	label: "Comfortable",
	value: "comfortable",
	icon: /* @__PURE__ */ U(de, {})
}, {
	label: "Compact",
	value: "compact",
	icon: /* @__PURE__ */ U(ce, {})
}];
function Fe() {
	let { density: e, setDensity: t } = Ne();
	return /* @__PURE__ */ U(F, {
		size: "small",
		value: e,
		options: Pe,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeSwitch.tsx
var Ie = [
	{
		label: "Light",
		value: "light",
		icon: /* @__PURE__ */ U(_e, {})
	},
	{
		label: "Dark",
		value: "dark",
		icon: /* @__PURE__ */ U(me, {})
	},
	{
		label: "Auto",
		value: "system",
		icon: /* @__PURE__ */ U(ue, {})
	}
];
function Le() {
	let { mode: e, setMode: t } = Ne();
	return /* @__PURE__ */ U(F, {
		size: "small",
		value: e,
		options: Ie,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeToolbar.tsx
function Re() {
	let { token: e } = V.useToken();
	return /* @__PURE__ */ U(P, {
		placement: O.useBreakpoint().lg ? "bottomRight" : "bottom",
		trigger: "click",
		content: /* @__PURE__ */ W(L, {
			orientation: "vertical",
			size: "middle",
			style: {
				minWidth: 240,
				maxWidth: "min(92vw, 320px)"
			},
			children: [/* @__PURE__ */ U(Le, {}), /* @__PURE__ */ U(Fe, {})]
		}),
		styles: { content: { padding: e.paddingSM } },
		children: /* @__PURE__ */ U(S, {
			type: "default",
			icon: /* @__PURE__ */ U(ge, {}),
			"aria-label": "Display and theme settings"
		})
	});
}
//#endregion
//#region src/context/AuthProvider.tsx
var ze = t(null), Be = "User";
function Ve(e) {
	return e.getUserLabel?.() ?? Be;
}
function He({ children: e, adapter: t }) {
	let [n, r] = l(() => t.getToken()), [a, o] = l(() => Ve(t)), c = i(async (e) => {
		await t.login(e), r(t.getToken()), o(Ve(t));
	}, [t]), u = i(() => {
		t.logout(), r(t.getToken()), o(Ve(t));
	}, [t]), d = s(() => ({
		isAuthenticated: !!n,
		userLabel: a,
		login: c,
		logout: u
	}), [
		n,
		a,
		c,
		u
	]);
	return /* @__PURE__ */ U(ze.Provider, {
		value: d,
		children: e
	});
}
function Ue() {
	let e = a(ze);
	if (!e) throw Error("useAuth must be used within AuthProvider");
	return e;
}
var We = "ding-react-admin-auth";
function Ge(e = We) {
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
var Ke = t(null);
function qe({ children: e, can: t }) {
	let n = s(() => t, [t]);
	return /* @__PURE__ */ U(Ke.Provider, {
		value: n,
		children: e
	});
}
function J() {
	let e = a(Ke);
	if (!e) throw Error("usePermissions must be used within PermissionsProvider");
	return e;
}
function Je(e) {
	return (t) => e()?.includes(t) ?? !1;
}
function Ye(e) {
	let t = J();
	return i(() => t(e), [t, e]);
}
//#endregion
//#region src/permissions/resourcePermissions.ts
function Y(e, t, n) {
	if (!t) return !0;
	let r = t[n];
	return n === "read" && !r && (r = t.list), r ? e(r) : !1;
}
function Xe(e, t) {
	return e.map((e) => {
		if (e.children?.length) {
			let n = Xe(e.children, t);
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
var Ze = "#001529", Qe = "ding-react-admin-sider-collapsed";
function $e(e) {
	try {
		return localStorage.getItem(e) === "1";
	} catch {
		return !1;
	}
}
function et() {
	return O.useBreakpoint().lg !== !0;
}
function tt(e) {
	let t = /* @__PURE__ */ new Set();
	function n(e) {
		for (let r of e) r.children?.length ? n(r.children) : t.add(r.path);
	}
	return n(e), t;
}
function nt(e, t) {
	function n(e) {
		for (let r of e) if (r.children?.length) {
			let e = n(r.children);
			if (e !== null) return [r.path, ...e];
		} else if (r.path === t) return [];
		return null;
	}
	return n(e) ?? [];
}
function rt(e) {
	return e.map((e) => {
		let t = e.Icon, n = t ? /* @__PURE__ */ U(t, {}) : void 0;
		return e.children?.length ? {
			key: e.path,
			icon: n,
			label: e.label,
			children: rt(e.children)
		} : {
			key: e.path,
			icon: n,
			label: e.label
		};
	});
}
function it({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a }) {
	return /* @__PURE__ */ U(N, {
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
function at({ navItems: e, brand: t = "Admin", collapsedBrand: n = "A", mobileDrawerTitle: r, headerExtras: a, userMenuItems: c, onUserMenuClick: u, loginPath: d = "/login", siderCollapsedStorageKey: p = Qe }) {
	let m = g(), _ = h(), { resolved: v } = Ne(), y = v === "dark", { logout: b, userLabel: C } = Ue(), w = J(), [T, E] = l(() => $e(p)), [D, O] = l(!1), k = et(), { token: A } = V.useToken(), j = r ?? t, N = () => {
		b(), m(d, { replace: !0 });
	}, ne = i((e) => {
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
	let P = s(() => Xe(e, w), [e, w]), F = s(() => tt(P), [P]), I = s(() => rt(P), [P]), L = s(() => nt(P, _.pathname), [P, _.pathname]), [R, re] = l(() => nt(P, _.pathname));
	o(() => {
		re((e) => [...new Set([...e, ...L])]);
	}, [L]);
	let z = i((e) => {
		re(e);
	}, []), ie = s(() => [{
		key: "logout",
		icon: /* @__PURE__ */ U(fe, {}),
		label: "Log out",
		danger: !0
	}], []), ae = c ?? ie, H = (e) => {
		if (u) {
			u(e);
			return;
		}
		e.key === "logout" && N();
	}, G = y ? A.colorBgContainer : Ze, oe = [_.pathname], se = (e) => {
		F.has(e) && (m(e), k && O(!1));
	};
	return /* @__PURE__ */ W(M, {
		style: {
			minHeight: "100vh",
			width: "100%",
			background: A.colorBgLayout
		},
		children: [
			!k && /* @__PURE__ */ W(M.Sider, {
				collapsible: !0,
				collapsed: T,
				onCollapse: ne,
				collapsedWidth: 64,
				style: {
					background: G,
					borderInlineEnd: y ? `1px solid ${A.colorSplit}` : void 0
				},
				children: [/* @__PURE__ */ U("div", {
					style: {
						height: 64,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontWeight: 600
					},
					children: /* @__PURE__ */ U(B.Text, {
						strong: !0,
						style: { color: A.colorTextLightSolid },
						children: T ? n : t
					})
				}), /* @__PURE__ */ U(it, {
					menuItems: I,
					selectedKeys: oe,
					inlineCollapsed: T,
					openKeys: R,
					onOpenChange: z,
					onNavigate: se
				})]
			}),
			k && /* @__PURE__ */ U(ee, {
				title: /* @__PURE__ */ U(B.Text, {
					strong: !0,
					style: { color: A.colorTextLightSolid },
					children: j
				}),
				placement: "left",
				size: 280,
				onClose: () => O(!1),
				open: D,
				styles: {
					header: {
						background: G,
						borderBottom: `1px solid ${A.colorSplit}`
					},
					body: {
						padding: 0,
						background: G
					}
				},
				destroyOnHidden: !0,
				children: /* @__PURE__ */ U(it, {
					menuItems: I,
					selectedKeys: oe,
					inlineCollapsed: !1,
					openKeys: R,
					onOpenChange: z,
					onNavigate: se
				})
			}),
			/* @__PURE__ */ W(M, {
				style: { minWidth: 0 },
				children: [/* @__PURE__ */ W(M.Header, {
					style: {
						background: A.colorBgContainer,
						paddingInline: A.paddingLG,
						display: "flex",
						alignItems: "center",
						gap: A.marginSM,
						lineHeight: "normal"
					},
					children: [
						k && /* @__PURE__ */ U(S, {
							type: "text",
							icon: /* @__PURE__ */ U(pe, {}),
							onClick: () => O(!0),
							"aria-label": "Open navigation"
						}),
						/* @__PURE__ */ U("div", { style: {
							flex: 1,
							minWidth: 0
						} }),
						a,
						/* @__PURE__ */ U(Re, {}),
						/* @__PURE__ */ U(te, {
							menu: {
								items: ae,
								onClick: H
							},
							trigger: ["click"],
							children: /* @__PURE__ */ W(S, {
								type: "text",
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: A.marginXS,
									maxWidth: k ? 44 : void 0,
									paddingInline: k ? A.paddingXS : void 0
								},
								"aria-label": "Account menu",
								children: [/* @__PURE__ */ U(x, {
									size: "small",
									icon: /* @__PURE__ */ U(ye, {})
								}), !k && /* @__PURE__ */ U(B.Text, {
									type: "secondary",
									ellipsis: !0,
									style: { maxWidth: 160 },
									children: C
								})]
							})
						})
					]
				}), /* @__PURE__ */ U(M.Content, {
					style: {
						margin: k ? A.marginSM : A.marginLG,
						minWidth: 0
					},
					children: /* @__PURE__ */ U(f, {})
				})]
			})
		]
	});
}
//#endregion
//#region src/router/guards.tsx
function ot({ when: e, redirect: t, children: n }) {
	return e ? n : /* @__PURE__ */ U(d, {
		to: t,
		replace: !0
	});
}
function st({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = Ue();
	return /* @__PURE__ */ U(ot, {
		when: n,
		redirect: t,
		children: e
	});
}
function ct({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = Ue();
	return /* @__PURE__ */ U(ot, {
		when: !n,
		redirect: t,
		children: e
	});
}
function lt({ permission: e, redirect: t, children: n }) {
	return /* @__PURE__ */ U(ot, {
		when: J()(e),
		redirect: t,
		children: n
	});
}
//#endregion
//#region src/router/routeAccess.ts
function ut(e) {
	return e.access ?? "protected";
}
function dt(e) {
	let t = [], n = [], r = [];
	for (let i of e) {
		let e = ut(i);
		e === "guest" ? t.push(i) : e === "public" ? n.push(i) : r.push(i);
	}
	return {
		guest: t,
		public: n,
		protected: r
	};
}
function ft(e) {
	return e.replace(/^\/+/, "");
}
function pt(e) {
	return `/${ft(e)}`;
}
function mt(e, t) {
	let { guest: n, protected: r } = dt(e), i = n.find((e) => "path" in e && e.path), a = r.find((e) => "index" in e && e.index), o = r.find((e) => "path" in e && e.path), s = t?.unauthenticated;
	!s && i && "path" in i && i.path && (s = pt(i.path));
	let c = t?.afterLogin;
	if (c || (a ? c = "/" : o && "path" in o && o.path && (c = pt(o.path))), r.length > 0 && !s) throw Error("createAdminRouter: protected routes require redirects.unauthenticated or a guest route (access: \"guest\").");
	if (n.length > 0 && !c) throw Error("createAdminRouter: guest routes require redirects.afterLogin or a protected route (index or path).");
	return {
		loginPath: s ?? "/",
		homePath: c ?? "/"
	};
}
function ht(e) {
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
function gt({ navItems: e, children: t, layoutProps: n, redirects: r }) {
	let { loginPath: i, homePath: a } = mt(t, r), { guest: o, public: s, protected: c } = dt(t), l = [];
	for (let e of o) !("path" in e) || !e.path || l.push({
		path: ft(e.path),
		element: /* @__PURE__ */ U(ct, {
			redirectTo: a,
			children: e.element
		})
	});
	for (let e of s) !("path" in e) || !e.path || l.push({
		path: ft(e.path),
		element: e.element
	});
	return c.length > 0 && l.push({
		path: "/",
		element: /* @__PURE__ */ U(st, {
			redirectTo: i,
			children: /* @__PURE__ */ U(at, {
				navItems: e,
				loginPath: i,
				...n
			})
		}),
		children: c.map(ht)
	}), l.push({
		path: "*",
		element: /* @__PURE__ */ U(d, {
			to: a,
			replace: !0
		})
	}), m(l);
}
//#endregion
//#region src/app/AdminApp.tsx
function _t({ navItems: e, routes: t, authRedirects: n, layoutProps: r, theme: i }) {
	let a = s(() => gt({
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
	return /* @__PURE__ */ U(Me, {
		...i,
		children: /* @__PURE__ */ U(p, { router: a })
	});
}
//#endregion
//#region src/context/DataProvider.tsx
var vt = t(null);
function yt({ children: e, value: t }) {
	let n = s(() => t, [t]);
	return /* @__PURE__ */ U(vt.Provider, {
		value: n,
		children: e
	});
}
function bt() {
	let e = a(vt);
	if (!e) throw Error("useDataProvider must be used within DataProvider");
	return e;
}
//#endregion
//#region src/data/resourceHandlers.ts
function xt(e) {
	return "handlers" in e ? e : { handlers: e };
}
function St(e, t, n) {
	if (!(!e || !t) && !Y(e, t, n)) throw Error("Forbidden");
}
function Ct(e, t) {
	let { can: n, guard: r, parseFormError: i } = t ?? {}, a = (t) => {
		let n = e[t];
		if (!n) throw Error(`Unknown resource: ${t}`);
		return xt(n);
	};
	return {
		async getList(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "list"), St(n, o, "list"), i.getList(t);
		},
		async getOne(e, t, i) {
			let { handlers: o, permissions: s } = a(e);
			return r?.(e, "read"), St(n, s, "read"), o.getOne(t, i);
		},
		async create(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "add"), St(n, o, "add"), i.create(t);
		},
		async update(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "change"), St(n, o, "change"), i.update(t);
		},
		async delete(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "delete"), St(n, o, "delete"), i.delete(t);
		},
		parseFormError: i
	};
}
//#endregion
//#region src/data/abortError.ts
function wt(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return t.name === "AbortError" || t.name === "CanceledError" || t.code === "ERR_CANCELED";
}
//#endregion
//#region src/data/parseFormErrorHelpers.ts
var Tt = "Expected HTTP 400 with a JSON object such as `{ \"field_name\": [\"message\"] }` or `{ \"non_field_errors\": [\"message\"] }`.", Et = 300;
function X(e) {
	if (typeof e == "string") return [e];
	if (Array.isArray(e)) {
		let t = e.filter((e) => typeof e == "string");
		if (t.length) return t;
	}
	return [];
}
function Dt(e) {
	return e.length === 1 ? e[0] : e;
}
function Ot(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function kt(e) {
	return typeof Response < "u" && e instanceof Response ? !0 : typeof e == "object" && !!e && typeof e.json == "function" && typeof e.status == "number" && e.headers != null;
}
function At(e, t) {
	if (t) return t;
	if (e === null) return "(no JSON body)";
	try {
		let t = JSON.stringify(e);
		return t.length > Et ? `${t.slice(0, Et)}…` : t;
	} catch {
		return String(e);
	}
}
function jt(e, t) {
	return `Non-standard validation response. ${Tt} Received: ${At(e, t?.hint)}`;
}
function Mt(e) {
	if (!e || typeof e != "object") return null;
	let t = e.response;
	if (!t || typeof t != "object") return null;
	let n = t.status;
	return typeof n == "number" && (n === 400 || n === 422) ? n : null;
}
function Nt(e) {
	if (!e || typeof e != "object") return null;
	let t = e.response;
	return kt(t) ? t.headers.get("content-type") : null;
}
function Pt(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (Ot(t.body)) return t.body;
	if (Ot(t.data)) return t.data;
	let n = t.response;
	if (n && typeof n == "object" && !Array.isArray(n)) {
		let e = n.data;
		if (Ot(e)) return e;
	}
	return null;
}
function Ft(e) {
	if (Ot(e)) return e;
	if (Array.isArray(e)) {
		let t = X(e);
		return t.length ? { non_field_errors: Dt(t) } : null;
	}
	return null;
}
async function It(e) {
	let t = Pt(e);
	if (t) return t;
	if (!e || typeof e != "object") return null;
	let n = e.response;
	if (!kt(n)) return null;
	let r = n.headers.get("content-type");
	if (!r || !/application\/json/i.test(r)) return null;
	try {
		return Ft(await n.clone().json());
	} catch {
		return null;
	}
}
function Lt(e) {
	return Array.isArray(e) ? e.some((e) => e && typeof e == "object" && !Array.isArray(e) && Object.values(e).some((e) => X(e).length > 0)) : !1;
}
function Rt(e, t, n) {
	t.forEach((t, r) => {
		if (!(!t || typeof t != "object" || Array.isArray(t))) for (let [i, a] of Object.entries(t)) {
			let t = X(a);
			t.length && (n[`${e}.${r}.${i}`] = Dt(t));
		}
	});
}
function zt(e, t) {
	return {
		fields: Object.keys(e).length ? e : void 0,
		global: t.length ? t : void 0
	};
}
var Bt = new Set(["non_field_errors", "detail"]);
function Vt(e) {
	let t = {}, n = [];
	for (let [r, i] of Object.entries(e)) {
		if (Bt.has(r)) {
			n.push(...X(i));
			continue;
		}
		if (Lt(i)) {
			Rt(r, i, t);
			continue;
		}
		let e = X(i);
		e.length && (t[r] = Dt(e));
	}
	return !Object.keys(t).length && !n.length ? null : zt(t, n);
}
function Ht(e, t) {
	let n = Pt(e);
	return n ? Vt(n) : null;
}
function Ut(e, t, n) {
	let r = Pt(e);
	if (!r) return null;
	let i = n?.camelCase ?? !0, a = n?.fieldMap, o = {}, s = [];
	n?.includeSummary && (s.push(...X(r.title)), s.push(...X(r.message)));
	let c = r.errors;
	if (c && typeof c == "object" && !Array.isArray(c)) for (let [e, t] of Object.entries(c)) {
		let n = a?.[e] ?? (i ? Kt(e) : e), r = X(t);
		r.length && (o[n] = Dt(r));
	}
	return !Object.keys(o).length && !s.length ? null : zt(o, s);
}
function Wt(e, t, n) {
	let r = Pt(e);
	if (!r) return null;
	let i = {}, a = [], o = n?.fieldMap, s = r.errors;
	if (Array.isArray(s)) for (let e of s) {
		if (!e || typeof e != "object") continue;
		let t = e, n = typeof t.path == "string" && t.path || typeof t.param == "string" && t.param || typeof t.field == "string" && t.field, r = X(t.msg)[0] ?? X(t.message)[0];
		r && (n ? Gt(i, o?.[n] ?? n, r) : a.push(r));
	}
	else if (s && typeof s == "object") for (let [e, t] of Object.entries(s)) {
		let n = o?.[e] ?? e, r = X(t);
		r.length && (i[n] = Dt(r));
	}
	let c = r.details;
	if (Array.isArray(c)) for (let e of c) {
		if (!e || typeof e != "object") continue;
		let t = e, n = (Array.isArray(t.path) ? t.path : []).map((e) => String(e)).join("."), r = X(t.message)[0];
		if (r) if (n) {
			let e = o?.[n] ?? n;
			i[e] = r;
		} else a.push(r);
	}
	return a.push(...X(r.error)), !Object.keys(i).length && !a.length ? null : zt(i, a);
}
function Gt(e, t, n) {
	let r = e[t];
	if (!r) {
		e[t] = n;
		return;
	}
	e[t] = Array.isArray(r) ? [...r, n] : [r, n];
}
function Kt(e) {
	return e && e.charAt(0).toLowerCase() + e.slice(1);
}
//#endregion
//#region src/data/inMemoryList.ts
function qt(e, t) {
	return e === t || String(e) === String(t);
}
function Jt(e, t) {
	let n = e.find((e) => qt(e.id, t));
	if (!n) throw Error("Not found");
	return n;
}
function Yt(e, t) {
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
function Xt(e, t) {
	return t == null || t === "" ? !0 : Array.isArray(t) ? t.length === 0 ? !0 : Array.isArray(e) ? t.some((t) => e.includes(t)) : t.includes(e) : Array.isArray(e) ? e.includes(t) : typeof t == "string" && typeof e == "string" ? e.toLowerCase().includes(t.toLowerCase()) : e === t;
}
function Zt(e, t) {
	return t ? e.filter((e) => Object.entries(t).every(([t, n]) => Xt(e[t], n))) : e;
}
function Qt(e, t, n) {
	let r = (t - 1) * n;
	return {
		data: e.slice(r, r + n),
		total: e.length
	};
}
function $t(e, t) {
	let { pagination: n, sort: r, filter: i } = t, a = Zt(e, i);
	if (r) {
		let e = Array.isArray(r) ? r : [r];
		e.length > 0 && e[0]?.field && (a = Yt(a, e));
	}
	return n ? Qt(a, n.page, n.perPage) : {
		data: a,
		total: a.length
	};
}
//#endregion
//#region src/data/createMemoryResourceHandlers.ts
function en(e) {
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
			return $t(t(e.scopeList ? e.scopeList(e.getRows(), n) : e.getRows()), n);
		},
		async getOne(t, n) {
			return { data: Jt(e.getRows(), t) };
		},
		async create(t) {
			let r = n(t, e.nextId());
			return e.getRows().push(r), { data: r };
		},
		async update({ id: t, data: n }) {
			let i = Jt(e.getRows(), t), a = r(i, n);
			return Object.assign(i, a), { data: i };
		},
		async delete(t) {
			let n = e.getRows(), r = n.findIndex((e) => qt(e.id, t));
			if (r < 0) return { data: null };
			let [i] = n.splice(r, 1);
			return e.afterDelete?.(i), { data: i };
		}
	};
}
//#endregion
//#region src/data/createRestResourceHandlers.ts
function tn(e) {
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
function nn(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function rn(e) {
	let t = nn(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function an(e) {
	let t = nn(e);
	if (t.length !== 0) return t.map((e) => `${e.field} ${e.order === "DESC" ? "desc" : "asc"}`).join(",");
}
function on(e) {
	let t = nn(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
//#endregion
//#region src/components/AuthAlternateLink.tsx
function sn({ prompt: e, linkText: t, to: n }) {
	return /* @__PURE__ */ W(B.Paragraph, {
		type: "secondary",
		style: {
			textAlign: "center",
			marginBottom: 0
		},
		children: [
			e,
			" ",
			/* @__PURE__ */ U(u, {
				to: n,
				children: t
			})
		]
	});
}
//#endregion
//#region src/layouts/AuthPageLayout.tsx
function cn({ children: e, brand: t, footer: n, showThemeToolbar: r = !0 }) {
	let { token: i } = V.useToken();
	return /* @__PURE__ */ W(E, {
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
			r ? /* @__PURE__ */ U(E, {
				justify: "flex-end",
				style: {
					flexShrink: 0,
					width: "100%",
					padding: 16,
					background: i.colorBgLayout
				},
				children: /* @__PURE__ */ U(Re, {})
			}) : null,
			t ? /* @__PURE__ */ U("div", {
				style: {
					flexShrink: 0,
					textAlign: "center",
					padding: "0 24px 16px"
				},
				children: t
			}) : null,
			/* @__PURE__ */ W(E, {
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
				children: [e, n ? /* @__PURE__ */ U("div", {
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
function ln({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, brand: r, extraFields: i, showThemeToolbar: a = !0, afterLoginPath: o = "/", alternateAuth: s, footer: c }) {
	let { login: l } = Ue(), u = g();
	return /* @__PURE__ */ U(cn, {
		brand: r ?? n,
		footer: c ?? (s ? /* @__PURE__ */ U(sn, {
			prompt: s.prompt ?? "Don't have an account?",
			linkText: s.linkText,
			to: s.to
		}) : null),
		showThemeToolbar: a,
		children: /* @__PURE__ */ W(C, {
			style: {
				width: "100%",
				maxWidth: 360
			},
			title: e,
			children: [t ? /* @__PURE__ */ U(B.Paragraph, {
				type: "secondary",
				style: { marginTop: 0 },
				children: t
			}) : null, /* @__PURE__ */ W(D, {
				layout: "vertical",
				onFinish: async (e) => {
					await l({
						username: String(e.username ?? ""),
						password: String(e.password ?? ""),
						...e
					}), u(o, { replace: !0 });
				},
				children: [
					/* @__PURE__ */ U(D.Item, {
						name: "username",
						label: "Username",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ U(A, { autoComplete: "username" })
					}),
					/* @__PURE__ */ U(D.Item, {
						name: "password",
						label: "Password",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ U(A.Password, { autoComplete: "current-password" })
					}),
					i,
					/* @__PURE__ */ U(D.Item, {
						style: { marginBottom: 0 },
						children: /* @__PURE__ */ U(S, {
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
function un({ title: e }) {
	return /* @__PURE__ */ U(B.Title, {
		level: 3,
		style: { marginTop: 0 },
		children: e
	});
}
//#endregion
//#region src/crud/utils/sortQueryParam.ts
function dn(e) {
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
function fn(e) {
	return e.length === 0 ? null : e.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function pn(e) {
	return new Map(e.map((e, t) => [e.field, t + 1]));
}
//#endregion
//#region src/crud/context/ListContext.tsx
var mn = t(null);
function hn({ children: e, toggleSort: t, sort: n }) {
	let [r, a] = l([]), o = s(() => new Set(n.map((e) => e.field)), [n]), c = s(() => new Map(n.map((e) => [e.field, e.order])), [n]), u = s(() => pn(n), [n]), d = i((e) => (a((t) => {
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
	return /* @__PURE__ */ U(mn.Provider, {
		value: f,
		children: e
	});
}
function gn() {
	let e = a(mn);
	if (!e) throw Error("Column components must be used within ResourceList");
	return e;
}
function Z(e) {
	let { registerColumn: t } = gn();
	o(() => t(e), [t, e]);
}
//#endregion
//#region src/crud/context/FilterContext.tsx
var _n = t(null);
function vn({ children: e, values: t, setFilterValue: n }) {
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
	return /* @__PURE__ */ U(_n.Provider, {
		value: c,
		children: e
	});
}
function yn() {
	return a(_n);
}
function Q(e) {
	let t = yn()?.registerFilter;
	o(() => {
		if (t) return t(e);
	}, [t, e]);
}
//#endregion
//#region src/crud/context/FormContext.tsx
var bn = t(null);
function xn({ children: e, resource: t, isNew: n, disabled: r }) {
	return /* @__PURE__ */ U(bn.Provider, {
		value: {
			resource: t,
			isNew: n,
			disabled: r
		},
		children: e
	});
}
function Sn() {
	return a(bn);
}
//#endregion
//#region src/crud/context/FormSectionContext.tsx
var Cn = t(null);
function wn({ sourcesRef: e, children: t }) {
	return /* @__PURE__ */ U(Cn.Provider, {
		value: e,
		children: t
	});
}
function Tn() {
	return a(Cn);
}
//#endregion
//#region src/crud/context/PayloadFieldsContext.tsx
var En = t(null);
function Dn({ children: e, fieldsRef: t }) {
	return /* @__PURE__ */ U(En.Provider, {
		value: t,
		children: e
	});
}
function On() {
	return a(En);
}
function kn(e, t = !0) {
	let n = On();
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
function An(e, t = !0) {
	let n = Tn();
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
//#region src/crud/context/InlineFieldsRegistry.tsx
var jn = t(null);
function Mn({ children: e, registryRef: t }) {
	return /* @__PURE__ */ U(jn.Provider, {
		value: t,
		children: e
	});
}
function Nn() {
	return a(jn);
}
function Pn(e, t, n, r, i = !0) {
	let a = Nn();
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
//#region src/crud/FormGlobalErrorsAlert.tsx
function Fn({ errors: e }) {
	return e.length ? e.length === 1 ? /* @__PURE__ */ U(y, {
		type: "error",
		title: e[0],
		showIcon: !0,
		style: { marginBottom: 16 }
	}) : /* @__PURE__ */ U(y, {
		type: "error",
		title: "Could not save",
		showIcon: !0,
		style: { marginBottom: 16 },
		description: /* @__PURE__ */ U("ul", {
			style: {
				margin: 0,
				paddingLeft: 20
			},
			children: e.map((e) => /* @__PURE__ */ U("li", { children: e }, e))
		})
	}) : null;
}
//#endregion
//#region src/crud/utils/getFormValue.ts
function In(e, t) {
	let n = t.split("."), r = e;
	for (let e of n) {
		if (typeof r != "object" || !r) return;
		r = r[e];
	}
	return r;
}
//#endregion
//#region src/crud/utils/setFormValue.ts
function Ln(e, t, n) {
	let r = t.split("."), i = e;
	for (let e = 0; e < r.length - 1; e++) {
		let t = r[e], n = i[t];
		(typeof n != "object" || !n || Array.isArray(n)) && (i[t] = {}), i = i[t];
	}
	i[r[r.length - 1]] = n;
}
//#endregion
//#region src/crud/utils/buildFormPayload.ts
function Rn(e, t) {
	if (t.length === 0) return { ...e };
	let n = {};
	for (let r of t) {
		let t = In(e, r);
		t !== void 0 && Ln(n, r, t);
	}
	return n;
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
//#region src/crud/utils/hasUploadValues.ts
function Bn(e) {
	return e instanceof Blob ? !0 : Array.isArray(e) ? e.some(Bn) : e && typeof e == "object" ? Object.values(e).some(Bn) : !1;
}
//#endregion
//#region src/crud/utils/uploadReferenceUtils.ts
function Vn(e) {
	return /^https?:\/\//i.test(e) || e.startsWith("/media/");
}
function Hn(e, t) {
	if (!t) return e;
	if (typeof e == "string") return Vn(e) ? void 0 : e;
	if (Array.isArray(e)) return e.map((e) => Hn(e, t)).filter((e) => e !== void 0);
	if (e && typeof e == "object" && !(e instanceof Blob)) {
		let n = {};
		for (let [r, i] of Object.entries(e)) {
			let e = Hn(i, t);
			e !== void 0 && (n[r] = e);
		}
		return n;
	}
	return e;
}
function Un(e, t = !0) {
	return Hn(e, t);
}
//#endregion
//#region src/crud/utils/toFormData.ts
function Wn(e, t, n, r) {
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
			if (r.skipExistingUploadUrls && Vn(n)) return;
			e.append(t, n);
			return;
		}
		if (Array.isArray(n)) {
			n.forEach((n, i) => {
				Wn(e, `${t}[${i}]`, n, r);
			});
			return;
		}
		if (typeof n == "object") {
			for (let [i, a] of Object.entries(n)) Wn(e, `${t}[${i}]`, a, r);
			return;
		}
		e.append(t, String(n));
	}
}
function Gn(e, t) {
	let n = { skipExistingUploadUrls: t?.skipExistingUploadUrls ?? !0 }, r = new FormData();
	for (let [t, i] of Object.entries(e)) Wn(r, t, i, n);
	return r;
}
//#endregion
//#region src/crud/utils/prepareFormSubmitBody.ts
function Kn(e, t) {
	let n = t?.skipExistingUploadUrls ?? !0;
	return Bn(e) ? Gn(e, t) : Un(e, n);
}
//#endregion
//#region src/crud/utils/buildResourceFormSubmitBody.ts
function qn(e, t, n, r) {
	let i = Rn(e, t);
	if (n) for (let t of n) {
		let n = e[t.field], r = t.payloadKey ?? t.field;
		i[r] = zn(n, t.sources, { transformRows: t.transformRows });
	}
	return Kn(i, r);
}
//#endregion
//#region src/crud/utils/formErrors.ts
function Jn(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function Yn(e) {
	return Array.isArray(e) ? e.join(", ") : e;
}
function Xn(e, t, n) {
	if (t.has(e)) return !0;
	let r = e.match(/^([^.]+)\.(\d+)\.([^.]+)$/);
	if (!r) return !1;
	let [, i, , a] = r;
	return n.get(i)?.sources.includes(a) ?? !1;
}
function Zn(e, t, n) {
	let r = {}, i = [...Jn(e.global)];
	for (let [a, o] of Object.entries(e.fields ?? {})) Xn(a, t, n) ? r[a] = o : i.push(Yn(o));
	return {
		fieldErrors: r,
		globalErrors: i
	};
}
function Qn(e, t) {
	for (let [n, r] of Object.entries(t)) e.setError(n, {
		type: "server",
		message: Yn(r)
	});
}
function $n(e) {
	let t = Nt(e);
	if (t && !/application\/json/i.test(t)) return `non-JSON response (Content-Type: ${t})`;
}
async function er(e, t, n, r, i) {
	let a = await It(n);
	if (a != null) {
		let n = e.parseFormError?.({ body: a }, r);
		if (n) {
			let e = new Set(i.payloadFields), r = /* @__PURE__ */ new Map();
			for (let e of i.inlineRegistry) r.set(e.field, e);
			let { fieldErrors: a, globalErrors: o } = Zn(n, e, r);
			if (Object.keys(a).length || o.length) return Qn(t, a), {
				handled: !0,
				globalErrors: o
			};
		}
		return {
			handled: !0,
			globalErrors: [jt(a)]
		};
	}
	return Mt(n) == null ? {
		handled: !1,
		globalErrors: []
	} : {
		handled: !0,
		globalErrors: [jt(null, { hint: $n(n) })]
	};
}
//#endregion
//#region src/crud/utils/useAbortableEffect.ts
function tr(e, t) {
	o(() => {
		let t = new AbortController();
		return e(t.signal), () => t.abort();
	}, t);
}
//#endregion
//#region src/crud/utils/useFormRecord.ts
function nr({ dp: e, resource: t, id: n, isNew: r, form: a, message: o, defaultValues: s, enabled: c = !0 }) {
	let [u, d] = l(!r), [f, p] = l(0), m = i(async (i) => {
		if (r || !n) {
			s ? a.reset({ ...s }) : a.reset({}), d(!1);
			return;
		}
		d(!0);
		try {
			let r = await e.getOne(t, n, { signal: i });
			if (i?.aborted) return;
			a.reset(r.data), p((e) => e + 1);
		} catch (e) {
			wt(e) || o.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			i?.aborted || d(!1);
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
	return tr((e) => {
		if (c) return m(e);
	}, [c, m]), {
		loading: u,
		formVersion: f
	};
}
function rr({ dp: e, resource: t, id: n, isNew: r, form: a, message: o, payloadFieldsRef: s, inlineRegistryRef: c, setGlobalErrors: l, onSuccess: u }) {
	return i(async (i) => {
		l([]);
		try {
			let a = qn(i, Array.from(s.current), c.current.values()), l;
			if (r) l = (await e.create(t, a)).data, o.success("Created");
			else if (n) l = (await e.update(t, {
				id: n,
				data: a
			})).data, o.success("Updated");
			else return;
			u?.(l);
		} catch (n) {
			let { handled: i, globalErrors: u } = await er(e, a, n, {
				resource: t,
				mutation: r ? "create" : "update",
				inlineFieldPaths: Array.from(c.current.keys())
			}, {
				payloadFields: s.current,
				inlineRegistry: c.current.values()
			});
			i ? (l(u), o.error(u[0] ?? "Save failed.")) : (l([]), o.error(n instanceof Error ? n.message : "Save failed"));
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
		u
	]);
}
//#endregion
//#region src/crud/ResourceRecordForm.tsx
function ir({ resource: e, id: t, children: r, defaultValues: i, enabled: a = !0, canSave: o = !0, onCancel: s, cancelHref: d, onSuccess: f, loadingMode: p = "overlay" }) {
	let m = t === "new" || !t, h = m ? void 0 : t, g = bt(), { message: _ } = b.useApp(), v = c(/* @__PURE__ */ new Set()), y = c(/* @__PURE__ */ new Map()), [x, C] = l([]), w = Se({ defaultValues: i }), { loading: T, formVersion: ee } = nr({
		dp: g,
		resource: e,
		id: h,
		isNew: m,
		form: w,
		message: _,
		defaultValues: i,
		enabled: a
	}), te = rr({
		dp: g,
		resource: e,
		id: h,
		isNew: m,
		form: w,
		message: _,
		payloadFieldsRef: v,
		inlineRegistryRef: y,
		setGlobalErrors: C,
		onSuccess: f
	}), E = /* @__PURE__ */ U(S, {
		disabled: T,
		onClick: d ? void 0 : s,
		children: "Cancel"
	}), O = /* @__PURE__ */ U(xn, {
		resource: e,
		isNew: m,
		children: /* @__PURE__ */ U(Dn, {
			fieldsRef: v,
			children: /* @__PURE__ */ U(Mn, {
				registryRef: y,
				children: /* @__PURE__ */ W("div", {
					style: { position: "relative" },
					children: [T && p === "overlay" ? /* @__PURE__ */ U("div", {
						style: {
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							zIndex: 1
						},
						children: /* @__PURE__ */ U(R, {})
					}) : null, /* @__PURE__ */ n(be, {
						...w,
						key: ee
					}, /* @__PURE__ */ W(D, {
						layout: "vertical",
						onFinish: () => void w.handleSubmit(te)(),
						style: p === "overlay" ? {
							opacity: T ? .4 : 1,
							pointerEvents: T ? "none" : void 0
						} : void 0,
						children: [
							/* @__PURE__ */ U(Fn, { errors: x }),
							r,
							/* @__PURE__ */ U(D.Item, {
								style: {
									marginTop: 16,
									marginBottom: 0
								},
								children: /* @__PURE__ */ W(L, { children: [/* @__PURE__ */ U(S, {
									type: "primary",
									htmlType: "submit",
									disabled: T || !o,
									children: "Save"
								}), d ? /* @__PURE__ */ U(u, {
									to: d,
									children: E
								}) : E] })
							})
						]
					}))]
				})
			})
		})
	});
	return T && p === "replace" ? /* @__PURE__ */ U(R, {}) : O;
}
//#endregion
//#region src/crud/ResourceFormModal.tsx
function ar({ resource: e, editId: t, onClose: n, children: r, title: i }) {
	let a = t === "new", o = t != null;
	return /* @__PURE__ */ U(ne, {
		open: o,
		title: i ?? (a ? `New ${e}` : `Edit ${e}`),
		onCancel: n,
		footer: null,
		destroyOnHidden: !0,
		width: 560,
		children: /* @__PURE__ */ U(ir, {
			resource: e,
			id: t ?? void 0,
			enabled: o,
			loadingMode: "replace",
			onCancel: n,
			onSuccess: () => n(),
			children: r
		})
	});
}
//#endregion
//#region src/crud/ListActionsBar.tsx
function or({ selectedCount: e, total: t, allPageSelected: n, allMatchingSelected: r, onSelectAllMatching: a, onClearSelection: o, actions: c, onExecute: u, selectedIds: d, running: f = !1 }) {
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
	return /* @__PURE__ */ W(L, {
		wrap: !0,
		style: {
			marginBottom: 16,
			width: "100%"
		},
		align: "center",
		children: [
			/* @__PURE__ */ W(B.Text, {
				type: "secondary",
				children: [
					e,
					" of ",
					t,
					" selected"
				]
			}),
			e > 0 ? /* @__PURE__ */ U(S, {
				type: "link",
				size: "small",
				onClick: o,
				style: { padding: 0 },
				children: "Clear selection"
			}) : null,
			_ ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(B.Text, {
				type: "secondary",
				children: "·"
			}), /* @__PURE__ */ W(S, {
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
			r && t > 0 ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(B.Text, {
				type: "secondary",
				children: "·"
			}), /* @__PURE__ */ W(B.Text, {
				type: "success",
				children: [
					"All ",
					t,
					" items selected"
				]
			})] }) : null,
			/* @__PURE__ */ U(I, {
				placeholder: "Action",
				style: { minWidth: 200 },
				options: h,
				value: p,
				onChange: m,
				disabled: e === 0 || f,
				allowClear: !0
			}),
			/* @__PURE__ */ U(S, {
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
var sr = new Set([
	"page",
	"perPage",
	"sort",
	"create",
	"edit"
]), cr = 1, lr = 10;
function ur(e) {
	if (e.includes(",")) {
		let t = e.split(",").map((e) => e.trim()), n = t.map(Number);
		return n.every((e) => Number.isFinite(e)) ? n : t;
	}
	let t = Number(e);
	return e !== "" && Number.isFinite(t) && String(t) === e ? t : e === "true" ? !0 : e === "false" ? !1 : e;
}
function dr(e) {
	return e == null || e === "" ? null : Array.isArray(e) ? e.length === 0 ? null : e.map(String).join(",") : String(e);
}
function fr(e) {
	let [t, n] = v(), r = s(() => {
		let n = t.get("page"), r = t.get("perPage"), i = n ? Math.max(1, Number(n) || cr) : cr, a = r ? Math.max(1, Number(r) || lr) : lr, o = t.getAll("sort"), s = o.length > 0 ? o.flatMap((e) => dn(e)) : dn(t.get("sort")), c = { ...e };
		return t.forEach((e, n) => {
			if (sr.has(n)) return;
			let r = c[n];
			r === void 0 ? t.getAll(n).length > 1 ? c[n] = t.getAll(n).map(ur) : c[n] = ur(e) : c[n] = [...Array.isArray(r) ? r : [r], ur(e)];
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
				e === lr ? t.delete("perPage") : t.set("perPage", String(e)), t.delete("page");
			});
		},
		setSort: (e) => {
			a((t) => {
				t.delete("sort");
				let n = fn(e);
				n && t.set("sort", n);
			});
		},
		toggleSort: (e) => {
			a((t) => {
				let n = t.getAll("sort").flatMap((e) => dn(e)), r = n.findIndex((t) => t.field === e), i;
				i = r < 0 ? [...n, {
					field: e,
					order: "ASC"
				}] : n[r].order === "ASC" ? n.map((e, t) => t === r ? {
					...e,
					order: "DESC"
				} : e) : n.filter((e, t) => t !== r), t.delete("sort");
				let a = fn(i);
				a && t.set("sort", a);
			});
		},
		setFilter: (e, t) => {
			a((n) => {
				n.delete(e);
				let r = dr(t);
				r != null && n.set(e, r), n.delete("page");
			});
		},
		setFilters: (e) => {
			a((t) => {
				for (let e of [...t.keys()]) sr.has(e) || t.delete(e);
				for (let [n, r] of Object.entries(e)) {
					let e = dr(r);
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
var pr = t(null);
function mr() {
	return a(pr);
}
function hr({ resource: e, title: t, pathPrefix: n, newPath: r, editMode: a = "page", formChildren: o, actions: c, rowActions: d, headerExtra: f, bulkActions: p, bulkDelete: m = !0, bulkActionsEnabled: h = !0, permissions: g, queryState: _, queryActions: v }) {
	let y = bt(), x = J(), { message: w, modal: T } = b.useApp(), { columns: ee, sortOrders: te, sortPriorities: E } = gn(), [D, O] = l(!1), [k, A] = l([]), [j, M] = l(0), [N, ne] = l(() => /* @__PURE__ */ new Set()), [P, F] = l(!1), I = r ?? `${n}/new`, R = Y(x, g, "add"), re = Y(x, g, "change"), z = Y(x, g, "delete"), ae = re && (a === "page" || a === "both") && c?.edit !== !1, V = re && (a === "modal" || a === "both") && c?.quickEdit !== !1, G = z && c?.delete !== !1, ce = ae || V || G || d, le = i(() => {
		ne(/* @__PURE__ */ new Set());
	}, []), ue = s(() => {
		if (!h) return [];
		let t = [];
		return m && z && t.push({
			key: "__delete",
			label: "Delete selected",
			confirm: (e) => `Delete ${e.length} selected item(s)? This cannot be undone.`,
			execute: async (t, { reload: n, clearSelection: r }) => {
				await Promise.all(t.map((t) => y.delete(e, t))), r(), n(), w.success(`Deleted ${t.length} item(s)`);
			}
		}), [...t, ...p ?? []];
	}, [
		h,
		m,
		z,
		p,
		y,
		e,
		w
	]), de = ue.length > 0, fe = N.size, pe = k.length > 0 && k.every((e) => N.has(e.id)), me = j > 0 && fe >= j, he = s(() => k.filter((e) => N.has(e.id)).map((e) => e.id), [k, N]), ge = i((e) => {
		ne((t) => {
			let n = new Set(t), r = k.map((e) => e.id);
			for (let t of r) e.includes(t) || n.delete(t);
			for (let t of e) n.add(t);
			return n;
		});
	}, [k]), _e = i(async () => {
		if (!(j <= 0)) {
			F(!0);
			try {
				let t = _.sort.length === 0 ? void 0 : _.sort.length === 1 ? _.sort[0] : _.sort, n = await y.getList(e, {
					pagination: {
						page: 1,
						perPage: j
					},
					sort: t,
					filter: _.filter
				});
				ne(new Set(n.data.map((e) => e.id)));
			} catch (e) {
				w.error(e instanceof Error ? e.message : "Load failed");
			} finally {
				F(!1);
			}
		}
	}, [
		y,
		e,
		j,
		_.sort,
		_.filter,
		w
	]), ve = i((e) => {
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
	}, [v, _.sort.length]), ye = s(() => {
		let e = _.sort.length === 0 ? void 0 : _.sort.length === 1 ? _.sort[0] : _.sort;
		return {
			pagination: {
				page: _.page,
				perPage: _.perPage
			},
			sort: e,
			filter: _.filter
		};
	}, [_]), K = i(async (t) => {
		O(!0);
		try {
			let n = await y.getList(e, {
				...ye,
				signal: t
			});
			if (t?.aborted) return;
			A(n.data), M(n.total);
		} catch (e) {
			wt(e) || w.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			t?.aborted || O(!1);
		}
	}, [
		y,
		e,
		ye,
		w
	]);
	tr((e) => K(e), [K]);
	let be = s(() => ({
		reload: () => void K(),
		clearSelection: le
	}), [K, le]), xe = i(async (e, t) => {
		if (e.confirm) {
			let n = typeof e.confirm == "function" ? await e.confirm(t, be) : e.confirm;
			if (n === !1 || !await new Promise((t) => {
				T.confirm({
					title: n,
					okType: e.key === "__delete" ? "danger" : "primary",
					onOk: () => t(!0),
					onCancel: () => t(!1)
				});
			})) return;
		}
		F(!0);
		try {
			await e.execute(t, be);
		} catch (e) {
			w.error(e instanceof Error ? e.message : "Action failed");
		} finally {
			F(!1);
		}
	}, [
		be,
		T,
		w
	]), Se = i(async (t) => {
		if (z) try {
			await y.delete(e, t.id), w.success("Deleted"), K();
		} catch (e) {
			w.error(e instanceof Error ? e.message : "Delete failed");
		}
	}, [
		z,
		y,
		e,
		K,
		w
	]), q = s(() => {
		let e = ee.map((e) => {
			let t = e.buildColumn();
			if (e.sortable) {
				let n = te.get(e.source), r = E.get(e.source), i = n === "ASC" ? "ascend" : n === "DESC" ? "descend" : void 0, a = i == null ? void 0 : /* @__PURE__ */ W("span", {
					style: {
						display: "inline-flex",
						alignItems: "center",
						gap: 2,
						marginInlineStart: 4,
						color: "var(--ant-color-primary)"
					},
					children: [r == null ? null : /* @__PURE__ */ U("span", {
						style: {
							fontSize: 11,
							fontWeight: 600,
							lineHeight: 1,
							minWidth: 10,
							textAlign: "center"
						},
						children: r
					}), U(i === "ascend" ? se : oe, { style: { fontSize: 11 } })]
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
		if (!ce) return e;
		let t = {
			reload: () => void K(),
			openEditModal: v.openEditModal
		}, r = {
			title: "Actions",
			key: "__actions",
			width: a === "both" ? 200 : 160,
			render: (e, r) => /* @__PURE__ */ W(L, {
				size: "small",
				wrap: !0,
				children: [
					ae ? /* @__PURE__ */ U(u, {
						to: `${n}/${String(r.id)}`,
						children: "Edit"
					}) : null,
					V ? /* @__PURE__ */ U(S, {
						type: "link",
						size: "small",
						style: { padding: 0 },
						onClick: () => v.openEditModal(r.id),
						children: a === "both" ? "Quick edit" : "Edit"
					}) : null,
					G ? /* @__PURE__ */ U(S, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => void Se(r),
						style: { padding: 0 },
						children: "Delete"
					}) : null,
					d?.(r, t)
				]
			})
		};
		return [...e, r];
	}, [
		ee,
		ce,
		ae,
		V,
		G,
		a,
		n,
		Se,
		te,
		E,
		v,
		d,
		K
	]), Ce = o && (_.createModal || _.editId != null) && (a === "modal" || a === "both");
	return /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W(C, {
		title: /* @__PURE__ */ U(B.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		}),
		extra: f || R ? /* @__PURE__ */ W(L, { children: [f, R ? a === "modal" || a === "both" ? /* @__PURE__ */ W(H, { children: [a === "both" ? /* @__PURE__ */ U(u, {
			to: I,
			children: /* @__PURE__ */ U(S, { children: "New page" })
		}) : null, /* @__PURE__ */ U(S, {
			type: "primary",
			onClick: () => v.openCreateModal(),
			children: "New"
		})] }) : /* @__PURE__ */ U(u, {
			to: I,
			children: /* @__PURE__ */ U(S, {
				type: "primary",
				children: "New"
			})
		}) : null] }) : null,
		children: [de ? /* @__PURE__ */ U(or, {
			selectedCount: fe,
			total: j,
			allPageSelected: pe,
			allMatchingSelected: me,
			onSelectAllMatching: () => void _e(),
			onClearSelection: le,
			actions: ue,
			onExecute: xe,
			selectedIds: [...N],
			running: P || D
		}) : null, /* @__PURE__ */ U(ie, {
			rowKey: "id",
			loading: D,
			columns: q,
			dataSource: k,
			scroll: { x: "max-content" },
			rowSelection: de ? {
				selectedRowKeys: he,
				onChange: ge,
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
				ve(n);
			}
		})]
	}), Ce ? /* @__PURE__ */ U(ar, {
		resource: e,
		editId: _.createModal ? "new" : _.editId,
		onClose: () => {
			v.closeModal(), K();
		},
		children: o
	}) : null] });
}
function gr({ resource: e, title: t, pathPrefix: n, newPath: r, staticFilter: a, editMode: o = "page", syncQueryParams: c = !0, children: l, formChildren: u, actions: d, rowActions: f, headerExtra: p, bulkActions: m, bulkDelete: h, bulkActionsEnabled: g, permissions: _ }) {
	let [v, y] = fr(a), b = s(() => {
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
	return /* @__PURE__ */ U(pr.Provider, {
		value: S,
		children: /* @__PURE__ */ U(vn, {
			values: b,
			setFilterValue: x,
			children: /* @__PURE__ */ W(hn, {
				toggleSort: y.toggleSort,
				sort: v.sort,
				children: [l, /* @__PURE__ */ U(hr, {
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
function _r() {
	let e = yn();
	return !e || e.filters.length === 0 ? null : /* @__PURE__ */ U(L, {
		wrap: !0,
		size: "middle",
		style: { marginBottom: 16 },
		children: e.filters.map((t) => /* @__PURE__ */ W(L, {
			orientation: "vertical",
			size: 2,
			children: [t.label ? /* @__PURE__ */ U(B.Text, {
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
function vr({ children: e }) {
	return /* @__PURE__ */ W(H, { children: [e, /* @__PURE__ */ U(_r, {})] });
}
//#endregion
//#region src/crud/ResourceForm.tsx
function yr({ resource: e, title: t, listPath: n, children: r, defaultValues: i, onSaved: a, stayOnPage: s, permissions: c }) {
	let { id: l } = _(), d = l === "new" || !l, f = J(), p = g(), { token: m } = V.useToken();
	o(() => {
		c && (Y(f, c, d ? "add" : "change") || p(n, { replace: !0 }));
	}, [
		c,
		d,
		f,
		p,
		n
	]);
	let h = c ? Y(f, c, d ? "add" : "change") : !0;
	return /* @__PURE__ */ U(C, {
		title: /* @__PURE__ */ W(L, { children: [/* @__PURE__ */ W(u, {
			to: n,
			style: { color: m.colorText },
			children: [/* @__PURE__ */ U(G, {}), " Back"]
		}), /* @__PURE__ */ U(B.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		})] }),
		children: /* @__PURE__ */ U(ir, {
			resource: e,
			id: l,
			defaultValues: i,
			canSave: h,
			cancelHref: n,
			onCancel: () => p(n),
			onSuccess: (e) => {
				a?.(e), s || p(n);
			},
			children: r
		})
	});
}
//#endregion
//#region src/crud/utils/nestedFieldPath.ts
function br(e, t, n) {
	return `${e}.${t}.${n}`;
}
//#endregion
//#region src/crud/InlineFormSet.tsx
function xr(e) {
	let t = {};
	for (let n of e) t[n] = void 0;
	return t;
}
function Sr(e, t) {
	let { control: n } = q(), { fields: r, append: i, remove: a } = xe({
		control: n,
		name: e,
		keyName: "rowKey"
	});
	return {
		fields: r,
		remove: a,
		appendEmpty: () => i(xr(t))
	};
}
function Cr({ field: e, label: t, payloadKey: n, transformRows: r, columns: i }) {
	let a = s(() => i.map((e) => e.source), [i]), { fields: o, remove: c, appendEmpty: l } = Sr(e, a);
	kn(e), Pn(e, a, n, r);
	let u = s(() => i.map((t) => ({
		title: t.label ?? t.source,
		key: t.source,
		width: t.width,
		onHeaderCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		onCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		render: (n, r, i) => t.cell({
			name: br(e, i, t.source),
			index: i,
			field: e
		})
	})), [i, e]);
	return /* @__PURE__ */ W("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ U(B.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ U(ie, {
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
					render: (e, t, n) => /* @__PURE__ */ U(S, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => c(n),
						children: "Remove"
					})
				}]
			}),
			/* @__PURE__ */ U(S, {
				type: "dashed",
				style: { marginTop: 8 },
				onClick: l,
				children: "Add row"
			})
		]
	});
}
function wr({ field: e, label: t, payloadKey: n, transformRows: r, sources: i, renderRow: a }) {
	let { fields: o, remove: s, appendEmpty: c } = Sr(e, i);
	return kn(e), Pn(e, i, n, r), /* @__PURE__ */ W("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ U(B.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ U(L, {
				orientation: "vertical",
				size: "middle",
				style: { width: "100%" },
				children: o.map((t, n) => /* @__PURE__ */ U(C, {
					size: "small",
					title: `Item ${n + 1}`,
					extra: /* @__PURE__ */ U(S, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => s(n),
						children: "Remove"
					}),
					children: a({
						field: e,
						index: n,
						name: (t) => br(e, n, t)
					})
				}, t.rowKey))
			}),
			/* @__PURE__ */ U(S, {
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
function Tr(e, t, n) {
	for (let r of e) if (t(r, n).invalid) return !0;
	return !1;
}
function Er(e) {
	let t = c([]);
	for (; t.current.length < e;) t.current.push({ current: /* @__PURE__ */ new Set() });
	return t.current.length > e && (t.current.length = e), t.current;
}
function Dr(e, t) {
	let { control: n, getFieldState: r, setFocus: i } = q(), a = Ce({ control: n }), s = c(0), l = c(0);
	o(() => {
		if (a.submitCount === 0) return;
		let n = Object.keys(a.errors).length, o = a.submitCount !== s.current, c = !o && n > 0 && l.current === 0;
		if (s.current = a.submitCount, l.current = n, !o && !c || n === 0) return;
		let u = e.findIndex((e) => Tr(e.current, r, a));
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
function Or(e) {
	return null;
}
function kr(e) {
	return r(e) && e.type === Or;
}
function Ar({ children: t, defaultActiveKey: n, activeKey: r, onChange: a, ...o }) {
	let { token: c } = V.useToken(), u = s(() => e.toArray(t).filter(kr).map((e, t) => ({
		key: e.key ?? String(t),
		label: e.props.label,
		disabled: e.props.disabled,
		children: e.props.children
	})), [t]), d = Er(u.length), f = r !== void 0, [p, m] = l(() => n ?? u[0]?.key ?? "0"), h = f ? r : p, g = i((e) => {
		f || m(e), a?.(e);
	}, [f, a]);
	Dr(d, i((e) => {
		let t = u[e]?.key;
		t != null && g(t);
	}, [g, u]));
	let { control: _, getFieldState: v } = q(), y = Ce({ control: _ });
	return /* @__PURE__ */ U(ae, {
		destroyOnHidden: !1,
		items: s(() => u.map((e, t) => {
			let n = Tr(d[t].current, v, y);
			return {
				key: e.key,
				label: n ? /* @__PURE__ */ U("span", {
					style: { color: c.colorError },
					children: e.label
				}) : e.label,
				disabled: e.disabled,
				children: /* @__PURE__ */ U(wn, {
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
function jr(e) {
	return null;
}
function Mr(e) {
	return r(e) && e.type === jr;
}
function Nr({ children: t, initialStep: n = 0, showNavigation: r = !0, allowStepSelect: a = !1, stepsStyle: o, navigationStyle: c, size: u, direction: d, type: f, status: p }) {
	let m = s(() => e.toArray(t).filter(Mr), [t]), h = Er(m.length), [g, _] = l(n), v = m.length - 1;
	Dr(h, _);
	let { control: y, getFieldState: b } = q(), x = Ce({ control: y }), C = s(() => m.map((e, t) => {
		let n = Tr(h[t].current, b, x);
		return {
			title: e.props.title,
			description: e.props.description,
			status: n ? "error" : void 0
		};
	}), [
		x,
		b,
		h,
		m
	]), w = i((e) => {
		_(e);
	}, []);
	return /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U(re, {
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
		m.map((e, t) => /* @__PURE__ */ U("div", {
			style: { display: g === t ? void 0 : "none" },
			children: /* @__PURE__ */ U(wn, {
				sourcesRef: h[t],
				children: e.props.children
			})
		}, e.key ?? String(t))),
		r && m.length > 1 ? /* @__PURE__ */ W(L, {
			style: {
				marginTop: 16,
				...c
			},
			children: [/* @__PURE__ */ U(S, {
				disabled: g === 0,
				onClick: () => _((e) => e - 1),
				children: "Previous"
			}), /* @__PURE__ */ U(S, {
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
function $({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, children: o }) {
	let s = t ?? e, c = !s.includes("."), { control: l } = q(), u = Sn(), d = a ? void 0 : n ?? e, f = n ?? e;
	return kn(e, c), An(e, c), /* @__PURE__ */ U(K, {
		name: s,
		control: l,
		rules: {
			required: r ? `${f} is required` : !1,
			...i
		},
		render: ({ field: e, fieldState: t }) => /* @__PURE__ */ U(D.Item, {
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
function Pr({ source: e, name: t, label: n, required: r, rules: i, placeholder: a, inputStyle: o, hideLabel: s }) {
	return /* @__PURE__ */ U($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: s,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ U(A, {
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
function Fr({ source: e, name: t, label: n, required: r, rules: i, min: a, max: o, step: s, inputStyle: c, hideLabel: l }) {
	return /* @__PURE__ */ U($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: l,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ U(j, {
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
function Ir({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a }) {
	return /* @__PURE__ */ U($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ U(z, {
			checked: !!e,
			onChange: t,
			disabled: n
		})
	});
}
//#endregion
//#region src/crud/fields/DateField.tsx
var Lr = "YYYY-MM-DD";
function Rr({ source: e, name: t, label: n, required: r, rules: i, showTime: a, hideLabel: o }) {
	return /* @__PURE__ */ U($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ U(T, {
			value: e ? Te(String(e)) : null,
			onChange: (e) => t(e ? e.format(a ? `${Lr} HH:mm:ss` : Lr) : null),
			onBlur: n,
			showTime: a,
			disabled: r,
			format: a ? `${Lr} HH:mm:ss` : Lr,
			style: { width: "100%" }
		})
	});
}
//#endregion
//#region src/crud/fields/SelectField.tsx
function zr({ source: e, name: t, label: n, required: r, rules: i, choices: a, mode: o, allowClear: s, hideLabel: c }) {
	return /* @__PURE__ */ U($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: c,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ U(I, {
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
function Br({ source: e, name: t, label: n, required: r, rules: i, autoComplete: a, hideLabel: o }) {
	return /* @__PURE__ */ U($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ U(A.Password, {
			value: e,
			onChange: (e) => t(e.target.value),
			onBlur: n,
			disabled: r,
			autoComplete: a
		})
	});
}
function Vr({ source: e, name: t, label: n, required: r, rules: i, confirmSource: a, confirmLabel: o = "Confirm password", autoComplete: s = "new-password", hideLabel: c }) {
	let l = we({
		name: t ?? e,
		disabled: !a
	});
	return a ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(Br, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		autoComplete: s,
		hideLabel: c
	}), /* @__PURE__ */ U(Br, {
		source: a,
		label: o,
		required: r,
		autoComplete: s,
		hideLabel: c,
		rules: { validate: (e) => !l || e === l || "Passwords do not match" }
	})] }) : /* @__PURE__ */ U(Br, {
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
var Hr = /* @__PURE__ */ new Map(), Ur = /* @__PURE__ */ new Map();
function Wr(e, t) {
	return typeof e == "function" ? `fn:${t ?? ""}` : Array.isArray(e) ? `static:${e.length}` : `res:${e.resource}:${JSON.stringify(e.filter ?? {})}:${t ?? ""}`;
}
function Gr(e, t) {
	return typeof t == "function" ? t(e) : String(e[t] ?? "");
}
async function Kr(e, t, n, r, i) {
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
		label: Gr(e, n),
		value: e[r],
		record: e
	}));
}
function qr(e, t, n, r, i) {
	let a = Wr(e, i), o = Hr.get(a);
	if (o && !i) return Promise.resolve(o);
	let s = Ur.get(a);
	if (s) return s;
	let c = Kr(e, t, n, r, i).then((e) => (i || Hr.set(a, e), e)).finally(() => {
		Ur.delete(a);
	});
	return Ur.set(a, c), c;
}
function Jr(e, t, n = "name", r = "id", a) {
	let c = bt(), u = s(() => {
		if (e) return e;
		if (t) return {
			resource: t,
			filter: a ? { q: a } : void 0
		};
	}, [
		e,
		t,
		a
	]), d = u ? Wr(u, a) : void 0, [f, p] = l(() => !d || a ? [] : Hr.get(d) ?? []), [m, h] = l(() => !d || a ? !!u : !Hr.has(d)), g = i(async () => {
		if (!u) {
			p([]), h(!1);
			return;
		}
		let e = Wr(u, a), t = Hr.get(e);
		if (t && !a) {
			p(t), h(!1);
			return;
		}
		h(!0);
		try {
			p(await qr(u, c, n, r, a));
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
function Yr({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: c, rules: u, search: d, allowClear: f, disabled: p, hideLabel: m, inputStyle: h, onValueChange: g }) {
	let [_, v] = l(), { options: y, loading: b, optionForValue: x } = Jr(i, r, a, o, d ? _ : void 0), S = s(() => y.map((e) => ({
		label: e.label,
		value: e.value
	})), [y]);
	return /* @__PURE__ */ U($, {
		source: e,
		name: t,
		label: n,
		required: c,
		rules: u,
		hideLabel: m,
		children: ({ value: e, onChange: t, disabled: n, name: r }) => /* @__PURE__ */ U(I, {
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
function Xr({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: c, rules: u, search: d, allowClear: f = !0, hideLabel: p }) {
	let [m, h] = l(), { options: g, loading: _ } = Jr(i, r, a, o, d ? m : void 0), v = s(() => g.map((e) => ({
		label: e.label,
		value: e.value
	})), [g]);
	return /* @__PURE__ */ U($, {
		source: e,
		name: t,
		label: n,
		required: c,
		rules: u,
		hideLabel: p,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ U(I, {
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
function Zr(e) {
	return e instanceof File ? !0 : typeof e == "string" && e.length > 0;
}
function Qr(e) {
	if (e instanceof File) return e.name;
	if (typeof e == "string" && e.length > 0) try {
		return new URL(e, "http://local").pathname.split("/").filter(Boolean).pop() || e;
	} catch {
		return e.split("/").filter(Boolean).pop() || e;
	}
}
//#endregion
//#region src/crud/fields/useUploadPreviewUrl.ts
function $r(e) {
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
function ei({ value: e, onChange: t, disabled: n, clearable: r, accept: i = "image/*", previewWidth: a = 200 }) {
	let o = c(null), s = $r(e), l = r && Zr(e);
	return /* @__PURE__ */ W(L, {
		direction: "vertical",
		size: "middle",
		style: { width: "100%" },
		children: [
			s ? /* @__PURE__ */ U(k, {
				src: s,
				alt: "",
				style: {
					maxWidth: a,
					maxHeight: a,
					objectFit: "contain"
				}
			}) : null,
			/* @__PURE__ */ W(L, {
				wrap: !0,
				children: [/* @__PURE__ */ U(S, {
					icon: /* @__PURE__ */ U(ve, {}),
					disabled: n,
					onClick: () => o.current?.click(),
					children: "Choose image"
				}), l ? /* @__PURE__ */ U(S, {
					icon: /* @__PURE__ */ U(le, {}),
					disabled: n,
					onClick: () => {
						t(null), o.current && (o.current.value = "");
					},
					children: "Clear"
				}) : null]
			}),
			/* @__PURE__ */ U("input", {
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
function ti({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, clearable: o, accept: s, previewWidth: c }) {
	return /* @__PURE__ */ U($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ U(ei, {
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
function ni({ value: e, onChange: t, disabled: n, clearable: r, accept: i }) {
	let a = c(null), o = Qr(e), s = typeof e == "string" && e.length > 0 ? e : void 0, l = r && Zr(e);
	return /* @__PURE__ */ W(L, {
		direction: "vertical",
		size: "middle",
		style: { width: "100%" },
		children: [
			o ? /* @__PURE__ */ W(L, { children: [/* @__PURE__ */ U(he, {}), s ? /* @__PURE__ */ U(B.Link, {
				href: s,
				target: "_blank",
				rel: "noopener noreferrer",
				children: o
			}) : /* @__PURE__ */ U(B.Text, { children: o })] }) : null,
			/* @__PURE__ */ W(L, {
				wrap: !0,
				children: [/* @__PURE__ */ U(S, {
					icon: /* @__PURE__ */ U(ve, {}),
					disabled: n,
					onClick: () => a.current?.click(),
					children: "Choose file"
				}), l ? /* @__PURE__ */ U(S, {
					icon: /* @__PURE__ */ U(le, {}),
					disabled: n,
					onClick: () => {
						t(null), a.current && (a.current.value = "");
					},
					children: "Clear"
				}) : null]
			}),
			/* @__PURE__ */ U("input", {
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
function ri({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, clearable: o, accept: s }) {
	return /* @__PURE__ */ U($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ U(ni, {
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
function ii({ source: e, label: t, sortable: n = !0 }) {
	return Z(s(() => ({
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
function ai(e, t, n) {
	return typeof n == "function" ? n(e) : n ? In(e, n) : e[t];
}
//#endregion
//#region src/crud/columns/NumberColumn.tsx
function oi({ source: e, label: t, sortable: n = !0 }) {
	return Z(s(() => ({
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
function si({ source: e, label: t, sortable: n = !0 }) {
	return Z(s(() => ({
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
function ci({ source: e, label: t, sortable: n = !0 }) {
	return Z(s(() => ({
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
function li({ record: e, source: t, display: n, reference: r, choices: i, optionLabel: a, optionValue: o }) {
	let { labelForValue: s } = Jr(i, r, a, o), c = e[t];
	if (typeof n == "function") return /* @__PURE__ */ U(H, { children: n(e) });
	if (n && n !== t) {
		let r = ai(e, t, n);
		return /* @__PURE__ */ U(H, { children: r == null ? "—" : String(r) });
	}
	return /* @__PURE__ */ U(H, { children: s(c) });
}
function ui({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", display: o, sortable: c = !0 }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		sortable: c,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: c ? !0 : void 0,
			render: (s, c) => /* @__PURE__ */ U(li, {
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
function di({ record: e, source: t, reference: n, choices: r, optionLabel: i, optionValue: a }) {
	let { labelsForValues: o } = Jr(r, n, i, a), s = e[t];
	return /* @__PURE__ */ U(H, { children: o(Array.isArray(s) ? s : []) });
}
function fi({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", sortable: o = !1 }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		sortable: o,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: o ? !0 : void 0,
			render: (t, o) => /* @__PURE__ */ U(di, {
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
function pi({ source: e, label: t, sortable: n = !1, width: r = 40, height: i = 40, objectFit: a = "cover", borderRadius: o = 4, alt: c = "" }) {
	return Z(s(() => ({
		key: e,
		source: e,
		label: t,
		sortable: n,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: n ? !0 : void 0,
			render: (e) => e == null || e === "" ? null : /* @__PURE__ */ U("img", {
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
function mi({ source: e, label: t, sortable: n = !1, render: r }) {
	return Z(s(() => ({
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
function hi({ source: e, label: t, placeholder: n }) {
	return Q(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: r, onChange: i }) => /* @__PURE__ */ U(A, {
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
function gi({ source: e, label: t }) {
	return Q(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ U(j, {
			placeholder: t ?? e,
			value: n,
			onChange: (e) => r(e ?? void 0),
			style: { minWidth: 120 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/BooleanFilter.tsx
function _i({ source: e, label: t }) {
	return Q(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ U(I, {
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
function vi({ source: e, label: t }) {
	return Q(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ U(T, {
			allowClear: !0,
			placeholder: t ?? e,
			value: n ? Te(String(n)) : null,
			onChange: (e) => r(e ? e.format("YYYY-MM-DD") : void 0),
			style: { minWidth: 160 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/SelectFilter.tsx
function yi({ source: e, label: t, choices: n, multiple: r }) {
	return Q(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: i, onChange: a }) => /* @__PURE__ */ U(I, {
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
function bi({ source: e, label: t, reference: n, choices: r, optionLabel: i, optionValue: a, multiple: o, search: s, value: c, onChange: u }) {
	let [d, f] = l(), { options: p, loading: m } = Jr(r, n, i, a, s ? d : void 0);
	return /* @__PURE__ */ U(I, {
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
function xi({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", multiple: o, search: c }) {
	return Q(s(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: s, onChange: l }) => /* @__PURE__ */ U(bi, {
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
function Si(e) {
	return /* @__PURE__ */ U(xi, {
		...e,
		multiple: !0
	});
}
//#endregion
export { _t as AdminApp, at as AdminLayout, Me as AppThemeProvider, sn as AuthAlternateLink, cn as AuthPageLayout, He as AuthProvider, si as BooleanColumn, Ir as BooleanField, _i as BooleanFilter, mi as CustomColumn, yt as DataProvider, ci as DateColumn, Rr as DateField, vi as DateFilter, Fe as DensitySwitch, Tt as EXPECTED_VALIDATION_BODY_HINT, $ as FieldWrapper, ri as FileField, vr as FilterBar, jr as FormStep, Nr as FormSteps, Or as FormTab, Ar as FormTabs, ot as Guard, ct as GuestOnly, pi as ImageColumn, ti as ImageField, Cr as InlineFormSet, wr as InlineFormSetStacked, ln as LoginPage, oi as NumberColumn, Fr as NumberField, gi as NumberFilter, Vr as PasswordField, qe as PermissionsProvider, un as PlaceholderPage, st as Protected, ui as ReferenceColumn, Yr as ReferenceField, xi as ReferenceFilter, fi as ReferenceManyColumn, Xr as ReferenceManyField, Si as ReferenceManyFilter, lt as RequirePermission, yr as ResourceForm, ar as ResourceFormModal, gr as ResourceList, zr as SelectField, yi as SelectFilter, ii as TextColumn, Pr as TextField, hi as TextFilter, Le as ThemeSwitch, Re as ThemeToolbar, $t as applyInMemoryListParams, X as asStringMessages, Rn as buildFormPayload, zn as buildInlineRowsPayload, qn as buildResourceFormSubmitBody, Ct as combineResourceHandlers, gt as createAdminRouter, en as createMemoryResourceHandlers, Je as createPermissionsChecker, tn as createRestResourceHandlers, Ge as createSessionStorageAuthAdapter, mt as deriveAuthPaths, jt as describeNonStandardValidationBody, Xe as filterNavByPermission, Zt as filterRows, zt as finalizeFormErrors, Rt as flattenNestedArrayErrors, Pt as getErrorBody, In as getFormValue, ut as getRouteAccess, Jt as getRowById, Bn as hasUploadValues, wt as isAbortError, br as nestedFieldPath, Ht as parseDjangoDRFFormErrors, Ut as parseDotNetFormErrors, Wt as parseNodeFormErrors, dt as partitionAdminRoutes, Kn as prepareFormSubmitBody, It as resolveErrorBody, Ln as setFormValue, rn as toDjangoRestOrdering, Gn as toFormData, on as toJsonApiSort, an as toODataOrderBy, tr as useAbortableEffect, Ue as useAuth, Ye as useCan, Jr as useChoices, bt as useDataProvider, fr as useListQueryState, J as usePermissions, kn as useRegisterPayloadField, An as useRegisterSectionField, mr as useResourceListContext, Ne as useThemeMode };
