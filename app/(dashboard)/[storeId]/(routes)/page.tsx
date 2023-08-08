import { getGraphRevenue } from "@/actions/get-graph-revenu";
import { getProductInStock } from "@/actions/get-product-in-stock";
import { getSalesCount } from "@/actions/get-sales-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { CreditCard, EuroIcon, Package } from "lucide-react";
import { redirect } from "next/navigation";
import { FC } from "react";

interface Props {
  params: { storeId: string };
}

const DashBoardPage: FC<Props> = async ({ params }) => {
  console.log(params);

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) redirect("/");
  const totalRevenu = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getProductInStock(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-2">
              <CardTitle className="text-sm font-medium">
                Total revenue
              </CardTitle>
              <EuroIcon className="w-6 h-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenu)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="w-6 h-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-2">
              <CardTitle className="text-sm font-medium">
                Products in stock
              </CardTitle>
              <Package className="w-6 h-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashBoardPage;
