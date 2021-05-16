var Global = Global || {};

(function() {
    function showLoading(text = null) {
        var top = window.scrollY + "px";
        var left = window.scrollX + "px";

        $("html").addClass("disableScroll");

        if (text) {
            $(".loading .content>span").html(text);
        }

        $(".loading").css({
            "display": "flex",
            "top": top,
            "bottom": "-" + top,
            "left": left,
            "right": "-" + left
        });
    }

    function hideLoading() {
        $(".loading").css("display", "none");
        $("html").removeClass("disableScroll");

    }

    Global.showLoading = showLoading;
    Global.hideLoading = hideLoading;
})();

