# Hexo 博客部署配置说明

## 服务器部署步骤

### 1. 创建服务器后
- 选择 Ubuntu 22.04 系统
- 获取服务器 IP 地址和 root 密码

### 2. 运行服务器初始化脚本
```bash
# SSH 登录服务器
ssh root@YOUR_SERVER_IP

# 上传并运行初始化脚本
scp deploy/server-setup.sh root@YOUR_SERVER_IP:/root/
ssh root@YOUR_SERVER_IP
bash /root/server-setup.sh
```

### 3. 本地配置部署
在 `_config.yml` 末尾添加：
```yaml
deploy:
  type: git
  repo: git@YOUR_SERVER_IP:/home/git/hexo.git
  branch: master
```

### 4. 安装部署插件
```bash
npm install hexo-deployer-git
```

### 5. 部署博客
```bash
hexo clean && hexo generate && hexo deploy
```

## 本地开发命令

```bash
# 启动本地服务器预览
hexo server

# 生成静态文件
hexo generate

# 新建文章
hexo new "文章标题"

# 清理缓存
hexo clean
```

## 注意事项
- 将 YOUR_SERVER_IP 替换为实际服务器 IP
- 首次部署需要配置 SSH 密钥
- 建议后续配置 HTTPS（Let's Encrypt）
