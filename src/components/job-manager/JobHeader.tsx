
import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2, RefreshCw, History, Loader2 } from 'lucide-react';

interface JobHeaderProps {
  jobCount: number;
  onRefresh: () => void;
  onClearAll: () => Promise<void>;
  clearingAll: boolean;
}

const JobHeader = ({ jobCount, onRefresh, onClearAll, clearingAll }: JobHeaderProps) => {
  return (
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
            onClick={onRefresh}
            className="border-mim-teal text-mim-teal hover:bg-mim-teal hover:text-white flex-shrink-0"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          {jobCount > 0 && (
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
                    onClick={onClearAll}
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
  );
};

export default JobHeader;
