
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BlogSectionProps {
  isChildMode: boolean;
}

const adultPosts = [
  {
    id: 1,
    title: "5 Household Items for Natural Pain Relief",
    excerpt: "Discover how common items in your home can be repurposed to soothe aches and pains without reaching for the medicine cabinet.",
    image: "/blog-image.svg",
    category: "Wellness",
    readTime: "4 min read",
  },
  {
    id: 2,
    title: "Creating Your Personal Home Wellness Space",
    excerpt: "Transform a corner of your home into a sanctuary for recovery and peace. We'll show you how.",
    image: "/blog-image.svg",
    category: "Recovery",
    readTime: "6 min read",
  },
];

const childPosts = [
  {
    id: 1,
    title: "The Magical Journey of Medicine in Your Body",
    excerpt: "Ever wonder what happens after you take your medicine? It's an amazing adventure that helps you get back to playing!",
    image: "/blog-image.svg",
    category: "Story Time",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Super Stretches for Super Kids!",
    excerpt: "Learn some fun and easy stretches that make your body feel strong, happy, and ready for action!",
    image: "/blog-image.svg",
    category: "Activities",
    readTime: "3 min read",
  },
];

const BlogSection = ({ isChildMode }: BlogSectionProps) => {
  const posts = isChildMode ? childPosts : adultPosts;

  return (
    <div className="px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-healscape-text-primary">
          {isChildMode ? "Fun Reads & Stories" : "From the HealScape Blog"}
        </h2>
        <a href="#" className="flex items-center text-sm font-semibold text-healscape-teal hover:underline">
          View All <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden card-hover border-none soft-shadow bg-white rounded-2xl">
            <CardContent className="p-0">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-healscape-teal mb-2">{post.category}</p>
                <h3 className="text-lg font-bold text-healscape-text-primary mb-2 leading-tight">{post.title}</h3>
                <p className="text-sm text-healscape-text-secondary mb-4">{post.excerpt}</p>
                <span className="text-xs text-healscape-gray-medium">{post.readTime}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
