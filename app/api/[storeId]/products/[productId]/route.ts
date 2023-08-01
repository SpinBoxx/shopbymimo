import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      isArchived,
      isFeatured,
      images,
    } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name)
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    if (!price)
      return NextResponse.json(
        { message: "Price is required" },
        { status: 400 }
      );
    if (!categoryId)
      return NextResponse.json(
        { message: "Category id is required" },
        { status: 400 }
      );
    if (!sizeId)
      return NextResponse.json(
        { message: "Size id is required" },
        { status: 400 }
      );
    if (!colorId)
      return NextResponse.json(
        { message: "Color id is required" },
        { status: 400 }
      );
    if (!images || !images.length)
      return NextResponse.json(
        { message: "Images is required" },
        { status: 400 }
      );

    if (!params.storeId)
      return NextResponse.json(
        { message: "Store id is required" },
        { status: 400 }
      );

    if (!params.productId)
      return NextResponse.json(
        { message: "Product id is required" },
        { status: 400 }
      );

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isArchived,
        isFeatured,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });

    if (!params.storeId)
      return NextResponse.json(
        { message: "Store id is required" },
        { status: 400 }
      );

    if (!params.productId)
      return NextResponse.json(
        { message: "Billboard id is required" },
        { status: 400 }
      );

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

    const product = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("INternal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId)
      return NextResponse.json(
        { message: "Product id is required" },
        { status: 400 }
      );

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
