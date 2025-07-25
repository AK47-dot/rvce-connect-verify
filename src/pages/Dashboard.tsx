import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  BookOpen, 
  Bell, 
  Settings,
  Search,
  Plus,
  Hash,
  User
} from 'lucide-react';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  // Mock user data - in real app this would come from auth/API
  const user = {
    name: "Anup Kothari",
    email: "anupkothari.me24@rvce.edu.in",
    branch: "ME",
    semester: 5,
    section: "A",
    avatar: ""
  };

  const communities = [
    { id: 1, name: "ME Branch Community", members: 240, online: 45, unread: 3 },
    { id: 2, name: "Semester 5 Group", members: 180, online: 32, unread: 7 },
    { id: 3, name: "Section A", members: 60, online: 15, unread: 2 },
    { id: 4, name: "Study Group - Thermodynamics", members: 25, online: 8, unread: 0 },
  ];

  const recentActivity = [
    { id: 1, user: "Priya Sharma", action: "shared notes", target: "Heat Transfer", time: "2 hours ago" },
    { id: 2, user: "Rahul Kumar", action: "posted in", target: "ME Branch Community", time: "4 hours ago" },
    { id: 3, user: "Sneha Patel", action: "created event", target: "Study Session", time: "6 hours ago" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Thermodynamics Quiz", date: "Tomorrow, 10:00 AM", community: "Semester 5" },
    { id: 2, title: "Lab Session - Manufacturing", date: "Friday, 2:00 PM", community: "ME Branch" },
    { id: 3, title: "Study Group Meeting", date: "Saturday, 4:00 PM", community: "Section A" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold gradient-text">RVCE Connect</h1>
              <Badge variant="secondary">{user.branch} • Sem {user.semester} • Sec {user.section}</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Welcome back, {user.name}!
                </CardTitle>
                <CardDescription>
                  Stay connected with your branch, semester, and section communities
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Communities */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Your Communities
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Join Community
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {communities.map((community) => (
                    <div key={community.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Hash className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{community.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {community.members} members • {community.online} online
                          </p>
                        </div>
                      </div>
                      {community.unread > 0 && (
                        <Badge variant="default" className="text-xs">
                          {community.unread}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {activity.user.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                          <span className="text-primary">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start New Chat
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Share Notes
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 rounded-lg bg-accent/5">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {event.community}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;