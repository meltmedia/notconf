var Site={};(function(a){var b=function(){return!!window.history&&!!history.pushState};Site.Wufoo={base:{userName:"meltmedia",autoResize:!0,header:"show",ssl:!0},"/register":{formHash:"z7x0w7",height:"520"},"/register/sponsor":{formHash:"z7x0r3",height:"576"},"/register/speaker":{formHash:"z7x1z5",height:"746"},"/register/volunteer":{formHash:"z7x0k1",height:"703"}},document.write=function(){Site.currentFormHolder.empty().append(a(arguments[0]))},a(function(){var c=a("#content .section-content"),d=a("#content .section-content .swap-content"),e=d.find(".wufoo-form-holder"),f=History.getRootUrl(),g=a("body"),h=a("title"),i=a("#navigation"),j=function(b,c){var d=Site.Wufoo["/"+c.replace(f,"")],e=b.find(".wufoo-form-holder");if(typeof d!="undefined"&&e.length>0){var g=a.extend(Site.Wufoo.base,d);Site.currentForm=new WufooForm,Site.currentForm.initialize(g),Site.currentFormHolder=e,e.append("<script>Site.currentForm.display();</script>")}};j(d,window.location.href);if(!b())return;a.expr[":"].internal=function(b,c,d,e){var g=a(b),h=g.attr("href")||"";return(h.substring(0,f.length)===f||h.indexOf(":")===-1)&&h.charAt(0)!=="#"},a.fn.ajaxify=function(){var b=a(this);return b.find("a:internal").click(function(b){var c=a(this),d=c.attr("href");return b.which==2||b.metaKey?!0:(History.pushState(null,null,d),b.preventDefault(),!1)}),b},g.ajaxify(),a(window).bind("statechange",function(){var b=History.getState(),e=b.url,k="/"+e.replace(f,""),l=function(b){var f=a(b),l=f.filter("section.section-content"),m=l.find(".swap-content"),n="NotConf - "+l.data("title"),o=l.attr("id");j(m,e),d.fadeOut(400,function(){c.attr("id",o),i.find("a").removeClass("active").filter('[href="/'+k.split("/")[1]+'"]').addClass("active"),d.html(m.html()).ajaxify().fadeIn(400)}),h.text(n),_gaq.push(["_trackPageview",k]);var p=g.scrollTop(),q=i.offset().top,r=p>q?p-q:0;r>i.outerHeight()&&a("html, body").animate({scrollTop:q},r*2)},m=function(a,b,c){return document.location.href=e,!1};return a.ajax({url:"/_"+k,dataType:"html",success:l,error:function(b,c,d){b.status===404?a.ajax({url:"/_/404",dataType:"html",success:l,error:m}):document.location.href=e}}),!1})})})(jQuery)