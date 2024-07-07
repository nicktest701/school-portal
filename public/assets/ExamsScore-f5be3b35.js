import{c as O,j as e,r as S,f as D,g as _,i as Y,n as ee,k as se,l as te,m as ae,S as n,b as R,p as re,q as F,s as V,t as q,U as ce,a0 as oe,af as he,ag as de,B as P,A as B,a as Q,T as c,_ as H,J as E,h as W,D as me,x as pe,G as ie,a1 as ne,ah as xe,z as ge,L as ue,u as je,v as $,K as ye,ai as fe}from"./index-a08c4904.js";import{R as be}from"./index-aa1164af.js";import{R as y,E as Se,a as z}from"./ReportItemUnderline-9abe96b9.js";import{p as we,a as ve,u as ke,g as Ce}from"./ExaminationAPI-bc627310.js";import{A as L}from"./Autocomplete-62a3dcdf.js";import{L as Ie,C as Re,b as Te}from"./CustomizedMaterialTable-b0814305.js";import{E as K}from"./ExamsScoreItem-ac14e37f.js";import{g as Ae}from"./generateCustomGrade-93281c1e.js";import{G}from"./Grid-d7986873.js";import{s as Ee}from"./student_ico-5882123b.js";import{g as U}from"./gradeColor-6983157e.js";import{S as Le}from"./School-e5a890f8.js";import{B as He}from"./Back-26c0fe57.js";import{C as Pe}from"./CustomTitle-d0e5d50c.js";import{T as ze,a as De,b as J,c as X}from"./TabPanel-3210be1c.js";import"./Chip-a33d5899.js";import"./Toolbar-172ad7c3.js";import"./MenuItem-ddd79fe9.js";import"./listItemTextClasses-cdd81f8c.js";import"./Skeleton-f52aff28.js";import"./ButtonGroup-ed336fd9.js";import"./ListItemText-de69415f.js";import"./InputAdornment-16e34158.js";import"./CardContent-8cf1caa6.js";import"./ListItemSecondaryAction-33dcc31c.js";import"./useMediaQuery-dbbfc5b2.js";import"./ListItem-559aef15.js";import"./listItemButtonClasses-628cfd1a.js";import"./ListItemButton-b9f74f93.js";import"./Check-6932050c.js";import"./DeleteOutline-f3e83ed5.js";import"./images-ee905b8b.js";import"./Delete-ee750b69.js";import"./Add-3c6bb686.js";import"./ArrowBackRounded-b2e199d9.js";const Me=O(e.jsx("path",{d:"M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75M8.9 17H7.5c-.28 0-.5-.22-.5-.5v-1.43c0-.13.05-.26.15-.35l5.81-5.81 2.12 2.12-5.83 5.83c-.09.09-.22.14-.35.14m7.95-7.73-1.06 1.06-2.12-2.12 1.06-1.06c.2-.2.51-.2.71 0l1.41 1.41c.2.2.2.51 0 .71"}),"NoteAltRounded"),Ne=O(e.jsx("path",{d:"M17.5 13.5H16v-3h1.5zM16 2c-.55 0-1 .45-1 1v1H9V3c0-.55-.45-1-1-1s-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3V3c0-.55-.45-1-1-1M9.5 14.25c0 .41-.34.75-.75.75H6c-.55 0-1-.45-1-1v-1.5c0-.55.45-1 1-1h2v-1H5.75c-.41 0-.75-.34-.75-.75S5.34 9 5.75 9H8.5c.55 0 1 .45 1 1v1.5c0 .55-.45 1-1 1h-2v1h2.25c.41 0 .75.34.75.75M19 14c0 .55-.45 1-1 1h-2.5c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1H18c.55 0 1 .45 1 1zm-6.25-7.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75S11.59 6 12 6s.75.34.75.75m0 3.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75.34-.75.75-.75.75.34.75.75m0 3.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75.34-.75.75-.75.75.34.75.75m0 3.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75.34-.75.75-.75.75.34.75.75"}),"ScoreboardRounded"),Be=O(e.jsx("path",{d:"m19.41 7.41-4.83-4.83c-.37-.37-.88-.58-1.41-.58H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8.83c0-.53-.21-1.04-.59-1.42m-9.18 9.88-2.12-2.12a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l1.41 1.41 3.54-3.54c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.24 4.24c-.38.4-1.02.4-1.41.01M14 9c-.55 0-1-.45-1-1V3.5L18.5 9z"}),"TaskRounded"),Z=["Quite impressive, keep it up.","An outstanding result, do not rest on your oars.","shows interest and enthusiasm for study.","An excellent result, keep it up.","Is a very brilliant and clever student in the class.","Is such a pleasure to have great students like you in our class.","Asks questions when needed. ","Always ready for more challenges that is something I like the most about you.","Is one of the hardworking students in our class. ","Such a trustworthy and caring  in the class.","I love that he takes time to think before he speaks.","He is quite active in extracurricular activities. ","Works very well when in the team or with his best friends. ","So far, you progress is consistent. ","Enthusiast to learn and try something new.","Completes every assignment and task on time. ","I like your enthusiasm to learn new things. That’s a great skill you got. ","Your performance this time is truly impressive. Do you mind sharing how many hours you study at home everyday?","Very hardworking and supportive students in our class. We’re lucky to have you.","So much surprised by his transformations.  Great!","This school is so proud to have smart kids like you.Agem among us.","Very brilliant and clever student of the class.","Such a pleasure to have great students like you in our class.","Is a sincere and dedicated student who always helps others.","Leads a team very well, and quite a great manager for group activities.","Having great potential and getting his tasks finished on time.","Is positive, confident, and very supportive to others. ","Completes every assigned work on time, with a great focus. "," practicing a lot at home, I think. Impressive performance so far. ","Such a great student that others might have a lot to learn from. ","Seems like you are born with leadership skills, very active, and managed. ","Spends time thinking and choosing the right words to respond. ","Learns things a lot faster and remembers them for a longer period. ","Very confident and speaks very well in front of the whole class. ","Have an interest in learning something new and be present while teaching. ","Successfully passing the training phase, now it’s time to level up.","Keep hustling you will achieve it soon."],Ge=["Has a well-developed sense of humor.","Holds many varied interests.","Has a keen interest that has been shared with the class.","Displays and talks about personal items from home when they relate to topics of study.","Provides background knowledge about topics of particular interest to them.","Has an impressive understanding and depth of knowledge about their interests.","Seeks additional information independently about classroom topics that pique interest.","Reads extensively for enjoyment.","Frequently discusses concepts about which they have read.","Is a gifted performer.","Is a talented artist.","Is a flair for dramatic reading and acting.","Enjoys sharing their musical talent with the class.","Discusses ideas that they’ve read regularly.","Enjoys showing off their musical abilities to the rest of the class.","Reads every day for pleasure.","Has a firm grasp of their interests.","Has a neat hobby that they shared with the rest of the class.","Has a wide range of interests.","Independently seeks out additional information on classroom topics.","Is a fantastic performer.","Is a gifted musician.","possesses a witty sense of humor."],Oe=["is an enthusiastic learner who seems to enjoy school.","exhibits a positive outlook and attitude in the classroom.","appears well rested and ready for each day's activities.","shows enthusiasm for classroom activities.","shows initiative and looks for new ways to get involved.","uses instincts to deal with matters independently and in a positive way.","strives to reach their full potential.","is committed to doing their best.","seeks new challenges.","takes responsibility for their learning.","cooperates consistently with the teacher and other students.","transitions easily between classroom activities without distraction.","is courteous and shows good manners in the classroom.","follows classroom rules.","conducts themselves with maturity.","responds appropriately when corrected.","remains focused on the activity at hand.","resists the urge to be distracted by other students.","is kind and helpful to everyone in the classroom.","sets an example of excellence in behavior and cooperation.","shows respect for teachers and peers.","treats school property and the belongings of others with care and respect.","is honest and trustworthy in dealings with others.","displays good citizenship by assisting other students.","joins in school community projects.","is concerned about the feelings of peers.","faithfully performs classroom tasks.","can be depended on to do what they are asked to do.","seeks responsibilities and follows through.","is thoughtful in interactions with others.","is kind, respectful and helpful when interacting with peers","is respectful of other students in our classroom and the school community","demonstrates responsibility daily by caring for the materials in our classroom carefully and thoughtfully","takes  classroom jobs seriously and demonstrates responsibility when completing them","is always honest and can be counted on to recount information when asked","is considerate when interacting with  teachers","demonstrates manners on a daily basis and is always respectful","has incredible self-discipline and always gets work done in a timely manner","can be counted on to be one of the first students to begin working on the task that is given","perseveres when faced with difficulty by asking questions and trying best","does not give up when facing a task that is difficult and always does best","is such a caring and demonstrates concern for peers","demonstrates caring nature when helping peers when they need the assistance","is a model citizen in our classroom","is demonstrates citizenship in our classroom by helping to keep it clean and taking care of the materials in it","can always be counted on to cooperate with peers","is able to cooperate and work well with any of the other students in the class","is exceptionally organized and takes care of things","is always enthusiastic when completing work","is agreeable and polite when working with others","is thoughtful and kind in interactions with others","is creative when problem solving","is very hardworking and always completes all of work","is patient and kind when working with peers who need extra assistance","trustworthy and can always be counted on to step in and help where needed"];function Ye({open:s,setOpen:t,id:m}){const{schoolSessionDispatch:p}=S.useContext(D),f=_(),x={conduct:"",interest:"",teachersComments:"",headteachersComments:""},a=()=>t(!1),{mutateAsync:g,isLoading:k}=Y(we),u=h=>{g({_id:m,comments:h},{onSettled:()=>{f.invalidateQueries(["student-records"]),f.invalidateQueries(["exams-scores"])},onSuccess:o=>{p(V(o)),a()},onError:o=>{p(q(o))}})};return e.jsx(ee,{initialValues:x,onSubmit:u,children:({values:h,setFieldValue:j,errors:o,touched:b,handleSubmit:w})=>e.jsxs(se,{open:s,onClose:a,maxWidth:"sm",fullWidth:!0,className:"add-remark",children:[e.jsx(te,{title:"Add Remarks",onClose:a}),e.jsx(ae,{children:e.jsxs(n,{spacing:2,paddingY:2,children:[e.jsx(L,{freeSolo:!0,options:Ge,getOptionLabel:r=>r||"",value:h.interest,onChange:(r,d)=>j("interest",d),renderInput:r=>e.jsx(R,{...r,label:"Interest",size:"small",error:!!o.interest,helperText:b.interest&&o.interest})}),e.jsx(L,{freeSolo:!0,options:Oe,getOptionLabel:r=>r||"",value:h.conduct,onChange:(r,d)=>j("conduct",d),renderInput:r=>e.jsx(R,{...r,label:"Conduct",size:"small",error:!!o.conduct,helperText:b.conduct&&o.conduct})}),e.jsx(L,{freeSolo:!0,options:Z,getOptionLabel:r=>r||"",value:h.teachersComments,onChange:(r,d)=>j("teachersComments",d),renderInput:r=>e.jsx(R,{...r,label:"Teacher's Comments",size:"small",error:!!o.teachersComments,helperText:b.teachersComments&&o.teachersComments})}),e.jsx(L,{freeSolo:!0,options:Z,getOptionLabel:r=>r||"",value:h.headteachersComments,onChange:(r,d)=>j("headteachersComments",d),renderInput:r=>e.jsx(R,{...r,label:"Headteacher's Comments",size:"small",error:!!o.headteachersComments,helperText:b.headteachersComments&&o.headteachersComments})})]})}),e.jsx(re,{sx:{padding:2},children:e.jsx(F,{loading:k,variant:"contained",onClick:w,children:"Save Changes"})})]})})}const Fe=({student:s})=>{var w,r,d,C;const t=JSON.parse(localStorage.getItem("@school_info")),{userState:{session:m}}=S.useContext(oe),{schoolSessionState:p,schoolSessionDispatch:f}=S.useContext(D),{palette:x}=he(),a=S.useRef(),g=p.viewReport.open,[k,u]=S.useState(!1),h=()=>{f({type:"closeViewReport"})},{mutateAsync:j,isLoading:o}=Y({mutationFn:ve}),b=()=>{pe.fire({title:"Publishing Reports",text:`You are about to publish the report of ${(s==null?void 0:s.fullName)||"student"}.Do you wish to continue?`,showCancelButton:!0,backdrop:!1}).then(({isConfirmed:v})=>{if(v){f({type:"openGeneralAlert",payload:{message:"Publishing reports.This might take a while please wait....",severity:"info"}});const l={sessionId:m.sessionId,termId:m.termId,student:s==null?void 0:s._id,level:s==null?void 0:s.levelId};j(l,{onSuccess:()=>{f(V("Results have been published Successfully!!!"))},onError:()=>{f(q("An error has occured.Couldnt Generate Reports.Try again later"))}})}})};return e.jsxs(e.Fragment,{children:[e.jsxs(se,{open:g,onClose:h,fullWidth:!0,maxWidth:"md",TransitionComponent:de,children:[e.jsx(te,{title:"Report Card",onClose:h}),e.jsxs(re,{children:[e.jsx(F,{loading:o,onClick:b,children:o?"Please Wait....":"Publish Report"}),e.jsx(be,{trigger:()=>e.jsx(P,{variant:"contained",children:"Print Report"}),content:()=>a.current,documentTitle:s==null?void 0:s.fullName})]}),e.jsx(ae,{children:e.jsxs(n,{ref:a,spacing:1,sx:{maxWidth:"8.5in",minHeight:"11in",margin:"auto",padding:"16px",border:"1px solid lightgray"},children:[e.jsxs(n,{direction:"row",justifyContent:"center",alignItems:"center",children:[t!=null&&t.badge?e.jsx(B,{alt:"school logo",loading:"lazy",srcSet:`/images/users/${t==null?void 0:t.badge}`,sx:{width:70,height:70}}):e.jsx(Q,{sx:{width:50,height:50}}),e.jsxs(n,{justifyContent:"center",alignItems:"center",flexGrow:1,children:[e.jsx(c,{variant:"h4",color:"primary",children:H.startCase(t==null?void 0:t.name)}),e.jsx(c,{variant:"caption",children:t==null?void 0:t.address}),e.jsx(c,{variant:"caption",children:t==null?void 0:t.location}),e.jsx(c,{variant:"caption",fontStyle:"italic",children:t==null?void 0:t.motto}),e.jsx(c,{variant:"caption",fontStyle:"italic",children:t==null?void 0:t.phonenumber})]}),t!=null&&t.badge?e.jsx(B,{alt:"school logo",loading:"lazy",srcSet:`/images/users/${t==null?void 0:t.badge}`,sx:{width:70,height:70}}):e.jsx(Q,{sx:{width:50,height:50}})]}),e.jsx(c,{sx:{textAlign:"center",borderTop:`solid 2px ${x.secondary.main}`,bgcolor:"primary.main",color:"primary.contrastText",width:"100%",padding:"4px"},variant:"body2",children:"Report Card"}),e.jsx(n,{justifyContent:"center",alignItems:"center",children:e.jsx(B,{src:(s==null?void 0:s.profile)===""||(s==null?void 0:s.profile)===void 0||(s==null?void 0:s.profile)===null?null:s==null?void 0:s.profile,sx:{width:60,height:60,alignSelf:"center"}})}),e.jsxs(E,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(E,{children:e.jsxs(n,{children:[e.jsx(y,{title:"ID",text:s==null?void 0:s.indexnumber}),e.jsx(y,{title:"Full Name",text:s==null?void 0:s.fullName}),e.jsx(y,{title:"Class",text:`${s==null?void 0:s.level}`}),e.jsx(y,{title:"No. On Roll",text:s==null?void 0:s.rollNumber}),e.jsx(y,{title:"Grade",text:s==null?void 0:s.grade}),e.jsx(y,{title:"Promoted",text:""})]})}),e.jsxs(E,{sx:{flexGrow:1,alignItems:"center",textAlign:"center"},children:[e.jsx("p",{children:"Position"}),e.jsx(c,{variant:"h5",color:"error",children:s==null?void 0:s.position})]}),e.jsx(E,{children:e.jsxs(n,{children:[e.jsx(y,{title:"Academic Year",text:s==null?void 0:s.academicYear}),e.jsx(y,{title:"Term/Semester",text:s==null?void 0:s.term}),e.jsx(y,{title:"Vacation Date",text:W(s==null?void 0:s.vacationDate).format("Do MMMM,YYYY")}),e.jsx(y,{title:"Reopening Date",text:W(s==null?void 0:s.reOpeningDate).format("Do MMMM,YYYY")})]})})]}),e.jsx(n,{children:e.jsxs("table",{style:{textAlign:"center",borderCollapse:"collapse"},border:"1",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Subject"}),e.jsx("th",{children:" Class Score (50%)"}),e.jsx("th",{children:" Exams Score (50%)"}),e.jsx("th",{children:"Total Score (100%)"}),e.jsx("th",{children:"Grade"}),e.jsx("th",{children:"Remarks"})]})}),e.jsx("tbody",{children:(s==null?void 0:s.scores)!==void 0?(s==null?void 0:s.scores.length)!==0&&(s==null?void 0:s.scores.map(v=>e.jsx(Se,{item:v},v.subject))):e.jsx("tr",{children:e.jsx("td",{colSpan:"7",style:{padding:"3px 1px",fontSize:"20px"},children:"No Student Record Available"})})}),e.jsx("tfoot",{style:{textAlign:"center",textDecoration:"underline",borderTop:`solid 5px ${x.secondary.main}`,bgcolor:"primary.main",color:"primary.contrastText",width:"100%",padding:1},children:e.jsxs("tr",{children:[e.jsx("th",{children:"Overall Score"}),e.jsx("th",{}),e.jsx("th",{}),e.jsx("th",{children:s==null?void 0:s.overallScore}),e.jsx("th",{}),e.jsx("th",{}),e.jsx("th",{})]})})]})}),e.jsx(E,{sx:{flex:1},children:e.jsxs(n,{rowGap:1,children:[e.jsxs(n,{direction:"row",justifyContent:"flex-end",columnGap:6,spacing:6,pt:1,pr:8,children:[e.jsx(y,{title:"Attendance  ",text:"    "}),e.jsx(y,{title:"Out Of           ",text:"       "})]}),e.jsxs(n,{children:[e.jsx(z,{title:"Conduct & Attitude",text:((w=s==null?void 0:s.comments)==null?void 0:w.conduct)||"Hardworking"}),e.jsx(z,{title:"Interest",text:((r=s==null?void 0:s.comments)==null?void 0:r.interest)||"Hardworking"}),e.jsx(z,{title:"Class Teacher's Remarks",text:((d=s==null?void 0:s.comments)==null?void 0:d.teachersComments)||"Excellent Performance Keep it up!"}),e.jsx(z,{title:"Headmaster's Remarks",text:((C=s==null?void 0:s.comments)==null?void 0:C.headteachersComments)||"Good job done!"})]}),e.jsx(Ie,{className:"add-remarks-btn",onClick:()=>u(!0),sx:{cursor:"pointer"},children:"Add Remarks"})]})}),e.jsx(me,{}),e.jsxs(n,{justifyContent:"center",alignItems:"center",children:[e.jsx(c,{children:"Bill"}),e.jsxs("table",{width:"60%",border:"1",style:{borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Item"}),e.jsx("th",{children:"GHS"}),e.jsx("th",{children:"GHP"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{style:{paddingLeft:"5px",fontSize:"13px"},children:"Tuition Fee"}),e.jsx("td",{}),e.jsx("td",{})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{paddingLeft:"5px",fontSize:"13px"},children:"Others"}),e.jsx("td",{}),e.jsx("td",{})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{paddingLeft:"5px",fontSize:"13px"},children:"Arrears"}),e.jsx("td",{}),e.jsx("td",{})]})]}),e.jsx("tfoot",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Total"}),e.jsx("th",{}),e.jsx("th",{})]})})]})]}),e.jsx(c,{style:{fontSize:"10px",fontStyle:"italic"},children:"Powered by FrebbyTech Consults (0543772591)"})]})})]}),e.jsx(Ye,{open:k,setOpen:u,id:s==null?void 0:s._id})]})},Ve=ce.memo(Fe),qe=({setTab:s,options:t})=>{const{userState:{session:m}}=S.useContext(oe),{schoolSessionDispatch:p}=S.useContext(D),{levelId:f}=ie(),x=_(),[a]=ne(),[g,k]=S.useState({severity:"",text:""}),[u,h]=S.useState([]),j={subject:"",classScore:0,examsScore:0},o={subject:"Subject",classScore:"Class",examsScore:"Exams",totalScore:"Total",grade:"Grade",remarks:"Remarks"},b=(l,i)=>{const T=Number(l.classScore)+Number(l.examsScore),A=Ae(T,t==null?void 0:t.grades),M={...l,...A},N=H.merge(H.keyBy([...u,M],"subject"));h(H.values(N)),i.resetForm()},w=l=>{h(i=>i.filter(({subject:A})=>A!==l))},{mutateAsync:r,isLoading:d}=Y({mutationFn:ke}),C=()=>{const l={session:{levelId:f,studentId:a.get("sid"),sessionId:m.sessionId,termId:m.termId},scores:u};r(l,{onSettled:()=>{x.invalidateQueries(["student-records"]),x.invalidateQueries(["exams-scores"]),x.invalidateQueries(["exams-details"]),x.invalidateQueries(["exams-reports"]),x.invalidateQueries(["exams-by-id"])},onSuccess:i=>{p(V(i)),s("1")},onError:i=>{p(q(i))}})},v=()=>p({type:"openAddExamsScore",payload:{open:!1,data:{}}});return e.jsx(ee,{initialValues:j,validationSchema:xe,onSubmit:b,children:({values:l,errors:i,touched:T,handleChange:A,handleSubmit:M,setFieldValue:N})=>e.jsxs(e.Fragment,{children:[g.text&&e.jsx(ge,{sx:{marginY:1},severity:g.severity,onClose:()=>k({text:""}),children:g.text}),e.jsxs(e.Fragment,{children:[e.jsxs(G,{container:!0,spacing:2,rowGap:2,sx:{minHeight:"60svh"},children:[e.jsx(G,{item:!0,xs:12,md:5,padding:2,children:e.jsxs(n,{spacing:2,py:2,children:[e.jsx(c,{children:"Add Subject Score"}),e.jsx(L,{freeSolo:!0,options:t==null?void 0:t.subjects,loadingText:"Loading Subjects.Please Wait...",getOptionLabel:I=>I||"",value:l.subject,onChange:(I,le)=>N("subject",le),renderInput:I=>e.jsx(R,{...I,label:"Subject",size:"small",error:!!i.subject,helperText:T.subject&&i.subject})}),e.jsx(R,{type:"number",label:"Class Score",size:"small",value:l.classScore,onChange:A("classScore"),error:!!i.classScore,helperText:T.classScore&&i.classScore}),e.jsx(R,{type:"number",label:"Exams Score",size:"small",value:l.examsScore,onChange:A("examsScore"),error:!!i.examsScore,helperText:T.examsScore&&i.examsScore}),e.jsx(P,{variant:"contained",onClick:M,children:"Add Score"})]})}),e.jsxs(G,{item:!0,xs:12,md:7,padding:2,children:[e.jsx(c,{children:"Scores Preview"}),e.jsx(K,{item:o,title:!0}),e.jsx(ue,{sx:{maxHeight:300,overflowY:"scroll"},children:u.map(I=>e.jsx(K,{item:I,removeSubject:w},I.subject))})]})]}),e.jsxs(n,{spacing:2,direction:"row",justifyContent:"flex-end",children:[e.jsx(P,{onClick:v,children:"Cancel"}),e.jsx(F,{variant:"contained",disabled:u.length===0,onClick:C,loading:d,children:"Save Results"})]})]})]})})};function Qe({details:s}){const t=[{field:"subject",title:"Subject"},{field:"classScore",title:"Class Score"},{field:"examsScore",title:"Exams Score"},{field:"totalScore",title:"Total Score",cellStyle:{color:"red"}},{field:"grade",title:"Grade"},{field:"remarks",title:"Remarks",cellStyle:{color:"green"},render:({totalScore:m,remarks:p})=>e.jsx(P,{sx:{width:"100%",color:U(m).color,bgcolor:U(m).bg},children:p})}];return e.jsx(Re,{icon:(s==null?void 0:s.profile)||e.jsx(Le,{}),title:(s==null?void 0:s.fullName)||"Student",columns:t,data:s==null?void 0:s.scores,actions:[],search:!1,addButtonImg:Ee,addButtonMessage:"No Exams Score available"})}function Rs(){var u,h,j,o,b,w,r,d,C,v;const{state:s}=je(),{schoolSessionDispatch:t}=S.useContext(D),[m]=ne(),{levelId:p}=ie(),[f,x]=S.useState("1"),a=$({queryKey:["exams-by-id",m.get("eid")],queryFn:()=>Ce(m.get("eid")),enabled:!!m.get("eid")}),g=$({queryKey:["subjects",p],queryFn:()=>fe(p),enabled:!!p,select:({subjects:l,grades:i})=>({subjects:l,grades:i})}),k=()=>{t({type:"openViewReport"})};return e.jsxs(e.Fragment,{children:[e.jsxs(e.Fragment,{children:[e.jsx(He,{to:s==null?void 0:s.prevPath,color:"primary.main"}),e.jsx(Pe,{title:"Student Assessment",subtitle:"View and manipulate results of student",color:"primary.main"}),a.isLoading?e.jsx(n,{justifyContent:"center",alignItems:"center",children:e.jsx(ye,{})}):a!=null&&a.isError?e.jsx(n,{justifyContent:"center",alignItems:"center",children:e.jsx(c,{children:"An error has occurred!"})}):e.jsxs(E,{children:[e.jsx(c,{variant:"h3",py:5,paragraph:!0,children:(u=a==null?void 0:a.data)==null?void 0:u.fullName}),e.jsx(c,{textAlign:"right",variant:"h4",color:"success.main",children:H.sumBy((h=a==null?void 0:a.data)==null?void 0:h.scores,"totalScore")??0}),e.jsx(c,{children:"Results Entry"}),e.jsxs(n,{spacing:2,py:4,children:[e.jsx(Te,{variant:"determinate",value:(o=(j=a==null?void 0:a.data)==null?void 0:j.entry)==null?void 0:o.percent,sx:{bgcolor:"lightgray"},color:((w=(b=a==null?void 0:a.data)==null?void 0:b.entry)==null?void 0:w.percent)===100?"success":"secondary"}),e.jsxs(c,{textAlign:"center",fontSize:11,children:[(d=(r=a==null?void 0:a.data)==null?void 0:r.entry)==null?void 0:d.completed,"/",(v=(C=a==null?void 0:a.data)==null?void 0:C.entry)==null?void 0:v.total," ","completed"]}),e.jsx(P,{variant:"contained",startIcon:e.jsx(Me,{}),onClick:k,children:"View Report"})]}),e.jsxs(ze,{value:f,children:[e.jsxs(De,{onChange:(l,i)=>x(i),children:[e.jsx(J,{label:"Exams Score",value:"1",icon:e.jsx(Ne,{}),iconPosition:"start"}),e.jsx(J,{label:"New Exams Score",value:"2",icon:e.jsx(Be,{}),iconPosition:"start"})]}),e.jsx(X,{value:"1",sx:{px:0},children:e.jsx(Qe,{details:a.data,options:g})}),e.jsx(X,{value:"2",sx:{px:0},children:e.jsx(qe,{setTab:x,options:g==null?void 0:g.data})})]})]})]}),e.jsx(Ve,{student:a.data})]})}export{Rs as default};
