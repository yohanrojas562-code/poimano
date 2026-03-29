#!/bin/bash
# ─────────────────────────────────────────────────────────
# poimano-ssl.sh — Issue SSL certificate for a custom domain
# Usage: sudo bash /var/www/poimano/deploy/poimano-ssl.sh example.com
# ─────────────────────────────────────────────────────────

set -euo pipefail

DOMAIN="${1:-}"

if [ -z "$DOMAIN" ]; then
    echo "Usage: $0 <domain>"
    echo "Example: $0 www.iglesialasalle.com"
    exit 1
fi

# Check if certificate already exists
if [ -d "/etc/letsencrypt/live/$DOMAIN" ]; then
    echo "Certificate for $DOMAIN already exists."
    exit 0
fi

echo "Requesting SSL certificate for: $DOMAIN"

# Use certbot with nginx plugin
certbot certonly \
    --nginx \
    --non-interactive \
    --agree-tos \
    --email admin@poimano.com \
    -d "$DOMAIN" \
    --deploy-hook "systemctl reload nginx"

if [ $? -eq 0 ]; then
    echo "SSL certificate issued successfully for $DOMAIN"

    # Create a domain-specific server block that uses the real cert
    CONF="/etc/nginx/sites-available/custom-$DOMAIN"
    cat > "$CONF" <<EOF
# Auto-generated for custom domain: $DOMAIN
server {
    listen 443 ssl;
    server_name $DOMAIN;

    root /var/www/poimano/public;
    index index.php index.html;

    charset utf-8;
    client_max_body_size 25M;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    location / {
        try_files \$uri \$uri/ /index.php?\$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php\$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME \$realpath_root\$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
EOF

    ln -sf "$CONF" "/etc/nginx/sites-enabled/custom-$DOMAIN"
    nginx -t && systemctl reload nginx
    echo "Nginx configured and reloaded for $DOMAIN"
else
    echo "Failed to issue certificate for $DOMAIN"
    exit 1
fi
