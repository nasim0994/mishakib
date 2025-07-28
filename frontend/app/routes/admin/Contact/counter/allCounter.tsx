import { Button } from "@/components/ui/button";
import type { ICounter } from "@/interface/counterInterface";
import type { TResponse } from "@/interface/globalInterface";
import {
  useDeleteCounterMutation,
  useGetAllCounterQuery,
} from "@/redux/features/counter/counterApi";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router";

export default function AllCounter() {
  const { data } = useGetAllCounterQuery({});
  const counters = data?.data || [];

  const [deleteCounter] = useDeleteCounterMutation();

  const handleDelete = async (id: string) => {
    const isConfirm = window.confirm("Are you sure delete this Counter?");
    if (isConfirm) {
      const res = (await deleteCounter(id)) as TResponse;
      if (res?.data?.success) {
        toast.success("Counter deleted successfully");
      } else {
        toast.error(res?.error?.data?.message || "Failed to delete Counter");
        console.log(res);
      }
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center px-4 py-2 border-b bg-base-100 rounded border-gray-300">
        <h3 className="font-medium text-neutral">All Counters</h3>
        <Link to="/admin/counter/add" className="btn">
          <Button>Add Counter</Button>
        </Link>
      </div>

      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Count</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {counters?.map((counter: ICounter, i: number) => (
              <tr key={counter?._id}>
                <td>{i + 1}</td>
                <td>{counter?.title}</td>
                <td>{counter?.count}</td>
                <td>
                  <div className="flex gap-3 items-center">
                    <Link to={`/admin/counter/edit/${counter?._id}`}>
                      <AiOutlineEdit className="text-lg hover:text-red-500" />
                    </Link>
                    <button onClick={() => handleDelete(counter?._id)}>
                      <AiOutlineDelete className="text-lg hover:text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
