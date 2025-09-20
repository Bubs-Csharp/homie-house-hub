import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Users, Smile } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
}

const ChatHub = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "You",
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
    toast.success("Message sent!");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-20 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-warm text-white p-4 rounded-b-xl flex-shrink-0">
        <h1 className="text-2xl font-bold mb-1">House Chat</h1>
        <p className="text-white/90 text-sm">Stay connected with your roommates</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 flex flex-col">
        {messages.length === 0 ? (
          <Card className="flex-1 p-4 shadow-soft border-0 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="mx-auto text-muted-foreground mb-3" size={48} />
              <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to House Chat!</h3>
              <p className="text-muted-foreground text-sm mb-4">
                This is where you and your roommates can chat about<br />
                expenses, house rules, and daily life.
              </p>
              <div className="bg-secondary/50 rounded-lg p-3 text-left text-sm text-secondary-foreground">
                <p className="mb-1">💡 <strong>Pro tip:</strong> You can:</p>
                <p>• Share expense receipts directly in chat</p>
                <p>• Discuss bill splitting</p>
                <p>• Coordinate house activities</p>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="flex-1 p-4 shadow-soft border-0">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-xl ${
                      message.isOwn 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Message Input */}
        <Card className="p-4 shadow-soft border-0 mt-4 flex-shrink-0">
          <div className="flex space-x-2">
            <Input
              placeholder="Type a message to your roommates..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              size="icon"
              className="shadow-warm"
            >
              <Send size={16} />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Users size={12} />
              <span>1 member online</span>
            </div>
            <Button variant="ghost" size="sm" className="h-6 px-2">
              <Smile size={12} className="mr-1" />
              <span className="text-xs">Add emoji</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatHub;