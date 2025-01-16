import{r as m,S as z,b as P,d as L,j as e,e as N,o as A,w as I,an as R,M as U,k as x,A as k,l as O,T as s,$ as n,y as D,Q as E,ao as F,m as v,g as M,h as Q}from"./index-DrgqF6h7.js";import{C as $}from"./CustomDatePicker-D2bLCilT.js";import{C as o}from"./CustomFormControl-BOFleHo6.js";import{C as V}from"./CustomImageChooser-B_xkuEqQ.js";import{u as Y}from"./initialValues-D0lDlXZC.js";import{T as q,N as G}from"./nationality-Dhsqpti8.js";import{B as H}from"./Back-CADpxW16.js";import{A as h}from"./Autocomplete-D4vPEd6T.js";import"./AdapterMoment-Dv21LUiO.js";import"./index-_n9xtSlI.js";import"./useThemeProps-DLRF2U3R.js";import"./generateUtilityClasses-CIQngnWt.js";import"./createTheme-xb4osIQ4.js";import"./createStyled-CRj7xEq5.js";import"./InputAdornment-EcTjtcuD.js";import"./DialogActions-Cx2GHHEW.js";import"./ListItem-yCsexoBs.js";import"./ListItemSecondaryAction-mmiMbVqP.js";import"./listItemButtonClasses-CLhmtlXH.js";import"./Chip-BcLQNplL.js";function ce(){const{schoolSessionDispatch:f}=m.useContext(z),j=P(),[b,u]=m.useState(null),[c,g]=m.useState(null),[w]=m.useState(Y),{mutateAsync:y,isLoading:T}=L(F),S=(l,t)=>{l.dateofbirth=v(c).format("L"),l.fullname=`${l==null?void 0:l.firstname} ${l==null?void 0:l.lastname}`,y(l,{onSettled:()=>{j.invalidateQueries(["users"]),t.setSubmitting(!1)},onSuccess:a=>{f(M(a)),t.resetForm(),u(null)},onError:a=>{f(Q(a))}})};return e.jsxs(e.Fragment,{children:[e.jsx(H,{color:"#012e54"}),e.jsx(N,{title:"New User",subtitle:"Track,manage and control courses assigned to you",icon:e.jsx(A,{color:"primary",sx:{width:50,height:50}}),color:"primary.main"}),e.jsx(I,{initialValues:w,onSubmit:S,enableReinitialize:!0,validationSchema:R,children:({values:l,errors:t,touched:a,setFieldValue:d,handleChange:i,handleSubmit:C,isSubmitting:B})=>{const W=r=>{d("profile",r.target.files[0]),u(URL.createObjectURL(r.target.files[0]))};return e.jsx(U,{bgcolor:"#fff",p:2,children:e.jsxs(x,{padding:2,spacing:2,children:[e.jsx(x,{alignSelf:"center",children:e.jsx(V,{handleImageUpload:W,children:e.jsx(k,{srcSet:b,sx:{width:100,height:100,alignSelf:"center"}})})}),e.jsx(O,{variant:"body2",color:"primary.main",sx:{fontWeight:"bold"},children:"Personal information"}),e.jsxs(o,{children:[e.jsx(s,{label:"Firstname",type:"text",fullWidth:!0,size:"small",value:l.firstname,onChange:i("firstname"),error:!!(a.firstname&&t.firstname),helperText:a.firstname&&t.firstname}),e.jsx(s,{label:"Lastname",type:"text",fullWidth:!0,size:"small",value:l.lastname,onChange:i("lastname"),error:!!(a.lastname&&t.lastname),helperText:a.lastname&&t.lastname})]}),e.jsx(s,{label:"Username",type:"text",fullWidth:!0,size:"small",value:l.username,onChange:i("username"),error:!!(a.username&&t.username),helperText:a.username&&t.username}),e.jsxs(o,{children:[e.jsx($,{label:"Date of Birth",date:c,setDate:g,disableFuture:!0,touched:!!(a.dateofbirth&&t.dateofbirth),error:a.dateofbirth&&t.dateofbirth}),e.jsxs(s,{label:"Gender",select:!0,fullWidth:!0,size:"small",value:l.gender,onChange:i("gender"),error:!!(a.gender&&t.gender),helperText:a.gender&&t.gender,children:[e.jsx(n,{value:"male",children:"male"}),e.jsx(n,{value:"female",children:"female"})]})]}),e.jsxs(s,{label:"Role",select:!0,fullWidth:!0,size:"small",value:l.role,onChange:i("role"),error:!!(a.role&&t.role),helperText:a.role&&t.role,children:[e.jsx(n,{value:"administrator",children:"Administrator"}),e.jsx(n,{value:"director",children:"Director"}),e.jsx(n,{value:"secretary",children:"Secretary"}),e.jsx(n,{value:"coordinator",children:"Exams Coordinator"})]}),e.jsxs(o,{children:[e.jsx(s,{label:"Email",fullWidth:!0,size:"small",row:3,maxRows:3,value:l.email,onChange:i("email"),error:!!(a.email&&t.email),helperText:a.email&&t.email}),e.jsx(s,{label:"Telephone No.",inputMode:"tel",type:"tel",fullWidth:!0,size:"small",value:l.phonenumber,onChange:i("phonenumber"),error:!!(a.phonenumber&&t.phonenumber),helperText:a.phonenumber&&t.phonenumber})]}),e.jsx(s,{label:"Address",fullWidth:!0,size:"small",row:3,maxRows:3,value:l.address,onChange:i("address"),error:!!(a.address&&t.address),helperText:a.address&&t.address}),e.jsxs(o,{children:[e.jsx(h,{freeSolo:!0,fullWidth:!0,size:"small",options:q,loadingText:"Please wait....",noOptionsText:"No Town available",getOptionLabel:r=>r||"",value:l.residence,onChange:(r,p)=>d("residence",p),renderInput:r=>e.jsx(s,{...r,label:"Residence",fullWidth:!0,size:"small",error:!!(a.residence&&t.residence),helperText:a.residence&&t.residence})}),e.jsx(h,{freeSolo:!0,fullWidth:!0,size:"small",loadingText:"Please wait....",options:G,noOptionsText:"No Nationality available",getOptionLabel:r=>r||"",value:l.nationality,onChange:(r,p)=>d("nationality",p),renderInput:r=>e.jsx(s,{...r,label:"Nationality",fullWidth:!0,size:"small",error:!!(a.nationality&&t.nationality),helperText:a.nationality&&t.nationality})})]}),e.jsxs(o,{children:[e.jsx(s,{type:"password",label:"Password",fullWidth:!0,size:"small",value:l.password,onChange:i("password"),error:!!(a.password&&t.password),helperText:a.password&&t.password}),e.jsx(s,{type:"password",label:"Confirm Password",fullWidth:!0,size:"small",value:l.confirmPassword,onChange:i("confirmPassword"),error:!!(a.confirmPassword&&t.confirmPassword),helperText:a.confirmPassword&&t.confirmPassword})]}),e.jsx(x,{direction:"row",justifyContent:"flex-end",spacing:2,paddingY:2,children:e.jsx(D,{loading:B,variant:"contained",color:"primary",sx:{minWidth:{xs:100,sm:150}},onClick:C,children:"Save User"})})]})})}}),T&&e.jsx(E,{value:"Creating New User..."})]})}export{ce as default};