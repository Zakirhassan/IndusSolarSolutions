import { defineConfig } from "vitest/config";
import { configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    // Exclude nested git worktrees (.worktrees/*) so their own copies of the
    // test suite aren't picked up alongside this checkout's — otherwise a
    // stale worktree's tests fail here for reasons unrelated to this code.
    exclude: [...configDefaults.exclude, "**/.worktrees/**"],
  },
});
