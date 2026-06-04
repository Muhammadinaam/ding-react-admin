import { createContext as e, createElement as t, useCallback as n, useContext as r, useEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { Link as c, Navigate as l, Outlet as u, RouterProvider as d, createBrowserRouter as f, useLocation as p, useNavigate as m, useParams as h, useSearchParams as g } from "react-router-dom";
import { App as _, Avatar as v, Button as y, Card as b, ConfigProvider as x, DatePicker as S, Drawer as C, Dropdown as w, Flex as T, Form as E, Grid as D, Input as O, InputNumber as k, Layout as A, Menu as j, Modal as M, Popover as N, Segmented as ee, Select as P, Space as F, Spin as I, Switch as te, Table as ne, Typography as L, theme as R } from "antd";
import { Fragment as z, jsx as B, jsxs as V } from "react/jsx-runtime";
import { ArrowLeftOutlined as H, CaretDownOutlined as re, CaretUpOutlined as ie, ColumnHeightOutlined as U, DesktopOutlined as W, LayoutOutlined as G, LogoutOutlined as ae, MenuOutlined as oe, MoonOutlined as se, SettingOutlined as ce, SunOutlined as le, UserOutlined as ue } from "@ant-design/icons";
import { Controller as de, FormProvider as fe, useFieldArray as pe, useForm as me, useFormContext as he, useWatch as ge } from "react-hook-form";
import _e from "dayjs";
//#region src/context/AppThemeProvider.tsx
var K = e(null);
function ve(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "light" || t === "dark" || t === "system") return t;
	} catch {}
	return "system";
}
function ye() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function be(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "comfortable" || t === "compact") return t;
	} catch {}
	return "comfortable";
}
var xe = "ding-react-admin-theme-mode", Se = "ding-react-admin-theme-density";
function Ce({ children: e, modeStorageKey: t = xe, densityStorageKey: n = Se }) {
	let [r, o] = s(() => ve(t)), [c, l] = s(() => be(n)), [u, d] = s(ye);
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
		let e = m === "dark" ? R.darkAlgorithm : R.defaultAlgorithm;
		return { algorithm: c === "compact" ? [e, R.compactAlgorithm] : e };
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
	return /* @__PURE__ */ B(K.Provider, {
		value: g,
		children: /* @__PURE__ */ B(x, {
			theme: h,
			children: e
		})
	});
}
function we() {
	let e = r(K);
	if (!e) throw Error("useThemeMode must be used within AppThemeProvider");
	return e;
}
//#endregion
//#region src/context/AuthProvider.tsx
var Te = e(null);
function Ee({ children: e, adapter: t }) {
	let [r, i] = s(() => t.getToken()), o = n(async (e, n) => {
		await t.login(e, n), i(t.getToken());
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
	return /* @__PURE__ */ B(Te.Provider, {
		value: l,
		children: e
	});
}
function q() {
	let e = r(Te);
	if (!e) throw Error("useAuth must be used within AuthProvider");
	return e;
}
var De = "ding-react-admin-auth";
function Oe(e = De) {
	return {
		async login(t, n) {
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
//#region src/components/DensitySwitch.tsx
var ke = [{
	label: "Comfortable",
	value: "comfortable",
	icon: /* @__PURE__ */ B(G, {})
}, {
	label: "Compact",
	value: "compact",
	icon: /* @__PURE__ */ B(U, {})
}];
function Ae() {
	let { density: e, setDensity: t } = we();
	return /* @__PURE__ */ B(ee, {
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
		icon: /* @__PURE__ */ B(le, {})
	},
	{
		label: "Dark",
		value: "dark",
		icon: /* @__PURE__ */ B(se, {})
	},
	{
		label: "Auto",
		value: "system",
		icon: /* @__PURE__ */ B(W, {})
	}
];
function Me() {
	let { mode: e, setMode: t } = we();
	return /* @__PURE__ */ B(ee, {
		size: "small",
		value: e,
		options: je,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeToolbar.tsx
function Ne() {
	let { token: e } = R.useToken();
	return /* @__PURE__ */ B(N, {
		placement: D.useBreakpoint().lg ? "bottomRight" : "bottom",
		trigger: "click",
		content: /* @__PURE__ */ V(F, {
			direction: "vertical",
			size: "middle",
			style: {
				minWidth: 240,
				maxWidth: "min(92vw, 320px)"
			},
			children: [/* @__PURE__ */ B(Me, {}), /* @__PURE__ */ B(Ae, {})]
		}),
		styles: { body: { padding: e.paddingSM } },
		children: /* @__PURE__ */ B(y, {
			type: "default",
			icon: /* @__PURE__ */ B(ce, {}),
			"aria-label": "Display and theme settings"
		})
	});
}
//#endregion
//#region src/layouts/AdminLayout.tsx
var Pe = "#001529", Fe = "ding-react-admin-sider-collapsed";
function Ie(e) {
	try {
		return localStorage.getItem(e) === "1";
	} catch {
		return !1;
	}
}
function Le() {
	return D.useBreakpoint().lg !== !0;
}
function Re(e) {
	let t = /* @__PURE__ */ new Set();
	function n(e) {
		for (let r of e) r.children?.length ? n(r.children) : t.add(r.path);
	}
	return n(e), t;
}
function ze(e, t) {
	function n(e) {
		for (let r of e) if (r.children?.length) {
			let e = n(r.children);
			if (e !== null) return [r.path, ...e];
		} else if (r.path === t) return [];
		return null;
	}
	return n(e) ?? [];
}
function Be(e) {
	return e.map((e) => {
		let t = e.Icon, n = t ? /* @__PURE__ */ B(t, {}) : void 0;
		return e.children?.length ? {
			key: e.path,
			icon: n,
			label: e.label,
			children: Be(e.children)
		} : {
			key: e.path,
			icon: n,
			label: e.label
		};
	});
}
function Ve({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a }) {
	return /* @__PURE__ */ B(j, {
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
function He({ navItems: e, brand: t = "Admin", collapsedBrand: r = "A", mobileDrawerTitle: o, headerExtras: c, userMenuItems: l, onUserMenuClick: d, loginPath: f = "/login", siderCollapsedStorageKey: h = Fe }) {
	let g = m(), _ = p(), { resolved: b } = we(), x = b === "dark", { logout: S } = q(), [T, E] = s(() => Ie(h)), [D, O] = s(!1), k = Le(), { token: j } = R.useToken(), M = o ?? t, N = () => {
		S(), g(f, { replace: !0 });
	}, ee = n((e) => {
		E(e);
		try {
			localStorage.setItem(h, e ? "1" : "0");
		} catch {}
	}, [h]);
	i(() => {
		k || O(!1);
	}, [k]), i(() => {
		O(!1);
	}, [_.pathname]);
	let P = a(() => Re(e), [e]), F = a(() => Be(e), [e]), I = a(() => ze(e, _.pathname), [e, _.pathname]), [te, ne] = s(() => ze(e, _.pathname));
	i(() => {
		ne((e) => [...new Set([...e, ...I])]);
	}, [I]);
	let z = n((e) => {
		ne(e);
	}, []), H = a(() => [{
		key: "logout",
		icon: /* @__PURE__ */ B(ae, {}),
		label: "Log out",
		danger: !0
	}], []), re = l ?? H, ie = (e) => {
		if (d) {
			d(e);
			return;
		}
		e.key === "logout" && N();
	}, U = x ? j.colorBgContainer : Pe, W = [_.pathname], G = (e) => {
		P.has(e) && (g(e), k && O(!1));
	};
	return /* @__PURE__ */ V(A, {
		style: {
			minHeight: "100vh",
			width: "100%",
			background: j.colorBgLayout
		},
		children: [
			!k && /* @__PURE__ */ V(A.Sider, {
				collapsible: !0,
				collapsed: T,
				onCollapse: ee,
				collapsedWidth: 64,
				style: {
					background: U,
					borderInlineEnd: x ? `1px solid ${j.colorSplit}` : void 0
				},
				children: [/* @__PURE__ */ B("div", {
					style: {
						height: 64,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontWeight: 600
					},
					children: /* @__PURE__ */ B(L.Text, {
						strong: !0,
						style: { color: j.colorTextLightSolid },
						children: T ? r : t
					})
				}), /* @__PURE__ */ B(Ve, {
					menuItems: F,
					selectedKeys: W,
					inlineCollapsed: T,
					openKeys: te,
					onOpenChange: z,
					onNavigate: G
				})]
			}),
			k && /* @__PURE__ */ B(C, {
				title: /* @__PURE__ */ B(L.Text, {
					strong: !0,
					style: { color: j.colorTextLightSolid },
					children: M
				}),
				placement: "left",
				width: 280,
				onClose: () => O(!1),
				open: D,
				styles: {
					header: {
						background: U,
						borderBottom: `1px solid ${j.colorSplit}`
					},
					body: {
						padding: 0,
						background: U
					}
				},
				destroyOnClose: !0,
				children: /* @__PURE__ */ B(Ve, {
					menuItems: F,
					selectedKeys: W,
					inlineCollapsed: !1,
					openKeys: te,
					onOpenChange: z,
					onNavigate: G
				})
			}),
			/* @__PURE__ */ V(A, { children: [/* @__PURE__ */ V(A.Header, {
				style: {
					background: j.colorBgContainer,
					paddingInline: j.paddingLG,
					display: "flex",
					alignItems: "center",
					gap: j.marginSM,
					lineHeight: "normal"
				},
				children: [
					k && /* @__PURE__ */ B(y, {
						type: "text",
						icon: /* @__PURE__ */ B(oe, {}),
						onClick: () => O(!0),
						"aria-label": "Open navigation"
					}),
					/* @__PURE__ */ B("div", { style: {
						flex: 1,
						minWidth: 0
					} }),
					c,
					/* @__PURE__ */ B(Ne, {}),
					/* @__PURE__ */ B(w, {
						menu: {
							items: re,
							onClick: ie
						},
						trigger: ["click"],
						children: /* @__PURE__ */ V(y, {
							type: "text",
							style: {
								display: "inline-flex",
								alignItems: "center",
								gap: j.marginXS,
								maxWidth: k ? 44 : void 0,
								paddingInline: k ? j.paddingXS : void 0
							},
							"aria-label": "Account menu",
							children: [/* @__PURE__ */ B(v, {
								size: "small",
								icon: /* @__PURE__ */ B(ue, {})
							}), !k && /* @__PURE__ */ B(L.Text, {
								type: "secondary",
								children: "User"
							})]
						})
					})
				]
			}), /* @__PURE__ */ B(A.Content, {
				style: { margin: k ? j.marginSM : j.marginLG },
				children: /* @__PURE__ */ B(u, {})
			})] })
		]
	});
}
//#endregion
//#region src/router/guards.tsx
function Ue({ when: e, redirect: t, children: n }) {
	return e ? n : /* @__PURE__ */ B(l, {
		to: t,
		replace: !0
	});
}
function We({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = q();
	return /* @__PURE__ */ B(Ue, {
		when: n,
		redirect: t,
		children: e
	});
}
function Ge({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = q();
	return /* @__PURE__ */ B(Ue, {
		when: !n,
		redirect: t,
		children: e
	});
}
//#endregion
//#region src/router/routeAccess.ts
function Ke(e) {
	return e.access ?? "protected";
}
function qe(e) {
	let t = [], n = [], r = [];
	for (let i of e) {
		let e = Ke(i);
		e === "guest" ? t.push(i) : e === "public" ? n.push(i) : r.push(i);
	}
	return {
		guest: t,
		public: n,
		protected: r
	};
}
function Je(e) {
	return e.replace(/^\/+/, "");
}
function Ye(e) {
	return `/${Je(e)}`;
}
function Xe(e, t) {
	let { guest: n, protected: r } = qe(e), i = n.find((e) => "path" in e && e.path), a = r.find((e) => "index" in e && e.index), o = r.find((e) => "path" in e && e.path), s = t?.unauthenticated;
	!s && i && "path" in i && i.path && (s = Ye(i.path));
	let c = t?.afterLogin;
	if (c || (a ? c = "/" : o && "path" in o && o.path && (c = Ye(o.path))), r.length > 0 && !s) throw Error("createAdminRouter: protected routes require redirects.unauthenticated or a guest route (access: \"guest\").");
	if (n.length > 0 && !c) throw Error("createAdminRouter: guest routes require redirects.afterLogin or a protected route (index or path).");
	return {
		loginPath: s ?? "/",
		homePath: c ?? "/"
	};
}
function Ze(e) {
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
function Qe({ navItems: e, children: t, layoutProps: n, redirects: r }) {
	let { loginPath: i, homePath: a } = Xe(t, r), { guest: o, public: s, protected: c } = qe(t), u = [];
	for (let e of o) !("path" in e) || !e.path || u.push({
		path: Je(e.path),
		element: /* @__PURE__ */ B(Ge, {
			redirectTo: a,
			children: e.element
		})
	});
	for (let e of s) !("path" in e) || !e.path || u.push({
		path: Je(e.path),
		element: e.element
	});
	return c.length > 0 && u.push({
		path: "/",
		element: /* @__PURE__ */ B(We, {
			redirectTo: i,
			children: /* @__PURE__ */ B(He, {
				navItems: e,
				loginPath: i,
				...n
			})
		}),
		children: c.map(Ze)
	}), u.push({
		path: "*",
		element: /* @__PURE__ */ B(l, {
			to: a,
			replace: !0
		})
	}), f(u);
}
//#endregion
//#region src/app/AdminApp.tsx
function $e({ navItems: e, routes: t, auth: n, layoutProps: r, theme: i }) {
	let o = a(() => Qe({
		navItems: e,
		children: t,
		layoutProps: r,
		redirects: n.redirects
	}), [
		e,
		t,
		r,
		n.redirects
	]);
	return /* @__PURE__ */ B(Ce, {
		...i,
		children: /* @__PURE__ */ B(Ee, {
			adapter: n.adapter,
			children: /* @__PURE__ */ B(d, { router: o })
		})
	});
}
//#endregion
//#region src/context/DataProvider.tsx
var et = e(null);
function tt({ children: e, value: t }) {
	let n = a(() => t, [t]);
	return /* @__PURE__ */ B(et.Provider, {
		value: n,
		children: e
	});
}
function J() {
	let e = r(et);
	if (!e) throw Error("useDataProvider must be used within DataProvider");
	return e;
}
//#endregion
//#region src/context/PermissionsProvider.tsx
var nt = e(null);
function rt({ children: e, can: t }) {
	let n = a(() => t, [t]);
	return /* @__PURE__ */ B(nt.Provider, {
		value: n,
		children: e
	});
}
function it() {
	let e = r(nt);
	if (!e) throw Error("usePermissions must be used within PermissionsProvider");
	return e;
}
function at(e, t) {
	let r = it();
	return n(() => r(e, t), [
		r,
		e,
		t
	]);
}
//#endregion
//#region src/data/resourceHandlers.ts
function ot(e, t) {
	let n = t?.guard, r = (t) => {
		let n = e[t];
		if (!n) throw Error(`Unknown resource: ${t}`);
		return n;
	};
	return {
		async getList(e, t) {
			return n?.(e, "list"), r(e).getList(t);
		},
		async getOne(e, t) {
			return n?.(e, "read"), r(e).getOne(t);
		},
		async create(e, t) {
			return n?.(e, "write"), r(e).create(t);
		},
		async update(e, t) {
			return n?.(e, "write"), r(e).update(t);
		},
		async delete(e, t) {
			return n?.(e, "delete"), r(e).delete(t);
		}
	};
}
//#endregion
//#region src/data/inMemoryList.ts
function st(e, t) {
	let n = typeof t == "string" ? Number(t) : t, r = e.find((e) => e.id === n);
	if (!r) throw Error("Not found");
	return r;
}
function ct(e, t) {
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
function lt(e, t) {
	return t == null || t === "" ? !0 : Array.isArray(t) ? t.length === 0 ? !0 : Array.isArray(e) ? t.some((t) => e.includes(t)) : t.includes(e) : Array.isArray(e) ? e.includes(t) : typeof t == "string" && typeof e == "string" ? e.toLowerCase().includes(t.toLowerCase()) : e === t;
}
function ut(e, t) {
	return t ? e.filter((e) => Object.entries(t).every(([t, n]) => lt(e[t], n))) : e;
}
function dt(e, t, n) {
	let r = (t - 1) * n;
	return {
		data: e.slice(r, r + n),
		total: e.length
	};
}
function ft(e, t) {
	let { pagination: n, sort: r, filter: i } = t, a = ut(e, i);
	if (r) {
		let e = Array.isArray(r) ? r : [r];
		e.length > 0 && e[0]?.field && (a = ct(a, e));
	}
	return n ? dt(a, n.page, n.perPage) : {
		data: a,
		total: a.length
	};
}
//#endregion
//#region src/data/createMemoryResourceHandlers.ts
function pt(e) {
	let t = (e) => e;
	return {
		async getList(n) {
			return ft(t(e.scopeList ? e.scopeList(e.getRows(), n) : e.getRows()), n);
		},
		async getOne(t) {
			return { data: st(e.getRows(), t) };
		},
		async create(t) {
			let n = e.mapCreate(t, e.nextId());
			return e.getRows().push(n), { data: n };
		},
		async update({ id: t, data: n }) {
			let r = st(e.getRows(), t), i = n, a = e.applyUpdate ? e.applyUpdate(r, i) : {
				...r,
				...i,
				id: r.id
			};
			return Object.assign(r, a), { data: r };
		},
		async delete(t) {
			let n = e.getRows(), r = typeof t == "string" ? Number(t) : t, i = n.findIndex((e) => e.id === r);
			if (i < 0) return { data: null };
			let [a] = n.splice(i, 1);
			return e.afterDelete?.(a), { data: a };
		}
	};
}
//#endregion
//#region src/components/AuthAlternateLink.tsx
function mt({ prompt: e, linkText: t, to: n }) {
	return /* @__PURE__ */ V(L.Paragraph, {
		type: "secondary",
		style: {
			textAlign: "center",
			marginBottom: 0
		},
		children: [
			e,
			" ",
			/* @__PURE__ */ B(c, {
				to: n,
				children: t
			})
		]
	});
}
//#endregion
//#region src/layouts/AuthPageLayout.tsx
function ht({ children: e, brand: t, footer: n, showThemeToolbar: r = !0 }) {
	let { token: i } = R.useToken();
	return /* @__PURE__ */ V(T, {
		vertical: !0,
		align: "stretch",
		style: {
			height: "100dvh",
			maxHeight: "100dvh",
			width: "100%",
			overflow: "hidden",
			background: i.colorBgLayout
		},
		children: [r ? /* @__PURE__ */ B(T, {
			justify: "flex-end",
			style: {
				flexShrink: 0,
				width: "100%",
				padding: 16,
				background: i.colorBgLayout
			},
			children: /* @__PURE__ */ B(Ne, {})
		}) : null, /* @__PURE__ */ V(T, {
			flex: 1,
			vertical: !0,
			align: "center",
			justify: "center",
			style: {
				width: "100%",
				minHeight: 0,
				padding: 24,
				overflow: "auto",
				overflowX: "hidden",
				background: i.colorBgLayout
			},
			children: [
				t ? /* @__PURE__ */ B("div", {
					style: {
						marginBottom: 24,
						textAlign: "center"
					},
					children: t
				}) : null,
				e,
				n ? /* @__PURE__ */ B("div", {
					style: {
						marginTop: 16,
						width: "100%",
						maxWidth: 520
					},
					children: n
				}) : null
			]
		})]
	});
}
//#endregion
//#region src/pages/LoginPage.tsx
function gt({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, brand: r, extraFields: i, showThemeToolbar: a = !0, afterLoginPath: o = "/", alternateAuth: s, footer: c }) {
	let { login: l } = q(), u = m();
	return /* @__PURE__ */ B(ht, {
		brand: r ?? n,
		footer: c ?? (s ? /* @__PURE__ */ B(mt, {
			prompt: s.prompt ?? "Don't have an account?",
			linkText: s.linkText,
			to: s.to
		}) : null),
		showThemeToolbar: a,
		children: /* @__PURE__ */ V(b, {
			style: {
				width: "100%",
				maxWidth: 360
			},
			title: e,
			children: [t ? /* @__PURE__ */ B(L.Paragraph, {
				type: "secondary",
				style: { marginTop: 0 },
				children: t
			}) : null, /* @__PURE__ */ V(E, {
				layout: "vertical",
				onFinish: async (e) => {
					await l(e.username, e.password), u(o, { replace: !0 });
				},
				children: [
					/* @__PURE__ */ B(E.Item, {
						name: "username",
						label: "Username",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ B(O, { autoComplete: "username" })
					}),
					/* @__PURE__ */ B(E.Item, {
						name: "password",
						label: "Password",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ B(O.Password, { autoComplete: "current-password" })
					}),
					i,
					/* @__PURE__ */ B(E.Item, {
						style: { marginBottom: 0 },
						children: /* @__PURE__ */ B(y, {
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
function _t({ title: e }) {
	return /* @__PURE__ */ B(L.Title, {
		level: 4,
		children: e
	});
}
//#endregion
//#region src/crud/utils/sortQueryParam.ts
function vt(e) {
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
function yt(e) {
	return e.length === 0 ? null : e.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function bt(e) {
	return new Map(e.map((e, t) => [e.field, t + 1]));
}
//#endregion
//#region src/crud/context/ListContext.tsx
var xt = e(null);
function St({ children: e, toggleSort: t, sort: r }) {
	let [i, o] = s([]), c = a(() => new Set(r.map((e) => e.field)), [r]), l = a(() => new Map(r.map((e) => [e.field, e.order])), [r]), u = a(() => bt(r), [r]), d = n((e) => (o((t) => {
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
	return /* @__PURE__ */ B(xt.Provider, {
		value: f,
		children: e
	});
}
function Ct() {
	let e = r(xt);
	if (!e) throw Error("Column components must be used within ResourceList");
	return e;
}
function Y(e) {
	let { registerColumn: t } = Ct();
	i(() => t(e), [t, e]);
}
//#endregion
//#region src/crud/context/FilterContext.tsx
var wt = e(null);
function Tt({ children: e, values: t, setFilterValue: r }) {
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
	return /* @__PURE__ */ B(wt.Provider, {
		value: l,
		children: e
	});
}
function Et() {
	return r(wt);
}
function X(e) {
	let t = Et()?.registerFilter;
	i(() => {
		if (t) return t(e);
	}, [t, e]);
}
//#endregion
//#region src/crud/context/FormContext.tsx
var Dt = e(null);
function Ot({ children: e, resource: t, isNew: n, disabled: r }) {
	return /* @__PURE__ */ B(Dt.Provider, {
		value: {
			resource: t,
			isNew: n,
			disabled: r
		},
		children: e
	});
}
function kt() {
	return r(Dt);
}
//#endregion
//#region src/crud/ResourceFormModal.tsx
function At({ resource: e, editId: t, onClose: r, children: a, title: o }) {
	let c = t === "new" || t == null, l = t != null, u = J(), { message: d } = _.useApp(), [f, p] = s(!c), m = me(), h = n(async () => {
		if (c || !t) {
			m.reset({}), p(!1);
			return;
		}
		p(!0);
		try {
			let n = await u.getOne(e, t);
			m.reset(n.data);
		} catch (e) {
			d.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			p(!1);
		}
	}, [
		u,
		e,
		t,
		c,
		m,
		d
	]);
	i(() => {
		l && h();
	}, [l, h]);
	async function g(n) {
		try {
			c ? (await u.create(e, n), d.success("Created")) : t && (await u.update(e, {
				id: t,
				data: n
			}), d.success("Updated")), r();
		} catch (e) {
			d.error(e instanceof Error ? e.message : "Save failed");
		}
	}
	return /* @__PURE__ */ B(M, {
		open: l,
		title: o ?? (c ? `New ${e}` : `Edit ${e}`),
		onCancel: r,
		footer: null,
		destroyOnHidden: !0,
		width: 560,
		children: f ? /* @__PURE__ */ B(I, {}) : /* @__PURE__ */ B(Ot, {
			resource: e,
			isNew: c,
			children: /* @__PURE__ */ B(fe, {
				...m,
				children: /* @__PURE__ */ V(E, {
					layout: "vertical",
					onFinish: () => void m.handleSubmit(g)(),
					children: [a, /* @__PURE__ */ V(E.Item, {
						style: {
							marginTop: 16,
							marginBottom: 0
						},
						children: [/* @__PURE__ */ B(y, {
							type: "primary",
							htmlType: "submit",
							style: { marginRight: 8 },
							children: "Save"
						}), /* @__PURE__ */ B(y, {
							onClick: r,
							children: "Cancel"
						})]
					})]
				})
			})
		})
	});
}
//#endregion
//#region src/crud/ListActionsBar.tsx
function jt({ selectedCount: e, total: t, allPageSelected: r, allMatchingSelected: i, onSelectAllMatching: o, onClearSelection: c, actions: l, onExecute: u, selectedIds: d, running: f = !1 }) {
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
	return /* @__PURE__ */ V(F, {
		wrap: !0,
		style: {
			marginBottom: 16,
			width: "100%"
		},
		align: "center",
		children: [
			/* @__PURE__ */ V(L.Text, {
				type: "secondary",
				children: [
					e,
					" of ",
					t,
					" selected"
				]
			}),
			e > 0 ? /* @__PURE__ */ B(y, {
				type: "link",
				size: "small",
				onClick: c,
				style: { padding: 0 },
				children: "Clear selection"
			}) : null,
			_ ? /* @__PURE__ */ V(z, { children: [/* @__PURE__ */ B(L.Text, {
				type: "secondary",
				children: "·"
			}), /* @__PURE__ */ V(y, {
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
			i && t > 0 ? /* @__PURE__ */ V(z, { children: [/* @__PURE__ */ B(L.Text, {
				type: "secondary",
				children: "·"
			}), /* @__PURE__ */ V(L.Text, {
				type: "success",
				children: [
					"All ",
					t,
					" items selected"
				]
			})] }) : null,
			/* @__PURE__ */ B(P, {
				placeholder: "Action",
				style: { minWidth: 200 },
				options: h,
				value: p,
				onChange: m,
				disabled: e === 0 || f,
				allowClear: !0
			}),
			/* @__PURE__ */ B(y, {
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
var Mt = new Set([
	"page",
	"perPage",
	"sort",
	"create",
	"edit"
]), Nt = 1, Pt = 10;
function Ft(e) {
	if (e.includes(",")) {
		let t = e.split(",").map((e) => e.trim()), n = t.map(Number);
		return n.every((e) => Number.isFinite(e)) ? n : t;
	}
	let t = Number(e);
	return e !== "" && Number.isFinite(t) && String(t) === e ? t : e === "true" ? !0 : e === "false" ? !1 : e;
}
function It(e) {
	return e == null || e === "" ? null : Array.isArray(e) ? e.length === 0 ? null : e.map(String).join(",") : String(e);
}
function Lt(e) {
	let [t, r] = g(), i = a(() => {
		let n = t.get("page"), r = t.get("perPage"), i = n ? Math.max(1, Number(n) || Nt) : Nt, a = r ? Math.max(1, Number(r) || Pt) : Pt, o = t.getAll("sort"), s = o.length > 0 ? o.flatMap((e) => vt(e)) : vt(t.get("sort")), c = { ...e };
		return t.forEach((e, n) => {
			if (Mt.has(n)) return;
			let r = c[n];
			r === void 0 ? t.getAll(n).length > 1 ? c[n] = t.getAll(n).map(Ft) : c[n] = Ft(e) : c[n] = [...Array.isArray(r) ? r : [r], Ft(e)];
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
				e === Pt ? t.delete("perPage") : t.set("perPage", String(e)), t.delete("page");
			});
		},
		setSort: (e) => {
			o((t) => {
				t.delete("sort");
				let n = yt(e);
				n && t.set("sort", n);
			});
		},
		toggleSort: (e) => {
			o((t) => {
				let n = t.getAll("sort").flatMap((e) => vt(e)), r = n.findIndex((t) => t.field === e), i;
				i = r < 0 ? [...n, {
					field: e,
					order: "ASC"
				}] : n[r].order === "ASC" ? n.map((e, t) => t === r ? {
					...e,
					order: "DESC"
				} : e) : n.filter((e, t) => t !== r), t.delete("sort");
				let a = yt(i);
				a && t.set("sort", a);
			});
		},
		setFilter: (e, t) => {
			o((n) => {
				n.delete(e);
				let r = It(t);
				r != null && n.set(e, r), n.delete("page");
			});
		},
		setFilters: (e) => {
			o((t) => {
				for (let e of [...t.keys()]) Mt.has(e) || t.delete(e);
				for (let [n, r] of Object.entries(e)) {
					let e = It(r);
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
var Rt = e(null);
function zt() {
	return r(Rt);
}
function Bt({ resource: e, title: t, pathPrefix: r, newPath: o, editMode: l = "page", formChildren: u, actions: d, rowActions: f, headerExtra: p, bulkActions: m, bulkDelete: h = !0, bulkActionsEnabled: g = !0, queryState: v, queryActions: x }) {
	let S = J(), C = it(), { message: w, modal: T } = _.useApp(), { columns: E, sortOrders: D, sortPriorities: O } = Ct(), [k, A] = s(!1), [j, M] = s([]), [N, ee] = s(0), [P, I] = s(() => /* @__PURE__ */ new Set()), [te, R] = s(!1), H = o ?? `${r}/new`, U = C("write", e), W = C("delete", e), G = U && (l === "page" || l === "both") && d?.edit !== !1, ae = U && (l === "modal" || l === "both") && d?.quickEdit !== !1, oe = W && d?.delete !== !1, se = G || ae || oe || f, ce = n(() => {
		I(/* @__PURE__ */ new Set());
	}, []), le = a(() => {
		if (!g) return [];
		let t = [];
		return h && W && t.push({
			key: "__delete",
			label: "Delete selected",
			confirm: (e) => `Delete ${e.length} selected item(s)? This cannot be undone.`,
			execute: async (t, { reload: n, clearSelection: r }) => {
				await Promise.all(t.map((t) => S.delete(e, t))), r(), n(), w.success(`Deleted ${t.length} item(s)`);
			}
		}), [...t, ...m ?? []];
	}, [
		g,
		h,
		W,
		m,
		S,
		e,
		w
	]), ue = le.length > 0, de = P.size, fe = j.length > 0 && j.every((e) => P.has(e.id)), pe = N > 0 && de >= N, me = a(() => j.filter((e) => P.has(e.id)).map((e) => e.id), [j, P]), he = n((e) => {
		I((t) => {
			let n = new Set(t), r = j.map((e) => e.id);
			for (let t of r) e.includes(t) || n.delete(t);
			for (let t of e) n.add(t);
			return n;
		});
	}, [j]), ge = n(async () => {
		if (!(N <= 0)) {
			R(!0);
			try {
				let t = v.sort.length === 0 ? void 0 : v.sort.length === 1 ? v.sort[0] : v.sort, n = await S.getList(e, {
					pagination: {
						page: 1,
						perPage: N
					},
					sort: t,
					filter: v.filter
				});
				I(new Set(n.data.map((e) => e.id)));
			} catch (e) {
				w.error(e instanceof Error ? e.message : "Load failed");
			} finally {
				R(!1);
			}
		}
	}, [
		S,
		e,
		N,
		v.sort,
		v.filter,
		w
	]), _e = n((e) => {
		let t = (e) => {
			let t = e?.columnKey ?? e?.field;
			return t == null ? null : String(Array.isArray(t) ? t[0] : t);
		};
		if (Array.isArray(e)) {
			let n = e.find((e) => e?.order);
			if (n) {
				let e = t(n);
				e && x.toggleSort(e);
				return;
			}
			v.sort.length > 0 && x.setSort([]);
			return;
		}
		let n = t(e);
		if (n) {
			x.toggleSort(n);
			return;
		}
		!e?.order && v.sort.length > 0 && x.setSort([]);
	}, [x, v.sort.length]), K = n(async () => {
		A(!0);
		try {
			let t = v.sort.length === 0 ? void 0 : v.sort.length === 1 ? v.sort[0] : v.sort, n = await S.getList(e, {
				pagination: {
					page: v.page,
					perPage: v.perPage
				},
				sort: t,
				filter: v.filter
			});
			M(n.data), ee(n.total);
		} catch (e) {
			w.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			A(!1);
		}
	}, [
		S,
		e,
		v,
		w
	]);
	i(() => {
		K();
	}, [K]);
	let ve = a(() => ({
		reload: () => void K(),
		clearSelection: ce
	}), [K, ce]), ye = n(async (e, t) => {
		if (e.confirm) {
			let n = typeof e.confirm == "function" ? await e.confirm(t, ve) : e.confirm;
			if (n === !1 || !await new Promise((t) => {
				T.confirm({
					title: n,
					okType: e.key === "__delete" ? "danger" : "primary",
					onOk: () => t(!0),
					onCancel: () => t(!1)
				});
			})) return;
		}
		R(!0);
		try {
			await e.execute(t, ve);
		} catch (e) {
			w.error(e instanceof Error ? e.message : "Action failed");
		} finally {
			R(!1);
		}
	}, [
		ve,
		T,
		w
	]), be = n(async (t) => {
		if (C("delete", e)) try {
			await S.delete(e, t.id), w.success("Deleted"), K();
		} catch (e) {
			w.error(e instanceof Error ? e.message : "Delete failed");
		}
	}, [
		C,
		S,
		e,
		K,
		w
	]), xe = a(() => {
		let e = E.map((e) => {
			let t = e.buildColumn();
			if (e.sortable) {
				let n = D.get(e.source), r = O.get(e.source), i = n === "ASC" ? "ascend" : n === "DESC" ? "descend" : void 0, a = i == null ? void 0 : /* @__PURE__ */ V("span", {
					style: {
						display: "inline-flex",
						alignItems: "center",
						gap: 2,
						marginInlineStart: 4,
						color: "var(--ant-color-primary)"
					},
					children: [r == null ? null : /* @__PURE__ */ B("span", {
						style: {
							fontSize: 11,
							fontWeight: 600,
							lineHeight: 1,
							minWidth: 10,
							textAlign: "center"
						},
						children: r
					}), B(i === "ascend" ? ie : re, { style: { fontSize: 11 } })]
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
			reload: () => void K(),
			openEditModal: x.openEditModal
		}, n = {
			title: "Actions",
			key: "__actions",
			width: l === "both" ? 200 : 160,
			render: (e, n) => /* @__PURE__ */ V(F, {
				size: "small",
				wrap: !0,
				children: [
					G ? /* @__PURE__ */ B(c, {
						to: `${r}/${String(n.id)}`,
						children: "Edit"
					}) : null,
					ae ? /* @__PURE__ */ B(y, {
						type: "link",
						size: "small",
						style: { padding: 0 },
						onClick: () => x.openEditModal(n.id),
						children: l === "both" ? "Quick edit" : "Edit"
					}) : null,
					oe ? /* @__PURE__ */ B(y, {
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
		E,
		se,
		G,
		ae,
		oe,
		l,
		r,
		be,
		D,
		O,
		x,
		f,
		K
	]), Se = u && (v.createModal || v.editId != null) && (l === "modal" || l === "both");
	return /* @__PURE__ */ V(z, { children: [/* @__PURE__ */ V(b, {
		title: /* @__PURE__ */ B(L.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		}),
		extra: p || U ? /* @__PURE__ */ V(F, { children: [p, U ? l === "modal" || l === "both" ? /* @__PURE__ */ V(z, { children: [l === "both" ? /* @__PURE__ */ B(c, {
			to: H,
			children: /* @__PURE__ */ B(y, { children: "New page" })
		}) : null, /* @__PURE__ */ B(y, {
			type: "primary",
			onClick: () => x.openCreateModal(),
			children: "New"
		})] }) : /* @__PURE__ */ B(c, {
			to: H,
			children: /* @__PURE__ */ B(y, {
				type: "primary",
				children: "New"
			})
		}) : null] }) : null,
		children: [ue ? /* @__PURE__ */ B(jt, {
			selectedCount: de,
			total: N,
			allPageSelected: fe,
			allMatchingSelected: pe,
			onSelectAllMatching: () => void ge(),
			onClearSelection: ce,
			actions: le,
			onExecute: ye,
			selectedIds: [...P],
			running: te || k
		}) : null, /* @__PURE__ */ B(ne, {
			rowKey: "id",
			loading: k,
			columns: xe,
			dataSource: j,
			rowSelection: ue ? {
				selectedRowKeys: me,
				onChange: he,
				preserveSelectedRowKeys: !0
			} : void 0,
			pagination: {
				current: v.page,
				pageSize: v.perPage,
				total: N,
				showSizeChanger: !0,
				onChange: (e, t) => {
					x.setPage(e), t && x.setPerPage(t);
				}
			},
			onChange: (e, t, n) => {
				_e(n);
			}
		})]
	}), Se ? /* @__PURE__ */ B(At, {
		resource: e,
		editId: v.createModal ? "new" : v.editId,
		onClose: () => {
			x.closeModal(), K();
		},
		children: u
	}) : null] });
}
function Vt({ resource: e, title: t, pathPrefix: r, newPath: i, staticFilter: o, editMode: s = "page", syncQueryParams: c = !0, children: l, formChildren: u, actions: d, rowActions: f, headerExtra: p, bulkActions: m, bulkDelete: h, bulkActionsEnabled: g }) {
	let [_, v] = Lt(o), y = a(() => {
		if (!c) return o ?? {};
		let e = {};
		for (let [t, n] of Object.entries(_.filter)) o && t in o || (e[t] = n);
		return e;
	}, [
		_.filter,
		o,
		c
	]), b = n((e, t) => {
		c && v.setFilter(e, t);
	}, [c, v]), x = a(() => ({
		filterValues: y,
		setFilterValue: b
	}), [y, b]);
	return /* @__PURE__ */ B(Rt.Provider, {
		value: x,
		children: /* @__PURE__ */ B(Tt, {
			values: y,
			setFilterValue: b,
			children: /* @__PURE__ */ V(St, {
				toggleSort: v.toggleSort,
				sort: _.sort,
				children: [l, /* @__PURE__ */ B(Bt, {
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
					queryState: _,
					queryActions: v
				})]
			})
		})
	});
}
//#endregion
//#region src/crud/FilterBar.tsx
function Ht() {
	let e = Et();
	return !e || e.filters.length === 0 ? null : /* @__PURE__ */ B(F, {
		wrap: !0,
		size: "middle",
		style: { marginBottom: 16 },
		children: e.filters.map((t) => /* @__PURE__ */ V(F, {
			direction: "vertical",
			size: 2,
			children: [t.label ? /* @__PURE__ */ B(L.Text, {
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
function Ut({ children: e }) {
	return /* @__PURE__ */ V(z, { children: [e, /* @__PURE__ */ B(Ht, {})] });
}
//#endregion
//#region src/crud/context/InlineFormContext.tsx
var Wt = e(null), Gt = e([]);
function Kt({ children: e, arrayName: t, layout: r = "tabular" }) {
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
	return /* @__PURE__ */ B(Wt.Provider, {
		value: l,
		children: /* @__PURE__ */ B(Gt.Provider, {
			value: i,
			children: e
		})
	});
}
function qt() {
	let e = r(Wt), t = r(Gt);
	return e ? {
		...e,
		fields: t
	} : null;
}
//#endregion
//#region src/crud/utils/inlineArrayName.ts
function Jt(e, t) {
	return t ?? `__inline_${e.replace(/[^a-z0-9]/gi, "_")}`;
}
//#endregion
//#region src/crud/InlineFormSet.tsx
function Yt(e) {
	let t = qt(), { control: n } = he(), r = ge({
		control: n,
		name: e
	}), { fields: a, append: o, remove: s, replace: c } = pe({
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
function Xt({ arrayName: e, label: t }) {
	let { ctx: n, fields: r, remove: i, appendEmpty: o } = Yt(e), s = a(() => n ? n.fields.map((t) => ({
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
	return n ? /* @__PURE__ */ V("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ B(L.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ B(ne, {
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
					render: (e, t, n) => /* @__PURE__ */ B(y, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => i(n),
						children: "Remove"
					})
				}]
			}),
			/* @__PURE__ */ B(y, {
				type: "dashed",
				style: { marginTop: 8 },
				onClick: o,
				children: "Add row"
			})
		]
	}) : null;
}
function Zt({ arrayName: e, label: t }) {
	let { ctx: n, fields: r, remove: i, appendEmpty: a } = Yt(e);
	return n ? /* @__PURE__ */ V("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ B(L.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ B(F, {
				direction: "vertical",
				size: "middle",
				style: { width: "100%" },
				children: r.map((t, r) => /* @__PURE__ */ B(b, {
					size: "small",
					title: `Item ${r + 1}`,
					extra: /* @__PURE__ */ B(y, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => i(r),
						children: "Remove"
					}),
					children: n.fields.map((t) => /* @__PURE__ */ B("div", { children: t.render({
						name: `${e}.${r}.${t.source}`,
						index: r
					}) }, t.source))
				}, t.id))
			}),
			/* @__PURE__ */ B(y, {
				type: "dashed",
				style: { marginTop: 8 },
				onClick: a,
				children: "Add item"
			})
		]
	}) : null;
}
function Qt({ resource: e, label: t, children: n, name: r, layout: i = "tabular" }) {
	let a = Jt(e, r);
	return /* @__PURE__ */ V(Kt, {
		arrayName: a,
		layout: i,
		children: [n, B(i === "stacked" ? Zt : Xt, {
			arrayName: a,
			label: t
		})]
	});
}
async function $t(e, t) {
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
async function en(e, t, n, r) {
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
function tn(e) {
	return Jt(e.resource, e.name);
}
function nn({ resource: e, title: r, listPath: a, children: o, defaultValues: l, onSaved: u, stayOnPage: d, inlines: f }) {
	let { id: p } = h(), g = p === "new" || !p, v = J(), x = m(), { message: S } = _.useApp(), { token: C } = R.useToken(), [w, T] = s(!g), [D, O] = s(0), [k, A] = s({}), j = me({ defaultValues: l }), M = n(async () => {
		if (g || !p) {
			l && j.reset({ ...l }), T(!1);
			return;
		}
		T(!0);
		try {
			let t = (await v.getOne(e, p)).data;
			if (f?.length) {
				let e = { ...t }, n = {};
				for (let t of f) {
					let r = tn(t), { rows: i, ids: a } = await en(v, t.resource, t.foreignKey, p);
					e[r] = i, n[r] = a;
				}
				j.reset(e), A(n), O((e) => e + 1);
			} else j.reset(t), O((e) => e + 1);
		} catch (e) {
			S.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			T(!1);
		}
	}, [
		v,
		e,
		p,
		g,
		j,
		S,
		l,
		n(async (e) => {
			if (!f?.length) return;
			let t = {};
			for (let n of f) {
				let r = tn(n), { rows: i, ids: a } = await en(v, n.resource, n.foreignKey, e);
				j.setValue(r, i), t[r] = a;
			}
			A(t);
		}, [
			v,
			f,
			j
		])
	]);
	i(() => {
		M();
	}, [M]);
	async function N(t) {
		try {
			let n = { ...t };
			if (f?.length) for (let e of f) delete n[tn(e)];
			let r;
			if (g) r = (await v.create(e, n)).data, S.success("Created");
			else if (p) r = (await v.update(e, {
				id: p,
				data: n
			})).data, S.success("Updated");
			else return;
			let i = r.id;
			if (f?.length && i != null) for (let e of f) {
				let t = tn(e), n = j.getValues(t) ?? [];
				await $t(v, {
					resource: e.resource,
					foreignKey: e.foreignKey,
					parentId: i,
					rows: n,
					existingIds: k[t] ?? []
				});
			}
			u?.(r), d || x(a);
		} catch (e) {
			S.error(e instanceof Error ? e.message : "Save failed");
		}
	}
	return /* @__PURE__ */ B(b, {
		title: /* @__PURE__ */ V(F, { children: [/* @__PURE__ */ V(c, {
			to: a,
			style: { color: C.colorText },
			children: [/* @__PURE__ */ B(H, {}), " Back"]
		}), /* @__PURE__ */ B(L.Title, {
			level: 5,
			style: { margin: 0 },
			children: r
		})] }),
		children: /* @__PURE__ */ B(Ot, {
			resource: e,
			isNew: g,
			children: /* @__PURE__ */ V("div", {
				style: { position: "relative" },
				children: [w ? /* @__PURE__ */ B("div", {
					style: {
						position: "absolute",
						inset: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1
					},
					children: /* @__PURE__ */ B(I, {})
				}) : null, /* @__PURE__ */ t(fe, {
					...j,
					key: D
				}, /* @__PURE__ */ V(E, {
					layout: "vertical",
					onFinish: () => void j.handleSubmit(N)(),
					style: {
						opacity: w ? .4 : 1,
						pointerEvents: w ? "none" : void 0
					},
					children: [o, /* @__PURE__ */ B(E.Item, {
						style: { marginTop: 16 },
						children: /* @__PURE__ */ V(F, { children: [/* @__PURE__ */ B(y, {
							type: "primary",
							htmlType: "submit",
							disabled: w,
							children: "Save"
						}), /* @__PURE__ */ B(c, {
							to: a,
							children: /* @__PURE__ */ B(y, {
								disabled: w,
								children: "Cancel"
							})
						})] })
					})]
				}))]
			})
		})
	});
}
//#endregion
//#region src/crud/fields/FieldWrapper.tsx
function rn({ source: e, label: t, required: n, rules: r, children: i }) {
	let { control: a } = he(), o = kt(), s = t ?? e;
	return /* @__PURE__ */ B(de, {
		name: e,
		control: a,
		rules: {
			required: n ? `${s} is required` : !1,
			...r
		},
		render: ({ field: e, fieldState: t }) => /* @__PURE__ */ B(E.Item, {
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
function an({ name: e, label: t, required: n, rules: r, hideLabel: i, children: a }) {
	let { control: o } = he(), s = i ? void 0 : t;
	return /* @__PURE__ */ B(de, {
		name: e,
		control: o,
		rules: {
			required: n ? `${t ?? "This field"} is required` : !1,
			...r
		},
		render: ({ field: e, fieldState: t }) => /* @__PURE__ */ B(E.Item, {
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
function Z(e, t, n, r, s, c) {
	let l = qt(), u = l?.registerField, d = u != null, f = o(s);
	f.current = s;
	let p = a(() => u ? {
		key: e,
		source: e,
		label: t,
		width: c?.width,
		minWidth: c?.minWidth,
		render: ({ name: e, index: i }) => /* @__PURE__ */ B(an, {
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
		element: /* @__PURE__ */ B(rn, {
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
function on({ source: e, label: t, required: n, rules: r, placeholder: i, width: a, minWidth: o, inputStyle: s }) {
	let c = Z(e, t, n, r, ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ B(O, {
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
function sn({ source: e, label: t, required: n, rules: r, min: i, max: a, step: o, width: s, minWidth: c, inputStyle: l }) {
	let u = Z(e, t, n, r, ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ B(k, {
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
function cn({ source: e, label: t, required: n, rules: r }) {
	let i = Z(e, t, n, r, ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ B(te, {
		checked: !!e,
		onChange: t,
		disabled: n
	}));
	return i.mode === "inline" ? null : i.element;
}
//#endregion
//#region src/crud/fields/DateField.tsx
var ln = "YYYY-MM-DD";
function un({ source: e, label: t, required: n, rules: r, showTime: i }) {
	let a = Z(e, t, n, r, ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ B(S, {
		value: e ? _e(String(e)) : null,
		onChange: (e) => t(e ? e.format(i ? `${ln} HH:mm:ss` : ln) : null),
		onBlur: n,
		showTime: i,
		disabled: r,
		format: i ? `${ln} HH:mm:ss` : ln,
		style: { width: "100%" }
	}));
	return a.mode === "inline" ? null : a.element;
}
//#endregion
//#region src/crud/fields/SelectField.tsx
function dn({ source: e, label: t, required: n, rules: r, choices: i, mode: a, allowClear: o }) {
	return /* @__PURE__ */ B(rn, {
		source: e,
		label: t,
		required: n,
		rules: r,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ B(P, {
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
var Q = /* @__PURE__ */ new Map(), fn = /* @__PURE__ */ new Map();
function pn(e, t) {
	return typeof e == "function" ? `fn:${t ?? ""}` : Array.isArray(e) ? `static:${e.length}` : `res:${e.resource}:${JSON.stringify(e.filter ?? {})}:${t ?? ""}`;
}
function mn(e, t) {
	return typeof t == "function" ? t(e) : String(e[t] ?? "");
}
async function hn(e, t, n, r, i) {
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
		label: mn(e, n),
		value: e[r],
		record: e
	}));
}
function gn(e, t, n, r, i) {
	let a = pn(e, i), o = Q.get(a);
	if (o && !i) return Promise.resolve(o);
	let s = fn.get(a);
	if (s) return s;
	let c = hn(e, t, n, r, i).then((e) => (i || Q.set(a, e), e)).finally(() => {
		fn.delete(a);
	});
	return fn.set(a, c), c;
}
function $(e, t, r = "name", o = "id", c) {
	let l = J(), u = a(() => {
		if (e) return e;
		if (t) return {
			resource: t,
			filter: c ? { q: c } : void 0
		};
	}, [
		e,
		t,
		c
	]), d = u ? pn(u, c) : void 0, [f, p] = s(() => !d || c ? [] : Q.get(d) ?? []), [m, h] = s(() => !d || c ? !!u : !Q.has(d)), g = n(async () => {
		if (!u) {
			p([]), h(!1);
			return;
		}
		let e = pn(u, c), t = Q.get(e);
		if (t && !c) {
			p(t), h(!1);
			return;
		}
		h(!0);
		try {
			p(await gn(u, l, r, o, c));
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
function _n({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", required: c, rules: l, search: u, allowClear: d, disabled: f, width: p, minWidth: m, inputStyle: h, onValueChange: g }) {
	let [_, v] = s(), { options: y, loading: b, optionForValue: x } = $(r, n, i, o, u ? _ : void 0), S = a(() => y.map((e) => ({
		label: e.label,
		value: e.value
	})), [y]), C = Z(e, t, c, l, ({ value: e, onChange: t, disabled: n, name: r, index: i }) => /* @__PURE__ */ B(P, {
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
function vn({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", required: c, rules: l, search: u, allowClear: d = !0 }) {
	let [f, p] = s(), { options: m, loading: h } = $(r, n, i, o, u ? f : void 0), g = a(() => m.map((e) => ({
		label: e.label,
		value: e.value
	})), [m]), _ = Z(e, t, c, l, ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ B(P, {
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
//#region src/crud/utils/getByPath.ts
function yn(e, t) {
	let n = t.split("."), r = e;
	for (let e of n) {
		if (typeof r != "object" || !r) return;
		r = r[e];
	}
	return r;
}
//#endregion
//#region src/crud/columns/TextColumn.tsx
function bn({ source: e, label: t, sortable: n = !0 }) {
	return Y(a(() => ({
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
function xn(e, t, n) {
	return typeof n == "function" ? n(e) : n ? yn(e, n) : e[t];
}
//#endregion
//#region src/crud/columns/NumberColumn.tsx
function Sn({ source: e, label: t, sortable: n = !0 }) {
	return Y(a(() => ({
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
function Cn({ source: e, label: t, sortable: n = !0 }) {
	return Y(a(() => ({
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
function wn({ source: e, label: t, sortable: n = !0 }) {
	return Y(a(() => ({
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
function Tn({ record: e, source: t, display: n, reference: r, choices: i, optionLabel: a, optionValue: o }) {
	let { labelForValue: s } = $(i, r, a, o), c = e[t];
	if (typeof n == "function") return /* @__PURE__ */ B(z, { children: n(e) });
	if (n && n !== t) {
		let r = xn(e, t, n);
		return /* @__PURE__ */ B(z, { children: r == null ? "—" : String(r) });
	}
	return /* @__PURE__ */ B(z, { children: s(c) });
}
function En({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", display: s, sortable: c = !0 }) {
	return Y(a(() => ({
		key: e,
		source: e,
		label: t,
		sortable: c,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: c ? !0 : void 0,
			render: (a, c) => /* @__PURE__ */ B(Tn, {
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
function Dn({ record: e, source: t, reference: n, choices: r, optionLabel: i, optionValue: a }) {
	let { labelsForValues: o } = $(r, n, i, a), s = e[t];
	return /* @__PURE__ */ B(z, { children: o(Array.isArray(s) ? s : []) });
}
function On({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", sortable: s = !1 }) {
	return Y(a(() => ({
		key: e,
		source: e,
		label: t,
		sortable: s,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: s ? !0 : void 0,
			render: (t, a) => /* @__PURE__ */ B(Dn, {
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
function kn({ source: e, label: t, sortable: n = !1, render: r }) {
	return Y(a(() => ({
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
function An({ source: e, label: t, placeholder: n }) {
	return X(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: r, onChange: i }) => /* @__PURE__ */ B(O, {
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
function jn({ source: e, label: t }) {
	return X(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ B(k, {
			placeholder: t ?? e,
			value: n,
			onChange: (e) => r(e ?? void 0),
			style: { minWidth: 120 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/BooleanFilter.tsx
function Mn({ source: e, label: t }) {
	return X(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ B(P, {
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
function Nn({ source: e, label: t }) {
	return X(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ B(S, {
			allowClear: !0,
			placeholder: t ?? e,
			value: n ? _e(String(n)) : null,
			onChange: (e) => r(e ? e.format("YYYY-MM-DD") : void 0),
			style: { minWidth: 160 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/SelectFilter.tsx
function Pn({ source: e, label: t, choices: n, multiple: r }) {
	return X(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: i, onChange: a }) => /* @__PURE__ */ B(P, {
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
function Fn({ source: e, label: t, reference: n, choices: r, optionLabel: i, optionValue: a, multiple: o, search: c, value: l, onChange: u }) {
	let [d, f] = s(), { options: p, loading: m } = $(r, n, i, a, c ? d : void 0);
	return /* @__PURE__ */ B(P, {
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
function In({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", multiple: s, search: c }) {
	return X(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: a, onChange: l }) => /* @__PURE__ */ B(Fn, {
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
function Ln(e) {
	return /* @__PURE__ */ B(In, {
		...e,
		multiple: !0
	});
}
//#endregion
export { $e as AdminApp, He as AdminLayout, Ce as AppThemeProvider, mt as AuthAlternateLink, ht as AuthPageLayout, Ee as AuthProvider, Cn as BooleanColumn, cn as BooleanField, Mn as BooleanFilter, kn as CustomColumn, tt as DataProvider, wn as DateColumn, un as DateField, Nn as DateFilter, Ae as DensitySwitch, Ut as FilterBar, Ue as Guard, Ge as GuestOnly, Qt as InlineFormSet, gt as LoginPage, Sn as NumberColumn, sn as NumberField, jn as NumberFilter, rt as PermissionsProvider, _t as PlaceholderPage, We as Protected, En as ReferenceColumn, _n as ReferenceField, In as ReferenceFilter, On as ReferenceManyColumn, vn as ReferenceManyField, Ln as ReferenceManyFilter, nn as ResourceForm, At as ResourceFormModal, Vt as ResourceList, dn as SelectField, Pn as SelectFilter, bn as TextColumn, on as TextField, An as TextFilter, Me as ThemeSwitch, Ne as ThemeToolbar, ft as applyInMemoryListParams, ot as combineResourceHandlers, Qe as createAdminRouter, pt as createMemoryResourceHandlers, Oe as createSessionStorageAuthAdapter, Xe as deriveAuthPaths, ut as filterRows, yn as getByPath, Ke as getRouteAccess, st as getRowById, en as loadInlineRows, qe as partitionAdminRoutes, $t as saveInlineRows, q as useAuth, at as useCan, $ as useChoices, J as useDataProvider, Lt as useListQueryState, it as usePermissions, zt as useResourceListContext, we as useThemeMode };
