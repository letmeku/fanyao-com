"use strict";(self.webpackChunkreact_nexlif=self.webpackChunkreact_nexlif||[]).push([[43],{35536:function(M,p,e){var c;e.r(p),e.d(p,{demos:function(){return O}});var h=e(90228),o=e.n(h),R=e(48305),P=e.n(R),b=e(87999),m=e.n(b),i=e(75271),S=e(34672),F=e(40225),O={"pdfview-demo-0":{component:i.memo(i.lazy(m()(o()().mark(function s(){var r,l,t,d,u,a,I;return o()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.bind(e,40225));case 2:return r=n.sent,l=r.PDFView,n.next=6,Promise.resolve().then(e.t.bind(e,75271,19));case 6:return t=n.sent,d=t.default,u=t.useState,a=t.useRef,I=function(){var E=u(!1),v=P()(E,2),_=v[0],f=v[1],x=a(null),y="https://example.com/sample.pdf";return d.createElement("div",null,d.createElement("button",{onClick:function(){return f(!0)}},"\u6253\u5F00 PDF"),_&&d.createElement(l,{file:y,onClose:function(){return f(!1)}}))},n.abrupt("return",{default:I});case 12:case"end":return n.stop()}},s)})))),asset:{type:"BLOCK",id:"pdfview-demo-0",refAtomIds:["PDFView"],dependencies:{"index.tsx":{type:"FILE",value:`import { PDFView } from 'react-nexlif';
import React, { useState,useRef } from 'react';
import { Button, Modal } from 'antd';
const App = () => {
  const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
  const fileUrl = "https://example.com/sample.pdf"; // \u66FF\u6362\u4E3A\u4F60\u7684 PDF \u6587\u4EF6\u5730\u5740
  return (
    <div >
      <button onClick={() => setVisible(true)}>\u6253\u5F00 PDF</button>
     {visible&&<PDFView
          file={fileUrl}
          onClose={() => setVisible(false)}
        />
        }
    </div>
  );
};

export default App;`},"react-nexlif":{type:"NPM",value:"0.0.3"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"react-nexlif":F,react:c||(c=e.t(i,2))},renderOpts:{compile:function(){var s=m()(o()().mark(function l(){var t,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(51).then(e.bind(e,98051));case 2:return a.abrupt("return",(t=a.sent).default.apply(t,d));case 3:case"end":return a.stop()}},l)}));function r(){return s.apply(this,arguments)}return r}()}},"pdfview-demo-1":{component:i.memo(i.lazy(m()(o()().mark(function s(){var r,l,t,d,u,a,I;return o()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.t.bind(e,75271,19));case 2:return r=n.sent,l=r.default,t=r.useState,d=r.useRef,n.next=8,Promise.resolve().then(e.bind(e,40225));case 8:return u=n.sent,a=u.PDFView,I=function(){var E=t(null),v=P()(E,2),_=v[0],f=v[1],x=d(null),y=t(!1),D=P()(y,2),B=D[0],K=D[1],A=function(V){var C,U=(C=V.target.files)===null||C===void 0?void 0:C[0];U&&f(URL.createObjectURL(U))};return l.createElement("div",{ref:x,style:{position:"relative",height:"100%",width:"100%"}},l.createElement("input",{type:"file",accept:".pdf",onChange:A}),l.createElement("div",{ref:x,style:{position:"relative",minHeight:"100vh",width:1100,height:"100%"}},_&&l.createElement(a,{parentDom:x.current,file:_,onClose:function(){f(null)}})))},n.abrupt("return",{default:I});case 12:case"end":return n.stop()}},s)})))),asset:{type:"BLOCK",id:"pdfview-demo-1",refAtomIds:["PDFView"],dependencies:{"index.tsx":{type:"FILE",value:`import React, { useState,useRef } from 'react';
import { PDFView } from 'react-nexlif';
import { Button, Modal } from 'antd';
const App: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileUrl(URL.createObjectURL(file))
    };
  };
  return (
    <div ref={ref} style={{ position: 'relative', height: '100%',width: '100%' }}>
      <input  type="file" accept=".pdf" onChange={handleFileChange} />
      
          <div ref={ref} style={{ position: 'relative', minHeight: '100vh',width:1100,height:'100%'}}>
       {fileUrl&& <PDFView
          parentDom={ref.current}
          file={fileUrl}
          onClose={() => {
            setFileUrl(null)
          }}
        />}
        </div>
    </div>
  );
};

export default App;`},react:{type:"NPM",value:"18.3.1"},"react-nexlif":{type:"NPM",value:"0.0.3"}},entry:"index.tsx"},context:{react:c||(c=e.t(i,2)),"react-nexlif":F},renderOpts:{compile:function(){var s=m()(o()().mark(function l(){var t,d=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(51).then(e.bind(e,98051));case 2:return a.abrupt("return",(t=a.sent).default.apply(t,d));case 3:case"end":return a.stop()}},l)}));function r(){return s.apply(this,arguments)}return r}()}}}},69021:function(M,p,e){e.r(p),e.d(p,{texts:function(){return h}});var c=e(34672);const h=[{value:"PDFView",paraId:0,tocIndex:1},{value:" \u662F\u4E00\u4E2A\u57FA\u4E8E ",paraId:0,tocIndex:1},{value:"react-pdf",paraId:0,tocIndex:1},{value:" \u7684 PDF \u67E5\u770B\u7EC4\u4EF6\uFF0C\u652F\u6301\u9875\u9762\u7FFB\u9875\u3001\u653E\u5927\u7F29\u5C0F\u3001\u65CB\u8F6C\u3001\u5168\u5C4F\u6A21\u5F0F\u4EE5\u53CA\u7F29\u7565\u56FE\u9884\u89C8\uFF0C\u80FD\u591F\u5728 Web \u9875\u9762\u4E0A\u65B9\u4FBF\u5730\u6D4F\u89C8 PDF \u6587\u4EF6\u3002",paraId:0,tocIndex:1},{value:`npm install react-nexlif
# \u6216\u8005
yarn add react-nexlif

# \u6216\u8005
pnpm add react-nexlif
`,paraId:1,tocIndex:2},{value:"\u652F\u6301 PDF \u6587\u4EF6\u67E5\u770B",paraId:2,tocIndex:3},{value:"\u652F\u6301\u5206\u9875\u6D4F\u89C8",paraId:2,tocIndex:3},{value:"\u652F\u6301\u7F29\u653E\uFF08\u653E\u5927/\u7F29\u5C0F\uFF09",paraId:2,tocIndex:3},{value:"\u652F\u6301\u65CB\u8F6C\uFF08\u5411\u5DE6/\u5411\u53F3 90\xB0\uFF09",paraId:2,tocIndex:3},{value:"\u652F\u6301\u5168\u5C4F\u67E5\u770B",paraId:2,tocIndex:3},{value:"\u652F\u6301\u7F29\u7565\u56FE\u9884\u89C8",paraId:2,tocIndex:3},{value:"\u652F\u6301\u52A8\u6001\u52A0\u8F7D\u9875\u9762\uFF0C\u63D0\u9AD8\u6027\u80FD",paraId:2,tocIndex:3},{value:"\u652F\u6301\u9519\u8BEF\u63D0\u793A\u4E0E\u52A0\u8F7D\u72B6\u6001",paraId:2,tocIndex:3},{value:"\u5C5E\u6027\u540D",paraId:3,tocIndex:6},{value:"\u7C7B\u578B",paraId:3,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:3,tocIndex:6},{value:"\u8BF4\u660E",paraId:3,tocIndex:6},{value:"file",paraId:3,tocIndex:6},{value:"string | null",paraId:3,tocIndex:6},{value:"null",paraId:3,tocIndex:6},{value:"\u8981\u52A0\u8F7D\u7684 PDF \u6587\u4EF6\u5730\u5740",paraId:3,tocIndex:6},{value:"parentDom",paraId:3,tocIndex:6},{value:"HTMLDivElement | null",paraId:3,tocIndex:6},{value:"document.body",paraId:3,tocIndex:6},{value:"\u7EC4\u4EF6\u6E32\u67D3\u7684\u7236\u5BB9\u5668\uFF0C\u9ED8\u8BA4\u6E32\u67D3\u5230 ",paraId:3,tocIndex:6},{value:"body",paraId:3,tocIndex:6},{value:"onClose",paraId:3,tocIndex:6},{value:"() => void",paraId:3,tocIndex:6},{value:"undefined",paraId:3,tocIndex:6},{value:"\u5173\u95ED\u7EC4\u4EF6\u7684\u56DE\u8C03\u51FD\u6570",paraId:3,tocIndex:6},{value:"\u9875\u9762\u7FFB\u9875",paraId:4},{value:"\u4F7F\u7528 ",paraId:5,tocIndex:8},{value:"<",paraId:5,tocIndex:8},{value:"\uFF08\u4E0A\u4E00\u9875\uFF09\u548C ",paraId:5,tocIndex:8},{value:">",paraId:5,tocIndex:8},{value:"\uFF08\u4E0B\u4E00\u9875\uFF09\u6309\u94AE\u8FDB\u884C\u7FFB\u9875\u3002",paraId:5,tocIndex:8},{value:"\u53EF\u4EE5\u8F93\u5165\u9875\u7801\u5E76\u56DE\u8F66\u8DF3\u8F6C\u5230\u6307\u5B9A\u9875\u3002",paraId:5,tocIndex:8},{value:"\u7F29\u653E",paraId:4},{value:"\u70B9\u51FB ",paraId:6,tocIndex:9},{value:"+",paraId:6,tocIndex:9},{value:" \u653E\u5927 PDF \u9875\u9762\u3002",paraId:6,tocIndex:9},{value:"\u70B9\u51FB ",paraId:6,tocIndex:9},{value:"-",paraId:6,tocIndex:9},{value:" \u7F29\u5C0F PDF \u9875\u9762\u3002",paraId:6,tocIndex:9},{value:"\u65CB\u8F6C",paraId:4},{value:"\u70B9\u51FB ",paraId:7,tocIndex:10},{value:"\u21BA",paraId:7,tocIndex:10},{value:" \u5411\u5DE6\u65CB\u8F6C 90\xB0\u3002",paraId:7,tocIndex:10},{value:"\u70B9\u51FB ",paraId:7,tocIndex:10},{value:"\u21BB",paraId:7,tocIndex:10},{value:" \u5411\u53F3\u65CB\u8F6C 90\xB0\u3002",paraId:7,tocIndex:10},{value:"\u5168\u5C4F\u6A21\u5F0F",paraId:4},{value:"\u70B9\u51FB ",paraId:8,tocIndex:11},{value:"\u26F6",paraId:8,tocIndex:11},{value:" \u4F7F PDF \u9875\u9762\u9002\u5E94\u7A97\u53E3\u5927\u5C0F\u3002",paraId:8,tocIndex:11},{value:"\u70B9\u51FB ",paraId:8,tocIndex:11},{value:"\u26F6",paraId:8,tocIndex:11},{value:" \u9000\u51FA\u5168\u5C4F\uFF0C\u6062\u590D\u9ED8\u8BA4\u5927\u5C0F\u3002",paraId:8,tocIndex:11},{value:"\u7F29\u7565\u56FE\u9884\u89C8",paraId:4},{value:"\u70B9\u51FB ",paraId:9,tocIndex:12},{value:"\u{1F4C4}",paraId:9,tocIndex:12},{value:" \u663E\u793A\u6240\u6709\u9875\u9762\u7684\u7F29\u7565\u56FE\u3002",paraId:9,tocIndex:12},{value:"\u70B9\u51FB\u7F29\u7565\u56FE\u53EF\u5FEB\u901F\u8DF3\u8F6C\u5230\u5BF9\u5E94\u9875\u3002",paraId:9,tocIndex:12},{value:"\u9519\u8BEF\u63D0\u793A & \u52A0\u8F7D\u72B6\u6001",paraId:4},{value:"\u5982\u679C\u6587\u4EF6\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F1A\u663E\u793A\u9519\u8BEF\u63D0\u793A\u3002",paraId:10,tocIndex:13},{value:"\u9875\u9762\u52A0\u8F7D\u8FC7\u7A0B\u4E2D\u4F1A\u663E\u793A ",paraId:10,tocIndex:13},{value:"Spin",paraId:10,tocIndex:13},{value:" \u52A0\u8F7D\u52A8\u753B\u3002",paraId:10,tocIndex:13},{value:"PDFView",paraId:11,tocIndex:14},{value:" \u7EC4\u4EF6\u63D0\u4F9B\u4E86\u7B80\u6D01\u6613\u7528\u7684 PDF \u6D4F\u89C8\u529F\u80FD\uFF0C\u9002\u7528\u4E8E\u5404\u79CD\u9700\u8981\u5728 Web \u9875\u9762\u4E0A\u67E5\u770B PDF \u6587\u4EF6\u7684\u573A\u666F\u3002\u901A\u8FC7\u591A\u79CD\u64CD\u4F5C\u65B9\u5F0F\uFF08\u7FFB\u9875\u3001\u7F29\u653E\u3001\u65CB\u8F6C\u3001\u5168\u5C4F\u3001\u7F29\u7565\u56FE\u7B49\uFF09\uFF0C\u80FD\u591F\u63D0\u9AD8\u7528\u6237\u4F53\u9A8C\uFF0C\u6EE1\u8DB3\u4E0D\u540C\u9700\u6C42\u3002",paraId:11,tocIndex:14},{value:"\u5982\u679C\u4F60\u60F3\u4E3A\u7EC4\u4EF6\u6DFB\u52A0\u529F\u80FD\u6216\u4FEE\u590D\u95EE\u9898\uFF0C\u8BF7 fork \u9879\u76EE\u5E76\u63D0\u4EA4 PR\u3002\u6B22\u8FCE\u4EFB\u4F55\u5F62\u5F0F\u7684\u8D21\u732E\uFF01",paraId:12,tocIndex:15},{value:"MIT License",paraId:13,tocIndex:16},{value:"",paraId:14,tocIndex:16}]}}]);
