import { fetchLeadsProps } from "./../redux/leads/asyncActions";
import { useRef, useEffect } from "react";

const useAppFetch = <T>(fetch: (args: T) => void, onPage: (value: number) => void, searchParams: T, depency: any) => {
  const isMounted = useRef<boolean>(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async function () {
      if (isMounted.current) {
        await fetch({ ...searchParams, signal } as T);
      } else if (!isMounted.current) {
        const { page, take }: any = searchParams;
        await fetch({ page, take, signal } as T);
      }
      isMounted.current = true;
    })();

    return () => {
      controller.abort();
    };
  }, [...depency]);

  const onChangePage = (page: number) => {
    onPage(page);
  };

  return { onChangePage };
};

export default useAppFetch;

// const useAppFetch = (fetch: (args: fetchLeadsProps) => void, params: { currentPage?: number }) => {
//   React.useEffect(() => {
//     const controller = new AbortController();
//     const signal = controller.signal;
//     (async function () {
//       fetch({ take: 10, page: 1, signal });
//     })();

//     return () => {
//       controller.abort();
//     };
//   }, [params.currentPage]);

//   const onChangePage = () => {};

//   return { onChangePage };
// };

// export default useAppFetch;
