import React from 'react'
import { Pagination } from "react-bootstrap";

const Paginations = ({count,limit,handleSubmit,setPage,page}) => {
    let paginationItems = [];
    for (let index = 1; index <= Math.ceil(count / limit); index++) {
      paginationItems.push(
        <Pagination.Item
          key={index}
          onClick={(e) => {
            setPage((prev) => index);
         
          }}
          active={page == index}
        >
          {index}
        </Pagination.Item>
      );
    }
    const PaginationForUser = () => {
      return (
        <Pagination>
          <Pagination.Item
            key={0}
            onClick={(e) => {
              setPage((prev) => {
                if (prev <= 1) {
                  return Math.ceil(count / limit);
                }
                return prev - 1;
              });
           
            }}
          >
            PREVIOUS
          </Pagination.Item>
          {paginationItems}
          <Pagination.Item
            key={Math.ceil(count / limit) + 1}
            onClick={(e) => {
              setPage((prev) => {
                if (prev >= Math.ceil(count / limit)) {
                  return 1;
                }
                return prev + 1;
              });
             
            }}
          >
            Next
          </Pagination.Item>
        </Pagination>
      );
    };
  return (
    <>
        <PaginationForUser/>
    </>
  )
}

export default Paginations
