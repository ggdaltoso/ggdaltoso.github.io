(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{Bnag:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},EbDI:function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},Ijbi:function(t,e,n){var r=n("WkPL");t.exports=function(t){if(Array.isArray(t))return r(t)}},J4bc:function(t,e,n){"use strict";n.r(e),n.d(e,"query",(function(){return R}));var r=n("q1tI"),o=n.n(r),a=n("Zttt"),i=n("Wbzz"),u=n("7Qib"),c=n("d+ly"),s=n.n(c),l=n("gGy4"),f=function(){var t=Object(l.b)().author;return o.a.createElement("div",{className:s.a.author},o.a.createElement("p",{className:s.a.author__bio},t.bio,o.a.createElement("a",{className:s.a["author__bio-twitter"],href:Object(u.a)("twitter",t.contacts.twitter),rel:"noopener noreferrer",target:"_blank"},o.a.createElement("strong",null,t.name)," on Twitter")))},p=n("RPjP"),m=n.n(p),d=function(t){var e=t.postTitle,n=t.postSlug,r=Object(l.b)(),a=r.url,i=r.disqusShortname;return i?o.a.createElement(m.a,{shortname:i,identifier:e,title:e,url:a+n}):null},b=n("X8hv"),y=n.n(b),g=n("Mvws"),_=n.n(g),h=function(t){var e=t.body,n=t.title,r=t.mdx;return o.a.createElement("div",{className:_.a.content},o.a.createElement("h1",{className:_.a.content__title},n),r?o.a.createElement("div",{className:_.a.content__body},o.a.createElement(y.a,null,e)):o.a.createElement("div",{className:_.a.content__body,dangerouslySetInnerHTML:{__html:e}}))},v=n("wd/R"),w=n.n(v),O=n("myfg"),E=n.n(O),j=function(t){var e=t.date;return o.a.createElement("div",{className:E.a.meta},o.a.createElement("p",{className:E.a.meta__date},"Published ",w()(e).format("D MMM YYYY")))},P=n("dk8e"),k=n("WXWR"),x=n.n(k),S=function(t){var e=t.tags,n=t.tagSlugs;return o.a.createElement("div",{className:x.a.tags},o.a.createElement("ul",{className:x.a.tags__list},n&&n.map((function(t,n){return o.a.createElement("li",{className:x.a["tags__list-item"],key:e[n]},o.a.createElement(P.Button,null,o.a.createElement(i.Link,{to:t},e[n])))}))))},N=n("gt/k"),D=n.n(N),q=function(t){var e=t.post,n=t.mdx,r=e.html,a=e.fields,u=a.tagSlugs,c=a.slug,s=e.frontmatter,l=s.tags,p=s.title,m=s.date;return o.a.createElement("div",{className:D.a.post},o.a.createElement(i.Link,{className:D.a["post__home-button"],to:"/"},"Todos os artigos"),o.a.createElement("div",{className:D.a.post__content},o.a.createElement(h,{body:n?n.body:r,mdx:Boolean(n),title:p})),o.a.createElement("div",{className:D.a.post__footer},o.a.createElement(j,{date:m}),l&&u&&o.a.createElement(S,{tags:l,tagSlugs:u}),o.a.createElement(f,null)),o.a.createElement("div",{className:D.a.post__comments},o.a.createElement(d,{postSlug:c,postTitle:e.frontmatter.title})))},R="3754810133";e.default=function(t){var e=t.data,n=Object(l.b)(),r=n.title,i=n.subtitle,u=e.markdownRemark.frontmatter,c=u.title,s=u.description,f=null!==s?s:i;return o.a.createElement(a.a,{title:c+" - "+r,description:f},o.a.createElement(q,{post:e.markdownRemark,mdx:e.mdx}))}},Mvws:function(t,e,n){t.exports={content:"Content-module--content--1tfQQ",content__title:"Content-module--content__title--1qFLI",content__body:"Content-module--content__body--2bfha",figure:"Content-module--figure--hdkRf"}},RIqP:function(t,e,n){var r=n("Ijbi"),o=n("EbDI"),a=n("ZhPi"),i=n("Bnag");t.exports=function(t){return r(t)||o(t)||a(t)||i()}},RPjP:function(t,e,n){"use strict";t.exports=n("SLms")},SLms:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=u(n("q1tI")),i=u(n("17x9"));function u(t){return t&&t.__esModule?t:{default:t}}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var l=["shortname","identifier","title","url","category_id","onNewComment","language"],f=!1;function p(t,e){var n=e.onNewComment,r=e.language,o=function(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}(e,["onNewComment","language"]);for(var a in o)t.page[a]=o[a];t.language=r,n&&(t.callbacks={onNewComment:[n]})}var m=function(t){function e(){return c(this,e),s(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"componentDidMount",value:function(){this.loadDisqus()}},{key:"componentDidUpdate",value:function(){this.loadDisqus()}},{key:"shouldComponentUpdate",value:function(t,e){return t.identifier!==this.props.identifier}},{key:"render",value:function(){var t=this,e=Object.keys(this.props).reduce((function(e,n){return l.some((function(t){return t===n}))?e:r({},e,function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}({},n,t.props[n]))}),{});return a.default.createElement("div",e,a.default.createElement("div",{id:"disqus_thread"}))}},{key:"addDisqusScript",value:function(){if(!f){var t=this.disqus=document.createElement("script"),e=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0];t.async=!0,t.type="text/javascript",t.src="//"+this.props.shortname+".disqus.com/embed.js",e.appendChild(t),f=!0}}},{key:"loadDisqus",value:function(){var t=this,e={};l.forEach((function(n){"shortname"!==n&&t.props[n]&&(e[n]=t.props[n])})),"undefined"!=typeof DISQUS?DISQUS.reset({reload:!0,config:function(){p(this,e),this.page.url=this.page.url.replace(/#/,"")+"#!newthread"}}):(window.disqus_config=function(){p(this,e)},this.addDisqusScript())}}]),e}(a.default.Component);m.displayName="DisqusThread",m.propTypes={id:i.default.string,shortname:i.default.string.isRequired,identifier:i.default.string,title:i.default.string,url:i.default.string,category_id:i.default.string,onNewComment:i.default.func,language:i.default.string},m.defaultProps={url:"undefined"==typeof window?null:window.location.href},e.default=m},SksO:function(t,e){function n(e,r){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},n(e,r)}t.exports=n},WXWR:function(t,e,n){t.exports={tags:"Tags-module--tags--1oNz4",tags__list:"Tags-module--tags__list--2UTD-","tags__list-item":"Tags-module--tags__list-item--b7tap","tags__list-item-link":"Tags-module--tags__list-item-link--1hQL0"}},WkPL:function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}},X8hv:function(t,e,n){var r=n("sXyB"),o=n("RIqP"),a=n("lSNA"),i=n("8OQS");function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var s=n("q1tI"),l=n("7ljp"),f=l.useMDXComponents,p=l.mdx,m=n("BfwJ").useMDXScope;t.exports=function(t){var e=t.scope,n=t.components,a=t.children,u=i(t,["scope","components","children"]),l=f(n),d=m(e),b=s.useMemo((function(){if(!a)return null;var t=c({React:s,mdx:p},d),e=Object.keys(t),n=e.map((function(e){return t[e]}));return r(Function,["_fn"].concat(o(e),[""+a])).apply(void 0,[{}].concat(o(n)))}),[a,e]);return s.createElement(b,c({components:l},u))}},ZhPi:function(t,e,n){var r=n("WkPL");t.exports=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}},b48C:function(t,e){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}},"d+ly":function(t,e,n){t.exports={author:"Author-module--author--2kf8a","author__bio-twitter":"Author-module--author__bio-twitter--MufFK"}},"gt/k":function(t,e,n){t.exports={post__footer:"Post-module--post__footer--1BvmJ",post__comments:"Post-module--post__comments--2T8dL","post__home-button":"Post-module--post__home-button--3zx_9"}},lSNA:function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},myfg:function(t,e,n){t.exports={meta__date:"Meta-module--meta__date--3FNDv"}},sXyB:function(t,e,n){var r=n("SksO"),o=n("b48C");function a(e,n,i){return o()?t.exports=a=Reflect.construct:t.exports=a=function(t,e,n){var o=[null];o.push.apply(o,e);var a=new(Function.bind.apply(t,o));return n&&r(a,n.prototype),a},a.apply(null,arguments)}t.exports=a}}]);
//# sourceMappingURL=component---src-templates-post-template-js-757d64a4fb09eb954e41.js.map