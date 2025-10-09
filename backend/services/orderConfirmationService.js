import transporter from "../config/nodemailer.js";

const sendOrderEmail = async (to, order) => {
  const itemsHtml = order.Order_items
    .map(
      (item) => `
      <tr>
        <td>${item.Product.name}</td>
        <td>${item.quantity}</td>
        <td>${item.Product.price}</td>
        <td>${item.quantity * item.price}</td>
      </tr>
    `
    )
    .join("");

  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject: `Order Confirmation - ${order.order_uuid}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hi ${order.customer?.name || "Customer"},</h2>
        <p>Thank you for your order!</p>

        <p><strong>Order ID:</strong> ${order.order_uuid}</p>
        <p><strong>Status:</strong> ${order.status || "Pending"}</p>
        <p><strong>Total Amount:</strong> ${order.total_amount}</p>
        <p><strong>Payment Method:</strong> Cash on delivery</p>
        <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>

        <h3>Order Details:</h3>
        <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">
          <thead style="background-color: #f2f2f2;">
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
            <tr>
            <th colspan="3">Total amount</th>
            <th>${order.total_amount}</th>
          </tr>
          </tbody>
        </table>

        <p style="margin-top: 20px;">We'll notify you once it’s ready for delivery!</p>
        <hr />
        <p>Thanks,<br/>The QuickBite Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendOrderEmail;
