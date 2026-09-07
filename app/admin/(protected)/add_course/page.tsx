"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { addCourse } from "../../../../lib/courses";
import { auth } from "../../../../db_firebase/firebase";


export default function AdminCourses() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [course, setCourse] = useState({
    title: "",
    image: "",
    description1: "",
    description2: "",
    link: "",
    category: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/admin/login");
        return;
      }

    });

    return () => unsubscribe();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (
      !course.title ||
      !course.image ||
      !course.description1 ||
      !course.link ||
      !course.category
    ) {
      alert("Please fill all required fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      await addCourse(course);
      setCourse({
        title: "",
        image: "",
        description1: "",
        description2: "",
        link: "",
        category: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Upload Course
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={course.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={course.image}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            rows={4}
            name="description1"
            placeholder="Description 1"
            value={course.description1}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            rows={4}
            name="description2"
            placeholder="Description 2 (Optional)"
            value={course.description2}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="link"
            placeholder="Course URL"
            value={course.link}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="category"
            placeholder="Category (Frontend, AI, Design...)"
            value={course.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Uploading..." : "Upload Course"}
          </button>

        </form>
      </div>
    </div>
  );
}