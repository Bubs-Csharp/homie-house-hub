import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Receipt, Calendar, Users } from "lucide-react";
import { toast } from "sonner";

const ExpenseTracker = () => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleAddExpense = () => {
    if (!amount || !description) {
      toast.error("Please fill in all fields");
      return;
    }
    
    toast.success("Expense added successfully!");
    setAmount("");
    setDescription("");
    setShowAddExpense(false);
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-20">
      {/* Header */}
      <div className="bg-gradient-warm text-white p-4 rounded-b-xl">
        <h1 className="text-2xl font-bold mb-1">Money Manager</h1>
        <p className="text-white/90 text-sm">Track and split expenses with your roommates</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Balance Overview */}
        <Card className="p-4 shadow-soft border-0">
          <h3 className="font-semibold text-foreground mb-3">Your Balance</h3>
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-accent-foreground mb-1">$0.00</div>
            <p className="text-muted-foreground text-sm">You're all settled up!</p>
          </div>
        </Card>

        {/* Add Expense Button */}
        {!showAddExpense ? (
          <Card className="p-4 shadow-soft border-0">
            <Button 
              onClick={() => setShowAddExpense(true)}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm"
            >
              <Plus size={20} className="mr-2" />
              Add New Expense
            </Button>
          </Card>
        ) : (
          <Card className="p-4 shadow-soft border-0">
            <h3 className="font-semibold text-foreground mb-4">Add Expense</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="What was this expense for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddExpense} className="flex-1">
                  Add Expense
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddExpense(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Recent Expenses */}
        <Card className="p-4 shadow-soft border-0">
          <h3 className="font-semibold text-foreground mb-3">Recent Expenses</h3>
          <div className="space-y-3">
            <div className="text-center py-8">
              <Receipt className="mx-auto text-muted-foreground mb-2" size={32} />
              <p className="text-muted-foreground text-sm">No expenses yet</p>
              <p className="text-muted-foreground text-xs">Add your first shared expense above</p>
            </div>
          </div>
        </Card>

        {/* Split Options */}
        <Card className="p-4 shadow-soft border-0">
          <h3 className="font-semibold text-foreground mb-3">Split Options</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Users size={20} />
              <span className="text-sm">Equal Split</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Calendar size={20} />
              <span className="text-sm">Custom Split</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseTracker;