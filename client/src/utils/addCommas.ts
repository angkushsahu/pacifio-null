const getCurrencyType = (type: "dollar" | "rupees" = "rupees") => {
    return type === "dollar"
        ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
        : new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });
};

const addCommas = (price: string | number, type: "dollar" | "rupees" = "rupees") => {
    let stringifiedPrice = typeof price === "string" ? Number(price) : price;

    if (isNaN(stringifiedPrice)) {
        console.error("Please enter a number");
        return;
    }

    const formatter = getCurrencyType(type);
};

export default addCommas;
