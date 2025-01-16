import{r as l,a0 as b,o as w,ak as D,b as I,S as E,_ as L,d as T,j as t,v as k,aC as B,B as g,E as M,x as N,m as C,f as h,g as A,h as F,i as S,u as _,Q as P,ay as z,M as O,e as Q}from"./index-ce442eb1.js";import{d as U}from"./School-7b1f6025.js";import{a as $}from"./studentColumns-f452d38f.js";import{M as G,t as q,E as R,C as W}from"./CustomizedMaterialTable-06b57d17.js";import{E as X}from"./images-ee905b8b.js";import{b as Y}from"./studentAPI-fe7d309a.js";import{D as H}from"./DialogActions-c9d7df2e.js";import{u as J}from"./useLevelById-e09284f0.js";import{s as K}from"./student_ico-5882123b.js";import{B as V}from"./Back-78662289.js";import"./gradeColor-6983157e.js";import"./ListItemText-b107adf9.js";import"./CircleRounded-06f2dceb.js";import"./TabPanel-47a179c1.js";import"./Toolbar-8b116404.js";import"./Chip-15117b24.js";import"./Autocomplete-87c4b1e1.js";import"./Skeleton-b715010d.js";import"./ButtonGroup-ca857561.js";import"./InputAdornment-92a613d9.js";import"./ListItemSecondaryAction-660d9daa.js";import"./useMediaQuery-5bcb3f64.js";import"./ListItem-2727fabf.js";import"./listItemButtonClasses-c7063ebe.js";import"./ListItemButton-97ec9750.js";import"./Check-4cc8eef7.js";import"./DeleteOutline-78b9d3f1.js";import"./Delete-fb41f478.js";function Z(){var f;const{userState:{session:s}}=l.useContext(b),{state:n}=w();D();const c=I(),[a,u]=l.useState([]),[i,o]=l.useState(!0),{schoolSessionState:m,schoolSessionDispatch:p}=l.useContext(E),e=m.fileData;l.useEffect(()=>{if(e.data.length>0){const r=e.columns.map(d=>({title:L.upperCase(d),field:d}));u(r)}o(!1)},[e]);const j=()=>{h.fire({title:"Exiting",text:"Do you want to exit?",showCancelButton:!0,backdrop:!1}).then(({isConfirmed:r})=>{r&&p({type:"closeFileDialog"})})},{mutateAsync:v}=T({mutationFn:Y}),y=()=>{o(!0);const r={students:e.data,session:{sessionId:s.sessionId,termId:s.termId,levelId:n.levelId},type:e.type};h.fire({title:"Importing students",text:"Do you want to import ?",showCancelButton:!0,backdrop:!1}).then(({isConfirmed:d})=>{d&&v(r,{onSettled:()=>{c.invalidateQueries(["current-students"]),o(!1)},onSuccess:x=>{p(A(x))},onError:x=>{p(F(x))}}),o(!1)})};return t.jsxs(k,{open:e.open,fullScreen:!0,fullWidth:!0,children:[t.jsx(B,{children:"Preview"}),t.jsxs(H,{sx:{paddingX:3},children:[t.jsx(g,{onClick:j,children:"Cancel"}),t.jsx(M,{variant:"contained",loading:i,onClick:y,children:"Save"})]}),t.jsx(N,{children:((f=e.data)==null?void 0:f.length)===0?t.jsx(C,{children:"No data available"}):t.jsx(G,{title:"Students",isLoading:i,icons:q,columns:a,data:e.data,options:{pageSize:10,pageSizeOptions:[10,20,30,50]}})})]})}const tt=()=>{const{id:s,type:n}=S(),c=_(),{students:a,rollNumber:u,levelLoading:i}=J(s),o=()=>{c("/student/new")},m=()=>{c(`/level/attendance/${s}/${n}`)};return i?t.jsx(P,{value:"Loading Student Information"}):t.jsxs(t.Fragment,{children:[(a==null?void 0:a.length)===0?t.jsx(R,{img:X.student,message:"😑 No Student available.Add your first student to this level",buttonText:"New Student",onClick:o,showAddButton:!0}):t.jsx(W,{search:!0,isLoading:i,title:n,subtitle:`${u} Students`,exportFileName:n||"",columns:$,data:a,actions:[],autoCompleteComponent:t.jsx(g,{variant:"contained",startIcon:t.jsx(z,{}),onClick:m,children:"Make New Attendance"}),icon:K}),t.jsx(Z,{})]})},Tt=()=>{const{type:s}=S();return t.jsxs(t.Fragment,{children:[t.jsx(V,{to:"/level",color:"primary.main"}),t.jsxs(O,{sx:{display:"flex",flexDirection:{xs:"column",sm:"row"},justifyContent:{xs:"space-around",md:"space-between"},alignItems:"center",bgcolor:"#fff",mb:4,p:1},children:[t.jsx(Q,{title:"Current Level",subtitle:"Track,manage and control academic and class activities",icon:t.jsx(U,{color:"inherit",sx:{width:50,height:50}}),color:"primary.main"}),t.jsx(C,{variant:"h5",paragraph:!0,whiteSpace:"nowrap",children:s})]}),t.jsx(tt,{})]})};export{Tt as default};