
#### 开发

```bash
# 配置
1. 一键安装 .vscode 目录中推荐的插件
2. node 版本 18.x 或 20+
3. pnpm 版本 8.x 或最新版

# 安装依赖
pnpm i

# 启动服务
pnpm dev
```

## 📦️ 多环境打包

```bash
# 构建预发布环境
pnpm build:stage

# 构建正式环境
pnpm build:prod
```

## 🔧 代码检查

```bash
# 代码格式化
pnpm lint

# 单元测试
pnpm test
```

## Git 提交规范参考

- `feat` 增加新的业务功能
- `fix` 修复业务问题/BUG
- `perf` 优化性能
- `style` 更改代码风格, 不影响运行结果
- `refactor` 重构代码
- `revert` 撤销更改
- `test` 测试相关, 不涉及业务代码的更改
- `docs` 文档和注释相关
- `chore` 更新依赖/修改脚手架配置等琐事
- `workflow` 工作流改进
- `ci` 持续集成相关
- `types` 类型定义文件更改
- `wip` 开发中
