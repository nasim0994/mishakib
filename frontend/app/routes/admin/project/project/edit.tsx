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
import { useEffect, useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from "@/redux/features/project/projectApi";
import type { IProject, IProjectCategory } from "@/interface/projectInterface";
import { useGetAllCategoryQuery } from "@/redux/features/project/categoryApi";
import Galleries, { type IGallery } from "./Galleries";

export default function EditProject() {
  const form = useForm();
  const navigate = useNavigate();
  const [galleries, setGalleries] = useState<IGallery[]>([]);

  const { id } = useParams();
  const { data } = useGetProjectByIdQuery(id);
  const project: IProject = data?.data;

  const { data: category } = useGetAllCategoryQuery({});
  const categories = category?.data || [];

  useEffect(() => {
    if (project) {
      form.setValue("name", project?.name);
      form.setValue("category", project?.category);
      form.setValue("thumbnail", project?.thumbnail);
      form.setValue("banner", project?.banner);
      setGalleries(project?.galleries || []);
    }
  }, [project, form]);

  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const mewData = { ...data, galleries };
    const res = (await updateProject({ id, data: mewData })) as TResponse;
    if (res?.data?.success) {
      toast.success("Project update Success");
      navigate("/admin/project/all");
    } else {
      toast.error(res?.error?.data?.message || "something went wrong!");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Edit Project</h3>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-2 p-4 form_group"
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

          <FormField
            control={form.control}
            name="banner"
            render={({ field }) => (
              <FormItem>
                <label>Banner</label>
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

          <Button type="submit" className="w-max" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
