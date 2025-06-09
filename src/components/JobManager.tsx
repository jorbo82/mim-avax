
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2, RefreshCw, Clock, CheckCircle, XCircle, Loader2, History } from 'lucide-react';
import { useJobTracking } from '@/hooks/useJobTracking';
import { formatDistanceToNow } from 'date-fns';

const JobManager = () => {
  const { jobs, loading, deleteJob, clearAllJobs, refetchJobs } = useJobTracking();
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);
  const [clearingAll, setClearingAll] = useState(false);

  const handleDeleteJob = async (jobId: string) => {
    setDeletingJobId(jobId);
    await deleteJob(jobId);
    setDeletingJobId(null);
  };

  const handleClearAll = async () => {
    setClearingAll(true);
    await clearAllJobs();
    setClearingAll(false);
  };

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
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <Card className="cute-border cute-shadow">
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-mim-teal border-t-transparent rounded-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="cute-border cute-shadow">
        <CardHeader>
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex-1 min-w-0">
              <CardTitle className="flex items-center gap-2 text-mim-teal">
                <History className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">JORBO AI Generation Jobs</span>
              </CardTitle>
              <CardDescription className="mt-1">
                Track your AI image generation jobs and their status
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refetchJobs}
                className="border-mim-teal text-mim-teal hover:bg-mim-teal hover:text-white flex-shrink-0"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              {jobs.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear All Jobs?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete all your generation jobs. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleClearAll}
                        disabled={clearingAll}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        {clearingAll ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Clearing...
                          </>
                        ) : (
                          'Clear All'
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No generation jobs yet</p>
              <p className="text-sm mt-1">Start generating images to see your job history here</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {jobs.map((job) => (
                  <Card key={job.id} className="border border-muted">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(job.status)}
                            <Badge className={getStatusColor(job.status)}>
                              {job.status.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">
                              {job.job_type === 'text_to_image' ? 'Text-to-Image' : 'Image Edit'}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-foreground truncate mb-1">
                            {job.prompt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{job.size}</span>
                            <span>{job.quality} quality</span>
                            <span>
                              {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                            </span>
                          </div>
                          {job.error_message && (
                            <p className="text-xs text-red-600 mt-2 bg-red-50 p-2 rounded">
                              {job.error_message}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteJob(job.id)}
                          disabled={deletingJobId === job.id}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                        >
                          {deletingJobId === job.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobManager;
