import type { TResponse } from "@/interface/globalInterface";
import { useAddMessageMutation } from "@/redux/features/message/messageApi";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [addMessage, { isLoading }] = useAddMessageMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target;
    const name = (target as any).name.value;
    const subject = (target as any).subject.value;
    const message = (target as any).message.value;

    const data = {
      name,
      subject,
      message,
    };

    const res = (await addMessage(data)) as TResponse;
    if (res?.data?.success) {
      toast.success("Message sent successfully");
      (target as any).reset();
    } else {
      toast.error(res?.error?.data?.message || "something went wrong!");
      console.log(res);
    }
  };

  return (
    <div data-aos="zoom-out-left">
      <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Message</label>
          <textarea
            rows={5}
            name="message"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
