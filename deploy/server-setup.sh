#!/bin/bash

# 服务器初始化脚本
# 用于在 Ubuntu 22.04 上配置 Hexo 博客部署环境

echo "开始初始化服务器环境..."

# 更新系统
apt update && apt upgrade -y

# 安装 Nginx
apt install -y nginx
systemctl enable nginx
systemctl start nginx

# 安装 Git
apt install -y git

# 安装 Node.js (使用 NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 创建博客目录
mkdir -p /var/www/hexo
chown -R www-data:www-data /var/www/hexo

# 创建 Git 仓库用于接收部署
useradd -m -s /bin/bash git
mkdir -p /home/git/hexo.git
cd /home/git/hexo.git
git init --bare

# 创建 git hooks
cat > /home/git/hexo.git/hooks/post-receive << 'EOF'
#!/bin/bash
GIT_REPO=/home/git/hexo.git
PUBLIC_WWW=/var/www/hexo

rm -rf ${PUBLIC_WWW}/*
git --work-tree=${PUBLIC_WWW} --git-dir=${GIT_REPO} checkout -f
EOF

chmod +x /home/git/hexo.git/hooks/post-receive
chown -R git:git /home/git/hexo.git

# 配置 Nginx
cat > /etc/nginx/sites-available/hexo << 'EOF'
server {
    listen 80;
    server_name _;  # 替换为你的域名或IP

    root /var/www/hexo;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# 启用站点
ln -sf /etc/nginx/sites-available/hexo /etc/nginx/sites-enabled/hexo
rm -f /etc/nginx/sites-enabled/default

# 测试并重启 Nginx
nginx -t
systemctl restart nginx

echo "服务器初始化完成！"
echo ""
echo "部署地址: git@YOUR_SERVER_IP:/home/git/hexo.git"
echo "博客访问地址: http://YOUR_SERVER_IP"
