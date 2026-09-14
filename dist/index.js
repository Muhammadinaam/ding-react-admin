import { Children as e, createContext as t, createElement as n, forwardRef as r, isValidElement as i, useCallback as a, useContext as o, useEffect as s, useLayoutEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { Link as f, Navigate as p, Outlet as m, RouterProvider as h, createBrowserRouter as g, useLocation as _, useNavigate as v, useParams as y, useSearchParams as b } from "react-router-dom";
import { Alert as x, App as S, Avatar as C, Button as w, Card as T, Col as E, ConfigProvider as D, DatePicker as O, Drawer as k, Dropdown as ee, Flex as A, Form as j, Grid as M, Image as N, Input as P, InputNumber as F, Layout as I, List as te, Menu as L, Modal as ne, Pagination as re, Popover as ie, Row as R, Segmented as ae, Select as z, Space as B, Spin as oe, Steps as V, Switch as se, Table as ce, Tabs as H, TimePicker as le, Tooltip as U, Typography as W, theme as G } from "antd";
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
		placement: M.useBreakpoint().lg ? "bottomRight" : "bottom",
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
function ht() {
	let e = o(pt);
	if (!e) throw Error("usePermissions must be used within PermissionsProvider");
	return e;
}
function gt(e) {
	return (t) => e()?.includes(t) ?? !1;
}
function _t(e) {
	let t = ht();
	return a(() => t(e), [t, e]);
}
//#endregion
//#region src/layouts/navFilter.ts
function vt(e) {
	let { label: t } = e;
	return typeof t == "string" ? t : typeof t == "number" ? String(t) : "";
}
function yt(e, t) {
	let n = t.trim().toLowerCase();
	if (!n) return e;
	function r(e) {
		let t = [];
		for (let i of e) {
			let e = vt(i).toLowerCase().includes(n);
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
function bt(e, t) {
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
function xt(e, t) {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => {
		let t = vt(e).toLowerCase(), r = (e.group ?? "").toLowerCase();
		return t.includes(n) || r.includes(n);
	}) : [];
}
function St(e) {
	return `${e}__submenu`;
}
function Ct(e) {
	let t = [];
	function n(e) {
		for (let r of e) r.children?.length && (t.push(St(r.path)), n(r.children));
	}
	return n(e), t;
}
//#endregion
//#region src/components/NavMenuLabel.tsx
function wt({ label: e, title: t }) {
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
function Tt(e, t) {
	let n = t?.showLabelTooltip !== !1, r = t?.wrapLabels === !0, i = t?.collapsed === !0;
	return e.map((e) => {
		let a = e.Icon, o = a ? /* @__PURE__ */ q(a, {}) : void 0, s = vt(e), c = s && n ? /* @__PURE__ */ q(wt, {
			label: e.label,
			title: s
		}) : r ? /* @__PURE__ */ q(wt, {
			label: e.label,
			title: ""
		}) : e.label, l = i && s ? { title: s } : {};
		return e.children?.length ? {
			key: St(e.path),
			icon: o,
			label: c,
			...l,
			children: Tt(e.children, t)
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
function X(e, t, n) {
	if (!t) return !0;
	let r = t[n];
	return n === "read" && !r && (r = t.list), r ? e(r) : !1;
}
function Et(e, t) {
	return e.map((e) => {
		if (e.children?.length) {
			let n = Et(e.children, t);
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
var Dt = "#001529", Ot = "ding-react-admin-sider-collapsed";
function kt(e) {
	try {
		return localStorage.getItem(e) === "1";
	} catch {
		return !1;
	}
}
function At() {
	return M.useBreakpoint().lg !== !0;
}
function jt(e) {
	let t = /* @__PURE__ */ new Set();
	function n(e) {
		for (let r of e) r.children?.length ? n(r.children) : t.add(r.path);
	}
	return n(e), t;
}
function Mt(e, t) {
	function n(e) {
		for (let r of e) if (r.children?.length) {
			let e = n(r.children);
			if (e !== null) return [St(r.path), ...e];
		} else if (r.path === t) return [];
		return null;
	}
	return n(e) ?? [];
}
function Nt({ wrapLabels: e, itemDivider: t = "none" }) {
	let n = ["ding-admin-nav-menu"];
	return e && n.push("ding-admin-nav-menu--wrap-labels"), t === "full" ? n.push("ding-admin-nav-menu--item-divider-full") : t === "inset" && n.push("ding-admin-nav-menu--item-divider-inset"), n.join(" ");
}
function Pt({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a, navQuery: o, onNavQueryChange: s, showNavSearch: c, navSearchPlaceholder: l, scrollVariant: u, searchVariant: d, wrapLabels: f, itemDivider: p }) {
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
		children: /* @__PURE__ */ q(Ft, {
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
function Ft({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a, wrapLabels: o, itemDivider: s }) {
	return /* @__PURE__ */ q(L, {
		className: Nt({
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
function It({ navItems: e, brand: t = "Admin", collapsedBrand: n = "A", mobileDrawerTitle: r, headerExtras: i, userMenuItems: o, onUserMenuClick: c, loginPath: f = "/login", siderCollapsedStorageKey: p = Ot, navSearch: h = !0, navMenu: g, hideSider: y = !1 }) {
	let b = v(), x = _(), { resolved: S } = Qe(), T = S === "dark", { logout: E, userLabel: D } = ut(), O = ht(), [A, j] = d(() => kt(p)), [M, N] = d(!1), P = At(), { token: F } = G.useToken(), te = u(null), [L, ne] = d(""), re = h !== !1, ie = typeof h == "object" ? h.placeholder : void 0, R = g?.wrapLabels !== !1, ae = g?.itemDivider ?? "inset", z = r ?? t, B = () => {
		E(), b(f, { replace: !0 });
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
	}, [x.pathname]), s(() => {
		te.current?.scrollTo({
			top: 0,
			left: 0
		});
	}, [x.pathname]), s(() => {
		A && ne("");
	}, [A]);
	let V = l(() => Et(e, O), [e, O]), se = L.trim(), ce = se.length > 0, H = l(() => ce ? yt(V, se) : V, [
		V,
		se,
		ce
	]), le = l(() => jt(H), [H]), U = l(() => Tt(H, {
		showLabelTooltip: !A && !R,
		wrapLabels: R && !A,
		collapsed: A
	}), [
		H,
		A,
		R
	]), K = l(() => Ct(H), [H]), ue = l(() => Mt(V, x.pathname), [V, x.pathname]), [de, fe] = d(() => Mt(V, x.pathname));
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
	}, xe = T ? F.colorBgContainer : Dt, Se = T ? "default" : "on-dark", Ce = T ? "app" : "on-dark", we = [x.pathname], Y = (e) => {
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
				collapsed: A,
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
							children: A ? n : t
						})
					}), /* @__PURE__ */ q(Pt, {
						menuItems: U,
						selectedKeys: we,
						inlineCollapsed: A,
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
				open: M,
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
					children: /* @__PURE__ */ q(Pt, {
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
						/* @__PURE__ */ q(ee, {
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
function Lt({ when: e, redirect: t, children: n }) {
	return e ? n : /* @__PURE__ */ q(p, {
		to: t,
		replace: !0
	});
}
function Rt({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = ut();
	return /* @__PURE__ */ q(Lt, {
		when: n,
		redirect: t,
		children: e
	});
}
function zt({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = ut();
	return /* @__PURE__ */ q(Lt, {
		when: !n,
		redirect: t,
		children: e
	});
}
function Bt({ permission: e, redirect: t, children: n }) {
	return /* @__PURE__ */ q(Lt, {
		when: ht()(e),
		redirect: t,
		children: n
	});
}
//#endregion
//#region src/router/routeAccess.ts
function Vt(e) {
	return e.access ?? "protected";
}
function Ht(e) {
	let t = [], n = [], r = [];
	for (let i of e) {
		let e = Vt(i);
		e === "guest" ? t.push(i) : e === "public" ? n.push(i) : r.push(i);
	}
	return {
		guest: t,
		public: n,
		protected: r
	};
}
function Ut(e) {
	return e.replace(/^\/+/, "");
}
function Wt(e) {
	return `/${Ut(e)}`;
}
function Gt(e, t) {
	let { guest: n, protected: r } = Ht(e), i = n.find((e) => "path" in e && e.path), a = r.find((e) => "index" in e && e.index), o = r.find((e) => "path" in e && e.path), s = t?.unauthenticated;
	!s && i && "path" in i && i.path && (s = Wt(i.path));
	let c = t?.afterLogin;
	if (c || (a ? c = "/" : o && "path" in o && o.path && (c = Wt(o.path))), r.length > 0 && !s) throw Error("createAdminRouter: protected routes require redirects.unauthenticated or a guest route (access: \"guest\").");
	if (n.length > 0 && !c) throw Error("createAdminRouter: guest routes require redirects.afterLogin or a protected route (index or path).");
	return {
		loginPath: s ?? "/",
		homePath: c ?? "/"
	};
}
function Kt(e) {
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
function qt({ navItems: e, children: t, layoutProps: n, redirects: r }) {
	let { loginPath: i, homePath: a } = Gt(t, r), { guest: o, public: s, protected: c } = Ht(t), l = [];
	for (let e of o) !("path" in e) || !e.path || l.push({
		path: Ut(e.path),
		element: /* @__PURE__ */ q(zt, {
			redirectTo: a,
			children: e.element
		})
	});
	for (let e of s) !("path" in e) || !e.path || l.push({
		path: Ut(e.path),
		element: e.element
	});
	return c.length > 0 && l.push({
		path: "/",
		element: /* @__PURE__ */ q(Rt, {
			redirectTo: i,
			children: /* @__PURE__ */ q(It, {
				navItems: e,
				loginPath: i,
				...n
			})
		}),
		children: c.map(Kt)
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
function Jt({ navItems: e, routes: t, authRedirects: n, layoutProps: r, theme: i }) {
	let a = l(() => qt({
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
var Yt = t(null);
function Xt({ children: e, value: t }) {
	let n = l(() => t, [t]);
	return /* @__PURE__ */ q(Yt.Provider, {
		value: n,
		children: e
	});
}
function Zt() {
	let e = o(Yt);
	if (!e) throw Error("useDataProvider must be used within DataProvider");
	return e;
}
//#endregion
//#region src/data/resourceHandlers.ts
function Qt(e) {
	return "handlers" in e ? e : { handlers: e };
}
function $t(e, t, n) {
	if (!(!e || !t) && !X(e, t, n)) throw Error("Forbidden");
}
function en(e, t) {
	let { can: n, guard: r, parseFormError: i } = t ?? {}, a = (t) => {
		let n = e[t];
		if (!n) throw Error(`Unknown resource: ${t}`);
		return Qt(n);
	};
	return {
		async getList(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "list"), $t(n, o, "list"), i.getList(t);
		},
		async getOne(e, t, i) {
			let { handlers: o, permissions: s } = a(e);
			return r?.(e, "read"), $t(n, s, "read"), o.getOne(t, i);
		},
		async create(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "add"), $t(n, o, "add"), i.create(t);
		},
		async update(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "change"), $t(n, o, "change"), i.update(t);
		},
		async delete(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "delete"), $t(n, o, "delete"), i.delete(t);
		},
		parseFormError: i
	};
}
//#endregion
//#region src/data/abortError.ts
function tn(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return t.name === "AbortError" || t.name === "CanceledError" || t.code === "ERR_CANCELED";
}
//#endregion
//#region src/data/parseFormErrorHelpers.ts
var nn = "Expected HTTP 400 with a JSON object such as `{ \"field_name\": [\"message\"] }` or `{ \"non_field_errors\": [\"message\"] }`.", rn = 300;
function Z(e) {
	if (typeof e == "string") return [e];
	if (Array.isArray(e)) {
		let t = e.filter((e) => typeof e == "string");
		if (t.length) return t;
	}
	return [];
}
function an(e) {
	return e.length === 1 ? e[0] : e;
}
function on(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function sn(e) {
	return typeof Response < "u" && e instanceof Response ? !0 : typeof e == "object" && !!e && typeof e.json == "function" && typeof e.status == "number" && e.headers != null;
}
function cn(e, t) {
	if (t) return t;
	if (e === null) return "(no JSON body)";
	try {
		let t = JSON.stringify(e);
		return t.length > rn ? `${t.slice(0, rn)}…` : t;
	} catch {
		return String(e);
	}
}
function ln(e, t) {
	return `Non-standard validation response. ${nn} Received: ${cn(e, t?.hint)}`;
}
function un(e) {
	if (!e || typeof e != "object") return null;
	let t = e.response;
	if (!t || typeof t != "object") return null;
	let n = t.status;
	return typeof n == "number" && (n === 400 || n === 422) ? n : null;
}
function dn(e) {
	if (!e || typeof e != "object") return null;
	let t = e.response;
	return sn(t) ? t.headers.get("content-type") : null;
}
function fn(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (on(t.body)) return t.body;
	if (on(t.data)) return t.data;
	let n = t.response;
	if (n && typeof n == "object" && !Array.isArray(n)) {
		let e = n.data;
		if (on(e)) return e;
	}
	return null;
}
function pn(e) {
	if (on(e)) return e;
	if (Array.isArray(e)) {
		let t = Z(e);
		return t.length ? { non_field_errors: an(t) } : null;
	}
	return null;
}
async function mn(e) {
	let t = fn(e);
	if (t) return t;
	if (!e || typeof e != "object") return null;
	let n = e.response;
	if (!sn(n)) return null;
	let r = n.headers.get("content-type");
	if (!r || !/application\/json/i.test(r)) return null;
	try {
		return pn(await n.clone().json());
	} catch {
		return null;
	}
}
function hn(e) {
	return Array.isArray(e) ? e.some((e) => e && typeof e == "object" && !Array.isArray(e) && Object.values(e).some((e) => Z(e).length > 0)) : !1;
}
function gn(e, t, n) {
	t.forEach((t, r) => {
		if (!(!t || typeof t != "object" || Array.isArray(t))) for (let [i, a] of Object.entries(t)) {
			let t = Z(a);
			t.length && (n[`${e}.${r}.${i}`] = an(t));
		}
	});
}
function _n(e, t) {
	return {
		fields: Object.keys(e).length ? e : void 0,
		global: t.length ? t : void 0
	};
}
var vn = new Set(["non_field_errors", "detail"]);
function yn(e) {
	let t = {}, n = [];
	for (let [r, i] of Object.entries(e)) {
		if (vn.has(r)) {
			n.push(...Z(i));
			continue;
		}
		if (hn(i)) {
			gn(r, i, t);
			continue;
		}
		let e = Z(i);
		e.length && (t[r] = an(e));
	}
	return !Object.keys(t).length && !n.length ? null : _n(t, n);
}
function bn(e, t) {
	let n = fn(e);
	return n ? yn(n) : null;
}
function xn(e, t, n) {
	let r = fn(e);
	if (!r) return null;
	let i = n?.camelCase ?? !0, a = n?.fieldMap, o = {}, s = [];
	n?.includeSummary && (s.push(...Z(r.title)), s.push(...Z(r.message)));
	let c = r.errors;
	if (c && typeof c == "object" && !Array.isArray(c)) for (let [e, t] of Object.entries(c)) {
		let n = a?.[e] ?? (i ? wn(e) : e), r = Z(t);
		r.length && (o[n] = an(r));
	}
	return !Object.keys(o).length && !s.length ? null : _n(o, s);
}
function Sn(e, t, n) {
	let r = fn(e);
	if (!r) return null;
	let i = {}, a = [], o = n?.fieldMap, s = r.errors;
	if (Array.isArray(s)) for (let e of s) {
		if (!e || typeof e != "object") continue;
		let t = e, n = typeof t.path == "string" && t.path || typeof t.param == "string" && t.param || typeof t.field == "string" && t.field, r = Z(t.msg)[0] ?? Z(t.message)[0];
		r && (n ? Cn(i, o?.[n] ?? n, r) : a.push(r));
	}
	else if (s && typeof s == "object") for (let [e, t] of Object.entries(s)) {
		let n = o?.[e] ?? e, r = Z(t);
		r.length && (i[n] = an(r));
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
	return a.push(...Z(r.error)), !Object.keys(i).length && !a.length ? null : _n(i, a);
}
function Cn(e, t, n) {
	let r = e[t];
	if (!r) {
		e[t] = n;
		return;
	}
	e[t] = Array.isArray(r) ? [...r, n] : [r, n];
}
function wn(e) {
	return e && e.charAt(0).toLowerCase() + e.slice(1);
}
//#endregion
//#region src/data/inMemoryList.ts
function Tn(e, t) {
	return e === t || String(e) === String(t);
}
function En(e, t) {
	let n = e.find((e) => Tn(e.id, t));
	if (!n) throw Error("Not found");
	return n;
}
function Dn(e, t) {
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
function On(e, t) {
	return t == null || t === "" ? !0 : Array.isArray(t) ? t.length === 0 ? !0 : Array.isArray(e) ? t.some((t) => e.includes(t)) : t.includes(e) : Array.isArray(e) ? e.includes(t) : typeof t == "string" && typeof e == "string" ? e.toLowerCase().includes(t.toLowerCase()) : e === t;
}
function kn(e, t) {
	return t ? e.filter((e) => Object.entries(t).every(([t, n]) => On(e[t], n))) : e;
}
function An(e, t, n) {
	let r = (t - 1) * n;
	return {
		data: e.slice(r, r + n),
		total: e.length
	};
}
function jn(e, t) {
	let { pagination: n, sort: r, filter: i } = t, a = kn(e, i);
	if (r) {
		let e = Array.isArray(r) ? r : [r];
		e.length > 0 && e[0]?.field && (a = Dn(a, e));
	}
	return n ? An(a, n.page, n.perPage) : {
		data: a,
		total: a.length
	};
}
//#endregion
//#region src/data/createMemoryResourceHandlers.ts
function Mn(e) {
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
			return jn(t(e.scopeList ? e.scopeList(e.getRows(), n) : e.getRows()), n);
		},
		async getOne(t, n) {
			return { data: En(e.getRows(), t) };
		},
		async create(t) {
			let r = n(t, e.nextId());
			return e.getRows().push(r), { data: r };
		},
		async update({ id: t, data: n }) {
			let i = En(e.getRows(), t), a = r(i, n);
			return Object.assign(i, a), { data: i };
		},
		async delete(t) {
			let n = e.getRows(), r = n.findIndex((e) => Tn(e.id, t));
			if (r < 0) return { data: null };
			let [i] = n.splice(r, 1);
			return e.afterDelete?.(i), { data: i };
		}
	};
}
//#endregion
//#region src/data/createRestResourceHandlers.ts
function Nn(e) {
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
function Pn(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function Fn(e) {
	let t = Pn(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function In(e) {
	let t = Pn(e);
	if (t.length !== 0) return t.map((e) => `${e.field} ${e.order === "DESC" ? "desc" : "asc"}`).join(",");
}
function Ln(e) {
	let t = Pn(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
//#endregion
//#region src/components/AuthAlternateLink.tsx
function Rn({ prompt: e, linkText: t, to: n }) {
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
function zn({ children: e, brand: t, footer: n, showThemeToolbar: r = !0 }) {
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
function Bn({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, brand: r, extraFields: i, showThemeToolbar: a = !0, afterLoginPath: o = "/", alternateAuth: s, footer: c }) {
	let { login: l } = ut(), u = v();
	return /* @__PURE__ */ q(zn, {
		brand: r ?? n,
		footer: c ?? (s ? /* @__PURE__ */ q(Rn, {
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
						children: /* @__PURE__ */ q(P, { autoComplete: "username" })
					}),
					/* @__PURE__ */ q(j.Item, {
						name: "password",
						label: "Password",
						rules: [{
							required: !0,
							message: "Required"
						}],
						children: /* @__PURE__ */ q(P.Password, { autoComplete: "current-password" })
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
function Vn({ title: e }) {
	return /* @__PURE__ */ q(W.Title, {
		level: 3,
		style: { marginTop: 0 },
		children: e
	});
}
//#endregion
//#region src/components/AppHub.tsx
function Hn({ apps: e, menuItems: t, onAppClick: n, onMenuClick: r, menuSearchPlaceholder: i = "Search menus across apps…", className: a, maxWidth: o = 960, loading: s = !1 }) {
	let c = v(), { token: u } = G.useToken(), [f, p] = d(""), m = (e) => {
		if (n) {
			n(e);
			return;
		}
		c(e.path);
	}, h = (e) => {
		if (r) {
			r(e);
			return;
		}
		c(e.path);
	}, g = f.trim(), _ = l(() => t && g ? xt(t, g) : [], [t, g]), y = !!(t && g);
	return /* @__PURE__ */ J("div", {
		className: a,
		style: {
			width: "100%",
			maxWidth: o,
			marginInline: "auto",
			paddingInline: u.paddingMD
		},
		children: [t?.length && !s ? /* @__PURE__ */ q("div", {
			style: {
				maxWidth: 480,
				margin: "0 auto 24px"
			},
			children: /* @__PURE__ */ q(it, {
				value: f,
				onChange: p,
				placeholder: i,
				variant: "app"
			})
		}) : null, s ? /* @__PURE__ */ q("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				padding: u.paddingXL
			},
			children: /* @__PURE__ */ q(oe, { size: "large" })
		}) : y ? /* @__PURE__ */ q(te, {
			bordered: !0,
			dataSource: _,
			locale: { emptyText: "No menus match your search." },
			style: {
				background: u.colorBgContainer,
				borderRadius: u.borderRadiusLG
			},
			renderItem: (e) => {
				let t = e.Icon;
				return /* @__PURE__ */ q(te.Item, {
					style: { cursor: "pointer" },
					onClick: () => h(e),
					children: /* @__PURE__ */ q(te.Item.Meta, {
						avatar: t ? /* @__PURE__ */ q("span", {
							style: {
								fontSize: 20,
								lineHeight: 1
							},
							children: /* @__PURE__ */ q(t, {})
						}) : void 0,
						title: vt(e),
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
						onClick: () => m(e),
						styles: { body: {
							textAlign: "center",
							padding: u.paddingLG
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
function Un({ hubPath: e = "/", label: t = "Apps", onClick: n }) {
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
function Wn(e) {
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
function Gn(e) {
	return e.length === 0 ? null : e.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function Kn(e) {
	return new Map(e.map((e, t) => [e.field, t + 1]));
}
//#endregion
//#region src/crud/context/ListContext.tsx
var qn = t(null);
function Jn({ children: e, toggleSort: t, sort: n }) {
	let [r, i] = d([]), o = l(() => new Set(n.map((e) => e.field)), [n]), s = l(() => new Map(n.map((e) => [e.field, e.order])), [n]), c = l(() => Kn(n), [n]), u = a((e) => (i((t) => {
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
	return /* @__PURE__ */ q(qn.Provider, {
		value: f,
		children: e
	});
}
function Yn() {
	let e = o(qn);
	if (!e) throw Error("Column components must be used within ResourceList");
	return e;
}
function Xn(e) {
	let { registerColumn: t } = Yn();
	s(() => t(e), [t, e]);
}
//#endregion
//#region src/crud/utils/useDebouncedValue.ts
function Zn(e, t) {
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
var Qn = 300;
function $n(e) {
	if (!(e == null || e === "")) return String(e);
}
function er({ value: e, onChange: t, placeholder: n, debounceMs: r }) {
	let [i, a] = d(() => e ?? ""), o = Zn(i, r);
	return s(() => {
		a(e ?? "");
	}, [e]), s(() => {
		if (r <= 0 || o !== i) return;
		let n = $n(o);
		n !== $n(e) && t(n);
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
			a(n), (r <= 0 || n === "") && t($n(n));
		},
		style: { minWidth: 160 }
	});
}
function tr({ source: e, label: t, placeholder: n, debounceMs: r }) {
	let i = ir(), a = r ?? i?.textFilterDebounceMs ?? 300;
	return ar(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: r, onChange: i }) => /* @__PURE__ */ q(er, {
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
var nr = t(null);
function rr({ children: e, values: t, setFilterValue: n, textFilterDebounceMs: r = 300 }) {
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
	return /* @__PURE__ */ q(nr.Provider, {
		value: c,
		children: e
	});
}
function ir() {
	return o(nr);
}
function ar(e) {
	let t = ir()?.registerFilter;
	s(() => {
		if (t) return t(e);
	}, [t, e]);
}
//#endregion
//#region src/crud/context/FormContext.tsx
var or = t(null);
function sr({ children: e, resource: t, isNew: n, disabled: r }) {
	return /* @__PURE__ */ q(or.Provider, {
		value: {
			resource: t,
			isNew: n,
			disabled: r
		},
		children: e
	});
}
function cr() {
	return o(or);
}
//#endregion
//#region src/crud/context/FormSectionContext.tsx
var lr = t(null);
function ur({ sourcesRef: e, children: t }) {
	return /* @__PURE__ */ q(lr.Provider, {
		value: e,
		children: t
	});
}
function dr() {
	return o(lr);
}
//#endregion
//#region src/crud/context/PayloadFieldsContext.tsx
var fr = t(null);
function pr({ children: e, fieldsRef: t }) {
	return /* @__PURE__ */ q(fr.Provider, {
		value: t,
		children: e
	});
}
function mr() {
	return o(fr);
}
function hr(e, t = !0) {
	let n = mr();
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
function gr(e, t = !0) {
	let n = dr();
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
var _r = t(null);
function vr({ children: e, registryRef: t }) {
	return /* @__PURE__ */ q(_r.Provider, {
		value: t,
		children: e
	});
}
function yr() {
	return o(_r);
}
function br(e, t, n, r, i = !0) {
	let a = yr();
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
function xr({ errors: e }) {
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
function Q(e, t) {
	let n = t.split("."), r = e;
	for (let e of n) {
		if (typeof r != "object" || !r) return;
		r = r[e];
	}
	return r;
}
//#endregion
//#region src/crud/utils/setFormValue.ts
function Sr(e, t, n) {
	let r = t.split("."), i = e;
	for (let e = 0; e < r.length - 1; e++) {
		let t = r[e], n = i[t];
		(typeof n != "object" || !n || Array.isArray(n)) && (i[t] = {}), i = i[t];
	}
	i[r[r.length - 1]] = n;
}
//#endregion
//#region src/crud/utils/buildFormPayload.ts
function Cr(e, t) {
	if (t.length === 0) return { ...e };
	let n = {};
	for (let r of t) {
		let t = Q(e, r);
		t !== void 0 && Sr(n, r, t);
	}
	return n;
}
//#endregion
//#region src/crud/utils/buildInlineRowsPayload.ts
function wr(e, t, n) {
	if (!Array.isArray(e)) return [];
	let r = e.map((e) => {
		if (!e || typeof e != "object") return {};
		let n = e, r = {};
		for (let e of t) {
			let t = Q(n, e);
			t !== void 0 && Sr(r, e, t);
		}
		let i = n.id;
		return i != null && (r.id = i), r;
	});
	return n?.transformRows ? n.transformRows(r) : r;
}
//#endregion
//#region src/crud/utils/hasUploadValues.ts
function Tr(e) {
	return e instanceof Blob ? !0 : Array.isArray(e) ? e.some(Tr) : e && typeof e == "object" ? Object.values(e).some(Tr) : !1;
}
//#endregion
//#region src/crud/utils/uploadReferenceUtils.ts
function Er(e) {
	return /^https?:\/\//i.test(e) || e.startsWith("/media/");
}
function Dr(e, t) {
	if (!t) return e;
	if (typeof e == "string") return Er(e) ? void 0 : e;
	if (Array.isArray(e)) return e.map((e) => Dr(e, t)).filter((e) => e !== void 0);
	if (e && typeof e == "object" && !(e instanceof Blob)) {
		let n = {};
		for (let [r, i] of Object.entries(e)) {
			let e = Dr(i, t);
			e !== void 0 && (n[r] = e);
		}
		return n;
	}
	return e;
}
function Or(e, t = !0) {
	return Dr(e, t);
}
//#endregion
//#region src/crud/utils/toFormData.ts
function kr(e, t) {
	return /\[[0-9]+\]$/.test(e) ? `${e}${t}` : `${e}.${t}`;
}
function Ar(e, t, n, r) {
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
			if (r.skipExistingUploadUrls && Er(n)) return;
			e.append(t, n);
			return;
		}
		if (Array.isArray(n)) {
			n.forEach((n, i) => {
				Ar(e, `${t}[${i}]`, n, r);
			});
			return;
		}
		if (typeof n == "object") {
			for (let [i, a] of Object.entries(n)) Ar(e, kr(t, i), a, r);
			return;
		}
		e.append(t, String(n));
	}
}
function jr(e, t) {
	let n = { skipExistingUploadUrls: t?.skipExistingUploadUrls ?? !0 }, r = new FormData();
	for (let [t, i] of Object.entries(e)) Ar(r, t, i, n);
	return r;
}
//#endregion
//#region src/crud/utils/prepareFormSubmitBody.ts
function Mr(e, t) {
	let n = t?.skipExistingUploadUrls ?? !0;
	return Tr(e) ? jr(e, t) : Or(e, n);
}
//#endregion
//#region src/crud/utils/buildResourceFormSubmitBody.ts
function Nr(e, t, n, r) {
	let i = Cr(e, t);
	if (n) for (let t of n) {
		let n = e[t.field], r = t.payloadKey ?? t.field;
		i[r] = wr(n, t.sources, { transformRows: t.transformRows });
	}
	return Mr(i, r);
}
//#endregion
//#region src/crud/utils/formErrors.ts
function Pr(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function Fr(e) {
	return Array.isArray(e) ? e.join(", ") : e;
}
function Ir(e, t, n) {
	if (t.has(e)) return !0;
	let r = e.match(/^([^.]+)\.(\d+)\.([^.]+)$/);
	if (!r) return !1;
	let [, i, , a] = r;
	return n.get(i)?.sources.includes(a) ?? !1;
}
function Lr(e, t, n) {
	let r = {}, i = [...Pr(e.global)];
	for (let [a, o] of Object.entries(e.fields ?? {})) Ir(a, t, n) ? r[a] = o : i.push(Fr(o));
	return {
		fieldErrors: r,
		globalErrors: i
	};
}
function Rr(e, t) {
	for (let [n, r] of Object.entries(t)) e.setError(n, {
		type: "server",
		message: Fr(r)
	});
}
function zr(e) {
	let t = dn(e);
	if (t && !/application\/json/i.test(t)) return `non-JSON response (Content-Type: ${t})`;
}
async function Br(e, t, n, r, i) {
	let a = await mn(n);
	if (a != null) {
		let n = e.parseFormError?.({ body: a }, r);
		if (n) {
			let e = new Set(i.payloadFields), r = /* @__PURE__ */ new Map();
			for (let e of i.inlineRegistry) r.set(e.field, e);
			let { fieldErrors: a, globalErrors: o } = Lr(n, e, r);
			if (Object.keys(a).length || o.length) return Rr(t, a), {
				handled: !0,
				globalErrors: o
			};
		}
		return {
			handled: !0,
			globalErrors: [ln(a)]
		};
	}
	return un(n) == null ? {
		handled: !1,
		globalErrors: []
	} : {
		handled: !0,
		globalErrors: [ln(null, { hint: zr(n) })]
	};
}
//#endregion
//#region src/crud/utils/useAbortableEffect.ts
function Vr(e, t) {
	s(() => {
		let t = new AbortController();
		return e(t.signal), () => t.abort();
	}, t);
}
//#endregion
//#region src/crud/utils/useFormRecord.ts
function Hr({ dp: e, resource: t, id: n, isNew: r, form: i, message: o, defaultValues: s, enabled: c = !0 }) {
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
			tn(e) || o.error(e instanceof Error ? e.message : "Load failed");
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
	return Vr((e) => {
		if (c) return m(e);
	}, [c, m]), {
		loading: l,
		formVersion: f
	};
}
function Ur({ dp: e, resource: t, id: n, isNew: r, form: i, message: o, payloadFieldsRef: s, inlineRegistryRef: c, setGlobalErrors: l, onSuccess: u }) {
	let [f, p] = d(!1);
	return {
		onSubmit: a(async (a) => {
			l([]), p(!0);
			try {
				let i = Nr(a, Array.from(s.current), c.current.values()), l;
				if (r) l = (await e.create(t, i)).data, o.success("Created");
				else if (n) l = (await e.update(t, {
					id: n,
					data: i
				})).data, o.success("Updated");
				else return;
				u?.(l);
			} catch (n) {
				let { handled: a, globalErrors: u } = await Br(e, i, n, {
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
function Wr({ resource: e, id: t, children: r, defaultValues: i, enabled: a = !0, canSave: o = !0, onCancel: s, cancelHref: c, onSuccess: l, loadingMode: p = "overlay" }) {
	let m = t === "new" || !t, h = m ? void 0 : t, g = Zt(), { message: _ } = S.useApp(), v = u(/* @__PURE__ */ new Set()), y = u(/* @__PURE__ */ new Map()), [b, x] = d([]), C = je({ defaultValues: i }), { loading: T, formVersion: E } = Hr({
		dp: g,
		resource: e,
		id: h,
		isNew: m,
		form: C,
		message: _,
		defaultValues: i,
		enabled: a
	}), { onSubmit: D, saving: O } = Ur({
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
	}), M = /* @__PURE__ */ q(sr, {
		resource: e,
		isNew: m,
		children: /* @__PURE__ */ q(pr, {
			fieldsRef: v,
			children: /* @__PURE__ */ q(vr, {
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
					}, /* @__PURE__ */ J(j, {
						layout: "vertical",
						onFinish: ee,
						style: p === "overlay" ? {
							opacity: k ? .4 : 1,
							pointerEvents: k ? "none" : void 0
						} : void 0,
						children: [
							/* @__PURE__ */ q(xr, { errors: b }),
							r,
							/* @__PURE__ */ q(j.Item, {
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
									children: A
								}) : A] })
							})
						]
					}))]
				})
			})
		})
	});
	return T && !O && p === "replace" ? /* @__PURE__ */ q(oe, {}) : M;
}
//#endregion
//#region src/crud/ResourceFormModal.tsx
function Gr({ resource: e, editId: t, onClose: n, children: r, title: i, permissions: a, defaultValues: o, width: s = 560, onSuccess: c }) {
	let l = t === "new", u = t != null, d = ht(), f = i ?? (l ? `New ${e}` : `Edit ${e}`), p = a ? X(d, a, l ? "add" : "change") : !0;
	return /* @__PURE__ */ q(ne, {
		open: u,
		title: f,
		onCancel: n,
		footer: null,
		destroyOnHidden: !0,
		width: s,
		maskClosable: !1,
		children: /* @__PURE__ */ q(S, { children: /* @__PURE__ */ q(Wr, {
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
function Kr({ selectedCount: e, total: t, allPageSelected: n, allMatchingSelected: r, onSelectAllMatching: i, onClearSelection: o, actions: s, onExecute: c, selectedIds: u, running: f = !1 }) {
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
var qr = new Set([
	"page",
	"perPage",
	"sort",
	"create",
	"edit"
]), Jr = 1, Yr = 10;
function Xr(e) {
	if (e.includes(",")) {
		let t = e.split(",").map((e) => e.trim()), n = t.map(Number);
		return n.every((e) => Number.isFinite(e)) ? n : t;
	}
	let t = Number(e);
	return e !== "" && Number.isFinite(t) && String(t) === e ? t : e === "true" ? !0 : e === "false" ? !1 : e;
}
function Zr(e) {
	return e == null || e === "" ? null : Array.isArray(e) ? e.length === 0 ? null : e.map(String).join(",") : String(e);
}
function Qr(e) {
	let [t, n] = b(), r = l(() => {
		let n = t.get("page"), r = t.get("perPage"), i = n ? Math.max(1, Number(n) || Jr) : Jr, a = r ? Math.max(1, Number(r) || Yr) : Yr, o = t.getAll("sort"), s = o.length > 0 ? o.flatMap((e) => Wn(e)) : Wn(t.get("sort")), c = { ...e };
		return t.forEach((e, n) => {
			if (qr.has(n)) return;
			let r = c[n];
			r === void 0 ? t.getAll(n).length > 1 ? c[n] = t.getAll(n).map(Xr) : c[n] = Xr(e) : c[n] = [...Array.isArray(r) ? r : [r], Xr(e)];
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
				e === Yr ? t.delete("perPage") : t.set("perPage", String(e)), t.delete("page");
			});
		},
		setSort: (e) => {
			i((t) => {
				t.delete("sort");
				let n = Gn(e);
				n && t.set("sort", n);
			});
		},
		toggleSort: (e) => {
			i((t) => {
				let n = t.getAll("sort").flatMap((e) => Wn(e)), r = n.findIndex((t) => t.field === e), i;
				i = r < 0 ? [...n, {
					field: e,
					order: "ASC"
				}] : n[r].order === "ASC" ? n.map((e, t) => t === r ? {
					...e,
					order: "DESC"
				} : e) : n.filter((e, t) => t !== r), t.delete("sort");
				let a = Gn(i);
				a && t.set("sort", a);
			});
		},
		setFilter: (e, t) => {
			i((n) => {
				n.delete(e);
				let r = Zr(t);
				r != null && n.set(e, r), n.delete("page");
			});
		},
		setFilters: (e) => {
			i((t) => {
				for (let e of [...t.keys()]) qr.has(e) || t.delete(e);
				for (let [n, r] of Object.entries(e)) {
					let e = Zr(r);
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
var $r = t(null);
function ei() {
	return o($r);
}
function ti(e) {
	return e == null || e === "" ? "—" : String(e);
}
function ni(e, t) {
	if (e.length === 0 || !t.showEdit && !t.showQuickEdit) return e;
	let [n, ...r] = e, i = n.render;
	return [{
		...n,
		render: (e, n, r) => {
			let a = i ? i(e, n, r) : ti(e);
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
function ri({ resource: e, title: t, pathPrefix: n, newPath: r, editMode: i = "page", formChildren: o, actions: s, rowActions: p, headerExtra: m, bulkActions: h, bulkDelete: g = !0, bulkActionsEnabled: _ = !0, permissions: v, queryState: y, queryActions: b }) {
	let x = Zt(), C = ht(), { message: E, modal: D } = S.useApp(), { token: O } = G.useToken(), { columns: k, sortOrders: ee, sortPriorities: A } = Yn(), j = u(null), [M, N] = d(), [P, F] = d(!1), [I, te] = d([]), [L, ne] = d(0), [ie, R] = d(() => /* @__PURE__ */ new Set()), [ae, z] = d(!1), oe = r ?? `${n}/new`, V = X(C, v, "add"), se = X(C, v, "change"), H = X(C, v, "delete"), le = se && (i === "page" || i === "both") && s?.edit !== !1, U = se && (i === "modal" || i === "both") && s?.quickEdit !== !1, ue = H && s?.delete !== !1, de = le || U || ue || p, me = a(() => {
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
		let e = j.current;
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
			tn(e) || E.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			t?.aborted || F(!1);
		}
	}, [
		x,
		e,
		we,
		E
	]);
	Vr((e) => Y(e), [Y]);
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
		if (H && await new Promise((e) => {
			D.confirm({
				title: "Delete this item? This cannot be undone.",
				okType: "danger",
				onOk: () => e(!0),
				onCancel: () => e(!1)
			});
		})) try {
			await x.delete(e, t.id), E.success("Deleted"), Y();
		} catch (e) {
			E.error(e instanceof Error ? e.message : "Delete failed");
		}
	}, [
		H,
		x,
		e,
		Y,
		E,
		D
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
		if (!de) return ni(e, {
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
		return ni([...e, r], {
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
		children: [ge ? /* @__PURE__ */ q(Kr, {
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
			ref: j,
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
					...M ? { y: M } : {}
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
	}), Ae ? /* @__PURE__ */ q(Gr, {
		resource: e,
		editId: y.createModal ? "new" : y.editId,
		onClose: () => {
			b.closeModal(), Y();
		},
		children: o
	}) : null] });
}
function ii({ resource: e, title: t, pathPrefix: n, newPath: r, staticFilter: i, textFilterDebounceMs: o, editMode: s = "page", syncQueryParams: c = !0, children: u, formChildren: d, actions: f, rowActions: p, headerExtra: m, bulkActions: h, bulkDelete: g, bulkActionsEnabled: _, permissions: v }) {
	let [y, b] = Qr(i), x = l(() => {
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
	return /* @__PURE__ */ q($r.Provider, {
		value: C,
		children: /* @__PURE__ */ q(rr, {
			values: x,
			setFilterValue: S,
			textFilterDebounceMs: o,
			children: /* @__PURE__ */ q(Jn, {
				toggleSort: b.toggleSort,
				sort: y.sort,
				children: /* @__PURE__ */ J("div", {
					className: "ding-admin-resource-list-root",
					children: [u, /* @__PURE__ */ q(ri, {
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
function ai() {
	let e = ir();
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
function oi({ children: e }) {
	return /* @__PURE__ */ J(K, { children: [e, /* @__PURE__ */ q(ai, {})] });
}
//#endregion
//#region src/crud/ResourceForm.tsx
function si({ resource: e, title: t, listPath: n, children: r, defaultValues: i, onSaved: a, stayOnPage: o, permissions: c }) {
	let { id: l } = y(), u = l === "new" || !l, d = ht(), p = v(), { token: m } = G.useToken();
	s(() => {
		c && (X(d, c, u ? "add" : "change") || p(n, { replace: !0 }));
	}, [
		c,
		u,
		d,
		p,
		n
	]);
	let h = c ? X(d, c, u ? "add" : "change") : !0;
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
		children: /* @__PURE__ */ q(Wr, {
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
//#region src/crud/HiddenSources.tsx
var ci = t(/* @__PURE__ */ new Set());
function li(e, t, n) {
	return !!t || n.has(e);
}
function ui() {
	return o(ci);
}
function di({ sources: e, children: t }) {
	let n = l(() => e instanceof Set ? e : new Set(e), [e]);
	return n.size === 0 ? t : /* @__PURE__ */ q(ci.Provider, {
		value: n,
		children: t
	});
}
//#endregion
//#region src/crud/utils/nestedFieldPath.ts
function fi(e, t, n) {
	return `${e}.${t}.${n}`;
}
//#endregion
//#region src/crud/InlineFormSet.tsx
function pi(e, t) {
	let n = {};
	for (let r of e) Sr(n, r, t ? Q(t, r) : void 0);
	return n;
}
function mi(e, t, n) {
	let { control: r } = Me(), { fields: i, append: a, remove: o } = Ae({
		control: r,
		name: e,
		keyName: "rowKey"
	});
	return {
		fields: i,
		remove: o,
		appendEmpty: () => a(pi(t, n))
	};
}
function hi({ field: e, label: t, payloadKey: n, transformRows: r, columns: i, defaultRow: a }) {
	let o = l(() => i.map((e) => e.source), [i]), { fields: s, remove: c, appendEmpty: u } = mi(e, o, a);
	hr(e), br(e, o, n, r);
	let d = l(() => i.map((t) => ({
		title: t.label ?? t.source,
		key: t.source,
		width: t.width,
		onHeaderCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		onCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		render: (n, r, i) => t.cell({
			name: fi(e, i, t.source),
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
function gi({ field: e, label: t, payloadKey: n, transformRows: r, sources: i, renderRow: a, getCardTitle: o, footer: s, defaultRow: c }) {
	let { fields: l, remove: u, appendEmpty: d } = mi(e, i, c);
	return hr(e), br(e, i, n, r), /* @__PURE__ */ J("div", {
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
						name: (t) => fi(e, n, t)
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
function _i(e, t, n) {
	for (let r of e) if (t(r, n).invalid) return !0;
	return !1;
}
function vi(e) {
	let t = u([]);
	for (; t.current.length < e;) t.current.push({ current: /* @__PURE__ */ new Set() });
	return t.current.length > e && (t.current.length = e), t.current;
}
function yi(e, t) {
	let { control: n, getFieldState: r, setFocus: i } = Me(), a = Ne({ control: n }), o = u(0), c = u(0);
	s(() => {
		if (a.submitCount === 0) return;
		let n = Object.keys(a.errors).length, s = a.submitCount !== o.current, l = !s && n > 0 && c.current === 0;
		if (o.current = a.submitCount, c.current = n, !s && !l || n === 0) return;
		let u = e.findIndex((e) => _i(e.current, r, a));
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
function bi(e) {
	return null;
}
function xi(e) {
	return i(e) && e.type === bi;
}
function Si({ children: t, defaultActiveKey: n, activeKey: r, onChange: i, ...o }) {
	let { token: s } = G.useToken(), c = l(() => e.toArray(t).filter(xi).map((e, t) => ({
		key: e.key ?? String(t),
		label: e.props.label,
		disabled: e.props.disabled,
		children: e.props.children
	})), [t]), u = vi(c.length), f = r !== void 0, [p, m] = d(() => n ?? c[0]?.key ?? "0"), h = f ? r : p, g = a((e) => {
		f || m(e), i?.(e);
	}, [f, i]);
	yi(u, a((e) => {
		let t = c[e]?.key;
		t != null && g(t);
	}, [g, c]));
	let { control: _, getFieldState: v } = Me(), y = Ne({ control: _ });
	return /* @__PURE__ */ q(H, {
		destroyOnHidden: !1,
		items: l(() => c.map((e, t) => {
			let n = _i(u[t].current, v, y);
			return {
				key: e.key,
				label: n ? /* @__PURE__ */ q("span", {
					style: { color: s.colorError },
					children: e.label
				}) : e.label,
				disabled: e.disabled,
				children: /* @__PURE__ */ q(ur, {
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
function Ci(e) {
	return null;
}
function wi(e) {
	return i(e) && e.type === Ci;
}
function Ti({ children: t, initialStep: n = 0, showNavigation: r = !0, allowStepSelect: i = !1, stepsStyle: o, navigationStyle: s, size: c, direction: u, type: f, status: p }) {
	let m = l(() => e.toArray(t).filter(wi), [t]), h = vi(m.length), [g, _] = d(n), v = m.length - 1;
	yi(h, _);
	let { control: y, getFieldState: b } = Me(), x = Ne({ control: y }), S = l(() => m.map((e, t) => {
		let n = _i(h[t].current, b, x);
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
			children: /* @__PURE__ */ q(ur, {
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
//#region src/crud/utils/shouldRegisterSourceInPayload.ts
function Ei(e, t) {
	return t == null || t === e;
}
//#endregion
//#region src/crud/fields/FieldWrapper.tsx
function $({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, hidden: o, children: s }) {
	let c = t ?? e, l = Ei(e, t), u = li(e, o, ui()), { control: d } = Me(), f = cr(), p = a ? void 0 : n ?? e, m = n ?? e;
	return hr(e, l), gr(e, l), u ? /* @__PURE__ */ q(Oe, {
		name: c,
		control: d,
		render: () => /* @__PURE__ */ q(K, {})
	}) : /* @__PURE__ */ q(Oe, {
		name: c,
		control: d,
		rules: {
			required: r ? `${m} is required` : !1,
			...i
		},
		render: ({ field: e, fieldState: t }) => /* @__PURE__ */ q(j.Item, {
			label: p,
			validateStatus: t.error ? "error" : void 0,
			help: t.error?.message,
			required: r && !a,
			style: a ? { marginBottom: 0 } : void 0,
			children: s({
				value: e.value,
				onChange: e.onChange,
				onBlur: e.onBlur,
				disabled: f?.disabled,
				name: c
			})
		})
	});
}
//#endregion
//#region src/crud/fields/TextField.tsx
function Di({ source: e, name: t, label: n, required: r, rules: i, placeholder: a, inputStyle: o, hideLabel: s, hidden: c }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: s,
		hidden: c,
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
function Oi({ source: e, name: t, label: n, required: r, rules: i, placeholder: a, inputStyle: o, hideLabel: s, hidden: c, rows: l = 4, maxLength: u, showCount: d, autoSize: f }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: s,
		hidden: c,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(P.TextArea, {
			value: e,
			onChange: (e) => t(e.target.value),
			onBlur: n,
			placeholder: a,
			disabled: r,
			style: o,
			rows: f ? void 0 : l,
			maxLength: u,
			showCount: d,
			autoSize: f
		})
	});
}
//#endregion
//#region src/crud/fields/NumberField.tsx
function ki({ source: e, name: t, label: n, required: r, rules: i, min: a, max: o, step: s, inputStyle: c, hideLabel: l, hidden: u }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: l,
		hidden: u,
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
function Ai({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, hidden: o, disabled: s }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		hidden: o,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ q(se, {
			checked: !!e,
			onChange: t,
			disabled: n || s
		})
	});
}
//#endregion
//#region src/crud/utils/parseDayjsValue.ts
var ji = /* @__PURE__ */ We((/* @__PURE__ */ He(((e, t) => {
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
Fe.extend(ji.default);
function Mi(e, t) {
	if (e == null || e === "") return null;
	if (Fe.isDayjs(e)) return e;
	let n = Fe(String(e), t, !0);
	return n.isValid() ? n : Fe(String(e)).isValid() ? Fe(String(e)) : null;
}
//#endregion
//#region src/crud/fields/DateField.tsx
var Ni = "YYYY-MM-DD", Pi = `${Ni} HH:mm:ss`, Fi = [
	Ni,
	Pi,
	"YYYY-MM-DDTHH:mm:ss",
	"YYYY-MM-DDTHH:mm:ssZ"
];
function Ii({ source: e, name: t, label: n, required: r, rules: i, showTime: a, hideLabel: o, hidden: s }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		hidden: s,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(O, {
			value: Mi(e, a ? [...Fi, Pi] : Fi),
			onChange: (e) => t(e ? e.format(a ? Pi : Ni) : null),
			onBlur: n,
			showTime: a,
			disabled: r,
			format: a ? Pi : Ni,
			style: { width: "100%" }
		})
	});
}
//#endregion
//#region src/crud/fields/DateTimeField.tsx
function Li(e) {
	return /* @__PURE__ */ q(Ii, {
		showTime: !0,
		...e
	});
}
//#endregion
//#region src/crud/fields/TimeField.tsx
var Ri = "HH:mm:ss", zi = [
	Ri,
	"HH:mm",
	"H:mm:ss",
	"H:mm"
];
function Bi({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, hidden: o, format: s = Ri }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		hidden: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(le, {
			value: Mi(e, zi),
			onChange: (e) => t(e ? e.format(s) : null),
			onBlur: n,
			disabled: r,
			format: s,
			style: { width: "100%" }
		})
	});
}
//#endregion
//#region src/crud/fields/SelectField.tsx
function Vi({ source: e, name: t, label: n, required: r, rules: i, choices: a, mode: o, allowClear: s, hideLabel: c, hidden: l }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: c,
		hidden: l,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ q(z, {
			value: e,
			onChange: (e) => t(e ?? null),
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
function Hi({ source: e, name: t, label: n, required: r, rules: i, autoComplete: a, hideLabel: o, hidden: s }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		hidden: s,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ q(P.Password, {
			value: e,
			onChange: (e) => t(e.target.value),
			onBlur: n,
			disabled: r,
			autoComplete: a
		})
	});
}
function Ui({ source: e, name: t, label: n, required: r, rules: i, confirmSource: a, confirmLabel: o = "Confirm password", autoComplete: s = "new-password", hideLabel: c, hidden: l }) {
	let u = Pe({
		name: t ?? e,
		disabled: !a
	});
	return a ? /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ q(Hi, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		autoComplete: s,
		hideLabel: c,
		hidden: l
	}), /* @__PURE__ */ q(Hi, {
		source: a,
		label: o,
		required: r,
		autoComplete: s,
		hideLabel: c,
		rules: { validate: (e) => !u || e === u || "Passwords do not match" },
		hidden: l
	})] }) : /* @__PURE__ */ q(Hi, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		autoComplete: s,
		hideLabel: c,
		hidden: l
	});
}
//#endregion
//#region src/crud/utils/choiceSelectionUtils.ts
function Wi(e, t) {
	return typeof e == "object" && !!e && !Array.isArray(e) && t in e;
}
function Gi(e, t) {
	if (!(e == null || e === "")) {
		if (Wi(e, t)) {
			let n = e[t];
			return typeof n == "string" || typeof n == "number" ? n : void 0;
		}
		if (typeof e == "string" || typeof e == "number") return e;
	}
}
function Ki(e, t) {
	return Array.isArray(e) ? e.map((e) => Gi(e, t)).filter((e) => e != null) : [];
}
function qi(e, t) {
	return e == null ? [] : (Array.isArray(e) ? e : [e]).filter((e) => e != null && e !== "").map((e) => Wi(e, t) ? e[t] : e);
}
function Ji(e, t, n) {
	let r = [];
	if (t != null && (Array.isArray(t) ? r.push(...t.filter((e) => Wi(e, n))) : Wi(t, n) && r.push(t)), e == null) return r;
	let i = Array.isArray(e) ? e : [e];
	for (let e of i) Wi(e, n) && r.push(e);
	return r;
}
function Yi(e, t) {
	return typeof t == "function" ? t(e) : String(e[t] ?? "");
}
function Xi(e, t, n) {
	return e.map((e) => ({
		label: Yi(e, t),
		value: e[n],
		record: e
	}));
}
function Zi(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) n.set(t.value, t);
	for (let e of t) n.set(e.value, e);
	return Array.from(n.values());
}
function Qi(e, t) {
	return e.filter((e) => !t.some((t) => t.value === e));
}
function $i(e, t, n) {
	if (typeof t == "string") {
		if (e.length === 1 && t !== "") {
			let r = new Map(n);
			return r.set(e[0], t), r;
		}
		return new Map(n);
	}
	if (Array.isArray(t) && e.length === t.length) {
		let n = /* @__PURE__ */ new Map();
		for (let r = 0; r < e.length; r++) {
			let i = t[r], a = e[r];
			typeof i == "string" && a != null && a !== "" && n.set(a, i);
		}
		return n;
	}
	return new Map(n);
}
function ea(e, t) {
	let n = [];
	for (let r of e) {
		let e = t.get(r);
		typeof e == "string" && n.push({
			label: e,
			value: r
		});
	}
	return n;
}
function ta(e, t, n = []) {
	return Zi(n, e.filter((e) => t.some((t) => e.value === t)));
}
//#endregion
//#region src/crud/utils/resolveLabelSourcePath.ts
function na(e, t, n) {
	if (e.includes(".")) return e;
	let r = t || n, i = r.lastIndexOf(".");
	return i === -1 ? e : `${r.slice(0, i)}.${e}`;
}
//#endregion
//#region src/crud/utils/useFormPathValue.ts
function ra(e) {
	let { control: t, getValues: n } = Me(), r = Pe({ control: t });
	if (e) return Q(r && Object.keys(r).length > 0 ? r : n(), e);
}
function ia(e = {}) {
	let t = e.popupMatchSelectWidth ?? !1;
	return t === !1 ? {
		popupMatchSelectWidth: !1,
		styles: { popup: { root: { minWidth: e.popupMinWidth ?? 360 } } }
	} : { popupMatchSelectWidth: t };
}
//#endregion
//#region src/crud/utils/referenceSelectNotFoundContent.tsx
function aa(e) {
	return e ? /* @__PURE__ */ q(oe, { size: "small" }) : void 0;
}
//#endregion
//#region src/crud/utils/referenceSelectSelectedProps.ts
function oa(e, t, n) {
	return {
		loading: e || t,
		disabled: !!(n || t)
	};
}
function sa(e, t, n) {
	return e ? n : t;
}
//#endregion
//#region src/crud/utils/useChoices.ts
var ca = /* @__PURE__ */ new Map(), la = /* @__PURE__ */ new Map();
function ua(e, t) {
	return typeof e == "function" ? `fn:${t ?? ""}` : Array.isArray(e) ? `static:${e.length}` : `res:${e.resource}:${JSON.stringify(e.filter ?? {})}:${t ?? ""}`;
}
async function da(e, t, n, r, i) {
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
		label: Yi(e, n),
		value: e[r],
		record: e
	}));
}
function fa(e, t, n, r, i, a) {
	let o = ua(e, i);
	if (a) {
		let e = ca.get(o);
		if (e && !i) return Promise.resolve(e);
	}
	let s = la.get(o);
	if (s) return s;
	let c = da(e, t, n, r, i).then((e) => (a && !i && ca.set(o, e), e)).finally(() => {
		la.delete(o);
	});
	return la.set(o, c), c;
}
function pa(e, t, n = "name", r = "id", i, o = {}) {
	let { lazy: c = !1, active: f = !1, selectedValues: p, selectedRecords: m, selectedLabels: h, fetchSelected: g = !0, cache: _ } = o, v = _ ?? !c, y = Zt(), b = l(() => {
		if (e) return e;
		if (t) return {
			resource: t,
			filter: i ? { q: i } : void 0
		};
	}, [
		e,
		t,
		i
	]), x = b ? ua(b, i) : void 0, S = l(() => qi(p, r), [p, r]), C = l(() => Xi(Ji(p, m, r), n, r), [
		p,
		m,
		n,
		r
	]), w = u(/* @__PURE__ */ new Map()), T = l(() => (w.current = $i(S, h, w.current), ea(S, w.current)), [S, h]), E = l(() => Zi(C, T), [C, T]), D = !!(b && (!c || f || Array.isArray(b))), [O, k] = d(() => E.length ? E : !x || i || c || !v ? [] : ca.get(x) ?? []), [ee, A] = d(() => D ? !v || !x || i ? !!b : !ca.has(x) : !1), [j, M] = d(() => !!(g && t && Qi(S, E).length)), N = u(O);
	N.current = O;
	let P = u(S);
	P.current = S, s(() => {
		E.length && k((e) => Zi(e, E));
	}, [E]);
	let F = a(async () => {
		if (!b || !D) {
			b || k(E), A(!1);
			return;
		}
		if (v) {
			let e = ua(b, i), t = ca.get(e);
			if (t && !i) {
				k((e) => Zi(ta(e, P.current, E), t)), A(!1);
				return;
			}
		}
		A(!0), c && k((e) => ta(e, P.current, E));
		try {
			let e = await fa(b, y, n, r, i, v);
			k((t) => Zi(ta(t, P.current, E), e));
		} catch {
			!S.length && !E.length ? k([]) : c && k((e) => ta(e, P.current, E));
		} finally {
			A(!1);
		}
	}, [
		b,
		D,
		v,
		y,
		n,
		r,
		i,
		c,
		S.length,
		E
	]);
	s(() => {
		F();
	}, [F]), s(() => {
		c && !f && !i && (k((e) => ta(e, S, E)), A(!1));
	}, [
		c,
		f,
		i,
		E,
		S
	]), s(() => {
		if (!g || !t || !S.length) {
			M(!1);
			return;
		}
		let e = Qi(S, Zi(E, N.current));
		if (!e.length) {
			M(!1);
			return;
		}
		let i = !1;
		return M(!0), (async () => {
			let a = [];
			for (let i of e) try {
				let e = (await y.getOne(t, i)).data;
				a.push({
					label: Yi(e, n),
					value: e[r],
					record: e
				});
			} catch {
				a.push({
					label: String(i),
					value: i
				});
			}
			i || (a.length && k((e) => {
				let t = a.filter((t) => !e.some((e) => e.value === t.value));
				return t.length ? Zi(e, t) : e;
			}), M(!1));
		})(), () => {
			i = !0;
		};
	}, [
		g,
		t,
		y,
		n,
		r,
		S,
		E
	]);
	let I = a((e) => O.find((t) => t.value === e)?.label ?? String(e ?? "—"), [O]);
	return {
		options: O,
		loading: ee,
		selectedLoading: j,
		labelForValue: I,
		labelsForValues: a((e) => e?.length ? e.map((e) => I(e)).join(", ") : "—", [I]),
		optionForValue: a((e) => O.find((t) => t.value === e), [O]),
		reload: F
	};
}
//#endregion
//#region src/crud/fields/ReferenceInputActions.tsx
function ma({ reference: e, referenceForm: t, referencePermissions: n, referenceTitle: r, referenceDefaultValues: i, referenceModalWidth: a, selectedId: o, disabled: s, onCreated: c, onUpdated: l }) {
	let u = ht(), f = r ?? e, p = !!(e && t) && X(u, n, "add"), m = !!(e && t && o != null && o !== "") && X(u, n, "change"), [h, g] = d(null);
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
	}), e && t && h != null ? /* @__PURE__ */ q(Gr, {
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
function ha({ reference: e, choices: t, optionLabel: n = "name", optionValue: r = "id", search: i, allowClear: a, disabled: o, inputStyle: s, onValueChange: c, lazy: u = !0, fetchSelected: f = !0, value: p, onChange: m, fieldName: h, selectedRecords: g, selectedLabels: _, referenceForm: v, referencePermissions: y, referenceTitle: b, referenceDefaultValues: x, referenceModalWidth: S, referenceActions: C = !0, popupMatchSelectWidth: w, popupMinWidth: T }) {
	let [E, D] = d(), [O, k] = d(!1), ee = O || !!E, A = Gi(p, r), { options: j, loading: M, selectedLoading: N, optionForValue: P, reload: F } = pa(t, e, n, r, i ? E : void 0, {
		lazy: u,
		active: ee,
		selectedValues: p,
		selectedRecords: g,
		selectedLabels: _,
		fetchSelected: f
	}), I = oa(M, N, o), te = l(() => j.map((e) => ({
		label: e.label,
		value: e.value
	})), [j]), L = (e) => {
		let t = e[r];
		m(t), c?.(t, {
			label: Yi(e, n),
			value: t,
			record: e
		}, { name: h }), F();
	}, ne = /* @__PURE__ */ q(z, {
		...ia({
			popupMatchSelectWidth: w,
			popupMinWidth: T
		}),
		value: sa(N, A, void 0),
		onChange: (e) => {
			let t = e ?? null;
			m(t), c?.(t, P(e), { name: h });
		},
		options: te,
		loading: I.loading,
		notFoundContent: aa(I.loading),
		showSearch: i,
		filterOption: i ? !1 : void 0,
		onSearch: i ? D : void 0,
		onOpenChange: (e) => {
			k(e), e || D(void 0);
		},
		allowClear: a,
		disabled: I.disabled,
		optionFilterProp: "label",
		style: {
			width: "100%",
			minWidth: 160,
			...s
		}
	});
	return C ? /* @__PURE__ */ J("div", {
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
			children: ne
		}), /* @__PURE__ */ q(ma, {
			reference: e,
			referenceForm: v,
			referencePermissions: y,
			referenceTitle: b,
			referenceDefaultValues: x,
			referenceModalWidth: S,
			selectedId: A,
			disabled: I.disabled,
			onCreated: L,
			onUpdated: () => void F()
		})]
	}) : ne;
}
function ga({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: s, rules: c, search: l, allowClear: u, disabled: d, hideLabel: f, hidden: p, inputStyle: m, onValueChange: h, lazy: g = !0, recordSource: _, labelSource: v, fetchSelected: y = !0, referenceForm: b, referencePermissions: x, referenceTitle: S, referenceDefaultValues: C, referenceModalWidth: w, referenceActions: T = !0, popupMatchSelectWidth: E, popupMinWidth: D }) {
	let O = ra(_), k = ra(v ? na(v, t, e) : void 0);
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: s,
		rules: c,
		hideLabel: f,
		hidden: p,
		children: ({ value: e, onChange: t, disabled: n, name: s }) => /* @__PURE__ */ q(ha, {
			reference: r,
			choices: i,
			optionLabel: a,
			optionValue: o,
			search: l,
			allowClear: u,
			disabled: n || d,
			inputStyle: m,
			onValueChange: h,
			lazy: g,
			fetchSelected: y && !(v && k === void 0),
			value: e,
			onChange: t,
			fieldName: s,
			selectedRecords: _ ? O : void 0,
			selectedLabels: v ? k : void 0,
			referenceForm: b,
			referencePermissions: x,
			referenceTitle: S,
			referenceDefaultValues: C,
			referenceModalWidth: w,
			referenceActions: T,
			popupMatchSelectWidth: E,
			popupMinWidth: D
		})
	});
}
//#endregion
//#region src/crud/fields/ReferenceManyField.tsx
function _a({ reference: e, choices: t, optionLabel: n = "name", optionValue: r = "id", search: i, allowClear: a = !0, lazy: o = !0, fetchSelected: s = !0, value: c, onChange: u, disabled: f, selectedRecords: p, selectedLabels: m, referenceForm: h, referencePermissions: g, referenceTitle: _, referenceDefaultValues: v, referenceModalWidth: y, referenceActions: b = !0, popupMatchSelectWidth: x, popupMinWidth: S }) {
	let [C, w] = d(), [T, E] = d(!1), D = T || !!C, O = Ki(c, r), { options: k, loading: ee, selectedLoading: A, reload: j } = pa(t, e, n, r, i ? C : void 0, {
		lazy: o,
		active: D,
		selectedValues: c,
		selectedRecords: p,
		selectedLabels: m,
		fetchSelected: s
	}), M = oa(ee, A, f), N = l(() => k.map((e) => ({
		label: e.label,
		value: e.value
	})), [k]), P = /* @__PURE__ */ q(z, {
		...ia({
			popupMatchSelectWidth: x,
			popupMinWidth: S
		}),
		mode: "multiple",
		value: sa(A, O, []),
		onChange: (e) => u(e ?? []),
		options: N,
		loading: M.loading,
		notFoundContent: aa(M.loading),
		showSearch: i,
		filterOption: i ? !1 : void 0,
		onSearch: i ? w : void 0,
		onOpenChange: (e) => {
			E(e), e || w(void 0);
		},
		allowClear: a,
		disabled: M.disabled,
		optionFilterProp: "label",
		style: { width: "100%" }
	});
	return b ? /* @__PURE__ */ J("div", {
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
			children: P
		}), /* @__PURE__ */ q(ma, {
			reference: e,
			referenceForm: h,
			referencePermissions: g,
			referenceTitle: _,
			referenceDefaultValues: v,
			referenceModalWidth: y,
			disabled: M.disabled,
			onCreated: (e) => {
				let t = e[r], n = Array.isArray(O) ? O : [];
				if (n.some((e) => e === t)) {
					j();
					return;
				}
				u([...n, t]), j();
			}
		})]
	}) : P;
}
function va({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: s, rules: c, search: l, allowClear: u = !0, hideLabel: d, hidden: f, disabled: p, lazy: m = !0, recordSource: h, labelSource: g, fetchSelected: _ = !0, referenceForm: v, referencePermissions: y, referenceTitle: b, referenceDefaultValues: x, referenceModalWidth: S, referenceActions: C = !0, popupMatchSelectWidth: w, popupMinWidth: T }) {
	let E = ra(h), D = ra(g ? na(g, t, e) : void 0);
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: s,
		rules: c,
		hideLabel: d,
		hidden: f,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ q(_a, {
			reference: r,
			choices: i,
			optionLabel: a,
			optionValue: o,
			search: l,
			allowClear: u,
			lazy: m,
			fetchSelected: _ && !(g && D === void 0),
			value: e,
			onChange: t,
			disabled: n || p,
			selectedRecords: h ? E : void 0,
			selectedLabels: g ? D : void 0,
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
//#region src/crud/fields/uploadFieldUtils.ts
function ya(e) {
	return e instanceof File ? !0 : typeof e == "string" && e.length > 0;
}
function ba(e) {
	if (e instanceof File) return e.name;
	if (typeof e == "string" && e.length > 0) try {
		return new URL(e, "http://local").pathname.split("/").filter(Boolean).pop() || e;
	} catch {
		return e.split("/").filter(Boolean).pop() || e;
	}
}
//#endregion
//#region src/crud/fields/useUploadPreviewUrl.ts
function xa(e) {
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
function Sa({ value: e, onChange: t, disabled: n, clearable: r, accept: i = "image/*", previewWidth: a = 200 }) {
	let o = u(null), s = xa(e), c = r && ya(e);
	return /* @__PURE__ */ J(B, {
		orientation: "vertical",
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
function Ca({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, hidden: o, clearable: s, accept: c, previewWidth: l }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		hidden: o,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ q(Sa, {
			value: e,
			onChange: t,
			disabled: n,
			clearable: s,
			accept: c,
			previewWidth: l
		})
	});
}
//#endregion
//#region src/crud/fields/FileField.tsx
function wa({ value: e, onChange: t, disabled: n, clearable: r, accept: i }) {
	let a = u(null), o = ba(e), s = typeof e == "string" && e.length > 0 ? e : void 0, c = r && ya(e);
	return /* @__PURE__ */ J(B, {
		orientation: "vertical",
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
function Ta({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, hidden: o, clearable: s, accept: c }) {
	return /* @__PURE__ */ q($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		hidden: o,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ q(wa, {
			value: e,
			onChange: t,
			disabled: n,
			clearable: s,
			accept: c
		})
	});
}
//#endregion
//#region src/crud/utils/columnDataIndex.ts
function Ea(e) {
	return e.includes(".") ? e.split(".") : e;
}
//#endregion
//#region src/crud/columns/TextColumn.tsx
function Da({ source: e, label: t, sortable: n = !0 }) {
	return Xn(l(() => ({
		key: e,
		source: e,
		label: t,
		sortable: n,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: Ea(e),
			key: e,
			sorter: n ? !0 : void 0
		})
	}), [
		e,
		t,
		n
	])), null;
}
function Oa(e, t, n) {
	return typeof n == "function" ? n(e) : n ? Q(e, n) : Q(e, t);
}
//#endregion
//#region src/crud/columns/NumberColumn.tsx
function ka({ source: e, label: t, sortable: n = !0 }) {
	return Xn(l(() => ({
		key: e,
		source: e,
		label: t,
		sortable: n,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: Ea(e),
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
function Aa({ source: e, label: t, sortable: n = !0 }) {
	return Xn(l(() => ({
		key: e,
		source: e,
		label: t,
		sortable: n,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: Ea(e),
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
function ja({ source: e, label: t, sortable: n = !0 }) {
	return Xn(l(() => ({
		key: e,
		source: e,
		label: t,
		sortable: n,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: Ea(e),
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
function Ma({ record: e, source: t, display: n, reference: r, choices: i, optionLabel: a, optionValue: o }) {
	let { labelForValue: s } = pa(i, r, a, o), c = Q(e, t);
	if (typeof n == "function") return /* @__PURE__ */ q(K, { children: n(e) });
	if (n && n !== t) {
		let r = Oa(e, t, n);
		return /* @__PURE__ */ q(K, { children: r == null ? "—" : String(r) });
	}
	return /* @__PURE__ */ q(K, { children: s(c) });
}
function Na({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", display: o, sortable: s = !0 }) {
	return Xn(l(() => ({
		key: e,
		source: e,
		label: t,
		sortable: s,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: s ? !0 : void 0,
			render: (s, c) => /* @__PURE__ */ q(Ma, {
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
function Pa({ record: e, source: t, reference: n, choices: r, optionLabel: i, optionValue: a }) {
	let { labelsForValues: o } = pa(r, n, i, a), s = Q(e, t);
	return /* @__PURE__ */ q(K, { children: o(Array.isArray(s) ? s : []) });
}
function Fa({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", sortable: o = !1 }) {
	return Xn(l(() => ({
		key: e,
		source: e,
		label: t,
		sortable: o,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: e,
			key: e,
			sorter: o ? !0 : void 0,
			render: (t, o) => /* @__PURE__ */ q(Pa, {
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
function Ia({ source: e, label: t, sortable: n = !1, width: r = 40, height: i = 40, objectFit: a = "cover", borderRadius: o = 4, alt: s = "" }) {
	return Xn(l(() => ({
		key: e,
		source: e,
		label: t,
		sortable: n,
		buildColumn: () => ({
			title: t ?? e,
			dataIndex: Ea(e),
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
function La({ source: e, label: t, sortable: n = !1, render: r }) {
	return Xn(l(() => ({
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
function Ra({ source: e, label: t }) {
	return ar(l(() => ({
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
function za({ source: e, label: t }) {
	return ar(l(() => ({
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
function Ba({ source: e, label: t }) {
	return ar(l(() => ({
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
function Va({ source: e, label: t, choices: n, multiple: r }) {
	return ar(l(() => ({
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
function Ha({ source: e, label: t, reference: n, choices: r, optionLabel: i, optionValue: a, multiple: o, search: s, lazy: c = !0, fetchSelected: l = !0, popupMatchSelectWidth: u, popupMinWidth: f, value: p, onChange: m }) {
	let [h, g] = d(), [_, v] = d(!1), { options: y, loading: b, selectedLoading: x } = pa(r, n, i, a, s ? h : void 0, {
		lazy: c,
		active: _ || !!h,
		selectedValues: p,
		fetchSelected: l
	}), S = oa(b, x), C = p;
	return /* @__PURE__ */ q(z, {
		...ia({
			popupMatchSelectWidth: u,
			popupMinWidth: f
		}),
		allowClear: !0,
		mode: o ? "multiple" : void 0,
		placeholder: t ?? e,
		value: sa(x, C, o ? [] : void 0),
		onChange: m,
		options: y.map((e) => ({
			label: e.label,
			value: e.value
		})),
		loading: S.loading,
		disabled: S.disabled,
		notFoundContent: aa(S.loading),
		showSearch: s,
		filterOption: s ? !1 : void 0,
		onSearch: s ? g : void 0,
		onOpenChange: (e) => {
			v(e), e || g(void 0);
		},
		optionFilterProp: "label",
		style: { minWidth: 180 }
	});
}
function Ua({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", multiple: o, search: s, lazy: c = !0, fetchSelected: u = !0, popupMatchSelectWidth: d, popupMinWidth: f }) {
	return ar(l(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: l, onChange: p }) => /* @__PURE__ */ q(Ha, {
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
function Wa(e) {
	return /* @__PURE__ */ q(Ua, {
		...e,
		multiple: !0
	});
}
//#endregion
export { Jt as AdminApp, It as AdminLayout, Hn as AppHub, Un as AppLauncherButton, Ze as AppThemeProvider, Rn as AuthAlternateLink, zn as AuthPageLayout, lt as AuthProvider, Aa as BooleanColumn, Ai as BooleanField, za as BooleanFilter, La as CustomColumn, Qn as DEFAULT_TEXT_FILTER_DEBOUNCE_MS, Xt as DataProvider, ja as DateColumn, Ii as DateField, Ba as DateFilter, Li as DateTimeField, et as DensitySwitch, nn as EXPECTED_VALIDATION_BODY_HINT, $ as FieldWrapper, Ta as FileField, oi as FilterBar, Ci as FormStep, Ti as FormSteps, bi as FormTab, Si as FormTabs, Lt as Guard, zt as GuestOnly, di as HiddenSources, Ia as ImageColumn, Ca as ImageField, hi as InlineFormSet, gi as InlineFormSetStacked, Bn as LoginPage, ka as NumberColumn, ki as NumberField, Ra as NumberFilter, Ui as PasswordField, mt as PermissionsProvider, Vn as PlaceholderPage, Rt as Protected, Na as ReferenceColumn, ga as ReferenceField, Ua as ReferenceFilter, Fa as ReferenceManyColumn, va as ReferenceManyField, Wa as ReferenceManyFilter, Bt as RequirePermission, si as ResourceForm, Gr as ResourceFormModal, ii as ResourceList, Vi as SelectField, Va as SelectFilter, Oi as TextAreaField, Da as TextColumn, Di as TextField, tr as TextFilter, nt as ThemeSwitch, rt as ThemeToolbar, Bi as TimeField, jn as applyInMemoryListParams, Z as asStringMessages, Cr as buildFormPayload, wr as buildInlineRowsPayload, Nr as buildResourceFormSubmitBody, Ea as columnDataIndex, en as combineResourceHandlers, qt as createAdminRouter, Mn as createMemoryResourceHandlers, gt as createPermissionsChecker, Nn as createRestResourceHandlers, ft as createSessionStorageAuthAdapter, Gt as deriveAuthPaths, ln as describeNonStandardValidationBody, xt as filterFlatNavItems, Et as filterNavByPermission, yt as filterNavItems, kn as filterRows, _n as finalizeFormErrors, bt as flattenNavLeaves, gn as flattenNestedArrayErrors, fn as getErrorBody, Q as getFormValue, vt as getNavItemLabel, Vt as getRouteAccess, En as getRowById, Tr as hasUploadValues, tn as isAbortError, fi as nestedFieldPath, bn as parseDjangoDRFFormErrors, xn as parseDotNetFormErrors, Sn as parseNodeFormErrors, Ht as partitionAdminRoutes, Mr as prepareFormSubmitBody, mn as resolveErrorBody, na as resolveLabelSourcePath, Sr as setFormValue, Fn as toDjangoRestOrdering, jr as toFormData, Ln as toJsonApiSort, In as toODataOrderBy, Vr as useAbortableEffect, ut as useAuth, _t as useCan, pa as useChoices, Zt as useDataProvider, Qr as useListQueryState, ht as usePermissions, hr as useRegisterPayloadField, gr as useRegisterSectionField, ei as useResourceListContext, Qe as useThemeMode };
