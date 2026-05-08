import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import UserRecommendations from "../components/UserRecommendations";

// Mock the sanitization util so tests are deterministic and don't depend
// on the real auth/privacy logic.
jest.mock("@/utils/secureUserRecommendations", () => ({
  sanitizeBehaviorData: jest.fn(),
}));

import { sanitizeBehaviorData } from "@/utils/secureUserRecommendations";

const mockedSanitize = sanitizeBehaviorData as jest.Mock;

// Default sanitized payload used by most tests. Individual tests can
// override this via mockedSanitize.mockReturnValue(...).
const DEFAULT_SAFE_DATA = {
  pastSearchCount: 4,
  comparedProductCount: 2,
  budgetLevel: "low" as const,
};

describe("UserRecommendations", () => {
  beforeEach(() => {
    mockedSanitize.mockReset();
    mockedSanitize.mockReturnValue(DEFAULT_SAFE_DATA);
  });

  // ---------- Budget input ----------

  it("seeds the budget from the sanitized budget level", () => {
    // budgetLevel "low" maps to "75" in the lazy state initializer.
    const { getByPlaceholderText } = render(<UserRecommendations />);
    expect(getByPlaceholderText("Enter weekly budget").props.value).toBe("75");
  });

  it("accepts numeric budget input", () => {
    const { getByPlaceholderText } = render(<UserRecommendations />);
    const input = getByPlaceholderText("Enter weekly budget");
    fireEvent.changeText(input, "100");
    expect(input.props.value).toBe("100");
  });

  it("rejects non-numeric budget input", () => {
    // The handler's regex (^\d{0,6}$) blocks letters; value should stay put.
    const { getByPlaceholderText } = render(<UserRecommendations />);
    const input = getByPlaceholderText("Enter weekly budget");
    const before = input.props.value;
    fireEvent.changeText(input, "abc");
    expect(input.props.value).toBe(before);
  });

  // ---------- Sanitization gate ----------

  it("renders an error message when sanitization fails", () => {
    // Override the default mock for just this test.
    mockedSanitize.mockReturnValue({
      error: "Unauthorized access to recommendation data",
    });
    const { getByText, queryByPlaceholderText } = render(<UserRecommendations />);
    expect(getByText("Unauthorized access to recommendation data")).toBeTruthy();
    // Interactive UI must NOT render on the error path.
    expect(queryByPlaceholderText("Enter weekly budget")).toBeNull();
  });

  // ---------- Rule engine output ----------

  it("renders rule-driven recommendations from the default behavior", () => {
    const { getByText } = render(<UserRecommendations />);
    expect(getByText("Essentials First")).toBeTruthy();
    expect(getByText("Weekly Grocery Savings")).toBeTruthy();
  });

  it("hides the tight-budget tip once budget exceeds its cap", () => {
    // "Essentials First" has maxBudget=75 — raising the budget should hide it.
    const { getByPlaceholderText, queryByText } = render(<UserRecommendations />);
    fireEvent.changeText(getByPlaceholderText("Enter weekly budget"), "200");
    expect(queryByText("Essentials First")).toBeNull();
  });

  // ---------- Category filter ----------

  it("filters cards down to the selected category", () => {
    const { getAllByText, getByText, queryByText } = render(<UserRecommendations />);
    // Index 0 is the filter pill (rendered before any card category labels).
    fireEvent.press(getAllByText("Produce")[0]);
    expect(getByText("Fresh Produce Savings")).toBeTruthy();
    expect(queryByText("Staple Price Watch")).toBeNull();
  });

  // ---------- Save / dismiss ----------

  it("saves a recommendation and updates the counter", () => {
    const { getAllByText, getByText } = render(<UserRecommendations />);
    fireEvent.press(getAllByText("Save")[0]);
    expect(getByText("Saved recommendations: 1")).toBeTruthy();
  });

  it("dismisses a card and offers a Restore button", () => {
    const { getAllByText, getByText } = render(<UserRecommendations />);
    const before = getAllByText("Dismiss").length;
    fireEvent.press(getAllByText("Dismiss")[0]);
    expect(getAllByText("Dismiss").length).toBe(before - 1);
    expect(getByText(/Restore 1 Dismissed/)).toBeTruthy();
  });
});