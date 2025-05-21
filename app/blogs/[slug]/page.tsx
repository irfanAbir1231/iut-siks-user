"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useUser, SignInButton } from "@clerk/nextjs";

interface Blog {
  _id: string;
  title: string;
  author: string;
  date: string;
  slug: string;
  content: string[];
}

const hardcodedComments = [
  { name: "Ali", message: "JazakAllah khair for this insightful post!" },
  { name: "Sara", message: "Very helpful tips, thank you!" },
];

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(hardcodedComments);
  const [likes, setLikes] = useState(0);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    async function fetchBlog() {
      const response = await fetch(`/api/blogs?slug=${slug}`);
      const data = await response.json();
      setBlog(data);
    }

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch(`/api/comments?blogId=${blog?._id}`);
      const data = await response.json();
      setComments(data);
    }

    if (blog) {
      fetchComments();
    }
  }, [blog]);

  async function handlePostComment(e: React.FormEvent) {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        name: user?.username || user?.firstName || 'Anonymous',
        message: comment,
        blogId: blog?._id,
        date: new Date().toISOString(),
      };

      // Optimistically update the UI
      setComments((prev) => [newComment, ...prev]);
      setComment('');

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        // Revert the optimistic update if the request fails
        setComments((prev) => prev.filter((c) => c !== newComment));
        console.error('Failed to post comment');
      }
    }
  }

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 flex flex-col items-center">
      <article className="bg-white rounded-2xl shadow-md border border-gray-200 max-w-2xl w-full p-8 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {blog.title}
        </h1>
        <div className="text-gray-500 text-sm mb-6">
          By {blog.author} •{" "}
          {new Date(blog.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="prose prose-blue max-w-none text-gray-800 mb-8">
          {blog.content.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
        <button
          onClick={() => setLikes((l) => l + 1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition-colors duration-150 mb-2"
        >
          👍 Like {likes > 0 && <span>({likes})</span>}
        </button>
      </article>
      <section className="bg-white rounded-2xl shadow border border-gray-200 max-w-2xl w-full p-8 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>
        {isSignedIn ? (
          <form onSubmit={handlePostComment} className="mb-6 flex flex-col gap-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:outline-none resize-none min-h-[80px]"
            />
            <button
              type="submit"
              className="self-end px-6 py-2 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition-colors duration-150"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <div className="mb-6 text-center text-blue-700 font-semibold">
            <SignInButton>
              <button className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition-colors duration-150">
                Please log in to post a comment
              </button>
            </SignInButton>
          </div>
        )}
        <ul className="flex flex-col gap-4">
          {(comments || []).map((c, idx) => (
            <li
              key={idx}
              className="border-l-4 border-blue-200 pl-4 py-2 bg-blue-50 rounded"
            >
              <span className="font-semibold text-blue-800">{c.name}:</span>{" "}
              <span className="text-gray-700">{c.message}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
