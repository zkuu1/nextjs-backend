"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banner } from "@prisma/client";
import { useState } from "react";
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
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";

interface BannerFormProps {
  initialData: Banner | null;
}

const formSchema = z.object({
  label: z.string().min(1, "Nama toko wajib diisi"),
  imageUrl: z.string().url("URL gambar tidak valid"),
});

type BannerFormValues = z.infer<typeof formSchema>;

const BannerForm: React.FC<BannerFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Banner" : "Buat Banner";
  const description = initialData ? "Edit Banner Toko" : "Buat Banner Toko";
  const action = initialData ? "Simpan" : "Buat Banner";

  const params = useParams();
  const router = useRouter();

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: initialData?.label || "",
      imageUrl: initialData?.imageUrl || "",
    },
  });

  const onSubmit = async (data: BannerFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Toko berhasil diperbarui.");
    } catch (error: any) {
      console.error("Update Error:", error.response || error.message);
      toast.error("Terjadi kesalahan. Cek kembali data yang diinput.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Toko berhasil dihapus.");
    } catch (error: any) {
      console.error("Delete Error:", error.response || error.message);
      toast.error("Terjadi kesalahan. Cek kembali data dan koneksi Anda.");
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
        loading={loading}
        onConfirm={onDelete}
      />
      <div className="container mx-auto p-4 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Heading title={title} description={description} />
          {initialData && (
             <Button
             variant="destructive"
             size="sm"
             onClick={() => setOpen(true)}
             disabled={loading}
             aria-label="Hapus Toko"
           >
             <Trash className="h-4 w-4" />
           </Button>
          )}
         
        </div>

        <Separator />

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Label Field */}
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
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>

                      {/*  ======== image upload ======= */}
                      <ImageUpload disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                      value={field.value? [field.value] : []}
                      />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

             
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
              {action}
            </Button>
          </form>
        </Form>

        <Separator />
      </div>
    </>
  );
};

export { BannerForm };
