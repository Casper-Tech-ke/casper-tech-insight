
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  url: string;
  tags: string[];
}

// Mock data for blog posts from GitHub
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Secure API Endpoints with CASPER TECH",
    description: "Learn how to create secure API endpoints with our latest security protocols.",
    date: "2023-09-20",
    url: "https://github.com/Casper-Tech-ke/api-security",
    tags: ["API", "Security", "Development"]
  },
  {
    id: 2,
    title: "Implementing Real-time Data with WebSockets",
    description: "A step-by-step guide to implementing real-time data streaming with WebSockets.",
    date: "2023-08-15",
    url: "https://github.com/Casper-Tech-ke/websocket-guide",
    tags: ["WebSockets", "Real-time", "Performance"]
  },
  {
    id: 3,
    title: "Modern UI Design Patterns for Web Apps",
    description: "Explore the latest UI design patterns for creating intuitive and engaging web applications.",
    date: "2023-07-28",
    url: "https://github.com/Casper-Tech-ke/ui-patterns",
    tags: ["UI", "Design", "Frontend"]
  }
];

const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  // In a real implementation, this would fetch data from GitHub API
  // For now, we'll use mock data
  return new Promise(resolve => {
    setTimeout(() => resolve(mockBlogPosts), 800);
  });
};

const BlogPosts = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: fetchBlogPosts
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-casper-800 dark:text-casper-200">From Our Blog</CardTitle>
        <CardDescription>Latest articles and updates from Casper Tech</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-pulse text-casper-600">Loading blog posts...</div>
          </div>
        ) : (
          <motion.div 
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {posts?.map((post) => (
              <motion.div 
                key={post.id} 
                variants={item}
                className="p-4 border rounded-lg hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-casper-100 dark:from-casper-800 dark:to-casper-900"
              >
                <h3 className="font-semibold text-casper-700 dark:text-casper-200">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{post.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-casper-100 dark:bg-casper-700 text-casper-700 dark:text-casper-200 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Posted on {new Date(post.date).toLocaleDateString()}
                  </div>
                  <a 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-casper-600 dark:text-casper-300 hover:underline"
                  >
                    View on GitHub →
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogPosts;
