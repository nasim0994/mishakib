import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import type { TResponse } from "@/interface/globalInterface";
import toast from "react-hot-toast";
import {
  useAddLogoMutation,
  useGetLogoQuery,
  useUpdateLogoMutation,
} from "@/redux/features/logo/logoApi";

export default function Logo() {
  const form = useForm();

  const { data } = useGetLogoQuery({});
  const logo = data?.data;
  const id = logo?._id;

  useEffect(() => {
    if (logo) {
      form.reset({
        logo: logo?.logo || "",
        favicon: logo?.favicon || "",
      });
    }
  }, [logo, form]);

  const [addLogo, { isLoading: aIsLoading }] = useAddLogoMutation();
  const [updateLogo, { isLoading: uIsLoading }] = useUpdateLogoMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (id) {
      const res = (await updateLogo({ id, data })) as TResponse;
      if (res?.data?.success) {
        toast.success("Logo Update Success");
        form.reset();
      } else {
        toast.error(res?.error?.data?.message || "something went wrong!");
        console.log(res);
      }
    } else {
      const res = (await addLogo(data)) as TResponse;
      if (res?.data?.success) {
        toast.success("Logo Add Success");
        form.reset();
      } else {
        toast.error(res?.error?.data?.message || "something went wrong!");
        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium text-neutral">Logo & Favicon</h3>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-3 p-4 form_group"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <label>Logo</label>
                <FormControl>
                  <Input type="text" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage className="text-xs font-light" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="favicon"
            render={({ field }) => (
              <FormItem>
                <label>Favicon</label>
                <FormControl>
                  <Input type="text" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage className="text-xs font-light" />
              </FormItem>
            )}
          />

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
