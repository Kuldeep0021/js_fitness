const Razorpay = require('razorpay');

// Initialize razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
});

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Public
const createOrder = async (req, res) => {
  try {
    const { amount, planName } = req.body;

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    // If using placeholder keys, return a mock order to prevent 500 error
    if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'rzp_test_placeholder') {
      return res.json({
        id: `mock_order_${Date.now()}`,
        currency: "INR",
        amount: amount * 100,
        key_id: 'rzp_test_placeholder'
      });
    }

    const order = await razorpay.orders.create(options);
    
    if (!order) {
      return res.status(500).json({ message: "Some error occured" });
    }

    res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder };
