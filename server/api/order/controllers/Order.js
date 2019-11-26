'use strict';

const stripe = require("stripe")("sk_test_UDGY15jIlYsWOaGrjovLIrj5002uquOSZ0");
/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {


    create: async (ctx) => {
        
        const { address, amount, brews, postalCode, token, city } = ctx.request.body;
        
       
        const charge = await stripe.charges.create({
             amount: Math.round(amount.toFixed(2))*100,
            currency: "usd",
            description: `Order ${new Date(Date.now())} - User ${ctx.state.user._id}`,
            source:token
        })

        // create order in database
        const order = await strapi.api.order.services.order.create({
            user: ctx.state.user._id,
            address,
            amount,
            brews,postalCode,city
        })

        return order;
    }

};
