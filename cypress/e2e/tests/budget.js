// ====== CONFIG / INPUT ======
const daysWorked = 20;
const hoursPerDay = 8;

const asiaPay = 7500;
const helkaPay = 800;

const zus = 3200;
const taxRate = 0.12;

const projects = [
    { name: "Assetmax", hourlyRate: 110 },
    { name: "TTC", hourlyRate: 95 },
];

// ====== HELPERS ======
const pln = (value) => `${Math.round(value)} PLN`;

function calcNetFromRate(hourlyRate, daysWorked, hoursPerDay = 8) {
    return hourlyRate * daysWorked * hoursPerDay;
}

function calcNetAfterTaxAndZus(projectNetts, taxRate, zus) {
    const totalNet = projectNetts.reduce((sum, v) => sum + v, 0);
    return totalNet - totalNet * taxRate - zus;
}

// ====== CALCULATION ======
const projectNetts = projects.map(p => ({
    ...p,
    net: calcNetFromRate(p.hourlyRate, daysWorked, hoursPerDay),
}));

projectNetts.forEach(p =>
    console.log(`${p.name} Project Net Budget: ${pln(p.net)}`)
);

const assetmaxNet = projectNetts.find(p => p.name === "Assetmax")?.net ?? 0;
const ttcNet = projectNetts.find(p => p.name === "TTC")?.net ?? 0;

const netBoth = calcNetAfterTaxAndZus([assetmaxNet, ttcNet], taxRate, zus);
const netAssetmaxOnly = calcNetAfterTaxAndZus([assetmaxNet], taxRate, zus);
const netTtcOnly = calcNetAfterTaxAndZus([ttcNet], taxRate, zus);

const familyIncomeBoth = netBoth + asiaPay + helkaPay;
const familyIncomeAssetmax = netAssetmaxOnly + asiaPay + helkaPay;
const familyIncomeTtc = netTtcOnly + asiaPay + helkaPay;

// ====== OUTPUT ======
console.log(`Assetmax + TTC after taxes and ZUS:    ---${pln(netBoth)}---`);
console.log(`Assetmax ONLY after taxes and ZUS:     ---${pln(netAssetmaxOnly)}---`);
console.log(`TTC ONLY after taxes and ZUS:          ---${pln(netTtcOnly)}---`);

console.log(`Family budget with 2 projects:         ---${pln(familyIncomeBoth)}---`);
console.log(`Family budget with just Assetmax:      ---${pln(familyIncomeAssetmax)}---`);
console.log(`Family budget with just TTC:           ---${pln(familyIncomeTtc)}---`);
