import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IProject, IProjectCategory } from "@/interface/projectInterface";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function Project({
  categories,
  projects,
}: {
  categories: IProjectCategory[];
  projects: IProject[];
}) {
  return (
    <section id="projects" className="py-16 bg-primary text-primary-foreground">
      <div className="container relative">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] bg-secondary/10 right-0 top-0"></div>

        <h2 className="font-medium text-2xl sm:text-3xl text-center">
          Projects
        </h2>

        <div className="flex items-center justify-center mt-4">
          <Tabs defaultValue="logo">
            <div className="flex flex-wrap items-center justify-center mb-3">
              <div className="bg-secondary/5 backdrop-blur-[20px] border border-secondary/15 rounded-xl px-2 py-1">
                <TabsList>
                  {categories?.map((category) => (
                    <TabsTrigger
                      key={category?._id}
                      value={category?.title.toLowerCase()}
                    >
                      {category?.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            <TabsContent value="logo" data-aos="flip-down">
              <PhotoProvider>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {projects?.map((project) => (
                    <PhotoView key={project?._id} src={project?.thumbnail}>
                      <img
                        src={project?.thumbnail}
                        alt="gallery"
                        className="w-full block rounded-lg cursor-pointer"
                      />
                    </PhotoView>
                  ))}
                </div>
              </PhotoProvider>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
