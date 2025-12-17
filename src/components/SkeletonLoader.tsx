const SkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content skeleton */}
            <div className="text-left">
              {/* Badge skeleton */}
              <div className="inline-flex items-center bg-white/60 px-6 py-3 rounded-full mb-8 w-64 h-10"></div>

              {/* Heading skeleton */}
              <div className="space-y-4 mb-6">
                <div className="h-16 bg-primary-200/50 rounded-lg w-3/4"></div>
                <div className="h-16 bg-primary-200/50 rounded-lg w-full"></div>
              </div>

              {/* Description skeleton */}
              <div className="space-y-3 mb-10">
                <div className="h-6 bg-primary-100/50 rounded w-full"></div>
                <div className="h-6 bg-primary-100/50 rounded w-5/6"></div>
              </div>

              {/* Buttons skeleton */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="h-14 bg-primary-300/50 rounded-full w-full sm:w-64"></div>
                <div className="h-14 bg-white/50 rounded-full w-full sm:w-48"></div>
              </div>

              {/* Small text skeleton */}
              <div className="h-4 bg-primary-100/50 rounded w-48"></div>
            </div>

            {/* Right side - Card skeleton */}
            <div className="relative h-96 flex items-center justify-center">
              <div className="w-full max-w-[525px] h-[200px] sm:h-[250px] md:h-[300px] bg-white/60 rounded-2xl shadow-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section Skeleton */}
      <section className="relative py-32 bg-primary-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header skeleton */}
          <div className="text-center mb-20">
            <div className="w-20 h-20 bg-primary-200/50 rounded-full mx-auto mb-8"></div>
            <div className="h-12 bg-primary-200/50 rounded-lg w-2/3 mx-auto mb-4"></div>
            <div className="h-10 bg-primary-100/50 rounded-lg w-1/2 mx-auto"></div>
          </div>

          {/* Benefits grid skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-20 max-w-5xl mx-auto">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-primary-200/50 rounded-full mx-auto mb-6"></div>
                <div className="h-6 bg-primary-100/50 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-primary-100/50 rounded w-full mx-auto"></div>
              </div>
            ))}
          </div>

          {/* Description skeleton */}
          <div className="max-w-6xl mx-auto text-center pb-16">
            <div className="h-8 bg-primary-200/50 rounded-lg w-1/2 mx-auto mb-6"></div>
            <div className="space-y-3">
              <div className="h-6 bg-primary-100/50 rounded w-full mx-auto"></div>
              <div className="h-6 bg-primary-100/50 rounded w-5/6 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Cards Section Skeleton */}
      <section className="relative py-32 bg-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header skeleton */}
          <div className="text-center mb-16">
            <div className="h-10 bg-primary-200/50 rounded-lg w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-primary-100/50 rounded w-1/2 mx-auto"></div>
          </div>

          {/* Product cards grid skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-primary-100/30 rounded-3xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="h-4 bg-primary-200/50 rounded w-1/2 mx-auto mb-2"></div>
                  <div className="h-6 bg-primary-200/50 rounded w-3/4 mx-auto mb-6"></div>
                  <div className="w-32 h-32 bg-white/50 rounded-full mx-auto mb-8"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-primary-100/50 rounded w-full"></div>
                    <div className="h-4 bg-primary-100/50 rounded w-5/6 mx-auto"></div>
                  </div>
                  <div className="h-12 bg-primary-300/50 rounded-full w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section Skeleton */}
      <section className="relative py-32 bg-primary-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-10 bg-primary-200/50 rounded-lg w-1/3 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white/60 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-200/50 mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-primary-100/50 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-primary-100/50 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-primary-100/50 rounded w-full"></div>
                  <div className="h-4 bg-primary-100/50 rounded w-5/6"></div>
                  <div className="h-4 bg-primary-100/50 rounded w-4/5"></div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-yellow-200/50 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkeletonLoader;

