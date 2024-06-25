import{r as a,S as F,u as L,a0 as T,h as R,j as e,i as W,y as B,C as N,F as M,aX as P,l as V,m as b,aB as $,aW as A,T as w,aY as D,aI as v,D as z,t as Q,v as _,w as H,x as K,U,M as G,bK as J,g as X,_ as Z,bL as ee,a2 as se,B as I,bw as te,Z as ae,q as Y,n as re}from"./index-5b8f5a53.js";import{a as ne,g as oe}from"./termAPI-9f54dd5f.js";import{s as ie}from"./initialValues-a069a756.js";import{C as E}from"./CustomYearPicker-efcc5339.js";import{A as le}from"./ArrowForwardRounded-82c05fc9.js";const ce=({open:h,setOpen:S})=>{const{schoolSessionDispatch:t}=a.useContext(F),g=L(),[d,m]=a.useState(T()),[c,u]=a.useState(T()),[n,p]=a.useState(""),[i,j]=a.useState(""),{mutateAsync:f}=R({mutationFn:ne}),s=new Date().getFullYear(),r=(x,l)=>{x.academicYear=`${n||s}/${i||s}`,f(x,{onSettled:()=>{l.setSubmitting(!1),g.invalidateQueries(["terms"])},onSuccess:o=>{t(H(o)),y()},onError:o=>{t(K(o))}}),l.setSubmitting(!1)},y=()=>S(!1);return e.jsxs(W,{open:h,fullWidth:!0,maxWidth:"xs",TransitionComponent:B,children:[e.jsx(N,{title:"Add Session",onClose:y}),e.jsx(M,{initialValues:{...ie,from:d.format("l"),to:c.format("l")},onSubmit:r,validationSchema:P,enableReinitialize:!0,children:({values:x,errors:l,touched:o,handleChange:O,handleSubmit:k,isSubmitting:q})=>e.jsxs(e.Fragment,{children:[e.jsx(V,{children:e.jsxs(b,{spacing:2,paddingY:2,children:[e.jsx($,{sx:{fontSize:13},children:"Academic Year"}),e.jsxs(b,{direction:"row",columnGap:2,children:[e.jsx(E,{label:"From",year:n,setYear:p}),e.jsx(E,{label:"To",year:i,setYear:j})]}),e.jsx(A,{label:"Start of Academic Term/Semester",date:d,setDate:m,touched:o.from,error:l.from}),e.jsx(A,{label:"End of Academic Term/Semester",date:c,setDate:u,touched:o.to,error:l.to}),e.jsx(w,{select:!0,label:"Term/Semester",size:"small",value:x.term,onChange:O("term"),error:!!(o.term&&l.term),helperText:o.term&&l.term,children:D.length!==0?D.map(C=>e.jsx(v,{value:C,children:C},C)):e.jsx(v,{children:"No Term Available "})}),e.jsx(z,{})]})}),e.jsx(Q,{sx:{padding:2},children:e.jsx(_,{loading:q,variant:"contained",onClick:k,children:"Save"})})]})})]})},Se=()=>{const{schoolSessionDispatch:h}=a.useContext(F),{userDispatch:S,user:t}=a.useContext(U),g=G();J();const[d,m]=a.useState(!1),[c,u]=a.useState(""),[n,p]=a.useState({termId:"",academicYear:"",term:""}),i=X({queryKey:["terms"],queryFn:()=>oe(),select:s=>(t==null?void 0:t.role)==="administrator"?s:s.filter(r=>r.active!==!1)}),j=()=>{if(u(""),n.termId===""){u("Session is Required*");return}h({type:"setCurrentSession",payload:n}),localStorage.setItem("@school_session",JSON.stringify(n)),S({type:"setSession",payload:n}),g("/",{replace:!0})},f=()=>m(!0);return Z.isEmpty(t==null?void 0:t.id)?e.jsx(ee,{to:"/login"}):e.jsx(se,{maxWidth:"xs",sx:{height:"100vh",position:"relative",display:"flex",flexDirection:"column",gap:2,justifyContent:"center",alignItems:"center"},children:e.jsxs(b,{alignItems:"center",spacing:2,sx:{boxShadow:"0 2px 3px rgba(0,0,0,0.1)",p:4},children:[(t==null?void 0:t.role)==="administrator"&&e.jsx(I,{color:"primary",startIcon:e.jsx(te,{}),sx:{mb:4},onClick:f,children:"New School Session"}),e.jsx(ae,{sx:{width:80,height:80}}),e.jsx(Y,{variant:"h4",sx:{textAlign:"center"},children:"School Portal"}),e.jsx(Y,{variant:"body2",paragraph:!0,sx:{textAlign:"center"},children:"Choose a session (academic term/semester) to begin with."}),e.jsx(re,{options:i!=null&&i.data?i.data:[],noOptionsText:"School Session not found",closeText:"",clearText:" ",disableClearable:!0,fullWidth:!0,value:n,onChange:(s,r)=>p(r),isOptionEqualToValue:(s,r)=>r.termId===""||r.termId===void 0||s.termId===r.termId,getOptionLabel:s=>(s==null?void 0:s.termId)!==""?`${s==null?void 0:s.academicYear},${s==null?void 0:s.term}`:"",renderInput:s=>e.jsx(w,{...s,label:"Select School Session",error:c!=="",helperText:c,FormHelperTextProps:{sx:{color:"error.main"}}})}),e.jsx(I,{variant:"contained",endIcon:e.jsx(le,{}),fullWidth:!0,onClick:j,children:"Continue"}),e.jsx(ce,{open:d,setOpen:m})]})})};export{Se as default};