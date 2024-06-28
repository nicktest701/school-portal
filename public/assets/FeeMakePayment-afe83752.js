import{Q as B,j as e,R as q,V as $,O as ce,Z as me,aW as ue,a8 as xe,r as a,U as pe,S as he,ap as ye,u as ge,g as D,bZ as je,b_ as be,h as ve,b$ as Se,G as fe,M as _e,m as o,n as H,T as p,B as k,a5 as P,q as l,D as v,c0 as z,X as Ce,I as R,v as Pe,_ as m,ax as Fe,c1 as we,A as Te,ar as Ae,b as h,c2 as Me,N as Ne,w as Ee,x as Oe}from"./index-e0c0d8c9.js";import{b as Ie}from"./feeAPI-b09e18b5.js";const De=B(e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16"}),"MonetizationOn"),He=B(e.jsx("path",{d:"M18.39 14.56C16.71 13.7 14.53 13 12 13s-4.71.7-6.39 1.56C4.61 15.07 4 16.1 4 17.22V20h16v-2.78c0-1.12-.61-2.15-1.61-2.66M9.78 12h4.44c1.21 0 2.14-1.06 1.98-2.26l-.32-2.45C15.57 5.39 13.92 4 12 4S8.43 5.39 8.12 7.29L7.8 9.74c-.16 1.2.77 2.26 1.98 2.26"}),"Person2Sharp");var F={},ke=$;Object.defineProperty(F,"__esModule",{value:!0});var G=F.default=void 0,ze=ke(q()),Re=e;G=F.default=(0,ze.default)((0,Re.jsx)("path",{d:"M13.26 3C8.17 2.86 4 6.95 4 12H2.21c-.45 0-.67.54-.35.85l2.79 2.8c.2.2.51.2.71 0l2.79-2.8c.31-.31.09-.85-.36-.85H6c0-3.9 3.18-7.05 7.1-7 3.72.05 6.85 3.18 6.9 6.9.05 3.91-3.1 7.1-7 7.1-1.61 0-3.1-.55-4.28-1.48-.4-.31-.96-.28-1.32.08-.42.42-.39 1.13.08 1.49C9 20.29 10.91 21 13 21c5.05 0 9.14-4.17 9-9.26-.13-4.69-4.05-8.61-8.74-8.74m-.51 5c-.41 0-.75.34-.75.75v3.68c0 .35.19.68.49.86l3.12 1.85c.36.21.82.09 1.03-.26.21-.36.09-.82-.26-1.03l-2.88-1.71v-3.4c0-.4-.34-.74-.75-.74"}),"HistoryRounded");var w={},Be=$;Object.defineProperty(w,"__esModule",{value:!0});var V=w.default=void 0,qe=Be(q()),$e=e;V=w.default=(0,qe.default)((0,$e.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1.41 16.09v.58c0 .73-.6 1.33-1.33 1.33h-.01c-.73 0-1.33-.6-1.33-1.33v-.6c-1.33-.28-2.51-1.01-3.01-2.24-.23-.55.2-1.16.8-1.16h.24c.37 0 .67.25.81.6.29.75 1.05 1.27 2.51 1.27 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21v-.6c0-.73.6-1.33 1.33-1.33h.01c.73 0 1.33.6 1.33 1.33v.62c1.38.34 2.25 1.2 2.63 2.26.2.55-.22 1.13-.81 1.13h-.26c-.37 0-.67-.26-.77-.62-.23-.76-.86-1.25-2.12-1.25-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.02 1.83-1.39 2.83-3.13 3.16"}),"MonetizationOnRounded");const We=()=>{const S=ce(),W=me(),Y=ue(W.breakpoints.down("sm")),[d,Q]=xe(),{user:u,userState:{session:r}}=a.useContext(pe),{schoolSessionDispatch:T}=a.useContext(he);a.useContext(ye);const A=ge(),[y,M]=a.useState({severity:"",text:""});a.useState(!1);const[t,N]=a.useState({_id:"",fullName:"",profile:""}),[i,U]=a.useState({levelId:"",levelType:"",feesId:"",fees:0}),[E,Z]=a.useState(0),[f,K]=a.useState(0),[_,X]=a.useState(0),[O,J]=a.useState(0),[g,L]=a.useState(0),c=D({queryKey:["all-level-fees",r.sessionId,r.termId],queryFn:()=>Ie({session:r.sessionId,term:r.termId}),enabled:!!(r!=null&&r.sessionId)&&!!(r!=null&&r.termId)}),{students:I,levelLoading:ee}=je(i==null?void 0:i.levelId);D(["student-fees",t==null?void 0:t._id,d.get("level_id")],()=>be({session:r.sessionId,term:r.termId,student:t==null?void 0:t._id,level:d.get("level_id")}),{enabled:!!(t!=null&&t._id)&&!!d.get("level_id"),onSuccess:s=>{var n;J(s==null?void 0:s.totalAmountPaid),X(s==null?void 0:s.totalArreas),K(((n=s==null?void 0:s.current)==null?void 0:n.amountPaid)||0),Z(s==null?void 0:s.totalFees)}});const C=a.useMemo(()=>(i==null?void 0:i.fees)+_,[_,i==null?void 0:i.fees]),j=a.useMemo(()=>C-f,[f,C]),te=a.useMemo(()=>{const s=E-(O+Number(g));return s<0?{date:new Date().toISOString(),paid:j,outstanding:0,balance:Math.abs(s),issuer:u==null?void 0:u.fullname}:{date:new Date().toISOString(),paid:g,outstanding:s,balance:0,issuer:u==null?void 0:u.fullname}},[g,j,O,E]),{mutateAsync:se,isLoading:ne}=ve({mutationFn:Me});function ie(s,n){M({severity:"info",text:""});const x={session:r.sessionId,term:r.termId,level:i.levelId,student:t==null?void 0:t._id,fee:i==null?void 0:i.feesId,payment:[te]};Ne.fire({title:"Making Payment",text:"Do you want to proceed with the payment?",showCancelButton:!0}).then(({isConfirmed:le,isDenied:oe,isDismissed:de})=>{le&&se(x,{onSettled:()=>{A.invalidateQueries(["student-fees"]),A.invalidateQueries(["current-fees-summary"]),n.setSubmitting(!1)},onSuccess:async()=>{T(Ee("Payment Done!")),S("/fee/print",{state:{feePrintData:{fullName:t.fullName,levelType:i==null?void 0:i.levelType,payment:x.payment[0]}}})},onError:()=>{T(Oe("An unknown error has occurred!"))}}),(oe||de)&&(M({severity:"info",text:""}),n.setSubmitting(!1))})}const b=Se({initialValues:{amount:{}},enableReinitialize:!0,onSubmit:ie}),ae=()=>{S(`/fee/payment/student?level_id=${d.get("level_id")}&_id=${t==null?void 0:t._id}`,{state:{prevPath:`/fee/payment?level_id=${d.get("level_id")}&level_name=${d.get("level_name")}`}})},re=()=>S("/fee/payment/history");return e.jsxs(e.Fragment,{children:[e.jsx(fe,{title:"Fees Payment",subtitle:"Access,manage and control payment of school fees",img:_e.assessment,color:"primary.main"}),e.jsxs(o,{paddingY:4,spacing:2,children:[e.jsxs(o,{direction:"row",justifyContent:{xs:"center",sm:"space-between"},alignItems:"center",gap:2,children:[e.jsx(H,{sx:{width:250},fullWidth:!0,options:c!=null&&c.data?c.data:[],loading:c==null?void 0:c.isLoading,disableClearable:!0,closeText:" ",noOptionsText:"No Level Available",isOptionEqualToValue:(s,n)=>n.levelId===void 0||n.levelId===""||s.levelId===n.levelId,getOptionLabel:s=>s.levelType||"",value:i,onChange:(s,n)=>{U(n),Q(x=>(x.set("level_id",n==null?void 0:n.levelId),x.set("level_name",n==null?void 0:n.levelType),x))},onClose:()=>{N({})},renderInput:s=>e.jsx(p,{...s,label:"Select Level",size:"small"})}),e.jsx(k,{startIcon:e.jsx(G,{}),variant:"contained",onClick:re,children:Y?"":"   Payment History"})]}),e.jsx(H,{fullWidth:!0,options:I||[],loading:ee,disableClearable:!0,closeText:" ",noOptionsText:"No Student found",isOptionEqualToValue:(s,n)=>(n==null?void 0:n._id)===void 0||(n==null?void 0:n._id)===""||(s==null?void 0:s._id)===(n==null?void 0:n._id),getOptionLabel:s=>(s==null?void 0:s.fullName)||"",value:t,onChange:(s,n)=>N(n),renderInput:s=>e.jsx(p,{...s,placeholder:"Search for student"})})]}),e.jsxs(P,{container:!0,spacing:4,paddingY:1,bgcolor:"#fff",mt:1,children:[e.jsxs(P,{item:!0,xs:12,md:6,paddingY:6,children:[e.jsxs("div",{style:{display:"flex",gap:"4px",paddingBottom:"4px"},children:[e.jsx(He,{color:"secondary"}),e.jsx(l,{variant:"h6",children:"Personal Details"})]}),e.jsx(v,{}),e.jsxs(z,{elevation:1,sx:{marginTop:2,p:1},children:[e.jsx(o,{spacing:1,justifyContent:"center",alignItems:"center",paddingY:2,children:e.jsx(Ce,{src:(t==null?void 0:t.profile)===void 0||(t==null?void 0:t.profile)===""?null:t==null?void 0:t.profile,sx:{width:80,height:80}})}),e.jsxs(o,{spacing:2,paddingY:2,children:[e.jsx(p,{size:"small",label:"Student's Name",InputProps:{readOnly:!0},value:(t==null?void 0:t.fullName)||""}),e.jsx(p,{size:"small",value:(i==null?void 0:i.levelType)||d.get("level_name"),InputProps:{readOnly:!0}}),e.jsx(p,{type:"number",inputMode:"numeric",label:"Amount",size:"small",placeholder:"Enter Amount here",value:g,onChange:s=>L(s.target.valueAsNumber),error:b.errors.amount,helperText:b.touched.amount&&b.errors.amount,InputProps:{startAdornment:e.jsx(R,{position:"start",children:"GHS"}),endAdornment:e.jsx(R,{position:"end",children:"p"})}}),e.jsx(Pe,{disabled:m.isEmpty(t==null?void 0:t._id),size:"large",variant:"contained",startIcon:e.jsx(V,{}),loading:ne,onClick:b.handleSubmit,children:"Make Payment"})]})]})]}),e.jsxs(P,{item:!0,xs:12,md:6,paddingY:6,children:[e.jsxs("div",{style:{display:"flex",gap:"4px",paddingBottom:"4px"},children:[e.jsx(De,{color:"secondary"}),e.jsx(l,{variant:"h6",children:"Fees Details"})]}),e.jsx(v,{}),e.jsx(z,{elevation:1,sx:{marginTop:2},children:e.jsxs(o,{spacing:2,padding:2,children:[e.jsx(k,{variant:"outlined",size:"small",onClick:ae,disabled:m.isEmpty(t==null?void 0:t._id),children:"Payment Details"}),e.jsxs(o,{direction:"row",justifyContent:"space-between",children:[e.jsx(l,{fontWeight:"bold",children:"Fees"}),!m.isEmpty(t==null?void 0:t._id)&&j===0?e.jsx(Fe,{label:"Full Payment",color:"success",size:"medium",sx:{color:"white"},icon:e.jsx(we,{})}):null]}),y.text&&e.jsxs(Te,{severity:y.severity,children:[y.text,y.text.startsWith("No")&&e.jsx(Ae,{to:"/fee/new",children:"Add New Fee"})]}),e.jsxs(o,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(l,{variant:"body2",children:"Fees For Term"}),e.jsx(l,{variant:"body2",children:m.isEmpty(t==null?void 0:t._id)?"GHS 0.00":h((i==null?void 0:i.fees)||0)})]}),e.jsxs(o,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(l,{variant:"body2",children:"Arreas "}),e.jsx(l,{variant:"body2",children:h(_)})]}),e.jsx(v,{flexItem:!0}),e.jsxs(o,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(l,{fontWeight:"bold",children:"Total "}),e.jsx(l,{variant:"body2",children:m.isEmpty(t==null?void 0:t._id)?"GHS 0.00":h(C)})]}),e.jsxs(o,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(l,{fontWeight:"bold",children:"Fees Paid "}),e.jsx(l,{variant:"body2",children:m.isEmpty(t==null?void 0:t._id)?"GHS 0.00":h(f)})]}),e.jsx(v,{flexItem:!0}),e.jsxs(o,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(l,{fontWeight:"bold",children:"Outstanding Fees "}),e.jsx(l,{variant:"body2",children:m.isEmpty(t==null?void 0:t._id)?"GHS 0.00":h(j)})]})]})})]})]})]})};export{We as default};
