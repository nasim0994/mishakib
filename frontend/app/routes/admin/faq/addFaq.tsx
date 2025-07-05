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
import { useCreateFaqMutation } from "@/redux/features/faq/faqApi";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function AddFaq() {
  const form = useForm();
  const navigate = useNavigate();
  const [addFaq, { isLoading }] = useCreateFaqMutation();

  //------------Handle Add Faq
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const info = {
      question: data.question,
      answer: data.answer,
    };

    const res = (await addFaq(info)) as TResponse;
    if (res?.data?.success) {
      toast.success("Faq Add Success");
      navigate("/admin/business/section/faq/all");
    } else {
      toast.error(res?.error?.data?.message || "something went wrong!");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Add FAQ</h3>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-3 p-4 form_group"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <label>Question</label>
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
            name="answer"
            render={({ field }) => (
              <FormItem>
                <label>Answer</label>
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

          <Button type="submit" className="w-max mt-2">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
