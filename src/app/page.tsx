"use client";

import { CategoryCard } from "@/components/categoryCard";
import { Loader } from "@/components/loader";
import { Subject } from "@/types/subject";
import { useEffect, useState } from "react";

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const fetchSubjects = async () => {
    const response = await fetch("/data/questions.json");

    if (response.ok) {
      const data = await response.json();
      setSubjects(data.subjects);
    } else {
      console.error("Failed to fetch subjects");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Welcome to the Quiz App
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Select a subject to get started and test your knowledge!
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-screen-lg">
        {subjects.length > 0 ? (
          subjects.map((subject) => (
            <CategoryCard key={subject.name} subject={subject} />
          ))
        ) : (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center items-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
