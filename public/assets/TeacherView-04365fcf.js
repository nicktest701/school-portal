import{j as s,l as r,n as k,W as I,b as S,u as A,i as B,r as w,S as E,c as R,d as P,C as Q,e as N,M as u,m as j,B as l,A as h,D as F,X as L,Q as Y,f as $,g as q,h as G}from"./index-ce442eb1.js";import{g as V,d as K}from"./teacherAPI-30a6d8ad.js";import{P as i,M as O}from"./ProfileItem-4d97a0f5.js";import{B as W}from"./Back-78662289.js";import{E as X}from"./Edit-009e8578.js";import{B as _}from"./ButtonGroup-ca857561.js";import{P as g}from"./Person-00952bda.js";function z({teacher:n}){return s.jsxs(r,{children:[s.jsx(i,{label:"Name",text:n==null?void 0:n.fullName}),s.jsx(i,{label:"Date Of Birth",tex:!0,text:k(new Date(n==null?void 0:n.dateofbirth)).format("Do MMMM, YYYY.")}),s.jsx(i,{label:"Gender",text:n==null?void 0:n.gender}),s.jsx(i,{label:"Email Address",text:n==null?void 0:n.email}),s.jsx(i,{label:"Telephone No.",text:n==null?void 0:n.phonenumber}),s.jsx(i,{label:"Address",text:n==null?void 0:n.address}),s.jsx(i,{label:"Residence",text:n==null?void 0:n.residence}),s.jsx(i,{label:"Nationality",text:n==null?void 0:n.nationality})]})}const f=()=>{var m,c,p;const n=S(),d=A(),{id:a}=B(),{schoolSessionDispatch:x}=w.useContext(E),e=R({queryKey:["teacher",a],queryFn:()=>V(a),initialData:(m=n.getQueryData(["teachers",a]))==null?void 0:m.find(o=>(o==null?void 0:o._id)===a),enabled:!!a}),y=()=>{d(`/teacher/${a}/edit`)},{mutateAsync:b,isLoading:v}=P({mutationFn:K}),C=()=>{$.fire({title:"Deleting Teacher",text:"Do you want to delete?",showCancelButton:!0,backdrop:!1}).then(o=>{o.isConfirmed&&b(a,{onSuccess:t=>{n.invalidateQueries(["teachers"]),x(q(t))},onError:t=>{x(G(t))}})})},D=()=>{var o,t;x({type:"sendQuickMessage",payload:{open:!0,data:{email:(o=e==null?void 0:e.data)==null?void 0:o.email,phonenumber:(t=e==null?void 0:e.data)==null?void 0:t.phonenumber}}})},T=()=>{d("level")},M=()=>{d("course")};return s.jsxs(s.Fragment,{children:[s.jsxs(Q,{children:[s.jsx(W,{to:"/teacher",color:"primary.main"}),s.jsx(N,{title:"Teacher Information",subtitle:"Manage teachers profile and assigned levels and courses",color:"primary.main"}),s.jsxs(u,{sx:{bgcolor:"#fff",py:4,px:2,my:4},children:[s.jsx(j,{paragraph:!0,variant:"h5",children:"Profile Details"}),s.jsx(r,{children:s.jsx(l,{sx:{alignSelf:"flex-end"},endIcon:s.jsx(X,{}),onClick:y,children:"Edit"})}),s.jsxs(u,{sx:{display:"flex",flexDirection:{xs:"column",md:"row"},justifyContent:{xs:"center",md:"space-evenly"},alignItems:"center",gap:2},children:[s.jsxs(r,{alignItems:"center",spacing:1,children:[s.jsx(u,{sx:{p:1,border:"1px solid lightgray",borderRadius:"50%"},children:s.jsx(h,{src:`https://school-portal-aivn.onrender.com/api/frebbys/v1/images/users/${(c=e==null?void 0:e.data)==null?void 0:c.profile}`,sx:{width:100,height:100}})}),s.jsx(j,{paragraph:!0,variant:"h5",children:(p=e==null?void 0:e.data)==null?void 0:p.fullName}),s.jsx(l,{startIcon:s.jsx(O,{}),onClick:D,children:"Send Message"}),s.jsxs(_,{variant:"contained",children:[s.jsx(l,{color:"secondary",endIcon:s.jsx(g,{}),onClick:T,children:"Assign Level"}),s.jsx(l,{color:"primary",endIcon:s.jsx(g,{}),onClick:M,children:"Assign Course"})]})]}),s.jsxs(r,{spacing:2,children:[s.jsx(z,{teacher:e==null?void 0:e.data}),s.jsx(F,{}),s.jsx(l,{color:"error",variant:"contained",endIcon:s.jsx(L,{}),onClick:C,children:"Remove Account"})]})]})]})]}),v&&s.jsx(Y,{value:"Removing Facilitator Information"})]})};f.propTypes={};const os=I.memo(f);export{os as default};