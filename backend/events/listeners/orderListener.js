import eventBus from "../eventBus.js";
import sendOrderEmail from "../../services/orderConfirmationService.js";

eventBus.on("orderplaced", async (order , user)=>{
    try {
        await sendOrderEmail(user.email , order);
        console.log(`✅ order email sent to ${user.email}`);
    } catch (error) {
        console.log(`❌ Failed to send email to ${user.email}:`, err.message)
    }
})