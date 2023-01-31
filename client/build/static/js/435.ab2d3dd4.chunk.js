"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[435],{1435:function(r,e,s){s.r(e);var n=s(4942),a=s(1413),t=s(4165),o=s(5861),c=s(9439),i=s(2791),d=s(5985),u=s(7692),l=s(11),p=s(8119),w=s(7143),m=s(184);e.default=function(){var r=(0,w.$h)(),e=(0,c.Z)(r,2),s=e[0],f=e[1],h=f.isLoading,x=f.isError,v=f.error,j=(0,i.useState)(!1),g=(0,c.Z)(j,2),b=g[0],k=g[1],Z=(0,i.useState)(!1),P=(0,c.Z)(Z,2),C=P[0],A=P[1],y=(0,i.useState)({password:"",confirmPassword:""}),E=(0,c.Z)(y,2),N=E[0],S=E[1],F=function(){var r=(0,o.Z)((0,t.Z)().mark((function r(e){var n;return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e.preventDefault(),N.password&&N.confirmPassword){r.next=4;break}return d.Am.warn("Please validate all the fields"),r.abrupt("return");case 4:if(N.confirmPassword===N.password){r.next=7;break}return d.Am.warn("Password fields are not matching"),r.abrupt("return");case 7:return r.prev=7,r.next=10,s({password:N.password}).unwrap();case 10:(n=r.sent).success&&d.Am.success(n.message),r.next=17;break;case 14:r.prev=14,r.t0=r.catch(7),d.Am.error(r.t0.data.message||"Unable to change password");case 17:case"end":return r.stop()}}),r,null,[[7,14]])})));return function(e){return r.apply(this,arguments)}}();(0,i.useEffect)((function(){x&&d.Am.error(v.data.message)}),[x,v]);var J=function(r){var e=r.target,s=e.name,t=e.value;S((0,a.Z)((0,a.Z)({},N),{},(0,n.Z)({},s,t)))};return(0,m.jsx)(m.Fragment,{children:h?(0,m.jsx)(p.Z,{}):(0,m.jsxs)("main",{className:"form-container",children:[(0,m.jsx)("div",{className:"image-container",children:(0,m.jsx)("img",{src:l.Z,alt:"background",loading:"lazy"})}),(0,m.jsxs)("form",{onSubmit:F,children:[(0,m.jsx)("h1",{children:"Change Password"}),(0,m.jsxs)("div",{className:"input-container",children:[(0,m.jsx)("label",{htmlFor:"password",children:"Enter new password"}),(0,m.jsx)("input",{type:b?"text":"password",name:"password",id:"password",placeholder:"Enter a strong password",value:N.password,onChange:J}),b?(0,m.jsx)(u.nJ9,{onClick:function(){return k(!1)}}):(0,m.jsx)(u.A7v,{onClick:function(){return k(!0)}})]}),(0,m.jsxs)("div",{className:"input-container",children:[(0,m.jsx)("label",{htmlFor:"confirmPassword",children:"Re-enter new password"}),(0,m.jsx)("input",{type:C?"text":"password",name:"confirmPassword",id:"confirmPassword",placeholder:"Re-enter your password",value:N.confirmPassword,onChange:J}),C?(0,m.jsx)(u.nJ9,{onClick:function(){return A(!1)}}):(0,m.jsx)(u.A7v,{onClick:function(){return A(!0)}})]}),(0,m.jsx)("button",{type:"submit",disabled:h,children:"Change Password"})]})]})})}}}]);
//# sourceMappingURL=435.ab2d3dd4.chunk.js.map