var lang=document.querySelector("html").getAttribute("lang");"zh-Hans"===lang&&(lang="cn");var supportEmail,stateData,divisionData,countryData,territoryData,ip,api="https://assets.gulfstream.aero/data-service/feeds/contacts.json",contacts=[],provinces=[],states=[],state="",country="",countries=[],supportEmails=[],supportEmailData=window._DATA.contacts.supportEmails,globalLangData=window._DATA.javascript[lang].contacts,title__dvp_sales="Division Vice President",title__rvp_sales="Regional Vice President, Sales",no_contacts=window._DATA.javascript[lang].contacts.no_contacts,phoneLabels=window._DATA.contacts.phoneLabels;function translatedTitle(a){if(a===title__dvp_sales)return globalLangData.dvp;return a===title__rvp_sales?globalLangData.rvp:a}// generate GUID value for Data Service rate limiting
function guid(){var a=window.navigator,b=window.screen,c=a.mimeTypes.length;return c+=a.userAgent.replace(/\D+/g,""),c+=a.plugins.length,c+=b.height||"",c+=b.width||"",c+=b.pixelDepth||"",c}// display error message in place of the contacts
function showError(a){if(a){var b=$("#contact__wrapper").html("");b.append("<div class=\"contacts\"><div class=\"contacts contacts--error\">"+no_contacts+"</div></div>")}else $("#contact__wrapper").html("<div class=\"contacts\"><div class=\"contacts contacts--error\">"+no_contacts+"</div></div>")}// fetch contact data if we haven't already
function getContacts(){0===contacts.length?$.get(api).then(function(a){contacts=a,findContacts()})["catch"](function(a){console.error("error:",a),showError()}):findContacts()}// find users' sales contacts based on their state
function findContacts(){var a=[],b=[],c=[],d=[];for(var e in territoryData){var f=territoryData[e][state?"states":"countries"];// which territories is this locale in?
f&&f.includes(state?state:country)&&c.push(e)}// which divisions is this locale in?
for(var g in divisionData){var h=divisionData[g].territories;h&&c.forEach(function(a){h.includes(a)&&d.push(g)})}// sus out DVPs and RVPs from contact data
for(var k=0;k<contacts.length;k++)contacts[k].Title__c===title__rvp_sales&&c.includes(contacts[k].Sales_Territory__c)&&b.push(contacts[k]),contacts[k].Title__c===title__dvp_sales&&c.includes(contacts[k].Sales_Territory__c)&&!b.find(function(a){return a.Sales_Territory__c===contacts[k].Sales_Territory__c})&&a.push(contacts[k]);// sort RVPs by last name
b.sort(function(c,a){if(c.Last_Name__c<a.Last_Name__c)return-1;return c.Last_Name__c>a.Last_Name__c?1:0});// combine all contacts with DVPs at the front
var l=a.concat(b),m=$("#contact__wrapper").html("");// clear out data in the contact wrapper
if(0<l.length){m.append("<div class=\"contacts\"></div>");for(var k=0;k<l.length;k++){var n=l[k],o="<div class=\"contact__contact\">";if(n.Profile_Image__c&&""!=n.Profile_Image__c&&null!=n.Profile_Image__c)var p=n.Profile_Image__c;else var p="/buttons/blue_contact_placeholder.png";o+="<div class=\"contact__photo\"><img src=\""+p+"\"></div>",o+="<div class=\"contact__body\">",o+="<div class=\"contact__nameHeader\">",o+="<div class=\"contact__name\">"+n.First_Name__c+" "+n.Last_Name__c+"</div>";var e="";// end contact__nameHeader
if(n.Title__c&&""!=n.Title__c&&null!=n.Title__c&&(n.Sales_Territory__c&&""!=n.Sales_Territory__c&&null!=n.Sales_Territory__c?e="<br/>"+(territoryData[n.Sales_Territory__c]?territoryData[n.Sales_Territory__c].name[lang]:n.Sales_Territory__c):n.Title__c===title__dvp_sales&&(e="<br/>"+(divisionData[n.Division__c]?divisionData[n.Division__c].name[lang]:n.Division__c)),o+="<div class=\"contact__title\">"+translatedTitle(n.Title__c)+e+"</div>"),o+="</div>",n.phones&&0<n.phones.length)for(var q=0;q<n.phones.length;q++)if(""!==n.phones[q].label){o+="<div class=\"contact__phone\">";var r=n.phones[q].label,s=phoneLabels[r][lang];o+="undefined"==typeof s?r+": ":s,o+="<a href=\"tel:"+n.phones[q].number+"\">"+n.phones[q].number+"</a></div>"}n.Email__c&&""!=n.Email__c&&null!=n.Email__c&&(o+="<div class=\"contact__email\"><a href=\"mailto:"+n.Email__c.toLowerCase()+"\">"+n.Email__c.toLowerCase()+"</a></div>"),o+="</div>",o+="</div>",m.find(".contacts").append(o)}}else showError(!0)}function processForm(a){null!==a&&(document.getElementById("country").value=a.toUpperCase());var b=$("#country"),c=$("#state"),d=$("#province"),f=$("#supportEmail"),g=$("[name='formType']").val();country="";var h=$(".submit.loader").hide();// set up change listener on country select
$("#message").on("focus",function(){$("#message").val()===$("#message").data("default")&&$("#message").val("")}),b.off("change").on("change",function(){country=b.val(),"US"===country?($("#country").data("dirty")&&showError(!0),c.addClass("contact__state--show").removeClass("contact__state--hidden"),d.addClass("contact__state--hidden").removeClass("contact__state--show"),(!state||2<state.length)&&c.val("none")):"CA"===country?($("#country").data("dirty")&&showError(!0),c.addClass("contact__state--hidden").removeClass("contact__state--show"),d.addClass("contact__state--show").removeClass("contact__state--hidden"),!state&&d.val("none")):(state="",c.addClass("contact__state--hidden").removeClass("contact__state--show"),d.addClass("contact__state--hidden").removeClass("contact__state--show"),c.val(""),d.val(""),"Ownership"===g&&getContacts()),$("#country").data("dirty")||$("#country").data("dirty",!0)}).trigger("change"),"Ownership"===g&&(state&&getContacts(),c.off("change").on("change",function(){state=$(this).val(),getContacts()}),d.off("change").on("change",function(){state=$(this).val(),getContacts()})),$("#contact__form").submit(function(a){a.preventDefault();// we'll send info to Marketo first, which will redirect back to our Thank You URL
var b="https://register.gulfstream.com/contactus?";$(".mkt").each(function(a,c){var d=$(c).val()?$(c).val():"";b+=$(c).attr("name")+"="+encodeURI(d.substring(0,100))+"&"}),b+="thankyou="+location.origin+$("#contact__form").attr("data-redirect"),$(".contact__error").html("");// for simplicity, transform form data to object
for(var c=$(this),d={},e=c.serializeArray(),j=0;j<e.length;j++)d[e[j].name]=e[j].value;var k="<h1>Gulfstream.com "+d.formType+" Contact Form Notifier</h1><h2>Form data:</h2><p>",l="Gulfstream.com "+d.formType+" Contact Form Notifier%0D%0A------------------------------------%0D%0AForm data:%0D%0A";if("Ownership"===g){var m=new Date;// add date submitted code
d["Date Submitted"]=["January","February","March","April","May","June","July","August","September","October","November","December"][m.getMonth()]+" "+m.getDate()+", "+m.getFullYear()}"US"==d.Country?d.State=stateData[d.State].name[lang]:delete d.State,"CA"==d.Country?d.Province=stateData[d.Province].name[lang]:delete d.Province,d.Country=countryData[d.Country].name[lang],"Support"===g&&(d.Routing+=" ("+$("#supportEmail").find("option:selected").text()+")");// pattern to match and replace URLs in the message body
var n="[URL removed]",o=new RegExp(/https?\:\/\/\S*/,"gi");// map saObj values into email body
for(var p in d)k+="formType"==p?"":"<strong>"+p.replace(/_/g," ")+":</strong> "+d[p].replace(o,n)+"<br/>",l+="formType"==p?"":p.replace(/_/g," ")+": "+d[p].replace(o,n)+"%0D%0A";k+="</p>";// is Travel type selected is Special Missions, include their email
var q=d.Travel&&"special missions"===d.Travel.toLowerCase()?",special.missions@gulfstream.com":"";// add IP only after creating email body, since
// we don't need it in the email but might want it
// stored in the archive
d.ip=ip,emailToOverride=$("#contact__form").data("emailto")?$("#contact__form").data("emailto"):null,emailToOverride?(emailTo=emailToOverride,emailReplyTo=emailToOverride,emailBcc=emailToOverride,emailSubject="[TEST MESSAGE] Gulfstream.com "+d.formType+" contact form submitted"):("Ownership"===d.formType?(emailTo="sales.admins.all@gulfstream.com",emailReplyTo="sales.admins.all@gulfstream.com, digital.marketing@gulfstream.com"+q):f.val()?(emailTo=f.val(),emailReplyTo=f.val()+",digital.marketing@gulfstream.com"):(emailTo="cs.sales@gulfstream.com",emailReplyTo="cs.sales@gulfstream.com, digital.marketing@gulfstream.com"),emailBcc="digital.marketing@gulfstream.com"+q,emailSubject="Gulfstream.com "+d.formType+" contact form submitted");var r={emailTo:emailTo,noArchive:!1,emailBcc:emailBcc,emailFrom:"notifier@gulfstream.aero",emailSubject:emailSubject,emailSource:"notifier@gulfstream.aero",emailReplyTo:emailReplyTo,emailHTML:k,emailText:l,formId:"Gulfstream.com "+d.formType+" Contact Form",userId:d.Email,guid:guid(),userAgent:navigator.userAgent,formData:d},s=!0;$("input.required, select.required").each(function(){""===$(this).val()||null===$(this).val()?($(this).addClass("required--unset"),s=!1):$(this).removeClass("required--unset")}),s?($("[name='submit']").attr("disabled","disabled").css("opacity",".5"),h.show(),"undefined"!=typeof hj&&hj("formSubmitSuccessful"),$.ajax({type:"POST",url:"https://api.gulfstream.aero/email/sendbyform",data:JSON.stringify(r),beforeSend:function beforeSend(a){a.setRequestHeader("Content-Type","application/json")},success:function success(a){if(a.success){// this form's thank you page
var b=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"")+location.pathname+"thanks";gtag_report_conversion(b)}else"undefined"!=typeof hj&&hj("formSubmitFailed"),h.hide(),$("[name='submit']").removeAttr("disabled").css("opacity","1"),$(".contact__error").html(a.data)}})):("undefined"!=typeof hj&&hj("formSubmitFailed"),$(".contact__error").html(globalLangData.all_required))})}axios.get("https://assets.gulfstream.aero/data-service/feeds/territories.json").then(function(a){for(var b in stateData=a.data.states,countryData=a.data.countries,divisionData=a.data.divisions,territoryData=a.data.territories,stateData)"none"!=b.toLowerCase()&&("province"===stateData[b].type?provinces.push({id:b,name:stateData[b].name[lang]}):states.push({id:b,name:stateData[b].name[lang]}));for(var b in countryData)countries.push({id:b,name:countryData[b].name[lang]});"en"===lang?(countries=countries.sort(function(c,a){return c.name<a.name?-1:c.name>a.name?1:0}),states=states.sort(function(c,a){return c.name<a.name?-1:c.name>a.name?1:0}),provinces=provinces.sort(function(c,a){return c.name<a.name?-1:c.name>a.name?1:0})):(countries=countries.sort(function(c,a){var b=c.name.toString().localeCompare(a.name,lang,{ignorePunctuation:!0});return 0>b?-1:0<b?1:0}),states=states.sort(function(c,a){var b=c.name.toString().localeCompare(a.name,lang,{ignorePunctuation:!0});return 0>b?-1:0<b?1:0}),provinces=provinces.sort(function(c,a){var b=c.name.toString().localeCompare(a.name,lang,{ignorePunctuation:!0});return 0>b?-1:0<b?1:0}));// en states, provinces and countries sorted on name property;
// other langs sorted based on localeCompare rules
for(var c=0;c<supportEmailData.length;c++)supportEmails.push({id:supportEmailData[c].option[lang]?supportEmailData[c].option[lang]:"",email:supportEmailData[c].email});new Vue({el:"#contact__form",data:{api_key:"dbf7bde9abf8e54840ad61f81bebf5ea",province:"none",provinces:provinces,state:"none",states:states,country:"none",countries:countries,supportEmail:"",supportEmails:supportEmails},methods:{initializeForm:function initializeForm(){var a=this,b=new URLSearchParams(location.search),c="https://api.ipstack.com/check?access_key="+this.api_key;"false"===b.get("geo")&&(c="https://api.ipstack.com/0.0.0.0?access_key="+this.api_key),"on"===b.get("geo")&&(c="https://api.ipstack.com/142.93.148.123?access_key="+this.api_key),"qc"===b.get("geo")&&(c="https://api.ipstack.com/184.162.236.28?access_key="+this.api_key),axios.get(c).then(function(c){if(ip=c.data.ip,$("#country").val(c.data.country_code),""===$("#country option:selected").text()?$("#country").val("none"):a.country=c.data.country_code,"US"===c.data.country_code)for(var d=0;d<a.states.length;d++)a.states[d].id===c.data.region_code&&(a.state=c.data.region_code,state=a.state);// enable the state dropdown for the US
else if("CA"===c.data.country_code)for(var d=0;d<a.provinces.length;d++)a.provinces[d].id===c.data.region_code&&(a.province=c.data.region_code,state=a.province);// enable the province dropdown for CA
setTimeout(function(){processForm(b.get("cc"))},200)})["catch"](function(a){console.error("Geolocation error:",a),processForm()})}},mounted:function mounted(){this.initializeForm()}})})["catch"](function(a){console.error("Could not download territory data:",a)});