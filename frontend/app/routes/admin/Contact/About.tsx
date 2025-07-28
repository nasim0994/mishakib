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
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  useAddAboutMutation,
  useGetAboutQuery,
  useUpdateAboutMutation,
} from "@/redux/features/about/aboutApi";
import type { TResponse } from "@/interface/globalInterface";
import toast from "react-hot-toast";
const JoditEditor = lazy(() => import("jodit-react"));

export default function About() {
  const form = useForm();
  const editor = useRef(null);
  const [description, setDescription] = useState("");

  const { data } = useGetAboutQuery({});
  const about = data?.data;
  const id = about?._id;

  useEffect(() => {
    if (about) {
      form.reset({
        title: about.title || "",
        subTitle: about.subTitle || "",
        image: about.image || "",
        cv: about.cv || "",
      });

      setDescription(about?.description);
    }
  }, [about, form]);

  const [addAbout, { isLoading: aIsLoading }] = useAddAboutMutation();
  const [updateAbout, { isLoading: uIsLoading }] = useUpdateAboutMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newData = {
      ...data,
      description,
    };

    if (id) {
      const res = (await updateAbout({ id, data: newData })) as TResponse;
      if (res?.data?.success) {
        toast.success("About Update Success");
        form.reset();
      } else {
        toast.error(res?.error?.data?.message || "something went wrong!");
        console.log(res);
      }
    } else {
      const res = (await addAbout(newData)) as TResponse;
      if (res?.data?.success) {
        toast.success("About Add Success");
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
        <h3 className="font-medium text-neutral">About</h3>
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
            name="subTitle"
            render={({ field }) => (
              <FormItem>
                <label>Sub Title</label>
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
            name="cv"
            render={({ field }) => (
              <FormItem>
                <label>CV Link</label>
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
