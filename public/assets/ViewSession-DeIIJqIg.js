import{a as b,i as P,b as S,c as v,j as e,C as g,e as T,B as z,E as I,k as C,T as r,l as j,m as i,D as O}from"./index-B8PQHtjc.js";import{c as W}from"./termAPI-1V1q_gIm.js";const B=()=>{var n,s,o,d,u,m,c,p,x,h,f,Y;const[w,y]=b(),{id:l}=P(),D=S(),a=v({queryKey:["terms/:id",l],queryFn:()=>W(l),initialData:(n=D.getQueryData(["terms"]))==null?void 0:n.find(t=>(t==null?void 0:t.termId)===l),enabled:!!l}),M=()=>{y(t=>(t.set("_id",l),t.set("edit_session",!0),t))};return e.jsxs(g,{children:[e.jsx(T,{title:(s=a==null?void 0:a.data)==null?void 0:s.academicYear,subtitle:"Create, update, and oversee academic sessions to ensure smooth academic operations",color:"primary.main",showBack:!0,to:"/session",right:e.jsx(z,{startIcon:e.jsx(I,{}),sx:{bgcolor:"rgba(1, 46, 84,0.1)"},onClick:M,children:"Edit Session"})}),a!=null&&a.isPending?e.jsx("p",{children:"Please Wait.."}):e.jsx(e.Fragment,{children:e.jsx(g,{sx:{bgcolor:"#fff",py:4},children:e.jsxs(C,{spacing:2,paddingY:2,children:[e.jsx(r,{label:"Academic Year",value:(o=a==null?void 0:a.data)==null?void 0:o.academicYear,InputProps:{readOnly:!0},fullWidth:!0,margin:"normal",size:"small"}),e.jsx(r,{label:"Term/Semester",value:(d=a==null?void 0:a.data)==null?void 0:d.term,InputProps:{readOnly:!0},fullWidth:!0,margin:"normal",size:"small"}),e.jsx(j,{fontSize:13,children:"Duration"}),e.jsx(r,{label:"Start of Academic Term/Semester",value:(m=i(new Date((u=a==null?void 0:a.data)==null?void 0:u.from)))==null?void 0:m.format("Do MMMM YYYY"),InputProps:{readOnly:!0},fullWidth:!0,margin:"normal",size:"small"}),e.jsx(r,{label:"End of Academic Term/Semester",value:(p=i(new Date((c=a==null?void 0:a.data)==null?void 0:c.to)))==null?void 0:p.format("Do MMMM YYYY"),InputProps:{readOnly:!0},fullWidth:!0,margin:"normal",size:"small"}),e.jsx(j,{fontSize:13,children:"Vacation"}),e.jsx(r,{label:"Vacation Date",value:(h=i(new Date((x=a==null?void 0:a.data)==null?void 0:x.vacationDate)))==null?void 0:h.format("Do MMMM YYYY"),InputProps:{readOnly:!0},fullWidth:!0,margin:"normal",size:"small"}),e.jsx(r,{label:"Next Term Begins",value:(Y=i(new Date((f=a==null?void 0:a.data)==null?void 0:f.reOpeningDate)))==null?void 0:Y.format("Do MMMM YYYY"),InputProps:{readOnly:!0},fullWidth:!0,margin:"normal",size:"small"}),e.jsx(O,{})]})})})]})};export{B as default};
