import{R as o,r as i,an as l,j as e,p as h,bp as j,cj as S,aL as F,a as g}from"./index-c7bc4969.js";import{S as L}from"./StudentFeesHistory-7df853db.js";const b=({item:r,studentId:p})=>{var a;const{studentDispatch:d}=i.useContext(l),[c,n]=i.useState(!1),m=(t,s)=>{d({type:"viewStudentFeeHistory",payload:{open:!0,data:{id:p,level:s,feeId:t}}}),n(!0)};return e.jsxs(e.Fragment,{children:[e.jsx(h,{subheader:e.jsx(j,{sx:{bgcolor:"primary.main",color:"secondary.main"},children:r[0]}),children:(a=r[1])==null?void 0:a.map(({term:t,levelId:s,levelType:u,id:y})=>{const x=S();return e.jsx(e.Fragment,{children:e.jsx(F,{onClick:()=>m(y,s),children:e.jsx(g,{primary:u,secondary:t,secondaryTypographyProps:{fontSize:13,color:"primary.main",fontWeight:"bold"}})},x)})})}),e.jsx(L,{open:c,setOpen:n})]})};b.propTypes={item:o.array,studentId:o.string};export{b as S};
