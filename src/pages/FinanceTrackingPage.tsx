
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  CheckCircle, 
  Euro, 
  PiggyBank, 
  Receipt, 
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  FileText,
  Users,
  Clock,
  Briefcase,
  Bell,
  Settings,
  BarChart3,
  Camera,
  Download,
  AlertTriangle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FinanceTrackingPageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export const FinanceTrackingPage = ({ onBack, onComplete, isCompleted }: FinanceTrackingPageProps) => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [monthlyIncome, setMonthlyIncome] = useState(1200);
  const [totalExpenses, setTotalExpenses] = useState(850);
  const [emergencyFund, setEmergencyFund] = useState(320);
  const [emergencyTarget, setEmergencyTarget] = useState(500);

  // Sample data
  const budgetCategories = [
    { name: 'Rent', budgeted: 600, spent: 600, color: 'bg-red-500' },
    { name: 'Food', budgeted: 300, spent: 280, color: 'bg-orange-500' },
    { name: 'Transport', budgeted: 75, spent: 85, color: 'bg-yellow-500' },
    { name: 'Entertainment', budgeted: 100, spent: 120, color: 'bg-purple-500' },
  ];

  const cards = [
    { name: 'Navigo Card', balance: 75.40, type: 'Transport' },
    { name: 'CROUS Card', balance: 45.80, type: 'Meals' },
    { name: 'Bank Card', balance: 320.50, type: 'General' },
  ];

  const subscriptions = [
    { name: 'Netflix', amount: 8.99, nextBilling: '2024-01-15', status: 'active' },
    { name: 'Spotify', amount: 4.99, nextBilling: '2024-01-20', status: 'active' },
    { name: 'Internet', amount: 29.99, nextBilling: '2024-01-05', status: 'active' },
  ];

  const discountCards = [
    { name: 'ISIC Card', status: 'Active', expiry: '2024-12-31', savings: '€156' },
    { name: 'Navigo Student', status: 'Active', expiry: '2024-08-31', savings: '€240' },
    { name: 'CROUS Card', status: 'Pending', expiry: '-', savings: '€0' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            💰 Finance Tracking Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Complete financial management for students in France
          </p>
          {isCompleted && (
            <div className="mt-4 bg-green-100 p-3 rounded-lg">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                <span className="text-green-800 font-medium">Module Completed! You earned a key 🗝️</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
          <TabsTrigger value="discounts">Discounts</TabsTrigger>
          <TabsTrigger value="currency">Currency</TabsTrigger>
          <TabsTrigger value="bills">Bill Split</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="jobs">Part-time</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Euro className="h-4 w-4 mr-2 text-green-600" />
                  Monthly Income
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">€{monthlyIncome}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Receipt className="h-4 w-4 mr-2 text-red-600" />
                  Total Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">€{totalExpenses}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <PiggyBank className="h-4 w-4 mr-2 text-blue-600" />
                  Emergency Fund
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">€{emergencyFund}</div>
                <Progress value={(emergencyFund / emergencyTarget) * 100} className="mt-2" />
                <p className="text-xs text-muted-foreground">Goal: €{emergencyTarget}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />
                  Savings Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(((monthlyIncome - totalExpenses) / monthlyIncome) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">€{monthlyIncome - totalExpenses} saved</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget vs Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{category.name}</span>
                        <span>€{category.spent} / €{category.budgeted}</span>
                      </div>
                      <Progress 
                        value={(category.spent / category.budgeted) * 100} 
                        className="h-2"
                      />
                      {category.spent > category.budgeted && (
                        <p className="text-xs text-red-600">Over budget by €{category.spent - category.budgeted}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-20 flex-col">
                    <Receipt className="h-6 w-6 mb-2" />
                    Add Expense
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <PiggyBank className="h-6 w-6 mb-2" />
                    Update Budget
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Euro className="h-6 w-6 mb-2" />
                    Currency Tool
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Bell className="h-6 w-6 mb-2" />
                    Set Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    {card.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">€{card.balance}</div>
                  <p className="text-xs text-muted-foreground">{card.type}</p>
                  {card.balance < 20 && (
                    <Alert className="mt-2">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-xs">Low balance</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Budget Planner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Monthly Income</label>
                  <Input 
                    type="number" 
                    value={monthlyIncome} 
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Budget Period</label>
                  <Input type="month" className="mt-1" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium">Budget Categories</h3>
                {budgetCategories.map((category, index) => (
                  <div key={index} className="grid grid-cols-3 gap-3 items-center">
                    <span className="text-sm">{category.name}</span>
                    <Input type="number" placeholder="Budget" defaultValue={category.budgeted} />
                    <Input type="number" placeholder="Spent" defaultValue={category.spent} />
                  </div>
                ))}
                <Button variant="outline" size="sm">+ Add Category</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Expense Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="Amount (€)" type="number" />
                <Input placeholder="Description" />
                <select className="px-3 py-2 border rounded-md">
                  <option>Select Category</option>
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Entertainment</option>
                  <option>Shopping</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Receipt className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Scan Receipt
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discounts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Discount Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {discountCards.map((card, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{card.name}</h4>
                      <p className="text-sm text-gray-600">Expires: {card.expiry}</p>
                      <p className="text-sm text-green-600">Saved: {card.savings}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        card.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {card.status}
                      </span>
                      {card.status === 'Pending' && (
                        <Button size="sm" className="ml-2">Apply</Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">+ Add New Discount Card</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptions.map((sub, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{sub.name}</h4>
                      <p className="text-sm text-gray-600">Next billing: {sub.nextBilling}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">€{sub.amount}</div>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Monthly Cost:</span>
                    <span className="text-xl font-bold">€{subscriptions.reduce((sum, sub) => sum + sub.amount, 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="currency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Currency Converter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <Input type="number" placeholder="Enter amount" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">From</label>
                  <select className="w-full px-3 py-2 border rounded-md mt-1">
                    <option>EUR</option>
                    <option>USD</option>
                    <option>INR</option>
                    <option>GBP</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">To</label>
                  <select className="w-full px-3 py-2 border rounded-md mt-1">
                    <option>INR</option>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">₹87,500</div>
                  <p className="text-sm text-gray-600">1 EUR = 87.50 INR (Live Rate)</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Rates updated every 15 minutes</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Fund Builder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">€{emergencyFund}</div>
                <p className="text-gray-600">of €{emergencyTarget} goal</p>
                <Progress value={(emergencyFund / emergencyTarget) * 100} className="mt-4" />
                <p className="text-sm text-gray-500 mt-2">
                  {Math.round((emergencyFund / emergencyTarget) * 100)}% completed
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Add to Emergency Fund</label>
                  <Input type="number" placeholder="Amount (€)" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Update Target</label>
                  <Input 
                    type="number" 
                    value={emergencyTarget}
                    onChange={(e) => setEmergencyTarget(Number(e.target.value))}
                    className="mt-1" 
                  />
                </div>
              </div>
              <Button className="w-full">Add Savings</Button>
              
              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Emergency Fund Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Aim for 3-6 months of expenses</li>
                    <li>• Keep funds easily accessible</li>
                    <li>• Use high-yield savings account</li>
                    <li>• Automate monthly contributions</li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bill Splitter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Bill Description</label>
                  <Input placeholder="e.g., Dinner at restaurant" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Total Amount (€)</label>
                  <Input type="number" placeholder="0.00" className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Participants</label>
                <div className="mt-2 space-y-2">
                  <Input placeholder="Add participant name" />
                  <Button variant="outline" size="sm">+ Add Participant</Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">Split Equally</Button>
                <Button variant="outline">Custom Split</Button>
              </div>
              <Button className="w-full">Calculate & Share</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Part-Time Job Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Job Title</label>
                  <Input placeholder="e.g., Tutor" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Hourly Rate (€)</label>
                  <Input type="number" placeholder="15.00" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Hours This Week</label>
                  <Input type="number" placeholder="0" className="mt-1" />
                </div>
              </div>
              <Button className="w-full">Add Job Entry</Button>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">This Month's Earnings</h4>
                <div className="text-2xl font-bold text-green-600">€240.00</div>
                <p className="text-sm text-green-700">16 hours worked</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Loan Amount (€)</label>
                  <Input type="number" placeholder="10000" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Interest Rate (%)</label>
                  <Input type="number" placeholder="3.5" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Tenure (months)</label>
                  <Input type="number" placeholder="24" className="mt-1" />
                </div>
              </div>
              <Button>Calculate EMI</Button>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium">EMI Calculation</h4>
                <div className="text-xl font-bold">€450.00 / month</div>
                <Progress value={30} className="mt-2" />
                <p className="text-sm text-gray-600 mt-1">30% paid (€3,000 of €10,000)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Balance Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cards.map((card, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{card.name}</h4>
                      <p className="text-sm text-gray-600">{card.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">€{card.balance}</div>
                      <Button size="sm" variant="outline">Update</Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">+ Add New Card</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  Monthly Summary
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  Expense Analysis
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Download className="h-6 w-6 mb-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Settings className="h-6 w-6 mb-2" />
                  Settings
                </Button>
              </div>
              
              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <h4 className="font-medium text-blue-900 mb-2">📊 Monthly Financial Health</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-700">Income: €{monthlyIncome}</p>
                      <p className="text-blue-700">Expenses: €{totalExpenses}</p>
                    </div>
                    <div>
                      <p className="text-blue-700">Savings: €{monthlyIncome - totalExpenses}</p>
                      <p className="text-blue-700">Emergency Fund: €{emergencyFund}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {!isCompleted && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Ready to Complete Financial Setup?
            </h3>
            <p className="text-green-700 mb-4">
              You've explored the comprehensive finance tracking tools!
            </p>
            <Button 
              onClick={onComplete}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete Module & Earn Key 🗝️
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
