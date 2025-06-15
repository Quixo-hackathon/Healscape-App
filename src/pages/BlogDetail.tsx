import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const adultPosts = [
  {
    id: "1",
    title: "5 Household Items for Natural Pain Relief",
    excerpt: "Discover how common items in your home can be repurposed to soothe aches and pains without reaching for the medicine cabinet.",
    image: "/blog-image.svg",
    category: "Wellness",
    readTime: "4 min read",
    content: "This is the full content for '5 Household Items for Natural Pain Relief'. You can expand on this with more details, tips, and scientific explanations. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "2",
    title: "Creating Your Personal Home Wellness Space",
    excerpt: "Transform a corner of your home into a sanctuary for recovery and peace. We'll show you how.",
    image: "/blog-image.svg",
    category: "Recovery",
    readTime: "6 min read",
    content: "This is the full content for 'Creating Your Personal Home Wellness Space'. Provide actionable steps, design ideas, and benefits of a dedicated wellness area. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
];

const childPosts = [
  {
    id: "1",
    title: "The Magical Journey of Medicine in Your Body",
    excerpt: "Ever wonder what happens after you take your medicine? It's an amazing adventure that helps you get back to playing!",
    image: "/blog-image.svg",
    category: "Story Time",
    readTime: "5 min read",
    content: "This is the full content for 'The Magical Journey of Medicine in Your Body'. Explain in a child-friendly way how medicine works, using analogies and engaging language. Include fun facts and illustrations. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: "2",
    title: "Super Stretches for Super Kids!",
    excerpt: "Learn some fun and easy stretches that make your body feel strong, happy, and ready for action!",
    image: "/blog-image.svg",
    category: "Activities",
    readTime: "3 min read",
    content: "This is the full content for 'Super Stretches for Super Kids!'. Describe simple, fun stretches with clear instructions and benefits for kids. Add playful names for each stretch. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
];

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Combine all posts and find the one matching the ID
  const allPosts = [...adultPosts, ...childPosts];
  const post = allPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-bg flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-healscape-text-primary mb-4">Blog Post Not Found</h1>
        <p className="text-lg text-healscape-text-secondary text-center max-w-2xl mb-8">
          The blog post you are looking for does not exist.
        </p>
        <Link to="/" className="mt-10">
          <button className="bg-healscape-teal hover:bg-healscape-teal/90 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-105">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-bg p-6 pt-10">
      <div className="flex items-center mb-6">
        <Link to="/" className="p-2 rounded-full hover:bg-white/50">
          <ArrowLeft size={20} className="text-healscape-text-primary" />
        </Link>
        <h1 className="text-2xl font-semibold text-healscape-text-primary ml-4">{post.title}</h1>
      </div>

      <div className="bg-white rounded-3xl p-6 soft-shadow mb-6">
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-2xl mb-6" />
        <p className="text-xs font-semibold uppercase tracking-wider text-healscape-teal mb-2">{post.category}</p>
        <p className="text-sm text-healscape-gray-medium mb-4">{post.readTime}</p>
        <p className="text-healscape-text-secondary text-base leading-relaxed">{post.content}</p>
      </div>

      <Link to="/" className="mt-6 block text-center">
        <button className="bg-healscape-teal hover:bg-healscape-teal/90 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-105">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default BlogDetail;