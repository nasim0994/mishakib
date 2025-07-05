import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
import {
  useAddBookMutation,
  useGetBookQuery,
  useUpdateBookMutation,
} from "@/redux/features/book/bookApi";
import type { TResponse } from "@/interface/globalInterface";

export default function Book() {
  const [file, setFile] = useState<File | null>(null);

  const { data } = useGetBookQuery({});
  const book = data?.data;
  const id = book?._id;

  const form = useForm();

  useEffect(() => {
    if (book) {
      form.reset({
        name: book.name || "",
        price: book.price || "",
      });
    }
  }, [book, form]);

  const [addBook, { isLoading: aIsLoading }] = useAddBookMutation();
  const [updateBook, { isLoading: uIsLoading }] = useUpdateBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const info = {
      name: data.name,
      price: Number(data.price),
    };
    const formData = new FormData();
    formData.append("book", file as Blob);
    formData.append("data", JSON.stringify(info));

    if (id) {
      const res = await updateBook({ id, formData });
      if (res?.data?.success) {
        toast.success("Book Update Success");
        form.reset();
        setFile(null);
      } else {
        toast.error(res?.data?.message || "something went wrong!");
        console.log(res);
      }
    } else {
      const res = (await addBook(formData)) as TResponse;
      if (res?.data?.success) {
        toast.success("Book Add Success");
        form.reset();
        setFile(null);
      } else {
        toast.error(res?.error?.data?.message || "something went wrong!");
        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium text-neutral">Book</h3>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-3 p-4 form_group"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <label>Book Name</label>
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <label>Book Price</label>
                <FormControl>
                  <Input
                    type="number"
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
                <label>
                  Book File <small>(pdf only)</small>
                </label>
                <FormControl>
                  <Input
                    type="file"
                    {...field}
                    value={field.value || ""}
                    className="cursor-pointer"
                    onChange={(e) => {
                      //   if (
                      //     e.target.files &&
                      //     e.target.files[0].size > 1024 * 1024
                      //   ) {
                      //     toast.error("File size must be less than 1MB");
                      //     return;
                      //   }

                      setFile(e.target.files?.[0] as File);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-xs font-light" />
              </FormItem>
            )}
          />

          {book?.book && !file && (
            <p className="text-sm text-neutral">{book?.book}</p>
          )}

          {file && (
            <div className="flex items-center flex-wrap gap-2">
              <p className="text-sm text-neutral">{file?.name}</p>{" "}
              <div onClick={() => setFile(null)}>
                <AiOutlineDelete className="cursor-pointer text-red-500 text-lg opacity-60 hover:opacity-100 duration-300" />
              </div>
            </div>
          )}

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
