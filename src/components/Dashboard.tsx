import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, Receipt, Users, Calendar } from "lucide-react";
import heroImage from "@/assets/homie-hero.jpg";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-soft pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-b-xl">
        <img 
          src={heroImage} 
          alt="Homie - Roommate management made easy" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-2xl font-bold mb-1">Welcome back! 👋</h1>
          <p className="text-white/90 text-sm">Your house is looking great today</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 shadow-soft border-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <DollarSign className="text-accent-foreground" size={20} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">You owe</p>
                <p className="text-lg font-bold text-foreground">$0</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-soft border-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Receipt className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Owed to you</p>
                <p className="text-lg font-bold text-foreground">$0</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-4 shadow-soft border-0">
          <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Plus size={20} />
              <span className="text-sm">Add Expense</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Users size={20} />
              <span className="text-sm">House Chat</span>
            </Button>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-4 shadow-soft border-0">
          <h3 className="font-semibold text-foreground mb-3">Recent Activity</h3>
          <div className="space-y-3">
            <div className="text-center py-8">
              <Calendar className="mx-auto text-muted-foreground mb-2" size={32} />
              <p className="text-muted-foreground text-sm">No recent activity</p>
              <p className="text-muted-foreground text-xs">Your expenses and updates will appear here</p>
            </div>
          </div>
        </Card>

        {/* House Members */}
        <Card className="p-4 shadow-soft border-0">
          <h3 className="font-semibold text-foreground mb-3">House Members</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                You
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">You</p>
                <p className="text-xs text-muted-foreground">House admin</p>
              </div>
            </div>
            <div className="text-center py-4">
              <Button variant="outline" size="sm">
                <Plus size={16} className="mr-2" />
                Invite Roommates
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;