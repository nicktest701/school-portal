import{U as o,a as h,u as l,j as e,L as u}from"./index-ce442eb1.js";import{L as y}from"./Autocomplete-87c4b1e1.js";import{v as x}from"./v4-4a60fe23.js";import{L as f}from"./ListItemButton-97ec9750.js";import{L as g}from"./ListItemText-b107adf9.js";const L=({item:t})=>{var a;const[i]=h(),n=l(),m=(r,s)=>{n(`/fee/payment/student?level_id=${s}&_id=${i.get("_id")}&fid=${r}`,{state:{prevPath:"/fee/history"}})};return e.jsx(e.Fragment,{children:e.jsx(u,{subheader:e.jsx(y,{sx:{bgcolor:"primary.main",color:"secondary.main"},children:t[0]}),children:(a=t[1])==null?void 0:a.map(({term:r,levelId:s,levelType:p,id:d})=>{const c=x();return e.jsx(e.Fragment,{children:e.jsx(f,{onClick:()=>m(d,s),children:e.jsx(g,{primary:p,secondary:r,secondaryTypographyProps:{fontSize:13,color:"primary.main",fontWeight:"bold"}})},c)})})})})};L.propTypes={item:o.array,studentId:o.string};export{L as S};
