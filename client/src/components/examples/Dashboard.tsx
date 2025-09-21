import Dashboard from '../Dashboard';

export default function DashboardExample() {
  // Todo: remove mock data when implementing real backend
  const mockUser = {
    id: '1',
    name: 'Alex Chen',
    xp: 285,
    level: 2,
    badges: ['Eco Warrior', 'Quiz Master'],
    quizzesCompleted: 8,
    chatMessages: 23,
  };

  const mockLeaderboard = [
    { id: '2', name: 'Emma Johnson', xp: 450, level: 4, badges: [], quizzesCompleted: 0, chatMessages: 0 },
    { id: '3', name: 'Marcus Rodriguez', xp: 380, level: 3, badges: [], quizzesCompleted: 0, chatMessages: 0 },
    { id: '1', name: 'Alex Chen', xp: 285, level: 2, badges: [], quizzesCompleted: 0, chatMessages: 0 },
    { id: '4', name: 'Sophie Kim', xp: 220, level: 2, badges: [], quizzesCompleted: 0, chatMessages: 0 },
    { id: '5', name: 'David Park', xp: 180, level: 1, badges: [], quizzesCompleted: 0, chatMessages: 0 },
  ];

  return <Dashboard user={mockUser} leaderboard={mockLeaderboard} />;
}