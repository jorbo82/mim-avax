
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { ImageGenerationJob } from '@/types/jobTracking';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: ImageGenerationJob;
  onDelete: (jobId: string) => Promise<void>;
  isDeleting: boolean;
}

const JobCard = ({ job, onDelete, isDeleting }: JobCardProps) => {
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

  return (
    <Card className="border border-muted">
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
            onClick={() => onDelete(job.id)}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
