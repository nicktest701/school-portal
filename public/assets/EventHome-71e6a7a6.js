import{H as C,r as m,f,g as S,v as x,i as y,j as s,C as w,x as b,_ as j,s as B,t as A}from"./index-a08c4904.js";import{C as D}from"./CustomTitle-d0e5d50c.js";import{g as M,d as T}from"./eventAPI-701fc1aa.js";import{E as _}from"./images-ee905b8b.js";import{C as k}from"./CustomizedMaterialTable-b0814305.js";import{E as q}from"./sessionColumns-7f037633.js";import"./TabPanel-3210be1c.js";import"./Toolbar-172ad7c3.js";import"./MenuItem-ddd79fe9.js";import"./listItemTextClasses-cdd81f8c.js";import"./Chip-a33d5899.js";import"./Autocomplete-62a3dcdf.js";import"./Skeleton-f52aff28.js";import"./ButtonGroup-ed336fd9.js";import"./ListItemText-de69415f.js";import"./InputAdornment-16e34158.js";import"./CardContent-8cf1caa6.js";import"./ListItemSecondaryAction-33dcc31c.js";import"./Grid-d7986873.js";import"./useMediaQuery-dbbfc5b2.js";import"./ListItem-559aef15.js";import"./listItemButtonClasses-628cfd1a.js";import"./ListItemButton-b9f74f93.js";import"./Check-6932050c.js";import"./DeleteOutline-f3e83ed5.js";import"./Delete-ee750b69.js";import"./Add-3c6bb686.js";import"./currencyFormatter-1910a788.js";import"./CircleRounded-fed72031.js";import"./Edit-d3e93a55.js";function lt(){const e=C(),[d,i]=m.useState([]),{schoolSessionDispatch:a}=m.useContext(f),l=S(),o=x({queryKey:["events"],queryFn:()=>M(),initialData:[]}),c=t=>{e(`/events/${t}?redirect_to=/events`,{state:{prevPath:"/events"}})},u=t=>{e(`/events/${t}/edit`)},p=t=>{i(t)},v=t=>{i([{_id:t}]),r()},{mutateAsync:h,isLoading:E}=y({mutationFn:T}),r=()=>{b.fire({title:"Removing Events",text:"You are about to remove the selected events.Changes cannot be undone.",showCancelButton:!0}).then(({isConfirmed:t})=>{const g=j.map(d,"_id");t&&h({events:g},{onSettled:()=>{l.invalidateQueries(["events"])},onSuccess:n=>{a(B(n))},onError:n=>{a(A(n))}})})};return s.jsxs(w,{children:[s.jsx(D,{title:"Events",subtitle:"Schedule and manage school events to ensure everyone stays informed and engaged.",color:"text.main",backColor:"#012e54"}),s.jsx(k,{isLoading:o.isLoading||E,columns:q(c,u,v),data:o.data,handleRefresh:o.refetch,actions:[],showAddButton:!0,addButtonImg:_.sms,addButtonText:"New Event",addButtonMessage:"😑 Send your first Event with just a button click !!!!",onAddButtonClicked:()=>e("new"),options:{search:!0},onSelectionChange:p,onDeleteClicked:r})]})}export{lt as default};
