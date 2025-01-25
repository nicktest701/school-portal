import{r as j,a1 as F,b as D,S as V,c as N,d as A,fU as le,j as e,t as P,v as _,x as R,fV as Y,w as B,k as I,T as L,B as W,H as Q,_ as $,h as b,g as z,E as ie,aK as re,fW as ae,u as ce,eN as de,fX as me,fY as pe,P as G,f as E,e as he,l as ue,D as xe}from"./index-B8PQHtjc.js";import{C as ve}from"./Class-Csp5ZS6g.js";import{S as fe,P as ge}from"./Subject-BeyzE3HS.js";import{L as U,i as K,j as ye,k as je}from"./sessionColumns-oq904N9H.js";import{u as q}from"./useLevel-K9fH0Cop.js";import{l as Ce}from"./initialValues-Dm2HlPlg.js";import{b as X}from"./teacherAPI-DE1r2ugK.js";import{A as w}from"./Autocomplete-Dw57Ihk7.js";import{D as J}from"./DialogActions-BmNk8sop.js";import{C as Se}from"./CustomizedMaterialTable-BQoTtwVw.js";import{E as Le}from"./images-B5fNBSni.js";import{L as M}from"./ListItemText-DzMM1D1F.js";import{G as we}from"./GlobalSpinner-DbblD88Y.js";import{L as H}from"./Link-kLE4_HTq.js";import{D as k}from"./DashboardCard-JF-6co28.js";import"./currencyFormatter-DjBDW3hY.js";import"./CircleRounded-YWo57tpF.js";import"./Chip-DmEpgF7y.js";import"./TabPanel-WHfZdNAn.js";import"./useThemeProps-CEPKeDia.js";import"./Toolbar-YM__bEFh.js";import"./Skeleton-DWRiBFRT.js";import"./ButtonGroup-ZC3qSltg.js";import"./InputAdornment-DAOlZ4uj.js";import"./index-BqG4A_N5.js";import"./ListItem-CQImyTSy.js";import"./ListItemSecondaryAction-DOVMjMKm.js";import"./listItemButtonClasses-DySKLRoc.js";import"./Grid2-B2FVLpOz.js";import"./ListItemButton-Di0YOqWQ.js";import"./Check-JB41DPzl.js";import"./DeleteOutline-BlPFLwFk.js";const be=({open:r,setOpen:i})=>{const{userState:{session:x}}=j.useContext(F),o=D(),{schoolSessionDispatch:c}=j.useContext(V),{levelsOption:v}=q(),g=N({queryKey:["teachers"],queryFn:()=>X(),initialData:[],select:n=>n==null?void 0:n.map(l=>({_id:l==null?void 0:l._id,fullName:l==null?void 0:l.fullName}))}),{mutateAsync:C,isPending:y}=A({mutationFn:le}),S=(n,a)=>{const l=`${n.level}${n.type}`,f=v.find(({type:t})=>t===l.toUpperCase());if(!$.isEmpty(f)){c(b("Level already exists!!!")),a.setSubmitting(!1);return}const d={session:x.sessionId,term:x.termId,level:{name:n.level,type:n.type},teacher:n.teacher};C(d,{onSettled:()=>{a.setSubmitting(!1),o.invalidateQueries(["levels"])},onSuccess:t=>{c(z(t)),i(!1)},onError:t=>{c(b(t))}})};return e.jsxs(P,{open:r,onClose:()=>i(!1),fullWidth:!0,maxWidth:"xs",children:[e.jsx(_,{title:"New Level",onClose:()=>i(!1)}),e.jsx(R,{initialValues:Ce,onSubmit:S,validationSchema:Y,children:({values:n,errors:a,touched:l,handleSubmit:f,setFieldValue:d})=>e.jsxs(e.Fragment,{children:[e.jsx(B,{sx:{p:1},children:e.jsxs(I,{spacing:2,paddingY:2,children:[e.jsx(w,{freeSolo:!0,options:U,getOptionLabel:t=>t||"",value:n.level,onInputChange:(t,p)=>d("level",p),renderInput:t=>e.jsx(L,{...t,label:"Select Level",size:"small",error:!!(l.level&&a.level),helperText:l.level&&a.level})}),e.jsx(w,{freeSolo:!0,options:K,getOptionLabel:t=>t||"",value:n.type,onInputChange:(t,p)=>d("type",p),renderInput:t=>e.jsx(L,{...t,label:"Select Type",size:"small"})}),e.jsx(w,{options:g==null?void 0:g.data,loading:g.isPending,getOptionLabel:t=>(t==null?void 0:t.fullName)||"",value:n==null?void 0:n.teacher,onChange:(t,p)=>d("teacher",p),renderInput:t=>e.jsx(L,{...t,label:"Assign Teacher",size:"small"})})]})}),e.jsx(J,{sx:{padding:2},children:e.jsx(W,{loading:y,variant:"contained",onClick:f,children:"Add Level"})})]})}),y&&e.jsx(Q,{value:"Creating New Level. Please wait..."})]})},Z="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2048%2048'%3e%3cpath%20fill='%2342a5f5'%20d='M28,7c-2.209,0-4,1.79-4,4v25c-1.657,0-3,1.344-3,3c0,1.656,1.343,3,3,3c1.305,0,2.403-0.838,2.816-2c0.376,0,0.769,0,1.184,0h20V7H28z'/%3e%3cpath%20fill='%230d47a1'%20d='M28,15h8v2h-8V15z%20M36,19h-8v2h8V19z%20M28,25h8v-2h-8V25z%20M38,17h2v-2h-2V17z%20M40,19h-2v2h2V19z%20M44,19h-2v2h2V19z%20M42,25h2v-2h-2V25z%20M42,17h2v-2h-2V17z'/%3e%3cpath%20fill='%2390caf9'%20d='M20,40H0L0,7h20c2.209,0,4,1.79,4,4v29C24,40,22.209,40,20,40'/%3e%3cpath%20fill='%231976d2'%20d='M4,15h8v2H4V15z%20M12,19H4v2h8V19z%20M4,25h8v-2H4V25z%20M4,29h8v-2H4V29z%20M4,33h8v-2H4V33z%20M14,17h2v-2h-2V17z%20M16,19h-2v2h2V19z%20M20,19h-2v2h2V19z%20M18,25h2v-2h-2V25z%20M14,29h2v-2h-2V29z%20M18,17h2v-2h-2V17z%20M18,29h2v-2h-2V29z%20M18,33h2v-2h-2V33z'/%3e%3c/svg%3e";function Ie({viewProps:r,editProps:i,deleteProps:x,handleView:o,handleEdit:c,handleDelete:v}){return e.jsxs(I,{direction:"row",spacing:2,children:[o&&e.jsx(ye,{className:"ico",onClick:o,...r,sx:{color:"secondary.main !important"}}),c&&e.jsx(ie,{className:"ico",onClick:c,...i}),v&&e.jsx(re,{className:"ico",onClick:v,...x})]})}const Me=()=>{const r=D(),{schoolSessionState:{editLevel:{open:i,data:x}},schoolSessionDispatch:o}=j.useContext(V),{levelsOption:c}=q(),v=N({queryKey:["teachers"],queryFn:()=>X(),select:n=>n==null?void 0:n.map(l=>({_id:l==null?void 0:l._id,fullName:l==null?void 0:l.fullName}))}),{mutateAsync:g,isPending:C}=A({mutationFn:ae}),y=(n,a)=>{const l=`${n.level}${n.type}`,f=c.find(({type:t})=>t===l.toUpperCase());if(!$.isEmpty(f)){o(b("Level already exists!!!")),a.setSubmitting(!1);return}const d={_id:n==null?void 0:n._id,level:{name:n.level,type:n.type},teacher:n.teacher};console.log(d),g(d,{onSettled:()=>{a.setSubmitting(!1),r.invalidateQueries(["levels"])},onSuccess:t=>{o(z(t)),S()},onError:t=>{o(b(t))}})},S=()=>{o({type:"editLevel",payload:{open:!1,data:{}}})};return e.jsxs(P,{open:i,onClose:S,fullWidth:!0,maxWidth:"xs",children:[e.jsx(_,{title:"Edit Level",onClose:S}),e.jsx(R,{initialValues:x,onSubmit:y,validationSchema:Y,enableReinitialize:!0,children:({values:n,errors:a,touched:l,handleSubmit:f,setFieldValue:d})=>e.jsxs(e.Fragment,{children:[e.jsx(B,{children:e.jsxs(I,{spacing:2,paddingY:2,children:[e.jsx(w,{freeSolo:!0,options:U,getOptionLabel:t=>t||"",value:(n==null?void 0:n.level)||"",onInputChange:(t,p)=>d("level",p),renderInput:t=>e.jsx(L,{...t,label:"Level",size:"small",error:!!(l.level&&a.level),helperText:l.level&&a.level})}),e.jsx(w,{freeSolo:!0,options:K,getOptionLabel:t=>t||"",value:(n==null?void 0:n.type)||"",onInputChange:(t,p)=>d("type",p),renderInput:t=>e.jsx(L,{...t,label:"type",size:"small"})}),e.jsx(w,{options:v.data,loading:v.isPending,getOptionLabel:t=>(t==null?void 0:t.fullName)||"",defaultValue:n==null?void 0:n.teacher,value:n==null?void 0:n.teacher,onChange:(t,p)=>d("teacher",p),renderInput:t=>e.jsx(L,{...t,label:"Assign Teacher",size:"small"})})]})}),e.jsx(J,{sx:{padding:2},children:e.jsx(W,{loading:C,variant:"contained",onClick:f,children:"Save Changes"})})]})}),C&&e.jsx(Q,{value:"Saving Changes..."})]})};function Ae(){var c;const{schoolSessionState:{viewLevel:{open:r,data:i}},schoolSessionDispatch:x}=j.useContext(V),o=()=>{x({type:"viewLevel",payload:{open:!1,data:{}}})};return e.jsxs(P,{open:r,onClose:o,fullWidth:!0,maxWidth:"xs",children:[e.jsx(_,{title:"Basic 1A Information",onClose:o}),e.jsx(B,{children:e.jsxs(I,{spacing:2,children:[e.jsx(M,{secondary:"Level",primary:i==null?void 0:i.type}),e.jsx(M,{secondary:"Number Of Students",primary:i==null?void 0:i.noOfStudents}),e.jsx(M,{secondary:"Number of Courses ",primary:i==null?void 0:i.noOfSubjects}),e.jsx(M,{secondary:"Class Teacher",primary:((c=i==null?void 0:i.teacher)==null?void 0:c.fullName)||"Not Assigned Yet"})]})})]})}const ze=()=>{const{schoolSessionDispatch:r}=j.useContext(V),[i,x]=j.useState([]),{userState:{session:o}}=j.useContext(F),c=ce(),v=D(),[g,C]=j.useState(!1),y=N({queryKey:["levels",o.sessionId,o.termId],queryFn:()=>de(o.sessionId,o.termId),enabled:!!o.sessionId&&!!(o!=null&&o.termId),initialData:[],select:s=>s==null?void 0:s.map(({_id:h,level:m,students:T,subjects:O,teacher:oe})=>({_id:h,level:m,type:`${m==null?void 0:m.name}${m==null?void 0:m.type}`,noOfStudents:T==null?void 0:T.length,noOfSubjects:O==null?void 0:O.length,teacher:oe}))}),{mutateAsync:S,isPending:n}=A({mutationFn:me}),a=s=>{const u={id:s,sessionId:o==null?void 0:o.sessionId,termId:o==null?void 0:o.termId};E.fire({title:"Removing Level",html:` <div style='text-align:left;display:flex;flex-direction:column;gap:8px;'>
      <p>  You are about to delete a level. This action is irreversible and will permanently remove all associated data,including:</p>
        <ul style='padding-block:8px;'>
   <li style='font-weight:bold;'>Class schedules</li>
  <li style='font-weight:bold;'>Student enrollments</li>
  <li style='font-weight:bold;'>Attendance records</li>
  <li style='font-weight:bold;'>Grades and assignments</li>
  <li style='font-weight:bold;'>Academic reports and records</li>
  </ul>
  
           <p>   Please proceed with caution. If you are certain you want to delete
              this academic year, click &apos;Confirm.&apos; Otherwise, click
              &apos;Cancel&apos; to keep the academic year intact.</p>
            <p style='color:var(--secondary);font-weight:bold;'>Are you sure you want to delete this level?</p>
          </div>`,showCancelButton:!0,backdrop:!1}).then(({isConfirmed:h})=>{h&&(E.showLoading(),S(u,{onSettled:()=>{v.invalidateQueries(["levels"])},onSuccess:m=>{r(z(m))},onError:m=>{r(b(m))}}))})},l=s=>{x(s)},{mutateAsync:f,isPending:d}=A({mutationFn:pe}),t=()=>{E.fire({title:"Removing Session",text:"You are about to remove the selected sessions. Removing session will delete all of its related content.Changes cannot be undone. Do you want to remove?",showCancelButton:!0,backdrop:!1}).then(({isConfirmed:s})=>{const u=$.map(i,"termId");s&&f(u,{onSettled:()=>{v.invalidateQueries(["terms"])},onSuccess:h=>{r(z(h))},onError:h=>{r(b(h))}})})},p=s=>{var h,m;const u={_id:s==null?void 0:s._id,level:(h=s==null?void 0:s.level)==null?void 0:h.name,type:(m=s==null?void 0:s.level)==null?void 0:m.type,teacher:s==null?void 0:s.teacher};r({type:"editLevel",payload:{open:!0,data:u}})},ee=({_id:s,type:u})=>{const h=encodeURIComponent(u);c(`/level/course?_id=${s}&type=${h}`)},te=({_id:s,type:u})=>{c(`/level/current/${s}/${u}`,{replace:!0,state:{levelId:s,levelName:u}})},ne=s=>{r({type:"viewLevel",payload:{open:!0,data:s}})},se=[...je,{field:null,title:"Class",width:"40%",render:s=>e.jsxs(I,{direction:"row",spacing:5,children:[e.jsx(H,{sx:{cursor:"pointer"},onClick:()=>te(s),children:"Go to Class"}),e.jsx(H,{sx:{cursor:"pointer"},onClick:()=>ee(s),children:"Add Subjects"})]})},{field:null,title:"Action",render:s=>e.jsx(Ie,{viewProps:{title:"View level information",titleAccess:"View level information"},editProps:{title:"Edit level information",titleAccess:"Edit level information"},deleteProps:{title:"Delete level information",titleAccess:"Delete level information"},handleView:()=>ne(s),handleEdit:()=>p(s),handleDelete:()=>a(s==null?void 0:s._id)})}];return e.jsxs(G,{pt:2,children:[e.jsx(Se,{title:"Levels",icon:Z,search:!0,isPending:y.isPending,columns:se,data:y.data,actions:[],showAddButton:!0,addButtonText:"New Level",addButtonImg:Le.level,addButtonMessage:"😑 Oops! It seems you don't have any level at the moment.Create a new one",onAddButtonClicked:()=>C(!0),handleRefresh:y.refetch,onSelectionChange:l,onDeleteClicked:t}),e.jsx(Ae,{}),e.jsx(be,{open:g,setOpen:C}),e.jsx(Me,{}),(n||d)&&e.jsx(we,{})]})},at=()=>{const{levelSummary:r}=q();return e.jsxs(e.Fragment,{children:[e.jsx(he,{title:"School Levels & Subjects",subtitle:"Organize and manage different educational levels to streamline curriculum and student progress tracking.",img:Z,color:"primary.main"}),e.jsx(ue,{variant:"h5",py:2,children:"Level Details"}),e.jsx(xe,{}),e.jsxs(G,{sx:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:2,py:2},children:[e.jsx(k,{title:"Levels",value:r.noOfLevels,icon:e.jsx(fe,{sx:{width:30,height:30,color:"secondary.main"}})}),e.jsx(k,{title:"Courses Offered",value:r.noOfSubjects,icon:e.jsx(ve,{sx:{width:30,height:30,color:"secondary.main"}})}),e.jsx(k,{title:"Assigned Teachers",value:r.noOfAssignedTeachers,icon:e.jsx(ge,{sx:{width:30,height:30,color:"secondary.main"}})})]}),e.jsx(ze,{})]})};export{at as default};
