import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link } from "wouter";

// Mock blog posts
const blogPosts = [
  {
    id: 1,
    title: "5 Cybersecurity Best Practices for Small Businesses",
    excerpt: "Discover the essential cybersecurity practices that every small business should implement to protect their data and systems.",
    date: "April 2, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Best Practices",
  },
  {
    id: 2,
    title: "Understanding Ransomware Attacks and How to Prevent Them",
    excerpt: "Learn how ransomware attacks work and what steps you can take to protect your business from becoming a victim.",
    date: "March 28, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Threats",
  },
  {
    id: 3,
    title: "The Importance of Employee Security Training",
    excerpt: "Find out why human error is one of the biggest cybersecurity risks and how proper training can mitigate this threat.",
    date: "March 15, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Training",
  },
  {
    id: 4,
    title: "Securing Your Remote Workforce: A Complete Guide",
    excerpt: "With more businesses operating remotely, learn how to secure your remote workforce and protect your company data.",
    date: "March 10, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Remote Work",
  },
  {
    id: 5,
    title: "How to Respond to a Data Breach: Step-by-Step",
    excerpt: "Discover the critical steps to take immediately following a data breach to minimize damage and recover quickly.",
    date: "February 27, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Incident Response",
  },
  {
    id: 6,
    title: "The Small Business Guide to Compliance Requirements",
    excerpt: "Navigate the complex world of cybersecurity compliance regulations that apply to small businesses.",
    date: "February 18, 2025",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Compliance",
  },
];

export default function Blog() {
  // Animation effect on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll(".blog-card");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-[#1A1A1A] text-[#F5F5F5]">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-[#242424] to-[#1A1A1A]">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#ADFF6C]">
              Security Resources & Blog
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              Latest insights, guides, and tips to keep your small business protected from cyber threats.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-[#ADFF6C] text-[#1A1A1A] hover:bg-[#8DCC4C]">
                Latest Articles
              </Button>
              <Button variant="outline" className="border-[#ADFF6C] text-[#ADFF6C]">
                Security Guides
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="bg-[#242424] rounded-xl overflow-hidden shadow-xl transition-transform duration-300 hover:transform hover:scale-[1.01] border border-[#ADFF6C]/10">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src="https://images.unsplash.com/photo-1614064642639-e398cf05badb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Featured Post"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block bg-[#ADFF6C]/20 text-[#ADFF6C] px-3 py-1 text-sm font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-[#ADFF6C]">
                    2025 Cybersecurity Trends Every Small Business Should Know
                  </h2>
                  <p className="text-gray-300 mb-6">
                    The cybersecurity landscape is constantly evolving. Stay ahead of the threats with our comprehensive 
                    guide to the latest trends and technologies that will impact small businesses in 2025.
                  </p>
                  <div className="flex items-center text-sm text-gray-400 mb-6">
                    <span>April 4, 2025</span>
                    <span className="mx-2">•</span>
                    <span>12 min read</span>
                  </div>
                  <Button className="bg-[#ADFF6C] text-[#1A1A1A] hover:bg-[#8DCC4C] self-start">
                    Read Article
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-[#ADFF6C]">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="blog-card opacity-0 bg-[#242424] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:scale-[1.03] border border-[#ADFF6C]/10"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="inline-block bg-[#ADFF6C]/20 text-[#ADFF6C] px-3 py-1 text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#F5F5F5]">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {post.date} • {post.readTime}
                      </div>
                      <Button
                        variant="ghost"
                        className="text-[#ADFF6C] hover:text-[#8DCC4C] p-0"
                      >
                        Read More →
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-[#ADFF6C] text-[#ADFF6C]"
              >
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-[#1A1A1A] to-[#242424]">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#ADFF6C]">
              Subscribe to Our Security Newsletter
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Get the latest cybersecurity insights, tips, and updates delivered straight to your inbox.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-6 py-3 rounded-md bg-[#333] border border-[#444] text-white flex-grow max-w-md"
              />
              <Button className="bg-[#ADFF6C] text-[#1A1A1A] hover:bg-[#8DCC4C] px-6 py-3">
                Subscribe
              </Button>
            </div>
            <p className="text-xs mt-4 text-gray-400">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-[#242424]">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-gradient-to-r from-[#333] to-[#222] rounded-2xl p-8 md:p-12 shadow-xl border border-[#ADFF6C]/20">
              <div className="md:flex items-center justify-between">
                <div className="md:w-2/3 mb-8 md:mb-0">
                  <h2 className="text-3xl font-bold mb-4 text-[#ADFF6C]">
                    Ready to Secure Your Business?
                  </h2>
                  <p className="text-gray-300 text-xl mb-4">
                    Take the first step toward comprehensive cybersecurity protection with HackSnub.
                  </p>
                  <p className="text-gray-400">
                    No technical expertise required. Simple, affordable, and built for small businesses.
                  </p>
                </div>
                <div>
                  <Link href="#contact">
                    <Button className="bg-[#ADFF6C] text-[#1A1A1A] hover:bg-[#8DCC4C] text-lg px-8 py-4">
                      Get Started Today
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}