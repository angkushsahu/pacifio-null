"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[355],{2355:function(e,r,n){n.r(r);var a=n(4165),t=n(5861),s=n(9439),i=n(2791),c=n(5985),u=n(4497),l=n(11),o=n(8119),m=n(7143),d=n(184);r.default=function(){var e=(0,i.useState)(""),r=(0,s.Z)(e,2),n=r[0],f=r[1],h=(0,m.zN)(),p=(0,s.Z)(h,2),x=p[0],b=p[1],g=b.isLoading,j=b.isError,v=b.error,Z=function(){var e=(0,t.Z)((0,a.Z)().mark((function e(r){var t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),n){e.next=4;break}return c.Am.warn("Please enter your e-mail"),e.abrupt("return");case 4:if((0,u.Z)(n)){e.next=7;break}return c.Am.warn("E-mail format is not correct"),e.abrupt("return");case 7:return e.prev=7,e.next=10,x({email:n}).unwrap();case 10:(t=e.sent).success&&c.Am.success(t.message),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(7),c.Am.error(e.t0.data.message||"Unable to find your account");case 17:case"end":return e.stop()}}),e,null,[[7,14]])})));return function(r){return e.apply(this,arguments)}}();return(0,i.useEffect)((function(){j&&c.Am.error(v.data.message)}),[j,v]),(0,d.jsx)(d.Fragment,{children:g?(0,d.jsx)(o.Z,{}):(0,d.jsxs)("main",{className:"form-container",children:[(0,d.jsx)("div",{className:"image-container",children:(0,d.jsx)("img",{src:l.Z,alt:"background",loading:"lazy"})}),(0,d.jsxs)("form",{onSubmit:Z,children:[(0,d.jsx)("h1",{children:"Forgot Password"}),(0,d.jsxs)("div",{className:"input-container",children:[(0,d.jsx)("label",{htmlFor:"email",children:"Enter your e-mail"}),(0,d.jsx)("input",{type:"email",name:"email",id:"email",placeholder:"e.g. johndoe@gmail.com",value:n,onChange:function(e){return f(e.target.value)}})]}),(0,d.jsx)("button",{type:"submit",disabled:g,children:"Send email"})]})]})})}},4497:function(e,r){r.Z=function(e){return e.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)}}}]);
//# sourceMappingURL=355.3630c969.chunk.js.map