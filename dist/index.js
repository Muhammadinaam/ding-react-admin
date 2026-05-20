import { createContext as e, createElement as t, useCallback as n, useContext as r, useEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { Link as c, Navigate as l, Outlet as u, RouterProvider as d, createBrowserRouter as f, useLocation as p, useNavigate as m, useParams as h, useSearchParams as g } from "react-router-dom";
import { App as _, Avatar as v, Button as y, Card as b, ConfigProvider as x, DatePicker as S, Drawer as C, Dropdown as w, Flex as T, Form as E, Grid as D, Input as O, InputNumber as k, Layout as A, Menu as j, Modal as M, Popover as N, Segmented as ee, Select as P, Space as F, Spin as I, Switch as te, Table as ne, Typography as L, theme as R } from "antd";
import { Fragment as z, jsx as B, jsxs as V } from "react/jsx-runtime";
import { ArrowLeftOutlined as re, CaretDownOutlined as ie, CaretUpOutlined as ae, ColumnHeightOutlined as H, DesktopOutlined as U, LayoutOutlined as W, LogoutOutlined as oe, MenuOutlined as se, MoonOutlined as ce, SettingOutlined as le, SunOutlined as ue, UserOutlined as de } from "@ant-design/icons";
import { Controller as fe, FormProvider as pe, useFieldArray as me, useForm as he, useFormContext as ge, useWatch as _e } from "react-hook-form";
import ve from "dayjs";
//#region src/context/AppThemeProvider.tsx
var G = e(null);
function K(e) {
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
	let [r, o] = s(() => K(t)), [c, l] = s(() => be(n)), [u, d] = s(ye);
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
	return /* @__PURE__ */ B(G.Provider, {
		value: g,
		children: /* @__PURE__ */ B(x, {
			theme: h,
			children: e
		})
	});
}
function we() {
	let e = r(G);
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
	icon: /* @__PURE__ */ B(W, {})
}, {
	label: "Compact",
	value: "compact",
	icon: /* @__PURE__ */ B(H, {})
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
		icon: /* @__PURE__ */ B(ue, {})
	},
	{
		label: "Dark",
		value: "dark",
		icon: /* @__PURE__ */ B(ce, {})
	},
	{
		label: "Auto",
		value: "system",
		icon: /* @__PURE__ */ B(U, {})
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
			icon: /* @__PURE__ */ B(le, {}),
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
	}, []), re = a(() => [{
		key: "logout",
		icon: /* @__PURE__ */ B(oe, {}),
		label: "Log out",
		danger: !0
	}], []), ie = l ?? re, ae = (e) => {
		if (d) {
			d(e);
			return;
		}
		e.key === "logout" && N();
	}, H = x ? j.colorBgContainer : Pe, U = [_.pathname], W = (e) => {
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
					background: H,
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
					selectedKeys: U,
					inlineCollapsed: T,
					openKeys: te,
					onOpenChange: z,
					onNavigate: W
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
						background: H,
						borderBottom: `1px solid ${j.colorSplit}`
					},
					body: {
						padding: 0,
						background: H
					}
				},
				destroyOnClose: !0,
				children: /* @__PURE__ */ B(Ve, {
					menuItems: F,
					selectedKeys: U,
					inlineCollapsed: !1,
					openKeys: te,
					onOpenChange: z,
					onNavigate: W
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
						icon: /* @__PURE__ */ B(se, {}),
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
							items: ie,
							onClick: ae
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
								icon: /* @__PURE__ */ B(de, {})
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
//#region src/pages/LoginPage.tsx
function Ue({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, extraFields: r, showThemeToolbar: i = !0, afterLoginPath: a = "/" }) {
	let { login: o } = q(), s = m(), { token: c } = R.useToken();
	return /* @__PURE__ */ V(T, {
		vertical: !0,
		align: "stretch",
		style: {
			height: "100dvh",
			maxHeight: "100dvh",
			width: "100%",
			overflow: "hidden",
			background: c.colorBgLayout
		},
		children: [i && /* @__PURE__ */ B(T, {
			justify: "flex-end",
			style: {
				flexShrink: 0,
				width: "100%",
				padding: 16,
				background: c.colorBgLayout
			},
			children: /* @__PURE__ */ B(Ne, {})
		}), /* @__PURE__ */ B(T, {
			flex: 1,
			justify: "center",
			align: "center",
			style: {
				width: "100%",
				minHeight: 0,
				padding: 24,
				overflow: "auto",
				overflowX: "hidden",
				background: c.colorBgLayout
			},
			children: /* @__PURE__ */ V(b, {
				style: {
					width: "100%",
					maxWidth: 360
				},
				title: e,
				extra: n,
				children: [t ? /* @__PURE__ */ B(L.Paragraph, {
					type: "secondary",
					style: { marginTop: 0 },
					children: t
				}) : null, /* @__PURE__ */ V(E, {
					layout: "vertical",
					onFinish: async (e) => {
						await o(e.username, e.password), s(a, { replace: !0 });
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
						r,
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
		})]
	});
}
//#endregion
//#region src/router/guards.tsx
function We({ when: e, redirect: t, children: n }) {
	return e ? n : /* @__PURE__ */ B(l, {
		to: t,
		replace: !0
	});
}
function Ge({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = q();
	return /* @__PURE__ */ B(We, {
		when: n,
		redirect: t,
		children: e
	});
}
function Ke({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = q();
	return /* @__PURE__ */ B(We, {
		when: !n,
		redirect: t,
		children: e
	});
}
//#endregion
//#region src/router/createAdminRouter.tsx
function qe({ navItems: e, children: t, layoutProps: n, loginPath: r = "/login", homePath: i = "/", loginElement: a }) {
	return f([
		{
			path: r,
			element: /* @__PURE__ */ B(Ke, {
				redirectTo: i,
				children: a ?? /* @__PURE__ */ B(Ue, { afterLoginPath: i })
			})
		},
		{
			path: "/",
			element: /* @__PURE__ */ B(Ge, {
				redirectTo: r,
				children: /* @__PURE__ */ B(He, {
					navItems: e,
					loginPath: r,
					...n
				})
			}),
			children: t
		},
		{
			path: "*",
			element: /* @__PURE__ */ B(l, {
				to: i,
				replace: !0
			})
		}
	]);
}
//#endregion
//#region src/app/AdminApp.tsx
function Je({ navItems: e, routes: t, authAdapter: n, layoutProps: r, loginPath: i, homePath: o, loginElement: s, theme: c }) {
	let l = a(() => qe({
		navItems: e,
		children: t,
		layoutProps: r,
		loginPath: i,
		homePath: o,
		loginElement: s
	}), [
		e,
		t,
		r,
		i,
		o,
		s
	]);
	return /* @__PURE__ */ B(Ce, {
		...c,
		children: /* @__PURE__ */ B(Ee, {
			adapter: n,
			children: /* @__PURE__ */ B(d, { router: l })
		})
	});
}
//#endregion
//#region src/context/DataProvider.tsx
var Ye = e(null);
function Xe({ children: e, value: t }) {
	let n = a(() => t, [t]);
	return /* @__PURE__ */ B(Ye.Provider, {
		value: n,
		children: e
	});
}
function J() {
	let e = r(Ye);
	if (!e) throw Error("useDataProvider must be used within DataProvider");
	return e;
}
//#endregion
//#region src/context/PermissionsProvider.tsx
var Ze = e(null);
function Qe({ children: e, can: t }) {
	let n = a(() => t, [t]);
	return /* @__PURE__ */ B(Ze.Provider, {
		value: n,
		children: e
	});
}
function $e() {
	let e = r(Ze);
	if (!e) throw Error("usePermissions must be used within PermissionsProvider");
	return e;
}
function et(e, t) {
	let r = $e();
	return n(() => r(e, t), [
		r,
		e,
		t
	]);
}
//#endregion
//#region src/data/resourceHandlers.ts
function tt(e, t) {
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
function nt(e, t) {
	let n = typeof t == "string" ? Number(t) : t, r = e.find((e) => e.id === n);
	if (!r) throw Error("Not found");
	return r;
}
function rt(e, t) {
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
function it(e, t) {
	return t == null || t === "" ? !0 : Array.isArray(t) ? t.length === 0 ? !0 : Array.isArray(e) ? t.some((t) => e.includes(t)) : t.includes(e) : Array.isArray(e) ? e.includes(t) : typeof t == "string" && typeof e == "string" ? e.toLowerCase().includes(t.toLowerCase()) : e === t;
}
function at(e, t) {
	return t ? e.filter((e) => Object.entries(t).every(([t, n]) => it(e[t], n))) : e;
}
function ot(e, t, n) {
	let r = (t - 1) * n;
	return {
		data: e.slice(r, r + n),
		total: e.length
	};
}
function st(e, t) {
	let { pagination: n, sort: r, filter: i } = t, a = at(e, i);
	if (r) {
		let e = Array.isArray(r) ? r : [r];
		e.length > 0 && e[0]?.field && (a = rt(a, e));
	}
	return n ? ot(a, n.page, n.perPage) : {
		data: a,
		total: a.length
	};
}
//#endregion
//#region src/data/createMemoryResourceHandlers.ts
function ct(e) {
	let t = (e) => e;
	return {
		async getList(n) {
			return st(t(e.scopeList ? e.scopeList(e.getRows(), n) : e.getRows()), n);
		},
		async getOne(t) {
			return { data: nt(e.getRows(), t) };
		},
		async create(t) {
			let n = e.mapCreate(t, e.nextId());
			return e.getRows().push(n), { data: n };
		},
		async update({ id: t, data: n }) {
			let r = nt(e.getRows(), t), i = n, a = e.applyUpdate ? e.applyUpdate(r, i) : {
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
//#region src/pages/PlaceholderPage.tsx
function lt({ title: e }) {
	return /* @__PURE__ */ B(L.Title, {
		level: 4,
		children: e
	});
}
//#endregion
//#region src/crud/utils/sortQueryParam.ts
function ut(e) {
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
function dt(e) {
	return e.length === 0 ? null : e.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function ft(e) {
	return new Map(e.map((e, t) => [e.field, t + 1]));
}
//#endregion
//#region src/crud/context/ListContext.tsx
var pt = e(null);
function mt({ children: e, toggleSort: t, sort: r }) {
	let [i, o] = s([]), c = a(() => new Set(r.map((e) => e.field)), [r]), l = a(() => new Map(r.map((e) => [e.field, e.order])), [r]), u = a(() => ft(r), [r]), d = n((e) => (o((t) => {
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
	return /* @__PURE__ */ B(pt.Provider, {
		value: f,
		children: e
	});
}
function ht() {
	let e = r(pt);
	if (!e) throw Error("Column components must be used within ResourceList");
	return e;
}
function Y(e) {
	let { registerColumn: t } = ht();
	i(() => t(e), [t, e]);
}
//#endregion
//#region src/crud/context/FilterContext.tsx
var gt = e(null);
function _t({ children: e, values: t, setFilterValue: r }) {
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
	return /* @__PURE__ */ B(gt.Provider, {
		value: l,
		children: e
	});
}
function vt() {
	return r(gt);
}
function X(e) {
	let t = vt()?.registerFilter;
	i(() => {
		if (t) return t(e);
	}, [t, e]);
}
//#endregion
//#region src/crud/context/FormContext.tsx
var yt = e(null);
function bt({ children: e, resource: t, isNew: n, disabled: r }) {
	return /* @__PURE__ */ B(yt.Provider, {
		value: {
			resource: t,
			isNew: n,
			disabled: r
		},
		children: e
	});
}
function xt() {
	return r(yt);
}
//#endregion
//#region src/crud/ResourceFormModal.tsx
function St({ resource: e, editId: t, onClose: r, children: a, title: o }) {
	let c = t === "new" || t == null, l = t != null, u = J(), { message: d } = _.useApp(), [f, p] = s(!c), m = he(), h = n(async () => {
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
		children: f ? /* @__PURE__ */ B(I, {}) : /* @__PURE__ */ B(bt, {
			resource: e,
			isNew: c,
			children: /* @__PURE__ */ B(pe, {
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
function Ct({ selectedCount: e, total: t, allPageSelected: r, allMatchingSelected: i, onSelectAllMatching: o, onClearSelection: c, actions: l, onExecute: u, selectedIds: d, running: f = !1 }) {
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
var wt = new Set([
	"page",
	"perPage",
	"sort",
	"create",
	"edit"
]), Tt = 1, Et = 10;
function Dt(e) {
	if (e.includes(",")) {
		let t = e.split(",").map((e) => e.trim()), n = t.map(Number);
		return n.every((e) => Number.isFinite(e)) ? n : t;
	}
	let t = Number(e);
	return e !== "" && Number.isFinite(t) && String(t) === e ? t : e === "true" ? !0 : e === "false" ? !1 : e;
}
function Ot(e) {
	return e == null || e === "" ? null : Array.isArray(e) ? e.length === 0 ? null : e.map(String).join(",") : String(e);
}
function kt(e) {
	let [t, r] = g(), i = a(() => {
		let n = t.get("page"), r = t.get("perPage"), i = n ? Math.max(1, Number(n) || Tt) : Tt, a = r ? Math.max(1, Number(r) || Et) : Et, o = t.getAll("sort"), s = o.length > 0 ? o.flatMap((e) => ut(e)) : ut(t.get("sort")), c = { ...e };
		return t.forEach((e, n) => {
			if (wt.has(n)) return;
			let r = c[n];
			r === void 0 ? t.getAll(n).length > 1 ? c[n] = t.getAll(n).map(Dt) : c[n] = Dt(e) : c[n] = [...Array.isArray(r) ? r : [r], Dt(e)];
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
				e === Et ? t.delete("perPage") : t.set("perPage", String(e)), t.delete("page");
			});
		},
		setSort: (e) => {
			o((t) => {
				t.delete("sort");
				let n = dt(e);
				n && t.set("sort", n);
			});
		},
		toggleSort: (e) => {
			o((t) => {
				let n = t.getAll("sort").flatMap((e) => ut(e)), r = n.findIndex((t) => t.field === e), i;
				i = r < 0 ? [...n, {
					field: e,
					order: "ASC"
				}] : n[r].order === "ASC" ? n.map((e, t) => t === r ? {
					...e,
					order: "DESC"
				} : e) : n.filter((e, t) => t !== r), t.delete("sort");
				let a = dt(i);
				a && t.set("sort", a);
			});
		},
		setFilter: (e, t) => {
			o((n) => {
				n.delete(e);
				let r = Ot(t);
				r != null && n.set(e, r), n.delete("page");
			});
		},
		setFilters: (e) => {
			o((t) => {
				for (let e of [...t.keys()]) wt.has(e) || t.delete(e);
				for (let [n, r] of Object.entries(e)) {
					let e = Ot(r);
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
var At = e(null);
function jt() {
	return r(At);
}
function Mt({ resource: e, title: t, pathPrefix: r, newPath: o, editMode: l = "page", formChildren: u, actions: d, rowActions: f, headerExtra: p, bulkActions: m, bulkDelete: h = !0, bulkActionsEnabled: g = !0, queryState: v, queryActions: x }) {
	let S = J(), C = $e(), { message: w, modal: T } = _.useApp(), { columns: E, sortOrders: D, sortPriorities: O } = ht(), [k, A] = s(!1), [j, M] = s([]), [N, ee] = s(0), [P, I] = s(() => /* @__PURE__ */ new Set()), [te, R] = s(!1), re = o ?? `${r}/new`, H = C("write", e), U = C("delete", e), W = H && (l === "page" || l === "both") && d?.edit !== !1, oe = H && (l === "modal" || l === "both") && d?.quickEdit !== !1, se = U && d?.delete !== !1, ce = W || oe || se || f, le = n(() => {
		I(/* @__PURE__ */ new Set());
	}, []), ue = a(() => {
		if (!g) return [];
		let t = [];
		return h && U && t.push({
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
		U,
		m,
		S,
		e,
		w
	]), de = ue.length > 0, fe = P.size, pe = j.length > 0 && j.every((e) => P.has(e.id)), me = N > 0 && fe >= N, he = a(() => j.filter((e) => P.has(e.id)).map((e) => e.id), [j, P]), ge = n((e) => {
		I((t) => {
			let n = new Set(t), r = j.map((e) => e.id);
			for (let t of r) e.includes(t) || n.delete(t);
			for (let t of e) n.add(t);
			return n;
		});
	}, [j]), _e = n(async () => {
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
	]), ve = n((e) => {
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
	}, [x, v.sort.length]), G = n(async () => {
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
		G();
	}, [G]);
	let K = a(() => ({
		reload: () => void G(),
		clearSelection: le
	}), [G, le]), ye = n(async (e, t) => {
		if (e.confirm) {
			let n = typeof e.confirm == "function" ? await e.confirm(t, K) : e.confirm;
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
			await e.execute(t, K);
		} catch (e) {
			w.error(e instanceof Error ? e.message : "Action failed");
		} finally {
			R(!1);
		}
	}, [
		K,
		T,
		w
	]), be = n(async (t) => {
		if (C("delete", e)) try {
			await S.delete(e, t.id), w.success("Deleted"), G();
		} catch (e) {
			w.error(e instanceof Error ? e.message : "Delete failed");
		}
	}, [
		C,
		S,
		e,
		G,
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
					}), B(i === "ascend" ? ae : ie, { style: { fontSize: 11 } })]
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
			reload: () => void G(),
			openEditModal: x.openEditModal
		}, n = {
			title: "Actions",
			key: "__actions",
			width: l === "both" ? 200 : 160,
			render: (e, n) => /* @__PURE__ */ V(F, {
				size: "small",
				wrap: !0,
				children: [
					W ? /* @__PURE__ */ B(c, {
						to: `${r}/${String(n.id)}`,
						children: "Edit"
					}) : null,
					oe ? /* @__PURE__ */ B(y, {
						type: "link",
						size: "small",
						style: { padding: 0 },
						onClick: () => x.openEditModal(n.id),
						children: l === "both" ? "Quick edit" : "Edit"
					}) : null,
					se ? /* @__PURE__ */ B(y, {
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
		ce,
		W,
		oe,
		se,
		l,
		r,
		be,
		D,
		O,
		x,
		f,
		G
	]), Se = u && (v.createModal || v.editId != null) && (l === "modal" || l === "both");
	return /* @__PURE__ */ V(z, { children: [/* @__PURE__ */ V(b, {
		title: /* @__PURE__ */ B(L.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		}),
		extra: p || H ? /* @__PURE__ */ V(F, { children: [p, H ? l === "modal" || l === "both" ? /* @__PURE__ */ V(z, { children: [l === "both" ? /* @__PURE__ */ B(c, {
			to: re,
			children: /* @__PURE__ */ B(y, { children: "New page" })
		}) : null, /* @__PURE__ */ B(y, {
			type: "primary",
			onClick: () => x.openCreateModal(),
			children: "New"
		})] }) : /* @__PURE__ */ B(c, {
			to: re,
			children: /* @__PURE__ */ B(y, {
				type: "primary",
				children: "New"
			})
		}) : null] }) : null,
		children: [de ? /* @__PURE__ */ B(Ct, {
			selectedCount: fe,
			total: N,
			allPageSelected: pe,
			allMatchingSelected: me,
			onSelectAllMatching: () => void _e(),
			onClearSelection: le,
			actions: ue,
			onExecute: ye,
			selectedIds: [...P],
			running: te || k
		}) : null, /* @__PURE__ */ B(ne, {
			rowKey: "id",
			loading: k,
			columns: xe,
			dataSource: j,
			rowSelection: de ? {
				selectedRowKeys: he,
				onChange: ge,
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
				ve(n);
			}
		})]
	}), Se ? /* @__PURE__ */ B(St, {
		resource: e,
		editId: v.createModal ? "new" : v.editId,
		onClose: () => {
			x.closeModal(), G();
		},
		children: u
	}) : null] });
}
function Nt({ resource: e, title: t, pathPrefix: r, newPath: i, staticFilter: o, editMode: s = "page", syncQueryParams: c = !0, children: l, formChildren: u, actions: d, rowActions: f, headerExtra: p, bulkActions: m, bulkDelete: h, bulkActionsEnabled: g }) {
	let [_, v] = kt(o), y = a(() => {
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
	return /* @__PURE__ */ B(At.Provider, {
		value: x,
		children: /* @__PURE__ */ B(_t, {
			values: y,
			setFilterValue: b,
			children: /* @__PURE__ */ V(mt, {
				toggleSort: v.toggleSort,
				sort: _.sort,
				children: [l, /* @__PURE__ */ B(Mt, {
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
function Pt() {
	let e = vt();
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
function Ft({ children: e }) {
	return /* @__PURE__ */ V(z, { children: [e, /* @__PURE__ */ B(Pt, {})] });
}
//#endregion
//#region src/crud/context/InlineFormContext.tsx
var It = e(null), Lt = e([]);
function Rt({ children: e, arrayName: t, layout: r = "tabular" }) {
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
	return /* @__PURE__ */ B(It.Provider, {
		value: l,
		children: /* @__PURE__ */ B(Lt.Provider, {
			value: i,
			children: e
		})
	});
}
function zt() {
	let e = r(It), t = r(Lt);
	return e ? {
		...e,
		fields: t
	} : null;
}
//#endregion
//#region src/crud/utils/inlineArrayName.ts
function Bt(e, t) {
	return t ?? `__inline_${e.replace(/[^a-z0-9]/gi, "_")}`;
}
//#endregion
//#region src/crud/InlineFormSet.tsx
function Vt(e) {
	let t = zt(), { control: n } = ge(), r = _e({
		control: n,
		name: e
	}), { fields: a, append: o, remove: s, replace: c } = me({
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
function Ht({ arrayName: e, label: t }) {
	let { ctx: n, fields: r, remove: i, appendEmpty: o } = Vt(e), s = a(() => n ? n.fields.map((t) => ({
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
function Ut({ arrayName: e, label: t }) {
	let { ctx: n, fields: r, remove: i, appendEmpty: a } = Vt(e);
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
function Wt({ resource: e, label: t, children: n, name: r, layout: i = "tabular" }) {
	let a = Bt(e, r);
	return /* @__PURE__ */ V(Rt, {
		arrayName: a,
		layout: i,
		children: [n, B(i === "stacked" ? Ut : Ht, {
			arrayName: a,
			label: t
		})]
	});
}
async function Gt(e, t) {
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
async function Kt(e, t, n, r) {
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
function qt(e) {
	return Bt(e.resource, e.name);
}
function Jt({ resource: e, title: r, listPath: a, children: o, defaultValues: l, onSaved: u, stayOnPage: d, inlines: f }) {
	let { id: p } = h(), g = p === "new" || !p, v = J(), x = m(), { message: S } = _.useApp(), { token: C } = R.useToken(), [w, T] = s(!g), [D, O] = s(0), [k, A] = s({}), j = he({ defaultValues: l }), M = n(async () => {
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
					let r = qt(t), { rows: i, ids: a } = await Kt(v, t.resource, t.foreignKey, p);
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
				let r = qt(n), { rows: i, ids: a } = await Kt(v, n.resource, n.foreignKey, e);
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
			if (f?.length) for (let e of f) delete n[qt(e)];
			let r;
			if (g) r = (await v.create(e, n)).data, S.success("Created");
			else if (p) r = (await v.update(e, {
				id: p,
				data: n
			})).data, S.success("Updated");
			else return;
			let i = r.id;
			if (f?.length && i != null) for (let e of f) {
				let t = qt(e), n = j.getValues(t) ?? [];
				await Gt(v, {
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
			children: [/* @__PURE__ */ B(re, {}), " Back"]
		}), /* @__PURE__ */ B(L.Title, {
			level: 5,
			style: { margin: 0 },
			children: r
		})] }),
		children: /* @__PURE__ */ B(bt, {
			resource: e,
			isNew: g,
			children: /* @__PURE__ */ V("div", {
				style: {
					position: "relative",
					maxWidth: 720
				},
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
				}) : null, /* @__PURE__ */ t(pe, {
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
function Yt({ source: e, label: t, required: n, rules: r, children: i }) {
	let { control: a } = ge(), o = xt(), s = t ?? e;
	return /* @__PURE__ */ B(fe, {
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
function Xt({ name: e, label: t, required: n, rules: r, hideLabel: i, children: a }) {
	let { control: o } = ge(), s = i ? void 0 : t;
	return /* @__PURE__ */ B(fe, {
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
	let l = zt(), u = l?.registerField, d = u != null, f = o(s);
	f.current = s;
	let p = a(() => u ? {
		key: e,
		source: e,
		label: t,
		width: c?.width,
		minWidth: c?.minWidth,
		render: ({ name: e, index: i }) => /* @__PURE__ */ B(Xt, {
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
		element: /* @__PURE__ */ B(Yt, {
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
function Zt({ source: e, label: t, required: n, rules: r, placeholder: i, width: a, minWidth: o, inputStyle: s }) {
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
function Qt({ source: e, label: t, required: n, rules: r, min: i, max: a, step: o, width: s, minWidth: c, inputStyle: l }) {
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
function $t({ source: e, label: t, required: n, rules: r }) {
	let i = Z(e, t, n, r, ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ B(te, {
		checked: !!e,
		onChange: t,
		disabled: n
	}));
	return i.mode === "inline" ? null : i.element;
}
//#endregion
//#region src/crud/fields/DateField.tsx
var en = "YYYY-MM-DD";
function tn({ source: e, label: t, required: n, rules: r, showTime: i }) {
	let a = Z(e, t, n, r, ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ B(S, {
		value: e ? ve(String(e)) : null,
		onChange: (e) => t(e ? e.format(i ? `${en} HH:mm:ss` : en) : null),
		onBlur: n,
		showTime: i,
		disabled: r,
		format: i ? `${en} HH:mm:ss` : en,
		style: { width: "100%" }
	}));
	return a.mode === "inline" ? null : a.element;
}
//#endregion
//#region src/crud/fields/SelectField.tsx
function nn({ source: e, label: t, required: n, rules: r, choices: i, mode: a, allowClear: o }) {
	return /* @__PURE__ */ B(Yt, {
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
var Q = /* @__PURE__ */ new Map(), rn = /* @__PURE__ */ new Map();
function an(e, t) {
	return typeof e == "function" ? `fn:${t ?? ""}` : Array.isArray(e) ? `static:${e.length}` : `res:${e.resource}:${JSON.stringify(e.filter ?? {})}:${t ?? ""}`;
}
function on(e, t) {
	return typeof t == "function" ? t(e) : String(e[t] ?? "");
}
async function sn(e, t, n, r, i) {
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
		label: on(e, n),
		value: e[r],
		record: e
	}));
}
function cn(e, t, n, r, i) {
	let a = an(e, i), o = Q.get(a);
	if (o && !i) return Promise.resolve(o);
	let s = rn.get(a);
	if (s) return s;
	let c = sn(e, t, n, r, i).then((e) => (i || Q.set(a, e), e)).finally(() => {
		rn.delete(a);
	});
	return rn.set(a, c), c;
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
	]), d = u ? an(u, c) : void 0, [f, p] = s(() => !d || c ? [] : Q.get(d) ?? []), [m, h] = s(() => !d || c ? !!u : !Q.has(d)), g = n(async () => {
		if (!u) {
			p([]), h(!1);
			return;
		}
		let e = an(u, c), t = Q.get(e);
		if (t && !c) {
			p(t), h(!1);
			return;
		}
		h(!0);
		try {
			p(await cn(u, l, r, o, c));
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
function ln({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", required: c, rules: l, search: u, allowClear: d, disabled: f, width: p, minWidth: m, inputStyle: h, onValueChange: g }) {
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
function un({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", required: c, rules: l, search: u, allowClear: d = !0 }) {
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
function dn(e, t) {
	let n = t.split("."), r = e;
	for (let e of n) {
		if (typeof r != "object" || !r) return;
		r = r[e];
	}
	return r;
}
//#endregion
//#region src/crud/columns/TextColumn.tsx
function fn({ source: e, label: t, sortable: n = !0 }) {
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
function pn(e, t, n) {
	return typeof n == "function" ? n(e) : n ? dn(e, n) : e[t];
}
//#endregion
//#region src/crud/columns/NumberColumn.tsx
function mn({ source: e, label: t, sortable: n = !0 }) {
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
function hn({ source: e, label: t, sortable: n = !0 }) {
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
function gn({ source: e, label: t, sortable: n = !0 }) {
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
function _n({ record: e, source: t, display: n, reference: r, choices: i, optionLabel: a, optionValue: o }) {
	let { labelForValue: s } = $(i, r, a, o), c = e[t];
	if (typeof n == "function") return /* @__PURE__ */ B(z, { children: n(e) });
	if (n && n !== t) {
		let r = pn(e, t, n);
		return /* @__PURE__ */ B(z, { children: r == null ? "—" : String(r) });
	}
	return /* @__PURE__ */ B(z, { children: s(c) });
}
function vn({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", display: s, sortable: c = !0 }) {
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
			render: (a, c) => /* @__PURE__ */ B(_n, {
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
function yn({ record: e, source: t, reference: n, choices: r, optionLabel: i, optionValue: a }) {
	let { labelsForValues: o } = $(r, n, i, a), s = e[t];
	return /* @__PURE__ */ B(z, { children: o(Array.isArray(s) ? s : []) });
}
function bn({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", sortable: s = !1 }) {
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
			render: (t, a) => /* @__PURE__ */ B(yn, {
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
function xn({ source: e, label: t, sortable: n = !1, render: r }) {
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
function Sn({ source: e, label: t, placeholder: n }) {
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
function Cn({ source: e, label: t }) {
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
function wn({ source: e, label: t }) {
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
function Tn({ source: e, label: t }) {
	return X(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ B(S, {
			allowClear: !0,
			placeholder: t ?? e,
			value: n ? ve(String(n)) : null,
			onChange: (e) => r(e ? e.format("YYYY-MM-DD") : void 0),
			style: { minWidth: 160 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/SelectFilter.tsx
function En({ source: e, label: t, choices: n, multiple: r }) {
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
function Dn({ source: e, label: t, reference: n, choices: r, optionLabel: i, optionValue: a, multiple: o, search: c, value: l, onChange: u }) {
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
function On({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", multiple: s, search: c }) {
	return X(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: a, onChange: l }) => /* @__PURE__ */ B(Dn, {
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
function kn(e) {
	return /* @__PURE__ */ B(On, {
		...e,
		multiple: !0
	});
}
//#endregion
export { Je as AdminApp, He as AdminLayout, Ce as AppThemeProvider, Ee as AuthProvider, hn as BooleanColumn, $t as BooleanField, wn as BooleanFilter, xn as CustomColumn, Xe as DataProvider, gn as DateColumn, tn as DateField, Tn as DateFilter, Ae as DensitySwitch, Ft as FilterBar, We as Guard, Ke as GuestOnly, Wt as InlineFormSet, Ue as LoginPage, mn as NumberColumn, Qt as NumberField, Cn as NumberFilter, Qe as PermissionsProvider, lt as PlaceholderPage, Ge as Protected, vn as ReferenceColumn, ln as ReferenceField, On as ReferenceFilter, bn as ReferenceManyColumn, un as ReferenceManyField, kn as ReferenceManyFilter, Jt as ResourceForm, St as ResourceFormModal, Nt as ResourceList, nn as SelectField, En as SelectFilter, fn as TextColumn, Zt as TextField, Sn as TextFilter, Me as ThemeSwitch, Ne as ThemeToolbar, st as applyInMemoryListParams, tt as combineResourceHandlers, qe as createAdminRouter, ct as createMemoryResourceHandlers, Oe as createSessionStorageAuthAdapter, at as filterRows, dn as getByPath, nt as getRowById, Kt as loadInlineRows, Gt as saveInlineRows, q as useAuth, et as useCan, $ as useChoices, J as useDataProvider, kt as useListQueryState, $e as usePermissions, jt as useResourceListContext, we as useThemeMode };
