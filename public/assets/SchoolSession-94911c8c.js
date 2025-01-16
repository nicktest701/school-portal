import{j as e,n as y,T as D,r as a,S as k,b as R,d as W,v as P,al as V,w as $,y as z,fq as B,x as L,l as b,F as M,$ as A,D as Q,E as _,g as H,h as G,a0 as J,u as K,c as U,_ as X,N as Z,C as ee,B as v,ay as te,p as se,m as I}from"./index-ce442eb1.js";import{e as ae,g as re}from"./termAPI-177926e4.js";import{s as oe}from"./initialValues-876203b9.js";import{g as E,A as ne}from"./sessionColumns-a7ba1da8.js";import{C as F}from"./CustomDatePicker-0001e585.js";import{D as Y}from"./react-datetime-9b766c95.js";import{D as ie}from"./DialogActions-c9d7df2e.js";import{A as le}from"./Autocomplete-87c4b1e1.js";import"./currencyFormatter-1910a788.js";import"./CircleRounded-06f2dceb.js";import"./Edit-009e8578.js";import"./Delete-fb41f478.js";import"./ListItemText-b107adf9.js";import"./Chip-15117b24.js";import"./AdapterMoment-20f157db.js";import"./useMediaQuery-5bcb3f64.js";import"./InputAdornment-92a613d9.js";import"./ListItem-2727fabf.js";import"./listItemButtonClasses-c7063ebe.js";import"./ListItemSecondaryAction-660d9daa.js";const ce=Y.default?Y.default:Y,O=({label:m,year:d,setYear:s})=>e.jsx(ce,{dateFormat:"YYYY",timeFormat:!1,value:d,initialValue:y().format("YYYY"),onChange:i=>s(i.format("YYYY")),closeOnSelect:!0,renderInput:i=>e.jsx(D,{...i,label:m,size:"small",fullWidth:!0})}),me=({open:m,setOpen:d})=>{const{schoolSessionDispatch:s}=a.useContext(k),i=R(),[x,h]=a.useState(y()),[u,S]=a.useState(y()),[o,f]=a.useState(""),[l,g]=a.useState(""),{mutateAsync:j}=W({mutationFn:ae}),t=new Date().getFullYear(),r=(p,c)=>{p.academicYear=`${o||t}/${l||t}`,j(p,{onSettled:()=>{c.setSubmitting(!1),i.invalidateQueries(["terms"])},onSuccess:n=>{s(H(n)),T()},onError:n=>{s(G(n))}}),c.setSubmitting(!1)},T=()=>d(!1);return e.jsxs(P,{open:m,fullWidth:!0,maxWidth:"xs",TransitionComponent:V,children:[e.jsx($,{title:"Add Session",onClose:T}),e.jsx(z,{initialValues:{...oe,from:x.format("l"),to:u.format("l")},onSubmit:r,validationSchema:B,enableReinitialize:!0,children:({values:p,errors:c,touched:n,handleChange:w,handleSubmit:q,isSubmitting:N})=>e.jsxs(e.Fragment,{children:[e.jsx(L,{children:e.jsxs(b,{spacing:2,paddingY:2,children:[e.jsx(M,{sx:{fontSize:13},children:"Academic Year"}),e.jsxs(b,{direction:"row",columnGap:2,children:[e.jsx(O,{label:"From",year:o,setYear:f}),e.jsx(O,{label:"To",year:l,setYear:g})]}),e.jsx(F,{label:"Start of Academic Term/Semester",date:x,setDate:h,touched:n.from,error:c.from}),e.jsx(F,{label:"End of Academic Term/Semester",date:u,setDate:S,touched:n.to,error:c.to}),e.jsx(D,{select:!0,label:"Term/Semester",size:"small",value:p.term,onChange:w("term"),error:!!(n.term&&c.term),helperText:n.term&&c.term,children:E.length!==0?E.map(C=>e.jsx(A,{value:C,children:C},C)):e.jsx(A,{children:"No Term Available "})}),e.jsx(Q,{})]})}),e.jsx(ie,{sx:{padding:2},children:e.jsx(_,{loading:N,variant:"contained",onClick:q,children:"Save"})})]})})]})},Oe=()=>{const{schoolSessionDispatch:m}=a.useContext(k),{userDispatch:d,user:s}=a.useContext(J),i=K(),[x,h]=a.useState(!1),[u,S]=a.useState(""),[o,f]=a.useState({termId:"",academicYear:"",term:""}),l=U({queryKey:["terms"],queryFn:()=>re(),select:t=>(s==null?void 0:s.role)==="administrator"?t:t.filter(r=>!r.active)}),g=()=>{if(S(""),o.termId===""){S("Session is Required*");return}m({type:"setCurrentSession",payload:o}),localStorage.setItem("@school_session",JSON.stringify(o)),d({type:"setSession",payload:o}),i("/",{replace:!0})},j=()=>h(!0);return X.isEmpty(s==null?void 0:s.id)?e.jsx(Z,{to:"/login"}):e.jsx(ee,{maxWidth:"xs",sx:{height:"100vh",position:"relative",display:"flex",flexDirection:"column",gap:2,justifyContent:"center",alignItems:"center"},children:e.jsxs(b,{alignItems:"center",spacing:2,sx:{boxShadow:"0 2px 3px rgba(0,0,0,0.1)",p:4},children:[(s==null?void 0:s.role)==="administrator"&&e.jsx(v,{color:"primary",startIcon:e.jsx(te,{}),sx:{mb:4},onClick:j,children:"New School Session"}),e.jsx(se,{sx:{width:80,height:80}}),e.jsx(I,{variant:"h4",sx:{textAlign:"center"},children:"School Portal"}),e.jsx(I,{variant:"body2",paragraph:!0,sx:{textAlign:"center"},children:"Choose a session (academic term/semester) to begin with."}),e.jsx(le,{options:l!=null&&l.data?l.data:[],noOptionsText:"School Session not found",closeText:"",clearText:" ",disableClearable:!0,fullWidth:!0,value:o,onChange:(t,r)=>f(r),isOptionEqualToValue:(t,r)=>r.termId===""||r.termId===void 0||t.termId===r.termId,getOptionLabel:t=>(t==null?void 0:t.termId)!==""?`${t==null?void 0:t.academicYear},${t==null?void 0:t.term}`:"",renderInput:t=>e.jsx(D,{...t,label:"Select School Session",error:u!=="",helperText:u,FormHelperTextProps:{sx:{color:"error.main"}}})}),e.jsx(v,{variant:"contained",endIcon:e.jsx(ne,{}),fullWidth:!0,onClick:g,children:"Continue"}),e.jsx(me,{open:x,setOpen:h})]})})};export{Oe as default};
