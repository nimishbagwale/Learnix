import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, MessageSquare, Brain, Award, Leaf } from "lucide-react";
import heroImage from "@assets/generated_images/Gaming_setup_hero_image_d37d63e5.png";

interface User {
  id: string;
  name: string;
  xp: number;
  level: number;
  badges: string[];
  quizzesCompleted: number;
  chatMessages: number;
}

interface DashboardProps {
  user: User;
  leaderboard: User[];
}

export default function Dashboard({ user, leaderboard }: DashboardProps) {
  const nextLevelXP = (user.level + 1) * 100;
  const currentLevelXP = user.level * 100;
  const progressPercent = ((user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  const badgeIcons = {
    "Gaming Warrior": Leaf,
    "Quiz Champion": Brain,
    "Chat Legend": MessageSquare,
    "Knowledge Hunter": Star,
    "Game Guardian": Award,
  };

  return (
    <div className="space-y-6" data-testid="dashboard-container">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden">
        <img 
          src={heroImage} 
          alt="Environmental education students learning outdoors"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-2" data-testid="text-welcome">Welcome back, {user.name}!</h1>
            <p className="text-lg opacity-90">Continue your epic learning adventure</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover-elevate" data-testid="card-xp">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
            <Star className="h-4 w-4 text-gaming-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gaming-primary" data-testid="text-xp">{user.xp}</div>
            <p className="text-xs text-muted-foreground">
              {nextLevelXP - user.xp} XP to next level
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate" data-testid="card-level">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level</CardTitle>
            <Trophy className="h-4 w-4 text-gaming-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gaming-primary" data-testid="text-level">{user.level}</div>
            <Progress value={progressPercent} className="mt-2" data-testid="progress-level" />
          </CardContent>
        </Card>

        <Card className="hover-elevate" data-testid="card-quizzes">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
            <Brain className="h-4 w-4 text-gaming-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gaming-accent" data-testid="text-quizzes">{user.quizzesCompleted}</div>
            <p className="text-xs text-muted-foreground">
              Keep learning!
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate" data-testid="card-chat">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chat Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-gaming-neon" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gaming-neon" data-testid="text-chat-messages">{user.chatMessages}</div>
            <p className="text-xs text-muted-foreground">
              {5 - (user.chatMessages % 5)} until next eco tip
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Badges and Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badges */}
        <Card data-testid="card-badges">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-gaming-warning" />
              Your Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user.badges.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {user.badges.map((badge, index) => {
                  const IconComponent = badgeIcons[badge as keyof typeof badgeIcons] || Award;
                  return (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-2 justify-center p-3 h-auto"
                      data-testid={`badge-${badge.toLowerCase().replace(' ', '-')}`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="text-xs">{badge}</span>
                    </Badge>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Award className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No badges earned yet</p>
                <p className="text-sm">Complete quests to unlock your first achievement!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card data-testid="card-leaderboard">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-gaming-warning" />
              Top Learners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.slice(0, 5).map((leader, index) => (
                <div
                  key={leader.id}
                  className="flex items-center justify-between p-2 rounded-lg hover-elevate"
                  data-testid={`leaderboard-rank-${index + 1}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-gaming-electric text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-amber-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={leader.id === user.id ? 'font-semibold text-gaming-primary' : ''}>
                      {leader.name}
                    </span>
                  </div>
                  <div className="text-sm font-medium" data-testid={`text-leader-xp-${index}`}>
                    {leader.xp} XP
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}