import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Lead } from "@shared/schema";
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

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
  const { data: leads, isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
    // Only fetch when authenticated
    enabled: authenticated,
  });

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
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#ADFF6C]">Lead Management Dashboard</h1>
            <Button onClick={() => setAuthenticated(false)} variant="outline" className="border-[#ADFF6C] text-[#ADFF6C]">
              Logout
            </Button>
          </div>

          {isLoading ? (
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
                        <TableCell>{lead.phone}</TableCell>
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
        </div>
      </main>
      <Footer />
    </div>
  );
}