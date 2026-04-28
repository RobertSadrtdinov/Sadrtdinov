import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-[#0C0C0E]/80">
          <span
            className="inline-block h-9 w-9 animate-spin rounded-full border-2 border-[#9EDBFF]/25 border-t-[#9EDBFF]"
            aria-hidden
          />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}

