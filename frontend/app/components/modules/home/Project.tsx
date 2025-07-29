import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IProject, IProjectCategory } from "@/interface/projectInterface";
import { useGetAllProjectQuery } from "@/redux/features/project/projectApi";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { IAbout } from "@/interface/aboutInterface";

export default function Project({
  categories,
  about,
}: {
  categories: IProjectCategory[];
  about: IAbout;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const { data, isFetching, isLoading } = useGetAllProjectQuery({
    category: selectedCategoryId,
  });
  const projects = data?.data || [];

  return (
    <section id="projects" className="py-16 bg-primary text-primary-foreground">
      <div className="container relative">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] bg-secondary/10 right-0 top-0"></div>

        <h2 className="font-medium text-2xl sm:text-3xl text-center">
          Projects
        </h2>

        <div className="flex items-center justify-center mt-4">
          <Tabs defaultValue="all">
            <div className="flex flex-wrap items-center justify-center mb-3">
              <div className="bg-secondary/5 backdrop-blur-[20px] border border-secondary/15 rounded-xl px-2 py-1">
                <TabsList>
                  <TabsTrigger
                    value="all"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedCategoryId("");
                    }}
                  >
                    All
                  </TabsTrigger>
                  {categories?.map((category) => (
                    <TabsTrigger
                      key={category?._id}
                      value={category?.title.toLowerCase()}
                      onClick={() => {
                        setSelectedCategory(category?.title.toLowerCase());
                        setSelectedCategoryId(category?._id);
                      }}
                    >
                      {category?.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            <TabsContent value={selectedCategory} data-aos="flip-down">
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
                            alt="gallery"
                            className="w-full block rounded-lg cursor-pointer"
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[90%] h-[95vh] overflow-y-auto">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <img
                              src={about?.image}
                              alt="me"
                              className="w-11 h-11 rounded-full object-center border border-primary"
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

                            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {selectedProject?.galleries?.map((gallery) => (
                                <div
                                  key={gallery?._id}
                                  className="border rounded p-3 border-gray-400"
                                >
                                  <img
                                    src={gallery?.link}
                                    alt={gallery?.title}
                                    className="w-full h-auto object-cover rounded"
                                  />
                                  <h2 className="text-sm text-neutral-600">
                                    {gallery?.title}
                                  </h2>
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
