import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
export const deliveryOptions = [
    {
        id: "1",
        deliveryTime: 7,
        priceCent: 0
    },
    {
        id: "2",
        deliveryTime: 3,
        priceCent: 499
    },
    {
        id: "3",
        deliveryTime: 1,
        priceCent: 999
    }
]

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption = "";
    deliveryOptions.forEach(option => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }

    })
    return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
    var today = dayjs();
    var deliveryDate = today.add(deliveryOption.deliveryTime, 'days');
    const dateString = deliveryDate.format('ddd M/D/YYYY');
    return dateString;
}