import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import type { TResponse } from "@/interface/globalInterface";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import {
  useAddFaviconMutation,
  useGetFaviconQuery,
  useUpdateFaviconMutation,
} from "@/redux/features/favicon/faviconApi";

export default function Favicon() {
  const [image, setImage] = useState<File | null>(null);
  const form = useForm();

  const { data } = useGetFaviconQuery({});
  const favicon = data?.data;
  const id = favicon?._id;

  const [addFavicon, { isLoading: aLoading }] = useAddFaviconMutation();
  const [updateFavicon, { isLoading: uLoading }] = useUpdateFaviconMutation();

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    const formData = new FormData();
    formData.append("image", image as Blob);

    if (id) {
      const res = (await updateFavicon({ id, formData })) as TResponse;
      if (res?.data?.success) {
        toast.success("Favicon Update Success");
        setImage(null);
      } else {
        toast.error(res?.error?.data?.message || "something went wrong!");
        console.log(res);
      }
    } else {
      const res = (await addFavicon(formData)) as TResponse;
      if (res?.data?.success) {
        toast.success("Favicon Add Success");
        setImage(null);
      } else {
        toast.error(res?.error?.data?.message || "something went wrong!");
        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Favicon Setting</h3>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-2 p-4 form_group"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <label>Favicon</label>
                <FormControl>
                  <Input
                    type="file"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      if (
                        e.target.files &&
                        e.target.files[0].size > 1024 * 1024
                      ) {
                        toast.error("File size must be less than 1MB");
                        return;
                      }

                      setImage(e.target.files?.[0] as File);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-xs font-light" />
              </FormItem>
            )}
          />

          {favicon?.favicon && !image && (
            <div className="w-20 relative">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${favicon?.favicon}`}
                alt="favicon"
                className="w-full object-cover rounded mb-4"
              />
            </div>
          )}

          {image && (
            <div className="w-20 relative">
              <img
                src={URL.createObjectURL(image)}
                alt="favicon"
                className="w-full object-cover rounded mb-4"
              />

              <div
                onClick={() => setImage(null)}
                className="absolute top-0 right-0"
              >
                <AiOutlineDelete className="cursor-pointer text-red-500 text-xl opacity-50 hover:opacity-100 duration-300" />
              </div>
            </div>
          )}

          <Button
            disabled={aLoading || uLoading}
            type="submit"
            className="w-max mt-2"
          >
            {aLoading || uLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
