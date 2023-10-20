import React, { useEffect, useState } from "react";
import Paginations from "./Pagination";
import "./Table.css";
import Spinner from "./spinner/Spinner";
const Table = ({
  data,
  count,
  limit,
  setPage,
  page,
  setLimit,
  update,
  deleteUser,
  updateFunction,
  setShow,
  handleUserUpdate,
  handleUserdelete,
  firstNameForFilters,
  lastNameForFilters,
  usernameForFilters,
  isAdminForFilters,
  idForFilters,
  handleSubmitFilter,
  firstNameForFiltersV,
  view,
  handleView
}) => {
  useEffect(() => {
    console.log(firstNameForFiltersV);
  }, [firstNameForFiltersV]);
  let headersOfUserTable, rowsofUserTable, filterHeaders;
  const eventHandlingFunction = (e) => {
    if (e.target.name == "firstName") {
      console.log(e.target.name);
      console.log(e.target.value);
      console.log(firstNameForFilters);
      firstNameForFilters(e.target.value);
    }
    if (e.target.name == "lastName") {
      lastNameForFilters(e.target.value);
    }
    if (e.target.name == "username") {
      usernameForFilters(e.target.value);
    }
    if (e.target.name == "id") {
      idForFilters(e.target.value);
    }
    if (e.target.name == "isAdmin") {
      isAdminForFilters(e.target.value);
      console.log(isAdminForFilters);
    }
  };
  if (data.length > 0) {
    let keys = Object.keys(data[0]);
    filterHeaders = Object.keys(data[0]).map((k) => {
      return (
        <>
          <label
            style={{
              margin: "10px",
              fontWeight: "bold",
              color: "rgb(85, 174, 194)",
            }}
          >
            {k}
          </label>
          {k == "isAdmin" ? (
            <>
              <select
                name={k}
                class="form-select"
                style={{ width: "25%", borderRadius: "10px" }}
                aria-label="Default select example"
                onClick={(e) => {
                  console.log(isAdminForFilters);
                  eventHandlingFunction(e);
                }}
              >
                <option value={true}>True</option>
                <option value={true}>False</option>
              </select>
            </>
          ) : (
            <>
              <input
                name={k}
                type="text"
                onChange={(e) => eventHandlingFunction(e)}
                value={firstNameForFiltersV}
              />
            </>
          )}
        </>
      );
    });
    headersOfUserTable = Object.keys(data[0]).map((k) => {
      return <th key={k}>{k}</th>;
    });

    rowsofUserTable = data.map((d) => {
      let singleDataRow = [];
      for (let index = 0; index < keys.length; index++) {
        if (d[keys[index]] === true) {
          singleDataRow.push(<td key={keys.length + 1}>True</td>);
        }
        if (d[keys[index]] === false) {
          singleDataRow.push(<td key={keys.length + 1}>False</td>);
        } else {
          singleDataRow.push(<td key={index}>{d[keys[index]]}</td>);
        }

        // console.log(d[keys[index]])
      }
      if (update == true) {
        singleDataRow.push(
          <td>
            <button
              item={d.id}
              type="button"
              class="btn btn-primary"
              onClick={() => {
                handleUserUpdate(d);
                setShow((prev) => true);
              }}
            >
              Update
            </button>
          </td>
        );
      }
      if (deleteUser == true) {
        singleDataRow.push(
          <td>
            <button
              type="button"
              class="btn btn-danger"
              onClick={() => {
                handleUserdelete(d);
              }}
            >
              Delete
            </button>
          </td>
        );
      }
      if (view == true) {
        singleDataRow.push(
          <td>
           <button type="button" style={{color:"white"}} class="btn btn-warning" onClick={()=>{handleView(d)}}>View</button>
          </td>
        );
      }
      return <tr key={d[keys[0]]}>{singleDataRow}</tr>;
    });
    // console.log(rowsofUserTable)
  }
  const TableUserRecord = () => {
    return (
      <>
      {/* <Spinner/> */}

        <div className="main">
          <div>
            <Paginations
              count={count}
              limit={limit}
              setPage={setPage}
              page={page}
            />
          </div>
          <div className="dropDown">
            <select
              className="form-select"
              aria-label="Default select example"
              onClick={(e) => {
                setLimit((prev) => e.target.value);
              }}
            >
              <option selected>Limit</option>
              <option selected={limit == 1} value="1">
                One
              </option>

              <option selected={limit == 5} value="5">
                Five
              </option>
              <option selected={limit == 10} value="10">
                Ten
              </option>
              <option selected={limit == 15} value="15">
                Fifteen
              </option>
            </select>
          </div>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>{headersOfUserTable}</tr>
          </thead>
          <tbody>{rowsofUserTable}</tbody>
        </table>
      </>
    );
  };

  return <TableUserRecord />;
};

export default Table;
