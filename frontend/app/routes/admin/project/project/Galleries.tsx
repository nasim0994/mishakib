import { Input } from "@/components/ui/input";
import { FaTrash, FaPlus } from "react-icons/fa";

export interface IGallery {
  title: string;
  link: string;
}

interface IProps {
  galleries: IGallery[];
  setGalleries: React.Dispatch<React.SetStateAction<IGallery[]>>;
}

export default function Galleries({ galleries, setGalleries }: IProps) {
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setGalleries((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  const handleAddFields = () => {
    if (isFormValid()) {
      setGalleries([...galleries, { title: "", link: "" }]);
    } else {
      alert("Please fill all fields before adding a new one.");
    }
  };

  const handleRemoveFields = (index: number) => {
    const values = [...galleries];
    values.splice(index, 1);
    setGalleries(values);
  };

  const isFormValid = () => {
    return galleries.every(
      (entry: IGallery) => entry.title !== "" && entry.link !== ""
    );
  };

  return (
    <div className="flex flex-col gap-3 border border-gray-200 rounded p-3">
      {galleries?.map((skill: IGallery, index: number) => (
        <div key={index} className="flex gap-2 text-sm">
          <Input
            type="text"
            name="title"
            placeholder="Name"
            value={skill.title}
            onChange={(event) => handleInputChange(index, event)}
          />
          <Input
            type="text"
            name="link"
            placeholder="url"
            value={skill.link}
            onChange={(event) => handleInputChange(index, event)}
          />
          <button
            type="button"
            onClick={() => handleRemoveFields(index)}
            className="w-20 bg-red-500 text-white rounded-md flex items-center justify-center"
          >
            <FaTrash />
          </button>
        </div>
      ))}

      <div>
        <button
          type="button"
          onClick={handleAddFields}
          disabled={galleries?.length > 0 && !isFormValid()}
          className="bg-gray-500 px-4 py-2 text-base-100 rounded text-sm flex items-center gap-2"
        >
          <FaPlus className="text-xs" /> Add More Gallery
        </button>
      </div>
    </div>
  );
}
