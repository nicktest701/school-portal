import{r as d,U as j,g as m,b2 as S,j as e,E as f,J as y,m as l,n as b,T as u,V as x,q as p,bY as T}from"./index-c7bc4969.js";import{e as _}from"./currentFeeAPI-a2e21867.js";import{S as C}from"./StudentFeeReportListItem-d59bdd22.js";import"./StudentFeesHistory-7df853db.js";const E="/assets/fees-empty2-840629c7.png",q=()=>{var o,c;const g=d.useId(),{userState:{session:n}}=d.useContext(j),[s,h]=d.useState({_id:"",profile:"",fullName:""}),r=m(["all-students",n],()=>S(n),{enabled:!!n.sessionId}),i=m(["all-fees-history",s==null?void 0:s._id],()=>_(s==null?void 0:s._id),{enabled:!!(s!=null&&s._id)});return e.jsxs(e.Fragment,{children:[e.jsx(f,{title:"Fees History",subtitle:"Manage Student fee payment history",img:y.assessment,color:"primary.main"}),e.jsx(l,{paddingY:4,children:e.jsx(b,{fullWidth:!0,disableClearable:!0,clearText:" ",options:(r==null?void 0:r.data)??[],loading:r.isLoading,loadingText:"Loading Students.Please Wait...",noOptionsText:"No Student found",isOptionEqualToValue:(a,t)=>(t==null?void 0:t._id)===void 0||(t==null?void 0:t._id)===""||a.id===(t==null?void 0:t._id),getOptionLabel:a=>(a==null?void 0:a.fullName)||"",value:s,onChange:(a,t)=>{h(t)},renderInput:a=>e.jsx(u,{...a,placeholder:"Search for student"})})}),i!=null&&i.data?e.jsxs(e.Fragment,{children:[e.jsx(l,{justifyContent:"center",paddingY:2,spacing:1,alignItems:"center",children:e.jsxs(e.Fragment,{children:[e.jsx(x,{src:s==null?void 0:s.profile,sx:{width:80,height:80}}),e.jsx(p,{sx:{textTransform:"capitalize"},children:s==null?void 0:s.fullName})]})}),e.jsx(T,{style:{width:"100%",minHeight:"300px"},autoHide:!0,children:(c=(o=i==null?void 0:i.data)==null?void 0:o.fees)==null?void 0:c.map(a=>{var t;return e.jsx(C,{item:a,studentId:(t=i==null?void 0:i.data)==null?void 0:t.studentId},g)})})]}):e.jsxs(l,{spacing:2,justifyContent:"center",alignItems:"center",children:[e.jsx(x,{src:E,sx:{width:200,height:200}}),e.jsx(p,{variant:"body2",children:"No Records available"})]})]})};export{q as default};
