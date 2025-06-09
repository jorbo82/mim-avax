
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useJobTracking } from '@/hooks/useJobTracking';
import JobHeader from './job-manager/JobHeader';
import JobList from './job-manager/JobList';
import EmptyJobsState from './job-manager/EmptyJobsState';

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
        <JobHeader
          jobCount={jobs.length}
          onRefresh={refetchJobs}
          onClearAll={handleClearAll}
          clearingAll={clearingAll}
        />
        <CardContent>
          {jobs.length === 0 ? (
            <EmptyJobsState />
          ) : (
            <JobList
              jobs={jobs}
              onDeleteJob={handleDeleteJob}
              deletingJobId={deletingJobId}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobManager;
