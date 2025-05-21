"use client";
import { useState } from "react";

export default function SubmitBlogPage() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    commentsCount: 0,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Blog Submission:", form);
    // Optionally reset form or show a message
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
        Submit Your Blog
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-8 w-full max-w-lg flex flex-col gap-6 border border-gray-200"
      >
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Blog Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="author"
          >
            Author Name
          </label>
          <input
            id="author"
            name="author"
            type="text"
            value={form.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="content"
          >
            Blog Content
          </label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:outline-none min-h-[120px] resize-vertical"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors duration-150 mt-2"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
