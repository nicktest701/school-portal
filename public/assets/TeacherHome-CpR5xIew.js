import{r as c,S as E,b as F,m as C,d as M,j as e,M as R,e as A,w as O,Z as D,k as d,A as U,l as y,T as o,$ as S,B as Q,y as Y,Q as _,g as q,h as G,u as H,c as V,C as $,aw as Z}from"./index-DrgqF6h7.js";import{C as J}from"./CustomizedMaterialTable-sErZg5Gy.js";import{C as f}from"./CustomFormControl-BOFleHo6.js";import{t as K}from"./initialValues-D0lDlXZC.js";import{a as X,b as ee}from"./teacherAPI-CExmebEp.js";import{C as ae}from"./CustomDatePicker-D2bLCilT.js";import{T as te,N as ie}from"./nationality-Dhsqpti8.js";import{C as ne}from"./CustomImageChooser-B_xkuEqQ.js";import{A as w}from"./Autocomplete-D4vPEd6T.js";import{T as oe}from"./teacherColumn-B6aT-E-9.js";import{E as se}from"./images-B5fNBSni.js";import{t as v}from"./teacher_ico-BYF6mhgw.js";import{T as re,a as le,b as B,c as W}from"./TabPanel-Bl8roboH.js";import{P as me}from"./PersonRounded-BirI4BM8.js";import"./Toolbar-Bzx_LBRC.js";import"./Chip-BcLQNplL.js";import"./useThemeProps-DLRF2U3R.js";import"./Skeleton-BUD-o5ar.js";import"./ButtonGroup-DQMwsk7A.js";import"./ListItemText-Bwh_rzOL.js";import"./InputAdornment-EcTjtcuD.js";import"./index-_n9xtSlI.js";import"./DialogActions-Cx2GHHEW.js";import"./ListItem-yCsexoBs.js";import"./ListItemSecondaryAction-mmiMbVqP.js";import"./listItemButtonClasses-CLhmtlXH.js";import"./ListItemButton-BUsfko6u.js";import"./Check-CEGAxChF.js";import"./DeleteOutline-DM92K-00.js";import"./AdapterMoment-Dv21LUiO.js";import"./generateUtilityClasses-CIQngnWt.js";import"./createTheme-xb4osIQ4.js";import"./createStyled-CRj7xEq5.js";import"./CircleRounded-Bh8WmZqU.js";const N=({setTab:g})=>{const{schoolSessionDispatch:l}=c.useContext(E),b=F(),[s,u]=c.useState(null),[p,h]=c.useState(C()),[m]=c.useState(K),{isLoading:x,mutateAsync:L}=M({mutationFn:X}),P=(i,t)=>{i.dateofbirth=C(p).format("L"),L(i,{onSuccess:a=>{b.invalidateQueries(["teachers"]),l(q(a)),t.resetForm(),u(null),g("1")},onError:a=>{l(G(a))}})};return e.jsxs(e.Fragment,{children:[e.jsxs(R,{sx:{paddingY:2,backgroundColor:"#fff"},children:[e.jsx(A,{title:"New Facilitator",subtitle:" Simply fill in essential details about the new teacher, including their personal information, qualifications, and contact details, to ensure smooth integration into our educational community.",img:null,color:"primary.main"}),e.jsx(O,{initialValues:m,onSubmit:P,enableReinitialize:!0,validationSchema:D,children:({values:i,errors:t,touched:a,setFieldValue:j,handleChange:r,handleSubmit:z,handleReset:I})=>{const k=n=>{j("profile",n.target.files[0]),u(URL.createObjectURL(n.target.files[0]))};return e.jsxs(d,{padding:2,spacing:5,children:[e.jsx(d,{alignSelf:"center",children:e.jsx(ne,{handleImageUpload:k,children:e.jsx(U,{srcSet:s,sx:{width:100,height:100,alignSelf:"center"}})})}),e.jsxs(d,{spacing:3,children:[e.jsx(y,{variant:"h5",color:"secondary.main",bgcolor:"primary.main",fontWeight:"bold",p:1,paragraph:!0,children:"Personal information"}),e.jsxs(f,{children:[e.jsx(o,{label:"Firstname",type:"text",fullWidth:!0,size:"small",value:i.firstname,onChange:r("firstname"),error:!!(a.firstname&&t.firstname),helperText:a.firstname&&t.firstname}),e.jsx(o,{label:"Surname",fullWidth:!0,size:"small",value:i.surname,onChange:r("surname"),error:!!(a.surname&&t.surname),helperText:a.surname&&t.surname})]}),e.jsx(o,{label:"Username",fullWidth:!0,size:"small",value:i.username,onChange:r("username"),error:!!(a.username&&t.username),helperText:a.username&&t.username}),e.jsxs(f,{children:[e.jsx(ae,{label:"Date of Birth",date:p,setDate:h,disableFuture:!0,error:!!(a.dateofbirth&&t.dateofbirth),helperText:a.dateofbirth&&t.dateofbirth,value:i.dateofbirth,handleChange:r("dateofbirth")}),e.jsxs(o,{label:"Gender",select:!0,fullWidth:!0,size:"small",value:i.gender,onChange:r("gender"),error:!!(a.gender&&t.gender),helperText:a.gender&&t.gender,children:[e.jsx(S,{value:"male",children:"Male"}),e.jsx(S,{value:"female",children:"Female"})]})]})]}),e.jsxs(d,{spacing:3,children:[e.jsx(y,{variant:"h5",color:"secondary.main",bgcolor:"primary.main",fontWeight:"bold",p:1,paragraph:!0,children:"Contact Details"}),e.jsxs(f,{children:[e.jsx(o,{label:"Email",fullWidth:!0,size:"small",row:3,maxRows:3,value:i.email,onChange:r("email"),error:!!(a.email&&t.email),helperText:a.email&&t.email}),e.jsx(o,{label:"Telephone No.",inputMode:"tel",type:"tel",fullWidth:!0,size:"small",value:i.phonenumber,onChange:r("phonenumber"),error:!!(a.phonenumber&&t.phonenumber),helperText:a.phonenumber&&t.phonenumber})]}),e.jsx(o,{label:"Address",fullWidth:!0,size:"small",row:3,maxRows:3,value:i.address,onChange:r("address"),error:!!(a.address&&t.address),helperText:a.address&&t.address}),e.jsxs(f,{children:[e.jsx(w,{freeSolo:!0,fullWidth:!0,size:"small",options:te,loadingText:"Please wait....",noOptionsText:"No Town available",getOptionLabel:n=>n||"",value:i.residence,onChange:(n,T)=>j("residence",T),renderInput:n=>e.jsx(o,{...n,label:"Residence",fullWidth:!0,size:"small",error:!!(a.residence&&t.residence),helperText:a.residence&&t.residence})}),e.jsx(w,{freeSolo:!0,fullWidth:!0,size:"small",loadingText:"Please wait....",options:ie,noOptionsText:"No Nationality available",getOptionLabel:n=>n||"",value:i.nationality,onChange:(n,T)=>j("nationality",T),renderInput:n=>e.jsx(o,{...n,label:"Nationality",fullWidth:!0,size:"small",error:!!(a.nationality&&t.nationality),helperText:a.nationality&&t.nationality})})]})]}),e.jsxs(d,{direction:"row",justifyContent:"flex-end",spacing:2,paddingY:4,children:[e.jsx(Q,{sx:{minWidth:{xs:100,sm:150}},onClick:I,children:"Cancel"}),e.jsx(Y,{loading:x,variant:"contained",color:"primary",sx:{minWidth:{xs:100,sm:150}},onClick:z,children:"Save"})]})]})}})]}),x&&e.jsx(_,{value:"Please Wait.."})]})};N.propTypes={};const _e=()=>{var h;const[g,l]=c.useState("1"),b=H(),s=V(["teachers"],()=>ee()),u=((h=s==null?void 0:s.data)==null?void 0:h.length)===0,p=m=>{b(`/teacher/${m==null?void 0:m._id}`)};return e.jsxs($,{children:[e.jsx(A,{title:"Facilitator Portal",subtitle:"Explore Our Faculty: Meet the Dedicated Educators Shaping Tomorrow's Leaders",img:v,color:"primary.main"}),e.jsxs(re,{value:g,children:[e.jsxs(le,{onChange:(m,x)=>l(x),sx:{bgcolor:"whitesmoke"},children:[e.jsx(B,{value:"1",label:"Facilitator",icon:e.jsx(me,{}),iconPosition:"start"}),u&&e.jsx(B,{value:"2",label:"New ",icon:e.jsx(Z,{}),iconPosition:"start"})]}),e.jsx(W,{value:"1",sx:{px:0},children:e.jsx(J,{title:"Teachers",icon:v,isLoading:s.isLoading,columns:oe,data:s.data?s.data:[],actions:[],onRowClick:p,showAddButton:!0,addButtonImg:se.teacher,addButtonText:"New Teacher",addButtonMessage:"😑 Add your first teacher by clicking on the button below !",onAddButtonClicked:()=>l("2"),options:{search:!0}})}),e.jsx(W,{value:"2",sx:{px:0},children:e.jsx(N,{setTab:l})})]})]})};export{_e as default};
