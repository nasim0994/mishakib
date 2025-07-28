import { Button } from "@/components/ui/button";
import type { IGalleryCategory } from "@/interface/galleryInterface";
import type { TResponse } from "@/interface/globalInterface";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "@/redux/features/gallery/categoryApi";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router";

export default function AllCategory() {
  const { data } = useGetAllCategoryQuery({});
  const categories = data?.data || [];

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async (id: string) => {
    const isConfirm = window.confirm("Are you sure delete this Category?");
    if (isConfirm) {
      const res = (await deleteCategory(id)) as TResponse;
      if (res?.data?.success) {
        toast.success("Category deleted successfully");
      } else {
        toast.error(res?.error?.data?.message || "Failed to delete Category");
        console.log(res);
      }
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center px-4 py-2 border-b bg-base-100 rounded border-gray-300">
        <h3 className="font-medium text-neutral">All Categories</h3>
        <Link to="/admin/gallery/category/add" className="btn">
          <Button>Add Category</Button>
        </Link>
      </div>

      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Order</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category: IGalleryCategory, i: number) => (
              <tr key={category?._id}>
                <td>{i + 1}</td>
                <td>{category?.title}</td>
                <td>{category?.order}</td>
                <td>
                  <div className="flex gap-3 items-center">
                    <Link to={`/admin/gallery/category/edit/${category?._id}`}>
                      <AiOutlineEdit className="text-lg hover:text-red-500" />
                    </Link>
                    <button onClick={() => handleDelete(category?._id)}>
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
