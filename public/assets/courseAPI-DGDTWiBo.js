import{q as e}from"./index-DrgqF6h7.js";const t=async a=>{try{return(await e({method:"GET",url:"/courses/dashboard",params:{...a}})).data}catch(r){return r.response.data}},o=async a=>{try{return(await e({method:"GET",url:"/courses/teacher",params:{...a}})).data}catch(r){return r.response.data}},c=async a=>{try{return(await e({method:"POST",url:"/courses",data:a})).data}catch(r){return r.response.data}},n=async a=>{try{return(await e({method:"DELETE",url:`/courses/${a}`})).data}catch(r){return r.response.data}};export{t as a,n as d,o as g,c as p};