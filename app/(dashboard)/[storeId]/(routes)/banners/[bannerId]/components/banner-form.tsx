"use client";

import * as z from "zod";
import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Banner } from "@prisma/client";
import { Trash } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";

interface BannerFormProps {
  initialData: Banner | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BannerFormValues = z.infer<typeof formSchema>;

export const BannerForm: React.FC<BannerFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Banner" : "Buat Banner";
  const description = initialData ? "Edit Banner Toko" : "Buat Banner Toko";
  const toastMessage = initialData
    ? "Banner berhasil di edit"
    : "Banner berhasil dibuat";
  const action = initialData ? "Simpan Banner" : "Buat Banner";

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BannerFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/banners/${params.bannerId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/banners`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/banners`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Cek kembali data yang diinput");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/banners/${params.bannerId}`);
      router.refresh();
      router.push(`/${params.storeId}/banners`);
      toast.success("Banner berhasil dihapus");
    } catch (error) {
      toast.error("Cek kembali data dan koneksi mu");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1">
          <Heading title={title} description={description} />
        </div>
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Label Banner"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                      value={field.value ? [field.value] : []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            type="submit"
            className="mt-4 w-full"
          >
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};