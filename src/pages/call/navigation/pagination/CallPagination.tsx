import { Box } from "@aircall/tractor";
import { Pagination } from "antd";
import {
  DEFAULT_PAGE_SIZE,
  useCallContext,
} from "../../../../context/CallContext";

export default function CallPagination() {
  const { pageIndex, setPageIndex, pageSize, setPageSize, totalCount } =
    useCallContext();
  return (
    <Pagination
      size="small"
      current={pageIndex + 1}
      defaultCurrent={1}
      total={totalCount}
      onChange={(page) => setPageIndex(page - 1)}
      onShowSizeChange={(_, size) => setPageSize(size)}
      pageSize={pageSize}
      defaultPageSize={DEFAULT_PAGE_SIZE}
    />
  );
}
