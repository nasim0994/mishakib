import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IGallery, IProjectCategory } from "@/interface/projectInterface";
import { useGetAllGalleryQuery } from "@/redux/features/project/projectApi";
import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function Galleries({
  categories,
}: {
  categories: IProjectCategory[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const { data, isFetching, isLoading } = useGetAllGalleryQuery({
    category: selectedCategoryId,
  });
  const galleries = data?.data || [];

  return (
    <section
      id="galleries"
      className="py-16 bg-primary text-primary-foreground"
    >
      <div className="container relative">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] bg-secondary/10 right-0 top-0"></div>

        <h2 className="font-medium text-2xl sm:text-3xl text-center">
          Galleries
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
                  <PhotoProvider>
                    {galleries?.map((gallery: IGallery) => (
                      <PhotoView key={gallery?._id} src={gallery?.link}>
                        <img
                          src={gallery?.link}
                          alt={gallery?.title}
                          className="w-full block rounded-lg cursor-pointer"
                        />
                      </PhotoView>
                    ))}
                  </PhotoProvider>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
