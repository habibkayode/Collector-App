import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Bgcover from "../Component/Bg/BackgroundCover";
import { getAllCollection } from "../Api/api";
import RNPickerSelect from "react-native-picker-select";
import moment from "moment";
import DateRangePicker from "react-native-daterange-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import CalendarPicker from "react-native-calendar-picker";
import { Dropdown } from "react-native-material-dropdown";
import Modal from "react-native-modal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { numberWithCommas } from "../helper/helper";
import HistoryCard from "../Component/HistoryCard";
import { start } from "react-native-ble-manager";

const mapStateToProps = (state) => {
  return {
    pendingCollection: state.normal.pendingCollection,
    materialsObj: state.normal.materialsObj,
  };
};

const CollectionHistory = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [allCollection, setAllColleciton] = useState([]);
  const [stausFilter, setStatusFilter] = useState("all");
  const [showDatePicker, setDatePickerShow] = useState(false);
  const [dayDiff, setDayDiff] = useState("all");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [modalCalender, setModalCalender] = useState(false);
  const [showProceed, setShowProceed] = useState(false);

  let statusFun = (value, arr) => {
    let newCollection;
    if (value === "all") {
      newCollection = arr;
    } else if (value === "droppedoff") {
      newCollection = arr.filter((i) => i.drop_off_status === value);
    } else {
      newCollection = arr.filter((i) => i.drop_off_status !== "droppedoff");
    }

    return newCollection;
  };

  //filter data as allCollection is changing
  let dateRangeFunc = (begin, end, arry) => {
    let newData = arry.filter((i) =>
      moment(i.created_at).isBetween(begin, end)
    );

    return newData;
  };

  let byDaysFun = (value, arr) => {
    let newData;
    if (value == "all") {
      newData = arr;
    } else {
      let newDate = new Date();
      newDate.setDate(new Date().getDate() - Number(value));
      newData = arr.filter((i) => moment(newDate).isBefore(i.created_at));
    }

    return newData;
  };

  let filterByDateRange = () => {
    let newData = dateRangeFunc(startDate, endDate, allCollection);
    newData = statusFun(stausFilter, newData);

    // if (stausFilter === "all") {
    //   newData = allCollection.filter((i) =>
    //     moment(i.created_at).isBetween(startDate, endDate)
    //   );
    // } else {
    //   if (stausFilter === "droppedoff") {
    //     newData = allCollection.filter(
    //       (i) =>
    //         moment(i.created_at).isBetween(startDate, endDate) &&
    //         i.drop_off_status === "droppedoff"
    //     );
    //   } else {
    //     newData = allCollection.filter(
    //       (i) =>
    //         moment(i.created_at).isBetween(startDate, endDate) &&
    //         i.drop_off_status !== "droppedoff"
    //     );
    //   }
    // }

    setData(newData);
    setDayDiff("all");
    setModalCalender(false);
    //setEndDate();
    //  setStartDate();
    setShowProceed(false);
  };
  let filterByStatus = (value) => {
    let newCollection = statusFun(value, allCollection);
    if (dayDiff !== "all") {
      newCollection = byDaysFun(dayDiff, newCollection);
    }
    if (startDate && endDate) {
      newCollection = dateRangeFunc(startDate, endDate, newCollection);
    }

    // setStatusFilter(value);
    // if (value === "all") {
    //   newCollection = allCollection;
    // } else if (value === "droppedoff") {
    //   newCollection = allCollection.filter((i) => i.drop_off_status === value);
    // } else {
    //   newCollection = allCollection.filter(
    //     (i) => i.drop_off_status !== "droppedoff"
    //   );
    // }

    setData(newCollection);
  };

  let filterByDays = (value) => {
    let newData = byDaysFun(value, allCollection);
    newData = statusFun(stausFilter, newData);
    setStartDate();
    setEndDate();
    // if (value == "all") {
    //   if (stausFilter === "all") {
    //     setData(allCollection);
    //   } else {
    //     filterByStatus(stausFilter);
    //   }
    // } else {
    //   let newDate = new Date();
    //   newDate.setDate(new Date().getDate() - Number(value));
    //   let newData = allCollection.filter((i) =>
    //     moment(newDate).isBefore(i.created_at)
    //   );
    //   console.log(newData, "all");
    //   setData(newData);
    // }

    setData(newData);
  };

  let getAllCollectionCaller = async () => {
    try {
      let response = await getAllCollection(page);

      // console.log(response, "pagess");
      if (page === 1) {
        setData(response);
        setAllColleciton(response);
      } else {
        let dataToBeAdded;
        if (value == "all") {
          // setData(allCollection);
          dataToBeAdded = response;
        } else {
          let newDate = new Date();
          newDate.setDate(new Date().getDate() - Number(value));
          dataToBeAdded = response.filter((i) =>
            moment(newDate).isBefore(i.created_at)
          );
        }
        setData((prev) => [...prev, ...dataToBeAdded]);
        setAllColleciton((prev) => [...prev, ...response]);
      }
      console.log("her");
      setLoading(false);
      setRefreshing(false);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      //  setLoading(true);
      setPage(1);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    if (page) {
      getAllCollectionCaller().then(() => {
        console.log("finishi loading", page);
        setLoading(false);
        setRefreshing(false);
      });
    }
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };
  let handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
  };

  let onDateChange = (date, type) => {
    console.log(date, type, "dates");
    if (type === "END_DATE") {
      setEndDate(date);
      setShowProceed(true);
    } else {
      setStartDate(date);
    }
  };

  return (
    <Bgcover name="Collection History">
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#F18921" />
        </View>
      ) : allCollection.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, textAlign: "center", color: "#F18921" }}>
            No Collection Data yet..
          </Text>
        </View>
      ) : (
        <View style={{ marginBottom: 100 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginHorizontal: 20,
              marginBottom: 10,
              color: "black",
            }}
          >
            Filter By
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 10,
              width: "100%",
              //  backgroundColor: "red",
              marginBottom: 20,
            }}
          >
            <Dropdown
              placeholder="Status"
              placeholderTextColor="gray"
              baseColor="grey"
              onChangeText={(value, index) => {
                filterByStatus(value);
              }}
              // textColor="white"
              fontSize={12}
              dropdownOffset={{ top: 0, left: 0 }}
              containerStyle={{
                borderWidth: 1,
                borderColor: "#F18921",
                borderRadius: 10,
                paddingHorizontal: 10,
              }}
              inputContainerStyle={{
                width: 80,
                borderBottomColor: "transparent",
                paddingBottom: 0,
              }}
              //   onChangeText={(value) => setDateFilter(Number(value))}
              data={[
                {
                  label: "All ",
                  value: "all",
                },
                {
                  label: "Dropped",
                  value: "droppedoff",
                },
                {
                  label: "Pending",
                  value: "peinding",
                },
              ]}
            />
            <Dropdown
              // label="Status"
              placeholder="Days"
              placeholderTextColor="black"
              baseColor="gray"
              textColor="black"
              //   itemColor="white"
              selectedItemColor="black"
              value={dayDiff}
              onChangeText={(value) => {
                setDayDiff(value);
                filterByDays(value);
              }}
              fontSize={12}
              dropdownOffset={{ top: 0, left: 0 }}
              containerStyle={{
                borderWidth: 1,
                borderColor: "#F18921",
                borderRadius: 10,
                paddingHorizontal: 10,
              }}
              inputContainerStyle={{
                width: 95,
                borderBottomColor: "transparent",
                paddingBottom: 0,
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

            {/* <RNPickerSelect
              useNativeAndroidPickerStyle={true}
              placeholder={{
                label: "Status",
                value: "default",
                color: "black",
              }}
              onValueChange={(value) => {
                console.log(value);
                if (value === "all") {
                  setData((prev) => allCollection);
                  console.log("i am here", allCollection.length);
                } else {
                  let newCollection = allCollection.filter(
                    (i) => i.drop_off_status === value
                  );
                  setData(newCollection);
                }
              }}
              style={{
                viewContainer: styles.pickerContainer,
                inputAndroid: styles.pickerInputAndroid,
                placeholder: {
                  fontWeight: "bold",
                },
              }}
              value={stausFilter}
              items={[
                {
                  label: "All ",
                  value: "all",
                  color: "black",
                },
                {
                  label: "Dropped",
                  value: "accepted",
                  color: "black",
                },
                {
                  label: "Mismatch",
                  value: "rejected",
                  color: "black",
                },
              ]}
            /> */}

            <TouchableOpacity
              style={{
                marginRight: 20,
                justifyContent: "center",
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#F18921",
                borderRadius: 10,
                padding: 10,
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
          </View>

          <FlatList
            contentContainerStyle={{}}
            // ListHeaderComponent={() => {
            //   return (
            //     <View
            //       style={{
            //         flex: 1,
            //         alignSelf: "stretch",
            //         flexDirection: "row",
            //         textAlign: "center",
            //         backgroundColor: "#F18921",
            //         paddingVertical: 5,
            //       }}
            //     >
            //       <Text style={styles.headerText}>Tonnage</Text>
            //       <Text style={styles.headerText}>Amount paid </Text>
            //       <Text style={styles.headerText}>Material type</Text>
            //       <Text style={styles.headerText}>Date</Text>
            //       <Text style={{}}> {"    "}</Text>
            //     </View>
            //   );
            // }}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            data={data}
            // renderItem={({ item }) => {
            //   let newCreate = item.created_at.split(" ");
            //   let datePart = newCreate[0];
            //   //  datePart[1] = datePart[1] - 1;
            //   //  let timePart = newCreate[1].split(":");

            //   let createAt = new Date(datePart);

            //   return (
            //     <TouchableOpacity
            //       onPress={() => {
            //         props.navigation.navigate("CollectionHistoryDetail", item);
            //       }}
            //       style={{
            //         flex: 1,
            //         alignSelf: "stretch",
            //         flexDirection: "row",
            //         paddingVertical: 5,
            //         backgroundColor: "#FDF2E7",
            //       }}
            //     >
            //       <Text numberOfLines={2} style={styles.bodyText}>
            //         {item.total_tonnage} kg
            //       </Text>
            //       <Text numberOfLines={2} style={styles.bodyText}>
            //         {numberWithCommas(item.cost)}
            //       </Text>
            //       <Text numberOfLines={3} style={styles.bodyText}>
            //         {item.homogeneous_materials.reduce((sum, current) => {
            //           return sum + current.name + " ";
            //         }, "")}
            //       </Text>
            //       <Text style={styles.bodyText}>
            //         {createAt.toLocaleDateString("en-GB")}
            //       </Text>
            //       <View
            //         style={{
            //           flexDirection: "row",
            //           alignItems: "center",
            //           paddingRight: 5,
            //         }}
            //       >
            //         <MaterialCommunityIcons name="check" color="black" />
            //         {item.drop_off_status === "accepted" && (
            //           <MaterialCommunityIcons name="check" color="red" />
            //         )}
            //         {item.drop_off_status === "rejected" && (
            //           <MaterialCommunityIcons name="close" color="red" />
            //         )}
            //       </View>
            //     </TouchableOpacity>
            //   );
            // }}

            renderItem={({ item }) => {
              //     console.log(item);
              return <HistoryCard data={item} />;
            }}
            keyExtractor={(item, index) => {
              return index;
            }}
            extraData={data}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0}
            initialNumToRender={10}
          />
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
          <TouchableWithoutFeedback
            onPress={() => {
              console.log("first");
            }}
          >
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
              {startDate && endDate && showProceed && (
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
    </Bgcover>
  );
};

const styles = StyleSheet.create({
  headerText: {
    flex: 1,
    alignSelf: "stretch",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlignVertical: "center",
  },
  bodyText: {
    flex: 1,
    alignSelf: "stretch",
    textAlign: "center",
    textAlignVertical: "center",
    paddingHorizontal: 5,
    fontWeight: "bold",
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#F18921",
    borderStyle: "solid",
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    // alignSelf: "flex-start",
    flex: 1,
  },
  pickerInputAndroid: {
    color: "black",
    fontWeight: "700",
    fontSize: 18,
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

export default CollectionHistory;
