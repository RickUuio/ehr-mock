(this["webpackJsonpehr-mock"]=this["webpackJsonpehr-mock"]||[]).push([[0],{27:function(e,t,n){},29:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n.n(r),a=n(14),s=n.n(a),i=(n(27),n(18)),o=n(4),l=n.n(o),u=n(9),d=n(6),b=(n(29),n(13)),j=n(1),f=function(e){var t=e.patient;return Object(j.jsxs)("div",{className:"p-2",children:[Object(j.jsxs)("h4",{style:{color:"yellow"},children:[Object(j.jsx)(b.c,{})," ",t.firstName," ",t.lastName]}),Object(j.jsxs)("h6",{children:[Object(j.jsx)("span",{className:"badge bg-light text-dark",children:"DOB"})," : ",t.dob,Object(j.jsx)("span",{children:"    "}),Object(j.jsx)("span",{className:"badge bg-light text-dark",children:"Gender"})," : ",t.gender]}),Object(j.jsxs)("h6",{children:[Object(j.jsx)("span",{className:"badge bg-light text-dark",children:"MRN"})," : ",t.mrn]}),Object(j.jsxs)("h6",{children:[Object(j.jsx)("span",{className:"badge bg-light text-dark",children:"FHIR ID"})," : ",t.fhirId]})]})},p=function(e){var t=e.provider;return Object(j.jsxs)("div",{className:"p-2",children:[Object(j.jsxs)("h4",{style:{color:"HotPink"},children:[t.firstName," ",t.lastName," ",Object(j.jsx)(b.d,{})]}),Object(j.jsxs)("h6",{children:[Object(j.jsx)("span",{className:"badge bg-light text-dark",children:"FHIR ID"})," : ",t.fhirId]}),Object(j.jsxs)("h6",{children:[Object(j.jsx)("span",{className:"badge bg-light text-dark",children:"UUID "})," : ",t.uuid]})]})},h=function(e){var t=e.profileName,n=e.switchProfile;return Object(j.jsxs)("div",{className:"btn-group mb-2",role:"group","aria-label":"Basic mixed styles example",children:[Object(j.jsx)("input",{type:"radio",className:"btn-check",name:"btnradio",id:"profileEpic",autoComplete:"off",defaultChecked:"Epic"===t,onClick:function(){t="Epic",n("Epic")}}),Object(j.jsx)("label",{class:"btn btn-outline-danger",htmlFor:"profileEpic",children:"Epic AppOrchard"}),Object(j.jsx)("input",{type:"radio",className:"btn-check",name:"btnradio",id:"profileLogica",autoComplete:"off",defaultChecked:"Logica"===t,onClick:function(){t="Logica",n("Logica")}}),Object(j.jsx)("label",{className:"btn btn-outline-info",htmlFor:"profileLogica",children:"Logica Health"})]})},m=function(e){var t=e.title,n=e.patient,r=e.provider,c=e.profileName,a=e.switchProfile;return Object(j.jsx)("header",{children:Object(j.jsx)("div",{id:"navbarTop",children:Object(j.jsxs)("div",{className:"row",children:[Object(j.jsxs)("div",{className:"col-lg-6 col-md-12 order-lg-2",children:[Object(j.jsxs)("h2",{className:"pt-4",children:[Object(j.jsx)(b.b,{style:{color:"#d60c05ee"}})," ",t]}),Object(j.jsx)(h,{profileName:c,switchProfile:a})]}),Object(j.jsx)("div",{className:"col-lg-3 col-md-6 order-lg-1",children:Object(j.jsx)(f,{patient:n})}),Object(j.jsx)("div",{className:"col-lg-3 col-md-6 order-lg-3",children:Object(j.jsx)(p,{provider:r})})]})})})};m.defaultProps={title:"Mock EHR : : Social Care Referrals"};var O=m,v=n(19),x=function(e){var t=e.encounterList,n=e.currentEncounter,r=void 0===n?"smart-2":n,c=e.changeCurrentEncounter,a=e.refreshEncounters;return Object(j.jsxs)("div",{className:"encounter col-md-3 col-lg-2 mx-0 px-0",children:[Object(j.jsxs)("div",{className:"btn btn-default btn-lg btn-block table-hover mx-0",onClick:function(){console.log("Retrieving patient's encounters"),a()},children:["All Encounters",Object(j.jsx)("div",{className:"badge bg-primary mx-2",children:t.length}),Object(j.jsx)(v.a,{})]}),Object(j.jsx)("dl",{children:t.map((function(e,t){var n=e.resource.id===r,a=n?"row table-hover m-0 px-2 selected":"row table-hover m-0 px-2",s=n?"visible":"invisible";return Object(j.jsxs)("div",{className:a,onClick:function(){return t=e.resource.id,void c(t);var t},children:[Object(j.jsx)("dt",{children:Object(j.jsxs)("a",{href:e.fullUrl,children:[e.resource.id," ",Object(j.jsx)(b.a,{className:s})]})}),Object(j.jsxs)("dd",{children:[Object(j.jsx)("div",{children:e.resource.period.start.split("T")[0]}),Object(j.jsxs)("div",{children:[" ",e.resource.class.display]})]})]},t)}))})]})},g=function(e){var t=e.toggleShowNewReferral,n=e.showNewReferral,r=e.currentEncounter,c=e.sendNotificationUU,a=e.profileName,s=function(){t()};return Object(j.jsxs)("div",{className:"encounterSummary",children:[Object(j.jsxs)("div",{className:"h4 pt-2 d-inline-block",children:["Current Encounter: ",r]}),Object(j.jsx)("div",{className:"btn btn-primary d-inline float-end",onClick:function(){console.log("sending an encounter notification to Unite Us..."),c()},children:"Send Notification to Unite Us"}),n?Object(j.jsx)("div",{className:"btn btn-warning d-inline float-end",onClick:s,children:"Cancel New Referral"}):Object(j.jsx)("button",{className:"btn btn-primary d-inline float-end",onClick:s,disabled:"Epic"===a,children:"Create new referral"})]})},N=function(e){var t=e.onCreate,n=e.toggleShowNewReferral,c=Object(r.useState)(""),a=Object(d.a)(c,2),s=a[0],i=a[1],o=Object(r.useState)(""),l=Object(d.a)(o,2),u=l[0],b=l[1],f=Object(r.useState)(""),p=Object(d.a)(f,2),h=p[0],m=p[1],O=Object(r.useState)(""),v=Object(d.a)(O,2),x=v[0],g=v[1],N=Object(r.useState)(""),y=Object(d.a)(N,2),k=y[0],w=y[1],T=function(e){e.preventDefault(),x?(t({serviceType:x,description:k,referredToGroupIds:s,referredFromGroupId:u,networkId:h}),i(""),b("demo-hospital"),m("demo-network"),g(""),w("")):alert("Please select a service for the referral!")};return Object(j.jsx)("div",{className:"newReferral",children:Object(j.jsxs)("form",{className:"add-form",onSubmit:T,children:[Object(j.jsxs)("div",{className:"row",children:[Object(j.jsxs)("div",{className:"col-lg-6",children:[Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{className:"col-form-label",children:"SENDING NETWORK"}),Object(j.jsx)("div",{children:Object(j.jsx)("input",{className:"form-control",type:"text",placeholder:"Healthy Demo Network",readOnly:!0,value:h,onChange:function(e){return m(e.target.value)}})})]}),Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{className:"col-form-label",children:"SENDER"}),Object(j.jsx)("div",{children:Object(j.jsx)("input",{className:"form-control",type:"text",readOnly:!0,placeholder:"Local Hospital Center",value:u,onChange:function(e){return b(e.target.value)}})})]}),Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{className:"col-form-label",children:"SERVICE TYPE"}),Object(j.jsx)("div",{children:Object(j.jsxs)("select",{className:"form-control",value:x.value,onChange:function(e){return g({value:e.target.value,text:e.target.options[e.target.selectedIndex].text})},children:[Object(j.jsx)("option",{children:"Select a service ..."}),Object(j.jsx)("option",{value:"e281c5da-5fbd-41ea-a32e-6efc32f0a156",children:"Clothing and Household Goods"}),Object(j.jsx)("option",{value:"f020d616-5016-4fb7-9fad-91d8d99cd7a1",children:"Emergency Food"}),Object(j.jsx)("option",{value:"f6760383-7fc4-442b-b686-fc5055bfec06",children:"Emergency Housing"}),Object(j.jsx)("option",{value:"ba3eb996-9647-453f-abe4-c04dc84c319e",children:"Food Assistance"}),Object(j.jsx)("option",{value:"5c7dec03-e340-4b48-8d4b-f24af7410a3a",children:"Housing and Shelter"}),Object(j.jsx)("option",{value:"eceb120f-4888-4c42-957f-c90fd5582f83",children:"Transportation"})]})})]})]}),Object(j.jsxs)("div",{className:"col-lg-6",children:[Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{className:"col-form-label",children:"RECEIVING NETWORK"}),Object(j.jsx)("div",{children:Object(j.jsx)("input",{className:"form-control",type:"text",readOnly:!0,placeholder:"Healthy Demo Network",value:h,onChange:function(e){return m(e.target.value)}})})]}),Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{className:"col-form-label",children:"RECEIPIENT"}),Object(j.jsx)("div",{children:Object(j.jsxs)("select",{className:"form-control",value:s.value,onChange:function(e){return i({value:e.target.value,text:e.target.options[e.target.selectedIndex].text})},children:[Object(j.jsx)("option",{children:"Select an organization ..."}),Object(j.jsx)("option",{value:"b8835025-bf3f-455f-9b1d-5efda6772b98",children:"BusRides Sustainable Transportation Act"}),Object(j.jsx)("option",{value:"ebea1516-6343-4f76-980f-a637e580cfd3",children:"Housing California"}),Object(j.jsx)("option",{value:"3491714a-aa7e-4a9c-a4d7-c8fe7c6b0bc0",children:"River City Food Bank"}),Object(j.jsx)("option",{value:"9dd692cb-4eb3-46cb-a178-ab9eda2c83f6",children:"St. Mary's Shelter"}),Object(j.jsx)("option",{value:"8d18165d-0c32-4f82-b331-ef537f4382aa",children:"The Food Pantries for the Capital District"})]})})]}),Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{className:"col-form-label",children:"DESCRIPTION"}),Object(j.jsx)("div",{children:Object(j.jsx)("textarea",{className:"form-control",rows:"3",cols:"50",placeholder:"Enter a description for the referral",value:k,onChange:function(e){return w(e.target.value)}})})]})]})]}),Object(j.jsxs)("div",{className:"row d-inline",children:[Object(j.jsx)("input",{value:"Cancel",className:"btn btn-warning col-md-6 mt-4",onClick:function(){n()},readOnly:!0}),Object(j.jsx)("input",{value:"Submit",className:"btn btn-primary col-md-6 mt-4",onClick:T,readOnly:!0})]})]})})},y=n(10),k=n(38),w=n(39);var T=function(e){var t,n,c,a,s,i,o,l,u,b=e.referral,f=Object(r.useState)(!1),p=Object(d.a)(f,2),h=p[0],m=p[1],O=Object(r.useState)(),v=Object(d.a)(O,2),x=v[0],g=v[1],N=function(e){g(e),m(!0)},T=function(){return m(!1)},S=function(e){return e.identifier.find((function(e){return"HTTPS://UNITEUS.COM/IO/STRUCTUREDEFINITION/CBO-UUID"===e.system.toUpperCase()}))};return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("div",{className:"row table-hover px-3",children:Object(j.jsx)("table",{className:"table table-sm align-middle text-start",children:Object(j.jsxs)("tbody",{children:[Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{scoope:"row",children:Object(j.jsxs)("button",{type:"button",className:"btn btn-link",onClick:function(){return N(b.ServiceRequest.resource)},children:[b.ServiceRequest.resource.resourceType," ",Object(j.jsx)(y.a,{})]})}),Object(j.jsxs)("td",{children:["Referral was authored on"," ",Object(j.jsx)("div",{className:"btn btn-outline-primary disabled",children:b.ServiceRequest.resource.authoredOn})," ","by"," ",Object(j.jsxs)("div",{className:"btn btn-outline-primary",onClick:function(){return N(b.Practitioner.resource)},children:[b.ServiceRequest.resource.requester.display," ",Object(j.jsx)(y.a,{})]}),"."," ",b.ServiceRequest.resource.orderDetail?Object(j.jsxs)("span",{children:["Service type is ",Object(j.jsx)("div",{className:"btn btn-outline-primary disabled",children:b.ServiceRequest.resource.orderDetail[0].text}),"."]}):"Service type has not been confirmed yet.",b.ServiceRequest.resource.supportingInfo?Object(j.jsxs)("span",{children:[" ","Attached is a supporting document of",Object(j.jsxs)("div",{className:"btn btn-outline-primary",onClick:function(){return N(b.DocumentReference[0])},children:[b.DocumentReference[0].type.text," ",Object(j.jsx)(y.a,{})]})]}):null]})]}),Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{scoope:"row",children:Object(j.jsxs)("button",{type:"button",className:"btn btn-link",onClick:function(){return N(b.Task.resource)},children:[b.Task.resource.resourceType," ",Object(j.jsx)(y.a,{})]})}),Object(j.jsxs)("td",{children:[Object(j.jsxs)("span",{children:["Referral status is"," ",Object(j.jsx)("div",{className:"btn btn-outline-primary disabled",children:null===(t=b.Task)||void 0===t||null===(n=t.resource)||void 0===n?void 0:n.status}),", last modified on"," ",Object(j.jsx)("div",{className:"btn btn-outline-primary disabled",children:null===(c=b.Task)||void 0===c||null===(a=c.resource)||void 0===a?void 0:a.lastModified})]})," ",Object(j.jsxs)("span",{children:["Recipient is"," ",Object(j.jsxs)("div",{className:"btn btn-outline-primary",onClick:function(){var e;return N(null===(e=b.Organization)||void 0===e?void 0:e.resource)},children:[null===(s=b.Task)||void 0===s||null===(i=s.resource)||void 0===i||null===(o=i.owner)||void 0===o?void 0:o.display," ",Object(j.jsx)(y.a,{})]})]})]})]}),b.Organization?Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{scoope:"row",children:Object(j.jsxs)("button",{type:"button",className:"btn btn-link",onClick:function(){return N(b.Organization.resource)},children:[b.Organization.resource.resourceType," ",Object(j.jsx)(y.a,{})]})}),Object(j.jsxs)("td",{children:[Object(j.jsxs)("span",{children:["Recipient is"," ",Object(j.jsx)("div",{className:"btn btn-outline-primary disabled",children:b.Organization.resource.name})]}),S(b.Organization.resource)?Object(j.jsxs)("span",{children:["Their Unite Us UUID is"," ",Object(j.jsx)("div",{className:"btn btn-outline-primary disabled",children:S(b.Organization.resource).value})]}):null]})]}):null,b.Patient?Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{scoope:"row",children:Object(j.jsxs)("button",{type:"button",className:"btn btn-link",onClick:function(){return N(b.Patient.resource)},children:[b.Patient.resource.resourceType," ",Object(j.jsx)(y.a,{})]})}),Object(j.jsx)("td",{children:Object(j.jsxs)("div",{className:"btn btn-outline-primary disabled",children:[b.Patient.resource.name[0].family,", ",b.Patient.resource.name[0].given[0]]})})]}):null,b.Practitioner?Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{scoope:"row",children:Object(j.jsxs)("button",{type:"button",className:"btn btn-link",onClick:function(){return N(b.Practitioner.resource)},children:[b.Practitioner.resource.resourceType," ",Object(j.jsx)(y.a,{})]})}),Object(j.jsx)("td",{children:Object(j.jsxs)("div",{className:"btn btn-outline-primary disabled",children:[b.Practitioner.resource.name[0].family,", ",b.Practitioner.resource.name[0].given[0]]})})]}):null,null===(l=b.DocumentReference)||void 0===l?void 0:l.map((function(e,t){return Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{scoope:"row",children:Object(j.jsxs)("button",{type:"button",className:"btn btn-link",onClick:function(){return N(e)},children:[e.resourceType,Object(j.jsx)(y.a,{})]})}),Object(j.jsx)("td",{children:Object(j.jsxs)("span",{children:["Document type is"," ",Object(j.jsx)("div",{className:"btn btn-outline-primary disabled",children:e.type.text}),". Document filename is"," ",Object(j.jsx)("div",{className:"btn btn-outline-primary disabled",children:e.description})]})})]},t)})),null===(u=b.Communication)||void 0===u?void 0:u.map((function(e,t){var n,r,c,a;return Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{scoope:"row",children:Object(j.jsxs)("button",{type:"button",className:"btn btn-link",onClick:function(){return N(e.resource)},children:[e.resource.resourceType," ",Object(j.jsx)(y.a,{})]})}),Object(j.jsxs)("td",{children:[Object(j.jsxs)("span",{children:["On"," ",Object(j.jsx)("div",{className:"btn btn-outline-primary disabled",children:null===(n=e.resource)||void 0===n?void 0:n.sent}),", sent from"," ",Object(j.jsx)("div",{className:"btn btn-outline-primary disabled",children:null===(r=e.resource)||void 0===r?void 0:r.sender.display}),"to"," ",Object(j.jsx)("div",{className:"btn btn-outline-primary disabled",children:null===(c=e.resource)||void 0===c?void 0:c.recipient[0].display}),"."]}),e.resource.payload?Object(j.jsxs)("p",{children:[" ","Note message:"," ",Object(j.jsx)("div",{className:"btn btn-outline-primary disabled",children:e.resource.payload[0].contentString})]}):Object(j.jsx)("span",{children:" Note message is empty."}),e.resource.payload&&(null===(a=e.resource.payload[1])||void 0===a?void 0:a.contentReference)?Object(j.jsxs)("p",{children:[" ","A"," ",Object(j.jsxs)("div",{className:"btn btn-outline-primary",onClick:function(){return N(b.DocumentReference[0])},children:["document ",Object(j.jsx)(y.a,{})]})," ","was attached to the communication."]}):null]})]},t)}))]})})}),Object(j.jsxs)(k.a,{size:"lg",show:h,onHide:T,children:[Object(j.jsx)(k.a.Header,{closeButton:!0,children:Object(j.jsxs)(k.a.Title,{children:[null===x||void 0===x?void 0:x.resourceType," : ",null===x||void 0===x?void 0:x.id]})}),Object(j.jsx)(k.a.Body,{children:Object(j.jsx)("pre",{id:"json",children:JSON.stringify(x,void 0,2)})}),Object(j.jsx)(k.a.Footer,{children:Object(j.jsx)(w.a,{variant:"warning",onClick:T,children:"Close"})})]})]})};var S=function(e){var t=e.onCreate,n=e.referralList,c=e.currentEncounter,a=e.sendNotificationUU,s=e.profileName,i=Object(r.useState)(!1),o=Object(d.a)(i,2),l=o[0],u=o[1],b=function(){u((function(e){return!e}))};return Object(j.jsx)("div",{className:"col-md-9 col-lg-10 px-0",children:Object(j.jsxs)("div",{className:"referrals",children:[Object(j.jsx)(g,{toggleShowNewReferral:b,showNewReferral:l,currentEncounter:c,sendNotificationUU:a,profileName:s}),l?Object(j.jsx)(N,{onCreate:function(e){t(e),b()},toggleShowNewReferral:b}):null,Object(j.jsxs)("div",{className:"referralList",children:[Object(j.jsxs)("div",{className:"h5 py-3",children:["This encounter has ",n.length>1?n.length+" referrals.":1===n.length?" 1 referral.":" no referrals."]}),n.length>0?n.map((function(e,t){return Object(j.jsx)(T,{referral:e},t)})):null]})]})})},C={name:"Epic",defaultPatient:{firstName:"Beverly",lastName:"Ccm",gender:"Female",dob:"01/01/1940",mrn:"203722",fhirId:"egHmZUd91rLItB1AqGV49Pg3",uuid:"b5318891-3dc8-426a-af50-531e106ad1a1"},defaultProvider:{firstName:"Case",lastName:"Manager",fhirId:"eaToFIkaJ32mO4K002q3BLw3",uuid:"94e5f7ee-1425-42bc-8833-3474b687b125",groupId:"bf4aa373-81eb-4da5-9980-2d3e51c57b3c",networkId:"145ca925-ba86-490d-b404-35f4fe5ada66"},defaultEncounter:"eFBT3k94CLm3fCPMNlKH2DQ3",defaultBaseUrl:"https://apporchard.epic.com/interconnect-aocurprd-oauth/api/FHIR/R4",defaultNotificationUrl:"https://fhir-crn.uniteustraining.com/rick/FhirNotificationWebService",accessToken:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46ZXBpYzphcHBvcmNoYXJkLmN1cnByb2QiLCJjbGllbnRfaWQiOiIyYWViZDQ1Ni02YzlmLTRlYmYtYWU4ZS0wYjc4MTA1MTY0NGEiLCJlcGljLmVjaSI6InVybjplcGljOkN1cnJlbnQtQXBwLU9yY2hhcmQtUHJvZHVjdGlvbiIsImVwaWMubWV0YWRhdGEiOiJVUjEteFpubkdGNUFCMWh2cVVwaXdSQ1hrYzh6bTNlZDh4TlpERjRWN2VPelQtOVlHSUNjaE4za1VpZzRhZ0FfakM1cEZVX3NCdk9QQ2QzV1ZpMHdjYzJTTFYwQU5XSkFGSXNRUnY4djhZVTZ6bXdSWHhvdEhzUEdTaHlQWURSeiIsImVwaWMudG9rZW50eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIwMjc3MzEzLCJpYXQiOjE2MjAyNzM3MTMsImlzcyI6InVybjplcGljOmFwcG9yY2hhcmQuY3VycHJvZCIsImp0aSI6IjRmNjQ5ZGZlLWI0ODgtNDdlMi04YjdmLTBlMjkzNDY4YzRlNyIsIm5iZiI6MTYyMDI3MzcxMywic3ViIjoiZXhmbzZFNEVYaldzbmhBMU9HVkVsZ3czIn0.od55jY-8la1DDbALRliDJYmbt-hFVp5zNrVa6TqXvX4EQt8tZ3h-Puw61BHMPUFpe1SMJ6D3iRnsXz5Z29rbVO3Vb5-VryyJOv_PqTtjBLX3oI3WA7XLcsR6shp9Jc7X9kIMWRaXK-BoG3uhhMyA2_ueEn_2j2R6ra46zm2JTw-khrXcn1FxvJ2P6Azs5vwnEl2y6X1OPrkblFpFN2C0foWgiCVGFCwVmMghXoJPPNgge5DTSiAWV8PVF1LLQ24PM3tcU8JMIpu1Q52Cs5m1RSczstKJvDtNwgVeQdUGplMu720ykZG2h2BYc_cAQkfQlOS8fNrMKsm-0BD9AZVG4g"},I={name:"Logica",defaultPatient:{firstName:"Aaron",lastName:"Alexis",gender:"Male",dob:"10/26/1989",mrn:"smart-9995679",fhirId:"smart-9995679",uuid:"74216479-7594-413c-9835-9f00a51e5686"},defaultProvider:{firstName:"Demo",lastName:"Provider",fhirId:"smart-Practitioner-71482713",uuid:"94e5f7ee-1425-42bc-8833-3474b687b125",groupId:"bf4aa373-81eb-4da5-9980-2d3e51c57b3c",networkId:"145ca925-ba86-490d-b404-35f4fe5ada66"},defaultEncounter:"smart-5",defaultBaseUrl:"https://api.logicahealth.org/uufhircrn/open",defaultNotificationUrl:"https://fhir-crn.uniteustraining.com/rick/FhirNotificationWebService",accessToken:""};var E=function(){var e=C,t=e.name,n=Object(r.useState)(t),c=Object(d.a)(n,2),a=c[0],s=c[1],o=Object(r.useState)(e.defaultPatient),b=Object(d.a)(o,2),f=b[0],p=b[1],h=Object(r.useState)(e.defaultProvider),m=Object(d.a)(h,2),v=m[0],g=m[1],N=Object(r.useState)(e.defaultEncounter),y=Object(d.a)(N,2),k=y[0],w=y[1],T=Object(r.useState)(e.access_token),E=Object(d.a)(T,2),R=E[0],P=E[1],U=Object(r.useState)(e.defaultBaseUrl),D=Object(d.a)(U,2),z=D[0],M=D[1],A=Object(r.useState)(e.defaultNotificationUrl),V=Object(d.a)(A,2),F=V[0],G=V[1],L=Object(r.useState)([]),J=Object(d.a)(L,2),B=J[0],H=J[1],Y=Object(r.useState)([]),q=Object(d.a)(Y,2),Z=q[0],Q=q[1],X=function(){var e=Object(u.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("Switch to profile: ",t),s(t),p((n="Logica"===t?I:C).defaultPatient),g(n.defaultProvider),M(n.defaultBaseUrl),G(n.defaultNotificationUrl),"Epic"!==n.name){e.next=14;break}return e.next=10,se();case 10:r=e.sent,P(r),e.next=15;break;case 14:P(n.accessToken);case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),W=function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ce(f.fhirId,z);case 2:if(!((null===(t=e.sent)||void 0===t?void 0:t.length)>0)){e.next=6;break}return e.next=6,ne(t[0].resource.id,z);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){var e=Object(u.a)(l.a.mark((function e(t){var n,r,c,a,s,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("create referral: ",t),n=(new Date).toISOString(),r=z+"/ServiceRequest",c={resourceType:"ServiceRequest",status:"active",intent:"plan",category:[{coding:[{system:"http://snomed.info/sct",code:"307835004",display:"Referral by service (finding)"}],text:"Referral by service"}],priority:"routine",subject:{reference:"Patient/".concat(f.fhirId),display:f.firstName+" "+f.lastName},encounter:{reference:"Encounter/".concat(k),display:"Hospital Admission"},authoredOn:n,requester:[{reference:"Practitioner/".concat(v.fhirId),display:v.firstName+" "+v.lastName}],orderDetail:{text:t.serviceType.text,coding:[{system:"Unite Us",code:t.serviceType.value,display:t.serviceType.text}]}},e.next=6,fetch(r,{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(c)});case 6:return a=e.sent,e.next=9,a.json();case 9:return s=e.sent,console.log("new referral: ",s),i=s.id,console.log("server request id: ",i),r=z+"/Task",c={resourceType:"Task",basedOn:[{reference:"ServiceRequest/".concat(i)}],status:"requested",intent:"plan",priority:"routine",for:{reference:"Patient/".concat(f.fhirId),display:f.firstName+" "+f.lastName},encounter:{reference:"Encounter/".concat(k),display:"Hospital Admission"},authoredOn:n,lastModified:n,requester:[{reference:"Practitioner/".concat(v.fhirId),display:v.firstName+" "+v.lastName}],description:t.description+"/n referred to : "+t.referredToGroupIds.text+" ["+t.referredToGroupIds.value+"]",owner:{type:"Organization",identifier:{use:"usual",system:"Unite Us",value:t.referredToGroupIds.value},display:t.referredToGroupIds.text}},e.next=17,fetch(r,{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(c)});case 17:return a=e.sent,e.next=20,a.json();case 20:return s=e.sent,console.log("new referral: ",s),i=s.id,console.log("Task id: ",i),e.next=26,re();case 26:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),K=function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,r,c,a,s,i,o,u,d,b,j,f,p,h,m,O,v,x=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=x.length>0&&void 0!==x[0]?x[0]:k,n=x.length>1&&void 0!==x[1]?x[1]:z,r=n+"/Task?encounter="+t+"&_include=Task%3Apatient&_include=Task%3Aencounter&_include=Task%3Arequester&_include=Task%3Abased-on&_include=Task%3Aowner%3AOrganization",e.next=5,fetch(r,{method:"GET",headers:{"Content-type":"application/json",Accept:"application/json",Authorization:(null===R||void 0===R?void 0:R.length)>0?"bearer "+R:""}});case 5:return c=e.sent,e.next=8,c.json();case 8:if(a=e.sent,s=0===a.total?[]:a.entry){e.next=12;break}return e.abrupt("return",[]);case 12:console.log("Task bundle received: ",s),i=[],s.forEach((function(e,t){if("Task"===e.resource.resourceType){var n={id:"Task/"+e.resource.id,Task:e};i.push(n)}})),i.forEach((function(e,t){var n,r,c,a,i=null===e||void 0===e||null===(n=e.Task)||void 0===n?void 0:n.resource;if(i){var o=null===(r=i.for)||void 0===r?void 0:r.reference,l=i.basedOn[0].reference,u=null===(c=i.requester)||void 0===c?void 0:c.reference,d=null===(a=i.owner)||void 0===a?void 0:a.reference;s.forEach((function(t,n){var r=t.resource.id;switch(t.resource.resourceType){case"ServiceRequest":l==="ServiceRequest/".concat(r)&&(e.ServiceRequest=t);break;case"Patient":o==="Patient/".concat(r)&&(e.Patient=t);break;case"Organization":d==="Organization/".concat(r)&&(e.Organization=t);break;case"Practitioner":u==="Practitioner/".concat(r)&&(e.Practitioner=t)}}))}})),o=0,u=i;case 17:if(!(o<u.length)){e.next=27;break}return j=u[o],f=null===j||void 0===j||null===(d=j.Task)||void 0===d||null===(b=d.resource)||void 0===b?void 0:b.id,e.next=22,ee(f);case 22:p=e.sent,j.Communication=p.entry;case 24:o++,e.next=17;break;case 27:h=0,m=i;case 29:if(!(h<m.length)){e.next=38;break}return O=m[h],e.next=33,te(O);case 33:(null===(v=e.sent)||void 0===v?void 0:v.length)>0&&(O.DocumentReference=v);case 35:h++,e.next=29;break;case 38:return console.log("referral list",i),i.sort((function(e,t){var n=new Date(e.ServiceRequest.resource.authoredOn).getTime();return new Date(t.ServiceRequest.resource.authoredOn).getTime()-n})),e.abrupt("return",i);case 41:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),$=function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,r,c,a,s,i=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=i.length>0&&void 0!==i[0]?i[0]:f.fhirId,n=i.length>1&&void 0!==i[1]?i[1]:z,r=n+"/Encounter?patient="+t,e.next=5,fetch(r,{method:"GET",headers:{"Content-type":"application/json",Accept:"application/json",Authorization:(null===R||void 0===R?void 0:R.length)>0?"bearer "+R:""}});case 5:return c=e.sent,e.next=8,c.json();case 8:return a=e.sent,(s=a.total>0?a.entry:[]).sort((function(e,t){var n=new Date(e.resource.period.start).getTime();return new Date(t.resource.period.start).getTime()-n})),console.log("encounter",s),e.abrupt("return",s);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ee=function(){var e=Object(u.a)(l.a.mark((function e(t){var n,r,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=z+"/Communication?part-of="+t,e.next=3,fetch(n,{method:"GET",headers:{"Content-type":"application/json",Accept:"application/json",Authorization:(null===R||void 0===R?void 0:R.length)>0?"bearer "+R:""}});case 3:return r=e.sent,e.next=6,r.json();case 6:return c=e.sent,console.log("communications: ",c),e.abrupt("return",c);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),te=function(){var e=Object(u.a)(l.a.mark((function e(t){var n,r,c,a,s,o,u,d,b,j;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c=[],a=null===t||void 0===t||null===(n=t.ServiceRequest)||void 0===n||null===(r=n.resource)||void 0===r?void 0:r.supportingInfo){e.next=4;break}return e.abrupt("return",c);case 4:s=Object(i.a)(a),e.prev=5,s.s();case 7:if((o=s.n()).done){e.next=20;break}return u=o.value,d=z+"/"+u.reference,e.next=12,fetch(d,{method:"GET",headers:{"Content-type":"application/json",Accept:"application/json",Authorization:(null===R||void 0===R?void 0:R.length)>0?"bearer "+R:""}});case 12:return b=e.sent,e.next=15,b.json();case 15:j=e.sent,console.log("documentReference: ",j),"DocumentReference"===(null===j||void 0===j?void 0:j.resourceType)&&c.push(j);case 18:e.next=7;break;case 20:e.next=25;break;case 22:e.prev=22,e.t0=e.catch(5),s.e(e.t0);case 25:return e.prev=25,s.f(),e.finish(25);case 28:return e.abrupt("return",c);case 29:case"end":return e.stop()}}),e,null,[[5,22,25,28]])})));return function(t){return e.apply(this,arguments)}}(),ne=function(){var e=Object(u.a)(l.a.mark((function e(t,n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w(t),e.next=3,re(t,n);case 3:return e.abrupt("return");case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),re=function(){var e=Object(u.a)(l.a.mark((function e(t,n){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K(t,n);case 2:r=e.sent,H(r);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),ce=function(){var e=Object(u.a)(l.a.mark((function e(t,n){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$(t,n);case 2:return r=e.sent,Q(r),e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),ae=function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,r,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=F,n={resourceType:"Bundle",type:"Event",entry:[{fullUrl:z+"/Encounter/"+k}]},e.next=4,fetch(t,{method:"POST",headers:{"Content-type":"application/json","x-api-key":"sfsdfddfdsfsdfs32342343"},body:JSON.stringify(n)});case 4:return r=e.sent,e.next=7,r.json();case 7:return c=e.sent,console.log("notification response: ",c),e.abrupt("return",c);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),se=function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://5yhugddpmk.execute-api.us-east-1.amazonaws.com/rick/mockapi/authentication/token",e.next=3,fetch("https://5yhugddpmk.execute-api.us-east-1.amazonaws.com/rick/mockapi/authentication/token",{method:"POST",headers:{"Content-type":"application/json",Accept:"application/json","x-api-key":"sfsdfddfdsfsdfs32342343","Access-Control-Allow-Origin":"*"},body:JSON.stringify({privateKey:null})});case 3:return t=e.sent,e.next=6,t.json();case 6:return n=e.sent,r=n.body.access_token,console.log("access token ",r),e.abrupt("return",r);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){(function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,X(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}})()(t)}),[]),Object(r.useEffect)((function(){(function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[R]),Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)(O,{patient:f,provider:v,profileName:a,switchProfile:X}),Object(j.jsxs)("div",{className:"row mt-1 mx-0",children:[Object(j.jsx)(x,{encounterList:Z,currentEncounter:k,changeCurrentEncounter:ne,refreshEncounters:ce}),Object(j.jsx)(S,{onCreate:_,referralList:B,currentEncounter:k,sendNotificationUU:ae,profileName:a})]})]})},R=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,40)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),r(e),c(e),a(e),s(e)}))};n(34);s.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(E,{})}),document.getElementById("root")),R()}},[[35,1,2]]]);
//# sourceMappingURL=main.94ef0956.chunk.js.map