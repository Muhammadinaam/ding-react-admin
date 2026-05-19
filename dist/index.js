import { createContext as e, useCallback as t, useContext as n, useEffect as r, useMemo as i, useState as a } from "react";
import { Navigate as o, Outlet as s, RouterProvider as c, createBrowserRouter as l, useLocation as u, useNavigate as d } from "react-router-dom";
import { Avatar as f, Button as p, Card as m, ConfigProvider as h, Drawer as ee, Dropdown as te, Flex as g, Form as _, Grid as v, Input as y, Layout as b, Menu as x, Popover as S, Segmented as C, Space as w, Typography as T, theme as E } from "antd";
import { jsx as D, jsxs as O } from "react/jsx-runtime";
import { ColumnHeightOutlined as k, DesktopOutlined as A, LayoutOutlined as j, LogoutOutlined as ne, MenuOutlined as re, MoonOutlined as M, SettingOutlined as N, SunOutlined as ie, UserOutlined as ae } from "@ant-design/icons";
//#region src/context/AppThemeProvider.tsx
var P = e(null);
function F(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "light" || t === "dark" || t === "system") return t;
	} catch {}
	return "system";
}
function I() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function L(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "comfortable" || t === "compact") return t;
	} catch {}
	return "comfortable";
}
var R = "ding-react-admin-theme-mode", z = "ding-react-admin-theme-density";
function B({ children: e, modeStorageKey: t = R, densityStorageKey: n = z }) {
	let [o, s] = a(() => F(t)), [c, l] = a(() => L(n)), [u, d] = a(I);
	r(() => {
		if (o !== "system") return;
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = () => d(e.matches);
		return t(), e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, [o]);
	let f = (e) => {
		s(e);
		try {
			localStorage.setItem(t, e);
		} catch {}
	}, p = (e) => {
		l(e);
		try {
			localStorage.setItem(n, e);
		} catch {}
	}, m = o === "system" ? u ? "dark" : "light" : o, ee = i(() => {
		let e = m === "dark" ? E.darkAlgorithm : E.defaultAlgorithm;
		return { algorithm: c === "compact" ? [e, E.compactAlgorithm] : e };
	}, [m, c]), te = i(() => ({
		mode: o,
		setMode: f,
		resolved: m,
		density: c,
		setDensity: p
	}), [
		o,
		m,
		c,
		f,
		p
	]);
	return /* @__PURE__ */ D(P.Provider, {
		value: te,
		children: /* @__PURE__ */ D(h, {
			theme: ee,
			children: e
		})
	});
}
function V() {
	let e = n(P);
	if (!e) throw Error("useThemeMode must be used within AppThemeProvider");
	return e;
}
//#endregion
//#region src/context/AuthProvider.tsx
var H = e(null);
function U({ children: e, adapter: n }) {
	let [r, o] = a(() => n.getToken()), s = t(async (e, t) => {
		await n.login(e, t), o(n.getToken());
	}, [n]), c = t(() => {
		n.logout(), o(n.getToken());
	}, [n]), l = i(() => ({
		isAuthenticated: !!r,
		login: s,
		logout: c
	}), [
		r,
		s,
		c
	]);
	return /* @__PURE__ */ D(H.Provider, {
		value: l,
		children: e
	});
}
function W() {
	let e = n(H);
	if (!e) throw Error("useAuth must be used within AuthProvider");
	return e;
}
var G = "ding-react-admin-auth";
function K(e = G) {
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
var q = [{
	label: "Comfortable",
	value: "comfortable",
	icon: /* @__PURE__ */ D(j, {})
}, {
	label: "Compact",
	value: "compact",
	icon: /* @__PURE__ */ D(k, {})
}];
function J() {
	let { density: e, setDensity: t } = V();
	return /* @__PURE__ */ D(C, {
		size: "small",
		value: e,
		options: q,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeSwitch.tsx
var Y = [
	{
		label: "Light",
		value: "light",
		icon: /* @__PURE__ */ D(ie, {})
	},
	{
		label: "Dark",
		value: "dark",
		icon: /* @__PURE__ */ D(M, {})
	},
	{
		label: "Auto",
		value: "system",
		icon: /* @__PURE__ */ D(A, {})
	}
];
function X() {
	let { mode: e, setMode: t } = V();
	return /* @__PURE__ */ D(C, {
		size: "small",
		value: e,
		options: Y,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeToolbar.tsx
function Z() {
	let { token: e } = E.useToken();
	return /* @__PURE__ */ D(S, {
		placement: v.useBreakpoint().lg ? "bottomRight" : "bottom",
		trigger: "click",
		content: /* @__PURE__ */ O(w, {
			direction: "vertical",
			size: "middle",
			style: {
				minWidth: 240,
				maxWidth: "min(92vw, 320px)"
			},
			children: [/* @__PURE__ */ D(X, {}), /* @__PURE__ */ D(J, {})]
		}),
		styles: { body: { padding: e.paddingSM } },
		children: /* @__PURE__ */ D(p, {
			type: "default",
			icon: /* @__PURE__ */ D(N, {}),
			"aria-label": "Display and theme settings"
		})
	});
}
//#endregion
//#region src/layouts/AdminLayout.tsx
var oe = "#001529", se = "ding-react-admin-sider-collapsed";
function ce(e) {
	try {
		return localStorage.getItem(e) === "1";
	} catch {
		return !1;
	}
}
function le() {
	return v.useBreakpoint().lg !== !0;
}
function ue(e) {
	let t = /* @__PURE__ */ new Set();
	function n(e) {
		for (let r of e) r.children?.length ? n(r.children) : t.add(r.path);
	}
	return n(e), t;
}
function de(e, t) {
	function n(e) {
		for (let r of e) if (r.children?.length) {
			let e = n(r.children);
			if (e !== null) return [r.path, ...e];
		} else if (r.path === t) return [];
		return null;
	}
	return n(e) ?? [];
}
function fe(e) {
	return e.map((e) => {
		let t = e.Icon, n = t ? /* @__PURE__ */ D(t, {}) : void 0;
		return e.children?.length ? {
			key: e.path,
			icon: n,
			label: e.label,
			children: fe(e.children)
		} : {
			key: e.path,
			icon: n,
			label: e.label
		};
	});
}
function pe({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a }) {
	return /* @__PURE__ */ D(x, {
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
function me({ navItems: e, brand: n = "Admin", collapsedBrand: o = "A", mobileDrawerTitle: c, headerExtras: l, userMenuItems: m, onUserMenuClick: h, loginPath: g = "/login", siderCollapsedStorageKey: _ = se }) {
	let v = d(), y = u(), { resolved: x } = V(), S = x === "dark", { logout: C } = W(), [w, k] = a(() => ce(_)), [A, j] = a(!1), M = le(), { token: N } = E.useToken(), ie = c ?? n, P = () => {
		C(), v(g, { replace: !0 });
	}, F = t((e) => {
		k(e);
		try {
			localStorage.setItem(_, e ? "1" : "0");
		} catch {}
	}, [_]);
	r(() => {
		M || j(!1);
	}, [M]), r(() => {
		j(!1);
	}, [y.pathname]);
	let I = i(() => ue(e), [e]), L = i(() => fe(e), [e]), R = i(() => de(e, y.pathname), [e, y.pathname]), [z, B] = a(() => de(e, y.pathname));
	r(() => {
		B((e) => [...new Set([...e, ...R])]);
	}, [R]);
	let H = t((e) => {
		B(e);
	}, []), U = i(() => [{
		key: "logout",
		icon: /* @__PURE__ */ D(ne, {}),
		label: "Log out",
		danger: !0
	}], []), G = m ?? U, K = (e) => {
		if (h) {
			h(e);
			return;
		}
		e.key === "logout" && P();
	}, q = S ? N.colorBgContainer : oe, J = [y.pathname], Y = (e) => {
		I.has(e) && (v(e), M && j(!1));
	};
	return /* @__PURE__ */ O(b, {
		style: {
			minHeight: "100vh",
			width: "100%",
			background: N.colorBgLayout
		},
		children: [
			!M && /* @__PURE__ */ O(b.Sider, {
				collapsible: !0,
				collapsed: w,
				onCollapse: F,
				collapsedWidth: 64,
				style: {
					background: q,
					borderInlineEnd: S ? `1px solid ${N.colorSplit}` : void 0
				},
				children: [/* @__PURE__ */ D("div", {
					style: {
						height: 64,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontWeight: 600
					},
					children: /* @__PURE__ */ D(T.Text, {
						strong: !0,
						style: { color: N.colorTextLightSolid },
						children: w ? o : n
					})
				}), /* @__PURE__ */ D(pe, {
					menuItems: L,
					selectedKeys: J,
					inlineCollapsed: w,
					openKeys: z,
					onOpenChange: H,
					onNavigate: Y
				})]
			}),
			M && /* @__PURE__ */ D(ee, {
				title: /* @__PURE__ */ D(T.Text, {
					strong: !0,
					style: { color: N.colorTextLightSolid },
					children: ie
				}),
				placement: "left",
				width: 280,
				onClose: () => j(!1),
				open: A,
				styles: {
					header: {
						background: q,
						borderBottom: `1px solid ${N.colorSplit}`
					},
					body: {
						padding: 0,
						background: q
					}
				},
				destroyOnClose: !0,
				children: /* @__PURE__ */ D(pe, {
					menuItems: L,
					selectedKeys: J,
					inlineCollapsed: !1,
					openKeys: z,
					onOpenChange: H,
					onNavigate: Y
				})
			}),
			/* @__PURE__ */ O(b, { children: [/* @__PURE__ */ O(b.Header, {
				style: {
					background: N.colorBgContainer,
					paddingInline: N.paddingLG,
					display: "flex",
					alignItems: "center",
					gap: N.marginSM,
					lineHeight: "normal"
				},
				children: [
					M && /* @__PURE__ */ D(p, {
						type: "text",
						icon: /* @__PURE__ */ D(re, {}),
						onClick: () => j(!0),
						"aria-label": "Open navigation"
					}),
					/* @__PURE__ */ D("div", { style: {
						flex: 1,
						minWidth: 0
					} }),
					l,
					/* @__PURE__ */ D(Z, {}),
					/* @__PURE__ */ D(te, {
						menu: {
							items: G,
							onClick: K
						},
						trigger: ["click"],
						children: /* @__PURE__ */ O(p, {
							type: "text",
							style: {
								display: "inline-flex",
								alignItems: "center",
								gap: N.marginXS,
								maxWidth: M ? 44 : void 0,
								paddingInline: M ? N.paddingXS : void 0
							},
							"aria-label": "Account menu",
							children: [/* @__PURE__ */ D(f, {
								size: "small",
								icon: /* @__PURE__ */ D(ae, {})
							}), !M && /* @__PURE__ */ D(T.Text, {
								type: "secondary",
								children: "User"
							})]
						})
					})
				]
			}), /* @__PURE__ */ D(b.Content, {
				style: { margin: M ? N.marginSM : N.marginLG },
				children: /* @__PURE__ */ D(s, {})
			})] })
		]
	});
}
//#endregion
//#region src/pages/LoginPage.tsx
function he({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, extraFields: r, showThemeToolbar: i = !0, afterLoginPath: a = "/" }) {
	let { login: o } = W(), s = d(), { token: c } = E.useToken();
	return /* @__PURE__ */ O(g, {
		vertical: !0,
		align: "stretch",
		style: {
			height: "100dvh",
			maxHeight: "100dvh",
			width: "100%",
			overflow: "hidden",
			background: c.colorBgLayout
		},
		children: [i && /* @__PURE__ */ D(g, {
			justify: "flex-end",
			style: {
				flexShrink: 0,
				width: "100%",
				padding: 16,
				background: c.colorBgLayout
			},
			children: /* @__PURE__ */ D(Z, {})
		}), /* @__PURE__ */ D(g, {
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
			children: /* @__PURE__ */ O(m, {
				style: {
					width: "100%",
					maxWidth: 360
				},
				title: e,
				extra: n,
				children: [t ? /* @__PURE__ */ D(T.Paragraph, {
					type: "secondary",
					style: { marginTop: 0 },
					children: t
				}) : null, /* @__PURE__ */ O(_, {
					layout: "vertical",
					onFinish: async (e) => {
						await o(e.username, e.password), s(a, { replace: !0 });
					},
					children: [
						/* @__PURE__ */ D(_.Item, {
							name: "username",
							label: "Username",
							rules: [{
								required: !0,
								message: "Required"
							}],
							children: /* @__PURE__ */ D(y, { autoComplete: "username" })
						}),
						/* @__PURE__ */ D(_.Item, {
							name: "password",
							label: "Password",
							rules: [{
								required: !0,
								message: "Required"
							}],
							children: /* @__PURE__ */ D(y.Password, { autoComplete: "current-password" })
						}),
						r,
						/* @__PURE__ */ D(_.Item, {
							style: { marginBottom: 0 },
							children: /* @__PURE__ */ D(p, {
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
function Q({ when: e, redirect: t, children: n }) {
	return e ? n : /* @__PURE__ */ D(o, {
		to: t,
		replace: !0
	});
}
function ge({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = W();
	return /* @__PURE__ */ D(Q, {
		when: n,
		redirect: t,
		children: e
	});
}
function _e({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = W();
	return /* @__PURE__ */ D(Q, {
		when: !n,
		redirect: t,
		children: e
	});
}
//#endregion
//#region src/router/createAdminRouter.tsx
function ve({ navItems: e, children: t, layoutProps: n, loginPath: r = "/login", homePath: i = "/", loginElement: a }) {
	return l([
		{
			path: r,
			element: /* @__PURE__ */ D(_e, {
				redirectTo: i,
				children: a ?? /* @__PURE__ */ D(he, { afterLoginPath: i })
			})
		},
		{
			path: "/",
			element: /* @__PURE__ */ D(ge, {
				redirectTo: r,
				children: /* @__PURE__ */ D(me, {
					navItems: e,
					loginPath: r,
					...n
				})
			}),
			children: t
		},
		{
			path: "*",
			element: /* @__PURE__ */ D(o, {
				to: i,
				replace: !0
			})
		}
	]);
}
//#endregion
//#region src/app/AdminApp.tsx
function ye({ navItems: e, routes: t, authAdapter: n, layoutProps: r, loginPath: a, homePath: o, loginElement: s, theme: l }) {
	let u = i(() => ve({
		navItems: e,
		children: t,
		layoutProps: r,
		loginPath: a,
		homePath: o,
		loginElement: s
	}), [
		e,
		t,
		r,
		a,
		o,
		s
	]);
	return /* @__PURE__ */ D(B, {
		...l,
		children: /* @__PURE__ */ D(U, {
			adapter: n,
			children: /* @__PURE__ */ D(c, { router: u })
		})
	});
}
//#endregion
//#region src/context/DataProvider.tsx
var be = e(null);
function xe({ children: e, value: t }) {
	let n = i(() => t, [t]);
	return /* @__PURE__ */ D(be.Provider, {
		value: n,
		children: e
	});
}
function Se() {
	let e = n(be);
	if (!e) throw Error("useDataProvider must be used within DataProvider");
	return e;
}
//#endregion
//#region src/context/PermissionsProvider.tsx
var Ce = e(null);
function we({ children: e, can: t }) {
	let n = i(() => t, [t]);
	return /* @__PURE__ */ D(Ce.Provider, {
		value: n,
		children: e
	});
}
function $() {
	let e = n(Ce);
	if (!e) throw Error("usePermissions must be used within PermissionsProvider");
	return e;
}
function Te(e, n) {
	let r = $();
	return t(() => r(e, n), [
		r,
		e,
		n
	]);
}
//#endregion
//#region src/pages/PlaceholderPage.tsx
function Ee({ title: e }) {
	return /* @__PURE__ */ D(T.Title, {
		level: 4,
		children: e
	});
}
//#endregion
export { ye as AdminApp, me as AdminLayout, B as AppThemeProvider, U as AuthProvider, xe as DataProvider, J as DensitySwitch, Q as Guard, _e as GuestOnly, he as LoginPage, we as PermissionsProvider, Ee as PlaceholderPage, ge as Protected, X as ThemeSwitch, Z as ThemeToolbar, ve as createAdminRouter, K as createSessionStorageAuthAdapter, W as useAuth, Te as useCan, Se as useDataProvider, $ as usePermissions, V as useThemeMode };
