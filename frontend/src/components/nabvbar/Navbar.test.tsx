import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar component", () => {
  test("renders Navbar with correct content", () => {
    render(<Navbar />);
    expect(screen.getByText("Blockchain Explorer")).toBeInTheDocument();
    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  test("applies correct class names", () => {
    render(<Navbar />);
    const navbarElement = screen.getByRole("navigation");
    expect(navbarElement).toHaveClass("bg-gray-900 p-4");

    const logoImage = screen.getByAltText("logo");
    expect(logoImage).toHaveClass("w-10");
  });
});
