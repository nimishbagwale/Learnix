import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User, Lightbulb, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isEcoTip?: boolean;
}

interface ChatModuleProps {
  onMessageSent?: (messageCount: number, xpEarned: number) => void;
}

export default function ChatModule({ onMessageSent }: ChatModuleProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your gaming and learning assistant! Ask me anything about games, education strategies, achievements, or any topic you want to explore!",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Todo: remove mock eco tips when implementing real backend
  const ecoTips = [
    "💡 Eco Tip: Replace plastic water bottles with a reusable one to save money and reduce waste!",
    "🌱 Eco Tip: Unplug electronics when not in use - they consume energy even when turned off!",
    "♻️ Eco Tip: Start composting food scraps to reduce waste and create nutrient-rich soil!",
    "🚲 Eco Tip: Try walking, biking, or using public transport instead of driving when possible!",
    "💧 Eco Tip: Take shorter showers to conserve water - even 2 minutes less makes a difference!",
    "🌿 Eco Tip: Choose products with minimal packaging to reduce waste!",
    "⚡ Eco Tip: Switch to LED light bulbs - they use 75% less energy than traditional bulbs!",
    "🌍 Eco Tip: Buy local and seasonal produce to reduce your carbon footprint!",
  ];

  // Todo: remove mock responses when implementing real backend with AI
  const mockResponses = [
    "That's a great question about environmental science! Climate change is indeed one of the most pressing issues of our time...",
    "Renewable energy sources like solar, wind, and hydroelectric power are becoming increasingly important for sustainable development...",
    "Biodiversity is crucial for ecosystem health. When we lose species, we lose the natural balance that keeps our environment stable...",
    "Sustainable living practices can make a real difference! Even small changes in our daily habits add up to significant environmental impact...",
    "The circular economy is a fascinating concept that aims to eliminate waste by reusing and recycling materials continuously...",
    "Ocean conservation is critical - our oceans absorb about 30% of carbon dioxide and produce over 50% of our oxygen...",
    "Deforestation affects not just wildlife but also global weather patterns and carbon storage...",
    "Green technology innovations are helping us find solutions to environmental challenges while creating economic opportunities...",
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const newMessageCount = messageCount + 1;
    setMessageCount(newMessageCount);
    
    // Award XP for sending message
    onMessageSent?.(newMessageCount, 5);
    console.log(`Message sent! Total messages: ${newMessageCount}, +5 XP earned`);

    // Simulate AI response delay
    setTimeout(() => {
      const shouldShowEcoTip = newMessageCount % 5 === 0;
      
      if (shouldShowEcoTip) {
        // Show eco tip every 5 messages
        const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
        const ecoTipMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: randomTip,
          isUser: false,
          timestamp: new Date(),
          isEcoTip: true,
        };
        setMessages(prev => [...prev, ecoTipMessage]);
      } else {
        // Regular response
        const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: randomResponse,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto" data-testid="chat-container">
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-gaming-accent" />
              AI Gaming Companion
            </div>
            <Badge variant="secondary" className="flex items-center gap-1" data-testid="badge-message-count">
              <Star className="h-3 w-3" />
              {messageCount} messages (+{messageCount * 5} XP)
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="messages-area">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                data-testid={`message-${message.isUser ? 'user' : 'bot'}`}
              >
                {!message.isUser && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={message.isEcoTip ? "bg-gaming-electric" : "bg-gaming-accent"}>
                      {message.isEcoTip ? <Lightbulb className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-gaming-primary text-white'
                      : message.isEcoTip
                      ? 'bg-gaming-electric/20 border border-gaming-electric/30'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm" data-testid="text-message-content">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {message.isUser && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gaming-primary">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start" data-testid="loading-indicator">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gaming-accent">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 max-w-[70%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about gaming, learning, or any topic..."
                disabled={isLoading}
                className="flex-1"
                data-testid="input-chat-message"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                data-testid="button-send-message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Next eco tip in {5 - (messageCount % 5)} messages • Each message earns +5 XP
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}