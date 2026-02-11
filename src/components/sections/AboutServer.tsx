import { getPortfolio } from '@/lib/data';
import AboutClient from './About';

/**
 * Server Component wrapper for About section
 * Fetches data from Hygraph (or fallback) and passes to client component
 */
export default async function AboutServer() {
  const portfolio = await getPortfolio();

  return <AboutClient portfolio={portfolio} />;
}
