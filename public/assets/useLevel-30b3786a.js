import{r as o,a0 as E,v as q,et as A,_ as s}from"./index-a08c4904.js";function T(){const{userState:{session:t}}=o.useContext(E),[f,d]=o.useState([]),[m,g]=o.useState([]),[h,S]=o.useState({noOfLevels:0,noOfSubjects:0,noOfAssignedTeachers:0}),r=q({queryKey:["levels",t.sessionId,t.termId],queryFn:()=>A(t.sessionId,t.termId),enabled:!!t.sessionId&&!!(t!=null&&t.termId),onSuccess:e=>{if((e==null?void 0:e.length)!==0){d(e);const p=e.map(({_id:I,level:n,students:c,subjects:i,teacher:x})=>({_id:I,level:n,type:`${n==null?void 0:n.name}${n==null?void 0:n.type}`,noOfStudents:c==null?void 0:c.length,noOfSubjects:i==null?void 0:i.length,teacher:x}));g(p);const y=e.length,a=s.flatMap(e,"subjects"),O=s.isEmpty(a)?0:s.uniq(a).length,u=s.filter(e,"teacher"),L=s.isEmpty(u)?0:u.length;S({noOfLevels:y,noOfSubjects:O,noOfAssignedTeachers:L})}},onError:e=>{console.log(e)}});return{levelLoading:r.isLoading,levelIsFetching:r.isFetching,levelRefetch:r.refetch,levelsOption:m,levelSummary:h,levels:f}}export{T as u};
