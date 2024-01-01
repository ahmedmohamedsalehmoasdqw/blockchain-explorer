import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  test("renders Footer with correct content", () => {
    render(<Footer />);
    expect(
      screen.getByText("© 2024 SAGA. All rights reserved.")
    ).toBeInTheDocument();
  });

  test("applies correct class names", () => {
    render(<Footer />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toHaveClass(
      "bg-gray-900 p-4 text-white text-center fixed bottom-0 w-full"
    );
    const paragraphElement = screen.getByText(
      "© 2024 SAGA. All rights reserved."
    );
    expect(paragraphElement).toHaveClass("text-white font-medium");
  });
});
