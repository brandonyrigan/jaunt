const input = document.querySelector("input");
const log = document.getElementById("log");

input.addEventListener("change", updateValue);

function updateValue(e) {
  log.textContent = e.target.value;
}

// Get to work here instead of index.html script tag
// function selectDates() {
//   let from = document
//       .getElementById(fromDate)
//       .datepicker({
//         dateFormat: "yy-mm-dd",
//         changeMonth: true,
//       })
//       .on("change", function () {
//         to.datepicker("option", "minDate", getDate(this));
//       }),
//     to = document
//       .getElementById(toDate)
//       .datepicker({
//         dateFormat: "yy-mm-dd",
//         changeMonth: true,
//       })
//       .on("change", function () {
//         from.datepicker("option", "maxDate", getDate(this));
//       });

//   function getDate(element) {
//     let date;
//     let dateFormat = "yy-mm-dd";
//     try {
//       date = $.datepicker.parseDate(dateFormat, element.value);
//     } catch (error) {
//       date = null;
//     }
//     console.log(date);
//     return date;
//   }
// }

export { selectDates };
