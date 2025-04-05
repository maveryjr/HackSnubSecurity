import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Lead, Assessment, Recommendation } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Download, User, FileText, AlertCircle, CheckCircle, Shield, Mail, Phone, Building, Users, Calendar, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

// Function to export data to CSV
function exportToCSV(data: any[], filename: string) {
  if (!data || !data.length) {
    toast({
      title: "Export Failed",
      description: "No data available to export",
      variant: "destructive",
    });
    return;
  }

  // Get headers from the first item
  const headers = Object.keys(data[0]);
  
  // Create CSV rows
  const csvRows = [];
  csvRows.push(headers.join(','));
  
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      // Handle objects by converting to JSON string
      const escaped = typeof value === 'object' && value !== null
        ? JSON.stringify(value).replace(/"/g, '""')
        : value;
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  
  // Create CSV content
  const csvContent = csvRows.join('\n');
  
  // Download CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  toast({
    title: "Export Successful",
    description: `${filename} has been downloaded`,
  });
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("leads");
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

  // Simple admin authentication (for demo purposes)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "hacksnub2025") {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  // Fetch leads data
  const { data: leads, isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
    // Only fetch when authenticated and on leads tab
    enabled: authenticated && (activeTab === "leads" || activeTab === "dashboard"),
  });

  // Fetch assessments data
  const { data: assessments, isLoading: assessmentsLoading } = useQuery<Assessment[]>({
    queryKey: ["/api/assessments"],
    // Only fetch when authenticated and on assessments tab
    enabled: authenticated && (activeTab === "assessments" || activeTab === "dashboard"),
  });

  // Function to get recommendations for a specific assessment
  const { data: recommendations, isLoading: recommendationsLoading } = useQuery<{
    assessment: Assessment;
    recommendations: Recommendation[];
  }>({
    queryKey: selectedAssessment ? [`/api/assessments/${selectedAssessment.id}`] : [],
    enabled: !!selectedAssessment
  });

  // Dashboard metrics
  const totalLeads = leads?.length || 0;
  const totalAssessments = assessments?.length || 0;
  const averageScore = assessments?.length 
    ? Math.round(assessments.reduce((sum, assessment) => sum + assessment.score, 0) / assessments.length) 
    : 0;
  
  const getScoreColor = (score: number) => {
    if (score < 40) return "text-red-500";
    if (score < 70) return "text-yellow-500";
    return "text-green-500";
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-[#1A1A1A] text-[#F5F5F5] py-16">
          <div className="container mx-auto px-4 max-w-md">
            <div className="bg-[#242424] p-8 rounded-lg shadow-lg border border-[#ADFF6C]/20">
              <h1 className="text-3xl font-bold mb-6 text-[#ADFF6C]">Admin Login</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 rounded bg-[#333] border border-[#444]"
                    placeholder="Enter admin password"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full bg-[#ADFF6C] text-[#1A1A1A] hover:bg-[#8DCC4C]">
                  Login
                </Button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-[#1A1A1A] text-[#F5F5F5] py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold text-[#ADFF6C]">Admin Dashboard</h1>
            <div className="flex space-x-4">
              <Button 
                onClick={() => setAuthenticated(false)} 
                variant="outline" 
                className="border-[#ADFF6C] text-[#ADFF6C]"
              >
                Logout
              </Button>
            </div>
          </div>

          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="mb-8 bg-[#242424] p-1">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#ADFF6C] data-[state=active]:text-[#1A1A1A]">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="leads" className="data-[state=active]:bg-[#ADFF6C] data-[state=active]:text-[#1A1A1A]">
                Leads
              </TabsTrigger>
              <TabsTrigger value="assessments" className="data-[state=active]:bg-[#ADFF6C] data-[state=active]:text-[#1A1A1A]">
                Assessments
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-[#242424] border-none shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#ADFF6C] flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Total Leads
                    </CardTitle>
                    <CardDescription>Lead form submissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{totalLeads}</div>
                    <p className="text-sm text-gray-400 mt-2">
                      {leadsLoading ? "Loading..." : "From contact form submissions"}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#242424] border-none shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#ADFF6C] flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Total Assessments
                    </CardTitle>
                    <CardDescription>Security assessments completed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{totalAssessments}</div>
                    <p className="text-sm text-gray-400 mt-2">
                      {assessmentsLoading ? "Loading..." : "Completed security assessments"}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#242424] border-none shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#ADFF6C] flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      Average Security Score
                    </CardTitle>
                    <CardDescription>Across all assessments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-4xl font-bold ${getScoreColor(averageScore)}`}>
                      {assessmentsLoading ? "--" : `${averageScore}%`}
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      {assessmentsLoading ? "Loading..." : 
                        averageScore < 40 ? "High risk" : 
                        averageScore < 70 ? "Moderate risk" : 
                        "Low risk"}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#242424] border-none shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-[#ADFF6C]">Recent Leads</CardTitle>
                      <Button onClick={() => setActiveTab("leads")} variant="link" className="text-[#ADFF6C]">
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {leadsLoading ? (
                      <div className="flex justify-center py-10">
                        <div className="w-8 h-8 border-4 border-[#ADFF6C] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : leads && leads.length > 0 ? (
                      <div className="space-y-4">
                        {leads.slice(0, 5).map((lead) => (
                          <div key={lead.id} className="p-3 bg-[#2A2A2A] rounded-md">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{lead.name}</h3>
                                <p className="text-sm text-gray-400">{lead.company}</p>
                              </div>
                              <span className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
                              </span>
                            </div>
                            <div className="flex items-center mt-2 text-sm text-gray-400">
                              <Mail className="h-4 w-4 mr-1" />
                              {lead.email}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">No leads found</div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="bg-[#242424] border-none shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-[#ADFF6C]">Recent Assessments</CardTitle>
                      <Button onClick={() => setActiveTab("assessments")} variant="link" className="text-[#ADFF6C]">
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {assessmentsLoading ? (
                      <div className="flex justify-center py-10">
                        <div className="w-8 h-8 border-4 border-[#ADFF6C] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : assessments && assessments.length > 0 ? (
                      <div className="space-y-4">
                        {assessments.slice(0, 5).map((assessment) => (
                          <div key={assessment.id} className="p-3 bg-[#2A2A2A] rounded-md">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{assessment.company || assessment.email}</h3>
                                <p className="text-sm text-gray-400">{assessment.industry || "Unknown industry"}</p>
                              </div>
                              <Badge className={
                                assessment.score < 40 ? "bg-red-500" : 
                                assessment.score < 70 ? "bg-yellow-500" : 
                                "bg-green-500"
                              }>
                                {assessment.score}%
                              </Badge>
                            </div>
                            <div className="flex items-center mt-2 text-sm text-gray-400">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDistanceToNow(new Date(assessment.createdAt), { addSuffix: true })}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">No assessments found</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Leads Tab */}
            <TabsContent value="leads">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#ADFF6C]">Lead Management</h2>
                <Button 
                  onClick={() => exportToCSV(leads || [], 'hacksnub-leads')}
                  disabled={!leads || leads.length === 0}
                  className="bg-[#ADFF6C] text-[#1A1A1A] hover:bg-[#8DCC4C]"
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
              </div>
              {leadsLoading ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-[#ADFF6C] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="bg-[#242424] rounded-lg shadow-lg overflow-hidden">
                  <Table>
                    <TableCaption>List of all leads captured from the website.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-[#ADFF6C]">Name</TableHead>
                        <TableHead className="text-[#ADFF6C]">Email</TableHead>
                        <TableHead className="text-[#ADFF6C]">Phone</TableHead>
                        <TableHead className="text-[#ADFF6C]">Company</TableHead>
                        <TableHead className="text-[#ADFF6C]">Size</TableHead>
                        <TableHead className="text-[#ADFF6C]">Date</TableHead>
                        <TableHead className="text-[#ADFF6C]">Age</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads && leads.length > 0 ? (
                        leads.map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell className="font-medium">{lead.name}</TableCell>
                            <TableCell>{lead.email}</TableCell>
                            <TableCell>{lead.phone || "—"}</TableCell>
                            <TableCell>{lead.company}</TableCell>
                            <TableCell>{lead.employees}</TableCell>
                            <TableCell>{formatDateTime(lead.createdAt)}</TableCell>
                            <TableCell>{formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                            No leads found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            {/* Assessments Tab */}
            <TabsContent value="assessments">
              {selectedAssessment ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-[#ADFF6C] flex items-center">
                      <Button 
                        variant="ghost" 
                        className="mr-2 h-8 w-8 p-0 text-[#ADFF6C]" 
                        onClick={() => setSelectedAssessment(null)}
                      >
                        <ChevronRight className="h-4 w-4 rotate-180" />
                      </Button>
                      Assessment Details
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <Card className="bg-[#242424] border-none shadow-md">
                        <CardHeader>
                          <CardTitle className="text-[#ADFF6C]">Client Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Email:</span>
                            <span>{selectedAssessment.email}</span>
                          </div>
                          <Separator className="bg-gray-800" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Company:</span>
                            <span>{selectedAssessment.company || "—"}</span>
                          </div>
                          <Separator className="bg-gray-800" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Industry:</span>
                            <span>{selectedAssessment.industry || "—"}</span>
                          </div>
                          <Separator className="bg-gray-800" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Company Size:</span>
                            <span>{selectedAssessment.companySize || "—"}</span>
                          </div>
                          <Separator className="bg-gray-800" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Completed:</span>
                            <span>
                              {selectedAssessment.completed ? (
                                <span className="flex items-center text-green-500">
                                  <CheckCircle className="h-4 w-4 mr-1" /> Yes
                                </span>
                              ) : (
                                <span className="flex items-center text-yellow-500">
                                  <AlertCircle className="h-4 w-4 mr-1" /> No
                                </span>
                              )}
                            </span>
                          </div>
                          <Separator className="bg-gray-800" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Date:</span>
                            <span>{formatDateTime(selectedAssessment.createdAt.toString())}</span>
                          </div>
                          <Separator className="bg-gray-800" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Security Score:</span>
                            <span className={`text-xl font-bold ${getScoreColor(selectedAssessment.score)}`}>
                              {selectedAssessment.score}%
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <Card className="bg-[#242424] border-none shadow-md">
                        <CardHeader>
                          <CardTitle className="text-[#ADFF6C]">Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {recommendationsLoading ? (
                            <div className="flex justify-center py-10">
                              <div className="w-8 h-8 border-4 border-[#ADFF6C] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          ) : (
                            <div>
                              {recommendations && recommendations.recommendations && recommendations.recommendations.length > 0 ? (
                                <div className="space-y-4">
                                  {recommendations.recommendations.map((rec, index) => (
                                    <div key={index} className="p-4 bg-[#2A2A2A] rounded-md">
                                      <div className="flex justify-between items-start">
                                        <h3 className="font-medium">{rec.recommendation}</h3>
                                        <Badge className={
                                          rec.severity === "high" ? "bg-red-500" : 
                                          rec.severity === "medium" ? "bg-yellow-500" : 
                                          "bg-green-500"
                                        }>
                                          {rec.severity}
                                        </Badge>
                                      </div>
                                      <p className="text-sm text-gray-400 mt-2">{rec.implementationDetails}</p>
                                      
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                                        {rec.benefits && (
                                          <div>
                                            <span className="text-gray-500">Benefits:</span>
                                            <p className="text-gray-300">{rec.benefits}</p>
                                          </div>
                                        )}
                                        
                                        <div className="space-y-1">
                                          {rec.estimatedCost && (
                                            <div className="flex items-center">
                                              <span className="text-gray-500 mr-2">Est. Cost:</span>
                                              <span className="text-gray-300">{rec.estimatedCost}</span>
                                            </div>
                                          )}
                                          
                                          {rec.timeframe && (
                                            <div className="flex items-center">
                                              <span className="text-gray-500 mr-2">Timeframe:</span>
                                              <span className="text-gray-300">{rec.timeframe}</span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-8 text-gray-400">No recommendations found</div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-[#ADFF6C]">Assessment Management</h2>
                    <Button 
                      onClick={() => exportToCSV(assessments || [], 'hacksnub-assessments')}
                      disabled={!assessments || assessments.length === 0}
                      className="bg-[#ADFF6C] text-[#1A1A1A] hover:bg-[#8DCC4C]"
                    >
                      <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                  </div>
                  {assessmentsLoading ? (
                    <div className="flex justify-center py-10">
                      <div className="w-8 h-8 border-4 border-[#ADFF6C] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="bg-[#242424] rounded-lg shadow-lg overflow-hidden">
                      <Table>
                        <TableCaption>List of all security assessments completed.</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-[#ADFF6C]">Email</TableHead>
                            <TableHead className="text-[#ADFF6C]">Company</TableHead>
                            <TableHead className="text-[#ADFF6C]">Industry</TableHead>
                            <TableHead className="text-[#ADFF6C]">Company Size</TableHead>
                            <TableHead className="text-[#ADFF6C]">Score</TableHead>
                            <TableHead className="text-[#ADFF6C]">Date</TableHead>
                            <TableHead className="text-[#ADFF6C]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {assessments && assessments.length > 0 ? (
                            assessments.map((assessment) => (
                              <TableRow key={assessment.id}>
                                <TableCell className="font-medium">{assessment.email}</TableCell>
                                <TableCell>{assessment.company || "—"}</TableCell>
                                <TableCell>{assessment.industry || "—"}</TableCell>
                                <TableCell>{assessment.companySize || "—"}</TableCell>
                                <TableCell>
                                  <span className={`font-bold ${getScoreColor(assessment.score)}`}>
                                    {assessment.score}%
                                  </span>
                                </TableCell>
                                <TableCell>{formatDateTime(assessment.createdAt.toString())}</TableCell>
                                <TableCell>
                                  <Button 
                                    variant="ghost" 
                                    className="h-8 w-8 p-0 text-[#ADFF6C]" 
                                    onClick={() => setSelectedAssessment(assessment)}
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                                No assessments found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}