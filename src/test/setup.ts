import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// The project does not enable vitest's `globals` option (test files import
// describe/it/expect explicitly), so Testing Library's built-in auto-cleanup
// — which only registers when `afterEach` exists as a global — never fires.
// Register cleanup explicitly so DOM from one test doesn't leak into the next.
afterEach(() => {
  cleanup();
});
