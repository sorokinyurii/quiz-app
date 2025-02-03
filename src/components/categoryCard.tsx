'use client'

import { Subject } from "@/types/subject";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  subject: Subject
}

export const CategoryCard: React.FC<Props> = ({ subject }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/quiz/${subject.name.toLowerCase()}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105"
    >
      <div className="overflow-hidden h-48 flex justify-center items-center">
        <Image
          src={subject.image}
          alt={`${subject.name} image`}
          width={100}
          height={100}
          className="  object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="p-4 bg-gradient-to-b from-white to-gray-50">

        <h2 className="text-2xl font-bold text-center text-black group-hover:text-blue-600 transition-colors duration-300">
          {subject.name}
        </h2>

        <p className="text-center text-gray-700 text-lg mt-2">
          {subject.questions.length} Questions
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
};
