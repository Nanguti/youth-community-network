import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "10+ years experience in community building",
      avatar: "/avatar.jpg",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      bio: "Full-stack developer with expertise in React",
      avatar: "/avatar.jpg",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Elena Rodriguez",
      role: "Community Manager",
      bio: "Passionate about building inclusive communities",
      avatar: "/avatar.jpg",
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },
  ];

  const testimonials = [
    {
      text: "This platform has transformed how our team collaborates and shares knowledge.",
      author: "Alex Kim",
      role: "Senior Developer",
      company: "Tech Corp",
    },
    {
      text: "The community here is incredibly supportive and knowledgeable.",
      author: "Maria Garcia",
      role: "Product Manager",
      company: "Innovation Labs",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Building the Future of Community
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We are on a mission to create the most engaging and supportive
          community platform for developers and tech enthusiasts.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To foster a collaborative environment where knowledge sharing and
              learning thrive, enabling developers to grow together and build
              amazing things.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To become the go-to platform for developers seeking community,
              knowledge, and growth opportunities in their tech journey.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name}>
              <CardContent className="p-6 text-center">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={24}
                  height={24}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex justify-center gap-4">
                  {member.social.twitter && (
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-5 w-5" />
                    </Button>
                  )}
                  {member.social.linkedin && (
                    <Button variant="ghost" size="icon">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  )}
                  {member.social.github && (
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <p className="text-lg mb-4 italic">
                  &quot;{testimonial.text}&quot;
                </p>{" "}
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center pt-16 pb-32">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6">
          Have questions? We would love to hear from you.
        </p>
        <div className="flex justify-center gap-4">
          <Button>
            <Mail className="mr-2 h-4 w-4" /> Contact Us
          </Button>
          <Button variant="outline">Join Our Team</Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
