import{H as n,j as o}from"./index-bb65b4bf.js";import{C as p}from"./CustomizedMaterialTable-266061d1.js";import{e as l}from"./sessionColumns-3b88387c.js";import{u as d}from"./useLevel-2a56aacb.js";import{e as r}from"./exams_ico-2188bf14.js";import{E as u}from"./images-0c291668.js";import{C as c}from"./CustomTitle-ed47c53b.js";import"./TabPanel-175e39ff.js";import"./Toolbar-36d77a55.js";import"./MenuItem-1edcf8db.js";import"./listItemTextClasses-35ff90f6.js";import"./Chip-fa36c3a1.js";import"./Autocomplete-95da27f3.js";import"./Skeleton-6cff8ea8.js";import"./ButtonGroup-83f2640f.js";import"./ListItemText-33ae0292.js";import"./InputAdornment-321f8206.js";import"./CardContent-25ef3451.js";import"./ListItemSecondaryAction-c66bb893.js";import"./Grid-6a14669c.js";import"./useMediaQuery-5f0ec7e9.js";import"./ListItem-befde9c4.js";import"./listItemButtonClasses-9702db06.js";import"./ListItemButton-bf3e0355.js";import"./Check-7b95876f.js";import"./DeleteOutline-80e9f63f.js";import"./Delete-97505065.js";import"./Add-66663708.js";import"./currencyFormatter-1910a788.js";import"./CircleRounded-3db5a545.js";import"./Edit-11e1ba9f.js";import"./score_ico-e1082ac1.js";const q=()=>{const m=n(),{levelsOption:e,levelLoading:s}=d(),a=(i,t)=>{m(`level/${i}/${t}`,{state:{level:t}})};return o.jsxs(o.Fragment,{children:[o.jsx(c,{title:"Examination Portal",subtitle:"Organize and oversee exams, schedule, and results to ensure a fair and efficient examination process.",img:r,color:"primary.main"}),o.jsx(p,{title:"Current Levels",search:!0,icon:r,isLoading:s,columns:l,data:e!==void 0?e:[],actions:[],options:{selection:!1},onRowClick:({_id:i,type:t})=>a(i,t),addButtonImg:u.student,addButtonMessage:"😑 No Students recently added !!!!"})]})};export{q as default};