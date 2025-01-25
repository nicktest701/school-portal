import{cs as Dt,r as y,bG as at,eF as Mt,cA as Ue,ei as Nt,bv as $t,bw as vt,bd as M,bW as Ke,bx as te,by as St,j as x,aF as qe,bC as At,cb as lt,e7 as ee,ec as yt,dB as ge,I as Lt,de as kt,an as Rt,eG as Ft,cr as Et,bH as it,b3 as pt}from"./index-B8PQHtjc.js";import{C as Ht}from"./Chip-DmEpgF7y.js";function Pt(o){return o.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}function zt(o={}){const{ignoreAccents:r=!0,ignoreCase:u=!0,limit:b,matchFrom:w="any",stringify:A,trim:C=!1}=o;return(L,{inputValue:H,getOptionLabel:N})=>{let $=C?H.trim():H;u&&($=$.toLowerCase()),r&&($=Pt($));const z=$?L.filter(oe=>{let k=(A||N)(oe);return u&&(k=k.toLowerCase()),r&&(k=Pt(k)),w==="start"?k.startsWith($):k.includes($)}):L;return typeof b=="number"?z.slice(0,b):z}}const Vt=zt(),jt=5,Wt=o=>{var r;return o.current!==null&&((r=o.current.parentElement)==null?void 0:r.contains(document.activeElement))},Bt=[];function Gt(o){const{unstable_isActiveElementInListbox:r=Wt,unstable_classNamePrefix:u="Mui",autoComplete:b=!1,autoHighlight:w=!1,autoSelect:A=!1,blurOnSelect:C=!1,clearOnBlur:L=!o.freeSolo,clearOnEscape:H=!1,componentName:N="useAutocomplete",defaultValue:$=o.multiple?Bt:null,disableClearable:z=!1,disableCloseOnSelect:oe=!1,disabled:k,disabledItemsFocusable:Le=!1,disableListWrap:ke=!1,filterOptions:ct=Vt,filterSelectedOptions:Re=!1,freeSolo:ne=!1,getOptionDisabled:V,getOptionKey:we,getOptionLabel:_e=t=>t.label??t,groupBy:X,handleHomeEndKeys:Je=!o.freeSolo,id:dt,includeInputInList:be=!1,inputValue:Te,isOptionEqualToValue:Y=(t,e)=>t===e,multiple:f=!1,onChange:Qe,onClose:Xe,onHighlightChange:De,onInputChange:K,onOpen:Me,open:ft,openOnFocus:gt=!1,options:bt,readOnly:re=!1,selectOnFocus:he=!o.freeSolo,value:Ye}=o,R=Dt(dt);let P=_e;P=t=>{const e=_e(t);return typeof e!="string"?String(e):e};const me=y.useRef(!1),xe=y.useRef(!0),I=y.useRef(null),T=y.useRef(null),[Ie,ht]=y.useState(null),[D,Ne]=y.useState(-1),Ze=w?0:-1,v=y.useRef(Ze),[s,mt]=at({controlled:Ye,default:$,name:N}),[d,se]=at({controlled:Te,default:"",name:N,state:"inputValue"}),[ae,ye]=y.useState(!1),le=y.useCallback((t,e,n)=>{if(!(f?s.length<e.length:e!==null)&&!L)return;let i;if(f)i="";else if(e==null)i="";else{const h=P(e);i=typeof h=="string"?h:""}d!==i&&(se(i),K&&K(t,i,n))},[P,d,f,K,se,L,s]),[_,Fe]=at({controlled:ft,default:!1,name:N,state:"open"}),[Ee,et]=y.useState(!0),ie=!f&&s!=null&&d===P(s),S=_&&!re,g=S?ct(bt.filter(t=>!(Re&&(f?s:[s]).some(e=>e!==null&&Y(t,e)))),{inputValue:ie&&Ee?"":d,getOptionLabel:P}):[],j=Mt({filteredOptions:g,value:s,inputValue:d});y.useEffect(()=>{const t=s!==j.value;ae&&!t||ne&&!t||le(null,s,"reset")},[s,le,ae,j.value,ne]);const Pe=_&&g.length>0&&!re,pe=Ue(t=>{t===-1?I.current.focus():Ie.querySelector(`[data-tag-index="${t}"]`).focus()});y.useEffect(()=>{f&&D>s.length-1&&(Ne(-1),pe(-1))},[s,f,D,pe]);function He(t,e){if(!T.current||t<0||t>=g.length)return-1;let n=t;for(;;){const a=T.current.querySelector(`[data-option-index="${n}"]`),i=Le?!1:!a||a.disabled||a.getAttribute("aria-disabled")==="true";if(a&&a.hasAttribute("tabindex")&&!i)return n;if(e==="next"?n=(n+1)%g.length:n=(n-1+g.length)%g.length,n===t)return-1}}const B=Ue(({event:t,index:e,reason:n="auto"})=>{if(v.current=e,e===-1?I.current.removeAttribute("aria-activedescendant"):I.current.setAttribute("aria-activedescendant",`${R}-option-${e}`),De&&De(t,e===-1?null:g[e],n),!T.current)return;const a=T.current.querySelector(`[role="option"].${u}-focused`);a&&(a.classList.remove(`${u}-focused`),a.classList.remove(`${u}-focusVisible`));let i=T.current;if(T.current.getAttribute("role")!=="listbox"&&(i=T.current.parentElement.querySelector('[role="listbox"]')),!i)return;if(e===-1){i.scrollTop=0;return}const h=T.current.querySelector(`[data-option-index="${e}"]`);if(h&&(h.classList.add(`${u}-focused`),n==="keyboard"&&h.classList.add(`${u}-focusVisible`),i.scrollHeight>i.clientHeight&&n!=="mouse"&&n!=="touch")){const c=h,E=i.clientHeight+i.scrollTop,We=c.offsetTop+c.offsetHeight;We>E?i.scrollTop=We-i.clientHeight:c.offsetTop-c.offsetHeight*(X?1.3:0)<i.scrollTop&&(i.scrollTop=c.offsetTop-c.offsetHeight*(X?1.3:0))}}),F=Ue(({event:t,diff:e,direction:n="next",reason:a="auto"})=>{if(!S)return;const h=He((()=>{const c=g.length-1;if(e==="reset")return Ze;if(e==="start")return 0;if(e==="end")return c;const E=v.current+e;return E<0?E===-1&&be?-1:ke&&v.current!==-1||Math.abs(e)>1?0:c:E>c?E===c+1&&be?-1:ke||Math.abs(e)>1?c:0:E})(),n);if(B({index:h,reason:a,event:t}),b&&e!=="reset")if(h===-1)I.current.value=d;else{const c=P(g[h]);I.current.value=c,c.toLowerCase().indexOf(d.toLowerCase())===0&&d.length>0&&I.current.setSelectionRange(d.length,c.length)}}),tt=()=>{const t=(e,n)=>{const a=e?P(e):"",i=n?P(n):"";return a===i};if(v.current!==-1&&j.filteredOptions&&j.filteredOptions.length!==g.length&&j.inputValue===d&&(f?s.length===j.value.length&&j.value.every((e,n)=>P(s[n])===P(e)):t(j.value,s))){const e=j.filteredOptions[v.current];if(e)return g.findIndex(n=>P(n)===P(e))}return-1},Oe=y.useCallback(()=>{if(!S)return;const t=tt();if(t!==-1){v.current=t;return}const e=f?s[0]:s;if(g.length===0||e==null){F({diff:"reset"});return}if(T.current){if(e!=null){const n=g[v.current];if(f&&n&&s.findIndex(i=>Y(n,i))!==-1)return;const a=g.findIndex(i=>Y(i,e));a===-1?F({diff:"reset"}):B({index:a});return}if(v.current>=g.length-1){B({index:g.length-1});return}B({index:v.current})}},[g.length,f?!1:s,Re,F,B,S,d,f]),ot=Ue(t=>{Nt(T,t),t&&Oe()});y.useEffect(()=>{Oe()},[Oe]);const G=t=>{_||(Fe(!0),et(!0),Me&&Me(t))},U=(t,e)=>{_&&(Fe(!1),Xe&&Xe(t,e))},J=(t,e,n,a)=>{if(f){if(s.length===e.length&&s.every((i,h)=>i===e[h]))return}else if(s===e)return;Qe&&Qe(t,e,n,a),mt(e)},ue=y.useRef(!1),Z=(t,e,n="selectOption",a="options")=>{let i=n,h=e;if(f){h=Array.isArray(s)?s.slice():[];const c=h.findIndex(E=>Y(e,E));c===-1?h.push(e):a!=="freeSolo"&&(h.splice(c,1),i="removeOption")}le(t,h,i),J(t,h,i,{option:e}),!oe&&(!t||!t.ctrlKey&&!t.metaKey)&&U(t,i),(C===!0||C==="touch"&&ue.current||C==="mouse"&&!ue.current)&&I.current.blur()};function ce(t,e){if(t===-1)return-1;let n=t;for(;;){if(e==="next"&&n===s.length||e==="previous"&&n===-1)return-1;const a=Ie.querySelector(`[data-tag-index="${n}"]`);if(!a||!a.hasAttribute("tabindex")||a.disabled||a.getAttribute("aria-disabled")==="true")n+=e==="next"?1:-1;else return n}}const Ce=(t,e)=>{if(!f)return;d===""&&U(t,"toggleInput");let n=D;D===-1?d===""&&e==="previous"&&(n=s.length-1):(n+=e==="next"?1:-1,n<0&&(n=0),n===s.length&&(n=-1)),n=ce(n,e),Ne(n),pe(n)},ze=t=>{me.current=!0,se(""),K&&K(t,"","clear"),J(t,f?[]:null,"clear")},de=t=>e=>{if(t.onKeyDown&&t.onKeyDown(e),!e.defaultMuiPrevented&&(D!==-1&&!["ArrowLeft","ArrowRight"].includes(e.key)&&(Ne(-1),pe(-1)),e.which!==229))switch(e.key){case"Home":S&&Je&&(e.preventDefault(),F({diff:"start",direction:"next",reason:"keyboard",event:e}));break;case"End":S&&Je&&(e.preventDefault(),F({diff:"end",direction:"previous",reason:"keyboard",event:e}));break;case"PageUp":e.preventDefault(),F({diff:-5,direction:"previous",reason:"keyboard",event:e}),G(e);break;case"PageDown":e.preventDefault(),F({diff:jt,direction:"next",reason:"keyboard",event:e}),G(e);break;case"ArrowDown":e.preventDefault(),F({diff:1,direction:"next",reason:"keyboard",event:e}),G(e);break;case"ArrowUp":e.preventDefault(),F({diff:-1,direction:"previous",reason:"keyboard",event:e}),G(e);break;case"ArrowLeft":Ce(e,"previous");break;case"ArrowRight":Ce(e,"next");break;case"Enter":if(v.current!==-1&&S){const n=g[v.current],a=V?V(n):!1;if(e.preventDefault(),a)return;Z(e,n,"selectOption"),b&&I.current.setSelectionRange(I.current.value.length,I.current.value.length)}else ne&&d!==""&&ie===!1&&(f&&e.preventDefault(),Z(e,d,"createOption","freeSolo"));break;case"Escape":S?(e.preventDefault(),e.stopPropagation(),U(e,"escape")):H&&(d!==""||f&&s.length>0)&&(e.preventDefault(),e.stopPropagation(),ze(e));break;case"Backspace":if(f&&!re&&d===""&&s.length>0){const n=D===-1?s.length-1:D,a=s.slice();a.splice(n,1),J(e,a,"removeOption",{option:s[n]})}break;case"Delete":if(f&&!re&&d===""&&s.length>0&&D!==-1){const n=D,a=s.slice();a.splice(n,1),J(e,a,"removeOption",{option:s[n]})}break}},nt=t=>{ye(!0),gt&&!me.current&&G(t)},Ve=t=>{if(r(T)){I.current.focus();return}ye(!1),xe.current=!0,me.current=!1,A&&v.current!==-1&&S?Z(t,g[v.current],"blur"):A&&ne&&d!==""?Z(t,d,"blur","freeSolo"):L&&le(t,s,"blur"),U(t,"blur")},fe=t=>{const e=t.target.value;d!==e&&(se(e),et(!1),K&&K(t,e,"input")),e===""?!z&&!f&&J(t,null,"clear"):G(t)},$e=t=>{const e=Number(t.currentTarget.getAttribute("data-option-index"));v.current!==e&&B({event:t,index:e,reason:"mouse"})},ve=t=>{B({event:t,index:Number(t.currentTarget.getAttribute("data-option-index")),reason:"touch"}),ue.current=!0},rt=t=>{const e=Number(t.currentTarget.getAttribute("data-option-index"));Z(t,g[e],"selectOption"),ue.current=!1},st=t=>e=>{const n=s.slice();n.splice(t,1),J(e,n,"removeOption",{option:s[t]})},je=t=>{_?U(t,"toggleInput"):G(t)},xt=t=>{t.currentTarget.contains(t.target)&&t.target.getAttribute("id")!==R&&t.preventDefault()},Se=t=>{t.currentTarget.contains(t.target)&&(I.current.focus(),he&&xe.current&&I.current.selectionEnd-I.current.selectionStart===0&&I.current.select(),xe.current=!1)},O=t=>{!k&&(d===""||!_)&&je(t)};let m=ne&&d.length>0;m=m||(f?s.length>0:s!==null);let q=g;return X&&(q=g.reduce((t,e,n)=>{const a=X(e);return t.length>0&&t[t.length-1].group===a?t[t.length-1].options.push(e):t.push({key:n,index:n,group:a,options:[e]}),t},[])),k&&ae&&Ve(),{getRootProps:(t={})=>({"aria-owns":Pe?`${R}-listbox`:null,...t,onKeyDown:de(t),onMouseDown:xt,onClick:Se}),getInputLabelProps:()=>({id:`${R}-label`,htmlFor:R}),getInputProps:()=>({id:R,value:d,onBlur:Ve,onFocus:nt,onChange:fe,onMouseDown:O,"aria-activedescendant":S?"":null,"aria-autocomplete":b?"both":"list","aria-controls":Pe?`${R}-listbox`:void 0,"aria-expanded":Pe,autoComplete:"off",ref:I,autoCapitalize:"none",spellCheck:"false",role:"combobox",disabled:k}),getClearProps:()=>({tabIndex:-1,type:"button",onClick:ze}),getPopupIndicatorProps:()=>({tabIndex:-1,type:"button",onClick:je}),getTagProps:({index:t})=>({key:t,"data-tag-index":t,tabIndex:-1,...!re&&{onDelete:st(t)}}),getListboxProps:()=>({role:"listbox",id:`${R}-listbox`,"aria-labelledby":`${R}-label`,ref:ot,onMouseDown:t=>{t.preventDefault()}}),getOptionProps:({index:t,option:e})=>{const n=(f?s:[s]).some(i=>i!=null&&Y(e,i)),a=V?V(e):!1;return{key:(we==null?void 0:we(e))??P(e),tabIndex:-1,role:"option",id:`${R}-option-${t}`,onMouseMove:$e,onClick:rt,onTouchStart:ve,"data-option-index":t,"aria-disabled":a,"aria-selected":n}},id:R,inputValue:d,value:s,dirty:m,expanded:S&&Ie,popupOpen:S,focused:ae||D!==-1,anchorEl:Ie,setAnchorEl:ht,focusedTag:D,groupedOptions:q}}function Ut(o){return $t("MuiListSubheader",o)}const uo=vt("MuiListSubheader",["root","colorPrimary","colorInherit","gutters","inset","sticky"]),qt=o=>{const{classes:r,color:u,disableGutters:b,inset:w,disableSticky:A}=o,C={root:["root",u!=="default"&&`color${Ke(u)}`,!b&&"gutters",w&&"inset",!A&&"sticky"]};return At(C,Ut,r)},Kt=M("li",{name:"MuiListSubheader",slot:"Root",overridesResolver:(o,r)=>{const{ownerState:u}=o;return[r.root,u.color!=="default"&&r[`color${Ke(u.color)}`],!u.disableGutters&&r.gutters,u.inset&&r.inset,!u.disableSticky&&r.sticky]}})(te(({theme:o})=>({boxSizing:"border-box",lineHeight:"48px",listStyle:"none",color:(o.vars||o).palette.text.secondary,fontFamily:o.typography.fontFamily,fontWeight:o.typography.fontWeightMedium,fontSize:o.typography.pxToRem(14),variants:[{props:{color:"primary"},style:{color:(o.vars||o).palette.primary.main}},{props:{color:"inherit"},style:{color:"inherit"}},{props:({ownerState:r})=>!r.disableGutters,style:{paddingLeft:16,paddingRight:16}},{props:({ownerState:r})=>r.inset,style:{paddingLeft:72}},{props:({ownerState:r})=>!r.disableSticky,style:{position:"sticky",top:0,zIndex:1,backgroundColor:(o.vars||o).palette.background.paper}}]}))),ut=y.forwardRef(function(r,u){const b=St({props:r,name:"MuiListSubheader"}),{className:w,color:A="default",component:C="li",disableGutters:L=!1,disableSticky:H=!1,inset:N=!1,...$}=b,z={...b,color:A,component:C,disableGutters:L,disableSticky:H,inset:N},oe=qt(z);return x.jsx(Kt,{as:C,className:qe(oe.root,w),ref:u,ownerState:z,...$})});ut&&(ut.muiSkipListHighlight=!0);function _t(o){return $t("MuiAutocomplete",o)}const l=vt("MuiAutocomplete",["root","expanded","fullWidth","focused","focusVisible","tag","tagSizeSmall","tagSizeMedium","hasPopupIcon","hasClearIcon","inputRoot","input","inputFocused","endAdornment","clearIndicator","popupIndicator","popupIndicatorOpen","popper","popperDisablePortal","paper","listbox","loading","noOptions","option","groupLabel","groupUl"]);var Ot,Ct;const Jt=o=>{const{classes:r,disablePortal:u,expanded:b,focused:w,fullWidth:A,hasClearIcon:C,hasPopupIcon:L,inputFocused:H,popupOpen:N,size:$}=o,z={root:["root",b&&"expanded",w&&"focused",A&&"fullWidth",C&&"hasClearIcon",L&&"hasPopupIcon"],inputRoot:["inputRoot"],input:["input",H&&"inputFocused"],tag:["tag",`tagSize${Ke($)}`],endAdornment:["endAdornment"],clearIndicator:["clearIndicator"],popupIndicator:["popupIndicator",N&&"popupIndicatorOpen"],popper:["popper",u&&"popperDisablePortal"],paper:["paper"],listbox:["listbox"],loading:["loading"],noOptions:["noOptions"],option:["option"],groupLabel:["groupLabel"],groupUl:["groupUl"]};return At(z,_t,r)},Qt=M("div",{name:"MuiAutocomplete",slot:"Root",overridesResolver:(o,r)=>{const{ownerState:u}=o,{fullWidth:b,hasClearIcon:w,hasPopupIcon:A,inputFocused:C,size:L}=u;return[{[`& .${l.tag}`]:r.tag},{[`& .${l.tag}`]:r[`tagSize${Ke(L)}`]},{[`& .${l.inputRoot}`]:r.inputRoot},{[`& .${l.input}`]:r.input},{[`& .${l.input}`]:C&&r.inputFocused},r.root,b&&r.fullWidth,A&&r.hasPopupIcon,w&&r.hasClearIcon]}})({[`&.${l.focused} .${l.clearIndicator}`]:{visibility:"visible"},"@media (pointer: fine)":{[`&:hover .${l.clearIndicator}`]:{visibility:"visible"}},[`& .${l.tag}`]:{margin:3,maxWidth:"calc(100% - 6px)"},[`& .${l.inputRoot}`]:{[`.${l.hasPopupIcon}&, .${l.hasClearIcon}&`]:{paddingRight:30},[`.${l.hasPopupIcon}.${l.hasClearIcon}&`]:{paddingRight:56},[`& .${l.input}`]:{width:0,minWidth:30}},[`& .${lt.root}`]:{paddingBottom:1,"& .MuiInput-input":{padding:"4px 4px 4px 0px"}},[`& .${lt.root}.${ee.sizeSmall}`]:{[`& .${lt.input}`]:{padding:"2px 4px 3px 0"}},[`& .${yt.root}`]:{padding:9,[`.${l.hasPopupIcon}&, .${l.hasClearIcon}&`]:{paddingRight:39},[`.${l.hasPopupIcon}.${l.hasClearIcon}&`]:{paddingRight:65},[`& .${l.input}`]:{padding:"7.5px 4px 7.5px 5px"},[`& .${l.endAdornment}`]:{right:9}},[`& .${yt.root}.${ee.sizeSmall}`]:{paddingTop:6,paddingBottom:6,paddingLeft:6,[`& .${l.input}`]:{padding:"2.5px 4px 2.5px 8px"}},[`& .${ge.root}`]:{paddingTop:19,paddingLeft:8,[`.${l.hasPopupIcon}&, .${l.hasClearIcon}&`]:{paddingRight:39},[`.${l.hasPopupIcon}.${l.hasClearIcon}&`]:{paddingRight:65},[`& .${ge.input}`]:{padding:"7px 4px"},[`& .${l.endAdornment}`]:{right:9}},[`& .${ge.root}.${ee.sizeSmall}`]:{paddingBottom:1,[`& .${ge.input}`]:{padding:"2.5px 4px"}},[`& .${ee.hiddenLabel}`]:{paddingTop:8},[`& .${ge.root}.${ee.hiddenLabel}`]:{paddingTop:0,paddingBottom:0,[`& .${l.input}`]:{paddingTop:16,paddingBottom:17}},[`& .${ge.root}.${ee.hiddenLabel}.${ee.sizeSmall}`]:{[`& .${l.input}`]:{paddingTop:8,paddingBottom:9}},[`& .${l.input}`]:{flexGrow:1,textOverflow:"ellipsis",opacity:0},variants:[{props:{fullWidth:!0},style:{width:"100%"}},{props:{size:"small"},style:{[`& .${l.tag}`]:{margin:2,maxWidth:"calc(100% - 4px)"}}},{props:{inputFocused:!0},style:{[`& .${l.input}`]:{opacity:1}}},{props:{multiple:!0},style:{[`& .${l.inputRoot}`]:{flexWrap:"wrap"}}}]}),Xt=M("div",{name:"MuiAutocomplete",slot:"EndAdornment",overridesResolver:(o,r)=>r.endAdornment})({position:"absolute",right:0,top:"50%",transform:"translate(0, -50%)"}),Yt=M(Lt,{name:"MuiAutocomplete",slot:"ClearIndicator",overridesResolver:(o,r)=>r.clearIndicator})({marginRight:-2,padding:4,visibility:"hidden"}),Zt=M(Lt,{name:"MuiAutocomplete",slot:"PopupIndicator",overridesResolver:(o,r)=>{const{ownerState:u}=o;return[r.popupIndicator,u.popupOpen&&r.popupIndicatorOpen]}})({padding:2,marginRight:-2,variants:[{props:{popupOpen:!0},style:{transform:"rotate(180deg)"}}]}),eo=M(kt,{name:"MuiAutocomplete",slot:"Popper",overridesResolver:(o,r)=>{const{ownerState:u}=o;return[{[`& .${l.option}`]:r.option},r.popper,u.disablePortal&&r.popperDisablePortal]}})(te(({theme:o})=>({zIndex:(o.vars||o).zIndex.modal,variants:[{props:{disablePortal:!0},style:{position:"absolute"}}]}))),to=M(Rt,{name:"MuiAutocomplete",slot:"Paper",overridesResolver:(o,r)=>r.paper})(te(({theme:o})=>({...o.typography.body1,overflow:"auto"}))),oo=M("div",{name:"MuiAutocomplete",slot:"Loading",overridesResolver:(o,r)=>r.loading})(te(({theme:o})=>({color:(o.vars||o).palette.text.secondary,padding:"14px 16px"}))),no=M("div",{name:"MuiAutocomplete",slot:"NoOptions",overridesResolver:(o,r)=>r.noOptions})(te(({theme:o})=>({color:(o.vars||o).palette.text.secondary,padding:"14px 16px"}))),ro=M("ul",{name:"MuiAutocomplete",slot:"Listbox",overridesResolver:(o,r)=>r.listbox})(te(({theme:o})=>({listStyle:"none",margin:0,padding:"8px 0",maxHeight:"40vh",overflow:"auto",position:"relative",[`& .${l.option}`]:{minHeight:48,display:"flex",overflow:"hidden",justifyContent:"flex-start",alignItems:"center",cursor:"pointer",paddingTop:6,boxSizing:"border-box",outline:"0",WebkitTapHighlightColor:"transparent",paddingBottom:6,paddingLeft:16,paddingRight:16,[o.breakpoints.up("sm")]:{minHeight:"auto"},[`&.${l.focused}`]:{backgroundColor:(o.vars||o).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},'&[aria-disabled="true"]':{opacity:(o.vars||o).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${l.focusVisible}`]:{backgroundColor:(o.vars||o).palette.action.focus},'&[aria-selected="true"]':{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / ${o.vars.palette.action.selectedOpacity})`:pt(o.palette.primary.main,o.palette.action.selectedOpacity),[`&.${l.focused}`]:{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / calc(${o.vars.palette.action.selectedOpacity} + ${o.vars.palette.action.hoverOpacity}))`:pt(o.palette.primary.main,o.palette.action.selectedOpacity+o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(o.vars||o).palette.action.selected}},[`&.${l.focusVisible}`]:{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / calc(${o.vars.palette.action.selectedOpacity} + ${o.vars.palette.action.focusOpacity}))`:pt(o.palette.primary.main,o.palette.action.selectedOpacity+o.palette.action.focusOpacity)}}}}))),so=M(ut,{name:"MuiAutocomplete",slot:"GroupLabel",overridesResolver:(o,r)=>r.groupLabel})(te(({theme:o})=>({backgroundColor:(o.vars||o).palette.background.paper,top:-8}))),ao=M("ul",{name:"MuiAutocomplete",slot:"GroupUl",overridesResolver:(o,r)=>r.groupUl})({padding:0,[`& .${l.option}`]:{paddingLeft:24}}),co=y.forwardRef(function(r,u){const b=St({props:r,name:"MuiAutocomplete"}),{autoComplete:w=!1,autoHighlight:A=!1,autoSelect:C=!1,blurOnSelect:L=!1,ChipProps:H,className:N,clearIcon:$=Ot||(Ot=x.jsx(Ft,{fontSize:"small"})),clearOnBlur:z=!b.freeSolo,clearOnEscape:oe=!1,clearText:k="Clear",closeText:Le="Close",componentsProps:ke,defaultValue:ct=b.multiple?[]:null,disableClearable:Re=!1,disableCloseOnSelect:ne=!1,disabled:V=!1,disabledItemsFocusable:we=!1,disableListWrap:_e=!1,disablePortal:X=!1,filterOptions:Je,filterSelectedOptions:dt=!1,forcePopupIcon:be="auto",freeSolo:Te=!1,fullWidth:Y=!1,getLimitTagsText:f=p=>`+${p}`,getOptionDisabled:Qe,getOptionKey:Xe,getOptionLabel:De,isOptionEqualToValue:K,groupBy:Me,handleHomeEndKeys:ft=!b.freeSolo,id:gt,includeInputInList:bt=!1,inputValue:re,limitTags:he=-1,ListboxComponent:Ye,ListboxProps:R,loading:P=!1,loadingText:me="Loading…",multiple:xe=!1,noOptionsText:I="No options",onChange:T,onClose:Ie,onHighlightChange:ht,onInputChange:D,onOpen:Ne,open:Ze,openOnFocus:v=!1,openText:s="Open",options:mt,PaperComponent:d,PopperComponent:se,popupIcon:ae=Ct||(Ct=x.jsx(Et,{})),readOnly:ye=!1,renderGroup:le,renderInput:_,renderOption:Fe,renderTags:Ee,selectOnFocus:et=!b.freeSolo,size:ie="medium",slots:S={},slotProps:g={},value:j,...Pe}=b,{getRootProps:pe,getInputProps:He,getInputLabelProps:B,getPopupIndicatorProps:F,getClearProps:tt,getTagProps:Oe,getListboxProps:ot,getOptionProps:G,value:U,dirty:J,expanded:ue,id:Z,popupOpen:ce,focused:Ce,focusedTag:ze,anchorEl:de,setAnchorEl:nt,inputValue:Ve,groupedOptions:fe}=Gt({...b,componentName:"Autocomplete"}),$e=!Re&&!V&&J&&!ye,ve=(!Te||be===!0)&&be!==!1,{onMouseDown:rt}=He(),{ref:st,...je}=ot(),Se=De||(p=>p.label??p),O={...b,disablePortal:X,expanded:ue,focused:Ce,fullWidth:Y,getOptionLabel:Se,hasClearIcon:$e,hasPopupIcon:ve,inputFocused:ze===-1,popupOpen:ce,size:ie},m=Jt(O),q={slots:{paper:d,popper:se,...S},slotProps:{chip:H,listbox:R,...ke,...g}},[t,e]=it("listbox",{elementType:ro,externalForwardedProps:q,ownerState:O,className:m.listbox,additionalProps:je,ref:st}),[n,a]=it("paper",{elementType:Rt,externalForwardedProps:q,ownerState:O,className:m.paper}),[i,h]=it("popper",{elementType:kt,externalForwardedProps:q,ownerState:O,className:m.popper,additionalProps:{disablePortal:X,style:{width:de?de.clientWidth:null},role:"presentation",anchorEl:de,open:ce}});let c;if(xe&&U.length>0){const p=W=>({className:m.tag,disabled:V,...Oe(W)});Ee?c=Ee(U,p,O):c=U.map((W,Q)=>{const{key:Ae,...Tt}=p({index:Q});return x.jsx(Ht,{label:Se(W),size:ie,...Tt,...q.slotProps.chip},Ae)})}if(he>-1&&Array.isArray(c)){const p=c.length-he;!Ce&&p>0&&(c=c.splice(0,he),c.push(x.jsx("span",{className:m.tag,children:f(p)},c.length)))}const We=le||(p=>x.jsxs("li",{children:[x.jsx(so,{className:m.groupLabel,ownerState:O,component:"div",children:p.group}),x.jsx(ao,{className:m.groupUl,ownerState:O,children:p.children})]},p.key)),wt=Fe||((p,W)=>{const{key:Q,...Ae}=p;return x.jsx("li",{...Ae,children:Se(W)},Q)}),It=(p,W)=>{const Q=G({option:p,index:W});return wt({...Q,className:m.option},p,{selected:Q["aria-selected"],index:W,inputValue:Ve},O)},Be=q.slotProps.clearIndicator,Ge=q.slotProps.popupIndicator;return x.jsxs(y.Fragment,{children:[x.jsx(Qt,{ref:u,className:qe(m.root,N),ownerState:O,...pe(Pe),children:_({id:Z,disabled:V,fullWidth:!0,size:ie==="small"?"small":void 0,InputLabelProps:B(),InputProps:{ref:nt,className:m.inputRoot,startAdornment:c,onMouseDown:p=>{p.target===p.currentTarget&&rt(p)},...($e||ve)&&{endAdornment:x.jsxs(Xt,{className:m.endAdornment,ownerState:O,children:[$e?x.jsx(Yt,{...tt(),"aria-label":k,title:k,ownerState:O,...Be,className:qe(m.clearIndicator,Be==null?void 0:Be.className),children:$}):null,ve?x.jsx(Zt,{...F(),disabled:V,"aria-label":ce?Le:s,title:ce?Le:s,ownerState:O,...Ge,className:qe(m.popupIndicator,Ge==null?void 0:Ge.className),children:ae}):null]})}},inputProps:{className:m.input,disabled:V,readOnly:ye,...He()}})}),de?x.jsx(eo,{as:i,...h,children:x.jsxs(to,{as:n,...a,children:[P&&fe.length===0?x.jsx(oo,{className:m.loading,ownerState:O,children:me}):null,fe.length===0&&!Te&&!P?x.jsx(no,{className:m.noOptions,ownerState:O,role:"presentation",onMouseDown:p=>{p.preventDefault()},children:I}):null,fe.length>0?x.jsx(t,{as:Ye,...e,children:fe.map((p,W)=>Me?We({key:p.key,group:p.group,children:p.options.map((Q,Ae)=>It(Q,p.index+Ae))}):It(p,W))}):null]})}):null]})});export{co as A,ut as L,l as a,Ut as b,zt as c,_t as g,uo as l,Gt as u};
