import{b as y,r as o,S as C,a as L,c as A,d as B,j as e,e as I,M as k,k as w,l,T as E,B as T,L as _,y as q,_ as p,ah as P,g as Q,h as F}from"./index-DrgqF6h7.js";import{S as O}from"./SaveAltRounded-J3aK1J30.js";import{L as R,g as z}from"./subjectAPI-BkI1ewCY.js";import{u as M}from"./useLevelById-C5Sw-_pl.js";import{B as D}from"./Back-CADpxW16.js";import{A as K,L as W}from"./Autocomplete-D4vPEd6T.js";import"./DeleteOutline-DM92K-00.js";import"./ListItem-yCsexoBs.js";import"./ListItemSecondaryAction-mmiMbVqP.js";import"./listItemButtonClasses-CLhmtlXH.js";import"./ListItemText-Bwh_rzOL.js";import"./Chip-BcLQNplL.js";const re=()=>{const i=y(),{schoolSessionDispatch:c}=o.useContext(C),[r,$]=L(),[u,d]=o.useState([]),[s,n]=o.useState([]),{subjects:m,levelLoading:j}=M(r.get("_id")),h=A({queryKey:["subjects"],queryFn:()=>z(),select:t=>p.map(t,"name")});o.useEffect(()=>{n(m)},[r.get("_id"),m]);const S=()=>{const t=p.uniq([...s,...u]);n(t),d([])},x=t=>{n(a=>a.filter(v=>v!==t))},{mutateAsync:b,isLoading:f}=B(P),g=()=>{const t={levelId:r.get("_id"),subjects:s};b(t,{onSettled:()=>{i.invalidateQueries(["subjects"]),i.invalidateQueries(["level",r.get("_id")])},onSuccess:a=>{c(Q(a))},onError:a=>{c(F(a))}})};return e.jsxs(e.Fragment,{children:[e.jsx(D,{to:"/level",color:"primary.main"}),e.jsx(I,{title:`Current Courses for ${r.get("type")}`,subtitle:"Add new subjects to the current level",color:"primary.main"}),e.jsxs(k,{children:[e.jsxs(w,{spacing:2,py:6,width:"100%",justifyContent:"center",alignItems:"flex-start",children:[e.jsx(l,{variant:"h6",children:"Please select one or multiple courses"}),e.jsx(K,{multiple:!0,freeSolo:!0,fullWidth:!0,options:h.data??[],disableCloseOnSelect:!0,getOptionLabel:t=>t||"",value:u,onChange:(t,a)=>d(a),renderInput:t=>e.jsx(E,{...t,label:"Select Course",size:"small",focused:!0})}),e.jsx(T,{variant:"contained",size:"small",onClick:S,sx:{px:4,py:2,alignSelf:"flex-end"},children:"Add Course"})]}),e.jsxs(_,{sx:{height:400,p:2,mt:4,overflow:"auto",bgcolor:"#fff"},subheader:e.jsxs(W,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:4},children:[e.jsxs(l,{variant:"h4",children:[s.length," Course(s) Available"]}),e.jsx(q,{startIcon:e.jsx(O,{}),loading:f,variant:"contained",onClick:g,disabled:(s==null?void 0:s.length)===0,children:"Save Courses"})]}),children:[j&&e.jsx(l,{variant:"h6",children:"Loading.... "}),s==null?void 0:s.map(t=>e.jsx(R,{name:t,removeSubject:x},t))]})]})]})};export{re as default};
