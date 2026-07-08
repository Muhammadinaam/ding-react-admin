import { Children as e, createContext as t, createElement as n, forwardRef as r, isValidElement as i, useCallback as a, useContext as o, useEffect as s, useMemo as c, useRef as l, useState as u } from "react";
import { Link as d, Navigate as f, Outlet as p, RouterProvider as m, createBrowserRouter as h, useLocation as g, useNavigate as _, useParams as v, useSearchParams as y } from "react-router-dom";
import { Alert as b, App as x, Avatar as S, Button as C, Card as w, ConfigProvider as T, DatePicker as E, Drawer as D, Dropdown as O, Flex as k, Form as A, Grid as j, Image as M, Input as N, InputNumber as P, Layout as F, Menu as I, Modal as ee, Popover as te, Segmented as ne, Select as L, Space as R, Spin as re, Steps as z, Switch as B, Table as ie, Tabs as V, TimePicker as H, Tooltip as ae, Typography as U, theme as W } from "antd";
import { Fragment as G, jsx as K, jsxs as q } from "react/jsx-runtime";
import { ArrowLeftOutlined as oe, CaretDownOutlined as se, CaretUpOutlined as ce, ColumnHeightOutlined as le, DeleteOutlined as ue, DesktopOutlined as de, EditOutlined as fe, LayoutOutlined as pe, LogoutOutlined as me, MenuOutlined as he, MoonOutlined as ge, PaperClipOutlined as _e, PlusOutlined as J, SearchOutlined as ve, SettingOutlined as ye, SunOutlined as be, UploadOutlined as xe, UserOutlined as Se } from "@ant-design/icons";
import { Controller as Ce, FormProvider as we, useFieldArray as Te, useForm as Ee, useFormContext as De, useFormState as Oe, useWatch as ke } from "react-hook-form";
import Ae from "dayjs";
import './index.css';//#region \0rolldown/runtime.js
var je = Object.create, Me = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, Pe = Object.getOwnPropertyNames, Fe = Object.getPrototypeOf, Ie = Object.prototype.hasOwnProperty, Le = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), Re = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = Pe(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !Ie.call(e, s) && s !== n && Me(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = Ne(t, s)) || r.enumerable
	});
	return e;
}, ze = (e, t, n) => (n = e == null ? {} : je(Fe(e)), Re(t || !e || !e.__esModule ? Me(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), Be = t(null);
function Ve(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "light" || t === "dark" || t === "system") return t;
	} catch {}
	return "system";
}
function He() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function Ue(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "comfortable" || t === "compact") return t;
	} catch {}
	return "comfortable";
}
var We = "ding-react-admin-theme-mode", Ge = "ding-react-admin-theme-density";
function Ke({ children: e, modeStorageKey: t = We, densityStorageKey: n = Ge }) {
	let [r, i] = u(() => Ve(t)), [a, o] = u(() => Ue(n)), [l, d] = u(He);
	s(() => {
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
		o(e);
		try {
			localStorage.setItem(n, e);
		} catch {}
	}, m = r === "system" ? l ? "dark" : "light" : r, h = c(() => {
		let e = m === "dark" ? W.darkAlgorithm : W.defaultAlgorithm;
		return { algorithm: a === "compact" ? [e, W.compactAlgorithm] : e };
	}, [m, a]), g = c(() => ({
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
	return /* @__PURE__ */ K(Be.Provider, {
		value: g,
		children: /* @__PURE__ */ K(T, {
			theme: h,
			children: e
		})
	});
}
function qe() {
	let e = o(Be);
	if (!e) throw Error("useThemeMode must be used within AppThemeProvider");
	return e;
}
//#endregion
//#region src/components/DensitySwitch.tsx
var Je = [{
	label: "Comfortable",
	value: "comfortable",
	icon: /* @__PURE__ */ K(pe, {})
}, {
	label: "Compact",
	value: "compact",
	icon: /* @__PURE__ */ K(le, {})
}];
function Ye() {
	let { density: e, setDensity: t } = qe();
	return /* @__PURE__ */ K(ne, {
		size: "small",
		value: e,
		options: Je,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeSwitch.tsx
var Xe = [
	{
		label: "Light",
		value: "light",
		icon: /* @__PURE__ */ K(be, {})
	},
	{
		label: "Dark",
		value: "dark",
		icon: /* @__PURE__ */ K(ge, {})
	},
	{
		label: "Auto",
		value: "system",
		icon: /* @__PURE__ */ K(de, {})
	}
];
function Ze() {
	let { mode: e, setMode: t } = qe();
	return /* @__PURE__ */ K(ne, {
		size: "small",
		value: e,
		options: Xe,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeToolbar.tsx
function Qe() {
	let { token: e } = W.useToken();
	return /* @__PURE__ */ K(te, {
		placement: j.useBreakpoint().lg ? "bottomRight" : "bottom",
		trigger: "click",
		content: /* @__PURE__ */ q(R, {
			orientation: "vertical",
			size: "middle",
			style: {
				minWidth: 240,
				maxWidth: "min(92vw, 320px)"
			},
			children: [/* @__PURE__ */ K(Ze, {}), /* @__PURE__ */ K(Ye, {})]
		}),
		styles: { content: { padding: e.paddingSM } },
		children: /* @__PURE__ */ K(C, {
			type: "default",
			icon: /* @__PURE__ */ K(ye, {}),
			"aria-label": "Display and theme settings"
		})
	});
}
//#endregion
//#region src/components/NavMenuSearch.tsx
function $e({ value: e, onChange: t, placeholder: n = "Search menu…", variant: r = "on-dark" }) {
	let { token: i } = W.useToken(), a = r === "on-dark";
	return /* @__PURE__ */ K("div", {
		style: {
			flexShrink: 0,
			paddingInline: i.paddingSM,
			paddingBlock: i.paddingXS
		},
		children: /* @__PURE__ */ K(T, {
			theme: a ? { token: { colorTextPlaceholder: "rgba(255, 255, 255, 0.45)" } } : void 0,
			children: /* @__PURE__ */ K(N, {
				allowClear: !0,
				size: "small",
				value: e,
				onChange: (e) => {
					t(e.target.value);
				},
				placeholder: n,
				prefix: /* @__PURE__ */ K(ve, { style: { color: a ? "rgba(255, 255, 255, 0.45)" : i.colorTextDescription } }),
				"aria-label": n,
				styles: {
					input: a ? { color: "rgba(255, 255, 255, 0.88)" } : void 0,
					clear: a ? { color: "rgba(255, 255, 255, 0.45)" } : void 0
				},
				style: {
					background: a ? "rgba(255, 255, 255, 0.08)" : i.colorFillTertiary,
					borderColor: "transparent",
					boxShadow: "none"
				}
			})
		})
	});
}
//#endregion
//#region src/components/ScrollableArea.tsx
var et = r(function({ children: e, className: t, style: n, variant: r = "default" }, i) {
	let { token: a } = W.useToken(), o = r === "on-dark" ? "rgba(255, 255, 255, 0.22)" : a.colorTextQuaternary, s = r === "on-dark" ? "rgba(255, 255, 255, 0.38)" : a.colorTextTertiary;
	return /* @__PURE__ */ K("div", {
		ref: i,
		className: ["ding-admin-scroll", t].filter(Boolean).join(" "),
		style: {
			overflow: "auto",
			...n,
			"--ding-scroll-thumb": o,
			"--ding-scroll-thumb-hover": s
		},
		children: e
	});
}), tt = t(null), nt = "User";
function rt(e) {
	return e.getUserLabel?.() ?? nt;
}
function it({ children: e, adapter: t }) {
	let [n, r] = u(() => t.getToken()), [i, o] = u(() => rt(t)), s = a(async (e) => {
		await t.login(e), r(t.getToken()), o(rt(t));
	}, [t]), l = a(() => {
		t.logout(), r(t.getToken()), o(rt(t));
	}, [t]), d = c(() => ({
		isAuthenticated: !!n,
		userLabel: i,
		login: s,
		logout: l
	}), [
		n,
		i,
		s,
		l
	]);
	return /* @__PURE__ */ K(tt.Provider, {
		value: d,
		children: e
	});
}
function at() {
	let e = o(tt);
	if (!e) throw Error("useAuth must be used within AuthProvider");
	return e;
}
var ot = "ding-react-admin-auth";
function st(e = ot) {
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
var ct = t(null);
function lt({ children: e, can: t }) {
	let n = c(() => t, [t]);
	return /* @__PURE__ */ K(ct.Provider, {
		value: n,
		children: e
	});
}
function Y() {
	let e = o(ct);
	if (!e) throw Error("usePermissions must be used within PermissionsProvider");
	return e;
}
function ut(e) {
	return (t) => e()?.includes(t) ?? !1;
}
function dt(e) {
	let t = Y();
	return a(() => t(e), [t, e]);
}
//#endregion
//#region src/layouts/navFilter.ts
function ft(e) {
	let { label: t } = e;
	return typeof t == "string" ? t : typeof t == "number" ? String(t) : "";
}
function pt(e, t) {
	let n = t.trim().toLowerCase();
	if (!n) return e;
	function r(e) {
		let t = [];
		for (let i of e) {
			let e = ft(i).toLowerCase().includes(n);
			if (i.children?.length) {
				let n = r(i.children);
				e ? t.push(i) : n.length > 0 && t.push({
					...i,
					children: n
				});
			} else e && t.push(i);
		}
		return t;
	}
	return r(e);
}
function mt(e) {
	let t = [];
	function n(e) {
		for (let r of e) r.children?.length && (t.push(r.path), n(r.children));
	}
	return n(e), t;
}
//#endregion
//#region src/components/NavMenuLabel.tsx
function ht({ label: e, title: t }) {
	return t ? /* @__PURE__ */ K(ae, {
		title: t,
		placement: "right",
		mouseEnterDelay: 1,
		destroyOnHidden: !0,
		children: /* @__PURE__ */ K("span", {
			className: "ding-admin-menu-label",
			children: e
		})
	}) : /* @__PURE__ */ K("span", {
		className: "ding-admin-menu-label",
		children: e
	});
}
//#endregion
//#region src/layouts/navMenuItems.tsx
function gt(e, t) {
	let n = t?.showLabelTooltip !== !1;
	return e.map((e) => {
		let r = e.Icon, i = r ? /* @__PURE__ */ K(r, {}) : void 0, a = ft(e), o = a && n ? /* @__PURE__ */ K(ht, {
			label: e.label,
			title: a
		}) : e.label, s = !n && a ? { title: a } : {};
		return e.children?.length ? {
			key: e.path,
			icon: i,
			label: o,
			...s,
			children: gt(e.children, t)
		} : {
			key: e.path,
			icon: i,
			label: o,
			...s
		};
	});
}
//#endregion
//#region src/permissions/resourcePermissions.ts
function X(e, t, n) {
	if (!t) return !0;
	let r = t[n];
	return n === "read" && !r && (r = t.list), r ? e(r) : !1;
}
function _t(e, t) {
	return e.map((e) => {
		if (e.children?.length) {
			let n = _t(e.children, t);
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
var vt = "#001529", yt = "ding-react-admin-sider-collapsed";
function bt(e) {
	try {
		return localStorage.getItem(e) === "1";
	} catch {
		return !1;
	}
}
function xt() {
	return j.useBreakpoint().lg !== !0;
}
function St(e) {
	let t = /* @__PURE__ */ new Set();
	function n(e) {
		for (let r of e) r.children?.length ? n(r.children) : t.add(r.path);
	}
	return n(e), t;
}
function Ct(e, t) {
	function n(e) {
		for (let r of e) if (r.children?.length) {
			let e = n(r.children);
			if (e !== null) return [r.path, ...e];
		} else if (r.path === t) return [];
		return null;
	}
	return n(e) ?? [];
}
function wt({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a, navQuery: o, onNavQueryChange: s, showNavSearch: c, navSearchPlaceholder: l, scrollVariant: u, searchVariant: d }) {
	return /* @__PURE__ */ q(G, { children: [c && !n ? /* @__PURE__ */ K($e, {
		value: o,
		onChange: s,
		placeholder: l,
		variant: d
	}) : null, /* @__PURE__ */ K(et, {
		variant: u,
		style: {
			flex: 1,
			minHeight: 0,
			overflowY: "auto",
			overflowX: "hidden"
		},
		children: /* @__PURE__ */ K(Tt, {
			menuItems: e,
			selectedKeys: t,
			inlineCollapsed: n,
			openKeys: r,
			onOpenChange: i,
			onNavigate: a
		})
	})] });
}
function Tt({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a }) {
	return /* @__PURE__ */ K(I, {
		className: "ding-admin-nav-menu",
		mode: "inline",
		theme: "dark",
		inlineCollapsed: n,
		selectedKeys: t,
		tooltip: {
			placement: "right",
			mouseEnterDelay: 1
		},
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
function Et({ navItems: e, brand: t = "Admin", collapsedBrand: n = "A", mobileDrawerTitle: r, headerExtras: i, userMenuItems: o, onUserMenuClick: d, loginPath: f = "/login", siderCollapsedStorageKey: m = yt, navSearch: h = !0 }) {
	let v = _(), y = g(), { resolved: b } = qe(), x = b === "dark", { logout: w, userLabel: T } = at(), E = Y(), [k, A] = u(() => bt(m)), [j, M] = u(!1), N = xt(), { token: P } = W.useToken(), I = l(null), [ee, te] = u(""), ne = h !== !1, L = typeof h == "object" ? h.placeholder : void 0, R = r ?? t, re = () => {
		w(), v(f, { replace: !0 });
	}, z = a((e) => {
		A(e);
		try {
			localStorage.setItem(m, e ? "1" : "0");
		} catch {}
	}, [m]);
	s(() => {
		N || M(!1);
	}, [N]), s(() => {
		M(!1);
	}, [y.pathname]), s(() => {
		I.current?.scrollTo({
			top: 0,
			left: 0
		});
	}, [y.pathname]), s(() => {
		k && te("");
	}, [k]);
	let B = c(() => _t(e, E), [e, E]), ie = ee.trim(), V = ie.length > 0, H = c(() => V ? pt(B, ie) : B, [
		B,
		ie,
		V
	]), ae = c(() => St(H), [H]), G = c(() => gt(H, { showLabelTooltip: !k }), [H, k]), oe = c(() => mt(H), [H]), se = c(() => Ct(B, y.pathname), [B, y.pathname]), [ce, le] = u(() => Ct(B, y.pathname));
	s(() => {
		le((e) => [...new Set([...e, ...se])]);
	}, [se]);
	let ue = a((e) => {
		le(e);
	}, []), de = V ? oe : ce, fe = a((e) => {
		te(e);
	}, []), pe = c(() => [{
		key: "logout",
		icon: /* @__PURE__ */ K(me, {}),
		label: "Log out",
		danger: !0
	}], []), ge = o ?? pe, _e = (e) => {
		if (d) {
			d(e);
			return;
		}
		e.key === "logout" && re();
	}, J = x ? P.colorBgContainer : vt, ve = x ? "default" : "on-dark", ye = x ? "app" : "on-dark", be = [y.pathname], xe = (e) => {
		ae.has(e) && (v(e), N && M(!1));
	};
	return /* @__PURE__ */ q(F, {
		style: {
			height: "100vh",
			width: "100%",
			overflow: "hidden",
			background: P.colorBgLayout
		},
		children: [
			!N && /* @__PURE__ */ K(F.Sider, {
				collapsible: !0,
				collapsed: k,
				onCollapse: z,
				collapsedWidth: 64,
				style: {
					background: J,
					height: "100vh",
					overflow: "hidden",
					borderInlineEnd: x ? `1px solid ${P.colorSplit}` : void 0
				},
				children: /* @__PURE__ */ q("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						height: "100%",
						overflow: "hidden"
					},
					children: [/* @__PURE__ */ K("div", {
						style: {
							height: 64,
							flexShrink: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontWeight: 600
						},
						children: /* @__PURE__ */ K(U.Text, {
							strong: !0,
							style: { color: P.colorTextLightSolid },
							children: k ? n : t
						})
					}), /* @__PURE__ */ K(wt, {
						menuItems: G,
						selectedKeys: be,
						inlineCollapsed: k,
						openKeys: de,
						onOpenChange: ue,
						onNavigate: xe,
						navQuery: ee,
						onNavQueryChange: fe,
						showNavSearch: ne,
						navSearchPlaceholder: L,
						scrollVariant: ve,
						searchVariant: ye
					})]
				})
			}),
			N && /* @__PURE__ */ K(D, {
				title: /* @__PURE__ */ K(U.Text, {
					strong: !0,
					style: { color: P.colorTextLightSolid },
					children: R
				}),
				placement: "left",
				size: 280,
				onClose: () => M(!1),
				open: j,
				styles: {
					header: {
						background: J,
						borderBottom: `1px solid ${P.colorSplit}`
					},
					body: {
						padding: 0,
						background: J
					}
				},
				destroyOnHidden: !0,
				children: /* @__PURE__ */ K("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						height: "100%",
						overflow: "hidden"
					},
					children: /* @__PURE__ */ K(wt, {
						menuItems: G,
						selectedKeys: be,
						inlineCollapsed: !1,
						openKeys: de,
						onOpenChange: ue,
						onNavigate: xe,
						navQuery: ee,
						onNavQueryChange: fe,
						showNavSearch: ne,
						navSearchPlaceholder: L,
						scrollVariant: ve,
						searchVariant: ye
					})
				})
			}),
			/* @__PURE__ */ q(F, {
				style: {
					minWidth: 0,
					flex: 1,
					height: "100vh",
					overflow: "hidden",
					display: "flex",
					flexDirection: "column"
				},
				children: [/* @__PURE__ */ q(F.Header, {
					style: {
						background: P.colorBgContainer,
						paddingInline: P.paddingLG,
						display: "flex",
						alignItems: "center",
						gap: P.marginSM,
						lineHeight: "normal",
						flexShrink: 0
					},
					children: [
						N && /* @__PURE__ */ K(C, {
							type: "text",
							icon: /* @__PURE__ */ K(he, {}),
							onClick: () => M(!0),
							"aria-label": "Open navigation"
						}),
						/* @__PURE__ */ K("div", { style: {
							flex: 1,
							minWidth: 0
						} }),
						i,
						/* @__PURE__ */ K(Qe, {}),
						/* @__PURE__ */ K(O, {
							menu: {
								items: ge,
								onClick: _e
							},
							trigger: ["click"],
							children: /* @__PURE__ */ q(C, {
								type: "text",
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: P.marginXS,
									maxWidth: N ? 44 : void 0,
									paddingInline: N ? P.paddingXS : void 0
								},
								"aria-label": "Account menu",
								children: [/* @__PURE__ */ K(S, {
									size: "small",
									icon: /* @__PURE__ */ K(Se, {})
								}), !N && /* @__PURE__ */ K(U.Text, {
									type: "secondary",
									ellipsis: !0,
									style: { maxWidth: 160 },
									children: T
								})]
							})
						})
					]
				}), /* @__PURE__ */ K(F.Content, {
					style: {
						minWidth: 0,
						flex: 1,
						minHeight: 0,
						display: "flex",
						flexDirection: "column"
					},
					children: /* @__PURE__ */ K(et, {
						ref: I,
						style: {
							margin: N ? P.marginSM : P.marginLG,
							flex: 1,
							minHeight: 0,
							overflow: "auto"
						},
						children: /* @__PURE__ */ K(p, {})
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/router/guards.tsx
function Dt({ when: e, redirect: t, children: n }) {
	return e ? n : /* @__PURE__ */ K(f, {
		to: t,
		replace: !0
	});
}
function Ot({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = at();
	return /* @__PURE__ */ K(Dt, {
		when: n,
		redirect: t,
		children: e
	});
}
function kt({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = at();
	return /* @__PURE__ */ K(Dt, {
		when: !n,
		redirect: t,
		children: e
	});
}
function At({ permission: e, redirect: t, children: n }) {
	return /* @__PURE__ */ K(Dt, {
		when: Y()(e),
		redirect: t,
		children: n
	});
}
//#endregion
//#region src/router/routeAccess.ts
function jt(e) {
	return e.access ?? "protected";
}
function Mt(e) {
	let t = [], n = [], r = [];
	for (let i of e) {
		let e = jt(i);
		e === "guest" ? t.push(i) : e === "public" ? n.push(i) : r.push(i);
	}
	return {
		guest: t,
		public: n,
		protected: r
	};
}
function Nt(e) {
	return e.replace(/^\/+/, "");
}
function Pt(e) {
	return `/${Nt(e)}`;
}
function Ft(e, t) {
	let { guest: n, protected: r } = Mt(e), i = n.find((e) => "path" in e && e.path), a = r.find((e) => "index" in e && e.index), o = r.find((e) => "path" in e && e.path), s = t?.unauthenticated;
	!s && i && "path" in i && i.path && (s = Pt(i.path));
	let c = t?.afterLogin;
	if (c || (a ? c = "/" : o && "path" in o && o.path && (c = Pt(o.path))), r.length > 0 && !s) throw Error("createAdminRouter: protected routes require redirects.unauthenticated or a guest route (access: \"guest\").");
	if (n.length > 0 && !c) throw Error("createAdminRouter: guest routes require redirects.afterLogin or a protected route (index or path).");
	return {
		loginPath: s ?? "/",
		homePath: c ?? "/"
	};
}
function It(e) {
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
function Lt({ navItems: e, children: t, layoutProps: n, redirects: r }) {
	let { loginPath: i, homePath: a } = Ft(t, r), { guest: o, public: s, protected: c } = Mt(t), l = [];
	for (let e of o) !("path" in e) || !e.path || l.push({
		path: Nt(e.path),
		element: /* @__PURE__ */ K(kt, {
			redirectTo: a,
			children: e.element
		})
	});
	for (let e of s) !("path" in e) || !e.path || l.push({
		path: Nt(e.path),
		element: e.element
	});
	return c.length > 0 && l.push({
		path: "/",
		element: /* @__PURE__ */ K(Ot, {
			redirectTo: i,
			children: /* @__PURE__ */ K(Et, {
				navItems: e,
				loginPath: i,
				...n
			})
		}),
		children: c.map(It)
	}), l.push({
		path: "*",
		element: /* @__PURE__ */ K(f, {
			to: a,
			replace: !0
		})
	}), h(l);
}
//#endregion
//#region src/app/AdminApp.tsx
function Rt({ navItems: e, routes: t, authRedirects: n, layoutProps: r, theme: i }) {
	let a = c(() => Lt({
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
	return /* @__PURE__ */ K(Ke, {
		...i,
		children: /* @__PURE__ */ K(m, { router: a })
	});
}
//#endregion
//#region src/context/DataProvider.tsx
var zt = t(null);
function Bt({ children: e, value: t }) {
	let n = c(() => t, [t]);
	return /* @__PURE__ */ K(zt.Provider, {
		value: n,
		children: e
	});
}
function Vt() {
	let e = o(zt);
	if (!e) throw Error("useDataProvider must be used within DataProvider");
	return e;
}
//#endregion
//#region src/data/resourceHandlers.ts
function Ht(e) {
	return "handlers" in e ? e : { handlers: e };
}
function Ut(e, t, n) {
	if (!(!e || !t) && !X(e, t, n)) throw Error("Forbidden");
}
function Wt(e, t) {
	let { can: n, guard: r, parseFormError: i } = t ?? {}, a = (t) => {
		let n = e[t];
		if (!n) throw Error(`Unknown resource: ${t}`);
		return Ht(n);
	};
	return {
		async getList(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "list"), Ut(n, o, "list"), i.getList(t);
		},
		async getOne(e, t, i) {
			let { handlers: o, permissions: s } = a(e);
			return r?.(e, "read"), Ut(n, s, "read"), o.getOne(t, i);
		},
		async create(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "add"), Ut(n, o, "add"), i.create(t);
		},
		async update(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "change"), Ut(n, o, "change"), i.update(t);
		},
		async delete(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "delete"), Ut(n, o, "delete"), i.delete(t);
		},
		parseFormError: i
	};
}
//#endregion
//#region src/data/abortError.ts
function Gt(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return t.name === "AbortError" || t.name === "CanceledError" || t.code === "ERR_CANCELED";
}
//#endregion
//#region src/data/parseFormErrorHelpers.ts
var Kt = "Expected HTTP 400 with a JSON object such as `{ \"field_name\": [\"message\"] }` or `{ \"non_field_errors\": [\"message\"] }`.", qt = 300;
function Z(e) {
	if (typeof e == "string") return [e];
	if (Array.isArray(e)) {
		let t = e.filter((e) => typeof e == "string");
		if (t.length) return t;
	}
	return [];
}
function Jt(e) {
	return e.length === 1 ? e[0] : e;
}
function Yt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Xt(e) {
	return typeof Response < "u" && e instanceof Response ? !0 : typeof e == "object" && !!e && typeof e.json == "function" && typeof e.status == "number" && e.headers != null;
}
function Zt(e, t) {
	if (t) return t;
	if (e === null) return "(no JSON body)";
	try {
		let t = JSON.stringify(e);
		return t.length > qt ? `${t.slice(0, qt)}…` : t;
	} catch {
		return String(e);
	}
}
function Qt(e, t) {
	return `Non-standard validation response. ${Kt} Received: ${Zt(e, t?.hint)}`;
}
function $t(e) {
	if (!e || typeof e != "object") return null;
	let t = e.response;
	if (!t || typeof t != "object") return null;
	let n = t.status;
	return typeof n == "number" && (n === 400 || n === 422) ? n : null;
}
function en(e) {
	if (!e || typeof e != "object") return null;
	let t = e.response;
	return Xt(t) ? t.headers.get("content-type") : null;
}
function tn(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (Yt(t.body)) return t.body;
	if (Yt(t.data)) return t.data;
	let n = t.response;
	if (n && typeof n == "object" && !Array.isArray(n)) {
		let e = n.data;
		if (Yt(e)) return e;
	}
	return null;
}
function nn(e) {
	if (Yt(e)) return e;
	if (Array.isArray(e)) {
		let t = Z(e);
		return t.length ? { non_field_errors: Jt(t) } : null;
	}
	return null;
}
async function rn(e) {
	let t = tn(e);
	if (t) return t;
	if (!e || typeof e != "object") return null;
	let n = e.response;
	if (!Xt(n)) return null;
	let r = n.headers.get("content-type");
	if (!r || !/application\/json/i.test(r)) return null;
	try {
		return nn(await n.clone().json());
	} catch {
		return null;
	}
}
function an(e) {
	return Array.isArray(e) ? e.some((e) => e && typeof e == "object" && !Array.isArray(e) && Object.values(e).some((e) => Z(e).length > 0)) : !1;
}
function on(e, t, n) {
	t.forEach((t, r) => {
		if (!(!t || typeof t != "object" || Array.isArray(t))) for (let [i, a] of Object.entries(t)) {
			let t = Z(a);
			t.length && (n[`${e}.${r}.${i}`] = Jt(t));
		}
	});
}
function sn(e, t) {
	return {
		fields: Object.keys(e).length ? e : void 0,
		global: t.length ? t : void 0
	};
}
var cn = new Set(["non_field_errors", "detail"]);
function ln(e) {
	let t = {}, n = [];
	for (let [r, i] of Object.entries(e)) {
		if (cn.has(r)) {
			n.push(...Z(i));
			continue;
		}
		if (an(i)) {
			on(r, i, t);
			continue;
		}
		let e = Z(i);
		e.length && (t[r] = Jt(e));
	}
	return !Object.keys(t).length && !n.length ? null : sn(t, n);
}
function un(e, t) {
	let n = tn(e);
	return n ? ln(n) : null;
}
function dn(e, t, n) {
	let r = tn(e);
	if (!r) return null;
	let i = n?.camelCase ?? !0, a = n?.fieldMap, o = {}, s = [];
	n?.includeSummary && (s.push(...Z(r.title)), s.push(...Z(r.message)));
	let c = r.errors;
	if (c && typeof c == "object" && !Array.isArray(c)) for (let [e, t] of Object.entries(c)) {
		let n = a?.[e] ?? (i ? mn(e) : e), r = Z(t);
		r.length && (o[n] = Jt(r));
	}
	return !Object.keys(o).length && !s.length ? null : sn(o, s);
}
function fn(e, t, n) {
	let r = tn(e);
	if (!r) return null;
	let i = {}, a = [], o = n?.fieldMap, s = r.errors;
	if (Array.isArray(s)) for (let e of s) {
		if (!e || typeof e != "object") continue;
		let t = e, n = typeof t.path == "string" && t.path || typeof t.param == "string" && t.param || typeof t.field == "string" && t.field, r = Z(t.msg)[0] ?? Z(t.message)[0];
		r && (n ? pn(i, o?.[n] ?? n, r) : a.push(r));
	}
	else if (s && typeof s == "object") for (let [e, t] of Object.entries(s)) {
		let n = o?.[e] ?? e, r = Z(t);
		r.length && (i[n] = Jt(r));
	}
	let c = r.details;
	if (Array.isArray(c)) for (let e of c) {
		if (!e || typeof e != "object") continue;
		let t = e, n = (Array.isArray(t.path) ? t.path : []).map((e) => String(e)).join("."), r = Z(t.message)[0];
		if (r) if (n) {
			let e = o?.[n] ?? n;
			i[e] = r;
		} else a.push(r);
	}
	return a.push(...Z(r.error)), !Object.keys(i).length && !a.length ? null : sn(i, a);
}
function pn(e, t, n) {
	let r = e[t];
	if (!r) {
		e[t] = n;
		return;
	}
	e[t] = Array.isArray(r) ? [...r, n] : [r, n];
}
function mn(e) {
	return e && e.charAt(0).toLowerCase() + e.slice(1);
}
//#endregion
//#region src/data/inMemoryList.ts
function hn(e, t) {
	return e === t || String(e) === String(t);
}
function gn(e, t) {
	let n = e.find((e) => hn(e.id, t));
	if (!n) throw Error("Not found");
	return n;
}
function _n(e, t) {
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
function vn(e, t) {
	return t == null || t === "" ? !0 : Array.isArray(t) ? t.length === 0 ? !0 : Array.isArray(e) ? t.some((t) => e.includes(t)) : t.includes(e) : Array.isArray(e) ? e.includes(t) : typeof t == "string" && typeof e == "string" ? e.toLowerCase().includes(t.toLowerCase()) : e === t;
}
function yn(e, t) {
	return t ? e.filter((e) => Object.entries(t).every(([t, n]) => vn(e[t], n))) : e;
}
function bn(e, t, n) {
	let r = (t - 1) * n;
	return {
		data: e.slice(r, r + n),
		total: e.length
	};
}
function xn(e, t) {
	let { pagination: n, sort: r, filter: i } = t, a = yn(e, i);
	if (r) {
		let e = Array.isArray(r) ? r : [r];
		e.length > 0 && e[0]?.field && (a = _n(a, e));
	}
	return n ? bn(a, n.page, n.perPage) : {
		data: a,
		total: a.length
	};
}
//#endregion
//#region src/data/createMemoryResourceHandlers.ts
function Sn(e) {
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
			return xn(t(e.scopeList ? e.scopeList(e.getRows(), n) : e.getRows()), n);
		},
		async getOne(t, n) {
			return { data: gn(e.getRows(), t) };
		},
		async create(t) {
			let r = n(t, e.nextId());
			return e.getRows().push(r), { data: r };
		},
		async update({ id: t, data: n }) {
			let i = gn(e.getRows(), t), a = r(i, n);
			return Object.assign(i, a), { data: i };
		},
		async delete(t) {
			let n = e.getRows(), r = n.findIndex((e) => hn(e.id, t));
			if (r < 0) return { data: null };
			let [i] = n.splice(r, 1);
			return e.afterDelete?.(i), { data: i };
		}
	};
}
//#endregion
//#region src/data/createRestResourceHandlers.ts
function Cn(e) {
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
function wn(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function Tn(e) {
	let t = wn(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function En(e) {
	let t = wn(e);
	if (t.length !== 0) return t.map((e) => `${e.field} ${e.order === "DESC" ? "desc" : "asc"}`).join(",");
}
function Dn(e) {
	let t = wn(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
//#endregion
//#region src/components/AuthAlternateLink.tsx
function On({ prompt: e, linkText: t, to: n }) {
	return /* @__PURE__ */ q(U.Paragraph, {
		type: "secondary",
		style: {
			textAlign: "center",
			marginBottom: 0
		},
		children: [
			e,
			" ",
			/* @__PURE__ */ K(d, {
				to: n,
				children: t
			})
		]
	});
}
//#endregion
//#region src/layouts/AuthPageLayout.tsx
function kn({ children: e, brand: t, footer: n, showThemeToolbar: r = !0 }) {
	let { token: i } = W.useToken();
	return /* @__PURE__ */ q(k, {
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
			r ? /* @__PURE__ */ K(k, {
				justify: "flex-end",
				style: {
					flexShrink: 0,
					width: "100%",
					padding: 16,
					background: i.colorBgLayout
				},
				children: /* @__PURE__ */ K(Qe, {})
			}) : null,
			t ? /* @__PURE__ */ K("div", {
				style: {
					flexShrink: 0,
					textAlign: "center",
					padding: "0 24px 16px"
				},
				children: t
			}) : null,
			/* @__PURE__ */ K(et, {
				style: {
					flex: 1,
					minHeight: 0,
					width: "100%",
					background: i.colorBgLayout
				},
				children: /* @__PURE__ */ q(k, {
					vertical: !0,
					align: "center",
					justify: "flex-start",
					style: {
						width: "100%",
						minHeight: "100%",
						padding: "0 24px 24px"
					},
					children: [e, n ? /* @__PURE__ */ K("div", {
						style: {
							marginTop: 16,
							width: "100%",
							maxWidth: 520
						},
						children: n
					}) : null]
				})
			})
		]
	});
}
//#endregion
//#region src/pages/LoginPage.tsx
function An({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, brand: r, extraFields: i, showThemeToolbar: a = !0, afterLoginPath: o = "/", alternateAuth: s, footer: c }) {
	let { login: l } = at(), u = _();
	return /* @__PURE__ */ K(kn, {
		brand: r ?? n,
		footer: c ?? (s ? /* @__PURE__ */ K(On, {
			prompt: s.prompt ?? "Don't have an account?",
			linkText: s.linkText,
			to: s.to
		}) : null),
		showThemeToolbar: a,
		children: /* @__PURE__ */ q(w, {
			style: {
				width: "100%",
				maxWidth: 360
			},
			title: e,
			children: [t ? /* @__PURE__ */ K(U.Paragraph, {
				type: "secondary",
				style: { marginTop: 0 },
				children: t
			}) : null, /* @__PURE__ */ q(A, {
				layout: "vertical",
				onFinish: async (e) => {
					await l({
						username: String(e.username ?? ""),
						password: String(e.password ?? ""),
						...e
					}), u(o, { replace: !0 });
				},
				children: [
					/* @__PURE__ */ K(A.Item, {
						name: "username",
						label: "Username",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ K(N, { autoComplete: "username" })
					}),
					/* @__PURE__ */ K(A.Item, {
						name: "password",
						label: "Password",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ K(N.Password, { autoComplete: "current-password" })
					}),
					i,
					/* @__PURE__ */ K(A.Item, {
						style: { marginBottom: 0 },
						children: /* @__PURE__ */ K(C, {
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
function jn({ title: e }) {
	return /* @__PURE__ */ K(U.Title, {
		level: 3,
		style: { marginTop: 0 },
		children: e
	});
}
//#endregion
//#region src/crud/utils/sortQueryParam.ts
function Mn(e) {
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
function Nn(e) {
	return e.length === 0 ? null : e.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function Pn(e) {
	return new Map(e.map((e, t) => [e.field, t + 1]));
}
//#endregion
//#region src/crud/context/ListContext.tsx
var Fn = t(null);
function In({ children: e, toggleSort: t, sort: n }) {
	let [r, i] = u([]), o = c(() => new Set(n.map((e) => e.field)), [n]), s = c(() => new Map(n.map((e) => [e.field, e.order])), [n]), l = c(() => Pn(n), [n]), d = a((e) => (i((t) => {
		let n = t.findIndex((t) => t.key === e.key);
		if (n < 0) return [...t, e];
		if (t[n] === e) return t;
		let r = [...t];
		return r[n] = e, r;
	}), () => {
		i((t) => t.filter((t) => t.key !== e.key));
	}), []), f = c(() => ({
		columns: r,
		toggleSort: t,
		sortFields: o,
		sortOrders: s,
		sortPriorities: l,
		registerColumn: d
	}), [
		r,
		t,
		o,
		s,
		l,
		d
	]);
	return /* @__PURE__ */ K(Fn.Provider, {
		value: f,
		children: e
	});
}
function Ln() {
	let e = o(Fn);
	if (!e) throw Error("Column components must be used within ResourceList");
	return e;
}
function Q(e) {
	let { registerColumn: t } = Ln();
	s(() => t(e), [t, e]);
}
//#endregion
//#region src/crud/context/FilterContext.tsx
var Rn = t(null);
function zn({ children: e, values: t, setFilterValue: n }) {
	let [r, i] = u([]), o = a((e) => (i((t) => {
		let n = t.findIndex((t) => t.key === e.key);
		if (n < 0) return [...t, e];
		if (t[n] === e) return t;
		let r = [...t];
		return r[n] = e, r;
	}), () => {
		i((t) => t.filter((t) => t.key !== e.key));
	}), []), s = c(() => ({
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
	return /* @__PURE__ */ K(Rn.Provider, {
		value: s,
		children: e
	});
}
function Bn() {
	return o(Rn);
}
function Vn(e) {
	let t = Bn()?.registerFilter;
	s(() => {
		if (t) return t(e);
	}, [t, e]);
}
//#endregion
//#region src/crud/context/FormContext.tsx
var Hn = t(null);
function Un({ children: e, resource: t, isNew: n, disabled: r }) {
	return /* @__PURE__ */ K(Hn.Provider, {
		value: {
			resource: t,
			isNew: n,
			disabled: r
		},
		children: e
	});
}
function Wn() {
	return o(Hn);
}
//#endregion
//#region src/crud/context/FormSectionContext.tsx
var Gn = t(null);
function Kn({ sourcesRef: e, children: t }) {
	return /* @__PURE__ */ K(Gn.Provider, {
		value: e,
		children: t
	});
}
function qn() {
	return o(Gn);
}
//#endregion
//#region src/crud/context/PayloadFieldsContext.tsx
var Jn = t(null);
function Yn({ children: e, fieldsRef: t }) {
	return /* @__PURE__ */ K(Jn.Provider, {
		value: t,
		children: e
	});
}
function Xn() {
	return o(Jn);
}
function Zn(e, t = !0) {
	let n = Xn();
	s(() => {
		if (!(!t || !n)) return n.current.add(e), () => {
			n.current.delete(e);
		};
	}, [
		n,
		e,
		t
	]);
}
function Qn(e, t = !0) {
	let n = qn();
	s(() => {
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
var $n = t(null);
function er({ children: e, registryRef: t }) {
	return /* @__PURE__ */ K($n.Provider, {
		value: t,
		children: e
	});
}
function tr() {
	return o($n);
}
function nr(e, t, n, r, i = !0) {
	let a = tr();
	s(() => {
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
function rr({ errors: e }) {
	return e.length ? e.length === 1 ? /* @__PURE__ */ K(b, {
		type: "error",
		title: e[0],
		showIcon: !0,
		style: { marginBottom: 16 }
	}) : /* @__PURE__ */ K(b, {
		type: "error",
		title: "Could not save",
		showIcon: !0,
		style: { marginBottom: 16 },
		description: /* @__PURE__ */ K("ul", {
			style: {
				margin: 0,
				paddingLeft: 20
			},
			children: e.map((e) => /* @__PURE__ */ K("li", { children: e }, e))
		})
	}) : null;
}
//#endregion
//#region src/crud/utils/getFormValue.ts
function ir(e, t) {
	let n = t.split("."), r = e;
	for (let e of n) {
		if (typeof r != "object" || !r) return;
		r = r[e];
	}
	return r;
}
//#endregion
//#region src/crud/utils/setFormValue.ts
function ar(e, t, n) {
	let r = t.split("."), i = e;
	for (let e = 0; e < r.length - 1; e++) {
		let t = r[e], n = i[t];
		(typeof n != "object" || !n || Array.isArray(n)) && (i[t] = {}), i = i[t];
	}
	i[r[r.length - 1]] = n;
}
//#endregion
//#region src/crud/utils/buildFormPayload.ts
function or(e, t) {
	if (t.length === 0) return { ...e };
	let n = {};
	for (let r of t) {
		let t = ir(e, r);
		t !== void 0 && ar(n, r, t);
	}
	return n;
}
//#endregion
//#region src/crud/utils/buildInlineRowsPayload.ts
function sr(e, t, n) {
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
function cr(e) {
	return e instanceof Blob ? !0 : Array.isArray(e) ? e.some(cr) : e && typeof e == "object" ? Object.values(e).some(cr) : !1;
}
//#endregion
//#region src/crud/utils/uploadReferenceUtils.ts
function lr(e) {
	return /^https?:\/\//i.test(e) || e.startsWith("/media/");
}
function ur(e, t) {
	if (!t) return e;
	if (typeof e == "string") return lr(e) ? void 0 : e;
	if (Array.isArray(e)) return e.map((e) => ur(e, t)).filter((e) => e !== void 0);
	if (e && typeof e == "object" && !(e instanceof Blob)) {
		let n = {};
		for (let [r, i] of Object.entries(e)) {
			let e = ur(i, t);
			e !== void 0 && (n[r] = e);
		}
		return n;
	}
	return e;
}
function dr(e, t = !0) {
	return ur(e, t);
}
//#endregion
//#region src/crud/utils/toFormData.ts
function fr(e, t, n, r) {
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
			if (r.skipExistingUploadUrls && lr(n)) return;
			e.append(t, n);
			return;
		}
		if (Array.isArray(n)) {
			n.forEach((n, i) => {
				fr(e, `${t}[${i}]`, n, r);
			});
			return;
		}
		if (typeof n == "object") {
			for (let [i, a] of Object.entries(n)) fr(e, `${t}[${i}]`, a, r);
			return;
		}
		e.append(t, String(n));
	}
}
function pr(e, t) {
	let n = { skipExistingUploadUrls: t?.skipExistingUploadUrls ?? !0 }, r = new FormData();
	for (let [t, i] of Object.entries(e)) fr(r, t, i, n);
	return r;
}
//#endregion
//#region src/crud/utils/prepareFormSubmitBody.ts
function mr(e, t) {
	let n = t?.skipExistingUploadUrls ?? !0;
	return cr(e) ? pr(e, t) : dr(e, n);
}
//#endregion
//#region src/crud/utils/buildResourceFormSubmitBody.ts
function hr(e, t, n, r) {
	let i = or(e, t);
	if (n) for (let t of n) {
		let n = e[t.field], r = t.payloadKey ?? t.field;
		i[r] = sr(n, t.sources, { transformRows: t.transformRows });
	}
	return mr(i, r);
}
//#endregion
//#region src/crud/utils/formErrors.ts
function gr(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function _r(e) {
	return Array.isArray(e) ? e.join(", ") : e;
}
function vr(e, t, n) {
	if (t.has(e)) return !0;
	let r = e.match(/^([^.]+)\.(\d+)\.([^.]+)$/);
	if (!r) return !1;
	let [, i, , a] = r;
	return n.get(i)?.sources.includes(a) ?? !1;
}
function yr(e, t, n) {
	let r = {}, i = [...gr(e.global)];
	for (let [a, o] of Object.entries(e.fields ?? {})) vr(a, t, n) ? r[a] = o : i.push(_r(o));
	return {
		fieldErrors: r,
		globalErrors: i
	};
}
function br(e, t) {
	for (let [n, r] of Object.entries(t)) e.setError(n, {
		type: "server",
		message: _r(r)
	});
}
function xr(e) {
	let t = en(e);
	if (t && !/application\/json/i.test(t)) return `non-JSON response (Content-Type: ${t})`;
}
async function Sr(e, t, n, r, i) {
	let a = await rn(n);
	if (a != null) {
		let n = e.parseFormError?.({ body: a }, r);
		if (n) {
			let e = new Set(i.payloadFields), r = /* @__PURE__ */ new Map();
			for (let e of i.inlineRegistry) r.set(e.field, e);
			let { fieldErrors: a, globalErrors: o } = yr(n, e, r);
			if (Object.keys(a).length || o.length) return br(t, a), {
				handled: !0,
				globalErrors: o
			};
		}
		return {
			handled: !0,
			globalErrors: [Qt(a)]
		};
	}
	return $t(n) == null ? {
		handled: !1,
		globalErrors: []
	} : {
		handled: !0,
		globalErrors: [Qt(null, { hint: xr(n) })]
	};
}
//#endregion
//#region src/crud/utils/useAbortableEffect.ts
function Cr(e, t) {
	s(() => {
		let t = new AbortController();
		return e(t.signal), () => t.abort();
	}, t);
}
//#endregion
//#region src/crud/utils/useFormRecord.ts
function wr({ dp: e, resource: t, id: n, isNew: r, form: i, message: o, defaultValues: s, enabled: c = !0 }) {
	let [l, d] = u(!r), [f, p] = u(0), m = a(async (a) => {
		if (r || !n) {
			s ? i.reset({ ...s }) : i.reset({}), d(!1);
			return;
		}
		d(!0);
		try {
			let r = await e.getOne(t, n, { signal: a });
			if (a?.aborted) return;
			i.reset(r.data), p((e) => e + 1);
		} catch (e) {
			Gt(e) || o.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			a?.aborted || d(!1);
		}
	}, [
		e,
		t,
		n,
		r,
		i,
		o,
		s
	]);
	return Cr((e) => {
		if (c) return m(e);
	}, [c, m]), {
		loading: l,
		formVersion: f
	};
}
function Tr({ dp: e, resource: t, id: n, isNew: r, form: i, message: o, payloadFieldsRef: s, inlineRegistryRef: c, setGlobalErrors: l, onSuccess: d }) {
	let [f, p] = u(!1);
	return {
		onSubmit: a(async (a) => {
			l([]), p(!0);
			try {
				let i = hr(a, Array.from(s.current), c.current.values()), l;
				if (r) l = (await e.create(t, i)).data, o.success("Created");
				else if (n) l = (await e.update(t, {
					id: n,
					data: i
				})).data, o.success("Updated");
				else return;
				d?.(l);
			} catch (n) {
				let { handled: a, globalErrors: u } = await Sr(e, i, n, {
					resource: t,
					mutation: r ? "create" : "update",
					inlineFieldPaths: Array.from(c.current.keys())
				}, {
					payloadFields: s.current,
					inlineRegistry: c.current.values()
				});
				a ? (l(u), o.error(u[0] ?? "Save failed.")) : (l([]), o.error(n instanceof Error ? n.message : "Save failed"));
			} finally {
				p(!1);
			}
		}, [
			e,
			t,
			n,
			r,
			i,
			o,
			s,
			c,
			l,
			d
		]),
		saving: f
	};
}
//#endregion
//#region src/crud/ResourceRecordForm.tsx
function Er({ resource: e, id: t, children: r, defaultValues: i, enabled: a = !0, canSave: o = !0, onCancel: s, cancelHref: c, onSuccess: f, loadingMode: p = "overlay" }) {
	let m = t === "new" || !t, h = m ? void 0 : t, g = Vt(), { message: _ } = x.useApp(), v = l(/* @__PURE__ */ new Set()), y = l(/* @__PURE__ */ new Map()), [b, S] = u([]), w = Ee({ defaultValues: i }), { loading: T, formVersion: E } = wr({
		dp: g,
		resource: e,
		id: h,
		isNew: m,
		form: w,
		message: _,
		defaultValues: i,
		enabled: a
	}), { onSubmit: D, saving: O } = Tr({
		dp: g,
		resource: e,
		id: h,
		isNew: m,
		form: w,
		message: _,
		payloadFieldsRef: v,
		inlineRegistryRef: y,
		setGlobalErrors: S,
		onSuccess: f
	}), k = T || O, j = () => {
		w.handleSubmit(D, () => {
			_.warning("Please fix the errors below.");
		})();
	}, M = /* @__PURE__ */ K(C, {
		disabled: k,
		onClick: c ? void 0 : s,
		children: "Cancel"
	}), N = /* @__PURE__ */ K(Un, {
		resource: e,
		isNew: m,
		children: /* @__PURE__ */ K(Yn, {
			fieldsRef: v,
			children: /* @__PURE__ */ K(er, {
				registryRef: y,
				children: /* @__PURE__ */ q("div", {
					style: { position: "relative" },
					children: [k && p === "overlay" ? /* @__PURE__ */ K("div", {
						style: {
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							zIndex: 1
						},
						children: /* @__PURE__ */ K(re, {})
					}) : null, /* @__PURE__ */ n(we, {
						...w,
						key: E
					}, /* @__PURE__ */ q(A, {
						layout: "vertical",
						onFinish: j,
						style: p === "overlay" ? {
							opacity: k ? .4 : 1,
							pointerEvents: k ? "none" : void 0
						} : void 0,
						children: [
							/* @__PURE__ */ K(rr, { errors: b }),
							r,
							/* @__PURE__ */ K(A.Item, {
								style: {
									marginTop: 16,
									marginBottom: 0
								},
								children: /* @__PURE__ */ q(R, { children: [/* @__PURE__ */ K(C, {
									type: "primary",
									htmlType: "submit",
									loading: O,
									disabled: k || !o,
									children: "Save"
								}), c ? /* @__PURE__ */ K(d, {
									to: c,
									children: M
								}) : M] })
							})
						]
					}))]
				})
			})
		})
	});
	return T && !O && p === "replace" ? /* @__PURE__ */ K(re, {}) : N;
}
//#endregion
//#region src/crud/ResourceFormModal.tsx
function Dr({ resource: e, editId: t, onClose: n, children: r, title: i, permissions: a, defaultValues: o, width: s = 560, onSuccess: c }) {
	let l = t === "new", u = t != null, d = Y(), f = i ?? (l ? `New ${e}` : `Edit ${e}`), p = a ? X(d, a, l ? "add" : "change") : !0;
	return /* @__PURE__ */ K(ee, {
		open: u,
		title: f,
		onCancel: n,
		footer: null,
		destroyOnHidden: !0,
		width: s,
		maskClosable: !1,
		children: /* @__PURE__ */ K(x, { children: /* @__PURE__ */ K(Er, {
			resource: e,
			id: t ?? void 0,
			enabled: u,
			loadingMode: "overlay",
			defaultValues: o,
			canSave: p,
			onCancel: n,
			onSuccess: (e) => {
				c?.(e), n();
			},
			children: r
		}) })
	});
}
//#endregion
//#region src/crud/ListActionsBar.tsx
function Or({ selectedCount: e, total: t, allPageSelected: n, allMatchingSelected: r, onSelectAllMatching: i, onClearSelection: o, actions: s, onExecute: l, selectedIds: d, running: f = !1 }) {
	let [p, m] = u(), h = c(() => s.map((e) => ({
		value: e.key,
		label: e.label
	})), [s]), g = a(async () => {
		let t = s.find((e) => e.key === p);
		!t || e === 0 || (await l(t, d), m(void 0));
	}, [
		s,
		p,
		l,
		e,
		d
	]), _ = n && !r && t > e;
	return /* @__PURE__ */ q(R, {
		wrap: !0,
		style: {
			marginBottom: 16,
			width: "100%"
		},
		align: "center",
		children: [
			/* @__PURE__ */ q(U.Text, {
				type: "secondary",
				children: [
					e,
					" of ",
					t,
					" selected"
				]
			}),
			e > 0 ? /* @__PURE__ */ K(C, {
				type: "link",
				size: "small",
				onClick: o,
				style: { padding: 0 },
				children: "Clear selection"
			}) : null,
			_ ? /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K(U.Text, {
				type: "secondary",
				children: "·"
			}), /* @__PURE__ */ q(C, {
				type: "link",
				size: "small",
				onClick: i,
				style: { padding: 0 },
				children: [
					"Select all ",
					t,
					" items matching filter"
				]
			})] }) : null,
			r && t > 0 ? /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K(U.Text, {
				type: "secondary",
				children: "·"
			}), /* @__PURE__ */ q(U.Text, {
				type: "success",
				children: [
					"All ",
					t,
					" items selected"
				]
			})] }) : null,
			/* @__PURE__ */ K(L, {
				placeholder: "Action",
				style: { minWidth: 200 },
				options: h,
				value: p,
				onChange: m,
				disabled: e === 0 || f,
				allowClear: !0
			}),
			/* @__PURE__ */ K(C, {
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
var kr = new Set([
	"page",
	"perPage",
	"sort",
	"create",
	"edit"
]), Ar = 1, jr = 10;
function Mr(e) {
	if (e.includes(",")) {
		let t = e.split(",").map((e) => e.trim()), n = t.map(Number);
		return n.every((e) => Number.isFinite(e)) ? n : t;
	}
	let t = Number(e);
	return e !== "" && Number.isFinite(t) && String(t) === e ? t : e === "true" ? !0 : e === "false" ? !1 : e;
}
function Nr(e) {
	return e == null || e === "" ? null : Array.isArray(e) ? e.length === 0 ? null : e.map(String).join(",") : String(e);
}
function Pr(e) {
	let [t, n] = y(), r = c(() => {
		let n = t.get("page"), r = t.get("perPage"), i = n ? Math.max(1, Number(n) || Ar) : Ar, a = r ? Math.max(1, Number(r) || jr) : jr, o = t.getAll("sort"), s = o.length > 0 ? o.flatMap((e) => Mn(e)) : Mn(t.get("sort")), c = { ...e };
		return t.forEach((e, n) => {
			if (kr.has(n)) return;
			let r = c[n];
			r === void 0 ? t.getAll(n).length > 1 ? c[n] = t.getAll(n).map(Mr) : c[n] = Mr(e) : c[n] = [...Array.isArray(r) ? r : [r], Mr(e)];
		}), {
			page: i,
			perPage: a,
			sort: s,
			filter: c,
			createModal: t.has("create"),
			editId: t.get("edit")
		};
	}, [t, e]), i = a((e) => {
		n((t) => {
			let n = new URLSearchParams(t);
			return e(n), n;
		}, { replace: !0 });
	}, [n]);
	return [r, c(() => ({
		setPage: (e) => {
			i((t) => {
				e <= 1 ? t.delete("page") : t.set("page", String(e));
			});
		},
		setPerPage: (e) => {
			i((t) => {
				e === jr ? t.delete("perPage") : t.set("perPage", String(e)), t.delete("page");
			});
		},
		setSort: (e) => {
			i((t) => {
				t.delete("sort");
				let n = Nn(e);
				n && t.set("sort", n);
			});
		},
		toggleSort: (e) => {
			i((t) => {
				let n = t.getAll("sort").flatMap((e) => Mn(e)), r = n.findIndex((t) => t.field === e), i;
				i = r < 0 ? [...n, {
					field: e,
					order: "ASC"
				}] : n[r].order === "ASC" ? n.map((e, t) => t === r ? {
					...e,
					order: "DESC"
				} : e) : n.filter((e, t) => t !== r), t.delete("sort");
				let a = Nn(i);
				a && t.set("sort", a);
			});
		},
		setFilter: (e, t) => {
			i((n) => {
				n.delete(e);
				let r = Nr(t);
				r != null && n.set(e, r), n.delete("page");
			});
		},
		setFilters: (e) => {
			i((t) => {
				for (let e of [...t.keys()]) kr.has(e) || t.delete(e);
				for (let [n, r] of Object.entries(e)) {
					let e = Nr(r);
					e != null && t.set(n, e);
				}
				t.delete("page");
			});
		},
		openCreateModal: () => {
			i((e) => {
				e.set("create", "1"), e.delete("edit");
			});
		},
		openEditModal: (e) => {
			i((t) => {
				t.set("edit", String(e)), t.delete("create");
			});
		},
		closeModal: () => {
			i((e) => {
				e.delete("create"), e.delete("edit");
			});
		}
	}), [i])];
}
//#endregion
//#region src/crud/ResourceList.tsx
var Fr = t(null);
function Ir() {
	return o(Fr);
}
function Lr({ resource: e, title: t, pathPrefix: n, newPath: r, editMode: i = "page", formChildren: o, actions: s, rowActions: l, headerExtra: f, bulkActions: p, bulkDelete: m = !0, bulkActionsEnabled: h = !0, permissions: g, queryState: _, queryActions: v }) {
	let y = Vt(), b = Y(), { message: S, modal: T } = x.useApp(), { columns: E, sortOrders: D, sortPriorities: O } = Ln(), [k, A] = u(!1), [j, M] = u([]), [N, P] = u(0), [F, I] = u(() => /* @__PURE__ */ new Set()), [ee, te] = u(!1), ne = r ?? `${n}/new`, L = X(b, g, "add"), re = X(b, g, "change"), z = X(b, g, "delete"), B = re && (i === "page" || i === "both") && s?.edit !== !1, V = re && (i === "modal" || i === "both") && s?.quickEdit !== !1, H = z && s?.delete !== !1, ae = B || V || H || l, W = a(() => {
		I(/* @__PURE__ */ new Set());
	}, []), oe = c(() => {
		if (!h) return [];
		let t = [];
		return m && z && t.push({
			key: "__delete",
			label: "Delete selected",
			confirm: (e) => `Delete ${e.length} selected item(s)? This cannot be undone.`,
			execute: async (t, { reload: n, clearSelection: r }) => {
				await Promise.all(t.map((t) => y.delete(e, t))), r(), n(), S.success(`Deleted ${t.length} item(s)`);
			}
		}), [...t, ...p ?? []];
	}, [
		h,
		m,
		z,
		p,
		y,
		e,
		S
	]), le = oe.length > 0, ue = F.size, de = j.length > 0 && j.every((e) => F.has(e.id)), fe = N > 0 && ue >= N, pe = c(() => j.filter((e) => F.has(e.id)).map((e) => e.id), [j, F]), me = a((e) => {
		I((t) => {
			let n = new Set(t), r = j.map((e) => e.id);
			for (let t of r) e.includes(t) || n.delete(t);
			for (let t of e) n.add(t);
			return n;
		});
	}, [j]), he = a(async () => {
		if (!(N <= 0)) {
			te(!0);
			try {
				let t = _.sort.length === 0 ? void 0 : _.sort.length === 1 ? _.sort[0] : _.sort, n = await y.getList(e, {
					pagination: {
						page: 1,
						perPage: N
					},
					sort: t,
					filter: _.filter
				});
				I(new Set(n.data.map((e) => e.id)));
			} catch (e) {
				S.error(e instanceof Error ? e.message : "Load failed");
			} finally {
				te(!1);
			}
		}
	}, [
		y,
		e,
		N,
		_.sort,
		_.filter,
		S
	]), ge = a((e) => {
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
	}, [v, _.sort.length]), _e = c(() => {
		let e = _.sort.length === 0 ? void 0 : _.sort.length === 1 ? _.sort[0] : _.sort;
		return {
			pagination: {
				page: _.page,
				perPage: _.perPage
			},
			sort: e,
			filter: _.filter
		};
	}, [_]), J = a(async (t) => {
		A(!0);
		try {
			let n = await y.getList(e, {
				..._e,
				signal: t
			});
			if (t?.aborted) return;
			M(n.data), P(n.total);
		} catch (e) {
			Gt(e) || S.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			t?.aborted || A(!1);
		}
	}, [
		y,
		e,
		_e,
		S
	]);
	Cr((e) => J(e), [J]);
	let ve = c(() => ({
		reload: () => void J(),
		clearSelection: W
	}), [J, W]), ye = a(async (e, t) => {
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
		te(!0);
		try {
			await e.execute(t, ve);
		} catch (e) {
			S.error(e instanceof Error ? e.message : "Action failed");
		} finally {
			te(!1);
		}
	}, [
		ve,
		T,
		S
	]), be = a(async (t) => {
		if (z) try {
			await y.delete(e, t.id), S.success("Deleted"), J();
		} catch (e) {
			S.error(e instanceof Error ? e.message : "Delete failed");
		}
	}, [
		z,
		y,
		e,
		J,
		S
	]), xe = c(() => {
		let e = E.map((e) => {
			let t = e.buildColumn();
			if (e.sortable) {
				let n = D.get(e.source), r = O.get(e.source), i = n === "ASC" ? "ascend" : n === "DESC" ? "descend" : void 0, a = i == null ? void 0 : /* @__PURE__ */ q("span", {
					style: {
						display: "inline-flex",
						alignItems: "center",
						gap: 2,
						marginInlineStart: 4,
						color: "var(--ant-color-primary)"
					},
					children: [r == null ? null : /* @__PURE__ */ K("span", {
						style: {
							fontSize: 11,
							fontWeight: 600,
							lineHeight: 1,
							minWidth: 10,
							textAlign: "center"
						},
						children: r
					}), K(i === "ascend" ? ce : se, { style: { fontSize: 11 } })]
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
		if (!ae) return e;
		let t = {
			reload: () => void J(),
			openEditModal: v.openEditModal
		}, r = {
			title: "Actions",
			key: "__actions",
			width: i === "both" ? 200 : 160,
			render: (e, r) => /* @__PURE__ */ q(R, {
				size: "small",
				wrap: !0,
				children: [
					B ? /* @__PURE__ */ K(d, {
						to: `${n}/${String(r.id)}`,
						children: "Edit"
					}) : null,
					V ? /* @__PURE__ */ K(C, {
						type: "link",
						size: "small",
						style: { padding: 0 },
						onClick: () => v.openEditModal(r.id),
						children: i === "both" ? "Quick edit" : "Edit"
					}) : null,
					H ? /* @__PURE__ */ K(C, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => void be(r),
						style: { padding: 0 },
						children: "Delete"
					}) : null,
					l?.(r, t)
				]
			})
		};
		return [...e, r];
	}, [
		E,
		ae,
		B,
		V,
		H,
		i,
		n,
		be,
		D,
		O,
		v,
		l,
		J
	]), Se = o && (_.createModal || _.editId != null) && (i === "modal" || i === "both");
	return /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ q(w, {
		title: /* @__PURE__ */ K(U.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		}),
		extra: f || L ? /* @__PURE__ */ q(R, { children: [f, L ? i === "modal" || i === "both" ? /* @__PURE__ */ q(G, { children: [i === "both" ? /* @__PURE__ */ K(d, {
			to: ne,
			children: /* @__PURE__ */ K(C, { children: "New page" })
		}) : null, /* @__PURE__ */ K(C, {
			type: "primary",
			onClick: () => v.openCreateModal(),
			children: "New"
		})] }) : /* @__PURE__ */ K(d, {
			to: ne,
			children: /* @__PURE__ */ K(C, {
				type: "primary",
				children: "New"
			})
		}) : null] }) : null,
		children: [le ? /* @__PURE__ */ K(Or, {
			selectedCount: ue,
			total: N,
			allPageSelected: de,
			allMatchingSelected: fe,
			onSelectAllMatching: () => void he(),
			onClearSelection: W,
			actions: oe,
			onExecute: ye,
			selectedIds: [...F],
			running: ee || k
		}) : null, /* @__PURE__ */ K(ie, {
			rowKey: "id",
			loading: k,
			columns: xe,
			dataSource: j,
			scroll: { x: "max-content" },
			rowSelection: le ? {
				selectedRowKeys: pe,
				onChange: me,
				preserveSelectedRowKeys: !0
			} : void 0,
			pagination: {
				current: _.page,
				pageSize: _.perPage,
				total: N,
				showSizeChanger: !0,
				onChange: (e, t) => {
					v.setPage(e), t && v.setPerPage(t);
				}
			},
			onChange: (e, t, n) => {
				ge(n);
			}
		})]
	}), Se ? /* @__PURE__ */ K(Dr, {
		resource: e,
		editId: _.createModal ? "new" : _.editId,
		onClose: () => {
			v.closeModal(), J();
		},
		children: o
	}) : null] });
}
function Rr({ resource: e, title: t, pathPrefix: n, newPath: r, staticFilter: i, editMode: o = "page", syncQueryParams: s = !0, children: l, formChildren: u, actions: d, rowActions: f, headerExtra: p, bulkActions: m, bulkDelete: h, bulkActionsEnabled: g, permissions: _ }) {
	let [v, y] = Pr(i), b = c(() => {
		if (!s) return i ?? {};
		let e = {};
		for (let [t, n] of Object.entries(v.filter)) i && t in i || (e[t] = n);
		return e;
	}, [
		v.filter,
		i,
		s
	]), x = a((e, t) => {
		s && y.setFilter(e, t);
	}, [s, y]), S = c(() => ({
		filterValues: b,
		setFilterValue: x
	}), [b, x]);
	return /* @__PURE__ */ K(Fr.Provider, {
		value: S,
		children: /* @__PURE__ */ K(zn, {
			values: b,
			setFilterValue: x,
			children: /* @__PURE__ */ q(In, {
				toggleSort: y.toggleSort,
				sort: v.sort,
				children: [l, /* @__PURE__ */ K(Lr, {
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
function zr() {
	let e = Bn();
	return !e || e.filters.length === 0 ? null : /* @__PURE__ */ K(R, {
		wrap: !0,
		size: "middle",
		style: { marginBottom: 16 },
		children: e.filters.map((t) => /* @__PURE__ */ q(R, {
			orientation: "vertical",
			size: 2,
			children: [t.label ? /* @__PURE__ */ K(U.Text, {
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
function Br({ children: e }) {
	return /* @__PURE__ */ q(G, { children: [e, /* @__PURE__ */ K(zr, {})] });
}
//#endregion
//#region src/crud/ResourceForm.tsx
function Vr({ resource: e, title: t, listPath: n, children: r, defaultValues: i, onSaved: a, stayOnPage: o, permissions: c }) {
	let { id: l } = v(), u = l === "new" || !l, f = Y(), p = _(), { token: m } = W.useToken();
	s(() => {
		c && (X(f, c, u ? "add" : "change") || p(n, { replace: !0 }));
	}, [
		c,
		u,
		f,
		p,
		n
	]);
	let h = c ? X(f, c, u ? "add" : "change") : !0;
	return /* @__PURE__ */ K(w, {
		title: /* @__PURE__ */ q(R, { children: [/* @__PURE__ */ q(d, {
			to: n,
			style: { color: m.colorText },
			children: [/* @__PURE__ */ K(oe, {}), " Back"]
		}), /* @__PURE__ */ K(U.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		})] }),
		children: /* @__PURE__ */ K(Er, {
			resource: e,
			id: l,
			defaultValues: i,
			canSave: h,
			cancelHref: n,
			onCancel: () => p(n),
			onSuccess: (e) => {
				a?.(e), o || p(n);
			},
			children: r
		})
	});
}
//#endregion
//#region src/crud/utils/nestedFieldPath.ts
function Hr(e, t, n) {
	return `${e}.${t}.${n}`;
}
//#endregion
//#region src/crud/InlineFormSet.tsx
function Ur(e) {
	let t = {};
	for (let n of e) t[n] = void 0;
	return t;
}
function Wr(e, t) {
	let { control: n } = De(), { fields: r, append: i, remove: a } = Te({
		control: n,
		name: e,
		keyName: "rowKey"
	});
	return {
		fields: r,
		remove: a,
		appendEmpty: () => i(Ur(t))
	};
}
function Gr({ field: e, label: t, payloadKey: n, transformRows: r, columns: i }) {
	let a = c(() => i.map((e) => e.source), [i]), { fields: o, remove: s, appendEmpty: l } = Wr(e, a);
	Zn(e), nr(e, a, n, r);
	let u = c(() => i.map((t) => ({
		title: t.label ?? t.source,
		key: t.source,
		width: t.width,
		onHeaderCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		onCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		render: (n, r, i) => t.cell({
			name: Hr(e, i, t.source),
			index: i,
			field: e
		})
	})), [i, e]);
	return /* @__PURE__ */ q("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ K(U.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ K(ie, {
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
					render: (e, t, n) => /* @__PURE__ */ K(C, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => s(n),
						children: "Remove"
					})
				}]
			}),
			/* @__PURE__ */ K(C, {
				type: "dashed",
				style: { marginTop: 8 },
				onClick: l,
				children: "Add row"
			})
		]
	});
}
function Kr({ field: e, label: t, payloadKey: n, transformRows: r, sources: i, renderRow: a }) {
	let { fields: o, remove: s, appendEmpty: c } = Wr(e, i);
	return Zn(e), nr(e, i, n, r), /* @__PURE__ */ q("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ K(U.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ K(R, {
				orientation: "vertical",
				size: "middle",
				style: { width: "100%" },
				children: o.map((t, n) => /* @__PURE__ */ K(w, {
					size: "small",
					title: `Item ${n + 1}`,
					extra: /* @__PURE__ */ K(C, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => s(n),
						children: "Remove"
					}),
					children: a({
						field: e,
						index: n,
						name: (t) => Hr(e, n, t)
					})
				}, t.rowKey))
			}),
			/* @__PURE__ */ K(C, {
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
function qr(e, t, n) {
	for (let r of e) if (t(r, n).invalid) return !0;
	return !1;
}
function Jr(e) {
	let t = l([]);
	for (; t.current.length < e;) t.current.push({ current: /* @__PURE__ */ new Set() });
	return t.current.length > e && (t.current.length = e), t.current;
}
function Yr(e, t) {
	let { control: n, getFieldState: r, setFocus: i } = De(), a = Oe({ control: n }), o = l(0), c = l(0);
	s(() => {
		if (a.submitCount === 0) return;
		let n = Object.keys(a.errors).length, s = a.submitCount !== o.current, l = !s && n > 0 && c.current === 0;
		if (o.current = a.submitCount, c.current = n, !s && !l || n === 0) return;
		let u = e.findIndex((e) => qr(e.current, r, a));
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
function Xr(e) {
	return null;
}
function Zr(e) {
	return i(e) && e.type === Xr;
}
function Qr({ children: t, defaultActiveKey: n, activeKey: r, onChange: i, ...o }) {
	let { token: s } = W.useToken(), l = c(() => e.toArray(t).filter(Zr).map((e, t) => ({
		key: e.key ?? String(t),
		label: e.props.label,
		disabled: e.props.disabled,
		children: e.props.children
	})), [t]), d = Jr(l.length), f = r !== void 0, [p, m] = u(() => n ?? l[0]?.key ?? "0"), h = f ? r : p, g = a((e) => {
		f || m(e), i?.(e);
	}, [f, i]);
	Yr(d, a((e) => {
		let t = l[e]?.key;
		t != null && g(t);
	}, [g, l]));
	let { control: _, getFieldState: v } = De(), y = Oe({ control: _ });
	return /* @__PURE__ */ K(V, {
		destroyOnHidden: !1,
		items: c(() => l.map((e, t) => {
			let n = qr(d[t].current, v, y);
			return {
				key: e.key,
				label: n ? /* @__PURE__ */ K("span", {
					style: { color: s.colorError },
					children: e.label
				}) : e.label,
				disabled: e.disabled,
				children: /* @__PURE__ */ K(Kn, {
					sourcesRef: d[t],
					children: e.children
				})
			};
		}), [
			y,
			v,
			d,
			l,
			s.colorError
		]),
		activeKey: h,
		onChange: g,
		...o
	});
}
//#endregion
//#region src/crud/FormSteps.tsx
function $r(e) {
	return null;
}
function ei(e) {
	return i(e) && e.type === $r;
}
function ti({ children: t, initialStep: n = 0, showNavigation: r = !0, allowStepSelect: i = !1, stepsStyle: o, navigationStyle: s, size: l, direction: d, type: f, status: p }) {
	let m = c(() => e.toArray(t).filter(ei), [t]), h = Jr(m.length), [g, _] = u(n), v = m.length - 1;
	Yr(h, _);
	let { control: y, getFieldState: b } = De(), x = Oe({ control: y }), S = c(() => m.map((e, t) => {
		let n = qr(h[t].current, b, x);
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
	]), w = a((e) => {
		_(e);
	}, []);
	return /* @__PURE__ */ q(G, { children: [
		/* @__PURE__ */ K(z, {
			current: g,
			items: S,
			style: {
				marginBottom: 24,
				...o
			},
			onChange: i ? w : void 0,
			size: l,
			direction: d,
			type: f,
			status: p
		}),
		m.map((e, t) => /* @__PURE__ */ K("div", {
			style: { display: g === t ? void 0 : "none" },
			children: /* @__PURE__ */ K(Kn, {
				sourcesRef: h[t],
				children: e.props.children
			})
		}, e.key ?? String(t))),
		r && m.length > 1 ? /* @__PURE__ */ q(R, {
			style: {
				marginTop: 16,
				...s
			},
			children: [/* @__PURE__ */ K(C, {
				disabled: g === 0,
				onClick: () => _((e) => e - 1),
				children: "Previous"
			}), /* @__PURE__ */ K(C, {
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
	let s = t ?? e, c = !s.includes("."), { control: l } = De(), u = Wn(), d = a ? void 0 : n ?? e, f = n ?? e;
	return Zn(e, c), Qn(e, c), /* @__PURE__ */ K(Ce, {
		name: s,
		control: l,
		rules: {
			required: r ? `${f} is required` : !1,
			...i
		},
		render: ({ field: e, fieldState: t }) => /* @__PURE__ */ K(A.Item, {
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
function ni({ source: e, name: t, label: n, required: r, rules: i, placeholder: a, inputStyle: o, hideLabel: s }) {
	return /* @__PURE__ */ K($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: s,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ K(N, {
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
function ri({ source: e, name: t, label: n, required: r, rules: i, min: a, max: o, step: s, inputStyle: c, hideLabel: l }) {
	return /* @__PURE__ */ K($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: l,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ K(P, {
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
function ii({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, disabled: o }) {
	return /* @__PURE__ */ K($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ K(B, {
			checked: !!e,
			onChange: t,
			disabled: n || o
		})
	});
}
//#endregion
//#region src/crud/utils/parseDayjsValue.ts
var ai = /* @__PURE__ */ ze((/* @__PURE__ */ Le(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_customParseFormat = r();
	})(e, (function() {
		var e = {
			LTS: "h:mm:ss A",
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D, YYYY",
			LLL: "MMMM D, YYYY h:mm A",
			LLLL: "dddd, MMMM D, YYYY h:mm A"
		}, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, r = /\d\d/, i = /\d\d?/, a = /\d*[^-_:/,()\s\d]+/, o = {}, s = function(e) {
			return (e = +e) + (e > 68 ? 1900 : 2e3);
		}, c = function(e) {
			return function(t) {
				this[e] = +t;
			};
		}, l = [/[+-]\d\d:?(\d\d)?|Z/, function(e) {
			(this.zone ||= {}).offset = function(e) {
				if (!e || e === "Z") return 0;
				var t = e.match(/([+-]|\d\d)/g), n = 60 * t[1] + (+t[2] || 0);
				return n === 0 ? 0 : t[0] === "+" ? -n : n;
			}(e);
		}], u = function(e) {
			var t = o[e];
			return t && (t.indexOf ? t : t.s.concat(t.f));
		}, d = function(e, t) {
			var n, r = o.meridiem;
			if (r) {
				for (var i = 1; i <= 24; i += 1) if (e.indexOf(r(i, 0, t)) > -1) {
					n = i > 12;
					break;
				}
			} else n = e === (t ? "pm" : "PM");
			return n;
		}, f = {
			A: [a, function(e) {
				this.afternoon = d(e, !1);
			}],
			a: [a, function(e) {
				this.afternoon = d(e, !0);
			}],
			Q: [n, function(e) {
				this.month = 3 * (e - 1) + 1;
			}],
			S: [n, function(e) {
				this.milliseconds = 100 * e;
			}],
			SS: [r, function(e) {
				this.milliseconds = 10 * e;
			}],
			SSS: [/\d{3}/, function(e) {
				this.milliseconds = +e;
			}],
			s: [i, c("seconds")],
			ss: [i, c("seconds")],
			m: [i, c("minutes")],
			mm: [i, c("minutes")],
			H: [i, c("hours")],
			h: [i, c("hours")],
			HH: [i, c("hours")],
			hh: [i, c("hours")],
			D: [i, c("day")],
			DD: [r, c("day")],
			Do: [a, function(e) {
				var t = o.ordinal, n = e.match(/\d+/);
				if (this.day = n[0], t) for (var r = 1; r <= 31; r += 1) t(r).replace(/\[|\]/g, "") === e && (this.day = r);
			}],
			w: [i, c("week")],
			ww: [r, c("week")],
			M: [i, c("month")],
			MM: [r, c("month")],
			MMM: [a, function(e) {
				var t = u("months"), n = (u("monthsShort") || t.map((function(e) {
					return e.slice(0, 3);
				}))).indexOf(e) + 1;
				if (n < 1) throw Error();
				this.month = n % 12 || n;
			}],
			MMMM: [a, function(e) {
				var t = u("months").indexOf(e) + 1;
				if (t < 1) throw Error();
				this.month = t % 12 || t;
			}],
			Y: [/[+-]?\d+/, c("year")],
			YY: [r, function(e) {
				this.year = s(e);
			}],
			YYYY: [/\d{4}/, c("year")],
			Z: l,
			ZZ: l
		};
		function p(n) {
			for (var r = n, i = o && o.formats, a = (n = r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(t, n, r) {
				var a = r && r.toUpperCase();
				return n || i[r] || e[r] || i[a].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(e, t, n) {
					return t || n.slice(1);
				}));
			}))).match(t), s = a.length, c = 0; c < s; c += 1) {
				var l = a[c], u = f[l], d = u && u[0], p = u && u[1];
				a[c] = p ? {
					regex: d,
					parser: p
				} : l.replace(/^\[|\]$/g, "");
			}
			return function(e) {
				for (var t = {}, n = 0, r = 0; n < s; n += 1) {
					var i = a[n];
					if (typeof i == "string") r += i.length;
					else {
						var o = i.regex, c = i.parser, l = e.slice(r), u = o.exec(l)[0];
						c.call(t, u), e = e.replace(u, "");
					}
				}
				return function(e) {
					var t = e.afternoon;
					if (t !== void 0) {
						var n = e.hours;
						t ? n < 12 && (e.hours += 12) : n === 12 && (e.hours = 0), delete e.afternoon;
					}
				}(t), t;
			};
		}
		return function(e, t, n) {
			n.p.customParseFormat = !0, e && e.parseTwoDigitYear && (s = e.parseTwoDigitYear);
			var r = t.prototype, i = r.parse;
			r.parse = function(e) {
				var t = e.date, r = e.utc, a = e.args;
				this.$u = r;
				var s = a[1];
				if (typeof s == "string") {
					var c = !0 === a[2], l = !0 === a[3], u = c || l, d = a[2];
					l && (d = a[2]), o = this.$locale(), !c && d && (o = n.Ls[d]), this.$d = function(e, t, n, r) {
						try {
							if (["x", "X"].indexOf(t) > -1) return /* @__PURE__ */ new Date((t === "X" ? 1e3 : 1) * e);
							var i = p(t)(e), a = i.year, o = i.month, s = i.day, c = i.hours, l = i.minutes, u = i.seconds, d = i.milliseconds, f = i.zone, m = i.week, h = /* @__PURE__ */ new Date(), g = s || (a || o ? 1 : h.getDate()), _ = a || h.getFullYear(), v = 0;
							a && !o || (v = o > 0 ? o - 1 : h.getMonth());
							var y, b = c || 0, x = l || 0, S = u || 0, C = d || 0;
							return f ? new Date(Date.UTC(_, v, g, b, x, S, C + 60 * f.offset * 1e3)) : n ? new Date(Date.UTC(_, v, g, b, x, S, C)) : (y = new Date(_, v, g, b, x, S, C), m && (y = r(y).week(m).toDate()), y);
						} catch {
							return /* @__PURE__ */ new Date("");
						}
					}(t, s, r, n), this.init(), d && !0 !== d && (this.$L = this.locale(d).$L), u && t != this.format(s) && (this.$d = /* @__PURE__ */ new Date("")), o = {};
				} else if (s instanceof Array) for (var f = s.length, m = 1; m <= f; m += 1) {
					a[1] = s[m - 1];
					var h = n.apply(this, a);
					if (h.isValid()) {
						this.$d = h.$d, this.$L = h.$L, this.init();
						break;
					}
					m === f && (this.$d = /* @__PURE__ */ new Date(""));
				}
				else i.call(this, e);
			};
		};
	}));
})))(), 1);
Ae.extend(ai.default);
function oi(e, t) {
	if (e == null || e === "") return null;
	if (Ae.isDayjs(e)) return e;
	let n = Ae(String(e), t, !0);
	return n.isValid() ? n : Ae(String(e)).isValid() ? Ae(String(e)) : null;
}
//#endregion
//#region src/crud/fields/DateField.tsx
var si = "YYYY-MM-DD", ci = `${si} HH:mm:ss`, li = [
	si,
	ci,
	"YYYY-MM-DDTHH:mm:ss",
	"YYYY-MM-DDTHH:mm:ssZ"
];
function ui({ source: e, name: t, label: n, required: r, rules: i, showTime: a, hideLabel: o }) {
	return /* @__PURE__ */ K($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ K(E, {
			value: oi(e, a ? [...li, ci] : li),
			onChange: (e) => t(e ? e.format(a ? ci : si) : null),
			onBlur: n,
			showTime: a,
			disabled: r,
			format: a ? ci : si,
			style: { width: "100%" }
		})
	});
}
//#endregion
//#region src/crud/fields/DateTimeField.tsx
function di(e) {
	return /* @__PURE__ */ K(ui, {
		showTime: !0,
		...e
	});
}
//#endregion
//#region src/crud/fields/TimeField.tsx
var fi = "HH:mm:ss", pi = [
	fi,
	"HH:mm",
	"H:mm:ss",
	"H:mm"
];
function mi({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, format: o = fi }) {
	return /* @__PURE__ */ K($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ K(H, {
			value: oi(e, pi),
			onChange: (e) => t(e ? e.format(o) : null),
			onBlur: n,
			disabled: r,
			format: o,
			style: { width: "100%" }
		})
	});
}
//#endregion
//#region src/crud/fields/SelectField.tsx
function hi({ source: e, name: t, label: n, required: r, rules: i, choices: a, mode: o, allowClear: s, hideLabel: c }) {
	return /* @__PURE__ */ K($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: c,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ K(L, {
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
function gi({ source: e, name: t, label: n, required: r, rules: i, autoComplete: a, hideLabel: o }) {
	return /* @__PURE__ */ K($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ K(N.Password, {
			value: e,
			onChange: (e) => t(e.target.value),
			onBlur: n,
			disabled: r,
			autoComplete: a
		})
	});
}
function _i({ source: e, name: t, label: n, required: r, rules: i, confirmSource: a, confirmLabel: o = "Confirm password", autoComplete: s = "new-password", hideLabel: c }) {
	let l = ke({
		name: t ?? e,
		disabled: !a
	});
	return a ? /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K(gi, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		autoComplete: s,
		hideLabel: c
	}), /* @__PURE__ */ K(gi, {
		source: a,
		label: o,
		required: r,
		autoComplete: s,
		hideLabel: c,
		rules: { validate: (e) => !l || e === l || "Passwords do not match" }
	})] }) : /* @__PURE__ */ K(gi, {
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
//#region src/crud/utils/choiceSelectionUtils.ts
function vi(e, t) {
	return typeof e == "object" && !!e && !Array.isArray(e) && t in e;
}
function yi(e, t) {
	if (!(e == null || e === "")) {
		if (vi(e, t)) {
			let n = e[t];
			return typeof n == "string" || typeof n == "number" ? n : void 0;
		}
		if (typeof e == "string" || typeof e == "number") return e;
	}
}
function bi(e, t) {
	return Array.isArray(e) ? e.map((e) => yi(e, t)).filter((e) => e != null) : [];
}
function xi(e, t) {
	return e == null ? [] : (Array.isArray(e) ? e : [e]).filter((e) => e != null && e !== "").map((e) => vi(e, t) ? e[t] : e);
}
function Si(e, t, n) {
	let r = [];
	if (t != null && (Array.isArray(t) ? r.push(...t.filter((e) => vi(e, n))) : vi(t, n) && r.push(t)), e == null) return r;
	let i = Array.isArray(e) ? e : [e];
	for (let e of i) vi(e, n) && r.push(e);
	return r;
}
function Ci(e, t) {
	return typeof t == "function" ? t(e) : String(e[t] ?? "");
}
function wi(e, t, n) {
	return e.map((e) => ({
		label: Ci(e, t),
		value: e[n],
		record: e
	}));
}
function Ti(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) n.set(t.value, t);
	for (let e of t) n.set(e.value, e);
	return Array.from(n.values());
}
function Ei(e = {}) {
	let t = e.popupMatchSelectWidth ?? !1;
	return t === !1 ? {
		popupMatchSelectWidth: !1,
		styles: { popup: { root: { minWidth: e.popupMinWidth ?? 360 } } }
	} : { popupMatchSelectWidth: t };
}
//#endregion
//#region src/crud/utils/referenceSelectNotFoundContent.tsx
function Di(e) {
	return e ? /* @__PURE__ */ K(re, { size: "small" }) : void 0;
}
//#endregion
//#region src/crud/utils/useChoices.ts
var Oi = /* @__PURE__ */ new Map(), ki = /* @__PURE__ */ new Map();
function Ai(e, t) {
	return typeof e == "function" ? `fn:${t ?? ""}` : Array.isArray(e) ? `static:${e.length}` : `res:${e.resource}:${JSON.stringify(e.filter ?? {})}:${t ?? ""}`;
}
async function ji(e, t, n, r, i) {
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
		label: Ci(e, n),
		value: e[r],
		record: e
	}));
}
function Mi(e, t, n, r, i, a) {
	let o = Ai(e, i);
	if (a) {
		let e = Oi.get(o);
		if (e && !i) return Promise.resolve(e);
	}
	let s = ki.get(o);
	if (s) return s;
	let c = ji(e, t, n, r, i).then((e) => (a && !i && Oi.set(o, e), e)).finally(() => {
		ki.delete(o);
	});
	return ki.set(o, c), c;
}
function Ni(e, t, n = "name", r = "id", i, o = {}) {
	let { lazy: l = !1, active: d = !1, selectedValues: f, selectedRecords: p, fetchSelected: m = !0, cache: h } = o, g = h ?? !l, _ = Vt(), v = c(() => {
		if (e) return e;
		if (t) return {
			resource: t,
			filter: i ? { q: i } : void 0
		};
	}, [
		e,
		t,
		i
	]), y = v ? Ai(v, i) : void 0, b = c(() => xi(f, r), [f, r]), x = c(() => wi(Si(f, p, r), n, r), [
		f,
		p,
		n,
		r
	]), S = !!(v && (!l || d || Array.isArray(v))), [C, w] = u(() => x.length ? x : !y || i || l || !g ? [] : Oi.get(y) ?? []), [T, E] = u(() => S ? !g || !y || i ? !!v : !Oi.has(y) : !1);
	s(() => {
		x.length && w((e) => Ti(e, x));
	}, [x]);
	let D = a(async () => {
		if (!v || !S) {
			v || w(x), E(!1);
			return;
		}
		if (g) {
			let e = Ai(v, i), t = Oi.get(e);
			if (t && !i) {
				w(Ti(x, t)), E(!1);
				return;
			}
		}
		E(!0), l && w(x);
		try {
			w(Ti(x, await Mi(v, _, n, r, i, g)));
		} catch {
			!b.length && !x.length ? w([]) : l && w(x);
		} finally {
			E(!1);
		}
	}, [
		v,
		S,
		g,
		_,
		n,
		r,
		i,
		l,
		b.length,
		x
	]);
	s(() => {
		D();
	}, [D]), s(() => {
		l && !d && !i && (w(x), E(!1));
	}, [
		l,
		d,
		i,
		x
	]), s(() => {
		if (!m || !t || !b.length) return;
		let e = b.filter((e) => !x.some((t) => t.value === e));
		if (!e.length) return;
		let i = !1;
		return (async () => {
			let a = [];
			for (let i of e) try {
				let e = (await _.getOne(t, i)).data;
				a.push({
					label: Ci(e, n),
					value: e[r],
					record: e
				});
			} catch {
				a.push({
					label: String(i),
					value: i
				});
			}
			i || !a.length || w((e) => {
				let t = a.filter((t) => !e.some((e) => e.value === t.value));
				return t.length ? Ti(e, t) : e;
			});
		})(), () => {
			i = !0;
		};
	}, [
		m,
		t,
		_,
		n,
		r,
		b,
		x
	]);
	let O = a((e) => C.find((t) => t.value === e)?.label ?? String(e ?? "—"), [C]);
	return {
		options: C,
		loading: T,
		labelForValue: O,
		labelsForValues: a((e) => e?.length ? e.map((e) => O(e)).join(", ") : "—", [O]),
		optionForValue: a((e) => C.find((t) => t.value === e), [C]),
		reload: D
	};
}
//#endregion
//#region src/crud/fields/ReferenceInputActions.tsx
function Pi({ reference: e, referenceForm: t, referencePermissions: n, referenceTitle: r, referenceDefaultValues: i, referenceModalWidth: a, selectedId: o, disabled: s, onCreated: c, onUpdated: l }) {
	let d = Y(), f = r ?? e, p = !!(e && t) && X(d, n, "add"), m = !!(e && t && o != null && o !== "") && X(d, n, "change"), [h, g] = u(null);
	return !p && !m ? null : /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ q(R, {
		size: 4,
		children: [p ? /* @__PURE__ */ K(ae, {
			title: `Add ${f ?? "record"}`,
			children: /* @__PURE__ */ K(C, {
				type: "default",
				icon: /* @__PURE__ */ K(J, {}),
				disabled: s,
				"aria-label": `Add ${f ?? "record"}`,
				onClick: () => g("new")
			})
		}) : null, m ? /* @__PURE__ */ K(ae, {
			title: `Edit ${f ?? "record"}`,
			children: /* @__PURE__ */ K(C, {
				type: "default",
				icon: /* @__PURE__ */ K(fe, {}),
				disabled: s,
				"aria-label": `Edit ${f ?? "record"}`,
				onClick: () => g(String(o))
			})
		}) : null]
	}), e && t && h != null ? /* @__PURE__ */ K(Dr, {
		resource: e,
		editId: h,
		onClose: () => g(null),
		title: h === "new" ? `New ${f ?? e}` : `Edit ${f ?? e}`,
		permissions: n,
		defaultValues: h === "new" ? i : void 0,
		width: a,
		onSuccess: (e) => {
			let t = e;
			h === "new" ? c?.(t) : l?.(t);
		},
		children: t
	}) : null] });
}
//#endregion
//#region src/crud/fields/ReferenceField.tsx
function Fi({ reference: e, choices: t, optionLabel: n = "name", optionValue: r = "id", search: i, allowClear: a, disabled: o, inputStyle: s, onValueChange: l, lazy: d = !0, fetchSelected: f = !0, value: p, onChange: m, fieldName: h, selectedRecords: g, referenceForm: _, referencePermissions: v, referenceTitle: y, referenceDefaultValues: b, referenceModalWidth: x, referenceActions: S = !0, popupMatchSelectWidth: C, popupMinWidth: w }) {
	let [T, E] = u(), [D, O] = u(!1), k = D || !!T, A = yi(p, r), { options: j, loading: M, optionForValue: N, reload: P } = Ni(t, e, n, r, i ? T : void 0, {
		lazy: d,
		active: k,
		selectedValues: p,
		selectedRecords: g,
		fetchSelected: f
	}), F = c(() => j.map((e) => ({
		label: e.label,
		value: e.value
	})), [j]), I = (e) => {
		let t = e[r];
		m(t), l?.(t, {
			label: Ci(e, n),
			value: t,
			record: e
		}, { name: h }), P();
	}, ee = /* @__PURE__ */ K(L, {
		...Ei({
			popupMatchSelectWidth: C,
			popupMinWidth: w
		}),
		value: A,
		onChange: (e) => {
			m(e), l?.(e, N(e), { name: h });
		},
		options: F,
		loading: M,
		notFoundContent: Di(M),
		showSearch: i,
		filterOption: i ? !1 : void 0,
		onSearch: i ? E : void 0,
		onDropdownVisibleChange: (e) => {
			O(e), e || E(void 0);
		},
		allowClear: a,
		disabled: o,
		optionFilterProp: "label",
		style: {
			width: "100%",
			minWidth: 160,
			...s
		}
	});
	return S ? /* @__PURE__ */ q("div", {
		style: {
			display: "flex",
			gap: 8,
			width: "100%",
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ K("div", {
			style: {
				flex: 1,
				minWidth: 0
			},
			children: ee
		}), /* @__PURE__ */ K(Pi, {
			reference: e,
			referenceForm: _,
			referencePermissions: v,
			referenceTitle: y,
			referenceDefaultValues: b,
			referenceModalWidth: x,
			selectedId: A,
			disabled: o,
			onCreated: I,
			onUpdated: () => void P()
		})]
	}) : ee;
}
function Ii({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: s, rules: c, search: l, allowClear: u, disabled: d, hideLabel: f, inputStyle: p, onValueChange: m, lazy: h = !0, recordSource: g, fetchSelected: _ = !0, referenceForm: v, referencePermissions: y, referenceTitle: b, referenceDefaultValues: x, referenceModalWidth: S, referenceActions: C = !0, popupMatchSelectWidth: w, popupMinWidth: T }) {
	let E = ke({
		name: g ?? "",
		disabled: !g
	});
	return /* @__PURE__ */ K($, {
		source: e,
		name: t,
		label: n,
		required: s,
		rules: c,
		hideLabel: f,
		children: ({ value: e, onChange: t, disabled: n, name: s }) => /* @__PURE__ */ K(Fi, {
			reference: r,
			choices: i,
			optionLabel: a,
			optionValue: o,
			search: l,
			allowClear: u,
			disabled: n || d,
			inputStyle: p,
			onValueChange: m,
			lazy: h,
			fetchSelected: _,
			value: e,
			onChange: t,
			fieldName: s,
			selectedRecords: g ? E : void 0,
			referenceForm: v,
			referencePermissions: y,
			referenceTitle: b,
			referenceDefaultValues: x,
			referenceModalWidth: S,
			referenceActions: C,
			popupMatchSelectWidth: w,
			popupMinWidth: T
		})
	});
}
//#endregion
//#region src/crud/fields/ReferenceManyField.tsx
function Li({ reference: e, choices: t, optionLabel: n = "name", optionValue: r = "id", search: i, allowClear: a = !0, lazy: o = !0, fetchSelected: s = !0, value: l, onChange: d, disabled: f, selectedRecords: p, referenceForm: m, referencePermissions: h, referenceTitle: g, referenceDefaultValues: _, referenceModalWidth: v, referenceActions: y = !0, popupMatchSelectWidth: b, popupMinWidth: x }) {
	let [S, C] = u(), [w, T] = u(!1), E = w || !!S, D = bi(l, r), { options: O, loading: k, reload: A } = Ni(t, e, n, r, i ? S : void 0, {
		lazy: o,
		active: E,
		selectedValues: l,
		selectedRecords: p,
		fetchSelected: s
	}), j = c(() => O.map((e) => ({
		label: e.label,
		value: e.value
	})), [O]), M = /* @__PURE__ */ K(L, {
		...Ei({
			popupMatchSelectWidth: b,
			popupMinWidth: x
		}),
		mode: "multiple",
		value: D,
		onChange: d,
		options: j,
		loading: k,
		notFoundContent: Di(k),
		showSearch: i,
		filterOption: i ? !1 : void 0,
		onSearch: i ? C : void 0,
		onDropdownVisibleChange: (e) => {
			T(e), e || C(void 0);
		},
		allowClear: a,
		disabled: f,
		optionFilterProp: "label",
		style: { width: "100%" }
	});
	return y ? /* @__PURE__ */ q("div", {
		style: {
			display: "flex",
			gap: 8,
			width: "100%",
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ K("div", {
			style: {
				flex: 1,
				minWidth: 0
			},
			children: M
		}), /* @__PURE__ */ K(Pi, {
			reference: e,
			referenceForm: m,
			referencePermissions: h,
			referenceTitle: g,
			referenceDefaultValues: _,
			referenceModalWidth: v,
			disabled: f,
			onCreated: (e) => {
				let t = e[r], n = Array.isArray(D) ? D : [];
				if (n.some((e) => e === t)) {
					A();
					return;
				}
				d([...n, t]), A();
			}
		})]
	}) : M;
}
function Ri({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: s, rules: c, search: l, allowClear: u = !0, hideLabel: d, disabled: f, lazy: p = !0, recordSource: m, fetchSelected: h = !0, referenceForm: g, referencePermissions: _, referenceTitle: v, referenceDefaultValues: y, referenceModalWidth: b, referenceActions: x = !0, popupMatchSelectWidth: S, popupMinWidth: C }) {
	let w = ke({
		name: m ?? "",
		disabled: !m
	});
	return /* @__PURE__ */ K($, {
		source: e,
		name: t,
		label: n,
		required: s,
		rules: c,
		hideLabel: d,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ K(Li, {
			reference: r,
			choices: i,
			optionLabel: a,
			optionValue: o,
			search: l,
			allowClear: u,
			lazy: p,
			fetchSelected: h,
			value: e,
			onChange: t,
			disabled: n || f,
			selectedRecords: m ? w : void 0,
			referenceForm: g,
			referencePermissions: _,
			referenceTitle: v,
			referenceDefaultValues: y,
			referenceModalWidth: b,
			referenceActions: x,
			popupMatchSelectWidth: S,
			popupMinWidth: C
		})
	});
}
//#endregion
//#region src/crud/fields/uploadFieldUtils.ts
function zi(e) {
	return e instanceof File ? !0 : typeof e == "string" && e.length > 0;
}
function Bi(e) {
	if (e instanceof File) return e.name;
	if (typeof e == "string" && e.length > 0) try {
		return new URL(e, "http://local").pathname.split("/").filter(Boolean).pop() || e;
	} catch {
		return e.split("/").filter(Boolean).pop() || e;
	}
}
//#endregion
//#region src/crud/fields/useUploadPreviewUrl.ts
function Vi(e) {
	let [t, n] = u();
	if (s(() => {
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
function Hi({ value: e, onChange: t, disabled: n, clearable: r, accept: i = "image/*", previewWidth: a = 200 }) {
	let o = l(null), s = Vi(e), c = r && zi(e);
	return /* @__PURE__ */ q(R, {
		direction: "vertical",
		size: "middle",
		style: { width: "100%" },
		children: [
			s ? /* @__PURE__ */ K(M, {
				src: s,
				alt: "",
				style: {
					maxWidth: a,
					maxHeight: a,
					objectFit: "contain"
				}
			}) : null,
			/* @__PURE__ */ q(R, {
				wrap: !0,
				children: [/* @__PURE__ */ K(C, {
					icon: /* @__PURE__ */ K(xe, {}),
					disabled: n,
					onClick: () => o.current?.click(),
					children: "Choose image"
				}), c ? /* @__PURE__ */ K(C, {
					icon: /* @__PURE__ */ K(ue, {}),
					disabled: n,
					onClick: () => {
						t(null), o.current && (o.current.value = "");
					},
					children: "Clear"
				}) : null]
			}),
			/* @__PURE__ */ K("input", {
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
function Ui({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, clearable: o, accept: s, previewWidth: c }) {
	return /* @__PURE__ */ K($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ K(Hi, {
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
function Wi({ value: e, onChange: t, disabled: n, clearable: r, accept: i }) {
	let a = l(null), o = Bi(e), s = typeof e == "string" && e.length > 0 ? e : void 0, c = r && zi(e);
	return /* @__PURE__ */ q(R, {
		direction: "vertical",
		size: "middle",
		style: { width: "100%" },
		children: [
			o ? /* @__PURE__ */ q(R, { children: [/* @__PURE__ */ K(_e, {}), s ? /* @__PURE__ */ K(U.Link, {
				href: s,
				target: "_blank",
				rel: "noopener noreferrer",
				children: o
			}) : /* @__PURE__ */ K(U.Text, { children: o })] }) : null,
			/* @__PURE__ */ q(R, {
				wrap: !0,
				children: [/* @__PURE__ */ K(C, {
					icon: /* @__PURE__ */ K(xe, {}),
					disabled: n,
					onClick: () => a.current?.click(),
					children: "Choose file"
				}), c ? /* @__PURE__ */ K(C, {
					icon: /* @__PURE__ */ K(ue, {}),
					disabled: n,
					onClick: () => {
						t(null), a.current && (a.current.value = "");
					},
					children: "Clear"
				}) : null]
			}),
			/* @__PURE__ */ K("input", {
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
function Gi({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, clearable: o, accept: s }) {
	return /* @__PURE__ */ K($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ K(Wi, {
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
function Ki({ source: e, label: t, sortable: n = !0 }) {
	return Q(c(() => ({
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
function qi(e, t, n) {
	return typeof n == "function" ? n(e) : n ? ir(e, n) : e[t];
}
//#endregion
//#region src/crud/columns/NumberColumn.tsx
function Ji({ source: e, label: t, sortable: n = !0 }) {
	return Q(c(() => ({
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
function Yi({ source: e, label: t, sortable: n = !0 }) {
	return Q(c(() => ({
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
function Xi({ source: e, label: t, sortable: n = !0 }) {
	return Q(c(() => ({
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
function Zi({ record: e, source: t, display: n, reference: r, choices: i, optionLabel: a, optionValue: o }) {
	let { labelForValue: s } = Ni(i, r, a, o), c = e[t];
	if (typeof n == "function") return /* @__PURE__ */ K(G, { children: n(e) });
	if (n && n !== t) {
		let r = qi(e, t, n);
		return /* @__PURE__ */ K(G, { children: r == null ? "—" : String(r) });
	}
	return /* @__PURE__ */ K(G, { children: s(c) });
}
function Qi({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", display: o, sortable: s = !0 }) {
	return Q(c(() => ({
		key: e,
		source: e,
		label: t,
		sortable: s,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: s ? !0 : void 0,
			render: (s, c) => /* @__PURE__ */ K(Zi, {
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
		s,
		n,
		r,
		i,
		a,
		o
	])), null;
}
//#endregion
//#region src/crud/columns/ReferenceManyColumn.tsx
function $i({ record: e, source: t, reference: n, choices: r, optionLabel: i, optionValue: a }) {
	let { labelsForValues: o } = Ni(r, n, i, a), s = e[t];
	return /* @__PURE__ */ K(G, { children: o(Array.isArray(s) ? s : []) });
}
function ea({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", sortable: o = !1 }) {
	return Q(c(() => ({
		key: e,
		source: e,
		label: t,
		sortable: o,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: o ? !0 : void 0,
			render: (t, o) => /* @__PURE__ */ K($i, {
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
function ta({ source: e, label: t, sortable: n = !1, width: r = 40, height: i = 40, objectFit: a = "cover", borderRadius: o = 4, alt: s = "" }) {
	return Q(c(() => ({
		key: e,
		source: e,
		label: t,
		sortable: n,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: n ? !0 : void 0,
			render: (e) => e == null || e === "" ? null : /* @__PURE__ */ K("img", {
				src: String(e),
				alt: s,
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
		s
	])), null;
}
//#endregion
//#region src/crud/columns/CustomColumn.tsx
function na({ source: e, label: t, sortable: n = !1, render: r }) {
	return Q(c(() => ({
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
function ra({ source: e, label: t, placeholder: n }) {
	return Vn(c(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: r, onChange: i }) => /* @__PURE__ */ K(N, {
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
function ia({ source: e, label: t }) {
	return Vn(c(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ K(P, {
			placeholder: t ?? e,
			value: n,
			onChange: (e) => r(e ?? void 0),
			style: { minWidth: 120 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/BooleanFilter.tsx
function aa({ source: e, label: t }) {
	return Vn(c(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ K(L, {
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
function oa({ source: e, label: t }) {
	return Vn(c(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ K(E, {
			allowClear: !0,
			placeholder: t ?? e,
			value: n ? Ae(String(n)) : null,
			onChange: (e) => r(e ? e.format("YYYY-MM-DD") : void 0),
			style: { minWidth: 160 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/SelectFilter.tsx
function sa({ source: e, label: t, choices: n, multiple: r }) {
	return Vn(c(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: i, onChange: a }) => /* @__PURE__ */ K(L, {
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
function ca({ source: e, label: t, reference: n, choices: r, optionLabel: i, optionValue: a, multiple: o, search: s, lazy: c = !0, fetchSelected: l = !0, popupMatchSelectWidth: d, popupMinWidth: f, value: p, onChange: m }) {
	let [h, g] = u(), [_, v] = u(!1), { options: y, loading: b } = Ni(r, n, i, a, s ? h : void 0, {
		lazy: c,
		active: _ || !!h,
		selectedValues: p,
		fetchSelected: l
	});
	return /* @__PURE__ */ K(L, {
		...Ei({
			popupMatchSelectWidth: d,
			popupMinWidth: f
		}),
		allowClear: !0,
		mode: o ? "multiple" : void 0,
		placeholder: t ?? e,
		value: p,
		onChange: m,
		options: y.map((e) => ({
			label: e.label,
			value: e.value
		})),
		loading: b,
		notFoundContent: Di(b),
		showSearch: s,
		filterOption: s ? !1 : void 0,
		onSearch: s ? g : void 0,
		onDropdownVisibleChange: (e) => {
			v(e), e || g(void 0);
		},
		optionFilterProp: "label",
		style: { minWidth: 180 }
	});
}
function la({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", multiple: o, search: s, lazy: l = !0, fetchSelected: u = !0, popupMatchSelectWidth: d, popupMinWidth: f }) {
	return Vn(c(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: c, onChange: p }) => /* @__PURE__ */ K(ca, {
			source: e,
			label: t,
			reference: n,
			choices: r,
			optionLabel: i,
			optionValue: a,
			multiple: o,
			search: s,
			lazy: l,
			fetchSelected: u,
			popupMatchSelectWidth: d,
			popupMinWidth: f,
			value: c,
			onChange: p
		})
	}), [
		e,
		t,
		n,
		r,
		i,
		a,
		o,
		s,
		l,
		u,
		d,
		f
	])), null;
}
function ua(e) {
	return /* @__PURE__ */ K(la, {
		...e,
		multiple: !0
	});
}
//#endregion
export { Rt as AdminApp, Et as AdminLayout, Ke as AppThemeProvider, On as AuthAlternateLink, kn as AuthPageLayout, it as AuthProvider, Yi as BooleanColumn, ii as BooleanField, aa as BooleanFilter, na as CustomColumn, Bt as DataProvider, Xi as DateColumn, ui as DateField, oa as DateFilter, di as DateTimeField, Ye as DensitySwitch, Kt as EXPECTED_VALIDATION_BODY_HINT, $ as FieldWrapper, Gi as FileField, Br as FilterBar, $r as FormStep, ti as FormSteps, Xr as FormTab, Qr as FormTabs, Dt as Guard, kt as GuestOnly, ta as ImageColumn, Ui as ImageField, Gr as InlineFormSet, Kr as InlineFormSetStacked, An as LoginPage, Ji as NumberColumn, ri as NumberField, ia as NumberFilter, _i as PasswordField, lt as PermissionsProvider, jn as PlaceholderPage, Ot as Protected, Qi as ReferenceColumn, Ii as ReferenceField, la as ReferenceFilter, ea as ReferenceManyColumn, Ri as ReferenceManyField, ua as ReferenceManyFilter, At as RequirePermission, Vr as ResourceForm, Dr as ResourceFormModal, Rr as ResourceList, hi as SelectField, sa as SelectFilter, Ki as TextColumn, ni as TextField, ra as TextFilter, Ze as ThemeSwitch, Qe as ThemeToolbar, mi as TimeField, xn as applyInMemoryListParams, Z as asStringMessages, or as buildFormPayload, sr as buildInlineRowsPayload, hr as buildResourceFormSubmitBody, Wt as combineResourceHandlers, Lt as createAdminRouter, Sn as createMemoryResourceHandlers, ut as createPermissionsChecker, Cn as createRestResourceHandlers, st as createSessionStorageAuthAdapter, Ft as deriveAuthPaths, Qt as describeNonStandardValidationBody, _t as filterNavByPermission, yn as filterRows, sn as finalizeFormErrors, on as flattenNestedArrayErrors, tn as getErrorBody, ir as getFormValue, jt as getRouteAccess, gn as getRowById, cr as hasUploadValues, Gt as isAbortError, Hr as nestedFieldPath, un as parseDjangoDRFFormErrors, dn as parseDotNetFormErrors, fn as parseNodeFormErrors, Mt as partitionAdminRoutes, mr as prepareFormSubmitBody, rn as resolveErrorBody, ar as setFormValue, Tn as toDjangoRestOrdering, pr as toFormData, Dn as toJsonApiSort, En as toODataOrderBy, Cr as useAbortableEffect, at as useAuth, dt as useCan, Ni as useChoices, Vt as useDataProvider, Pr as useListQueryState, Y as usePermissions, Zn as useRegisterPayloadField, Qn as useRegisterSectionField, Ir as useResourceListContext, qe as useThemeMode };
