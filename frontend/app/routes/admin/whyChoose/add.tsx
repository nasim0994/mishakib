import { useState } from "react";
import { useNavigate } from "react-router";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import type { TResponse } from "@/interface/globalInterface";
import { useAddWhyChooseMutation } from "@/redux/features/whyChoose/whyChooseApi";

export default function AddWhyChoose() {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const form = useForm();

  const [addWhyChoose, { isLoading }] = useAddWhyChooseMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const info = {
      title: data.title,
    };
    const formData = new FormData();
    formData.append("icon", image as Blob);
    formData.append("data", JSON.stringify(info));

    const res = (await addWhyChoose(formData)) as TResponse;

    if (res?.data?.success) {
      toast.success("Why-Choose Add Success");
      navigate("/admin/business/section/why-choose/all");
    } else {
      toast.error(res?.error?.data?.message || "something went wrong!");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Add Why Choose</h3>
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <label>Icon</label>
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

          {image && (
            <div className="w-16 relative">
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

          <Button type="submit" className="w-max">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
