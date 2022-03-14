class Stack {
  top: number = -1;
  items: any = {};

  get peek() {
    return this.items[this.top];
  }

  push = (value: string) => {
    this.top += 1;
    this.items[this.top] = value;
  };

  pop = () => {
    const item = this.items[this.top];
    delete this.items[this.top];
    this.top -= 1;
    return item;
  };
}

describe("My Stack", () => {
  // initialize dummy stack
  let stack: Stack;
  // runs before each test
  beforeEach(() => {
    stack = new Stack();
  });

  it("is created empty", () => {
    // toBe tests reference match
    expect(stack.top).toBe(-1);
    // toEqual tests value equality
    expect(stack.items).toEqual({});
  });
  it("can push to the top", () => {
    stack.push("🥑");
    expect(stack.top).toBe(0);
    expect(stack.peek).toBe("🥑");
  });
  it("can pop off", () => {
    stack.push("🥑");
    expect(stack.top).toBe(0);
    stack.push("🍎");
    expect(stack.top).toBe(1);
    expect(stack.pop()).toBe("🍎");
    expect(stack.top).toBe(0);
    expect(stack.pop()).toBe("🥑");
    expect(stack.top).toBe(-1);
  });
});

export {};
