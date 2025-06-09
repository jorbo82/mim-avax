
import { History } from 'lucide-react';

const EmptyJobsState = () => {
  return (
    <div className="text-center py-8 text-muted-foreground">
      <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
      <p className="font-medium">No generation jobs yet</p>
      <p className="text-sm mt-1">Start generating images to see your job history here</p>
    </div>
  );
};

export default EmptyJobsState;
