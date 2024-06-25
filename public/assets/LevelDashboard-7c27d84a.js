import{r as v,U as W,u as w,S as _,f as O,g as $,bH as Q,h as E,bZ as Z,j as e,i as N,C as D,F,b_ as Y,l as k,m as L,n as C,b$ as H,T as b,c0 as K,t as z,v as M,_ as T,x as A,w as R,bT as ee,c1 as se,c2 as te,q,B as ne,p as le,c3 as oe,c4 as ie,P as re,Q as ae,c5 as ce,c6 as de,c7 as ue,a as I,M as pe,X as me,$ as U,G as xe,J as he,c8 as ve,c9 as je,e as V,K as fe,E as ge}from"./index-5b8f5a53.js";import{d as ye}from"./Class-a0d41fc3.js";import{d as Se}from"./Subject-88f70f6e.js";import{d as Ce}from"./Person3-db73ff94.js";import{l as be}from"./initialValues-a069a756.js";import{D as B}from"./DashboardCard-a8472d98.js";const Le=({open:r,setOpen:l})=>{const{userState:{session:m}}=v.useContext(W),i=w(),{schoolSessionDispatch:d}=v.useContext(_),{levelsOption:x}=O(),g=$({queryKey:["teachers"],queryFn:()=>Q(),select:t=>t==null?void 0:t.map(o=>({_id:o==null?void 0:o._id,fullName:o==null?void 0:o.fullName}))}),{mutateAsync:u,isLoading:y}=E({mutationFn:Z}),f=(t,c)=>{const o=`${t.level}${t.type}`,j=x.find(({type:s})=>s===o.toUpperCase());if(!T.isEmpty(j)){d(A("Level already exists!!!")),c.setSubmitting(!1);return}const p={session:m.sessionId,term:m.termId,level:{name:t.level,type:t.type},teacher:t.teacher};u(p,{onSettled:()=>{c.setSubmitting(!1),i.invalidateQueries(["levels"])},onSuccess:s=>{d(R(s)),l(!1)},onError:s=>{d(A(s))}})};return e.jsxs(N,{open:r,onClose:()=>l(!1),fullWidth:!0,maxWidth:"xs",children:[e.jsx(D,{title:"New Level",onClose:()=>l(!1)}),e.jsx(F,{initialValues:be,onSubmit:f,validationSchema:Y,children:({values:t,errors:c,touched:o,handleSubmit:j,setFieldValue:p})=>e.jsxs(e.Fragment,{children:[e.jsx(k,{children:e.jsxs(L,{spacing:2,paddingY:2,children:[e.jsx(C,{freeSolo:!0,options:H,getOptionLabel:s=>s||"",value:t.level,onInputChange:(s,n)=>p("level",n),renderInput:s=>e.jsx(b,{...s,label:"Level",size:"small",error:!!(o.level&&c.level),helperText:o.level&&c.level})}),e.jsx(C,{freeSolo:!0,options:K,getOptionLabel:s=>s||"",value:t.type,onInputChange:(s,n)=>p("type",n),renderInput:s=>e.jsx(b,{...s,label:"type",size:"small"})}),e.jsx(C,{options:g.data,loading:g.isLoading,getOptionLabel:s=>(s==null?void 0:s.fullName)||"",value:t.teacher,onChange:(s,n)=>p("teacher",n),renderInput:s=>e.jsx(b,{...s,label:"Assign Teacher",size:"small"})})]})}),e.jsx(z,{sx:{padding:2},children:e.jsx(M,{loading:y,variant:"contained",onClick:j,children:"Save"})})]})})]})},Ae=({open:r,setOpen:l})=>{const m=w(),{schoolSessionState:{currentLevel:i},schoolSessionDispatch:d}=v.useContext(_),[x,g]=v.useState([]),[u,y]=v.useState([]),{subjects:f,levelLoading:t}=ee(i==null?void 0:i._id),c=$({queryKey:["subjects"],queryFn:()=>se(),select:a=>T.map(a,"name")});v.useEffect(()=>{y(f)},[i._id,f]);const o=()=>{const a=T.uniq([...u,...x]);y(a),g([])},j=a=>{y(h=>h.filter(X=>X!==a))},{mutateAsync:p,isLoading:s}=E(te),n=()=>{const a={levelId:i._id,subjects:u};p(a,{onSettled:()=>{m.invalidateQueries(["subjects"]),m.invalidateQueries(["level",i._id])},onSuccess:h=>{d(R(h)),l(!1)},onError:h=>{d(A(h))}})};return e.jsxs(N,{open:r,onClose:()=>l(!1),maxWidth:"sm",fullWidth:!0,children:[e.jsx(D,{title:`Current Courses for ${i.type}`,onClose:()=>l(!1)}),e.jsx(k,{children:e.jsxs(L,{spacing:2,paddingY:2,children:[e.jsx(q,{variant:"caption",children:"Add new courses "}),e.jsxs(L,{direction:"row",spacing:2,alignItems:"center",children:[e.jsx(C,{multiple:!0,freeSolo:!0,fullWidth:!0,options:c.data??[],disableCloseOnSelect:!0,getOptionLabel:a=>a||"",value:x,onChange:(a,h)=>g(h),renderInput:a=>e.jsx(b,{...a,label:"Select Course",size:"small",focused:!0})}),e.jsx(ne,{variant:"contained",size:"small",onClick:o,children:"Add"})]}),e.jsxs(le,{sx:{maxHeight:400},children:[t&&e.jsx(q,{variant:"h6",children:"Loading.... "}),e.jsxs(q,{variant:"h6",children:[u.length," Courses Available"]}),u==null?void 0:u.map(a=>e.jsx(oe,{name:a,removeSubject:j},a))]})]})}),e.jsx(z,{sx:{padding:2},children:e.jsx(M,{startIcon:e.jsx(ie,{}),loading:s,variant:"contained",onClick:n,disabled:(u==null?void 0:u.length)===0,children:"Save Courses"})})]})},G="/assets/level_ico-a08a6fb9.svg";var P={},_e=ae;Object.defineProperty(P,"__esModule",{value:!0});var J=P.default=void 0,Ie=_e(re()),Te=e;J=P.default=(0,Ie.default)((0,Te.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"}),"Delete");function we({viewProps:r,editProps:l,deleteProps:m,handleView:i,handleEdit:d,handleDelete:x}){return e.jsxs(L,{direction:"row",spacing:2,children:[i&&e.jsx(ce,{className:"ico",onClick:i,...r,sx:{color:"secondary.main !important"}}),d&&e.jsx(de,{className:"ico",onClick:d,...l}),x&&e.jsx(J,{className:"ico",onClick:x,...m})]})}const Oe=()=>{const r=w(),{schoolSessionState:{editLevel:{open:l,data:m}},schoolSessionDispatch:i}=v.useContext(_),{levelsOption:d}=O(),x=$({queryKey:["teachers"],queryFn:()=>Q(),select:t=>t==null?void 0:t.map(o=>({_id:o==null?void 0:o._id,fullName:o==null?void 0:o.fullName}))}),{mutateAsync:g,isLoading:u}=E({mutationFn:ue}),y=(t,c)=>{const o=`${t.level}${t.type}`,j=d.find(({type:s})=>s===o.toUpperCase());if(!T.isEmpty(j)){i(A("Level already exists!!!")),c.setSubmitting(!1);return}const p={_id:t==null?void 0:t._id,level:{name:t.level,type:t.type},teacher:t.teacher};console.log(p),g(p,{onSettled:()=>{c.setSubmitting(!1),r.invalidateQueries(["levels"])},onSuccess:s=>{i(R(s)),f()},onError:s=>{i(A(s))}})},f=()=>{i({type:"editLevel",payload:{open:!1,data:{}}})};return e.jsxs(N,{open:l,onClose:f,fullWidth:!0,maxWidth:"xs",children:[e.jsx(D,{title:"Edit Level",onClose:f}),e.jsx(F,{initialValues:m,onSubmit:y,validationSchema:Y,enableReinitialize:!0,children:({values:t,errors:c,touched:o,handleSubmit:j,setFieldValue:p})=>e.jsxs(e.Fragment,{children:[e.jsx(k,{children:e.jsxs(L,{spacing:2,paddingY:2,children:[e.jsx(C,{freeSolo:!0,options:H,getOptionLabel:s=>s||"",value:(t==null?void 0:t.level)||"",onInputChange:(s,n)=>p("level",n),renderInput:s=>e.jsx(b,{...s,label:"Level",size:"small",error:!!(o.level&&c.level),helperText:o.level&&c.level})}),e.jsx(C,{freeSolo:!0,options:K,getOptionLabel:s=>s||"",value:(t==null?void 0:t.type)||"",onInputChange:(s,n)=>p("type",n),renderInput:s=>e.jsx(b,{...s,label:"type",size:"small"})}),e.jsx(C,{options:x.data,loading:x.isLoading,getOptionLabel:s=>(s==null?void 0:s.fullName)||"",defaultValue:t==null?void 0:t.teacher,value:t==null?void 0:t.teacher,onChange:(s,n)=>p("teacher",n),renderInput:s=>e.jsx(b,{...s,label:"Assign Teacher",size:"small"})})]})}),e.jsx(z,{sx:{padding:2},children:e.jsx(M,{loading:u,variant:"contained",onClick:j,children:"Save Changes"})})]})})]})};function Ee(){var d;const{schoolSessionState:{viewLevel:{open:r,data:l}},schoolSessionDispatch:m}=v.useContext(_),i=()=>{m({type:"viewLevel",payload:{open:!1,data:{}}})};return e.jsxs(N,{open:r,onClose:i,fullWidth:!0,maxWidth:"xs",children:[e.jsx(D,{title:"Basic 1A Information",onClose:i}),e.jsx(k,{children:e.jsxs(L,{spacing:2,children:[e.jsx(I,{secondary:"Level",primary:l==null?void 0:l.type}),e.jsx(I,{secondary:"Number Of Students",primary:l==null?void 0:l.noOfStudents}),e.jsx(I,{secondary:"Number of Courses ",primary:l==null?void 0:l.noOfSubjects}),e.jsx(I,{secondary:"Class Teacher",primary:((d=l==null?void 0:l.teacher)==null?void 0:d.fullName)||"Not Assigned Yet"})]})})]})}const Ne=()=>{const{schoolSessionDispatch:r}=v.useContext(_),{userState:{session:l}}=v.useContext(W),m=pe();me();const i=w(),[d,x]=v.useState(!1),[g,u]=v.useState(!1),{levelsOption:y,levelLoading:f,levelRefetch:t}=O(),{mutateAsync:c}=E(ve),o=n=>{const a={id:n,sessionId:l==null?void 0:l.sessionId,termId:l==null?void 0:l.termId};fe.fire({title:"Removing Level",text:"Do you want to remove level?",showCancelButton:!0,backdrop:!1}).then(({isConfirmed:h})=>{h&&c(a,{onSettled:()=>{i.invalidateQueries(["levels"])},onSuccess:S=>{r({type:"showAlert",payload:{severity:"info",message:S}})},onError:S=>{r({type:"showAlert",payload:{severity:"error",message:S}})}})})},j=n=>{var h,S;const a={_id:n==null?void 0:n._id,level:(h=n==null?void 0:n.level)==null?void 0:h.name,type:(S=n==null?void 0:n.level)==null?void 0:S.type,teacher:n==null?void 0:n.teacher};r({type:"editLevel",payload:{open:!0,data:a}})},p=n=>{r({type:"viewLevel",payload:{open:!0,data:n}})},s=[...je,{field:null,title:"Class",width:"40%",render:n=>e.jsxs(L,{direction:"row",spacing:5,children:[e.jsx(V,{sx:{cursor:"pointer"},onClick:()=>{m(`/level/current/${n._id}/${n.type}`,{replace:!0,state:{levelId:n._id,levelName:n.type}})},children:"Go to Class"}),e.jsx(V,{sx:{cursor:"pointer"},onClick:()=>{r({type:"currentLevel",payload:n}),u(!0)},children:"Add Subjects"})]})},{field:null,title:"Action",render:n=>e.jsx(we,{viewProps:{title:"View level information",titleAccess:"View level information"},editProps:{title:"Edit level information",titleAccess:"Edit level information"},deleteProps:{title:"Delete level information",titleAccess:"Delete level information"},handleView:()=>p(n),handleEdit:()=>j(n),handleDelete:()=>o(n==null?void 0:n._id)})}];return e.jsxs(U,{pt:2,children:[e.jsx(xe,{title:"Levels",icon:G,search:!0,isLoading:f,columns:s,data:y,actions:[],showAddButton:!0,addButtonText:"New Level",addButtonImg:he.level,addButtonMessage:"😑 Oops! It seems you don't have any level at the moment.Create a new one",onAddButtonClicked:()=>x(!0),handleRefresh:t}),e.jsx(Ee,{}),e.jsx(Le,{open:d,setOpen:x}),e.jsx(Oe,{}),e.jsx(Ae,{open:g,setOpen:u})]})},Me=()=>{const{levelSummary:r}=O();return e.jsxs(e.Fragment,{children:[e.jsx(ge,{title:"School Class & Subjects",subtitle:"Add and Track new Classes and Subjects",img:G,color:"primary.main"}),e.jsxs(U,{sx:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:2,py:2},children:[e.jsx(B,{title:"Levels",value:r.noOfLevels,icon:e.jsx(Se,{sx:{width:30,height:30,color:"secondary.main"}})}),e.jsx(B,{title:"Courses Offered",value:r.noOfSubjects,icon:e.jsx(ye,{sx:{width:30,height:30,color:"secondary.main"}})}),e.jsx(B,{title:"Assigned Teachers",value:r.noOfAssignedTeachers,icon:e.jsx(Ce,{sx:{width:30,height:30,color:"secondary.main"}})})]}),e.jsx(Ne,{})]})};export{Me as default};
