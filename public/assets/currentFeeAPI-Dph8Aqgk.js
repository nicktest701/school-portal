import{q as t}from"./index-DrgqF6h7.js";const s=async e=>{try{return(await t({method:"GET",url:"/current-fees/recent",params:e})).data}catch(r){return r.response.data}},n=async e=>{try{return(await t({method:"get",url:"/current-fees/day",params:e})).data}catch(r){return r.response.data}},c=async e=>{try{return(await t({method:"POST",url:"/current-fees/summary",data:e})).data}catch(r){return r.response.data}},o=async e=>{try{return(await t({method:"POST",url:"/current-fees/level",data:e})).data}catch(r){return r.response.data}},u=async e=>{try{return(await t({method:"POST",url:"/current-fees/student",data:e})).data}catch(r){return r.response.data}},d=async e=>{try{return(await t({method:"GET",url:"/current-fees/history/all",params:{student:e}})).data}catch(r){return r.response.data}},y=async e=>{try{return(await t({method:"POST",url:"/current-fees/history",data:e})).data}catch(r){return r.response.data}},l=async e=>{try{return(await t({method:"POST",url:"/current-fees",data:e})).data}catch(r){return r.response.data}};export{y as a,o as b,c,s as d,u as e,d as f,n as g,l as p};