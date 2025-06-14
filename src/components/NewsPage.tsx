
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { BookOpen, ExternalLink, Filter } from "lucide-react";

// Placeholder news data structure
const placeholders = {
  france: [
    {
      id: 1,
      title: "Government Reforms Student Visa Process",
      summary: "The French government is simplifying the visa process for international students.",
      type: "Visa",
      link: "#"
    },
    {
      id: 2,
      title: "New Law on Student Housing Subsidies",
      summary: "Revised CAF rules for 2025: easier access to housing benefits.",
      type: "Housing",
      link: "#"
    },
  ],
  india: [
    {
      id: 1,
      title: "Big Rise in Indian Students Going to France",
      summary: "Numbers soar as Indo-French partnerships make study abroad easier.",
      type: "International",
      link: "#"
    },
    {
      id: 2,
      title: "Indian Govt Recognizes French Masters for Jobs",
      summary: "Policy update links French degrees with Indian job market.",
      type: "Policy",
      link: "#"
    },
  ],
  world: [
    {
      id: 1,
      title: "UNESCO Ranks France #3 Study Destination Globally",
      summary: "France remains a top choice for students worldwide.",
      type: "Ranking",
      link: "#"
    },
    {
      id: 2,
      title: "Visa Updates in Europe for International Students",
      summary: "Several EU countries update post-study work rights.",
      type: "Visa",
      link: "#"
    },
  ]
};

const types = {
  france: ["All", "Visa", "Housing"],
  india: ["All", "International", "Policy"],
  world: ["All", "Ranking", "Visa"],
};

export const NewsPage = () => {
  const [region, setRegion] = useState("france");
  const [filters, setFilters] = useState({
    france: "All",
    india: "All",
    world: "All"
  });

  const handleTypeFilterChange = (regionName: string, value: string) => {
    setFilters({ ...filters, [regionName]: value });
  };

  // Only show stories matching the filter (or all)
  function getFilteredNews(regionKey: keyof typeof placeholders) {
    const filter = filters[regionKey];
    if (filter === "All") return placeholders[regionKey];
    return placeholders[regionKey].filter((news) => news.type === filter);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <BookOpen className="h-8 w-8 mr-3 text-orange-600" />
          Top News: France • India • World
        </h1>
        <p className="text-lg text-gray-600">
          The latest study, visa, housing, and student news curated by region and interest
        </p>
      </div>

      <Tabs value={region} onValueChange={setRegion}>
        <TabsList className="w-full justify-center mb-6">
          <TabsTrigger value="france">France</TabsTrigger>
          <TabsTrigger value="india">India</TabsTrigger>
          <TabsTrigger value="world">World</TabsTrigger>
        </TabsList>

        {["france", "india", "world"].map((regionKey) => (
          <TabsContent key={regionKey} value={regionKey}>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Filter className="text-blue-600 h-5 w-5" />
                <span className="font-medium text-blue-900">Filter by type:</span>
              </div>
              <Select
                value={filters[regionKey as keyof typeof filters]}
                onValueChange={(val) => handleTypeFilterChange(regionKey, val)}
              >
                <SelectTrigger className="max-w-xs">
                  <span>
                    {filters[regionKey as keyof typeof filters]}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {types[regionKey as keyof typeof types].map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-6">
              {getFilteredNews(regionKey as keyof typeof placeholders).length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-gray-500">No news of this type yet. Coming soon!</div>
                  </CardContent>
                </Card>
              ) : (
                getFilteredNews(regionKey as keyof typeof placeholders).map(article => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex flex-col md:flex-row items-start">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">{article.type}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                        <p className="text-gray-600 mb-4">{article.summary}</p>
                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline">
                            Read More
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
