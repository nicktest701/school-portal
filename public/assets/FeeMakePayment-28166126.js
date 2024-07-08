import{c as R,j as e,ad as q,ae as $,H as ce,af as me,a1 as ue,r as a,a0 as pe,f as xe,g as he,v as D,i as ye,fc as ge,S as l,b as x,B as H,T as o,D as v,bI as z,A as je,q as fe,_ as m,z as ve,aC as be,x as Se,s as _e,t as Ce}from"./index-bb65b4bf.js";import{d as Pe}from"./Check-7b95876f.js";import{b as Fe}from"./feeAPI-18dfe0ab.js";import{e as we,p as Ae}from"./currentFeeAPI-3305f0eb.js";import{c as h}from"./currencyFormatter-1910a788.js";import{C as Te}from"./CustomTitle-ed47c53b.js";import{E as Me}from"./images-0c291668.js";import{u as Ne}from"./useLevelById-2106d452.js";import{u as Ee}from"./useMediaQuery-5f0ec7e9.js";import{A as k}from"./Autocomplete-95da27f3.js";import{G as P}from"./Grid-6a14669c.js";import{I as B}from"./InputAdornment-321f8206.js";import{C as Ie}from"./Chip-fa36c3a1.js";import"./score_ico-e1082ac1.js";const Oe=R(e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16"}),"MonetizationOn"),De=R(e.jsx("path",{d:"M18.39 14.56C16.71 13.7 14.53 13 12 13s-4.71.7-6.39 1.56C4.61 15.07 4 16.1 4 17.22V20h16v-2.78c0-1.12-.61-2.15-1.61-2.66M9.78 12h4.44c1.21 0 2.14-1.06 1.98-2.26l-.32-2.45C15.57 5.39 13.92 4 12 4S8.43 5.39 8.12 7.29L7.8 9.74c-.16 1.2.77 2.26 1.98 2.26"}),"Person2Sharp");var F={},He=$;Object.defineProperty(F,"__esModule",{value:!0});var G=F.default=void 0,ze=He(q()),ke=e;G=F.default=(0,ze.default)((0,ke.jsx)("path",{d:"M13.26 3C8.17 2.86 4 6.95 4 12H2.21c-.45 0-.67.54-.35.85l2.79 2.8c.2.2.51.2.71 0l2.79-2.8c.31-.31.09-.85-.36-.85H6c0-3.9 3.18-7.05 7.1-7 3.72.05 6.85 3.18 6.9 6.9.05 3.91-3.1 7.1-7 7.1-1.61 0-3.1-.55-4.28-1.48-.4-.31-.96-.28-1.32.08-.42.42-.39 1.13.08 1.49C9 20.29 10.91 21 13 21c5.05 0 9.14-4.17 9-9.26-.13-4.69-4.05-8.61-8.74-8.74m-.51 5c-.41 0-.75.34-.75.75v3.68c0 .35.19.68.49.86l3.12 1.85c.36.21.82.09 1.03-.26.21-.36.09-.82-.26-1.03l-2.88-1.71v-3.4c0-.4-.34-.74-.75-.74"}),"HistoryRounded");var w={},Be=$;Object.defineProperty(w,"__esModule",{value:!0});var V=w.default=void 0,Re=Be(q()),qe=e;V=w.default=(0,Re.default)((0,qe.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1.41 16.09v.58c0 .73-.6 1.33-1.33 1.33h-.01c-.73 0-1.33-.6-1.33-1.33v-.6c-1.33-.28-2.51-1.01-3.01-2.24-.23-.55.2-1.16.8-1.16h.24c.37 0 .67.25.81.6.29.75 1.05 1.27 2.51 1.27 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21v-.6c0-.73.6-1.33 1.33-1.33h.01c.73 0 1.33.6 1.33 1.33v.62c1.38.34 2.25 1.2 2.63 2.26.2.55-.22 1.13-.81 1.13h-.26c-.37 0-.67-.26-.77-.62-.23-.76-.86-1.25-2.12-1.25-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.02 1.83-1.39 2.83-3.13 3.16"}),"MonetizationOnRounded");const st=()=>{const b=ce(),W=me(),Y=Ee(W.breakpoints.down("sm")),[d,Q]=ue(),{user:u,userState:{session:r}}=a.useContext(pe),{schoolSessionDispatch:A}=a.useContext(xe),T=he(),[y,M]=a.useState({severity:"",text:""}),[t,N]=a.useState({_id:"",fullName:"",profile:""}),[n,K]=a.useState({levelId:"",levelType:"",feesId:"",fees:0}),[E,U]=a.useState(0),[S,J]=a.useState(0),[_,L]=a.useState(0),[I,X]=a.useState(0),[g,Z]=a.useState(0),c=D({queryKey:["all-level-fees",r.sessionId,r.termId],queryFn:()=>Fe({session:r.sessionId,term:r.termId}),enabled:!!(r!=null&&r.sessionId)&&!!(r!=null&&r.termId)}),{students:O,levelLoading:ee}=Ne(n==null?void 0:n.levelId);D(["student-fees",t==null?void 0:t._id,d.get("level_id")],()=>we({session:r.sessionId,term:r.termId,student:t==null?void 0:t._id,level:d.get("level_id")}),{enabled:!!(t!=null&&t._id)&&!!d.get("level_id"),onSuccess:s=>{var i;X(s==null?void 0:s.totalAmountPaid),L(s==null?void 0:s.totalArreas),J(((i=s==null?void 0:s.current)==null?void 0:i.amountPaid)||0),U(s==null?void 0:s.totalFees)}});const C=a.useMemo(()=>(n==null?void 0:n.fees)+_,[_,n==null?void 0:n.fees]),j=a.useMemo(()=>C-S,[S,C]),te=a.useMemo(()=>{const s=E-(I+Number(g));return s<0?{date:new Date().toISOString(),paid:j,outstanding:0,balance:Math.abs(s),issuer:u==null?void 0:u.fullname}:{date:new Date().toISOString(),paid:g,outstanding:s,balance:0,issuer:u==null?void 0:u.fullname}},[g,j,I,E]),{mutateAsync:se,isLoading:ie}=ye({mutationFn:Ae});function ne(s,i){M({severity:"info",text:""});const p={session:r.sessionId,term:r.termId,level:n.levelId,student:t==null?void 0:t._id,fee:n==null?void 0:n.feesId,payment:[te]};Se.fire({title:"Making Payment",text:"Do you want to proceed with the payment?",showCancelButton:!0}).then(({isConfirmed:oe,isDenied:le,isDismissed:de})=>{oe&&se(p,{onSettled:()=>{T.invalidateQueries(["student-fees"]),T.invalidateQueries(["current-fees-summary"]),i.setSubmitting(!1)},onSuccess:async()=>{A(_e("Payment Done!")),b("/fee/print",{state:{feePrintData:{fullName:t.fullName,levelType:n==null?void 0:n.levelType,payment:p.payment[0]}}})},onError:()=>{A(Ce("An unknown error has occurred!"))}}),(le||de)&&(M({severity:"info",text:""}),i.setSubmitting(!1))})}const f=ge({initialValues:{amount:{}},enableReinitialize:!0,onSubmit:ne}),re=()=>{b(`/fee/payment/student?level_id=${d.get("level_id")}&_id=${t==null?void 0:t._id}`,{state:{prevPath:`/fee/payment?level_id=${d.get("level_id")}&level_name=${d.get("level_name")}`}})},ae=()=>b("/fee/payment/history");return e.jsxs(e.Fragment,{children:[e.jsx(Te,{title:"Fees Payment",subtitle:"Access,manage and control payment of school fees",img:Me.assessment,color:"primary.main"}),e.jsxs(l,{paddingY:4,spacing:2,children:[e.jsxs(l,{direction:"row",justifyContent:{xs:"center",sm:"space-between"},alignItems:"center",gap:2,children:[e.jsx(k,{sx:{width:250},fullWidth:!0,options:c!=null&&c.data?c.data:[],loading:c==null?void 0:c.isLoading,disableClearable:!0,closeText:" ",noOptionsText:"No Level Available",isOptionEqualToValue:(s,i)=>i.levelId===void 0||i.levelId===""||s.levelId===i.levelId,getOptionLabel:s=>s.levelType||"",value:n,onChange:(s,i)=>{K(i),Q(p=>(p.set("level_id",i==null?void 0:i.levelId),p.set("level_name",i==null?void 0:i.levelType),p))},onClose:()=>{N({})},renderInput:s=>e.jsx(x,{...s,label:"Select Level",size:"small"})}),e.jsx(H,{startIcon:e.jsx(G,{}),variant:"contained",onClick:ae,children:Y?"":"   Payment History"})]}),e.jsx(k,{fullWidth:!0,options:O||[],loading:ee,disableClearable:!0,closeText:" ",noOptionsText:"No Student found",isOptionEqualToValue:(s,i)=>(i==null?void 0:i._id)===void 0||(i==null?void 0:i._id)===""||(s==null?void 0:s._id)===(i==null?void 0:i._id),getOptionLabel:s=>(s==null?void 0:s.fullName)||"",value:t,onChange:(s,i)=>N(i),renderInput:s=>e.jsx(x,{...s,placeholder:"Search for student"})})]}),e.jsxs(P,{container:!0,spacing:4,paddingY:1,bgcolor:"#fff",mt:1,children:[e.jsxs(P,{item:!0,xs:12,md:6,paddingY:6,children:[e.jsxs("div",{style:{display:"flex",gap:"4px",paddingBottom:"4px"},children:[e.jsx(De,{color:"secondary"}),e.jsx(o,{variant:"h6",children:"Personal Details"})]}),e.jsx(v,{}),e.jsxs(z,{elevation:1,sx:{marginTop:2,p:1},children:[e.jsx(l,{spacing:1,justifyContent:"center",alignItems:"center",paddingY:2,children:e.jsx(je,{src:(t==null?void 0:t.profile)===void 0||(t==null?void 0:t.profile)===""?null:t==null?void 0:t.profile,sx:{width:80,height:80}})}),e.jsxs(l,{spacing:2,paddingY:2,children:[e.jsx(x,{size:"small",label:"Student's Name",InputProps:{readOnly:!0},value:(t==null?void 0:t.fullName)||""}),e.jsx(x,{size:"small",value:(n==null?void 0:n.levelType)||d.get("level_name"),InputProps:{readOnly:!0}}),e.jsx(x,{type:"number",inputMode:"numeric",label:"Amount",size:"small",placeholder:"Enter Amount here",value:g,onChange:s=>Z(s.target.valueAsNumber),error:f.errors.amount,helperText:f.touched.amount&&f.errors.amount,InputProps:{startAdornment:e.jsx(B,{position:"start",children:"GHS"}),endAdornment:e.jsx(B,{position:"end",children:"p"})}}),e.jsx(fe,{disabled:m.isEmpty(t==null?void 0:t._id),size:"large",variant:"contained",startIcon:e.jsx(V,{}),loading:ie,onClick:f.handleSubmit,children:"Make Payment"})]})]})]}),e.jsxs(P,{item:!0,xs:12,md:6,paddingY:6,children:[e.jsxs("div",{style:{display:"flex",gap:"4px",paddingBottom:"4px"},children:[e.jsx(Oe,{color:"secondary"}),e.jsx(o,{variant:"h6",children:"Fees Details"})]}),e.jsx(v,{}),e.jsx(z,{elevation:1,sx:{marginTop:2},children:e.jsxs(l,{spacing:2,padding:2,children:[e.jsx(H,{variant:"outlined",size:"small",onClick:re,disabled:m.isEmpty(t==null?void 0:t._id),children:"Payment Details"}),e.jsxs(l,{direction:"row",justifyContent:"space-between",children:[e.jsx(o,{fontWeight:"bold",children:"Fees"}),!m.isEmpty(t==null?void 0:t._id)&&j===0?e.jsx(Ie,{label:"Full Payment",color:"success",size:"medium",sx:{color:"white"},icon:e.jsx(Pe,{})}):null]}),y.text&&e.jsxs(ve,{severity:y.severity,children:[y.text,y.text.startsWith("No")&&e.jsx(be,{to:"/fee/new",children:"Add New Fee"})]}),e.jsxs(l,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(o,{variant:"body2",children:"Fees For Term"}),e.jsx(o,{variant:"body2",children:m.isEmpty(t==null?void 0:t._id)?"GHS 0.00":h((n==null?void 0:n.fees)||0)})]}),e.jsxs(l,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(o,{variant:"body2",children:"Arreas "}),e.jsx(o,{variant:"body2",children:h(_)})]}),e.jsx(v,{flexItem:!0}),e.jsxs(l,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(o,{fontWeight:"bold",children:"Total "}),e.jsx(o,{variant:"body2",children:m.isEmpty(t==null?void 0:t._id)?"GHS 0.00":h(C)})]}),e.jsxs(l,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(o,{fontWeight:"bold",children:"Fees Paid "}),e.jsx(o,{variant:"body2",children:m.isEmpty(t==null?void 0:t._id)?"GHS 0.00":h(S)})]}),e.jsx(v,{flexItem:!0}),e.jsxs(l,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(o,{fontWeight:"bold",children:"Outstanding Fees "}),e.jsx(o,{variant:"body2",children:m.isEmpty(t==null?void 0:t._id)?"GHS 0.00":h(j)})]})]})})]})]})]})};export{st as default};
