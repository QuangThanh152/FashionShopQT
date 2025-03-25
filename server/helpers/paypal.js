const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox', //sandbox or live
    client_id: 'ARlXBl0o5NK4RI0w70eTNTpCGPoDoulw50DfKDG733A_6DBQziXQIC5FXO3eTF6oO3P36vB0OkaVUo3a',
    client_secret: 'EKXLCG0RcOryrAqd3yLI_bh3Act4lrgByIOXynRmamsFAGIR7BxuzXF8cs16b5Zrc0NHTsFMd-CNgpMO'
})

module.exports = paypal;