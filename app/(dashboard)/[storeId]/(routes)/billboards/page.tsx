import Heading from "@/components/ui/heading";
import BillboardsClient from "./components/client";
import { Button } from "@/components/ui/button";

const BillboardsPage = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsClient />
      </div>
    </div>
  );
};

export default BillboardsPage;
