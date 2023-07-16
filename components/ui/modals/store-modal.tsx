"use client";

import React, { useState } from "react";
import { Modal } from "../modal";
import { useStoreModal } from "@/hooks/use-store-modals";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../input";
import { Button } from "../button";
import { addStore } from "@/app/actions/stores";
import { toast } from "react-hot-toast";
import FormButton from "../form-button";
import Spinner from "../spinner";
import { redirect } from "next/navigation";

function StoreModal() {
  const StoreModal = useStoreModal();
  const formSchema = z.object({
    name: z.string().min(1),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await fetch("/api/stores", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      window.location.assign(`${data.id}`);
      toast.success("Store created.");
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create a new store"
      description="Add a new store to manage products and categories"
      isOpen={StoreModal.isOpen}
      onClose={StoreModal.onClose}
    >
      <div>
        <div className="flex flex-col py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="E-commerce"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="pt-6 space-x-2 flex items-center">
                <Button
                  type="button"
                  disabled={loading}
                  variant={"outline"}
                  onClick={StoreModal.onClose}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? <Spinner /> : "Create "}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

export default StoreModal;
