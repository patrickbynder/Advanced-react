export default function formatMoney(amount = 0) {
    const options = {
        style: 'currency',
        currency: 'EUR',
        minimumfractionDigits: 2,
    };

    // check if it is a clean dollar ammount
    if (amount % 100 === 0) {
        options.minimumFractionDigits = 0;
    }

    const formatter = Intl.NumberFormat('en-US', options);

    return formatter.format(amount / 100);
}
