import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";

vi.mock("next/image", () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    const { alt, src, ...rest } = props;
    const safeProps = { ...rest } as Record<string, unknown>;
    delete safeProps.fill;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt ?? ""} src={typeof src === "string" ? src : ""} {...safeProps} />;
  },
}));

afterEach(() => {
  cleanup();
  localStorage.clear();
});
