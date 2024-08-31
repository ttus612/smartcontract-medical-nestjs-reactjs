import { get, reject } from "lodash";
import moment from "moment";
import { createSelector } from "reselect";

const allData = (state) => get(state, "medical.allMedical.data", []);
const deleteData = (state) => get(state, "medical.deleteMedical.data", []);
const openData = (state) => {
  const all = allData(state);
  const delet = deleteData(state);
  const openData = reject(all, (data) => {
    const dataDelete = delet.some(
      (o) => o.recordId.toString() === data.recordId.toString()
    );
    return dataDelete;
  });
  return openData;
};
export const dataBookSelector = createSelector(openData, (data) => {
  data = decorateOrderData(data);
  console.log(data);
  return data;
});

const decorateOrderData = (datas) => {
  return datas.map((data) => {
    data = decorateOrder(data);
    return data;
  });
};

const decorateOrder = (data) => {
  const precision = 100000;
  let recordIdView = Math.round(data.recordId * precision) / precision;
  let ageNew = Math.round(data.age * precision) / precision;

  return {
    ...data,
    recordIdView,
    ageNew,
    formattedTimestamp: moment
      .unix(data.timestamp)
      .format("h:mm:ssa d MMMM yyyy"),
  };
};
