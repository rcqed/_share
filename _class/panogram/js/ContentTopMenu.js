document.observe("xwiki:dom:loaded",function(){var b=function(g){var d=g.findElement("a");var f=d&&d.getAttribute("href");var h=f&&$(f.substring(1));var e=h&&(h.up(".collapsible-group")||h.up(".chapter"));if(e&&e.hasClassName("collapsed")){e.removeClassName("collapsed");if(e.down(".expand-tool")){e.down(".expand-tool").update("▼")}if(e.up(".chapter")){e.up(".chapter").removeClassName("collapsed")}}else{}};var c=$("table-of-contents");var a=$("toc-entry");if(!c||!a||!c.down("ul")){a&&a.up("li").remove();return}a.next("ul").replace(c.down("ul"));a.next("ul").select("a").invoke("observe","click",b)});document.observe("xwiki:dom:loaded",function(){var a=$("prActionDelete");if(!a){return false}a.observe("click",function(b){b.stop();var d=b.element();d.blur();if(d.disabled){return}else{var c=d.readAttribute("href")+"?confirm=1&form_token="+$$("meta[name=form_token]")[0].content+(Prototype.Browser.Opera?"":"&ajax=1");new XWiki.widgets.ConfirmedAjaxRequest(c,{onCreate:function(){d.disabled=true},onSuccess:function(){window.location=new XWiki.Document("WebHome",XWiki.Document.currentSpace).getURL("view")},onFailure:function(){d.disabled=false}},{confirmationText:"Are you sure you wish to move this document to the recycle bin?"})}})});document.observe("xwiki:dom:loaded",function(){if(XWiki.contextaction!="edit"){return}var a=$("edit")||$("inline");if(!a){return}var e=a.form_token&&a.form_token.value;var c=a.serialize();var i=($$("meta[name=version]").length>0)?$$("meta[name=version]")[0].content:false;var f=function(k){return XWiki.currentDocument.getURL("rollback","rev="+k+"&confirm=1&form_token="+e)};var h=XWiki.currentDocument.getURL("delete","confirm=1&form_token="+e);var g="none";if(i){var b=f(i)}var j=XWiki.currentDocument.getRestURL();var d=function(l){var k=l.getElementsByTagName("version");if(k.length>0){return k[0].firstChild.nodeValue}return false};new Ajax.Request(j,{method:"get",onSuccess:function(k){if(!i&&(i=d(k.responseXML))){b=f(i)}},onFailure:function(k){if(k.statusCode==404){i=g;b=h}}.bind(this)});a.select("input[name=action_cancel]").invoke("observe","click",function(k){if(a._isVersionVerified||!i||!b){return}Event.stop(k);new Ajax.Request(j,{method:"get",onCreate:function(){a._isVersionVerified=true},onSuccess:function(m){var l=d(m.responseXML);window.onbeforeunload=function(){};if(l&&l!=i){window.location=b}else{k.element().click()}}.bind(this),onFailure:function(l){window.onbeforeunload=function(){};k.element().click()}.bind(this),on0:function(l){l.request.options.onFailure(l)}})})});(function(){var a=function(d){var c=$("mainContentArea");if(c){c.style.position="relative";var e=$("patient-record-actions");if(e){var b=new StickyBox(e,c,{offsetTop:0})}}};(XWiki.domIsLoaded&&a())||document.observe("xwiki:dom:loaded",function(){a.defer()})})();document.observe("xwiki:dom:loaded",function(){var a=$$(".editbody .export-link");a.invoke("observe","click",function(b){b.stop();new XWiki.widgets.ConfirmationBox({onYes:function(){document.fire("xwiki:actions:save",{"continue":true,form:b.findElement("form")});document.observe("xwiki:document:saved",function(){window.self.location=b.findElement().href})},onNo:function(){window.self.location=b.findElement().href}},{confirmationText:"Save before exporting?",showCancelButton:true})})});document.observe("xwiki:dom:loaded",function(){$$(".menu-horizontal li ul").each(function(a){a.up().addClassName("xDropdown")});$$(".menu-vertical.collapsible").each(function(b){var a=b.hasClassName("open");b.select("li ul").each(function(d){d.addClassName("xDropdown-menu");var e=d.up();e.addClassName("xDropdown"+(a?" open":""));var c=new Element("div");e.childElements.each(function(f){c.insert(f)});e.insert({top:c});c.addClassName("xDropdown-toggle");c.observe("click",function(f){f.findElement().up().toggleClassName("open")})})})});