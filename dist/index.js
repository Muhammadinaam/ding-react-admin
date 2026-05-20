import { createContext as e, createElement as t, useCallback as n, useContext as r, useEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { Link as c, Navigate as l, Outlet as u, RouterProvider as d, createBrowserRouter as f, useLocation as p, useNavigate as m, useParams as h, useSearchParams as g } from "react-router-dom";
import { App as _, Avatar as v, Button as y, Card as b, ConfigProvider as x, DatePicker as S, Drawer as C, Dropdown as w, Flex as T, Form as E, Grid as D, Input as O, InputNumber as k, Layout as A, Menu as j, Modal as M, Popover as N, Segmented as P, Select as F, Space as I, Spin as L, Switch as R, Table as ee, Typography as z, theme as B } from "antd";
import { Fragment as V, jsx as H, jsxs as U } from "react/jsx-runtime";
import { ArrowLeftOutlined as W, CaretDownOutlined as te, CaretUpOutlined as ne, ColumnHeightOutlined as G, DesktopOutlined as K, LayoutOutlined as re, LogoutOutlined as ie, MenuOutlined as ae, MoonOutlined as oe, SettingOutlined as se, SunOutlined as ce, UserOutlined as le } from "@ant-design/icons";
import { Controller as ue, FormProvider as de, useFieldArray as fe, useForm as pe, useFormContext as me, useWatch as he } from "react-hook-form";
import ge from "dayjs";
//#region src/context/AppThemeProvider.tsx
var _e = e(null);
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
		let e = m === "dark" ? B.darkAlgorithm : B.defaultAlgorithm;
		return { algorithm: c === "compact" ? [e, B.compactAlgorithm] : e };
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
	return /* @__PURE__ */ H(_e.Provider, {
		value: g,
		children: /* @__PURE__ */ H(x, {
			theme: h,
			children: e
		})
	});
}
function we() {
	let e = r(_e);
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
	return /* @__PURE__ */ H(Te.Provider, {
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
	icon: /* @__PURE__ */ H(re, {})
}, {
	label: "Compact",
	value: "compact",
	icon: /* @__PURE__ */ H(G, {})
}];
function Ae() {
	let { density: e, setDensity: t } = we();
	return /* @__PURE__ */ H(P, {
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
		icon: /* @__PURE__ */ H(ce, {})
	},
	{
		label: "Dark",
		value: "dark",
		icon: /* @__PURE__ */ H(oe, {})
	},
	{
		label: "Auto",
		value: "system",
		icon: /* @__PURE__ */ H(K, {})
	}
];
function Me() {
	let { mode: e, setMode: t } = we();
	return /* @__PURE__ */ H(P, {
		size: "small",
		value: e,
		options: je,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeToolbar.tsx
function Ne() {
	let { token: e } = B.useToken();
	return /* @__PURE__ */ H(N, {
		placement: D.useBreakpoint().lg ? "bottomRight" : "bottom",
		trigger: "click",
		content: /* @__PURE__ */ U(I, {
			direction: "vertical",
			size: "middle",
			style: {
				minWidth: 240,
				maxWidth: "min(92vw, 320px)"
			},
			children: [/* @__PURE__ */ H(Me, {}), /* @__PURE__ */ H(Ae, {})]
		}),
		styles: { body: { padding: e.paddingSM } },
		children: /* @__PURE__ */ H(y, {
			type: "default",
			icon: /* @__PURE__ */ H(se, {}),
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
		let t = e.Icon, n = t ? /* @__PURE__ */ H(t, {}) : void 0;
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
	return /* @__PURE__ */ H(j, {
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
	let g = m(), _ = p(), { resolved: b } = we(), x = b === "dark", { logout: S } = q(), [T, E] = s(() => Ie(h)), [D, O] = s(!1), k = Le(), { token: j } = B.useToken(), M = o ?? t, N = () => {
		S(), g(f, { replace: !0 });
	}, P = n((e) => {
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
	let F = a(() => Re(e), [e]), I = a(() => Be(e), [e]), L = a(() => ze(e, _.pathname), [e, _.pathname]), [R, ee] = s(() => ze(e, _.pathname));
	i(() => {
		ee((e) => [...new Set([...e, ...L])]);
	}, [L]);
	let V = n((e) => {
		ee(e);
	}, []), W = a(() => [{
		key: "logout",
		icon: /* @__PURE__ */ H(ie, {}),
		label: "Log out",
		danger: !0
	}], []), te = l ?? W, ne = (e) => {
		if (d) {
			d(e);
			return;
		}
		e.key === "logout" && N();
	}, G = x ? j.colorBgContainer : Pe, K = [_.pathname], re = (e) => {
		F.has(e) && (g(e), k && O(!1));
	};
	return /* @__PURE__ */ U(A, {
		style: {
			minHeight: "100vh",
			width: "100%",
			background: j.colorBgLayout
		},
		children: [
			!k && /* @__PURE__ */ U(A.Sider, {
				collapsible: !0,
				collapsed: T,
				onCollapse: P,
				collapsedWidth: 64,
				style: {
					background: G,
					borderInlineEnd: x ? `1px solid ${j.colorSplit}` : void 0
				},
				children: [/* @__PURE__ */ H("div", {
					style: {
						height: 64,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontWeight: 600
					},
					children: /* @__PURE__ */ H(z.Text, {
						strong: !0,
						style: { color: j.colorTextLightSolid },
						children: T ? r : t
					})
				}), /* @__PURE__ */ H(Ve, {
					menuItems: I,
					selectedKeys: K,
					inlineCollapsed: T,
					openKeys: R,
					onOpenChange: V,
					onNavigate: re
				})]
			}),
			k && /* @__PURE__ */ H(C, {
				title: /* @__PURE__ */ H(z.Text, {
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
						background: G,
						borderBottom: `1px solid ${j.colorSplit}`
					},
					body: {
						padding: 0,
						background: G
					}
				},
				destroyOnClose: !0,
				children: /* @__PURE__ */ H(Ve, {
					menuItems: I,
					selectedKeys: K,
					inlineCollapsed: !1,
					openKeys: R,
					onOpenChange: V,
					onNavigate: re
				})
			}),
			/* @__PURE__ */ U(A, { children: [/* @__PURE__ */ U(A.Header, {
				style: {
					background: j.colorBgContainer,
					paddingInline: j.paddingLG,
					display: "flex",
					alignItems: "center",
					gap: j.marginSM,
					lineHeight: "normal"
				},
				children: [
					k && /* @__PURE__ */ H(y, {
						type: "text",
						icon: /* @__PURE__ */ H(ae, {}),
						onClick: () => O(!0),
						"aria-label": "Open navigation"
					}),
					/* @__PURE__ */ H("div", { style: {
						flex: 1,
						minWidth: 0
					} }),
					c,
					/* @__PURE__ */ H(Ne, {}),
					/* @__PURE__ */ H(w, {
						menu: {
							items: te,
							onClick: ne
						},
						trigger: ["click"],
						children: /* @__PURE__ */ U(y, {
							type: "text",
							style: {
								display: "inline-flex",
								alignItems: "center",
								gap: j.marginXS,
								maxWidth: k ? 44 : void 0,
								paddingInline: k ? j.paddingXS : void 0
							},
							"aria-label": "Account menu",
							children: [/* @__PURE__ */ H(v, {
								size: "small",
								icon: /* @__PURE__ */ H(le, {})
							}), !k && /* @__PURE__ */ H(z.Text, {
								type: "secondary",
								children: "User"
							})]
						})
					})
				]
			}), /* @__PURE__ */ H(A.Content, {
				style: { margin: k ? j.marginSM : j.marginLG },
				children: /* @__PURE__ */ H(u, {})
			})] })
		]
	});
}
//#endregion
//#region src/pages/LoginPage.tsx
function Ue({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, extraFields: r, showThemeToolbar: i = !0, afterLoginPath: a = "/" }) {
	let { login: o } = q(), s = m(), { token: c } = B.useToken();
	return /* @__PURE__ */ U(T, {
		vertical: !0,
		align: "stretch",
		style: {
			height: "100dvh",
			maxHeight: "100dvh",
			width: "100%",
			overflow: "hidden",
			background: c.colorBgLayout
		},
		children: [i && /* @__PURE__ */ H(T, {
			justify: "flex-end",
			style: {
				flexShrink: 0,
				width: "100%",
				padding: 16,
				background: c.colorBgLayout
			},
			children: /* @__PURE__ */ H(Ne, {})
		}), /* @__PURE__ */ H(T, {
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
			children: /* @__PURE__ */ U(b, {
				style: {
					width: "100%",
					maxWidth: 360
				},
				title: e,
				extra: n,
				children: [t ? /* @__PURE__ */ H(z.Paragraph, {
					type: "secondary",
					style: { marginTop: 0 },
					children: t
				}) : null, /* @__PURE__ */ U(E, {
					layout: "vertical",
					onFinish: async (e) => {
						await o(e.username, e.password), s(a, { replace: !0 });
					},
					children: [
						/* @__PURE__ */ H(E.Item, {
							name: "username",
							label: "Username",
							rules: [{
								required: !0,
								message: "Required"
							}],
							children: /* @__PURE__ */ H(O, { autoComplete: "username" })
						}),
						/* @__PURE__ */ H(E.Item, {
							name: "password",
							label: "Password",
							rules: [{
								required: !0,
								message: "Required"
							}],
							children: /* @__PURE__ */ H(O.Password, { autoComplete: "current-password" })
						}),
						r,
						/* @__PURE__ */ H(E.Item, {
							style: { marginBottom: 0 },
							children: /* @__PURE__ */ H(y, {
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
	return e ? n : /* @__PURE__ */ H(l, {
		to: t,
		replace: !0
	});
}
function Ge({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = q();
	return /* @__PURE__ */ H(We, {
		when: n,
		redirect: t,
		children: e
	});
}
function Ke({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = q();
	return /* @__PURE__ */ H(We, {
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
			element: /* @__PURE__ */ H(Ke, {
				redirectTo: i,
				children: a ?? /* @__PURE__ */ H(Ue, { afterLoginPath: i })
			})
		},
		{
			path: "/",
			element: /* @__PURE__ */ H(Ge, {
				redirectTo: r,
				children: /* @__PURE__ */ H(He, {
					navItems: e,
					loginPath: r,
					...n
				})
			}),
			children: t
		},
		{
			path: "*",
			element: /* @__PURE__ */ H(l, {
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
	return /* @__PURE__ */ H(Ce, {
		...c,
		children: /* @__PURE__ */ H(Ee, {
			adapter: n,
			children: /* @__PURE__ */ H(d, { router: l })
		})
	});
}
//#endregion
//#region src/context/DataProvider.tsx
var Ye = e(null);
function Xe({ children: e, value: t }) {
	let n = a(() => t, [t]);
	return /* @__PURE__ */ H(Ye.Provider, {
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
	return /* @__PURE__ */ H(Ze.Provider, {
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
	return /* @__PURE__ */ H(z.Title, {
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
	return /* @__PURE__ */ H(pt.Provider, {
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
	return /* @__PURE__ */ H(gt.Provider, {
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
	return /* @__PURE__ */ H(yt.Provider, {
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
	let c = t === "new" || t == null, l = t != null, u = J(), { message: d } = _.useApp(), [f, p] = s(!c), m = pe(), h = n(async () => {
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
	return /* @__PURE__ */ H(M, {
		open: l,
		title: o ?? (c ? `New ${e}` : `Edit ${e}`),
		onCancel: r,
		footer: null,
		destroyOnHidden: !0,
		width: 560,
		children: f ? /* @__PURE__ */ H(L, {}) : /* @__PURE__ */ H(bt, {
			resource: e,
			isNew: c,
			children: /* @__PURE__ */ H(de, {
				...m,
				children: /* @__PURE__ */ U(E, {
					layout: "vertical",
					onFinish: () => void m.handleSubmit(g)(),
					children: [a, /* @__PURE__ */ U(E.Item, {
						style: {
							marginTop: 16,
							marginBottom: 0
						},
						children: [/* @__PURE__ */ H(y, {
							type: "primary",
							htmlType: "submit",
							style: { marginRight: 8 },
							children: "Save"
						}), /* @__PURE__ */ H(y, {
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
//#region src/crud/types.ts
var Ct = new Set([
	"page",
	"perPage",
	"sort",
	"create",
	"edit"
]), wt = 1, Tt = 10;
function Et(e) {
	if (e.includes(",")) {
		let t = e.split(",").map((e) => e.trim()), n = t.map(Number);
		return n.every((e) => Number.isFinite(e)) ? n : t;
	}
	let t = Number(e);
	return e !== "" && Number.isFinite(t) && String(t) === e ? t : e === "true" ? !0 : e === "false" ? !1 : e;
}
function Dt(e) {
	return e == null || e === "" ? null : Array.isArray(e) ? e.length === 0 ? null : e.map(String).join(",") : String(e);
}
function Ot(e) {
	let [t, r] = g(), i = a(() => {
		let n = t.get("page"), r = t.get("perPage"), i = n ? Math.max(1, Number(n) || wt) : wt, a = r ? Math.max(1, Number(r) || Tt) : Tt, o = t.getAll("sort"), s = o.length > 0 ? o.flatMap((e) => ut(e)) : ut(t.get("sort")), c = { ...e };
		return t.forEach((e, n) => {
			if (Ct.has(n)) return;
			let r = c[n];
			r === void 0 ? t.getAll(n).length > 1 ? c[n] = t.getAll(n).map(Et) : c[n] = Et(e) : c[n] = [...Array.isArray(r) ? r : [r], Et(e)];
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
				e === Tt ? t.delete("perPage") : t.set("perPage", String(e)), t.delete("page");
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
				let r = Dt(t);
				r != null && n.set(e, r), n.delete("page");
			});
		},
		setFilters: (e) => {
			o((t) => {
				for (let e of [...t.keys()]) Ct.has(e) || t.delete(e);
				for (let [n, r] of Object.entries(e)) {
					let e = Dt(r);
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
var kt = e(null);
function At() {
	return r(kt);
}
function jt({ resource: e, title: t, pathPrefix: r, newPath: o, editMode: l = "page", formChildren: u, actions: d, rowActions: f, headerExtra: p, queryState: m, queryActions: h }) {
	let g = J(), v = $e(), { message: x } = _.useApp(), { columns: S, sortOrders: C, sortPriorities: w } = ht(), [T, E] = s(!1), [D, O] = s([]), [k, A] = s(0), j = o ?? `${r}/new`, M = v("write", e), N = v("delete", e), P = M && (l === "page" || l === "both") && d?.edit !== !1, F = M && (l === "modal" || l === "both") && d?.quickEdit !== !1, L = N && d?.delete !== !1, R = P || F || L || f, B = n((e) => {
		let t = (e) => {
			let t = e?.columnKey ?? e?.field;
			return t == null ? null : String(Array.isArray(t) ? t[0] : t);
		};
		if (Array.isArray(e)) {
			let n = e.find((e) => e?.order);
			if (n) {
				let e = t(n);
				e && h.toggleSort(e);
				return;
			}
			m.sort.length > 0 && h.setSort([]);
			return;
		}
		let n = t(e);
		if (n) {
			h.toggleSort(n);
			return;
		}
		!e?.order && m.sort.length > 0 && h.setSort([]);
	}, [h, m.sort.length]), W = n(async () => {
		E(!0);
		try {
			let t = m.sort.length === 0 ? void 0 : m.sort.length === 1 ? m.sort[0] : m.sort, n = await g.getList(e, {
				pagination: {
					page: m.page,
					perPage: m.perPage
				},
				sort: t,
				filter: m.filter
			});
			O(n.data), A(n.total);
		} catch (e) {
			x.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			E(!1);
		}
	}, [
		g,
		e,
		m,
		x
	]);
	i(() => {
		W();
	}, [W]);
	let G = n(async (t) => {
		if (v("delete", e)) try {
			await g.delete(e, t.id), x.success("Deleted"), W();
		} catch (e) {
			x.error(e instanceof Error ? e.message : "Delete failed");
		}
	}, [
		v,
		g,
		e,
		W,
		x
	]), K = a(() => {
		let e = S.map((e) => {
			let t = e.buildColumn();
			if (e.sortable) {
				let n = C.get(e.source), r = w.get(e.source), i = n === "ASC" ? "ascend" : n === "DESC" ? "descend" : void 0, a = i == null ? void 0 : /* @__PURE__ */ U("span", {
					style: {
						display: "inline-flex",
						alignItems: "center",
						gap: 2,
						marginInlineStart: 4,
						color: "var(--ant-color-primary)"
					},
					children: [r == null ? null : /* @__PURE__ */ H("span", {
						style: {
							fontSize: 11,
							fontWeight: 600,
							lineHeight: 1,
							minWidth: 10,
							textAlign: "center"
						},
						children: r
					}), H(i === "ascend" ? ne : te, { style: { fontSize: 11 } })]
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
		if (!R) return e;
		let t = {
			reload: () => void W(),
			openEditModal: h.openEditModal
		}, n = {
			title: "Actions",
			key: "__actions",
			width: l === "both" ? 200 : 160,
			render: (e, n) => /* @__PURE__ */ U(I, {
				size: "small",
				wrap: !0,
				children: [
					P ? /* @__PURE__ */ H(c, {
						to: `${r}/${String(n.id)}`,
						children: "Edit"
					}) : null,
					F ? /* @__PURE__ */ H(y, {
						type: "link",
						size: "small",
						style: { padding: 0 },
						onClick: () => h.openEditModal(n.id),
						children: l === "both" ? "Quick edit" : "Edit"
					}) : null,
					L ? /* @__PURE__ */ H(y, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => void G(n),
						style: { padding: 0 },
						children: "Delete"
					}) : null,
					f?.(n, t)
				]
			})
		};
		return [...e, n];
	}, [
		S,
		R,
		P,
		F,
		L,
		l,
		r,
		G,
		C,
		w,
		h,
		f,
		W
	]), re = u && (m.createModal || m.editId != null) && (l === "modal" || l === "both");
	return /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(b, {
		title: /* @__PURE__ */ H(z.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		}),
		extra: p || M ? /* @__PURE__ */ U(I, { children: [p, M ? l === "modal" || l === "both" ? /* @__PURE__ */ U(V, { children: [l === "both" ? /* @__PURE__ */ H(c, {
			to: j,
			children: /* @__PURE__ */ H(y, { children: "New page" })
		}) : null, /* @__PURE__ */ H(y, {
			type: "primary",
			onClick: () => h.openCreateModal(),
			children: "New"
		})] }) : /* @__PURE__ */ H(c, {
			to: j,
			children: /* @__PURE__ */ H(y, {
				type: "primary",
				children: "New"
			})
		}) : null] }) : null,
		children: /* @__PURE__ */ H(ee, {
			rowKey: "id",
			loading: T,
			columns: K,
			dataSource: D,
			pagination: {
				current: m.page,
				pageSize: m.perPage,
				total: k,
				showSizeChanger: !0,
				onChange: (e, t) => {
					h.setPage(e), t && h.setPerPage(t);
				}
			},
			onChange: (e, t, n) => {
				B(n);
			}
		})
	}), re ? /* @__PURE__ */ H(St, {
		resource: e,
		editId: m.createModal ? "new" : m.editId,
		onClose: () => {
			h.closeModal(), W();
		},
		children: u
	}) : null] });
}
function Mt({ resource: e, title: t, pathPrefix: r, newPath: i, staticFilter: o, editMode: s = "page", syncQueryParams: c = !0, children: l, formChildren: u, actions: d, rowActions: f, headerExtra: p }) {
	let [m, h] = Ot(o), g = a(() => {
		if (!c) return o ?? {};
		let e = {};
		for (let [t, n] of Object.entries(m.filter)) o && t in o || (e[t] = n);
		return e;
	}, [
		m.filter,
		o,
		c
	]), _ = n((e, t) => {
		c && h.setFilter(e, t);
	}, [c, h]), v = a(() => ({
		filterValues: g,
		setFilterValue: _
	}), [g, _]);
	return /* @__PURE__ */ H(kt.Provider, {
		value: v,
		children: /* @__PURE__ */ H(_t, {
			values: g,
			setFilterValue: _,
			children: /* @__PURE__ */ U(mt, {
				toggleSort: h.toggleSort,
				sort: m.sort,
				children: [l, /* @__PURE__ */ H(jt, {
					resource: e,
					title: t,
					pathPrefix: r,
					newPath: i,
					editMode: s,
					formChildren: u,
					actions: d,
					rowActions: f,
					headerExtra: p,
					queryState: m,
					queryActions: h
				})]
			})
		})
	});
}
//#endregion
//#region src/crud/FilterBar.tsx
function Nt() {
	let e = vt();
	return !e || e.filters.length === 0 ? null : /* @__PURE__ */ H(I, {
		wrap: !0,
		size: "middle",
		style: { marginBottom: 16 },
		children: e.filters.map((t) => /* @__PURE__ */ U(I, {
			direction: "vertical",
			size: 2,
			children: [t.label ? /* @__PURE__ */ H(z.Text, {
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
function Pt({ children: e }) {
	return /* @__PURE__ */ U(V, { children: [e, /* @__PURE__ */ H(Nt, {})] });
}
//#endregion
//#region src/crud/context/InlineFormContext.tsx
var Ft = e(null), It = e([]);
function Lt({ children: e, arrayName: t, layout: r = "tabular" }) {
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
	return /* @__PURE__ */ H(Ft.Provider, {
		value: l,
		children: /* @__PURE__ */ H(It.Provider, {
			value: i,
			children: e
		})
	});
}
function Rt() {
	let e = r(Ft), t = r(It);
	return e ? {
		...e,
		fields: t
	} : null;
}
//#endregion
//#region src/crud/utils/inlineArrayName.ts
function zt(e, t) {
	return t ?? `__inline_${e.replace(/[^a-z0-9]/gi, "_")}`;
}
//#endregion
//#region src/crud/InlineFormSet.tsx
function Bt(e) {
	let t = Rt(), { control: n } = me(), r = he({
		control: n,
		name: e
	}), { fields: a, append: o, remove: s, replace: c } = fe({
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
function Vt({ arrayName: e, label: t }) {
	let { ctx: n, fields: r, remove: i, appendEmpty: o } = Bt(e), s = a(() => n ? n.fields.map((t) => ({
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
	return n ? /* @__PURE__ */ U("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ H(z.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ H(ee, {
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
					render: (e, t, n) => /* @__PURE__ */ H(y, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => i(n),
						children: "Remove"
					})
				}]
			}),
			/* @__PURE__ */ H(y, {
				type: "dashed",
				style: { marginTop: 8 },
				onClick: o,
				children: "Add row"
			})
		]
	}) : null;
}
function Ht({ arrayName: e, label: t }) {
	let { ctx: n, fields: r, remove: i, appendEmpty: a } = Bt(e);
	return n ? /* @__PURE__ */ U("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ H(z.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ H(I, {
				direction: "vertical",
				size: "middle",
				style: { width: "100%" },
				children: r.map((t, r) => /* @__PURE__ */ H(b, {
					size: "small",
					title: `Item ${r + 1}`,
					extra: /* @__PURE__ */ H(y, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => i(r),
						children: "Remove"
					}),
					children: n.fields.map((t) => /* @__PURE__ */ H("div", { children: t.render({
						name: `${e}.${r}.${t.source}`,
						index: r
					}) }, t.source))
				}, t.id))
			}),
			/* @__PURE__ */ H(y, {
				type: "dashed",
				style: { marginTop: 8 },
				onClick: a,
				children: "Add item"
			})
		]
	}) : null;
}
function Ut({ resource: e, label: t, children: n, name: r, layout: i = "tabular" }) {
	let a = zt(e, r);
	return /* @__PURE__ */ U(Lt, {
		arrayName: a,
		layout: i,
		children: [n, H(i === "stacked" ? Ht : Vt, {
			arrayName: a,
			label: t
		})]
	});
}
async function Wt(e, t) {
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
async function Gt(e, t, n, r) {
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
function Kt(e) {
	return zt(e.resource, e.name);
}
function qt({ resource: e, title: r, listPath: a, children: o, defaultValues: l, onSaved: u, stayOnPage: d, inlines: f }) {
	let { id: p } = h(), g = p === "new" || !p, v = J(), x = m(), { message: S } = _.useApp(), { token: C } = B.useToken(), [w, T] = s(!g), [D, O] = s(0), [k, A] = s({}), j = pe({ defaultValues: l }), M = n(async () => {
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
					let r = Kt(t), { rows: i, ids: a } = await Gt(v, t.resource, t.foreignKey, p);
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
				let r = Kt(n), { rows: i, ids: a } = await Gt(v, n.resource, n.foreignKey, e);
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
			if (f?.length) for (let e of f) delete n[Kt(e)];
			let r;
			if (g) r = (await v.create(e, n)).data, S.success("Created");
			else if (p) r = (await v.update(e, {
				id: p,
				data: n
			})).data, S.success("Updated");
			else return;
			let i = r.id;
			if (f?.length && i != null) for (let e of f) {
				let t = Kt(e), n = j.getValues(t) ?? [];
				await Wt(v, {
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
	return /* @__PURE__ */ H(b, {
		title: /* @__PURE__ */ U(I, { children: [/* @__PURE__ */ U(c, {
			to: a,
			style: { color: C.colorText },
			children: [/* @__PURE__ */ H(W, {}), " Back"]
		}), /* @__PURE__ */ H(z.Title, {
			level: 5,
			style: { margin: 0 },
			children: r
		})] }),
		children: /* @__PURE__ */ H(bt, {
			resource: e,
			isNew: g,
			children: /* @__PURE__ */ U("div", {
				style: {
					position: "relative",
					maxWidth: 720
				},
				children: [w ? /* @__PURE__ */ H("div", {
					style: {
						position: "absolute",
						inset: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1
					},
					children: /* @__PURE__ */ H(L, {})
				}) : null, /* @__PURE__ */ t(de, {
					...j,
					key: D
				}, /* @__PURE__ */ U(E, {
					layout: "vertical",
					onFinish: () => void j.handleSubmit(N)(),
					style: {
						opacity: w ? .4 : 1,
						pointerEvents: w ? "none" : void 0
					},
					children: [o, /* @__PURE__ */ H(E.Item, {
						style: { marginTop: 16 },
						children: /* @__PURE__ */ U(I, { children: [/* @__PURE__ */ H(y, {
							type: "primary",
							htmlType: "submit",
							disabled: w,
							children: "Save"
						}), /* @__PURE__ */ H(c, {
							to: a,
							children: /* @__PURE__ */ H(y, {
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
function Jt({ source: e, label: t, required: n, rules: r, children: i }) {
	let { control: a } = me(), o = xt(), s = t ?? e;
	return /* @__PURE__ */ H(ue, {
		name: e,
		control: a,
		rules: {
			required: n ? `${s} is required` : !1,
			...r
		},
		render: ({ field: e, fieldState: t }) => /* @__PURE__ */ H(E.Item, {
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
function Yt({ name: e, label: t, required: n, rules: r, hideLabel: i, children: a }) {
	let { control: o } = me(), s = i ? void 0 : t;
	return /* @__PURE__ */ H(ue, {
		name: e,
		control: o,
		rules: {
			required: n ? `${t ?? "This field"} is required` : !1,
			...r
		},
		render: ({ field: e, fieldState: t }) => /* @__PURE__ */ H(E.Item, {
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
	let l = Rt(), u = l?.registerField, d = u != null, f = o(s);
	f.current = s;
	let p = a(() => u ? {
		key: e,
		source: e,
		label: t,
		width: c?.width,
		minWidth: c?.minWidth,
		render: ({ name: e, index: i }) => /* @__PURE__ */ H(Yt, {
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
		element: /* @__PURE__ */ H(Jt, {
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
function Xt({ source: e, label: t, required: n, rules: r, placeholder: i, width: a, minWidth: o, inputStyle: s }) {
	let c = Z(e, t, n, r, ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ H(O, {
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
function Zt({ source: e, label: t, required: n, rules: r, min: i, max: a, step: o, width: s, minWidth: c, inputStyle: l }) {
	let u = Z(e, t, n, r, ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ H(k, {
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
function Qt({ source: e, label: t, required: n, rules: r }) {
	let i = Z(e, t, n, r, ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ H(R, {
		checked: !!e,
		onChange: t,
		disabled: n
	}));
	return i.mode === "inline" ? null : i.element;
}
//#endregion
//#region src/crud/fields/DateField.tsx
var $t = "YYYY-MM-DD";
function en({ source: e, label: t, required: n, rules: r, showTime: i }) {
	let a = Z(e, t, n, r, ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ H(S, {
		value: e ? ge(String(e)) : null,
		onChange: (e) => t(e ? e.format(i ? `${$t} HH:mm:ss` : $t) : null),
		onBlur: n,
		showTime: i,
		disabled: r,
		format: i ? `${$t} HH:mm:ss` : $t,
		style: { width: "100%" }
	}));
	return a.mode === "inline" ? null : a.element;
}
//#endregion
//#region src/crud/fields/SelectField.tsx
function tn({ source: e, label: t, required: n, rules: r, choices: i, mode: a, allowClear: o }) {
	return /* @__PURE__ */ H(Jt, {
		source: e,
		label: t,
		required: n,
		rules: r,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ H(F, {
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
var Q = /* @__PURE__ */ new Map(), nn = /* @__PURE__ */ new Map();
function rn(e, t) {
	return typeof e == "function" ? `fn:${t ?? ""}` : Array.isArray(e) ? `static:${e.length}` : `res:${e.resource}:${JSON.stringify(e.filter ?? {})}:${t ?? ""}`;
}
function an(e, t) {
	return typeof t == "function" ? t(e) : String(e[t] ?? "");
}
async function on(e, t, n, r, i) {
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
		label: an(e, n),
		value: e[r],
		record: e
	}));
}
function sn(e, t, n, r, i) {
	let a = rn(e, i), o = Q.get(a);
	if (o && !i) return Promise.resolve(o);
	let s = nn.get(a);
	if (s) return s;
	let c = on(e, t, n, r, i).then((e) => (i || Q.set(a, e), e)).finally(() => {
		nn.delete(a);
	});
	return nn.set(a, c), c;
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
	]), d = u ? rn(u, c) : void 0, [f, p] = s(() => !d || c ? [] : Q.get(d) ?? []), [m, h] = s(() => !d || c ? !!u : !Q.has(d)), g = n(async () => {
		if (!u) {
			p([]), h(!1);
			return;
		}
		let e = rn(u, c), t = Q.get(e);
		if (t && !c) {
			p(t), h(!1);
			return;
		}
		h(!0);
		try {
			p(await sn(u, l, r, o, c));
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
function cn({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", required: c, rules: l, search: u, allowClear: d, disabled: f, width: p, minWidth: m, inputStyle: h, onValueChange: g }) {
	let [_, v] = s(), { options: y, loading: b, optionForValue: x } = $(r, n, i, o, u ? _ : void 0), S = a(() => y.map((e) => ({
		label: e.label,
		value: e.value
	})), [y]), C = Z(e, t, c, l, ({ value: e, onChange: t, disabled: n, name: r, index: i }) => /* @__PURE__ */ H(F, {
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
function ln({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", required: c, rules: l, search: u, allowClear: d = !0 }) {
	let [f, p] = s(), { options: m, loading: h } = $(r, n, i, o, u ? f : void 0), g = a(() => m.map((e) => ({
		label: e.label,
		value: e.value
	})), [m]), _ = Z(e, t, c, l, ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ H(F, {
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
function un(e, t) {
	let n = t.split("."), r = e;
	for (let e of n) {
		if (typeof r != "object" || !r) return;
		r = r[e];
	}
	return r;
}
//#endregion
//#region src/crud/columns/TextColumn.tsx
function dn({ source: e, label: t, sortable: n = !0 }) {
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
function fn(e, t, n) {
	return typeof n == "function" ? n(e) : n ? un(e, n) : e[t];
}
//#endregion
//#region src/crud/columns/NumberColumn.tsx
function pn({ source: e, label: t, sortable: n = !0 }) {
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
function gn({ record: e, source: t, display: n, reference: r, choices: i, optionLabel: a, optionValue: o }) {
	let { labelForValue: s } = $(i, r, a, o), c = e[t];
	if (typeof n == "function") return /* @__PURE__ */ H(V, { children: n(e) });
	if (n && n !== t) {
		let r = fn(e, t, n);
		return /* @__PURE__ */ H(V, { children: r == null ? "—" : String(r) });
	}
	return /* @__PURE__ */ H(V, { children: s(c) });
}
function _n({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", display: s, sortable: c = !0 }) {
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
			render: (a, c) => /* @__PURE__ */ H(gn, {
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
function vn({ record: e, source: t, reference: n, choices: r, optionLabel: i, optionValue: a }) {
	let { labelsForValues: o } = $(r, n, i, a), s = e[t];
	return /* @__PURE__ */ H(V, { children: o(Array.isArray(s) ? s : []) });
}
function yn({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", sortable: s = !1 }) {
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
			render: (t, a) => /* @__PURE__ */ H(vn, {
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
function bn({ source: e, label: t, sortable: n = !1, render: r }) {
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
function xn({ source: e, label: t, placeholder: n }) {
	return X(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: r, onChange: i }) => /* @__PURE__ */ H(O, {
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
function Sn({ source: e, label: t }) {
	return X(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ H(k, {
			placeholder: t ?? e,
			value: n,
			onChange: (e) => r(e ?? void 0),
			style: { minWidth: 120 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/BooleanFilter.tsx
function Cn({ source: e, label: t }) {
	return X(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ H(F, {
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
function wn({ source: e, label: t }) {
	return X(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ H(S, {
			allowClear: !0,
			placeholder: t ?? e,
			value: n ? ge(String(n)) : null,
			onChange: (e) => r(e ? e.format("YYYY-MM-DD") : void 0),
			style: { minWidth: 160 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/SelectFilter.tsx
function Tn({ source: e, label: t, choices: n, multiple: r }) {
	return X(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: i, onChange: a }) => /* @__PURE__ */ H(F, {
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
function En({ source: e, label: t, reference: n, choices: r, optionLabel: i, optionValue: a, multiple: o, search: c, value: l, onChange: u }) {
	let [d, f] = s(), { options: p, loading: m } = $(r, n, i, a, c ? d : void 0);
	return /* @__PURE__ */ H(F, {
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
function Dn({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: o = "id", multiple: s, search: c }) {
	return X(a(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: a, onChange: l }) => /* @__PURE__ */ H(En, {
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
function On(e) {
	return /* @__PURE__ */ H(Dn, {
		...e,
		multiple: !0
	});
}
//#endregion
export { Je as AdminApp, He as AdminLayout, Ce as AppThemeProvider, Ee as AuthProvider, mn as BooleanColumn, Qt as BooleanField, Cn as BooleanFilter, bn as CustomColumn, Xe as DataProvider, hn as DateColumn, en as DateField, wn as DateFilter, Ae as DensitySwitch, Pt as FilterBar, We as Guard, Ke as GuestOnly, Ut as InlineFormSet, Ue as LoginPage, pn as NumberColumn, Zt as NumberField, Sn as NumberFilter, Qe as PermissionsProvider, lt as PlaceholderPage, Ge as Protected, _n as ReferenceColumn, cn as ReferenceField, Dn as ReferenceFilter, yn as ReferenceManyColumn, ln as ReferenceManyField, On as ReferenceManyFilter, qt as ResourceForm, St as ResourceFormModal, Mt as ResourceList, tn as SelectField, Tn as SelectFilter, dn as TextColumn, Xt as TextField, xn as TextFilter, Me as ThemeSwitch, Ne as ThemeToolbar, st as applyInMemoryListParams, tt as combineResourceHandlers, qe as createAdminRouter, ct as createMemoryResourceHandlers, Oe as createSessionStorageAuthAdapter, at as filterRows, un as getByPath, nt as getRowById, Gt as loadInlineRows, Wt as saveInlineRows, q as useAuth, et as useCan, $ as useChoices, J as useDataProvider, Ot as useListQueryState, $e as usePermissions, At as useResourceListContext, we as useThemeMode };
