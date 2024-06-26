import{r as m,U as y,S as g,u as C,h as f,j as s,i as I,C as R,l as L,F as T,a1 as B,m as E,T as b,v as k,w as F,x as Q,bL as _,bU as A,g as N,bM as U,ai as z,a2 as h,E as O,q,G as v,a4 as M,B as G}from"./index-c7bc4969.js";import{d as V}from"./School-fe0e2d8e.js";import{b as W}from"./studentColumns-19658f10.js";import{u as Y,i as $}from"./ExaminationAPI-f55359a2.js";import K from"./LevelExamScoreInput-d5cb23be.js";import{g as H}from"./generateCustomGrade-93281c1e.js";import{B as J}from"./BookSharp-2025dd7c.js";import"./AnimatedContainer-e139da34.js";import"./NoteRounded-7b8c486a.js";function P(){const{userState:{session:r}}=m.useContext(y),{schoolSessionState:{addStudentResults:{open:e,data:x,grade:l}},schoolSessionDispatch:c}=m.useContext(g),i=C(),{mutateAsync:p,isLoading:S}=f({mutationFn:Y}),j=o=>{const t=Number(o.classScore)+Number(o.examsScore),a=H(t,l),d={session:{sessionId:r==null?void 0:r.sessionId,termId:r==null?void 0:r.termId,levelId:r==null?void 0:r.levelId,studentId:o==null?void 0:o._id},scores:[{subject:o==null?void 0:o.subject,classScore:o==null?void 0:o.classScore,examsScore:o==null?void 0:o.examsScore,...a}]};p(d,{onSettled:()=>{i.invalidateQueries(["student-records"]),i.invalidateQueries(["exams-scores"]),i.invalidateQueries(["exams-details"]),i.invalidateQueries(["exams-reports"]),i.invalidateQueries(["exams-by-id"]),i.invalidateQueries(["subject-score"])},onSuccess:u=>{c(F(u)),n()},onError:u=>{c(Q(u))}})},n=()=>{c({type:"addStudentResults",payload:{open:!1,data:{_id:"",level:"",classScore:"",examsScore:"",totalScore:"",grade:"",remarks:""},grade:l}})};return s.jsxs(I,{open:e,onClose:n,fullWidth:!0,maxWidth:"xs",children:[s.jsx(R,{title:"New Level",onClose:n}),s.jsx(L,{children:s.jsx(T,{initialValues:x,validationSchema:B,onSubmit:j,children:({values:o,errors:t,touched:a,handleChange:d,handleSubmit:u})=>s.jsx(s.Fragment,{children:s.jsxs(E,{spacing:2,paddingY:2,children:[s.jsx(b,{label:"Subject",size:"small",value:o.subject,onChange:d("subject"),error:!!t.subject,helperText:a.subject&&t.subject}),s.jsx(b,{type:"number",label:"Class Score",size:"small",value:o.classScore,onChange:d("classScore"),error:!!t.classScore,helperText:a.classScore&&t.classScore}),s.jsx(b,{type:"number",label:"Exams Score",size:"small",value:o.examsScore,onChange:d("examsScore"),error:!!t.examsScore,helperText:a.examsScore&&t.examsScore}),s.jsx(k,{loading:S,variant:"contained",size:"small",onClick:u,children:"Save Results"})]})})})})]})}function re(){const{schoolSessionDispatch:r}=m.useContext(g),{state:e}=_(),[x,l]=m.useState(!1),{gradeSystem:c}=A(e==null?void 0:e.id),i=N({queryKey:["subject-score",e==null?void 0:e.id,e==null?void 0:e.subject],queryFn:()=>$({id:e==null?void 0:e.id,subject:e==null?void 0:e.subject}),enabled:!!(e!=null&&e.id)&&!!(e!=null&&e.subject)}),p=()=>{l(!0)},S=n=>{console.log(n),r({type:"addStudentResults",payload:{open:!0,data:{_id:n==null?void 0:n._id,indexnumber:n==null?void 0:n.indexnumber,levelId:e==null?void 0:e.id,...n==null?void 0:n.course},grade:c}})};if(!(e!=null&&e.id)||!(e!=null&&e.subject))return s.jsx(U,{to:"/course/assign"});const j=[...W,{field:null,title:"Action",render:n=>s.jsx(G,{variant:"outlined",onClick:()=>S(n),children:"Add Results"})}];return s.jsxs(s.Fragment,{children:[s.jsx(z,{to:"/course/assign",color:"primary.main"}),s.jsxs(h,{sx:{display:"flex",flexDirection:{xs:"column-reverse",sm:"row"},justifyContent:"space-between",alignItems:"center",gap:2,paddingY:4},children:[s.jsx(O,{title:"Current Level ",subtitle:"  Track,manage and control academic and class activities",icon:s.jsx(V,{color:"inherit",sx:{width:50,height:50}}),color:"primary.main"}),s.jsx(q,{sx:{display:{xs:"none",md:"inline-flex"}},variant:"h5",paragraph:!0,whiteSpace:"nowrap",children:e==null?void 0:e.type})]}),s.jsx(h,{children:s.jsx(v,{search:!0,isLoading:i.isLoading,title:e==null?void 0:e.type,subtitle:e==null?void 0:e.subject,exportFileName:`${e==null?void 0:e.type}-${e==null?void 0:e.subject}`||"",columns:j,data:i.data,actions:[{icon:()=>s.jsx(J,{color:"warning"}),position:"toolbar",tooltip:"Import Results",onClick:p,isFreeAction:!0}],icon:M,handleRefresh:i==null?void 0:i.refetch})}),s.jsx(K,{open:x,setOpen:l,grades:c,defaultSubject:e==null?void 0:e.subject,classLevelId:e==null?void 0:e.id}),s.jsx(P,{})]})}export{re as default};
