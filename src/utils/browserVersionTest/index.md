
## browserVersionTest 浏览器检测工具使用说明

## 简介

这是一套用来检测用户浏览器类型和版本的 JavaScript 小工具。它能告诉你用户用的是啥浏览器（比如 Chrome、Firefox、IE 等），版本号是多少，还能检查这个浏览器版本是不是符合你的要求。简单来说，就是帮你判断“这个浏览器能不能用”。

## 核心功能

- **`detectBrowser`**：从用户浏览器的 `userAgent` 字符串里挖出浏览器名字和版本。
- **`checkCompatibility`**：根据你设定的规则，检查浏览器版本够不够用，不够就警告。
- **`browserVersionTest`**：一个测试函数，直接跑起来看看结果。

## 使用示例

直接把代码扔到你的项目里，然后调用 `browserVersionTest()` 就能看到效果：

```tsx
import React from 'react';
import {utils} from 'react-nexlif';

const App = () => {
  return (
    <div>
      <h1>浏览器工具测试</h1>
      <p>{
        utils.browserVersionTest().name +'' +utils.browserVersionTest().version 
        }</p>
    </div>
  );
};
export default App;
```

运行后，控制台会先打出一张表格，显示浏览器名字和版本，然后告诉你这个浏览器支不支持。比如：

- 如果你是用 Chrome 90，会看到绿色文字：“支持 Chrome 90，推荐使用最新 Chrome 浏览器！”
- 如果用的是老掉牙的 Chrome 50，会看到红字警告：“浏览器版本过低 (Chrome 50)，请使用 Chrome 73 或以上版本的浏览器”。

## 代码详解

### 1. `detectBrowser(ua: string)`

- **作用**：分析浏览器的 `userAgent` 字符串，返回一个对象，包含 `{ name, version }`。
- **输入**：`ua` 是浏览器的用户代理字符串，比如 `navigator.userAgent`。
- **输出**：一个 `BrowserInfo` 对象，比如 `{ name: 'Chrome', version: '90' }`。

#### 怎么用

```tsx
import { detectBrowser } from'react-nexlify';
const browser = detectBrowser(navigator.userAgent);
console.log(browser); // 比如：{ name: 'Chrome', version: '90' }
```

#### 它能识别啥

- Chrome、Safari、Firefox、Opera、Edge、IE 等常见浏览器。
- 特殊情况也能搞定，比如 IE 用的是 Trident 内核，会特殊处理。

### 2. `checkCompatibility({ name, version })`

- **作用**：检查浏览器版本是不是符合要求。
- **输入**：`BrowserInfo` 对象（从 `detectBrowser` 拿到的）。
- **输出**：`true`（支持）或 `false`（不支持），还会打出彩色提示。

#### 支持规则

目前支持的浏览器和最低版本写在 `browserSupportRules` 里：

```javascript
const browserSupportRules = {
  Chrome: { minVersion: 73, message: '请使用 Chrome 73 或以上版本的浏览器' },
  Firefox: { minVersion: 69, message: '请使用 Firefox 69 或以上版本的浏览器' },
};
```

- 如果浏览器不在列表里，会提示“推荐用 Chrome 73+”。
- 如果版本太低，会显示对应的警告消息。

#### 怎么用

```javascript
import React from 'react';
import {browserVersionTest} from 'react-nexlif';

checkCompatibility(); // 控制台会告诉你结果
```

### 3. `browserVersionTest()`

- **作用**：一个方便测试的函数，把上面俩功能串起来跑。
- **怎么用**：直接调用就行，结果全在控制台。

```javascript
browserVersionTest();
```

## 亮点

- **简单粗暴**：几行代码就搞定浏览器检测。
- **彩色提示**：控制台用红字（不支持）或绿字（支持），一眼就看明白。
- **灵活扩展**：想支持更多浏览器或改最低版本，直接改 `browserSupportRules` 就行。

## 注意事项

- 这工具依赖浏览器的 `navigator.userAgent`，有些用户可能会伪装 UA 字符串，识别不准。
- 目前只支持 Chrome 和 Firefox 的版本检查，其他浏览器可以加到 `browserSupportRules` 里。

## 实际场景

- **网站兼容性检查**：页面加载时跑一下，确保用户用的是支持的浏览器。
- **开发调试**：快速确认当前浏览器环境。
