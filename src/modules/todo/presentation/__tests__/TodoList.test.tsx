import { render } from "@testing-library/react";

import TodoList from "../TodoList";
describe("<TodoList />", () => {
  it("renders correctly", () => {
    render(<TodoList />);
    // expect(screen.).toBeInTheDocument();
  });
});
