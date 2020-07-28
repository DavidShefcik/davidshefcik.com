import React, { ReactElement, ReactChild, Suspense, lazy } from "react";

import Loading from "../../layout/Loading";

const BarLoader = lazy(() => import("react-spinners/BarLoader"));

interface Props {
  title: string;
  status: string;
  growable: boolean;
  children: ReactChild;
}

export default function HomeSection({
  title,
  children,
  status,
  growable,
}: Props): ReactElement {
  return (
    <Suspense fallback={<Loading />}>
      <div
        className={`${
          growable ? "growable-home-section" : "fixed-home-section"
        } w-full flex flex-col justify-center items-center py-6 px-10`}
      >
        <p className="text-white text-2xl pb-6">{title}</p>
        {status === "loading" ? (
          <BarLoader color="white" width={150} />
        ) : status === "error" ? (
          <p className="text-xl text-red-600">
            Something happened! Please try again!
          </p>
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            {children}
          </div>
        )}
      </div>
    </Suspense>
  );
}
