import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("test Button component", function () {
  test("button with text", function () {
    const button = render(<Button>test</Button>);
    expect(button).toMatchSnapshot();
  });

  test("button without text", function () {
    const button = render(<Button></Button>);
    expect(button).toMatchSnapshot();
  });

  test("button disabled", function () {
    const button = render(<Button disabled={true}></Button>);
    expect(button).toMatchSnapshot();
  });

  test("button with loader", function () {
    const button = render(<Button isLoader={true}></Button>);
    expect(button).toMatchSnapshot();
  });

  test("button onclick works", function () {
    const onClick = jest.fn()
    render(
      <Button
        onClick={() => {
          onClick;
        }}
      ></Button>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled()
  });
});
