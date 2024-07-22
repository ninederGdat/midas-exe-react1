import React, { useState, useEffect } from "react";
import { menuItemModel } from "../../../Interfaces";
import { MenuItemCard } from ".";
import { useGetMenuItemsQuery } from "../../../Apis/menuItemApi";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/menuItemSlice";
import { MainLoader } from "../Common";
import { RootState } from "../../../Storage/Redux/store";
import { SD_SortTypes } from "../../../Utility/SD";

const ITEMS_PER_PAGE = 6;

function MenuItemList() {
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);

  const { data, isLoading } = useGetMenuItemsQuery(null);
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );
  const [sortName, setSorName] = useState(SD_SortTypes.NAME_A_Z);
  const sortOptions: Array<SD_SortTypes> = [
    SD_SortTypes.PRICE_LOW_HIGH,
    SD_SortTypes.PRICE_HIGH_LOW,
    SD_SortTypes.NAME_A_Z,
    SD_SortTypes.NAME_Z_A,
  ];

  useEffect(() => {
    if (data) {
      const tempMenuArray = handleFilter(
        sortName,
        selectedCategory,
        searchValue
      );
      setMenuItems(tempMenuArray);
    }
  }, [searchValue, sortName, selectedCategory, data]);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setMenuItem(data));
      setMenuItems(data);

      const tempCategoryList = ["All"];
      data.forEach((item: menuItemModel) => {
        if (tempCategoryList.indexOf(item.categoryName) === -1) {
          tempCategoryList.push(item.categoryName);
        }
      });

      setCategoryList(tempCategoryList);
    }
  }, [isLoading, data, dispatch]);

  const handleFilter = (
    sortType: SD_SortTypes,
    category: string,
    search: string
  ) => {
    let tempArray =
      category === "All"
        ? [...data]
        : data.filter(
            (item: menuItemModel) =>
              item.categoryName.toUpperCase() === category.toUpperCase()
          );

    if (search) {
      tempArray = tempArray.filter((item: menuItemModel) =>
        item.productName?.toUpperCase().includes(search.toUpperCase())
      );
    }

    switch (sortType) {
      case SD_SortTypes.PRICE_LOW_HIGH:
        tempArray.sort((a: any, b: any) => a.price - b.price);
        break;
      case SD_SortTypes.PRICE_HIGH_LOW:
        tempArray.sort((a: any, b: any) => b.price - a.price);
        break;
      case SD_SortTypes.NAME_A_Z:
        tempArray.sort((a: any, b: any) =>
          a.productName.localeCompare(b.productName)
        );
        break;
      case SD_SortTypes.NAME_Z_A:
        tempArray.sort((a: any, b: any) =>
          b.productName.localeCompare(a.productName)
        );
        break;
      default:
        break;
    }

    return tempArray;
  };

  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll(".custom-buttons");
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add("active");
        const localCategory = index === 0 ? "All" : categoryList[index];
        setSelectedCategory(localCategory);
        const tempArray = handleFilter(sortName, localCategory, searchValue);
        setMenuItems(tempArray);
        setCurrentPage(1); // Reset to first page when category changes
      } else {
        button.classList.remove("active");
      }
    });
  };

  const handleSortClick = (i: number) => {
    setSorName(sortOptions[i]);
    const tempArray = handleFilter(
      sortOptions[i],
      selectedCategory,
      searchValue
    );
    setMenuItems(tempArray);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const totalPages = Math.ceil(menuItems.length / ITEMS_PER_PAGE);

  const currentData = menuItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center">
          {categoryList.map((categoryName, index) => (
            <li className="nav-item" key={index}>
              <button
                className={`nav-link p-0 pb-2 custom-buttons fs-5 ${
                  index === 0 ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(index)}
              >
                {categoryName}
              </button>
            </li>
          ))}

          <li className="nav-item dropdown" style={{ marginLeft: "auto" }}>
            <div
              className="nav-link dropdown-toggle text-dark fs-6 border"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sortName}
            </div>
            <ul className="dropdown-menu">
              {sortOptions.map((sortType, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortClick(index)}
                >
                  {sortType}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      {currentData.length > 0 &&
        currentData.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}

      <div className="pagination mt-3">
        <button
          className="btn btn-primary me-2"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary ms-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MenuItemList;
