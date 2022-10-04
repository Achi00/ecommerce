const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body.cartItems)
    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_adress_collection: 'auto',
            shipping_options: [
                { shipping_rate: 'shr_1LomY6FQKbNmCQGGDHaqD1c4'},
                { shipping_rate: 'shr_1LomYrFQKbNmCQGGWkJC2Kbd'},
            ],
            line_items: [
              {
                price: '{{PRICE_ID}}',
                quantity: 1,
              },
            ],
            // mode: 'payment',
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/canceled`,
          }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
    //   res.redirect(303, session.url);
    res.status(200).json(session);
} catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
} else {
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed');
}
}