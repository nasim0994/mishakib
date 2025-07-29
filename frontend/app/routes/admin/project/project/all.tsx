import { Button } from "@/components/ui/button";
import type { TResponse } from "@/interface/globalInterface";
import type { IProject } from "@/interface/projectInterface";
import {
  useDeleteProjectMutation,
  useGetAllProjectQuery,
} from "@/redux/features/project/projectApi";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router";

export default function AllProject() {
  const { data } = useGetAllProjectQuery({});
  const projects = data?.data || [];

  const [deleteProject] = useDeleteProjectMutation();

  const handleDelete = async (id: string) => {
    const isConfirm = window.confirm("Are you sure delete this Project?");
    if (isConfirm) {
      const res = (await deleteProject(id)) as TResponse;
      if (res?.data?.success) {
        toast.success("Project deleted successfully");
      } else {
        toast.error(res?.error?.data?.message || "Failed to delete Project");
        console.log(res);
      }
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center px-4 py-2 border-b bg-base-100 rounded border-gray-300">
        <h3 className="font-medium text-neutral">All Projects</h3>
        <Link to="/admin/project/add" className="btn">
          <Button>Add Project</Button>
        </Link>
      </div>

      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Thumbnail</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project: IProject, i: number) => (
              <tr key={project?._id}>
                <td>{i + 1}</td>
                <td>{project?.name}</td>
                <td>
                  <img
                    src={project?.thumbnail}
                    alt="project"
                    className="w-10"
                  />
                </td>
                <td>{project?.category?.title}</td>
                <td>
                  <div className="flex gap-3 items-center">
                    <Link to={`/admin/project/edit/${project?._id}`}>
                      <AiOutlineEdit className="text-lg hover:text-red-500" />
                    </Link>
                    <button onClick={() => handleDelete(project?._id)}>
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
