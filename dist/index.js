import { createContext as e, createElement as t, useCallback as n, useContext as r, useEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { Link as c, Navigate as l, Outlet as u, RouterProvider as d, createBrowserRouter as f, useLocation as p, useNavigate as m, useParams as h, useSearchParams as g } from "react-router-dom";
import { App as _, Avatar as v, Button as y, Card as b, ConfigProvider as x, DatePicker as S, Drawer as C, Dropdown as w, Flex as T, Form as E, Grid as D, Input as O, InputNumber as k, Layout as A, Menu as j, Modal as M, Popover as ee, Segmented as N, Select as P, Space as F, Spin as I, Switch as L, Table as te, Typography as R, theme as z } from "antd";
import { Fragment as B, jsx as V, jsxs as H } from "react/jsx-runtime";
import { ArrowLeftOutlined as U, CaretDownOutlined as ne, CaretUpOutlined as re, ColumnHeightOutlined as ie, DesktopOutlined as ae, LayoutOutlined as W, LogoutOutlined as G, MenuOutlined as oe, MoonOutlined as K, SettingOutlined as q, SunOutlined as se, UserOutlined as ce } from "@ant-design/icons";
import { Controller as le, FormProvider as ue, useFieldArray as de, useForm as fe, useFormContext as pe, useWatch as me } from "react-hook-form";
import he from "dayjs";
//#region src/context/AppThemeProvider.tsx
var ge = e(null);
function _e(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "light" || t === "dark" || t === "system") return t;
	} catch {}
	return "system";
}
function J() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function ve(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "comfortable" || t === "compact") return t;
	} catch {}
	return "comfortable";
}
var ye = "ding-react-admin-theme-mode", be = "ding-react-admin-theme-density";
function xe({ children: e, modeStorageKey: t = ye, densityStorageKey: n = be }) {
	let [r, o] = s(() => _e(t)), [c, l] = s(() => ve(n)), [u, d] = s(J);
	i(() => {
		if (r !== "system") return;
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = () => d(e.matches);
		return t(), e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, [r]);
	let f = (e) => {
		o(e);
		try {
			localStorage.setItem(t, e);
		} catch {}
	}, p = (e) => {
		l(e);
		try {
			localStorage.setItem(n, e);
		} catch {}
	}, m = r === "system" ? u ? "dark" : "light" : r, h = a(() => {
		let e = m === "dark" ? z.darkAlgorithm : z.defaultAlgorithm;
		return { algorithm: c === "compact" ? [e, z.compactAlgorithm] : e };
	}, [m, c]), g = a(() => ({
		mode: r,
		setMode: f,
		resolved: m,
		density: c,
		setDensity: p
	}), [
		r,
		m,
		c,
		f,
		p
	]);
	return /* @__PURE__ */ V(ge.Provider, {
		value: g,
		children: /* @__PURE__ */ V(x, {
			theme: h,
			children: e
		})
	});
}
function Se() {
	let e = r(ge);
	if (!e) throw Error("useThemeMode must be used within AppThemeProvider");
	return e;
}
//#endregion
//#region src/components/DensitySwitch.tsx
var Ce = [{
	label: "Comfortable",
	value: "comfortable",
	icon: /* @__PURE__ */ V(W, {})
}, {
	label: "Compact",
	value: "compact",
	icon: /* @__PURE__ */ V(ie, {})
}];
function we() {
	let { density: e, setDensity: t } = Se();
	return /* @__PURE__ */ V(N, {
		size: "small",
		value: e,
		options: Ce,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeSwitch.tsx
var Te = [
	{
		label: "Light",
		value: "light",
		icon: /* @__PURE__ */ V(se, {})
	},
	{
		label: "Dark",
		value: "dark",
		icon: /* @__PURE__ */ V(K, {})
	},
	{
		label: "Auto",
		value: "system",
		icon: /* @__PURE__ */ V(ae, {})
	}
];
function Ee() {
	let { mode: e, setMode: t } = Se();
	return /* @__PURE__ */ V(N, {
		size: "small",
		value: e,
		options: Te,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeToolbar.tsx
function De() {
	let { token: e } = z.useToken();
	return /* @__PURE__ */ V(ee, {
		placement: D.useBreakpoint().lg ? "bottomRight" : "bottom",
		trigger: "click",
		content: /* @__PURE__ */ H(F, {
			direction: "vertical",
			size: "middle",
			style: {
				minWidth: 240,
				maxWidth: "min(92vw, 320px)"
			},
			children: [/* @__PURE__ */ V(Ee, {}), /* @__PURE__ */ V(we, {})]
		}),
		styles: { body: { padding: e.paddingSM } },
		children: /* @__PURE__ */ V(y, {
			type: "default",
			icon: /* @__PURE__ */ V(q, {}),
			"aria-label": "Display and theme settings"
		})
	});
}
//#endregion
//#region src/context/AuthProvider.tsx
var Oe = e(null);
function ke({ children: e, adapter: t }) {
	let [r, i] = s(() => t.getToken()), o = n(async (e) => {
		await t.login(e), i(t.getToken());
	}, [t]), c = n(() => {
		t.logout(), i(t.getToken());
	}, [t]), l = a(() => ({
		isAuthenticated: !!r,
		login: o,
		logout: c
	}), [
		r,
		o,
		c
	]);
	return /* @__PURE__ */ V(Oe.Provider, {
		value: l,
		children: e
	});
}
function Ae() {
	let e = r(Oe);
	if (!e) throw Error("useAuth must be used within AuthProvider");
	return e;
}
var je = "ding-react-admin-auth";
function Me(e = je) {
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
var Ne = e(null);
function Pe({ children: e, can: t }) {
	let n = a(() => t, [t]);
	return /* @__PURE__ */ V(Ne.Provider, {
		value: n,
		children: e
	});
}
function Y() {
	let e = r(Ne);
	if (!e) throw Error("usePermissions must be used within PermissionsProvider");
	return e;
}
function Fe(e) {
	return (t) => e()?.includes(t) ?? !1;
}
function Ie(e) {
	let t = Y();
	return n(() => t(e), [t, e]);
}
//#endregion
//#region src/permissions/resourcePermissions.ts
function X(e, t, n) {
	if (!t) return !0;
	let r = t[n];
	return n === "read" && !r && (r = t.list), r ? e(r) : !1;
}
function Le(e, t) {
	return e.map((e) => {
		if (e.children?.length) {
			let n = Le(e.children, t);
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
var Re = "#001529", ze = "ding-react-admin-sider-collapsed";
function Be(e) {
	try {
		return localStorage.getItem(e) === "1";
	} catch {
		return !1;
	}
}
function Ve() {
	return D.useBreakpoint().lg !== !0;
}
function He(e) {
	let t = /* @__PURE__ */ new Set();
	function n(e) {
		for (let r of e) r.children?.length ? n(r.children) : t.add(r.path);
	}
	return n(e), t;
}
function Ue(e, t) {
	function n(e) {
		for (let r of e) if (r.children?.length) {
			let e = n(r.children);
			if (e !== null) return [r.path, ...e];
		} else if (r.path === t) return [];
		return null;
	}
	return n(e) ?? [];
}
function We(e) {
	return e.map((e) => {
		let t = e.Icon, n = t ? /* @__PURE__ */ V(t, {}) : void 0;
		return e.children?.length ? {
			key: e.path,
			icon: n,
			label: e.label,
			children: We(e.children)
		} : {
			key: e.path,
			icon: n,
			label: e.label
		};
	});
}
function Ge({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a }) {
	return /* @__PURE__ */ V(j, {
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
function Ke({ navItems: e, brand: t = "Admin", collapsedBrand: r = "A", mobileDrawerTitle: o, headerExtras: c, userMenuItems: l, onUserMenuClick: d, loginPath: f = "/login", siderCollapsedStorageKey: h = ze }) {
	let g = m(), _ = p(), { resolved: b } = Se(), x = b === "dark", { logout: S } = Ae(), T = Y(), [E, D] = s(() => Be(h)), [O, k] = s(!1), j = Ve(), { token: M } = z.useToken(), ee = o ?? t, N = () => {
		S(), g(f, { replace: !0 });
	}, P = n((e) => {
		D(e);
		try {
			localStorage.setItem(h, e ? "1" : "0");
		} catch {}
	}, [h]);
	i(() => {
		j || k(!1);
	}, [j]), i(() => {
		k(!1);
	}, [_.pathname]);
	let F = a(() => Le(e, T), [e, T]), I = a(() => He(F), [F]), L = a(() => We(F), [F]), te = a(() => Ue(F, _.pathname), [F, _.pathname]), [B, U] = s(() => Ue(F, _.pathname));
	i(() => {
		U((e) => [...new Set([...e, ...te])]);
	}, [te]);
	let ne = n((e) => {
		U(e);
	}, []), re = a(() => [{
		key: "logout",
		icon: /* @__PURE__ */ V(G, {}),
		label: "Log out",
		danger: !0
	}], []), ie = l ?? re, ae = (e) => {
		if (d) {
			d(e);
			return;
		}
		e.key === "logout" && N();
	}, W = x ? M.colorBgContainer : Re, K = [_.pathname], q = (e) => {
		I.has(e) && (g(e), j && k(!1));
	};
	return /* @__PURE__ */ H(A, {
		style: {
			minHeight: "100vh",
			width: "100%",
			background: M.colorBgLayout
		},
		children: [
			!j && /* @__PURE__ */ H(A.Sider, {
				collapsible: !0,
				collapsed: E,
				onCollapse: P,
				collapsedWidth: 64,
				style: {
					background: W,
					borderInlineEnd: x ? `1px solid ${M.colorSplit}` : void 0
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
						style: { color: M.colorTextLightSolid },
						children: E ? r : t
					})
				}), /* @__PURE__ */ V(Ge, {
					menuItems: L,
					selectedKeys: K,
					inlineCollapsed: E,
					openKeys: B,
					onOpenChange: ne,
					onNavigate: q
				})]
			}),
			j && /* @__PURE__ */ V(C, {
				title: /* @__PURE__ */ V(R.Text, {
					strong: !0,
					style: { color: M.colorTextLightSolid },
					children: ee
				}),
				placement: "left",
				width: 280,
				onClose: () => k(!1),
				open: O,
				styles: {
					header: {
						background: W,
						borderBottom: `1px solid ${M.colorSplit}`
					},
					body: {
						padding: 0,
						background: W
					}
				},
				destroyOnClose: !0,
				children: /* @__PURE__ */ V(Ge, {
					menuItems: L,
					selectedKeys: K,
					inlineCollapsed: !1,
					openKeys: B,
					onOpenChange: ne,
					onNavigate: q
				})
			}),
			/* @__PURE__ */ H(A, { children: [/* @__PURE__ */ H(A.Header, {
				style: {
					background: M.colorBgContainer,
					paddingInline: M.paddingLG,
					display: "flex",
					alignItems: "center",
					gap: M.marginSM,
					lineHeight: "normal"
				},
				children: [
					j && /* @__PURE__ */ V(y, {
						type: "text",
						icon: /* @__PURE__ */ V(oe, {}),
						onClick: () => k(!0),
						"aria-label": "Open navigation"
					}),
					/* @__PURE__ */ V("div", { style: {
						flex: 1,
						minWidth: 0
					} }),
					c,
					/* @__PURE__ */ V(De, {}),
					/* @__PURE__ */ V(w, {
						menu: {
							items: ie,
							onClick: ae
						},
						trigger: ["click"],
						children: /* @__PURE__ */ H(y, {
							type: "text",
							style: {
								display: "inline-flex",
								alignItems: "center",
								gap: M.marginXS,
								maxWidth: j ? 44 : void 0,
								paddingInline: j ? M.paddingXS : void 0
							},
							"aria-label": "Account menu",
							children: [/* @__PURE__ */ V(v, {
								size: "small",
								icon: /* @__PURE__ */ V(ce, {})
							}), !j && /* @__PURE__ */ V(R.Text, {
								type: "secondary",
								children: "User"
							})]
						})
					})
				]
			}), /* @__PURE__ */ V(A.Content, {
				style: { margin: j ? M.marginSM : M.marginLG },
				children: /* @__PURE__ */ V(u, {})
			})] })
		]
	});
}
//#endregion
//#region src/router/guards.tsx
function qe({ when: e, redirect: t, children: n }) {
	return e ? n : /* @__PURE__ */ V(l, {
		to: t,
		replace: !0
	});
}
function Je({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = Ae();
	return /* @__PURE__ */ V(qe, {
		when: n,
		redirect: t,
		children: e
	});
}
function Ye({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = Ae();
	return /* @__PURE__ */ V(qe, {
		when: !n,
		redirect: t,
		children: e
	});
}
function Xe({ permission: e, redirect: t, children: n }) {
	return /* @__PURE__ */ V(qe, {
		when: Y()(e),
		redirect: t,
		children: n
	});
}
//#endregion
//#region src/router/routeAccess.ts
function Ze(e) {
	return e.access ?? "protected";
}
function Qe(e) {
	let t = [], n = [], r = [];
	for (let i of e) {
		let e = Ze(i);
		e === "guest" ? t.push(i) : e === "public" ? n.push(i) : r.push(i);
	}
	return {
		guest: t,
		public: n,
		protected: r
	};
}
function $e(e) {
	return e.replace(/^\/+/, "");
}
function et(e) {
	return `/${$e(e)}`;
}
function tt(e, t) {
	let { guest: n, protected: r } = Qe(e), i = n.find((e) => "path" in e && e.path), a = r.find((e) => "index" in e && e.index), o = r.find((e) => "path" in e && e.path), s = t?.unauthenticated;
	!s && i && "path" in i && i.path && (s = et(i.path));
	let c = t?.afterLogin;
	if (c || (a ? c = "/" : o && "path" in o && o.path && (c = et(o.path))), r.length > 0 && !s) throw Error("createAdminRouter: protected routes require redirects.unauthenticated or a guest route (access: \"guest\").");
	if (n.length > 0 && !c) throw Error("createAdminRouter: guest routes require redirects.afterLogin or a protected route (index or path).");
	return {
		loginPath: s ?? "/",
		homePath: c ?? "/"
	};
}
function nt(e) {
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
function rt({ navItems: e, children: t, layoutProps: n, redirects: r }) {
	let { loginPath: i, homePath: a } = tt(t, r), { guest: o, public: s, protected: c } = Qe(t), u = [];
	for (let e of o) !("path" in e) || !e.path || u.push({
		path: $e(e.path),
		element: /* @__PURE__ */ V(Ye, {
			redirectTo: a,
			children: e.element
		})
	});
	for (let e of s) !("path" in e) || !e.path || u.push({
		path: $e(e.path),
		element: e.element
	});
	return c.length > 0 && u.push({
		path: "/",
		element: /* @__PURE__ */ V(Je, {
			redirectTo: i,
			children: /* @__PURE__ */ V(Ke, {
				navItems: e,
				loginPath: i,
				...n
			})
		}),
		children: c.map(nt)
	}), u.push({
		path: "*",
		element: /* @__PURE__ */ V(l, {
			to: a,
			replace: !0
		})
	}), f(u);
}
//#endregion
//#region src/app/AdminApp.tsx
function it({ navItems: e, routes: t, authRedirects: n, layoutProps: r, theme: i }) {
	let o = a(() => rt({
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
	return /* @__PURE__ */ V(xe, {
		...i,
		children: /* @__PURE__ */ V(d, { router: o })
	});
}
//#endregion
//#region src/context/DataProvider.tsx
var at = e(null);
function ot({ children: e, value: t }) {
	let n = a(() => t, [t]);
	return /* @__PURE__ */ V(at.Provider, {
		value: n,
		children: e
	});
}
function st() {
	let e = r(at);
	if (!e) throw Error("useDataProvider must be used within DataProvider");
	return e;
}
//#endregion
//#region src/data/resourceHandlers.ts
function ct(e) {
	return "handlers" in e ? e : { handlers: e };
}
function lt(e, t, n) {
	if (!(!e || !t) && !X(e, t, n)) throw Error("Forbidden");
}
function ut(e, t) {
	let { can: n, guard: r } = t ?? {}, i = (t) => {
		let n = e[t];
		if (!n) throw Error(`Unknown resource: ${t}`);
		return ct(n);
	};
	return {
		async getList(e, t) {
			let { handlers: a, permissions: o } = i(e);
			return r?.(e, "list"), lt(n, o, "list"), a.getList(t);
		},
		async getOne(e, t) {
			let { handlers: a, permissions: o } = i(e);
			return r?.(e, "read"), lt(n, o, "read"), a.getOne(t);
		},
		async create(e, t) {
			let { handlers: a, permissions: o } = i(e);
			return r?.(e, "add"), lt(n, o, "add"), a.create(t);
		},
		async update(e, t) {
			let { handlers: a, permissions: o } = i(e);
			return r?.(e, "change"), lt(n, o, "change"), a.update(t);
		},
		async delete(e, t) {
			let { handlers: a, permissions: o } = i(e);
			return r?.(e, "delete"), lt(n, o, "delete"), a.delete(t);
		}
	};
}
//#endregion
//#region src/data/inMemoryList.ts
function dt(e, t) {
	return e === t || String(e) === String(t);
}
function ft(e, t) {
	let n = e.find((e) => dt(e.id, t));
	if (!n) throw Error("Not found");
	return n;
}
function pt(e, t) {
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
function mt(e, t) {
	return t == null || t === "" ? !0 : Array.isArray(t) ? t.length === 0 ? !0 : Array.isArray(e) ? t.some((t) => e.includes(t)) : t.includes(e) : Array.isArray(e) ? e.includes(t) : typeof t == "string" && typeof e == "string" ? e.toLowerCase().includes(t.toLowerCase()) : e === t;
}
function ht(e, t) {
	return t ? e.filter((e) => Object.entries(t).every(([t, n]) => mt(e[t], n))) : e;
}
function gt(e, t, n) {
	let r = (t - 1) * n;
	return {
		data: e.slice(r, r + n),
		total: e.length
	};
}
function _t(e, t) {
	let { pagination: n, sort: r, filter: i } = t, a = ht(e, i);
	if (r) {
		let e = Array.isArray(r) ? r : [r];
		e.length > 0 && e[0]?.field && (a = pt(a, e));
	}
	return n ? gt(a, n.page, n.perPage) : {
		data: a,
		total: a.length
	};
}
//#endregion
//#region src/data/createMemoryResourceHandlers.ts
function vt(e) {
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
			return _t(t(e.scopeList ? e.scopeList(e.getRows(), n) : e.getRows()), n);
		},
		async getOne(t) {
			return { data: ft(e.getRows(), t) };
		},
		async create(t) {
			let r = n(t, e.nextId());
			return e.getRows().push(r), { data: r };
		},
		async update({ id: t, data: n }) {
			let i = ft(e.getRows(), t), a = r(i, n);
			return Object.assign(i, a), { data: i };
		},
		async delete(t) {
			let n = e.getRows(), r = n.findIndex((e) => dt(e.id, t));
			if (r < 0) return { data: null };
			let [i] = n.splice(r, 1);
			return e.afterDelete?.(i), { data: i };
		}
	};
}
//#endregion
//#region src/data/createRestResourceHandlers.ts
function yt(e) {
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
function bt(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function xt(e) {
	let t = bt(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function St(e) {
	let t = bt(e);
	if (t.length !== 0) return t.map((e) => `${e.field} ${e.order === "DESC" ? "desc" : "asc"}`).join(",");
}
function Ct(e) {
	let t = bt(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
//#endregion
//#region src/components/AuthAlternateLink.tsx
function wt({ prompt: e, linkText: t, to: n }) {
	return /* @__PURE__ */ H(R.Paragraph, {
		type: "secondary",
		style: {
			textAlign: "center",
			marginBottom: 0
		},
		children: [
			e,
			" ",
			/* @__PURE__ */ V(c, {
				to: n,
				children: t
			})
		]
	});
}
//#endregion
//#region src/layouts/AuthPageLayout.tsx
function Tt({ children: e, brand: t, footer: n, showThemeToolbar: r = !0 }) {
	let { token: i } = z.useToken();
	return /* @__PURE__ */ H(T, {
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
			r ? /* @__PURE__ */ V(T, {
				justify: "flex-end",
				style: {
					flexShrink: 0,
					width: "100%",
					padding: 16,
					background: i.colorBgLayout
				},
				children: /* @__PURE__ */ V(De, {})
			}) : null,
			t ? /* @__PURE__ */ V("div", {
				style: {
					flexShrink: 0,
					textAlign: "center",
					padding: "0 24px 16px"
				},
				children: t
			}) : null,
			/* @__PURE__ */ H(T, {
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
function Et({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, brand: r, extraFields: i, showThemeToolbar: a = !0, afterLoginPath: o = "/", alternateAuth: s, footer: c }) {
	let { login: l } = Ae(), u = m();
	return /* @__PURE__ */ V(Tt, {
		brand: r ?? n,
		footer: c ?? (s ? /* @__PURE__ */ V(wt, {
			prompt: s.prompt ?? "Don't have an account?",
			linkText: s.linkText,
			to: s.to
		}) : null),
		showThemeToolbar: a,
		children: /* @__PURE__ */ H(b, {
			style: {
				width: "100%",
				maxWidth: 360
			},
			title: e,
			children: [t ? /* @__PURE__ */ V(R.Paragraph, {
				type: "secondary",
				style: { marginTop: 0 },
				children: t
			}) : null, /* @__PURE__ */ H(E, {
				layout: "vertical",
				onFinish: async (e) => {
					await l({
						username: String(e.username ?? ""),
						password: String(e.password ?? ""),
						...e
					}), u(o, { replace: !0 });
				},
				children: [
					/* @__PURE__ */ V(E.Item, {
						name: "username",
						label: "Username",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ V(O, { autoComplete: "username" })
					}),
					/* @__PURE__ */ V(E.Item, {
						name: "password",
						label: "Password",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ V(O.Password, { autoComplete: "current-password" })
					}),
					i,
					/* @__PURE__ */ V(E.Item, {
						style: { marginBottom: 0 },
						children: /* @__PURE__ */ V(y, {
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
function Dt({ title: e }) {
	return /* @__PURE__ */ V(R.Title, {
		level: 3,
		style: { marginTop: 0 },
		children: e
	});
}
//#endregion
//#region src/crud/utils/sortQueryParam.ts
function Ot(e) {
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
function kt(e) {
	return e.length === 0 ? null : e.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function At(e) {
	return new Map(e.map((e, t) => [e.field, t + 1]));
}
//#endregion
//#region src/crud/context/ListContext.tsx
var jt = e(null);
function Mt({ children: e, toggleSort: t, sort: r }) {
	let [i, o] = s([]), c = a(() => new Set(r.map((e) => e.field)), [r]), l = a(() => new Map(r.map((e) => [e.field, e.order])), [r]), u = a(() => At(r), [r]), d = n((e) => (o((t) => {
		let n = t.findIndex((t) => t.key === e.key);
		if (n < 0) return [...t, e];
		if (t[n] === e) return t;
		let r = [...t];
		return r[n] = e, r;
	}), () => {
		o((t) => t.filter((t) => t.key !== e.key));
	}), []), f = a(() => ({
		columns: i,
		toggleSort: t,
		sortFields: c,
		sortOrders: l,
		sortPriorities: u,
		registerColumn: d
	}), [
		i,
		t,
		c,
		l,
		u,
		d
	]);
	return /* @__PURE__ */ V(jt.Provider, {
		value: f,
		children: e
	});
}
function Nt() {
	let e = r(jt);
	if (!e) throw Error("Column components must be used within ResourceList");
	return e;
}
function Z(e) {
	let { registerColumn: t } = Nt();
	i(() => t(e), [t, e]);
}
//#endregion
//#region src/crud/context/FilterContext.tsx
var Pt = e(null);
function Ft({ children: e, values: t, setFilterValue: r }) {
	let [i, o] = s([]), c = n((e) => (o((t) => {
		let n = t.findIndex((t) => t.key === e.key);
		if (n < 0) return [...t, e];
		if (t[n] === e) return t;
		let r = [...t];
		return r[n] = e, r;
	}), () => {
		o((t) => t.filter((t) => t.key !== e.key));
	}), []), l = a(() => ({
		filters: i,
		values: t,
		setFilterValue: r,
		registerFilter: c
	}), [
		i,
		t,
		r,
		c
	]);
	return /* @__PURE__ */ V(Pt.Provider, {
		value: l,
		children: e
	});
}
function It() {
	return r(Pt);
}
function Q(e) {
	let t = It()?.registerFilter;
	i(() => {
		if (t) return t(e);
	}, [t, e]);
}
//#endregion
//#region src/crud/context/FormContext.tsx
var Lt = e(null);
function Rt({ children: e, resource: t, isNew: n, disabled: r }) {
	return /* @__PURE__ */ V(Lt.Provider, {
		value: {
			resource: t,
			isNew: n,
			disabled: r
		},
		children: e
	});
}
function zt() {
	return r(Lt);
}
//#endregion
//#region src/crud/context/FormFieldsContext.tsx
var Bt = e(null);
function Vt({ children: e, sourcesRef: t }) {
	let r = o(/* @__PURE__ */ new Set()), i = t ?? r, s = n((e) => (i.current.add(e), () => {
		i.current.delete(e);
	}), [i]), c = n(() => Array.from(i.current), [i]), l = a(() => ({
		registerSource: s,
		getSources: c
	}), [s, c]);
	return /* @__PURE__ */ V(Bt.Provider, {
		value: l,
		children: e
	});
}
function Ht() {
	return r(Bt);
}
function Ut(e) {
	let t = Ht()?.registerSource;
	i(() => {
		if (t) return t(e);
	}, [t, e]);
}
//#endregion
//#region src/crud/utils/getByPath.ts
function Wt(e, t) {
	let n = t.split("."), r = e;
	for (let e of n) {
		if (typeof r != "object" || !r) return;
		r = r[e];
	}
	return r;
}
//#endregion
//#region src/crud/utils/setByPath.ts
function Gt(e, t, n) {
	let r = t.split("."), i = e;
	for (let e = 0; e < r.length - 1; e++) {
		let t = r[e], n = i[t];
		(typeof n != "object" || !n || Array.isArray(n)) && (i[t] = {}), i = i[t];
	}
	i[r[r.length - 1]] = n;
}
//#endregion
//#region src/crud/utils/pickBySources.ts
function Kt(e, t) {
	if (t.length === 0) return { ...e };
	let n = {};
	for (let r of t) {
		let t = Wt(e, r);
		t !== void 0 && Gt(n, r, t);
	}
	return n;
}
//#endregion
//#region src/crud/ResourceFormModal.tsx
function qt({ resource: e, editId: t, onClose: r, children: a, title: c }) {
	let l = t === "new" || t == null, u = t != null, d = st(), { message: f } = _.useApp(), [p, m] = s(!l), h = fe(), g = o(/* @__PURE__ */ new Set()), v = n(async () => {
		if (l || !t) {
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
		l,
		h,
		f
	]);
	i(() => {
		u && v();
	}, [u, v]);
	async function b(n) {
		try {
			let i = Kt(n, Array.from(g.current));
			l ? (await d.create(e, i), f.success("Created")) : t && (await d.update(e, {
				id: t,
				data: i
			}), f.success("Updated")), r();
		} catch (e) {
			f.error(e instanceof Error ? e.message : "Save failed");
		}
	}
	return /* @__PURE__ */ V(M, {
		open: u,
		title: c ?? (l ? `New ${e}` : `Edit ${e}`),
		onCancel: r,
		footer: null,
		destroyOnHidden: !0,
		width: 560,
		children: p ? /* @__PURE__ */ V(I, {}) : /* @__PURE__ */ V(Rt, {
			resource: e,
			isNew: l,
			children: /* @__PURE__ */ V(Vt, {
				sourcesRef: g,
				children: /* @__PURE__ */ V(ue, {
					...h,
					children: /* @__PURE__ */ H(E, {
						layout: "vertical",
						onFinish: () => void h.handleSubmit(b)(),
						children: [a, /* @__PURE__ */ H(E.Item, {
							style: {
								marginTop: 16,
								marginBottom: 0
							},
							children: [/* @__PURE__ */ V(y, {
								type: "primary",
								htmlType: "submit",
								style: { marginRight: 8 },
								children: "Save"
							}), /* @__PURE__ */ V(y, {
								onClick: r,
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
function Jt({ selectedCount: e, total: t, allPageSelected: r, allMatchingSelected: i, onSelectAllMatching: o, onClearSelection: c, actions: l, onExecute: u, selectedIds: d, running: f = !1 }) {
	let [p, m] = s(), h = a(() => l.map((e) => ({
		value: e.key,
		label: e.label
	})), [l]), g = n(async () => {
		let t = l.find((e) => e.key === p);
		!t || e === 0 || (await u(t, d), m(void 0));
	}, [
		l,
		p,
		u,
		e,
		d
	]), _ = r && !i && t > e;
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
			e > 0 ? /* @__PURE__ */ V(y, {
				type: "link",
				size: "small",
				onClick: c,
				style: { padding: 0 },
				children: "Clear selection"
			}) : null,
			_ ? /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V(R.Text, {
				type: "secondary",
				children: "·"
			}), /* @__PURE__ */ H(y, {
				type: "link",
				size: "small",
				onClick: o,
				style: { padding: 0 },
				children: [
					"Select all ",
					t,
					" items matching filter"
				]
			})] }) : null,
			i && t > 0 ? /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V(R.Text, {
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
			/* @__PURE__ */ V(y, {
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
var Yt = new Set([
	"page",
	"perPage",
	"sort",
	"create",
	"edit"
]), Xt = 1, Zt = 10;
function Qt(e) {
	if (e.includes(",")) {
		let t = e.split(",").map((e) => e.trim()), n = t.map(Number);
		return n.every((e) => Number.isFinite(e)) ? n : t;
	}
	let t = Number(e);
	return e !== "" && Number.isFinite(t) && String(t) === e ? t : e === "true" ? !0 : e === "false" ? !1 : e;
}
function $t(e) {
	return e == null || e === "" ? null : Array.isArray(e) ? e.length === 0 ? null : e.map(String).join(",") : String(e);
}
function en(e) {
	let [t, r] = g(), i = a(() => {
		let n = t.get("page"), r = t.get("perPage"), i = n ? Math.max(1, Number(n) || Xt) : Xt, a = r ? Math.max(1, Number(r) || Zt) : Zt, o = t.getAll("sort"), s = o.length > 0 ? o.flatMap((e) => Ot(e)) : Ot(t.get("sort")), c = { ...e };
		return t.forEach((e, n) => {
			if (Yt.has(n)) return;
			let r = c[n];
			r === void 0 ? t.getAll(n).length > 1 ? c[n] = t.getAll(n).map(Qt) : c[n] = Qt(e) : c[n] = [...Array.isArray(r) ? r : [r], Qt(e)];
		}), {
			page: i,
			perPage: a,
			sort: s,
			filter: c,
			createModal: t.has("create"),
			editId: t.get("edit")
		};
	}, [t, e]), o = n((e) => {
		r((t) => {
			let n = new URLSearchParams(t);
			return e(n), n;
		}, { replace: !0 });
	}, [r]);
	return [i, a(() => ({
		setPage: (e) => {
			o((t) => {
				e <= 1 ? t.delete("page") : t.set("page", String(e));
			});
		},
		setPerPage: (e) => {
			o((t) => {
				e === Zt ? t.delete("perPage") : t.set("perPage", String(e)), t.delete("page");
			});
		},
		setSort: (e) => {
			o((t) => {
				t.delete("sort");
				let n = kt(e);
				n && t.set("sort", n);
			});
		},
		toggleSort: (e) => {
			o((t) => {
				let n = t.getAll("sort").flatMap((e) => Ot(e)), r = n.findIndex((t) => t.field === e), i;
				i = r < 0 ? [...n, {
					field: e,
					order: "ASC"
				}] : n[r].order === "ASC" ? n.map((e, t) => t === r ? {
					...e,
					order: "DESC"
				} : e) : n.filter((e, t) => t !== r), t.delete("sort");
				let a = kt(i);
				a && t.set("sort", a);
			});
		},
		setFilter: (e, t) => {
			o((n) => {
				n.delete(e);
				let r = $t(t);
				r != null && n.set(e, r), n.delete("page");
			});
		},
		setFilters: (e) => {
			o((t) => {
				for (let e of [...t.keys()]) Yt.has(e) || t.delete(e);
				for (let [n, r] of Object.entries(e)) {
					let e = $t(r);
					e != null && t.set(n, e);
				}
				t.delete("page");
			});
		},
		openCreateModal: () => {
			o((e) => {
				e.set("create", "1"), e.delete("edit");
			});
		},
		openEditModal: (e) => {
			o((t) => {
				t.set("edit", String(e)), t.delete("create");
			});
		},
		closeModal: () => {
			o((e) => {
				e.delete("create"), e.delete("edit");
			});
		}
	}), [o])];
}
//#endregion
//#region src/crud/ResourceList.tsx
var tn = e(null);
function nn() {
	return r(tn);
}
function rn({ resource: e, title: t, pathPrefix: r, newPath: o, editMode: l = "page", formChildren: u, actions: d, rowActions: f, headerExtra: p, bulkActions: m, bulkDelete: h = !0, bulkActionsEnabled: g = !0, permissions: v, queryState: x, queryActions: S }) {
	let C = st(), w = Y(), { message: T, modal: E } = _.useApp(), { columns: D, sortOrders: O, sortPriorities: k } = Nt(), [A, j] = s(!1), [M, ee] = s([]), [N, P] = s(0), [I, L] = s(() => /* @__PURE__ */ new Set()), [z, U] = s(!1), ie = o ?? `${r}/new`, ae = X(w, v, "add"), W = X(w, v, "change"), G = X(w, v, "delete"), oe = W && (l === "page" || l === "both") && d?.edit !== !1, K = W && (l === "modal" || l === "both") && d?.quickEdit !== !1, q = G && d?.delete !== !1, se = oe || K || q || f, ce = n(() => {
		L(/* @__PURE__ */ new Set());
	}, []), le = a(() => {
		if (!g) return [];
		let t = [];
		return h && G && t.push({
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
		G,
		m,
		C,
		e,
		T
	]), ue = le.length > 0, de = I.size, fe = M.length > 0 && M.every((e) => I.has(e.id)), pe = N > 0 && de >= N, me = a(() => M.filter((e) => I.has(e.id)).map((e) => e.id), [M, I]), he = n((e) => {
		L((t) => {
			let n = new Set(t), r = M.map((e) => e.id);
			for (let t of r) e.includes(t) || n.delete(t);
			for (let t of e) n.add(t);
			return n;
		});
	}, [M]), ge = n(async () => {
		if (!(N <= 0)) {
			U(!0);
			try {
				let t = x.sort.length === 0 ? void 0 : x.sort.length === 1 ? x.sort[0] : x.sort, n = await C.getList(e, {
					pagination: {
						page: 1,
						perPage: N
					},
					sort: t,
					filter: x.filter
				});
				L(new Set(n.data.map((e) => e.id)));
			} catch (e) {
				T.error(e instanceof Error ? e.message : "Load failed");
			} finally {
				U(!1);
			}
		}
	}, [
		C,
		e,
		N,
		x.sort,
		x.filter,
		T
	]), _e = n((e) => {
		let t = (e) => {
			let t = e?.columnKey ?? e?.field;
			return t == null ? null : String(Array.isArray(t) ? t[0] : t);
		};
		if (Array.isArray(e)) {
			let n = e.find((e) => e?.order);
			if (n) {
				let e = t(n);
				e && S.toggleSort(e);
				return;
			}
			x.sort.length > 0 && S.setSort([]);
			return;
		}
		let n = t(e);
		if (n) {
			S.toggleSort(n);
			return;
		}
		!e?.order && x.sort.length > 0 && S.setSort([]);
	}, [S, x.sort.length]), J = n(async () => {
		j(!0);
		try {
			let t = x.sort.length === 0 ? void 0 : x.sort.length === 1 ? x.sort[0] : x.sort, n = await C.getList(e, {
				pagination: {
					page: x.page,
					perPage: x.perPage
				},
				sort: t,
				filter: x.filter
			});
			ee(n.data), P(n.total);
		} catch (e) {
			T.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			j(!1);
		}
	}, [
		C,
		e,
		x,
		T
	]);
	i(() => {
		J();
	}, [J]);
	let ve = a(() => ({
		reload: () => void J(),
		clearSelection: ce
	}), [J, ce]), ye = n(async (e, t) => {
		if (e.confirm) {
			let n = typeof e.confirm == "function" ? await e.confirm(t, ve) : e.confirm;
			if (n === !1 || !await new Promise((t) => {
				E.confirm({
					title: n,
					okType: e.key === "__delete" ? "danger" : "primary",
					onOk: () => t(!0),
					onCancel: () => t(!1)
				});
			})) return;
		}
		U(!0);
		try {
			await e.execute(t, ve);
		} catch (e) {
			T.error(e instanceof Error ? e.message : "Action failed");
		} finally {
			U(!1);
		}
	}, [
		ve,
		E,
		T
	]), be = n(async (t) => {
		if (G) try {
			await C.delete(e, t.id), T.success("Deleted"), J();
		} catch (e) {
			T.error(e instanceof Error ? e.message : "Delete failed");
		}
	}, [
		G,
		C,
		e,
		J,
		T
	]), xe = a(() => {
		let e = D.map((e) => {
			let t = e.buildColumn();
			if (e.sortable) {
				let n = O.get(e.source), r = k.get(e.source), i = n === "ASC" ? "ascend" : n === "DESC" ? "descend" : void 0, a = i == null ? void 0 : /* @__PURE__ */ H("span", {
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
					}), V(i === "ascend" ? re : ne, { style: { fontSize: 11 } })]
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
		if (!se) return e;
		let t = {
			reload: () => void J(),
			openEditModal: S.openEditModal
		}, n = {
			title: "Actions",
			key: "__actions",
			width: l === "both" ? 200 : 160,
			render: (e, n) => /* @__PURE__ */ H(F, {
				size: "small",
				wrap: !0,
				children: [
					oe ? /* @__PURE__ */ V(c, {
						to: `${r}/${String(n.id)}`,
						children: "Edit"
					}) : null,
					K ? /* @__PURE__ */ V(y, {
						type: "link",
						size: "small",
						style: { padding: 0 },
						onClick: () => S.openEditModal(n.id),
						children: l === "both" ? "Quick edit" : "Edit"
					}) : null,
					q ? /* @__PURE__ */ V(y, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => void be(n),
						style: { padding: 0 },
						children: "Delete"
					}) : null,
					f?.(n, t)
				]
			})
		};
		return [...e, n];
	}, [
		D,
		se,
		oe,
		K,
		q,
		l,
		r,
		be,
		O,
		k,
		S,
		f,
		J
	]), Se = u && (x.createModal || x.editId != null) && (l === "modal" || l === "both");
	return /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ H(b, {
		title: /* @__PURE__ */ V(R.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		}),
		extra: p || ae ? /* @__PURE__ */ H(F, { children: [p, ae ? l === "modal" || l === "both" ? /* @__PURE__ */ H(B, { children: [l === "both" ? /* @__PURE__ */ V(c, {
			to: ie,
			children: /* @__PURE__ */ V(y, { children: "New page" })
		}) : null, /* @__PURE__ */ V(y, {
			type: "primary",
			onClick: () => S.openCreateModal(),
			children: "New"
		})] }) : /* @__PURE__ */ V(c, {
			to: ie,
			children: /* @__PURE__ */ V(y, {
				type: "primary",
				children: "New"
			})
		}) : null] }) : null,
		children: [ue ? /* @__PURE__ */ V(Jt, {
			selectedCount: de,
			total: N,
			allPageSelected: fe,
			allMatchingSelected: pe,
			onSelectAllMatching: () => void ge(),
			onClearSelection: ce,
			actions: le,
			onExecute: ye,
			selectedIds: [...I],
			running: z || A
		}) : null, /* @__PURE__ */ V(te, {
			rowKey: "id",
			loading: A,
			columns: xe,
			dataSource: M,
			rowSelection: ue ? {
				selectedRowKeys: me,
				onChange: he,
				preserveSelectedRowKeys: !0
			} : void 0,
			pagination: {
				current: x.page,
				pageSize: x.perPage,
				total: N,
				showSizeChanger: !0,
				onChange: (e, t) => {
					S.setPage(e), t && S.setPerPage(t);
				}
			},
			onChange: (e, t, n) => {
				_e(n);
			}
		})]
	}), Se ? /* @__PURE__ */ V(qt, {
		resource: e,
		editId: x.createModal ? "new" : x.editId,
		onClose: () => {
			S.closeModal(), J();
		},
		children: u
	}) : null] });
}
function an({ resource: e, title: t, pathPrefix: r, newPath: i, staticFilter: o, editMode: s = "page", syncQueryParams: c = !0, children: l, formChildren: u, actions: d, rowActions: f, headerExtra: p, bulkActions: m, bulkDelete: h, bulkActionsEnabled: g, permissions: _ }) {
	let [v, y] = en(o), b = a(() => {
		if (!c) return o ?? {};
		let e = {};
		for (let [t, n] of Object.entries(v.filter)) o && t in o || (e[t] = n);
		return e;
	}, [
		v.filter,
		o,
		c
	]), x = n((e, t) => {
		c && y.setFilter(e, t);
	}, [c, y]), S = a(() => ({
		filterValues: b,
		setFilterValue: x
	}), [b, x]);
	return /* @__PURE__ */ V(tn.Provider, {
		value: S,
		children: /* @__PURE__ */ V(Ft, {
			values: b,
			setFilterValue: x,
			children: /* @__PURE__ */ H(Mt, {
				toggleSort: y.toggleSort,
				sort: v.sort,
				children: [l, /* @__PURE__ */ V(rn, {
					resource: e,
					title: t,
					pathPrefix: r,
					newPath: i,
					editMode: s,
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
function on() {
	let e = It();
	return !e || e.filters.length === 0 ? null : /* @__PURE__ */ V(F, {
		wrap: !0,
		size: "middle",
		style: { marginBottom: 16 },
		children: e.filters.map((t) => /* @__PURE__ */ H(F, {
			direction: "vertical",
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
function sn({ children: e }) {
	return /* @__PURE__ */ H(B, { children: [e, /* @__PURE__ */ V(on, {})] });
}
//#endregion
//#region src/crud/context/InlineFormContext.tsx
var cn = e(null), ln = e([]);
function un({ children: e, arrayName: t, layout: r = "tabular" }) {
	let [i, o] = s([]), c = n((e) => (o((t) => t.some((t) => t.key === e.key) ? t : [...t, e]), () => {
		o((t) => t.filter((t) => t.key !== e.key));
	}), []), l = a(() => ({
		arrayName: t,
		registerField: c,
		layout: r
	}), [
		t,
		c,
		r
	]);
	return /* @__PURE__ */ V(cn.Provider, {
		value: l,
		children: /* @__PURE__ */ V(ln.Provider, {
			value: i,
			children: e
		})
	});
}
function dn() {
	let e = r(cn), t = r(ln);
	return e ? {
		...e,
		fields: t
	} : null;
}
//#endregion
//#region src/crud/utils/inlineArrayName.ts
function fn(e, t) {
	return t ?? `__inline_${e.replace(/[^a-z0-9]/gi, "_")}`;
}
//#endregion
//#region src/crud/InlineFormSet.tsx
function pn(e) {
	let t = dn(), { control: n } = pe(), r = me({
		control: n,
		name: e
	}), { fields: a, append: o, remove: s, replace: c } = de({
		control: n,
		name: e
	});
	return i(() => {
		!Array.isArray(r) || r.length === 0 || a.length !== r.length && c(r);
	}, [
		r,
		a.length,
		c
	]), {
		ctx: t,
		fields: a,
		remove: s,
		appendEmpty: () => {
			if (!t) return;
			let e = {};
			for (let n of t.fields) e[n.source] = void 0;
			o(e);
		}
	};
}
function mn({ arrayName: e, label: t }) {
	let { ctx: n, fields: r, remove: i, appendEmpty: o } = pn(e), s = a(() => n ? n.fields.map((t) => ({
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
			/* @__PURE__ */ V(te, {
				size: "small",
				pagination: !1,
				scroll: { x: "max-content" },
				dataSource: r.map((e) => ({
					...e,
					key: e.id
				})),
				columns: [...s, {
					title: "",
					key: "__remove",
					width: 80,
					render: (e, t, n) => /* @__PURE__ */ V(y, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => i(n),
						children: "Remove"
					})
				}]
			}),
			/* @__PURE__ */ V(y, {
				type: "dashed",
				style: { marginTop: 8 },
				onClick: o,
				children: "Add row"
			})
		]
	}) : null;
}
function hn({ arrayName: e, label: t }) {
	let { ctx: n, fields: r, remove: i, appendEmpty: a } = pn(e);
	return n ? /* @__PURE__ */ H("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ V(R.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ V(F, {
				direction: "vertical",
				size: "middle",
				style: { width: "100%" },
				children: r.map((t, r) => /* @__PURE__ */ V(b, {
					size: "small",
					title: `Item ${r + 1}`,
					extra: /* @__PURE__ */ V(y, {
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
			/* @__PURE__ */ V(y, {
				type: "dashed",
				style: { marginTop: 8 },
				onClick: a,
				children: "Add item"
			})
		]
	}) : null;
}
function gn({ resource: e, label: t, children: n, name: r, layout: i = "tabular" }) {
	let a = fn(e, r);
	return /* @__PURE__ */ H(un, {
		arrayName: a,
		layout: i,
		children: [n, V(i === "stacked" ? hn : mn, {
			arrayName: a,
			label: t
		})]
	});
}
async function _n(e, t) {
	let { resource: n, foreignKey: r, parentId: i, rows: a, existingIds: o = [] } = t, s = [];
	for (let t of a) {
		let { id: a, ...c } = t, l = {
			...c,
			[r]: i
		}, u = t.id;
		if (u != null && o.some((e) => e === u)) await e.update(n, {
			id: u,
			data: l
		}), s.push(u);
		else {
			let t = (await e.create(n, l)).data;
			s.push(t.id);
		}
	}
	for (let t of o) s.some((e) => e === t) || await e.delete(n, t);
}
async function vn(e, t, n, r) {
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
function yn(e) {
	return fn(e.resource, e.name);
}
function bn({ resource: e, title: r, listPath: a, children: l, defaultValues: u, onSaved: d, stayOnPage: f, inlines: p, permissions: g }) {
	let { id: v } = h(), x = v === "new" || !v, S = st(), C = Y(), w = m(), { message: T } = _.useApp(), { token: D } = z.useToken(), [O, k] = s(!x), [A, j] = s(0), [M, ee] = s({}), N = fe({ defaultValues: u }), P = o(/* @__PURE__ */ new Set()), L = n(async () => {
		if (x || !v) {
			u && N.reset({ ...u }), k(!1);
			return;
		}
		k(!0);
		try {
			let t = (await S.getOne(e, v)).data;
			if (p?.length) {
				let e = { ...t }, n = {};
				for (let t of p) {
					let r = yn(t), { rows: i, ids: a } = await vn(S, t.resource, t.foreignKey, v);
					e[r] = i, n[r] = a;
				}
				N.reset(e), ee(n), j((e) => e + 1);
			} else N.reset(t), j((e) => e + 1);
		} catch (e) {
			T.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			k(!1);
		}
	}, [
		S,
		e,
		v,
		x,
		N,
		T,
		u,
		n(async (e) => {
			if (!p?.length) return;
			let t = {};
			for (let n of p) {
				let r = yn(n), { rows: i, ids: a } = await vn(S, n.resource, n.foreignKey, e);
				N.setValue(r, i), t[r] = a;
			}
			ee(t);
		}, [
			S,
			p,
			N
		])
	]);
	i(() => {
		L();
	}, [L]), i(() => {
		g && (X(C, g, x ? "add" : "change") || w(a, { replace: !0 }));
	}, [
		g,
		x,
		C,
		w,
		a
	]);
	let te = g ? X(C, g, x ? "add" : "change") : !0;
	async function B(t) {
		try {
			let n = Kt(t, Array.from(P.current));
			if (p?.length) for (let e of p) delete n[yn(e)];
			let r;
			if (x) r = (await S.create(e, n)).data, T.success("Created");
			else if (v) r = (await S.update(e, {
				id: v,
				data: n
			})).data, T.success("Updated");
			else return;
			let i = r.id;
			if (p?.length && i != null) for (let e of p) {
				let t = yn(e), n = N.getValues(t) ?? [];
				await _n(S, {
					resource: e.resource,
					foreignKey: e.foreignKey,
					parentId: i,
					rows: n,
					existingIds: M[t] ?? []
				});
			}
			d?.(r), f || w(a);
		} catch (e) {
			T.error(e instanceof Error ? e.message : "Save failed");
		}
	}
	return /* @__PURE__ */ V(b, {
		title: /* @__PURE__ */ H(F, { children: [/* @__PURE__ */ H(c, {
			to: a,
			style: { color: D.colorText },
			children: [/* @__PURE__ */ V(U, {}), " Back"]
		}), /* @__PURE__ */ V(R.Title, {
			level: 5,
			style: { margin: 0 },
			children: r
		})] }),
		children: /* @__PURE__ */ V(Rt, {
			resource: e,
			isNew: x,
			children: /* @__PURE__ */ V(Vt, {
				sourcesRef: P,
				children: /* @__PURE__ */ H("div", {
					style: { position: "relative" },
					children: [O ? /* @__PURE__ */ V("div", {
						style: {
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							zIndex: 1
						},
						children: /* @__PURE__ */ V(I, {})
					}) : null, /* @__PURE__ */ t(ue, {
						...N,
						key: A
					}, /* @__PURE__ */ H(E, {
						layout: "vertical",
						onFinish: () => void N.handleSubmit(B)(),
						style: {
							opacity: O ? .4 : 1,
							pointerEvents: O ? "none" : void 0
						},
						children: [l, /* @__PURE__ */ V(E.Item, {
							style: { marginTop: 16 },
							children: /* @__PURE__ */ H(F, { children: [/* @__PURE__ */ V(y, {
								type: "primary",
								htmlType: "submit",
								disabled: O || !te,
								children: "Save"
							}), /* @__PURE__ */ V(c, {
								to: a,
								children: /* @__PURE__ */ V(y, {
									disabled: O,
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
//#region src/crud/fields/FieldWrapper.tsx
function xn({ source: e, label: t, required: n, rules: r, children: i }) {
	let { control: a } = pe(), o = zt(), s = t ?? e;
	return Ut(e), /* @__PURE__ */ V(le, {
		name: e,
		control: a,
		rules: {
			required: n ? `${s} is required` : !1,
			...r
		},
		render: ({ field: e, fieldState: t }) => /* @__PURE__ */ V(E.Item, {
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
function Sn({ name: e, label: t, required: n, rules: r, hideLabel: i, children: a }) {
	let { control: o } = pe(), s = i ? void 0 : t;
	return /* @__PURE__ */ V(le, {
		name: e,
		control: o,
		rules: {
			required: n ? `${t ?? "This field"} is required` : !1,
			...r
		},
		render: ({ field: e, fieldState: t }) => /* @__PURE__ */ V(E.Item, {
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
function Cn(e, t, n, r, s, c) {
	let l = dn(), u = l?.registerField, d = u != null, f = o(s);
	f.current = s;
	let p = a(() => u ? {
		key: e,
		source: e,
		label: t,
		width: c?.width,
		minWidth: c?.minWidth,
		render: ({ name: e, index: i }) => /* @__PURE__ */ V(Sn, {
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
		c?.width,
		c?.minWidth
	]), m = o(p);
	return m.current = p, i(() => {
		if (!u) return;
		let e = m.current;
		if (e) return u(e);
	}, [u, e]), d ? { mode: "inline" } : {
		mode: "form",
		element: /* @__PURE__ */ V(xn, {
			source: e,
			label: t,
			required: n,
			rules: r,
			children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => s({
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
function wn({ source: e, label: t, required: n, rules: r, placeholder: i, width: a, minWidth: o, inputStyle: s }) {
	let c = Cn(e, t, n, r, ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ V(O, {
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
function Tn({ source: e, label: t, required: n, rules: r, min: i, max: a, step: o, width: s, minWidth: c, inputStyle: l }) {
	let u = Cn(e, t, n, r, ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ V(k, {
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
function En({ source: e, label: t, required: n, rules: r }) {
	let i = Cn(e, t, n, r, ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ V(L, {
		checked: !!e,
		onChange: t,
		disabled: n
	}));
	return i.mode === "inline" ? null : i.element;
}
//#endregion
//#region src/crud/fields/DateField.tsx
var Dn = "YYYY-MM-DD";
function On({ source: e, label: t, required: n, rules: r, showTime: i }) {
	let a = Cn(e, t, n, r, ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ V(S, {
		value: e ? he(String(e)) : null,
		onChange: (e) => t(e ? e.format(i ? `${Dn} HH:mm:ss` : Dn) : null),
		onBlur: n,
		showTime: i,
		disabled: r,
		format: i ? `${Dn} HH:mm:ss` : Dn,
		style: { width: "100%" }
	}));
	return a.mode === "inline" ? null : a.element;
}
//#endregion
//#region src/crud/fields/SelectField.tsx
function kn({ source: e, label: t, required: n, rules: r, choices: i, mode: a, allowClear: o }) {
	return /* @__PURE__ */ V(xn, {
		source: e,
		label: t,
		required: n,
		rules: r,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ V(P, {
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
//#region src/crud/utils/useChoices.ts
var An = /* @__PURE__ */ new Map(), jn = /* @__PURE__ */ new Map();
function Mn(e, t) {
	return typeof e == "function" ? `fn:${t ?? ""}` : Array.isArray(e) ? `static:${e.length}` : `res:${e.resource}:${JSON.stringify(e.filter ?? {})}:${t ?? ""}`;
}
function Nn(e, t) {
	return typeof t == "function" ? t(e) : String(e[t] ?? "");
}
async function Pn(e, t, n, r, i) {
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
		label: Nn(e, n),
		value: e[r],
		record: e
	}));
}
function Fn(e, t, n, r, i) {
	let a = Mn(e, i), o = An.get(a);
	if (o && !i) return Promise.resolve(o);
	let s = jn.get(a);
	if (s) return s;
	let c = Pn(e, t, n, r, i).then((e) => (i || An.set(a, e), e)).finally(() => {
		jn.delete(a);
	});
	return jn.set(a, c), c;
}
function $(e, t, r = "name", o = "id", c) {
	let l = st(), u = a(() => {
		if (e) return e;
		if (t) return {
			resource: t,
			filter: c ? { q: c } : void 0
		};
	}, [
		e,
		t,
		c
	]), d = u ? Mn(u, c) : void 0, [f, p] = s(() => !d || c ? [] : An.get(d) ?? []), [m, h] = s(() => !d || c ? !!u : !An.has(d)), g = n(async () => {
		if (!u) {
			p([]), h(!1);
			return;
		}
		let e = Mn(u, c), t = An.get(e);
		if (t && !c) {
			p(t), h(!1);
			return;
		}
		h(!0);
		try {
			p(await Fn(u, l, r, o, c));
		} catch {
			p([]);
		} finally {
			h(!1);
		}
	}, [
		u,
		l,
		r,
		o,
		c
	]);
	i(() => {
		g();
	}, [g]);
	let _ = n((e) => f.find((t) => t.value === e)?.label ?? String(e ?? "—"), [f]);
	return {
		options: f,
		loading: m,
		labelForValue: _,
		labelsForValues: n((e) => e?.length ? e.map((e) => _(e)).join(", ") : "—", [_]),
		optionForValue: n((e) => f.find((t) => t.value === e), [f]),
		reload: g
	};
}
//#endregion
//#region src/crud/fields/ReferenceField.tsx
function In({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", required: c, rules: l, search: u, allowClear: d, disabled: f, width: p, minWidth: m, inputStyle: h, onValueChange: g }) {
	let [_, v] = s(), { options: y, loading: b, optionForValue: x } = $(r, n, i, o, u ? _ : void 0), S = a(() => y.map((e) => ({
		label: e.label,
		value: e.value
	})), [y]), C = Cn(e, t, c, l, ({ value: e, onChange: t, disabled: n, name: r, index: i }) => /* @__PURE__ */ V(P, {
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
function Ln({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", required: c, rules: l, search: u, allowClear: d = !0 }) {
	let [f, p] = s(), { options: m, loading: h } = $(r, n, i, o, u ? f : void 0), g = a(() => m.map((e) => ({
		label: e.label,
		value: e.value
	})), [m]), _ = Cn(e, t, c, l, ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ V(P, {
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
function Rn({ source: e, label: t, sortable: n = !0 }) {
	return Z(a(() => ({
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
function zn(e, t, n) {
	return typeof n == "function" ? n(e) : n ? Wt(e, n) : e[t];
}
//#endregion
//#region src/crud/columns/NumberColumn.tsx
function Bn({ source: e, label: t, sortable: n = !0 }) {
	return Z(a(() => ({
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
function Vn({ source: e, label: t, sortable: n = !0 }) {
	return Z(a(() => ({
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
function Hn({ source: e, label: t, sortable: n = !0 }) {
	return Z(a(() => ({
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
function Un({ record: e, source: t, display: n, reference: r, choices: i, optionLabel: a, optionValue: o }) {
	let { labelForValue: s } = $(i, r, a, o), c = e[t];
	if (typeof n == "function") return /* @__PURE__ */ V(B, { children: n(e) });
	if (n && n !== t) {
		let r = zn(e, t, n);
		return /* @__PURE__ */ V(B, { children: r == null ? "—" : String(r) });
	}
	return /* @__PURE__ */ V(B, { children: s(c) });
}
function Wn({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", display: s, sortable: c = !0 }) {
	return Z(a(() => ({
		key: e,
		source: e,
		label: t,
		sortable: c,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: c ? !0 : void 0,
			render: (a, c) => /* @__PURE__ */ V(Un, {
				record: c,
				source: e,
				label: t,
				reference: n,
				choices: r,
				optionLabel: i,
				optionValue: o,
				display: s ?? i
			})
		})
	}), [
		e,
		t,
		c,
		n,
		r,
		i,
		o,
		s
	])), null;
}
//#endregion
//#region src/crud/columns/ReferenceManyColumn.tsx
function Gn({ record: e, source: t, reference: n, choices: r, optionLabel: i, optionValue: a }) {
	let { labelsForValues: o } = $(r, n, i, a), s = e[t];
	return /* @__PURE__ */ V(B, { children: o(Array.isArray(s) ? s : []) });
}
function Kn({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", sortable: s = !1 }) {
	return Z(a(() => ({
		key: e,
		source: e,
		label: t,
		sortable: s,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: s ? !0 : void 0,
			render: (t, a) => /* @__PURE__ */ V(Gn, {
				record: a,
				source: e,
				reference: n,
				choices: r,
				optionLabel: i,
				optionValue: o
			})
		})
	}), [
		e,
		t,
		s,
		n,
		r,
		i,
		o
	])), null;
}
//#endregion
//#region src/crud/columns/CustomColumn.tsx
function qn({ source: e, label: t, sortable: n = !1, render: r }) {
	return Z(a(() => ({
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
function Jn({ source: e, label: t, placeholder: n }) {
	return Q(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: r, onChange: i }) => /* @__PURE__ */ V(O, {
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
function Yn({ source: e, label: t }) {
	return Q(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ V(k, {
			placeholder: t ?? e,
			value: n,
			onChange: (e) => r(e ?? void 0),
			style: { minWidth: 120 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/BooleanFilter.tsx
function Xn({ source: e, label: t }) {
	return Q(a(() => ({
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
function Zn({ source: e, label: t }) {
	return Q(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ V(S, {
			allowClear: !0,
			placeholder: t ?? e,
			value: n ? he(String(n)) : null,
			onChange: (e) => r(e ? e.format("YYYY-MM-DD") : void 0),
			style: { minWidth: 160 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/SelectFilter.tsx
function Qn({ source: e, label: t, choices: n, multiple: r }) {
	return Q(a(() => ({
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
function $n({ source: e, label: t, reference: n, choices: r, optionLabel: i, optionValue: a, multiple: o, search: c, value: l, onChange: u }) {
	let [d, f] = s(), { options: p, loading: m } = $(r, n, i, a, c ? d : void 0);
	return /* @__PURE__ */ V(P, {
		allowClear: !0,
		mode: o ? "multiple" : void 0,
		placeholder: t ?? e,
		value: l,
		onChange: u,
		options: p.map((e) => ({
			label: e.label,
			value: e.value
		})),
		loading: m,
		showSearch: c,
		filterOption: c ? !1 : void 0,
		onSearch: c ? f : void 0,
		optionFilterProp: "label",
		style: { minWidth: 180 }
	});
}
function er({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", multiple: s, search: c }) {
	return Q(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: a, onChange: l }) => /* @__PURE__ */ V($n, {
			source: e,
			label: t,
			reference: n,
			choices: r,
			optionLabel: i,
			optionValue: o,
			multiple: s,
			search: c,
			value: a,
			onChange: l
		})
	}), [
		e,
		t,
		n,
		r,
		i,
		o,
		s,
		c
	])), null;
}
function tr(e) {
	return /* @__PURE__ */ V(er, {
		...e,
		multiple: !0
	});
}
//#endregion
export { it as AdminApp, Ke as AdminLayout, xe as AppThemeProvider, wt as AuthAlternateLink, Tt as AuthPageLayout, ke as AuthProvider, Vn as BooleanColumn, En as BooleanField, Xn as BooleanFilter, qn as CustomColumn, ot as DataProvider, Hn as DateColumn, On as DateField, Zn as DateFilter, we as DensitySwitch, sn as FilterBar, qe as Guard, Ye as GuestOnly, gn as InlineFormSet, Et as LoginPage, Bn as NumberColumn, Tn as NumberField, Yn as NumberFilter, Pe as PermissionsProvider, Dt as PlaceholderPage, Je as Protected, Wn as ReferenceColumn, In as ReferenceField, er as ReferenceFilter, Kn as ReferenceManyColumn, Ln as ReferenceManyField, tr as ReferenceManyFilter, Xe as RequirePermission, bn as ResourceForm, qt as ResourceFormModal, an as ResourceList, kn as SelectField, Qn as SelectFilter, Rn as TextColumn, wn as TextField, Jn as TextFilter, Ee as ThemeSwitch, De as ThemeToolbar, _t as applyInMemoryListParams, ut as combineResourceHandlers, rt as createAdminRouter, vt as createMemoryResourceHandlers, Fe as createPermissionsChecker, yt as createRestResourceHandlers, Me as createSessionStorageAuthAdapter, tt as deriveAuthPaths, Le as filterNavByPermission, ht as filterRows, Wt as getByPath, Ze as getRouteAccess, ft as getRowById, vn as loadInlineRows, Qe as partitionAdminRoutes, Kt as pickBySources, _n as saveInlineRows, xt as toDjangoRestOrdering, Ct as toJsonApiSort, St as toODataOrderBy, Ae as useAuth, Ie as useCan, $ as useChoices, st as useDataProvider, en as useListQueryState, Y as usePermissions, nn as useResourceListContext, Se as useThemeMode };
