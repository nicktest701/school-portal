import{r as l,U as _,M as f,f as y,g as C,b1 as g,j as d,E as T,a4 as u,G as h,J as I,n as b,T as E}from"./index-5b8f5a53.js";import{a as j}from"./studentColumns-2ede27bc.js";const N=()=>{const{userState:{session:i}}=l.useContext(_),m=f(),[p,n]=l.useState([]),[t,c]=l.useState({_id:"",type:""}),{levelsOption:r}=y(),a=C({queryKey:["all-students",i==null?void 0:i.sessionId],queryFn:()=>g(i),enabled:!!i.sessionId});l.useEffect(()=>{var e;if(n([]),t!=null&&t._id){const s=(e=a==null?void 0:a.data)==null?void 0:e.filter(o=>(o==null?void 0:o.levelId)===(t==null?void 0:t._id));n(s)}else n([])},[t==null?void 0:t._id]);const S=e=>{const s=e.levelId,o=e.levelName;m(`/student/profile/${s}/${o}/${e._id}`,{state:{levelId:e.levelId,levelName:e.levelName}})},x=()=>{c({_id:"",type:""}),n([]),a.refetch()};return d.jsxs(d.Fragment,{children:[d.jsx(T,{title:"Students Information",subtitle:"  Track,manage and control academic and class activities",img:u,color:"primary.main"}),d.jsx(h,{title:(t==null?void 0:t.type)||"Students",icon:u,search:!0,columns:j,actions:[],data:(t==null?void 0:t._id)===""?a==null?void 0:a.data:p,onRowClick:S,addButtonImg:I.student,addButtonMessage:"😑 No Students recently added !!!!",showRowShadow:!0,handleRefresh:x,autoCompleteComponent:d.jsx(b,{disableClearable:!0,clearText:" ",sx:{width:280},options:r??[],isOptionEqualToValue:(e,s)=>s._id===void 0||s._id===""||e._id===s._id,getOptionLabel:e=>(e==null?void 0:e.type)||"",value:t,onChange:(e,s)=>c(s),renderInput:e=>d.jsx(E,{...e,label:"Select Class",size:"small"})})})]})};N.propTypes={};export{N as default};
