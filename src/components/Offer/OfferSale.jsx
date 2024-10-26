import React, { lazy, Suspense } from "react";

const OfferSaleModel = lazy(() =>
  import("../../three/ModelViewer/OfferSaleModel")
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-[60vh] w-full">
    <div className="animate-pulse text-lg text-gray-600">
      Loading 3D Model...
    </div>
  </div>
);

const OfferSale = () => {
  return (
    <div className="relative">
      <Suspense fallback={<LoadingFallback />}>
        <OfferSaleModel />
      </Suspense>
    </div>
  );
};

export default OfferSale;
