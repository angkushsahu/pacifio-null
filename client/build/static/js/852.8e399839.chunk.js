"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[852],{6629:function(e,t,s){s.d(t,{Z:function(){return S}});var c=s(9439),n="styles_admin_sidebar__iYAZA",r="styles_close_sidebar__k-pXo",a="styles_dashboard_title__6sTQS",i="styles_dashboard_options__LiW7p",o="styles_active__ZEbIW",d="styles_dashboard_product__item__jGU0H",l="styles_dashboard_product__options__MifBu",u="styles_add_product__2535-",p="styles_dashboard_product__options__container__QI47V",h="styles_show__0XJbM",m="styles_hide__J3q-7",_="styles_toggle_dashboard__option__h3uH4",x=s(2791),j=s(7689),v=s(1087),b=s(9126),f=s(6355),y=s(4373),Z=s(6856),k=s(1213),g=s(6036),P=s(4353),N=s(184),S=function(){var e=(0,j.TH)().pathname,t=(0,x.useState)(!1),s=(0,c.Z)(t,2),S=s[0],A=s[1],w=e===P.Z.adminDashboard,C=e===P.Z.adminSeeAllOrders||e.includes("/admin/order"),U=e===P.Z.adminSeeAllUsers||e.includes("/admin/user"),D=e===P.Z.adminCreateProduct,E=e===P.Z.adminSeeAllProducts,O=e===P.Z.adminOutOfStockProducts,F=D||E||O||e.includes("/admin/product/update"),I=(0,x.useState)(F),T=(0,c.Z)(I,2),q=T[0],L=T[1],B=function(){A((function(e){return!e}))};return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)("aside",{className:"".concat(n," ").concat(S?h:m),children:[(0,N.jsx)(k.$iT,{className:r,onClick:B}),(0,N.jsxs)("div",{className:"".concat(a," ").concat(i),children:[(0,N.jsx)(Z.ZJo,{}),(0,N.jsx)("h3",{children:"Admin Dashboard"})]}),(0,N.jsxs)("ul",{children:[(0,N.jsx)(v.rU,{to:P.Z.adminDashboard,children:(0,N.jsxs)("li",{className:"".concat(i," ").concat(w?o:""),children:[(0,N.jsx)(b.oh2,{}),(0,N.jsx)("p",{children:"Stats"})]})}),(0,N.jsx)(v.rU,{to:P.Z.adminSeeAllOrders,children:(0,N.jsxs)("li",{className:"".concat(i," ").concat(C?o:""),children:[(0,N.jsx)(Z.ili,{}),(0,N.jsx)("p",{children:"Orders"})]})}),(0,N.jsx)(v.rU,{to:P.Z.adminSeeAllUsers,children:(0,N.jsxs)("li",{className:"".concat(i," ").concat(U?o:""),children:[(0,N.jsx)(f.I$,{}),(0,N.jsx)("p",{children:"Users"})]})}),(0,N.jsxs)("li",{className:"".concat(i," ").concat(d," ").concat(F?o:""),onClick:function(){return L((function(e){return!e}))},children:[(0,N.jsxs)("div",{children:[(0,N.jsx)(b.aDs,{}),(0,N.jsx)("p",{children:"Products"})]}),q?(0,N.jsx)(Z.Yc6,{}):(0,N.jsx)(Z.Faw,{})]}),(0,N.jsxs)("ul",{className:"".concat(p," ").concat(q?h:""),children:[(0,N.jsx)(v.rU,{to:P.Z.adminCreateProduct,children:(0,N.jsxs)("li",{className:"".concat(i," ").concat(l," ").concat(D?o:""),children:[(0,N.jsx)(b.B8K,{className:u}),(0,N.jsx)("p",{children:"Add Product"})]})}),(0,N.jsx)(v.rU,{to:P.Z.adminSeeAllProducts,children:(0,N.jsxs)("li",{className:"".concat(i," ").concat(l," ").concat(E?o:""),children:[(0,N.jsx)(f.Yi$,{}),(0,N.jsx)("p",{children:"All Products"})]})}),(0,N.jsx)(v.rU,{to:P.Z.adminOutOfStockProducts,children:(0,N.jsxs)("li",{className:"".concat(i," ").concat(l," ").concat(O?o:""),children:[(0,N.jsx)(g.KZq,{}),(0,N.jsx)("p",{children:"Out of Stock Products"})]})})]})]})]}),(0,N.jsxs)("button",{type:"button",className:_,onClick:B,title:"Toggle Dashboard",children:[(0,N.jsx)(y.Bq0,{}),(0,N.jsx)("p",{children:"Admin Dashboard"})]})]})}},2852:function(e,t,s){s.r(t),s.d(t,{default:function(){return j}});var c=s(4942),n=s(1413),r=s(4165),a=s(5861),i=s(9439),o={admin_workspace__title:"styles_admin_workspace__title__dMKed",input_container:"styles_input_container__LmQgZ",product_delete:"styles_product_delete__F4v6V"},d=s(2791),l=s(6629),u=s(7143),p=s(7689),h=s(5985),m=s(4353),_=s(7822),x=s(184),j=function(){var e=(0,p.UO)().id,t=(0,u.DT)({productId:e}),s=t.data,j=t.isLoading,v=(0,u.wE)(),b=(0,i.Z)(v,1)[0],f=(0,u.xq)(),y=(0,i.Z)(f,2),Z=y[0],k=y[1].isLoading,g=(0,d.useState)({name:"",category:"",price:0,stock:0,description:""}),P=(0,i.Z)(g,2),N=P[0],S=P[1],A=(0,p.s0)();(0,d.useEffect)((function(){if(null!==s&&void 0!==s&&s.success){var e=s.product,t=e.name,c=e.category,n=e.price,r=e.stock,a=e.description;S({name:t,category:c,price:n,stock:r,description:a})}}),[s]);var w=function(){var t=(0,a.Z)((0,r.Z)().mark((function t(s){var c;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s.preventDefault(),t.prev=1,t.next=4,b({product:N,productId:e}).unwrap();case 4:(c=t.sent).success&&h.Am.success(c.message),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),h.Am.error(t.t0.data.message||"Unable to update product");case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}(),C=function(){var t=(0,a.Z)((0,r.Z)().mark((function t(s){var c;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(s.preventDefault(),window.confirm("Are you sure you want to delete this product ?")){t.next=4;break}return t.abrupt("return");case 4:return t.prev=4,t.next=7,Z({productId:e}).unwrap();case 7:(c=t.sent).success&&(h.Am.success(c.message),A(m.Z.adminSeeAllProducts)),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(4),h.Am.error(t.t0.data.message||"Unable to delete product");case 14:case"end":return t.stop()}}),t,null,[[4,11]])})));return function(e){return t.apply(this,arguments)}}(),U=function(e){var t=e.target,s=t.name,r=t.value;S((0,n.Z)((0,n.Z)({},N),{},(0,c.Z)({},s,r)))};return(0,x.jsxs)("section",{className:"admin-pages",children:[(0,x.jsx)(l.Z,{}),j||k?(0,x.jsx)("section",{className:"admin-loading--section",children:(0,x.jsx)(_.Z,{})}):s&&s.success?(0,x.jsxs)("section",{className:"admin-workspace",children:[(0,x.jsx)("h2",{className:o.admin_workspace__title,children:"Update Product"}),(0,x.jsxs)("form",{onSubmit:w,children:[(0,x.jsxs)("div",{className:o.product_info,children:[(0,x.jsxs)("div",{className:o.input_container,children:[(0,x.jsx)("label",{htmlFor:"name",children:"Product Name"}),(0,x.jsx)("input",{type:"text",name:"name",id:"name",placeholder:"Enter Product Name",title:"Enter Product Name",value:N.name,onChange:U})]}),(0,x.jsxs)("div",{className:o.input_container,children:[(0,x.jsx)("label",{htmlFor:"category",children:"Product Category"}),(0,x.jsxs)("select",{name:"category",id:"category",title:"Enter Product Category",value:N.category,onChange:U,children:[(0,x.jsx)("option",{value:"",disabled:!0,children:"-- Select --"}),(0,x.jsx)("option",{value:"keyboard",children:"keyboard"}),(0,x.jsx)("option",{value:"mouse",children:"mouse"}),(0,x.jsx)("option",{value:"mouse-pad",children:"mouse-pad"}),(0,x.jsx)("option",{value:"cooling-pad",children:"cooling-pad"}),(0,x.jsx)("option",{value:"headset",children:"headset"})]})]}),(0,x.jsxs)("div",{className:o.input_container,children:[(0,x.jsx)("label",{htmlFor:"price",children:"Product Price"}),(0,x.jsx)("input",{type:"number",name:"price",id:"price",placeholder:"Enter Product Price",title:"Enter Product Price",value:N.price,onChange:U})]}),(0,x.jsxs)("div",{className:o.input_container,children:[(0,x.jsx)("label",{htmlFor:"stock",children:"Product Stock"}),(0,x.jsx)("input",{type:"number",name:"stock",id:"stock",placeholder:"Enter Product Stock",title:"Enter Product Stock",value:N.stock,onChange:U})]}),(0,x.jsxs)("div",{className:o.input_container,children:[(0,x.jsx)("label",{htmlFor:"description",children:"Product Description"}),(0,x.jsx)("textarea",{name:"description",id:"description",placeholder:"Enter Product Description",title:"Enter A Product Description",value:N.description,onChange:U})]})]}),(0,x.jsx)("p",{className:o.product_delete,onClick:C,children:"Delete this product"}),(0,x.jsx)("button",{type:"submit",title:"Create Product",children:"Update Product"})]})]}):null]})}}}]);
//# sourceMappingURL=852.8e399839.chunk.js.map