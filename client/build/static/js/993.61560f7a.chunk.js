"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[993],{6629:function(e,s,c){c.d(s,{Z:function(){return S}});var t=c(9439),a="styles_admin_sidebar__iYAZA",n="styles_close_sidebar__k-pXo",r="styles_dashboard_title__6sTQS",i="styles_dashboard_options__LiW7p",l="styles_active__ZEbIW",d="styles_dashboard_product__item__jGU0H",o="styles_dashboard_product__options__MifBu",u="styles_add_product__2535-",h="styles_dashboard_product__options__container__QI47V",x="styles_show__0XJbM",j="styles_hide__J3q-7",m="styles_toggle_dashboard__option__h3uH4",_=c(2791),p=c(7689),f=c(1087),b=c(9126),g=c(6355),P=c(4373),N=c(6856),v=c(1213),Z=c(6036),y=c(4353),k=c(184),S=function(){var e=(0,p.TH)().pathname,s=(0,_.useState)(!1),c=(0,t.Z)(s,2),S=c[0],C=c[1],A=e===y.Z.adminDashboard,O=e===y.Z.adminSeeAllOrders||e.includes("/admin/order"),D=e===y.Z.adminSeeAllUsers||e.includes("/admin/user"),U=e===y.Z.adminCreateProduct,w=e===y.Z.adminSeeAllProducts,T=e===y.Z.adminOutOfStockProducts,I=U||w||T||e.includes("/admin/product/update"),L=(0,_.useState)(I),q=(0,t.Z)(L,2),F=q[0],G=q[1],H=function(){C((function(e){return!e}))};return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsxs)("aside",{className:"".concat(a," ").concat(S?x:j),children:[(0,k.jsx)(v.$iT,{className:n,onClick:H}),(0,k.jsxs)("div",{className:"".concat(r," ").concat(i),children:[(0,k.jsx)(N.ZJo,{}),(0,k.jsx)("h3",{children:"Admin Dashboard"})]}),(0,k.jsxs)("ul",{children:[(0,k.jsx)(f.rU,{to:y.Z.adminDashboard,children:(0,k.jsxs)("li",{className:"".concat(i," ").concat(A?l:""),children:[(0,k.jsx)(b.oh2,{}),(0,k.jsx)("p",{children:"Stats"})]})}),(0,k.jsx)(f.rU,{to:y.Z.adminSeeAllOrders,children:(0,k.jsxs)("li",{className:"".concat(i," ").concat(O?l:""),children:[(0,k.jsx)(N.ili,{}),(0,k.jsx)("p",{children:"Orders"})]})}),(0,k.jsx)(f.rU,{to:y.Z.adminSeeAllUsers,children:(0,k.jsxs)("li",{className:"".concat(i," ").concat(D?l:""),children:[(0,k.jsx)(g.I$,{}),(0,k.jsx)("p",{children:"Users"})]})}),(0,k.jsxs)("li",{className:"".concat(i," ").concat(d," ").concat(I?l:""),onClick:function(){return G((function(e){return!e}))},children:[(0,k.jsxs)("div",{children:[(0,k.jsx)(b.aDs,{}),(0,k.jsx)("p",{children:"Products"})]}),F?(0,k.jsx)(N.Yc6,{}):(0,k.jsx)(N.Faw,{})]}),(0,k.jsxs)("ul",{className:"".concat(h," ").concat(F?x:""),children:[(0,k.jsx)(f.rU,{to:y.Z.adminCreateProduct,children:(0,k.jsxs)("li",{className:"".concat(i," ").concat(o," ").concat(U?l:""),children:[(0,k.jsx)(b.B8K,{className:u}),(0,k.jsx)("p",{children:"Add Product"})]})}),(0,k.jsx)(f.rU,{to:y.Z.adminSeeAllProducts,children:(0,k.jsxs)("li",{className:"".concat(i," ").concat(o," ").concat(w?l:""),children:[(0,k.jsx)(g.Yi$,{}),(0,k.jsx)("p",{children:"All Products"})]})}),(0,k.jsx)(f.rU,{to:y.Z.adminOutOfStockProducts,children:(0,k.jsxs)("li",{className:"".concat(i," ").concat(o," ").concat(T?l:""),children:[(0,k.jsx)(Z.KZq,{}),(0,k.jsx)("p",{children:"Out of Stock Products"})]})})]})]})]}),(0,k.jsxs)("button",{type:"button",className:m,onClick:H,title:"Toggle Dashboard",children:[(0,k.jsx)(P.Bq0,{}),(0,k.jsx)("p",{children:"Admin Dashboard"})]})]})}},993:function(e,s,c){c.r(s);var t=c(9439),a=c(2791),n=c(7689),r=c(3637),i=c(7692),l=c(6629),d=c(7822),o=c(7143),u=c(184);s.default=function(){var e,s=(0,n.s0)(),c=(0,n.TH)(),h=new URLSearchParams(c.search),x=Number(h.get("page"))||1,j=(0,a.useState)(x),m=(0,t.Z)(j,2),_=m[0],p=m[1],f=(0,a.useState)(""),b=(0,t.Z)(f,2),g=b[0],P=b[1],N=(0,a.useDeferredValue)(g),v=(0,a.useRef)(null),Z="page=".concat(x)+(g?"&type=".concat(N):""),y=(0,o.ce)({query:Z}),k=y.data,S=y.isLoading;return(0,a.useEffect)((function(){window.scrollTo({top:0,left:0,behavior:"smooth"}),p(x)}),[_,x]),(0,u.jsxs)("section",{className:"admin-pages",children:[(0,u.jsx)(l.Z,{}),S?(0,u.jsx)("section",{className:"admin-loading--section",children:(0,u.jsx)(d.Z,{})}):k&&k.success?(0,u.jsxs)("section",{className:"admin-workspace",children:[(0,u.jsxs)("div",{className:"admin-title-search",children:[(0,u.jsx)("h2",{className:"admin-workspace--title",children:"All Out of Stock Products"}),(0,u.jsxs)("form",{className:"search_box",onClick:function(){var e;return null===(e=v.current)||void 0===e?void 0:e.focus()},onSubmit:function(e){e.preventDefault()},title:"Search Out of Stock Products",children:[(0,u.jsx)(i.Goc,{className:"search_placeholder"}),(0,u.jsx)("label",{htmlFor:"search"}),(0,u.jsx)("input",{type:"text",name:"search",id:"search",placeholder:"Search Out of Stock Products ....",value:g,onChange:function(e){return P(e.target.value)},ref:v}),(0,u.jsx)("button",{type:"submit",className:g?"show":"hide",children:(0,u.jsx)(i.Goc,{className:"search_button__icon"})})]})]}),(0,u.jsx)("div",{className:"admin_table__container",children:(0,u.jsxs)("table",{className:"admin_table",children:[(0,u.jsx)("thead",{children:(0,u.jsxs)("tr",{children:[(0,u.jsx)("th",{children:"ID"}),(0,u.jsx)("th",{children:"Product Name"}),(0,u.jsx)("th",{children:"Price"}),(0,u.jsx)("th",{children:"Category"}),(0,u.jsx)("th",{children:"Quantity"}),(0,u.jsx)("th",{children:"Ratings"})]})}),(0,u.jsx)("tbody",{children:null!==k&&void 0!==k&&null!==(e=k.products)&&void 0!==e&&e.length?k.products.map((function(e){return(0,u.jsxs)("tr",{onClick:function(){return s("/admin/product/update/".concat(e._id))},title:"Go to product ".concat(e.name),children:[(0,u.jsx)("td",{children:e._id}),(0,u.jsx)("td",{children:e.name.length<=25?e.name:e.name.slice(0,25)+" ...."}),(0,u.jsxs)("td",{children:["\u20b9 ",e.price]}),(0,u.jsx)("td",{children:e.category}),(0,u.jsx)("td",{children:e.category}),(0,u.jsx)("td",{children:e.stock})]},e._id)})):null})]})}),k.numberOfProducts>k.resultPerPage?(0,u.jsx)("div",{className:"pagination_container",children:(0,u.jsx)(r.Z,{activePage:_,itemsCountPerPage:k.resultPerPage,totalItemsCount:k.numberOfProducts,onChange:function(e){p(e);var c="/admin/products/out-of-stock?";c+="page=".concat(e),s(c)},pageRangeDisplayed:3,nextPageText:"Next",prevPageText:"Previous",firstPageText:"First",lastPageText:"Last",activeClass:"active_page",activeLinkClass:"active_link__page",hideDisabled:!0})}):null]}):null]})}}}]);
//# sourceMappingURL=993.61560f7a.chunk.js.map