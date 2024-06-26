import{O as N,j as e,r as x,S as z,u as I,h as D,b3 as se,i as R,C as O,F,b4 as ae,l as E,m as v,V as Q,b5 as G,q as H,b6 as y,T as o,aX as K,aI as f,n as Y,b7 as le,b8 as te,v as V,a0 as A,w as P,x as B,b9 as ne,D as k,ba as ie,t as _,bb as oe,bc as re,bd as de,K as L,W as ce,z as me,$,B as T,be as xe,bf as ue,av as q,bg as g,bh as he,bi as pe,bj as fe,g as je,G as be,bk as ge,J as we,bl as ye,a2 as Ce,E as Se}from"./index-c7bc4969.js";import{u as ve}from"./initialValues-3197b278.js";const Ue=N(e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"}),"CheckCircle"),Te=N(e.jsx("path",{d:"M3 3v18h18V3zm14 12.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z"}),"DisabledByDefault"),J=N(e.jsx("path",{d:"M3 17h18c.55 0 1 .45 1 1s-.45 1-1 1H3c-.55 0-1-.45-1-1s.45-1 1-1m-.5-4.43c.36.21.82.08 1.03-.28l.47-.82.48.83c.21.36.67.48 1.03.28.36-.21.48-.66.28-1.02l-.49-.84h.95c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H5.3l.47-.82c.21-.36.09-.82-.27-1.03-.36-.2-.82-.08-1.03.28L4 8.47l-.47-.82c-.21-.36-.67-.48-1.03-.28-.36.21-.48.67-.27 1.03l.47.82h-.95c-.41 0-.75.34-.75.75s.34.75.75.75h.95l-.48.83c-.2.36-.08.82.28 1.02m8 0c.36.21.82.08 1.03-.28l.47-.82.48.83c.21.36.67.48 1.03.28.36-.21.48-.66.28-1.02l-.48-.83h.95c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-.96l.47-.82c.21-.36.08-.82-.27-1.03-.36-.21-.82-.08-1.02.27l-.48.82-.47-.82c-.21-.36-.67-.48-1.02-.27-.36.21-.48.67-.27 1.03l.47.82h-.96c-.41-.01-.75.33-.75.74s.34.75.75.75h.95l-.48.83c-.2.36-.08.82.28 1.02M23 9.97c0-.41-.34-.75-.75-.75h-.95l.47-.82c.21-.36.08-.82-.27-1.03-.36-.21-.82-.08-1.02.27l-.48.83-.47-.82c-.21-.36-.67-.48-1.02-.27-.36.21-.48.67-.27 1.03l.47.82h-.95c-.42-.01-.76.33-.76.74s.34.75.75.75h.95l-.48.83c-.21.36-.08.82.28 1.02.36.21.82.08 1.03-.28l.47-.82.48.83c.21.36.67.48 1.03.28.36-.21.48-.66.28-1.02l-.48-.83h.95c.4-.01.74-.35.74-.76"}),"PasswordRounded");function Pe({open:j,setOpen:u}){const{schoolSessionDispatch:h}=x.useContext(z),b=I(),[c,r]=x.useState(null),[d,s]=x.useState(null),[C]=x.useState(ve),{mutateAsync:U}=D(se),S=(i,l)=>{i.dateofbirth=A(d).format("L"),U(i,{onSettled:()=>{b.invalidateQueries(["users"]),l.setSubmitting(!1)},onSuccess:a=>{h(P(a)),l.resetForm(),r(null),u(!1)},onError:a=>{h(B(a))}})};return e.jsxs(R,{open:j,onClose:()=>u(!1),fullWidth:!0,maxWidth:"md",children:[e.jsx(O,{title:"New User",onClose:()=>u(!1)}),e.jsx(F,{initialValues:C,onSubmit:S,enableReinitialize:!0,validationSchema:ae,children:({values:i,errors:l,touched:a,setFieldValue:t,handleChange:n,handleSubmit:m,isSubmitting:w})=>{const W=p=>{t("profile",p.target.files[0]),r(URL.createObjectURL(p.target.files[0]))};return e.jsx(E,{children:e.jsxs(v,{padding:2,spacing:1,children:[e.jsxs(v,{sx:{position:"relative"},children:[e.jsx(Q,{src:c,sx:{width:100,height:100,alignSelf:"center"}}),e.jsx(G,{handleImageUpload:W})]}),e.jsx(H,{variant:"body2",color:"primary.main",sx:{fontWeight:"bold"},children:"Personal information"}),e.jsxs(y,{children:[e.jsx(o,{label:"Fullname",type:"text",fullWidth:!0,size:"small",value:i.fullname,onChange:n("fullname"),error:!!(a.fullname&&l.fullname),helperText:a.fullname&&l.fullname}),e.jsx(o,{label:"Username",type:"text",fullWidth:!0,size:"small",value:i.username,onChange:n("username"),error:!!(a.username&&l.username),helperText:a.username&&l.username})]}),e.jsxs(y,{children:[e.jsx(K,{label:"Date of Birth",date:d,setDate:s,disableFuture:!0,touched:!!(a.dateofbirth&&l.dateofbirth),error:a.dateofbirth&&l.dateofbirth}),e.jsxs(o,{label:"Gender",select:!0,fullWidth:!0,size:"small",value:i.gender,onChange:n("gender"),error:!!(a.gender&&l.gender),helperText:a.gender&&l.gender,children:[e.jsx(f,{value:"male",children:"male"}),e.jsx(f,{value:"female",children:"female"})]}),e.jsxs(o,{label:"Role",select:!0,fullWidth:!0,size:"small",value:i.role,onChange:n("role"),error:!!(a.role&&l.role),helperText:a.role&&l.role,children:[e.jsx(f,{value:"administrator",children:"Administrator"}),e.jsx(f,{value:"director",children:"Director"}),e.jsx(f,{value:"secretary",children:"Secretary"}),e.jsx(f,{value:"coordinator",children:"Exams Coordinator"})]})]}),e.jsxs(y,{children:[e.jsx(o,{label:"Email",fullWidth:!0,size:"small",row:3,maxRows:3,value:i.email,onChange:n("email"),error:!!(a.email&&l.email),helperText:a.email&&l.email}),e.jsx(o,{label:"Telephone No.",inputMode:"tel",type:"tel",fullWidth:!0,size:"small",value:i.phonenumber,onChange:n("phonenumber"),error:!!(a.phonenumber&&l.phonenumber),helperText:a.phonenumber&&l.phonenumber})]}),e.jsx(o,{label:"Address",fullWidth:!0,size:"small",row:3,maxRows:3,value:i.address,onChange:n("address"),error:!!(a.address&&l.address),helperText:a.address&&l.address}),e.jsxs(y,{children:[e.jsx(Y,{freeSolo:!0,fullWidth:!0,size:"small",options:le,loadingText:"Please wait....",noOptionsText:"No Town available",getOptionLabel:p=>p||"",value:i.residence,onChange:(p,M)=>t("residence",M),renderInput:p=>e.jsx(o,{...p,label:"Residence",fullWidth:!0,size:"small",error:!!(a.residence&&l.residence),helperText:a.residence&&l.residence})}),e.jsx(Y,{freeSolo:!0,fullWidth:!0,size:"small",loadingText:"Please wait....",options:te,noOptionsText:"No Nationality available",getOptionLabel:p=>p||"",value:i.nationality,onChange:(p,M)=>t("nationality",M),renderInput:p=>e.jsx(o,{...p,label:"Nationality",fullWidth:!0,size:"small",error:!!(a.nationality&&l.nationality),helperText:a.nationality&&l.nationality})})]}),e.jsxs(y,{children:[e.jsx(o,{type:"password",label:"Password",fullWidth:!0,size:"small",value:i.password,onChange:n("password"),error:!!(a.password&&l.password),helperText:a.password&&l.password}),e.jsx(o,{type:"password",label:"Confirm Password",fullWidth:!0,size:"small",value:i.confirmPassword,onChange:n("confirmPassword"),error:!!(a.confirmPassword&&l.confirmPassword),helperText:a.confirmPassword&&l.confirmPassword})]}),e.jsx(v,{direction:"row",justifyContent:"flex-end",spacing:2,paddingY:2,children:e.jsx(V,{loading:w,variant:"contained",color:"primary",sx:{minWidth:{xs:100,sm:150}},onClick:m,children:"Save"})})]})})}})]})}const X=()=>{const j=I(),[u,h]=x.useState(null),[b,c]=x.useState(null),{schoolSessionState:{userEditData:r},schoolSessionDispatch:d}=x.useContext(z),s=r==null?void 0:r.data;x.useEffect(()=>{h(A(s==null?void 0:s.dateofbirth)),c(`/images/users/${s==null?void 0:s.profile}`)},[s]);const C=()=>{d({type:"editUser",payload:{open:!1,data:{}}})},{mutateAsync:U}=D(ne),S=(l,a)=>{delete l.profile,l.dateofbirth=A(u).format("L"),U(l,{onSettled:()=>{j.invalidateQueries(["users"]),a.setSubmitting(!1)},onSuccess:t=>{d(P(t)),C()},onError:t=>{d(B(t))}})},i=async l=>{var n;const a=(n=l.target)==null?void 0:n.files[0],t={_id:s==null?void 0:s._id,profile:a,type:"users"};try{const m=await oe(t);d(P(m)),c(URL.createObjectURL(a))}catch(m){d(B(m))}j.invalidateQueries(["users"])};return e.jsxs(R,{open:r.open,maxWidth:"md",fullWidth:!0,children:[e.jsx(O,{title:"Edit User",onClose:C}),e.jsx(k,{}),e.jsx(F,{initialValues:s,onSubmit:S,enableReinitialize:!0,validationSchema:ie,children:({values:l,errors:a,touched:t,handleChange:n,handleSubmit:m,isSubmitting:w})=>e.jsxs(e.Fragment,{children:[e.jsx(E,{children:e.jsxs(v,{padding:2,spacing:1,children:[e.jsxs(v,{sx:{position:"relative"},children:[e.jsx(Q,{srcSet:b,sx:{width:100,height:100,alignSelf:"center"}}),e.jsx(G,{handleImageUpload:i})]}),e.jsx(H,{variant:"body2",color:"primary.main",sx:{fontWeight:"bold"},children:"Personal information"}),e.jsxs(y,{children:[e.jsx(o,{label:"Fullname",type:"text",fullWidth:!0,size:"small",value:l.fullname||"",onChange:n("fullname"),error:!!(t.fullname&&a.fullname),helperText:t.fullname&&a.fullname}),e.jsx(o,{label:"Username",fullWidth:!0,size:"small",value:l.username||"",onChange:n("username"),error:!!(t.username&&a.username),helperText:t.username&&a.username})]}),e.jsxs(y,{children:[e.jsx(K,{label:"Date of Birth",date:u,setDate:h,disableFuture:!0,error:!!(t.dateofbirth&&a.dateofbirth),helperText:t.dateofbirth&&a.dateofbirth}),e.jsxs(o,{label:"Gender",select:!0,fullWidth:!0,size:"small",value:l.gender||"",onChange:n("gender"),error:!!(t.gender&&a.gender),helperText:t.gender&&a.gender,children:[e.jsx(f,{value:"male",children:"male"}),e.jsx(f,{value:"female",children:"female"})]}),e.jsxs(o,{label:"Role",select:!0,fullWidth:!0,size:"small",value:l.role||"",onChange:n("role"),error:!!(t.role&&a.role),helperText:t.role&&a.role,children:[e.jsx(f,{value:"administrator",children:"Administrator"}),e.jsx(f,{value:"director",children:"Director"}),e.jsx(f,{value:"secretary",children:"Secretary"}),e.jsx(f,{value:"coordinator",children:"Exams Coordinator"})]})]}),e.jsxs(y,{children:[e.jsx(o,{label:"Email",fullWidth:!0,size:"small",row:3,maxRows:3,value:l.email||"",onChange:n("email"),error:!!(t.email&&a.email),helperText:t.email&&a.email}),e.jsx(o,{label:"Telephone No.",inputMode:"tel",type:"tel",fullWidth:!0,size:"small",value:l.phonenumber||"",onChange:n("phonenumber"),error:!!(t.phonenumber&&a.phonenumber),helperText:t.phonenumber&&a.phonenumber})]}),e.jsx(o,{label:"Address",fullWidth:!0,size:"small",row:3,maxRows:3,value:l.address||"",onChange:n("address"),error:!!(t.address&&a.address),helperText:t.address&&a.address}),e.jsxs(y,{children:[e.jsx(o,{label:"Place of Birth",type:"text",fullWidth:!0,size:"small",value:l.residence||"",onChange:n("residence"),error:!!(t.residence&&a.residence),helperText:t.residence&&a.residence}),e.jsx(o,{label:"Nationality",fullWidth:!0,size:"small",value:l.nationality||"",onChange:n("nationality"),error:!!(t.nationality&&a.nationality),helperText:t.nationality&&a.nationality})]})]})}),e.jsx(_,{children:e.jsx(V,{loading:w,variant:"contained",color:"primary",sx:{minWidth:{xs:100,sm:150}},onClick:m,children:"Save Changes"})})]})})]})};X.propTypes={};function Be({open:j,setOpen:u}){const h=I(),{schoolSessionState:{userViewData:b},schoolSessionDispatch:c}=x.useContext(z),r=b==null?void 0:b.data,d={id:r==null?void 0:r._id,password:"",confirmPassword:""},{mutateAsync:s,isLoading:C}=D({mutationFn:re}),U=(i,l)=>{delete i.confirmPassword,L.fire({title:"Updating Password",text:"Do you wish to proceed?",showCancelButton:!0,allowOutsideClick:!1}).then(({isConfirmed:a,isDenied:t,isDismissed:n})=>{a&&s(i,{onSuccess:m=>{h.invalidateQueries(["users"]),c(P(m)),l.setSubmitting(!1),S(),c({type:"viewUser",payload:{open:!1,data:{}}})},onError:m=>{c(B(m))}}),n&&l.setSubmitting(!1)})},S=()=>u(!1);return e.jsxs(R,{open:j,maxWidth:"xs",fullWidth:!0,children:[e.jsx(O,{title:"Password Reset",onClose:S}),e.jsx(F,{initialValues:d,onSubmit:U,enableReinitialize:!0,validationSchema:de,children:({values:i,errors:l,touched:a,handleChange:t,handleSubmit:n})=>e.jsxs(e.Fragment,{children:[e.jsx(E,{children:e.jsxs(v,{padding:2,spacing:1,children:[e.jsx(o,{type:"password",label:"Password",fullWidth:!0,size:"small",autoComplete:"no",value:i.password,onChange:t("password"),error:!!(a.password&&l.password),helperText:a.password&&l.password}),e.jsx(o,{type:"password",label:"Confirm Password",fullWidth:!0,size:"small",value:i.confirmPassword,onChange:t("confirmPassword"),error:!!(a.confirmPassword&&l.confirmPassword),helperText:a.confirmPassword&&l.confirmPassword})]})}),e.jsx(_,{children:e.jsx(V,{loading:C,variant:"contained",color:"primary",onClick:n,startIcon:e.jsx(J,{}),children:"Update Password"})})]})})]})}const Z=()=>{const j=I(),[u,h]=x.useState(null),[b,c]=x.useState(null),{schoolSessionState:{userViewData:r},schoolSessionDispatch:d}=x.useContext(z),s=r==null?void 0:r.data;x.useEffect(()=>{h(`/images/users/${s==null?void 0:s.profile}`)},[s]);const{mutateAsync:C}=D({mutationFn:pe}),U=()=>{L.fire({title:s!=null&&s.active?"Do you want to disable this account?":"Do you want to enable this account?",text:s!=null&&s.active?"Disabling Account":"Enabling Account",showCancelButton:!0}).then(m=>{if(m.isConfirmed){const w={id:s==null?void 0:s._id,active:!s.active};C(w,{onSuccess:W=>{j.invalidateQueries(["users"]),d(P(W)),i()},onError:W=>{d(B(W))}})}})},S=()=>{d({type:"editUser",payload:{open:!0,data:s}}),i()},i=()=>{d({type:"viewUser",payload:{open:!1,data:{}}})},{mutateAsync:l}=D({mutationFn:fe}),a=()=>{L.fire({title:"Deleting User",text:"Do you want to delete?",showCancelButton:!0}).then(m=>{m.isConfirmed&&l(s==null?void 0:s._id,{onSuccess:w=>{j.invalidateQueries(["users"]),d(P(w)),i()},onError:w=>{d(B(w))}})})},t=()=>{c(!0)},n=()=>{d({type:"sendQuickMessage",payload:{open:!0,data:{email:s==null?void 0:s.email,phonenumber:s==null?void 0:s.phonenumber}}})};return e.jsxs(e.Fragment,{children:[e.jsxs(R,{open:r.open,maxWidth:"sm",fullWidth:!0,children:[e.jsx(me,{children:"User Information"}),e.jsx(E,{sx:{display:"flex",justifyContent:"center"},children:e.jsxs($,{children:[e.jsxs($,{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",paddingY:1,gap:1,children:[e.jsx(Q,{srcSet:u,sx:{width:80,height:80}}),e.jsx(T,{size:"small",startIcon:e.jsx(xe,{}),onClick:n,children:"Send Message"}),e.jsxs(v,{direction:"row",spacing:2,flexWrap:"wrap",children:[e.jsx(T,{size:"small",endIcon:e.jsx(J,{}),onClick:t,children:"Update Password"}),e.jsx(T,{size:"small",endIcon:e.jsx(ue,{}),onClick:S,children:"Edit"})]})]}),e.jsx(k,{flexItem:!0,children:e.jsx(q,{label:"Personal Information",color:"primary"})}),e.jsx(g,{label:"Name",text:`${s==null?void 0:s.fullname}`}),e.jsx(g,{label:"Username",text:`${s==null?void 0:s.username}`}),e.jsx(g,{label:"Role",text:s==null?void 0:s.role}),e.jsx(g,{label:"Date Of Birth",tex:!0,text:A(new Date(s==null?void 0:s.dateofbirth)).format("Do MMMM, YYYY.")}),e.jsx(g,{label:"Gender",text:s==null?void 0:s.gender}),e.jsx(g,{label:"Email Address",text:s==null?void 0:s.email}),e.jsx(g,{label:"Telephone No.",text:s==null?void 0:s.phonenumber}),e.jsx(g,{label:"Address",text:s==null?void 0:s.address}),e.jsx(g,{label:"Residence",text:s==null?void 0:s.residence}),e.jsx(g,{label:"Nationality",text:s==null?void 0:s.nationality}),e.jsx(k,{flexItem:!0,children:e.jsx(q,{label:"Account Status",color:"primary"})}),e.jsx(g,{label:"Account",text:s!=null&&s.active?"Active":"Disabled"}),e.jsxs(v,{direction:"row",spacing:2,flexWrap:"wrap",justifyContent:"flex-end",children:[e.jsx(T,{size:"small",color:s!=null&&s.active?"error":"primary",endIcon:s!=null&&s.active?e.jsx(Te,{}):e.jsx(Ue,{}),onClick:U,children:s!=null&&s.active?"Disable Account":"Enable Account"}),e.jsx(T,{color:"error",size:"small",endIcon:e.jsx(he,{}),onClick:a,children:"Delete"})]})]})}),e.jsx(_,{children:e.jsx(T,{onClick:i,children:"Close"})})]}),e.jsx(Be,{open:b,setOpen:c})]})};Z.propTypes={};const We=ce.memo(Z),ee="/assets/users_ico-ad434081.svg";function De(){const{schoolSessionDispatch:j}=x.useContext(z),[u,h]=x.useState(!1),b=r=>{j({type:"viewUser",payload:{open:!0,data:r}})},c=je({queryKey:["users"],queryFn:()=>ye()});return e.jsxs(e.Fragment,{children:[e.jsx(be,{isLoading:c.isLoading,title:"Users",icon:ee,search:!0,columns:ge,data:c.data,actions:[],showAddButton:!0,addButtonText:"New User",addButtonImg:we.sms,addButtonMessage:"No Users available !",onAddButtonClicked:()=>h(!0),onRowClick:b,showRowShadow:!0,handleRefresh:c==null?void 0:c.refetch}),e.jsx(We,{}),e.jsx(Pe,{open:u,setOpen:h}),e.jsx(X,{})]})}function Ie(){return e.jsxs(Ce,{children:[e.jsx(Se,{title:"Administrators & Users",subtitle:"Manage information and details of users",img:ee,color:"text.main"}),e.jsx(De,{})]})}export{Ie as default};
