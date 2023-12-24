import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";
import emojiList from "./emojiList";


describe("All Tests", () => {

  beforeEach(() => {
    render(<App />);
  });

  test("Header - renders without crashing", () => {
    const header = screen.getByText("Emoji Search");
    expect(header).toBeInTheDocument();
  });

  test("Emoji list rendered successfully", () => {
    emojiList.slice(0, 20).forEach(emoji => {
      const titleOfEmoji = emoji.title;
      const elementOfEmoji = screen.getByText(titleOfEmoji);
      expect(elementOfEmoji).toBeInTheDocument();
    });
  });

  test("Emoji list changed according to search parameter", () => {
    const searchInput = screen.getByRole("textbox");
    const searchParameter = "grin";

    const searchedList = emojiList.filter(emoji => {
      return (
        emoji.title.toLowerCase().includes(searchParameter.toLowerCase()) ||
        emoji.keywords.toLowerCase().includes(searchParameter.toLowerCase())
      );
    });

    fireEvent.change(searchInput, { target: { value: searchParameter } });

    searchedList.slice(0, 20).forEach(emoji => {
      const titleOfEmoji = emoji.title;
      const elementOfEmoji = screen.getByText(titleOfEmoji);
      expect(elementOfEmoji).toBeInTheDocument();
    });
  });

  test("Clicked emoji should be copied", async () => {
    const emojiSymbol = "😀";
    const emojiTitle = "Grinning";
    const emoji = screen.getByText(emojiTitle);
    fireEvent.click(emoji.parentElement);
    const copiedText = window.getSelection().toString();
    expect(copiedText === emojiSymbol);
  });
});
