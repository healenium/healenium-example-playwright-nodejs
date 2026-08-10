import type { Page } from '@playwright/test';

/** Default Healenium demo page used by locator/action examples. */
export const TEST_ENV_URL = 'https://healenium.github.io/healenium-test-env/index.html';

/** MDN web-components life-cycle demo (css-1 custom-square healing). */
export const MDN_CALLBACK_URL =
  'https://mdn.github.io/web-components-examples/life-cycle-callbacks/';

/** Transient Chromium / host-network flakes (Docker Desktop, VPN, Wi‑Fi). */
const RETRYABLE_NAV_ERROR =
  /ERR_NETWORK_CHANGED|ERR_CONNECTION_|ERR_NAME_NOT_RESOLVED|ERR_INTERNET_DISCONNECTED|ERR_NETWORK_IO_SUSPENDED|ERR_ADDRESS_UNREACHABLE|ERR_TIMED_OUT/i;

/**
 * page.goto with a single retry on network flakes.
 * Non-network errors (timeouts after load, assertion failures elsewhere) are not swallowed.
 */
export async function gotoTestEnv(
  page: Page,
  url: string,
  options: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit' } = {},
): Promise<void> {
  const waitUntil = options.waitUntil ?? 'load';
  try {
    await page.goto(url, { waitUntil });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!RETRYABLE_NAV_ERROR.test(message)) {
      throw err;
    }
    await new Promise((r) => setTimeout(r, 500));
    await page.goto(url, { waitUntil });
  }
}
