
$(document).ready(function () {
    $(".center_a").mouseenter(function () {
        $("h5").animate({
            opacity : "1",
        },2000)
    })
});



$(function ($) {
    $.fn.screen = function (options) {
        var $this = this;//第一个div
        var set = $.extend({
            before: [],
            after: []
        }, options);

        $this.css({
            overflow: 'hidden',
            position: 'fixed',
            width: '100%',
            height: '100%',
            left: '0',
            top: '0'
        });
        var ch = $this.children('div');
        $this.empty();
        var secondDiv = $('<div></div>').css({
            position: "relative",
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            visibility: "visible"
        });
        secondDiv.appendTo($this);
        ch.css({
            height: '100%',
            width: '100%'
        }).appendTo(secondDiv);
        var navbarUl = $("<ul></ul>").css({
            position: 'absolute',
            top: '50%',
            "z-index": "1000",
            right: "10%"
        });

        ch.each(function (i) {
            var barele = $("<li></li>").attr("index", i).css({
                border: "3px solid #2876B3",
                "border-radius": "50%",
                width: "14px",
                height: "14px",
                "list-style": "none",
                cursor: "point",
                "margin-bottom": "6px",
                "background-color": (i == 0 ? "#fff" : "transparent")
            });
            barele.appendTo(navbarUl);
        });
        //console.log(navbarUl.height()); //打印0
        //先将其添加到HTML文档流对象中，再设置其top位置，不然其位置计算会忽略掉其自身高度。
        navbarUl.appendTo($this);
        //console.log(navbarUl.height()); //打印182高度
        navbarUl.css({
            "margin-top": -parseInt(navbarUl.height()) / 2 + "px"
        });
        var wheelName = navigator.userAgent.indexOf("Firefox") > 0 ? "DOMMouseScroll" : "mousewheel";

        $this.bind(wheelName, function () {
            var event = window.event || arguments.callee.caller.arguments[0];
            //console.log(event);
            var contentV = 0;
            //统一线下滚动为负数
            if (event.wheelDelta) {
                contentV = Math.floor(event.wheelDelta / 120) * 60;

            } else if (event.detail) {
                contentV = -Math.floor(event.detail / 3) * 60;
            }
            //console.log(contentV);
            if (contentV < 0) {
                //向下滚动为1，向上滚动为-1
                console.log("下滚动作");
                slide(1);
            } else {
                console.log("上滚动作");
                slide(-1);
            }
        });

        var currentPage = 0;//当前的页数
        var lg = secondDiv.children("div").length;
        //var sht=_i.children('div').outerHeight();//得到屏内容的高度。也就是每次要切屏时div向上向下移动的量。
        var flag = true;

        //n是1就向下切屏，n是-1就向上切屏。
        function slide(n) {
            if (!flag) {

                return;
            }
            flag = false;
            if (n > 0 && currentPage < (lg - 1)) {
                console.log("执行下滚");
                if (set.before[currentPage]) {
                    set.before[currentPage]();
                }
                currentPage++;
                animateDown(currentPage);

            } else {
                if (n < 0 && currentPage > 0) {
                    console.log("执行上滚");
                    if (set.before[currentPage]) {
                        set.before[currentPage]();
                    }
                    currentPage--;
                    animateDown(currentPage);
                } else {
                    flag = true;
                }
            }
        }
        function animateDown(c) {
            secondDiv.animate({ top: -c * 100 + '%' }, 'slow', function () {
                navbarUl.find('li').css({ background: 'transparent' });
                navbarUl.find('li').eq(c).css("background", "#fff");
                if (set.after[c]) {
                    set.after[c]();
                }
                flag = true;
            });
        }
        //初始化容器高度
        ch.height($(window).height());
        //窗口改变，容器高度也改变
        $(window).resize(function () {
            ch.height($(window).height());
        });

        navbarUl.children('li').on('click', function () {
            var $index = $(this).index();
            animateDown($index);
            currentPage = $index;
        });
    }
}(jQuery));

