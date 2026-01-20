export async function generateMetadata({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/blogs`,
    { cache: "no-store" }
  );

  const result = await res.json();
  const blog = result.data.find(
    (b) => b.id === parseInt(params.id)
  );

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "Blog does not exist",
    };
  }

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `https://afrozakhanomrita.com/blog/${params.id}`, // 🔴 নিজের domain বসাও
      type: "article",
      images: [
        {
          url: blog.image, // 🔴 full public URL
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
  };
}

export default function BlogLayout({ children }) {
  return children;
}
