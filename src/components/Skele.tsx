import { Skeleton } from "@/components/shad/ui/skeleton";

const Skele = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
      <Skeleton className="h-[200px] w-full" />
    </div>
  );
};

export default Skele;
