"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  MessageSquare,
  BarChart,
  AlertCircle,
  CheckCircle,
  XCircle,
  Settings,
  TrendingUp,
} from "lucide-react";

const AdminDashboard = () => {
  // const [selectedTab, setSelectedTab] = useState("overview");

  const activityData = [
    { date: "2024-01-01", users: 120, posts: 45, comments: 89 },
    { date: "2024-01-02", users: 132, posts: 52, comments: 94 },
    { date: "2024-01-03", users: 128, posts: 48, comments: 91 },
    { date: "2024-01-04", users: 145, posts: 59, comments: 102 },
  ];

  const pendingContent = [
    {
      id: 1,
      type: "thread",
      title: "Best programming practices",
      author: "john_doe",
      status: "pending",
    },
    {
      id: 2,
      type: "comment",
      title: "Re: API Security",
      author: "jane_smith",
      status: "pending",
    },
    {
      id: 3,
      type: "poll",
      title: "Frontend frameworks survey",
      author: "tech_lead",
      status: "pending",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Platform management and analytics</p>
        </div>
        <Button>
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">Total Users</p>
                <h3 className="text-2xl font-bold">12,345</h3>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" /> +5.2% this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">Active Threads</p>
                <h3 className="text-2xl font-bold">892</h3>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" /> +3.1% this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">Active Polls</p>
                <h3 className="text-2xl font-bold">24</h3>
              </div>
              <BarChart className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2 flex items-center text-sm text-yellow-600">
              <AlertCircle className="h-4 w-4 mr-1" /> 3 ending soon
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">Pending Reviews</p>
                <h3 className="text-2xl font-bold">18</h3>
              </div>
              <AlertCircle className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2 text-sm text-red-600">Needs attention</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Moderation</TabsTrigger>
          <TabsTrigger value="polls">Polls Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Platform Activity</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" />
                  <Line type="monotone" dataKey="posts" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="comments" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Pending Content Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingContent.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge>{item.type}</Badge>
                        <h4 className="font-medium">{item.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">By {item.author}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
