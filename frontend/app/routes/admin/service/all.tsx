import { Button } from "@/components/ui/button";
import type { TResponse } from "@/interface/globalInterface";
import type { IService } from "@/interface/serviceInterface";
import {
  useDeleteServiceMutation,
  useGetAllServiceQuery,
} from "@/redux/features/service/serviceApi";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router";

export default function AllService() {
  const { data } = useGetAllServiceQuery({});
  const services = data?.data || [];

  const [deleteService] = useDeleteServiceMutation();

  const handleDelete = async (id: string) => {
    const isConfirm = window.confirm("Are you sure delete this Service?");
    if (isConfirm) {
      const res = (await deleteService(id)) as TResponse;
      if (res?.data?.success) {
        toast.success("Service deleted successfully");
      } else {
        toast.error(res?.error?.data?.message || "Failed to delete Service");
        console.log(res);
      }
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center px-4 py-2 border-b bg-base-100 rounded border-gray-300">
        <h3 className="font-medium text-neutral">All Services</h3>
        <Link to="/admin/service/add" className="btn">
          <Button>Add Service</Button>
        </Link>
      </div>

      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Icon</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services?.map((counter: IService, i: number) => (
              <tr key={counter?._id}>
                <td>{i + 1}</td>
                <td>{counter?.title}</td>
                <td>{counter?.icon}</td>
                <td>{counter?.image}</td>
                <td>
                  <div className="flex gap-3 items-center">
                    <Link to={`/admin/service/edit/${counter?._id}`}>
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
