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
import { useAddServiceMutation } from "@/redux/features/service/serviceApi";
import { lazy, Suspense, useRef, useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
const JoditEditor = lazy(() => import("jodit-react"));

export default function AddService() {
  const form = useForm();
  const navigate = useNavigate();
  const editor = useRef(null);
  const [description, setDescription] = useState("");
  const [addService, { isLoading }] = useAddServiceMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newData = {
      ...data,
      description,
    };
    const res = (await addService(newData)) as TResponse;
    if (res?.data?.success) {
      toast.success("Service Add Success");
      navigate("/admin/service/all");
    } else {
      toast.error(res?.error?.data?.message || "something went wrong!");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Add Service</h3>
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <label>Image Link</label>
                <FormControl>
                  <Input type="text" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage className="text-xs font-light" />
              </FormItem>
            )}
          />

          <div className="mt-2">
            <label>Description</label>

            <div className="mt-2 h400">
              <Suspense fallback={<div>Loading Editor...</div>}>
                <JoditEditor
                  ref={editor}
                  value={description}
                  tabIndex={1}
                  onChange={(newContent) => setDescription(newContent)}
                />
              </Suspense>
            </div>
          </div>

          <Button type="submit" className="w-max mt-2" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
