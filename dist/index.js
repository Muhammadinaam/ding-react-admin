import { createContext as e, useCallback as t, useContext as n, useEffect as r, useMemo as i, useState as a } from "react";
import { Navigate as o, Outlet as s, RouterProvider as c, createBrowserRouter as l, useLocation as u, useNavigate as d } from "react-router-dom";
import { Avatar as f, Button as p, Card as m, ConfigProvider as h, Drawer as g, Dropdown as _, Flex as v, Form as y, Grid as b, Input as x, Layout as S, Menu as C, Popover as w, Segmented as T, Space as E, Typography as D, theme as O } from "antd";
import { jsx as k, jsxs as A } from "react/jsx-runtime";
import { ColumnHeightOutlined as ee, DesktopOutlined as j, LayoutOutlined as M, LogoutOutlined as te, MenuOutlined as ne, MoonOutlined as N, SettingOutlined as P, SunOutlined as F, UserOutlined as re } from "@ant-design/icons";
//#region src/context/AppThemeProvider.tsx
var I = e(null);
function L(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "light" || t === "dark" || t === "system") return t;
	} catch {}
	return "system";
}
function R() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function z(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "comfortable" || t === "compact") return t;
	} catch {}
	return "comfortable";
}
var B = "ding-react-admin-theme-mode", V = "ding-react-admin-theme-density";
function H({ children: e, modeStorageKey: t = B, densityStorageKey: n = V }) {
	let [o, s] = a(() => L(t)), [c, l] = a(() => z(n)), [u, d] = a(R);
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
	}, m = o === "system" ? u ? "dark" : "light" : o, g = i(() => {
		let e = m === "dark" ? O.darkAlgorithm : O.defaultAlgorithm;
		return { algorithm: c === "compact" ? [e, O.compactAlgorithm] : e };
	}, [m, c]), _ = i(() => ({
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
	return /* @__PURE__ */ k(I.Provider, {
		value: _,
		children: /* @__PURE__ */ k(h, {
			theme: g,
			children: e
		})
	});
}
function U() {
	let e = n(I);
	if (!e) throw Error("useThemeMode must be used within AppThemeProvider");
	return e;
}
//#endregion
//#region src/context/AuthProvider.tsx
var W = e(null);
function G({ children: e, adapter: n }) {
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
	return /* @__PURE__ */ k(W.Provider, {
		value: l,
		children: e
	});
}
function K() {
	let e = n(W);
	if (!e) throw Error("useAuth must be used within AuthProvider");
	return e;
}
var ie = "ding-react-admin-auth";
function ae(e = ie) {
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
var oe = [{
	label: "Comfortable",
	value: "comfortable",
	icon: /* @__PURE__ */ k(M, {})
}, {
	label: "Compact",
	value: "compact",
	icon: /* @__PURE__ */ k(ee, {})
}];
function q() {
	let { density: e, setDensity: t } = U();
	return /* @__PURE__ */ k(T, {
		size: "small",
		value: e,
		options: oe,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeSwitch.tsx
var se = [
	{
		label: "Light",
		value: "light",
		icon: /* @__PURE__ */ k(F, {})
	},
	{
		label: "Dark",
		value: "dark",
		icon: /* @__PURE__ */ k(N, {})
	},
	{
		label: "Auto",
		value: "system",
		icon: /* @__PURE__ */ k(j, {})
	}
];
function J() {
	let { mode: e, setMode: t } = U();
	return /* @__PURE__ */ k(T, {
		size: "small",
		value: e,
		options: se,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeToolbar.tsx
function Y() {
	let { token: e } = O.useToken();
	return /* @__PURE__ */ k(w, {
		placement: b.useBreakpoint().lg ? "bottomRight" : "bottom",
		trigger: "click",
		content: /* @__PURE__ */ A(E, {
			direction: "vertical",
			size: "middle",
			style: {
				minWidth: 240,
				maxWidth: "min(92vw, 320px)"
			},
			children: [/* @__PURE__ */ k(J, {}), /* @__PURE__ */ k(q, {})]
		}),
		styles: { body: { padding: e.paddingSM } },
		children: /* @__PURE__ */ k(p, {
			type: "default",
			icon: /* @__PURE__ */ k(P, {}),
			"aria-label": "Display and theme settings"
		})
	});
}
//#endregion
//#region src/layouts/AdminLayout.tsx
var ce = "#001529", le = "ding-react-admin-sider-collapsed";
function ue(e) {
	try {
		return localStorage.getItem(e) === "1";
	} catch {
		return !1;
	}
}
function de() {
	return b.useBreakpoint().lg !== !0;
}
function X({ menuItems: e, selectedKeys: t, inlineCollapsed: n, onNavigate: r }) {
	return /* @__PURE__ */ k(C, {
		mode: "inline",
		theme: "dark",
		inlineCollapsed: n,
		selectedKeys: t,
		items: e,
		onClick: ({ key: e }) => r(e),
		style: {
			background: "transparent",
			borderInlineEnd: "none"
		}
	});
}
function Z({ navItems: e, brand: n = "Admin", collapsedBrand: o = "A", mobileDrawerTitle: c, headerExtras: l, userMenuItems: m, onUserMenuClick: h, loginPath: v = "/login", siderCollapsedStorageKey: y = le }) {
	let b = d(), x = u(), { resolved: C } = U(), w = C === "dark", { logout: T } = K(), [E, ee] = a(() => ue(y)), [j, M] = a(!1), N = de(), { token: P } = O.useToken(), F = c ?? n, I = () => {
		T(), b(v, { replace: !0 });
	}, L = t((e) => {
		ee(e);
		try {
			localStorage.setItem(y, e ? "1" : "0");
		} catch {}
	}, [y]);
	r(() => {
		N || M(!1);
	}, [N]), r(() => {
		M(!1);
	}, [x.pathname]);
	let R = i(() => e.map(({ path: e, label: t, Icon: n }) => ({
		key: e,
		icon: /* @__PURE__ */ k(n, {}),
		label: t
	})), [e]), z = i(() => [{
		key: "logout",
		icon: /* @__PURE__ */ k(te, {}),
		label: "Log out",
		danger: !0
	}], []), B = m ?? z, V = (e) => {
		if (h) {
			h(e);
			return;
		}
		e.key === "logout" && I();
	}, H = w ? P.colorBgContainer : ce, W = [x.pathname], G = (e) => {
		b(e), N && M(!1);
	};
	return /* @__PURE__ */ A(S, {
		style: {
			minHeight: "100vh",
			width: "100%",
			background: P.colorBgLayout
		},
		children: [
			!N && /* @__PURE__ */ A(S.Sider, {
				collapsible: !0,
				collapsed: E,
				onCollapse: L,
				collapsedWidth: 64,
				style: {
					background: H,
					borderInlineEnd: w ? `1px solid ${P.colorSplit}` : void 0
				},
				children: [/* @__PURE__ */ k("div", {
					style: {
						height: 64,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontWeight: 600
					},
					children: /* @__PURE__ */ k(D.Text, {
						strong: !0,
						style: { color: P.colorTextLightSolid },
						children: E ? o : n
					})
				}), /* @__PURE__ */ k(X, {
					menuItems: R,
					selectedKeys: W,
					inlineCollapsed: E,
					onNavigate: G
				})]
			}),
			N && /* @__PURE__ */ k(g, {
				title: /* @__PURE__ */ k(D.Text, {
					strong: !0,
					style: { color: P.colorTextLightSolid },
					children: F
				}),
				placement: "left",
				width: 280,
				onClose: () => M(!1),
				open: j,
				styles: {
					header: {
						background: H,
						borderBottom: `1px solid ${P.colorSplit}`
					},
					body: {
						padding: 0,
						background: H
					}
				},
				destroyOnClose: !0,
				children: /* @__PURE__ */ k(X, {
					menuItems: R,
					selectedKeys: W,
					inlineCollapsed: !1,
					onNavigate: G
				})
			}),
			/* @__PURE__ */ A(S, { children: [/* @__PURE__ */ A(S.Header, {
				style: {
					background: P.colorBgContainer,
					paddingInline: P.paddingLG,
					display: "flex",
					alignItems: "center",
					gap: P.marginSM,
					lineHeight: "normal"
				},
				children: [
					N && /* @__PURE__ */ k(p, {
						type: "text",
						icon: /* @__PURE__ */ k(ne, {}),
						onClick: () => M(!0),
						"aria-label": "Open navigation"
					}),
					/* @__PURE__ */ k("div", { style: {
						flex: 1,
						minWidth: 0
					} }),
					l,
					/* @__PURE__ */ k(Y, {}),
					/* @__PURE__ */ k(_, {
						menu: {
							items: B,
							onClick: V
						},
						trigger: ["click"],
						children: /* @__PURE__ */ A(p, {
							type: "text",
							style: {
								display: "inline-flex",
								alignItems: "center",
								gap: P.marginXS,
								maxWidth: N ? 44 : void 0,
								paddingInline: N ? P.paddingXS : void 0
							},
							"aria-label": "Account menu",
							children: [/* @__PURE__ */ k(f, {
								size: "small",
								icon: /* @__PURE__ */ k(re, {})
							}), !N && /* @__PURE__ */ k(D.Text, {
								type: "secondary",
								children: "User"
							})]
						})
					})
				]
			}), /* @__PURE__ */ k(S.Content, {
				style: { margin: N ? P.marginSM : P.marginLG },
				children: /* @__PURE__ */ k(s, {})
			})] })
		]
	});
}
//#endregion
//#region src/pages/LoginPage.tsx
function Q({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, extraFields: r, showThemeToolbar: i = !0, afterLoginPath: a = "/" }) {
	let { login: o } = K(), s = d(), { token: c } = O.useToken();
	return /* @__PURE__ */ A(v, {
		vertical: !0,
		align: "stretch",
		style: {
			height: "100dvh",
			maxHeight: "100dvh",
			width: "100%",
			overflow: "hidden",
			background: c.colorBgLayout
		},
		children: [i && /* @__PURE__ */ k(v, {
			justify: "flex-end",
			style: {
				flexShrink: 0,
				width: "100%",
				padding: 16,
				background: c.colorBgLayout
			},
			children: /* @__PURE__ */ k(Y, {})
		}), /* @__PURE__ */ k(v, {
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
			children: /* @__PURE__ */ A(m, {
				style: {
					width: "100%",
					maxWidth: 360
				},
				title: e,
				extra: n,
				children: [t ? /* @__PURE__ */ k(D.Paragraph, {
					type: "secondary",
					style: { marginTop: 0 },
					children: t
				}) : null, /* @__PURE__ */ A(y, {
					layout: "vertical",
					onFinish: async (e) => {
						await o(e.username, e.password), s(a, { replace: !0 });
					},
					children: [
						/* @__PURE__ */ k(y.Item, {
							name: "username",
							label: "Username",
							rules: [{
								required: !0,
								message: "Required"
							}],
							children: /* @__PURE__ */ k(x, { autoComplete: "username" })
						}),
						/* @__PURE__ */ k(y.Item, {
							name: "password",
							label: "Password",
							rules: [{
								required: !0,
								message: "Required"
							}],
							children: /* @__PURE__ */ k(x.Password, { autoComplete: "current-password" })
						}),
						r,
						/* @__PURE__ */ k(y.Item, {
							style: { marginBottom: 0 },
							children: /* @__PURE__ */ k(p, {
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
function $({ when: e, redirect: t, children: n }) {
	return e ? n : /* @__PURE__ */ k(o, {
		to: t,
		replace: !0
	});
}
function fe({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = K();
	return /* @__PURE__ */ k($, {
		when: n,
		redirect: t,
		children: e
	});
}
function pe({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = K();
	return /* @__PURE__ */ k($, {
		when: !n,
		redirect: t,
		children: e
	});
}
//#endregion
//#region src/router/createAdminRouter.tsx
function me({ navItems: e, children: t, layoutProps: n, loginPath: r = "/login", homePath: i = "/", loginElement: a }) {
	return l([
		{
			path: r,
			element: /* @__PURE__ */ k(pe, {
				redirectTo: i,
				children: a ?? /* @__PURE__ */ k(Q, { afterLoginPath: i })
			})
		},
		{
			path: "/",
			element: /* @__PURE__ */ k(fe, {
				redirectTo: r,
				children: /* @__PURE__ */ k(Z, {
					navItems: e,
					loginPath: r,
					...n
				})
			}),
			children: t
		},
		{
			path: "*",
			element: /* @__PURE__ */ k(o, {
				to: i,
				replace: !0
			})
		}
	]);
}
//#endregion
//#region src/app/AdminApp.tsx
function he({ navItems: e, routes: t, authAdapter: n, layoutProps: r, loginPath: a, homePath: o, loginElement: s, theme: l }) {
	let u = i(() => me({
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
	return /* @__PURE__ */ k(H, {
		...l,
		children: /* @__PURE__ */ k(G, {
			adapter: n,
			children: /* @__PURE__ */ k(c, { router: u })
		})
	});
}
//#endregion
//#region src/pages/PlaceholderPage.tsx
function ge({ title: e }) {
	return /* @__PURE__ */ k(D.Title, {
		level: 4,
		children: e
	});
}
//#endregion
export { he as AdminApp, Z as AdminLayout, H as AppThemeProvider, G as AuthProvider, q as DensitySwitch, $ as Guard, pe as GuestOnly, Q as LoginPage, ge as PlaceholderPage, fe as Protected, J as ThemeSwitch, Y as ThemeToolbar, me as createAdminRouter, ae as createSessionStorageAuthAdapter, K as useAuth, U as useThemeMode };
