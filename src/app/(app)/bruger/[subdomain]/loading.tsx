// @ts-ignore
const Skeleton = ({ className }) => (
    <div aria-live="polite" aria-busy="true" className={className}>
    <span className="inline-flex w-full animate-pulse select-none rounded-md bg-gray-300 leading-none">
      ‌
    </span>
        <br />
    </div>
)

// @ts-ignore
const SVGSkeleton = ({ className }) => (
    <svg
        className={
            className + " animate-pulse rounded bg-gray-300"
        }
    />
)

const LoadingSkeleton = () => (
    <>
        <div className="w-full relative">
            <div className="w-full h-screen overflow-y-auto">
                <div className="min-h-screen">
                    <div className="z-100 border-b border-t mb-4 backdrop-blur-sm w-full flex top-0 flex-row justify-between py-4 px-8">
                        <div>
                            <h1 className="mb-1 mt-5">
                                <Skeleton className="w-[112px] max-w-full" />
                            </h1>
                            <p>
                                <Skeleton className="w-[152px] max-w-full" />
                            </p>
                        </div>
                        <div className="justify-center items-center flex flex-col">
                            <div className="tracking-wide from-blue-100 border border-transparent px-4 py-1 shadow-sm">
                <span className="w-full">
                  <Skeleton className="w-[104px] max-w-full" />
                </span>
                            </div>
                        </div>
                    </div>
                    <div className="items-center justify-center w-full">
                        <div className="grid md:grid-cols-3 gap-4 p-4 mx-4 md:mx-0 pb-24 md:pb-0">
                            <div className="shadow-xs md:col-span-2 w-full p-4 pb-6 border max-h-[80vh] md:max-h-[60vh] overflow-y-hidden">
                <span>
                  <Skeleton className="w-[64px] max-w-full" />
                </span>
                                <div className="flex flex-col h-full w-full">
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                        <div>
                                            <Skeleton className="w-[120px] max-w-full" />
                                        </div>
                                        <div className="space-y-1"></div>
                                    </div>
                                    <form className="flex w-full gap-2 border-t border-border p-4">
                                        <div className="border py-2 px-4 border-gray-400/24 focus:border-blue-600 w-full">
                                            <Skeleton className="w-[144px] max-w-full" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="w-full md:grid md:grid-rows-3 space-y-4">
                                <div className="shadow-xs w-full p-4 border md:row-span-2">
                                    <h2 className="mb-1">
                                        <Skeleton className="w-[136px] max-w-full" />
                                    </h2>
                                    <div className="mt-3 space-y-2">
                                        <p className="flex flex-row items-center">
                                            <SVGSkeleton className="w-[20px] h-[20px]" />
                                            <span className="ml-2">
                        <Skeleton className="w-[48px] max-w-full" />
                      </span>
                                        </p>
                                        <p className="flex flex-row items-center">
                                            <SVGSkeleton className="w-[20px] h-[20px]" />
                                            <span className="ml-2">
                        <Skeleton className="w-[224px] max-w-full" />
                      </span>
                                        </p>
                                        <p className="flex flex-row items-center">
                                            <SVGSkeleton className="w-[20px] h-[20px]" />
                                            <span className="ml-2">
                        <Skeleton className="w-[160px] max-w-full" />
                      </span>
                                        </p>
                                        <p className="flex flex-row items-center">
                                            <SVGSkeleton className="w-[20px] h-[20px]" />
                                            <span className="ml-2">
                        <Skeleton className="w-[64px] max-w-full" />
                      </span>
                                        </p>
                                        <p className="flex flex-row items-center">
                                            <SVGSkeleton className="w-[20px] h-[20px]" />
                                            <span className="ml-2">
                        <Skeleton className="w-[152px] max-w-full" />
                      </span>
                                        </p>
                                        <p className="flex flex-row items-center">
                                            <SVGSkeleton className="w-[20px] h-[20px]" />
                                            <span className="ml-2">
                        <Skeleton className="w-[96px] max-w-full" />
                      </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="shadow-xs w-full p-4 border">
                                    <h2 className="mb-1">
                                        <Skeleton className="w-[104px] max-w-full" />
                                    </h2>
                                    <div className="mt-3 space-y-2">
                                        <div className="relative h-2 w-full">
                                            <div className="h-full w-full flex-1"></div>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p>
                                                <Skeleton className="w-[152px] max-w-full" />
                                            </p>
                                            <p>
                                                <Skeleton className="w-[168px] max-w-full" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script></script>
        <script>
            <Skeleton className="w-[3952px] max-w-full" />
        </script>
        <script>
            <Skeleton className="w-[128px] max-w-full" />
        </script>
        <script>
            <Skeleton className="w-[344px] max-w-full" />
        </script>
        <script>
            <Skeleton className="w-[11720px] max-w-full" />
        </script>
        <script>
            <Skeleton className="w-[54248px] max-w-full" />
        </script>
        <script>
            <Skeleton className="w-[2784px] max-w-full" />
        </script>
        <script>
            <Skeleton className="w-[19936px] max-w-full" />
        </script>
        <script>
            <Skeleton className="w-[816px] max-w-full" />
        </script>
        <script>
            <Skeleton className="w-[7640px] max-w-full" />
        </script>
    </>
);

const LoadingScreen = () => (
    <div className="flex justify-center w-full h-full p-10">
        <LoadingSkeleton />
    </div>
);

export default LoadingScreen;