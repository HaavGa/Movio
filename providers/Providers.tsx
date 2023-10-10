"use client";

import { RootState, store } from "@/redux/store";
import { Provider, useSelector } from "react-redux";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
