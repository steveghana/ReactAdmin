// import * as React from "react";
import { render } from "react-dom";
import { Route } from "react-router-dom";
import { Admin, CustomRoutes, Resource } from "react-admin";
import Locations from "./components";
import DoorsComponent from "./components/Doors";

import dataprovider from "./dataProvider";
import CommentEdit from "./components/CommentEdit";
const App = () => (
  <Admin
    // title=""
    dataProvider={dataprovider}
  >
    <CustomRoutes noLayout>
      <Route path="/locations/:id" element={<CommentEdit />} />
    </CustomRoutes>
    <CustomRoutes noLayout>
      <Route path="/workers/:id" element={<CommentEdit />} />
    </CustomRoutes>
    <Resource name="locations" list={Locations} />
    <Resource name="doors" list={DoorsComponent} />
  </Admin>
);

export default App;
