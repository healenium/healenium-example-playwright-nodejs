# healenium-example-playwright-nodejs

## prerequisites

create `.env` in the project root, see .env.example

`HLM_API_KEY` is sent as the `hlm-api-key` handshake header. With proxy auth off it is a tenant id. With auth on it is an API key.

in the `playwright.config.js`

connection to healenium proxy (`playwright.config.js`):
```
        connectOptions: {
          wsEndpoint: process.env.PLAYWRIGHT_SERVER_URL || 'ws://localhost:8095/hlm-playwright-proxy',
          timeout: 60000,
          headers: {
            ...(process.env.HLM_API_KEY && { 'hlm-api-key': process.env.HLM_API_KEY }), // auth-false:tenantId; auth-true:apiKey
            'hlm-locator-cache': 'false', // disable locator cache for this connection
            'hlm-settings': 'h-screenshot=true',
          },
        },
```

`hlm-locator-cache` is `false`, `0`, or `no` to turn the session cache off. Any other value, or a missing header, leaves it on.

`hlm-settings` overrides proxy settings for this connection. Comma-separated `key=value` pairs. Accepted keys: `healed-type`, `score-cap`, `recovery-tries`, `np-per-selector`, `h-screenshot`, `h-highlight`, `discovery-state`, `np_shortcut`, `np-probe-timeout`.

## build

playwright version must be exact as server version 

```bash
npm install
# check version
npx playwright --version
```

## run playwright server separately (optional)

Check healenium docker-compose. 
If playwright server is not with playwright-proxy, then run it separately

```
npx -y playwright run-server --port 5050
```

## run playwright proxy with node server

[healenium-playwright-proxy](https://github.com/healenium/healenium-playwright-proxy)

connection to the proxy is configured in the `playwright.config.ts`

## run test 

```
npx playwright test tests/test-env/selenium-like-page-api/css-1.spec.ts
npx playwright test tests/test-env/selenium-like-locator-api/
npx playwright test tests/test-env/playwright-specific/

npx playwright test tests/test-env/playwright-specific/action.spec.ts
```

## docs
[Running and debugging Playwright tests](https://playwright.dev/docs/running-tests)
