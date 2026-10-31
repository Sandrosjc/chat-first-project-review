import { describe, expect, it } from "vitest";
import { detectLang } from "@/lib/i18n";

describe("language detection", () => {
  it("opens in Portuguese for Brazil", () => expect(detectLang("pt-BR")).toBe("pt"));
  it("opens in Spanish for Mexico", () => expect(detectLang("es-MX")).toBe("es"));
  it("falls back to English for unsupported languages", () => expect(detectLang("ru-RU")).toBe("en"));
});
