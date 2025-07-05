// import TagsInput from "react-tagsinput";
// import "react-tagsinput/react-tagsinput.css";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddSEOMutation,
  useGetSEOQuery,
  useUpdateSEOMutation,
} from "@/redux/features/seo/seoApi";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import type { TResponse } from "@/interface/globalInterface";
import toast from "react-hot-toast";

export default function SEO() {
  const form = useForm();

  const { data } = useGetSEOQuery({});
  const seo = data?.data;
  const id = seo?._id;

  useEffect(() => {
    if (seo) {
      form.reset({
        title: seo.title || "",
        author: seo.author || "",
        subject: seo.subject || "",
        description: seo.description || "",
        keywords: seo.keywords || "",

        ogTitle: seo.ogTitle || "",
        ogType: seo.ogType || "",
        ogUrl: seo.ogUrl || "",
        ogSiteName: seo.ogSiteName || "",
        ogDescription: seo.ogDescription || "",
        ogImageUrl: seo.ogImageUrl || "",

        facebook_domain_verification: seo.facebook_domain_verification || "",
        google_site_verification: seo.google_site_verification || "",
        google_tag_manager: seo.google_tag_manager || "",
      });
    }
  }, [seo, form]);

  const [addSEO, { isLoading }] = useAddSEOMutation();
  const [updateSEO, { isLoading: uLoading }] = useUpdateSEOMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (id) {
      const res = (await updateSEO({ id, data })) as TResponse;
      if (res?.data?.success) {
        toast.success("SEO Update Success");
        form.reset();
      } else {
        toast.error(res?.error?.data?.message || "something went wrong!");
        console.log(res);
      }
    } else {
      const res = (await addSEO(data)) as TResponse;
      if (res?.data?.success) {
        toast.success("SEO Add Success");
        form.reset();
      } else {
        toast.error(res?.error?.data?.message || "something went wrong!");
        console.log(res);
      }
    }
  };

  return (
    <section className="bg-base-100 shadow rounded p-4">
      <div className="container">
        <h3 className="text-center">SEO Setting</h3>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-4 p-4 form_group"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            <p className="mb-2">Basic Meta Tags</p>
            <div className="grid sm:grid-cols-2 gap-3 border rounded p-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <label>Meta Title *</label>
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
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <label>Author</label>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <label>Subject</label>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="copyright"
                render={({ field }) => (
                  <FormItem>
                    <label>Copyright</label>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <label>Description *</label>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value || ""}
                        rows={5}
                        required
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <label>
                      Keywords <small>(Separate each keyword with ;)</small>
                    </label>
                    <FormControl>
                      <Textarea {...field} value={field.value || ""} rows={5} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <p className="mb-2">OpenGraph Meta Tags</p>
            <div className="grid sm:grid-cols-2 gap-3 border rounded p-3">
              <FormField
                control={form.control}
                name="ogTitle"
                render={({ field }) => (
                  <FormItem>
                    <label>og title</label>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ogType"
                render={({ field }) => (
                  <FormItem>
                    <label>og:type</label>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ogUrl"
                render={({ field }) => (
                  <FormItem>
                    <label>og url</label>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ogSiteName"
                render={({ field }) => (
                  <FormItem>
                    <label>og site name</label>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ogDescription"
                render={({ field }) => (
                  <FormItem>
                    <label>og description</label>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ogImageUrl"
                render={({ field }) => (
                  <FormItem>
                    <label>og image url</label>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <p className="mb-2">Custom Tags</p>
            <div className="grid sm:grid-cols-2 gap-3 border rounded p-3">
              <FormField
                control={form.control}
                name="facebook_domain_verification"
                render={({ field }) => (
                  <FormItem>
                    <label>facebook Domain Verification Id</label>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="google_site_verification"
                render={({ field }) => (
                  <FormItem>
                    <label>Google Site Verification Id</label>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="google_tag_manager"
                render={({ field }) => (
                  <FormItem>
                    <label>Google Tag Manager Id</label>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-max">
            {isLoading || uLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
