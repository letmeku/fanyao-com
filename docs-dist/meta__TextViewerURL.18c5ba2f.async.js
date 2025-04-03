"use strict";(self.webpackChunkreact_nexlif=self.webpackChunkreact_nexlif||[]).push([[571],{91682:function(m,l,e){var u;e.r(l),e.d(l,{demos:function(){return f}});var _=e(90228),d=e.n(_),x=e(87999),i=e.n(x),c=e(75271),E=e(92766),v=e(40225),f={"textviewerurl-demo-0":{component:c.memo(c.lazy(i()(d()().mark(function p(){var o,a,r,s,I,n;return d()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.t.bind(e,75271,19));case 2:return o=t.sent,a=o.default,t.next=6,Promise.resolve().then(e.bind(e,40225));case 6:return r=t.sent,s=r.TextViewerURL,I=r.utils,n=function(){return a.createElement("div",null,a.createElement("h1",null,"Excel \u6587\u4EF6\u9884\u89C8"),a.createElement(a.Fragment,null,I.browserVersionTest().name),a.createElement(s,{height:500,fileUrl:"http://192.168.110.40:9000/knowledgebase/1\u6570\u636E\u5206\u6790\u4E0E\u6316\u6398ANSI_20250311140842.txt"}))},t.abrupt("return",{default:n});case 11:case"end":return t.stop()}},p)})))),asset:{type:"BLOCK",id:"textviewerurl-demo-0",refAtomIds:["TextViewerURL"],dependencies:{"index.tsx":{type:"FILE",value:`import React from 'react';
import {TextViewerURL,utils} from 'react-nexlif';


const App = () => {
  return (
    <div>
      <h1>Excel \u6587\u4EF6\u9884\u89C8</h1>
      <>{
        utils.browserVersionTest().name
      }</>
      <TextViewerURL height={500} fileUrl="http://192.168.110.40:9000/knowledgebase/1\u6570\u636E\u5206\u6790\u4E0E\u6316\u6398ANSI_20250311140842.txt" />
    </div>
  );
};
export default App;`},react:{type:"NPM",value:"18.3.1"},"react-nexlif":{type:"NPM",value:"0.0.3"}},entry:"index.tsx"},context:{react:u||(u=e.t(c,2)),"react-nexlif":v},renderOpts:{compile:function(){var p=i()(d()().mark(function a(){var r,s=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(51).then(e.bind(e,98051));case 2:return n.abrupt("return",(r=n.sent).default.apply(r,s));case 3:case"end":return n.stop()}},a)}));function o(){return p.apply(this,arguments)}return o}()}}}},90498:function(m,l,e){e.r(l),e.d(l,{texts:function(){return _}});var u=e(92766);const _=[{value:"TextViewerURL",paraId:0,tocIndex:1},{value:" \u662F\u4E00\u4E2A\u7528\u4E8E\u52A0\u8F7D\u548C\u663E\u793A\u8FDC\u7A0B\u6587\u672C\u6587\u4EF6\u5185\u5BB9\u7684 React \u7EC4\u4EF6\u3002\u5B83\u652F\u6301\u591A\u79CD\u5B57\u7B26\u7F16\u7801\uFF08\u5305\u62EC UTF-8\u3001UTF-16\u3001GB18030 \u548C ISO-8859-1\uFF09\uFF0C\u5E76\u80FD\u81EA\u52A8\u68C0\u6D4B BOM\uFF08\u5B57\u8282\u987A\u5E8F\u6807\u8BB0\uFF09\u4EE5\u6B63\u786E\u89E3\u7801\u6587\u4EF6\u5185\u5BB9\u3002",paraId:0,tocIndex:1},{value:"\u4F7F\u7528 ",paraId:1,tocIndex:2},{value:"npm",paraId:1,tocIndex:2},{value:" \u6216 ",paraId:1,tocIndex:2},{value:"yarn",paraId:1,tocIndex:2},{value:" \u5B89\u88C5\u7EC4\u4EF6\uFF1A",paraId:1,tocIndex:2},{value:`npm install react-nexlif
# \u6216\u8005
yarn add react-nexlif

# \u6216\u8005
pnpm add react-nexlif
`,paraId:2,tocIndex:2},{value:"\u53C2\u6570",paraId:3,tocIndex:4},{value:"\u7C7B\u578B",paraId:3,tocIndex:4},{value:"\u5FC5\u586B",paraId:3,tocIndex:4},{value:"\u8BF4\u660E",paraId:3,tocIndex:4},{value:"fileUrl",paraId:3,tocIndex:4},{value:"string",paraId:3,tocIndex:4},{value:"\u662F",paraId:3,tocIndex:4},{value:"\u8FDC\u7A0B\u6587\u672C\u6587\u4EF6\u7684 URL \u5730\u5740",paraId:3,tocIndex:4},{value:"\u81EA\u52A8\u7F16\u7801\u68C0\u6D4B",paraId:4,tocIndex:5},{value:"\uFF1A\u652F\u6301 UTF-8\uFF08\u542B BOM\uFF09\u3001UTF-16 LE/BE\uFF08\u542B BOM\uFF09\u3001GB18030\u3001ISO-8859-1 \u7F16\u7801\u3002",paraId:4,tocIndex:5},{value:"\u9519\u8BEF\u5904\u7406",paraId:4,tocIndex:5},{value:"\uFF1A\u5982\u679C\u6587\u4EF6\u65E0\u6CD5\u89E3\u7801\uFF0C\u4F1A\u663E\u793A\u9519\u8BEF\u4FE1\u606F\u3002",paraId:4,tocIndex:5},{value:"\u5F02\u6B65\u52A0\u8F7D",paraId:4,tocIndex:5},{value:"\uFF1A\u6587\u4EF6\u901A\u8FC7 ",paraId:4,tocIndex:5},{value:"fetch",paraId:4,tocIndex:5},{value:" \u52A0\u8F7D\uFF0C\u5E76\u5728\u52A0\u8F7D\u8FC7\u7A0B\u4E2D\u663E\u793A\u201C\u52A0\u8F7D\u4E2D...\u201D\u63D0\u793A\u3002",paraId:4,tocIndex:5},{value:"\u8BE5\u7EC4\u4EF6\u57FA\u4E8E ",paraId:5,tocIndex:6},{value:"React",paraId:5,tocIndex:6},{value:"\uFF0C\u8BF7\u786E\u4FDD\u9879\u76EE\u5DF2\u5B89\u88C5 React\u3002",paraId:5,tocIndex:6},{value:"\u672C\u7EC4\u4EF6\u9075\u5FAA MIT \u8BB8\u53EF\u8BC1\u3002",paraId:6,tocIndex:7},{value:`
\u8FD9\u6837\uFF0C\u6587\u6863\u6DB5\u76D6\u4E86\u7EC4\u4EF6\u7684\u529F\u80FD\u3001\u7528\u6CD5\u3001API\u3001\u7279\u6027\u548C\u6837\u5F0F\u4FE1\u606F\uFF0C\u7B26\u5408\u6807\u51C6\u7684\u7EC4\u4EF6\u6587\u6863\u683C\u5F0F\u3002\u4F60\u53EF\u4EE5\u6839\u636E\u9700\u8981\u8FDB\u4E00\u6B65\u8C03\u6574\u6216\u8865\u5145\u3002
`,paraId:7,tocIndex:7}]}}]);
