import{G as m,v as d,j as r,C as y,m as l,T as x,L as c,h as i,O as h,eG as p}from"./index-a08c4904.js";import{b as f}from"./attendanceAPI-50e101c6.js";import{B as g}from"./Back-26c0fe57.js";import{C as j}from"./CustomTitle-d0e5d50c.js";import{L as t}from"./ListItemText-de69415f.js";import{L as u}from"./ListItem-559aef15.js";import{L}from"./ListItemButton-b9f74f93.js";import"./ArrowBackRounded-b2e199d9.js";import"./listItemTextClasses-cdd81f8c.js";import"./listItemButtonClasses-628cfd1a.js";import"./ListItemSecondaryAction-33dcc31c.js";function T(){var o;const{id:a,type:n}=m(),s=d({queryKey:["attendance-history"],queryFn:()=>f(a),enabled:!!a});return r.jsxs(y,{children:[r.jsx(g,{to:`/level/attendance/${a}/${n}`,color:"primary.main"}),r.jsx(j,{title:"Attendance History",subtitle:"Review past attendance records to analyze trends, identify issues, and ensure comprehensive tracking of student and staff presence.",color:"primary.main"}),r.jsxs(l,{children:[s.isLoading&&r.jsx(x,{children:"Loading...."}),r.jsx(t,{primary:`Attendance - ${(o=s==null?void 0:s.data)==null?void 0:o.length} days`,primaryTypographyProps:{fontSize:20,fontWeight:"bold",textAlign:"right"}}),r.jsxs(c,{sx:{maxHeight:600},children:[r.jsxs(u,{children:[r.jsx(t,{primary:"Date"}),r.jsx(t,{primary:"Present"}),r.jsx(t,{primary:"Absent"})]}),s.data&&s.data.map(e=>r.jsxs(L,{divider:!0,children:[r.jsx(t,{primary:i(e.date).format("Do MMMM,YYYY"),secondary:i(e.date).format("dddd"),secondaryTypographyProps:{color:"primary.main",fontWeight:"bold"}}),r.jsx(t,{primary:e.present,primaryTypographyProps:{width:100}}),r.jsx(t,{primary:e.absent,primaryTypographyProps:{width:100}})]},e.date))]})]}),s.isLoading&&r.jsx(h,{value:"Loading Attendance History"})]})}T.propTypes={open:p.PropTypes.bool,setOpen:p.PropTypes.func};export{T as default};
