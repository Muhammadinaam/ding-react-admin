import { Children as e, createContext as t, createElement as n, forwardRef as r, isValidElement as i, useCallback as a, useContext as o, useEffect as s, useLayoutEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { Link as f, Navigate as p, Outlet as m, RouterProvider as h, createBrowserRouter as g, useLocation as _, useNavigate as v, useParams as y, useSearchParams as b } from "react-router-dom";
import { Alert as x, App as S, Avatar as C, Button as w, Card as T, Col as E, ConfigProvider as D, DatePicker as O, Drawer as k, Dropdown as ee, Flex as A, Form as j, Grid as te, Image as M, Input as N, InputNumber as P, Layout as F, Menu as ne, Modal as I, Pagination as re, Popover as ie, Row as ae, Segmented as L, Select as R, Space as z, Spin as B, Steps as oe, Switch as V, Table as se, Tabs as ce, TimePicker as H, Tooltip as U, Typography as W, theme as G } from "antd";
import { Fragment as K, jsx as q, jsxs as J } from "react/jsx-runtime";
import { AppstoreOutlined as le, ArrowLeftOutlined as ue, CaretDownOutlined as de, CaretUpOutlined as fe, ColumnHeightOutlined as pe, DeleteOutlined as me, DesktopOutlined as he, EditOutlined as ge, LayoutOutlined as _e, LogoutOutlined as ve, MenuOutlined as ye, MoonOutlined as be, PaperClipOutlined as xe, PlusOutlined as Se, SearchOutlined as Ce, SettingOutlined as we, SunOutlined as Y, UploadOutlined as Te, UserOutlined as Ee } from "@ant-design/icons";
import { Controller as De, FormProvider as Oe, useFieldArray as ke, useForm as Ae, useFormContext as je, useFormState as Me, useWatch as Ne } from "react-hook-form";
import Pe from "dayjs";
import './index.css';//#region \0rolldown/runtime.js
var Fe = Object.create, Ie = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, Re = Object.getOwnPropertyNames, ze = Object.getPrototypeOf, Be = Object.prototype.hasOwnProperty, Ve = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), He = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = Re(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !Be.call(e, s) && s !== n && Ie(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = Le(t, s)) || r.enumerable
	});
	return e;
}, Ue = (e, t, n) => (n = e == null ? {} : Fe(ze(e)), He(t || !e || !e.__esModule ? Ie(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), We = t(null);
function Ge(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "light" || t === "dark" || t === "system") return t;
	} catch {}
	return "system";
}
function Ke() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function qe(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "comfortable" || t === "compact") return t;
	} catch {}
	return "compact";
}
var Je = "ding-react-admin-theme-mode", Ye = "ding-react-admin-theme-density";
function Xe({ children: e, modeStorageKey: t = Je, densityStorageKey: n = Ye }) {
	let [r, i] = d(() => Ge(t)), [a, o] = d(() => qe(n)), [c, u] = d(Ke);
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
		let e = m === "dark" ? G.darkAlgorithm : G.defaultAlgorithm;
		return { algorithm: a === "compact" ? [e, G.compactAlgorithm] : e };
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
	return /* @__PURE__ */ q(We.Provider, {
		value: g,
		children: /* @__PURE__ */ q(D, {
			theme: h,
			children: e
		})
	});
}
function Ze() {
	let e = o(We);
	if (!e) throw Error("useThemeMode must be used within AppThemeProvider");
	return e;
}
//#endregion
//#region src/components/DensitySwitch.tsx
var Qe = [{
	label: "Comfortable",
	value: "comfortable",
	icon: /* @__PURE__ */ q(_e, {})
}, {
	label: "Compact",
	value: "compact",
	icon: /* @__PURE__ */ q(pe, {})
}];
function $e() {
	let { density: e, setDensity: t } = Ze();
	return /* @__PURE__ */ q(L, {
		size: "small",
		value: e,
		options: Qe,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeSwitch.tsx
var et = [
	{
		label: "Light",
		value: "light",
		icon: /* @__PURE__ */ q(Y, {})
	},
	{
		label: "Dark",
		value: "dark",
		icon: /* @__PURE__ */ q(be, {})
	},
	{
		label: "Auto",
		value: "system",
		icon: /* @__PURE__ */ q(he, {})
	}
];
function tt() {
	let { mode: e, setMode: t } = Ze();
	return /* @__PURE__ */ q(L, {
		size: "small",
		value: e,
		options: et,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeToolbar.tsx
function nt() {
	let { token: e } = G.useToken();
	return /* @__PURE__ */ q(ie, {
		placement: te.useBreakpoint().lg ? "bottomRight" : "bottom",
		trigger: "click",
		content: /* @__PURE__ */ J(z, {
			orientation: "vertical",
			size: "middle",
			style: {
				minWidth: 240,
				maxWidth: "min(92vw, 320px)"
			},
			children: [/* @__PURE__ */ q(tt, {}), /* @__PURE__ */ q($e, {})]
		}),
		styles: { content: { padding: e.paddingSM } },
		children: /* @__PURE__ */ q(w, {
			type: "default",
			icon: /* @__PURE__ */ q(we, {}),
			"aria-label": "Display and theme settings"
		})
	});
}
//#endregion
//#region src/components/NavMenuSearch.tsx
function rt({ value: e, onChange: t, placeholder: n = "Search menu…", variant: r = "on-dark" }) {
	let { token: i } = G.useToken(), a = r === "on-dark";
	return /* @__PURE__ */ q("div", {
		style: {
			flexShrink: 0,
			paddingInline: i.paddingSM,
			paddingBlock: i.paddingXS
		},
		children: /* @__PURE__ */ q(D, {
			theme: a ? { token: { colorTextPlaceholder: "rgba(255, 255, 255, 0.45)" } } : void 0,
			children: /* @__PURE__ */ q(N, {
				allowClear: !0,
				size: "small",
				value: e,
				onChange: (e) => {
					t(e.target.value);
				},
				placeholder: n,
				prefix: /* @__PURE__ */ q(Ce, { style: { color: a ? "rgba(255, 255, 255, 0.45)" : i.colorTextDescription } }),
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
var it = r(function({ children: e, className: t, style: n, variant: r = "default" }, i) {
	let { token: a } = G.useToken(), o = r === "on-dark" ? "rgba(255, 255, 255, 0.22)" : a.colorTextQuaternary, s = r === "on-dark" ? "rgba(255, 255, 255, 0.38)" : a.colorTextTertiary;
	return /* @__PURE__ */ q("div", {
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
}), at = t(null), ot = "User";
function st(e) {
	return e.getUserLabel?.() ?? ot;
}
function ct({ children: e, adapter: t }) {
	let [n, r] = d(() => t.getToken()), [i, o] = d(() => st(t)), s = a(async (e) => {
		await t.login(e), r(t.getToken()), o(st(t));
	}, [t]), c = a(() => {
		t.logout(), r(t.getToken()), o(st(t));
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
	return /* @__PURE__ */ q(at.Provider, {
		value: u,
		children: e
	});
}
function lt() {
	let e = o(at);
	if (!e) throw Error("useAuth must be used within AuthProvider");
	return e;
}
var ut = "ding-react-admin-auth";
function dt(e = ut) {
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
var ft = t(null);
function pt({ children: e, can: t }) {
	let n = l(() => t, [t]);
	return /* @__PURE__ */ q(ft.Provider, {
		value: n,
		children: e
	});
}
function X() {
	let e = o(ft);
	if (!e) throw Error("usePermissions must be used within PermissionsProvider");
	return e;
}
function mt(e) {
	return (t) => e()?.includes(t) ?? !1;
}
function ht(e) {
	let t = X();
	return a(() => t(e), [t, e]);
}
//#endregion
//#region src/layouts/navFilter.ts
function gt(e) {
	let { label: t } = e;
	return typeof t == "string" ? t : typeof t == "number" ? String(t) : "";
}
function _t(e, t) {
	let n = t.trim().toLowerCase();
	if (!n) return e;
	function r(e) {
		let t = [];
		for (let i of e) {
			let e = gt(i).toLowerCase().includes(n);
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
function vt(e) {
	let t = [];
	function n(e) {
		for (let r of e) r.children?.length && (t.push(r.path), n(r.children));
	}
	return n(e), t;
}
//#endregion
//#region src/components/NavMenuLabel.tsx
function yt({ label: e, title: t }) {
	return t ? /* @__PURE__ */ q(U, {
		title: t,
		placement: "right",
		mouseEnterDelay: 0,
		destroyOnHidden: !0,
		children: /* @__PURE__ */ q("span", {
			className: "ding-admin-menu-label",
			children: e
		})
	}) : /* @__PURE__ */ q("span", {
		className: "ding-admin-menu-label",
		children: e
	});
}
//#endregion
//#region src/layouts/navMenuItems.tsx
function bt(e, t) {
	let n = t?.showLabelTooltip !== !1, r = t?.wrapLabels === !0, i = t?.collapsed === !0;
	return e.map((e) => {
		let a = e.Icon, o = a ? /* @__PURE__ */ q(a, {}) : void 0, s = gt(e), c = s && n ? /* @__PURE__ */ q(yt, {
			label: e.label,
			title: s
		}) : r ? /* @__PURE__ */ q(yt, {
			label: e.label,
			title: ""
		}) : e.label, l = i && s ? { title: s } : {};
		return e.children?.length ? {
			key: e.path,
			icon: o,
			label: c,
			...l,
			children: bt(e.children, t)
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
function xt(e, t) {
	return e.map((e) => {
		if (e.children?.length) {
			let n = xt(e.children, t);
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
var St = "#001529", Ct = "ding-react-admin-sider-collapsed";
function wt(e) {
	try {
		return localStorage.getItem(e) === "1";
	} catch {
		return !1;
	}
}
function Tt() {
	return te.useBreakpoint().lg !== !0;
}
function Et(e) {
	let t = /* @__PURE__ */ new Set();
	function n(e) {
		for (let r of e) r.children?.length ? n(r.children) : t.add(r.path);
	}
	return n(e), t;
}
function Dt(e, t) {
	function n(e) {
		for (let r of e) if (r.children?.length) {
			let e = n(r.children);
			if (e !== null) return [r.path, ...e];
		} else if (r.path === t) return [];
		return null;
	}
	return n(e) ?? [];
}
function Ot({ wrapLabels: e, itemDivider: t = "none" }) {
	let n = ["ding-admin-nav-menu"];
	return e && n.push("ding-admin-nav-menu--wrap-labels"), t === "full" ? n.push("ding-admin-nav-menu--item-divider-full") : t === "inset" && n.push("ding-admin-nav-menu--item-divider-inset"), n.join(" ");
}
function kt({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a, navQuery: o, onNavQueryChange: s, showNavSearch: c, navSearchPlaceholder: l, scrollVariant: u, searchVariant: d, wrapLabels: f, itemDivider: p }) {
	return /* @__PURE__ */ J(K, { children: [c && !n ? /* @__PURE__ */ q(rt, {
		value: o,
		onChange: s,
		placeholder: l,
		variant: d
	}) : null, /* @__PURE__ */ q(it, {
		variant: u,
		style: {
			flex: 1,
			minHeight: 0,
			overflowY: "auto",
			overflowX: "hidden"
		},
		children: /* @__PURE__ */ q(At, {
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
function At({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a, wrapLabels: o, itemDivider: s }) {
	return /* @__PURE__ */ q(ne, {
		className: Ot({
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
function jt({ navItems: e, brand: t = "Admin", collapsedBrand: n = "A", mobileDrawerTitle: r, headerExtras: i, userMenuItems: o, onUserMenuClick: c, loginPath: f = "/login", siderCollapsedStorageKey: p = Ct, navSearch: h = !0, navMenu: g, hideSider: y = !1 }) {
	let b = v(), x = _(), { resolved: S } = Ze(), T = S === "dark", { logout: E, userLabel: D } = lt(), O = X(), [A, j] = d(() => wt(p)), [te, M] = d(!1), N = Tt(), { token: P } = G.useToken(), ne = u(null), [I, re] = d(""), ie = h !== !1, ae = typeof h == "object" ? h.placeholder : void 0, L = g?.wrapLabels !== !1, R = g?.itemDivider ?? "inset", z = r ?? t, B = () => {
		E(), b(f, { replace: !0 });
	}, oe = a((e) => {
		j(e);
		try {
			localStorage.setItem(p, e ? "1" : "0");
		} catch {}
	}, [p]);
	s(() => {
		N || M(!1);
	}, [N]), s(() => {
		M(!1);
	}, [x.pathname]), s(() => {
		ne.current?.scrollTo({
			top: 0,
			left: 0
		});
	}, [x.pathname]), s(() => {
		A && re("");
	}, [A]);
	let V = l(() => xt(e, O), [e, O]), se = I.trim(), ce = se.length > 0, H = l(() => ce ? _t(V, se) : V, [
		V,
		se,
		ce
	]), U = l(() => Et(H), [H]), K = l(() => bt(H, {
		showLabelTooltip: !A && !L,
		wrapLabels: L && !A,
		collapsed: A
	}), [
		H,
		A,
		L
	]), le = l(() => vt(H), [H]), ue = l(() => Dt(V, x.pathname), [V, x.pathname]), [de, fe] = d(() => Dt(V, x.pathname));
	s(() => {
		fe((e) => [...new Set([...e, ...ue])]);
	}, [ue]);
	let pe = a((e) => {
		fe(e);
	}, []), me = ce ? le : de, he = a((e) => {
		re(e);
	}, []), ge = l(() => [{
		key: "logout",
		icon: /* @__PURE__ */ q(ve, {}),
		label: "Log out",
		danger: !0
	}], []), _e = o ?? ge, be = (e) => {
		if (c) {
			c(e);
			return;
		}
		e.key === "logout" && B();
	}, xe = T ? P.colorBgContainer : St, Se = T ? "default" : "on-dark", Ce = T ? "app" : "on-dark", we = [x.pathname], Y = (e) => {
		U.has(e) && (b(e), N && M(!1));
	};
	return /* @__PURE__ */ J(F, {
		style: {
			height: "100vh",
			width: "100%",
			overflow: "hidden",
			background: P.colorBgLayout
		},
		children: [
			!y && !N && /* @__PURE__ */ q(F.Sider, {
				collapsible: !0,
				collapsed: A,
				onCollapse: oe,
				collapsedWidth: 64,
				style: {
					background: xe,
					height: "100vh",
					overflow: "hidden",
					borderInlineEnd: T ? `1px solid ${P.colorSplit}` : void 0
				},
				children: /* @__PURE__ */ J("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						height: "100%",
						overflow: "hidden"
					},
					children: [/* @__PURE__ */ q("div", {
						style: {
							height: 64,
							flexShrink: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontWeight: 600
						},
						children: /* @__PURE__ */ q(W.Text, {
							strong: !0,
							style: { color: P.colorTextLightSolid },
							children: A ? n : t
						})
					}), /* @__PURE__ */ q(kt, {
						menuItems: K,
						selectedKeys: we,
						inlineCollapsed: A,
						openKeys: me,
						onOpenChange: pe,
						onNavigate: Y,
						navQuery: I,
						onNavQueryChange: he,
						showNavSearch: ie,
						navSearchPlaceholder: ae,
						scrollVariant: Se,
						searchVariant: Ce,
						wrapLabels: L,
						itemDivider: R
					})]
				})
			}),
			!y && N && /* @__PURE__ */ q(k, {
				title: /* @__PURE__ */ q(W.Text, {
					strong: !0,
					style: { color: P.colorTextLightSolid },
					children: z
				}),
				placement: "left",
				size: 280,
				onClose: () => M(!1),
				open: te,
				styles: {
					header: {
						background: xe,
						borderBottom: `1px solid ${P.colorSplit}`
					},
					body: {
						padding: 0,
						background: xe
					}
				},
				destroyOnHidden: !0,
				children: /* @__PURE__ */ q("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						height: "100%",
						overflow: "hidden"
					},
					children: /* @__PURE__ */ q(kt, {
						menuItems: K,
						selectedKeys: we,
						inlineCollapsed: !1,
						openKeys: me,
						onOpenChange: pe,
						onNavigate: Y,
						navQuery: I,
						onNavQueryChange: he,
						showNavSearch: ie,
						navSearchPlaceholder: ae,
						scrollVariant: Se,
						searchVariant: Ce,
						wrapLabels: L,
						itemDivider: R
					})
				})
			}),
			/* @__PURE__ */ J(F, {
				style: {
					minWidth: 0,
					flex: 1,
					height: "100vh",
					overflow: "hidden",
					display: "flex",
					flexDirection: "column"
				},
				children: [/* @__PURE__ */ J(F.Header, {
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
						!y && N && /* @__PURE__ */ q(w, {
							type: "text",
							icon: /* @__PURE__ */ q(ye, {}),
							onClick: () => M(!0),
							"aria-label": "Open navigation"
						}),
						/* @__PURE__ */ q("div", { style: {
							flex: 1,
							minWidth: 0
						} }),
						i,
						/* @__PURE__ */ q(nt, {}),
						/* @__PURE__ */ q(ee, {
							menu: {
								items: _e,
								onClick: be
							},
							trigger: ["click"],
							children: /* @__PURE__ */ J(w, {
								type: "text",
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: P.marginXS,
									maxWidth: N ? 44 : void 0,
									paddingInline: N ? P.paddingXS : void 0
								},
								"aria-label": "Account menu",
								children: [/* @__PURE__ */ q(C, {
									size: "small",
									icon: /* @__PURE__ */ q(Ee, {})
								}), !N && /* @__PURE__ */ q(W.Text, {
									type: "secondary",
									ellipsis: !0,
									style: { maxWidth: 160 },
									children: D
								})]
							})
						})
					]
				}), /* @__PURE__ */ q(F.Content, {
					style: {
						minWidth: 0,
						flex: 1,
						minHeight: 0,
						display: "flex",
						flexDirection: "column"
					},
					children: /* @__PURE__ */ q(it, {
						ref: ne,
						style: {
							margin: N ? P.marginSM : P.marginLG,
							flex: 1,
							minHeight: 0,
							overflow: "auto"
						},
						children: /* @__PURE__ */ q(m, {})
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/router/guards.tsx
function Mt({ when: e, redirect: t, children: n }) {
	return e ? n : /* @__PURE__ */ q(p, {
		to: t,
		replace: !0
	});
}
function Nt({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = lt();
	return /* @__PURE__ */ q(Mt, {
		when: n,
		redirect: t,
		children: e
	});
}
function Pt({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = lt();
	return /* @__PURE__ */ q(Mt, {
		when: !n,
		redirect: t,
		children: e
	});
}
function Ft({ permission: e, redirect: t, children: n }) {
	return /* @__PURE__ */ q(Mt, {
		when: X()(e),
		redirect: t,
		children: n
	});
}
//#endregion
//#region src/router/routeAccess.ts
function It(e) {
	return e.access ?? "protected";
}
function Lt(e) {
	let t = [], n = [], r = [];
	for (let i of e) {
		let e = It(i);
		e === "guest" ? t.push(i) : e === "public" ? n.push(i) : r.push(i);
	}
	return {
		guest: t,
		public: n,
		protected: r
	};
}
function Rt(e) {
	return e.replace(/^\/+/, "");
}
function zt(e) {
	return `/${Rt(e)}`;
}
function Bt(e, t) {
	let { guest: n, protected: r } = Lt(e), i = n.find((e) => "path" in e && e.path), a = r.find((e) => "index" in e && e.index), o = r.find((e) => "path" in e && e.path), s = t?.unauthenticated;
	!s && i && "path" in i && i.path && (s = zt(i.path));
	let c = t?.afterLogin;
	if (c || (a ? c = "/" : o && "path" in o && o.path && (c = zt(o.path))), r.length > 0 && !s) throw Error("createAdminRouter: protected routes require redirects.unauthenticated or a guest route (access: \"guest\").");
	if (n.length > 0 && !c) throw Error("createAdminRouter: guest routes require redirects.afterLogin or a protected route (index or path).");
	return {
		loginPath: s ?? "/",
		homePath: c ?? "/"
	};
}
function Vt(e) {
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
function Ht({ navItems: e, children: t, layoutProps: n, redirects: r }) {
	let { loginPath: i, homePath: a } = Bt(t, r), { guest: o, public: s, protected: c } = Lt(t), l = [];
	for (let e of o) !("path" in e) || !e.path || l.push({
		path: Rt(e.path),
		element: /* @__PURE__ */ q(Pt, {
			redirectTo: a,
			children: e.element
		})
	});
	for (let e of s) !("path" in e) || !e.path || l.push({
		path: Rt(e.path),
		element: e.element
	});
	return c.length > 0 && l.push({
		path: "/",
		element: /* @__PURE__ */ q(Nt, {
			redirectTo: i,
			children: /* @__PURE__ */ q(jt, {
				navItems: e,
				loginPath: i,
				...n
			})
		}),
		children: c.map(Vt)
	}), l.push({
		path: "*",
		element: /* @__PURE__ */ q(p, {
			to: a,
			replace: !0
		})
	}), g(l, { basename: "/".replace(/\/$/, "") || void 0 });
}
//#endregion
//#region src/app/AdminApp.tsx
function Ut({ navItems: e, routes: t, authRedirects: n, layoutProps: r, theme: i }) {
	let a = l(() => Ht({
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
	return /* @__PURE__ */ q(Xe, {
		...i,
		children: /* @__PURE__ */ q(h, { router: a })
	});
}
//#endregion
//#region src/context/DataProvider.tsx
var Wt = t(null);
function Gt({ children: e, value: t }) {
	let n = l(() => t, [t]);
	return /* @__PURE__ */ q(Wt.Provider, {
		value: n,
		children: e
	});
}
function Kt() {
	let e = o(Wt);
	if (!e) throw Error("useDataProvider must be used within DataProvider");
	return e;
}
//#endregion
//#region src/data/resourceHandlers.ts
function qt(e) {
	return "handlers" in e ? e : { handlers: e };
}
function Jt(e, t, n) {
	if (!(!e || !t) && !Z(e, t, n)) throw Error("Forbidden");
}
function Yt(e, t) {
	let { can: n, guard: r, parseFormError: i } = t ?? {}, a = (t) => {
		let n = e[t];
		if (!n) throw Error(`Unknown resource: ${t}`);
		return qt(n);
	};
	return {
		async getList(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "list"), Jt(n, o, "list"), i.getList(t);
		},
		async getOne(e, t, i) {
			let { handlers: o, permissions: s } = a(e);
			return r?.(e, "read"), Jt(n, s, "read"), o.getOne(t, i);
		},
		async create(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "add"), Jt(n, o, "add"), i.create(t);
		},
		async update(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "change"), Jt(n, o, "change"), i.update(t);
		},
		async delete(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "delete"), Jt(n, o, "delete"), i.delete(t);
		},
		parseFormError: i
	};
}
//#endregion
//#region src/data/abortError.ts
function Xt(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return t.name === "AbortError" || t.name === "CanceledError" || t.code === "ERR_CANCELED";
}
//#endregion
//#region src/data/parseFormErrorHelpers.ts
var Zt = "Expected HTTP 400 with a JSON object such as `{ \"field_name\": [\"message\"] }` or `{ \"non_field_errors\": [\"message\"] }`.", Qt = 300;
function Q(e) {
	if (typeof e == "string") return [e];
	if (Array.isArray(e)) {
		let t = e.filter((e) => typeof e == "string");
		if (t.length) return t;
	}
	return [];
}
function $t(e) {
	return e.length === 1 ? e[0] : e;
}
function en(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function tn(e) {
	return typeof Response < "u" && e instanceof Response ? !0 : typeof e == "object" && !!e && typeof e.json == "function" && typeof e.status == "number" && e.headers != null;
}
function nn(e, t) {
	if (t) return t;
	if (e === null) return "(no JSON body)";
	try {
		let t = JSON.stringify(e);
		return t.length > Qt ? `${t.slice(0, Qt)}…` : t;
	} catch {
		return String(e);
	}
}
function rn(e, t) {
	return `Non-standard validation response. ${Zt} Received: ${nn(e, t?.hint)}`;
}
function an(e) {
	if (!e || typeof e != "object") return null;
	let t = e.response;
	if (!t || typeof t != "object") return null;
	let n = t.status;
	return typeof n == "number" && (n === 400 || n === 422) ? n : null;
}
function on(e) {
	if (!e || typeof e != "object") return null;
	let t = e.response;
	return tn(t) ? t.headers.get("content-type") : null;
}
function sn(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (en(t.body)) return t.body;
	if (en(t.data)) return t.data;
	let n = t.response;
	if (n && typeof n == "object" && !Array.isArray(n)) {
		let e = n.data;
		if (en(e)) return e;
	}
	return null;
}
function cn(e) {
	if (en(e)) return e;
	if (Array.isArray(e)) {
		let t = Q(e);
		return t.length ? { non_field_errors: $t(t) } : null;
	}
	return null;
}
async function ln(e) {
	let t = sn(e);
	if (t) return t;
	if (!e || typeof e != "object") return null;
	let n = e.response;
	if (!tn(n)) return null;
	let r = n.headers.get("content-type");
	if (!r || !/application\/json/i.test(r)) return null;
	try {
		return cn(await n.clone().json());
	} catch {
		return null;
	}
}
function un(e) {
	return Array.isArray(e) ? e.some((e) => e && typeof e == "object" && !Array.isArray(e) && Object.values(e).some((e) => Q(e).length > 0)) : !1;
}
function dn(e, t, n) {
	t.forEach((t, r) => {
		if (!(!t || typeof t != "object" || Array.isArray(t))) for (let [i, a] of Object.entries(t)) {
			let t = Q(a);
			t.length && (n[`${e}.${r}.${i}`] = $t(t));
		}
	});
}
function fn(e, t) {
	return {
		fields: Object.keys(e).length ? e : void 0,
		global: t.length ? t : void 0
	};
}
var pn = new Set(["non_field_errors", "detail"]);
function mn(e) {
	let t = {}, n = [];
	for (let [r, i] of Object.entries(e)) {
		if (pn.has(r)) {
			n.push(...Q(i));
			continue;
		}
		if (un(i)) {
			dn(r, i, t);
			continue;
		}
		let e = Q(i);
		e.length && (t[r] = $t(e));
	}
	return !Object.keys(t).length && !n.length ? null : fn(t, n);
}
function hn(e, t) {
	let n = sn(e);
	return n ? mn(n) : null;
}
function gn(e, t, n) {
	let r = sn(e);
	if (!r) return null;
	let i = n?.camelCase ?? !0, a = n?.fieldMap, o = {}, s = [];
	n?.includeSummary && (s.push(...Q(r.title)), s.push(...Q(r.message)));
	let c = r.errors;
	if (c && typeof c == "object" && !Array.isArray(c)) for (let [e, t] of Object.entries(c)) {
		let n = a?.[e] ?? (i ? yn(e) : e), r = Q(t);
		r.length && (o[n] = $t(r));
	}
	return !Object.keys(o).length && !s.length ? null : fn(o, s);
}
function _n(e, t, n) {
	let r = sn(e);
	if (!r) return null;
	let i = {}, a = [], o = n?.fieldMap, s = r.errors;
	if (Array.isArray(s)) for (let e of s) {
		if (!e || typeof e != "object") continue;
		let t = e, n = typeof t.path == "string" && t.path || typeof t.param == "string" && t.param || typeof t.field == "string" && t.field, r = Q(t.msg)[0] ?? Q(t.message)[0];
		r && (n ? vn(i, o?.[n] ?? n, r) : a.push(r));
	}
	else if (s && typeof s == "object") for (let [e, t] of Object.entries(s)) {
		let n = o?.[e] ?? e, r = Q(t);
		r.length && (i[n] = $t(r));
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
	return a.push(...Q(r.error)), !Object.keys(i).length && !a.length ? null : fn(i, a);
}
function vn(e, t, n) {
	let r = e[t];
	if (!r) {
		e[t] = n;
		return;
	}
	e[t] = Array.isArray(r) ? [...r, n] : [r, n];
}
function yn(e) {
	return e && e.charAt(0).toLowerCase() + e.slice(1);
}
//#endregion
//#region src/data/inMemoryList.ts
function bn(e, t) {
	return e === t || String(e) === String(t);
}
function xn(e, t) {
	let n = e.find((e) => bn(e.id, t));
	if (!n) throw Error("Not found");
	return n;
}
function Sn(e, t) {
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
function Cn(e, t) {
	return t == null || t === "" ? !0 : Array.isArray(t) ? t.length === 0 ? !0 : Array.isArray(e) ? t.some((t) => e.includes(t)) : t.includes(e) : Array.isArray(e) ? e.includes(t) : typeof t == "string" && typeof e == "string" ? e.toLowerCase().includes(t.toLowerCase()) : e === t;
}
function wn(e, t) {
	return t ? e.filter((e) => Object.entries(t).every(([t, n]) => Cn(e[t], n))) : e;
}
function Tn(e, t, n) {
	let r = (t - 1) * n;
	return {
		data: e.slice(r, r + n),
		total: e.length
	};
}
function En(e, t) {
	let { pagination: n, sort: r, filter: i } = t, a = wn(e, i);
	if (r) {
		let e = Array.isArray(r) ? r : [r];
		e.length > 0 && e[0]?.field && (a = Sn(a, e));
	}
	return n ? Tn(a, n.page, n.perPage) : {
		data: a,
		total: a.length
	};
}
//#endregion
//#region src/data/createMemoryResourceHandlers.ts
function Dn(e) {
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
			return En(t(e.scopeList ? e.scopeList(e.getRows(), n) : e.getRows()), n);
		},
		async getOne(t, n) {
			return { data: xn(e.getRows(), t) };
		},
		async create(t) {
			let r = n(t, e.nextId());
			return e.getRows().push(r), { data: r };
		},
		async update({ id: t, data: n }) {
			let i = xn(e.getRows(), t), a = r(i, n);
			return Object.assign(i, a), { data: i };
		},
		async delete(t) {
			let n = e.getRows(), r = n.findIndex((e) => bn(e.id, t));
			if (r < 0) return { data: null };
			let [i] = n.splice(r, 1);
			return e.afterDelete?.(i), { data: i };
		}
	};
}
//#endregion
//#region src/data/createRestResourceHandlers.ts
function On(e) {
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
function kn(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function An(e) {
	let t = kn(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function jn(e) {
	let t = kn(e);
	if (t.length !== 0) return t.map((e) => `${e.field} ${e.order === "DESC" ? "desc" : "asc"}`).join(",");
}
function Mn(e) {
	let t = kn(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
//#endregion
//#region src/components/AuthAlternateLink.tsx
function Nn({ prompt: e, linkText: t, to: n }) {
	return /* @__PURE__ */ J(W.Paragraph, {
		type: "secondary",
		style: {
			textAlign: "center",
			marginBottom: 0
		},
		children: [
			e,
			" ",
			/* @__PURE__ */ q(f, {
				to: n,
				children: t
			})
		]
	});
}
//#endregion
//#region src/layouts/AuthPageLayout.tsx
function Pn({ children: e, brand: t, footer: n, showThemeToolbar: r = !0 }) {
	let { token: i } = G.useToken();
	return /* @__PURE__ */ J(A, {
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
			r ? /* @__PURE__ */ q(A, {
				justify: "flex-end",
				style: {
					flexShrink: 0,
					width: "100%",
					padding: 16,
					background: i.colorBgLayout
				},
				children: /* @__PURE__ */ q(nt, {})
			}) : null,
			t ? /* @__PURE__ */ q("div", {
				style: {
					flexShrink: 0,
					textAlign: "center",
					padding: "0 24px 16px"
				},
				children: t
			}) : null,
			/* @__PURE__ */ q(it, {
				style: {
					flex: 1,
					minHeight: 0,
					width: "100%",
					background: i.colorBgLayout
				},
				children: /* @__PURE__ */ J(A, {
					vertical: !0,
					align: "center",
					justify: "flex-start",
					style: {
						width: "100%",
						minHeight: "100%",
						padding: "0 24px 24px"
					},
					children: [e, n ? /* @__PURE__ */ q("div", {
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
function Fn({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, brand: r, extraFields: i, showThemeToolbar: a = !0, afterLoginPath: o = "/", alternateAuth: s, footer: c }) {
	let { login: l } = lt(), u = v();
	return /* @__PURE__ */ q(Pn, {
		brand: r ?? n,
		footer: c ?? (s ? /* @__PURE__ */ q(Nn, {
			prompt: s.prompt ?? "Don't have an account?",
			linkText: s.linkText,
			to: s.to
		}) : null),
		showThemeToolbar: a,
		children: /* @__PURE__ */ J(T, {
			style: {
				width: "100%",
				maxWidth: 360
			},
			title: e,
			children: [t ? /* @__PURE__ */ q(W.Paragraph, {
				type: "secondary",
				style: { marginTop: 0 },
				children: t
			}) : null, /* @__PURE__ */ J(j, {
				layout: "vertical",
				onFinish: async (e) => {
					await l({
						username: String(e.username ?? ""),
						password: String(e.password ?? ""),
						...e
					}), u(o, { replace: !0 });
				},
				children: [
					/* @__PURE__ */ q(j.Item, {
						name: "username",
						label: "Username",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ q(N, { autoComplete: "username" })
					}),
					/* @__PURE__ */ q(j.Item, {
						name: "password",
						label: "Password",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ q(N.Password, { autoComplete: "current-password" })
					}),
					i,
					/* @__PURE__ */ q(j.Item, {
						style: { marginBottom: 0 },
						children: /* @__PURE__ */ q(w, {
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
function In({ title: e }) {
	return /* @__PURE__ */ q(W.Title, {
		level: 3,
		style: { marginTop: 0 },
		children: e
	});
}
//#endregion
//#region src/components/AppHub.tsx
function Ln({ apps: e, onAppClick: t, className: n }) {
	let r = v(), i = (e) => {
		if (t) {
			t(e);
			return;
		}
		r(e.path);
	};
	return /* @__PURE__ */ q(ae, {
		gutter: [16, 16],
		className: n,
		children: e.map((e) => {
			let t = e.Icon;
			return /* @__PURE__ */ q(E, {
				xs: 12,
				sm: 8,
				md: 6,
				lg: 4,
				children: /* @__PURE__ */ q(T, {
					hoverable: !0,
					onClick: () => i(e),
					styles: { body: { textAlign: "center" } },
					children: /* @__PURE__ */ J(z, {
						orientation: "vertical",
						size: "small",
						children: [t ? /* @__PURE__ */ q("span", {
							style: {
								fontSize: 32,
								lineHeight: 1
							},
							children: /* @__PURE__ */ q(t, {})
						}) : null, /* @__PURE__ */ q(W.Text, {
							strong: !0,
							children: e.label
						})]
					})
				})
			}, e.path);
		})
	});
}
//#endregion
//#region src/components/AppLauncherButton.tsx
function Rn({ hubPath: e = "/", label: t = "Apps", onClick: n }) {
	let r = v();
	return /* @__PURE__ */ q(w, {
		type: "text",
		icon: /* @__PURE__ */ q(le, {}),
		onClick: () => {
			if (n) {
				n();
				return;
			}
			r(e);
		},
		children: t
	});
}
//#endregion
//#region src/crud/utils/sortQueryParam.ts
function zn(e) {
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
function Bn(e) {
	return e.length === 0 ? null : e.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function Vn(e) {
	return new Map(e.map((e, t) => [e.field, t + 1]));
}
//#endregion
//#region src/crud/context/ListContext.tsx
var Hn = t(null);
function Un({ children: e, toggleSort: t, sort: n }) {
	let [r, i] = d([]), o = l(() => new Set(n.map((e) => e.field)), [n]), s = l(() => new Map(n.map((e) => [e.field, e.order])), [n]), c = l(() => Vn(n), [n]), u = a((e) => (i((t) => {
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
	return /* @__PURE__ */ q(Hn.Provider, {
		value: f,
		children: e
	});
}
function Wn() {
	let e = o(Hn);
	if (!e) throw Error("Column components must be used within ResourceList");
	return e;
}
function Gn(e) {
	let { registerColumn: t } = Wn();
	s(() => t(e), [t, e]);
}
//#endregion
//#region src/crud/utils/useDebouncedValue.ts
function Kn(e, t) {
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
var qn = 300;
function Jn(e) {
	if (!(e == null || e === "")) return String(e);
}
function Yn({ value: e, onChange: t, placeholder: n, debounceMs: r }) {
	let [i, a] = d(() => e ?? ""), o = Kn(i, r);
	return s(() => {
		a(e ?? "");
	}, [e]), s(() => {
		if (r <= 0 || o !== i) return;
		let n = Jn(o);
		n !== Jn(e) && t(n);
	}, [
		o,
		i,
		r,
		t,
		e
	]), /* @__PURE__ */ q(N, {
		allowClear: !0,
		placeholder: n,
		value: i,
		onChange: (e) => {
			let n = e.target.value;
			a(n), (r <= 0 || n === "") && t(Jn(n));
		},
		style: { minWidth: 160 }
	});
}
function Xn({ source: e, label: t, placeholder: n, debounceMs: r }) {
	let i = $n(), a = r ?? i?.textFilterDebounceMs ?? 300;
	return er(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: r, onChange: i }) => /* @__PURE__ */ q(Yn, {
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
var Zn = t(null);
function Qn({ children: e, values: t, setFilterValue: n, textFilterDebounceMs: r = 300 }) {
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
	return /* @__PURE__ */ q(Zn.Provider, {
		value: c,
		children: e
	});
}
function $n() {
	return o(Zn);
}
function er(e) {
	let t = $n()?.registerFilter;
	s(() => {
		if (t) return t(e);
	}, [t, e]);
}
//#endregion
//#region src/crud/context/FormContext.tsx
var tr = t(null);
function nr({ children: e, resource: t, isNew: n, disabled: r }) {
	return /* @__PURE__ */ q(tr.Provider, {
		value: {
			resource: t,
			isNew: n,
			disabled: r
		},
		children: e
	});
}
function rr() {
	return o(tr);
}
//#endregion
//#region src/crud/context/FormSectionContext.tsx
var ir = t(null);
function ar({ sourcesRef: e, children: t }) {
	return /* @__PURE__ */ q(ir.Provider, {
		value: e,
		children: t
	});
}
function or() {
	return o(ir);
}
//#endregion
//#region src/crud/context/PayloadFieldsContext.tsx
var sr = t(null);
function cr({ children: e, fieldsRef: t }) {
	return /* @__PURE__ */ q(sr.Provider, {
		value: t,
		children: e
	});
}
function lr() {
	return o(sr);
}
function ur(e, t = !0) {
	let n = lr();
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
function dr(e, t = !0) {
	let n = or();
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
var fr = t(null);
function pr({ children: e, registryRef: t }) {
	return /* @__PURE__ */ q(fr.Provider, {
		value: t,
		children: e
	});
}
function mr() {
	return o(fr);
}
function hr(e, t, n, r, i = !0) {
	let a = mr();
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
function gr({ errors: e }) {
	return e.length ? e.length === 1 ? /* @__PURE__ */ q(x, {
		type: "error",
		title: e[0],
		showIcon: !0,
		style: { marginBottom: 16 }
	}) : /* @__PURE__ */ q(x, {
		type: "error",
		title: "Could not save",
		showIcon: !0,
		style: { marginBottom: 16 },
		description: /* @__PURE__ */ q("ul", {
			style: {
				margin: 0,
				paddingLeft: 20
			},
			children: e.map((e) => /* @__PURE__ */ q("li", { children: e }, e))
		})
	}) : null;
}
//#endregion
//#region src/crud/utils/getFormValue.ts
function _r(e, t) {
	let n = t.split("."), r = e;
	for (let e of n) {
		if (typeof r != "object" || !r) return;
		r = r[e];
	}
	return r;
}
//#endregion
//#region src/crud/utils/setFormValue.ts
function vr(e, t, n) {
	let r = t.split("."), i = e;
	for (let e = 0; e < r.length - 1; e++) {
		let t = r[e], n = i[t];
		(typeof n != "object" || !n || Array.isArray(n)) && (i[t] = {}), i = i[t];
	}
	i[r[r.length - 1]] = n;
}
//#endregion
//#region src/crud/utils/buildFormPayload.ts
function yr(e, t) {
	if (t.length === 0) return { ...e };
	let n = {};
	for (let r of t) {
		let t = _r(e, r);
		t !== void 0 && vr(n, r, t);
	}
	return n;
}
//#endregion
//#region src/crud/utils/buildInlineRowsPayload.ts
function br(e, t, n) {
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
function xr(e) {
	return e instanceof Blob ? !0 : Array.isArray(e) ? e.some(xr) : e && typeof e == "object" ? Object.values(e).some(xr) : !1;
}
//#endregion
//#region src/crud/utils/uploadReferenceUtils.ts
function Sr(e) {
	return /^https?:\/\//i.test(e) || e.startsWith("/media/");
}
function Cr(e, t) {
	if (!t) return e;
	if (typeof e == "string") return Sr(e) ? void 0 : e;
	if (Array.isArray(e)) return e.map((e) => Cr(e, t)).filter((e) => e !== void 0);
	if (e && typeof e == "object" && !(e instanceof Blob)) {
		let n = {};
		for (let [r, i] of Object.entries(e)) {
			let e = Cr(i, t);
			e !== void 0 && (n[r] = e);
		}
		return n;
	}
	return e;
}
function wr(e, t = !0) {
	return Cr(e, t);
}
//#endregion
//#region src/crud/utils/toFormData.ts
function Tr(e, t, n, r) {
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
			if (r.skipExistingUploadUrls && Sr(n)) return;
			e.append(t, n);
			return;
		}
		if (Array.isArray(n)) {
			n.forEach((n, i) => {
				Tr(e, `${t}[${i}]`, n, r);
			});
			return;
		}
		if (typeof n == "object") {
			for (let [i, a] of Object.entries(n)) Tr(e, `${t}[${i}]`, a, r);
			return;
		}
		e.append(t, String(n));
	}
}
function Er(e, t) {
	let n = { skipExistingUploadUrls: t?.skipExistingUploadUrls ?? !0 }, r = new FormData();
	for (let [t, i] of Object.entries(e)) Tr(r, t, i, n);
	return r;
}
//#endregion
//#region src/crud/utils/prepareFormSubmitBody.ts
function Dr(e, t) {
	let n = t?.skipExistingUploadUrls ?? !0;
	return xr(e) ? Er(e, t) : wr(e, n);
}
//#endregion
//#region src/crud/utils/buildResourceFormSubmitBody.ts
function Or(e, t, n, r) {
	let i = yr(e, t);
	if (n) for (let t of n) {
		let n = e[t.field], r = t.payloadKey ?? t.field;
		i[r] = br(n, t.sources, { transformRows: t.transformRows });
	}
	return Dr(i, r);
}
//#endregion
//#region src/crud/utils/formErrors.ts
function kr(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function Ar(e) {
	return Array.isArray(e) ? e.join(", ") : e;
}
function jr(e, t, n) {
	if (t.has(e)) return !0;
	let r = e.match(/^([^.]+)\.(\d+)\.([^.]+)$/);
	if (!r) return !1;
	let [, i, , a] = r;
	return n.get(i)?.sources.includes(a) ?? !1;
}
function Mr(e, t, n) {
	let r = {}, i = [...kr(e.global)];
	for (let [a, o] of Object.entries(e.fields ?? {})) jr(a, t, n) ? r[a] = o : i.push(Ar(o));
	return {
		fieldErrors: r,
		globalErrors: i
	};
}
function Nr(e, t) {
	for (let [n, r] of Object.entries(t)) e.setError(n, {
		type: "server",
		message: Ar(r)
	});
}
function Pr(e) {
	let t = on(e);
	if (t && !/application\/json/i.test(t)) return `non-JSON response (Content-Type: ${t})`;
}
async function Fr(e, t, n, r, i) {
	let a = await ln(n);
	if (a != null) {
		let n = e.parseFormError?.({ body: a }, r);
		if (n) {
			let e = new Set(i.payloadFields), r = /* @__PURE__ */ new Map();
			for (let e of i.inlineRegistry) r.set(e.field, e);
			let { fieldErrors: a, globalErrors: o } = Mr(n, e, r);
			if (Object.keys(a).length || o.length) return Nr(t, a), {
				handled: !0,
				globalErrors: o
			};
		}
		return {
			handled: !0,
			globalErrors: [rn(a)]
		};
	}
	return an(n) == null ? {
		handled: !1,
		globalErrors: []
	} : {
		handled: !0,
		globalErrors: [rn(null, { hint: Pr(n) })]
	};
}
//#endregion
//#region src/crud/utils/useAbortableEffect.ts
function Ir(e, t) {
	s(() => {
		let t = new AbortController();
		return e(t.signal), () => t.abort();
	}, t);
}
//#endregion
//#region src/crud/utils/useFormRecord.ts
function Lr({ dp: e, resource: t, id: n, isNew: r, form: i, message: o, defaultValues: s, enabled: c = !0 }) {
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
			Xt(e) || o.error(e instanceof Error ? e.message : "Load failed");
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
	return Ir((e) => {
		if (c) return m(e);
	}, [c, m]), {
		loading: l,
		formVersion: f
	};
}
function Rr({ dp: e, resource: t, id: n, isNew: r, form: i, message: o, payloadFieldsRef: s, inlineRegistryRef: c, setGlobalErrors: l, onSuccess: u }) {
	let [f, p] = d(!1);
	return {
		onSubmit: a(async (a) => {
			l([]), p(!0);
			try {
				let i = Or(a, Array.from(s.current), c.current.values()), l;
				if (r) l = (await e.create(t, i)).data, o.success("Created");
				else if (n) l = (await e.update(t, {
					id: n,
					data: i
				})).data, o.success("Updated");
				else return;
				u?.(l);
			} catch (n) {
				let { handled: a, globalErrors: u } = await Fr(e, i, n, {
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
function zr({ resource: e, id: t, children: r, defaultValues: i, enabled: a = !0, canSave: o = !0, onCancel: s, cancelHref: c, onSuccess: l, loadingMode: p = "overlay" }) {
	let m = t === "new" || !t, h = m ? void 0 : t, g = Kt(), { message: _ } = S.useApp(), v = u(/* @__PURE__ */ new Set()), y = u(/* @__PURE__ */ new Map()), [b, x] = d([]), C = Ae({ defaultValues: i }), { loading: T, formVersion: E } = Lr({
		dp: g,
		resource: e,
		id: h,
		isNew: m,
		form: C,
		message: _,
		defaultValues: i,
		enabled: a
	}), { onSubmit: D, saving: O } = Rr({
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
	}), k = T || O, ee = () => {
		C.handleSubmit(D, () => {
			_.warning("Please fix the errors below.");
		})();
	}, A = /* @__PURE__ */ q(w, {
		disabled: k,
		onClick: c ? void 0 : s,
		children: "Cancel"
	}), te = /* @__PURE__ */ q(nr, {
		resource: e,
		isNew: m,
		children: /* @__PURE__ */ q(cr, {
			fieldsRef: v,
			children: /* @__PURE__ */ q(pr, {
				registryRef: y,
				children: /* @__PURE__ */ J("div", {
					style: { position: "relative" },
					children: [k && p === "overlay" ? /* @__PURE__ */ q("div", {
						style: {
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							zIndex: 1
						},
						children: /* @__PURE__ */ q(B, {})
					}) : null, /* @__PURE__ */ n(Oe, {
						...C,
						key: E
					}, /* @__PURE__ */ J(j, {
						layout: "vertical",
						onFinish: ee,
						style: p === "overlay" ? {
							opacity: k ? .4 : 1,
							pointerEvents: k ? "none" : void 0
						} : void 0,
						children: [
							/* @__PURE__ */ q(gr, { errors: b }),
							r,
							/* @__PURE__ */ q(j.Item, {
								style: {
									marginTop: 16,
									marginBottom: 0
								},
								children: /* @__PURE__ */ J(z, { children: [/* @__PURE__ */ q(w, {
									type: "primary",
									htmlType: "submit",
									loading: O,
									disabled: k || !o,
									children: "Save"
								}), c ? /* @__PURE__ */ q(f, {
									to: c,
									children: A
								}) : A] })
							})
						]
					}))]
				})
			})
		})
	});
	return T && !O && p === "replace" ? /* @__PURE__ */ q(B, {}) : te;
}
//#endregion
//#region src/crud/ResourceFormModal.tsx
function Br({ resource: e, editId: t, onClose: n, children: r, title: i, permissions: a, defaultValues: o, width: s = 560, onSuccess: c }) {
	let l = t === "new", u = t != null, d = X(), f = i ?? (l ? `New ${e}` : `Edit ${e}`), p = a ? Z(d, a, l ? "add" : "change") : !0;
	return /* @__PURE__ */ q(I, {
		open: u,
		title: f,
		onCancel: n,
		footer: null,
		destroyOnHidden: !0,
		width: s,
		maskClosable: !1,
		children: /* @__PURE__ */ q(S, { children: /* @__PURE__ */ q(zr, {
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
function Vr({ selectedCount: e, total: t, allPageSelected: n, allMatchingSelected: r, onSelectAllMatching: i, onClearSelection: o, actions: s, onExecute: c, selectedIds: u, running: f = !1 }) {
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
	return /* @__PURE__ */ J(z, {
		wrap: !0,
		style: {
			marginBottom: 16,
			width: "100%"
		},
		align: "center",
		children: [
			/* @__PURE__ */ J(W.Text, {
				type: "secondary",
				children: [
					e,
					" of ",
					t,
					" selected"
				]
			}),
			e > 0 ? /* @__PURE__ */ q(w, {
				type: "link",
				size: "small",
				onClick: o,
				style: { padding: 0 },
				children: "Clear selection"
			}) : null,
			_ ? /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ q(W.Text, {
				type: "secondary",
				children: "·"
			}), /* @__PURE__ */ J(w, {
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
			r && t > 0 ? /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ q(W.Text, {
				type: "secondary",
				children: "·"
			}), /* @__PURE__ */ J(W.Text, {
				type: "success",
				children: [
					"All ",
					t,
					" items selected"
				]
			})] }) : null,
			/* @__PURE__ */ q(R, {
				placeholder: "Action",
				style: { minWidth: 200 },
				options: h,
				value: p,
				onChange: m,
				disabled: e === 0 || f,
				allowClear: !0
			}),
			/* @__PURE__ */ q(w, {
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
var Hr = new Set([
	"page",
	"perPage",
	"sort",
	"create",
	"edit"
]), Ur = 1, Wr = 10;
function Gr(e) {
	if (e.includes(",")) {
		let t = e.split(",").map((e) => e.trim()), n = t.map(Number);
		return n.every((e) => Number.isFinite(e)) ? n : t;
	}
	let t = Number(e);
	return e !== "" && Number.isFinite(t) && String(t) === e ? t : e === "true" ? !0 : e === "false" ? !1 : e;
}
function Kr(e) {
	return e == null || e === "" ? null : Array.isArray(e) ? e.length === 0 ? null : e.map(String).join(",") : String(e);
}
function qr(e) {
	let [t, n] = b(), r = l(() => {
		let n = t.get("page"), r = t.get("perPage"), i = n ? Math.max(1, Number(n) || Ur) : Ur, a = r ? Math.max(1, Number(r) || Wr) : Wr, o = t.getAll("sort"), s = o.length > 0 ? o.flatMap((e) => zn(e)) : zn(t.get("sort")), c = { ...e };
		return t.forEach((e, n) => {
			if (Hr.has(n)) return;
			let r = c[n];
			r === void 0 ? t.getAll(n).length > 1 ? c[n] = t.getAll(n).map(Gr) : c[n] = Gr(e) : c[n] = [...Array.isArray(r) ? r : [r], Gr(e)];
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
				e === Wr ? t.delete("perPage") : t.set("perPage", String(e)), t.delete("page");
			});
		},
		setSort: (e) => {
			i((t) => {
				t.delete("sort");
				let n = Bn(e);
				n && t.set("sort", n);
			});
		},
		toggleSort: (e) => {
			i((t) => {
				let n = t.getAll("sort").flatMap((e) => zn(e)), r = n.findIndex((t) => t.field === e), i;
				i = r < 0 ? [...n, {
					field: e,
					order: "ASC"
				}] : n[r].order === "ASC" ? n.map((e, t) => t === r ? {
					...e,
					order: "DESC"
				} : e) : n.filter((e, t) => t !== r), t.delete("sort");
				let a = Bn(i);
				a && t.set("sort", a);
			});
		},
		setFilter: (e, t) => {
			i((n) => {
				n.delete(e);
				let r = Kr(t);
				r != null && n.set(e, r), n.delete("page");
			});
		},
		setFilters: (e) => {
			i((t) => {
				for (let e of [...t.keys()]) Hr.has(e) || t.delete(e);
				for (let [n, r] of Object.entries(e)) {
					let e = Kr(r);
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
var Jr = t(null);
function Yr() {
	return o(Jr);
}
function Xr(e) {
	return e == null || e === "" ? "—" : String(e);
}
function Zr(e, t) {
	if (e.length === 0 || !t.showEdit && !t.showQuickEdit) return e;
	let [n, ...r] = e, i = n.render;
	return [{
		...n,
		render: (e, n, r) => {
			let a = i ? i(e, n, r) : Xr(e);
			return t.showEdit ? /* @__PURE__ */ q(f, {
				to: `${t.pathPrefix}/${String(n.id)}`,
				className: "ding-admin-row-edit-link",
				children: a
			}) : /* @__PURE__ */ q(w, {
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
function Qr({ resource: e, title: t, pathPrefix: n, newPath: r, editMode: i = "page", formChildren: o, actions: s, rowActions: p, headerExtra: m, bulkActions: h, bulkDelete: g = !0, bulkActionsEnabled: _ = !0, permissions: v, queryState: y, queryActions: b }) {
	let x = Kt(), C = X(), { message: E, modal: D } = S.useApp(), { token: O } = G.useToken(), { columns: k, sortOrders: ee, sortPriorities: A } = Wn(), j = u(null), [te, M] = d(), [N, P] = d(!1), [F, ne] = d([]), [I, ie] = d(0), [ae, L] = d(() => /* @__PURE__ */ new Set()), [R, B] = d(!1), oe = r ?? `${n}/new`, V = Z(C, v, "add"), ce = Z(C, v, "change"), H = Z(C, v, "delete"), U = ce && (i === "page" || i === "both") && s?.edit !== !1, le = ce && (i === "modal" || i === "both") && s?.quickEdit !== !1, ue = H && s?.delete !== !1, pe = U || le || ue || p, me = a(() => {
		L(/* @__PURE__ */ new Set());
	}, []), he = l(() => {
		if (!_) return [];
		let t = [];
		return g && H && t.push({
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
		H,
		h,
		x,
		e,
		E
	]), ge = he.length > 0, _e = ae.size;
	c(() => {
		let e = j.current;
		if (!e) return;
		let t = e.closest(".ding-admin-scroll");
		t?.classList.add("ding-admin-resource-list-scroll");
		let n = () => {
			if (e.clientHeight <= 0) return;
			let t = e.querySelector(".ding-admin-resource-list-pagination"), n = e.querySelector(".ant-table-header"), r = t?.offsetHeight ?? 0, i = t ? parseFloat(getComputedStyle(t).marginTop) + parseFloat(getComputedStyle(t).marginBottom) : 0, a = n?.offsetHeight ?? 0, o = e.querySelector(".ant-table-body"), s = o && o.scrollWidth > o.clientWidth ? o.offsetHeight - o.clientHeight : 0, c = Math.max(120, Math.floor(e.clientHeight - a - r - i - s - 8));
			M((e) => e === c ? e : c);
		};
		n();
		let r = new ResizeObserver(() => n());
		return r.observe(e), window.addEventListener("resize", n), () => {
			t?.classList.remove("ding-admin-resource-list-scroll"), r.disconnect(), window.removeEventListener("resize", n);
		};
	}, [
		ge,
		_e,
		I,
		N
	]);
	let ve = F.length > 0 && F.every((e) => ae.has(e.id)), ye = I > 0 && _e >= I, be = l(() => F.filter((e) => ae.has(e.id)).map((e) => e.id), [F, ae]), xe = a((e) => {
		L((t) => {
			let n = new Set(t), r = F.map((e) => e.id);
			for (let t of r) e.includes(t) || n.delete(t);
			for (let t of e) n.add(t);
			return n;
		});
	}, [F]), Se = a(async () => {
		if (!(I <= 0)) {
			B(!0);
			try {
				let t = y.sort.length === 0 ? void 0 : y.sort.length === 1 ? y.sort[0] : y.sort, n = await x.getList(e, {
					pagination: {
						page: 1,
						perPage: I
					},
					sort: t,
					filter: y.filter
				});
				L(new Set(n.data.map((e) => e.id)));
			} catch (e) {
				E.error(e instanceof Error ? e.message : "Load failed");
			} finally {
				B(!1);
			}
		}
	}, [
		x,
		e,
		I,
		y.sort,
		y.filter,
		E
	]), Ce = a((e) => {
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
		if (n && !Array.isArray(e) && e.order) {
			b.toggleSort(n);
			return;
		}
		!e?.order && y.sort.length > 0 && b.setSort([]);
	}, [b, y.sort.length]), we = l(() => {
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
		P(!0);
		try {
			let n = await x.getList(e, {
				...we,
				signal: t
			});
			if (t?.aborted) return;
			ne(n.data), ie(n.total);
		} catch (e) {
			Xt(e) || E.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			t?.aborted || P(!1);
		}
	}, [
		x,
		e,
		we,
		E
	]);
	Ir((e) => Y(e), [Y]);
	let Te = l(() => ({
		reload: () => void Y(),
		clearSelection: me
	}), [Y, me]), Ee = a(async (e, t) => {
		if (e.confirm) {
			let n = typeof e.confirm == "function" ? await e.confirm(t, Te) : e.confirm;
			if (n === !1 || !await new Promise((t) => {
				D.confirm({
					title: n,
					okType: e.key === "__delete" ? "danger" : "primary",
					onOk: () => t(!0),
					onCancel: () => t(!1)
				});
			})) return;
		}
		B(!0);
		try {
			await e.execute(t, Te);
		} catch (e) {
			E.error(e instanceof Error ? e.message : "Action failed");
		} finally {
			B(!1);
		}
	}, [
		Te,
		D,
		E
	]), De = a(async (t) => {
		if (H) try {
			await x.delete(e, t.id), E.success("Deleted"), Y();
		} catch (e) {
			E.error(e instanceof Error ? e.message : "Delete failed");
		}
	}, [
		H,
		x,
		e,
		Y,
		E
	]), Oe = l(() => {
		let e = k.map((e) => {
			let t = e.buildColumn();
			if (e.sortable) {
				let n = ee.get(e.source), r = A.get(e.source), i = n === "ASC" ? "ascend" : n === "DESC" ? "descend" : void 0, a = i == null ? void 0 : /* @__PURE__ */ J("span", {
					style: {
						display: "inline-flex",
						alignItems: "center",
						gap: 2,
						marginInlineStart: 4,
						color: "var(--ant-color-primary)"
					},
					children: [r == null ? null : /* @__PURE__ */ q("span", {
						style: {
							fontSize: 11,
							fontWeight: 600,
							lineHeight: 1,
							minWidth: 10,
							textAlign: "center"
						},
						children: r
					}), q(i === "ascend" ? fe : de, { style: { fontSize: 11 } })]
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
		if (!pe) return Zr(e, {
			showEdit: U,
			showQuickEdit: le,
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
			render: (e, r) => /* @__PURE__ */ J(z, {
				size: "small",
				wrap: !0,
				children: [
					U ? /* @__PURE__ */ q(f, {
						to: `${n}/${String(r.id)}`,
						children: "Edit"
					}) : null,
					le ? /* @__PURE__ */ q(w, {
						type: "link",
						size: "small",
						style: { padding: 0 },
						onClick: () => b.openEditModal(r.id),
						children: i === "both" ? "Quick edit" : "Edit"
					}) : null,
					ue ? /* @__PURE__ */ q(w, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => void De(r),
						style: { padding: 0 },
						children: "Delete"
					}) : null,
					p?.(r, t)
				]
			})
		};
		return Zr([...e, r], {
			showEdit: U,
			showQuickEdit: le,
			pathPrefix: n,
			openEditModal: b.openEditModal
		});
	}, [
		k,
		pe,
		U,
		le,
		ue,
		i,
		n,
		De,
		ee,
		A,
		b,
		p,
		Y
	]), ke = a((e, t) => {
		if (t !== y.perPage) {
			b.setPerPage(t);
			return;
		}
		e !== y.page && b.setPage(e);
	}, [
		b,
		y.page,
		y.perPage
	]), Ae = o && (y.createModal || y.editId != null) && (i === "modal" || i === "both");
	return /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ J(T, {
		title: /* @__PURE__ */ q(W.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		}),
		extra: m || V ? /* @__PURE__ */ J(z, { children: [m, V ? i === "modal" || i === "both" ? /* @__PURE__ */ J(K, { children: [i === "both" ? /* @__PURE__ */ q(f, {
			to: oe,
			children: /* @__PURE__ */ q(w, { children: "New page" })
		}) : null, /* @__PURE__ */ q(w, {
			type: "primary",
			onClick: () => b.openCreateModal(),
			children: "New"
		})] }) : /* @__PURE__ */ q(f, {
			to: oe,
			children: /* @__PURE__ */ q(w, {
				type: "primary",
				children: "New"
			})
		}) : null] }) : null,
		children: [ge ? /* @__PURE__ */ q(Vr, {
			selectedCount: _e,
			total: I,
			allPageSelected: ve,
			allMatchingSelected: ye,
			onSelectAllMatching: () => void Se(),
			onClearSelection: me,
			actions: he,
			onExecute: Ee,
			selectedIds: [...ae],
			running: R || N
		}) : null, /* @__PURE__ */ J("div", {
			ref: j,
			className: "ding-admin-resource-list-table",
			style: {
				"--ding-scroll-thumb": O.colorTextQuaternary,
				"--ding-scroll-thumb-hover": O.colorTextTertiary
			},
			children: [/* @__PURE__ */ q(se, {
				rowKey: "id",
				loading: N,
				columns: Oe,
				dataSource: F,
				scroll: {
					x: "max-content",
					...te ? { y: te } : {}
				},
				rowSelection: ge ? {
					selectedRowKeys: be,
					onChange: xe,
					preserveSelectedRowKeys: !0
				} : void 0,
				pagination: !1,
				onChange: (e, t, n) => {
					Ce(n);
				}
			}), /* @__PURE__ */ q("div", {
				className: "ding-admin-resource-list-pagination",
				children: /* @__PURE__ */ q(re, {
					current: y.page,
					pageSize: y.perPage,
					total: I,
					showSizeChanger: !0,
					onChange: ke
				})
			})]
		})]
	}), Ae ? /* @__PURE__ */ q(Br, {
		resource: e,
		editId: y.createModal ? "new" : y.editId,
		onClose: () => {
			b.closeModal(), Y();
		},
		children: o
	}) : null] });
}
function $r({ resource: e, title: t, pathPrefix: n, newPath: r, staticFilter: i, textFilterDebounceMs: o, editMode: s = "page", syncQueryParams: c = !0, children: u, formChildren: d, actions: f, rowActions: p, headerExtra: m, bulkActions: h, bulkDelete: g, bulkActionsEnabled: _, permissions: v }) {
	let [y, b] = qr(i), x = l(() => {
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
	return /* @__PURE__ */ q(Jr.Provider, {
		value: C,
		children: /* @__PURE__ */ q(Qn, {
			values: x,
			setFilterValue: S,
			textFilterDebounceMs: o,
			children: /* @__PURE__ */ q(Un, {
				toggleSort: b.toggleSort,
				sort: y.sort,
				children: /* @__PURE__ */ J("div", {
					className: "ding-admin-resource-list-root",
					children: [u, /* @__PURE__ */ q(Qr, {
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
		})
	});
}
//#endregion
//#region src/crud/FilterBar.tsx
function ei() {
	let e = $n();
	return !e || e.filters.length === 0 ? null : /* @__PURE__ */ q(z, {
		wrap: !0,
		size: "middle",
		style: { marginBottom: 16 },
		children: e.filters.map((t) => /* @__PURE__ */ J(z, {
			orientation: "vertical",
			size: 2,
			children: [t.label ? /* @__PURE__ */ q(W.Text, {
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
function ti({ children: e }) {
	return /* @__PURE__ */ J(K, { children: [e, /* @__PURE__ */ q(ei, {})] });
}
//#endregion
//#region src/crud/ResourceForm.tsx
function ni({ resource: e, title: t, listPath: n, children: r, defaultValues: i, onSaved: a, stayOnPage: o, permissions: c }) {
	let { id: l } = y(), u = l === "new" || !l, d = X(), p = v(), { token: m } = G.useToken();
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
	return /* @__PURE__ */ q(T, {
		title: /* @__PURE__ */ J(z, { children: [/* @__PURE__ */ J(f, {
			to: n,
			style: { color: m.colorText },
			children: [/* @__PURE__ */ q(ue, {}), " Back"]
		}), /* @__PURE__ */ q(W.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		})] }),
		children: /* @__PURE__ */ q(zr, {
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
function ri(e, t, n) {
	return `${e}.${t}.${n}`;
}
//#endregion
//#region src/crud/InlineFormSet.tsx
function ii(e, t) {
	let n = {};
	for (let r of e) n[r] = t?.[r] ?? void 0;
	return n;
}
function ai(e, t, n) {
	let { control: r } = je(), { fields: i, append: a, remove: o } = ke({
		control: r,
		name: e,
		keyName: "rowKey"
	});
	return {
		fields: i,
		remove: o,
		appendEmpty: () => a(ii(t, n))
	};
}
function oi({ field: e, label: t, payloadKey: n, transformRows: r, columns: i, defaultRow: a }) {
	let o = l(() => i.map((e) => e.source), [i]), { fields: s, remove: c, appendEmpty: u } = ai(e, o, a);
	ur(e), hr(e, o, n, r);
	let d = l(() => i.map((t) => ({
		title: t.label ?? t.source,
		key: t.source,
		width: t.width,
		onHeaderCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		onCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		render: (n, r, i) => t.cell({
			name: ri(e, i, t.source),
			index: i,
			field: e
		})
	})), [i, e]);
	return /* @__PURE__ */ J("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ q(W.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ q(se, {
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
					render: (e, t, n) => /* @__PURE__ */ q(w, {
						type: "link",
						danger: !0,
						size: "small",
						onClick: () => c(n),
						children: "Remove"
					})
				}]
			}),
			/* @__PURE__ */ q(w, {
				type: "dashed",
				style: { marginTop: 8 },
				onClick: u,
				children: "Add row"
			})
		]
	});
}
function si({ field: e, label: t, payloadKey: n, transformRows: r, sources: i, renderRow: a, getCardTitle: o, footer: s, defaultRow: c }) {
	let { fields: l, remove: u, appendEmpty: d } = ai(e, i, c);
	return ur(e), hr(e, i, n, r), /* @__PURE__ */ J("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ q(W.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ q(z, {
				orientation: "vertical",
				size: "middle",
				style: { width: "100%" },
				children: l.map((t, n) => {
					let r = {
						field: e,
						index: n,
						name: (t) => ri(e, n, t)
					};
					return /* @__PURE__ */ q(T, {
						size: "small",
						title: o?.(r) ?? `Item ${n + 1}`,
						extra: /* @__PURE__ */ q(w, {
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
			/* @__PURE__ */ q(w, {
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
function ci(e, t, n) {
	for (let r of e) if (t(r, n).invalid) return !0;
	return !1;
}
function li(e) {
	let t = u([]);
	for (; t.current.length < e;) t.current.push({ current: /* @__PURE__ */ new Set() });
	return t.current.length > e && (t.current.length = e), t.current;
}
function ui(e, t) {
	let { control: n, getFieldState: r, setFocus: i } = je(), a = Me({ control: n }), o = u(0), c = u(0);
	s(() => {
		if (a.submitCount === 0) return;
		let n = Object.keys(a.errors).length, s = a.submitCount !== o.current, l = !s && n > 0 && c.current === 0;
		if (o.current = a.submitCount, c.current = n, !s && !l || n === 0) return;
		let u = e.findIndex((e) => ci(e.current, r, a));
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
function di(e) {
	return null;
}
function fi(e) {
	return i(e) && e.type === di;
}
function pi({ children: t, defaultActiveKey: n, activeKey: r, onChange: i, ...o }) {
	let { token: s } = G.useToken(), c = l(() => e.toArray(t).filter(fi).map((e, t) => ({
		key: e.key ?? String(t),
		label: e.props.label,
		disabled: e.props.disabled,
		children: e.props.children
	})), [t]), u = li(c.length), f = r !== void 0, [p, m] = d(() => n ?? c[0]?.key ?? "0"), h = f ? r : p, g = a((e) => {
		f || m(e), i?.(e);
	}, [f, i]);
	ui(u, a((e) => {
		let t = c[e]?.key;
		t != null && g(t);
	}, [g, c]));
	let { control: _, getFieldState: v } = je(), y = Me({ control: _ });
	return /* @__PURE__ */ q(ce, {
		destroyOnHidden: !1,
		items: l(() => c.map((e, t) => {
			let n = ci(u[t].current, v, y);
			return {
				key: e.key,
				label: n ? /* @__PURE__ */ q("span", {
					style: { color: s.colorError },
					children: e.label
				}) : e.label,
				disabled: e.disabled,
				children: /* @__PURE__ */ q(ar, {
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
function mi(e) {
	return null;
}
function hi(e) {
	return i(e) && e.type === mi;
}
function gi({ children: t, initialStep: n = 0, showNavigation: r = !0, allowStepSelect: i = !1, stepsStyle: o, navigationStyle: s, size: c, direction: u, type: f, status: p }) {
	let m = l(() => e.toArray(t).filter(hi), [t]), h = li(m.length), [g, _] = d(n), v = m.length - 1;
	ui(h, _);
	let { control: y, getFieldState: b } = je(), x = Me({ control: y }), S = l(() => m.map((e, t) => {
		let n = ci(h[t].current, b, x);
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
	return /* @__PURE__ */ J(K, { children: [
		/* @__PURE__ */ q(oe, {
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
		m.map((e, t) => /* @__PURE__ */ q("div", {
			style: { display: g === t ? void 0 : "none" },
			children: /* @__PURE__ */ q(ar, {
				sourcesRef: h[t],
				children: e.props.children
			})
		}, e.key ?? String(t))),
		r && m.length > 1 ? /* @__PURE__ */ J(z, {
			style: {
				marginTop: 16,
				...s
			},
			children: [/* @__PURE__ */ q(w, {
				disabled: g === 0,
				onClick: () => _((e) => e - 1),
				children: "Previous"
			}), /* @__PURE__ */ q(w, {
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
	let s = t ?? e, c = !s.includes("."), { control: l } = je(), u = rr(), d = a ? void 0 : n ?? e, f = n ?? e;
	return ur(e, c), dr(e, c), /* @__PURE__ */ q(De, {
		name: s,
		control: l,
		rules: {
			required: r ? `${f} is required` : !1,
			...i
		},
		render: ({ field: e, fieldState: t }) => /* @__PURE__ */ q(j.Item, {
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
function _i({ source: e, name: t, label: n, required: r, rules: i, placeholder: a, inputStyle: o, hideLabel: s }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: s,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(N, {
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
function vi({ source: e, name: t, label: n, required: r, rules: i, placeholder: a, inputStyle: o, hideLabel: s, rows: c = 4, maxLength: l, showCount: u, autoSize: d }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: s,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(N.TextArea, {
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
function yi({ source: e, name: t, label: n, required: r, rules: i, min: a, max: o, step: s, inputStyle: c, hideLabel: l }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: l,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(P, {
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
function bi({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, disabled: o }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ q(V, {
			checked: !!e,
			onChange: t,
			disabled: n || o
		})
	});
}
//#endregion
//#region src/crud/utils/parseDayjsValue.ts
var xi = /* @__PURE__ */ Ue((/* @__PURE__ */ Ve(((e, t) => {
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
Pe.extend(xi.default);
function Si(e, t) {
	if (e == null || e === "") return null;
	if (Pe.isDayjs(e)) return e;
	let n = Pe(String(e), t, !0);
	return n.isValid() ? n : Pe(String(e)).isValid() ? Pe(String(e)) : null;
}
//#endregion
//#region src/crud/fields/DateField.tsx
var Ci = "YYYY-MM-DD", wi = `${Ci} HH:mm:ss`, Ti = [
	Ci,
	wi,
	"YYYY-MM-DDTHH:mm:ss",
	"YYYY-MM-DDTHH:mm:ssZ"
];
function Ei({ source: e, name: t, label: n, required: r, rules: i, showTime: a, hideLabel: o }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(O, {
			value: Si(e, a ? [...Ti, wi] : Ti),
			onChange: (e) => t(e ? e.format(a ? wi : Ci) : null),
			onBlur: n,
			showTime: a,
			disabled: r,
			format: a ? wi : Ci,
			style: { width: "100%" }
		})
	});
}
//#endregion
//#region src/crud/fields/DateTimeField.tsx
function Di(e) {
	return /* @__PURE__ */ q(Ei, {
		showTime: !0,
		...e
	});
}
//#endregion
//#region src/crud/fields/TimeField.tsx
var Oi = "HH:mm:ss", ki = [
	Oi,
	"HH:mm",
	"H:mm:ss",
	"H:mm"
];
function Ai({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, format: o = Oi }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(H, {
			value: Si(e, ki),
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
function ji({ source: e, name: t, label: n, required: r, rules: i, choices: a, mode: o, allowClear: s, hideLabel: c }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: c,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ q(R, {
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
function Mi({ source: e, name: t, label: n, required: r, rules: i, autoComplete: a, hideLabel: o }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(N.Password, {
			value: e,
			onChange: (e) => t(e.target.value),
			onBlur: n,
			disabled: r,
			autoComplete: a
		})
	});
}
function Ni({ source: e, name: t, label: n, required: r, rules: i, confirmSource: a, confirmLabel: o = "Confirm password", autoComplete: s = "new-password", hideLabel: c }) {
	let l = Ne({
		name: t ?? e,
		disabled: !a
	});
	return a ? /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ q(Mi, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		autoComplete: s,
		hideLabel: c
	}), /* @__PURE__ */ q(Mi, {
		source: a,
		label: o,
		required: r,
		autoComplete: s,
		hideLabel: c,
		rules: { validate: (e) => !l || e === l || "Passwords do not match" }
	})] }) : /* @__PURE__ */ q(Mi, {
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
function Pi(e, t) {
	return typeof e == "object" && !!e && !Array.isArray(e) && t in e;
}
function Fi(e, t) {
	if (!(e == null || e === "")) {
		if (Pi(e, t)) {
			let n = e[t];
			return typeof n == "string" || typeof n == "number" ? n : void 0;
		}
		if (typeof e == "string" || typeof e == "number") return e;
	}
}
function Ii(e, t) {
	return Array.isArray(e) ? e.map((e) => Fi(e, t)).filter((e) => e != null) : [];
}
function Li(e, t) {
	return e == null ? [] : (Array.isArray(e) ? e : [e]).filter((e) => e != null && e !== "").map((e) => Pi(e, t) ? e[t] : e);
}
function Ri(e, t, n) {
	let r = [];
	if (t != null && (Array.isArray(t) ? r.push(...t.filter((e) => Pi(e, n))) : Pi(t, n) && r.push(t)), e == null) return r;
	let i = Array.isArray(e) ? e : [e];
	for (let e of i) Pi(e, n) && r.push(e);
	return r;
}
function zi(e, t) {
	return typeof t == "function" ? t(e) : String(e[t] ?? "");
}
function Bi(e, t, n) {
	return e.map((e) => ({
		label: zi(e, t),
		value: e[n],
		record: e
	}));
}
function Vi(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) n.set(t.value, t);
	for (let e of t) n.set(e.value, e);
	return Array.from(n.values());
}
function Hi(e = {}) {
	let t = e.popupMatchSelectWidth ?? !1;
	return t === !1 ? {
		popupMatchSelectWidth: !1,
		styles: { popup: { root: { minWidth: e.popupMinWidth ?? 360 } } }
	} : { popupMatchSelectWidth: t };
}
//#endregion
//#region src/crud/utils/referenceSelectNotFoundContent.tsx
function Ui(e) {
	return e ? /* @__PURE__ */ q(B, { size: "small" }) : void 0;
}
//#endregion
//#region src/crud/utils/useChoices.ts
var Wi = /* @__PURE__ */ new Map(), Gi = /* @__PURE__ */ new Map();
function Ki(e, t) {
	return typeof e == "function" ? `fn:${t ?? ""}` : Array.isArray(e) ? `static:${e.length}` : `res:${e.resource}:${JSON.stringify(e.filter ?? {})}:${t ?? ""}`;
}
async function qi(e, t, n, r, i) {
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
		label: zi(e, n),
		value: e[r],
		record: e
	}));
}
function Ji(e, t, n, r, i, a) {
	let o = Ki(e, i);
	if (a) {
		let e = Wi.get(o);
		if (e && !i) return Promise.resolve(e);
	}
	let s = Gi.get(o);
	if (s) return s;
	let c = qi(e, t, n, r, i).then((e) => (a && !i && Wi.set(o, e), e)).finally(() => {
		Gi.delete(o);
	});
	return Gi.set(o, c), c;
}
function Yi(e, t, n = "name", r = "id", i, o = {}) {
	let { lazy: c = !1, active: u = !1, selectedValues: f, selectedRecords: p, fetchSelected: m = !0, cache: h } = o, g = h ?? !c, _ = Kt(), v = l(() => {
		if (e) return e;
		if (t) return {
			resource: t,
			filter: i ? { q: i } : void 0
		};
	}, [
		e,
		t,
		i
	]), y = v ? Ki(v, i) : void 0, b = l(() => Li(f, r), [f, r]), x = l(() => Bi(Ri(f, p, r), n, r), [
		f,
		p,
		n,
		r
	]), S = !!(v && (!c || u || Array.isArray(v))), [C, w] = d(() => x.length ? x : !y || i || c || !g ? [] : Wi.get(y) ?? []), [T, E] = d(() => S ? !g || !y || i ? !!v : !Wi.has(y) : !1);
	s(() => {
		x.length && w((e) => Vi(e, x));
	}, [x]);
	let D = a(async () => {
		if (!v || !S) {
			v || w(x), E(!1);
			return;
		}
		if (g) {
			let e = Ki(v, i), t = Wi.get(e);
			if (t && !i) {
				w(Vi(x, t)), E(!1);
				return;
			}
		}
		E(!0), c && w(x);
		try {
			w(Vi(x, await Ji(v, _, n, r, i, g)));
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
					label: zi(e, n),
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
				return t.length ? Vi(e, t) : e;
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
function Xi({ reference: e, referenceForm: t, referencePermissions: n, referenceTitle: r, referenceDefaultValues: i, referenceModalWidth: a, selectedId: o, disabled: s, onCreated: c, onUpdated: l }) {
	let u = X(), f = r ?? e, p = !!(e && t) && Z(u, n, "add"), m = !!(e && t && o != null && o !== "") && Z(u, n, "change"), [h, g] = d(null);
	return !p && !m ? null : /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ J(z, {
		size: 4,
		children: [p ? /* @__PURE__ */ q(U, {
			title: `Add ${f ?? "record"}`,
			children: /* @__PURE__ */ q(w, {
				type: "default",
				icon: /* @__PURE__ */ q(Se, {}),
				disabled: s,
				"aria-label": `Add ${f ?? "record"}`,
				onClick: () => g("new")
			})
		}) : null, m ? /* @__PURE__ */ q(U, {
			title: `Edit ${f ?? "record"}`,
			children: /* @__PURE__ */ q(w, {
				type: "default",
				icon: /* @__PURE__ */ q(ge, {}),
				disabled: s,
				"aria-label": `Edit ${f ?? "record"}`,
				onClick: () => g(String(o))
			})
		}) : null]
	}), e && t && h != null ? /* @__PURE__ */ q(Br, {
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
function Zi({ reference: e, choices: t, optionLabel: n = "name", optionValue: r = "id", search: i, allowClear: a, disabled: o, inputStyle: s, onValueChange: c, lazy: u = !0, fetchSelected: f = !0, value: p, onChange: m, fieldName: h, selectedRecords: g, referenceForm: _, referencePermissions: v, referenceTitle: y, referenceDefaultValues: b, referenceModalWidth: x, referenceActions: S = !0, popupMatchSelectWidth: C, popupMinWidth: w }) {
	let [T, E] = d(), [D, O] = d(!1), k = D || !!T, ee = Fi(p, r), { options: A, loading: j, optionForValue: te, reload: M } = Yi(t, e, n, r, i ? T : void 0, {
		lazy: u,
		active: k,
		selectedValues: p,
		selectedRecords: g,
		fetchSelected: f
	}), N = l(() => A.map((e) => ({
		label: e.label,
		value: e.value
	})), [A]), P = (e) => {
		let t = e[r];
		m(t), c?.(t, {
			label: zi(e, n),
			value: t,
			record: e
		}, { name: h }), M();
	}, F = /* @__PURE__ */ q(R, {
		...Hi({
			popupMatchSelectWidth: C,
			popupMinWidth: w
		}),
		value: ee,
		onChange: (e) => {
			m(e), c?.(e, te(e), { name: h });
		},
		options: N,
		loading: j,
		notFoundContent: Ui(j),
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
	return S ? /* @__PURE__ */ J("div", {
		style: {
			display: "flex",
			gap: 8,
			width: "100%",
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ q("div", {
			style: {
				flex: 1,
				minWidth: 0
			},
			children: F
		}), /* @__PURE__ */ q(Xi, {
			reference: e,
			referenceForm: _,
			referencePermissions: v,
			referenceTitle: y,
			referenceDefaultValues: b,
			referenceModalWidth: x,
			selectedId: ee,
			disabled: o,
			onCreated: P,
			onUpdated: () => void M()
		})]
	}) : F;
}
function Qi({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: s, rules: c, search: l, allowClear: u, disabled: d, hideLabel: f, inputStyle: p, onValueChange: m, lazy: h = !0, recordSource: g, fetchSelected: _ = !0, referenceForm: v, referencePermissions: y, referenceTitle: b, referenceDefaultValues: x, referenceModalWidth: S, referenceActions: C = !0, popupMatchSelectWidth: w, popupMinWidth: T }) {
	let E = Ne({
		name: g ?? "",
		disabled: !g
	});
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: s,
		rules: c,
		hideLabel: f,
		children: ({ value: e, onChange: t, disabled: n, name: s }) => /* @__PURE__ */ q(Zi, {
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
function $i({ reference: e, choices: t, optionLabel: n = "name", optionValue: r = "id", search: i, allowClear: a = !0, lazy: o = !0, fetchSelected: s = !0, value: c, onChange: u, disabled: f, selectedRecords: p, referenceForm: m, referencePermissions: h, referenceTitle: g, referenceDefaultValues: _, referenceModalWidth: v, referenceActions: y = !0, popupMatchSelectWidth: b, popupMinWidth: x }) {
	let [S, C] = d(), [w, T] = d(!1), E = w || !!S, D = Ii(c, r), { options: O, loading: k, reload: ee } = Yi(t, e, n, r, i ? S : void 0, {
		lazy: o,
		active: E,
		selectedValues: c,
		selectedRecords: p,
		fetchSelected: s
	}), A = l(() => O.map((e) => ({
		label: e.label,
		value: e.value
	})), [O]), j = /* @__PURE__ */ q(R, {
		...Hi({
			popupMatchSelectWidth: b,
			popupMinWidth: x
		}),
		mode: "multiple",
		value: D,
		onChange: u,
		options: A,
		loading: k,
		notFoundContent: Ui(k),
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
	return y ? /* @__PURE__ */ J("div", {
		style: {
			display: "flex",
			gap: 8,
			width: "100%",
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ q("div", {
			style: {
				flex: 1,
				minWidth: 0
			},
			children: j
		}), /* @__PURE__ */ q(Xi, {
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
					ee();
					return;
				}
				u([...n, t]), ee();
			}
		})]
	}) : j;
}
function ea({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: s, rules: c, search: l, allowClear: u = !0, hideLabel: d, disabled: f, lazy: p = !0, recordSource: m, fetchSelected: h = !0, referenceForm: g, referencePermissions: _, referenceTitle: v, referenceDefaultValues: y, referenceModalWidth: b, referenceActions: x = !0, popupMatchSelectWidth: S, popupMinWidth: C }) {
	let w = Ne({
		name: m ?? "",
		disabled: !m
	});
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: s,
		rules: c,
		hideLabel: d,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ q($i, {
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
function ta(e) {
	return e instanceof File ? !0 : typeof e == "string" && e.length > 0;
}
function na(e) {
	if (e instanceof File) return e.name;
	if (typeof e == "string" && e.length > 0) try {
		return new URL(e, "http://local").pathname.split("/").filter(Boolean).pop() || e;
	} catch {
		return e.split("/").filter(Boolean).pop() || e;
	}
}
//#endregion
//#region src/crud/fields/useUploadPreviewUrl.ts
function ra(e) {
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
function ia({ value: e, onChange: t, disabled: n, clearable: r, accept: i = "image/*", previewWidth: a = 200 }) {
	let o = u(null), s = ra(e), c = r && ta(e);
	return /* @__PURE__ */ J(z, {
		direction: "vertical",
		size: "middle",
		style: { width: "100%" },
		children: [
			s ? /* @__PURE__ */ q(M, {
				src: s,
				alt: "",
				style: {
					maxWidth: a,
					maxHeight: a,
					objectFit: "contain"
				}
			}) : null,
			/* @__PURE__ */ J(z, {
				wrap: !0,
				children: [/* @__PURE__ */ q(w, {
					icon: /* @__PURE__ */ q(Te, {}),
					disabled: n,
					onClick: () => o.current?.click(),
					children: "Choose image"
				}), c ? /* @__PURE__ */ q(w, {
					icon: /* @__PURE__ */ q(me, {}),
					disabled: n,
					onClick: () => {
						t(null), o.current && (o.current.value = "");
					},
					children: "Clear"
				}) : null]
			}),
			/* @__PURE__ */ q("input", {
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
function aa({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, clearable: o, accept: s, previewWidth: c }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ q(ia, {
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
function oa({ value: e, onChange: t, disabled: n, clearable: r, accept: i }) {
	let a = u(null), o = na(e), s = typeof e == "string" && e.length > 0 ? e : void 0, c = r && ta(e);
	return /* @__PURE__ */ J(z, {
		direction: "vertical",
		size: "middle",
		style: { width: "100%" },
		children: [
			o ? /* @__PURE__ */ J(z, { children: [/* @__PURE__ */ q(xe, {}), s ? /* @__PURE__ */ q(W.Link, {
				href: s,
				target: "_blank",
				rel: "noopener noreferrer",
				children: o
			}) : /* @__PURE__ */ q(W.Text, { children: o })] }) : null,
			/* @__PURE__ */ J(z, {
				wrap: !0,
				children: [/* @__PURE__ */ q(w, {
					icon: /* @__PURE__ */ q(Te, {}),
					disabled: n,
					onClick: () => a.current?.click(),
					children: "Choose file"
				}), c ? /* @__PURE__ */ q(w, {
					icon: /* @__PURE__ */ q(me, {}),
					disabled: n,
					onClick: () => {
						t(null), a.current && (a.current.value = "");
					},
					children: "Clear"
				}) : null]
			}),
			/* @__PURE__ */ q("input", {
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
function sa({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, clearable: o, accept: s }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ q(oa, {
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
function ca({ source: e, label: t, sortable: n = !0 }) {
	return Gn(l(() => ({
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
function la(e, t, n) {
	return typeof n == "function" ? n(e) : n ? _r(e, n) : e[t];
}
//#endregion
//#region src/crud/columns/NumberColumn.tsx
function ua({ source: e, label: t, sortable: n = !0 }) {
	return Gn(l(() => ({
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
function da({ source: e, label: t, sortable: n = !0 }) {
	return Gn(l(() => ({
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
function fa({ source: e, label: t, sortable: n = !0 }) {
	return Gn(l(() => ({
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
function pa({ record: e, source: t, display: n, reference: r, choices: i, optionLabel: a, optionValue: o }) {
	let { labelForValue: s } = Yi(i, r, a, o), c = e[t];
	if (typeof n == "function") return /* @__PURE__ */ q(K, { children: n(e) });
	if (n && n !== t) {
		let r = la(e, t, n);
		return /* @__PURE__ */ q(K, { children: r == null ? "—" : String(r) });
	}
	return /* @__PURE__ */ q(K, { children: s(c) });
}
function ma({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", display: o, sortable: s = !0 }) {
	return Gn(l(() => ({
		key: e,
		source: e,
		label: t,
		sortable: s,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: s ? !0 : void 0,
			render: (s, c) => /* @__PURE__ */ q(pa, {
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
function ha({ record: e, source: t, reference: n, choices: r, optionLabel: i, optionValue: a }) {
	let { labelsForValues: o } = Yi(r, n, i, a), s = e[t];
	return /* @__PURE__ */ q(K, { children: o(Array.isArray(s) ? s : []) });
}
function ga({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", sortable: o = !1 }) {
	return Gn(l(() => ({
		key: e,
		source: e,
		label: t,
		sortable: o,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: o ? !0 : void 0,
			render: (t, o) => /* @__PURE__ */ q(ha, {
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
function _a({ source: e, label: t, sortable: n = !1, width: r = 40, height: i = 40, objectFit: a = "cover", borderRadius: o = 4, alt: s = "" }) {
	return Gn(l(() => ({
		key: e,
		source: e,
		label: t,
		sortable: n,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: n ? !0 : void 0,
			render: (e) => e == null || e === "" ? null : /* @__PURE__ */ q("img", {
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
function va({ source: e, label: t, sortable: n = !1, render: r }) {
	return Gn(l(() => ({
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
function ya({ source: e, label: t }) {
	return er(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ q(P, {
			placeholder: t ?? e,
			value: n,
			onChange: (e) => r(e ?? void 0),
			style: { minWidth: 120 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/BooleanFilter.tsx
function ba({ source: e, label: t }) {
	return er(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ q(R, {
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
function xa({ source: e, label: t }) {
	return er(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ q(O, {
			allowClear: !0,
			placeholder: t ?? e,
			value: n ? Pe(String(n)) : null,
			onChange: (e) => r(e ? e.format("YYYY-MM-DD") : void 0),
			style: { minWidth: 160 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/SelectFilter.tsx
function Sa({ source: e, label: t, choices: n, multiple: r }) {
	return er(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: i, onChange: a }) => /* @__PURE__ */ q(R, {
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
function Ca({ source: e, label: t, reference: n, choices: r, optionLabel: i, optionValue: a, multiple: o, search: s, lazy: c = !0, fetchSelected: l = !0, popupMatchSelectWidth: u, popupMinWidth: f, value: p, onChange: m }) {
	let [h, g] = d(), [_, v] = d(!1), { options: y, loading: b } = Yi(r, n, i, a, s ? h : void 0, {
		lazy: c,
		active: _ || !!h,
		selectedValues: p,
		fetchSelected: l
	});
	return /* @__PURE__ */ q(R, {
		...Hi({
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
		notFoundContent: Ui(b),
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
function wa({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", multiple: o, search: s, lazy: c = !0, fetchSelected: u = !0, popupMatchSelectWidth: d, popupMinWidth: f }) {
	return er(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: l, onChange: p }) => /* @__PURE__ */ q(Ca, {
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
function Ta(e) {
	return /* @__PURE__ */ q(wa, {
		...e,
		multiple: !0
	});
}
//#endregion
export { Ut as AdminApp, jt as AdminLayout, Ln as AppHub, Rn as AppLauncherButton, Xe as AppThemeProvider, Nn as AuthAlternateLink, Pn as AuthPageLayout, ct as AuthProvider, da as BooleanColumn, bi as BooleanField, ba as BooleanFilter, va as CustomColumn, qn as DEFAULT_TEXT_FILTER_DEBOUNCE_MS, Gt as DataProvider, fa as DateColumn, Ei as DateField, xa as DateFilter, Di as DateTimeField, $e as DensitySwitch, Zt as EXPECTED_VALIDATION_BODY_HINT, $ as FieldWrapper, sa as FileField, ti as FilterBar, mi as FormStep, gi as FormSteps, di as FormTab, pi as FormTabs, Mt as Guard, Pt as GuestOnly, _a as ImageColumn, aa as ImageField, oi as InlineFormSet, si as InlineFormSetStacked, Fn as LoginPage, ua as NumberColumn, yi as NumberField, ya as NumberFilter, Ni as PasswordField, pt as PermissionsProvider, In as PlaceholderPage, Nt as Protected, ma as ReferenceColumn, Qi as ReferenceField, wa as ReferenceFilter, ga as ReferenceManyColumn, ea as ReferenceManyField, Ta as ReferenceManyFilter, Ft as RequirePermission, ni as ResourceForm, Br as ResourceFormModal, $r as ResourceList, ji as SelectField, Sa as SelectFilter, vi as TextAreaField, ca as TextColumn, _i as TextField, Xn as TextFilter, tt as ThemeSwitch, nt as ThemeToolbar, Ai as TimeField, En as applyInMemoryListParams, Q as asStringMessages, yr as buildFormPayload, br as buildInlineRowsPayload, Or as buildResourceFormSubmitBody, Yt as combineResourceHandlers, Ht as createAdminRouter, Dn as createMemoryResourceHandlers, mt as createPermissionsChecker, On as createRestResourceHandlers, dt as createSessionStorageAuthAdapter, Bt as deriveAuthPaths, rn as describeNonStandardValidationBody, xt as filterNavByPermission, wn as filterRows, fn as finalizeFormErrors, dn as flattenNestedArrayErrors, sn as getErrorBody, _r as getFormValue, It as getRouteAccess, xn as getRowById, xr as hasUploadValues, Xt as isAbortError, ri as nestedFieldPath, hn as parseDjangoDRFFormErrors, gn as parseDotNetFormErrors, _n as parseNodeFormErrors, Lt as partitionAdminRoutes, Dr as prepareFormSubmitBody, ln as resolveErrorBody, vr as setFormValue, An as toDjangoRestOrdering, Er as toFormData, Mn as toJsonApiSort, jn as toODataOrderBy, Ir as useAbortableEffect, lt as useAuth, ht as useCan, Yi as useChoices, Kt as useDataProvider, qr as useListQueryState, X as usePermissions, ur as useRegisterPayloadField, dr as useRegisterSectionField, Yr as useResourceListContext, Ze as useThemeMode };
