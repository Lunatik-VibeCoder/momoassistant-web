import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

import "@testing-library/jest-dom/vitest";

// @testing-library/react's auto-cleanup only self-registers when it detects
// Jest's global afterEach; this project doesn't set vitest's `globals: true`
// (deliberately -- explicit imports elsewhere), so it's wired manually here
// instead. Without this, DOM from one test's render() leaks into the next.
afterEach(() => {
  cleanup();
});
