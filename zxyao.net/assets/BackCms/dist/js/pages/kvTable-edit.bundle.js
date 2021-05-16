/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\BackCms\\src\\scss\\pages\\trivial-edit.scss":
/*!*******************************************************************************************!*\
  !*** D:\coding\repos\BlogZ\BlogZ\wwwroot\assets\BackCms\src\scss\pages\trivial-edit.scss ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\common\\tinyMceConfig.js":
/*!**************************************************************************!*\
  !*** D:\coding\repos\BlogZ\BlogZ\wwwroot\assets\common\tinyMceConfig.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/// <reference path="../libs/tinymce/5.2.0/plugins/lineheight/plugin.min.js" />
/// <reference path="../libs/tinymce/5.2.0/plugins/lineheight/plugin.min.js" />
const editorUpApi = {
    comment: {
        image: '/api/Editor/CommentImg',
        file: '/api/Editor/CommentFile'
    },
    blog: {
        image: '/api/Editor/BlogImg',
        file: '/api/Editor/BlogFile'
    }
}

const cdn = "https://cdn.jsdelivr.net/gh/zxyao145/GhStatics/zxyao.net/assets";


const tinymceUploadConfig = {
    file: {
        uploadUrl: 'TinyUploadFile',
        accept: [
            {
                title: '文档',
                extensions: 'doc,docx,xls,xlsx,ppt,pptx,pdf',
                mimeTypes:
                    'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,' +
                        'application/vnd.ms-excel,application/x-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' +
                        'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,' +
                        'application/pdf'
            },
            {
                title: '压缩文件',
                extensions: 'rar,zip,7z',
                mimeTypes: 'application/octet-stream,application/x-zip-compressed,.7z'
            },
            {
                title: '图片',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/gif,image/jpeg,image/bmp,image/png'
            },
            {
                title: '音视频',
                extensions: 'flv,mkv,mp4,webm,mp3,wav',
                mimeTypes: 'audio/wav,audio/mpeg,video/flv,video/mkv,video/mp4,video/webm'
            }
        ]
    },
    image: {
        uploadUrl: 'TinyUploadImage',
        accept: [
            {
                title: '图片',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/gif,image/jpeg,image/bmp,image/png'
            }
        ]

    },
    media: {
        uploadUrl: 'TinyUploadVideo',
        accept: [
            {
                title: '音视频',
                extensions: 'flv,mkv,mp4,webm,mp3,wav',
                mimeTypes: 'audio/wav,audio/mpeg,video/flv,video/mkv,video/mp4,video/webm'
            }
        ]
    }
};

const tinyMceUploadImage = function (url, blobInfo, success, failure, basePath = "") {
    var xhr, formData;
    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', url);
    xhr.onload = function () {
        var json;
        if (xhr.status != 200) {
            failure('HTTP Error: ' + xhr.status);
            return;
        }
        json = JSON.parse(xhr.responseText);

        if (!json || typeof json.Data.Url != 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
        }
        success(basePath + json.Data.Url);
    };
    formData = new FormData();
    var file = blobInfo.blob();
    formData.append('file', file, blobInfo.filename());
    xhr.send(formData);
};

const tinyMceFileBrowserCallback = function (field_name, url, type, win) {
    var uploadConfig;
    var titleInputOff = 0;
    switch (type) {
        case 'file':
            uploadConfig = tinymceUploadConfig.file;
            titleInputOff = 1;
            break;
        case 'image':
            uploadConfig = tinymceUploadConfig.image;
            titleInputOff = 1;
            break;
        case 'media':
            uploadConfig = tinymceUploadConfig.media;
            titleInputOff = 0;
            break;
        default:
            uploadConfig = tinymceUploadConfig.file;
            titleInputOff = 0;
    }
    var allmimeTypes = '';
    $.each(uploadConfig.accept, function (index, item) {
        allmimeTypes += item.mimeTypes + ',';
    });
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', allmimeTypes);
    input.onchange = function () {
        var file = this.files[0];
        
        var xhr, formData;
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', url);
        xhr.onload = function () {
            var json;
            if (xhr.status != 200) {
                failure('HTTP Error: ' + xhr.status);
                return;
            }
            json = JSON.parse(xhr.responseText);

            if (!json  ) {
                failure('Invalid JSON: ' + xhr.responseText);
                return;
            }
            //success
            var files = json.Data;

            {
                win.document.getElementById(field_name).value =
                    '/Services/FileService.ashx?Action=Get&Name=' + files[0].url;
                if (titleInputOff == 0) return;
                var inputlist = win.document.getElementsByTagName('input');
                for (var i = 0; i < inputlist.length; i++) {
                    if (inputlist[i].id == field_name) {
                        if (i + titleInputOff < inputlist.length)
                            inputlist[i + titleInputOff].value = files[0].fileName;
                        break;
                    }
                }
            }
        };
        formData = new FormData();
        formData.append('file', file, blobInfo.filename());
        xhr.send(formData);
    };
    input.click();
};

const filePickerCallback = function (url, callback, value, meta) {
    var uploadConfig;
    var type = meta.filetype;
    switch (type) {
    case 'file':
        uploadConfig = tinymceUploadConfig.file;
        break;
    case 'image':
        uploadConfig = tinymceUploadConfig.image;
        break;
    case 'media':
        uploadConfig = tinymceUploadConfig.media;
        break;
    default:
        uploadConfig = tinymceUploadConfig.file;
    }
    var allmimeTypes = '';
    $.each(uploadConfig.accept, function (index, item) {
        allmimeTypes += item.mimeTypes + ',';
    });

    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', allmimeTypes);
    input.onchange = function () {
        var file = this.files[0];
        var xhr, formData;
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', url);
        xhr.onload = function () {
            var json;
            if (xhr.status != 200) {
                failure('HTTP Error: ' + xhr.status);
                return;
            }
            json = JSON.parse(xhr.responseText);
            if (!json || typeof json.Data.Url != 'string') {
                failure('Invalid JSON: ' + xhr.responseText);
                return;
            }
            callback(json.Data.Url);
        };
        formData = new FormData();
        formData.append('file', file, file.name);
        xhr.send(formData);
    }
    input.click();
}


const tinyMceConfig = {
    "basic": {
        plugins: [
            'link image lists  hr anchor emoticons',
            'searchreplace wordcount fullscreen insertdatetime media nonbreaking',
            'save table contextmenu paste textcolor codesample'
        ],
        menubar: false,
        statusbar: false,
        toolbar:
            'undo redo | removeformat | emoticons | bold italic underline strikethrough | forecolor backcolor | codesample blockquote | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table  hr',
        paste_word_valid_elements: "b,strong,i,em,h1,h2",
        image_advtab: true, //开启图片上传的高级选项功能
        image_title: false, // 是否开启图片标题设置的选择，这里设置否
        automatic_uploads: true, //开启点击图片上传时，自动进行远程上传操作
        paste_data_images: true,
        images_upload_handler:
            function (blobInfo, success, failure) {
                var url = editorUpApi.comment.image;
                tinyMceUploadImage(url, blobInfo, success, failure, "");
            },
        file_picker_callback: function(callback, value, meta) {
            var url = editorUpApi.comment.file;
            filePickerCallback(url, callback, value, meta);
        }
    },
    "full": {
        plugins: [
            'code link image lists hr anchor textpattern emoticons',
            'searchreplace wordcount fullscreen insertdatetime media nonbreaking',
            'save table contextmenu powerpaste textcolor lineheight indent2em codesample'
        ],
        external_plugins: {
            'lineheight': cdn + '/libs/tinymce/5.2.0/plugins/lineheight/plugin.min.js',
            'indent2em': cdn +'/libs/tinymce/5.2.0/plugins/indent2em/plugin.min.js',
            'powerpaste': cdn + '/libs/tinymce/5.2.0/plugins/powerpaste/plugin.min.js',
        },
        //menubar: 'edit insert format table tools',
        menubar: false,
        toolbar:
            'undo redo | pastetext | removeformat | formatselect fontselect fontsizeselect lineheightselect bold italic underline strikethrough | codesample blockquote | indent2em alignleft aligncenter alignright alignjustify | forecolor backcolor |  superscript subscript | bullist numlist  outdent indent | link image media table  hr | fullscreen code | emoticons',
        paste_word_valid_elements: "b,strong,i,em,h1,h2",
        image_advtab: true, //开启图片上传的高级选项功能
        image_title: false, // 是否开启图片标题设置的选择，这里设置否
        automatic_uploads: true, //开启点击图片上传时，自动进行远程上传操作

        paste_data_images: true,
        powerpaste_allow_local_images: true,
        powerpaste_word_import: "propmt",
        powerpaste_html_import: 'propmt',
        images_upload_handler:
            function (blobInfo, success, failure) {
                var url = editorUpApi.blog.image;
                tinyMceUploadImage(url, blobInfo, success, failure, "");
            },
        file_picker_callback: function (callback, value, meta) {
            var url = editorUpApi.blog.file;
            filePickerCallback(url, callback, value, meta);
        },
        file_browser_callback: function (field_name, url, type, win) {
            tinyMceFileBrowserCallback(field_name, url, type, win);
        },
        //markdown
        textpattern_patterns: [
            { start: '#', format: 'h1' },
            { start: '##', format: 'h2' },
            { start: '###', format: 'h3' },
            { start: '####', format: 'h4' },
            { start: '#####', format: 'h5' },
            { start: '######', format: 'h6' },
            { start: '*', end: '*', format: 'italic' },
            { start: '**', end: '**', format: 'bold' },
            { start: '* ', cmd: 'InsertUnorderedList' },
            { start: '- ', cmd: 'InsertUnorderedList' },
            { start: '1. ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'decimal' } },
            { start: '1) ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'decimal' } },
            { start: 'a. ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'lower-alpha' } },
            { start: 'a) ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'lower-alpha' } },
            { start: 'i. ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'lower-roman' } },
            { start: 'i) ', cmd: 'InsertOrderedList', value: { 'list-style-type': 'lower-roman' } }
        ]
    }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tinyMceConfig);

/***/ }),

/***/ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\BackCms\\src\\ts\\common\\extensions\\jquery-et.ts":
/*!************************************************************************************************!*\
  !*** D:\coding\repos\BlogZ\BlogZ\wwwroot\assets\BackCms\src\ts\common\extensions\jquery-et.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\BackCms\\src\\ts\\components\\Global.ts":
/*!**************************************************************************************!*\
  !*** D:\coding\repos\BlogZ\BlogZ\wwwroot\assets\BackCms\src\ts\components\Global.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var util_1 = __importDefault(__webpack_require__(/*! ../../../../common/util */ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\common\\util.ts"));
var getLayer = function () {
    var layer = window.layer;
    if (layer) {
        return layer;
    }
    layer = parent.layer;
    return layer;
};
var Global = {
    showLoading: function (text) {
        if (text === void 0) { text = null; }
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
    },
    hideLoading: function () {
        $(".loading").css("display", "none");
        $("html").removeClass("disableScroll");
    },
    getEditInfo: function (key) {
        if (key === void 0) { key = "id"; }
        var id = util_1.default.pickUpUrlParams().get(key);
        var result = {};
        if (id) {
            result.isEdit = true;
            result.id = id;
        }
        else {
            result.isEdit = false;
            result.id = "";
        }
        return result;
    },
    getFromDataObj: function (selector) {
        var formData = $(selector).serialize();
        var formDataArr = formData.split("&");
        var forDataObj = {};
        formDataArr.forEach(function (item) {
            var kv = item.split("=");
            forDataObj[kv[0]] = decodeURIComponent(kv[1]);
        });
        return forDataObj;
    },
    alert: function (text, obj) {
        if (obj === void 0) { obj = null; }
        var defaultObj = {
            time: 2000,
            title: "提示"
        };
        if (obj) {
            if (typeof obj === "function") {
                //callback
                getLayer().alert(text, defaultObj, obj);
            }
            else {
                $.extend(obj, defaultObj);
                getLayer().alert(text, obj);
            }
        }
        else {
            getLayer().alert(text, defaultObj);
        }
    },
    confirm: function (message, onYes, onNo) {
        if (onNo === void 0) { onNo = null; }
        getLayer().confirm(message, { "title": "提示" }, function (index) {
            onYes();
            getLayer().close(index);
        }, function (index) {
            if (onNo) {
                onNo();
            }
            getLayer().close(index);
        });
    },
    alertError: function (error) {
        var msg = error.map(function (item) {
            return item.Message;
        }).join("<br/>>");
        Global.alert(msg, {
            title: "错误",
            icon: 2
        });
    },
    layerDataMap: [],
    openDialog: function (title, url, afterOpen, onOk, onCancel) {
        var layer = getLayer();
        var layerDataMap = Global.layerDataMap;
        var index = layer.open({
            type: 2,
            title: title ? title : false,
            closeBtn: 1,
            fixed: true,
            shade: 0.6,
            area: ['80%', '80%'],
            anim: 2,
            content: [url],
            success: function (layero, dialogIndex) {
                layerDataMap[dialogIndex] = {
                    success: onOk,
                    cancel: onCancel
                };
            },
            cancel: function (index, layero) {
                if (typeof onCancel === 'function') {
                    onCancel();
                }
            }
        });
        if (typeof onOk === 'function') {
            afterOpen(index);
        }
    },
    closeDialog: function (dialogResult, data) {
        var parentLayer = parent.layer;
        var dialogIndex = parentLayer.getFrameIndex(window.name);
        parentLayer.close(dialogIndex);
        var parentGlobal = Global;
        var dialogConfig = parentGlobal.layerDataMap[dialogIndex];
        if (!dialogConfig)
            return;
        if (dialogResult === 'ok') {
            typeof dialogConfig.success == 'function' && dialogConfig.success(data);
        }
        else {
            typeof dialogConfig.cancel == 'function' && dialogConfig.cancel();
        }
        delete parentGlobal.layerDataMap[dialogIndex];
    },
};
exports.default = Global;


/***/ }),

/***/ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\BackCms\\src\\ts\\components\\dateTimePickerHelper.ts":
/*!****************************************************************************************************!*\
  !*** D:\coding\repos\BlogZ\BlogZ\wwwroot\assets\BackCms\src\ts\components\dateTimePickerHelper.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ../common/extensions/jquery-et */ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\BackCms\\src\\ts\\common\\extensions\\jquery-et.ts");
var DtPicker = /** @class */ (function () {
    /**
     *
     */
    function DtPicker(selector, config) {
        if (config === void 0) { config = null; }
        this.$selector = null;
        this.defaultConfig = {
            format: 'YYYY-MM-DD HH:mm:ss Z',
            locale: 'zh',
            widgetPositioning: {
                horizontal: 'auto',
                vertical: ''
            },
            // Icons
            // as Bootstrap 4 is not using Glyphicons anymore
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-check',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            }
        };
        this.$selector = $(selector);
        this.init(selector, config);
    }
    DtPicker.prototype.init = function (selector, config) {
        if (config === void 0) { config = null; }
        if (config) {
            Object.assign(this.defaultConfig, config);
        }
        ;
        this.$selector.datetimepicker(this.defaultConfig);
    };
    DtPicker.prototype.setDt = function (date) {
        if (date instanceof Date) {
            this.$selector.data("DateTimePicker")
                .date(date);
        }
        else {
            this.$selector.data("DateTimePicker")
                .date(new Date(date));
        }
    };
    DtPicker.prototype.setMinDt = function (date) {
        if (date instanceof Date) {
            this.$selector.data("DateTimePicker")
                .minDate(date);
        }
        else {
            this.$selector.data("DateTimePicker")
                .minDate(new Date(date));
        }
    };
    DtPicker.prototype.setMaxDt = function (date) {
        if (date instanceof Date) {
            this.$selector.data("DateTimePicker")
                .maxDate(date);
        }
        else {
            this.$selector.data("DateTimePicker")
                .maxDate(new Date(date));
        }
    };
    DtPicker.prototype.getDt = function (returnDate) {
        if (returnDate === void 0) { returnDate = false; }
        var dateStr = $('#createDateTimePicker').children("input").val();
        if (returnDate) {
            return new Date(dateStr);
        }
        return dateStr;
    };
    DtPicker.prototype.getTimestamp = function () {
        var date = this.getDt(true);
        return date.getTime();
    };
    DtPicker.prototype.setTimestamp = function (timestamp) {
        this.setDt(timestamp);
    };
    DtPicker.prototype.on = function (event, callback) {
        this.$selector.on(event, function (e) {
            typeof callback === "function" && callback(e);
        });
    };
    DtPicker.prototype.clear = function () {
        this.$selector.data("DateTimePicker")
            .clear();
    };
    return DtPicker;
}());
exports.default = DtPicker;


/***/ }),

/***/ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\BackCms\\src\\ts\\pages\\kvTable-edit.ts":
/*!***************************************************************************************!*\
  !*** D:\coding\repos\BlogZ\BlogZ\wwwroot\assets\BackCms\src\ts\pages\kvTable-edit.ts ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Global_1 = __importDefault(__webpack_require__(/*! ../components/Global */ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\BackCms\\src\\ts\\components\\Global.ts"));
__webpack_require__(/*! ../common/extensions/jquery-et */ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\BackCms\\src\\ts\\common\\extensions\\jquery-et.ts");
var TinyMceHelper_1 = __importDefault(__webpack_require__(/*! ../../../../common/TinyMceHelper */ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\common\\TinyMceHelper.ts"));
__webpack_require__(/*! ../../scss/pages/trivial-edit.scss */ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\BackCms\\src\\scss\\pages\\trivial-edit.scss");
var dateTimePickerHelper_1 = __importDefault(__webpack_require__(/*! ../components/dateTimePickerHelper */ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\BackCms\\src\\ts\\components\\dateTimePickerHelper.ts"));
$(function () {
    var editApi = "/api/KvTable/Edit";
    var postCallBackUrl = "/BackCms/KvTable/Index";
    var createDtPicker;
    var modifyDtPicker;
    /**
     * 初始化DtPicker
     */
    var initDtPicker = function () {
        createDtPicker = new dateTimePickerHelper_1.default("#createDateTimePicker");
        modifyDtPicker = new dateTimePickerHelper_1.default("#modifyDateTimePicker");
        createDtPicker.on("dp.change", function (e) {
            modifyDtPicker.setMinDt(createDtPicker.getDt());
        });
        modifyDtPicker.on("dp.change", function (e) {
            createDtPicker.setMaxDt(modifyDtPicker.getDt());
        });
        $("#curTime").click(function () {
            modifyDtPicker.setDt(new Date());
        });
    };
    initDtPicker();
    var editInfo = Global_1.default.getEditInfo();
    /**
     * 初始化ui
     * @param data 数据记录
     */
    var initUi = function (data) {
        $("#key").val(data.Key).data("id", data.Id);
        $("#status").val(data.Status);
        createDtPicker.setDt(data.Create);
        // modifyDtPicker.setDt(data.Modify);
        TinyMceHelper_1.default.setContent(data.Value, "tinyEditor");
    };
    /**
     * 请求数据记录
     * @param essayId 数据记录的id
     */
    var queryEssayData = function (essayId) {
        $.ajax({
            url: editApi,
            data: {
                id: essayId
            },
            type: "get",
            success: function (msg) {
                if (msg.Code === 0) {
                    var data = msg.Data;
                    initUi(data);
                }
            }
        });
    };
    TinyMceHelper_1.default.init("#tinyEditor", 'full', "340", "100%", {
        toolbar_mode: 'wrap'
    });
    //判断是否为编辑模式
    if (editInfo.isEdit) {
        queryEssayData(editInfo.id);
    }
    //submit事件绑定
    var handlerSubmit = function () {
        var submit = function (data) {
            data.value = TinyMceHelper_1.default.getContent("tinyEditor");
            data.id = $("#key").data("id");
            Global_1.default.showLoading();
            $.ajax({
                url: editApi,
                type: "post",
                data: data,
                success: function (msg) {
                    if (msg.Code === 0 && msg.Data) {
                        if (editInfo.isEdit) {
                            Global_1.default.alert("修改成功");
                        }
                        else {
                            Global_1.default.alert("添加成功");
                        }
                        if (postCallBackUrl) {
                            window.setTimeout(function () {
                                location.href = postCallBackUrl;
                            }, 1000);
                        }
                    }
                    else {
                        Global_1.default.alertError(msg.Error);
                    }
                },
                complete: function () {
                    Global_1.default.hideLoading();
                }
            });
        };
        $("#publish").click(function (e) {
            e.preventDefault();
            var forDataObj = Global_1.default.getFromDataObj("#editForm");
            submit(forDataObj);
        });
    };
    handlerSubmit();
});


/***/ }),

/***/ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\common\\TinyMceHelper.ts":
/*!**************************************************************************!*\
  !*** D:\coding\repos\BlogZ\BlogZ\wwwroot\assets\common\TinyMceHelper.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var tinymce = __importStar(__webpack_require__(/*! tinymce */ "tinymce"));
var tinyMceConfig_js_1 = __importDefault(__webpack_require__(/*! ./tinyMceConfig.js */ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\common\\tinyMceConfig.js"));
var cdn = "https://cdn.jsdelivr.net/gh/zxyao145/GhStatics/zxyao.net/assets";
var primseHighLight = function () {
    var allUeditorPreCode = $("#tinymce");
    allUeditorPreCode.each(function () {
        var $this = $(this);
        var classVal = $this.attr('class');
        var classArr = classVal.split(';');
        classArr = classArr[0].split(':');
        var lanClass = 'language-' + classArr[1];
        $this.addClass("line-numbers")
            .css("white-space", "pre-wrap");
        $this.children('code').addClass(lanClass);
        //var pre_content = '<code class="' + lan_class + '">' + $(this).children('code').html() + '</code>';
        //$(this).html(pre_content);
    });
    window.Prism.highlightAll(); //js代码中调用此方法
};
var safeSetContent = function (editor, content) {
    if (editor.initialized) {
        editor.setContent(content);
    }
    else {
        window.setTimeout(function () {
            safeSetContent(editor, content);
        }, 2000);
    }
};
var tinyMceLoader = {
    init: function (selector, tinymceType, height, width, otherConfig, onReady) {
        if (selector === void 0) { selector = "#tinyEditor"; }
        if (tinymceType === void 0) { tinymceType = "basic"; }
        if (height === void 0) { height = 440; }
        if (width === void 0) { width = "100%"; }
        if (otherConfig === void 0) { otherConfig = null; }
        if (onReady === void 0) { onReady = null; }
        var lineheightFormats = "1 1.25 1.4 1.5 1.75 1.8 2";
        if (tinymceType === 'full') {
            lineheightFormats = '1 1.25 1.4 1.5 1.6 1.75 1.8 2 3 4 5';
        }
        var config = {
            selector: selector,
            init_instance_callback: function (editor) {
                typeof onReady === 'function' && onReady();
                //editor.setContent($(selector).val());
                editor.on('blur', function (e) {
                    $(selector).val(editor.getContent());
                });
                //editor.execCommand("fontName", false, "Arial");
                //editor.execCommand("fontSize", false, "12pt");
            },
            language: 'zh_CN',
            language_url: cdn + '/libs/tinymce/5.2.0/langs/zh_CN.js',
            width: width,
            height: height,
            theme: 'silver',
            relative_urls: false,
            browser_spellcheck: false,
            fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 28pt 20pt 36pt",
            font_formats: "Times New Roman=times new roman,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书'",
            lineheight_formats: lineheightFormats,
            paste_enable_default_filters: true,
            //prism js language list
            codesample_languages: [
                { text: 'C#', value: 'csharp' },
                { text: 'HTML/XML', value: 'markup' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'TypeScript', value: 'ts' },
                { text: 'Scss', value: 'scss' },
                { text: 'Python', value: 'python' },
                { text: 'Java', value: 'java' },
                { text: 'Markdown', value: 'md' },
                { text: 'YAML', value: 'yml' },
                { text: 'JSON', value: 'json' },
                { text: 'SQL', value: 'sql' },
                { text: 'Bash', value: 'bash' },
                { text: 'C', value: 'c' },
                { text: 'C++', value: 'cpp' }
            ],
        };
        if (otherConfig) {
            $.extend(config, otherConfig);
        }
        $.extend(config, tinyMceConfig_js_1.default[tinymceType]);
        tinymce.init(config);
    },
    setContent: function (content, selector) {
        if (selector === void 0) { selector = "tinyEditor"; }
        safeSetContent(tinymce.get(selector), content);
    },
    getContent: function (selector) {
        if (selector === void 0) { selector = "tinyEditor"; }
        var editor = tinymce.get(selector);
        if (editor.initialized) {
            return editor.getContent();
        }
        else {
            return null;
        }
    }
};
exports.default = tinyMceLoader;


/***/ }),

/***/ "D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\common\\util.ts":
/*!*****************************************************************!*\
  !*** D:\coding\repos\BlogZ\BlogZ\wwwroot\assets\common\util.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var getIdByRoute = function () {
    var pathInfo = location.pathname.split('/')
        .filter(function (item) {
        if (item) {
            return true;
        }
        return false;
    });
    return pathInfo[pathInfo.length - 1];
};
var pickUpUrlParams = function () {
    var url = location.search; //获取url中"?"符后的字串 
    var urlParamInfo = {
        keys: [],
        params: {},
        get: function (key) {
            return "";
        }
    };
    if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        var requestPairArr = str.split("&");
        var keyArr_1 = [];
        var params_1 = {};
        for (var i = 0; i < requestPairArr.length; i++) {
            var paramPair = requestPairArr[i].split("=");
            var key = paramPair[0].toLocaleLowerCase();
            if (params_1[key]) {
                params_1[key] = [params_1[key], unescape(paramPair[1])];
            }
            else {
                params_1[key] = unescape(paramPair[1]);
            }
            keyArr_1.push(key);
        }
        var get = function (key) {
            var lowKey = key.toLocaleLowerCase();
            if (keyArr_1.includes(lowKey)) {
                return params_1[key];
            }
            else {
                return "";
            }
        };
        urlParamInfo.keys = keyArr_1;
        urlParamInfo.params = params_1;
        urlParamInfo.get = get;
    }
    return urlParamInfo;
};
var util = {
    "getIdByRoute": getIdByRoute,
    "pickUpUrlParams": pickUpUrlParams
};
exports.default = util;


/***/ }),

/***/ "tinymce":
/*!**************************!*\
  !*** external "tinymce" ***!
  \**************************/
/***/ ((module) => {

module.exports = tinymce;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("D:\\coding\\repos\\BlogZ\\BlogZ\\wwwroot\\assets\\BackCms\\src\\ts\\pages\\kvTable-edit.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=kvTable-edit.bundle.js.map