/* 
    Fill data{} with the curriencies to watch and the amount invested. 
    'amount' is the number of coins holded
    'capitalInvested' money invested to buy those coins, in US Dollars.

    (Full list of available cryptocurrencies: https://coinmarketcap.com/all/views/all/) 
*/
export const config = {
    data: [
        {
            currency: 'bitcoin',
            amount: 1,
            investedCapital: 1000
        },
        {
            currency: 'ethereum',
            amount: 2,
            investedCapital: 500
        }
    ]
};