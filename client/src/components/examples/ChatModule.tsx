import ChatModule from '../ChatModule';

export default function ChatModuleExample() {
  const handleMessageSent = (messageCount: number, xpEarned: number) => {
    console.log(`Message sent! Total: ${messageCount}, XP earned: ${xpEarned}`);
  };

  return <ChatModule onMessageSent={handleMessageSent} />;
}