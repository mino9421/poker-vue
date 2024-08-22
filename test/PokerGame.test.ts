// tests/evaluateHand.test.ts
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Game from "../components/Game.vue"; // Adjust the path if needed

describe("Game.vue - evaluateHand", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Game, {
      global: {
        mocks: {
          $getCardImage: () => "", // Mock image URL if needed
        },
      },
    });
  });

  // Helper function to get the result of evaluateHand
  const getHandRank = (cards: string[]) => {
    // Access the component instance directly from wrapper.vm
    return wrapper.vm.evaluateHand(cards);
  };

  it("should correctly evaluate a Straight Flush", () => {
    const cards = ["spades_10", "spades_J", "spades_Q", "spades_K", "spades_A"];
    const result = getHandRank(cards);
    expect(result.hand).toBe("Royal Flush");
  });

  it("should correctly evaluate a Straight Flush", () => {
    const cards = ["spades_5", "spades_6", "spades_7", "spades_8", "spades_9"];
    const result = getHandRank(cards);
    expect(result.hand).toBe("Straight Flush");
  });

  it("should correctly evaluate a Four of a Kind", () => {
    const cards = ["hearts_5", "clubs_5", "diamonds_5", "spades_5", "hearts_K"];
    const result = getHandRank(cards);
    expect(result.hand).toBe("Four of a Kind");
  });

  it("should correctly evaluate a Full House", () => {
    const cards = ["hearts_4", "clubs_4", "diamonds_4", "spades_9", "hearts_9"];
    const result = getHandRank(cards);
    expect(result.hand).toBe("Full House");
  });

  it("should correctly evaluate a Flush", () => {
    const cards = ["hearts_2", "hearts_5", "hearts_8", "hearts_J", "hearts_Q"];
    const result = getHandRank(cards);
    expect(result.hand).toBe("Flush");
  });

  it("should correctly evaluate a Straight", () => {
    const cards = [
      "diamonds_4",
      "hearts_5",
      "clubs_6",
      "spades_7",
      "diamonds_8",
    ];
    const result = getHandRank(cards);
    expect(result.hand).toBe("Straight");
  });

  it("should correctly evaluate a Three of a Kind", () => {
    const cards = ["hearts_7", "clubs_7", "diamonds_7", "spades_2", "hearts_4"];
    const result = getHandRank(cards);
    expect(result.hand).toBe("Three of a Kind");
  });

  it("should correctly evaluate Two Pair", () => {
    const cards = ["hearts_6", "clubs_6", "diamonds_9", "spades_9", "hearts_2"];
    const result = getHandRank(cards);
    expect(result.hand).toBe("Two Pair");
  });

  it("should correctly evaluate One Pair", () => {
    const cards = ["hearts_3", "clubs_3", "diamonds_5", "spades_7", "hearts_K"];
    const result = getHandRank(cards);
    expect(result.hand).toBe("One Pair");
  });

  it("should correctly evaluate a High Card", () => {
    const cards = ["hearts_2", "clubs_4", "diamonds_7", "spades_9", "hearts_K"];
    const result = getHandRank(cards);
    expect(result.hand).toBe("High Card");
  });
});
