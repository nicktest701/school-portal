import{p as Pe,j as e,k as A,F as C,B as v,I as de,q as ze,s as Q,r as y,S as D,b as B,d as E,t as N,v as R,w as W,T as w,x as ce,y as Se,l as z,z as ye,D as K,L as U,g as F,h as P,_ as b,G as be,c as ne,H as Y,a as Ce,J as _e,K as ae,f as ue,E as ve,M as ke,O as Ne,C as Re,e as We}from"./index-B8PQHtjc.js";import{s as Oe}from"./session_ico-C_mTk6NS.js";import{r as we,u as Ge,C as Ae}from"./CustomizedMaterialTable-BQoTtwVw.js";import{E as te}from"./images-B5fNBSni.js";import{g as je}from"./gradeColor-B1MTvGsq.js";import{L as I}from"./ListItem-CQImyTSy.js";import{L as O}from"./ListItemSecondaryAction-DOVMjMKm.js";import{G as Me,R as Le,a as ge,b as qe}from"./sessionColumns-oq904N9H.js";import{A as _}from"./Autocomplete-Dw57Ihk7.js";import{N as Te}from"./NoteRounded-DYrWuwPi.js";import{C as De}from"./Chip-DmEpgF7y.js";import{D as J}from"./DialogActions-BmNk8sop.js";import{v as se}from"./v4-C6aID195.js";import{D as re}from"./DeleteOutline-BlPFLwFk.js";import{L as ie}from"./ListItemText-DzMM1D1F.js";import{u as Ve}from"./useLevel-K9fH0Cop.js";import{L as He}from"./Link-kLE4_HTq.js";import{p as Qe,a as Ke,d as Ue,g as Ye}from"./subjectAPI-BJJTWRfs.js";import{T as Je,a as $e,b as pe,c as fe}from"./TabPanel-WHfZdNAn.js";import"./Toolbar-YM__bEFh.js";import"./useThemeProps-CEPKeDia.js";import"./Skeleton-DWRiBFRT.js";import"./ButtonGroup-ZC3qSltg.js";import"./InputAdornment-DAOlZ4uj.js";import"./index-BqG4A_N5.js";import"./Grid2-B2FVLpOz.js";import"./ListItemButton-Di0YOqWQ.js";import"./listItemButtonClasses-DySKLRoc.js";import"./Check-JB41DPzl.js";import"./currencyFormatter-DjBDW3hY.js";import"./CircleRounded-YWo57tpF.js";const Ie=Pe(e.jsx("path",{d:"M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z"}),"Download");function he({id:r,highestMark:n,lowestMark:c,grade:S,remarks:x,removeGrade:u}){return e.jsx(I,{divider:!0,children:e.jsxs(A,{direction:"row",spacing:4,width:"80%",children:[e.jsx(C,{sx:{width:"15%"},children:n}),e.jsx(C,{sx:{width:"15%"},children:"-"}),e.jsx(C,{sx:{width:"15%"},children:c}),e.jsx(C,{sx:{width:"15%"},children:S}),e.jsxs(O,{children:[e.jsx(v,{size:"small",sx:{px:2,mr:4,bgcolor:je(n).bg,color:je(n).color},children:x}),u&&e.jsx(de,{onClick:()=>u(r),children:e.jsx(ze,{})})]})]})})}const Xe=async()=>{try{return(await Q({method:"GET",url:"/grades"})).data}catch(r){return r.response.data}},Be=async r=>{try{return(await Q({method:"GET",url:`/grades/${r}`})).data}catch(n){return n.response.data}},Ze=async r=>{try{return(await Q({method:"POST",url:"/grades",data:r})).data}catch(n){return n.response.data}},es=async r=>{try{return(await Q({method:"PUT",url:"/grades",data:r})).data}catch(n){return n.response.data}},ss=async r=>{try{return(await Q({method:"DELETE",url:`/grades/${r}`})).data}catch(n){return n.response.data}};function ts({open:r,setOpen:n}){const{schoolSessionDispatch:c}=y.useContext(D),S=B(),[x,u]=y.useState([]),[j,g]=y.useState(""),i={lowestMark:0,highestMark:0,grade:"",remarks:""},h=(t,a)=>{t.id=se(),u(m=>[...m,t]),a.resetForm()},k=t=>{const a=x.filter(({id:m})=>m!==t);u(a)},{mutateAsync:p,isPending:M}=E({mutationFn:Ze}),L=()=>{const t={name:j||se(),ratings:x};p(t,{onSettled:()=>{S.invalidateQueries(["grades"])},onSuccess:a=>{c(F(a)),u([]),n(!1)},onError:a=>{c(P(a))}})},T=t=>{var m;const a=(m=t.target.files)==null?void 0:m[0];if(a){const s=new FileReader;s.onload=d=>{var l;const f=(l=d.target)==null?void 0:l.result;if(f){const G=we(f,{type:"binary"}),$=G.SheetNames[0],X=G.Sheets[$],q=Ge.sheet_to_json(X,{header:1}),le=q[0].map(V=>b.camelCase(V)),Z=q.slice(1).map(V=>{const ee={};return le.forEach((oe,H)=>{ee[oe]=V[H]}),ee.id=se(),ee});u(Z)}},s.readAsBinaryString(a)}},o=async()=>{await be("grades")};return e.jsxs(N,{open:r,maxWidth:"md",children:[e.jsx(R,{title:"New Grading System",subtitle:"Add new grades and remarks",onClose:()=>n(!1)}),e.jsxs(W,{children:[e.jsxs(A,{spacing:3,py:2,children:[e.jsx(w,{label:"Name of Grading System",size:"small",value:j,onChange:t=>g(t.target.value)}),e.jsx(ce,{initialValues:i,validationSchema:Se,onSubmit:h,children:({values:t,errors:a,touched:m,setFieldValue:s,handleChange:d,handleSubmit:f})=>e.jsxs(A,{direction:{xs:"column",md:"row"},spacing:1,children:[e.jsx(w,{label:"Lowest Mark",type:"number",inputMode:"numeric",size:"small",value:t.lowestMark,onChange:d("lowestMark"),error:!!(m.lowestMark&&a.lowestMark),helperText:a.lowestMark}),e.jsx(w,{label:"Highest Mark",type:"number",inputMode:"numeric",size:"small",value:t.highestMark,onChange:d("highestMark"),error:!!(m.highestMark&&a.highestMark),helperText:a.highestMark}),e.jsx(_,{freeSolo:!0,options:Me,getOptionLabel:l=>l||"",defaultValue:t.grade,value:t.grade,onChange:(l,G)=>s("grade",G),renderInput:l=>e.jsx(w,{...l,label:"Grade",size:"small",error:!!(m.grade&&a.grade),helperText:m.grade&&a.grade})}),e.jsx(_,{freeSolo:!0,fullWidth:!0,options:Le,getOptionLabel:l=>l||"",defaultValue:t.remarks,value:t.remarks,onChange:(l,G)=>s("remarks",G),renderInput:l=>e.jsx(w,{...l,label:"remarks",size:"small",error:!!(m.remarks&&a.remarks),helperText:m.remarks&&a.remarks})}),e.jsx(v,{size:"small",variant:"contained",onClick:f,children:"Add"})]})}),e.jsx(v,{sx:{bgcolor:"var(--secondary)",width:260},children:e.jsxs(C,{htmlFor:"studentFile",title:"Import Grade from File",sx:{display:"flex",justifyContent:"center",alignItems:"center",gap:1,color:"primary.main",fontSize:11,cursor:"pointer"},children:[e.jsx(Te,{htmlColor:"#fff"}),e.jsx(z,{variant:"caption",color:"#fff",children:"Import Grade from File (.xlsx,.xls,.csv)"}),e.jsx(ye,{type:"file",id:"studentFile",name:"studentFile",hidden:!0,inputProps:{accept:".xlsx,.xls,.csv"},onChange:T,onClick:t=>{t.target.value=null,t.currentTarget.value=null}})]})}),e.jsx(v,{sx:{alignSelf:"flex-end",textDecoration:"underline"},variant:"text",onClick:o,endIcon:e.jsx(Ie,{}),children:"Download Template here"}),e.jsx(K,{children:e.jsx(De,{label:"Grades"})})]}),e.jsxs(U,{children:[e.jsx(I,{divider:!0,children:e.jsxs(A,{direction:"row",spacing:2,justifyContent:"space-between",width:"80%",children:[e.jsx(C,{children:"Highest Mark"}),e.jsx(C,{children:"Lowest Mark"}),e.jsx(C,{children:"Grade"}),e.jsx(C,{children:"Remarks"}),e.jsx(O,{children:e.jsx(C,{children:"Action"})})]})}),x.map(t=>e.jsx(he,{...t,removeGrade:k},t==null?void 0:t.id))]})]}),e.jsxs(J,{children:[e.jsx(v,{onClick:()=>n(!1),children:"Cancel"}),e.jsx(v,{loading:M,variant:"contained",disabled:x.length===0,onClick:L,children:"Submit"})]})]})}function ns(){const{schoolSessionState:{viewGrades:{open:r,ratings:n}},schoolSessionDispatch:c}=y.useContext(D),S=()=>{c({type:"viewGrade",payload:{open:!1,data:[]}})};return e.jsxs(N,{open:r,maxWidth:"sm",fullWidth:!0,children:[e.jsx(R,{title:"Grade",onClose:S}),e.jsx(W,{children:e.jsxs(U,{children:[e.jsxs(I,{sx:{display:"flex",columnGap:8},width:"80%",children:[e.jsx(C,{children:"Highest Mark"}),e.jsx(C,{children:"Lowest Mark"}),e.jsx(C,{children:"Grade"}),e.jsx(O,{children:e.jsx(C,{children:"Remarks"})})]}),n.map(x=>e.jsx(he,{...x},x==null?void 0:x.id))]})})]})}function as(){const{schoolSessionState:{editGrades:{open:r,data:n}},schoolSessionDispatch:c}=y.useContext(D),S=B(),[x,u]=y.useState([]),[j,g]=y.useState(""),i={lowestMark:0,highestMark:0,grade:"",remarks:""},h=ne({queryKey:["grade",n==null?void 0:n._id],queryFn:()=>Be(n==null?void 0:n._id),enabled:!!(n!=null&&n._id),initialData:n});y.useEffect(()=>{var t,a;g((t=h==null?void 0:h.data)==null?void 0:t.name),u((a=h==null?void 0:h.data)==null?void 0:a.ratings)},[h.data]);const k=(t,a)=>{t.id=se();const m=b.values(b.merge(b.keyBy([...x,t],"remarks")));u(m),a.resetForm()},p=t=>{const a=x.filter(({id:m})=>m!==t);u(a)},{mutateAsync:M,isPending:L}=E({mutationFn:es}),T=()=>{const t={_id:n==null?void 0:n._id,name:j,ratings:x};M(t,{onSettled:()=>{S.invalidateQueries(["grades"])},onSuccess:a=>{c(F(a)),u([]),o()},onError:a=>{c(P(a))}})},o=()=>{c({type:"editGrade",payload:{open:!1,data:{}}})};return e.jsxs(N,{open:r,children:[e.jsx(R,{title:"New Grading System",subtitle:"Add new grades and remarks",onClose:o}),e.jsxs(W,{children:[e.jsxs(A,{spacing:3,py:2,children:[e.jsx(w,{label:"Name of Grading System",size:"small",value:j,onChange:t=>g(t.target.value)}),e.jsx(ce,{initialValues:i,validationSchema:Se,onSubmit:k,children:({values:t,errors:a,touched:m,setFieldValue:s,handleChange:d,handleSubmit:f})=>e.jsxs(A,{direction:"row",spacing:1,children:[e.jsx(w,{label:"Lowest Mark",type:"number",inputMode:"numeric",size:"small",value:t.lowestMark,onChange:d("lowestMark"),error:!!(m.lowestMark&&a.lowestMark),helperText:a.lowestMark}),e.jsx(w,{label:"Highest Mark",type:"number",inputMode:"numeric",size:"small",value:t.highestMark,onChange:d("highestMark"),error:!!(m.highestMark&&a.highestMark),helperText:a.highestMark}),e.jsx(_,{freeSolo:!0,options:Me,getOptionLabel:l=>l||"",defaultValue:t.grade,value:t.grade,onChange:(l,G)=>s("grade",G),renderInput:l=>e.jsx(w,{...l,label:"Grade",size:"small",error:!!(m.grade&&a.grade),helperText:m.grade&&a.grade})}),e.jsx(_,{freeSolo:!0,fullWidth:!0,options:Le,getOptionLabel:l=>l||"",defaultValue:t.remarks,value:t.remarks,onChange:(l,G)=>s("remarks",G),renderInput:l=>e.jsx(w,{...l,label:"remarks",size:"small",error:!!(m.remarks&&a.remarks),helperText:m.remarks&&a.remarks})}),e.jsx(v,{size:"small",variant:"contained",onClick:f,children:"Add"})]})}),e.jsx(K,{children:e.jsx(De,{label:"Grades"})})]}),e.jsxs(U,{children:[e.jsx(I,{divider:!0,children:e.jsxs(A,{direction:"row",spacing:2,justifyContent:"space-between",width:"80%",children:[e.jsx(C,{children:"Highest Mark"}),e.jsx(C,{children:"Lowest Mark"}),e.jsx(C,{children:"Grade"}),e.jsx(C,{children:"Remarks"}),e.jsx(O,{children:e.jsx(C,{children:"Action"})})]})}),x.map(t=>e.jsx(he,{...t,removeGrade:p},t==null?void 0:t.id))]})]}),e.jsxs(J,{children:[e.jsx(v,{onClick:o,children:"Cancel"}),e.jsx(v,{loading:L,variant:"contained",disabled:x.length===0,onClick:T,children:"Save Changes"})]}),L&&e.jsx(Y,{value:"Saving Changes. Please Wait.."})]})}const rs=({name:r,removeSubject:n})=>e.jsxs(e.Fragment,{children:[e.jsxs(I,{sx:{mt:3},children:[e.jsx(ie,{secondary:r,secondaryTypographyProps:{fontSize:12,fontStyle:"italic",fontWeight:"bold"}}),e.jsx(O,{sx:{display:"flex",justifyContent:"center",alignItems:"center",gap:1},children:e.jsx(de,{onClick:()=>n(r),children:e.jsx(re,{})})})]}),e.jsx(K,{})]}),is=()=>{var m;const{schoolSessionState:{assignGrades:{data:r}},schoolSessionDispatch:n}=y.useContext(D),[c,S]=Ce(),x=B(),[u,j]=y.useState([]),[g,i]=y.useState([]),{levelsOption:h,levelLoading:k}=Ve(),p=ne({queryKey:["grade",c.get("grade_id")],queryFn:()=>Be(c.get("grade_id")||(r==null?void 0:r._id)),enabled:!!c.get("grade_id")}),M=()=>{const s=b.values(b.merge(b.keyBy([...g,...u],"_id")));i(s),j([])},L=s=>{i(d=>d.filter(({type:l})=>l!==s))},{mutateAsync:T,isPending:o}=E({mutationFn:_e}),t=()=>{const s=b.map(g,"_id"),d={grade:c.get("grade_id"),levels:s};ue.fire({title:"Assign Grade",text:"Do yow wish to assign grade to selected Levels?",showCancelButton:!0,backdrop:!1}).then(({isConfirmed:f})=>{f&&T(d,{onSettled:()=>{x.invalidateQueries(["levels"])},onSuccess:l=>{n(F(l)),i([]),a()},onError:l=>{n(P(l))}})})},a=()=>{S(s=>(s.delete("grade_id"),s))};return e.jsxs(N,{open:c.get("grade_id")!==null,onClose:a,maxWidth:"sm",fullWidth:!0,children:[e.jsx(R,{title:"Assign Grade",subtitle:"Add the selected grading system to your levels",onClose:a}),e.jsx(W,{children:e.jsxs(A,{spacing:2,paddingY:2,children:[e.jsx(z,{variant:"h6",color:"secondary",children:(m=p==null?void 0:p.data)==null?void 0:m.name}),e.jsxs(A,{direction:"row",spacing:2,alignItems:"center",children:[e.jsx(_,{multiple:!0,freeSolo:!0,fullWidth:!0,defaultValue:[],loading:k,loadingText:"Loading Levels.Please Wait...",options:h,disableCloseOnSelect:!0,getOptionLabel:s=>(s==null?void 0:s.type)||"",renderOption:(s,d,f)=>e.jsxs(I,{...s,sx:{display:"flex",alignItems:"center"},children:[e.jsx(ae,{checked:f==null?void 0:f.selected}),e.jsx(ie,{primary:d==null?void 0:d.type})]}),value:u,onChange:(s,d)=>j(d),renderInput:s=>e.jsx(w,{...s,label:"Select Level to assign",size:"small"})}),e.jsx(v,{variant:"contained",size:"small",onClick:M,children:"Add"})]}),e.jsx(U,{sx:{maxHeight:400},children:b.isEmpty(g)?e.jsx(z,{children:"No Level selected"}):g.map(({_id:s,type:d})=>e.jsx(rs,{name:d,removeSubject:L},s))})]})}),e.jsxs(J,{sx:{padding:2},children:[e.jsx(v,{onClick:a,children:"Cancel"}),e.jsx(v,{disabled:g.length===0,variant:"contained",onClick:t,loading:o,children:o?"Please wait":"Assign Grade"})]}),(o||p.isPending)&&e.jsx(Y,{value:"Please Wait.."})]})};function ls(){const[r,n]=Ce(),[c,S]=y.useState(!1),x=()=>S(!0),u=B(),{schoolSessionDispatch:j}=y.useContext(D),g=ne({queryKey:["grades"],queryFn:Xe,initialData:[]}),i=o=>{j({type:"editGrade",payload:{open:!0,data:o}})},h=o=>{j({type:"viewGrade",payload:{open:!0,data:o}})},k=o=>{j({type:"assignGrade",payload:{data:o}}),n(t=>(t.set("grade_id",o==null?void 0:o._id),t))},{isPending:p,mutateAsync:M}=E({mutationFn:ss}),L=o=>{ue.fire({title:"Removing Grade",text:"Do you want to remove?",showCancelButton:!0,backdrop:!1}).then(({isConfirmed:t})=>{t&&M(o,{onSettled:()=>{u.invalidateQueries(["grades"])},onSuccess:()=>{j(F("Grade Removed!"))},onError:a=>{j(P(a))}})})},T=[{field:"_id",title:"ID",hidden:!0},{field:"name",title:"Name"},{field:null,title:"View Grade",render:o=>e.jsx(v,{sx:{bgcolor:"info.lighter",color:"info.darker"},onClick:()=>h(o==null?void 0:o.ratings),children:"View"})},{field:null,title:"Assign",render:o=>e.jsx(He,{sx:{cursor:"pointer"},onClick:()=>k(o),children:"Assign"})},{title:"Action",field:null,render:o=>e.jsxs(A,{direction:"row",spacing:2,children:[e.jsx(ve,{className:"ico",onClick:()=>i(o),title:"Edit",titleAccess:"Edit"}),e.jsx(re,{className:"ico",onClick:()=>L(o==null?void 0:o._id),title:"Delete",titleAccess:"Delete"})]})}];return e.jsxs(e.Fragment,{children:[e.jsx(Ae,{title:"Grading System",icon:te.grade,isPending:g.isPending,columns:T,data:g==null?void 0:g.data,actions:[],showAddButton:!0,addButtonImg:te.session,addButtonMessage:"😑 No Grading system available!.Create a new one!",addButtonText:"New Grades",onAddButtonClicked:x,handleRefresh:g.refetch,options:{paginationPosition:"bottom"}}),e.jsx(ts,{open:c,setOpen:S}),e.jsx(ns,{}),e.jsx(as,{}),e.jsx(is,{}),p&&e.jsx(Y,{value:"Removing Grade. Please Wait.."})]})}const os=({name:r,code:n,isCore:c,removeSubject:S,appendCode:x,handleIsCore:u})=>{const[j,g]=y.useState(n);return e.jsxs(e.Fragment,{children:[e.jsxs(I,{children:[e.jsx(w,{placeholder:"code ",size:"small",sx:{width:100,mr:2},value:j,onChange:i=>g(i.target.value),onBlur:()=>x({name:r,isCore:c,code:j})}),e.jsx(ie,{secondary:r,secondaryTypographyProps:{fontSize:12,fontStyle:"italic"}}),e.jsxs(O,{sx:{display:"flex",justifyContent:"center",alignItems:"center",gap:1},children:[e.jsx(ke,{label:"Core",control:e.jsx(ae,{title:"Core",checked:c,value:c,onChange:()=>u(r,!c)})}),e.jsx(de,{onClick:()=>S(r),children:e.jsx(re,{})})]})]}),e.jsx(K,{})]})},ds=({open:r,setOpen:n})=>{const{schoolSessionDispatch:c}=y.useContext(D),S=B(),[x,u]=y.useState([]),[j,g]=y.useState({severity:"",text:""}),[i,h]=y.useState([]),k=s=>{const d=b.values(b.merge(b.keyBy([...i,s],"name")));h(d)},p=()=>{const s=b.values(b.merge(b.keyBy([...i,...x],"name")));h(s),u([])},M=s=>{h(d=>d.filter(({name:l})=>l!==s))},L=(s,d)=>{const f=i.find(({name:G})=>G===s);f.isCore=d;const l=b.values(b.merge(b.keyBy([...i,f],"name")));h(l)},{mutateAsync:T,isPending:o}=E({mutationFn:Qe}),t=()=>{g({text:""}),T(i,{onSettled:()=>{S.invalidateQueries(["subjects"])},onSuccess:s=>{c(F(s)),h([]),n(!1)},onError:s=>{c(P(s))}})},a=s=>{var f;const d=(f=s.target.files)==null?void 0:f[0];if(d){const l=new FileReader;l.onload=G=>{var X;const $=(X=G.target)==null?void 0:X.result;if($){const q=we($,{type:"binary"}),le=q.SheetNames[0],xe=q.Sheets[le],Z=Ge.sheet_to_json(xe,{header:1}),V=Z[0].map(H=>b.camelCase(H)),oe=Z.slice(1).map(H=>{const me={};return V.forEach((Ee,Fe)=>{me[Ee]=H[Fe]}),me});h(oe)}},l.readAsBinaryString(d)}},m=async()=>{await be("subjects")};return e.jsxs(N,{open:r,onClose:()=>n(!1),maxWidth:"sm",fullWidth:!0,children:[e.jsx(R,{title:"New Subjects",subtitle:"Add new subjects",onClose:()=>n(!1)}),e.jsxs(W,{children:[j.text&&e.jsx(Ne,{severity:j.severity,children:j.text}),e.jsxs(A,{spacing:2,paddingY:2,children:[e.jsx(z,{variant:"h5",sx:{textAlign:"right"}}),e.jsx(K,{}),e.jsxs(A,{direction:"row",spacing:2,alignItems:"center",children:[e.jsx(_,{multiple:!0,freeSolo:!0,fullWidth:!0,defaultValue:ge,options:ge,disableCloseOnSelect:!0,getOptionLabel:s=>(s==null?void 0:s.name)||"",renderOption:(s,d,f)=>e.jsxs(I,{...s,sx:{display:"flex",alignItems:"center"},children:[e.jsx(ae,{checked:f==null?void 0:f.selected}),e.jsx(ie,{primary:d==null?void 0:d.name})]}),value:x,onChange:(s,d)=>u(d),renderInput:s=>e.jsx(w,{...s,label:"Select Subject",size:"small"})}),e.jsx(v,{variant:"contained",size:"small",onClick:p,children:"Add"})]}),e.jsx(v,{sx:{bgcolor:"var(--secondary)",width:280},children:e.jsxs(C,{htmlFor:"studentFile",title:"Import Subjects from File",sx:{display:"flex",justifyContent:"center",alignItems:"center",gap:1,color:"primary.main",fontSize:11,cursor:"pointer"},children:[e.jsx(Te,{htmlColor:"#fff"}),e.jsx(z,{variant:"caption",color:"#fff",children:"Import Subjects from File (.xlsx,.xls,.csv)"}),e.jsx(ye,{type:"file",id:"studentFile",name:"studentFile",hidden:!0,inputProps:{accept:".xlsx,.xls,.csv"},onChange:a,onClick:s=>{s.target.value=null,s.currentTarget.value=null}})]})}),e.jsx(v,{sx:{alignSelf:"flex-end",textDecoration:"underline"},variant:"text",onClick:m,endIcon:e.jsx(Ie,{}),children:"Download Template here"}),e.jsx(U,{sx:{maxHeight:400},children:b.isEmpty(i)?e.jsx(z,{children:"No Subject selected"}):i.map(s=>e.jsx(os,{...s,removeSubject:M,appendCode:k,handleIsCore:L},s==null?void 0:s.name))})]})]}),e.jsxs(J,{sx:{padding:2},children:[e.jsx(v,{onClick:()=>n(!1),children:"Cancel"}),e.jsx(v,{disabled:i.length===0,variant:"contained",onClick:t,loading:o,children:o?"Please wait":"Save Changes"})]})]})};function cs(){const{schoolSessionState:{editSubject:{open:r,data:n}},schoolSessionDispatch:c}=y.useContext(D),S=B(),{mutateAsync:x,isPending:u}=E({mutationFn:Ke}),j=i=>{x(i,{onSettled:()=>{S.invalidateQueries(["subjects"])},onSuccess:h=>{c(F(h)),g()},onError:h=>{c(P(h))}})},g=()=>{c({type:"editSubject",payload:{open:!1,data:{}}})};return e.jsxs(N,{open:r,fullWidth:!0,maxWidth:"xs",children:[e.jsx(R,{title:"Edit Subject",onClose:g}),e.jsx(ce,{initialValues:n,onSubmit:j,enableReinitialize:!0,children:({values:i,errors:h,touched:k,handleChange:p,handleSubmit:M})=>e.jsxs(e.Fragment,{children:[e.jsx(W,{children:e.jsxs(A,{spacing:2,paddingY:2,children:[e.jsx(ke,{sx:{alignSelf:"flex-end"},label:"Core Subject",control:e.jsx(ae,{value:i.isCore||!1,checked:i==null?void 0:i.isCore,onChange:p("isCore"),defaultChecked:!1})}),e.jsx(w,{label:"Code",size:"small",value:(i==null?void 0:i.code)||"",onChange:p("code"),error:!!(k.code&&h.code),helperText:k.code&&h.code}),e.jsx(w,{label:"Name",size:"small",value:(i==null?void 0:i.name)||"",onChange:p("name"),error:!!(k.name&&h.name),helperText:k.name&&h.name,InputProps:{readOnly:!0}})]})}),e.jsx(J,{sx:{padding:2},children:e.jsx(v,{loading:u,variant:"contained",onClick:M,children:u?"Saving":"Save Changes"})})]})}),u&&e.jsx(Y,{value:"Saving Changes. Please Wait.."})]})}function us(){const r=B(),{schoolSessionDispatch:n}=y.useContext(D),[c,S]=y.useState(!1),x=()=>S(!0),u=ne({queryKey:["subjects"],queryFn:()=>Ye(),initialData:[]}),j=p=>{n({type:"editSubject",payload:{open:!0,data:p}})},{isPending:g,mutateAsync:i}=E({mutationFn:Ue}),h=p=>{ue.fire({title:"Removing Subject",text:"Do you want to remove?",showCancelButton:!0,backdrop:!1}).then(({isConfirmed:M})=>{M&&i(p,{onSettled:()=>{r.invalidateQueries(["subjects"])},onSuccess:()=>{n(F("Subject Removed!"))},onError:L=>{n(P(L))}})})},k=[...qe,{title:"Action",field:null,render:p=>e.jsxs(A,{direction:"row",spacing:2,children:[e.jsx(ve,{className:"ico edit",onClick:()=>j(p),title:"Edit",titleAccess:"Edit"}),e.jsx(re,{className:"ico delete",onClick:()=>h(p==null?void 0:p._id),title:"Delete",titleAccess:"Delete"})]})}];return e.jsxs("div",{children:[e.jsx(Ae,{search:!0,title:"Subjects",icon:te.subject,isPending:u.isPending,columns:k,data:u==null?void 0:u.data,actions:[],showRowShadow:!1,showAddButton:!0,addButtonImg:te.session,addButtonMessage:"😑 No Subjects system available!.Create a new one!",addButtonText:"New Subject",onAddButtonClicked:x,handleRefresh:u.refetch,options:{paginationPosition:"bottom"}}),e.jsx(ds,{open:c,setOpen:S}),e.jsx(cs,{}),g&&e.jsx(Y,{value:"Removing Subject. Please Wait.."})]})}function qs(){const[r,n]=y.useState("1");return e.jsxs(Re,{children:[e.jsx(We,{title:"Subjects & Grading System",subtitle:" Manage subjects offered and their corresponding grading systems to maintain academic standards.",img:Oe,color:"primary.main"}),e.jsxs(Je,{value:r,children:[e.jsxs($e,{onChange:(c,S)=>n(S),children:[e.jsx(pe,{label:"Subjects",value:"1"}),e.jsx(pe,{label:"Grades",value:"2"})]}),e.jsx(fe,{value:"1",sx:{px:0},children:e.jsx(us,{})}),e.jsx(fe,{value:"2",sx:{px:0},children:e.jsx(ls,{})})]})]})}export{qs as default};
