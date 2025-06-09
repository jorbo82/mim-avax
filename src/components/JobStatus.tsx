
import { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useJobTracking, ImageGenerationJob } from "@/hooks/useJobTracking";

const JobStatus = () => {
  const { jobs, loading } = useJobTracking();
  const [recentJobs, setRecentJobs] = useState<ImageGenerationJob[]>([]);

  useEffect(() => {
    // Show last 10 jobs
    setRecentJobs(jobs.slice(0, 10));
  }, [jobs]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-2 border-mim-teal border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <Card className="cute-border cute-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-mim-teal">
          <Loader2 className="w-5 h-5" />
          Generation Jobs
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentJobs.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No generation jobs yet. Start creating with JORBO AI!
          </p>
        ) : (
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2 mb-1">
                      {job.prompt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline">{job.size}</Badge>
                      <Badge variant="outline">{job.quality}</Badge>
                      <Badge variant="secondary">
                        {job.job_type.replace('_', '-to-')}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {getStatusIcon(job.status)}
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Created: {new Date(job.created_at).toLocaleString()}
                  {job.completed_at && (
                    <span className="ml-4">
                      Completed: {new Date(job.completed_at).toLocaleString()}
                    </span>
                  )}
                </div>
                
                {job.error_message && (
                  <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                    Error: {job.error_message}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobStatus;
