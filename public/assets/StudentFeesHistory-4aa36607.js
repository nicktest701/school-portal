import{j as r,S as s,A as p,a as I,T as o,_ as C,D as T,r as y,a0 as N,u as R,a1 as B,v as w,J as P,B as H,P as v}from"./index-bb65b4bf.js";import{a as u}from"./currentFeeAPI-3305f0eb.js";import{C as S}from"./CustomizedMaterialTable-266061d1.js";import{R as E}from"./index-19e2cbed.js";import{b}from"./sessionColumns-3b88387c.js";import{C as L}from"./CustomTitle-ed47c53b.js";import{B as D}from"./Back-0ebcc4f3.js";import{G}from"./GlobalSpinner-7eeaabc1.js";import{P as M}from"./PrintRounded-deb2312d.js";import"./TabPanel-175e39ff.js";import"./Toolbar-36d77a55.js";import"./MenuItem-1edcf8db.js";import"./listItemTextClasses-35ff90f6.js";import"./Chip-fa36c3a1.js";import"./Autocomplete-95da27f3.js";import"./Skeleton-6cff8ea8.js";import"./ButtonGroup-83f2640f.js";import"./ListItemText-33ae0292.js";import"./InputAdornment-321f8206.js";import"./CardContent-25ef3451.js";import"./ListItemSecondaryAction-c66bb893.js";import"./Grid-6a14669c.js";import"./useMediaQuery-5f0ec7e9.js";import"./ListItem-befde9c4.js";import"./listItemButtonClasses-9702db06.js";import"./ListItemButton-bf3e0355.js";import"./Check-7b95876f.js";import"./DeleteOutline-80e9f63f.js";import"./Delete-97505065.js";import"./Add-66663708.js";import"./currencyFormatter-1910a788.js";import"./CircleRounded-3db5a545.js";import"./Edit-11e1ba9f.js";import"./ArrowBackRounded-54858719.js";const l="/assets/history_ico-167fe80a.svg",e=JSON.parse(localStorage.getItem("@school_info"));function O({student:i}){return r.jsx("div",{children:r.jsxs(s,{spacing:1,sx:{maxWidth:"8.5in",minHeight:"11in",margin:"auto",padding:"8px"},children:[r.jsxs(s,{direction:"row",justifyContent:"flex-start",alignItems:"center",columnGap:2,pb:2,children:[e!=null&&e.badge?r.jsx(p,{alt:"school logo",loading:"lazy",srcSet:`/images/users/${e==null?void 0:e.badge}`,sx:{width:40,height:40}}):r.jsx(I,{sx:{width:40,height:40}}),r.jsxs(s,{justifyContent:"flex-start",alignItems:"flex-start",children:[r.jsx(o,{variant:"h6",children:C.startCase(e==null?void 0:e.name)}),r.jsx(o,{variant:"caption",children:e==null?void 0:e.address}),r.jsx(o,{variant:"caption",children:e==null?void 0:e.location}),r.jsx(o,{variant:"caption",fontStyle:"italic",children:e==null?void 0:e.motto})]})]}),r.jsx(T,{}),r.jsx(o,{paragraph:!0,sx:{textAlign:"center",textDecoration:"underline",color:"primary",width:"100%",padding:"4px"},variant:"h6",children:"Fees Report"}),r.jsxs(s,{justifyContent:"center",alignItems:"center",spacing:1,pt:2,children:[r.jsx(p,{src:(i==null?void 0:i.profile)===""||(i==null?void 0:i.profile)===void 0||(i==null?void 0:i.profile)===null?null:i==null?void 0:i.profile,sx:{width:40,height:40,alignSelf:"center"}}),r.jsx(o,{children:i==null?void 0:i.fullName}),r.jsx(o,{variant:"caption",children:i==null?void 0:i.levelType})]}),r.jsx("div",{style:{flexGrow:1},children:r.jsx(S,{title:"Fees History",icon:l,addButtonImg:l,addButtonMessage:"No Fees History Found",exportFileName:i==null?void 0:i.fullName,columns:b,data:i==null?void 0:i.payment,actions:[],options:{paging:!1,selection:!1,columnsButton:!1},style:{border:"none"}})}),r.jsx(o,{style:{fontSize:"10px",fontStyle:"italic"},children:"Powered by FrebbyTech Consults (0543772591)"})]})})}const z=()=>{var c,x,g,d,h,f,j;const{userState:{session:i}}=y.useContext(N),{state:n}=R(),[t]=B(),m=y.useRef(),a=w({queryKey:["student-fee-history",t.get("_id"),t.get("level_id")],queryFn:()=>u({sessionId:i.sessionId,termId:i==null?void 0:i.termId,studentId:t.get("_id"),levelId:t.get("level_id"),feeId:t.get("fid")}),enabled:!!t.get("_id")&&!!t.get("level_id")});return r.jsxs(r.Fragment,{children:[r.jsx(D,{to:n==null?void 0:n.prevPath,color:"primary.main"}),r.jsx(L,{title:((c=a==null?void 0:a.data)==null?void 0:c.fullName)||"",subtitle:(x=a==null?void 0:a.data)==null?void 0:x.levelType,color:"primary.main",icon:r.jsx(p,{srcSet:((g=a==null?void 0:a.data)==null?void 0:g.profile)===void 0||((d=a==null?void 0:a.data)==null?void 0:d.profile)===""?null:(h=a==null?void 0:a.data)==null?void 0:h.profile,sx:{width:70,height:70}})}),r.jsx(P,{children:r.jsx(r.Fragment,{children:r.jsx(S,{title:"Fees History",subtitle:"Showing details of student fees transactions",search:!0,icon:l,addButtonImg:l,addButtonMessage:"No Fees History Found",isLoading:a.isLoading,exportFileName:(f=a==null?void 0:a.data)==null?void 0:f.fullName,columns:b,data:(j=a==null?void 0:a.data)==null?void 0:j.payment,actions:[],handleRefresh:a.refetch,autoCompleteComponent:r.jsx(s,{direction:"row",spacing:1,children:r.jsx(E,{trigger:()=>r.jsx(H,{startIcon:r.jsx(M,{}),variant:"contained",children:"Print Report"}),content:()=>m.current})}),options:{paging:!1,selection:!1,columnsButton:!1},style:{border:"none"}})})}),r.jsx("div",{ref:m,className:"print-container",children:r.jsx(O,{student:a==null?void 0:a.data})}),a.isLoading&&r.jsx(G,{})]})};z.propTypes={open:v.bool,setOpen:v.func};export{z as default};
