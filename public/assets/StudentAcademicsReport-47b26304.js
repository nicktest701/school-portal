import{bB as M,fF as Q,fG as q,q as U,j as e,i as E,b as _,r as j,c as B,d as J,v as k,w as X,y as Z,am as ee,K as te,x as G,an as A,l as c,T,B as y,m as a,L as se,E as re,ao as ie,_ as C,W as ne,ak as L,f8 as P,al as oe,aC as ae,D as v,A as V,C as le}from"./index-ce442eb1.js";import{E as D}from"./ExamsScoreItem-cc70c860.js";import{f as ce,g as xe}from"./ExaminationAPI-efb57909.js";import{A as de}from"./Autocomplete-87c4b1e1.js";import{D as O}from"./DialogActions-c9d7df2e.js";import{R as he}from"./index-792040d2.js";import{R as l,E as je,a as b}from"./ReportItemUnderline-9ef3a148.js";import{B as me}from"./ButtonGroup-ca857561.js";import{R as pe}from"./ReportRounded-795c35dc.js";import"./gradeColor-6983157e.js";import"./ListItemButton-97ec9750.js";import"./listItemButtonClasses-c7063ebe.js";import"./ListItemText-b107adf9.js";import"./ListItemSecondaryAction-660d9daa.js";import"./Delete-fb41f478.js";import"./Chip-15117b24.js";const ue=M("MuiBox",["root"]),Se=ue,fe=Q({defaultClassName:Se.root,generateClassName:q.generate}),g=fe,ge=U(e.jsx("path",{d:"M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1"}),"AddRounded"),ye=(x,h)=>{const r=Number(x)+Number(h);let i="",n="";return r>=75?(i="A1",n="Excellent"):r>=70?(i="B2",n="Very Good"):r>=65?(i="B3",n="Good"):r>=60?(i="C4",n="Good"):r>=55?(i="C5",n="Average"):r>=50?(i="C6",n="Average"):r>=45?(i="D7",n="Pass"):r>=40?(i="E8",n="Weak"):(i="F9",n="Fail"),{totalScore:r,grade:i,remarks:n}},be=({open:x,setOpen:h,levelId:r})=>{const{examsId:i}=E(),n=_(),[t,m]=j.useState({severity:"",text:""}),[s,w]=j.useState([]),[p,I]=j.useState([]);B(["subjects"],()=>ie(r),{enabled:!!r,onSuccess:({subjects:o})=>{w(o)}});const z={subject:"",classScore:0,examsScore:0},N={subject:"Subject",classScore:"Class",examsScore:"Exams",totalScore:"Total",grade:"Grade"},F=(o,d)=>{const S=ye(o.classScore,o.examsScore),f={...o,...S},R=C.merge(C.keyBy([...p,f],"subject"));I(C.values(R)),d.resetForm()},Y=o=>{I(d=>d.filter(({subject:f})=>f!==o))},{mutateAsync:H}=J(ce),W=()=>{H({examsId:i,scores:p},{onSettled:()=>{n.invalidateQueries(["student-records"])},onSuccess:()=>{m({severity:"info",text:"Student Scores updated successfully!!!"})}})};return e.jsxs(k,{open:x,onClose:()=>h(!1),fullWidth:!0,maxWidth:"md",children:[e.jsx(X,{title:"Student Assessment Information"}),e.jsx(Z,{initialValues:z,validationSchema:ee,onSubmit:F,children:({values:o,errors:d,touched:S,handleChange:f,handleSubmit:R,setFieldValue:$})=>e.jsxs(e.Fragment,{children:[t.text&&e.jsx(te,{sx:{marginY:1},severity:t.severity,onClose:()=>m({text:""}),children:t.text}),e.jsx(G,{children:e.jsxs(A,{container:!0,spacing:2,rowGap:2,children:[e.jsxs(A,{item:!0,xs:12,md:6,padding:2,children:[e.jsxs(c,{spacing:2,paddingY:2,children:[e.jsx(de,{freeSolo:!0,options:s,getOptionLabel:u=>u||"",value:o.subject,onChange:(u,K)=>$("subject",K),renderInput:u=>e.jsx(T,{...u,label:"Subject",size:"small",error:!!d.subject,helperText:S.subject&&d.subject})}),e.jsx(T,{type:"number",label:"Class Score",size:"small",value:o.classScore,onChange:f("classScore"),error:!!d.classScore,helperText:S.classScore&&d.classScore}),e.jsx(T,{type:"number",label:"Exams Score",size:"small",value:o.examsScore,onChange:f("examsScore"),error:!!d.examsScore,helperText:S.examsScore&&d.examsScore})]}),e.jsx(y,{variant:"contained",size:"small",onClick:R,children:"Add"})]}),e.jsx(A,{item:!0,xs:12,md:6,padding:2,children:e.jsxs(c,{children:[e.jsx(a,{variant:"caption",children:"Preview"}),e.jsx(D,{item:N,title:!0}),e.jsx(se,{sx:{maxHeight:300,overflowY:"scroll"},children:p.map(u=>e.jsx(D,{item:u,removeSubject:Y},u.subject))})]})})]})}),e.jsx(O,{sx:{padding:2},children:e.jsx(re,{variant:"contained",disabled:p.length===0,onClick:W,children:"Save Results"})})]})})]})},Ce=()=>{const{palette:x}=L(),h=j.useRef(),{studentState:r,studentDispatch:i}=j.useContext(P),n=r.showCurrentStudentAcademicsReportView.show,t=r.showCurrentStudentAcademicsReportView.examsDetails,m=()=>{i({type:"showCurrentStudentAcademicsReportView",payload:{show:!1,examsDetails:{}}})};return e.jsxs(k,{open:n,onClose:m,fullWidth:!0,maxWidth:"md",TransitionComponent:oe,children:[e.jsx(ae,{children:"Report Card"}),e.jsxs(G,{ref:h,children:[e.jsx(v,{}),e.jsxs(c,{spacing:1,children:[e.jsxs(c,{justifyContent:"center",alignItems:"center",children:[e.jsx(a,{variant:"h4",children:"Christ Goodness International School"}),e.jsx(a,{sx:{fontSize:"14px"},children:"Post Office Box KS 134"}),e.jsx(a,{sx:{fontSize:"14px"},children:"Kumasi"}),e.jsx(a,{sx:{textAlign:"center",textDecoration:"underline",borderTop:`solid 5px ${x.secondary.main}`,bgcolor:"primary.main",color:"primary.contrastText",width:"100%",padding:1},children:"Report Card"})]}),e.jsx(c,{justifyContent:"center",alignItems:"center",children:e.jsx(V,{src:(t==null?void 0:t.profile)===""||(t==null?void 0:t.profile)===void 0||(t==null?void 0:t.profile)===null?null:t==null?void 0:t.profile,sx:{width:65,height:65}})}),e.jsxs(g,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(g,{children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsx(l,{title:"Full Name",text:t==null?void 0:t.fullName}),e.jsx(l,{title:"Class",text:`${t==null?void 0:t.level}`}),e.jsx(l,{title:"No. On Roll",text:t==null?void 0:t.rollNumber}),e.jsx(l,{title:"Grade",text:"35"}),e.jsx(l,{title:"Promoted",text:"Six(6)"})]})})}),e.jsxs(g,{sx:{flexGrow:1,alignItems:"center",textAlign:"center",paddingRight:4},children:[e.jsx("p",{children:"Position"}),e.jsx(a,{variant:"h5",children:"6"})]}),e.jsx(g,{children:e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsx(l,{title:"Academic Year",text:t==null?void 0:t.academicYear}),e.jsx(l,{title:"Term",text:t==null?void 0:t.term}),e.jsx(l,{title:"Vacation Date",text:t==null?void 0:t.vacationDate}),e.jsx(l,{title:"Reopening Date",text:t==null?void 0:t.reOpeningDate})]})})})]}),e.jsx(c,{children:e.jsxs("table",{style:{textAlign:"center",borderCollapse:"collapse"},border:"1",children:[e.jsx("thead",{style:{bgcolor:"primary.main",color:"secondary.main"},children:e.jsxs("tr",{children:[e.jsx("th",{children:"Subject"}),e.jsx("th",{children:" Class Score (50%)"}),e.jsx("th",{children:" Exams Score (50%)"}),e.jsx("th",{children:"Total Score (100%)"}),e.jsx("th",{children:"Position"}),e.jsx("th",{children:"Grade"}),e.jsx("th",{children:"Remarks"})]})}),e.jsx("tbody",{children:(t==null?void 0:t.scores)!==void 0?(t==null?void 0:t.scores.length)!==0&&(t==null?void 0:t.scores.map(s=>e.jsx(je,{item:s},s.subject))):e.jsx("tr",{children:e.jsx("td",{colSpan:"7",style:{padding:"3px 1px",fontSize:"20px"},children:"No Student Record Available"})})}),e.jsx("tfoot",{style:{textAlign:"center",textDecoration:"underline",borderTop:`solid 5px ${x.secondary.main}`,bgcolor:"primary.main",color:"primary.contrastText",width:"100%",padding:1},children:e.jsxs("tr",{children:[e.jsx("th",{children:"Overall Score"}),e.jsx("th",{}),e.jsx("th",{}),e.jsx("th",{children:C.sumBy(t==null?void 0:t.scores,"totalScore")}),e.jsx("th",{}),e.jsx("th",{}),e.jsx("th",{})]})})]})}),e.jsx(g,{children:e.jsx("table",{width:"100%",children:e.jsxs("tbody",{children:[e.jsx("tr",{children:e.jsxs("td",{width:"100%",style:{display:"flex",gap:"10px",justifyContent:"flex-end"},children:[e.jsx(l,{title:"Attendance",text:"11"}),e.jsx(l,{title:"Out Of",text:t==null?void 0:t.totalLevelAttendance})]})}),e.jsx("tr",{children:e.jsx("td",{width:"50%",children:e.jsx(b,{title:"Conduct & Attitude",text:"Hardworking"})})}),e.jsx("tr",{children:e.jsx("td",{width:"50%",children:e.jsx(b,{title:"Interest",text:"Hardworking"})})}),e.jsx("tr",{children:e.jsx("td",{width:"100%",children:e.jsx(b,{title:"Class Teacher's Remarks",text:"Excellent Performance Keep it up!"})})}),e.jsx("tr",{children:e.jsx("td",{width:"100%",children:e.jsx(b,{title:"Headmaster's Remarks",text:"Proud of her performance."})})})]})})}),e.jsx(v,{}),e.jsxs(c,{justifyContent:"center",alignItems:"center",children:[e.jsx(a,{children:"Bill"}),e.jsxs("table",{width:"60%",border:"1",style:{borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Item"}),e.jsx("th",{children:"GHS"}),e.jsx("th",{children:"GHP"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{style:{paddingLeft:"5px",fontSize:"14px"},children:"Tuition Fee"}),e.jsx("td",{}),e.jsx("td",{})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{paddingLeft:"5px",fontSize:"14px"},children:"Others"}),e.jsx("td",{}),e.jsx("td",{})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{paddingLeft:"5px",fontSize:"14px"},children:"Arreas"}),e.jsx("td",{}),e.jsx("td",{})]})]}),e.jsx("tfoot",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Total"}),e.jsx("th",{}),e.jsx("th",{})]})})]})]}),e.jsx(a,{style:{fontSize:"10px",fontStyle:"italic"},children:"Powered by FrebbyTech Consults (0543772591)"})]})]}),e.jsxs(O,{children:[e.jsx(y,{sx:{displayPrint:!1},children:"Ok"}),e.jsx(he,{pageStyle:'width:8.5in";min-height:11in"; margin:auto",padding:8px;',trigger:()=>e.jsx(y,{variant:"contained",children:"Print Report"}),content:()=>h.current})]})]})},ve=ne.memo(Ce),Fe=()=>{const{examsId:x}=E(),{palette:h}=L(),[r,i]=j.useState(""),{studentDispatch:n}=j.useContext(P),[t,m]=j.useState(!1),{data:s}=B(["student-records",x],()=>xe(x),{enabled:!!x,onSuccess:p=>{n({type:"showCurrentStudentAcademicsReportView",payload:{show:!1,examsDetails:p}}),i(p.levelId)}}),w=()=>{i(s==null?void 0:s.levelId),n({type:"showCurrentStudentAcademicsReportView",payload:{show:!0,examsDetails:s}})};return e.jsxs(le,{sx:{paddingY:2},maxWidth:"lg",children:[e.jsxs("div",{id:"printPage",children:[e.jsx(c,{justifyContent:"flex-end",direction:"row",children:e.jsx(a,{variant:"h3",children:"Student Examination Report"})}),e.jsx(v,{}),e.jsxs(c,{paddingY:2,justifyContent:"center",alignItems:"center",children:[e.jsx(V,{src:(s==null?void 0:s.profile)===""||(s==null?void 0:s.profile)===void 0||(s==null?void 0:s.profile)===null?null:s==null?void 0:s.profile,sx:{width:80,height:80}}),e.jsx(a,{variant:"h5",sx:{textTransform:"capitalize"},children:s==null?void 0:s.fullName}),e.jsx(a,{variant:"body2",children:s==null?void 0:s.level})]}),e.jsx(v,{}),e.jsxs(c,{children:[e.jsx(a,{variant:"h5",sx:{textAlign:"center",textDecoration:"underline",borderTop:`solid 5px ${h.secondary.main}`,bgcolor:"primary.main",color:"primary.contrastText",width:"100%",padding:1},children:"Examination Report"}),e.jsx(c,{justifyContent:"flex-end",direction:"row",paddingY:2,children:e.jsxs(me,{children:[e.jsx(y,{startIcon:e.jsx(ge,{}),variant:"contained",onClick:()=>m(!0),children:"New Score"}),e.jsx(y,{startIcon:e.jsx(pe,{}),onClick:w,children:"View Report"})]})})]})]}),e.jsx(ve,{}),e.jsx(be,{open:t,setOpen:m,levelId:r})]})};export{Fe as default};