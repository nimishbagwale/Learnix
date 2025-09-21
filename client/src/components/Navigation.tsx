import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Home, Brain, MessageSquare, Star, Trophy, Moon, Sun } from "lucide-react";

export type TabType = 'dashboard' | 'quiz' | 'chat';

interface NavigationProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  userXP: number;
  userLevel: number;
}

export default function Navigation({ currentTab, onTabChange, userXP, userLevel }: NavigationProps) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    console.log(`Theme toggled to ${!isDark ? 'dark' : 'light'} mode`);
  };

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
    { id: 'quiz' as const, label: 'Quiz', icon: Brain },
    { id: 'chat' as const, label: 'AI Chat', icon: MessageSquare },
  ];

  return (
    <Card className="p-4 mb-6" data-testid="navigation-container">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gaming-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <h1 className="text-xl font-bold text-gaming-primary">GameLearn</h1>
          </div>
          
          <nav className="flex gap-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={currentTab === tab.id ? "default" : "ghost"}
                  onClick={() => onTabChange(tab.id)}
                  className="flex items-center gap-2"
                  data-testid={`button-nav-${tab.id}`}
                >
                  <IconComponent className="h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="flex items-center gap-1" data-testid="badge-user-level">
              <Trophy className="h-3 w-3" />
              Level {userLevel}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1" data-testid="badge-user-xp">
              <Star className="h-3 w-3" />
              {userXP} XP
            </Badge>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </Card>
  );
}