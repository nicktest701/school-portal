import{r as x,f as L,g as C,G as T,i as S,j as e,L as B,a7 as D,I,D as k,B as b,V as q,T as w,a8 as E,x as F,s as _,t as A,U as z,v as Q,C as N,n as V,a9 as P,J as U,b as M,p as O,q as $,aa as G}from"./index-bb65b4bf.js";import{u as R}from"./useLevel-2a56aacb.js";import{C as J}from"./CustomTitle-ed47c53b.js";import{B as K}from"./Back-0ebcc4f3.js";import{g as Y}from"./teacherAPI-256d27ef.js";import{L as H,A as W}from"./Autocomplete-95da27f3.js";import{L as j}from"./ListItemText-33ae0292.js";import{R as X}from"./RefreshRounded-8a86cd7d.js";import{L as Z}from"./ListItem-befde9c4.js";import{L as ee}from"./ListItemSecondaryAction-c66bb893.js";import"./ArrowBackRounded-54858719.js";import"./Chip-fa36c3a1.js";import"./listItemTextClasses-35ff90f6.js";import"./listItemButtonClasses-9702db06.js";function se(){const{schoolSessionDispatch:c}=x.useContext(L),m=C(),{id:n}=T(),{levelsOption:o}=R(),t=x.useMemo(()=>o==null?void 0:o.filter(s=>{var r;return((r=s==null?void 0:s.teacher)==null?void 0:r._id)===n}),[o,n]),{mutateAsync:h}=S({mutationFn:E}),f=s=>{F.fire({title:"Unassign Teacher",text:"Do you want to unassign teacher from this level?",showCancelButton:!0,backdrop:!1}).then(r=>{r.isConfirmed&&h(s,{onSuccess:l=>{m.invalidateQueries(["levels"]),c(_(l))},onError:l=>{c(A(l))}})})};return e.jsx(B,{subheader:e.jsxs(H,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:4},children:[e.jsx(j,{primary:"Assign Levels",secondary:"List of assigned levels",primaryTypographyProps:{fontSize:18,color:"var(--secondary)"},sx:{py:2}}),e.jsx(D,{title:"Refresh Levels",children:e.jsx(I,{children:e.jsx(X,{})})}),e.jsx(k,{})]}),sx:{pt:4},children:(t==null?void 0:t.length)>0?t==null?void 0:t.map(s=>e.jsxs(Z,{divider:!0,children:[e.jsx(j,{primary:s==null?void 0:s.type}),e.jsx(ee,{children:e.jsx(b,{title:"Remove Level",color:"error",size:"small",endIcon:e.jsx(q,{}),onClick:()=>f(s==null?void 0:s._id),children:"Remove"})})]},s==null?void 0:s._id)):e.jsx(w,{children:"No data available"})})}const te=()=>{var y;const{schoolSessionDispatch:c}=x.useContext(L),m=C(),[n,o]=x.useState({_id:"",type:""}),{id:t}=T(),{levelsOption:h,levelLoading:f}=R(),s=Q({queryKey:["teacher",t],queryFn:()=>Y(t),initialData:(y=m.getQueryData(["teachers",t]))==null?void 0:y.find(a=>(a==null?void 0:a._id)===t),enabled:!!t}),{mutateAsync:r,isLoading:l}=S({mutationFn:G}),v=(a,u)=>{var p;const g={_id:a==null?void 0:a._id,teacher:{_id:t,fullName:(p=s==null?void 0:s.data)==null?void 0:p.fullName}};r(g,{onSettled:()=>{m.invalidateQueries(["levels"]),u.setSubmitting(!1)},onSuccess:i=>{c(_(i))},onError:i=>{c(A(i))}})};return e.jsxs(N,{children:[e.jsx(K,{to:`/teacher/${t}`,color:"primary.main"}),e.jsx(J,{title:"Assign New Level",subtitle:"Allocate classrooms to teachers to facilitate organized and efficient learning environments.",color:"primary.main"}),e.jsx(V,{initialValues:n,validationSchema:P,onSubmit:v,enableReinitialize:!0,children:({errors:a,touched:u,handleSubmit:g,handleReset:p})=>e.jsx(e.Fragment,{children:e.jsxs(U,{sx:{mt:4,py:4,px:2,border:"1px solid lightgray",bgcolor:"#fff"},children:[e.jsx(W,{size:"small",options:h,loading:f,loadingText:"Loading levels.Please wait...",getOptionLabel:i=>(i==null?void 0:i.type)||"",isOptionEqualToValue:(i,d)=>d._id===void 0||d._id===""||d._id===i._id,value:n,onChange:(i,d)=>o(d),renderInput:i=>e.jsx(M,{...i,label:"Select a level",error:!!(u.type&&a.type),helperText:u.type&&a.type}),sx:{marginY:2}}),e.jsxs(O,{children:[e.jsx(b,{onClick:p,children:"Cancel"}),e.jsx($,{loading:l,variant:"contained",onClick:g,disabled:(n==null?void 0:n._id)==="",children:"Assign Level"})]})]})})}),e.jsx(se,{})]})},ge=z.memo(te);export{ge as default};