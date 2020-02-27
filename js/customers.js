class Customer {
  async getAllCustomers () {
    try {
      const response = await getAPI('/customers');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}