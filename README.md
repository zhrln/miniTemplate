# miniTemplate
一个简易的模板引擎

# 使用方法

## NodeJS

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

### 载入预编译后的模板：

``` javascript
var fn = require('./tpl.js');
fn({
    data : [
        '11111111',
        '22222222'
    ]
});
```

## Web

### 载入预编译后的模板进行渲染

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

### 实时渲染

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
    document.write('fn(hehe));
});
```