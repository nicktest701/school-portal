import{r as b,a0 as y,S as j,b as C,d as f,j as e,s as R,t as I,v as T,w as k,ak as B,k as L,T as g,y as Q,Q as v,g as E,h as N,n as $,a as A,u as F,i as _,c as M,N as z,M as P,e as U,l as q,B as h}from"./index-DrgqF6h7.js";import{S as O}from"./School-_-8G5cEF.js";import{s as V}from"./student_ico-BGUw5C9J.js";import{B as W}from"./Back-CADpxW16.js";import{C as G}from"./CustomizedMaterialTable-sErZg5Gy.js";import{b as K}from"./studentColumns-Dev_8qkQ.js";import{u as Y,i as H}from"./ExaminationAPI-CMjpI3MV.js";import{u as J}from"./useLevelById-C5Sw-_pl.js";import{g as X}from"./generateCustomGrade-DQ-rrl9K.js";import"./TabPanel-Bl8roboH.js";import"./useThemeProps-DLRF2U3R.js";import"./Toolbar-Bzx_LBRC.js";import"./Chip-BcLQNplL.js";import"./Autocomplete-D4vPEd6T.js";import"./Skeleton-BUD-o5ar.js";import"./ButtonGroup-DQMwsk7A.js";import"./ListItemText-Bwh_rzOL.js";import"./InputAdornment-EcTjtcuD.js";import"./index-_n9xtSlI.js";import"./DialogActions-Cx2GHHEW.js";import"./ListItem-yCsexoBs.js";import"./ListItemSecondaryAction-mmiMbVqP.js";import"./listItemButtonClasses-CLhmtlXH.js";import"./ListItemButton-BUsfko6u.js";import"./Check-CEGAxChF.js";import"./DeleteOutline-DM92K-00.js";import"./images-B5fNBSni.js";import"./gradeColor-B1MTvGsq.js";import"./CircleRounded-Bh8WmZqU.js";function Z(){const{userState:{session:r}}=b.useContext(y),{schoolSessionState:{addStudentResults:{open:a,data:i,grade:p}},schoolSessionDispatch:c}=b.useContext(j),o=C(),{mutateAsync:x,isLoading:n}=f({mutationFn:Y}),S=s=>{const t=Number(s.classScore)+Number(s.examsScore),d=X(t,p),m={session:{sessionId:r==null?void 0:r.sessionId,termId:r==null?void 0:r.termId,levelId:r==null?void 0:r.levelId,studentId:s==null?void 0:s._id},scores:[{subject:s==null?void 0:s.subject,classScore:s==null?void 0:s.classScore,examsScore:s==null?void 0:s.examsScore,...d}]};x(m,{onSettled:()=>{o.invalidateQueries(["student-records"]),o.invalidateQueries(["exams-scores"]),o.invalidateQueries(["exams-details"]),o.invalidateQueries(["exams-reports"]),o.invalidateQueries(["exams-by-id"]),o.invalidateQueries(["subject-score"])},onSuccess:u=>{c(E(u)),l()},onError:u=>{c(N(u))}})},l=()=>{c({type:"addStudentResults",payload:{open:!1,data:{_id:"",level:"",classScore:"",examsScore:"",totalScore:"",grade:"",remarks:""},grade:p}})};return e.jsxs(R,{open:a,onClose:l,fullWidth:!0,maxWidth:"xs",children:[e.jsx(I,{title:"Add Record",onClose:l}),e.jsx(T,{children:e.jsx(k,{initialValues:i,validationSchema:B,onSubmit:S,children:({values:s,errors:t,touched:d,handleChange:m,handleSubmit:u})=>e.jsx(e.Fragment,{children:e.jsxs(L,{spacing:2,paddingY:2,children:[e.jsx(g,{label:"Subject",size:"small",value:s.subject,onChange:m("subject"),error:!!t.subject,helperText:d.subject&&t.subject}),e.jsx(g,{type:"number",label:"Class Score",size:"small",value:s.classScore,onChange:m("classScore"),error:!!t.classScore,helperText:d.classScore&&t.classScore}),e.jsx(g,{type:"number",label:"Exams Score",size:"small",value:s.examsScore,onChange:m("examsScore"),error:!!t.examsScore,helperText:d.examsScore&&t.examsScore}),e.jsx(Q,{loading:n,variant:"contained",onClick:u,children:"Save Record"})]})})})}),n&&e.jsx(v,{value:"Saving Record..."})]})}function Be(){const{schoolSessionDispatch:r}=b.useContext(j),{state:a}=$(),[i]=A(),p=F(),{level:c,levelId:o}=_(),{gradeSystem:x}=J(o),n=M({queryKey:["subject-score",o,i.get("sub")],queryFn:()=>H({id:o,subject:i.get("sub")}),enabled:!!o&&!!i.get("sub")}),S=()=>{p(`/examination/level/${o}/${c}/upload?sub=${i.get("sub")}`,{state:{prevPath:`/course/assign/${o}/${c}?sub=${i.get("sub")}`}})},l=t=>{r({type:"addStudentResults",payload:{open:!0,data:{_id:t==null?void 0:t._id,indexnumber:t==null?void 0:t.indexnumber,levelId:a==null?void 0:a.id,...t==null?void 0:t.course},grade:x}})};if(!o&&!i.get("sub"))return e.jsx(z,{to:"/course/assign"});const s=[...K,{field:null,title:"Action",render:t=>e.jsx(h,{variant:"outlined",onClick:()=>l(t),children:"Add Record"})}];return e.jsxs(e.Fragment,{children:[e.jsx(W,{to:"/course/assign",color:"primary.main"}),e.jsxs(P,{sx:{display:"flex",flexDirection:{xs:"column",sm:"row"},justifyContent:{xs:"space-around",md:"space-between"},alignItems:"center",bgcolor:"#fff",mb:4,p:1,pr:2},children:[e.jsx(U,{title:"Manage Student Records",subtitle:"Track,manage and control academic and class activities",icon:e.jsx(O,{color:"inherit",sx:{width:50,height:50}}),color:"primary.main"}),e.jsx(q,{variant:"h5",paragraph:!0,whiteSpace:"nowrap",children:a==null?void 0:a.type})]}),e.jsx(G,{search:!0,isLoading:n.isLoading,title:a==null?void 0:a.type,subtitle:i.get("sub"),exportFileName:`${c}-${i.get("sub")}`||"",columns:s,data:n.data,actions:[],icon:V,handleRefresh:n==null?void 0:n.refetch,autoCompleteComponent:e.jsx(h,{variant:"contained",onClick:S,children:"Import Records"})}),e.jsx(Z,{})]})}export{Be as default};
