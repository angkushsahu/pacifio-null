"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[951],{6629:function(e,s,a){a.d(s,{Z:function(){return O}});var t=a(9439),c="styles_admin_sidebar__iYAZA",n="styles_close_sidebar__k-pXo",r="styles_dashboard_title__6sTQS",i="styles_dashboard_options__LiW7p",l="styles_active__ZEbIW",d="styles_dashboard_product__item__jGU0H",o="styles_dashboard_product__options__MifBu",u="styles_add_product__2535-",h="styles_dashboard_product__options__container__QI47V",x="styles_show__0XJbM",_="styles_hide__J3q-7",j="styles_toggle_dashboard__option__h3uH4",m=a(2791),p=a(7689),f=a(1087),b=a(9126),g=a(6355),v=a(4373),N=a(6856),S=a(1213),Z=a(6036),P=a(4353),y=a(184),O=function(){var e=(0,p.TH)().pathname,s=(0,m.useState)(!1),a=(0,t.Z)(s,2),O=a[0],k=a[1],A=e===P.Z.adminDashboard,C=e===P.Z.adminSeeAllOrders||e.includes("/admin/order"),D=e===P.Z.adminSeeAllUsers||e.includes("/admin/user"),w=e===P.Z.adminCreateProduct,U=e===P.Z.adminSeeAllProducts,T=e===P.Z.adminOutOfStockProducts,F=w||U||T||e.includes("/admin/product/update"),J=(0,m.useState)(F),I=(0,t.Z)(J,2),L=I[0],M=I[1],Y=function(){k((function(e){return!e}))};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("aside",{className:"".concat(c," ").concat(O?x:_),children:[(0,y.jsx)(S.$iT,{className:n,onClick:Y}),(0,y.jsxs)("div",{className:"".concat(r," ").concat(i),children:[(0,y.jsx)(N.ZJo,{}),(0,y.jsx)("h3",{children:"Admin Dashboard"})]}),(0,y.jsxs)("ul",{children:[(0,y.jsx)(f.rU,{to:P.Z.adminDashboard,children:(0,y.jsxs)("li",{className:"".concat(i," ").concat(A?l:""),children:[(0,y.jsx)(b.oh2,{}),(0,y.jsx)("p",{children:"Stats"})]})}),(0,y.jsx)(f.rU,{to:P.Z.adminSeeAllOrders,children:(0,y.jsxs)("li",{className:"".concat(i," ").concat(C?l:""),children:[(0,y.jsx)(N.ili,{}),(0,y.jsx)("p",{children:"Orders"})]})}),(0,y.jsx)(f.rU,{to:P.Z.adminSeeAllUsers,children:(0,y.jsxs)("li",{className:"".concat(i," ").concat(D?l:""),children:[(0,y.jsx)(g.I$,{}),(0,y.jsx)("p",{children:"Users"})]})}),(0,y.jsxs)("li",{className:"".concat(i," ").concat(d," ").concat(F?l:""),onClick:function(){return M((function(e){return!e}))},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)(b.aDs,{}),(0,y.jsx)("p",{children:"Products"})]}),L?(0,y.jsx)(N.Yc6,{}):(0,y.jsx)(N.Faw,{})]}),(0,y.jsxs)("ul",{className:"".concat(h," ").concat(L?x:""),children:[(0,y.jsx)(f.rU,{to:P.Z.adminCreateProduct,children:(0,y.jsxs)("li",{className:"".concat(i," ").concat(o," ").concat(w?l:""),children:[(0,y.jsx)(b.B8K,{className:u}),(0,y.jsx)("p",{children:"Add Product"})]})}),(0,y.jsx)(f.rU,{to:P.Z.adminSeeAllProducts,children:(0,y.jsxs)("li",{className:"".concat(i," ").concat(o," ").concat(U?l:""),children:[(0,y.jsx)(g.Yi$,{}),(0,y.jsx)("p",{children:"All Products"})]})}),(0,y.jsx)(f.rU,{to:P.Z.adminOutOfStockProducts,children:(0,y.jsxs)("li",{className:"".concat(i," ").concat(o," ").concat(T?l:""),children:[(0,y.jsx)(Z.KZq,{}),(0,y.jsx)("p",{children:"Out of Stock Products"})]})})]})]})]}),(0,y.jsxs)("button",{type:"button",className:j,onClick:Y,title:"Toggle Dashboard",children:[(0,y.jsx)(v.Bq0,{}),(0,y.jsx)("p",{children:"Admin Dashboard"})]})]})}},8951:function(e,s,a){a.r(s),a.d(s,{default:function(){return m}});var t=a(9439),c="styles_processing__NpaYO",n="styles_shipped__2-O7k",r="styles_delivered__K1oA8",i=a(2791),l=a(7689),d=a(3637),o=a(6629),u=a(7692),h=a(7822),x=a(7143),_=a(2426),j=a(184),m=function(){var e,s=(0,l.s0)(),a=(0,l.TH)(),m=new URLSearchParams(a.search),p=Number(m.get("page"))||1,f=(0,i.useState)(p),b=(0,t.Z)(f,2),g=b[0],v=b[1],N=(0,i.useState)(""),S=(0,t.Z)(N,2),Z=S[0],P=S[1],y=(0,i.useDeferredValue)(Z),O=(0,i.useRef)(null),k="page=".concat(p)+(Z?"&order=".concat(y):""),A=(0,x.is)({query:k}),C=A.data,D=A.isLoading;return(0,i.useEffect)((function(){window.scrollTo({top:0,left:0,behavior:"smooth"}),v(p)}),[g,p]),(0,j.jsxs)("section",{className:"admin-pages",children:[(0,j.jsx)(o.Z,{}),D?(0,j.jsx)("section",{className:"admin-loading--section",children:(0,j.jsx)(h.Z,{})}):C&&null!==C&&void 0!==C&&C.success?(0,j.jsxs)("section",{className:"admin-workspace",children:[(0,j.jsxs)("div",{className:"admin-title-search",children:[(0,j.jsx)("h2",{className:"admin-workspace--title",children:"All Orders"}),(0,j.jsxs)("form",{className:"search_box",onClick:function(){var e;return null===(e=O.current)||void 0===e?void 0:e.focus()},onSubmit:function(e){e.preventDefault()},title:"Search Orders",children:[(0,j.jsx)(u.Goc,{className:"search_placeholder"}),(0,j.jsx)("label",{htmlFor:"search"}),(0,j.jsx)("input",{type:"text",name:"search",id:"search",placeholder:"Search Orders ....",value:Z,onChange:function(e){return P(e.target.value)},ref:O}),(0,j.jsx)("button",{type:"submit",className:Z?"show":"hide",children:(0,j.jsx)(u.Goc,{className:"search_button__icon"})})]})]}),(0,j.jsx)("div",{className:"admin_table__container",children:(0,j.jsxs)("table",{className:"admin_table",children:[(0,j.jsx)("thead",{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)("th",{children:"ID"}),(0,j.jsx)("th",{children:"Order Date"}),(0,j.jsx)("th",{children:"Subtotal"}),(0,j.jsx)("th",{children:"Customer"}),(0,j.jsx)("th",{children:"Status"})]})}),(0,j.jsx)("tbody",{children:null===(e=C.orders)||void 0===e?void 0:e.map((function(e){var a=new Date(e.createdAt),t="".concat(a.getDate()," ").concat((0,_.Z)(a.getMonth()),", ").concat(a.getFullYear());return(0,j.jsxs)("tr",{onClick:function(){return s("/admin/order/".concat(e._id))},title:"Go to order ".concat(e._id),children:[(0,j.jsx)("td",{children:e._id}),(0,j.jsx)("td",{children:t}),(0,j.jsxs)("td",{children:["\u20b9 ",e.totalPrice,".00"]}),(0,j.jsx)("td",{children:e.user.name}),"delivered"===e.orderStatus?(0,j.jsx)("td",{children:(0,j.jsx)("span",{className:r,children:"Delivered"})}):"shipped"===e.orderStatus?(0,j.jsx)("td",{children:(0,j.jsx)("span",{className:n,children:"Shipped"})}):"processing"===e.orderStatus?(0,j.jsx)("td",{children:(0,j.jsx)("span",{className:c,children:"Processing"})}):null]},e._id)}))})]})}),C.numberOfOrders>C.resultPerPage?(0,j.jsx)("div",{className:"pagination_container",children:(0,j.jsx)(d.Z,{activePage:g,itemsCountPerPage:C.resultPerPage,totalItemsCount:C.numberOfOrders,onChange:function(e){v(e);var a="/admin/orders?";a+="page=".concat(e),s(a)},pageRangeDisplayed:3,nextPageText:"Next",prevPageText:"Previous",firstPageText:"First",lastPageText:"Last",activeClass:"active_page",activeLinkClass:"active_link__page",hideDisabled:!0})}):null]}):null]})}},2426:function(e,s){var a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];s.Z=function(e){return a[e]}}}]);
//# sourceMappingURL=951.e1c0feb0.chunk.js.map