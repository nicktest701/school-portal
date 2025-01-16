import{j as e,k as w,F as y,B as L,I as ae,p as me,q as O,r as b,S as M,b as T,d as B,s as N,t as F,v as R,T as G,w as Y,x as re,D as H,L as _,y as q,g as E,h as I,c as J,_ as f,z as je,l as P,G as K,E as ie,f as le,H as oe,J as ge,C as pe,e as Se}from"./index-DrgqF6h7.js";import{s as be}from"./session_ico-C_mTk6NS.js";import{C as de,L as fe}from"./CustomizedMaterialTable-sErZg5Gy.js";import{E as Q}from"./images-B5fNBSni.js";import{g as ee}from"./gradeColor-B1MTvGsq.js";import{L as z}from"./ListItem-yCsexoBs.js";import{L as W}from"./ListItemSecondaryAction-mmiMbVqP.js";import{G as ce,R as ue,a as se,b as ye}from"./sessionColumns-0BrYivn4.js";import{A as D}from"./Autocomplete-D4vPEd6T.js";import{C as he}from"./Chip-BcLQNplL.js";import{D as V}from"./DialogActions-Cx2GHHEW.js";import{v as xe}from"./v4-C6aID195.js";import{L as Ce,p as ke,a as ve,d as Ge,g as we}from"./subjectAPI-BkI1ewCY.js";import{u as Le}from"./useLevel-C3V49YPJ.js";import{L as $}from"./ListItemText-Bwh_rzOL.js";import{D as X}from"./DeleteOutline-DM92K-00.js";import{T as Ae,a as Me,b as te,c as ne}from"./TabPanel-Bl8roboH.js";import"./Toolbar-Bzx_LBRC.js";import"./useThemeProps-DLRF2U3R.js";import"./Skeleton-BUD-o5ar.js";import"./ButtonGroup-DQMwsk7A.js";import"./InputAdornment-EcTjtcuD.js";import"./index-_n9xtSlI.js";import"./ListItemButton-BUsfko6u.js";import"./listItemButtonClasses-CLhmtlXH.js";import"./Check-CEGAxChF.js";import"./currencyFormatter-DjBDW3hY.js";import"./CircleRounded-Bh8WmZqU.js";function Z({id:a,highestMark:t,lowestMark:u,grade:x,remarks:r,removeGrade:i}){return e.jsx(z,{divider:!0,children:e.jsxs(w,{direction:"row",spacing:4,width:"80%",children:[e.jsx(y,{sx:{width:"15%"},children:t}),e.jsx(y,{sx:{width:"15%"},children:"-"}),e.jsx(y,{sx:{width:"15%"},children:u}),e.jsx(y,{sx:{width:"15%"},children:x}),e.jsxs(W,{children:[e.jsx(L,{size:"small",sx:{px:2,mr:4,bgcolor:ee(t).bg,color:ee(t).color},children:r}),i&&e.jsx(ae,{onClick:()=>i(a),children:e.jsx(me,{})})]})]})})}const Te=async()=>{try{return(await O({method:"GET",url:"/grades"})).data}catch(a){return a.response.data}},Be=async a=>{try{return(await O({method:"GET",url:`/grades/${a}`})).data}catch(t){return t.response.data}},Ee=async a=>{try{return(await O({method:"POST",url:"/grades",data:a})).data}catch(t){return t.response.data}},Ie=async a=>{try{return(await O({method:"PUT",url:"/grades",data:a})).data}catch(t){return t.response.data}},ze=async a=>{try{return(await O({method:"DELETE",url:`/grades/${a}`})).data}catch(t){return t.response.data}};function De({open:a,setOpen:t}){const{schoolSessionDispatch:u}=b.useContext(M),x=T(),[r,i]=b.useState([]),[g,p]=b.useState(""),c={lowestMark:0,highestMark:0,grade:"",remarks:""},m=(d,n)=>{d.id=xe(),i(l=>[...l,d]),n.resetForm()},j=d=>{const n=r.filter(({id:l})=>l!==d);i(n)},{mutateAsync:k,isLoading:o}=B({mutationFn:Ee}),A=()=>{k({name:g,ratings:r},{onSettled:()=>{x.invalidateQueries(["grades"])},onSuccess:n=>{u(E(n)),i([]),t(!1)},onError:n=>{u(I(n))}})};return e.jsxs(N,{open:a,children:[e.jsx(F,{title:"New Grading System",subtitle:"Add new grades and remarks",onClose:()=>t(!1)}),e.jsxs(R,{children:[e.jsxs(w,{spacing:3,py:2,children:[e.jsx(G,{label:"Name of Grading System",size:"small",value:g,onChange:d=>p(d.target.value)}),e.jsx(Y,{initialValues:c,validationSchema:re,onSubmit:m,children:({values:d,errors:n,touched:l,setFieldValue:s,handleChange:h,handleSubmit:S})=>e.jsxs(w,{direction:"row",spacing:1,children:[e.jsx(G,{label:"Lowest Mark",type:"number",inputMode:"numeric",size:"small",value:d.lowestMark,onChange:h("lowestMark"),error:!!(l.lowestMark&&n.lowestMark),helperText:n.lowestMark}),e.jsx(G,{label:"Highest Mark",type:"number",inputMode:"numeric",size:"small",value:d.highestMark,onChange:h("highestMark"),error:!!(l.highestMark&&n.highestMark),helperText:n.highestMark}),e.jsx(D,{freeSolo:!0,options:ce,getOptionLabel:C=>C||"",defaultValue:d.grade,value:d.grade,onChange:(C,v)=>s("grade",v),renderInput:C=>e.jsx(G,{...C,label:"Grade",size:"small",error:!!(l.grade&&n.grade),helperText:l.grade&&n.grade})}),e.jsx(D,{freeSolo:!0,fullWidth:!0,options:ue,getOptionLabel:C=>C||"",defaultValue:d.remarks,value:d.remarks,onChange:(C,v)=>s("remarks",v),renderInput:C=>e.jsx(G,{...C,label:"remarks",size:"small",error:!!(l.remarks&&n.remarks),helperText:l.remarks&&n.remarks})}),e.jsx(L,{size:"small",variant:"contained",onClick:S,children:"Add"})]})}),e.jsx(H,{children:e.jsx(he,{label:"Grades"})})]}),e.jsxs(_,{children:[e.jsx(z,{divider:!0,children:e.jsxs(w,{direction:"row",spacing:2,justifyContent:"space-between",width:"80%",children:[e.jsx(y,{children:"Highest Mark"}),e.jsx(y,{children:"Lowest Mark"}),e.jsx(y,{children:"Grade"}),e.jsx(y,{children:"Remarks"}),e.jsx(W,{children:e.jsx(y,{children:"Action"})})]})}),r.map(d=>e.jsx(Z,{...d,removeGrade:j},d==null?void 0:d.id))]})]}),e.jsxs(V,{children:[e.jsx(L,{onClick:()=>t(!1),children:"Cancel"}),e.jsx(q,{loading:o,variant:"contained",disabled:r.length===0,onClick:A,children:"Submit"})]})]})}function Ne(){const{schoolSessionState:{viewGrades:{open:a,ratings:t}},schoolSessionDispatch:u}=b.useContext(M),x=()=>{u({type:"viewGrade",payload:{open:!1,data:[]}})};return e.jsxs(N,{open:a,maxWidth:"sm",fullWidth:!0,children:[e.jsx(F,{title:"Grade",onClose:x}),e.jsx(R,{children:e.jsxs(_,{children:[e.jsxs(z,{sx:{display:"flex",columnGap:8},width:"80%",children:[e.jsx(y,{children:"Highest Mark"}),e.jsx(y,{children:"Lowest Mark"}),e.jsx(y,{children:"Grade"}),e.jsx(W,{children:e.jsx(y,{children:"Remarks"})})]}),t.map(r=>e.jsx(Z,{...r},r==null?void 0:r.id))]})})]})}function Fe(){const{schoolSessionState:{editGrades:{open:a,data:t}},schoolSessionDispatch:u}=b.useContext(M),x=T(),[r,i]=b.useState([]),[g,p]=b.useState(""),c={lowestMark:0,highestMark:0,grade:"",remarks:""};J({queryKey:["grade",t==null?void 0:t._id],queryFn:()=>Be(t==null?void 0:t._id),enabled:!!(t!=null&&t._id),initialData:t,onSuccess:n=>{p(n==null?void 0:n.name),i(n==null?void 0:n.ratings)}});const m=(n,l)=>{n.id=xe();const s=f.values(f.merge(f.keyBy([...r,n],"remarks")));i(s),l.resetForm()},j=n=>{const l=r.filter(({id:s})=>s!==n);i(l)},{mutateAsync:k,isLoading:o}=B({mutationFn:Ie}),A=()=>{const n={_id:t==null?void 0:t._id,name:g,ratings:r};k(n,{onSettled:()=>{x.invalidateQueries(["grades"])},onSuccess:l=>{u(E(l)),i([]),d()},onError:l=>{u(I(l))}})},d=()=>{u({type:"editGrade",payload:{open:!1,data:{}}})};return e.jsxs(N,{open:a,children:[e.jsx(F,{title:"New Grading System",subtitle:"Add new grades and remarks",onClose:d}),e.jsxs(R,{children:[e.jsxs(w,{spacing:3,py:2,children:[e.jsx(G,{label:"Name of Grading System",size:"small",value:g,onChange:n=>p(n.target.value)}),e.jsx(Y,{initialValues:c,validationSchema:re,onSubmit:m,children:({values:n,errors:l,touched:s,setFieldValue:h,handleChange:S,handleSubmit:C})=>e.jsxs(w,{direction:"row",spacing:1,children:[e.jsx(G,{label:"Lowest Mark",type:"number",inputMode:"numeric",size:"small",value:n.lowestMark,onChange:S("lowestMark"),error:!!(s.lowestMark&&l.lowestMark),helperText:l.lowestMark}),e.jsx(G,{label:"Highest Mark",type:"number",inputMode:"numeric",size:"small",value:n.highestMark,onChange:S("highestMark"),error:!!(s.highestMark&&l.highestMark),helperText:l.highestMark}),e.jsx(D,{freeSolo:!0,options:ce,getOptionLabel:v=>v||"",defaultValue:n.grade,value:n.grade,onChange:(v,U)=>h("grade",U),renderInput:v=>e.jsx(G,{...v,label:"Grade",size:"small",error:!!(s.grade&&l.grade),helperText:s.grade&&l.grade})}),e.jsx(D,{freeSolo:!0,fullWidth:!0,options:ue,getOptionLabel:v=>v||"",defaultValue:n.remarks,value:n.remarks,onChange:(v,U)=>h("remarks",U),renderInput:v=>e.jsx(G,{...v,label:"remarks",size:"small",error:!!(s.remarks&&l.remarks),helperText:s.remarks&&l.remarks})}),e.jsx(L,{size:"small",variant:"contained",onClick:C,children:"Add"})]})}),e.jsx(H,{children:e.jsx(he,{label:"Grades"})})]}),e.jsxs(_,{children:[e.jsx(z,{divider:!0,children:e.jsxs(w,{direction:"row",spacing:2,justifyContent:"space-between",width:"80%",children:[e.jsx(y,{children:"Highest Mark"}),e.jsx(y,{children:"Lowest Mark"}),e.jsx(y,{children:"Grade"}),e.jsx(y,{children:"Remarks"}),e.jsx(W,{children:e.jsx(y,{children:"Action"})})]})}),r.map(n=>e.jsx(Z,{...n,removeGrade:j},n==null?void 0:n.id))]})]}),e.jsxs(V,{children:[e.jsx(L,{onClick:d,children:"Cancel"}),e.jsx(q,{loading:o,variant:"contained",disabled:r.length===0,onClick:A,children:"Save Changes"})]})]})}const Re=()=>{const{schoolSessionState:{assignGrades:{open:a,data:{name:t,ratings:u}}},schoolSessionDispatch:x}=b.useContext(M),r=T(),[i,g]=b.useState([]),[p,c]=b.useState([]),{levelsOption:m,levelLoading:j}=Le(),k=()=>{const s=f.values(f.merge(f.keyBy([...p,...i],"_id")));c(s),g([])},o=s=>{c(h=>h.filter(({type:C})=>C!==s))},{mutateAsync:A,isLoading:d}=B({mutationFn:je}),n=()=>{const s=f.map(p,"_id");A({grade:u,levels:s},{onSettled:()=>{r.invalidateQueries(["levels"])},onSuccess:S=>{x(E(S)),c([]),l()},onError:S=>{x(I(S))}})},l=()=>{x({type:"assignGrade",payload:{open:!1,data:{}}})};return e.jsxs(N,{open:a,onClose:l,maxWidth:"sm",fullWidth:!0,children:[e.jsx(F,{title:"Assign Grade",subtitle:"Add the selected grading system to your levels",onClose:l}),e.jsx(R,{children:e.jsxs(w,{spacing:2,paddingY:2,children:[e.jsx(P,{variant:"h6",color:"secondary",children:t}),e.jsxs(w,{direction:"row",spacing:2,alignItems:"center",children:[e.jsx(D,{multiple:!0,freeSolo:!0,fullWidth:!0,defaultValue:[],loading:j,loadingText:"Loading Levels.Please Wait...",options:m,disableCloseOnSelect:!0,getOptionLabel:s=>(s==null?void 0:s.type)||"",renderOption:(s,h,S)=>e.jsxs(z,{...s,sx:{display:"flex",alignItems:"center"},children:[e.jsx(K,{checked:S==null?void 0:S.selected}),e.jsx($,{primary:h==null?void 0:h.type})]}),value:i,onChange:(s,h)=>g(h),renderInput:s=>e.jsx(G,{...s,label:"Select Level to assign",size:"small"})}),e.jsx(L,{variant:"contained",size:"small",onClick:k,children:"Add"})]}),e.jsx(_,{sx:{maxHeight:400},children:f.isEmpty(p)?e.jsx(P,{children:"No Level selected"}):p.map(({_id:s,type:h})=>e.jsx(Ce,{name:h,removeSubject:o},s))})]})}),e.jsxs(V,{sx:{padding:2},children:[e.jsx(L,{onClick:l,children:"Cancel"}),e.jsx(q,{disabled:p.length===0,variant:"contained",onClick:n,loading:d,children:d?"Please wait":"Assign Grade"})]})]})};function Oe(){const[a,t]=b.useState(!1),u=()=>t(!0),x=T(),{schoolSessionDispatch:r}=b.useContext(M),i=J({queryKey:["grades"],queryFn:()=>Te(),initialData:[]}),g=o=>{r({type:"editGrade",payload:{open:!0,data:o}})},p=o=>{r({type:"viewGrade",payload:{open:!0,data:o}})},c=o=>{r({type:"assignGrade",payload:{open:!0,data:o}})},{mutateAsync:m}=B({mutationFn:ze}),j=o=>{le.fire({title:"Removing Grade",text:"Do you want to remove?",showCancelButton:!0,backdrop:!1}).then(({isConfirmed:A})=>{A&&m(o,{onSettled:()=>{x.invalidateQueries(["grades"])},onSuccess:d=>{r(E(d))},onError:d=>{r(I(d))}})})},k=[{field:"_id",title:"ID",hidden:!0},{field:"name",title:"Name"},{field:null,title:"View Grade",render:o=>e.jsx(L,{sx:{bgcolor:"info.lighter",color:"info.darker"},onClick:()=>p(o==null?void 0:o.ratings),children:"View"})},{field:null,title:"Assign",render:o=>e.jsx(fe,{sx:{cursor:"pointer"},onClick:()=>c(o),children:"Assign"})},{title:"Action",field:null,render:o=>e.jsxs(w,{direction:"row",spacing:2,children:[e.jsx(ie,{className:"ico",onClick:()=>g(o),title:"Edit",titleAccess:"Edit"}),e.jsx(X,{className:"ico",onClick:()=>j(o==null?void 0:o._id),title:"Delete",titleAccess:"Delete"})]})}];return e.jsxs(e.Fragment,{children:[e.jsx(de,{title:"Grading System",icon:Q.grade,isLoading:i.isLoading,columns:k,data:i==null?void 0:i.data,actions:[],showAddButton:!0,addButtonImg:Q.session,addButtonMessage:"😑 No Grading system available!.Create a new one!",addButtonText:"New Grades",onAddButtonClicked:u,handleRefresh:i.refetch,options:{paginationPosition:"bottom"}}),e.jsx(De,{open:a,setOpen:t}),e.jsx(Ne,{}),e.jsx(Fe,{}),e.jsx(Re,{})]})}const _e=({name:a,code:t,isCore:u,removeSubject:x,appendCode:r,handleIsCore:i})=>{const[g,p]=b.useState(t);return e.jsxs(e.Fragment,{children:[e.jsxs(z,{children:[e.jsx(G,{placeholder:"code ",size:"small",sx:{width:100,mr:2},value:g,onChange:c=>p(c.target.value),onBlur:()=>r({name:a,isCore:u,code:g})}),e.jsx($,{secondary:a,secondaryTypographyProps:{fontSize:12,fontStyle:"italic"}}),e.jsxs(W,{sx:{display:"flex",justifyContent:"center",alignItems:"center",gap:1},children:[e.jsx(oe,{label:"Core",control:e.jsx(K,{title:"Core",checked:u,value:u,onChange:()=>i(a,!u)})}),e.jsx(ae,{onClick:()=>x(a),children:e.jsx(X,{})})]})]}),e.jsx(H,{})]})},qe=({open:a,setOpen:t})=>{const{schoolSessionDispatch:u}=b.useContext(M),x=T(),[r,i]=b.useState([]),[g,p]=b.useState({severity:"",text:""}),[c,m]=b.useState([]),j=s=>{const h=f.values(f.merge(f.keyBy([...c,s],"name")));m(h)},k=()=>{const s=f.values(f.merge(f.keyBy([...c,...r],"name")));m(s),i([])},o=s=>{m(h=>h.filter(({name:C})=>C!==s))},A=(s,h)=>{const S=c.find(({name:v})=>v===s);S.isCore=h;const C=f.values(f.merge(f.keyBy([...c,S],"name")));m(C)},{mutateAsync:d,isLoading:n}=B({mutationFn:ke}),l=()=>{p({text:""}),d(c,{onSettled:()=>{x.invalidateQueries(["subjects"])},onSuccess:s=>{u(E(s)),m([]),t(!1)},onError:s=>{u(I(s))}})};return e.jsxs(N,{open:a,onClose:()=>t(!1),maxWidth:"sm",fullWidth:!0,children:[e.jsx(F,{title:"New Subjects",subtitle:"Add new subjects",onClose:()=>t(!1)}),e.jsxs(R,{children:[g.text&&e.jsx(ge,{severity:g.severity,children:g.text}),e.jsxs(w,{spacing:2,paddingY:2,children:[e.jsx(P,{variant:"h5",sx:{textAlign:"right"}}),e.jsx(H,{}),e.jsxs(w,{direction:"row",spacing:2,alignItems:"center",children:[e.jsx(D,{multiple:!0,freeSolo:!0,fullWidth:!0,defaultValue:se,options:se,disableCloseOnSelect:!0,getOptionLabel:s=>(s==null?void 0:s.name)||"",renderOption:(s,h,S)=>e.jsxs(z,{...s,sx:{display:"flex",alignItems:"center"},children:[e.jsx(K,{checked:S==null?void 0:S.selected}),e.jsx($,{primary:h==null?void 0:h.name})]}),value:r,onChange:(s,h)=>i(h),renderInput:s=>e.jsx(G,{...s,label:"Select Subject",size:"small"})}),e.jsx(L,{variant:"contained",size:"small",onClick:k,children:"Add"})]}),e.jsx(_,{sx:{maxHeight:400},children:f.isEmpty(c)?e.jsx(P,{children:"No Subject selected"}):c.map(s=>e.jsx(_e,{...s,removeSubject:o,appendCode:j,handleIsCore:A},s==null?void 0:s.name))})]})]}),e.jsxs(V,{sx:{padding:2},children:[e.jsx(L,{onClick:()=>t(!1),children:"Cancel"}),e.jsx(q,{disabled:c.length===0,variant:"contained",onClick:l,loading:n,children:n?"Please wait":"Save Changes"})]})]})};function We(){const{schoolSessionState:{editSubject:{open:a,data:t}},schoolSessionDispatch:u}=b.useContext(M),x=T(),{mutateAsync:r,isLoading:i}=B({mutationFn:ve}),g=c=>{r(c,{onSettled:()=>{x.invalidateQueries(["subjects"])},onSuccess:m=>{u(E(m)),p()},onError:m=>{u(I(m))}})},p=()=>{u({type:"editSubject",payload:{open:!1,data:{}}})};return e.jsxs(N,{open:a,fullWidth:!0,maxWidth:"xs",children:[e.jsx(F,{title:"Edit Subject",onClose:p}),e.jsx(Y,{initialValues:t,onSubmit:g,enableReinitialize:!0,children:({values:c,errors:m,touched:j,handleChange:k,handleSubmit:o})=>e.jsxs(e.Fragment,{children:[e.jsx(R,{children:e.jsxs(w,{spacing:2,paddingY:2,children:[e.jsx(oe,{sx:{alignSelf:"flex-end"},label:"Core Subject",control:e.jsx(K,{value:c.isCore||!1,checked:c==null?void 0:c.isCore,onChange:k("isCore")})}),e.jsx(G,{label:"Code",size:"small",value:c.code||"",onChange:k("code"),error:!!(j.code&&m.code),helperText:j.code&&m.code}),e.jsx(G,{label:"Name",size:"small",value:c.name||"",onChange:k("name"),error:!!(j.name&&m.name),helperText:j.name&&m.name,InputProps:{readOnly:!0}})]})}),e.jsx(V,{sx:{padding:2},children:e.jsx(q,{loading:i,variant:"contained",onClick:o,children:i?"Saving":"Save Changes"})})]})})]})}function Ve(){const a=T(),{schoolSessionDispatch:t}=b.useContext(M),[u,x]=b.useState(!1),r=()=>x(!0),i=J({queryKey:["subjects"],queryFn:()=>we(),initialData:[]}),g=j=>{t({type:"editSubject",payload:{open:!0,data:j}})},{mutateAsync:p}=B({mutationFn:Ge}),c=j=>{le.fire({title:"Removing Subject",text:"Do you want to remove?",showCancelButton:!0,backdrop:!1}).then(({isConfirmed:k})=>{k&&p(j,{onSettled:()=>{a.invalidateQueries(["subjects"])},onSuccess:o=>{t(E(o))},onError:o=>{t(I(o))}})})},m=[...ye,{title:"Action",field:null,render:j=>e.jsxs(w,{direction:"row",spacing:2,children:[e.jsx(ie,{className:"ico edit",onClick:()=>g(j),title:"Edit",titleAccess:"Edit"}),e.jsx(X,{className:"ico delete",onClick:()=>c(j==null?void 0:j._id),title:"Delete",titleAccess:"Delete"})]})}];return e.jsxs("div",{children:[e.jsx(de,{search:!0,title:"Subjects",icon:Q.subject,isLoading:i.isLoading,columns:m,data:i==null?void 0:i.data,actions:[],showRowShadow:!1,showAddButton:!0,addButtonImg:Q.session,addButtonMessage:"😑 No Subjects system available!.Create a new one!",addButtonText:"New Subject",onAddButtonClicked:r,handleRefresh:i.refetch,options:{paginationPosition:"bottom"}}),e.jsx(qe,{open:u,setOpen:x}),e.jsx(We,{})]})}function Ss(){const[a,t]=b.useState("1");return e.jsxs(pe,{children:[e.jsx(Se,{title:"Subjects & Grading System",subtitle:" Manage subjects offered and their corresponding grading systems to maintain academic standards.",img:be,color:"primary.main"}),e.jsxs(Ae,{value:a,children:[e.jsxs(Me,{onChange:(u,x)=>t(x),children:[e.jsx(te,{label:"Subjects",value:"1"}),e.jsx(te,{label:"Grades",value:"2"})]}),e.jsx(ne,{value:"1",sx:{px:0},children:e.jsx(Ve,{})}),e.jsx(ne,{value:"2",sx:{px:0},children:e.jsx(Oe,{})})]})]})}export{Ss as default};