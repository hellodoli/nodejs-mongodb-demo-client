let customerData = [];
const stateStatus = {
  none: '0',
  add: '1',
  update: '2',
  delete: '3'
};
let currentStateStatus = stateStatus.none;

// Customer instance
const c = new Customer();

function onSubmitForm (e) {
  e.preventDefault();
}

// render function
function renderButtons (index, isEdit = false) {
  const buttonEditText = isEdit ? 'SAVE' : 'EDIT';
  const onClick = isEdit ? `updateCustomer(${index})` : `editCustomer(${index})`;

  const buttonHtml = `
  <button
    class="btn waves-effect waves-light amber"
    onclick=${onClick}
  >${buttonEditText}</button>
  <button class="btn waves-effect waves-light red" onclick="deleteCustomer(${index})">Delete</button>`;
  return buttonHtml;
}

function renderCustomerData (data) {
  let html = '';
  var holder = document.getElementById('holderCustomerData');
  if (holder) {
    data.forEach((customer, index) => {
      html += `<tr><td>${index + 1}</td><td>${customer.name}</td><td>${customer.age}</td><td>${customer.phoneNumber}</td><td>${renderButtons(index)}</td></tr>`;
    });
    holder.innerHTML = html;
  }
}

function renderCustomerEditOn (customerId) {
  let html = '';
  var holder = document.getElementById('holderCustomerData');

  if (holder) {
    customerData.forEach((customer, index) => {
      if (customer._id === customerId) {
        html += `<tr>
          <td>${index + 1}</td>
          <td><input type="text" oninput="onChangeInputEdit(event, ${index}, 'name')" value="${customer.name}" /></td>
          <td><input type="number" oninput="onChangeInputEdit(event, ${index}, 'age')" min="0" max="200" value="${customer.age}" /></td>
          <td><input type="text" oninput="onChangeInputEdit(event, ${index}, 'phone')" value="${customer.phoneNumber}" /></td>
          <td>${renderButtons(index, true)}</td>
        </tr>`;
      } else {
        html += `<tr><td>${index + 1}</td><td>${customer.name}</td><td>${customer.age}</td><td>${customer.phoneNumber}</td><td>${renderButtons(index)}</td></tr>`;
      }
    });
    holder.innerHTML = html;
  }
}

// Button function
function toggleForm (ele) {
  const form = document.getElementById('holderForm');
  form.classList.toggle('hide');
}

// API function
function handleFail (res, message) {
  if (res.message) {
    alert(res.message);
  } else {
    alert(message);
  }
}

function getCustomerValueInput () {
  const input_name = document.getElementById('input_name');
  const input_age = document.getElementById('input_age');
  const input_phone = document.getElementById('input_phone');
  if (input_name && input_age && input_phone) {
    return {
      name: input_name.value.trim(),
      age: input_age.value.trim(),
      phone: input_phone.value.trim()
    };
  }
  return false;
}

function getCustomerInput () {
  const input_name = document.getElementById('input_name');
  const input_age = document.getElementById('input_age');
  const input_phone = document.getElementById('input_phone');
  if (input_name && input_age && input_phone) {
    return {
      input_name,
      input_age,
      input_phone
    };
  }
  return false;
}

function addCustomer () {
  const customer = getCustomerValueInput();
  if (customer) {
    currentStateStatus = stateStatus.add;
    const { name, age, phone } = customer;
    // if (name === '' || age === '') return;
    const data = { name, age, phoneNumber: phone };
    c.addCustomers(
      data, 
      (res) => { // success
        customerData.push(res);
        renderCustomerData(customerData);
      },
      res => handleFail(res, 'Can not add Customer') // fail
    );
  }
  currentStateStatus = stateStatus.none;
}

function deleteCustomer (index) {
  currentStateStatus = stateStatus.delete;
  c.deleteCustomer(
    customerData[index]._id,
    (res) => { // success
      customerData.splice(index, 1);
      renderCustomerData(customerData);
    },
    (res) => handleFail(res, 'Can not delete Customer') // fail
  );
  currentStateStatus = stateStatus.none;
}

function onChangeInputEdit (e, index, type) {
  switch(type) {
    case 'age':
      customerData[index].age = e.target.value;
      break;
    case 'phone':
      customerData[index].phoneNumber = e.target.value;
      break;
    case 'name':
      customerData[index].name = e.target.value;
      break;
  } 
}

function updateCustomer (index) {
  currentStateStatus = stateStatus.update;
  const { _id, name, age, phoneNumber } = customerData[index];
  c.updateCustomer(
    _id,
    { name, age, phoneNumber },
    (res) => { // success
      renderCustomerData(customerData);
    },
    (res) => handleFail(res, 'Can not update Customer') // fail
  );
  currentStateStatus = stateStatus.none;
}

function editCustomer (index) {
  renderCustomerEditOn(customerData[index]._id);
}

window.onload = function () {
  // first render
  c.getAllCustomers((res) => {
    customerData.length = 0;
    customerData = res;
    renderCustomerData(customerData);
  });
};