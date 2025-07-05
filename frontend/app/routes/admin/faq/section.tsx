import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { TResponse } from "@/interface/globalInterface";
import {
  useAddFaqSectionMutation,
  useGetFaqSectionQuery,
  useUpdateFaqSectionMutation,
} from "@/redux/features/faq/faqSectionApi";
import { useEffect } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function FaqSection() {
  const form = useForm();
  const { data } = useGetFaqSectionQuery({});
  const section = data?.data;
  const id = section?._id;

  useEffect(() => {
    form.setValue("title", section?.title);
  }, [section, form]);

  const [addFaqSection, { isLoading: aLoading }] = useAddFaqSectionMutation();
  const [updateFaqSection, { isLoading }] = useUpdateFaqSectionMutation();

  //------------Handle Add Product
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const info = {
      title: data.title,
    };

    if (id) {
      const res = (await updateFaqSection({ id, info })) as TResponse;
      if (res?.data?.success) {
        toast.success("Section Title Update Success");
      } else {
        toast.error(res?.error?.data?.message || "something went wrong!");
        console.log(res);
      }
    } else {
      const res = (await addFaqSection(info)) as TResponse;
      if (res?.data?.success) {
        toast.success("Section Title Add Success");
      } else {
        toast.error(res?.error?.data?.message || "something went wrong!");
        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Faq Section</h3>
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
                <label>Section Title</label>
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

          <Button type="submit" className="w-max">
            {aLoading || isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
