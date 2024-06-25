import{O as E,j as e,r as d,U as H,bK as P,X as _,u as k,S as z,_ as F,h as N,i as T,z as O,t as B,B as q,v as R,l as b,q as y,cd as Y,ce as W,K as v,w as $,x as Q,P as U,Q as K,cf as S,a7 as g,g as V,cg as G,y as X,C as J,a as r,p as Z,L as ee,aL as te,a0 as C,M as se,bT as ae,a2 as L,ch as ne,J as oe,G as ie,a4 as re,ai as le,E as ce}from"./index-5b8f5a53.js";import{d as de}from"./School-7deb6011.js";import{a as ue}from"./studentColumns-2ede27bc.js";import{a as pe}from"./studentAPI-52d9bd23.js";const me=E(e.jsx("path",{d:"M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9m-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8z"}),"History");function xe(){var j;const{userState:{session:n}}=d.useContext(H),{state:o}=P();_();const l=k(),[s,i]=d.useState([]),[t,c]=d.useState(!0),{schoolSessionState:x,schoolSessionDispatch:p}=d.useContext(z),a=x.fileData;d.useEffect(()=>{if(a.data.length>0){const u=a.columns.map(m=>({title:F.upperCase(m),field:m}));i(u)}c(!1)},[a]);const I=()=>{v.fire({title:"Exiting",text:"Do you want to exit?",showCancelButton:!0,backdrop:!1}).then(({isConfirmed:u})=>{u&&p({type:"closeFileDialog"})})},{mutateAsync:w}=N({mutationFn:pe}),M=()=>{c(!0);const u={students:a.data,session:{sessionId:n.sessionId,termId:n.termId,levelId:o.levelId},type:a.type};v.fire({title:"Importing students",text:"Do you want to import ?",showCancelButton:!0,backdrop:!1}).then(({isConfirmed:m})=>{m&&w(u,{onSettled:()=>{l.invalidateQueries(["current-students"]),c(!1)},onSuccess:h=>{p($(h))},onError:h=>{p(Q(h))}}),c(!1)})};return e.jsxs(T,{open:a.open,fullScreen:!0,fullWidth:!0,children:[e.jsx(O,{children:"Preview"}),e.jsxs(B,{sx:{paddingX:3},children:[e.jsx(q,{onClick:I,children:"Cancel"}),e.jsx(R,{variant:"contained",loading:t,onClick:M,children:"Save"})]}),e.jsx(b,{children:((j=a.data)==null?void 0:j.length)===0?e.jsx(y,{children:"No data available"}):e.jsx(Y,{title:"Students",isLoading:t,icons:W,columns:s,data:a.data,options:{pageSize:10,pageSizeOptions:[10,20,30,50]}})})]})}var f={},he=K;Object.defineProperty(f,"__esModule",{value:!0});var D=f.default=void 0,ye=he(U()),ge=e;D=f.default=(0,ye.default)((0,ge.jsx)("path",{d:"M15.59 3.59c-.38-.38-.89-.59-1.42-.59H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V9.83c0-.53-.21-1.04-.59-1.41zM8 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m0-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m0-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m6 0V4.5l5.5 5.5H15c-.55 0-1-.45-1-1"}),"SummarizeRounded");function A({open:n,setOpen:o}){var i;const{id:l}=g(),s=V({queryKey:["attendance-history"],queryFn:()=>G(l),enabled:!!l});return e.jsxs(T,{open:n,fullWidth:!0,maxWidth:"md",TransitionComponent:X,children:[e.jsx(J,{title:"Attendance History",onClose:()=>o(!1)}),e.jsxs(b,{children:[s.isLoading&&e.jsx(y,{children:"Loading...."}),e.jsx(r,{primary:`Attendance - ${(i=s==null?void 0:s.data)==null?void 0:i.length} days`,primaryTypographyProps:{fontSize:20,fontWeight:"bold",textAlign:"right"}}),e.jsxs(Z,{sx:{maxHeight:600},children:[e.jsxs(ee,{children:[e.jsx(r,{primary:"Date"}),e.jsx(r,{primary:"Present"}),e.jsx(r,{primary:"Absent"})]}),s.data&&s.data.map(t=>e.jsxs(te,{divider:!0,children:[e.jsx(r,{primary:C(t.date).format("Do MMMM,YYYY"),secondary:C(t.date).format("dddd"),secondaryTypographyProps:{color:"primary.main",fontWeight:"bold"}}),e.jsx(r,{primary:t.present,primaryTypographyProps:{width:100}}),e.jsx(r,{primary:t.absent,primaryTypographyProps:{width:100}})]},t.date))]})]})]})}A.propTypes={open:S.PropTypes.bool,setOpen:S.PropTypes.func};const fe=()=>{const{id:n,type:o}=g(),l=se(),[s,i]=d.useState(!1),{students:t,rollNumber:c,levelLoading:x}=ae(n),a=[{icon:()=>e.jsx(D,{}),position:"toolbar",tooltip:"New Attendance",onClick:()=>{l(`/level/attendance/${n}/${o}`)},isFreeAction:!0},{icon:()=>e.jsx(me,{}),position:"toolbar",tooltip:"Attendance History",onClick:()=>i(!0),isFreeAction:!0}];return e.jsxs(e.Fragment,{children:[e.jsx(L,{children:(t==null?void 0:t.length)===0?e.jsx(ne,{img:oe.student,message:"😑 No Student available.Add your first student to this level",buttonText:"New Student"}):e.jsx(ie,{search:!0,isLoading:x,title:o,subtitle:`${c} Students`,exportFileName:o||"",columns:ue,data:t,actions:[...a],icon:re})}),e.jsx(A,{open:s,setOpen:i}),e.jsx(xe,{})]})},Te=()=>{const{type:n}=g();return e.jsxs(e.Fragment,{children:[e.jsx(le,{to:"/level",color:"primary.main"}),e.jsxs(L,{sx:{display:"flex",flexDirection:{xs:"column-reverse",sm:"row"},justifyContent:"space-between",alignItems:"center",gap:2,paddingY:4},children:[e.jsx(ce,{title:"Current Level",subtitle:"Track,manage and control academic and class activities",icon:e.jsx(de,{color:"inherit",sx:{width:50,height:50}}),color:"primary.main"}),e.jsx(y,{sx:{display:{xs:"none",md:"inline-flex"}},variant:"h5",paragraph:!0,whiteSpace:"nowrap",children:n})]}),e.jsx(fe,{})]})};export{Te as default};
