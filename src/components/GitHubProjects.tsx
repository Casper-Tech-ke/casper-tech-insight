
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';

// Mock GitHub project data - in a real app, this would come from the GitHub API
const mockProjects = [
  { 
    id: 1, 
    name: "casper-api", 
    description: "Core API services for Casper Tech platform",
    language: "TypeScript",
    stars: 156,
    forks: 32,
    updated: "2023-09-15T14:23:02Z"
  },
  { 
    id: 2, 
    name: "casper-ui", 
    description: "UI components and design system",
    language: "React",
    stars: 237,
    forks: 45,
    updated: "2023-09-22T09:12:45Z"
  },
  { 
    id: 3, 
    name: "casper-docs", 
    description: "Official documentation site for Casper Tech products",
    language: "JavaScript",
    stars: 89,
    forks: 12,
    updated: "2023-09-10T11:05:32Z"
  },
  { 
    id: 4, 
    name: "casper-cli", 
    description: "Command line interface for Casper Tech services",
    language: "Go",
    stars: 124,
    forks: 18,
    updated: "2023-09-18T16:43:21Z"
  }
];

const fetchGitHubProjects = async () => {
  // In a real app, this would be a real API call to GitHub
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProjects), 1200);
  });
};

const GitHubProjects = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['github-projects'],
    queryFn: () => fetchGitHubProjects() as Promise<typeof mockProjects>
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      "TypeScript": "bg-blue-100 text-blue-800",
      "JavaScript": "bg-yellow-100 text-yellow-800",
      "React": "bg-cyan-100 text-cyan-800",
      "Go": "bg-teal-100 text-teal-800",
      "Python": "bg-green-100 text-green-800",
      "Java": "bg-orange-100 text-orange-800"
    };
    
    return colors[language] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-casper-800">GitHub Projects</CardTitle>
        <CardDescription>Recent GitHub repositories from Casper Tech</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-pulse text-casper-600">Loading GitHub projects...</div>
          </div>
        ) : (
          <div className="space-y-4">
            {projects?.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-casper-700">{project.name}</h3>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getLanguageColor(project.language)}`}>
                    {project.language}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-2">{project.description}</p>
                <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                  <div>⭐ {project.stars} stars</div>
                  <div>🍴 {project.forks} forks</div>
                  <div>📅 Updated {formatDate(project.updated)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GitHubProjects;
