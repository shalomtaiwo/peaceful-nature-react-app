import React from "react";
import { useState } from "react";
import { auth, db } from "../../../../../Firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
import {
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";
import { getDocs, collection, query, where } from "firebase/firestore";
import alertify from "alertifyjs";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Logout() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [user, setUser] = useState({});
  const [orderLists, setOrderList] = useState([]);

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    if (user) {
      const getOrders = async (id) => {
        const orderCollectionRef = query(
          collection(db, "orders"),
          where("userID", "==", user.uid)
        );

        const data = await getDocs(orderCollectionRef);
        setOrderList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getOrders(user.uid);
    }
    if (user) {
      if (user.email === "tshalom01@gmail.com") {
        const getOrders = async () => {
          const orderCollectionRef = collection(db, "orders");

          const data = await getDocs(orderCollectionRef);
          setOrderList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getOrders(user.uid);
      }
    }
    // Notice the empty dependency array, there to make sure the effect is only run once when the component mounts
  }, [user]);
  function warningNotifier(message) {
    alertify.set("notifier", "position", "top-center");
    alertify.warning(message, 2);
  }

  const logout = async () => {
    await signOut(auth);
    window.location.reload();
    warningNotifier("Logged out of Peaceful Nature");
  };

  if (user && user.email === "tshalom01@gmail.com")
    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Dashboard" {...a11yProps(0)} />
            <Tab label="Orders" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <div className="currentLoggedInUser">
              <div className="loggedInDetails">
                <span>Hello {user?.displayName}. </span>
                <span>
                  Not {user?.displayName},
                  <span className="Userlogout" onClick={logout}>
                    {" "}
                    Logout
                  </span>
                </span>
                <p>
                  From your account dashboard you can view your recent orders.
                </p>
                <p>
                  <b>Email: {user?.email}</b>
                </p>
              </div>
              <div className="logoutButton">
                <Button variant="outlined" color="error" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 180 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Order Details</TableCell>
                    <TableCell align="right">Product</TableCell>
                    <TableCell align="right">Product Price (R)</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total Price (R)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderLists.map((neworder, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className="detailsOrder"
                      >
                        <div>
                          <span>
                            <b>Date: </b>
                          </span>{" "}
                          {neworder.OrderDate}
                        </div>
                        <div>
                          <span>
                            <b>Name: </b>
                          </span>{" "}
                          {neworder.profile.fullName}
                        </div>
                        <div>
                          <span>
                            <b>Phone: </b>
                          </span>
                          {neworder.Phone}
                        </div>
                        <div>
                          <span>
                            <b>Email: </b>
                          </span>
                          {neworder.profile.userEmail}
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {neworder.products.map((item, index) => {
                          return <div key={index}>{item.title}</div>;
                        })}
                      </TableCell>
                      <TableCell align="right">
                        {neworder.products.map((item, index) => {
                          return <div key={index}>{item.price}</div>;
                        })}
                      </TableCell>
                      <TableCell align="right">
                        {neworder.products.map((item, index) => {
                          return <div key={index}>{item.quantity}</div>;
                        })}
                      </TableCell>
                      <TableCell align="right">{neworder.Total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Box>
      </Box>
    );
  if (orderLists < 1)
    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Dashboard" {...a11yProps(0)} />
            <Tab label="Orders" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <div className="currentLoggedInUser">
              <div className="loggedInDetails">
                <span>Hello {user?.displayName}. </span>
                <span>
                  Not {user?.displayName},
                  <span className="Userlogout" onClick={logout}>
                    {" "}
                    Logout
                  </span>
                </span>
                <p>
                  From your account dashboard you can view your recent orders.
                </p>
              </div>
              <div className="logoutButton">
                <Button variant="outlined" color="error" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 180 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Order Details</TableCell>
                    <TableCell align="right">Product</TableCell>
                    <TableCell align="right">Product Price (R)</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total Price (R)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="detailsOrder"
                    >
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton animation="wave" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Box>
      </Box>
    );
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Orders" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div className="currentLoggedInUser">
            <div className="loggedInDetails">
              <span>
                Hello <b>{user?.displayName}.</b>{" "}
              </span>
              <span>
                Not {user?.displayName},
                <span className="Userlogout" onClick={logout}>
                  {" "}
                  Logout
                </span>
              </span>
              <p>
                From your account dashboard you can view your recent orders.
              </p>
              <p>
                <b>Email: {user?.email}</b>
              </p>
            </div>
            <div className="logoutButton">
              <Button variant="outlined" color="error" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 180 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Order Details</TableCell>
                  <TableCell align="right">Product</TableCell>
                  <TableCell align="right">Product Price (R)</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total Price (R)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderLists.map((neworder, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="detailsOrder"
                    >
                      <div>
                        <span>
                          <b>Date: </b>
                        </span>
                        {neworder.OrderDate}
                      </div>
                      <div>
                        <span>
                          <b>Phone: </b>
                        </span>
                        {neworder.Phone}
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      {neworder.products.map((item, index) => {
                        return <div key={index}>{item.title}</div>;
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {neworder.products.map((item, index) => {
                        return <div key={index}>{item.price}</div>;
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {neworder.products.map((item, index) => {
                        return <div key={index}>{item.quantity}</div>;
                      })}
                    </TableCell>
                    <TableCell align="right">{neworder.Total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Box>
    </Box>
  );
}
