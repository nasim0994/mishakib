import { Input } from "@/components/ui/input";
import { FaTrash, FaPlus } from "react-icons/fa";

export interface ISkill {
  title: string;
  logo: string;
}

interface IProps {
  skills: ISkill[];
  setSkills: React.Dispatch<React.SetStateAction<ISkill[]>>;
}

export default function Skills({ skills, setSkills }: IProps) {
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setSkills((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  const handleAddFields = () => {
    if (isFormValid()) {
      setSkills([...skills, { title: "", logo: "" }]);
    } else {
      alert("Please fill all fields before adding a new one.");
    }
  };

  const handleRemoveFields = (index: number) => {
    const values = [...skills];
    values.splice(index, 1);
    setSkills(values);
  };

  const isFormValid = () => {
    return skills.every(
      (entry: ISkill) => entry.title !== "" && entry.logo !== ""
    );
  };

  return (
    <div className="flex flex-col gap-3 border border-gray-200 rounded p-3">
      {skills?.map((skill: ISkill, index: number) => (
        <div key={index} className="flex gap-2 text-sm">
          <Input
            type="text"
            name="title"
            placeholder="Name (e.g., PS, AI)"
            value={skill.title}
            onChange={(event) => handleInputChange(index, event)}
          />
          <Input
            type="text"
            name="logo"
            value={skill.logo}
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
          disabled={skills?.length > 0 && !isFormValid()}
          className="bg-gray-500 px-4 py-2 text-base-100 rounded text-sm flex items-center gap-2"
        >
          <FaPlus className="text-xs" /> Add More Skill
        </button>
      </div>
    </div>
  );
}
