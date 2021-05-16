tinymce.PluginManager.add('indent2em', function(editor, url) {
    var pluginName='插入代码';
    // Add custom css and js
    editor.on('init', function () {
        var shCssUrl = url + '/styles/syntaxhighlighter.css';
        var hlCssUrl = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/styles/default.min.css";
        var hlJsUrl = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/highlight.min.js";

        shCssLink = editor.dom.create('link', { rel: 'stylesheet', href: shCssUrl });
        hlCssLink = editor.dom.create('link', { rel: 'stylesheet', href: hlCssUrl });
        hlJsLink = editor.dom.create('script', { src: hlJsUrl });
        document.getElementsByTagName('head')[0].appendChild(shCssLink);
        document.getElementsByTagName('head')[0].appendChild(hlCssLink);
        document.getElementsByTagName('head')[0].appendChild(hlJsLink);

    });

    var codeHelper = (function() {
        var insertCode = function(editor, data) {
            //data.language data.code
            var el = editor.selection.getNode();
            var pre = editor.dom.getParent(el, "PRE");

            editor.undoManager.beforeChange();

            // Remove old node
            if (pre) {
                i = editor.selection.getBookmark();
                pre.innerHTML = "";
                editor.dom.remove(pre, 1);
                editor.selection.moveToBookmark(i);
            }

            var block = editor.dom.create("pre");
            block.innerHTML = "<code class='" + (data.language ? data.language : "")  + "'>" + editor.dom.encode(data.content) + "</code>";
            editor.selection.setNode(block);

            editor.undoManager.add();
        }
        var getSelectedCodeSample = function (editor) {
            var node = editor.selection ? editor.selection.getNode() : null;
            if (Utils.isCodeSample(node)) {
                return Option.some(node);
            }
            return Option.none();
        };

        var getCurrentCode = function (editor) {
            var node = getSelectedCodeSample(editor);
            return node.fold(function () {
                return '';
            }, function (n) {
                return n.textContent;
            });
        };
        var getCurrentLanguage = function (editor, fallback) {
            var node = getSelectedCodeSample(editor);
            return node.fold(function () {
                return fallback;
            }, function (n) {
                //TODO
                var matches = n.className.match(/language-(\w+)/);
                return matches ? matches[1] : fallback;
            });
        };
        return {
            insertCode:insertCode,
            getSelectedCodeSample:getSelectedCodeSample,
            getCurrentCode:getCurrentCode,
            getCurrentLanguage:getCurrentLanguage
        };
    })();

    var open = function (editor) {
        var languages = hljs.listLanguages();
        languages.unshift("nohighlight");

        var defaultLanguage = head(languages).fold(function () {
            return '';
        }, function (l) {
            return l.value;
        });

        var currentLanguage = codeHelper.getCurrentLanguage(editor, defaultLanguage);
        
        var currentCode = codeHelper.getCurrentCode(editor);
        
        editor.windowManager.open({
            title: 'Insert/Edit Code Sample',
            size: 'large',
            body: {
                type: 'panel',
                items: [
                    {
                        type: 'selectbox',
                        name: 'language',
                        label: 'Language',
                        items: languages
                    },
                    {
                        type: 'textarea',
                        name: 'code',
                        label: 'Code view'
                    }
                ]
            },
            buttons: [
                {
                    type: 'cancel',
                    name: 'cancel',
                    text: 'Cancel'
                },
                {
                    type: 'submit',
                    name: 'save',
                    text: 'Save',
                    primary: true
                }
            ],
            initialData: {
                language: currentLanguage,
                code: currentCode
            },
            onSubmit: function (api) {
                var data = api.getData();
                codeHelper.insertCode(editor, data);
                api.close();
            }
        });
    };
    var Dialog = { open: open };
    editor.ui.registry.getAll().icons.indent2em || editor.ui.registry.addIcon('indent2em','<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M170.666667 563.2v-102.4H887.466667v102.4zM170.666667 836.266667v-102.4H887.466667v102.4zM512 290.133333v-102.4H887.466667v102.4zM238.933333 341.333333V136.533333l204.8 102.4z" fill="#2c2c2c" p-id="5210"></path></svg>');
    
    editor.ui.registry.addButton('indent2em', {
        icon: 'indent2em',
        tooltip: pluginName,
        onAction: function () {
            doAct();
        }
    });

    editor.ui.registry.addMenuItem('indent2em', {
        text: pluginName,
        onAction: function() {
            doAct();
        }
    });

    return {
        getMetadata: function () {
            return  {
                name: pluginName,
                url: "http://tinymce.ax-z.cn/more-plugins/indent2em.php",
            };
        }
    };
});