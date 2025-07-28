import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { IGallery, IGalleryCategory } from "@/interface/galleryInterface";
import type { TResponse } from "@/interface/globalInterface";
import { useGetAllCategoryQuery } from "@/redux/features/gallery/categoryApi";
import {
  useGetGalleryByIdQuery,
  useUpdateGalleryMutation,
} from "@/redux/features/gallery/galleryApi";
import { useEffect } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditGallery() {
  const form = useForm();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data } = useGetGalleryByIdQuery(id);
  const gallery: IGallery = data?.data;

  const { data: category } = useGetAllCategoryQuery({});
  const categories = category?.data || [];

  useEffect(() => {
    if (gallery) {
      form.setValue("image", gallery?.image);
      form.setValue("category", gallery?.category);
    }
  }, [category, form]);

  const [updateGallery, { isLoading }] = useUpdateGalleryMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = (await updateGallery({ id, data })) as TResponse;
    if (res?.data?.success) {
      toast.success("Gallery update Success");
      navigate("/admin/gallery/all");
    } else {
      toast.error(res?.error?.data?.message || "something went wrong!");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Edit Gallery</h3>
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
                <label>Image</label>
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <label>Category</label>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category: IGalleryCategory) => (
                          <SelectItem key={category?._id} value={category?._id}>
                            {category?.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs font-light" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-max" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
