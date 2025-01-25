import{X as N,b as P,r as m,S as R,fl as F,m as y,d as O,j as e,t as k,v as L,x as Q,fP as U,w as M,k as T,A as q,l as G,T as l,a0 as C,B as V,g as W,h as B}from"./index-B8PQHtjc.js";import{c as X}from"./studentAPI-DyXUet_8.js";import{C as u}from"./CustomFormControl-Duiznp8E.js";import{C as Y}from"./CustomDatePicker-_ngoDY-2.js";import{T as $,N as H}from"./nationality-Dhsqpti8.js";import{C as J}from"./CustomImageChooser-CGe9XgpC.js";import{A as z}from"./Autocomplete-Dw57Ihk7.js";import{D as K}from"./DialogActions-BmNk8sop.js";import"./AdapterMoment-BOypM_74.js";import"./index-BqG4A_N5.js";import"./useThemeProps-CEPKeDia.js";import"./generateUtilityClasses-BPC_uuYP.js";import"./createTheme-DxYQS8Dz.js";import"./createStyled-CJd69Mvg.js";import"./InputAdornment-DAOlZ4uj.js";import"./ListItem-CQImyTSy.js";import"./ListItemSecondaryAction-DOVMjMKm.js";import"./listItemButtonClasses-DySKLRoc.js";import"./Chip-DmEpgF7y.js";const v=()=>{const x=P(),[c,b]=m.useState(null),[g,j]=m.useState(null),{schoolSessionDispatch:d}=m.useContext(R),{studentState:{editStudentData:p},studentDispatch:D}=m.useContext(F),s=p==null?void 0:p.data;m.useEffect(()=>{b(y(s==null?void 0:s.dateofbirth)),j(s==null?void 0:s.profile)},[s]);const S=()=>{D({type:"editStudent",payload:{open:!1,data:{}}})},{mutateAsync:I,isPending:w}=O({mutationFn:X}),A=n=>{n.dateofbirth=y(c).format("L"),n.profile=g,I(n,{onSettled:()=>{x.invalidateQueries(["student-profile"])},onSuccess:t=>{d(W(t)),S()},onError:t=>{d(B(t))}})},E=async n=>{var a;const t=(a=n.target)==null?void 0:a.files[0];try{const r=new FileReader;r.onload=function(i){const f=i.target.result;j(f),d(W("Photo Updated"))},r.readAsDataURL(t)}catch(r){d(B(r))}x.invalidateQueries(["students"]),x.invalidateQueries(["student-by-id"])};return e.jsxs(k,{open:p.open,maxWidth:"lg",fullWidth:!0,children:[e.jsx(L,{title:"Edit Student Information",onClose:S}),e.jsx(Q,{initialValues:s,onSubmit:A,enableReinitialize:!0,validationSchema:U,children:({values:n,errors:t,touched:a,setFieldValue:r,handleChange:i,handleSubmit:f})=>e.jsxs(e.Fragment,{children:[e.jsx(M,{sx:{display:"flex",justifyContent:"center"},children:e.jsxs(T,{padding:2,spacing:1,children:[e.jsx(T,{alignSelf:"center",children:e.jsx(J,{handleImageUpload:E,children:e.jsx(q,{srcSet:g,sx:{width:100,height:100,alignSelf:"center"}})})}),e.jsx(G,{variant:"body2",color:"primary.main",sx:{fontWeight:"bold"},children:"Personal information"}),e.jsx(l,{label:"Student ID",type:"text",sx:{maxWidth:300},size:"small",value:n.indexnumber,onChange:i("indexnumber"),error:!!(a.indexnumber&&t.indexnumber),helperText:a.indexnumber&&t.indexnumber}),e.jsxs(u,{children:[e.jsx(l,{label:"Firstname",type:"text",fullWidth:!0,size:"small",value:n.firstname||"",onChange:i("firstname"),error:!!(a.firstname&&t.firstname),helperText:a.firstname&&t.firstname}),e.jsx(l,{label:"Surname",fullWidth:!0,size:"small",value:n.surname||"",onChange:i("surname"),error:!!(a.surname&&t.surname),helperText:a.surname&&t.surname}),e.jsx(l,{label:"Othername",fullWidth:!0,size:"small",value:n.othername||"",onChange:i("othername"),error:!!(a.othername&&t.othername),helperText:a.othername&&t.othername})]}),e.jsxs(u,{children:[e.jsx(Y,{label:"Date of Birth",date:c,setDate:b,disableFuture:!0,error:!!(a.dateofbirth&&t.dateofbirth),helperText:a.dateofbirth&&t.dateofbirth}),e.jsxs(l,{label:"Gender",select:!0,fullWidth:!0,size:"small",value:n.gender||"",onChange:i("gender"),error:!!(a.gender&&t.gender),helperText:a.gender&&t.gender,children:[e.jsx(C,{value:"male",children:"male"}),e.jsx(C,{value:"female",children:"female"})]})]}),e.jsxs(u,{children:[e.jsx(l,{label:"Email",fullWidth:!0,size:"small",row:3,maxRows:3,value:n.email||"",onChange:i("email"),error:!!(a.email&&t.email),helperText:a.email&&t.email}),e.jsx(l,{label:"Telephone No.",inputMode:"tel",type:"tel",fullWidth:!0,size:"small",value:n.phonenumber||"",onChange:i("phonenumber"),error:!!(a.phonenumber&&t.phonenumber),helperText:a.phonenumber&&t.phonenumber})]}),e.jsx(l,{label:"Address",fullWidth:!0,size:"small",row:3,maxRows:3,value:n.address||"",onChange:i("address"),error:!!(a.address&&t.address),helperText:a.address&&t.address}),e.jsxs(u,{children:[e.jsx(z,{freeSolo:!0,fullWidth:!0,size:"small",options:$,loadingText:"Please wait....",noOptionsText:"No Town available",getOptionLabel:o=>o||"",value:n.residence||"",onChange:(o,h)=>r("residence",h),renderInput:o=>e.jsx(l,{...o,label:"Residence",fullWidth:!0,size:"small",error:!!(a.residence&&t.residence),helperText:a.residence&&t.residence})}),e.jsx(z,{freeSolo:!0,fullWidth:!0,size:"small",loadingText:"Please wait....",options:H,noOptionsText:"No Nationality available",getOptionLabel:o=>o||"",value:n.nationality||"",onChange:(o,h)=>r("nationality",h),renderInput:o=>e.jsx(l,{...o,label:"Nationality",fullWidth:!0,size:"small",error:!!(a.nationality&&t.nationality),helperText:a.nationality&&t.nationality})})]})]})}),e.jsx(K,{children:e.jsx(V,{loading:w,variant:"contained",color:"primary",onClick:f,children:"Save Changes"})})]})})]})};v.propTypes={};const be=N.memo(v);export{be as default};
