/* 
    Fill data{} with the curriencies to watch and the amount invested. 
    'convert' will convert results to this currency
    'amount' is the number of coins holded
    'capitalInvested' money invested to buy those coins ($1000, or €1000 depending on converted value)

    (Full list of available cryptocurrencies: https://coinmarketcap.com/all/views/all/) 
*/
export const config = {
    data: [
        {
            currency: 'bitcoin',
            amount: 1,
            investedCapital: 6000
        },
        {
            currency: 'ethereum',
            amount: 2,
            investedCapital: 500
        }
    ],
    convert: 'USD'
};