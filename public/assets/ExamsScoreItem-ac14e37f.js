import{j as r,B as x,I as l}from"./index-a08c4904.js";import{g as c}from"./gradeColor-6983157e.js";import{L as d}from"./ListItemButton-b9f74f93.js";import{L as s}from"./ListItemText-de69415f.js";import{L as j}from"./ListItemSecondaryAction-33dcc31c.js";import{D as p}from"./Delete-ee750b69.js";const I=({item:o,removeSubject:n,title:a})=>r.jsxs(d,{divider:!0,children:[r.jsx(s,{sx:{width:120},secondary:o==null?void 0:o.subject,secondaryTypographyProps:{color:"primary"}}),r.jsx(s,{secondary:o==null?void 0:o.classScore}),r.jsx(s,{secondary:o==null?void 0:o.examsScore}),r.jsx(s,{secondary:o==null?void 0:o.totalScore}),r.jsx(s,{secondary:o==null?void 0:o.grade}),r.jsx(x,{size:"small",sx:{color:a?"text.main":c(o==null?void 0:o.totalScore).color,bgcolor:a?"transparent":c(o==null?void 0:o.totalScore).bg,mx:2},children:o==null?void 0:o.remarks}),r.jsx(j,{sx:{ml:2,pl:2},children:!a&&r.jsx(l,{className:"ico",onClick:()=>n(o.subject),children:r.jsx(p,{})})})]});export{I as E};