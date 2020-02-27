let customerData = [];
const stateStatus = {
  none: '0',
  add: '1',
  update: '2',
  delete: '3'
};
let currentStateStatus = stateStatus.none;

function onSubmitForm (e) {
  e.preventDefault();
}

function renderButtons (index) {
  const buttonHtml = `<button class="btn waves-effect waves-light amber" onclick="editCustomer(${index})">Edit</button>  <button class="btn waves-effect waves-light red" onclick="deleteCustomer(${index})">Delete</button>`;
  return buttonHtml;
}

function renderCustomerData (data) {
  let html = '';
  var holder = document.getElementById('holderCustomerData');
  if (data.length > 0) {
    data.forEach((customer, index) => {
      html += `<tr><td>${index + 1}</td><td>${customer.name}</td><td>${customer.age}</td><td>${customer.phoneNumber}</td><td>${renderButtons(index)}</td></tr>`;
    });
  }
  holder.innerHTML = html;
}

// Button function
function toggleForm (ele) {
  const form = document.getElementById('holderForm');
  form.classList.toggle('hide');
}

// API function
function changeStatusBtnAction (status) {
  const btn = document.getElementById('btnAction');
  if (btn) {
    if (status === stateStatus.update) {
      // change edit color
      if (!btn.classList.contains('amber')) btn.classList.add('amber');
    } else if (status === stateStatus.add || status === stateStatus.none) {
      // change add color
      if (btn.classList.contains('amber')) btn.classList.remove('amber');
    }
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
    if (name === '' || age === '') return;
    postAPI('/customers', 'POST', { name, age, phoneNumber: phone }, function (response) {
      customerData.push(response.data);
      renderCustomerData(customerData);
    }, function () {
      alert('Error, can"t add Customer');
    })
  }
  currentStateStatus = stateStatus.none;
}

function deleteCustomer (index) {
  currentStateStatus = stateStatus.delete;
  const url = '/customers' + '/' + customerData[index]._id;
  postAPI(url, 'DELETE', {}, function (response) {
    console.log(response);
    customerData.splice(index, 1);
    renderCustomerData(customerData);
  }, function () {
    alert('Error, can"t delete Customer');
  });
  currentStateStatus = stateStatus.none;
}

function editCustomer (index) {
  const customerInput = getCustomerInput();
  if (customerInput) {
    const form = document.getElementById('holderForm');
    if (form.classList.contains('hide')) form.classList.remove('hide');

    currentStateStatus = stateStatus.update;
      
    const { name, age, phoneNumber } = customerData[index];
    const { input_name, input_age, input_phone } = customerInput;

    input_name.focus();
    input_name.value = name;  
  
    input_age.focus();
    input_age.value = age;
  
    input_phone.focus();
    input_phone.value = phoneNumber;

    input_name.blur();
    input_age.blur();
    input_phone.blur();

    changeStatusBtnAction(currentStateStatus);

    /*postAPI(url, 'UPDATE', {}, function (response){
    console.log(response);
    customerData.splice(index, 1);
    renderCustomerData(customerData);
  }, function () {
    alert('Error, can"t delete Customer');
  });*/
  }
}

function actionCustomer () {
  if (currentStateStatus === stateStatus.update) {

  } else if (currentStateStatus === stateStatus.add || currentStateStatus === stateStatus.none) {

  }
}

window.onload = function () {
  // first render
  getAPI('/customers', response => {
    customerData = response.data;
    renderCustomerData(customerData);
  });
};