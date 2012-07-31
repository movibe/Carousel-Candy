

(function($){


$.candyCarousel = {

"slideshow":"",
"down":"",
"initialHit":"",
"change":"",
"buffer": 20,
"initalPos":"",
"adjustXPos" : function(evt){
$.candyCarousel.down = false;
var direction = (evt.data != undefined && evt != undefined) ? evt.data.direction : (evt.which == 39) ? "right" :(evt.which == 37) ? "left" : "";
if(evt.type == "mouseup"){if($.candyCarousel.change != 0){if($.candyCarousel.change > $.candyCarousel.initalPos+$.candyCarousel.buffer){
direction = "left";
}else if($.candyCarousel.change < $.candyCarousel.initalPos+$.candyCarousel.buffer){
direction = "right";
}}}
if(direction == "direct"){var btnPos = $(this).parent().children("button").index($(this));}
var slides = $.candyCarousel.slideshow.find(".slide");
var int = $.candyCarousel.slideshow.data("pos");
if(direction == "direct"){int = btnPos;}
else if(direction == "right"){int = (int >= (slides.length - 1))? 0 : int + 1 ;}
else if(direction == "left"){int = (int <= 0)? (slides.length -1) : int - 1 ;}
$.candyCarousel.slideshow.data({"pos":int}).find(".panel").animate({left:-(int*(slides.width()))+"px"},500).end().children(".crumbs").text(int+1 + " of "+ slides.length).end().find(".btn-group .active").removeAttr("disabled").removeClass("active").end().find(".btn-group .btn").eq(int).addClass("active").attr("disabled","disabled");
$(document).off("mouseup");

}

};

$.fn.candyCarousel = function(){
$(this).on("click focusin", ".btn-group .btn",{direction:"direct"},$.candyCarousel.adjustXPos);

$(this).on("mouseenter", function(evt){$.candyCarousel.slideshow = $(this);})

$(this).on("mousedown", ".panel", function(evt){
$.candyCarousel.down = true;
$.candyCarousel.initalPos = $(this).position().left;
$.candyCarousel.initialHit = evt.pageX - $(this).offset().left;
$.candyCarousel.change=0;
$(document).on("mouseup", $.candyCarousel.adjustXPos);
});

$(this).on("mousemove", ".panel", function(evt){
if($.candyCarousel.down){
var difference = (evt.pageX - $(this).offset().left) - $.candyCarousel.initialHit;
$.candyCarousel.change = $(this).position().left + difference;
$(this).css("left", $.candyCarousel.change+"px");
}
});

return this.each (function () {
var source = $(this);
var size = {"width":source.find(".slide").width(), "height":source.find(".slide").height()};
var children = $(source).data({"pos":0}).css({"width":size.width +"px"}).children(".slide").length;
var mask = $("<div>", {"class":"mask"}).css({"width":size.width +"px","height": size.height +"px"});
var panel = $("<div>",{"class":"panel"}).css({"width":children*size.width +"px","height": size.height +"px"});
mask.append(panel);
var arrow = $("<button>", {"class":"arrow btn btn-primary"}).append($("<i>", {"class":"icon-arrow-left icon-white"}));
var $this = $(source).append(arrow.clone().on("click",{direction:"left"},$.candyCarousel.adjustXPos).addClass("left")).append(arrow.clone().on("click",{direction:"right"},$.candyCarousel.adjustXPos).addClass("right").children("i").removeClass("icon-arrow-left").addClass("icon-arrow-right").end()).children(".slide").wrapAll(mask).end();
var crumbs = $("<div>", {"class":"crumbs", "text":"1 of "+ children}).prependTo($this);
var btnGroup = $("<div>", {"class":"btn-group"});
for(var i=0;i<children;i++){
var button = $("<button>", {"class":"btn btn-primary "+(i), "html":"<span>"+(i+1)+"</span>"}).appendTo(btnGroup);
if(i == 0){button.addClass("active");}
}
source.append(btnGroup);
});
};
})(jQuery);


