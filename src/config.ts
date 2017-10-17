/* 
    Fill data{} with the curriencies to watch and the amount invested. 
    'convert' will convert results to this currency
    'amount' has to be considered as currency (amount: 1000 means $1000 USD, or €1000 depending on converted value )

    (Full list of available cryptocurrencies: https://coinmarketcap.com/all/views/all/) 
*/
export const config = {
    data: [
        {
            currency: 'bitcoin',
            amount: 1000
        },
        {
            currency: 'ethereum',
            amount: 1000
        }
    ],
    convert: 'USD'
};