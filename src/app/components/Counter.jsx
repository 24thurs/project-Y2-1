"use client";
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="text-5xl">
      <button onClick={() => setCount(count - 1)}> - </button>
      <button>{count}</button>
      <button onClick={() => setCount(count + 1)}> + </button>
    </div>
  );
};

export default Counter;
