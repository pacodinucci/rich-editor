import Link from "next/link";
import prisma from "@/lib/prisma";

interface Post {
  id: string;
  slug: string;
  title: string;
  createdAt: Date;
}

export const dynamic = "force-dynamic";

export default async function Blogs() {
  const posts: Post[] = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!posts || posts.length === 0) {
    return <div>No posts found.</div>;
  }

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <ul className="mt-6 flex flex-col gap-2">
          {posts.map((post: Post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
