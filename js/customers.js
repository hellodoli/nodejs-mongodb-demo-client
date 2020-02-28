class Customer {
  constructor () {
    this.customers = [];
  }
  
  async getAllCustomers (success) {
    try {
      const response = await getAPI('/customers');
      const data = response.data;
      if (data.customers) {
        success(data.customers);
      }
    } catch (error) {
      alert('Connect Error');
      console.log(error);
    }
  }

  async addCustomers (customerData, success, fail) {
    try {
      const response = await postAPI('/customers', 'POST', customerData);
      const data = response.data;
      if (data.customer) {
        success(data.customer);
      } else {
        fail(data);
      }
    } catch (error) {
      alert('Connect Error');
      console.log(error);
    }
  }

  async deleteCustomer (customerID, success, fail) {
    try {
      const url = '/customers' + '/' + customerID;
      const response = await postAPI(url, 'DELETE');
      const data = response.data;
      if (data.customer) {
        success(data.customer);
      } else {
        fail(data);
      }
    } catch (error) {
      alert('Connect Error');
      console.log(error);
    }
  }

  async updateCustomer (customerID, customerDataUpdate, success, fail) {
    try {
      const url = '/customers' + '/' + customerID; 
      const response = await postAPI(url, 'PATCH', customerDataUpdate);
      const data = response.data;
      if (data.customer) {
        success(data.customer);
      } else {
        fail(data);
      }
    } catch (error) {
      alert('Connect Error');
      console.log(error);
    }
  }
}