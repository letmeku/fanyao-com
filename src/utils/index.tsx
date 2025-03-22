import React from 'react';
import browserVersionTest from './browserVersionTest';

const UtilsDemo: React.FC = () => {
  return (
    <div>
      <h1>浏览器工具测试</h1>
      <p>{
        browserVersionTest().name +'' +browserVersionTest().version
        }</p>
    </div>
  );
};
export default  UtilsDemo
