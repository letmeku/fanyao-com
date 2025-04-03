"use strict";(self.webpackChunkreact_nexlif=self.webpackChunkreact_nexlif||[]).push([[511],{39344:function(f,r,e){var u;e.r(r),e.d(r,{demos:function(){return g}});var p=e(90228),o=e.n(p),m=e(87999),v=e.n(m),s=e(75271),O=e(3586),h=e(40225),g={"aliuploader-demo-0":{component:s.memo(s.lazy(v()(o()().mark(function i(){var t,d,l,I,x,a;return o()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.t.bind(e,75271,19));case 2:return t=n.sent,d=t.default,l=t.useRef,n.next=7,Promise.resolve().then(e.bind(e,40225));case 7:return I=n.sent,x=I.AliUploader,a=function(){var A=l(null),y={region:"oss-cn-hangzhou",accessKeyId:"",accessKeySecret:"",bucket:""},S=function(c){},E=function(c){c.forEach(function(M){})},C=function(c){console.log("\u6587\u4EF6ID:",c)};return d.createElement("div",{style:{padding:"20px",maxWidth:"600px"}},d.createElement("h2",null,"\u9879\u76EE\u6587\u4EF6\u4E0A\u4F20\u5668\uFF08OSS \u7248\uFF09"),d.createElement(x,{accept:".doc,.docx,.pdf,.png,.jpg",uploadName:"\u4E0A\u4F20\u9879\u76EE\u6587\u4EF6\u5230 OSS",maxCount:5,maxBytes:10,multiple:!0,listType:"picture",showUploadList:!0,ossConfig:y,onChange:S,onSuccess:E,filedIds:C,extraTip:d.createElement("p",{style:{color:"#999"}},"\u652F\u6301\u62D6\u62FD\u6279\u91CF\u4E0A\u4F20\uFF0C\u76F4\u63A5\u5B58\u81F3 OSS\uFF0C\u6700\u591A5\u4E2A\u6587\u4EF6")}))},n.abrupt("return",{default:a});case 11:case"end":return n.stop()}},i)})))),asset:{type:"BLOCK",id:"aliuploader-demo-0",refAtomIds:["AliUploader"],dependencies:{"index.tsx":{type:"FILE",value:`import React, { useState, useRef } from 'react';\r
import { AliUploader } from 'react-nexlif';\r
import { ApartmentOutlined } from '@ant-design/icons';\r
// import {ossConfig} from './utils';\r
\r
const App: React.FC = () => {\r
  const uploadRef = useRef(null);\r
\r
  const ossConfig = {\r
    region: 'oss-cn-hangzhou',\r
    accessKeyId: '',\r
    accessKeySecret: '',\r
    bucket: '',\r
  };\r
\r
  const handleChange = (list: any[]) => {\r
    // console.log('\u5F53\u524D\u6587\u4EF6\u5217\u8868:', list);\r
  };\r
\r
  const handleSuccess = (list: any[]) => {\r
    // console.log('\u4E0A\u4F20\u6210\u529F:', list);\r
    list.forEach((file) => {\r
      // console.log(\`\u6587\u4EF6 \${file.name} \u7684 OSS \u94FE\u63A5: \${file.url}\`),\r
    });\r
  };\r
\r
  const handleIds = (ids: string[]) => {\r
    console.log('\u6587\u4EF6ID:', ids);\r
  };\r
\r
  return (\r
    <div style={{ padding: '20px', maxWidth: '600px' }}>\r
      <h2>\u9879\u76EE\u6587\u4EF6\u4E0A\u4F20\u5668\uFF08OSS \u7248\uFF09</h2>\r
      <AliUploader\r
        accept=".doc,.docx,.pdf,.png,.jpg"\r
        uploadName="\u4E0A\u4F20\u9879\u76EE\u6587\u4EF6\u5230 OSS"\r
        maxCount={5}\r
        maxBytes={10}\r
        multiple={true}\r
        listType="picture"\r
        showUploadList={true}\r
        ossConfig={ossConfig}\r
        onChange={handleChange}\r
        onSuccess={handleSuccess}\r
        filedIds={handleIds}\r
        extraTip={\r
          <p style={{ color: '#999' }}>\r
            \u652F\u6301\u62D6\u62FD\u6279\u91CF\u4E0A\u4F20\uFF0C\u76F4\u63A5\u5B58\u81F3 OSS\uFF0C\u6700\u591A5\u4E2A\u6587\u4EF6\r
          </p>\r
        }\r
      />\r
    </div>\r
  );\r
};\r
\r
export default App;`},react:{type:"NPM",value:"18.3.1"},"react-nexlif":{type:"NPM",value:"0.0.3"}},entry:"index.tsx"},context:{react:u||(u=e.t(s,2)),"react-nexlif":h},renderOpts:{compile:function(){var i=v()(o()().mark(function d(){var l,I=arguments;return o()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(51).then(e.bind(e,98051));case 2:return a.abrupt("return",(l=a.sent).default.apply(l,I));case 3:case"end":return a.stop()}},d)}));function t(){return i.apply(this,arguments)}return t}()}}}},94588:function(f,r,e){e.r(r),e.d(r,{texts:function(){return p}});var u=e(3586);const p=[{value:"AliUploader \u7EC4\u4EF6\u662F\u4E00\u4E2A\u6587\u4EF6\u4E0A\u4F20\u7EC4\u4EF6\uFF0C\u652F\u6301\u4E0A\u4F20\u5230\u963F\u91CC\u4E91 OSS\uFF0C\u63D0\u4F9B\u6279\u91CF\u4E0A\u4F20\u3001\u62D6\u62FD\u4E0A\u4F20\u3001\u6587\u4EF6\u5206\u7C7B\u7BA1\u7406\u3001\u6392\u5E8F\u3001\u5220\u9664\u3001\u6279\u91CF\u7F16\u8F91\u7B49\u529F\u80FD\u3002",paraId:0,tocIndex:1},{value:"\u652F\u6301\u591A\u79CD\u6587\u4EF6\u7C7B\u578B",paraId:1,tocIndex:2},{value:"\uFF08\u56FE\u7247\u3001\u6587\u6863\u3001\u5176\u4ED6\uFF09",paraId:1,tocIndex:2},{value:"\u652F\u6301\u62D6\u62FD\u4E0A\u4F20",paraId:1,tocIndex:2},{value:"\u4E0A\u4F20\u8FDB\u5EA6\u663E\u793A",paraId:1,tocIndex:2},{value:"\u6587\u4EF6\u5217\u8868\u7BA1\u7406",paraId:1,tocIndex:2},{value:"\uFF08\u5206\u7EC4\u3001\u6392\u5E8F\u3001\u5220\u9664\u3001\u7F16\u8F91\uFF09",paraId:1,tocIndex:2},{value:"\u6279\u91CF\u4E0A\u4F20\u548C\u6279\u91CF\u7F16\u8F91",paraId:1,tocIndex:2},{value:"\u4E0A\u4F20\u524D\u6587\u4EF6\u6821\u9A8C",paraId:1,tocIndex:2},{value:"\uFF08\u6587\u4EF6\u7C7B\u578B\u3001\u5927\u5C0F\u9650\u5236\uFF09",paraId:1,tocIndex:2},{value:"\u6587\u4EF6\u81EA\u52A8\u540C\u6B65 OSS",paraId:1,tocIndex:2},{value:"\u4F7F\u7528 ",paraId:2,tocIndex:3},{value:"npm",paraId:2,tocIndex:3},{value:" \u6216 ",paraId:2,tocIndex:3},{value:"yarn",paraId:2,tocIndex:3},{value:" \u5B89\u88C5\u7EC4\u4EF6\uFF1A",paraId:2,tocIndex:3},{value:`npm install react-nexlif\r
# \u6216\u8005\r
yarn add react-nexlif\r
\r
# \u6216\u8005\r
pnpm install react-nexlif
`,paraId:3,tocIndex:3},{value:"\u5C5E\u6027\u540D",paraId:4,tocIndex:6},{value:"\u7C7B\u578B",paraId:4,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:4,tocIndex:6},{value:"\u8BF4\u660E",paraId:4,tocIndex:6},{value:"accept",paraId:4,tocIndex:6},{value:"string",paraId:4,tocIndex:6},{value:".doc,.docx,.xls,.xlsx,.pdf,.pptx,.png,.jpg",paraId:4,tocIndex:6},{value:"\u5141\u8BB8\u4E0A\u4F20\u7684\u6587\u4EF6\u7C7B\u578B",paraId:4,tocIndex:6},{value:"uploadName",paraId:4,tocIndex:6},{value:"string",paraId:4,tocIndex:6},{value:"\u4E0A\u4F20\u6587\u4EF6",paraId:4,tocIndex:6},{value:"\u6309\u94AE\u540D\u79F0",paraId:4,tocIndex:6},{value:"listType",paraId:4,tocIndex:6},{value:"'text' | 'picture'",paraId:4,tocIndex:6},{value:"text",paraId:4,tocIndex:6},{value:"\u663E\u793A\u6587\u4EF6\u5217\u8868\u7684\u6837\u5F0F",paraId:4,tocIndex:6},{value:"maxCount",paraId:4,tocIndex:6},{value:"number",paraId:4,tocIndex:6},{value:"1",paraId:4,tocIndex:6},{value:"\u5141\u8BB8\u4E0A\u4F20\u7684\u6700\u5927\u6587\u4EF6\u6570",paraId:4,tocIndex:6},{value:"maxBytes",paraId:4,tocIndex:6},{value:"number",paraId:4,tocIndex:6},{value:"20",paraId:4,tocIndex:6},{value:"\u5141\u8BB8\u7684\u6700\u5927\u6587\u4EF6\u5927\u5C0F\uFF08\u5355\u4F4D\uFF1AMB\uFF09",paraId:4,tocIndex:6},{value:"multiple",paraId:4,tocIndex:6},{value:"boolean",paraId:4,tocIndex:6},{value:"false",paraId:4,tocIndex:6},{value:"\u662F\u5426\u652F\u6301\u591A\u6587\u4EF6\u4E0A\u4F20",paraId:4,tocIndex:6},{value:"fileList",paraId:4,tocIndex:6},{value:"FileData[]",paraId:4,tocIndex:6},{value:"[]",paraId:4,tocIndex:6},{value:"\u9ED8\u8BA4\u6587\u4EF6\u5217\u8868",paraId:4,tocIndex:6},{value:"uploadUrl",paraId:4,tocIndex:6},{value:"string",paraId:4,tocIndex:6},{value:"undefined",paraId:4,tocIndex:6},{value:"\u4E0A\u4F20\u5730\u5740\uFF08\u672A\u4F7F\u7528 OSS \u65F6\uFF09",paraId:4,tocIndex:6},{value:"ossConfig",paraId:4,tocIndex:6},{value:"object",paraId:4,tocIndex:6},{value:"undefined",paraId:4,tocIndex:6},{value:"OSS \u914D\u7F6E\uFF08region, accessKeyId, accessKeySecret, bucket\uFF09",paraId:4,tocIndex:6},{value:"showUploadList",paraId:4,tocIndex:6},{value:"boolean",paraId:4,tocIndex:6},{value:"true",paraId:4,tocIndex:6},{value:"\u662F\u5426\u663E\u793A\u6587\u4EF6\u5217\u8868",paraId:4,tocIndex:6},{value:"disabled",paraId:4,tocIndex:6},{value:"boolean",paraId:4,tocIndex:6},{value:"false",paraId:4,tocIndex:6},{value:"\u662F\u5426\u7981\u7528\u4E0A\u4F20",paraId:4,tocIndex:6},{value:"extraTip",paraId:4,tocIndex:6},{value:"ReactNode",paraId:4,tocIndex:6},{value:"undefined",paraId:4,tocIndex:6},{value:"\u989D\u5916\u63D0\u793A\u4FE1\u606F",paraId:4,tocIndex:6},{value:"showTips",paraId:4,tocIndex:6},{value:"boolean",paraId:4,tocIndex:6},{value:"true",paraId:4,tocIndex:6},{value:"\u662F\u5426\u663E\u793A\u4E0A\u4F20\u63D0\u793A",paraId:4,tocIndex:6},{value:"onChange",paraId:4,tocIndex:6},{value:"(list: FileData[]) => void",paraId:4,tocIndex:6},{value:"undefined",paraId:4,tocIndex:6},{value:"\u6587\u4EF6\u5217\u8868\u53D8\u5316\u65F6\u89E6\u53D1",paraId:4,tocIndex:6},{value:"onLoading",paraId:4,tocIndex:6},{value:"(loading: boolean) => void",paraId:4,tocIndex:6},{value:"undefined",paraId:4,tocIndex:6},{value:"\u4E0A\u4F20\u72B6\u6001\u53D8\u5316\u65F6\u89E6\u53D1",paraId:4,tocIndex:6},{value:"onSuccess",paraId:4,tocIndex:6},{value:"(list: FileData[]) => void",paraId:4,tocIndex:6},{value:"undefined",paraId:4,tocIndex:6},{value:"\u4E0A\u4F20\u6210\u529F\u65F6\u89E6\u53D1",paraId:4,tocIndex:6},{value:"filedIds",paraId:4,tocIndex:6},{value:"(ids: string[]) => void",paraId:4,tocIndex:6},{value:"undefined",paraId:4,tocIndex:6},{value:"\u8FD4\u56DE\u4E0A\u4F20\u7684\u6587\u4EF6 ID",paraId:4,tocIndex:6},{value:"handleUpload(file: File, fileList: File[])",paraId:5,tocIndex:7},{value:" - \u5904\u7406\u6587\u4EF6\u4E0A\u4F20\u903B\u8F91\u3002",paraId:5,tocIndex:7},{value:"handleRemove(file: FileData)",paraId:5,tocIndex:7},{value:" - \u5220\u9664\u6587\u4EF6\u3002",paraId:5,tocIndex:7},{value:"handleEdit(editedFile: FileData)",paraId:5,tocIndex:7},{value:" - \u7F16\u8F91\u6587\u4EF6\u4FE1\u606F\u3002",paraId:5,tocIndex:7},{value:"handleSelect(uid: string, selected: boolean)",paraId:5,tocIndex:7},{value:" - \u9009\u62E9\u6587\u4EF6\u8FDB\u884C\u6279\u91CF\u64CD\u4F5C\u3002",paraId:5,tocIndex:7},{value:"handleBatchEdit()",paraId:5,tocIndex:7},{value:" - \u5904\u7406\u6279\u91CF\u7F16\u8F91\u3002",paraId:5,tocIndex:7},{value:"applyBatchEdit()",paraId:5,tocIndex:7},{value:" - \u5E94\u7528\u6279\u91CF\u7F16\u8F91\u7ED3\u679C\u3002",paraId:5,tocIndex:7},{value:"OSS \u914D\u7F6E",paraId:6,tocIndex:8},{value:"\uFF1A\u786E\u4FDD\u4F20\u5165\u6B63\u786E\u7684\u963F\u91CC\u4E91 OSS \u914D\u7F6E\uFF0C\u5426\u5219\u4E0A\u4F20\u5931\u8D25\u3002",paraId:6,tocIndex:8},{value:"\u6587\u4EF6\u6821\u9A8C",paraId:6,tocIndex:8},{value:"\uFF1A\u7EC4\u4EF6\u5185\u7F6E\u6587\u4EF6\u7C7B\u578B\u548C\u5927\u5C0F\u6821\u9A8C\uFF0C\u5982\u8D85\u51FA\u9650\u5236\u4F1A\u6709\u63D0\u793A\u3002",paraId:6,tocIndex:8},{value:"\u6392\u5E8F\u529F\u80FD",paraId:6,tocIndex:8},{value:"\uFF1A\u652F\u6301\u6309\u6587\u4EF6\u540D\u79F0\u6216\u4E0A\u4F20\u65F6\u95F4\u6392\u5E8F\u3002",paraId:6,tocIndex:8},{value:"\u6279\u91CF\u64CD\u4F5C",paraId:6,tocIndex:8},{value:"\uFF1A\u652F\u6301\u6279\u91CF\u7F16\u8F91\u6587\u4EF6\u5907\u6CE8\u4FE1\u606F\u3002",paraId:6,tocIndex:8},{value:"AliUploader \u7EC4\u4EF6\u63D0\u4F9B\u4E86\u5F3A\u5927\u7684\u6587\u4EF6\u4E0A\u4F20\u80FD\u529B\uFF0C\u9002\u7528\u4E8E\u9700\u8981\u96C6\u6210\u963F\u91CC\u4E91 OSS \u8FDB\u884C\u6587\u4EF6\u7BA1\u7406\u7684\u524D\u7AEF\u5E94\u7528\u3002\u53EF\u4EE5\u65B9\u4FBF\u5730\u5904\u7406\u5355\u4E2A\u6216\u591A\u4E2A\u6587\u4EF6\u4E0A\u4F20\uFF0C\u5E76\u5BF9\u6587\u4EF6\u8FDB\u884C\u7BA1\u7406\u3001\u5206\u7C7B\u3001\u7F16\u8F91\u7B49\u64CD\u4F5C\u3002",paraId:7,tocIndex:9},{value:"\u672C\u7EC4\u4EF6\u9075\u5FAA MIT \u8BB8\u53EF\u8BC1\u3002",paraId:8,tocIndex:10}]}}]);
