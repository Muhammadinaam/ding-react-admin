import { Children as e, createContext as t, createElement as n, forwardRef as r, isValidElement as i, useCallback as a, useContext as o, useEffect as s, useLayoutEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { Link as f, Navigate as p, Outlet as m, RouterProvider as h, createBrowserRouter as g, useLocation as _, useNavigate as v, useParams as y, useSearchParams as b } from "react-router-dom";
import { Alert as x, App as S, Avatar as C, Button as w, Card as T, ConfigProvider as E, DatePicker as D, Drawer as O, Dropdown as k, Flex as A, Form as j, Grid as M, Image as N, Input as P, InputNumber as F, Layout as ee, Menu as I, Modal as te, Popover as L, Segmented as ne, Select as R, Space as z, Spin as re, Steps as ie, Switch as ae, Table as oe, Tabs as B, TimePicker as se, Tooltip as V, Typography as H, theme as U } from "antd";
import { Fragment as W, jsx as G, jsxs as K } from "react/jsx-runtime";
import { ArrowLeftOutlined as ce, CaretDownOutlined as le, CaretUpOutlined as ue, ColumnHeightOutlined as q, DeleteOutlined as J, DesktopOutlined as de, EditOutlined as fe, LayoutOutlined as pe, LogoutOutlined as me, MenuOutlined as he, MoonOutlined as ge, PaperClipOutlined as _e, PlusOutlined as ve, SearchOutlined as ye, SettingOutlined as be, SunOutlined as xe, UploadOutlined as Se, UserOutlined as Ce } from "@ant-design/icons";
import { Controller as Y, FormProvider as we, useFieldArray as Te, useForm as Ee, useFormContext as De, useFormState as Oe, useWatch as ke } from "react-hook-form";
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
	return "compact";
}
var We = "ding-react-admin-theme-mode", Ge = "ding-react-admin-theme-density";
function Ke({ children: e, modeStorageKey: t = We, densityStorageKey: n = Ge }) {
	let [r, i] = d(() => Ve(t)), [a, o] = d(() => Ue(n)), [c, u] = d(He);
	s(() => {
		if (r !== "system") return;
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = () => u(e.matches);
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
	}, m = r === "system" ? c ? "dark" : "light" : r, h = l(() => {
		let e = m === "dark" ? U.darkAlgorithm : U.defaultAlgorithm;
		return { algorithm: a === "compact" ? [e, U.compactAlgorithm] : e };
	}, [m, a]), g = l(() => ({
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
	return /* @__PURE__ */ G(Be.Provider, {
		value: g,
		children: /* @__PURE__ */ G(E, {
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
	icon: /* @__PURE__ */ G(pe, {})
}, {
	label: "Compact",
	value: "compact",
	icon: /* @__PURE__ */ G(q, {})
}];
function Ye() {
	let { density: e, setDensity: t } = qe();
	return /* @__PURE__ */ G(ne, {
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
		icon: /* @__PURE__ */ G(xe, {})
	},
	{
		label: "Dark",
		value: "dark",
		icon: /* @__PURE__ */ G(ge, {})
	},
	{
		label: "Auto",
		value: "system",
		icon: /* @__PURE__ */ G(de, {})
	}
];
function Ze() {
	let { mode: e, setMode: t } = qe();
	return /* @__PURE__ */ G(ne, {
		size: "small",
		value: e,
		options: Xe,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeToolbar.tsx
function Qe() {
	let { token: e } = U.useToken();
	return /* @__PURE__ */ G(L, {
		placement: M.useBreakpoint().lg ? "bottomRight" : "bottom",
		trigger: "click",
		content: /* @__PURE__ */ K(z, {
			orientation: "vertical",
			size: "middle",
			style: {
				minWidth: 240,
				maxWidth: "min(92vw, 320px)"
			},
			children: [/* @__PURE__ */ G(Ze, {}), /* @__PURE__ */ G(Ye, {})]
		}),
		styles: { content: { padding: e.paddingSM } },
		children: /* @__PURE__ */ G(w, {
			type: "default",
			icon: /* @__PURE__ */ G(be, {}),
			"aria-label": "Display and theme settings"
		})
	});
}
//#endregion
//#region src/components/NavMenuSearch.tsx
function $e({ value: e, onChange: t, placeholder: n = "Search menu…", variant: r = "on-dark" }) {
	let { token: i } = U.useToken(), a = r === "on-dark";
	return /* @__PURE__ */ G("div", {
		style: {
			flexShrink: 0,
			paddingInline: i.paddingSM,
			paddingBlock: i.paddingXS
		},
		children: /* @__PURE__ */ G(E, {
			theme: a ? { token: { colorTextPlaceholder: "rgba(255, 255, 255, 0.45)" } } : void 0,
			children: /* @__PURE__ */ G(P, {
				allowClear: !0,
				size: "small",
				value: e,
				onChange: (e) => {
					t(e.target.value);
				},
				placeholder: n,
				prefix: /* @__PURE__ */ G(ye, { style: { color: a ? "rgba(255, 255, 255, 0.45)" : i.colorTextDescription } }),
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
	let { token: a } = U.useToken(), o = r === "on-dark" ? "rgba(255, 255, 255, 0.22)" : a.colorTextQuaternary, s = r === "on-dark" ? "rgba(255, 255, 255, 0.38)" : a.colorTextTertiary;
	return /* @__PURE__ */ G("div", {
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
	let [n, r] = d(() => t.getToken()), [i, o] = d(() => rt(t)), s = a(async (e) => {
		await t.login(e), r(t.getToken()), o(rt(t));
	}, [t]), c = a(() => {
		t.logout(), r(t.getToken()), o(rt(t));
	}, [t]), u = l(() => ({
		isAuthenticated: !!n,
		userLabel: i,
		login: s,
		logout: c
	}), [
		n,
		i,
		s,
		c
	]);
	return /* @__PURE__ */ G(tt.Provider, {
		value: u,
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
	let n = l(() => t, [t]);
	return /* @__PURE__ */ G(ct.Provider, {
		value: n,
		children: e
	});
}
function X() {
	let e = o(ct);
	if (!e) throw Error("usePermissions must be used within PermissionsProvider");
	return e;
}
function ut(e) {
	return (t) => e()?.includes(t) ?? !1;
}
function dt(e) {
	let t = X();
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
	return t ? /* @__PURE__ */ G(V, {
		title: t,
		placement: "right",
		mouseEnterDelay: 0,
		destroyOnHidden: !0,
		children: /* @__PURE__ */ G("span", {
			className: "ding-admin-menu-label",
			children: e
		})
	}) : /* @__PURE__ */ G("span", {
		className: "ding-admin-menu-label",
		children: e
	});
}
//#endregion
//#region src/layouts/navMenuItems.tsx
function gt(e, t) {
	let n = t?.showLabelTooltip !== !1, r = t?.wrapLabels === !0, i = t?.collapsed === !0;
	return e.map((e) => {
		let a = e.Icon, o = a ? /* @__PURE__ */ G(a, {}) : void 0, s = ft(e), c = s && n ? /* @__PURE__ */ G(ht, {
			label: e.label,
			title: s
		}) : r ? /* @__PURE__ */ G(ht, {
			label: e.label,
			title: ""
		}) : e.label, l = i && s ? { title: s } : {};
		return e.children?.length ? {
			key: e.path,
			icon: o,
			label: c,
			...l,
			children: gt(e.children, t)
		} : {
			key: e.path,
			icon: o,
			label: c,
			...l
		};
	});
}
//#endregion
//#region src/permissions/resourcePermissions.ts
function Z(e, t, n) {
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
	return M.useBreakpoint().lg !== !0;
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
function wt({ wrapLabels: e, itemDivider: t = "none" }) {
	let n = ["ding-admin-nav-menu"];
	return e && n.push("ding-admin-nav-menu--wrap-labels"), t === "full" ? n.push("ding-admin-nav-menu--item-divider-full") : t === "inset" && n.push("ding-admin-nav-menu--item-divider-inset"), n.join(" ");
}
function Tt({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a, navQuery: o, onNavQueryChange: s, showNavSearch: c, navSearchPlaceholder: l, scrollVariant: u, searchVariant: d, wrapLabels: f, itemDivider: p }) {
	return /* @__PURE__ */ K(W, { children: [c && !n ? /* @__PURE__ */ G($e, {
		value: o,
		onChange: s,
		placeholder: l,
		variant: d
	}) : null, /* @__PURE__ */ G(et, {
		variant: u,
		style: {
			flex: 1,
			minHeight: 0,
			overflowY: "auto",
			overflowX: "hidden"
		},
		children: /* @__PURE__ */ G(Et, {
			menuItems: e,
			selectedKeys: t,
			inlineCollapsed: n,
			openKeys: r,
			onOpenChange: i,
			onNavigate: a,
			wrapLabels: f,
			itemDivider: p
		})
	})] });
}
function Et({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a, wrapLabels: o, itemDivider: s }) {
	return /* @__PURE__ */ G(I, {
		className: wt({
			wrapLabels: o,
			itemDivider: s
		}),
		mode: "inline",
		theme: "dark",
		inlineCollapsed: n,
		selectedKeys: t,
		tooltip: {
			placement: "right",
			mouseEnterDelay: 0
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
function Dt({ navItems: e, brand: t = "Admin", collapsedBrand: n = "A", mobileDrawerTitle: r, headerExtras: i, userMenuItems: o, onUserMenuClick: c, loginPath: f = "/login", siderCollapsedStorageKey: p = yt, navSearch: h = !0, navMenu: g }) {
	let y = v(), b = _(), { resolved: x } = qe(), S = x === "dark", { logout: T, userLabel: E } = at(), D = X(), [A, j] = d(() => bt(p)), [M, N] = d(!1), P = xt(), { token: F } = U.useToken(), I = u(null), [te, L] = d(""), ne = h !== !1, R = typeof h == "object" ? h.placeholder : void 0, z = g?.wrapLabels !== !1, re = g?.itemDivider ?? "inset", ie = r ?? t, ae = () => {
		T(), y(f, { replace: !0 });
	}, oe = a((e) => {
		j(e);
		try {
			localStorage.setItem(p, e ? "1" : "0");
		} catch {}
	}, [p]);
	s(() => {
		P || N(!1);
	}, [P]), s(() => {
		N(!1);
	}, [b.pathname]), s(() => {
		I.current?.scrollTo({
			top: 0,
			left: 0
		});
	}, [b.pathname]), s(() => {
		A && L("");
	}, [A]);
	let B = l(() => _t(e, D), [e, D]), se = te.trim(), V = se.length > 0, W = l(() => V ? pt(B, se) : B, [
		B,
		se,
		V
	]), ce = l(() => St(W), [W]), le = l(() => gt(W, {
		showLabelTooltip: !A && !z,
		wrapLabels: z && !A,
		collapsed: A
	}), [
		W,
		A,
		z
	]), ue = l(() => mt(W), [W]), q = l(() => Ct(B, b.pathname), [B, b.pathname]), [J, de] = d(() => Ct(B, b.pathname));
	s(() => {
		de((e) => [...new Set([...e, ...q])]);
	}, [q]);
	let fe = a((e) => {
		de(e);
	}, []), pe = V ? ue : J, ge = a((e) => {
		L(e);
	}, []), _e = l(() => [{
		key: "logout",
		icon: /* @__PURE__ */ G(me, {}),
		label: "Log out",
		danger: !0
	}], []), ve = o ?? _e, ye = (e) => {
		if (c) {
			c(e);
			return;
		}
		e.key === "logout" && ae();
	}, be = S ? F.colorBgContainer : vt, xe = S ? "default" : "on-dark", Se = S ? "app" : "on-dark", Y = [b.pathname], we = (e) => {
		ce.has(e) && (y(e), P && N(!1));
	};
	return /* @__PURE__ */ K(ee, {
		style: {
			height: "100vh",
			width: "100%",
			overflow: "hidden",
			background: F.colorBgLayout
		},
		children: [
			!P && /* @__PURE__ */ G(ee.Sider, {
				collapsible: !0,
				collapsed: A,
				onCollapse: oe,
				collapsedWidth: 64,
				style: {
					background: be,
					height: "100vh",
					overflow: "hidden",
					borderInlineEnd: S ? `1px solid ${F.colorSplit}` : void 0
				},
				children: /* @__PURE__ */ K("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						height: "100%",
						overflow: "hidden"
					},
					children: [/* @__PURE__ */ G("div", {
						style: {
							height: 64,
							flexShrink: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontWeight: 600
						},
						children: /* @__PURE__ */ G(H.Text, {
							strong: !0,
							style: { color: F.colorTextLightSolid },
							children: A ? n : t
						})
					}), /* @__PURE__ */ G(Tt, {
						menuItems: le,
						selectedKeys: Y,
						inlineCollapsed: A,
						openKeys: pe,
						onOpenChange: fe,
						onNavigate: we,
						navQuery: te,
						onNavQueryChange: ge,
						showNavSearch: ne,
						navSearchPlaceholder: R,
						scrollVariant: xe,
						searchVariant: Se,
						wrapLabels: z,
						itemDivider: re
					})]
				})
			}),
			P && /* @__PURE__ */ G(O, {
				title: /* @__PURE__ */ G(H.Text, {
					strong: !0,
					style: { color: F.colorTextLightSolid },
					children: ie
				}),
				placement: "left",
				size: 280,
				onClose: () => N(!1),
				open: M,
				styles: {
					header: {
						background: be,
						borderBottom: `1px solid ${F.colorSplit}`
					},
					body: {
						padding: 0,
						background: be
					}
				},
				destroyOnHidden: !0,
				children: /* @__PURE__ */ G("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						height: "100%",
						overflow: "hidden"
					},
					children: /* @__PURE__ */ G(Tt, {
						menuItems: le,
						selectedKeys: Y,
						inlineCollapsed: !1,
						openKeys: pe,
						onOpenChange: fe,
						onNavigate: we,
						navQuery: te,
						onNavQueryChange: ge,
						showNavSearch: ne,
						navSearchPlaceholder: R,
						scrollVariant: xe,
						searchVariant: Se,
						wrapLabels: z,
						itemDivider: re
					})
				})
			}),
			/* @__PURE__ */ K(ee, {
				style: {
					minWidth: 0,
					flex: 1,
					height: "100vh",
					overflow: "hidden",
					display: "flex",
					flexDirection: "column"
				},
				children: [/* @__PURE__ */ K(ee.Header, {
					style: {
						background: F.colorBgContainer,
						paddingInline: F.paddingLG,
						display: "flex",
						alignItems: "center",
						gap: F.marginSM,
						lineHeight: "normal",
						flexShrink: 0
					},
					children: [
						P && /* @__PURE__ */ G(w, {
							type: "text",
							icon: /* @__PURE__ */ G(he, {}),
							onClick: () => N(!0),
							"aria-label": "Open navigation"
						}),
						/* @__PURE__ */ G("div", { style: {
							flex: 1,
							minWidth: 0
						} }),
						i,
						/* @__PURE__ */ G(Qe, {}),
						/* @__PURE__ */ G(k, {
							menu: {
								items: ve,
								onClick: ye
							},
							trigger: ["click"],
							children: /* @__PURE__ */ K(w, {
								type: "text",
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: F.marginXS,
									maxWidth: P ? 44 : void 0,
									paddingInline: P ? F.paddingXS : void 0
								},
								"aria-label": "Account menu",
								children: [/* @__PURE__ */ G(C, {
									size: "small",
									icon: /* @__PURE__ */ G(Ce, {})
								}), !P && /* @__PURE__ */ G(H.Text, {
									type: "secondary",
									ellipsis: !0,
									style: { maxWidth: 160 },
									children: E
								})]
							})
						})
					]
				}), /* @__PURE__ */ G(ee.Content, {
					style: {
						minWidth: 0,
						flex: 1,
						minHeight: 0,
						display: "flex",
						flexDirection: "column"
					},
					children: /* @__PURE__ */ G(et, {
						ref: I,
						style: {
							margin: P ? F.marginSM : F.marginLG,
							flex: 1,
							minHeight: 0,
							overflow: "auto"
						},
						children: /* @__PURE__ */ G(m, {})
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/router/guards.tsx
function Ot({ when: e, redirect: t, children: n }) {
	return e ? n : /* @__PURE__ */ G(p, {
		to: t,
		replace: !0
	});
}
function kt({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = at();
	return /* @__PURE__ */ G(Ot, {
		when: n,
		redirect: t,
		children: e
	});
}
function At({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = at();
	return /* @__PURE__ */ G(Ot, {
		when: !n,
		redirect: t,
		children: e
	});
}
function jt({ permission: e, redirect: t, children: n }) {
	return /* @__PURE__ */ G(Ot, {
		when: X()(e),
		redirect: t,
		children: n
	});
}
//#endregion
//#region src/router/routeAccess.ts
function Mt(e) {
	return e.access ?? "protected";
}
function Nt(e) {
	let t = [], n = [], r = [];
	for (let i of e) {
		let e = Mt(i);
		e === "guest" ? t.push(i) : e === "public" ? n.push(i) : r.push(i);
	}
	return {
		guest: t,
		public: n,
		protected: r
	};
}
function Pt(e) {
	return e.replace(/^\/+/, "");
}
function Ft(e) {
	return `/${Pt(e)}`;
}
function It(e, t) {
	let { guest: n, protected: r } = Nt(e), i = n.find((e) => "path" in e && e.path), a = r.find((e) => "index" in e && e.index), o = r.find((e) => "path" in e && e.path), s = t?.unauthenticated;
	!s && i && "path" in i && i.path && (s = Ft(i.path));
	let c = t?.afterLogin;
	if (c || (a ? c = "/" : o && "path" in o && o.path && (c = Ft(o.path))), r.length > 0 && !s) throw Error("createAdminRouter: protected routes require redirects.unauthenticated or a guest route (access: \"guest\").");
	if (n.length > 0 && !c) throw Error("createAdminRouter: guest routes require redirects.afterLogin or a protected route (index or path).");
	return {
		loginPath: s ?? "/",
		homePath: c ?? "/"
	};
}
function Lt(e) {
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
function Rt({ navItems: e, children: t, layoutProps: n, redirects: r }) {
	let { loginPath: i, homePath: a } = It(t, r), { guest: o, public: s, protected: c } = Nt(t), l = [];
	for (let e of o) !("path" in e) || !e.path || l.push({
		path: Pt(e.path),
		element: /* @__PURE__ */ G(At, {
			redirectTo: a,
			children: e.element
		})
	});
	for (let e of s) !("path" in e) || !e.path || l.push({
		path: Pt(e.path),
		element: e.element
	});
	return c.length > 0 && l.push({
		path: "/",
		element: /* @__PURE__ */ G(kt, {
			redirectTo: i,
			children: /* @__PURE__ */ G(Dt, {
				navItems: e,
				loginPath: i,
				...n
			})
		}),
		children: c.map(Lt)
	}), l.push({
		path: "*",
		element: /* @__PURE__ */ G(p, {
			to: a,
			replace: !0
		})
	}), g(l);
}
//#endregion
//#region src/app/AdminApp.tsx
function zt({ navItems: e, routes: t, authRedirects: n, layoutProps: r, theme: i }) {
	let a = l(() => Rt({
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
	return /* @__PURE__ */ G(Ke, {
		...i,
		children: /* @__PURE__ */ G(h, { router: a })
	});
}
//#endregion
//#region src/context/DataProvider.tsx
var Bt = t(null);
function Vt({ children: e, value: t }) {
	let n = l(() => t, [t]);
	return /* @__PURE__ */ G(Bt.Provider, {
		value: n,
		children: e
	});
}
function Ht() {
	let e = o(Bt);
	if (!e) throw Error("useDataProvider must be used within DataProvider");
	return e;
}
//#endregion
//#region src/data/resourceHandlers.ts
function Ut(e) {
	return "handlers" in e ? e : { handlers: e };
}
function Wt(e, t, n) {
	if (!(!e || !t) && !Z(e, t, n)) throw Error("Forbidden");
}
function Gt(e, t) {
	let { can: n, guard: r, parseFormError: i } = t ?? {}, a = (t) => {
		let n = e[t];
		if (!n) throw Error(`Unknown resource: ${t}`);
		return Ut(n);
	};
	return {
		async getList(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "list"), Wt(n, o, "list"), i.getList(t);
		},
		async getOne(e, t, i) {
			let { handlers: o, permissions: s } = a(e);
			return r?.(e, "read"), Wt(n, s, "read"), o.getOne(t, i);
		},
		async create(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "add"), Wt(n, o, "add"), i.create(t);
		},
		async update(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "change"), Wt(n, o, "change"), i.update(t);
		},
		async delete(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "delete"), Wt(n, o, "delete"), i.delete(t);
		},
		parseFormError: i
	};
}
//#endregion
//#region src/data/abortError.ts
function Kt(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return t.name === "AbortError" || t.name === "CanceledError" || t.code === "ERR_CANCELED";
}
//#endregion
//#region src/data/parseFormErrorHelpers.ts
var qt = "Expected HTTP 400 with a JSON object such as `{ \"field_name\": [\"message\"] }` or `{ \"non_field_errors\": [\"message\"] }`.", Jt = 300;
function Q(e) {
	if (typeof e == "string") return [e];
	if (Array.isArray(e)) {
		let t = e.filter((e) => typeof e == "string");
		if (t.length) return t;
	}
	return [];
}
function Yt(e) {
	return e.length === 1 ? e[0] : e;
}
function Xt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Zt(e) {
	return typeof Response < "u" && e instanceof Response ? !0 : typeof e == "object" && !!e && typeof e.json == "function" && typeof e.status == "number" && e.headers != null;
}
function Qt(e, t) {
	if (t) return t;
	if (e === null) return "(no JSON body)";
	try {
		let t = JSON.stringify(e);
		return t.length > Jt ? `${t.slice(0, Jt)}…` : t;
	} catch {
		return String(e);
	}
}
function $t(e, t) {
	return `Non-standard validation response. ${qt} Received: ${Qt(e, t?.hint)}`;
}
function en(e) {
	if (!e || typeof e != "object") return null;
	let t = e.response;
	if (!t || typeof t != "object") return null;
	let n = t.status;
	return typeof n == "number" && (n === 400 || n === 422) ? n : null;
}
function tn(e) {
	if (!e || typeof e != "object") return null;
	let t = e.response;
	return Zt(t) ? t.headers.get("content-type") : null;
}
function nn(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (Xt(t.body)) return t.body;
	if (Xt(t.data)) return t.data;
	let n = t.response;
	if (n && typeof n == "object" && !Array.isArray(n)) {
		let e = n.data;
		if (Xt(e)) return e;
	}
	return null;
}
function rn(e) {
	if (Xt(e)) return e;
	if (Array.isArray(e)) {
		let t = Q(e);
		return t.length ? { non_field_errors: Yt(t) } : null;
	}
	return null;
}
async function an(e) {
	let t = nn(e);
	if (t) return t;
	if (!e || typeof e != "object") return null;
	let n = e.response;
	if (!Zt(n)) return null;
	let r = n.headers.get("content-type");
	if (!r || !/application\/json/i.test(r)) return null;
	try {
		return rn(await n.clone().json());
	} catch {
		return null;
	}
}
function on(e) {
	return Array.isArray(e) ? e.some((e) => e && typeof e == "object" && !Array.isArray(e) && Object.values(e).some((e) => Q(e).length > 0)) : !1;
}
function sn(e, t, n) {
	t.forEach((t, r) => {
		if (!(!t || typeof t != "object" || Array.isArray(t))) for (let [i, a] of Object.entries(t)) {
			let t = Q(a);
			t.length && (n[`${e}.${r}.${i}`] = Yt(t));
		}
	});
}
function cn(e, t) {
	return {
		fields: Object.keys(e).length ? e : void 0,
		global: t.length ? t : void 0
	};
}
var ln = new Set(["non_field_errors", "detail"]);
function un(e) {
	let t = {}, n = [];
	for (let [r, i] of Object.entries(e)) {
		if (ln.has(r)) {
			n.push(...Q(i));
			continue;
		}
		if (on(i)) {
			sn(r, i, t);
			continue;
		}
		let e = Q(i);
		e.length && (t[r] = Yt(e));
	}
	return !Object.keys(t).length && !n.length ? null : cn(t, n);
}
function dn(e, t) {
	let n = nn(e);
	return n ? un(n) : null;
}
function fn(e, t, n) {
	let r = nn(e);
	if (!r) return null;
	let i = n?.camelCase ?? !0, a = n?.fieldMap, o = {}, s = [];
	n?.includeSummary && (s.push(...Q(r.title)), s.push(...Q(r.message)));
	let c = r.errors;
	if (c && typeof c == "object" && !Array.isArray(c)) for (let [e, t] of Object.entries(c)) {
		let n = a?.[e] ?? (i ? hn(e) : e), r = Q(t);
		r.length && (o[n] = Yt(r));
	}
	return !Object.keys(o).length && !s.length ? null : cn(o, s);
}
function pn(e, t, n) {
	let r = nn(e);
	if (!r) return null;
	let i = {}, a = [], o = n?.fieldMap, s = r.errors;
	if (Array.isArray(s)) for (let e of s) {
		if (!e || typeof e != "object") continue;
		let t = e, n = typeof t.path == "string" && t.path || typeof t.param == "string" && t.param || typeof t.field == "string" && t.field, r = Q(t.msg)[0] ?? Q(t.message)[0];
		r && (n ? mn(i, o?.[n] ?? n, r) : a.push(r));
	}
	else if (s && typeof s == "object") for (let [e, t] of Object.entries(s)) {
		let n = o?.[e] ?? e, r = Q(t);
		r.length && (i[n] = Yt(r));
	}
	let c = r.details;
	if (Array.isArray(c)) for (let e of c) {
		if (!e || typeof e != "object") continue;
		let t = e, n = (Array.isArray(t.path) ? t.path : []).map((e) => String(e)).join("."), r = Q(t.message)[0];
		if (r) if (n) {
			let e = o?.[n] ?? n;
			i[e] = r;
		} else a.push(r);
	}
	return a.push(...Q(r.error)), !Object.keys(i).length && !a.length ? null : cn(i, a);
}
function mn(e, t, n) {
	let r = e[t];
	if (!r) {
		e[t] = n;
		return;
	}
	e[t] = Array.isArray(r) ? [...r, n] : [r, n];
}
function hn(e) {
	return e && e.charAt(0).toLowerCase() + e.slice(1);
}
//#endregion
//#region src/data/inMemoryList.ts
function gn(e, t) {
	return e === t || String(e) === String(t);
}
function _n(e, t) {
	let n = e.find((e) => gn(e.id, t));
	if (!n) throw Error("Not found");
	return n;
}
function vn(e, t) {
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
function yn(e, t) {
	return t == null || t === "" ? !0 : Array.isArray(t) ? t.length === 0 ? !0 : Array.isArray(e) ? t.some((t) => e.includes(t)) : t.includes(e) : Array.isArray(e) ? e.includes(t) : typeof t == "string" && typeof e == "string" ? e.toLowerCase().includes(t.toLowerCase()) : e === t;
}
function bn(e, t) {
	return t ? e.filter((e) => Object.entries(t).every(([t, n]) => yn(e[t], n))) : e;
}
function xn(e, t, n) {
	let r = (t - 1) * n;
	return {
		data: e.slice(r, r + n),
		total: e.length
	};
}
function Sn(e, t) {
	let { pagination: n, sort: r, filter: i } = t, a = bn(e, i);
	if (r) {
		let e = Array.isArray(r) ? r : [r];
		e.length > 0 && e[0]?.field && (a = vn(a, e));
	}
	return n ? xn(a, n.page, n.perPage) : {
		data: a,
		total: a.length
	};
}
//#endregion
//#region src/data/createMemoryResourceHandlers.ts
function Cn(e) {
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
			return Sn(t(e.scopeList ? e.scopeList(e.getRows(), n) : e.getRows()), n);
		},
		async getOne(t, n) {
			return { data: _n(e.getRows(), t) };
		},
		async create(t) {
			let r = n(t, e.nextId());
			return e.getRows().push(r), { data: r };
		},
		async update({ id: t, data: n }) {
			let i = _n(e.getRows(), t), a = r(i, n);
			return Object.assign(i, a), { data: i };
		},
		async delete(t) {
			let n = e.getRows(), r = n.findIndex((e) => gn(e.id, t));
			if (r < 0) return { data: null };
			let [i] = n.splice(r, 1);
			return e.afterDelete?.(i), { data: i };
		}
	};
}
//#endregion
//#region src/data/createRestResourceHandlers.ts
function wn(e) {
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
function Tn(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function En(e) {
	let t = Tn(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function Dn(e) {
	let t = Tn(e);
	if (t.length !== 0) return t.map((e) => `${e.field} ${e.order === "DESC" ? "desc" : "asc"}`).join(",");
}
function On(e) {
	let t = Tn(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
//#endregion
//#region src/components/AuthAlternateLink.tsx
function kn({ prompt: e, linkText: t, to: n }) {
	return /* @__PURE__ */ K(H.Paragraph, {
		type: "secondary",
		style: {
			textAlign: "center",
			marginBottom: 0
		},
		children: [
			e,
			" ",
			/* @__PURE__ */ G(f, {
				to: n,
				children: t
			})
		]
	});
}
//#endregion
//#region src/layouts/AuthPageLayout.tsx
function An({ children: e, brand: t, footer: n, showThemeToolbar: r = !0 }) {
	let { token: i } = U.useToken();
	return /* @__PURE__ */ K(A, {
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
			r ? /* @__PURE__ */ G(A, {
				justify: "flex-end",
				style: {
					flexShrink: 0,
					width: "100%",
					padding: 16,
					background: i.colorBgLayout
				},
				children: /* @__PURE__ */ G(Qe, {})
			}) : null,
			t ? /* @__PURE__ */ G("div", {
				style: {
					flexShrink: 0,
					textAlign: "center",
					padding: "0 24px 16px"
				},
				children: t
			}) : null,
			/* @__PURE__ */ G(et, {
				style: {
					flex: 1,
					minHeight: 0,
					width: "100%",
					background: i.colorBgLayout
				},
				children: /* @__PURE__ */ K(A, {
					vertical: !0,
					align: "center",
					justify: "flex-start",
					style: {
						width: "100%",
						minHeight: "100%",
						padding: "0 24px 24px"
					},
					children: [e, n ? /* @__PURE__ */ G("div", {
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
function jn({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, brand: r, extraFields: i, showThemeToolbar: a = !0, afterLoginPath: o = "/", alternateAuth: s, footer: c }) {
	let { login: l } = at(), u = v();
	return /* @__PURE__ */ G(An, {
		brand: r ?? n,
		footer: c ?? (s ? /* @__PURE__ */ G(kn, {
			prompt: s.prompt ?? "Don't have an account?",
			linkText: s.linkText,
			to: s.to
		}) : null),
		showThemeToolbar: a,
		children: /* @__PURE__ */ K(T, {
			style: {
				width: "100%",
				maxWidth: 360
			},
			title: e,
			children: [t ? /* @__PURE__ */ G(H.Paragraph, {
				type: "secondary",
				style: { marginTop: 0 },
				children: t
			}) : null, /* @__PURE__ */ K(j, {
				layout: "vertical",
				onFinish: async (e) => {
					await l({
						username: String(e.username ?? ""),
						password: String(e.password ?? ""),
						...e
					}), u(o, { replace: !0 });
				},
				children: [
					/* @__PURE__ */ G(j.Item, {
						name: "username",
						label: "Username",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ G(P, { autoComplete: "username" })
					}),
					/* @__PURE__ */ G(j.Item, {
						name: "password",
						label: "Password",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ G(P.Password, { autoComplete: "current-password" })
					}),
					i,
					/* @__PURE__ */ G(j.Item, {
						style: { marginBottom: 0 },
						children: /* @__PURE__ */ G(w, {
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
function Mn({ title: e }) {
	return /* @__PURE__ */ G(H.Title, {
		level: 3,
		style: { marginTop: 0 },
		children: e
	});
}
//#endregion
//#region src/crud/utils/sortQueryParam.ts
function Nn(e) {
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
function Pn(e) {
	return e.length === 0 ? null : e.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function Fn(e) {
	return new Map(e.map((e, t) => [e.field, t + 1]));
}
//#endregion
//#region src/crud/context/ListContext.tsx
var In = t(null);
function Ln({ children: e, toggleSort: t, sort: n }) {
	let [r, i] = d([]), o = l(() => new Set(n.map((e) => e.field)), [n]), s = l(() => new Map(n.map((e) => [e.field, e.order])), [n]), c = l(() => Fn(n), [n]), u = a((e) => (i((t) => {
		let n = t.findIndex((t) => t.key === e.key);
		if (n < 0) return [...t, e];
		if (t[n] === e) return t;
		let r = [...t];
		return r[n] = e, r;
	}), () => {
		i((t) => t.filter((t) => t.key !== e.key));
	}), []), f = l(() => ({
		columns: r,
		toggleSort: t,
		sortFields: o,
		sortOrders: s,
		sortPriorities: c,
		registerColumn: u
	}), [
		r,
		t,
		o,
		s,
		c,
		u
	]);
	return /* @__PURE__ */ G(In.Provider, {
		value: f,
		children: e
	});
}
function Rn() {
	let e = o(In);
	if (!e) throw Error("Column components must be used within ResourceList");
	return e;
}
function zn(e) {
	let { registerColumn: t } = Rn();
	s(() => t(e), [t, e]);
}
//#endregion
//#region src/crud/utils/useDebouncedValue.ts
function Bn(e, t) {
	let [n, r] = d(e);
	return s(() => {
		if (t <= 0) {
			r(e);
			return;
		}
		let n = window.setTimeout(() => r(e), t);
		return () => window.clearTimeout(n);
	}, [e, t]), t <= 0 ? e : n;
}
//#endregion
//#region src/crud/filters/TextFilter.tsx
var Vn = 300;
function Hn(e) {
	if (!(e == null || e === "")) return String(e);
}
function Un({ value: e, onChange: t, placeholder: n, debounceMs: r }) {
	let [i, a] = d(() => e ?? ""), o = Bn(i, r);
	return s(() => {
		a(e ?? "");
	}, [e]), s(() => {
		if (r <= 0 || o !== i) return;
		let n = Hn(o);
		n !== Hn(e) && t(n);
	}, [
		o,
		i,
		r,
		t,
		e
	]), /* @__PURE__ */ G(P, {
		allowClear: !0,
		placeholder: n,
		value: i,
		onChange: (e) => {
			let n = e.target.value;
			a(n), (r <= 0 || n === "") && t(Hn(n));
		},
		style: { minWidth: 160 }
	});
}
function Wn({ source: e, label: t, placeholder: n, debounceMs: r }) {
	let i = qn(), a = r ?? i?.textFilterDebounceMs ?? 300;
	return Jn(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: r, onChange: i }) => /* @__PURE__ */ G(Un, {
			value: r,
			onChange: i,
			placeholder: n ?? t ?? e,
			debounceMs: a
		})
	}), [
		e,
		t,
		n,
		a
	])), null;
}
//#endregion
//#region src/crud/context/FilterContext.tsx
var Gn = t(null);
function Kn({ children: e, values: t, setFilterValue: n, textFilterDebounceMs: r = 300 }) {
	let [i, o] = d([]), s = a((e) => (o((t) => {
		let n = t.findIndex((t) => t.key === e.key);
		if (n < 0) return [...t, e];
		if (t[n] === e) return t;
		let r = [...t];
		return r[n] = e, r;
	}), () => {
		o((t) => t.filter((t) => t.key !== e.key));
	}), []), c = l(() => ({
		filters: i,
		values: t,
		setFilterValue: n,
		registerFilter: s,
		textFilterDebounceMs: r
	}), [
		i,
		t,
		n,
		s,
		r
	]);
	return /* @__PURE__ */ G(Gn.Provider, {
		value: c,
		children: e
	});
}
function qn() {
	return o(Gn);
}
function Jn(e) {
	let t = qn()?.registerFilter;
	s(() => {
		if (t) return t(e);
	}, [t, e]);
}
//#endregion
//#region src/crud/context/FormContext.tsx
var Yn = t(null);
function Xn({ children: e, resource: t, isNew: n, disabled: r }) {
	return /* @__PURE__ */ G(Yn.Provider, {
		value: {
			resource: t,
			isNew: n,
			disabled: r
		},
		children: e
	});
}
function Zn() {
	return o(Yn);
}
//#endregion
//#region src/crud/context/FormSectionContext.tsx
var Qn = t(null);
function $n({ sourcesRef: e, children: t }) {
	return /* @__PURE__ */ G(Qn.Provider, {
		value: e,
		children: t
	});
}
function er() {
	return o(Qn);
}
//#endregion
//#region src/crud/context/PayloadFieldsContext.tsx
var tr = t(null);
function nr({ children: e, fieldsRef: t }) {
	return /* @__PURE__ */ G(tr.Provider, {
		value: t,
		children: e
	});
}
function rr() {
	return o(tr);
}
function ir(e, t = !0) {
	let n = rr();
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
function ar(e, t = !0) {
	let n = er();
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
var or = t(null);
function sr({ children: e, registryRef: t }) {
	return /* @__PURE__ */ G(or.Provider, {
		value: t,
		children: e
	});
}
function cr() {
	return o(or);
}
function lr(e, t, n, r, i = !0) {
	let a = cr();
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
function ur({ errors: e }) {
	return e.length ? e.length === 1 ? /* @__PURE__ */ G(x, {
		type: "error",
		title: e[0],
		showIcon: !0,
		style: { marginBottom: 16 }
	}) : /* @__PURE__ */ G(x, {
		type: "error",
		title: "Could not save",
		showIcon: !0,
		style: { marginBottom: 16 },
		description: /* @__PURE__ */ G("ul", {
			style: {
				margin: 0,
				paddingLeft: 20
			},
			children: e.map((e) => /* @__PURE__ */ G("li", { children: e }, e))
		})
	}) : null;
}
//#endregion
//#region src/crud/utils/getFormValue.ts
function dr(e, t) {
	let n = t.split("."), r = e;
	for (let e of n) {
		if (typeof r != "object" || !r) return;
		r = r[e];
	}
	return r;
}
//#endregion
//#region src/crud/utils/setFormValue.ts
function fr(e, t, n) {
	let r = t.split("."), i = e;
	for (let e = 0; e < r.length - 1; e++) {
		let t = r[e], n = i[t];
		(typeof n != "object" || !n || Array.isArray(n)) && (i[t] = {}), i = i[t];
	}
	i[r[r.length - 1]] = n;
}
//#endregion
//#region src/crud/utils/buildFormPayload.ts
function pr(e, t) {
	if (t.length === 0) return { ...e };
	let n = {};
	for (let r of t) {
		let t = dr(e, r);
		t !== void 0 && fr(n, r, t);
	}
	return n;
}
//#endregion
//#region src/crud/utils/buildInlineRowsPayload.ts
function mr(e, t, n) {
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
function hr(e) {
	return e instanceof Blob ? !0 : Array.isArray(e) ? e.some(hr) : e && typeof e == "object" ? Object.values(e).some(hr) : !1;
}
//#endregion
//#region src/crud/utils/uploadReferenceUtils.ts
function gr(e) {
	return /^https?:\/\//i.test(e) || e.startsWith("/media/");
}
function _r(e, t) {
	if (!t) return e;
	if (typeof e == "string") return gr(e) ? void 0 : e;
	if (Array.isArray(e)) return e.map((e) => _r(e, t)).filter((e) => e !== void 0);
	if (e && typeof e == "object" && !(e instanceof Blob)) {
		let n = {};
		for (let [r, i] of Object.entries(e)) {
			let e = _r(i, t);
			e !== void 0 && (n[r] = e);
		}
		return n;
	}
	return e;
}
function vr(e, t = !0) {
	return _r(e, t);
}
//#endregion
//#region src/crud/utils/toFormData.ts
function yr(e, t, n, r) {
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
			if (r.skipExistingUploadUrls && gr(n)) return;
			e.append(t, n);
			return;
		}
		if (Array.isArray(n)) {
			n.forEach((n, i) => {
				yr(e, `${t}[${i}]`, n, r);
			});
			return;
		}
		if (typeof n == "object") {
			for (let [i, a] of Object.entries(n)) yr(e, `${t}[${i}]`, a, r);
			return;
		}
		e.append(t, String(n));
	}
}
function br(e, t) {
	let n = { skipExistingUploadUrls: t?.skipExistingUploadUrls ?? !0 }, r = new FormData();
	for (let [t, i] of Object.entries(e)) yr(r, t, i, n);
	return r;
}
//#endregion
//#region src/crud/utils/prepareFormSubmitBody.ts
function xr(e, t) {
	let n = t?.skipExistingUploadUrls ?? !0;
	return hr(e) ? br(e, t) : vr(e, n);
}
//#endregion
//#region src/crud/utils/buildResourceFormSubmitBody.ts
function Sr(e, t, n, r) {
	let i = pr(e, t);
	if (n) for (let t of n) {
		let n = e[t.field], r = t.payloadKey ?? t.field;
		i[r] = mr(n, t.sources, { transformRows: t.transformRows });
	}
	return xr(i, r);
}
//#endregion
//#region src/crud/utils/formErrors.ts
function Cr(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function wr(e) {
	return Array.isArray(e) ? e.join(", ") : e;
}
function Tr(e, t, n) {
	if (t.has(e)) return !0;
	let r = e.match(/^([^.]+)\.(\d+)\.([^.]+)$/);
	if (!r) return !1;
	let [, i, , a] = r;
	return n.get(i)?.sources.includes(a) ?? !1;
}
function Er(e, t, n) {
	let r = {}, i = [...Cr(e.global)];
	for (let [a, o] of Object.entries(e.fields ?? {})) Tr(a, t, n) ? r[a] = o : i.push(wr(o));
	return {
		fieldErrors: r,
		globalErrors: i
	};
}
function Dr(e, t) {
	for (let [n, r] of Object.entries(t)) e.setError(n, {
		type: "server",
		message: wr(r)
	});
}
function Or(e) {
	let t = tn(e);
	if (t && !/application\/json/i.test(t)) return `non-JSON response (Content-Type: ${t})`;
}
async function kr(e, t, n, r, i) {
	let a = await an(n);
	if (a != null) {
		let n = e.parseFormError?.({ body: a }, r);
		if (n) {
			let e = new Set(i.payloadFields), r = /* @__PURE__ */ new Map();
			for (let e of i.inlineRegistry) r.set(e.field, e);
			let { fieldErrors: a, globalErrors: o } = Er(n, e, r);
			if (Object.keys(a).length || o.length) return Dr(t, a), {
				handled: !0,
				globalErrors: o
			};
		}
		return {
			handled: !0,
			globalErrors: [$t(a)]
		};
	}
	return en(n) == null ? {
		handled: !1,
		globalErrors: []
	} : {
		handled: !0,
		globalErrors: [$t(null, { hint: Or(n) })]
	};
}
//#endregion
//#region src/crud/utils/useAbortableEffect.ts
function Ar(e, t) {
	s(() => {
		let t = new AbortController();
		return e(t.signal), () => t.abort();
	}, t);
}
//#endregion
//#region src/crud/utils/useFormRecord.ts
function jr({ dp: e, resource: t, id: n, isNew: r, form: i, message: o, defaultValues: s, enabled: c = !0 }) {
	let [l, u] = d(!r), [f, p] = d(0), m = a(async (a) => {
		if (r || !n) {
			s ? i.reset({ ...s }) : i.reset({}), u(!1);
			return;
		}
		u(!0);
		try {
			let r = await e.getOne(t, n, { signal: a });
			if (a?.aborted) return;
			i.reset(r.data), p((e) => e + 1);
		} catch (e) {
			Kt(e) || o.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			a?.aborted || u(!1);
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
	return Ar((e) => {
		if (c) return m(e);
	}, [c, m]), {
		loading: l,
		formVersion: f
	};
}
function Mr({ dp: e, resource: t, id: n, isNew: r, form: i, message: o, payloadFieldsRef: s, inlineRegistryRef: c, setGlobalErrors: l, onSuccess: u }) {
	let [f, p] = d(!1);
	return {
		onSubmit: a(async (a) => {
			l([]), p(!0);
			try {
				let i = Sr(a, Array.from(s.current), c.current.values()), l;
				if (r) l = (await e.create(t, i)).data, o.success("Created");
				else if (n) l = (await e.update(t, {
					id: n,
					data: i
				})).data, o.success("Updated");
				else return;
				u?.(l);
			} catch (n) {
				let { handled: a, globalErrors: u } = await kr(e, i, n, {
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
			u
		]),
		saving: f
	};
}
//#endregion
//#region src/crud/ResourceRecordForm.tsx
function Nr({ resource: e, id: t, children: r, defaultValues: i, enabled: a = !0, canSave: o = !0, onCancel: s, cancelHref: c, onSuccess: l, loadingMode: p = "overlay" }) {
	let m = t === "new" || !t, h = m ? void 0 : t, g = Ht(), { message: _ } = S.useApp(), v = u(/* @__PURE__ */ new Set()), y = u(/* @__PURE__ */ new Map()), [b, x] = d([]), C = Ee({ defaultValues: i }), { loading: T, formVersion: E } = jr({
		dp: g,
		resource: e,
		id: h,
		isNew: m,
		form: C,
		message: _,
		defaultValues: i,
		enabled: a
	}), { onSubmit: D, saving: O } = Mr({
		dp: g,
		resource: e,
		id: h,
		isNew: m,
		form: C,
		message: _,
		payloadFieldsRef: v,
		inlineRegistryRef: y,
		setGlobalErrors: x,
		onSuccess: l
	}), k = T || O, A = () => {
		C.handleSubmit(D, () => {
			_.warning("Please fix the errors below.");
		})();
	}, M = /* @__PURE__ */ G(w, {
		disabled: k,
		onClick: c ? void 0 : s,
		children: "Cancel"
	}), N = /* @__PURE__ */ G(Xn, {
		resource: e,
		isNew: m,
		children: /* @__PURE__ */ G(nr, {
			fieldsRef: v,
			children: /* @__PURE__ */ G(sr, {
				registryRef: y,
				children: /* @__PURE__ */ K("div", {
					style: { position: "relative" },
					children: [k && p === "overlay" ? /* @__PURE__ */ G("div", {
						style: {
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							zIndex: 1
						},
						children: /* @__PURE__ */ G(re, {})
					}) : null, /* @__PURE__ */ n(we, {
						...C,
						key: E
					}, /* @__PURE__ */ K(j, {
						layout: "vertical",
						onFinish: A,
						style: p === "overlay" ? {
							opacity: k ? .4 : 1,
							pointerEvents: k ? "none" : void 0
						} : void 0,
						children: [
							/* @__PURE__ */ G(ur, { errors: b }),
							r,
							/* @__PURE__ */ G(j.Item, {
								style: {
									marginTop: 16,
									marginBottom: 0
								},
								children: /* @__PURE__ */ K(z, { children: [/* @__PURE__ */ G(w, {
									type: "primary",
									htmlType: "submit",
									loading: O,
									disabled: k || !o,
									children: "Save"
								}), c ? /* @__PURE__ */ G(f, {
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
	return T && !O && p === "replace" ? /* @__PURE__ */ G(re, {}) : N;
}
//#endregion
//#region src/crud/ResourceFormModal.tsx
function Pr({ resource: e, editId: t, onClose: n, children: r, title: i, permissions: a, defaultValues: o, width: s = 560, onSuccess: c }) {
	let l = t === "new", u = t != null, d = X(), f = i ?? (l ? `New ${e}` : `Edit ${e}`), p = a ? Z(d, a, l ? "add" : "change") : !0;
	return /* @__PURE__ */ G(te, {
		open: u,
		title: f,
		onCancel: n,
		footer: null,
		destroyOnHidden: !0,
		width: s,
		maskClosable: !1,
		children: /* @__PURE__ */ G(S, { children: /* @__PURE__ */ G(Nr, {
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
function Fr({ selectedCount: e, total: t, allPageSelected: n, allMatchingSelected: r, onSelectAllMatching: i, onClearSelection: o, actions: s, onExecute: c, selectedIds: u, running: f = !1 }) {
	let [p, m] = d(), h = l(() => s.map((e) => ({
		value: e.key,
		label: e.label
	})), [s]), g = a(async () => {
		let t = s.find((e) => e.key === p);
		!t || e === 0 || (await c(t, u), m(void 0));
	}, [
		s,
		p,
		c,
		e,
		u
	]), _ = n && !r && t > e;
	return /* @__PURE__ */ K(z, {
		wrap: !0,
		style: {
			marginBottom: 16,
			width: "100%"
		},
		align: "center",
		children: [
			/* @__PURE__ */ K(H.Text, {
				type: "secondary",
				children: [
					e,
					" of ",
					t,
					" selected"
				]
			}),
			e > 0 ? /* @__PURE__ */ G(w, {
				type: "link",
				size: "small",
				onClick: o,
				style: { padding: 0 },
				children: "Clear selection"
			}) : null,
			_ ? /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(H.Text, {
				type: "secondary",
				children: "·"
			}), /* @__PURE__ */ K(w, {
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
			r && t > 0 ? /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(H.Text, {
				type: "secondary",
				children: "·"
			}), /* @__PURE__ */ K(H.Text, {
				type: "success",
				children: [
					"All ",
					t,
					" items selected"
				]
			})] }) : null,
			/* @__PURE__ */ G(R, {
				placeholder: "Action",
				style: { minWidth: 200 },
				options: h,
				value: p,
				onChange: m,
				disabled: e === 0 || f,
				allowClear: !0
			}),
			/* @__PURE__ */ G(w, {
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
var Ir = new Set([
	"page",
	"perPage",
	"sort",
	"create",
	"edit"
]), Lr = 1, Rr = 10;
function zr(e) {
	if (e.includes(",")) {
		let t = e.split(",").map((e) => e.trim()), n = t.map(Number);
		return n.every((e) => Number.isFinite(e)) ? n : t;
	}
	let t = Number(e);
	return e !== "" && Number.isFinite(t) && String(t) === e ? t : e === "true" ? !0 : e === "false" ? !1 : e;
}
function Br(e) {
	return e == null || e === "" ? null : Array.isArray(e) ? e.length === 0 ? null : e.map(String).join(",") : String(e);
}
function Vr(e) {
	let [t, n] = b(), r = l(() => {
		let n = t.get("page"), r = t.get("perPage"), i = n ? Math.max(1, Number(n) || Lr) : Lr, a = r ? Math.max(1, Number(r) || Rr) : Rr, o = t.getAll("sort"), s = o.length > 0 ? o.flatMap((e) => Nn(e)) : Nn(t.get("sort")), c = { ...e };
		return t.forEach((e, n) => {
			if (Ir.has(n)) return;
			let r = c[n];
			r === void 0 ? t.getAll(n).length > 1 ? c[n] = t.getAll(n).map(zr) : c[n] = zr(e) : c[n] = [...Array.isArray(r) ? r : [r], zr(e)];
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
	return [r, l(() => ({
		setPage: (e) => {
			i((t) => {
				e <= 1 ? t.delete("page") : t.set("page", String(e));
			});
		},
		setPerPage: (e) => {
			i((t) => {
				e === Rr ? t.delete("perPage") : t.set("perPage", String(e)), t.delete("page");
			});
		},
		setSort: (e) => {
			i((t) => {
				t.delete("sort");
				let n = Pn(e);
				n && t.set("sort", n);
			});
		},
		toggleSort: (e) => {
			i((t) => {
				let n = t.getAll("sort").flatMap((e) => Nn(e)), r = n.findIndex((t) => t.field === e), i;
				i = r < 0 ? [...n, {
					field: e,
					order: "ASC"
				}] : n[r].order === "ASC" ? n.map((e, t) => t === r ? {
					...e,
					order: "DESC"
				} : e) : n.filter((e, t) => t !== r), t.delete("sort");
				let a = Pn(i);
				a && t.set("sort", a);
			});
		},
		setFilter: (e, t) => {
			i((n) => {
				n.delete(e);
				let r = Br(t);
				r != null && n.set(e, r), n.delete("page");
			});
		},
		setFilters: (e) => {
			i((t) => {
				for (let e of [...t.keys()]) Ir.has(e) || t.delete(e);
				for (let [n, r] of Object.entries(e)) {
					let e = Br(r);
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
var Hr = t(null);
function Ur() {
	return o(Hr);
}
function Wr(e) {
	return e == null || e === "" ? "—" : String(e);
}
function Gr(e, t) {
	if (e.length === 0 || !t.showEdit && !t.showQuickEdit) return e;
	let [n, ...r] = e, i = n.render;
	return [{
		...n,
		render: (e, n, r) => {
			let a = i ? i(e, n, r) : Wr(e);
			return t.showEdit ? /* @__PURE__ */ G(f, {
				to: `${t.pathPrefix}/${String(n.id)}`,
				className: "ding-admin-row-edit-link",
				children: a
			}) : /* @__PURE__ */ G(w, {
				type: "link",
				size: "small",
				className: "ding-admin-row-edit-link",
				style: {
					padding: 0,
					height: "auto",
					textAlign: "inherit"
				},
				onClick: () => t.openEditModal(n.id),
				children: a
			});
		}
	}, ...r];
}
function Kr({ resource: e, title: t, pathPrefix: n, newPath: r, editMode: i = "page", formChildren: o, actions: s, rowActions: p, headerExtra: m, bulkActions: h, bulkDelete: g = !0, bulkActionsEnabled: _ = !0, permissions: v, queryState: y, queryActions: b }) {
	let x = Ht(), C = X(), { message: E, modal: D } = S.useApp(), { token: O } = U.useToken(), { columns: k, sortOrders: A, sortPriorities: j } = Rn(), M = u(null), [N, P] = d(), [F, ee] = d(!1), [I, te] = d([]), [L, ne] = d(0), [R, re] = d(() => /* @__PURE__ */ new Set()), [ie, ae] = d(!1), B = r ?? `${n}/new`, se = Z(C, v, "add"), V = Z(C, v, "change"), ce = Z(C, v, "delete"), q = V && (i === "page" || i === "both") && s?.edit !== !1, J = V && (i === "modal" || i === "both") && s?.quickEdit !== !1, de = ce && s?.delete !== !1, fe = q || J || de || p, pe = a(() => {
		re(/* @__PURE__ */ new Set());
	}, []), me = l(() => {
		if (!_) return [];
		let t = [];
		return g && ce && t.push({
			key: "__delete",
			label: "Delete selected",
			confirm: (e) => `Delete ${e.length} selected item(s)? This cannot be undone.`,
			execute: async (t, { reload: n, clearSelection: r }) => {
				await Promise.all(t.map((t) => x.delete(e, t))), r(), n(), E.success(`Deleted ${t.length} item(s)`);
			}
		}), [...t, ...h ?? []];
	}, [
		_,
		g,
		ce,
		h,
		x,
		e,
		E
	]), he = me.length > 0, ge = R.size;
	c(() => {
		let e = () => {
			let e = M.current?.getBoundingClientRect().top ?? 0;
			P(Math.max(200, window.innerHeight - e - 80));
		};
		return e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, [he, ge]);
	let _e = I.length > 0 && I.every((e) => R.has(e.id)), ve = L > 0 && ge >= L, ye = l(() => I.filter((e) => R.has(e.id)).map((e) => e.id), [I, R]), be = a((e) => {
		re((t) => {
			let n = new Set(t), r = I.map((e) => e.id);
			for (let t of r) e.includes(t) || n.delete(t);
			for (let t of e) n.add(t);
			return n;
		});
	}, [I]), xe = a(async () => {
		if (!(L <= 0)) {
			ae(!0);
			try {
				let t = y.sort.length === 0 ? void 0 : y.sort.length === 1 ? y.sort[0] : y.sort, n = await x.getList(e, {
					pagination: {
						page: 1,
						perPage: L
					},
					sort: t,
					filter: y.filter
				});
				re(new Set(n.data.map((e) => e.id)));
			} catch (e) {
				E.error(e instanceof Error ? e.message : "Load failed");
			} finally {
				ae(!1);
			}
		}
	}, [
		x,
		e,
		L,
		y.sort,
		y.filter,
		E
	]), Se = a((e) => {
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
			y.sort.length > 0 && b.setSort([]);
			return;
		}
		let n = t(e);
		if (n) {
			b.toggleSort(n);
			return;
		}
		!e?.order && y.sort.length > 0 && b.setSort([]);
	}, [b, y.sort.length]), Ce = l(() => {
		let e = y.sort.length === 0 ? void 0 : y.sort.length === 1 ? y.sort[0] : y.sort;
		return {
			pagination: {
				page: y.page,
				perPage: y.perPage
			},
			sort: e,
			filter: y.filter
		};
	}, [y]), Y = a(async (t) => {
		ee(!0);
		try {
			let n = await x.getList(e, {
				...Ce,
				signal: t
			});
			if (t?.aborted) return;
			te(n.data), ne(n.total);
		} catch (e) {
			Kt(e) || E.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			t?.aborted || ee(!1);
		}
	}, [
		x,
		e,
		Ce,
		E
	]);
	Ar((e) => Y(e), [Y]);
	let we = l(() => ({
		reload: () => void Y(),
		clearSelection: pe
	}), [Y, pe]), Te = a(async (e, t) => {
		if (e.confirm) {
			let n = typeof e.confirm == "function" ? await e.confirm(t, we) : e.confirm;
			if (n === !1 || !await new Promise((t) => {
				D.confirm({
					title: n,
					okType: e.key === "__delete" ? "danger" : "primary",
					onOk: () => t(!0),
					onCancel: () => t(!1)
				});
			})) return;
		}
		ae(!0);
		try {
			await e.execute(t, we);
		} catch (e) {
			E.error(e instanceof Error ? e.message : "Action failed");
		} finally {
			ae(!1);
		}
	}, [
		we,
		D,
		E
	]), Ee = a(async (t) => {
		if (ce) try {
			await x.delete(e, t.id), E.success("Deleted"), Y();
		} catch (e) {
			E.error(e instanceof Error ? e.message : "Delete failed");
		}
	}, [
		ce,
		x,
		e,
		Y,
		E
	]), De = l(() => {
		let e = k.map((e) => {
			let t = e.buildColumn();
			if (e.sortable) {
				let n = A.get(e.source), r = j.get(e.source), i = n === "ASC" ? "ascend" : n === "DESC" ? "descend" : void 0, a = i == null ? void 0 : /* @__PURE__ */ K("span", {
					style: {
						display: "inline-flex",
						alignItems: "center",
						gap: 2,
						marginInlineStart: 4,
						color: "var(--ant-color-primary)"
					},
					children: [r == null ? null : /* @__PURE__ */ G("span", {
						style: {
							fontSize: 11,
							fontWeight: 600,
							lineHeight: 1,
							minWidth: 10,
							textAlign: "center"
						},
						children: r
					}), G(i === "ascend" ? ue : le, { style: { fontSize: 11 } })]
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
		if (!fe) return Gr(e, {
			showEdit: q,
			showQuickEdit: J,
			pathPrefix: n,
			openEditModal: b.openEditModal
		});
		let t = {
			reload: () => void Y(),
			openEditModal: b.openEditModal
		}, r = {
			title: "Actions",
			key: "__actions",
			width: i === "both" ? 200 : 160,
			render: (e, r) => /* @__PURE__ */ K(z, {
				size: "small",
				wrap: !0,
				children: [
					q ? /* @__PURE__ */ G(f, {
						to: `${n}/${String(r.id)}`,
						children: "Edit"
					}) : null,
					J ? /* @__PURE__ */ G(w, {
						type: "link",
						size: "small",
						style: { padding: 0 },
						onClick: () => b.openEditModal(r.id),
						children: i === "both" ? "Quick edit" : "Edit"
					}) : null,
					de ? /* @__PURE__ */ G(w, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => void Ee(r),
						style: { padding: 0 },
						children: "Delete"
					}) : null,
					p?.(r, t)
				]
			})
		};
		return Gr([...e, r], {
			showEdit: q,
			showQuickEdit: J,
			pathPrefix: n,
			openEditModal: b.openEditModal
		});
	}, [
		k,
		fe,
		q,
		J,
		de,
		i,
		n,
		Ee,
		A,
		j,
		b,
		p,
		Y
	]), Oe = o && (y.createModal || y.editId != null) && (i === "modal" || i === "both");
	return /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ K(T, {
		title: /* @__PURE__ */ G(H.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		}),
		extra: m || se ? /* @__PURE__ */ K(z, { children: [m, se ? i === "modal" || i === "both" ? /* @__PURE__ */ K(W, { children: [i === "both" ? /* @__PURE__ */ G(f, {
			to: B,
			children: /* @__PURE__ */ G(w, { children: "New page" })
		}) : null, /* @__PURE__ */ G(w, {
			type: "primary",
			onClick: () => b.openCreateModal(),
			children: "New"
		})] }) : /* @__PURE__ */ G(f, {
			to: B,
			children: /* @__PURE__ */ G(w, {
				type: "primary",
				children: "New"
			})
		}) : null] }) : null,
		children: [he ? /* @__PURE__ */ G(Fr, {
			selectedCount: ge,
			total: L,
			allPageSelected: _e,
			allMatchingSelected: ve,
			onSelectAllMatching: () => void xe(),
			onClearSelection: pe,
			actions: me,
			onExecute: Te,
			selectedIds: [...R],
			running: ie || F
		}) : null, /* @__PURE__ */ G("div", {
			ref: M,
			className: "ding-admin-resource-list-table",
			style: {
				"--ding-scroll-thumb": O.colorTextQuaternary,
				"--ding-scroll-thumb-hover": O.colorTextTertiary
			},
			children: /* @__PURE__ */ G(oe, {
				rowKey: "id",
				loading: F,
				columns: De,
				dataSource: I,
				scroll: {
					x: "max-content",
					...N ? { y: N } : {}
				},
				rowSelection: he ? {
					selectedRowKeys: ye,
					onChange: be,
					preserveSelectedRowKeys: !0
				} : void 0,
				pagination: {
					current: y.page,
					pageSize: y.perPage,
					total: L,
					showSizeChanger: !0,
					onChange: (e, t) => {
						b.setPage(e), t && b.setPerPage(t);
					}
				},
				onChange: (e, t, n) => {
					Se(n);
				}
			})
		})]
	}), Oe ? /* @__PURE__ */ G(Pr, {
		resource: e,
		editId: y.createModal ? "new" : y.editId,
		onClose: () => {
			b.closeModal(), Y();
		},
		children: o
	}) : null] });
}
function qr({ resource: e, title: t, pathPrefix: n, newPath: r, staticFilter: i, textFilterDebounceMs: o, editMode: s = "page", syncQueryParams: c = !0, children: u, formChildren: d, actions: f, rowActions: p, headerExtra: m, bulkActions: h, bulkDelete: g, bulkActionsEnabled: _, permissions: v }) {
	let [y, b] = Vr(i), x = l(() => {
		if (!c) return i ?? {};
		let e = {};
		for (let [t, n] of Object.entries(y.filter)) i && t in i || (e[t] = n);
		return e;
	}, [
		y.filter,
		i,
		c
	]), S = a((e, t) => {
		c && b.setFilter(e, t);
	}, [c, b]), C = l(() => ({
		filterValues: x,
		setFilterValue: S
	}), [x, S]);
	return /* @__PURE__ */ G(Hr.Provider, {
		value: C,
		children: /* @__PURE__ */ G(Kn, {
			values: x,
			setFilterValue: S,
			textFilterDebounceMs: o,
			children: /* @__PURE__ */ K(Ln, {
				toggleSort: b.toggleSort,
				sort: y.sort,
				children: [u, /* @__PURE__ */ G(Kr, {
					resource: e,
					title: t,
					pathPrefix: n,
					newPath: r,
					editMode: s,
					formChildren: d,
					actions: f,
					rowActions: p,
					headerExtra: m,
					bulkActions: h,
					bulkDelete: g,
					bulkActionsEnabled: _,
					permissions: v,
					queryState: y,
					queryActions: b
				})]
			})
		})
	});
}
//#endregion
//#region src/crud/FilterBar.tsx
function Jr() {
	let e = qn();
	return !e || e.filters.length === 0 ? null : /* @__PURE__ */ G(z, {
		wrap: !0,
		size: "middle",
		style: { marginBottom: 16 },
		children: e.filters.map((t) => /* @__PURE__ */ K(z, {
			orientation: "vertical",
			size: 2,
			children: [t.label ? /* @__PURE__ */ G(H.Text, {
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
function Yr({ children: e }) {
	return /* @__PURE__ */ K(W, { children: [e, /* @__PURE__ */ G(Jr, {})] });
}
//#endregion
//#region src/crud/ResourceForm.tsx
function Xr({ resource: e, title: t, listPath: n, children: r, defaultValues: i, onSaved: a, stayOnPage: o, permissions: c }) {
	let { id: l } = y(), u = l === "new" || !l, d = X(), p = v(), { token: m } = U.useToken();
	s(() => {
		c && (Z(d, c, u ? "add" : "change") || p(n, { replace: !0 }));
	}, [
		c,
		u,
		d,
		p,
		n
	]);
	let h = c ? Z(d, c, u ? "add" : "change") : !0;
	return /* @__PURE__ */ G(T, {
		title: /* @__PURE__ */ K(z, { children: [/* @__PURE__ */ K(f, {
			to: n,
			style: { color: m.colorText },
			children: [/* @__PURE__ */ G(ce, {}), " Back"]
		}), /* @__PURE__ */ G(H.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		})] }),
		children: /* @__PURE__ */ G(Nr, {
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
function Zr(e, t, n) {
	return `${e}.${t}.${n}`;
}
//#endregion
//#region src/crud/InlineFormSet.tsx
function Qr(e, t) {
	let n = {};
	for (let r of e) n[r] = t?.[r] ?? void 0;
	return n;
}
function $r(e, t, n) {
	let { control: r } = De(), { fields: i, append: a, remove: o } = Te({
		control: r,
		name: e,
		keyName: "rowKey"
	});
	return {
		fields: i,
		remove: o,
		appendEmpty: () => a(Qr(t, n))
	};
}
function ei({ field: e, label: t, payloadKey: n, transformRows: r, columns: i, defaultRow: a }) {
	let o = l(() => i.map((e) => e.source), [i]), { fields: s, remove: c, appendEmpty: u } = $r(e, o, a);
	ir(e), lr(e, o, n, r);
	let d = l(() => i.map((t) => ({
		title: t.label ?? t.source,
		key: t.source,
		width: t.width,
		onHeaderCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		onCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		render: (n, r, i) => t.cell({
			name: Zr(e, i, t.source),
			index: i,
			field: e
		})
	})), [i, e]);
	return /* @__PURE__ */ K("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ G(H.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ G(oe, {
				size: "small",
				pagination: !1,
				scroll: { x: "max-content" },
				dataSource: s.map((e) => ({
					...e,
					key: e.rowKey
				})),
				columns: [...d, {
					title: "",
					key: "__remove",
					width: 80,
					render: (e, t, n) => /* @__PURE__ */ G(w, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => c(n),
						children: "Remove"
					})
				}]
			}),
			/* @__PURE__ */ G(w, {
				type: "dashed",
				style: { marginTop: 8 },
				onClick: u,
				children: "Add row"
			})
		]
	});
}
function ti({ field: e, label: t, payloadKey: n, transformRows: r, sources: i, renderRow: a, getCardTitle: o, footer: s, defaultRow: c }) {
	let { fields: l, remove: u, appendEmpty: d } = $r(e, i, c);
	return ir(e), lr(e, i, n, r), /* @__PURE__ */ K("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ G(H.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ G(z, {
				orientation: "vertical",
				size: "middle",
				style: { width: "100%" },
				children: l.map((t, n) => {
					let r = {
						field: e,
						index: n,
						name: (t) => Zr(e, n, t)
					};
					return /* @__PURE__ */ G(T, {
						size: "small",
						title: o?.(r) ?? `Item ${n + 1}`,
						extra: /* @__PURE__ */ G(w, {
							type: "link",
							danger: !0,
							size: "small",
							onClick: () => u(n),
							children: "Remove"
						}),
						children: a(r)
					}, t.rowKey);
				})
			}),
			/* @__PURE__ */ G(w, {
				type: "dashed",
				style: { marginTop: 8 },
				onClick: d,
				children: "Add item"
			}),
			s
		]
	});
}
//#endregion
//#region src/crud/utils/formSectionErrors.ts
function ni(e, t, n) {
	for (let r of e) if (t(r, n).invalid) return !0;
	return !1;
}
function ri(e) {
	let t = u([]);
	for (; t.current.length < e;) t.current.push({ current: /* @__PURE__ */ new Set() });
	return t.current.length > e && (t.current.length = e), t.current;
}
function ii(e, t) {
	let { control: n, getFieldState: r, setFocus: i } = De(), a = Oe({ control: n }), o = u(0), c = u(0);
	s(() => {
		if (a.submitCount === 0) return;
		let n = Object.keys(a.errors).length, s = a.submitCount !== o.current, l = !s && n > 0 && c.current === 0;
		if (o.current = a.submitCount, c.current = n, !s && !l || n === 0) return;
		let u = e.findIndex((e) => ni(e.current, r, a));
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
function ai(e) {
	return null;
}
function oi(e) {
	return i(e) && e.type === ai;
}
function si({ children: t, defaultActiveKey: n, activeKey: r, onChange: i, ...o }) {
	let { token: s } = U.useToken(), c = l(() => e.toArray(t).filter(oi).map((e, t) => ({
		key: e.key ?? String(t),
		label: e.props.label,
		disabled: e.props.disabled,
		children: e.props.children
	})), [t]), u = ri(c.length), f = r !== void 0, [p, m] = d(() => n ?? c[0]?.key ?? "0"), h = f ? r : p, g = a((e) => {
		f || m(e), i?.(e);
	}, [f, i]);
	ii(u, a((e) => {
		let t = c[e]?.key;
		t != null && g(t);
	}, [g, c]));
	let { control: _, getFieldState: v } = De(), y = Oe({ control: _ });
	return /* @__PURE__ */ G(B, {
		destroyOnHidden: !1,
		items: l(() => c.map((e, t) => {
			let n = ni(u[t].current, v, y);
			return {
				key: e.key,
				label: n ? /* @__PURE__ */ G("span", {
					style: { color: s.colorError },
					children: e.label
				}) : e.label,
				disabled: e.disabled,
				children: /* @__PURE__ */ G($n, {
					sourcesRef: u[t],
					children: e.children
				})
			};
		}), [
			y,
			v,
			u,
			c,
			s.colorError
		]),
		activeKey: h,
		onChange: g,
		...o
	});
}
//#endregion
//#region src/crud/FormSteps.tsx
function ci(e) {
	return null;
}
function li(e) {
	return i(e) && e.type === ci;
}
function ui({ children: t, initialStep: n = 0, showNavigation: r = !0, allowStepSelect: i = !1, stepsStyle: o, navigationStyle: s, size: c, direction: u, type: f, status: p }) {
	let m = l(() => e.toArray(t).filter(li), [t]), h = ri(m.length), [g, _] = d(n), v = m.length - 1;
	ii(h, _);
	let { control: y, getFieldState: b } = De(), x = Oe({ control: y }), S = l(() => m.map((e, t) => {
		let n = ni(h[t].current, b, x);
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
	]), C = a((e) => {
		_(e);
	}, []);
	return /* @__PURE__ */ K(W, { children: [
		/* @__PURE__ */ G(ie, {
			current: g,
			items: S,
			style: {
				marginBottom: 24,
				...o
			},
			onChange: i ? C : void 0,
			size: c,
			direction: u,
			type: f,
			status: p
		}),
		m.map((e, t) => /* @__PURE__ */ G("div", {
			style: { display: g === t ? void 0 : "none" },
			children: /* @__PURE__ */ G($n, {
				sourcesRef: h[t],
				children: e.props.children
			})
		}, e.key ?? String(t))),
		r && m.length > 1 ? /* @__PURE__ */ K(z, {
			style: {
				marginTop: 16,
				...s
			},
			children: [/* @__PURE__ */ G(w, {
				disabled: g === 0,
				onClick: () => _((e) => e - 1),
				children: "Previous"
			}), /* @__PURE__ */ G(w, {
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
	let s = t ?? e, c = !s.includes("."), { control: l } = De(), u = Zn(), d = a ? void 0 : n ?? e, f = n ?? e;
	return ir(e, c), ar(e, c), /* @__PURE__ */ G(Y, {
		name: s,
		control: l,
		rules: {
			required: r ? `${f} is required` : !1,
			...i
		},
		render: ({ field: e, fieldState: t }) => /* @__PURE__ */ G(j.Item, {
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
function di({ source: e, name: t, label: n, required: r, rules: i, placeholder: a, inputStyle: o, hideLabel: s }) {
	return /* @__PURE__ */ G($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: s,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ G(P, {
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
//#region src/crud/fields/TextAreaField.tsx
function fi({ source: e, name: t, label: n, required: r, rules: i, placeholder: a, inputStyle: o, hideLabel: s, rows: c = 4, maxLength: l, showCount: u, autoSize: d }) {
	return /* @__PURE__ */ G($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: s,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ G(P.TextArea, {
			value: e,
			onChange: (e) => t(e.target.value),
			onBlur: n,
			placeholder: a,
			disabled: r,
			style: o,
			rows: d ? void 0 : c,
			maxLength: l,
			showCount: u,
			autoSize: d
		})
	});
}
//#endregion
//#region src/crud/fields/NumberField.tsx
function pi({ source: e, name: t, label: n, required: r, rules: i, min: a, max: o, step: s, inputStyle: c, hideLabel: l }) {
	return /* @__PURE__ */ G($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: l,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ G(F, {
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
function mi({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, disabled: o }) {
	return /* @__PURE__ */ G($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ G(ae, {
			checked: !!e,
			onChange: t,
			disabled: n || o
		})
	});
}
//#endregion
//#region src/crud/utils/parseDayjsValue.ts
var hi = /* @__PURE__ */ ze((/* @__PURE__ */ Le(((e, t) => {
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
Ae.extend(hi.default);
function gi(e, t) {
	if (e == null || e === "") return null;
	if (Ae.isDayjs(e)) return e;
	let n = Ae(String(e), t, !0);
	return n.isValid() ? n : Ae(String(e)).isValid() ? Ae(String(e)) : null;
}
//#endregion
//#region src/crud/fields/DateField.tsx
var _i = "YYYY-MM-DD", vi = `${_i} HH:mm:ss`, yi = [
	_i,
	vi,
	"YYYY-MM-DDTHH:mm:ss",
	"YYYY-MM-DDTHH:mm:ssZ"
];
function bi({ source: e, name: t, label: n, required: r, rules: i, showTime: a, hideLabel: o }) {
	return /* @__PURE__ */ G($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ G(D, {
			value: gi(e, a ? [...yi, vi] : yi),
			onChange: (e) => t(e ? e.format(a ? vi : _i) : null),
			onBlur: n,
			showTime: a,
			disabled: r,
			format: a ? vi : _i,
			style: { width: "100%" }
		})
	});
}
//#endregion
//#region src/crud/fields/DateTimeField.tsx
function xi(e) {
	return /* @__PURE__ */ G(bi, {
		showTime: !0,
		...e
	});
}
//#endregion
//#region src/crud/fields/TimeField.tsx
var Si = "HH:mm:ss", Ci = [
	Si,
	"HH:mm",
	"H:mm:ss",
	"H:mm"
];
function wi({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, format: o = Si }) {
	return /* @__PURE__ */ G($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ G(se, {
			value: gi(e, Ci),
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
function Ti({ source: e, name: t, label: n, required: r, rules: i, choices: a, mode: o, allowClear: s, hideLabel: c }) {
	return /* @__PURE__ */ G($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: c,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ G(R, {
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
function Ei({ source: e, name: t, label: n, required: r, rules: i, autoComplete: a, hideLabel: o }) {
	return /* @__PURE__ */ G($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ G(P.Password, {
			value: e,
			onChange: (e) => t(e.target.value),
			onBlur: n,
			disabled: r,
			autoComplete: a
		})
	});
}
function Di({ source: e, name: t, label: n, required: r, rules: i, confirmSource: a, confirmLabel: o = "Confirm password", autoComplete: s = "new-password", hideLabel: c }) {
	let l = ke({
		name: t ?? e,
		disabled: !a
	});
	return a ? /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(Ei, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		autoComplete: s,
		hideLabel: c
	}), /* @__PURE__ */ G(Ei, {
		source: a,
		label: o,
		required: r,
		autoComplete: s,
		hideLabel: c,
		rules: { validate: (e) => !l || e === l || "Passwords do not match" }
	})] }) : /* @__PURE__ */ G(Ei, {
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
function Oi(e, t) {
	return typeof e == "object" && !!e && !Array.isArray(e) && t in e;
}
function ki(e, t) {
	if (!(e == null || e === "")) {
		if (Oi(e, t)) {
			let n = e[t];
			return typeof n == "string" || typeof n == "number" ? n : void 0;
		}
		if (typeof e == "string" || typeof e == "number") return e;
	}
}
function Ai(e, t) {
	return Array.isArray(e) ? e.map((e) => ki(e, t)).filter((e) => e != null) : [];
}
function ji(e, t) {
	return e == null ? [] : (Array.isArray(e) ? e : [e]).filter((e) => e != null && e !== "").map((e) => Oi(e, t) ? e[t] : e);
}
function Mi(e, t, n) {
	let r = [];
	if (t != null && (Array.isArray(t) ? r.push(...t.filter((e) => Oi(e, n))) : Oi(t, n) && r.push(t)), e == null) return r;
	let i = Array.isArray(e) ? e : [e];
	for (let e of i) Oi(e, n) && r.push(e);
	return r;
}
function Ni(e, t) {
	return typeof t == "function" ? t(e) : String(e[t] ?? "");
}
function Pi(e, t, n) {
	return e.map((e) => ({
		label: Ni(e, t),
		value: e[n],
		record: e
	}));
}
function Fi(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) n.set(t.value, t);
	for (let e of t) n.set(e.value, e);
	return Array.from(n.values());
}
function Ii(e = {}) {
	let t = e.popupMatchSelectWidth ?? !1;
	return t === !1 ? {
		popupMatchSelectWidth: !1,
		styles: { popup: { root: { minWidth: e.popupMinWidth ?? 360 } } }
	} : { popupMatchSelectWidth: t };
}
//#endregion
//#region src/crud/utils/referenceSelectNotFoundContent.tsx
function Li(e) {
	return e ? /* @__PURE__ */ G(re, { size: "small" }) : void 0;
}
//#endregion
//#region src/crud/utils/useChoices.ts
var Ri = /* @__PURE__ */ new Map(), zi = /* @__PURE__ */ new Map();
function Bi(e, t) {
	return typeof e == "function" ? `fn:${t ?? ""}` : Array.isArray(e) ? `static:${e.length}` : `res:${e.resource}:${JSON.stringify(e.filter ?? {})}:${t ?? ""}`;
}
async function Vi(e, t, n, r, i) {
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
		label: Ni(e, n),
		value: e[r],
		record: e
	}));
}
function Hi(e, t, n, r, i, a) {
	let o = Bi(e, i);
	if (a) {
		let e = Ri.get(o);
		if (e && !i) return Promise.resolve(e);
	}
	let s = zi.get(o);
	if (s) return s;
	let c = Vi(e, t, n, r, i).then((e) => (a && !i && Ri.set(o, e), e)).finally(() => {
		zi.delete(o);
	});
	return zi.set(o, c), c;
}
function Ui(e, t, n = "name", r = "id", i, o = {}) {
	let { lazy: c = !1, active: u = !1, selectedValues: f, selectedRecords: p, fetchSelected: m = !0, cache: h } = o, g = h ?? !c, _ = Ht(), v = l(() => {
		if (e) return e;
		if (t) return {
			resource: t,
			filter: i ? { q: i } : void 0
		};
	}, [
		e,
		t,
		i
	]), y = v ? Bi(v, i) : void 0, b = l(() => ji(f, r), [f, r]), x = l(() => Pi(Mi(f, p, r), n, r), [
		f,
		p,
		n,
		r
	]), S = !!(v && (!c || u || Array.isArray(v))), [C, w] = d(() => x.length ? x : !y || i || c || !g ? [] : Ri.get(y) ?? []), [T, E] = d(() => S ? !g || !y || i ? !!v : !Ri.has(y) : !1);
	s(() => {
		x.length && w((e) => Fi(e, x));
	}, [x]);
	let D = a(async () => {
		if (!v || !S) {
			v || w(x), E(!1);
			return;
		}
		if (g) {
			let e = Bi(v, i), t = Ri.get(e);
			if (t && !i) {
				w(Fi(x, t)), E(!1);
				return;
			}
		}
		E(!0), c && w(x);
		try {
			w(Fi(x, await Hi(v, _, n, r, i, g)));
		} catch {
			!b.length && !x.length ? w([]) : c && w(x);
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
		c,
		b.length,
		x
	]);
	s(() => {
		D();
	}, [D]), s(() => {
		c && !u && !i && (w(x), E(!1));
	}, [
		c,
		u,
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
					label: Ni(e, n),
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
				return t.length ? Fi(e, t) : e;
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
function Wi({ reference: e, referenceForm: t, referencePermissions: n, referenceTitle: r, referenceDefaultValues: i, referenceModalWidth: a, selectedId: o, disabled: s, onCreated: c, onUpdated: l }) {
	let u = X(), f = r ?? e, p = !!(e && t) && Z(u, n, "add"), m = !!(e && t && o != null && o !== "") && Z(u, n, "change"), [h, g] = d(null);
	return !p && !m ? null : /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ K(z, {
		size: 4,
		children: [p ? /* @__PURE__ */ G(V, {
			title: `Add ${f ?? "record"}`,
			children: /* @__PURE__ */ G(w, {
				type: "default",
				icon: /* @__PURE__ */ G(ve, {}),
				disabled: s,
				"aria-label": `Add ${f ?? "record"}`,
				onClick: () => g("new")
			})
		}) : null, m ? /* @__PURE__ */ G(V, {
			title: `Edit ${f ?? "record"}`,
			children: /* @__PURE__ */ G(w, {
				type: "default",
				icon: /* @__PURE__ */ G(fe, {}),
				disabled: s,
				"aria-label": `Edit ${f ?? "record"}`,
				onClick: () => g(String(o))
			})
		}) : null]
	}), e && t && h != null ? /* @__PURE__ */ G(Pr, {
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
function Gi({ reference: e, choices: t, optionLabel: n = "name", optionValue: r = "id", search: i, allowClear: a, disabled: o, inputStyle: s, onValueChange: c, lazy: u = !0, fetchSelected: f = !0, value: p, onChange: m, fieldName: h, selectedRecords: g, referenceForm: _, referencePermissions: v, referenceTitle: y, referenceDefaultValues: b, referenceModalWidth: x, referenceActions: S = !0, popupMatchSelectWidth: C, popupMinWidth: w }) {
	let [T, E] = d(), [D, O] = d(!1), k = D || !!T, A = ki(p, r), { options: j, loading: M, optionForValue: N, reload: P } = Ui(t, e, n, r, i ? T : void 0, {
		lazy: u,
		active: k,
		selectedValues: p,
		selectedRecords: g,
		fetchSelected: f
	}), F = l(() => j.map((e) => ({
		label: e.label,
		value: e.value
	})), [j]), ee = (e) => {
		let t = e[r];
		m(t), c?.(t, {
			label: Ni(e, n),
			value: t,
			record: e
		}, { name: h }), P();
	}, I = /* @__PURE__ */ G(R, {
		...Ii({
			popupMatchSelectWidth: C,
			popupMinWidth: w
		}),
		value: A,
		onChange: (e) => {
			m(e), c?.(e, N(e), { name: h });
		},
		options: F,
		loading: M,
		notFoundContent: Li(M),
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
	return S ? /* @__PURE__ */ K("div", {
		style: {
			display: "flex",
			gap: 8,
			width: "100%",
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ G("div", {
			style: {
				flex: 1,
				minWidth: 0
			},
			children: I
		}), /* @__PURE__ */ G(Wi, {
			reference: e,
			referenceForm: _,
			referencePermissions: v,
			referenceTitle: y,
			referenceDefaultValues: b,
			referenceModalWidth: x,
			selectedId: A,
			disabled: o,
			onCreated: ee,
			onUpdated: () => void P()
		})]
	}) : I;
}
function Ki({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: s, rules: c, search: l, allowClear: u, disabled: d, hideLabel: f, inputStyle: p, onValueChange: m, lazy: h = !0, recordSource: g, fetchSelected: _ = !0, referenceForm: v, referencePermissions: y, referenceTitle: b, referenceDefaultValues: x, referenceModalWidth: S, referenceActions: C = !0, popupMatchSelectWidth: w, popupMinWidth: T }) {
	let E = ke({
		name: g ?? "",
		disabled: !g
	});
	return /* @__PURE__ */ G($, {
		source: e,
		name: t,
		label: n,
		required: s,
		rules: c,
		hideLabel: f,
		children: ({ value: e, onChange: t, disabled: n, name: s }) => /* @__PURE__ */ G(Gi, {
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
function qi({ reference: e, choices: t, optionLabel: n = "name", optionValue: r = "id", search: i, allowClear: a = !0, lazy: o = !0, fetchSelected: s = !0, value: c, onChange: u, disabled: f, selectedRecords: p, referenceForm: m, referencePermissions: h, referenceTitle: g, referenceDefaultValues: _, referenceModalWidth: v, referenceActions: y = !0, popupMatchSelectWidth: b, popupMinWidth: x }) {
	let [S, C] = d(), [w, T] = d(!1), E = w || !!S, D = Ai(c, r), { options: O, loading: k, reload: A } = Ui(t, e, n, r, i ? S : void 0, {
		lazy: o,
		active: E,
		selectedValues: c,
		selectedRecords: p,
		fetchSelected: s
	}), j = l(() => O.map((e) => ({
		label: e.label,
		value: e.value
	})), [O]), M = /* @__PURE__ */ G(R, {
		...Ii({
			popupMatchSelectWidth: b,
			popupMinWidth: x
		}),
		mode: "multiple",
		value: D,
		onChange: u,
		options: j,
		loading: k,
		notFoundContent: Li(k),
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
	return y ? /* @__PURE__ */ K("div", {
		style: {
			display: "flex",
			gap: 8,
			width: "100%",
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ G("div", {
			style: {
				flex: 1,
				minWidth: 0
			},
			children: M
		}), /* @__PURE__ */ G(Wi, {
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
				u([...n, t]), A();
			}
		})]
	}) : M;
}
function Ji({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: s, rules: c, search: l, allowClear: u = !0, hideLabel: d, disabled: f, lazy: p = !0, recordSource: m, fetchSelected: h = !0, referenceForm: g, referencePermissions: _, referenceTitle: v, referenceDefaultValues: y, referenceModalWidth: b, referenceActions: x = !0, popupMatchSelectWidth: S, popupMinWidth: C }) {
	let w = ke({
		name: m ?? "",
		disabled: !m
	});
	return /* @__PURE__ */ G($, {
		source: e,
		name: t,
		label: n,
		required: s,
		rules: c,
		hideLabel: d,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ G(qi, {
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
function Yi(e) {
	return e instanceof File ? !0 : typeof e == "string" && e.length > 0;
}
function Xi(e) {
	if (e instanceof File) return e.name;
	if (typeof e == "string" && e.length > 0) try {
		return new URL(e, "http://local").pathname.split("/").filter(Boolean).pop() || e;
	} catch {
		return e.split("/").filter(Boolean).pop() || e;
	}
}
//#endregion
//#region src/crud/fields/useUploadPreviewUrl.ts
function Zi(e) {
	let [t, n] = d();
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
function Qi({ value: e, onChange: t, disabled: n, clearable: r, accept: i = "image/*", previewWidth: a = 200 }) {
	let o = u(null), s = Zi(e), c = r && Yi(e);
	return /* @__PURE__ */ K(z, {
		direction: "vertical",
		size: "middle",
		style: { width: "100%" },
		children: [
			s ? /* @__PURE__ */ G(N, {
				src: s,
				alt: "",
				style: {
					maxWidth: a,
					maxHeight: a,
					objectFit: "contain"
				}
			}) : null,
			/* @__PURE__ */ K(z, {
				wrap: !0,
				children: [/* @__PURE__ */ G(w, {
					icon: /* @__PURE__ */ G(Se, {}),
					disabled: n,
					onClick: () => o.current?.click(),
					children: "Choose image"
				}), c ? /* @__PURE__ */ G(w, {
					icon: /* @__PURE__ */ G(J, {}),
					disabled: n,
					onClick: () => {
						t(null), o.current && (o.current.value = "");
					},
					children: "Clear"
				}) : null]
			}),
			/* @__PURE__ */ G("input", {
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
function $i({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, clearable: o, accept: s, previewWidth: c }) {
	return /* @__PURE__ */ G($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ G(Qi, {
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
function ea({ value: e, onChange: t, disabled: n, clearable: r, accept: i }) {
	let a = u(null), o = Xi(e), s = typeof e == "string" && e.length > 0 ? e : void 0, c = r && Yi(e);
	return /* @__PURE__ */ K(z, {
		direction: "vertical",
		size: "middle",
		style: { width: "100%" },
		children: [
			o ? /* @__PURE__ */ K(z, { children: [/* @__PURE__ */ G(_e, {}), s ? /* @__PURE__ */ G(H.Link, {
				href: s,
				target: "_blank",
				rel: "noopener noreferrer",
				children: o
			}) : /* @__PURE__ */ G(H.Text, { children: o })] }) : null,
			/* @__PURE__ */ K(z, {
				wrap: !0,
				children: [/* @__PURE__ */ G(w, {
					icon: /* @__PURE__ */ G(Se, {}),
					disabled: n,
					onClick: () => a.current?.click(),
					children: "Choose file"
				}), c ? /* @__PURE__ */ G(w, {
					icon: /* @__PURE__ */ G(J, {}),
					disabled: n,
					onClick: () => {
						t(null), a.current && (a.current.value = "");
					},
					children: "Clear"
				}) : null]
			}),
			/* @__PURE__ */ G("input", {
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
function ta({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, clearable: o, accept: s }) {
	return /* @__PURE__ */ G($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ G(ea, {
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
function na({ source: e, label: t, sortable: n = !0 }) {
	return zn(l(() => ({
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
function ra(e, t, n) {
	return typeof n == "function" ? n(e) : n ? dr(e, n) : e[t];
}
//#endregion
//#region src/crud/columns/NumberColumn.tsx
function ia({ source: e, label: t, sortable: n = !0 }) {
	return zn(l(() => ({
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
function aa({ source: e, label: t, sortable: n = !0 }) {
	return zn(l(() => ({
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
function oa({ source: e, label: t, sortable: n = !0 }) {
	return zn(l(() => ({
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
function sa({ record: e, source: t, display: n, reference: r, choices: i, optionLabel: a, optionValue: o }) {
	let { labelForValue: s } = Ui(i, r, a, o), c = e[t];
	if (typeof n == "function") return /* @__PURE__ */ G(W, { children: n(e) });
	if (n && n !== t) {
		let r = ra(e, t, n);
		return /* @__PURE__ */ G(W, { children: r == null ? "—" : String(r) });
	}
	return /* @__PURE__ */ G(W, { children: s(c) });
}
function ca({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", display: o, sortable: s = !0 }) {
	return zn(l(() => ({
		key: e,
		source: e,
		label: t,
		sortable: s,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: s ? !0 : void 0,
			render: (s, c) => /* @__PURE__ */ G(sa, {
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
function la({ record: e, source: t, reference: n, choices: r, optionLabel: i, optionValue: a }) {
	let { labelsForValues: o } = Ui(r, n, i, a), s = e[t];
	return /* @__PURE__ */ G(W, { children: o(Array.isArray(s) ? s : []) });
}
function ua({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", sortable: o = !1 }) {
	return zn(l(() => ({
		key: e,
		source: e,
		label: t,
		sortable: o,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: o ? !0 : void 0,
			render: (t, o) => /* @__PURE__ */ G(la, {
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
function da({ source: e, label: t, sortable: n = !1, width: r = 40, height: i = 40, objectFit: a = "cover", borderRadius: o = 4, alt: s = "" }) {
	return zn(l(() => ({
		key: e,
		source: e,
		label: t,
		sortable: n,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: n ? !0 : void 0,
			render: (e) => e == null || e === "" ? null : /* @__PURE__ */ G("img", {
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
function fa({ source: e, label: t, sortable: n = !1, render: r }) {
	return zn(l(() => ({
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
//#region src/crud/filters/NumberFilter.tsx
function pa({ source: e, label: t }) {
	return Jn(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ G(F, {
			placeholder: t ?? e,
			value: n,
			onChange: (e) => r(e ?? void 0),
			style: { minWidth: 120 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/BooleanFilter.tsx
function ma({ source: e, label: t }) {
	return Jn(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ G(R, {
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
function ha({ source: e, label: t }) {
	return Jn(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ G(D, {
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
function ga({ source: e, label: t, choices: n, multiple: r }) {
	return Jn(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: i, onChange: a }) => /* @__PURE__ */ G(R, {
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
function _a({ source: e, label: t, reference: n, choices: r, optionLabel: i, optionValue: a, multiple: o, search: s, lazy: c = !0, fetchSelected: l = !0, popupMatchSelectWidth: u, popupMinWidth: f, value: p, onChange: m }) {
	let [h, g] = d(), [_, v] = d(!1), { options: y, loading: b } = Ui(r, n, i, a, s ? h : void 0, {
		lazy: c,
		active: _ || !!h,
		selectedValues: p,
		fetchSelected: l
	});
	return /* @__PURE__ */ G(R, {
		...Ii({
			popupMatchSelectWidth: u,
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
		notFoundContent: Li(b),
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
function va({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", multiple: o, search: s, lazy: c = !0, fetchSelected: u = !0, popupMatchSelectWidth: d, popupMinWidth: f }) {
	return Jn(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: l, onChange: p }) => /* @__PURE__ */ G(_a, {
			source: e,
			label: t,
			reference: n,
			choices: r,
			optionLabel: i,
			optionValue: a,
			multiple: o,
			search: s,
			lazy: c,
			fetchSelected: u,
			popupMatchSelectWidth: d,
			popupMinWidth: f,
			value: l,
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
		c,
		u,
		d,
		f
	])), null;
}
function ya(e) {
	return /* @__PURE__ */ G(va, {
		...e,
		multiple: !0
	});
}
//#endregion
export { zt as AdminApp, Dt as AdminLayout, Ke as AppThemeProvider, kn as AuthAlternateLink, An as AuthPageLayout, it as AuthProvider, aa as BooleanColumn, mi as BooleanField, ma as BooleanFilter, fa as CustomColumn, Vn as DEFAULT_TEXT_FILTER_DEBOUNCE_MS, Vt as DataProvider, oa as DateColumn, bi as DateField, ha as DateFilter, xi as DateTimeField, Ye as DensitySwitch, qt as EXPECTED_VALIDATION_BODY_HINT, $ as FieldWrapper, ta as FileField, Yr as FilterBar, ci as FormStep, ui as FormSteps, ai as FormTab, si as FormTabs, Ot as Guard, At as GuestOnly, da as ImageColumn, $i as ImageField, ei as InlineFormSet, ti as InlineFormSetStacked, jn as LoginPage, ia as NumberColumn, pi as NumberField, pa as NumberFilter, Di as PasswordField, lt as PermissionsProvider, Mn as PlaceholderPage, kt as Protected, ca as ReferenceColumn, Ki as ReferenceField, va as ReferenceFilter, ua as ReferenceManyColumn, Ji as ReferenceManyField, ya as ReferenceManyFilter, jt as RequirePermission, Xr as ResourceForm, Pr as ResourceFormModal, qr as ResourceList, Ti as SelectField, ga as SelectFilter, fi as TextAreaField, na as TextColumn, di as TextField, Wn as TextFilter, Ze as ThemeSwitch, Qe as ThemeToolbar, wi as TimeField, Sn as applyInMemoryListParams, Q as asStringMessages, pr as buildFormPayload, mr as buildInlineRowsPayload, Sr as buildResourceFormSubmitBody, Gt as combineResourceHandlers, Rt as createAdminRouter, Cn as createMemoryResourceHandlers, ut as createPermissionsChecker, wn as createRestResourceHandlers, st as createSessionStorageAuthAdapter, It as deriveAuthPaths, $t as describeNonStandardValidationBody, _t as filterNavByPermission, bn as filterRows, cn as finalizeFormErrors, sn as flattenNestedArrayErrors, nn as getErrorBody, dr as getFormValue, Mt as getRouteAccess, _n as getRowById, hr as hasUploadValues, Kt as isAbortError, Zr as nestedFieldPath, dn as parseDjangoDRFFormErrors, fn as parseDotNetFormErrors, pn as parseNodeFormErrors, Nt as partitionAdminRoutes, xr as prepareFormSubmitBody, an as resolveErrorBody, fr as setFormValue, En as toDjangoRestOrdering, br as toFormData, On as toJsonApiSort, Dn as toODataOrderBy, Ar as useAbortableEffect, at as useAuth, dt as useCan, Ui as useChoices, Ht as useDataProvider, Vr as useListQueryState, X as usePermissions, ir as useRegisterPayloadField, ar as useRegisterSectionField, Ur as useResourceListContext, qe as useThemeMode };
