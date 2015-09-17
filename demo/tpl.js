(function anonymous() {
var fn = function anonymous(obj
/**/) {
var p=[];with(obj){p.push(''); for(var i = 0,len = data.length; i < len; i++){ p.push('     <a href="',data[i],'">',data[i],'</a> ');}p.push('');};return p.join('');
};if (typeof module === "object" && module && typeof module.exports === "object"){module.exports = fn;} else if(typeof define === "function"){define(function(){return fn;});}else{var scripts=document.getElementsByTagName("script");var tplid=scripts[scripts.length-1].dataset["id"];window[tplid]=fn;}
})()