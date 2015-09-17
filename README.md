# miniTemplate
一个简易的模板引擎

有3种加载方式

* 通过 require 加载 lib 进行实时编译渲染
* 通过 require 加载预编译文件进行渲染
* 直接加载预编译文件进行渲染

## 准备阶段

### 模板文件(tpl.html)
```
<% for(var i = 0,len = data.length; i < len; i++){ %>
    <a href="<%=data[i]%>"><%=data[i]%></a>
<%}%>
```

### 将模板文件进行预编译：

``` javascript
var MiniTemplate = require('../index.js');
var mt = new MiniTemplate;
mt.precompile('./tpl.html','./tpl.js');
```

## 使用方法

### 方法一,通过 require 加载 lib 进行实时编译渲染:

```
require(['../index.js'], function(Template){
    var hehe = {
        data : [
            '11111111',
            '22222222'
        ]
    };
    var t = new Template;
    var fn = t.template('<% for(var i = 0,len = data.length; i < len; i++){ %><a href="<%=data[i]%>"><%=data[i]%></a><%}%>');
    document.write(fn(hehe));
});
```

### 方法二,通过 require 加载预编译文件进行渲染:

```
require(['./tpl.js'], function(Tpl){
    var hehe = {
        data : [
            '11111111',
            '22222222'
        ]
    };
    document.write(Tpl(hehe));
});
```

### 方法三,直接加载预编译文件进行渲染
```
<script src="./tpl.js" data-id="tpl-demo"></script>
<script>
    var hehe = {
        data : [
            '11111111',
            '22222222'
        ]
    };
    document.write('<textarea>方式3：' + window['tpl-demo'](hehe) + '</textarea>');
</script>
```
