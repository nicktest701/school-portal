import{t as a}from"./index-ce442eb1.js";const o=async t=>{try{return(await a({method:"GET",url:"/terms",params:{session:t}})).data}catch(r){throw r.response.data}},c=async t=>{try{return(await a({method:"GET",url:`/terms/${t}`})).data}catch(r){throw r.response.data}},n=async t=>{try{return(await a({method:"POST",url:"/terms",data:t})).data}catch(r){throw r.response.data}},d=async t=>{try{return(await a({method:"PUT",url:"/terms",data:t})).data}catch(r){throw r.response.data}},m=async({_id:t,active:r})=>{try{return(await a({method:"PUT",url:"/terms/account",data:{id:t,active:r}})).data}catch(e){throw e.response.data}},h=async t=>{try{return(await a({method:"PUT",url:"/terms/remove",data:t})).data}catch(r){throw r.response.data}},u=async t=>{try{return(await a({method:"DELETE",url:`/terms/${t}`})).data}catch(r){throw r.response.data}};export{h as a,m as b,c,u as d,n as e,o as g,d as p};
