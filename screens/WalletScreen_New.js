import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import BgCover from "../Component/Bg/BackgroundCover";
import { Pages } from "react-native-pages";
import dummyData from "../helper/dataMay-8-2021.json";
import { Dropdown } from "react-native-material-dropdown";
import CalendarPicker from "react-native-calendar-picker";
import Modal from "react-native-modal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { numberWithCommas } from "../helper/helper";
import {
  getCOGbalance,
  getComissionBalance,
  getBankList,
  getWalletHistory,
  getWalletHistoryCOG,
} from "../Api/api";
import moment from "moment";

const WalletScreen = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [title, setTitle] = useState("Commission");
  const [buttonText, setButtonText] = useState("Withdraw Commission");
  const [dateFilter, setDateFilter] = useState();
  const [refresh, setRefresh] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [modalCalender, setModalCalender] = useState(false);
  const [balance, setBalance] = useState({
    commission: 0,
    account: 0,
  });
  const [loading, setLoading] = useState(true);
  const [WalletHistory, setWalletHistory] = useState([]);
  let [obj, setObj] = useState({});
  let [obj2, setObj2] = useState({});
  let [variableObj, setVariableObj] = useState({});

  let [variableObj2, setVariableObj2] = useState({});
  const [dummyKey, setDummyKey] = useState([]);
  const [dummyKey2, setDummyKey2] = useState([]);
  const [varibleKey, setVariableKey] = useState([]);
  const [varibleKey2, setVariableKey2] = useState([]);
  let [loading2, setLoading2] = useState(true);
  let pageRef = useRef();

  let filterByDateRange = () => {
    let newData;
    if (currentIndex === 0) {
      newData = dummyKey.filter((i) => moment(i).isBetween(startDate, endDate));
      setVariableKey(newData);
    } else if (currentIndex === 1) {
      newData = dummyKey2.filter((i) =>
        moment(i).isBetween(startDate, endDate)
      );
      setVariableKey2(newData);
    }

    //setVariableObj(newHistory);
    setModalCalender(false);
    setEndDate();
    setStartDate();
  };

  let onDateChange = (date, type) => {
    console.log(date, type, "dates");
    if (type === "END_DATE") {
      setEndDate(date);
    } else {
      setStartDate(date);
    }
  };

  // useEffect(() => {
  //   if (dateFilter) {
  //     let newDummy = { ...dummyObj };
  //     let newDate = new Date();
  //     newDate.setDate(new Date().getDate() - dateFilter);
  //     Object.keys(newDummy).forEach((ori) => {
  //       console.log(newDate <= new Date(ori), "ckcki", newDate);
  //       if (newDate <= new Date(ori)) {
  //         console.log(
  //           new Date(ori).toLocaleDateString(),
  //           newDate.toLocaleDateString()
  //         );
  //       } else {
  //         delete newDummy[ori];
  //         console.log(Object.keys(newDummy).length, "lent");
  //       }
  //     });
  //     setObj(newDummy);
  //   }
  //   setRefresh(!refresh);
  // }, [dateFilter]);

  useEffect(() => {
    if (currentIndex === 0) {
      setTitle("Commission");
      setButtonText("Withdraw Commission");
    }

    if (currentIndex === 1) {
      setTitle("Account Balance");
      setButtonText("Withdraw ");
    }

    if (currentIndex === 2) {
      setTitle("Account Balance");
      setButtonText("In-wallet Transfer");
    }
  }, [currentIndex]);

  let getBalance = async () => {
    try {
      let commissionResponse = await getComissionBalance();
      console.log(commissionResponse, "commission resopnse");
      let accountBalanceResponse = await getCOGbalance();
      console.log(accountBalanceResponse, "cog resopnse");
      setBalance({
        commission: commissionResponse.data.balance,
        account: accountBalanceResponse.data.balance,
      });
      setLoading(false);
    } catch (e) {
      console.log(e, "commm");
    }
  };
  let getHistory = async () => {
    try {
      let historyResponse = await getWalletHistory();
      let historyResponse2 = await getWalletHistoryCOG();
      console.log(historyResponse.data);
      setWalletHistory(historyResponse.data);
      let dummyObj = {};
      let dummyObj2 = {};

      historyResponse.data.forEach((i) => {
        let date = moment(i.date).toDate();
        date.setHours(0, 0, 0, 0);
        console.log(date, "klko");
        if (dummyObj.hasOwnProperty(date)) {
          dummyObj[date].push(i);
        } else {
          dummyObj[date] = [i];
        }
      });

      historyResponse2.data.forEach((i) => {
        let date = moment(i.date).toDate();
        date.setHours(0, 0, 0, 0);
        console.log(date, "klko");
        if (dummyObj2.hasOwnProperty(date)) {
          dummyObj2[date].push(i);
        } else {
          dummyObj2[date] = [i];
        }
      });

      setObj(dummyObj);
      setObj2(dummyObj2);
      console.log(dummyObj);
      let sortedArray = Object.keys(dummyObj).sort(function (a, b) {
        return new Date(b) - new Date(a);
      });

      let sortedArray2 = Object.keys(dummyObj2).sort(function (a, b) {
        return new Date(b) - new Date(a);
      });

      setDummyKey(sortedArray);
      setVariableKey(sortedArray);
      setVariableObj(dummyObj);

      setDummyKey2(sortedArray2);
      setVariableKey2(sortedArray2);
      setVariableObj2(dummyObj2);

      setLoading2(false);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setLoading(true);
      setLoading2(true);
      getBalance();

      getHistory();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  React.useEffect(() => {
    getBankList();
  }, []);

  return (
    <BgCover name="Wallet">
      {loading || loading2 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#F18921" />
        </View>
      ) : (
        <View style={{ flex: 1, height: "100%", marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginBottom: 20,
              alignSelf: "flex-end",
              marginHorizontal: 20,
            }}
            onPress={() => {
              props.navigation.navigate("FundWallet");
            }}
          >
            <Text
              style={{ color: "black", fontWeight: "bold", marginRight: 5 }}
            >
              Fund Wallet
            </Text>
            <View
              style={{
                backgroundColor: "#F18921",
                paddingVertical: 2,
                borderRadius: 10,
                paddingHorizontal: 3,
                marginRight: 5,
                alignSelf: "flex-start",
                top: 0,
              }}
            >
              <Image
                style={{ bottom: 0 }}
                source={require("../assets/addition-thick-symbol.png")}
              />
            </View>
          </TouchableOpacity>
          <Pages
            onHalfway={(i, k) => {
              setCurrentIndex(Number(i));
            }}
            onScrollEnd={(index) => {
              // setCurrentIndex(Number(index));
            }}
            backgroundColor={"white"}
            horizontal={true}
            indicatorColor="none"
            ref={(r) => (pageRef.current = r)}
          >
            {[1, 2].map((i) => (
              <View style={{ flex: 1 }} key={i}>
                <View
                  style={{
                    marginHorizontal: 20,
                    padding: 20,
                    backgroundColor: "#0A956A",
                    marginBottom: 20,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      alignSelf: "center",
                      textAlign: "center",
                      fontSize: 18,
                    }}
                  >
                    {title}
                  </Text>

                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      alignSelf: "center",
                      textAlign: "center",
                      fontSize: 25,
                      marginVertical: 10,
                    }}
                  >
                    {numberWithCommas(
                      currentIndex === 0
                        ? Number(balance.commission)
                        : balance.account
                    )}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginTop: 10,
                    }}
                  >
                    <TouchableOpacity
                      style={{ alignSelf: "flex-start" }}
                      onPress={() => {
                        pageRef.current.scrollToPage(0);
                      }}
                    >
                      <View
                        style={{
                          padding: 5,
                          backgroundColor:
                            currentIndex === 0 ? "white" : "transparent",
                          alignSelf: "center",
                          borderRadius: 7,
                        }}
                      >
                        <Image
                          source={require("../assets/coins.png")}
                          style={{
                            alignSelf: "center",
                          }}
                        />
                      </View>
                      <Text style={{ color: "white", fontSize: 12 }}>
                        Commission
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ alignSelf: "flex-start" }}
                      onPress={() => {
                        pageRef.current.scrollToPage(1);
                      }}
                    >
                      <View
                        style={{
                          padding: 5,
                          backgroundColor:
                            currentIndex === 1 ? "white" : "transparent",
                          alignSelf: "center",
                          borderRadius: 7,
                        }}
                      >
                        <Image
                          source={require("../assets/money.png")}
                          style={{
                            alignSelf: "center",
                          }}
                        />
                      </View>
                      <Text style={{ color: "white", fontSize: 12 }}>
                        Account
                      </Text>

                      <Text style={{ color: "white", fontSize: 12 }}>
                        Balance
                      </Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                      style={{ alignSelf: "flex-start" }}
                      onPress={() => {
                        pageRef.current.scrollToPage(2);
                      }}
                    >
                      <View
                        style={{
                          padding: 5,
                          backgroundColor:
                            currentIndex === 2 ? "white" : "transparent",
                          alignSelf: "center",
                          borderRadius: 7,
                        }}
                      >
                        <Image
                          source={require("../assets/purse-small.png")}
                          style={{
                            alignSelf: "center",
                          }}
                        />
                      </View>

                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: 12,
                        }}
                      >
                        In-wallet
                      </Text>
                      <Text style={{ color: "white", fontSize: 12 }}>
                        Transaction
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    if (currentIndex === 1)
                      props.navigation.navigate("WithdrawCOG");
                    if (currentIndex === 0)
                      props.navigation.navigate("WithdrawComission");

                    if (currentIndex === 2)
                      props.navigation.navigate("WalletToWallet");
                  }}
                  style={{
                    width: 110,
                    paddingVertical: 10,
                    marginHorizontal: 20,
                    borderRadius: 10,
                    alignSelf: "flex-start",
                    backgroundColor: "#F18921",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {buttonText}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    marginTop: 10,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                      onLayout={(e) => {
                        //setLineWidth(e.nativeEvent.layout.width);
                      }}
                    >
                      Transaction history
                    </Text>
                    <View
                      style={{
                        width: 70,
                        backgroundColor: "#0A956A",
                        height: 3,
                        marginBottom: 10,
                      }}
                    ></View>
                  </View>
                  <TouchableOpacity
                    style={{
                      marginRight: 20,
                      justifyContent: "center",
                      flexDirection: "row",
                      borderColor: "#F18921",
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      setModalCalender(true);
                    }}
                    //  style={{ flexDirection: "row" }}
                  >
                    <MaterialCommunityIcons
                      name="calendar-range"
                      color="grey"
                      size={20}
                    />
                    {/* <Text>Date Range</Text> */}
                  </TouchableOpacity>
                  <Dropdown
                    // label="Status"
                    placeholder="Days"
                    placeholderTextColor="grey"
                    onChangeText={(value) => {
                      if (value !== "all") {
                        let newDummy = { ...obj };
                        let newDate = new Date();
                        newDate.setDate(new Date().getDate() - Number(value));
                        newDate.setHours(0, 0, 0, 0);
                        let newData;
                        if (currentIndex === 0) {
                          newData = dummyKey.filter(
                            (u) => new Date(u) >= newDate
                          );
                          setVariableKey(newData);
                        }

                        if (currentIndex === 1) {
                          newData = dummyKey2.filter(
                            (u) => new Date(u) >= newDate
                          );
                          setVariableKey2(newData);
                        }
                        setRefresh(!refresh);
                        setDateFilter(Number(value));
                      } else {
                        if (currentIndex === 0) setVariableKey(dummyKey);

                        if (currentIndex === 1) setVariableKey2(dummyKey2);
                      }
                    }}
                    baseColor="grey"
                    textColor="black"
                    //   itemColor="white"
                    selectedItemColor="black"
                    fontSize={12}
                    dropdownOffset={{ top: 0, left: 0 }}
                    inputContainerStyle={{
                      borderBottomColor: "transparent",
                      //   width: 100,
                    }}
                    containerStyle={{
                      width: 95,
                    }}
                    data={[
                      {
                        label: "All ",
                        value: "all",
                      },
                      {
                        label: "Today",
                        value: 0,
                      },

                      {
                        label: "Yesterday",
                        value: 1,
                      },
                      {
                        label: "3 days Ago",
                        value: 3,
                      },
                      {
                        label: "1 week Ago",
                        value: 7,
                      },
                      {
                        label: "2 Weeks",
                        value: 14,
                      },

                      {
                        label: "1 month Ago",
                        value: 30,
                      },

                      {
                        label: "2 month Ago",
                        value: 60,
                      },

                      {
                        label: "3 month Ago",
                        value: 90,
                      },

                      {
                        label: "6 month Ago",
                        value: 180,
                      },
                      {
                        label: "1 year Ago",
                        value: 365,
                      },
                    ]}
                  />
                </View>
                <ScrollView
                  nestedScrollEnabled={true}
                  style={{ flex: 1 }}
                  contentContainerStyle={
                    {
                      //   height: 80,
                      //  flex: 1,
                    }
                  }
                >
                  {currentIndex === 0 &&
                    varibleKey.map((each) => {
                      // console.log(each, "ppp");
                      return (
                        <View
                          style={{
                            marginHorizontal: 20,
                            //    backgroundColor: "green",
                            flex: 1,
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: "#E8E8E8",
                              padding: 3,
                            }}
                          >
                            <Text style={{ fontWeight: "bold" }}>
                              {moment(each).format("Do MMM YY")}
                            </Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            {obj[each].map((ele, index) => {
                              return (
                                <TouchableOpacity
                                  // style={{ flex: 1 }}

                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginVertical: 2,
                                    //   flexGrow: 1,
                                  }}
                                  onPress={() => {
                                    props.navigation.navigate(
                                      "WalletDetail",
                                      ele
                                    );
                                  }}
                                >
                                  <Text style={{ width: 20 }}>{index + 1}</Text>
                                  <Image
                                    source={require("../assets/money-new.png")}
                                  />
                                  <Text>{ele.Beneficiary.split("-")[0]}</Text>
                                  <Text
                                    style={{
                                      color: ele.type == "Cr" ? "green" : "red",
                                    }}
                                  >
                                    {numberWithCommas(ele.amount)}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        </View>
                      );
                    })}

                  {currentIndex === 1 &&
                    varibleKey2.map((each) => {
                      // console.log(each, "ppp");
                      return (
                        <View
                          style={{
                            marginHorizontal: 20,
                            //    backgroundColor: "green",
                            flex: 1,
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: "#E8E8E8",
                              padding: 3,
                            }}
                          >
                            <Text style={{ fontWeight: "bold" }}>
                              {moment(each).format("Do MMM YY")}
                            </Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            {obj2[each].map((ele, index) => {
                              return (
                                <TouchableOpacity
                                  // style={{ flex: 1 }}

                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginVertical: 2,
                                    //   flexGrow: 1,
                                  }}
                                  onPress={() => {
                                    props.navigation.navigate(
                                      "WalletDetail",
                                      ele
                                    );
                                  }}
                                >
                                  <Text style={{ width: 20 }}>{index + 1}</Text>
                                  <Image
                                    source={require("../assets/money-new.png")}
                                  />
                                  <Text>{ele.Beneficiary.split("-")[0]}</Text>
                                  <Text
                                    style={{
                                      color: ele.type == "Cr" ? "green" : "red",
                                    }}
                                  >
                                    {numberWithCommas(ele.amount)}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        </View>
                      );
                    })}
                </ScrollView>
              </View>
            ))}
          </Pages>
        </View>
      )}

      <Modal
        isVisible={modalCalender}
        onBackButtonPress={() => {
          setModalCalender(false);
        }}
        style={styles.modal}
        animationInTiming={300}
        animationOutTiming={300}
        backdropOpacity={0.5}
        animationIn="slideInDown"
        animationOut="slideOutUp"
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ height: "100%", width: "100%", flex: 1 }}
          onPress={() => {
            console.log("first 11");
            setModalCalender(false);
          }}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={{ backgroundColor: "white", marginHorizontal: 10 }}>
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                //  minDate={minDate}
                maxDate={new Date()}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#F18921"
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
              />
              {startDate && endDate && (
                <TouchableOpacity
                  onPress={() => {
                    filterByDateRange();
                  }}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    alignSelf: "center",
                    backgroundColor: "#F18921",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Proceed
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </BgCover>
  );
};

const styles = StyleSheet.create({
  wrapper: { height: 300 },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  modal: {
    //  justifyContent: "center",
    margin: 0,
    position: "absolute",
    flex: 1,
    height: "100%",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
});

export default WalletScreen;
