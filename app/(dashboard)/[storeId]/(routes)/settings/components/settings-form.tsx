"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast"
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";

interface SettingsFormProps {
  initialData: Store; 
}

const formSchema = z.object({
  name: z.string().min(1, "Nama toko wajib diisi"),
});

type SettingsFormValues = z.infer<typeof formSchema>; 

  const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const params = useParams()
  const router = useRouter()


  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name, // Pastikan hanya atribut yang sesuai dengan `formSchema`
    },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
    //   === axios cient===
      await axios.patch(`/api/stores/${params.storeId}`, data)
      router.refresh()
      toast.success("Toko Berhasil Di Update")
      
    } catch (error) {
      toast.error("cek kembali data yang diinput")
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onConfirm={() => {}}
    />
      <div className="flex items-center justify-between">
        <Heading
          title="Settings"
          description="Atur Toko"
        />
        <Button

          variant="destructive"
          size="sm"
          onClick = {() => setOpen(true)}
          disabled={loading}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      {/* SEPARATOR UI */}
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Toko</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nama Toko"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage>
                  </FormMessage>

                </FormItem>
              )}
            />
          </div>
          <Button 
          type="submit" 
          disabled={loading}>
            Simpan
          </Button>
        </form>
      </Form>
    </>
  );
};

export { SettingsForm };
