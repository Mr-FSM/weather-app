# Weather Forecast App

一个简单的天气预报应用，使用 React + TypeScript + Vite 构建。

## 功能特点

- 支持全球城市天气查询
- 显示7天天气预报
- 响应式设计，支持移动端
- 实时天气数据更新
- 优雅的 UI 设计

## 技术栈

- React 18
- TypeScript
- Vite
- Emotion (CSS-in-JS)
- OpenMeteo API

## 开始使用

1. 克隆项目

```bash
git clone [你的仓库地址]
cd weather-app
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 构建生产版本

```bash
npm run build
```

## 项目结构

```
weather-app/
├── src/
│   ├── components/     # React 组件
│   ├── services/      # API 服务
│   ├── types/         # TypeScript 类型定义
│   ├── App.tsx        # 主应用组件
│   └── main.tsx       # 入口文件
├── public/            # 静态资源
└── index.html         # HTML 模板
```

## API

本项目使用 [OpenMeteo API](https://open-meteo.com/) 获取天气数据，无需 API key。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可

MIT License
