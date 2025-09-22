interface RuntimeConfig {
  REACT_APP_BASE_URL: string;
  REACT_APP_API_URL: string;
  REACT_APP_SUPERSET: string;
}

declare global {
  interface Window {
    runtimeConfig?: RuntimeConfig;
  }
}

const config: RuntimeConfig = {
  // Em produção, estes valores são injetados pelo `entrypoint.sh` através do `env.js`
  ...window.runtimeConfig,

  // Em desenvolvimento, usamos os valores do arquivo .env como fallback
  REACT_APP_BASE_URL: window.runtimeConfig?.REACT_APP_BASE_URL || process.env.REACT_APP_BASE_URL || '',
  REACT_APP_API_URL: window.runtimeConfig?.REACT_APP_API_URL || process.env.REACT_APP_API_URL || '',
  REACT_APP_SUPERSET: window.runtimeConfig?.REACT_APP_SUPERSET || process.env.REACT_APP_SUPERSET || '',
};

export default config;
