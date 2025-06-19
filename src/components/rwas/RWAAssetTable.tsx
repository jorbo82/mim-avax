
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Plus } from "lucide-react";

export const RWAAssetTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const assets = [
    {
      name: "BlackRock BUIDL",
      description: "USD Digital Liquidity Fund",
      category: "Treasury",
      categoryColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400",
      marketCap: "$52.3M",
      change: "+2.4%",
      isPositive: true,
      holders: "1,247",
      avatar: "BR",
      avatarBg: "bg-black"
    },
    {
      name: "WisdomTree WTGOV",
      description: "Government Bond Fund",
      category: "Bonds",
      categoryColor: "bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400",
      marketCap: "$28.7M",
      change: "+1.8%",
      isPositive: true,
      holders: "856",
      avatar: "WT",
      avatarBg: "bg-blue-600"
    },
    {
      name: "Backed bCSPX",
      description: "S&P 500 Index Fund",
      category: "Equity",
      categoryColor: "bg-purple-100 text-purple-800 dark:bg-purple-950/20 dark:text-purple-400",
      marketCap: "$34.1M",
      change: "-0.5%",
      isPositive: false,
      holders: "2,103",
      avatar: "BF",
      avatarBg: "bg-red-600"
    },
    {
      name: "Agora AUSD",
      description: "USD Stablecoin",
      category: "Stablecoin",
      categoryColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400",
      marketCap: "$35.2M",
      change: "0.0%",
      isPositive: null,
      holders: "1,894",
      avatar: "AG",
      avatarBg: "bg-orange-600"
    },
    {
      name: "Avant avUSD",
      description: "Native Avalanche Stablecoin",
      category: "Stablecoin",
      categoryColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400",
      marketCap: "$40.0M",
      change: "+0.1%",
      isPositive: true,
      holders: "1,535",
      avatar: "AV",
      avatarBg: "bg-teal-600"
    }
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || asset.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <section>
      <Card className="modern-shadow">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-foreground">All RWA Assets on Avalanche</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-48"
              />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="treasury">Treasury</SelectItem>
                  <SelectItem value="equity">Equity</SelectItem>
                  <SelectItem value="stablecoin">Stablecoins</SelectItem>
                  <SelectItem value="bonds">Bonds</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Market Cap</TableHead>
                  <TableHead>24h Change</TableHead>
                  <TableHead>Holders</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${asset.avatarBg} rounded-full flex items-center justify-center`}>
                          <span className="text-white text-xs font-bold">{asset.avatar}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{asset.name}</p>
                          <p className="text-sm text-muted-foreground">{asset.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-full ${asset.categoryColor}`}>
                        {asset.category}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold">{asset.marketCap}</TableCell>
                    <TableCell>
                      <span className={`flex items-center gap-1 ${
                        asset.isPositive === true ? 'text-green-600 dark:text-green-400' : 
                        asset.isPositive === false ? 'text-red-600 dark:text-red-400' : 
                        'text-muted-foreground'
                      }`}>
                        {asset.isPositive === true && <TrendingUp className="w-3 h-3" />}
                        {asset.isPositive === false && <TrendingDown className="w-3 h-3" />}
                        {asset.change}
                      </span>
                    </TableCell>
                    <TableCell>{asset.holders}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <TrendingUp className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
