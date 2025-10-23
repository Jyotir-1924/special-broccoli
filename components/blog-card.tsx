import Link from "next/link";

interface BlogCardProps {
  id: number;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  createdAt: Date;
}

export function BlogCard({ id, title, content, slug, published, createdAt }: BlogCardProps) {
  // Get excerpt (first 150 characters)
  const excerpt = content.length > 150 ? content.substring(0, 150) + "..." : content;
  
  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h2>
        {!published && (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
            Draft
          </span>
        )}
      </div>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{formattedDate}</span>
        <Link
          href={`/blog/${slug}`}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}