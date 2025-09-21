import { useState } from 'react';
import Navigation, { TabType } from '../Navigation';

export default function NavigationExample() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');

  return (
    <Navigation
      currentTab={currentTab}
      onTabChange={setCurrentTab}
      userXP={285}
      userLevel={2}
    />
  );
}