import * as React from "react";
import { useState } from "react";

export default function BottomNav() {
  const pathname = window.location.pathname;
  const [value, setValue] = useState(pathname);

  return <div></div>;
}
