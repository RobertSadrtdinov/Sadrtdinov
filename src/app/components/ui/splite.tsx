import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full min-h-[200px] flex items-center justify-center bg-[#0C0C0E]/80">
          <div
            className="h-9 w-9 rounded-full border-2 border-[#C9A96E]/25 border-t-[#C9A96E] animate-spin"
            aria-hidden
          />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
