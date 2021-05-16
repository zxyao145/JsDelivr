function activeMenu() {
    $(function () {
        var body = $('body');
        var contentWrapper = $('.content-wrapper');
        var scroller = $('.container-scroller');
        var footer = $('.footer');
        var sidebar = $('.sidebar');

        var defaultPath = "/backcms";

        //Add active class to nav-link based on url dynamically
        //动态添加active类到基于URL的nav-link
        //Active class can be hard coded directly in html file also as required
        //Active类也可以根据需要直接在HTML文件中硬编码。
        function addActiveClass(element, currentHref) {
            if (currentHref === "") {
                //for root url
                if (element.attr('href').toLowerCase() === defaultPath) {
                    element.parents('.nav-item').last().addClass('active');
                    if (element.parents('.sub-menu').length) {
                        element.closest('.collapse').addClass('show');
                        element.addClass('active');
                    }
                }
            } else {
                //for other url
                var eleHref = element.attr('href').toLowerCase();
                //console.log(currentHref, eleHref,currentHref===eleHref);
                if (eleHref === currentHref) {
                    //last()找到一级菜单
                    var firstMenu = element.parents('.nav-item').last();
                    firstMenu.addClass('active');
                    if (element.parents('.sub-menu').length) {
                        //显示子菜单
                        element.closest('.collapse').addClass('show');
                        //为当前的a添加active
                        element.addClass('active');
                        //箭头显示展开的样式
                        firstMenu.children("a.nav-link").attr("aria-expanded", true);
                    }
                    if (element.parents('.submenu-item').length) {
                        element.addClass('active');
                    }
                }
            }
        }

        //#region 判断当前路由的href 开始
        var current = location.pathname.split("/");//.slice(-1)[0].replace(/^\/|\/$/g, '');
        current = current.filter(e => {
            return e;
        });

        var area = "";
        var controller, action;
        if (current.length === 1) {
            area = current[0];
            controller = "home";
            action = "index";
        } else if (current.length === 2) {
            area = current[0];
            controller = current[1];
            action = "index";
        } else {
            area = current[0];
            controller = current[1];
            action = current[2];
        }
        
        current = "/"+ area + "/" + controller + "/" + action;
        //if (controller && controller.toLowerCase() !== "home") {
        //    current += "/" + controller;
        //}
        //if (action && action.toLowerCase() !== "index") {
        //    current += "/" + action;
        //}
        current = current.toLowerCase();
        //#endregion 判断当前路由的href 结束

        //为当前菜单添加active样式
        $('.nav li a', sidebar).each(function () {
            var $this = $(this);
            addActiveClass($this, current);
        });

        //Close other submenu in sidebar on opening any

        sidebar.on('show.bs.collapse', '.collapse', function () {
            sidebar.find('.collapse.show').collapse('hide');
        });


        //Change sidebar

        $('[data-toggle="minimize"]').on("click", function () {
            body.toggleClass('sidebar-icon-only');
        });

        //checkbox and radios
        $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');
    });
}