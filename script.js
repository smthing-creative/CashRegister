const total = document.getElementById("price");
const changeInDrawer = document.getElementById("change-in-drawer");
const changeDue = document.getElementById("change-due");
const cashFromCustomer = document.getElementById("cash-from-customer");
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

changeInDrawer.innerHTML = cid;

total.textContent = `Total: ${price}`;

const checkCashRegister = (price, cash, cid) => {
  const UNIT_AMOUNT = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  }
  let totalCID = 0;
  for (let element of cid) {
    totalCID += element[1];
  }
  totalCID = totalCID.toFixed(2);
  let changeToGive = cash - price;
  const changeArray = [];
  
  if (changeToGive < 0) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  
  if (changeToGive === 0) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }
  
  if (changeToGive > totalCID) {
    return { status: "INSUFFICIENT_FUNDS", change: changeArray };
  } else if (changeToGive.toFixed(2) === totalCID) {
    return { status: "CLOSED", change: cid };
  } else {
    cid = cid.reverse();
    for (let elem of cid) {
      let temp = [elem[0], 0];
      while (changeToGive >= UNIT_AMOUNT[elem[0]] && elem[1] > 0) {
        temp[1] += UNIT_AMOUNT[elem[0]];
        elem[1] -= UNIT_AMOUNT[elem[0]];
        changeToGive -= UNIT_AMOUNT[elem[0]];
        changeToGive = changeToGive.toFixed(2);
      }
      if (temp[1] > 0) {
        changeArray.push(temp);
      }
    }
  }
  
  if (changeToGive > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  
  return { status: "OPEN", change: changeArray };
};

purchaseBtn.addEventListener("click", () => {
  const cashValue = parseFloat(cash.value);
  const result = checkCashRegister(price, cashValue, cid);
  
  if (result.status === "INSUFFICIENT_FUNDS") {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
  } else if (result.status === "CLOSED") {
    changeDue.textContent = `Status: CLOSED ${result.change.map(item => `${item[0]}: $${item[1]}`).join(' ')}`;
  } else {
    changeDue.textContent = `Status: OPEN ${result.change.map(item => `${item[0]}: $${item[1]}`).join(' ')}`;
  }
});
