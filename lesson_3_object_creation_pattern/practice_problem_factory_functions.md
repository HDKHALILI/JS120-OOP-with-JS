# Practice Problems - Factory Functions

1. What are two disadvantages of working with factory functions?

Answer:

1. Each object created by the factory function has of all the methods, which can be redundant and memory intensive.
2. There is no way to tell which factory function created an object, so there is no way to be sure that you are working with the right kind of object.

3. Rewrite the following code to use object-literal syntax to generate the returned object:

```javascript
function makeObj() {
  let obj = {};
  obj.propA = 10;
  obj.propB = 20;
  return obj;
}
```

Answer:

```javascript
function makeObj() {
  return {
    propA: 10,
    propB: 20,
  };
}
```

3. In this problem and the remaining problems, we'll build a simple invoice processing program. To get you started, here's the code to process a single invoice:

```javascript
let invoice = {
  phone: 3000,
  internet: 6500,
};

let payment = {
  phone: 1300,
  internet: 5500,
};

let invoiceTotal = invoice.phone + invoice.internet;
let paymentTotal = payment.phone + payment.internet;
let remainingDue = invoiceTotal - paymentTotal;

console.log(paymentTotal); // => 6800
console.log(remainingDue); // => 2700
```

To process multiple invoices, we need a factory method that we can use to create invoices. The requirements for the factory function are as follows:

1. It returns an invoice object, with phone and internet properties, and a total method.
2. The default value for the phone service is 3000, and the internet service is 5500 (in cents, of course!).
3. The function takes an object argument whose attributes override the default values.

Your function should work with the following code:

```javascript
function createInvoice(services) {
  // implement the factory function here
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(
  createInvoice({
    phone: 1000,
    internet: 4500,
  })
);

console.log(invoiceTotal(invoices)); // 31000
```

Answer:

```javascript
function createInvoice(services = {}) {
  let phoneBill = services.phone || 3000;
  let internetBill = services.internet || 5500;

  // incase bill amount is zero (0)
  phoneBill = services.phone === 0 ? 0 : phoneBill;
  internetBill = services.internet === 0 ? 0 : internetBill;

  return {
    phone: phoneBill,
    internet: internetBill,
    total() {
      return this.phone + this.internet;
    },
  };
}
```

4. Now we can build a factory function to create payments. The function can take an object argument in one of 3 forms:

- Payment for one service, e.g., { internet: 1000 } or { phone: 1000 }.
- Payment for both services, e.g., { internet: 2000, phone: 1000 }.
- Payment with just an amount property, e.g., { amount: 2000 }.

The function should return an object that has the amount paid for each service and a total method that returns the payment total. If the amount property is not present in the argument, it should return the sum of the phone and internet service charges; if the amount property is present, return the value of that property.

Your function should work with the following code:

```javascript
function createPayment(services) {
  // implement the factory function here
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment) => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(
  createPayment({
    internet: 6500,
  })
);

payments.push(
  createPayment({
    phone: 2000,
  })
);

payments.push(
  createPayment({
    phone: 1000,
    internet: 4500,
  })
);

payments.push(
  createPayment({
    amount: 10000,
  })
);

console.log(paymentTotal(payments)); // => 24000
```

```javascript
function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
    total() {
      return this.amount || this.phone + this.internet;
    },
  };
}
```

5. Update the createInvoice function so that it can add payment(s) to invoices. Use the following code as a guideline:

```javascript
function createInvoice(services = {}) {
  let phoneBill = services.phone || 3000;
  let internetBill = services.internet || 5500;

  // incase bill amount is zero (0)
  phoneBill = services.phone === 0 ? 0 : phoneBill;
  internetBill = services.internet === 0 ? 0 : internetBill;

  return {
    phone: phoneBill,
    internet: internetBill,
    payments: [],

    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.payments.push(payment);
    },

    addPayments(payments) {
      payments.forEach(this.addPayment, this);
    },

    paymentsTotal() {
      return this.payments.reduce((sum, payment) => sum + payment.total(), 0);
    },

    amountDue() {
      return this.total() - this.paymentsTotal();
    },
  };
}

invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
invoice.amountDue(); // this should return 0
```
