import{r as n,a0 as x,n as h,c as f,_ as s,j as t,e as g,M as j,l,m,U as p}from"./index-ce442eb1.js";import{C}from"./CustomizedMaterialTable-06b57d17.js";import{g as F}from"./currentFeeAPI-8639b338.js";import{C as P}from"./CustomDatePicker-0001e585.js";import{c as d}from"./currencyFormatter-1910a788.js";import{f as c}from"./fee_ico-578bcc38.js";import"./TabPanel-47a179c1.js";import"./Toolbar-8b116404.js";import"./Chip-15117b24.js";import"./Autocomplete-87c4b1e1.js";import"./Skeleton-b715010d.js";import"./ButtonGroup-ca857561.js";import"./ListItemText-b107adf9.js";import"./InputAdornment-92a613d9.js";import"./DialogActions-c9d7df2e.js";import"./ListItemSecondaryAction-660d9daa.js";import"./useMediaQuery-5bcb3f64.js";import"./ListItem-2727fabf.js";import"./listItemButtonClasses-c7063ebe.js";import"./ListItemButton-97ec9750.js";import"./Check-4cc8eef7.js";import"./DeleteOutline-78b9d3f1.js";import"./images-ee905b8b.js";import"./Delete-fb41f478.js";import"./AdapterMoment-20f157db.js";function b(){const{userState:{session:r}}=n.useContext(x),[i,u]=n.useState(h()),e=f({queryKey:["fees-for-day",i],queryFn:()=>F({session:r==null?void 0:r.sessionId,term:r==null?void 0:r.termId,date:i}),initialData:[],enabled:!!(r!=null&&r.sessionId)&&!!(r!=null&&r.termId)&&!!i}),y=n.useMemo(()=>{var o;return((o=e==null?void 0:e.data)==null?void 0:o.length)===0?0:s.sumBy(s.flatMap(e==null?void 0:e.data,"payment"),a=>Number(a==null?void 0:a.paid))},[e==null?void 0:e.data]);return t.jsxs(t.Fragment,{children:[t.jsx(g,{title:"Fee Payment History",subtitle:"View fee transactions",color:"primary.main"}),t.jsxs(t.Fragment,{children:[t.jsxs(j,{display:"flex",justifyContent:"space-between",alignItems:"center",my:4,children:[t.jsx(P,{label:"Date Of Payment",date:i,setDate:u,style:{width:300}}),t.jsxs(l,{children:[t.jsx(m,{textAlign:"right",children:"Total Amount"}),t.jsx(m,{textAlign:"right",variant:"h5",children:d(y)})]})]}),t.jsx(C,{isLoading:e.isLoading,icon:c,title:`Fee Payment on ${i.format("LL")}`,addButtonImg:c,addButtonMessage:"Payment not available",search:!0,handleRefresh:e.refetch,columns:[{title:"Student",field:"student"},{title:"Level",field:"level"},{title:"Amount Paid",field:"payment",render:({payment:o})=>t.jsx(t.Fragment,{children:o.map(a=>t.jsx(l,{direction:"row",columnGap:1,children:t.jsx(m,{variant:"caption",children:d(a.paid)})},a.date))})}],data:e==null?void 0:e.data,actions:[]})]})]})}b.propTypes={open:p.bool,setOpen:p.func};export{b as default};
