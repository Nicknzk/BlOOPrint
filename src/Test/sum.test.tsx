import sum from "../Component/sum";

test("properly add two numbers", () => {
  expect(sum(1, 2)).toBe(3);
});
