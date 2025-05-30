import { ReactNode, Suspense } from "react";

type SuspenseProps = {
  children: ReactNode;
};

export const Loading = () => {
  return <h1>loading...</h1>;
};

export const CustomSuspense = ({ children }: SuspenseProps) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};
