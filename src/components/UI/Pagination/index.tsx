import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Button from "../Button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

type propsTypes = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  perPage?: string;
  currentPage?: number;
  totalPages?: number;
};

const Pagination = (props: propsTypes) => {
  const { hasNextPage, hasPrevPage, perPage, currentPage, totalPages } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? `1`;
  const per_page = searchParams?.get("per_page") ?? `${perPage}`;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        disabled={!hasPrevPage}
        onClick={() =>
          router.push(`?page=${Number(page) - 1}&per_page=${per_page}`)
        }
      >
        <span
          className={`${hasPrevPage ? "" : "cursor-not-allowed bg-red-400"} inline-flex rounded-md bg-tertiary px-4 py-1`}
        >
          <ChevronsLeft color="white" />
        </span>
      </Button>
      <div>
        Page {currentPage} / {totalPages}
      </div>
      <Button
        disabled={!hasNextPage}
        onClick={() =>
          router.push(`?page=${Number(page) + 1}&per_page=${per_page}`)
        }
      >
        <span
          className={`${hasNextPage ? "" : "cursor-not-allowed bg-red-400"} inline-flex rounded-md bg-tertiary px-4 py-1`}
        >
          <ChevronsRight color="white" />
        </span>
      </Button>
    </div>
  );
};

export default Pagination;
