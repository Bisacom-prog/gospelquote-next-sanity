import { createClient } from '@sanity/client';

type Fetcher = {
  fetch: <T>(query: string, params?: Record<string, unknown>, options?: Record<string, unknown>) => Promise<T>;
};

function buildConfig() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

  if (!projectId || !dataset || !apiVersion) return null;

  return {
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === 'production'
  };
}

const config = buildConfig();

/**
 * Sanity client used by the Next.js app.
 *
 * If env vars are missing (common on first-time local setups), we return a safe client
 * whose `fetch` resolves to an empty result so pages can still render fallback UI.
 */
export const client: Fetcher = config
  ? (createClient(config) as unknown as Fetcher)
  : ({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      fetch: async <T>(_query: string, _params?: Record<string, unknown>) => {
        return ([] as unknown) as T;
      }
    } as Fetcher);
