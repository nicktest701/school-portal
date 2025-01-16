import{q as T,j as e,r,S as k,d as C,y as V,l as B,m as p,c6 as R,F as E,R as L,J as c,P as m,T as d,E as F,fc as I,Q as q,fd as W,g as w,h as z,fe as D,$ as M,e as Q,D as A}from"./index-ce442eb1.js";import{q as G,b as N}from"./initialValues-876203b9.js";import{T as H}from"./TextEditor-82c69c4c.js";import{B as J}from"./Back-78662289.js";import{T as Y,a as $,b as v,c as y}from"./TabPanel-47a179c1.js";import"./index-6da26ac2.js";const K=T(e.jsx("path",{d:"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-.4 4.25-6.54 4.09c-.65.41-1.47.41-2.12 0L4.4 8.25c-.25-.16-.4-.43-.4-.72 0-.67.73-1.07 1.3-.72L12 11l6.7-4.19c.57-.35 1.3.05 1.3.72 0 .29-.15.56-.4.72"}),"MailRounded"),O=T(e.jsx("path",{d:"M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-2 12H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z"}),"Message"),U=()=>{const{schoolSessionDispatch:i}=r.useContext(k),[t,x]=r.useState("sms"),o=r.useMemo(()=>G(t),[t]),{mutateAsync:b,isLoading:S}=C({mutationFn:W}),g=(n,a)=>{n.rate="quick",b(n,{onSettled:()=>{a.setSubmitting(!1)},onSuccess:s=>{i(w(s))},onError:s=>{i(z(s))}})};return e.jsx(V,{initialValues:o.init,onSubmit:g,validationSchema:o.val,enableReinitialize:!0,children:({values:n,errors:a,touched:s,isSubmitting:l,handleChange:u,handleSubmit:h})=>e.jsxs(B,{spacing:3,justifyContent:"flex-start",alignItems:"flex-start",py:3,children:[e.jsx(p,{variant:"h5",color:"primary.main",bgcolor:"lightgray",p:1,sx:{fontWeight:"bold",width:"100%"},paragraph:!0,children:"Quick Message"}),e.jsxs(R,{children:[e.jsx(E,{id:"message-type",children:"Select Type"}),e.jsxs(L,{row:!0,"aria-labelledby":"message-type",name:"message-type",value:t,onChange:(f,j)=>x(j),children:[e.jsx(c,{value:"sms",control:e.jsx(m,{}),label:"SMS"}),e.jsx(c,{value:"email",control:e.jsx(m,{}),label:"Email"}),e.jsx(c,{value:"both",control:e.jsx(m,{}),label:"Both"})]})]}),(t==="sms"||t==="both")&&e.jsx(d,{label:"Recipient's Phone No",required:!0,inputMode:"tel",type:"tel",fullWidth:!0,value:n.phonenumber||"",onChange:u("phonenumber"),hidden:t==="email",error:!!(s.phonenumber&&a.phonenumber),helperText:s.phonenumber&&a.phonenumber}),(t==="email"||t==="both")&&e.jsx(d,{label:"Recipient's Email Address",inputMode:"email",type:"email",required:!0,fullWidth:!0,hidden:t==="sms",value:n.email||"",onChange:u("email"),error:!!(s.email&&a.email),helperText:s.email&&a.email}),e.jsx(d,{label:"Message Title",required:!0,fullWidth:!0,value:n.title||"",onChange:u("title"),error:!!(s.title&&a.title),helperText:s.title&&a.title}),e.jsx(H,{label:"Message",value:n.message,setValue:u("message"),touched:s==null?void 0:s.message,errors:a==null?void 0:a.message}),e.jsx(F,{loading:l,variant:"contained",onClick:h,endIcon:e.jsx(I,{}),sx:{alignSelf:"flex-end"},children:"Send Message"}),S&&e.jsx(q,{value:"Sending Message..."})]})})},X=()=>{const{schoolSessionDispatch:i}=r.useContext(k),[t,x]=r.useState("sms"),[o,b]=r.useState("students"),{mutateAsync:S,isLoading:g}=C(W),n=(a,s)=>{a.rate="bulk",a.group=o,a.type=t,S(a,{onSettled:()=>{s.setSubmitting(!1)},onSuccess:l=>{i(w(l))},onError:l=>{i(z(l))}})};return e.jsxs(e.Fragment,{children:[e.jsx(V,{initialValues:N,onSubmit:n,validationSchema:D,enableReinitialize:!0,children:({values:a,errors:s,touched:l,isSubmitting:u,handleChange:h,handleSubmit:f})=>e.jsxs(B,{spacing:3,justifyContent:"center",alignItems:"flex-start",paddingY:3,children:[e.jsx(p,{variant:"h5",color:"primary.main",bgcolor:"lightgray",p:1,sx:{fontWeight:"bold",width:"100%"},paragraph:!0,children:"Bulk Messages"}),e.jsxs(R,{children:[e.jsx(E,{id:"message-type",children:"Select Type"}),e.jsxs(L,{row:!0,"aria-labelledby":"message-type",name:"message-type",value:t,onChange:(j,P)=>x(P),children:[e.jsx(c,{value:"sms",control:e.jsx(m,{}),label:"SMS"}),e.jsx(c,{value:"email",control:e.jsx(m,{}),label:"Email"}),e.jsx(c,{value:"both",control:e.jsx(m,{}),label:"Both"})]})]}),e.jsxs(d,{label:"Select Group",select:!0,fullWidth:!0,value:o,onChange:j=>b(j.target.value),children:[e.jsx(M,{value:"students",children:"Students"}),e.jsx(M,{value:"parents",children:"Parents"}),e.jsx(M,{value:"teachers",children:"Teachers"})]}),e.jsx(d,{label:"Message Title",required:!0,fullWidth:!0,value:a.title||"",onChange:h("title"),error:!!(l.title&&s.title),helperText:l.title&&s.title}),e.jsx(H,{label:"Message",value:a.message,setValue:h("message"),touched:l==null?void 0:l.message,errors:s==null?void 0:s.message}),e.jsx(F,{loading:u||g,variant:"contained",onClick:f,endIcon:e.jsx(I,{}),sx:{alignSelf:"flex-end"},children:"Send Message"})]})}),g&&e.jsx(q,{value:"Sending Message..."})]})},le=()=>{const[i,t]=r.useState("1");return e.jsxs(e.Fragment,{children:[e.jsx(J,{color:"#012e54"}),e.jsx(p,{variant:"h5",color:"secondary"}),e.jsx(p,{}),e.jsx(Q,{title:"SMS & Mails",subtitle:"Send single and bulk SMS amd emails to students,teachers, parents,etc",icon:e.jsx(K,{color:"inherit",sx:{width:50,height:50}}),color:"primary.main"}),e.jsx(A,{flexItem:!0}),e.jsxs(Y,{value:i,children:[e.jsxs($,{onChange:(x,o)=>t(o),centered:!0,scrollButtons:"auto",children:[e.jsx(v,{label:"Quick Message",value:"1",icon:e.jsx(O,{}),iconPosition:"start"}),e.jsx(v,{label:"Bulk Messages",value:"2",icon:null})]}),e.jsx(y,{value:"1",children:e.jsx(U,{})}),e.jsx(y,{value:"2",children:e.jsx(X,{})})]})]})};export{le as default};