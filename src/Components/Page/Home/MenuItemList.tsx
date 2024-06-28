import React from "react";
import { useState, useEffect } from "react";
import { menuItemModel } from "../../../Interfaces";
import { MenuItemCard } from ".";
import { useGetMenuItemsQuery } from "../../../Apis/menuItemApi";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/menuItemSlice";
import { MainLoader } from "../Common";
import { RootState } from "../../../Storage/Redux/store";
import { SD_SortTypes } from "../../../Utility/SD";

function MenuItemList() {
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);

  const { data, isLoading } = useGetMenuItemsQuery(null);

  console.log(menuItems);

  const [sortName, setSorName] = useState(SD_SortTypes.NAME_A_Z);
  const sortOptions: Array<SD_SortTypes> = [
    SD_SortTypes.PRICE_LOW_HIGH,
    SD_SortTypes.PRICE_HIGH_LOW,
    SD_SortTypes.NAME_A_Z,
    SD_SortTypes.NAME_Z_A,
  ];

  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );

  useEffect(() => {
    if (data) {
      const tempMenuArray = handleFilter(
        sortName,
        selectedCategory,
        searchValue
      );
      setMenuItems(tempMenuArray);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
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
  }, [isLoading]);

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
      const tempArray2 = [...tempArray];
      tempArray = tempArray.filter((item: menuItemModel) =>
        item.productName?.toUpperCase().includes(search.toUpperCase())
      );
    }

    if (sortType === SD_SortTypes.PRICE_LOW_HIGH) {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => a.price - b.price);
    } else if (sortType === SD_SortTypes.PRICE_HIGH_LOW) {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => b.price - a.price);
    }

    if (sortType === SD_SortTypes.NAME_A_Z) {
      tempArray.sort(
        (a: menuItemModel, b: menuItemModel) =>
          a.productName.toUpperCase().charCodeAt(0) -
          b.productName.toUpperCase().charCodeAt(0)
      );
    }
    if (sortType === SD_SortTypes.NAME_Z_A) {
      tempArray.sort(
        (a: menuItemModel, b: menuItemModel) =>
          b.productName.toUpperCase().charCodeAt(0) -
          a.productName.toUpperCase().charCodeAt(0)
      );
    }

    return tempArray;
  };

  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll(".custom-buttons");
    let localCategory;
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add("active");
        if (index === 0) {
          localCategory = "All";
        } else {
          localCategory = categoryList[index];
        }
        setSelectedCategory(localCategory);
        const tempArray = handleFilter(sortName, localCategory, searchValue);
        setMenuItems(tempArray);
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
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center">
          {categoryList.map((categoryName, index) => (
            <li
              className="nav-item"
              style={{ ...(index === 0 && { marginLeft: "auto" }) }}
              key={index}
            >
              <button
                className={`nav-link p-0 pb-2 custom-buttons fs-5 ${
                  index === 0 && "active"
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

      {menuItems.length > 0 &&
        menuItems.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemList;
