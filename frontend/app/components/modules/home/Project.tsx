import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  IGallery,
  IProject,
  IProjectCategory,
} from "@/interface/projectInterface";
import { useGetAllProjectQuery } from "@/redux/features/project/projectApi";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { IAbout } from "@/interface/aboutInterface";

type IGroupedByCategory = {
  category: IProjectCategory;
  items: IGallery[];
};

export default function Project({ about }: { about: IAbout }) {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const { data, isFetching, isLoading } = useGetAllProjectQuery({});
  const projects = data?.data || [];

  const groupedByCategory: IGroupedByCategory[] = Object.values(
    (selectedProject?.galleries || []).reduce((acc: any, item: IGallery) => {
      const catId = item.category._id;
      if (!acc[catId]) {
        acc[catId] = {
          category: item.category,
          items: [],
        };
      }
      acc[catId].items.push(item);
      return acc;
    }, {})
  );

  return (
    <section id="projects" className="py-16 bg-primary text-primary-foreground">
      <div className="container relative">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] bg-secondary/10 right-0 top-0"></div>

        <h2 className="font-medium text-2xl sm:text-3xl text-center">
          Projects
        </h2>

        <div className="flex items-center justify-center mt-4">
          {isLoading || isFetching ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <div className="w-40 h-40 rounded bg-gray-500/20"></div>
              <div className="w-40 h-40 rounded bg-gray-500/20"></div>
              <div className="w-40 h-40 rounded bg-gray-500/20"></div>
              <div className="w-40 h-40 rounded bg-gray-500/20"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {projects?.map((project: IProject) => (
                <Dialog key={project?._id}>
                  <DialogTrigger
                    asChild
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative">
                      <img
                        src={project?.thumbnail}
                        alt="project"
                        className="w-full block rounded-lg cursor-pointer"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[90%] h-[95vh] overflow-y-auto">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <img
                          src={project?.thumbnail}
                          alt="project"
                          className="w-11 h-11 rounded-full object-cover border border-primary"
                        />
                        <div>
                          <h2 className="font-medium text-lg">
                            {selectedProject?.name}
                          </h2>
                          <p className="text-sm font-light text-neutral">
                            {about?.name}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <img
                          src={selectedProject?.banner}
                          alt="banner"
                          className="w-full max-h-[60vh] rounded object-cover"
                        />

                        <div className="mt-4 flex flex-col gap-4">
                          {groupedByCategory?.map((category) => (
                            <div key={category?.category?._id}>
                              <h3 className="font-medium text-neutral text-lg border-b pb-2 mb-3 border-gray-300">
                                {category?.category?.title}
                              </h3>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {category?.items?.map((gallery) => (
                                  <div key={gallery?._id}>
                                    <img
                                      src={gallery?.link}
                                      alt={gallery?.title}
                                      className="w-full h-auto object-cover rounded border border-gray-300"
                                    />
                                    <h2 className="mt-1 text-sm text-neutral-600">
                                      {gallery?.title}
                                    </h2>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
