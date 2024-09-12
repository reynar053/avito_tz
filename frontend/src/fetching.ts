const BASE_URL = "http://localhost:3000";

interface PagingResponse<T> {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  current: number;
  data: T[];
}

export const fetchPagingData = (
  endpointName: string,
  pageNumber = 1,
  itemsPerPage = 10
) => {
  return fetch(
    `${BASE_URL}/${endpointName}?_page=${pageNumber}&_per_page=${itemsPerPage}`
  ).then((response) => {
    if (response.ok) {
      return response.json().then((data) => {
        return { ...data, current: pageNumber };
      });
    } else {
      response.json().then((data) => {
        console.log(data.message);
      });
      throw new Error("При получении заказов произошла ошибка!");
    }
  });
};

export const newPage = (
  page: number,
  endpointName: string,
  applyNewPage: (data: any) => void,
  rowsPerPage = 10
) => {
  fetchPagingData(endpointName, page, rowsPerPage).then((data) => {
    applyNewPage(data);
    console.log(data);
  });
};

export type { PagingResponse };
