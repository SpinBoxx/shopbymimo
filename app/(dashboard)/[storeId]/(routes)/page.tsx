import prismadb from "@/lib/prismadb";
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

  return <div>Storepage : {store.name}</div>;
};

export default DashBoardPage;
