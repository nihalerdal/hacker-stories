import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect method with a specific matcher
expect.extend(matchers);

afterEach(() => {
  cleanup();
});





