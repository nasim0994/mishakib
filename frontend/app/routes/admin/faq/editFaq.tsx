import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { IFaq } from "@/interface/faqInterface";
import type { TResponse } from "@/interface/globalInterface";
import {
  useGetFaqByIdQuery,
  useUpdateFaqMutation,
} from "@/redux/features/faq/faqApi";
import { useEffect } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export default function AddFaq() {
  const form = useForm();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data } = useGetFaqByIdQuery(id);
  const faq: IFaq = data?.data;

  useEffect(() => {
    if (faq) {
      form.setValue("question", faq.question);
      form.setValue("answer", faq.answer);
    }
  }, [faq, form]);

  const [updateFaq, { isLoading }] = useUpdateFaqMutation();

  //------------Handle Add Faq
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const info = {
      question: data?.question,
      answer: data?.answer,
    };

    const res = (await updateFaq({ id, info })) as TResponse;
    if (res?.data?.success) {
      toast.success("Faq update Success");
      navigate("/admin/business/section/faq/all");
    } else {
      toast.error(res?.error?.data?.message || "something went wrong!");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Edit FAQ</h3>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-2 p-4 form_group"
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

          <Button type="submit" className="w-max">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
