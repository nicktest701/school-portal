import{u as c,r as d,a0 as l,c as g,j as s,e as f,p as C,B as h}from"./index-ce442eb1.js";import{C as x}from"./CustomizedMaterialTable-06b57d17.js";import{E as y}from"./images-ee905b8b.js";import{l as S}from"./sessionColumns-a7ba1da8.js";import{g as E}from"./courseAPI-0bcd1e07.js";import"./TabPanel-47a179c1.js";import"./Toolbar-8b116404.js";import"./Chip-15117b24.js";import"./Autocomplete-87c4b1e1.js";import"./Skeleton-b715010d.js";import"./ButtonGroup-ca857561.js";import"./ListItemText-b107adf9.js";import"./InputAdornment-92a613d9.js";import"./DialogActions-c9d7df2e.js";import"./ListItemSecondaryAction-660d9daa.js";import"./useMediaQuery-5bcb3f64.js";import"./ListItem-2727fabf.js";import"./listItemButtonClasses-c7063ebe.js";import"./ListItemButton-97ec9750.js";import"./Check-4cc8eef7.js";import"./DeleteOutline-78b9d3f1.js";import"./Delete-fb41f478.js";import"./currencyFormatter-1910a788.js";import"./CircleRounded-06f2dceb.js";import"./Edit-009e8578.js";function Y(){const m=c(),{user:t,userState:{session:o}}=d.useContext(l),r=g({queryKey:["courses",t==null?void 0:t.id],queryFn:()=>E({teacher:t==null?void 0:t.id,session:o==null?void 0:o.sessionId,term:o==null?void 0:o.termId})}),p=({_id:e,levelId:i,subject:a,level:n})=>m(`/course/assign/${i}/${n}?sub=${a}`,{state:{id:e,subject:a,type:n,levelId:i}}),u=[...S,{field:null,title:"Action",render:e=>s.jsx(h,{variant:"outlined",color:"info",onClick:()=>p(e),children:"Manage Results"})}];return s.jsxs(s.Fragment,{children:[s.jsx(f,{title:"Assigned Courses",subtitle:"Track,manage and control courses assigned to you",icon:s.jsx(C,{color:"primary"}),color:"primary.main"}),s.jsx(x,{title:"Courses",isLoading:r.isLoading,columns:u,data:r.data,actions:[],showRowShadow:!1,addButtonImg:y.session,addButtonMessage:"😑 No course has been assign!",handleRefresh:r.refetch,options:{selection:!1}})]})}export{Y as default};