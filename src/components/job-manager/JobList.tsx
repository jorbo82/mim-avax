
import { ScrollArea } from '@/components/ui/scroll-area';
import { ImageGenerationJob } from '@/types/jobTracking';
import JobCard from './JobCard';

interface JobListProps {
  jobs: ImageGenerationJob[];
  onDeleteJob: (jobId: string) => Promise<void>;
  deletingJobId: string | null;
}

const JobList = ({ jobs, onDeleteJob, deletingJobId }: JobListProps) => {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-3">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onDelete={onDeleteJob}
            isDeleting={deletingJobId === job.id}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default JobList;
