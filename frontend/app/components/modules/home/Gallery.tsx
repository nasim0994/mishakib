import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const galleries = [
  {
    _id: "1",
    image:
      "https://www.logoai.com/uploads/output/2025/04/19/0c61fa6a79a7055a4dfd9b288e882c41.jpg",
  },
  {
    _id: "2",
    image:
      "https://img.freepik.com/free-vector/quill-pen-logo-template_23-2149852429.jpg?semt=ais_hybrid&w=740",
  },
  {
    _id: "3",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/001/820/662/small_2x/business-banner-template-simple-geometric-style-vector.jpg",
  },
];

export default function Gallery() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container relative">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] bg-secondary/10 right-0 top-0"></div>

        <h2 className="font-medium text-2xl sm:text-3xl text-center">
          Gallery
        </h2>

        <div className="flex items-center justify-center mt-4">
          <Tabs defaultValue="logo">
            <div className="flex flex-wrap items-center justify-center mb-3">
              <div className="bg-secondary/5 backdrop-blur-[20px] border border-secondary/15 rounded-xl px-2 py-1">
                <TabsList>
                  <TabsTrigger value="logo">Logo Design</TabsTrigger>
                  <TabsTrigger value="post">Post Design</TabsTrigger>
                  <TabsTrigger value="banner">Banner Design</TabsTrigger>
                  <TabsTrigger value="id_card">ID Card Design</TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="logo">
              <PhotoProvider>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {galleries?.map((gallery) => (
                    <PhotoView key={gallery?._id} src={gallery?.image}>
                      <img
                        src={gallery?.image}
                        alt="gallery"
                        className="w-full block rounded-lg cursor-pointer"
                      />
                    </PhotoView>
                  ))}
                </div>
              </PhotoProvider>
            </TabsContent>
            <TabsContent value="post">Post Design</TabsContent>
            <TabsContent value="banner">Banner Design</TabsContent>
            <TabsContent value="id_card">Id Card Design</TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
