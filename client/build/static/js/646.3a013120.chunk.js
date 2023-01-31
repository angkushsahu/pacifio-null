"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[646],{8646:function(e,a,r){r.r(a);var n=r(4942),t=r(1413),s=r(4165),i=r(5861),l=r(9439),o=r(2791),c=r(7689),u=r(1087),m=r(5985),d=r(7692),p=r(6355),h=r(8119),v=r(4497),f=r(11),x=r(7143),g=r(4353),j=r(337),w=r(8544),b=r(184);a.default=function(){var e=(0,j.TL)(),a=(0,x.Bl)(),r=(0,l.Z)(a,2),k=r[0],Z=r[1],y=Z.isLoading,C=Z.isError,N=Z.error,A=(0,o.useState)(!1),F=(0,l.Z)(A,2),P=F[0],S=F[1],E=(0,o.useState)(!1),R=(0,l.Z)(E,2),z=R[0],L=R[1],D=(0,o.useState)({name:"",email:"",password:"",confirmPassword:"",avatar:""}),J=(0,l.Z)(D,2),U=J[0],B=J[1],T=(0,o.useRef)(null),W=(0,c.s0)(),X=function(){var a=(0,i.Z)((0,s.Z)().mark((function a(r){var n,t,i,l,o;return(0,s.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(r.preventDefault(),n=U.name,t=U.email,i=U.password,l=U.confirmPassword,n&&t&&i&&l){a.next=5;break}return m.Am.warn("Please validate all the fields"),a.abrupt("return");case 5:if((0,v.Z)(t)){a.next=8;break}return m.Am.warn("E-mail format is not correct"),a.abrupt("return");case 8:if(i===l){a.next=11;break}return m.Am.error("Password fields are not matching"),a.abrupt("return");case 11:return a.prev=11,a.next=14,k(U).unwrap();case 14:(o=a.sent).success&&(m.Am.success(o.message),e((0,w.av)({user:o.user})),W("/",{replace:!0})),a.next=21;break;case 18:a.prev=18,a.t0=a.catch(11),m.Am.error(a.t0.data.message||"Unable to signup");case 21:case"end":return a.stop()}}),a,null,[[11,18]])})));return function(e){return a.apply(this,arguments)}}();(0,o.useEffect)((function(){C&&(m.Am.error(N.data.message),e((0,w.kX)()))}),[C,N,e]);var $=function(e){var a=e.target,r=a.name,s=a.value;B((0,t.Z)((0,t.Z)({},U),{},(0,n.Z)({},r,s)))};return(0,b.jsx)(b.Fragment,{children:y?(0,b.jsx)(h.Z,{}):(0,b.jsxs)("main",{className:"form-container",children:[(0,b.jsx)("div",{className:"image-container",children:(0,b.jsx)("img",{src:f.Z,alt:"background",loading:"lazy"})}),(0,b.jsxs)("form",{onSubmit:X,children:[(0,b.jsx)("h1",{className:"text-center",children:"Signup"}),(0,b.jsx)("label",{htmlFor:"avatar",className:"avatar-image--container",children:U.avatar.length?(0,b.jsx)("img",{src:U.avatar,alt:"avatar",loading:"lazy",title:"Select an avatar",className:"avatar-image"}):(0,b.jsx)(p.m3W,{title:"Select an avatar",className:"avatar-image"})}),(0,b.jsxs)("div",{className:"input-container",children:[(0,b.jsx)("label",{htmlFor:"name",children:"Enter your name"}),(0,b.jsx)("input",{type:"text",name:"name",id:"name",placeholder:"e.g. John Doe",value:U.name,onChange:$})]}),(0,b.jsxs)("div",{className:"input-container",children:[(0,b.jsx)("label",{htmlFor:"email",children:"Enter your e-mail"}),(0,b.jsx)("input",{type:"email",name:"email",id:"email",placeholder:"e.g. johndoe@gmail.com",value:U.email,onChange:$})]}),(0,b.jsxs)("div",{className:"input-container",children:[(0,b.jsx)("label",{htmlFor:"password",children:"Enter your password"}),(0,b.jsx)("input",{type:P?"text":"password",name:"password",id:"password",placeholder:"Enter a strong password",value:U.password,onChange:$}),P?(0,b.jsx)(d.nJ9,{onClick:function(){return S(!1)}}):(0,b.jsx)(d.A7v,{onClick:function(){return S(!0)}})]}),(0,b.jsxs)("div",{className:"input-container",children:[(0,b.jsx)("label",{htmlFor:"confirmPassword",children:"Re-enter your password"}),(0,b.jsx)("input",{type:z?"text":"password",name:"confirmPassword",id:"confirmPassword",placeholder:"Re-enter your password",value:U.confirmPassword,onChange:$}),z?(0,b.jsx)(d.nJ9,{onClick:function(){return L(!1)}}):(0,b.jsx)(d.A7v,{onClick:function(){return L(!0)}})]}),(0,b.jsxs)("div",{className:"input-container avatar-container",onClick:function(){var e;return null===(e=T.current)||void 0===e?void 0:e.click()},children:[(0,b.jsx)("label",{htmlFor:"avatar",children:"Choose an avatar (optional)"}),(0,b.jsx)("input",{type:"file",accept:"image/*",name:"avatar",id:"avatar",placeholder:"choose from your device",onChange:function(e){var a=e.target.files[0];if(a){var r=new FileReader;r.readAsDataURL(a),r.onload=function(){B((0,t.Z)((0,t.Z)({},U),{},{avatar:String(r.result)}))}}},ref:T})]}),(0,b.jsx)("button",{type:"submit",disabled:y,children:"Register"}),(0,b.jsx)("div",{className:"more-links--wrapper",children:(0,b.jsx)(u.rU,{to:g.Z.login,className:"more-links",children:"Login instead"})})]})]})})}},4497:function(e,a){a.Z=function(e){return e.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)}}}]);
//# sourceMappingURL=646.3a013120.chunk.js.map