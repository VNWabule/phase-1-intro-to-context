function createEmployeeRecord(employeeArray) {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(employeesArray) {
  return employeesArray.map(employeeArray => createEmployeeRecord(employeeArray));
}

function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employee.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(timeInEvent => timeInEvent.date === date);
  const timeOut = employee.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((totalWages, timeInEvent) => totalWages + wagesEarnedOnDate(employee, timeInEvent.date), 0);
}

function calculatePayroll(employees) {
  return employees.reduce((totalWages, employee) => totalWages + allWagesFor(employee), 0);
}

module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
    };
