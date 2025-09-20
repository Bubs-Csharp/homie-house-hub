import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, RotateCcw, Plus, Check, Clock, Users } from "lucide-react";

interface Chore {
  id: string;
  name: string;
  assignedTo: string;
  dueDate: string;
  completed: boolean;
  frequency: 'weekly' | 'biweekly' | 'monthly';
}

const ChoreRotation = () => {
  const [chores, setChores] = useState<Chore[]>([
    {
      id: '1',
      name: 'Take out trash',
      assignedTo: 'You',
      dueDate: '2024-09-22',
      completed: false,
      frequency: 'weekly'
    },
    {
      id: '2', 
      name: 'Clean bathroom',
      assignedTo: 'Alex',
      dueDate: '2024-09-25',
      completed: false,
      frequency: 'weekly'
    },
    {
      id: '3',
      name: 'Vacuum living room',
      assignedTo: 'Sarah',
      dueDate: '2024-09-23',
      completed: true,
      frequency: 'weekly'
    }
  ]);

  const [showAddChore, setShowAddChore] = useState(false);
  const [newChoreName, setNewChoreName] = useState('');

  const toggleChoreCompletion = (choreId: string) => {
    setChores(chores.map(chore => 
      chore.id === choreId 
        ? { ...chore, completed: !chore.completed }
        : chore
    ));
  };

  const addChore = () => {
    if (newChoreName.trim()) {
      const newChore: Chore = {
        id: Date.now().toString(),
        name: newChoreName,
        assignedTo: 'You',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        frequency: 'weekly'
      };
      setChores([...chores, newChore]);
      setNewChoreName('');
      setShowAddChore(false);
    }
  };

  const rotateChores = () => {
    const roommates = ['You', 'Alex', 'Sarah'];
    setChores(chores.map(chore => {
      const currentIndex = roommates.indexOf(chore.assignedTo);
      const nextIndex = (currentIndex + 1) % roommates.length;
      return {
        ...chore,
        assignedTo: roommates[nextIndex],
        completed: false,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
    }));
  };

  const getChoreStatus = (chore: Chore) => {
    if (chore.completed) return { color: 'bg-accent text-accent-foreground', icon: Check };
    const dueDate = new Date(chore.dueDate);
    const today = new Date();
    if (dueDate < today) return { color: 'bg-destructive text-destructive-foreground', icon: Clock };
    return { color: 'bg-secondary text-secondary-foreground', icon: Clock };
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-20">
      {/* Header */}
      <div className="p-4 bg-card shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <RotateCcw className="text-primary" size={24} />
              Chore Rotation
            </h1>
            <p className="text-muted-foreground text-sm">Keep the house tidy together</p>
          </div>
          <Button 
            variant="warm" 
            size="sm"
            onClick={rotateChores}
            className="shadow-warm"
          >
            <RotateCcw size={16} className="mr-2" />
            Rotate
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Week */}
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="text-primary" size={20} />
              This Week's Chores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {chores.map((chore) => {
              const status = getChoreStatus(chore);
              const StatusIcon = status.icon;
              
              return (
                <div key={chore.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleChoreCompletion(chore.id)}
                    className={`w-8 h-8 rounded-full p-0 ${chore.completed ? 'bg-accent text-accent-foreground' : 'border border-border'}`}
                  >
                    {chore.completed && <Check size={16} />}
                  </Button>
                  
                  <div className="flex-1">
                    <p className={`font-medium ${chore.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {chore.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        <Users size={12} className="mr-1" />
                        {chore.assignedTo}
                      </Badge>
                      <Badge className={`text-xs ${status.color}`}>
                        <StatusIcon size={12} className="mr-1" />
                        {chore.dueDate}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Add New Chore */}
        <Card className="shadow-soft border-0">
          <CardContent className="p-4">
            {!showAddChore ? (
              <Button 
                variant="outline" 
                onClick={() => setShowAddChore(true)}
                className="w-full h-12 flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Add New Chore
              </Button>
            ) : (
              <div className="space-y-3">
                <Input
                  placeholder="Enter chore name..."
                  value={newChoreName}
                  onChange={(e) => setNewChoreName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addChore()}
                  className="border-primary/20 focus:border-primary"
                />
                <div className="flex gap-2">
                  <Button variant="warm" onClick={addChore} className="flex-1">
                    Add Chore
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowAddChore(false);
                      setNewChoreName('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* House Members */}
        <Card className="shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-primary" size={20} />
              Roommates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['You', 'Alex', 'Sarah'].map((roommate, index) => {
                const choreCount = chores.filter(chore => chore.assignedTo === roommate && !chore.completed).length;
                return (
                  <div key={roommate} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        {roommate[0]}
                      </div>
                      <span className="font-medium text-foreground">{roommate}</span>
                    </div>
                    <Badge variant="secondary">
                      {choreCount} chore{choreCount !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChoreRotation;