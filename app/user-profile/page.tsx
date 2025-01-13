"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, MessageSquare, Award, Activity } from "lucide-react";

const UserProfile = () => {
  // const [activeTab, setActiveTab] = useState("posts");

  const userData = {
    name: "Alex Johnson",
    username: "@alexj",
    joinDate: "January 2024",
    bio: "Full-stack developer passionate about building community tools",
    avatar: "/api/placeholder/128/128",
    stats: {
      posts: 142,
      replies: 489,
      likes: "1.2k",
    },
    badges: ["Early Adopter", "Top Contributor", "Bug Hunter", "Helpful Hero"],
    recentActivity: [
      {
        type: "post",
        title: "Best practices for React hooks",
        date: "2 days ago",
      },
      {
        type: "reply",
        title: "Re: API Authentication methods",
        date: "4 days ago",
      },
      {
        type: "badge",
        title: 'Earned "Helpful Hero" badge',
        date: "1 week ago",
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative group">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-32 h-32 rounded-full"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{userData.name}</h1>
                  <p className="text-gray-600 mb-2">{userData.username}</p>
                  <p className="text-sm text-gray-500">
                    Member since {userData.joinDate}
                  </p>
                </div>
                <Button>Edit Profile</Button>
              </div>

              <p className="mt-4 text-gray-700">{userData.bio}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {userData.badges.map((badge) => (
                  <Badge key={badge} variant="secondary">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">{userData.stats.posts}</div>
              <div className="text-gray-600">Posts</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">{userData.stats.replies}</div>
              <div className="text-gray-600">Replies</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">{userData.stats.likes}</div>
              <div className="text-gray-600">Likes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="activity" className="w-full">
        <TabsList>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" /> Activity
          </TabsTrigger>
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Posts
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex items-center gap-2">
            <Award className="h-4 w-4" /> Badges
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardContent className="p-6">
              {userData.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 py-4 border-b last:border-0"
                >
                  <div className="flex-grow">
                    <h3 className="font-medium">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
