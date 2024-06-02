import { AttachMoney, Dashboard } from "@mui/icons-material";
import { Tabs, Tab, Avatar } from "@mui/material";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "./TabPanel";

type Props = {
  loanRequestFactory: Function;
  loanListFactory: Function;
};

const BfbContainer = (props: Props) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  return (
    <div>
      <div>
        <br />
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab
            icon={
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <AttachMoney />
              </Avatar>
            }
            label="Request Loan"
            id="tab-0"
            aria-controls="tabpanel-0"
          />
          <Tab
            icon={
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <Dashboard />
              </Avatar>
            }
            label="Loans List"
            id="tab-1"
            aria-controls="tabpanel-1"
          />
        </Tabs>
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
          <TabPanel value={value} index={0}>
            {props.loanRequestFactory.apply(this, [props])}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {props.loanListFactory.apply(this, [props])}
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
};

export default BfbContainer;
