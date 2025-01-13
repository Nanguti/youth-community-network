"use client";

"use client";

import { useState, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  BugPlay,
  Lightbulb,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ContactUs: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Contact & Feedback</h1>
        <p className="text-gray-600">We'd love to hear from you</p>
      </div>

      <Tabs defaultValue="contact" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Contact
          </TabsTrigger>
          <TabsTrigger value="bug" className="flex items-center gap-2">
            <BugPlay className="h-4 w-4" /> Report Bug
          </TabsTrigger>
          <TabsTrigger value="feature" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" /> Feature Request
          </TabsTrigger>
        </TabsList>
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-4">
                    Your message has been sent successfully.
                  </p>
                  <Button onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <input
                        type="text"
                        required
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <input
                        type="text"
                        required
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">
                          Technical Support
                        </SelectItem>
                        <SelectItem value="billing">
                          Billing Question
                        </SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      required
                      className="w-full p-2 border rounded-md min-h-32"
                      placeholder="Type your message here..."
                    />
                  </div>

                  {submitError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        There was an error sending your message. Please try
                        again.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bug">
          <Card>
            <CardHeader>
              <CardTitle>Report a Bug</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bug Title</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border rounded-md"
                    placeholder="Brief description of the bug"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Steps to Reproduce
                  </label>
                  <textarea
                    required
                    className="w-full p-2 border rounded-md min-h-32"
                    placeholder="1. Step one&#10;2. Step two&#10;3. Step three"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Expected Behavior
                  </label>
                  <textarea
                    required
                    className="w-full p-2 border rounded-md"
                    placeholder="What should happen?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Actual Behavior</label>
                  <textarea
                    required
                    className="w-full p-2 border rounded-md"
                    placeholder="What actually happened?"
                  />
                </div>

                <Button type="submit" className="w-full">
                  <BugPlay className="mr-2 h-4 w-4" /> Submit Bug Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="feature">
          <Card>
            <CardHeader>
              <CardTitle>Request a Feature</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Feature Title</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border rounded-md"
                    placeholder="Name your feature request"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    required
                    className="w-full p-2 border rounded-md min-h-32"
                    placeholder="Describe the feature you'd like to see..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Use Case</label>
                  <textarea
                    required
                    className="w-full p-2 border rounded-md"
                    placeholder="How would this feature be useful?"
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Lightbulb className="mr-2 h-4 w-4" /> Submit Feature Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>{" "}
      </Tabs>
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-medium mb-1">Email Support</h3>
              <p className="text-sm text-gray-600">support@example.com</p>
            </div>
            <div>
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-medium mb-1">Phone Support</h3>
              <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div>
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-medium mb-1">Live Chat</h3>
              <p className="text-sm text-gray-600">Available 24/7</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUs;
