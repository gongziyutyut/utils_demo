(function($){"use strict";var BootstrapPaginator=function(element,options){this.init(element,options);},old=null;BootstrapPaginator.prototype={init:function(element,options){this.$element=$(element);var version=(options&&options.bootstrapMajorVersion)?options.bootstrapMajorVersion:$.fn.bootstrapPaginator.defaults.bootstrapMajorVersion,id=this.$element.attr("id");if(version===2&&!this.$element.is("div")){throw "在Bootstrap2中，必须使用div作为分页的容器";}else if(version>2&&!this.$element.is("ul")){throw "在Bootstrap3中，必须使用ul作为分页的容器"}
  this.currentPage=1;this.lastPage=1;this.setOptions(options);this.initialized=true;},setOptions:function(options){this.options=$.extend({},(this.options||$.fn.bootstrapPaginator.defaults),options);this.totalPages=parseInt(this.options.totalPages,10);this.numberOfPages=parseInt(this.options.numberOfPages,10);if(options&&typeof(options.currentPage)!=='undefined'){this.setCurrentPage(options.currentPage);}
  this.listen();this.render();if(!this.initialized&&this.lastPage!==this.currentPage){this.$element.trigger("page-changed",[this.lastPage,this.currentPage]);}},listen:function(){this.$element.off("page-clicked");this.$element.off("page-changed");if(typeof(this.options.onPageClicked)==="function"){this.$element.bind("page-clicked",this.options.onPageClicked);}
  if(typeof(this.options.onPageChanged)==="function"){this.$element.on("page-changed",this.options.onPageChanged);}
  this.$element.bind("page-clicked",this.onPageClicked);},destroy:function(){this.$element.off("page-clicked");this.$element.off("page-changed");this.$element.removeData('bootstrapPaginator');this.$element.empty();},show:function(page){this.setCurrentPage(page);this.render();if(this.lastPage!==this.currentPage){this.$element.trigger("page-changed",[this.lastPage,this.currentPage]);}},showNext:function(){var pages=this.getPages();if(pages.next){this.show(pages.next);}},showPrevious:function(){var pages=this.getPages();if(pages.prev){this.show(pages.prev);}},showFirst:function(){var pages=this.getPages();if(pages.first){this.show(pages.first);}},showLast:function(){var pages=this.getPages();if(pages.last){this.show(pages.last);}},onPageItemClicked:function(event){var type=event.data.type,page=event.data.page;this.$element.trigger("page-clicked",[event,type,page]);},onPageItemJumped:function(event){var type=event.data.type;var value=this.$element.find('input').val();var page=parseInt(value,10);if(!isNaN(value)&&page>0&&page!=this.currentPage&&page<this.totalPages){this.$element.trigger("page-clicked",[event,type,page]);}},onPageClicked:function(event,originalEvent,type,page){var currentTarget=$(event.currentTarget);switch(type){case "first":currentTarget.bootstrapPaginator("showFirst");break;case "prev":currentTarget.bootstrapPaginator("showPrevious");break;case "next":currentTarget.bootstrapPaginator("showNext");break;case "last":currentTarget.bootstrapPaginator("showLast");break;case "page":currentTarget.bootstrapPaginator("show",page);break;case "jump":currentTarget.bootstrapPaginator("show",page);break;}},render:function(){var containerClass=this.getValueFromOption(this.options.containerClass,this.$element),size=this.options.size||"normal",alignment=this.options.alignment||"left",pages=this.getPages(),listContainer=this.options.bootstrapMajorVersion===2?$("<ul></ul>"):this.$element,listContainerClass=this.options.bootstrapMajorVersion===2?this.getValueFromOption(this.options.listContainerClass,listContainer):null,first=null,prev=null,next=null,last=null,p=null,i=0;this.$element.prop("class","");this.$element.addClass("pagination");switch(size.toLowerCase()){case "large":case "small":case "mini":this.$element.addClass($.fn.bootstrapPaginator.sizeArray[this.options.bootstrapMajorVersion][size.toLowerCase()]);break;default:break;}
  if(this.options.bootstrapMajorVersion===2){switch(alignment.toLowerCase()){case "center":this.$element.addClass("pagination-centered");break;case "right":this.$element.addClass("pagination.less-right");break;default:break;}}
  this.$element.addClass(containerClass);this.$element.empty();if(this.options.bootstrapMajorVersion===2){this.$element.append(listContainer);listContainer.addClass(listContainerClass);}
  this.pageRef=[];if(pages.first){first=this.buildPageItem("first",pages.first);if(first){listContainer.append(first);}}
  if(pages.prev){prev=this.buildPageItem("prev",pages.prev);if(prev){listContainer.append(prev);}}
  for(i=0;i<pages.length;i=i+1){p=this.buildPageItem("page",pages[i]);if(p){listContainer.append(p);}}
  if(pages.next){next=this.buildPageItem("next",pages.next);if(next){listContainer.append(next);}}
  if(pages.last){last=this.buildPageItem("last",pages.last);if(last){listContainer.append(last);}}
  var itemCustom=$("<li></li>");var itemHtml="<span><input type='text' style='width: 30px;height: 20px;' value='"+this.currentPage+"'/>/"+this.totalPages+"</span>";itemCustom.append(itemHtml);listContainer.append(itemCustom);var itemlast=$("<li></li>");var itemTz=$("<span>跳转</span>").on("click",null,{type:'jump'},$.proxy(this.onPageItemJumped,this));itemlast.append(itemTz);listContainer.append(itemlast);},buildPageItem:function(type,page){var itemContainer=$("<li></li>"),itemContent=$("<a></a>"),text="",title="",itemContainerClass=this.options.itemContainerClass(type,page,this.currentPage),itemContentClass=this.getValueFromOption(this.options.itemContentClass,type,page,this.currentPage),tooltipOpts=null;switch(type){case "first":if(!this.getValueFromOption(this.options.shouldShowPage,type,page,this.currentPage)){return;}
  text=this.options.itemTexts(type,page,this.currentPage);title=this.options.tooltipTitles(type,page,this.currentPage);break;case "last":if(!this.getValueFromOption(this.options.shouldShowPage,type,page,this.currentPage)){return;}
  text=this.options.itemTexts(type,page,this.currentPage);title=this.options.tooltipTitles(type,page,this.currentPage);break;case "prev":if(!this.getValueFromOption(this.options.shouldShowPage,type,page,this.currentPage)){return;}
  text=this.options.itemTexts(type,page,this.currentPage);title=this.options.tooltipTitles(type,page,this.currentPage);break;case "next":if(!this.getValueFromOption(this.options.shouldShowPage,type,page,this.currentPage)){return;}
  text=this.options.itemTexts(type,page,this.currentPage);title=this.options.tooltipTitles(type,page,this.currentPage);break;case "page":if(!this.getValueFromOption(this.options.shouldShowPage,type,page,this.currentPage)){return;}
  text=this.options.itemTexts(type,page,this.currentPage);title=this.options.tooltipTitles(type,page,this.currentPage);break;}
  itemContainer.addClass(itemContainerClass).append(itemContent);itemContent.addClass(itemContentClass).html(text).on("click",null,{type:type,page:page},$.proxy(this.onPageItemClicked,this));if(this.options.pageUrl){itemContent.attr("href",this.getValueFromOption(this.options.pageUrl,type,page,this.currentPage));}
  if(this.options.useBootstrapTooltip){tooltipOpts=$.extend({},this.options.bootstrapTooltipOptions,{title:title});itemContent.tooltip(tooltipOpts);}else{itemContent.attr("title",title);}
  return itemContainer;},setCurrentPage:function(page){if(page>this.totalPages||page<1){throw "页码超出范围";}
  this.lastPage=this.currentPage;this.currentPage=parseInt(page,10);},getPages:function(){var totalPages=this.totalPages,pageStart=(this.currentPage%this.numberOfPages===0)?(parseInt(this.currentPage/this.numberOfPages,10)-1)*this.numberOfPages+1:parseInt(this.currentPage/this.numberOfPages,10)*this.numberOfPages+1,output=[],i=0,counter=0;pageStart=pageStart<1?1:pageStart;for(i=pageStart,counter=0;counter<this.numberOfPages&&i<=totalPages;i=i+1,counter=counter+1){output.push(i);}
  output.first=1;if(this.currentPage>1){output.prev=this.currentPage-1;}else{output.prev=1;}
  if(this.currentPage<totalPages){output.next=this.currentPage+1;}else{output.next=totalPages;}
  output.last=totalPages;output.current=this.currentPage;output.total=totalPages;output.numberOfPages=this.options.numberOfPages;return output;},getValueFromOption:function(value){var output=null,args=Array.prototype.slice.call(arguments,1);if(typeof value==='function'){output=value.apply(this,args);}else{output=value;}
  return output;}};old=$.fn.bootstrapPaginator;$.fn.bootstrapPaginator=function(option){var args=arguments,result=null;$(this).each(function(index,item){var $this=$(item),data=$this.data('bootstrapPaginator'),options=(typeof option!=='object')?null:option;if(!data){data=new BootstrapPaginator(this,options);$this=$(data.$element);$this.data('bootstrapPaginator',data);return;}
  if(typeof option==='string'){if(data[option]){result=data[option].apply(data,Array.prototype.slice.call(args,1));}else{throw "Method "+option+" does not exist";}}else{result=data.setOptions(option);}});return result;};$.fn.bootstrapPaginator.sizeArray={"2":{"large":"pagination-large","small":"pagination.less-small","mini":"pagination.less-mini"},"3":{"large":"pagination.less-lg","small":"pagination.less-sm","mini":""}};$.fn.bootstrapPaginator.defaults={containerClass:"",size:"normal",alignment:"left",bootstrapMajorVersion:2,listContainerClass:"",itemContainerClass:function(type,page,current){return(page===current)?"active":"";},itemContentClass:function(type,page,current){return "";},currentPage:1,numberOfPages:5,totalPages:1,pageUrl:function(type,page,current){return null;},onPageClicked:null,onPageChanged:null,useBootstrapTooltip:false,shouldShowPage:function(type,page,current){var result=true;switch(type){case "first":result=(current!==1);break;case "prev":result=(current!==1);break;case "next":result=(current!==this.totalPages);break;case "last":result=(current!==this.totalPages);break;case "page":result=true;break;}
  return result;},itemTexts:function(type,page,current){switch(type){case "first":return "首页";case "prev":return "上一页";case "next":return "下一页";case "last":return "末页";case "page":return page;}},tooltipTitles:function(type,page,current){switch(type){case "first":return "首页";case "prev":return "上一页";case "next":return "下一页";case "last":return "末页";case "page":return(page===current)?"当前是第"+page+"页":"第"+page+"页";}},bootstrapTooltipOptions:{animation:true,html:true,placement:'top',selector:false,title:"",container:false}};$.fn.bootstrapPaginator.Constructor=BootstrapPaginator;}(window.jQuery));