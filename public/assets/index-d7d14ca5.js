import{r as i,S as O,u as M,a2 as D,h as v,j as e,i as L,y as R,C as z,F as P,l as Q,m as k,T as F,aZ as j,q as N,D as V,t as _,v as q,w as T,x as A,a_ as G,aD as W,a$ as $,aK as H,g as K,a4 as J,G as U,b0 as B,J as Z,b1 as X,M as ee,b2 as te,N as Y,_ as se}from"./index-e0c0d8c9.js";import{p as ae,a as ne,g as oe,d as ie,b as le,c as re}from"./termAPI-d812cd0b.js";import{s as de}from"./initialValues-cd101ecd.js";import{C as I}from"./CustomYearPicker-1c2cc53d.js";const ce=()=>{const{schoolSessionState:{editSession:{open:l,data:s}},schoolSessionDispatch:c}=i.useContext(O),x=M(),[d,u]=i.useState(null),[m,S]=i.useState(null),[g,h]=i.useState(null),[f,p]=i.useState(null);i.useEffect(()=>{u(D(new Date(s.from))),S(D(new Date(s.to))),h(D(new Date(s.vacationDate))),p(D(new Date(s.reOpeningDate)))},[s]);const y={id:s.termId,from:d,to:m,vacationDate:g,reOpeningDate:f,academicYear:s.academicYear,term:s.term,session:s.sessionId},{mutateAsync:b,isLoading:C}=v({mutationFn:ae}),n=(t,o)=>{b(t,{onSettled:()=>{o.setSubmitting(!1),x.invalidateQueries(["terms"])},onSuccess:r=>{c(T(r)),a()},onError:r=>{c(A(r))}})},a=()=>{c({type:"editSession",payload:{open:!1,data:{}}})};return e.jsxs(L,{open:l,onClose:a,fullWidth:!0,maxWidth:"xs",TransitionComponent:R,children:[e.jsx(z,{title:"Edit Session",onClose:a}),e.jsx(P,{initialValues:y,onSubmit:n,enableReinitialize:!0,children:({values:t,touched:o,errors:r,handleChange:E,handleSubmit:w})=>e.jsxs(e.Fragment,{children:[e.jsx(Q,{children:e.jsxs(k,{spacing:2,paddingY:2,children:[e.jsx(F,{label:"Academic Year",InputProps:{readOnly:!0},value:t.academicYear,size:"small"}),e.jsx(j,{label:"Start of Academic Term",date:d,setDate:u,touched:o.from,error:r.from,readOnly:!0}),e.jsx(j,{label:"End of Academic Term",date:m,setDate:S,touched:o.to,error:r.to,readOnly:!0}),e.jsx(F,{label:"Term/Semester",size:"small",value:t.term,onChange:E("term"),InputProps:{readOnly:!0}}),e.jsx(N,{fontSize:13,children:"Vacation"}),e.jsx(j,{label:"Vacation Date",date:g,setDate:h}),e.jsx(j,{label:"Next Term Begins",date:f,setDate:p}),e.jsx(V,{})]})}),e.jsx(_,{sx:{padding:2},children:e.jsx(q,{loading:C,variant:"contained",onClick:w,children:C?"Please Wait..":"Save Changes"})})]})})]})},ue=()=>{const{schoolSessionState:l,schoolSessionDispatch:s}=i.useContext(O),c=M(),[x,d]=i.useState(D()),[u,m]=i.useState(D()),[S,g]=i.useState(""),[h,f]=i.useState(""),{mutateAsync:p,isLoading:y}=v({mutationFn:ne}),b=new Date().getFullYear(),C=(a,t)=>{a.academicYear=`${S||b}/${h||b}`,p(a,{onSettled:()=>{t.setSubmitting(!1),c.invalidateQueries(["terms"])},onSuccess:o=>{s(T(o)),n()},onError:o=>{s(A(o))}})};function n(){s({type:"displayAddSession",payload:!1})}return e.jsxs(L,{open:l.displayAddSession,fullWidth:!0,maxWidth:"xs",TransitionComponent:R,children:[e.jsx(z,{title:"Add Session",onClose:n}),e.jsx(P,{initialValues:{...de,from:x.format("l"),to:u.format("l")},onSubmit:C,validationSchema:G,enableReinitialize:!0,children:({values:a,errors:t,touched:o,handleChange:r,handleSubmit:E})=>e.jsxs(e.Fragment,{children:[e.jsx(Q,{children:e.jsxs(k,{spacing:2,paddingY:2,children:[e.jsx(W,{sx:{fontSize:13},children:"Academic Year"}),e.jsxs(k,{direction:"row",columnGap:2,children:[e.jsx(I,{label:"From",year:S,setYear:g}),e.jsx(I,{label:"To",year:h,setYear:f})]}),e.jsx(j,{label:"Start of Academic Term/Semester",date:x,setDate:d,touched:o.from,error:t.from}),e.jsx(j,{label:"End of Academic Term/Semester",date:u,setDate:m,touched:o.to,error:t.to}),e.jsx(F,{select:!0,label:"Term/Semester",size:"small",value:a.term,onChange:r("term"),error:!!(o.term&&t.term),helperText:o.term&&t.term,children:$.map(w=>e.jsx(H,{value:w,children:w},w))}),e.jsx(V,{})]})}),e.jsx(_,{sx:{padding:2},children:e.jsx(q,{loading:y,variant:"contained",onClick:E,children:y?"Saving":"Save"})})]})})]})},xe=()=>{const{schoolSessionDispatch:l}=i.useContext(O),s=M(),[c,x]=i.useState([]),d=K({queryKey:["terms"],queryFn:()=>oe(),initialData:[]}),{mutateAsync:u}=v({mutationFn:ie}),m=n=>{Y.fire({title:"Removing Session",html:` <div style='text-align:left;display:flex;flex-direction:column;gap:8px;'>
    <p>  You are about to delete an entire academic term. This action is irreversible and will permanently remove all associated data,including:</p>
      <ul style='padding-block:8px;'>
 <li style='font-weight:bold;'>Class schedules</li>
<li style='font-weight:bold;'>Student enrollments</li>
<li style='font-weight:bold;'>Attendance records</li>
<li style='font-weight:bold;'>Grades and assignments</li>
</ul>

         <p>   Please proceed with caution. If you are certain you want to delete
            this academic year, click &apos;Confirm.&apos; Otherwise, click
            &apos;Cancel&apos; to keep the academic year intact.</p>
          <p style='color:var(--secondary);font-weight:bold;'>Are you sure you want to delete this academic term?</p>
        </div>`,showCancelButton:!0,backdrop:"rgba(0,0,0,0.2)"}).then(({isConfirmed:a})=>{a&&u(n,{onSettled:()=>{s.invalidateQueries(["terms"])},onSuccess:t=>{l(T(t))},onError:t=>{l(A(t))}})})},S=n=>{x(n)},{mutateAsync:g,isLoading:h}=v({mutationFn:le}),f=()=>{Y.fire({title:"Removing Session",text:"You are about to remove the selected sessions. Removing session will delete all of its related content.Changes cannot be undone. Do you want to remove?",showCancelButton:!0,backdrop:!1}).then(({isConfirmed:n})=>{const a=se.map(c,"termId");n&&g(a,{onSettled:()=>{s.invalidateQueries(["terms"])},onSuccess:t=>{l(T(t))},onError:t=>{l(A(t))}})})},p=n=>{l({type:"editSession",payload:{open:!0,data:n}})},y=()=>{l({type:"displayAddSession",payload:!0})},{mutateAsync:b}=v({mutationFn:re}),C=({_id:n,active:a})=>{Y.fire({title:a?"Do you want to disable this session":"Do you want to enable this session",text:a?"Disabling Session":"Enabling Session",showCancelButton:!0,backdrop:!1}).then(t=>{t.isConfirmed&&b({_id:n,active:!a},{onSuccess:r=>{s.invalidateQueries(["terms"]),l(T(r))},onError:r=>{l(A(r))}})})};return e.jsxs(J,{children:[e.jsx(U,{title:"School Session",subtitle:"  Track,manage and control academic and class activities",img:B,color:"primary.main"}),e.jsxs(e.Fragment,{children:[e.jsx(Z,{title:"Sessions",icon:B,isLoading:d.isLoading,columns:X(C,p,m),data:d.data?d.data:[],actions:[],showRowShadow:!1,handleEdit:p,handleDelete:m,addButtonImg:ee.session,addButtonMessage:"😑 No School Session available!.Create a new one!",showAddButton:!0,addButtonText:"New Session",onAddButtonClicked:y,handleRefresh:d.refetch,onSelectionChange:S,onDeleteClicked:f,options:{search:!0}}),e.jsx(ue,{}),e.jsx(ce,{}),h&&e.jsx(te,{})]})]})};export{xe as default};
