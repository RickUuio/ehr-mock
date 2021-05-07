(this["webpackJsonpehr-mock"]=this["webpackJsonpehr-mock"]||[]).push([[0],{25:function(e,t,r){},27:function(e,t,r){},33:function(e,t,r){"use strict";r.r(t);var n=r(2),c=r.n(n),a=r(13),s=r.n(a),i=(r(25),r(5)),o=r.n(i),l=r(9),d=r(6),u=(r(27),r(12)),j=r(1),b=function(e){var t=e.patient;return Object(j.jsxs)("div",{className:"p-2",children:[Object(j.jsxs)("h4",{style:{color:"yellow"},children:[Object(j.jsx)(u.c,{})," ",t.firstName," ",t.lastName]}),Object(j.jsxs)("h6",{children:[Object(j.jsx)("span",{className:"badge badge-light",children:"DOB"})," : ",t.dob,Object(j.jsx)("span",{children:"    "}),Object(j.jsx)("span",{className:"badge badge-light",children:"Gender"})," : ",t.gender]}),Object(j.jsxs)("h6",{children:[Object(j.jsx)("span",{className:"badge badge-light",children:"MRN"})," : ",t.mrn]}),Object(j.jsxs)("h6",{children:[Object(j.jsx)("span",{className:"badge badge-light",children:"FHIR ID"})," : ",t.fhirId]})]})},f=function(e){var t=e.provider;return Object(j.jsxs)("div",{className:"p-2",children:[Object(j.jsxs)("h4",{style:{color:"HotPink"},children:[t.firstName," ",t.lastName," ",Object(j.jsx)(u.d,{})]}),Object(j.jsxs)("h6",{children:[Object(j.jsx)("span",{className:"badge badge-light",children:"FHIR ID"})," : ",t.fhirId]}),Object(j.jsxs)("h6",{children:[Object(j.jsx)("span",{className:"badge badge-light",children:"UUID "})," : ",t.uuid]})]})},h=function(e){var t=e.profileName,r=e.switchProfile;return Object(j.jsxs)("div",{className:"btn-group mb-2",role:"group","aria-label":"Basic mixed styles example",children:[Object(j.jsx)("input",{type:"radio",className:"btn-check",name:"btnradio",id:"profileEpic",autoComplete:"off",defaultChecked:"Epic"===t,onClick:function(){t="Epic",r("Epic")}}),Object(j.jsx)("label",{class:"btn btn-outline-danger",htmlFor:"profileEpic",children:"Epic AppOrchard"}),Object(j.jsx)("input",{type:"radio",className:"btn-check",name:"btnradio",id:"profileLogica",autoComplete:"off",defaultChecked:"Logica"===t,onClick:function(){t="Logica",r("Logica")}}),Object(j.jsx)("label",{className:"btn btn-outline-info",htmlFor:"profileLogica",children:"Logica Health"})]})},p=function(e){var t=e.title,r=e.patient,n=e.provider,c=e.profileName,a=e.switchProfile;return Object(j.jsx)("header",{children:Object(j.jsx)("div",{id:"navbarTop",children:Object(j.jsxs)("div",{className:"row",children:[Object(j.jsxs)("div",{className:"col-lg-6 col-md-12 order-lg-2",children:[Object(j.jsxs)("h2",{className:"pt-4",children:[Object(j.jsx)(u.b,{style:{color:"#d60c05ee"}})," ",t]}),Object(j.jsx)(h,{profileName:c,switchProfile:a})]}),Object(j.jsx)("div",{className:"col-lg-3 col-md-6 order-lg-1",children:Object(j.jsx)(b,{patient:r})}),Object(j.jsx)("div",{className:"col-lg-3 col-md-6 order-lg-3",children:Object(j.jsx)(f,{provider:n})})]})})})};p.defaultProps={title:"Mock EHR : : Social Care Referrals"};var m=p,O=r(17),v=function(e){var t=e.encounterList,r=e.currentEncounter,n=void 0===r?"smart-2":r,c=e.changeCurrentEncounter,a=e.refreshEncounters;return Object(j.jsxs)("div",{className:"encounter col-md-3 col-lg-2 mx-0 px-0",children:[Object(j.jsxs)("div",{className:"btn btn-default btn-lg btn-block table-hover mx-0",onClick:function(){console.log("Retrieving patient's encounters"),a()},children:["All Encounters",Object(j.jsx)("div",{className:"badge badge-primary mx-2",children:t.length}),Object(j.jsx)(O.a,{})]}),Object(j.jsx)("dl",{children:t.map((function(e,t){var r=e.resource.id===n,a=r?"row table-hover m-0 px-2 selected":"row table-hover m-0 px-2",s=r?"visible":"invisible";return Object(j.jsxs)("div",{className:a,onClick:function(){return t=e.resource.id,void c(t);var t},children:[Object(j.jsx)("dt",{children:Object(j.jsxs)("a",{href:e.fullUrl,children:[e.resource.id," ",Object(j.jsx)(u.a,{className:s})]})}),Object(j.jsxs)("dd",{children:[Object(j.jsx)("div",{children:e.resource.period.start.split("T")[0]}),Object(j.jsxs)("div",{children:[" ",e.resource.class.display]})]})]},t)}))})]})},x=function(e){var t=e.toggleShowNewReferral,r=e.showNewReferral,n=e.currentEncounter,c=e.sendNotificationUU,a=e.profileName,s=function(){t()};return Object(j.jsxs)("div",{className:"encounterSummary",children:[Object(j.jsxs)("div",{className:"h4 pt-2 d-inline-block",children:["Current Encounter: ",n]}),Object(j.jsx)("div",{className:"btn btn-primary d-inline float-end",onClick:function(){console.log("sending an encounter notification to Unite Us..."),c()},children:"Send Notification to Unite Us"}),r?Object(j.jsx)("div",{className:"btn btn-warning d-inline float-end",onClick:s,children:"Cancel New Referral"}):Object(j.jsx)("button",{className:"btn btn-primary d-inline float-end",onClick:s,disabled:"Epic"===a,children:"Create new referral"})]})},g=function(e){var t=e.onCreate,r=e.toggleShowNewReferral,c=Object(n.useState)(""),a=Object(d.a)(c,2),s=a[0],i=a[1],o=Object(n.useState)(""),l=Object(d.a)(o,2),u=l[0],b=l[1],f=Object(n.useState)(""),h=Object(d.a)(f,2),p=h[0],m=h[1],O=Object(n.useState)(""),v=Object(d.a)(O,2),x=v[0],g=v[1],N=Object(n.useState)(""),y=Object(d.a)(N,2),k=y[0],w=y[1],T=function(e){e.preventDefault(),x?(t({serviceType:x,description:k,referredToGroupIds:s,referredFromGroupId:u,networkId:p}),i(""),b("demo-hospital"),m("demo-network"),g(""),w("")):alert("Please select a service for the referral!")};return Object(j.jsx)("div",{className:"newReferral",children:Object(j.jsxs)("form",{className:"add-form",onSubmit:T,children:[Object(j.jsxs)("div",{className:"row",children:[Object(j.jsxs)("div",{className:"col-lg-6",children:[Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{className:"col-form-label",children:"SENDING NETWORK"}),Object(j.jsx)("div",{children:Object(j.jsx)("input",{className:"form-control",type:"text",placeholder:"Healthy Demo Network",readOnly:!0,value:p,onChange:function(e){return m(e.target.value)}})})]}),Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{className:"col-form-label",children:"SENDER"}),Object(j.jsx)("div",{children:Object(j.jsx)("input",{className:"form-control",type:"text",readOnly:!0,placeholder:"Local Hospital Center",value:u,onChange:function(e){return b(e.target.value)}})})]}),Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{className:"col-form-label",children:"SERVICE TYPE"}),Object(j.jsx)("div",{children:Object(j.jsxs)("select",{className:"form-control",value:x.value,onChange:function(e){return g({value:e.target.value,text:e.target.options[e.target.selectedIndex].text})},children:[Object(j.jsx)("option",{children:"Select a service ..."}),Object(j.jsx)("option",{value:"e281c5da-5fbd-41ea-a32e-6efc32f0a156",children:"Clothing and Household Goods"}),Object(j.jsx)("option",{value:"f020d616-5016-4fb7-9fad-91d8d99cd7a1",children:"Emergency Food"}),Object(j.jsx)("option",{value:"f6760383-7fc4-442b-b686-fc5055bfec06",children:"Emergency Housing"}),Object(j.jsx)("option",{value:"ba3eb996-9647-453f-abe4-c04dc84c319e",children:"Food Assistance"}),Object(j.jsx)("option",{value:"5c7dec03-e340-4b48-8d4b-f24af7410a3a",children:"Housing and Shelter"}),Object(j.jsx)("option",{value:"eceb120f-4888-4c42-957f-c90fd5582f83",children:"Transportation"})]})})]})]}),Object(j.jsxs)("div",{className:"col-lg-6",children:[Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{className:"col-form-label",children:"RECEIVING NETWORK"}),Object(j.jsx)("div",{children:Object(j.jsx)("input",{className:"form-control",type:"text",readOnly:!0,placeholder:"Healthy Demo Network",value:p,onChange:function(e){return m(e.target.value)}})})]}),Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{className:"col-form-label",children:"RECEIPIENT"}),Object(j.jsx)("div",{children:Object(j.jsxs)("select",{className:"form-control",value:s.value,onChange:function(e){return i({value:e.target.value,text:e.target.options[e.target.selectedIndex].text})},children:[Object(j.jsx)("option",{children:"Select an organization ..."}),Object(j.jsx)("option",{value:"b8835025-bf3f-455f-9b1d-5efda6772b98",children:"BusRides Sustainable Transportation Act"}),Object(j.jsx)("option",{value:"ebea1516-6343-4f76-980f-a637e580cfd3",children:"Housing California"}),Object(j.jsx)("option",{value:"3491714a-aa7e-4a9c-a4d7-c8fe7c6b0bc0",children:"River City Food Bank"}),Object(j.jsx)("option",{value:"9dd692cb-4eb3-46cb-a178-ab9eda2c83f6",children:"St. Mary's Shelter"}),Object(j.jsx)("option",{value:"8d18165d-0c32-4f82-b331-ef537f4382aa",children:"The Food Pantries for the Capital District"})]})})]}),Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{className:"col-form-label",children:"DESCRIPTION"}),Object(j.jsx)("div",{children:Object(j.jsx)("textarea",{className:"form-control",rows:"3",cols:"50",placeholder:"Enter a description for the referral",value:k,onChange:function(e){return w(e.target.value)}})})]})]})]}),Object(j.jsxs)("div",{className:"row d-inline",children:[Object(j.jsx)("input",{value:"Cancel",className:"btn btn-warning col-md-6 mt-4",onClick:function(){r()},readOnly:!0}),Object(j.jsx)("input",{value:"Submit",className:"btn btn-primary col-md-6 mt-4",onClick:T,readOnly:!0})]})]})})},N=r(14),y=r(36),k=r(37);var w=function(e){var t=e.referral,r=Object(n.useState)(!1),c=Object(d.a)(r,2),a=c[0],s=c[1],i=Object(n.useState)(),o=Object(d.a)(i,2),l=o[0],u=o[1],b=function(e){u(e),s(!0)},f=function(){return s(!1)};return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("div",{className:"row table-hover px-3",children:Object(j.jsx)("table",{className:"table table-sm align-middle text-start",children:Object(j.jsxs)("tbody",{children:[Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{scoope:"row",children:t.ServiceRequest.resource.resourceType}),Object(j.jsx)("td",{children:Object(j.jsxs)("button",{type:"button",className:"btn btn-link",onClick:function(){return b(t.ServiceRequest)},children:[t.ServiceRequest.resource.id," ",Object(j.jsx)(N.a,{})]})})]}),Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{scoope:"row",children:t.Task.resource.resourceType}),Object(j.jsx)("td",{children:Object(j.jsxs)("button",{type:"button",className:"btn btn-link",onClick:function(){return b(t.Task)},children:[t.Task.resource.id," ",Object(j.jsx)(N.a,{})]})})]}),t.Patient?Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{scoope:"row",children:t.Patient.resource.resourceType}),Object(j.jsx)("td",{children:Object(j.jsxs)("button",{type:"button",className:"btn btn-link",onClick:function(){return b(t.Patient)},children:[t.Patient.resource.id," ",Object(j.jsx)(N.a,{})]})})]}):null,t.Practitioner?Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{scoope:"row",children:t.Practitioner.resource.resourceType}),Object(j.jsx)("td",{children:Object(j.jsxs)("button",{type:"button",className:"btn btn-link",onClick:function(){return b(t.Practitioner)},children:[t.Practitioner.resource.id," ",Object(j.jsx)(N.a,{})]})})]}):null]})})}),Object(j.jsxs)(y.a,{size:"lg",show:a,onHide:f,children:[Object(j.jsx)(y.a.Header,{closeButton:!0,children:Object(j.jsxs)(y.a.Title,{children:[null===l||void 0===l?void 0:l.resource.resourceType," : ",null===l||void 0===l?void 0:l.resource.id]})}),Object(j.jsx)(y.a.Body,{children:Object(j.jsx)("pre",{id:"json",children:JSON.stringify(l,void 0,2)})}),Object(j.jsx)(y.a.Footer,{children:Object(j.jsx)(k.a,{variant:"warning",onClick:f,children:"Close"})})]})]})};var T=function(e){var t=e.onCreate,r=e.referralList,c=e.currentEncounter,a=e.sendNotificationUU,s=e.profileName,i=Object(n.useState)(!1),o=Object(d.a)(i,2),l=o[0],u=o[1],b=function(){u((function(e){return!e}))};return Object(j.jsx)("div",{className:"col-md-9 col-lg-10 px-0",children:Object(j.jsxs)("div",{className:"referrals",children:[Object(j.jsx)(x,{toggleShowNewReferral:b,showNewReferral:l,currentEncounter:c,sendNotificationUU:a,profileName:s}),l?Object(j.jsx)(g,{onCreate:function(e){t(e),b()},toggleShowNewReferral:b}):null,Object(j.jsxs)("div",{className:"referralList",children:[Object(j.jsxs)("div",{className:"h5 py-3",children:["This encounter has ",r.length>1?r.length+" referrals.":1===r.length?" 1 referral.":" no referrals."]}),r.length>0?r.map((function(e,t){return Object(j.jsx)(w,{referral:e},t)})):null]})]})})},I={name:"Epic",defaultPatient:{firstName:"Beverly",lastName:"Ccm",gender:"Female",dob:"01/01/1940",mrn:"203722",fhirId:"egHmZUd91rLItB1AqGV49Pg3",uuid:"b5318891-3dc8-426a-af50-531e106ad1a1"},defaultProvider:{firstName:"Case",lastName:"Manager",fhirId:"eaToFIkaJ32mO4K002q3BLw3",uuid:"94e5f7ee-1425-42bc-8833-3474b687b125",groupId:"bf4aa373-81eb-4da5-9980-2d3e51c57b3c",networkId:"145ca925-ba86-490d-b404-35f4fe5ada66"},defaultEncounter:"eFBT3k94CLm3fCPMNlKH2DQ3",defaultBaseUrl:"https://apporchard.epic.com/interconnect-aocurprd-oauth/api/FHIR/R4",defaultNotificationUrl:"https://fhir-crn.uniteustraining.com/rick/FhirNotificationWebService",accessToken:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46ZXBpYzphcHBvcmNoYXJkLmN1cnByb2QiLCJjbGllbnRfaWQiOiIyYWViZDQ1Ni02YzlmLTRlYmYtYWU4ZS0wYjc4MTA1MTY0NGEiLCJlcGljLmVjaSI6InVybjplcGljOkN1cnJlbnQtQXBwLU9yY2hhcmQtUHJvZHVjdGlvbiIsImVwaWMubWV0YWRhdGEiOiJVUjEteFpubkdGNUFCMWh2cVVwaXdSQ1hrYzh6bTNlZDh4TlpERjRWN2VPelQtOVlHSUNjaE4za1VpZzRhZ0FfakM1cEZVX3NCdk9QQ2QzV1ZpMHdjYzJTTFYwQU5XSkFGSXNRUnY4djhZVTZ6bXdSWHhvdEhzUEdTaHlQWURSeiIsImVwaWMudG9rZW50eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIwMjc3MzEzLCJpYXQiOjE2MjAyNzM3MTMsImlzcyI6InVybjplcGljOmFwcG9yY2hhcmQuY3VycHJvZCIsImp0aSI6IjRmNjQ5ZGZlLWI0ODgtNDdlMi04YjdmLTBlMjkzNDY4YzRlNyIsIm5iZiI6MTYyMDI3MzcxMywic3ViIjoiZXhmbzZFNEVYaldzbmhBMU9HVkVsZ3czIn0.od55jY-8la1DDbALRliDJYmbt-hFVp5zNrVa6TqXvX4EQt8tZ3h-Puw61BHMPUFpe1SMJ6D3iRnsXz5Z29rbVO3Vb5-VryyJOv_PqTtjBLX3oI3WA7XLcsR6shp9Jc7X9kIMWRaXK-BoG3uhhMyA2_ueEn_2j2R6ra46zm2JTw-khrXcn1FxvJ2P6Azs5vwnEl2y6X1OPrkblFpFN2C0foWgiCVGFCwVmMghXoJPPNgge5DTSiAWV8PVF1LLQ24PM3tcU8JMIpu1Q52Cs5m1RSczstKJvDtNwgVeQdUGplMu720ykZG2h2BYc_cAQkfQlOS8fNrMKsm-0BD9AZVG4g"},S={name:"Logica",defaultPatient:{firstName:"Aaron",lastName:"Alexis",gender:"Male",dob:"10/26/1989",mrn:"smart-9995679",fhirId:"smart-9995679",uuid:"74216479-7594-413c-9835-9f00a51e5686"},defaultProvider:{firstName:"Demo",lastName:"Provider",fhirId:"smart-Practitioner-71482713",uuid:"94e5f7ee-1425-42bc-8833-3474b687b125",groupId:"bf4aa373-81eb-4da5-9980-2d3e51c57b3c",networkId:"145ca925-ba86-490d-b404-35f4fe5ada66"},defaultEncounter:"smart-5",defaultBaseUrl:"https://api.logicahealth.org/uufhircrn/open",defaultNotificationUrl:"https://fhir-crn.uniteustraining.com/rick/FhirNotificationWebService",accessToken:""};var C=function(){var e=I,t=e.name,r=Object(n.useState)(t),c=Object(d.a)(r,2),a=c[0],s=c[1],i=Object(n.useState)(e.defaultPatient),u=Object(d.a)(i,2),b=u[0],f=u[1],h=Object(n.useState)(e.defaultProvider),p=Object(d.a)(h,2),O=p[0],x=p[1],g=Object(n.useState)(e.defaultEncounter),N=Object(d.a)(g,2),y=N[0],k=N[1],w=Object(n.useState)(e.access_token),C=Object(d.a)(w,2),E=C[0],P=C[1],R=Object(n.useState)(e.defaultBaseUrl),U=Object(d.a)(R,2),M=U[0],V=U[1],z=Object(n.useState)(e.defaultNotificationUrl),F=Object(d.a)(z,2),D=F[0],L=F[1],A=Object(n.useState)([]),G=Object(d.a)(A,2),J=G[0],B=G[1],H=Object(n.useState)([]),Y=Object(d.a)(H,2),Z=Y[0],Q=Y[1],X=function(){var e=Object(l.a)(o.a.mark((function e(t){var r,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("Switch to profile: ",t),s(t),f((r="Logica"===t?S:I).defaultPatient),x(r.defaultProvider),V(r.defaultBaseUrl),L(r.defaultNotificationUrl),"Epic"!==r.name){e.next=14;break}return e.next=10,ne();case 10:n=e.sent,P(n),e.next=15;break;case 14:P(r.accessToken);case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),W=function(){var e=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,te(b.fhirId,M);case 2:if(!((null===(t=e.sent)||void 0===t?void 0:t.length)>0)){e.next=6;break}return e.next=6,$(t[0].resource.id,M);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),q=function(){var e=Object(l.a)(o.a.mark((function e(t){var r,n,c,a,s,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("create referral: ",t),r=(new Date).toISOString(),n=M+"/ServiceRequest",c={resourceType:"ServiceRequest",status:"active",intent:"plan",category:[{coding:[{system:"http://snomed.info/sct",code:"307835004",display:"Referral by service (finding)"}],text:"Referral by service"}],priority:"routine",subject:{reference:"Patient/".concat(b.fhirId),display:b.firstName+" "+b.lastName},encounter:{reference:"Encounter/".concat(y),display:"Hospital Admission"},authoredOn:r,requester:[{reference:"Practitioner/".concat(O.fhirId),display:O.firstName+" "+O.lastName}],orderDetail:{text:t.serviceType.text,coding:[{system:"Unite Us",code:t.serviceType.value,display:t.serviceType.text}]}},e.next=6,fetch(n,{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(c)});case 6:return a=e.sent,e.next=9,a.json();case 9:return s=e.sent,console.log("new referral: ",s),i=s.id,console.log("server request id: ",i),n=M+"/Task",c={resourceType:"Task",basedOn:[{reference:"ServiceRequest/".concat(i)}],status:"requested",intent:"plan",priority:"routine",for:{reference:"Patient/".concat(b.fhirId),display:b.firstName+" "+b.lastName},encounter:{reference:"Encounter/".concat(y),display:"Hospital Admission"},authoredOn:r,lastModified:r,requester:[{reference:"Practitioner/".concat(O.fhirId),display:O.firstName+" "+O.lastName}],description:t.description+"/n referred to : "+t.referredToGroupIds.text+" ["+t.referredToGroupIds.value+"]",owner:{type:"Organization",identifier:{use:"usual",system:"Unite Us",value:t.referredToGroupIds.value},display:t.referredToGroupIds.text}},e.next=17,fetch(n,{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(c)});case 17:return a=e.sent,e.next=20,a.json();case 20:return s=e.sent,console.log("new referral: ",s),i=s.id,console.log("Task id: ",i),e.next=26,ee();case 26:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),_=function(){var e=Object(l.a)(o.a.mark((function e(){var t,r,n,c,a,s,i,l=arguments;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=l.length>0&&void 0!==l[0]?l[0]:y,r=l.length>1&&void 0!==l[1]?l[1]:M,n=r+"/Task?encounter="+t+"&_include=Task%3Apatient&_include=Task%3Aencounter&_include=Task%3Arequester&_include=Task%3Abased-on&_include=Task%3Aowner%3AOrganization",e.next=5,fetch(n,{method:"GET",headers:{"Content-type":"application/json",Accept:"application/json",Authorization:(null===E||void 0===E?void 0:E.length)>0?"bearer "+E:""}});case 5:return c=e.sent,e.next=8,c.json();case 8:if(a=e.sent,s=0===a.total?[]:a.entry){e.next=12;break}return e.abrupt("return",[]);case 12:return console.log("Task bundle received: ",s),i=[],s.forEach((function(e,t){if("Task"===e.resource.resourceType){var r={id:"Task/"+e.resource.id,Task:e};i.push(r)}})),i.forEach((function(e,t){var r,n,c,a,i=null===e||void 0===e||null===(r=e.Task)||void 0===r?void 0:r.resource;if(i){var o=null===(n=i.for)||void 0===n?void 0:n.reference,l=i.basedOn[0].reference,d=null===(c=i.requester)||void 0===c?void 0:c.reference,u=null===(a=i.owner)||void 0===a?void 0:a.reference;s.forEach((function(t,r){var n=t.resource.id;switch(t.resource.resourceType){case"ServiceRequest":l==="ServiceRequest/".concat(n)&&(e.ServiceRequest=t);break;case"Patient":o==="Patient/".concat(n)&&(e.Patient=t);break;case"Organization":u==="Organization/".concat(n)&&(e.Organization=t);break;case"Practitioner":d==="Practitioner/".concat(n)&&(e.Practitioner=t)}}))}})),console.log("referral list",i),i.sort((function(e,t){var r=new Date(e.ServiceRequest.resource.authoredOn).getTime();return new Date(t.ServiceRequest.resource.authoredOn).getTime()-r})),e.abrupt("return",i);case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),K=function(){var e=Object(l.a)(o.a.mark((function e(){var t,r,n,c,a,s,i=arguments;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=i.length>0&&void 0!==i[0]?i[0]:b.fhirId,r=i.length>1&&void 0!==i[1]?i[1]:M,n=r+"/Encounter?patient="+t,e.next=5,fetch(n,{method:"GET",headers:{"Content-type":"application/json",Accept:"application/json",Authorization:(null===E||void 0===E?void 0:E.length)>0?"bearer "+E:""}});case 5:return c=e.sent,e.next=8,c.json();case 8:return a=e.sent,(s=a.total>0?a.entry:[]).sort((function(e,t){var r=new Date(e.resource.period.start).getTime();return new Date(t.resource.period.start).getTime()-r})),console.log("encounter",s),e.abrupt("return",s);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),$=function(){var e=Object(l.a)(o.a.mark((function e(t,r){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return k(t),e.next=3,ee(t,r);case 3:return e.abrupt("return");case 4:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),ee=function(){var e=Object(l.a)(o.a.mark((function e(t,r){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_(t,r);case 2:n=e.sent,B(n);case 4:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),te=function(){var e=Object(l.a)(o.a.mark((function e(t,r){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K(t,r);case 2:return n=e.sent,Q(n),e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),re=function(){var e=Object(l.a)(o.a.mark((function e(){var t,r,n,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=D,r={resourceType:"Bundle",type:"Event",entry:[{fullUrl:M+"/Encounter/"+y}]},e.next=4,fetch(t,{method:"POST",headers:{"Content-type":"application/json","x-api-key":"sfsdfddfdsfsdfs32342343"},body:JSON.stringify(r)});case 4:return n=e.sent,e.next=7,n.json();case 7:return c=e.sent,console.log("notification response: ",c),e.abrupt("return",c);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ne=function(){var e=Object(l.a)(o.a.mark((function e(){var t,r,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://5yhugddpmk.execute-api.us-east-1.amazonaws.com/rick/mockapi/authentication/token",e.next=3,fetch("https://5yhugddpmk.execute-api.us-east-1.amazonaws.com/rick/mockapi/authentication/token",{method:"POST",headers:{"Content-type":"application/json",Accept:"application/json","x-api-key":"sfsdfddfdsfsdfs32342343","Access-Control-Allow-Origin":"*"},body:JSON.stringify({privateKey:null})});case 3:return t=e.sent,e.next=6,t.json();case 6:return r=e.sent,n=r.body.access_token,console.log("access token ",n),e.abrupt("return",n);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){(function(){var e=Object(l.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,X(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}})()(t)}),[]),Object(n.useEffect)((function(){(function(){var e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[E]),Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)(m,{patient:b,provider:O,profileName:a,switchProfile:X}),Object(j.jsxs)("div",{className:"row mt-1 mx-0",children:[Object(j.jsx)(v,{encounterList:Z,currentEncounter:y,changeCurrentEncounter:$,refreshEncounters:te}),Object(j.jsx)(T,{onCreate:q,referralList:J,currentEncounter:y,sendNotificationUU:re,profileName:a})]})]})},E=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,38)).then((function(t){var r=t.getCLS,n=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;r(e),n(e),c(e),a(e),s(e)}))};r(32);s.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(C,{})}),document.getElementById("root")),E()}},[[33,1,2]]]);
//# sourceMappingURL=main.b3c43592.chunk.js.map