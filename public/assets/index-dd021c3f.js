import{j as e,T as o,U as g,r as l,a0 as P,a as S,b as v,S as R,d as $,v as L,w as _,y as A,a1 as O,x as G,l as m,A as T,m as E,B as W,E as Q,a2 as V,g as w,h as y,C,e as M}from"./index-ce442eb1.js";import{C as j}from"./CustomFormControl-7bbced0e.js";import{u as q}from"./sessionAPI-c946b457.js";import{C as H}from"./CustomImageChooser-841df1e5.js";import{D as N}from"./DialogActions-c9d7df2e.js";import{E as J}from"./Edit-009e8578.js";function i({label:a,value:p}){return e.jsx(o,{label:a,value:p,fullWidth:!0,inputProps:{style:{backgroundColor:"whitesmoke",color:"var(--primary)",fontWeight:"bold",textTransform:"capitalize"}},InputProps:{readOnly:!0}})}const B=()=>{const{user:a}=l.useContext(P),[p,u]=S(),x=v(),[c,U]=l.useState(""),[z,b]=l.useState(null),{schoolSessionDispatch:f}=l.useContext(R);l.useEffect(()=>{b(`https://school-portal-aivn.onrender.com/api/frebbys/v1/images/users/${a==null?void 0:a.profile}`)},[a]);const{mutateAsync:I}=$(V),k=(s,r)=>{if(s.confirmPassword!==s.password){U("Passwords do not match"),r.setSubmitting(!1);return}s.fullname=`${s==null?void 0:s.firstname} ${s==null?void 0:s.lastname}`,delete s.profile,delete s.confirmPassword,s._id=a==null?void 0:a.id,I(s,{onSettled:()=>{x.invalidateQueries(["user"]),r.setSubmitting(!1)},onSuccess:t=>{f(w(t)),h()},onError:t=>{f(y(t))}})},D=async s=>{var n;const r=(n=s.target)==null?void 0:n.files[0],t={_id:a==null?void 0:a.id,profile:r,type:"users"};try{const d=await q(t);f(w(d)),b(URL.createObjectURL(r))}catch(d){f(y(d))}x.invalidateQueries(["user"])},h=()=>{u(s=>(s.delete("e_p"),s))};return e.jsxs(L,{open:p.get("e_p"),maxWidth:"md",fullWidth:!0,children:[e.jsx(_,{title:"Edit User",onClose:h}),e.jsx(A,{initialValues:{password:"",confirmPassword:"",...a},onSubmit:k,enableReinitialize:!0,validationSchema:O,children:({values:s,errors:r,touched:t,handleChange:n,handleSubmit:d,isSubmitting:F})=>e.jsxs(e.Fragment,{children:[e.jsx(G,{children:e.jsxs(m,{direction:{xs:"column",md:"row"},justifyContent:"center",columnGap:3,children:[e.jsx(m,{children:e.jsx(H,{handleImageUpload:D,children:e.jsx(T,{srcSet:z,sx:{width:100,height:100,alignSelf:"center"}})})}),e.jsxs(m,{padding:2,spacing:2,children:[e.jsx(E,{variant:"body2",color:"primary.main",sx:{fontWeight:"bold"},children:"Personal information"}),e.jsx(o,{label:"Firstname",type:"text",fullWidth:!0,size:"small",value:s.firstname||"",onChange:n("firstname"),error:!!(t.firstname&&r.firstname),helperText:t.firstname&&r.firstname}),e.jsx(o,{label:"Lastname",type:"text",fullWidth:!0,size:"small",value:s.lastname||"",onChange:n("lastname"),error:!!(t.lastname&&r.lastname),helperText:t.lastname&&r.lastname}),e.jsx(o,{label:"Username",fullWidth:!0,size:"small",value:s.username||"",onChange:n("username"),error:!!(t.username&&r.username),helperText:t.username&&r.username}),e.jsx(o,{label:"Email",fullWidth:!0,size:"small",row:3,maxRows:3,value:s.email||"",onChange:n("email"),error:!!(t.email&&r.email),helperText:t.email&&r.email}),e.jsx(o,{label:"Telephone No.",inputMode:"tel",type:"tel",fullWidth:!0,size:"small",value:s.phonenumber||"",onChange:n("phonenumber"),error:!!(t.phonenumber&&r.phonenumber),helperText:t.phonenumber&&r.phonenumber}),e.jsxs(j,{children:[e.jsx(o,{type:"password",label:"Password",fullWidth:!0,size:"small",value:s.password,onChange:n("password"),error:!!(t.password&&r.password),helperText:t.password&&r.password}),e.jsx(o,{type:"password",label:"Confirm Password",fullWidth:!0,size:"small",value:s.confirmPassword,onChange:n("confirmPassword"),error:!!(t.confirmPassword&&r.confirmPassword),helperText:c||t.confirmPassword&&r.confirmPassword,FormHelperTextProps:{color:"error.main"}})]})]})]})}),e.jsxs(N,{children:[e.jsx(W,{onClick:h,children:"Cancel"}),e.jsx(Q,{loading:F,variant:"contained",color:"primary",sx:{minWidth:{xs:100,sm:150}},onClick:d,children:"Save Changes"})]})]})})]})};B.propTypes={open:g.bool,setOpen:g.func};function se(){const{user:a}=l.useContext(P),[p,u]=S(),x=()=>{u(c=>(c.set("e_p",!0),c))};return e.jsxs(C,{children:[e.jsx(M,{title:"Profile",subtitle:"View and update your personal information to keep your profile accurate and current.",color:"text.main",backColor:"#012e54"}),e.jsxs(C,{sx:{display:"flex",flexDirection:"column",alignItems:"start",py:4,gap:4,bgcolor:"#fff"},children:[e.jsx(W,{variant:"contained",startIcon:e.jsx(J,{}),onClick:x,sx:{alignSelf:"flex-end"},children:"Edit Profile"}),e.jsxs(m,{width:"100%",justifyContent:"center",alignItems:"center",rowGap:2,children:[e.jsx(m,{sx:{p:1,border:"1px solid lightgray",borderRadius:"50%"},children:e.jsx(T,{src:`https://school-portal-aivn.onrender.com/api/frebbys/v1/images/users/${a==null?void 0:a.profile}`,sx:{height:120,width:120}})}),e.jsx(E,{variant:"h6",color:"primary",sx:{paddingTop:2,textTransform:"capitalize"},children:a==null?void 0:a.fullname})]}),e.jsxs(m,{spacing:3,width:"100%",children:[e.jsxs(j,{children:[e.jsx(i,{label:"Firstname",value:a.firstname||""}),e.jsx(i,{label:"Lastname",value:a.lastname||""})]}),e.jsx(i,{label:"Username",value:a.username||""}),e.jsx(i,{label:"Email",value:a.email||""}),e.jsxs(j,{children:[e.jsx(i,{label:"Date of Birth",value:a.dob||""}),e.jsx(i,{label:"Gender",value:a.gender||""})]}),e.jsx(i,{label:"Role",value:a.role||""})]})]}),e.jsx(B,{})]})}export{se as default};