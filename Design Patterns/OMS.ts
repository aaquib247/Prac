// Product class
class Product {
  productId: string;
  name: string;
  price: number;

  constructor(productId: string, name: string, price: number) {
    this.productId = productId;
    this.name = name;
    this.price = price;
  }

  calculatePrice(): number {
    // Logic to calculate price (could include discounts or taxes)
    return this.price;
  }
}

// PhysicalProduct extends Product (IS-A relationship)
class PhysicalProduct extends Product {
  weight: number;

  constructor(productId: string, name: string, price: number, weight: number) {
    super(productId, name, price);
    this.weight = weight;
  }

  calculateShipping(): number {
    // Example shipping calculation based on weight
    return this.weight * 5; // Let's assume $5 per kg of weight
  }
}

// Customer class
class Customer {
  customerId: string;
  name: string;
  email: string;

  constructor(customerId: string, name: string, email: string) {
    this.customerId = customerId;
    this.name = name;
    this.email = email;
  }

  placeOrder(order: Order): void {
    console.log(`Customer ${this.name} placed an order with ID: ${order.orderId}`);
  }
}

// Payment class
class Payment {
  paymentId: string;
  amount: number;

  constructor(paymentId: string, amount: number) {
    this.paymentId = paymentId;
    this.amount = amount;
  }

  processPayment(): boolean {
    // Basic example of processing payment
    console.log(`Processing payment of amount $${this.amount}`);
    return true; // In a real-world scenario, this would be more complex
  }
}

// Shipping class
class Shipping {
  shippingId: string;
  address: string;
  shippingDate: Date;

  constructor(shippingId: string, address: string, shippingDate: Date) {
    this.shippingId = shippingId;
    this.address = address;
    this.shippingDate = shippingDate;
  }

  updateStatus(status: string): void {
    console.log(`Shipping status for ${this.shippingId}: ${status}`);
  }
}

// Order class
class Order {
  orderId: string;
  orderDate: Date;
  status: string;
  totalAmount: number;
  products: Product[] = [];
  customer: Customer;
  payment: Payment;
  shipping: Shipping;

  constructor(orderId: string, customer: Customer, payment: Payment, shipping: Shipping) {
    this.orderId = orderId;
    this.orderDate = new Date();
    this.status = "Pending";
    this.totalAmount = 0;
    this.customer = customer;
    this.payment = payment;
    this.shipping = shipping;
  }

  // Add a product to the order
  addProduct(product: Product): void {
    this.products.push(product);
    this.totalAmount += product.calculatePrice();
  }

  // Calculate total order amount
  calculateTotal(): number {
    this.totalAmount = this.products.reduce((total, product) => total + product.calculatePrice(), 0);
    return this.totalAmount;
  }

  // Update the status of the order
  updateStatus(status: string): void {
    this.status = status;
    console.log(`Order ${this.orderId} status updated to: ${status}`);
  }
}

// Example usage:
const product1 = new PhysicalProduct("P001", "Laptop", 1000, 2.5); // 2.5 kg for shipping
const product2 = new Product("P002", "Headphones", 150);

const customer = new Customer("C001", "John Doe", "johndoe@example.com");

const payment = new Payment("PAY001", 1150); // Example payment amount

const shipping = new Shipping("SHIP001", "123 Street, City", new Date());

const order = new Order("ORD001", customer, payment, shipping);
order.addProduct(product1);
order.addProduct(product2);

customer.placeOrder(order);

order.calculateTotal();
console.log(`Total order amount: $${order.totalAmount}`);

if (payment.processPayment()) {
  order.updateStatus("Paid");
  shipping.updateStatus("Shipped");
}
