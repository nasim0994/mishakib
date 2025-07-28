import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { IGalleryCategory } from "@/interface/galleryInterface";
import type { TResponse } from "@/interface/globalInterface";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "@/redux/features/gallery/categoryApi";
import { useEffect } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export default function EditCategory() {
  const form = useForm();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data } = useGetCategoryByIdQuery(id);
  const category: IGalleryCategory = data?.data;

  useEffect(() => {
    if (category) {
      form.setValue("title", category?.title);
      form.setValue("order", category?.order);
    }
  }, [category, form]);

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newData = { title: data.title, order: Number(data.order) };
    const res = (await updateCategory({ id, data: newData })) as TResponse;
    if (res?.data?.success) {
      toast.success("Category update Success");
      navigate("/admin/gallery/category/all");
    } else {
      toast.error(res?.error?.data?.message || "something went wrong!");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Edit Category</h3>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-2 p-4 form_group"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <label>Title</label>
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
            name="order"
            render={({ field }) => (
              <FormItem>
                <label>Order</label>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value || ""}
                    required
                  />
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
