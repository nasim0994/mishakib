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
import type { ISocial } from "@/interface/socialInterface";
import {
  useGetSocialByIdQuery,
  useUpdateSocialMutation,
} from "@/redux/features/social/socialApi";
import { useEffect } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export default function EditSocial() {
  const form = useForm();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data } = useGetSocialByIdQuery(id);
  const social: ISocial = data?.data;

  useEffect(() => {
    if (social) {
      form.setValue("icon", social?.icon);
      form.setValue("link", social?.link);
    }
  }, [social, form]);

  const [updateSocial, { isLoading }] = useUpdateSocialMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = (await updateSocial({ id, data })) as TResponse;
    if (res?.data?.success) {
      toast.success("Social update Success");
      navigate("/admin/social/all");
    } else {
      toast.error(res?.error?.data?.message || "something went wrong!");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Edit Counter</h3>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-2 p-4 form_group"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <label>Icon</label>
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
            name="link"
            render={({ field }) => (
              <FormItem>
                <label>Link</label>
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

          <Button type="submit" className="w-max" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
