# healenium-example-playwright-nodejs

## prerequisites

in the `playwright.config.ts`

connection to healenium proxy:
```
        connectOptions: {
          // wsEndpoint: process.env.PLAYWRIGHT_SERVER_URL || 'ws://localhost:5050',
          wsEndpoint: process.env.PLAYWRIGHT_SERVER_URL || 'ws://localhost:8080/playwright-proxy',
          timeout: 600000,            // 60 seconds for WebSocket connection timeout
        },
```

## build
```
npm install
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
```

## docs
[Running and debugging Playwright tests](https://playwright.dev/docs/running-tests)
