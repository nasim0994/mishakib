import TableSkeleton from "@/components/skeleton/TableSkeleton";
import type { TResponse } from "@/interface/globalInterface";
import type { IWhyChoose } from "@/interface/whyChooseInterface";
import {
  useDeleteWhyChooseByIdMutation,
  useGetAllWhyChooseQuery,
} from "@/redux/features/whyChoose/whyChooseApi";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router";

export default function AllWhyChoose() {
  const { data, isLoading, isError, isSuccess } = useGetAllWhyChooseQuery({});
  const features = data?.data;

  const [deleteWhyChoose] = useDeleteWhyChooseByIdMutation();
  const deleteFeatureHandler = async (id: string) => {
    const isConfirm = window.confirm("Are you sure delete this why choose?");
    if (isConfirm) {
      const res = (await deleteWhyChoose(id)) as TResponse;

      if (res?.data?.success) {
        toast.success("why choose success");
      } else {
        toast.error(res?.error?.data?.message || "something went wrong!");
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
        {features?.map((feature: IWhyChoose, i: number) => (
          <tr key={feature?._id}>
            <td>{i + 1}</td>
            <td>{feature?.title}</td>
            <td>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${feature?.icon}`}
                alt={feature?.title}
                className="w-14 h-8 rounded"
              />
            </td>
            <td>
              <div className="flex gap-3 items-center">
                <Link
                  to={`/admin/business/section/why-choose/edit/${feature?._id}`}
                >
                  <AiOutlineEdit className="text-lg hover:text-red-500" />
                </Link>
                <button onClick={() => deleteFeatureHandler(feature?._id)}>
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
      <div className="p-4 bg-base-100 rounded">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-neutral">Why Choose</h1>
          <Link
            to="/admin/business/section/why-choose/add"
            className="primary_btn text-sm"
          >
            Add New
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </section>
  );
}
