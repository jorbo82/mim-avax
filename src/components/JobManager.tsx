
import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useJobTracking } from "@/hooks/useJobTracking";

const JobManager = () => {
  const { jobs, loading, deleteJob, clearAllJobs } = useJobTracking();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  const handleDeleteJob = async (jobId: string) => {
    setIsDeleting(jobId);
    try {
      await deleteJob(jobId);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleClearAll = async () => {
    setIsClearing(true);
    try {
      await clearAllJobs();
    } finally {
      setIsClearing(false);
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
        <div className="flex items-center justify-between">
          <CardTitle className="text-mim-teal">Job Management</CardTitle>
          {jobs.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  size="sm"
                  disabled={isClearing}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {isClearing ? 'Clearing...' : 'Clear All'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    Clear All Jobs
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your generation jobs. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearAll}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Clear All Jobs
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {jobs.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No generation jobs yet. Start creating with JORBO AI!
          </p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
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
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isDeleting === job.id}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-orange-500" />
                          Delete Job
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete this generation job and any associated images. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteJob(job.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete Job
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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

export default JobManager;
