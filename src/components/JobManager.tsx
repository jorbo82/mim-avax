
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { RefreshCw, Briefcase, Loader2, ChevronDown, Trash2 } from 'lucide-react';
import { useJobTracking } from '@/hooks/useJobTracking';
import JobList from './job-manager/JobList';
import EmptyJobsState from './job-manager/EmptyJobsState';

const JobManager = () => {
  const { 
    jobs, 
    loading, 
    hasMoreJobs,
    deleteJob, 
    clearAllJobs, 
    refetchJobs,
    loadMoreJobs 
  } = useJobTracking();
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);
  const [clearingAll, setClearingAll] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

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

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await loadMoreJobs();
    setLoadingMore(false);
  };

  const LoadingSkeleton = () => (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="border border-muted">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <Card className="cute-border cute-shadow">
      <CardHeader>
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex-1 min-w-0">
            <CardTitle className="flex items-center gap-2 text-mim-teal">
              <Briefcase className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">Generation Jobs</span>
              <Badge variant="secondary" className="ml-2">
                {jobs.length} jobs
              </Badge>
            </CardTitle>
            <CardDescription className="mt-1">
              Track your AI image generation progress
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
        {loading && jobs.length === 0 ? (
          <LoadingSkeleton />
        ) : jobs.length === 0 ? (
          <EmptyJobsState />
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <JobList
              jobs={jobs}
              onDeleteJob={handleDeleteJob}
              deletingJobId={deletingJobId}
            />
            
            {hasMoreJobs && (
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="border-mim-teal text-mim-teal hover:bg-mim-teal hover:text-white"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Load More Jobs
                    </>
                  )}
                </Button>
              </div>
            )}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default JobManager;
