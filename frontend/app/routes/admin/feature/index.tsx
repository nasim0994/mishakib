import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import JoditEditor from "jodit-react";
const JoditEditor = lazy(() => import("jodit-react"));
import toast from "react-hot-toast";
import {
  useAddFeatureMutation,
  useGetFeatureQuery,
  useUpdateFeatureMutation,
} from "@/redux/features/feature/featureApi";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import type { TResponse } from "@/interface/globalInterface";

export default function Feature() {
  const editor = useRef(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const { data } = useGetFeatureQuery({});
  const feature = data?.data;
  const id = feature?._id;

  const form = useForm();

  useEffect(() => {
    if (feature) {
      form.reset({
        title: feature.title || "",
      });

      setDescription(feature?.description);
    }
  }, [feature, form]);

  const [addFeature, { isLoading: aIsLoading }] = useAddFeatureMutation();
  const [updateFeature, { isLoading: uIsLoading }] = useUpdateFeatureMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const info = {
      title: data.title,
      description,
    };
    const formData = new FormData();
    formData.append("image", image as Blob);
    formData.append("data", JSON.stringify(info));

    if (id) {
      const res = (await updateFeature({ id, formData })) as TResponse;
      if (res?.data?.success) {
        toast.success("Feature Update Success");
        setImage(null);
        form.reset();
      } else {
        toast.error(res?.error?.data?.message || "something went wrong!");
        console.log(res);
      }
    } else {
      const res = (await addFeature(formData)) as TResponse;
      if (res?.data?.success) {
        toast.success("Feature Add Success");
        setImage(null);
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
        <h3 className="font-medium text-neutral">Feature</h3>
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
                <label>Feature Title</label>
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

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <label>Feature Image</label>
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

          {feature?.image && !image && (
            <div className="w-80 relative">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${feature?.image}`}
                alt="feature"
                className="w-full object-cover rounded mb-4"
              />
            </div>
          )}

          {image && (
            <div className="w-80 relative">
              <img
                src={URL.createObjectURL(image)}
                alt="feature"
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

          <Button type="submit" className="w-max">
            {aIsLoading || uIsLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
