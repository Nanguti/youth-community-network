"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Users,
  Globe,
  ChevronRight,
  Star,
  ArrowRight,
} from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const HomePage = () => {
  const [activeUsers] = useState(1234);
  // const [activePosts] = useState(856);
  const [activeTab, setActiveTab] = useState("all");
  // const { scrollYProgress } = useScroll();
  // const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Student Leader",
      image: "/api/placeholder/40/40",
      content:
        "This platform has transformed how I connect with other young leaders globally.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "Youth Activist",
      image: "/api/placeholder/40/40",
      content:
        "The collaborative features and global reach make this platform uniquely powerful.",
      rating: 5,
    },
    {
      name: "Miguel Rodriguez",
      role: "Community Builder",
      image: "/api/placeholder/40/40",
      content:
        "I've met amazing people and launched incredible projects through this platform.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-white">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-300 rounded-full
           mix-blend-multiply filter blur-xl opacity-70 animate-blob"
          />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full 
          mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
          />
          <div
            className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full 
          mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
          />
        </div>

        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid 
        lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect. Share. <span className="text-pink-600">Grow.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join the world most vibrant youth community platform where ideas
              flourish and connections thrive.
            </p>
            <div className="flex gap-4 mb-8">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                Join Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {activeUsers.toLocaleString()} active users
              </span>
              <span className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                120+ countries
              </span>
            </div>
          </motion.div>

          {/* Animated Globe SVG replacement */}
          <div className="relative h-[400px] hidden lg:block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <linearGradient
                    id="globe-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#4338ca" />
                  </linearGradient>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="url(#globe-gradient)"
                  opacity="0.9"
                />
                {/* Grid lines */}
                {[...Array(8)].map((_, i) => (
                  <path
                    key={`horizontal-${i}`}
                    d={`M 20 ${25 + i * 20} Q 100 ${20 + i * 20}, 180 ${
                      25 + i * 20
                    }`}
                    fill="none"
                    stroke="#9089fc"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                ))}
                {[...Array(8)].map((_, i) => (
                  <path
                    key={`vertical-${i}`}
                    d={`M ${25 + i * 20} 20 Q ${20 + i * 20} 100, ${
                      25 + i * 20
                    } 180`}
                    fill="none"
                    stroke="#9089fc"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                ))}
                {/* Connection points */}
                {[...Array(12)].map((_, i) => (
                  <motion.circle
                    key={`point-${i}`}
                    cx={80 + Math.random() * 40}
                    cy={80 + Math.random() * 40}
                    r="2"
                    fill="#ffffff"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Rest of the components remain the same */}
      {/* Interactive Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Discover What is Trending
          </h2>
          <div className="flex justify-center gap-4 mb-8">
            {["all", "discussions", "projects", "events"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? "bg-pink-600" : ""}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-white shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`/api/placeholder/40/40`} />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Username</h3>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <Badge variant="secondary">{activeTab}</Badge>
              </div>
              <p className="text-gray-600 mb-4">
                {activeTab === "discussions"
                  ? "Join the conversation about climate change initiatives"
                  : activeTab === "projects"
                  ? "New community project launched in Southeast Asia"
                  : activeTab === "events"
                  ? "Upcoming virtual summit on youth leadership"
                  : "Latest trending topic in the community"}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-gray-500 text-sm">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" /> 24
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4" /> 15
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-b from-white to-indigo-50 pt-16 pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of young leaders who are already making a
              difference.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image} />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default HomePage;
