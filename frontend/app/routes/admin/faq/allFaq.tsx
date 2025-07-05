import TableSkeleton from "@/components/skeleton/TableSkeleton";
import type { IFaq } from "@/interface/faqInterface";
import type { TResponse } from "@/interface/globalInterface";
import {
  useDeleteFaqByIdMutation,
  useGetAllFaqQuery,
} from "@/redux/features/faq/faqApi";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router";

export default function AllFaq() {
  const { data, isLoading, isError, isSuccess } = useGetAllFaqQuery({});
  const faq = data?.data;

  const [deleteFaq] = useDeleteFaqByIdMutation();
  const deleteFaqHandler = async (id: string) => {
    const isConfirm = window.confirm("Are you sure delete this Faq?");
    if (isConfirm) {
      const res = (await deleteFaq(id)) as TResponse;
      if (res?.data?.success) {
        toast.success("Faq deleted successfully");
      } else {
        toast.error(res?.error?.data?.message || "Failed to delete Faq");
        console.log(res);
      }
    }
  };

  let content = null;
  if (isLoading) return (content = <TableSkeleton />);

  if (isError) {
    content = (
      <p className="text-red-500 mt-5">Something went wrong to get data!</p>
    );
  }

  if (!isError && isSuccess) {
    content = (
      <tbody>
        {faq?.map((faq: IFaq, i: number) => (
          <tr key={faq?._id}>
            <td>{i + 1}</td>
            <td>{faq?.question}</td>
            <td>{faq?.answer}</td>
            <td>
              <div className="flex gap-3 items-center">
                <Link to={`/admin/business/section/faq/edit/${faq?._id}`}>
                  <AiOutlineEdit className="text-lg hover:text-red-500" />
                </Link>
                <button onClick={() => deleteFaqHandler(faq?._id)}>
                  <AiOutlineDelete className="text-lg hover:text-red-500" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
  return (
    <section>
      <div className="p-3 bg-base-100 rounded">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-neutral">FAQ</h1>
          <Link
            to="/admin/business/section/faq/add"
            className="primary_btn text-sm"
          >
            Add FAQ
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Qus</th>
              <th>Ans</th>
              <th>Action</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </section>
  );
}
