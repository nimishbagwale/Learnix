import { useState } from "react";
import Navigation, { TabType } from "./Navigation";
import Dashboard from "./Dashboard";
import QuizModule from "./QuizModule";
import ChatModule from "./ChatModule";

// Todo: remove mock data when implementing real backend
const mockQuestions = [
  {
    id: 1,
    question: "What does 'FPS' stand for in gaming?",
    options: [
      "First Person Shooter",
      "Frames Per Second",
      "Fast Paced Strategy",
      "Final Player Score"
    ],
    correctAnswer: 1,
    explanation: "FPS stands for Frames Per Second, which measures how many individual frames are displayed per second in a video game, affecting the smoothness of gameplay."
  },
  {
    id: 2,
    question: "Which programming language is most commonly used for web development?",
    options: [
      "Python",
      "Java",
      "JavaScript",
      "C++"
    ],
    correctAnswer: 2,
    explanation: "JavaScript is the most commonly used programming language for web development, as it runs in all web browsers and enables interactive web pages."
  },
  {
    id: 3,
    question: "What is the largest planet in our solar system?",
    options: [
      "Saturn",
      "Neptune",
      "Jupiter",
      "Earth"
    ],
    correctAnswer: 2,
    explanation: "Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined and a diameter of about 88,695 miles."
  },
  {
    id: 4,
    question: "In gaming, what does 'RPG' stand for?",
    options: [
      "Rapid Pulse Gaming",
      "Role Playing Game",
      "Real Player Graphics",
      "Random Point Generator"
    ],
    correctAnswer: 1,
    explanation: "RPG stands for Role Playing Game, a genre where players assume the roles of characters and make decisions that affect the story and character development."
  },
  {
    id: 5,
    question: "What is the speed of light in a vacuum?",
    options: [
      "299,792,458 meters per second",
      "150,000,000 meters per second",
      "300,000,000 meters per second",
      "186,000 miles per hour"
    ],
    correctAnswer: 0,
    explanation: "The speed of light in a vacuum is exactly 299,792,458 meters per second, which is a fundamental constant of nature used in physics."
  },
  {
    id: 6,
    question: "Which company developed the game 'Minecraft'?",
    options: [
      "Electronic Arts",
      "Mojang Studios",
      "Blizzard Entertainment",
      "Valve Corporation"
    ],
    correctAnswer: 1,
    explanation: "Minecraft was developed by Mojang Studios (originally Mojang AB), founded by Markus Persson. Microsoft later acquired Mojang in 2014."
  },
  {
    id: 7,
    question: "What is the binary representation of the decimal number 8?",
    options: [
      "1010",
      "1000",
      "1100",
      "0111"
    ],
    correctAnswer: 1,
    explanation: "The decimal number 8 in binary is 1000. Binary uses only 0s and 1s, and 1000 represents 1×8 + 0×4 + 0×2 + 0×1 = 8."
  },
  {
    id: 8,
    question: "Which element has the chemical symbol 'Au'?",
    options: [
      "Silver",
      "Aluminum",
      "Gold",
      "Argon"
    ],
    correctAnswer: 2,
    explanation: "Gold has the chemical symbol 'Au', which comes from the Latin word 'aurum' meaning gold. It's element number 79 on the periodic table."
  },
  {
    id: 9,
    question: "What does 'CPU' stand for in computer hardware?",
    options: [
      "Computer Processing Unit",
      "Central Processing Unit",
      "Core Performance Unit",
      "Central Program Unit"
    ],
    correctAnswer: 1,
    explanation: "CPU stands for Central Processing Unit, which is the main component of a computer that performs most processing tasks and executes instructions."
  },
  {
    id: 10,
    question: "Which gaming platform was first to introduce achievements/trophies?",
    options: [
      "PlayStation Network",
      "Steam",
      "Xbox Live",
      "Nintendo Network"
    ],
    correctAnswer: 2,
    explanation: "Xbox Live was the first major gaming platform to introduce achievements in 2005, which became a popular feature later adopted by other platforms."
  }
];

export default function EcoLearnApp() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  
  // Todo: remove mock user data when implementing real backend
  const [user, setUser] = useState({
    id: '1',
    name: 'Alex Chen',
    xp: 285,
    level: 2,
    badges: ['Gaming Warrior', 'Quiz Champion'],
    quizzesCompleted: 8,
    chatMessages: 23,
  });

  // Todo: remove mock leaderboard when implementing real backend
  const [leaderboard] = useState([
    { id: '2', name: 'Emma Johnson', xp: 450, level: 4, badges: [], quizzesCompleted: 0, chatMessages: 0 },
    { id: '3', name: 'Marcus Rodriguez', xp: 380, level: 3, badges: [], quizzesCompleted: 0, chatMessages: 0 },
    { id: '1', name: 'Alex Chen', xp: 285, level: 2, badges: [], quizzesCompleted: 0, chatMessages: 0 },
    { id: '4', name: 'Sophie Kim', xp: 220, level: 2, badges: [], quizzesCompleted: 0, chatMessages: 0 },
    { id: '5', name: 'David Park', xp: 180, level: 1, badges: [], quizzesCompleted: 0, chatMessages: 0 },
    { id: '6', name: 'Lisa Wang', xp: 165, level: 1, badges: [], quizzesCompleted: 0, chatMessages: 0 },
    { id: '7', name: 'Ryan O\'Connor', xp: 140, level: 1, badges: [], quizzesCompleted: 0, chatMessages: 0 },
  ]);

  const handleQuizComplete = (score: number, xpEarned: number) => {
    setUser(prevUser => {
      const newXP = prevUser.xp + xpEarned;
      const newLevel = Math.floor(newXP / 100);
      const newQuizzesCompleted = prevUser.quizzesCompleted + 1;
      
      // Check for new badges
      const newBadges = [...prevUser.badges];
      if (newLevel >= 5 && !newBadges.includes('Game Guardian')) {
        newBadges.push('Game Guardian');
      }
      if (newQuizzesCompleted >= 10 && !newBadges.includes('Knowledge Hunter')) {
        newBadges.push('Knowledge Hunter');
      }
      
      console.log(`Quiz completed! Score: ${score}, XP: +${xpEarned}, New Level: ${newLevel}`);
      
      return {
        ...prevUser,
        xp: newXP,
        level: newLevel,
        badges: newBadges,
        quizzesCompleted: newQuizzesCompleted,
      };
    });
  };

  const handleMessageSent = (messageCount: number, xpEarned: number) => {
    setUser(prevUser => {
      const newXP = prevUser.xp + xpEarned;
      const newLevel = Math.floor(newXP / 100);
      
      // Check for chat-related badges
      const newBadges = [...prevUser.badges];
      if (messageCount >= 50 && !newBadges.includes('Chat Legend')) {
        newBadges.push('Chat Legend');
      }
      
      console.log(`Message sent! XP: +${xpEarned}, Total messages: ${messageCount}, New Level: ${newLevel}`);
      
      return {
        ...prevUser,
        xp: newXP,
        level: newLevel,
        badges: newBadges,
        chatMessages: messageCount,
      };
    });
  };

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard user={user} leaderboard={leaderboard} />;
      case 'quiz':
        return <QuizModule questions={mockQuestions} onQuizComplete={handleQuizComplete} />;
      case 'chat':
        return <ChatModule onMessageSent={handleMessageSent} />;
      default:
        return <Dashboard user={user} leaderboard={leaderboard} />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4" data-testid="app-container">
      <div className="max-w-6xl mx-auto">
        <Navigation
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          userXP={user.xp}
          userLevel={user.level}
        />
        
        <main data-testid="main-content">
          {renderCurrentTab()}
        </main>
      </div>
    </div>
  );
}