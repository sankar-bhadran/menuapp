"use client";
import React, { useEffect, useState } from "react";
import Listingpage from "../listing/Listingpage";

interface MenuItem {
  id: string;
  menuName: string;
}

type MenuItems = {
  id: string;
  itemName: string;
  price: number;
  description: string;
  menuId: string;
};

const SectionOne = () => {
  const [allMenu, setAllMenu] = useState<MenuItem[]>([]);
  const [getAllItems, setGetAllItems] = useState<MenuItems[]>([]);

  const getAllMenu = async () => {
    try {
      const response = await fetch(
        "https://menuapp-8ted.onrender.com/api/getmenu"
      );
      const data = await response.json();
      setAllMenu(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMenu();
  }, []);
  console.log(`allmenu ${allMenu}`);

  const handleIdClick = async (id: string) => {
    console.log(id);
    try {
      const response = await fetch(
        `https://menuapp-8ted.onrender.com/api/getmenuitem?id=${id}`
      );
      const data = await response.json();
      setGetAllItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-[100%] h-[80px] bg-[url('/images/sectiononepic.png')] flex justify-center gap-4 p-2 text-white">
        {allMenu.map((val) => (
          <button
            key={val.id}
            className="border border-[#0796EF] pt-[13px] pr-[25px] pb-[13px] pl-[23px] text-[16px] leading-[23.71px] font-semibold hover:bg-[#0796EF] transition duration-200"
            onClick={() => handleIdClick(val.id)}
          >
            {val.menuName}
          </button>
        ))}
      </div>
      <Listingpage items={getAllItems} />
    </>
  );
};

export default SectionOne;
