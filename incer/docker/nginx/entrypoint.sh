#!/bin/sh

# Diretório onde os arquivos da aplicação estão no contêiner Nginx
NGINX_ROOT_DIR=/usr/share/nginx/html
CONFIG_FILE=${NGINX_ROOT_DIR}/env.js

# Apaga o arquivo de configuração se ele existir, para garantir que estamos sempre usando as variáveis do ambiente.
rm -f ${CONFIG_FILE}
touch ${CONFIG_FILE}

# Recria o arquivo de configuração a partir das variáveis de ambiente.
# Estas variáveis são passadas para o contêiner no comando `docker run`.
echo "window.runtimeConfig = {" >> ${CONFIG_FILE}
echo "  REACT_APP_BASE_URL: \"${REACT_APP_BASE_URL}\"," >> ${CONFIG_FILE}
echo "  REACT_APP_API_URL: \"${REACT_APP_API_URL}\"," >> ${CONFIG_FILE}
echo "  REACT_APP_SUPERSET: \"${REACT_APP_SUPERSET}\"" >> ${CONFIG_FILE}
echo "};" >> ${CONFIG_FILE}

# Inicia o Nginx em foreground
exec nginx -g 'daemon off;'
