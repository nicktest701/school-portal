import{H as c,r as d,a0 as l,v as g,j as r,a as f,B as C}from"./index-bb65b4bf.js";import{C as h}from"./CustomTitle-ed47c53b.js";import{C as x}from"./CustomizedMaterialTable-266061d1.js";import{E as y}from"./images-0c291668.js";import{l as S}from"./sessionColumns-3b88387c.js";import{g as E}from"./courseAPI-64513bea.js";import"./TabPanel-175e39ff.js";import"./Toolbar-36d77a55.js";import"./MenuItem-1edcf8db.js";import"./listItemTextClasses-35ff90f6.js";import"./Chip-fa36c3a1.js";import"./Autocomplete-95da27f3.js";import"./Skeleton-6cff8ea8.js";import"./ButtonGroup-83f2640f.js";import"./ListItemText-33ae0292.js";import"./InputAdornment-321f8206.js";import"./CardContent-25ef3451.js";import"./ListItemSecondaryAction-c66bb893.js";import"./Grid-6a14669c.js";import"./useMediaQuery-5f0ec7e9.js";import"./ListItem-befde9c4.js";import"./listItemButtonClasses-9702db06.js";import"./ListItemButton-bf3e0355.js";import"./Check-7b95876f.js";import"./DeleteOutline-80e9f63f.js";import"./Delete-97505065.js";import"./Add-66663708.js";import"./score_ico-e1082ac1.js";import"./currencyFormatter-1910a788.js";import"./CircleRounded-3db5a545.js";import"./Edit-11e1ba9f.js";function Z(){const n=c(),{user:o,userState:{session:t}}=d.useContext(l),s=g({queryKey:["courses",o==null?void 0:o.id],queryFn:()=>E({teacher:o==null?void 0:o.id,session:t==null?void 0:t.sessionId,term:t==null?void 0:t.termId})}),p=({_id:i,levelId:e,subject:a,level:m})=>n(`/course/assign/${e}/${m}?sub=${a}`,{state:{id:i,subject:a,type:m,levelId:e}}),u=[...S,{field:null,title:"Action",render:i=>r.jsx(C,{variant:"outlined",color:"info",onClick:()=>p(i),children:"Manage Results"})}];return r.jsxs(r.Fragment,{children:[r.jsx(h,{title:"Assigned Courses",subtitle:"Track,manage and control courses assigned to you",icon:r.jsx(f,{color:"primary"}),color:"primary.main"}),r.jsx(x,{title:"Courses",isLoading:s.isLoading,columns:u,data:s.data,actions:[],showRowShadow:!1,addButtonImg:y.session,addButtonMessage:"😑 No course has been assign!",handleRefresh:s.refetch,options:{selection:!1}})]})}export{Z as default};
