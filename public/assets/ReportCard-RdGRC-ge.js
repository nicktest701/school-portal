import{r as T,S as D,b as H,d as E,j as e,x as z,t as O,v as Y,w as L,k as o,T as f,B as G,g as M,h as N,bt as B,A as C,o as S,l,_ as P,P as p,m as I,D as q}from"./index-B8PQHtjc.js";import{R as r,E as $,a as w}from"./ReportItemUnderline-MmYFOo6z.js";import{b as W}from"./ExaminationAPI-gfcTwHm9.js";import{A as u}from"./Autocomplete-Dw57Ihk7.js";import{D as F}from"./DialogActions-BmNk8sop.js";import{L as Q}from"./Link-kLE4_HTq.js";const R=["Quite impressive, keep it up.","An outstanding result, do not rest on your oars.","shows interest and enthusiasm for study.","An excellent result, keep it up.","Is a very brilliant and clever student in the class.","Is such a pleasure to have great students like you in our class.","Asks questions when needed. ","Always ready for more challenges that is something I like the most about you.","Is one of the hardworking students in our class. ","Such a trustworthy and caring  in the class.","I love that he takes time to think before he speaks.","He is quite active in extracurricular activities. ","Works very well when in the team or with his best friends. ","So far, you progress is consistent. ","Enthusiast to learn and try something new.","Completes every assignment and task on time. ","I like your enthusiasm to learn new things. That’s a great skill you got. ","Your performance this time is truly impressive. Do you mind sharing how many hours you study at home everyday?","Very hardworking and supportive students in our class. We’re lucky to have you.","So much surprised by his transformations.  Great!","This school is so proud to have smart kids like you.Agem among us.","Very brilliant and clever student of the class.","Such a pleasure to have great students like you in our class.","Is a sincere and dedicated student who always helps others.","Leads a team very well, and quite a great manager for group activities.","Having great potential and getting his tasks finished on time.","Is positive, confident, and very supportive to others. ","Completes every assigned work on time, with a great focus. "," practicing a lot at home, I think. Impressive performance so far. ","Such a great student that others might have a lot to learn from. ","Seems like you are born with leadership skills, very active, and managed. ","Spends time thinking and choosing the right words to respond. ","Learns things a lot faster and remembers them for a longer period. ","Very confident and speaks very well in front of the whole class. ","Have an interest in learning something new and be present while teaching. ","Successfully passing the training phase, now it’s time to level up.","Keep hustling you will achieve it soon."],K=["Has a well-developed sense of humor.","Holds many varied interests.","Has a keen interest that has been shared with the class.","Displays and talks about personal items from home when they relate to topics of study.","Provides background knowledge about topics of particular interest to them.","Has an impressive understanding and depth of knowledge about their interests.","Seeks additional information independently about classroom topics that pique interest.","Reads extensively for enjoyment.","Frequently discusses concepts about which they have read.","Is a gifted performer.","Is a talented artist.","Is a flair for dramatic reading and acting.","Enjoys sharing their musical talent with the class.","Discusses ideas that they’ve read regularly.","Enjoys showing off their musical abilities to the rest of the class.","Reads every day for pleasure.","Has a firm grasp of their interests.","Has a neat hobby that they shared with the rest of the class.","Has a wide range of interests.","Independently seeks out additional information on classroom topics.","Is a fantastic performer.","Is a gifted musician.","possesses a witty sense of humor."],U=["is an enthusiastic learner who seems to enjoy school.","exhibits a positive outlook and attitude in the classroom.","appears well rested and ready for each day's activities.","shows enthusiasm for classroom activities.","shows initiative and looks for new ways to get involved.","uses instincts to deal with matters independently and in a positive way.","strives to reach their full potential.","is committed to doing their best.","seeks new challenges.","takes responsibility for their learning.","cooperates consistently with the teacher and other students.","transitions easily between classroom activities without distraction.","is courteous and shows good manners in the classroom.","follows classroom rules.","conducts themselves with maturity.","responds appropriately when corrected.","remains focused on the activity at hand.","resists the urge to be distracted by other students.","is kind and helpful to everyone in the classroom.","sets an example of excellence in behavior and cooperation.","shows respect for teachers and peers.","treats school property and the belongings of others with care and respect.","is honest and trustworthy in dealings with others.","displays good citizenship by assisting other students.","joins in school community projects.","is concerned about the feelings of peers.","faithfully performs classroom tasks.","can be depended on to do what they are asked to do.","seeks responsibilities and follows through.","is thoughtful in interactions with others.","is kind, respectful and helpful when interacting with peers","is respectful of other students in our classroom and the school community","demonstrates responsibility daily by caring for the materials in our classroom carefully and thoughtfully","takes  classroom jobs seriously and demonstrates responsibility when completing them","is always honest and can be counted on to recount information when asked","is considerate when interacting with  teachers","demonstrates manners on a daily basis and is always respectful","has incredible self-discipline and always gets work done in a timely manner","can be counted on to be one of the first students to begin working on the task that is given","perseveres when faced with difficulty by asking questions and trying best","does not give up when facing a task that is difficult and always does best","is such a caring and demonstrates concern for peers","demonstrates caring nature when helping peers when they need the assistance","is a model citizen in our classroom","is demonstrates citizenship in our classroom by helping to keep it clean and taking care of the materials in it","can always be counted on to cooperate with peers","is able to cooperate and work well with any of the other students in the class","is exceptionally organized and takes care of things","is always enthusiastic when completing work","is agreeable and polite when working with others","is thoughtful and kind in interactions with others","is creative when problem solving","is very hardworking and always completes all of work","is patient and kind when working with peers who need extra assistance","trustworthy and can always be counted on to step in and help where needed"];function V({open:s,setOpen:b,id:k}){const{schoolSessionDispatch:t}=T.useContext(D),m=H(),v={conduct:"",interest:"",teachersComments:"",headteachersComments:""},d=()=>b(!1),{mutateAsync:x,isPending:g}=E({mutationfn:W}),y=n=>{x({_id:k,comments:n},{onSettled:()=>{m.invalidateQueries(["student-records"]),m.invalidateQueries(["exams-scores"])},onSuccess:i=>{t(M(i)),d()},onError:i=>{t(N(i))}})};return e.jsx(z,{initialValues:v,onSubmit:y,children:({values:n,setFieldValue:h,errors:i,touched:j,handleSubmit:A})=>e.jsxs(O,{open:s,onClose:d,maxWidth:"sm",fullWidth:!0,className:"add-remark",children:[e.jsx(Y,{title:"Add Remarks",onClose:d}),e.jsx(L,{children:e.jsxs(o,{spacing:2,paddingY:2,children:[e.jsx(u,{freeSolo:!0,options:K,getOptionLabel:a=>a||"",value:n.interest,onChange:(a,c)=>h("interest",c),renderInput:a=>e.jsx(f,{...a,label:"Interest",size:"small",error:!!i.interest,helperText:j.interest&&i.interest})}),e.jsx(u,{freeSolo:!0,options:U,getOptionLabel:a=>a||"",value:n.conduct,onChange:(a,c)=>h("conduct",c),renderInput:a=>e.jsx(f,{...a,label:"Conduct",size:"small",error:!!i.conduct,helperText:j.conduct&&i.conduct})}),e.jsx(u,{freeSolo:!0,options:R,getOptionLabel:a=>a||"",value:n.teachersComments,onChange:(a,c)=>h("teachersComments",c),renderInput:a=>e.jsx(f,{...a,label:"Teacher's Comments",size:"small",error:!!i.teachersComments,helperText:j.teachersComments&&i.teachersComments})}),e.jsx(u,{freeSolo:!0,options:R,getOptionLabel:a=>a||"",value:n.headteachersComments,onChange:(a,c)=>h("headteachersComments",c),renderInput:a=>e.jsx(f,{...a,label:"Headteacher's Comments",size:"small",error:!!i.headteachersComments,helperText:j.headteachersComments&&i.headteachersComments})})]})}),e.jsx(F,{sx:{padding:2},children:e.jsx(G,{loading:g,variant:"contained",onClick:A,children:"Save Changes"})})]})})}function te({student:s,style:b,ref:k}){var x,g,y,n;const t=JSON.parse(localStorage.getItem("@school_info")),{palette:m}=B(),[v,d]=T.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsxs(o,{ref:k,spacing:1,sx:{...b,maxWidth:"8.5in",minHeight:"11in",margin:"auto",padding:"16px",border:"1px solid lightgray"},children:[e.jsxs(o,{direction:"row",justifyContent:"center",alignItems:"center",children:[t!=null&&t.badge?e.jsx(C,{alt:"school logo",loading:"lazy",srcSet:`/images/users/${t==null?void 0:t.badge}`,sx:{width:70,height:70}}):e.jsx(S,{sx:{width:50,height:50}}),e.jsxs(o,{justifyContent:"center",alignItems:"center",flexGrow:1,children:[e.jsx(l,{variant:"h4",color:"primary",children:P.startCase(t==null?void 0:t.name)}),e.jsx(l,{variant:"caption",children:t==null?void 0:t.address}),e.jsx(l,{variant:"caption",children:t==null?void 0:t.location}),e.jsx(l,{variant:"caption",fontStyle:"italic",children:t==null?void 0:t.motto}),e.jsx(l,{variant:"caption",fontStyle:"italic",children:t==null?void 0:t.phonenumber})]}),t!=null&&t.badge?e.jsx(C,{alt:"school logo",loading:"lazy",srcSet:`/images/users/${t==null?void 0:t.badge}`,sx:{width:70,height:70}}):e.jsx(S,{sx:{width:50,height:50}})]}),e.jsx(l,{sx:{textAlign:"center",borderTop:`solid 2px ${m.secondary.main}`,bgcolor:"primary.main",color:"primary.contrastText",width:"100%",padding:"4px"},variant:"body2",children:"Report Card"}),e.jsx(o,{justifyContent:"center",alignItems:"center",children:e.jsx(C,{src:(s==null?void 0:s.profile)===""||(s==null?void 0:s.profile)===void 0||(s==null?void 0:s.profile)===null?null:s==null?void 0:s.profile,sx:{width:60,height:60,alignSelf:"center"}})}),e.jsxs(p,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(p,{children:e.jsxs(o,{children:[e.jsx(r,{title:"ID",text:s==null?void 0:s.indexnumber}),e.jsx(r,{title:"Full Name",text:s==null?void 0:s.fullName}),e.jsx(r,{title:"Class",text:`${s==null?void 0:s.level}`}),e.jsx(r,{title:"No. On Roll",text:s==null?void 0:s.rollNumber}),e.jsx(r,{title:"Grade",text:s==null?void 0:s.grade}),e.jsx(r,{title:"Promoted",text:""})]})}),e.jsxs(p,{sx:{flexGrow:1,alignItems:"center",textAlign:"center"},children:[e.jsx("p",{children:"Position"}),e.jsx(l,{variant:"h5",color:"error",children:s==null?void 0:s.position})]}),e.jsx(p,{children:e.jsxs(o,{children:[e.jsx(r,{title:"Academic Year",text:s==null?void 0:s.academicYear}),e.jsx(r,{title:"Term/Semester",text:s==null?void 0:s.term}),e.jsx(r,{title:"Vacation Date",text:I(s==null?void 0:s.vacationDate).format("Do MMMM,YYYY")}),e.jsx(r,{title:"Reopening Date",text:I(s==null?void 0:s.reOpeningDate).format("Do MMMM,YYYY")})]})})]}),e.jsx(o,{children:e.jsxs("table",{style:{textAlign:"center",borderCollapse:"collapse"},border:"1",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Subject"}),e.jsx("th",{children:" Class Score (50%)"}),e.jsx("th",{children:" Exams Score (50%)"}),e.jsx("th",{children:"Total Score (100%)"}),e.jsx("th",{children:"Grade"}),e.jsx("th",{children:"Remarks"})]})}),e.jsx("tbody",{children:(s==null?void 0:s.scores)!==void 0?(s==null?void 0:s.scores.length)!==0&&(s==null?void 0:s.scores.map(h=>e.jsx($,{item:h},h.subject))):e.jsx("tr",{children:e.jsx("td",{colSpan:"7",style:{padding:"3px 1px",fontSize:"20px"},children:"No Student Record Available"})})}),e.jsx("tfoot",{style:{textAlign:"center",textDecoration:"underline",borderTop:`solid 5px ${m.secondary.main}`,bgcolor:"primary.main",color:"primary.contrastText",width:"100%",padding:1},children:e.jsxs("tr",{children:[e.jsx("th",{children:"Overall Score"}),e.jsx("th",{}),e.jsx("th",{}),e.jsx("th",{children:s==null?void 0:s.overallScore}),e.jsx("th",{}),e.jsx("th",{}),e.jsx("th",{})]})})]})}),e.jsx(p,{sx:{flex:1},children:e.jsxs(o,{rowGap:1,children:[e.jsxs(o,{direction:"row",justifyContent:"flex-end",columnGap:6,spacing:6,pt:1,pr:8,children:[e.jsx(r,{title:"Attendance  ",text:"    "}),e.jsx(r,{title:"Out Of           ",text:"       "})]}),e.jsxs(o,{children:[e.jsx(w,{title:"Conduct & Attitude",text:((x=s==null?void 0:s.comments)==null?void 0:x.conduct)||"Hardworking"}),e.jsx(w,{title:"Interest",text:((g=s==null?void 0:s.comments)==null?void 0:g.interest)||"Hardworking"}),e.jsx(w,{title:"Class Teacher's Remarks",text:((y=s==null?void 0:s.comments)==null?void 0:y.teachersComments)||"Excellent Performance Keep it up!"}),e.jsx(w,{title:"Headmaster's Remarks",text:((n=s==null?void 0:s.comments)==null?void 0:n.headteachersComments)||"Good job done!"})]}),e.jsx(Q,{className:"add-remarks-btn",onClick:()=>d(!0),sx:{cursor:"pointer"},children:"Add Remarks"})]})}),e.jsx(q,{}),e.jsxs(o,{justifyContent:"center",alignItems:"center",children:[e.jsx(l,{children:"Bill"}),e.jsxs("table",{width:"60%",border:"1",style:{borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Item"}),e.jsx("th",{children:"GHS"}),e.jsx("th",{children:"GHP"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{style:{paddingLeft:"5px",fontSize:"13px"},children:"Tuition Fee"}),e.jsx("td",{}),e.jsx("td",{})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{paddingLeft:"5px",fontSize:"13px"},children:"Others"}),e.jsx("td",{}),e.jsx("td",{})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{paddingLeft:"5px",fontSize:"13px"},children:"Arrears"}),e.jsx("td",{}),e.jsx("td",{})]})]}),e.jsx("tfoot",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Total"}),e.jsx("th",{}),e.jsx("th",{})]})})]})]}),e.jsx(l,{style:{fontSize:"10px",fontStyle:"italic"},children:"Powered by FrebbyTech Consults (0543772591)"})]}),e.jsx(V,{open:v,setOpen:d,id:s==null?void 0:s._id})]})}export{te as R};
