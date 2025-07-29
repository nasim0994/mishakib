import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { TResponse } from "@/interface/globalInterface";
import type { IService } from "@/interface/serviceInterface";
import {
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} from "@/redux/features/service/serviceApi";
import { useEffect } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export default function EditService() {
  const form = useForm();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data } = useGetServiceByIdQuery(id);
  const service: IService = data?.data;

  useEffect(() => {
    if (service) {
      form.setValue("title", service?.title);
      form.setValue("icon", service?.icon);
      form.setValue("description", service?.description);
    }
  }, [service, form]);

  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = (await updateService({ id, data })) as TResponse;
    if (res?.data?.success) {
      toast.success("Service update Success");
      navigate("/admin/service/all");
    } else {
      toast.error(res?.error?.data?.message || "something went wrong!");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Edit Service</h3>
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
            name="icon"
            render={({ field }) => (
              <FormItem>
                <label>Icon Link</label>
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
                <label>Description</label>
                <FormControl>
                  <Textarea {...field} value={field.value || ""} required />
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
