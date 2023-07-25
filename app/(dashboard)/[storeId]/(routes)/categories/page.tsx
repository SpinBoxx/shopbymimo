import prismadb from "@/lib/prismadb";
import BillboardsClient from "./components/client";
import { useParams } from "next/navigation";

import { format } from "date-fns";
import { CategoriesColumn } from "./components/columns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories page",
  description: "Page to manage categories",
};

const CategoriesPage = async ({
  params,
}: {
  params: { storeId: string; billboardId: string };
}) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoriesColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
