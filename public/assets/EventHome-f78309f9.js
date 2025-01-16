import{u as C,r as d,S,b as f,c as x,d as y,j as s,C as b,e as w,f as j,_ as B,g as A,h as D,a5 as M,a6 as T}from"./index-ce442eb1.js";import{E as _}from"./images-ee905b8b.js";import{C as k}from"./CustomizedMaterialTable-06b57d17.js";import{E as q}from"./sessionColumns-a7ba1da8.js";import"./TabPanel-47a179c1.js";import"./Toolbar-8b116404.js";import"./Chip-15117b24.js";import"./Autocomplete-87c4b1e1.js";import"./Skeleton-b715010d.js";import"./ButtonGroup-ca857561.js";import"./ListItemText-b107adf9.js";import"./InputAdornment-92a613d9.js";import"./DialogActions-c9d7df2e.js";import"./ListItemSecondaryAction-660d9daa.js";import"./useMediaQuery-5bcb3f64.js";import"./ListItem-2727fabf.js";import"./listItemButtonClasses-c7063ebe.js";import"./ListItemButton-97ec9750.js";import"./Check-4cc8eef7.js";import"./DeleteOutline-78b9d3f1.js";import"./Delete-fb41f478.js";import"./currencyFormatter-1910a788.js";import"./CircleRounded-06f2dceb.js";import"./Edit-009e8578.js";function se(){const t=C(),[c,a]=d.useState([]),{schoolSessionDispatch:i}=d.useContext(S),l=f(),n=x({queryKey:["events"],queryFn:()=>M(),initialData:[]}),m=e=>{t(`/events/${e}?redirect_to=/events`,{state:{prevPath:"/events"}})},u=e=>{t(`/events/${e}/edit`)},p=e=>{a(e)},v=e=>{a([{_id:e}]),r()},{mutateAsync:h,isLoading:E}=y({mutationFn:T}),r=()=>{j.fire({title:"Removing Events",text:"You are about to remove the selected events.Changes cannot be undone.",showCancelButton:!0}).then(({isConfirmed:e})=>{const g=B.map(c,"_id");e&&h({events:g},{onSettled:()=>{l.invalidateQueries(["events"])},onSuccess:o=>{i(A(o))},onError:o=>{i(D(o))}})})};return s.jsxs(b,{children:[s.jsx(w,{title:"Events",subtitle:"Schedule and manage school events to ensure everyone stays informed and engaged.",color:"text.main",backColor:"#012e54"}),s.jsx(k,{isLoading:n.isLoading||E,columns:q(m,u,v),data:n.data,handleRefresh:n.refetch,actions:[],showAddButton:!0,addButtonImg:_.sms,addButtonText:"New Event",addButtonMessage:"😑 Send your first Event with just a button click !!!!",onAddButtonClicked:()=>t("new"),options:{search:!0},onSelectionChange:p,onDeleteClicked:r})]})}export{se as default};
