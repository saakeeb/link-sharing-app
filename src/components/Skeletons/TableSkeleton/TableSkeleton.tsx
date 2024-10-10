import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TableSkeleton = () => {
  return (
    <>
      <Skeleton count={5} height={40} className="my-[2px]" />
    </>
  );
};

export default TableSkeleton;
