import{u as j,a as B,r as h,S as P,b as T,c as I,d as l,j as o,C as _,e as F,f as c,g as d,h as m,_ as O}from"./index-B8PQHtjc.js";import{s as S}from"./session_ico-C_mTk6NS.js";import{S as R}from"./sessionColumns-oq904N9H.js";import{d as N,a as Q,b as G,g as q}from"./termAPI-1V1q_gIm.js";import{C as Y}from"./CustomizedMaterialTable-BQoTtwVw.js";import{E as L}from"./images-B5fNBSni.js";import{G as z}from"./GlobalSpinner-DbblD88Y.js";import"./currencyFormatter-DjBDW3hY.js";import"./CircleRounded-YWo57tpF.js";import"./ListItemText-DzMM1D1F.js";import"./Chip-DmEpgF7y.js";import"./TabPanel-WHfZdNAn.js";import"./useThemeProps-CEPKeDia.js";import"./Toolbar-YM__bEFh.js";import"./Autocomplete-Dw57Ihk7.js";import"./Skeleton-DWRiBFRT.js";import"./ButtonGroup-ZC3qSltg.js";import"./InputAdornment-DAOlZ4uj.js";import"./index-BqG4A_N5.js";import"./DialogActions-BmNk8sop.js";import"./ListItem-CQImyTSy.js";import"./ListItemSecondaryAction-DOVMjMKm.js";import"./listItemButtonClasses-DySKLRoc.js";import"./Grid2-B2FVLpOz.js";import"./Link-kLE4_HTq.js";import"./ListItemButton-Di0YOqWQ.js";import"./Check-JB41DPzl.js";import"./DeleteOutline-BlPFLwFk.js";const Ce=()=>{const f=j(),[H,y]=B(),{schoolSessionDispatch:n}=h.useContext(P),a=T(),[g,b]=h.useState([]),i=I({queryKey:["terms"],queryFn:()=>q(),initialData:[]}),{mutateAsync:w}=l({mutationFn:N}),u=e=>{c.fire({title:"Removing Session",html:` <div style='text-align:left;display:flex;flex-direction:column;gap:8px;'>
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
        </div>`,showCancelButton:!0,backdrop:"rgba(0,0,0,0.2)"}).then(({isConfirmed:t})=>{t&&w(e,{onSettled:()=>{a.invalidateQueries(["terms"])},onSuccess:s=>{n(d(s))},onError:s=>{n(m(s))}})})},C=e=>{b(e)},{mutateAsync:x,isPending:v}=l({mutationFn:Q}),E=()=>{c.fire({title:"Removing Session",text:"You are about to remove the selected sessions. Removing session will delete all of its related content.Changes cannot be undone. Do you want to remove?",showCancelButton:!0,backdrop:!1}).then(({isConfirmed:e})=>{const t=O.map(g,"termId");e&&x(t,{onSettled:()=>{a.invalidateQueries(["terms"])},onSuccess:s=>{n(d(s))},onError:s=>{n(m(s))}})})},A=e=>{f(`/session/${e==null?void 0:e.termId}`)},p=e=>{y(t=>(t.set("_id",e==null?void 0:e.termId),t.set("edit_session",!0),t))},D=()=>{n({type:"displayAddSession",payload:!0})},{mutateAsync:M}=l({mutationFn:G}),k=({_id:e,active:t})=>{c.fire({title:t?"Do you want to disable this session":"Do you want to enable this session",text:t?"Disabling Session":"Enabling Session",showCancelButton:!0,backdrop:!1}).then(s=>{s.isConfirmed&&M({_id:e,active:!t},{onSuccess:r=>{a.invalidateQueries(["terms"]),n(d(r))},onError:r=>{n(m(r))}})})};return o.jsxs(o.Fragment,{children:[o.jsxs(_,{children:[o.jsx(F,{title:"School Session",subtitle:"Create, update, and oversee academic sessions to ensure smooth academic operations",img:S,color:"primary.main"}),o.jsx(o.Fragment,{children:o.jsx(Y,{title:"Sessions",icon:S,isPending:i.isPending,columns:R(k,A,p,u),data:i.data?i.data:[],actions:[],showRowShadow:!1,handleEdit:p,handleDelete:u,addButtonImg:L.session,addButtonMessage:"😑 No School Session available!.Create a new one!",showAddButton:!0,addButtonText:"New Session",onAddButtonClicked:D,handleRefresh:i.refetch,onSelectionChange:C,onDeleteClicked:E,options:{search:!0}})})]}),v&&o.jsx(z,{})]})};export{Ce as default};
