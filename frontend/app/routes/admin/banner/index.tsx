import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useAddBannerMutation,
  useGetBannerQuery,
  useUpdateBannerMutation,
} from "@/redux/features/banner/bannerApi";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { TResponse } from "@/interface/globalInterface";

export default function Banner() {
  const [image, setImage] = useState<File | null>(null);

  const { data } = useGetBannerQuery({});
  const banner = data?.data;
  const id = banner?._id;

  const form = useForm();

  useEffect(() => {
    if (banner) {
      form.reset({
        title: banner.title || "",
        description: banner.description || "",
      });
    }
  }, [banner, form]);

  const [addBanner, { isLoading: aIsLoading }] = useAddBannerMutation();
  const [updateBanner, { isLoading: uIsLoading }] = useUpdateBannerMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const info = {
      title: data.title,
      description: data.description,
    };
    const formData = new FormData();
    formData.append("image", image as Blob);
    formData.append("data", JSON.stringify(info));

    if (id) {
      const res = await updateBanner({ id, formData });
      if (res?.data?.success) {
        toast.success("Banner Update Success");
        form.reset();
        setImage(null);
      } else {
        toast.error(res?.data?.message || "something went wrong!");
        console.log(res);
      }
    } else {
      const res = (await addBanner(formData)) as TResponse;
      if (res?.data?.success) {
        toast.success("Banner Add Success");
        form.reset();
        setImage(null);
      } else {
        toast.error(res?.error?.data?.message || "something went wrong!");
        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium text-neutral">Banner</h3>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-3 p-4 form_group"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <label>Banner Title</label>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    required
                  />
                </FormControl>
                <FormMessage className="text-xs font-light" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <label>Banner Description</label>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    rows={10}
                    required
                  />
                </FormControl>
                <FormMessage className="text-xs font-light" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <label>Banner Image</label>
                <FormControl>
                  <Input
                    type="file"
                    {...field}
                    value={field.value || ""}
                    className="cursor-pointer"
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

          {banner?.image && !image && (
            <div className="w-80 relative">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${banner?.image}`}
                alt="banner"
                className="w-full object-cover rounded mb-4"
              />
            </div>
          )}

          {image && (
            <div className="w-80 relative">
              <img
                src={URL.createObjectURL(image)}
                alt="banner"
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

          <div className="mt-4">
            <Button type="submit" className="w-max">
              {aIsLoading || uIsLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
