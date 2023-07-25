"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoriesColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import AlertModal from "@/components/ui/modals/alert-modal";

interface Props {
  data: CategoriesColumn;
}

export const CellAction = ({ data }: Props) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Category id copied to the clipboard.");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/${params.storeId}/categories/${data.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        toast.error(response.statusText);
      } else {
        router.refresh();
        toast.success("Category deleted.");
      }
    } catch (error) {
      toast.error(
        "Make sure you removed all products using this category first."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        loading={loading}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => onCopy(data.id)}
            className="hover:cursor-pointer"
          >
            <Copy className="mr-2 w-4 h-4" />
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() =>
              router.push(`/${params.storeId}/categories/${data.id}`)
            }
          >
            <Edit className="mr-2 w-4 h-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
