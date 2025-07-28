import { Button } from "@/components/ui/button";
import type { TResponse } from "@/interface/globalInterface";
import type { ISocial } from "@/interface/socialInterface";
import {
  useDeleteSocialMutation,
  useGetAllSocialQuery,
} from "@/redux/features/social/socialApi";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router";

export default function AllSocial() {
  const { data } = useGetAllSocialQuery({});
  const socials = data?.data || [];

  const [deleteSocial] = useDeleteSocialMutation();

  const handleDelete = async (id: string) => {
    const isConfirm = window.confirm("Are you sure delete this Social?");
    if (isConfirm) {
      const res = (await deleteSocial(id)) as TResponse;
      if (res?.data?.success) {
        toast.success("Social deleted successfully");
      } else {
        toast.error(res?.error?.data?.message || "Failed to delete Social");
        console.log(res);
      }
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center px-4 py-2 border-b bg-base-100 rounded border-gray-300">
        <h3 className="font-medium text-neutral">All Socials</h3>
        <Link to="/admin/social/add" className="btn">
          <Button>Add Social</Button>
        </Link>
      </div>

      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Icon</th>
              <th>Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {socials?.map((social: ISocial, i: number) => (
              <tr key={social?._id}>
                <td>{i + 1}</td>
                <td>{social?.icon}</td>
                <td>{social?.link}</td>
                <td>
                  <div className="flex gap-3 items-center">
                    <Link to={`/admin/social/edit/${social?._id}`}>
                      <AiOutlineEdit className="text-lg hover:text-red-500" />
                    </Link>
                    <button onClick={() => handleDelete(social?._id)}>
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
