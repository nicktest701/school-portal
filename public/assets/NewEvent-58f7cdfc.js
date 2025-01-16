import{b as z,r as o,S as F,u as D,d as P,j as e,C as L,e as N,y as I,a7 as V,l as p,T as c,F as W,A as U,m as q,B as g,a8 as M,E as O,g as Q,h as _,a9 as H,_ as K}from"./index-ce442eb1.js";import"./index-6da26ac2.js";import{u as Y,A as G}from"./index-05708911.js";import{E as J}from"./data-25edd064.js";import{B as X}from"./Back-78662289.js";import{T as Z}from"./TextEditor-82c69c4c.js";import{A as $}from"./Autocomplete-87c4b1e1.js";import"./Chip-15117b24.js";function re(){const b=z(),{schoolSessionDispatch:u}=o.useContext(F),m=D(),[v,j]=o.useState(""),[x,f]=o.useState(""),[d,h]=o.useState(""),[l,y]=o.useState(""),[i,S]=o.useState(null),{getRootProps:E,getInputProps:C,open:T}=Y({noClick:!0,noKeyboard:!0,maxFiles:1,accept:{"image/*":[".jpeg",".png",".webp"]},maxSize:2e5,multiple:!1,onDrop:n=>{if(!K.isEmpty(n)){const t=new FileReader;t.onload=function(a){const r=a.target.result;S(r)},t.readAsDataURL(n[0])}}});o.useEffect(()=>{},[l]);const w={type:v,title:x,description:l,album:i,caption:d},{mutateAsync:A,isLoading:B}=P({mutationFn:H}),k=n=>{A(n,{onSettled:()=>{b.invalidateQueries(["events"])},onSuccess:()=>{u(Q("Event Created")),m("/events")},onError:t=>{u(_(t))}})};return e.jsxs(L,{children:[e.jsx(X,{to:"/events",color:"primary.main"}),e.jsx(N,{title:"New Events",subtitle:" Send single and bulk SMS to students and parents",color:"text.main",backColor:"#012e54"}),e.jsx(I,{initialValues:w,onSubmit:k,enableReinitialize:!0,validationSchema:V,children:({values:n,errors:t,touched:a,handleSubmit:r})=>e.jsxs(p,{px:2,py:4,spacing:4,bgcolor:"#fff",children:[e.jsx($,{freeSolo:!0,fullWidth:!0,size:"small",options:J,loadingText:"Please wait....",noOptionsText:"No Event available",getOptionLabel:s=>s||"",value:n==null?void 0:n.type,onChange:(s,R)=>j(R),renderInput:s=>e.jsx(c,{...s,label:"Select Event Type",fullWidth:!0,size:"small",error:!!(a.type&&t.type),helperText:a.type&&t.type})}),e.jsx(c,{label:"Event Title",fullWidth:!0,size:"small",row:3,maxRows:3,value:x,onChange:s=>f(s.target.value),error:!!(a.title&&t.title),helperText:a.title&&t.title}),e.jsx(c,{label:"Event Caption",fullWidth:!0,size:"small",row:3,maxRows:3,value:d,onChange:s=>h(s.target.value),error:!!(a.caption&&t.caption),helperText:a.caption&&t.caption}),e.jsx(Z,{label:"Description",value:l,setValue:y,touched:a==null?void 0:a.description,errors:t==null?void 0:t.description}),e.jsxs("div",{children:[e.jsx(W,{style:{color:a.album&&t.album?"#B72136":"var(--primary)"},children:"Event Photo/Album"}),e.jsxs(p,{...E({className:"dropzone"}),sx:{borderRadius:1,border:a.album&&t.album?"1px solid #B72136":"1px dotted lightgray",py:8,px:4},children:[e.jsx(U,{variant:"square",src:i,sx:{width:{xs:i===null?120:"100%"},height:{xs:i===null?120:"100%"},objectFit:"contain",alignSelf:"center"}}),e.jsx("input",{...C()}),e.jsx(q,{textAlign:"center",paragraph:!0,children:"Drag & drop your photo here"}),e.jsx(g,{variant:"outlined",onClick:T,startIcon:e.jsx(G,{}),children:"Upload Image"})]}),a.album&&t.album&&e.jsx(M,{sx:{color:"#B72136"},children:t.album})]}),e.jsxs(p,{direction:"row",justifyContent:"flex-end",spacing:2,children:[e.jsx(g,{onClick:()=>m("/events"),children:"Cancel"}),e.jsx(O,{loading:B,variant:"contained",color:"primary",onClick:r,children:"Create Event"})]})]})})]})}export{re as default};
