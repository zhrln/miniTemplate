/* global define */
;(function(global, f){
    if (typeof module === "object" && module && typeof module.exports === "object"){
        module.exports = f();
    } else if(typeof define === "function"){
        define(function(){return f()});
    }else{
        global['tmpl'] = f();
    }
})(this, function(){
    'use strict';

    var miniTemplate = function(){
        if(typeof window == 'undefined'){
            this.inApp = true;
            this.dep = {
                fs: require('fs')
            };
        }
    };

    var fn = miniTemplate.prototype;

    fn.template = function(str){
        /*
         \n = 新行/换行 (hex:0a)
         \r = 回车符 (hex:0d)
         \t = Tab键 (hex:09)
         */
        return Function("obj",
            "var p=[];with(obj){p.push('" +
            str.replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'")
            + "');};return p.join('');");
    };

    fn.precompile = function(path, outPath){
        if(this.inApp){
            this.dep.fs.readFile(path, 'utf8', function(err, tpl){
                if(err) throw err;
                this.genTemplate(this.template(tpl),outPath);
            }.bind(this));
        }
    };

    fn.genTemplate = function(tpl, outPath){
        if(this.inApp){
            this.dep.fs.writeFile(outPath, this.wrapModule(tpl), function(err){
                if(err) throw err;
                console.log('done: ', outPath);
            });
        }
    };

    fn.wrapModule = function(fn){
        return '(' + Function([
                'var fn = ' + fn + ';',
                'if (typeof module === "object" && module && typeof module.exports === "object"){',
                'module.exports = fn;',
                '} else if(typeof define === "function"){',
                'define(function(){return fn;});',
                '}else{',
                'var scripts=document.getElementsByTagName("script");',
                'var tplid=scripts[scripts.length-1].dataset["id"];',
                'window[tplid]=fn;',
                '}'
            ].join('')) + ')()';
    };

    return miniTemplate;
});