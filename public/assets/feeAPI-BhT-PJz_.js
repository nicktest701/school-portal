import{s as r}from"./index-B8PQHtjc.js";const s=async t=>{try{return(await r({method:"POST",url:"/fees/all",data:t})).data}catch(e){throw e.response.data}},o=async t=>{try{return(await r({method:"POST",url:"/fees/current-level/all",data:t})).data}catch(e){throw e.response.data}},n=async t=>{try{return(await r({method:"POST",url:"/fees",data:t})).data}catch(e){throw e.response.data}},c=async t=>{try{return(await r({method:"PUT",url:"/fees",data:t})).data}catch(e){throw e.response.data}},d=async t=>{try{return(await r({method:"DELETE",url:`/fees/${t}`})).data}catch(e){throw e.response.data}};export{c as a,o as b,d,s as g,n as p};
