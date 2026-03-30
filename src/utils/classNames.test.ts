import { cn } from "./classNames";

describe("cn", () => {
  test("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  test("handles conditional classes", () => {
    const condition = false;
    expect(cn("a", condition && "b")).toBe("a");
  });

  test("resolves tailwind conflicts", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });
});
