import { Children as e, createContext as t, createElement as n, forwardRef as r, isValidElement as i, useCallback as a, useContext as o, useEffect as s, useLayoutEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { Link as f, Navigate as p, Outlet as m, RouterProvider as h, createBrowserRouter as g, useLocation as _, useNavigate as v, useParams as y, useSearchParams as b } from "react-router-dom";
import { Alert as x, App as S, Avatar as C, Button as w, Card as T, Col as E, ConfigProvider as D, DatePicker as O, Drawer as k, Dropdown as A, Flex as j, Form as M, Grid as ee, Image as N, Input as P, InputNumber as F, Layout as I, List as te, Menu as L, Modal as ne, Pagination as re, Popover as ie, Row as R, Segmented as ae, Select as z, Space as B, Spin as oe, Steps as V, Switch as se, Table as ce, Tabs as H, TimePicker as le, Tooltip as U, Typography as W, theme as G } from "antd";
import { Fragment as K, jsx as q, jsxs as J } from "react/jsx-runtime";
import { AppstoreOutlined as ue, ArrowLeftOutlined as de, CaretDownOutlined as fe, CaretUpOutlined as pe, ColumnHeightOutlined as me, DeleteOutlined as he, DesktopOutlined as ge, EditOutlined as _e, LayoutOutlined as ve, LogoutOutlined as ye, MenuOutlined as be, MoonOutlined as xe, PaperClipOutlined as Se, PlusOutlined as Ce, SearchOutlined as we, SettingOutlined as Y, SunOutlined as Te, UploadOutlined as Ee, UserOutlined as De } from "@ant-design/icons";
import { Controller as Oe, FormProvider as ke, useFieldArray as Ae, useForm as je, useFormContext as Me, useFormState as Ne, useWatch as Pe } from "react-hook-form";
import Fe from "dayjs";
import './index.css';//#region \0rolldown/runtime.js
var Ie = Object.create, Le = Object.defineProperty, Re = Object.getOwnPropertyDescriptor, ze = Object.getOwnPropertyNames, Be = Object.getPrototypeOf, Ve = Object.prototype.hasOwnProperty, He = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), Ue = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = ze(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !Ve.call(e, s) && s !== n && Le(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = Re(t, s)) || r.enumerable
	});
	return e;
}, We = (e, t, n) => (n = e == null ? {} : Ie(Be(e)), Ue(t || !e || !e.__esModule ? Le(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), Ge = t(null);
function Ke(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "light" || t === "dark" || t === "system") return t;
	} catch {}
	return "system";
}
function qe() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function Je(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "comfortable" || t === "compact") return t;
	} catch {}
	return "compact";
}
var Ye = "ding-react-admin-theme-mode", Xe = "ding-react-admin-theme-density";
function Ze({ children: e, modeStorageKey: t = Ye, densityStorageKey: n = Xe }) {
	let [r, i] = d(() => Ke(t)), [a, o] = d(() => Je(n)), [c, u] = d(qe);
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
	return /* @__PURE__ */ q(Ge.Provider, {
		value: g,
		children: /* @__PURE__ */ q(D, {
			theme: h,
			children: e
		})
	});
}
function Qe() {
	let e = o(Ge);
	if (!e) throw Error("useThemeMode must be used within AppThemeProvider");
	return e;
}
//#endregion
//#region src/components/DensitySwitch.tsx
var $e = [{
	label: "Comfortable",
	value: "comfortable",
	icon: /* @__PURE__ */ q(ve, {})
}, {
	label: "Compact",
	value: "compact",
	icon: /* @__PURE__ */ q(me, {})
}];
function et() {
	let { density: e, setDensity: t } = Qe();
	return /* @__PURE__ */ q(ae, {
		size: "small",
		value: e,
		options: $e,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeSwitch.tsx
var tt = [
	{
		label: "Light",
		value: "light",
		icon: /* @__PURE__ */ q(Te, {})
	},
	{
		label: "Dark",
		value: "dark",
		icon: /* @__PURE__ */ q(xe, {})
	},
	{
		label: "Auto",
		value: "system",
		icon: /* @__PURE__ */ q(ge, {})
	}
];
function nt() {
	let { mode: e, setMode: t } = Qe();
	return /* @__PURE__ */ q(ae, {
		size: "small",
		value: e,
		options: tt,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeToolbar.tsx
function rt() {
	let { token: e } = G.useToken();
	return /* @__PURE__ */ q(ie, {
		placement: ee.useBreakpoint().lg ? "bottomRight" : "bottom",
		trigger: "click",
		content: /* @__PURE__ */ J(B, {
			orientation: "vertical",
			size: "middle",
			style: {
				minWidth: 240,
				maxWidth: "min(92vw, 320px)"
			},
			children: [/* @__PURE__ */ q(nt, {}), /* @__PURE__ */ q(et, {})]
		}),
		styles: { content: { padding: e.paddingSM } },
		children: /* @__PURE__ */ q(w, {
			type: "default",
			icon: /* @__PURE__ */ q(Y, {}),
			"aria-label": "Display and theme settings"
		})
	});
}
//#endregion
//#region src/components/NavMenuSearch.tsx
function it({ value: e, onChange: t, placeholder: n = "Search menu…", variant: r = "on-dark" }) {
	let { token: i } = G.useToken(), a = r === "on-dark";
	return /* @__PURE__ */ q("div", {
		style: {
			flexShrink: 0,
			paddingInline: i.paddingSM,
			paddingBlock: i.paddingXS
		},
		children: /* @__PURE__ */ q(D, {
			theme: a ? { token: { colorTextPlaceholder: "rgba(255, 255, 255, 0.45)" } } : void 0,
			children: /* @__PURE__ */ q(P, {
				allowClear: !0,
				size: "small",
				value: e,
				onChange: (e) => {
					t(e.target.value);
				},
				placeholder: n,
				prefix: /* @__PURE__ */ q(we, { style: { color: a ? "rgba(255, 255, 255, 0.45)" : i.colorTextDescription } }),
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
var at = r(function({ children: e, className: t, style: n, variant: r = "default" }, i) {
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
}), ot = t(null), st = "User";
function ct(e) {
	return e.getUserLabel?.() ?? st;
}
function lt({ children: e, adapter: t }) {
	let [n, r] = d(() => t.getToken()), [i, o] = d(() => ct(t)), s = a(async (e) => {
		await t.login(e), r(t.getToken()), o(ct(t));
	}, [t]), c = a(() => {
		t.logout(), r(t.getToken()), o(ct(t));
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
	return /* @__PURE__ */ q(ot.Provider, {
		value: u,
		children: e
	});
}
function ut() {
	let e = o(ot);
	if (!e) throw Error("useAuth must be used within AuthProvider");
	return e;
}
var dt = "ding-react-admin-auth";
function ft(e = dt) {
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
var pt = t(null);
function mt({ children: e, can: t }) {
	let n = l(() => t, [t]);
	return /* @__PURE__ */ q(pt.Provider, {
		value: n,
		children: e
	});
}
function X() {
	let e = o(pt);
	if (!e) throw Error("usePermissions must be used within PermissionsProvider");
	return e;
}
function ht(e) {
	return (t) => e()?.includes(t) ?? !1;
}
function gt(e) {
	let t = X();
	return a(() => t(e), [t, e]);
}
//#endregion
//#region src/layouts/navFilter.ts
function _t(e) {
	let { label: t } = e;
	return typeof t == "string" ? t : typeof t == "number" ? String(t) : "";
}
function vt(e, t) {
	let n = t.trim().toLowerCase();
	if (!n) return e;
	function r(e) {
		let t = [];
		for (let i of e) {
			let e = _t(i).toLowerCase().includes(n);
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
function yt(e, t) {
	let n = t?.group, r = [];
	function i(e) {
		for (let t of e) t.children?.length ? i(t.children) : r.push({
			path: t.path,
			label: t.label,
			Icon: t.Icon,
			group: n
		});
	}
	return i(e), r;
}
function bt(e, t) {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => {
		let t = _t(e).toLowerCase(), r = (e.group ?? "").toLowerCase();
		return t.includes(n) || r.includes(n);
	}) : [];
}
function xt(e) {
	let t = [];
	function n(e) {
		for (let r of e) r.children?.length && (t.push(r.path), n(r.children));
	}
	return n(e), t;
}
//#endregion
//#region src/components/NavMenuLabel.tsx
function St({ label: e, title: t }) {
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
function Ct(e, t) {
	let n = t?.showLabelTooltip !== !1, r = t?.wrapLabels === !0, i = t?.collapsed === !0;
	return e.map((e) => {
		let a = e.Icon, o = a ? /* @__PURE__ */ q(a, {}) : void 0, s = _t(e), c = s && n ? /* @__PURE__ */ q(St, {
			label: e.label,
			title: s
		}) : r ? /* @__PURE__ */ q(St, {
			label: e.label,
			title: ""
		}) : e.label, l = i && s ? { title: s } : {};
		return e.children?.length ? {
			key: e.path,
			icon: o,
			label: c,
			...l,
			children: Ct(e.children, t)
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
function wt(e, t) {
	return e.map((e) => {
		if (e.children?.length) {
			let n = wt(e.children, t);
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
var Tt = "#001529", Et = "ding-react-admin-sider-collapsed";
function Dt(e) {
	try {
		return localStorage.getItem(e) === "1";
	} catch {
		return !1;
	}
}
function Ot() {
	return ee.useBreakpoint().lg !== !0;
}
function kt(e) {
	let t = /* @__PURE__ */ new Set();
	function n(e) {
		for (let r of e) r.children?.length ? n(r.children) : t.add(r.path);
	}
	return n(e), t;
}
function At(e, t) {
	function n(e) {
		for (let r of e) if (r.children?.length) {
			let e = n(r.children);
			if (e !== null) return [r.path, ...e];
		} else if (r.path === t) return [];
		return null;
	}
	return n(e) ?? [];
}
function jt({ wrapLabels: e, itemDivider: t = "none" }) {
	let n = ["ding-admin-nav-menu"];
	return e && n.push("ding-admin-nav-menu--wrap-labels"), t === "full" ? n.push("ding-admin-nav-menu--item-divider-full") : t === "inset" && n.push("ding-admin-nav-menu--item-divider-inset"), n.join(" ");
}
function Mt({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a, navQuery: o, onNavQueryChange: s, showNavSearch: c, navSearchPlaceholder: l, scrollVariant: u, searchVariant: d, wrapLabels: f, itemDivider: p }) {
	return /* @__PURE__ */ J(K, { children: [c && !n ? /* @__PURE__ */ q(it, {
		value: o,
		onChange: s,
		placeholder: l,
		variant: d
	}) : null, /* @__PURE__ */ q(at, {
		variant: u,
		style: {
			flex: 1,
			minHeight: 0,
			overflowY: "auto",
			overflowX: "hidden"
		},
		children: /* @__PURE__ */ q(Nt, {
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
function Nt({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a, wrapLabels: o, itemDivider: s }) {
	return /* @__PURE__ */ q(L, {
		className: jt({
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
function Pt({ navItems: e, brand: t = "Admin", collapsedBrand: n = "A", mobileDrawerTitle: r, headerExtras: i, userMenuItems: o, onUserMenuClick: c, loginPath: f = "/login", siderCollapsedStorageKey: p = Et, navSearch: h = !0, navMenu: g, hideSider: y = !1 }) {
	let b = v(), x = _(), { resolved: S } = Qe(), T = S === "dark", { logout: E, userLabel: D } = ut(), O = X(), [j, M] = d(() => Dt(p)), [ee, N] = d(!1), P = Ot(), { token: F } = G.useToken(), te = u(null), [L, ne] = d(""), re = h !== !1, ie = typeof h == "object" ? h.placeholder : void 0, R = g?.wrapLabels !== !1, ae = g?.itemDivider ?? "inset", z = r ?? t, B = () => {
		E(), b(f, { replace: !0 });
	}, oe = a((e) => {
		M(e);
		try {
			localStorage.setItem(p, e ? "1" : "0");
		} catch {}
	}, [p]);
	s(() => {
		P || N(!1);
	}, [P]), s(() => {
		N(!1);
	}, [x.pathname]), s(() => {
		te.current?.scrollTo({
			top: 0,
			left: 0
		});
	}, [x.pathname]), s(() => {
		j && ne("");
	}, [j]);
	let V = l(() => wt(e, O), [e, O]), se = L.trim(), ce = se.length > 0, H = l(() => ce ? vt(V, se) : V, [
		V,
		se,
		ce
	]), le = l(() => kt(H), [H]), U = l(() => Ct(H, {
		showLabelTooltip: !j && !R,
		wrapLabels: R && !j,
		collapsed: j
	}), [
		H,
		j,
		R
	]), K = l(() => xt(H), [H]), ue = l(() => At(V, x.pathname), [V, x.pathname]), [de, fe] = d(() => At(V, x.pathname));
	s(() => {
		fe((e) => [...new Set([...e, ...ue])]);
	}, [ue]);
	let pe = a((e) => {
		fe(e);
	}, []), me = ce ? K : de, he = a((e) => {
		ne(e);
	}, []), ge = l(() => [{
		key: "logout",
		icon: /* @__PURE__ */ q(ye, {}),
		label: "Log out",
		danger: !0
	}], []), _e = o ?? ge, ve = (e) => {
		if (c) {
			c(e);
			return;
		}
		e.key === "logout" && B();
	}, xe = T ? F.colorBgContainer : Tt, Se = T ? "default" : "on-dark", Ce = T ? "app" : "on-dark", we = [x.pathname], Y = (e) => {
		le.has(e) && (b(e), P && N(!1));
	};
	return /* @__PURE__ */ J(I, {
		style: {
			height: "100vh",
			width: "100%",
			overflow: "hidden",
			background: F.colorBgLayout
		},
		children: [
			!y && !P && /* @__PURE__ */ q(I.Sider, {
				collapsible: !0,
				collapsed: j,
				onCollapse: oe,
				collapsedWidth: 64,
				style: {
					background: xe,
					height: "100vh",
					overflow: "hidden",
					borderInlineEnd: T ? `1px solid ${F.colorSplit}` : void 0
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
							style: { color: F.colorTextLightSolid },
							children: j ? n : t
						})
					}), /* @__PURE__ */ q(Mt, {
						menuItems: U,
						selectedKeys: we,
						inlineCollapsed: j,
						openKeys: me,
						onOpenChange: pe,
						onNavigate: Y,
						navQuery: L,
						onNavQueryChange: he,
						showNavSearch: re,
						navSearchPlaceholder: ie,
						scrollVariant: Se,
						searchVariant: Ce,
						wrapLabels: R,
						itemDivider: ae
					})]
				})
			}),
			!y && P && /* @__PURE__ */ q(k, {
				title: /* @__PURE__ */ q(W.Text, {
					strong: !0,
					style: { color: F.colorTextLightSolid },
					children: z
				}),
				placement: "left",
				size: 280,
				onClose: () => N(!1),
				open: ee,
				styles: {
					header: {
						background: xe,
						borderBottom: `1px solid ${F.colorSplit}`
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
					children: /* @__PURE__ */ q(Mt, {
						menuItems: U,
						selectedKeys: we,
						inlineCollapsed: !1,
						openKeys: me,
						onOpenChange: pe,
						onNavigate: Y,
						navQuery: L,
						onNavQueryChange: he,
						showNavSearch: re,
						navSearchPlaceholder: ie,
						scrollVariant: Se,
						searchVariant: Ce,
						wrapLabels: R,
						itemDivider: ae
					})
				})
			}),
			/* @__PURE__ */ J(I, {
				style: {
					minWidth: 0,
					flex: 1,
					height: "100vh",
					overflow: "hidden",
					display: "flex",
					flexDirection: "column"
				},
				children: [/* @__PURE__ */ J(I.Header, {
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
						!y && P && /* @__PURE__ */ q(w, {
							type: "text",
							icon: /* @__PURE__ */ q(be, {}),
							onClick: () => N(!0),
							"aria-label": "Open navigation"
						}),
						/* @__PURE__ */ q("div", { style: {
							flex: 1,
							minWidth: 0
						} }),
						i,
						/* @__PURE__ */ q(rt, {}),
						/* @__PURE__ */ q(A, {
							menu: {
								items: _e,
								onClick: ve
							},
							trigger: ["click"],
							children: /* @__PURE__ */ J(w, {
								type: "text",
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: F.marginXS,
									maxWidth: P ? 44 : void 0,
									paddingInline: P ? F.paddingXS : void 0
								},
								"aria-label": "Account menu",
								children: [/* @__PURE__ */ q(C, {
									size: "small",
									icon: /* @__PURE__ */ q(De, {})
								}), !P && /* @__PURE__ */ q(W.Text, {
									type: "secondary",
									ellipsis: !0,
									style: { maxWidth: 160 },
									children: D
								})]
							})
						})
					]
				}), /* @__PURE__ */ q(I.Content, {
					style: {
						minWidth: 0,
						flex: 1,
						minHeight: 0,
						display: "flex",
						flexDirection: "column"
					},
					children: /* @__PURE__ */ q(at, {
						ref: te,
						style: {
							margin: P ? F.marginSM : F.marginLG,
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
function Ft({ when: e, redirect: t, children: n }) {
	return e ? n : /* @__PURE__ */ q(p, {
		to: t,
		replace: !0
	});
}
function It({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = ut();
	return /* @__PURE__ */ q(Ft, {
		when: n,
		redirect: t,
		children: e
	});
}
function Lt({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = ut();
	return /* @__PURE__ */ q(Ft, {
		when: !n,
		redirect: t,
		children: e
	});
}
function Rt({ permission: e, redirect: t, children: n }) {
	return /* @__PURE__ */ q(Ft, {
		when: X()(e),
		redirect: t,
		children: n
	});
}
//#endregion
//#region src/router/routeAccess.ts
function zt(e) {
	return e.access ?? "protected";
}
function Bt(e) {
	let t = [], n = [], r = [];
	for (let i of e) {
		let e = zt(i);
		e === "guest" ? t.push(i) : e === "public" ? n.push(i) : r.push(i);
	}
	return {
		guest: t,
		public: n,
		protected: r
	};
}
function Vt(e) {
	return e.replace(/^\/+/, "");
}
function Ht(e) {
	return `/${Vt(e)}`;
}
function Ut(e, t) {
	let { guest: n, protected: r } = Bt(e), i = n.find((e) => "path" in e && e.path), a = r.find((e) => "index" in e && e.index), o = r.find((e) => "path" in e && e.path), s = t?.unauthenticated;
	!s && i && "path" in i && i.path && (s = Ht(i.path));
	let c = t?.afterLogin;
	if (c || (a ? c = "/" : o && "path" in o && o.path && (c = Ht(o.path))), r.length > 0 && !s) throw Error("createAdminRouter: protected routes require redirects.unauthenticated or a guest route (access: \"guest\").");
	if (n.length > 0 && !c) throw Error("createAdminRouter: guest routes require redirects.afterLogin or a protected route (index or path).");
	return {
		loginPath: s ?? "/",
		homePath: c ?? "/"
	};
}
function Wt(e) {
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
function Gt({ navItems: e, children: t, layoutProps: n, redirects: r }) {
	let { loginPath: i, homePath: a } = Ut(t, r), { guest: o, public: s, protected: c } = Bt(t), l = [];
	for (let e of o) !("path" in e) || !e.path || l.push({
		path: Vt(e.path),
		element: /* @__PURE__ */ q(Lt, {
			redirectTo: a,
			children: e.element
		})
	});
	for (let e of s) !("path" in e) || !e.path || l.push({
		path: Vt(e.path),
		element: e.element
	});
	return c.length > 0 && l.push({
		path: "/",
		element: /* @__PURE__ */ q(It, {
			redirectTo: i,
			children: /* @__PURE__ */ q(Pt, {
				navItems: e,
				loginPath: i,
				...n
			})
		}),
		children: c.map(Wt)
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
function Kt({ navItems: e, routes: t, authRedirects: n, layoutProps: r, theme: i }) {
	let a = l(() => Gt({
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
	return /* @__PURE__ */ q(Ze, {
		...i,
		children: /* @__PURE__ */ q(h, { router: a })
	});
}
//#endregion
//#region src/context/DataProvider.tsx
var qt = t(null);
function Jt({ children: e, value: t }) {
	let n = l(() => t, [t]);
	return /* @__PURE__ */ q(qt.Provider, {
		value: n,
		children: e
	});
}
function Yt() {
	let e = o(qt);
	if (!e) throw Error("useDataProvider must be used within DataProvider");
	return e;
}
//#endregion
//#region src/data/resourceHandlers.ts
function Xt(e) {
	return "handlers" in e ? e : { handlers: e };
}
function Zt(e, t, n) {
	if (!(!e || !t) && !Z(e, t, n)) throw Error("Forbidden");
}
function Qt(e, t) {
	let { can: n, guard: r, parseFormError: i } = t ?? {}, a = (t) => {
		let n = e[t];
		if (!n) throw Error(`Unknown resource: ${t}`);
		return Xt(n);
	};
	return {
		async getList(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "list"), Zt(n, o, "list"), i.getList(t);
		},
		async getOne(e, t, i) {
			let { handlers: o, permissions: s } = a(e);
			return r?.(e, "read"), Zt(n, s, "read"), o.getOne(t, i);
		},
		async create(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "add"), Zt(n, o, "add"), i.create(t);
		},
		async update(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "change"), Zt(n, o, "change"), i.update(t);
		},
		async delete(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "delete"), Zt(n, o, "delete"), i.delete(t);
		},
		parseFormError: i
	};
}
//#endregion
//#region src/data/abortError.ts
function $t(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return t.name === "AbortError" || t.name === "CanceledError" || t.code === "ERR_CANCELED";
}
//#endregion
//#region src/data/parseFormErrorHelpers.ts
var en = "Expected HTTP 400 with a JSON object such as `{ \"field_name\": [\"message\"] }` or `{ \"non_field_errors\": [\"message\"] }`.", tn = 300;
function Q(e) {
	if (typeof e == "string") return [e];
	if (Array.isArray(e)) {
		let t = e.filter((e) => typeof e == "string");
		if (t.length) return t;
	}
	return [];
}
function nn(e) {
	return e.length === 1 ? e[0] : e;
}
function rn(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function an(e) {
	return typeof Response < "u" && e instanceof Response ? !0 : typeof e == "object" && !!e && typeof e.json == "function" && typeof e.status == "number" && e.headers != null;
}
function on(e, t) {
	if (t) return t;
	if (e === null) return "(no JSON body)";
	try {
		let t = JSON.stringify(e);
		return t.length > tn ? `${t.slice(0, tn)}…` : t;
	} catch {
		return String(e);
	}
}
function sn(e, t) {
	return `Non-standard validation response. ${en} Received: ${on(e, t?.hint)}`;
}
function cn(e) {
	if (!e || typeof e != "object") return null;
	let t = e.response;
	if (!t || typeof t != "object") return null;
	let n = t.status;
	return typeof n == "number" && (n === 400 || n === 422) ? n : null;
}
function ln(e) {
	if (!e || typeof e != "object") return null;
	let t = e.response;
	return an(t) ? t.headers.get("content-type") : null;
}
function un(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (rn(t.body)) return t.body;
	if (rn(t.data)) return t.data;
	let n = t.response;
	if (n && typeof n == "object" && !Array.isArray(n)) {
		let e = n.data;
		if (rn(e)) return e;
	}
	return null;
}
function dn(e) {
	if (rn(e)) return e;
	if (Array.isArray(e)) {
		let t = Q(e);
		return t.length ? { non_field_errors: nn(t) } : null;
	}
	return null;
}
async function fn(e) {
	let t = un(e);
	if (t) return t;
	if (!e || typeof e != "object") return null;
	let n = e.response;
	if (!an(n)) return null;
	let r = n.headers.get("content-type");
	if (!r || !/application\/json/i.test(r)) return null;
	try {
		return dn(await n.clone().json());
	} catch {
		return null;
	}
}
function pn(e) {
	return Array.isArray(e) ? e.some((e) => e && typeof e == "object" && !Array.isArray(e) && Object.values(e).some((e) => Q(e).length > 0)) : !1;
}
function mn(e, t, n) {
	t.forEach((t, r) => {
		if (!(!t || typeof t != "object" || Array.isArray(t))) for (let [i, a] of Object.entries(t)) {
			let t = Q(a);
			t.length && (n[`${e}.${r}.${i}`] = nn(t));
		}
	});
}
function hn(e, t) {
	return {
		fields: Object.keys(e).length ? e : void 0,
		global: t.length ? t : void 0
	};
}
var gn = new Set(["non_field_errors", "detail"]);
function _n(e) {
	let t = {}, n = [];
	for (let [r, i] of Object.entries(e)) {
		if (gn.has(r)) {
			n.push(...Q(i));
			continue;
		}
		if (pn(i)) {
			mn(r, i, t);
			continue;
		}
		let e = Q(i);
		e.length && (t[r] = nn(e));
	}
	return !Object.keys(t).length && !n.length ? null : hn(t, n);
}
function vn(e, t) {
	let n = un(e);
	return n ? _n(n) : null;
}
function yn(e, t, n) {
	let r = un(e);
	if (!r) return null;
	let i = n?.camelCase ?? !0, a = n?.fieldMap, o = {}, s = [];
	n?.includeSummary && (s.push(...Q(r.title)), s.push(...Q(r.message)));
	let c = r.errors;
	if (c && typeof c == "object" && !Array.isArray(c)) for (let [e, t] of Object.entries(c)) {
		let n = a?.[e] ?? (i ? Sn(e) : e), r = Q(t);
		r.length && (o[n] = nn(r));
	}
	return !Object.keys(o).length && !s.length ? null : hn(o, s);
}
function bn(e, t, n) {
	let r = un(e);
	if (!r) return null;
	let i = {}, a = [], o = n?.fieldMap, s = r.errors;
	if (Array.isArray(s)) for (let e of s) {
		if (!e || typeof e != "object") continue;
		let t = e, n = typeof t.path == "string" && t.path || typeof t.param == "string" && t.param || typeof t.field == "string" && t.field, r = Q(t.msg)[0] ?? Q(t.message)[0];
		r && (n ? xn(i, o?.[n] ?? n, r) : a.push(r));
	}
	else if (s && typeof s == "object") for (let [e, t] of Object.entries(s)) {
		let n = o?.[e] ?? e, r = Q(t);
		r.length && (i[n] = nn(r));
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
	return a.push(...Q(r.error)), !Object.keys(i).length && !a.length ? null : hn(i, a);
}
function xn(e, t, n) {
	let r = e[t];
	if (!r) {
		e[t] = n;
		return;
	}
	e[t] = Array.isArray(r) ? [...r, n] : [r, n];
}
function Sn(e) {
	return e && e.charAt(0).toLowerCase() + e.slice(1);
}
//#endregion
//#region src/data/inMemoryList.ts
function Cn(e, t) {
	return e === t || String(e) === String(t);
}
function wn(e, t) {
	let n = e.find((e) => Cn(e.id, t));
	if (!n) throw Error("Not found");
	return n;
}
function Tn(e, t) {
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
function En(e, t) {
	return t == null || t === "" ? !0 : Array.isArray(t) ? t.length === 0 ? !0 : Array.isArray(e) ? t.some((t) => e.includes(t)) : t.includes(e) : Array.isArray(e) ? e.includes(t) : typeof t == "string" && typeof e == "string" ? e.toLowerCase().includes(t.toLowerCase()) : e === t;
}
function Dn(e, t) {
	return t ? e.filter((e) => Object.entries(t).every(([t, n]) => En(e[t], n))) : e;
}
function On(e, t, n) {
	let r = (t - 1) * n;
	return {
		data: e.slice(r, r + n),
		total: e.length
	};
}
function kn(e, t) {
	let { pagination: n, sort: r, filter: i } = t, a = Dn(e, i);
	if (r) {
		let e = Array.isArray(r) ? r : [r];
		e.length > 0 && e[0]?.field && (a = Tn(a, e));
	}
	return n ? On(a, n.page, n.perPage) : {
		data: a,
		total: a.length
	};
}
//#endregion
//#region src/data/createMemoryResourceHandlers.ts
function An(e) {
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
			return kn(t(e.scopeList ? e.scopeList(e.getRows(), n) : e.getRows()), n);
		},
		async getOne(t, n) {
			return { data: wn(e.getRows(), t) };
		},
		async create(t) {
			let r = n(t, e.nextId());
			return e.getRows().push(r), { data: r };
		},
		async update({ id: t, data: n }) {
			let i = wn(e.getRows(), t), a = r(i, n);
			return Object.assign(i, a), { data: i };
		},
		async delete(t) {
			let n = e.getRows(), r = n.findIndex((e) => Cn(e.id, t));
			if (r < 0) return { data: null };
			let [i] = n.splice(r, 1);
			return e.afterDelete?.(i), { data: i };
		}
	};
}
//#endregion
//#region src/data/createRestResourceHandlers.ts
function jn(e) {
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
function Mn(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function Nn(e) {
	let t = Mn(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function Pn(e) {
	let t = Mn(e);
	if (t.length !== 0) return t.map((e) => `${e.field} ${e.order === "DESC" ? "desc" : "asc"}`).join(",");
}
function Fn(e) {
	let t = Mn(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
//#endregion
//#region src/components/AuthAlternateLink.tsx
function In({ prompt: e, linkText: t, to: n }) {
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
function Ln({ children: e, brand: t, footer: n, showThemeToolbar: r = !0 }) {
	let { token: i } = G.useToken();
	return /* @__PURE__ */ J(j, {
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
			r ? /* @__PURE__ */ q(j, {
				justify: "flex-end",
				style: {
					flexShrink: 0,
					width: "100%",
					padding: 16,
					background: i.colorBgLayout
				},
				children: /* @__PURE__ */ q(rt, {})
			}) : null,
			t ? /* @__PURE__ */ q("div", {
				style: {
					flexShrink: 0,
					textAlign: "center",
					padding: "0 24px 16px"
				},
				children: t
			}) : null,
			/* @__PURE__ */ q(at, {
				style: {
					flex: 1,
					minHeight: 0,
					width: "100%",
					background: i.colorBgLayout
				},
				children: /* @__PURE__ */ J(j, {
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
function Rn({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, brand: r, extraFields: i, showThemeToolbar: a = !0, afterLoginPath: o = "/", alternateAuth: s, footer: c }) {
	let { login: l } = ut(), u = v();
	return /* @__PURE__ */ q(Ln, {
		brand: r ?? n,
		footer: c ?? (s ? /* @__PURE__ */ q(In, {
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
			}) : null, /* @__PURE__ */ J(M, {
				layout: "vertical",
				onFinish: async (e) => {
					await l({
						username: String(e.username ?? ""),
						password: String(e.password ?? ""),
						...e
					}), u(o, { replace: !0 });
				},
				children: [
					/* @__PURE__ */ q(M.Item, {
						name: "username",
						label: "Username",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ q(P, { autoComplete: "username" })
					}),
					/* @__PURE__ */ q(M.Item, {
						name: "password",
						label: "Password",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ q(P.Password, { autoComplete: "current-password" })
					}),
					i,
					/* @__PURE__ */ q(M.Item, {
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
function zn({ title: e }) {
	return /* @__PURE__ */ q(W.Title, {
		level: 3,
		style: { marginTop: 0 },
		children: e
	});
}
//#endregion
//#region src/components/AppHub.tsx
function Bn({ apps: e, menuItems: t, onAppClick: n, onMenuClick: r, menuSearchPlaceholder: i = "Search menus across apps…", className: a, maxWidth: o = 960 }) {
	let s = v(), { token: c } = G.useToken(), [u, f] = d(""), p = (e) => {
		if (n) {
			n(e);
			return;
		}
		s(e.path);
	}, m = (e) => {
		if (r) {
			r(e);
			return;
		}
		s(e.path);
	}, h = u.trim(), g = l(() => t && h ? bt(t, h) : [], [t, h]), _ = !!(t && h);
	return /* @__PURE__ */ J("div", {
		className: a,
		style: {
			width: "100%",
			maxWidth: o,
			marginInline: "auto",
			paddingInline: c.paddingMD
		},
		children: [t?.length ? /* @__PURE__ */ q("div", {
			style: {
				maxWidth: 480,
				margin: "0 auto 24px"
			},
			children: /* @__PURE__ */ q(it, {
				value: u,
				onChange: f,
				placeholder: i,
				variant: "app"
			})
		}) : null, _ ? /* @__PURE__ */ q(te, {
			bordered: !0,
			dataSource: g,
			locale: { emptyText: "No menus match your search." },
			style: {
				background: c.colorBgContainer,
				borderRadius: c.borderRadiusLG
			},
			renderItem: (e) => {
				let t = e.Icon;
				return /* @__PURE__ */ q(te.Item, {
					style: { cursor: "pointer" },
					onClick: () => m(e),
					children: /* @__PURE__ */ q(te.Item.Meta, {
						avatar: t ? /* @__PURE__ */ q("span", {
							style: {
								fontSize: 20,
								lineHeight: 1
							},
							children: /* @__PURE__ */ q(t, {})
						}) : void 0,
						title: _t(e),
						description: e.group
					})
				});
			}
		}) : /* @__PURE__ */ q(R, {
			gutter: [16, 16],
			justify: "center",
			children: e.map((e) => {
				let t = e.Icon;
				return /* @__PURE__ */ q(E, {
					xs: 12,
					sm: 8,
					md: 6,
					lg: 4,
					style: { maxWidth: 200 },
					children: /* @__PURE__ */ q(T, {
						hoverable: !0,
						onClick: () => p(e),
						styles: { body: {
							textAlign: "center",
							padding: c.paddingLG
						} },
						children: /* @__PURE__ */ J(B, {
							orientation: "vertical",
							size: "middle",
							children: [t ? /* @__PURE__ */ q("span", {
								style: {
									fontSize: 40,
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
		})]
	});
}
//#endregion
//#region src/components/AppLauncherButton.tsx
function Vn({ hubPath: e = "/", label: t = "Apps", onClick: n }) {
	let r = v();
	return /* @__PURE__ */ q(w, {
		type: "text",
		icon: /* @__PURE__ */ q(ue, {}),
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
function Hn(e) {
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
function Un(e) {
	return e.length === 0 ? null : e.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function Wn(e) {
	return new Map(e.map((e, t) => [e.field, t + 1]));
}
//#endregion
//#region src/crud/context/ListContext.tsx
var Gn = t(null);
function Kn({ children: e, toggleSort: t, sort: n }) {
	let [r, i] = d([]), o = l(() => new Set(n.map((e) => e.field)), [n]), s = l(() => new Map(n.map((e) => [e.field, e.order])), [n]), c = l(() => Wn(n), [n]), u = a((e) => (i((t) => {
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
	return /* @__PURE__ */ q(Gn.Provider, {
		value: f,
		children: e
	});
}
function qn() {
	let e = o(Gn);
	if (!e) throw Error("Column components must be used within ResourceList");
	return e;
}
function Jn(e) {
	let { registerColumn: t } = qn();
	s(() => t(e), [t, e]);
}
//#endregion
//#region src/crud/utils/useDebouncedValue.ts
function Yn(e, t) {
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
var Xn = 300;
function Zn(e) {
	if (!(e == null || e === "")) return String(e);
}
function Qn({ value: e, onChange: t, placeholder: n, debounceMs: r }) {
	let [i, a] = d(() => e ?? ""), o = Yn(i, r);
	return s(() => {
		a(e ?? "");
	}, [e]), s(() => {
		if (r <= 0 || o !== i) return;
		let n = Zn(o);
		n !== Zn(e) && t(n);
	}, [
		o,
		i,
		r,
		t,
		e
	]), /* @__PURE__ */ q(P, {
		allowClear: !0,
		placeholder: n,
		value: i,
		onChange: (e) => {
			let n = e.target.value;
			a(n), (r <= 0 || n === "") && t(Zn(n));
		},
		style: { minWidth: 160 }
	});
}
function $n({ source: e, label: t, placeholder: n, debounceMs: r }) {
	let i = nr(), a = r ?? i?.textFilterDebounceMs ?? 300;
	return rr(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: r, onChange: i }) => /* @__PURE__ */ q(Qn, {
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
var er = t(null);
function tr({ children: e, values: t, setFilterValue: n, textFilterDebounceMs: r = 300 }) {
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
	return /* @__PURE__ */ q(er.Provider, {
		value: c,
		children: e
	});
}
function nr() {
	return o(er);
}
function rr(e) {
	let t = nr()?.registerFilter;
	s(() => {
		if (t) return t(e);
	}, [t, e]);
}
//#endregion
//#region src/crud/context/FormContext.tsx
var ir = t(null);
function ar({ children: e, resource: t, isNew: n, disabled: r }) {
	return /* @__PURE__ */ q(ir.Provider, {
		value: {
			resource: t,
			isNew: n,
			disabled: r
		},
		children: e
	});
}
function or() {
	return o(ir);
}
//#endregion
//#region src/crud/context/FormSectionContext.tsx
var sr = t(null);
function cr({ sourcesRef: e, children: t }) {
	return /* @__PURE__ */ q(sr.Provider, {
		value: e,
		children: t
	});
}
function lr() {
	return o(sr);
}
//#endregion
//#region src/crud/context/PayloadFieldsContext.tsx
var ur = t(null);
function dr({ children: e, fieldsRef: t }) {
	return /* @__PURE__ */ q(ur.Provider, {
		value: t,
		children: e
	});
}
function fr() {
	return o(ur);
}
function pr(e, t = !0) {
	let n = fr();
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
function mr(e, t = !0) {
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
//#endregion
//#region src/crud/context/InlineFieldsRegistry.tsx
var hr = t(null);
function gr({ children: e, registryRef: t }) {
	return /* @__PURE__ */ q(hr.Provider, {
		value: t,
		children: e
	});
}
function _r() {
	return o(hr);
}
function vr(e, t, n, r, i = !0) {
	let a = _r();
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
function yr({ errors: e }) {
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
function br(e, t) {
	let n = t.split("."), r = e;
	for (let e of n) {
		if (typeof r != "object" || !r) return;
		r = r[e];
	}
	return r;
}
//#endregion
//#region src/crud/utils/setFormValue.ts
function xr(e, t, n) {
	let r = t.split("."), i = e;
	for (let e = 0; e < r.length - 1; e++) {
		let t = r[e], n = i[t];
		(typeof n != "object" || !n || Array.isArray(n)) && (i[t] = {}), i = i[t];
	}
	i[r[r.length - 1]] = n;
}
//#endregion
//#region src/crud/utils/buildFormPayload.ts
function Sr(e, t) {
	if (t.length === 0) return { ...e };
	let n = {};
	for (let r of t) {
		let t = br(e, r);
		t !== void 0 && xr(n, r, t);
	}
	return n;
}
//#endregion
//#region src/crud/utils/buildInlineRowsPayload.ts
function Cr(e, t, n) {
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
function wr(e) {
	return e instanceof Blob ? !0 : Array.isArray(e) ? e.some(wr) : e && typeof e == "object" ? Object.values(e).some(wr) : !1;
}
//#endregion
//#region src/crud/utils/uploadReferenceUtils.ts
function Tr(e) {
	return /^https?:\/\//i.test(e) || e.startsWith("/media/");
}
function Er(e, t) {
	if (!t) return e;
	if (typeof e == "string") return Tr(e) ? void 0 : e;
	if (Array.isArray(e)) return e.map((e) => Er(e, t)).filter((e) => e !== void 0);
	if (e && typeof e == "object" && !(e instanceof Blob)) {
		let n = {};
		for (let [r, i] of Object.entries(e)) {
			let e = Er(i, t);
			e !== void 0 && (n[r] = e);
		}
		return n;
	}
	return e;
}
function Dr(e, t = !0) {
	return Er(e, t);
}
//#endregion
//#region src/crud/utils/toFormData.ts
function Or(e, t, n, r) {
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
			if (r.skipExistingUploadUrls && Tr(n)) return;
			e.append(t, n);
			return;
		}
		if (Array.isArray(n)) {
			n.forEach((n, i) => {
				Or(e, `${t}[${i}]`, n, r);
			});
			return;
		}
		if (typeof n == "object") {
			for (let [i, a] of Object.entries(n)) Or(e, `${t}[${i}]`, a, r);
			return;
		}
		e.append(t, String(n));
	}
}
function kr(e, t) {
	let n = { skipExistingUploadUrls: t?.skipExistingUploadUrls ?? !0 }, r = new FormData();
	for (let [t, i] of Object.entries(e)) Or(r, t, i, n);
	return r;
}
//#endregion
//#region src/crud/utils/prepareFormSubmitBody.ts
function Ar(e, t) {
	let n = t?.skipExistingUploadUrls ?? !0;
	return wr(e) ? kr(e, t) : Dr(e, n);
}
//#endregion
//#region src/crud/utils/buildResourceFormSubmitBody.ts
function jr(e, t, n, r) {
	let i = Sr(e, t);
	if (n) for (let t of n) {
		let n = e[t.field], r = t.payloadKey ?? t.field;
		i[r] = Cr(n, t.sources, { transformRows: t.transformRows });
	}
	return Ar(i, r);
}
//#endregion
//#region src/crud/utils/formErrors.ts
function Mr(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function Nr(e) {
	return Array.isArray(e) ? e.join(", ") : e;
}
function Pr(e, t, n) {
	if (t.has(e)) return !0;
	let r = e.match(/^([^.]+)\.(\d+)\.([^.]+)$/);
	if (!r) return !1;
	let [, i, , a] = r;
	return n.get(i)?.sources.includes(a) ?? !1;
}
function Fr(e, t, n) {
	let r = {}, i = [...Mr(e.global)];
	for (let [a, o] of Object.entries(e.fields ?? {})) Pr(a, t, n) ? r[a] = o : i.push(Nr(o));
	return {
		fieldErrors: r,
		globalErrors: i
	};
}
function Ir(e, t) {
	for (let [n, r] of Object.entries(t)) e.setError(n, {
		type: "server",
		message: Nr(r)
	});
}
function Lr(e) {
	let t = ln(e);
	if (t && !/application\/json/i.test(t)) return `non-JSON response (Content-Type: ${t})`;
}
async function Rr(e, t, n, r, i) {
	let a = await fn(n);
	if (a != null) {
		let n = e.parseFormError?.({ body: a }, r);
		if (n) {
			let e = new Set(i.payloadFields), r = /* @__PURE__ */ new Map();
			for (let e of i.inlineRegistry) r.set(e.field, e);
			let { fieldErrors: a, globalErrors: o } = Fr(n, e, r);
			if (Object.keys(a).length || o.length) return Ir(t, a), {
				handled: !0,
				globalErrors: o
			};
		}
		return {
			handled: !0,
			globalErrors: [sn(a)]
		};
	}
	return cn(n) == null ? {
		handled: !1,
		globalErrors: []
	} : {
		handled: !0,
		globalErrors: [sn(null, { hint: Lr(n) })]
	};
}
//#endregion
//#region src/crud/utils/useAbortableEffect.ts
function zr(e, t) {
	s(() => {
		let t = new AbortController();
		return e(t.signal), () => t.abort();
	}, t);
}
//#endregion
//#region src/crud/utils/useFormRecord.ts
function Br({ dp: e, resource: t, id: n, isNew: r, form: i, message: o, defaultValues: s, enabled: c = !0 }) {
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
			$t(e) || o.error(e instanceof Error ? e.message : "Load failed");
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
	return zr((e) => {
		if (c) return m(e);
	}, [c, m]), {
		loading: l,
		formVersion: f
	};
}
function Vr({ dp: e, resource: t, id: n, isNew: r, form: i, message: o, payloadFieldsRef: s, inlineRegistryRef: c, setGlobalErrors: l, onSuccess: u }) {
	let [f, p] = d(!1);
	return {
		onSubmit: a(async (a) => {
			l([]), p(!0);
			try {
				let i = jr(a, Array.from(s.current), c.current.values()), l;
				if (r) l = (await e.create(t, i)).data, o.success("Created");
				else if (n) l = (await e.update(t, {
					id: n,
					data: i
				})).data, o.success("Updated");
				else return;
				u?.(l);
			} catch (n) {
				let { handled: a, globalErrors: u } = await Rr(e, i, n, {
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
function Hr({ resource: e, id: t, children: r, defaultValues: i, enabled: a = !0, canSave: o = !0, onCancel: s, cancelHref: c, onSuccess: l, loadingMode: p = "overlay" }) {
	let m = t === "new" || !t, h = m ? void 0 : t, g = Yt(), { message: _ } = S.useApp(), v = u(/* @__PURE__ */ new Set()), y = u(/* @__PURE__ */ new Map()), [b, x] = d([]), C = je({ defaultValues: i }), { loading: T, formVersion: E } = Br({
		dp: g,
		resource: e,
		id: h,
		isNew: m,
		form: C,
		message: _,
		defaultValues: i,
		enabled: a
	}), { onSubmit: D, saving: O } = Vr({
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
	}, j = /* @__PURE__ */ q(w, {
		disabled: k,
		onClick: c ? void 0 : s,
		children: "Cancel"
	}), ee = /* @__PURE__ */ q(ar, {
		resource: e,
		isNew: m,
		children: /* @__PURE__ */ q(dr, {
			fieldsRef: v,
			children: /* @__PURE__ */ q(gr, {
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
						children: /* @__PURE__ */ q(oe, {})
					}) : null, /* @__PURE__ */ n(ke, {
						...C,
						key: E
					}, /* @__PURE__ */ J(M, {
						layout: "vertical",
						onFinish: A,
						style: p === "overlay" ? {
							opacity: k ? .4 : 1,
							pointerEvents: k ? "none" : void 0
						} : void 0,
						children: [
							/* @__PURE__ */ q(yr, { errors: b }),
							r,
							/* @__PURE__ */ q(M.Item, {
								style: {
									marginTop: 16,
									marginBottom: 0
								},
								children: /* @__PURE__ */ J(B, { children: [/* @__PURE__ */ q(w, {
									type: "primary",
									htmlType: "submit",
									loading: O,
									disabled: k || !o,
									children: "Save"
								}), c ? /* @__PURE__ */ q(f, {
									to: c,
									children: j
								}) : j] })
							})
						]
					}))]
				})
			})
		})
	});
	return T && !O && p === "replace" ? /* @__PURE__ */ q(oe, {}) : ee;
}
//#endregion
//#region src/crud/ResourceFormModal.tsx
function Ur({ resource: e, editId: t, onClose: n, children: r, title: i, permissions: a, defaultValues: o, width: s = 560, onSuccess: c }) {
	let l = t === "new", u = t != null, d = X(), f = i ?? (l ? `New ${e}` : `Edit ${e}`), p = a ? Z(d, a, l ? "add" : "change") : !0;
	return /* @__PURE__ */ q(ne, {
		open: u,
		title: f,
		onCancel: n,
		footer: null,
		destroyOnHidden: !0,
		width: s,
		maskClosable: !1,
		children: /* @__PURE__ */ q(S, { children: /* @__PURE__ */ q(Hr, {
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
function Wr({ selectedCount: e, total: t, allPageSelected: n, allMatchingSelected: r, onSelectAllMatching: i, onClearSelection: o, actions: s, onExecute: c, selectedIds: u, running: f = !1 }) {
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
	return /* @__PURE__ */ J(B, {
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
			/* @__PURE__ */ q(z, {
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
var Gr = new Set([
	"page",
	"perPage",
	"sort",
	"create",
	"edit"
]), Kr = 1, qr = 10;
function Jr(e) {
	if (e.includes(",")) {
		let t = e.split(",").map((e) => e.trim()), n = t.map(Number);
		return n.every((e) => Number.isFinite(e)) ? n : t;
	}
	let t = Number(e);
	return e !== "" && Number.isFinite(t) && String(t) === e ? t : e === "true" ? !0 : e === "false" ? !1 : e;
}
function Yr(e) {
	return e == null || e === "" ? null : Array.isArray(e) ? e.length === 0 ? null : e.map(String).join(",") : String(e);
}
function Xr(e) {
	let [t, n] = b(), r = l(() => {
		let n = t.get("page"), r = t.get("perPage"), i = n ? Math.max(1, Number(n) || Kr) : Kr, a = r ? Math.max(1, Number(r) || qr) : qr, o = t.getAll("sort"), s = o.length > 0 ? o.flatMap((e) => Hn(e)) : Hn(t.get("sort")), c = { ...e };
		return t.forEach((e, n) => {
			if (Gr.has(n)) return;
			let r = c[n];
			r === void 0 ? t.getAll(n).length > 1 ? c[n] = t.getAll(n).map(Jr) : c[n] = Jr(e) : c[n] = [...Array.isArray(r) ? r : [r], Jr(e)];
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
				e === qr ? t.delete("perPage") : t.set("perPage", String(e)), t.delete("page");
			});
		},
		setSort: (e) => {
			i((t) => {
				t.delete("sort");
				let n = Un(e);
				n && t.set("sort", n);
			});
		},
		toggleSort: (e) => {
			i((t) => {
				let n = t.getAll("sort").flatMap((e) => Hn(e)), r = n.findIndex((t) => t.field === e), i;
				i = r < 0 ? [...n, {
					field: e,
					order: "ASC"
				}] : n[r].order === "ASC" ? n.map((e, t) => t === r ? {
					...e,
					order: "DESC"
				} : e) : n.filter((e, t) => t !== r), t.delete("sort");
				let a = Un(i);
				a && t.set("sort", a);
			});
		},
		setFilter: (e, t) => {
			i((n) => {
				n.delete(e);
				let r = Yr(t);
				r != null && n.set(e, r), n.delete("page");
			});
		},
		setFilters: (e) => {
			i((t) => {
				for (let e of [...t.keys()]) Gr.has(e) || t.delete(e);
				for (let [n, r] of Object.entries(e)) {
					let e = Yr(r);
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
var Zr = t(null);
function Qr() {
	return o(Zr);
}
function $r(e) {
	return e == null || e === "" ? "—" : String(e);
}
function ei(e, t) {
	if (e.length === 0 || !t.showEdit && !t.showQuickEdit) return e;
	let [n, ...r] = e, i = n.render;
	return [{
		...n,
		render: (e, n, r) => {
			let a = i ? i(e, n, r) : $r(e);
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
function ti({ resource: e, title: t, pathPrefix: n, newPath: r, editMode: i = "page", formChildren: o, actions: s, rowActions: p, headerExtra: m, bulkActions: h, bulkDelete: g = !0, bulkActionsEnabled: _ = !0, permissions: v, queryState: y, queryActions: b }) {
	let x = Yt(), C = X(), { message: E, modal: D } = S.useApp(), { token: O } = G.useToken(), { columns: k, sortOrders: A, sortPriorities: j } = qn(), M = u(null), [ee, N] = d(), [P, F] = d(!1), [I, te] = d([]), [L, ne] = d(0), [ie, R] = d(() => /* @__PURE__ */ new Set()), [ae, z] = d(!1), oe = r ?? `${n}/new`, V = Z(C, v, "add"), se = Z(C, v, "change"), H = Z(C, v, "delete"), le = se && (i === "page" || i === "both") && s?.edit !== !1, U = se && (i === "modal" || i === "both") && s?.quickEdit !== !1, ue = H && s?.delete !== !1, de = le || U || ue || p, me = a(() => {
		R(/* @__PURE__ */ new Set());
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
	]), ge = he.length > 0, _e = ie.size;
	c(() => {
		let e = M.current;
		if (!e) return;
		let t = e.closest(".ding-admin-scroll");
		t?.classList.add("ding-admin-resource-list-scroll");
		let n = () => {
			if (e.clientHeight <= 0) return;
			let t = e.querySelector(".ding-admin-resource-list-pagination"), n = e.querySelector(".ant-table-header"), r = t?.offsetHeight ?? 0, i = t ? parseFloat(getComputedStyle(t).marginTop) + parseFloat(getComputedStyle(t).marginBottom) : 0, a = n?.offsetHeight ?? 0, o = e.querySelector(".ant-table-body"), s = o && o.scrollWidth > o.clientWidth ? o.offsetHeight - o.clientHeight : 0, c = Math.max(120, Math.floor(e.clientHeight - a - r - i - s - 8));
			N((e) => e === c ? e : c);
		};
		n();
		let r = new ResizeObserver(() => n());
		return r.observe(e), window.addEventListener("resize", n), () => {
			t?.classList.remove("ding-admin-resource-list-scroll"), r.disconnect(), window.removeEventListener("resize", n);
		};
	}, [
		ge,
		_e,
		L,
		P
	]);
	let ve = I.length > 0 && I.every((e) => ie.has(e.id)), ye = L > 0 && _e >= L, be = l(() => I.filter((e) => ie.has(e.id)).map((e) => e.id), [I, ie]), xe = a((e) => {
		R((t) => {
			let n = new Set(t), r = I.map((e) => e.id);
			for (let t of r) e.includes(t) || n.delete(t);
			for (let t of e) n.add(t);
			return n;
		});
	}, [I]), Se = a(async () => {
		if (!(L <= 0)) {
			z(!0);
			try {
				let t = y.sort.length === 0 ? void 0 : y.sort.length === 1 ? y.sort[0] : y.sort, n = await x.getList(e, {
					pagination: {
						page: 1,
						perPage: L
					},
					sort: t,
					filter: y.filter
				});
				R(new Set(n.data.map((e) => e.id)));
			} catch (e) {
				E.error(e instanceof Error ? e.message : "Load failed");
			} finally {
				z(!1);
			}
		}
	}, [
		x,
		e,
		L,
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
		F(!0);
		try {
			let n = await x.getList(e, {
				...we,
				signal: t
			});
			if (t?.aborted) return;
			te(n.data), ne(n.total);
		} catch (e) {
			$t(e) || E.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			t?.aborted || F(!1);
		}
	}, [
		x,
		e,
		we,
		E
	]);
	zr((e) => Y(e), [Y]);
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
		z(!0);
		try {
			await e.execute(t, Te);
		} catch (e) {
			E.error(e instanceof Error ? e.message : "Action failed");
		} finally {
			z(!1);
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
				let n = A.get(e.source), r = j.get(e.source), i = n === "ASC" ? "ascend" : n === "DESC" ? "descend" : void 0, a = i == null ? void 0 : /* @__PURE__ */ J("span", {
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
					}), q(i === "ascend" ? pe : fe, { style: { fontSize: 11 } })]
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
		if (!de) return ei(e, {
			showEdit: le,
			showQuickEdit: U,
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
			render: (e, r) => /* @__PURE__ */ J(B, {
				size: "small",
				wrap: !0,
				children: [
					le ? /* @__PURE__ */ q(f, {
						to: `${n}/${String(r.id)}`,
						children: "Edit"
					}) : null,
					U ? /* @__PURE__ */ q(w, {
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
		return ei([...e, r], {
			showEdit: le,
			showQuickEdit: U,
			pathPrefix: n,
			openEditModal: b.openEditModal
		});
	}, [
		k,
		de,
		le,
		U,
		ue,
		i,
		n,
		De,
		A,
		j,
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
		extra: m || V ? /* @__PURE__ */ J(B, { children: [m, V ? i === "modal" || i === "both" ? /* @__PURE__ */ J(K, { children: [i === "both" ? /* @__PURE__ */ q(f, {
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
		children: [ge ? /* @__PURE__ */ q(Wr, {
			selectedCount: _e,
			total: L,
			allPageSelected: ve,
			allMatchingSelected: ye,
			onSelectAllMatching: () => void Se(),
			onClearSelection: me,
			actions: he,
			onExecute: Ee,
			selectedIds: [...ie],
			running: ae || P
		}) : null, /* @__PURE__ */ J("div", {
			ref: M,
			className: "ding-admin-resource-list-table",
			style: {
				"--ding-scroll-thumb": O.colorTextQuaternary,
				"--ding-scroll-thumb-hover": O.colorTextTertiary
			},
			children: [/* @__PURE__ */ q(ce, {
				rowKey: "id",
				loading: P,
				columns: Oe,
				dataSource: I,
				scroll: {
					x: "max-content",
					...ee ? { y: ee } : {}
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
					total: L,
					showSizeChanger: !0,
					onChange: ke
				})
			})]
		})]
	}), Ae ? /* @__PURE__ */ q(Ur, {
		resource: e,
		editId: y.createModal ? "new" : y.editId,
		onClose: () => {
			b.closeModal(), Y();
		},
		children: o
	}) : null] });
}
function ni({ resource: e, title: t, pathPrefix: n, newPath: r, staticFilter: i, textFilterDebounceMs: o, editMode: s = "page", syncQueryParams: c = !0, children: u, formChildren: d, actions: f, rowActions: p, headerExtra: m, bulkActions: h, bulkDelete: g, bulkActionsEnabled: _, permissions: v }) {
	let [y, b] = Xr(i), x = l(() => {
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
	return /* @__PURE__ */ q(Zr.Provider, {
		value: C,
		children: /* @__PURE__ */ q(tr, {
			values: x,
			setFilterValue: S,
			textFilterDebounceMs: o,
			children: /* @__PURE__ */ q(Kn, {
				toggleSort: b.toggleSort,
				sort: y.sort,
				children: /* @__PURE__ */ J("div", {
					className: "ding-admin-resource-list-root",
					children: [u, /* @__PURE__ */ q(ti, {
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
function ri() {
	let e = nr();
	return !e || e.filters.length === 0 ? null : /* @__PURE__ */ q(B, {
		wrap: !0,
		size: "middle",
		style: { marginBottom: 16 },
		children: e.filters.map((t) => /* @__PURE__ */ J(B, {
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
function ii({ children: e }) {
	return /* @__PURE__ */ J(K, { children: [e, /* @__PURE__ */ q(ri, {})] });
}
//#endregion
//#region src/crud/ResourceForm.tsx
function ai({ resource: e, title: t, listPath: n, children: r, defaultValues: i, onSaved: a, stayOnPage: o, permissions: c }) {
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
		title: /* @__PURE__ */ J(B, { children: [/* @__PURE__ */ J(f, {
			to: n,
			style: { color: m.colorText },
			children: [/* @__PURE__ */ q(de, {}), " Back"]
		}), /* @__PURE__ */ q(W.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		})] }),
		children: /* @__PURE__ */ q(Hr, {
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
function oi(e, t, n) {
	return `${e}.${t}.${n}`;
}
//#endregion
//#region src/crud/InlineFormSet.tsx
function si(e, t) {
	let n = {};
	for (let r of e) n[r] = t?.[r] ?? void 0;
	return n;
}
function ci(e, t, n) {
	let { control: r } = Me(), { fields: i, append: a, remove: o } = Ae({
		control: r,
		name: e,
		keyName: "rowKey"
	});
	return {
		fields: i,
		remove: o,
		appendEmpty: () => a(si(t, n))
	};
}
function li({ field: e, label: t, payloadKey: n, transformRows: r, columns: i, defaultRow: a }) {
	let o = l(() => i.map((e) => e.source), [i]), { fields: s, remove: c, appendEmpty: u } = ci(e, o, a);
	pr(e), vr(e, o, n, r);
	let d = l(() => i.map((t) => ({
		title: t.label ?? t.source,
		key: t.source,
		width: t.width,
		onHeaderCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		onCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		render: (n, r, i) => t.cell({
			name: oi(e, i, t.source),
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
			/* @__PURE__ */ q(ce, {
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
function ui({ field: e, label: t, payloadKey: n, transformRows: r, sources: i, renderRow: a, getCardTitle: o, footer: s, defaultRow: c }) {
	let { fields: l, remove: u, appendEmpty: d } = ci(e, i, c);
	return pr(e), vr(e, i, n, r), /* @__PURE__ */ J("div", {
		style: { marginTop: 24 },
		children: [
			/* @__PURE__ */ q(W.Title, {
				level: 5,
				children: t ?? "Related items"
			}),
			/* @__PURE__ */ q(B, {
				orientation: "vertical",
				size: "middle",
				style: { width: "100%" },
				children: l.map((t, n) => {
					let r = {
						field: e,
						index: n,
						name: (t) => oi(e, n, t)
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
function di(e, t, n) {
	for (let r of e) if (t(r, n).invalid) return !0;
	return !1;
}
function fi(e) {
	let t = u([]);
	for (; t.current.length < e;) t.current.push({ current: /* @__PURE__ */ new Set() });
	return t.current.length > e && (t.current.length = e), t.current;
}
function pi(e, t) {
	let { control: n, getFieldState: r, setFocus: i } = Me(), a = Ne({ control: n }), o = u(0), c = u(0);
	s(() => {
		if (a.submitCount === 0) return;
		let n = Object.keys(a.errors).length, s = a.submitCount !== o.current, l = !s && n > 0 && c.current === 0;
		if (o.current = a.submitCount, c.current = n, !s && !l || n === 0) return;
		let u = e.findIndex((e) => di(e.current, r, a));
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
function mi(e) {
	return null;
}
function hi(e) {
	return i(e) && e.type === mi;
}
function gi({ children: t, defaultActiveKey: n, activeKey: r, onChange: i, ...o }) {
	let { token: s } = G.useToken(), c = l(() => e.toArray(t).filter(hi).map((e, t) => ({
		key: e.key ?? String(t),
		label: e.props.label,
		disabled: e.props.disabled,
		children: e.props.children
	})), [t]), u = fi(c.length), f = r !== void 0, [p, m] = d(() => n ?? c[0]?.key ?? "0"), h = f ? r : p, g = a((e) => {
		f || m(e), i?.(e);
	}, [f, i]);
	pi(u, a((e) => {
		let t = c[e]?.key;
		t != null && g(t);
	}, [g, c]));
	let { control: _, getFieldState: v } = Me(), y = Ne({ control: _ });
	return /* @__PURE__ */ q(H, {
		destroyOnHidden: !1,
		items: l(() => c.map((e, t) => {
			let n = di(u[t].current, v, y);
			return {
				key: e.key,
				label: n ? /* @__PURE__ */ q("span", {
					style: { color: s.colorError },
					children: e.label
				}) : e.label,
				disabled: e.disabled,
				children: /* @__PURE__ */ q(cr, {
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
function _i(e) {
	return null;
}
function vi(e) {
	return i(e) && e.type === _i;
}
function yi({ children: t, initialStep: n = 0, showNavigation: r = !0, allowStepSelect: i = !1, stepsStyle: o, navigationStyle: s, size: c, direction: u, type: f, status: p }) {
	let m = l(() => e.toArray(t).filter(vi), [t]), h = fi(m.length), [g, _] = d(n), v = m.length - 1;
	pi(h, _);
	let { control: y, getFieldState: b } = Me(), x = Ne({ control: y }), S = l(() => m.map((e, t) => {
		let n = di(h[t].current, b, x);
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
		/* @__PURE__ */ q(V, {
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
			children: /* @__PURE__ */ q(cr, {
				sourcesRef: h[t],
				children: e.props.children
			})
		}, e.key ?? String(t))),
		r && m.length > 1 ? /* @__PURE__ */ J(B, {
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
	let s = t ?? e, c = !s.includes("."), { control: l } = Me(), u = or(), d = a ? void 0 : n ?? e, f = n ?? e;
	return pr(e, c), mr(e, c), /* @__PURE__ */ q(Oe, {
		name: s,
		control: l,
		rules: {
			required: r ? `${f} is required` : !1,
			...i
		},
		render: ({ field: e, fieldState: t }) => /* @__PURE__ */ q(M.Item, {
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
function bi({ source: e, name: t, label: n, required: r, rules: i, placeholder: a, inputStyle: o, hideLabel: s }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: s,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(P, {
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
function xi({ source: e, name: t, label: n, required: r, rules: i, placeholder: a, inputStyle: o, hideLabel: s, rows: c = 4, maxLength: l, showCount: u, autoSize: d }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: s,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(P.TextArea, {
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
function Si({ source: e, name: t, label: n, required: r, rules: i, min: a, max: o, step: s, inputStyle: c, hideLabel: l }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: l,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(F, {
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
function Ci({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, disabled: o }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ q(se, {
			checked: !!e,
			onChange: t,
			disabled: n || o
		})
	});
}
//#endregion
//#region src/crud/utils/parseDayjsValue.ts
var wi = /* @__PURE__ */ We((/* @__PURE__ */ He(((e, t) => {
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
Fe.extend(wi.default);
function Ti(e, t) {
	if (e == null || e === "") return null;
	if (Fe.isDayjs(e)) return e;
	let n = Fe(String(e), t, !0);
	return n.isValid() ? n : Fe(String(e)).isValid() ? Fe(String(e)) : null;
}
//#endregion
//#region src/crud/fields/DateField.tsx
var Ei = "YYYY-MM-DD", Di = `${Ei} HH:mm:ss`, Oi = [
	Ei,
	Di,
	"YYYY-MM-DDTHH:mm:ss",
	"YYYY-MM-DDTHH:mm:ssZ"
];
function ki({ source: e, name: t, label: n, required: r, rules: i, showTime: a, hideLabel: o }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(O, {
			value: Ti(e, a ? [...Oi, Di] : Oi),
			onChange: (e) => t(e ? e.format(a ? Di : Ei) : null),
			onBlur: n,
			showTime: a,
			disabled: r,
			format: a ? Di : Ei,
			style: { width: "100%" }
		})
	});
}
//#endregion
//#region src/crud/fields/DateTimeField.tsx
function Ai(e) {
	return /* @__PURE__ */ q(ki, {
		showTime: !0,
		...e
	});
}
//#endregion
//#region src/crud/fields/TimeField.tsx
var ji = "HH:mm:ss", Mi = [
	ji,
	"HH:mm",
	"H:mm:ss",
	"H:mm"
];
function Ni({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, format: o = ji }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(le, {
			value: Ti(e, Mi),
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
function Pi({ source: e, name: t, label: n, required: r, rules: i, choices: a, mode: o, allowClear: s, hideLabel: c }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: c,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ q(z, {
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
function Fi({ source: e, name: t, label: n, required: r, rules: i, autoComplete: a, hideLabel: o }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(P.Password, {
			value: e,
			onChange: (e) => t(e.target.value),
			onBlur: n,
			disabled: r,
			autoComplete: a
		})
	});
}
function Ii({ source: e, name: t, label: n, required: r, rules: i, confirmSource: a, confirmLabel: o = "Confirm password", autoComplete: s = "new-password", hideLabel: c }) {
	let l = Pe({
		name: t ?? e,
		disabled: !a
	});
	return a ? /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ q(Fi, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		autoComplete: s,
		hideLabel: c
	}), /* @__PURE__ */ q(Fi, {
		source: a,
		label: o,
		required: r,
		autoComplete: s,
		hideLabel: c,
		rules: { validate: (e) => !l || e === l || "Passwords do not match" }
	})] }) : /* @__PURE__ */ q(Fi, {
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
function Li(e, t) {
	return typeof e == "object" && !!e && !Array.isArray(e) && t in e;
}
function Ri(e, t) {
	if (!(e == null || e === "")) {
		if (Li(e, t)) {
			let n = e[t];
			return typeof n == "string" || typeof n == "number" ? n : void 0;
		}
		if (typeof e == "string" || typeof e == "number") return e;
	}
}
function zi(e, t) {
	return Array.isArray(e) ? e.map((e) => Ri(e, t)).filter((e) => e != null) : [];
}
function Bi(e, t) {
	return e == null ? [] : (Array.isArray(e) ? e : [e]).filter((e) => e != null && e !== "").map((e) => Li(e, t) ? e[t] : e);
}
function Vi(e, t, n) {
	let r = [];
	if (t != null && (Array.isArray(t) ? r.push(...t.filter((e) => Li(e, n))) : Li(t, n) && r.push(t)), e == null) return r;
	let i = Array.isArray(e) ? e : [e];
	for (let e of i) Li(e, n) && r.push(e);
	return r;
}
function Hi(e, t) {
	return typeof t == "function" ? t(e) : String(e[t] ?? "");
}
function Ui(e, t, n) {
	return e.map((e) => ({
		label: Hi(e, t),
		value: e[n],
		record: e
	}));
}
function Wi(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) n.set(t.value, t);
	for (let e of t) n.set(e.value, e);
	return Array.from(n.values());
}
function Gi(e = {}) {
	let t = e.popupMatchSelectWidth ?? !1;
	return t === !1 ? {
		popupMatchSelectWidth: !1,
		styles: { popup: { root: { minWidth: e.popupMinWidth ?? 360 } } }
	} : { popupMatchSelectWidth: t };
}
//#endregion
//#region src/crud/utils/referenceSelectNotFoundContent.tsx
function Ki(e) {
	return e ? /* @__PURE__ */ q(oe, { size: "small" }) : void 0;
}
//#endregion
//#region src/crud/utils/useChoices.ts
var qi = /* @__PURE__ */ new Map(), Ji = /* @__PURE__ */ new Map();
function Yi(e, t) {
	return typeof e == "function" ? `fn:${t ?? ""}` : Array.isArray(e) ? `static:${e.length}` : `res:${e.resource}:${JSON.stringify(e.filter ?? {})}:${t ?? ""}`;
}
async function Xi(e, t, n, r, i) {
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
		label: Hi(e, n),
		value: e[r],
		record: e
	}));
}
function Zi(e, t, n, r, i, a) {
	let o = Yi(e, i);
	if (a) {
		let e = qi.get(o);
		if (e && !i) return Promise.resolve(e);
	}
	let s = Ji.get(o);
	if (s) return s;
	let c = Xi(e, t, n, r, i).then((e) => (a && !i && qi.set(o, e), e)).finally(() => {
		Ji.delete(o);
	});
	return Ji.set(o, c), c;
}
function Qi(e, t, n = "name", r = "id", i, o = {}) {
	let { lazy: c = !1, active: u = !1, selectedValues: f, selectedRecords: p, fetchSelected: m = !0, cache: h } = o, g = h ?? !c, _ = Yt(), v = l(() => {
		if (e) return e;
		if (t) return {
			resource: t,
			filter: i ? { q: i } : void 0
		};
	}, [
		e,
		t,
		i
	]), y = v ? Yi(v, i) : void 0, b = l(() => Bi(f, r), [f, r]), x = l(() => Ui(Vi(f, p, r), n, r), [
		f,
		p,
		n,
		r
	]), S = !!(v && (!c || u || Array.isArray(v))), [C, w] = d(() => x.length ? x : !y || i || c || !g ? [] : qi.get(y) ?? []), [T, E] = d(() => S ? !g || !y || i ? !!v : !qi.has(y) : !1);
	s(() => {
		x.length && w((e) => Wi(e, x));
	}, [x]);
	let D = a(async () => {
		if (!v || !S) {
			v || w(x), E(!1);
			return;
		}
		if (g) {
			let e = Yi(v, i), t = qi.get(e);
			if (t && !i) {
				w(Wi(x, t)), E(!1);
				return;
			}
		}
		E(!0), c && w(x);
		try {
			w(Wi(x, await Zi(v, _, n, r, i, g)));
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
					label: Hi(e, n),
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
				return t.length ? Wi(e, t) : e;
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
function $i({ reference: e, referenceForm: t, referencePermissions: n, referenceTitle: r, referenceDefaultValues: i, referenceModalWidth: a, selectedId: o, disabled: s, onCreated: c, onUpdated: l }) {
	let u = X(), f = r ?? e, p = !!(e && t) && Z(u, n, "add"), m = !!(e && t && o != null && o !== "") && Z(u, n, "change"), [h, g] = d(null);
	return !p && !m ? null : /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ J(B, {
		size: 4,
		children: [p ? /* @__PURE__ */ q(U, {
			title: `Add ${f ?? "record"}`,
			children: /* @__PURE__ */ q(w, {
				type: "default",
				icon: /* @__PURE__ */ q(Ce, {}),
				disabled: s,
				"aria-label": `Add ${f ?? "record"}`,
				onClick: () => g("new")
			})
		}) : null, m ? /* @__PURE__ */ q(U, {
			title: `Edit ${f ?? "record"}`,
			children: /* @__PURE__ */ q(w, {
				type: "default",
				icon: /* @__PURE__ */ q(_e, {}),
				disabled: s,
				"aria-label": `Edit ${f ?? "record"}`,
				onClick: () => g(String(o))
			})
		}) : null]
	}), e && t && h != null ? /* @__PURE__ */ q(Ur, {
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
function ea({ reference: e, choices: t, optionLabel: n = "name", optionValue: r = "id", search: i, allowClear: a, disabled: o, inputStyle: s, onValueChange: c, lazy: u = !0, fetchSelected: f = !0, value: p, onChange: m, fieldName: h, selectedRecords: g, referenceForm: _, referencePermissions: v, referenceTitle: y, referenceDefaultValues: b, referenceModalWidth: x, referenceActions: S = !0, popupMatchSelectWidth: C, popupMinWidth: w }) {
	let [T, E] = d(), [D, O] = d(!1), k = D || !!T, A = Ri(p, r), { options: j, loading: M, optionForValue: ee, reload: N } = Qi(t, e, n, r, i ? T : void 0, {
		lazy: u,
		active: k,
		selectedValues: p,
		selectedRecords: g,
		fetchSelected: f
	}), P = l(() => j.map((e) => ({
		label: e.label,
		value: e.value
	})), [j]), F = (e) => {
		let t = e[r];
		m(t), c?.(t, {
			label: Hi(e, n),
			value: t,
			record: e
		}, { name: h }), N();
	}, I = /* @__PURE__ */ q(z, {
		...Gi({
			popupMatchSelectWidth: C,
			popupMinWidth: w
		}),
		value: A,
		onChange: (e) => {
			m(e), c?.(e, ee(e), { name: h });
		},
		options: P,
		loading: M,
		notFoundContent: Ki(M),
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
			children: I
		}), /* @__PURE__ */ q($i, {
			reference: e,
			referenceForm: _,
			referencePermissions: v,
			referenceTitle: y,
			referenceDefaultValues: b,
			referenceModalWidth: x,
			selectedId: A,
			disabled: o,
			onCreated: F,
			onUpdated: () => void N()
		})]
	}) : I;
}
function ta({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: s, rules: c, search: l, allowClear: u, disabled: d, hideLabel: f, inputStyle: p, onValueChange: m, lazy: h = !0, recordSource: g, fetchSelected: _ = !0, referenceForm: v, referencePermissions: y, referenceTitle: b, referenceDefaultValues: x, referenceModalWidth: S, referenceActions: C = !0, popupMatchSelectWidth: w, popupMinWidth: T }) {
	let E = Pe({
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
		children: ({ value: e, onChange: t, disabled: n, name: s }) => /* @__PURE__ */ q(ea, {
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
function na({ reference: e, choices: t, optionLabel: n = "name", optionValue: r = "id", search: i, allowClear: a = !0, lazy: o = !0, fetchSelected: s = !0, value: c, onChange: u, disabled: f, selectedRecords: p, referenceForm: m, referencePermissions: h, referenceTitle: g, referenceDefaultValues: _, referenceModalWidth: v, referenceActions: y = !0, popupMatchSelectWidth: b, popupMinWidth: x }) {
	let [S, C] = d(), [w, T] = d(!1), E = w || !!S, D = zi(c, r), { options: O, loading: k, reload: A } = Qi(t, e, n, r, i ? S : void 0, {
		lazy: o,
		active: E,
		selectedValues: c,
		selectedRecords: p,
		fetchSelected: s
	}), j = l(() => O.map((e) => ({
		label: e.label,
		value: e.value
	})), [O]), M = /* @__PURE__ */ q(z, {
		...Gi({
			popupMatchSelectWidth: b,
			popupMinWidth: x
		}),
		mode: "multiple",
		value: D,
		onChange: u,
		options: j,
		loading: k,
		notFoundContent: Ki(k),
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
			children: M
		}), /* @__PURE__ */ q($i, {
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
function ra({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: s, rules: c, search: l, allowClear: u = !0, hideLabel: d, disabled: f, lazy: p = !0, recordSource: m, fetchSelected: h = !0, referenceForm: g, referencePermissions: _, referenceTitle: v, referenceDefaultValues: y, referenceModalWidth: b, referenceActions: x = !0, popupMatchSelectWidth: S, popupMinWidth: C }) {
	let w = Pe({
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
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ q(na, {
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
function ia(e) {
	return e instanceof File ? !0 : typeof e == "string" && e.length > 0;
}
function aa(e) {
	if (e instanceof File) return e.name;
	if (typeof e == "string" && e.length > 0) try {
		return new URL(e, "http://local").pathname.split("/").filter(Boolean).pop() || e;
	} catch {
		return e.split("/").filter(Boolean).pop() || e;
	}
}
//#endregion
//#region src/crud/fields/useUploadPreviewUrl.ts
function oa(e) {
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
function sa({ value: e, onChange: t, disabled: n, clearable: r, accept: i = "image/*", previewWidth: a = 200 }) {
	let o = u(null), s = oa(e), c = r && ia(e);
	return /* @__PURE__ */ J(B, {
		direction: "vertical",
		size: "middle",
		style: { width: "100%" },
		children: [
			s ? /* @__PURE__ */ q(N, {
				src: s,
				alt: "",
				style: {
					maxWidth: a,
					maxHeight: a,
					objectFit: "contain"
				}
			}) : null,
			/* @__PURE__ */ J(B, {
				wrap: !0,
				children: [/* @__PURE__ */ q(w, {
					icon: /* @__PURE__ */ q(Ee, {}),
					disabled: n,
					onClick: () => o.current?.click(),
					children: "Choose image"
				}), c ? /* @__PURE__ */ q(w, {
					icon: /* @__PURE__ */ q(he, {}),
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
function ca({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, clearable: o, accept: s, previewWidth: c }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ q(sa, {
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
function la({ value: e, onChange: t, disabled: n, clearable: r, accept: i }) {
	let a = u(null), o = aa(e), s = typeof e == "string" && e.length > 0 ? e : void 0, c = r && ia(e);
	return /* @__PURE__ */ J(B, {
		direction: "vertical",
		size: "middle",
		style: { width: "100%" },
		children: [
			o ? /* @__PURE__ */ J(B, { children: [/* @__PURE__ */ q(Se, {}), s ? /* @__PURE__ */ q(W.Link, {
				href: s,
				target: "_blank",
				rel: "noopener noreferrer",
				children: o
			}) : /* @__PURE__ */ q(W.Text, { children: o })] }) : null,
			/* @__PURE__ */ J(B, {
				wrap: !0,
				children: [/* @__PURE__ */ q(w, {
					icon: /* @__PURE__ */ q(Ee, {}),
					disabled: n,
					onClick: () => a.current?.click(),
					children: "Choose file"
				}), c ? /* @__PURE__ */ q(w, {
					icon: /* @__PURE__ */ q(he, {}),
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
function ua({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, clearable: o, accept: s }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ q(la, {
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
function da({ source: e, label: t, sortable: n = !0 }) {
	return Jn(l(() => ({
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
function fa(e, t, n) {
	return typeof n == "function" ? n(e) : n ? br(e, n) : e[t];
}
//#endregion
//#region src/crud/columns/NumberColumn.tsx
function pa({ source: e, label: t, sortable: n = !0 }) {
	return Jn(l(() => ({
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
function ma({ source: e, label: t, sortable: n = !0 }) {
	return Jn(l(() => ({
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
function ha({ source: e, label: t, sortable: n = !0 }) {
	return Jn(l(() => ({
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
function ga({ record: e, source: t, display: n, reference: r, choices: i, optionLabel: a, optionValue: o }) {
	let { labelForValue: s } = Qi(i, r, a, o), c = e[t];
	if (typeof n == "function") return /* @__PURE__ */ q(K, { children: n(e) });
	if (n && n !== t) {
		let r = fa(e, t, n);
		return /* @__PURE__ */ q(K, { children: r == null ? "—" : String(r) });
	}
	return /* @__PURE__ */ q(K, { children: s(c) });
}
function _a({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", display: o, sortable: s = !0 }) {
	return Jn(l(() => ({
		key: e,
		source: e,
		label: t,
		sortable: s,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: s ? !0 : void 0,
			render: (s, c) => /* @__PURE__ */ q(ga, {
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
function va({ record: e, source: t, reference: n, choices: r, optionLabel: i, optionValue: a }) {
	let { labelsForValues: o } = Qi(r, n, i, a), s = e[t];
	return /* @__PURE__ */ q(K, { children: o(Array.isArray(s) ? s : []) });
}
function ya({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", sortable: o = !1 }) {
	return Jn(l(() => ({
		key: e,
		source: e,
		label: t,
		sortable: o,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: o ? !0 : void 0,
			render: (t, o) => /* @__PURE__ */ q(va, {
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
function ba({ source: e, label: t, sortable: n = !1, width: r = 40, height: i = 40, objectFit: a = "cover", borderRadius: o = 4, alt: s = "" }) {
	return Jn(l(() => ({
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
function xa({ source: e, label: t, sortable: n = !1, render: r }) {
	return Jn(l(() => ({
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
function Sa({ source: e, label: t }) {
	return rr(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ q(F, {
			placeholder: t ?? e,
			value: n,
			onChange: (e) => r(e ?? void 0),
			style: { minWidth: 120 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/BooleanFilter.tsx
function Ca({ source: e, label: t }) {
	return rr(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ q(z, {
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
function wa({ source: e, label: t }) {
	return rr(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ q(O, {
			allowClear: !0,
			placeholder: t ?? e,
			value: n ? Fe(String(n)) : null,
			onChange: (e) => r(e ? e.format("YYYY-MM-DD") : void 0),
			style: { minWidth: 160 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/SelectFilter.tsx
function Ta({ source: e, label: t, choices: n, multiple: r }) {
	return rr(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: i, onChange: a }) => /* @__PURE__ */ q(z, {
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
function Ea({ source: e, label: t, reference: n, choices: r, optionLabel: i, optionValue: a, multiple: o, search: s, lazy: c = !0, fetchSelected: l = !0, popupMatchSelectWidth: u, popupMinWidth: f, value: p, onChange: m }) {
	let [h, g] = d(), [_, v] = d(!1), { options: y, loading: b } = Qi(r, n, i, a, s ? h : void 0, {
		lazy: c,
		active: _ || !!h,
		selectedValues: p,
		fetchSelected: l
	});
	return /* @__PURE__ */ q(z, {
		...Gi({
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
		notFoundContent: Ki(b),
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
function Da({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", multiple: o, search: s, lazy: c = !0, fetchSelected: u = !0, popupMatchSelectWidth: d, popupMinWidth: f }) {
	return rr(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: l, onChange: p }) => /* @__PURE__ */ q(Ea, {
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
function Oa(e) {
	return /* @__PURE__ */ q(Da, {
		...e,
		multiple: !0
	});
}
//#endregion
export { Kt as AdminApp, Pt as AdminLayout, Bn as AppHub, Vn as AppLauncherButton, Ze as AppThemeProvider, In as AuthAlternateLink, Ln as AuthPageLayout, lt as AuthProvider, ma as BooleanColumn, Ci as BooleanField, Ca as BooleanFilter, xa as CustomColumn, Xn as DEFAULT_TEXT_FILTER_DEBOUNCE_MS, Jt as DataProvider, ha as DateColumn, ki as DateField, wa as DateFilter, Ai as DateTimeField, et as DensitySwitch, en as EXPECTED_VALIDATION_BODY_HINT, $ as FieldWrapper, ua as FileField, ii as FilterBar, _i as FormStep, yi as FormSteps, mi as FormTab, gi as FormTabs, Ft as Guard, Lt as GuestOnly, ba as ImageColumn, ca as ImageField, li as InlineFormSet, ui as InlineFormSetStacked, Rn as LoginPage, pa as NumberColumn, Si as NumberField, Sa as NumberFilter, Ii as PasswordField, mt as PermissionsProvider, zn as PlaceholderPage, It as Protected, _a as ReferenceColumn, ta as ReferenceField, Da as ReferenceFilter, ya as ReferenceManyColumn, ra as ReferenceManyField, Oa as ReferenceManyFilter, Rt as RequirePermission, ai as ResourceForm, Ur as ResourceFormModal, ni as ResourceList, Pi as SelectField, Ta as SelectFilter, xi as TextAreaField, da as TextColumn, bi as TextField, $n as TextFilter, nt as ThemeSwitch, rt as ThemeToolbar, Ni as TimeField, kn as applyInMemoryListParams, Q as asStringMessages, Sr as buildFormPayload, Cr as buildInlineRowsPayload, jr as buildResourceFormSubmitBody, Qt as combineResourceHandlers, Gt as createAdminRouter, An as createMemoryResourceHandlers, ht as createPermissionsChecker, jn as createRestResourceHandlers, ft as createSessionStorageAuthAdapter, Ut as deriveAuthPaths, sn as describeNonStandardValidationBody, bt as filterFlatNavItems, wt as filterNavByPermission, vt as filterNavItems, Dn as filterRows, hn as finalizeFormErrors, yt as flattenNavLeaves, mn as flattenNestedArrayErrors, un as getErrorBody, br as getFormValue, _t as getNavItemLabel, zt as getRouteAccess, wn as getRowById, wr as hasUploadValues, $t as isAbortError, oi as nestedFieldPath, vn as parseDjangoDRFFormErrors, yn as parseDotNetFormErrors, bn as parseNodeFormErrors, Bt as partitionAdminRoutes, Ar as prepareFormSubmitBody, fn as resolveErrorBody, xr as setFormValue, Nn as toDjangoRestOrdering, kr as toFormData, Fn as toJsonApiSort, Pn as toODataOrderBy, zr as useAbortableEffect, ut as useAuth, gt as useCan, Qi as useChoices, Yt as useDataProvider, Xr as useListQueryState, X as usePermissions, pr as useRegisterPayloadField, mr as useRegisterSectionField, Qr as useResourceListContext, Qe as useThemeMode };
