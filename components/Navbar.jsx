"use client";

import React from "react";
import { Tab } from "@headlessui/react";

import { tabs } from "@/data";

import PositionsTab from "./tabs/PositionsTab";
import HierarchyTab from "./tabs/HierarchyTab";
import SetsOfEquipmentTab from "./tabs/SetsOfEquipmentTab";
import StaffListTab from "./tabs/StaffListTab";

const Navbar = () => {
  return (
    <Tab.Group defaultIndex={1}>
      <Tab.List className="w-full flex justify-between border-default border-2 rounded-t-lg p-1">
        {({ selectedIndex }) =>
          tabs.map((tab, index) => (
            <Tab
              key={index}
              className={`h-[48px] flex-1 justify-center items-center text-default border-transparent border-2 rounded-lg text-sm/[24px] font-medium ${
                selectedIndex === index && "selected-tab"
              }`}
            >
              {tab}
            </Tab>
          ))
        }
      </Tab.List>
      <Tab.Panels className="h-max flex-1 w-full">
        <Tab.Panel>
          <HierarchyTab />
        </Tab.Panel>
        <Tab.Panel>
          <PositionsTab />
        </Tab.Panel>
        <Tab.Panel>
          <StaffListTab />
        </Tab.Panel>
        <Tab.Panel>
          <SetsOfEquipmentTab />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Navbar;
