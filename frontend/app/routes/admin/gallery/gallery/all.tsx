import { Button } from "@/components/ui/button";
import type { IGallery } from "@/interface/galleryInterface";
import type { TResponse } from "@/interface/globalInterface";
import {
  useDeleteGalleryMutation,
  useGetAllGalleryQuery,
} from "@/redux/features/gallery/galleryApi";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router";

export default function AllGallery() {
  const { data } = useGetAllGalleryQuery({});
  const galleries = data?.data || [];

  const [deleteGallery] = useDeleteGalleryMutation();

  const handleDelete = async (id: string) => {
    const isConfirm = window.confirm("Are you sure delete this Gallery?");
    if (isConfirm) {
      const res = (await deleteGallery(id)) as TResponse;
      if (res?.data?.success) {
        toast.success("Gallery deleted successfully");
      } else {
        toast.error(res?.error?.data?.message || "Failed to delete Gallery");
        console.log(res);
      }
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center px-4 py-2 border-b bg-base-100 rounded border-gray-300">
        <h3 className="font-medium text-neutral">All Galleries</h3>
        <Link to="/admin/gallery/add" className="btn">
          <Button>Add Gallery</Button>
        </Link>
      </div>

      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {galleries?.map((gallery: IGallery, i: number) => (
              <tr key={gallery?._id}>
                <td>{i + 1}</td>
                <td>
                  <img src={gallery?.image} alt="gallery" className="w-10" />
                </td>
                <td>{gallery?.category?.title}</td>
                <td>
                  <div className="flex gap-3 items-center">
                    <Link to={`/admin/gallery/edit/${gallery?._id}`}>
                      <AiOutlineEdit className="text-lg hover:text-red-500" />
                    </Link>
                    <button onClick={() => handleDelete(gallery?._id)}>
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
