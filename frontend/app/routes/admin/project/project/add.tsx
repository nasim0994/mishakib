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
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCategoryQuery } from "@/redux/features/project/categoryApi";
import { useAddProjectMutation } from "@/redux/features/project/projectApi";
import type { IProjectCategory } from "@/interface/projectInterface";
import Galleries, { type IGallery } from "./Galleries";
import { useState } from "react";

export default function AddProject() {
  const form = useForm();
  const navigate = useNavigate();
  const [galleries, setGalleries] = useState<IGallery[]>([]);
  const [addProject, { isLoading }] = useAddProjectMutation();

  const { data } = useGetAllCategoryQuery({});
  const categories = data?.data || [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newData = {
      ...data,
      galleries,
    };
    const res = (await addProject(newData)) as TResponse;
    if (res?.data?.success) {
      toast.success("Project Add Success");
      navigate("/admin/project/all");
    } else {
      toast.error(res?.error?.data?.message || "something went wrong!");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Add Project</h3>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-3 p-4 form_group"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <label>Name</label>
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
                          {categories.map((category: IProjectCategory) => (
                            <SelectItem
                              key={category?._id}
                              value={category?._id}
                            >
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
          </div>

          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <label>Thumbnail</label>
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

          <Galleries galleries={galleries} setGalleries={setGalleries} />

          <Button type="submit" className="w-max mt-2" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
