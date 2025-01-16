import{K as S,j as e,u as ne,ai as ae,a as re,r,a0 as oe,S as le,b as de,c as O,d as ce,fs as me,e as pe,k as l,T as h,B as H,al as F,l as o,D as f,bE as I,A as ue,y as he,_ as m,J as xe,aG as ye,f as ge,g as je,h as be}from"./index-DrgqF6h7.js";import{C as fe}from"./Check-CEGAxChF.js";import{b as Se}from"./feeAPI-bCYYUBpy.js";import{e as Ce,p as ve}from"./currentFeeAPI-Dph8Aqgk.js";import{c as x}from"./currencyFormatter-DjBDW3hY.js";import{E as Pe}from"./images-B5fNBSni.js";import{u as _e}from"./useLevelById-C5Sw-_pl.js";import{u as Fe}from"./index-_n9xtSlI.js";import{A as z}from"./Autocomplete-D4vPEd6T.js";import{I as B}from"./InputAdornment-EcTjtcuD.js";import{C as we}from"./Chip-BcLQNplL.js";const Ae=S(e.jsx("path",{d:"M13.26 3C8.17 2.86 4 6.95 4 12H2.21c-.45 0-.67.54-.35.85l2.79 2.8c.2.2.51.2.71 0l2.79-2.8c.31-.31.09-.85-.36-.85H6c0-3.9 3.18-7.05 7.1-7 3.72.05 6.85 3.18 6.9 6.9.05 3.91-3.1 7.1-7 7.1-1.61 0-3.1-.55-4.28-1.48-.4-.31-.96-.28-1.32.08-.42.42-.39 1.13.08 1.49C9 20.29 10.91 21 13 21c5.05 0 9.14-4.17 9-9.26-.13-4.69-4.05-8.61-8.74-8.74m-.51 5c-.41 0-.75.34-.75.75v3.68c0 .35.19.68.49.86l3.12 1.85c.36.21.82.09 1.03-.26.21-.36.09-.82-.26-1.03l-2.88-1.71v-3.4c0-.4-.34-.74-.75-.74"}),"HistoryRounded"),Te=S(e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16"}),"MonetizationOn"),Me=S(e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1.41 16.09v.58c0 .73-.6 1.33-1.33 1.33h-.01c-.73 0-1.33-.6-1.33-1.33v-.6c-1.33-.28-2.51-1.01-3.01-2.24-.23-.55.2-1.16.8-1.16h.24c.37 0 .67.25.81.6.29.75 1.05 1.27 2.51 1.27 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21v-.6c0-.73.6-1.33 1.33-1.33h.01c.73 0 1.33.6 1.33 1.33v.62c1.38.34 2.25 1.2 2.63 2.26.2.55-.22 1.13-.81 1.13h-.26c-.37 0-.67-.26-.77-.62-.23-.76-.86-1.25-2.12-1.25-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.02 1.83-1.39 2.83-3.13 3.16"}),"MonetizationOnRounded"),Ne=S(e.jsx("path",{d:"M18.39 14.56C16.71 13.7 14.53 13 12 13s-4.71.7-6.39 1.56C4.61 15.07 4 16.1 4 17.22V20h16v-2.78c0-1.12-.61-2.15-1.61-2.66M9.78 12h4.44c1.21 0 2.14-1.06 1.98-2.26l-.32-2.45C15.57 5.39 13.92 4 12 4S8.43 5.39 8.12 7.29L7.8 9.74c-.16 1.2.77 2.26 1.98 2.26"}),"Person2Sharp"),Ye=()=>{const C=ne(),D=ae(),G=Fe(D.breakpoints.down("sm")),[d,V]=re(),{user:p,userState:{session:a}}=r.useContext(oe),{schoolSessionDispatch:w}=r.useContext(le),A=de(),[y,T]=r.useState({severity:"",text:""}),[t,M]=r.useState({_id:"",fullName:"",profile:""}),[n,W]=r.useState({levelId:"",levelType:"",feesId:"",fees:0}),[N,Y]=r.useState(0),[v,R]=r.useState(0),[P,q]=r.useState(0),[E,Q]=r.useState(0),[g,$]=r.useState(0),c=O({queryKey:["all-level-fees",a.sessionId,a.termId],queryFn:()=>Se({session:a.sessionId,term:a.termId}),enabled:!!(a!=null&&a.sessionId)&&!!(a!=null&&a.termId)}),{students:k,levelLoading:K}=_e(n==null?void 0:n.levelId);O(["student-fees",t==null?void 0:t._id,d.get("level_id")],()=>Ce({session:a.sessionId,term:a.termId,student:t==null?void 0:t._id,level:d.get("level_id")}),{enabled:!!(t!=null&&t._id)&&!!d.get("level_id"),onSuccess:s=>{var i;Q(s==null?void 0:s.totalAmountPaid),q(s==null?void 0:s.totalArreas),R(((i=s==null?void 0:s.current)==null?void 0:i.amountPaid)||0),Y(s==null?void 0:s.totalFees)}});const _=r.useMemo(()=>(n==null?void 0:n.fees)+P,[P,n==null?void 0:n.fees]),j=r.useMemo(()=>_-v,[v,_]),J=r.useMemo(()=>{const s=N-(E+Number(g));return s<0?{date:new Date().toISOString(),paid:j,outstanding:0,balance:Math.abs(s),issuer:p==null?void 0:p.fullname}:{date:new Date().toISOString(),paid:g,outstanding:s,balance:0,issuer:p==null?void 0:p.fullname}},[g,j,E,N]),{mutateAsync:U,isLoading:L}=ce({mutationFn:ve});function X(s,i){T({severity:"info",text:""});const u={session:a.sessionId,term:a.termId,level:n.levelId,student:t==null?void 0:t._id,fee:n==null?void 0:n.feesId,payment:[J]};ge.fire({title:"Making Payment",text:"Do you want to proceed with the payment?",showCancelButton:!0}).then(({isConfirmed:te,isDenied:se,isDismissed:ie})=>{te&&U(u,{onSettled:()=>{A.invalidateQueries(["student-fees"]),A.invalidateQueries(["current-fees-summary"]),i.setSubmitting(!1)},onSuccess:async()=>{w(je("Payment Done!")),C("/fee/print",{state:{feePrintData:{fullName:t.fullName,levelType:n==null?void 0:n.levelType,payment:u.payment[0]}}})},onError:()=>{w(be("An unknown error has occurred!"))}}),(se||ie)&&(T({severity:"info",text:""}),i.setSubmitting(!1))})}const b=me({initialValues:{amount:{}},enableReinitialize:!0,onSubmit:X}),Z=()=>{C(`/fee/payment/student?level_id=${d.get("level_id")}&_id=${t==null?void 0:t._id}`,{state:{prevPath:`/fee/payment?level_id=${d.get("level_id")}&level_name=${d.get("level_name")}`}})},ee=()=>C("/fee/payment/history");return e.jsxs(e.Fragment,{children:[e.jsx(pe,{title:"Fees Payment",subtitle:"Access,manage and control payment of school fees",img:Pe.assessment,color:"primary.main"}),e.jsxs(l,{paddingY:4,spacing:2,children:[e.jsxs(l,{direction:"row",justifyContent:{xs:"center",sm:"space-between"},alignItems:"center",gap:2,children:[e.jsx(z,{sx:{width:250},fullWidth:!0,options:c!=null&&c.data?c.data:[],loading:c==null?void 0:c.isLoading,disableClearable:!0,closeText:" ",noOptionsText:"No Level Available",isOptionEqualToValue:(s,i)=>i.levelId===void 0||i.levelId===""||s.levelId===i.levelId,getOptionLabel:s=>s.levelType||"",value:n,onChange:(s,i)=>{W(i),V(u=>(u.set("level_id",i==null?void 0:i.levelId),u.set("level_name",i==null?void 0:i.levelType),u))},onClose:()=>{M({})},renderInput:s=>e.jsx(h,{...s,label:"Select Level",size:"small"})}),e.jsx(H,{startIcon:e.jsx(Ae,{}),variant:"contained",onClick:ee,children:G?"":"   Payment History"})]}),e.jsx(z,{fullWidth:!0,options:k||[],loading:K,disableClearable:!0,closeText:" ",noOptionsText:"No Student found",isOptionEqualToValue:(s,i)=>(i==null?void 0:i._id)===void 0||(i==null?void 0:i._id)===""||(s==null?void 0:s._id)===(i==null?void 0:i._id),getOptionLabel:s=>(s==null?void 0:s.fullName)||"",value:t,onChange:(s,i)=>M(i),renderInput:s=>e.jsx(h,{...s,placeholder:"Search for student"})})]}),e.jsxs(F,{container:!0,spacing:4,paddingY:1,bgcolor:"#fff",mt:1,children:[e.jsxs(F,{item:!0,xs:12,md:6,paddingY:6,children:[e.jsxs("div",{style:{display:"flex",gap:"4px",paddingBottom:"4px"},children:[e.jsx(Ne,{color:"secondary"}),e.jsx(o,{variant:"h6",children:"Personal Details"})]}),e.jsx(f,{}),e.jsxs(I,{elevation:1,sx:{marginTop:2,p:1},children:[e.jsx(l,{spacing:1,justifyContent:"center",alignItems:"center",paddingY:2,children:e.jsx(ue,{src:(t==null?void 0:t.profile)===void 0||(t==null?void 0:t.profile)===""?null:t==null?void 0:t.profile,sx:{width:80,height:80}})}),e.jsxs(l,{spacing:2,paddingY:2,children:[e.jsx(h,{size:"small",label:"Student's Name",InputProps:{readOnly:!0},value:(t==null?void 0:t.fullName)||""}),e.jsx(h,{size:"small",value:(n==null?void 0:n.levelType)||d.get("level_name"),InputProps:{readOnly:!0}}),e.jsx(h,{type:"number",inputMode:"numeric",label:"Amount",size:"small",placeholder:"Enter Amount here",value:g,onChange:s=>$(s.target.valueAsNumber),error:b.errors.amount,helperText:b.touched.amount&&b.errors.amount,InputProps:{startAdornment:e.jsx(B,{position:"start",children:"GHS"}),endAdornment:e.jsx(B,{position:"end",children:"p"})}}),e.jsx(he,{disabled:m.isEmpty(t==null?void 0:t._id),size:"large",variant:"contained",startIcon:e.jsx(Me,{}),loading:L,onClick:b.handleSubmit,children:"Make Payment"})]})]})]}),e.jsxs(F,{item:!0,xs:12,md:6,paddingY:6,children:[e.jsxs("div",{style:{display:"flex",gap:"4px",paddingBottom:"4px"},children:[e.jsx(Te,{color:"secondary"}),e.jsx(o,{variant:"h6",children:"Fees Details"})]}),e.jsx(f,{}),e.jsx(I,{elevation:1,sx:{marginTop:2},children:e.jsxs(l,{spacing:2,padding:2,children:[e.jsx(H,{variant:"outlined",size:"small",onClick:Z,disabled:m.isEmpty(t==null?void 0:t._id),children:"Payment Details"}),e.jsxs(l,{direction:"row",justifyContent:"space-between",children:[e.jsx(o,{fontWeight:"bold",children:"Fees"}),!m.isEmpty(t==null?void 0:t._id)&&j===0?e.jsx(we,{label:"Full Payment",color:"success",size:"medium",sx:{color:"white"},icon:e.jsx(fe,{})}):null]}),y.text&&e.jsxs(xe,{severity:y.severity,children:[y.text,y.text.startsWith("No")&&e.jsx(ye,{to:"/fee/new",children:"Add New Fee"})]}),e.jsxs(l,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(o,{variant:"body2",children:"Fees For Term"}),e.jsx(o,{variant:"body2",children:m.isEmpty(t==null?void 0:t._id)?"GHS 0.00":x((n==null?void 0:n.fees)||0)})]}),e.jsxs(l,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(o,{variant:"body2",children:"Arreas "}),e.jsx(o,{variant:"body2",children:x(P)})]}),e.jsx(f,{flexItem:!0}),e.jsxs(l,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(o,{fontWeight:"bold",children:"Total "}),e.jsx(o,{variant:"body2",children:m.isEmpty(t==null?void 0:t._id)?"GHS 0.00":x(_)})]}),e.jsxs(l,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(o,{fontWeight:"bold",children:"Fees Paid "}),e.jsx(o,{variant:"body2",children:m.isEmpty(t==null?void 0:t._id)?"GHS 0.00":x(v)})]}),e.jsx(f,{flexItem:!0}),e.jsxs(l,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[e.jsx(o,{fontWeight:"bold",children:"Outstanding Fees "}),e.jsx(o,{variant:"body2",children:m.isEmpty(t==null?void 0:t._id)?"GHS 0.00":x(j)})]})]})})]})]})]})};export{Ye as default};
