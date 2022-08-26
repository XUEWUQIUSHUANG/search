$(function () {

    // 打开页面时立即加载一次
    load();
    loop();

    // 搜索框聚焦
    $("#AU").on({
        focus: function () {
            $(this).val(null);
            $(this).on("keydown", function (e) {
                if (e.keyCode === 13) {
                    if ($(this).val() !== "") {
                        var a = document.createElement("a");
                        a.href = "https://www.baidu.com/s?wd=" + $(this).val();
                        a.target = "_blank";
                        var b = document.body;
                        b.append(a);
                        a.click();
                    }
                }
            })
        },
        blur: function () {
            $(this).val("这里怎么看都不像搜索框吧");
        }
    })

    // 添加网址
    $(".ADD").on("click", function () {
        var local = getData();

        var cinHref = prompt("你想要添加的网址是？");
        if (cinHref == null) {

        } else {
            if (cinHref.substring(0, 7) !== "http://"&& cinHref.substring(0, 8) !== "https://") {
                cinHref = "http://" + cinHref;
            }
            var cinName = prompt("你想要让这个网址叫什么名字？");
            if (cinName == null) {

            } else {
                var position = {
                    name: cinName,
                    ahref: cinHref
                };
                local.push(position);
                saveDeta(local);
                load();
                loop();
            }
        }
    })

    // 绑定快捷方式功能键
    function loop() {
        $("p").on("click", function () {
            var data = getData();
            var index = $(this).attr("id");
            $(this).siblings(".ask").stop().slideDown();
            $(this).parent().siblings().on("mouseover", function () {
                $("li").eq(index * 1 + 1).children(".ask").stop().slideUp();
            })
            // 删除快捷方式
            $(this).siblings(".ask").children(".question2").on("click", function () {
                data.splice(index, 1);
                saveDeta(data);
                load();
                loop();
            })
            // 修改快捷方式
            $(this).siblings(".ask").children(".question1").on("click", function () {
                $(".modal-framework").show();
                $("li").eq(index * 1 + 1).children(".ask").stop().slideUp();
                $(".modal-change-name").val(data[index].name);
                $(".modal-change-href").val(data[index].ahref);
                $(".modal-cancel").on("click", function () {
                    $(".modal-framework").hide();
                })
                $(".modal-confirm").on("click", function () {
                    data[index].name = $(".modal-change-name").val();
                    data[index].ahref = $(".modal-change-href").val();
                    saveDeta(data);
                    load();
                    loop();
                    $(".modal-framework").hide();
                })
            })
        })
    }

    // 读取本地存储数据
    function getData() {
        var data = localStorage.getItem("position");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 存储数据到本地
    function saveDeta(data) {
        data = JSON.stringify(data);
        localStorage.setItem("position", data);
    }

    // 渲染加载数据
    function load() {
        var data = getData();
        $("ul>li:first").siblings().remove();
        $.each(data, function (index, element) {
            var a = $("<li><a href=" + element.ahref + " target=_blank><div><img src=" + element.ahref + "favicon.ico></div><span class=Ename>" + element.name + "</span></a><p id=" + index + " class=icon-circleci></p><div class=ask><div class=question1>修改快捷方式</div><div class=question2>移除</div></div></li>");
            $('ul').append(a);
        })
        $("li").on({
            mouseover: function () {
                $(this).children("p").show();
            },
            mouseout: function () {
                $(this).children("p").hide();
            }
        })
    }

})
