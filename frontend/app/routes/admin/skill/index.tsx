import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Skills, { type ISkill } from "./Skills";
import { useEffect, useState } from "react";
import {
  useAddSkillMutation,
  useGetSkillQuery,
  useUpdateSkillMutation,
} from "@/redux/features/skill/skillApi";
import type { TResponse } from "@/interface/globalInterface";
import toast from "react-hot-toast";

export default function Skill() {
  const form = useForm();
  const [skills, setSkills] = useState<ISkill[]>([]);

  const { data } = useGetSkillQuery({});
  const skill = data?.data;
  const id = skill?._id;

  useEffect(() => {
    if (skill) {
      form.reset({
        sectionDescription: skill.sectionDescription || "",
      });

      setSkills(skill?.skills);
    }
  }, [skill, form]);

  const [addSkill, { isLoading: aIsLoading }] = useAddSkillMutation();
  const [updateSkill, { isLoading: uIsLoading }] = useUpdateSkillMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newData = {
      sectionDescription: data.sectionDescription,
      skills,
    };

    if (id) {
      const res = (await updateSkill({ id, data: newData })) as TResponse;
      if (res?.data?.success) {
        toast.success("Skill Update Success");
        form.reset();
      } else {
        toast.error(res?.error?.data?.message || "something went wrong!");
        console.log(res);
      }
    } else {
      const res = (await addSkill(newData)) as TResponse;
      if (res?.data?.success) {
        toast.success("Skill Add Success");
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
        <h3 className="font-medium text-neutral">My Skill</h3>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-3 p-4 form_group"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="sectionDescription"
            render={({ field }) => (
              <FormItem>
                <label>Section Description</label>
                <FormControl>
                  <Textarea {...field} value={field.value || ""} required />
                </FormControl>
                <FormMessage className="text-xs font-light" />
              </FormItem>
            )}
          />

          <Skills skills={skills} setSkills={setSkills} />

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
