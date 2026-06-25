import { Children as e, createContext as t, createElement as n, forwardRef as r, isValidElement as i, useCallback as a, useContext as o, useEffect as s, useMemo as c, useRef as l, useState as u } from "react";
import { Link as d, Navigate as f, Outlet as p, RouterProvider as m, createBrowserRouter as h, useLocation as g, useNavigate as _, useParams as v, useSearchParams as y } from "react-router-dom";
import { Alert as b, App as x, Avatar as S, Button as C, Card as w, ConfigProvider as T, DatePicker as E, Drawer as D, Dropdown as O, Flex as k, Form as A, Grid as j, Image as M, Input as N, InputNumber as P, Layout as F, Menu as ee, Modal as te, Popover as I, Segmented as ne, Select as L, Space as R, Spin as re, Steps as z, Switch as B, Table as ie, Tabs as V, Tooltip as H, Typography as U, theme as W } from "antd";
import { Fragment as G, jsx as K, jsxs as q } from "react/jsx-runtime";
import { ArrowLeftOutlined as ae, CaretDownOutlined as oe, CaretUpOutlined as se, ColumnHeightOutlined as ce, DeleteOutlined as le, DesktopOutlined as ue, EditOutlined as de, LayoutOutlined as fe, LogoutOutlined as pe, MenuOutlined as me, MoonOutlined as he, PaperClipOutlined as ge, PlusOutlined as _e, SearchOutlined as J, SettingOutlined as ve, SunOutlined as ye, UploadOutlined as be, UserOutlined as xe } from "@ant-design/icons";
import { Controller as Se, FormProvider as Ce, useFieldArray as we, useForm as Te, useFormContext as Ee, useFormState as De, useWatch as Oe } from "react-hook-form";
import ke from "dayjs";
//#region src/context/AppThemeProvider.tsx
var Ae = t(null);
function je(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "light" || t === "dark" || t === "system") return t;
	} catch {}
	return "system";
}
function Me() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function Ne(e) {
	try {
		let t = localStorage.getItem(e);
		if (t === "comfortable" || t === "compact") return t;
	} catch {}
	return "comfortable";
}
var Pe = "ding-react-admin-theme-mode", Fe = "ding-react-admin-theme-density";
function Ie({ children: e, modeStorageKey: t = Pe, densityStorageKey: n = Fe }) {
	let [r, i] = u(() => je(t)), [a, o] = u(() => Ne(n)), [l, d] = u(Me);
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
	return /* @__PURE__ */ K(Ae.Provider, {
		value: g,
		children: /* @__PURE__ */ K(T, {
			theme: h,
			children: e
		})
	});
}
function Le() {
	let e = o(Ae);
	if (!e) throw Error("useThemeMode must be used within AppThemeProvider");
	return e;
}
//#endregion
//#region src/components/DensitySwitch.tsx
var Re = [{
	label: "Comfortable",
	value: "comfortable",
	icon: /* @__PURE__ */ K(fe, {})
}, {
	label: "Compact",
	value: "compact",
	icon: /* @__PURE__ */ K(ce, {})
}];
function ze() {
	let { density: e, setDensity: t } = Le();
	return /* @__PURE__ */ K(ne, {
		size: "small",
		value: e,
		options: Re,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeSwitch.tsx
var Be = [
	{
		label: "Light",
		value: "light",
		icon: /* @__PURE__ */ K(ye, {})
	},
	{
		label: "Dark",
		value: "dark",
		icon: /* @__PURE__ */ K(he, {})
	},
	{
		label: "Auto",
		value: "system",
		icon: /* @__PURE__ */ K(ue, {})
	}
];
function Ve() {
	let { mode: e, setMode: t } = Le();
	return /* @__PURE__ */ K(ne, {
		size: "small",
		value: e,
		options: Be,
		onChange: (e) => t(e)
	});
}
//#endregion
//#region src/components/ThemeToolbar.tsx
function He() {
	let { token: e } = W.useToken();
	return /* @__PURE__ */ K(I, {
		placement: j.useBreakpoint().lg ? "bottomRight" : "bottom",
		trigger: "click",
		content: /* @__PURE__ */ q(R, {
			orientation: "vertical",
			size: "middle",
			style: {
				minWidth: 240,
				maxWidth: "min(92vw, 320px)"
			},
			children: [/* @__PURE__ */ K(Ve, {}), /* @__PURE__ */ K(ze, {})]
		}),
		styles: { content: { padding: e.paddingSM } },
		children: /* @__PURE__ */ K(C, {
			type: "default",
			icon: /* @__PURE__ */ K(ve, {}),
			"aria-label": "Display and theme settings"
		})
	});
}
//#endregion
//#region src/components/NavMenuSearch.tsx
function Ue({ value: e, onChange: t, placeholder: n = "Search menu…", variant: r = "on-dark" }) {
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
				prefix: /* @__PURE__ */ K(J, { style: { color: a ? "rgba(255, 255, 255, 0.45)" : i.colorTextDescription } }),
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
var We = r(function({ children: e, className: t, style: n, variant: r = "default" }, i) {
	let { token: a } = W.useToken(), o = r === "on-dark" ? "rgba(255, 255, 255, 0.22)" : a.colorTextQuaternary, s = r === "on-dark" ? "rgba(255, 255, 255, 0.38)" : a.colorTextTertiary;
	return /* @__PURE__ */ K("div", {
		ref: i,
		className: ["ding-admin-scroll", t].filter(Boolean).join(" "),
		style: {
			...n,
			"--ding-scroll-thumb": o,
			"--ding-scroll-thumb-hover": s
		},
		children: e
	});
}), Ge = t(null), Ke = "User";
function qe(e) {
	return e.getUserLabel?.() ?? Ke;
}
function Je({ children: e, adapter: t }) {
	let [n, r] = u(() => t.getToken()), [i, o] = u(() => qe(t)), s = a(async (e) => {
		await t.login(e), r(t.getToken()), o(qe(t));
	}, [t]), l = a(() => {
		t.logout(), r(t.getToken()), o(qe(t));
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
	return /* @__PURE__ */ K(Ge.Provider, {
		value: d,
		children: e
	});
}
function Ye() {
	let e = o(Ge);
	if (!e) throw Error("useAuth must be used within AuthProvider");
	return e;
}
var Xe = "ding-react-admin-auth";
function Ze(e = Xe) {
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
var Qe = t(null);
function $e({ children: e, can: t }) {
	let n = c(() => t, [t]);
	return /* @__PURE__ */ K(Qe.Provider, {
		value: n,
		children: e
	});
}
function Y() {
	let e = o(Qe);
	if (!e) throw Error("usePermissions must be used within PermissionsProvider");
	return e;
}
function et(e) {
	return (t) => e()?.includes(t) ?? !1;
}
function tt(e) {
	let t = Y();
	return a(() => t(e), [t, e]);
}
//#endregion
//#region src/layouts/navFilter.ts
function nt(e) {
	let { label: t } = e;
	return typeof t == "string" ? t : typeof t == "number" ? String(t) : "";
}
function rt(e, t) {
	let n = t.trim().toLowerCase();
	if (!n) return e;
	function r(e) {
		let t = [];
		for (let i of e) {
			let e = nt(i).toLowerCase().includes(n);
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
function it(e) {
	let t = [];
	function n(e) {
		for (let r of e) r.children?.length && (t.push(r.path), n(r.children));
	}
	return n(e), t;
}
//#endregion
//#region src/components/NavMenuLabel.tsx
function at({ label: e, title: t }) {
	return t ? /* @__PURE__ */ K(H, {
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
function ot(e, t) {
	let n = t?.showLabelTooltip !== !1;
	return e.map((e) => {
		let r = e.Icon, i = r ? /* @__PURE__ */ K(r, {}) : void 0, a = nt(e), o = a && n ? /* @__PURE__ */ K(at, {
			label: e.label,
			title: a
		}) : e.label, s = !n && a ? { title: a } : {};
		return e.children?.length ? {
			key: e.path,
			icon: i,
			label: o,
			...s,
			children: ot(e.children, t)
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
function st(e, t) {
	return e.map((e) => {
		if (e.children?.length) {
			let n = st(e.children, t);
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
var ct = "#001529", lt = "ding-react-admin-sider-collapsed";
function ut(e) {
	try {
		return localStorage.getItem(e) === "1";
	} catch {
		return !1;
	}
}
function dt() {
	return j.useBreakpoint().lg !== !0;
}
function ft(e) {
	let t = /* @__PURE__ */ new Set();
	function n(e) {
		for (let r of e) r.children?.length ? n(r.children) : t.add(r.path);
	}
	return n(e), t;
}
function pt(e, t) {
	function n(e) {
		for (let r of e) if (r.children?.length) {
			let e = n(r.children);
			if (e !== null) return [r.path, ...e];
		} else if (r.path === t) return [];
		return null;
	}
	return n(e) ?? [];
}
function mt({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a, navQuery: o, onNavQueryChange: s, showNavSearch: c, navSearchPlaceholder: l, scrollVariant: u, searchVariant: d }) {
	return /* @__PURE__ */ q(G, { children: [c && !n ? /* @__PURE__ */ K(Ue, {
		value: o,
		onChange: s,
		placeholder: l,
		variant: d
	}) : null, /* @__PURE__ */ K(We, {
		variant: u,
		style: {
			flex: 1,
			minHeight: 0,
			overflowY: "auto",
			overflowX: "hidden"
		},
		children: /* @__PURE__ */ K(ht, {
			menuItems: e,
			selectedKeys: t,
			inlineCollapsed: n,
			openKeys: r,
			onOpenChange: i,
			onNavigate: a
		})
	})] });
}
function ht({ menuItems: e, selectedKeys: t, inlineCollapsed: n, openKeys: r, onOpenChange: i, onNavigate: a }) {
	return /* @__PURE__ */ K(ee, {
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
function gt({ navItems: e, brand: t = "Admin", collapsedBrand: n = "A", mobileDrawerTitle: r, headerExtras: i, userMenuItems: o, onUserMenuClick: d, loginPath: f = "/login", siderCollapsedStorageKey: m = lt, navSearch: h = !0 }) {
	let v = _(), y = g(), { resolved: b } = Le(), x = b === "dark", { logout: w, userLabel: T } = Ye(), E = Y(), [k, A] = u(() => ut(m)), [j, M] = u(!1), N = dt(), { token: P } = W.useToken(), ee = l(null), [te, I] = u(""), ne = h !== !1, L = typeof h == "object" ? h.placeholder : void 0, R = r ?? t, re = () => {
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
		ee.current?.scrollTo({
			top: 0,
			left: 0
		});
	}, [y.pathname]), s(() => {
		k && I("");
	}, [k]);
	let B = c(() => st(e, E), [e, E]), ie = te.trim(), V = ie.length > 0, H = c(() => V ? rt(B, ie) : B, [
		B,
		ie,
		V
	]), G = c(() => ft(H), [H]), ae = c(() => ot(H, { showLabelTooltip: !k }), [H, k]), oe = c(() => it(H), [H]), se = c(() => pt(B, y.pathname), [B, y.pathname]), [ce, le] = u(() => pt(B, y.pathname));
	s(() => {
		le((e) => [...new Set([...e, ...se])]);
	}, [se]);
	let ue = a((e) => {
		le(e);
	}, []), de = V ? oe : ce, fe = a((e) => {
		I(e);
	}, []), he = c(() => [{
		key: "logout",
		icon: /* @__PURE__ */ K(pe, {}),
		label: "Log out",
		danger: !0
	}], []), ge = o ?? he, _e = (e) => {
		if (d) {
			d(e);
			return;
		}
		e.key === "logout" && re();
	}, J = x ? P.colorBgContainer : ct, ve = x ? "default" : "on-dark", ye = x ? "app" : "on-dark", be = [y.pathname], Se = (e) => {
		G.has(e) && (v(e), N && M(!1));
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
					}), /* @__PURE__ */ K(mt, {
						menuItems: ae,
						selectedKeys: be,
						inlineCollapsed: k,
						openKeys: de,
						onOpenChange: ue,
						onNavigate: Se,
						navQuery: te,
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
					children: /* @__PURE__ */ K(mt, {
						menuItems: ae,
						selectedKeys: be,
						inlineCollapsed: !1,
						openKeys: de,
						onOpenChange: ue,
						onNavigate: Se,
						navQuery: te,
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
							icon: /* @__PURE__ */ K(me, {}),
							onClick: () => M(!0),
							"aria-label": "Open navigation"
						}),
						/* @__PURE__ */ K("div", { style: {
							flex: 1,
							minWidth: 0
						} }),
						i,
						/* @__PURE__ */ K(He, {}),
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
									icon: /* @__PURE__ */ K(xe, {})
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
					children: /* @__PURE__ */ K(We, {
						ref: ee,
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
function _t({ when: e, redirect: t, children: n }) {
	return e ? n : /* @__PURE__ */ K(f, {
		to: t,
		replace: !0
	});
}
function vt({ children: e, redirectTo: t = "/login" }) {
	let { isAuthenticated: n } = Ye();
	return /* @__PURE__ */ K(_t, {
		when: n,
		redirect: t,
		children: e
	});
}
function yt({ children: e, redirectTo: t = "/" }) {
	let { isAuthenticated: n } = Ye();
	return /* @__PURE__ */ K(_t, {
		when: !n,
		redirect: t,
		children: e
	});
}
function bt({ permission: e, redirect: t, children: n }) {
	return /* @__PURE__ */ K(_t, {
		when: Y()(e),
		redirect: t,
		children: n
	});
}
//#endregion
//#region src/router/routeAccess.ts
function xt(e) {
	return e.access ?? "protected";
}
function St(e) {
	let t = [], n = [], r = [];
	for (let i of e) {
		let e = xt(i);
		e === "guest" ? t.push(i) : e === "public" ? n.push(i) : r.push(i);
	}
	return {
		guest: t,
		public: n,
		protected: r
	};
}
function Ct(e) {
	return e.replace(/^\/+/, "");
}
function wt(e) {
	return `/${Ct(e)}`;
}
function Tt(e, t) {
	let { guest: n, protected: r } = St(e), i = n.find((e) => "path" in e && e.path), a = r.find((e) => "index" in e && e.index), o = r.find((e) => "path" in e && e.path), s = t?.unauthenticated;
	!s && i && "path" in i && i.path && (s = wt(i.path));
	let c = t?.afterLogin;
	if (c || (a ? c = "/" : o && "path" in o && o.path && (c = wt(o.path))), r.length > 0 && !s) throw Error("createAdminRouter: protected routes require redirects.unauthenticated or a guest route (access: \"guest\").");
	if (n.length > 0 && !c) throw Error("createAdminRouter: guest routes require redirects.afterLogin or a protected route (index or path).");
	return {
		loginPath: s ?? "/",
		homePath: c ?? "/"
	};
}
function Et(e) {
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
function Dt({ navItems: e, children: t, layoutProps: n, redirects: r }) {
	let { loginPath: i, homePath: a } = Tt(t, r), { guest: o, public: s, protected: c } = St(t), l = [];
	for (let e of o) !("path" in e) || !e.path || l.push({
		path: Ct(e.path),
		element: /* @__PURE__ */ K(yt, {
			redirectTo: a,
			children: e.element
		})
	});
	for (let e of s) !("path" in e) || !e.path || l.push({
		path: Ct(e.path),
		element: e.element
	});
	return c.length > 0 && l.push({
		path: "/",
		element: /* @__PURE__ */ K(vt, {
			redirectTo: i,
			children: /* @__PURE__ */ K(gt, {
				navItems: e,
				loginPath: i,
				...n
			})
		}),
		children: c.map(Et)
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
function Ot({ navItems: e, routes: t, authRedirects: n, layoutProps: r, theme: i }) {
	let a = c(() => Dt({
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
	return /* @__PURE__ */ K(Ie, {
		...i,
		children: /* @__PURE__ */ K(m, { router: a })
	});
}
//#endregion
//#region src/context/DataProvider.tsx
var kt = t(null);
function At({ children: e, value: t }) {
	let n = c(() => t, [t]);
	return /* @__PURE__ */ K(kt.Provider, {
		value: n,
		children: e
	});
}
function jt() {
	let e = o(kt);
	if (!e) throw Error("useDataProvider must be used within DataProvider");
	return e;
}
//#endregion
//#region src/data/resourceHandlers.ts
function Mt(e) {
	return "handlers" in e ? e : { handlers: e };
}
function Nt(e, t, n) {
	if (!(!e || !t) && !X(e, t, n)) throw Error("Forbidden");
}
function Pt(e, t) {
	let { can: n, guard: r, parseFormError: i } = t ?? {}, a = (t) => {
		let n = e[t];
		if (!n) throw Error(`Unknown resource: ${t}`);
		return Mt(n);
	};
	return {
		async getList(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "list"), Nt(n, o, "list"), i.getList(t);
		},
		async getOne(e, t, i) {
			let { handlers: o, permissions: s } = a(e);
			return r?.(e, "read"), Nt(n, s, "read"), o.getOne(t, i);
		},
		async create(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "add"), Nt(n, o, "add"), i.create(t);
		},
		async update(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "change"), Nt(n, o, "change"), i.update(t);
		},
		async delete(e, t) {
			let { handlers: i, permissions: o } = a(e);
			return r?.(e, "delete"), Nt(n, o, "delete"), i.delete(t);
		},
		parseFormError: i
	};
}
//#endregion
//#region src/data/abortError.ts
function Ft(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return t.name === "AbortError" || t.name === "CanceledError" || t.code === "ERR_CANCELED";
}
//#endregion
//#region src/data/parseFormErrorHelpers.ts
var It = "Expected HTTP 400 with a JSON object such as `{ \"field_name\": [\"message\"] }` or `{ \"non_field_errors\": [\"message\"] }`.", Lt = 300;
function Z(e) {
	if (typeof e == "string") return [e];
	if (Array.isArray(e)) {
		let t = e.filter((e) => typeof e == "string");
		if (t.length) return t;
	}
	return [];
}
function Rt(e) {
	return e.length === 1 ? e[0] : e;
}
function zt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Bt(e) {
	return typeof Response < "u" && e instanceof Response ? !0 : typeof e == "object" && !!e && typeof e.json == "function" && typeof e.status == "number" && e.headers != null;
}
function Vt(e, t) {
	if (t) return t;
	if (e === null) return "(no JSON body)";
	try {
		let t = JSON.stringify(e);
		return t.length > Lt ? `${t.slice(0, Lt)}…` : t;
	} catch {
		return String(e);
	}
}
function Ht(e, t) {
	return `Non-standard validation response. ${It} Received: ${Vt(e, t?.hint)}`;
}
function Ut(e) {
	if (!e || typeof e != "object") return null;
	let t = e.response;
	if (!t || typeof t != "object") return null;
	let n = t.status;
	return typeof n == "number" && (n === 400 || n === 422) ? n : null;
}
function Wt(e) {
	if (!e || typeof e != "object") return null;
	let t = e.response;
	return Bt(t) ? t.headers.get("content-type") : null;
}
function Gt(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (zt(t.body)) return t.body;
	if (zt(t.data)) return t.data;
	let n = t.response;
	if (n && typeof n == "object" && !Array.isArray(n)) {
		let e = n.data;
		if (zt(e)) return e;
	}
	return null;
}
function Kt(e) {
	if (zt(e)) return e;
	if (Array.isArray(e)) {
		let t = Z(e);
		return t.length ? { non_field_errors: Rt(t) } : null;
	}
	return null;
}
async function qt(e) {
	let t = Gt(e);
	if (t) return t;
	if (!e || typeof e != "object") return null;
	let n = e.response;
	if (!Bt(n)) return null;
	let r = n.headers.get("content-type");
	if (!r || !/application\/json/i.test(r)) return null;
	try {
		return Kt(await n.clone().json());
	} catch {
		return null;
	}
}
function Jt(e) {
	return Array.isArray(e) ? e.some((e) => e && typeof e == "object" && !Array.isArray(e) && Object.values(e).some((e) => Z(e).length > 0)) : !1;
}
function Yt(e, t, n) {
	t.forEach((t, r) => {
		if (!(!t || typeof t != "object" || Array.isArray(t))) for (let [i, a] of Object.entries(t)) {
			let t = Z(a);
			t.length && (n[`${e}.${r}.${i}`] = Rt(t));
		}
	});
}
function Xt(e, t) {
	return {
		fields: Object.keys(e).length ? e : void 0,
		global: t.length ? t : void 0
	};
}
var Zt = new Set(["non_field_errors", "detail"]);
function Qt(e) {
	let t = {}, n = [];
	for (let [r, i] of Object.entries(e)) {
		if (Zt.has(r)) {
			n.push(...Z(i));
			continue;
		}
		if (Jt(i)) {
			Yt(r, i, t);
			continue;
		}
		let e = Z(i);
		e.length && (t[r] = Rt(e));
	}
	return !Object.keys(t).length && !n.length ? null : Xt(t, n);
}
function $t(e, t) {
	let n = Gt(e);
	return n ? Qt(n) : null;
}
function en(e, t, n) {
	let r = Gt(e);
	if (!r) return null;
	let i = n?.camelCase ?? !0, a = n?.fieldMap, o = {}, s = [];
	n?.includeSummary && (s.push(...Z(r.title)), s.push(...Z(r.message)));
	let c = r.errors;
	if (c && typeof c == "object" && !Array.isArray(c)) for (let [e, t] of Object.entries(c)) {
		let n = a?.[e] ?? (i ? rn(e) : e), r = Z(t);
		r.length && (o[n] = Rt(r));
	}
	return !Object.keys(o).length && !s.length ? null : Xt(o, s);
}
function tn(e, t, n) {
	let r = Gt(e);
	if (!r) return null;
	let i = {}, a = [], o = n?.fieldMap, s = r.errors;
	if (Array.isArray(s)) for (let e of s) {
		if (!e || typeof e != "object") continue;
		let t = e, n = typeof t.path == "string" && t.path || typeof t.param == "string" && t.param || typeof t.field == "string" && t.field, r = Z(t.msg)[0] ?? Z(t.message)[0];
		r && (n ? nn(i, o?.[n] ?? n, r) : a.push(r));
	}
	else if (s && typeof s == "object") for (let [e, t] of Object.entries(s)) {
		let n = o?.[e] ?? e, r = Z(t);
		r.length && (i[n] = Rt(r));
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
	return a.push(...Z(r.error)), !Object.keys(i).length && !a.length ? null : Xt(i, a);
}
function nn(e, t, n) {
	let r = e[t];
	if (!r) {
		e[t] = n;
		return;
	}
	e[t] = Array.isArray(r) ? [...r, n] : [r, n];
}
function rn(e) {
	return e && e.charAt(0).toLowerCase() + e.slice(1);
}
//#endregion
//#region src/data/inMemoryList.ts
function an(e, t) {
	return e === t || String(e) === String(t);
}
function on(e, t) {
	let n = e.find((e) => an(e.id, t));
	if (!n) throw Error("Not found");
	return n;
}
function sn(e, t) {
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
function cn(e, t) {
	return t == null || t === "" ? !0 : Array.isArray(t) ? t.length === 0 ? !0 : Array.isArray(e) ? t.some((t) => e.includes(t)) : t.includes(e) : Array.isArray(e) ? e.includes(t) : typeof t == "string" && typeof e == "string" ? e.toLowerCase().includes(t.toLowerCase()) : e === t;
}
function ln(e, t) {
	return t ? e.filter((e) => Object.entries(t).every(([t, n]) => cn(e[t], n))) : e;
}
function un(e, t, n) {
	let r = (t - 1) * n;
	return {
		data: e.slice(r, r + n),
		total: e.length
	};
}
function dn(e, t) {
	let { pagination: n, sort: r, filter: i } = t, a = ln(e, i);
	if (r) {
		let e = Array.isArray(r) ? r : [r];
		e.length > 0 && e[0]?.field && (a = sn(a, e));
	}
	return n ? un(a, n.page, n.perPage) : {
		data: a,
		total: a.length
	};
}
//#endregion
//#region src/data/createMemoryResourceHandlers.ts
function fn(e) {
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
			return dn(t(e.scopeList ? e.scopeList(e.getRows(), n) : e.getRows()), n);
		},
		async getOne(t, n) {
			return { data: on(e.getRows(), t) };
		},
		async create(t) {
			let r = n(t, e.nextId());
			return e.getRows().push(r), { data: r };
		},
		async update({ id: t, data: n }) {
			let i = on(e.getRows(), t), a = r(i, n);
			return Object.assign(i, a), { data: i };
		},
		async delete(t) {
			let n = e.getRows(), r = n.findIndex((e) => an(e.id, t));
			if (r < 0) return { data: null };
			let [i] = n.splice(r, 1);
			return e.afterDelete?.(i), { data: i };
		}
	};
}
//#endregion
//#region src/data/createRestResourceHandlers.ts
function pn(e) {
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
function mn(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function hn(e) {
	let t = mn(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function gn(e) {
	let t = mn(e);
	if (t.length !== 0) return t.map((e) => `${e.field} ${e.order === "DESC" ? "desc" : "asc"}`).join(",");
}
function _n(e) {
	let t = mn(e);
	if (t.length !== 0) return t.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
//#endregion
//#region src/components/AuthAlternateLink.tsx
function vn({ prompt: e, linkText: t, to: n }) {
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
function yn({ children: e, brand: t, footer: n, showThemeToolbar: r = !0 }) {
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
				children: /* @__PURE__ */ K(He, {})
			}) : null,
			t ? /* @__PURE__ */ K("div", {
				style: {
					flexShrink: 0,
					textAlign: "center",
					padding: "0 24px 16px"
				},
				children: t
			}) : null,
			/* @__PURE__ */ K(We, {
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
function bn({ title: e = "Sign in", description: t = "Use any username and password to continue.", logo: n, brand: r, extraFields: i, showThemeToolbar: a = !0, afterLoginPath: o = "/", alternateAuth: s, footer: c }) {
	let { login: l } = Ye(), u = _();
	return /* @__PURE__ */ K(yn, {
		brand: r ?? n,
		footer: c ?? (s ? /* @__PURE__ */ K(vn, {
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
function xn({ title: e }) {
	return /* @__PURE__ */ K(U.Title, {
		level: 3,
		style: { marginTop: 0 },
		children: e
	});
}
//#endregion
//#region src/crud/utils/sortQueryParam.ts
function Sn(e) {
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
function Cn(e) {
	return e.length === 0 ? null : e.map((e) => e.order === "DESC" ? `-${e.field}` : e.field).join(",");
}
function wn(e) {
	return new Map(e.map((e, t) => [e.field, t + 1]));
}
//#endregion
//#region src/crud/context/ListContext.tsx
var Tn = t(null);
function En({ children: e, toggleSort: t, sort: n }) {
	let [r, i] = u([]), o = c(() => new Set(n.map((e) => e.field)), [n]), s = c(() => new Map(n.map((e) => [e.field, e.order])), [n]), l = c(() => wn(n), [n]), d = a((e) => (i((t) => {
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
	return /* @__PURE__ */ K(Tn.Provider, {
		value: f,
		children: e
	});
}
function Dn() {
	let e = o(Tn);
	if (!e) throw Error("Column components must be used within ResourceList");
	return e;
}
function Q(e) {
	let { registerColumn: t } = Dn();
	s(() => t(e), [t, e]);
}
//#endregion
//#region src/crud/context/FilterContext.tsx
var On = t(null);
function kn({ children: e, values: t, setFilterValue: n }) {
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
	return /* @__PURE__ */ K(On.Provider, {
		value: s,
		children: e
	});
}
function An() {
	return o(On);
}
function jn(e) {
	let t = An()?.registerFilter;
	s(() => {
		if (t) return t(e);
	}, [t, e]);
}
//#endregion
//#region src/crud/context/FormContext.tsx
var Mn = t(null);
function Nn({ children: e, resource: t, isNew: n, disabled: r }) {
	return /* @__PURE__ */ K(Mn.Provider, {
		value: {
			resource: t,
			isNew: n,
			disabled: r
		},
		children: e
	});
}
function Pn() {
	return o(Mn);
}
//#endregion
//#region src/crud/context/FormSectionContext.tsx
var Fn = t(null);
function In({ sourcesRef: e, children: t }) {
	return /* @__PURE__ */ K(Fn.Provider, {
		value: e,
		children: t
	});
}
function Ln() {
	return o(Fn);
}
//#endregion
//#region src/crud/context/PayloadFieldsContext.tsx
var Rn = t(null);
function zn({ children: e, fieldsRef: t }) {
	return /* @__PURE__ */ K(Rn.Provider, {
		value: t,
		children: e
	});
}
function Bn() {
	return o(Rn);
}
function Vn(e, t = !0) {
	let n = Bn();
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
function Hn(e, t = !0) {
	let n = Ln();
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
var Un = t(null);
function Wn({ children: e, registryRef: t }) {
	return /* @__PURE__ */ K(Un.Provider, {
		value: t,
		children: e
	});
}
function Gn() {
	return o(Un);
}
function Kn(e, t, n, r, i = !0) {
	let a = Gn();
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
function qn({ errors: e }) {
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
function Jn(e, t) {
	let n = t.split("."), r = e;
	for (let e of n) {
		if (typeof r != "object" || !r) return;
		r = r[e];
	}
	return r;
}
//#endregion
//#region src/crud/utils/setFormValue.ts
function Yn(e, t, n) {
	let r = t.split("."), i = e;
	for (let e = 0; e < r.length - 1; e++) {
		let t = r[e], n = i[t];
		(typeof n != "object" || !n || Array.isArray(n)) && (i[t] = {}), i = i[t];
	}
	i[r[r.length - 1]] = n;
}
//#endregion
//#region src/crud/utils/buildFormPayload.ts
function Xn(e, t) {
	if (t.length === 0) return { ...e };
	let n = {};
	for (let r of t) {
		let t = Jn(e, r);
		t !== void 0 && Yn(n, r, t);
	}
	return n;
}
//#endregion
//#region src/crud/utils/buildInlineRowsPayload.ts
function Zn(e, t, n) {
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
function Qn(e) {
	return e instanceof Blob ? !0 : Array.isArray(e) ? e.some(Qn) : e && typeof e == "object" ? Object.values(e).some(Qn) : !1;
}
//#endregion
//#region src/crud/utils/uploadReferenceUtils.ts
function $n(e) {
	return /^https?:\/\//i.test(e) || e.startsWith("/media/");
}
function er(e, t) {
	if (!t) return e;
	if (typeof e == "string") return $n(e) ? void 0 : e;
	if (Array.isArray(e)) return e.map((e) => er(e, t)).filter((e) => e !== void 0);
	if (e && typeof e == "object" && !(e instanceof Blob)) {
		let n = {};
		for (let [r, i] of Object.entries(e)) {
			let e = er(i, t);
			e !== void 0 && (n[r] = e);
		}
		return n;
	}
	return e;
}
function tr(e, t = !0) {
	return er(e, t);
}
//#endregion
//#region src/crud/utils/toFormData.ts
function nr(e, t, n, r) {
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
			if (r.skipExistingUploadUrls && $n(n)) return;
			e.append(t, n);
			return;
		}
		if (Array.isArray(n)) {
			n.forEach((n, i) => {
				nr(e, `${t}[${i}]`, n, r);
			});
			return;
		}
		if (typeof n == "object") {
			for (let [i, a] of Object.entries(n)) nr(e, `${t}[${i}]`, a, r);
			return;
		}
		e.append(t, String(n));
	}
}
function rr(e, t) {
	let n = { skipExistingUploadUrls: t?.skipExistingUploadUrls ?? !0 }, r = new FormData();
	for (let [t, i] of Object.entries(e)) nr(r, t, i, n);
	return r;
}
//#endregion
//#region src/crud/utils/prepareFormSubmitBody.ts
function ir(e, t) {
	let n = t?.skipExistingUploadUrls ?? !0;
	return Qn(e) ? rr(e, t) : tr(e, n);
}
//#endregion
//#region src/crud/utils/buildResourceFormSubmitBody.ts
function ar(e, t, n, r) {
	let i = Xn(e, t);
	if (n) for (let t of n) {
		let n = e[t.field], r = t.payloadKey ?? t.field;
		i[r] = Zn(n, t.sources, { transformRows: t.transformRows });
	}
	return ir(i, r);
}
//#endregion
//#region src/crud/utils/formErrors.ts
function or(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function sr(e) {
	return Array.isArray(e) ? e.join(", ") : e;
}
function cr(e, t, n) {
	if (t.has(e)) return !0;
	let r = e.match(/^([^.]+)\.(\d+)\.([^.]+)$/);
	if (!r) return !1;
	let [, i, , a] = r;
	return n.get(i)?.sources.includes(a) ?? !1;
}
function lr(e, t, n) {
	let r = {}, i = [...or(e.global)];
	for (let [a, o] of Object.entries(e.fields ?? {})) cr(a, t, n) ? r[a] = o : i.push(sr(o));
	return {
		fieldErrors: r,
		globalErrors: i
	};
}
function ur(e, t) {
	for (let [n, r] of Object.entries(t)) e.setError(n, {
		type: "server",
		message: sr(r)
	});
}
function dr(e) {
	let t = Wt(e);
	if (t && !/application\/json/i.test(t)) return `non-JSON response (Content-Type: ${t})`;
}
async function fr(e, t, n, r, i) {
	let a = await qt(n);
	if (a != null) {
		let n = e.parseFormError?.({ body: a }, r);
		if (n) {
			let e = new Set(i.payloadFields), r = /* @__PURE__ */ new Map();
			for (let e of i.inlineRegistry) r.set(e.field, e);
			let { fieldErrors: a, globalErrors: o } = lr(n, e, r);
			if (Object.keys(a).length || o.length) return ur(t, a), {
				handled: !0,
				globalErrors: o
			};
		}
		return {
			handled: !0,
			globalErrors: [Ht(a)]
		};
	}
	return Ut(n) == null ? {
		handled: !1,
		globalErrors: []
	} : {
		handled: !0,
		globalErrors: [Ht(null, { hint: dr(n) })]
	};
}
//#endregion
//#region src/crud/utils/useAbortableEffect.ts
function pr(e, t) {
	s(() => {
		let t = new AbortController();
		return e(t.signal), () => t.abort();
	}, t);
}
//#endregion
//#region src/crud/utils/useFormRecord.ts
function mr({ dp: e, resource: t, id: n, isNew: r, form: i, message: o, defaultValues: s, enabled: c = !0 }) {
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
			Ft(e) || o.error(e instanceof Error ? e.message : "Load failed");
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
	return pr((e) => {
		if (c) return m(e);
	}, [c, m]), {
		loading: l,
		formVersion: f
	};
}
function hr({ dp: e, resource: t, id: n, isNew: r, form: i, message: o, payloadFieldsRef: s, inlineRegistryRef: c, setGlobalErrors: l, onSuccess: d }) {
	let [f, p] = u(!1);
	return {
		onSubmit: a(async (a) => {
			l([]), p(!0);
			try {
				let i = ar(a, Array.from(s.current), c.current.values()), l;
				if (r) l = (await e.create(t, i)).data, o.success("Created");
				else if (n) l = (await e.update(t, {
					id: n,
					data: i
				})).data, o.success("Updated");
				else return;
				d?.(l);
			} catch (n) {
				let { handled: a, globalErrors: u } = await fr(e, i, n, {
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
function gr({ resource: e, id: t, children: r, defaultValues: i, enabled: a = !0, canSave: o = !0, onCancel: s, cancelHref: c, onSuccess: f, loadingMode: p = "overlay" }) {
	let m = t === "new" || !t, h = m ? void 0 : t, g = jt(), { message: _ } = x.useApp(), v = l(/* @__PURE__ */ new Set()), y = l(/* @__PURE__ */ new Map()), [b, S] = u([]), w = Te({ defaultValues: i }), { loading: T, formVersion: E } = mr({
		dp: g,
		resource: e,
		id: h,
		isNew: m,
		form: w,
		message: _,
		defaultValues: i,
		enabled: a
	}), { onSubmit: D, saving: O } = hr({
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
	}), N = /* @__PURE__ */ K(Nn, {
		resource: e,
		isNew: m,
		children: /* @__PURE__ */ K(zn, {
			fieldsRef: v,
			children: /* @__PURE__ */ K(Wn, {
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
					}) : null, /* @__PURE__ */ n(Ce, {
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
							/* @__PURE__ */ K(qn, { errors: b }),
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
function _r({ resource: e, editId: t, onClose: n, children: r, title: i, permissions: a, defaultValues: o, width: s = 560, onSuccess: c }) {
	let l = t === "new", u = t != null, d = Y(), f = i ?? (l ? `New ${e}` : `Edit ${e}`), p = a ? X(d, a, l ? "add" : "change") : !0;
	return /* @__PURE__ */ K(te, {
		open: u,
		title: f,
		onCancel: n,
		footer: null,
		destroyOnHidden: !0,
		width: s,
		maskClosable: !1,
		children: /* @__PURE__ */ K(x, { children: /* @__PURE__ */ K(gr, {
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
function vr({ selectedCount: e, total: t, allPageSelected: n, allMatchingSelected: r, onSelectAllMatching: i, onClearSelection: o, actions: s, onExecute: l, selectedIds: d, running: f = !1 }) {
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
var yr = new Set([
	"page",
	"perPage",
	"sort",
	"create",
	"edit"
]), br = 1, xr = 10;
function Sr(e) {
	if (e.includes(",")) {
		let t = e.split(",").map((e) => e.trim()), n = t.map(Number);
		return n.every((e) => Number.isFinite(e)) ? n : t;
	}
	let t = Number(e);
	return e !== "" && Number.isFinite(t) && String(t) === e ? t : e === "true" ? !0 : e === "false" ? !1 : e;
}
function Cr(e) {
	return e == null || e === "" ? null : Array.isArray(e) ? e.length === 0 ? null : e.map(String).join(",") : String(e);
}
function wr(e) {
	let [t, n] = y(), r = c(() => {
		let n = t.get("page"), r = t.get("perPage"), i = n ? Math.max(1, Number(n) || br) : br, a = r ? Math.max(1, Number(r) || xr) : xr, o = t.getAll("sort"), s = o.length > 0 ? o.flatMap((e) => Sn(e)) : Sn(t.get("sort")), c = { ...e };
		return t.forEach((e, n) => {
			if (yr.has(n)) return;
			let r = c[n];
			r === void 0 ? t.getAll(n).length > 1 ? c[n] = t.getAll(n).map(Sr) : c[n] = Sr(e) : c[n] = [...Array.isArray(r) ? r : [r], Sr(e)];
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
				e === xr ? t.delete("perPage") : t.set("perPage", String(e)), t.delete("page");
			});
		},
		setSort: (e) => {
			i((t) => {
				t.delete("sort");
				let n = Cn(e);
				n && t.set("sort", n);
			});
		},
		toggleSort: (e) => {
			i((t) => {
				let n = t.getAll("sort").flatMap((e) => Sn(e)), r = n.findIndex((t) => t.field === e), i;
				i = r < 0 ? [...n, {
					field: e,
					order: "ASC"
				}] : n[r].order === "ASC" ? n.map((e, t) => t === r ? {
					...e,
					order: "DESC"
				} : e) : n.filter((e, t) => t !== r), t.delete("sort");
				let a = Cn(i);
				a && t.set("sort", a);
			});
		},
		setFilter: (e, t) => {
			i((n) => {
				n.delete(e);
				let r = Cr(t);
				r != null && n.set(e, r), n.delete("page");
			});
		},
		setFilters: (e) => {
			i((t) => {
				for (let e of [...t.keys()]) yr.has(e) || t.delete(e);
				for (let [n, r] of Object.entries(e)) {
					let e = Cr(r);
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
var Tr = t(null);
function Er() {
	return o(Tr);
}
function Dr({ resource: e, title: t, pathPrefix: n, newPath: r, editMode: i = "page", formChildren: o, actions: s, rowActions: l, headerExtra: f, bulkActions: p, bulkDelete: m = !0, bulkActionsEnabled: h = !0, permissions: g, queryState: _, queryActions: v }) {
	let y = jt(), b = Y(), { message: S, modal: T } = x.useApp(), { columns: E, sortOrders: D, sortPriorities: O } = Dn(), [k, A] = u(!1), [j, M] = u([]), [N, P] = u(0), [F, ee] = u(() => /* @__PURE__ */ new Set()), [te, I] = u(!1), ne = r ?? `${n}/new`, L = X(b, g, "add"), re = X(b, g, "change"), z = X(b, g, "delete"), B = re && (i === "page" || i === "both") && s?.edit !== !1, V = re && (i === "modal" || i === "both") && s?.quickEdit !== !1, H = z && s?.delete !== !1, W = B || V || H || l, ae = a(() => {
		ee(/* @__PURE__ */ new Set());
	}, []), ce = c(() => {
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
	]), le = ce.length > 0, ue = F.size, de = j.length > 0 && j.every((e) => F.has(e.id)), fe = N > 0 && ue >= N, pe = c(() => j.filter((e) => F.has(e.id)).map((e) => e.id), [j, F]), me = a((e) => {
		ee((t) => {
			let n = new Set(t), r = j.map((e) => e.id);
			for (let t of r) e.includes(t) || n.delete(t);
			for (let t of e) n.add(t);
			return n;
		});
	}, [j]), he = a(async () => {
		if (!(N <= 0)) {
			I(!0);
			try {
				let t = _.sort.length === 0 ? void 0 : _.sort.length === 1 ? _.sort[0] : _.sort, n = await y.getList(e, {
					pagination: {
						page: 1,
						perPage: N
					},
					sort: t,
					filter: _.filter
				});
				ee(new Set(n.data.map((e) => e.id)));
			} catch (e) {
				S.error(e instanceof Error ? e.message : "Load failed");
			} finally {
				I(!1);
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
			Ft(e) || S.error(e instanceof Error ? e.message : "Load failed");
		} finally {
			t?.aborted || A(!1);
		}
	}, [
		y,
		e,
		_e,
		S
	]);
	pr((e) => J(e), [J]);
	let ve = c(() => ({
		reload: () => void J(),
		clearSelection: ae
	}), [J, ae]), ye = a(async (e, t) => {
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
		I(!0);
		try {
			await e.execute(t, ve);
		} catch (e) {
			S.error(e instanceof Error ? e.message : "Action failed");
		} finally {
			I(!1);
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
					}), K(i === "ascend" ? se : oe, { style: { fontSize: 11 } })]
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
		if (!W) return e;
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
		W,
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
		children: [le ? /* @__PURE__ */ K(vr, {
			selectedCount: ue,
			total: N,
			allPageSelected: de,
			allMatchingSelected: fe,
			onSelectAllMatching: () => void he(),
			onClearSelection: ae,
			actions: ce,
			onExecute: ye,
			selectedIds: [...F],
			running: te || k
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
	}), Se ? /* @__PURE__ */ K(_r, {
		resource: e,
		editId: _.createModal ? "new" : _.editId,
		onClose: () => {
			v.closeModal(), J();
		},
		children: o
	}) : null] });
}
function Or({ resource: e, title: t, pathPrefix: n, newPath: r, staticFilter: i, editMode: o = "page", syncQueryParams: s = !0, children: l, formChildren: u, actions: d, rowActions: f, headerExtra: p, bulkActions: m, bulkDelete: h, bulkActionsEnabled: g, permissions: _ }) {
	let [v, y] = wr(i), b = c(() => {
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
	return /* @__PURE__ */ K(Tr.Provider, {
		value: S,
		children: /* @__PURE__ */ K(kn, {
			values: b,
			setFilterValue: x,
			children: /* @__PURE__ */ q(En, {
				toggleSort: y.toggleSort,
				sort: v.sort,
				children: [l, /* @__PURE__ */ K(Dr, {
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
function kr() {
	let e = An();
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
function Ar({ children: e }) {
	return /* @__PURE__ */ q(G, { children: [e, /* @__PURE__ */ K(kr, {})] });
}
//#endregion
//#region src/crud/ResourceForm.tsx
function jr({ resource: e, title: t, listPath: n, children: r, defaultValues: i, onSaved: a, stayOnPage: o, permissions: c }) {
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
			children: [/* @__PURE__ */ K(ae, {}), " Back"]
		}), /* @__PURE__ */ K(U.Title, {
			level: 5,
			style: { margin: 0 },
			children: t
		})] }),
		children: /* @__PURE__ */ K(gr, {
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
function Mr(e, t, n) {
	return `${e}.${t}.${n}`;
}
//#endregion
//#region src/crud/InlineFormSet.tsx
function Nr(e) {
	let t = {};
	for (let n of e) t[n] = void 0;
	return t;
}
function Pr(e, t) {
	let { control: n } = Ee(), { fields: r, append: i, remove: a } = we({
		control: n,
		name: e,
		keyName: "rowKey"
	});
	return {
		fields: r,
		remove: a,
		appendEmpty: () => i(Nr(t))
	};
}
function Fr({ field: e, label: t, payloadKey: n, transformRows: r, columns: i }) {
	let a = c(() => i.map((e) => e.source), [i]), { fields: o, remove: s, appendEmpty: l } = Pr(e, a);
	Vn(e), Kn(e, a, n, r);
	let u = c(() => i.map((t) => ({
		title: t.label ?? t.source,
		key: t.source,
		width: t.width,
		onHeaderCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		onCell: () => t.minWidth == null ? {} : { style: { minWidth: t.minWidth } },
		render: (n, r, i) => t.cell({
			name: Mr(e, i, t.source),
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
function Ir({ field: e, label: t, payloadKey: n, transformRows: r, sources: i, renderRow: a }) {
	let { fields: o, remove: s, appendEmpty: c } = Pr(e, i);
	return Vn(e), Kn(e, i, n, r), /* @__PURE__ */ q("div", {
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
						name: (t) => Mr(e, n, t)
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
function Lr(e, t, n) {
	for (let r of e) if (t(r, n).invalid) return !0;
	return !1;
}
function Rr(e) {
	let t = l([]);
	for (; t.current.length < e;) t.current.push({ current: /* @__PURE__ */ new Set() });
	return t.current.length > e && (t.current.length = e), t.current;
}
function zr(e, t) {
	let { control: n, getFieldState: r, setFocus: i } = Ee(), a = De({ control: n }), o = l(0), c = l(0);
	s(() => {
		if (a.submitCount === 0) return;
		let n = Object.keys(a.errors).length, s = a.submitCount !== o.current, l = !s && n > 0 && c.current === 0;
		if (o.current = a.submitCount, c.current = n, !s && !l || n === 0) return;
		let u = e.findIndex((e) => Lr(e.current, r, a));
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
function Br(e) {
	return null;
}
function Vr(e) {
	return i(e) && e.type === Br;
}
function Hr({ children: t, defaultActiveKey: n, activeKey: r, onChange: i, ...o }) {
	let { token: s } = W.useToken(), l = c(() => e.toArray(t).filter(Vr).map((e, t) => ({
		key: e.key ?? String(t),
		label: e.props.label,
		disabled: e.props.disabled,
		children: e.props.children
	})), [t]), d = Rr(l.length), f = r !== void 0, [p, m] = u(() => n ?? l[0]?.key ?? "0"), h = f ? r : p, g = a((e) => {
		f || m(e), i?.(e);
	}, [f, i]);
	zr(d, a((e) => {
		let t = l[e]?.key;
		t != null && g(t);
	}, [g, l]));
	let { control: _, getFieldState: v } = Ee(), y = De({ control: _ });
	return /* @__PURE__ */ K(V, {
		destroyOnHidden: !1,
		items: c(() => l.map((e, t) => {
			let n = Lr(d[t].current, v, y);
			return {
				key: e.key,
				label: n ? /* @__PURE__ */ K("span", {
					style: { color: s.colorError },
					children: e.label
				}) : e.label,
				disabled: e.disabled,
				children: /* @__PURE__ */ K(In, {
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
function Ur(e) {
	return null;
}
function Wr(e) {
	return i(e) && e.type === Ur;
}
function Gr({ children: t, initialStep: n = 0, showNavigation: r = !0, allowStepSelect: i = !1, stepsStyle: o, navigationStyle: s, size: l, direction: d, type: f, status: p }) {
	let m = c(() => e.toArray(t).filter(Wr), [t]), h = Rr(m.length), [g, _] = u(n), v = m.length - 1;
	zr(h, _);
	let { control: y, getFieldState: b } = Ee(), x = De({ control: y }), S = c(() => m.map((e, t) => {
		let n = Lr(h[t].current, b, x);
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
			children: /* @__PURE__ */ K(In, {
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
	let s = t ?? e, c = !s.includes("."), { control: l } = Ee(), u = Pn(), d = a ? void 0 : n ?? e, f = n ?? e;
	return Vn(e, c), Hn(e, c), /* @__PURE__ */ K(Se, {
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
function Kr({ source: e, name: t, label: n, required: r, rules: i, placeholder: a, inputStyle: o, hideLabel: s }) {
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
function qr({ source: e, name: t, label: n, required: r, rules: i, min: a, max: o, step: s, inputStyle: c, hideLabel: l }) {
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
function Jr({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a }) {
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
			disabled: n
		})
	});
}
//#endregion
//#region src/crud/fields/DateField.tsx
var Yr = "YYYY-MM-DD";
function Xr({ source: e, name: t, label: n, required: r, rules: i, showTime: a, hideLabel: o }) {
	return /* @__PURE__ */ K($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: o,
		children: ({ value: e, onChange: t, onBlur: n, disabled: r }) => /* @__PURE__ */ K(E, {
			value: e ? ke(String(e)) : null,
			onChange: (e) => t(e ? e.format(a ? `${Yr} HH:mm:ss` : Yr) : null),
			onBlur: n,
			showTime: a,
			disabled: r,
			format: a ? `${Yr} HH:mm:ss` : Yr,
			style: { width: "100%" }
		})
	});
}
//#endregion
//#region src/crud/fields/SelectField.tsx
function Zr({ source: e, name: t, label: n, required: r, rules: i, choices: a, mode: o, allowClear: s, hideLabel: c }) {
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
function Qr({ source: e, name: t, label: n, required: r, rules: i, autoComplete: a, hideLabel: o }) {
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
function $r({ source: e, name: t, label: n, required: r, rules: i, confirmSource: a, confirmLabel: o = "Confirm password", autoComplete: s = "new-password", hideLabel: c }) {
	let l = Oe({
		name: t ?? e,
		disabled: !a
	});
	return a ? /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K(Qr, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		autoComplete: s,
		hideLabel: c
	}), /* @__PURE__ */ K(Qr, {
		source: a,
		label: o,
		required: r,
		autoComplete: s,
		hideLabel: c,
		rules: { validate: (e) => !l || e === l || "Passwords do not match" }
	})] }) : /* @__PURE__ */ K(Qr, {
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
function ei(e, t) {
	return typeof e == "object" && !!e && !Array.isArray(e) && t in e;
}
function ti(e, t) {
	if (!(e == null || e === "")) {
		if (ei(e, t)) {
			let n = e[t];
			return typeof n == "string" || typeof n == "number" ? n : void 0;
		}
		if (typeof e == "string" || typeof e == "number") return e;
	}
}
function ni(e, t) {
	return Array.isArray(e) ? e.map((e) => ti(e, t)).filter((e) => e != null) : [];
}
function ri(e, t) {
	return e == null ? [] : (Array.isArray(e) ? e : [e]).filter((e) => e != null && e !== "").map((e) => ei(e, t) ? e[t] : e);
}
function ii(e, t, n) {
	let r = [];
	if (t != null && (Array.isArray(t) ? r.push(...t.filter((e) => ei(e, n))) : ei(t, n) && r.push(t)), e == null) return r;
	let i = Array.isArray(e) ? e : [e];
	for (let e of i) ei(e, n) && r.push(e);
	return r;
}
function ai(e, t) {
	return typeof t == "function" ? t(e) : String(e[t] ?? "");
}
function oi(e, t, n) {
	return e.map((e) => ({
		label: ai(e, t),
		value: e[n],
		record: e
	}));
}
function si(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) n.set(t.value, t);
	for (let e of t) n.set(e.value, e);
	return Array.from(n.values());
}
//#endregion
//#region src/crud/utils/referenceSelectNotFoundContent.tsx
function ci(e) {
	return e ? /* @__PURE__ */ K(re, { size: "small" }) : void 0;
}
//#endregion
//#region src/crud/utils/useChoices.ts
var li = /* @__PURE__ */ new Map(), ui = /* @__PURE__ */ new Map();
function di(e, t) {
	return typeof e == "function" ? `fn:${t ?? ""}` : Array.isArray(e) ? `static:${e.length}` : `res:${e.resource}:${JSON.stringify(e.filter ?? {})}:${t ?? ""}`;
}
async function fi(e, t, n, r, i) {
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
		label: ai(e, n),
		value: e[r],
		record: e
	}));
}
function pi(e, t, n, r, i, a) {
	let o = di(e, i);
	if (a) {
		let e = li.get(o);
		if (e && !i) return Promise.resolve(e);
	}
	let s = ui.get(o);
	if (s) return s;
	let c = fi(e, t, n, r, i).then((e) => (a && !i && li.set(o, e), e)).finally(() => {
		ui.delete(o);
	});
	return ui.set(o, c), c;
}
function mi(e, t, n = "name", r = "id", i, o = {}) {
	let { lazy: l = !1, active: d = !1, selectedValues: f, selectedRecords: p, fetchSelected: m = !0, cache: h } = o, g = h ?? !l, _ = jt(), v = c(() => {
		if (e) return e;
		if (t) return {
			resource: t,
			filter: i ? { q: i } : void 0
		};
	}, [
		e,
		t,
		i
	]), y = v ? di(v, i) : void 0, b = c(() => ri(f, r), [f, r]), x = c(() => oi(ii(f, p, r), n, r), [
		f,
		p,
		n,
		r
	]), S = !!(v && (!l || d || Array.isArray(v))), [C, w] = u(() => x.length ? x : !y || i || l || !g ? [] : li.get(y) ?? []), [T, E] = u(() => S ? !g || !y || i ? !!v : !li.has(y) : !1);
	s(() => {
		x.length && w((e) => si(e, x));
	}, [x]);
	let D = a(async () => {
		if (!v || !S) {
			v || w(x), E(!1);
			return;
		}
		if (g) {
			let e = di(v, i), t = li.get(e);
			if (t && !i) {
				w(si(x, t)), E(!1);
				return;
			}
		}
		E(!0), l && w(x);
		try {
			w(si(x, await pi(v, _, n, r, i, g)));
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
					label: ai(e, n),
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
				return t.length ? si(e, t) : e;
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
function hi({ reference: e, referenceForm: t, referencePermissions: n, referenceTitle: r, referenceDefaultValues: i, referenceModalWidth: a, selectedId: o, disabled: s, onCreated: c, onUpdated: l }) {
	let d = Y(), f = r ?? e, p = !!(e && t) && X(d, n, "add"), m = !!(e && t && o != null && o !== "") && X(d, n, "change"), [h, g] = u(null);
	return !p && !m ? null : /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ q(R, {
		size: 4,
		children: [p ? /* @__PURE__ */ K(H, {
			title: `Add ${f ?? "record"}`,
			children: /* @__PURE__ */ K(C, {
				type: "default",
				icon: /* @__PURE__ */ K(_e, {}),
				disabled: s,
				"aria-label": `Add ${f ?? "record"}`,
				onClick: () => g("new")
			})
		}) : null, m ? /* @__PURE__ */ K(H, {
			title: `Edit ${f ?? "record"}`,
			children: /* @__PURE__ */ K(C, {
				type: "default",
				icon: /* @__PURE__ */ K(de, {}),
				disabled: s,
				"aria-label": `Edit ${f ?? "record"}`,
				onClick: () => g(String(o))
			})
		}) : null]
	}), e && t && h != null ? /* @__PURE__ */ K(_r, {
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
function gi({ reference: e, choices: t, optionLabel: n = "name", optionValue: r = "id", search: i, allowClear: a, disabled: o, inputStyle: s, onValueChange: l, lazy: d = !0, fetchSelected: f = !0, value: p, onChange: m, fieldName: h, selectedRecords: g, referenceForm: _, referencePermissions: v, referenceTitle: y, referenceDefaultValues: b, referenceModalWidth: x, referenceActions: S = !0 }) {
	let [C, w] = u(), [T, E] = u(!1), D = T || !!C, O = ti(p, r), { options: k, loading: A, optionForValue: j, reload: M } = mi(t, e, n, r, i ? C : void 0, {
		lazy: d,
		active: D,
		selectedValues: p,
		selectedRecords: g,
		fetchSelected: f
	}), N = c(() => k.map((e) => ({
		label: e.label,
		value: e.value
	})), [k]), P = (e) => {
		let t = e[r];
		m(t), l?.(t, {
			label: ai(e, n),
			value: t,
			record: e
		}, { name: h }), M();
	}, F = /* @__PURE__ */ K(L, {
		value: O,
		onChange: (e) => {
			m(e), l?.(e, j(e), { name: h });
		},
		options: N,
		loading: A,
		notFoundContent: ci(A),
		showSearch: i,
		filterOption: i ? !1 : void 0,
		onSearch: i ? w : void 0,
		onDropdownVisibleChange: (e) => {
			E(e), e || w(void 0);
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
			children: F
		}), /* @__PURE__ */ K(hi, {
			reference: e,
			referenceForm: _,
			referencePermissions: v,
			referenceTitle: y,
			referenceDefaultValues: b,
			referenceModalWidth: x,
			selectedId: O,
			disabled: o,
			onCreated: P,
			onUpdated: () => void M()
		})]
	}) : F;
}
function _i({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: s, rules: c, search: l, allowClear: u, disabled: d, hideLabel: f, inputStyle: p, onValueChange: m, lazy: h = !0, recordSource: g, fetchSelected: _ = !0, referenceForm: v, referencePermissions: y, referenceTitle: b, referenceDefaultValues: x, referenceModalWidth: S, referenceActions: C = !0 }) {
	let w = Oe({
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
		children: ({ value: e, onChange: t, disabled: n, name: s }) => /* @__PURE__ */ K(gi, {
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
			selectedRecords: g ? w : void 0,
			referenceForm: v,
			referencePermissions: y,
			referenceTitle: b,
			referenceDefaultValues: x,
			referenceModalWidth: S,
			referenceActions: C
		})
	});
}
//#endregion
//#region src/crud/fields/ReferenceManyField.tsx
function vi({ reference: e, choices: t, optionLabel: n = "name", optionValue: r = "id", search: i, allowClear: a = !0, lazy: o = !0, fetchSelected: s = !0, value: l, onChange: d, disabled: f, selectedRecords: p, referenceForm: m, referencePermissions: h, referenceTitle: g, referenceDefaultValues: _, referenceModalWidth: v, referenceActions: y = !0 }) {
	let [b, x] = u(), [S, C] = u(!1), w = S || !!b, T = ni(l, r), { options: E, loading: D, reload: O } = mi(t, e, n, r, i ? b : void 0, {
		lazy: o,
		active: w,
		selectedValues: l,
		selectedRecords: p,
		fetchSelected: s
	}), k = /* @__PURE__ */ K(L, {
		mode: "multiple",
		value: T,
		onChange: d,
		options: c(() => E.map((e) => ({
			label: e.label,
			value: e.value
		})), [E]),
		loading: D,
		notFoundContent: ci(D),
		showSearch: i,
		filterOption: i ? !1 : void 0,
		onSearch: i ? x : void 0,
		onDropdownVisibleChange: (e) => {
			C(e), e || x(void 0);
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
			children: k
		}), /* @__PURE__ */ K(hi, {
			reference: e,
			referenceForm: m,
			referencePermissions: h,
			referenceTitle: g,
			referenceDefaultValues: _,
			referenceModalWidth: v,
			disabled: f,
			onCreated: (e) => {
				let t = e[r], n = Array.isArray(T) ? T : [];
				if (n.some((e) => e === t)) {
					O();
					return;
				}
				d([...n, t]), O();
			}
		})]
	}) : k;
}
function yi({ source: e, name: t, label: n, reference: r, choices: i, optionLabel: a = "name", optionValue: o = "id", required: s, rules: c, search: l, allowClear: u = !0, hideLabel: d, lazy: f = !0, recordSource: p, fetchSelected: m = !0, referenceForm: h, referencePermissions: g, referenceTitle: _, referenceDefaultValues: v, referenceModalWidth: y, referenceActions: b = !0 }) {
	let x = Oe({
		name: p ?? "",
		disabled: !p
	});
	return /* @__PURE__ */ K($, {
		source: e,
		name: t,
		label: n,
		required: s,
		rules: c,
		hideLabel: d,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ K(vi, {
			reference: r,
			choices: i,
			optionLabel: a,
			optionValue: o,
			search: l,
			allowClear: u,
			lazy: f,
			fetchSelected: m,
			value: e,
			onChange: t,
			disabled: n,
			selectedRecords: p ? x : void 0,
			referenceForm: h,
			referencePermissions: g,
			referenceTitle: _,
			referenceDefaultValues: v,
			referenceModalWidth: y,
			referenceActions: b
		})
	});
}
//#endregion
//#region src/crud/fields/uploadFieldUtils.ts
function bi(e) {
	return e instanceof File ? !0 : typeof e == "string" && e.length > 0;
}
function xi(e) {
	if (e instanceof File) return e.name;
	if (typeof e == "string" && e.length > 0) try {
		return new URL(e, "http://local").pathname.split("/").filter(Boolean).pop() || e;
	} catch {
		return e.split("/").filter(Boolean).pop() || e;
	}
}
//#endregion
//#region src/crud/fields/useUploadPreviewUrl.ts
function Si(e) {
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
function Ci({ value: e, onChange: t, disabled: n, clearable: r, accept: i = "image/*", previewWidth: a = 200 }) {
	let o = l(null), s = Si(e), c = r && bi(e);
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
					icon: /* @__PURE__ */ K(be, {}),
					disabled: n,
					onClick: () => o.current?.click(),
					children: "Choose image"
				}), c ? /* @__PURE__ */ K(C, {
					icon: /* @__PURE__ */ K(le, {}),
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
function wi({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, clearable: o, accept: s, previewWidth: c }) {
	return /* @__PURE__ */ K($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ K(Ci, {
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
function Ti({ value: e, onChange: t, disabled: n, clearable: r, accept: i }) {
	let a = l(null), o = xi(e), s = typeof e == "string" && e.length > 0 ? e : void 0, c = r && bi(e);
	return /* @__PURE__ */ q(R, {
		direction: "vertical",
		size: "middle",
		style: { width: "100%" },
		children: [
			o ? /* @__PURE__ */ q(R, { children: [/* @__PURE__ */ K(ge, {}), s ? /* @__PURE__ */ K(U.Link, {
				href: s,
				target: "_blank",
				rel: "noopener noreferrer",
				children: o
			}) : /* @__PURE__ */ K(U.Text, { children: o })] }) : null,
			/* @__PURE__ */ q(R, {
				wrap: !0,
				children: [/* @__PURE__ */ K(C, {
					icon: /* @__PURE__ */ K(be, {}),
					disabled: n,
					onClick: () => a.current?.click(),
					children: "Choose file"
				}), c ? /* @__PURE__ */ K(C, {
					icon: /* @__PURE__ */ K(le, {}),
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
function Ei({ source: e, name: t, label: n, required: r, rules: i, hideLabel: a, clearable: o, accept: s }) {
	return /* @__PURE__ */ K($, {
		source: e,
		name: t,
		label: n,
		required: r,
		rules: i,
		hideLabel: a,
		children: ({ value: e, onChange: t, disabled: n }) => /* @__PURE__ */ K(Ti, {
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
function Di({ source: e, label: t, sortable: n = !0 }) {
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
function Oi(e, t, n) {
	return typeof n == "function" ? n(e) : n ? Jn(e, n) : e[t];
}
//#endregion
//#region src/crud/columns/NumberColumn.tsx
function ki({ source: e, label: t, sortable: n = !0 }) {
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
function Ai({ source: e, label: t, sortable: n = !0 }) {
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
function ji({ source: e, label: t, sortable: n = !0 }) {
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
function Mi({ record: e, source: t, display: n, reference: r, choices: i, optionLabel: a, optionValue: o }) {
	let { labelForValue: s } = mi(i, r, a, o), c = e[t];
	if (typeof n == "function") return /* @__PURE__ */ K(G, { children: n(e) });
	if (n && n !== t) {
		let r = Oi(e, t, n);
		return /* @__PURE__ */ K(G, { children: r == null ? "—" : String(r) });
	}
	return /* @__PURE__ */ K(G, { children: s(c) });
}
function Ni({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", display: o, sortable: s = !0 }) {
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
			render: (s, c) => /* @__PURE__ */ K(Mi, {
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
function Pi({ record: e, source: t, reference: n, choices: r, optionLabel: i, optionValue: a }) {
	let { labelsForValues: o } = mi(r, n, i, a), s = e[t];
	return /* @__PURE__ */ K(G, { children: o(Array.isArray(s) ? s : []) });
}
function Fi({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", sortable: o = !1 }) {
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
			render: (t, o) => /* @__PURE__ */ K(Pi, {
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
function Ii({ source: e, label: t, sortable: n = !1, width: r = 40, height: i = 40, objectFit: a = "cover", borderRadius: o = 4, alt: s = "" }) {
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
function Li({ source: e, label: t, sortable: n = !1, render: r }) {
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
function Ri({ source: e, label: t, placeholder: n }) {
	return jn(c(() => ({
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
function zi({ source: e, label: t }) {
	return jn(c(() => ({
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
function Bi({ source: e, label: t }) {
	return jn(c(() => ({
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
function Vi({ source: e, label: t }) {
	return jn(c(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: n, onChange: r }) => /* @__PURE__ */ K(E, {
			allowClear: !0,
			placeholder: t ?? e,
			value: n ? ke(String(n)) : null,
			onChange: (e) => r(e ? e.format("YYYY-MM-DD") : void 0),
			style: { minWidth: 160 }
		})
	}), [e, t])), null;
}
//#endregion
//#region src/crud/filters/SelectFilter.tsx
function Hi({ source: e, label: t, choices: n, multiple: r }) {
	return jn(c(() => ({
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
function Ui({ source: e, label: t, reference: n, choices: r, optionLabel: i, optionValue: a, multiple: o, search: s, lazy: c = !0, fetchSelected: l = !0, value: d, onChange: f }) {
	let [p, m] = u(), [h, g] = u(!1), { options: _, loading: v } = mi(r, n, i, a, s ? p : void 0, {
		lazy: c,
		active: h || !!p,
		selectedValues: d,
		fetchSelected: l
	});
	return /* @__PURE__ */ K(L, {
		allowClear: !0,
		mode: o ? "multiple" : void 0,
		placeholder: t ?? e,
		value: d,
		onChange: f,
		options: _.map((e) => ({
			label: e.label,
			value: e.value
		})),
		loading: v,
		notFoundContent: ci(v),
		showSearch: s,
		filterOption: s ? !1 : void 0,
		onSearch: s ? m : void 0,
		onDropdownVisibleChange: (e) => {
			g(e), e || m(void 0);
		},
		optionFilterProp: "label",
		style: { minWidth: 180 }
	});
}
function Wi({ source: e, label: t, reference: n, choices: r, optionLabel: i = "name", optionValue: a = "id", multiple: o, search: s, lazy: l = !0, fetchSelected: u = !0 }) {
	return jn(c(() => ({
		key: e,
		source: e,
		label: t,
		render: ({ value: c, onChange: d }) => /* @__PURE__ */ K(Ui, {
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
			value: c,
			onChange: d
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
		u
	])), null;
}
function Gi(e) {
	return /* @__PURE__ */ K(Wi, {
		...e,
		multiple: !0
	});
}
//#endregion
export { Ot as AdminApp, gt as AdminLayout, Ie as AppThemeProvider, vn as AuthAlternateLink, yn as AuthPageLayout, Je as AuthProvider, Ai as BooleanColumn, Jr as BooleanField, Bi as BooleanFilter, Li as CustomColumn, At as DataProvider, ji as DateColumn, Xr as DateField, Vi as DateFilter, ze as DensitySwitch, It as EXPECTED_VALIDATION_BODY_HINT, $ as FieldWrapper, Ei as FileField, Ar as FilterBar, Ur as FormStep, Gr as FormSteps, Br as FormTab, Hr as FormTabs, _t as Guard, yt as GuestOnly, Ii as ImageColumn, wi as ImageField, Fr as InlineFormSet, Ir as InlineFormSetStacked, bn as LoginPage, ki as NumberColumn, qr as NumberField, zi as NumberFilter, $r as PasswordField, $e as PermissionsProvider, xn as PlaceholderPage, vt as Protected, Ni as ReferenceColumn, _i as ReferenceField, Wi as ReferenceFilter, Fi as ReferenceManyColumn, yi as ReferenceManyField, Gi as ReferenceManyFilter, bt as RequirePermission, jr as ResourceForm, _r as ResourceFormModal, Or as ResourceList, Zr as SelectField, Hi as SelectFilter, Di as TextColumn, Kr as TextField, Ri as TextFilter, Ve as ThemeSwitch, He as ThemeToolbar, dn as applyInMemoryListParams, Z as asStringMessages, Xn as buildFormPayload, Zn as buildInlineRowsPayload, ar as buildResourceFormSubmitBody, Pt as combineResourceHandlers, Dt as createAdminRouter, fn as createMemoryResourceHandlers, et as createPermissionsChecker, pn as createRestResourceHandlers, Ze as createSessionStorageAuthAdapter, Tt as deriveAuthPaths, Ht as describeNonStandardValidationBody, st as filterNavByPermission, ln as filterRows, Xt as finalizeFormErrors, Yt as flattenNestedArrayErrors, Gt as getErrorBody, Jn as getFormValue, xt as getRouteAccess, on as getRowById, Qn as hasUploadValues, Ft as isAbortError, Mr as nestedFieldPath, $t as parseDjangoDRFFormErrors, en as parseDotNetFormErrors, tn as parseNodeFormErrors, St as partitionAdminRoutes, ir as prepareFormSubmitBody, qt as resolveErrorBody, Yn as setFormValue, hn as toDjangoRestOrdering, rr as toFormData, _n as toJsonApiSort, gn as toODataOrderBy, pr as useAbortableEffect, Ye as useAuth, tt as useCan, mi as useChoices, jt as useDataProvider, wr as useListQueryState, Y as usePermissions, Vn as useRegisterPayloadField, Hn as useRegisterSectionField, Er as useResourceListContext, Le as useThemeMode };
