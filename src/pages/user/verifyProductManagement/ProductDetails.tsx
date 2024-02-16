/* eslint-disable @typescript-eslint/no-explicit-any */
import VerifiedBadge from "../../../components/ui/VerifiedBadge";

const ProductDetails = ({ verifyResult }: any) => {
  const { data } = verifyResult;
  return (
    <div>
      <div className="max-w-4xl px-4 py-4 mx-auto lg:py-8 md:px-6">
        <div className="flex flex-wrap ">
          <div className="w-full px-4 md:w-1/2 ">
            <div className="sticky top-0 z-50 overflow-hidden ">
              <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                <img
                  src={data?.imageUrl}
                  alt=""
                  className="w-[50vh] lg:h-[50vh] rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 ">
            <div className="lg:pl-20">
              <div className="mb-8 ">
                <VerifiedBadge />
                <h2 className="max-w-xl mt-2 mb-2 text-2xl font-bold  md:text-2xl">
                  {data?.name}
                </h2>
                <h2 className="mb-6 text-xl font-bold"> {data?.brand}</h2>

                <p className="inline-block mb-3 text-4xl font-bold">
                  <span>${data?.price}</span>
                </p>
                <p className="text-green-600 dark:text-green-300 ">
                  {data?.quantity} in stock
                </p>
              </div>
              <div className="flex items-center mb-3">
                <h2 className="w-16 mr-6 text-xl font-bold">Colors:</h2>
                <div className="flex flex-wrap -mx-2 -mb-2">
                  {data?.color === "Blue" && (
                    <button className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                      <div className="w-6 h-6 bg-cyan-300"></div>
                    </button>
                  )}
                  {data?.color === "Green" && (
                    <button className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                      <div className="w-6 h-6 bg-green-300 "></div>
                    </button>
                  )}
                  {data?.color === "Red" && (
                    <button className="p-1 mb-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                      <div className="w-6 h-6 bg-red-200 "></div>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center mb-8">
                <h2 className="w-16 text-xl font-bold">Size: {data?.size} </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
