"use client";
import { useState } from "react";

export default function Page() {
    const [count, setCount] = useState(0);

    const increment = (value: number) => {
        setCount(count + value);
    }
    return (
      <>
        <div>
          <h1>Sample Page</h1>
          <p>{count}</p>
          <button onClick={() => increment(1)}>Increment</button>
        </div>
      </>
    );
  }