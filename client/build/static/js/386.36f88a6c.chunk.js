"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[386],{6423:function(s,e,t){t.d(e,{Z:function(){return h}});var i="styles_cart_item__sjUn+",r="styles_cart_item__info__HpntV",n="styles_cart_item__title__xNfXZ",a="styles_cart_item__title_quantity__qHz7a",c="styles_cart_item__subtotal__MUg53",l="styles_cart_item__subtotal__heading__pUfOc",d=t(4819),o=t(1087),_=t(184),h=function(s){var e=s._id,t=s.name,h=s.pic,u=s.price,p=s.quantity,x=s.totalPrice;return(0,_.jsxs)("article",{className:i,children:[(0,_.jsxs)("div",{className:r,children:[(0,_.jsx)(o.rU,{to:"/product/".concat(e),title:"View ".concat(t),children:(0,_.jsx)("img",{src:h||d,alt:t,loading:"lazy"})}),(0,_.jsxs)("div",{className:a,children:[(0,_.jsx)(o.rU,{to:"/product/".concat(e),title:"View ".concat(t),children:(0,_.jsx)("h3",{className:n,children:t.length<=50?t:t.substring(0,50)+" ...."})}),(0,_.jsxs)("p",{children:["Quantity : ",p]})]}),(0,_.jsxs)("h3",{children:["\u20b9 ",u.toFixed(2)]})]}),(0,_.jsxs)("div",{className:c,children:[(0,_.jsxs)("p",{className:l,children:[(0,_.jsx)("span",{children:"Subtotal "}),(0,_.jsxs)("span",{children:["(","".concat(p,1===p?" item":" items"),") : "]})]}),(0,_.jsxs)("h3",{children:["\u20b9 ",x.toFixed(2)]})]})]})}},5386:function(s,e,t){t.r(e),t.d(e,{default:function(){return P}});var i="styles_view_order__OyANh",r="styles_address_details__iFD7D",n="styles_order_status_info__9WoVk",a="styles_payment_info__BcVni",c="styles_cart_info__eMGaM",l="styles_cart_items__RDGeh",d="styles_cart_subtotal__zSCCV",o="styles_processing__CSKFL",_="styles_shipped__WUZ7P",h="styles_delivered__oXIvP",u="styles_unpaid_pill__E3SNX",p="styles_paid_pill__TwEv+",x=t(7689),j=t(7143),m=t(8119),y=t(9126),v=t(4373),f=t(2426),g=t(6423),N=t(184),P=function(){var s,e,t=(0,x.UO)().id,P=(0,j.ir)({id:t}),b=P.data,S=P.isLoading,I=new Date(null===b||void 0===b?void 0:b.order.createdAt),D="".concat(I.getDate()," ").concat((0,f.Z)(I.getMonth()),", ").concat(I.getFullYear());return S?(0,N.jsx)(m.Z,{}):b&&b.success&&b.order?(0,N.jsxs)("section",{className:i,children:[(0,N.jsxs)("h1",{children:["Order # ",b.order._id]}),(0,N.jsxs)("div",{className:r,children:[(0,N.jsxs)("p",{children:[(0,N.jsx)("strong",{children:"Customer Address"})," : ",b.order.shippingInfo.location,", ",b.order.shippingInfo.city,(0,N.jsx)("br",{}),b.order.shippingInfo.state,", ",b.order.shippingInfo.country]}),(0,N.jsxs)("p",{children:[(0,N.jsx)("strong",{children:"Order Placed on"})," : ",D]}),(0,N.jsxs)("div",{className:a,children:[(0,N.jsx)("strong",{children:"Payment Status"}),(0,N.jsx)("span",{children:":"}),"canceled"===b.order.paymentInfo.status?(0,N.jsxs)("span",{className:u,children:[(0,N.jsx)(y.NbQ,{}),(0,N.jsx)("span",{children:"Unpaid"})]}):(0,N.jsxs)("span",{className:p,children:[(0,N.jsx)(v.DVR,{}),(0,N.jsx)("span",{children:"Paid"})]})]}),(0,N.jsxs)("div",{className:n,children:[(0,N.jsx)("strong",{children:"Order Status"})," :"," ","processing"===b.order.orderStatus?(0,N.jsx)("span",{className:o,children:"Processing"}):"shipped"===b.order.orderStatus?(0,N.jsx)("span",{className:_,children:"Shipped"}):"delivered"===b.order.orderStatus?(0,N.jsx)("span",{className:h,children:"Delivered"}):null]})]}),(0,N.jsx)("h3",{children:"Products Purchased :"}),(0,N.jsxs)("div",{className:c,children:[(0,N.jsx)("section",{className:l,children:null===(s=b.order.orderItems)||void 0===s?void 0:s.map((function(s){var e=s._id,t=s.name,i=s.image,r=s.price,n=s.quantity,a=s.totalPrice;return(0,N.jsx)(g.Z,{_id:e,name:t,pic:null===i||void 0===i?void 0:i.pic,price:r,quantity:n,totalPrice:a},e)}))}),(0,N.jsxs)("section",{className:d,children:[(0,N.jsx)("h2",{children:"Subtotal"}),(0,N.jsxs)("h3",{children:["Total Items : ",null===(e=b.order.orderItems)||void 0===e?void 0:e.length]}),(0,N.jsxs)("h3",{children:["Total Price : \u20b9 ",b.order.totalPrice]})]})]})]}):(0,N.jsx)(N.Fragment,{})}},2426:function(s,e){var t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];e.Z=function(s){return t[s]}},4819:function(s,e,t){s.exports=t.p+"static/media/imageNotFound.d599199dde84a16b6af4.jfif"}}]);
//# sourceMappingURL=386.36f88a6c.chunk.js.map