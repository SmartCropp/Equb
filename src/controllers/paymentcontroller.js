const request=require('request')
exports.CreatePayment_Post=async (req, res) => {
    const { 
        amount, 
        currency = 'ETB', 
        email, 
        first_name, 
        last_name, 
        phone_number, 
        tx_ref, 
        callback_url, 
        return_url, 
        customization, 
        metadata 
    } = req.body;
    const CHAPA_SECRET_KEY='CHASECK_TEST-2Y3c5yHyhOHtifsGN0iaWNwEXdJYIfEG'

    // Request options
    const options = {
        method: 'POST',
        url: 'https://api.chapa.co/v1/transaction/initialize',
        headers: {
            Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount,
            currency,
            email,
            first_name,
            last_name,
            phone_number,
            tx_ref,
            callback_url,
            return_url,
            ...(customization && {
                'customization[title]': customization.title,
                'customization[description]': customization.description
            }),
            ...(metadata && {
                'meta[hide_receipt]': metadata.hide_receipt
            })
        })
    };

    // Make request to Chapa API
    request(options, (error, response) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Payment creation failed', error });
        }

        // Send Chapa API response back to client
        res.status(200).json(JSON.parse(response.body));
    });
}


exports.VerifyPayment_Get= async (req, res) => {
    const { tx_ref } = req.params;

    const options = {
        method: 'GET',
        url: `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
        headers: {
            Authorization: `Bearer ${CHAPA_SECRET_KEY}`
        }
    };

    // Send request to Chapa API
    request(options, (error, response, body) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Verification failed', error });
        }

        // Parse and return the response from Chapa
        res.status(200).json(JSON.parse(response.body));
    });
}