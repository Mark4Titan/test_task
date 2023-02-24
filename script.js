const DOC = document;

const Slider = DOC.getElementById("slider");

const sliderStorage = DOC.getElementById("sliderStorage");
const sliderValueStorage = DOC.getElementById("sliderValueStorage");

const sliderTransfer = DOC.getElementById("sliderTransfer");
const sliderValueTransfer = DOC.getElementById("sliderValueTransfer");

const BunnyRadio = DOC.getElementById("bunny");
const ScalewayRadio = DOC.getElementById("scaleway");

const BunnySpan = DOC.getElementById("bunnySpan");
const VultrSpan = DOC.getElementById("vultrSpan");
const ScalewaySpan = DOC.getElementById("scalewaySpan");
const BackblazeSpan = DOC.getElementById("backblazeSpan");

const HDD = DOC.querySelectorAll('input[name="bunny"]');
const Multi = DOC.querySelectorAll('input[name="scaleway"]');

const BunnyVal = DOC.getElementById("bunnyVal");
const BackblazeVal = DOC.getElementById("backblazeVal");
const ScalewayVal = DOC.getElementById("scalewayVal");
const VultrVal = DOC.getElementById("vultrVal");

// visually//
const visually = (together, visual) => {
  let scale = "|";
  for (let i = 0; i < together; i++) {
    scale += "|";
  }
  visual.textContent = scale;
  Total();
};

const Total = () => {
  const bunnyVal = parseFloat(BunnyVal.textContent);
  const backblazeVal = parseFloat(BackblazeVal.textContent);
  const scalewayVal = parseFloat(ScalewayVal.textContent);
  const vultrVal = parseFloat(VultrVal.textContent);

  const oneFourth = bunnyVal < backblazeVal ? bunnyVal : backblazeVal;
  const semiАinal = scalewayVal < vultrVal ? scalewayVal : vultrVal;
  const minPrice = oneFourth < semiАinal ? oneFourth : semiАinal;

  minPrice === bunnyVal
    ? (BunnySpan.style.backgroundColor = "#f5945c")
    : (BunnySpan.style.backgroundColor = "gray");
  minPrice === backblazeVal
    ? (BackblazeSpan.style.backgroundColor = "red")
    : (BackblazeSpan.style.backgroundColor = "gray");
  minPrice === scalewayVal
    ? (ScalewaySpan.style.backgroundColor = "#671be9")
    : (ScalewaySpan.style.backgroundColor = "gray");
  minPrice === vultrVal
    ? (VultrSpan.style.backgroundColor = "#1a60ff")
    : (VultrSpan.style.backgroundColor = "gray");
};

// Backblaze //
const PriceBackblaze = ({ Storage, Transfer }) => {
  const storagePrice = 0.005;
  const transferPrice = 0.01;
  const minPayment = 7;

  const storageCost = Storage * storagePrice;
  const transferCost = Transfer * transferPrice;
  const totalCost = Math.max(storageCost + transferCost, minPayment);
  BackblazeVal.textContent = totalCost.toFixed(2);
  visually(totalCost.toFixed(0), BackblazeSpan);
};

// Scaleway //
const PriceScaleway = ({ Storage, Transfer }) => {
  const storagePriceMulti = 0.06;
  const storagePriceSingle = 0.03;
  const free = 75;
  const transferPrice = 0.02;
  // в умові помилка при 1000х1000 не може бути scaleway.com Multi = 74$, Single = 46.25$,
  // такого можна досягти, якщо від (в моєму випадку) Storage теж віднімати 75GB а це буде не вірно,
  // подвійний - 75GB. А бо ж я не знайшов унікальну формулу яка б могла таку магію робити.
  const together = Storage + Transfer;
  if (together > free) {
    const storageCost =
      (Storage - free) *
      (Multi[0].checked ? storagePriceMulti : storagePriceSingle);
    //   Storage * (Multi[0].checked ? storagePriceMulti : storagePriceSingle);
      const transferCost = (Transfer - free) * transferPrice;
      
      const totalCost =
        storageCost + transferCost < 0 ? 0 : storageCost + transferCost;

    ScalewayVal.textContent = totalCost.toFixed(2);
    visually(totalCost.toFixed(0), ScalewaySpan);
  } else {
    ScalewayVal.textContent = 0.0;
    visually(0.0, ScalewaySpan);
  }
};

// Bunny //
const PriceBunny = ({ Storage, Transfer }) => {
  const storagePriceHdd = 0.01;
  const storagePriceSsd = 0.02;
  const transferPrice = 0.01;
  const maxPayment = 10;

  const storageCost =
    Storage * (HDD[0].checked ? storagePriceHdd : storagePriceSsd);
  const transferCost = Transfer * transferPrice;
  const totalCost = Math.min(storageCost + transferCost, maxPayment);
  BunnyVal.textContent = totalCost.toFixed(2);
  //
  visually(totalCost.toFixed(0), BunnySpan);
};

// Vultr //
const PriceVultr = ({ Storage, Transfer }) => {
  const storagePrice = 0.01;
  const transferPrice = 0.01;
  const minPayment = 5;

  const storageCost = Storage * storagePrice;
  const transferCost = Transfer * transferPrice;
  const totalCost = Math.max(storageCost + transferCost, minPayment);
  VultrVal.textContent = totalCost.toFixed(2);
  visually(totalCost.toFixed(0), VultrSpan);
};

const CONST = () => {
  const Storage = parseInt(sliderStorage.value);
  const Transfer = parseInt(sliderTransfer.value);
  return { Storage, Transfer };
};

//
Slider.addEventListener("change", () => {
  const { Storage, Transfer } = CONST();
  sliderValueStorage.textContent = Storage;
  sliderValueTransfer.textContent = Transfer;
  PriceBackblaze(CONST());
  PriceBunny(CONST());
  PriceVultr(CONST());
  PriceScaleway(CONST());
});

BunnyRadio.addEventListener("click", () => {
  PriceBunny(CONST());
});

ScalewayRadio.addEventListener("click", () => {
  PriceScaleway(CONST());
});

PriceBackblaze(CONST());
PriceBunny(CONST());
PriceVultr(CONST());
PriceScaleway(CONST());
