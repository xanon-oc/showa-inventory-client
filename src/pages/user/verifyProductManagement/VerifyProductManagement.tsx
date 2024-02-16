/* eslint-disable @typescript-eslint/no-explicit-any */
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useVerifyProductAuthenticityQuery } from "../../../redux/features/user/userServices.api";
import ProductDetails from "./ProductDetails";
import { toast } from "sonner";

const VerifyProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);

  const verifyResult = useVerifyProductAuthenticityQuery(searchTerm, {
    skip: !triggerFetch || !searchTerm,
  });

  const result: any | undefined = verifyResult?.currentData;

  if (verifyResult?.currentData?.message) {
    toast.success(verifyResult.currentData.message);
  }
  if ((verifyResult?.error as any)?.data?.errorMessage) {
    toast.error((verifyResult?.error as any)?.data?.errorMessage);
  }

  const onSearch = (value: string): void => {
    const trimmedValue = value.trim();
    setSearchTerm(trimmedValue);
    setTriggerFetch(true);
  };

  return (
    <div>
      <section className="bg-white rounded-lg h-[95vh]">
        <div className="p-8 md:p-12 lg:px-16 lg:py-5">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Verify your product Authenticity
            </h2>

            <p className="hidden text-gray-500 sm:mt-4 sm:block">
              Verify product authenticity instantly! Enter your unique ID in the
              search bar to confirm legitimacy. Shop with confidence knowing
              your items are genuine.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
            <Search
              placeholder="input Serial number of the product you want to verify"
              allowClear
              enterButton="VERIFY"
              size="large"
              onSearch={onSearch}
              style={{
                backgroundColor: "#EC2828",
                color: "white",
                borderRadius: "7px",
              }}
            />
          </div>
        </div>
        {result?.success === true && <ProductDetails verifyResult={result} />}
      </section>
    </div>
  );
};

export default VerifyProductManagement;
