import { BrowserRouter } from "react-router-dom";
import { StringComponent } from "./string";
import { render, screen, fireEvent, waitFor, getByTestId, findAllByTestId } from "@testing-library/react";

describe("string reverse test", () => {
  test("разворот нечетной строки", async () => {
    //     render(
    //       <BrowserRouter>
    //         <StringComponent />
    //       </BrowserRouter>
    //     )

    //     const input = screen.getByTestId('input');
    //     const btn = screen.getByTestId("reverseBtn");
    //    const circles = screen.findAllByTestId("circle")

    //     fireEvent.input(input, {
    //       target: { value: "abc" }
    //     });
    //     fireEvent.click(btn);
    //     await waitFor(() => {}, {timeout: 1000})
    //     expect(circles.textContent).toEqual('cba')

    const { container } = render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );

    const input = getByTestId(container, 'input')
    const button = getByTestId(container, 'reverseBtn')
    const circles = findAllByTestId(container, 'circle')

    fireEvent.input(input, {
        targer: {value: 'abc'}
    })
    fireEvent.click(button)

    await waitFor(() => {expect(circles).toBe('cba')}, {timeout: 1000})
  });
});
