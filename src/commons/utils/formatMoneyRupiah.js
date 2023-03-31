const formatMoneyRupiah = (nominal, currency = "Rp") => {
  try {
    if (typeof nominal !== "number") return `${currency}0,00`;
    const numberFormat = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      currencyDisplay: "code",
    })
      .format(nominal)
      .replace("IDR", "")
      .trim();

    if (numberFormat.charAt(0) === "-")
      return `${currency}${numberFormat.replace(/\s/g, "").trim()}`;
    return `${currency}${numberFormat}`;
  } catch (error) {
    return `${currency}0,00`;
  }
};

export default formatMoneyRupiah;
