import type { CustomLayout } from "next";
import Link from "next/link";

import { Footer } from "./Footer";
import { LayoutErrorBoundary } from "./LayoutErrorBoundary";

/**
 * @package
 */
export const DetailLayout: CustomLayout = (page) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <h1 className="p-4 text-3xl font-bold">
          <Link href="/" legacyBehavior>
            <a>ITブログ</a>
          </Link>
        </h1>
      </header>
      <main className="flex-1 bg-gray-50">
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
