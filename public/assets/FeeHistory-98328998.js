import{r as n,a0 as S,a1 as f,v as c,eV as y,j as t,S as d,b as u,A as p,T as x,fd as b}from"./index-bb65b4bf.js";import{f as T}from"./currentFeeAPI-3305f0eb.js";import{S as _}from"./StudentFeeReportListItem-bd7df2b4.js";import{C}from"./CustomTitle-ed47c53b.js";import{E as A}from"./images-0c291668.js";import{A as E}from"./Autocomplete-95da27f3.js";import"./v4-4a60fe23.js";import"./ListItemButton-bf3e0355.js";import"./listItemButtonClasses-9702db06.js";import"./ListItemText-33ae0292.js";import"./listItemTextClasses-35ff90f6.js";import"./score_ico-e1082ac1.js";import"./Chip-fa36c3a1.js";const N="/assets/fees-empty2-840629c7.png",D=()=>{var m,l;const h=n.useId(),{userState:{session:o}}=n.useContext(S),[P,g]=f(),[e,j]=n.useState({_id:"",profile:"",fullName:""}),r=c(["all-students",o],()=>y(o),{enabled:!!o.sessionId}),i=c(["all-fees-history",e==null?void 0:e._id],()=>T(e==null?void 0:e._id),{enabled:!!(e!=null&&e._id),onSettled:()=>{g(a=>(a.set("_id",e==null?void 0:e._id),a))}});return t.jsxs(t.Fragment,{children:[t.jsx(C,{title:"Fees History",subtitle:"Manage Student fee payment history",img:A.assessment,color:"primary.main"}),t.jsx(d,{paddingY:4,children:t.jsx(E,{fullWidth:!0,disableClearable:!0,clearText:" ",options:(r==null?void 0:r.data)??[],loading:r.isLoading,loadingText:"Loading Students.Please Wait...",noOptionsText:"No Student found",isOptionEqualToValue:(a,s)=>(s==null?void 0:s._id)===void 0||(s==null?void 0:s._id)===""||a.id===(s==null?void 0:s._id),getOptionLabel:a=>(a==null?void 0:a.fullName)||"",value:e,onChange:(a,s)=>{j(s)},renderInput:a=>t.jsx(u,{...a,placeholder:"Search for student"})})}),i!=null&&i.data?t.jsxs(t.Fragment,{children:[t.jsx(d,{justifyContent:"center",paddingY:2,spacing:1,alignItems:"center",children:t.jsxs(t.Fragment,{children:[t.jsx(p,{src:e==null?void 0:e.profile,sx:{width:80,height:80}}),t.jsx(x,{sx:{textTransform:"capitalize"},children:e==null?void 0:e.fullName})]})}),t.jsx(b,{style:{width:"100%",minHeight:"300px"},autoHide:!0,children:(l=(m=i==null?void 0:i.data)==null?void 0:m.fees)==null?void 0:l.map(a=>{var s;return t.jsx(_,{item:a,studentId:(s=i==null?void 0:i.data)==null?void 0:s.studentId},h)})})]}):t.jsxs(d,{spacing:2,justifyContent:"center",alignItems:"center",children:[t.jsx(p,{src:N,sx:{width:200,height:200}}),t.jsx(x,{variant:"body2",children:"No Records available"})]})]})};export{D as default};
